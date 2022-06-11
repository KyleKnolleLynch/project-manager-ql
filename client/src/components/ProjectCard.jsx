export const ProjectCard = ({ project }) => {
  return (
    <div className='col-md-6 col-lg-4'>
      <article className='card mb-3'>
        <div className='card-body'>
          <div className='d-flex justify-content-between align-items-center'>
            <h2 className='card-title h5'>{project.name}</h2>
            <a href={`/project/${project.id}`} className='btn btn-light'>View</a>
          </div>
          <p className='small'>
              Status: <strong>{project.status}</strong>
          </p>
        </div>
      </article>
    </div>
  )
}
