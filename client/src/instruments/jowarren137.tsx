// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List } from 'immutable';
import React, { useEffect } from 'react';
import { RecursivePartial } from 'tone/Tone/core/util/Interface';

import { Instrument, InstrumentProps } from '../Instruments';
import { MembraneSynthOptions } from 'tone/Tone/instrument/MembraneSynth';
import image1 from './../img/DrumKit.png';
import image2 from './../img/ride.png';
import image3 from './../img/crash.png';

interface DrumPadProps {
  note: string;
  synth: Tone.Synth;
  position: { top: number; left: number };
}

export function DrumPad({ note, synth, position }: DrumPadProps): JSX.Element {
  return (
    <div
      onMouseDown={() => synth?.triggerAttack(note)}
      onMouseUp={() => synth?.triggerRelease('+0.25')}
      className={classNames('ba pointer absolute dim')}
      style={{
        top: position.top,
        left: position.left,
        zIndex: 0,
        marginLeft: 0,
        background: '#C8C9C5',
        height: '30px',
        width: '30px',
        borderRadius: '50%',
      }}
    ></div>
  );
}

function DrumKit({ synth, setSynth }: InstrumentProps): JSX.Element {
  const drumPads = List([
    { note: 'C2', idx: 0, position: { top: 200, left: 550 } }, // Kick
    { note: 'D2', idx: 1, position: { top: 110, left: 425 } }, // Snare
    { note: 'E2', idx: 2, position: { top: 275, left: 375 } }, // Closed Hi-Hat
    { note: 'F2', idx: 3, position: { top: 60, left: 365 } }, // Open Hi-Hat
    { note: 'G2', idx: 4, position: { top: 60, left: 515 } }, // Tom 1
    { note: 'A2', idx: 5, position: { top: 55, left: 600 } }, // Tom 2
    { note: 'B2', idx: 6, position: { top: 110, left: 700 } }, // Tom 3
    { note: 'C#2', idx: 7, position: { top: 25, left: 450 } }, // Crash Cymbal
    { note: 'D#2', idx: 8, position: { top: 55, left: 725 } }, // Ride Cymbal
  ]);

  const setDrumSynth = () => {
    setSynth(() => {
      const drumSynth = new Tone.MembraneSynth({
        volume: -2,
        pitchDecay: 0.008,
        octaves: 2,
        oscillator: { type: 'sine' } as RecursivePartial<Tone.OmniOscillatorOptions>,
        envelope: {
          attack: 0.02,
          decay: 0.8,
          sustain: 0,
          release: 1,
        } as RecursivePartial<Tone.EnvelopeOptions>,
      } as RecursivePartial<MembraneSynthOptions>);
      return drumSynth.toDestination();
    });
  };

  useEffect(setDrumSynth, [setSynth]);

  return (
    <div className="pv4" style={{ position: 'relative', height: 0, padding: 0 }}>
      <div className={'image'}>
        <img
          src={image1}
          alt={'Drum Kit'}
          style={{
            position: 'absolute',
            top: window.innerHeight / 64,
            left: window.innerWidth / 4,
          }}
        />
      </div>
      <div className={'image'}>
        <img
          src={image2}
          alt={'Ride Cymbal'}
          style={{
            position: 'absolute',
            top: window.innerHeight / 16,
            left: window.innerWidth / 2, 
            height: 60,
            width: 120,
          }}
        />
      </div>
      <div className={'image'}>
        <img
          src={image3}
          alt={'Crash Cymbal'}
          style={{
            position: 'absolute',
            top: window.innerHeight / 32,
            left: window.innerWidth / 3.2, 
            height: 50,
            width: 100,
          }}
        />
      </div>
      <div className="relative dib h0 w-100 ml4">
        {drumPads.map((pad, index) => (
          <DrumPad
            key={index}
            note={pad.note}
            synth={synth}
            position={pad.position}
          />
        ))}
      </div>
    </div>
  );
}

export const DrumKitInstrument = new Instrument('jowarren137', DrumKit);

