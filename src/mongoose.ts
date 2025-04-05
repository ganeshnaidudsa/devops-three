import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

const DB_URL = "mongodb+srv://ganesh:ganesh@devops-three.ecusghv.mongodb.net/";

// Mongoose connection
const connectDB = async () => {
    try {
        await mongoose.connect(DB_URL!);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

// User schema and model
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

export { connectDB, User };