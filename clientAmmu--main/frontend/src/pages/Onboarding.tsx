import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function Onboarding() {
  const [samples, setSamples] = useState(['', '', '']);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSampleChange = (index: number, value: string) => {
    const newSamples = [...samples];
    newSamples[index] = value;
    setSamples(newSamples);
  };

  const addSample = () => setSamples([...samples, '']);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Mock API call to backend
      const response = await fetch('http://localhost:8000/api/fingerprint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ samples: samples.filter(s => s.trim().length > 0) })
      });
      const data = await response.json();
      // Store in local storage for the prototype
      localStorage.setItem('contentdna_fingerprint', JSON.stringify(data));
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const wordCount = samples.join(' ').trim().split(/\s+/).filter(w => w.length > 0).length;

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Build Your Voice Fingerprint</h1>
        <p className="text-gray-600">
          Provide at least 3-5 writing samples that perfectly capture your brand's voice. 
          We recommend a mix of blog posts, social media captions, and emails.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {samples.map((sample, index) => (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            key={index} 
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-200"
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Writing Sample {index + 1}
            </label>
            <textarea
              className="w-full min-h-[120px] p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-y"
              placeholder="Paste your content here..."
              value={sample}
              onChange={(e) => handleSampleChange(index, e.target.value)}
            />
          </motion.div>
        ))}

        <div className="flex items-center justify-between pt-4">
          <button
            type="button"
            onClick={addSample}
            className="text-blue-600 font-medium hover:text-blue-700 flex items-center space-x-1"
          >
            <span>+ Add another sample</span>
          </button>
          
          <div className="text-sm text-gray-500">
            Total words: <span className={`font-medium ${wordCount >= 500 ? 'text-green-600' : 'text-orange-500'}`}>{wordCount}/500</span> recommended
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <button
            type="submit"
            disabled={loading || wordCount < 50}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors shadow-sm"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2 h-5 w-5" />
                Analyzing Brand Voice...
              </>
            ) : (
              'Generate Voice Fingerprint'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
