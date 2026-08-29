import { type RiskLevel } from '@/services/mockData';

const config: Record<string, { bg: string; text: string; border: string; label: string; dot: string }> = {
  healthy: { bg: 'bg-brand-green-100', text: 'text-brand-green-800', border: 'border-brand-green-200', label: 'Healthy', dot: 'bg-brand-green-500' },
  'high-risk': { bg: 'bg-red-50', text: 'text-danger', border: 'border-red-200', label: 'High Risk', dot: 'bg-danger' },
  attention: { bg: 'bg-amber-50', text: 'text-warning', border: 'border-amber-200', label: 'Attention', dot: 'bg-warning' },
  low: { bg: 'bg-brand-green-100', text: 'text-brand-green-800', border: 'border-brand-green-200', label: 'Low', dot: 'bg-brand-green-500' },
  medium: { bg: 'bg-amber-50', text: 'text-warning', border: 'border-amber-200', label: 'Medium', dot: 'bg-warning' },
  high: { bg: 'bg-red-50', text: 'text-danger', border: 'border-red-200', label: 'High', dot: 'bg-danger' },
};

export function Badge({ status, customLabel }: { status: 'healthy' | 'attention' | 'high-risk' | RiskLevel; customLabel?: string }) {
  const c = config[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${c.bg} ${c.text} ${c.border} border`}>
      <span className={`w-2 h-2 rounded-full ${c.dot}`} />
      {customLabel ?? c.label}
    </span>
  );
}
