// build your `Project` model here
const db = require("../../data/dbConfig");

async function postProject(data) {
    const projectId = await db("projects").insert(data);
    const projectData = await getProjectById(projectId[0]);

    // const result = projectData.map(data => {
    //     return data = {
    //         project_id: data.project_id,
    //         project_name: data.project_name,
    //         project_description: data.project_description,
    //         project_completed: data.project_completed ? "true" : "false"
    //     }
    // })
    const result = {
        project_id: projectData.project_id,
        project_name: projectData.project_name,
        project_description: projectData.project_description,
        project_completed: projectData.project_completed ? true : false
    }

    return result ;
}

async function getProject() {
    const projectData = await db("projects")
    const result = projectData.map(data => {
        return data = {
            project_id: data.project_id,
            project_name: data.project_name,
            project_description: data.project_description,
            project_completed: data.project_completed ? true : false
        }
    })

    return result;
}

async function getProjectById(id) {
    const result = await db("projects").where("projects.project_id", id);
    return result[0];
}

module.exports = {
    postProject,
    getProject
}