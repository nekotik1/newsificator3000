import { Data, data, Elaboration } from "./models/data";
import styleCss from "raw-loader!./style.css";

type Replacement = {
    regexp: RegExp;
    newText: string;
    newFragment: DocumentFragment;
    petitionLink?: string;
}

document.body.addEventListener("click", function (e) {
    const element = e.target as HTMLElement;
    if(!element.classList.contains("newsificator3000-name")) return;
    const style = (element.childNodes[0] as HTMLElement).style;
    style.display = style.display === "none" ? "inline" : "none";
    e.preventDefault();
});

document.head.appendChild((()=>{
    const style = document.createElement("style");
    style.textContent = styleCss;
    return style;
})());

let elementCounter = 0;
const convertIntoReplacement = (data: Data): Replacement => {
    const regexp = new RegExp(data.name + "(?=$|[^A-Za-z\u0400-\u04FF])", "g");
    const elaboration = chooseElaborationRandomly(data.elaborations);
    const newFragment = document.createDocumentFragment();
    const newText = data.name;
    newFragment.appendChild(buildNameElement());
    if(data.petitionLink) {
        newFragment.appendChild((()=>{
            const a = document.createElement("a");
            a.href=data.petitionLink;
            a.style.display="inline-block";
            a.style.height="1em";
            a.style.width="1em";
            a.style.background='url("data:image/png;base64,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")';
            a.style.backgroundSize="contain";
            a.style.verticalAlign="text-bottom";
            a.target="_blank";
            return a;
        })());
    }
    return { regexp, newText, newFragment, petitionLink: data.petitionLink }

    function buildNameElement() {
        const span = document.createElement("span");
        span.className="newsificator3000-name"
        span.appendChild(buildElaborationElement());
        span.appendChild(document.createTextNode(data.name))
        return span; 
    }

    function buildElaborationElement() {
        const span = document.createElement("span");
        span.className="newsificator3000-tooltip";
        span.textContent = elaboration.text;
        span.style.display="none";
        return span;
    }
}

const chooseElaborationRandomly = (elaborations: Elaboration[]) => {
    return elaborations[Math.floor(Math.random() * elaborations.length)];
}

const replacements: Replacement[] = data.map(convertIntoReplacement);

const replaceList = [];

const replaceTextInDom = (root: Node) => {
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/createTreeWalker
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, rejectScriptTextFilter);
    let updateCount = 0;
    while (walker.nextNode()) {
        const node = walker.currentNode;
        replaceInTextNode(node as Text);
        /*
        let newText = replaceText(node.textContent);
        if (newText != node.textContent) {
            node.textContent = newText;
            updateCount++;
            replaceInTextNode(node);
        }
        */
    }
    for(let replace of replaceList) {
        updateCount++;
        replace.node.parentNode.replaceChild(replace.frag, replace.node);
    }
    console.log(`updated ${updateCount} places`);
}

type ReplacementIntermediate = string | Node;

const replaceInTextNode = (node: Text) => {
    let intermediates: ReplacementIntermediate[] = [node.textContent];
    for (let replacement of replacements) {
        const newArr: ReplacementIntermediate[] = [];
        intermediates.forEach(node => {
            if(typeof node !== "string") {
                newArr.push(node);
            } else {
                const values = node.split(replacement.regexp);
                for(let i=0; i<values.length; i++) {
                    if(i>0) newArr.push(replacement.newFragment.cloneNode(true));
                    newArr.push(values[i])
                }
            }
        })
        intermediates = newArr;
    }
    if(intermediates.length==1) {
        return;
    }
    const frag = document.createDocumentFragment();
    for(let intermediate of intermediates) {
        if(typeof intermediate === "string") {
            frag.appendChild(document.createTextNode(intermediate));
        } else {
            frag.appendChild(intermediate);
        }
    }
    replaceList.push({
        node,
        frag
    })
}

const generateElement = (replacement: Replacement) => {
    const fragment = document.createDocumentFragment();
    fragment
}

const replaceTextInTitle = () => {
    document.title = replaceText(document.title);
}

const replaceText = (text: string) => {
    let newText = text;
    for (let replacement of replacements) {
        newText = newText.replace(replacement.regexp, replacement.newText);
    }
    return newText;
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

replaceTextInTitle();
replaceTextInDom(document.body);
