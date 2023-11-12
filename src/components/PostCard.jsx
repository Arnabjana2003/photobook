import React from 'react'
import { Link } from 'react-router-dom'
import services from '../appwrite/services'

function PostCard({$id,title,featuredImage,username}) {
  return (
    <Link to={`/posts/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
          <p className='font-bold text-blue-600'>{username}</p>
            <div className='w-full justify-center mb-4'>
                <img src={services.previewFile(featuredImage)} alt={title}
                className='rounded-xl' />
            </div>
            <h2
            className='text-xl font-semibold'
            >{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard