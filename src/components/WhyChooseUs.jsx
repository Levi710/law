import React from 'react';
import { UserCheck, Award, IndianRupee, ShieldCheck, Headphones, ArrowRight } from 'lucide-react';

const pillars = [
  {
    icon: <UserCheck size={28} />,
    title: 'Personalized Attention',
    description: 'We treat every case with individual care, understanding your unique situation to provide tailored legal strategies.'
  },
  {
    icon: <Award size={28} />,
    title: 'Expert Solutions',
    description: 'Our experienced team brings deep legal knowledge and innovative thinking to solve complex challenges.'
  },
  {
    icon: <IndianRupee size={28} />,
    title: 'Cost-Effective',
    description: 'We provide transparent billing and strive for efficient resolutions to minimize your legal expenses.'
  },
  {
    icon: <ShieldCheck size={28} />,
    title: 'Proactive Approach',
    description: 'Anticipating potential issues before they arise to protect your interests and prevent future disputes.'
  },
  {
    icon: <Headphones size={28} />,
    title: 'Online Consultation',
    description: 'Accessible legal advice from the comfort of your home, breaking geographical barriers for your convenience.'
  }
];

export default function WhyChooseUs({ onOpenConsultation }) {
  return (
    <section id="why-choose-us" style={{ padding: '80px 0', backgroundColor: 'var(--navy-deepest)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="section-label">THE SAMATVA ADVANTAGE</span>
          <h2 className="section-title">
            WHY CHOOSE <span className="accent">SAMATVA NYAYA</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
            We combine legal excellence with genuine care, ensuring that your rights are protected and justice is served efficiently.
          </p>
          <div className="gold-rule" style={{ margin: '20px auto 0' }}></div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '24px',
          marginBottom: '60px'
        }}>
          {pillars.map((pillar, index) => (
            <div key={index} className="card reveal" style={{ padding: '32px 24px', textAlign: 'center', height: '100%' }}>
              <div className="icon-box-gold" style={{ margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {pillar.icon}
              </div>
              <h3 style={{ 
                fontFamily: 'serif', 
                color: 'var(--white)', 
                fontSize: '1.25rem', 
                marginBottom: '16px' 
              }}>
                {pillar.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        <div className="card" style={{ 
          border: '2px solid var(--gold)', 
          padding: '48px 32px', 
          textAlign: 'center',
          backgroundColor: 'var(--navy)',
          borderRadius: '12px'
        }}>
          <h3 style={{ 
            fontFamily: 'serif', 
            color: 'var(--gold-light)', 
            fontSize: '2rem', 
            marginBottom: '16px' 
          }}>
            ONLINE CONSULTATION AVAILABLE
          </h3>
          <p style={{ color: 'var(--white)', fontSize: '1.1rem', marginBottom: '8px' }}>
            Get expert legal advice from anywhere in India.
          </p>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
            Email: samatvanyaya@gmail.com
          </p>
          <button 
            className="btn btn-gold" 
            onClick={onOpenConsultation}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem', padding: '16px 32px' }}
          >
            Schedule Consultation <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
