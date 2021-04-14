import { makeStyles, Typography, Button, Divider } from '@material-ui/core';
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
  link: {
    color: '#fff',
    fontWeight: 'bold',
    marginRight: '10px'
  }
}));

const ComicInfo = (props) => {
  const classes = useStyles();
  const comic = props.comic;
  const renderButton = (url) => {
    return <Button className={classes.link} variant="contained" key={url.type}><a href={url.url} target='_blank' rel="noreferrer">{url.type}</a></Button>
  }

  const renderPrice = (price) => {
    return <p key={price.type}>{price.type}: {price.price}</p>
  }

  let button = comic.urls && comic.urls.map((url) => { return renderButton(url)})
  let price = comic.prices && comic.prices.map((price) => { return renderPrice(price)})

  return (
    <>
      <Typography className={classes.titleHead} color='textPrimary' variant='h6' component='h1'>
          {comic.title}
      </Typography>
      <br/>
      <img
        className={classes.media}
        src={comic.thumbnail && comic.thumbnail.path ?
          `${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`: noImage}
          alt={comic.title}
          />

      <br/>
      <br/>
      <Divider />
      <br/>
      <Typography color='textPrimary' variant='body2'>
        {comic.description || 'N/A'}
      </Typography>
      <br/>
      <Divider />
      <br/>
      {price}
      <br/>
      <Divider />
      <br/>
      <Typography color='textPrimary' variant='body2'>
        Series info: {(comic.series && comic.series.name) || 'N/A'}
      </Typography>
      <br/>
      <Divider />
      <br/>
      {button}
    </>
  );
}

export default ComicInfo;
