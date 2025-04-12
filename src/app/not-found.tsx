import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='text-purple-800 text-center flex flex-col items-center justify-center my-10 dark:text-white'>
      <h2 className='text-xl md:text-3xl mb-4'>Ooops!!! Not Found</h2>
      <p className='sm:text-sm md:text-lg mb-6'>Could not find requested resource</p>
      <Link href="/" className='bg-purple-800 text-white border rounded-sm  px-2 py-1'>Return Home</Link>
    </div>
  )
}