// user.js - User Schema and Model (same as previous response)

// middleware.js - Role-based Middleware
const checkUserRole = (allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.user?.role; // Assuming you attach user data to the request object after authentication
        if (allowedRoles.includes(userRole)) {
            // User has the required role, grant access to the route
            next();
        } else {
            // User does not have the required role, deny access
            res.status(403).json({ error: 'Access denied' });
        }
    };
};

module.exports = checkUserRole;
