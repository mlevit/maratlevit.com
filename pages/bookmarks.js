import React, { useEffect } from 'react'
import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'

export default function Projects() {
  // useEffect(() => {
  //   Array.from(document.getElementsByTagName('iframe')).forEach((iframe) => {
  //     console.log('test')
  //     console.log(iframe)
  //     iframe.contentWindow.addEventListener(
  //       'load',
  //       () => {
  //         const doc = iframe.contentWindow.document
  //         iframe.height = doc.body.scrollHeight
  //         console.log(iframe.height)
  //       },
  //       true
  //     )
  //     iframe.contentWindow.addEventListener(
  //       'resize',
  //       () => {
  //         iframe.height = iframe.contentWindow.document.body.scrollHeight + 40
  //         console.log(iframe.height)
  //       },
  //       true
  //     )
  //   })
  // }, [])

  const ResizeIframe = () => {
    const iframe = document.querySelector('iframe.giscus-frame')
    if (!iframe) return
    const doc = iframe.contentWindow.document
    console.log(iframe.height)
    iframe.height = doc.body.scrollHeight
  }

  return (
    <>
      <PageSEO
        title={`Bookmarks - ${siteMetadata.author}`}
        description={siteMetadata.description}
      />
      <div className="">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-3xl md:leading-14">
            /my/projectsx
          </h1>
          {/* <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Various projects I've worked on.
          </p> */}
        </div>
        <div className="container">
          <div className="">
            <iframe
              // style="border: 0; width: 100%; height: 450px;"
              className="giscus-frame"
              width="100%"
              frameBorder="0"
              scrolling="no"
              onLoad={ResizeIframe}
              src="https://raindrop.io/mlevit/technology-14183797/embed/theme=auto"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  )
}
