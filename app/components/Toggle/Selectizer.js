import styled from 'styled-components';

const Selectizer = styled.div`
  position: relative;
  width: 100%;
  svg {
    position: absolute;
    right: ${localStorage.getItem('lang') === 'fa' ? 'auto' : '2px'};
    left: ${localStorage.getItem('lang') === 'fa' ? '2px' : 'auto'};
    font-size: 7px;
    width: 30px !important;
    top: 50%;
    transform: translate(0, -50%);
    height: 10px;
    background: #fff;
    pointer-events: none;
  }
`;

export default Selectizer;
