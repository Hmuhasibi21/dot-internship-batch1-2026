import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Leaderboard from '../components/Leaderboard';
import { saveToLeaderboard, getLeaderboard } from '../utils/leaderboard';
import { Trophy, XCircle, CheckCircle, Clock } from 'lucide-react';
import { calculateScore } from '../utils/format';
import he from 'he';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const resultData = location.state;
  const userName = localStorage.getItem('userName') || 'Peserta';
  
  const hasSaved = useRef(false);

  useEffect(() => {
    if (resultData && !hasSaved.current) {
      const score = calculateScore(resultData.correct, resultData.totalQuestions);
      const timeSpent = 30 - (resultData.timeLeft || 0);

      const isSessionSaved = sessionStorage.getItem('scoreSaved');
      
      if (!isSessionSaved) {
        saveToLeaderboard(userName, score, resultData.correct, timeSpent);
        sessionStorage.setItem('scoreSaved', 'true');
        hasSaved.current = true;
      }
      
      setLeaderboardData(getLeaderboard());
    } else {
        setLeaderboardData(getLeaderboard());
    }
    
    return () => {}
  }, [resultData, userName]);

  const refreshLeaderboard = () => {
    setLeaderboardData([]);
  };

  if (!resultData) {
    return <Navigate to="/" replace />;
  }

  const { totalQuestions, correct, incorrect, reviewData, timeLeft } = resultData;
  const score = calculateScore(correct, totalQuestions);
  const timeSpent = 30 - (timeLeft || 0);

  const handlePlayAgain = () => {
    localStorage.removeItem('quizState');
    sessionStorage.removeItem('scoreSaved');
    navigate('/quiz');
  };

  const handleLogout = () => {
    localStorage.removeItem('quizState');
    localStorage.removeItem('userName');
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-5xl">
        
        <div className="bg-white p-8 rounded-3xl shadow-xl text-center relative overflow-hidden order-1 lg:order-1 h-fit">
          {score > 70 && <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-blue-500"></div>}

          <div className="inline-block p-4 rounded-full bg-yellow-50 text-yellow-500 mb-4 shadow-sm">
            <Trophy size={40} fill={score === 100 ? "currentColor" : "none"} />
          </div>

          <h2 className="text-xl font-semibold text-gray-600 mb-1">Halo, {userName}!</h2>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
              {score >= 70 ? "Kerja Bagus!" : "Jangan Menyerah!"}
          </h1>

          <div className="bg-gray-50 rounded-2xl p-4 mb-6 border border-gray-100">
              <span className="text-4xl font-black text-gray-800 tracking-tighter">{score}</span>
              <span className="text-xs text-gray-400 block mt-1 uppercase tracking-widest">Total Skor</span>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-green-50 p-2 rounded-xl flex flex-col items-center border border-green-100">
                  <CheckCircle className="text-green-600 mb-1" size={18}/>
                  <span className="text-lg font-bold text-green-700">{correct}</span>
                  <span className="text-[10px] text-green-600 uppercase">Benar</span>
              </div>
              <div className="bg-red-50 p-2 rounded-xl flex flex-col items-center border border-red-100">
                  <XCircle className="text-red-600 mb-1" size={18}/>
                  <span className="text-lg font-bold text-red-700">{incorrect}</span>
                  <span className="text-[10px] text-red-600 uppercase">Salah</span>
              </div>
              <div className="bg-blue-50 p-2 rounded-xl flex flex-col items-center border border-blue-100">
                  <Clock className="text-blue-600 mb-1" size={18}/>
                  <span className="text-lg font-bold text-blue-700">{timeSpent}s</span>
                  <span className="text-[10px] text-blue-600 uppercase">Waktu</span>
              </div>
          </div>

          <div className="space-y-3">
            <Button onClick={handlePlayAgain}>Main Lagi</Button>
            <Button variant="secondary" onClick={handleLogout}>Ganti Akun</Button>
          </div>
        </div>

        <div className="flex flex-col gap-6 order-2 lg:order-2 h-full">
            
            <Leaderboard data={leaderboardData} onClear={refreshLeaderboard} />

            <div className="bg-white p-6 rounded-3xl shadow-xl overflow-hidden flex-grow">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
                    Review Jawaban
                </h3>
                
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                    {reviewData && reviewData.map((item, index) => {
                    let bgClass = "";
                    let borderClass = "";

                    if (item.userAnswer === null) {
                        bgClass = "bg-gray-50";
                        borderClass = "border-gray-200";
                    } else if (item.isCorrect) {
                        bgClass = "bg-green-50";
                        borderClass = "border-green-200";
                    } else {
                        bgClass = "bg-red-50";
                        borderClass = "border-red-200";
                    }

                    return (
                        <div key={index} className={`p-3 rounded-xl border text-xs ${bgClass} ${borderClass}`}>
                            <div className="flex justify-between items-start gap-2 mb-1">
                                <p className="font-semibold text-gray-800">
                                {index + 1}. {he.decode(item.question)}
                                </p>
                            </div>
                            
                            <div className="space-y-1 mt-2">
                                <div className="flex gap-2">
                                <span className="text-gray-500 min-w-[60px]">Kamu:</span>
                                {item.userAnswer === null ? (
                                    <span className="font-bold text-gray-400 italic flex items-center gap-1">
                                      <Clock size={10} /> Timeout
                                    </span>
                                ) : (
                                    <span className={`font-bold ${item.isCorrect ? 'text-green-700' : 'text-red-600'}`}>
                                    {he.decode(item.userAnswer)}
                                    </span>
                                )}
                                </div>

                                {!item.isCorrect && (
                                <div className="flex gap-2">
                                    <span className="text-gray-500 min-w-[60px]">Kunci:</span>
                                    <span className="font-bold text-green-700">
                                    {he.decode(item.correctAnswer)}
                                    </span>
                                </div>
                                )}
                            </div>
                        </div>
                    );
                    })}
                </div>
            </div>
        </div>

      </div>
    </Layout>
  );
};

export default Result;