import React, { useEffect, useRef, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { Canvas, useThree } from '@react-three/fiber';
import Lenis from 'lenis';
import { create } from 'zustand';
import * as THREE from 'three';
import { Scene } from './components/Scene';

export const PROJECTS_DATA = [
  {
    id: 'hero',
    title: 'Samatva Nyaya',
    subtitle: 'Nyaya Sabke Liye, Samadhan Aapke Sath!',
    image: '/images/supreme_court.jpg',
    description: 'We provide practical, ethical, and decisive legal solutions. From complex land disputes to modern cyber fraud resolution, our expert legal cell ensures your rights are protected across India.'
  },
  {
    id: 'services',
    title: 'Practice Areas',
    subtitle: 'Practical & Result-Oriented',
    image: '/images/samatva_logo.jpg',
    description: 'Explore our 7 core services including Property & Real Estate, Family & Succession, Corporate Compliance, Due Diligence, and Legal Contracts.'
  },
  {
    id: 'cyber',
    title: 'Cyber Cell',
    subtitle: 'Urgent Bank Unfreeze & Cyber Fraud',
    image: '/images/cyber_matrix.jpg',
    description: 'Facing a sudden bank account freeze or a cyber crime notice? Our specialized Cyber Protection Cell acts immediately to resolve KYC issues, fraud holds, and online harassment.'
  },
  {
    id: 'about',
    title: 'About Us',
    subtitle: 'Balancing Justice & Resolving Disputes',
    image: '/images/lady_justice.jpg',
    description: 'Our mission is rooted in the principles of Truth (Satya) and Justice (Nyaya). We combine rigorous legal strategy with empathy to guide our clients through complex challenges.'
  }
];

interface LayoutState {
  proxies: Record<string, DOMRect>;
  scrollY: number;
  velocity: number;
  activeProjectId: string | null;
  isContactOpen: boolean;
}

export const useLayoutStore = create<LayoutState>(() => ({
  proxies: {},
  scrollY: 0,
  velocity: 0,
  activeProjectId: null,
  isContactOpen: false,
}));

function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on('scroll', (e: any) => {
      useLayoutStore.setState({ scrollY: e.scroll, velocity: e.velocity });
    });

    return () => {
      lenis.destroy();
    };
  }, []);
  return null;
}

function ContactOverlay() {
  const isContactOpen = useLayoutStore(state => state.isContactOpen);
  
  if (!isContactOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto bg-transparent animate-[fadeIn_1s_ease-out_0.5s_both]">
      <div className="max-w-md w-full text-center text-white px-6">
        <p className="text-xl leading-relaxed mb-8 font-medium">
          Get in touch with our expert legal team for immediate representation, counsel, and practical solutions.
        </p>
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 via-yellow-500 to-rose-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative flex bg-black rounded-full p-1 items-center">
            <input 
              type="email" 
              placeholder="Email address" 
              className="w-full bg-transparent border-none text-white px-6 py-3 outline-none"
            />
            <button className="bg-white text-black rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mr-1 hover:bg-gray-200 transition-colors">
              ➔
            </button>
          </div>
        </div>
      </div>
      
      <button 
        onClick={() => useLayoutStore.setState({ isContactOpen: false })}
        className="absolute bottom-10 right-10 text-xs font-bold text-white uppercase tracking-widest hover:text-gold transition-colors"
      >
        CLOSE
      </button>
    </div>
  );
}


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
        ref.current.style.transform = "translateX(${x}px)";
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

