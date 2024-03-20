import { Html, Head, Main, NextScript } from 'next/document'
 
export default function Document() {
    return (
        <Html>
        <Head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />

            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={true} />
            <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap" rel="stylesheet"/> 
        </Head>
        <body>
            <Main />
            <NextScript />
        </body>
        </Html>
    )
}