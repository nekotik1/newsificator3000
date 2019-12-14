import { Data, data } from "./models/data";

type Replacement = {
    regexp: RegExp;
    newText: string;
}

const convertIntoReplacement = (data: Data): Replacement => {
    const regexp = new RegExp(data.name);
    const newText = data.name + " (" + data.elaboration + ")";
    return { regexp, newText }
}

const replacements: Replacement[] = data.map(convertIntoReplacement);

const replaceTextInDom = (root: Node) => {
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/createTreeWalker
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, rejectScriptTextFilter);
    let updateCount = 0;
    while (walker.nextNode()) {
        const node = walker.currentNode;
        let newText = node.textContent;
        for(let replacement of replacements) {
            newText = newText.replace(replacement.regexp, replacement.newText);
        }
        if(newText != node.textContent) {
            node.textContent = newText;
            updateCount++;
        }
    }
    console.log(`updated ${updateCount} times`);
}

/**
 * Rejects text content inside <script> tag https://stackoverflow.com/a/37178130
 */
const rejectScriptTextFilter = {
    acceptNode: function (node) {
        if (node.parentNode.nodeName !== 'SCRIPT') {
            return NodeFilter.FILTER_ACCEPT;
        }
    }
};

replaceTextInDom(document.body);
