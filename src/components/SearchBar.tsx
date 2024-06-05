import * as React from 'react';
import { Paper, InputBase, Tooltip, IconButton, Divider } from '@mui/material';
import { SearchOutlined, KeyOutlined } from '@mui/icons-material';
import APIKeyDialog from './APIKeyDialog';

const SearchBar: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Paper component="form" sx={{ display: 'flex', alignItems: 'center', pl: 2, pr: 1 }}>
        <InputBase placeholder="Search..." sx={{ flex: 1, my: 1 }} />
        <Tooltip title="検索">
          <IconButton aria-label="search" sx={{ p: 1 }}>
            <SearchOutlined />
          </IconButton>
        </Tooltip>
        <Divider orientation="vertical" flexItem sx={{ m: 1 }} />
        <Tooltip title="APIキーを設定">
          <IconButton onClick={handleOpen} aria-label="search" color="primary" sx={{ p: 1 }}>
            <KeyOutlined />
          </IconButton>
        </Tooltip>
      </Paper>
      <APIKeyDialog open={open} handleClose={handleClose} />
    </>
  );
};

export default SearchBar;
