import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { mealPlanService } from "../services/mealPlanService";
import { useNavigate } from "react-router-dom";


const MealPlanner = () => {
  const navigate = useNavigate();
  const [mealPlan, setMealPlan] = useState({});
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    loadMealPlan();
  }, []);


  const loadMealPlan = async () => {

    try {

      const data = await mealPlanService.getMealPlan();

      setMealPlan(data.meal_plan || {});

    } catch (error) {

      console.log(
        "Unable to load meal plan",
        error
      );

    } finally {

      setLoading(false);

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


      </Card>



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