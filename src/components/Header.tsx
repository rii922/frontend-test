import * as React from 'react';
import { SxProps, Theme, AppBar, Toolbar, Typography } from '@mui/material';

interface HeaderProps {
  title: string;
  sx?: SxProps<Theme>;
}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <AppBar position="static" sx={props.sx}>
      <Toolbar>
        <Typography variant="h4" component="h1">
          {props.title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
