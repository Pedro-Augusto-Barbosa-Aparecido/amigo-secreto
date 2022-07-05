import type { GetServerSideProps, NextPage } from 'next';
import { parseCookies } from "nookies";

const Home: NextPage = () => {
  return (
    <div>Hello</div>
  )
}

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'nextauth.token': token } = parseCookies(ctx);

  if (!token) 
    return {
        redirect: {
          destination: '/',
          permanent: false
        }
    }

  return {
    props: {}
  }

}
