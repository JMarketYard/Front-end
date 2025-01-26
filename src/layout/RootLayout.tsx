import styled from "styled-components";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import HeaderIconMenu from "../components/HeaderIconMenu";

const RootLayout = () => {
    return (
        <Wrapper>
            <Header />
            <HeaderIconMenu />
            <Outlet />
        </Wrapper>
    );
};

export default RootLayout;

const Wrapper = styled.div`
    // min-width: 1440px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`