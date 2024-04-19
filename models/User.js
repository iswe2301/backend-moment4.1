const mongoose = require("mongoose"); // Inkluderar mongoose
const bcrypt = require("bcrypt"); // Inkluderar bcrypt för att kunna hasha lösenord

// Skapar nytt användarschema för DB, definierar typ och krav
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true, // Obligatorisk
        unique: true, // Måste vara unik
        trim: true // Tar bort ev- mellanslag
    },
    password: {
        type: String,
        required: true // Obligatorisk
    },
    created: {
        type: Date,
        default: Date.now // Default aktuellt datum när den skapades
    }
});

// Hashar lösenord före en användare sparas
userSchema.pre("save", async function (next) {
    try {
        if (this.isNew || this.isModified("password")) {
            const hashedPassword = await bcrypt.hash(this.password, 10); // Skapar hash av lösenordet
            this.password = hashedPassword; // Ersätter lösenord med hashat lösenord
        }
        next(); // Går vidare till att registrera användaren
    } catch (error) {
        next(error);
    }
});

// Registerar ny användare
userSchema.statics.register = async function (username, password) {
    try {
        const user = new this({ username, password }); // Skapar en ny instans av User
        await user.save(); // Sparar användaren i databasen
        return user; // Returnerar den nya användaren
    } catch (error) {
        throw error; // Kastar eventuella fel som uppstår
    }
};