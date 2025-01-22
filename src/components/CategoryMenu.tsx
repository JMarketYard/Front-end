import styled from "styled-components";

const CategoryMenu = ({clicked}:{clicked:boolean}) => {
    return (
        <CategoryUl show={String(clicked)}>
            <CategoryLi>전체 카테고리</CategoryLi>
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
    width: 414px;
    position: absolute;
    top: 45px;
    left: -55px;
    ${props => props.show === 'true' ?
        'display: block'
        :
        'display: none'
    }
`

const CategoryLi = styled.li`
    list-style: none;
`