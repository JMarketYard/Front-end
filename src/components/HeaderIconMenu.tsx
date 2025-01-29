import styled from "styled-components";
import media from "../styles/media";

const HeaderIconMenu = () => {
    return (
        <Wrapper>
            <IconMenu></IconMenu>
            <IconMenu></IconMenu>
            <IconMenu></IconMenu>
            <IconMenu></IconMenu>
            <IconMenu></IconMenu>
        </Wrapper>
    );
};

export default HeaderIconMenu;

const Wrapper = styled.div`
    display: flex;
    // column-gap: 1rem;
    justify-content: space-around;
`

const IconMenu = styled.div`
    background-color: #F4F4F4;
    border-radius: 100%;
    box-sizing: border-box;
    ${media.medium`
        width: 84.302px;
        height: 86px;
        margin: 39px 0 55px 0;
    `}
    ${media.small`
        width: 58.815px;
        height: 60px;
        margin: 15px 0 22px 0;
    `}
`