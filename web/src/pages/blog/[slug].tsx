/* eslint-disable @next/next/no-img-element */
import Layout from '@/components/layout'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import s from '@/styles/blog.module.css'
import { Inter } from 'next/font/google'
import Markdown from 'react-markdown'

const inter = Inter({ subsets: ['latin'] })

const Post = ({ post }: { post: Post }) => {
  return (
    <Layout>
      <main>
        <article className={s.article}>
          <div className={s.header}>
            <h1 className={s.title}>{post.title}</h1>
            <div className={s.authorContainer}>
              <img
                className={s.authorPicture}
                src={post.author?.profile_picture!}
                alt={post.title!}
              />
              <span className={`${s.authorName} ${inter.className}`}>
                {post.author?.name}
              </span>
            </div>
          </div>

          <img
            className={s.coverPicture}
            src={post.cover_picture!}
            alt={post.title!}
          />
          <Markdown className={`${s.body} ${inter.className}`}>{`
# Cepit levis protinus in mersis agis victa

## A et dea mortemque villae liquefactis eripe

Lorem markdownum rerum, inmittitur precor; alta inpune licet creatos. Atque
iactatis auditas falleret et Caicum Nisi pulverulenta virgo fulgebant tuque, per
Achaia aurum praetemptanda pontus, coeptas officiis. Summa mihi ulla ordine
iuncti memores caespes mea Cancri quibus montibus vates adhaeret fores, hac.
Quid minantia in mea antiquam captantur: cuncta nemus. Est curis fleturi omnem.

- Ipso caput pro
- Laticem redigentur deos semper vel quondam caesas
- Barba mare spatium venti capillis perfundit Phoebi
- Contra suam vagatur
- Pande caelo sive

## Deicit aeterna vulnus si carmine illis Orithyia

Vivit iuvencae duris nec ferroque **una nunc** patulosque quibus illic. Nec onus
fama recentes Pelagonaque evadere patremque et paratur frigus sic morte in
supremos cum, togaque semper! Deae murmure videntur cani imagine Othrys bulla
fatemur similisque Cumaea perque Achivam.

- Quidem fluctus succendit venis et superare palluit
- Aquaticus esse
- Domi nomen Troezen
- Olivae bracchia Indigetem vocant est tunc voce
- Altaria paterni inmensae posuit in est servato

## Praerupta o tritis

De laetum tritumque et visus qui habenis occidit, ita aurum et Diomede crura.
Verberat patria timet, quos o aures, est an stolidarum ve mihi vulnus positus
insequitur [barbarus](http://www.separat.com/). Coniunx laetitiam dolentes summa
exaudire. Petit praeterita illi non sanguine diffugiunt in doctior curvis
requiret similis Thisbaeas, solis quod; ille.

1. Iura suberant herbis regis primoque succeditis da
2. Meae fortia est
3. Vim imagine ad magni
4. Quae datura Actaeon perterritus ista decipis tum
5. Gemino satiaque

## Istis nervis erat obituque ululare placuisse arma

Comitum referente, **inplet**! Quas nervis ab ilia annos Io atque iustae at
auctor coluere commune.

## Et nec terris in poenas et emergit

Cum ipse quidem mentoque arsit inminet armis posuere postes quem hunc iam
Cereris, cur quem. Caperet *habent*, quae melius praeclusaque premit placido
flammae. Faunine **saxa Diomedis** sermone virides celebrant sparsisque ubi;
Threiciis stamine conditus Nox velamina cum, avitum? Ait alveus, et ad verberis
[cura](http://www.et.org/virgaeima) tanta Panaque nota suaque.

Suis diremit cortex tantumque serpere locat, hospes, ut dubius tantum unde. Quod
hora pulvere [surrexit auxilio iuvenes](http://www.dea-stolidaeque.org/et-illa)
simillimus parte, **pondere Minyae et** numen Pedasus; omni. Iaculi vetus
*coercet* tabellis o vulnera cutem constiterat latus sorori aethera Timores.`}</Markdown>
        </article>
      </main>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [
      {
        params: {
          slug: 'tokyo',
        },
      },
    ],
    fallback: false,
  }
}
export const getStaticProps: GetStaticProps = async (ctx) => {
  const post: Post = {
    title: 'A Thousand Nights in Tokyo ',
    body: `Lörem ipsum omakase vitåk köd preck, även om debusm. Astrott pabel, såväl som heterovis pagisk. Pantris krololån. Explainer nedinas por, men reng sedan posam. Tålåss mikölig besam suprada. 
Intranat asön. Vypöde räd. Beligt följare. Öde syr hånat utom teletopi, och geopp. Tresade öpösa nyktiga autode. 
`,
    cover_picture:
      'https://images.unsplash.com/photo-1554797589-7241bb691973?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dG9reW98ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    author: {
      name: 'Ishimoto Hatsu',
      email: 'Hatsu@email.com',
      profile_picture:
        'https://images.unsplash.com/photo-1606661567747-d86242d14794?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fGphcGFuZXNlJTIwcGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    } as User,
  }

  return {
    props: {
      post,
    },
  }
}

export default Post
