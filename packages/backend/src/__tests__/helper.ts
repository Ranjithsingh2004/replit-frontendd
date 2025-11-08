import Fastify from 'fastify';
import authRoutes from '../routes/auth';
import userRoutes from '../routes/users';
import jobsRoutes from '../routes/jobs';
import aiRoutes from '../routes/ai';
import fastifyJwt from '@fastify/jwt';

export async function build() {
  const server = Fastify({
    logger: false, // Disable logging for tests
  });

  server.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || 'test-secret',
  });

  server.register(authRoutes, { prefix: '/auth' });
  server.register(userRoutes, { prefix: '/users' });
  server.register(jobsRoutes, { prefix: '/jobs' });
  server.register(aiRoutes, { prefix: '/ai' });

  server.get('/health', async (_request, _reply) => {
    return { status: 'ok' };
  });

  return server;
}