import React, { useState } from 'react';
import playersData from '../../data/players.json';


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

interface PlayerCardProps {
  player: Player;
  onClick: (player: Player) => void;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, onClick }) => (
  <div
    key={player.id}
    className="roster-player-card-box"
    onClick={() => onClick(player)}
  >
    <div className="card-image-container">
      <span className="player-jersey-number">#</span>
      <div className="card-player-avatar">
        <svg viewBox="0 0 100 100" fill="#DA291C" width="70" height="70">
          <circle cx="50" cy="30" r="18" />
          <path d="M50,52 C30,52 15,68 15,85 L85,85 C85,68 70,52 50,52 Z" />
        </svg>
      </div>
    </div>
    <div className="card-info-area">
      <h3 className="card-player-name">{player.name}</h3>
      <ul className="card-details-list">
        <li>
          <span className="card-details-label">Position</span>
          <span>{player.position}</span>
        </li>
        <li>
          <span className="card-details-label">Age</span>
          <span>{player.age}</span>
        </li>
        <li>
          <span className="card-details-label">Team</span>
          <span>{player.currentClub}</span>
        </li>
      </ul>
    </div>
  </div>
);

const Roster: React.FC = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  // Group players by category
  const defenders = playersData.players.filter((p) => p.category === 'defenders');
  const midfielders = playersData.players.filter((p) => p.category === 'midfielders');
  const attackers = playersData.players.filter((p) => p.category === 'attackers');
  const crew = playersData.crew;

  const handlePlayerClick = (player: Player) => {
    setSelectedPlayer(player);
  };

  const handleCloseModal = () => {
    setSelectedPlayer(null);
  };

  return (
    <section className="roster-page">
      <div className="roster-page-header">
        <h1 className="page-title">THE 2026 <span>HEROES</span></h1>
        <p className="page-subtitle">
          Canada Soccer Men's National Team. Separated by tactical zones. Click on any player to unlock their detailed FIFA profile and bio.
        </p>
      </div>

      {/* Defenders Category */}
      <h2 className="roster-section-heading">DEFENDERS & GOALKEEPERS</h2>
      <div className="roster-grid">
        {defenders.map((player) => (
          <PlayerCard key={player.id} player={player} onClick={handlePlayerClick} />
        ))}
      </div>

      {/* Midfielders Category */}
      <h2 className="roster-section-heading">MIDFIELDERS</h2>
      <div className="roster-grid">
        {midfielders.map((player) => (
          <PlayerCard key={player.id} player={player} onClick={handlePlayerClick} />
        ))}
      </div>

      {/* Attackers Category */}
      <h2 className="roster-section-heading">ATTACKERS</h2>
      <div className="roster-grid">
        {attackers.map((player) => (
          <PlayerCard key={player.id} player={player} onClick={handlePlayerClick} />
        ))}
      </div>

      {/* Crew Section - Non clickable */}
      <h2 className="roster-section-heading">CREW & STAFF</h2>
      <div className="roster-grid">
        {crew.map((member) => (
          <div 
            key={member.id} 
            className="roster-player-card-box crew-card"
          >
            <div className="card-image-container">
              <div className="card-player-avatar">
                <svg viewBox="0 0 100 100" fill="#0B0C10" width="70" height="70">
                  <circle cx="50" cy="30" r="18" />
                  <path d="M50,52 C30,52 15,68 15,85 L85,85 C85,68 70,52 50,52 Z" />
                </svg>
              </div>
            </div>
            <div className="card-info-area">
              <h3 className="card-player-name">{member.name}</h3>
              <ul className="card-details-list">
                <li>
                  <span className="card-details-label">Role</span>
                  <span>{member.jobTitle}</span>
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* PLAYER MODAL OVERLAY */}
      <div className={`player-modal-overlay ${selectedPlayer ? 'open' : ''}`}>
        {selectedPlayer && (
          <div className="player-modal-content">
            <button className="player-modal-close-btn" onClick={handleCloseModal}>×</button>
            
            <div className="player-modal-inner-grid">
              
              {/* Left Side: FIFA Card */}
              <div className="player-modal-left">
                <div className="fifa-card" style={{ transform: 'none', margin: '0 auto' }}>
                  <div className="fifa-card-header">
                    <div className="fifa-rating-badge">
                      <span className="fifa-ovr">{selectedPlayer.stats.OVR}</span>
                      <span className="fifa-pos">{selectedPlayer.position}</span>
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

                  <div className="fifa-card-name">{selectedPlayer.name}</div>

                  <div className="fifa-stats-grid">
                    <div className="fifa-stat-item">
                      <div className="fifa-stat-info">
                        <span className="fifa-stat-label">PAC</span>
                        <span className="fifa-stat-value">{selectedPlayer.stats.PAC}</span>
                      </div>
                      <div className="fifa-stat-bar-bg">
                        <div className="fifa-stat-bar-fill" style={{ width: `${selectedPlayer.stats.PAC}%` }}></div>
                      </div>
                    </div>
                    <div className="fifa-stat-item">
                      <div className="fifa-stat-info">
                        <span className="fifa-stat-label">SHO</span>
                        <span className="fifa-stat-value">{selectedPlayer.stats.SHO}</span>
                      </div>
                      <div className="fifa-stat-bar-bg">
                        <div className="fifa-stat-bar-fill" style={{ width: `${selectedPlayer.stats.SHO}%` }}></div>
                      </div>
                    </div>
                    <div className="fifa-stat-item">
                      <div className="fifa-stat-info">
                        <span className="fifa-stat-label">PAS</span>
                        <span className="fifa-stat-value">{selectedPlayer.stats.PAS}</span>
                      </div>
                      <div className="fifa-stat-bar-bg">
                        <div className="fifa-stat-bar-fill" style={{ width: `${selectedPlayer.stats.PAS}%` }}></div>
                      </div>
                    </div>
                    <div className="fifa-stat-item">
                      <div className="fifa-stat-info">
                        <span className="fifa-stat-label">DRI</span>
                        <span className="fifa-stat-value">{selectedPlayer.stats.DRI}</span>
                      </div>
                      <div className="fifa-stat-bar-bg">
                        <div className="fifa-stat-bar-fill" style={{ width: `${selectedPlayer.stats.DRI}%` }}></div>
                      </div>
                    </div>
                    <div className="fifa-stat-item">
                      <div className="fifa-stat-info">
                        <span className="fifa-stat-label">DEF</span>
                        <span className="fifa-stat-value">{selectedPlayer.stats.DEF}</span>
                      </div>
                      <div className="fifa-stat-bar-bg">
                        <div className="fifa-stat-bar-fill" style={{ width: `${selectedPlayer.stats.DEF}%` }}></div>
                      </div>
                    </div>
                    <div className="fifa-stat-item">
                      <div className="fifa-stat-info">
                        <span className="fifa-stat-label">PHY</span>
                        <span className="fifa-stat-value">{selectedPlayer.stats.PHY}</span>
                      </div>
                      <div className="fifa-stat-bar-bg">
                        <div className="fifa-stat-bar-fill" style={{ width: `${selectedPlayer.stats.PHY}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Details and Bio */}
              <div className="player-modal-right">
                <h2 className="player-modal-title">{selectedPlayer.name}</h2>
                <div className="player-modal-meta">
                  {selectedPlayer.position} | {selectedPlayer.currentClub} | AGE {selectedPlayer.age}
                </div>
                
                <h4 className="player-modal-bio-title">PLAYER PROFILE</h4>
                <p className="player-modal-bio-text">{selectedPlayer.bio}</p>
                
                <div className="player-modal-stats-summary">
                  <div className="modal-stat-box">
                    <div className="modal-stat-value">{selectedPlayer.stats.OVR}</div>
                    <div className="modal-stat-label">OVR</div>
                  </div>
                  <div className="modal-stat-box">
                    <div className="modal-stat-value">{selectedPlayer.stats.PAC}</div>
                    <div className="modal-stat-label">PAC</div>
                  </div>
                  <div className="modal-stat-box">
                    <div className="modal-stat-value">{selectedPlayer.stats.PHY}</div>
                    <div className="modal-stat-label">PHY</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>

    </section>
  );
};

export default Roster;
