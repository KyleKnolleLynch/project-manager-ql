import { useEffect } from 'react'
import { FeatherAlertTriangle } from '../components/assets/icons'
import { Link, useNavigate } from 'react-router-dom'

export const NotFound = () => {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate('/')
    }, 4000)
  }, [])

  return (
    <main className='d-flex flex-column align-items-center pt-5'>
      <FeatherAlertTriangle />
      <h1 className='pt-1 '>404</h1>
      <p className='lead'>
        Oops! This page doesn't exist.
        <br />
        You will be redirected back <Link to='/'>Home</Link> shortly.
      </p>
    </main>
  )
}
