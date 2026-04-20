import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, ScanFace, ChevronRight, Maximize2, Camera, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { QRCodeSVG } from "qrcode.react";
import logo from "@/assets/logo-dental.png";
import selfieImg from "@/assets/smartscan-selfie.jpg";
import scanRightSide from "@/assets/scan-right-side.jpg";
import scanLeftSide from "@/assets/scan-left-side.jpg";
import scanFront from "@/assets/scan-front.jpg";
import scanUpper from "@/assets/scan-upper.jpg";
import scanLower from "@/assets/scan-lower.jpg";

type Step =
  | "account"
  | "intro"
  | "disclaimer"
  | "method"
  | "instructions"
  | "capture"
  | "camera"
  | "review"
  | "summary"
  | "complete";

const PHOTO_PROMPTS = [
  {
    title: "Right Side",
    description:
      "Turn your head slightly to the left. Use your right-hand index and middle fingers to retract your right cheek.",
    image: scanRightSide,
    bg: "bg-[hsl(0_70%_50%)]",
  },
  {
    title: "Left Side",
    description:
      "Turn your head slightly to the right. Use your left-hand index and middle fingers to retract your left cheek.",
    image: scanLeftSide,
    bg: "bg-[hsl(0_70%_50%)]",
  },
  {
    title: "Front",
    description:
      "A big smile with your teeth slightly open to show your front teeth and some of your gums. You may need to use your thumb and your forefinger to open your lips a bit more.",
    image: scanFront,
    bg: "bg-[hsl(15_85%_55%)]",
  },
  {
    title: "Lower",
    description:
      "Open your mouth as wide as you can to get a clear shot of all your bottom teeth.",
    image: scanLower,
    bg: "bg-[hsl(15_85%_55%)]",
  },
  {
    title: "Upper",
    description:
      "Turn your phone upside down for a better angle, open your mouth as wide as you can to get a clear shot of all your upper teeth.",
    image: scanUpper,
    bg: "bg-[hsl(15_85%_55%)]",
  },
];

const STEP_PROGRESS: Record<Step, number> = {
  account: 8,
  intro: 16,
  disclaimer: 24,
  method: 32,
  instructions: 40,
  capture: 50,
  camera: 50,
  review: 50,
  summary: 100,
  complete: 100,
};

