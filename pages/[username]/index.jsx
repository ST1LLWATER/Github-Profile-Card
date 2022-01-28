import React, { useEffect, useRef, useState } from 'react'
import { AiTwotoneStar, AiOutlineIssuesClose } from 'react-icons/ai'
import { BsFillPeopleFill } from 'react-icons/bs'
import { BiGitPullRequest } from 'react-icons/bi'
import { GoRepo } from 'react-icons/go'

const index = (data) => {
  console.log(data)
  const [languages, setLanguages] = useState([])
  console.log(languages)

  useEffect(() => {
    setLanguages(Object.keys(data.languages))
  }, [])

  const slider = useRef(null)
  let mouseDown = false
  let startX, scrollLeft

  let startDragging = function (e) {
    mouseDown = true
    startX = e.pageX - slider.current.offsetLeft
    scrollLeft = slider.current.scrollLeft
  }
  const stopDragging = () => {
    mouseDown = false
  }

  function handleDelete() {
    dispatch({ type: 'REMOVE_ANIME', id: props.id })
  }

  function mouseMoveEvent(e) {
    e.preventDefault()

    if (!mouseDown) {
      return
    }
    const x = e.pageX - slider.current.offsetLeft
    const scroll = x - startX
    slider.current.scrollLeft = scrollLeft - scroll
  }
  return (
    <>
      <div className="cover relative">
        <div className="absolute flex h-screen w-screen items-center justify-center overflow-hidden rounded text-black">
          <div
            className="card_outer z-10 flex flex-col p-4"
            style={{
              background: `linear-gradient(0deg, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.08))`,
            }}
          >
            <div className="my-2 flex items-center justify-start gap-3">
              <div className="w-14 overflow-hidden rounded-full">
                <img
                  className="object-cover"
                  src="https://avatars.githubusercontent.com/u/583231?v=4"
                  alt="octocat"
                />
              </div>
              <h1 className="text-3xl font-bold">{`@${data.username}`}</h1>
            </div>
            <div className="mt-auto">
              <div className="my-2 flex flex-col leading-3">
                <div className="text-3xl font-semibold">{data.commits}</div>
                <div>Commits</div>
              </div>
              <div className="my-2 flex w-full justify-between">
                <div className="flex flex-col items-center justify-start gap-1 leading-3">
                  <div className="flex items-center gap-1">
                    <AiTwotoneStar /> Stars
                  </div>
                  <div>{data.stars}</div>
                </div>
                <div className="flex flex-col items-center justify-start gap-1 leading-3">
                  <div className="flex items-center gap-1">
                    <BiGitPullRequest />
                    Pull Req
                  </div>
                  <div>{data.totalPulls}</div>
                </div>

                <div className="flex flex-col items-center justify-start gap-1 leading-3">
                  <div className="flex items-center gap-1">
                    <AiOutlineIssuesClose /> Issues
                  </div>
                  <div>{data.totalIssues}</div>
                </div>

                <div className="flex flex-col items-center justify-start gap-1 leading-3">
                  <div className="flex items-center gap-1">
                    <GoRepo />
                    Repos
                  </div>
                  <div>{data.repos}</div>
                </div>
              </div>
              <div className="my-2 flex justify-between">
                <div className="">Following: {`${data.following}`}</div>
                <div>Followers: {`${data.followers}`}</div>
              </div>
              <div
                className="genre mb-2"
                ref={slider}
                onMouseDown={startDragging}
                onMouseUp={stopDragging}
                onMouseLeave={stopDragging}
                onMouseMove={mouseMoveEvent}
              >
                {languages.map((language, index) => (
                  <p
                    key={index}
                    className="genre_item my-1 mr-2 rounded-full bg-gray-800 bg-opacity-80 py-1 px-3 text-sm text-white"
                  >
                    {language}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const { username } = context.query
  const res = await fetch(
    `https://Github-Profile-Card-Server.st1llwater.repl.co/api/stats/${username}`
  )
  const data = await res.json()

  return {
    props: {
      username: 'ST1LLWATER',
      avatar: 'https://avatars.githubusercontent.com/u/62516824?v=4',
      commits: 508,
      stars: 18,
      followers: 62,
      following: 42,
      repos: 59,
      languages: {
        JavaScript: 32,
        CSS: 5,
        HTML: 5,
        Java: 1,
        'C++': 1,
        'Jupyter Notebook': 1,
      },
      created: '2020-03-22T17:55:52Z',
      totalIssues: 25,
      totalPulls: 18,
    },
  }
}

export default index
