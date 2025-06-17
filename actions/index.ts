"use server"

import { auth, signIn, signOut } from "@/auth"
import { prisma } from "@/prisma"
import { revalidatePath } from "next/cache"


export const doSocialLogin = async (formData: FormData) => {
    const action = formData.get("action")
    if (typeof (action) === "string") {
        await signIn(action, { redirectTo: "/home" })
    } else {
        // console.log("Error Occured")
    }
}

export const doLogout = async () => {
    try {
        await signOut({ redirect: true, redirectTo: "/" })

    } catch (error) {
        // console.log("Error while sign out")
    }
}

export const addTask = async (prevState: any, formData: FormData) => {

    const session = await auth()
    const id = session?.user?.id as string

    const title = formData.get("title") as string
    const content = formData.get("content") as string

    if (!title || !content) {
        return {
            message: "Title & Content both feilds are required!",
            success: false
        }
    }

    try {
        const res = await prisma.todo.create({
            data: {
                userId: id,
                title,
                content
            }
        })

        if (!res) {

            return {
                message: "Failed to create task!",
                success: false
            }


        }
        revalidatePath("/home")
        return {
            message: "Task Created Successfully",
            success: true
        }

    } catch (error: any) {
        return {
            message: error.message,
            success: false
        }
    }
}

export const updateTodoCompleted = async (id: string, isCompleted: boolean) => {
    try {
        await prisma.todo.update({
            where: {
                id
            }, data: {
                isCompleted: isCompleted
            }
        })

        // console.log("Todo updated successfully")
    } catch (error) {
        console.log("Error while update")
    }
}

export const deleteTodo = async (id: string) => {
    try {
        await prisma.todo.delete({
            where: {
                id: id
            }
        })

        console.log("Todo Deleted successfully")
        return revalidatePath("/home")
    } catch (error) {
        console.log("Error while delete")
    }
}

export const editTask = async (prevState: any, formData: FormData) => {
    const id = formData.get("id") as string
    const title = formData.get("title") as string
    const content = formData.get("content") as string
    try {

        if (!title || !content) {
            return {
                message: "All fields are required!",
                success: false
            }
        }

        const res = await prisma.todo.update(
            {
                where: {
                    id: id
                }, data: {
                    title: title,
                    content: content
                }
            }
        )

        if (!res) {
            return {
                message: "Error while editing todo",
                success: false
            }
        }

        revalidatePath("/home")
        return {
            message: "Task Edited Successfully",
            success: true
        }

    } catch (error:any) {
        return {
            message: error.message,
            success: false
        }
    }
}