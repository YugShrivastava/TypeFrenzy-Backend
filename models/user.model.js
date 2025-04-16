import { Schema, model } from "mongoose";
import { createHmac, randomBytes } from "crypto";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
    },
    avatar: {
        type: String,
        default: '/uploads/default/defaultAvatar.png'
    },
    stats: {
        gamesPlayed: { type: Number, default: 0 },
        averageWPM: { type: Number, default: 0 },
        bestWPM: { type: Number, default: 0 }
    },
}, { timestamps: true });

userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    try {
        const salt = randomBytes(16).toString();
        const hashedPassword = createHmac('sha256', salt).update(user.password).digest('hex');
    
        this.salt = salt;
        this.password = hashedPassword;
        return next();
    } catch (error) {
        console.log(error);
    }
})

userSchema.static('matchPassword', async function (username, password) {
    const user = await this.findOne({
        username
    });
    if (!user) return { error: true, message: 'User does not exist' };
    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHash = createHmac('sha256', salt).update(password).digest('hex');

    user.password = null;
    user.salt = null;

    if (userProvidedHash === hashedPassword) return {
        user: {...user._doc}
    }
    return {
        error: true,
        message: 'Incorrect password'
    }
})

const UserModel = model('user', userSchema);

export default UserModel