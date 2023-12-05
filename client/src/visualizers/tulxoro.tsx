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
        p5.strokeWeight(3);

        p5.noFill();
        p5.stroke(255, 255, 255, 255);

        p5.translate(width/2, height/2);

        const values = analyzer.getValue();
        p5.beginShape();
        for(let i = 0; i<values.length; i++){
            let r = p5.map(values[i] as number, 0, 1, 100, height/2);
            let x = r * p5.cos(i);
            let y = r * p5.sin(i);
            p5.vertex(x, y);
        }
        p5.endShape();
        
        


    },
);