import React from 'react';
import { BookOpen, Users } from 'lucide-react';

type Props = {
  title: string;
  description: string;
  icon: 'content' | 'collaborative';
  onClick: () => void;
};

export function RecommendationCard({ title, description, icon, onClick }: Props) {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-lg p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-100"
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="bg-gradient-to-r from-indigo-100 to-blue-100 p-4 rounded-full">
          {icon === 'content' ? (
            <BookOpen className="w-8 h-8 text-indigo-600" />
          ) : (
            <Users className="w-8 h-8 text-indigo-600" />
          )}
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
        <button className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors">
          Get Started
        </button>
      </div>
    </div>
  );
}