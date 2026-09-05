import nodemailer, { type Transporter } from 'nodemailer';
import { env } from '@config/env';
import { logger } from '@config/logger';

class EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: env.MAIL_HOST,
      port: env.MAIL_PORT,
      secure: env.MAIL_SECURE,
      auth: {
        user: env.MAIL_USER,
        pass: env.MAIL_PASSWORD,
      },
    });
  }

  async sendNotificationEmail(subscriberEmail: string): Promise<void> {
    try {
      // Send confirmation to subscriber
      await this.transporter.sendMail({
        from: env.MAIL_DEFAULT_SENDER,
        to: subscriberEmail,
        subject: 'Thank you for subscribing to Bug Bounty updates!',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
                .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>🎉 Welcome to Bug Bounty!</h1>
                </div>
                <div class="content">
                  <h2>You're now subscribed!</h2>
                  <p>Thank you for signing up for Bug Bounty updates. You'll be the first to know about:</p>
                  <ul>
                    <li>New bug bounty programs</li>
                    <li>Platform updates and features</li>
                    <li>Tips and tricks for bug hunters</li>
                    <li>Exclusive rewards and opportunities</li>
                  </ul>
                  <p>Stay tuned for exciting updates!</p>
                  <a href="${env.WEB_APP_URL}" class="button">Visit Bug Bounty Platform</a>
                </div>
                <div class="footer">
                  <p>&copy; 2024 Bug Bounty Platform. All rights reserved.</p>
                </div>
              </div>
            </body>
          </html>
        `,
      });

      // Send notification to admin
      await this.transporter.sendMail({
        from: env.MAIL_DEFAULT_SENDER,
        to: env.NOTIFICATION_EMAIL_TO,
        subject: 'New Bug Bounty Newsletter Subscription',
        html: `
          <h2>New Subscription Alert</h2>
          <p>A new user has subscribed to Bug Bounty updates:</p>
          <p><strong>Email:</strong> ${subscriberEmail}</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        `,
      });

      logger.info(`Notification emails sent for subscriber: ${subscriberEmail}`);
    } catch (error) {
      logger.error('Failed to send notification email', error);
      throw error;
    }
  }

  async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      logger.info('Email service connection verified');
      return true;
    } catch (error) {
      logger.error('Email service connection failed', error);
      return false;
    }
  }
}

export const emailService = new EmailService();
