import * as React from 'react';
import * as Recoil from 'recoil';
import axios, { AxiosError } from 'axios';
import { Box, Button, Paper, CircularProgress } from '@mui/material';
import { KeyboardArrowLeft } from '@mui/icons-material';
import { useParams, Link } from 'react-router-dom';
import Header from './Header';
import ErrorMessage from './ErrorMessage';
import { APIKeyState } from '../states/APIKeyState';

const ArticlePage: React.FC = () => {
  const params = useParams();
  const [loading, setLoading] = React.useState(false);
  const [invalidAPIKey, setInvalidAPIKey] = React.useState(false);
  const APIKey = Recoil.useRecoilValue(APIKeyState);
  const [article, setArticle] = React.useState<string | null>(null);
  React.useEffect(() => {
    if (APIKey === '') {
      return;
    }
    setLoading(true);
    axios
      .get(`https://qiita.com/api/v2/items/${params.id}`, {
        headers: { Authorization: `Bearer ${APIKey}` },
      })
      .then((response) => {
        setArticle(response?.data?.rendered_body);
      })
      .catch((error: AxiosError) => {
        if (error.response?.status === 401) {
          setInvalidAPIKey(true);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh' }}>
      <Header title="Qiita 記事詳細" sx={{ mb: 3 }} />
      <Box sx={{ mx: 3, mb: 3 }}>
        <Link to="/">
          <Button variant="outlined" color="primary" startIcon={<KeyboardArrowLeft />}>
            記事検索に戻る
          </Button>
        </Link>
      </Box>
      {APIKey === '' && <ErrorMessage content="APIキーを入力してください" />}
      {invalidAPIKey && <ErrorMessage content="APIキーが正しくありません" />}
      <Paper elevation={6} sx={{ position: 'relative', flex: 1, overflow: 'auto', mx: 3, mb: 3 }}>
        <Box
          dangerouslySetInnerHTML={{ __html: article ?? '' }}
          sx={{ zIndex: 0, position: 'absolute', top: 0, left: 0, p: 3 }}
        />
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
      </Paper>
    </div>
  );
};

export default ArticlePage;
