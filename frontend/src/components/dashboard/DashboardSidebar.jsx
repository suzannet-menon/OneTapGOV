'use client';
import { usePathname, useRouter } from 'next/navigation';

const NAV = [
    {
        label: 'Dashboard',
        icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
        href: '/dashboard',
    },
    {
        label: 'AI Assistant',
        icon: 'M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 001.357 2.059l.537.228a2.25 2.25 0 001.355 0l.537-.228a2.25 2.25 0 001.357-2.059V3.104m0 0c.251.023.501.05.75.082M19.5 3.104A24.301 24.301 0 0015 3.022m0 0a24.301 24.301 0 00-4.5 0',
        href: '/dashboard',
    },
    {
        label: 'Recommended Schemes',
        icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
        href: '/dashboard',
    },
    {
        label: 'My Profile',
        icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
        href: '/profile',
        section: 'Account',
    },
];

export default function DashboardSidebar({ profile }) {
    const router = useRouter();
    const pathname = usePathname();

    const initials = profile?.full_name
        ? profile.full_name
            .split(' ')
            .map((w) => w[0])
            .slice(0, 2)
            .join('')
            .toUpperCase()
        : 'U';

    const sectorLabel = profile?.sector
        ? profile.sector.charAt(0).toUpperCase() + profile.sector.slice(1)
        : 'Citizen';

    return (
        <aside
            style={{
                width: 224,
                background: '#0F172A',
                display: 'flex',
                flexDirection: 'column',
                flexShrink: 0,
                height: '100vh',
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 50,
            }}
        >
            {/* Logo */}
            <div
                style={{
                    padding: '20px 18px 16px',
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                }}
            >
                <div
                    style={{
                        fontSize: 16,
                        fontWeight: 700,
                        color: '#fff',
                        letterSpacing: '-0.02em',
                    }}
                >
                    OneTap<span style={{ color: '#2DD4BF' }}>GOV</span>
                </div>
                <div
                    style={{
                        fontSize: 10,
                        color: 'rgba(255,255,255,0.3)',
                        marginTop: 3,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                    }}
                >
                    Citizen Benefits Platform
                </div>
            </div>

            {/* Nav */}
            <nav style={{ padding: '12px 10px', flex: 1, overflowY: 'auto' }}>
                {NAV.map((item, i) => {
                    const showSection =
                        item.section &&
                        (i === 0 || NAV[i - 1]?.section !== item.section);

                    const active =
                        (pathname === '/dashboard' && item.label === 'Dashboard') ||
                        (pathname === '/dashboard' && item.label === 'AI Assistant') ||
                        (pathname === '/dashboard' &&
                            item.label === 'Recommended Schemes') ||
                        (pathname === '/profile' && item.label === 'My Profile');

                    const isCurrentPage =
                        (pathname === '/dashboard' && item.href === '/dashboard') ||
                        (pathname === '/profile' && item.href === '/profile');

                    return (
                        <div key={item.label}>
                            {showSection && (
                                <div
                                    style={{
                                        fontSize: 10,
                                        color: 'rgba(255,255,255,0.25)',
                                        letterSpacing: '0.08em',
                                        textTransform: 'uppercase',
                                        padding: '10px 10px 4px',
                                        marginTop: 4,
                                    }}
                                >
                                    {item.section}
                                </div>
                            )}
                            <div
                                onClick={() => router.push(item.href)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 10,
                                    padding: '9px 10px',
                                    borderRadius: 8,
                                    cursor: 'pointer',
                                    marginBottom: 2,
                                    color:
                                        pathname === item.href
                                            ? '#fff'
                                            : 'rgba(255,255,255,0.5)',
                                    fontSize: 13,
                                    fontWeight: 500,
                                    background:
                                        pathname === item.href && item.href !== '/dashboard'
                                            ? 'rgba(37,99,235,0.22)'
                                            : pathname === '/dashboard' &&
                                                item.href === '/dashboard' &&
                                                item.label === 'Dashboard'
                                                ? 'rgba(37,99,235,0.22)'
                                                : 'transparent',
                                    borderLeft:
                                        (pathname === '/dashboard' &&
                                            item.label === 'Dashboard') ||
                                            (pathname === '/profile' && item.label === 'My Profile')
                                            ? '2px solid #2563EB'
                                            : '2px solid transparent',
                                    transition: 'all 150ms ease',
                                }}
                                onMouseEnter={(e) => {
                                    const isDash =
                                        pathname === '/dashboard' && item.label === 'Dashboard';
                                    const isProf =
                                        pathname === '/profile' && item.label === 'My Profile';
                                    if (!isDash && !isProf) {
                                        e.currentTarget.style.background =
                                            'rgba(255,255,255,0.06)';
                                        e.currentTarget.style.color = 'rgba(255,255,255,0.85)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    const isDash =
                                        pathname === '/dashboard' && item.label === 'Dashboard';
                                    const isProf =
                                        pathname === '/profile' && item.label === 'My Profile';
                                    if (!isDash && !isProf) {
                                        e.currentTarget.style.background = 'transparent';
                                        e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                                    }
                                }}
                            >
                                <svg
                                    width="16"
                                    height="16"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    viewBox="0 0 24 24"
                                    style={{ flexShrink: 0 }}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d={item.icon}
                                    />
                                </svg>
                                {item.label}
                            </div>
                        </div>
                    );
                })}
            </nav>

            {/* User footer */}
            <div
                style={{
                    padding: '14px',
                    borderTop: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                }}
            >
                <div
                    style={{
                        width: 34,
                        height: 34,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #2563EB, #1488A6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 12,
                        fontWeight: 700,
                        color: '#fff',
                        flexShrink: 0,
                    }}
                >
                    {initials}
                </div>
                <div style={{ minWidth: 0 }}>
                    <div
                        style={{
                            fontSize: 12.5,
                            fontWeight: 600,
                            color: '#fff',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}
                    >
                        {profile?.full_name || 'User'}
                    </div>
                    <div
                        style={{
                            fontSize: 10.5,
                            color: 'rgba(255,255,255,0.35)',
                            marginTop: 1,
                        }}
                    >
                        {sectorLabel}
                    </div>
                </div>
            </div>
        </aside>
    );
}