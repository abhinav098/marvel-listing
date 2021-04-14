import { Link } from 'react-router-dom';
import { styles } from '../../cardStyle';
import noImage from '../../images/no-image.jpeg';

import {
  Grid,
  CardContent,
  CardMedia,
  Card,
  CardActionArea,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(styles);
const CharacterCard = (props) => {
  const classes = useStyles();
  const regex = /(<([^>]+)>)/gi;
  const series = props.series;
  return (
  <>
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Card className={classes.card} variant='outlined'>
        <CardActionArea>
          <Link to={`/series/${series.id}`} className={classes.cardLink}>
            <CardMedia
              className={classes.media}
              component='img'
              image={series.thumbnail && series.thumbnail.path ? `${series.thumbnail.path}/portrait_incredible.${series.thumbnail.extension}`: noImage}
              title='series image'
            />

            <CardContent>
              <Typography className={classes.titleHead} gutterBottom variant='h6' component='h2'>
                {series.title}
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
                {series.description ? `${series.description.replace(regex, '').substring(0, 139)} ...` : 'No Summary ...'}
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
