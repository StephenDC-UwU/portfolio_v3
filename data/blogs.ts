export interface BlogSection {
  id: string;
  number: string;
  heading: string;
  paragraphs: string[];
  imageUrl?: string;
  imageAlt?: string;
  imageCaption?: string;
  quote?: {
    text: string;
    author: string;
  };
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  categoryLabel: string;
  excerpt: string;
  coverImageUrl?: string;
  content: string[];
  sections: BlogSection[];
  codeSnippet?: string;
  tags: string[];
  featured?: boolean;
  popular?: boolean;
  favorite?: boolean;
}

const defaultSectionsEs: BlogSection[] = [
  {
    id: "aprender-a-mirar",
    number: "01",
    heading: "Aprender a mirar de nuevo",
    paragraphs: [
      "A veces pasamos tan rápido por lo cotidiano que damos por sentado todo lo que ya está ahí. Una línea, una proporción, una textura o el ritmo silencioso de una pequeña irregularidad pueden abrir una pregunta. Antes de buscar una respuesta, vale la pena detenerse y dejar que actúe la curiosidad.",
      "Este espacio nace como una bitácora para registrar esos hallazgos, reunir tiempos y observar cómo conviven el orden y la complejidad. No se trata de llegar lejos a una especie real, sino de ensayar una mirada: encontrar algo nuevo dentro de un paisaje que parecía conocido. El título funciona aquí como una metáfora del descubrimiento creativo.",
    ],
  },
  {
    id: "observar-antes-de-nombrar",
    number: "02",
    heading: "Observar antes de nombrar",
    paragraphs: [
      "Nombrar demasiado pronto puede cerrar una posibilidad. Si decidimos de inmediato qué es algo, dejamos de ver sus matices: qué luz tiene en el primer contacto, cómo se describe sin clasificar, dónde aparece un contraste, qué dirección toma una línea, qué zonas se sienten densas y cuáles permiten respirar.",
      "Un archivo, una fotografía, un boceto, un fragmento de código o una nota suelta funcionan como pruebas: no buscan explicar todo, sino preparar la atención. El registro se convierte en una forma sencilla de conservar el detalle que despertó la atención. Después, volver a esas notas permite distinguir lo accidental de lo que imaginamos a partir de ello.",
    ],
    quote: {
      text: "“Lo nuevo no siempre está más lejos; a veces está en la forma de mirar.”",
      author: "— Nota de campo",
    },
  },
  {
    id: "de-las-formas-a-las-ideas",
    number: "03",
    heading: "De las formas a las ideas",
    paragraphs: [
      "La exploración creativa comienza cuando una observación encuentra otra. Un ritmo visual puede sugerir una composición; una transición de color, una manera de organizar información. Estas asociaciones suaves no son todavía decisiones definitivas, sino rutas intermedias que podemos probar sin prisa y sin juicios.",
      "Trasladar una forma a otro contexto también implica cambiarla. Podemos simplificar una estructura, ampliar un vacío, alterar una repetición. Ese movimiento mantiene viva la pregunta: ¿qué pasa si cambiamos la escala, si invertimos el orden, si la propuesta puede alejarse de la imagen que teníamos en mente?",
    ],
  },
  {
    id: "dejar-espacio-para-explorar",
    number: "04",
    heading: "Dejar espacio para explorar",
    paragraphs: [
      "No todas las pruebas necesitan convertirse en un proyecto. Algunas sirven para entender por qué una combinación no funciona; otras, para descubrir un camino que no habíamos previsto. Reservar un espacio para esos intentos permite trabajar sin la presión de justificar cada decisión desde el principio.",
      "Una práctica sencilla consiste en tomar un solo detalle y hacer varias interpretaciones: una más contenida, otra más libre y otra que cambie por completo la escala. Compararlas ayuda a entender lo que cada versión propone. La búsqueda no avanza en línea recta; se construye entre ensayos que van afinando el criterio para un nuevo proyecto.",
    ],
  },
  {
    id: "volver-con-otra-mirada",
    number: "05",
    heading: "Volver con otra mirada",
    paragraphs: [
      "Quizá encontrar una nueva especie sea, en este contexto, reconocer una posibilidad que antes pasaba inadvertida. No hace falta convertirla en una certeza. A veces basta con guardar la observación y permitir que encuentre su lugar más adelante, junto a otras imágenes, notas y ensayos.",
      "El cierre de una exploración puede ser el comienzo de la siguiente. Volver a mirar, revisar lo que dimos por sentado y dejar una pregunta abierta son maneras de mantener la curiosidad en movimiento. Lo nuevo no siempre aparece de golpe; a veces emerge cuando aprendemos a detenernos.",
    ],
  },
];

