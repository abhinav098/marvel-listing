import {
  Grid,
  CardContent,
  CardMedia,
  Card,
  CardActionArea,
  Typography,
  makeStyles
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { styles } from '../../cardStyle';
import noImage from '../../images/no-image.jpeg';

const useStyles = makeStyles(styles);

const CharacterCard = (props) => {
  const classes = useStyles();
  const regex = /(<([^>]+)>)/gi;
  const comic = props.comic;
  return (
  <>
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Card className={classes.card} variant='outlined'>
        <CardActionArea>
          <Link to={`/comics/${comic.id}`} className={classes.cardLink}>
            <CardMedia
              className={classes.media}
              component='img'
              image={comic.thumbnail && comic.thumbnail.path ? `${comic.thumbnail.path}/portrait_incredible.${comic.thumbnail.extension}`: noImage}
              title='comic image'
            />

            <CardContent>
              <Typography className={classes.titleHead} gutterBottom variant='h6' component='h2'>
                {comic.title}
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
                {comic.description ? `${comic.description.replace(regex, '').substring(0, 139)} ...` : 'No Summary ...'}
                <span>More Info</span>
              </Typography>
            </CardContent>
          </Link>
        </CardActionArea>
      </Card>
    </Grid>
  </>
  )
}

export default CharacterCard;
