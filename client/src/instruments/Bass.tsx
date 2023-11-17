// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';

/** ------------------------------------------------------------------------ **
 * Contains implementation for Bass.
 ** ------------------------------------------------------------------------ */

interface BassStringProps {
  note: string; // E1, A1, D2, G2, etc.
  duration?: string;
  synth?: Tone.Synth;
  fret: number;
}

export function BassString({
    note,
    synth,
    fret,
  }: BassStringProps): JSX.Element {
    return (
      <div
        onMouseDown={() => synth?.triggerAttack(`${note}`)}
        onMouseUp={() => synth?.triggerRelease('+0.25')}
        className={classNames('pointer absolute dim', {
          'bg-light-brown': fret === 0, // open string is a lighter color
          'bg-dark-green': fret !== 0,
        })}
        style={{
            top: 0,
            left: `${fret * 3}vw`, // fret spacing
            width: '3vw', 
            height: '100%',
            borderRight: '0.1vw solid black', // fret borders
        }}
      ></div>
    );
  }

  //TODO: Adjust css to have BassNeck attached to strings. 
  //Currently out of screen
  function BassNeck(): JSX.Element {
    return (
      <div style={{
        backgroundColor: 'saddlebrown',
        width: '12vw', 
        height: '0.5vw', 
        position: 'absolute',
        top: '3vw', 
        left: '0',
      }}></div>
    );
  }

//Notes 
function Bass({ synth, setSynth }: InstrumentProps): JSX.Element {
  const strings = [
    { note: 'E', octave: 1 },
    { note: 'A', octave: 1 },
    { note: 'D', octave: 2 },
    { note: 'G', octave: 2 },
  ];

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const frets = 20; // typical number of frets on bass

  return (
    <div className="pv4" style={{ height: '30vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <BassNeck />
    <div className="relative dib h4 w-100">
      {strings.map((string, idx) => (
        <div key={idx} className="absolute w-50 h-0.5" style={{ top: `${idx * 1.25}rem`, backgroundColor: 'saddlebrown', height: '1rem' }}>
          {Array.from({ length: frets }, (_, fret) => {
            const note = Tone.Frequency(`${string.note}${string.octave}`).transpose(fret).toNote();
            return (
              <BassString
                key={note}
                note={note}
                synth={synth}
                fret={fret}
              />
            );
          })}
        </div>
        ))}
      </div>
    </div>
  );
}

export const BassGuitarInstrument = new Instrument('Bass Guitar', Bass);
