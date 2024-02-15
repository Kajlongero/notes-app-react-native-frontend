const initialState = {
  auth: {
    email: "",
    password: "",
    username: "",
    hasSession: false,
  },
  user: {
    id: "",
    email: "",
    username: "",
    createdAt: "",
  },
  typeError: {
    email: false,
    password: false,
    username: false,
  },
};

export const useAuthSlice = (setState, get) => ({
  auth: {
    email: "",
    password: "",
    username: "",
    hasSession: false,
  },
  user: {
    id: "",
    email: "",
    username: "",
    createdAt: "",
  },
  typeError: {
    email: false,
    password: false,
    username: false,
  },
  /* SingleUpdaters */
  handleAuthEmail: (email) =>
    setState((state) => ({
      auth: { ...state.auth, email },
      typeError: { ...state.typeError, email: false },
    })),
  handleAuthPassword: (password) =>
    setState((state) => ({
      auth: { ...state.auth, password },
      typeError: { ...state.typeError, password: false },
    })),
  handleAuthUsername: (username) =>
    setState((state) => ({
      auth: { ...state.auth, username },
      typeError: { ...state.typeError, username: false },
    })),
  handleAuthSession: (boolean) =>
    setState((state) => ({ auth: { ...state.auth, hasSession: boolean } })),

  handleEmailType: (boolean) =>
    setState((state) => ({
      typeError: { ...state.typeError, email: boolean },
    })),
  handlePasswordType: (boolean) =>
    setState((state) => ({
      typeError: { ...state.typeError, password: boolean },
    })),
  handleUsernameType: (boolean) =>
    setState((state) => ({
      typeError: { ...state.typeError, username: boolean },
    })),

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
      },
    })),
  clearUser: () =>
    setState((state) => ({
      user: {
        ...state.user,
        email: "",
        username: "",
        createdAt: "",
        updatedAt: "",
      },
    })),
  clearTypeError: () =>
    setState((state) => ({
      typeError: {
        ...state.typeError,
        email: false,
        password: false,
        username: false,
      },
    })),

  clearAuthSlice: () =>
    setState((state) => ({
      ...state,
      ...initialState,
    })),
});
