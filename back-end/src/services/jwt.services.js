import jwt  from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET

export const generarToken = (datos) => {
    return jwt.sign({id: datos.id, email: datos.email, role: datos.role}, JWT_SECRET, {expiresIn: "2h"})
}