export type MemberCategory = "core" | "engineering";

export type Member = {
  id: string;
  name: string;
  role: string;
  bioShort: string;
  bio: string;
  photo: string;
  photoWide?: string;
  linkedin?: string;
  portfolio?: string;
  category: MemberCategory;
};

export const members: Member[] = [
  {
    id: "ignacio-navarrete",
    name: "Ignacio Navarrete",
    role: "CEO",
    category: "core",
    bioShort: "",
    bio: "Fundador de Tryvex. Lleva años construyendo sistemas que hacen el trabajo pesado por las empresas — desde automatizar procesos que consumían horas hasta lanzar productos digitales que funcionan desde el primer día. Obsesionado con que la tecnología sea invisible: que el cliente solo vea los resultados.",
    photo: "/team/ignacio-navarrete-v2.png",
    photoWide: "/team/ignacio-navarrete-v2.png",
    linkedin: "",
    portfolio: "",
  },
  {
    id: "vicente-garcia",
    name: "Vicente García",
    role: "Co-Founder",
    category: "core",
    bioShort: "",
    bio: "",
    photo: "/team/vicente-garcia.webp",
    linkedin: "",
    portfolio: "",
  },
  {
    id: "cristian-de-la-fuente",
    name: "Cristian De La Fuente",
    role: "Co-Founder",
    category: "core",
    bioShort: "",
    bio: "",
    photo: "/team/cristian.png",
    linkedin: "",
    portfolio: "",
  },
  {
    id: "joseph-mailens",
    name: "Joseph Mailens",
    role: "Co-Founder",
    category: "core",
    bioShort: "",
    bio: "",
    photo: "/team/joseph-mailens.webp",
    linkedin: "",
    portfolio: "",
  },
  {
    id: "fabian-melivilu",
    name: "Fabián Melivilú",
    role: "Co-Founder",
    category: "core",
    bioShort: "",
    bio: "",
    photo: "/team/fabian-melivilu.png",
    linkedin: "",
    portfolio: "",
  },
];
