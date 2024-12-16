import React, {useEffect} from 'react';
import _map from 'lodash/map';
import {Box, Image, Button, Flex, Text} from '@chakra-ui/react';
import includes from 'lodash/includes';

import {GetURL} from '../../utils/urlMap';
import handleUpload from './handler';
import styled from 'styled-components';
import ProgressComponent from 'components/Progress';
import {SmallCloseIcon} from '@chakra-ui/icons';
import {useWindowSize} from 'helper/useWindowSize';
import {useDispatch} from 'react-redux';
import {setDocumentInfo, setImagePreview} from 'containers/KYC/redux/actions';
import {api} from 'utils/network';


type PropTypes = {
  onLoad?: (v: string) => void;
  placeholder?: string | JSX.Element;
  name?: string;
  icon?: JSX.Element;
  preview?: string;
  accept?: string[];
  upload?: boolean;
  width?: string;
  height?: string;
  imagePreview?: string;
  disabled?: boolean;
};

const Wrapper = styled.div`
  position: relative;
  width: ${(props: PropTypes) => props.width};
  height: ${(props: PropTypes) => props.height};
  display: grid;
  justify-items: center;
  transition: border 0.3s;
  background-color: #fff;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='13' ry='13' stroke='%23B7C0CAFF' stroke-width='2' stroke-dasharray='7' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e");
  border-radius: 13px;

  &.highlight {
    border-color: #1652f0;
  }

  & svg {
    display: inline;
  }
`;

const Label = styled.label`
  display: grid;
  height: 115px;
  align-items: center;
  justify-content: center;
  grid-template-areas: 'label';
  @media (max-width: 768px) {
    height: 170px;
  }
`;

const Default = styled.div`
  display: grid;
  padding: 14px auto 0 auto;
  grid-area: label;
  grid-row-gap: 12px;
  justify-items: center;
  grid-template-rows: 40px 1fr;
`;


