"use client";
import Button from "@repo/ui/components/button/Button.tsx";
import TextInput from "@repo/ui/components/inputs/TextInput.tsx";
import Link from "next/link";
import { APP_PATHS } from "@repo/misc/constants";
import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import { createUser } from "../../services/client/user.services";
import { ServerError } from "../../helpers/client/asyncError.helper";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

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
    formState: { errors: formErrors, isSubmitting },
  } = useForm<SignUpFormValues>({ mode: "onSubmit", reValidateMode: "onBlur" });

  const router = useRouter();

  const { trigger, isMutating } = useSWRMutation(
    "/api/user/signup",
    createUser
  );

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      await trigger(data);
      toast(
        "Account created successfully, you will be redirected to the login page.",
        { type: "success" }
      );

      setTimeout(() => router.push(APP_PATHS.LOGIN), 2000);
    } catch (e) {
      if (e instanceof ServerError && e.response.status === 409) {
        setError("root", {
          type: "server",
          message:
            "User with this email already exists. Please choose another email or log in to the existing account.",
        });
        return;
      }

      setError("root", {
        type: "server",
        message: "Something went wrong. Please try again later or contact us.",
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-4xl">Create account</h1>
        <div className="flex flex-col gap-y-6 my-10">
          <TextInput
            placeholder="Email address"
            textContent={watch("email")}
            type="email"
            error={formErrors.email?.message}
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
            error={formErrors.pwd?.message}
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
            error={formErrors.pwdAgain?.message}
            {...register("pwdAgain", {
              required: "Can’t be empty",
              validate: (value) =>
                value === watch("pwd") || "Passwords do not match",
            })}
          />
          <span className="inline-block text-red  mx-auto">
            {formErrors.root?.message}
          </span>
        </div>
        <Button type="submit" disabled={isSubmitting || isMutating}>
          Create account
        </Button>
      </form>
      <span className="mx-auto">
        <span>Already have an account?</span>
        <Link className="ml-[9px] text-red" href={APP_PATHS.LOGIN}>
          Log In
        </Link>
      </span>
    </>
  );
};

export default SignUpForm;
