import { type ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface CardProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  variant?: 'default' | 'soft';
  hover?: boolean;
}

export function Card({ children, variant = 'default', hover = false, className = '', ...props }: CardProps) {
  const base = variant === 'soft' ? 'card-soft' : 'card-base';
  const hoverCls = hover ? 'hover:shadow-card-hover hover:-translate-y-1 cursor-pointer' : '';
  return (
    <motion.div className={`${base} ${hoverCls} ${className}`} {...props}>
      {children}
    </motion.div>
  );
}
