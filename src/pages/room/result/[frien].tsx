import { GetServerSideProps } from "next";

export default function Result () {
    return (
        <main>
        </main>
    );

}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    return {
        props: {}
    }

}
