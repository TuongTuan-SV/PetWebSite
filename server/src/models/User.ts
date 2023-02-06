import mongoose,{Schema,model, Types,connect} from 'mongoose'


export interface IUser {
    FirstName : string;
    LastName ?: string;
    email : string;
    avatar ?: string
    password : string 
}


const UserSchema = new Schema<IUser>({
    FirstName : {
        type : String,
        require : true,
        trim: true,
    },
    LastName: {
        type : String,
        trim: true,
    },
    email : {
        type : String,
        require : true,
    },
    avatar : {
        type : String,
    },
    password : {
        type : String,
        require : true,
    }
},
{ 
    timestamps: true,
    versionKey : false
})


const User  =  mongoose.model<IUser>('User', UserSchema);

export default User