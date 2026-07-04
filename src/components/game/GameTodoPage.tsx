import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { PageContainer } from "@/components/ui/PageContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatPill } from "@/components/ui/StatPill";
import { TodoPanel } from "@/components/ui/TodoPanel";

type GameTodoPageProps = {
  eyebrow: string;
  title: string;
  description?: string;
  todo: string;
  stats?: Array<{
    label: string;
    value: string | number;
  }>;
  children?: ReactNode;
};

export function GameTodoPage({
  eyebrow,
  title,
  description,
  todo,
  stats = [],
  children,
}: GameTodoPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <PageContainer size="narrow">
        <PageHeader eyebrow={eyebrow} title={title} description={description}>
          {stats.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-3">
              {stats.map((stat) => (
                <StatPill key={stat.label} label={stat.label} value={stat.value} />
              ))}
            </div>
          ) : null}
        </PageHeader>
        <TodoPanel task={todo} />
        {children}
      </PageContainer>
      <SiteFooter />
    </div>
  );
}
