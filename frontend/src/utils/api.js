export const loginUser = async (email, password) => {
  return { username: "testUser", email };
};

export const signupUser = async (username, email, password) => {
  return { username, email };
};
