import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { medicalReportService } from '../services/medicalReportService';
import { deficiencyReportService } from '../services/deficiencyReportService';
import bodyImage from '../assets/body.jpg';
const Results = () => {
  const [uploadedReports, setUploadedReports] = useState([]);
  const [deficiencies, setDeficiencies] = useState([]);
  const [recommendations, setRecommendations] = useState({});
  const [profileContext, setProfileContext] = useState("");
  const [aiExplanations, setAiExplanations] = useState([]);
  const [selectedOrgan, setSelectedOrgan] = useState("Brain");
  const totalReports = uploadedReports.length;
  const totalDeficiencies = deficiencies.length;

const overallStatus =
  deficiencies.length === 0
    ? "Healthy"
    : deficiencies.some((d) => d.severity === "severe")
    ? "Severe"
    : "Moderate";
    const healthScore = Math.max(
  100 - deficiencies.length * 15,
  40
);

const organData = {
  Brain: {
    nutrients: ["Vitamin B12", "Iron"],
    symptoms: [
      "Brain fog",
      "Poor concentration",
      "Fatigue"
    ]
  },

  Blood: {
    nutrients: ["Iron"],
    symptoms: [
      "Dizziness",
      "Pale skin",
      "Low energy"
    ]
  },

  Bones: {
    nutrients: ["Vitamin D"],
    symptoms: [
      "Bone pain",
      "Weak bones",
      "Fatigue"
    ]
  },

  Muscles: {
    nutrients: ["Vitamin D"],
    symptoms: [
      "Muscle weakness",
      "Low stamina",
      "Fatigue"
    ]
  },

  "Nervous System": {
    nutrients: ["Vitamin B12"],
    symptoms: [
      "Numbness",
      "Tingling",
      "Nerve weakness"
    ]
  }
};
const getSeverityColor = (severity) => {
  switch (severity?.toLowerCase()) {
    case "mild":
      return "bg-yellow-100 text-yellow-700";

    case "moderate":
      return "bg-orange-100 text-orange-700";

    case "severe":
      return "bg-red-100 text-red-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
};
  useEffect(() => {
  loadReports();
  loadDeficiencies();
  loadRecommendations();
}, []);

  const loadReports = async () => {
    try {
      const reports = await medicalReportService.getAll();
      setUploadedReports(reports);
    } catch (err) {
      console.log('No reports uploaded yet');
    }
  };
  const loadDeficiencies = async () => {
  try {
    const data = await deficiencyReportService.getAll();
    setDeficiencies(data);
  } catch (err) {
    console.log('No deficiencies found');
  }
};
const loadRecommendations = async () => {
  try {
    const data =
      await deficiencyReportService.getRecommendations();

    console.log("Recommendations:", data);

    setRecommendations(
      data.food_recommendations || {}
    );

    setAiExplanations(
      data.deficiencies || []
    );

    setProfileContext(
      data.profile_context || ""
    );

  } catch (err) {
    console.log('No recommendations found');
  }
};

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Analysis Results</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

  <div className="bg-blue-50 rounded-xl p-4 text-center">
  <div className="text-3xl mb-2">📄</div>

  <p className="text-sm text-gray-600">
    Reports Analyzed
  </p>

  <p className="text-3xl font-bold text-blue-600">
    {totalReports}
  </p>
</div>

  <div className="bg-red-50 rounded-xl p-4 text-center">
    <div className="text-3xl mb-2">⚠️</div>
    <p className="text-sm text-gray-600">Deficiencies Found</p>
    <p className="text-3xl font-bold text-red-600">
      {totalDeficiencies}
    </p>
  </div>

  <div className="bg-green-50 rounded-xl p-4 text-center">
  <div className="text-3xl mb-2">🩺</div>

  <p className="text-sm text-gray-600">
    Overall Status
  </p>

  <p className="text-2xl font-bold text-green-600">
    {overallStatus}
  </p>
  </div>
  <div className="bg-yellow-50 rounded-xl p-4 text-center">
    <div className="text-3xl mb-2">❤️</div>
  <p className="text-sm text-gray-600">
    Health Score
  </p>

  <p className="text-2xl font-bold text-yellow-600">
    {healthScore}%
  </p>
</div>

</div>
        
        <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold mb-2">Health Summary</h3>
          <p className="text-blue-100">
            Based on your medical reports, here's a comprehensive overview of your health status.
          </p>
        </div>

        {uploadedReports.length > 0 && (
          <div className="bg-blue-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-600">
              <strong>Uploaded Reports:</strong> {uploadedReports.length} file(s) analyzed
            </p>
          </div>
        )}
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Deficiencies Detected</h3>
          <div className="space-y-3">
  {deficiencies.length > 0 ? (
    deficiencies.map((item) => (
      <div
        key={item.id}
        className="flex items-center justify-between p-3 bg-red-50 rounded-xl"
      >
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>

          <span className="font-medium text-gray-800">
            {item.nutrient_name}
          </span>
        </div>

        <span
  className={`px-3 py-1 rounded-full text-sm font-semibold ${getSeverityColor(
    item.severity
  )}`}
>
  {item.severity}
</span>
      </div>
    ))
  ) : (
    <p className="text-gray-500">
      No deficiencies detected.
    </p>
  )}
</div>
        </Card>
<Card>
  <h3 className="text-xl font-bold text-gray-800 mb-4">
    Deficiency Impact Analysis
  </h3>


  {profileContext && (
    <div className="mb-4 p-3 bg-blue-50 rounded-xl text-sm text-gray-700">
      <strong>Your Profile:</strong> {profileContext}
    </div>
  )}


  <div className="space-y-4">
    {deficiencies.map((item) => (
      <div
        key={item.id}
        className="p-4 bg-yellow-50 rounded-xl"
      >
        <h4 className="font-semibold text-gray-800 mb-2">
          {item.nutrient_name}
        </h4>

        <p className="text-gray-600">
        {
          aiExplanations.find(
            (d) => d.nutrient === item.nutrient_name
  )?.explanation ||
  "Explanation not available."
}
</p>
      </div>
    ))}
  </div>
</Card>
        <Card>
  <h3 className="text-xl font-bold text-gray-800 mb-4">
    Recommended Foods
  </h3>

  <div className="space-y-3">
    {Object.keys(recommendations).length > 0 ? (
      Object.entries(recommendations).map(
        ([nutrient, foods]) => (
          <div
            key={nutrient}
            className="p-3 bg-orange-50 rounded-xl"
          >
            <h4 className="font-semibold text-gray-800 mb-2">
              {nutrient}
            </h4>

            <div className="flex flex-wrap gap-2">
              {Array.isArray(foods) &&
                foods.map((food) => (
                  <span
                    key={food}
        className="px-2 py-1 bg-white rounded-lg text-sm text-gray-600"
      >
        {food}
      </span>
    ))
  }
</div>
          </div>
        )
      )
    ) : (
      <p className="text-gray-500">
        No recommendations available.
      </p>
    )}
  </div>
</Card>
      </div>

<Card>
  <h3 className="text-xl font-bold text-gray-800 mb-4">
    Interactive Body Explorer
  </h3>

  <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6">

    <p className="text-gray-600 mb-6">
      Body areas potentially affected by your detected deficiencies
    </p>

    <div className="flex justify-center">

      <div className="relative">

        <img
          src={bodyImage}
          alt="Human Body"
          className="w-[350px] md:w-[450px]"
        />

        {/* Brain */}

        {(deficiencies.some(
          d =>
            d.nutrient_name === "Vitamin B12" ||
            d.nutrient_name === "Iron"
        )) && (
          <div className="absolute top-[12%] left-[48%] -translate-x-1/2">
            <div className="w-6 h-6 bg-red-500 rounded-full animate-pulse"></div>
          </div>
        )}

        {/* Nervous System */}

        {(deficiencies.some(
          d => d.nutrient_name === "Vitamin B12"
        )) && (
          <div className="absolute top-[28%] left-[48%] -translate-x-1/2">
            <div className="w-6 h-6 bg-red-500 rounded-full animate-pulse"></div>
          </div>
        )}

        {/* Blood */}

        {(deficiencies.some(
          d => d.nutrient_name === "Iron"
        )) && (
          <div className="absolute top-[40%] left-[48%] -translate-x-1/2">
            <div className="w-6 h-6 bg-red-500 rounded-full animate-pulse"></div>
          </div>
        )}

        {/* Bones */}

        {(deficiencies.some(
          d => d.nutrient_name === "Vitamin D"
        )) && (
          <div className="absolute top-[55%] left-[48%] -translate-x-1/2">
            <div className="w-6 h-6 bg-red-500 rounded-full animate-pulse"></div>
          </div>
        )}

        {/* Muscles */}

        {(deficiencies.some(
          d => d.nutrient_name === "Vitamin D"
        )) && (
          <div className="absolute top-[72%] left-[48%] -translate-x-1/2">
            <div className="w-6 h-6 bg-red-500 rounded-full animate-pulse"></div>
          </div>
        )}

      </div>

    </div>

    <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">

      <div
        onClick={() => setSelectedOrgan("Brain")}
        className={`rounded-xl p-3 text-center cursor-pointer hover:bg-blue-50 ${
          selectedOrgan === "Brain"
            ? "bg-blue-100 border-2 border-blue-500"
            : "bg-white"
        }`} 
      >
        🧠 Brain
      </div>
    
      <div
        onClick={() => setSelectedOrgan("Nervous System")}
        className={`rounded-xl p-3 text-center cursor-pointer hover:bg-blue-50 ${
          selectedOrgan === "Nervous System"
            ? "bg-blue-100 border-2 border-blue-500"
            : "bg-white"
        }`}
      >
          ⚡ Nervous System
      </div>

      <div
        onClick={() => setSelectedOrgan("Blood")}
        className={`rounded-xl p-3 text-center cursor-pointer hover:bg-blue-50 ${
          selectedOrgan === "Blood"
            ? "bg-blue-100 border-2 border-blue-500"
            : "bg-white"
        }`}
      >
          🩸 Blood
      </div>

      <div
        onClick={() => setSelectedOrgan("Bones")}
        className={`rounded-xl p-3 text-center cursor-pointer hover:bg-blue-50 ${
          selectedOrgan === "Bones"
            ? "bg-blue-100 border-2 border-blue-500"
            : "bg-white"
        }`}
      >
          🦴 Bones
      </div>
      <div
        onClick={() => setSelectedOrgan("Muscles")}
        className={`rounded-xl p-3 text-center cursor-pointer hover:bg-blue-50 ${
          selectedOrgan === "Muscles"
            ? "bg-blue-100 border-2 border-blue-500"
            : "bg-white"
        }`}
      >
          💪 Muscles
      </div>
    </div>

  </div>

  {selectedOrgan && organData[selectedOrgan] && (
    <div className="mt-6 bg-white rounded-xl p-6 border shadow">

      <h3 className="text-2xl font-bold mb-4">
        {selectedOrgan}
      </h3>

    <div className="mb-4">
      <h4 className="font-semibold mb-2">
        Affected Nutrients
      </h4>

      <ul className="list-disc ml-6">
        {organData[selectedOrgan].nutrients.map((nutrient) => (
          <li key={nutrient}>
            {nutrient}
          </li>
        ))}
      </ul>
    </div>

    <div className="mb-4">
      <h4 className="font-semibold mb-2">
        Possible Symptoms
      </h4>

      <ul className="list-disc ml-6">
        {organData[selectedOrgan].symptoms.map((symptom) => (
          <li key={symptom}>
            {symptom}
          </li>
        ))}
      </ul>
    </div>

    <div>
      <h4 className="font-semibold mb-2">
        Recommended Foods
      </h4>

      {organData[selectedOrgan].nutrients.map((nutrient) => (
        <div key={nutrient} className="mb-2">
          <strong>{nutrient}:</strong>{" "}
          {recommendations[nutrient]?.join(", ") ||
            "No foods available"}
        </div>
      ))}
    </div>

  </div>
)}
</Card>

      <Card>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Uploaded Report History</h3>
        {uploadedReports.length > 0 ? (
          <div className="space-y-3">
            {uploadedReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">📋</div>
                  <div>
                    <p className="font-medium text-gray-800">{report.file_name}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(report.upload_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <span className="text-green-600 text-sm font-medium">✓ Analyzed</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-xl p-6 text-center">
            <p className="text-gray-600">No reports uploaded yet</p>
            <p className="text-sm text-gray-500 mt-1">Upload your medical reports to see analysis results</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Results;
