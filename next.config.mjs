/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export -> GitHub Pages (see CNAME). No Node server at runtime.
  output: 'export',
  reactStrictMode: true,
  // No server to fingerprint, but there is also no reason to advertise one.
  poweredByHeader: false,
  images: {
    // Required by `output: export`: there is no Image Optimization API to hit.
    // Sources are pre-compressed to WebP at build-prep time instead, and
    // next/image still contributes width/height, lazy loading and decoding.
    unoptimized: true,
  },
};

export default nextConfig;
