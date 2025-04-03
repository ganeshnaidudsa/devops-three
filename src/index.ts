import express, { Request, Response } from "express";
import cors from "cors";
import { connectDB, User } from "./mongoose";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());


app.post("/register", async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).json({ error: "Username and password are required" });
        return
    }

    const exsistingUser = await User.findOne({
        username: username
    })

    if (exsistingUser !== null) {
        res.status(400).json({ error: "Username already taken !" });
        return
    }

    await User.create({
        username,
        password
    });




    res.status(201).json({ message: "User registered successfully" });
});

app.post("/login", async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const userExisits = await User.findOne({
        username,
        password
    });

    if (userExisits === null) {
        res.status(400).json({ error: "Invalid Username or password !" });
        return
    }
    res.json({ message: "Login successful" });
});

app.get("/users", async (req: Request, res: Response) => {
    const users = await User.find();
    res.json(users);
});

app.get("/", (req: Request, res: Response) => {
    res.json({
        message: "Hello !"
    })
})



app.listen(PORT, () => {
    console.log(`App is listening on http://localhost:${PORT}`);
    connectDB();
});
