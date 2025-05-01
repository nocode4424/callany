import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import twilio from 'twilio';

// Twilio credentials (set in environment)
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

if (!accountSid || !authToken || !verifyServiceSid) {
  console.error('Missing Twilio configuration in environment variables.');
  process.exit(1);
}

const client = twilio(accountSid, authToken);
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Start verification: send SMS code
app.post('/api/start-verification', async (req, res) => {
  const { phone } = req.body;
  if (!phone) {
    return res.status(400).json({ message: 'Phone number is required' });
  }
  try {
    const verification = await client.verify
      .services(verifyServiceSid)
      .verifications.create({ to: phone, channel: 'sms' });
    return res.json({ status: verification.status });
  } catch (error) {
    console.error('Twilio start-verification error:', error);
    return res.status(500).json({ message: 'Failed to send verification code' });
  }
});

// Check verification code
app.post('/api/check-verification', async (req, res) => {
  const { phone, code } = req.body;
  if (!phone || !code) {
    return res.status(400).json({ message: 'Phone number and code are required' });
  }
  try {
    const check = await client.verify
      .services(verifyServiceSid)
      .verificationChecks.create({ to: phone, code });
    if (check.status === 'approved') {
      return res.json({ verified: true });
    }
    return res.json({ verified: false });
  } catch (error) {
    console.error('Twilio check-verification error:', error);
    return res.status(500).json({ message: 'Failed to verify code' });
  }
});

// Start server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Verification server listening on port ${port}`);
});