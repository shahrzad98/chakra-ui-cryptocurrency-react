import {Grid} from '@chakra-ui/react';
import LandlineInfo from 'components/KYC/Content/LandlineInfo';
import KYCHeader from 'components/KYC/Header';
import * as React from 'react';
import {FC, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {api} from 'utils/network';
import {GetURL} from 'utils/urlMap';

type LandlineProps = {};
const Landline: FC<LandlineProps> = () => {
  const [userStatusInfo, setUserStatusInfo] = useState<any>();

  const history = useHistory();
  useEffect(() => {
    api.get(GetURL('kyc-info')).then(response => {
      setUserStatusInfo(response?.data)
      if (response?.data?.status) {
        history.push('/kyc')
      }
      response?.data?.status === 1 && history.push('/')
    })
  }, [])
  
  return (
    <>
      <KYCHeader/>
      <Grid className="kyc__Content">
        <LandlineInfo userStatusInfo={userStatusInfo}/>
      </Grid>
    </>
  );
};

export default Landline;
