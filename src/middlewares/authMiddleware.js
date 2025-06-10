import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export function authenticate (req, res, next) {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({error : 'No token provided 1'});
    }

    if(!authHeader.startsWith('Bearer ')){
        return res.status(401).json({error : 'No token provided 2'})
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if(!decoded.id) return res.status(401).json({error : 'Invalid token payload(missing ID)'})
        req.user = {id : decoded.id};
        next();
    } catch (error) {
        return res.status(401).json({error : 'Invalid or expired token'})
    }
};