const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
module.exports = (req, res, next) => {
    try {
        const auth_header = req.header('Authorization')
        if (!auth_header) return res.status(402).send('Access denied.')
        const token = auth_header.split(' ')[1]
        if (!token) {
            return res.status(403).send('Access denied.')
        }
        dotenv.config();
        const decoded = jwt.verify(token, process.env.NODE_CLIENT_SECRET) // tokeni asiligini tekshirish
        if (!decoded.user_id) {
            return res.status(401).json({message:"Ro'yxatdan o'tilmagan"})
        }
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({message:"Ro'yxatdan o'tilmagan"})
    }
}