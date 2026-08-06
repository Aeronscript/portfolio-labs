export function useAuth() {
  return {
    isLoading: false,
    isAuthenticated: true,
    user: { name: "User" },
    signIn: async (...args: unknown[]) => {
      void args;
    },
    signOut: async () => {},
  };
}
