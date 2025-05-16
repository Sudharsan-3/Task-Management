import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from 'react';
import User from './User'; // Assuming your User component is in User.tsx

// Create a new QueryClient
const queryClient = new QueryClient();

const App = () => {
  return (
    // Wrap your application with QueryClientProvider
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <User /> 
      </React.StrictMode>
    </QueryClientProvider>
  );
};

export default App;
