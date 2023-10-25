import highlightedProjectData from '../data/highlighted-projects.yaml';
import './highlighted-projects.css';

const HighlightedProjects = props => {
    const highlightedProjects = highlightedProjectData.map(project => <HighlightedProject key={project.url} project={project}/>);
    return <section id="highlighed-projects">
        <h3>Highlighted Projects</h3>
        { highlightedProjects }
    </section>
}

const HighlightedProject = props => {
    const projectInfo = props.project;  
    const projectImagePath = projectInfo.title.toLowerCase().replaceAll(" ", "-") + ".svg";
    return <section className="highlighted-project">
        <a href={projectInfo.url}>
            <img className="highlighted-project-image" src={projectImagePath}/>
            { projectInfo.title }
        </a>
    </section>
}

export default HighlightedProjects;