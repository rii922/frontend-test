import * as React from 'react';
import Header from './Header';
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';

const SearchPage: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh' }}>
      <Header title="Qiita 記事検索" sx={{ mb: 3 }} />
      <SearchBar sx={{ mx: 3 }} />
      <SearchResult sx={{ p: 3, flex: 1 }} />
    </div>
  );
};

export default SearchPage;