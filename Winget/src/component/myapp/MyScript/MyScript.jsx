import axios from 'axios';
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { AnimatePresence, motion } from 'framer-motion';
import tableStyle from './TableStyle';
import { useParams } from 'react-router-dom';

export default function MyScript() {
  const [appList, setAppList] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [copied, setCopied] = useState(false);
  const token = localStorage.getItem('token');
  const { id } = useParams();

  const handleCopy = () => {
    const text = `winget install ${selectedApp.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2s
      });
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Fallback copy failed:', err);
      }
      document.body.removeChild(textarea);
    }
  };

  const getAppLists = async () => {
    try {
      const response = await axios.get('http://localhost:8000/apps/myapps', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data && response.data.length > 0) {
        setAppList(response.data[0].apps);
      }
    } catch (error) {
      console.error('Error fetching app lists:', error);
    }
  };

  useEffect(() => {
    getAppLists();
  }, [token]);

  const columns = [
    {
      name: 'S.No',
      cell: (row, index) => index + 1,
      width: '70px',
    },
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: 'Version',
      selector: (row) => row.version,
      sortable: true,
    },
  ];

  return (
    <div className="relative bg-gradient-to-r from-secondary to-tertiary rounded-2xl shadow-xl px-4 py-6 sm:px-8 sm:py-10 w-full max-w-6xl mx-auto m-4">
      <div className="rounded-2xl shadow-lg">
        <DataTable
          title={
            <div className="bg-[#f9fafb] rounded-2xl text-[#1B1A55] text-lg font-bold px-4 py-2">
              Installed Applications
            </div>
          }
          customStyles={tableStyle}
          columns={columns}
          data={appList}
          pagination
          highlightOnHover
          striped
          dense
          onRowClicked={(row) => setSelectedApp(row)}
        />
      </div>

      <AnimatePresence>
        {selectedApp && (
          <>
            {/* 🔷 Backdrop with blur */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              onClick={() => setSelectedApp(null)}
            />

            {/* 🔷 Modal */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.3 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black rounded-xl shadow-2xl p-6 w-full max-w-md z-50"
            >
              <h2 className="text-xl font-bold mb-4">App Details</h2>
              <p>
                <strong>Name:</strong> {selectedApp.name}
              </p>
              <p>
                <strong>ID:</strong> {selectedApp.id}
              </p>
              <p>
                <strong>Version:</strong> {selectedApp.version}
              </p>
              <div className="mt-4">
                <p className="font-semibold mb-2">Winget Command:</p>
                <div className="relative bg-gray-100 text-gray-800 font-mono text-sm p-3 rounded-lg">
                  <code>{`winget install ${selectedApp.id}`}</code>
                  <button
                    className="absolute top-2 right-2 bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300 text-xs"
                    onClick={handleCopy}
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                {copied && (
                  <p className="mt-2 text-green-600 font-medium">
                    Copied: <code>winget install {selectedApp.id}</code>
                  </p>
                )}
              </div>
              <button
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={() => setSelectedApp(null)}
              >
                Close
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="mt-6 text-center mx-auto w-fit bg-amber-300 p-4 rounded-lg shadow-md">
        <p className="text-tertiary font-semibold mb-2">
          Click on an app to view details and copy the Winget command.
        </p>
        <p>Here is your Full file content:</p>
        <button
          onClick={() => (window.location.href = `/rawfile/${id}`)}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          View Full Script
        </button>
      </div>
    </div>
  );
}
