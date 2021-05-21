import React from "react";
import styled from "styled-components";

const Login = (props) => {
    return (
        <Container>
            <Content>
                <CTA>
                    <CTALogoOne src="/assets/images/cta-logo-one.svg" alt="" />
                    <SignUp>GET ALL THERE</SignUp>
                    <Description>
                        Get Premier Access to Raya and the Last Dragon for an
                        additional fee with a Disney+ subscription. As of
                        03/26/21 Disney+ and The Disney Bundle will increase by
                        $1.
                    </Description>
                    <CTALogoTwo src="/assets/images/cta-logo-two.png" alt="" />
                </CTA>
                <BgImage />
            </Content>
        </Container>
    );
};

const Container = styled.section`
    overflow: hidden;
    display: flex;
    flex-direction: column;
    text-align: center;
    height: 100vh;
`;

const Content = styled.div`
    margin-bottom: 10vw;
    width: 100%;
    position: relative;
    min-height: 100vh;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 10px 40px;
    height: 100%;
`;

const BgImage = styled.div`
    height: 100%;
    background-position: top;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url("/assets/images/login-background.jpg");
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: -1;
`;

const CTA = styled.div`
    max-width: 650px;
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const CTALogoOne = styled.img`
    margin-bottom: 12px;
    max-width: 650px;
    min-height: 1px;
    display: block;
    width: 100%;
`;

const CTALogoTwo = styled.img`
    max-width: 650px;
    margin-bottom: 20px;
    width: 100%;
    display: inline-block;
    vertical-align: bottom;
`;

const SignUp = styled.a`
    font-weight: bold;
    color: #fff;
    background-color: #0063e5;
    margin-bottom: 12px:
    width: 100%;
    letter-spacing: 1.5px;
    font-size: 18px;
    padding: 16.5px 0;
    border 1px solid transparent;
    border-radius: 4px;
    &:hover {
        background-color: #0483ee;
    };
`;

const Description = styled.p`
    margin: 10px 0 24px;
    color: hsla(0, 0%, 95.3%, 1);
    font-size: 14px;
    line-height: 1.5;
    letter-spacing: 1.5px;
`;

export default Login;
