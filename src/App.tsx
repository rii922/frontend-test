import * as Recoil from 'recoil';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MathJaxContext } from 'better-react-mathjax';
import './App.css';
import { CssBaseline } from '@mui/material';
import SearchPage from './components/SearchPage';
import ArticlePage from './components/ArticlePage';

function App() {
  const config = {
    tex: {
      inlineMath: [['$', '$']],
      displayMath: [['$$', '$$']],
    },
    options: {
      skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
  };

  return (
    <Recoil.RecoilRoot>
      <BrowserRouter basename="/frontend-test">
        <MathJaxContext config={config}>
          <CssBaseline />
          <Routes>
            <Route path="/" index element={<SearchPage />} />
            <Route path="/:id" element={<ArticlePage />} />
          </Routes>
        </MathJaxContext>
      </BrowserRouter>
    </Recoil.RecoilRoot>
  );
}

export default App;
