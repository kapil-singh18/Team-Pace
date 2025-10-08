import React, { useState } from 'react';
import { User, Lock, Shield, AlertCircle } from 'lucide-react';
import { AuthService } from '../services/authService';

const LoginPage = ({ onLogin }) => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate API call delay
        setTimeout(() => {
            const result = AuthService.login(credentials.username, credentials.password);

            if (result.success) {
                onLogin(result.user);
            } else {
                setError(result.message);
            }
            setIsLoading(false);
        }, 1000);
    };

    const handleInputChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
        setError(''); // Clear error when user types
    };

    const demoCredentials = [
        { username: 'admin', password: 'admin123', role: 'Administrator' },
        { username: 'operator1', password: 'op123', role: 'Traffic Operator' },
        { username: 'analyst', password: 'analyst123', role: 'Traffic Analyst' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Logo and Title */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
                        <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Traffic Control Center</h1>
                    <p className="text-blue-200">Bhopal Smart Traffic Management System</p>
                </div>

                {/* Login Form */}
                <div className="bg-white rounded-lg shadow-xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-lg">
                                <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
                                <span className="text-red-700">{error}</span>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Username
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    name="username"
                                    value={credentials.username}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter your username"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input
                                    type="password"
                                    name="password"
                                    value={credentials.password}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>

                    {/* Demo Credentials */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h3 className="text-sm font-medium text-gray-700 mb-3">Demo Credentials:</h3>
                        <div className="space-y-2 text-sm">
                            {demoCredentials.map((cred, index) => (
                                <div key={index} className="flex justify-between items-center">
                                    <span className="text-gray-600">{cred.role}:</span>
                                    <button
                                        type="button"
                                        onClick={() => setCredentials({ username: cred.username, password: cred.password })}
                                        className="text-blue-600 hover:text-blue-800 font-mono"
                                    >
                                        {cred.username} / {cred.password}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8 text-blue-200 text-sm">
                    <p>© 2025 Bhopal Municipal Corporation</p>
                    <p>Traffic Management Division</p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;