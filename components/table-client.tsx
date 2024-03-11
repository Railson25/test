"use client";

import { Separator } from "@/components/ui/separator";

import { DataTable } from "./data-table";

import { ClientColumn, columns } from "./table-column";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

interface TableClientProps {
  data: ClientColumn[];
}

export const TableClient = ({ data }: TableClientProps) => {
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-3xl text-center mb-10">
          List of clients
        </h2>
        <Button onClick={() => router.push("/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Register client
        </Button>
      </div>

      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
    </>
  );
};
