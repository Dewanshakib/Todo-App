import { auth } from "@/auth";
import EditTask from "@/components/edit-task";
import { prisma } from "@/prisma";
import { TaskProps } from "@/types/task";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export default async function Edit({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const task = await prisma.todo.findMany({
    where: {
      id: id,
    },
  });

  const session = await auth();
  if (!session?.user) return redirect("/");

  return (
    <div>
      {task &&
        task.length > 0 &&
        task.map((task:TaskProps, index) => <EditTask key={index} task={task} />)}
    </div>
  );
}

export const generateStaticParams = async () => {
  const tasks = await prisma.todo.findMany();

  return tasks.map((task) => {
    return { id: task.id };
  });
};

export const metadata: Metadata = {
  title: "Edit Task",
};
