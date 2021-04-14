import { makeStyles, Typography, Button, Divider } from '@material-ui/core';
import noImage from '../../images/no-image.jpeg';
import '../../App.css';

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


const CharacterInfo = (props) => {
  const classes = useStyles();
  const character = props.character;

  const renderButton = (url) => {
    return <Button className={classes.link} variant="contained" key={url.type}><a href={url.url} target='_blank' rel="noreferrer">{url.type}</a></Button>
  }

  let button = character.urls && character.urls.map((url) => { return renderButton(url)})

  return (
    <>
      <Typography className={classes.titleHead} color='textPrimary' variant='h5' component='h1'>
          {character.name}
      </Typography>
      <br/>
      <img
        className={classes.media}
        src={character.thumbnail && character.thumbnail.path ?
          `${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`: noImage}
          alt={character.name}
          />

      <br/>
      <br/>
      <Divider />
      <br/>
      <Typography color='textPrimary' variant='body2'>
        {character.description || 'N/A'}
      </Typography>
      <br/>
      <Divider />
      <br/>
      <Typography color='textPrimary' variant='body2'>
        Series Count: {(character.series && character.series.available) || 'N/A'}
      </Typography>

      <Typography color='textPrimary' variant='body2'>
        Comics Count: {(character.comics && character.comics.available) || 'N/A'}
      </Typography>
      <br/>
      <Divider />
      <br/>
      {button}
    </>
  );
}

export default CharacterInfo;
