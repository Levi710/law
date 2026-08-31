import React, { useState, useEffect, useRef } from 'react';
import { Search, Home, Users, FileText, Briefcase, FileCheck, ShieldAlert, CreditCard, CheckCircle2 } from 'lucide-react';

const SERVICES_DATA = [
  {
    id: 1,
    title: 'LAND & PROPERTY MATTERS',
    tag: 'Property & Real Estate',
    icon: Home,
    description: 'Comprehensive legal assistance for all real estate and property-related transactions and disputes.',
    bulletPoints: ['Title Verification', 'Mutation, Registry, Sale Deed', 'Partition, Land Disputes', 'Conversion/Diversion'],
    category: 'Property'
  },
  {
    id: 2,
    title: 'FAMILY & SETTLEMENT MATTERS',
    tag: 'Family & Succession',
    icon: Users,
    description: 'Expert guidance for family disputes, successions, and property settlements.',
    bulletPoints: ['Family Settlement Deed', 'Partition Deed', 'Inheritance & Succession', 'Property Disputes', 'Legal Notice & Advisory'],
    category: 'Property'
  },
  {
    id: 3,
    title: 'DOCUMENTATION SERVICES',
    tag: 'Legal Contracts & Deeds',
    icon: FileText,
    description: 'Drafting and vetting of all types of legal agreements and documents.',
    bulletPoints: ['Agreement Drafting', 'Rent Agreement, Affidavit', 'Indemnity, Power of Attorney', 'Notarization & Attestation'],
    category: 'ALL'
  },
  {
    id: 4,
    title: 'BUSINESS & COMPLIANCE',
    tag: 'Corporate & Tax',
    icon: Briefcase,
    description: 'Legal compliance, notices, and advisory services for businesses and individuals.',
    bulletPoints: ['GST Notices, Legal Notices', 'Recovery Matters', 'Vendor/Service Agreements', 'Labour Compliance, General Advisory'],
    category: 'ALL'
  },
  {
    id: 5,
    title: 'DUE DILIGENCE & LEGAL OPINION',
    tag: 'Verification & Audit',
    icon: FileCheck,
    description: 'Thorough verification and risk analysis of properties and transactions.',
    bulletPoints: ['Property Due Diligence', 'Title Search', 'Encumbrance Certificate', 'Legal Opinion, Risk Analysis'],
    category: 'Property'
  },
  {
    id: 6,
    title: 'CYBER CASES',
    tag: 'Specialized Legal Aid',
    icon: ShieldAlert,
    badge: 'SPECIALIZED',
    description: 'Representation and assistance for all types of cyber crimes and online harassment.',
    bulletPoints: ['Cyber Fraud, Online Harassment', 'Data Theft, Defamation', 'Cyber Bullying, IT Act', 'Legal Notice & Cyber Cell Representation'],
    category: 'Cyber Cases'
  },
  {
    id: 7,
    title: 'BANK ACCOUNT UNFREEZE',
    tag: 'Financial Disputes',
    icon: CreditCard,
    badge: 'URGENT',
    description: 'Immediate legal action to unfreeze bank accounts and resolve financial disputes.',
    bulletPoints: ['Account Frozen by Bank/Police', 'KYC Issues', 'Cheque Bounce/Fraud Holds', 'Legal Representation', 'Account Unfreeze Solutions'],
    category: 'Bank Unfreeze'
  }
];

