import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Layout } from 'components/themes/v1';

import { Breadcrumb } from 'components/themes/v1'

const Title = styled.div`
  color: #767676;
  font-size: 120px;
  font-weight: bold;
  text-align: center;
`;

const Description = styled.div`
  color: #767676;
  font-size: 38px;
  font-weight: bold;
  text-align: center;
`;

const Page404 = (props) => {
  const { t } = useTranslation();

  return (
    <Layout>
      <Container>
        <Row>
          <Col>
            <Title>404</Title>
            <Description>Page Not Found!</Description>
          </Col>
        </Row>
        <Breadcrumb />
      </Container>
    </Layout>
  );
};

export default Page404;
