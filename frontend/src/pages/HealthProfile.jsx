import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { healthProfileService } from '../services/healthProfileService';

const HealthProfile = () => {
  const [formData, setFormData] = useState({
  age: '',
  gender: '',
  height: '',
  weight: '',
  dietary_preference: '',
  diseases: '',
  allergies: '',
  lifestyle: '',

  activity_level: '',
  goal: '',

  work_type: '',
  workout_type: '',
  workout_timing: '',

  hunger_pattern: '',
  cravings: '',

  sleep_duration: '',
  stress_level: '',

  meal_frequency: '',
  water_intake: '',

  budget_preference: '',
  cooking_preference: '',
});
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [profileExists, setProfileExists] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const profile = await healthProfileService.get();
      if (profile) {
        setFormData({
          age: profile.age || '',
          gender: profile.gender || '',
          height: profile.height || '',
          weight: profile.weight || '',
          dietary_preference: profile.dietary_preference || '',
          diseases: profile.diseases || '',
          allergies: profile.allergies || '',
          lifestyle: profile.lifestyle || '',
          activity_level: profile.activity_level || '',
          goal: profile.goal || '',

          work_type: profile.work_type || '',
          workout_type: profile.workout_type || '',
          workout_timing: profile.workout_timing || '',

          hunger_pattern: profile.hunger_pattern || '',
          cravings: profile.cravings || '',

          sleep_duration: profile.sleep_duration || '',
          stress_level: profile.stress_level || '',

          meal_frequency: profile.meal_frequency || '',
          water_intake: profile.water_intake || '',
          
          budget_preference: profile.budget_preference || '',
          cooking_preference: profile.cooking_preference || '',
        });
        setProfileExists(true);
      }
    } catch (err) {
      // Profile doesn't exist yet, that's okay
      setProfileExists(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const dataToSend = {
        age: formData.age ? parseInt(formData.age) : null,
        gender: formData.gender || null,
        height: formData.height ? parseInt(formData.height) : null,
        weight: formData.weight ? parseInt(formData.weight) : null,
        dietary_preference: formData.dietary_preference || null,
        diseases: formData.diseases || null,
        allergies: formData.allergies || null,
        lifestyle: formData.lifestyle || null,
        activity_level: formData.activity_level || null,
        goal: formData.goal || null,

        work_type: formData.work_type || null,
        workout_type: formData.workout_type || null,
        workout_timing: formData.workout_timing || null,

        hunger_pattern: formData.hunger_pattern || null,
        cravings: formData.cravings || null,

        sleep_duration: formData.sleep_duration || null,
        stress_level: formData.stress_level || null,

        meal_frequency: formData.meal_frequency || null,
        water_intake: formData.water_intake || null,

        budget_preference: formData.budget_preference || null,
        cooking_preference: formData.cooking_preference || null,
      };
      
      if (profileExists) {
        await healthProfileService.update(dataToSend);
      } else {
        await healthProfileService.create(dataToSend);
        setProfileExists(true);
      }
      
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to save profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Health Profile</h2>
        
        {saved && (
          <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-xl mb-4">
            Profile saved successfully!
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Age"
              type="number"
              name="age"
              placeholder="Enter your age"
              value={formData.age}
              onChange={handleChange}
            />
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Height (cm)"
              type="number"
              name="height"
              placeholder="Enter your height"
              value={formData.height}
              onChange={handleChange}
            />
            
            <Input
              label="Weight (kg)"
              type="number"
              name="weight"
              placeholder="Enter your weight"
              value={formData.weight}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Dietary Preference</label>
            <select
              name="dietary_preference"
              value={formData.dietary_preference}
              onChange={handleChange}
              className="px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            >
              <option value="">Select preference</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="non-vegetarian">Non-Vegetarian</option>
              <option value="keto">Keto</option>
              <option value="paleo">Paleo</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Lifestyle</label>
            <select
              name="lifestyle"
              value={formData.lifestyle}
              onChange={handleChange}
              className="px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            >
              <option value="">Select lifestyle</option>
              <option value="sedentary">Sedentary</option>
              <option value="lightly-active">Lightly Active</option>
              <option value="moderately-active">Moderately Active</option>
              <option value="very-active">Very Active</option>
              <option value="extremely-active">Extremely Active</option>
            </select>
          </div>

          <Input
            label="Diseases (comma separated)"
            type="text"
            name="diseases"
            placeholder="e.g., Diabetes, Hypertension"
            value={formData.diseases}
            onChange={handleChange}
          />

          <Input
            label="Allergies (comma separated)"
            type="text"
            name="allergies"
            placeholder="e.g., Peanuts, Dairy, Gluten"
            value={formData.allergies}
            onChange={handleChange}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

  <div>
    <label className="text-sm font-medium text-gray-700 mb-1 block">
      Activity Level
    </label>
    <select
      name="activity_level"
      value={formData.activity_level}
      onChange={handleChange}
      className="px-4 py-2.5 rounded-xl border-2 border-gray-200 w-full"
    >
      <option value="">Select</option>
      <option value="sedentary">Sedentary</option>
      <option value="lightly_active">Lightly Active</option>
      <option value="moderately_active">Moderately Active</option>
      <option value="very_active">Very Active</option>
      <option value="athlete">Athlete</option>
    </select>
  </div>

  <div>
    <label className="text-sm font-medium text-gray-700 mb-1 block">
      Goal
    </label>
    <select
      name="goal"
      value={formData.goal}
      onChange={handleChange}
      className="px-4 py-2.5 rounded-xl border-2 border-gray-200 w-full"
    >
      <option value="">Select</option>
      <option value="weight_loss">Weight Loss</option>
      <option value="weight_gain">Weight Gain</option>
      <option value="muscle_gain">Muscle Gain</option>
      <option value="maintain_weight">Maintain Weight</option>
      <option value="improve_energy">Improve Energy</option>
    </select>
  </div>

</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

  <div>
    <label className="text-sm font-medium text-gray-700 mb-1 block">
      Work Type
    </label>
    <select
      name="work_type"
      value={formData.work_type}
      onChange={handleChange}
      className="px-4 py-2.5 rounded-xl border-2 border-gray-200 w-full"
    >
      <option value="">Select</option>
      <option value="student">Student</option>
      <option value="desk_job">Desk Job</option>
      <option value="field_work">Field Work</option>
      <option value="shift_work">Shift Work</option>
    </select>
  </div>

  <div>
    <label className="text-sm font-medium text-gray-700 mb-1 block">
      Workout Type
    </label>
    <select
      name="workout_type"
      value={formData.workout_type}
      onChange={handleChange}
      className="px-4 py-2.5 rounded-xl border-2 border-gray-200 w-full"
    >
      <option value="">Select</option>
      <option value="none">None</option>
      <option value="walking">Walking</option>
      <option value="gym">Gym</option>
      <option value="running">Running</option>
      <option value="yoga">Yoga</option>
    </select>
  </div>

</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

  <div>
    <label className="text-sm font-medium text-gray-700 mb-1 block">
      Sleep Duration
    </label>
    <select
      name="sleep_duration"
      value={formData.sleep_duration}
      onChange={handleChange}
      className="px-4 py-2.5 rounded-xl border-2 border-gray-200 w-full"
    >
      <option value="">Select</option>
      <option value="<5">Less than 5 hours</option>
      <option value="5-6">5-6 hours</option>
      <option value="6-7">6-7 hours</option>
      <option value="7-8">7-8 hours</option>
      <option value="8+">8+ hours</option>
    </select>
  </div>

  <div>
    <label className="text-sm font-medium text-gray-700 mb-1 block">
      Stress Level
    </label>
    <select
      name="stress_level"
      value={formData.stress_level}
      onChange={handleChange}
      className="px-4 py-2.5 rounded-xl border-2 border-gray-200 w-full"
    >
      <option value="">Select</option>
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
      <option value="very_high">Very High</option>
    </select>
  </div>

</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

  <Input
    label="Water Intake"
    type="text"
    name="water_intake"
    placeholder="e.g. 2L"
    value={formData.water_intake}
    onChange={handleChange}
  />

  <Input
    label="Cravings"
    type="text"
    name="cravings"
    placeholder="Sweet, Salty, Spicy..."
    value={formData.cravings}
    onChange={handleChange}
  />

</div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Profile'}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default HealthProfile;
