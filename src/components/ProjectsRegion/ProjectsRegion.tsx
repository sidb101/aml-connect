import "./ProjectsRegion.scss";

export interface IProjectsRegion {
    projects: string[];
}

export const ProjectsRegion = ({projects, ...props}: IProjectsRegion) => {
    return (<div className={"ProjectsRegion_container"}>

        {projects.map((project:string) =>
            <div className={"btn btn-solid ProjectsRegion_projectName"}>{project}</div>
        )}
    </div>)
}