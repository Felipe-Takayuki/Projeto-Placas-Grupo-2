import { verify } from "jsonwebtoken";

export function verifyJWT(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];


    if (!token) {
        return res.status(401).json({ message: "Token não fornecido" });
  }

    verify(token, process.env.SECRET!, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token inválido" });
    }

    req.userId = decoded.userId;
    next();
  });
}
