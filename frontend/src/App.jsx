import Landing from '@/pages/Landing'
import { InsuranceProvider } from '@/Context/InsuranceContext';

function App() {
  return (
    <>
      <InsuranceProvider>
        <Landing />
      </InsuranceProvider>
    </>
  )
}

export default App
