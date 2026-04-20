import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-dental.png";
import { Video, ShieldCheck, Clock } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/40">
      <header className="container flex items-center justify-between py-6">
        <img src={logo} alt="dental.com" className="h-10 w-auto" />
        <a href="#" className="text-sm text-secondary font-medium hover:underline">
          Sign In
        </a>
      </header>

      <main className="container grid lg:grid-cols-2 gap-12 items-center py-16">
        <div className="space-y-6">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-secondary">
            Teledentistry, anywhere
          </span>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            See a dentist{" "}
            <span className="bg-[image:var(--gradient-brand)] bg-clip-text text-transparent">
              from your couch
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg">
            Book a virtual consultation with a licensed dentist in minutes. No waiting rooms,
            no commute — just expert care when you need it.
          </p>

          <Button
            size="lg"
            onClick={() => navigate("/intake")}
            className="rounded-full px-10 h-14 text-base bg-[image:var(--gradient-brand)] hover:opacity-90 shadow-[var(--shadow-brand)] transition-opacity"
          >
            <Video className="mr-2 h-5 w-5" />
            Start Virtual Consultation
          </Button>

          <div className="flex flex-wrap gap-6 pt-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-secondary" /> HIPAA secure
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-secondary" /> Same-day visits
            </span>
            <span className="flex items-center gap-2">
              <Video className="h-4 w-4 text-secondary" /> Licensed dentists
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-[image:var(--gradient-brand)] rounded-3xl blur-3xl opacity-20" />
          <div className="relative rounded-3xl bg-card border p-8 shadow-[var(--shadow-brand)]">
            <div className="aspect-video rounded-2xl bg-[image:var(--gradient-brand)] flex items-center justify-center">
              <Video className="h-20 w-20 text-primary-foreground" />
            </div>
            <div className="mt-6 space-y-2">
              <h3 className="font-semibold text-lg">Live with Dr. Carter</h3>
              <p className="text-sm text-muted-foreground">
                Average wait: under 10 minutes • Covered by most insurance plans
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
