import { Request, Response } from "express";

type Usuario = {
  username: string,
  avatar: string
}

export default new class sigs{
    usuarios: Usuario[];
    constructor (){
      this.usuarios = [];
      this.signin = this.signin.bind(this);
      this.getUser = this.getUser.bind(this);
    }
    
    signin(req: Request, res: Response){
      const { username, avatar } = req.body;
    
      if (!username || !avatar) {
        res.status(400).send('Todos os campos são obrigatórios!');
        return;
      }
    
      this.usuarios.push({ username, avatar });
    
      res.status(200).send('OK deu tudo certo');
    }
    getUser(username: string){
      return this.usuarios.find( user => user.username === username);
    };
  };
  