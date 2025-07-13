/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async headers() {
    return [
      {
        // This applies the headers to all routes in your application.
        source: "/:api*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "X-Requested-With, Content-Type, Authorization",
          },  
          {
            key: "CDN-Cache-Control",
            value: "max-age=86400",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
