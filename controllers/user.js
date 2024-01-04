
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Number of rounds to do hashing more number means more security (Rounds to be crypted to be more deficult to be hacked)
salt = 10;

// RESTFUL API's for Registration and Authentication

exports.user_signup_post = (req, res) => {
    let user = new User(req.body);

    let hash = bcrypt.hashSync(req.body.password, salt);
    console.log(hash);

    user.password = hash;

    user.save()
    .then(()=> {
        res.json({"message": "User Created Successfully!!!" })
    })
    .catch((err) => {
        res.json({"message": err.message})
    })
}

exports.user_signin_post = async (req, res) => {
    let {identifier, password} = req.body;
    console.log(identifier);

    try {

        // Find the user by emailAddress or username
        let user = await User.findOne({
            $or: [
                { emailAddress: identifier},
                { username: identifier}
            ]
        });

        // let user = await User.findOne({emailAddress})
        // console.log(user);


        if(!user) {
            return res.json({"message": "User not found!!!"}).status(400)
        }

        // Password Comparison
        const isMatched = await bcrypt.compareSync(password, user.password);
        console.log(password);
        console.log(user.password);

        if(!isMatched) {
            return res.json({"message": "Password Not Matched!!"}).status(400)
        }

        // Generate JWT
        const payload = {
            user: {
                id: user._id
            }
        }
  
      jwt.sign(
        payload,
        process.env.SECRET,
        {expiresIn: 36000000},
        (err, token) => {
          if (err) throw err;
          res.json({token}).status(200)
        }
      )

    }
    catch(err) {
        console.log(err);
        res.json({"message": "You are not LoggedIn"}).status(401)
    }
}

exports.user_show_get = (req, res) => {
    User.findById(req.query.id)
    .then((user)=> {
        user.password = null;
        res.json({user})
    })
    .catch((err) => {
        console.log(err);
    })
}

exports.user_index_get = (req, res) => {
    User.find()
    .then((users) => {
        res.json({users})
    })
    .catch(err => {
        console.log(err);
    })
}

exports.user_delete_get = (req, res) => {
    User.findByIdAndDelete(req.query.id)
    .then((user) => {
        res.json({user})
    })
    .catch(err => {
        console.log(err);
    })
}


exports.user_edit_get = (req, res) => {
    User.findById(req.query.id)
    .then((user) => {
        res.json({user})
    })
    .catch(err => {
        console.log(err);
    })
}

exports.user_update_put = (req, res) => {
    console.log(req.body._id);
    // console.log(req.body)
    const userData = req.body;

    User.findById(userData._id)
    .then((userToUpdate) => {

        if (userData.password !== null && userData.password !== undefined) {
            const hashedPassword = bcrypt.hashSync(userData.password, salt);
            userData.password = hashedPassword;
        } else {
            // If the password is not provided, use the existing hashed password
            userData.password = userToUpdate.password;
        }

        User.findByIdAndUpdate(req.body._id, userData, {new: true})
        .then((user) => {
            res.json({user})
        })
        .catch((err) => {
            console.log(err);
        })
    })
    .catch((err) => {
        console.log(err);
    })

}


exports.user_mycourses_get = (req, res) => {
    const userId = req.params.userId;
  
    User.findById(req.user.id)
      .populate('enrolledCourses')
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ enrolledCourses: user.enrolledCourses });
      })
      .catch((error) => {
        console.error('Error fetching enrolled courses:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      });
};