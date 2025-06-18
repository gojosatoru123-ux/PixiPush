// scripts/test-cron-http.js
require('dotenv').config({ path: '.env.local' });
const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/cron/delete-expired', // Corrected path
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.CRON_SECRET}`,
    'Content-Type': 'application/json'
  }
};

const req = http.request(options, (res) => {
  let data = '';
  
  res.setEncoding('utf8'); // Add encoding for proper string handling
  
  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const result = JSON.parse(data);
      if (res.statusCode >= 400) {
        console.error('❌ Failed:', result);
        process.exit(1);
      } else {
        console.log('✅ Success:', result);
      }
    } catch (e) {
      console.error('❌ Invalid JSON response:', data);
      process.exit(1);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Request failed:', error.message);
  process.exit(1);
});

req.end();