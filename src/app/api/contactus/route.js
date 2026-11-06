
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Escape user input before inserting it into HTML.
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return entities[char];
  });
}

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate required fields.
    if (
      !name?.trim() ||
      !email?.trim() ||
      !subject?.trim() ||
      !message?.trim()
    ) {
      return NextResponse.json(
        { error: 'Please fill in all required fields.' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY ||
        !process.env.EMAIL_TO ||
        !process.env.RESEND_FROM_EMAIL) {
      console.error('Missing Resend environment variables.');

      return NextResponse.json(
        { error: 'Email service is not configured.' },
        { status: 500 }
      );
    }

    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeSubject = escapeHtml(subject.trim());
    const safeMessage = escapeHtml(message.trim()).replace(/\n/g, '<br>');

    const date = new Date().toLocaleString('en-US', {
      dateStyle: 'long',
      timeStyle: 'short',
    });

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: [process.env.EMAIL_TO],
      replyTo: email.trim(),
      subject: `New Contact: ${subject.trim()}`,

      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px;border:1px solid #ddd;border-radius:8px;color:#333;">
          <h2 style="color:#d32f2f;">New Contact Form Submission</h2>
          <p><strong>Received:</strong> ${date}</p>
          <hr />
          <p><strong>Name:</strong><br />${safeName}</p>
          <p><strong>Email:</strong><br />${safeEmail}</p>
          <p><strong>Subject:</strong><br />${safeSubject}</p>
          <p><strong>Message:</strong><br />${safeMessage}</p>
          <hr />
          <p style="font-size:12px;color:#777;">
            Automated message from the Team Techno website.
          </p>
        </div>
      `,

      text: `
NEW CONTACT FORM SUBMISSION

Received: ${date}

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `,
    });

    if (error) {
      console.error('Resend error:', error);

      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      );
    }

    console.log('Contact email sent:', data?.id);

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully.',
    });

  } catch (error) {
    console.error('Contact form error:', error);

    return NextResponse.json(
      { error: 'Something went wrong while sending your message.' },
      { status: 500 }
    );
  }
}
