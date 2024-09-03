import jwt  from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET

export const generarToken = (datos) => {
    return jwt.sign({id: datos.id, email: datos.email, role: datos.role}, JWT_SECRET, {expiresIn: "2h"})
}

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    if(!token) return res.status(401).json({ error: "Token no valido/No autorizado"})
    
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if(err) return res.status(401).json({ error: "Token no valido/No autorizado"})
        const { id, email, role } = decoded
        req.data = { id, email, role }
    })

    next()
}