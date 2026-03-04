import './App.css'
import MyComponent from './MyComponent'
import AuthContext from './creatContext';

function App() {

  const username = 'kim0';

  
  return (
    
      <AuthContext.Provider value={username}>
      <MyComponent />
      </AuthContext>
  )
}

export default App
