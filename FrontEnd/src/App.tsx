import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { Layout } from './Layout'
import { TodoListApp } from './TodoList'
import { Home } from './Home'
import { ReactQueryDevtools } from 'react-query/devtools'
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Routes >
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/todo" element={<TodoListApp />} />
        </Route>
      </Routes>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
