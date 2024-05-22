/** @type {import('next').NextConfig} */
const path = require('path');

module.exports = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Add a rule to handle .ico files
    config.module.rules.push({
      test: /\.ico$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'static',
          publicPath: '/_next/static',
        },
      },
    });

    // Resolve alias for src directory
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');

    return config;
  },
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
};


