'use client';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import AssistantPanel from '../../components/dashboard/AssistantPanel';
import SchemesPanel from '../../components/dashboard/SchemesPanel';
import ProfileCompletionCard from '../../components/dashboard/ProfileCompletionCard';

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [schemesKey, setSchemesKey] = useState(0);
  const router = useRouter();

  const loadProfile = useCallback(async (userId) => {
    try {
      const [basicRes, profileRes] = await Promise.all([
        supabase.from('user_basic_info').select('*').eq('user_id', userId).single(),
        supabase.from('profiles').select('full_name, preferred_language').eq('id', userId).single(),
      ]);

      const merged = {
        ...(basicRes.data || {}),
        full_name: profileRes.data?.full_name || '',
        preferred_language:
          profileRes.data?.preferred_language ||
          basicRes.data?.preferred_language ||
          'English',
      };

      // Load sector-specific profile if sector is known
      const sector = (merged.sector || '').toLowerCase();
      if (sector.includes('farmer') || sector.includes('agriculture')) {
        const r = await supabase
          .from('farmer_profile')
          .select('*')
          .eq('user_id', userId)
          .single();
        if (r.data) Object.assign(merged, r.data);
      } else if (sector.includes('student') || sector.includes('education')) {
        const r = await supabase
          .from('student_profile')
          .select('*')
          .eq('user_id', userId)
          .single();
        if (r.data) Object.assign(merged, r.data);
      } else if (sector.includes('women') || sector.includes('woman')) {
        const r = await supabase
          .from('women_profile')
          .select('*')
          .eq('user_id', userId)
          .single();
        if (r.data) Object.assign(merged, r.data);
      }

      setProfile(merged);
    } catch (e) {
      console.error('loadProfile error', e);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      const {
        data: { session: s },
      } = await supabase.auth.getSession();
      if (!s) {
        router.push('/login');
        return;
      }
      setSession(s);
      await loadProfile(s.user.id);
      setLoading(false);
    };
    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, s) => {
      if (!s) router.push('/login');
      else setSession(s);
    });

    return () => subscription.unsubscribe();
  }, [router, loadProfile]);

  // Called by AssistantPanel after each successful profile update
  const handleProfileUpdate = useCallback(async () => {
    if (session?.user?.id) {
      await loadProfile(session.user.id);
      // Re-mount SchemesPanel so it re-fetches with updated profile
      setSchemesKey((k) => k + 1);
    }
  }, [session, loadProfile]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#F8FAFC',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        <style>{`@keyframes otg-spin { to { transform: rotate(360deg); } }`}</style>
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: 36,
              height: 36,
              border: '3px solid #E2E8F0',
              borderTopColor: '#2563EB',
              borderRadius: '50%',
              animation: 'otg-spin 0.7s linear infinite',
              margin: '0 auto 12px',
            }}
          />
          <div style={{ fontSize: 13, color: '#94A3B8' }}>
            Loading your dashboard…
          </div>
        </div>
      </div>
    );
  }

  const firstName = profile?.full_name?.split(' ')[0] || 'there';

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: '#F8FAFC',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Fixed sidebar */}
      <DashboardSidebar profile={profile} />

      {/* Main area — offset by sidebar width */}
      <div
        style={{
          flex: 1,
          marginLeft: 224,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        {/* Sticky top bar */}
        <header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 40,
            background: '#fff',
            borderBottom: '1px solid #E2E8F0',
            padding: '0 24px',
            height: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 1px 4px rgba(15,23,42,0.04)',
          }}
        >
          <div>
            <span
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: '#0F172A',
                letterSpacing: '-0.02em',
              }}
            >
              {greeting()}, {firstName} 👋
            </span>
            <span
              style={{
                fontSize: 12.5,
                color: '#94A3B8',
                marginLeft: 10,
                fontWeight: 400,
              }}
            >
              Your schemes dashboard
            </span>
          </div>

          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <button
              onClick={() => router.push('/profile')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '7px 14px',
                border: '1px solid #E2E8F0',
                borderRadius: 8,
                background: '#F8FAFC',
                color: '#0F172A',
                fontSize: 12.5,
                fontWeight: 500,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Edit Profile
            </button>

            <button
              onClick={handleLogout}
              style={{
                padding: '7px 14px',
                border: 'none',
                borderRadius: 8,
                background: '#FEF2F2',
                color: '#DC2626',
                fontSize: 12.5,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Logout
            </button>
          </div>
        </header>

        {/* Page body */}
        <main
          style={{
            flex: 1,
            padding: '20px 24px',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 380px',
              gap: 16,
              alignItems: 'start',
              maxWidth: 1200,
              margin: '0 auto',
            }}
          >
            {/* Left column — assistant + progress */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <AssistantPanel
                session={session}
                onProfileUpdate={handleProfileUpdate}
              />
              <ProfileCompletionCard profile={profile} />
            </div>

            {/* Right column — schemes */}
            <div>
              <SchemesPanel key={schemesKey} />
            </div>
          </div>
        </main>
      </div>

      {/* Responsive: collapse sidebar on small screens */}
      <style>{`
        @media (max-width: 768px) {
          /* Sidebar hidden on mobile — future: add hamburger toggle */
        }
      `}</style>
    </div>
  );
}