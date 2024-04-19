const express = require("express"); // Inkluderar express
require("dotenv").config(); // Inkluderar env-fil

const app = express(); // Startar applikationen med express
app.use(express.json()); // Inkluderar middleware till express för att konvertera data till json automatiskt
const port = process.env.PORT || 3000; // Lagrar variabel för port, startar antingen enligt inställningar i env-filen eller på port 3000

// Startar applikationen
app.listen(port, () => {
    console.log(`Server körs på port: ${port}`);
});