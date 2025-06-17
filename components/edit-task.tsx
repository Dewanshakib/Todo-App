"use client";
import { TaskProps } from "@/types/task";
import React, { useActionState, useEffect } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { editTask } from "@/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function EditTask({ task }: { task: TaskProps }) {
  const initialMessage = {
    message: "",
    success: false,
  };
  const [state, formAction, pending] = useActionState(editTask, initialMessage);
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      return router.push("/home");
    }
  }, []);

  return (
    <div className="p-5">
      <div className="text-2xl font-bold mb-4">
        <h1 className="">Edit Task</h1>
      </div>
      <div className="">
        <form action={formAction}>
          {/* passing id */}
          <Input type="hidden" name="id" value={task.id} />
          <div className="mb-2">
            <Label htmlFor="title">Title</Label>
            <Input
              name="title"
              className="mt-1"
              placeholder="Enter your title"
              defaultValue={task.title}
            />
          </div>
          <div className="mb-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              name="content"
              className="mt-1"
              placeholder="Enter your task content"
              defaultValue={task.content}
            />
          </div>
          <Button disabled={pending} aria-disabled={pending} type="submit">
            {pending ? "Updating..." : "Edit Task"}
          </Button>
        </form>
      </div>
      {state.message && !state.success && (
        <div className="mt-2">
          <span className="bg-red-500 font-medium text-white px-3 py-1 text-xs rounded">
            {state.message && state.message}
          </span>
        </div>
      )}
    </div>
  );
}
