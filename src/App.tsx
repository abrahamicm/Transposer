import type { CustomFlowbiteTheme } from 'flowbite-react';
import { Button, Flowbite, Label, Textarea } from 'flowbite-react';
import { Transposer } from './transposer';



const customTheme: CustomFlowbiteTheme = {


};

export default function App() {
  const notasNaturalesConSostenidos: string[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  // const notasNaturalesConBemoles: string[] = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
  return (
    <Flowbite theme={{ theme: customTheme }}>
      <div className="container mx-auto h-screen flex flex-col bg-gray-200 p-4 rounded-lg shadow-md">
        <div className="flex flex-wrap gap-2">
          <div>
            <Label>Nombre</Label>
            <Label>Nota</Label>
          </div>

          {notasNaturalesConSostenidos.map((nota, index) => (
            <Button key={index} color="gray" pill>
              {nota}
            </Button>
          ))}
        </div>
        <Textarea className="flex-grow resize-none" value="None Like You
F          Csus4        Dm
There is none like you
Bb        F                C7
No one else can touch my heart like you do
F      C         Dm        Bb
I can search for all eternity long
   Dmin        C       Bb    Fmaj
And find there is none like you" />
      </div>
    </Flowbite>
  );
}