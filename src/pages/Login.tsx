"use client"
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

export default function Login() {
  const { isDark } = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate('/');
    } else {
      setError('Incorrect username or password');
    }
  };

  return (
    <div className={`flex items-center justify-center min-h-screen ${
      isDark ? 'bg-gray-900' : 'bg-gray-100'
    }`}>
      <form onSubmit={handleSubmit} className={`p-6 rounded shadow-md w-80 ${
        isDark ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h2 className="text-2xl font-bold mb-4 text-center text-orange-400">
          Login
        </h2>
        
        {error && <p className="text-red-500 mb-2">{error}</p>}
        
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={`w-full p-2 mb-3 border rounded ${
            isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'
          }`}
          required
        />
        
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full p-2 mb-4 border rounded pr-10 ${
              isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'
            }`}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2 text-gray-600 dark:text-gray-400 focus:outline-none"
          >
            {showPassword ? (
              <FaEyeSlash className="h-2 w-2" />
            ) : (
              <FaEye className="h-3 w-3" />
            )}
          </button>
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors"
        >
          Login
        </button>
        
        <p className="mt-3 text-center text-sm text-gray-700 dark:text-gray-400">
          Demo Data:
          <br />
          Username: melad
          <br />
          Password: melad123
        </p>
      </form>
    </div>
  );
}