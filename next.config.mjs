/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'satq.qroo.gob.mx',
          pathname: '/logos/**',
        },
      ],
    },
  };
  
  export default nextConfig;
  