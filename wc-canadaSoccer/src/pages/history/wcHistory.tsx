import React from 'react';

const WcHistory: React.FC = () => {
  return (
    <div className="history-page-wrapper">
      <div className="newspaper-container">
        
        {/* Newspaper Header Banner */}
        <header className="newspaper-header">
          <h1 className="newspaper-title-main">THE FOOTBALL CHRONICLE</h1>
          <p className="newspaper-tagline">Recording the Glorious History of the World's Game since 1930</p>
        </header>

        {/* Newspaper Meta info row */}
        <div className="newspaper-meta-grid">
          <span>VOL. XCVI... No. 2026</span>
          <span>SPECIAL WORLD CUP EDITION</span>
          <span>PRICE: FIVE CENTS</span>
        </div>

        {/* Headline */}
        <h2 className="newspaper-headline">
          FROM URUGUAYAN SOIL TO GLOBAL DOMINANCE: THE EPIC OF THE WORLD CUP
        </h2>

        {/* Multi-column Body Text */}
        <div className="newspaper-columns">
          <p className="drop-cap">
            The story of the FIFA World Cup is a grand tapestry woven with threads of national pride, individual wizardry, and geopolitical drama. In the sweltering summer of 1930, thirteen pioneering nations gathered in Montevideo, Uruguay, to contest the inaugural world championship. Conceived by French visionary Jules Rimet, the tournament was a massive gamble that succeeded beyond all expectations, culminating in Uruguay defeating their neighbors Argentina in the Estadio Centenario.
          </p>

          <p>
            As the decades rolled by, the tournament grew from a modest tournament into a global obsession. The post-war era witnessed the emergence of Brazil's legendary "Joga Bonito", led by a seventeen-year-old prodigy named Pelé who captured the world's imagination in 1958. Brazil's mastery would yield three trophies in twelve years, establishing them as the spiritual custodians of the sport's artistic expression.
          </p>

          <div className="newspaper-illustration">
            <div className="newspaper-illustration-box">
              <svg viewBox="0 0 100 100" width="80" height="80">
                <circle cx="50" cy="50" r="30" fill="none" stroke="#1a1a1a" strokeWidth="2" />
                <path d="M 50 20 L 50 80" stroke="#1a1a1a" strokeWidth="2" />
                <path d="M 20 50 L 80 50" stroke="#1a1a1a" strokeWidth="2" />
                <path d="M 28 28 L 72 72" stroke="#1a1a1a" strokeWidth="2" />
                <path d="M 72 28 L 28 72" stroke="#1a1a1a" strokeWidth="2" />
                <circle cx="50" cy="50" r="10" fill="none" stroke="#1a1a1a" strokeWidth="2" />
              </svg>
            </div>
            <p className="newspaper-illustration-caption">
              Fig 1: The original classic leather-laced football used in early tournaments.
            </p>
          </div>

          <p>
            European nations responded with tactical revolution and industrial precision. Italy's defensive block, West Germany's stubborn resilience, and the "Total Football" of the 1974 Dutch side transformed soccer into a chess match played at breakneck speed. The rivalry between South American flair and European systemization became the defining motif of the World Cup, giving rise to iconic battles that would capture millions of viewers.
          </p>

          <p>
            By the time Diego Maradona dominated the 1986 edition in Mexico with his legendary "Hand of God" and solo wizardry, the World Cup was no longer just a sporting event; it was a cultural epoch. Modern icons like Zinédine Zidane, Ronaldo, Lionel Messi, and Cristiano Ronaldo have written their own chapters, elevating the sport to unprecedented commercial heights.
          </p>

          <p>
            In 2026, the tournament embarks on its most ambitious chapter yet. Expanding to 48 nations, the games will span three host nations—Canada, Mexico, and the United States. What began as a thirteen-team gathering in Montevideo has transformed into the absolute peak of human athletic theater, standing ready to write its next chapter on North American soil.
          </p>
        </div>

      </div>
    </div>
  );
};

export default WcHistory;
