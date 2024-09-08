import { Button } from "@/components/ui/button";
import Image from "next/image";
import Header from "./components/header";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen w-full  bg-neutral-950 relative flex flex-col items-center justify-start antialiased">
      <Header />
      <div className="max-w-3xl space-y-3 flex flex-col p-8 mt-24">
        <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          Manage all your work in one place effieciently
        </h1>
        <p></p>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          Welcome to SaveBox, the best place to manage all your work in one
          place effieciently and effortlessly. Manage your
          projects,tasks,files,notes,and bookmkarks in one place.
        </p>
        <div className="mx-60 flex flex-row space-x-4 mt-2">
          <Link href={"/sign-up"}>
            <Button className=" rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white shadow-[0_1px_0_0_theme(colors.white/10%)_inset,0_0_0_1px_theme(colors.white/5%)] outline-none before:absolute before:inset-0 before:-z-10 before:rounded-md before:bg-white/5 before:opacity-0 hover:before:opacity-100 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-blue-400 active:text-white/70 active:before:bg-black/10 hover:bg-neutral-800/20 hover:shadow-[0_1px_0_0_theme(colors.white/10%)_inset,0_0_0_1px_theme(colors.white/5%)]">
              Get Started
            </Button>
          </Link>
          <Link href={"/sign-in"}>
            <Button className=" rounded-full  bg-blue-600 px-8 py-2 text-sm font-semibold text-neutral-300 hover:bg-white shadow-[0_1px_0_0_theme(colors.white/10%)_inset,0_0_0_1px_theme(colors.white/5%)] outline-none before:absolute before:inset-0 before:-z-10 before:rounded-md before:bg-white/5 before:opacity-0 hover:before:opacity-100 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-blue-400 active:text-white/70 active:before:bg-black/10 hover:bg-blue-700/60 hover:shadow-[0_1px_0_0_theme(colors.white/10%)_inset,0_0_0_1px_theme(colors.white/5%)] trasition-all duration-300 ease-in-out">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
