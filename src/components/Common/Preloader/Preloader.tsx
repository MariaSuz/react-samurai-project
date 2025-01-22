import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Preloader: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  );
}

export default Preloader

// было так 
// import perloader from "../../../assets/images/loading.svg";
// import React from 'react';

// const Preloader: React.FC = () => {
//     return <span><img src={perloader}  alt='isFetching' /></span>
// }

// export default Preloader