"use client";
import Button from "@repo/ui/components/button/Button.tsx";
import TextInput from "@repo/ui/components/inputs/TextInput.tsx";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { APP_PATHS } from "@repo/misc/constants";
import { useRouter } from "next/navigation";
import { ServerError } from "../../helpers/client/asyncError.helper";
import useSWRMutation from "swr/mutation";
import { signInUser } from "../../services/client/user.services";

export interface LoginFormValues {
  email: string;
  pwd: string;
}

const LoginForm = () => {
  const {
    register,
    watch,
    handleSubmit,
    setError,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<LoginFormValues>();

  const router = useRouter();
  const { trigger, isMutating } = useSWRMutation("/api/user/login", signInUser);

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await trigger(data);
      router.push(APP_PATHS.HOME);
    } catch (e) {
      console.log({ e });
      if (e instanceof ServerError && e.response.status === 403) {
        setError("root", {
          type: "server",
          message: "Authentication failed. Please check your credentials.",
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
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <h1 className="text-4xl">Login</h1>
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
            })}
          />
          <span className="inline-block text-red  mx-auto">
            {formErrors.root?.message}
          </span>
        </div>
        <Button
          type="submit"
          isLoading={isSubmitting || isMutating}
          loadingText="Logging in"
        >
          Login to your account
        </Button>
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
