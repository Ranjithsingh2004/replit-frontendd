import { Queue, Worker } from 'bullmq';
import IORedis from 'ioredis';
import prisma from '../prisma';

let connection: IORedis | null = null;
let emailQueue: Queue | null = null;
let worker: Worker | null = null;

// Lazy connection function
const getConnection = () => {
  if (!connection) {
    try {
      connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379', {
        maxRetriesPerRequest: null,
        lazyConnect: true,
      });
    } catch (error) {
      console.error('Failed to create Redis connection:', error);
    }
  }
  return connection;
};

// Lazy queue creation
export const getEmailQueue = () => {
  if (!emailQueue && getConnection()) {
    emailQueue = new Queue('email', { connection: getConnection()! });
  }
  return emailQueue;
};

// Lazy worker creation
export const getEmailWorker = () => {
  if (!worker && getConnection()) {
    worker = new Worker('email', async (job) => {
      console.log('Processing job', job.id);
      const { jobId, to, subject, _body } = job.data;

      try {
        // Update job status to processing
        await prisma.job.update({
          where: { id: jobId },
          data: { status: 'processing' }
        });

        // TODO: Implement actual email sending logic here
        // For now, just simulate email sending
        console.log(`Sending email to ${to} with subject: ${subject}`);
        
        // Simulate email sending delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Update job status to completed
        await prisma.job.update({
          where: { id: jobId },
          data: { status: 'completed' }
        });

        console.log(`Email job ${jobId} completed successfully`);
      } catch (error) {
        console.error(`Error processing email job ${jobId}:`, error);
        
        // Update job status to failed
        await prisma.job.update({
          where: { id: jobId },
          data: { status: 'failed' }
        });

        throw error;
      }
    }, { connection: getConnection()! });

    worker.on('completed', (job) => {
      console.log(`${job?.id} has completed!`);
    });

    worker.on('failed', (job, err) => {
      console.log(`${job?.id} has failed with ${err.message}`);
    });
  }
  return worker;
};