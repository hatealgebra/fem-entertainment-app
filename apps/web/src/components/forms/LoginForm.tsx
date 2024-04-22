"use client";
import Button from "@repo/ui/components/button/Button.tsx";
import TextInput from "@repo/ui/components/inputs/TextInput.tsx";
import Link from "next/link";
import { APP_PATHS } from "@repo/misc/constants";
import { useForm } from "react-hook-form";

interface LoginFormValues {
  email: string;
  pwd: string;
}

const LoginForm = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <h1 className="text-4xl">Login</h1>
        <div className="flex flex-col gap-y-6 my-10">
          <TextInput
            placeholder="Email address"
            textContent={watch("email")}
            type="email"
            error={errors.email?.message}
            {...register("email", {
              required: "Can’t be empty",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Entered value does not match email format",
              },
            })}
          />
          <TextInput
            placeholder="Password"
            textContent={watch("pwd")}
            type="password"
            error={errors.pwd?.message}
            {...register("pwd", {
              required: "Can’t be empty",
            })}
          />
        </div>
        <Button type="submit">Login to your account</Button>
      </form>
      <span className="mx-auto">
        <span>Don't have an account?</span>
        <Link className="ml-[9px] text-red" href={APP_PATHS.REGISTER}>
          Sign Up
        </Link>
      </span>
    </>
  );
};

export default LoginForm;
