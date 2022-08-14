import { lazy, Suspense } from 'react';
import { Layout } from 'components/themes/v1';

const Home = lazy(() => import('containers/Home'));

const HomePage = (props) => (
  <Layout>
    <Suspense fallback={null}>
      <Home />
    </Suspense>
  </Layout>
);

export default HomePage;
