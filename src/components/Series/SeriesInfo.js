import { makeStyles, Button, Divider, Typography } from '@material-ui/core';
import noImage from '../../images/no-image.jpeg';

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


const SeriesInfo = (props) => {
  const classes = useStyles();
  // const regex = /(<([^>]+)>)/gi;
  const series = props.series;

  const renderButton = (url) => {
    return <Button className={classes.link} variant="contained" key={url.type}><a href={url.url} target='_blank' rel="noreferrer">{url.type}</a></Button>
  }

  let button = series.urls && series.urls.map((url) => { return renderButton(url)})

  return (
    <>
      <Typography className={classes.titleHead} color='textPrimary' variant='h6' component='h1'>
          {series.title || 'N/A'}
      </Typography>
      <br/>
      <img
        className={classes.media}
        src={series.thumbnail && series.thumbnail.path ?
          `${series.thumbnail.path}/portrait_uncanny.${series.thumbnail.extension}`: noImage}
          alt={series.title}
          />
          <br/>
          <br/>
      <Divider />
      <br/>
      <Typography color='textPrimary' variant='body2'>
        {series.description || 'N/A'}
      </Typography>
          <br/>
      <Divider />
<br/>
      <Typography color='textPrimary' variant='body2'>
        Started in {series.startYear || 'N/A'}
      </Typography>
      <Typography color='textPrimary' variant='body2'>
        Stories Count: {(series.stories && series.stories.available) || 'N/A'}
      </Typography>

      <Typography color='textPrimary' variant='body2'>
        Comics Count: {(series.comics && series.comics.available) || 'N/A'}
      </Typography>
      <br/>
      <Divider />
      <br/>
      {button}
    </>
  );
}

export default SeriesInfo;
