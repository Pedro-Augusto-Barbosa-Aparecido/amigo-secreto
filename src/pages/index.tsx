import type { GetServerSideProps, NextPage } from 'next';
import { verifyCookies } from '../utils/cookiesVerifier';

const Home: NextPage = () => {
  return (
    <div>Hello</div>
  )
}

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (!verifyCookies(ctx))
    return {
      redirect: {
        destination: "/login",
        permanent: false
      }
    }
  
  return {
    props: {}
  }

}
