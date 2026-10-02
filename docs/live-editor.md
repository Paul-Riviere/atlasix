# Live editor

Edit the JSON below, the schema is rendered on every change.

<div style="display: flex; flex-wrap: wrap; gap: 1rem;">
    <div style="flex: 1 1 300px; display: flex; flex-direction: column;">
    <textarea id="liveEditorInput" spellcheck="false" style="min-height: 500px; font-family: monospace; font-size: 0.8rem;">
{
    "backgroundColor": "#fdf5d8",
    "width": 500,
    "height": 500,
    "nodes": [
        {
            "id": "node1",
            "text": "test text",
            "fillColor": "blue",
            "borderColor": "red",
            "shape": "rectangle",
            "width": 100,
            "height": 100,
            "x": 50,
            "y": 50
        },
        {
            "id": "node2",
            "text": "test text 2",
            "fillColor": "yellow",
            "borderColor": "green",
            "shape": "triangle",
            "width": 150,
            "height": 150,
            "x": 200,
            "y": 200
        }
    ],
    "edges": [
        {
            "source": "node1",
            "target": "node2",
            "color": "orange",
            "width": 3
        }
    ]
}</textarea>
    <div id="liveEditorError" style="color: red; font-family: monospace; white-space: pre-wrap;"></div>
    </div>
    <div id="liveEditorDiv"></div>
</div>

<script type="module">
    import { initializeSVG } from '/atlasix/assets/atlasix/atlasix.js'
    const input = document.getElementById("liveEditorInput");
    const container = document.getElementById("liveEditorDiv");
    const error = document.getElementById("liveEditorError");

    function render() {
        try {
            const data = JSON.parse(input.value);
            container.replaceChildren();
            initializeSVG("liveEditorDiv", data);
            error.textContent = "";
        } catch (e) {
            error.textContent = e.message;
        }
    }

    input.addEventListener("input", render);
    render();
</script>
