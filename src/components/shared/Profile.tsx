interface ProfileProps {
  name: string
  role?: string
  designation?: string
  imgUrl?: string
}

const Profile = ({ name, role, designation }: ProfileProps) => {
  return (
    <div>
      <p>{name}</p>
      <p>{role}</p>
      <p>{designation}</p>
    </div>
  )
}

export default Profile
