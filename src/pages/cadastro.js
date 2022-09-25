import Head from "next/head";
import Router from "next/router";

import AddMemberMap from "../components/AddMemberMap";

import styles from "../../styles/Home.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";
import ProfilePhoto from "../components/ProfilePhoto";
import { useForm } from "react-hook-form";

const DEFAULT_CENTER = [39.52628881655865, 14.284973144531252];
const DEFAULT_ZOOM = 3;

const AddMember = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [location, setLocation] = useState();
    const [publishConsent, setPublishConsent] = useState(false);

    const handleLocation = (value) => {
        setLocation(value);
    };

    const handleAddMember = (data) => {
        data["location"] = location;
        axios
            .post("/api/add-member", data)
            .then(() => {
                toast.success("Cadastro realizado com sucesso!");
                Router.push("/");
            })
            .catch((error) => console.error(error));
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Cadastro de Membro - Vascaínos Pelo Mundo</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <Header />

                <p className={styles.subtitle}>Cadastro de Membro</p>

                <form
                    className={styles.form}
                    onSubmit={handleSubmit(handleAddMember)}
                >
                    {/* <div className={styles.formControl}>
                <ProfilePhoto />
            </div> */}
                    <div className={styles.formControl}>
                        <label>Nome:</label>
                        <input
                            type="text"
                            name="first-name"
                            placeholder="Nome"
                            onChange={(e) => setFirstName(e.target.value)}
                            {...register("firstName", { required: true })}
                        />
                        {errors.firstName && (
                            <p className={styles.fieldError}>
                                Este campo é obrigatório
                            </p>
                        )}
                    </div>
                    <div className={styles.formControl}>
                        <label>Sobrenome:</label>
                        <input
                            type="text"
                            name="last-name"
                            placeholder="Sobrenome"
                            onChange={(e) => setLastName(e.target.value)}
                            {...register("lastName", { required: true })}
                        />
                        {errors.lastName && (
                            <p className={styles.fieldError}>
                                Este campo é obrigatório
                            </p>
                        )}
                    </div>
                    <div className={styles.formControl}>
                        <label>Celular:</label>
                        <input
                            type="text"
                            name="mobile-phone"
                            placeholder="Celular"
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            {...register("phoneNumber", { required: true })}
                        />
                        <p className={styles.formDescription}>
                            Ex.: +55 21 98765-4321
                        </p>
                        {errors.phoneNumber && (
                            <p className={styles.fieldError}>
                                Este campo é obrigatório
                            </p>
                        )}
                    </div>
                    <div className={styles.formControlMap}>
                        <label>Cidade de Residência</label>
                        <p>
                            Clique no mapa para selecionar a cidade onde você
                            reside.
                        </p>
                        <input
                            type="hidden"
                            value={location || ""}
                            {...register("location")}
                        />
                        <AddMemberMap
                            className={styles.addMemberMap}
                            center={DEFAULT_CENTER}
                            zoom={DEFAULT_ZOOM}
                            handleLocation={handleLocation}
                        >
                            {({ TileLayer }, map) => {
                                return (
                                    <>
                                        <TileLayer
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                        />
                                    </>
                                );
                            }}
                        </AddMemberMap>
                        {errors.location && (
                            <p className={styles.fieldError}>
                                Este campo é obrigatório. Selecione no mapa a
                                cidade onde você reside.
                            </p>
                        )}
                    </div>
                    {/* <div className={styles.formControl}>
                        <label>
                            <input
                                type="checkbox"
                                checked={publishConsent}
                                onChange={(e) =>
                                    setPublishConsent(e.target.checked)
                                }
                            />
                            Eu autorizo a publicação de minha informações no
                            mapa Vascaínos Pelo Mundo
                        </label>
                    </div> */}
                    <div className={styles.formControl}>
                        <button type="submit" className="btn-register">
                            Cadastrar
                        </button>
                    </div>
                </form>
            </main>

            <Footer />
            <Toaster />
        </div>
    );
};

export default AddMember;
