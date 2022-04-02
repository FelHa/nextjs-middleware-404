import Link from 'next/link';

export default function Home({}) {
  return (
    <section>
      <h1>Home</h1>
      <div>
        <Link href="/about">Zu About</Link>{' '}
      </div>
      <div>
        <Link href="/team">Zu Team</Link>
      </div>
    </section>
  );
}
