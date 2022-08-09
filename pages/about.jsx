import Link from 'next/link';

export default function About() {
  return (
    <section>
      <h1>About</h1>
      <Link href={'/team'}>Team</Link>
    </section>
  );
}
