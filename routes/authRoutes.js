const express = require("express"); // Inkluderar express
const router = express.Router(); // Skapar ett nytt router-objekt
const mongoose = require("mongoose"); // Inkluderar mongoose
require("dotenv").config(); // Inkluderar dotenv-fil

// Ansluter till databasen med URL från env-filen
mongoose.set("strictQuery", false); // Använder inte strikt sökning
mongoose.connect(process.env.DATABASE).then(() => {
    console.log("Ansluten till MongoDB!");
}).catch((error) => {
    console.error("Fel vid anslutning till databasen...");
});

// Exporterar router objektet så det kan användas av andra delar av applikationen
module.exports = router;