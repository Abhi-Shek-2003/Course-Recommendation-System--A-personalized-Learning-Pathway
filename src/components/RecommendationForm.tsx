import React, { useState } from 'react';
import type { RecommendationResult } from '../types';

type Props = {
  type: 'content' | 'collaborative';
  onSubmit: (value: string) => Promise<RecommendationResult>;
};

export function RecommendationForm({ type, onSubmit }: Props) {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RecommendationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Validation
      if (type === 'content') {
        const marks = Number(value);
        if (isNaN(marks) || marks < 0 || marks > 200) {
          throw new Error('Please enter valid marks between 0 and 200');
        }
      } else {
        if (!/^\d+$/.test(value)) {
          throw new Error('Please enter a valid student number');
        }
      }

      const result = await onSubmit(value);
      setResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {type === 'content' 
              ? 'Enter your marks out of 200'
              : 'Enter your unique student number'}
          </label>
          <input
            type={type === 'content' ? 'number' : 'text'}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder={type === 'content' ? '0-200' : 'Student Number'}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-2 px-4 rounded-md hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          {loading ? 'Processing...' : 'Get Recommendation'}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {result && (
        <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-lg">
          <h4 className="font-medium text-green-800 mb-3">Recommended Course:</h4>
          <p className="text-2xl font-bold text-green-700 mb-2">{result.course}</p>
          <div className="flex items-center mt-3">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${result.confidence * 100}%` }}
              />
            </div>
            <span className="ml-3 text-sm text-gray-600">
              {Math.round(result.confidence * 100)}% confidence
            </span>
          </div>
        </div>
      )}
    </div>
  );
}