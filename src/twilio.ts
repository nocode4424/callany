/**
 * API wrapper for Twilio verification.
 */
export async function startVerification(phone: string): Promise<void> {
  const res = await fetch('/api/start-verification', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone }),
  });
  if (!res.ok) {
    throw new Error('Failed to send verification code');
  }
}

export async function checkVerification(phone: string, code: string): Promise<boolean> {
  const res = await fetch('/api/check-verification', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, code }),
  });
  if (!res.ok) {
    throw new Error('Failed to verify code');
  }
  const data = await res.json();
  return data.verified;
}