function DOMProxy({ id, className }: { id: string, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lastRectStr = '';
    const measure = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const state = useLayoutStore.getState();
        
        const absoluteRect: any = {
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height,
          top: rect.top,
          right: rect.right,
          bottom: rect.bottom,
          left: rect.left,
        };

        if (id === 'project-hero') {
           absoluteRect.top = rect.top + state.scrollY;
           absoluteRect.bottom = rect.bottom + state.scrollY;
        } else {
           absoluteRect.left = rect.left + state.scrollY;
           absoluteRect.right = rect.right + state.scrollY;
        }
        
        const newRectStr = JSON.stringify(absoluteRect);
        if (lastRectStr !== newRectStr) {
          lastRectStr = newRectStr;
          useLayoutStore.setState((state) => ({
            proxies: {
              ...state.proxies,
              [id]: absoluteRect,
            },
          }));
        }
      }
    };

    measure();
    window.addEventListener('resize', measure);
    const observer = new MutationObserver(measure);
    if (ref.current) {
      observer.observe(document.body, { childList: true, subtree: true, attributes: true });
    }

    return () => {
      window.removeEventListener('resize', measure);
      observer.disconnect();
      useLayoutStore.setState((state) => {
        const newProxies = { ...state.proxies };
        delete newProxies[id];
        return { proxies: newProxies };
      });
    };
  }, [id]);

  return <div ref={ref} className={className} style={{ opacity: 0 }} />;
}

function CameraSetup() {
  const { camera, size } = useThree();
  useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera || (camera as any).isPerspectiveCamera) {
      const perspective = 600;
      const fov = (180 * (2 * Math.atan(size.height / 2 / perspective))) / Math.PI;
      (camera as any).fov = fov;
      camera.position.z = perspective;
      camera.updateProjectionMatrix();
    }
  }, [size, camera]);
  return null;
}

function Home() {
  const navigate = useNavigate();
  const isContactOpen = useLayoutStore(state => state.isContactOpen);

  const handleProjectClick = (id: string) => {
    useLayoutStore.setState({ activeProjectId: id });
    navigate(`/project/${id}`);
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
  const project = PROJECTS_DATA.find(p => p.id === id);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    useLayoutStore.setState({ scrollY: 0 });
  }, []);

  const handleBack = () => {
    useLayoutStore.setState({ activeProjectId: null });
    navigate('/');
  };

  if (!project) return null;

  return (
    <div className="w-full min-h-[200vh] flex flex-col items-center relative z-0 bg-ivory text-charcoal animate-[fadeIn_0.5s_ease-out]">
      <div className="w-full px-10 py-8 flex justify-between fixed top-0 mix-blend-difference z-50">
        <button onClick={handleBack} className="text-xl font-bold text-white uppercase tracking-widest hover:text-gold transition-colors">← Back</button>
      </div>

      <div className="relative z-20 w-full min-h-screen">
        <DOMProxy id="project-hero" className="w-full h-[70vh]" />
        
        <div className="w-full max-w-4xl mx-auto mt-20 p-8">
          <h1 className="text-6xl font-bold mb-4 text-navy" style={{ fontFamily: '"Playfair Display", serif' }}>{project.title}</h1>
          <p className="text-2xl text-gold mb-12 uppercase tracking-widest border-b border-charcoal/20 pb-8">{project.subtitle}</p>
        </div>
        
        <div className="w-full pb-32">
          {project.id === 'hero' && (
            <div className="w-full max-w-4xl mx-auto px-8 text-xl leading-relaxed text-gray">
              <p>{project.description}</p>
            </div>
          )}
          {project.id === 'about' && <AboutValues />}
          {project.id === 'services' && <ServicesGrid onSelectServiceForBooking={() => {}} />}
          {project.id === 'cyber' && <CyberSpotlight onOpenConsultation={() => {}} />}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  useEffect(() => {
    const unsub = useLayoutStore.subscribe((state) => {
      document.body.style.setProperty('--scroll-y', `${state.scrollY}px`);
    });
    return unsub;
  }, []);

  return (
    <BrowserRouter>
      <SmoothScroll />
      <ContactOverlay />
      <div className="fixed inset-0 z-10 pointer-events-none">
        <Canvas style={{ pointerEvents: 'none' }}>
          <CameraSetup />
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<Project />} />
      </Routes>
    </BrowserRouter>
  );
}
