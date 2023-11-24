"use client";

import { FormEvent, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { z } from "zod";
import LoadingDialog from "./LoadingDialog";
import SubmitButton from "./SubmitButton";
import BackButton from "./BackButton";
import Dialog from "./Dialog";
//import { isLoading } from "@/store/flags";

//const formLoading = isLoading();

const formSchema = z.object({
  email: z.string().min(1, "Email is required.").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required.")
    .min(8, "Password must have at least 8 characters."),
});

type FormSchema = z.infer<typeof formSchema>;

const AdminLogin = () => {
  const router = useRouter();
  const session = useSession();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [errMessage, setErrMessage] = useState("");

  const [formError, setFormError] = useState<z.ZodFormattedError<
    FormSchema,
    string
  > | null>(null);

  if (session.status === "loading") {
    return <LoadingDialog />;
  }

  console.log(session);
  //const searchParams = useSearchParams();
  //const showDialog = searchParams.get("showDialog");

  if (session.status !== "unauthenticated") {
    return (
      <p>
        <br></br>
        You&lsquo;re currently logged in. Please go back to the&nbsp;
        <Link className="text-blue-500 underline" href="/">
          Timeclock
        </Link>
        &nbsp; page.
      </p>
    );
  }

  //const [userEmail, setEmail] = useState("");
  //const [userPassword, setPassword] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.target as HTMLFormElement);

    const formDataValues = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const parsedFormValue = formSchema.safeParse(formDataValues);

      if (!parsedFormValue.success) {
        const err = parsedFormValue.error.format();
        console.log(err);
        setFormError(err);
        return;
      } else {
        setFormError(null);
      }

      const signInData = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
        //callbackUrl: "/login",
      });

      if (signInData?.error) {
        setErrMessage("Email or Password is incorrect.");
        router.push("login?showDialog=y");
        router.refresh();
      } else {
        router.refresh();
        router.push("/");
      }
      /*
        .then((response) => {
          console.log("response: ", response);
        })
        .catch((error) => {
          console.log("error: ", error);
        });
        */
    } catch (error) {
      console.error(error);
    } finally {
      console.log("Done");
      setIsLoading(false);
    }
  };

  async function onClose() {
    console.log("Modal has closed");

    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", "/users");
    }
  }

  async function onOk() {
    console.log("Ok was clicked");

    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", "/users");
    }
  }

  return (
    <main>
      <Dialog title="Login Error" onClose={onClose} onOk={onOk}>
        <p>{errMessage}</p>
      </Dialog>
      <form onSubmit={handleSubmit}>
        <div className="form-control w-full max-w-xs">&nbsp;</div>
        <div className="form-control w-full max-w-xs">
          <label htmlFor="email">Email:</label>
          <input
            className="input-sm input-bordered w-full max-w-xs"
            type="text"
            id="email"
            name="email"
            autoComplete="true"
            /* onChange={(event) => setEmail(event.target.value)} */
            required
          />
          {formError?.email && (
            <>
              {formError?.email?._errors.map((err) => (
                <p className="text-red-500 mb-2" key={err}>
                  {err}
                </p>
              ))}
            </>
          )}
        </div>
        <div className="form-control w-full max-w-xs">
          <label htmlFor="password">Password:</label>
          <input
            className="input-sm input-bordered w-full max-w-xs"
            type="password"
            id="password"
            name="password"
            autoComplete="true"
            /* onChange={(event) => setPassword(event.target.value)} */
            required
          />
          {formError?.password && (
            <>
              {formError?.password?._errors.map((err) => (
                <p className="text-red-500 mb-2" key={err}>
                  {err}
                </p>
              ))}
            </>
          )}
        </div>

        <div className="form-control w-full max-w-xs">&nbsp;</div>
        <div className="flex flex-row gap-3 justify-center items-center mt-5">
          <SubmitButton
            text={isLoading ? "Logging-in..." : "Submit"}
            disabled={isLoading}
          />
          <BackButton
            text={"Back to Main"}
            pendingText={""}
            backToMain={true}
          />
        </div>
      </form>
    </main>
  );
};

export default AdminLogin;
