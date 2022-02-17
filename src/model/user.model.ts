import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from 'config';

export interface UserDocument extends mongoose.Document{
    email: string;
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword({candidatePassword}: any):Promise<boolean>
}

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true},
    name: {type: String, required: true},
    password: {type: String, required: true},
},
 {timestamps: true}
);

UserSchema.pre("save", async function(next) {
    let user = this as UserDocument;

    if(!user.isModified("password")) return next();

    //Only hash the password if it has been modified
    const salt = await bcrypt.genSalt(config.get("saltWorkFactor"));


    //Random additional data
    const hash = await bcrypt.hashSync(user.password, salt);

    //Replace the password with the hash
    user.password = hash;

    return next()
});

//Used for Login
UserSchema.methods.comparePassword = async function (candidatePassword: string) 
{
    const user = this as UserDocument;

    return bcrypt.compare(candidatePassword, user.password).catch((e) => false)
}

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;