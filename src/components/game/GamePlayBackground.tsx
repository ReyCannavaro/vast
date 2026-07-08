import type { ReactNode } from "react";

type GamePlayBackgroundProps = {
  children: ReactNode;
};

export function GamePlayBackground({ children }: GamePlayBackgroundProps) {
  return (
    <main className="relative isolate flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-[#17110d] p-4 selection:bg-primary/20 selection:text-primary sm:p-8 md:p-12">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_20%_18%,rgb(165_92_35_/_0.30),transparent_32%),radial-gradient(circle_at_82%_20%,rgb(214_153_82_/_0.18),transparent_28%),linear-gradient(135deg,rgb(18_13_10),rgb(55_35_22)_52%,rgb(13_11_9))]" />
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.30] [background-image:radial-gradient(circle_at_center,rgb(255_221_170_/_0.34)_0_1px,transparent_1px),radial-gradient(circle_at_center,transparent_0_11px,rgb(255_221_170_/_0.18)_12px_13px,transparent_14px),linear-gradient(45deg,transparent_46%,rgb(255_221_170_/_0.14)_47%_53%,transparent_54%)] [background-position:0_0,18px_18px,0_0] [background-size:36px_36px,36px_36px,72px_72px]" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(180deg,rgb(0_0_0_/_0.42),transparent_26%,rgb(0_0_0_/_0.54)),radial-gradient(circle_at_center,transparent_34%,rgb(0_0_0_/_0.56)_100%)]" />
      <div className="relative z-10 flex min-h-[100dvh] w-full flex-col items-center justify-center">
        {children}
      </div>
    </main>
  );
}
