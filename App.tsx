
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
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
);

const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

// New Section Icons
const BadgeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
);

const LightBulbIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
);

const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const MagnifyingGlassIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const MapIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 16.382V5.618a1 1 0 00-1.447-.894L15 7m-6 13l6-3m0 0V7" />
    </svg>
);

const BuildingIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
);


// Social Media Icons
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const ThreadsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 16 16">
    <path d="M6.321 6.016c-.27-.18-1.166-.802-1.166-1.932 0-.902.556-1.665 1.562-1.665.955 0 1.438.49 1.438 1.188 0 .524-.262.921-.437.921-.194 0-.359-.22-.359-.466 0-.317.144-.559.4-.559.208 0 .323.153.323.325 0 .14-.07.28-.23.395l-.16.115.16.115c.16.115.23.255.23.395 0 .172-.115.325-.323.325-.256 0-.4-.242-.4-.559 0-.246.165-.466.359-.466.175 0 .437.4.437.921 0 .698-.483 1.188-1.438 1.188-1.006 0-1.562-.763-1.562-1.665 0-1.13 1.006-1.77 1.256-1.922l.189-.115.189.115c.25.152 1.256.792 1.256 1.922 0 .902-.556 1.665-1.562 1.665-.955 0-1.438-.49-1.438-1.188 0-.524.262-.921.437.921.194 0 .359-.22.359-.466 0-.317-.144-.559-.4-.559-.208 0-.323.153-.323.325 0 .14-.07.28-.23.395l-.16.115.16.115c.16.115.23.255.23.395 0 .172-.115.325-.323.325-.256 0-.4-.242-.4-.559 0-.246.165-.466.359-.466.175 0 .437.4.437.921 0 .698-.483 1.188-1.438 1.188-1.006 0-1.562-.763-1.562-1.665zM11.5 8.042c0 1.6-1.16 2.623-2.76 2.623-1.564 0-2.648-1.02-2.648-2.623 0-1.6 1.084-2.623 2.648-2.623 1.6 0 2.76 1.022 2.76 2.623zm-1.157 0c0-1.01-.623-1.72-1.6-1.72s-1.6.71-1.6 1.72c0 1.01.623 1.72 1.6 1.72s1.6-.71 1.6-1.72z"></path>
  </svg>
);

const BlueskyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 16 16">
    <path d="M10.334 4.542.882 7.77l5.44 1.734L4.85 14.86l5.484-3.235 1.463 4.413 3.32-1.42L11.796 0 10.334 4.542Zm.99 1.157-1.12 3.376 3.16-1.865-2.04-1.51Z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96s4.46 9.96 9.96 9.96c5.5 0 9.96-4.46 9.96-9.96S17.5 2.04 12 2.04zM13.5 8h-1.5c-.28 0-.5.22-.5.5v1.5h2v1.5h-2v4.5h-2v-4.5h-1V10h1V8.5c0-.83.67-1.5 1.5-1.5h1.5v1z"></path>
  </svg>
);

// --- MOCK DATA ---

