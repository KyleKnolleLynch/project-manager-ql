import { useNavigate } from 'react-router-dom'
import { FeatherTrash } from './assets/icons'
import { GET_PROJECTS } from '../queries/projectQueries'
import { DELETE_PROJECT } from '../mutations/projectMutations'
import { useMutation } from '@apollo/client'

export const DeleteProjectBtn = ({ projectId }) => {
  const navigate = useNavigate()

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => navigate('/'),
    refetchQueries: [{ query: GET_PROJECTS }],
  })

  return (
    <div className='d-flex mt-5 ms-auto project-delete'>
      <button className='btn btn-danger m-2' onClick={deleteProject}>
        <FeatherTrash /> Delete Project
      </button>
    </div>
  )
}
