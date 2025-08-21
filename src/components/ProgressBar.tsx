import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

 export const ProgressBar = () => {
    const [progress, setProgress] = useState(0);
    const [show, setShow] = useState(false);
    const location = useLocation();
  
    useEffect(() => {
      // إظهار شريط التقدم عند تغيير المسار
      setShow(true);
      setProgress(30); // بدء التقدم
  
      // محاكاة عملية التقدم
      const timer = setTimeout(() => {
        setProgress(80);
      }, 300);
  
      const completeTimer = setTimeout(() => {
        setProgress(100);
        // إخفاء شريط التقدم بعد اكتماله
        setTimeout(() => setShow(false), 300);
      }, 600);
  
      return () => {
        clearTimeout(timer);
        clearTimeout(completeTimer);
      };
    }, [location.pathname]);
  
    if (!show) return null;
  
    return (
      <div className="fixed top-0 left-0 w-full z-50">
        <div 
          className="h-1 bg-yellow-400 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    );
  };