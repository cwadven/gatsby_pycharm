import { MutableRefObject, useState, useEffect, useRef, useMemo } from 'react';
import { PostType } from 'components/Main/PostList';

export type useInfiniteScrollType = {
    containerRef: MutableRefObject<HTMLDivElement | null>;
    postList: PostType[];
};

const NUMBER_OF_ITEMS_PER_PAGE = 4;

const useInfiniteScroll = function (
    selectedCategory: string,
    posts: PostType[],
): useInfiniteScrollType {
    const containerRef: MutableRefObject<HTMLDivElement | null> =
        useRef<HTMLDivElement>(null);

    const [count, setCount] = useState<number>(1);

    // 어떤 글들을 내보낼 것인지 보낸다
    const postListByCategory = useMemo<PostType[]>(() => {
        return posts.filter(
            ({
                node: {
                    frontmatter: { categories },
                },
            }: PostType) => {
                return selectedCategory !== 'All'
                    ? categories.includes(selectedCategory)
                    : true;
            },
        );
    }, [selectedCategory]);

    const observer = useRef<IntersectionObserver>();

    // 처음 observer 가 무엇을 할 것인지 정의
    useEffect(() => {
        observer.current = new IntersectionObserver((entries, observer) => {
            // observer 가 정한 entries 중에서 entry의 처음이 인식 하면 count를 올리고 전부 끝내라
            if (entries[0].isIntersecting) {
                setCount(prevState => {
                    return prevState + 1;
                });
                observer.disconnect();
            }
        });
    }, [count]);

    // 카테고리가 바뀌면 다시 맨 처음부터 하기 위해서
    useEffect(() => setCount(1), [selectedCategory]);

    useEffect(() => {
        if (
            NUMBER_OF_ITEMS_PER_PAGE * count >= postListByCategory.length ||
            containerRef.current === null ||
            containerRef.current.children.length === 0
        )
            return;

        // 마지막을 바라보도록 설정
        observer.current?.observe(
            containerRef.current.children[
                containerRef.current.children.length - 1
            ],
        );
    }, [count, selectedCategory]);

    return {
        containerRef,
        postList: postListByCategory.slice(0, count * NUMBER_OF_ITEMS_PER_PAGE),
    };
};

export default useInfiniteScroll;
