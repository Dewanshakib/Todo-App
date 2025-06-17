
import { auth } from "@/auth";
import SocialSignIn from "@/components/auth/sign-in-social";
import { Metadata } from "next";
import { redirect } from "next/navigation";


export default async function Home() {

  const session = await auth()

  if(session?.user) redirect("/home")

  return (
    <div className="max-w-xs mx-auto">
      <SocialSignIn />
    </div>
  );
}

export const metadata:Metadata = {
  title:"Todo • Sign-In"
}
