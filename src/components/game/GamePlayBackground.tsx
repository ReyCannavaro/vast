import type { ReactNode } from "react";

type GamePlayBackgroundProps = {
  children: ReactNode;
};

export function GamePlayBackground({ children }: GamePlayBackgroundProps) {
  return (
    <main className="relative isolate flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-[#21160f] p-4 selection:bg-primary/20 selection:text-primary sm:p-8 md:p-12">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_18%_18%,rgb(177_102_43_/_0.38),transparent_34%),radial-gradient(circle_at_82%_20%,rgb(218_158_90_/_0.26),transparent_30%),linear-gradient(135deg,rgb(31_21_14),rgb(75_47_28)_52%,rgb(25_18_13))]" />
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.44] [background-image:radial-gradient(circle_at_center,rgb(255_221_170_/_0.42)_0_1px,transparent_1px),radial-gradient(circle_at_center,transparent_0_11px,rgb(255_221_170_/_0.26)_12px_13px,transparent_14px),linear-gradient(45deg,transparent_46%,rgb(255_221_170_/_0.20)_47%_53%,transparent_54%)] [background-position:0_0,18px_18px,0_0] [background-size:36px_36px,36px_36px,72px_72px]" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(180deg,rgb(0_0_0_/_0.22),transparent_30%,rgb(0_0_0_/_0.28)),radial-gradient(circle_at_center,transparent_45%,rgb(0_0_0_/_0.32)_100%)]" />
      <div className="relative z-10 flex min-h-[100dvh] w-full flex-col items-center justify-center">
        {children}
      </div>
    </main>
  );
}
