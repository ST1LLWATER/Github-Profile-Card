import React, { useEffect, useRef, useState } from 'react'
import { AiTwotoneStar, AiOutlineIssuesClose } from 'react-icons/ai'
import { BiGitPullRequest } from 'react-icons/bi'
import { GoRepo } from 'react-icons/go'
import { BsFillPeopleFill } from 'react-icons/bs'
import bg from '../../assets/design-tools.jpg'
import Tilt from 'react-parallax-tilt'

const index = ({ data }) => {
  console.log(data)
  const [languages, setLanguages] = useState([])
  const [allLanguages, setAllLanguages] = useState([])
  const [percentage, setPercentage] = useState(null)
  // let languages = Object.keys(data.languages)
  // let allLanguages = [...languages]
  // languages.splice(3, languages.length)

  useEffect(() => {
    const keysSorted = Object.keys(data.languages).sort(function (a, b) {
      return data.languages[b] - data.languages[a]
    })
    console.log(keysSorted)
    let languages = keysSorted
    let allLanguages = [...languages]
    setAllLanguages(allLanguages)
    languages.splice(3, languages.length)
    setLanguages(languages)
  }, [])

  useEffect(() => {
    if (languages.length > 0) {
      let sum = 0
      for (let i = 0; i < 3; i++) {
        sum += data.languages[allLanguages[i]]
      }
      setPercentage(sum)
    }
  }, [languages])

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
      <div className="flex h-screen w-screen items-center justify-center overflow-hidden rounded text-white">
        <div className="bg absolute h-screen w-screen"></div>
        <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} gyroscope={true}>
          <div className="cover rounded-2xl">
            <div className="card_outer h-11/12 z-10 flex flex-col bg-gray-800 p-4">
              <div className="absolute right-[-15px] top-20 z-[-1] box-border w-72 overflow-hidden rounded-full border-t-8 border-l-8 border-amber-500 opacity-50">
                <img className="object-cover" src={data.avatar} alt="" />
              </div>
              <div className="my-2 flex items-center justify-start gap-3">
                <div className="w-14 overflow-hidden rounded-full">
                  <img
                    className="object-cover"
                    src="https://avatars.githubusercontent.com/u/583231?v=4"
                    alt="octocat"
                  />
                </div>
                <a target="_blank" href={`https://github.com/${data.username}`}>
                  <h1 className="text-3xl font-bold">{`@${data.username}`}</h1>
                </a>
              </div>
              <div className="mt-auto">
                <div className="flex gap-8">
                  <div className="my-4 flex flex-col leading-3">
                    <div className="text-3xl font-bold">{data.commits}</div>
                    <div className="font-semibold">Commits</div>
                  </div>
                  <div className="my-4 flex flex-col leading-3">
                    <div className="text-3xl font-bold">{data.forks}</div>
                    <div className="font-semibold">Forks</div>
                  </div>
                </div>
                <div className="my-4 flex w-full justify-between font-semibold">
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
                <div className="my-4 flex justify-between">
                  <div className="flex items-center justify-center gap-1 font-bold">
                    <div>Following:</div>
                    <BsFillPeopleFill />
                    <div>{data.following}</div>
                  </div>
                  <div className="flex items-center justify-center gap-1 font-bold">
                    <div>Followers:</div>
                    <BsFillPeopleFill />
                    <div>{data.followers}</div>
                  </div>
                </div>
                <div>
                  {languages.map((language, index) => {
                    return (
                      <>
                        <div className="my-2 leading-4">
                          <div>{language}</div>
                          <progress
                            id="progress"
                            value={
                              (data.languages[language] * 100) /
                              (percentage / 3)
                            }
                            max={100}
                          ></progress>
                        </div>
                      </>
                    )
                  })}
                </div>
                <div
                  className="genre mb-2"
                  ref={slider}
                  onMouseDown={startDragging}
                  onMouseUp={stopDragging}
                  onMouseLeave={stopDragging}
                  onMouseMove={mouseMoveEvent}
                >
                  {allLanguages.map((language, index) => (
                    <p
                      key={index}
                      className="genre_item my-1 mr-2 rounded-full bg-gray-700 bg-opacity-80 py-1 px-3 text-sm text-white"
                    >
                      {language}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Tilt>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const { username } = context.query
  const res = await fetch(
    `https://ghdevcard.herokuapp.com/api/stats/${username}`
  )
  const data = await res.json()

  return {
    props: {
      data,
    },
  }

  return {
    props: {
      username: 'N-Deepika',
      avatar: 'https://avatars.githubusercontent.com/u/66058598?v=4',
      commits: 181,
      stars: 0,
      followers: 16,
      following: 14,
      repos: 27,
      languages: {
        JavaScript: 7,
        Python: 3,
        CSS: 2,
        EJS: 3,
        HTML: 2,
        'Jupyter Notebook': 4,
      },
      created: '2020-05-28T07:48:56Z',
      totalIssues: 0,
      totalPulls: 7,
      forks: 12,
    },
  }
}

export default index
