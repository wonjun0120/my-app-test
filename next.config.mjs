import withPWA from 'next-pwa';

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ];
  },
};

export default withPWA({
  dest: 'public',
})(nextConfig);

