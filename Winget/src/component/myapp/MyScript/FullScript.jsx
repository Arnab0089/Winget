import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from '../../../Api/URL';

export default function FullScript() {
  const [rawFile, setRawFile] = useState('');
  const [error, setError] = useState('');
  const { id } = useParams();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const getRawFile = async () => {
      try {
        const response = await axios.get(`${API_URL}/apps/rawfile/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRawFile(response.data.rawFile); // ✅ now setting the state
      } catch (err) {
        console.error('Error fetching raw file:', err);
        setError('Failed to fetch raw file');
      }
    };

    if (id) getRawFile();
  }, [id, token]);

  const handleDownload = () => {
    const blob = new Blob([rawFile], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `applist-${id}.json`;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold mb-4">Raw File Viewer</h2>
        {error && <p className="text-red-600">{error}</p>}
        <div className="flex justify-end mb-2">
          <button
            onClick={handleDownload}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
          >
            Download as JSON
          </button>
        </div>
      </div>
      <pre className="whitespace-pre-wrap bg-[#090040] text-white p-4 rounded shadow text-sm overflow-x-auto">
        {rawFile || 'No content available.'}
      </pre>
    </div>
  );
}
