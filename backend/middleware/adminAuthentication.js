import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const adminAuthenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Please Login",
    });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decode;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

export default adminAuthenticate;
