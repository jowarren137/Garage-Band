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
  fret,
}: GuitarKeyProps): JSX.Element {
  return (
    <div
      onMouseDown={() => synth?.triggerAttack(`${note}`)}
      onMouseUp={() => synth?.triggerRelease('+0.25')}
      className={classNames('ba pointer absolute dim h1', {
        'bg-gray black': index % 2 === 0,
        'bg-black-80 black': index % 2 === 1,
      })}
      style={{
        top: `${index}rem`,
        left: `${fret * 2}rem`,
        width: `2rem`,
        marginLeft: '4rem',
      }}
    ></div>
  );
}

function Guitar({ synth, setSynth }: InstrumentProps): JSX.Element {
  // guitar keys have 7 notes in an octave
  let chords = List([
    { chord: 'E', idx: 0, octave: 4 },
    { chord: 'B', idx: 1, octave: 4 },
    { chord: 'G', idx: 2, octave: 3 },
    { chord: 'D', idx: 3, octave: 3 },
    { chord: 'A', idx: 4, octave: 2 },
    { chord: 'E', idx: 5, octave: 2 },
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

          {Range(0, 21).map(fret => (
            <div key={fret} className="flex flex-column">
              {chords.map(({ chord, idx, octave }) => {
                // create a note from chord, octave, and fret
                const note = Tone.Frequency(`${chord}${octave}`).transpose(fret).toNote();

                return (
                  <GuitarKey
                  note={`${note}`}
                  synth={synth}
                  octave={0}
                  index={idx} 
                  fret={fret}/> 
                )

            })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


export const GuitarInstrument = new Instrument('Guitar', Guitar);