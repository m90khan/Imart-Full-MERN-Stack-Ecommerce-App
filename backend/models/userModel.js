import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs'; // hash password
import crypto from 'crypto';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A user must have a name'],
      trim: true,
      maxlength: [40, 'A user name cannot exceed above 40 characters'],
      minlength: [3, 'A user name cannot be less than 3 characters'],
    },
    email: {
      type: String,
      unique: [true, 'This email address already exists'],
      required: [true, 'Please provide email address'],
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email address'],
    },
    photo: {
      type: String,
      default: 'default.jpg',
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [8, 'Password must be equal or greater than 8 characters'],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        validator: function (pass) {
          return pass === this.password;
        },
        message: 'Password Confirm is not same as password',
      },
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

// Set inactive users to not visisble
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

// hashing the password
userSchema.pre('save', async function (next) {
  // only encrypt when the password is changed or created new
  //Document.prototype.isModified(): Returns true if this document was modified, else false.
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// "createdAt": "2020-12-05T22:22:49.107Z",
// "updatedAt": "2020-12-05T22:22:49.107Z",
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    // console.log(this.passwordChangedAt, JWTTimestamp);  2019-04-30T00:00:00.000Z 1600873583
    //so we need to changed the passwordChangedAt time to miliseconds so to compare with iat
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10 // base
    );
    return JWTTimestamp < changedTimestamp; // not changed
  }
  return false; // password not changed by default
};
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken) // stored value
    .digest('hex');
  this.passwordResetExpires = Date.now() + 15 * 60 * 1000; //15 minutes
  // console.log({ resetToken }, this.passwordResetToken);
  return resetToken;
};
const User = mongoose.model('User', userSchema);

export default User;
