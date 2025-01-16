import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { RecommendationCard } from './components/RecommendationCard';
import { RecommendationForm } from './components/RecommendationForm';
import { getContentRecommendation, getCollaborativeRecommendation } from './lib/api';
import type { RecommendationResult } from './types';

type View = 'home' | 'content' | 'collaborative';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');

  const handleRecommendation = async (value: string): Promise<RecommendationResult> => {
    if (currentView === 'content') {
      return getContentRecommendation(value);
    } else {
      return getCollaborativeRecommendation(value);
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Choose Your Recommendation Method
              </h2>
              <p className="mt-4 text-xl text-gray-600">
                Get personalized course recommendations based on your profile or academic performance
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <RecommendationCard
                title="Content-Based Recommendation"
                description="Get course recommendations based on your academic performance and course difficulty levels. Perfect for understanding which courses match your current academic strength."
                icon="content"
                onClick={() => setCurrentView('content')}
              />
              <RecommendationCard
                title="Collaborative-Based Recommendation"
                description="Get personalized recommendations based on similar student profiles and their course selections. Ideal for discovering courses that similar students have succeeded in."
                icon="collaborative"
                onClick={() => setCurrentView('collaborative')}
              />
            </div>
            
            <div className="mt-16 bg-indigo-50 rounded-2xl p-8">
              <div className="max-w-3xl mx-auto text-center">
                <h3 className="text-2xl font-bold text-indigo-900 mb-4">
                  How It Works
                </h3>
                <div className="grid md:grid-cols-3 gap-6 text-left">
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="text-indigo-600 font-semibold mb-2">Step 1</div>
                    <p className="text-gray-600">Choose your preferred recommendation method based on your needs</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="text-indigo-600 font-semibold mb-2">Step 2</div>
                    <p className="text-gray-600">Enter your academic details or student ID for personalized analysis</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="text-indigo-600 font-semibold mb-2">Step 3</div>
                    <p className="text-gray-600">Get tailored course recommendations with confidence scores</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'content':
      case 'collaborative':
        return (
          <div className="max-w-4xl mx-auto px-4">
            <button
              onClick={() => setCurrentView('home')}
              className="mb-6 text-indigo-600 hover:text-indigo-800 flex items-center"
            >
              ← Back to Home
            </button>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-6 text-center">
                {currentView === 'content' 
                  ? 'Content-Based Recommendation' 
                  : 'Collaborative-Based Recommendation'}
              </h2>
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">How this works:</h3>
                <p className="text-gray-600">
                  {currentView === 'content' 
                    ? 'Based on your marks, we analyze course difficulty levels and match you with courses that align with your academic performance. This helps ensure you select courses that match your current academic strength.'
                    : 'We analyze patterns from similar student profiles to recommend courses. This method considers the success rates of students with similar academic backgrounds to provide personalized recommendations.'}
                </p>
              </div>
              <RecommendationForm
                type={currentView}
                onSubmit={handleRecommendation}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow py-12">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}