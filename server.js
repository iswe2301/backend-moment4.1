const express = require("express"); // Inkluderar express
require("dotenv").config(); // Inkluderar env-fil
const jwt = require("jsonwebtoken"); // Inkluderar JWT
const authRoutes = require("./routes/authRoutes"); // Inkluderar routes

const app = express(); // Startar applikationen med express
app.use(express.json()); // Inkluderar middleware till express för att konvertera data till json automatiskt
const port = process.env.PORT || 3000; // Lagrar variabel för port, startar antingen enligt inställningar i env-filen eller på port 3000

// Använder exporterade routes
app.use("/api", authRoutes);

// Skapar en GET-route som är skyddad av JWT
app.get("/api/protected", authenticateToken, (req, res) => {
    res.json({ message: "Skyddad route" }); // Skickar ett svar som bekräftar att användaren har nått den skyddade routen
});

// Funktion för att validera JWT
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"]; // Hämtar authorization header
    const token = authHeader && authHeader.split(" ")[1]; // Hämtar Token
    // Kontrollerar om token finns
    if (token == null) {
        // Skickar felmeddelande md felkod om token saknas
        res.status(401).json({ message: "Ej behörig - token saknas" })
    }
    // Verifirerar token med nyckel från en-filen
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, username) => {
        // Skcikar felmeddelande med felkod om token är ogiltig
        if (err) {
            return res.status(403).json({ message: "Ogiltig JWT" });
        }
        // Lägger till användarnamnet från token om den är giltig
        req.username = username;
        next(); // Går vidare till nästa route (protected get)
    })
}

// Startar applikationen
app.listen(port, () => {
    console.log(`Server körs på port: ${port}`);
});