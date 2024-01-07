const User = require('../models/User')

// Malware to check the user type
module.exports.checkType = function (requiredRole) {
    return async (req, res, next) => {
        // console.log("testingCheckType", req.user.id)

        User.findById(req.user.id)
        .then((user)=> { 
            // console.log("CheckType", user.userType)
            
            if(requiredRole >= user.userType){
                next();
            }else{
                res.status(403).json({ message: 'User Not allowed' });
            }  
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        })
    }
}


