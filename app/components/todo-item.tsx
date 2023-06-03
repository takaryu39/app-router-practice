'use client'

import { Database } from '@/database.types'
import useStore from '@/store'
import supabase from '@/utils/supabase'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { use } from 'react'

type Todo = Database['public']['Tables']['router_todos']['Row']

const TodoItem = (todo: Todo) => {
  const router = useRouter()
  const updateTask = useStore((state) => state.updateEditedTask)
  const resetTask = useStore((state) => state.resetEditedTask)
  const updateMutate = async (id: string, completed: boolean) => {
    await supabase
      .from('router_todos')
      .update({ completed: completed })
      .eq('id', id)
    resetTask()
    router.refresh()
  }
  const deleteMutate = async (id: string) => {
    await supabase.from('router_todos').delete().eq('id', id)
    resetTask()
    router.refresh()
  }

  return (
    <li className="my-2">
      <input
        className="mr-1"
        type="checkbox"
        checked={todo.completed}
        onChange={(e) => updateMutate(todo.id, !todo.completed)}
      />
      <Link href={`/auth/todo-crud/${todo.id}`}>{todo.title}</Link>
      <div className="float-right ml-20 flex">
        <PencilIcon
          className="mx-1 h-5 cursor-pointer text-blue-500"
          onClick={() => {
            updateTask({
              id: todo.id,
              title: todo.title,
            })
          }}
        />
        <TrashIcon
          className="h-5 w-5 cursor-pointer text-blue-500"
          onChange={() => deleteMutate(todo.id)}
        />
      </div>
    </li>
  )
}

export default TodoItem
