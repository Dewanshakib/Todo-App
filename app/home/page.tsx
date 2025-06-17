import { auth } from "@/auth";
import Tasks from "@/components/tasks";
import { prisma } from "@/prisma";
import { TaskProps } from "@/types/task";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export default async function Home() {
  const session = await auth();

  const userId = session?.user?.id;

  if (!session?.user) return redirect("/");

  const tasks = await prisma.todo.findMany({
    where: {
      userId,
    },
  });

  return (
    <div>
      {tasks && tasks.length > 0 ? (
        <div className="">
          {tasks.map((task:TaskProps) => (
            <Tasks key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <div>
          <h1 className="text-xl ml-3 font-semibold">No tasks added yet</h1>
        </div>
      )}
    </div>
  );
}

export const metadata: Metadata = {
  title: "Home",
};
