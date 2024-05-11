import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Not Authenticated!" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (error, payload) => {
    if (error) {
      return res.status(403).json({ error: "Token is not valid!" });
    }
    req.userId = payload.id;

    next();
  });
}