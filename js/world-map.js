/* SKY TRADERS - INTERACTIVE WORLD EXPORT MAP */

document.addEventListener('DOMContentLoaded', () => {
  renderWorldExportMap();
});

function renderWorldExportMap() {
  const container = document.getElementById('map-container');
  if (!container) return;

  // Origin & Destinations (SVG Coordinates on 1000x500 map)
  const origin = { name: "India (Tamil Nadu)", x: 675, y: 265 };

  const destinations = [
    { name: "Dubai", x: 590, y: 235 },
    { name: "Malaysia", x: 745, y: 290 },
    { name: "Singapore", x: 755, y: 300 },
    { name: "Sri Lanka", x: 680, y: 295 },
    { name: "Oman", x: 575, y: 245 },
    { name: "Qatar", x: 570, y: 230 },
    { name: "Europe", x: 480, y: 160 },
    { name: "Canada", x: 220, y: 140 },
    { name: "Australia", x: 840, y: 380 }
  ];

  // SVG Markup Construction
  let arcsSVG = '';
  let nodesSVG = '';

  destinations.forEach((dest, index) => {
    // Curved Bezier Control Point
    const dx = dest.x - origin.x;
    const dy = dest.y - origin.y;
    const cx = origin.x + dx / 2 - (dy > 0 ? 30 : -30);
    const cy = origin.y + dy / 2 - 40;

    const pathD = `M ${origin.x} ${origin.y} Q ${cx} ${cy} ${dest.x} ${dest.y}`;

    // Animated Arc
    arcsSVG += `
      <path d="${pathD}" fill="none" stroke="url(#arcGradient)" stroke-width="2" class="route-arc" />
      <path d="${pathD}" fill="none" stroke="#D4AF37" stroke-width="1" opacity="0.25" />
    `;

    // Destination Node
    nodesSVG += `
      <g transform="translate(${dest.x}, ${dest.y})" class="map-node">
        <circle r="10" fill="none" stroke="#D4AF37" opacity="0.6" class="beacon-ring" style="animation-delay: ${index * 0.3}s" />
        <circle r="4.5" fill="#D4AF37" />
        <text x="12" y="4" font-family="'Outfit', sans-serif" font-size="11" font-weight="700" fill="#F8F5EE" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))">
          ${dest.name}
        </text>
      </g>
    `;
  });

  // Origin (India) Node
  const originSVG = `
    <g transform="translate(${origin.x}, ${origin.y})" class="origin-node">
      <circle r="18" fill="none" stroke="#FF5722" class="beacon-ring" />
      <circle r="7" fill="#FF5722" stroke="#FFFFFF" stroke-width="2" />
      <text x="-35" y="-14" font-family="'Outfit', sans-serif" font-size="12" font-weight="900" fill="#FFD54F" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.9))">
        ORIGIN: INDIA
      </text>
    </g>
  `;

  const worldSVG = `
    <svg id="world-map-svg" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FF5722" stop-opacity="0.9" />
          <stop offset="50%" stop-color="#F3E5AB" stop-opacity="1" />
          <stop offset="100%" stop-color="#D4AF37" stop-opacity="0.8" />
        </linearGradient>
      </defs>

      <!-- World Map Outline (Simplified Vector Continents) -->
      <g fill="rgba(11, 61, 46, 0.45)" stroke="rgba(212, 175, 55, 0.25)" stroke-width="1">
        <!-- North America -->
        <path d="M 120 80 Q 200 60 280 100 T 320 180 T 200 240 T 100 160 Z" />
        <!-- South America -->
        <path d="M 280 250 Q 340 280 320 380 T 270 440 T 240 320 Z" />
        <!-- Europe -->
        <path d="M 450 90 Q 520 80 540 140 T 470 170 T 430 120 Z" />
        <!-- Africa -->
        <path d="M 460 185 Q 560 200 560 320 T 480 390 T 420 280 Z" />
        <!-- Asia -->
        <path d="M 550 80 Q 750 60 840 140 T 800 280 T 640 240 Z" />
        <!-- India Subcontinent -->
        <path d="M 640 200 Q 690 220 675 285 Q 645 250 640 200 Z" fill="rgba(212, 175, 55, 0.25)" stroke="#D4AF37" stroke-width="1.5" />
        <!-- Australia -->
        <path d="M 780 340 Q 880 330 890 410 T 800 420 Z" />
      </g>

      <!-- Route Arcs -->
      <g>${arcsSVG}</g>

      <!-- Destination Nodes -->
      <g>${nodesSVG}</g>

      <!-- Origin Node -->
      <g>${originSVG}</g>
    </svg>

    <div class="map-legend">
      <div class="legend-item"><span class="dot-origin"></span> Export Origin (Tamil Nadu, India)</div>
      <div class="legend-item"><span class="dot-dest"></span> Global Import Destinations</div>
    </div>
  `;

  container.innerHTML = worldSVG;
}
