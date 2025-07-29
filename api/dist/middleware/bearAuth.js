import jwt from "jsonwebtoken";
import "dotenv/config";
// Impelementing a middleware to check user roles
export const checkRoles = (requiredRole) => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const token = authHeader.split(" ")[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            // check for roles
            if (typeof decoded === "object" &&
                decoded !== null &&
                "role" in decoded) {
                if (requiredRole === "both") {
                    if (decoded.role === "admin" || decoded.role === "user") { // if the decoded role is admin or user, then allow access
                        next();
                        return;
                    }
                } // if the required role is both, then allow access to admin and user
                else if (decoded.role === requiredRole) { // if the decoded role is the same as the required role, then allow access
                    next();
                    return;
                }
                res.status(401).json({ message: "Unauthorized" });
                return;
            }
            else { //happens when the decoded token is not an object or does not have a role property
                res.status(401).json({ message: "Invalid Token Payload" });
                return;
            }
        }
        catch (error) {
            res.status(401).json({ message: "Invalid Token" });
            return;
        }
    };
};
export const adminRoleAuth = checkRoles("admin");
export const userRoleAuth = checkRoles("user");
export const bothRoleAuth = checkRoles("both");
