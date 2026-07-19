'use client';

const CATEGORY_STYLES = {
    Agriculture: { bg: '#F0FDF4', color: '#166534' },
    Education: { bg: '#EFF6FF', color: '#1D4ED8' },
    'Women Welfare': { bg: '#FDF4FF', color: '#7E22CE' },
};

export default function SchemeCard({ scheme, onClick, selected }) {
    const isEligible = scheme.eligibility_details?.is_eligible;
    const catStyle = CATEGORY_STYLES[scheme.category] || {
        bg: '#F8FAFC',
        color: '#64748B',
    };

    return (
        <div
            onClick={() => onClick?.(scheme)}
            style={{
                background: selected ? '#F0F7FF' : '#F8FAFC',
                border: `1px solid ${selected ? '#93C5FD' : '#E2E8F0'}`,
                borderRadius: 10,
                padding: '12px 14px',
                cursor: 'pointer',
                transition: 'all 150ms ease',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: 10,
            }}
            onMouseEnter={(e) => {
                if (!selected) e.currentTarget.style.borderColor = '#CBD5E1';
            }}
            onMouseLeave={(e) => {
                if (!selected) e.currentTarget.style.borderColor = '#E2E8F0';
            }}
        >
            <div style={{ minWidth: 0 }}>
                <div
                    style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: '#0F172A',
                        lineHeight: 1.3,
                        marginBottom: 4,
                    }}
                >
                    {scheme.scheme_name}
                </div>
                {scheme.eligibility_details?.passed_conditions?.[0] && (
                    <div
                        style={{
                            fontSize: 11,
                            color: '#64748B',
                            lineHeight: 1.4,
                            marginBottom: 6,
                        }}
                    >
                        {scheme.eligibility_details.passed_conditions[0]}
                    </div>
                )}
                {scheme.category && (
                    <span
                        style={{
                            display: 'inline-block',
                            fontSize: 10,
                            fontWeight: 600,
                            padding: '2px 8px',
                            borderRadius: 4,
                            background: catStyle.bg,
                            color: catStyle.color,
                        }}
                    >
                        {scheme.category}
                    </span>
                )}
            </div>
            <div style={{ flexShrink: 0 }}>
                <span
                    style={{
                        display: 'inline-block',
                        fontSize: 10,
                        fontWeight: 700,
                        padding: '3px 9px',
                        borderRadius: 20,
                        background: isEligible ? '#DCFCE7' : '#FEF9C3',
                        color: isEligible ? '#166534' : '#854D0E',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {isEligible ? 'High Match' : 'Review'}
                </span>
            </div>
        </div>
    );
}