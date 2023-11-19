// build your `Task` model here
const db = require("../../data/dbConfig");

async function postTask(data) {
    const taskId = await db("tasks").insert(data)
    const taskData = await getTaskById(taskId);
    const result = {
        task_id: taskData.task_id,
        task_description: taskData.task_description,
        task_notes: taskData.task_notes,
        task_completed: taskData.task_completed ? true : false,
        project_id: taskData.project_id
    }
    return result;
}

async function getTaskById(id) {
    const taskData = await db("tasks").join("projects").where("tasks.task_id", id);
    return taskData[0];
}

async function getTasks() {
    const tasksData = await db("tasks")
        .leftJoin("projects", "projects.project_id", "tasks.project_id")
        .select(
            "tasks.task_id",
            "tasks.task_description",
            "tasks.task_notes",
            "tasks.task_completed",
            "projects.project_name",
            "projects.project_description",
            "tasks.project_id"
        )
    const result = tasksData.map(data => {
        return data = {
            task_id: data.task_id,
            task_description: data.task_description,
            task_notes: data.task_notes,
            task_completed: data.task_completed ? true : false,
            project_name: data.project_name,
            project_description: data.project_description
        }
    })

    return result;
}


module.exports = {
    postTask,
    getTasks,
}