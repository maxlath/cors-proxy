# cors-proxy

A minimalist [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) proxy to be used on your local machine.

## Install

```sh
git clone https://github.com/maxlath/cors-proxy
cd cors-proxy
npm install --production

# Run in the terminal
npm start

# Or install it as a Systemd service
npm run add-to-systemd
sudo systemctl start corsproxy

# Test
curl http://localhost:2677/http://maxlath.eu/data.json
```
