import styled from "styled-components";

const CategoryMenu = ({clicked}:{clicked:boolean}) => {
    return (
        <CategoryUl show={String(clicked)}>
            <CategoryName>전체 카테고리</CategoryName>
            <CategoryLi>여성의류</CategoryLi>
            <CategoryLi>남성의류</CategoryLi>
            <CategoryLi>신발</CategoryLi>
            <CategoryLi>악세사리</CategoryLi>
            <CategoryLi>디지털</CategoryLi>
            <CategoryLi>가전제품</CategoryLi>
            <CategoryLi>스포츠/레저</CategoryLi>
            <CategoryLi>차량/오토바이</CategoryLi>
            <CategoryLi>굿즈</CategoryLi>
            <CategoryLi>예술/희귀/수집품</CategoryLi>
            <CategoryLi>음반/악기</CategoryLi>
            <CategoryLi>도서/티켓/문구</CategoryLi>
            <CategoryLi>뷰티</CategoryLi>
            <CategoryLi>인테리어</CategoryLi>
            <CategoryLi>생활용품</CategoryLi>
            <CategoryLi>공구/산업용품</CategoryLi>
            <CategoryLi>식품</CategoryLi>
            <CategoryLi>유아</CategoryLi>
            <CategoryLi>반려동물</CategoryLi>
            <CategoryLi>기타</CategoryLi>
            <CategoryLi>재능</CategoryLi>
        </CategoryUl>
    )
}

export default CategoryMenu;

const CategoryUl = styled.ul<{show:string}>`
    width: 200px;
    position: absolute;
    top: 45px;
    left: -65px;
    ${props => props.show === 'true' ?
        'display: block'
        :
        'display: none'
    }
`

const CategoryName = styled.li`
    list-style: none;
    height: 36px;
    border: 1px solid #8F8E94;
    background: #FFF;
    display: flex;
    align-items: center;
    padding: 0 15px;
    font-size: 15.5px;
    font-weight: 700;
    color: #000;
    font-family: Pretendard;
    font-style: normal;
    line-height: 45px; /* 204.545% */
    letter-spacing: -0.165px;
    &:hover {
        cursor: default;
    }
`

const CategoryLi = styled.li`
    list-style: none;
    height: 36px;
    background: #FFF;
    display: flex;
    align-items: center;
    padding: 4px 0 0 15px;
    font-size: 14px;
    font-weight: 400;
    color: #000;
    font-family: Pretendard;
    font-style: normal;
    line-height: 45px; /* 204.545% */
    letter-spacing: -0.165px;
    &:hover {
        cursor: pointer;
    }
`