const servicesData: Service[] = [
  {
    title: "Corrección Ortotipográfica",
    description: "Revisión exhaustiva de gramática, puntuación y tipografía. Ideal para novelas, tesis, y cualquier texto que requiera un acabado impecable y profesional.",
    icon: <PencilIcon />,
  },
  {
    title: "Corrección de Estilo",
    description: "Mejora de la cohesión, claridad y fluidez del texto. Perfecciono la estructura de las frases para que tu voz como autor brille con fuerza.",
    icon: <BookOpenIcon />,
  },
  {
    title: "Informes de Lectura",
    description: "Análisis editorial detallado de manuscritos (estructura, personajes, ritmo, potencial comercial). Una herramienta clave para autores que buscan publicar.",
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
    
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
          document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    return (
        <>
            <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <a href="#" onClick={(e) => { e.preventDefault(); setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' });}} className="text-2xl font-bold text-green-700">CorrectorDeTextos.es</a>
                    <button 
                        onClick={() => setIsOpen(!isOpen)} 
                        className="text-green-700 focus:outline-none z-[60]"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <XIcon /> : <MenuIcon />}
                    </button>
                </div>
            </header>
            
            <div className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <nav className="flex flex-col items-center space-y-6">
                    {navLinks.map(link => (
                        <a 
                            key={link.href} 
                            href={link.href} 
                            onClick={(e) => handleLinkClick(e, link.href)} 
                            className="text-2xl md:text-3xl text-gray-700 hover:text-orange-500 transition-colors duration-300 font-semibold"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>
            </div>
        </>
    );
};


const HeroSection: React.FC = () => (
    <section className="bg-white">
        <div className="container mx-auto px-6 py-24 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-green-700 leading-tight mb-4">
                Corrector de Textos Profesional
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Servicios de corrección ortotipográfica y de estilo para autores, editoriales y empresas. Asegura que tu mensaje sea claro, preciso e impactante.
            </p>
            <a href="#contacto" onClick={(e) => { e.preventDefault(); document.getElementById('contacto')?.scrollIntoView({behavior: 'smooth'})}} className="mt-8 inline-block bg-orange-500 text-white font-bold py-3 px-8 rounded-full hover:bg-orange-600 transition-transform duration-300 transform hover:scale-105">
                Pide tu presupuesto gratuito
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
      <h3 className="text-2xl font-bold text-green-700 mb-4 text-center">Contador de Palabras y Matrices para Escritores</h3>
      <textarea
        className="w-full h-48 p-4 bg-gray-800 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-shadow duration-200 placeholder:text-gray-400"
        placeholder="Escribe o pega tu texto aquí para analizarlo..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        aria-label="Área de texto para contar palabras y caracteres"
      ></textarea>
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
            <input
                type="file"
                accept=".txt,.md,.docx"
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
            <p className="text-xs text-gray-500 mt-2">Admite .txt, .md, etc.</p>
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
      <p className="text-xs text-gray-500 mt-4 text-center">Las matrices (caracteres con espacios) son la medida estándar en el sector editorial para calcular presupuestos de corrección.</p>
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
                    <p className="text-lg text-gray-600 mt-2">Actualizaciones interesantes del mundo de las letras, curadas por IA.</p>
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
      // FIX: Replaced with placeholder. Configure this with your actual backend endpoint.
      const response = await fetch('https://your-backend-api.com/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Ocurrió un error en el servidor.');
      }

      setStatus('success');
      setResponseMessage(result.message || '¡Mensaje enviado con éxito! Te responderé pronto.');
      setFormData({ name: '', email: '', message: '' });

    } catch (error) {
      setStatus('error');
      if (error instanceof Error) {
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
          <h2 className="text-4xl font-extrabold text-green-700 mb-4">¿Hablamos de tu proyecto?</h2>
          <p className="text-lg text-gray-600">
            Rellena el formulario para solicitar un presupuesto o resolver cualquier duda. Estaré encantado de ayudarte a que tu texto brille.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-xl mx-auto">
          {status === 'success' ? (
             <div className="text-center p-4 bg-green-100 text-green-800 rounded-lg">
                <p className="font-bold">¡Gracias por tu mensaje!</p>
                <p>{responseMessage}</p>
             </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <p className="text-sm text-gray-500 text-center mb-6">Tu texto está seguro conmigo. La confidencialidad está garantizada.</p>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Nombre</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition" required />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition" required />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Mensaje (puedes incluir el número de palabras/matrices si lo conoces)</label>
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
            <a href="mailto:contacto@correctordetextos.es" className="font-semibold text-green-600 hover:text-green-700 text-lg">
                contacto@correctordetextos.es
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
        // FIX: Replaced with placeholder. Configure this with your actual backend endpoint.
        const response = await fetch('https://your-backend-api.com/api/posts');
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
        setPosts([]);
      } finally {
        setIsLoadingPosts(false);
      }
    };
    fetchPosts();
  }, []);

  const openBlog = async () => {
    const blogWindow = window.open("", "_blank");
    if (!blogWindow) return;

    blogWindow.document.write(`
        <html>
          <head>
            <title>Blog de un Corrector de Textos | Leonardo Góngora</title>
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
        // FIX: Replaced with placeholder. Configure this with your actual backend endpoint.
        const response = await fetch('https://your-backend-api.com/api/posts');
        if (!response.ok) {
            throw new Error('Failed to load posts.');
        }
        const blogPosts: BlogPost[] = await response.json();

        const content = blogPosts.map(post => `
              <div class="mb-8 p-6 bg-white rounded-lg shadow-md">
                <h2 class="text-2xl font-bold text-green-600">${post.title}</h2>
                <p class="text-sm text-gray-500 mb-4">${post.date}</p>
                <div class="text-gray-700 leading-relaxed">${post.fullContent || post.excerpt}</div>
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
              <h2 className="text-4xl font-extrabold text-green-700">Servicios de Corrección Editorial</h2>
              <p className="text-lg text-gray-600 mt-2">Soluciones a medida para que tus textos alcancen la excelencia.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {servicesData.map((service, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300 border border-gray-100 flex flex-col">
                  <div className="inline-block p-4 bg-orange-100 rounded-full mb-4 mx-auto">{service.icon}</div>
                  <h3 className="text-2xl font-bold text-green-600 mb-3">{service.title}</h3>
                  <p className="text-gray-600 flex-grow">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-green-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-green-700">¿Necesito un corrector de textos?</h2>
              <p className="text-lg text-gray-600 mt-2 max-w-3xl mx-auto">Invertir en una corrección profesional es invertir en la calidad y el éxito de tu comunicación.</p>
            </div>
            <div className="max-w-4xl mx-auto space-y-10">
                <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md border border-gray-200">
                        <BadgeIcon />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-green-600 mb-2">Imagen Profesional</h3>
                        <p className="text-gray-700 leading-relaxed">Un texto sin errores transmite credibilidad y respeto por el lector. Es tu mejor carta de presentación ante editoriales y clientes.</p>
                    </div>
                </div>
                <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md border border-gray-200">
                        <LightBulbIcon />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-green-600 mb-2">Claridad del Mensaje</h3>
                        <p className="text-gray-700 leading-relaxed">Me aseguro de que tus ideas se entiendan perfectamente, eliminando ambigüedades, puliendo la sintaxis y facilitando la lectura.</p>
                    </div>
                </div>
                <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md border border-gray-200">
                        <ClockIcon />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-green-600 mb-2">Ahorro de Tiempo</h3>
                        <p className="text-gray-700 leading-relaxed">Dedica tu valioso tiempo a lo que mejor sabes hacer: crear. Yo me encargo de la revisión técnica para pulir tu obra a la perfección.</p>
                    </div>
                </div>
            </div>
          </div>
        </section>

        <section id="precios" className="py-20 bg-white scroll-mt-20">
            <div className="container mx-auto px-6 text-center max-w-4xl">
                <h2 className="text-4xl font-extrabold text-green-700">Precios Claros y Transparentes</h2>
                <p className="text-lg text-gray-600 mt-4 mx-auto max-w-3xl">
                    Cada texto es único. Ofrezco presupuestos personalizados que se ajustan a tus necesidades. La máxima calidad no tiene por qué ser cara. Para recibir una cotización precisa, simplemente envíame tu manuscrito o un fragmento a través del formulario de contacto.
                </p>
                <a href="#contacto" onClick={(e) => { e.preventDefault(); document.getElementById('contacto')?.scrollIntoView({behavior: 'smooth'})}} className="mt-8 inline-block bg-green-600 text-white font-bold py-3 px-8 rounded-full hover:bg-green-700 transition-transform duration-300 transform hover:scale-105">
                    Solicita tu Presupuesto Personalizado
                </a>
            </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-green-700">¿Me puede ayudar un informe de lectura?</h2>
              <p className="text-lg text-gray-600 mt-2 max-w-3xl mx-auto">Es el primer paso para convertir un buen manuscrito en una obra publicable y exitosa.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="bg-green-50 p-8 rounded-2xl shadow-lg text-center border border-green-100 flex flex-col items-center transform hover:-translate-y-2 transition-transform duration-300">
                    <div className="inline-block p-4 bg-white rounded-full mb-4 shadow-md"><MagnifyingGlassIcon /></div>
                    <h3 className="text-2xl font-bold text-green-600 mb-3">Visión Objetiva</h3>
                    <p className="text-gray-600">Recibe una opinión profesional y externa sobre los puntos fuertes y débiles de tu obra, sin filtros emocionales.</p>
                </div>
                <div className="bg-green-50 p-8 rounded-2xl shadow-lg text-center border border-green-100 flex flex-col items-center transform hover:-translate-y-2 transition-transform duration-300">
                    <div className="inline-block p-4 bg-white rounded-full mb-4 shadow-md"><MapIcon /></div>
                    <h3 className="text-2xl font-bold text-green-600 mb-3">Hoja de Ruta para Mejorar</h3>
                    <p className="text-gray-600">El informe te proporciona pautas claras y accionables para reescribir y mejorar la estructura, ritmo y personajes.</p>
                </div>
                <div className="bg-green-50 p-8 rounded-2xl shadow-lg text-center border border-green-100 flex flex-col items-center transform hover:-translate-y-2 transition-transform duration-300">
                    <div className="inline-block p-4 bg-white rounded-full mb-4 shadow-md"><BuildingIcon /></div>
                    <h3 className="text-2xl font-bold text-green-600 mb-3">Potencial Editorial</h3>
                    <p className="text-gray-600">Analizo la viabilidad comercial de tu manuscrito y te ayudo a prepararlo para presentarlo a agencias y editoriales.</p>
                </div>
            </div>
          </div>
        </section>

        <section id="sobre-mi" className="py-20 bg-green-50 scroll-mt-20">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div className="order-1 md:order-2">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop" alt="Retrato profesional de Leonardo Góngora, corrector de textos" className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]" />
            </div>
            <div className="order-2 md:order-1">
              <h2 className="text-4xl font-extrabold text-green-700 mb-4">Soy Leonardo Góngora</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Mi pasión por la lectura me llevó al mundo editorial hace más de 10 años. Como <strong className="font-semibold">lector editorial y corrector de textos</strong>, he desarrollado un ojo crítico y una sensibilidad especial para encontrar el potencial en cada manuscrito.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Desde hace 7 años, me dedico profesionalmente a la corrección y he tenido el placer de formar a nuevas generaciones de correctores. Mi objetivo es simple: que tu mensaje, ya sea en una <strong className="font-semibold">novela, un relato o un informe</strong>, llegue al lector de la forma más clara, precisa y elegante posible.
              </p>
              <div className="flex items-center space-x-6">
                <p className="font-semibold text-gray-700">Sígueme en redes:</p>
                <div className="flex space-x-4">
                  <a href="#" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-orange-500 transition-colors duration-300">
                      <InstagramIcon />
                  </a>
                  <a href="#" aria-label="Threads" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-orange-500 transition-colors duration-300">
                      <ThreadsIcon />
                  </a>
                  <a href="#" aria-label="Bluesky" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-orange-500 transition-colors duration-300">
                      <BlueskyIcon />
                  </a>
                  <a href="#" aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-orange-500 transition-colors duration-300">
                      <FacebookIcon />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="blog" className="py-20 scroll-mt-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-green-700">Desde mi escritorio: Blog del Corrector</h2>
              <p className="text-lg text-gray-600 mt-2">Reflexiones y consejos sobre el arte de la corrección de textos.</p>
            </div>
            {isLoadingPosts && <div className="text-center">Cargando entradas del blog...</div>}
            {postsError && <div className="text-center text-red-500 bg-red-100 p-4 rounded-lg">{postsError}</div>}
            {!isLoadingPosts && !postsError && posts.length > 0 && (
                 <div className="grid md:grid-cols-2 gap-8">
                    {posts.slice(0, 2).map((post) => (
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
            <div className="flex justify-center space-x-6 mb-4">
                <a href="#" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="text-green-200 hover:text-white transition-colors duration-300">
                    <InstagramIcon />
                </a>
                <a href="#" aria-label="Threads" target="_blank" rel="noopener noreferrer" className="text-green-200 hover:text-white transition-colors duration-300">
                    <ThreadsIcon />
                </a>
                <a href="#" aria-label="Bluesky" target="_blank" rel="noopener noreferrer" className="text-green-200 hover:text-white transition-colors duration-300">
                    <BlueskyIcon />
                </a>
                <a href="#" aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="text-green-200 hover:text-white transition-colors duration-300">
                    <FacebookIcon />
                </a>
            </div>
            <p>&copy; {new Date().getFullYear()} CorrectorDeTextos.es | Todos los derechos reservados.</p>
            <p className="text-sm text-green-200 mt-2">Diseño y desarrollo con pasión por la palabra escrita.</p>
        </div>
      </footer>
    </div>
  );
}
