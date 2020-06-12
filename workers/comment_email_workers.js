const queue = require("../config/kue");
const commentMailer = require("../mailer/comment_Mailer");

// workers can be asssigned to same queue performing similar jobs 
// or to different queues depending upon the jobs

// process takes arguments as queue name and callback function which assigns job to the worker 
queue.process('emails', function(job, done){

    console.log("Emails worker is processing a job (comment)");

    commentMailer.newComment(job.data);
    
    done();
})