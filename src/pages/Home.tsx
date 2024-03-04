import ItemBox from '@components/ItemBox';
import { FlexCenterCSS, WidthAutoCSS } from '@src/Styles/common';
import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import useGetExhibitionListData from '@hooks/Queries/get-ExhibitionList';
import LoadingPage from '@components/Spinner/Spinner';
import { useLocation } from 'react-router-dom';
import LikeItemBox from '@components/ItemBox/likeItemBox';
import StarService from '@utils/StarService';

export const Home = () => {
  const { data, isLoading } = useGetExhibitionListData();
  const [likeList, setLikeList] = useState(StarService.getStar() || []);
  const location = useLocation();
  //
  //data를 filter로 처리
  //그걸 itembox에 줄수있다.
  useEffect(() => {
    setLikeList(StarService.getStar() || []);
  }, [location]);

  if (isLoading) return <LoadingPage />;
  if (data?.length === 0)
    return (
      <S.NotList>
        지금 하고있는 전시회가 없습니다.
        <div>전시회가 열리면 알려드릴게요</div>
      </S.NotList>
    );

  return (
    <div>
      <S.Wrapper>
        <>
          {data?.map((list, key) => (
            <ItemBox key={list.id} data={list} />
          ))}
        </>
      </S.Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  ${WidthAutoCSS}
  position: relative;
  height: 100dvh;
`;
const Footer = styled.div`
  position: fixed;
  bottom: 0;
  ${FlexCenterCSS}
`;
const FooterDiv = styled.div`
  cursor: pointer;
  width: 13.5rem;
  height: 7rem;
  ${FlexCenterCSS}
  flex-direction: column;
`;
const NotList = styled.div`
  ${FlexCenterCSS}
  flex-direction: column;
  height: 70dvh;
  font-size: 20px;
  font-weight: 600;
  & > div {
    color: gray;
    margin-top: 1rem;
  }
`;
const S = { Wrapper, Footer, FooterDiv, NotList };
