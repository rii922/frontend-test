import * as React from 'react';
import { Paper, InputBase, Tooltip, IconButton, Divider } from '@mui/material';
import { SearchOutlined, KeyOutlined } from '@mui/icons-material';

const SearchBar: React.FC = () => {
  return (
    <Paper component="form" sx={{ display: 'flex', alignItems: 'center', pl: 2, pr: 1 }}>
      <InputBase placeholder="Search..." sx={{ flex: 1, my: 1 }} />
      <Tooltip title="検索">
        <IconButton aria-label="search" sx={{ p: 1 }}>
          <SearchOutlined />
        </IconButton>
      </Tooltip>
      <Divider orientation="vertical" flexItem sx={{ m: 1 }} />
      <Tooltip title="APIトークンを設定">
        <IconButton aria-label="search" color="primary" sx={{ p: 1 }}>
          <KeyOutlined />
        </IconButton>
      </Tooltip>
    </Paper>
  );
};

export default SearchBar;
