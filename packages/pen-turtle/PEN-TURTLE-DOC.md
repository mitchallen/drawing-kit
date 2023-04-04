<a name="module_pen-turtle"></a>

## pen-turtle
A module for turtle graphics-like pen tool


* [pen-turtle](#module_pen-turtle)
    * [export()](#exp_module_pen-turtle--export) ⇒ <code>object</code> ⏏
    * [color()](#exp_module_pen-turtle--color) ⇒ <code>number</code> ⏏
    * [fill()](#exp_module_pen-turtle--fill) ⇒ <code>number</code> ⏏
    * [width()](#exp_module_pen-turtle--width) ⇒ <code>number</code> ⏏
    * [path()](#exp_module_pen-turtle--path) ⇒ <code>array</code> ⏏
    * [x()](#exp_module_pen-turtle--x) ⇒ <code>number</code> ⏏
    * [y()](#exp_module_pen-turtle--y) ⇒ <code>number</code> ⏏
    * [heading()](#exp_module_pen-turtle--heading) ⇒ <code>number</code> ⏏
    * [isDown()](#exp_module_pen-turtle--isDown) ⇒ <code>boolean</code> ⏏
    * [push()](#exp_module_pen-turtle--push) ⇒ <code>object</code> ⏏
    * [isStackEmpty()](#exp_module_pen-turtle--isStackEmpty) ⇒ <code>boolean</code> ⏏
    * [pop()](#exp_module_pen-turtle--pop) ⇒ <code>object</code> ⏏
    * [down()](#exp_module_pen-turtle--down) ⇒ <code>object</code> ⏏
    * [up()](#exp_module_pen-turtle--up) ⇒ <code>object</code> ⏏
    * [turn(degrees)](#exp_module_pen-turtle--turn) ⇒ <code>object</code> ⏏
    * [left(degrees)](#exp_module_pen-turtle--left) ⇒ <code>object</code> ⏏
    * [right(degrees)](#exp_module_pen-turtle--right) ⇒ <code>object</code> ⏏
    * [forward(distance)](#exp_module_pen-turtle--forward) ⇒ <code>object</code> ⏏
    * [home()](#exp_module_pen-turtle--home) ⇒ <code>object</code> ⏏

<a name="exp_module_pen-turtle--export"></a>

### export() ⇒ <code>object</code> ⏏
Export

**Kind**: Exported function  
<a name="exp_module_pen-turtle--color"></a>

### color() ⇒ <code>number</code> ⏏
Returns the pen color as a hex value

**Kind**: Exported function  
<a name="exp_module_pen-turtle--fill"></a>

### fill() ⇒ <code>number</code> ⏏
Returns the fill color as a hex value

**Kind**: Exported function  
<a name="exp_module_pen-turtle--width"></a>

### width() ⇒ <code>number</code> ⏏
Returns the width of the pen

**Kind**: Exported function  
<a name="exp_module_pen-turtle--path"></a>

### path() ⇒ <code>array</code> ⏏
Returns the drawing path as an array of commands

**Kind**: Exported function  
<a name="exp_module_pen-turtle--x"></a>

### x() ⇒ <code>number</code> ⏏
Returns the x-coordinate of the pen

**Kind**: Exported function  
<a name="exp_module_pen-turtle--y"></a>

### y() ⇒ <code>number</code> ⏏
Returns the y-coordinate of the pen

**Kind**: Exported function  
<a name="exp_module_pen-turtle--heading"></a>

### heading() ⇒ <code>number</code> ⏏
Returns the heading of the pen-turtle

**Kind**: Exported function  
<a name="exp_module_pen-turtle--isDown"></a>

### isDown() ⇒ <code>boolean</code> ⏏
Returns true if the pen is down

**Kind**: Exported function  
<a name="exp_module_pen-turtle--push"></a>

### push() ⇒ <code>object</code> ⏏
Push x, y, head and down state to stack

**Kind**: Exported function  
**Returns**: <code>object</code> - return this for chaining  
<a name="exp_module_pen-turtle--isStackEmpty"></a>

### isStackEmpty() ⇒ <code>boolean</code> ⏏
Returns true if stack empty

**Kind**: Exported function  
<a name="exp_module_pen-turtle--pop"></a>

### pop() ⇒ <code>object</code> ⏏
Pops x, y, head and down off stack and moves to x, y

**Kind**: Exported function  
**Returns**: <code>object</code> - return this for chaining  
<a name="exp_module_pen-turtle--down"></a>

### down() ⇒ <code>object</code> ⏏
Put the pen down (enables drawing)

**Kind**: Exported function  
**Returns**: <code>object</code> - return this for chaining  
<a name="exp_module_pen-turtle--up"></a>

### up() ⇒ <code>object</code> ⏏
Put the pen up (disables drawing)

**Kind**: Exported function  
**Returns**: <code>object</code> - return this for chaining  
<a name="exp_module_pen-turtle--turn"></a>

### turn(degrees) ⇒ <code>object</code> ⏏
Turn the turtle

**Kind**: Exported function  
**Returns**: <code>object</code> - return this for chaining  

| Param | Type | Description |
| --- | --- | --- |
| degrees | <code>number</code> | to turn |

<a name="exp_module_pen-turtle--left"></a>

### left(degrees) ⇒ <code>object</code> ⏏
Turn the turtle to the left

**Kind**: Exported function  
**Returns**: <code>object</code> - return this for chaining  

| Param | Type | Description |
| --- | --- | --- |
| degrees | <code>number</code> | to turn |

<a name="exp_module_pen-turtle--right"></a>

### right(degrees) ⇒ <code>object</code> ⏏
Turn the turtle to the right

**Kind**: Exported function  
**Returns**: <code>object</code> - return this for chaining  

| Param | Type | Description |
| --- | --- | --- |
| degrees | <code>number</code> | to turn |

<a name="exp_module_pen-turtle--forward"></a>

### forward(distance) ⇒ <code>object</code> ⏏
Move the turtle forward

**Kind**: Exported function  
**Returns**: <code>object</code> - return this for chaining  

| Param | Type | Description |
| --- | --- | --- |
| distance | <code>number</code> | to move |

<a name="exp_module_pen-turtle--home"></a>

### home() ⇒ <code>object</code> ⏏
Move the turtle to the home position

**Kind**: Exported function  
**Returns**: <code>object</code> - return this for chaining  
