import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import DashboardLayout from '../layouts/DashboardLayout';
import Dashboard from '../pages/Dashboard';
import HealthProfile from '../pages/HealthProfile';
import MedicalReports from '../pages/MedicalReports';
import Results from '../pages/Results';
import DeficiencyAnalysis from '../pages/DeficiencyAnalysis';
import FoodGuidance from '../pages/FoodGuidance';
import BodyExplorer from '../pages/BodyExplorer';
import MealPlanner from '../pages/MealPlanner';
import Chat from '../pages/Chat';
import Progress from "../pages/Progress";


const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
      <Route
        path="progress"
        element={<Progress />}
      />
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="health-profile" element={<HealthProfile />} />
        <Route path="medical-reports" element={<MedicalReports />} />
        <Route path="results" element={<Results />} />
        <Route path="results/deficiency" element={<DeficiencyAnalysis />} />
<Route path="results/food-guidance" element={<FoodGuidance />} />
<Route path="results/body-explorer" element={<BodyExplorer />} />
<Route path="meal-planner" element={<MealPlanner />} />
<Route path="chat" element={<Chat />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
