// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for a Guitar.
 ** ------------------------------------------------------------------------ */
interface GuitarKeyProps{
  note: string;
  duration?: string;
  synth?: Tone.Synth;
  octave: number;
  index: number;
  
  fret: number;
}

export function GuitarKey({
  note,
  synth,
  index,
}: GuitarKeyProps): JSX.Element {
  return (
    <div
      onMouseDown={() => synth?.triggerAttack(`${note}`)}
      onMouseUp={() => synth?.triggerRelease('+0.25')}
      className={classNames('ba pointer absolute dim h1', {
        'bg-black black': index % 2 === 0,
        'bg-white black': index % 2 === 1,
      })}
      style={{
        top: `${index}rem`,
        left: 0,
        width: `10rem`,
        marginLeft: '4rem',
      }}
    ></div>
  );
}

function Guitar({ synth, setSynth }: InstrumentProps): JSX.Element {
  // guitar keys have 7 notes in an octave
  const keys = List([
    { note: 'C', idx: 0 },
    { note: 'D', idx: 1 },
    { note: 'E', idx: 2 },
    { note: 'F', idx: 3 },
    { note: 'G', idx: 4 },
    { note: 'A', idx: 5 },
    { note: 'B', idx: 6 },
  ])



  // set the oscillator type
  const setOscillator = (newType: Tone.ToneOscillatorType) => {
    setSynth(oldSynth => {
      oldSynth.disconnect();

      return new Tone.Synth({
        oscillator: { type: newType } as Tone.OmniOscillatorOptions,
      }).toDestination();
    });
  }

  // list of oscillators
  const oscillators: List<OscillatorType> = List([
    'sine',
    'sawtooth',
    'square',
    'triangle',
    'fmsine',
    'fmsawtooth',
    'fmtriangle',
    'amsine',
    'amsawtooth',
    'amtriangle',
  ]) as List<OscillatorType>;


  return (
    <div style={{'paddingTop': '15rem', 'paddingBottom':'2rem'}}>
      <div className="flex justify-center">
        <div className="flex flex-column items-center">
          <div className="flex flex-row">
            {oscillators.map((oscillator: OscillatorType) => (
              <div
                key={oscillator}
                onClick={() => setOscillator(oscillator)}
                className={classNames('dim pointer ph2 pv1 ba mr2 br1 fw7 bw1', {
                  'b--black black': oscillator === synth?.oscillator.type,
                  'gray b--light-gray': oscillator !== synth?.oscillator.type,
                })}
              >
                {oscillator}
              </div>
            ))}
          </div>
          <div className="flex flex-row">
            {Range(0, 2).map(octave => (
              <div key={octave} className="flex flex-column">
                {keys.map(({ note, idx }) => (
                  <GuitarKey
                    key={`${note}${octave}`}
                    note={`${note}${octave}`}
                    synth={synth}
                    octave={octave}
                    index={idx + octave * 7} 
                    fret={0}/>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


export const GuitarInstrument = new Instrument('Guitar', Guitar);