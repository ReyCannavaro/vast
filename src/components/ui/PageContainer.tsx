import type { ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
  size?: "narrow" | "default" | "wide";
  className?: string;
};

const sizeClassNames = {
  narrow: "max-w-4xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
};

export function PageContainer({
  children,
  size = "default",
  className = "",
}: PageContainerProps) {
  return (
    <main className={`mx-auto ${sizeClassNames[size]} px-5 py-14 ${className}`}>
      {children}
    </main>
  );
}
