import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { GET_PROJECT } from '../queries/projectQueries'
import { UPDATE_PROJECT } from '../mutations/projectMutations'

export const EditProjectForm = ({ project }) => {
  const initialState = {
    name: project.name,
    description: project.description,
    status: '',
  }

  const [formData, setFormData] = useState(initialState)
  const { name, description, status } = formData

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, name, description, status },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
  })

  const onInputChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (!name || !description || !status) {
      return alert('Please fill out all fields')
    }

    updateProject(name, description, status)
  }

  return (
    <section className='mt-5'>
      <h3>Update Project</h3>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            id='name'
            name='name'
            value={name}
            className='form-control'
            onChange={onInputChange}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            name='description'
            value={description}
            className='form-control'
            onChange={onInputChange}
          ></textarea>
        </div>
        <div className='mb-3'>
          <label htmlFor='status'>Status</label>
          <select
            name='status'
            id='status'
            value={status}
            onChange={onInputChange}
            className='form-select'
          >
            <option value='new'>Not Started</option>
            <option value='progress'>In Progress</option>
            <option value='completed'>Completed</option>
          </select>
        </div>

        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </section>
  )
}
