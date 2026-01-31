import { Button } from "@/components/ui/button";
import { Zap, Users, Trophy, Brain } from "lucide-react";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      
      {/* Animated grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />
      
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Real-time AI-Judged Debates</span>
        </div>
        
        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <span className="text-gradient-primary">DebateFlow</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          The Competitive Soft-Skills Arena
        </p>
        
        <p className="text-lg text-muted-foreground/80 max-w-xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          Master the art of persuasion. Battle opponents in real-time debates, 
          judged by advanced AI. Climb the ranks. Become unstoppable.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Link to="/queue">
            <Button variant="queue" size="xl">
              Find Match
              <Zap className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="glow-outline" size="xl">
              View Dashboard
            </Button>
          </Link>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <StatCard icon={Users} value="10K+" label="Active Debaters" />
          <StatCard icon={Trophy} value="50K+" label="Matches Played" />
          <StatCard icon={Brain} value="98%" label="AI Accuracy" />
          <StatCard icon={Zap} value="<30s" label="Match Time" />
        </div>
      </div>
    </section>
  );
}

function StatCard({ icon: Icon, value, label }: { icon: React.ElementType; value: string; label: string }) {
  return (
    <div className="glass-card rounded-xl p-6 hover:border-primary/30 transition-colors">
      <Icon className="w-6 h-6 text-primary mx-auto mb-3" />
      <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}