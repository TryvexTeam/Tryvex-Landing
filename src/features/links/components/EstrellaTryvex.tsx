"use client";

import { useEffect, useRef } from "react";

/**
 * La estrella de la marca como objeto sólido, girando con el scroll.
 *
 * Es un cuerpo extruido de verdad —silueta cerrada, profundidad y bisel—, no
 * varias copias planas superpuestas: al girar se le ven las caras laterales y
 * las aristas devuelven la luz, que es lo único que distingue un volumen de
 * unas cuantas capas de papel.
 *
 * El trazado NO se redibuja acá: es el mismo `d` que sirve `SparkDefs` al resto
 * del sitio. Si el logo cambia, cambia en los dos sitios o el objeto deja de
 * ser el logo.
 *
 * Three.js entra por `await import()` dentro del efecto, nunca arriba: pesa más
 * que toda la landing junta y no puede viajar en el bundle de ninguna otra
 * ruta. Con la importación dinámica solo lo descarga quien abre /links.
 */

/* Mismos trazados que `SparkDefs`, en el viewBox 0 0 100 100. */
const D_ESTRELLA =
  "M 50 4 C 52 32, 68 48, 96 50 C 68 52, 52 68, 50 96 C 48 68, 32 52, 4 50 C 32 48, 48 32, 50 4 Z";
const D_CHISPA =
  "M 82 14 C 83 19, 87 23, 92 24 C 87 25, 83 29, 82 34 C 81 29, 77 25, 72 24 C 77 23, 81 19, 82 14 Z";

