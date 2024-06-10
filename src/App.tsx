import * as Recoil from 'recoil';
import './App.css';
import { CssBaseline } from '@mui/material';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import SearchResult from './components/SearchResult';

function App() {
  return (
    <Recoil.RecoilRoot>
      <CssBaseline />
      <div style={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh' }}>
        <Header title="Qiita 記事検索" sx={{ mb: 3 }} />
        <SearchBar sx={{ mx: 3 }} />
        <SearchResult sx={{ p: 3, flex: 1 }} />
      </div>
    </Recoil.RecoilRoot>
  );
}

export default App;
