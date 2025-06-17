import { UserProps } from "@/types/task";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { doLogout } from "@/actions";

export default async function ProfilePage({ user }: { user: UserProps }) {
  return (
    <div className="flex flex-col items-center w-[100%]">
      <div className="bg-gradient-to-t w-[100%] from-indigo-300 to bg-cyan-300 rounded p-4 relative h-24">
        <Image
          src={user && (user?.image as string)}
          width={90}
          height={90}
          className="absolute left-[50%] transform -translate-x-1/2 translate-y-5 rounded-full"
          alt={`User photo of ${user && (user?.name as string)}`}
          priority
        />
      </div>
      <div className="mt-10 text-center">
        <h1 className="text-gray-900 font-medium text-sm mb-1">
          Name: {user?.name}
        </h1>
        <h1 className="text-gray-700 font-medium text-xs mb-1">
          Email: {user?.email}
        </h1>
      </div>
      <div>
        <form action={doLogout}>
          <Button variant="outline" type="submit" className="mt-2">
            Sign Out
          </Button>
        </form>
      </div>
    </div>
  );
}
