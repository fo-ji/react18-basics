import { Suspense } from 'react'
import { Layout } from './Layout'
import { Spinner } from './Spinner'
import { FetchTasks } from './FetchTasks'
import { FetchUsers } from './FetchUsers'

// MEMO: Suspenseは1つしか表示されない、一番外側のサスペンスが優先され、外側が終わり、内側のサスペンスがまだローディング状態ならバトンタッチされる挙動になる
export const NestedSuspense = () => {
  return (
    <Layout>
      <p className="mb-3 text-xl font-bold text-blue-500">Nested Suspense</p>
      <Suspense
        fallback={
          <>
            <p className="my-5 text-green-500">Showing outer skelton...</p>
            <Spinner />
          </>
        }
      >
        <FetchUsers />
        <Suspense
          fallback={
            <>
              <p className="my-5 text-pink-500">Showing inner skelton...</p>
              <Spinner />
            </>
          }
        >
          <FetchTasks />
        </Suspense>
      </Suspense>
    </Layout>
  )
}
