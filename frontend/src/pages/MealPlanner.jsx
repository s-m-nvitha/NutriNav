import React, { useEffect, useState } from "react";
import { mealPlanService } from "../services/mealPlanService";
import { useNavigate } from "react-router-dom";
import mealPlanImage from "../assets/nn_meal.png";


const MealPlanner = () => {
  const navigate = useNavigate();

  const [mealPlan, setMealPlan] = useState({});
  const [personalization, setPersonalization] = useState([]);
  const [loading, setLoading] = useState(true);
  const [explanation, setExplanation] = useState(null);
  const [explainingFood, setExplainingFood] = useState(null);
  const [breakfastStart, setBreakfastStart] = useState(0);
  const [lunchStart, setLunchStart] = useState(0);
  const [snacksStart, setSnacksStart] = useState(0);
  const [dinnerStart, setDinnerStart] = useState(0);


  useEffect(() => {
    loadMealPlan();
  }, []);

  const loadMealPlan = async () => {
    try {
      const data = await mealPlanService.getMealPlan();

      setMealPlan(data.meal_plan || {});
      setPersonalization(data.personalization || []);
    } catch (error) {
      console.log("Unable to load meal plan", error);
    } finally {
      setLoading(false);
    }
  };

  const explainMeal = async (food) => {
    try {
      setExplainingFood(food);

      const response = await fetch(
        "http://127.0.0.1:8000/meal-plans/explain",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            food: food,
          }),
        }
      );

      const data = await response.json();

      setExplanation(data);
    } catch (error) {
      console.log("Meal explanation error", error);
    } finally {
      setExplainingFood(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <p className="text-gray-600">Loading meal plan...</p>
      </div>
    );
  }

  const getMeal = (name) => {
    return Array.isArray(mealPlan[name]) ? mealPlan[name] : [];
  };
  const getVisibleMeals = (name, start) => {
  const meals = getMeal(name);

  return meals.slice(start, start + 1);
};

  const renderFood = (item) => (
    <div
      key={item.food}
      className="group flex gap-4 p-3.5 rounded-2xl bg-white border border-gray-200 hover:shadow-sm transition"
    >
      <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center text-3xl shrink-0">
        🍽️
      </div>

      <div className="flex-1">
        <h4 className="font-semibold text-gray-800">
          {item.food}
        </h4>

        <p className="text-sm text-gray-700 mt-1 leading-relaxed">
          {item.reason}
        </p>

      </div>
    </div>
  );

  return (
    <div className="space-y-5 pb-8">

      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <section
        className="relative overflow-hidden rounded-3xl min-h-[260px] bg-[#004831]"
      >
        {/* Background image */}
        <img
          src={mealPlanImage}
          alt="Healthy meal plan"
          className="absolute right-0 top-0 h-full w-[38%] object-cover object-right opacity-95"
        />

        {/* Image blending */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#004d3a] via-[#004d3a]/50 to-transparent" />

        {/* Hero content */}
        <div className="relative z-10 p-8 md:p-10 max-w-[62%] text-white">

          <h1 className="text-3xl md:text-4xl font-bold">
            🍽️ Personalized{" "}
            <span className="text-green-300">Meal Planner</span>
          </h1>

          <p className="mt-3 text-green-50 text-base md:text-lg">
            Your meal plan is generated based on your health profile,
            nutritional needs, and personal preferences.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {personalization.map((item) => (
              <span
                key={item}
                className="bg-white/15 border border-white/20 text-white px-3 py-1.5 rounded-full text-sm backdrop-blur-sm"
              >
                ✓ {item}
              </span>
            ))}
          </div>

        </div>
      </section>


      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        <div className="bg-white rounded-2xl border border-gray-300 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Deficiencies
              </p>

              <p className="text-3xl font-bold text-gray-800 mt-1">
                {personalization.filter((item) =>
                  item.toLowerCase().includes("deficien")
                ).length || 1}
              </p>

              <p className="text-sm text-red-500 mt-1">
                Iron (Low)
              </p>
            </div>

            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-2xl">
              🔥
            </div>
          </div>

          <button className="text-sm text-gray-700 mt-4">
            View details →
          </button>
        </div>


        <div className="bg-white rounded-2xl border border-gray-300 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Nutrients Stable
              </p>

              <p className="text-3xl font-bold text-gray-800 mt-1">
                12
              </p>

              <p className="text-sm text-green-600 mt-1">
                Good
              </p>
            </div>

            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-2xl">
              ✓
            </div>
          </div>

          <button className="text-sm text-gray-700 mt-4">
            View all →
          </button>
        </div>


        <div className="bg-white rounded-2xl border border-gray-300 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Reports Analyzed
              </p>

              <p className="text-3xl font-bold text-gray-800 mt-1">
                2
              </p>

              <p className="text-sm text-gray-700 mt-1">
                Latest report
              </p>
            </div>

            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-2xl">
              📄
            </div>
          </div>

          <button className="text-sm text-gray-700 mt-4">
            Upload new →
          </button>
        </div>


        <div className="bg-white rounded-2xl border border-gray-300 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Daily Goal Progress
              </p>

              <p className="text-3xl font-bold text-gray-800 mt-1">
                76%
              </p>

              <p className="text-sm text-orange-500 mt-1">
                Keep it up!
              </p>
            </div>

            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-2xl">
              🔥
            </div>
          </div>

          <button
            onClick={() => navigate("/progress")}
            className="text-sm text-gray-700 mt-4"
          >
            View progress →
          </button>
        </div>

      </section>


      {/* =====================================================
          AI EXPLANATION
      ===================================================== */}

      {explanation && (
        <section className="bg-white rounded-2xl border border-green-100 p-5 shadow-sm">

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-800">
                🤖 NutriNav Insight
              </h3>

              <p className="text-sm text-gray-400 mt-1">
                Powered by AI nutrition analysis
              </p>
            </div>

            <button
              onClick={() => setExplanation(null)}
              className="text-sm text-red-500"
            >
              Close
            </button>
          </div>

          <p className="mt-3 text-gray-600 leading-relaxed">
            {explanation.explanation}
          </p>

        </section>
      )}


      {/* =====================================================
    MEAL PLAN
===================================================== */}

<section className="space-y-5">

  {/* ===================================================
      BREAKFAST + LUNCH + SNACKS
  =================================================== */}

  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

    {/* ================= BREAKFAST ================= */}

    <div className="bg-white rounded-2xl border border-gray-300 p-5 shadow-sm">

      <h2 className="text-xl font-bold text-gray-800 mb-5">
        ☀️ Breakfast
      </h2>

      <div className="space-y-3">

        {getVisibleMeals("breakfast", breakfastStart).map(renderFood)}

      </div>

      {/* DOWN ARROW - ONLY IF MORE THAN 1 ITEM */}

      {getMeal("breakfast").length > 1 && (

  <div className="flex justify-center mt-4">

    <button
      onClick={() =>
        setBreakfastStart((prev) =>
          prev + 1 < getMeal("breakfast").length
            ? prev + 1
            : 0
        )
      }
      className="w-9 h-9 rounded-full bg-white border border-gray-300 shadow-sm
                 flex items-center justify-center text-lg text-gray-700
                 hover:bg-gray-50"
    >
      ↓
    </button>

  </div>

)}

    </div>


    {/* ================= LUNCH ================= */}

    <div className="bg-white rounded-2xl border border-gray-300 p-5 shadow-sm">

      <h2 className="text-xl font-bold text-gray-800 mb-5">
        ☀️ Lunch
      </h2>

      <div className="space-y-3">

        {getVisibleMeals("lunch", lunchStart).map(renderFood)}

      </div>

      {/* DOWN ARROW - ONLY IF MORE THAN 1 ITEM */}

      {getMeal("lunch").length > 1 && (

  <div className="flex justify-center mt-4">

    <button
      onClick={() =>
        setLunchStart((prev) =>
          prev + 1 < getMeal("lunch").length
            ? prev + 1
            : 0
        )
      }
      className="w-9 h-9 rounded-full bg-white border border-gray-300 shadow-sm
                 flex items-center justify-center text-lg text-gray-700
                 hover:bg-gray-50"
    >
      ↓
    </button>

  </div>

)}

    </div>


    {/* ================= SNACKS ================= */}

    <div className="bg-white rounded-2xl border border-gray-300 p-5 shadow-sm">

      <h2 className="text-xl font-bold text-gray-800 mb-5">
        🥤 Snacks
      </h2>

      <div className="space-y-3">

        {getVisibleMeals("snacks", snacksStart).map(renderFood)}

      </div>

      {/* DOWN ARROW - ONLY IF MORE THAN 1 ITEM */}

      {getMeal("snacks").length > 1 && (

  <div className="flex justify-center mt-4">

    <button
      onClick={() =>
        setSnacksStart((prev) =>
          prev + 1 < getMeal("snacks").length
            ? prev + 1
            : 0
        )
      }
      className="w-9 h-9 rounded-full bg-white border border-gray-300 shadow-sm
                 flex items-center justify-center text-lg text-gray-700
                 hover:bg-gray-50"
    >
      ↓
    </button>

  </div>

)}

    </div>

  </div>


  {/* ===================================================
      DINNER - FULL WIDTH
  =================================================== */}

  <div className="bg-white rounded-2xl border border-gray-300 p-5 shadow-sm">

    <div className="flex items-center justify-between mb-5">

      <h2 className="text-xl font-bold text-gray-800">
        🌙 Dinner
      </h2>

    </div>


    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      {getMeal("dinner")
        .slice(dinnerStart, dinnerStart + 2)
        .map(renderFood)}
  
    </div>


    {/* RIGHT ARROW - ONLY IF MORE THAN 2 ITEMS */}

    {getMeal("dinner").length > 2 && (

  <div className="flex justify-end mt-4">

    <button
      onClick={() =>
        setDinnerStart((prev) =>
          prev + 2 < getMeal("dinner").length
            ? prev + 2
            : 0
        )
      }
      className="w-9 h-9 rounded-full bg-white border border-gray-300 shadow-sm
                 flex items-center justify-center text-lg text-gray-700
                 hover:bg-gray-50"
    >
      →
    </button>

  </div>

)}

  </div>

</section>


      {/* =====================================================
          LOWER INFORMATION SECTION
      ===================================================== */}

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">

        {/* NUTRITIONAL BALANCE */}

        <div className="bg-white rounded-2xl border border-gray-300 p-6 shadow-sm">

          <h3 className="font-bold text-gray-800 mb-5">
            Nutritional Balance Overview
          </h3>

          <div className="flex items-center gap-6">

            <div className="w-28 h-28 rounded-full border-[18px] border-green-500 flex items-center justify-center">
              <span className="text-2xl">🌿</span>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <p>🟢 Carbohydrates — <b>55%</b></p>
              <p>🟡 Protein — <b>20%</b></p>
              <p>🟠 Fats — <b>15%</b></p>
              <p>🟤 Fiber — <b>7%</b></p>
              <p>⚪ Others — <b>3%</b></p>
            </div>

          </div>

        </div>


        {/* KEY NUTRIENTS */}

        <div className="bg-white rounded-2xl border border-gray-300 p-6 shadow-sm">

          <h3 className="font-bold text-gray-800 mb-5">
            Key Nutrients Focus
          </h3>

          <div className="grid grid-cols-2 gap-3">

            {[
              ["🔥", "Iron", "Low"],
              ["🧬", "Vitamin B12", "Good"],
              ["☀️", "Vitamin D", "Good"],
              ["🥛", "Calcium", "Good"],
              ["💧", "Vitamin C", "Good"],
              ["⚡", "Zinc", "Good"],
            ].map(([icon, name, status]) => (
              <div
                key={name}
                className="border border-gray-300 rounded-xl p-3 bg-green-50/30"
              >
                <p className="text-sm">
                  {icon} {name}
                </p>

                <p
                  className={`text-sm font-semibold mt-1 ${
                    status === "Low"
                      ? "text-red-500"
                      : "text-green-600"
                  }`}
                >
                  {status}
                </p>
              </div>
            ))}

          </div>

        </div>


        {/* HYDRATION */}

        <div className="bg-white rounded-2xl border border-gray-300 p-6 shadow-sm">

          <h3 className="font-bold text-gray-800 mb-5">
            Hydration Goal
          </h3>

          <div className="flex items-center gap-5">

            <div className="text-5xl">
              💧
            </div>

            <div>
              <p className="text-3xl font-bold text-gray-800">
                8 / 10
              </p>

              <p className="text-sm text-gray-700">
                Glasses
              </p>
            </div>

          </div>

          <p className="text-sm text-gray-700 mt-3">
            Keep sipping!
          </p>

          <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full w-[80%] bg-green-500 rounded-full" />
          </div>

        </div>

      </section>


      {/* =====================================================
          HEALTH TIPS + DOWNLOAD
      ===================================================== */}

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">

        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-300 p-6 shadow-sm">

          <h3 className="font-bold text-gray-800 mb-5">
            Health Tips for You
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div className="bg-green-50 rounded-xl p-4">
              <div className="text-2xl mb-2">🌿</div>
              <h4 className="font-semibold text-gray-800">
                Include Iron Rich Foods
              </h4>
              <p className="text-xs text-gray-700 mt-1">
                Add spinach, lentils, raisins, and pumpkin seeds to your meals.
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-4">
              <div className="text-2xl mb-2">🥤</div>
              <h4 className="font-semibold text-gray-800">
                Stay Hydrated
              </h4>
              <p className="text-xs text-gray-700 mt-1">
                Drink enough water throughout the day.
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-4">
              <div className="text-2xl mb-2">☀️</div>
              <h4 className="font-semibold text-gray-800">
                Get Sunlight
              </h4>
              <p className="text-xs text-gray-700 mt-1">
                Spend some time outdoors to support Vitamin D levels.
              </p>
            </div>

          </div>

        </div>


        <div className="bg-white rounded-2xl border border-gray-300 p-6 shadow-sm">

          <h3 className="font-bold text-gray-800">
            Download / Share Plan
          </h3>

          <p className="text-sm text-gray-700 mt-2">
            Download your meal plan or share it with your nutritionist.
          </p>

          <div className="flex gap-2 mt-5">

            <button className="flex-1 bg-green-700 text-white px-4 py-2.5 rounded-xl text-sm hover:bg-green-800">
              ↓ Download PDF
            </button>

            <button className="flex-1 border border-green-200 text-green-700 px-4 py-2.5 rounded-xl text-sm hover:bg-green-50">
              ↗ Share Plan
            </button>

          </div>

        </div>

      </section>


      {/* =====================================================
          AI CTA
      ===================================================== */}

      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#003f30] to-[#006b4f] p-7 text-white">

        <div className="relative z-10">

          <h2 className="text-2xl font-bold">
            Want AI to adjust your plan?
          </h2>

          <p className="mt-2 text-green-100">
            Ask AI Assistant to adjust meals, swap ingredients,
            or generate new plans.
          </p>

          <button
            onClick={() => navigate("/ai-assistant")}
            className="mt-5 bg-green-500 hover:bg-green-400 text-white font-semibold px-5 py-2.5 rounded-xl"
          >
            Ask AI Assistant →
          </button>

        </div>

        <div className="absolute right-8 bottom-3 text-7xl opacity-20">
          🤖
        </div>

      </section>


      {/* =====================================================
          PROGRESS BUTTON
      ===================================================== */}

      <div className="text-center pt-2">

        <button
          onClick={() => navigate("/progress")}
          className="bg-green-700 text-white px-7 py-3 rounded-xl hover:bg-green-800 transition"
        >
          View Health Progress
        </button>

      </div>

    </div>
  );
};

export default MealPlanner;