import React from 'react';
import styled from 'styled-components';
import DetailContent from './DetailContent/DetailContent';
import DetailReviews from './DetailReviews/DetailReviews';

function Detail() {
  // 이레 부분 백엔드 통신을 위해 사용
  // const params = useParams();
  // const { bookId } = params;
  // const Authorizaition = sessionStorage.getItem('Authorizaition') || '';
  // const [book, setBook] = useState({})

  // TODO 백엔드 통신 상세페이지 내용 받기
  // useEffect(() => {
  //   fetch('', {
  //     headers: { Authorizaition: Authorizaition },
  //   });
  // }, [Authorizaition])
  //   .then(res => res.json())
  //   .then(res => setBook(res.result));

  return (
    <DetailWrapper>
      <DetailContent />
      <DetailReviews />
    </DetailWrapper>
  );
}

export default Detail;

const DetailWrapper = styled.div`
  max-width: 1040px;
  padding: 0 20px;
  margin: 20px auto;
`;
