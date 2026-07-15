import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { medicalReportService } from '../services/medicalReportService';
import { deficiencyReportService } from '../services/deficiencyReportService';
const Results = () => {
  const [uploadedReports, setUploadedReports] = useState([]);
  const [deficiencies, setDeficiencies] = useState([]);
  useEffect(() => {
  loadReports();
  loadDeficiencies();
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

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Analysis Results</h2>
        
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

        <span className="text-red-600 font-semibold">
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
          <h3 className="text-xl font-bold text-gray-800 mb-4">Recommended Foods</h3>
          <div className="space-y-3">
            <div className="p-3 bg-orange-50 rounded-xl">
              <h4 className="font-semibold text-gray-800 mb-2">For Vitamin D</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-white rounded-lg text-sm text-gray-600">Fatty Fish</span>
                <span className="px-2 py-1 bg-white rounded-lg text-sm text-gray-600">Egg Yolks</span>
                <span className="px-2 py-1 bg-white rounded-lg text-sm text-gray-600">Fortified Milk</span>
              </div>
            </div>
            
            <div className="p-3 bg-red-50 rounded-xl">
              <h4 className="font-semibold text-gray-800 mb-2">For Iron</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-white rounded-lg text-sm text-gray-600">Spinach</span>
                <span className="px-2 py-1 bg-white rounded-lg text-sm text-gray-600">Red Meat</span>
                <span className="px-2 py-1 bg-white rounded-lg text-sm text-gray-600">Lentils</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Body Mapping Insights</h3>
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">🧠</div>
              <h4 className="font-semibold text-gray-800">Brain</h4>
              <p className="text-sm text-gray-600 mt-1">Omega-3 fatty acids support cognitive function</p>
            </div>
            
            <div className="bg-white rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">👁️</div>
              <h4 className="font-semibold text-gray-800">Eyes</h4>
              <p className="text-sm text-gray-600 mt-1">Vitamin A and lutein for vision health</p>
            </div>
            
            <div className="bg-white rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">🦴</div>
              <h4 className="font-semibold text-gray-800">Bones</h4>
              <p className="text-sm text-gray-600 mt-1">Calcium and Vitamin D for strength</p>
            </div>
            
            <div className="bg-white rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">🩸</div>
              <h4 className="font-semibold text-gray-800">Blood</h4>
              <p className="text-sm text-gray-600 mt-1">Iron and B12 for healthy blood cells</p>
            </div>
            
            <div className="bg-white rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">💪</div>
              <h4 className="font-semibold text-gray-800">Muscles</h4>
              <p className="text-sm text-gray-600 mt-1">Protein for muscle repair and growth</p>
            </div>
            
            <div className="bg-white rounded-xl p-4 text-center">
              <div className="text-3xl mb-2">❤️</div>
              <h4 className="font-semibold text-gray-800">Heart</h4>
              <p className="text-sm text-gray-600 mt-1">CoQ10 and antioxidants for heart health</p>
            </div>
          </div>
        </div>
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
