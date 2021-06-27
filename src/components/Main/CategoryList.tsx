import React, { FunctionComponent, ReactNode } from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

export interface CategoryProps {
    selectedCategory: string;
    categoryList: {
        // 프로퍼티 이름은 문자열, 프로퍼티 값은 숫자임을 나타내는 타입 표기 방법
        [key: string]: number;
    };
}

const CategoryListWrapper = styled('div')(() => {
    return {
        display: 'flex',
        flexWrap: 'wrap',
        width: '768px',
        margin: '100px auto 0',
    };
});

type CategoryItemProps = {
    active: boolean;
};

type GatsbyLinkProps = {
    children: ReactNode;
    className?: string;
    to: string;
} & CategoryItemProps;

const CategoryItem = styled(({ active, to, ...props }: GatsbyLinkProps) => {
    return <Link to={to} {...props} />;
})`
    margin-right: 20px;
    padding: 5px 0;
    font-size: 18px;
    font-weight: ${({ active }) => (active ? '800' : '400')};
    cursor: pointer;

    &:last-of-type {
        margin-right: 0;
    }
`;

const CategoryList: FunctionComponent<CategoryProps> = props => {
    return (
        <CategoryListWrapper>
            {Object.entries(props.categoryList).map(([name, count]) => {
                return (
                    <CategoryItem
                        to={`/?category=${name}`}
                        active={name === props.selectedCategory}
                        key={name}
                    >
                        #{name}({count})
                    </CategoryItem>
                );
            })}
        </CategoryListWrapper>
    );
};

export default CategoryList;
