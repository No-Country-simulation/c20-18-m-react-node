const bcrypt = require("bcrypt")

const salt_rounds = 10

exports.hashPassword = async (password) => {
    return await bcrypt.hash(password, salt_rounds)
}

exports.comparePasswords = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword)
}

module.exports = exports