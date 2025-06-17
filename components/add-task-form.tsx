"use client";
import React, { useActionState, useEffect } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { addTask } from "@/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AddTaskFrom() {
  const router = useRouter();
  const initialMessage = {
    message: "",
    success: false,
  };
  const [state, formAction, pending] = useActionState(addTask, initialMessage);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      router.push("/home");
    }
  }, [state.success]);

  return (
    <div className="p-5">
      <div className="text-2xl font-bold mb-4">
        <h1 className="">Add Task</h1>
      </div>
      <div className="">
        <form action={formAction}>
          <div className="mb-2">
            <Label htmlFor="title">Title</Label>
            <Input
              name="title"
              className="mt-1"
              placeholder="Enter your task title"
            />
          </div>
          <div className="mb-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              name="content"
              className="mt-1"
              placeholder="Enter your task content"
            />
          </div>
          <Button disabled={pending} aria-disabled={pending} type="submit">
            {pending ? "Creating..." : "Create Task"}
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
