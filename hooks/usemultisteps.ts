import { useState, useEffect } from 'react';

interface MultiStepHook {
  currentStepIndex: number;
  Step: JSX.Element;
  steps: JSX.Element[];
  prev: () => void;
  next: () => void;
  goTo: (index: number) => void;
  isFirst: boolean;
  isLast: boolean;
}

export const useMultiSteps = (steps: JSX.Element[]): MultiStepHook => {
  const [currentStepIndex, setCurrentStepIndex] = useState(1);

  const goTo = (index: number) => {
    setCurrentStepIndex(index);
  };

  const next = () => {
    setCurrentStepIndex((prevIndex) => {
      if (prevIndex + 1 >= steps.length) return prevIndex;
      return prevIndex + 1;
    });
  };

  const prev = () => {
    setCurrentStepIndex((prevIndex) => {
      if (prevIndex - 1 < 0) return prevIndex;
      return prevIndex - 1;
    });
  };

  const isFirst = currentStepIndex === 0;
  const isLast = currentStepIndex === steps.length - 1;
  const Step = steps[currentStepIndex - 1];

  return {
    currentStepIndex,
    Step,
    steps,
    prev,
    next,
    goTo,
    isFirst,
    isLast,
  };
};
