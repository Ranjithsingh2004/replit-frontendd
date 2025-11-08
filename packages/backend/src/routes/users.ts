import { FastifyInstance, FastifyRequest } from 'fastify';
import { requireAuth } from '../hooks/require-auth';
import prisma from '../prisma';

interface AuthenticatedRequest extends FastifyRequest {
  user: {
    id: string;
  };
}

export default async function (server: FastifyInstance) {
  server.get('/me', { preHandler: [requireAuth] }, async (request: AuthenticatedRequest, reply) => {
    try {
      // Fetch the current user from the database
      const user = await prisma.user.findUnique({
        where: { id: request.user.id },
        select: { id: true, email: true, username: true, createdAt: true, updatedAt: true }
      });

      if (!user) {
        return reply.status(404).send({ error: 'User not found' });
      }

      return user;
    } catch (error) {
      console.error('Error fetching user:', error);
      return reply.status(500).send({ error: 'Failed to fetch user' });
    }
  });
}