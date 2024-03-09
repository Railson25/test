"use client";

import { ColumnDef } from "@tanstack/react-table";

import { ClientActions } from "./table-action";

export type ClientColumn = {
  id: string;
  name: string;
  address: string;
};

export const columns: ColumnDef<ClientColumn>[] = [
  {
    accessorKey: "name",
    header: "Client Name",
  },
  {
    accessorKey: "address",
    header: "Client address",
  },
  {
    accessorKey: "id",
    header: "Client Id",
  },
  {
    id: "actions",
    cell: ({ row }) => <ClientActions data={row.original} />,
  },
];
