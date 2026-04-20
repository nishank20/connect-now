import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
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
import { AlertCircle, Phone, Video, Plus, RotateCcw } from "lucide-react";
import AppointmentStepper from "@/components/AppointmentStepper";

const SYMPTOMS = ["Fever", "Swelling", "Sores/Lesions", "Dry Mouth", "Sore Throat", "Sensitivity", "None of the above", "Other"];

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

const Appointment = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [callType, setCallType] = useState<"video" | "phone" | null>(null);
  const [pharmacySearched, setPharmacySearched] = useState(false);
  const [pharmacySelected, setPharmacySelected] = useState(false);
  const [phone, setPhone] = useState("");

  const next = () => setStep((s) => Math.min(s + 1, 5));
  const back = () => setStep((s) => Math.max(s - 1, 1));
  const cancel = () => navigate("/");

  return (
    <div className="min-h-screen bg-muted/40">
      <header className="container py-6">
        <button onClick={() => navigate("/")} className="flex items-center gap-2">
          <img src={logo} alt="dental.com" className="h-12 w-auto" />
        </button>
      </header>

      <main className="container max-w-4xl pb-16">
        <div className="rounded-2xl bg-card p-10 shadow-sm">
          <AppointmentStepper current={step} />

          {/* Step 1 - Call Options */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-semibold text-foreground">See A Dentist Now</h1>
                <p className="text-secondary font-medium mt-1">Price of visit: $59</p>
              </div>

              <div className="space-y-3">
                <Label className="text-primary font-medium">How would you like to connect? *</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setCallType("video")}
                    className={`flex flex-col items-center gap-3 rounded-xl border-2 p-6 transition-all ${
                      callType === "video" ? "border-secondary bg-secondary/5" : "border-border hover:border-secondary/50"
                    }`}
                  >
                    <Video className="h-10 w-10 text-secondary" />
                    <span className="font-medium">Video Call</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCallType("phone")}
                    className={`flex flex-col items-center gap-3 rounded-xl border-2 p-6 transition-all ${
                      callType === "phone" ? "border-secondary bg-secondary/5" : "border-border hover:border-secondary/50"
                    }`}
                  >
                    <Phone className="h-10 w-10 text-secondary" />
                    <span className="font-medium">Phone Call</span>
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-2 rounded-md bg-accent/50 p-3">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 shrink-0" />
                <p className="text-sm">If this is a medical emergency, please dial 911 or go to your nearest medical facility immediately.</p>
              </div>

              <div className="flex justify-center gap-4 pt-4">
                <Button variant="outline" onClick={cancel} size="lg" className="rounded-full px-12 h-12">Cancel</Button>
                <Button
                  onClick={() => callType ? next() : toast.error("Please select a call option.")}
                  size="lg"
                  className="rounded-full px-12 h-12 bg-primary hover:bg-primary/90"
                >Next</Button>
              </div>
            </div>
          )}

          {/* Step 2 - Visit Details */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-semibold text-foreground">See A Dentist Now</h1>
                <p className="text-secondary font-medium mt-1">Price of visit: $59</p>
              </div>

              <div className="space-y-2">
                <Label className="text-primary font-medium">Who is this visit for? *</Label>
                <Select defaultValue="self">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="self">Myself</SelectItem>
                  </SelectContent>
                </Select>
                <button type="button" className="flex items-center gap-1 text-sm text-foreground underline mt-2">
                  <Plus className="h-4 w-4" /> Add Dependent
                </button>
              </div>

              <div className="space-y-2">
                <Label className="text-primary font-medium">Where will you be located during your visit? *</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select State" /></SelectTrigger>
                  <SelectContent>
                    {US_STATES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox id="updateIns" />
                <Label htmlFor="updateIns" className="font-normal">Click here to add or update your insurance.</Label>
              </div>

              <div className="rounded-xl border border-border bg-muted/30 p-5 space-y-5">
                <p className="font-medium text-foreground">Intake Form - Dental.com</p>
                <p className="text-sm text-muted-foreground">Please fill out the questions below and select "Submit" to continue.</p>

                <div className="space-y-2">
                  <Label htmlFor="reason">What is the reason for your visit today? *</Label>
                  <Textarea id="reason" maxLength={150} className="bg-accent/40" />
                  <p className="text-xs text-muted-foreground text-right">150 characters remaining.</p>
                </div>

                <p className="text-sm">
                  Please seek emergency medical services if you are experiencing a medical emergency (ie. chest pain, head or eye injury, broken bones, difficulty breathing etc).
                </p>

                <div className="rounded-md border border-border bg-card p-4 space-y-3">
                  <p className="text-sm font-medium">Please select your pain level below:</p>
                  <div className="space-y-2">
                    <Label>Pain Level:</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select pain level" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No Pain</SelectItem>
                        <SelectItem value="some">Some Pain</SelectItem>
                        <SelectItem value="moderate">Moderate Pain</SelectItem>
                        <SelectItem value="severe">Severe Pain</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Are you experiencing any of the following? (Check off all that apply) *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {SYMPTOMS.map((s) => (
                      <div key={s} className="flex items-center gap-2">
                        <Checkbox id={`sym-${s}`} />
                        <Label htmlFor={`sym-${s}`} className="font-normal text-sm">{s}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {[
                  { id: "allergies", label: "Do you have any allergies? *" },
                  { id: "conditions", label: "Do you have any medical conditions? *" },
                  { id: "meds", label: "Are you currently taking any medications? *" },
                ].map((q) => (
                  <div key={q.id} className="flex items-center justify-between gap-4">
                    <Label className="font-normal">{q.label}</Label>
                    <RadioGroup defaultValue="no" className="flex gap-4">
                      <div className="flex items-center gap-1">
                        <RadioGroupItem value="yes" id={`${q.id}-y`} />
                        <Label htmlFor={`${q.id}-y`} className="font-normal">Yes</Label>
                      </div>
                      <div className="flex items-center gap-1">
                        <RadioGroupItem value="no" id={`${q.id}-n`} />
                        <Label htmlFor={`${q.id}-n`} className="font-normal">No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                ))}

                <div className="space-y-2">
                  <Label htmlFor="lastExam">When was your last dental exam?</Label>
                  <Input id="lastExam" type="date" />
                </div>

                <div className="flex items-start gap-2">
                  <Checkbox id="privacy" className="mt-1" />
                  <Label htmlFor="privacy" className="font-normal">
                    I agree that I have read and consent to the{" "}
                    <a href="#" className="text-secondary underline">Privacy Practices</a>
                    <span className="text-destructive"> *</span>
                  </Label>
                </div>

                <div className="space-y-2">
                  <Label>Signature</Label>
                  <div className="rounded-md bg-muted/60 border border-border h-32 flex items-center justify-center relative">
                    <RotateCcw className="absolute top-2 left-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground text-sm">Sign here</span>
                  </div>
                  <p className="text-center text-xs text-muted-foreground">Patient / Responsible Party Signature</p>
                </div>
              </div>

              <div className="flex items-start gap-2 rounded-md bg-accent/50 p-3">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 shrink-0" />
                <p className="text-sm">If this is a medical emergency, please dial 911 or go to your nearest medical facility immediately.</p>
              </div>

              <div className="flex justify-center gap-4 pt-4">
                <Button variant="outline" onClick={back} size="lg" className="rounded-full px-12 h-12">Back</Button>
                <Button onClick={next} size="lg" className="rounded-full px-12 h-12 bg-primary hover:bg-primary/90">Next</Button>
              </div>
            </div>
          )}

          {/* Step 3 - Select Pharmacy */}
          {step === 3 && (
            <div className="space-y-6">
              <h1 className="text-2xl font-semibold text-foreground">Add a Preferred Pharmacy</h1>

              {!pharmacySelected && (
                <>
                  <p className="text-primary font-medium">Search a nearby pharmacy *</p>
                  <div className="space-y-2">
                    <Label htmlFor="pname">Pharmacy Name</Label>
                    <Input id="pname" defaultValue="CVS" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>State</Label>
                      <Select><SelectTrigger><SelectValue placeholder="State" /></SelectTrigger>
                        <SelectContent>{US_STATES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>City</Label>
                      <Input />
                    </div>
                    <div className="space-y-2">
                      <Label>Zip</Label>
                      <Input />
                    </div>
                  </div>
                  <Button
                    onClick={() => setPharmacySearched(true)}
                    className="rounded-full bg-secondary hover:bg-secondary/90"
                  >Search Pharmacy</Button>

                  {pharmacySearched && (
                    <div className="space-y-2">
                      <p className="text-sm">1 pharmacy found</p>
                      <div className="rounded-xl border border-border bg-muted/30 p-4 max-w-sm">
                        <div className="rounded-lg bg-card p-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-semibold">CVS ALBANY LLC</span>
                            <Button
                              size="sm"
                              onClick={() => setPharmacySelected(true)}
                              className="rounded-full bg-secondary hover:bg-secondary/90"
                            >Select</Button>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm border-t pt-3">
                            <div>129 FULTON ST</div>
                            <div>Phone: 2122335021</div>
                            <div>New York, NY, 10038</div>
                            <div>Fax: (212)-223-7153</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {pharmacySelected && (
                <>
                  <p className="text-sm">Your preferred pharmacy</p>
                  <div className="rounded-xl border border-border bg-muted/30 p-4 max-w-sm">
                    <div className="rounded-lg bg-card p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-semibold">CVS ALBANY LLC</span>
                        <Button
                          size="sm"
                          onClick={() => setPharmacySelected(false)}
                          className="rounded-full bg-primary hover:bg-primary/90"
                        >Change</Button>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm border-t pt-3">
                        <div>129 FULTON ST</div>
                        <div>Phone: 2122335021</div>
                        <div>New York, NY, 10038</div>
                        <div>Fax: (212)-223-7153</div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-center gap-4 pt-4">
                <Button variant="outline" onClick={cancel} size="lg" className="rounded-full px-12 h-12">Cancel</Button>
                {pharmacySelected ? (
                  <Button onClick={next} size="lg" className="rounded-full px-12 h-12 bg-primary hover:bg-primary/90">Next</Button>
                ) : (
                  <Button onClick={next} size="lg" className="rounded-full px-12 h-12 bg-primary hover:bg-primary/90">Skip</Button>
                )}
              </div>
            </div>
          )}

          {/* Step 4 - Review and Submit */}
          {step === 4 && (
            <div className="space-y-6">
              <h1 className="text-2xl font-semibold text-foreground">Review and Submit</h1>

              <div>
                <p className="text-sm text-muted-foreground">
                  {callType === "video" ? "Video Call" : "Phone Call"} Request for
                </p>
                <p className="font-semibold">Test Test</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="callPhone">Phone Number (We'll call this number)</Label>
                <Input
                  id="callPhone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(XXX)-XXX-XXXX"
                />
                {!phone && <p className="text-sm text-destructive">Please enter a valid phone number.</p>}
              </div>

              <div className="space-y-3 text-primary">
                <p>Once you click "Confirm Call Request" you'll be taken to the credit card capture screen and your call back will be confirmed.</p>
                <p>We will call you as soon as we have a provider available to join your call.</p>
              </div>

              <p className="text-center italic text-sm">Your payment method will not be charged until your visit is complete.</p>

              <div className="flex justify-center gap-4 pt-4">
                <Button
                  onClick={() => phone ? next() : toast.error("Enter a valid phone number.")}
                  disabled={!phone}
                  size="lg"
                  className="rounded-full px-10 h-12 bg-primary hover:bg-primary/90"
                >Confirm Call Request</Button>
                <Button variant="outline" onClick={back} size="lg" className="rounded-full px-12 h-12">Cancel</Button>
              </div>
            </div>
          )}

          {/* Step 5 - Billing Information */}
          {step === 5 && (
            <div className="space-y-6">
              <h1 className="text-2xl font-semibold text-foreground">Billing Information</h1>
              <p className="text-secondary font-medium">Total: $59.00</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="cardName">Name on Card *</Label>
                  <Input id="cardName" required />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="cardNum">Card Number *</Label>
                  <Input id="cardNum" placeholder="1234 5678 9012 3456" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="exp">Expiration *</Label>
                  <Input id="exp" placeholder="MM/YY" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC *</Label>
                  <Input id="cvc" placeholder="123" required />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="zipCard">Billing Zip *</Label>
                  <Input id="zipCard" required />
                </div>
              </div>

              <p className="text-center italic text-sm">Your payment method will not be charged until your visit is complete.</p>

              <div className="flex justify-center gap-4 pt-4">
                <Button variant="outline" onClick={back} size="lg" className="rounded-full px-12 h-12">Back</Button>
                <Button
                  onClick={() => { toast.success("Appointment confirmed!"); navigate("/"); }}
                  size="lg"
                  className="rounded-full px-12 h-12 bg-primary hover:bg-primary/90"
                >Submit</Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Appointment;
