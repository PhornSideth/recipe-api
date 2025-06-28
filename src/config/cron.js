import cron from "cron"
import https from "https"
const job=new cron.CronJob("*/14 * * * * ",function (){
    https
    .get(process.env.API_URL,(res)=>{
        if(res.statusCode==200) console.log("Get request successful")
        else console.log("Get request failed with status code:", res.statusCode);
        
    })
    .on("error",(e)=> console.log("Error making GET request: ",e));
})
export default job;
//Cron JOB explaination:
//Cron jobs are scheduled tasks that run at specified intervals. In this case, the job is set to run every 14 minutes.
//we want to send a GET request for every 14 minutes so that our api never gets inactive on Render.com
//How to define a "Schedule"?
//You define a schedule using a cron expression, which consists of 5 fields representing :
//! MINUTES HOURS DAY_OF_MONTH MONTH DAY_OF_WEEK
//  * 14 * * * *  Every 14 minutes
//  * 0 * * * *   Every hour at minute 0
//* 0 0 * * 0  Every Sunday at midnight
//  * 0 0 1 * *  Every first day of the month at
//  * 0 0 * * 1  Every Monday at midnight