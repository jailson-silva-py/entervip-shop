import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  serverExternalPackages:["@libsql/client", "@prisma/adapter-libsql"],
  images:{remotePatterns:[

    new URL('https://lh3.googleusercontent.com/**')

  ]}
};

export default nextConfig;
