const authMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  console.log(action.type);
  if (
    !action.type.startsWith("auth/user/") &&
    action.type?.startsWith("auth/")
  ) {
    const authState = store.getState().auth;
    // Client side local storage
    if (typeof window !== "undefined") {
      localStorage.setItem("auth", JSON.stringify(authState));
    }
  }
  return result;
};

export default authMiddleware;
