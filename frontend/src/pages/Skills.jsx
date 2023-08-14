import React, { useState, useEffect } from "react";

import SkillsFilter from "../components/SkillsFilter";
import SpinComponent from "../components/SpinComponent";
import { getSkillList } from "../apis/SkillList";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { Accordion, AccordionSummary, Typography, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import "../styles/Home.css";

const Skills = () => {
    const [skills, setSkills] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            const result = await getSkillList();
            setSkills(result);
            setIsLoading(false);
        };
        fetchData();
    }, []);

    const [showScrollButton, setShowScrollButton] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > 100) {
                setShowScrollButton(true);
            } else {
                setShowScrollButton(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const scrollToBottom = () => {
        window.scrollTo({ top: document.body.offsetHeight, behavior: "smooth" });
    };

    return (
        <div className="home">
            <div className="skills">
                {isLoading ? (<SpinComponent />) : (
                    <div className="list">
                        <Accordion defaultExpanded>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h6">OS</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <SkillsFilter topic="os" skills={skills} />
                            </AccordionDetails>
                        </Accordion>

                        <Accordion defaultExpanded>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h6">Programming Languages</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <SkillsFilter topic="language" skills={skills} />
                            </AccordionDetails>
                        </Accordion>

                        <Accordion defaultExpanded>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h6">Infrastructure Tools</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <SkillsFilter topic="tools" skills={skills} />
                            </AccordionDetails>
                        </Accordion>

                        <Accordion defaultExpanded>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h6">Databases</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <SkillsFilter topic="database" skills={skills} />
                            </AccordionDetails>
                        </Accordion>

                        <Accordion defaultExpanded>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h6">Backend</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <SkillsFilter topic="backend" skills={skills} />
                            </AccordionDetails>
                        </Accordion>

                        <Accordion defaultExpanded>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h6">Frontend</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <SkillsFilter topic="frontend" skills={skills} />
                            </AccordionDetails>
                        </Accordion>

                        <Accordion defaultExpanded>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h6">Automation & IOT Stuff</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <SkillsFilter topic="automation" skills={skills} />
                            </AccordionDetails>
                        </Accordion>
                    </div>
                )}
            </div>
            <KeyboardArrowUpIcon
                className={`scroll-button ${showScrollButton ? "visible" : ""}`}
                onClick={scrollToTop}
            >
            </KeyboardArrowUpIcon>
            <KeyboardArrowDownIcon
                className={`scroll-button ${!showScrollButton ? "visible" : ""}`}
                onClick={scrollToBottom}
            >
            </KeyboardArrowDownIcon>
        </div>
    );
};

export default Skills;
