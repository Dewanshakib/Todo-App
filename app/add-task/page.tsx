import { auth } from "@/auth";
import AddTaskFrom from "@/components/add-task-form";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export default async function AddTask() {
  const session = await auth();
  if (!session?.user) return redirect("/");

  return (
    <div>
      <AddTaskFrom />
    </div>
  );
}

export const metadata: Metadata = {
  title: "Add Task",
};
