import HomePage from './Pages/HomePage';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <HomePage />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2500,
          style: {
            borderRadius: '10px',
            fontSize: '15px',
            padding: '14px 18px',
            fontWeight: '500',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.12)',
            minWidth: '280px',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#ffffff',
            },
          },
        }}
      />
    </>
  );
}

export default App;
