import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Fingerprint, CheckCircle, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center py-16 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl"
      >
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 mb-6">
          Your Brand's Voice. <br/>
          <span className="text-blue-600">Encoded & Protected.</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10">
          ContentDNA learns your unique writing style to create a digital fingerprint. 
          Ensure every piece of content from your team sounds exactly like you.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/onboarding" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl">
            Create Your Voice Fingerprint
          </Link>
          <Link to="/checker" className="bg-white text-blue-600 border border-blue-200 px-8 py-3 rounded-lg font-medium text-lg hover:bg-blue-50 transition-colors shadow-sm">
            Try Content Checker
          </Link>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 mt-24 max-w-5xl">
        <FeatureCard 
          icon={<Fingerprint className="h-8 w-8 text-blue-500" />}
          title="Digital Fingerprint"
          description="We analyze your best content to extract tone, vocabulary, and rhythm, building your unique brand DNA."
        />
        <FeatureCard 
          icon={<CheckCircle className="h-8 w-8 text-green-500" />}
          title="Consistency Scoring"
          description="Grade every new draft against your brand fingerprint to ensure 100% voice alignment."
        />
        <FeatureCard 
          icon={<Sparkles className="h-8 w-8 text-purple-500" />}
          title="AI Rewrite Suggestions"
          description="Get instant, tailored suggestions to fix tone deviations and improve brand consistency."
        />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center"
    >
      <div className="bg-gray-50 p-4 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}
