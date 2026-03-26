import CircuitBackground from "./CircuitBackground";
import Portfolio from "./Portfolio";

function App() {
  return (
    <>
      <CircuitBackground />
      <div className="relative z-10">
        <Portfolio />
      </div>
    </>
  )
}

export default App
