DROP TABLE IF EXISTS songs;

CREATE TABLE songs (
	id int NOT NULL PRIMARY KEY,
	song_title text NOT NULL,
	notes varchar NOT NULL,
	artist varchar NOT NULL,
	album varchar NOT NULL
);

INSERT INTO songs (id, song_title, notes, artist, album) 
VALUES (1, 'Ode to Joy (Dubstep Remix)', 'E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4 D4 D4', 'Beethoven', 'Classic Hits');

INSERT INTO songs (id, song_title, notes, artist, album)
VALUES (2, 'Superstition', 'E4 E4 F#4 G4 F#4 E4 D4 C4 B3 B3 C4 D4 E4 F#4 G4 F#4 E4', 'Stevie Wonder', 'Talking Book');

INSERT INTO songs (id, song_title, notes, artist, album)
VALUES (3, 'Bohemian Rhapsody', 'B♭5 A5 G5 D6 G5 D6 C6 B♭5 A5 A5 B♭5 D6 C6 B♭5 C6 A5 G5 F5 F5 G5 A5 B♭5 B♭5 B♭5 B♭5', 'Queen', 'A Night at the Opera');

INSERT INTO songs (id, song_title, notes, artist, album)
VALUES (4, 'Exploded Diper', 'A3 A3 A3 A3 A3 B3 A3 G3 F#3 G3 A3 B3 C4 D4 D4 D4 D4 D4 D4 D4 D4 D4 D4 E4 D4 G4 G4 G4 G4 G4 G4 G4 G4 F#4 F#4 F#4 F#4 F#4 F#4 F#4 F#4', 'Loded Diper', 'Diary of a Wimpy Kid: Rodrick Rules Soundtrack');

INSERT INTO songs (id, song_title, notes, artist, album)
VALUES (5, 'Fly Me to the Moon', 'C4 E4 A4 D5 G5 G4 F#4 F4 E4 D4 G5 G5 G5 A5 A5 G5 F5 F5 E5 D5 D5 E5 D5 C5 C5', 'Frank Sinatra', 'It Might as Well Be Swing');

INSERT INTO songs (id, song_title, notes, artist, album)
VALUES (6, 'You Are the Sunshine of My Life', 'C4 C4 D4 E4 E4 D4 C4 D4 E4 E4 D4 C4 D4 C4', 'Stevie Wonder', 'Talking Book');
