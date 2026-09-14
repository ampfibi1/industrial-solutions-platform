import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  // Send Order Confirmation Email
  async sendOrderConfirmation(
    toEmail: string,
    customerName: string,
    orderId: number,
    totalAmount: number,
  ) {
    await this.mailerService.sendMail({
      to: toEmail,
      subject: `Order #${orderId} Confirmed — Student Engineering Limited`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #2c3e50;">Order Confirmation</h2>
          <p>Dear <strong>${customerName}</strong>,</p>
          <p>Your order has been placed successfully!</p>
          <table style="border-collapse: collapse; width: 100%;">
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;">
                <strong>Order ID</strong>
              </td>
              <td style="padding: 8px; border: 1px solid #ddd;">
                #${orderId}
              </td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;">
                <strong>Total Amount</strong>
              </td>
              <td style="padding: 8px; border: 1px solid #ddd;">
                $${totalAmount}
              </td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;">
                <strong>Status</strong>
              </td>
              <td style="padding: 8px; border: 1px solid #ddd;">
                PENDING
              </td>
            </tr>
          </table>
          <p style="margin-top: 20px;">Thank you for your order!</p>
          <p><strong>Student Engineering Limited</strong></p>
        </div>
      `,
    });
  }

  // Send Status Update Email
  async sendStatusUpdate(
    toEmail: string,
    customerName: string,
    orderId: number,
    newStatus: string,
  ) {
    await this.mailerService.sendMail({
      to: toEmail,
      subject: `Order #${orderId} Status Updated — Student Engineering Limited`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #2c3e50;">Order Status Update</h2>
          <p>Dear <strong>${customerName}</strong>,</p>
          <p>Your order status has been updated.</p>
          <table style="border-collapse: collapse; width: 100%;">
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;">
                <strong>Order ID</strong>
              </td>
              <td style="padding: 8px; border: 1px solid #ddd;">
                #${orderId}
              </td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;">
                <strong>New Status</strong>
              </td>
              <td style="padding: 8px; border: 1px solid #ddd;">
                ${newStatus}
              </td>
            </tr>
          </table>
          <p style="margin-top: 20px;">Thank you for choosing us!</p>
          <p><strong>Student Engineering Limited</strong></p>
        </div>
      `,
    });
  }
}