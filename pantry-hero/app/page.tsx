import Link from 'next/link'
export default function Page() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline text-red-200">Home</h1>
      <Link href="/about">About</Link>
      <p className="text-blue-600 dark:text-sky-400">The quick brown fox...</p>
     
    </div>
  )
}