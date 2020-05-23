import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Features from '../components/Features'
import Pricing from '../components/Pricing'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

export const ProductPageTemplate = ({
  image,
  title,
  heading,
  description,
  intro,
  main,
  pricing,
}) => (
  <div className="content">
    <div
      className="full-width-image-container margin-top-0"
      style={{
        backgroundImage: `url(img/landland_homepage.gif)`,
      }}
    >
      <h2
        className="has-text-weight-bold is-size-1"
        style={{
          boxShadow: '0.5rem 0 0 #f40, -0.5rem 0 0 #f40',
          backgroundColor: '#f40',
          color: 'white',
          padding: '1rem',
        }}
      >
        {title}
      </h2>
    </div>
    <section className="section section--gradient">
      <div className="container">
        <div className="section">
          <div className="columns">
            <div className="column is-7 is-offset-1">
              <h3 className="has-text-weight-semibold is-size-2">{heading}</h3>
              <p>{description}</p>
            </div>
          </div>
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <Features gridItems={intro.blurbs} />
              <h3 className="has-text-weight-semibold is-size-3">
                    {main.heading}
                  </h3>
              <p>{main.description}</p>              
              <img
                    src={"img/youtoo.png"}
                    alt="youtoo"
                    style={{ width: '10em', height: '10em' }}
                  />
              <br></br>
              <a title="youtoo" href="https://youtoooo.com/">
                  <img
                    src={"img/google-play-badge.png"}
                    alt="google-play-badge"
                    style={{ width: '10em', height: '4em' }}
                  />
              </a>
              <p>YouTooは、オリジナルのプロフィールを面白おかしく作成できるアプリです。<br></br>出会った人とプロフィールを交換することで、趣味や職業、伝えたいことをわかりやすく伝えることができます！<br></br>ふとしたときにこのアプリがあれば、繋がりを引き寄せるキッカケになります！<br></br>オリジナルのプロフィールを作成して新しい友達・共通点をもった人と交流して楽しみましょう！</p>
              <img
                    src={"img/monsterfilter.png"}
                    alt="monsterfilter"
                    style={{ width: '10em', height: '10em' }}
                  />
              <br></br>
              <a title="monsterfilter" href="https://itunes.apple.com/jp/app/id1512883792?mt=8">
                  <img
                    src={"img/applestore.svg"}
                    alt="applestore-badge"
                    style={{ width: '8em', height: '3em' }}
                  />
              </a>
              <p>monsterfilterはSafariを使用してサイトを閲覧する際に広告・画像・SNS共有ボタン・トラッキングなど自分がブロックしたいコンテンツをブロック出来るアプリです。<br></br>ポップアップ広告、×や閉じるを押しても消えない広告、バナー広告などサイトをブラウジングする際に煩わしく感じる広告をブロックします。</p>
              <img
                    src={"img/shibuya_lanch.png"}
                    alt="monsterfilter"
                    style={{ width: '10em', height: '10em' }}
                  />
              <br></br>
              <a title="shibuya_lanch" href="https://itunes.apple.com/jp/app/id1510506481?mt=8">
                  <img
                    src={"img/applestore.svg"}
                    alt="applestore-badge"
                    style={{ width: '8em', height: '4em' }}
                  />
              </a>
              <a title="shibuya_lanch" href="https://play.google.com/store/apps/details?id=tech.landland.shibuya_dejeuner">
                  <img
                    src={"img/google-play-badge.png"}
                    alt="google-play-badge"
                    style={{ width: '10em', height: '4em' }}
                  />
              </a>
              <p>渋谷deランチはランチを決めるときはお店をルーレットで選ぶという弊社内の文化から生まれたアプリです。<br></br>今日のランチはあそこへ行こう！<br></br>お店をじっくり選ぶもすぐ選ぶもその日の気分でよし。<br></br>渋谷のランチを制覇しよう。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
)

ProductPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
  main: PropTypes.shape({
    heading: PropTypes.string,
    description: PropTypes.string,
    image1: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    image2: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    image3: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  }),
  fullImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  pricing: PropTypes.shape({
    heading: PropTypes.string,
    description: PropTypes.string,
  }),
}

const ProductPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <ProductPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        description={frontmatter.description}
        intro={frontmatter.intro}
        main={frontmatter.main}
        fullImage={frontmatter.full_image}
        pricing={frontmatter.pricing}
      />
    </Layout>
  )
}

ProductPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default ProductPage

export const productPageQuery = graphql`
  query ProductPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
          heading
          description
        }
        main {
          heading
          description
          image1 {
            alt
            image {
              childImageSharp {
                fluid(maxWidth: 526, quality: 92) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          image2 {
            alt
            image {
              childImageSharp {
                fluid(maxWidth: 526, quality: 92) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          image3 {
            alt
            image {
              childImageSharp {
                fluid(maxWidth: 1075, quality: 72) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
        full_image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        pricing {
          heading
          description
        }
      }
    }
  }
`
