type ChordLine = string;

interface Transposer {
  qualified: string[];
  ischordLine(line: ChordLine): boolean;
  isNumber(value: any): boolean;
  isChordLetter(chordLetter: string): boolean;
  transposeSong(song: string, originalKey: number, isEnarmonic: boolean): string;
  transposeLine(inputLine: ChordLine, originalKey: number, isEnarmonic: boolean): string;
  replaceChords(
    chordIndexes: number[][],
    chordIndex: number,
    lineToTranspot: ChordLine,
    transposeInterval: number,
    isEnarmonic: boolean
  ): string;
  transposeChord(tone: string, transposeInterval: number, isEnharmonic: boolean): string;
  flatToSharp(tone: string): string;
  getSampleSong(): string;
}

export const Transposer: Transposer = {
  qualified: [" ", "  ", "a", "b", "c", "d", "e", "f", "g", "#", "\\", "/", "-", "s", "u", "i", "m", "n", "j", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "(", ")", ">", "x", "*", "X", ".", "|", "_", "trim", "", "length", "toLowerCase", "indexOf", "qualified", "toUpperCase", "same", "replace", "\n", "split", "ischordLine", "transposeLine", "replaceChords", "substring", "isChordLetter", "transposeChord", "flatToSharp", "D", "isNumber", "A", "A#", "B", "C", "C#", "D#", "E", "F", "F#", "G", "G#", "Bb", "Db", "Eb", "Gb", "Ab", "B#", "ab", "bb", "cb", "db", "eb", "fb", "gb", "?", "None Like You\n\r\n\rF          Csus4        Dm\n\rThere is none like you\n\rBb        F                C7\n\rNo one else can touch my heart like you do\n\rF      C         Dm        Bb\n\rI can search for all eternity long\n\r   Dmin        C       Bb    Fmaj\n\rAnd find there is none like you"],


  ischordLine(line: ChordLine): boolean {
    const self = this as Transposer;

    if (line.trim() === '') {
      return false;
    }

    for (let i = 0; i < line.length; i++) {
      if (
        self.qualified.indexOf(line[i].toLowerCase()) === -1 &&
        self.qualified.indexOf(line[i].toUpperCase()) === -1
      ) {
        return false;
      }
    }

    const chords = line.replace('same', '');
    if (line.length !== chords.length) {
      return false;
    }

    return true;
  },
  isNumber(value: any): boolean {
    return !isNaN(parseFloat(value)) && isFinite(value);
  },

  isChordLetter(chordLetter: string): boolean {
    const chordLetters = ["A", "B", "C", "D", "E", "F", "G"];
    return chordLetters.includes(chordLetter.toUpperCase());
  },

  transposeSong(song: string, originalKey: number, isEnarmonic: boolean): string {
    const self = this as Transposer;
    const songLines = song.split('\n');
    let transposedSong = '';

    for (let i = 0; i < songLines.length; i++) {
      if (self.ischordLine(songLines[i])) {
        transposedSong += self.transposeLine(songLines[i], originalKey, isEnarmonic) + '\n';
      } else {
        transposedSong += songLines[i] + '\n';
      }
    }

    return transposedSong;
  },

  replaceChords(
    chordIndexes: number[][],
    chordIndex: number,
    lineToTranspot: string,
    transposeInterval: number,
    isEnarmonic: boolean
  ): string {
    const self = this as Transposer;
    let output = '';
    let startIndex, endIndex, previousChordEndIndex, gapBetweenChords, offsetFromCurrentIndex;

    if (chordIndexes[0][0] !== 0) {
      output += lineToTranspot.substring(0, chordIndexes[0][0] - 1);
    }

    for (let i = 0; i < chordIndex; i++) {
      startIndex = chordIndexes[i][0];
      endIndex = chordIndexes[i][1];

      if (i !== 0) {
        previousChordEndIndex = chordIndexes[i - 1][1] + 1;
        gapBetweenChords = startIndex - previousChordEndIndex;
        output += lineToTranspot.substring(previousChordEndIndex, previousChordEndIndex + gapBetweenChords - 1);
      }

      offsetFromCurrentIndex = 0;

      for (let currentIndex = startIndex; currentIndex <= endIndex; currentIndex++) {
        if (offsetFromCurrentIndex <= 0) {
          if (self.isChordLetter(lineToTranspot[currentIndex])) {
            if (lineToTranspot[currentIndex + 1] === '#' || lineToTranspot[currentIndex + 1] === 'b') {
              if (lineToTranspot[currentIndex + 1] === '#') {
                output += self.transposeChord(lineToTranspot[currentIndex] + lineToTranspot[currentIndex + 1], transposeInterval, isEnarmonic);
              } else {
                output += self.transposeChord(self.flatToSharp(lineToTranspot[currentIndex] + lineToTranspot[currentIndex + 1]), transposeInterval, isEnarmonic);
              }
              offsetFromCurrentIndex = 2;

              // Lógica para manejar casos especiales (dim, aug, etc.)
              if ((lineToTranspot[currentIndex + 2] === 'd' || lineToTranspot[currentIndex + 2] === 'D') && lineToTranspot[currentIndex + 3] === 'i' && lineToTranspot[currentIndex + 4] === 'm') {
                output += lineToTranspot.substring(currentIndex + 2, currentIndex + 5);
                offsetFromCurrentIndex += 3;
              } else if (lineToTranspot[currentIndex + 2] === 'a' && lineToTranspot[currentIndex + 3] === 'u' && lineToTranspot[currentIndex + 4] === 'g') {
                output += lineToTranspot.substring(currentIndex + 2, currentIndex + 5);
                offsetFromCurrentIndex += 3;
              } else if (lineToTranspot[currentIndex + 2] === 'a' && lineToTranspot[currentIndex + 3] === 'd' && lineToTranspot[currentIndex + 4] === 'd') {
                output += lineToTranspot.substring(currentIndex + 2, currentIndex + 5);
                offsetFromCurrentIndex += 3;
              }
            } else {
              if (self.isNumber(lineToTranspot[currentIndex + 1])) {
                if (lineToTranspot[currentIndex + 2] === '#' || lineToTranspot[currentIndex + 2] === 'b') {
                  if (lineToTranspot[currentIndex + 2] === '#') {
                    output += self.transposeChord(lineToTranspot[currentIndex] + lineToTranspot[currentIndex + 2], transposeInterval, isEnarmonic) + lineToTranspot[currentIndex + 1];
                  } else {
                    output += self.transposeChord(self.flatToSharp(lineToTranspot[currentIndex] + lineToTranspot[currentIndex + 2]), transposeInterval, isEnarmonic) + lineToTranspot[currentIndex + 1];
                  }
                  offsetFromCurrentIndex = 3;
                } else {
                  output += self.transposeChord(lineToTranspot[currentIndex], transposeInterval, isEnarmonic) + lineToTranspot[currentIndex + 1];
                  offsetFromCurrentIndex = 2;
                }
              } else {
                if (lineToTranspot[currentIndex + 1] === 'd' && lineToTranspot[currentIndex + 2] === 'i' && lineToTranspot[currentIndex + 3] === 'm') {
                  output += self.transposeChord(lineToTranspot[currentIndex], transposeInterval,isEnarmonic) + lineToTranspot.substring(currentIndex + 1, currentIndex + 4);
                  offsetFromCurrentIndex = 4;
                } else if (lineToTranspot[currentIndex + 1] === 'a' && lineToTranspot[currentIndex + 2] === 'u' && lineToTranspot[currentIndex + 3] === 'g') {
                  output += self.transposeChord(lineToTranspot[currentIndex], transposeInterval,isEnarmonic) + lineToTranspot.substring(currentIndex + 1, currentIndex + 4);
                  offsetFromCurrentIndex = 4;
                } else if (lineToTranspot[currentIndex + 1] === 'a' && lineToTranspot[currentIndex + 2] === 'd' && lineToTranspot[currentIndex + 3] === 'd') {
                  output += self.transposeChord(lineToTranspot[currentIndex], transposeInterval,isEnarmonic) + lineToTranspot.substring(currentIndex + 1, currentIndex + 4);
                  offsetFromCurrentIndex = 4;
                } else {
                  if ((lineToTranspot[currentIndex] === 'a' && lineToTranspot[currentIndex + 1] === 'd') || (lineToTranspot[currentIndex] === 'a' && lineToTranspot[currentIndex + 1] === 'u')) {
                    output += lineToTranspot.substring(currentIndex, currentIndex + 3);
                    offsetFromCurrentIndex = 3;
                  } else if (lineToTranspot[currentIndex] === 'd' && lineToTranspot[currentIndex + 1] === 'i') {
                    output += lineToTranspot.substring(currentIndex, currentIndex + 3);
                    offsetFromCurrentIndex = 3;
                  } else if (lineToTranspot[currentIndex].toLowerCase() === 'a' && lineToTranspot[currentIndex + 1].toLowerCase() === 'j') {
                    output += lineToTranspot[currentIndex];
                  } else {
                    output += self.transposeChord(lineToTranspot[currentIndex], transposeInterval, isEnarmonic);
                  }
                }
              }
            }
          } else {
            output += lineToTranspot[currentIndex];
          }
        }
        offsetFromCurrentIndex--;
      }
    }

    return output;
  },

  transposeChord(tone: string, transposeInterval: number, isEnharmonic: boolean): string {
    const notes: string[] = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
    let index: number = notes.indexOf(tone.toUpperCase());
    let transposedNote: string = '';

    if (transposeInterval < 0) {
      const shiftedIndex: number = transposeInterval + 12;
      transposedNote = notes[(index + transposeInterval) < 0 ? index + shiftedIndex : index + transposeInterval];
    } else {
      const shiftedIndex: number = transposeInterval - 12;
      transposedNote = notes[(index + transposeInterval) > 11 ? index + shiftedIndex : index + transposeInterval];
    }

    if (isEnharmonic) {
      switch (transposedNote) {
        case 'A#':
          transposedNote = 'Bb';
          break;
        case 'C#':
          transposedNote = 'Db';
          break;
        case 'D#':
          transposedNote = 'Eb';
          break;
        case 'F#':
          transposedNote = 'Gb';
          break;
        case 'G#':
          transposedNote = 'Ab';
          break;
        case 'B#':
          transposedNote = 'C#';
          break;
      }
    }

    return transposedNote;
  },
  flatToSharp(tone: string): string {
    switch (tone.toLowerCase()) {
      case "bb":
        return "A#";
      case "db":
        return "C#";
      case "eb":
        return "D#";
      case "gb":
        return "F#";
      case "ab":
        return "G#";
      case "b":
        return "C";
      case "e":
        return "F";
      default:
        return "?";
    }
  },
  transposeLine(inputLine: string, originalKey: number, isEnarmonic: boolean): string {
    const self = this as Transposer;
    const chordIndexes: number[][] = [];
    let insideChord = false;
    let chordIndex = 0;

    inputLine += ' ';

    // Identificar índices de acordes en la línea
    for (let i = 0; i < inputLine.length; i++) {
      if (!insideChord) {
        if (inputLine[i].trim() !== '') {
          chordIndexes[chordIndex] = [i];
          insideChord = true;
        }
      } else {
        if (inputLine[i].trim() === '') {
          chordIndexes[chordIndex][1] = i - 1;
          insideChord = false;
          chordIndex++;
        }
      }
    }

    return self.replaceChords(chordIndexes, chordIndex, inputLine, originalKey, isEnarmonic);
  },
  getSampleSong(): string {
    return "None Like You\n\
\n\
F          Csus4        Dm\n\
There is none like you\n\
Bb        F                C7\n\
No one else can touch my heart like you do\n\
F      C         Dm        Bb\n\
I can search for all eternity long\n\
   Dmin        C       Bb    Fmaj\n\
And find there is none like you";
  },
};
