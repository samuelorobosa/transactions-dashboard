import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../lib/axios";
import type { User, Wallet, TransactionsResponse } from "../types/app";

export const useUser = () => {
  return useQuery<User>({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await apiClient.get("/user");
      return response.data;
    },
  });
};

export const useWallet = () => {
  return useQuery<Wallet>({
    queryKey: ["wallet"],
    queryFn: async () => {
      const response = await apiClient.get("/wallet");
      return response.data;
    },
  });
};

export const useTransactions = () => {
  return useQuery<TransactionsResponse>({
    queryKey: ["transactions"],
    queryFn: async () => {
      const response = await apiClient.get("/transactions");
      return response.data;
    },
  });
};
