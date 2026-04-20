import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import logo from "@/assets/logo-dental.png";
import { ArrowLeft } from "lucide-react";

const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
  "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
  "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire",
  "New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio",
  "Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota",
  "Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia",
  "Wisconsin","Wyoming",
];

const Consultation = () => {
  const navigate = useNavigate();
  const [smsConsent, setSmsConsent] = useState(true);
  const [hasInsurance, setHasInsurance] = useState("yes");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!smsConsent) {
      toast.error("Please agree to the SMS terms to continue.");
      return;
    }
    toast.success("Account info saved — let's continue!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/40">
      <header className="container flex items-center justify-between py-6">
        <button onClick={() => navigate("/")} className="flex items-center gap-2">
          <img src={logo} alt="dental.com" className="h-10 w-auto" />
        </button>
        <a href="#" className="text-sm text-secondary font-medium hover:underline">
          Sign In
        </a>
      </header>

      <main className="container max-w-3xl py-10">
        <button
          onClick={() => navigate("/")}
          className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        <div className="overflow-hidden rounded-2xl border bg-card shadow-[var(--shadow-brand)]">
          <div className="h-1.5 w-2/3 bg-[image:var(--gradient-brand)]" />
          <div className="px-8 pb-8 pt-6">
            <h1 className="text-center text-2xl font-semibold text-primary">
              Creating an account is quick and easy
            </h1>
            <p className="mt-1 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <a href="#" className="text-secondary font-medium hover:underline">
                Sign In
              </a>
            </p>

            <p className="mt-4 text-center text-sm text-muted-foreground">
              Subscribers and adult dependents 18 and older should create their own accounts.
              You will provide subscriber insurance info on the next page.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <p className="text-sm font-medium text-primary">* All fields are required</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="firstName">First Name*</Label>
                  <Input id="firstName" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="lastName">Last Name*</Label>
                  <Input id="lastName" required />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="dob">Date of Birth*</Label>
                  <Input id="dob" type="date" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone Number (XXX)-XXX-XXXX*</Label>
                  <Input id="phone" type="tel" placeholder="(555)-555-5555" required />
                </div>
              </div>

              <div className="flex items-start gap-2 rounded-md bg-muted/50 p-3">
                <Checkbox
                  id="sms"
                  checked={smsConsent}
                  onCheckedChange={(v) => setSmsConsent(!!v)}
                  className="mt-0.5"
                />
                <Label htmlFor="sms" className="text-xs leading-relaxed font-normal">
                  By providing your phone number, you agree to receive text messages from
                  dental.com relating to your Virtual Consultation. You may opt-out at any time.*
                </Label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email*</Label>
                  <Input id="email" type="email" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="state">State*</Label>
                  <Select required>
                    <SelectTrigger id="state">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {US_STATES.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm">Do you have insurance?*</Label>
                <RadioGroup
                  value={hasInsurance}
                  onValueChange={setHasInsurance}
                  className="flex gap-6"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="yes" id="ins-yes" />
                    <Label htmlFor="ins-yes" className="font-normal">Yes</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="no" id="ins-no" />
                    <Label htmlFor="ins-no" className="font-normal">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                Read more about our{" "}
                <a href="#" className="text-secondary underline">Terms and Conditions</a>,{" "}
                <a href="#" className="text-secondary underline">Privacy Practices</a>.
              </p>

              <div className="flex justify-center pt-2">
                <Button
                  type="submit"
                  size="lg"
                  className="rounded-full px-12 bg-primary hover:bg-primary/90"
                >
                  Next
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Consultation;
