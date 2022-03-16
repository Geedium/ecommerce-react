module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /react-fullpage/,
      use: ["null-loader"],
    });

    return config;
  },
  env: {
    S3_UPLOAD_BUCKET: process.env.S3_UPLOAD_BUCKET,
    S3_UPLOAD_REGION: process.env.S3_UPLOAD_REGION,
    prod: process.env.NODE_ENV === 'production'
  },
  images: {
    formats: ["image/avif", "image/webp"],
    domains: [
      "source.unsplash.com",
      "via.placeholder.com",
      "image.shutterstock.com",
    ],
  },
  /**
   * Next.js provides gzip compression to compress rendered
   * content and static files. In general you will want to
   * enable compression on a HTTP proxy like nginx, to offload
   * load from the Node.js process.
   */
  compress: true,
  /**
   * By default Next.js will add the x-powered-by header.
   */
  poweredByHeader: false,
  reactStrictMode: true,
  /**
   * Next.js will generate etags for every page by default. You
   * may want to disable etag generation for HTML pages
   * depending on your cache strategy.
   */
  generateEtags: true,
  i18n: {
    locales: ["en", "lt", "de"],
    localeDetection: true,
    defaultLocale: "en",
    domains: [],
  },
};
