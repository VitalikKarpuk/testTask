import { useState } from "react";
import "./App.css";
import Button from "./components/atoms/button";
import ScheduleEditor from "./components/organisms/scheduleEditor";

function App() {
  const [iseOpen, setOpen] = useState(false);
  const handleModul = () => {
    setOpen(true);
  };

  const close = () => {
    setOpen(!iseOpen)
  }


  return (
    <div className="app">
      <header className="App-header"></header>
      <Button text={"open modal"} onClick={handleModul} />
      {iseOpen && <ScheduleEditor onClose={close}/>}
    </div>
  );
}

export default App;
