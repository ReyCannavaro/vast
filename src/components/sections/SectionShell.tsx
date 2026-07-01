import type { ReactNode } from "react";

type SectionShellProps = {
  children: ReactNode;
  className?: string;
};

export function SectionShell({ children, className = "" }: SectionShellProps) {
  return <section className={`py-14 ${className}`}>{children}</section>;
}
