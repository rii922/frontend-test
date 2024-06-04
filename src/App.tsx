import './App.css';
import { CssBaseline, Container } from '@mui/material';
import Header from './Header';
import SearchBar from './SearchBar';

function App() {
  return (
    <>
      <CssBaseline />
      <Header title="Qiita 記事検索" />
      <Container maxWidth="lg">
        <SearchBar />
      </Container>
    </>
  );
}

export default App;
