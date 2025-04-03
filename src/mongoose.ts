import mongoose from 'mongoose';

// Mongoose connection
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://ganesh:ganesh@devops-three.ecusghv.mongodb.net/');
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