import React from 'react';

const Voyagers: React.FC = () => {
  const fanPhotos = [
    {
      id: 1,
      title: "TORONTO RED WALL",
      desc: "Supporters standing on guard during the World Cup qualifier under the lights.",
      tall: false,
    },
    {
      id: 2,
      title: "MAPLE LEAF GIANTS",
      desc: "An massive tifo banner hoisted in Vancouver before kickoff.",
      tall: true,
    },
    {
      id: 3,
      title: "FLAG WAVE",
      desc: "Canadian flags wave endlessly throughout the ninety minutes of battle.",
      tall: false,
    },
    {
      id: 4,
      title: "FROZEN FORTRESS",
      desc: "Supporters braving -10°C weather in Edmonton to cheer Canada to victory.",
      tall: true,
    },
    {
      id: 5,
      title: "VOYAGEURS DRUMMERS",
      desc: "Leading the chants and keeping the heartbeat of the stadium alive.",
      tall: false,
    },
    {
      id: 6,
      title: "SEA OF SCARVES",
      desc: "Scarves held high in Halifax as the national anthem echoes.",
      tall: true,
    },
    {
      id: 7,
      title: "RED CARNIVAL",
      desc: "Fans celebrating outside the stadium hours before match kickoff.",
      tall: false,
    },
    {
      id: 8,
      title: "THE VOYAGEURS CHANT",
      desc: "A wall of sound backing the players on every single corner kick.",
      tall: false,
    }
  ];

  return (
    <section className="voyageurs-page">
      <div className="voyageurs-page-header">
        <h1 className="page-title">THE <span>VOYAGEURS</span> GALLERY</h1>
        <p className="page-subtitle">
          Capturing the spirit, frozen breath, massive tifos, and unmatched energy of the official Canada Soccer supporter group.
        </p>
      </div>

      {/* Masonry Grid */}
      <div className="voyageurs-masonry">
        {fanPhotos.map((photo) => (
          <div key={photo.id} className="masonry-item">
            <div className={`masonry-image-area ${photo.tall ? 'tall' : ''}`}>
              <svg viewBox="0 0 100 100" fill="#DA291C">
                {/* Maple Leaf Supporter SVG Graphic */}
                <path d="M50,15 L53,35 L75,35 L58,48 L64,70 L50,56 L36,70 L42,48 L25,35 L47,35 Z" opacity="0.35" />
                <path d="M50,45 L50,85" stroke="#DA291C" strokeWidth="6" opacity="0.25" />
              </svg>
            </div>
            <div className="masonry-caption-area">
              <h3 className="masonry-title">{photo.title}</h3>
              <p className="masonry-desc">{photo.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Join the Cruise CTA Card */}
      <div className="join-voyageurs-footer">
        <h2 className="join-title">JOIN THE CRUISE</h2>
        <p className="join-desc">
          Ready to raise your voice and stand on guard for the Maple Leaf? Join the official Voyageurs Supporter Group and secure your place in the active support section for the 2026 World Cup.
        </p>
        <a 
          href="https://thevoyageurs.org/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="join-btn"
        >
          JOIN THE VOYAGEURS SQUAD
        </a>
      </div>

    </section>
  );
};

export default Voyagers;
