import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from '@mui/material';

const CardDashboard = () => {
  return (
    <Card>
      <CardHeader title={<Typography variant='h5'>title</Typography>} />

      <Divider />

      <CardContent></CardContent>
    </Card>
  );
};

export default CardDashboard;
