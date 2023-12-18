import './App.css'
//import { HowLongToBeatService, HowLongToBeatEntry } from 'howlongtobeat';
function App() {
  return (
    <>
      <h1>How Long To Beat</h1>
      <form method="post" onSubmit={ async (event) => {
            event.preventDefault();
            const resultOutput = document.getElementById('results')
            const target =  event.target as typeof event.target & {
              name: {value: string};
            };
            console.log(target.name.value);
            //const gameName = formData.get('name');
            const response = await fetch('https://hltb-extension-server.netlify.app/.netlify/functions/hltb-extension-server',{
              method: 'POST',
              body: JSON.stringify({
                name: target.name.value
              })
            })
              .then(response => response.json()
            )
            console.log(response)
            if(resultOutput) resultOutput.innerText = JSON.stringify(response)
    
      }}>
        <label>
          Name of the game: <input name="name" defaultValue="Dave the Diver" />
        </label>
        <button type="reset">Reset</button>
        <button type="submit">Search</button>
      </form>
      <div id="results"></div>
    </>
  )
}

export default App
