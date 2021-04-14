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
  const character = props.character;
  return (
  <>
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
				<Card className={classes.card} variant='outlined'>
					<CardActionArea>
						<Link to={`/characters/${character.id}`} className={classes.cardLink}>
              <CardMedia
                className={classes.media}
                component='img'
                image={character.thumbnail && character.thumbnail.path ? `${character.thumbnail.path}/portrait_incredible.${character.thumbnail.extension}`: noImage}
                title='character image'
              />

              <CardContent>
                <Typography className={classes.titleHead} gutterBottom variant='h6' component='h2'>
                  {character.name}
                </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  {character.description ? `${character.description.replace(regex, '').substring(0, 139)} ...` : 'No Summary ...'}
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
