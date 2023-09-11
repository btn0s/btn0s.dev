import { useEffect, RefObject } from 'react';

const useHoverTilt = (
  ref: RefObject<HTMLElement>,
  {
    tiltModifier = 1.2,
    scaleModifier = 1.02,
  }: {
    tiltModifier?: number;
    scaleModifier?: number;
  } = {},
) => {
  useEffect(() => {
    const handleTilt = (e: MouseEvent | TouchEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        let x: number, y: number;

        if (e instanceof MouseEvent) {
          x = e.clientX;
          y = e.clientY;
        } else if (e.touches && e.touches.length > 0) {
          x = e.touches[0].clientX;
          y = e.touches[0].clientY;
        } else {
          return;
        }

        const deltaX = (x - centerX) / (rect.width / 2);
        const deltaY = (y - centerY) / (rect.height / 2);

        const rotationY = tiltModifier * deltaX;
        const rotationX = -tiltModifier * deltaY;

        ref.current.style.transform = `perspective(500px) rotateX(${rotationX}deg) rotateY(${rotationY}deg) scale(${scaleModifier})`;
        ref.current.style.transformStyle = 'preserve-3d';
        ref.current.style.transition = 'transform 0.1s ease-out';
        ref.current.style.willChange = 'transform';
      }
    };

    const handleMouseLeave = () => {
      if (ref.current) {
        ref.current.style.transform = '';
      }
    };

    const node = ref.current;
    if (node) {
      node.addEventListener('mousemove', handleTilt);
      node.addEventListener('touchmove', handleTilt);
      node.addEventListener('mouseleave', handleMouseLeave);
      node.addEventListener('touchend', handleMouseLeave);

      return () => {
        node.removeEventListener('mousemove', handleTilt);
        node.removeEventListener('touchmove', handleTilt);
        node.removeEventListener('mouseleave', handleMouseLeave);
        node.removeEventListener('touchend', handleMouseLeave);
      };
    }
  }, [ref]);
};

export default useHoverTilt;
