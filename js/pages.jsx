const { useState, useEffect, useRef } = React;

/* ── DATA ──────────────────────────────────────────────── */
const SKILLS_T = ['Astro','React','TypeScript','Flutter','Node.js','Deno','PostgreSQL','Supabase','Next.js','Swift UI','Figma','Cloudflare','Docker','Vercel'];
const TICKER   = [...SKILLS_T, ...SKILLS_T];

const PROJECTS = [
  {
    id: 'arken', num: '01', year: '2025',
    name: 'Arken Dashboard',
    desc: 'Panel SaaS de analíticas en tiempo real',
    tags: ['Astro','React','Supabase'],
    bg: '#111826', ac: '#4a90e2',
    challenge: 'Construir un dashboard complejo que mantuviera el rendimiento con datos en tiempo real y múltiples usuarios simultáneos.',
    solution: 'Arquitectura Astro con islas React para los componentes interactivos, WebSockets para datos en vivo y optimización agresiva de renders.',
    role: 'Full Stack Developer',
  },
  {
    id: 'nomada', num: '02', year: '2025',
    name: 'Nómada App',
    desc: 'App de viajes multiplataforma',
    tags: ['Flutter','Node.js','PostgreSQL'],
    bg: '#0f1e14', ac: '#4acf72',
    challenge: 'Una única base de código funcionando perfectamente en iOS y Android, con mapas offline y sincronización de datos.',
    solution: 'Flutter para el cliente móvil con gestión de estado BLoC, backend Node.js con sincronización offline-first usando SQLite local y replicación.',
    role: 'Mobile & Backend Developer',
  },
  {
    id: 'espacio', num: '03', year: '2024',
    name: 'Espacio Brand',
    desc: 'Identidad digital para estudio creativo',
    tags: ['Astro','GSAP','Cloudflare'],
    bg: '#16112a', ac: '#9b59b6',
    challenge: 'Una presencia web que representara el nivel creativo del estudio sin sacrificar velocidad de carga.',
    solution: 'Astro con animaciones GSAP optimizadas, imágenes procesadas con Cloudflare Images y puntuación perfecta en Lighthouse.',
    role: 'Frontend & Creative Dev',
  },
  {
    id: 'merkado', num: '04', year: '2024',
    name: 'Merkado',
    desc: 'E-commerce de alta velocidad',
    tags: ['Next.js','Stripe','Vercel'],
    bg: '#221212', ac: '#e74c3c',
    challenge: 'Tienda online que cargara al instante con catálogo de miles de productos y checkout sin fricciones.',
    solution: 'Next.js con ISR para páginas de producto, búsqueda Algolia, Stripe para pagos y edge runtime en Vercel para latencias mínimas.',
    role: 'Frontend & E-commerce Dev',
  },
];

const POSTS = [
  { tag: 'Performance',  title: 'Astro vs Next.js: el futuro del desarrollo web',          excerpt: 'Una comparativa honesta entre los dos frameworks más relevantes de 2025, con benchmarks reales.', date: '12 Abr 2026', read: '5 min' },
  { tag: 'Mobile',       title: 'Flutter en producción: lecciones de dos años',             excerpt: 'Todo lo que aprendí llevando una app Flutter de 0 a 100.000 usuarios activos. Lo bueno y lo técnico.', date: '28 Mar 2026', read: '8 min' },
  { tag: 'Design & Code',title: 'Cómo alcancé el 100 en Lighthouse',                        excerpt: 'El proceso completo para optimizar una web real hasta conseguir una puntuación perfecta en Core Web Vitals.', date: '15 Feb 2026', read: '6 min' },
  { tag: 'TypeScript',   title: 'TypeScript estricto: por qué vale la pena el dolor',       excerpt: 'Activar el modo strict puede parecer un obstáculo. Aquí explico por qué cambió mi forma de escribir código.', date: '3 Ene 2026', read: '4 min' },
];

const STACK = [
  { name:'Astro',      cat:'Web'     }, { name:'React',      cat:'UI'      }, { name:'TypeScript', cat:'Lang'    },
  { name:'Next.js',    cat:'Web'     }, { name:'Flutter',    cat:'Mobile'  }, { name:'Swift UI',   cat:'iOS'     },
  { name:'Node.js',    cat:'Backend' }, { name:'Deno',       cat:'Backend' }, { name:'PostgreSQL', cat:'DB'      },
  { name:'Supabase',   cat:'BaaS'    }, { name:'Figma',      cat:'Design'  }, { name:'Cloudflare', cat:'Infra'   },
  { name:'Docker',     cat:'DevOps'  }, { name:'Vercel',     cat:'Deploy'  }, { name:'Git',        cat:'Tools'   },
];

