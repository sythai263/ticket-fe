import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { ProgramType } from 'constants/types/productType';

const Program = (program: ProgramType) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component='img'
        height='140'
        image={program.avatar}
        alt={program.name}
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {program.name}
        </Typography>
        <Typography
          variant='body2'
          color='text.secondary'
          sx={{
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}>
          {program.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>Tham gia</Button>
        <Button size='small'>Xem chi tiết</Button>
      </CardActions>
    </Card>
  );
};

export default Program;
