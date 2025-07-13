# Deploy status
![Docker](https://github.com/xiliourt/VercelSpeedtest-Next.JS/actions/workflows/docker.yml/badge.svg)

### Free Deployments
[![Azure](https://deploy-badge.vercel.app/?url=https%3A%2F%2Fspeedjstestdocker-axe7bpawbeewbvaj.australiasoutheast-01.azurewebsites.net%2F&name=Azure)](https://speedjstestdocker-axe7bpawbeewbvaj.australiasoutheast-01.azurewebsites.net/)  [![Vercel](https://deploy-badge.vercel.app/vercel/speedtestjs)](https://speedtestjs.vercel.app/)  [![Render Status](https://deploy-badge.vercel.app/?url=https%3A%2F%2Fspeedtestnextjs.netlify.app%2F&logo=render&name=Render)](https://renderjsspeedtest.onrender.com/)  [![Netlify Status](https://deploy-badge.vercel.app/?url=https%3A%2F%2Fspeedtestnextjs.netlify.app%2F&logo=netlify&name=Netlify)](https://speedtestnextjs.netlify.app)  [![Cloudflare](https://deploy-badge.vercel.app/?url=https%3A%2F%2Fspeedtestnextjs.pages.dev%2F&logo=Cloudflare&name=Cloudflare+)](https://speedtestnextjs.pages.dev/)  



# Try it yourself
### Via Vercel (Maintained)
Clone and deploy to Vercel for an edge speedtest! It'll auto pick up the VercelURL as the server URL. Simply open the URL and you're ready to go.

### Via Docker (Maintained)
Replace SERVERS_JSON variable with your servers.

Typically just *htttp://(ExternalIP):3000*. Potentially a domain name and HTTPS if you're using nginx / similar.
```
services:
  speed:
    container_name: speed
    image: ghcr.io/xiliourt/speedjs:latest
    restart: unless-stopped
    environment:
      SERVERS_JSON: |
        [
            {
                "name": "Server 1",
                "pingUrl": "https://acme.com/api/ping",
                "downloadUrl": "https:/acme.com/api/download,"
                "uploadUrl": "https://acme.com/api/upload",
                "maxUpload": "27262976"
            },
            {
                "name": "Server 2",
                "pingUrl": "https://acme2.com/api/ping",
                "downloadUrl": "https:/acme2.com/api/download",
                "uploadUrl": "https://acme2.com/api/upload",
                "maxUpload": "27262976"
            }
        ]
    ports:
      - 3000:3000
```
### Via node NPM
```
npm install
npm run build
npm run start
```
server will be available on http://(externaIP):3000 and will default to listing only that server with a 4MB upload limit, unless NEXT_PUBLIC_JSON_SERVERS variable is set

### Standalone package via node
Download the [latest](https://github.com/xiliourt/VercelSpeedtest-Next.JS/releases/tag/latest) release from the repo
Unzip it
Optional: (required for multiple servers) set JSON_SERVERS variable
node server.js
```
node server.js
```
server will be available on http://(externaIP):3000

Example settings NEXT_PUBLIC_JSON_SERVERS:
*(Note if maxUpload isn't set, it'll default to the 10MB value. If no JSON servers are listed, baseUrl defaults to the connection URL and max upload to 4MB)*
```
export NEXT_PUBLIC_JSON_SERVER='[
  {
    "name": "Server 1",
    "baseUrl": "https://(externalIP):3000
  },
  {
    "name": "Server 2",
    "baseUrl": "https://(externalIP):3000
    "maxUpload": "27262976"
  }
]'
```
