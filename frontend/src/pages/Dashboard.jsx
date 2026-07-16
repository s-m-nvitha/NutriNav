import React, { useState, useEffect } from 'react';
import aiAssistantIcon from '../assets/ai_health_assistant.png';
import deficiencyIcon from '../assets/deficiency_analysis.png';
import foodGuidanceIcon from '../assets/food_guidance.png';
import bodyExplorerIcon from '../assets/body_explorer.png';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import { healthProfileService } from '../services/healthProfileService';
import { deficiencyReportService } from '../services/deficiencyReportService';
const Dashboard = () => {
  console.log("Dashboard component loaded");
  const [completion, setCompletion] = useState(0);
  const [recommendations, setRecommendations] = useState({});
  const [deficiencies, setDeficiencies] = useState([]);
  const loadProfileCompletion = async () => {
  try {
    const profile = await healthProfileService.get();

    if (!profile) {
      setCompletion(0);
      return;
    }

    const fields = [
      profile.age,
      profile.gender,
      profile.height,
      profile.weight,
      profile.dietary_preference,
      profile.lifestyle,
    ];

    const completedFields = fields.filter(
      (field) => field !== null && field !== undefined && field !== ''
    ).length;

    const percentage = Math.round(
      (completedFields / fields.length) * 100
    );

    setCompletion(percentage);
  } catch (error) {
    setCompletion(0);
  }
};
const loadNutritionData = async () => {

  try {

    const deficiencyData =
      await deficiencyReportService.getAll();

console.log("Deficiency data from API:", deficiencyData);

const recommendationData =
      await deficiencyReportService.getRecommendations();

console.log(
  "Recommendations API:",
  recommendationData
);


setDeficiencies(
  recommendationData.deficiencies || []
);


setRecommendations(
  recommendationData.food_recommendations || {}
);


  } catch(error){

    console.log(
      "Nutrition data error:",
      error
    );

  }

};

useEffect(() => {

  console.log("Dashboard mounted");

  loadProfileCompletion();

  loadNutritionData();

}, []);

  return (
    <div className="space-y-8">
      {/* Profile Completion Status */}
      {completion < 100 && (
  <Link to="/health-profile">
    <Card className="bg-gradient-to-r from-blue-500 to-teal-500 text-white cursor-pointer hover:shadow-xl transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">
            Health Profile Completion
          </h3>
          <p className="text-blue-100 mt-1">
            Complete your profile to get personalized recommendations
          </p>
        </div>

        <div className="text-right">
          <div className="text-3xl font-bold">{completion}%</div>
          <p className="text-blue-100 text-sm">Complete</p>
        </div>
      </div>

      <div className="mt-4 bg-white/20 rounded-full h-2">
        <div
          className="bg-white rounded-full h-2 transition-all duration-500"
          style={{ width: `${completion}%` }}
        ></div>
      </div>
    </Card>
  </Link>
)}

      {/* Main AI Health Assistant - Full Width */}
      <Card hover className="border-l-4 border-l-blue-500">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">AI Health Assistant</h3>
            <p className="text-gray-600 mt-1">Your personal AI-powered health companion</p>
          </div>
          <img
  src={aiAssistantIcon}
  alt="AI Health Assistant"
  className="w-12 h-12 object-contain"
/>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-xl p-4 hover:shadow-md transition-shadow">
            <h4 className="font-semibold text-gray-800 mb-2">Health Summary</h4>
            <p className="text-sm text-gray-600">Upload reports for AI insights</p>
          </div>
          
          <div className="bg-teal-50 rounded-xl p-4 hover:shadow-md transition-shadow">
            <h4 className="font-semibold text-gray-800 mb-2">Upload Reports</h4>
            <Link to="/medical-reports">
              <Button variant="primary" size="sm" className="mt-2">
                Upload Now
              </Button>
            </Link>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow">
            <h4 className="font-semibold text-gray-800 mb-2">AI Chat</h4>
            <p className="text-sm text-gray-500">Coming Soon</p>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow">
            <h4 className="font-semibold text-gray-800 mb-2">Analysis Status</h4>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Waiting for data</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Preview Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {/* Deficiency Analysis Preview */}
        <Link to="/results/deficiency" className="h-full">
          <Card hover className="border-t-4 border-t-teal-500 cursor-pointer h-full">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-800">Deficiency Analysis</h3>
                <p className="text-gray-500 text-sm mt-1">Track nutrient levels</p>
              </div>
              <img
  src={deficiencyIcon}
  alt="Deficiency Analysis"
  className="w-12 h-12 object-contain"
/>
            </div>
            
            <div className="space-y-2 mb-4">

{
  deficiencies.length > 0 ? (

    deficiencies.map((item)=>(

      <div
        key={item.id}
        className="flex items-center justify-between"
      >

        <span className="text-xs font-medium text-gray-600">
          {item.nutrient}
        </span>

        <span className="text-xs text-red-500">
          {item.severity}
        </span>

      </div>

    ))

  ) : (

    <p className="text-xs text-gray-500">
      No deficiencies detected yet
    </p>

  )
}

</div>
            
            <div className="bg-teal-50 rounded-lg p-3">
              <p className="text-xs text-gray-600">Upload reports for detailed analysis</p>
            </div>
          </Card>
        </Link>

        {/* Food Recommendations Preview */}
        <Link to="/results/food-guidance" className="h-full">
          <Card hover className="border-t-4 border-t-green-500 cursor-pointer h-full">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-800">Food Guidance</h3>
                <p className="text-gray-500 text-sm mt-1">Personalized recommendations</p>
              </div>
              <img
  src={foodGuidanceIcon}
  alt="Food Guidance"
  className="w-12 h-12 object-contain"
/>
            </div>
            
          
              <div className="space-y-3 mb-4">

{
Object.keys(recommendations).length > 0 ? (

Object.entries(recommendations).map(
([nutrient, foods]) => (

<div key={nutrient}>

<p className="text-xs font-semibold text-gray-700">
{nutrient}
</p>

<div className="flex flex-wrap gap-1 mt-1">

{
Array.isArray(foods) && foods.map((food)=>(

<span
key={food}
className="px-2 py-1 bg-green-50 rounded text-xs text-gray-600"
>
{food}
</span>

))
}

</div>

</div>

))

) : (

<p className="text-xs text-gray-500">
Complete profile for recommendations
</p>

)

}

</div>


<div className="bg-green-50 rounded-lg p-3">
              <p className="text-xs text-gray-600">Complete profile for full recommendations</p>
            </div>
          </Card>
        </Link>

        {/* Body Nutrient Explorer Preview */}
        <Link to="/results/body-explorer" className="h-full">
          <Card hover className="border-t-4 border-t-purple-500 cursor-pointer h-full">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-800">Body Explorer</h3>
                <p className="text-gray-500 text-sm mt-1">Nutrient relationships</p>
              </div>
              <img
  src={bodyExplorerIcon}
  alt="Body Explorer" 
  className="w-12 h-12 object-contain"
/>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-4 mb-4">
  <div className="flex flex-col items-center justify-center">
    <div className="text-4xl mb-2">🫀</div>

    <p className="text-xs text-gray-600 text-center">
      Interactive body mapping
    </p>
  </div>
</div>
            
            <div className="grid grid-cols-3 gap-1">
              {['Brain', 'Eyes', 'Heart'].map((part) => (
                <button
                  key={part}
                  className="px-2 py-1.5 bg-purple-50 rounded text-xs font-medium text-gray-700 hover:bg-purple-100 transition-colors"
                >
                  {part}
                </button>
              ))}
            </div>
          </Card>
        </Link>
      </div>

      {/* Quick Actions */}
      <Card>
        <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/health-profile">
            <Button variant="secondary" size="md" className="w-full">
              Update Profile
            </Button>
          </Link>
          <Link to="/medical-reports">
            <Button variant="secondary" size="md" className="w-full">
              Upload Report
            </Button>
          </Link>
          <Link to="/results">
  <Button variant="secondary" size="md" className="w-full">
    View Results
  </Button>
</Link>
          <Button variant="ghost" size="md" className="w-full">
            Coming Soon
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
