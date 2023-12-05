// Violin.tsx
// 3rd party library imports
import * as Tone from 'tone';
import React, { useState } from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Violin.
 ** ------------------------------------------------------------------------ */

interface ViolinStringProps {
  stringNumber: number; // Number of the string on the violin
  synth?: Tone.Synth; // Tone.js Synth for sound generation
}

export function ViolinString({
  stringNumber,
  synth,
}: ViolinStringProps): JSX.Element {
  const [isBowActive, setIsBowActive] = useState(false);

  const handleMouseDown = (event: React.MouseEvent) => {
    setIsBowActive(true);
    playNoteBasedOnPosition(event);
  };

  const handleMouseUp = () => {
    setIsBowActive(false);
    synth?.triggerRelease();
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (isBowActive) {
      playNoteBasedOnPosition(event);
    }
  };

  const playNoteBasedOnPosition = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left; // x position within the element
    const stringLength = rect.width;
    const notePosition = x / stringLength; // Position along the string

    // Calculate note frequency based on position
    const baseFrequency = Tone.Frequency(`${Violin.notes[stringNumber]}4`).toFrequency();
    const frequency = baseFrequency + (baseFrequency * notePosition * 0.2); // Adjust frequency based on position

    synth?.triggerAttack(frequency);
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // Stop sound when mouse leaves string area
      onMouseMove={handleMouseMove}
      className="ba bg-dark-gray"
      style={{
        position: 'absolute',
        top: `${stringNumber * 25 + 10}%`,
        left: '10%',
        right: '10%',
        height: '3px',
      }}
    ></div>
  );
}

function Violin({ synth, setSynth }: InstrumentProps): JSX.Element {
  return (
    <div className="pv4">
      <div className="relative dib h4 w-100 ml4">
        {Array.from({ length: 4 }).map((_, index) => (
          <ViolinString
            key={`string-${index}`}
            stringNumber={index}
            synth={synth}
          />
        ))}
      </div>
    </div>
  );
}

Violin.notes = ['G', 'D', 'A', 'E']; // Standard tuning for a violin

export const ViolinInstrument = new Instrument('Violin', Violin);
