import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import AppTable from './AppTable';
import { RiFileList3Fill } from 'react-icons/ri';
import { GrLinkPrevious } from 'react-icons/gr';
import { GrLinkNext } from 'react-icons/gr';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../../Api/URL';

export default function MyApp() {
  const [applists, setApplists] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const token = localStorage.getItem('token');
  const [render, setRender] = useState(1);
  const [clicked, setClicked] = useState(false);

  const navigate = useNavigate();

  const getAppLists = async () => {
    try {
      const response = await axios.get(`${API_URL}/apps/myapps`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('App lists fetched:', response.data);
      setApplists(response.data);
    } catch (error) {
      console.error('Error fetching app lists:', error);
    }
  };

  useEffect(() => {
    getAppLists();
  }, [token]);

  return (
    <>
      <div className="bg-gradient-to-r from-secondary to-tertiary rounded-2xl shadow-xl px-4 py-6 sm:px-8 sm:py-10 w-full max-w-6xl mx-auto m-4">
        <div className="">
          <div className="p-4 space-y-4 flex flex-col mx-auto max-w-4xl">
            {applists.slice(render * 5 - 5, render * 5).map((app, index) => (
              <div
                key={app._id}
                className="bg-gradient-to-r from-tertiary to-primary text-white shadow-2xl rounded-xl overflow-hidden flex items-center justify-between p-4"
              >
                <div>
                  <div className="font-semibold text-lg">
                    {app.filename || 'Upload App List'}
                  </div>
                  <div className="text-sm text-white/80">
                    {format(new Date(app.uploadDate), 'PPpp')}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setSelectedIndex(index === selectedIndex ? null : index)
                    }
                    className="w-content rounded-lg bg-tertiary text-primary border border-white text-left p-2 hover:bg-[#090040] hover:text-white transition"
                  >
                    <RiFileList3Fill
                      className="inline-block  text-2xl"
                      onClick={() => {
                        setClicked(!clicked);
                      }}
                    />
                  </button>

                  <button
                    className="w-content rounded-lg bg-tertiary text-primary border border-white text-left p-2 hover:bg-[#090040] hover:text-white transition "
                    onClick={() => {
                      navigate('/script/' + app._id);
                    }}
                  >
                    Get the Script
                  </button>
                </div>
              </div>
            ))}
          </div>
          {applists.length > 0 && (
            <div className="flex justify-center items-center mt-6 space-x-2 ">
              <span
                className={` px-2 py-1  ${
                  render <= 1 ? 'hidden' : 'cursor-pointer'
                } `}
                onClick={() => setRender(render > 1 ? render - 1 : 1)}
              >
                <GrLinkPrevious className="inline-block p-1 text-3xl bg-primary text-tertiary hover:bg-[#090040] hover:text-white transition rounded-lg" />
              </span>
              {[...Array(Math.ceil(applists.length / 5))].fill().map((_, i) => (
                <button
                  key={i}
                  onClick={() => setRender(i + 1)}
                  className={`border rounded-lg px-2 py-1 border-white text-md cursor-pointer ${
                    render === i + 1
                      ? 'bg-tertiary text-white'
                      : 'bg-secondary text-black'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <span
                className={` px-2 py-1 ${
                  render >= Math.ceil(applists.length / 5)
                    ? 'hidden'
                    : 'cursor-pointer'
                }`}
                onClick={() =>
                  setRender(
                    render < Math.ceil(applists.length / 5)
                      ? render + 1
                      : Math.ceil(applists.length / 5),
                  )
                }
              >
                <GrLinkNext className="inline-block p-1 text-3xl bg-primary text-tertiary hover:bg-[#090040] hover:text-white transition rounded-lg " />
              </span>
            </div>
          )}
        </div>
      </div>
      {applists.length > 0 && (
        <div className="bg-gradient-to-r from-tertiary to-primary rounded-2xl shadow-xl px-4 py-6 sm:px-8 sm:py-10 w-full max-w-6xl mx-auto m-4">
          {clicked ? (
            <motion.h2
              className="text-2xl font-medium italic text-white mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Your App Lists are shown here
            </motion.h2>
          ) : (
            <motion.h2
              className="text-2xl font-medium italic text-white mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Your App Lists are shown here click on this{' '}
              <RiFileList3Fill className="inline-block text-2xl italic" /> icon
              to see the apps in the list
            </motion.h2>
          )}
          {applists.map((app, index) => (
            <AnimatePresence>
              {selectedIndex === index && (
                <motion.div
                  className="p-4 border-t bg-gradient-to-r from-secondary to-tertiary rounded-2xl text-black overflow-auto"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <AppTable data={app.apps || []} />
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>
      )}
    </>
  );
}
