import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import mocksRouter from "./routers/mocks.router.js";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Conexión a Mongo Atlas
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Conectado a Mongo Atlas"))
    .catch(err => console.error("❌ Error al conectar:", err));

// Routers
app.use("/api/mocks", mocksRouter);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
