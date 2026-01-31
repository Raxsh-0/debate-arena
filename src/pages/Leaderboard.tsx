import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Trophy, ChevronUp, ChevronDown, Minus, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { getLeague, getLeagueName } from "@/components/dashboard/LeagueBadge";

// Mock leaderboard data
const leaderboardData = [
  { rank: 1, username: "EloquentMaster", elo: 2347, change: 12, wins: 412, matches: 523 },
  { rank: 2, username: "DebateKing", elo: 2298, change: -5, wins: 389, matches: 498 },
  { rank: 3, username: "LogicLord", elo: 2256, change: 8, wins: 367, matches: 471 },
  { rank: 4, username: "RhetoricPro", elo: 2201, change: 0, wins: 345, matches: 456 },
  { rank: 5, username: "SilverTongue", elo: 2189, change: 15, wins: 334, matches: 442 },
  { rank: 6, username: "ArgumentAce", elo: 2134, change: -3, wins: 312, matches: 421 },
  { rank: 7, username: "PersuaderX", elo: 2098, change: 7, wins: 298, matches: 398 },
  { rank: 8, username: "WordSmith", elo: 2067, change: -8, wins: 287, matches: 389 },
  { rank: 9, username: "CriticalMind", elo: 2045, change: 4, wins: 276, matches: 378 },
  { rank: 10, username: "DebateMaster", elo: 1998, change: 11, wins: 265, matches: 367 },
  { rank: 11, username: "VoiceOfReason", elo: 1956, change: -2, wins: 254, matches: 356 },
  { rank: 12, username: "LogicFlow", elo: 1923, change: 6, wins: 243, matches: 345 },
  { rank: 13, username: "PointMaker", elo: 1889, change: 3, wins: 232, matches: 334 },
  { rank: 14, username: "ClaimCrusher", elo: 1856, change: -4, wins: 221, matches: 323 },
  { rank: 15, username: "FactFinder", elo: 1823, change: 9, wins: 210, matches: 312 },
];

const leagues = [
  { name: "All", min: 0, max: 10000 },
  { name: "Platinum", min: 2000, max: 10000, class: "league-platinum" },
  { name: "Gold", min: 1600, max: 1999, class: "league-gold" },
  { name: "Silver", min: 1200, max: 1599, class: "league-silver" },
  { name: "Bronze", min: 0, max: 1199, class: "league-bronze" },
];

export default function Leaderboard() {
  const [selectedLeague, setSelectedLeague] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = leaderboardData.filter(player => {
    const league = leagues.find(l => l.name === selectedLeague);
    if (!league) return true;
    const inLeague = player.elo >= league.min && player.elo <= league.max;
    const matchesSearch = player.username.toLowerCase().includes(searchQuery.toLowerCase());
    return inLeague && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Global <span className="text-gradient-primary">Leaderboard</span>
            </h1>
            <p className="text-muted-foreground">
              Top debaters ranked by Elo rating
            </p>
          </div>

          {/* League Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {leagues.map((league) => (
              <Button
                key={league.name}
                variant={selectedLeague === league.name ? "glow" : "outline"}
                size="sm"
                onClick={() => setSelectedLeague(league.name)}
                className="gap-2"
              >
                {league.class && (
                  <div className={cn("w-4 h-4 rounded-full", league.class)} />
                )}
                {league.name}
              </Button>
            ))}
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search players..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Leaderboard Table */}
          <div className="glass-card rounded-xl overflow-hidden max-w-4xl mx-auto">
            {/* Header */}
            <div className="grid grid-cols-12 gap-4 p-4 bg-secondary/50 text-sm font-medium text-muted-foreground border-b border-border">
              <div className="col-span-1 text-center">#</div>
              <div className="col-span-5">Player</div>
              <div className="col-span-2 text-center">Elo</div>
              <div className="col-span-2 text-center">Win Rate</div>
              <div className="col-span-2 text-center">24h Change</div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-border">
              {filteredData.map((player, index) => {
                const league = getLeague(player.elo);
                const winRate = ((player.wins / player.matches) * 100).toFixed(1);
                
                return (
                  <div 
                    key={player.rank}
                    className={cn(
                      "grid grid-cols-12 gap-4 p-4 items-center hover:bg-secondary/30 transition-colors",
                      player.rank <= 3 && "bg-primary/5"
                    )}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {/* Rank */}
                    <div className="col-span-1 text-center">
                      {player.rank <= 3 ? (
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center mx-auto",
                          player.rank === 1 && "league-gold glow-gold",
                          player.rank === 2 && "league-silver",
                          player.rank === 3 && "league-bronze"
                        )}>
                          <Trophy className="w-4 h-4 text-white" />
                        </div>
                      ) : (
                        <span className="text-muted-foreground font-mono">{player.rank}</span>
                      )}
                    </div>

                    {/* Player */}
                    <div className="col-span-5 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                        <span className="font-bold">{player.username[0]}</span>
                      </div>
                      <div>
                        <div className="font-semibold">{player.username}</div>
                        <div className="text-xs text-muted-foreground">
                          {player.matches} matches
                        </div>
                      </div>
                    </div>

                    {/* Elo */}
                    <div className="col-span-2 text-center">
                      <div className="font-bold">{player.elo}</div>
                      <div className={cn(
                        "text-xs font-medium",
                        league === "platinum" && "text-league-platinum",
                        league === "gold" && "text-league-gold",
                        league === "silver" && "text-league-silver",
                        league === "bronze" && "text-league-bronze"
                      )}>
                        {getLeagueName(league)}
                      </div>
                    </div>

                    {/* Win Rate */}
                    <div className="col-span-2 text-center">
                      <div className="font-semibold">{winRate}%</div>
                      <div className="text-xs text-muted-foreground">
                        {player.wins}W
                      </div>
                    </div>

                    {/* 24h Change */}
                    <div className="col-span-2 text-center">
                      <div className={cn(
                        "flex items-center justify-center gap-1 font-semibold",
                        player.change > 0 && "text-success",
                        player.change < 0 && "text-destructive",
                        player.change === 0 && "text-muted-foreground"
                      )}>
                        {player.change > 0 && <ChevronUp className="w-4 h-4" />}
                        {player.change < 0 && <ChevronDown className="w-4 h-4" />}
                        {player.change === 0 && <Minus className="w-4 h-4" />}
                        {Math.abs(player.change)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredData.length === 0 && (
              <div className="p-12 text-center text-muted-foreground">
                No players found matching your criteria.
              </div>
            )}
          </div>

          {/* Your Rank Card */}
          <div className="max-w-4xl mx-auto mt-8">
            <div className="glass-card rounded-xl p-6 border-primary/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-bold text-muted-foreground">#247</div>
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">Y</span>
                  </div>
                  <div>
                    <div className="font-semibold">You (DebateMaster)</div>
                    <div className="text-sm text-muted-foreground">Silver League</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">1547</div>
                  <div className="text-sm text-success">+47 this week</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}