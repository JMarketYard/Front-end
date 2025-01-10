import styled from 'styled-components';
import imgLogo from '../assets/logo.png';
import searchUnion from '../assets/searchUnion.png'

const SearchBox = () => {
    return (
        <Wrapper>
            <Container>
                <TopContainer>
                    <button>로그인</button>
                    <div>알림</div>
                    <div>설정</div>
                </TopContainer>
                <SearchBoxContainer>
                    <div>
                        <LogoImg src={imgLogo} />
                    </div>
                    <div>카테고리</div>
                    <SearchBoxDiv>
                        <SearchInput type="text" />
                        <SearchSvg xmlns="http://www.w3.org/2000/svg" width="30" height="31" viewBox="0 0 30 31" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.9782 11.4423C19.9782 16.2748 16.268 20.1923 11.6913 20.1923C7.11451 20.1923 3.40432 16.2748 3.40432 11.4423C3.40432 6.60982 7.11451 2.69231 11.6913 2.69231C16.268 2.69231 19.9782 6.60982 19.9782 11.4423ZM18.4 20.429C16.5547 21.9668 14.2245 22.8846 11.6913 22.8846C5.70628 22.8846 0.854492 17.7617 0.854492 11.4423C0.854492 5.1229 5.70628 0 11.6913 0C17.6762 0 22.528 5.1229 22.528 11.4423C22.528 14.1168 21.659 16.5769 20.2029 18.5252L29.8045 28.6633L28.0015 30.5671L18.4 20.429Z" fill="#C908FF" fill-opacity="0.52"/>
                        </SearchSvg>
                    </SearchBoxDiv>
                    <div>관심</div>
                    <div>마이페이지</div>
                    <div>래플 업로드</div>
                </SearchBoxContainer>
            </Container>
        </Wrapper>
    );
}

export default SearchBox;

const Wrapper = styled.div`
    width: 1920px;
    display: flex;
    justify-content: center;
`

const Container = styled.div`
    padding-top: 48px;
    // background-color: red;
    display: flex;
    flex-direction: column;
    width: 1568.42px;
    height: 295px;
`

const TopContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`

const SearchBoxContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const LogoImg = styled.img`
    width: 243.746px;
    height: 117px;
`

const SearchBoxDiv = styled.div`
    position: relative;
`
const SearchInput = styled.input`
    width: 741.228px;
    height: 63px;
    border-radius: 51px;
    border: 2px solid #8F8E94;
`
const SearchSvg = styled.svg`
    position: absolute;
    right: 15.43px;
    top: 17px;
`