import * as React from 'react';
import * as Recoil from 'recoil';
import {
  SxProps,
  Theme,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from '@mui/material';
import { dataState } from '../states/DataState';

interface SearchResultProps {
  sx?: SxProps<Theme>;
}

const formatDate = (date: string) => {
  const match = date.match(/^(\d+)-(\d+)-(\d+)T(\d+):(\d+):(\d+)\+(\d+):(\d+)$/);
  return `${match![1]}年${match![2]}月${match![3]}日`;
};

const SearchResult: React.FC<SearchResultProps> = (props) => {
  const data = Recoil.useRecoilValue(dataState);

  return (
    data && (
      <TableContainer
        component={Paper}
        elevation={4}
        sx={[{ width: 'auto' }, ...(Array.isArray(props.sx) ? props.sx : [props.sx])]}
      >
        <Table stickyHeader sx={{ maxWidth: '100%' }}>
          <TableHead sx={{ '& tr th': { fontWeight: 'bold' } }}>
            <TableRow>
              <TableCell>タイトル</TableCell>
              <TableCell>タグ</TableCell>
              <TableCell>最終更新日</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((article) => {
              return (
                <TableRow key={article.id}>
                  <TableCell>{article.title}</TableCell>
                  <TableCell>
                    {article.tags.map((tag) => {
                      return <Chip key={tag.name} label={tag.name} sx={{ m: 0.5 }} />;
                    })}
                  </TableCell>
                  <TableCell>{formatDate(article.updated_at)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    )
  );
};

export default SearchResult;
