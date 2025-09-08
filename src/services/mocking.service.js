// src/services/mocking.service.js
import bcrypt from 'bcrypt';

export const generateUsers = async (num = 50) => {
  const users = [];

  for (let i = 0; i < num; i++) {
    const passwordHash = await bcrypt.hash('coder123', 10); // contraseña encriptada
    const role = Math.random() < 0.5 ? 'user' : 'admin';    // role aleatorio
    users.push({
      firstName: `User${i + 1}`,
      lastName: `Test${i + 1}`,
      email: `user${i + 1}@mail.com`,
      password: passwordHash,
      role,
      pets: []
    });
  }

  return users;
};
