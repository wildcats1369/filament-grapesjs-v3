document.addEventListener("alpine:init",()=>{Alpine.data("grapesjs",({state:t,statePath:r,readOnly:c,tools:l,minHeight:i,container:e})=>({instance:null,state:t,tools:l,async init(){let[a]=await Promise.all([fetch("/storage/test-template.tpl").then(s=>s.text())]);console.log(a),this.instance=grapesjs.init({height:i+"px",container:e||".filament-grapesjs .grapesjs-wrapper",showOffsets:!0,fromElement:!0,noticeOnUnload:!1,storageManager:!1,loadHtml:t,plugins:["grapesjs-preset-newsletter"],inlineCss:!0,modalLabelExport:"Export",blockManager:{blocks:[{id:"custom-cta",label:"{{VAR}}",content:"<div>{{VAR}}</div>"},{id:"test",label:"TEST TEMPLATE",content:a}]}}),this.instance.on("update",s=>{var o=this.instance.getHtml({cleanId:!0}),n=o.match(/<body\b[^>]*>([\s\S]*?)<\/body>/);n?this.state=n[1]:this.state=this.instance.getHtml()})}}))});
