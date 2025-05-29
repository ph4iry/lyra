import { motion } from 'motion/react';
import { useState } from 'react';
import { ArticleData } from '@extractus/article-extractor';

interface DocumentModalProps {
  document: Partial<ArticleData>;
  onClose: () => void;
}

interface CachedOperation {
  id: string;
  type: string;
  result: string;
  timestamp: number;
}

export default function DocumentModal({ document, onClose }: DocumentModalProps) {
  const [cachedOperations, setCachedOperations] = useState<CachedOperation[]>(() => {
    const cached = localStorage.getItem(`doc-ops-${document.links[0]}`);
    return cached ? JSON.parse(cached) : [];
  });

  const saveCachedOperation = (operation: CachedOperation) => {
    const newOperations = [...cachedOperations, operation];
    setCachedOperations(newOperations);
    localStorage.setItem(`doc-ops-${document.links[0]}`, JSON.stringify(newOperations));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-neutral-800 rounded-lg shadow-xl max-5xl w-[90vw] h-[80vh] flex overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Left column - Content */}
        <div className="w-1/2 border-r border-neutral-700 p-6 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">{document.title}</h2>
          <div className="prose prose-invert max-w-none">
            <div className="leading-relaxed whitespace-pre-line" dangerouslySetInnerHTML={{ __html: document.content || '' }} />
          </div>
        </div>

        {/* Right column - Operations */}
        <div className="w-1/2 p-6 flex flex-col">
          <h2 className="text-xl font-semibold mb-4">Operations</h2>
          
          {/* Operation buttons */}
          <div className="space-y-2 mb-6">
            <button 
              className="w-full bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2 rounded-md transition"
              onClick={() => {
                // Placeholder for sentiment analysis
                saveCachedOperation({
                  id: Date.now().toString(),
                  type: 'sentiment',
                  result: 'Positive (placeholder)',
                  timestamp: Date.now()
                });
              }}
            >
              Analyze Sentiment
            </button>
            {/* Add more operation buttons here */}
          </div>

          {/* Cached results */}
          <div className="flex-1 overflow-y-auto">
            <h3 className="text-sm font-medium text-neutral-400 mb-2">Cached Results</h3>
            <div className="space-y-3">
              {cachedOperations.map(op => (
                <div key={op.id} className="bg-neutral-700/50 rounded-md p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium capitalize">{op.type}</span>
                    <span className="text-xs text-neutral-400">
                      {new Date(op.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm">{op.result}</p>
                </div>
              ))}
              {cachedOperations.length === 0 && (
                <p className="text-sm text-neutral-500">No cached operations yet</p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
} 