import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "@/assets/tasklist.png";
import { Button } from "./ui/button";
import { auth } from "@/auth";
import DropDownMenu from "./drop-down-menu";

export default async function Navbar() {
  const session = await auth();

  return (
    <div>
      <div className="py-3 px-4 mb-4">
        <div className="w-full flex items-center justify-between">
          <Link href="/home" className="flex items-center gap-1">
            <Image
              src={Logo}
              width={45}
              height={45}
              alt="Tasklist logo"
              priority
            />
            <span className="text-2xl font-medium bg-gradient-to-r from-indigo-500 to-cyan-500 bg-clip-text text-transparent">
              Todo
            </span>
          </Link>

          <div className="">
            {session && session?.user ? (
              <div className="flex items-start gap-2.5 ">
                <Link href="/add-task">
                  <Button variant="outline">Add Task</Button>
                </Link>
                <DropDownMenu image={session?.user ? session?.user?.image : undefined}/>
              </div>
            ) : (
              <Link href="/">
                <Button variant="secondary">Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
