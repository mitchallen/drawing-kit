## Modules

<dl>
<dt><a href="#module_factory">factory</a></dt>
<dd><p>A factory for creating pen-turtles</p>
</dd>
<dt><a href="#module_pen-turtle">pen-turtle</a></dt>
<dd><p>Turtle graphics-like pen tool</p>
</dd>
</dl>

<a name="module_factory"></a>

## factory
A factory for creating pen-turtles

<a name="module_factory..create"></a>

### factory~create(options) ⇒ <code>object</code>
Create and return new pen-turtle

**Kind**: inner method of [<code>factory</code>](#module_factory)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | options |

<a name="module_pen-turtle"></a>

## pen-turtle
Turtle graphics-like pen tool


* [pen-turtle](#module_pen-turtle)
    * [~export()](#module_pen-turtle..export) ⇒ <code>object</code>
    * [~color()](#module_pen-turtle..color) ⇒ <code>number</code>
    * [~fill()](#module_pen-turtle..fill) ⇒ <code>number</code>
    * [~width()](#module_pen-turtle..width) ⇒ <code>number</code>
    * [~path()](#module_pen-turtle..path) ⇒ <code>array</code>
    * [~x()](#module_pen-turtle..x) ⇒ <code>number</code>
    * [~y()](#module_pen-turtle..y) ⇒ <code>number</code>
    * [~heading()](#module_pen-turtle..heading) ⇒ <code>number</code>
    * [~isDown()](#module_pen-turtle..isDown) ⇒ <code>boolean</code>
    * [~push()](#module_pen-turtle..push) ⇒ <code>object</code>
    * [~isStackEmpty()](#module_pen-turtle..isStackEmpty) ⇒ <code>boolean</code>
    * [~pop()](#module_pen-turtle..pop) ⇒ <code>object</code>
    * [~down()](#module_pen-turtle..down) ⇒ <code>object</code>
    * [~up()](#module_pen-turtle..up) ⇒ <code>object</code>
    * [~turn(degrees)](#module_pen-turtle..turn) ⇒ <code>object</code>
    * [~left(degrees)](#module_pen-turtle..left) ⇒ <code>object</code>
    * [~right(degrees)](#module_pen-turtle..right) ⇒ <code>object</code>
    * [~forward(distance)](#module_pen-turtle..forward) ⇒ <code>object</code>
    * [~home()](#module_pen-turtle..home) ⇒ <code>object</code>

<a name="module_pen-turtle..export"></a>

### pen-turtle~export() ⇒ <code>object</code>
Export

**Kind**: inner method of [<code>pen-turtle</code>](#module_pen-turtle)  
<a name="module_pen-turtle..color"></a>

### pen-turtle~color() ⇒ <code>number</code>
Returns the pen color as a hex value

**Kind**: inner method of [<code>pen-turtle</code>](#module_pen-turtle)  
<a name="module_pen-turtle..fill"></a>

### pen-turtle~fill() ⇒ <code>number</code>
Returns the fill color as a hex value

**Kind**: inner method of [<code>pen-turtle</code>](#module_pen-turtle)  
<a name="module_pen-turtle..width"></a>

### pen-turtle~width() ⇒ <code>number</code>
Returns the width of the pen

**Kind**: inner method of [<code>pen-turtle</code>](#module_pen-turtle)  
<a name="module_pen-turtle..path"></a>

### pen-turtle~path() ⇒ <code>array</code>
Returns the drawing path as an array of commands

**Kind**: inner method of [<code>pen-turtle</code>](#module_pen-turtle)  
<a name="module_pen-turtle..x"></a>

### pen-turtle~x() ⇒ <code>number</code>
Returns the x-coordinate of the pen

**Kind**: inner method of [<code>pen-turtle</code>](#module_pen-turtle)  
<a name="module_pen-turtle..y"></a>

### pen-turtle~y() ⇒ <code>number</code>
Returns the y-coordinate of the pen

**Kind**: inner method of [<code>pen-turtle</code>](#module_pen-turtle)  
<a name="module_pen-turtle..heading"></a>

### pen-turtle~heading() ⇒ <code>number</code>
Returns the heading of the pen-turtle

**Kind**: inner method of [<code>pen-turtle</code>](#module_pen-turtle)  
<a name="module_pen-turtle..isDown"></a>

### pen-turtle~isDown() ⇒ <code>boolean</code>
Returns true if the pen is down

**Kind**: inner method of [<code>pen-turtle</code>](#module_pen-turtle)  
<a name="module_pen-turtle..push"></a>

### pen-turtle~push() ⇒ <code>object</code>
Push x, y, head and down state to stack

**Kind**: inner method of [<code>pen-turtle</code>](#module_pen-turtle)  
**Returns**: <code>object</code> - return this for chaining  
<a name="module_pen-turtle..isStackEmpty"></a>

### pen-turtle~isStackEmpty() ⇒ <code>boolean</code>
Returns true if stack empty

**Kind**: inner method of [<code>pen-turtle</code>](#module_pen-turtle)  
<a name="module_pen-turtle..pop"></a>

### pen-turtle~pop() ⇒ <code>object</code>
Pops x, y, head and down off stack and moves to x, y

**Kind**: inner method of [<code>pen-turtle</code>](#module_pen-turtle)  
**Returns**: <code>object</code> - return this for chaining  
<a name="module_pen-turtle..down"></a>

### pen-turtle~down() ⇒ <code>object</code>
Put the pen down (enables drawing)

**Kind**: inner method of [<code>pen-turtle</code>](#module_pen-turtle)  
**Returns**: <code>object</code> - return this for chaining  
<a name="module_pen-turtle..up"></a>

### pen-turtle~up() ⇒ <code>object</code>
Put the pen up (disables drawing)

**Kind**: inner method of [<code>pen-turtle</code>](#module_pen-turtle)  
**Returns**: <code>object</code> - return this for chaining  
<a name="module_pen-turtle..turn"></a>

### pen-turtle~turn(degrees) ⇒ <code>object</code>
Turn the turtle

**Kind**: inner method of [<code>pen-turtle</code>](#module_pen-turtle)  
**Returns**: <code>object</code> - return this for chaining  

| Param | Type | Description |
| --- | --- | --- |
| degrees | <code>number</code> | to turn |

<a name="module_pen-turtle..left"></a>

### pen-turtle~left(degrees) ⇒ <code>object</code>
Turn the turtle to the left

**Kind**: inner method of [<code>pen-turtle</code>](#module_pen-turtle)  
**Returns**: <code>object</code> - return this for chaining  

| Param | Type | Description |
| --- | --- | --- |
| degrees | <code>number</code> | to turn |

<a name="module_pen-turtle..right"></a>

### pen-turtle~right(degrees) ⇒ <code>object</code>
Turn the turtle to the right

**Kind**: inner method of [<code>pen-turtle</code>](#module_pen-turtle)  
**Returns**: <code>object</code> - return this for chaining  

| Param | Type | Description |
| --- | --- | --- |
| degrees | <code>number</code> | to turn |

<a name="module_pen-turtle..forward"></a>

### pen-turtle~forward(distance) ⇒ <code>object</code>
Move the turtle forward

**Kind**: inner method of [<code>pen-turtle</code>](#module_pen-turtle)  
**Returns**: <code>object</code> - return this for chaining  

| Param | Type | Description |
| --- | --- | --- |
| distance | <code>number</code> | to move |

<a name="module_pen-turtle..home"></a>

### pen-turtle~home() ⇒ <code>object</code>
Move the turtle to the home position

**Kind**: inner method of [<code>pen-turtle</code>](#module_pen-turtle)  
**Returns**: <code>object</code> - return this for chaining  
