import bcrypt from "bcryptjs";
import moment from "../helpers/moment";

/* eslint-disable func-names */
// eslint-disable-next-line radix
const SALT_ROUND = parseInt(process.env.BCRYPT_SALT_ROUND);

export const hashPassword = schema => {
  // eslint-disable-next-line consistent-return
  schema.pre("save", function() {
    if (this.isModified("password") && this.password) {
      return bcrypt.hash(this.password, SALT_ROUND).then(hash => {
        this.password = hash;
      });
    }
  });

  // eslint-disable-next-line no-param-reassign
  schema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      cb(err, isMatch);
    });
  };
};

export const createdAt = schema => {
  schema.pre("save", function() {
    if (this.isNew) {
      this.createdAt = moment().valueOf();
      this.updatedAt = moment().valueOf();
      if (!this.id) this.id = this._id.toString();
      else this._id = this.id;
    } else this.updatedAt = moment().valueOf();
  });
};

export const upperCasedNames = schema => {
  schema.pre("save", function() {
    this.firstName =
      this.firstName.charAt(0).toUpperCase() +
      this.firstName.slice(1).toLowerCase();
    this.lastName =
      this.lastName.charAt(0).toUpperCase() +
      this.lastName.slice(1).toLowerCase();
  });
};
