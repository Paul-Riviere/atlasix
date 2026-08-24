# Configuration

Atlasix configuration is made entirely through a single JSON object. Here you'll find a detailed and exhaustive list of available parameters.

## Viewer

The viewer is the entirer area where the schema is displayed.

### `backgroundColor`

**Description :** Background color of the entire viewer. Accepted values are css valid color values : 

- *"<css color name\>"*
- *"rgb(x y z)"*
- *"#<hex value\>"*.

**Type :** String

**Default value :** "white"

---

### `width`

**Description :** Width of the viewer in px.

**Type :** Number

**Default value :** 0, wich makes 100% width of the parent element.

---

### `height`

**Description :** Height of the viewer in px.

**Type :** Number

**Default value :** 0, wich makes 100% height of the parent element.

## Nodes

Each node must be declared inside the `nodes` key, which is an array.

### `id`

**Description :** Id of the node. Id is only needed when you create edges with the node, to identify it.

**Type :** string

**Default value :** "" id is set with a unique id before rendering when it's not provided.

---

### `text`

**Description :** Content of the text rendered below the node.

**Type :** string

**Default value :** "".

---

### `textColor`

**Description :** Color of the text rendered below the node. Accepted values are css valid color values : 

- *"<css color name\>"*
- *"rgb(x y z)"*
- *"#<hex value\>"*.

**Type :** string

**Default value :** "black".

---

### `textSize`

**Description :** Size of the text rendered below the node.

**Type :** number

**Default value :** 25.

---

### `fillColor`

**Description :** Inside color of the node. Accepted values are css valid color values : 

- *"<css color name\>"*
- *"rgb(x y z)"*
- *"#<hex value\>"*.

**Type :** string

**Default value :** "", which makes it transparent.

---

### `borderColor`

**Description :** Border color of the node. The border only appears when you select the node. Accepted values are css valid color values : 

- *"<css color name\>"*
- *"rgb(x y z)"*
- *"#<hex value\>"*.

**Type :** string

**Default value :** "black".

---

### `shape`

**Description :** Shape of the node. Accepted values are :
- "rectangle"
- "triangle"
- "circle"

**Type :** string

**Default value :** "".

---

### `image`

**Description :** Image rendered instead of the node shape. You can have a border with an image, but not a shape.

**Type :** string

**Default value :** "".

---

### `width`

**Description :** Width of the node.

**Type :** number

**Default value :** 50.

---

### `height`

**Description :** Height of the node.

**Type :** number

**Default value :** 50

---

### `x`

**Description :** X position of the node.

**Type :** number

**Default value :** No default value.

---

### `y`

**Description :** Y position of the node.

**Type :** number

**Default value :** No default value.

---

### `data`

**Description :** Data of the node. You can put every key/value you want inside this object. Every data will be rendered when you select the node, on the sidebar.

**Type :** object

**Default value :** No default value.

## Edges

Each edge must be declared inside the `edges` key, which is an array.


### `source`

**Description :** Id of the source node.

**Type :** string

**Default value :** No default value.

---

### `target`

**Description :** Id of the target node.

**Type :** string

**Default value :** No default value.

---

### `color`

**Description :** Color of the edge. Accepted values are css valid color values : 

- *"<css color name\>"*
- *"rgb(x y z)"*
- *"#<hex value\>"*.

**Type :** string

**Default value :** "black".

---

### `width`

**Description :** Width of the edge.

**Type :** number

**Default value :** 1.

---

### `borderColor`

**Description :** Border color of box around the edge. The border only appears when you select the edge. Accepted values are css valid color values : 

- *"<css color name\>"*
- *"rgb(x y z)"*
- *"#<hex value\>"*.

**Type :** string

**Default value :** "black".

---

### `data`

**Description :** Data of the edge. You can put every key/value you want inside this object. Every data will be rendered when you select the edge, on the sidebar.

**Type :** any

**Default value :** No default value.
