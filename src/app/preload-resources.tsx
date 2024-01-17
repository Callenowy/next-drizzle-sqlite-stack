'use client';

import ReactDOM from 'react-dom';

export function PreloadResources() {
  ReactDOM.preload('/svg-sprites/flags.svg', { as: 'image' });
  ReactDOM.preload('/svg-sprites/icons.svg', { as: 'image' });

  return null;
}
