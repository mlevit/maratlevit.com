import Document, { Html, Head, Main, NextScript } from 'next/document'
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="scroll-smooth">
        <Head>
          <link rel="icon" type="image/svg+xml" href="/static/favicons/favicon.svg" />

          <meta name="title" content="Hey, I'm Marat 👋" />
          <meta name="description" content="technologist, consultant, data, architect" />

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://maratlevit.com/" />
          <meta property="og:title" content="Hey, I'm Marat 👋" />
          <meta property="og:description" content="technologist, consultant, data, architect" />
          <meta property="og:image" content="https://maratlevit.com" />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://maratlevit.com/" />
          <meta property="twitter:title" content="Hey, I'm Marat 👋" />
          <meta
            property="twitter:description"
            content="technologist, consultant, data, architect"
          />
          <meta property="twitter:image" content="https://maratlevit.com" />

          {/* <link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/apple-touch-icon.png" />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicons/favicon-16x16.png"
          />
          <link rel="manifest" href="/static/favicons/site.webmanifest" />
          <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5" /> */}
          <meta name="msapplication-TileColor" content="#000000" />
          <meta name="theme-color" content="#000000" />
          <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
          <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        </Head>
        <body className="bg-white text-black antialiased dark:bg-black dark:text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
