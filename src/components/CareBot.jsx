import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CareBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const botRef = useRef(null);
  const chatRef = useRef(null);

  useEffect(() => {
    gsap.to(botRef.current, {
      y: -10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });
  }, []);

  const toggleChat = () => {
    if (!isOpen) {
      setIsOpen(true);
      gsap.fromTo(chatRef.current, 
        { scale: 0, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
      );
    } else {
      gsap.to(chatRef.current, {
        scale: 0, 
        opacity: 0, 
        y: 50, 
        duration: 0.3, 
        onComplete: () => setIsOpen(false) 
      });
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[1000] flex flex-col items-end">
      {isOpen && (
        <div ref={chatRef} className="card-glass w-[320px] mb-4 overflow-hidden border-primary/20 dark:border-primary/10 transition-colors">
          <div className="bg-primary p-4 text-white flex justify-between items-center">
            <span className="font-black flex items-center gap-2">🤖 마음 지기 NPC</span>
            <button onClick={toggleChat} className="text-white/80 hover:text-white text-xl">✕</button>
          </div>
          <div className="p-4 h-[300px] overflow-y-auto space-y-4 bg-slate-50/50 dark:bg-slate-950/50 transition-colors">
            <div className="flex flex-col items-start">
              <span className="text-[10px] font-black text-primary dark:text-blue-400 mb-1 uppercase tracking-tighter transition-colors">CareBot</span>
              <p className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none shadow-sm text-sm border border-slate-100 dark:border-slate-700 max-w-[90%] text-slate-800 dark:text-slate-200 leading-relaxed transition-colors">
                안녕하세요! 선생님이 바쁘실 때 제가 대신 이야기를 들어줄 수 있어요. 오늘 기분이 어때요?
              </p>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 mb-1 uppercase tracking-tighter transition-colors">Student</span>
              <p className="bg-primary/10 dark:bg-primary/20 text-slate-900 dark:text-white p-3 rounded-2xl rounded-tr-none shadow-sm text-sm max-w-[90%] border border-primary/10 dark:border-primary/5 font-medium leading-relaxed transition-colors">
                친구가 제 사과를 안 받아줘서 속상해요...
              </p>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-[10px] font-black text-primary dark:text-blue-400 mb-1 uppercase tracking-tighter transition-colors">CareBot</span>
              <p className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none shadow-sm text-sm border border-slate-100 dark:border-slate-700 max-w-[90%] text-slate-800 dark:text-slate-200 font-medium leading-relaxed transition-colors">
                그랬구나, 지수가 용기 내서 사과했는데 친구가 안 받아줘서 많이 당황스럽고 속상했겠다. 그 마음 충분히 이해해.
              </p>
            </div>
          </div>
          <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex gap-2 transition-colors">
            <input 
              type="text" 
              placeholder="마음을 들려주세요..." 
              className="flex-1 bg-slate-50 dark:bg-slate-800 p-2 rounded-lg text-sm outline-none focus:ring-1 focus:ring-primary dark:text-white transition-colors"
            />
            <button className="bg-primary text-white px-3 py-2 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">전송</button>
          </div>
        </div>
      )}
      
      <button 
        ref={botRef}
        onClick={toggleChat}
        className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-3xl shadow-2xl shadow-primary/40 hover:scale-110 active:scale-90 transition-transform cursor-pointer border-4 border-white"
      >
        🤖
      </button>
    </div>
  );
};

export default CareBot;
