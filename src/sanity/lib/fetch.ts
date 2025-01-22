import { createClient } from "next-sanity";
import { PathParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";


const client = createClient({
  projectId: "wwnt1s9e",
  dataset: "production",
  useCdn:false,
  apiVersion: "2023-10-10",
  token:"skEUe0XW6KrYva7Mj0Q9wnp4XGrMujkpckSAenOV5GBgTRz2NQAMMxMpLFeNRhNSwJpYOxeBdRUEyEWt8U2UTocp1i5hyiU5IFTTB06XV8lRGBZ42fa9A43tBWC2RTuEKRrNlHk7e4YWpq6uRhmsnzZi8W19yZwQFd5ExebCyTJwRHM6bYKZ",
});

export async function sanityFetch({query, params ={}}:{query : string ,params?: any}){
    return await client.fetch(query, params)
}