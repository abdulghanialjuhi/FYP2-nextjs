import Head from 'next/head'

export default function Meta({ title, description, keywords }) {

  const fullTitle = `${title} - BarberBook`
  
  return (
    <Head>
        <script
        src="https://kit.fontawesome.com/fbadad80a0.js"
        crossOrigin="anonymous"
        ></script>
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" 
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <title>{ fullTitle }</title>
    </Head>
  )
}

Meta.defaultProps = {
    title: 'Home',
    description: 'BarberBook for booking barbershops',
    keywords: 'barber bokking'
}