import * as React from 'react';
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

interface Props {
  open: boolean;
  handleClose: () => void;
}

const APIKeyDialog: React.FC<Props> = (props) => {
  const [showAPIKey, setShowAPIKey] = React.useState(false);
  const handleClickShowAPIKey = () => {
    setShowAPIKey((show) => !show);
  };
  const handleMouseDownShowAPIKey = (event: React.MouseEvent) => {
    event.preventDefault();
  };
  const hideAPIKey = () => {
    setShowAPIKey(false);
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      maxWidth="xs"
      fullWidth
      disableRestoreFocus
      TransitionProps={{ onExited: hideAPIKey }}
    >
      <DialogTitle>Qiita APIキーを設定</DialogTitle>
      <DialogContent>
        <TextField
          type={showAPIKey ? 'text' : 'password'}
          id="apikey"
          name="apikey"
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
          <Button onClick={props.handleClose}>閉じる</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default APIKeyDialog;
