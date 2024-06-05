import * as React from 'react';
import * as Recoil from 'recoil';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  InputAdornment,
  IconButton,
  DialogActions,
  Button,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { APIKeyState } from '../states/APIKeyState';

interface Props {
  open: boolean;
  handleClose: () => void;
}

const APIKeyDialog: React.FC<Props> = (props) => {
  const [showAPIKey, setShowAPIKey] = React.useState(false);
  const [APIKey, setAPIKey] = Recoil.useRecoilState(APIKeyState);
  const handleClickShowAPIKey = () => {
    setShowAPIKey((show) => !show);
  };
  const handleMouseDownShowAPIKey = (event: React.MouseEvent) => {
    event.preventDefault();
  };
  const handleExited = () => {
    setShowAPIKey(false);
  };
  const handleClose = () => {
    const newAPIKey = (document.getElementById('apikey-input') as HTMLInputElement).value;
    setAPIKey(newAPIKey);
    props.handleClose();
  };

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      disableRestoreFocus
      TransitionProps={{ onExited: handleExited }}
    >
      <DialogTitle>Qiita APIキーを設定</DialogTitle>
      <DialogContent>
        <TextField
          type={showAPIKey ? 'text' : 'password'}
          id="apikey-input"
          name="apikey-input"
          defaultValue={APIKey}
          autoFocus
          fullWidth
          variant="filled"
          label="APIキー"
          sx={{ my: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowAPIKey} onMouseDown={handleMouseDownShowAPIKey}>
                  {showAPIKey ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <DialogActions>
          <Button onClick={handleClose}>閉じる</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default APIKeyDialog;
