# KNKT Promo Subdomain App

## Install and Start Server 

```bash
npm install
npm start
```

## Make changes to /etc/hosts

```bash
127.0.0.1 mohmaya.knkt.io
127.0.0.1 k1dk4t.knkt.io
```

## Set Up Wildcard DNS
In your Digital Ocean DNS settings for myapp.io:

- Add an A record like:

```bash
Host: *.knkt.io
Type: A
Value: [Your droplet IP]
TTL: Default
```
- (Optional) Also ensure you have:

```bash
Host: knkt.io
Type: A
Value: [Your droplet IP]
```
This routes all subdomains (e.g. mohmaya.knkt.io, k1dk4t.knkt.io) to your server.

## Set Up HTTPS with a Wildcard Certificate

- Install Certbot and Digital Ocean plugin:
```bash
sudo snap install certbot --classic
sudo snap install certbot-dns-digitalocean
```

- [Create a Digital Ocean API token](https://cloud.digitalocean.com/account/api/tokens) for certbot
```bash
dns_digitalocean_token = YOUR_DIGITALOCEAN_API_TOKEN
....
chmod 600 /root/.secrets/certbot/digitalocean.ini
```

- Run Certbot for wildcard:
```bash
sudo certbot certonly \
  --dns-digitalocean \
  --dns-digitalocean-credentials /root/.secrets/certbot/digitalocean.ini \
  -d "*.knkt.io" -d knkt.io
```

# Deploy
Serve `server-production.js` Or use NGINX as a reverse proxy with SSL termination, which is standard practice.

## License

[MIT](https://choosealicense.com/licenses/mit/)
