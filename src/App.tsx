import { useState } from 'react';
import { Header } from './components/header';
import { AuthModal } from './components/auth-modal';
import { HomePage } from './components/home-page';
import { SearchPage } from './components/search-page';
import { UniversityProfile } from './components/university-profile';
import { universities } from './data/universities';

type Page = 'home' | 'search' | 'profile';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedUniversityId, setSelectedUniversityId] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState<string | undefined>(undefined);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const handleNavigateToSearch = (filter?: string) => {
    setSearchFilter(filter);
    setCurrentPage('search');
  };

  const handleNavigateToUniversity = (id: string) => {
    setSelectedUniversityId(id);
    setCurrentPage('profile');
  };

  const handleNavigateHome = () => {
    setCurrentPage('home');
    setSelectedUniversityId(null);
    setSearchFilter(undefined);
  };

  const handleBack = () => {
    if (currentPage === 'profile') {
      setCurrentPage('search');
      setSelectedUniversityId(null);
    } else if (currentPage === 'search') {
      setCurrentPage('home');
      setSearchFilter(undefined);
    }
  };

  const handleLoginClick = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  const handleRegisterClick = () => {
    setAuthMode('register');
    setShowAuthModal(true);
  };

  const handleSwitchAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'register' : 'login');
  };

  const selectedUniversity = selectedUniversityId 
    ? universities.find(u => u.id === selectedUniversityId)
    : null;

  return (
    <div className="min-h-screen">
      <Header 
        onLoginClick={handleLoginClick}
        onRegisterClick={handleRegisterClick}
        onNavigateHome={handleNavigateHome}
        currentPage={currentPage}
      />

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onSwitchMode={handleSwitchAuthMode}
      />

      {currentPage === 'home' && (
        <HomePage 
          onNavigateToSearch={handleNavigateToSearch}
          onNavigateToUniversity={handleNavigateToUniversity}
        />
      )}

      {currentPage === 'search' && (
        <SearchPage 
          onNavigateToUniversity={handleNavigateToUniversity}
          initialFilter={searchFilter}
        />
      )}

      {currentPage === 'profile' && selectedUniversity && (
        <UniversityProfile 
          university={selectedUniversity}
          onBack={handleBack}
          onNavigateHome={handleNavigateHome}
        />
      )}
    </div>
  );
}