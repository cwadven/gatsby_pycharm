import React, { FunctionComponent } from 'react';
import styles from '@emotion/styled';
import GlobalStyle from 'components/Common/GlobalStyle';
import Introduction from 'components/Main/Introduction';
import Footer from 'components/Main/Footer';
import CategoryList from 'components/Main/CategoryList';

const CATEGORY_LIST = {
    All: 5,
    Web: 3,
    Mobile: 2,
};

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
            <CategoryList selectedCategory="Web" categoryList={CATEGORY_LIST} />
            <Footer />
        </Container>
    );
};

export default IndexPage;
