import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { FeatherUserPlus } from './assets/icons'
import { ADD_CLIENT } from '../mutations/clientMutations'
import { GET_CLIENTS } from '../queries/clientQueries'

export const AddClientModal = () => {
  const initialState = {
    name: '',
    email: '',
    phone: '',
  }

  const [formData, setFormData] = useState(initialState)
  const { name, email, phone } = formData

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS })

      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, addClient] },
      })
    },
  })

  const onInputChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (name === '' || email === '' || phone === '') {
      return alert('Please complete all fields ')
    }

    addClient(name, email, phone)

    setFormData(initialState)
  }

  return (
    <>
      <button
        type='button'
        className='btn btn-primary'
        data-bs-toggle='modal'
        data-bs-target='#addSingleClientModal'
      >
        <div className='d-flex align-items-center add-user-prompt'>
          <FeatherUserPlus />
          <span>Add Client</span>
        </div>
      </button>

      <div
        className='modal fade'
        id='addSingleClientModal'
        tabIndex='-1'
        aria-labelledby='addClientModal'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='addClientModal'>
                Add Client
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
                  <label htmlFor='email'>Email</label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    value={email}
                    className='form-control'
                    onChange={onInputChange}
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='phone'>phone</label>
                  <input
                    type='text'
                    id='phone'
                    name='phone'
                    value={phone}
                    className='form-control'
                    onChange={onInputChange}
                  />
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
  )
}
