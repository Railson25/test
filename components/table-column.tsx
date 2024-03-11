"use client";

import { ColumnDef } from "@tanstack/react-table";

import { ClientActions } from "./table-action";

export type ClientColumn = {
  id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
};

export const columns: ColumnDef<ClientColumn>[] = [
  {
    accessorKey: "name",
    header: "Client name",
  },
  {
    accessorKey: "address",
    header: "Client address",
  },
  {
    accessorKey: "email",
    header: "Client email",
  },
  {
    accessorKey: "phone",
    header: "Client phone",
  },
  {
    id: "actions",
    cell: ({ row }) => <ClientActions data={row.original} />,
  },
];
