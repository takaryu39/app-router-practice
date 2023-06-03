'use client'

import useStore from '@/store'
import supabase from '@/utils/supabase'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'

const EditTask = () => {
  const router = useRouter()
  const { editedTask } = useStore()
  const { loginUser } = useStore()
  const updateTask = useStore((state) => state.updateEditedTask)
  const reset = useStore((state) => state.resetEditedTask)

  const signOut = () => {
    supabase.auth.signOut()
    router.push('/auth')
  }

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedTask.id === '') {
      const { error } = await supabase
        .from('router_todos')
        .insert({ title: editedTask.title, user_id: loginUser.id })
      router.refresh()
      reset()
    } else {
      const { error } = await supabase
        .from('router_todos')
        .update({ title: editedTask.title })
        .eq('id', editedTask.id)
      router.refresh()
      reset()
    }
  }

  return (
    <div className="m-5 text-center">
      <p className="my-3">{loginUser.email}</p>
      <div className="flex justify-center">
        <ArrowRightOnRectangleIcon
          className="my-3 h-6 w-6 cursor-pointer text-blue-500"
          onClick={signOut}
        />
      </div>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          className="my-2 rounded border border-gray-300 px-3 y-2 text-sm placeholder-gray-500 focus:outline-none"
          placeholder="New task ?"
          value={editedTask.title || ''}
          onChange={(e) => updateTask({ ...editedTask, title: e.target.value })}
        />
        <button
          type="submit"
          className="ml-2 rounded bg-indigo-600 px-3 my-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none"
        >
          {editedTask.id === '' ? 'Create' : 'Update'}
        </button>
      </form>
    </div>
  )
}

export default EditTask
