import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// In-memory storage for users
const users: { username: string; password: string }[] = [];

// Register a user
app.post("/register", (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
         res.status(400).json({ error: "Username and password are required" });
         return
    }

    // Check if user already exists
    const userExists = users.find(user => user.username === username);
    if (userExists) {
         res.status(400).json({ error: "Username already taken" });
         return
    }

    // Store user
    users.push({ username, password });
    res.status(201).json({ message: "User registered successfully" });
});

// Login a user
app.post("/login", (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
         res.status(401).json({ error: "Invalid username or password" });
         return
    }

    res.json({ message: "Login successful" });
});

// Get all registered users (for debugging)
app.get("/users", (req: Request, res: Response) => {
    res.json(users);
});

app.get("/", (req : Request,res : Response) =>{
    res.json({
        message : "Hello !"
    })
})

app.get("/hello",(req : Request,res : Response)=>{
    res.json({
        message : "Malli deployed"
    })
})

// Start server
app.listen(PORT, () => {
    console.log(`App is listening on http://localhost:${PORT}`);
});
