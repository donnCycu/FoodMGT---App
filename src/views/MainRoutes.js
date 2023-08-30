import React from 'react';
import {Link} from 'react-router-dom';
import {Box, Flex, Text} from "@chakra-ui/react";
import {AiOutlineArrowLeft, AiOutlineArrowRight} from "react-icons/ai";

const MainRoutes = () => {
    const panelData = [
        {
            title: "Panel administracyjny",
            route: "/dashboard",
        },
        {
            title: "Panel pracownika",
            route: "/employeepanel",
        },
        {
            title: "Panel logowania",
            route: "/login",
        },
        {
            title: "Logowanie - pracownik",
            route: "/loginemployee",
        },
    ];
    return (
        <Flex alignItems="center" justifyContent="start" flexDirection="column" py={10} width="full" height="100vh" bgGradient="linear(to-br, #ED8245 -190%, #ffffff 100%)">
            <Text mb={2} fontWeight={500} fontSize="1.2rem">Projekt aplikacji dla branży gastronomicznej, który miałby pomóc restauratorom w poprawnym funkcjonowaniu ich lokali.</Text>
            <Text>Poniższe buttony to odnośniki do poszczególnych widoków aplikacji.</Text>
            <Text>Ze względu na brak dostępnych rozwiązań API nadających się do aplikacji, ich ilość jest znikoma.</Text>
            <Text>Projekt jest na etapie dalszego rozwoju, codziennie pojawia się update, który można śledzić na moim GitHubie</Text>
            <Flex direction="row" justifyContent="space-between" flexWrap="wrap" mt={14} w="40%">
                {panelData.map((panel, index) => (
                    <Box key={index} display="flex" flexDirection="column" alignItems="start" justifyContent="start" mt={4} p={4} width="200px" height="100px" borderRadius="15px" border="1px solid #ED8245" boxShadow="2xl">
                        <Text mb={4} fontWeight={500} fontSize="0.8rem">{panel.title}</Text>
                        <Flex alignItems="center">
                            <AiOutlineArrowRight/>
                            <Link to={panel.route}>{panel.route.split('/').pop()}</Link>
                            <AiOutlineArrowLeft/>
                        </Flex>
                    </Box>
                ))}
            </Flex>
        </Flex>
    );
};

export default MainRoutes;
