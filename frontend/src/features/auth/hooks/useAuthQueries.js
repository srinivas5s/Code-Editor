import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
} from '../services/auth.service.js';

export const AUTH_QUERY_KEY = ['auth', 'me'];

export function useCurrentUserQuery() {
    return useQuery({
        queryKey: AUTH_QUERY_KEY,
        queryFn: getCurrentUser,
        retry: false, // don't retry on 401 — it just means "not logged in"
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}

export function useRegisterMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: registerUser,
        onSuccess: (user) => {
            queryClient.setQueryData(AUTH_QUERY_KEY, user);
        },
    });
}

export function useLoginMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: loginUser,
        onSuccess: (user) => {
            queryClient.setQueryData(AUTH_QUERY_KEY, user);
        },
    });
}

export function useLogoutMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            queryClient.setQueryData(AUTH_QUERY_KEY, null);
        },
    });
}