const fs = require('fs');
const path = require('path');

const envContent = `NODE_ENV = development
MONGO_URI = mongodb://mongo:27017/quotes

ACCESS_TOKEN_SECRET = access-token-secret
REFRESH_TOKEN_SECRET = refresh-token-secret
`;

const filePath = path.resolve(__dirname, '../.env');

fs.writeFile(filePath, envContent, 'utf8', (err) => {
  if (err) {
    console.error('Error creating .env file:', err);
    process.exit(1);
  }

  console.log('🥳\n');
});
