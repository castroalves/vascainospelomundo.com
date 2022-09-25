import Head from "next/head";

import Map from "../components/Map";
import { gql, GraphQLClient } from "graphql-request";

import styles from "../../styles/Home.module.css";
import logoUrl from "../../public/logo-vascainos-pelo-mundo.png";

import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";
import Link from "next/link";

const DEFAULT_CENTER = [39.52628881655865, 14.284973144531252];
const DEFAULT_ZOOM = 3;

const QUERY_MEMBERS = gql`
    query Members {
        members(where: { published: true }) {
            id
            firstName
            lastName
            profilePhoto {
                url
            }
            location {
                latitude
                longitude
            }
        }
    }
`;

export async function getServerSideProps() {
    const hygraph = new GraphQLClient(process.env.HYGRAPH_CONTENT_API);

    const { members } = await hygraph.request(QUERY_MEMBERS);

    return {
        props: {
            members,
        },
    };
}

export default function Home({ members }) {
    return (
        <div className={styles.container}>
            <Head>
                <title>
                    Vascaínos Pelo Mundo | Comunidade de Vascaínos residentes no
                    exterior
                </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <Header />

                <p className={styles.description}>
                    <Link href="/cadastro">
                        <a className={styles.btnRegister}>Quero Participar</a>
                    </Link>
                </p>

                <Map
                    className={styles.homeMap}
                    center={DEFAULT_CENTER}
                    zoom={DEFAULT_ZOOM}
                >
                    {({ TileLayer, Marker, Tooltip }) => (
                        <>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            />
                            {members.map((member) => {
                                const photoUrl = member.profilePhoto
                                    ? member.profilePhoto.url
                                    : "http://localhost:3000/logo-vascainos-pelo-mundo.png";
                                const thumb = L.icon({
                                    iconUrl: photoUrl,
                                    iconRetinaUrl: photoUrl,
                                    iconSize: [40, 40],
                                    tooltipAnchor: [25, 0],
                                    className: "member-photo",
                                });
                                return (
                                    member.location && (
                                        <Marker
                                            key={member.id}
                                            position={[
                                                member.location.latitude,
                                                member.location.longitude,
                                            ]}
                                            icon={thumb}
                                        >
                                            <Tooltip>
                                                {member.firstName +
                                                    " " +
                                                    member.lastName}
                                            </Tooltip>
                                        </Marker>
                                    )
                                );
                            })}
                        </>
                    )}
                </Map>
            </main>

            <Footer />
        </div>
    );
}
