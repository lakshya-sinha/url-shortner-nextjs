import { connectDB } from "@/libs/connectDb";
import Url  from "@/models/Url";
import { NextResponse, NextRequest} from "next/server";
import { generatePrefix } from "@/libs/randomPrefix";

connectDB();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {oriUrl} = reqBody;
    
        //! check url exists or not 
        const  url = await Url.findOne({oriUrl})
        
        if(url){
            return NextResponse.json(
                {url: `${url.slug}`, message: "url created successfully", success: true},
                {status: 201}
            )
        }

        
        const randomPrefix = generatePrefix();
    
        
        //! save url in database
        const newUrl = new Url({
            slug: randomPrefix,
            oriUrl: oriUrl
        })
        
    
        const savedUrl = await newUrl.save();
    
        return NextResponse.json(
            {url: `${randomPrefix}`, message: "url created successfully", success: true},
            {status: 201}
        )
    }catch(error: unknown){ 
        if(error instanceof Error){
            return NextResponse.json({error: error.message}, {status: 500})
        }
        return NextResponse.json({error: "unknown error happen"}, {status: 500})
    }
}
