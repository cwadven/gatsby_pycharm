import React, { FunctionComponent } from 'react';
import styles from '@emotion/styled';
import GlobalStyle from 'components/Common/GlobalStyle';
import Introduction from 'components/Main/Introduction';
import Footer from 'components/Main/Footer';

const Container = styles.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`;

const IndexPage: FunctionComponent = function () {
    return (
        <Container>
            <GlobalStyle />
            <Introduction />
            <Footer />
        </Container>
    );
};

export default IndexPage;
