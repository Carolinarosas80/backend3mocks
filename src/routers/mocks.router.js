// src/routers/mocks.router.js
import { Router } from 'express';
import { generateUsers } from '../services/mocking.service.js';
import UserModel from '../models/user.model.js';
import PetModel from '../models/pet.model.js';

const router = Router();

// Endpoint migrado de /mockingpets
router.get('/mockingpets', async (req, res) => {
  try {
    // Ejemplo: devolver pets ficticios
    const pets = [];
    for (let i = 1; i <= 20; i++) {
      pets.push({ name: `Pet${i}`, type: 'Dog', age: i });
    }
    res.json(pets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint GET /mockingusers - generar 50 usuarios
router.get('/mockingusers', async (req, res) => {
  try {
    const users = await generateUsers(50);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint POST /generateData - insertar usuarios y pets en DB
router.post('/generateData', async (req, res) => {
  try {
    const { users: numUsers = 10, pets: numPets = 10 } = req.body;

    // Generar e insertar usuarios
    const users = await generateUsers(numUsers);
    await UserModel.insertMany(users);

    // Generar e insertar pets
    const pets = [];
    for (let i = 1; i <= numPets; i++) {
      pets.push({ name: `Pet${i}`, type: 'Dog', age: i });
    }
    await PetModel.insertMany(pets);

    res.json({ message: 'Datos generados e insertados correctamente', usersInserted: numUsers, petsInserted: numPets });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
