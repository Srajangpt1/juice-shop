import express from 'express';

const app = express();

const users = new Map<string, { email: string; password: string; resetToken?: string }>();

app.post('/reset-password', (req, res) => {
  const email = req.body.email;
  const user = Array.from(users.values()).find(user => user.email === email);
  if (user) {
    const resetToken = Math.random().toString(36).substring(7); // Generate a simple token
    user.resetToken = resetToken;
    console.log(`Password reset token for ${email}: ${resetToken}`);
    res.send('Password reset email sent');
  } else {
    res.status(404).send('User not found');
  }
});

app.post('/update-password', (req, res) => {
  const { email, token, newPassword } = req.body;
  const user = Array.from(users.values()).find(user => user.email === email && user.resetToken === token);
  if (user) {
    user.password = newPassword;
    delete user.resetToken;
    res.send('Password updated successfully');
  } else {
    res.status(400).send('Invalid token or email');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
