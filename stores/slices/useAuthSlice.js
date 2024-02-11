export const useAuthSlice = (setState, get) => ({
  auth: {
    email: "",
    password: "",
    username: "",
    token: "",
  },
  user: {
    id: "",
    email: "",
    username: "",
    createdAt: "",
  },
  /* SingleUpdaters */
  handleAuthEmail: (email) =>
    setState((state) => ({ auth: { ...state.auth, email } })),
  handleAuthPassword: (password) =>
    setState((state) => ({ auth: { ...state.auth, password } })),
  handleAuthUsername: (username) =>
    setState((state) => ({ auth: { ...state.auth, username } })),
  handleAuthToken: (token) =>
    setState((state) => ({ auth: { ...state.auth, token } })),

  /* MultipleUpdaters */
  updateUser: (user) => setState(() => ({ user: { ...user } })),

  /* Cleaners */
  clearAuth: () =>
    setState((state) => ({
      auth: {
        ...state.auth,
        email: "",
        password: "",
        username: "",
        token: "",
      },
    })),
  clearUser: () =>
    setState(() => ({
      user: {
        ...state.user,
        email: "",
        username: "",
        createdAt: "",
        updatedAt: "",
      },
    })),
});
