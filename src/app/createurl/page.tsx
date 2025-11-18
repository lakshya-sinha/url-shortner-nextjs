'use client'
import { useEffect, useState } from "react"
import axios from 'axios'
import { CopyIcon } from "@phosphor-icons/react/dist/ssr"

interface OriginalUrl {
  oriUrl: string;
}

interface UrlItem {
  originalUrl: string;
  sortedUrl: string;
}

const Page= () => {
    
    const [sortedUrl, setShortedUrl] = useState<string>("")
    const [originalUrl, setOriginalUrl] = useState<OriginalUrl>({oriUrl: ""})
    const [data, setData] = useState<UrlItem[]>(()=>{
      const localData :any= localStorage.getItem("urls");
      const jsonUrl = JSON.parse(localData)
      return jsonUrl
    })
    

    useEffect(()=>{
        setShortedUrl("your sorted url should appear here")
    }, [])

    useEffect(()=>{
      const stringData = JSON.stringify(data)
      localStorage.setItem("urls", stringData)
    }, [data])
    
    
    async function createShortUrl(){
      try {
        const getUrl = await axios.post("/api/createUrl", originalUrl)
        console.log(getUrl)
        const sortedUrlb: string = getUrl.data.url
        setShortedUrl(sortedUrlb)
        console.log(sortedUrl)
        const oldData: any = [...data];
        const newData = {originalUrl: originalUrl.oriUrl, sortedUrl: sortedUrlb}
        oldData.push(newData);
        setData(oldData);
      } catch (error: unknown) {
        if(error instanceof Error){
          console.log(error)
        } 
      }
    }

    async function deleteUrl(slug: string){
      try {
       const getUrl = await axios.get(`/api/deleteUrl/${slug}`);
       console.log(getUrl.data.success);
          if(getUrl.data.success){
            const index = data.findIndex(item => item.sortedUrl === slug);
            if (index !== -1) {
              const updated = [...data];
              updated.splice(index, 1); // remove that one object
              setData(updated);
            }
          }
      } catch (error) {
        if(error instanceof Error){
          console.log(error)
        }
      }
    }

    function copySortedUrl(slug: string){
      navigator.clipboard.writeText(`localhost:3000/${slug}`)
      .then(() => {
        console.log("Copied!");
      })
      .catch(err => {
        console.error("Failed to copy", err);
      });
    }

    
  return (
    <main className='w-screen h-screen flex items-center justify-center '>
        <div className="container border w-full p-4 lg:w-[800px]">
        <div className="create-container flex items-center justify-evenly">
           <input type="text"  className='border w-full py-2 px-1 '
                placeholder="Enter orignal URL."
                name="oriUrl"
                value={originalUrl.oriUrl}
                onChange={(e) => {
                  setOriginalUrl(prev => ({
                    ...prev,
                    oriUrl: e.target.value
                  }));
                }}
                
           />
            <button type='submit' onClick={createShortUrl} className='border px-8 py-2 cursor-pointer hover:bg-gray-200 hover:text-black hover:border-gray-200 '>Create</button> 
        </div>
             <div className="p-3 border  text-sm text-secondary italic font-montserrat  ">
                <ul>
              {
                data.map((e,idx)=>{
                  return <div key={idx} className="flex items-center justify-start gap-2 mb-3">
                    <div className="first border w-[50%] overflow-x-auto scrollbar-hide p-3">
                    <li className="px-2 " title="originalUrl">{e.originalUrl}</li>
                    </div>
                    <div className="second border w-[20%] p-3 ">
                      <li className="flex gap-2 active:bg-green-400 transition-all" onClick={()=> copySortedUrl(e.sortedUrl)} >{e.sortedUrl} <CopyIcon size={19} /></li>
                    </div>
                    <div className="third w-[30%] border p-3 hover:border-red-800 transition-all hover:bg-red-800 cursor-pointer">
                      <button className="" onClick={()=>deleteUrl(e.sortedUrl)}>Delete</button>
                    </div>
                    
                  </div>
                })
              }
                </ul>
             </div>
        </div>
    </main>
  )
}

export default Page 