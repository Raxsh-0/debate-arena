import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { LeaguesPreview } from "@/components/landing/LeaguesPreview";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <HeroSection />
        <FeaturesSection />
        <LeaguesPreview />
        
        {/* Final CTA */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to <span className="text-gradient-primary">Prove Yourself</span>?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
              Join thousands of debaters improving their skills every day.
            </p>
            <Link to="/queue">
              <Button variant="queue" size="xl">
                Enter the Arena
                <Zap className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="py-8 border-t border-border/50">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                <Zap className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">DebateFlow</span>
            </div>
            <p className="text-sm text-muted-foreground">
              The Competitive Soft-Skills Arena. Master the art of persuasion.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;