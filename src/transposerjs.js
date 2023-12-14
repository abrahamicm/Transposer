var words = [" ", "  ", "a", "b", "c", "d", "e", "f", "g", "#", "\\", "/", "-", "s", "u", "i", "m", "n", "j", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "(", ")", ">", "x", "*", "X", ".", "|", "_", "trim", "", "length", "toLowerCase", "indexOf", "qualified", "toUpperCase", "same", "replace", "\n", "split", "ischordLine", "transposeLine", "replaceChords", "substring", "isChordLetter", "transposeChord", "flatToSharp", "D", "isNumber", "A", "A#", "B", "C", "C#", "D#", "E", "F", "F#", "G", "G#", "Bb", "Db", "Eb", "Gb", "Ab", "B#", "ab", "bb", "cb", "db", "eb", "fb", "gb", "?", "None Like You\n\r\n\rF          Csus4        Dm\n\rThere is none like you\n\rBb        F                C7\n\rNo one else can touch my heart like you do\n\rF      C         Dm        Bb\n\rI can search for all eternity long\n\r   Dmin        C       Bb    Fmaj\n\rAnd find there is none like you",];
var TabTuner = {
   qualified: [" ", "  ", "a", "b", "c", "d", "e", "f", "g", "#", "\\", "/", "-", "s", "u", "i", "m", "n", "j", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "(", ")", ">", "x", "*", "X", ".", "|", "_", "trim", "", "length", "toLowerCase", "indexOf", "qualified", "toUpperCase", "same", "replace", "\n", "split", "ischordLine", "transposeLine", "replaceChords", "substring", "isChordLetter", "transposeChord", "flatToSharp", "D", "isNumber", "A", "A#", "B", "C", "C#", "D#", "E", "F", "F#", "G", "G#", "Bb", "Db", "Eb", "Gb", "Ab", "B#", "ab", "bb", "cb", "db", "eb", "fb", "gb", "?", "None Like You\n\r\n\rF          Csus4        Dm\n\rThere is none like you\n\rBb        F                C7\n\rNo one else can touch my heart like you do\n\rF      C         Dm        Bb\n\rI can search for all eternity long\n\r   Dmin        C       Bb    Fmaj\n\rAnd find there is none like you"],
   ischordLine: function (line) {
      var self = this;
      if (line['trim']() == '') {
         return false;
      }
      for (var i = 0; i < line['length']; i++) {
         if (self['qualified']['indexOf'](line[i]['toLowerCase']()) == -1 && self['qualified']['indexOf'](line[i]['toUpperCase']()) == -1) {
            return false;
         }
      }
      var chords = line['replace']('same', '');
      if (line['length'] != chords['length']) {
         return false;
      }
      return true;
   }
   ,
   isNumber: function (value) {
      return !isNaN(parseFloat(value)) && isFinite(value);
   },
   isChordLetter: function (chordLetter) {
      var chordLetters = ["A", "B", "C", "D", "E", "F", "G"];
      return chordLetters.includes(chordLetter.toUpperCase());
   },
   transposeSong: function (song, originalKey, isEnarmonic) {
      var self = this,
         songLines = song['split']('\n'),
         transposedSong = '';
      for (var i = 0; i < songLines['length']; i++) {
         if (self['ischordLine'](songLines[i])) {
            transposedSong += self['transposeLine'](songLines[i], originalKey, isEnarmonic) + '\n';
         } else {
            transposedSong += songLines[i] + '\n';
         }
      }
      return transposedSong;
   },
   transposeLine: function (inputLine, originalKey, isEnarmonic) {
      var self = this,
         chordIndexes = new Array(),
         insideChord = false,
         chordIndex = 0,
         _0x455fx13 = '';
      inputLine += ' ';
      for (var i = 0; i < inputLine['length']; i++) {
         if (!insideChord) {
            if (inputLine[i]['trim']() != '') {
               chordIndexes[chordIndex] = [i];
               insideChord = true;
            }
         } else {
            if (inputLine[i]['trim']() == '') {
               chordIndexes[chordIndex][1] = i - 1;
               insideChord = false;
               chordIndex++;
            }
         }
      }
      debugger;
      return self['replaceChords'](chordIndexes, chordIndex, inputLine, originalKey, isEnarmonic);
   },

   replaceChords: function (chordIndexes, chordIndex, lineToTranspot, transposeInterval, isEnarmonic) {

      var self = this, // Se guarda la referencia al objeto actual
         ouput = '', // Variable para guardar el resultado final
         startIndex, // Índice de inicio del acorde actual
         endIndex, // Índice de fin del acorde actual
         previousChordEndIndex, // Índice de fin del acorde anterior
         gapBetweenChords, // Diferencia entre el fin del acorde anterior y el inicio del acorde actual
         offsetFromCurrentIndex, // Desplazamiento de índice
         _0x455fx1b; // No se utiliza
      if (chordIndexes[0][0] != 0) { // Si el primer acorde no empieza en el inicio de la línea
         ouput += lineToTranspot['substring'](0, parseInt(chordIndexes[0][0]) - 1); // Se guarda todo lo que hay antes del primer acorde
      }
      for (var i = 0; i < chordIndex; i++) { // Se recorren todos los acordes
         startIndex = parseInt(chordIndexes[i][0]); // Se obtiene el índice de inicio del acorde actual
         endIndex = parseInt(chordIndexes[i][1]); // Se obtiene el índice de fin del acorde actual
         if (i != 0) { // Si no es el primer acorde
            previousChordEndIndex = parseInt(chordIndexes[i - 1][1]) + 1; // Se obtiene el índice de fin del acorde anterior
            gapBetweenChords = startIndex - previousChordEndIndex; // Se calcula la diferencia entre el fin del acorde anterior y el inicio del acorde actual
            ouput += lineToTranspot['substring'](previousChordEndIndex, previousChordEndIndex + gapBetweenChords - 1); // Se guarda lo que hay entre el fin del acorde anterior y el inicio del acorde actual
         }
         offsetFromCurrentIndex = 0; // Se inicializa el desplazamiento de índice en 0
         for (var currentIndex = startIndex; currentIndex <= endIndex; currentIndex++) { // Se recorren todos los caracteres del acorde actual
            if (offsetFromCurrentIndex <= 0) { // Si el desplazamiento de índice es menor o igual a 0
               if (self['isChordLetter'](lineToTranspot[currentIndex])) { // Si el caracter actual es una letra de acorde
                  if (lineToTranspot[currentIndex + 1] == '#' || lineToTranspot[currentIndex + 1] == 'b') { // Si el siguiente caracter es # o b
                     if (lineToTranspot[currentIndex + 1] == '#') { // Si es #
                        ouput += self['transposeChord'](lineToTranspot[currentIndex] + lineToTranspot[currentIndex + 1], transposeInterval, isEnarmonic); // Se transpone el acorde y se agrega al resultado
                     } else {
                        ouput += self['transposeChord'](self['flatToSharp'](lineToTranspot[currentIndex] + lineToTranspot[currentIndex + 1]), transposeInterval, isEnarmonic);
                     }
                     offsetFromCurrentIndex = 2;
                     if ((lineToTranspot[currentIndex + 2] == 'd' || lineToTranspot[currentIndex + 2] == 'D') && lineToTranspot[currentIndex + 3] == 'i' && lineToTranspot[currentIndex + 4] == 'm') {
                        ouput += lineToTranspot[currentIndex + 2] + lineToTranspot[currentIndex + 3] + lineToTranspot[currentIndex + 4];
                        offsetFromCurrentIndex = offsetFromCurrentIndex + 3;
                     } else {
                        if (lineToTranspot[currentIndex + 2] == 'a' && lineToTranspot[currentIndex + 3] == 'u' && lineToTranspot[currentIndex + 4] == 'g') {
                           ouput += lineToTranspot[currentIndex + 2] + lineToTranspot[currentIndex + 3] + lineToTranspot[currentIndex + 4];
                           offsetFromCurrentIndex = offsetFromCurrentIndex + 3;
                        } else {
                           if (lineToTranspot[currentIndex + 2] == 'a' && lineToTranspot[currentIndex + 3] == 'd' && lineToTranspot[currentIndex + 4] == 'd') {
                              ouput += lineToTranspot[currentIndex + 2] + lineToTranspot[currentIndex + 3] + lineToTranspot[currentIndex + 4];
                              offsetFromCurrentIndex = offsetFromCurrentIndex + 3;
                           }
                        }
                     }
                  } else {
                     if (self['isNumber'](lineToTranspot[currentIndex + 1])) {
                        if (lineToTranspot[currentIndex + 2] == '#' || lineToTranspot[currentIndex + 2] == 'b') {
                           if (lineToTranspot[currentIndex + 2] == '#') {
                              ouput += self['transposeChord'](lineToTranspot[currentIndex] + lineToTranspot[currentIndex + 2], transposeInterval, isEnarmonic) + lineToTranspot[currentIndex + 1];
                           } else {
                              ouput += self['transposeChord'](self['flatToSharp'](lineToTranspot[currentIndex] + lineToTranspot[currentIndex + 2], transposeInterval, isEnarmonic) + lineToTranspot[currentIndex + 1]);
                           }
                           offsetFromCurrentIndex = 3;
                        } else {
                           ouput += self['transposeChord'](lineToTranspot[currentIndex], transposeInterval, isEnarmonic) + lineToTranspot[currentIndex + 1];
                           offsetFromCurrentIndex = 2;
                        }
                     } else {
                        if (lineToTranspot[currentIndex + 1] == 'd' && lineToTranspot[currentIndex + 2] == 'i' && lineToTranspot[currentIndex + 3] == 'm') {
                           ouput += self['transposeChord'](lineToTranspot[currentIndex], transposeInterval) + lineToTranspot[currentIndex + 1] + lineToTranspot[currentIndex + 2] + lineToTranspot[currentIndex + 3];
                           offsetFromCurrentIndex = 4;
                        } else {
                           if (lineToTranspot[currentIndex + 1] == 'a' && lineToTranspot[currentIndex + 2] == 'u' && lineToTranspot[currentIndex + 3] == 'g') {
                              ouput += self['transposeChord'](lineToTranspot[currentIndex], transposeInterval) + lineToTranspot[currentIndex + 1] + lineToTranspot[currentIndex + 2] + lineToTranspot[currentIndex + 3];
                              offsetFromCurrentIndex = 4;
                           } else {
                              if (lineToTranspot[currentIndex + 1] == 'a' && lineToTranspot[currentIndex + 2] == 'd' && lineToTranspot[currentIndex + 3] == 'd') {
                                 ouput += self['transposeChord'](lineToTranspot[currentIndex], transposeInterval) + lineToTranspot[currentIndex + 1] + lineToTranspot[currentIndex + 2] + lineToTranspot[currentIndex + 3];
                                 offsetFromCurrentIndex = 4;
                              } else {
                                 if ((lineToTranspot[currentIndex] == 'a' && lineToTranspot[currentIndex + 1] == 'd') || (lineToTranspot[currentIndex] == 'a' && lineToTranspot[currentIndex + 1] == 'u')) {
                                    ouput += lineToTranspot[currentIndex] + lineToTranspot[currentIndex + 1] + lineToTranspot[currentIndex + 2];
                                    offsetFromCurrentIndex = 3;
                                 } else {
                                    if (lineToTranspot[currentIndex] == 'd' && lineToTranspot[currentIndex + 1] == 'i') {
                                       ouput += lineToTranspot[currentIndex] + lineToTranspot[currentIndex + 1] + lineToTranspot[currentIndex + 2];
                                       offsetFromCurrentIndex = 3;
                                    } else {
                                       if (lineToTranspot[currentIndex]['toLowerCase']() == 'a' && lineToTranspot[currentIndex + 1]['toLowerCase']() == 'j') {
                                          ouput += lineToTranspot[currentIndex];
                                       } else {
                                          ouput += self['transposeChord'](lineToTranspot[currentIndex], transposeInterval, isEnarmonic);
                                       }
                                    }
                                 }
                              }
                           }
                        }
                     }
                  }
               } else {
                  ouput += lineToTranspot[currentIndex];
               }
            }
            offsetFromCurrentIndex--;
         }
      }

      return ouput;
   },
   transposeChord: function (tone, transposeInterval, isEnharmonic) {
      var transposedNote = '',
         notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'],
         index = 0,
         shiftedIndex;
      index = notes['indexOf'](tone['toUpperCase']());
      if (transposeInterval < 0) {
         shiftedIndex = transposeInterval + 12;
         if (index + transposeInterval < 0) {
            transposedNote = notes[index + shiftedIndex];
         } else {
            transposedNote = notes[index + transposeInterval];
         }
      } else {
         shiftedIndex = transposeInterval - 12;
         if (index + transposeInterval > 11) {
            transposedNote = notes[index + shiftedIndex];
         } else {
            transposedNote = notes[index + transposeInterval];
         }
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
   flatToSharp: function (tone) {
      switch (tone['toLowerCase']()) {
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
            break;
      }
      return "?";
   },
   getSampleSong: function () {
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
