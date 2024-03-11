"use client";

import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  address: z.string().min(1, {
    message: "Address is required",
  }),
});

export interface Client {
  id: number;
  name: string;
  address: string;
  created_at: string;
  updated_at: string;
}

export type ClientOrNull = Client | null;

export type RegisterValues = z.infer<typeof formSchema>;

export const ClientForm = ({ initialData }: { initialData: ClientOrNull }) => {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      address: "",
    },
  });

  const action = initialData ? "Save changes" : "Register";
  console.log("aaaaaaaaaa", initialData);

  const onSubmit = async (data: RegisterValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/client/${String(params.clientId)}`, data);
        toast.success("Client updated");
      } else {
        await axios.post(`/api/client`, form.getValues());
        toast.success("Client created");
      }
      router.push(`/`);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" gap-10 flex flex-col w-1/2 max-md:w-full">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Register Client</h2>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client Name</FormLabel>
                <FormControl>
                  <Input placeholder="Client Name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client address</FormLabel>
                <FormControl>
                  <Input placeholder="Client Address" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading}>
            {action}
          </Button>
        </form>
      </Form>
    </div>
  );
};
