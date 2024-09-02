import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();
import path from "path"
import fs from "fs"
import { comparePasswords } from "../services/password.services"
import jwt from "jsonwebtoken"

const private_key = process.env.JWT_SECRET


export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!(email || password))
    return res.status(500).json({ message: "One or more fields are missing" });

  try {
    // Log the request payload for debugging

    console.log(`Request payload: ${JSON.stringify(req.body)}`);

    const credentials = await prisma.usuario.findUnique({
      where: { email: email },
    });

    console.log(`User found: ${JSON.stringify(credentials)}`); // Added JSON.stringify for better visibility

    const validPassword =
      credentials === null
        ? false
        : await comparePasswords(password, credentials.password);

    if (!(credentials && validPassword))
      return res
        .status(401)
        .json({ Error: "unauthorized.", message: "email or password invalid" });

    const userForToken = {
      username: credentials.email,
      id: credentials._id,
      role: credentials.role,
    };

    const token = jwt.sign(userForToken, private_key, {
      expiresIn: "2h",
      algorithm: "HS256",
    });

    res.status(200).json({
      token,
      username: credentials.email,
      id: credentials.id,
      role: credentials.role,
    });
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
};

module.exports = exports;
