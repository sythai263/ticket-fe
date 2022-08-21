import { Grid } from '@mui/material';
import api from 'api/program.api';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorType } from 'constants/types/notification/errorType';
import { SaleType } from 'constants/types/program/saleProgram';
import {
  hideLoading,
  showAlert,
  showLoading,
} from 'features/notification/notiSlice';
import { useEffect, useState } from 'react';
import InfoCheckIn from './InfoCheckIn';
import InfoPayment from './InfoPayment';
import InfoRate from './InfoRate';
import InfoRegister from './InfoRegister';
const SaleProgramComponent = (props: { id: number }) => {
  const init = {
    amountCheckIn: 0,
    amountRate: 0,
    avgStar: 5,
    paidMoney: 0,
    quantity: 0,
    sumMoney: 0,
    total: 0,
  } as SaleType;
  const [sales, setSales] = useState(init);
  const dispatch = useAppDispatch();
  const refresh = useAppSelector(state => state.program.refresh);
  useEffect(() => {
    dispatch(showLoading());
    api
      .getSales(props.id)
      .then((response: AxiosResponse) => {
        const data = response.data as SaleType;
        setSales(data);
        dispatch(hideLoading());
      })
      .catch((err: AxiosError) => {
        const data = err.response?.data as ErrorType;
        dispatch(showAlert({ color: 'error', message: data.message }));
        dispatch(hideLoading());
      });
  }, [props.id, refresh, dispatch]);

  return (
    <>
      <Grid
        container
        justifyContent='center'
        spacing={1}
        marginBottom={3}
        alignItems='stretch'>
        <Grid item xs={12} sm={12} md={6} lg={3}>
          <InfoRegister total={sales.total} attendees={sales.quantity} />
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={3}>
          <InfoPayment sum={sales.sumMoney} paid={sales.paidMoney} />
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={3}>
          <InfoRate avgStar={sales.avgStar} amountRate={sales.amountRate} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3}>
          <InfoCheckIn
            checkIn={sales.amountCheckIn}
            attendees={sales.quantity}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default SaleProgramComponent;
