"use client"
import { Button, Label, TextInput, Spinner } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation'
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import useUserStore from "@/store/userStore";
import { showLoginError } from "@/utils/alerts";
import { useEffect } from "react";

const Login = () => {
  const router = useRouter()
  const { isLoading, login, error } = useUserStore()
  const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Please type your email address"),
    password: yup.string().min(8, "Password must be at least 8 characters long.").required("A password is required"),
  })

  interface loginData {
    email: string;
    password: string;
  }

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(loginSchema) })

  const onSubmit = async (data: loginData) => {
    const res = await login(data)
    if (res) {
      router.push("/dashboard")
    }
  }


  useEffect(() => {
    if (error) {
      showLoginError(error)
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
      <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-lg w-full flex-col gap-4 rounded-md p-6">
        <h1 className="font-bold text-2xl text-center">LOGIN</h1>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1">Your email</Label>
          </div>
          <TextInput id="email1" type="email" placeholder="youremail@domain.com" required {...register("email")} />
          <p className="text-red-500">{errors.email?.message}</p>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1">Your password</Label>
          </div>
          <TextInput id="password1" type="password" required {...register("password")} />
          <p className="text-red-500">{errors.password?.message}</p>
        </div>
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
            <Spinner color="purple" />
          </div>
        ) : (
          <Button color="purple" type="submit">Login</Button>
        )}
      </form>
    </div>
  );
}

export default Login
