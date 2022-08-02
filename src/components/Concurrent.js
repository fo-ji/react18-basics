import { useState, useEffect, useTransition } from 'react'
import axios from 'axios'
import { NavBar } from './NavBar'

export const Concurrent = () => {
  const [photos, setPhotos] = useState([])
  const [input, setInput] = useState('') //Urgent state update
  const [searchKey, setSearchKey] = useState('') //Not urgent state update
  // useTransition: stateの優先順位をつけることができる。
  //                startTransition内でset関数を実行すると優先度が下になる（=外で更新しているものの優先度が上がる）
  // isPendign: useTransitionによって、保留状態の場合、trueになる
  // MEMO: 他のstateの更新を待つ、割り込むなど柔軟に実装ができそう。
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios('https://jsonplaceholder.typicode.com/photos')
      setPhotos(res.data)
    }
    fetchData()
  }, [])

  const filteredPhotos = photos.filter((photo) => {
    return photo.title.includes(searchKey)
  })

  const updateHandler = (e) => {
    setInput(e.target.value)
    startTransition(() => setSearchKey(e.target.value))
  }

  return (
    <div className="flex flex-col items-center font-mono text-gray-600">
      <NavBar />
      <p
        className={`my-3 text-xl font-bold ${
          isPending ? 'text-pink-500' : 'text-blue-500'
        }`}
      >
        startTransition (concurrent feature)
      </p>
      <input
        type="text"
        className="mb-5 rounded border border-gray-300 px-3 py-1 text-xs"
        value={input}
        onChange={updateHandler}
      />
      {filteredPhotos.map((photo) => (
        <p className="mb-2 text-xs" key={photo.id}>
          {photo.title}
        </p>
      ))}
    </div>
  )
}
