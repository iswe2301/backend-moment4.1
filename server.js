const express = require("express"); // Inkluderar express
require("dotenv").config(); // Inkluderar env-fil
const authRoutes = require("./routes/authRoutes"); // Inkluderar routes

const app = express(); // Startar applikationen med express
app.use(express.json()); // Inkluderar middleware till express för att konvertera data till json automatiskt
const port = process.env.PORT || 3000; // Lagrar variabel för port, startar antingen enligt inställningar i env-filen eller på port 3000

// Använder exporterade routes
app.use("/api", authRoutes);

// Startar applikationen
app.listen(port, () => {
    console.log(`Server körs på port: ${port}`);
});