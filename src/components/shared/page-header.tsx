import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="space-y-3">
      {eyebrow ? (
        <p className="text-xs font-semibold tracking-[0.2em] text-primary-text uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h1>
      {description ? (
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
          {description}
        </p>
      ) : null}
      {children}
    </div>
  );
}
