import classnames from 'classnames';
import React, {KeyboardEvent, useEffect, useMemo, useRef, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import './carousel.scss';
import ChevronLeft from 'images/kyc/chevron_left.svg'
import ChevronRight from 'images/kyc/chevron_right.svg'
import ChevronLeftR from 'images/kyc/chevron_leftR.svg'
import ChevronRightR from 'images/kyc/chevron_rightR.svg'
import {Box, Image} from '@chakra-ui/react';
import {useWindowSize} from 'helper';
import {useDispatch} from 'react-redux';
import {setCurrentSampleSlie} from 'containers/KYC/redux/actions';

type Props = {
  imageSources: string[];
};
const Carousel: React.VFC<Props> = React.memo((props: Props) => {
  const {width} = useWindowSize();
  const [currentSlide, setCurrentSlide] = useState(1);
  const sliderDivRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();

  const images = useMemo(() => {
    return [...Array(props.imageSources.length)].map((item, index) => ({
      id: uuidv4(),
      value: props.imageSources[index]
    }));
  }, [props.imageSources]);


  const handleLeftClicked = () => {
    if (currentSlide === 0) {
      setCurrentSlide(props.imageSources.length - 1);
    } else {
      setCurrentSlide((prevState) => prevState - 1);
    }
  };

  const handleRightClicked = () => {
    if (currentSlide === props.imageSources.length - 1) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide((prevState) => prevState + 1);
    }
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      handleLeftClicked();
    } else if (event.key === 'ArrowRight') {
      handleRightClicked();
    }
  };

  useEffect(() => {
    dispatch(setCurrentSampleSlie(currentSlide))
  }, [dispatch, currentSlide]);
  return (
    <Box
      ref={sliderDivRef}
      className="singleCarousel"
      onKeyDown={handleKeyPress}
      tabIndex={0}
      onMouseEnter={() => sliderDivRef.current!.focus()}
      onMouseLeave={() => sliderDivRef.current!.blur()}>
      {images.map((item, index) => {
        const active = index === currentSlide;
        const transform = width < 768 ? 'translateX(${(index - currentSlide) * 100}%)' : `translateX(${(index - currentSlide) * 53 - 50}%) translateY(-50%) ${!active ? 'scale(0.9)' : ''}`;
        let zIndex = active ? 3 : 2;
        if ((index === currentSlide +2) ) {
          zIndex = 1
        }
        const show = index === currentSlide || index === currentSlide -1 || index === currentSlide + 1
        return (
          <Box
            key={item.id}
            className={classnames({active: active})}
            zIndex={zIndex}
            transform={transform}
            width={width > 768 ? "479px" : "302px"}
            height={width > 768 ? "481px" : "305px"}
            borderRadius="16px"
            boxShadow={active ? "0 0 18px 0 rgba(0, 0, 0, 0.16)" : "unset"}
            display={show ? 'block' : 'none'}
          >
            <Image src={item.value}/>
            {active && (
              <>
                <Box className="singleCarousel__nav-left" onClick={handleLeftClicked}>
                  {width > 768 ?<ChevronLeft/> : <ChevronLeftR/>}
                </Box>
                <Box className="singleCarousel__nav-right" onClick={handleRightClicked}>
                  {width >   768 ?  <ChevronRight/> : <ChevronRightR/>}
                </Box>
              </>
            )}
          </Box>
        );
      })}
    </Box>
  );
});

export default Carousel;
