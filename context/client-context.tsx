"use client";
import React, { createContext, useContext, useState } from "react";

interface EditContextType {
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  clientIdToUpdate: string;
  setClientIdToUpdate: (clientId: string) => void;
}

const ClientContext = createContext<EditContextType | undefined>(undefined);

export const useClientContext = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error(
      "useEditContext must be used within an EditContextProvider"
    );
  }
  return context;
};

export const ClientContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [clientIdToUpdate, setClientIdToUpdate] = useState("");

  return (
    <ClientContext.Provider
      value={{
        isEditing,
        setIsEditing,
        clientIdToUpdate,
        setClientIdToUpdate,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};
