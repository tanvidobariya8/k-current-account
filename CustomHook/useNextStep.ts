import API from "@/Api/masterServices";
import { useState } from "react";

export const useNextStep = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any | null>(null);

  const nextStep = async (requestData: any): Promise<any> => {
    setLoading(true);
    setError(null); // Reset error state before a new call
    try {
      const response = await API.post(
        "http://localhost:8081/api/current-account/next-step",
        requestData,
        { headers: { "Content-Type": "application/json" } }
      );
      setData(response.data);
      return response.data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { nextStep, loading, error, data };
};
