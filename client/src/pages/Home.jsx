import { AddClientModal, AddProjectModal, Projects, Clients } from '../components'

export const Home = () => {
  return (
    <main>
      <section className='d-flex gap-3 mb-4'>
        <AddClientModal />
        <AddProjectModal />
      </section>
      <Projects />
      <hr />
      <Clients />
    </main>
  )
}
