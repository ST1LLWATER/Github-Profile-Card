import { useState } from 'react'

export default function Home() {
  const [username, setUsername] = useState('')
  return (
    <div
      className={
        'flex h-screen w-screen flex-col items-center justify-between bg-gray-800 p-10'
      }
    >
      <div
        className={
          'flex w-full items-center justify-center text-9xl font-bold text-white'
        }
      >
        DevCards
      </div>
      <div className={'flex items-center justify-center'}>
        <input
          type={'text'}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          className={
            'h-12 w-full rounded-lg border-2 border-gray-600 bg-gray-700 p-2 text-white'
          }
        />
        <button className={'ml-3 h-12 rounded-lg bg-amber-500 p-2'}>
          Search
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
