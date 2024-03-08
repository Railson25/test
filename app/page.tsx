import { ClientForm } from "@/components/client-form";

export default function Enterprise() {
  return (
    <div className="h-full flex flex-col items-center px-5 ">
      <h1 className="text-2xl font-bold">Enterprise</h1>
      <div className="self-start  pt-14">
        <ClientForm />
      </div>
    </div>
  );
}
