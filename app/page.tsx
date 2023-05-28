import { Suspense } from 'react'
import NotesList from './components/notes-list'
import TimerCounter from './components/timer-counter'
import Spinner from './components/spinner'
import RefreshBtn from './components/refresh-btn'
/* 
spinner.tsxを追加した段階でHOMEコンポーネント(サーバーコンポーネント)がspinnerでラップされる。
HOMEコンポーネントの中身の処理が全て完了した段階で表示される
 */
export default function Home() {
  return (
    <main>
      <h1>Hello World</h1>
      <Suspense fallback={<Spinner color="border-green-500" />}>
        {/* @ts-ignore */}
        <NotesList />
        {/* 
      ↑サーバーコンポーネント
      時間がかかる(非同期)処理はこれだけで,この処理が終わるまで他の<TimerCounter/>や<h1>Hello World</h1>もSpinner.tsxでラップされているから表示されない。
    */}
      </Suspense>
      {/* 
      <Suspense>でラップすることでNotesListだけローディングして他のコンポーネントは表示されるようになる（ストリーミングHTML）
    */}
      <TimerCounter />
      {/* ↑クライアントコンポーネント */}
      <RefreshBtn />
    </main>
  )
}
