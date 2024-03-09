"use client";

import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  address: z.string().min(1, {
    message: "Address is required",
  }),
});

type RegisterValues = z.infer<typeof formSchema>;

export const ClientForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
    },
  });

  const onSubmit = async (data: RegisterValues) => {
    try {
      const response = await fetch("/api/client", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create client");
      }

      alert("Client created successfully");
    } catch (error) {
      console.error("Error creating client:", error);
      alert("Failed to create client. Please try again.");
    }
  };

  return (
    <div className="py-2 pb-4 gap-10 flex flex-col">
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
          <Button type="submit">Register</Button>
        </form>
      </Form>
    </div>
  );
};
