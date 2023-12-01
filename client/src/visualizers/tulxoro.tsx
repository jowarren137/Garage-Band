import P5 from 'p5';
import * as Tone from 'tone';

import { Visualizer } from '../Visualizers';

export const CircleVisualizer = new Visualizer(
    'Circle',
    (p5: P5, analyzer: Tone.Analyser) => {
        const width = window.innerWidth;
        const height = window.innerHeight / 2;
        const dim = Math.min(width, height);

        p5.background(0, 0, 0, 255);
        p5.strokeWeight(dim * 0.01);

        // just draw a circle
        p5.stroke(255, 255, 255, 255);
        p5.noFill();
        p5.circle(width / 2, height / 2, dim * 0.9);


        // draw a curve that shadows the circle that follows the waveform
        p5.stroke(255, 255, 255, 255);
        p5.noFill();
        p5.beginShape();
        const values = analyzer.getValue();
        
        p5.endShape();


    },
);