"use client";

// ─── Sparkline ────────────────────────────────────────────────────────────
interface SparklineProps {
  data: number[];
  w?: number;
  h?: number;
  stroke?: string;
  fillOpacity?: number;
}

export function Sparkline({ data, w = 120, h = 36, stroke = "currentColor", fillOpacity = 0.06 }: SparklineProps) {
  if (!data || data.length === 0) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = w / (data.length - 1);
  const pts = data.map((v, i) => [i * step, h - 4 - ((v - min) / range) * (h - 8)] as [number, number]);
  const path = pts.map(([x, y], i) => (i === 0 ? `M${x},${y}` : `L${x},${y}`)).join(" ");
  const area = `${path} L${w},${h} L0,${h} Z`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: "block" }}>
      <path d={area} fill={stroke} opacity={fillOpacity} />
      <path d={path} fill="none" stroke={stroke} strokeWidth="1.2" strokeLinejoin="round" />
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="2" fill={stroke} />
    </svg>
  );
}

// ─── LineChart ────────────────────────────────────────────────────────────
interface LineSeries {
  id: string;
  data: number[];
  color: string;
  dashed?: boolean;
  fill?: boolean;
  areaOpacity?: number;
}

interface LineChartProps {
  series: LineSeries[];
  height?: number;
  yFmt?: (v: number) => string;
}

export function LineChart({ series, height = 260, yFmt = (v) => String(v) }: LineChartProps) {
  const W = 800;
  const H = height;
  const padL = 56, padR = 16, padT = 16, padB = 28;
  const allVals = series.flatMap((s) => s.data);
  const min = Math.min(0, ...allVals);
  const max = Math.max(...allVals);
  const range = max - min || 1;
  const n = series[0].data.length;
  const step = (W - padL - padR) / (n - 1);

  const yToPx = (v: number) => padT + (1 - (v - min) / range) * (H - padT - padB);
  const xToPx = (i: number) => padL + i * step;

  const ticks = 4;
  const tickVals = Array.from({ length: ticks + 1 }, (_, i) => min + (range * i) / ticks);

  return (
    <div className="su-chart-wrap">
      <svg viewBox={`0 0 ${W} ${H}`} className="su-chart" preserveAspectRatio="none">
        {tickVals.map((v, i) => (
          <g key={i}>
            <line
              x1={padL} x2={W - padR} y1={yToPx(v)} y2={yToPx(v)}
              stroke="var(--su-hair)" strokeWidth="1"
              strokeDasharray={i === 0 ? "0" : "2 4"}
            />
            <text x={padL - 10} y={yToPx(v) + 4} className="su-chart-tick" textAnchor="end">
              {yFmt(v)}
            </text>
          </g>
        ))}
        {Array.from({ length: n }, (_, i) => i)
          .filter((i) => i % 5 === 0 || i === n - 1)
          .map((i) => (
            <text key={i} x={xToPx(i)} y={H - 10} className="su-chart-tick" textAnchor="middle">
              {`${n - i}d`}
            </text>
          ))}
        {series.map((s) => {
          const pathStr = s.data
            .map((v, i) => (i === 0 ? `M${xToPx(i)},${yToPx(v)}` : `L${xToPx(i)},${yToPx(v)}`))
            .join(" ");
          const areaStr = `${pathStr} L${xToPx(n - 1)},${yToPx(min)} L${xToPx(0)},${yToPx(min)} Z`;
          return (
            <g key={s.id}>
              {s.fill !== false && (
                <path d={areaStr} fill={s.color} opacity={s.areaOpacity ?? 0.08} />
              )}
              <path
                d={pathStr}
                fill="none"
                stroke={s.color}
                strokeWidth={s.dashed ? 1 : 1.4}
                strokeDasharray={s.dashed ? "3 3" : "0"}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ─── Donut ────────────────────────────────────────────────────────────────
interface DonutSegment {
  id: string;
  share: number;
}

interface DonutProps {
  data: DonutSegment[];
  size?: number;
  thickness?: number;
  palette: string[];
}

const f4 = (n: number) => Math.round(n * 10000) / 10000;

export function Donut({ data, size = 160, thickness = 14, palette }: DonutProps) {
  const total = data.reduce((s, d) => s + d.share, 0);
  const r = size / 2 - thickness / 2;
  const c = size / 2;
  let acc = 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={c} cy={c} r={r} fill="none" stroke="var(--su-hair)" strokeWidth={thickness} />
      {data.map((d, i) => {
        const start = (acc / total) * 2 * Math.PI - Math.PI / 2;
        acc += d.share;
        const end = (acc / total) * 2 * Math.PI - Math.PI / 2;
        const x1 = f4(c + Math.cos(start) * r);
        const y1 = f4(c + Math.sin(start) * r);
        const x2 = f4(c + Math.cos(end) * r);
        const y2 = f4(c + Math.sin(end) * r);
        const large = d.share / total > 0.5 ? 1 : 0;
        const color = palette[i % palette.length];
        return (
          <path
            key={d.id}
            d={`M${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2}`}
            fill="none"
            stroke={color}
            strokeWidth={thickness}
          />
        );
      })}
    </svg>
  );
}

// ─── HBar ─────────────────────────────────────────────────────────────────
interface HBarProps {
  value: number;
  max: number;
  color?: string;
}

export function HBar({ value, max, color = "var(--su-accent)" }: HBarProps) {
  const pct = Math.max(0, Math.min(1, value / max));
  return (
    <div className="su-hbar">
      <div className="su-hbar-fill" style={{ width: `${pct * 100}%`, background: color }} />
    </div>
  );
}
