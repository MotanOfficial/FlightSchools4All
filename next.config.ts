import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/FlightSchools4All" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/FlightSchools4All/" : "",
  trailingSlash: true,
  devIndicators: {
    appIsrStatus: false,
    buildActivity: false,
  },
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
