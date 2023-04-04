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

<a name="pen-turtle"></a>

## pen-turtle : <code>object</code>
Turtle graphics-like pen tool

**Kind**: global namespace  

* [pen-turtle](#pen-turtle) : <code>object</code>
    * [.export()](#pen-turtle.export) ⇒ <code>object</code>
    * [.color()](#pen-turtle.color) ⇒ <code>number</code>
    * [.fill()](#pen-turtle.fill) ⇒ <code>number</code>
    * [.width()](#pen-turtle.width) ⇒ <code>number</code>
    * [.path()](#pen-turtle.path) ⇒ <code>array</code>
    * [.x()](#pen-turtle.x) ⇒ <code>number</code>
    * [.y()](#pen-turtle.y) ⇒ <code>number</code>
    * [.heading()](#pen-turtle.heading) ⇒ <code>number</code>
    * [.isDown()](#pen-turtle.isDown) ⇒ <code>boolean</code>
    * [.push()](#pen-turtle.push) ⇒ <code>object</code>
    * [.isStackEmpty()](#pen-turtle.isStackEmpty) ⇒ <code>boolean</code>
    * [.pop()](#pen-turtle.pop) ⇒ <code>object</code>
    * [.down()](#pen-turtle.down) ⇒ <code>object</code>
    * [.up()](#pen-turtle.up) ⇒ <code>object</code>
    * [.turn(degrees)](#pen-turtle.turn) ⇒ <code>object</code>
    * [.left(degrees)](#pen-turtle.left) ⇒ <code>object</code>
    * [.right(degrees)](#pen-turtle.right) ⇒ <code>object</code>
    * [.forward(distance)](#pen-turtle.forward) ⇒ <code>object</code>
    * [.home()](#pen-turtle.home) ⇒ <code>object</code>

<a name="pen-turtle.export"></a>

### pen-turtle.export() ⇒ <code>object</code>
Export

**Kind**: static method of [<code>pen-turtle</code>](#pen-turtle)  
<a name="pen-turtle.color"></a>

### pen-turtle.color() ⇒ <code>number</code>
Returns the pen color as a hex value

**Kind**: static method of [<code>pen-turtle</code>](#pen-turtle)  
<a name="pen-turtle.fill"></a>

### pen-turtle.fill() ⇒ <code>number</code>
Returns the fill color as a hex value

**Kind**: static method of [<code>pen-turtle</code>](#pen-turtle)  
<a name="pen-turtle.width"></a>

### pen-turtle.width() ⇒ <code>number</code>
Returns the width of the pen

**Kind**: static method of [<code>pen-turtle</code>](#pen-turtle)  
<a name="pen-turtle.path"></a>

### pen-turtle.path() ⇒ <code>array</code>
Returns the drawing path as an array of commands

**Kind**: static method of [<code>pen-turtle</code>](#pen-turtle)  
<a name="pen-turtle.x"></a>

### pen-turtle.x() ⇒ <code>number</code>
Returns the x-coordinate of the pen

**Kind**: static method of [<code>pen-turtle</code>](#pen-turtle)  
<a name="pen-turtle.y"></a>

### pen-turtle.y() ⇒ <code>number</code>
Returns the y-coordinate of the pen

**Kind**: static method of [<code>pen-turtle</code>](#pen-turtle)  
<a name="pen-turtle.heading"></a>

### pen-turtle.heading() ⇒ <code>number</code>
Returns the heading of the pen-turtle

**Kind**: static method of [<code>pen-turtle</code>](#pen-turtle)  
<a name="pen-turtle.isDown"></a>

### pen-turtle.isDown() ⇒ <code>boolean</code>
Returns true if the pen is down

**Kind**: static method of [<code>pen-turtle</code>](#pen-turtle)  
<a name="pen-turtle.push"></a>

### pen-turtle.push() ⇒ <code>object</code>
Push x, y, head and down state to stack

**Kind**: static method of [<code>pen-turtle</code>](#pen-turtle)  
**Returns**: <code>object</code> - return this for chaining  
<a name="pen-turtle.isStackEmpty"></a>

### pen-turtle.isStackEmpty() ⇒ <code>boolean</code>
Returns true if stack empty

**Kind**: static method of [<code>pen-turtle</code>](#pen-turtle)  
<a name="pen-turtle.pop"></a>

### pen-turtle.pop() ⇒ <code>object</code>
Pops x, y, head and down off stack and moves to x, y

**Kind**: static method of [<code>pen-turtle</code>](#pen-turtle)  
**Returns**: <code>object</code> - return this for chaining  
<a name="pen-turtle.down"></a>

### pen-turtle.down() ⇒ <code>object</code>
Put the pen down (enables drawing)

**Kind**: static method of [<code>pen-turtle</code>](#pen-turtle)  
**Returns**: <code>object</code> - return this for chaining  
<a name="pen-turtle.up"></a>

### pen-turtle.up() ⇒ <code>object</code>
Put the pen up (disables drawing)

**Kind**: static method of [<code>pen-turtle</code>](#pen-turtle)  
**Returns**: <code>object</code> - return this for chaining  
<a name="pen-turtle.turn"></a>

### pen-turtle.turn(degrees) ⇒ <code>object</code>
Turn the turtle

**Kind**: static method of [<code>pen-turtle</code>](#pen-turtle)  
**Returns**: <code>object</code> - return this for chaining  

| Param | Type | Description |
| --- | --- | --- |
| degrees | <code>number</code> | to turn |

<a name="pen-turtle.left"></a>

### pen-turtle.left(degrees) ⇒ <code>object</code>
Turn the turtle to the left

**Kind**: static method of [<code>pen-turtle</code>](#pen-turtle)  
**Returns**: <code>object</code> - return this for chaining  

| Param | Type | Description |
| --- | --- | --- |
| degrees | <code>number</code> | to turn |

<a name="pen-turtle.right"></a>

### pen-turtle.right(degrees) ⇒ <code>object</code>
Turn the turtle to the right

**Kind**: static method of [<code>pen-turtle</code>](#pen-turtle)  
**Returns**: <code>object</code> - return this for chaining  

| Param | Type | Description |
| --- | --- | --- |
| degrees | <code>number</code> | to turn |

<a name="pen-turtle.forward"></a>

### pen-turtle.forward(distance) ⇒ <code>object</code>
Move the turtle forward

**Kind**: static method of [<code>pen-turtle</code>](#pen-turtle)  
**Returns**: <code>object</code> - return this for chaining  

| Param | Type | Description |
| --- | --- | --- |
| distance | <code>number</code> | to move |

<a name="pen-turtle.home"></a>

### pen-turtle.home() ⇒ <code>object</code>
Move the turtle to the home position

**Kind**: static method of [<code>pen-turtle</code>](#pen-turtle)  
**Returns**: <code>object</code> - return this for chaining  
