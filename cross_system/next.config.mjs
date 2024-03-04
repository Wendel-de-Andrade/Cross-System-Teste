// next.config.mjs
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/login',
          permanent: false,
        },
      ];
    },
  };
  
  export default nextConfig;
  

//   /** @type {import('next').NextConfig} */
// const nextConfig = {};


// export default nextConfig;