module.exports = {
  webpack: config => {
    config.module.rules.push({
      test: /\.cjs$/,
      use: 'raw-loader',
    });

    return config;
  },
};
