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
  return match === null ? date : `${match[1]}年${match[2]}月${match[3]}日`;
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
        <Table stickyHeader>
          <TableHead sx={{ '& tr th': { fontWeight: 'bold' } }}>
            <TableRow>
              <TableCell sx={{ minWidth: 400 }}>タイトル</TableCell>
              <TableCell sx={{ minWidth: 400 }}>タグ</TableCell>
              <TableCell sx={{ minWidth: 150 }}>最終更新日</TableCell>
              <TableCell sx={{ minWidth: 150 }}>投稿日</TableCell>
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
                  <TableCell>{formatDate(article.created_at)}</TableCell>
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
