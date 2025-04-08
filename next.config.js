/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  images : {
    domains : ['image.tmdb.org','upload.wikimedia.org'],
  }
}

// next.config.js
module.exports = {
  images: {
    domains: ['image.tmdb.org'],
    unoptimized: true,
  },
}