const SmartScan = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("account");
  const [method, setMethod] = useState<"myself" | "assisted">("myself");
  const [account, setAccount] = useState({ firstName: "", lastName: "", dob: "" });
  const [photoIndex, setPhotoIndex] = useState(0);
  const [capturedPhotos, setCapturedPhotos] = useState<(string | null)[]>(
    Array(PHOTO_PROMPTS.length).fill(null)
  );
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const accountValid =
    account.firstName.trim() && account.lastName.trim() && account.dob.trim();

  const currentPhoto = PHOTO_PROMPTS[photoIndex];
  const progressValue =
    step === "capture" || step === "camera" || step === "review"
      ? 40 + ((photoIndex + (step === "review" ? 1 : 0)) / PHOTO_PROMPTS.length) * 60
      : STEP_PROGRESS[step];

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const startCamera = async () => {
    setCameraError(null);
    stopCamera();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => {});
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? err.name === "NotAllowedError"
            ? "Camera access was denied. Please allow camera permission in your browser settings."
            : err.name === "NotFoundError"
            ? "No camera was found on this device."
            : err.message
          : "Unable to access camera.";
      setCameraError(message);
    }
  };

  useEffect(() => {
    if (step === "camera") {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, photoIndex]);

  const handleCapturePhoto = () => {
    const video = videoRef.current;
    if (!video || !streamRef.current) {
      toast({
        title: "Camera not ready",
        description: cameraError ?? "Please allow camera access to take a photo.",
        variant: "destructive",
      });
      return;
    }
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
    setCapturedPhotos((prev) => {
      const next = [...prev];
      next[photoIndex] = dataUrl;
      return next;
    });
    setStep("review");
  };

  const handleConfirmPhoto = () => {
    if (photoIndex < PHOTO_PROMPTS.length - 1) {
      setPhotoIndex(photoIndex + 1);
      setStep("capture");
    } else {
      setStep("summary");
    }
  };

  const handleRetakeFromSummary = (index: number) => {
    setPhotoIndex(index);
    setStep("camera");
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="container py-6">
        <button onClick={() => navigate("/")} className="inline-block">
          <img src={logo} alt="dental.com" className="h-10 w-auto" />
        </button>
      </header>
      <main className="container max-w-xl pb-16">
        <div className="relative h-6 w-full bg-card rounded-full mb-8 overflow-hidden shadow-sm">
          <div
            className="absolute inset-y-0 left-0 bg-[image:var(--gradient-brand)] transition-all flex items-center justify-end pr-3"
            style={{ width: `${progressValue}%` }}
          >
            {(step === "capture" || step === "review") && (
              <span className="text-xs font-semibold text-primary-foreground whitespace-nowrap">
                {photoIndex + 1} out of {PHOTO_PROMPTS.length}
              </span>
            )}
          </div>
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
            <div className="bg-muted flex items-center justify-center">
              <img
                src={selfieImg}
                alt="Hold your phone in front of a mirror to take selfie photos"
                width={768}
                height={1024}
                loading="lazy"
                className="w-full h-auto object-cover"
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
                  onClick={() => {
                    setPhotoIndex(0);
                    setStep("capture");
                  }}
                  className="rounded-full px-12 h-12 bg-primary hover:bg-primary/90 w-full max-w-sm"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        )}

        {step === "capture" && (
          <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
            <div className="bg-muted">
              <img
                src={currentPhoto.image}
                alt={currentPhoto.title}
                loading="lazy"
                className="w-full h-auto object-cover max-h-[60vh]"
              />
            </div>
            <div className="bg-secondary text-secondary-foreground p-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-2xl font-bold">{currentPhoto.title}</h2>
                <button
                  onClick={() => setStep("camera")}
                  className="shrink-0 w-12 h-12 rounded-full bg-accent-foreground/80 hover:bg-accent-foreground text-secondary-foreground flex items-center justify-center transition-colors"
                  aria-label="Continue to camera"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
              <p className="text-base leading-relaxed">
                {currentPhoto.description}
              </p>
            </div>
          </div>
        )}

        {step === "camera" && (
          <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
            <div className="bg-black relative aspect-[3/4] max-h-[60vh] mx-auto w-full">
              <video
                ref={videoRef}
                playsInline
                muted
                autoPlay
                className="w-full h-full object-cover -scale-x-100"
              />
              {/* Reference thumbnail overlay */}
              <div className="absolute top-3 right-3 w-24 h-24 rounded-lg overflow-hidden border-2 border-white/60 shadow-lg bg-card">
                <img
                  src={currentPhoto.image}
                  alt="Reference"
                  className="w-full h-full object-cover"
                />
              </div>
              {cameraError && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/70 p-6">
                  <div className="bg-card text-foreground rounded-xl p-5 max-w-sm text-center space-y-3">
                    <AlertCircle className="h-8 w-8 mx-auto text-destructive" />
                    <p className="text-sm">{cameraError}</p>
                    <Button
                      onClick={startCamera}
                      className="rounded-full bg-primary hover:bg-primary/90"
                    >
                      Try again
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <div className="bg-secondary text-secondary-foreground p-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-2xl font-bold">{currentPhoto.title}</h2>
                <button
                  onClick={handleCapturePhoto}
                  disabled={!!cameraError}
                  className="shrink-0 w-14 h-14 rounded-full bg-accent-foreground/80 hover:bg-accent-foreground text-secondary-foreground flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Take photo"
                >
                  <Camera className="h-6 w-6" />
                </button>
              </div>
              <p className="text-sm leading-relaxed opacity-90">
                Position yourself to match the reference photo, then tap the camera button to capture.
              </p>
            </div>
          </div>
        )}

        {step === "review" && (
          <div
            className={`${currentPhoto.bg} rounded-2xl shadow-sm overflow-hidden min-h-[70vh] flex flex-col p-6 relative`}
          >
            {/* Captured photo as background */}
            {capturedPhotos[photoIndex] && (
              <img
                src={capturedPhotos[photoIndex]!}
                alt="Your captured photo"
                className="absolute inset-0 w-full h-full object-cover -scale-x-100"
              />
            )}
            <div className="absolute inset-0 bg-black/30" />

            <div className="absolute top-4 right-4 w-28 h-28 rounded-lg overflow-hidden border-2 border-white/40 shadow-lg z-10">
              <img
                src={currentPhoto.image}
                alt="Reference"
                className="w-full h-full object-cover"
              />
              <Maximize2 className="absolute bottom-1 right-1 h-4 w-4 text-white drop-shadow" />
            </div>

            <div className="flex-1" />

            <div className="relative z-10 space-y-6 text-center">
              <h2 className="text-2xl font-semibold text-white drop-shadow">
                Does your photo match the example?
              </h2>
              <div className="flex justify-center gap-3">
                <Button
                  onClick={() => setStep("camera")}
                  className="rounded-full px-10 h-12 bg-card text-foreground hover:bg-card/90"
                >
                  Retake
                </Button>
                <Button
                  onClick={handleConfirmPhoto}
                  className="rounded-full px-10 h-12 bg-secondary text-secondary-foreground hover:bg-secondary/90"
                >
                  Confirm
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
