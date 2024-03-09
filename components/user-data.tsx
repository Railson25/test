import { ClientForm } from "./client-form";
import { User } from "./user";

export const UserData = () => {
  return (
    <div className="self-start w-full pt-14 flex gap-x-14 max-md:flex-col max-md:gap-y-10">
      <ClientForm />
      <User />
    </div>
  );
};
