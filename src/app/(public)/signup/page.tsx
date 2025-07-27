
"use client"
import { Button, Checkbox, Label, TextInput, Spinner } from "flowbite-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation'
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import useUserStore from "@/store/userStore";
import { showSignUpError } from "@/utils/alerts";
import { useEffect } from "react";

const SignUp = () => {
  const router = useRouter()
  const { signup, isLoading, error } = useUserStore()
  const signupSchema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Please type your email address"),
    password: yup.string().min(8, "Password must be at least 8 characters long.").required("A password is required"),
    passwordConfirm: yup.string().oneOf([yup.ref("password")], "Passwords must match").required("Please retype your password to register")
  })
  interface signupData {
    email: string;
    password: string;
    passwordConfirm: string;
  }
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(signupSchema) })

  const onSubmit = async (data: signupData) => {
    const res = await signup(data)
    if (res) {
      router.push("/dashboard")
    }
  }


  useEffect(() => {
    if (error) {
      showSignUpError(error)
    }
  }, [error])

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <Spinner color="purple" />
      </div>
    )

  }
  return (
    <div className="flex h-screen items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-lg w-full p-6 flex-col gap-4">
        <h1 className="font-bold text-2xl text-center">REGISTER</h1>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email2">Your email</Label>
          </div>
          <TextInput id="email2" type="email" placeholder="name@flowbite.com" required shadow {...register("email")} />
          <p className="text-red-500">{errors.email?.message}</p>

        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password2">Your password</Label>
          </div>
          <TextInput id="password2" type="password" required shadow {...register("password")} />
          <p className="text-red-500">{errors.password?.message}</p>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="repeat-password">Repeat password</Label>
          </div>
          <TextInput id="repeat-password" type="password" required shadow {...register("passwordConfirm")} />
          <p className="text-red-500">{errors.passwordConfirm?.message}</p>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="agree" />
          <Label htmlFor="agree" className="flex">
            I agree with the&nbsp;
            <Link href="#" className="text-cyan-600 hover:underline dark:text-cyan-500">
              terms and conditions
            </Link>
          </Label>
        </div>
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
            <Spinner color="purple" />
          </div>
        ) : (
          <Button color="purple" type="submit">Sign Up</Button>
        )}
      </form>
    </div>
  );
}

export default SignUp
