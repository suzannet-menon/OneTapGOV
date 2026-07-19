'use client';
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabaseClient';
import SchemeCard from './SchemeCard';
import DocumentChecklist from './DocumentChecklist';

export default function SchemesPanel() {
    const [schemes, setSchemes] = useState([]);
    const [userDocs, setUserDocs] = useState([]);
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [incompleteMsg, setIncompleteMsg] = useState(null);

    const fetchSchemes = useCallback(async () => {
        setLoading(true);
        setError(null);
        setIncompleteMsg(null);
        try {
            const {
                data: { session },
            } = await supabase.auth.getSession();
            if (!session) {
                setError('Not authenticated.');
                setLoading(false);
                return;
            }

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/schemes/eligible`,
                {
                    headers: { Authorization: `Bearer ${session.access_token}` },
                }
            );
            const data = await res.json();

            if (data.status === 'incomplete') {
                setIncompleteMsg(data.message);
            } else if (Array.isArray(data.schemes)) {
                setSchemes(data.schemes);
                setUserDocs(data.user_documents || []);
                if (data.schemes.length > 0) setSelected(data.schemes[0]);
            } else {
                setError('Unexpected response from server.');
            }
        } catch (e) {
            setError('Failed to load schemes. Please try again.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSchemes();
    }, [fetchSchemes]);

    if (loading) return <SkeletonCard />;

    if (incompleteMsg) {
        return (
            <div
                style={{
                    background: '#fff',
                    border: '1px solid #E2E8F0',
                    borderRadius: 12,
                    padding: '20px 18px',
                    boxShadow: '0 2px 8px rgba(15,23,42,0.04)',
                }}
            >
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', marginBottom: 6 }}>
                    Recommended Schemes
                </div>
                <div
                    style={{
                        fontSize: 12.5,
                        color: '#854D0E',
                        background: '#FEF9C3',
                        border: '1px solid #FDE68A',
                        borderRadius: 8,
                        padding: '10px 12px',
                    }}
                >
                    {incompleteMsg}
                </div>
                <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 8 }}>
                    Use the Profile Assistant above to complete your profile and unlock
                    personalised recommendations.
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div
                style={{
                    background: '#fff',
                    border: '1px solid #E2E8F0',
                    borderRadius: 12,
                    padding: '20px 18px',
                    boxShadow: '0 2px 8px rgba(15,23,42,0.04)',
                }}
            >
                <div style={{ fontSize: 13, color: '#DC2626', marginBottom: 8 }}>
                    {error}
                </div>
                <button
                    onClick={fetchSchemes}
                    style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: '#2563EB',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                        fontFamily: 'inherit',
                    }}
                >
                    Try again
                </button>
            </div>
        );
    }

    if (!schemes.length) {
        return (
            <div
                style={{
                    background: '#fff',
                    border: '1px solid #E2E8F0',
                    borderRadius: 12,
                    padding: '20px 18px',
                    boxShadow: '0 2px 8px rgba(15,23,42,0.04)',
                }}
            >
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', marginBottom: 6 }}>
                    Recommended Schemes
                </div>
                <div style={{ fontSize: 12.5, color: '#64748B' }}>
                    No matching schemes found for your current profile. Try completing
                    more of your profile using the assistant.
                </div>
            </div>
        );
    }

    const eligible = schemes.filter((s) => s.eligibility_details?.is_eligible);
    const partial = schemes.filter((s) => !s.eligibility_details?.is_eligible);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Scheme list card */}
            <div
                style={{
                    background: '#fff',
                    border: '1px solid #E2E8F0',
                    borderRadius: 12,
                    overflow: 'hidden',
                    boxShadow: '0 2px 8px rgba(15,23,42,0.04)',
                }}
            >
                <div
                    style={{
                        padding: '14px 16px 0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <div>
                        <div
                            style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}
                        >
                            Recommended Schemes
                        </div>
                        <div style={{ fontSize: 11.5, color: '#94A3B8', marginTop: 2 }}>
                            {eligible.length} eligible · {schemes.length} total
                        </div>
                    </div>
                    <button
                        onClick={fetchSchemes}
                        style={{
                            fontSize: 11,
                            fontWeight: 600,
                            color: '#2563EB',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontFamily: 'inherit',
                        }}
                    >
                        Refresh
                    </button>
                </div>

                <div
                    style={{
                        padding: '12px 14px 14px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 8,
                    }}
                >
                    {eligible.map((s) => (
                        <SchemeCard
                            key={s.scheme_code}
                            scheme={s}
                            selected={selected?.scheme_code === s.scheme_code}
                            onClick={setSelected}
                        />
                    ))}

                    {partial.length > 0 && (
                        <>
                            <div
                                style={{
                                    fontSize: 10,
                                    color: '#94A3B8',
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.06em',
                                    padding: '6px 0 2px',
                                }}
                            >
                                Partial Match
                            </div>
                            {partial.map((s) => (
                                <SchemeCard
                                    key={s.scheme_code}
                                    scheme={s}
                                    selected={selected?.scheme_code === s.scheme_code}
                                    onClick={setSelected}
                                />
                            ))}
                        </>
                    )}
                </div>
            </div>

            {/* Detail card for selected scheme */}
            {selected && (
                <div
                    style={{
                        background: '#fff',
                        border: '1px solid #E2E8F0',
                        borderRadius: 12,
                        padding: '14px 16px',
                        boxShadow: '0 2px 8px rgba(15,23,42,0.04)',
                    }}
                >
                    <div
                        style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: '#0F172A',
                            marginBottom: 2,
                        }}
                    >
                        {selected.scheme_name}
                    </div>

                    {/* Passed conditions */}
                    {selected.eligibility_details?.passed_conditions?.length > 0 && (
                        <div style={{ margin: '10px 0' }}>
                            <div
                                style={{
                                    fontSize: 11,
                                    color: '#166534',
                                    fontWeight: 600,
                                    marginBottom: 4,
                                }}
                            >
                                ✓ You qualify because
                            </div>
                            {selected.eligibility_details.passed_conditions.map((c, i) => (
                                <div
                                    key={i}
                                    style={{
                                        fontSize: 12,
                                        color: '#64748B',
                                        paddingLeft: 10,
                                        marginBottom: 2,
                                    }}
                                >
                                    • {c}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Failed conditions */}
                    {selected.eligibility_details?.failed_conditions?.length > 0 && (
                        <div style={{ margin: '10px 0' }}>
                            <div
                                style={{
                                    fontSize: 11,
                                    color: '#854D0E',
                                    fontWeight: 600,
                                    marginBottom: 4,
                                }}
                            >
                                ✗ Not yet met
                            </div>
                            {selected.eligibility_details.failed_conditions.map((c, i) => (
                                <div
                                    key={i}
                                    style={{
                                        fontSize: 12,
                                        color: '#64748B',
                                        paddingLeft: 10,
                                        marginBottom: 2,
                                    }}
                                >
                                    • {c}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Document checklist */}
                    <div
                        style={{ borderTop: '1px solid #F1F5F9', paddingTop: 12, marginTop: 4 }}
                    >
                        <DocumentChecklist
                            scheme={selected}
                            userDocs={userDocs}
                            onUpdate={setUserDocs}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

function SkeletonCard() {
    return (
        <div
            style={{
                background: '#fff',
                border: '1px solid #E2E8F0',
                borderRadius: 12,
                padding: '20px 18px',
                boxShadow: '0 2px 8px rgba(15,23,42,0.04)',
            }}
        >
            <style>{`
        @keyframes otg-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
            {[1, 2, 3].map((i) => (
                <div
                    key={i}
                    style={{
                        height: 72,
                        background: '#F8FAFC',
                        borderRadius: 10,
                        marginBottom: 10,
                        animation: 'otg-pulse 1.5s ease-in-out infinite',
                    }}
                />
            ))}
        </div>
    );
}