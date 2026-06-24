import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Center } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import playersData from '../data/players.json';

// R3F 3D Trophy Component

interface Player {
  id: string;
  name: string;
  category: string;
  position: string;
  age: number;
  currentClub: string;
  stats: Record<string, number>;
  bio: string;
}

const Trophy: React.FC<{ scrollProgress: number }> = ({ scrollProgress }) => {
  const { scene } = useGLTF('/world_cup_trophy.glb');
  const trophyRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (trophyRef.current) {
      // Spins continuously + rotates extra based on scroll position
      trophyRef.current.rotation.y = state.clock.getElapsedTime() * 0.35 + scrollProgress * Math.PI * 1.5;
      
      // Zooms in and out slowly (scale ranges from 1.6 to 2.6)
      const scaleVal = 1.6 + scrollProgress * 1.0;
      trophyRef.current.scale.set(scaleVal, scaleVal, scaleVal);
      
      // Position offset on scroll
      trophyRef.current.position.y = -1.2 + scrollProgress * 0.2;
    }
  });

  return <primitive ref={trophyRef} object={scene} />;
};

const Homepage: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [randomPlayer] = useState<Player | null>(() => playersData && playersData.players.length > 0 ? playersData.players[Math.floor(Math.random() * playersData.players.length)] : null);
  
  // Countdown State
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isLive, setIsLive] = useState(false);

  // Hype Meter State
  const [hypeLevel, setHypeLevel] = useState(0);
  const [showHypeModal, setShowHypeModal] = useState(false);
  const [confettiParticles, setConfettiParticles] = useState<Array<{ id: number; x: number; y: number; color: string; angle: number; speed: number; rotation: number; }>>([]);
  const decayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Email form state
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [subEmail, setSubEmail] = useState('');

  // 1. Scroll listener for 3D Trophy Zoom
  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById('hero-section');
      if (!hero) return;
      const heroHeight = hero.offsetHeight;
      const scrollY = window.scrollY;
      const progress = Math.min(scrollY / heroHeight, 1);
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Select a random player for the FIFA Player Card


  // 3. Countdown logic (Target: World Cup kickoff, e.g. June 12, 2026)
  useEffect(() => {
    const targetDate = new Date('2026-06-12T19:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsLive(true); // Automatically turn live if date passes
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // 4. Hype Meter Decay Logic
  useEffect(() => {
    decayTimer.current = setInterval(() => {
      setHypeLevel((prev) => {
        if (prev <= 0) return 0;
        // Don't decay if already maxed out and modal is open
        if (prev >= 100) return 100;
        return prev - 2;
      });
    }, 400);

    return () => {
      if (decayTimer.current) clearInterval(decayTimer.current);
    };
  }, []);

  // 5. Hype Click Handler
  const handleHypeClick = () => {
    if (hypeLevel >= 100) return;
    
    setHypeLevel((prev) => {
      const next = prev + 12;
      if (next >= 100) {
        triggerConfettiExplosion();
        setShowHypeModal(true);
        return 100;
      }
      return next;
    });
  };

  // 6. Confetti particle emitter using GSAP
  const triggerConfettiExplosion = () => {
    const particles = Array.from({ length: 70 }).map((_, i) => ({
      id: i,
      x: 130, // center of the gauge panel (which is 260px wide)
      y: 120, // center anchor
      color: ['#DA291C', '#FFFFFF', '#FFD700', '#FF4D3F'][Math.floor(Math.random() * 4)],
      angle: Math.PI + Math.random() * Math.PI, // Arch upwards (180 to 360 deg)
      speed: 6 + Math.random() * 18,
      rotation: Math.random() * 360,
    }));
    setConfettiParticles(particles);
  };

  // 7. Animate Confetti with GSAP
  useGSAP(() => {
    if (confettiParticles.length > 0) {
      confettiParticles.forEach((p) => {
        gsap.fromTo(`#confetti-${p.id}`,
          { x: 0, y: 0, rotation: 0, opacity: 1, scale: 1 },
          {
            x: Math.cos(p.angle) * p.speed * 12,
            y: Math.sin(p.angle) * p.speed * 12,
            rotation: p.rotation + 540,
            opacity: 0,
            scale: 0.2,
            duration: 1.6 + Math.random() * 0.8,
            ease: 'power3.out',
            onComplete: () => {
              if (p.id === confettiParticles.length - 1) {
                setConfettiParticles([]);
              }
            }
          }
        );
      });
    }
  }, [confettiParticles]);

  // 8. Player Cards GSAP Stagger Reveal
  useGSAP(() => {
    // Reveal decorative player action silhouettes popping out from behind the trophy
    gsap.fromTo('.hero-player-card.p1', 
      { x: '160%', y: '100%', scale: 0.1, opacity: 0 },
      { x: '0%', y: '0%', scale: 1, opacity: 1, duration: 1.3, ease: 'back.out(1.2)', delay: 0.5 }
    );
    gsap.fromTo('.hero-player-card.p2', 
      { x: '130%', y: '-100%', scale: 0.1, opacity: 0 },
      { x: '0%', y: '0%', scale: 1, opacity: 1, duration: 1.3, ease: 'back.out(1.2)', delay: 0.7 }
    );
    gsap.fromTo('.hero-player-card.p3', 
      { x: '-160%', y: '100%', scale: 0.1, opacity: 0 },
      { x: '0%', y: '0%', scale: 1, opacity: 1, duration: 1.3, ease: 'back.out(1.2)', delay: 0.9 }
    );
    gsap.fromTo('.hero-player-card.p4', 
      { x: '-130%', y: '-100%', scale: 0.1, opacity: 0 },
      { x: '0%', y: '0%', scale: 1, opacity: 1, duration: 1.3, ease: 'back.out(1.2)', delay: 1.1 }
    );
  }, []);

  const handleModalClose = () => {
    setShowHypeModal(false);
    setHypeLevel(0);
    setEmailSubscribed(false);
    setSubEmail('');
  };

  const handleSubscribeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subEmail) return;
    setEmailSubscribed(true);
  };

  // Convert Hype Level percentage to needle rotation angle
  // 0% -> -90deg, 100% -> 90deg
  const needleAngle = -90 + (hypeLevel / 100) * 180;

  return (
    <main className="main-content">
      {/* 1. IMMERSION HERO SECTION */}
      <section id="hero-section" className="hero-section">
        <div className="hero-bg-overlay"></div>
        
        {/* Layer 1: Player Cards popping up behind the 3D Trophy */}
        <div className="hero-players-layer">
          <div className="hero-player-card p1">
            <div className="player-card-img-placeholder">
              <svg viewBox="0 0 100 100" fill="#ffffff" width="50" height="50">
                <circle cx="50" cy="30" r="18" />
                <path d="M50,52 C30,52 15,68 15,85 L85,85 C85,68 70,52 50,52 Z" />
              </svg>
            </div>
            <div className="p-name">A. Davies</div>
            <div className="p-meta">LB / #19</div>
          </div>
          <div className="hero-player-card p2">
            <div className="player-card-img-placeholder">
              <svg viewBox="0 0 100 100" fill="#ffffff" width="50" height="50">
                <circle cx="50" cy="30" r="18" />
                <path d="M50,52 C30,52 15,68 15,85 L85,85 C85,68 70,52 50,52 Z" />
              </svg>
            </div>
            <div className="p-name">J. David</div>
            <div className="p-meta">ST / #20</div>
          </div>
          <div className="hero-player-card p3">
            <div className="player-card-img-placeholder">
              <svg viewBox="0 0 100 100" fill="#ffffff" width="50" height="50">
                <circle cx="50" cy="30" r="18" />
                <path d="M50,52 C30,52 15,68 15,85 L85,85 C85,68 70,52 50,52 Z" />
              </svg>
            </div>
            <div className="p-name">S. Eustáquio</div>
            <div className="p-meta">CM / #7</div>
          </div>
          <div className="hero-player-card p4">
            <div className="player-card-img-placeholder">
              <svg viewBox="0 0 100 100" fill="#ffffff" width="50" height="50">
                <circle cx="50" cy="30" r="18" />
                <path d="M50,52 C30,52 15,68 15,85 L85,85 C85,68 70,52 50,52 Z" />
              </svg>
            </div>
            <div className="p-name">M. Crépeau</div>
            <div className="p-meta">GK / #16</div>
          </div>
        </div>

        {/* Layer 0: React Three Fiber Canvas (Foreground) */}
        <div className="hero-canvas-container">
          <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
            <ambientLight intensity={1.5} />
            <directionalLight position={[10, 10, 5]} intensity={2.5} />
            <pointLight position={[-10, -5, -10]} intensity={1.5} />
            <Suspense fallback={null}>
              <Center>
                <Trophy scrollProgress={scrollProgress} />
              </Center>
            </Suspense>
          </Canvas>
        </div>

        {/* Foreground Content */}
        <div className="hero-title-container">
          <span className="hero-tag">WE STAND ON GUARD</span>
          <h1 className="hero-title">Canada Soccer</h1>
          <p className="hero-subtitle">
            Embracing the world stage. Celebrate the Men's National Team as we host the 2026 FIFA World Cup in Vancouver and Toronto.
          </p>
        </div>
      </section>

      {/* 2. THE ROSTER BANNER */}
      <section className="roster-banner-section">
        <div className="roster-banner-container">
          <div className="roster-banner-info">
            <h2 className="roster-banner-title">
              Meet the <span>26 Heroes</span> Heading to the World Cup
            </h2>
            <p className="roster-banner-desc">
              From local fields to global giants, Canada's roster is packed with elite speed, veteran structure, and relentless passion. Click below to inspect our tactical units.
            </p>
            <Link to="/roster" className="cta-button">
              SEE ALL 26 HEROES
            </Link>
          </div>

          <div className="roster-banner-card-wrapper">
            {randomPlayer && (
              <div className="fifa-card">
                <div className="fifa-card-header">
                  <div className="fifa-rating-badge">
                    <span className="fifa-ovr">{randomPlayer.stats.OVR}</span>
                    <span className="fifa-pos">{randomPlayer.position}</span>
                  </div>
                  <div className="fifa-crest">
                    <svg viewBox="0 0 100 120" width="32" height="38">
                      <path d="M10,10 L90,10 C90,10 90,80 50,110 C10,80 10,10 10,10 Z" fill="#DA291C" />
                      <path d="M50,30 L53,42 L65,42 L56,49 L60,62 L50,54 L40,62 L44,49 L35,42 L47,42 Z" fill="#FFFFFF" />
                      <rect x="48" y="58" width="4" height="12" fill="#FFFFFF" />
                    </svg>
                  </div>
                </div>

                <div className="fifa-portrait-area">
                  <div className="fifa-card-avatar">
                    <svg viewBox="0 0 100 100" fill="#ffffff" width="80" height="80">
                      <circle cx="50" cy="30" r="18" />
                      <path d="M50,52 C30,52 15,68 15,85 L85,85 C85,68 70,52 50,52 Z" />
                    </svg>
                  </div>
                </div>

                <div className="fifa-card-name">{randomPlayer.name}</div>

                <div className="fifa-stats-grid">
                  <div className="fifa-stat-item">
                    <div className="fifa-stat-info">
                      <span className="fifa-stat-label">PAC</span>
                      <span className="fifa-stat-value">{randomPlayer.stats.PAC}</span>
                    </div>
                    <div className="fifa-stat-bar-bg">
                      <div className="fifa-stat-bar-fill" style={{ width: `${randomPlayer.stats.PAC}%` }}></div>
                    </div>
                  </div>
                  <div className="fifa-stat-item">
                    <div className="fifa-stat-info">
                      <span className="fifa-stat-label">SHO</span>
                      <span className="fifa-stat-value">{randomPlayer.stats.SHO}</span>
                    </div>
                    <div className="fifa-stat-bar-bg">
                      <div className="fifa-stat-bar-fill" style={{ width: `${randomPlayer.stats.SHO}%` }}></div>
                    </div>
                  </div>
                  <div className="fifa-stat-item">
                    <div className="fifa-stat-info">
                      <span className="fifa-stat-label">PAS</span>
                      <span className="fifa-stat-value">{randomPlayer.stats.PAS}</span>
                    </div>
                    <div className="fifa-stat-bar-bg">
                      <div className="fifa-stat-bar-fill" style={{ width: `${randomPlayer.stats.PAS}%` }}></div>
                    </div>
                  </div>
                  <div className="fifa-stat-item">
                    <div className="fifa-stat-info">
                      <span className="fifa-stat-label">DRI</span>
                      <span className="fifa-stat-value">{randomPlayer.stats.DRI}</span>
                    </div>
                    <div className="fifa-stat-bar-bg">
                      <div className="fifa-stat-bar-fill" style={{ width: `${randomPlayer.stats.DRI}%` }}></div>
                    </div>
                  </div>
                  <div className="fifa-stat-item">
                    <div className="fifa-stat-info">
                      <span className="fifa-stat-label">DEF</span>
                      <span className="fifa-stat-value">{randomPlayer.stats.DEF}</span>
                    </div>
                    <div className="fifa-stat-bar-bg">
                      <div className="fifa-stat-bar-fill" style={{ width: `${randomPlayer.stats.DEF}%` }}></div>
                    </div>
                  </div>
                  <div className="fifa-stat-item">
                    <div className="fifa-stat-info">
                      <span className="fifa-stat-label">PHY</span>
                      <span className="fifa-stat-value">{randomPlayer.stats.PHY}</span>
                    </div>
                    <div className="fifa-stat-bar-bg">
                      <div className="fifa-stat-bar-fill" style={{ width: `${randomPlayer.stats.PHY}%` }}></div>
                    </div>
                  </div>
                </div>

                <div className="fifa-card-metadata">
                  <span>AGE: {randomPlayer.age}</span>
                  <span>{randomPlayer.currentClub}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. MATCH CENTER & HYPOMETRO */}
      <section className="match-center-section">
        <div className="match-center-container">
          
          {/* Left Side: Countdown & Scoreboard */}
          <div className="next-game-panel">
            <span className="panel-tag">MATCH CENTER</span>
            
            {!isLive ? (
              <>
                <h3 className="panel-title">COUNTDOWN TO OPENER</h3>
                <div className="countdown-grid">
                  <div className="countdown-box">
                    <div className="countdown-number">{timeLeft.days}</div>
                    <div className="countdown-label">DAYS</div>
                  </div>
                  <div className="countdown-box">
                    <div className="countdown-number">{timeLeft.hours}</div>
                    <div className="countdown-label">HRS</div>
                  </div>
                  <div className="countdown-box">
                    <div className="countdown-number">{timeLeft.minutes}</div>
                    <div className="countdown-label">MINS</div>
                  </div>
                  <div className="countdown-box">
                    <div className="countdown-number">{timeLeft.seconds}</div>
                    <div className="countdown-label">SECS</div>
                  </div>
                </div>
                <div className="match-details-row">
                  <span className="match-badge">GROUP A</span>
                  <span>CANADA VS ARGENTINA</span>
                  <span>19:00 PM EST</span>
                </div>
              </>
            ) : (
              <div className="live-scoreboard">
                <div className="live-badge-row">
                  <span className="live-indicator">
                    <span className="live-dot"></span> LIVE
                  </span>
                  <span className="live-minute">78' MIN</span>
                </div>
                <div className="scoreboard-teams">
                  <div className="scoreboard-team">
                    <svg viewBox="0 0 100 120" width="36" height="42">
                      <path d="M10,10 L90,10 C90,10 90,80 50,110 C10,80 10,10 10,10 Z" fill="#DA291C" />
                      <path d="M50,30 L53,42 L65,42 L56,49 L60,62 L50,54 L40,62 L44,49 L35,42 L47,42 Z" fill="#FFFFFF" />
                    </svg>
                    <span className="scoreboard-team-name">CAN</span>
                  </div>
                  <div className="scoreboard-score-box">
                    <span>2</span>
                    <span className="scoreboard-divider">-</span>
                    <span>1</span>
                  </div>
                  <div className="scoreboard-team">
                    <svg viewBox="0 0 100 100" width="36" height="42">
                      <rect width="100" height="100" rx="10" fill="#00205B" />
                      <path d="M 0,0 L 100,100 M 0,100 L 100,0" stroke="#FFFFFF" strokeWidth="8" />
                      <path d="M 0,0 L 100,100 M 0,100 L 100,0" stroke="#DA291C" strokeWidth="4" />
                      <circle cx="50" cy="50" r="16" fill="#00205B" stroke="#FFFFFF" strokeWidth="4" />
                      <polygon points="50,40 53,48 61,48 55,53 57,61 50,56 43,61 45,53 39,48 47,48" fill="#FFD700" />
                    </svg>
                    <span className="scoreboard-team-name">USA</span>
                  </div>
                </div>
                <div className="live-goalscorers">
                  <p>CAN: J. David 22', A. Davies 64'</p>
                  <p>USA: C. Pulisic 41'</p>
                </div>
              </div>
            )}

            <button 
              className="sim-switch-btn" 
              onClick={() => setIsLive(!isLive)}
            >
              {isLive ? 'VIEW COUNTDOWN TIMER' : 'SIMULATE LIVE MATCH'}
            </button>
          </div>

          {/* Right Side: Hype Meter */}
          <div className="hype-meter-panel">
            <span className="panel-tag">THE HYPOMETRO</span>
            
            <div className="hype-gauge-container">
              {/* Confetti Emitter Overlay */}
              <div className="confetti-overlay">
                {confettiParticles.map((p) => (
                  <div 
                    key={p.id}
                    id={`confetti-${p.id}`}
                    className="confetti-particle"
                    style={{
                      left: `${p.x}px`,
                      top: `${p.y}px`,
                      backgroundColor: p.color,
                    }}
                  />
                ))}
              </div>

              <svg viewBox="0 0 260 180" className="gauge-svg">
                {/* Background Arc */}
                <path d="M 30 150 A 100 100 0 0 1 230 150" className="gauge-background" />
                
                {/* Colored Zone Arcs */}
                {/* Bleh: angle 0 to 60 deg (30 to 96 x-coord) */}
                <path d="M 30 150 A 100 100 0 0 1 96 63" className="gauge-segment-bleh" />
                {/* Hyped: angle 60 to 120 deg (96 to 164 x-coord) */}
                <path d="M 96 63 A 100 100 0 0 1 164 63" className="gauge-segment-hype" />
                {/* Extreme: angle 120 to 180 deg (164 to 230 x-coord) */}
                <path d="M 164 63 A 100 100 0 0 1 230 150" className="gauge-segment-extreme" />

                {/* Rotating Needle */}
                <polygon 
                  points="125,150 130,45 135,150" 
                  className="gauge-needle"
                  style={{ transform: `rotate(${needleAngle}deg)` }}
                />
                
                {/* Center Pin */}
                <circle cx="130" cy="150" r="10" className="gauge-needle-center" />
              </svg>

              <div className="hype-labels">
                <span className="label-bleh">Bleh</span>
                <span className="label-hyped">Hyped!</span>
              </div>
            </div>

            <div className="hype-value-display">
              {hypeLevel < 30 ? '❄️ CHILLING...' : hypeLevel < 70 ? '🔥 HEATING UP!' : hypeLevel < 100 ? '⚡ SO HYPED!' : '🇨🇦 STAND ON GUARD!'}
            </div>

            <button className="hype-btn" onClick={handleHypeClick}>
              CLICK TO HYPE UP ({hypeLevel}%)
            </button>
          </div>

        </div>
      </section>

      {/* 4. SPONSORS & PARTNERS INFINITE MARQUEE */}
      <section className="sponsors-section">
        <h3 className="sponsors-title">OFFICIAL SPONSORS & PARTNERS</h3>
        <div className="marquee-container">
          <div className="marquee-content">
            {/* Sponsor 1: Nike */}
            <div className="sponsor-logo-box">
              <svg viewBox="0 0 200 100" className="sponsor-logo-svg">
                <text x="50%" y="60%" textAnchor="middle" fontSize="36" fontWeight="900" fill="#111111">NIKE</text>
              </svg>
            </div>
            {/* Sponsor 2: Nutella */}
            <div className="sponsor-logo-box">
              <svg viewBox="0 0 200 100" className="sponsor-logo-svg">
                <text x="50%" y="60%" textAnchor="middle" fontSize="32" fontWeight="800" fill="#7C2D12" fontFamily="serif">nutella</text>
              </svg>
            </div>
            {/* Sponsor 3: BMO */}
            <div className="sponsor-logo-box">
              <svg viewBox="0 0 200 100" className="sponsor-logo-svg">
                <text x="50%" y="60%" textAnchor="middle" fontSize="42" fontWeight="900" fill="#0284C7">BMO</text>
              </svg>
            </div>
            {/* Sponsor 4: Toyota */}
            <div className="sponsor-logo-box">
              <svg viewBox="0 0 200 100" className="sponsor-logo-svg">
                <text x="50%" y="60%" textAnchor="middle" fontSize="32" fontWeight="700" fill="#111">TOYOTA</text>
              </svg>
            </div>
            {/* Sponsor 5: Canadian Tire */}
            <div className="sponsor-logo-box">
              <svg viewBox="0 0 200 100" className="sponsor-logo-svg">
                <text x="50%" y="60%" textAnchor="middle" fontSize="28" fontWeight="800" fill="#DA291C">CANADIAN TIRE</text>
              </svg>
            </div>
          </div>
          
          {/* Duplicate row for infinite scrolling loop */}
          <div className="marquee-content" aria-hidden="true">
            <div className="sponsor-logo-box">
              <svg viewBox="0 0 200 100" className="sponsor-logo-svg">
                <text x="50%" y="60%" textAnchor="middle" fontSize="36" fontWeight="900" fill="#111">NIKE</text>
              </svg>
            </div>
            <div className="sponsor-logo-box">
              <svg viewBox="0 0 200 100" className="sponsor-logo-svg">
                <text x="50%" y="60%" textAnchor="middle" fontSize="32" fontWeight="800" fill="#7C2D12" fontFamily="serif">nutella</text>
              </svg>
            </div>
            <div className="sponsor-logo-box">
              <svg viewBox="0 0 200 100" className="sponsor-logo-svg">
                <text x="50%" y="60%" textAnchor="middle" fontSize="42" fontWeight="900" fill="#0284C7">BMO</text>
              </svg>
            </div>
            <div className="sponsor-logo-box">
              <svg viewBox="0 0 200 100" className="sponsor-logo-svg">
                <text x="50%" y="60%" textAnchor="middle" fontSize="32" fontWeight="700" fill="#111">TOYOTA</text>
              </svg>
            </div>
            <div className="sponsor-logo-box">
              <svg viewBox="0 0 200 100" className="sponsor-logo-svg">
                <text x="50%" y="60%" textAnchor="middle" fontSize="28" fontWeight="800" fill="#DA291C">CANADIAN TIRE</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* 5. THE VOYAGEURS: FAN GALLERY CAROUSEL */}
      <section className="voyageurs-banner-section">
        <div className="voyageurs-banner-container">
          
          <div className="voyageurs-banner-header">
            <h2 className="voyageurs-banner-title">
              The <span>Voyageurs</span>
            </h2>
            <Link to="/voyageurs" className="cta-button" style={{ padding: '12px 28px', fontSize: '13px' }}>
              VIEW FAN WALL
            </Link>
          </div>

          <div className="voyageurs-banner-slider">
            <div className="fan-photo-card">
              <div className="fan-photo-bg">
                <svg viewBox="0 0 100 100" fill="#DA291C"><path d="M50,15 L80,45 L70,85 L30,85 L20,45 Z" /></svg>
              </div>
              <div className="fan-photo-overlay">
                <span className="fan-photo-caption">Sea of Red in Toronto</span>
                <span className="fan-photo-location">BMO Field</span>
              </div>
            </div>
            
            <div className="fan-photo-card">
              <div className="fan-photo-bg">
                <svg viewBox="0 0 100 100" fill="#DA291C"><path d="M50,15 L80,45 L70,85 L30,85 L20,45 Z" /></svg>
              </div>
              <div className="fan-photo-overlay">
                <span className="fan-photo-caption">Vancouver Welcomes the World</span>
                <span className="fan-photo-location">BC Place</span>
              </div>
            </div>

            <div className="fan-photo-card">
              <div className="fan-photo-bg">
                <svg viewBox="0 0 100 100" fill="#DA291C"><path d="M50,15 L80,45 L70,85 L30,85 L20,45 Z" /></svg>
              </div>
              <div className="fan-photo-overlay">
                <span className="fan-photo-caption">Fans Standing On Guard</span>
                <span className="fan-photo-location">Qualifying Run</span>
              </div>
            </div>

            <div className="fan-photo-card">
              <div className="fan-photo-bg">
                <svg viewBox="0 0 100 100" fill="#DA291C"><path d="M50,15 L80,45 L70,85 L30,85 L20,45 Z" /></svg>
              </div>
              <div className="fan-photo-overlay">
                <span className="fan-photo-caption">Generations of Supporter Clubs</span>
                <span className="fan-photo-location">Halifax Chapter</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* HYPE REGISTER MODAL BANNER */}
      <div className={`hype-modal-overlay ${showHypeModal ? 'open' : ''}`}>
        <div className="hype-modal-card">
          <button className="hype-modal-close" onClick={handleModalClose}>×</button>
          
          {!emailSubscribed ? (
            <>
              <div className="hype-modal-icon">🇨🇦</div>
              <h3 className="hype-modal-title">WE ARE HYPED!</h3>
              <p className="hype-modal-text">
                The nation stands on guard. Subscribe to the official Canada Fan Registry and be aware of match tickets, team selections, and tactical news!
              </p>
              
              <form className="hype-modal-form" onSubmit={handleSubscribeSubmit}>
                <input 
                  type="email" 
                  required 
                  className="hype-modal-input" 
                  placeholder="Enter your email address" 
                  value={subEmail}
                  onChange={(e) => setSubEmail(e.target.value)}
                />
                <button type="submit" className="hype-modal-submit">
                  REGISTER NOW
                </button>
              </form>
            </>
          ) : (
            <div className="thank-you-card">
              <div className="thank-you-icon">🍁</div>
              <h3 className="thank-you-title">WELCOME ABOARD!</h3>
              <p className="thank-you-text">
                Your fan registry registration is successful. Get ready to sing the national anthem on the world stage!
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Homepage;
