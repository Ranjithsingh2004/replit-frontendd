import { FastifyInstance } from 'fastify';
import { getEmailQueue } from '../queues/queues';
import prisma from '../prisma';

interface SendEmailRequestBody {
  to: string;
  subject: string;
  body: string;
}

export default async function (server: FastifyInstance) {
  server.post('/send-email', async (request, reply) => {
    const { to, subject, body } = request.body as SendEmailRequestBody;

    try {
      // Save job to database
      const job = await prisma.job.create({
        data: {
          type: 'email',
          payload: JSON.stringify({ to, subject, body }),
          status: 'pending'
        }
      });

      const emailQueue = getEmailQueue();

      if (!emailQueue) {
        // Update job status to failed if queue is not available
        await prisma.job.update({
          where: { id: job.id },
          data: { status: 'failed' }
        });
        return { message: 'Email queue is not available (Redis not connected)' };
      }

      // Add job to queue with the database job ID
      await emailQueue.add('send-email', { 
        jobId: job.id,
        to, 
        subject, 
        body 
      });

      return { 
        message: 'Email job added to the queue',
        jobId: job.id 
      };
    } catch (error) {
      console.error('Error creating email job:', error);
      return reply.status(500).send({ error: 'Failed to create email job' });
    }
  });

  interface GetJobParams {
  id: string;
}

  server.get('/jobs/:id', async (request, reply) => {
    const { id } = request.params as GetJobParams;

    try {
      const job = await prisma.job.findUnique({
        where: { id },
        select: { id: true, type: true, status: true, createdAt: true, updatedAt: true }
      });

      if (!job) {
        return reply.status(404).send({ error: 'Job not found' });
      }

      return job;
    } catch (error) {
      console.error('Error fetching job:', error);
      return reply.status(500).send({ error: 'Failed to fetch job' });
    }
  });
}