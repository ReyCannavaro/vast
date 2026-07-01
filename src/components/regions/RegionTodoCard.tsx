type RegionTodoCardProps = {
  title: string;
  task: string;
};

export function RegionTodoCard({ title, task }: RegionTodoCardProps) {
  return (
    <article className="border border-border bg-surface p-5">
      <h2 className="text-lg font-semibold text-primary">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-muted">{task}</p>
    </article>
  );
}
