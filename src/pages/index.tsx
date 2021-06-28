import React, { FunctionComponent } from 'react';
import styles from '@emotion/styled';
import GlobalStyle from 'components/Common/GlobalStyle';
import Introduction from 'components/Main/Introduction';
import Footer from 'components/Main/Footer';
import CategoryList from 'components/Main/CategoryList';
import PostList, { PostType } from 'components/Main/PostList';
import { ProfileImageProps } from 'components/Main/ProfileImage';
import { graphql } from 'gatsby';

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

interface IndexPageProps {
    data: {
        allMarkdownRemark: {
            edges: PostType[];
        };
        file: {
            childImageSharp: {
                fluid: ProfileImageProps['profileImage'];
            };
        };
    };
}

const IndexPage: FunctionComponent<IndexPageProps> = props => {
    return (
        <Container>
            <GlobalStyle />
            <Introduction
                profileImage={props.data.file.childImageSharp.fluid}
            />
            <CategoryList selectedCategory="Web" categoryList={CATEGORY_LIST} />
            <PostList posts={props.data.allMarkdownRemark.edges} />
            <Footer />
        </Container>
    );
};

export default IndexPage;

export const queryPostList = graphql`
    query queryPostList {
        allMarkdownRemark(
            sort: {
                order: DESC
                fields: [frontmatter___date, frontmatter___title]
            }
        ) {
            edges {
                node {
                    id
                    frontmatter {
                        title
                        summary
                        date(formatString: "YYYY.MM.DD.")
                        categories
                        thumbnail {
                            childImageSharp {
                                fluid(
                                    maxWidth: 768
                                    maxHeight: 200
                                    fit: INSIDE
                                    quality: 100
                                ) {
                                    ...GatsbyImageSharpFluid_withWebp
                                }
                            }
                        }
                    }
                }
            }
        }
        file(name: { eq: "profile-image" }) {
            childImageSharp {
                fluid(
                    maxWidth: 120
                    maxHeight: 120
                    fit: INSIDE
                    quality: 100
                ) {
                    ...GatsbyImageSharpFluid_withWebp
                }
            }
        }
    }
`;
