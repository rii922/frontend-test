import * as React from 'react';
import * as Recoil from 'recoil';
import axios, { AxiosError } from 'axios';
import { setupCache, CacheAxiosResponse } from 'axios-cache-interceptor';
import { SxProps, Theme, Paper, InputBase, Tooltip, IconButton, Divider } from '@mui/material';
import { SearchOutlined, KeyOutlined } from '@mui/icons-material';
import APIKeyDialog from './APIKeyDialog';
import ErrorMessage from './ErrorMessage';
import { APIKeyState } from '../states/APIKeyState';
import { queryState } from '../states/QueryState';
import { pageState } from '../states/PageState';
import { perPageState } from '../states/PerPageState';
import { responseState } from '../states/ResponseState';
import { loadingState } from '../states/LoadingState';
import { QiitaResponseArticle } from '../states/ResponseState';
import { scrollSearchResultToTop } from './SearchResult';

const useIsMount = () => {
  const isMount = React.useRef(true);
  React.useEffect(() => {
    isMount.current = false;
  }, []);
  return isMount.current;
};

const useRerender = (effect: React.EffectCallback, deps?: React.DependencyList | undefined) => {
  const isMount = useIsMount();
  React.useEffect(() => {
    if (!isMount) {
      effect();
    }
  }, deps);
};

interface SearchBarProps {
  sx?: SxProps<Theme>;
}

const SearchBar: React.FC<SearchBarProps> = (props) => {
  const [query, setQuery] = Recoil.useRecoilState(queryState);
  const [page, setPage] = Recoil.useRecoilState(pageState);
  const perPage = Recoil.useRecoilValue(perPageState);
  const queryChanged = React.useRef(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const searchInputElement = React.useRef<HTMLInputElement>(null);
  const APIKey = Recoil.useRecoilValue(APIKeyState);
  const [invalidAPIKey, setInvalidAPIKey] = React.useState(false);
  const [, setResponse] = Recoil.useRecoilState(responseState);
  const [, setLoading] = Recoil.useRecoilState(loadingState);
  const api = setupCache(axios.create(), {});
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.nativeEvent.isComposing) {
      event.currentTarget.blur();
      handleSearch();
    }
  };
  const handleSearch = () => {
    const newQuery = searchInputElement.current!.value;
    setQuery(newQuery);
  };
  const search = (firstpage: boolean | undefined = false) => {
    if (APIKey === '' || invalidAPIKey || query === '') {
      return;
    }
    if (firstpage) {
      setPage(1);
    }
    setLoading(true);
    api
      .get('https://qiita.com/api/v2/items', {
        cache: {
          ttl: 1000 * 60 * 15,
          interpretHeader: false,
        },
        headers: { Authorization: `Bearer ${APIKey}` },
        params: { query: query, page: firstpage ? 1 : page, per_page: perPage },
      })
      .then((response: CacheAxiosResponse<QiitaResponseArticle[]>) => {
        setInvalidAPIKey(false);
        setResponse(response);
      })
      .catch((error: AxiosError) => {
        setResponse(null);
        if (error.response?.status === 401) {
          setInvalidAPIKey(true);
        }
      })
      .finally(() => {
        setLoading(false);
        queryChanged.current = false;
        scrollSearchResultToTop();
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
  useRerender(() => {
    if (queryChanged.current) {
      queryChanged.current = false;
      return;
    }
    search();
  }, [APIKey, page, perPage]);
  useRerender(() => {
    queryChanged.current = true;
    search(true);
  }, [query]);

  return (
    <>
      <Paper
        component="form"
        elevation={4}
        sx={[
          { display: 'flex', alignItems: 'center', pl: 2, pr: 1, mb: 3, '& .MuiInputBase-root': { py: 0 } },
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
          sx={{ flex: 1, '& .MuiInputBase-input': { py: 1.5 } }}
          onKeyDown={handleKeyDown}
        />
        <Tooltip title="検索">
          <IconButton id="search-button" aria-label="search" sx={{ p: 1 }} onClick={handleSearch}>
            <SearchOutlined />
          </IconButton>
        </Tooltip>
        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
        <Tooltip title="APIキーを設定">
          <IconButton id="apikey-button" aria-label="search" color="primary" sx={{ p: 1 }} onClick={handleDialogOpen}>
            <KeyOutlined />
          </IconButton>
        </Tooltip>
      </Paper>
      <APIKeyDialog open={dialogOpen} handleClose={handleDialogClose} />
      {APIKey === '' && <ErrorMessage content="APIキーを入力してください" sx={{ mb: 3 }} />}
      {invalidAPIKey && <ErrorMessage content="APIキーが正しくありません" sx={{ mb: 3 }} />}
    </>
  );
};

export default SearchBar;
