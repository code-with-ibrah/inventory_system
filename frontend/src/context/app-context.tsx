import React, { createContext, useState } from "react";

// Define the type for your context
export interface AppContextType {
  headerItem?: any;
  setHeaderItem?: React.Dispatch<React.SetStateAction<any>>;
  filters: string [],
  setFilters?: React.Dispatch<React.SetStateAction<any>>
}

// Create the context
export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: any }) => {
  const [headerItem, setHeaderItem] = useState("");
  const [filters, setFilters] = useState<string []>([]);

  return (
    <AppContext.Provider value={{ headerItem, setHeaderItem, filters, setFilters }}>
      {children}
    </AppContext.Provider>
  );
};
