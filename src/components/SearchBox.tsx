import styled from 'styled-components';
import imgLogo from '../assets/searchBox/logo.png';
import hamburgerBars from '../assets/searchBox/hamburgerBars.png';
import ticket from '../assets/searchBox/ticket.png';
import icNotice from '../assets/searchBox/icon-notice.svg';
import icSetting from '../assets/searchBox/icon-setting.svg';
import icSearch from '../assets/searchBox/icon-search.svg';
import icHeart from '../assets/searchBox/icon-heart.svg';
import icUpload from '../assets/searchBox/icon-upload.svg';

const SearchBox = () => {
    return (
        <Wrapper>
            <Container>
                <TopContainer>
                    <LoginBtn>로그인</LoginBtn>
                    <LineDiv height={'47px'} margin={'0 17px 0 21px'} />
                    <SmallIconDiv>
                        <img src={icNotice} />
                        <IconTextDiv fontSize={'16px'}>알림</IconTextDiv>
                    </SmallIconDiv>
                    <LineDiv height={'47px'} margin={'0 17px 0 21px'} />
                    <SmallIconDiv>
                        <img src={icSetting} />
                        <IconTextDiv fontSize={'16px'}>설정</IconTextDiv>
                    </SmallIconDiv>
                </TopContainer>
                <SearchBoxContainer>
                    <div>
                        <LogoImg src={imgLogo} />
                    </div>
                    <IconDiv>
                        <img src={hamburgerBars} width={32} />
                        <IconTextDiv fontSize={'18px'}>카테고리</IconTextDiv>
                    </IconDiv>
                    <SearchBoxDiv>
                        <TicketImg src={ticket} />
                        <SearchInput type="text" />
                        <SearchIcon src={icSearch} />
                    </SearchBoxDiv>
                    <IconDiv>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 33 32" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.32846 17.7173L2.89898 17.241C2.88447 17.2249 2.87002 17.2088 2.85563 17.1927C2.85563 17.1927 2.85564 17.1927 2.85563 17.1927C2.8428 17.1783 2.83001 17.1639 2.81728 17.1494C-0.662726 13.1985 -0.635497 6.87181 2.89897 2.95809C6.46089 -0.98603 12.2359 -0.986029 15.7978 2.95809L16.2276 3.43403L16.6573 2.95831C20.2192 -0.985812 25.9942 -0.985819 29.5561 2.9583C33.118 6.90241 33.118 13.2971 29.5561 17.2412L29.1265 17.7169L16.2278 32L3.32846 17.7173ZM16.2273 27.6411L7.26711 17.7195L4.86732 15.0615C2.39248 12.3211 2.39247 7.87802 4.86731 5.13763C7.34214 2.39724 11.3546 2.39724 13.8295 5.13763L16.2276 7.79311L18.6256 5.13785C21.1004 2.39745 25.1129 2.39745 27.5878 5.13784C30.0626 7.87823 30.0626 12.3213 27.5878 15.0617L25.199 17.7067L16.2273 27.6411Z" fill="black"/>
                        </svg>
                        <IconTextDiv fontSize={'18px'}>관심</IconTextDiv>
                    </IconDiv>
                    <LineDiv height={'78px'} margin={'0 3px 0 7px'} />
                    <IconDiv>
                        <img src={icHeart} />
                        <IconTextDiv fontSize={'18px'}>마이페이지</IconTextDiv>
                    </IconDiv>
                    <UploadBtn>
                        <img src={icUpload} />
                        <IconTextDiv fontSize={'14px'} fontWeight={'light'} color={'white'}>래플 업로드</IconTextDiv>
                    </UploadBtn>
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
    // align-items: center;
    width: 1568.42px; // 1920-(상단바 양옆 공백 너비)
    height: 295px;
`

const TopContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 0 34px 53px 0;
`

const LoginBtn = styled.button`
    width: 111.883px;
    height: 30px;
    border-radius: 40px;
    border: 1px solid #8F8E94;
    background-color: transparent;
    color: #8F8E94;
    font-family: Pretendard;
    font-size: 15px;
    font-weight: 600;
    line-height: 18px;
    letter-spacing: -0.165px;
    margin-right: 25px;
    cursor: pointer;
`

const IconTextDiv = styled.div<{fontSize:string, color?:string, fontWeight?:string}>`
    font-size: ${props => props.fontSize};
    color: ${props => props.color || '#8F8E94'};
    text-align: center;
    font-family: Pretendard;
    font-style: normal;
    font-weight: ${props => props.fontWeight || '600'};
    line-height: 18px;
    letter-spacing: -0.165px;
`

const SearchBoxContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const LogoImg = styled.img`
    width: 243.746px;
    height: 117px;
    margin-right: 25px;
`

const SearchBoxDiv = styled.div`
    position: relative;
    width: 741.228px;
    height: 63px;
    border-radius: 51px;
    border: 2px solid #8F8E94;
    box-sizing: border-box;
    padding: 3px 70px 3px 30px;
`

const TicketImg = styled.img`
    position: absolute;
    bottom: 105%;
    left: 50%;
    transform: translateX(-50%);
`

const SearchInput = styled.input`
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    font-size: 23px;
    font-family: Pretendard;
    font-style: normal;
    line-height: 18px;
    letter-spacing: -0.165px;
`

const SearchIcon = styled.img`
    position: absolute;
    right: 27px;
    top: 15px;
    cursor: pointer;
`

const SmallIconDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    height: 65px;
    margin: 0 21px 0 25px;
    cursor: pointer;
`

const IconDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    height: 85px;
    min-width: 80px;
    margin: 0 21px 0 25px;
    cursor: pointer;
`

const UploadBtn = styled.button`
    color: white;
    background-color: #C908FF;
    border-radius: 15px;
    border: none;
    width: 98.897px;
    height: 99px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    padding: 10px 10px 8px 11px;
    cursor: pointer;
    margin-left: 13px;
`

const LineDiv = styled.div<{height:string, margin:string}>`
    width: 1px;
    height: ${props => props.height};
    background: #8F8E94;
    margin: ${props => props.margin};
`