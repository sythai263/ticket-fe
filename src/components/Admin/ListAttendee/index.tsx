import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
  Box,
  Collapse,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import api from 'api/program.api';
import { useAppSelector } from 'app/hooks';
import { AxiosResponse } from 'axios';
import { AttendeeType } from 'constants/types/attendee/attendeeType';
import QueryAttendee from 'constants/types/attendee/searchAttendee';
import { IdType } from 'constants/types/idType';
import Meta from 'constants/types/Meta';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

interface GetList {
  data: AttendeeType[];
  meta: Meta;
}

function Row(props: { row: AttendeeType }) {
  const { row } = props;
  const [open, setOpen] = useState(false);

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
          {`${row.user.lastName} ${row.user.firstName}`}
        </TableCell>
        <TableCell align='center'>
          {Number(row.program.price).toLocaleString('vi', {
            style: 'currency',
            currency: 'VND',
          })}
        </TableCell>
        <TableCell align='center'>
          {row.invoice.isPaid ? (
            <CheckCircleIcon color='success' />
          ) : (
            <CancelRoundedIcon color='error' />
          )}
        </TableCell>
        <TableCell align='center'>
          {row.isCheckIn ? (
            <CheckCircleIcon color='success' />
          ) : (
            <CancelRoundedIcon color='error' />
          )}
        </TableCell>
        <TableCell align='center'>
          <img src={row.imageQR} alt='QRCode' style={{ height: '100px' }} />
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
    </React.Fragment>
  );
}

const ListAttendeeComponent = (d: IdType) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const refresh = useAppSelector((state: any) => state.program.refresh);
  const [list, setList] = useState<GetList>({
    data: [],
    meta: {
      hasNextPage: false,
      hasPreviousPage: false,
      itemCount: 0,
      page: 1,
      pageCount: 0,
      take: 10,
    },
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const query = {
      page: page + 1,
      take: rowsPerPage,
      order: 'DESC',
    } as QueryAttendee;
    api.getAttendees(d.id, query).then((response: AxiosResponse) => {
      const payload = response.data as GetList;
      setList(payload);
    });
  }, [page, rowsPerPage, refresh, d.id]);
  return (
    <Container>
      <TableContainer component={Paper}>
        <Table aria-label='collapsible table'>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align='left'>Họ tên</TableCell>
              <TableCell align='center'>Phí</TableCell>
              <TableCell align='center'>Thanh toán</TableCell>
              <TableCell align='center'>Check in</TableCell>
              <TableCell align='center'>Mã QR</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.data.length > 0 ? (
              list.data.map(row => <Row key={row.id} row={row} />)
            ) : (
              <Typography>
                Chưa có ai đăng ký tham gia chương trình này!
              </Typography>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={list.meta.pageCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage='Số hàng / trang'
      />
    </Container>
  );
};

export default ListAttendeeComponent;
