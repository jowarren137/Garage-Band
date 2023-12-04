// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

export const DiamondVisualizer = new Visualizer(
  'Diamond Visualizer',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;

    p5.background(0, 0, 0, 255);

    const values = analyzer.getValue();
    const bufferLength = values.length;
    const barWidth = width / bufferLength;

    for (let i = 0; i < bufferLength; i++) {
      const amplitude = values[i] as number;
      const barHeight = amplitude * height * 2;

      const r = p5.map(amplitude, -1, 1, 100, 255);
      const g = p5.map(i, 0, bufferLength, 100, 255);
      const b = 255;

      p5.fill(r, g, b);
      p5.noStroke();

      // Draw ellipse
      const x = barWidth * i;
      const y = height / 2;
      p5.ellipse(x, y, barWidth, barHeight);
    }
  },
);
