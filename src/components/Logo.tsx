import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'card';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'card',
  size = 'md',
}) => {
  // Sizing definitions
  const heights = {
    sm: 'h-9',
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-20',
  };

  const isLightBackground = variant === 'light' || variant === 'card';
  const subtitleColor = isLightBackground ? '#1e293b' : '#f8fafc';

  return (
    <div
      className={`inline-flex items-center ${
        variant === 'card'
          ? 'bg-white px-3 py-1.5 rounded-xl shadow-md border border-slate-200/80 hover:shadow-lg transition'
          : ''
      } ${className}`}
    >
      <svg
        viewBox="0 0 380 165"
        className={`${heights[size]} w-auto max-w-full`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="bldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF5722" />
            <stop offset="100%" stopColor="#FF7043" />
          </linearGradient>
        </defs>

        <g transform="translate(10, 5)">
          {/* Hand Cuff (Navy Blue) */}
          <path
            d="M 12 95 L 24 95 L 20 128 L 8 128 Z"
            fill="#1E3A8A"
            stroke="#0F172A"
            strokeWidth="2"
          />
          <line x1="24" y1="95" x2="20" y2="128" stroke="#FFFFFF" strokeWidth="2" />

          {/* Hand & Palm (Warm flesh tone) */}
          <path
            d="M 24 100 
               C 42 102, 60 108, 88 113 
               C 98 114, 105 110, 108 104 
               C 110 99, 104 95, 93 93 
               L 70 91 
               C 84 90, 96 87, 101 83 
               C 105 79, 100 76, 88 77 
               L 68 79 
               C 77 76, 86 72, 88 68 
               C 90 64, 84 62, 75 63 
               L 56 69 
               C 46 73, 33 82, 24 100 Z"
            fill="#EDB68E"
            stroke="#5D3A1A"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />

          {/* Thumb */}
          <path
            d="M 36 90 C 40 80, 48 74, 55 76 C 58 78, 56 84, 49 89 Z"
            fill="#EDB68E"
            stroke="#5D3A1A"
            strokeWidth="1.8"
          />

          {/* Left Building */}
          <path
            d="M 32 55 L 45 46 L 45 86 L 32 88 Z"
            fill="url(#bldGrad)"
            stroke="#C83803"
            strokeWidth="1.2"
          />
          <line x1="36" y1="58" x2="41" y2="55" stroke="#FFFFFF" strokeWidth="2.5" />
          <line x1="36" y1="64" x2="41" y2="61" stroke="#FFFFFF" strokeWidth="2.5" />
          <line x1="36" y1="70" x2="41" y2="67" stroke="#FFFFFF" strokeWidth="2.5" />
          <line x1="36" y1="76" x2="41" y2="73" stroke="#FFFFFF" strokeWidth="2.5" />

          {/* Center Tall Building */}
          <path
            d="M 47 22 L 72 28 L 72 82 L 47 80 Z"
            fill="url(#bldGrad)"
            stroke="#C83803"
            strokeWidth="1.2"
          />
          <path d="M 47 22 L 59 13 L 72 28 Z" fill="#FF8A65" stroke="#C83803" strokeWidth="1.2" />
          <line x1="53" y1="31" x2="66" y2="34" stroke="#FFFFFF" strokeWidth="2.8" />
          <line x1="53" y1="40" x2="66" y2="43" stroke="#FFFFFF" strokeWidth="2.8" />
          <line x1="53" y1="49" x2="66" y2="52" stroke="#FFFFFF" strokeWidth="2.8" />
          <line x1="53" y1="58" x2="66" y2="61" stroke="#FFFFFF" strokeWidth="2.8" />
          <line x1="53" y1="67" x2="66" y2="70" stroke="#FFFFFF" strokeWidth="2.8" />
          <line x1="53" y1="75" x2="66" y2="78" stroke="#FFFFFF" strokeWidth="2.8" />

          {/* Right Building */}
          <path
            d="M 74 50 L 85 53 L 85 81 L 74 79 Z"
            fill="url(#bldGrad)"
            stroke="#C83803"
            strokeWidth="1.2"
          />
          <line x1="77" y1="58" x2="82" y2="60" stroke="#FFFFFF" strokeWidth="2.5" />
          <line x1="77" y1="65" x2="82" y2="67" stroke="#FFFFFF" strokeWidth="2.5" />
          <line x1="77" y1="72" x2="82" y2="74" stroke="#FFFFFF" strokeWidth="2.5" />

          {/* Cyan Vertical Separator */}
          <line
            x1="120"
            y1="14"
            x2="120"
            y2="108"
            stroke="#00A3E0"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* ACBR text */}
          <text
            x="134"
            y="54"
            fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
            fontSize="45"
            fontWeight="900"
            fill="#00A3E0"
            letterSpacing="1"
          >
            ACBR
          </text>

          {/* PASTAZA text */}
          <text
            x="134"
            y="98"
            fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
            fontSize="40"
            fontWeight="900"
            fill="#00A3E0"
            letterSpacing="2"
          >
            PASTAZA
          </text>

          {/* Subtitle: Tu Sede INMOBILIARIA */}
          <g transform="translate(18, 142)">
            <text
              x="0"
              y="0"
              fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
              fontSize="21"
              fontWeight="600"
              fill={subtitleColor}
              letterSpacing="1.2"
            >
              Tu Sede{' '}
              <tspan fontWeight="900" letterSpacing="3">
                INMOBILIARIA
              </tspan>
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
};
