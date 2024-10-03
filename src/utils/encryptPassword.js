import bcrypt from "bcrypt";

export const encryptPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (password, encryptPassword) => {
  const isMatchPassword = await bcrypt.compare(password, encryptPassword);
  if (isMatchPassword) {
    return true;
  }
  return false;
};
