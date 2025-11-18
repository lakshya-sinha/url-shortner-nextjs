import Link from "next/link";

export default function Home() {
  return (
      <main className="flex flex-col h-screen w-screen items-center justify-center text-white">
        <h1 className="text-4xl">Get Free short Url? </h1>
        <p className="text-2xl text-gray-400">That's Clicks</p>
        <br />
        <hr  className=""/>
        <Link className="px-4 py-2 border-2 rounded cursor-pointer " href="/createurl">Create Url</Link>
     </main>
  );
}
