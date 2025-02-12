import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env:{
    DIRECT_URL: process.env.DIRECT_URL
  }

};

export default nextConfig;
