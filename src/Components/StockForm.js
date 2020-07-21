import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import LoadingGif from './LoadingGif';
import { StockInfo, buttons } from '../Info.json';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    textAlign: 'center',
    margin: '2rem auto',
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const StocksForm = ({ closeForm, editItem }) => {
  const classes = useStyles();
  const [stock, setStock] = useState(editItem);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const { add, update, wait } = buttons;
  const btnText = stock._id == null ? add : update;

  const handleChange = (e) => {
    e.persist();
    setStock((prev) => (
      { ...prev, [e.target.name]: e.target.value }
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = stock._id !== null
        ? await axios.put(`api/stocks/${stock._id}`, stock, { timeout: 5000 })
        : await axios.post('api/stocks/', stock, { timeout: 5000 });
      setLoading(false);
      const { _id, name, currentPrice, status } = res.data;
      closeForm({ _id, name, currentPrice, status });
    } catch (err) {
      setMessage(err.response.statusText);
      setLoading(false);
    }
  };

  return (
    <Grow in timeout={3000}>
      <Paper className={classes.root}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <CssBaseline />
          <Typography variant="h4" align="center" color="primary" gutterBottom>
            {StockInfo.title}
          </Typography>
          <Typography variant="subtitle2" align="center" color="error" gutterBottom>
            {message}
          </Typography>
          <LoadingGif visible={loading} />
          <IconButton
            aria-label="return"
            disabled={loading}
            onClick={closeForm}
          >
            <Avatar className={classes.avatar}>
              <ArrowBackIcon />
            </Avatar>
          </IconButton>
          <Container maxWidth="xs">
            <Grid container spacing={3}>
              <Grid item xs={12} className={classes.column}>
                <TextField
                  margin="dense"
                  name="name"
                  variant="outlined"
                  id="name"
                  value={stock.name}
                  label="name"
                  onChange={handleChange}
                  required
                />
                <TextField
                  margin="dense"
                  name="currentPrice"
                  variant="outlined"
                  id="currentPrice"
                  type="number"
                  inputProps={{ min: '0' }}
                  value={stock.currentPrice}
                  label="Price"
                  onChange={handleChange}
                  required
                />
                <Button
                  className={classes.button}
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                >
                  {loading ? wait : btnText}
                </Button>
              </Grid>
            </Grid>
          </Container>
        </form>
      </Paper>
    </Grow>
  );
};

StocksForm.propTypes = {
  editItem: PropTypes.object.isRequired,
  closeForm: PropTypes.func.isRequired,
};

export default StocksForm;
