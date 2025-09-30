import React from 'react';
import highlightedProjectData from '../data/highlighted-projects.yaml';
import './highlighted-projects.css';

const HighlightedProjects = props => {
    const highlightedProjects = highlightedProjectData.map(project => <HighlightedProject key={project.url} project={project}/>);
    return <section id="highlighted-projects">
        <h2>Highlighted Projects</h2>
        <section id="highlighted-projects-container">
            { highlightedProjects }
        </section>
    </section>
}

const HighlightedProject = props => {
    const projectInfo = props.project;
    const projectImagePath = "/images/highlighted-projects/" + projectInfo.title.toLowerCase().replaceAll(" ", "-") + ".svg";
    const projectTitle = projectInfo.displayTitle ? projectInfo.title : null;
    const imageClassname = "highlighted-project-image " + (projectInfo.displayTitle ? "programmatic-title" : "");

    const titleStyle = {};
    if(projectInfo.color !== undefined) titleStyle["color"] = projectInfo.color;
    const sectionStyle = {};
    if(projectInfo.width !== undefined) sectionStyle["width"] = projectInfo.width;
    if(projectInfo.titleSize !== undefined) sectionStyle["fontSize"] = projectInfo.titleSize;
    const imgStyle = {};
    if(projectInfo.width !== undefined) imgStyle["width"] = projectInfo.width;

    return <section className="highlighted-project" style={sectionStyle}>
        <a style={titleStyle} className="highlighted-project-title" href={projectInfo.url}>
            <img className={imageClassname} style={imgStyle} src={projectImagePath}/>
            { projectTitle }
        </a>
    </section>
}

export default HighlightedProjects;
