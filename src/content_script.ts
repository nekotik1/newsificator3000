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
    return { regexp, newText, newFragment, petitionLink: elaboration.petitionLink };

    function buildNameElement() {
        const span = document.createElement("span");
        span.className="newsificator3000-name";
        span.appendChild(buildElaborationElement());
        span.appendChild(document.createTextNode(data.name));
        return span; 
    }

    function buildElaborationElement() {
        const span = document.createElement("span");
        span.className="newsificator3000-tooltip";
        if (elaboration.text) {
            span.appendChild((() => {
                const descriptionSpan = document.createElement("span");
                descriptionSpan.textContent = elaboration.text;
                return descriptionSpan;
            })());
            span.appendChild((() => {
                return document.createElement("br");
            })());
            span.appendChild((() => {
                return document.createElement("br");
            })());
        }
        if (elaboration.petitionLink && elaboration.petitionLinkTitle) {
            span.appendChild((() => {
                const petitionLink = document.createElement("a");
                petitionLink.href = elaboration.petitionLink;
                petitionLink.className = "newsificator3000-petition";
                petitionLink.textContent = elaboration.petitionLinkTitle;
                return petitionLink;
            })());
        }
        span.style.display="none";
        return span;
    }
};

const chooseElaborationRandomly = (elaborations: Elaboration[]) => {
    return elaborations[Math.floor(Math.random() * elaborations.length)];
};

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
};

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
        });
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
};

const generateElement = (replacement: Replacement) => {
    const fragment = document.createDocumentFragment();
    fragment
};

const replaceTextInTitle = () => {
    document.title = replaceText(document.title);
};

const replaceText = (text: string) => {
    let newText = text;
    for (let replacement of replacements) {
        newText = newText.replace(replacement.regexp, replacement.newText);
    }
    return newText;
};

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