/* ── PLACEHOLDER IMAGE ─────────────────────────────────── */
function Ph({ label, bg, color }) {
  return (
    <div className="ph" style={{ background: bg, color: color || 'var(--border)' }}>
      <span style={{ position: 'relative', zIndex: 1 }}>{label}</span>
    </div>
  );
}

/* ── PROJECT CARD ──────────────────────────────────────── */
function ProjCard({ proj, nav }) {
  return (
    <div className="pc" onClick={() => nav('project', proj)} data-hot style={{ cursor: 'none' }}>
      <div className="pc-bg" style={{ background: proj.bg }}>
        <Ph label={proj.name} bg={proj.bg} color={proj.ac} />
      </div>
      <div className="pc-in">
        <div className="pc-num">{proj.num} · {proj.year}</div>
        <div className="pc-name">{proj.name}</div>
        <div className="pc-desc">{proj.desc}</div>
        <div className="tags" style={{ marginTop: '10px' }}>
          {proj.tags.map(t => <span key={t} className="tag">{t}</span>)}
          <span className="tag tag-a">Ver →</span>
        </div>
      </div>
    </div>
  );
}

/* ── HOME ──────────────────────────────────────────────── */
function HomePage({ nav, showTicker }) {
  const letters = 'OSKINAR'.split('');
  return (
    <div className="page" data-screen-label="01 Inicio">
      {/* HERO */}
      <section className="hero">
        <div className="hero-eye">
          <span>Portfolio 2026</span>
        </div>
        <h1 className="hero-name" aria-label="Oskinar">
          {letters.map((l, i) => (
            <span key={i} className="h-l" style={{ animationDelay: `${i * .07}s` }}>{l}</span>
          ))}
        </h1>
        <div className="hero-sub">
          <p className="hero-tag">
            Desarrollador de apps y web. Construyo<br />experiencias digitales rápidas y elegantes.
          </p>
          <div className="hero-cta">
            <button className="btn-p" onClick={() => nav('portfolio')}>Ver proyectos →</button>
            <button className="btn-g" onClick={() => nav('about')}>Sobre mí</button>
          </div>
        </div>
        <div className="hero-avail">
          <span className="av-dot" />
          <span>Disponible para proyectos · 2026</span>
        </div>
      </section>

      {/* TICKER */}
      {showTicker && (
        <div className="ticker-w">
          <div className="ticker-t">
            {TICKER.map((s, i) => <span key={i} className="ticker-i">{s}</span>)}
          </div>
        </div>
      )}

      {/* BRIEF */}
      <section className="sec">
        <div className="sec-lb rv" style={{ transitionDelay: '0ms' }}>Sobre el trabajo</div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'72px', alignItems:'start' }}>
          <h2 className="sec-h rv" style={{ transitionDelay:'80ms' }}>
            Código que<br /><span className="accent">funciona.</span>
          </h2>
          <div className="rv" style={{ transitionDelay:'160ms' }}>
            <p style={{ fontSize:'17px', lineHeight:'1.7', color:'var(--muted)', marginTop:'10px' }}>
              Especializado en crear productos digitales donde el rendimiento y el diseño no se comprometen. Desde apps móviles hasta webs de alto tráfico.
            </p>
            <button onClick={() => nav('about')} style={{ marginTop:'28px', fontFamily:'var(--mF)', fontSize:'11px', letterSpacing:'.15em', textTransform:'uppercase', color:'var(--accent)' }}>
              Leer más →
            </button>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section style={{ padding:'0 var(--pad)', paddingBottom:'clamp(72px,11vw,148px)' }}>
        <div className="sec-lb rv">Proyectos destacados</div>
        <div className="pg" style={{ marginTop:'0' }}>
          {PROJECTS.slice(0,2).map(p => (
            <div key={p.id} className="rv" style={{ transitionDelay:`${PROJECTS.indexOf(p)*120}ms` }}>
              <ProjCard proj={p} nav={nav} />
            </div>
          ))}
        </div>
        <button onClick={() => nav('portfolio')} className="btn-g" style={{ marginTop:'16px' }}>Ver todos los proyectos →</button>
      </section>

      <Footer nav={nav} />
    </div>
  );
}

