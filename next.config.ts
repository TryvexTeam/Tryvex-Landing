import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Fotos de equipo: bucket público `avatares` del CRM (v_equipo_publico).
    remotePatterns: [{ protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/**" }],
  },
};

export default nextConfig;
