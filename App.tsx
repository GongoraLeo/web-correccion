
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Service, BlogPost, NewsArticle } from './types';
import { fetchLanguageNews } from './services/geminiService';

// --- ICONS (as components) ---

const BookOpenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const PencilIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
  </svg>
);

const DocumentTextIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
);

const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);


// --- MOCK DATA ---

const servicesData: Service[] = [
  {
    title: "Corrección Ortotipográfica",
    description: "Revisión exhaustiva de gramática, puntuación, acentuación y errores tipográficos para garantizar un texto impecable y profesional.",
    icon: <PencilIcon />,
  },
  {
    title: "Corrección de Estilo",
    description: "Mejora de la cohesión, claridad y fluidez del texto. Adecuación del tono y el registro al público objetivo y al propósito del escrito.",
    icon: <BookOpenIcon />,
  },
  {
    title: "Informes de Lectura",
    description: "Análisis detallado de manuscritos, evaluando la estructura, personajes, ritmo y potencial comercial para editoriales o autores.",
    icon: <DocumentTextIcon />,
  },
];

// --- SUB-COMPONENTS ---

interface HeaderProps {
  onOpenBlog: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenBlog }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navLinks = [
        { href: '#servicios', label: 'Servicios' },
        { href: '#precios', label: 'Precios' },
        { href: '#sobre-mi', label: 'Sobre Mí' },
        { href: '#blog', label: 'Blog' },
        { href: '#contador', label: 'Contador' },
        { href: '#noticias', label: 'Noticias' },
        { href: '#contacto', label: 'Contacto' },
    ];

    const handleLinkClick = (e: React.MouseEvent<HTMLElement>, href: string) => {
        e.preventDefault();
        setIsOpen(false);

        if (href === '#blog') {
             const targetElement = document.getElementById('blog');
             if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
            return;
        }

        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };
    
    return (
        <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' });}} className="text-2xl font-bold text-green-700">Leonardo Góngora</a>
                <nav className="hidden md:flex space-x-8">
                    {navLinks.map(link => (
                         <a key={link.href} 
                            href={link.href} 
                            onClick={(e) => handleLinkClick(e, link.href)} 
                            className="text-gray-600 hover:text-orange-500 transition-colors duration-300 font-medium cursor-pointer">
                            {link.label}
                         </a>
                    ))}
                </nav>
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-green-700 focus:outline-none">
                        {isOpen ? <XIcon /> : <MenuIcon />}
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden bg-white pb-4">
                    <nav className="flex flex-col items-center space-y-4">
                        {navLinks.map(link => (
                            <a key={link.href} href={link.href} onClick={(e) => handleLinkClick(e, link.href)} className="text-gray-600 hover:text-orange-500 transition-colors duration-300 font-medium">{link.label}</a>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
};


const HeroSection: React.FC = () => (
    <section className="bg-white">
        <div className="container mx-auto px-6 py-24 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-green-700 leading-tight mb-4">
                La palabra precisa, el estilo perfecto.
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Transformo tus textos en obras claras, coherentes y sin errores. Dale a tu mensaje la calidad que merece.
            </p>
            <a href="#servicios" onClick={(e) => { e.preventDefault(); document.getElementById('servicios')?.scrollIntoView({behavior: 'smooth'})}} className="mt-8 inline-block bg-orange-500 text-white font-bold py-3 px-8 rounded-full hover:bg-orange-600 transition-transform duration-300 transform hover:scale-105">
                Descubre mis servicios
            </a>
        </div>
    </section>
);

const WordCounter: React.FC = () => {
  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const analyzeText = useCallback((textToAnalyze: string) => {
    setText(textToAnalyze);
    const words = textToAnalyze.trim().split(/\s+/).filter(Boolean);
    setWordCount(words.length === 1 && words[0] === '' ? 0 : words.length);
    setCharCount(textToAnalyze.length);
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileText = e.target?.result as string;
        analyzeText(fileText);
      };
      reader.readAsText(file);
    }
  };
  
  const handleButtonClick = () => {
      analyzeText(text);
  };
  
  const clearText = () => {
    setText('');
    setWordCount(0);
    setCharCount(0);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
      <h3 className="text-2xl font-bold text-green-700 mb-4 text-center">Contador de Palabras y Matrices</h3>
      <textarea
        className="w-full h-48 p-4 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-shadow duration-200 placeholder:text-gray-400"
        placeholder="Escribe o pega tu texto aquí..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
            <input
                type="file"
                accept=".txt,.md"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="hidden"
            />
            <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="py-2 px-4 bg-white border border-gray-300 text-gray-700 font-semibold rounded-full hover:bg-gray-100 transition-colors"
            >
                Subir archivo
            </button>
            <p className="text-xs text-gray-500 mt-2">Admite archivos de texto plano (.txt, .md).</p>
        </div>
        <div className="flex gap-2">
            <button onClick={clearText} className="py-2 px-6 bg-gray-200 text-gray-700 font-semibold rounded-full hover:bg-gray-300 transition-colors">Limpiar</button>
            <button onClick={handleButtonClick} className="py-2 px-6 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors">Analizar Texto</button>
        </div>
      </div>
      <div className="mt-6 flex justify-around p-4 bg-green-50 rounded-lg text-center">
        <div>
          <p className="text-3xl font-bold text-orange-500">{wordCount}</p>
          <p className="text-sm text-gray-600">Palabras</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-orange-500">{charCount}</p>
          <p className="text-sm text-gray-600">Matrices</p>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-4 text-center">Las matrices son el número total de caracteres, incluyendo espacios. Es la medida estándar en el sector editorial para calcular presupuestos.</p>
    </div>
  );
};

const NewsSection: React.FC = () => {
    const [news, setNews] = useState<NewsArticle[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadNews = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const fetchedNews = await fetchLanguageNews();
                setNews(fetchedNews);
            } catch (err) {
                 if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred.');
                }
            } finally {
                setIsLoading(false);
            }
        };

        loadNews();
    }, []);

    return (
        <section id="noticias" className="py-20 bg-white scroll-mt-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-green-700">Noticias de Lengua y Literatura</h2>
                    <p className="text-lg text-gray-600 mt-2">Actualizaciones interesantes del mundo de las letras, por Gemini.</p>
                </div>
                {isLoading && <div className="text-center">Cargando noticias...</div>}
                {error && <div className="text-center text-red-500 bg-red-100 p-4 rounded-lg">{error}</div>}
                {!isLoading && !error && (
                     <div className="grid md:grid-cols-2 gap-8">
                        {news.map((item, index) => (
                            <div key={index} className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                                <h4 className="font-bold text-xl text-green-600 mb-2">
                                    {item.url ? (
                                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-orange-500 transition-colors">
                                            {item.title}
                                        </a>
                                    ) : (
                                        item.title
                                    )}
                                </h4>
                                <p className="text-gray-600">{item.summary}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [responseMessage, setResponseMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    setResponseMessage('');

    try {
      // This URL should point to your Laravel backend endpoint.
      // For local development, it will be something like 'http://127.0.0.1:8000/api/contact'.
      const response = await fetch('http://127.0.0.1:8000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle validation errors or other server errors
        throw new Error(result.message || 'Ocurrió un error en el servidor.');
      }

      setStatus('success');
      setResponseMessage(result.message || '¡Mensaje enviado con éxito! Te responderé pronto.');
      setFormData({ name: '', email: '', message: '' }); // Clear form

    } catch (error) {
      setStatus('error');
      if (error instanceof Error) {
        // Network errors or other issues with fetch will be caught here.
        setResponseMessage(error.message || 'No se pudo enviar el mensaje. Por favor, inténtalo más tarde.');
      } else {
        setResponseMessage('Ocurrió un error inesperado.');
      }
    }
  };


  return (
    <section id="contacto" className="py-20 scroll-mt-20">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-green-700 mb-4">¿Hablamos?</h2>
          <p className="text-lg text-gray-600">
            Si tienes un proyecto en mente o alguna duda, rellena el formulario o envíame un correo. Estaré encantado de ayudarte.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-xl mx-auto">
          {status === 'success' ? (
             <div className="text-center p-4 bg-green-100 text-green-800 rounded-lg">
                <p className="font-bold">¡Gracias!</p>
                <p>{responseMessage}</p>
             </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Nombre</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition" required />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition" required />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Mensaje</label>
                <textarea id="message" name="message" rows={5} value={formData.message} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition" required></textarea>
              </div>
              <div className="text-center">
                <button 
                  type="submit" 
                  disabled={status === 'sending'}
                  className="bg-orange-500 text-white font-bold py-3 px-10 rounded-full hover:bg-orange-600 transition-transform duration-300 transform hover:scale-105 text-lg disabled:bg-orange-300 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? 'Enviando...' : 'Enviar Mensaje'}
                </button>
              </div>
              {status === 'error' && (
                <p className="text-center mt-4 text-red-600 bg-red-100 p-3 rounded-lg">{responseMessage}</p>
              )}
            </form>
          )}
        </div>
         <div className="text-center mt-8">
            <p className="text-gray-600">O si lo prefieres, escríbeme directamente a:</p>
            <a href="mailto:contacto@leonardogongora.com" className="font-semibold text-green-600 hover:text-green-700 text-lg">
                contacto@leonardogongora.com
            </a>
        </div>
      </div>
    </section>
  );
};


// --- MAIN APP COMPONENT ---

export default function App() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [postsError, setPostsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoadingPosts(true);
        // This URL should point to your Laravel backend endpoint for posts.
        const response = await fetch('http://127.0.0.1:8000/api/posts');
        if (!response.ok) {
          throw new Error('No se pudieron cargar las entradas del blog.');
        }
        const data: BlogPost[] = await response.json();
        setPosts(data);
      } catch (err) {
        if (err instanceof Error) {
          setPostsError(err.message);
        } else {
          setPostsError('Ocurrió un error desconocido al cargar el blog.');
        }
        // In case of error, you might want to set empty posts or some mock data
        setPosts([]);
      } finally {
        setIsLoadingPosts(false);
      }
    };
    fetchPosts();
  }, []); // Empty dependency array means this effect runs once when the component mounts.

  const openBlog = async () => {
    const blogWindow = window.open("", "_blank");
    if (!blogWindow) return;

    blogWindow.document.write(`
        <html>
          <head>
            <title>Blog de Leonardo Góngora</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap" rel="stylesheet">
            <style>body { font-family: 'Montserrat', sans-serif; }</style>
          </head>
          <body class="bg-slate-50 text-gray-800 p-10">
            <h1 class="text-4xl font-bold text-green-700 mb-8">Blog de un Corrector</h1>
            <div id="content">Cargando...</div>
          </body>
        </html>
      `);

    try {
        const response = await fetch('http://127.0.0.1:8000/api/posts');
        if (!response.ok) {
            throw new Error('Failed to load posts.');
        }
        const blogPosts: BlogPost[] = await response.json();

        const content = blogPosts.map(post => `
              <div class="mb-8 p-6 bg-white rounded-lg shadow-md">
                <h2 class="text-2xl font-bold text-green-600">${post.title}</h2>
                <p class="text-sm text-gray-500 mb-4">${post.date}</p>
                <p class="text-gray-700">${post.fullContent || post.excerpt}</p>
              </div>
            `).join('');

        const contentDiv = blogWindow.document.getElementById('content');
        if (contentDiv) {
            contentDiv.innerHTML = content;
        }

    } catch (error) {
        const contentDiv = blogWindow.document.getElementById('content');
        if (contentDiv) {
            contentDiv.innerHTML = `<p class="text-red-500">Error al cargar el blog. Inténtalo de nuevo más tarde.</p>`;
        }
    } finally {
        blogWindow.document.close();
    }
  }


  return (
    <div className="flex flex-col min-h-screen">
      <Header onOpenBlog={openBlog}/>
      <main className="flex-grow">
        <HeroSection />
        
        <section id="servicios" className="py-20 scroll-mt-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-green-700">Mis Servicios</h2>
              <p className="text-lg text-gray-600 mt-2">Soluciones a medida para que tus textos brillen.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {servicesData.map((service, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300 border border-gray-100">
                  <div className="inline-block p-4 bg-orange-100 rounded-full mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-bold text-green-600 mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="precios" className="py-20 bg-green-50 scroll-mt-20">
            <div className="container mx-auto px-6 text-center max-w-3xl">
                <h2 className="text-4xl font-extrabold text-green-700">Precios Competitivos y a Medida</h2>
                <p className="text-lg text-gray-600 mt-4 mx-auto">
                    Cada texto es único. Por eso, ofrezco presupuestos personalizados que se ajustan a tus necesidades. La máxima calidad no tiene por qué ser cara.
                </p>
                <a href="mailto:contacto@leonardogongora.com" className="mt-8 inline-block bg-green-600 text-white font-bold py-3 px-8 rounded-full hover:bg-green-700 transition-transform duration-300 transform hover:scale-105">
                    Consulta tu precio
                </a>
            </div>
        </section>

        <section id="sobre-mi" className="py-20 bg-white scroll-mt-20">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070&auto=format&fit=crop" alt="Escritorio con libros y material de escritura" className="rounded-2xl shadow-2xl w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-4xl font-extrabold text-green-700 mb-4">Más de una década entre libros</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Mi pasión por la lectura me llevó al mundo editorial hace más de 10 años. Durante este tiempo, he desarrollado un ojo crítico y una sensibilidad especial para encontrar el potencial en cada manuscrito.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Desde hace 7 años, me dedico profesionalmente a la corrección y he tenido el placer de formar a nuevas generaciones de correctores, compartiendo las mejores prácticas y los secretos del oficio. Mi objetivo es simple: que tu mensaje llegue al lector de la forma más clara, precisa y elegante posible.
              </p>
            </div>
          </div>
        </section>

        <section id="blog" className="py-20 scroll-mt-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-green-700">Desde mi escritorio</h2>
              <p className="text-lg text-gray-600 mt-2">Reflexiones y consejos sobre el arte de escribir bien.</p>
            </div>
            {isLoadingPosts && <div className="text-center">Cargando entradas del blog...</div>}
            {postsError && <div className="text-center text-red-500 bg-red-100 p-4 rounded-lg">{postsError}</div>}
            {!isLoadingPosts && !postsError && posts.length > 0 && (
                 <div className="grid md:grid-cols-2 gap-8">
                    {posts.map((post) => (
                        <div key={post.id} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col">
                        <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                        <h3 className="text-2xl font-bold text-green-600 mb-3">{post.title}</h3>
                        <p className="text-gray-600 mb-4 flex-grow">{post.excerpt}</p>
                        <button onClick={openBlog} className="font-semibold text-orange-500 hover:text-orange-600 self-start">Leer más →</button>
                        </div>
                    ))}
                 </div>
            )}
             {!isLoadingPosts && !postsError && posts.length === 0 && (
                <div className="text-center text-gray-500">No hay entradas en el blog por el momento.</div>
            )}
             <div className="text-center mt-12">
                <button onClick={openBlog} className="bg-green-600 text-white font-bold py-3 px-8 rounded-full hover:bg-green-700 transition-transform duration-300 transform hover:scale-105">
                    Visitar el Blog Completo
                </button>
            </div>
          </div>
        </section>
        
        <section id="contador" className="py-20 bg-green-50 scroll-mt-20">
             <div className="container mx-auto px-6 max-w-4xl">
                <WordCounter />
             </div>
        </section>
        
        <NewsSection />

        <ContactForm />

      </main>

      <footer className="bg-green-800 text-white">
        <div className="container mx-auto px-6 py-8 text-center">
            <p>&copy; {new Date().getFullYear()} Leonardo Góngora. Todos los derechos reservados.</p>
            <p className="text-sm text-green-200 mt-2">Diseño y desarrollo con pasión por la palabra escrita.</p>
        </div>
      </footer>
    </div>
  );
}
