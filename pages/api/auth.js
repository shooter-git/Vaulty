import { verifyUser, generateToken } from '../../lib/auth'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { action, passcode } = req.body;

    if (action === 'login') {
      if (passcode === process.env.SECURE_PASSCODE) {
        const token = generateToken('user'); // You might want to use a unique identifier instead of 'user'
        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: 'Invalid passcode' });
      }
    } else {
      res.status(400).json({ message: 'Invalid action' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}