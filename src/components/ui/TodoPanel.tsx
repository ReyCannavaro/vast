type TodoPanelProps = {
  task: string;
};

export function TodoPanel({ task }: TodoPanelProps) {
  return (
    <section className="mt-8 border border-dashed border-border bg-surface p-5">
      <p className="text-sm font-semibold text-secondary">TODO</p>
      <p className="mt-2 text-sm leading-6 text-muted">{task}</p>
    </section>
  );
}
