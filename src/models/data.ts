import {parse} from "papaparse";
import tsvFile from "raw-loader!../data/data.tsv";

export type Data = {
    name: string;
    elaborations: Elaboration[];
}

export type Elaboration = {
    text: string;
    link?: string;
    petitionLink?: string;
    petitionLinkTitle?: string;
    highlightStyle: string;
}

const tsv = parse(tsvFile, {
    delimiter: "\t",
    skipEmptyLines: true
});

export const data: Data[] = tsv.data
    .filter(row => row[0] !== "")
    .reduce((arr: Data[], row: string[])=>{
        for(let i in arr) {
            if(arr[i].name === row[0]) {
                arr[i].elaborations.push({
                    text: row[1],
                    link: row[2] || null,
                    petitionLink: row[3] || null,
                    petitionLinkTitle: row[4] || null,
                    highlightStyle: row[5] || null
                });
                return arr;
            }
        }
        arr.push({
            name: row[0],
            elaborations: [
                {text: row[1], link: row[2] || null, petitionLink: row[3] || null, petitionLinkTitle: row[4] || null, highlightStyle: row[5] || null}
            ]
        });
        return arr;
    }, []);
