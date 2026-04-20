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
import { Eye, EyeOff, Info } from "lucide-react";

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

const INSURANCE_CARRIERS = [
  "Aetna","Cigna","Delta Dental","Guardian","Humana","MetLife","United Healthcare","Other",
];

const Consultation = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  // Step 1
  const [smsConsent, setSmsConsent] = useState(true);
  const [hasInsurance, setHasInsurance] = useState("yes");

  // Step 3
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);

  const next = () => setStep((s) => Math.min(s + 1, totalSteps));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!smsConsent) return toast.error("Please agree to the SMS terms to continue.");
    if (hasInsurance === "no") {
      setStep(3);
    } else {
      next();
    }
  };

  const handleStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    next();
  };

  const handleFinal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAgreed) return toast.error("Please agree to Terms and Conditions.");
    toast.success("Account created!");
    navigate("/appointment");
  };

  const progressPct = (step / totalSteps) * 100;

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
          <div
            className="h-full bg-[image:var(--gradient-brand)] transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <div className="rounded-2xl bg-card p-10 shadow-sm">
          {step === 1 && (
            <>
              <h1 className="text-center text-2xl font-semibold text-primary">
                Account Details
              </h1>

              <form onSubmit={handleStep1} className="mt-8 space-y-6">
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
                      <SelectTrigger id="state"><SelectValue placeholder="Select state" /></SelectTrigger>
                      <SelectContent>
                        {US_STATES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>


                <p className="text-sm text-foreground text-center pt-2">
                  Read more about our{" "}
                  <a href="#" className="text-secondary underline">Terms and Conditions</a>,{" "}
                  <a href="#" className="text-secondary underline">Privacy Practices</a>.
                </p>

                <div className="flex justify-center pt-4">
                  <Button type="submit" size="lg" className="rounded-full px-16 h-12 text-base bg-primary hover:bg-primary/90">
                    Next
                  </Button>
                </div>
              </form>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="text-center text-2xl font-semibold text-primary">
                Dental Insurance Information
              </h1>
              <p className="mt-2 text-center text-sm text-foreground">
                Selected Office: <span className="font-semibold">Port Jefferson</span>
              </p>

              <form onSubmit={handleStep2} className="mt-8 space-y-5">
                <div className="space-y-1.5">
                  <Label htmlFor="carrier">Dental Insurance Carrier *</Label>
                  <Select required>
                    <SelectTrigger id="carrier"><SelectValue placeholder="Select insurance carrier" /></SelectTrigger>
                    <SelectContent>
                      {INSURANCE_CARRIERS.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="relation" className="flex items-center gap-1.5">
                    Patient Relation to Insurance Subscriber *
                    <Info className="h-4 w-4 text-secondary" />
                  </Label>
                  <Select required>
                    <SelectTrigger id="relation"><SelectValue placeholder="Select Relation" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="self">Self</SelectItem>
                      <SelectItem value="spouse">Spouse</SelectItem>
                      <SelectItem value="child">Child</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                  <div className="space-y-1.5">
                    <Label htmlFor="subFirst">Subscriber First Name *</Label>
                    <Input id="subFirst" required />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="subLast">Subscriber Last Name *</Label>
                    <Input id="subLast" required />
                  </div>

                  <div className="space-y-1.5">
                    <Label>Subscriber Gender *</Label>
                    <RadioGroup defaultValue="male" className="flex gap-6 pt-2">
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="male" id="g-m" />
                        <Label htmlFor="g-m" className="font-normal">Male</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="female" id="g-f" />
                        <Label htmlFor="g-f" className="font-normal">Female</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="other" id="g-o" />
                        <Label htmlFor="g-o" className="font-normal">Other</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="subDob">Subscriber Date of Birth *</Label>
                    <Input id="subDob" type="date" required />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="subId">Subscriber ID *</Label>
                    <Input id="subId" required />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="employer">Building/Employer</Label>
                    <Input id="employer" />
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <Label htmlFor="group">Group No *</Label>
                    <Input id="group" required />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="addr">Subscriber Address *</Label>
                    <Input id="addr" required />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="city">Subscriber City *</Label>
                    <Input id="city" required />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="subState">Subscriber State *</Label>
                    <Select required>
                      <SelectTrigger id="subState"><SelectValue placeholder="Select a state" /></SelectTrigger>
                      <SelectContent>
                        {US_STATES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="zip">Subscriber Zip *</Label>
                    <Input id="zip" required />
                  </div>
                </div>

                <div className="flex justify-center gap-4 pt-4">
                  <Button type="button" onClick={back} size="lg" variant="secondary" className="rounded-full px-12 h-12 text-base">
                    Back
                  </Button>
                  <Button type="submit" size="lg" className="rounded-full px-12 h-12 text-base bg-primary hover:bg-primary/90">
                    Save
                  </Button>
                </div>
              </form>
            </>
          )}

          {step === 3 && (
            <>
              <h1 className="text-center text-2xl font-semibold text-primary">
                Set Your Password
              </h1>

              <form onSubmit={handleFinal} className="mt-8 space-y-6 max-w-md mx-auto">
                <p className="text-sm font-semibold text-primary">* All fields are required</p>

                <div className="space-y-1.5">
                  <Label htmlFor="pwd">Password</Label>
                  <div className="relative">
                    <Input id="pwd" type={showPwd ? "text" : "password"} required className="bg-accent/40 pr-10" />
                    <button type="button" onClick={() => setShowPwd((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground pt-1">
                    Enter a strong password with at least 8 characters long and includes at least one
                    uppercase letter, one lowercase letter, one digit and one special character.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="confirm">Confirm Password</Label>
                  <div className="relative">
                    <Input id="confirm" type={showConfirm ? "text" : "password"} required className="bg-accent/40 pr-10" />
                    <button type="button" onClick={() => setShowConfirm((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Checkbox
                    id="terms"
                    checked={termsAgreed}
                    onCheckedChange={(v) => setTermsAgreed(!!v)}
                    className="mt-0.5"
                  />
                  <Label htmlFor="terms" className="text-xs leading-relaxed font-normal">
                    By clicking "Create Account" you agree that you have read and consent to the{" "}
                    <a href="#" className="text-secondary underline">Terms and Conditions</a> of Use and to the{" "}
                    <a href="#" className="text-secondary underline">Privacy Practices</a>.
                  </Label>
                </div>

                <div className="flex justify-center gap-4 pt-2">
                  <Button type="button" onClick={() => setStep(hasInsurance === "yes" ? 2 : 1)} size="lg" className="rounded-full px-12 h-12 text-base bg-primary hover:bg-primary/90">
                    Back
                  </Button>
                  <Button type="submit" size="lg" variant="secondary" className="rounded-full px-12 h-12 text-base">
                    Create Account
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Consultation;
