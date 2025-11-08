import { FastifyInstance } from 'fastify';
import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';
import prisma from '../prisma';

interface RegisterRequestBody {
  email?: string;
  username?: string;
  password?: string;
}

export default async function (server: FastifyInstance) {
  server.post('/register', async (request, reply) => {
    const { email, username, password } = request.body as RegisterRequestBody;

    try {
      // Check if user already exists
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [
            { email },
            { username }
          ]
        }
      });

      if (existingUser) {
        return reply.status(400).send({ error: 'User already exists' });
      }

      // Hash the password
      const hashedPassword = await argon2.hash(password);

      // Create the user
      const user = await prisma.user.create({
        data: {
          email,
          username,
          password: hashedPassword,
        }
      });

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email, username: user.username },
        process.env.JWT_SECRET || 'supersecret'
      );

      return { token, user: { id: user.id, email: user.email, username: user.username } };
    } catch (error) {
      console.error('Registration error:', error);
      return reply.status(500).send({ error: 'Registration failed' });
    }
  });

  interface LoginRequestBody {
  email?: string;
  password?: string;
}

  server.post('/login', async (request, reply) => {
    const { email, password } = request.body as LoginRequestBody;

    try {
      // Find user by email
      const user = await prisma.user.findUnique({
        where: { email }
      });

      if (!user) {
        return reply.status(401).send({ error: 'Invalid credentials' });
      }

      // Verify password
      const isPasswordValid = await argon2.verify(user.password, password);

      if (!isPasswordValid) {
        return reply.status(401).send({ error: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email, username: user.username },
        process.env.JWT_SECRET || 'supersecret'
      );

      return { token, user: { id: user.id, email: user.email, username: user.username } };
    } catch (error) {
      console.error('Login error:', error);
      return reply.status(500).send({ error: 'Login failed' });
    }
  });
}