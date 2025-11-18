import { BlogPost } from './types';

// Esta es tu plantilla para las entradas del blog.
// Simplemente añade nuevos objetos a este array para crear nuevas entradas.
// Puedes usar etiquetas HTML dentro de `fullContent` para dar formato al texto.

export const blogPostsData: BlogPost[] = [
  {
    id: 1,
    title: "Los 5 Errores Más Comunes que un Corrector Evita en tu Novela",
    excerpt: "Descubre los errores más frecuentes que se esconden en los manuscritos y cómo un corrector profesional los pule para que tu historia brille...",
    date: "15 de julio de 2024",
    imageUrl: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?q=80&w=2080&auto=format&fit=crop",
    fullContent: `
      <p class="mb-4">Escribir una novela es un maratón creativo, y es natural que en el proceso se filtren pequeños errores que pueden distraer al lector. Un corrector de textos es tu mejor aliado para garantizar que la obra final esté impecable. Aquí te mostramos los 5 errores más comunes que detectamos y solucionamos:</p>
      <img src="https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1973&auto=format&fit=crop" alt="Persona escribiendo en un escritorio con una libreta y un portátil" class="rounded-lg shadow-md my-6 w-full object-cover aspect-video">
      <ol class="list-decimal list-inside space-y-3 mb-4 pl-4">
        <li><strong>Inconsistencias en la trama:</strong> ¿Un personaje cambia de nombre a mitad del libro? ¿Una puerta que estaba cerrada aparece abierta en la siguiente escena? Rastreamos estos detalles para mantener la coherencia interna.</li>
        <li><strong>Diálogos poco naturales:</strong> A veces, los diálogos suenan forzados o todos los personajes hablan igual. Un corrector ayuda a pulir las conversaciones para que reflejen la voz única de cada personaje.</li>
        <li><strong>Errores de puntuación sutiles:</strong> El uso incorrecto de la coma, el punto y coma o las rayas de diálogo puede cambiar por completo el ritmo y el significado de una frase. Nos aseguramos de que cada signo esté en su lugar.</li>
        <li><strong>Repeticiones innecesarias:</strong> Es común abusar de ciertas palabras o muletillas sin darse cuenta. Identificamos estas repeticiones y sugerimos alternativas para enriquecer el vocabulario y la prosa.</li>
        <li><strong>Fallos en el 'raccord' o continuidad:</strong> Nos fijamos en los detalles, como el color de ojos de un personaje o el tiempo que ha pasado entre escenas, para evitar errores de continuidad que saquen al lector de la historia.</li>
      </ol>
      <p>Invertir en una corrección profesional no es un gasto, es una inversión en la calidad y el potencial de tu obra. Tu historia merece ser leída sin distracciones.</p>
    `
  },
  {
    id: 2,
    title: "Corrección de Estilo vs. Ortotipográfica: ¿Cuál Necesitas?",
    excerpt: "Ambos servicios son cruciales, pero sirven a propósitos distintos. Entender la diferencia es clave para saber qué pedir y cómo mejorar tu texto de manera efectiva.",
    date: "1 de julio de 2024",
    imageUrl: "https://images.unsplash.com/photo-1517411032315-548a0e271295?q=80&w=2070&auto=format&fit=crop",
    fullContent: `
      <p class="mb-4">Cuando un autor busca ayuda profesional, a menudo se encuentra con dos términos: corrección ortotipográfica y corrección de estilo. Aunque relacionadas, son dos fases distintas y complementarias del proceso de edición. ¿En qué se diferencian?</p>
      <img src="https://images.unsplash.com/photo-1615286922425-5662553974d2?q=80&w=2070&auto=format&fit=crop" alt="Una lupa examinando un texto en un libro antiguo" class="rounded-lg shadow-md my-6 w-full object-cover aspect-video">
      <h3 class="text-xl font-bold text-green-600 mt-6 mb-2">Corrección Ortotipográfica: La Lupa del Detective</h3>
      <p class="mb-4">Esta es la revisión más técnica y minuciosa. Se centra en la capa más superficial pero fundamental del texto. El corrector ortotipográfico se asegura de que no haya errores de:</p>
      <ul class="list-disc list-inside space-y-2 mb-4 pl-4">
        <li><strong>Ortografía:</strong> Tildes, letras incorrectas (b/v, g/j, etc.).</li>
        <li><strong>Gramática:</strong> Concordancia de género y número, conjugaciones verbales.</li>
        <li><strong>Puntuación:</strong> Uso correcto de comas, puntos, comillas, etc.</li>
        <li><strong>Tipografía:</strong> Espacios dobles, uso de cursivas y negritas, guiones correctos.</li>
      </ul>
      <p class="mb-4">Es el control de calidad final que garantiza que el texto cumple con todas las normas académicas y editoriales. Es imprescindible.</p>
      <h3 class="text-xl font-bold text-green-600 mt-6 mb-2">Corrección de Estilo: El Oído del Músico</h3>
      <p class="mb-4">Esta corrección va un paso más allá. No se enfoca en si algo es "correcto" o "incorrecto", sino en si "suena bien". El corrector de estilo busca mejorar:</p>
      <ul class="list-disc list-inside space-y-2 mb-4 pl-4">
        <li><strong>Claridad y Precisión:</strong> ¿Las ideas se entienden bien? ¿Hay frases ambiguas?</li>
        <li><strong>Fluidez y Ritmo:</strong> Se eliminan cacofonías, se varía la longitud de las frases y se mejora la cadencia de la prosa.</li>
        <li><strong>Riqueza léxica:</strong> Se sugieren sinónimos para evitar repeticiones y se adecúa el vocabulario al tono de la obra.</li>
        <li><strong>Cohesión:</strong> Se asegura que las ideas fluyan de manera lógica y que los párrafos estén bien conectados.</li>
      </ul>
      <p>En resumen, la corrección ortotipográfica pule la forma, mientras que la de estilo pule la voz. Idealmente, un texto pasa primero por una corrección de estilo y, una vez que el contenido está cerrado, se le aplica la corrección ortotipográfica final.</p>
    `
  }
];