import styled from '@emotion/styled';

const ErrorContainer = styled.div`
  color: '#000';
  background: '#fff';
  font-family: '-apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Fira Sans", Avenir, "Helvetica Neue", "Lucida Grande", sans-serif';
  height: '100vh';
  text-align: 'center';
  display: 'flex';
  flex-direction: 'column';
  align-items: 'center';
  justify-content: 'center';
`;

const Desc = styled.div`
  font-size: '14px';
  font-weight: 'normal';
  margin: 0;
  padding: 0;
`;

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <ErrorContainer>
      <Desc>Something went wrong:</Desc>
      <pre>{error.message}</pre>
      {/* <button className='btn btn-info' onClick={resetErrorBoundary}>Reload</button> */}
    </ErrorContainer>
  );
};

export default ErrorFallback;
