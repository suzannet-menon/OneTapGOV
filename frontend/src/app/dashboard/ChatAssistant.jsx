'use client';
import { useState, useCallback, useRef, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useSpeech } from '../../lib/useSpeech';

export default function AssistantPanel({ session, onProfileUpdate }) {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(false);
    const [userLanguage, setUserLanguage] = useState('English');
    const [missingField, setMissingField] = useState(null);
    const [phase, setPhase] = useState(null);
    const [completed, setCompleted] = useState(false);
    const { speak, listen, isListening } = useSpeech();
    const bottomRef = useRef(null);
    const initialized = useRef(false);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, [messages]);

    const fetchInitial = useCallback(async () => {
        if (!session || initialized.current) return;
        initialized.current = true;
        setLoading(true);

        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        const finalUrl = backendUrl ? `${backendUrl}/chat` : '/chat';
        console.log('AssistantPanel fetchInitial - NEXT_PUBLIC_BACKEND_URL:', backendUrl);
        console.log('AssistantPanel fetchInitial - requesting:', finalUrl);
        if (!backendUrl) {
            console.warn('AssistantPanel: NEXT_PUBLIC_BACKEND_URL is undefined — check .env.local and restart the dev server.');
        }

        try {
            const res = await fetch(finalUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session.access_token}`,
                },
                body: JSON.stringify({}),
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`HTTP error! status: ${res.status}, response: ${errorText}`);
            }

            const data = await res.json();
            if (data.status === 'fully_completed') {
                setCompleted(true);
                setMessages([{ role: 'assistant', content: data.question }]);
            } else if (data.question) {
                setMessages([{ role: 'assistant', content: data.question }]);
                setMissingField(data.missing_field);
                setPhase(data.phase);
                speak(data.question, userLanguage);
            }
        } catch (e) {
            console.error('AssistantPanel init error', e);
            setMessages([{ role: 'assistant', content: "Sorry, I'm having trouble connecting to the server. Please ensure the backend is running." }]);
        } finally {
            setLoading(false);
        }
    }, [session, speak, userLanguage]);

    useEffect(() => {
        fetchInitial();
    }, [fetchInitial]);

    const sendMessage = useCallback(
        async (text) => {
            const msg = text || inputText;
            if (!msg.trim() || !session) return;

            setMessages((prev) => [...prev, { role: 'user', content: msg }]);
            setInputText('');
            setLoading(true);
            setMissingField(null);

            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
            const finalUrl = backendUrl ? `${backendUrl}/chat` : '/chat';
            console.log('AssistantPanel sendMessage - NEXT_PUBLIC_BACKEND_URL:', backendUrl);
            console.log('AssistantPanel sendMessage - requesting:', finalUrl);
            if (!backendUrl) {
                console.warn('AssistantPanel: NEXT_PUBLIC_BACKEND_URL is undefined — check .env.local and restart the dev server.');
            }

            try {
                const res = await fetch(finalUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${session.access_token}`,
                    },
                    body: JSON.stringify({ message: msg }),
                });

                if (!res.ok) {
                    const errorText = await res.text();
                    throw new Error(`HTTP error! status: ${res.status}, response: ${errorText}`);
                }

                const data = await res.json();

                if (data.status === 'fully_completed') {
                    setCompleted(true);
                    setMessages((prev) => [
                        ...prev,
                        { role: 'assistant', content: data.question },
                    ]);
                    onProfileUpdate?.();
                } else if (data.question) {
                    setMessages((prev) => [
                        ...prev,
                        { role: 'assistant', content: data.question },
                    ]);
                    setMissingField(data.missing_field);
                    setPhase(data.phase);
                    const lang = data.profile?.preferred_language || userLanguage;
                    setUserLanguage(lang);
                    speak(data.question, lang);
                    onProfileUpdate?.();
                }
            } catch (e) {
                console.error('AssistantPanel send error', e);
                setMessages((prev) => [
                    ...prev,
                    {
                        role: 'assistant',
                        content: "Sorry, I'm having trouble connecting. Please try again.",
                    },
                ]);
            } finally {
                setLoading(false);
            }
        },
        [inputText, session, speak, userLanguage, onProfileUpdate]
    );

    const handleVoice = useCallback(() => {
        listen((t) => sendMessage(t), userLanguage);
    }, [listen, sendMessage, userLanguage]);

    const phaseLabel =
        phase === 'basic'
            ? 'Basic Profile'
            : phase === 'sector_specific'
                ? 'Sector Details'
                : null;

    return (
        <div
            style={{
                background: '#fff',
                border: '1px solid #E2E8F0',
                borderRadius: 12,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 2px 8px rgba(15,23,42,0.04)',
                height: 500,
            }}
        >
            {/* Header */}
            <div
                style={{
                    padding: '14px 16px',
                    borderBottom: '1px solid #F1F5F9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <div>
                    <div
                        style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}
                    >
                        Profile Assistant
                    </div>
                    <div style={{ fontSize: 11.5, color: '#94A3B8', marginTop: 1 }}>
                        {completed
                            ? 'Profile complete — recommendations are ready'
                            : 'Complete your profile to unlock all recommendations'}
                    </div>
                </div>

                {phaseLabel && !completed && (
                    <div
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 5,
                            padding: '4px 10px',
                            background: '#EFF6FF',
                            borderRadius: 20,
                            fontSize: 11,
                            color: '#1D4ED8',
                            fontWeight: 600,
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <svg
                            width="11"
                            height="11"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                            />
                        </svg>
                        {phaseLabel}
                    </div>
                )}

                {completed && (
                    <div
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 5,
                            padding: '4px 10px',
                            background: '#DCFCE7',
                            borderRadius: 20,
                            fontSize: 11,
                            color: '#166534',
                            fontWeight: 600,
                        }}
                    >
                        ✓ Complete
                    </div>
                )}
            </div>

            {/* Messages */}
            <div
                style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '14px 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                }}
            >
                {messages.map((m, i) => (
                    <div
                        key={i}
                        style={{
                            display: 'flex',
                            justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
                        }}
                    >
                        <div
                            style={{
                                maxWidth: '85%',
                                padding: '9px 12px',
                                borderRadius:
                                    m.role === 'user'
                                        ? '10px 10px 2px 10px'
                                        : '10px 10px 10px 2px',
                                background: m.role === 'user' ? '#2563EB' : '#F8FAFC',
                                border:
                                    m.role === 'user' ? 'none' : '1px solid #E2E8F0',
                                color: m.role === 'user' ? '#fff' : '#0F172A',
                                fontSize: 13,
                                lineHeight: 1.5,
                            }}
                        >
                            {m.content}
                        </div>
                    </div>
                ))}

                {loading && (
                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <div
                            style={{
                                padding: '9px 14px',
                                borderRadius: '10px 10px 10px 2px',
                                background: '#F8FAFC',
                                border: '1px solid #E2E8F0',
                                fontSize: 13,
                                color: '#94A3B8',
                            }}
                        >
                            Typing…
                        </div>
                    </div>
                )}

                {/* Sector quick-select buttons */}
                {missingField === 'sector' && !loading && (
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        {['Farmer', 'Student', 'Women'].map((opt) => (
                            <button
                                key={opt}
                                onClick={() => sendMessage(opt)}
                                style={{
                                    padding: '5px 14px',
                                    borderRadius: 20,
                                    border: '1.5px solid #2563EB',
                                    background: '#fff',
                                    color: '#2563EB',
                                    fontSize: 12,
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    fontFamily: 'inherit',
                                }}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                )}

                <div ref={bottomRef} />
            </div>

            {/* Input bar */}
            {!completed && (
                <div
                    style={{
                        padding: '10px 14px',
                        borderTop: '1px solid #F1F5F9',
                        background: '#F8FAFC',
                        display: 'flex',
                        gap: 8,
                        alignItems: 'center',
                    }}
                >
                    <input
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Type your answer…"
                        disabled={loading}
                        style={{
                            flex: 1,
                            padding: '8px 14px',
                            borderRadius: 20,
                            border: '1px solid #E2E8F0',
                            fontSize: 13,
                            outline: 'none',
                            background: '#fff',
                            color: '#0F172A',
                            fontFamily: 'inherit',
                        }}
                    />
                    <button
                        onClick={handleVoice}
                        title={isListening ? 'Listening…' : 'Speak'}
                        style={{
                            width: 34,
                            height: 34,
                            borderRadius: '50%',
                            border: 'none',
                            cursor: 'pointer',
                            background: isListening ? '#EF4444' : '#EFF6FF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            transition: 'background 150ms',
                        }}
                    >
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke={isListening ? '#fff' : '#2563EB'}
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 2a3 3 0 00-3 3v7a3 3 0 006 0V5a3 3 0 00-3-3z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 10v2a7 7 0 01-14 0v-2M12 19v3"
                            />
                        </svg>
                    </button>
                    <button
                        onClick={() => sendMessage()}
                        disabled={loading || !inputText.trim()}
                        style={{
                            fontSize: 12,
                            fontWeight: 700,
                            color: '#2563EB',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontFamily: 'inherit',
                            opacity: loading || !inputText.trim() ? 0.4 : 1,
                            transition: 'opacity 150ms',
                        }}
                    >
                        Send
                    </button>
                </div>
            )}
        </div>
    );
}