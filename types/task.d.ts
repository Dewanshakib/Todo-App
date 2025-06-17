
export interface TaskProps {
    id: string,
    title: string,
    content: string,
    isCompleted: boolean,
    createdAt: Date,
    updatedAt: Date,
    userId: string
}

export interface UserProps {
    name?: string | null | undefined,
    email?: string | null | undefined,
    image?: string | null | undefined,
}