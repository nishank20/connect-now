import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import logo from "@/assets/logo-dental.png";

const PatientIntake = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !dob) {
      return toast.error("Please fill out all fields.");
    }
    toast.success("Patient info saved!");
    navigate("/consultation");
  };

  return (
    <div className="min-h-screen bg-muted/40">
      <header className="container py-6">
        <button onClick={() => navigate("/")} className="flex items-center gap-2">
          <img src={logo} alt="dental.com" className="h-12 w-auto" />
        </button>
      </header>

      <main className="container max-w-2xl pb-16">
        <div className="rounded-2xl bg-card p-10 shadow-sm">
          <h1 className="text-center text-2xl font-semibold text-primary">
            Virtual Consultation
          </h1>
          <p className="mt-2 text-center text-sm text-foreground">
            Let's start with some basic information about the patient.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5 max-w-md mx-auto">
            <p className="text-sm font-semibold text-primary">* All fields are required</p>

            <div className="space-y-1.5">
              <Label htmlFor="firstName">First Name*</Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="lastName">Last Name*</Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="dob">Date of Birth*</Label>
              <Input
                id="dob"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
                className="bg-accent/40"
              />
            </div>

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

export default PatientIntake;
