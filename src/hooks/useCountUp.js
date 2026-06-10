import { useEffect, useRef, useState } from 'react';

export function useCountUp(target, duration = 1400) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        function easeOutQuart(t) {
          return 1 - Math.pow(1 - t, 4);
        }

        function step(now) {
          const progress = Math.min((now - start) / duration, 1);
          setCount(Math.round(easeOutQuart(progress) * target));
          if (progress < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
      },
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}