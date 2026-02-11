'use server';
/**
 * @fileOverview A flow for sending emails.
 *
 * - sendEmail - A function that handles sending an email.
 * - SendEmailInput - The input type for the sendEmail function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

export const SendEmailInputSchema = z.object({
  to: z.string().email().describe("The recipient's email address."),
  subject: z.string().describe('The subject of the email.'),
  body: z.string().describe('The HTML body of the email.'),
});
export type SendEmailInput = z.infer<typeof SendEmailInputSchema>;

export const SendEmailOutputSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});
export type SendEmailOutput = z.infer<typeof SendEmailOutputSchema>;


export async function sendEmail(input: SendEmailInput): Promise<SendEmailOutput> {
  return sendEmailFlow(input);
}


const sendEmailFlow = ai.defineFlow(
  {
    name: 'sendEmailFlow',
    inputSchema: SendEmailInputSchema,
    outputSchema: SendEmailOutputSchema,
  },
  async (input) => {
    console.log('--- SIMULATING EMAIL ---');
    console.log(`To: ${input.to}`);
    console.log(`Subject: ${input.subject}`);
    console.log('Body:');
    console.log(input.body);
    console.log('------------------------');

    // In a real application, you would integrate with an email service
    // like SendGrid, Mailgun, or AWS SES here.
    // For this prototype, we'll just simulate a successful send.

    return {
      success: true,
      message: 'Email sent successfully (simulated).',
    };
  }
);
