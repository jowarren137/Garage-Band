// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

export const EllipseVisualizer = new Visualizer(
  'Ellipse Visualizer',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;

    p5.background(0, 0, 0, 255);

    const values = analyzer.getValue();
    const numberOfShapes = 10; // Number of shapes

    for (let i = 0; i < numberOfShapes; i++) {
      const amplitude = values[i % values.length] as number;
      const size = p5.map(Math.abs(amplitude), 0, 1, 20, 200); // Larger size range

      const x = (i / numberOfShapes) * width;
      const y = height / 2;

      // More dramatic color mapping
      const red = p5.map(Math.abs(amplitude), 0, 1, 0, 255);
      const green = p5.map(Math.abs(amplitude), 0, 1, 255, 0);
      const blue = p5.map(i, 0, numberOfShapes - 1, 0, 255);

      p5.fill(red, green, blue);
      p5.noStroke();
      p5.ellipse(x, y, size, size); // Draw an ellipse at (x, y) with dynamic size
    }
  },
);
