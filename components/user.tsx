"use client";

import { useEffect, useState } from "react";
import { TableClient } from "./table-client";
import { ClientColumn } from "./table-column";

export const User = () => {
  const [formattedClient, setFormattedClient] = useState<ClientColumn[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/client");

        if (!response.ok) {
          throw new Error("Failed to fetch client");
        }

        const client = await response.json();

        const formattedClient: ClientColumn[] = client?.map(
          (item: ClientColumn) => ({
            id: item.id,
            name: item.name,
            address: item.address,
          })
        );

        setFormattedClient(formattedClient);
      } catch (error) {
        console.error("Error fetching client:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full">
      <TableClient data={formattedClient} />
    </div>
  );
};
