import { useEffect, useState } from "react";
import Card from "../components/Card";
import { progressService } from "../services/progressService";
import { useNavigate } from "react-router-dom";

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

    </div>
  );
}

export default Progress;