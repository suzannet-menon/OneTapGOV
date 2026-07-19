'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function DocumentChecklist({ scheme, userDocs: initialDocs, onUpdate }) {
    const [checked, setChecked] = useState({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!scheme?.documents) return;
        const init = {};
        scheme.documents.forEach((doc) => {
            init[doc] = initialDocs?.includes(doc) ?? false;
        });
        setChecked(init);
    }, [scheme, initialDocs]);

    if (!scheme) return null;

    const docs = scheme.documents || [];
    const heldCount = Object.values(checked).filter(Boolean).length;
    const pct = docs.length ? Math.round((heldCount / docs.length) * 100) : 0;

    const toggle = async (doc) => {
        const next = { ...checked, [doc]: !checked[doc] };
        setChecked(next);
        const held = Object.entries(next)
            .filter(([, v]) => v)
            .map(([k]) => k);

        setSaving(true);
        try {
            const {
                data: { session },
            } = await supabase.auth.getSession();
            if (session) {
                await fetch(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/schemes/update-documents`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${session.access_token}`,
                        },
                        body: JSON.stringify({ documents: held }),
                    }
                );
                onUpdate?.(held);
            }
        } catch (e) {
            console.error('doc update failed', e);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div>
            {/* Header row */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                }}
            >
                <div
                    style={{
                        fontSize: 11,
                        color: '#94A3B8',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                    }}
                >
                    Required Documents
                </div>
                <div
                    style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: pct === 100 ? '#166534' : '#2563EB',
                    }}
                >
                    {heldCount}/{docs.length} ready
                </div>
            </div>

            {/* Progress bar */}
            <div
                style={{
                    height: 4,
                    background: '#E2E8F0',
                    borderRadius: 2,
                    marginBottom: 12,
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        height: '100%',
                        width: `${pct}%`,
                        background: pct === 100 ? '#22C55E' : '#2563EB',
                        borderRadius: 2,
                        transition: 'width 400ms ease',
                    }}
                />
            </div>

            {/* Document rows */}
            {docs.map((doc) => (
                <div
                    key={doc}
                    onClick={() => toggle(doc)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '8px 0',
                        borderBottom: '1px solid #F1F5F9',
                        cursor: 'pointer',
                    }}
                >
                    {/* Checkbox circle */}
                    <div
                        style={{
                            width: 18,
                            height: 18,
                            borderRadius: '50%',
                            border: checked[doc] ? 'none' : '1.5px solid #CBD5E1',
                            background: checked[doc] ? '#DCFCE7' : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            transition: 'all 150ms',
                        }}
                    >
                        {checked[doc] && (
                            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                                <path
                                    d="M2 6l3 3 5-5"
                                    stroke="#166534"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        )}
                    </div>

                    <span
                        style={{
                            fontSize: 12,
                            color: checked[doc] ? '#0F172A' : '#64748B',
                            lineHeight: 1.4,
                        }}
                    >
                        {doc}
                    </span>
                </div>
            ))}

            {saving && (
                <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 8 }}>
                    Saving…
                </div>
            )}
        </div>
    );
}