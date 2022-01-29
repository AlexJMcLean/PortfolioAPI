import User from "../models/user.js";

const findUserRole = async (id) => {
  const user = await User.findOne({ _id: id });
  const role = user.role;
  return role;
};

export default findUserRole;
