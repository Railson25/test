"use client";

import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  address: z.string().min(1, {
    message: "Address is required",
  }),
  email: z.string().min(1, {
    message: "Email is required",
  }),
  phone: z.string().min(1, {
    message: "Phone is required",
  }),
});

export interface Client {
  id: number;
  name: string;
  address: string;
  email: string;
  phone: string;
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
      email: "",
      phone: "",
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

  useEffect(() => {
    if (initialData) {
      Object.keys(initialData).forEach((key) => {
        form.setValue(
          key as keyof RegisterValues,
          initialData[key as keyof RegisterValues]
        );
      });
    }
  }, [initialData, form]);

  return (
    <div className=" gap-10 flex flex-col ">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Register Client</h2>
        <Button
          variant="link"
          onClick={() => router.push("/")}
          className="font-bold text-"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Voltar
        </Button>
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
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client Phone</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="Client Phone" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Client Email" {...field} />
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
