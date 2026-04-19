const { useState, useEffect, useRef } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{"accent":"#d4ff47","grain":true,"ticker":true}/*EDITMODE-END*/;

function App() {
  const [page,    setPage]    = useState(() => localStorage.getItem('osk_page') || 'home');
  const [proj,    setProj]    = useState(null);
  const [termOpen,setTermOpen]= useState(false);
  const [tweaksOn,setTweaksOn]= useState(false);
  const [tweaks,  setTweaks]  = useState(() => {
    try { return JSON.parse(localStorage.getItem('osk_tweaks')) || TWEAK_DEFAULTS; }
    catch { return TWEAK_DEFAULTS; }
  });

  /* ── NAVIGATION ──────────────────────────────────────── */
  const nav = (target, data = null) => {
    document.documentElement.scrollTop = 0;
    setProj(data);
    setPage(target);
    localStorage.setItem('osk_page', target);
  };

  /* ── THEME ───────────────────────────────────────────── */
  const toggleTheme = () => {
    const html = document.documentElement;
    html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
  };

  /* ── TERMINAL KEY  ───────────────────────────────────── */
  useEffect(() => {
    const fn = (e) => {
      if (e.key === '`' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setTermOpen(t => !t);
      }
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);

  /* ── TWEAKS BRIDGE ───────────────────────────────────── */
  useEffect(() => {
    const fn = (e) => {
      if (e.data?.type === '__activate_edit_mode')   setTweaksOn(true);
      if (e.data?.type === '__deactivate_edit_mode') setTweaksOn(false);
    };
    window.addEventListener('message', fn);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', fn);
  }, []);

  /* ── APPLY ACCENT ────────────────────────────────────── */
  useEffect(() => {
    document.documentElement.style.setProperty('--accent', tweaks.accent);
    // derive aD / aM from accent hex
    const hex = tweaks.accent;
    const r = parseInt(hex.slice(1,3),16);
    const g = parseInt(hex.slice(3,5),16);
    const b = parseInt(hex.slice(5,7),16);
    document.documentElement.style.setProperty('--aD', `rgba(${r},${g},${b},.10)`);
    document.documentElement.style.setProperty('--aM', `rgba(${r},${g},${b},.45)`);
    localStorage.setItem('osk_tweaks', JSON.stringify(tweaks));
  }, [tweaks]);

  /* ── GLOBAL SCROLL REVEAL ────────────────────────────── */
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('vis'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.1 });

    const sweep = () => {
      document.querySelectorAll('.rv:not(.vis)').forEach(el => obs.observe(el));
    };

    sweep();
    const mo = new MutationObserver(() => setTimeout(sweep, 60));
    const root = document.getElementById('root');
    if (root) mo.observe(root, { childList: true, subtree: true });
    return () => { obs.disconnect(); mo.disconnect(); };
  }, []);

  /* ── TWEAK HELPERS ───────────────────────────────────── */
  const setTweak = (key, val) => {
    const next = { ...tweaks, [key]: val };
    setTweaks(next);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: next }, '*');
  };

  const ACCENTS = ['#d4ff47','#ff6b35','#00d4ff','#e040fb','#ff3d6b','#ffca28'];

  /* ── RENDER PAGE ─────────────────────────────────────── */
  const renderPage = () => {
    switch (page) {
      case 'home':      return <HomePage      nav={nav} showTicker={tweaks.ticker} />;
      case 'about':     return <AboutPage     nav={nav} />;
      case 'portfolio': return <PortfolioPage nav={nav} />;
      case 'blog':      return <BlogPage      nav={nav} />;
      case 'project':   return <ProjectPage   nav={nav} proj={proj} />;
      case 'contact':   return <ContactPage   nav={nav} />;
      default:          return <HomePage      nav={nav} showTicker={tweaks.ticker} />;
    }
  };

  return (
    <>
      {tweaks.grain && <GrainOverlay />}
      <CustomCursor />

      <Nav
        page={page}
        nav={nav}
        onTheme={toggleTheme}
        onTerm={() => setTermOpen(t => !t)}
      />

      <Terminal open={termOpen} onClose={() => setTermOpen(false)} />

      {renderPage()}

      {/* ── TWEAKS PANEL ──────────────────────────────── */}
      {tweaksOn && (
        <div className="tw-panel">
          <div className="tw-hdr">Tweaks</div>

          <div className="tw-row">
            <span className="tw-lb">Color de acento</span>
            <div style={{ display:'flex', gap:'7px', flexWrap:'wrap' }}>
              {ACCENTS.map(c => (
                <button
                  key={c}
                  className={`tw-swatch${tweaks.accent === c ? ' sel' : ''}`}
                  style={{ background: c }}
                  onClick={() => setTweak('accent', c)}
                />
              ))}
            </div>
          </div>

          <div className="tw-row">
            <label className="tw-ck-row">
              <span className="tw-lb" style={{ marginBottom:0 }}>Textura grain</span>
              <input type="checkbox" checked={tweaks.grain}
                onChange={e => setTweak('grain', e.target.checked)} />
            </label>
          </div>

          <div className="tw-row">
            <label className="tw-ck-row">
              <span className="tw-lb" style={{ marginBottom:0 }}>Ticker de skills</span>
              <input type="checkbox" checked={tweaks.ticker}
                onChange={e => setTweak('ticker', e.target.checked)} />
            </label>
          </div>

          <div style={{ marginTop:'16px', paddingTop:'14px', borderTop:'1px solid var(--border)' }}>
            <button className="btn-g" style={{ width:'100%', justifyContent:'center', fontSize:'10px', padding:'8px 16px' }}
              onClick={() => setTermOpen(true)}>
              Abrir terminal (`)
            </button>
          </div>
        </div>
      )}
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
