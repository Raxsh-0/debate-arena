import { Navbar } from "@/components/layout/Navbar";
import { SkillsRadarChart } from "@/components/dashboard/SkillsRadarChart";
import { LeagueBadge } from "@/components/dashboard/LeagueBadge";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Button } from "@/components/ui/button";
import { 
  Swords, 
  Trophy, 
  Target, 
  TrendingUp, 
  Clock, 
  Flame,
  ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock user data
const userData = {
  username: "DebateMaster",
  elo: 1547,
  matchesPlayed: 142,
  wins: 89,
  winRate: 62.7,
  currentStreak: 5,
  avgMatchTime: "4:32",
  skills: {
    persuasion: 78,
    vocabulary: 65,
    logic: 82,
    speed: 71,
    rebuttal: 74,
  },
  recentMatches: [
    { id: 1, opponent: "LogicKing", topic: "AI Ethics", result: "win", eloChange: 24 },
    { id: 2, opponent: "SilverTongue", topic: "Climate Policy", result: "win", eloChange: 18 },
    { id: 3, opponent: "DebateBot", topic: "Remote Work", result: "loss", eloChange: -15 },
    { id: 4, opponent: "RhetoricPro", topic: "Free Speech", result: "win", eloChange: 22 },
  ]
};

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-1">Welcome back, <span className="text-gradient-primary">{userData.username}</span></h1>
              <p className="text-muted-foreground">Your debate performance at a glance</p>
            </div>
            <Link to="/queue">
              <Button variant="queue" size="lg">
                <Swords className="w-4 h-4 mr-2" />
                Find Match
              </Button>
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Stats */}
            <div className="lg:col-span-2 space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatsCard 
                  icon={Trophy} 
                  label="Matches Won" 
                  value={userData.wins}
                  trend={{ value: 12, positive: true }}
                />
                <StatsCard 
                  icon={Target} 
                  label="Win Rate" 
                  value={`${userData.winRate}%`}
                  trend={{ value: 3.2, positive: true }}
                />
                <StatsCard 
                  icon={Flame} 
                  label="Current Streak" 
                  value={userData.currentStreak}
                />
                <StatsCard 
                  icon={Clock} 
                  label="Avg Match Time" 
                  value={userData.avgMatchTime}
                />
              </div>

              {/* Skills Radar */}
              <div className="glass-card rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Skill Analysis</h2>
                  <span className="text-sm text-muted-foreground">Last 30 days</span>
                </div>
                <SkillsRadarChart data={userData.skills} />
              </div>

              {/* Recent Matches */}
              <div className="glass-card rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Recent Matches</h2>
                  <Button variant="ghost" size="sm" className="text-primary">
                    View All <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
                <div className="space-y-3">
                  {userData.recentMatches.map((match) => (
                    <div 
                      key={match.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-2 h-2 rounded-full ${match.result === 'win' ? 'bg-success' : 'bg-destructive'}`} />
                        <div>
                          <div className="font-medium">vs {match.opponent}</div>
                          <div className="text-sm text-muted-foreground">{match.topic}</div>
                        </div>
                      </div>
                      <div className={`font-semibold ${match.eloChange > 0 ? 'text-success' : 'text-destructive'}`}>
                        {match.eloChange > 0 ? '+' : ''}{match.eloChange}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - League & Progress */}
            <div className="space-y-6">
              {/* League Card */}
              <div className="glass-card rounded-xl p-6 text-center">
                <h2 className="text-lg font-semibold mb-6">Current Rank</h2>
                <LeagueBadge elo={userData.elo} size="lg" />
                
                {/* Progress to next league */}
                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progress to Gold</span>
                    <span className="font-medium">{userData.elo} / 1600</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-[hsl(200,100%,55%)] transition-all duration-500"
                      style={{ width: `${((userData.elo - 1200) / 400) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="glass-card rounded-xl p-6">
                <h2 className="text-lg font-semibold mb-4">Career Stats</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Matches</span>
                    <span className="font-semibold">{userData.matchesPlayed}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Highest Elo</span>
                    <span className="font-semibold text-primary">1583</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Best Streak</span>
                    <span className="font-semibold">8 wins</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Favorite Category</span>
                    <span className="font-semibold">Professional</span>
                  </div>
                </div>
              </div>

              {/* Elo Trend */}
              <div className="glass-card rounded-xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-success" />
                  <h2 className="text-lg font-semibold">Elo Trend</h2>
                </div>
                <p className="text-sm text-muted-foreground mb-4">Last 7 days</p>
                <div className="text-3xl font-bold text-success">+47</div>
                <p className="text-sm text-muted-foreground">Great progress! Keep it up.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}