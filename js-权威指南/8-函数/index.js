/**
 * 函数值这样的一段js代码，它只定义一次，但可能被执行或调用任意次。你可能已经从诸如子例程(subroutine)
 * 或者过程(procedure)这些名字里对函数的概念有所了解。js函数是参数化的：函数的定义会包括一个
 * 称为形参（parameter）的标识符列表,这些参数在函数体中像局部变量一样工作。函数调用会为形参提供
 * 实参的值。函数使用他们实参的值来计算返回值，成为该函数调用表达式的值。除了实参之外，每次调用
 * 换回拥有另一个值--本次调用的上下文--这就是this关键字的值。
 * 
 * 如果函数挂载在一个对象上，作为对象的一个属性，就称它为对象的方法。当通过这个对象来调用函数时，
 * 该对象就是此次调用的上下文（context），也就是该函数的this的值。用于初始化一个新创建的对象的
 * 函数称为构造函数(constructor)
 * 
 * 在js里，函数即对象，程序可以随意操作他们。比如js可以把函数赋值为变量，或者作为参数传递给其他函数
 * 因为函数就是对象，所以可以给他们设置属性，甚至调用他们的方法。
 * 
 * js的函数可以嵌套在其他函数中定义，这样他们就可以访问他们被定义时所处的作用于中的任何变量。
 * 这以为着js函数构成了一个闭包（closure），它为js带来了非常强劲的编程能力，
 * 
 * 8.1 函数定义
 * 
 * 函数使用function关键字来定义，它可以用在函数定义表达式或者函数声明语句里。这两种形式中，函数
 * 定义都从function关键字开始，气候跟随这些组成部分：
 * 。函数名称标识符。函数名称是函数声明语句必须的部分。它的用途就像变量的名字，新定义的函数对象
 * 会赋值给这个变量。对函数定义表达式来说，这个名字是可选的：如果存在，该名字只存在于函数体中
 * 并指代函数对象本身。
 * 。一堆圆括号，轻重包含由0个或者多个用逗号隔开的标识否组成的列表。这些标识符是函数的参数名称
 * 他们就像函数体中的局部变量。
 * 。一堆花括号，其中包含0条或多条js语句。这些语句构成了函数体：一旦调用函数，就会执行这些语句
 * 
 * 8-1分别展示了函数语句和表达式两种方式的函数定义。注意，以表达式来定义函数只适用于它作为一个
 * 大的表达式的一部分，比如在赋值和调用过程中定义函数：
 * 
 * function printprops(o){
 *    for(var p in o)
 *      console.log(p + ": " + o[p] + "\n");
 * }
 * 
 * function distance(x1, y1, x2, y2){
 *    var dx = x2 - x1;
 *    var dy = y2 - y1
 *    return Math.sqrt(dx*dx + dy*dy)
 * }
 * 
 * function factorial(x){
 *    if(x <= 1) return 1;
 *    return x * factorial(x - 1)
 * }
 * 
 * //函数表达式
 * var square = function(x){return x * x}
 * 
 * var f = function fact(x){if(x <= 1) return 1; else return x*fact(x - 1)}
 * 
 * data.sort(function(a, b){return a - b})
 * 
 * var tensquared = (function(x){return x*x}(10))
 * 
 * 注意：以表达式方式定义的函数，函数的名称是可选的。一条函数声明语句实际上声明了一个变量，并
 * 把一个函数对象赋值给他。相对而言，定义函数表达式时并没有声明一个变量。函数可以命名，就像上
 * 面的阶乘函数，它需要一个名称来指代自己。如果一个函数定义表达式包含名称，函数的局部作用于
 * 将会包含一个绑定到函数对象的函数名称。实际上，函数的名称将成为函数内部的一个局部变量。通常
 * 而言，以表达式方式定义函数时都不需要名称，这会让定义他们的代码更为紧凑。函数定义表达式特别
 * 适合用来定义那些只会用到一次的函数，比如上面展示的最后两个例子。
 * 
 * 如5.3.2所述，函数声明语句‘被提前’到外部脚本或外部函数作用于的顶部，所以以这种方式声明的函数
 * 可以被在他定义之前出现的代码所调用，不过，以表达式定义的函数就另当别论，为了调用一个函数，必须
 * 要能引用它，而要使用一个以表达式方式定义的函数之前，必须把它复制给一个变量。变量的声明提前了
 * 但给变量赋值是不会提前的，所以，以表达式方式定义的函数在定义之前无法调用
 * 
 * 请注意，在8-1中的大多数函数包含一个return语句。return语句导致函数停止执行，并返回它的表达式
 * （如果有的话）的值给调用者。如果return语句没有一个与之相关的表达式，则它返回undefined值，如果
 * 一个函数不包含return语句，那它就只执行函数体中的每条语句，并返回undefined值给调用者。
 * 
 * 例8-1中的大多数函数都是用来计算出一个值得，他们使用return把值返回给调用者。而printprops()
 * 函数的不同之处在于，它的任务是输出对象各属性的名称和值。没有必要返回值，该函数不包含return
 * 语句。printprops()函数的返回值始终是undefined(没有返回值的函数有时候称为过程)
 * 
 * 嵌套函数
 * 
 * 在js里，函数可以嵌套在其他函数里。例如：
 * 
 * function hypotenuse(a, b){
 *    function square(x){return x*x}
 *    return Mah.sqrt(square(a) + square(b))
 * }
 * 
 * 嵌套函数的有趣支撑处在于他的遍历作用于规则：他们可以发放完嵌套他们（或多重嵌套）的函数的参数
 * 和变量。例如，在上面的代码里，内部函数square()可以读写外部函数hypotenuse()函数的参数a和b。
 * 这些作用于规则对内嵌函数非常重要。
 * 
 * 5.3.2节曾提到，函数声明语句并非真正的语句，ECMAScript规范只是允许他们作为顶级语句。他们可以出现在全局
 * 代码里，或者内嵌在其他函数中，但他们不能出现在循环、条件判断，或者try/cache/finallyyiji with
 * 语句中。注意，此限制仅适用于语句声明形式定义的函数。函数定义表达式可以出现在js代码的任何地方
 * 
 * 8.2 函数调用
 * 
 * 构成函数主体的js代码在定义之时并不会执行，只有调用该函数时，他们才会执行。
 * 有4中方式来调用js函数
 * .作为函数
 * .作为方法
 * .作为构造函数
 * .通过他们的call()和apply()方法简介调用
 * 
 * 8.2.1 函数调用
 * 
 * 使用调用表达式可以进行普通的函数调用也可以进行方法调用。一个调用表达式由多个函数表达式组成，
 * 每个函数表达式都是由一个函数对象和左括号、参数猎豹和有括号组成，参数猎豹是由逗号分隔的零个
 * 或多个参数表达式组成。如果函数表达式时一个属性访问表达式，即该函数是一个对象的属性或数组中
 * 的一个元素，那么它就是一个方法调用表达式。下面将会解释这种情况。下面的代码展示了一些普通的
 * 函数调用表达式：
 * printprops({x:1})
 * var total = distance(0, 0, 2, 1) + distance(2,1,3,5)
 * var probabilitty = factorial(5) / factorial(13)
 * 
 * 在一个调用中，每个参数表达式（圆括号之间的部分）都会计算出一个值，计算的结果作为参数传递给
 * 另外一个函数。这些值作为实参传递给声明函数时定义的形参。在函数体中存在一个形参的引用，指向当前
 * 传出的实参列表，通过它可以获得参数的值
 * 
 * 对于普通的函数调用，函数的返回值称为调用表达式的值。如果该函数返回是因为解释器到达结尾，返回
 * 值就是undefined.如果函数返回是因为解释器执行到一条return 语句，返回值就是return之后的表达式
 * 的值，如果return语句没有值，则返回undefined
 * 
 * 根据ECMAScript3和非严格的EMCAScript5对函数调用的规定，调用上下文是全局对象，。而在严格模式下
 * 调用上下文则是undefined
 * 
 * 以函数形式调用的函数通常不适用this关键字。不过，this可以用来判断当前是否都是严格模式。
 * var strict = (fuction(){return !this}())
 * 
 * 8.2.2方法调用
 * 
 * 一个方法无非是个保存在一个对象的属性里的js函数。如果有一个函数f和一个对象o，则可以用下面的代码给
 * o定义一个名为m()的方法：
 * o.m = f;
 * 给对象o定义了方法m()，调用它时就像这样:
 * o.m()
 * 或者，如果m()需要在两个参数，调用起来则像这样：
 * o.m(x, y)
 * 上面的代码是一个调用表达式：它包括一个函数表达式o.m，以及两个实参表达式x和y，函数表达式本身就是
 * 一个属性访问表达式，这意味这该函数被当做一个方法。而不是作为一个普通函数来调用。
 * 
 * 对方法调用的参数和返回值的处理，和上面所描述的普通函数调用完全一致。但是，方法调用和函数调用有一个
 * 重要的区别，即：调用上下文。属性访问表达式由两部分组成：一个对象（本例中的o）和属性名称（m）。这
 * 像这样的方法调用表达式里，对象o成为调用上下文，海曙提可以使用关键字this引用该对象。
 * var calculator = {
 *    operand1:1,
 *    operand2:1,
 *    add:function(){
 *      this.result = this.operand1 + this.operand2;
 *    }
 * }
 * 
 * calculator.add()
 * calculator.result
 * 
 * 大多数方法调用使用点符号来访问属性，使用方括号（的属性访问表达式）也可以进行属性访问操作。
 * o['m'](x, y)
 * a[0](z)
 * 
 * 方法调用可能包括更复杂的属性访问表达式
 * customer.surname.toUpperCase()
 * f().m()
 * 
 * 方法和this关键字是面向对象编程的范例的核心。任何函数只要作为方法调用实际上都会传入一个隐式的实参--
 * 这个实参是一个对象，方法调用的母体就是这个对象。通常来讲，基于那个对象的方法可以执行多种操作，
 * 方法调用的语法已经很清晰地表明了函数将基于一个对象进行操作，比较下面两行代码
 * rect.setSize(width, height)
 * setRectSize(rect, width, height)
 * 
 * 我们假设这两行代码的功能完全一样，他们都作用于一个假定的对象rect。可以看出，第一行的方法调用语法
 * 非常清晰地表明这个函数执行的载体是rect对象，函数中的所有操作都将基于这个对象。
 * 
 * 需要注意的是，this是一个关键字，不是变量也不是属性名。js的语法不允许给this赋值。
 * 和变量不同，关键字this没有作用于的限制，嵌套的函数不会从调用它的函数中继承this。如果嵌套函数作为
 * 方法调用，其this的值指向调用它的对象。如果嵌套函数作为函数调用，其this值不是全局对象（非严格模式下）
 * 就是undefined(严格模式下)。很多人误以为调用嵌套函数时this会指向调用外层函数的上下文。如果你想访问
 * 这个挖我不函数的this值，需要将this的值保存在一个变量里，这个变量和内部函数都同在一个作用于中。通常使用
 * 变量self来保存this，比如：
 * var o = {
 *    m:function(){
 *      var self = this;
 *      console.log(this === o)
 *      f();
 * 
 *      function f(){
 *        console.log(this === o)
 *        console.log(self === o)
 *      }
 *    }
 * }
 * 
 * o.m()
 * 
 * 8.2.3构造函数调用
 * 
 * 如果函数或者方法调用钱带有关键字new,它就是构造函数调用。构造函数调用和普通的函数调用以及方法调用
 * 在实参处理、调用上下文和返回值方面都有不同。
 * 
 * 如果构造函数调用在圆括号内包含一组实参列表，先计算这些实参表达式，然后传入函数内，这和函数调用和方法
 * 调用时一致的。但如果构造函数没有形参，js构造函数调用的语句是允许省略猎豹和括号的。范式没有形参的构造函数
 * 调用都可以省略圆括号，
 * 
 * var o = new Object()
 * var o = new Object;
 * 
 * 构造函数调用创建一个新的空对象，这个对象继承自构造函数的prototype属性。构造函数视图初始化这个新
 * 创建的对象，并将这个对象用做其调用上下文，因此构造函数可以使用this关键字来引用这个新创建的对象。
 * 注意，尽管构造函数看起来像一个方法调用，它依然会使用这个新对象作为调用上下文。也就是说，在表达式
 * new o.m()中，调用上下文并不是o
 * 
 * 构造函数通常不适用return 关键字，他们通常初始化新对象，当构造函数的函数体执行完毕是，它会显示返回。
 * 在这种情况下，构造函数调用表达式的计算结构就是这个新对象的值。然而如果构造函数显示地使用return语句
 * 返回一个对象，那么调用表达式的值就是这个对象。如果构造函数使用return语句但没有指定返回值，或者返回
 * 一个原始值，那么这时将忽略返回值，同时使用这个新对象作为调用结果
 * 
 * 8.2.4  间接调用
 * 
 * js中的函数也是对象，和其他js对象没有什么两样，函数对象也可以包含方法。其中的两个方法call()和
 * apply()可以用来间接地调用函数。两个方法都允许显示指定调用所需的this值，也就是说，任何函数可以
 * 作为任何对象的方法来调用，哪怕这个函数不是那个对象的方法。两个方法都可以指定调用的实参。call()方法
 * 使用它自有的实参列表作为函数的实参，apply()方法则要求以数组的形式传入参数
 * 
 * 8.3 函数的实参和形参
 * 
 * js中的函数定义并未指定函数形参的类型，函数调用也未对传入的实参值做任何类型检查。实际上，js函数调用
 * 甚至不检查传入参数的个数。
 * 
 * 8.3.1 可选形参
 * 
 * 当调用函数的时候传入的实参比函数声明时指定的形参个数要少，剩下的参数豆浆设置为undefined值。因此在
 * 调用函数时形参是否可选以及是否可以省略应当保持较好的适应性为了做到这一点，应当给省略的参数赋值一个
 * 合理的默认值，
 * 
 * function getPropertyNames(o, a){
 *    if(a === undefined) a = []
 *    for(var property in o) a.push(property)
 *    return a;
 * }
 * 
 * var a = getPropertyNames(o)
 * getPropertyNames(p, a)
 * 
 * 如果在第一行代码中不适用if语句，可以使用‘||’运算符，这是一种习惯用法
 * a = a || []
 * 
 * 需要注意的是，当用这种可选实参来实现函数时，需要将可选实参放在实参列表的最后。那些调用你的函数的
 * 程序员没办法省略第一个实参并传入第二个实参的，它必须将Undefined作为第一个实参显式传入。同样注意
 * 在函数定义中使用注释来强调形参是可选的
 * 
 * 8.3.2 可变常的实参列表：实参对象
 * 
 * 当调用函数的时候传入的实参个数超过函数定时是的形参个数是，没有办法直接获得未命名值得引用。参数对象
 * 解决了这个问题。在函数体内，标识符arguments是指向实参对象的引用，实参对象是一个类数组对象，这样
 * 可以通过数字下标就能访问传入函数的实参值，而不用非要通过名字来的到实参
 * 
 * 假设定义了函数f，它的实参只有一个x。如果调用这个函数时传入两个实参，第一个实参可以通过 参数名x来
 * 获得，，也可以通过arguments[0]来的达到。第二个实参只能通过arguments[1]来得到。此外，和真正的数组
 * 一样，arguments也包含一个length属性，用以表示其所包含元素的个数。因此，如果调用函数f()时传入两个
 * 参数，arguments.length的值就是2
 * 
 * 实参对象在很多地方都非常有用，js本身不会这么做
 * function f(x, y, z){
 *    if(arguments.length != 3){
 *      throw new Error('function f called with '+ argument.length +'arguemnts, but it expects 3 arugments')
 *    }
 * }
 * 
 * 需要注意的是，通常不必想这样检查实参个数。大多数情况下js的默认行为是可以满足需要的：省略的实参都将
 * 是undefined,多出的参数会自动省略
 * 
 * 实参对象有一个重要的用处，就是让函数可以操作任意数量的实参。下面的函数就可以接受任意数量的是实参，
 * 并返回传入实参的最大值。
 * 
 * function max(){
 *    var max = Number.NEGATIVE_INFINITY
 *    for(var i = 0; i < arguments.length; i++){
 *      if(arguments[i] > max) max = arguments[i]
 *    }
 *    return max;
 * }
 * 
 * var largest = max(1, 10, 100, 2, 3, 1000 , 5, 4, 10000, 6)
 * 
 * 注意，不定实参函数的实参个数不能为零，arguments[]对象最适合的应用场景是在这样一类函数中，这类函数
 * 包含固定个数的命名和必需参数，以及随后各树不定的可选实参
 * 
 * 记住，arguments并不是真正的数组，他是一个实参对象。每个实参对象都包含以数字为索引的一组元素以及length
 * 属性，但他毕竟不是真正的数组。可以这样理解，它是一个对象，只是碰巧具有以数字为索引的属性。
 * 
 * 实参对象：arguments
 * 
 * 数组对象包含一个非同寻常的特性。在非严格模式下，当一个函数包含若干形参，实参对象的数组元素是形参
 * 所对应实参的别名，实参对象中以数字索引，并且形参名称可以认为是相同变量的不同命名。通过实参名字来修改
 * 实参值得花，通过arguments[]数组也可以获取到更改后的值，
 * 
 * function f(x){
 *    console.log(x)        //输出实参的初始值
 *    arguments[0] = null   //修改实参数组的元素同样会修改x的值
 *    console.log(x)        //输出 'null'
 * }
 * 实参对象：arguments
 * （即  通过修改 arguments 类数组  可以修改 方法参数的值）
 * 
 * 如果实参对象是一个普遍数组的话，第二条console.log(x)语句的结果绝对不会是null，在这个例子中，
 * arguments[0]和x指代同一个值，修改其中一个的值会影响到另一个。
 * 
 * 在ECMAScript5中移除了实参对象的这个特殊特性。在严格模式下还有一点（和非严格模式下相比）不同，在非
 * 严格模式中，函数里的arguments仅仅是一个标识符，在严格模式中，它变成了一个保留字。严格模式中的函数
 * 无法使用arguments作为形参名或局部变量名，也不能给arguments赋值
 * 
 * callee和caller属性
 * 
 * 除了数组元素，实参对象还定义了callee和caller属性。在ECMAScript5严格模式中，对这两个属性的读写操作
 * 都会产生一个类型错误。而在非严格模式下，ECMAScript标准规范规定callee属性指代当前正在执行的函数。
 * caller是非标准的，但大多数浏览器都实现了这个属性，它指代调用当前正在执行的函数的函数。通过caller属性
 * 可以访问调用栈。callee属性在某些时候回非常有用，比如在匿名函数中通过callee来递归地调用自身
 * 
 * var factorial = function(x){
 *    if(x <= 1) return 1;
 *    return x * arguments.callee(x -1)
 * }
 * 
 * ECMAScript 5 严格模式两者都报错
 * callee 指代当前正在执行的函数
 * caller 指代当前执行函数的函数 （非标准）
 * 
 * 8.3.3 将对象属性用作实参
 * 
 * 当一个函数包含超过3个形参时，对于程序员来说，要记住调用函数中实参的正确顺序是在让人头疼。每次调用这个
 * 函数时都要不厌其烦地查阅文档，为了不让程序员每次都翻阅手册这么麻烦，最好通过名/值对的形式来传入参数，
 * 这样参数的顺序就无关要紧了。为了实现这种风格的方法调用，定岗以函数的时候，传入的实参都写入一个单独的对象
 * 之中，在调用的时候传入一个对象，对象中的名/值对是真正需要的实参数据。下面的代码就展示了这种风格的函数
 * 调用，这种写法允许在函数中设置省略参数的默认值
 * 
 * function easyCopy(args){
 *    arrayCopy(
 *      args.from, 
 *      args.from_start || 0,
 *      args.to,
 *      args.to_start || 0,
 *      args.length
 *    )
 * }
 * 
 * var a = [1, 2, 3, 4], b = []
 * easyCopy({from:a, to:b, length:4})
 * 
 * 8.3.4 实参类型
 * 
 * js方法的形参并未声明类型，在形参传入函数体之前也未做任何类型检查。可以采用语义化的单词来给函数实参命名
 * 或者想刚才的实例代码中的arrayCopy()方法一样给实参补充注释，一次使代码自文档化，对于可选的实参来说，
 * 可以在注释中补充一下“这个实参是可选的”。当一个方法可以接受任意数量的实参时，可以使用省略号：
 * 
 * /function max(/*number... /)/
 * 
 * 3.8节已经提到，js在必要的时候回进行类型转换。因此如果函数期望接受一个字符串实参，而调用函数时传入其他
 * 类型的值，所传入的值会在函数体内将其用做字符串的地方转换为字符串类型。所有的原始类型都可以转换为字符串
 * 所有的对象都包含toString()方法，所以这种场景下是不会有任何错误的。
 * 
 * 然而事情不总是这样的，回头看一下刚才提到的arrayCopy()方法。这个方法期望它的第一实参是一个数组。当传入
 * 一个 非数组的值作为第一个实参时，尽管看起来没有问题，实际上会出错。触发所写的函数时只用到一两次的‘用
 * 完即丢’函数，你应当添加类似的实参类型检查逻辑，因为宁愿程序在传入非法值时报错，也不愿非法制导致程序在执行
 * 时报错，相比而言，逻辑执行是的报错消息不堪清晰且更难处理。
 * 
 * function sum(a){
 *    if(isArrayLike(a)){
 *      var total = 0;
 *      for(var i = 0; i < a.length; i++){
 *        var element = a[i]
 *        if(element == null) continue;
 *        if(isFinite(element)) total += element;
 *        else throw new Error('sum(): elements must be finite numbers')
 *      }
 *      return total;
 *    }
 *    else throw new Error('sum(): arggument must be array-like')
 * }
 * 
 * js是一种非常灵活的弱类型语言，有时适合编写实参类型和实参个数的不确定性的函数。接下来flexisum()方法
 * 就是这样。比如，他可以接受任意数量的实参，并可以递归地处理实参是数组的情况，这样的话，它就可以用作不定
 * 参数函数或者实参是数组的函数。此外，这个方法尽可能的在抛出异常之前将非数组转换为数字
 * 
 * function flexisum(a){
 *    var total = 0
 *    for(var i = 0; i < arguments.length; i++){
 *      var element = arguments[i], n;
 *      if(element == null) continue;
 *      if(isArray(element))
 *        n = flexisum.apply(this, element)
 *      else if(typeof element === 'function')
 *        n = Number(element())
 *      else
 *        n = Number(element)
 *      if(isNaN(n))
 *        throw Error('flexisum(): cant convert ' + element + 'to number');
 *      total += n;
 *    }
 *    return total;
 * }
 * 
 * 
 * 8.4 作为值得函数
 * 
 * 函数可以定义，也可以调用，这是函数最重要的特性。函数定义和调用时js的词法特性，对于其他大多数变成语言
 * 来说亦是如此。然而js中，函数不仅是一种语法，也是值，也就是说，可以将函数赋值给变量，存储在对象的属性
 * 或数组的元素中，作为参数传入另外一个函数等。
 * 
 * 为了便于理解js中的函数是如何用作数据的以及js语法
 * function square(x){return x*x}
 * 
 * 这个定义创建一个新的函数对象，并将其赋值给变量square.函数的名称实际上是看不见的，它（square）仅仅是
 * 变量的名字，这个变量指代函数对象。函数还可以赋值给其他的变量，并且仍可以正常工作：
 * 
 * var s = square;
 * square(4)
 * s(4)
 * 
 * 除了可以将函数赋值给变量，同样可以将函数赋值给对象的属性。当函数作为对象的属性调用时，函数就称为方法：
 * var o = {square:function(x){return x*x}}
 * var y = o.square(16)
 * 
 * 函数甚至不需要带名字，当把他们赋值给数组元素时：
 * var a = [function(x){return x*x}, 20]
 * a[0](a[1])
 * 
 * 
 * 函数用作值时的一些例子
 * 
 * function add(x, y){return x + y}
 * function subtract(x, y){return x - y}
 * function multiply(x, y){return x * y}
 * function divide(x, y){return x / y}
 * 
 * function operate(operator, operand1, operand2){
 *    return operator(operand1, operand2)
 * }
 * 
 * var i = operate(add, operate(add, 2, 3), operate(multiply, 4, 5))
 * 
 * var operators = {
 *    add:function(x, y){return x + y},
 *    subtract:function(x, y){return x - y},
 *    multiply:function(x, y){return x * y},
 *    divide:function(x, y){return x / y},
 *    pow:Math.pow
 * }
 * 
 * 自定义函数属性
 * 
 * js中的函数并不是原始值，而是一种特殊的对象，也就是说，函数可以拥有属性。当函数需要一个‘静态’变量来调用
 * 时保持某个值不变，最简便的方式就是给函数定义属性，而不是定义全局变量，显然第一全局变量会让命名空间
 * 变得更加杂乱无章。比如，假设你想写一个返回一个唯一整数的函数，不管在哪里调用函数都会返回这个整数。
 * 而函数不能两次返回同一个值，为了做到这一点，函数必须能够跟踪他每次返回的值，而且这些值得欣喜需要在
 * 不同的函数调用过程中持久化。可以将这些信息存放到全局变量中，但这并不是必须的，因为这个信息仅仅是函数
 * 本身用到的。做好将这个信息保存到函数对象的一个属性中，
 * 
 * uniqueInteger.counter = 0
 * function uniqueInteger(){
 *    return uniqueInteger.counter++;
 * }
 * 
 * function factorial(n){
 *    if(isFinite(n) && n > 0 && n == Math.round(n)){
 *      if(!(n in factorial)){
 *        factorial[n] = n * factorial(n - 1)
 *      }
 *      return factorial[n]
 *    }else{
 *       return NaN;
 *    }
 * }
 * 
 * factorial[1] = 1
 * 
 * 8.5 作为命名空间的函数
 * 
 * 之前介绍了js中的函数作用域的概念：在函数中声明的遍历在整个函数体都是可见的（包括在嵌套的函数中），
 * 在函数的外部是不可见的。不再任何函数内声明的遍历是全局变量，在整个js程序中都是课件的。在js中是无法
 * 声明只在一个代码块内可见的变量的，基于这个原因，我们常常简单地定义一个函数用作临时的命名空间，在这个
 * 命名空间，这个命名空间内定义的函数都不会污染到全局命名空间
 * 
 * 比如，假设你写了一段js模块代码，这段代码将要用在不同的js程序中（对于客户端js来讲通常是用在各种各样的
 * 网页中）。和大多数代码一样，假定这段代码定义了一个用以存储中间计算结果的变量。这样问题就来了，当模块
 * 代码放在不同的程序中运行时，你无法得知这个变量是否已经创建了，如果已经存在这个变量那么将会和代码发生
 * 冲突。解决办法当然是将代码放入一个函数内，然后调用这个函数。这样全局变量就变成了函数内部的局部变量
 * 
 * function mymodule(){
 *  ...
 * }
 * 
 * mymodule()
 * 
 * 这段代码仅仅定义了一个单独的全局变量：名叫‘mymodule’函数，这样还太麻烦，可以直接定义一个匿名函数，并在
 * 单个表达式中调用它
 * 
 * (function(){
 *    //模块代码
 * }())
 * 
 * 这种定义匿名函数并立即在单个表达式中调用它的写法非常常见，已经成为一种惯用法了。注意上面代码的圆括号
 * 的用法，function之前的左括号是必须的，因为如果不写这个左括号，js解释器会视图将关键字function解释为
 * 函数声明语句。使用圆括号js解释器才会正确地将其解析为函数定义表达式。使用圆括号是习惯用法，尽管有些时候
 * 没有必要也不应当省略。这里定义的函数会立即调用
 * 
 * 
 * 
 */
