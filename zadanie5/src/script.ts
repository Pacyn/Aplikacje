const cssElements : string[] = ["style-1.css","style-2.css","style-3.css"];
const footer = document.getElementById("footer");

function appendCss(cssName: string) : void{
    alert(`CSS WILL CHANGE TO ${cssName}`);
    const linkElement = document.head.querySelector("link[rel='stylesheet']");
    linkElement?.setAttribute("href",`src/${cssName}`);
}

function createAElement(cssName: string){
    const aElement = document.createElement("a");
    aElement.innerText = `Css: ${cssName}`;
    aElement.setAttribute("href",'#');
    aElement.setAttribute("onclick",`appendCss('${cssName}');`);
    footer?.appendChild(aElement);
}

cssElements.forEach(element => {
    createAElement(element);
});

(window as any).appendCss = appendCss;