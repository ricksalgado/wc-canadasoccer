import React from 'react';

const CanadaHistory: React.FC = () => {
  return (
    <div className="history-page-wrapper">
      <div className="newspaper-container">
        
        {/* Newspaper Header Banner */}
        <header className="newspaper-header">
          <h1 className="newspaper-title-main">THE FOOTBALL CHRONICLE</h1>
          <p className="newspaper-tagline">Standing on Guard: The Men's National Team on the World Stage</p>
        </header>

        {/* Newspaper Meta info row */}
        <div className="newspaper-meta-grid">
          <span>VOL. XCVI... No. 1986</span>
          <span>SPECIAL CANADIAN TRIBUTE EDITION</span>
          <span>PRICE: FIVE CENTS</span>
        </div>

        {/* Headline */}
        <h2 className="newspaper-headline">
          THE MAPLE LEAF AWAKES: THIRTY-SIX YEARS OF STRUGGLE AND REDEMPTION
        </h2>

        {/* Multi-column Body Text */}
        <div className="newspaper-columns">
          <p className="drop-cap">
            The history of Canadian men's soccer on the global stage is one of quiet determination, sudden breakthroughs, and immense passion. For decades, Canada was viewed primarily as a hockey nation, its soccer accomplishments relegated to regional competitions. Yet, in the hot Mexican summer of 1986, a group of determined amateurs and indoor-league veterans shocked the continent by qualifying for the FIFA World Cup under coach Tony Waiters.
          </p>

          <p>
            Placed in a group of giants alongside Michel Platini's France, Hungary, and the USSR, the Canadian squad was expected to fold. Instead, they displayed a defensive grit that earned the respect of the footballing world. In their opening match, they held the mighty French side scoreless for nearly eighty minutes before falling to a late Jean-Pierre Papin goal. Though they departed Mexico without a point or a goal, the foundation had been laid.
          </p>

          <div className="newspaper-illustration">
            <div className="newspaper-illustration-box">
              <svg viewBox="0 0 100 120" width="60" height="72">
                <path d="M10,10 L90,10 C90,10 90,80 50,110 C10,80 10,10 10,10 Z" fill="none" stroke="#1a1a1a" strokeWidth="3" />
                <path d="M50,30 L53,42 L65,42 L56,49 L60,62 L50,54 L40,62 L44,49 L35,42 L47,42 Z" fill="#1a1a1a" />
              </svg>
            </div>
            <p className="newspaper-illustration-caption">
              Fig 2: The vintage Maple Leaf crest representing Canadian defensive courage.
            </p>
          </div>

          <p>
            Then followed a long, painful thirty-six-year winter. Generations of talented Canadian players fought through CONCACAF qualifying campaigns only to fall short. The turning point arrived in 2021. Blessed with a generational crop of talent playing in Europe's top divisions—led by Bayern Munich's Alphonso Davies and Lille's Jonathan David—and guided by tactician John Herdman, Canada embarked on an historic run.
          </p>

          <p>
            Playing in sub-zero temperatures in Edmonton and hostile environments in Central America, the "Les Rouges" qualified top of CONCACAF for the 2022 World Cup in Qatar. On November 27, 2022, Alphonso Davies leapt into the desert air to head home a cross against Croatia, scoring Canada's first-ever Men's World Cup goal—a moment of pure relief and joy that echoed across the country.
          </p>

          <p>
            Now, under the tactical command of head coach Jesse Marsch, Canada Soccer prepares to host the world in 2026. Armed with elite speed, tournament experience, and the backing of millions of screaming fans at BC Place and BMO Field, the national team stands on guard, ready to claim their first-ever World Cup victory on home soil and write an unforgettable page of sporting history.
          </p>
        </div>

      </div>
    </div>
  );
};

export default CanadaHistory;
