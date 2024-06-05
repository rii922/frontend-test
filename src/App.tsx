import * as React from 'react';
import * as Recoil from 'recoil';
import './App.css';
import { CssBaseline, Container } from '@mui/material';
import Header from './components/Header';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <Recoil.RecoilRoot>
      <CssBaseline />
      <Header title="Qiita 記事検索" />
      <Container maxWidth="lg">
        <SearchBar />
      </Container>
    </Recoil.RecoilRoot>
  );
}

export default App;
