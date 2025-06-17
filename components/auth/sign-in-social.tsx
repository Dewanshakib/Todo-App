import { doSocialLogin } from "@/actions";
import React from "react";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";

export default function SocialSignIn() {
  return (
    <div className="p-2">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold bg-gradient-to-r from-indigo-500 to-cyan-500 bg-clip-text text-transparent">
          Sign-In
        </h1>
      </div>
      <form action={doSocialLogin}>
        <div className="flex items-center gap-y-2 flex-col ">
          <Button
            type="submit"
            name="action"
            value="google"
            variant={"outline"}
            className="w-full"
          >
            Sign In With Google <FcGoogle />{" "}
          </Button>
          <Button
            type="submit"
            name="action"
            value="github"
            variant={"outline"}
            className="w-full"
          >
            Sign In With Github <FaGithub />{" "}
          </Button>
        </div>
      </form>
    </div>
  );
}
