import axios from "axios";

export async function getListFromTmdb(requestString: string) {
    return await axios.get(requestString).then((res) => res.data.results);
}

export async function getFromTmdb(requestString: string) {
    return await axios.get(requestString).then((res) => res.data);
}
