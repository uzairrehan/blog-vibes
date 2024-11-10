import useUserStore from '@/store/userStore'
import React from 'react'

function AlllUserStore() {
    const user = useUserStore(state => state.user)
  return (
    <div>
        {JSON.stringify(user)}
    </div>
  )
}

export default AlllUserStore