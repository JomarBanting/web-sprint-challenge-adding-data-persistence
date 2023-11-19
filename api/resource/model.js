// build your `Resource` model here
const db = require("../../data/dbConfig");

async function postResources(data){
    const resultId = await db("resources").insert(data)
    return getResourcesById(resultId[0]);
}

async function getResources() {
    const result = await db("resources")
    return result;
}

async function getResourcesById(id){
    const result = await db("resources").where("resources.resource_id", id);
    return result[0];
}

module.exports = {
    postResources,
    getResources,
}