const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please tell us your name!!!"],
    },
    mobile: {
        type: String,
        required: [true, "Please tell us your mobile number!!!"],
    },
    email: {
        type: String,
    },
    image: String,
    balance:{
      type: Number,
      default: 0
    },
    role: {
        type: String,
        enum: ['super_admin', 'admin', 'staff', 'user'],
        default: "user",
    },
    password: {
        type: String,
        minlength: 4,
        select: false,
    },
    passwordConfirm: {
        type: String,
    },
    token: { type: String },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordRestExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false,
    },
    agreeToTerms: {
        type: Boolean,
        default:true,
        select: false
    },
    age:{
        type: Number,
        default: 0
    },
    hobby:{
        type: String,
        default: ''
    },
    gender:{
        type: String,
        default: 'male'
    },
    address:{
        type: String,
        default: ''
    }
},
    {
        timestamps: true,
    });

userSchema.pre("save", async function (next) {
    //Only run this function if password was actually modified
    if (!this.isModified("password")) return next();
    //Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    //Delete passwordConfirm field

    this.passwordConfirm = undefined;
    next();
});

userSchema.pre("save", function (next) {
    if (!this.isModified("password") || this.isNew) {
        this.passwordChangedAt = Date.now() - 1000;
    }
    next();
});

userSchema.pre(/^find/, function (next) {
    this.find({ active: { $ne: false } });
    next();
});
userSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "guides",
//     select: "-__v -passwordChangedAt",
//   });
    next();
});

userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changePasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changeTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10
        );
        return JWTTimestamp < changeTimestamp;
    }
    //false means not changed
    return false;
};

userSchema.methods.createPasswordRestToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    this.passwordRestExpires = Date.now() + 50 * 60 * 1000;
    console.log({ resetToken }, this.passwordResetToken);
    return resetToken;
};
const User = mongoose.model("User", userSchema);

module.exports = User;