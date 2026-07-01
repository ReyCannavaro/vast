import type { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
};

export function PageHeader({ eyebrow, title, description, children }: PageHeaderProps) {
  return (
    <header>
      <p className="text-sm font-semibold uppercase text-secondary">{eyebrow}</p>
      <h1 className="mt-2 text-4xl font-bold text-foreground">{title}</h1>
      {description ? <p className="mt-4 max-w-3xl text-muted">{description}</p> : null}
      {children ? <div className="mt-6">{children}</div> : null}
    </header>
  );
}
