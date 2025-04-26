import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronDown, Timer } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Progress } from "../ui/progress";

interface PollOption {
  content: string;
  vote_count: number;
  voters: string[];
  _id: string;
}

interface PollProps {
  options: PollOption[];
  endAt: string;
  status: string;
  onVote?: (optionId: string) => Promise<void>;
  userVoted?: boolean;
  className?: string;
}

export function Poll({
  options,
  endAt,
  status,
  onVote,
  userVoted = false,
  className,
}: PollProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isVoting, setIsVoting] = useState(false);
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [isPollActive, setIsPollActive] = useState(true);

  const totalVotes = options.reduce(
    (sum, option) => sum + option.vote_count,
    0
  );

  // Calculate time remaining
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const end = new Date(endAt);

      if (now > end || status === "closed") {
        setIsPollActive(false);
        setTimeLeft("Poll closed");
        return;
      }

      const diffMs = end.getTime() - now.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const diffHrs = Math.floor(
        (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

      if (diffDays > 0) {
        setTimeLeft(`${diffDays} day${diffDays > 1 ? "s" : ""} left`);
      } else if (diffHrs > 0) {
        setTimeLeft(`${diffHrs} hour${diffHrs > 1 ? "s" : ""} left`);
      } else if (diffMins > 0) {
        setTimeLeft(`${diffMins} minute${diffMins > 1 ? "s" : ""} left`);
      } else {
        setTimeLeft("Closing soon");
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [endAt, status]);

  const handleVote = async () => {
    if (!selectedOption || !onVote || !isPollActive) return;

    setIsVoting(true);
    try {
      await onVote(selectedOption);
      toast.success("Your vote has been recorded!");
    } catch (error) {
      toast.error("Failed to record your vote. Please try again.");
      console.error("Vote error:", error);
    } finally {
      setIsVoting(false);
    }
  };

  // Calculate percentages for display
  const getPercentage = (votes: number) => {
    if (totalVotes === 0) return 0;
    return Math.round((votes / totalVotes) * 100);
  };

  return (
    <Card className={cn("w-full shadow-sm", className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Poll</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform",
                isExpanded ? "transform rotate-180" : ""
              )}
            />
          </Button>
        </div>
        <CardDescription className="flex items-center gap-1 text-xs">
          <Timer className="h-3 w-3" /> {timeLeft}
        </CardDescription>
      </CardHeader>

      {isExpanded && (
        <CardContent className="pt-2">
          <div className="space-y-2">
            {options.map((option) => {
              const percentage = getPercentage(option.vote_count);
              const isSelected = selectedOption === option._id;
              const showResults = userVoted || !isPollActive;

              return (
                <motion.div
                  key={option._id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "relative rounded-md border p-3 transition-colors",
                    isSelected && "border-primary bg-primary/5",
                    showResults
                      ? "cursor-default"
                      : "cursor-pointer hover:bg-muted/50",
                    !isPollActive && "opacity-80"
                  )}
                  onClick={() => {
                    if (!showResults && isPollActive) {
                      setSelectedOption(option._id);
                    }
                  }}
                >
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-medium text-sm">{option.content}</p>
                    {showResults && (
                      <span className="text-xs font-semibold">
                        {percentage}%
                      </span>
                    )}
                  </div>

                  {showResults && (
                    <div className="w-full">
                      <Progress value={percentage} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        {option.vote_count} vote{option.vote_count !== 1 && "s"}
                      </p>
                    </div>
                  )}
                </motion.div>
              );
            })}

            {isPollActive && !userVoted && (
              <Button
                className="w-full mt-3"
                disabled={!selectedOption || isVoting}
                onClick={handleVote}
              >
                {isVoting ? "Voting..." : "Vote"}
              </Button>
            )}

            <p className="text-xs text-center text-muted-foreground mt-2">
              {totalVotes} total vote{totalVotes !== 1 && "s"}
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
