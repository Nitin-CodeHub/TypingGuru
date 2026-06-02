import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Medal, 
  Crown, 
  Flame,
  TrendingUp,
  Target,
  Award,
  Users,
  Star
} from 'lucide-react';
import { useApp } from '../context/AppContext';

type TimeFilter = 'daily' | 'weekly' | 'monthly' | 'alltime';

type LeaderboardEntry = {
  rank: number;
  name: string;
  nameHindi: string;
  wpm: number;
  accuracy: number;
  tests: number;
  streak: number;
  avatar: string;
  isYou?: boolean;
};

// Generate sample leaderboard data
const generateLeaderboard = (userWpm: number, userAccuracy: number): LeaderboardEntry[] => {
  const names = [
    { name: 'Priya Sharma', nameHindi: 'प्रिया शर्मा', avatar: 'PS' },
    { name: 'Rahul Kumar', nameHindi: 'राहुल कुमार', avatar: 'RK' },
    { name: 'Anjali Singh', nameHindi: 'अंजलि सिंह', avatar: 'AS' },
    { name: 'Vikram Patel', nameHindi: 'विक्रम पटेल', avatar: 'VP' },
    { name: 'Sneha Gupta', nameHindi: 'स्नेहा गुप्ता', avatar: 'SG' },
    { name: 'Amit Verma', nameHindi: 'अमित वर्मा', avatar: 'AV' },
    { name: 'Pooja Yadav', nameHindi: 'पूजा यादव', avatar: 'PY' },
    { name: 'Ravi Shankar', nameHindi: 'रवि शंकर', avatar: 'RS' },
    { name: 'Neha Joshi', nameHindi: 'नेहा जोशी', avatar: 'NJ' },
    { name: 'Suresh Raina', nameHindi: 'सुरेश रैना', avatar: 'SR' },
  ];

  const entries = names.map((n, i) => ({
    rank: i + 1,
    ...n,
    wpm: Math.max(25, 68 - i * 2 + Math.floor(Math.random() * 5)),
    accuracy: Math.max(85, 98 - i),
    tests: Math.floor(Math.random() * 300) + 100,
    streak: Math.floor(Math.random() * 15) + 1
  }));

  // Add user entry
  if (userWpm > 0) {
    const userEntry: LeaderboardEntry = {
      rank: 0,
      name: 'You',
      nameHindi: 'आप',
      wpm: userWpm,
      accuracy: userAccuracy,
      tests: 0,
      streak: 0,
      avatar: 'ME',
      isYou: true
    };
    entries.push(userEntry);
  }

  // Sort by WPM
  entries.sort((a, b) => b.wpm - a.wpm);
  
  // Update ranks
  entries.forEach((entry, i) => {
    entry.rank = i + 1;
  });

  return entries;
};

