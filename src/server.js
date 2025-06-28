import express from 'express'
import {ENV} from './config/env.js'
import "dotenv/config.js"
import {and, eq} from 'drizzle-orm'
import {db} from './config/db.js'
import { FavoriteTable } from './db/schema.js'
import job from './config/cron.js'
if(ENV.NODE_ENV =="production") job.start()
const app=express()
app.use(express.json())
const PORT=ENV.PORT || 5000
app.get("/api/health",(req,res)=>{
    res.status(200).json({success :true})
})
app.post("/api/favorite",async (req,res)=>{
   try{
       const {userId,recipeId,title,image,cookTime,serving}=req.body;

       if(!userId || !recipeId || !title){
              return res.status(400).json({error:"Missing required fields"})
       }
     const NewFavorite=  await db.insert(FavoriteTable).values({
        userId,recipeId,title,image,cookTime,serving
       }).returning()
         res.status(201).json({success:true,favorite:NewFavorite})
    }catch(error){
          console.log("Error adding favorite:", error);
          res.status(500).json({error:"Internal server error"})
    }
})
app.delete("/api/favorite/:userId/:recipeId",async(req,res)=>{
    try{
        const {userId,recipeId}=req.params;
        if(!userId || !recipeId){
            return res.status(400).json({error:"Missing required fields"})
        }
        await db.delete(FavoriteTable)
        .where(
            and(
                eq(FavoriteTable.userId,userId),
                eq(FavoriteTable.recipeId,parseInt(recipeId))
            )
        );
        res.status(200).json({success:"Favorite deleted successfully"})

    }catch(error){
        console.log("Error deleting favorite:", error);
        res.status(500).json({error:"Internal server error"})
    }
})
app.get("/api/favorite/:userId",async(req,res)=>{
    try{
        const {userId}=req.params;
        if(!userId){
            return res.status(400).json({error:"User does not exist"})
        }
       const UserFavorites = await db.select().from(FavoriteTable)
        .where(eq(FavoriteTable.userId,userId));
        res.status(200).json(UserFavorites)

    }catch(error){
        console.log("Error fetching favorites:", error);
        res.status(500).json({error:"Internal server error"})
    }
})
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    
})