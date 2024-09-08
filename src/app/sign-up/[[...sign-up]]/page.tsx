"use client";

import Back from "@/app/components/Back";
import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
import { FcGoogle } from "react-icons/fc";

export default function SignUpPage() {
  return (
    <div className="flex flex-row w-full h-screen ">
      <div className="flex flex-row w-[50%] h-screen bg-zinc-100 px-4 items-center justity-start">
        <Back />

        <div className="mx-auto flex flex-col justify-center items-center gap-y-10">
          <div className="flex flex-col">
            <p className="text-neutral-700 text-center text-4xl font-bold ">
              Welcome Back!
            </p>
            <span className="text-neutral-500 text-lg text-wrap">
              Login or create account to continue using SaveBox
            </span>
          </div>
          <SignUp.Root>
            <SignUp.Step
              name="start"
              className="w-full  space-y-6 rounded-2xl bg-white px-4 py-10 shadow-md ring-1 ring-black/5 sm:w-96 sm:px-8"
            >
              <header className="flex flex-col items-center justify-center">
                <div className="flex flex-row items-center space-x-2 w-12 h-12 px-2 py-2 bg-neutral-950 shadow-[0_1px_0_0_theme(colors.white/17%)_inset,0_0_0_1px_theme(colors.white/5%)] rounded-md">
                  <svg
                    fill="#ffffff"
                    height="800px"
                    width="800px"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <g>
                      <g>
                        <path
                          d="M511.083,100.779c-0.171-0.597-0.427-1.152-0.661-1.728c-0.469-1.28-1.067-2.475-1.792-3.627
			c-0.363-0.597-0.725-1.152-1.152-1.685c-0.832-1.088-1.771-2.048-2.795-2.944c-0.469-0.427-0.896-0.875-1.387-1.259
			c-0.149-0.107-0.256-0.235-0.405-0.341c-1.493-1.045-3.093-1.856-4.757-2.496c-0.064-0.021-0.107-0.064-0.171-0.085L263.296,1.28
			c-4.715-1.707-9.877-1.707-14.592,0L14.037,86.613c-0.064,0.021-0.107,0.064-0.171,0.085c-1.664,0.64-3.264,1.451-4.757,2.496
			c-0.149,0.107-0.256,0.235-0.405,0.341c-0.491,0.384-0.917,0.832-1.387,1.259c-1.024,0.896-1.963,1.856-2.795,2.944
			c-0.427,0.533-0.789,1.088-1.152,1.685c-0.725,1.152-1.323,2.347-1.792,3.627c-0.235,0.576-0.491,1.131-0.661,1.728
			C0.363,102.677,0,104.64,0,106.667v298.667c0,8.96,5.611,16.981,14.037,20.053l234.667,85.333c0.149,0.043,0.32,0.021,0.469,0.085
			c2.219,0.747,4.501,1.195,6.827,1.195s4.608-0.448,6.827-1.195c0.149-0.064,0.32-0.043,0.469-0.085l234.667-85.333
			c8.427-3.072,14.037-11.093,14.037-20.053V106.667C512,104.64,511.637,102.677,511.083,100.779z M256,169.301L83.755,106.667
			L256,44.032l172.245,62.635L256,169.301z M469.333,390.4l-192,69.803V206.933l192-69.803V390.4z"
                        />
                      </g>
                    </g>
                  </svg>
                </div>
                <h1 className="mt-4 text-xl font-medium tracking-tight text-zinc-950">
                  Sign in to SaveBox
                </h1>
              </header>
              <Clerk.Connection
                name="google"
                className="w-full rounded-md bg-zinc-950 px-3.5 py-1.5 text-center text-sm font-medium text-white shadow outline-none ring-1 ring-inset ring-zinc-950 hover:bg-zinc-800 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-zinc-950 active:text-white/70 flex items-center justify-center gap-x-2"
              >
                <FcGoogle size={24} />
                Sign up with Google
              </Clerk.Connection>
              <Clerk.GlobalError className="block text-sm text-red-400" />
              <div className="space-y-4">
                <Clerk.Field name="emailAddress" className="space-y-2">
                  <Clerk.Label className="text-sm font-medium text-zinc-950">
                    Email
                  </Clerk.Label>
                  <Clerk.Input
                    type="text"
                    required
                    className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400 text-zinc-900"
                  />
                  <Clerk.FieldError className="block text-sm text-red-400" />
                </Clerk.Field>
                <Clerk.Field name="password" className="space-y-2">
                  <Clerk.Label className="text-sm  font-medium text-zinc-950">
                    Password
                  </Clerk.Label>
                  <Clerk.Input
                    type="password"
                    required
                    className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400 text-zinc-900"
                  />
                  <Clerk.FieldError className="block text-sm text-red-400" />
                </Clerk.Field>
              </div>
              <SignUp.Action
                submit
                className="w-full rounded-md bg-zinc-950 px-3.5 py-1.5 text-center text-sm font-medium text-white shadow outline-none ring-1 ring-inset ring-zinc-950 hover:bg-zinc-800 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-zinc-950 active:text-white/70"
              >
                Sign In
              </SignUp.Action>
              <p className="text-center text-sm text-zinc-500">
                Already have an account?{" "}
                <a
                  href="#"
                  className="font-medium text-zinc-950 decoration-zinc-950/20 underline-offset-4 outline-none hover:text-zinc-700 hover:underline focus-visible:underline"
                >
                  Login
                </a>
              </p>
            </SignUp.Step>

            <SignUp.Step
              name="continue"
              className="w-full  space-y-6 rounded-2xl bg-white px-4 py-10 shadow-md ring-1 ring-black/5 sm:w-96 sm:px-8"
            >
              <Clerk.Field name="username" className="space-y-2">
                <Clerk.Label className="text-sm font-medium text-zinc-950">
                  Username
                </Clerk.Label>
                <Clerk.Input
                  type="text"
                  placeholder="eg: @divyansh"
                  required
                  className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400 text-zinc-900"
                />
                <Clerk.FieldError className="block text-sm text-red-400" />
              </Clerk.Field>
              <SignUp.Action
                submit
                className="w-full rounded-md bg-zinc-950 px-3.5 py-1.5 text-center text-sm font-medium text-white shadow outline-none ring-1 ring-inset ring-zinc-950 hover:bg-zinc-800 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-zinc-950 active:text-white/70"
              >
                Create Account
              </SignUp.Action>
            </SignUp.Step>
            <SignUp.Step
              name="verifications"
              className="w-full  space-y-6 rounded-2xl bg-white px-4 py- shadow-md ring-1 ring-black/5 sm:w-96 sm:px-8"
            >
              <SignUp.Strategy name="email_code">
                <Clerk.Field name="code">
                  <Clerk.Label className="text-sm font-medium text-zinc-950">
                    Email code
                  </Clerk.Label>
                  <Clerk.Input
                    className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400 text-zinc-900"
                    type="text"
                  />
                  <Clerk.FieldError className="block text-sm text-red-400" />
                </Clerk.Field>
                <p className="
                text-muted text-sm font-medium text-center ">Email Code is sent to your email</p>

                <SignUp.Action
                  submit
                  className="w-full rounded-md bg-zinc-950 px-3.5 py-1.5 text-center text-sm font-medium text-white shadow outline-none ring-1 ring-inset ring-zinc-950 hover:bg-zinc-800 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-zinc-950 active:text-white/70"
                >
                  Verify email
                </SignUp.Action>
              </SignUp.Strategy>
            </SignUp.Step>
          </SignUp.Root>
        </div>
      </div>
      <div className="flex w-[50%] items-center justify-center">
        <div className="flex flex-row items-center space-x-2 w-32 h-32 px-2 py-2 bg-neutral-950 shadow-[0_1px_0_0_theme(colors.white/17%)_inset,0_0_0_1px_theme(colors.white/5%)] rounded-md">
          <svg
            fill="#ffffff"
            height="800px"
            width="800px"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <g>
                <path
                  d="M511.083,100.779c-0.171-0.597-0.427-1.152-0.661-1.728c-0.469-1.28-1.067-2.475-1.792-3.627
			c-0.363-0.597-0.725-1.152-1.152-1.685c-0.832-1.088-1.771-2.048-2.795-2.944c-0.469-0.427-0.896-0.875-1.387-1.259
			c-0.149-0.107-0.256-0.235-0.405-0.341c-1.493-1.045-3.093-1.856-4.757-2.496c-0.064-0.021-0.107-0.064-0.171-0.085L263.296,1.28
			c-4.715-1.707-9.877-1.707-14.592,0L14.037,86.613c-0.064,0.021-0.107,0.064-0.171,0.085c-1.664,0.64-3.264,1.451-4.757,2.496
			c-0.149,0.107-0.256,0.235-0.405,0.341c-0.491,0.384-0.917,0.832-1.387,1.259c-1.024,0.896-1.963,1.856-2.795,2.944
			c-0.427,0.533-0.789,1.088-1.152,1.685c-0.725,1.152-1.323,2.347-1.792,3.627c-0.235,0.576-0.491,1.131-0.661,1.728
			C0.363,102.677,0,104.64,0,106.667v298.667c0,8.96,5.611,16.981,14.037,20.053l234.667,85.333c0.149,0.043,0.32,0.021,0.469,0.085
			c2.219,0.747,4.501,1.195,6.827,1.195s4.608-0.448,6.827-1.195c0.149-0.064,0.32-0.043,0.469-0.085l234.667-85.333
			c8.427-3.072,14.037-11.093,14.037-20.053V106.667C512,104.64,511.637,102.677,511.083,100.779z M256,169.301L83.755,106.667
			L256,44.032l172.245,62.635L256,169.301z M469.333,390.4l-192,69.803V206.933l192-69.803V390.4z"
                />
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
