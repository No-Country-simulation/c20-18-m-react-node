import bcrypt from "bcrypt"

const salt_rounds = 10

export const hashPassword = async (password) => {
    return await bcrypt.hash(password, salt_rounds)
}

export const comparePasswords = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword)
}