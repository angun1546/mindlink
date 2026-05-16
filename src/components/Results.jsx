import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Results = ({ onNavigate }) => {
  const containerRef = useRef(null);
  const emojiRef = useRef(null);

  useEffect(() => {
    // 게이지 애니메이션 추가
    gsap.from(".gauge-fill", {
      width: 0,
      duration: 1.5,
      ease: "power4.out",
      stagger: 0.3
    });

    // 이모티콘 인터렉티브 애니메이션 (GSAP 활성화)
    if (emojiRef.current) {
      gsap.to(emojiRef.current, {
        scale: 1.1,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      
      const handleHover = () => {
        gsap.to(emojiRef.current, {
          rotate: 15,
          scale: 1.2,
          duration: 0.3,
          ease: "back.out(1.7)"
        });
      };
      
      const handleLeave = () => {
        gsap.to(emojiRef.current, {
          rotate: 0,
          scale: 1.1,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)"
        });
      };

      const el = emojiRef.current;
      el.addEventListener('mouseenter', handleHover);
      el.addEventListener('mouseleave', handleLeave);
      return () => {
        el.removeEventListener('mouseenter', handleHover);
        el.removeEventListener('mouseleave', handleLeave);
      };
    }
  }, []);

  const handleShareParent = () => {
    alert('학부모님께 상담 요약 정보가 안전하게 전송되었습니다. (암호화 처리 완료)');
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const scrollToBottom = () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl bg-white dark:bg-slate-950" ref={containerRef}>
      {/* Floating Scroll Buttons */}
      <div className="fixed bottom-10 left-10 z-[100] flex flex-col gap-3">
        <button 
          onClick={scrollToTop} 
          className="w-14 h-14 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl flex items-center justify-center text-2xl hover:scale-110 active:scale-90 transition-all group"
          title="위로 가기"
        >
          ⬆️
        </button>
        <button 
          onClick={scrollToBottom} 
          className="w-14 h-14 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl flex items-center justify-center text-2xl hover:scale-110 active:scale-90 transition-all group"
          title="아래로 가기"
        >
          ⬇️
        </button>
      </div>

      <header className="mb-10 flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white transition-colors">상담 결과 요약</h2>
          <p className="text-slate-600 dark:text-slate-400 font-black mt-2 transition-colors">2026년 5월 16일 | 5학년 2반 이지수 학생</p>
        </div>
        <div className="flex gap-2">
          <button className="px-6 py-3 bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-slate-900 dark:text-slate-100 font-black">
            🖨️ 인쇄
          </button>
          <button className="px-6 py-3 bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-slate-900 dark:text-slate-100 font-black">
            💾 저장
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* 감정 분석 결과 - 최상단 강조 */}
          <div className="bg-white dark:bg-slate-900 p-10 rounded-[40px] border-4 border-primary shadow-2xl relative overflow-hidden transition-all">
            <div className="absolute top-0 left-0 w-3 h-full bg-primary"></div>
            <h3 className="text-slate-900 dark:text-white text-sm font-black uppercase tracking-widest mb-10 flex items-center gap-3">
              <span className="w-3 h-3 bg-primary rounded-full animate-ping"></span>
              핵심 감정 분석 데이터
            </h3>
            <div className="flex flex-col sm:flex-row items-center gap-12">
              <div className="relative cursor-pointer" ref={emojiRef}>
                <div className="text-8xl p-10 bg-slate-50 dark:bg-slate-800 rounded-[56px] shadow-2xl border-2 border-white dark:border-slate-700 transition-colors">😟</div>
                <div className="absolute -bottom-4 -right-4 bg-slate-900 dark:bg-white dark:text-slate-900 text-white text-[10px] font-black px-3 py-2 rounded-xl shadow-2xl ring-4 ring-white dark:ring-slate-900 transition-colors">중간 강도</div>
              </div>
              <div className="flex-1 w-full space-y-8">
                <div>
                  <div className="flex justify-between items-end mb-3">
                    <span className="text-lg font-black text-slate-900 dark:text-slate-100 transition-colors">주요 감정: <span className="text-primary dark:text-blue-400">서운함</span></span>
                    <span className="text-2xl font-black text-slate-900 dark:text-white transition-colors">82%</span>
                  </div>
                  <div className="w-full h-6 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner border border-slate-200 dark:border-slate-700 transition-colors">
                    <div className="gauge-fill h-full bg-primary rounded-full shadow-[0_0_20px_rgba(74,144,226,0.7)] transition-all duration-1000" style={{ width: '82%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-end mb-3">
                    <span className="text-lg font-black text-slate-900 dark:text-slate-100 transition-colors">보조 감정: <span className="text-secondary dark:text-purple-400">억울함, 긴장</span></span>
                    <span className="text-2xl font-black text-slate-900 dark:text-white transition-colors">45%</span>
                  </div>
                  <div className="w-full h-6 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner border border-slate-200 dark:border-slate-700 transition-colors">
                    <div className="gauge-fill h-full bg-secondary rounded-full shadow-[0_0_20px_rgba(108,92,231,0.7)] transition-all duration-1000" style={{ width: '45%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-10 border-t-8 border-t-primary shadow-2xl rounded-[40px] border border-slate-200 dark:border-slate-800 transition-all">
            <h3 className="text-primary dark:text-blue-400 text-sm font-black uppercase tracking-widest mb-8 flex items-center gap-3">
              <span>📝</span> AI 상담 요약 (NEIS 연동용)
            </h3>
            <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-[32px] border-2 border-slate-100 dark:border-slate-700 space-y-4 shadow-inner">
              <p className="text-slate-900 dark:text-slate-100 text-xl font-black leading-relaxed italic">
                "친구 관계에서의 소외감으로 인한 서운함을 강하게 호소하며, 거절에 대한 불안이 관찰됨. 
                교사의 공감적 경청 이후 정서적으로 안정되었으며, 소그룹 협동 활동을 통한 성공 경험 제공이 필요함."
              </p>
              <div className="flex justify-end pt-6">
                <button className="text-sm font-black text-primary dark:text-blue-400 hover:underline uppercase tracking-widest bg-white dark:bg-slate-900 px-6 py-3 rounded-xl border-2 border-primary/20 shadow-md active:scale-95 transition-all">내용 수정하기</button>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-10 shadow-2xl rounded-[40px] border-2 border-slate-200 dark:border-slate-800 transition-all">
            <h3 className="text-slate-900 dark:text-white text-sm font-black uppercase tracking-widest mb-10 flex items-center gap-2">
              <span>🔍</span> 발견된 핵심 인사이트
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: "관계 욕구", text: "친구 갈등에서 인정받고 싶은 욕구 반복 관찰", icon: "🤝" },
                { title: "긍정적 변화", text: "회피 대신 자신의 감정을 직접 표현하려는 시도 증가", icon: "✨" },
                { title: "가정 연계", text: "가정 내 형제 관계와의 유사성 탐색 필요", icon: "🏠" },
                { title: "위험 감지", text: "고립감이 심화될 경우 우울 증상으로 발전 가능", icon: "⚠️" }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-[32px] hover:border-primary transition-all shadow-sm">
                  <div className="text-4xl mb-6">{item.icon}</div>
                  <div className="text-lg font-black text-slate-900 dark:text-slate-100 mb-3">{item.title}</div>
                  <p className="text-base text-slate-700 dark:text-slate-300 font-black leading-normal">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Trust Log 대체: 상담 사후 관리 포인트 */}
          <div className="bg-slate-900 dark:bg-blue-900/30 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden border-4 border-slate-800 dark:border-blue-800 transition-colors">
            <div className="absolute top-0 right-0 p-6">
              <span className="bg-primary text-white text-[10px] font-black px-3 py-1 rounded-full uppercase shadow-lg">Action Items</span>
            </div>
            <h3 className="text-xs font-black text-slate-400 dark:text-blue-400 uppercase tracking-widest mb-10 transition-colors">상담 사후 관리 가이드</h3>
            <div className="space-y-8 mb-4">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-white/10 dark:bg-white/5 rounded-2xl flex items-center justify-center text-3xl shadow-inner transition-colors">📋</div>
                <div className="text-sm font-black opacity-90 leading-tight">생활기록부 행동특성<br/>자동 초안 생성 완료</div>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-white/10 dark:bg-white/5 rounded-2xl flex items-center justify-center text-3xl shadow-inner transition-colors">🔔</div>
                <div className="text-sm font-black opacity-90 leading-tight">주의 관찰 학생<br/>주기적 알림 설정</div>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-white/10 dark:bg-white/5 rounded-2xl flex items-center justify-center text-3xl shadow-inner transition-colors">📊</div>
                <div className="text-sm font-black opacity-90 leading-tight">학기별 정서 변화<br/>통계 리포트 업데이트</div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-10 shadow-2xl rounded-[40px] border-2 border-slate-200 dark:border-slate-800 transition-all">
            <h3 className="text-slate-500 dark:text-slate-400 text-xs font-black uppercase tracking-widest mb-8">후속 상담 제안</h3>
            <div className="space-y-4">
              <button className="w-full p-6 bg-blue-50 dark:bg-blue-900/30 text-primary dark:text-blue-300 text-base font-black rounded-[24px] border-2 border-primary/20 dark:border-primary/40 hover:bg-primary hover:text-white transition-all text-left shadow-sm">
                📅 1주일 후 추적 상담 예약
              </button>
              <button className="w-full p-6 bg-purple-50 dark:bg-purple-900/30 text-secondary dark:text-purple-300 text-base font-black rounded-[24px] border-2 border-secondary/20 dark:border-secondary/40 hover:bg-secondary hover:text-white transition-all text-left shadow-sm">
                🏥 위클래스 전문 상담 연계
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <button className="w-full py-7 bg-secondary text-white font-black text-xl rounded-[40px] shadow-2xl shadow-secondary/40 hover:scale-[1.03] active:scale-95 transition-all flex items-center justify-center gap-3">
              <span>🚀</span> 나이스(NEIS)로 전송
            </button>
            <button 
              onClick={handleShareParent}
              className="w-full py-7 bg-white dark:bg-slate-800 border-4 border-slate-100 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-black text-xl rounded-[40px] hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-3 shadow-xl"
            >
              <span>🤝</span> 학부모 상담 공유
            </button>
            <button 
              onClick={() => onNavigate('dashboard')}
              className="w-full py-7 bg-primary text-slate-900 font-black text-xl rounded-[40px] shadow-2xl shadow-primary/40 hover:scale-[1.03] active:scale-95 transition-all flex items-center justify-center gap-3 border-2 border-primary/20"
            >
              🏠 홈으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
