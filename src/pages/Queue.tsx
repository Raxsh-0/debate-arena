import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { 
  Users, 
  Zap, 
  Clock, 
  Bot,
  X,
  RefreshCw
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Queue() {
  const [queueState, setQueueState] = useState<"idle" | "searching" | "found" | "veto">("idle");
  const [searchTime, setSearchTime] = useState(0);
  const [matchData, setMatchData] = useState<{
    opponent: string;
    opponentElo: number;
    topic: string;
  } | null>(null);
  const [vetoTimer, setVetoTimer] = useState(15);
  const [vetoCount, setVetoCount] = useState(0);

  // Search timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (queueState === "searching") {
      interval = setInterval(() => {
        setSearchTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [queueState]);

  // Veto timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (queueState === "veto" && vetoTimer > 0) {
      interval = setInterval(() => {
        setVetoTimer(prev => prev - 1);
      }, 1000);
    }
    if (vetoTimer === 0 && queueState === "veto") {
      // Auto-accept if timer runs out
      handleAcceptTopic();
    }
    return () => clearInterval(interval);
  }, [queueState, vetoTimer]);

  // Simulate finding a match after random time
  useEffect(() => {
    if (queueState === "searching" && searchTime >= 3) {
      // Simulate match found
      setMatchData({
        opponent: "LogicMaster",
        opponentElo: 1520,
        topic: "Should AI be regulated by governments?"
      });
      setQueueState("veto");
      setVetoTimer(15);
    }
  }, [queueState, searchTime]);

  const handleFindMatch = () => {
    setQueueState("searching");
    setSearchTime(0);
  };

  const handleCancelQueue = () => {
    setQueueState("idle");
    setSearchTime(0);
    setMatchData(null);
  };

  const handleVetoTopic = () => {
    if (vetoCount < 1) {
      setVetoCount(prev => prev + 1);
      setVetoTimer(15);
      // Simulate new topic
      setMatchData(prev => prev ? {
        ...prev,
        topic: "Is remote work more productive than office work?"
      } : null);
    }
  };

  const handleAcceptTopic = () => {
    // Navigate to arena (would be implemented with router)
    window.location.href = "/arena";
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Find a <span className="text-gradient-primary">Match</span>
            </h1>
            <p className="text-muted-foreground">
              Battle opponents at your skill level in real-time debates
            </p>
          </div>

          {/* Queue Card */}
          <div className="glass-card rounded-2xl p-8 text-center">
            {queueState === "idle" && (
              <div className="animate-fade-in">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Users className="w-12 h-12 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Ready to Debate?</h2>
                <p className="text-muted-foreground mb-8">
                  You'll be matched with an opponent of similar skill
                </p>
                <Button variant="queue" size="xl" onClick={handleFindMatch}>
                  <Zap className="w-5 h-5 mr-2" />
                  Find Match
                </Button>
                <div className="mt-6 text-sm text-muted-foreground">
                  Average wait time: ~30 seconds
                </div>
              </div>
            )}

            {queueState === "searching" && (
              <div className="animate-fade-in">
                <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6 pulse-ring scan-line">
                  <Users className="w-12 h-12 text-primary animate-pulse" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Searching for Opponent...</h2>
                <div className="flex items-center justify-center gap-2 text-primary mb-8">
                  <Clock className="w-5 h-5" />
                  <span className="text-xl font-mono">{formatTime(searchTime)}</span>
                </div>
                
                {/* Skill range indicator */}
                <div className="glass-card rounded-lg p-4 mb-6 max-w-xs mx-auto">
                  <div className="text-sm text-muted-foreground mb-1">Searching Elo Range</div>
                  <div className="font-bold text-lg">1447 - 1647</div>
                </div>

                <Button variant="outline" onClick={handleCancelQueue}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>

                {searchTime >= 120 && (
                  <div className="mt-6 p-4 border border-primary/30 rounded-lg bg-primary/5 animate-fade-in">
                    <Bot className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-3">
                      No human opponents found. Practice against AI?
                    </p>
                    <Button variant="glow-outline" size="sm">
                      Practice vs AI (+0.1 Elo max)
                    </Button>
                  </div>
                )}
              </div>
            )}

            {queueState === "veto" && matchData && (
              <div className="animate-fade-in">
                <div className="text-success text-sm font-medium mb-4">✓ Match Found!</div>
                
                {/* Opponent Info */}
                <div className="flex items-center justify-center gap-8 mb-8">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl font-bold">Y</span>
                    </div>
                    <div className="font-medium">You</div>
                    <div className="text-sm text-muted-foreground">1547 Elo</div>
                  </div>
                  <div className="text-3xl font-bold text-primary">VS</div>
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl font-bold">{matchData.opponent[0]}</span>
                    </div>
                    <div className="font-medium">{matchData.opponent}</div>
                    <div className="text-sm text-muted-foreground">{matchData.opponentElo} Elo</div>
                  </div>
                </div>

                {/* Topic */}
                <div className="glass-card rounded-xl p-6 mb-6">
                  <div className="text-sm text-muted-foreground mb-2">Debate Topic</div>
                  <div className="text-xl font-semibold">{matchData.topic}</div>
                </div>

                {/* Timer */}
                <div className={cn(
                  "text-4xl font-mono font-bold mb-6",
                  vetoTimer <= 5 && "timer-urgent"
                )}>
                  {vetoTimer}s
                </div>

                {/* Actions */}
                <div className="flex gap-4 justify-center">
                  <Button 
                    variant="veto" 
                    size="lg" 
                    onClick={handleVetoTopic}
                    disabled={vetoCount >= 1}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Veto Topic {vetoCount >= 1 && "(Used)"}
                  </Button>
                  <Button variant="accept" size="lg" onClick={handleAcceptTopic}>
                    <Zap className="w-4 h-4 mr-2" />
                    Accept & Start
                  </Button>
                </div>

                {vetoCount >= 1 && (
                  <p className="text-sm text-muted-foreground mt-4">
                    You've used your veto. Topic is final.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Queue Info */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div className="glass-card rounded-lg p-4">
              <div className="text-2xl font-bold text-primary">247</div>
              <div className="text-sm text-muted-foreground">In Queue</div>
            </div>
            <div className="glass-card rounded-lg p-4">
              <div className="text-2xl font-bold text-primary">1,284</div>
              <div className="text-sm text-muted-foreground">Online Now</div>
            </div>
            <div className="glass-card rounded-lg p-4">
              <div className="text-2xl font-bold text-primary">~28s</div>
              <div className="text-sm text-muted-foreground">Avg Wait</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}