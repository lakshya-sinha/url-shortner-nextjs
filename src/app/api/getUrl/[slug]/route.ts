import { connectDB } from "@/libs/connectDb";
import { NextResponse, NextRequest } from "next/server";
import Url from "@/models/Url";

connectDB();


export async function GET(
    request: NextRequest, 
    context: { params: Promise<{ slug: string }> }
){

    try {
        const slug = await  context.params;
        const url =  await Url.findOne({slug:slug.slug})

    
        if(!url){
            return NextResponse.json({error: 'url not exists'},{status: 404})
        }
        
        return NextResponse.json({message: "url successfully found!", url: url.oriUrl, success: true}, {status:202})

    } catch (error:unknown) {
       if(error instanceof Error){
         throw new Error(error.message);
       }
    }

}