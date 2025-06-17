"use client";
import { TaskProps } from "@/types/task";
import React, { useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";
import { Checkbox } from "./ui/checkbox";
import { deleteTodo, updateTodoCompleted } from "@/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Tasks({ task }: { task: TaskProps }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition();
  const [checkValue, setCheckValue] = useState<boolean>(task.isCompleted);
  const handleCheckBox = (value: boolean) => {
    setCheckValue(value);

    // updating todo isCompleted
    startTransition(async () => {
      await updateTodoCompleted(task.id, value);
    });
  };

  // delete todo
  const handleDelete = async (id:string) => {
    try {
      await deleteTodo(id)
      toast.success("Task deleted successfully")
      return router.refresh()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Card>
        <CardContent className="flex justify-between items-start">
          <div>
            <CardHeader className="p-0">
              <CardTitle
                className={`text-lg ${
                  checkValue && "line-through text-gray-400"
                }`}
              >
                {task.title}
              </CardTitle>
            </CardHeader>
            <p className={`${checkValue && "line-through opacity-50"} text-sm text-gray-600 mt-1`}>{task.content}</p>
          </div>

          <div className="flex items-center gap-x-2">
            <Checkbox
              disabled={isPending}
              checked={checkValue}
              onCheckedChange={handleCheckBox}
            />
            <Link href={`edit-task/${task.id}`}>
              <Button variant="outline" size="sm">
                <Edit />
              </Button>
            </Link>
            <Button onClick={()=> handleDelete(task.id)} variant="destructive" size="sm">
              <Trash />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
