import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  serverExternalPackages:["@libsql/client", "@prisma/adapter-libsql"],
  images:{remotePatterns:[

    new URL('https://lh3.googleusercontent.com/**'),
    new URL('http://res.cloudinary.com/**')

  ]},
  cacheComponents:true
};

export default nextConfig;
