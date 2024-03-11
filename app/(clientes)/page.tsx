import { User } from "@/components/user";

async function Enterprise() {
  return (
    <div className="h-full flex flex-col items-center px-5 ">
      <h1 className="text-2xl font-bold pb-10">Enterprise</h1>

      <User />
    </div>
  );
}

export default Enterprise;