const Upload: React.FC<PropTypes> = ({
                                       onLoad,
                                       placeholder,
                                       name,
                                       icon,
                                       preview: pre,
                                       accept = ['image/png', 'image/jpeg'],
                                       upload,
                                       width: uploadWidth,
                                       height,
                                       imagePreview,
                                       disabled = true
                                     }) => {
  const dispatch = useDispatch();
  const refInput = React.useRef(null);
  const [file, setFile] = React.useState();
  const [base64Preview, setBase64Preview] = React.useState('');
  const [hassError, setHasError] = React.useState(false);
  const [preview, setPreview] = React.useState(pre);
  const [progress, setProgress] = React.useState<number>(0);

  const isValidFileType = (type: string): boolean => includes(accept, type);

  const handleOnSubmit = (blob): void => {
    dispatch(setImagePreview(blob))

    if (isValidFileType(blob.type)) {
      setProgress(0);
      setHasError(false);
      setPreview(blob);

      handleUpload({
        blob,
        url: GetURL('selfie-upload'),
        onProgress: val => setProgress(val > 0 ? val - 1 : 0),
      })
        .then((value: string) => {
          dispatch(setDocumentInfo(value))
          onLoad && onLoad(value);
          setProgress(100);
        })
        .catch((error) => {
          console.log(error.response, `error.response`)
          // setProgress(-1);
          setHasError(true);
        });
    } else {
      console.log('file type is not valid!!');
    }
  };

  React.useEffect(() => {
    dispatch(setImagePreview(file))

    if (file) {
      setPreview(file);
      if (upload) handleOnSubmit(file);
    }
  }, [file, upload]);

  const addFileToState = newFile => {
    setFile(newFile);
  };

  const handleDrop = e => {
    addFileToState(e.dataTransfer.files[0]);
  };

  const preventDefaults = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  const addHeighlight = (e: object, dropArea: HTMLElement): void => {
    preventDefaults(e);
    dropArea.classList.add('highlight');
  };

  const removeHeighlight = (e: object, dropArea: HTMLElement): void => {
    preventDefaults(e);
    dropArea.classList.remove('highlight');
  };

  React.useEffect(() => {
    const dropArea = document.getElementById(`drop-area-${name}`);
    dropArea?.addEventListener('drop', handleDrop, false);

    _map(['dragenter', 'dragover'], eventName => {
      dropArea?.addEventListener(eventName, e => addHeighlight(e, dropArea), false);
    });

    _map(['dragleave', 'drop'], eventName => {
      dropArea?.addEventListener(eventName, e => removeHeighlight(e, dropArea), false);
    });
    return () => {
      dropArea?.removeEventListener('drop', handleDrop);
      _map(['dragenter', 'dragover'], eventName => {
        dropArea?.removeEventListener(eventName, e => {
          addHeighlight(e, dropArea);
        });
      });
      _map(['dragleave', 'drop'], eventName => {
        dropArea?.removeEventListener(eventName, e => {
          removeHeighlight(e, dropArea);
        });
      });
    };
  });
  const {width} = useWindowSize();

  useEffect(() => {
    imagePreview && api.post(GetURL('get-documents-batch') + `/${imagePreview}`, {"impersonate_user_id": null})
      .then(response => {
        setBase64Preview(response?.data)
      })
  }, [imagePreview])
  return (
    <Wrapper id={`drop-area-${name}`} width={uploadWidth} height={height}>
      <Label htmlFor={`selectFile-${name}`}>

        {preview &&
        <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" zIndex={1}>
          <Image
            width="211px"
            height="211px"
            filter="blur(2px)"
            minHeight="120px"
            gridArea="label"
            src={preview ? URL.createObjectURL(preview) : `http://${window.location.host}/api/v1/cerberus/user/files/${imagePreview}`}
          />
          {progress === 100 &&
          <Button pointerEvents="none" _active={{background: "#1652f0"}} _hover={{background: "#1652f0"}}
                  fontSize="16px" position="absolute" top="50%" left="50%" transform="translate(-50%,-50%)"
                  background="#1652f0" color="#fff">
            تغییر تصویر
          </Button>}
        </Box>
        }

        {imagePreview && !preview &&
        <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" zIndex={1}>
          <Image
            width="211px"
            height="211px"
            filter="blur(2px)"
            minHeight="120px"
            gridArea="label"
            src={`data:image/png;base64,${base64Preview}`}
          />

          <Button pointerEvents="none" _active={{background: "#1652f0"}} _hover={{background: "#1652f0"}}
                  fontSize="16px" position="absolute" top="50%" left="50%" transform="translate(-50%,-50%)"
                  background="#1652f0" color="#fff">
            تغییر تصویر
          </Button>
        </Box>
        }

        {
          <Default>
            <Box>
              <Box margin="0 auto">{icon}</Box>
              <Box marginTop="12px" textAlign="center" display={(pre || imagePreview)? 'none' : 'unset'}>
                {!progress &&
                placeholder}
              </Box>
            </Box>
          </Default>
        }
        <input
          type="file"
          disabled={disabled}
          ref={refInput}
          id={`selectFile-${name}`}
          accept={accept.join(',')}
          style={{display: 'none'}}
          onChange={(evt: any) => {
            addFileToState(evt?.target?.files[0]);
          }}
        />
        {progress > 0 && progress < 100 &&
        <Flex
          position="absolute"
          zIndex={1}
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          display="flex"
          backgroundColor="#f3f5f7"
          borderRadius="8px"
          width={width < 768 ? '300' : '382px'}
          padding="15px 0"
        >
          <Box alignSelf="center" margin="0 21px 0 12px">
            {hassError && <SmallCloseIcon color="#f44336"/>}
            {/*{progress > 95 && <CheckIcon color="#0ecb81"/>}*/}
          </Box>

          <ProgressComponent width={'206px'} percente={progress}/>
          {width > 768 &&
          <Text color="#b7c0ca" alignSelf="center" marginRight="10px" fontSize="14px">
            Selfie img.jpeg
          </Text>
          }
        </Flex>
        }
      </Label>
    </Wrapper>
  );
};

export default Upload;
