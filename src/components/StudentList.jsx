import { useRef } from 'react';

const StudentList = ({ type, onNavigate }) => {
  const containerRef = useRef(null);

  const getTitle = () => {
    switch (type) {
      case 'needed': return '오늘 상담이 필요한 학생';
      case 'emotion-change': return '최근 감정 변화 감지 학생';
      case 'mood-sunny': return '오늘 기분이 "맑음"인 학생';
      case 'mood-cloudy': return '오늘 기분이 "구름"인 학생';
      case 'mood-rainy': return '오늘 기분이 "비"인 학생';
      case 'mood-storm': return '오늘 기분이 "천둥"인 학생';
      default: return '학생 리스트';
    }
  };

  const students = [
    { id: 1, name: '이지수', grade: '5-2', status: '심각', mood: '🌧️', reason: '친구 관계 갈등' },
    { id: 2, name: '박민준', grade: '5-2', status: '주의', mood: '⛅', reason: '학업 스트레스' },
    { id: 3, name: '김태양', grade: '5-2', status: '보통', mood: '☀️', reason: '정상 발달' },
    { id: 4, name: '최예나', grade: '5-2', status: '주의', mood: '🌧️', reason: '가정 환경 변화' },
  ];

  const filteredStudents = students.filter(s => {
    if (type === 'needed') return s.status === '심각' || s.status === '주의';
    if (type === 'emotion-change') return s.id === 1 || s.id === 4;
    if (type === 'mood-sunny') return s.mood === '☀️';
    if (type === 'mood-cloudy') return s.mood === '⛅';
    if (type === 'mood-rainy') return s.mood === '🌧️';
    if (type === 'mood-storm') return s.id === 1;
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8" ref={containerRef}>
      <button 
        onClick={() => onNavigate('dashboard')} 
        className="mb-6 flex items-center gap-2 text-slate-400 dark:text-slate-500 font-bold hover:text-primary dark:hover:text-blue-400 transition-all group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span> 홈으로 돌아가기
      </button>

      <div className="mb-8">
        <h2 className="text-3xl font-black text-slate-800 dark:text-white transition-colors">{getTitle()}</h2>
        <p className="text-slate-500 dark:text-slate-400 font-black transition-colors">총 {filteredStudents.length}명의 학생이 검색되었습니다.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStudents.map((student) => (
          <div 
            key={student.id}
            className="card-glass p-6 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer border-l-4 border-l-primary"
            onClick={() => onNavigate('counseling')}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-xl transition-colors">👤</div>
                <div>
                  <div className="font-black text-slate-800 dark:text-slate-200 transition-colors">{student.name}</div>
                  <div className="text-xs text-slate-400 dark:text-slate-500 transition-colors">{student.grade}</div>
                </div>
              </div>
              <span className="text-2xl">{student.mood}</span>
            </div>
            
            <div className="space-y-2 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800 transition-colors">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 dark:text-slate-400 font-black uppercase tracking-tighter transition-colors">상태</span>
                <span className={`px-2 py-0.5 rounded-md font-black ${
                  student.status === '심각' ? 'bg-danger/10 text-danger' : 
                  student.status === '주의' ? 'bg-warning/10 text-warning-dark' : 
                  'bg-success/10 text-success'
                }`}>
                  {student.status}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 dark:text-slate-400 font-black uppercase tracking-tighter transition-colors">주요 사유</span>
                <span className="text-slate-800 dark:text-slate-200 font-bold transition-colors">{student.reason}</span>
              </div>
            </div>

            <button className="w-full mt-6 py-2 bg-primary/10 dark:bg-primary/20 text-primary dark:text-blue-300 font-black rounded-xl hover:bg-primary hover:text-white transition-all text-sm shadow-sm border border-primary/10">
              상담 시작하기
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentList;
