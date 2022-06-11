import { AddClientModal, Projects, Clients } from '../components'

export const Home = () => {
  return (
    <main>
      <section className='d-flex gap-3 mb-4'>
        <AddClientModal />
      </section>
      <Projects />
      <hr />
      <Clients />
    </main>
  )
}