/* ── ABOUT ─────────────────────────────────────────────── */
function AboutPage({ nav }) {
  return (
    <div className="page" data-screen-label="02 Sobre mí">
      <section className="sec">
        <div className="sec-lb rv">Sobre mí</div>
        <div className="about-g">
          <div className="rv" style={{ transitionDelay:'80ms' }}>
            <div className="big-n">05<span className="accent">+</span></div>
            <p className="mono muted" style={{ fontSize:'10px', letterSpacing:'.15em', textTransform:'uppercase', marginTop:'8px' }}>
              Años de experiencia
            </p>
          </div>
          <div className="rv" style={{ transitionDelay:'160ms' }}>
            <p className="ab-t">
              Soy <strong>Oskinar</strong>, desarrollador de apps y web con más de 5 años construyendo productos digitales que priorizan el rendimiento y la experiencia de usuario.
            </p>
            <p className="ab-t" style={{ marginTop:'20px' }}>
              Me especializo en el stack web moderno —especialmente <strong>Astro</strong> para proyectos donde la velocidad de carga es crítica— y en desarrollo móvil multiplataforma con <strong>Flutter</strong>.
            </p>
            <p className="ab-t" style={{ marginTop:'20px' }}>
              Creo que el buen código y el buen diseño no son opuestos. La mejor interfaz es la que no se nota.
            </p>
            <button className="btn-p" style={{ marginTop:'36px' }} onClick={() => nav('contact')}>
              Trabajemos juntos →
            </button>
          </div>
        </div>
      </section>

      <section style={{ padding:'0 var(--pad)', paddingBottom:'clamp(72px,11vw,148px)' }}>
        <div className="sec-lb rv">Stack tecnológico</div>
        <div className="stack-g rv" style={{ transitionDelay:'80ms' }}>
          {STACK.map(s => (
            <div key={s.name} className="si" data-hot>
              <div className="si-cat">{s.cat}</div>
              <div className="si-nm">{s.name}</div>
            </div>
          ))}
        </div>
      </section>

      <Footer nav={nav} />
    </div>
  );
}

