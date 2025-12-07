import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useUser, useWallet, useTransactions } from "../revenue.queries";
import { apiClient } from "../../lib/axios";
import { mockUser, mockWallet, mockTransactions } from "../../test/mockData";

vi.mock("../../lib/axios", () => ({
  apiClient: {
    get: vi.fn(),
  },
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe("useUser", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch user data successfully", async () => {
    vi.mocked(apiClient.get).mockResolvedValueOnce({
      data: mockUser,
    });

    const { result } = renderHook(() => useUser(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockUser);
    expect(apiClient.get).toHaveBeenCalledWith("/user");
  });

  it("should handle error state", async () => {
    vi.mocked(apiClient.get).mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useUser(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
  });
});

describe("useWallet", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch wallet data successfully", async () => {
    vi.mocked(apiClient.get).mockResolvedValueOnce({
      data: mockWallet,
    });

    const { result } = renderHook(() => useWallet(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockWallet);
    expect(apiClient.get).toHaveBeenCalledWith("/wallet");
  });

  it("should handle error state", async () => {
    vi.mocked(apiClient.get).mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useWallet(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
  });
});

describe("useTransactions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch transactions data successfully", async () => {
    vi.mocked(apiClient.get).mockResolvedValueOnce({
      data: mockTransactions,
    });

    const { result } = renderHook(() => useTransactions(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockTransactions);
    expect(apiClient.get).toHaveBeenCalledWith("/transactions");
  });

  it("should handle error state", async () => {
    vi.mocked(apiClient.get).mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useTransactions(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
  });
});
