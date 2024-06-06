import * as React from 'react';
import * as Recoil from 'recoil';
import { Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Chip } from '@mui/material';
import { dataState } from '../states/DataState';

const SearchResult: React.FC = () => {
  const data = Recoil.useRecoilValue(dataState);

  return (
    data && (
      <TableContainer component={Paper} sx={{ my: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>タイトル</TableCell>
              <TableCell>タグ</TableCell>
              <TableCell>最終更新日</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((article) => {
              return (
                <TableRow>
                  <TableCell>{article.title}</TableCell>
                  <TableCell>
                    {article.tags.map((tag) => {
                      return <Chip label={tag.name} sx={{ m: 0.5 }} />;
                    })}
                  </TableCell>
                  <TableCell>{article.updated_at}</TableCell>
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
