import { cleanEnv, port, str } form "envalid";

const validateEnv = () =>{
  cleanEnv(process.env, {
    NODE_ENV: str(), 
    PORT: port(),
  })
}

export default validateEnv;