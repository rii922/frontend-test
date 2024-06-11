import * as Recoil from 'recoil';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { CssBaseline } from '@mui/material';
import SearchPage from './components/SearchPage';
import ArticlePage from './components/ArticlePage';

function App() {
  return (
    <Recoil.RecoilRoot>
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route path="/" index element={<SearchPage />} />
          <Route path="/:id" element={<ArticlePage />} />
        </Routes>
      </BrowserRouter>
    </Recoil.RecoilRoot>
  );
}

export default App;
