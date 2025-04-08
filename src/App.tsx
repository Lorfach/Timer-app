import './App.css'
import List_section from './Components/List_section/List_section'
import { List_Provider } from './Components/Timer_list_context/Timer_list_context'
import Timer_section from './Components/Timer_section/Timer_section'

function App() {

  return (
    <>
      <div className='w-screen h-screen flex'>
        
        <List_Provider>
          <Timer_section/>
          <List_section/>
        </List_Provider>
      </div>
    </>
  )
}

export default App
