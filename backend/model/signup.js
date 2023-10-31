const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your-secret-key'; // Replace with your actual secret key

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    phone: String,
    company: String,
    state: String,
    city: String,
    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ]
});

userSchema.methods.generateAuthtoken = async function () {
    try {
        const newToken = jwt.sign({ _id: this._id }, SECRET_KEY, {
            expiresIn: "1d"
        });

        this.tokens = this.tokens.concat({ token: newToken });
        await this.save();
        return newToken;
    } catch (error) {
        // Instead of using res.status, throw an exception
        throw error;
    }
}

const usersignup = mongoose.model('users', userSchema);

module.exports = usersignup;
