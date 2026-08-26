import robotImage from '../assets/nn_bot.png';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import { healthProfileService } from '../services/healthProfileService';
import { deficiencyReportService } from '../services/deficiencyReportService';
const Dashboard = () => {
  const navigate = useNavigate();
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
    <div className="space-y-5">
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

      {/* AI Nutrition Coach */}
<Card
  hover
  className="relative overflow-hidden border-0 bg-gradient-to-r from-[#06271d] via-[#073b29] to-[#06271d] text-white min-h-[200px]"
>
  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.1fr_1.2fr_0.8fr] gap-6 items-center">

    {/* Left - AI Coach Introduction */}
    <div className="space-y-2">

      <div>
        <h3 className="text-2xl md:text-3xl font-bold leading-tight">
          AI Nutrition
          <span className="block text-green-400">
            Coach
          </span>
        </h3>

        <p className="text-gray-200 mt-4 text-sm md:text-sm max-w-sm">
          Ask anything about your health,
          nutrition, meals or symptoms.
        </p>
      </div>

      <Link to="/chat">
        <Button
          variant="primary"
          size="md"
          className="mt-2 rounded-full px-6"
        >
          Start Chatting →
        </Button>
      </Link>

    </div>


    {/* Middle - Greeting + Suggested Questions */}
    <div className="space-y-2">

      {/* Greeting */}
      <div className="inline-block bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-4 border border-white/10">
        <p className="text-sm md:text-sm">
          👋 Hi Samanvitha! How can I help you today?
        </p>
      </div>

      {/* Suggested Questions */}
      <div className="space-y-2">

        <Link
          to="/chat"
          className="group block"
        >
          <div className="flex items-center justify-between bg-white/10 hover:bg-white/15 transition-all rounded-2xl px-4 py-2 border border-white/5">
            <span className="text-sm md:text-sm">
              What can I eat to improve my iron?
            </span>

            <span className="text-xl group-hover:translate-x-1 transition-transform">
              →
            </span>
          </div>
        </Link>


        <Link
          to="/chat"
          className="group block"
        >
          <div className="flex items-center justify-between bg-white/10 hover:bg-white/15 transition-all rounded-2xl px-4 py-2 border border-white/5">
            <span className="text-sm md:text-sm">
              Is it okay to take protein everyday?
            </span>

            <span className="text-xl group-hover:translate-x-1 transition-transform">
              →
            </span>
          </div>
        </Link>


        <Link
          to="/chat"
          className="group block"
        >
          <div className="flex items-center justify-between bg-white/10 hover:bg-white/15 transition-all rounded-2xl px-4 py-2 border border-white/5">
            <span className="text-sm md:text-sm">
              Suggest a healthy dinner for today
            </span>

            <span className="text-xl group-hover:translate-x-1 transition-transform">
              →
            </span>
          </div>
        </Link>

      </div>

    </div>


    {/* Right - Robot */}
    <div className="flex justify-center lg:justify-end items-end">

      <img
        src={robotImage}
        alt="NutriNav AI Nutrition Coach"
        className="w-40 md:w-44 lg:w-52 object-contain drop-shadow-2xl"
      />

    </div>

  </div>

  {/* Decorative glow */}
  <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"></div>

</Card>
      

      {/* Preview Cards Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">

  {/* ================= DEFICIENCY ANALYSIS ================= */}
  <Link to="/results/deficiency" className="h-full group">
    <Card
      hover
      className="h-full border-t-4 border-t-red-400 cursor-pointer"
    >

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">

        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
          🩸
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-800">
            Deficiency Analysis
          </h3>

          <p className="text-gray-500 text-sm mt-1">
            Track nutrient levels
          </p>
        </div>

      </div>


      {/* Deficiency */}
      <div className="bg-red-50 rounded-xl px-4 py-3 mb-4 flex items-center justify-between">

        <span className="text-sm font-medium text-gray-700">
          Iron
        </span>

        <span className="text-sm font-semibold text-red-500">
          severe
        </span>

      </div>


      {/* Upload message */}
      <div className="bg-teal-50 rounded-xl px-4 py-3 flex items-center gap-3">

        <span className="text-xl">
          ☁️
        </span>

        <p className="text-sm text-gray-600">
          Upload reports for detailed analysis
        </p>

      </div>


      {/* View Details */}
      <div className="mt-5 text-sm font-semibold text-teal-600 group-hover:translate-x-1 transition-transform">
        View Details →
      </div>

    </Card>
  </Link>


  {/* ================= FOOD GUIDANCE ================= */}
  <Link to="/results/food-guidance" className="h-full group">
    <Card
      hover
      className="h-full border-t-4 border-t-green-500 cursor-pointer"
    >

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">

        <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
          🥗
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-800">
            Food Guidance
          </h3>

          <p className="text-gray-500 text-sm mt-1">
            Personalized recommendations
          </p>
        </div>

      </div>


      {/* Recommendations */}
      <div className="mb-4">

        <p className="text-sm font-semibold text-gray-700 mb-3">
          Top Recommendations
        </p>

        <div className="flex flex-wrap gap-2">

          <span className="px-3 py-1.5 bg-green-50 rounded-full text-sm text-green-700">
            Spinach
          </span>

          <span className="px-3 py-1.5 bg-green-50 rounded-full text-sm text-green-700">
            Lentils
          </span>

          <span className="px-3 py-1.5 bg-green-50 rounded-full text-sm text-green-700">
            Beans
          </span>

        </div>

      </div>


      {/* Health Tips */}
      <div className="bg-green-50 rounded-xl px-4 py-3 flex items-center gap-3">

        <span className="text-xl">
          🌿
        </span>

        <p className="text-sm text-gray-600">
          Choose low glycemic foods
        </p>

      </div>


      {/* View Details */}
      <div className="mt-5 text-sm font-semibold text-green-600 group-hover:translate-x-1 transition-transform">
        View Details →
      </div>

    </Card>
  </Link>


  {/* ================= BODY EXPLORER ================= */}
  <Link to="/body-explorer" className="h-full group">
    <Card
      hover
      className="h-full border-t-4 border-t-purple-500 cursor-pointer"
    >

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">

        <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
          🧍
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-800">
            Body Explorer
          </h3>

          <p className="text-gray-500 text-sm mt-1">
            Nutrient relationships
          </p>
        </div>

      </div>


      {/* Body Mapping */}
      <div className="bg-purple-50 rounded-xl p-4 mb-4">

        <div className="flex items-start gap-3">

          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-xl">
            🫀
          </div>

          <div>

            <p className="text-sm font-medium text-gray-700">
              Interactive body mapping
            </p>

            <p className="text-xs text-gray-500 mt-1">
              Explore how nutrients work
              <br />
              for your body
            </p>

          </div>

        </div>

      </div>


      {/* Body Parts */}
      <div className="grid grid-cols-3 gap-2">

        {['Brain', 'Eyes', 'Heart'].map((part) => (

          <div
            key={part}
            className="px-2 py-2 bg-purple-50 rounded-lg text-xs font-medium text-center text-gray-700"
          >
            {part}
          </div>

        ))}

      </div>


      {/* Explore */}
      <div className="mt-5 text-sm font-semibold text-purple-600 group-hover:translate-x-1 transition-transform">
        Explore Now →
      </div>

    </Card>
  </Link>

