import mongoose from 'mongoose';


enum EGenders {
    male = 'male',
    female = 'female',
    other = 'other',
}

const {Schema} = mongoose;

const userSchema = new Schema({
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        age: {
            type: Number,
            min: 4,
            max: 99
        },
        email: {
            type: String,
            unique: true,
            trim: true,
            required: [true, 'Email is required'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        gender: {
            type: String,
            enum: EGenders
        }
    },
    {
        timestamps: true,
        versionKey: 'false',
    });

export const UserModel = mongoose.model('User', userSchema);