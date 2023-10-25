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
    const imageClassname = "highlighted-project-image " + projectInfo.displayTitle ? "programmatic-title" : "";
    return <section className="highlighted-project">
        <a style={projectInfo.color !== undefined ? {color: projectInfo.color} : {}} className="highlighted-project-title" href={projectInfo.url}>
            <img className={imageClassname} src={projectImagePath}/>
            { projectTitle }
        </a>
    </section>
}

export default HighlightedProjects;