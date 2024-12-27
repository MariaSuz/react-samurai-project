import perloader from "../../../assets/images/loading.svg";
import React from 'react';

const Preloader: React.FC = () => {
    return <span><img src={perloader}  alt='isFetching' /></span>
}

export default Preloader