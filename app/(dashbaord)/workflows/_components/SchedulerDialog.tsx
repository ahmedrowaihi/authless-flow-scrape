"use client";

import {
  removeWorkflowSchedule,
  updateWorkFlowCron,
} from "@/actions/workflows";
import CustomDialogHeader from "@/components/CustomDialogHeader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";

import { CalendarIcon, ClockIcon, TriangleAlertIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import cronstrue from "cronstrue";
import parser from "cron-parser";
import { Separator } from "@/components/ui/separator";

function SchedulerDialog({
  workflowId,
  workflowCron,
}: {
  workflowId: string;
  workflowCron: string | null;
}) {
  const [cron, setCron] = useState(workflowCron || "");
  const [validCron, setValidCron] = useState(false);
  const [readableCron, setReadableCron] = useState("");

  const mutation = useMutation({
    mutationFn: updateWorkFlowCron,
    onSuccess: () => {
      toast.success("Scheudle updated successfully", { id: "cron" });
    },
    onError: (error: any) => {
      toast.error(error.message || "Something went wrong", { id: "cron" });
    },
  });

  const removeScheduleMutation = useMutation({
    mutationFn: removeWorkflowSchedule,
    onSuccess: () => {
      toast.success("Scheudle removed successfully", { id: "cron" });
    },
    onError: (error: any) => {
      toast.error(error.message || "Something went wrong", { id: "cron" });
    },
  });

  useEffect(() => {
    try {
      const cronString = cronstrue.toString(cron);
      parser.parseExpression(cron);
      setValidCron(true);
      setReadableCron(cronString);
    } catch (error: any) {
      console.log(error.message);
      setValidCron(false);
    }
  }, [cron]);

  const hasValidCron = workflowCron && workflowCron.length > 0;
  const readableWorkflowCron = hasValidCron && cronstrue.toString(workflowCron);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"link"}
          size={"sm"}
          className={cn(
            "text-sm p-0 h-auto text-orange-400",
            hasValidCron && "text-primary"
          )}
        >
          {hasValidCron ? (
            <div className="flex items-center gap-2">
              <ClockIcon />
              {readableWorkflowCron}
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <TriangleAlertIcon className="h-3 w-3 mr-1" />
              Set Schedule
            </div>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader
          title="Schedule workflow execution"
          icon={CalendarIcon}
        />
        <div className="p-6 space-y-4">
          <p className="text-muted-foreground text-sm">
            Specify a cron expression to schedule periodic workflow execution.
            All times are in UTC
          </p>
          <Input
            placeholder="E.g. * * * * *"
            value={cron}
            onChange={(e) => setCron(e.target.value)}
          />
          {cron && (
            <div
              className={cn(
                "bg-accent rounded-md p-4 border text-sm text-destructive border-destructive",
                validCron && "text-primary border-primary"
              )}
            >
              {validCron ? readableCron : "Not a valid cron expression"}
            </div>
          )}
        </div>
        {validCron && (
          <DialogClose asChild>
            <div className="px-8">
              <Button
                className="w-full text-destructive border-destructive hover:text-destructive"
                variant={"outline"}
                disabled={
                  mutation.isPending || removeScheduleMutation.isPending
                }
                onClick={() => {
                  toast.loading("Removing cron", { id: "cron" });
                  removeScheduleMutation.mutate(workflowId);
                }}
              >
                Remove current schedule
              </Button>
              <Separator className="my-4" />
            </div>
          </DialogClose>
        )}
        <DialogFooter className="px-6 gap-2">
          <DialogClose asChild>
            <Button className="w-full" variant={"secondary"}>
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              className="w-full"
              disabled={!validCron || mutation.isPending || !cron}
              onClick={() => {
                toast.loading("Saving cron", { id: "cron" });
                mutation.mutate({
                  cron,
                  id: workflowId,
                });
              }}
            >
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default SchedulerDialog;
