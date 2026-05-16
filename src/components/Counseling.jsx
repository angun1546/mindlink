import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Counseling = ({ onNavigate }) => {
  const [step, setStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(containerRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 });
  }, [step]);

  const students = [
    { id: 1, name: '이지수', status: '불안', color: 'bg-danger/10 text-danger border-danger/20', info: '최근 3회 이상 고립감 감지' },
    { id: 2, name: '박민준', status: '안정', color: 'bg-success/10 text-success border-success/20', info: '교우 관계 원만함' },
    { id: 3, name: '김태양', status: '보통', color: 'bg-slate-100 text-slate-500 border-slate-200', info: '특이 사항 없음' }
  ];

  const filteredStudents = students.filter(s => s.name.includes(searchQuery));

  return (
    <div className="container mx-auto px-4 py-8" ref={containerRef}>
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => onNavigate('dashboard')} 
          className="mb-6 flex items-center gap-2 text-slate-400 font-bold hover:text-primary transition-all group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> 홈으로 돌아가기
        </button>

        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 space-y-6">
              <div className="card-glass p-8">
                <h2 className="text-2xl font-black mb-6 flex items-center gap-2 dark:text-white transition-colors">
                  <span className="text-primary">01.</span> 학생 선택
                </h2>
                
                <div className="relative mb-8">
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="상담할 학생 이름을 입력하세요..." 
                    className="w-full p-4 pl-12 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all shadow-inner dark:text-white"
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1 transition-colors">최근 상담 학생 리스트</h3>
                  {filteredStudents.length > 0 ? filteredStudents.map(student => (
                    <div 
                      key={student.id} 
                      onClick={() => setStep(2)}
                      className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl cursor-pointer hover:border-primary hover:shadow-xl hover:-translate-y-1 transition-all group"
                    >
                      <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-xl group-hover:bg-primary/10 transition-colors">👤</div>
                      <div className="flex-1">
                        <div className="font-bold text-slate-800 dark:text-slate-200 transition-colors">{student.name}</div>
                        <div className="text-xs text-slate-400 dark:text-slate-500 font-medium">{student.info}</div>
                      </div>
                      <span className={`text-[10px] font-black px-2 py-1 rounded-md border ${student.color}`}>{student.status}</span>
                    </div>
                  )) : (
                    <div className="py-12 text-center text-slate-400 dark:text-slate-600 font-medium">검색 결과가 없습니다.</div>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="bg-blue-50 dark:bg-blue-900/10 p-8 rounded-3xl text-slate-800 dark:text-slate-200 shadow-xl border border-primary/20 dark:border-primary/10 relative overflow-hidden transition-colors">
                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
                <h4 className="font-black text-xl mb-4 flex items-center gap-2 text-primary dark:text-blue-400 transition-colors">
                  <span>💡</span> AI Insights
                </h4>
                <div className="space-y-4 text-sm font-medium leading-relaxed">
                  <p className="text-slate-600 dark:text-slate-400">선택된 학생의 최근 감정 트렌드와 발화 패턴을 분석하여 최적의 상담 전략을 제안합니다.</p>
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-primary/10 shadow-sm transition-colors">
                    <p className="font-black text-primary dark:text-blue-400 mb-2 text-xs uppercase tracking-wider">오늘의 추천 키워드</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="bg-primary/10 dark:bg-primary/20 text-primary dark:text-blue-300 px-2 py-0.5 rounded text-[10px] font-black border border-primary/10 transition-colors">#공감</span>
                      <span className="bg-primary/10 dark:bg-primary/20 text-primary dark:text-blue-300 px-2 py-0.5 rounded text-[10px] font-black border border-primary/10 transition-colors">#친구갈등</span>
                      <span className="bg-primary/10 dark:bg-primary/20 text-primary dark:text-blue-300 px-2 py-0.5 rounded text-[10px] font-black border border-primary/10 transition-colors">#인정욕구</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="card-glass p-10 max-w-3xl mx-auto">
            <h2 className="text-2xl font-black mb-8 flex items-center gap-2 dark:text-white transition-colors">
              <span className="text-primary">02.</span> 실시간 감정 탐지 키트
            </h2>
            
            <div className="bg-slate-900 dark:bg-black text-white p-8 rounded-3xl mb-10 relative overflow-hidden shadow-2xl transition-colors">
              <div className="absolute top-0 right-0 p-4">
                <div className="flex items-center gap-2 bg-danger/20 text-danger border border-danger/30 px-3 py-1 rounded-full animate-pulse">
                  <div className="w-2 h-2 bg-danger rounded-full"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest">Live Analysis</span>
                </div>
              </div>
              
              <h3 className="text-xs text-slate-500 font-bold mb-4 uppercase tracking-tighter">Student Speech Input</h3>
              <p className="text-2xl font-medium leading-relaxed italic mb-8">
                "선생님, 친구들이 저만 빼고 노는 것 같아요... 제가 뭘 잘못했나요?"
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl transition-colors">
                  <div className="text-[10px] font-bold text-slate-400 mb-2 uppercase">미세 감정 신호</div>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-black text-danger">40%</span>
                    <span className="text-xs font-bold text-slate-400 pb-1">긴장됨</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full mt-2">
                    <div className="bg-danger h-full rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl transition-colors">
                  <div className="text-[10px] font-bold text-slate-400 mb-2 uppercase">언어적 패턴</div>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-black text-warning">35%</span>
                    <span className="text-xs font-bold text-slate-400 pb-1">억울함</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full mt-2">
                    <div className="bg-warning h-full rounded-full" style={{ width: '35%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-black text-slate-800 dark:text-white flex items-center gap-2 px-1 transition-colors">
                <span>💬</span> 추천 공감 대화 시작 문장
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {[
                  "지수가 그런 기분이 들었구나. 혼자 있는 것 같아 속상했겠네.",
                  "친구들과 같이 놀고 싶었는데 마음대로 되지 않아 서운했니?",
                  "먼저 다가가기 힘들었을 텐데, 용기 내서 선생님께 말해줘서 고마워."
                ].map((text, i) => (
                  <div 
                    key={i} 
                    onClick={() => setStep(3)}
                    className="group p-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl cursor-pointer hover:bg-primary/10 hover:border-primary/30 transition-all shadow-sm active:scale-[0.98]"
                  >
                    <p className="text-slate-800 dark:text-slate-200 font-bold group-hover:text-black dark:group-hover:text-white transition-colors selection:bg-primary/20">"{text}"</p>
                    <div className="mt-3 flex justify-end">
                      <span className="text-[10px] font-black text-primary dark:text-blue-400 uppercase tracking-wider transition-colors">이 흐름으로 대화하기 →</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="card-glass p-10 max-w-3xl mx-auto">
            <h2 className="text-2xl font-black mb-8 flex items-center gap-2 dark:text-white transition-colors">
              <span className="text-primary">03.</span> 상담 진행 및 자동 요약
            </h2>
            
            <div className="flex items-center gap-3 mb-6 bg-blue-50 dark:bg-blue-900/10 p-4 rounded-2xl border border-primary/20 dark:border-primary/10 transition-colors">
              <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold italic">AI</div>
              <p className="text-xs font-bold text-primary dark:text-blue-400 leading-snug transition-colors">
                교사 발화의 공감 수치를 실시간으로 분석 중입니다.<br/>
                현재 공감도: <span className="underline decoration-2">매우 높음 (92%)</span>
              </p>
            </div>

            <div className="space-y-6 mb-10 bg-slate-50 dark:bg-slate-900/50 p-8 rounded-3xl h-[400px] overflow-y-auto border border-slate-200 dark:border-slate-800 shadow-inner transition-colors">
              <div className="flex flex-col items-start">
                <span className="text-[10px] font-black text-primary dark:text-blue-400 mb-2 uppercase tracking-widest ml-4 transition-colors">Teacher</span>
                <p className="bg-white dark:bg-slate-800 p-4 rounded-3xl rounded-tl-none shadow-sm text-sm border border-slate-100 dark:border-slate-700 max-w-[85%] leading-relaxed text-slate-800 dark:text-slate-200 transition-colors">
                  지수가 그런 기분이 들었구나. 혼자 있는 것 같아 속상했겠네.
                </p>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 mb-2 uppercase tracking-widest mr-4 transition-colors">Student</span>
                <p className="bg-primary/10 dark:bg-primary/20 text-slate-900 dark:text-white p-4 rounded-3xl rounded-tr-none shadow-sm text-sm max-w-[85%] leading-relaxed border border-primary/10 transition-colors font-medium">
                  네... 제가 먼저 같이 놀자고 말하기가 힘들어요. 친구들이 저를 싫어할까 봐 걱정돼요.
                </p>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[10px] font-black text-primary dark:text-blue-400 mb-2 uppercase tracking-widest ml-4 transition-colors">Teacher</span>
                <p className="bg-white dark:bg-slate-800 p-4 rounded-3xl rounded-tl-none shadow-sm text-sm border border-slate-100 dark:border-slate-700 max-w-[85%] leading-relaxed text-slate-800 dark:text-slate-200 transition-colors">
                  거절당할까 봐 불안한 마음이 들 수도 있어. 지수는 참 배려심이 깊은 아이구나.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                className="py-4 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-black rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700"
              >
                상담 일시 정지
              </button>
              <button 
                onClick={() => onNavigate('results')}
                className="py-4 bg-primary text-slate-900 font-black rounded-2xl shadow-xl shadow-primary/30 hover:scale-[1.02] hover:bg-primary/90 active:scale-95 transition-all border-2 border-primary/20"
              >
                상담 종료 및 리포트 생성
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Counseling;
