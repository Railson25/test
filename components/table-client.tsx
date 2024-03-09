"use client";

import { Separator } from "@/components/ui/separator";

import { DataTable } from "./data-table";

import { ClientColumn, columns } from "./table-column";

interface TableClientProps {
  data: ClientColumn[];
}

export const TableClient = ({ data }: TableClientProps) => {
  return (
    <>
      <h2 className="font-bold text-3xl text-center mb-10">List of clients</h2>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
    </>
  );
};
