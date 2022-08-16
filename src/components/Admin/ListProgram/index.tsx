import { Button, Grid, Link } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import api from 'api/program.api';
import { useAppSelector } from 'app/hooks';
import { AxiosResponse } from 'axios';
import Meta from 'constants/types/Meta';
import { ProgramType } from 'constants/types/program/programType';
import QueryType from 'constants/types/queryType';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';

interface GetList {
  data: ProgramType[];
  meta: Meta;
}

interface Column {
  id:
    | 'id'
    | 'name'
    | 'startDate'
    | 'endDate'
    | 'price'
    | 'total'
    | 'remain'
    | 'action';
  label: string;
  minWidth?: number;
  align?: 'right';
}

const columns: readonly Column[] = [
  { id: 'id', label: 'ID', minWidth: 30 },
  { id: 'name', label: 'Tên sự kiện', minWidth: 170 },
  {
    id: 'startDate',
    label: 'Bắt đầu',
    minWidth: 100,
  },
  {
    id: 'endDate',
    label: 'Kết thúc',
    minWidth: 100,
  },
  {
    id: 'price',
    label: 'Phí',
    minWidth: 70,
    align: 'right',
  },
  {
    id: 'total',
    label: 'Số lượng',
    minWidth: 70,
    align: 'right',
  },
  {
    id: 'remain',
    label: 'Còn lại',
    minWidth: 70,
    align: 'right',
  },
  {
    id: 'action',
    label: 'Hành động',
    minWidth: 50,
    align: 'right',
  },
];

export default function ListProgram() {
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
    } as QueryType;
    api.getAll(query).then((response: AxiosResponse) => {
      const list = response.data as GetList;
      setList(list);
    });
  }, [page, rowsPerPage, refresh]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {list.data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => {
                return (
                  <TableRow
                    hover
                    role='checkbox'
                    tabIndex={-1}
                    key={row.id}
                    component={Link}
                    color='inherit'
                    underline='none'
                    href={`/admin/su-kien/${row.id}`}>
                    <TableCell align='right'>{row.id}</TableCell>
                    <TableCell align='left'>{row.name}</TableCell>
                    <TableCell align='right'>
                      {moment(row.startDate).format('HH:mm DD/MM/YYYY')}
                    </TableCell>
                    <TableCell align='right'>
                      {moment(row.endDate).format('HH:mm DD/MM/YYYY')}
                    </TableCell>
                    <TableCell align='right'>
                      {row.price?.toLocaleString('vi', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </TableCell>
                    <TableCell align='right'>
                      {row.total?.toLocaleString('vi-VN')}
                    </TableCell>
                    <TableCell align='right'>
                      {row.remain?.toLocaleString('vi-VN')}
                    </TableCell>
                    <TableCell align='center'>
                      <Grid container direction='column' spacing={2}>
                        <Grid item>
                          <Button
                            size='small'
                            variant='contained'
                            href={`/admin/su-kien/chinh-sua/${row.id}`}>
                            <BiEdit size={18} />
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button
                            size='small'
                            variant='contained'
                            color='error'>
                            <AiOutlineDelete size={18} />
                          </Button>
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                );
              })}
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
    </Paper>
  );
}
