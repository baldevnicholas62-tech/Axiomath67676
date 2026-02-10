const TOPICS = [
  "Number Theory",
  "Algebra",
  "Geometry",
  "Counting and Probability",
];

const SHORT = {
  "Number Theory": "Number\nTheory",
  Algebra: "Algebra",
  Geometry: "Geometry",
  "Counting and Probability": "Counting &\nProbability",
};

const SIZE = 240;
const CX = SIZE / 2;
const CY = SIZE / 2;
const MAX_R = 85;
const RINGS = [25, 50, 75, 100];

function polarToXY(angleDeg, radius) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: CX + radius * Math.cos(rad), y: CY + radius * Math.sin(rad) };
}

function ringPoints(percent) {
  const r = (percent / 100) * MAX_R;
  return TOPICS.map((_, i) => {
    const angle = (360 / TOPICS.length) * i;
    return polarToXY(angle, r);
  });
}

function polyString(pts) {
  return pts.map((p) => `${p.x},${p.y}`).join(" ");
}

export default function WeaknessRadar({ data = {}, minAttempts = {} }) {
  const values = TOPICS.map((t) => data[t] ?? 0);
  const dataPoints = TOPICS.map((t, i) => {
    const pct = data[t] ?? 0;
    const r = (pct / 100) * MAX_R;
    const angle = (360 / TOPICS.length) * i;
    return polarToXY(angle, r);
  });

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        <defs>
          <filter id="radar-glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Guide rings */}
        {RINGS.map((pct) => (
          <polygon
            key={pct}
            points={polyString(ringPoints(pct))}
            fill="none"
            stroke="#262626"
            strokeWidth="1"
          />
        ))}

        {/* Axis lines */}
        {TOPICS.map((_, i) => {
          const angle = (360 / TOPICS.length) * i;
          const end = polarToXY(angle, MAX_R);
          return (
            <line
              key={i}
              x1={CX}
              y1={CY}
              x2={end.x}
              y2={end.y}
              stroke="#262626"
              strokeWidth="1"
            />
          );
        })}

        {/* Ring labels */}
        {RINGS.map((pct) => (
          <text
            key={pct}
            x={CX + 3}
            y={CY - (pct / 100) * MAX_R + 3}
            fill="#a3a3a3"
            fontSize="8"
            opacity="0.4"
          >
            {pct}%
          </text>
        ))}

        {/* Data polygon */}
        <polygon
          points={polyString(dataPoints)}
          fill="rgba(132,204,22,0.15)"
          stroke="#84cc16"
          strokeWidth="2"
          strokeLinejoin="round"
          filter="url(#radar-glow)"
          style={{
            transition: "all 0.8s ease-out",
          }}
        />

        {/* Data dots */}
        {dataPoints.map((pt, i) => (
          <circle
            key={i}
            cx={pt.x}
            cy={pt.y}
            r="4"
            fill="#84cc16"
            stroke="#0a0a0a"
            strokeWidth="2"
            style={{ transition: "all 0.8s ease-out" }}
          />
        ))}

        {/* Topic labels */}
        {TOPICS.map((t, i) => {
          const angle = (360 / TOPICS.length) * i;
          const pt = polarToXY(angle, MAX_R + 24);
          const lines = SHORT[t].split("\n");
          return (
            <text
              key={t}
              x={pt.x}
              y={pt.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#a3a3a3"
              fontSize="10"
              fontWeight="500"
            >
              {lines.map((line, li) => (
                <tspan key={li} x={pt.x} dy={li === 0 ? 0 : 12}>
                  {line}
                </tspan>
              ))}
            </text>
          );
        })}

        {/* Percentage labels at data points */}
        {dataPoints.map((pt, i) => {
          const hasData = (minAttempts[TOPICS[i]] ?? 0) >= 3;
          return (
            <text
              key={`pct-${i}`}
              x={pt.x}
              y={pt.y - 10}
              textAnchor="middle"
              fill={hasData ? "#ffffff" : "#a3a3a350"}
              fontSize="9"
              fontWeight="600"
            >
              {hasData ? `${values[i]}%` : ""}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
