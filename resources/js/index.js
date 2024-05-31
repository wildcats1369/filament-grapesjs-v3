document.addEventListener('alpine:init', () => {
    Alpine.data(
        "grapesjs",
        ({ state, statePath, readOnly, tools, minHeight, container }) => ({
            instance: null,
            state: state,
            tools: tools,
            init() {
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
                                content: '{{VAR}}', // Your custom HTML content
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
