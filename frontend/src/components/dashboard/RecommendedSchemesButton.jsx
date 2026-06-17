'use client';
import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function RecommendedSchemesButton() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [docChecklist, setDocChecklist] = useState({});

  const toggleDocument = (schemeCode, docName) => {
    setDocChecklist(prev => ({
        ...prev,
        [schemeCode]: {
            ...prev[schemeCode],
            [docName]: !prev[schemeCode]?.[docName]
        }
    }));
  };

  const fetchRecommendedSchemes = async () => {
    setLoading(true);
    setResults(null);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("No session found");

      const res = await fetch('/api/backend/schemes/eligible', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(`HTTP Error ${res.status}: ${JSON.stringify(errorData)}`);
      }

      const data = await res.json();
      console.log("API Response Debug:", data);
      setResults(data);
    } catch (error) {
      console.error("Failed to fetch schemes:", error);
      setResults({ error: "Failed to fetch schemes.", details: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={fetchRecommendedSchemes}
        disabled={loading}
        className="w-full bg-green-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all disabled:opacity-50"
      >
        {loading ? 'Checking Eligibility...' : 'Recommended Schemes'}
      </button>

      {results && (
        <div className="mt-4 p-4 bg-white rounded-xl shadow-sm border space-y-4">
          {/* Debugging block: display raw structure if error */}
          {results.error || results.detail ? (
            <div className="text-red-600">
              <p>Error: {results.error || 'Unknown API Error'}</p>
              <pre className="text-xs">{JSON.stringify(results, null, 2)}</pre>
            </div>
          ) : results.status === 'incomplete' ? (
            <p className="text-red-600">{results.message}</p>
          ) : results.schemes && Array.isArray(results.schemes) ? (
            results.schemes.length === 0 ? (
              <p>No schemes matched your profile.</p>
            ) : (
              results.schemes.map((scheme, i) => (
                <div key={i} className="border-b pb-4 last:border-0">
                  <h3 className="font-bold text-lg">{scheme.scheme_name}</h3>
                  <p className={scheme.eligibility_details?.is_eligible ? "text-green-600" : "text-red-600"}>
                    {scheme.eligibility_details?.is_eligible ? "Eligible" : "Not Eligible"}
                  </p>
                  
                  {scheme.eligibility_details?.passed_conditions?.length > 0 && (
                    <div className="mt-2">
                      <p className="font-semibold text-sm">✅ Passed:</p>
                      <ul className="text-sm list-disc list-inside">
                        {scheme.eligibility_details.passed_conditions.map((c, j) => <li key={j}>{c}</li>)}
                      </ul>
                    </div>
                  )}
                  
                  {scheme.eligibility_details?.failed_conditions?.length > 0 && (
                    <div className="mt-2">
                      <p className="font-semibold text-sm">❌ Failed:</p>
                      <ul className="text-sm list-disc list-inside">
                        {scheme.eligibility_details.failed_conditions.map((c, j) => <li key={j}>{c}</li>)}
                      </ul>
                    </div>
                  )}
                  {scheme.documents && (
                    <div className="mt-4 border-t pt-4">
                      <p className="font-semibold text-sm mb-2">Document Checklist:</p>
                      {scheme.documents.map(doc => (
                        <div key={doc} className="flex items-center gap-2 mb-1">
                          <input 
                            type="checkbox" 
                            checked={docChecklist[scheme.scheme_code]?.[doc] || false}
                            onChange={() => toggleDocument(scheme.scheme_code, doc)}
                          />
                          <span className="text-sm">{doc}</span>
                        </div>
                      ))}
                      
                      {(() => {
                          const required = scheme.documents;
                          const held = required.filter(doc => docChecklist[scheme.scheme_code]?.[doc]);
                          const percentage = Math.round((held.length / required.length) * 100);
                          const missing = required.filter(doc => !docChecklist[scheme.scheme_code]?.[doc]);

                          return (
                              <div className="mt-3 p-2 bg-blue-50 rounded text-sm">
                                  <p className="font-bold">Readiness Score: {percentage}%</p>
                                  {missing.length > 0 && (
                                      <p className="text-red-600">Pending: {missing.join(', ')}</p>
                                  )}
                              </div>
                          );
                      })()}
                    </div>
                  )}
                </div>
              ))
            )
          ) : (
            <div className="text-red-600">
              <p>Error: Unexpected data format.</p>
              <pre className="text-xs">{JSON.stringify(results, null, 2)}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
