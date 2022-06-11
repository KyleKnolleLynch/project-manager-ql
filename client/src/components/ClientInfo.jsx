import { FeatherUser, FeatherMail, FeatherPhone } from './assets/icons'

export const ClientInfo = ({ name, email, phone }) => {
 
  return (
    <article>
      <h3 className='h5 pt-5'>Client Information</h3>
      <ul className='list-group'>
        <li className='list-group-item'>
          <FeatherUser /> {name}
        </li>
        <li className='list-group-item'>
          <FeatherMail /> {email}
        </li>
        <li className='list-group-item'>
          <FeatherPhone /> {phone}
        </li>
      </ul>
    </article>
  )
}
