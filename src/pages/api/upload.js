import axios from "axios";
import FormData from "form-data";
import formidable from "formidable";
import { createReadStream } from "fs";
import { gql, GraphQLClient } from "graphql-request";

const hygraph = new GraphQLClient(process.env.HYGRAPH_CONTENT_API, {
    headers: {
        authorization: `Bearer ${process.env.HYGRAPH_TOKEN}`,
    },
});

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async (req, res) => {
    return new Promise((resolve, reject) => {
        if (req.method === "POST") {
            // Process a POST request
            const formApi = new formidable.IncomingForm();

            formApi.parse(req, async (err, fields, files) => {
                if (err) {
                    console.log("Error parsing files");
                    return res.status(400).json({
                        status: "Error",
                        message: "There was an error parsing files",
                        error: err,
                    });
                }

                const formData = new FormData();
                formData.append(
                    "fileUpload",
                    createReadStream(files.fileUpload.filepath),
                    files.fileUpload.originalFilename
                );

                console.log(createReadStream(files.fileUpload.filepath));

                const upload = await axios
                    .post(`${process.env.HYGRAPH_CONTENT_API}/upload`, {
                        headers: {
                            Authorization: `Bearer ${process.env.HYGRAPH_TOKEN}`,
                        },
                        body: formData,
                    })
                    .then((response) => {
                        return response;
                    })
                    .catch((error) => {
                        // console.log(error);
                    });

                // const updatePage = await gcmsClient.request<UpdatePageMutation, UpdatePageMutationVariables>(UpdatePageDocument, {
                //     id: req.query.pageId,
                //     data: {
                //         profilePhoto: {
                //             connect: {
                //                 id: upload.id
                //             }
                //         }
                //     }
                // });

                if (upload) {
                    console.log("Uploaded Image:", upload);
                    res.status(201).json({ id: upload.id });
                    resolve({ id: upload.id });
                } else {
                    res.status(400).json({
                        status: "Error",
                        message: "There was an error uploading the file",
                        error: err,
                    });
                }
            });
        } else {
            // Handle any other HTTP method
            res.status(405).json({
                error: `Method '${req.method}' Not Allowed`,
            });
        }
    });
};
