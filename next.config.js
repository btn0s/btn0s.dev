const withMDX = require("@next/mdx")();

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  serverExternalPackages: ["@react-pdf/renderer"],
};

module.exports = withMDX(nextConfig);
