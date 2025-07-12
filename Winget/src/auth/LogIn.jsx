import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils/alert';
import { useAuth } from '../context/authContext';

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ Get login from context

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8000/auth/login',
        form,
      );

      if (response.data.jwtToken) {
        login(response.data.jwtToken);
        localStorage.setItem('Username', response.data.name);
        onLogin?.(response.data.userId);
        console.log('Login successful:', response.data);
        handleSuccess('Login successful! Redirecting...');
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        handleError(error.response.data.message || 'An error occurred');
      } else {
        handleError('Network error. Please try again later.');
      }
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="bg-white bg-gradient-to-r from-secondary to-tertiary p-8 rounded-2xl shadow-2xl w-full max-w-md mx-auto mt-10 space-y-6"
    >
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-3xl font-bold text-center text-zinc-800 dark:text-white"
      >
        Log In
      </motion.h2>

      <div className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-zinc-700 transition-all duration-300"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-zinc-700 transition-all duration-300"
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="w-full py-3 rounded-xl bg-primary text-white font-semibold shadow-md hover:bg-primary/90 transition-colors"
      >
        Login
      </motion.button>
    </motion.form>
  );
}
