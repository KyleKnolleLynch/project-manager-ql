import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { FeatherList } from './assets/icons'
import { GET_PROJECTS } from '../queries/projectQueries'
import { ADD_PROJECT } from '../mutations/projectMutations'
import { GET_CLIENTS } from '../queries/clientQueries'

export const AddProjectModal = () => {
  const initialState = {
    name: '',
    description: '',
    clientId: '',
    status: 'new',
  }

  const [formData, setFormData] = useState(initialState)
  const { name, description, clientId, status } = formData

  //    Add project mutation
  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, clientId, status },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS })
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      })
    },
  })

  //    Get clients for select field
  const { loading, error, data } = useQuery(GET_CLIENTS)

  const onInputChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (name === '' || description === '' || status === '') {
      return alert('Please complete all fields ')
    }

    addProject(name, description, clientId, status)

    setFormData(initialState)
  }

  if (loading) return <p>Fetching clients...</p>
  if (error) return <p>Something went wrong</p>

  return (
    <>
      {!loading && !error && (
        <>
          <button
            type='button'
            className='btn btn-secondary'
            data-bs-toggle='modal'
            data-bs-target='#addSingleProjectModal'
          >
            <div className='d-flex align-items-center add-user-prompt'>
              <FeatherList />
              <span>New Project</span>
            </div>
          </button>

          <div
            className='modal fade'
            id='addSingleProjectModal'
            tabIndex='-1'
            aria-labelledby='addProjectModal'
            aria-hidden='true'
          >
            <div className='modal-dialog'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title' id='addProjectModal'>
                    Add Project
                  </h5>
                  <button
                    type='button'
                    className='btn-close'
                    data-bs-dismiss='modal'
                    aria-label='Close'
                  ></button>
                </div>
                <div className='modal-body'>
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
                      <label htmlFor='clientId'>Client</label>
                      <select
                        id='clientId'
                        name='clientId'
                        value={clientId}
                        onChange={onInputChange}
                        className='form-select'
                      >
                        <option value='' disabled>
                          Select client
                        </option>
                        {data.clients.map(client => (
                          <option key={client.id} value={client.id}>
                            {client.name}
                          </option>
                        ))}
                      </select>
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
                    <button
                      className='btn btn-primary'
                      type='submit'
                      data-bs-dismiss='modal'
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
