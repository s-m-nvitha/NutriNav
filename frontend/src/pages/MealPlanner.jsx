import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { mealPlanService } from "../services/mealPlanService";
import { useNavigate } from "react-router-dom";


const MealPlanner = () => {
  const navigate = useNavigate();
  const [mealPlan, setMealPlan] = useState({});
  const [personalization, setPersonalization] = useState([]);
  const [loading, setLoading] = useState(true);
  const [explanation, setExplanation] = useState(null);
  const [explainingFood, setExplainingFood] = useState(null);


  useEffect(() => {
    loadMealPlan();
  }, []);


  const loadMealPlan = async () => {

    try {

      const data = await mealPlanService.getMealPlan();

      setMealPlan(data.meal_plan || {});
      setPersonalization(data.personalization || []);

    } catch (error) {

      console.log(
        "Unable to load meal plan",
        error
      );

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
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },

        body: JSON.stringify({
          food: food
        })
      }
    );


    const data = await response.json();

    setExplanation(data);


  } catch(error){

    console.log(
      "Meal explanation error",
      error
    );


  } finally {

    setExplainingFood(null);

  }

};


  if (loading) {

    return (
      <div className="text-center">
        Loading meal plan...
      </div>
    );

  }


  return (

    <div className="space-y-6">


      <Card>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          🍽️ Personalized Meal Planner
        </h2>


        <p className="text-gray-600">
          Your meal plan is generated based on:
        </p>


        <ul className="list-disc ml-6 mt-2 text-gray-600">

          <li>Detected deficiencies</li>

          <li>Diet preference</li>

          <li>Health conditions</li>

          <li>Allergies</li>

        </ul>
        <div className="flex flex-wrap gap-2 mt-4">

{
personalization.map((item)=>(
<span
key={item}
className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
>
✓ {item}
</span>
))  
}

</div>


      </Card>

{explanation && (

<Card>

<h3 className="text-lg font-bold text-gray-800">
🤖 NutriNav Insight
</h3>

<p className="text-sm text-gray-400 mt-1">
Powered by AI nutrition analysis
</p>

<p className="mt-2 text-gray-600">
{explanation.explanation}
</p>

<button
onClick={() => setExplanation(null)}
className="mt-3 text-sm text-red-500"
>
Close
</button>

</Card>

)}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


        {Object.entries(mealPlan).map(
          ([meal, foods]) => (

            <Card key={meal}>


              <h3 className="text-xl font-bold capitalize mb-4">
                {meal}
              </h3>



              <div className="space-y-3">


                {Array.isArray(foods) && foods.map(
                  (item) => (

                    <div
                      key={item.food}
                      className="bg-white rounded-xl p-4 mb-3 shadow-sm"
                    >

                      <p className="font-semibold text-gray-800">
                        🍴 {item.food}
                      </p>


                      <p className="text-sm text-gray-500 mt-1">
                        {item.reason}
                      </p>

                      <button
  onClick={() => explainMeal(item.food)}
  disabled={explainingFood === item.food}
  className="mt-3 text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-100 disabled:opacity-50"
>

{
  explainingFood === item.food
    ? "🤖 Analyzing..."
    : "🤖 Why this meal?"
}

</button>



                    </div>

                  )
                )}


              </div>


            </Card>

          )
        )}
<div className="mt-8 text-center">
  <button
    onClick={() => navigate("/progress")}
    className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700"
  >
    View Health Progress
  </button>
</div>

      </div>


    </div>

  );

};


export default MealPlanner;