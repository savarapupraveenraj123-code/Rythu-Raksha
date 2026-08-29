import { motion } from 'framer-motion';

interface ProgressRingProps {
  value: number;
  size?: number;
  stroke?: number;
  label?: string;
  sublabel?: string;
}

export function ProgressRing({ value, size = 120, stroke = 10, label, sublabel }: ProgressRingProps) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const color = value >= 70 ? '#EF4444' : value >= 40 ? '#F59E0B' : '#22C55E';

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#DCFCE7" strokeWidth={stroke} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-ink">{value}</span>
        {label && <span className="text-xs text-muted font-medium">{label}</span>}
        {sublabel && <span className="text-[10px] text-muted">{sublabel}</span>}
      </div>
    </div>
  );
}
