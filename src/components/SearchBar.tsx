import * as React from 'react';
import * as Recoil from 'recoil';
import axios from 'axios';
import { Paper, InputBase, Tooltip, IconButton, Divider } from '@mui/material';
import { SearchOutlined, KeyOutlined } from '@mui/icons-material';
import APIKeyDialog from './APIKeyDialog';
import { APIKeyState } from '../states/APIKeyState';
import { queryState } from '../states/QueryState';

const SearchBar: React.FC = () => {
  const [query, setQuery] = Recoil.useRecoilState(queryState);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.nativeEvent.isComposing) {
      handleSearch();
      event.currentTarget.blur();
    }
  };
  const handleSearch = () => {
    const newQuery = (document.getElementById('search-input') as HTMLInputElement).value;
    setQuery(newQuery);
  };
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  const APIKey = Recoil.useRecoilValue(APIKeyState);
  React.useEffect(() => {
    if (APIKey === '') {
      return;
    }
    axios
      .get('https://qiita.com/api/v2/items', {
        headers: { Authorization: APIKey && `Bearer ${APIKey}` },
        params: { query: query },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [query]);

  return (
    <>
      <Paper component="form" sx={{ display: 'flex', alignItems: 'center', pl: 2, pr: 1 }} onSubmit={handleSubmit}>
        <InputBase
          id="search-input"
          name="search-input"
          defaultValue={query}
          placeholder="Search..."
          sx={{ flex: 1, my: 1 }}
          onKeyDown={handleKeyDown}
        />
        <Tooltip title="検索">
          <IconButton id="search-button" aria-label="search" sx={{ p: 1 }} onClick={handleSearch}>
            <SearchOutlined />
          </IconButton>
        </Tooltip>
        <Divider orientation="vertical" flexItem sx={{ m: 1 }} />
        <Tooltip title="APIキーを設定">
          <IconButton id="apikey-button" aria-label="search" color="primary" sx={{ p: 1 }} onClick={handleDialogOpen}>
            <KeyOutlined />
          </IconButton>
        </Tooltip>
      </Paper>
      <APIKeyDialog open={dialogOpen} handleClose={handleDialogClose} />
    </>
  );
};

export default SearchBar;
