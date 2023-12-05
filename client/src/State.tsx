// 3rd party
import { List, Map } from 'immutable';

// project dependencies
import { PianoInstrument } from './instruments/Piano';
import { GuitarInstrument } from './instruments/tulxoro';
import { CircleVisualizer } from './visualizers/tulxoro';
import { BassGuitarInstrument } from './instruments/ralkurdi';
import { GridShapeVisualizer } from './visualizers/ralkurdi';
import { WaveformVisualizer } from './visualizers/Waveform';
import { DrumKitInstrument } from './instruments/jowarren137';
import { DJPartyVisualizer } from './visualizers/jowarren137';
import { TriangleInstrument } from './instruments/pranavmital_inst2';
import { EllipseVisualizer } from './visualizers/pranavmital';
import { DiamondVisualizer } from './visualizers/pranavmital_viz2';
import { ViolinInstrument } from './instruments/pranavmital';

/** ------------------------------------------------------------------------ **
 * The entire application state is stored in AppState.
 ** ------------------------------------------------------------------------ */
export type AppState = Map<string, any>;           // similar to { [id: string]: any }

/**
 * Start with the default piano instrument.
 * Add your instruments to this list.
 */
const instruments = List([PianoInstrument, DrumKitInstrument, GuitarInstrument, BassGuitarInstrument, TriangleInstrument, ViolinInstrument]);  // similar to Instrument[]

/**
 * Start with the default waveform visualizer.
 * Add your visualizers to this list.
 */
const visualizers = List([WaveformVisualizer, DJPartyVisualizer, DiamondVisualizer, EllipseVisualizer, CircleVisualizer, GridShapeVisualizer]);    // similar to Visualizer[]


/**
 * The default application state contains a list of instruments and a list of visualizers.
 *
 * 'instrument': List<Instrument>
 * 'visualizer': List<Visualizer>
 */
export const defaultState: AppState = Map<string, any>({
  'instruments': instruments,
  'visualizers': visualizers,
});