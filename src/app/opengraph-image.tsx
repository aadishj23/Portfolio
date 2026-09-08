import { ImageResponse } from 'next/og';

export const alt = 'Aadish Jain - Software Development Engineer at Physics Wallah';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const stats = [
  { value: '350K+', label: 'active users' },
  { value: '500K+', label: 'exam users' },
  { value: '300K+', label: 'records migrated' },
  { value: '200K+ hrs', label: 'video ingested' },
];

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '56px 64px',
          background: 'linear-gradient(135deg, #060a14 0%, #0b1020 55%, #0a1a1a 100%)',
          color: '#f5f7fb',
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        }}
      >
        {/* Glow accents */}
        <div
          style={{
            position: 'absolute',
            top: -160,
            right: -120,
            width: 480,
            height: 480,
            borderRadius: 9999,
            background: 'radial-gradient(circle, rgba(0,195,255,0.28) 0%, rgba(0,195,255,0) 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -200,
            left: -140,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background: 'radial-gradient(circle, rgba(0,230,80,0.18) 0%, rgba(0,230,80,0) 70%)',
          }}
        />

        {/* Terminal header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 24, color: '#8b95a7' }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ width: 14, height: 14, borderRadius: 9999, background: '#ff5f57' }} />
            <div style={{ width: 14, height: 14, borderRadius: 9999, background: '#febc2e' }} />
            <div style={{ width: 14, height: 14, borderRadius: 9999, background: '#28c840' }} />
          </div>
          <div style={{ display: 'flex' }}>aadishjain.dev</div>
        </div>

        {/* Main block */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'flex', fontSize: 28, color: '#00c3ff' }}>$ whoami</div>
          <div
            style={{
              display: 'flex',
              fontSize: 92,
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 1,
              fontFamily: 'ui-serif, Georgia, serif',
            }}
          >
            Aadish Jain
          </div>
          <div style={{ display: 'flex', fontSize: 34, color: '#c9d1de' }}>
            Software Development Engineer
            <span style={{ color: '#5c6577', margin: '0 16px' }}>@</span>
            <span style={{ color: '#00e650' }}>Physics Wallah</span>
          </div>
          <div style={{ display: 'flex', fontSize: 24, color: '#8b95a7' }}>
            Next.js · TypeScript · Node.js · PostgreSQL · MongoDB · Redis · AWS · Docker
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 20 }}>
          {stats.map((s) => (
            <div
              key={s.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                padding: '18px 22px',
                borderRadius: 14,
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(255,255,255,0.04)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  fontSize: 38,
                  fontWeight: 700,
                  color: '#00c3ff',
                  fontFamily: 'ui-serif, Georgia, serif',
                }}
              >
                {s.value}
              </div>
              <div style={{ display: 'flex', fontSize: 20, color: '#8b95a7', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
