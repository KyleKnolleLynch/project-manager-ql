import { AddClientModal, Projects, Clients } from '../components'

export const Home = () => {
  return (
    <main>
      <div className='d-flex gap-3 mb-4'>
        <AddClientModal />
      </div>
      <Projects />
      <hr />
      <Clients />
    </main>
  )
}
