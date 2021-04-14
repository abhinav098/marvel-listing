import React from 'react';
import { NavLink } from 'react-router-dom';
import { createMuiTheme, Button,  makeStyles, ThemeProvider, Paper} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import bgImage from '../images/home-bg.jpeg';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      marginLeft: theme.spacing(8),
      marginTop: 'unset',
      marginRight: theme.spacing(8),
      color: '#fff',
      padding: '25em 5em 1em 5em',
      backgroundImage: `url(${bgImage})`
    },
  },
  textBackground: {
    backgroundColor: '#16173e',
    padding: '10px'
  },
  button: {
    'margin-right': '10px',
    'text-decoration': 'none'
  },
}));

const theme = createMuiTheme({
  palette: {
    secondary: green,
  },
});

const Home = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper variant="outlined" >
        <div className={classes.textBackground}>
          <h1>Welcome to the world's greatest comics !</h1>
          <p>
            Marvel Entertainment, LLC, a wholly-owned subsidiary of The Walt Disney Company, is one of the world's most prominent character-based entertainment companies, built on a proven library of more than 8,000 characters featured in a variety of media over seventy-five years. Marvel utilizes its character franchises in entertainment, licensing and publishing. For more information visit marvel.com. © 2020 MARVEL
          </p>

          <NavLink className={classes.button} activeClassName="active" to='/comics/page/1'>
            <Button variant="contained">
              Comics
            </Button>
          </NavLink>
          <NavLink className={classes.button} activeClassName="active" to='/characters/page/1'>
            <ThemeProvider theme={theme}>
              <Button variant="contained" color="secondary" className={classes.button}>
                Characters
              </Button>
            </ThemeProvider>
          </NavLink>
          <NavLink className={classes.button} activeClassName="active" to='/series/page/1'>
            <Button variant="contained" color="primary">
              Series
            </Button>
          </NavLink>
        </div>
      </Paper>

    </div>
  );
};

export default Home;
