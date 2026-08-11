import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import axios from 'axios';

const DeficiencyAnalysis = () => {
  const [deficiencies, setDeficiencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDeficiencies = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get(
          'http://127.0.0.1:8000/deficiency-reports/',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setDeficiencies(response.data);
      } catch (err) {
        console.error('Error fetching deficiencies:', err);
        setError('Unable to load deficiency analysis.');
      } finally {
        setLoading(false);
      }
    };

    fetchDeficiencies();
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Deficiency Analysis
        </h2>

        {loading && (
          <p className="text-gray-600">
            Loading deficiency analysis...
          </p>
        )}

        {error && (
          <p className="text-red-600">
            {error}
          </p>
        )}

        {!loading && !error && deficiencies.length === 0 && (
          <p className="text-gray-600">
            No deficiencies detected yet. Upload a medical report to begin.
          </p>
        )}

        {!loading && !error && deficiencies.length > 0 && (
          <div className="space-y-4">
            {deficiencies.map((deficiency) => (
              <div
                key={deficiency.id}
                className="border rounded-lg p-4 bg-gray-50"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {deficiency.nutrient_name}
                  </h3>

                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-700">
                    {deficiency.severity}
                  </span>
                </div>

                <p className="text-gray-700">
                  Value:{' '}
                  <strong>
                    {deficiency.value} {deficiency.unit}
                  </strong>
                </p>

                <p className="text-gray-600 mt-1">
                  Status: {deficiency.status}
                </p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default DeficiencyAnalysis;