/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import StockForm from './StockForm';
import LoadingGif from './LoadingGif';
import { StockInfo } from '../Info.json';

const useStyles = makeStyles({
  root: {
    width: '80%',
    textAlign: 'center',
    margin: '2rem auto',
  },
  container: {
    marginTop: '2rem',
  },
});

const columns = [
  { id: 'name', label: 'Name', minWidth: 150, align: 'center' },
  { id: 'currentPrice', label: 'Current Price', minWidth: 150, align: 'center' },
  { id: 'status', label: 'Status', minWidth: 50, align: 'center' },
  { id: 'actions', label: 'Actions', minWidth: 50, align: 'center' },
];

const defaultStock = {
  _id: null,
  name: '',
  currentPrice: '',
  status: true,
};

const StockList = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [stocks, setStocks] = useState([]);
  const [editItem, setEditItem] = useState();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const openForm = () => {
    setEditItem(defaultStock);
    setShowForm(true);
  };

  const getStocks = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await axios.get('/api/stocks');
      if (res.data.length === 0) {
        openForm();
      } else {
        setStocks(res.data);
      }
    } catch (err) {
      setMessage(err.response.statusText);
    } finally {
      setLoading(false);
    }
  };

  const closeForm = (item) => {
    setMessage(null);
    setShowForm(false);
    if (item._id) {
      if (stocks.some((s) => s._id === item._id)) {
        setStocks([]);
        getStocks();
      } else {
        setStocks([...stocks, item]);
      }
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangeStatus = async (item) => {
    setLoading(true);
    setMessage(null);
    try {
      const editing = { ...item };
      editing.status = !editing.status;
      const res = await axios.put(`api/stocks/${item._id}`, editing);
      const index = stocks.findIndex((p) => p._id === item._id);
      const auxStocks = [...stocks];
      auxStocks[index] = { ...auxStocks[index], status: !auxStocks[index].status };
      setStocks(auxStocks);
      setMessage(res.statusText);
    } catch (err) {
      setMessage(err.response.statusText);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setShowForm(true);
  };

  const handleDelete = async (item) => {
    const confirmation = window.confirm('Want to delete?');
    if (confirmation) {
      setLoading(true);
      setMessage(null);
      try {
        await axios.delete(`api/stocks/${item._id}`);
        const auxStocks = stocks.filter((p) => p._id !== item._id);
        setStocks(auxStocks);
      } catch (err) {
        if (err.statusText) {
          setMessage(err.statusText);
        } else {
          setMessage(err.response.statusText);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getStocks();
    // eslint-disable-next-line
  }, []);

  if (showForm) {
    return <StockForm closeForm={closeForm} editItem={editItem} />;
  }
  return (
    <Paper className={classes.root}>
      <Typography variant="h4" align="center" color="primary" gutterBottom>
        {StockInfo.title}
      </Typography>
      <Typography variant="subtitle2" align="center" color="error" gutterBottom>
        {message}
      </Typography>
      <LoadingGif visible={loading} />
      <IconButton
        align="center"
        aria-label="open"
        color="primary"
        disabled={loading}
        onClick={openForm}
      >
        <AddCircleIcon />
      </IconButton>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={uuidv4()}
                  align="center"
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {stocks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <TableRow hover tabIndex={-1} key={uuidv4()}>
                  <TableCell align="center">
                    {item.name}
                  </TableCell>
                  <TableCell align="center">
                    {item.currentPrice}
                  </TableCell>
                  <TableCell align="center">
                    <Switch
                      checked={item.status}
                      onChange={() => handleChangeStatus(item)}
                      color="primary"
                      name="status"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      aria-label="edit"
                      color="primary"
                      disabled={loading}
                      onClick={() => handleEdit(item)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      color="secondary"
                      disabled={loading}
                      onClick={() => handleDelete(item)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={stocks.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default StockList;
