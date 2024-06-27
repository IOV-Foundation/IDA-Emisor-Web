import React, {createContext, ReactNode, useContext, useState} from "react";
import {Snackbar, SnackbarOrigin} from "@mui/material";

type SnackbarContextType = {
  showSnackbar: (message: string) => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const vertical: SnackbarOrigin['vertical'] = 'top';
  const horizontal: SnackbarOrigin['horizontal'] = 'center';

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        autoHideDuration={6000}
        anchorOrigin={{ vertical, horizontal }}
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        key={vertical + horizontal}
      />
    </SnackbarContext.Provider>
  );
};
