// frontend/src/app/providers/AuthProvider.jsx
import { createContext, useMemo } from 'react';
import {
  useCurrentUserQuery,
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
} from '../../features/auth/hooks/useAuthQueries.js';

export const AuthContext = createContext(undefined);

export default function AuthProvider({ children }) {
  const { data: user, isLoading, isError } = useCurrentUserQuery();

  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();
  const logoutMutation = useLogoutMutation();

  const value = useMemo(
    () => ({
      user: user ?? null,
      isAuthenticated: Boolean(user),
      isLoading,

      login: loginMutation.mutateAsync,
      isLoggingIn: loginMutation.isPending,
      loginError: loginMutation.error,

      register: registerMutation.mutateAsync,
      isRegistering: registerMutation.isPending,
      registerError: registerMutation.error,

      logout: logoutMutation.mutateAsync,
      isLoggingOut: logoutMutation.isPending,
    }),
    [
      user,
      isLoading,
      loginMutation.mutateAsync,
      loginMutation.isPending,
      loginMutation.error,
      registerMutation.mutateAsync,
      registerMutation.isPending,
      registerMutation.error,
      logoutMutation.mutateAsync,
      logoutMutation.isPending,
    ]
  );

  void isError;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}