const { useState, useEffect, useRef, useCallback } = React;

/* ── GRAIN ─────────────────────────────────────────────── */
function GrainOverlay() {
  return <div className="grain" aria-hidden="true" />;
}

/* ── CURSOR ────────────────────────────────────────────── */
function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const pos     = useRef({ x: -100, y: -100 });
  const rPos    = useRef({ x: -100, y: -100 });
  const raf     = useRef(null);
  const exp     = useRef(false);

  useEffect(() => {
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${e.clientX - 4}px,${e.clientY - 4}px)`;
      const el  = document.elementFromPoint(e.clientX, e.clientY);
      const hot = !!el?.closest('a,button,[role="button"],input,textarea,[data-hot]');
      if (hot !== exp.current) {
        exp.current = hot;
        ringRef.current?.classList.toggle('exp', hot);
      }
    };
    const loop = () => {
      rPos.current.x += (pos.current.x - rPos.current.x) * .1;
      rPos.current.y += (pos.current.y - rPos.current.y) * .1;
      if (ringRef.current) {
        const sz  = exp.current ? 60 : 36;
        const off = sz / 2;
        ringRef.current.style.transform =
          `translate(${rPos.current.x - off}px,${rPos.current.y - off}px)`;
      }
      raf.current = requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', move);
    raf.current = requestAnimationFrame(loop);
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(raf.current); };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="c-dot" />
      <div ref={ringRef} className="c-ring" />
    </>
  );
}

/* ── NAV ───────────────────────────────────────────────── */
function Nav({ page, nav, onTheme, onTerm }) {
  const [sc, setSc] = useState(false);
  useEffect(() => {
    const fn = () => setSc(window.scrollY > 16);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = [
    { id: 'home',      label: 'Inicio'    },
    { id: 'about',     label: 'Sobre mí'  },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'blog',      label: 'Blog'      },
    { id: 'contact',   label: 'Contacto'  },
  ];

  return (
    <nav className={`nav${sc ? ' sc' : ''}`}>
      <button className="nav-logo" onClick={() => nav('home')}>
        OSK<span className="accent">.</span>
      </button>
      <div className="nav-links">
        {links.map(l => (
          <button
            key={l.id}
            className={`nav-lnk${page === l.id || (page === 'project' && l.id === 'portfolio') ? ' on' : ''}`}
            onClick={() => nav(l.id)}
          >
            {l.label}
          </button>
        ))}
      </div>
      <div className="nav-acts">
        <button className="nav-btn mono" onClick={onTerm} title="Terminal (`)">{'>`_`'[0]}_ </button>
        <button className="nav-btn"      onClick={onTheme} title="Cambiar tema">◐</button>
      </div>
    </nav>
  );
}

/* ── TERMINAL ──────────────────────────────────────────── */
const CMDS = {
  help:     `Comandos disponibles:\n  whoami    — Sobre Oskinar\n  skills    — Stack tecnológico\n  projects  — Proyectos\n  contact   — Contacto\n  clear     — Limpiar terminal\n  exit      — Cerrar terminal`,
  whoami:   `Oskinar — Desarrollador de apps y web.\nConstruyo experiencias digitales rápidas y elegantes.\nEspecializado en rendimiento y diseño técnico.`,
  skills:   `Frontend : Astro · React · TypeScript · Next.js\nMobile   : Flutter · Swift UI\nBackend  : Node.js · Deno · PostgreSQL\nDevOps   : Vercel · Cloudflare · Docker`,
  projects: `→ Arken Dashboard  — Panel SaaS de analíticas\n→ Nómada App       — App multiplataforma de viajes\n→ Espacio Brand    — Web para estudio creativo\n→ Merkado          — E-commerce de alta velocidad`,
  contact:  `Email    : hola@oskinar.es\nGitHub   : github.com/oskinar\nLinkedIn : linkedin.com/in/oskinar`,
  exit:     '__EXIT__',
  clear:    '__CLEAR__',
};

function Terminal({ open, onClose }) {
  const [hist,   setHist]   = useState([{ k: 'sys', t: 'Bienvenido al terminal de Oskinar v1.0\nEscribe "help" para ver los comandos disponibles.' }]);
  const [input,  setInput]  = useState('');
  const [cmdH,   setCmdH]   = useState([]);
  const [ci,     setCi]     = useState(-1);
  const inpRef = useRef(null);
  const endRef = useRef(null);

  useEffect(() => { if (open) setTimeout(() => inpRef.current?.focus(), 60); }, [open]);
  useEffect(() => { endRef.current?.scrollIntoView(); }, [hist]);

  const run = useCallback((cmd) => {
    const k = cmd.trim().toLowerCase();
    const r = CMDS[k];
    if (r === '__EXIT__')  { setHist(h => [...h, { k:'in', t:`> ${cmd}` }]); setTimeout(onClose, 300); return; }
    if (r === '__CLEAR__') { setHist([]); return; }
    setHist(h => [
      ...h,
      { k: 'in',  t: `> ${cmd}` },
      r ? { k: 'out', t: r }
        : { k: 'err', t: `Comando no reconocido: "${k}". Escribe "help".` },
    ]);
    setCmdH(h => [cmd, ...h]);
    setCi(-1);
  }, [onClose]);

  const onKey = (e) => {
    if (e.key === 'Enter' && input.trim()) { run(input); setInput(''); }
    else if (e.key === 'ArrowUp')   { e.preventDefault(); const n=Math.min(ci+1,cmdH.length-1); setCi(n); setInput(cmdH[n]||''); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); const n=Math.max(ci-1,-1);            setCi(n); setInput(n===-1?'':cmdH[n]); }
    else if (e.key === 'Escape') onClose();
  };

  if (!open) return null;
  return (
    <div className="t-ov" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="t-win">
        <div className="t-hdr">
          <div className="t-ctrls">
            <span className="tc r" onClick={onClose} />
            <span className="tc y" />
            <span className="tc g" />
          </div>
          <span className="t-ttl">oskinar — terminal</span>
        </div>
        <div className="t-body">
          {hist.map((ln, i) => (
            <div key={i} className={`tl-${ln.k}`}>
              {ln.t.split('\n').map((l, j) => <div key={j}>{l || '\u00a0'}</div>)}
            </div>
          ))}
          <div className="t-inp-r">
            <span className="accent mono">→</span>
            <input
              ref={inpRef}
              className="t-inp"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKey}
              spellCheck={false}
              autoComplete="off"
              placeholder="escribe un comando..."
            />
          </div>
          <div ref={endRef} />
        </div>
      </div>
    </div>
  );
}

/* ── FOOTER ────────────────────────────────────────────── */
function Footer({ nav }) {
  return (
    <footer className="footer">
      <span>© 2026 Oskinar</span>
      <span className="mono" style={{ letterSpacing: '.08em' }}>Diseñado y construido con cuidado.</span>
      <button
        onClick={() => nav('contact')}
        style={{ color: 'var(--accent)', fontFamily: 'var(--mF)', fontSize: '10px', letterSpacing: '.1em' }}
      >
        hola@oskinar.es
      </button>
    </footer>
  );
}

Object.assign(window, { GrainOverlay, CustomCursor, Nav, Terminal, Footer });
