'use client';
import React from 'react';
import TextTransition, { presets } from 'react-text-transition';

const texts = [
  'Find Your Perfect Move',
  'Boost Your Moving Business',
  'Get Comprehensive Services',
  'Make Your Move Seamless',
  'Join the Moving Revolution',
  'Find Your Next Job',
];

const AnimatedHeader = () => {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const intervalId = setInterval(() => setIndex((index) => index + 1), 3000);
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <TextTransition springConfig={presets.slow} inline={true} direction='up'>
      {texts[index % texts.length]}
    </TextTransition>
  );
};

export default AnimatedHeader;
