import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleUpload = async () => {
    setError('');

    if (!file) {
      setError('Please select a file before uploading.');
      return;
    }

    if (file.type !== 'application/json') {
      setError('Only JSON files are accepted.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploading(true);
      await axios.post('http://localhost:8000/apps/upload', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setFile(null);
      navigate('/myapps');
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <motion.div
          className="p-6 max-w-md mx-auto bg-white border border-gray-300 rounded-2xl shadow-lg flex flex-col items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <motion.h2
            className="text-2xl font-bold mb-5 text-center text-gray-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Upload Winget App List
          </motion.h2>

          <div className="flex flex-col items-center ">
            <input
              type="file"
              accept=".json"
              onChange={(e) => setFile(e.target.files[0])}
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0 file:text-sm file:font-semibold
              file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
            />
            {file && (
              <p className="text-sm text-gray-600 text-center">
                Selected: <span className="font-medium">{file.name}</span>
              </p>
            )}
          </div>

          <motion.button
            whileHover={{ scale: uploading ? 1 : 1.05 }}
            whileTap={{ scale: uploading ? 1 : 0.95 }}
            onClick={handleUpload}
            disabled={uploading}
            className={`w-full py-2 mt-2 rounded-xl shadow-md transition-all duration-200 ${
              uploading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </motion.button>

          {error && (
            <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
          )}
        </motion.div>
      ) : (
        <motion.div
          className="p-6 max-w-md mx-auto bg-white border border-gray-300 rounded-2xl shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <motion.h2
            className="text-xl font-semibold mb-4 text-center text-gray-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Please log in to upload your Winget App List
          </motion.h2>

          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 mt-4 rounded-xl shadow"
            onClick={() => (window.location.href = '/login')}
          >
            Login
          </motion.button>
        </motion.div>
      )}
    </>
  );
}
