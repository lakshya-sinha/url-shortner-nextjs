'use client'
import { useParams,useRouter } from "next/navigation"
import { useEffect } from "react";
import axios from 'axios'

const Page = () => {
    const params = useParams();
    const router = useRouter();
    const url = params.slug;
    
    useEffect(()=>{
      getOriUrl()
    }, [])

    async function getOriUrl (){
      const fetchData = await axios.get(`/api/getUrl/${url}`)
      const originalUrl = fetchData.data.url;
      router.push(`${originalUrl}`)
    }


    
  return (
      <main>
        redirecting... 
      </main>
  )
}

export default Page