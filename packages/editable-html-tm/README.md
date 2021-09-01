# editable-html

`editable-html-tm` is an inline HTML editor, based on TinyMCE editor

## Demo

```bash
npm install
cd demo
../node_modules/.bin/webpack-dev-server --hot --inline
# go to http://localhost:8080
```

## Usage

Install:

```bash
npm install --save @pie-lib/editable-html-tm
```

Import:

```js
import EditableHTML from '@pie-lib/editable-html-tm';
```

Declare:

```jsx
<EditableHTML onChange={this.htmlChanged.bind(this)} markup={markup} />
```
