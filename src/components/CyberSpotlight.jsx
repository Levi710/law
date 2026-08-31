import React from 'react';
import { ShieldAlert, CreditCard, Terminal, Mail } from 'lucide-react';

export default function CyberSpotlight({ onOpenConsultation }) {
  return (
    <section id="cyber" style={{ 
      position: 'relative', 
      padding: '5rem 1.5rem', 
      backgroundColor: 'transparent',
      overflow: 'hidden'
    }}>
      {/* Background Image Setup */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url("/images/cyber_matrix.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.15,
        zIndex: 0
      }}></div>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(to right, rgba(4, 7, 14, 0.95), rgba(4, 7, 14, 0.7))',
        zIndex: 1
      }}></div>

      <div className="container" style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        position: 'relative', 
        zIndex: 2,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '3rem',
        alignItems: 'center'
      }}>
        
        {/* Left Column */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <span style={{ width: '30px', height: '2px', backgroundColor: '#f43f5e' }}></span>
            <span style={{ color: 'var(--emerald)', fontWeight: 'bold', letterSpacing: '2px', fontSize: '0.875rem' }}>URGENT ASSISTANCE</span>
          </div>
          
          <h2 style={{ 
            color: 'var(--color-navy)', 
            fontSize: 'clamp(2rem, 4vw, 3rem)', 
            fontFamily: 'serif', 
            lineHeight: 1.2, 
            marginBottom: '1.5rem' 
          }}>
            Is Your Bank Account <span style={{ color: '#f43f5e' }}>Frozen</span> or Facing a <span style={{ color: 'var(--emerald)' }}>Cyber Crime Notice?</span>
          </h2>
          
          <p style={{ color: 'var(--color-gray)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
            Cyber fraud and unwarranted account freezes can disrupt your business and personal life. We provide immediate, strategic legal representation to communicate with cyber cells and unfreeze your accounts.
          </p>

          <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
            <div className="card-cyber" style={{
              display: 'flex',
              alignItems: 'flex-start',
              padding: '1.25rem',
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              border: '1px solid rgba(52, 211, 153, 0.2)',
              borderRadius: '8px'
            }}>
              <ShieldAlert color="var(--emerald)" size={24} style={{ flexShrink: 0, marginRight: '1rem', marginTop: '0.25rem' }} />
              <div>
                <h4 style={{ color: 'var(--color-navy)', fontSize: '1.1rem', marginBottom: '0.25rem' }}>Cyber Fraud Defence</h4>
                <p style={{ color: 'var(--color-gray)', fontSize: '0.875rem', margin: 0 }}>Representation against FIRs, 41A CrPC notices, and online harassment cases.</p>
              </div>
            </div>

            <div className="card-cyber" style={{
              display: 'flex',
              alignItems: 'flex-start',
              padding: '1.25rem',
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              border: '1px solid rgba(244, 63, 94, 0.2)',
              borderRadius: '8px'
            }}>
              <CreditCard color="#f43f5e" size={24} style={{ flexShrink: 0, marginRight: '1rem', marginTop: '0.25rem' }} />
              <div>
                <h4 style={{ color: 'var(--color-navy)', fontSize: '1.1rem', marginBottom: '0.25rem' }}>Bank Unfreeze Actions</h4>
                <p style={{ color: 'var(--color-gray)', fontSize: '0.875rem', margin: 0 }}>Liaison with investigating officers and nodal banks for immediate relief.</p>
              </div>
            </div>
          </div>

          <button 
            className="btn btn-emerald"
            onClick={() => onOpenConsultation && onOpenConsultation('Cyber & Bank Unfreeze')}
            style={{
              padding: '1rem 2rem',
              backgroundColor: 'var(--emerald)',
              color: 'var(--navy-deepest)',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              fontSize: '1rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              boxShadow: '0 4px 14px rgba(52, 211, 153, 0.4)',
              transition: 'transform 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Urgent Cyber & Unfreeze Legal Assistance
          </button>
        </div>

        {/* Right Column */}
        <div className="card-cyber" style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
        }}>
          {/* Header Bar */}
          <div style={{
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
            padding: '1rem 1.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <Terminal color="var(--emerald)" size={20} />
            <span style={{ color: 'var(--emerald)', fontFamily: 'monospace', fontSize: '0.9rem', letterSpacing: '1px' }}>
              CYBER_PROTECTION_CELL
            </span>
          </div>

          <div style={{ padding: '2rem 1.5rem' }}>
            <h3 style={{ color: 'var(--color-navy)', fontSize: '1.25rem', marginBottom: '1.5rem' }}>
              3-Step Account Unfreeze Procedure
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { step: '01', title: 'Case Analysis', desc: 'We review the hold notice and identify the investigating authority.' },
                { step: '02', title: 'Legal Notice & Drafting', desc: 'Drafting strong representations explaining the legitimacy of transactions.' },
                { step: '03', title: 'Police/Court Action', desc: 'Filing applications before Cyber Cell or relevant courts for unfreezing.' }
              ].map((item, index) => (
                <div key={index} style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '6px',
                  padding: '1rem',
                  display: 'flex',
                  gap: '1rem'
                }}>
                  <div style={{
                    color: 'rgba(0, 0, 0, 0.2)',
                    fontFamily: 'monospace',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    lineHeight: 1
                  }}>
                    {item.step}
                  </div>
                  <div>
                    <h5 style={{ color: 'var(--color-navy)', margin: '0 0 0.25rem 0', fontSize: '1rem' }}>{item.title}</h5>
                    <p style={{ color: 'var(--color-gray)', margin: 0, fontSize: '0.85rem' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              backgroundColor: 'rgba(244, 63, 94, 0.1)',
              border: '1px solid rgba(244, 63, 94, 0.2)',
              borderRadius: '6px',
              padding: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              justifyContent: 'center'
            }}>
              <Mail color="#f43f5e" size={20} />
              <span style={{ color: 'var(--color-navy)', fontSize: '0.9rem' }}>Email directly: <a href="mailto:samatvanyaya@gmail.com" style={{ color: '#f43f5e', textDecoration: 'none', fontWeight: 'bold' }}>samatvanyaya@gmail.com</a></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
