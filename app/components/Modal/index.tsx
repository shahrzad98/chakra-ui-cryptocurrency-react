import {Box, Flex, Text} from '@chakra-ui/react';
import * as React from 'react';
import {useCallback, useEffect, useImperativeHandle, useState} from 'react';
import {createPortal} from 'react-dom';
import Close from 'images/kyc/close.svg'
import './modal.scss';

type ModalComponentProps = {
  modalRef: any,
  bodyTop?: string,
  footer?: JSX.Element,
  headerTitle?: string,
  [key: string]: any,
  hasHeader?: boolean,
  headerProps?: any,
  headerDivider? : boolean
}

const ModalComponent: React.FC<ModalComponentProps> = React.memo(({
                                                                    modalRef,
                                                                    bodyTop = '0',
                                                                    footer,
                                                                    hasHeader,
                                                                    headerTitle,
                                                                    headerProps= {fontSize:'17px'},
                                                                    headerDivider,
                                                                    ...props
                                                                  }) => {
  const modalElement: HTMLElement = document.getElementById('modal-app')!
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(modalRef, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false)
  }), [])

  const handleScape = useCallback((event) => {
    return event.key === "Escape" && setIsOpen(false)
  }, [])

  useEffect(() => {
    isOpen && document.addEventListener('keydown', handleScape)
    return () => {
      document.removeEventListener('keydown', handleScape)
    }
  }, [handleScape, isOpen])

  // todo : close modal on click outside
  return createPortal(
    <>
      {isOpen &&
      <Box className='modal__container'>
        <Box className="modal__body" top={bodyTop}>
          {hasHeader ?
            <>
              <Flex>
                <Box minHeight="30px">
                  <Text {...headerProps} >{headerTitle}</Text>
                </Box>
                <Close width="15px" height="15px" className="modal__close--withHeader"
                       onClick={() => modalRef.current!.close()}/>
              </Flex>
              {headerDivider && <hr/>}
            </>
            :
            <Close width="20px" height="20px" className="modal__close" onClick={() => modalRef.current!.close()}/>}
          {props.children}
          {footer && <Box className="modal__Footer">{footer}</Box>}
        </Box>
      </Box>
      }
    </>, modalElement)
});

export default ModalComponent;
