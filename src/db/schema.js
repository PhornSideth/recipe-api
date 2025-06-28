import  {pgTable,serial,text,timestamp,integer} from 'drizzle-orm/pg-core'
export const FavoriteTable=pgTable('favorites',{
    id:serial("id").primaryKey(),
    userId:text("user_id").notNull(),
    recipeId:integer("recipe_id").notNull(),
    title:text("title").notNull(),
    image:text("image"),
    cookTime:text("cook_time"),
    serving:text("serving"),
    createdAt:timestamp("created_at").defaultNow()


})