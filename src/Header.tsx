import * as React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

interface Props {
  title: string;
}

const Header: React.FC<Props> = (props) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h4" component="h1">
          {props.title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
