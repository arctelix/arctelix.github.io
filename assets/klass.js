/**
 *
 * @namespace
 */
var com = com || {}
com.utils = utils || {}
/**
 *
 * @namespace
 */
utils.test = {

}
/**
 *
 * @namespace
 */
var klass = {

	/**
	 * Generic Class Constructor (with internal public members)
	 * Licence: MIT Licence © 2014 Arctelix
	 * Author URI: https://github.com/arctelix
	 * @param {object} methods - Configure the Class
	 * @param {function} methods.constructor - The Class constructor function
	 * @peram {object | function} [methods.prototype] - Define the prototype of the Class
	 * @peram {function} [methods.include] - Define any internal classes and their public methods
	 * @peram {function} [methods.x] - Any additional methods defined will be added to the prototype
	 * @param {object} [options] - Options are used for development & debugging purposes
	 * @peram {number} [options.protoTest = 0]  - Determine which method is used to build the prototype
	 * @peram {bool} [options.debug = false]  - Determine if a named constructor function should be returned
	 * @peram {bool} [options.pInternal = true] - Set to false if internal public members are not used (for testing performance)
	 * @peram {bool} [options.debugSelf = false]  - Output debugging info to the console
	 * @returns {*|Class}
	 * @constructor
	 * @example
	 * var MyClass = Class({
	 *     constructor: function MyClass (name){
	 *         this.name = name;
	 *         this.internal.internalProp = "this property is only available it internal members"
	 *     },
	 *     internal: function (self) {
	 *         //self = {int:this.internal, pub:this} pub does not contain anything defined as this.internal
	 *         var oc = new  otherClass(self)
	 *
	 *         this.otherMethod = oc.otherMethod.bind(oc)
	 *     },
	 *     prototype: function () {
	 *         function someMethod(){//...}
	 *     }();
	 *     toString: fucntion (){
	 *         //toString will be added to the prototype the same as those methods defined in prototype:
	 *         this.name
	 *     }
	 }
	 * });
	 */
	Class:function (methods, options) {


	    options = options || {}
	    var debug = options.debug || false
	    var protoTest = options.protoTest || 0
	    var pInternal = options.pInternal || true
	    var debugSelf = options.debugSelf || false
	    var klassName = methods.constructor.name
	    var prototype = methods.prototype;


	    if (debugSelf) console.log('klassName = ',klassName, '/ protoTest =', protoTest, '/ debugClass =', debug, '/ pInternal =', pInternal)

	    // Compile the constructor & internal
	    var Class = function () {
	        if (debugSelf) console.log('Class() is building:', !(init instanceof init))
	        // Provide internal object for constructor
	        if (pInternal) this.internal = {}
	        this.constructor.apply(this, arguments);
	        // Remove internal from public scope
	        if (pInternal){
	    	    var int = this.internal
	            delete this.internal
	        }
	        // Populate self with this and internal
	        if (pInternal){
	            var self = {pub:this, int:{}};
	            for (var v in int){
	                self.int[v] = int[v];
	            }
	        }else var self = this
	        // Provide self to include method
	        var include = methods.include;
	        if (include) include.call(this, self);
	    };

	    // Allows for Proper class name to show up in chrome devtools (options.debug toggles this on or off)
	    if (debug == true && klassName) {
	        var klass = new Function("init", "return function " + klassName + "(){ init.apply(this,arguments) };")(Class);
	    }else var klass = Class

	    if (debugSelf) console.log('---type', typeof methods.prototype)

	    if (!prototype) prototype = function(){}()

	    if (typeof prototype == 'object'){
	        //for traditional revealing prototype pattern
	        if (protoTest==0){
	            //test 0: overides prototype
	            if (prototype) klass.prototype = prototype;
	        }else{
	            //test 1:does not overide prototype
	            for (var p in prototype) klass.prototype[p] = prototype[p]
	                }
	    }
	    //create prototype from Class method

	    else if (prototype && protoTest==0){
	    	//test 0: overides prototype (has function proto in chain)
	        if (prototype) klass.prototype = new prototype;
	    }
	    else if (prototype && protoTest == 1){
	        //test 1: does not overide prototype (has uniform proto chain)
	        var pms = new methods.prototype()
	        for (var p in pms) klass.prototype[p] = pms[p]
	    }
	    //TODO: consider changing name form constructor to init and apply the constructor mnually
	    var exclude = ['include', 'prototype', 'toString'];
	    for (var property in methods) {
	        if (exclude.indexOf(property) == -1) {
	            klass.prototype[property] = methods[property];
	        }
	    }

	    if (debugSelf) console.log('---'+klassName, klass.prototype)
	    return klass;
	}
};


