import { auth } from "@/auth";
import ProfilePage from "@/components/profile-page";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";



export default async function Profile() {
  const session = await auth();
  if (!session?.user) return redirect("/");

  return (
    <div>
      <ProfilePage user={session?.user} />
    </div>
  );
}

export const metadata: Metadata = {
  title: "Profle",
};