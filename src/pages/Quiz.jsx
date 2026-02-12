import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import he from 'he';
import Layout from '../components/Layout';
import { formatTime } from '../utils/format';
import { Timer, AlertCircle, ArrowRight } from 'lucide-react';

const Quiz = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(30);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [autoRedirectTimer, setAutoRedirectTimer] = useState(3);

  useEffect(() => {
    const savedState = localStorage.getItem('quizState');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      setQuestions(parsedState.questions);
      setCurrentIndex(parsedState.currentQuestionIndex);
      setScore(parsedState.score);
      setUserAnswers(parsedState.userAnswers || []);
      setTimeLeft(parsedState.timeLeft);
      setLoading(false);
    } else {
      fetchQuestions();
    }
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple');
      setQuestions(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error(error);
      alert("Gagal memuat soal.");
    }
  };

  useEffect(() => {
    if (questions.length > 0 && currentIndex < questions.length) {
      const currentQuestion = questions[currentIndex];
      const answers = [
        ...currentQuestion.incorrect_answers,
        currentQuestion.correct_answer
      ].sort(() => Math.random() - 0.5);
      setShuffledAnswers(answers);
    }
  }, [currentIndex, questions]);

  useEffect(() => {
    if (loading || isTimeUp) return;
    
    if (timeLeft <= 0) {
      handleTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        saveProgress(newTime);
        return newTime;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, loading, isTimeUp]);

  useEffect(() => {
    if (isTimeUp) {
      if (autoRedirectTimer <= 0) {
        finishQuiz();
        return;
      }
      const redirectInterval = setInterval(() => {
        setAutoRedirectTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(redirectInterval);
    }
  }, [isTimeUp, autoRedirectTimer]);

  const handleTimeUp = () => {
    setIsTimeUp(true);
    localStorage.removeItem('quizState');
  };

  const saveProgress = (time) => {
    const stateToSave = {
      questions,
      currentQuestionIndex: currentIndex,
      score,
      userAnswers,
      timeLeft: time !== undefined ? time : timeLeft
    };
    localStorage.setItem('quizState', JSON.stringify(stateToSave));
  };

  const handleAnswer = (answer) => {
    const currentQuestion = questions[currentIndex];
    const isCorrect = answer === currentQuestion.correct_answer;

    const answerRecord = {
      question: currentQuestion.question,
      userAnswer: answer,
      correctAnswer: currentQuestion.correct_answer,
      isCorrect: isCorrect
    };
    
    const newUserAnswers = [...userAnswers, answerRecord];
    setUserAnswers(newUserAnswers);

    const newScore = {
      correct: isCorrect ? score.correct + 1 : score.correct,
      incorrect: isCorrect ? score.incorrect : score.incorrect + 1
    };
    setScore(newScore);

    const nextIndex = currentIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
      const stateToSave = {
        questions,
        currentQuestionIndex: nextIndex,
        score: newScore,
        userAnswers: newUserAnswers,
        timeLeft
      };
      localStorage.setItem('quizState', JSON.stringify(stateToSave));
    } else {
      finishQuiz(newScore, newUserAnswers);
    }
  };

  const finishQuiz = (finalScore = score, finalAnswers = userAnswers) => {
    const completeAnswers = questions.map((q, index) => {
      return finalAnswers[index] || {
        question: q.question,
        userAnswer: null,
        correctAnswer: q.correct_answer,
        isCorrect: false
      };
    });

    const finalCorrect = completeAnswers.filter(a => a.isCorrect).length;
    const finalIncorrect = questions.length - finalCorrect;

    localStorage.removeItem('quizState');
    navigate('/result', {
      state: {
        totalQuestions: questions.length,
        correct: finalCorrect,
        incorrect: finalIncorrect,
        reviewData: completeAnswers,
        timeLeft: timeLeft
      }
    });
  };

  if (loading) {
    return (
        <Layout>
            <div className="flex flex-col items-center justify-center h-64">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                <p className="text-gray-500 font-medium">Sedang menyiapkan soal...</p>
            </div>
        </Layout>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <Layout>
      {isTimeUp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full animate-[bounce_0.5s_ease-out] text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
              <AlertCircle size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Waktu Habis!</h3>
            <p className="text-gray-500 mb-6">Kamu akan diarahkan ke hasil dalam <span className="font-bold text-red-600">{autoRedirectTimer}</span> detik.</p>
            <button 
              onClick={() => finishQuiz()}
              className="w-full flex items-center justify-center gap-2 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors"
            >
              Lihat Hasil Sekarang <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden relative w-full">
        <div className="bg-blue-600 p-6 text-white">
          <div className="flex justify-between items-center mb-4">
             <div className="flex items-center gap-2 text-blue-100 bg-blue-700/50 px-3 py-1 rounded-full text-sm">
                <span className="font-mono">Soal {currentIndex + 1} / {questions.length}</span>
             </div>
             <div className={`flex items-center gap-2 font-mono font-bold text-lg ${timeLeft < 10 ? 'text-red-300 animate-pulse' : ''}`}>
                <Timer size={18} />
                {formatTime(timeLeft)}
             </div>
          </div>
          <div className="w-full bg-blue-800/50 rounded-full h-2">
            <div 
                className="bg-white h-2 rounded-full transition-all duration-500" 
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="mb-6">
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded uppercase tracking-wide">
                {he.decode(currentQuestion.category)}
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mt-3 leading-relaxed">
              {he.decode(currentQuestion.question)}
            </h2>
          </div>

          <div className="space-y-3">
            {shuffledAnswers.map((answer, index) => (
              <button
                key={index}
                onClick={() => !isTimeUp && handleAnswer(answer)}
                disabled={isTimeUp}
                className="w-full p-4 text-left rounded-xl border-2 border-gray-100 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group flex items-start disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {String.fromCharCode(65 + index)}
                </div>
                <span className="text-gray-700 font-medium group-hover:text-blue-700 pt-1">
                    {he.decode(answer)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Quiz;