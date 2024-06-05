import * as React from 'react';
import './App.css';
import { CssBaseline, Container } from '@mui/material';
import Header from './components/Header';
import SearchBar from './components/SearchBar';

export const APIKeyContext = React.createContext<[string, React.Dispatch<React.SetStateAction<string>>] | null>(null);

function App() {
  const [APIKey, setAPIKey] = React.useState('');

  return (
    <APIKeyContext.Provider value={[APIKey, setAPIKey]}>
      <CssBaseline />
      <Header title="Qiita 記事検索" />
      <Container maxWidth="lg">
        <SearchBar />
      </Container>
    </APIKeyContext.Provider>
  );
}

export default App;
