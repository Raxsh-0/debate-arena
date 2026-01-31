import { Timer, MessageSquare, BarChart3, Shield, Mic, Award } from "lucide-react";

const features = [
  {
    icon: Timer,
    title: "Three-Phase Timer",
    description: "Prep → Argument → Rebuttal. Each phase precisely timed for fair, structured debates."
  },
  {
    icon: MessageSquare,
    title: "Live Reactions",
    description: "Mark logical fallacies, strong points, or request sources while your opponent speaks."
  },
  {
    icon: BarChart3,
    title: "AI Analysis",
    description: "Gemini-powered judge evaluates structure, persuasiveness, and logical consistency."
  },
  {
    icon: Shield,
    title: "Anti-Echo Ranking",
    description: "Quality Floor prevents low-skill farming. Only genuine improvement raises your Elo."
  },
  {
    icon: Mic,
    title: "Strict Turn Control",
    description: "Microphone switches strictly between users. No interruptions, pure argumentation."
  },
  {
    icon: Award,
    title: "League System",
    description: "Bronze to Platinum. Climb the ranks and prove your mastery in competitive debates."
  }
];

export function FeaturesSection() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Built for <span className="text-gradient-primary">Competitive Excellence</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every feature designed to sharpen your debate skills and provide fair, 
            objective evaluation of your performance.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="glass-card rounded-xl p-6 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}