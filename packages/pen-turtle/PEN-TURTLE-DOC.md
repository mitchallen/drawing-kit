## Objects

<dl>
<dt><a href="#factory">factory</a> : <code>object</code></dt>
<dd><p>A factory for creating pen-turtles</p>
</dd>
<dt><a href="#pen-turtle">pen-turtle</a> : <code>object</code></dt>
<dd><p>Turtle graphics-like pen tool</p>
</dd>
</dl>

<a name="factory"></a>

## factory : <code>object</code>
A factory for creating pen-turtles

**Kind**: global namespace  
<a name="factory.create"></a>

### factory.create(options) ⇒ <code>object</code>
Create and return new pen-turtle

**Kind**: static method of [<code>factory</code>](#factory)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | options |
| options.x | <code>number</code> | initial x-coordinate of turtle |
| options.y | <code>number</code> | initial y-coordinate of turtle |
| options.heading | <code>number</code> | initial heading of turtle |
| options.color | <code>number</code> | hex color value of line drawn |
| options.fill | <code>number</code> | hex fill color value |
| options.width | <code>number</code> | width of line drawn |
| options.precision | <code>number</code> | floating point precision of numbers stored in path |
| options.homeX | <code>number</code> | home x-coordinate for turtle |
| options.homeY | <code>number</code> | home y-coordinate for turtle |
| options.homeHeading | <code>number</code> | home heading for turtle |
| options.down | <code>boolean</code> | initial state of pen being up (false) or down true |
| options.path | <code>array</code> | initial path |
| options.constrain | <code>function</code> | given x, y, returns true if okay to set new x, y |

**Example** *(init with defaults)*  
```js
const factory = require('@mitchallen/pen-turtle');
let p1 = factory.create();
let p2 = factory.create();
```
**Example** *(init with values)*  
```js
let width = 1024,
    height = 1024,
    cx = width / 2,
    cy = height / 2,
let constrain = function( tx, ty ) {
     // only draw if within margin
     let margin = 10.0
     return( tx >= margin && ty >= margin && tx <= (width - margin) && ty <= (height - margin))
}
let pen1 = factory.create({
     x: cx * 1.5,
     y: cy * 1.5,
     color: 0xFF0000,    // red pen
     width: 4,           // pen width 
     alpha: 0.8,         // pen alpha value
     constrain,  // assign constrain function
});
```
<a name="pen-turtle"></a>

## pen-turtle : <code>object</code>
Turtle graphics-like pen tool

**Kind**: global namespace  

* [pen-turtle](#pen-turtle) : <code>object</code>
    * [.export()](#pen-turtle+export) ⇒ <code>object</code>
    * [.color()](#pen-turtle+color) ⇒ <code>number</code>
    * [.fill()](#pen-turtle+fill) ⇒ <code>number</code>
    * [.width()](#pen-turtle+width) ⇒ <code>number</code>
    * [.path()](#pen-turtle+path) ⇒ <code>array</code>
    * [.x()](#pen-turtle+x) ⇒ <code>number</code>
    * [.y()](#pen-turtle+y) ⇒ <code>number</code>
    * [.heading()](#pen-turtle+heading) ⇒ <code>number</code>
    * [.isDown()](#pen-turtle+isDown) ⇒ <code>boolean</code>
    * [.push()](#pen-turtle+push) ⇒ <code>object</code>
    * [.isStackEmpty()](#pen-turtle+isStackEmpty) ⇒ <code>boolean</code>
    * [.pop()](#pen-turtle+pop) ⇒ <code>object</code>
    * [.down()](#pen-turtle+down) ⇒ <code>object</code>
    * [.up()](#pen-turtle+up) ⇒ <code>object</code>
    * [.turn(degrees)](#pen-turtle+turn) ⇒ <code>object</code>
    * [.left(degrees)](#pen-turtle+left) ⇒ <code>object</code>
    * [.right(degrees)](#pen-turtle+right) ⇒ <code>object</code>
    * [.forward(distance)](#pen-turtle+forward) ⇒ <code>object</code>
    * [.home()](#pen-turtle+home) ⇒ <code>object</code>

<a name="pen-turtle+export"></a>

### pen-turtle.export() ⇒ <code>object</code>
Export

**Kind**: instance method of [<code>pen-turtle</code>](#pen-turtle)  
<a name="pen-turtle+color"></a>

### pen-turtle.color() ⇒ <code>number</code>
Returns the pen color as a hex value

**Kind**: instance method of [<code>pen-turtle</code>](#pen-turtle)  
<a name="pen-turtle+fill"></a>

### pen-turtle.fill() ⇒ <code>number</code>
Returns the fill color as a hex value

**Kind**: instance method of [<code>pen-turtle</code>](#pen-turtle)  
<a name="pen-turtle+width"></a>

### pen-turtle.width() ⇒ <code>number</code>
Returns the width of the pen

**Kind**: instance method of [<code>pen-turtle</code>](#pen-turtle)  
<a name="pen-turtle+path"></a>

### pen-turtle.path() ⇒ <code>array</code>
Returns the drawing path as an array of commands

**Kind**: instance method of [<code>pen-turtle</code>](#pen-turtle)  
<a name="pen-turtle+x"></a>

### pen-turtle.x() ⇒ <code>number</code>
Returns the x-coordinate of the pen

**Kind**: instance method of [<code>pen-turtle</code>](#pen-turtle)  
<a name="pen-turtle+y"></a>

### pen-turtle.y() ⇒ <code>number</code>
Returns the y-coordinate of the pen

**Kind**: instance method of [<code>pen-turtle</code>](#pen-turtle)  
<a name="pen-turtle+heading"></a>

### pen-turtle.heading() ⇒ <code>number</code>
Returns the heading of the pen-turtle

**Kind**: instance method of [<code>pen-turtle</code>](#pen-turtle)  
<a name="pen-turtle+isDown"></a>

### pen-turtle.isDown() ⇒ <code>boolean</code>
Returns true if the pen is down

**Kind**: instance method of [<code>pen-turtle</code>](#pen-turtle)  
<a name="pen-turtle+push"></a>

### pen-turtle.push() ⇒ <code>object</code>
Push x, y, head and down state to stack

**Kind**: instance method of [<code>pen-turtle</code>](#pen-turtle)  
**Returns**: <code>object</code> - return this for chaining  
<a name="pen-turtle+isStackEmpty"></a>

### pen-turtle.isStackEmpty() ⇒ <code>boolean</code>
Returns true if stack empty

**Kind**: instance method of [<code>pen-turtle</code>](#pen-turtle)  
<a name="pen-turtle+pop"></a>

### pen-turtle.pop() ⇒ <code>object</code>
Pops x, y, head and down off stack and moves to x, y

**Kind**: instance method of [<code>pen-turtle</code>](#pen-turtle)  
**Returns**: <code>object</code> - return this for chaining  
<a name="pen-turtle+down"></a>

### pen-turtle.down() ⇒ <code>object</code>
Put the pen down (enables drawing)

**Kind**: instance method of [<code>pen-turtle</code>](#pen-turtle)  
**Returns**: <code>object</code> - return this for chaining  
<a name="pen-turtle+up"></a>

### pen-turtle.up() ⇒ <code>object</code>
Put the pen up (disables drawing)

**Kind**: instance method of [<code>pen-turtle</code>](#pen-turtle)  
**Returns**: <code>object</code> - return this for chaining  
<a name="pen-turtle+turn"></a>

### pen-turtle.turn(degrees) ⇒ <code>object</code>
Turn the turtle

**Kind**: instance method of [<code>pen-turtle</code>](#pen-turtle)  
**Returns**: <code>object</code> - return this for chaining  

| Param | Type | Description |
| --- | --- | --- |
| degrees | <code>number</code> | to turn |

<a name="pen-turtle+left"></a>

### pen-turtle.left(degrees) ⇒ <code>object</code>
Turn the turtle to the left

**Kind**: instance method of [<code>pen-turtle</code>](#pen-turtle)  
**Returns**: <code>object</code> - return this for chaining  

| Param | Type | Description |
| --- | --- | --- |
| degrees | <code>number</code> | to turn |

<a name="pen-turtle+right"></a>

### pen-turtle.right(degrees) ⇒ <code>object</code>
Turn the turtle to the right

**Kind**: instance method of [<code>pen-turtle</code>](#pen-turtle)  
**Returns**: <code>object</code> - return this for chaining  

| Param | Type | Description |
| --- | --- | --- |
| degrees | <code>number</code> | to turn |

<a name="pen-turtle+forward"></a>

### pen-turtle.forward(distance) ⇒ <code>object</code>
Move the turtle forward

**Kind**: instance method of [<code>pen-turtle</code>](#pen-turtle)  
**Returns**: <code>object</code> - return this for chaining  

| Param | Type | Description |
| --- | --- | --- |
| distance | <code>number</code> | to move |

<a name="pen-turtle+home"></a>

### pen-turtle.home() ⇒ <code>object</code>
Move the turtle to the home position

**Kind**: instance method of [<code>pen-turtle</code>](#pen-turtle)  
**Returns**: <code>object</code> - return this for chaining  
