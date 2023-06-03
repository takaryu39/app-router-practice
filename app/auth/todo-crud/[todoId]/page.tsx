import { Database } from '@/database.types'
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { format } from 'date-fns'
import { headers, cookies } from 'next/headers'
import { notFound } from 'next/navigation'

type PageProps = {
  params: {
    todoId: string
  }
}
const TodoDetailPage = async ({ params }: PageProps) => {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  })
  const { data: todo, error } = await supabase
    .from('router_todos')
    .select('*')
    .eq('id', params.todoId)
    .single()
  if (!todo) return notFound()

  return (
    <div className="mt-16 border-2 p-8">
      <p>Task ID:{todo.id}</p>
      <p>Title:{todo.title}</p>
      <p>Status:{todo.completed ? 'Completed' : 'Not Completed'}</p>
      <p>
        Created At:
        {todo && format(new Date(todo.created_at), 'yyyy-MM-dd HH:mm:ss')}
      </p>
    </div>
  )
}

export default TodoDetailPage
