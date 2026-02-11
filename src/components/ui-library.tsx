import * as React from 'react';
import { cn } from '@/lib/utils';

// Button Component
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
        const variants = {
            primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md',
            secondary: 'bg-slate-800 text-slate-100 hover:bg-slate-900',
            outline: 'border border-slate-300 bg-transparent hover:bg-slate-50 text-slate-700',
            ghost: 'bg-transparent hover:bg-slate-100 text-slate-600',
            danger: 'bg-red-600 text-white hover:bg-red-700',
        };
        const sizes = {
            sm: 'px-3 py-1.5 text-xs',
            md: 'px-4 py-2 text-sm',
            lg: 'px-6 py-3 text-base',
        };

        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center rounded-lg font-medium transition-all active:scale-95 disabled:opacity-50',
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = 'Button';

// Card Component
export const Card = ({ className, children }: { className?: string; children: React.ReactNode }) => (
    <div className={cn('bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden', className)}>
        {children}
    </div>
);

export const CardHeader = ({ className, title, subtitle }: { className?: string; title: string; subtitle?: string }) => (
    <div className={cn('px-6 py-4 border-b border-slate-100', className)}>
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
    </div>
);

export const CardContent = ({ className, children }: { className?: string; children: React.ReactNode }) => (
    <div className={cn('p-6', className)}>{children}</div>
);

export const CardFooter = ({ className, children }: { className?: string; children: React.ReactNode }) => (
    <div className={cn('px-6 py-4 bg-slate-50 border-t border-slate-100', className)}>{children}</div>
);

// Input Component
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, ...props }, ref) => (
        <div className="space-y-1.5 w-full">
            {label && <label className="text-sm font-medium text-slate-700">{label}</label>}
            <input
                ref={ref}
                className={cn(
                    'flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                    error && 'border-red-500 focus:ring-red-500',
                    className
                )}
                {...props}
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    )
);
Input.displayName = 'Input';

// Table Component
export const Table = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className="w-full overflow-auto rounded-lg border border-slate-200">
        <table className={cn('w-full text-sm text-left', className)}>{children}</table>
    </div>
);

export const TableHeader = ({ children }: { children: React.ReactNode }) => (
    <thead className="bg-slate-50 text-slate-700 uppercase text-xs font-semibold">
        {children}
    </thead>
);

export const TableBody = ({ children }: { children: React.ReactNode }) => (
    <tbody className="divide-y divide-slate-100">{children}</tbody>
);

export const TableRow = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <tr className={cn('bg-white hover:bg-slate-50 transition-colors', className)}>{children}</tr>
);

export const TableCell = ({ children, className, isHeader }: { children: React.ReactNode; className?: string; isHeader?: boolean }) => {
    const Tag = isHeader ? 'th' : 'td';
    return <Tag className={cn('px-6 py-4 font-medium whitespace-nowrap', className)}>{children}</Tag>;
};

// Navbar Component
export const Navbar = ({ logo, actions }: { logo: React.ReactNode; actions?: React.ReactNode }) => (
    <nav className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">{logo}</div>
        <div className="flex items-center gap-4">{actions}</div>
    </nav>
);

// Sidebar Component
export const Sidebar = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <aside className={cn('w-64 border-r border-slate-200 bg-white h-full flex flex-col', className)}>
        {children}
    </aside>
);

export const SidebarItem = ({ icon: Icon, label, active, onClick }: { icon: any; label: string; active?: boolean; onClick?: () => void }) => (
    <button
        onClick={onClick}
        className={cn(
            'flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors',
            active ? 'bg-indigo-50 text-indigo-700 border-r-4 border-indigo-600' : 'text-slate-600 hover:bg-slate-50'
        )}
    >
        <Icon className="w-4 h-4" />
        {label}
    </button>
);

// Modal Component
export const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <button onClick={onClose} className="p-1 rounded-md hover:bg-slate-100 transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
};

// Chart Component (Mocked)
export const Chart = ({ data, title }: { data: { label: string; value: number }[]; title?: string }) => {
    const max = Math.max(...data.map(d => d.value));
    return (
        <Card className="p-6">
            {title && <h4 className="text-sm font-semibold mb-6 text-slate-700 uppercase tracking-wider">{title}</h4>}
            <div className="flex items-end gap-2 h-48">
                {data.map((item, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                        <div
                            className="w-full bg-indigo-100 rounded-t-lg transition-all group-hover:bg-indigo-500 relative"
                            style={{ height: `${(item.value / max) * 100}%` }}
                        >
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                {item.value}
                            </div>
                        </div>
                        <span className="text-[10px] text-slate-500 font-medium truncate w-full text-center">{item.label}</span>
                    </div>
                ))}
            </div>
        </Card>
    );
};
