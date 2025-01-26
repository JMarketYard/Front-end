import styled from "styled-components";

const BigTitle = ({children}:{children:string}) => {
    return (
        <BigTitleBox>
            <TitleIcon />
            {children}
        </BigTitleBox>
    )
}

export default BigTitle;

const BigTitleBox = styled.div`
    width: 1080px;
    height: 53px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid black;
    color: #000;
    font-family: Pretendard;
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`

const TitleIcon = styled.span`
    display: inline-block;
    width: 14px;
    height: 14px;
    background-color: #C908FF;
    border-radius: 50%;
    margin-right: 52px;
`