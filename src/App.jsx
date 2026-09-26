import React, { useState } from 'react';
import './App.css';

import TopBar from './components/TopBar';
import Header from './components/Header';
import Navbar from './components/Navbar';
import ArticleContent from './components/ArticleContent';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import LaSoTuVi from './components/LaSoTuVi';
import BoiKieu from './components/BoiKieu';

function App() {
  const [currentView, setCurrentView] = useState('article'); // 'article' | 'laso' | 'boikieu'

  const handleNavigate = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderMain = () => {
    if (currentView === 'laso') return <LaSoTuVi />;
    if (currentView === 'boikieu') return <BoiKieu />;
    return (
      <div className="content-wrapper">
        <ArticleContent />
        <Sidebar />
      </div>
    );
  };

  return (
    <div className="app">
      <TopBar />
      <Header onNavigate={handleNavigate} />
      <Navbar onNavigate={handleNavigate} currentView={currentView} />

      <main className="main-content">{renderMain()}</main>

      <Footer />
    </div>
  );
}

export default App;
