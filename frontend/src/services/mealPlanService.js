import api from "./api";

export const mealPlanService = {

  getMealPlan: async () => {
    const response = await api.get("/meal-plans/");
    return response.data;
  }

};