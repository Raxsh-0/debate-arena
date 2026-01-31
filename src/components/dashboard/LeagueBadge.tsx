import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

type League = "bronze" | "silver" | "gold" | "platinum";

interface LeagueBadgeProps {
  elo: number;
  size?: "sm" | "md" | "lg";
}

function getLeague(elo: number): League {
  if (elo >= 2000) return "platinum";
  if (elo >= 1600) return "gold";
  if (elo >= 1200) return "silver";
  return "bronze";
}

function getLeagueName(league: League): string {
  return league.charAt(0).toUpperCase() + league.slice(1);
}

function getNextLeagueElo(league: League): number | null {
  switch (league) {
    case "bronze": return 1200;
    case "silver": return 1600;
    case "gold": return 2000;
    case "platinum": return null;
  }
}

const leagueClasses: Record<League, string> = {
  bronze: "league-bronze",
  silver: "league-silver",
  gold: "league-gold",
  platinum: "league-platinum",
};

const sizeClasses = {
  sm: "w-10 h-10",
  md: "w-16 h-16",
  lg: "w-24 h-24",
};

const iconSizes = {
  sm: "w-5 h-5",
  md: "w-8 h-8",
  lg: "w-12 h-12",
};

export function LeagueBadge({ elo, size = "md" }: LeagueBadgeProps) {
  const league = getLeague(elo);
  const nextElo = getNextLeagueElo(league);
  
  return (
    <div className="flex flex-col items-center gap-2">
      <div 
        className={cn(
          "rounded-full flex items-center justify-center shadow-lg",
          leagueClasses[league],
          sizeClasses[size],
          league === "platinum" && "glow-primary",
          league === "gold" && "glow-gold"
        )}
      >
        <Trophy className={cn("text-white drop-shadow-md", iconSizes[size])} />
      </div>
      <div className="text-center">
        <div className="font-bold text-lg">{getLeagueName(league)}</div>
        <div className="text-sm text-muted-foreground">{elo} Elo</div>
        {nextElo && (
          <div className="text-xs text-primary mt-1">
            {nextElo - elo} to next rank
          </div>
        )}
      </div>
    </div>
  );
}

export { getLeague, getLeagueName };