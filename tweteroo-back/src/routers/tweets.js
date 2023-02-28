import { Router } from "express";
import tweets from "../controllers/tweets_controller.js";

const tweetRouter = Router();
    tweetRouter
        .post("/tweets", tweets.postTweet)
        .get("/tweets/:username", tweets.userNameTweets )
        .get("/tweets", tweets.allTweets );

export default tweetRouter;