export default function ServicesGrid({ onSelectServiceForBooking }) {
  const [activeCategory, setActiveCategory] = useState('ALL 7');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll('.reveal');
    cards.forEach((card) => observer.observe(card));

    return () => {
      cards.forEach((card) => observer.unobserve(card));
    };
  }, [activeCategory, searchQuery]);

  const filteredServices = SERVICES_DATA.filter((service) => {
    const matchesCategory =
      activeCategory === 'ALL 7' ||
      (activeCategory === 'Property' && service.category === 'Property') ||
      (activeCategory === 'Cyber Cases' && service.category === 'Cyber Cases') ||
      (activeCategory === 'Bank Unfreeze' && service.category === 'Bank Unfreeze');

    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      searchQuery === '' ||
      service.title.toLowerCase().includes(searchLower) ||
      service.description.toLowerCase().includes(searchLower) ||
      service.bulletPoints.some((point) => point.toLowerCase().includes(searchLower));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="services" style={{ padding: '5rem 1.5rem', backgroundColor: 'transparent' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p className="section-label" style={{ color: 'var(--gold)', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: '600' }}>PRACTICAL & RESULT-ORIENTED</p>
          <h2 className="section-title" style={{ color: 'var(--color-navy)', fontSize: '2.5rem', fontFamily: 'serif', marginBottom: '1rem' }}>
            OUR <span className="accent" style={{ color: 'var(--gold)' }}>PRACTICE AREAS</span>
          </h2>
          <p className="section-subtitle" style={{ color: 'var(--color-gray)', maxWidth: '600px', margin: '0 auto', marginBottom: '1.5rem' }}>
            Providing comprehensive legal solutions tailored to your unique challenges.
          </p>
          <div className="gold-rule" style={{ height: '2px', backgroundColor: 'var(--gold)', width: '60px', margin: '0 auto' }}></div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '3rem', gap: '1.5rem' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
            <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gold)' }} size={20} />
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 2.5rem',
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                border: '1px solid var(--gold)',
                borderRadius: '8px',
                color: 'var(--color-navy)',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
            {['ALL 7', 'Property', 'Cyber Cases', 'Bank Unfreeze'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '9999px',
                  border: '1px solid',
                  borderColor: activeCategory === cat 
                    ? (cat === 'Cyber Cases' ? 'var(--emerald)' : cat === 'Bank Unfreeze' ? '#f43f5e' : 'var(--gold)') 
                    : 'rgba(0,0,0,0.1)',
                  backgroundColor: activeCategory === cat
                    ? (cat === 'Cyber Cases' ? 'rgba(52, 211, 153, 0.1)' : cat === 'Bank Unfreeze' ? 'rgba(244, 63, 94, 0.1)' : 'rgba(201, 168, 76, 0.1)')
                    : 'transparent',
                  color: activeCategory === cat
                    ? (cat === 'Cyber Cases' ? 'var(--emerald)' : cat === 'Bank Unfreeze' ? '#f43f5e' : 'var(--gold)')
                    : 'var(--color-navy)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontWeight: '500'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {filteredServices.map((service) => {
            const isCyber = service.category === 'Cyber Cases' || service.category === 'Bank Unfreeze';
            const Icon = service.icon;
            
            return (
              <div 
                key={service.id} 
                className={`reveal ${isCyber ? 'card-cyber' : 'card'}`}
                style={{
                  backgroundColor: '#ffffff',
                  border: `1px solid ${isCyber ? (service.category === 'Cyber Cases' ? 'rgba(52, 211, 153, 0.3)' : 'rgba(244, 63, 94, 0.3)') : 'rgba(255, 255, 255, 0.1)'}`,
                  borderRadius: '12px',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                  opacity: 0,
                  transform: 'translateY(20px)',
                  transition: 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div className={isCyber ? (service.category === 'Cyber Cases' ? 'icon-box-emerald' : 'icon-box') : 'icon-box-gold'} style={{
                    padding: '0.75rem',
                    borderRadius: '8px',
                    backgroundColor: isCyber ? (service.category === 'Cyber Cases' ? 'rgba(52, 211, 153, 0.1)' : 'rgba(244, 63, 94, 0.1)') : 'rgba(201, 168, 76, 0.1)',
                    color: isCyber ? (service.category === 'Cyber Cases' ? 'var(--emerald)' : '#f43f5e') : 'var(--gold)',
                    display: 'inline-flex'
                  }}>
                    <Icon size={24} />
                  </div>
                  {service.badge && (
                    <span style={{
                      fontSize: '0.7rem',
                      fontWeight: 'bold',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px',
                      backgroundColor: service.category === 'Bank Unfreeze' ? 'rgba(244, 63, 94, 0.2)' : 'rgba(52, 211, 153, 0.2)',
                      color: service.category === 'Bank Unfreeze' ? '#f43f5e' : 'var(--emerald)',
                      letterSpacing: '1px'
                    }}>
                      {service.badge}
                    </span>
                  )}
                </div>

                <div style={{ fontSize: '0.75rem', color: isCyber ? (service.category === 'Cyber Cases' ? 'var(--emerald)' : '#f43f5e') : 'var(--gold)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>
                  {service.tag}
                </div>
                
                <h3 style={{ color: 'var(--color-navy)', fontSize: '1.25rem', fontFamily: 'serif', marginBottom: '0.75rem', lineHeight: '1.3' }}>
                  {service.title}
                </h3>
                
                <p style={{ color: 'var(--color-gray)', fontSize: '0.9rem', marginBottom: '1.5rem', flexGrow: 1 }}>
                  {service.description}
                </p>
                
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginBottom: '1.5rem', flexGrow: 2 }}>
                  {service.bulletPoints.map((point, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '0.5rem', color: 'var(--color-gray)', fontSize: '0.85rem' }}>
                      <CheckCircle2 size={16} style={{ 
                        marginRight: '0.5rem', 
                        marginTop: '0.1rem',
                        flexShrink: 0,
                        color: isCyber ? (service.category === 'Cyber Cases' ? 'var(--emerald)' : '#f43f5e') : 'var(--gold)' 
                      }} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={() => onSelectServiceForBooking(service.title)}
                  className={isCyber ? 'btn-emerald' : 'btn-outline'}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '6px',
                    border: '1px solid',
                    borderColor: isCyber ? (service.category === 'Cyber Cases' ? 'var(--emerald)' : '#f43f5e') : 'var(--gold)',
                    backgroundColor: 'transparent',
                    color: isCyber ? (service.category === 'Cyber Cases' ? 'var(--emerald)' : '#f43f5e') : 'var(--gold)',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    marginTop: 'auto'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = isCyber ? (service.category === 'Cyber Cases' ? 'var(--emerald)' : '#f43f5e') : 'var(--gold)';
                    e.currentTarget.style.color = 'var(--navy-deepest)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = isCyber ? (service.category === 'Cyber Cases' ? 'var(--emerald)' : '#f43f5e') : 'var(--gold)';
                  }}
                >
                  Consult Now
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
