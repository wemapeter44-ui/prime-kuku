// PRIME KUKU - SampleImage (PROTOTYPE ONLY)
// Draws simple sample illustrations so the site has pictures to work with.
// These are NOT real photos. Replace them with real photography by setting
// `image: '/images/your-photo.jpg'` on a product in src/data/products.js.

const SKIN = '#f3d9b8';
const SKIN_EDGE = '#d9b183';
const BONE = '#fbf6ea';

function Drumstick({ x, y, rotate = 0, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      <rect x="30" y="-7" width="60" height="14" rx="7" fill={BONE} stroke={SKIN_EDGE} strokeWidth="2" />
      <circle cx="92" cy="-8" r="9" fill={BONE} stroke={SKIN_EDGE} strokeWidth="2" />
      <circle cx="92" cy="8" r="9" fill={BONE} stroke={SKIN_EDGE} strokeWidth="2" />
      <ellipse cx="0" cy="0" rx="50" ry="34" fill={SKIN} stroke={SKIN_EDGE} strokeWidth="3" />
      <ellipse cx="-12" cy="-12" rx="22" ry="10" fill="#fff" opacity="0.35" />
    </g>
  );
}

function Wing({ x, y, rotate = 0, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      <path d="M50 0 L84 -7 L74 11 Z" fill={SKIN} stroke={SKIN_EDGE} strokeWidth="3" strokeLinejoin="round" />
      <ellipse cx="25" cy="2" rx="32" ry="19" fill={SKIN} stroke={SKIN_EDGE} strokeWidth="3" />
      <ellipse cx="-35" cy="0" rx="38" ry="24" fill={SKIN} stroke={SKIN_EDGE} strokeWidth="3" />
      <ellipse cx="-42" cy="-8" rx="16" ry="7" fill="#fff" opacity="0.35" />
    </g>
  );
}

function Breast({ x, y, rotate = 0, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      <path
        d="M-80 20 C-85 -45 10 -65 75 -25 C105 -5 85 50 20 60 C-35 68 -78 55 -80 20 Z"
        fill={SKIN}
        stroke={SKIN_EDGE}
        strokeWidth="3"
      />
      <path d="M-40 10 C-20 -15 20 -20 50 0" fill="none" stroke={SKIN_EDGE} strokeWidth="2" opacity="0.7" />
      <ellipse cx="-20" cy="-18" rx="26" ry="9" fill="#fff" opacity="0.35" />
    </g>
  );
}

function WholeChicken({ x, y, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      {/* legs */}
      <ellipse cx="-48" cy="62" rx="26" ry="38" transform="rotate(25 -48 62)" fill={SKIN} stroke={SKIN_EDGE} strokeWidth="3" />
      <ellipse cx="48" cy="62" rx="26" ry="38" transform="rotate(-25 48 62)" fill={SKIN} stroke={SKIN_EDGE} strokeWidth="3" />
      <circle cx="-72" cy="96" r="9" fill={BONE} stroke={SKIN_EDGE} strokeWidth="2" />
      <circle cx="72" cy="96" r="9" fill={BONE} stroke={SKIN_EDGE} strokeWidth="2" />
      {/* wings */}
      <ellipse cx="-88" cy="-5" rx="20" ry="38" transform="rotate(-15 -88 -5)" fill={SKIN} stroke={SKIN_EDGE} strokeWidth="3" />
      <ellipse cx="88" cy="-5" rx="20" ry="38" transform="rotate(15 88 -5)" fill={SKIN} stroke={SKIN_EDGE} strokeWidth="3" />
      {/* body and neck */}
      <ellipse cx="0" cy="0" rx="78" ry="72" fill={SKIN} stroke={SKIN_EDGE} strokeWidth="3" />
      <ellipse cx="0" cy="-70" rx="26" ry="16" fill={SKIN} stroke={SKIN_EDGE} strokeWidth="3" />
      <path d="M0 -55 C-6 -20 -6 20 0 50" fill="none" stroke={SKIN_EDGE} strokeWidth="2" opacity="0.7" />
      <ellipse cx="-30" cy="-25" rx="28" ry="12" fill="#fff" opacity="0.35" />
    </g>
  );
}

function SampleImage({ kind = 'whole', height = 180 }) {
  return (
    <div
      style={{
        position: 'relative',
        height,
        borderRadius: 14,
        overflow: 'hidden',
        marginBottom: '0.9rem',
        background: 'linear-gradient(135deg, #14492f, #1b5e3f)',
      }}
    >
      <svg
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: '100%', display: 'block' }}
        role="img"
        aria-label={`Sample illustration: ${kind}`}
      >
        <circle cx="200" cy="150" r="118" fill="#f7f1e3" opacity="0.12" />

        {kind === 'whole' && <WholeChicken x={200} y={145} scale={1.1} />}

        {kind === 'drumstick' && (
          <>
            <Drumstick x={110} y={105} rotate={-15} />
            <Drumstick x={150} y={200} rotate={10} />
          </>
        )}

        {kind === 'wing' && (
          <>
            <Wing x={130} y={95} rotate={10} scale={1.3} />
            <Wing x={250} y={170} rotate={-10} scale={1.3} />
          </>
        )}

        {kind === 'breast' && (
          <>
            <Breast x={150} y={125} rotate={-10} scale={1.1} />
            <Breast x={250} y={195} rotate={8} />
          </>
        )}

        {kind === 'pieces' && (
          <>
            <Breast x={120} y={110} scale={0.8} />
            <Drumstick x={240} y={95} rotate={-10} scale={0.75} />
            <Wing x={130} y={225} rotate={5} scale={0.85} />
            <Drumstick x={280} y={215} rotate={180} scale={0.75} />
          </>
        )}
      </svg>

      <span
        style={{
          position: 'absolute',
          top: 8,
          left: 8,
          background: '#c9a24a',
          color: '#0f3d2a',
          fontSize: 11,
          fontWeight: 700,
          padding: '2px 8px',
          borderRadius: 999,
        }}
      >
        SAMPLE ILLUSTRATION
      </span>
    </div>
  );
}

export default SampleImage;