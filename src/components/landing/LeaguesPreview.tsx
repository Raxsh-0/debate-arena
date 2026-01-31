import { Trophy } from "lucide-react";

const leagues = [
  { name: "Bronze", elo: "0 - 1199", class: "league-bronze", players: "5.2K" },
  { name: "Silver", elo: "1200 - 1599", class: "league-silver", players: "3.1K" },
  { name: "Gold", elo: "1600 - 1999", class: "league-gold", players: "1.4K" },
  { name: "Platinum", elo: "2000+", class: "league-platinum", players: "312" },
];

export function LeaguesPreview() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Climb the <span className="text-gradient-gold">Ranks</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Start in Bronze. Master your craft. Reach Platinum and join the elite.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
          {leagues.map((league, index) => (
            <div 
              key={league.name}
              className="glass-card rounded-2xl p-6 min-w-[200px] text-center hover:scale-105 transition-transform duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className={`w-16 h-16 ${league.class} rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg`}>
                <Trophy className="w-8 h-8 text-white drop-shadow-md" />
              </div>
              <h3 className="text-xl font-bold mb-1">{league.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{league.elo} Elo</p>
              <div className="text-xs text-primary font-medium">{league.players} players</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}