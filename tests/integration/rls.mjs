import { randomBytes } from "node:crypto";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const publicKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !publicKey || !serviceRoleKey) {
  throw new Error(
    "Set NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, and SUPABASE_SERVICE_ROLE_KEY.",
  );
}

const admin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const anon = createClient(supabaseUrl, publicKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const suffix = `${Date.now().toString(36)}${randomBytes(3).toString("hex")}`;
const aliasA = `rlstest_a_${suffix.slice(-8)}`;
const aliasB = `rlstest_b_${suffix.slice(-8)}`;
const aliasC = `rlstest_c_${suffix.slice(-8)}`;
const password = `Test-${randomBytes(12).toString("base64url")}`;
const certificateCodeA = `RLSTEST-${suffix.toUpperCase()}-A`;
const certificateCodeB = `RLSTEST-${suffix.toUpperCase()}-B`;

const createdUserIds = [];
let challengeId = null;
let failures = 0;

function check(name, condition, detail = "") {
  if (condition) {
    console.log(`PASS ${name}`);
  } else {
    failures += 1;
    console.error(`FAIL ${name}${detail ? `: ${detail}` : ""}`);
  }
}

async function createTestUser(label) {
  const email = `rlstest-${suffix}-${label}@example.com`;
  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (error || !data.user) {
    throw new Error(`Could not create test user ${label}: ${error?.message ?? "unknown"}`);
  }

  createdUserIds.push(data.user.id);

  const client = createClient(supabaseUrl, publicKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { error: signInError } = await client.auth.signInWithPassword({ email, password });

  if (signInError) {
    throw new Error(`Could not sign in test user ${label}: ${signInError.message}`);
  }

  return { id: data.user.id, client };
}

async function insertProfile(user, alias, overrides = {}) {
  const { error } = await user.client.from("profiles").insert({
    id: user.id,
    alias,
    real_name: `RLS Test ${alias}`,
    country_code: "BD",
    show_country: true,
    show_on_leaderboard: true,
    certificate_name: `RLS Test ${alias}`,
    ...overrides,
  });

  if (error) {
    throw new Error(`Could not insert profile ${alias}: ${error.message}`);
  }
}

try {
  const userA = await createTestUser("a");
  const userB = await createTestUser("b");
  const userC = await createTestUser("c");

  await insertProfile(userA, aliasA);
  await insertProfile(userB, aliasB, { show_country: false });
  await insertProfile(userC, aliasC, { show_on_leaderboard: false });

  const now = Date.now();
  const { data: challenge, error: challengeError } = await admin
    .from("challenges")
    .insert({
      slug: `rls-${suffix}`,
      title: "RLS Test Challenge",
      start_at: new Date(now - 86_400_000).toISOString(),
      end_at: new Date(now + 86_400_000).toISOString(),
      timezone: "Asia/Dhaka",
      status: "scheduled",
    })
    .select("id")
    .single();

  if (challengeError || !challenge) {
    throw new Error(`Could not create test challenge: ${challengeError?.message ?? "unknown"}`);
  }

  challengeId = challenge.id;

  const participations = [
    {
      challenge_id: challengeId,
      user_id: userA.id,
      attempt_started_at: new Date(now - 3_600_000).toISOString(),
      attempt_status: "active",
      is_late_joiner: false,
    },
    {
      challenge_id: challengeId,
      user_id: userB.id,
      attempt_started_at: new Date(now - 1_800_000).toISOString(),
      attempt_status: "active",
      is_late_joiner: false,
    },
    {
      challenge_id: challengeId,
      user_id: userC.id,
      attempt_started_at: new Date(now - 900_000).toISOString(),
      attempt_status: "active",
      is_late_joiner: false,
    },
  ];

  const { data: insertedParticipations, error: participationError } = await admin
    .from("participations")
    .insert(participations)
    .select("id,user_id");

  if (participationError || !insertedParticipations) {
    throw new Error(
      `Could not create test participations: ${participationError?.message ?? "unknown"}`,
    );
  }

  const participationA = insertedParticipations.find((row) => row.user_id === userA.id);
  const participationB = insertedParticipations.find((row) => row.user_id === userB.id);

  if (!participationA || !participationB) {
    throw new Error("Missing test participations");
  }

  const { error: certificateError } = await admin.from("certificates").insert([
    {
      certificate_code: certificateCodeA,
      participation_id: participationA.id,
      display_name: "RLS Test A",
      status: "valid",
    },
    {
      certificate_code: certificateCodeB,
      participation_id: participationB.id,
      display_name: "RLS Test B",
      status: "valid",
    },
  ]);

  if (certificateError) {
    throw new Error(`Could not create test certificates: ${certificateError.message}`);
  }

  const anonProfiles = await anon.from("profiles").select("*");
  check(
    "anonymous cannot read profiles table",
    anonProfiles.error !== null || (anonProfiles.data?.length ?? 0) === 0,
  );

  const anonParticipations = await anon.from("participations").select("*");
  check(
    "anonymous cannot read participations table",
    anonParticipations.error !== null || (anonParticipations.data?.length ?? 0) === 0,
  );

  const anonCertificates = await anon.from("certificates").select("*");
  check(
    "anonymous cannot read certificates table",
    anonCertificates.error !== null || (anonCertificates.data?.length ?? 0) === 0,
  );

  const anonChallenges = await anon
    .from("public_challenges")
    .select("*")
    .eq("slug", `rls-${suffix}`);
  check(
    "anonymous can read safe public challenge view",
    !anonChallenges.error && anonChallenges.data?.length === 1,
    anonChallenges.error?.message,
  );

  const anonLeaderboard = await anon
    .from("public_leaderboard")
    .select("*")
    .eq("challenge_slug", `rls-${suffix}`)
    .order("rank", { ascending: true });

  check(
    "public leaderboard returns only safe fields",
    !anonLeaderboard.error &&
      anonLeaderboard.data?.every(
        (row) =>
          Object.keys(row).sort().join(",") ===
          "alias,challenge_slug,country_code,is_late_joiner,rank,streak_seconds",
      ),
    anonLeaderboard.error?.message,
  );

  check(
    "hidden profiles are excluded from the public leaderboard",
    !anonLeaderboard.error &&
      anonLeaderboard.data?.length === 2 &&
      !anonLeaderboard.data.some((row) => row.alias === aliasC),
  );

  const leaderboardA = anonLeaderboard.data?.find((row) => row.alias === aliasA);
  const leaderboardB = anonLeaderboard.data?.find((row) => row.alias === aliasB);
  check("country is shown when opted in", leaderboardA?.country_code === "BD");
  check("country is hidden when opted out", leaderboardB?.country_code === null);

  const anonCertificate = await anon
    .from("public_certificates")
    .select("*")
    .eq("certificate_code", certificateCodeA);
  check(
    "public certificate verification exposes only safe fields",
    !anonCertificate.error &&
      anonCertificate.data?.length === 1 &&
      Object.keys(anonCertificate.data[0]).sort().join(",") ===
        "certificate_code,challenge_title,challenge_year,display_name,issued_at,status",
    anonCertificate.error?.message,
  );

  const ownProfile = await userA.client.from("profiles").select("*").eq("id", userA.id).single();
  check("user can read own profile", !ownProfile.error && ownProfile.data?.alias === aliasA);

  const otherProfile = await userA.client.from("profiles").select("*").eq("id", userB.id);
  check("user cannot read another profile", !otherProfile.error && otherProfile.data?.length === 0);

  const otherProfileUpdate = await userA.client
    .from("profiles")
    .update({ real_name: "Compromised" })
    .eq("id", userB.id)
    .select();
  check(
    "user cannot update another profile",
    !otherProfileUpdate.error && otherProfileUpdate.data?.length === 0,
    otherProfileUpdate.error?.message,
  );

  const ownParticipation = await userA.client
    .from("participations")
    .select("*")
    .eq("id", participationA.id)
    .single();
  check("user can read own participation", !ownParticipation.error);

  const otherParticipation = await userA.client
    .from("participations")
    .select("*")
    .eq("user_id", userB.id);
  check(
    "user cannot read another participation",
    !otherParticipation.error && otherParticipation.data?.length === 0,
  );

  const protectedParticipationUpdate = await userA.client
    .from("participations")
    .update({ attempt_started_at: new Date(0).toISOString() })
    .eq("id", participationA.id)
    .select();
  check(
    "user cannot edit attempt timestamps directly",
    !protectedParticipationUpdate.error && protectedParticipationUpdate.data?.length === 0,
    protectedParticipationUpdate.error?.message,
  );

  const ownCertificate = await userA.client
    .from("certificates")
    .select("*")
    .eq("certificate_code", certificateCodeA);
  check(
    "user can read own certificate",
    !ownCertificate.error && ownCertificate.data?.length === 1,
  );

  const otherCertificate = await userA.client
    .from("certificates")
    .select("*")
    .eq("certificate_code", certificateCodeB);
  check(
    "user cannot read another certificate",
    !otherCertificate.error && otherCertificate.data?.length === 0,
  );

  const reservedAlias = await userA.client
    .from("profiles")
    .update({ alias: "admin" })
    .eq("id", userA.id);
  check("reserved aliases are rejected", reservedAlias.error !== null);

  const duplicateAlias = await admin.from("profiles").update({ alias: aliasA }).eq("id", userC.id);
  check("alias uniqueness is enforced", duplicateAlias.error !== null);

  const invalidChallenge = await admin.from("challenges").insert({
    slug: `invalid-${suffix}`,
    title: "Invalid Test Challenge",
    start_at: new Date(now + 86_400_000).toISOString(),
    end_at: new Date(now).toISOString(),
    timezone: "Asia/Dhaka",
    status: "scheduled",
  });
  check("challenge end must be after start", invalidChallenge.error !== null);

  const adminProfiles = await admin
    .from("profiles")
    .select("id,real_name")
    .eq("id", userA.id)
    .single();
  check(
    "service role can read private profile fields",
    !adminProfiles.error && adminProfiles.data?.real_name === `RLS Test ${aliasA}`,
  );
} finally {
  if (challengeId) {
    await admin.from("challenges").delete().eq("id", challengeId);
  }

  if (createdUserIds.length > 0) {
    await admin.from("profiles").delete().in("id", createdUserIds);
    await Promise.all(
      createdUserIds.map((userId) => admin.auth.admin.deleteUser(userId).catch(() => null)),
    );
  }
}

if (failures > 0) {
  console.error(`\n${failures} RLS check(s) failed.`);
  process.exitCode = 1;
} else {
  console.log("\nAll RLS checks passed.");
}
