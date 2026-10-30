export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      certificates: {
        Row: {
          certificate_code: string;
          display_name: string;
          id: string;
          issued_at: string;
          participation_id: string;
          pdf_storage_path: string | null;
          status: string;
        };
        ComputedFields: never;
        Insert: {
          certificate_code: string;
          display_name: string;
          id?: string;
          issued_at?: string;
          participation_id: string;
          pdf_storage_path?: string | null;
          status?: string;
        };
        Update: {
          certificate_code?: string;
          display_name?: string;
          id?: string;
          issued_at?: string;
          participation_id?: string;
          pdf_storage_path?: string | null;
          status?: string;
        };
        Relationships: [
          {
            foreignKeyName: "certificates_participation_id_fkey";
            columns: ["participation_id"];
            isOneToOne: true;
            referencedRelation: "participations";
            referencedColumns: ["id"];
          },
        ];
      };
      challenges: {
        Row: {
          created_at: string;
          end_at: string;
          id: string;
          registration_closes_at: string | null;
          registration_opens_at: string | null;
          slug: string;
          start_at: string;
          status: string;
          timezone: string;
          title: string;
        };
        ComputedFields: never;
        Insert: {
          created_at?: string;
          end_at: string;
          id?: string;
          registration_closes_at?: string | null;
          registration_opens_at?: string | null;
          slug: string;
          start_at: string;
          status?: string;
          timezone: string;
          title: string;
        };
        Update: {
          created_at?: string;
          end_at?: string;
          id?: string;
          registration_closes_at?: string | null;
          registration_opens_at?: string | null;
          slug?: string;
          start_at?: string;
          status?: string;
          timezone?: string;
          title?: string;
        };
        Relationships: [];
      };
      participations: {
        Row: {
          attempt_started_at: string;
          attempt_status: string;
          challenge_id: string;
          completed_at: string | null;
          created_at: string;
          id: string;
          is_late_joiner: boolean;
          joined_at: string;
          reset_at: string | null;
          user_id: string;
        };
        ComputedFields: never;
        Insert: {
          attempt_started_at: string;
          attempt_status?: string;
          challenge_id: string;
          completed_at?: string | null;
          created_at?: string;
          id?: string;
          is_late_joiner?: boolean;
          joined_at?: string;
          reset_at?: string | null;
          user_id: string;
        };
        Update: {
          attempt_started_at?: string;
          attempt_status?: string;
          challenge_id?: string;
          completed_at?: string | null;
          created_at?: string;
          id?: string;
          is_late_joiner?: boolean;
          joined_at?: string;
          reset_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "participations_challenge_id_fkey";
            columns: ["challenge_id"];
            isOneToOne: false;
            referencedRelation: "challenges";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          alias: string;
          certificate_name: string | null;
          country_code: string | null;
          created_at: string;
          id: string;
          real_name: string | null;
          show_country: boolean;
          show_on_leaderboard: boolean;
          updated_at: string;
        };
        ComputedFields: never;
        Insert: {
          alias: string;
          certificate_name?: string | null;
          country_code?: string | null;
          created_at?: string;
          id: string;
          real_name?: string | null;
          show_country?: boolean;
          show_on_leaderboard?: boolean;
          updated_at?: string;
        };
        Update: {
          alias?: string;
          certificate_name?: string | null;
          country_code?: string | null;
          created_at?: string;
          id?: string;
          real_name?: string | null;
          show_country?: boolean;
          show_on_leaderboard?: boolean;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      public_certificates: {
        Row: {
          certificate_code: string;
          challenge_title: string;
          challenge_year: number | null;
          display_name: string;
          issued_at: string;
          status: string;
        };
        ComputedFields: never;
        Relationships: [];
      };
      public_challenges: {
        Row: {
          end_at: string;
          registration_closes_at: string | null;
          registration_opens_at: string | null;
          slug: string;
          start_at: string;
          status: string;
          timezone: string;
          title: string;
        };
        ComputedFields: never;
        Insert: {
          end_at?: string | null;
          registration_closes_at?: string | null;
          registration_opens_at?: string | null;
          slug?: string | null;
          start_at?: string | null;
          status?: string | null;
          timezone?: string | null;
          title?: string | null;
        };
        Update: {
          end_at?: string | null;
          registration_closes_at?: string | null;
          registration_opens_at?: string | null;
          slug?: string | null;
          start_at?: string | null;
          status?: string | null;
          timezone?: string | null;
          title?: string | null;
        };
        Relationships: [];
      };
      public_leaderboard: {
        Row: {
          alias: string;
          challenge_slug: string;
          country_code: string | null;
          is_late_joiner: boolean;
          rank: number | null;
          streak_seconds: number | null;
        };
        ComputedFields: never;
        Relationships: [];
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    keyof DefaultSchema["Enums"] | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    keyof DefaultSchema["CompositeTypes"] | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
