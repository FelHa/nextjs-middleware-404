import Link from 'next/link';

export default function Team() {
  return (
    <section>
      <h1>Team</h1>
      <Link href={'/about'}>about</Link>
    </section>
  );
}
