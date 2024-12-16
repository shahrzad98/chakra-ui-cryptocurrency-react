import * as React from 'react';
import {FC, useEffect, useRef, useState} from 'react';
import {FormattedMessage} from 'react-intl';
import './kycContent.scss'
import messages from '../messages'
import {
  Box,
  Button, Grid
} from '@chakra-ui/react';
import PersonalInfo from './PersonalInfo';
import DocumentInfo from './DocumentInfo';
import BankCardInfo from './BankCardInfo';
import ConfirmPicture from '../Modals/ConfirmPictures';
import ModalComponent from 'components/Modal';
import {useWindowSize} from 'helper/useWindowSize';
import {ChevronLeftIcon} from '@chakra-ui/icons';
import Warning from './Warning';
import {api} from 'utils/network';
import {GetURL} from 'utils/urlMap';
import LandlineInfo from './LandlineInfo';
import {useSelector} from 'react-redux';
import {kycSelector} from 'containers/KYC/redux/selector';
import {toast, ToastContainer} from 'react-toastify';
import {useHistory} from 'react-router-dom';

const KYCContent: FC = () => {
  const modalRef = useRef<{ open: () => void, close: () => void }>(null)
  const {width} = useWindowSize()
  const [userStatusInfo, setUserStatusInfo] = useState<any>();
  const [emptyBatch, setEmptyBatch] = useState(true);
  const [showLandline, setShowLandline] = useState(false);
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [showDocument, setShowDocument] = useState(false);
  const {documentInfo, personalInfo, bankCards, editingBaseInfo} = useSelector(kycSelector);
  const history = useHistory();
  useEffect(() => {
    api.get(GetURL('kyc-info')).then(response => {
      setUserStatusInfo(response?.data)
      response?.data?.status === 1 && history.push('/')
    })
  }, [])

  useEffect(() => {
    setEmptyBatch(!editingBaseInfo)
  }, [editingBaseInfo, personalInfo])

  useEffect(() => {
    setEmptyBatch(!documentInfo)
  }, [documentInfo])

  function nextStepHandle() {
    let error = false;
    for (const item of Object.keys(personalInfo)) {
      if (!personalInfo[item] || !documentInfo || !bankCards?.length) {
        toast.error('اطلاعات مورد نیاز را وارد کنید.', {
          position: 'top-right',
        });
        error = true;
        break
      }
    }
    !error && modalRef.current!.open()
  }

  const documentStatus = userStatusInfo?.documents_batch?.status;
  const landlineStatus = userStatusInfo?.landline_batch?.status;
  const baseInfoStatus = userStatusInfo?.base_info_batch?.status;

  const isDocumentPendingWhileRejected = userStatusInfo?.documents_batch?.status === 0 && userStatusInfo?.status === 2
  const isPersonalInfoPendingWhileRejected = userStatusInfo?.base_info_batch?.status === 0 && userStatusInfo?.status === 2


  function sendToOperatorHandle() {
    const updateDocumentInfo = documentInfo && api.put(GetURL('document-name-upload'), {
      selfie_file: documentInfo,
      id_desc_file: ""
    })
    const updatePersonalInfo = editingBaseInfo && api.put(GetURL('kyc-base-info'), personalInfo)


    Promise.all([updatePersonalInfo, updateDocumentInfo ]).then(() => {

      api.put(GetURL('griffin-kyc-submit')).then(()=>{
        history.push('/kyc')

      })
    })
  }
  const pendingLandlineWithData = userStatusInfo?.status === 4 && userStatusInfo?.landline_batch?.status === 0

  useEffect(()=>{
    setShowLandline([4, 2].includes(userStatusInfo?.landline_batch?.status) && userStatusInfo?.landline_batch?.status !== 1 || pendingLandlineWithData)
    setShowDocument(userStatusInfo?.documents_batch?.status !== 1 && !isDocumentPendingWhileRejected)
    setShowPersonalInfo(userStatusInfo?.base_info_batch?.status !== 1 && !isPersonalInfoPendingWhileRejected)
  },[userStatusInfo])

  const isPersonalInfoSucceedWhilePending = userStatusInfo?.base_info_batch?.status === 1 && userStatusInfo?.status === 0
  const isDocumentSucceedWhilePending = userStatusInfo?.documents_batch?.status === 1 && userStatusInfo?.status === 0

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ModalComponent background="#fff" modalRef={modalRef} bodyTop={width < 768 ? "8%" : "unset"}>
        <ConfirmPicture close={() => modalRef.current?.close()}/>
      </ModalComponent>
      <Grid className="kyc__Content">

        {/* Warning */}
        {[4, 2].includes(userStatusInfo?.status) &&
        <Warning status={userStatusInfo?.status} document={documentStatus}
                 landline={landlineStatus} baseInfo={baseInfoStatus}/>}

        {/* Content */}
        {showPersonalInfo && !isPersonalInfoSucceedWhilePending &&
        <PersonalInfo userStatusInfo={userStatusInfo}/>}
        {showDocument && !isDocumentSucceedWhilePending &&
        <DocumentInfo userStatusInfo={userStatusInfo}/>}
        {userStatusInfo?.status === 0 && <BankCardInfo/>}
        {showLandline &&
        <LandlineInfo userStatusInfo={userStatusInfo}/>}

        {/* Action */}
        {
          ![4, 2].includes(userStatusInfo?.status) && userStatusInfo?.landline_batch?.status !== 1 &&
          <Box margin="16px auto 0" textAlign="left" w={{base: '328px', md: '700px', lg: '900px', xl: '1120px'}}
               position="relative">
            <Button
              onClick={nextStepHandle}
              width="227px" height="57px"
              background="#1652f0"
              color="#fff" fontSize="16px"
              _hover={{background: "#1652f0"}}
              _active={{background: "#1652f0"}}
              marginBottom="24px"
              justifySelf="left">
              <FormattedMessage {...messages.nextStepLandline} />
              <ChevronLeftIcon fontSize="25px" right="5px" position="relative" fontWeight="900"/>
            </Button>
          </Box>}

        {
          userStatusInfo?.status !== 4 && userStatusInfo?.landline_batch?.status === 1 && userStatusInfo?.status !== 0 &&
          <Box margin="16px auto 0" textAlign="left" w={{base: '328px', md: '700px', lg: '900px', xl: '1120px'}}
               position="relative">
            <Button onClick={sendToOperatorHandle}
                    w={{base: "100%", lg: "227px"}} color="#fff" fontSize="16px" fontFamily="yekanb" borderRadius="4px"
                    backgroundColor="#1652f0" height="57px"
                    disabled={emptyBatch}
                    marginTop={width < 768 ? "12px" : "unset"}
                    _hover={{backgroundColor: "#1652f0"}}
                    _active={{backgroundColor: "#1652f0"}}
            >
              <FormattedMessage {...messages.sendToOperator}/>
              <ChevronLeftIcon fontSize="25px" right="5px" position="relative" fontWeight="900"/>

            </Button>
          </Box>}
      </Grid>
    </>
  )
    ;
};

export default KYCContent;
