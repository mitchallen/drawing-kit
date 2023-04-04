## Objects

<dl>
<dt><a href="#factory">factory</a> : <code>object</code></dt>
<dd><p>A factory for creating lsystem generators</p>
</dd>
<dt><a href="#lsystem">lsystem</a> : <code>object</code></dt>
<dd><p>Lsystem generator</p>
</dd>
</dl>

<a name="factory"></a>

## factory : <code>object</code>
A factory for creating lsystem generators

**Kind**: global namespace  
<a name="factory.create"></a>

### factory.create(options) ⇒ <code>object</code>
Create and return new lsystem generator

**Kind**: static method of [<code>factory</code>](#factory)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | options |

**Example**  
```js
const factory = require('@mitchallen/lsystem');
let lsys = factory.create();
```
<a name="lsystem"></a>

## lsystem : <code>object</code>
Lsystem generator

**Kind**: global namespace  

* [lsystem](#lsystem) : <code>object</code>
    * [.turtle](#lsystem.turtle)
    * [.distance](#lsystem.distance) : <code>number</code>
    * [.depth](#lsystem.depth) : <code>number</code>
    * [.depthRatio](#lsystem.depthRatio) : <code>number</code>
    * [.angle](#lsystem.angle) : <code>number</code>
    * [.axiom](#lsystem.axiom) : <code>string</code>
    * [.addRule(name, r)](#lsystem.addRule) ⇒ <code>object</code>
    * [.run()](#lsystem.run) ⇒ <code>object</code>

<a name="lsystem.turtle"></a>

### lsystem.turtle
pen-turtle to use for drawing

**Kind**: static property of [<code>lsystem</code>](#lsystem)  
<a name="lsystem.distance"></a>

### lsystem.distance : <code>number</code>
distance

**Kind**: static property of [<code>lsystem</code>](#lsystem)  
<a name="lsystem.depth"></a>

### lsystem.depth : <code>number</code>
depth

**Kind**: static property of [<code>lsystem</code>](#lsystem)  
<a name="lsystem.depthRatio"></a>

### lsystem.depthRatio : <code>number</code>
depth ratio

**Kind**: static property of [<code>lsystem</code>](#lsystem)  
<a name="lsystem.angle"></a>

### lsystem.angle : <code>number</code>
angle

**Kind**: static property of [<code>lsystem</code>](#lsystem)  
<a name="lsystem.axiom"></a>

### lsystem.axiom : <code>string</code>
axiom

**Kind**: static property of [<code>lsystem</code>](#lsystem)  
<a name="lsystem.addRule"></a>

### lsystem.addRule(name, r) ⇒ <code>object</code>
Add rule

**Kind**: static method of [<code>lsystem</code>](#lsystem)  
**Returns**: <code>object</code> - return this for chaining  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | the name of the rule |
| r | <code>string</code> | the rule |

<a name="lsystem.run"></a>

### lsystem.run() ⇒ <code>object</code>
Run and build the lsystem

**Kind**: static method of [<code>lsystem</code>](#lsystem)  
**Returns**: <code>object</code> - return this for chaining  
