import { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Health } from './pages/Health';
import { About } from './pages/About';
import { useTheme } from './hooks/useTheme';

type Page = 'home' | 'health' | 'about';

function App() {
  const { theme, toggleTheme } = useTheme();
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'health':
        return <Health />;
      case 'about':
        return <About />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors flex flex-col">
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        currentPage={currentPage}
        onNavigate={(page) => setCurrentPage(page as Page)}
      />
      <main className="flex-grow">{renderPage()}</main>
      <Footer />
    </div>
  );
}

export default App;
