import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_PROJECT } from '../queries/projectQueries'
import { Spinner, ClientInfo, DeleteProjectBtn, EditProjectForm } from '../components'

export const Project = () => {
  const { id } = useParams()
  const { loading, error, data } = useQuery(GET_PROJECT, { variables: { id } })

  if (loading) return <Spinner />
  if (error) return <p>Something went wrong</p>

  const { name, description, status, client } = data.project
  return (
    <main>
      {!loading && !error && (
        <section className='w-75 card mx-auto p-5'>
          <Link to='/' className='w-25 btn btn-light btn-sm d-inline ms-auto'>
            Back
          </Link>

          <h1>{name}</h1>
          <p>{description}</p>
          <h2 className='pt-3 h5'>Project Status</h2>
          <p className='lead'>{status}</p>

          <ClientInfo {...client} />

          <EditProjectForm project={data.project} />

          <DeleteProjectBtn projectId={id} />

        </section>
      )}
    </main>
  )
}
