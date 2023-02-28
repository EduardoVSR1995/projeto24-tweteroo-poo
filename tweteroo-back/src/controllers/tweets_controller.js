import sigs from "./signup_controller.js";

export default new class tweets{
  constructor() {
    this.tweetBox = [];
    this.postTweet = this.postTweet.bind(this);
    this.userNameTweets = this.userNameTweets.bind(this);
    this.allTweets = this.allTweets.bind(this);
  }

  postTweet(req, res) {
    const { tweet, username } = req.body;
  
    if (!username || !tweet) {
      return res.status(400).send('Todos os campos são obrigatórios!');
    }
    
    const { avatar } = sigs.usuarios.find(user => user.username === username);
  
    this.tweetBox.push({ username, tweet, avatar });
  
    res.status(201).send('OK, seu tweet foi criado');
  };

  userNameTweets(req, res) {
    const { username } = req.params;
  
    const tweetsDoUsuario = this.tweetBox.filter(t => t.username === username);
  
    res.status(200).send(tweetsDoUsuario);
  };

  allTweets(req, res) {
    const { page } = req.query;
  
    if (page && page < 1) {
      res.status(400).send('Informe uma página válida!');
      return;
    }
    const limite = 10;
    const start = (page - 1) * limite;
    const end = page * limite;
  
    if (this.tweetBox.length <= 10) {
      return res.send(this.reverseTweets());
    }
  
    res.status(200).send(this.reverseTweets().slice(start, end));
  };
  
  reverseTweets() {
    return [...this.tweetBox].reverse();
  }

}