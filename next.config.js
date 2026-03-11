<<<<<<< HEAD
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  env: {
    NEXT_PUBLIC_VIDEO_BASE_URL:
      'https://pub-07da13bf303942fbb6513812015db427.r2.dev/videos',
  },
};

module.exports = nextConfig;
=======
/** @type {import('next').NextConfig} */                                     
   const nextConfig = {                                                         
     output: 'export',                                                          
     images: {                                                                  
       unoptimized: true,                                                       
     },                                                                         
     trailingSlash: true,                                                       
   }                                                                            
                                                                                
   module.exports = nextConfig  
>>>>>>> 9cba0fa068d3a8bdff89417f6ed57e260f276ae6
