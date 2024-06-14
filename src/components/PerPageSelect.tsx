import * as React from 'react';
import * as Recoil from 'recoil';
import { SxProps, Theme, Box, FormControl, InputLabel, Select, SelectChangeEvent, MenuItem } from '@mui/material';
import { perPageState } from '../states/PerPageState';

interface PerPageSelectProps {
  sx?: SxProps<Theme>;
}

const PerPageSelect: React.FC<PerPageSelectProps> = (props) => {
  const [perPage, setPerPage] = Recoil.useRecoilState(perPageState);
  const handleChange = (event: SelectChangeEvent) => {
    setPerPage(Number(event.target.value));
  };

  return (
    <Box sx={[{ display: 'flex', justifyContent: 'right' }, ...(Array.isArray(props.sx) ? props.sx : [props.sx])]}>
      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel id="per-page-select-label">1ページ表示数</InputLabel>
        <Select
          labelId="per-page-select-label"
          label="1ページの表示数"
          value={perPage.toString()}
          onChange={handleChange}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default PerPageSelect;
