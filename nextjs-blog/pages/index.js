import Head from 'next/head';
import HeaderSlim from '@massds/mayflower-react/es/components/organisms/HeaderSlim';
import FooterSlim from '@massds/mayflower-react/es/components/organisms/FooterSlim';
import SiteLogo from '@massds/mayflower-react/es/components/atoms/media/SiteLogo';
import logo from '@massds/mayflower-assets/static/images/stateseal.png';
export default function Home() {
  const siteLogoProps = {
    url: {
      domain: 'https://www.mass.gov/'
    },
    image: {
      src: logo,
      alt: 'Massachusetts state seal',
      width: 45,
      height: 45
    },
    siteName: 'Mass.gov',
    title: 'Mass.gov homepage'
  };
  const headerProps = {
    siteLogo: <SiteLogo {...siteLogoProps} />
  };
  const footerProps = {
    title: 'Massachusetts Executive Office of Eductation (EDU)',
    description: "The Department of Early Education and Care's mission is to support the healthy growth and development of all children by providing high quality programs and resources for families",
    links: [
      { href: '#', title: 'Lead Agencies Policies' },
      { href: '#', title: 'Child Care Licensing Procedures' }
    ],
    contact: {
      address: '51 Sleeper St. 4th Floor, Boston, MA 02210',
      phone: '(617) 988-6600',
      online: {
        href: '#',
        title: 'EEC Official Website'
      }
    },
    siteLogo: <SiteLogo {...siteLogoProps} />
  };
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderSlim {...headerProps}/>
      <main>
        <h1 className="title">
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>

        <div className="grid">
          <a href="https://nextjs.org/docs" className="card">
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className="card">
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/zeit/next.js/tree/master/examples"
            className="card"
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className="card"
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>
      <FooterSlim {...footerProps} />
    </div>
  )
}
