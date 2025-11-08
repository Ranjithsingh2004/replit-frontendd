import Fastify from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import jobsRoutes from './routes/jobs';
import aiRoutes from './routes/ai';
import fastifyJwt from '@fastify/jwt';
import { setupSocket } from './socket';

const server = Fastify({
  logger: true,
});

server.register(fastifyJwt, {
  secret: process.env.JWT_SECRET || 'supersecret',
});

server.register(swagger, {
  swagger: {
    info: {
      title: 'Lumen Earth API',
      description: 'API for Lumen Earth',
      version: '1.0.0'
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here'
    },
    host: 'localhost:3000',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json']
  }
});

server.register(swaggerUi, {
  routePrefix: '/documentation',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: true
  },
  uiHooks: {
    onRequest: function (request, reply, next) { next() },
    preHandler: function (request, reply, next) { next() }
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
  transformSpecificationClone: true
});

server.register(authRoutes, { prefix: '/auth' });
server.register(userRoutes, { prefix: '/users' });
server.register(jobsRoutes, { prefix: '/jobs' });
server.register(aiRoutes, { prefix: '/ai' });

server.get('/health', async (_request, _reply) => {
  return { status: 'ok' };
});

setupSocket(server);

const start = async () => {
  try {
    await server.listen({ port: 3000 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();