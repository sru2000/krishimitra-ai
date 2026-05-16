import type { ReactNode } from "react";

interface Props {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function SectionCard({ title, subtitle, action, children, className = "" }: Props) {
  return (
    <div className={`glass rounded-2xl p-5 ${className}`}>
      <div className="flex items-start justify-between mb-4 gap-4">
        <div>
          <h3 className="font-display font-semibold text-lg">{title}</h3>
          {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}
