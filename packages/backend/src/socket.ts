import { Server } from 'socket.io';
import { FastifyInstance } from 'fastify';

export const setupSocket = (server: FastifyInstance) => {
  const io = new Server(server.server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
};