import React from 'react';
import LoadingLib from 'react-loading';

import loadingStyle from '../../styles/components/c-loading.scss';

function Loading() {
  return (
    <div className={loadingStyle['c-loading']}>
      <LoadingLib type="bars" color="#e3e3e3" />
    </div>
  );
}

export default Loading;
