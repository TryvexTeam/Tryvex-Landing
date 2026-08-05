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

/**
 * Las fotos viven en `public/team/<id>.jpg` — el archivo se llama igual que el
 * `id` del miembro, para que no haya que adivinar la correspondencia.
 * Un miembro solo muestra foto si su id está en MEMBERS_WITH_PHOTO (TeamClient).
 */
export const members: Member[] = [
  {
    id: "ignacio-navarrete",
    name: "Ignacio Navarrete",
    role: "CEO",
    category: "core",
    bioShort: "",
    bio: "Fundador de Tryvex. Lleva años construyendo sistemas que hacen el trabajo pesado por las empresas — desde automatizar procesos que consumían horas hasta lanzar productos digitales que funcionan desde el primer día. Obsesionado con que la tecnología sea invisible: que el cliente solo vea los resultados.",
    photo: "/team/ignacio-navarrete.jpg",
    photoWide: "/team/ignacio-navarrete.jpg",
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
    photo: "/team/vicente-garcia.jpg",
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
    photo: "/team/cristian-de-la-fuente.jpg",
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
    photo: "/team/joseph-mailens.jpg",
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
    photo: "/team/fabian-melivilu.jpg",
    linkedin: "",
    portfolio: "",
  },
];
