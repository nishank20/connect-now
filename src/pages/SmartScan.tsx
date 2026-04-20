import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, ScanFace, ChevronRight } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import logo from "@/assets/logo-dental.png";

type Step = "account" | "intro" | "disclaimer" | "method" | "instructions" | "complete";

const STEP_PROGRESS: Record<Step, number> = {
  account: 20,
  intro: 35,
  disclaimer: 55,
  method: 75,
  instructions: 90,
  complete: 100,
};

const SmartScan = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("account");
  const [method, setMethod] = useState<"myself" | "assisted">("myself");
  const [account, setAccount] = useState({ firstName: "", lastName: "", dob: "" });

  const accountValid =
    account.firstName.trim() && account.lastName.trim() && account.dob.trim();

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="container py-6">
        <button onClick={() => navigate("/")} className="inline-block">
          <img src={logo} alt="dental.com" className="h-10 w-auto" />
        </button>
      </header>
      <main className="container max-w-xl pb-16">
        <div className="h-1 w-full bg-muted rounded-full mb-8 overflow-hidden">
          <div
            className="h-full bg-[image:var(--gradient-brand)] transition-all"
            style={{ width: `${STEP_PROGRESS[step]}%` }}
          />
        </div>

        {step === "account" && (
          <div className="bg-card rounded-2xl p-8 shadow-sm space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-semibold text-primary">
                Creating an account is quick and easy
              </h1>
              <p className="text-sm">
                Already have an account?{" "}
                <a href="#" className="text-secondary hover:underline">Sign In</a>
              </p>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Subscribers and adult dependents 18 and older should create their own
              accounts. You will provide subscriber insurance info on the next page.
              Subscribers can add dependents under 18 as patients after creating an
              account.
            </p>
            <p className="text-sm text-primary font-medium">* All fields are required</p>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name*</Label>
                <Input
                  id="firstName"
                  value={account.firstName}
                  onChange={(e) => setAccount({ ...account, firstName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name*</Label>
                <Input
                  id="lastName"
                  value={account.lastName}
                  onChange={(e) => setAccount({ ...account, lastName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth*</Label>
                <Input
                  id="dob"
                  type="date"
                  value={account.dob}
                  onChange={(e) => setAccount({ ...account, dob: e.target.value })}
                />
              </div>
            </div>
            <div className="flex justify-center pt-2">
              <Button
                disabled={!accountValid}
                onClick={() => setStep("intro")}
                className="rounded-full px-12 h-12 bg-primary hover:bg-primary/90"
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {step === "intro" && (
          <>
            <h1 className="text-3xl font-semibold mb-6">Smart Scan</h1>
            <div className="bg-card rounded-2xl p-8 shadow-sm space-y-6">
              <div className="flex justify-center">
                <div className="w-24 h-24 rounded-2xl bg-secondary/90 flex items-center justify-center">
                  <ScanFace className="h-14 w-14 text-secondary-foreground" />
                </div>
              </div>
              <p className="text-center text-secondary text-xl font-medium leading-snug">
                Smart Scan uses artificial intelligence to detect suspicious
                issues with your mouth and teeth.
              </p>

              <div className="space-y-4">
                <h2 className="text-center text-xl">How It Works</h2>
                <ul className="space-y-3 max-w-sm mx-auto">
                  <li className="flex items-start gap-3">
                    <ChevronRight className="h-5 w-5 mt-0.5 text-accent-foreground bg-accent rounded-full p-0.5 shrink-0" />
                    <span>Capture images with our guided prompts</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="h-5 w-5 mt-0.5 text-accent-foreground bg-accent rounded-full p-0.5 shrink-0" />
                    <span>Receive a report with the Smart Scan's findings*</span>
                  </li>
                </ul>
              </div>

              <div className="flex items-start gap-3 text-primary text-sm">
                <Lock className="h-5 w-5 shrink-0 mt-0.5" />
                <p>
                  <span className="font-semibold">We take your privacy seriously.</span>{" "}
                  All images are secure, confidential, and never shared with anyone. HIPAA Compliant
                </p>
              </div>

              <p className="text-center italic text-xs text-muted-foreground">
                *For informational purposes only. Findings are not reviewed by a
                licensed dentist and do not constitute a dental diagnosis.
              </p>

              <div className="border-t pt-6 space-y-4">
                <h3 className="text-center text-primary text-xl font-medium">
                  You will need a phone to continue
                </h3>
                <p className="text-center text-sm text-primary/80 max-w-sm mx-auto">
                  Scan this QR code to open your dental.com account on your phone to continue with Smart Scan.
                </p>
                <div className="flex justify-center pt-2">
                  <div className="bg-white p-4 rounded-lg border">
                    <QRCodeSVG value={window.location.href} size={180} />
                  </div>
                </div>
              </div>

              <div className="flex justify-center pt-2">
                <Button
                  onClick={() => setStep("disclaimer")}
                  className="rounded-full px-12 h-12 bg-primary hover:bg-primary/90"
                >
                  Next
                </Button>
              </div>
            </div>
          </>
        )}

        {step === "disclaimer" && (
          <>
            <h1 className="text-3xl font-semibold mb-6">Smart Scan Disclaimer</h1>
            <div className="bg-card rounded-2xl p-8 shadow-sm space-y-6">
              <div className="space-y-4 text-sm leading-relaxed uppercase tracking-wide">
                <p>
                  The SmartScan photo review and wellness score available at
                  dental.com is not a dental exam or a dental diagnosis, and it
                  is not a substitute for dental advice. The wellness score is
                  based solely on an interpretation of a limited number of
                  features that may be visible on the photos that you submit.
                  The quality of photos submitted varies, and many indicators
                  of dental disease are not visible or may be missed or
                  misinterpreted regardless of photo quality. Accordingly,
                  while your wellness score and any related observations or
                  suggestions are intended to educate and inform, they are not
                  dental advice and are not to be used as a substitute for a
                  dental exam by a licensed dentist.
                </p>
                <p>A dental exam requires a licensed dentist.</p>
              </div>
              <div className="flex justify-center pt-2">
                <Button
                  onClick={() => setStep("method")}
                  className="rounded-full px-16 h-12 w-full max-w-md bg-primary hover:bg-primary/90"
                >
                  I Agree
                </Button>
              </div>
            </div>
          </>
        )}

        {step === "method" && (
          <>
            <h1 className="text-2xl font-semibold mb-8 text-center">
              How will you be taking the photos?
            </h1>
            <div className="bg-card rounded-2xl p-8 shadow-sm space-y-6">
              <div className="space-y-5">
                <label className="flex items-start gap-4 cursor-pointer">
                  <input
                    type="radio"
                    name="method"
                    checked={method === "myself"}
                    onChange={() => setMethod("myself")}
                    className="mt-1 h-5 w-5 accent-primary"
                  />
                  <span className="text-base">
                    <span className="font-bold">Myself,</span>{" "}
                    using my "selfie" front-facing camera
                  </span>
                </label>
                <label className="flex items-start gap-4 cursor-pointer">
                  <input
                    type="radio"
                    name="method"
                    checked={method === "assisted"}
                    onChange={() => setMethod("assisted")}
                    className="mt-1 h-5 w-5 accent-primary"
                  />
                  <span className="text-base">
                    <span className="font-bold">Assisted,</span>{" "}
                    someone else will be taking the photos{" "}
                    <span className="inline-block bg-secondary text-secondary-foreground text-xs px-2 py-0.5 rounded ml-1">
                      RECOMMENDED
                    </span>
                  </span>
                </label>
              </div>
              <div className="flex justify-center">
                <Button
                  onClick={() => setStep("instructions")}
                  className="rounded-full px-12 h-12 bg-primary hover:bg-primary/90"
                >
                  Next
                </Button>
              </div>
            </div>
          </>
        )}

        {step === "instructions" && (
          <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
            <div className="aspect-[3/4] bg-muted flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop"
                alt="Selfie demonstration"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-secondary text-secondary-foreground p-6 space-y-6">
              <p className="text-base leading-relaxed">
                {method === "myself"
                  ? `Start by putting your camera in selfie mode. We'll take five different photos to cover all angles. For best results, when taking the photos, keep the phone as close as possible to your mouth while still being able to see the screen, which is usually about 6 inches away. Take the photos in a well-lit place and use your flash, if possible.`
                  : `Hand the phone to your assistant. They'll guide you through five different photos to cover all angles. For best results, keep the phone as close as possible to your mouth — about 6 inches away. Take the photos in a well-lit place and use the flash if possible.`}
              </p>
              <div className="flex justify-center">
                <Button
                  onClick={() => setStep("complete")}
                  className="rounded-full px-12 h-12 bg-primary hover:bg-primary/90 w-full max-w-sm"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        )}

        {step === "complete" && (
          <div className="bg-card rounded-2xl p-8 shadow-sm text-center space-y-6">
            <h2 className="text-2xl font-semibold">You're all set!</h2>
            <p className="text-muted-foreground">
              Your Smart Scan flow is ready. In the full app, you'd now begin
              capturing the five guided photos.
            </p>
            <Button
              onClick={() => navigate("/")}
              className="rounded-full px-10 h-12 bg-primary hover:bg-primary/90"
            >
              Back to Home
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default SmartScan;
