// const queue = require("../config/kue");
// const postMailer = require("../mailer/post_Mailer");

// // workers can be asssigned to same queue performing similar jobs --> adding post-email-workers in the same queue
// // or to different queues depending upon the jobs

// // process takes arguments as queue name and callback function which assigns job to the worker 
// queue.process('emails', function(job, done){

//     console.log("Emails worker is processing a job (post)");

//     postMailer.newPost(job.data);
    
//     done();
// })