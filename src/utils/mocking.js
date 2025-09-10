import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

// Generar un usuario falso
export const generateUser = () => {
  return {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    password: bcrypt.hashSync("coder123", 10), // contraseña encriptada
    role: faker.helpers.arrayElement(["user", "admin"]),
    pets: []
  };
};

// Generar una mascota falsa
export const generatePet = () => {
  return {
    name: faker.animal.dog(),
    specie: faker.helpers.arrayElement(["dog", "cat", "bird"]),
    birthDate: faker.date.past({ years: 5 })
  };
};
