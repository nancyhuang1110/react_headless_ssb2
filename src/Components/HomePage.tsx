import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { SearchEngine } from '@coveo/headless';
import { EngineProvider } from '../common/engineContext';
import { StandaloneSearchBox } from './StandaloneSearchBox';

interface ISearchPageProps {
  engine: SearchEngine;
}

const HomePage: React.FunctionComponent<ISearchPageProps> = (props) => {
  const { engine } = props;
  // TODO: not sure this is needed
  useEffect(() => {
    engine.executeFirstSearch();
  }, [engine]);

  return (
    <EngineProvider value={engine}>
      <Container maxWidth="lg">
        <Grid container justifyContent="center">
          <StandaloneSearchBox id="ssb-1" redirectionUrl="/search" />
        </Grid>
      </Container>
    </EngineProvider>
  );
};

export default HomePage;
