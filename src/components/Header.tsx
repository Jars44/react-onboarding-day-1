type HeaderProps = {
  title: string;
};

function Header({ title }: HeaderProps) {
  return (
    <header className="dashboard-header">
      <h1>{title}</h1>
    </header>
  );
}

export default Header;
