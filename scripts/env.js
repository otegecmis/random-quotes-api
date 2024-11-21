const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const envContent = `
# Server configuration
PORT = 8000
ORIGIN = * # Allowed origins for CORS (use '*' for all or specify origins.)

# Environment settings
NODE_ENV = development # Set the environment: development, production, or test.

# Database configuration
MONGO_URI = mongodb://mongo:27017/quotes # Use 'mongodb://localhost:27017/quotes' for local development.

# SMTP credentials for email services
SMTP_USER = smtp-user
SMTP_PASS = smtp-pass

# JWT token settings
ACCESS_TOKEN_SECRET = ${crypto.randomBytes(32).toString('hex')}
ACCESS_TOKEN_EXPIRATION = 1h

REFRESH_TOKEN_SECRET = ${crypto.randomBytes(32).toString('hex')}
REFRESH_TOKEN_EXPIRATION = 7d

PASSWORD_RESET_SECRET = ${crypto.randomBytes(32).toString('hex')}
PASSWORD_RESET_EXPIRATION = 15m
`;

const filePath = path.resolve(__dirname, '../.env');

fs.writeFile(filePath, envContent, 'utf8', (err) => {
  if (err) {
    console.error('Error:', err);
    process.exit(1);
  }

  console.log('🥳 .env file created successfully.');
  console.log('🚨 Update the .env file with your own values.');
});
