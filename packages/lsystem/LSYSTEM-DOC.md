## Modules

<dl>
<dt><a href="#module_factory">factory</a></dt>
<dd><p>A factory for creating lsystem generators</p>
</dd>
<dt><a href="#module_lsystem">lsystem</a></dt>
<dd><p>Lsystem generator</p>
</dd>
</dl>

<a name="module_factory"></a>

## factory
A factory for creating lsystem generators

<a name="module_factory..create"></a>

### factory~create(options) ⇒ <code>object</code>
Create and return new lsystem generator

**Kind**: inner method of [<code>factory</code>](#module_factory)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | options |

**Example**  
```js
const factory = require('@mitchallen/lsystem');
let lsys = factory.create();
```
<a name="module_lsystem"></a>

## lsystem
Lsystem generator


* [lsystem](#module_lsystem)
    * [~addRule(name, r)](#module_lsystem..addRule) ⇒ <code>object</code>
    * [~run()](#module_lsystem..run) ⇒ <code>object</code>

<a name="module_lsystem..addRule"></a>

### lsystem~addRule(name, r) ⇒ <code>object</code>
Add rule

**Kind**: inner method of [<code>lsystem</code>](#module_lsystem)  
**Returns**: <code>object</code> - return this for chaining  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | the name of the rule |
| r | <code>string</code> | the rule |

<a name="module_lsystem..run"></a>

### lsystem~run() ⇒ <code>object</code>
Run and build the lsystem

**Kind**: inner method of [<code>lsystem</code>](#module_lsystem)  
**Returns**: <code>object</code> - return this for chaining  
