import { useEffect, useRef, ReactNode } from 'react';

/**
 * Wraps children and fades/slides them in once they enter the viewport.
 * Usage: <ScrollReveal><YourSection /></ScrollReveal>
 */
interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  stagger?: boolean;
  delay?: number; // extra delay in ms
}

export function ScrollReveal({
  children,
  className = '',
  stagger = false,
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add('kg-visible');
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`kg-reveal ${stagger ? 'kg-stagger' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