export default function EstrellaTryvex() {
  const contenedor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nodo = contenedor.current;
    if (!nodo) return;

    /* Reducir movimiento no puede dejar el hueco vacío: no se monta la escena y
       el CSS deja visible la estrella plana de respaldo. */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelado = false;
    let limpiar: (() => void) | undefined;

    (async () => {
      const [THREE, { SVGLoader }, { RoomEnvironment }] = await Promise.all([
        import("three"),
        import("three/examples/jsm/loaders/SVGLoader.js"),
        import("three/examples/jsm/environments/RoomEnvironment.js"),
      ]);
      if (cancelado || !contenedor.current) return;

      const ancho = nodo.clientWidth;
      const alto = nodo.clientHeight;
      const escena = new THREE.Scene();

      const camara = new THREE.PerspectiveCamera(34, ancho / alto, 0.1, 100);
      camara.position.set(0, 0, 8.6);

      const render = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      render.setSize(ancho, alto);
      /* Tope en 2: por encima no se distingue y en un móvil de gama media el
         coste por píxel se dispara. */
      render.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      render.toneMapping = THREE.ACESFilmicToneMapping;
      render.toneMappingExposure = 0.74;
      /* Sin esto el lienzo se pinta con el negro opaco por defecto y se recorta
         contra el fondo de la página como un rectángulo. */
      render.setClearColor(0x000000, 0);
      nodo.appendChild(render.domElement);

      /* ---- entorno ----
         Sin un mapa de entorno, `metalness: 1` no se ve metálico sino negro: el
         metal no tiene color propio, solo refleja. `RoomEnvironment` genera ese
         mapa por procedimiento, sin descargar ningún HDRI. */
      const pmrem = new THREE.PMREMGenerator(render);
      const entorno = pmrem.fromScene(new RoomEnvironment(), 0.6);
      escena.environment = entorno.texture;

      /* ---- texturas ---- */
      const cargador = new THREE.TextureLoader();
      const mapaCara = cargador.load("/links/logo-cara.png");
      const mapaRugosidad = cargador.load("/links/logo-rugosidad.png");
      const mapaNormal = cargador.load("/links/logo-normal.png");
      for (const t of [mapaCara, mapaRugosidad, mapaNormal]) {
        /* Solo el mapa de color lleva sRGB. Rugosidad y normales son datos, no
           color: interpretarlos con curva de gamma deforma el relieve. */
        t.colorSpace = t === mapaCara ? THREE.SRGBColorSpace : THREE.NoColorSpace;
        t.anisotropy = render.capabilities.getMaxAnisotropy();
        t.flipY = false;
      }

      /* ---- geometría ---- */
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="${D_ESTRELLA}"/><path d="${D_CHISPA}"/></svg>`;
      const datos = new SVGLoader().parse(svg);

      const extrusion = {
        depth: 8,
        bevelEnabled: true,
        bevelThickness: 1.5,
        bevelSize: 1.2,
        bevelOffset: 0,
        bevelSegments: 8,
        curveSegments: 24,
      };

      /* La cara lleva el grabado de la "Tx"; el canto es metal liso. Son dos
         materiales porque `ExtrudeGeometry` separa la geometría en dos grupos:
         0 = tapas, 1 = pared lateral. */
      const matCara = new THREE.MeshPhysicalMaterial({
        map: mapaCara,
        roughnessMap: mapaRugosidad,
        /* El relieve de la "Tx". Con solo el mapa de rugosidad la letra se veía
           como una mancha mate sobre una cara plana; el mapa de normales le da
           la pared y el bisel, de modo que la luz la describe al girar. */
        normalMap: mapaNormal,
        normalScale: new THREE.Vector2(1.35, 1.35),
        metalness: 0.78,
        roughness: 1,
        clearcoat: 0.55,
        clearcoatRoughness: 0.18,
        envMapIntensity: 0.7,
        transparent: true,
      });
      const matCanto = new THREE.MeshPhysicalMaterial({
        color: 0xc4c0b9,
        metalness: 0.92,
        roughness: 0.22,
        envMapIntensity: 0.7,
        transparent: true,
      });
      const matChispa = new THREE.MeshPhysicalMaterial({
        color: 0xda1613,
        metalness: 0.55,
        roughness: 0.3,
        clearcoat: 0.6,
        emissive: 0x3d0302,
        emissiveIntensity: 0.4,
        envMapIntensity: 0.8,
        transparent: true,
      });

      const grupo = new THREE.Group();

      datos.paths.forEach((trazo, indice) => {
        const esChispa = indice === 1;
        SVGLoader.createShapes(trazo).forEach((forma) => {
          const geo = new THREE.ExtrudeGeometry(forma, extrusion);
          geo.computeBoundingBox();
          const caja = geo.boundingBox!;

          /* `ExtrudeGeometry` escribe UV en unidades del mundo de la forma
             (0–100 acá), no normalizados: sin rehacerlos, la textura de la cara
             se muestrearía a escala 100 y el grabado no aparecería. Se reescriben
             contra la propia caja del cuerpo para que la "Tx" caiga donde va. */
          if (!esChispa) {
            const pos = geo.attributes.position;
            const uv = geo.attributes.uv;
            const anchoCaja = caja.max.x - caja.min.x;
            const altoCaja = caja.max.y - caja.min.y;
            for (let i = 0; i < pos.count; i++) {
              uv.setXY(
                i,
                (pos.getX(i) - caja.min.x) / anchoCaja,
                (pos.getY(i) - caja.min.y) / altoCaja,
              );
            }
            uv.needsUpdate = true;
          }

          geo.center();
          const malla = new THREE.Mesh(
            geo,
            esChispa ? matChispa : [matCara, matCanto],
          );
          /* El eje Y del SVG crece hacia abajo; el de Three hacia arriba. */
          malla.scale.set(1, -1, 1);
          if (esChispa) {
            /* `center()` deja cada cuerpo en su propio origen, así que la chispa
               hay que devolverla a su sitio a mano. El desplazamiento va en
               unidades del viewBox (0–100), que es donde vive la geometría antes
               de que el grupo la escale: del centro de la estrella (50,50) al de
               la chispa (82,24) hay +32 en X y 26 hacia arriba. */
            malla.position.set(32, 26, 1);
          }
          grupo.add(malla);
        });
      });

      grupo.scale.setScalar(0.024);
      escena.add(grupo);

      /* ---- resplandor ----
         Antes esto era un `div` con un degradado, clavado a un porcentaje de la
         pantalla: la estrella se iba y el brillo se quedaba donde estaba. Ahora
         es un sprite en la escena que sigue al objeto, así que el resplandor es
         del objeto y no del fondo.

         La textura se dibuja en un canvas en vez de cargarse: son cuatro líneas
         de degradado radial y ahorra una petición más. */
      const lienzo = document.createElement("canvas");
      lienzo.width = lienzo.height = 256;
      const ctx = lienzo.getContext("2d")!;
      const deg = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
      deg.addColorStop(0, "rgba(255,92,72,0.85)");
      deg.addColorStop(0.35, "rgba(218,22,19,0.42)");
      deg.addColorStop(0.72, "rgba(140,10,8,0.12)");
      deg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = deg;
      ctx.fillRect(0, 0, 256, 256);

      const texturaResplandor = new THREE.CanvasTexture(lienzo);
      texturaResplandor.colorSpace = THREE.SRGBColorSpace;

      const matResplandor = new THREE.SpriteMaterial({
        map: texturaResplandor,
        transparent: true,
        depthWrite: false,
        /* Aditivo: suma luz al fondo en vez de taparlo, que es lo que hace que
           se lea como emisión y no como una mancha pegada encima. */
        blending: THREE.AdditiveBlending,
      });
      const resplandor = new THREE.Sprite(matResplandor);
      /* Detrás del cuerpo, para que el metal siga recortándose contra él. */
      resplandor.position.z = -0.6;
      escena.add(resplandor);

      /* ---- recorrido ----
         La estrella no se queda en la portada: acompaña toda la lectura y se
         reacomoda en cada tramo. Cada punto es una parada del scroll (`p` es el
         progreso 0–1) con su sitio, su tamaño y su inclinación; entre dos
         paradas se interpola con suavizado, así que el objeto nunca salta.

         Las X alternan de lado a propósito: en los tramos con texto denso se va
         al margen y encoge, para no competir con lo que hay que leer. */
      /* `x` e `y` van como fracción del encuadre (-1 a 1), no en unidades de
         mundo. En un monitor ancho hay márgenes de sobra a los lados del texto
         y la estrella se retira ahí; en un teléfono ese margen no existe, y una
         posición fija en unidades la sacaría de cuadro. Expresadas en fracción,
         el recorrido es el mismo en los dos sitios. */
      const PARADAS = [
        { p: 0.0,  x:  0.00, y:  0.34, escala: 0.024, giro: -0.5, inclin:  0.16, opac: 1.0 },
        { p: 0.22, x:  0.74, y:  0.20, escala: 0.015, giro:  0.5, inclin: -0.10, opac: 0.5 },
        { p: 0.45, x: -0.78, y: -0.11, escala: 0.012, giro:  1.5, inclin:  0.22, opac: 0.34 },
        { p: 0.68, x:  0.80, y:  0.26, escala: 0.013, giro:  2.4, inclin: -0.18, opac: 0.4 },
        { p: 0.88, x: -0.65, y: -0.31, escala: 0.017, giro:  3.2, inclin:  0.12, opac: 0.6 },
        { p: 1.0,  x:  0.00, y: -0.38, escala: 0.028, giro:  3.9, inclin:  0.0,  opac: 1.0 },
      ];

      /* Medio encuadre a la distancia del objeto, para convertir esas
         fracciones en unidades de mundo. Se recalcula al redimensionar. */
      let semiAlto = Math.tan((camara.fov * Math.PI) / 360) * camara.position.z;
      let semiAncho = semiAlto * camara.aspect;

      /* En escritorio el objeto se ve más chico de lo que le corresponde: la
         escala del recorrido está pensada para la proporción de un teléfono, y
         en una pantalla ancha el mismo tamaño en unidades de mundo ocupa una
         fracción mucho menor de superficie. Este factor lo compensa sin tocar
         el móvil, que ya está donde debe. */
      const anchoEscritorio = window.matchMedia("(min-width: 900px)");
      let factorPantalla = anchoEscritorio.matches ? 1.3 : 1;

      type Campo = "x" | "y" | "escala" | "giro" | "inclin" | "opac";
      const CAMPOS: Campo[] = ["x", "y", "escala", "giro", "inclin", "opac"];

      /* Catmull-Rom, no interpolación lineal con suavizado.
         La lineal deja la POSICIÓN continua pero la VELOCIDAD no: al llegar a
         una parada el objeto cambia de dirección de golpe, y con la rueda del
         ratón —que avanza a tirones grandes— ese quiebre se ve como un tirón.
         Catmull-Rom pasa por los mismos puntos con la derivada continua, así
         que entra y sale de cada parada describiendo una curva. */
      const catmullRom = (p0: number, p1: number, p2: number, p3: number, t: number) => {
        const t2 = t * t;
        const t3 = t2 * t;
        return 0.5 * (
          2 * p1 +
          (-p0 + p2) * t +
          (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 +
          (-p0 + 3 * p1 - 3 * p2 + p3) * t3
        );
      };

      const enElRecorrido = (p: number) => {
        let i = 0;
        while (i < PARADAS.length - 2 && p > PARADAS[i + 1].p) i++;
        const t = Math.min(Math.max((p - PARADAS[i].p) / (PARADAS[i + 1].p - PARADAS[i].p), 0), 1);

        /* Los extremos se duplican para que la curva tenga vecinos también en
           la primera y la última parada. */
        const en = (j: number) => PARADAS[Math.min(Math.max(j, 0), PARADAS.length - 1)];
        const salida = {} as Record<Campo, number>;
        for (const campo of CAMPOS) {
          salida[campo] = catmullRom(en(i - 1)[campo], en(i)[campo], en(i + 1)[campo], en(i + 2)[campo], t);
        }
        return salida;
      };

      /* ---- luz ----
         El entorno ya aporta el relleno; estas tres luces son las que dibujan
         la forma: una clave cálida, un contraluz rojo que enciende el canto
         contra el fondo tinta y un rasante que revela el bisel. */
      const clave = new THREE.DirectionalLight(0xfff2e8, 1.5);
      clave.position.set(3.6, 4.4, 5.2);
      escena.add(clave);

      const contra = new THREE.DirectionalLight(0xff3a2c, 2.2);
      contra.position.set(-4.2, -2.6, -4);
      escena.add(contra);

      const rasante = new THREE.SpotLight(0xffd9c4, 12, 22, Math.PI / 5, 0.55);
      rasante.position.set(-3.4, 3.2, 3.2);
      escena.add(rasante);

      /* ---- movimiento ---- */
      let progresoObjetivo = 0;
      let progreso = 0;
      let anteriorX = 0;
      let anteriorY = 0;
      let punteroObjetivo = { x: 0, y: 0 };
      const puntero = { x: 0, y: 0 };

      const leerScroll = () => {
        const recorrido = document.documentElement.scrollHeight - window.innerHeight;
        progresoObjetivo = recorrido > 0 ? window.scrollY / recorrido : 0;
      };
      leerScroll();
      window.addEventListener("scroll", leerScroll, { passive: true });

      const leerPuntero = (e: PointerEvent) => {
        punteroObjetivo = {
          x: (e.clientX / window.innerWidth - 0.5) * 2,
          y: (e.clientY / window.innerHeight - 0.5) * 2,
        };
      };
      window.addEventListener("pointermove", leerPuntero, { passive: true });

      const alRedimensionar = () => {
        if (!contenedor.current) return;
        const w = nodo.clientWidth;
        const h = nodo.clientHeight;
        camara.aspect = w / h;
        camara.updateProjectionMatrix();
        render.setSize(w, h);
        semiAlto = Math.tan((camara.fov * Math.PI) / 360) * camara.position.z;
        semiAncho = semiAlto * camara.aspect;
        factorPantalla = anchoEscritorio.matches ? 1.3 : 1;
      };
      window.addEventListener("resize", alRedimensionar);

      /* ---- aviso de posición para el texto de cierre ----
         En un teléfono la estrella termina el recorrido justo detrás de la
         pregunta, y su metal claro deja el texto blanco casi ilegible. En vez
         de apartar el objeto, el CSS pinta esa zona del texto en tinta: para
         eso necesita saber dónde está la estrella, así que acá se proyecta su
         centro a coordenadas de pantalla y se publica como variables.

         Solo se hace mientras la pregunta está a la vista y solo en el ancho
         donde el texto y el objeto se cruzan: escribir variables CSS en cada
         cuadro invalida estilo, y no hay razón para pagarlo el resto del rato. */
      const pregunta = document.querySelector<HTMLElement>(".links-pregunta");
      const anchoDeCruce = window.matchMedia("(max-width: 899px)");
      const centro = new THREE.Vector3();

      const avisarPosicion = () => {
        if (!pregunta || !anchoDeCruce.matches) return;
        const caja = pregunta.getBoundingClientRect();
        if (caja.bottom < 0 || caja.top > window.innerHeight) return;

        centro.copy(grupo.position).project(camara);
        const x = (centro.x * 0.5 + 0.5) * nodo.clientWidth - caja.left;
        const y = (-centro.y * 0.5 + 0.5) * nodo.clientHeight - caja.top;
        /* El radio sigue a la escala del objeto: cuando crece en el cierre, la
           zona en tinta crece con él. */
        const radio = grupo.scale.x * 3400;

        pregunta.style.setProperty("--ex", `${x.toFixed(1)}px`);
        pregunta.style.setProperty("--ey", `${y.toFixed(1)}px`);
        pregunta.style.setProperty("--er", `${radio.toFixed(1)}px`);
      };

      const reloj = new THREE.Clock();
      let cuadro = 0;

      /* Seguimiento exponencial con constante de tiempo, no un factor fijo por
         cuadro: `valor += (destino - valor) * 0.07` avanza el doble de rápido a
         120 Hz que a 60, así que la misma rueda se sentía brusca en un monitor
         rápido y blanda en uno lento. Con `1 - exp(-dt / tau)` el tiempo que
         tarda en alcanzar el destino es el mismo en cualquier pantalla. */
      const seguir = (dt: number, tau: number) => 1 - Math.exp(-dt / tau);

      const animar = () => {
        cuadro = requestAnimationFrame(animar);
        const dt = Math.min(reloj.getDelta(), 0.05);
        const t = reloj.getElapsedTime();

        progreso += (progresoObjetivo - progreso) * seguir(dt, 0.42);
        puntero.x += (punteroObjetivo.x - puntero.x) * seguir(dt, 0.55);
        puntero.y += (punteroObjetivo.y - puntero.y) * seguir(dt, 0.55);

        const parada = enElRecorrido(progreso);

        /* El giro se envuelve en un seno: así la cara grabada vuelve siempre a
           mirar de frente. `ExtrudeGeometry` deja las dos tapas en el mismo
           grupo, de modo que el reverso muestra el mapa espejado y la "Tx" se
           leería al revés en media vuelta. */
        grupo.rotation.y = Math.sin(parada.giro) * 0.9 + Math.sin(t * 0.18) * 0.07 + puntero.x * 0.2;
        grupo.rotation.x = parada.inclin + Math.sin(t * 0.26) * 0.035 + puntero.y * 0.12;
        grupo.rotation.z = Math.sin(t * 0.16) * 0.035 + parada.giro * 0.03;
        grupo.position.x = parada.x * semiAncho + Math.sin(t * 0.22) * 0.035;
        grupo.position.y = parada.y * semiAlto + Math.sin(t * 0.34) * 0.055;
        grupo.scale.setScalar(parada.escala * factorPantalla);
        matCara.opacity = parada.opac;
        matCanto.opacity = parada.opac;
        matChispa.opacity = parada.opac;

        /* Estela. La velocidad es cuánto se movió el objeto en este cuadro,
           normalizada por el tiempo: al desplazarse rápido el resplandor se
           estira en la dirección del movimiento y se aviva; parado, vuelve a
           ser redondo. Es lo que hace que se lea como una estrella que viaja
           y no como una lámpara que se traslada. */
        const vx = (grupo.position.x - anteriorX) / Math.max(dt, 0.001);
        const vy = (grupo.position.y - anteriorY) / Math.max(dt, 0.001);
        anteriorX = grupo.position.x;
        anteriorY = grupo.position.y;
        const rapidez = Math.min(Math.hypot(vx, vy) * 0.12, 1);

        resplandor.position.x = grupo.position.x - vx * 0.045;
        resplandor.position.y = grupo.position.y - vy * 0.045;

        const radio = parada.escala * factorPantalla * 190;
        resplandor.scale.set(radio * (1 + rapidez * 0.85), radio * (1 - rapidez * 0.22), 1);
        /* Se desvanece con el objeto, y un poco más: el resplandor nunca debe
           quedar visible cuando la estrella ya se retiró. */
        matResplandor.opacity = parada.opac * (0.5 + rapidez * 0.5) * 0.85;

        render.render(escena, camara);
        avisarPosicion();
      };
      animar();

      nodo.dataset.listo = "si";

      limpiar = () => {
        cancelAnimationFrame(cuadro);
        window.removeEventListener("scroll", leerScroll);
        window.removeEventListener("pointermove", leerPuntero);
        window.removeEventListener("resize", alRedimensionar);
        grupo.traverse((o) => {
          if (o instanceof THREE.Mesh) o.geometry.dispose();
        });
        [matCara, matCanto, matChispa, matResplandor].forEach((m) => m.dispose());
        resplandor.geometry?.dispose();
        texturaResplandor.dispose();
        [mapaCara, mapaRugosidad, mapaNormal].forEach((t) => t.dispose());
        entorno.dispose();
        pmrem.dispose();
        render.dispose();
        render.domElement.remove();
        delete nodo.dataset.listo;
      };
    })();

    return () => {
      cancelado = true;
      limpiar?.();
    };
  }, []);

  return (
    <div className="estrella-3d" ref={contenedor} aria-hidden="true">
      {/* Respaldo plano. El CSS lo retira en cuanto el lienzo declara `data-listo`,
          así que cubre las tres ausencias posibles: movimiento reducido, WebGL no
          disponible y el instante entre el primer pintado y la carga del módulo. */}
      <svg className="estrella-3d__plana" viewBox="0 0 100 100">
        <path d={D_ESTRELLA} fill="#f2f0ec" />
        <path d={D_CHISPA} fill="#da1613" />
      </svg>
    </div>
  );
}
