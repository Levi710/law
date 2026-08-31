const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

const carouselItemStr = `
function CarouselItem({ project, index, total, onClick }: any) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsub = useLayoutStore.subscribe((state) => {
      if (ref.current) {
        const vw = window.innerWidth / 100;
        const itemWidth = 55 * vw;
        const totalWidth = total * itemWidth;
        const paddingLeft = 50 * vw;
        const baseX = paddingLeft + index * itemWidth;
        let x = baseX - state.scrollY;
        const minX = -45 * vw;
        const maxX = totalWidth - 45 * vw;
        x = gsap.utils.wrap(minX, maxX, x);
        ref.current.style.transform = \`translateX(\${x}px)\`;
      }
    });
    return unsub;
  }, [index, total]);

  return (
    <div 
      ref={ref}
      onClick={onClick}
      className="absolute top-1/2 -translate-y-1/2 cursor-pointer shrink-0 w-[45vw] h-[60vh] flex flex-col justify-center items-center group z-30"
      style={{ pointerEvents: 'auto' }}
    >
      <DOMProxy id={project.id} className="absolute inset-0 w-full h-full" />
      <h2 className="text-white text-4xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 drop-shadow-lg text-center select-none" style={{ fontFamily: '"Playfair Display", serif' }}>
        {project.title}
      </h2>
    </div>
  );
}
`;

const homeStr = `
function Home() {
  const navigate = useNavigate();
  const isContactOpen = useLayoutStore(state => state.isContactOpen);

  const handleProjectClick = (id: string) => {
    useLayoutStore.setState({ activeProjectId: id });
    navigate(\`/project/\${id}\`);
  };

  return (
    <div className="w-full min-h-[400vh]">
      {!isContactOpen && (
        <button 
          onClick={() => useLayoutStore.setState({ isContactOpen: true })} 
          className="fixed bottom-10 right-10 z-50 text-xs font-bold text-white uppercase tracking-widest hover:text-gold transition-colors"
        >
          CONTACT NOW
        </button>
      )}
      
      <div 
        className={\`fixed inset-0 pointer-events-none flex items-center pl-32 z-20 transition-opacity duration-1000 \${isContactOpen ? 'opacity-0' : 'opacity-100'}\`}
      >
        <h1 className="text-ivory text-[8vw] font-bold leading-none select-none drop-shadow-lg" style={{ fontFamily: '"Playfair Display", serif' }}>
          Samatva Nyaya
          <span className="block text-2xl font-normal mt-4 tracking-widest text-gold uppercase">Nyaya Sabke Liye. Samadhan Aapke Sath.</span>
        </h1>
      </div>
      
      <div 
        className={\`fixed inset-0 z-30 transition-opacity duration-1000 \${isContactOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}\`}
      >
        {PROJECTS_DATA.map((project, i) => (
          <CarouselItem 
            key={project.id}
            project={project}
            index={i}
            total={PROJECTS_DATA.length}
            onClick={() => handleProjectClick(project.id)}
          />
        ))}
      </div>
    </div>
  );
}
`;

// Replace from function Home to just before function Project
code = code.replace(/function Home\(\) \{[\s\S]*?(?=function Project)/, carouselItemStr + '\n' + homeStr + '\n');
fs.writeFileSync('src/App.tsx', code);
