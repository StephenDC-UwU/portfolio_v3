"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "@/components/ui/sonner";
import { useLanguage } from "@/context/LanguageContext";
import { contactFormApi } from "../api/contactFormApi";

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface UseContactFormOptions {
  apiEndpoint?: string;
  onSuccess?: (data?: unknown) => void;
  onError?: (error?: unknown) => void;
}

export function useContactForm(options?: UseContactFormOptions) {
  const { lang } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const sendMessage = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const response = await contactFormApi.post("/", data);

      setIsSent(true);

      const title = lang === "en" ? "Message Dispatched" : "Mensaje Enviado";
      const description =
        lang === "en"
          ? "Thank you for reaching out. Your message has been received."
          : "Gracias por escribir. Tu mensaje ha sido recibido con éxito.";

      toast.success(title, {
        description,
      });

      options?.onSuccess?.(response.data);

      setTimeout(() => {
        setIsSent(false);
      }, 5000);

      return { success: true, data: response.data };
    } catch (err: unknown) {
      console.error("Error sending contact message via Axios:", err);

      let errorMessage =
        lang === "en"
          ? "Could not send the message. Please verify your connection or try again later."
          : "No se pudo enviar el mensaje. Revisa tu conexión o intenta más tarde.";

      if (axios.isAxiosError(err)) {
        if (err.response?.data?.message) {
          errorMessage = String(err.response.data.message);
        } else if (err.code === "ECONNABORTED") {
          errorMessage =
            lang === "en"
              ? "Request timed out. Please try again."
              : "La solicitud tardó demasiado. Por favor intenta de nuevo.";
        }
      }

      toast.error(lang === "en" ? "Transmission Error" : "Error en el Envío", {
        description: errorMessage,
      });

      options?.onError?.(err);

      return { success: false, error: err };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    sendMessage,
    isSubmitting,
    isSent,
    setIsSent,
  };
}
