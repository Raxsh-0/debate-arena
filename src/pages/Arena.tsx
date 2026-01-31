import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { 
  Mic, 
  MicOff, 
  AlertTriangle, 
  ThumbsUp, 
  FileQuestion,
  Clock,
  MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";

type Phase = "prep" | "argument-you" | "argument-opponent" | "rebuttal-you" | "rebuttal-opponent" | "judging" | "complete";

const phaseConfig = {
  "prep": { label: "Preparation", duration: 45, color: "text-primary" },
  "argument-you": { label: "Your Argument", duration: 120, color: "text-success" },
  "argument-opponent": { label: "Opponent's Argument", duration: 120, color: "text-warning" },
  "rebuttal-you": { label: "Your Rebuttal", duration: 60, color: "text-success" },
  "rebuttal-opponent": { label: "Opponent's Rebuttal", duration: 60, color: "text-warning" },
  "judging": { label: "AI Judging...", duration: 0, color: "text-primary" },
  "complete": { label: "Match Complete", duration: 0, color: "text-primary" },
};

const reactions = [
  { id: "fallacy", icon: AlertTriangle, label: "Logical Fallacy", color: "text-destructive" },
  { id: "strong", icon: ThumbsUp, label: "Strong Point", color: "text-success" },
  { id: "source", icon: FileQuestion, label: "Source Needed", color: "text-warning" },
];

export default function Arena() {
  const [phase, setPhase] = useState<Phase>("prep");
  const [timer, setTimer] = useState(phaseConfig["prep"].duration);
  const [scratchpad, setScratchpad] = useState("");
  const [reactionLog, setReactionLog] = useState<{ type: string; timestamp: number }[]>([]);
  const [transcript, setTranscript] = useState<string[]>([
    "Welcome to the debate arena!",
    "Topic: Should AI be regulated by governments?",
  ]);

  // Timer countdown
  useEffect(() => {
    if (phase === "judging" || phase === "complete") return;
    
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          advancePhase();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [phase]);

  const advancePhase = () => {
    const phaseOrder: Phase[] = ["prep", "argument-you", "argument-opponent", "rebuttal-you", "rebuttal-opponent", "judging", "complete"];
    const currentIndex = phaseOrder.indexOf(phase);
    const nextPhase = phaseOrder[currentIndex + 1];
    
    if (nextPhase) {
      setPhase(nextPhase);
      if (nextPhase !== "judging" && nextPhase !== "complete") {
        setTimer(phaseConfig[nextPhase].duration);
      }
      if (nextPhase === "judging") {
        // Simulate AI judging
        setTimeout(() => setPhase("complete"), 3000);
      }
    }
  };

  const handleReaction = (reactionId: string) => {
    setReactionLog(prev => [...prev, { type: reactionId, timestamp: Date.now() }]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isYourTurn = phase === "prep" || phase === "argument-you" || phase === "rebuttal-you";
  const canReact = phase === "argument-opponent" || phase === "rebuttal-opponent";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        {/* Phase Header */}
        <div className="bg-card border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Phase Indicator */}
                <div className="flex items-center gap-2">
                  {["prep", "argument-you", "argument-opponent", "rebuttal-you", "rebuttal-opponent"].map((p, i) => (
                    <div 
                      key={p}
                      className={cn(
                        "w-3 h-3 rounded-full transition-colors",
                        phase === p ? "bg-primary glow-primary" : 
                        ["prep", "argument-you", "argument-opponent", "rebuttal-you", "rebuttal-opponent"].indexOf(phase) > i 
                          ? "bg-primary/50" : "bg-secondary"
                      )}
                    />
                  ))}
                </div>
                <div className={cn("font-semibold", phaseConfig[phase].color)}>
                  {phaseConfig[phase].label}
                </div>
              </div>

              {/* Timer */}
              {phase !== "judging" && phase !== "complete" && (
                <div className={cn(
                  "flex items-center gap-2 text-2xl font-mono font-bold",
                  timer <= 10 && "timer-urgent"
                )}>
                  <Clock className="w-5 h-5" />
                  {formatTime(timer)}
                </div>
              )}

              {/* Mic Status */}
              <div className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg",
                isYourTurn ? "bg-success/20 text-success" : "bg-secondary text-muted-foreground"
              )}>
                {isYourTurn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                <span className="text-sm font-medium">
                  {isYourTurn ? "Your Turn" : "Listening"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left - Player Cards */}
            <div className="space-y-4">
              {/* You */}
              <div className={cn(
                "glass-card rounded-xl p-4 transition-all",
                isYourTurn && "border-success/50 glow-primary-subtle"
              )}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                    <span className="text-xl font-bold">Y</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">You</div>
                    <div className="text-sm text-muted-foreground">1547 Elo • Silver</div>
                  </div>
                  {isYourTurn && (
                    <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
                  )}
                </div>
              </div>

              {/* Opponent */}
              <div className={cn(
                "glass-card rounded-xl p-4 transition-all",
                canReact && "border-warning/50"
              )}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                    <span className="text-xl font-bold">L</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">LogicMaster</div>
                    <div className="text-sm text-muted-foreground">1520 Elo • Silver</div>
                  </div>
                  {canReact && (
                    <div className="w-3 h-3 rounded-full bg-warning animate-pulse" />
                  )}
                </div>
              </div>

              {/* Reactions (only when opponent speaks) */}
              {canReact && (
                <div className="glass-card rounded-xl p-4 animate-fade-in">
                  <div className="text-sm font-medium mb-3">Live Reactions</div>
                  <div className="flex flex-col gap-2">
                    {reactions.map(reaction => (
                      <Button
                        key={reaction.id}
                        variant="reaction"
                        className="justify-start gap-2"
                        onClick={() => handleReaction(reaction.id)}
                      >
                        <reaction.icon className={cn("w-4 h-4", reaction.color)} />
                        {reaction.label}
                      </Button>
                    ))}
                  </div>
                  {reactionLog.length > 0 && (
                    <div className="mt-3 text-xs text-muted-foreground">
                      {reactionLog.length} reaction(s) logged
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Center - Main Content */}
            <div className="lg:col-span-2 space-y-4">
              {/* Topic */}
              <div className="glass-card rounded-xl p-4">
                <div className="text-sm text-muted-foreground mb-1">Debate Topic</div>
                <div className="text-lg font-semibold">Should AI be regulated by governments?</div>
              </div>

              {/* Scratchpad (Prep phase only) */}
              {phase === "prep" && (
                <div className="glass-card rounded-xl p-4 animate-fade-in">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm font-medium">Private Scratchpad</div>
                    <div className="text-xs text-muted-foreground">Only you can see this</div>
                  </div>
                  <textarea
                    value={scratchpad}
                    onChange={(e) => setScratchpad(e.target.value)}
                    placeholder="Outline your key arguments here..."
                    className="w-full h-48 bg-secondary/50 border border-border rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                </div>
              )}

              {/* Live Transcript */}
              {phase !== "prep" && (
                <div className="glass-card rounded-xl p-4 animate-fade-in">
                  <div className="flex items-center gap-2 mb-3">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    <div className="text-sm font-medium">Live Transcript</div>
                  </div>
                  <div className="h-64 overflow-y-auto space-y-2 text-sm">
                    {transcript.map((line, i) => (
                      <div key={i} className="p-2 rounded bg-secondary/30">
                        {line}
                      </div>
                    ))}
                    {phase === "judging" && (
                      <div className="text-center py-8 animate-pulse">
                        <div className="text-primary font-medium">AI Judge analyzing transcript...</div>
                        <div className="text-sm text-muted-foreground mt-2">
                          Evaluating structure, persuasiveness, and logic
                        </div>
                      </div>
                    )}
                    {phase === "complete" && (
                      <div className="text-center py-8">
                        <div className="text-2xl font-bold text-success mb-2">Victory!</div>
                        <div className="text-primary">+24 Elo</div>
                        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-lg font-bold">8.2</div>
                            <div className="text-xs text-muted-foreground">Structure</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold">7.5</div>
                            <div className="text-xs text-muted-foreground">Persuasion</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold">8.8</div>
                            <div className="text-xs text-muted-foreground">Logic</div>
                          </div>
                        </div>
                        <Button variant="glow" className="mt-6">
                          Back to Queue
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}