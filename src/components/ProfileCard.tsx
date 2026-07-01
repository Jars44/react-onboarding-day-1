type ProfileCardProps = {
  name: string;
  role: string;
  avatar: string;
};

function ProfileCard({ name, role, avatar }: ProfileCardProps) {
  return (
    <div className="profile-card">
      <div className="profile-avatar">{avatar}</div>
      <div className="profile-info">
        <h3>{name}</h3>
        <p>{role}</p>
      </div>
    </div>
  );
}

export default ProfileCard;
