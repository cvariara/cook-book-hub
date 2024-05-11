import jwt from "jsonwebtoken";

export const shouldBeLoggedIn = async (req, res) => {
  console.log(userId);

  res.status(200).json({ message: "You are Authenticated!" });
};

export const shouldBeAdmin = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Not Authenticated!" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (error, payload) => {
    if (error) {
      return res.status(403).json({ error: "Token is not valid!" });
    }
    if (!payload.isAdmin) {
      return res.status(403).json({ error: "Not authorized!" });
    }
  });

  res.status(200).json({ message: "You are Authenticated!" });
};
