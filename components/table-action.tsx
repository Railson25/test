"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useState } from "react";

import { ClientColumn } from "./table-column";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useClientContext } from "@/context/client-context";

interface ClientActionsProps {
  data: ClientColumn;
}

export const ClientActions = ({ data }: ClientActionsProps) => {
  const { setIsEditing, setClientIdToUpdate } = useClientContext();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onUpdate = () => {
    setIsEditing(true);
    setClientIdToUpdate(data.id);
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/client/${data.id}`);
      router.refresh();
      toast.success("Client deleted");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => router.push(`/`)}>
            <Edit className="mr-2 h-4 w-4" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onUpdate}>
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
