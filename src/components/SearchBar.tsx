import * as React from 'react';
import * as Recoil from 'recoil';
import axios, { AxiosError } from 'axios';
import { SxProps, Theme, Paper, InputBase, Tooltip, IconButton, Divider } from '@mui/material';
import { SearchOutlined, KeyOutlined } from '@mui/icons-material';
import APIKeyDialog from './APIKeyDialog';
import ErrorMessage from './ErrorMessage';
import { APIKeyState } from '../states/APIKeyState';
import { queryState } from '../states/QueryState';
import { dataState } from '../states/DataState';
import { loadingState } from '../states/LoadingState';

interface SearchBarProps {
  sx?: SxProps<Theme>;
}

const SearchBar: React.FC<SearchBarProps> = (props) => {
  const [query, setQuery] = Recoil.useRecoilState(queryState);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const searchInputElement = React.useRef<HTMLInputElement>(null);
  const APIKey = Recoil.useRecoilValue(APIKeyState);
  const [invalidAPIKey, setInvalidAPIKey] = React.useState(false);
  const [, setData] = Recoil.useRecoilState(dataState);
  const [, setLoading] = Recoil.useRecoilState(loadingState);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.nativeEvent.isComposing) {
      event.currentTarget.blur();
      handleSearch();
    }
  };
  const handleSearch = () => {
    const newQuery = searchInputElement.current!.value;
    setQuery(newQuery);
    if (APIKey === '' || invalidAPIKey) {
      return;
    }
    setLoading(true);
    axios
      .get('https://qiita.com/api/v2/items', {
        headers: { Authorization: `Bearer ${APIKey}` },
        params: { query: newQuery },
      })
      .then((response) => {
        setInvalidAPIKey(false);
        setData(response.data);
      })
      .catch((error: AxiosError) => {
        if (error.response?.status === 401) {
          setInvalidAPIKey(true);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setInvalidAPIKey(false);
    setDialogOpen(false);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <Paper
        component="form"
        elevation={4}
        sx={[
          { display: 'flex', alignItems: 'center', pl: 2, pr: 1 },
          ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
        ]}
        onSubmit={handleSubmit}
      >
        <InputBase
          id="search-input"
          name="search-input"
          defaultValue={query}
          inputRef={searchInputElement}
          placeholder="Search..."
          sx={{ flex: 1, py: 1 }}
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
