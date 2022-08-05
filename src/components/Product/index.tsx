import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { ProductType } from 'constants/types/productType';

const Product = (product: ProductType) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component='img'
        height='140'
        image={product.avatar}
        alt={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {product.name}
        </Typography>
        <Typography
          variant='body2'
          color='text.secondary'
          sx={{
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}>
          {product.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>Share</Button>
        <Button size='small'>Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default Product;
