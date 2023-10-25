import highlightedProjectData from './highlighted-projects.yaml';
import  './highlighed-projects.css';

const HighlightedProjects = props => {
    const highlightedProjects = highlightedProjectData.map(project => <HighlightedProject key={project.url} project={project}/>);
    return <section id="highlighed-projects">
        <h3>Highlighted Projects</h3>
        { highlightedProjects }
    </section>
}

const HighlightedProject = props => {
    const projectInfo = props.project;
    // Projects with titles in the logo already won't have a titleText
    const projectTitle = projectInfo.title ? <a href={projectInfo.url}>{projectInfo.title}</a> : null;  
    const projectImagePath = projectInfo.title.toLowerCase().replaceAll(" ", "-") + ".svg";
    return <section className="highlighted-project">
        <img className="highlighted-project-image" src={projectImagePath}/>
        { projectTitle }
    </section>
}

export default HighlightedProjects;