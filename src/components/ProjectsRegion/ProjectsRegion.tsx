import "./ProjectsRegion.scss";

export type ProjectsRegionT = {
    projects: string[];
};

export const ProjectsRegion = ({ projects, ...props }: ProjectsRegionT) => (
    <div className={"ProjectsRegion_container"}>
        {projects.map((project: string, index) => (
            <div
                key={index}
                className={"btn btn-solid ProjectsRegion_projectName"}
            >
                {project}
            </div>
        ))}
    </div>
);
