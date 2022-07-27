import { useState } from 'react'
import axios from 'axios'
import { flushSync } from 'react-dom'

import { Layout } from './Layout'

export const AutoBatch = () => {
  const [count, setCount] = useState(0)
  const [fetchCount, setFetchCount] = useState(0)
  const [users, setUsers] = useState([])

  // MEMO: ver17まではPromise, setTimeout内でのステート更新はそれぞれ再レンダリングが発生していたが、ver18からはバッチング（まとめて1回のレンダリング）に変更された。
  // 最後のstateの更新が終わった後にレンダリングを行う
  const clickHandler = () => {
    // setCount((count) => count + 1)
    // setFetchCount((fetchCount) => fetchCount + 1)
    axios.get('https://jsonplaceholder.typicode.com/users').then((res) => {
      // // 強制的にDOMを更新する(パフォーマンスを下げる要因になり得る)
      // flushSync(() => {
      //   setUsers(res.data)
      // })
      // flushSync(() => {
      //   setFetchCount((count) => count + 1)
      // })
      setUsers(res.data)
      setFetchCount((fetchCount) => fetchCount + 1)
    })
  }

  console.log('Rendered AutoBatch')
  return (
    <Layout>
      <p className="my-3 text-xl font-bold text-blue-500">Automatic batching</p>
      <p className="my-5">{fetchCount}</p>
      <button
        className="my-5 rounded bg-indigo-600 px-3 py-1 text-white hover:bg-indigo-500"
        onClick={clickHandler}
      >
        click
      </button>
    </Layout>
  )
}
