import createNextIntlPlugin from 'next-intl/plugin';
 
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '**.graphassets.com',
          },
         ]
        },
    
};
 
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);