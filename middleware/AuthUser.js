export const authUser = (req, res, next) => {
  const token = req.cookies.token;
  console.log("Token", req.cookies["token"]);

  if (token) {
    next();
  }
};
