import { Link, usePage } from '@inertiajs/react';
 
interface Props { children: React.ReactNode; }
 
export default function AdminLayout({ children }: Props) {
    const { auth, flash } = usePage<any>().props;
 
    const navItems = [
        { href: '/admin', label: 'Dashboard', icon: '📊' },
        { href: '/admin/products', label: 'Produk', icon: '📦' },
        { href: '/admin/categories', label: 'Kategori', icon: '🏷️' },
        { href: '/admin/orders', label: 'Pesanan', icon: '🛒' },
        { href: '/admin/users', label: 'Pengguna', icon: '👥' },
    ];
 
    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-sm flex-shrink-0 flex flex-col">
                <div className="p-6 border-b border-gray-100">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">U</span>
                        </div>
                        <div>
                            <p className="font-bold text-gray-900 text-sm leading-tight">UMKMStore</p>
                            <p className="text-xs text-gray-400">Admin Panel</p>
                        </div>
                    </Link>
                </div>
                <nav className="flex-1 py-4 px-3">
                    {navItems.map(item => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors mb-1"
                        >
                            <span>{item.icon}</span>
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 px-2">
                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                            <span className="text-emerald-700 font-semibold text-xs">{auth?.user?.name?.charAt(0)}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{auth?.user?.name}</p>
                            <p className="text-xs text-gray-400">Administrator</p>
                        </div>
                        <Link href="/logout" method="post" as="button" className="text-gray-400 hover:text-red-500 transition-colors text-xs">
                            Keluar
                        </Link>
                    </div>
                </div>
            </aside>
 
            {/* Main */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {flash?.success && (
                    <div className="bg-emerald-50 border-b border-emerald-100 text-emerald-700 px-6 py-3 text-sm">{flash.success}</div>
                )}
                {flash?.error && (
                    <div className="bg-red-50 border-b border-red-100 text-red-700 px-6 py-3 text-sm">{flash.error}</div>
                )}
                <main className="flex-1 overflow-y-auto p-8">{children}</main>
            </div>
        </div>
    );
}