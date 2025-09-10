import { Router } from "express";
import { generateUser, generatePet } from "../utils/mocking.js";
import User from "../models/user.model.js";
import Pet from "../models/pet.model.js";

const router = Router();

// GET /mockingusers → generar 50 usuarios falsos
router.get("/mockingusers", (req, res) => {
  const users = [];
  for (let i = 0; i < 50; i++) {
    users.push(generateUser());
  }
  res.json(users);
});

// GET /mockingpets → generar 20 mascotas falsas
router.get("/mockingpets", (req, res) => {
  const pets = [];
  for (let i = 0; i < 20; i++) {
    pets.push(generatePet());
  }
  res.json(pets);
});

// POST /generateData → insertar en Mongo Atlas users y pets
router.post("/generateData", async (req, res) => {
  try {
    const { users = 0, pets = 0 } = req.body;

    const usersArr = [];
    for (let i = 0; i < users; i++) {
      usersArr.push(generateUser());
    }

    const petsArr = [];
    for (let i = 0; i < pets; i++) {
      petsArr.push(generatePet());
    }

    // Insertar en Mongo
    const insertedUsers = await User.insertMany(usersArr);
    const insertedPets = await Pet.insertMany(petsArr);

    res.json({
      message: "✅ Datos generados e insertados correctamente",
      users: insertedUsers.length,
      pets: insertedPets.length
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al generar datos" });
  }
});

export default router;
