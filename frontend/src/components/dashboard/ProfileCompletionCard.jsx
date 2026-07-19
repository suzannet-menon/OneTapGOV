'use client';
import { useMemo } from 'react';

const BASIC_FIELDS = [
    'preferred_language',
    'age',
    'gender',
    'state',
    'district',
    'income',
    'category',
    'sector',
];

const FARMER_FIELDS = [
    'agricultural_land',
    'area',
    'registered_in_your_name',
    'primary_occu',
    'crops',
    'source_of_irrigation',
    'bank_account',
    'gov_records',
    'live_stock',
    'agri_machinery',
];

const STUDENT_FIELDS = [
    'institution_details',
    'academic_performance',
    'minority_status',
    'disability',
    'hostel_status',
    'course_type',
    'scholarship_purpose',
    'special_groups',
    'nationality',
    'existing_benefits',
];

const WOMEN_FIELDS = [
    'marital_status',
    'pregnancy_status',
    'lactating_mother',
    'children',
    'employment',
    'selfhelp_group',
    'disability',
    'minority',
    'housing',
    'bank_account',
    'government_benefits',
];

function calcPct(profile, fields) {
    if (!fields.length) return 0;
    const done = fields.filter((f) => {
        const v = profile?.[f];
        return v !== null && v !== undefined && String(v).trim() !== '';
    }).length;
    return Math.round((done / fields.length) * 100);
}

function getSectorFields(sector) {
    if (!sector) return [];
    const s = sector.toLowerCase();
    if (s.includes('farmer') || s.includes('agriculture')) return FARMER_FIELDS;
    if (s.includes('student') || s.includes('education')) return STUDENT_FIELDS;
    if (s.includes('women') || s.includes('woman')) return WOMEN_FIELDS;
    return [];
}

export default function ProfileCompletionCard({ profile }) {
    const basicPct = useMemo(() => calcPct(profile, BASIC_FIELDS), [profile]);
    const sector = profile?.sector;
    const sectorFields = useMemo(() => getSectorFields(sector), [sector]);
    const sectorPct = useMemo(
        () => calcPct(profile, sectorFields),
        [profile, sectorFields]
    );
    const sectorLabel = sector
        ? sector.charAt(0).toUpperCase() + sector.slice(1) + ' Details'
        : null;

    return (
        <div
            style={{
                background: '#fff',
                border: '1px solid #E2E8F0',
                borderRadius: 12,
                padding: '16px 18px',
                boxShadow: '0 2px 8px rgba(15,23,42,0.04)',
            }}
        >
            <div
                style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', marginBottom: 2 }}
            >
                Profile Completion
            </div>
            <div
                style={{ fontSize: 11.5, color: '#94A3B8', marginBottom: 14 }}
            >
                More detail = better scheme matches
            </div>

            <ProgressRow label="Basic Profile" pct={basicPct} color="#2563EB" />
            {sectorLabel && (
                <ProgressRow label={sectorLabel} pct={sectorPct} color="#1488A6" />
            )}
        </div>
    );
}

function ProgressRow({ label, pct, color }) {
    return (
        <div style={{ marginBottom: 12 }}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 5,
                }}
            >
                <span style={{ fontSize: 12, color: '#64748B' }}>{label}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color }}>{pct}%</span>
            </div>
            <div
                style={{
                    height: 6,
                    background: '#E2E8F0',
                    borderRadius: 3,
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        height: '100%',
                        width: `${pct}%`,
                        background: color,
                        borderRadius: 3,
                        transition: 'width 600ms ease',
                    }}
                />
            </div>
        </div>
    );
}