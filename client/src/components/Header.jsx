import logo from './assets/logo.png'

export const Header = () => {
  return (
    <nav className='navbar bg-light mb-4 py-1' aria-label='Main'>
      <div className='container'>
        <a href='/' className='navbar-brand'>
          <div className='d-flex align-items-center'>
            <img src={logo} alt='logo' />
            <h2>Project Manager</h2>
          </div>
        </a>
      </div>
    </nav>
  )
}
