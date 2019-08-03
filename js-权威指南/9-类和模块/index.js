/**
 * 第6章详细介绍了js对象，每个js对象都是一个属性集合，相互之间没有任何联系。在js中也可以定义对象的类，让每个对象
 * 共享某些属性，这种“共享”的特性是非常有用的。类的成员或实例都包含一些属性，用以存放或定义他们的状态，其中有些
 * 属性定义了他们的行为（通常称为方法）。这些行为通常是由类定义的，而且为所有实例所共享。例如，假设有一个名为
 * Complex的类用来表示复数，同时还定义了一些复数运算。一个Complex实例应当包含复数的实部和虚部（状态），同样
 * Complex类还会定义复数的加法和乘法操作（行为）
 * 
 * 在js中，类的实现是基于其原型继承机制的。如果两个实例都从同一个原型对象上继承了属性，我们说他们是同一个类的实例。
 * js原型和继承在6.1.3和6.2.2节中有详细讨论
 * 如果两个对象继承自同一个原型，往往以为这（但不是绝对）他们是由同一个构造函数创建并初始化的。
 * 
 * 如果你对诸如java和c++这种强类型的面向对象编程比较熟悉，你回返现js中的类和java以及c++中的类有很大的不同。尽管在
 * 写法上类似，而且在js中也能“模拟”处很多经典的类的特性，但是最好要理解js的类和基于原型的继承机制，以及和传统的java
 * （当然还有类似java的语言）的类和基于类的继承机制的不同之处。
 * 
 * js中类的一个重要特性是“动态可继承”（dynamically extendable），
 * 
 * 
 * 9.1 类和原型
 * 
 * 在js中，类的所有实例对象都从同一个原型对象上继承属性。因此，原型对象是类的核心。在例6-1中定义了inherit()函数，这个
 * 函数返回一个新创建的对象，后继承自某个原型对象。如果定义一个原型对象，然后通过inherit()函数创建一个继承自它的对象
 * 这样就定义了一个js类。通常，类的实例还需要进一步的初始化，通常是通过定义一个函数来创建并初始化这个新对象，参照例9-1
 * 给一个表示“值的范围”的类定义一个原型对象，还定义了一个“工厂”函数用以创建并初始化类的实例
 * 
 * 例9-1：一个简单的js类
 * 
 * function inherit(p){
 *    if(p == null) throw TypeError();
 *    if(Object.create){
 *      return Object.create(p)
 *    }
 *    
 *    var t = typeof p;
 *    if(t !== 'object' || t !== 'function') throw TypeError;
 *    function f(){}
 *    f.prototype = p;
 *    return new f()
 * }
 * 
 * function range(from, to){
 *    var r = inherit(range.methods);
 *    r.from = from;
 *    r.to = to;
 *    return r;
 * }
 * 
 * range.methods = {
 *    includes:function(x){
 *      return this.from <= x && x <= this.to
 *    },
 *    foreach:function(f){
 *      for(var x = Math.ceil(this.from); x <= this.to; x++) f(x);
 *    },
 *    toString:function(){return '(' + this.from + '...' + this.to + ')';}
 * }
 * 
 * var r = range(1, 3)
 * r.includes(2)
 * r.foreach(console.log)
 * console.log(r)
 * 
 * 自我理解----类  =  函数 + 原型对象 
 * 
 * 在例9-1中 有一些代码是没有用的。这段代码定义了一个工厂方法range()，用来创建新的范围对象。
 * 我们注意到，这里给range()函数定义了一个属性range.methods,用以快捷地存放定义类的原型对象
 * 把原型对象挂在函数上没什么大不了，但也不是惯用做法。在这，注意range()函数给每个范围对象
 * 都定义了from盒to属性，用以定义范围的其实和结束为止，这两个属性是非共享的，当然也不是可继承
 * 的。最后，注意在range.methods中定义的那些可共享、科技城的方法都用到了from和to属性，而且
 * 使用了this关键字，为了指代他们，两者使用this关键字来指代调用这个方法的对象。任何类的方法
 * 都可以通过this的这种基于用法来读取对象的属性。
 * 
 * 9.2 类和构造函数
 * 
 * 例9-1展示了在js中定义类的其中一种方法。但这种方法并不常用，毕竟他没有定义构造函数，
 * 构造函数是用来初始化新创建的对象的。8.2.3节已经讲到，使用关键字new来调用构造函数。使用new调用构造函数会自动
 * 创建一个新对象，因此构造函数本身只需初始化这个新对象的状态即可。调用构造函数的一个重要特征是，构造函数的prototype
 * 属性被用作新对象的原型。这意味着通过同一个构造函数创建的所有对象都继承自同一个对象，因此他们都是同一个类的成员
 * 例9-2对例9-1中的‘范围类’做了修改，使用构造函数代替工厂函数：
 */

