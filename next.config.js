/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/.well-known/farcaster.json',
        destination: 'https://api.farcaster.xyz/miniapps/hosted-manifest/019a4041-3e02-5e3c-97b1-cc5156f56e02',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
