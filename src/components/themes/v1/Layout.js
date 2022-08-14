import styled from '@emotion/styled';
import { Header } from '.';
import { theme } from 'components/themes/v1';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow-y: auto;
`;

/** Default layout */
const Layout = ({ children }) => {
  return (
    <Wrapper>
      <Header />

      {children}
    </Wrapper>
  );
};

export default Layout;
