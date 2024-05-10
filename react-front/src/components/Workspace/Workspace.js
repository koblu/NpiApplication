import React from 'react';
import PropTypes from 'prop-types';
import styles from './Workspace.module.css';
import { useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import SearchResults from '../SearchResults/SearchResults';
import { useConnection } from '../../utilities/useConnection';
import { Alert, AppBar, Grid } from '@mui/material';
import DetailView from '../DetailView/DetailView';
import ClearIcon from '@mui/icons-material/Clear';

const Workspace = () => {
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState({
    npiNo: '',
    firstName: '',
    lastName: '',
    city: '',
    state: '',
    zip: ''
  });
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState(null);
  const [resultsDone, setResultsDone] = useState(false);
  const conn = useConnection();

  const setSearchParameter = (param, value) => {
    var obj = search
    obj[param] = value
    setSearch({...search, ...obj});
  }

  const handleInitSearch = (searchObject) => {
    clearSelected();
    setSearch(searchObject);

    conn.search({...searchObject, skip: 0}).then((resultData) => {
      if (resultData?.Errors?.length) {
        setError(resultData.Errors[0]?.description);
      } else {
        setResults(resultData);
      }
    });
  }

  const handleExtraSearch = () => {
    if (results.length < 1200) {
      conn.search({...search, skip: results.length}).then((resultData) => {
        if (resultData?.Errors) {
          setError(resultData.Errors[0]?.description);
          setTimeout(() => {setError()}, 2);
        } else {
          if (resultData.length === 0) {
            setResultsDone(true);
          }
          else {
            setResults([...results, ...resultData]);
          }
        }
      });
    }
  }

  const clearError = () => {
    setError();
  }

  const clearResults = () => {
    setResults();
    setResultsDone(false);
    setSelected();
  }

  const clearSelected = () => {
    setSelected();
  }


  return (
  <div className={styles.Workspace}>
    <AppBar sx={{position:'relative'}}>NPPES NPI Database Search Tool</AppBar>
    {error && <Alert severity='error' sx={{position:'absolute', top: '20px', left: '20px', zIndex:10000000}} >{error} <ClearIcon sx={{fontSize:"medium"}} onClick={clearError}/></Alert>}
    <Grid container spacing={2} sx={{padding: '10px'}}>
      <Grid item xs={12} md={4}>
        <SearchForm
          handleInitSearch={handleInitSearch}
          setSearchParameter={setSearchParameter}
          search={search}
        />
      </Grid>
      <Grid item xs={12} md={4}>
      {!!results?.length && <SearchResults
        results={results}
        setSelected={setSelected}
        handleExtraSearch={handleExtraSearch}
        clearResults={clearResults}
        resultsDone={resultsDone}
      />}
      </Grid>
      <Grid item xs={12} md={4}>
      {!!selected && <DetailView
        selected={selected}
        clearSelected={clearSelected}
      />}
      </Grid>
    </Grid>
  </div>
  )
}

Workspace.propTypes = {};

Workspace.defaultProps = {};

export default Workspace;
