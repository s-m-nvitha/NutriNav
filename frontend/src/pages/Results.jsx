import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { deficiencyReportService } from '../services/deficiencyReportService';
import healthPlate from '../assets/nnplate.png';

const Results = () => {
  const [deficiencies, setDeficiencies] = useState([]);
  const [recommendations, setRecommendations] = useState({});
  const [aiExplanations, setAiExplanations] = useState([]);
  const [foodStart, setFoodStart] = useState(0);

  const totalDeficiencies = deficiencies.length;

  const foodItems = Object.entries(recommendations)
    .filter(([nutrient]) => nutrient.toLowerCase() !== 'health tips')
    .flatMap(([nutrient, foods]) =>
      Array.isArray(foods)
        ? foods.map((food) => ({
            food,
            nutrient,
          }))
        : []
    );

  const visibleFoods = foodItems.slice(foodStart, foodStart + 5);

  const overallStatus =
    deficiencies.length === 0
      ? 'Healthy'
      : deficiencies.some(
          (d) => d.severity?.toLowerCase() === 'severe'
        )
      ? 'Severe'
      : 'Moderate';

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'mild':
        return 'bg-yellow-100 text-yellow-700';

      case 'moderate':
        return 'bg-orange-100 text-orange-700';

      case 'severe':
        return 'bg-red-100 text-red-700';

      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  useEffect(() => {
    loadDeficiencies();
    loadRecommendations();
  }, []);

  const loadDeficiencies = async () => {
    try {
      const data = await deficiencyReportService.getAll();
      setDeficiencies(data);
    } catch (err) {
      console.log('No deficiencies found');
    }
  };

  const loadRecommendations = async () => {
    try {
      const data =
        await deficiencyReportService.getRecommendations();

      console.log('Recommendations:', data);

      setRecommendations(
        data.food_recommendations || {}
      );

      setAiExplanations(
        data.deficiencies || []
      );
    } catch (err) {
      console.log('No recommendations found');
    }
  };

  return (
    <div className="space-y-3 pb-2">

      {/* ================= HERO ================= */}
<div className="relative overflow-hidden rounded-3xl bg-[#004831] h-[170px]">

  {/* LEFT CONTENT */}
  <div className="absolute left-7 top-8 z-20 w-[42%]">

    <h1 className="text-3xl font-bold text-white">
      Your <span className="text-[#70d68a]">Health</span> Insights
    </h1>

    <p className="mt-2 text-sm leading-5 text-green-50 max-w-[440px]">
      Understand your deficiencies and get personalized food guidance.
    </p>

  </div>


  {/* FOUR FEATURES */}
  <div className="absolute right-[28%] top-[32px] z-20 flex gap-4">

    <div className="w-[85px] text-center">
      <div className="mx-auto mb-2 w-11 h-11 rounded-full bg-[#166b4d] flex items-center justify-center text-xl">
        💧
      </div>

      <p className="text-white text-xs font-semibold">
        Analyze
      </p>

      <p className="text-green-100 text-[10px]">
        Nutrient Levels
      </p>
    </div>


    <div className="w-[85px] text-center">
      <div className="mx-auto mb-2 w-11 h-11 rounded-full bg-[#166b4d] flex items-center justify-center text-xl">
        🌿
      </div>

      <p className="text-white text-xs font-semibold">
        Understand
      </p>

      <p className="text-green-100 text-[10px]">
        Deficiencies & Impact
      </p>
    </div>


    <div className="w-[85px] text-center">
      <div className="mx-auto mb-2 w-11 h-11 rounded-full bg-[#166b4d] flex items-center justify-center text-xl">
        🥗
      </div>

      <p className="text-white text-xs font-semibold">
        Improve
      </p>

      <p className="text-green-100 text-[10px]">
        Food Guidance
      </p>
    </div>


    <div className="w-[85px] text-center">
      <div className="mx-auto mb-2 w-11 h-11 rounded-full bg-[#166b4d] flex items-center justify-center text-xl">
        📈
      </div>

      <p className="text-white text-xs font-semibold">
        Track
      </p>

      <p className="text-green-100 text-[10px]">
        Your Progress
      </p>
    </div>

  </div>


  {/* PLATE IMAGE */}
  <div className="absolute right-0 top-0 h-full w-[29%]">

    <img
      src={healthPlate}
      alt="Healthy nutrition plate"
      className="h-full w-full object-cover object-center"
    />

    <div className="absolute inset-0 bg-gradient-to-r from-[#004831] via-[#004831]/30 to-transparent"></div>

  </div>

</div>


      {/* =====================================================
          SUMMARY CARDS
      ====================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr_1fr] gap-3">

        {/* DEFICIENCIES FOUND */}
        <div className="rounded-2xl border border-red-100 bg-gradient-to-br from-red-50 to-white p-4">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-2xl">
              💧
            </div>

            <div>
              <p className="text-xs text-gray-700">
                Deficiencies Found
              </p>

              <p className="text-3xl font-bold text-red-600">
                {totalDeficiencies}
              </p>

              {totalDeficiencies > 0 && (
                <span className="inline-block mt-1 px-3 py-1 text-[10px] font-semibold rounded-full bg-red-100 text-red-600">
                  severe
                </span>
              )}
            </div>

          </div>

        </div>


        {/* OVERALL STATUS */}
        <div className="rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 to-white p-4">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-2xl">
              🩺
            </div>

            <div>
              <p className="text-xs text-gray-700">
                Overall Status
              </p>

              <p className="text-2xl font-bold text-green-700">
                {overallStatus}
              </p>
            </div>

          </div>

        </div>


        {/* ANALYSIS INFORMATION */}
        <div className="rounded-2xl border border-gray-300 bg-white p-4">

          <div className="flex items-center gap-4 mb-3">

            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
              📅
            </div>

            <div>
              <p className="text-xs text-gray-700">
                Analysis
              </p>

              <p className="text-sm font-semibold text-gray-800">
                Latest Report
              </p>
            </div>

          </div>


          <div className="flex items-center gap-4">

            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
              🕐
            </div>

            <div>
              <p className="text-xs text-gray-700">
                Status
              </p>

              <p className="text-sm font-semibold text-gray-800">
                Analysis Complete
              </p>
            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          MAIN ANALYSIS - 3 SECTIONS
      ====================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr_2.6fr] gap-3">

        {/* =================================================
            DEFICIENCIES DETECTED
        ================================================== */}
        <Card>

          <h3 className="text-lg font-bold text-gray-800 mb-3">
            Deficiencies Detected
          </h3>

          <div className="space-y-3">

            {deficiencies.length > 0 ? (
              deficiencies.map((item) => (

                <div
                  key={item.id}
                  className="rounded-2xl bg-red-50/80 border border-red-100 p-3.5"
                >

                  <div className="flex items-center justify-between mb-3">

                    <div className="flex items-center gap-2">

                      <div className="w-3 h-3 rounded-full bg-red-500"></div>

                      <span className="font-semibold text-gray-800">
                        {item.nutrient_name}
                      </span>

                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-semibold ${getSeverityColor(
                        item.severity
                      )}`}
                    >
                      {item.severity}
                    </span>

                  </div>

                  <p className="text-xs text-gray-600">
                    Your level is {item.value || '6.5'} g/dL
                  </p>

                  <p className="text-xs text-gray-700 mt-1">
                    Normal range: 12.0 - 16.0 g/dL
                  </p>

                </div>

              ))
            ) : (

              <p className="text-sm text-gray-700">
                No deficiencies detected.
              </p>

            )}


            {/* UPLOAD REPORT */}
            <div className="rounded-2xl border border-gray-300 bg-gray-50 p-3.5">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  ☁️
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Upload New Report
                  </p>

                  <p className="text-xs text-gray-700">
                    Upload reports for detailed analysis
                  </p>
                </div>

              </div>

              <button className="mt-3 ml-1 px-4 py-2 rounded-full bg-[#075e45] text-white text-xs font-semibold hover:bg-[#064e3b] transition">
                Upload Report
              </button>

            </div>

          </div>

        </Card>


        {/* =================================================
            DEFICIENCY IMPACT
        ================================================== */}
        <Card>

          <h3 className="text-lg font-bold text-gray-800 mb-3">
            Deficiency Impact
          </h3>

          <div className="space-y-3">

            {deficiencies.map((item) => {

              const explanation =
                aiExplanations.find(
                  (d) => d.nutrient === item.nutrient_name
                )?.explanation ||
                'Explanation not available.';

              return (

                <div key={item.id}>

                  {/* IMPACT */}
                  <div className="rounded-2xl bg-yellow-50 border border-yellow-100 p-3.5">

                    <h4 className="font-semibold text-gray-800 mb-2">
                      {item.nutrient_name}
                    </h4>

                    <p className="text-xs leading-5 text-gray-600">
                      {explanation}
                    </p>

                  </div>


                  {/* COMMON SYMPTOMS */}
                  <div className="mt-2 rounded-2xl bg-yellow-50/60 border border-yellow-100 p-3.5">

                    <h4 className="text-sm font-semibold text-gray-800 mb-3">
                      Common Symptoms
                    </h4>

                    <div className="flex flex-wrap gap-2">

                      <span className="px-3 py-1 rounded-full bg-white border border-yellow-200 text-[10px] text-gray-600">
                        Fatigue
                      </span>

                      <span className="px-3 py-1 rounded-full bg-white border border-yellow-200 text-[10px] text-gray-600">
                        Weakness
                      </span>

                      <span className="px-3 py-1 rounded-full bg-white border border-yellow-200 text-[10px] text-gray-600">
                        Low Energy
                      </span>

                      <span className="px-3 py-1 rounded-full bg-white border border-yellow-200 text-[10px] text-gray-600">
                        Poor Concentration
                      </span>

                    </div>

                  </div>

                </div>

              );

            })}

          </div>

        </Card>


        {/* =================================================
            RECOMMENDED FOODS
        ================================================== */}
        <Card>

          <div className="flex items-center justify-between mb-3">

            <h3 className="text-lg font-bold text-gray-800">
              Recommended Foods
            </h3>

            <button className="px-4 py-2 rounded-full bg-[#075e45] text-white text-xs font-semibold">
              View Full Plan →
            </button>

          </div>


          {/* FOOD CAROUSEL */}
          <div className="relative">

  <div className="grid grid-cols-3 gap-3 pr-2">

    {visibleFoods.map(({ food, nutrient }, index) => (

      <div
        key={`${food}-${index}`}
        className="rounded-2xl border border-gray-300 bg-white shadow-sm overflow-hidden min-w-0"
      >

        {/* FOOD IMAGE / ICON */}
        <div className="h-[100px] bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center text-5xl">

          {food.toLowerCase().includes("spinach")
            ? "🥬"
            : food.toLowerCase().includes("lentil")
            ? "🫘"
            : food.toLowerCase().includes("bean")
            ? "🫘"
            : food.toLowerCase().includes("almond")
            ? "🥜"
            : food.toLowerCase().includes("orange")
            ? "🍊"
            : "🥗"}

        </div>

        {/* FOOD DETAILS */}
        <div className="p-2">

          <p className="font-semibold text-sm text-gray-800 truncate">
            {food}
          </p>

          <p className="text-[10px] text-gray-700 mt-1">
            Rich in {nutrient}
          </p>

          <span className="inline-block mt-1 px-2 py-1 rounded-full bg-green-50 text-green-700 text-[9px] font-semibold">
            Recommended
          </span>

        </div>

      </div>

    ))}

  </div>


  {/* RIGHT ARROW */}
  {foodItems.length > 5 && (
    <button
      onClick={() =>
        setFoodStart((prev) =>
          prev + 5 < foodItems.length ? prev + 1 : 0
        )
      }
      className="absolute right-[-12px] top-1/2 -translate-y-1/2
                 w-9 h-9 rounded-full bg-white shadow-md
                 border border-gray-200
                 flex items-center justify-center
                 text-lg text-gray-700
                 hover:bg-gray-50 z-10"
    >
      →
    </button>
  )}

</div>

        </Card>

      </div>


      {/* =====================================================
          HEALTHY HABITS + PROGRESS
      ====================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-3">


        {/* =================================================
            HEALTHY HABITS
        ================================================== */}
        <Card>

          <h3 className="text-lg font-bold text-gray-800 mb-3">
            Healthy Habits for You
          </h3>

          <div className="grid grid-cols-3 gap-2">

            {/* HABIT 1 */}
            <div className="rounded-2xl border border-gray-300 p-3 flex gap-3">

              <div className="w-10 h-10 shrink-0 rounded-full bg-green-100 flex items-center justify-center">
                🌿
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-800">
                  Eat Iron Rich Foods
                </p>

                <p className="text-xs text-gray-700 mt-1">
                  Include spinach, lentils, and beans in your meals.
                </p>
              </div>

            </div>


            {/* HABIT 2 */}
            <div className="rounded-2xl border border-gray-300 p-3 flex gap-3">

              <div className="w-10 h-10 shrink-0 rounded-full bg-green-100 flex items-center justify-center">
                ☕
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-800">
                  Avoid Tea & Coffee
                </p>

                <p className="text-xs text-gray-700 mt-1">
                  Avoid consuming them around meals.
                </p>
              </div>

            </div>


            {/* HABIT 3 */}
            <div className="rounded-2xl border border-gray-300 p-3 flex gap-3">

              <div className="w-10 h-10 shrink-0 rounded-full bg-orange-100 flex items-center justify-center">
                🍊
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-800">
                  Include Vitamin C
                </p>

                <p className="text-xs text-gray-700 mt-1">
                  Include oranges and other vitamin C foods.
                </p>
              </div>

            </div>

          </div>

        </Card>


        {/* =================================================
            TRACK YOUR PROGRESS
        ================================================== */}
        <Card>

          <div className="flex items-center justify-between mb-3">

            <h3 className="text-lg font-bold text-gray-800">
              Track Your Progress
            </h3>

            <span className="text-xs font-semibold text-green-700">
              View Progress →
            </span>

          </div>


          <div className="rounded-2xl border border-gray-300 p-3">

            <div className="grid grid-cols-3 gap-3">

              <div>
                <p className="text-xs text-gray-700">
                  Iron Level
                </p>

                <p className="text-xl font-bold text-red-600">
                  6.5{' '}
                  <span className="text-xs">
                    g/dL
                  </span>
                </p>
              </div>


              <div>
                <p className="text-xs text-gray-700">
                  Goal
                </p>

                <p className="text-xl font-bold text-green-700">
                  12.0{' '}
                  <span className="text-xs">
                    g/dL
                  </span>
                </p>
              </div>


              <div>
                <p className="text-xs text-gray-700">
                  Progress
                </p>

                <p className="text-xl font-bold text-green-600">
                  54%
                </p>
              </div>

            </div>


            {/* PROGRESS BAR */}
            <div className="mt-3 h-2 rounded-full bg-gray-200 overflow-hidden">

              <div className="h-full w-[54%] rounded-full bg-green-500"></div>

            </div>

          </div>

        </Card>

      </div>


      {/* =====================================================
          MEDICAL NOTE
      ====================================================== */}
      <div className="rounded-2xl border border-green-100 bg-green-50/50 p-3">

        <div className="flex items-start gap-4">

          <div className="w-10 h-10 shrink-0 rounded-full bg-green-100 flex items-center justify-center">
            🛡️
          </div>

          <div>

            <h4 className="font-semibold text-gray-800">
              Important Note
            </h4>

            <p className="text-xs text-gray-600 mt-1 leading-5">
              This analysis is based on the data you've provided and is
              for informational purposes only. For medical concerns,
              please consult a healthcare professional.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Results;