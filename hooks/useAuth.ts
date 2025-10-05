import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { User } from "@/lib/types";
import { LoginInput, RegisterInput } from "@/lib/schemas";

export function useAuth() {
    const queryClient = useQueryClient();

    const { data: user, isLoading } = useQuery<User | null>({
        queryKey: ["auth", "user"],
        queryFn: async () => {
            try {
                return await api.get<User>("/api/auth/me");
            } catch {
                return null;
            }
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    const loginMutation = useMutation({
        mutationFn: (data: LoginInput) => api.post<User>("/api/auth/login", data),
        onSuccess: (userData) => {
            queryClient.setQueryData(["auth", "user"], userData);
        },
    });

    const registerMutation = useMutation({
        mutationFn: (data: RegisterInput) => api.post<User>("/api/auth/register", data),
        onSuccess: (userData) => {
            queryClient.setQueryData(["auth", "user"], userData);
        },
    });

    const logoutMutation = useMutation({
        mutationFn: () => api.post("/api/auth/logout"),
        onSuccess: () => {
            queryClient.setQueryData(["auth", "user"], null);
            queryClient.clear();
        },
    });

    return {
        user,
        isLoading,
        isAuthenticated: !!user,
        login: loginMutation.mutate,
        register: registerMutation.mutate,
        logout: logoutMutation.mutate,
        isLoginLoading: loginMutation.isPending,
        isRegisterLoading: registerMutation.isPending,
        loginError: loginMutation.error,
        registerError: registerMutation.error,
    };
}
