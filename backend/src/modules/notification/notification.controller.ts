import type { Request, Response } from 'express';
import { z } from 'zod';
import { emailService } from '@services/email.service';
import { ApiResponse } from '@common/http/ApiResponse';
import { asyncHandler } from '@common/utils/asyncHandler';
import { AppError } from '@common/errors/AppError';
import { prisma } from '@config/prisma';

const subscribeSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const subscribe = asyncHandler(async (req: Request, res: Response) => {
  const { email } = subscribeSchema.parse(req.body);

  // Check if already subscribed
  const existing = await prisma.newsletterSubscriber.findUnique({
    where: { email },
  });

  if (existing) {
    throw new AppError('Email already subscribed', {
      statusCode: 409,
      code: 'ALREADY_SUBSCRIBED',
    });
  }

  // Save to database
  await prisma.newsletterSubscriber.create({
    data: { email },
  });

  // Send notification emails
  await emailService.sendNotificationEmail(email);

  return ApiResponse.success(res, 201, { message: 'Successfully subscribed to updates!' });
});
