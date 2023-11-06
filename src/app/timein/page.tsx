"use client";

//import { Account, Category, Transaction, TransactionType } from '@prisma/client'
import ActionFormButton from "./components/FormSubmitBtn";
import { experimental_useFormState as useFormState } from "react-dom";
//import { ActionResult } from "@/utils/action";
//import ActionFormAlert from "./ActionFormAlert";
import { useRouter } from "next/navigation";

type ActionFormProps = {
  actionHandler: (_: ActionResult, formData: FormData) => Promise<ActionResult>;
  data?: Transaction | null;
  users: Account[];
  logtypes: Category[];
};

const UserTimeIn = ({
  actionHandler,
  data,
  users,
  logtypes,
}: ActionFormProps) => {
  const router = useRouter();

  const [formState, dispatchActionHandler] = useFormState(actionHandler, {
    success: null,
    message: null,
  });

  if (formState?.success) {
    setTimeout(() => {
      router.push("/");
    }, 1000);
  }

  return (
    <form action={dispatchActionHandler} className="flex flex-col gap-3 mt-4">
      {/* If edit add hidden input ID */}
      {data && <input type="hidden" name="id" defaultValue={data?.id} />}

      {/* Name */}
      <div className="flex flex-row gap-3">
        <label htmlFor="name" className="basis-1/4 text-sm py-1">
          Name
        </label>
        <select name="name" id="name" className="flex-1 border text-sm px-2">
          <option value="">-- Select Name --</option>
          {users &&
            users.map((user) => (
              <option
                key={user.id}
                value={user.id}
                selected={user.id == data?.accountId}
              >
                {user.name}
              </option>
            ))}
        </select>
      </div>

      {/* Pass */}
      <div className="flex flex-row gap-3">
        <label htmlFor="password" className="basis-1/4 text-sm py-1">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="flex-1 border text-sm px-2"
          defaultValue="[Type Anything]"
          placeholder="[Type Anything]"
        />
      </div>
      {/* In/Out */}
      <div className="flex flex-row gap-3">
        <label htmlFor="logtype" className="basis-1/4 text-sm py-1">
          In/Out
        </label>
        <select
          name="logtype"
          id="logtype"
          className="flex-1 border text-sm px-2"
        >
          <option value="">...</option>
          {logtypes &&
            logtypes.map((logtype) => (
              <option
                key={logtype.id}
                value={logtype.id}
                selected={logtype.id == data?.categoryId}
              >
                {logtype.name}
              </option>
            ))}
        </select>
      </div>

      {/* Date that expense happen */}
      <div className="flex flex-row gap-3">
        <label htmlFor="date" className="basis-1/4 text-sm py-1">
          Date
        </label>
        {!data ? (
          <input
            type="date"
            id="date"
            name="date"
            className="flex-1 border px-2 text-sm"
            defaultValue={new Date().toISOString().split("T")[0]}
            required
          />
        ) : (
          <input
            type="date"
            id="date"
            name="date"
            className="flex-1 border px-2 text-sm"
            defaultValue={data?.date.toISOString().split("T")[0]}
            required
          />
        )}
      </div>
      {/* Notes */}
      <div className="flex flex-row gap-3">
        <label htmlFor="notes" className="basis-1/4 text-sm py-1">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          className="flex-1 border text-sm px-2"
          defaultValue={data?.notes}
          placeholder="Notes"
        ></textarea>
      </div>

      {/* Submit button */}
      <div className="flex flex-row gap-3 justify-center items-center mt-5">
        <FormSubmitBtn text={"Save"} pendingText={"Saving..."} />
      </div>
      {/*
      <ActionFormAlert {...formState} />
        */}
    </form>
  );
};

export default UserTimeIn;
