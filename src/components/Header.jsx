import { useState } from 'react';

const Header = ({ onNavigate, currentScreen }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const menuItems = [
    { id: 'dashboard', label: '홈', icon: '🏠' },
    { id: 'counseling', label: '상담 시작', icon: '💬' },
    { id: 'analysis', label: '학생 심리 분석', icon: '📊' },
    { id: 'learning', label: '상담 기술 학습', icon: '📚' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`'${searchQuery}' 학생 검색 결과로 이동합니다.`);
      // 실제로는 검색 결과 페이지나 필터링 로직으로 연결
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div 
          className="text-xl font-black text-primary flex items-center gap-2 cursor-pointer shrink-0"
          onClick={() => onNavigate('dashboard')}
        >
          마음<span className="text-secondary dark:text-blue-400">이음</span>
        </div>

        {/* Menu Bar */}
        <nav className="hidden md:flex items-center gap-1 overflow-x-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`px-4 py-2 rounded-full text-sm font-black transition-all whitespace-nowrap flex items-center gap-2 ${
                currentScreen === item.id 
                  ? 'bg-primary/20 dark:bg-primary/30 text-slate-900 dark:text-white shadow-sm ring-1 ring-primary/30' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md relative hidden sm:block">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="학생 이름 검색..."
            className="w-full h-10 pl-10 pr-4 bg-slate-100 dark:bg-slate-800 border border-transparent rounded-full text-sm focus:bg-white dark:focus:bg-slate-700 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all dark:text-white"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
        </form>

        {/* User Profile */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden lg:block text-right">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Educator</div>
            <div className="text-sm font-black text-slate-800 dark:text-slate-200">김교사 선생님</div>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full border-2 border-white dark:border-slate-700 shadow-sm flex items-center justify-center text-white font-bold">
            김
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
