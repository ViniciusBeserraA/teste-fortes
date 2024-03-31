import jwt from "jsonwebtoken";

let users = [
{id: 1, user:"Fortes", email:"fortes@gmail.com", password:"123"},
{id: 2, user:"Manu", email:"Manu@gmail.com", password:"1234"},
];

const SECRET = process.env.JWT_SECRET

function generateToken(user) {
  return jwt.sign({ name: user.name, email: user.email }, SECRET)
}

function createToken(user){
    return jwt.sign({user: user.user, email: user.email}, SECRET)
}

function readToken(token) {
  try {
      return jwt.verify(token, SECRET);
  } catch (err) {
     console.log('token_invalido');
  } 
}

export function verifyToken(token){
  return readToken(token)
}

export function updateUser(userId, updatedUserData) {
  users = users.map(user => {
    if (user.id === userId) {
      return { ...user, ...updatedUserData };
    }
    return user;
  });
}

export function remove(userId) {
  const removedUser = users.find(user => user.id === userId);
  users = users.filter(user => user.id !== userId);
  if (removedUser) {
    return 'Usuário ' + removedUser.user + ' removido com sucesso';
  } else {
    throw new Error('Usuário não encontrado');
  }
}

export function listar() {
  console.log("Lista de usuários atual: ", users)
  return users;
}

export function cadastro(body){
   const userExists = users.some(user => user.email === body.email || user.user === body.user);
   if(userExists) throw new Error('E-mail ou usuário já possui cadastro')
   
   const newUser = {id: users.length + 1,user: body.user,email: body.email, password: body.password};

   users.push(newUser)
   console.log("Cadastro efetuado com sucesso!", newUser);
   console.log("Lista pós cadastr!", users);
   const token = createToken(body)
   return token;
}

export function login(body){
  const user = users.find(({ user }) => user === body.user);
  if(!user) throw new Error('Usuário não encontrado')
  if(user.password !== body.password) throw new Error('Senha incorreta')
  
  const token = generateToken(user)
  return token
}
