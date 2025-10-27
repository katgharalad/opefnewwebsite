import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Signup {
  email: string;
  timestamp: string;
}

const AdminSignups: React.FC = () => {
  const [signups, setSignups] = useState<Signup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSignups();
  }, []);

  const fetchSignups = async () => {
    try {
      const response = await fetch('/api/get-signups');
      if (!response.ok) throw new Error('Failed to fetch signups');
      
      const data = await response.json();
      setSignups(data.signups || []);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching signups:', err);
      setError('Failed to load signups');
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Email', 'Timestamp'],
      ...signups.map(s => [s.email, s.timestamp])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `beta-signups-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#97B34D] mx-auto mb-4"></div>
          <p className="font-mono">Loading signups...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="p-2 hover:bg-white/10 rounded transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-4xl font-bold">Beta Signups</h1>
              <p className="text-sm font-mono text-[#97B34D] mt-1">
                {signups.length} total signup{signups.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          
          {signups.length > 0 && (
            <button
              onClick={exportToCSV}
              className="px-6 py-3 bg-[#97B34D] text-black font-bold hover:bg-[#A2B879] transition-colors"
            >
              Export CSV
            </button>
          )}
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 rounded">
            <p className="text-red-400 font-mono">{error}</p>
          </div>
        )}

        {/* Signups list */}
        {signups.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl font-mono text-[#7E7E7E]">
              No signups yet
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {signups.map((signup, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-white/10 hover:border-[#97B34D]/50 rounded transition-colors bg-black/50"
              >
                <div>
                  <p className="font-mono text-[#97B34D]">{signup.email}</p>
                  <p className="text-sm text-[#7E7E7E] mt-1">
                    {new Date(signup.timestamp).toLocaleString()}
                  </p>
                </div>
                <div className="text-xs font-mono text-white/40">
                  #{signups.length - index}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSignups;

