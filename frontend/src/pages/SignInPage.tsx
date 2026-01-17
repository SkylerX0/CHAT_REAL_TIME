import React from 'react'
import { SignInForm } from '@/components/auth/signin-form'

const SignInPage = () => {
    return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 absolute inset-0 z-0 bg-gradient-purple">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className=" text-primary-foreground flex size-6 items-center justify-center rounded-md">
            {/* <GalleryVerticalEnd className="size-4" /> */}
                <img src="/logo.svg" alt="logo" />
          </div>
          LAYIZ
        </a>
        <SignInForm />
      </div>
    </div>
    )
}

export default SignInPage
