import {parse} from "papaparse";
import tsvFile from "raw-loader!../data/data.tsv";

export type Data = {
    name: string;
    elaborations: Elaboration[];
}

export type Elaboration = {
    text: string;
    link?: string;
}

export const mockData: Data[] = [
    {
        name: "Medvedev",
        elaborations: [{ text: "who has wine field in Italy" }]
    },
    {
        name: "Putin",
        elaborations: [{ text: "who controls everything in Russia" }]
    }
];


const tsv = parse(tsvFile, {
    delimiter: "\t",
    skipEmptyLines: true
});

export const data: Data[] = tsv.data
    .filter(row => row[0] !== "" && row[1] !== "")
    .reduce((arr: Data[], row: string[])=>{
        for(let i in arr) {
            if(arr[i].name === row[0]) {
                arr[i].elaborations.push({
                    text: row[1],
                    link: row[2]
                })
                return arr;
            }
        }
        arr.push({
            name: row[0],
            elaborations: [
                {text: row[1], link: row[2]}
            ]
        })
        return arr;
    }, []);
