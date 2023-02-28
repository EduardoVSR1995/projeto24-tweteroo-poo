import { Request, Response } from "express";
import sigs from "./signup_controller.js";

type TweetBox ={
  username: string, 
  tweet: string, 
  avatar: string
}

export default new class tweets{
  tweetBox: TweetBox[];
  constructor() {
    this.tweetBox = [];
    this.postTweet = this.postTweet.bind(this);
    this.userNameTweets = this.userNameTweets.bind(this);
    this.allTweets = this.allTweets.bind(this);
  }

  postTweet(req: Request, res: Response) {
    const { tweet, username } = req.body;
  
    if (!username || !tweet) {
      return res.status(400).send('Todos os campos são obrigatórios!');
    }
    
    const user = sigs.usuarios.find(user => user.username === username);
    
    if (!user?.avatar) {
      return res.status(400).send('Este usuario não existe!');
    }
    
    this.tweetBox.push({ username, tweet, avatar: user.avatar });
  
    res.status(201).send('OK, seu tweet foi criado');
  };

  userNameTweets(req: Request, res: Response) {
    const { username } = req.params;
  
    const tweetsDoUsuario = this.tweetBox.filter(t => t.username === username);
  
    res.status(200).send(tweetsDoUsuario);
  };

  allTweets(req: Request, res: Response) {
    const { page } = req.query ; 
    
    const pageUniq = Number(page);

    if (pageUniq && pageUniq < 1) {
      res.status(400).send('Informe uma página válida!');
      return;
    }
    const limite = 10;
    const start = (pageUniq - 1) * limite;
    const end = pageUniq * limite;
  
    if (this.tweetBox.length <= 10) {
      return res.send(this.reverseTweets());
    }
  
    res.status(200).send(this.reverseTweets().slice(start, end));
  };
  
  reverseTweets() {
    return [...this.tweetBox].reverse();
  }

}