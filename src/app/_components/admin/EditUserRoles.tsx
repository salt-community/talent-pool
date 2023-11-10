"use client";
import { api } from "@/trpc/react";
import type { RouterOutputs } from "@/trpc/shared";
import { zRole, type tRole } from "@/utils/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type Users = RouterOutputs["users"]["getAll"][number];
type Props = { user: Users };
const EditUserRole = ({ user }: Props) => {
  const utils = api.useContext();
  const { mutate: update } = api.users.changeRole.useMutation({
    onSuccess: () => utils.users.getAll.invalidate(),
  });
  const {
    handleSubmit,
    register,
    formState: { isDirty },
  } = useForm<tRole>({
    resolver: zodResolver(zRole),
    defaultValues: { role: user.role },
  });
  return (
    <li className="flex border">
      <p>{user.email}</p>
      <form
        onSubmit={(event) =>
          void handleSubmit(({ role }) =>
            update({ id: user.id, zRole: { role } }),
          )(event)
        }
      >
        <select {...register("role")}>
          <option>SALTIE</option>
          <option>CLIENT</option>
          <option>ADMIN</option>
        </select>
        {isDirty && <button>Save</button>}
      </form>
    </li>
  );
};

export default EditUserRole;