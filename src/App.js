import AppRouter from "router"
import { QueryClientProvider, QueryClient } from 'react-query'

const App = () => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  )
}

export default App