const withMDX = require("@next/mdx")();
const withVercelToolbar = require("@vercel/toolbar/plugins/next")();

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  images: {
    domains: ["cdn.sanity.io"],
  },
};

module.exports = withMDX(withVercelToolbar(nextConfig));
