import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

interface ProgressChartProps {
  data: { date: string; wpm: number; accuracy: number }[];
  title?: string;
  titleHindi?: string;
}

export default function ProgressChart({ data, title = 'Progress', titleHindi = 'प्रगति' }: ProgressChartProps) {
  // Generate last 7 days if no data
  const chartData = data.length > 0 ? data : generateMockData();
  const maxWpm = Math.max(...chartData.map(d => d.wpm), 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-lg"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-slate-800 dark:text-white">{title}</h3>
          <p className="text-sm text-slate-500">{titleHindi}</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        </div>
      </div>

      {/* Bar Chart */}
      <div className="flex items-end justify-between gap-2 h-32 sm:h-40">
        {chartData.slice(-7).map((day, i) => {
          const height = (day.wpm / maxWpm) * 100;
          const date = new Date(day.date);
          const dayName = date.toLocaleDateString('en-IN', { weekday: 'short' });
          const isToday = new Date().toDateString() === date.toDateString();

          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div 
                className="w-full bg-slate-100 dark:bg-slate-700 rounded-t-lg relative overflow-hidden"
                style={{ height: '100%' }}
              >
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: 'easeOut' }}
                  className={`absolute bottom-0 w-full rounded-t-lg ${
                    isToday
                      ? 'bg-gradient-to-t from-indigo-600 to-purple-600'
                      : 'bg-gradient-to-t from-slate-400 to-slate-500 dark:from-slate-600 dark:to-slate-500'
                  }`}
                />
                
                {/* WPM Label */}
                <div className="absolute inset-0 flex items-end justify-center pb-1">
                  <span className="text-[10px] font-medium text-white drop-shadow-sm opacity-0 hover:opacity-100 transition-opacity">
                    {day.wpm}
                  </span>
                </div>
              </div>
              
              <span className={`text-xs font-medium ${
                isToday 
                  ? 'text-indigo-600 dark:text-indigo-400' 
                  : 'text-slate-500 dark:text-slate-400'
              }`}>
                {dayName}
              </span>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-gradient-to-r from-indigo-600 to-purple-600" />
          <span className="text-xs text-slate-500">WPM</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-slate-400" />
          <span className="text-xs text-slate-500">Previous</span>
        </div>
      </div>
    </motion.div>
  );
}

function generateMockData() {
  const data = [];
  const today = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toISOString().split('T')[0],
      wpm: Math.floor(Math.random() * 20) + 25,
      accuracy: Math.floor(Math.random() * 10) + 85
    });
  }
  
  return data;
}