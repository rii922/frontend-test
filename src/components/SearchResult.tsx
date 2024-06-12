import * as React from 'react';
import * as Recoil from 'recoil';
import { Link } from 'react-router-dom';
import {
  Box,
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
  Button,
  Pagination,
  CircularProgress,
} from '@mui/material';
import { KeyboardArrowRight } from '@mui/icons-material';
import { pageState } from '../states/PageState';
import { dataSelector } from '../states/ResponseState';
import { loadingState } from '../states/LoadingState';

interface SearchResultProps {
  sx?: SxProps<Theme>;
}

const formatDate = (date: string) => {
  const match = date.match(/^(\d+)-(\d+)-(\d+)T(\d+):(\d+):(\d+)\+(\d+):(\d+)$/);
  return match === null ? date : `${match[1]}年${match[2]}月${match[3]}日`;
};

export const scrollSearchResultToTop = () => {
  const container = document.getElementById('search_result_table_container');
  if (container) {
    container.scrollTop = 0;
    container.scrollLeft = 0;
  }
};

const SearchResult: React.FC<SearchResultProps> = (props) => {
  const [, setPage] = Recoil.useRecoilState(pageState);
  const data = Recoil.useRecoilValue(dataSelector);
  const loading = Recoil.useRecoilValue(loadingState);

  return (
    <Box sx={[{ display: 'flex', flexDirection: 'column' }, ...(Array.isArray(props.sx) ? props.sx : [props.sx])]}>
      <TableContainer
        id="search_result_table_container"
        component={Paper}
        elevation={4}
        sx={{ position: 'relative', flex: 1, overflow: 'auto', mb: 3 }}
      >
        <Table stickyHeader sx={{ zIndex: 0, position: 'absolute', top: 0, left: 0 }}>
          <TableHead sx={{ '& tr th': { fontWeight: 'bold' } }}>
            <TableRow>
              <TableCell sx={{ minWidth: 400 }}>タイトル</TableCell>
              <TableCell sx={{ minWidth: 400 }}>タグ</TableCell>
              <TableCell sx={{ minWidth: 150 }}>最終更新日</TableCell>
              <TableCell sx={{ minWidth: 150 }}>投稿日</TableCell>
              <TableCell sx={{ width: 'auto' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((article) => {
              return (
                <TableRow key={article.id}>
                  <TableCell sx={{ '& a': { color: 'primary.main' } }}>
                    <Link to={`/${article.id}`}>{article.title}</Link>
                  </TableCell>
                  <TableCell>
                    {article.tags.map((tag) => {
                      return <Chip key={tag.name} label={tag.name} sx={{ m: 0.5 }} />;
                    })}
                  </TableCell>
                  <TableCell>{formatDate(article.updated_at)}</TableCell>
                  <TableCell>{formatDate(article.created_at)}</TableCell>
                  <TableCell>
                    <Link to={`/${article.id}`}>
                      <Button
                        variant="outlined"
                        color="primary"
                        endIcon={<KeyboardArrowRight />}
                        sx={{ whiteSpace: 'nowrap' }}
                      >
                        記事を読む
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {loading && (
          <Box sx={{ zIndex: 1, position: 'sticky', top: 0, left: 0, width: '100%', height: '100%' }}>
            <Box
              component="span"
              sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            >
              <CircularProgress />
            </Box>
          </Box>
        )}
      </TableContainer>
      <Pagination
        color="primary"
        boundaryCount={0}
        siblingCount={3}
        count={data === null ? 0 : 100}
        sx={{ '& .MuiPagination-ul': { justifyContent: 'center' } }}
        onChange={(_, newPage) => {
          setPage(newPage);
        }}
      />
    </Box>
  );
};

export default SearchResult;
