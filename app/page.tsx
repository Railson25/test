import { UserData } from "@/components/user-data";
import { ClientContextProvider } from "@/context/client-context";

export default async function Enterprise() {
  return (
    <div className="h-full flex flex-col items-center px-5 ">
      <h1 className="text-2xl font-bold">Enterprise</h1>
      <ClientContextProvider>
        <UserData />
      </ClientContextProvider>
    </div>
  );
}
