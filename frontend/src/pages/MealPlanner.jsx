import React, { useEffect, useRef, useState } from "react";
import { mealPlanService } from "../services/mealPlanService";
import { useNavigate } from "react-router-dom";
import mealPlanImage from "../assets/nn_meal.png";
import html2pdf from "html2pdf.js";

const MealPlanner = () => {
  // =====================================================
  // SCROLL REFERENCES
  // =====================================================

  const breakfastRef = useRef(null);
  const lunchRef = useRef(null);
  const snacksRef = useRef(null);
  const dinnerRef = useRef(null);

  // =====================================================
  // SCROLL FUNCTIONS
  // =====================================================

  const scrollVertical = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({
        top: 250,
        behavior: "smooth",
      });
    }
  };

  const scrollHorizontal = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: 350,
        behavior: "smooth",
      });
    }
  };

  // =====================================================
  // NAVIGATION
  // =====================================================

  const navigate = useNavigate();

  // =====================================================
  // STATE
  // =====================================================

  const [mealPlan, setMealPlan] = useState({});
  const [personalization, setPersonalization] = useState([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({});

  // =====================================================
  // LOAD MEAL PLAN
  // =====================================================

  useEffect(() => {
    loadMealPlan();
  }, []);

  const loadMealPlan = async () => {
    try {
      const data = await mealPlanService.getMealPlan();

      setMealPlan(data.meal_plan || {});
      setPersonalization(data.personalization || []);
      setSummary(data.summary || {});
    } catch (error) {
      console.log("Unable to load meal plan", error);
    } finally {
      setLoading(false);
    }
  };

    // =====================================================
  // DOWNLOAD MEAL PLAN AS PDF
  // =====================================================
  const handleDownloadPDF = () => {
    const pdfContent = document.createElement("div");

    pdfContent.style.padding = "30px";
    pdfContent.style.fontFamily = "Arial, sans-serif";
    pdfContent.style.color = "#1f2937";
    pdfContent.style.background = "#ffffff";

    let html = `
      <div style="text-align:center; margin-bottom:25px;">
        <h1 style="color:#047857; margin-bottom:8px;">
          NutriNav
        </h1>

        <h2 style="margin:0; color:#111827;">
          Personalized Meal Plan
        </h2>

        <p style="color:#6b7280; margin-top:8px;">
          Generated based on your health profile and nutritional needs
        </p>
      </div>
    `;

    const mealSections = [
      { name: "Breakfast", key: "breakfast", emoji: "☀️" },
      { name: "Lunch", key: "lunch", emoji: "☀️" },
      { name: "Snacks", key: "snacks", emoji: "🥤" },
      { name: "Dinner", key: "dinner", emoji: "🌙" }
    ];

    mealSections.forEach((meal) => {
      const foods = getMeal(meal.key);

      html += `
        <div style="
          margin-bottom:25px;
          border:1px solid #d1d5db;
          border-radius:12px;
          padding:18px;
        ">

          <h2 style="
            color:#047857;
            margin-top:0;
            margin-bottom:15px;
          ">
            ${meal.emoji} ${meal.name}
          </h2>
      `;

      if (foods.length === 0) {
        html += `
          <p style="color:#6b7280;">
            No items available.
          </p>
        `;
      } else {
        foods.forEach((item) => {
          html += `
            <div style="
              padding:12px;
              margin-bottom:10px;
              background:#f0fdf4;
              border-radius:8px;
            ">

              <h3 style="
                margin:0 0 5px 0;
                color:#111827;
              ">
                ${item.food}
              </h3>

              <p style="
                margin:0;
                color:#4b5563;
                font-size:14px;
              ">
                ${item.reason || ""}
              </p>

            </div>
          `;
        });
      }

      html += `</div>`;
    });

    if (personalization.length > 0) {
      html += `
        <div style="
          margin-top:20px;
          padding:18px;
          border:1px solid #d1d5db;
          border-radius:12px;
        ">

          <h2 style="
            color:#047857;
            margin-top:0;
          ">
            Personalization
          </h2>

          <ul>
      `;

      personalization.forEach((item) => {
        html += `
          <li style="margin-bottom:6px;">
            ${item}
          </li>
        `;
      });

      html += `
          </ul>
        </div>
      `;
    }

    html += `
      <div style="
        margin-top:30px;
        text-align:center;
        color:#6b7280;
        font-size:12px;
      ">
        Generated by NutriNav AI Nutrition Guide
      </div>
    `;

    pdfContent.innerHTML = html;

    const options = {
      margin: 10,
      filename: "NutriNav_Meal_Plan.pdf",
      image: {
        type: "jpeg",
        quality: 0.98
      },
      html2canvas: {
        scale: 2,
        useCORS: true
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait"
      }
    };

    html2pdf()
      .set(options)
      .from(pdfContent)
      .save();
  };


  // =====================================================
  // SHARE MEAL PLAN
  // =====================================================
  const handleSharePlan = async () => {
    let shareText = "🥗 NutriNav Personalized Meal Plan\n\n";

    const mealSections = [
      { name: "Breakfast", key: "breakfast" },
      { name: "Lunch", key: "lunch" },
      { name: "Snacks", key: "snacks" },
      { name: "Dinner", key: "dinner" }
    ];

    mealSections.forEach((meal) => {
      shareText += `\n${meal.name}\n`;
      shareText += "--------------------\n";

      const foods = getMeal(meal.key);

      if (foods.length === 0) {
        shareText += "No items available.\n";
      } else {
        foods.forEach((item) => {
          shareText += `• ${item.food}`;

          if (item.reason) {
            shareText += ` - ${item.reason}`;
          }

          shareText += "\n";
        });
      }
    });

    shareText += "\nGenerated by NutriNav AI Nutrition Guide.";

    try {
      // Use native share if available
      if (navigator.share) {
        await navigator.share({
          title: "NutriNav Meal Plan",
          text: shareText
        });
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(shareText);

        alert(
          "Meal plan copied to clipboard. You can now share it with your nutritionist."
        );
      }
    } catch (error) {
      // User closing the share window is not really an error
      if (error.name !== "AbortError") {
        console.error("Unable to share meal plan:", error);

        try {
          await navigator.clipboard.writeText(shareText);

          alert(
            "Meal plan copied to clipboard. You can now share it."
          );
        } catch (clipboardError) {
          console.error("Clipboard error:", clipboardError);
          alert("Unable to share the meal plan.");
        }
      }
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <p className="text-gray-600">Loading meal plan...</p>
      </div>
    );
  }

  // =====================================================
  // GET MEAL
  // =====================================================

  const getMeal = (name) => {
    return Array.isArray(mealPlan[name]) ? mealPlan[name] : [];
  };

  // =====================================================
  // FOOD CARD
  // =====================================================

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

  // =====================================================
  // PAGE
  // =====================================================

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
            <span className="text-green-300">
              Meal Planner
            </span>
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

        {/* DEFICIENCIES */}

        <div className="bg-white rounded-2xl border border-gray-300 p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-700">
                Deficiencies
              </p>

              <p className="text-3xl font-bold text-gray-800 mt-1">
                {summary.deficiencies_count || 0}
              </p>

              <p className="text-sm text-red-500 mt-1">
                {summary.deficiencies?.[0]
                  ? `${summary.deficiencies[0].nutrient_name} (${summary.deficiencies[0].severity})`
                  : "No deficiencies"}
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


        {/* NUTRIENTS */}

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


        {/* REPORTS */}

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


        {/* DAILY GOAL */}

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
          MEAL PLAN
      ===================================================== */}

      <section className="space-y-5">

        {/* ===================================================
            BREAKFAST + LUNCH + SNACKS
        =================================================== */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">


          {/* =================================================
              BREAKFAST
          ================================================= */}

          <div className="bg-white rounded-2xl border border-gray-300 p-5 shadow-sm flex flex-col">

            <h2 className="text-xl font-bold text-gray-800 mb-5">
              ☀️ Breakfast
            </h2>

            {/* SCROLLABLE BREAKFAST AREA */}

            <div
              ref={breakfastRef}
              className="space-y-3 h-[430px] overflow-y-scroll pr-2 scroll-smooth"
            >

              {getMeal("breakfast").map(renderFood)}

            </div>

            {/* BREAKFAST ARROW */}

            <div className="flex items-center justify-center mt-4">

              <button
                onClick={() => scrollVertical(breakfastRef)}
                className="w-10 h-10 rounded-full bg-green-700 text-white flex items-center justify-center text-lg font-bold hover:bg-green-800 shadow-md transition"
                title="Scroll down"
              >
                ↓
              </button>

            </div>

          </div>


          {/* =================================================
              LUNCH
          ================================================= */}

          <div className="bg-white rounded-2xl border border-gray-300 p-5 shadow-sm flex flex-col">

            <h2 className="text-xl font-bold text-gray-800 mb-5">
              ☀️ Lunch
            </h2>

            {/* SCROLLABLE LUNCH AREA */}

            <div
              ref={lunchRef}
              className="space-y-3 h-[430px] overflow-y-scroll pr-2 scroll-smooth"
            >

              {getMeal("lunch").map(renderFood)}

            </div>

            {/* LUNCH ARROW */}

            <div className="flex items-center justify-center mt-4">

              <button
                onClick={() => scrollVertical(lunchRef)}
                className="w-10 h-10 rounded-full bg-green-700 text-white flex items-center justify-center text-lg font-bold hover:bg-green-800 shadow-md transition"
                title="Scroll down"
              >
                ↓
              </button>

            </div>

          </div>


          {/* =================================================
              SNACKS
          ================================================= */}

          <div className="bg-white rounded-2xl border border-gray-300 p-5 shadow-sm flex flex-col">

            <h2 className="text-xl font-bold text-gray-800 mb-5">
              🥤 Snacks
            </h2>

            {/* SCROLLABLE SNACKS AREA */}

            <div
              ref={snacksRef}
              className="space-y-3 h-[430px] overflow-y-scroll pr-2 scroll-smooth"
            >

              {getMeal("snacks").map(renderFood)}

            </div>

            {/* SNACKS ARROW */}

            <div className="flex items-center justify-center mt-4">

              <button
                onClick={() => scrollVertical(snacksRef)}
                className="w-10 h-10 rounded-full bg-green-700 text-white flex items-center justify-center text-lg font-bold hover:bg-green-800 shadow-md transition"
                title="Scroll down"
              >
                ↓
              </button>

            </div>

          </div>

        </div>


        {/* ===================================================
            DINNER
        =================================================== */}

        <div className="bg-white rounded-2xl border border-gray-300 p-5 shadow-sm">

          <div className="flex items-center justify-between mb-5">

            <h2 className="text-xl font-bold text-gray-800">
              🌙 Dinner
            </h2>

          </div>


          {/* HORIZONTAL SCROLL AREA */}

          <div
            ref={dinnerRef}
            className="flex gap-4 overflow-x-scroll scroll-smooth pb-3"
          >

            {getMeal("dinner").map((item) => (
              <div
                key={item.food}
                className="flex-none w-[85%] md:w-[48%]"
              >
                {renderFood(item)}
              </div>
            ))}

          </div>


          {/* DINNER ARROW */}

          <div className="flex items-center justify-end mt-4">

            <button
              onClick={() => scrollHorizontal(dinnerRef)}
              className="w-10 h-10 rounded-full bg-green-700 text-white flex items-center justify-center text-lg font-bold hover:bg-green-800 shadow-md transition"
              title="Scroll right"
            >
              →
            </button>

          </div>

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
              <span className="text-2xl">
                🌿
              </span>
            </div>

            <div className="space-y-2 text-sm text-gray-600">

              <p>
                🟢 Carbohydrates — <b>55%</b>
              </p>

              <p>
                🟡 Protein — <b>20%</b>
              </p>

              <p>
                🟠 Fats — <b>15%</b>
              </p>

              <p>
                🟤 Fiber — <b>7%</b>
              </p>

              <p>
                ⚪ Others — <b>3%</b>
              </p>

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


        {/* HEALTH TIPS */}

        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-300 p-6 shadow-sm">

          <h3 className="font-bold text-gray-800 mb-5">
            Health Tips for You
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">


            {/* TIP 1 */}

            <div className="bg-green-50 rounded-xl p-4">

              <div className="text-2xl mb-2">
                🌿
              </div>

              <h4 className="font-semibold text-gray-800">
                Include Iron Rich Foods
              </h4>

              <p className="text-xs text-gray-700 mt-1">
                Add spinach, lentils, raisins, and pumpkin seeds to your meals.
              </p>

            </div>


            {/* TIP 2 */}

            <div className="bg-green-50 rounded-xl p-4">

              <div className="text-2xl mb-2">
                🥤
              </div>

              <h4 className="font-semibold text-gray-800">
                Stay Hydrated
              </h4>

              <p className="text-xs text-gray-700 mt-1">
                Drink enough water throughout the day.
              </p>

            </div>


            {/* TIP 3 */}

            <div className="bg-green-50 rounded-xl p-4">

              <div className="text-2xl mb-2">
                ☀️
              </div>

              <h4 className="font-semibold text-gray-800">
                Get Sunlight
              </h4>

              <p className="text-xs text-gray-700 mt-1">
                Spend some time outdoors to support Vitamin D levels.
              </p>

            </div>

          </div>

        </div>


        {/* DOWNLOAD */}

        <div className="bg-white rounded-2xl border border-gray-300 p-6 shadow-sm">

          <h3 className="font-bold text-gray-800">
            Download / Share Plan
          </h3>

          <p className="text-sm text-gray-700 mt-2">
            Download your meal plan or share it with your nutritionist.
          </p>

          <div className="flex gap-2 mt-5">

  <button
    onClick={handleDownloadPDF}
    className="flex-1 bg-green-700 text-white px-4 py-2.5 rounded-xl text-sm hover:bg-green-800 transition"
  >
    ↓ Download PDF
  </button>

  <button
    onClick={handleSharePlan}
    className="flex-1 border border-green-200 text-green-700 px-4 py-2.5 rounded-xl text-sm hover:bg-green-50 transition"
  >
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
            onClick={() => navigate("/chat")}
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