import dotenv from 'dotenv'
dotenv.config();
const configs={
    port:process.env.PORT || 5002,
    db:process.env.DB || 'mongodb+srv://mireilleirafasha:Mugisha12345@cluster0.4bfpmyu.mongodb.net/Inyange_stock',
    secret:process.env.SECRET,
}

export default configs;