/* ── BLOG ──────────────────────────────────────────────── */
function BlogPage({ nav }) {
  return (
    <div className="page" data-screen-label="03 Blog">
      <section className="sec">
        <div className="sec-lb rv">Blog</div>
        <h1 className="sec-h rv" style={{ transitionDelay:'60ms', marginBottom:'52px' }}>
          Ideas y<br /><span className="accent">técnica.</span>
        </h1>
        <div className="blog-g rv" style={{ transitionDelay:'140ms' }}>
          {POSTS.map((p, i) => (
            <div key={i} className="bc" data-hot>
              <div className="bc-tag">{p.tag}</div>
              <h3 className="bc-title">{p.title}</h3>
              <p className="bc-ex">{p.excerpt}</p>
              <div className="bc-meta">
                <span>{p.date}</span>
                <span>{p.read} de lectura</span>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer nav={nav} />
    </div>
  );
}

/* ── PORTFOLIO ─────────────────────────────────────────── */
function PortfolioPage({ nav }) {
  return (
    <div className="page" data-screen-label="04 Portfolio">
      <section className="sec">
        <div className="sec-lb rv">Portfolio</div>
        <h1 className="sec-h rv" style={{ transitionDelay:'60ms', marginBottom:'52px' }}>
          Proyectos<br /><span className="accent">seleccionados.</span>
        </h1>
        <div className="pg rv" style={{ transitionDelay:'140ms' }}>
          {PROJECTS.map(p => <ProjCard key={p.id} proj={p} nav={nav} />)}
        </div>
      </section>
      <Footer nav={nav} />
    </div>
  );
}

/* ── PROJECT DETAIL ────────────────────────────────────── */
function ProjectPage({ proj, nav }) {
  const p = proj || PROJECTS[0];
  return (
    <div className="page" data-screen-label="05 Proyecto">
      <button className="back-b" onClick={() => nav('portfolio')}>← Volver al portfolio</button>
      <div className="proj-hero" style={{ background: p.bg }}>
        <Ph label={`${p.name} — imagen principal`} bg={p.bg} color={p.ac} />
        <div style={{ position:'relative', zIndex:2 }}>
          <div className="pc-num" style={{ color: p.ac, marginBottom:'8px' }}>{p.num} · {p.year}</div>
          <h1 style={{ fontFamily:'var(--dF)', fontSize:'clamp(48px,8vw,88px)', lineHeight:'.95' }}>{p.name}</h1>
          <p className="muted" style={{ marginTop:'8px', fontSize:'15px' }}>{p.desc}</p>
        </div>
      </div>

      <section className="sec">
        <div className="pdg">
          <div className="rv pds" style={{ transitionDelay:'0ms' }}>
            <div className="pds-lb">El reto</div>
            <p style={{ fontSize:'15px', lineHeight:'1.75', color:'var(--muted)' }}>{p.challenge}</p>
          </div>
          <div className="rv pds" style={{ transitionDelay:'120ms' }}>
            <div className="pds-lb">La solución</div>
            <p style={{ fontSize:'15px', lineHeight:'1.75', color:'var(--muted)' }}>{p.solution}</p>
          </div>
        </div>

        <div className="rv pds" style={{ transitionDelay:'200ms', borderBottom:'none' }}>
          <div className="pds-lb">Stack utilizado</div>
          <div className="tags" style={{ marginTop:'10px' }}>
            {p.tags.map(t => <span key={t} className="tag tag-a">{t}</span>)}
          </div>
        </div>

        <div className="rv" style={{ transitionDelay:'260ms', marginTop:'48px' }}>
          <div className="pds-lb">Galería</div>
          <div className="img-grid" style={{ marginTop:'12px' }}>
            {[1,2,3,4].map(n => (
              <div key={n} className="img-cell">
                <Ph label={`Captura ${n} — ${p.name}`} bg={p.bg} color={p.ac} />
              </div>
            ))}
          </div>
        </div>

        <div className="rv" style={{ transitionDelay:'100ms', marginTop:'56px', display:'flex', gap:'14px', flexWrap:'wrap' }}>
          <button className="btn-p">Ver proyecto en vivo →</button>
          <button className="btn-g" onClick={() => nav('portfolio')}>Volver al portfolio</button>
        </div>
      </section>

      <Footer nav={nav} />
    </div>
  );
}

/* ── CONTACT ───────────────────────────────────────────── */
function ContactPage({ nav }) {
  const [sent, setSent] = useState(false);
  const [f, setF] = useState({ name:'', email:'', project:'', message:'' });
  const upd = (k, v) => setF(x => ({ ...x, [k]: v }));

  return (
    <div className="page" data-screen-label="06 Contacto">
      <section className="sec">
        <div className="sec-lb rv">Contacto</div>
        <h1 className="sec-h rv" style={{ transitionDelay:'60ms', marginBottom:'52px' }}>
          ¿Hablamos<span className="accent">?</span>
        </h1>
        <div className="cont-g">
          {/* INFO */}
          <div className="rv" style={{ transitionDelay:'80ms' }}>
            {[
              { lb:'Email',          val:'hola@oskinar.es'          },
              { lb:'LinkedIn',       val:'linkedin.com/in/oskinar'  },
              { lb:'GitHub',         val:'github.com/oskinar'       },
              { lb:'Disponibilidad', val:'Disponible · Q2 2026'     },
              { lb:'Respuesta',      val:'< 24 horas'               },
            ].map(c => (
              <div key={c.lb} className="ci">
                <div className="ci-lb">{c.lb}</div>
                <div className="ci-val">{c.val}</div>
              </div>
            ))}
          </div>

          {/* FORM */}
          <div className="rv" style={{ transitionDelay:'180ms' }}>
            {sent ? (
              <div style={{ padding:'52px', textAlign:'center', border:'1px solid var(--border)', borderRadius:'var(--r)' }}>
                <div style={{ fontFamily:'var(--dF)', fontSize:'80px', color:'var(--accent)', lineHeight:'1' }}>OK</div>
                <p className="muted" style={{ marginTop:'16px', fontSize:'14px', lineHeight:'1.6' }}>
                  Mensaje recibido.<br />Te respondo en menos de 24 horas.
                </p>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); if(f.name && f.email && f.message) setSent(true); }}>
                {[
                  { k:'name',    lb:'Nombre',   type:'text',  ph:'Tu nombre'          },
                  { k:'email',   lb:'Email',    type:'email', ph:'tu@email.com'        },
                  { k:'project', lb:'Proyecto', type:'text',  ph:'¿En qué trabajamos?' },
                ].map(fd => (
                  <div key={fd.k} className="ff">
                    <label className="fl">{fd.lb}</label>
                    <input className="fi" type={fd.type} placeholder={fd.ph}
                      value={f[fd.k]} onChange={e => upd(fd.k, e.target.value)}
                      required={fd.k !== 'project'} />
                  </div>
                ))}
                <div className="ff">
                  <label className="fl">Mensaje</label>
                  <textarea className="fi" placeholder="Cuéntame sobre tu proyecto..."
                    value={f.message} onChange={e => upd('message', e.target.value)} required />
                </div>
                <button type="submit" className="btn-p" style={{ width:'100%', justifyContent:'center' }}>
                  Enviar mensaje →
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
      <Footer nav={nav} />
    </div>
  );
}

Object.assign(window, { HomePage, AboutPage, BlogPage, PortfolioPage, ProjectPage, ContactPage });
