import express from 'express';
import fs from 'fs/promises';
import path from 'path';

const app = express();
const port = 3000;

// Simulated subdomain-to-user content mapping from mongodb
const userPages = {
  mohmaya: {
    displayName: 'mohmaya',
    content: 'Welcome to mypage1! Everything is an illusion',
  },
  k1dk4t: {
    displayName: 'My Page 2',
    content: 'Welcome to mypage2! chocolate is nice',
  },
};

app.use(async (req, res, next) => {
  const host = req.headers.host;
  const subdomain = host.split('.')[0]; // assumes format: subdomain.domain.com

  const pageData = userPages[subdomain]; // this can be replaced with mongodb call to check if domain exists with metadata
 try {
    const htmlPath = path.resolve('./index.html');
    let html = await fs.readFile(htmlPath, 'utf-8');

    // Replace placeholders with actual data
    html = html.replace('{{displayName}}', pageData.displayName);
    html = html.replace('{{content}}', pageData.content);

    res.send(html);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
