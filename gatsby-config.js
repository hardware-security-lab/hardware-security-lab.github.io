module.exports = {
  siteMetadata: {
    title: `Hardware Security Lab`,
    author: {
      name: `Hardware Security Lab`,
      summary: `Research in secure hardware design, microarchitectural side-channel attacks, and applied cryptography, at Georgia Institute of Technology.`,
    },
    openGraphImage: `static/images/group_photo_fall_2023.webp`,
    description: `Research in secure hardware design, microarchitectural side-channel attacks, and applied cryptography, at Georgia Institute of Technology.`,
    siteUrl: `https://architecture.fail`,
    social: {
      github: `hardware-security-lab`
    },
    socialLinks: [
      {
        name: "github",
        url: "https://github.com/hardware-security-lab",
      },
    ],
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/content/pages`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-relative-images`,
            options: {
              staticFolderName: "static",
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    {
      resolve: "gatsby-plugin-netlify-cms",
      options: {
        modulePath: `${__dirname}/src/netlify-cms/index.js`,
        enableIdentityWidget: true,
        publicPath: "admin",
        htmlTitle: "Content Manager",
        includeRobots: false,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Source Sans Pro`, `Poppins\:400,400i,700`],
        display: "swap",
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Frosted Blog`,
        short_name: `Gatsby Frosted`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
  ],
};
