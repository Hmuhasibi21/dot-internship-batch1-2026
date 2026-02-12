import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Leaderboard from '../components/Leaderboard';
import { getLeaderboard } from '../utils/leaderboard';
import harisPhoto from '../assets/FOTO-Haris.jpg';
import { History, PlayCircle, Trash2, Trophy } from 'lucide-react';

const Login = () => {
  const [name, setName] = useState('');
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [activeTab, setActiveTab] = useState('login');
  const navigate = useNavigate();

  useEffect(() => {
    setLeaderboardData(getLeaderboard());
    const savedSession = localStorage.getItem('quizState');
    if (savedSession) {
      setShowResumeModal(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (name.trim()) {
      localStorage.setItem('userName', name);
      navigate('/quiz');
    }
  };

  const handleResume = () => {
    navigate('/quiz');
  };

  const handleReset = () => {
    localStorage.removeItem('quizState');
    setShowResumeModal(false);
  };

  const refreshLeaderboard = () => {
    setLeaderboardData([]);
  };

  return (
    <Layout>
      {showResumeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full transform scale-100 animate-[bounce_0.5s_ease-out]">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
              <History size={32} />
            </div>
            
            <h3 className="text-xl font-bold text-gray-800 text-center mb-2">Sesi Belum Selesai</h3>
            <p className="text-gray-500 text-center mb-6 text-sm">
              Kamu masih memiliki kuis yang belum diselesaikan.
            </p>

            <div className="flex flex-col gap-3">
              <button 
                onClick={handleResume}
                className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30"
              >
                <PlayCircle size={18} />
                Lanjutkan Kuis
              </button>
              
              <button 
                onClick={handleReset}
                className="w-full flex items-center justify-center gap-2 py-3 bg-white text-red-500 border-2 border-red-100 rounded-xl font-bold hover:bg-red-50 transition-colors"
              >
                <Trash2 size={18} />
                Hapus & Mulai Baru
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 overflow-hidden relative z-10 w-full">
        <div className="flex border-b border-gray-100">
          <button 
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-4 text-sm font-bold transition-colors ${activeTab === 'login' ? 'text-blue-600 bg-blue-50/50' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Mulai Kuis
          </button>
          <button 
            onClick={() => setActiveTab('leaderboard')}
            className={`flex-1 py-4 text-sm font-bold transition-colors flex items-center justify-center gap-2 ${activeTab === 'leaderboard' ? 'text-blue-600 bg-blue-50/50' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Trophy size={14} /> Leaderboard
          </button>
        </div>

        <div className="p-8">
          {activeTab === 'login' ? (
            <div className="text-center animate-fadeIn">
              <div className="w-28 h-28 rounded-full overflow-hidden mx-auto mb-6 shadow-lg border-4 border-white transform hover:scale-105 transition-transform duration-300">
                <img src={harisPhoto} alt="Foto Profil" className="w-full h-full object-cover" />
              </div>
              
              <h1 className="text-xl font-extrabold text-gray-800 mb-1">DOT Malang Kuy 2026 Batch 1</h1>
              <h2 className="text-lg font-bold text-blue-600 mb-6">Challenge Frontend React.js</h2>
              
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="text-left">
                  <label className="block text-sm font-medium text-gray-700 ml-1 mb-2">Nama Lengkap</label>
                  <input
                    type="text"
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none bg-gray-50/50"
                    placeholder="Contoh: Abdul Haris"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit">Mulai Tantangan</Button>
              </form>
            </div>
          ) : (
            <div className="animate-fadeIn">
              <Leaderboard data={leaderboardData} onClear={refreshLeaderboard} />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Login;