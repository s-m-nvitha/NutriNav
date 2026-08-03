import { useEffect, useState } from "react";
import Card from "../components/Card";
import { progressService } from "../services/progressService";
import { useNavigate } from "react-router-dom";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

function Progress() {

  const [progress, setProgress] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {

      const data =
        await progressService.getProgress();

      setProgress(data);

    } catch (error) {
      console.log(error);
    }
  };

  if (!progress) {
    return <p>Loading...</p>;
  }
  const healthStatus =
  progress.health_score >= 90
    ? "Excellent"
    : progress.health_score >= 75
    ? "Good"
    : progress.health_score >= 60
    ? "Moderate"
    : "Poor";

  return (
    <div className="space-y-6">

      <Card>
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
  📈 Health Progress Dashboard
</h2>

<p className="text-gray-500">
  Monitor your nutritional improvements over time
</p>

      
      </Card>

      <div className="grid md:grid-cols-5 gap-8">
        <Card className="bg-green-50 border border-green-200 hover:scale-105 transition duration-300">
  <h3 className="flex items-center justify-center gap-2 font-semibold mb-2">
  🩺 Health Status
</h3>

  <p className="text-4xl font-bold text-green-600">
    {healthStatus}
  </p>
</Card>

<Card className="bg-blue-50 border border-blue-200 hover:scale-105 transition duration-300">
  <h3 className="flex items-center justify-center gap-2 font-semibold mb-2">
  🎯 Goal
</h3>

  <p className="text-4xl font-bold text-blue-600">
    95%
  </p>
</Card>

        <Card className="bg-yellow-50 border border-yellow-200 hover:scale-105 transition duration-300">

  <h3 className="flex items-center justify-center gap-2 font-semibold mb-5">
  ❤️ Health Score
</h3>

  <div className="w-32 h-32 mx-auto">

    <CircularProgressbar
      value={progress.health_score}
      text={`${progress.health_score}%`}
      styles={buildStyles({
        textSize: "18px",
        pathColor: "#22c55e",
        textColor: "#16a34a",
        trailColor: "#e5e7eb",
      })}
    />

  </div>

</Card>

        <Card className="bg-red-50 border border-red-200 hover:scale-105 transition duration-300">
          <h3 className="flex items-center justify-center gap-2 font-semibold mb-2">
  ⚠️ Deficiencies
</h3>

          <p className="text-4xl font-bold text-red-500">
            {progress.deficiencies_found}
          </p>
        </Card>

        <Card className="bg-purple-50 border border-purple-200 hover:scale-105 transition duration-300">
          <h3 className="flex items-center justify-center gap-2 font-semibold mb-2">
  📈 Improvement
</h3>

          <p className="text-5xl font-bold text-blue-600">
            {progress.improvement}%
          </p>
        </Card>

      </div>

      <Card>
  <h3 className="font-semibold mb-2">
    Overall Health Status
  </h3>

  <p className="text-gray-700 leading-relaxed">
    Great job! Your current health score is
    <span className="font-semibold text-green-600">
      {" "}{progress.health_score}%
    </span>.

    Continue following your meal plan and
    nutrition recommendations to improve further.
  </p>

  <div className="mt-4">
    <button
      onClick={() => navigate("/results")}
      className="bg-blue-600 text-white px-4 py-2 rounded-xl"
    >
      View Analysis Results
    </button>
  </div>

</Card>

<Card>

  <h3 className="text-xl font-bold mb-4">
    📈 Health Score Trend
  </h3>

  <ResponsiveContainer width="100%" height={300}>

  <LineChart data={progress.history}>

    <CartesianGrid strokeDasharray="3 3" />

    <XAxis dataKey="date" />

    <YAxis
      domain={[50, 100]}
      ticks={[50, 60, 70, 80, 90, 100]}
    />

    <Tooltip
      formatter={(value) => [`${value}%`, "Health Score"]}
    />

    <Line
      type="monotone"
      dataKey="score"
      stroke="#22c55e"
      strokeWidth={4}
      dot={{
        r: 6,
        fill: "#22c55e",
        stroke: "#fff",
        strokeWidth: 2,
      }}
      activeDot={{
        r: 8,
        fill: "#16a34a",
      }}
      isAnimationActive={true}
      animationDuration={1500}
    />

  </LineChart>

</ResponsiveContainer>

</Card>

<Card>

<h3 className="text-xl font-bold mb-4">
🧪 Nutrient Progress
</h3>

{progress.nutrient_progress.map((item)=>{

const percent=(item.current/item.target)*100;

return(

<div key={item.nutrient} className="mb-5">

<div className="flex justify-between items-center">

<div>
  <h4 className="font-semibold">
    🩸 {item.nutrient}
  </h4>

  <p className="text-sm text-gray-500">
    {Math.round(percent)}% of target
  </p>
</div>

<div className="font-semibold text-green-600">
  {item.current} / {item.target}
</div>

</div>

<div className="w-full bg-gray-200 rounded-full h-5 mt-3 overflow-hidden">

<div
  className="bg-gradient-to-r from-green-400 to-green-600 h-5 rounded-full transition-all duration-1000"
  style={{
    width: `${Math.min(percent, 100)}%`,
  }}
/>

</div>

</div>

)

})}

</Card>

<Card>

<h3 className="text-xl font-bold mb-4">

🏆 Achievements

</h3>

<div className="grid md:grid-cols-3 gap-4">

<div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
<h4 className="text-3xl">📄</h4>
<p className="font-semibold mt-2">Reports Uploaded</p>
</div>

<div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
<h4 className="text-3xl">❤️</h4>
<p className="font-semibold mt-2">Health Improving</p>
</div>

<div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
<h4 className="text-3xl">🥗</h4>
<p className="font-semibold mt-2">Healthy Diet</p>
</div>

</div>

</Card>

<Card>

<h3 className="text-xl font-bold mb-4">

📅 Recent Activity

</h3>

<ul className="space-y-4">

<li className="bg-green-50 border-l-4 border-green-500 p-3 rounded-r-lg">
  ✅ Report Uploaded
</li>

<li className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r-lg">
  🤖 AI Analysis Completed
</li>

<li className="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded-r-lg">
  🍽️ Meal Plan Generated
</li>

<li className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded-r-lg">
  ❤️ Health Score Updated
</li>
</ul>

</Card>

    </div>
  );
}

export default Progress;