const { cleanEnv, str, port } =require ('envalid');

function validateEnv() {
    cleanEnv(process.env, {
        MONGO_DB_URL: str(),
        NODE_ENV: str(),
        PORT: port(),
    });
}

export default validateEnv;