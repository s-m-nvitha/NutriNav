import api from "./api";

export const mealPlanService = {

  async getMealPlan(){

    const response = await api.get("/meal-plans/");

    return response.data;

  }

};