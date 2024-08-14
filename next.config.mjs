/** @type {import('next').NextConfig} */
// import { webpack } from 'next/dist/compiled/webpack/webpack';

const nextConfig = {
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     // クライアントサイドのビルドの場合のみ適用
  //     config.resolve.fallback = {
  //       ...config.resolve.fallback,
  //       crypto: 'crypto-browserify',
  //       stream: 'stream-browserify',
  //       buffer: 'buffer/',
  //     };

  //     // DefinePlugin を追加してポリフィル設定を有効にする
  //     config.plugins.push(
  //       new ProvidePlugin({
  //         process: 'process/browser',
  //       })
  //     );
  //   }

  //   // ここに他のカスタム設定を追加
  //   return config;
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '',
        pathname: '/f/**',
      },
    ],
  },
};

export default nextConfig;
