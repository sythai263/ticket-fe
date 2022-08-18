import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  Box,
  Button,
  CircularProgress,
  Collapse,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import attendeeApi from 'api/attendee.api';
import api from 'api/user.api';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { AxiosError, AxiosResponse } from 'axios';
import { AttendeeType } from 'constants/types/attendee/attendeeType';
import { ErrorType } from 'constants/types/notification/errorType';
import { showAlert } from 'features/notification/notiSlice';
import moment from 'moment';
import { AiOutlineDelete } from 'react-icons/ai';
const baseURL = process.env.REACT_APP_API_URL;

function Row(props: { row: AttendeeType }) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const handleDelete = () => {
    setLoading(true);
    attendeeApi
      .deleteAttendee(row.id)
      .then((response: AxiosResponse) => {
        setLoading(false);
        setOpenDialog(false);

        dispatch(showAlert({ color: 'success', message: 'Xóa thành công !' }));
      })
      .catch((err: AxiosError) => {
        const data = err.response?.data as ErrorType;
        setOpenDialog(false);
        setLoading(false);
        dispatch(showAlert({ color: 'error', message: data.message }));
      });
  };

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {row.program.name}
        </TableCell>
        <TableCell align='right'>
          {Number(row.program.price).toLocaleString('vi', {
            style: 'currency',
            currency: 'VND',
          })}
        </TableCell>
        <TableCell align='center'>
          {row.invoice.isPaid ? (
            <CheckCircleIcon color='success' />
          ) : (
            <a href={`${baseURL}api/payment/invoice/${row.invoice.id}`}>
              <Button variant='contained' size='small'>
                Thanh toán
              </Button>
            </a>
          )}
        </TableCell>
        <TableCell align='center'>
          {row.isCheckIn ? (
            <CheckCircleIcon color='success' />
          ) : (
            <CancelRoundedIcon color='error' />
          )}
        </TableCell>
        <TableCell align='right'>
          <img src={row.imageQR} alt='QRCode' style={{ height: '100px' }} />
        </TableCell>
        <TableCell align='center'>
          <Grid container direction='column' spacing={2}>
            <Grid item>
              <Button
                size='small'
                variant='contained'
                color='error'
                onClick={() => setOpenDialog(true)}>
                <AiOutlineDelete size={18} />
                {loading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      marginTop: '-12px',
                      marginLeft: '-12px',
                    }}
                  />
                )}
              </Button>
            </Grid>
          </Grid>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant='h6' gutterBottom component='div'>
                Chi tiết đăng ký
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell align='center'>Chương trình</TableCell>
                    <TableCell align='center'>Thông tin thanh toán</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component='th' scope='row'>
                      <Typography>
                        Tên CT:
                        <b> {row.program.name}</b>
                      </Typography>
                      <Typography>
                        Bắt đầu:{' '}
                        <b>
                          {moment(row.program.startDate).format(
                            'HH:mm DD/MM/YYYY'
                          )}
                        </b>
                      </Typography>
                      <Typography>
                        Kết thúc:{' '}
                        <b>
                          {moment(row.program.endDate).format(
                            'HH:mm DD/MM/YYYY'
                          )}
                        </b>
                      </Typography>
                      <Typography>
                        Phí:{' '}
                        <b>
                          {Number(row.program.price).toLocaleString('vi', {
                            style: 'currency',
                            currency: 'VND',
                          })}
                        </b>
                      </Typography>
                      <Typography>
                        Địa điểm:
                        <b> {row.program.place}</b>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>
                        Mã HĐ:
                        <b> {row.invoice.id}</b>
                      </Typography>
                      <Typography>
                        Phí:{' '}
                        <b>
                          {Number(row.invoice.amount).toLocaleString('vi', {
                            style: 'currency',
                            currency: 'VND',
                          })}
                        </b>
                      </Typography>
                      <Typography>
                        Nội dung:
                        <b> {row.invoice.info}</b>
                      </Typography>
                      <Typography>
                        NH Thanh toán:
                        <b>
                          {row.invoice.bankCode ? row.invoice.bankCode : ''}
                        </b>
                      </Typography>
                      <Typography>
                        Mã tham chiếu:{' '}
                        <b>
                          {row.invoice.bankTransNo
                            ? row.invoice.bankTransNo
                            : ''}
                        </b>
                      </Typography>
                      <Typography>
                        Hình thức thanh toán:{' '}
                        <b>
                          {row.invoice.cardType ? row.invoice.cardType : ''}
                        </b>
                      </Typography>
                      <Typography>
                        TGian thanh toán:{' '}
                        <b>
                          {moment(row.invoice.payDate)
                            .add(-7, 'h')
                            .format('HH:mm:ss DD/MM/YYYY')}
                        </b>
                      </Typography>
                      <Typography>
                        Trạng thái:{' '}
                        <b>
                          {row.invoice.isPaid
                            ? 'Đã thanh toán'
                            : 'Chưa thanh toán'}
                        </b>
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>
          {'Bạn chắc chắn muốn xóa ???'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Cân nhắc trước khi xóa nha !!!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Hủy</Button>
          <Button onClick={handleDelete} autoFocus>
            Chắc chắn
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
const ListAttendeeComponent = () => {
  const [data, setData] = useState<AttendeeType[]>([]);
  const refresh = useAppSelector(state => state.program.refresh);
  useEffect(() => {
    api.getAttendee().then((response: AxiosResponse) => {
      const payload = response.data as AttendeeType[];
      setData(payload);
    });
  }, [refresh]);
  return (
    <Container>
      <TableContainer component={Paper}>
        <Table aria-label='collapsible table'>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align='center'>Tên sự kiện</TableCell>
              <TableCell align='center'>Phí</TableCell>
              <TableCell align='center'>Thanh toán</TableCell>
              <TableCell align='center'>Check in</TableCell>
              <TableCell align='center'>Mã QR</TableCell>
              <TableCell align='center'>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.map(row => <Row key={row.id} row={row} />)
            ) : (
              <Typography>
                Bạn chưa đăng ký tham gia sự kiên nào, Hãy tham gia ngay nhé!
              </Typography>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ListAttendeeComponent;
