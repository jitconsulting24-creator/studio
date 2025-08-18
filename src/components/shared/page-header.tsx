import React from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  tertiary?: React.ReactNode;
  children?: React.ReactNode;
}

export default function PageHeader({ title, description, tertiary, children }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex-1">
        <div className="flex items-center gap-4">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
            {tertiary}
        </div>
        {description && <p className="mt-1 text-muted-foreground">{description}</p>}
      </div>
      {children && <div className="flex-shrink-0">{children}</div>}
    </div>
  );
}
