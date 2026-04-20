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
    <div className="min-h-screen bg-muted/40">
      <header className="container py-6">
        <button onClick={() => navigate("/")} className="flex items-center gap-2">
          <img src={logo} alt="dental.com" className="h-12 w-auto" />
        </button>
      </header>

      <main className="container max-w-3xl pb-16">
        {/* Progress bar pill */}
        <div className="mx-auto mb-4 h-3 w-full rounded-full bg-card shadow-sm overflow-hidden">
          <div className="h-full w-1/3 bg-[image:var(--gradient-brand)]" />
        </div>

        <div className="rounded-2xl bg-card p-10 shadow-sm">
          <h1 className="text-center text-2xl font-semibold text-primary">
            Creating an account is quick and easy
          </h1>
          <p className="mt-1 text-center text-sm text-foreground">
            Already have an account?{" "}
            <a href="#" className="text-secondary font-medium hover:underline">
              Sign In
            </a>
          </p>

          <p className="mt-5 text-center text-sm text-foreground max-w-xl mx-auto">
            Subscribers and adult dependents 18 and older should create their own accounts.
            You will provide subscriber insurance info on the next page. Subscribers can add
            dependents under 18 as patients after creating an account.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <p className="text-sm font-semibold text-primary">* All fields are required</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
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
                <Input id="dob" type="date" required className="bg-accent/40" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone Number (XXX)-XXX-XXXX*</Label>
                <Input id="phone" type="tel" placeholder="(555)-555-5555" required className="bg-accent/40" />
              </div>

              {/* empty spacer to keep SMS consent under phone (right column) */}
              <div className="hidden md:block" />
              <div className="flex items-start gap-2">
                <Checkbox
                  id="sms"
                  checked={smsConsent}
                  onCheckedChange={(v) => setSmsConsent(!!v)}
                  className="mt-0.5 data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
                />
                <Label htmlFor="sms" className="text-xs leading-relaxed font-normal">
                  By providing your phone number, you agree to receive text messages from
                  dental.com relating to your Virtual Consultation. You may opt-out at any time.*
                </Label>
              </div>

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

            <div className="flex items-center justify-between pt-2">
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

            <p className="text-sm text-foreground text-center pt-2">
              Read more about our{" "}
              <a href="#" className="text-secondary underline">Terms and Conditions</a>,{" "}
              <a href="#" className="text-secondary underline">Privacy Practices</a>.
            </p>

            <div className="flex justify-center pt-4">
              <Button
                type="submit"
                size="lg"
                className="rounded-full px-16 h-12 text-base bg-primary hover:bg-primary/90"
              >
                Next
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Consultation;