const defaultSectionsEn: BlogSection[] = [
  {
    id: "learning-to-see-anew",
    number: "01",
    heading: "Learning to see anew",
    paragraphs: [
      "Sometimes we rush so quickly through the everyday that we take everything already there for granted. A line, a proportion, a texture, or the quiet rhythm of a slight irregularity can open a question. Before looking for an answer, it is worth pausing and letting curiosity take over.",
      "This space was born as a logbook to record those findings, gather moments, and observe how order and complexity coexist. It is not about discovering a literal biological species, but rehearsing a way of looking: finding something new within a landscape that seemed familiar. The title serves here as a metaphor for creative discovery.",
    ],
  },
  {
    id: "observing-before-naming",
    number: "02",
    heading: "Observing before naming",
    paragraphs: [
      "Naming too soon can close off a possibility. If we immediately decide what something is, we stop seeing its nuances: what light it holds at first contact, how it feels before classification, where contrast emerges, which direction a line takes, which areas feel dense and which allow room to breathe.",
      "An archive, a photograph, a sketch, a code snippet, or a loose note act as trials: they do not seek to explain everything, but to prepare our attention. Recording becomes a simple way to preserve the detail that sparked interest. Returning to those notes later lets us distinguish the accidental from what we can imagine from it.",
    ],
    quote: {
      text: "“The new is not always further away; sometimes it lies in the way we look.”",
      author: "— Field note",
    },
  },
  {
    id: "from-shapes-to-ideas",
    number: "03",
    heading: "From shapes to ideas",
    paragraphs: [
      "Creative exploration begins when one observation meets another. A visual rhythm can suggest a composition; a color transition can inspire a way of organizing information. These gentle associations are not yet final decisions, but intermediate paths we can test without haste or judgment.",
      "Moving a form into another context also means transforming it. We can simplify a structure, expand a void, or alter a repetition. That movement keeps the question alive: what happens if we change the scale, invert the order, or let the proposal drift away from our initial mental image?",
    ],
  },
  {
    id: "leaving-room-to-explore",
    number: "04",
    heading: "Leaving room to explore",
    paragraphs: [
      "Not every experiment needs to become a finished project. Some help us understand why a combination fails; others reveal a path we had not anticipated. Reserving space for those attempts allows us to work without the pressure of justifying every decision from the very beginning.",
      "A simple practice is taking a single detail and crafting several interpretations: one more restrained, another freer, and another that completely shifts the scale. Comparing them clarifies what each version proposes. Discovery does not move in a straight line; it is built through trials that refine our judgment.",
    ],
  },
  {
    id: "returning-with-another-gaze",
    number: "05",
    heading: "Returning with another gaze",
    paragraphs: [
      "Perhaps finding a new species in this context means recognizing a possibility that previously went unnoticed. There is no need to turn it into a certainty right away. Sometimes it is enough to keep the observation and let it find its place later alongside other images, notes, and essays.",
      "The closing of one exploration can be the beginning of the next. Looking again, revisiting what we took for granted, and leaving an open question are ways to keep curiosity in motion. The new does not always appear all at once; sometimes it emerges when we learn to pause.",
    ],
  },
];

export const blogPostsEs: BlogPost[] = [
  {
    id: "1",
    slug: "encontrando-una-nueva-especie",
    title: "Encontrando una nueva especie",
    date: "Sábado 14 Junio 2026",
    readTime: "Lectura de 4 minutos",
    category: "editorial",
    categoryLabel: "Editorial",
    excerpt:
      "Una invitación a detener la mirada, seguir la curiosidad y descubrir nuevas posibilidades en lo que creemos conocer.",
    content: defaultSectionsEs.flatMap((s) => s.paragraphs),
    sections: defaultSectionsEs,
    tags: ["Editorial", "Vibe Coding", "Arte Digital", "Mirada"],
    featured: true,
    popular: true,
    favorite: true,
  },
  {
    id: "2",
    slug: "arquitecturas-reactivas-typescript-2026",
    title: "Encontrando una nueva especie",
    date: "Sábado 14 Junio 2026",
    readTime: "Lectura de 4 minutos",
    category: "proyectos",
    categoryLabel: "Proyectos",
    excerpt:
      "Una invitación a detener la mirada, seguir la curiosidad y descubrir nuevas posibilidades en lo que creemos conocer.",
    content: defaultSectionsEs.flatMap((s) => s.paragraphs),
    sections: defaultSectionsEs,
    tags: ["TypeScript", "React 19", "Proyectos", "Arquitectura"],
    popular: true,
  },
  {
    id: "3",
    slug: "shaders-glsl-gsap-pintando-con-matematicas",
    title: "Encontrando una nueva especie",
    date: "Sábado 14 Junio 2026",
    readTime: "Lectura de 5 minutos",
    category: "notas-de-campo",
    categoryLabel: "Notas de campo",
    excerpt:
      "Exploración práctica de shaders fragmentados y pipelines cinemáticos con ScrollTrigger para crear magia visual en la web.",
    content: defaultSectionsEs.flatMap((s) => s.paragraphs),
    sections: defaultSectionsEs,
    tags: ["WebGL", "GLSL", "GSAP", "Notas de campo"],
    favorite: true,
  },
  {
    id: "4",
    slug: "la-muerte-del-diseno-generico",
    title: "Encontrando una nueva especie",
    date: "Sábado 14 Junio 2026",
    readTime: "Lectura de 3 minutos",
    category: "especimenes",
    categoryLabel: "Especímenes",
    excerpt:
      "Por qué las plantillas aburridas están destinadas a desaparecer y cómo la dirección de arte editorial marca la diferencia.",
    content: defaultSectionsEs.flatMap((s) => s.paragraphs),
    sections: defaultSectionsEs,
    tags: ["Editorial UI", "Tipografía", "Arte", "Especímenes"],
    popular: true,
  },
  {
    id: "5",
    slug: "de-dam-a-la-direccion-de-arte",
    title: "Encontrando una nueva especie",
    date: "Sábado 14 Junio 2026",
    readTime: "Lectura de 5 minutos",
    category: "editorial",
    categoryLabel: "Editorial",
    excerpt:
      "Cómo los fundamentos del desarrollo multiplataforma se fusionan con la pasión por el diseño digital y el código de autor.",
    content: defaultSectionsEs.flatMap((s) => s.paragraphs),
    sections: defaultSectionsEs,
    tags: ["DAM", "Full Stack", "Editorial", "Trayectoria"],
    favorite: true,
  },
];

