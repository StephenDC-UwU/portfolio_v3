export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  readTime: string;
  category: "all" | "vibe-coding" | "creative-dev" | "full-stack" | "art-code";
  categoryLabel: string;
  excerpt: string;
  content: string[];
  codeSnippet?: string;
  tags: string[];
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "encontrando-una-nueva-especie-vibe-coding",
    title: "Encontrando Una Nueva Especie: La Era del Vibe Coding",
    date: "Sábado 14 Junio 2026",
    readTime: "5 min de lectura",
    category: "vibe-coding",
    categoryLabel: "Vibe Coding",
    excerpt:
      "Cómo la intuición, los agentes de IA y la sensibilidad estética están transformando la ingeniería de software moderna en una disciplina puramente creativa.",
    content: [
      "Durante décadas, la programación fue concebida como una labor de ensamblaje riguroso, donde cada punto y coma era un ladrillo colocado a mano en una estructura estricta. Sin embargo, estamos presenciando el nacimiento de una nueva especie de creadores: aquellos que programan por intuición estética y visión de producto.",
      "El 'Vibe Coding' no es una renuncia al rigor técnico; es la elevación del desarrollador al rol de director de orquesta. Al apoyarnos en herramientas generativas y modelos de lenguaje de última generación, la barrera entre la idea conceptual y el código funcional se disuelve casi por completo.",
      "Lo que verdaderamente distingue a un proyecto en esta era ya no es escribir cada línea desde cero, sino la agudeza visual, la armonía en la arquitectura y la obsesión por crear experiencias que emocionen al usuario.",
      "Cuando la máquina asume la carga del boilerplate y las tareas sintácticas repetitivas, el programador recupera su cualidad más humana: la capacidad de conectar ideas dispares, el gusto por la tipografía fina, la fluidez del movimiento cinemático y la creación de mundos digitales memorables."
    ],
    codeSnippet: `// The Vibe Architecture Principle
interface CreativeEngineer {
  intuition: "uncompromising";
  vision: "editorial-aesthetic";
  speed: "accelerated-by-ai";
  craft: () => Promise<MemorableExperience>;
}

export const manifest: CreativeEngineer = {
  intuition: "uncompromising",
  vision: "editorial-aesthetic",
  speed: "accelerated-by-ai",
  craft: async () => buildMasterpiece(),
};`,
    tags: ["Vibe Coding", "AI Agents", "Creative Dev", "Filosofía"],
    featured: true,
  },
  {
    id: "2",
    slug: "arquitecturas-reactivas-typescript-2026",
    title: "Arquitecturas Reactivas & TypeScript en 2026",
    date: "Sábado 14 Junio 2026",
    readTime: "4 min de lectura",
    category: "full-stack",
    categoryLabel: "Full Stack",
    excerpt:
      "Patrones de diseño desacoplados con React 19, Zustand y Node.js para aplicaciones web ultrarrápidas y mantenibles.",
    content: [
      "Mantener el código limpio a medida que una aplicación crece es el desafío perenne del desarrollo full-stack. En este artículo profundizamos en cómo estructurar stores modulares con Zustand, tipado estricto en APIs REST y optimizaciones de renderizado en React 19.",
      "El uso consistente de TypeScript no solo previene bugs en tiempo de ejecución, sino que sirve como la documentación viva más precisa de tu sistema.",
      "Al desacoplar el estado global de la lógica de presentación y utilizar contratos de datos tipados entre el frontend y el backend, los equipos pueden iterar con la máxima velocidad sin sacrificar estabilidad."
    ],
    codeSnippet: `import { create } from "zustand";

interface StateStore {
  activeTheme: "cream" | "crimson";
  setTheme: (theme: "cream" | "crimson") => void;
}

export const useStore = create<StateStore>((set) => ({
  activeTheme: "cream",
  setTheme: (theme) => set({ activeTheme: theme }),
}));`,
    tags: ["TypeScript", "React 19", "Zustand", "Node.js"],
  },
  {
    id: "3",
    slug: "shaders-glsl-gsap-pintando-con-matematicas",
    title: "Shaders GLSL & GSAP: Pintando con Matemáticas",
    date: "Viernes 28 Mayo 2026",
    readTime: "6 min de lectura",
    category: "creative-dev",
    categoryLabel: "Creative Dev",
    excerpt:
      "Exploración práctica de shaders fragmentados y pipelines cinemáticos con ScrollTrigger para crear magia visual en la web.",
    content: [
      "Los shaders en WebGL permiten calcular el color de cada píxel en paralelo a 60 cuadros por segundo. Cuando combinamos esta potencia con la precisión de timelines de GSAP, la web deja de ser un documento estático para convertirse en un lienzo vivo.",
      "Analizamos cómo modular la turbulencia, ondas senoidales y distorsiones cromáticas para lograr identidades visuales únicas que cautiven a primera vista.",
      "Integrar Three.js con React Three Fiber permite componer escenas tridimensionales con la misma elegancia declarativa con la que construimos componentes estándar de UI."
    ],
    codeSnippet: `// Fragment Shader: Crimson Plasma Glow
precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  vec3 color = vec3(0.35, 0.08, 0.06); // Dark Crimson base
  color += sin(st.x * 10.0 + u_time) * 0.15;
  gl_FragColor = vec4(color, 1.0);
}`,
    tags: ["WebGL", "GLSL", "GSAP", "Three.js"],
  },
  {
    id: "4",
    slug: "la-muerte-del-diseno-generico",
    title: "La Muerte del Diseño Genérico en la Web",
    date: "Lunes 12 Mayo 2026",
    readTime: "3 min de lectura",
    category: "art-code",
    categoryLabel: "UI & Arte",
    excerpt:
      "Por qué las plantillas aburridas están destinadas a desaparecer y cómo la dirección de arte editorial marca la diferencia.",
    content: [
      "El internet moderno sufre de una epidemia de monotonía: interfaces idénticas con los mismos botones y los mismos esquemas de color azules y grises. Reclamar la tipografía serif, los contrastes audaces y las micro-interacciones cinematográficas es el camino hacia la distinción.",
      "Cada producto digital debe poseer un alma propia. Diseñar con vocación artística no es superficial; es la declaración de que lo que construyes merece ser recordado."
    ],
    tags: ["Editorial UI", "Tipografía", "Arte", "Design Systems"],
  },
  {
    id: "5",
    slug: "de-dam-a-la-direccion-de-arte",
    title: "De DAM a la Dirección de Arte: Mi Viaje Creativo",
    date: "Domingo 20 Abril 2026",
    readTime: "5 min de lectura",
    category: "full-stack",
    categoryLabel: "Full Stack",
    excerpt:
      "Cómo los fundamentos del desarrollo multiplataforma se fusionan con la pasión por el diseño digital y el código de autor.",
    content: [
      "Estudiar desarrollo multiplataforma te da los cimientos sólidos de bases de datos, patrones de arquitectura y persistencia de datos. Al sumar a esto una obsesión por el arte y el diseño interactivo, el resultado es un perfil híbrido capaz de construir de punta a punta.",
      "Entender cómo fluyen los datos desde la base de datos hasta el último frame renderizado en el navegador te permite optimizar cada capa del sistema con total confianza."
    ],
    tags: ["DAM", "Mobile", "Full Stack", "Trayectoria"],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  if (!slug) return undefined;
  const cleanSlug = decodeURIComponent(slug).trim().toLowerCase();
  return blogPosts.find((p) => {
    const postSlug = p.slug.trim().toLowerCase();
    const postId = p.id.trim().toLowerCase();
    return postSlug === cleanSlug || postId === cleanSlug;
  });
}

export function getBlogPostById(id: string): BlogPost | undefined {
  return getBlogPostBySlug(id);
}
