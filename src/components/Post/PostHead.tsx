import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import Img, { FluidObject } from 'gatsby-image';
import PostHeadInfo, { PostHeadInfoProps } from './PostHeadInfo';

type GatsbyImgProps = {
    fluid: FluidObject;
    alt: string;
    className?: string;
};

// 상속 받기
export interface PostHeadProps extends PostHeadInfoProps {
    thumbnail: {
        childImageSharp: {
            fluid: FluidObject;
        };
    };
}

const PostHeadWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 400px;
`;

const BackgroundImage = styled((props: GatsbyImgProps) => (
    <Img {...props} style={{ position: 'absolute' }} />
))`
    z-index: -1;
    width: 100%;
    height: 400px;
    object-fit: cover;
    filter: brightness(0.25);
`;

const PostHead: FunctionComponent<PostHeadProps> = function ({
    title,
    date,
    categories,
    thumbnail: {
        childImageSharp: { fluid },
    },
}) {
    return (
        <PostHeadWrapper>
            <BackgroundImage fluid={fluid} alt="thumbnail" />
            <PostHeadInfo title={title} date={date} categories={categories} />
        </PostHeadWrapper>
    );
};

export default PostHead;
