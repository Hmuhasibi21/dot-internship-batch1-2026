import { useState } from 'react';
import { Trophy, Trash2, Clock, AlertTriangle } from 'lucide-react';
import { clearLeaderboard } from '../utils/leaderboard';

const Leaderboard = ({ data, onClear }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const initiateClear = () => {
    setShowDeleteModal(true);
  };

  const confirmClear = () => {
    clearLeaderboard();
    if (onClear) onClear();
    setShowDeleteModal(false);
  };

  const cancelClear = () => {
    setShowDeleteModal(false);
  };

  if (!data || data.length === 0) {
    return (
      <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-100 relative group">
        <p className="text-gray-400 text-sm">Belum ada riwayat skor.</p>
      </div>
    );
  }

  return (
    <>
      {showDeleteModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full transform scale-100 animate-[bounce_0.3s_ease-out]">
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
              <AlertTriangle size={28} />
            </div>
            
            <h3 className="text-lg font-bold text-gray-800 text-center mb-2">Hapus Leaderboard?</h3>
            <p className="text-gray-500 text-center mb-6 text-sm">
              Apakah kamu yakin ingin menghapus semua riwayat skor? Data yang dihapus tidak dapat dikembalikan.
            </p>

            <div className="flex gap-3">
              <button 
                onClick={cancelClear}
                className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={confirmClear}
                className="flex-1 py-2.5 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-500/30"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden relative">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
              <Trophy className="text-yellow-300 w-5 h-5" />
              <h3 className="font-bold text-white text-sm uppercase tracking-wider">Hall of Fame</h3>
          </div>
          <button 
              onClick={initiateClear}
              className="text-white/70 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-all"
              title="Hapus Leaderboard"
          >
              <Trash2 size={16} />
          </button>
        </div>
        
        <div className="divide-y divide-gray-100 max-h-60 overflow-y-auto custom-scrollbar">
          {data.map((player, index) => {
            let rankColor = "text-gray-500 bg-gray-100";
            let rowClass = "bg-white";

            if (index === 0) {
              rankColor = "text-yellow-700 bg-yellow-100";
              rowClass = "bg-yellow-50/30";
            } else if (index === 1) {
              rankColor = "text-gray-700 bg-gray-200";
            } else if (index === 2) {
              rankColor = "text-orange-700 bg-orange-100";
            }

            return (
              <div key={player.id} className={`flex items-center justify-between p-4 ${rowClass} hover:bg-gray-50 transition-colors`}>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm ${rankColor}`}>
                    {index + 1}
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-gray-800 text-sm">{player.name}</p>
                    <div className="flex items-center gap-2 text-[10px] text-gray-400">
                      <span>{player.date}</span>
                      <span className="flex items-center gap-1 bg-gray-100 px-1.5 py-0.5 rounded">
                          <Clock size={8} /> {player.timeSpent}s
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-indigo-600">{player.score}</p>
                  <p className="text-[10px] text-gray-400">pts</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Leaderboard;