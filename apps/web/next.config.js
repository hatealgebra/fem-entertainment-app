/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@repo/ui", "@repo/misc"],
  experimental: {
    turbo: {
      loaders: {
        ".svg": ["@svgr/webpack"],
      },
    },
    esmExternals: "loose", // <-- add this
    serverComponentsExternalPackages: ["mongoose"],
  },
  webpack: (config) => {
    config.experiments = {
      layers: true,
      topLevelAwait: true
    };
    return config;
  },
};
