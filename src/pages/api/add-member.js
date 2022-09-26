// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { gql, GraphQLClient } from "graphql-request";

const MUTATION_ADD_MEMBER = gql`
    mutation addMember(
        $upsert: MemberUpsertInput!
        $where: MemberWhereUniqueInput!
    ) {
        upsertMember(upsert: $upsert, where: $where) {
            id
        }
    }
`;

const MUTATION_PUBLISH_MEMBER = gql`
    mutation publishMember($id: ID!) {
        publishMember(where: { id: $id }) {
            id
        }
    }
`;

const hygraph = new GraphQLClient(process.env.HYGRAPH_CONTENT_API, {
    headers: {
        authorization: `Bearer ${process.env.HYGRAPH_TOKEN}`,
    },
});

function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
}

export default async (req, res) => {
    if (req.method === "POST") {
        // Process a POST request
        const { firstName, lastName, phoneNumber, location } = req.body;
        const upsertData = {
            create: {
                firstName: firstName,
                lastName: lastName,
                mobileNumber: phoneNumber,
                location: location,
                published: true,
                publishConsent: true,
            },
            update: {
                firstName: firstName,
                lastName: lastName,
                mobileNumber: phoneNumber,
                location: location,
                published: true,
                publishConsent: true,
            },
        };
        const whereData = {
            id: null,
        };

        const { upsertMember } = await hygraph.request(MUTATION_ADD_MEMBER, {
            upsert: upsertData,
            where: whereData,
        });

        await hygraph.request(MUTATION_PUBLISH_MEMBER, {
            id: upsertMember.id,
        });

        res.status(201).json({ id: upsertMember.id });
    } else {
        // Handle any other HTTP method
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    }
};
