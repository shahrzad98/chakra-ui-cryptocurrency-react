import KYCContent from 'components/KYC/Content';
import KYCHeader from 'components/KYC/Header';
import * as React from 'react';
import { FC } from 'react';

type KYCProps = {

};
const KYC : FC<KYCProps> =()=> {
 return (
  <>
    <KYCHeader/>
    <KYCContent/>
  </>
 );
};

export default KYC;
