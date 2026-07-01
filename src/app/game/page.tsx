import { GameModeCard } from "@/components/game";
import { SiteFooter, SiteHeader } from "@/components/layout";
import { PageContainer, PageHeader } from "@/components/ui";
import { getGameCatalog } from "@/lib/gameService";

export default function GamePage() {
  const gameItems = getGameCatalog();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <PageContainer>
        <PageHeader
          eyebrow="Game"
          title="Mini game edukatif VAST"
          description="Katalog permainan berbasis data budaya, kuliner, batik, dan destinasi Jawa Timur."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {gameItems.map((game) => (
            <GameModeCard key={game.href} game={game} />
          ))}
        </div>
      </PageContainer>
      <SiteFooter />
    </div>
  );
}
