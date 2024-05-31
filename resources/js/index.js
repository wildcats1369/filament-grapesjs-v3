document.addEventListener('alpine:init', () => {
    Alpine.data(
        "grapesjs",
        ({ state, statePath, readOnly, tools, minHeight, container }) => ({
            instance: null,
            state: state,
            tools: tools,
            async init() {
                let [content1] = await Promise.all([
                    fetch('/storage/test-template.tpl').then(response => response.text())
                ]);
                console.log(content1);
                this.instance = grapesjs.init({
                    height: minHeight + 'px',
                    container: container ? container : ".filament-grapesjs .grapesjs-wrapper",
                    showOffsets: true,
                    fromElement: true,
                    noticeOnUnload: false,
                    storageManager: false,
                    loadHtml: state,
                    plugins: [
                        "grapesjs-preset-newsletter" // Only include the newsletter plugin
                    ],
                    inlineCss: true,
                    modalLabelExport: 'Export',
                    blockManager: {
                        blocks: [
                            {
                                id: 'custom-cta', // Unique ID for your custom block
                                label: '{{VAR}}', // Display name for the block
                                content: '<div>{{VAR}}</div>', // Your custom HTML content
                            },
                            {
                                id: 'test', // Unique ID for your custom block
                                label: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 12H17M8 8.5C8 8.5 9 9 10 9C11.5 9 12.5 8 14 8C15 8 16 8.5 16 8.5M8 15.5C8 15.5 9 16 10 16C11.5 16 12.5 15 14 15C15 15 16 15.5 16 15.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>', // Display name for the block
                                content: content1, // Your custom HTML content
                            },
                        ],
                    },
                });
                this.instance.on('update', e => {
                    var content = this.instance.getHtml({
                        cleanId: true
                    });
                    var extract = content.match(/<body\b[^>]*>([\s\S]*?)<\/body>/);
                    if (extract)
                        this.state = extract[1];
                    else
                        this.state = this.instance.getHtml();
                });
            }
        })
    );
});
