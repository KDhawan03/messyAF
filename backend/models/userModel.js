const {Schema, model} = require("mongoose");
  
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
  
const UserModel = model("test", UserSchema)
  
module.exports = UserModel