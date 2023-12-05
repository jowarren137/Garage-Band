import * as Tone from 'tone';
import classNames from 'classnames';
import React from 'react';
import { Instrument, InstrumentProps } from '../Instruments';

interface TriangleKeyProps {
  position: { top: string, left: string, transform: string };
  synth?: Tone.Synth;
}

function calculateSound(position: { top: string, left: string }): string {
  const notes = ['C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5'];
  return notes[Math.floor(Math.random() * notes.length)];
}

export function TriangleKey({
  position,
  synth,
}: TriangleKeyProps): JSX.Element {
  const sound = calculateSound(position);

  return (
    <div
      onMouseDown={() => synth?.triggerAttack(sound)}
      onMouseUp={() => synth?.triggerRelease('+0.25')}
      className={classNames('ba pointer absolute dim')}
      style={{
        ...position,
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: 'transparent',
        boxShadow: 'none',
        color: '#D8D8D8'
      }}
    ></div>
  );
}

function Triangle({ synth, setSynth }: InstrumentProps): JSX.Element {
  const triangleEdges = [];
  const size = 100; // size of the triangle

  for (let i = 0; i <= size; i++) {
    const percentage = i / size * 100;
    // Left edge
    triangleEdges.push({ top: `${100 - percentage}%`, left: `${percentage / 2}%`, transform: 'translate(0, -50%)' });
    // Right edge
    triangleEdges.push({ top: `${100 - percentage}%`, left: `${100 - percentage / 2}%`, transform: 'translate(-100%, -50%)' });
    // Bottom edge
    if (i !== 0 && i !== size) { // avoid duplicate points at the corners
      triangleEdges.push({ top: '100%', left: `${percentage}%`, transform: 'translate(-50%, 0%)' });
    }
  }

  React.useEffect(() => {
    setSynth(oldSynth => {
      if (oldSynth) {
        oldSynth.dispose();
      }
      return new Tone.Synth().toDestination();
    });
  }, [setSynth]);

  return (
    <div className="triangle-instrument" style={{ position: 'relative', height: `${size}px`, width: `${size}px`, margin: '50px auto' }}>
      {/* ... */}
      {triangleEdges.map((position, index) => (
        <TriangleKey
          key={`edge-${index}`}
          position={position}
          synth={synth}
        />
      ))}
    </div>
  );
}

export const TriangleInstrument = new Instrument('Triangle (idiophone)', Triangle);
