import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ReactNode } from "react";

interface SlideInSectionProps {
  children: ReactNode;
  direction?: "left" | "right" | "up" | "down";
}

export default function SlideInSection({
  children,
  direction = "up",
}: SlideInSectionProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const getInitialPosition = () => {
    switch (direction) {
      case "left":
        return { x: -50, opacity: 0 };
      case "right":
        return { x: 50, opacity: 0 };
      case "down":
        return { y: 50, opacity: 0 };
      default:
        return { y: -50, opacity: 0 };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitialPosition()}
      animate={inView ? { x: 0, y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
