import React from 'react';
import { GraduationCap } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-6 px-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-center">
        <GraduationCap className="w-8 h-8 mr-3" />
        <h1 className="text-3xl font-bold">Elective Recommendation System</h1>
      </div>
    </header>
  );
}