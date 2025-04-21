/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['ipfs.io', 'ipfs.infura.io'],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      http: false,
      https: false,
      crypto: false,
      stream: false,
      os: false,
      url: false,
      assert: false,
      constants: false,
      'node:fetch': false,
      'node:http': false,
      'node:https': false,
      'node:url': false,
      'node:util': false,
      'node:stream': false,
      'node:buffer': false,
      'node:crypto': false,
    };
    return config;
  },
}

module.exports = nextConfig 