// kue is a library used for delaying jobs by creating queues for the jobs 
// executing them on the basis of priority and other criterias
const kue = require("kue");

const queue = kue.createQueue();

module.exports = queue;