import Link from 'next/link';

export default function About(props) {
  const { slug, pageData } = props;

  return (
    <section>
      <h1>{slug}</h1>
      <p>page data: {pageData}</p>
      <p>
        <Link href={'/dynamic/dynamic-to-nowhere'}>to dynamic nowhere</Link>
        <br />
        <Link href={'/to-nowhere'}>to nowhere</Link>
      </p>
      <p>
        <Link href={'/'}>Home</Link>
      </p>
    </section>
  );
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { slug: 'foo' } },
      { params: { slug: 'bar' }, locale: 'de' },
    ],
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const pageData = await (
    await import(`../../staticData/pages.json`)
  ).pages.filter((page) => page.slug === slug)[0]?.data;

  if (!pageData) {
    return { notFound: true };
  }

  return {
    // Passed to the page component as props
    props: { slug, pageData: pageData },
  };
}
