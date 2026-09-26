import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Fotos de equipo: bucket público `avatares` del CRM (v_equipo_publico).
    //
    // Acotado al proyecto y al bucket a propósito. Con `*.supabase.co` y
    // `/storage/v1/object/public/**` esto optimizaba imágenes de CUALQUIER
    // proyecto Supabase y de cualquier bucket público del mundo: alcanza con que
    // alguien apunte `/_next/image?url=…` a su propio bucket para servir su
    // contenido desde tryvex.tech, gastando nuestro ancho de banda y con nuestro
    // dominio de cara al visitante.
    //
    // Si el CRM migra a otro proyecto de Supabase, hay que cambiar el hostname de
    // acá o las fotos del equipo dejan de cargar. Es el precio de no dejar el
    // optimizador abierto, y queda escrito para que ese día no sea un misterio.
    //
    // 2026-09-26: el CRM pasó a Supabase self-hosted en el VPS. El host viejo se
    // mantiene mientras existan deploys o cachés que aún lo sirvan; se puede
    // quitar cuando el proyecto de la nube se dé de baja.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "supabase.srv1877698.hstgr.cloud",
        pathname: "/storage/v1/object/public/avatares/**",
      },
      {
        protocol: "https",
        hostname: "wfsjzhshkaokjoansbhc.supabase.co",
        pathname: "/storage/v1/object/public/avatares/**",
      },
    ],
  },
};

export default nextConfig;
