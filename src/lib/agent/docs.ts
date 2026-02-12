export const UILIBRARY = `import * as React from 'react';
import { cn } from '@/lib/utils';

// Button Component
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
        const variants = {
            primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 hover:shadow-indigo-300',
            secondary: 'bg-slate-800 text-slate-100 hover:bg-slate-900 shadow-lg shadow-slate-200',
            outline: 'border-2 border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:border-slate-300',
            ghost: 'bg-transparent hover:bg-slate-50 text-slate-600',
            danger: 'bg-rose-500 text-white hover:bg-rose-600 shadow-lg shadow-rose-200',
        };
        const sizes = {
            sm: 'px-4 py-2 text-xs',
            md: 'px-6 py-3 text-sm',
            lg: 'px-8 py-4 text-base font-semibold',
        };

        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center rounded-2xl font-medium transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed',
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
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export const Card = ({ className, children, ...props }: CardProps) => (
    <div className={cn('bg-white/70 backdrop-blur-md rounded-3xl border border-white/40 shadow-xl human-shadow overflow-hidden', className)} {...props}>
        {children}
    </div>
);

export const CardHeader = ({ className, title, subtitle }: { className?: string; title: string; subtitle?: string }) => (
    <div className={cn('px-8 py-6 border-b border-slate-100/50', className)}>
        <h3 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h3>
        {subtitle && <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">{subtitle}</p>}
    </div>
);

export const CardContent = ({ className, children }: { className?: string; children: React.ReactNode }) => (
    <div className={cn('p-8', className)}>{children}</div>
);

export const CardFooter = ({ className, children }: { className?: string; children: React.ReactNode }) => (
    <div className={cn('px-8 py-6 bg-slate-50/50 border-t border-slate-100/50', className)}>{children}</div>
);

// Input Component
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, ...props }, ref) => (
        <div className="space-y-2 w-full">
            {label && <label className="text-sm font-semibold text-slate-700 ml-1">{label}</label>}
            <input
                ref={ref}
                className={cn(
                    'flex h-12 w-full rounded-2xl border-2 border-slate-100 bg-white/50 px-4 py-2 text-sm transition-all focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-slate-400',
                    error && 'border-rose-500 focus:ring-rose-500/10 focus:border-rose-500',
                    className
                )}
                {...props}
            />
            {error && <p className="text-xs text-rose-500 font-medium ml-1">{error}</p>}
        </div>
    )
);
Input.displayName = 'Input';

// Table Component
export const Table = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className="w-full overflow-auto rounded-3xl border border-slate-200/60 bg-white/50 backdrop-blur-sm">
        <table className={cn('w-full text-sm text-left', className)}>{children}</table>
    </div>
);

export const TableHeader = ({ children }: { children: React.ReactNode }) => (
    <thead className="bg-slate-50/50 text-slate-500 uppercase text-[10px] font-bold tracking-widest border-b border-slate-100">
        {children}
    </thead>
);

export const TableBody = ({ children }: { children: React.ReactNode }) => (
    <tbody className="divide-y divide-slate-100/50">{children}</tbody>
);

export const TableRow = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <tr className={cn('bg-white/30 hover:bg-white/60 transition-colors', className)}>{children}</tr>
);

export const TableCell = ({ children, className, isHeader }: { children: React.ReactNode; className?: string; isHeader?: boolean }) => {
    const Tag = isHeader ? 'th' : 'td';
    return <Tag className={cn('px-8 py-5 font-medium whitespace-nowrap', className)}>{children}</Tag>;
};

// Navbar Component
export const Navbar = ({ logo, actions }: { logo: React.ReactNode; actions?: React.ReactNode }) => (
    <nav className="h-20 border-b border-slate-100/50 bg-white/70 backdrop-blur-xl sticky top-0 z-50 px-8 flex items-center justify-between">
        <div className="flex items-center gap-6">{logo}</div>
        <div className="flex items-center gap-6">{actions}</div>
    </nav>
);

// Sidebar Component
export const Sidebar = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <aside className={cn('w-72 border-r border-slate-100 bg-white/50 backdrop-blur-xl h-full flex flex-col', className)}>
        {children}
    </aside>
);

export const SidebarItem = ({ icon: Icon, label, active, onClick }: { icon: any; label: string; active?: boolean; onClick?: () => void }) => (
    <button
        onClick={onClick}
        className={cn(
            'flex items-center gap-3 px-6 py-4 text-sm font-semibold transition-all relative group',
            active
                ? 'text-indigo-600 bg-indigo-50/50'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
        )}
    >
        {active && <div className="absolute left-0 top-2 bottom-2 w-1.5 bg-indigo-600 rounded-r-full" />}
        <Icon className={cn("w-5 h-5", active ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600")} />
        {label}
    </button>
);

// Modal Component
export const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-md" onClick={onClose} />
            <div className="relative bg-white/90 backdrop-blur-2xl rounded-[2.5rem] shadow-3xl w-full max-w-xl overflow-hidden animate-soft-in">
                <div className="px-10 py-8 border-b border-slate-100/50 flex items-center justify-between">
                    <h3 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h3>
                    <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-900">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                <div className="p-10">{children}</div>
            </div>
        </div>
    );
};

// Chart Component
export const Chart = ({ data, title }: { data: { label: string; value: number }[]; title?: string }) => {
    const max = Math.max(...data.map(d => d.value));
    return (
        <Card className="p-8">
            {title && <h4 className="text-xs font-bold mb-8 text-slate-400 uppercase tracking-widest">{title}</h4>}
            <div className="flex items-end gap-3 h-56">
                {data.map((item, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                        <div
                            className="w-full bg-indigo-100/50 rounded-2xl transition-all duration-500 group-hover:bg-indigo-500 relative human-shadow group-hover:scale-105"
                            style={{ height: \`\${(item.value / max) * 100}%\` }}
                        >
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-1.5 px-2.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none font-bold">
                                {item.value}
                            </div>
                        </div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter truncate w-full text-center group-hover:text-slate-600 transition-colors">{item.label}</span>
                    </div>
                ))}
            </div>
        </Card>
    );
};
`;
