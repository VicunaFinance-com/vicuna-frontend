"use client";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Question } from "@/components/icons/question";
import { Badge } from "lucide-react";
import { HEALTHBAR_COLORS, healthData } from "@/constants";
import { useUserAccountData } from "@/hooks";
import { bnToNumber } from "@/helpers";

const RangeTest = () => (
  <div>
    <HealthBarProgress value={0.9} />
    <HealthBarProgress value={1} />
    <HealthBarProgress value={1.05} />
    <HealthBarProgress value={1.1} />
    <HealthBarProgress value={1.2} />
    <HealthBarProgress value={1.4} />
    <HealthBarProgress value={1.5} />
    <HealthBarProgress value={2} />
    <HealthBarProgress value={2.5} />
    <HealthBarProgress value={3} />
    <HealthBarProgress value={3.5} />
    <HealthBarProgress value={4} />
    <HealthBarProgress value={4.5} />
    <HealthBarProgress value={50} />
  </div>
);

interface HealthBarProgressProps {
  value: number;
  percentageIndicator?: boolean;
}

const scale = (
  min: number,
  half: number,
  max: number
): ((x: number) => number) => {
  if (min >= half || half >= max) {
    throw new Error("Ensure min < half < max for correct interpolation.");
  }

  return (x: number): number => {
    if (x <= min) {
      return 0;
    }
    if (x >= max) {
      return 100;
    }
    if (x <= half) {
      return (50 * (x - min)) / (half - min);
    }
    return 50 + (50 * (x - half)) / (max - half);
  };
};

export const HealthBarProgress = ({ value }: HealthBarProgressProps) => {
  const displayValue = value > 5 ? "5+" : value.toFixed(2);
  const progressValue = scale(1, 1.4, 5)(value);
  const data = healthData(value);

  return (
    <div className="relative pt-5">
      <div
        className={`relative h-2 w-full overflow-hidden rounded-full shadow-lg ${data.bg}`}
      />
      <div
        className="absolute top-3"
        style={{ left: `${progressValue}%`, transform: "translateX(-50%)" }}
      >
        <div
          className={`text-white text-xs px-2 py-1 rounded-full shadow-lg ${data.bg}`}
        >
          {displayValue}
        </div>
      </div>
    </div>
  );
};

export const HealthBar = () => {
  const { userAccountData } = useUserAccountData();
  const healthFactor = bnToNumber(userAccountData?.healthFactor, 18);

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-4">
        <text className="text-primary text-lg font-semibold">Health Bar</text>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Question className="w-3 h-3 rounded-full" />
            </TooltipTrigger>
            <TooltipContent className="w-full p-4">
              <div className="flex flex-col gap-2 w-full">
                {HEALTHBAR_COLORS.map((color) => (
                  <div
                    key={color.name}
                    className="flex items-center gap-4 justify-between"
                  >
                    <p className="flex-grow text-xs text-right text-foreground/70">
                      {color.name}:{` `}
                      {color.min === Infinity
                        ? `${color.max}-`
                        : color.max === Infinity
                        ? `>${color.min}`
                        : color.min === -Infinity
                        ? `<${color.max}`
                        : `${color.min} - ${color.max}`}
                    </p>
                    <Badge className={`${color.bg} text-white w-12`}></Badge>
                  </div>
                ))}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <HealthBarProgress value={healthFactor} />
      {/* <RangeTest /> */}
    </div>
  );
};
