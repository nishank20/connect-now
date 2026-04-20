import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = ["Call Options", "Visit Details", "Select Pharmacy", "Review and Submit", "Billing Information"];

const AppointmentStepper = ({ current }: { current: number }) => {
  return (
    <div className="flex items-start justify-between mb-10 px-2">
      {STEPS.map((label, i) => {
        const num = i + 1;
        const isCurrent = num === current;
        const isComplete = num < current;
        const isFirst = num === 1;
        return (
          <div key={label} className="flex-1 flex flex-col items-center relative">
            {i > 0 && (
              <div
                className={cn(
                  "absolute top-5 right-1/2 w-full h-px",
                  num <= current ? "bg-primary/40" : "bg-border"
                )}
              />
            )}
            <div
              className={cn(
                "relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold",
                isComplete && "bg-primary border-primary text-primary-foreground",
                isCurrent && isFirst && "bg-secondary border-secondary text-secondary-foreground",
                isCurrent && !isFirst && "bg-primary border-primary text-primary-foreground",
                !isCurrent && !isComplete && "bg-card border-border text-foreground"
              )}
            >
              {isComplete ? <Check className="h-4 w-4" /> : num}
            </div>
            <span className="mt-2 text-xs text-foreground text-center">{label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default AppointmentStepper;
