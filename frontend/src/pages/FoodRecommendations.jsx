import React from 'react';
import Card from '../components/Card';

const FoodRecommendations = () => {
  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Food Recommendations</h2>
        <p className="text-gray-600">Complete your health profile to get personalized food recommendations.</p>
      </Card>
    </div>
  );
};

export default FoodRecommendations;
