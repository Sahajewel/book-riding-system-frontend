import { Outlet } from "react-router"
import ComponentLayout from "./components/layout/ComponentLayout"



function App() {


  return (
    <div>
      <ComponentLayout>
        <Outlet></Outlet>
      </ComponentLayout>
    </div>
  )
}

export default App
