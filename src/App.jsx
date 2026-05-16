import { useState, useEffect } from 'react'
import Header from './components/Header'
import CareBot from './components/CareBot'
import StudentList from './components/StudentList'
import Counseling from './components/Counseling'
import HomePage from './pages/HomePage'
import DetailPage from './pages/DetailPage'

function App() {
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [screenData, setScreenData] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
           (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  // Sync state with browser history
  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state) {
        setCurrentScreen(event.state.screen);
        setScreenData(event.state.data);
      } else {
        setCurrentScreen('dashboard');
        setScreenData(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    if (!window.history.state) {
      window.history.replaceState({ screen: 'dashboard', data: null }, '');
    }
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync dark mode class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const navigateTo = (screen, data = null) => {
    setCurrentScreen(screen);
    setScreenData(data);
    window.history.pushState({ screen, data }, '', `#${screen}${data ? '-' + data : ''}`);
  };

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500 relative overflow-x-hidden">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] z-[-1]" 
           style={{ backgroundImage: 'radial-gradient(#4a90e2 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }}></div>
      
      <Header onNavigate={navigateTo} currentScreen={currentScreen} />

      <main className="pb-20">
        {currentScreen === 'dashboard' && <HomePage onNavigate={navigateTo} />}
        {currentScreen === 'counseling' && <Counseling onNavigate={navigateTo} />}
        {currentScreen === 'results' && <DetailPage onNavigate={navigateTo} />}
        {currentScreen === 'student-list' && <StudentList type={screenData} onNavigate={navigateTo} />}
        {['analysis', 'learning'].includes(currentScreen) && (
          <div className="container mx-auto px-4 py-20 text-center">
            <div className="text-6xl mb-4">🚧</div>
            <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-2">준비 중인 기능입니다</h2>
            <p className="text-slate-500 dark:text-slate-400">조금만 기다려주시면 멋진 기능을 보여드릴게요!</p>
            <button 
              onClick={() => navigateTo('dashboard')}
              className="mt-8 px-6 py-2 bg-primary text-white font-bold rounded-full shadow-lg shadow-primary/20"
            >
              홈으로 돌아가기
            </button>
          </div>
        )}
      </main>
      
      {/* Dark Mode Toggle Button (Bottom Left) */}
      <button 
        onClick={toggleDarkMode}
        className="fixed bottom-8 left-8 z-[1000] w-14 h-14 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-2xl shadow-xl border border-slate-200 dark:border-slate-700 hover:scale-110 active:scale-95 transition-all group"
        title="테마 변경"
      >
        {isDarkMode ? '🌙' : '☀️'}
        <span className="absolute left-16 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {isDarkMode ? '다크 모드' : '라이트 모드'}
        </span>
      </button>

      <CareBot />
    </div>
  )
}

export default App
