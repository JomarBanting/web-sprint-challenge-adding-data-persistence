// build your `Task` model here
const db = require("../../data/dbConfig");

async function postTask(data){
    const taskId = await db("tasks").insert(data)
    const taskData = await getTaskById(taskId);
    const result = {
        task_id: taskData.task_id,
        task_description: taskData.task_description,
        task_notes: taskData.task_notes,
        task_completed: taskData.task_completed ? true : false,
        project_name: taskData.project_name,
        project_description: taskData.project_description
    }
    return result;
}

async function getTaskById(id){
    const taskData = await db("tasks").where("tasks.task_id", id);
    return taskData[0];
}

async function getTasks(){
    const tasksData = await db("tasks as t")
    .join("projects as p")
    .select(
        "t.task_id", 
        "t.task_description",
        "t.task_notes",
        "t.task_completed",
        "p.project_name",
        "p.project_description"
        )
    const result = {
        task_id: tasksData[0].task_id,
        task_description: tasksData[0].task_description,
        task_notes: tasksData[0].task_notes,
        task_completed: tasksData[0].task_completed ? true : false,
        project_name: tasksData[0].project_name,
        project_description: tasksData[0].project_description
    }
    return tasksData;
}

module.exports = {
    postTask,
    getTasks,
}