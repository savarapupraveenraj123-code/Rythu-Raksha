import { motion } from 'framer-motion';
import { type ForecastHour } from '@/services/mockData';

interface RiskChartProps {
  data: ForecastHour[];
  height?: number;
}

export function RiskChart({ data, height = 200 }: RiskChartProps) {
  const width = 800;
  const padding = { top: 20, right: 20, bottom: 30, left: 40 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;
  const maxRisk = 100;
  const stepX = chartW / (data.length - 1);

  const points = data.map((d, i) => ({
    x: padding.left + i * stepX,
    y: padding.top + chartH - (d.risk / maxRisk) * chartH,
    risk: d.risk,
    hour: d.hour,
  }));

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaD = `${pathD} L ${points[points.length - 1].x} ${padding.top + chartH} L ${points[0].x} ${padding.top + chartH} Z`;

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full min-w-[600px]" style={{ height }}>
        <defs>
          <linearGradient id="riskArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22C55E" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#22C55E" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 25, 50, 75, 100].map((v) => (
          <g key={v}>
            <line
              x1={padding.left}
              y1={padding.top + chartH - (v / 100) * chartH}
              x2={width - padding.right}
              y2={padding.top + chartH - (v / 100) * chartH}
              stroke="#DCFCE7"
              strokeWidth="1"
            />
            <text x={padding.left - 8} y={padding.top + chartH - (v / 100) * chartH + 4} textAnchor="end" className="fill-muted text-[10px]">
              {v}
            </text>
          </g>
        ))}
        <motion.path d={areaD} fill="url(#riskArea)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} />
        <motion.path
          d={pathD}
          fill="none"
          stroke="#166534"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
        {points.map((p, i) => (
          <g key={i}>
            <motion.circle
              cx={p.x}
              cy={p.y}
              r="4"
              fill="white"
              stroke={p.risk >= 70 ? '#EF4444' : p.risk >= 40 ? '#F59E0B' : '#22C55E'}
              strokeWidth="2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + i * 0.08 }}
            />
            <text x={p.x} y={height - 8} textAnchor="middle" className="fill-muted text-[9px]">
              {p.hour}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
