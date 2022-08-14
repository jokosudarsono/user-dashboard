import * as Sentry from '@sentry/react';
import { useEffect } from 'react';
import { jsx, ThemeProvider } from '@emotion/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { theme } from 'components/themes/v1';

import RouteElement from 'routes/RouteElement';

import 'assets/styles/app.scss';

import i18n from 'libs/i18n';

// i18n init
i18n();

const App = (props) => {
  return (
    <ThemeProvider theme={theme}>
      {/* Init router */}
      <Router>
        <RouteElement />
      </Router>
    </ThemeProvider>
  );
};

export default Sentry.withProfiler(App);
