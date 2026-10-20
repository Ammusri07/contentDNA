import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Fingerprint, BarChart3, MessageSquare, List } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const [fingerprint, setFingerprint] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem('contentdna_fingerprint');
    if (stored) {
      setFingerprint(JSON.parse(stored));
    }
  }, []);

  if (!fingerprint) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Fingerprint className="h-16 w-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold mb-2">No Fingerprint Found</h2>
        <p className="text-gray-500 mb-6">You haven't generated a brand voice fingerprint yet.</p>
        <Link to="/onboarding" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700">
          Go to Onboarding
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Brand Voice Fingerprint</h1>
          <p className="text-gray-600">Your digital DNA is ready to govern your content.</p>
        </div>
        <Link to="/checker" className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 shadow-sm">
          Check Content
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3 mb-4 text-blue-600">
            <MessageSquare className="h-6 w-6" />
            <h3 className="text-lg font-semibold text-gray-900">Dominant Tone</h3>
          </div>
          <p className="text-3xl font-bold capitalize text-gray-800">{fingerprint.tone}</p>
          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
            <span className="text-gray-500">Formality Score</span>
            <span className="font-semibold text-lg">{fingerprint.formality}/10</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3 mb-4 text-purple-600">
            <BarChart3 className="h-6 w-6" />
            <h3 className="text-lg font-semibold text-gray-900">Sentence Style</h3>
          </div>
          <p className="text-3xl font-bold capitalize text-gray-800">{fingerprint.sentence_style}</p>
          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
            <span className="text-gray-500">Point of View</span>
            <span className="font-semibold capitalize">{fingerprint.pov.replace('_', ' ')}</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3 mb-4 text-green-600">
            <List className="h-6 w-6" />
            <h3 className="text-lg font-semibold text-gray-900">Preferred Vocabulary</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {fingerprint.preferred_words.map((word: string, i: number) => (
              <span key={i} className="px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-sm font-medium">
                {word}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
