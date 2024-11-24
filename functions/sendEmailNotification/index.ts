import { sendEmail } from 'your-email-library'; // Replace with actual library

serve(async (req) => {
  try {
    const { email, subject, message } = await req.json();

    // Send email using external service
    await sendEmail({
      to: email,
      subject: subject,
      text: message,
    });

    return new Response(JSON.stringify({ message: 'Email sent successfully' }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to send email' }), { status: 400 });
  }
});
