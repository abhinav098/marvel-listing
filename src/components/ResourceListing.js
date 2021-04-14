import axios from 'axios';
import { indexMarvel } from '../generateMarvelURL';
import { useEffect, useState } from 'react';
import CharacterCard from './Characters/CharacterCard';
import ComicCard from './Comics/ComicCard';
import SeriesCard from './Series/SeriesCard';
import { useHistory } from "react-router-dom";
import { Pagination } from '@material-ui/lab';

import {
  Grid,
  makeStyles,
  TextField,
} from '@material-ui/core';

import '../App.css';

import { styles } from '../cardStyle';

const {perPage, marvelPublicKey, marvelPrivateKey} = require('../config');
const useStyles = makeStyles(styles);

const ResourceListing = (props) => {
  const classes = useStyles();
  const resource = props.resource;
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [resourceData, setResourceData] = useState(undefined);
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ searchData, setSearchData ] = useState(undefined);
  const [ warning, setWarning ] = useState('');
  let card = null;
  const totalPages = Math.ceil(total/perPage);
	let currentPageText = null;

  useEffect(() => {
    if (totalPages > 0 && page > totalPages) {
      redirectToNotFound();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPages, page]);

  useEffect(() => {
    async function fetchData() {
			try {
        setWarning('');
        let pagenum = parseInt(props.match.params.page, 10);
        if (Number.isNaN(pagenum)) {
          redirectToNotFound();
        }else{
          setPage(pagenum);
          setLoading(true);
          const options = {
            publicKey: marvelPublicKey,
            privateKey: marvelPrivateKey,
            limit: perPage,
            offset: (pagenum - 1) * perPage,
          }
          const { data } = await axios.get(indexMarvel( resource, options));
          setTotal(data.data.total);
          setResourceData(data.data.results);
        }
			} catch (e) {
        redirectToNotFound();
				console.log(e);
			} finally {
				setLoading(false);
			}
		}
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.match.params.page, resource])

  useEffect(
		() => {
			async function fetchData() {
				try {
          setWarning('');
          if (searchTerm.trim().length >= 3) {
            let searchAttr = resource === 'characters' ? 'nameStartsWith' : 'titleStartsWith';
            const options = {
              publicKey: marvelPublicKey,
              privateKey: marvelPrivateKey,
              searchAttr,
              searchTerm,
              limit: perPage
            }
            const { data } = await axios.get(indexMarvel(resource, options));
            if(data.data.results.length){
              setSearchData(data.data.results);
            } else {
              setSearchData(undefined);
              setWarning('No results found');
            }
          } else {
            setWarning('Enter atleast 3 characters');
          }
				} catch (e) {
					console.log(e);
          redirectToNotFound();
				} finally {
          setLoading(false);
        }
			}
      if(searchTerm) {
        setTimeout(() => {
          fetchData();
        }, 200);
      } else {
        setSearchData(undefined);
      }
		},
    // eslint-disable-next-line react-hooks/exhaustive-deps
		[ searchTerm, resource ]
	);

  const recordCountMessage = () => {
    const from = ((page - 1) * perPage) + 1;
    let to = (page)* perPage;
    if (page === totalPages) {
      to = total;
    }
    return <>Showing page <strong>{page}</strong> of {totalPages}, ({from} - {to}) of {(total)} records!</>;
  };

  currentPageText = recordCountMessage();
  const history = useHistory();

  const redirectToNotFound = () => {
    history.push('/404');
  };

  const handleChange = (event, value) => {
    let path = `/${resource}/page/${value}`;
    history.push(path);
  };

  const handleSearchChange = async (e) => {
    setSearchTerm(e.target.value)
  };

  const buildCard = (record) => {
		let card;
    switch (resource) {
      case 'comics':
        card = <ComicCard comic={record} key={record.id} />
        break;
      case 'characters':
        card = <CharacterCard character={record} key={record.id} />
        break;
      case 'series':
        card = <SeriesCard series={record} key={record.id} />
        break;
      default:
    }
    return card;
	};

  if(searchData){
    card = searchData && searchData.map((record) => {
      return buildCard(record);
    });
  } else {
    card = resourceData && resourceData.map((record) => {
      return buildCard(record);
    });
  }

  if (loading) {
    return(
      <div>
        <h1>{resource.toUpperCase()}</h1>
        <p>Loading ...</p>
      </div>
    )
  } else {
    return (
      <div>
        <h1>{resource.toUpperCase()}</h1>
        <TextField
          error={warning.length>0}
          id="outlined-basic"
          autoComplete="off"
          type="search"
          size="small"
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          helperText={warning}/>
        <br/>
        <br/>
        {
          searchData
          ? ''
          : <Grid container className={classes.grid} spacing={2}>
              <Grid item xs={5}>
                <span>{currentPageText}</span>
              </Grid>
              <Grid item xs={1}>
              </Grid>
              <Grid item xs={6}>
                <Pagination
                    count={totalPages}
                    shape="rounded"
                    defaultPage={0}
                    page={page}
                    showFirstButton
                    showLastButton
                    variant='text'
                    color="primary"
                    boundaryCount={2}
                    onChange={handleChange} />
              </Grid>
            </Grid>
          }
        <br/>
        <br/>
        <Grid container className={classes.grid} spacing={5}>
          {card}
        </Grid>
      </div>
    )
  }
}

export default ResourceListing;
