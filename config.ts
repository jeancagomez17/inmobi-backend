import {registerAs} from '@nestjs/config'

export default registerAs('config', ()=>{
    return {
        database: {
            name: process.env.DATABASE_URL
        },
        port: process.env.PORT
    }
})