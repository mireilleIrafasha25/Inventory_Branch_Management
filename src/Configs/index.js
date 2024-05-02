import dotenv from 'dotenv'
dotenv.config();
const configs={
    port:process.env.PORT || 5002,
    db:process.env.DB || 'mongodb+srv://mireilleirafasha:Mugisha12345@cluster0.4bfpmyu.mongodb.net/Inyange_stock',
    JWT_SECRET:process.env.JWT_SECRET_KEY || "hey2001",
    JWT_EXPIRES_IN:process.env.JWT_EXPIRES_IN,
    JWT_REFRESH_EXPIRES_IN:process.env.JWT_REFRESH_EXPIRES_IN,
    JWT_REFRESH_COOKIE_NAME:process.env.JWT_REFRESH_COOKIE_NAME,
}
export default configs;
