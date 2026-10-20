import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, AlertCircle, RefreshCw, Check } from 'lucide-react';

export default function Checker() {
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [fingerprint, setFingerprint] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem('contentdna_fingerprint');
    if (stored) {
      setFingerprint(JSON.parse(stored));
    }
  }, []);

  const handleCheck = async () => {
    if (!draft.trim()) return;
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fingerprint, draft })
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const applySuggestion = (suggestion: string) => {
    setDraft(suggestion);
    setResult(null); // Reset to allow re-checking
  };

  if (!fingerprint) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <AlertCircle className="h-16 w-16 text-orange-400 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Fingerprint Required</h2>
        <p className="text-gray-500 mb-6">You need to set up a brand fingerprint before checking content.</p>
        <Link to="/onboarding" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700">
          Go to Onboarding
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-2">Content Consistency Checker</h1>
      <p className="text-gray-600 mb-8">Paste your new draft below to see how well it matches your brand voice.</p>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Editor Side */}
        <div className="flex flex-col h-full space-y-4">
          <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
              <span className="font-medium text-gray-700">New Draft</span>
              <span className="text-xs text-gray-400">{draft.length} characters</span>
            </div>
            <textarea
              className="flex-1 w-full p-4 min-h-[400px] outline-none resize-none"
              placeholder="Start typing or paste your content here..."
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
            />
          </div>
          <button
            onClick={handleCheck}
            disabled={loading || !draft.trim()}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center shadow-sm"
          >
            {loading ? <RefreshCw className="animate-spin mr-2 h-5 w-5" /> : <ShieldCheck className="mr-2 h-5 w-5" />}
            Analyze Content
          </button>
        </div>

        {/* Results Side */}
        <div className="flex flex-col space-y-6">
          {result ? (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              {/* Score Card */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Consistency Score</h3>
                  <p className="text-sm text-gray-500">How closely it matches your brand.</p>
                </div>
                <div className={`text-4xl font-extrabold ${result.score >= 80 ? 'text-green-500' : result.score >= 60 ? 'text-orange-400' : 'text-red-500'}`}>
                  {result.score}<span className="text-xl text-gray-400">/100</span>
                </div>
              </div>

              {/* Feedback Card */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-orange-500" />
                  Analysis Feedback
                </h3>
                <p className="text-gray-700 bg-orange-50 p-4 rounded-lg border border-orange-100">
                  {result.feedback}
                </p>
              </div>

              {/* Suggestions Card */}
              {result.suggestions && result.suggestions.length > 0 && (
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">AI Suggestions</h3>
                  <div className="space-y-3">
                    {result.suggestions.map((suggestion: string, idx: number) => (
                      <div key={idx} className="bg-blue-50 border border-blue-100 p-4 rounded-lg flex flex-col items-start">
                        <p className="text-gray-800 italic mb-3">"{suggestion}"</p>
                        <button 
                          onClick={() => applySuggestion(suggestion)}
                          className="flex items-center text-sm text-blue-600 font-medium hover:text-blue-800 bg-white px-3 py-1.5 rounded-md border border-blue-200 shadow-sm"
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Apply Suggestion
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center bg-gray-50 rounded-2xl border border-gray-200 border-dashed p-8 text-center text-gray-400">
              <ShieldCheck className="h-12 w-12 mb-3 text-gray-300" />
              <p>Analyze your draft to see the consistency score and suggestions here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
