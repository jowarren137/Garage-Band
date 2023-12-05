import P5 from 'p5';
import * as Tone from 'tone';

import { Visualizer } from '../Visualizers';

export const GridShapeVisualizer = new Visualizer(
  'Grid Visualizer', 
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;

    // Clear the background
    p5.background(0, 0, 0, 255);

    const values = analyzer.getValue();
    const gridSize = 20; // Number of cells along one dimension
    const cellWidth = width / gridSize; // Width of each cell
    const cellHeight = height / gridSize; // Height of each cell

    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        const index = Math.floor((x + y * gridSize) * values.length / (gridSize ** 2));
        const amplitude = Math.abs(values[index] as number);

        // Map amplitude to size, with a larger minimum size
        const minSize = cellWidth * 0.2; // Minimum size of the shape
        const maxSize = cellWidth * 0.8; // Maximum size of the shape
        const size = p5.map(amplitude, 0, 1, minSize, maxSize);

        // Set position
        const posX = x * cellWidth + cellWidth / 2;
        const posY = y * cellHeight + cellHeight / 2;

        // Dynamic color based on amplitude and position
        const r = p5.map(amplitude, 0, 1, 100, 255);
        const g = p5.map(posX, 0, width, 100, 255);
        const b = p5.map(posY, 0, height, 100, 255);

        // Draw shapes
        p5.noStroke();
        p5.fill(r, g, b, 255);
        if ((x + y) % 2 === 0) {
          p5.ellipse(posX, posY, size, size); // Circle
        } else {
          p5.rect(posX - size / 2, posY - size / 2, size, size); // Square
        }
      }
    }
  },
);