function Range(from, to){
  this.from = from;
  this.to = to;
}

Range.prototype = {
  includes:function(x){return this.from <= x && x <= this.to},
  foreach:function(f){
    for(var x = Math.ceil(this.from); x <= this.to; x++) f(x)
  },
  toString:function(){return '(' + this.from + '...' + this.to + ')'}
}

var r = new Range(1, 3)
/* console.log(r.includes(2))
r.foreach(console.log)
console.log(r) */

/**
 * 将例9-1和9-2中的代码做一个仔细的对吧，可以发现两种定义类的技术的差别。首先，注意当工厂函数range()转换为构造函数
 * 时被重命名为Range()。这里遵循了一个常见的编程约定：从某种意义上讲，定义构造函数即使定义类，并且类名首字母要大写。
 * 而普通的函数和方法都是首字母小写。
 * 
 * 再者，注意Range()构造函数是通过new关键字调用的，而range()工厂函数则不必使用New。例9-1通过调用普通函数来创建
 * 新对象，例9-2则使用构造函数调用来创建新对象。由于Range()构造函数是通过New关键字调用的，因此不必调用inHerit()
 * 或其他什么逻辑来创建新对象。在调用构造函数之前就已经创建了新对象，通过this关键字可以获取这个新对象。Range()
 * 构造函数只不过是初始化this而已。构造函数甚至不必返回这个新创建的对象，构造函数会自动创建对象，然后将构造函数
 * 作为这个对象的方法来调用一次，最后返回这个新对象。事实上，构造函数的命名规则（首字母大写）和普通函数是如此不同
 * 还有另外一个原因，构造函数调用和普通函数调用是不尽相同的。构造函数就是用来“构造新对象”的，它必须通过关键字new
 * 调用，如果将构造函数用做普通函数的话，往往不会正常工作。开发者可以通过命名约定来（构造函数首字母大写，普通方法
 * 首字母小写）判断是否应当在函数之前冠以关键字new
 * 
 * 在调用构造函数之前就已经创建了新对象
 * 
 * 构造函数会自动创建对象，然后将构造函数作为这个对象的方法来调用一次，最后返回这个新对象（***重点***）
 * 
 * 例9-1和例9-2之间还偶一个非常重要的区别，就是原型对象的命名。在第一段示例代码中的原型是range.methods。这种命名
 * 方式很方便同时具有很好的意义，但又过于随意。在第二段示例代码中的原型是Range.prototype，这是一个强制的命名。
 * 对Range()构造函数的调用会自动使用Range.prototype作为新Range对象的原型。
 * 
 * 最后，需要注意到在例9-1和例9-2中定义方式的相同之处，两者方法定义和方法调用时完全一样的。
 * 
 * 9.2.1 构造函数和类的标识
 * 
 * 上文提到，原型对象是类的唯一标识：当且仅当两个对象继承自同一个原型对象时，他们才属于同一个类的实例。而初始化
 * 对象的状态的构造函数则不能作为类的标识，两个构造函数的prototype属性可能指向同一个原型对象。那么这两个构造函数
 * 创建的实例是属于同一个类的。
 * 
 * 尽管构造函数不想原型那样基础，但构造函数是类的“外在表现”。很明显的，构造函数的名字通常用作类名。比如，我们说
 * Range()构造函数创建Range对象。然而，更根本的讲，当使用instanceof运算符来检测对象是否属于某个类时会用到构造
 * 函数。假设这里有一个对象r，我们想知道r是否是Range对象，我们这样写：
 * r instanceof Range      //如果r继承自Range.prototype,则返回true
 * 
 * 实际上instanceof运算符并不会检查r是否是由Range()构造函数初始化而来，而会检查是否继承自Range.prototype。
 * 不过，instanceof的语法则强化了“构造函数是类的共有标识”的概念
 * 
 * 9.2.2 constructor 属性
 * 
 * 在例9-2中，将Range.prototype定义为一个新对象，这个对象包含类所需要的方法。其实没有必要新创建一个对象，用单个
 * 对象直接量的属性就可以方便地定义原型上的方法。任何js函数都可以用作构造函数，并且调用构造函数时需要用到一个prototype
 * 属性的。因此，每个js函数（ECMAScript 5中的Function.bind()方法返回的函数除外)都自动拥有一个prototype属性。
 * 这个属性的值时一个对象，这个对象包含唯一一个不可枚举属性cconstructor。constructor属性的值是一个函数对象：
 * 
 * var F = function(){}       //这是一个函数对象
 * var p = F.prototype        //这是F相关联的原型对象
 * var c = p.constructor      //这是与原型相关联的函数
 * 
 * c === F                    //->true:对于任意函数F.prototype.constructor == F
 * 
 * 可以看到构造函数的原型中存在预先定义好的constructor属性，这意味这对象通常继承的constructor均指代他们的构造函数
 * 由于构造函数是类的“公共标识”，因此这个constructor属性为对象提供了类。
 * 
 * var o = new F()        //创建类F的一个对象
 * o.constructor === F    //true, constructor属性指代这个类
 * 
 * 如图9-1所示，图9-1展示了构造函数和原型对象之间的关系，包括原型到构造函数的反向引用以及构造函数创建的实例。
 * 
 *     构造函数           原型                      实例
 *                                    继承
 *     Range    <----  构造函数     <--------  new Range(1,2)
 *         原型---->   includes..       
 *                     foreach...     继承
 *                     toString... <--------  new Range(1,2)
 * 
 * 图9-1：构造函数及其原型和实例
 * 
 * 需要注意的是，图9-1用Range()构造函数作为实例，但实际上，例9-2中定义的Range类使用它自身的一个新对象重写
 * 预定义的Range.prototype对象。这个新定义的原型对象不含有constructor属性。因此Range类的实例也不含有constructor
 * 属性。我们可以通过补救措施来修正这个问题，显式给原型添加一个构造函数：
 * 
 * Range.prototype = {
 *    constructor:Range,  //显式设置构造函数反向引用
 *    includees:function(x){return this..from <= x && x <= this.to},
 *    ......
 * }
 * 
 * 另一种常见的解决办法是使用预定义的原型对象，预定义的原型对象包含constructor属性，然后依次给原型对象添加方法：
 * 
 * Range.prototype.includes = function(x){return this.from <= x && x <= this.to}
 * 
 * 9.3 js中java式的类继承
 * 
 * 如果你有过java或其他类似强类型面向对象语言的开发经历的话，在你的脑海中，类成员的模样可能会是这个样子：
 * 
 * 实例字段
 *        他们是基于实例的属性或变量，用以保存独立对象的状态
 * 实例方法 
 *        他们是类的所有实例所共享的方法，由每个独立的实例调用
 * 
 * 类字段
 *        这些属性或变量是属于类的，而不是属于类的某个实例的。
 * 类方法
 *        这些方法是属于类的，而不是属于类的某个实例的
 * 
 * javaScript和java的一个不同之处在于，js中的函数都是以值的形式出现的，方法和字段之间并没有太大的区别。
 * 如果属性值时函数，那么这个属性就定义一个方法；否则，它只是一个普通的属性或“字段”。尽管存在差异，我们还是可以
 * 用js模拟出java中的这四种类成员类型。js中的类牵扯三种不同的对象，三种对象的属性和行为和下面三种类成员非常相似
 * 
 * 构造函数对象
 *  之前提到，构造函数（对象）为js的类定义了名字。任何添加到这个构造函数对象中的属性都是都是类字段和类方法（如果
 *  属性值时函数的话就是类方法）
 * 原型对象
 *  原型对象的属性被类的所有实例所继承，如果原型对象的属性值是函数的话，这个函数就作为类的实例的方法来调用
 * 实例对象
 *  类的每个实例都是一个独立的对象，直接给这个实例定义的属性是不会为所有实例对象所共享的。定义在实例上的非函数
 * 属性，实际上是实例的字段。
 * 
 * 在js中定义类的步骤可以缩减为一个分三步的算法。第一步，先定义一个构造函数，并设置初始化新对象的实例属性。
 * 第二步，给构造函数的prototype对象定义实例的方法。第三步，给构造函数定义类字段和类属性。我们可以将这三个步骤
 * 装进一个简单的defineClass()函数中：
 * function defineClass(
 *    constructor,  //用以设置实例的属性的函数
 *    methods,      //实例的方法，复制至原型中
 *    statics       //类属性，复制至构造函数中
 * ){
 *    if(methods) extend(constructor.prototype, methods);
 *    if(statics) extend(constructor, statics)
 *    return constructor
 * }
 * 
 * var SimpleRange = 
 *     defineClass(
 *        function(f,t){this.f = f;this.t=t},
 *        {
 *            includes:function(x){return this.f <= x && x <= this.t}
 *        },
 *        {
 *            upto:function(t){return new SimpleRange(o, t)}
 *        }
 *     )
 * 
 * 例9-3中定义类的代码更长一些。这里定义了一个表示复数的类，这段代码展示了如何使用js来模拟实现java式的类成员。
 * 例9-3中的代码没有用到上面的defineClass()函数，而是“手动”来实现：
 * 
 * 这个文件定义了Complex类，用来描述复数
 * 复数是实数和虚数的和，并且虚数i是-1的平方根
 * 
 * 这个构造函数为他所创建的每个实例定义了实例字段r和i
 * 这两个字段分别保存复数的实部和虚部
 * 他们是对象的状态
 * 
 * function Complex(real, imaginary){
 *    if(isNaN(real) || isNaN(imaginary))
 *       throw New TypeError();
 *    this.r = real;        //复数的实部
 *    this.i = imaginary;   //复数的虚部
 * }
 * 
 * 类的实例方法定义为原型对象的函数值属性
 * 这里定义的方法可以被所有实例继承，并未他们提供共享的行为
 * 需要注意的是，js的实例方法必须使用关键字this来存取实例的字段
 * 
 * Complex.prototype.add = function(that){
 *    return new Complex(this.r + that.r, this.i + that.i);
 * }
 * 
 * Complex.prototype.mul = function(that){
 *    return new Complex(this.r * that.r - this.i * that.i, this.r * that.i + this.i * that.r)
 * }
 * 
 * Complex.prototype.mag = function(){
 *    return Math.sqrt(this.r * this.r + this.i * this.i)
 * }
 * 
 * Complex.prototype.neg = function(){
 *    return new Complex(-this.r, -this.i)
 * }
 * 
 * Complex.prototype.toString = function(){
 *    return '{' +this.r + ',' + this.i + '}'
 * }
 * 
 * Complex.prototype.equals = function(that){
 *    return that != null &&
 *           that.constructor === Complex &&
 *           this.r === that.r && this.i === that.i
 * }
 * 
 * 类字段（比如常量）和类方法直接定义为构造函数的属性
 * 需要注意的是，类的方法通常不适用关键字this，他们只对其参数进行操作
 * 
 * 这里预定义了一些对复数运算有帮助的类字段
 * 他们的命名全是大写，用以表明他们是常量
 * （在ECMAScrpt 5中，还能设置这些类字段的属性为只读）
 * Complex.ZERO = new Complex(0, 0)
 * Complex.ONE = new Complex(1, 0)
 * cOMPLEX.i = new Complex(0, 1)
 * 
 * Complex.parse = function(s){
 *    try{
 *      var m = Complex._format.exec(s)
 *      return new Complex(parseFloat(m[1]),parseFloat(m[2]))
 *    }catch(x){
 *      return new TypeError("Can't parse " + s + "as a complex number.")
 *    }
 * }
 * 
 * Complex._format = /^\{([^,]+),([^}]+)\}$/;
 * 
 * var c = new Complex(2, 3)
 * var d = new Complex(c.i, c.r)
 * c.add(d).toString()
 * Complex.parse(c.toString()).
 *  add(c.neg()).
 *  equals(Complex.ZERO)
 * 
 * 尽管js可以模拟出java式的类成员，但java中有很多重要的特性是无法在js类中模拟的。首先，对于java类的实例方法
 * 来说，实例字段可以用作局部变量，而不需要使用关键字this来引用他们。js是没有办法模拟这个特性的，但可以使用
 * with语句来近似地实现这个功能（但这种做法并不推荐）
 * Complex.prototype.toString = function(){
 *    with(this){
 *      return '{' + r + ',' + i + '}'
 *    }
 * }
 * 
 * 在java中可以使用final声明的字段为常量，并且可以将字段和方法声明为private，用以表示他们是私有成员且在类的外面
 * 是不可见的。在js中没有这些关键字。例9-3中使用了一些命名写法上的约定来给出一些暗示，比如哪些成员是不能修改的（
 * 以大写字母命名的命名），哪些成员在类玩不是不可见的（以下划线为前缀的命名）。关于这两个主题的讨论在章节后面还会
 * 碰到：私有属性可以使用闭包里的局部变量来模拟，常量属性可以在ECMAScript5中直接实现。
 * 
 * 9.4 类的扩充
 * 
 * 
 */       
