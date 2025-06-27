import https from 'https';
import fs from 'fs';
import app from './server.js'; // your Express app

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/myapp.io/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/myapp.io/fullchain.pem'),
};

https.createServer(options, app).listen(443, () => {
  console.log('HTTPS server running on port 443');
});
