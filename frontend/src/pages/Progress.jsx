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
        <h2 className="text-2xl font-bold mb-4">
          📈 Health Progress Dashboard
        </h2>

        <p className="text-gray-600">
          Track your nutritional health journey
        </p>
      </Card>

      <div className="grid md:grid-cols-5 gap-6">
        <Card>
  <h3 className="font-semibold mb-2">
    Health Status
  </h3>

  <p className="text-4xl font-bold text-green-600">
    {healthStatus}
  </p>
</Card>

<Card>
  <h3 className="font-semibold mb-2">
    Goal
  </h3>

  <p className="text-4xl font-bold text-blue-600">
    95%
  </p>
</Card>

        <Card>
          <h3 className="font-semibold mb-2">
            Health Score
          </h3>

          <p className="text-4xl font-bold text-green-600">
            {progress.health_score}
          </p>
        </Card>

        <Card>
          <h3 className="font-semibold mb-2">
            Deficiencies Found
          </h3>

          <p className="text-4xl font-bold text-red-500">
            {progress.deficiencies_found}
          </p>
        </Card>

        <Card>
          <h3 className="font-semibold mb-2">
            Improvement
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

<div className="flex justify-between">

<span>{item.nutrient}</span>

<span>
{item.current}/{item.target}
</span>

</div>

<div className="w-full bg-gray-200 rounded-full h-4 mt-2">

<div
className="bg-green-500 h-4 rounded-full"
style={{
width:`${Math.min(percent,100)}%`
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

<div className="flex flex-wrap gap-4">

<div className="bg-green-100 px-4 py-2 rounded-full">
📄 Reports Uploaded
</div>

<div className="bg-blue-100 px-4 py-2 rounded-full">
❤️ Health Improving
</div>

<div className="bg-yellow-100 px-4 py-2 rounded-full">
🥗 Healthy Diet
</div>

</div>

</Card>

<Card>

<h3 className="text-xl font-bold mb-4">

📅 Recent Activity

</h3>

<ul className="space-y-3">

<li>✅ Report Uploaded</li>

<li>✅ AI Analysis Completed</li>

<li>✅ Meal Plan Generated</li>

<li>✅ Health Score Updated</li>

</ul>

</Card>

    </div>
  );
}

export default Progress;