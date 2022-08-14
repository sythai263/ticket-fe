import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  LinearProgress,
  Rating,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Box } from '@mui/system';
import ReviewCard from 'components/ReviewCard';
import { ProgramType } from 'constants/types/program/programType';
import moment from 'moment';
import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
const DetailProgramComponent = (program: ProgramType) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const items = [program.avatar, program.imageQR];
  const [value, setValue] = useState(0);
  const reviews = program.reviews ? program.reviews : [];

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role='tabpanel'
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}>
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Container>
      <Card>
        <CardHeader title={program.name} />
        <Grid container spacing={2} direction={isMobile ? 'column' : 'row'}>
          <Grid item md={6} alignItems='center' justifyContent='center'>
            <Carousel>
              {items.map((item, index) => (
                <Grid
                  container
                  justifyContent='center'
                  alignItems='center'
                  key={index}>
                  <Grid item justifyContent='center' alignItems='center'>
                    <img
                      src={item}
                      style={{ height: '300px' }}
                      alt={program.name}
                    />
                  </Grid>
                </Grid>
              ))}
            </Carousel>
          </Grid>
          <Grid item md={6} alignItems='center' justifyContent='center'>
            <Typography>{program.name}</Typography>
            <Grid item display='flex' flexDirection='row'>
              <Rating
                value={Number(program.starAvg)}
                readOnly
                precision={0.5}
              />
              <Typography marginLeft={5}>{program.starAvg}/5</Typography>
            </Grid>
            <Typography variant='h5' color='text.secondary' textAlign='right'>
              {`Phí: ${Number(program.price).toLocaleString('vi', {
                style: 'currency',
                currency: 'VND',
              })}`}
            </Typography>
            <CardContent>
              <Box sx={{ width: '100%' }}>
                <LinearProgress variant='determinate' value={program.total} />
              </Box>
              <Typography
                variant='body2'
                color='text.secondary'
                textAlign='right'>
                {`Còn lại: ${program.remain}/${program.total}`}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {`Bắt đầu: ${moment(program.startDate).format(
                  'HH:mm DD/MM/YYYY'
                )} `}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {`Kết thúc: ${moment(program.endDate).format(
                  'HH:mm DD/MM/YYYY'
                )} `}
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label='basic tabs example'>
              <Tab label='Mô tả' {...a11yProps(0)} />
              <Tab label='Đánh giá' {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Typography>{program.description}</Typography>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Grid container spacing={6} direction='column'>
              {reviews.length > 0 ? (
                reviews.map(review => (
                  <Grid item key={review.id}>
                    <ReviewCard {...review} />
                  </Grid>
                ))
              ) : (
                <Grid item>
                  <Typography>
                    Hãy là người đầu tiên đánh giá chương trình này!
                  </Typography>
                </Grid>
              )}
            </Grid>
          </TabPanel>
        </Box>
      </Card>
    </Container>
  );
};

export default DetailProgramComponent;
