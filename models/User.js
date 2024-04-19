const mongoose = require("mongoose"); // Inkluderar mongoose

// Skapar nytt användarschema för DB, definierar typ och krav
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});
