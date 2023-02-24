import ResultChart from '@/components/ResultChart';
import React from 'react';

const UI = () => {
  return (
    <div>
      <ResultChart
        upperGoals={'141 0 131 10,286 1 0 336,309 2 0 409,267 1 0 317,91 0 152 -61'}
        lowerGoals={'259 1 0 309,217 3 0 367,272 1 0 322,228 1 0 278,92 0 150 -58'}
        confidenceLevel={80.95}
      />
    </div>
  );
};

export default UI;
