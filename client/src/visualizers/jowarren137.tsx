// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

export const DJPartyVisualizer = new Visualizer(
  'DJ Party',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);

    p5.background(0, 0, 0, 255);

    const values = analyzer.getValue();

    const rows = 5;
    const cols = 10;

    const rowHeight = height / rows;
    const colWidth = (width / cols) - 25;

    p5.noStroke();

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const index = i * cols + j;
        const amplitude = values[index] as number;
        // Random color generation
        const red = p5.random(255);
        const green = p5.random(255);
        const blue = p5.random(255);

        // Amplitute mapping
        const halfShapeSize = p5.map(amplitude, -1, 1, 0, dim / 3) / 2;

        // Rectangle positioning
        const centerX = j * colWidth + colWidth / 2;
        const centerY = i * rowHeight + rowHeight / 2;
        // Draw rectangle
        p5.fill(red, green, blue);
        p5.rectMode(p5.CENTER);
        p5.rect(centerX, centerY, halfShapeSize * 2, halfShapeSize * 2);
      }
    }
  },
);