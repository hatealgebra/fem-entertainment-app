"use client";
import Button from "@repo/ui/components/button/Button.tsx";
import TextInput from "@repo/ui/components/inputs/TextInput.tsx";
import Link from "next/link";
import { APP_PATHS } from "@repo/misc/constants";
import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import { createUser } from "../../services/user.services";

export interface SignUpFormValues {
  email: string;
  pwd: string;
  pwdAgain: string;
}

const SignUpForm = () => {
  const {
    register,
    watch,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpFormValues>();

  const { trigger, isMutating } = useSWRMutation(
    "/api/user/signup",
    createUser
  );

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      const response = await trigger(data);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
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
              minLength: {
                value: 8,
                message: "Minimum length should be 8",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,12}$/,
                message:
                  "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
              },
            })}
          />
          <TextInput
            placeholder="Password"
            textContent={watch("pwdAgain")}
            type="password"
            error={errors.pwdAgain?.message}
            {...register("pwdAgain", {
              required: "Can’t be empty",
              validate: (value) =>
                value === watch("pwd") || "Passwords do not match",
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

export default SignUpForm;
