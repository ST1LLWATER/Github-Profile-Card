import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Home() {
  const [username, setUsername] = useState('')
  const router = useRouter()
  return (
    <div
      className={
        'flex h-screen w-screen flex-col items-center justify-center gap-14 bg-gray-800 p-10'
      }
    >
      <div className={'text-7xl font-bold text-white sm:text-9xl'}>
        Github DevCard
      </div>
      <div className={'flex w-screen items-center justify-center p-4 lg:w-1/2'}>
        <input
          type="text"
          placeholder="Github Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          className={
            'h-12 w-4/5 rounded-lg border-2 border-gray-600 bg-gray-700 p-2 text-white'
          }
        />
        <button
          onClick={() => {
            router.push(`/${username}`)
          }}
          className={'ml-3 h-12 w-1/5 rounded-lg bg-amber-500 p-2'}
        >
          Go
        </button>
      </div>
      <div
        className={
          'flex h-10 w-full items-center justify-center text-xl font-bold text-white'
        }
      >
        Create Yours Now!
      </div>
    </div>
  )
}