export const blogPostsEn: BlogPost[] = [
  {
    id: "1",
    slug: "encontrando-una-nueva-especie",
    title: "Finding a New Species",
    date: "Saturday, June 14, 2026",
    readTime: "4 min read",
    category: "editorial",
    categoryLabel: "Editorial",
    excerpt:
      "An invitation to pause our gaze, follow curiosity, and discover new possibilities within what we think we already know.",
    content: defaultSectionsEn.flatMap((s) => s.paragraphs),
    sections: defaultSectionsEn,
    tags: ["Editorial", "Vibe Coding", "Digital Art", "Gaze"],
    featured: true,
    popular: true,
    favorite: true,
  },
  {
    id: "2",
    slug: "arquitecturas-reactivas-typescript-2026",
    title: "Finding a New Species",
    date: "Saturday, June 14, 2026",
    readTime: "4 min read",
    category: "proyectos",
    categoryLabel: "Projects",
    excerpt:
      "An invitation to pause our gaze, follow curiosity, and discover new possibilities within what we think we already know.",
    content: defaultSectionsEn.flatMap((s) => s.paragraphs),
    sections: defaultSectionsEn,
    tags: ["TypeScript", "React 19", "Projects", "Architecture"],
    popular: true,
  },
  {
    id: "3",
    slug: "shaders-glsl-gsap-pintando-con-matematicas",
    title: "Finding a New Species",
    date: "Saturday, June 14, 2026",
    readTime: "5 min read",
    category: "notas-de-campo",
    categoryLabel: "Field notes",
    excerpt:
      "A hands-on exploration of fragment shaders and cinematic GSAP ScrollTrigger pipelines to craft visual magic on the web.",
    content: defaultSectionsEn.flatMap((s) => s.paragraphs),
    sections: defaultSectionsEn,
    tags: ["WebGL", "GLSL", "GSAP", "Field notes"],
    favorite: true,
  },
  {
    id: "4",
    slug: "la-muerte-del-diseno-generico",
    title: "Finding a New Species",
    date: "Saturday, June 14, 2026",
    readTime: "3 min read",
    category: "especimenes",
    categoryLabel: "Specimens",
    excerpt:
      "Why generic templates are destined to fade away and how editorial art direction sets digital products apart.",
    content: defaultSectionsEn.flatMap((s) => s.paragraphs),
    sections: defaultSectionsEn,
    tags: ["Editorial UI", "Typography", "Art", "Specimens"],
    popular: true,
  },
  {
    id: "5",
    slug: "de-dam-a-la-direccion-de-arte",
    title: "Finding a New Species",
    date: "Saturday, June 14, 2026",
    readTime: "5 min read",
    category: "editorial",
    categoryLabel: "Editorial",
    excerpt:
      "How cross-platform engineering fundamentals merge with a passion for digital design and bespoke creative code.",
    content: defaultSectionsEn.flatMap((s) => s.paragraphs),
    sections: defaultSectionsEn,
    tags: ["DAM", "Full Stack", "Editorial", "Journey"],
    favorite: true,
  },
];

export const blogPosts: BlogPost[] = blogPostsEs;

export function getBlogsByLang(lang: string = "es"): BlogPost[] {
  return lang === "en" ? blogPostsEn : blogPostsEs;
}

export function getBlogPostBySlug(
  slug: string,
  lang: string = "es"
): BlogPost | undefined {
  if (!slug) return undefined;
  const cleanSlug = decodeURIComponent(slug).trim().toLowerCase();
  const list = getBlogsByLang(lang);
  return list.find((p) => {
    const postSlug = p.slug.trim().toLowerCase();
    const postId = p.id.trim().toLowerCase();
    return postSlug === cleanSlug || postId === cleanSlug;
  });
}

export function getBlogPostById(
  id: string,
  lang: string = "es"
): BlogPost | undefined {
  return getBlogPostBySlug(id, lang);
}
