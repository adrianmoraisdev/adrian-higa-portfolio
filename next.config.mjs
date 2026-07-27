const isGithubPages = process.env.GITHUB_ACTIONS === "true";
const repository = "adrian-higa-portfolio";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: isGithubPages ? `/${repository}` : "" },
  basePath: isGithubPages ? `/${repository}` : "",
  assetPrefix: isGithubPages ? `/${repository}/` : "",
  reactStrictMode: true,
  poweredByHeader: false
};

export default nextConfig;
