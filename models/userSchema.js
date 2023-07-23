const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const keysecret = process.env.KEYSECRATE;

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Not valid email")
            }
        }
    },
    password: {
        type: String,
        required: true,
        minimumlength: 6,

    },
    cpassword: {
        type: String,
        required: true,
        minimumlength: 6,
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
});




// hash password

userSchema.pre("save", async function(next) {
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password,12); // 12 is number of round
        this.cpassword = await bcrypt.hash(this.cpassword,12); // 12 is number of round
    }
    next();
}); // before colling save method of mongodb we will hash out password


// token generate

userSchema.methods.generateAuthtoken = async function() {
    try {
        let token2 = jwt.sign({_id:this._id},keysecret,{
            expiresIn:"1d"
        });
        this.tokens = this.tokens.concat({token:token2});
        await this.save();
        return token2;
    } catch (error) {
        res.status(402).json(error);
    }
}


// Creating model 
const userdb = new mongoose.model("users",userSchema);

module.exports = userdb;