</div>
     

      {/* Quick Actions */}
<Card>
  <h3 className="text-lg font-bold text-gray-800 mb-5">
    Quick Actions
  </h3>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

    {/* Upload Report */}
    <Link to="/medical-reports" className="group">
      <div className="
        h-full
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-5
        transition-all
        duration-300
        hover:shadow-lg
        hover:-translate-y-1
        cursor-pointer
      ">
        <div className="flex items-center gap-4 mb-4">
          <div className="
            w-14 h-14
            rounded-2xl
            bg-green-100
            flex items-center justify-center
            text-3xl
            group-hover:scale-110
            transition-transform
          ">
            📄
          </div>

          <h4 className="text-lg font-semibold text-gray-800">
            Upload Report
          </h4>
        </div>

        <p className="text-sm text-gray-500 leading-relaxed">
          Upload your medical report for AI-powered analysis.
        </p>

        <div className="
          mt-4
          text-sm
          font-medium
          text-green-600
          group-hover:translate-x-1
          transition-transform
        ">
          Upload now →
        </div>
      </div>
    </Link>


    {/* Results */}
    <Link to="/results" className="group">
      <div className="
        h-full
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-5
        transition-all
        duration-300
        hover:shadow-lg
        hover:-translate-y-1
        cursor-pointer
      ">
        <div className="flex items-center gap-4 mb-4">
          <div className="
            w-14 h-14
            rounded-2xl
            bg-blue-100
            flex items-center justify-center
            text-3xl
            group-hover:scale-110
            transition-transform
          ">
            📊
          </div>

          <h4 className="text-lg font-semibold text-gray-800">
            Results
          </h4>
        </div>

        <p className="text-sm text-gray-500 leading-relaxed">
          View your nutrient deficiencies and health insights.
        </p>

        <div className="
          mt-4
          text-sm
          font-medium
          text-blue-600
          group-hover:translate-x-1
          transition-transform
        ">
          View results →
        </div>
      </div>
    </Link>


    {/* Ask AI */}
    <Link to="/chat" className="group">
      <div className="
        h-full
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-5
        transition-all
        duration-300
        hover:shadow-lg
        hover:-translate-y-1
        cursor-pointer
      ">
        <div className="flex items-center gap-4 mb-4">
          <div className="
            w-14 h-14
            rounded-2xl
            bg-purple-100
            flex items-center justify-center
            text-3xl
            group-hover:scale-110
            transition-transform
          ">
            🤖
          </div>

          <h4 className="text-lg font-semibold text-gray-800">
            Ask AI
          </h4>
        </div>

        <p className="text-sm text-gray-500 leading-relaxed">
          Ask questions about nutrition, deficiencies and meals.
        </p>

        <div className="
          mt-4
          text-sm
          font-medium
          text-purple-600
          group-hover:translate-x-1
          transition-transform
        ">
          Start chatting →
        </div>
      </div>
    </Link>


    {/* Food Guidance */}
    <Link to="/results/food-guidance" className="group">
      <div className="
        h-full
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-5
        transition-all
        duration-300
        hover:shadow-lg
        hover:-translate-y-1
        cursor-pointer
      ">
        <div className="flex items-center gap-4 mb-4">
          <div className="
            w-14 h-14
            rounded-2xl
            bg-orange-100
            flex items-center justify-center
            text-3xl
            group-hover:scale-110
            transition-transform
          ">
            🥗
          </div>

          <h4 className="text-lg font-semibold text-gray-800">
            Food Guidance
          </h4>
        </div>

        <p className="text-sm text-gray-500 leading-relaxed">
          Discover personalized foods based on your health needs.
        </p>

        <div className="
          mt-4
          text-sm
          font-medium
          text-orange-600
          group-hover:translate-x-1
          transition-transform
        ">
          Explore foods →
        </div>
      </div>
    </Link>

  </div>
</Card>
    </div>
  );
};

export default Dashboard;
