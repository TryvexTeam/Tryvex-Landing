"use client";

import { useEffect, useRef } from "react";

/**
 * El campo de color del fondo de /links.
 *
 * Es el shader «Aurora» de React Bits (MIT, reactbits.dev), portado de OGL a
 * Three.js y teñido con el rojo de la marca. El puerto no es capricho: la
 * página ya carga Three.js para la estrella, y traer OGL solo por el fondo
 * significaría descargar y mantener vivos dos motores WebGL en la misma vista.
 *
 * Dos cambios sobre el original:
 *   1. El eje vertical va invertido — el original hace nacer la aurora arriba;
 *      acá sube desde el borde inferior, que es de donde viene la brasa.
 *   2. Las tres paradas de color son tonos del rojo de marca en vez de los
 *      violetas y verdes del ejemplo.
 */

const VERT = /* glsl */ `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uAmplitude;
  uniform vec3 uColorStops[3];
  uniform vec2 uResolution;
  uniform float uBlend;

  vec3 permute(vec3 x) {
    return mod(((x * 34.0) + 1.0) * x, 289.0);
  }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);

    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;

    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);

    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution;

    /* Rampa horizontal entre las tres paradas de color. */
    vec3 rampColor;
    if (uv.x < 0.5) {
      rampColor = mix(uColorStops[0], uColorStops[1], uv.x / 0.5);
    } else {
      rampColor = mix(uColorStops[1], uColorStops[2], (uv.x - 0.5) / 0.5);
    }

    float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
    height = exp(height);

    /* Invertido: el original usa uv.y y la aurora cuelga desde arriba. */
    float ejeInvertido = 1.0 - uv.y;
    height = (ejeInvertido * 2.0 - height + 0.2);

    float intensity = 0.6 * height;
    float midPoint = 0.20;
    float alfa = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);

    gl_FragColor = vec4(intensity * rampColor * alfa, alfa);
  }
`;

export default function AuroraRoja() {
  const contenedor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nodo = contenedor.current;
    if (!nodo) return;

    /* Con movimiento reducido no se monta nada: el CSS deja el degradado
       estático de respaldo, que ya cubre el mismo papel visual. */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelado = false;
    let limpiar: (() => void) | undefined;

    (async () => {
      const THREE = await import("three");
      if (cancelado || !contenedor.current) return;

      const render = new THREE.WebGLRenderer({ alpha: true, antialias: false });
      render.setSize(nodo.clientWidth, nodo.clientHeight);
      /* Un campo de color difuso no gana nada con más densidad de píxeles y sí
         cuesta rellenarlo: se renderiza por debajo de 1 y se escala. */
      render.setPixelRatio(Math.min(window.devicePixelRatio, 1));
      render.setClearColor(0x000000, 0);
      nodo.appendChild(render.domElement);

      const escena = new THREE.Scene();
      const camara = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      const material = new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 },
          uAmplitude: { value: 1.05 },
          uBlend: { value: 0.62 },
          uResolution: { value: new THREE.Vector2(nodo.clientWidth, nodo.clientHeight) },
          uColorStops: {
            value: [
              new THREE.Color(0x7d0a08),
              new THREE.Color(0xda1613),
              new THREE.Color(0xff3b2c),
            ],
          },
        },
      });

      const malla = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
      malla.frustumCulled = false;
      escena.add(malla);

      const alRedimensionar = () => {
        if (!contenedor.current) return;
        const w = nodo.clientWidth;
        const h = nodo.clientHeight;
        render.setSize(w, h);
        material.uniforms.uResolution.value.set(w * render.getPixelRatio(), h * render.getPixelRatio());
      };
      alRedimensionar();
      window.addEventListener("resize", alRedimensionar);

      const reloj = new THREE.Clock();
      let cuadro = 0;
      const animar = () => {
        cuadro = requestAnimationFrame(animar);
        material.uniforms.uTime.value = reloj.getElapsedTime() * 0.32;
        render.render(escena, camara);
      };
      animar();

      nodo.dataset.listo = "si";

      limpiar = () => {
        cancelAnimationFrame(cuadro);
        window.removeEventListener("resize", alRedimensionar);
        malla.geometry.dispose();
        material.dispose();
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

  return <div className="links-aurora" ref={contenedor} aria-hidden="true" />;
}
