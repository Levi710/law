import React, { useEffect, useRef } from 'react';
import { Compass, Shield, Award, Eye, HeartHandshake } from 'lucide-react';

const AboutValues = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: Unobserve after revealing to only animate once
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const elements = containerRef.current.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  const values = [
    {
      icon: Shield,
      title: 'Integrity',
      subtitle: 'सत्य एवं निष्ठा',
      description: 'We adhere strictly to ethical legal practices, ensuring absolute transparency and honesty in every consultation and representation.'
    },
    {
      icon: Award,
      title: 'Commitment',
      subtitle: 'समर्पण',
      description: 'Our dedication to your cause is unwavering. We pursue justice with relentless determination until the best possible outcome is achieved.'
    },
    {
      icon: Eye,
      title: 'Clarity',
      subtitle: 'स्पष्टता',
      description: 'We decode complex legal jargon into clear, actionable advice, keeping you fully informed at every stage of your legal journey.'
    },
    {
      icon: HeartHandshake,
      title: 'Empathy',
      subtitle: 'सहानुभूति',
      description: 'We understand the stress of legal disputes. Our approach combines sharp legal acumen with genuine compassion for our clients.'
    }
  ];

  return (
    <section 
      ref={containerRef}
      style={{
        position: 'relative',
        padding: '6rem 0',
        backgroundColor: 'transparent',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow divs */}
      <div style={{ position: 'absolute', top: '10%', left: '5%', width: '40vw', height: '40vw', background: 'var(--gold)', filter: 'blur(150px)', opacity: 0.05, borderRadius: '50%', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: '50vw', height: '50vw', background: 'var(--navy)', filter: 'blur(200px)', opacity: 0.5, borderRadius: '50%', zIndex: 0 }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header block */}
        <div style={{ maxWidth: '750px', margin: '0 auto 4rem auto', textAlign: 'center' }}>
          <div className="reveal" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <Compass className="section-label" size={24} style={{ color: 'var(--gold)' }} />
            <span className="section-label font-display" style={{ color: 'var(--gold)', fontWeight: 600, letterSpacing: '0.1em' }}>ABOUT SAMATVA NYAYA</span>
          </div>
          
          <h2 className="section-title reveal" style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem', lineHeight: 1.2 }}>
            Balancing Justice <span className="font-hindi" style={{ color: 'var(--gold)' }}>(समत्व)</span> & Resolving Disputes <span className="font-hindi" style={{ color: 'var(--gold)' }}>(न्याय)</span>
          </h2>
          
          <div className="gold-rule reveal" style={{ width: '80px', height: '3px', background: 'var(--gold)', margin: '0 auto 2rem auto' }} />
          
          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', color: 'var(--text-secondary)', fontSize: '1.125rem', lineHeight: 1.6 }}>
            <p>
              Samatva Nyaya was founded on a singular vision: to democratize access to premium legal counsel without compromising on excellence. We believe that true justice requires both a deep understanding of the law and a strategic approach to dispute resolution.
            </p>
            <p>
              Our team of seasoned advocates and legal strategists brings decades of combined experience across civil litigation, cyber law, and corporate disputes. We don't just fight cases; we secure solutions that safeguard your future.
            </p>
          </div>
        </div>

        {/* Values grid */}
        <div 
          id="values" 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
          }}
        >
          {values.map((value, index) => (
            <div 
              key={index} 
              className="card reveal" 
              style={{
                background: 'var(--navy-deep)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '1rem',
                padding: '2rem',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                transitionDelay: `${index * 0.1}s`
              }}
            >
              <div className="icon-box-gold" style={{ display: 'inline-flex', padding: '1rem', background: 'rgba(201, 168, 76, 0.1)', borderRadius: '0.75rem', color: 'var(--gold)', width: 'fit-content' }}>
                <value.icon size={32} />
              </div>
              
              <div>
                <h3 className="font-serif" style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {value.title}
                  <span className="font-hindi" style={{ color: 'var(--gold)', fontSize: '1.25rem' }}>{value.subtitle}</span>
                </h3>
              </div>
              
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <style>
        {`
          .reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s cubic-bezier(0.5, 0, 0, 1);
          }
          .reveal.visible {
            opacity: 1;
            transform: translateY(0);
          }
          .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5);
            border-color: rgba(201, 168, 76, 0.3);
          }
          @media (min-width: 768px) {
            #values {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          @media (min-width: 1024px) {
            #values {
              grid-template-columns: repeat(4, 1fr);
            }
          }
        `}
      </style>
    </section>
  );
};

export default AboutValues;
