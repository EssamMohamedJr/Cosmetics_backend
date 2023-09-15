import mongoose from "mongoose";
const connect=()=>{
    mongoose.connect(process.env.CONNECTION).then(
        (res)=>{
            console.log('connected')
        }
    ).catch(err=>{console.log(err)})
}
export default connect