export default function Leaderboard() {
  const { progress } = useApp();
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('weekly');

  const leaderboardData = generateLeaderboard(progress.bestWpm, progress.averageAccuracy);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-slate-400" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
    return <span className="text-slate-500 font-bold text-sm">{rank}</span>;
  };

  const getRankBg = (rank: number, isYou: boolean = false) => {
    if (isYou) return 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-300 dark:border-indigo-700';
    if (rank === 1) return 'bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-yellow-200 dark:border-yellow-800';
    if (rank === 2) return 'bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-gray-800/50 border-slate-300 dark:border-slate-600';
    if (rank === 3) return 'bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-800';
    return 'bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 py-6 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 text-sm font-medium mb-4"
          >
            <Trophy className="w-4 h-4" />
            <span>Top Performers</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white mb-2"
          >
            Leaderboard
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 dark:text-slate-400"
          >
            लीडरबोर्ड | Compete with other typists
          </motion.p>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {(['daily', 'weekly', 'monthly', 'alltime'] as TimeFilter[]).map((filter) => (
            <button
              key={filter}
              onClick={() => setTimeFilter(filter)}
              className={`px-3 sm:px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
                timeFilter === filter
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              {filter === 'alltime' ? 'All Time' : filter}
            </button>
          ))}
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {leaderboardData.slice(0, 3).map((user, i) => (
            <motion.div
              key={user.rank}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative p-4 rounded-2xl border text-center ${
                i === 0 ? 'order-2' : i === 1 ? 'order-1' : 'order-3'
              } ${getRankBg(user.rank)}`}
            >
              <div className={`w-12 h-12 sm:w-14 sm:h-14 mx-auto rounded-full flex items-center justify-center text-lg font-bold mb-2 ${
                user.rank === 1 
                  ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-white shadow-lg shadow-yellow-500/30' 
                  : user.rank === 2
                  ? 'bg-gradient-to-br from-slate-300 to-slate-400 text-white'
                  : 'bg-gradient-to-br from-amber-400 to-orange-500 text-white'
              }`}>
                {user.avatar}
              </div>
              <h3 className="font-semibold text-slate-800 dark:text-white text-xs sm:text-sm truncate">{user.name}</h3>
              <p className="text-[10px] text-slate-500 mb-2">{user.nameHindi}</p>
              <div className="text-xl sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400">{user.wpm}</div>
              <div className="text-[10px] text-slate-500">WPM</div>
              <div className="mt-2 flex items-center justify-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400">
                <Flame className="w-3 h-3" />
                {user.streak} day
              </div>
            </motion.div>
          ))}
        </div>

        {/* Leaderboard List */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl overflow-hidden">
          <div className="hidden sm:grid grid-cols-12 gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 text-xs font-medium text-slate-500 uppercase tracking-wider">
            <div className="col-span-1">Rank</div>
            <div className="col-span-4">User</div>
            <div className="col-span-2 text-center">WPM</div>
            <div className="col-span-2 text-center">Accuracy</div>
            <div className="col-span-2 text-center">Tests</div>
            <div className="col-span-1 text-center">Streak</div>
          </div>
          
          {leaderboardData.map((user, i) => (
            <motion.div
              key={user.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className={`grid grid-cols-12 gap-2 sm:gap-4 p-4 items-center border-t border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors ${
                user.isYou ? 'bg-indigo-50/50 dark:bg-indigo-900/10' : ''
              }`}
            >
              <div className="col-span-2 sm:col-span-1 flex items-center justify-center">
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center ${
                  user.rank <= 3 ? 'bg-indigo-100 dark:bg-indigo-900/50' : ''
                }`}>
                  {getRankIcon(user.rank)}
                </div>
              </div>
              <div className="col-span-5 sm:col-span-4 flex items-center gap-2 sm:gap-3">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm ${
                  user.isYou 
                    ? 'bg-gradient-to-br from-indigo-500 to-purple-600' 
                    : 'bg-gradient-to-br from-slate-400 to-slate-500'
                }`}>
                  {user.avatar}
                </div>
                <div className="min-w-0">
                  <div className="font-medium text-slate-800 dark:text-white text-sm truncate">
                    {user.name}
                    {user.isYou && <span className="ml-1 text-indigo-600">(You)</span>}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">{user.nameHindi}</div>
                </div>
              </div>
              <div className="col-span-2 text-center">
                <span className="font-bold text-indigo-600 dark:text-indigo-400 text-sm">{user.wpm}</span>
                <span className="text-[10px] text-slate-400 ml-0.5 hidden sm:inline">WPM</span>
              </div>
              <div className="col-span-2 text-center hidden sm:block">
                <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">{user.accuracy}%</span>
              </div>
              <div className="col-span-2 text-center hidden sm:block">
                <span className="font-medium text-slate-700 dark:text-slate-300 text-sm">{user.tests}</span>
              </div>
              <div className="col-span-1 text-center hidden sm:flex">
                <div className="flex items-center justify-center gap-1 text-orange-500">
                  <Flame className="w-3 h-3" />
                  <span className="text-xs font-medium">{user.streak}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          {[
            { icon: Users, label: 'Total Users', value: '50,000+' },
            { icon: Target, label: 'Tests Today', value: '2,500+' },
            { icon: TrendingUp, label: 'Avg WPM', value: '42' },
            { icon: Award, label: 'Certificates', value: '15,000+' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-xl p-4 border border-slate-200/50 dark:border-slate-700/50 text-center"
            >
              <stat.icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-slate-800 dark:text-white">{stat.value}</div>
              <div className="text-xs text-slate-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}