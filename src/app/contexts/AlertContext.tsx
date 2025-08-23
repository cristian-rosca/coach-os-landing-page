"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Alert } from "../shared/Alert";

export interface AlertData {
  id: number;
  title: string;
  message: string;
  variant: "success" | "error" | "warn";
  timeout?: number;
}

const AlertContext = createContext<{
  showAlert: (data: AlertData) => void;
  showErrorAlert: (message: string) => void;
  showSuccessAlert: (message: string) => void;
  showWarnAlert: (message: string) => void;
  hideAlert: (id: number) => void;
} | null>(null);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (context === null) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};

interface AlertProviderProps {
  children: ReactNode;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [alerts, setAlerts] = useState<AlertData[]>([]);

  const showAlert = (data: AlertData) => {
    setAlerts((prevAlerts) => [...prevAlerts, data]);
  };

  const showErrorAlert = (message: string) => {
    showAlert({
      message,
      variant: "error",
      id: Math.random(),
      title: "Error",
    });
  };

  const showSuccessAlert = (message: string) => {
    showAlert({
      message,
      variant: "success",
      id: Math.random(),
      title: "Success",
    });
  };

  const showWarnAlert = (message: string) => {
    showAlert({
      message,
      variant: "warn",
      id: Math.random(),
      title: "Warning",
    });
  }

  const hideAlert = (id: number) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
  };

  return (
    <AlertContext.Provider
      value={{ showAlert, showErrorAlert, showSuccessAlert, showWarnAlert, hideAlert }}
    >
      {children}
      {alerts.map((alertData) => (
        <Alert
          key={alertData.id}
          isVisible={true}
          title={alertData.title}
          message={alertData.message}
          variant={alertData.variant}
          timeout={alertData.timeout}
          id={alertData.id}
        />
      ))}
    </AlertContext.Provider>
  );
};
