import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Dashboard = ({ onNavigate }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gsap-card', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8" ref={containerRef}>
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 dark:text-white transition-colors">공감 상담 전문가 홈</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">오늘도 아이들의 마음에 귀를 기울여주셔서 감사합니다.</p>
        </div>
        <div className="bg-white dark:bg-slate-900 px-4 py-2 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-4 transition-colors">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Current Status</span>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">온라인 | 상담 가능</span>
          </div>
          <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
        </div>
      </div>

      <div className="bg-danger/10 dark:bg-danger/20 border border-danger/20 text-danger p-4 rounded-xl mb-8 flex items-center gap-3 font-bold shadow-sm">
        <span className="text-xl">🚨</span> 
        <div className="flex-1">
          <span className="mr-2">[위기 알림]</span> 
          5학년 2반 이지수 학생의 감정 신호가 급격히 불안정합니다. 즉각적인 확인이 필요합니다.
        </div>
        <button 
          onClick={() => onNavigate('counseling')}
          className="bg-white dark:bg-slate-800 text-danger px-4 py-1.5 rounded-lg text-sm font-black hover:bg-danger hover:text-white transition-all shrink-0 shadow-lg border-2 border-danger/20"
        >
          확인하기
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div 
          className="gsap-card card-glass p-8 cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all group border-2 border-primary/10 dark:border-primary/5"
          onClick={() => onNavigate('student-list', 'needed')}
        >
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h3 className="text-slate-500 dark:text-slate-400 text-xs font-black uppercase tracking-widest">오늘 필요한 상담</h3>
              <div className="text-5xl font-black text-primary dark:text-blue-400">2명</div>
            </div>
            <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-[24px] flex items-center justify-center text-3xl group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
              👤
            </div>
          </div>
        </div>
        <div 
          className="gsap-card card-glass p-8 cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all group border-2 border-primary/10 dark:border-primary/5"
          onClick={() => onNavigate('student-list', 'emotion-change')}
        >
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h3 className="text-slate-500 dark:text-slate-400 text-xs font-black uppercase tracking-widest">최근 감정 변화 감지</h3>
              <div className="text-5xl font-black text-primary dark:text-blue-400">1건</div>
            </div>
            <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-[24px] flex items-center justify-center text-3xl group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
              📈
            </div>
          </div>
        </div>
      </div>

      <div className="gsap-card card-glass p-6 mb-8">
        <h3 className="text-slate-500 dark:text-slate-400 text-sm font-bold mb-4 uppercase tracking-widest">학급 감정 기상청 (Mood Check-in)</h3>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {[
            { icon: '☀️', label: '맑음', count: 15, active: true, type: 'mood-sunny' },
            { icon: '⛅', label: '구름', count: 5, type: 'mood-cloudy' },
            { icon: '🌧️', label: '비', count: 2, type: 'mood-rainy' },
            { icon: '⚡', label: '천둥', count: 1, type: 'mood-storm' }
          ].map((m, i) => (
            <div 
              key={i} 
              onClick={() => onNavigate('student-list', m.type)}
              className={`flex flex-col items-center p-4 rounded-2xl cursor-pointer transition-all hover:scale-105 min-w-[90px] border-2 shadow-sm ${
                m.active 
                  ? 'bg-primary/20 border-primary shadow-lg shadow-primary/10 text-primary dark:text-blue-300' 
                  : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              <span className="text-3xl mb-1">{m.icon}</span>
              <span className="text-xs font-black whitespace-nowrap">
                {m.label} ({m.count})
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 gsap-card card-glass p-8 border-2 border-slate-100 dark:border-slate-800">
          <h3 className="text-slate-500 dark:text-slate-400 text-xs font-black uppercase tracking-widest mb-6 border-b border-slate-100 dark:border-slate-800 pb-3">주요 메뉴</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: '💬', label: '공감형 상담 시작하기', action: () => onNavigate('counseling'), color: 'text-blue-700 border-blue-100 bg-blue-50/50 hover:bg-primary dark:text-blue-400 dark:border-blue-900/30 dark:bg-blue-900/10' },
              { icon: '📊', label: '학생 심리 분석', action: () => {}, color: 'text-purple-700 border-purple-100 bg-purple-50/50 hover:bg-secondary dark:text-purple-400 dark:border-purple-900/30 dark:bg-purple-900/10' },
              { icon: '📂', label: '상황별 상담 모듈', action: () => {}, color: 'text-teal-700 border-teal-100 bg-teal-50/50 hover:bg-teal-600 dark:text-teal-400 dark:border-teal-900/30 dark:bg-teal-900/10' },
              { icon: '📚', label: '상담 기술 학습', action: () => {}, color: 'text-amber-700 border-amber-100 bg-amber-50/50 hover:bg-yellow-500 dark:text-amber-400 dark:border-amber-900/30 dark:bg-amber-900/10' }
            ].map((item, i) => (
              <div 
                key={i} 
                onClick={item.action} 
                className={`${item.color} p-5 rounded-2xl cursor-pointer flex items-center gap-4 font-black transition-all border hover:text-white hover:shadow-xl hover:-translate-y-1 active:scale-95 group shadow-sm`}
              >
                <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <span className="flex-1">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="gsap-card card-glass p-6">
          <h3 className="text-slate-500 dark:text-slate-400 text-sm font-bold mb-4 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800 pb-2">최근 알림</h3>
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border-l-4 border-danger">
              <p className="font-bold text-danger">위기 신호</p>
              <p className="text-slate-600 dark:text-slate-300">이지수 학생의 감정 불안정</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border-l-4 border-success">
              <p className="font-bold text-success">상담 완료</p>
              <p className="text-slate-600 dark:text-slate-300">박민준 학생 상담록 요약 완료</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
