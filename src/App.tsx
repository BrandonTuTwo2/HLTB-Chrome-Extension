import './App.css'
import {useState} from 'react';
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeProvider } from "@/components/theme-provider"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


//import { HowLongToBeatService, HowLongToBeatEntry } from 'howlongtobeat';
function App() {
  const [imgSrc, setImgSrc] = useState('');
  const [resultDisplay, setResultDisplay] = useState('none')
  const [imgLink, setImgLink] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [displayMain, setDisplayMain] = useState('');
  const [displayMainExtra, setDisplayMainExtra] = useState('');
  const [displayCompletionist, setDisplayCompletionist] = useState('');
  return (
    <>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <form method="post" onSubmit={ async (event) => {
        event.preventDefault();
        const target =  event.target as typeof event.target & {
          name: {value: string};
        };
        const response = await fetch('https://hltb-extension-server.netlify.app/.netlify/functions/hltb-extension-server',{
          method: 'POST',
          body: JSON.stringify({
            name: target.name.value
          })
        }).then(response => response.json())
        const gameName = response.name;
        const imgURL = response.imageUrl;
        const mainTime = response.gameplayMain;
        const mainExtraTime = response.gameplayMainExtra;
        const completionistTime = response.gameplayCompletionist;
        const gameLink = `https://howlongtobeat.com/game/${response.id}`
        if(document.getElementById('gameImage')) {
          setImgSrc(imgURL); 
          setResultDisplay("inline"); 
          setImgLink(gameLink); 
          setDisplayName(gameName);
          setDisplayMain(mainTime);
          setDisplayMainExtra(mainExtraTime);
          setDisplayCompletionist(completionistTime);
        }
      }}>
        <div className="grid w-full max-w-sm items-center gap-1.5 pb-10">
          <Label >How Long To Beat?</Label >
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input name="name" placeholder="Dave the Diver" />
            <Button type="submit">Search</Button>
            <Button type="reset"  variant="destructive">Reset</Button>
          </div>
        </div>
      </form>
      <div style={{display: resultDisplay}}>
        <a href={imgLink} target="_blank"><img id="gameImage" className="mx-auto" src={imgSrc} alt="Game image"/></a>
        <Table>
          <TableCaption>Game Duration</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Game</TableHead>
              <TableHead>Main Story</TableHead>
              <TableHead>Main Story + Side Content</TableHead>
              <TableHead className="text-right">Completionist</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">{displayName}</TableCell>
              <TableCell>{displayMain}</TableCell>
              <TableCell>{displayMainExtra}</TableCell>
              <TableCell className="text-right">{displayCompletionist}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </ThemeProvider>
    </>
  )
}

export default App
