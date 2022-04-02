module.exports = {
  async redirects() {
    return [
      {
        source: '/about',
        destination: '/team',
        permanent: false,
      },
    ];
  },
};
