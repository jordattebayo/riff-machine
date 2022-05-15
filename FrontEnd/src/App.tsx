import { useEffect, useState } from 'react'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { Layout } from './Layout'
import { TodoListApp } from './TodoList'
import { Home } from './Home'
import { ReactQueryDevtools } from 'react-query/devtools'
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

const queryClient = new QueryClient()

function App() {

  const [isLocal, setIsLocal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [riffSelected, setSelectedRiff] = useState({});

  useEffect(() => {
    if(window){
      if(window.location.hostname == "localhost"){
        setIsLocal(true);
        console.log("running on localhost")
      }
    }
  },[isLocal])

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Layout riffSelected={riffSelected} setRiffSelected={setSelectedRiff} showModal={showModal} setShowModal={setShowModal} />}>
          <Route index element={<Home setModal={setShowModal} riffSelected={riffSelected} setRiffSelected={setSelectedRiff} />} />
          <Route path="/todo" element={ isLocal ? <TodoListApp /> : <Navigate to="/"  replace/>} /> 
        </Route>
      </Routes>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
