import { useState, useCallback } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error";
}

export const useToast = () => {
  const [toast, setToast] = useState<ToastProps | null>(null);

  const showToast = useCallback(
    (message: string, type: "success" | "error") => {
      setToast({ message, type });
      setTimeout(() => setToast(null), 3000);
    },
    []
  );

  return { toast, showToast };
};

export const Toast: React.FC<{ toast: ToastProps | null }> = ({ toast }) => {
  if (!toast) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-md ${
        toast.type === "success" ? "bg-green-500" : "bg-red-500"
      } text-white`}
    >
      {toast.message}
    </div>
  );
};
