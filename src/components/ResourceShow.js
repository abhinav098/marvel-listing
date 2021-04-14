import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink, useHistory } from 'react-router-dom';
import { makeStyles, Grid, Fab } from '@material-ui/core';
import '../App.css';
import { indexMarvel } from '../generateMarvelURL';
import { ArrowBackIos as Back } from '@material-ui/icons';
import CharacterInfo from './Characters/CharacterInfo';
import ComicInfo from './Comics/ComicInfo';
import SeriesInfo from './Series/SeriesInfo';

const useStyles = makeStyles((theme) =>({
	titleHead: {
		borderBottom: '5px solid #1e8678',
		fontWeight: 'bold'
	},
	grid: {
		flexGrow: 1,
		flexDirection: 'row'
	},
	media: {
		height: '60%',
		width: '50%'
	},
	margin: {
    margin: theme.spacing(1),
  },
	root: {
    flexGrow: 1,
  },
}));

const {perPage, marvelPublicKey, marvelPrivateKey} = require('../config');


const ResourceShow = (props) => {
  const [ resourceData, setResourceData ] = useState(undefined);
	const [ loading, setLoading ] = useState(true);
	const classes = useStyles();
  const resource = props.resource;
  let info = null;

  useEffect(
		() => {
			console.log ("useEffect fired")
			async function fetchData() {
				try {
          let id = parseInt(props.match.params.id, 10);
          if (Number.isNaN(id)) {
            redirectToNotFound();
          } else {
            const { data } = await axios.get(
              indexMarvel(
                `${resource}/${props.match.params.id}`,
                {
                  publicKey: marvelPublicKey,
                  privateKey: marvelPrivateKey,
                  limit: perPage
                }
              )
            );
            setResourceData(data.data.results[0]);
          }
				} catch (e) {
          redirectToNotFound();
					console.log(e);

				} finally {
					setLoading(false);
				}
			}
			fetchData();
		},
    // eslint-disable-next-line react-hooks/exhaustive-deps
		[ props.match.params.id, resource ]
	);

  const resourceInfo = (record) => {
    let info;
    switch (resource) {
      case 'comics':
        info = <ComicInfo comic={record} />
        break;
      case 'characters':
        info = <CharacterInfo character={record} />
        break;
      case 'series':
        info = <SeriesInfo series={record} />
        break;
      default:
    }
    return info;
  }

  const history = useHistory();

  const redirectToNotFound = () => {
    history.push('/404');
  };


  info = resourceData ? resourceInfo(resourceData): null;

  if (loading) {
		return (
			<div>
				<h2>Loading....</h2>
			</div>
		);
	} else {
    return (
      <div className={classes.root}>
        <br/><br/>
        <Grid container>
          <Grid item xs={2}>
              <NavLink to={'/' + resource + '/page/1'} aria-label="back">
                <Fab className={classes.margin} size="medium" aria-label="back">
                  <Back />
                </Fab>
              </NavLink>
          </Grid>
          <Grid item xs={8}>
            {info}
          </Grid>
        </Grid>
    </div>
    );
  }
};

export default ResourceShow;
