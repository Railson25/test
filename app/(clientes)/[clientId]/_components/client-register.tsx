"use client";

import { Client, ClientForm } from "@/components/client-form";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export const ClientRegister = () => {
  const params = useParams();
  const [formattedClient, setFormattedClient] = useState<Client[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/client/${params.clientId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch client");
        }

        const client = await response.json();

        setFormattedClient(client);
      } catch (error) {
        console.error("Error fetching client:", error);
      }
    };
    fetchData();
  }, [params.clientId]);

  const clientToDisplay =
    formattedClient?.find(
      (client) => client.id === parseInt(params.clientId, 10)
    ) ?? null;

  return (
    <div>
      <ClientForm initialData={clientToDisplay} />
    </div>
  );
};
