type GreetingProps = {
  name: string;
};

function Greeting({ name }: GreetingProps) {
  return <h2>Halo, {name || "Pengunjung"}!</h2>;
}

export default Greeting;
