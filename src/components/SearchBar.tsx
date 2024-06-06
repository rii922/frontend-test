import * as React from 'react';
import * as Recoil from 'recoil';
import axios, { AxiosError } from 'axios';
import { Paper, InputBase, Tooltip, IconButton, Divider } from '@mui/material';
import { SearchOutlined, KeyOutlined } from '@mui/icons-material';
import APIKeyDialog from './APIKeyDialog';
import ErrorMessage from './ErrorMessage';
import { APIKeyState } from '../states/APIKeyState';
import { queryState } from '../states/QueryState';
import { dataState } from '../states/DataState';

const SearchBar: React.FC = () => {
  const [query, setQuery] = Recoil.useRecoilState(queryState);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const searchInputElement = React.useRef<HTMLInputElement>(null);
  const APIKey = Recoil.useRecoilValue(APIKeyState);
  const [invalidAPIKey, setInvalidAPIKey] = React.useState(false);
  const [, setData] = Recoil.useRecoilState(dataState);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.nativeEvent.isComposing) {
      handleSearch();
      event.currentTarget.blur();
    }
  };
  const handleSearch = () => {
    const newQuery = searchInputElement.current!.value;
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
  React.useEffect(() => {
    if (APIKey === '') {
      return;
    }
    axios
      .get('https://qiita.com/api/v2/items', {
        headers: { Authorization: `Bearer ${APIKey}` },
        params: { query: query },
      })
      .then((response) => {
        setInvalidAPIKey(false);
        setData(response.data);
      })
      .catch((error: AxiosError) => {
        if (error.response?.status === 401) {
          setInvalidAPIKey(true);
        }
      });
  }, [query]);

  return (
    <>
      <Paper component="form" sx={{ display: 'flex', alignItems: 'center', pl: 2, pr: 1 }} onSubmit={handleSubmit}>
        <InputBase
          id="search-input"
          name="search-input"
          defaultValue={query}
          inputRef={searchInputElement}
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
      {APIKey === '' && <ErrorMessage content="APIキーを入力してください" />}
      {invalidAPIKey && <ErrorMessage content="APIキーが正しくありません" />}
    </>
  );
};

export default SearchBar;
