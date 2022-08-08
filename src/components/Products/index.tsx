import { CircularProgress, Grid } from '@mui/material';
import { Container } from '@mui/system';
import productApi from 'api/product.api';
import Product from 'components/Product';
import { ProductType } from 'constants/types/productType';
import { useEffect, useState } from 'react';

const Products = () => {
  const [products, setProducts] = useState(new Array<ProductType>());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productApi.getAll().then(response => {
      setProducts(response.data.data);
      setLoading(false);
    });
  }, []);
  return (
    <>
      <Container>
        <Grid container spacing={2} alignItems='center' justifyContent='center'>
          {loading && <CircularProgress />}
          {products.map(product => (
            <Grid item xs={11} sm={5} md={3} lg={3} key={product.id}>
              <Product {...product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Products;
