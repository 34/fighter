(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"D:\\reps\\fighter\\node_modules\\puremvc\\index.js":[function(require,module,exports){
exports.puremvc = require('./lib/puremvc-1.0.1.module.js');

},{"./lib/puremvc-1.0.1.module.js":"D:\\reps\\fighter\\node_modules\\puremvc\\lib\\puremvc-1.0.1.module.js"}],"D:\\reps\\fighter\\node_modules\\puremvc\\lib\\puremvc-1.0.1.module.js":[function(require,module,exports){
/**
 * @fileOverview
 * PureMVC JS Native Port by David Foley, Frédéric Saunier, & Alain Duchesneau
 * Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 * Reuse governed by Creative Commons Attribution 3.0
 * http://creativecommons.org/licenses/by/3.0/us/
 * @author david.foley@puremvc.org
 */


/* implementation begin */


/**
 * @author PureMVC JS Native Port by David Foley, Frédéric Saunier, & Alain Duchesneau
 * @author Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 *
 * @class puremvc.Observer
 *
 * A base Observer implementation.
 *
 * An Observer is an object that encapsulates information
 * about an interested object with a method that should
 * be called when a particular Notification is broadcast.
 *
 * In PureMVC, the Observer class assumes these responsibilities:
 *
 * - Encapsulate the notification (callback) method of the interested object.
 * - Encapsulate the notification context (this) of the interested object.
 * - Provide methods for setting the notification method and context.
 * - Provide a method for notifying the interested object.
 *
 *
 * The notification method on the interested object should take
 * one parameter of type Notification.
 *
 *
 * @param {Function} notifyMethod
 *  the notification method of the interested object
 * @param {Object} notifyContext
 *  the notification context of the interested object
 * @constructor
 */
function Observer (notifyMethod, notifyContext)
{
    this.setNotifyMethod(notifyMethod);
    this.setNotifyContext(notifyContext);
};

/**
 * Set the Observers notification method.
 *
 * The notification method should take one parameter of type Notification
 * @param {Function} notifyMethod
 *  the notification (callback) method of the interested object.
 * @return {void}
 */
Observer.prototype.setNotifyMethod= function (notifyMethod)
{
    this.notify= notifyMethod;
};

/**
 * Set the Observers notification context.
 *
 * @param {Object} notifyContext
 *  the notification context (this) of the interested object.
 *
 * @return {void}
 */
Observer.prototype.setNotifyContext= function (notifyContext)
{
    this.context= notifyContext;
};

/**
 * Get the Function that this Observer will invoke when it is notified.
 *
 * @private
 * @return {Function}
 */
Observer.prototype.getNotifyMethod= function ()
{
    return this.notify;
};

/**
 * Get the Object that will serve as the Observers callback execution context
 *
 * @private
 * @return {Object}
 */
Observer.prototype.getNotifyContext= function ()
{
    return this.context;
};

/**
 * Notify the interested object.
 *
 * @param {puremvc.Notification} notification
 *  The Notification to pass to the interested objects notification method
 * @return {void}
 */
Observer.prototype.notifyObserver= function (notification)
{
    this.getNotifyMethod().call(this.getNotifyContext(), notification);
};

/**
 * Compare an object to this Observers notification context.
 *
 * @param {Object} object
 *
 * @return {boolean}
 */
Observer.prototype.compareNotifyContext= function (object)
{
    return object === this.context;
};

/**
 * The Observers callback Function
 *
 * @private
 * @type {Function}
 */
Observer.prototype.notify= null;

/**
 * The Observers callback Object
 * @private
 * @type {Object}
 */
Observer.prototype.context= null;
/**
 * @author PureMVC JS Native Port by David Foley, Frédéric Saunier, & Alain Duchesneau
 * @author Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 *
 * @class puremvc.Notification
 *
 * A base Notification implementation.
 *
 * PureMVC does not rely upon underlying event models such as the one provided
 * with the DOM or other browser centric W3C event models.
 *
 * The Observer Pattern as implemented within PureMVC exists to support
 * event-driven communication between the application and the actors of the MVC
 * triad.
 *
 * Notifications are not meant to be a replacement for events in the browser.
 * Generally, Mediator implementors place event listeners on their view
 * components, which they then handle in the usual way. This may lead to the
 * broadcast of Notifications to trigger commands or to communicate with other
 * Mediators. {@link puremvc.Proxy Proxy},
 * {@link puremvc.SimpleCommand SimpleCommand}
 * and {@link puremvc.MacroCommand MacroCommand}
 * instances communicate with each other and
 * {@link puremvc.Mediator Mediator}s
 * by broadcasting Notifications.
 *
 * A key difference between browser events and PureMVC Notifications is that
 * events follow the 'Chain of Responsibility' pattern, 'bubbling' up the
 * display hierarchy until some parent component handles the event, while
 * PureMVC Notification follow a 'Publish/Subscribe' pattern. PureMVC classes
 * need not be related to each other in a parent/child relationship in order to
 * communicate with one another using Notifications.
 *
 * @constructor
 * @param {string} name
 *  The Notification name
 * @param {Object} [body]
 *  The Notification body
 * @param {Object} [type]
 *  The Notification type
 */
function Notification(name, body, type)
{
    this.name= name;
    this.body= body;
    this.type= type;
};

/**
 * Get the name of the Notification instance
 *
 * @return {string}
 *  The name of the Notification instance
 */
Notification.prototype.getName= function()
{
    return this.name;
};

/**
 * Set this Notifications body.
 * @param {Object} body
 * @return {void}
 */
Notification.prototype.setBody= function(body)
{
    this.body= body;
};

/**
 * Get the Notification body.
 *
 * @return {Object}
 */
Notification.prototype.getBody= function()
{
    return this.body
};

/**
 * Set the type of the Notification instance.
 *
 * @param {Object} type
 * @return {void}
 */
Notification.prototype.setType= function(type)
{
    this.type= type;
};

/**
 * Get the type of the Notification instance.
 *
 * @return {Object}
 */
Notification.prototype.getType= function()
{
    return this.type;
};

/**
 * Get a string representation of the Notification instance
 *
 * @return {string}
 */
Notification.prototype.toString= function()
{
    var msg= "Notification Name: " + this.getName();
    msg+= "\nBody:" + ((this.body == null ) ? "null" : this.body.toString());
    msg+= "\nType:" + ((this.type == null ) ? "null" : this.type);
    return msg;
};

/**
 * The Notifications name.
 *
 * @type {string}
 * @private
 */
Notification.prototype.name= null;

/**
 * The Notifications type.
 *
 * @type {string}
 * @private
 */
Notification.prototype.type= null;

/**
 * The Notifications body.
 *
 * @type {Object}
 * @private
 */
Notification.prototype.body= null;
/**
 * @author PureMVC JS Native Port by David Foley, Frédéric Saunier, & Alain Duchesneau
 * @author Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 *
 * @class puremvc.Notifier
 *
 * A Base Notifier implementation.
 *
 * {@link puremvc.MacroCommand MacroCommand},
 * {@link puremvc.SimpleCommand SimpleCommand},
 * {@link puremvc.Mediator Mediator} and
 * {@link puremvc.Proxy Proxy}
 * all have a need to send Notifications
 *
 * The Notifier interface provides a common method called #sendNotification that
 * relieves implementation code of the necessity to actually construct
 * Notifications.
 *
 * The Notifier class, which all of the above mentioned classes
 * extend, provides an initialized reference to the
 * {@link puremvc.Facade Facade}
 * Multiton, which is required for the convienience method
 * for sending Notifications but also eases implementation as these
 * classes have frequent
 * {@link puremvc.Facade Facade} interactions
 * and usually require access to the facade anyway.
 *
 * NOTE: In the MultiCore version of the framework, there is one caveat to
 * notifiers, they cannot send notifications or reach the facade until they
 * have a valid multitonKey.
 *
 * The multitonKey is set:
 *   - on a Command when it is executed by the Controller
 *   - on a Mediator is registered with the View
 *   - on a Proxy is registered with the Model.
 *
 * @constructor
 */
function Notifier()
{
};

/**
 * Create and send a Notification.
 *
 * Keeps us from having to construct new Notification instances in our
 * implementation code.
 *
 * @param {string} notificationName
 *  A notification name
 * @param {Object} [body]
 *  The body of the notification
 * @param {string} [type]
 *  The notification type
 * @return {void}
 */
Notifier.prototype.sendNotification = function(notificationName, body, type)
{
    var facade = this.getFacade();
    if(facade)
    {
        facade.sendNotification(notificationName, body, type);
    }
};


/**
 * @protected
 * A reference to this Notifier's Facade. This reference will not be available
 * until #initializeNotifier has been called.
 *
 * @type {puremvc.Facade}
 */
Notifier.prototype.facade;

/**
 * Initialize this Notifier instance.
 *
 * This is how a Notifier gets its multitonKey.
 * Calls to #sendNotification or to access the
 * facade will fail until after this method
 * has been called.
 *
 * Mediators, Commands or Proxies may override
 * this method in order to send notifications
 * or access the Multiton Facade instance as
 * soon as possible. They CANNOT access the facade
 * in their constructors, since this method will not
 * yet have been called.
 *
 *
 * @param {string} key
 *  The Notifiers multiton key;
 * @return {void}
 */
Notifier.prototype.initializeNotifier = function(key)
{
    this.multitonKey = String(key);
    this.facade= this.getFacade();
};

/**
 * Retrieve the Multiton Facade instance
 *
 *
 * @protected
 * @return {puremvc.Facade}
 */
Notifier.prototype.getFacade = function()
{
    if(this.multitonKey == null)
    {
        throw new Error(Notifier.MULTITON_MSG);
    };

    return Facade.getInstance(this.multitonKey);
};

/**
 * @ignore
 * The Notifiers internal multiton key.
 *
 * @protected
 * @type string
 */
Notifier.prototype.multitonKey = null;

/**
 * @ignore
 * The error message used if the Notifier is not initialized correctly and
 * attempts to retrieve its own multiton key
 *
 * @static
 * @protected
 * @const
 * @type string
 */
Notifier.MULTITON_MSG = "multitonKey for this Notifier not yet initialized!";
/**
 * @author PureMVC JS Native Port by David Foley, Frédéric Saunier, & Alain Duchesneau
 * @author Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 *
 * @class puremvc.SimpleCommand
 * @extends puremvc.Notifier
 *
 * SimpleCommands encapsulate the business logic of your application. Your
 * subclass should override the #execute method where your business logic will
 * handle the
 * {@link puremvc.Notification Notification}
 *
 * Take a look at
 * {@link puremvc.Facade#registerCommand Facade's registerCommand}
 * or {@link puremvc.Controller#registerCommand Controllers registerCommand}
 * methods to see how to add commands to your application.
 *
 * @constructor
 */
function SimpleCommand () { };

SimpleCommand.prototype= new Notifier;
SimpleCommand.prototype.constructor= SimpleCommand;

/**
 * Fulfill the use-case initiated by the given Notification
 *
 * In the Command Pattern, an application use-case typically begins with some
 * user action, which results in a Notification is handled by the business logic
 * in the #execute method of a command.
 *
 * @param {puremvc.Notification} notification
 *  The notification to handle.
 * @return {void}
 */
SimpleCommand.prototype.execute= function (notification) { };
/**
 * @author PureMVC JS Native Port by David Foley, Frédéric Saunier, & Alain Duchesneau
 * @author Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 *
 * @class puremvc.MacroCommand
 * @extends puremvc.Notifier
 *
 * A base command implementation that executes other commands, such as
 * {@link puremvc.SimpleCommand SimpleCommand}
 * or {@link puremvc.MacroCommand MacroCommand}
 * subclasses.
 *
 * A MacroCommand maintains an list of
 * command constructor references called *SubCommands*.
 *
 * When #execute is called, the MacroCommand
 * instantiates and calls #execute on each of its *SubCommands* in turn.
 * Each *SubCommand* will be passed a reference to the original
 * {@link puremvc.Notification Notification}
 * that was passed to the MacroCommands #execute method
 *
 * Unlike {@link puremvc.SimpleCommand SimpleCommand},
 * your subclass should not override #execute but instead, should
 * override the #initializeMacroCommand method, calling #addSubCommand once for
 * each *SubCommand* to be executed.
 *
 * If your subclass does define a constructor, be sure to call "super" like so
 *
 *     function MyMacroCommand ()
 *     {
 *         MacroCommand.call(this);
 *     };
 * @constructor
 */
function MacroCommand()
{
    this.subCommands= [];
    this.initializeMacroCommand();
};

/* subclass Notifier */
MacroCommand.prototype= new Notifier;
MacroCommand.prototype.constructor= MacroCommand;

/**
 * @private
 * @type {Array.<puremvc.SimpleCommand|puremvc.MacroCommand>}
 */
MacroCommand.prototype.subCommands= null;

/**
 * @protected
 * Initialize the MacroCommand.
 *
 * In your subclass, override this method to
 * initialize the MacroCommand's *SubCommand*
 * list with command class references like
 * this:
 *
 *     // Initialize MyMacroCommand
 *     MyMacroCommand.prototype.initializeMacroCommand= function ()
 *     {
 *         this.addSubCommand( com.me.myapp.controller.FirstCommand );
 *         this.addSubCommand( com.me.myapp.controller.SecondCommand );
 *         this.addSubCommand( com.me.myapp.controller.ThirdCommand );
 *     };
 *
 * Note that *SubCommand*s may be any command implementor,
 * MacroCommands or SimpleCommands are both acceptable.
 * @return {void}
 */
MacroCommand.prototype.initializeMacroCommand= function() {}

/**
 * @protected
 * Add a *SubCommand*
 *
 * The *SubCommand*s will be called in First In / First Out (FIFO) order
 * @param {Function} commandClassRef
 *  A reference to a subclassed SimpleCommand or MacroCommand constructor
 */
MacroCommand.prototype.addSubCommand= function(commandClassRef)
{
    this.subCommands.push(commandClassRef);
};

/**
 * Execute this MacroCommands *SubCommands*
 *
 * The *SubCommand*s will be called in First In / First Out (FIFO) order
 * @param {puremvc.Notification} note
 *  The Notification object to be passed to each *SubCommand*
 */
MacroCommand.prototype.execute= function(note)
{
    // SIC- TODO optimize
    while(this.subCommands.length > 0)
    {
        var ref= this.subCommands.shift();
        var cmd= new ref;
        cmd.initializeNotifier(this.multitonKey);
        cmd.execute(note);
    }
};
/**
 * @author PureMVC JS Native Port by David Foley, Frédéric Saunier, & Alain Duchesneau
 * @author Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 *
 * @class puremvc.Mediator
 * @extends puremvc.Notifier
 *
 * A base Mediator implementation.
 *
 * In PureMVC, Mediator classes are used to mediate communication between a view
 * component and the rest of the application.
 *
 * A Mediator should listen to its view components for events, and handle them
 * by sending notifications (to be handled by other Mediators,
 * {@link puremvc.SimpleCommand SimpleCommands}
 * or
 * {@link puremvc.MacroCommand MacroCommands})
 * or passing data from the view component directly to a
 * {@link puremvc.Proxy Proxy}, such as submitting
 * the contents of a form to a service.
 *
 * Mediators should not perform business logic, maintain state or other
 * information for its view component, or break the encapsulation of the view
 * component by manipulating the view component's children. It should only call
 * methods or set properties on the view component.
 *
 * The view component should encapsulate its own behavior and implementation by
 * exposing methods and properties that the Mediator can call without having to
 * know about the view component's children.
 *
 * @constructor
 * @param {string} [mediatorName]
 *  The Mediators name. The Mediators static #NAME value is used by default
 * @param {Object} [viewComponent]
 *  The Mediators {@link #setViewComponent viewComponent}.
 */
function Mediator (mediatorName, viewComponent)
{
    this.mediatorName= mediatorName || this.constructor.NAME;
    this.viewComponent=viewComponent;
};

/**
 * @static
 * The name of the Mediator.
 *
 * Typically, a Mediator will be written to serve one specific control or group
 * of controls and so, will not have a need to be dynamically named.
 *
 * @type {string}
 */
Mediator.NAME= "Mediator";

/* subclass */
Mediator.prototype= new Notifier;
Mediator.prototype.constructor= Mediator;

/**
 * Get the name of the Mediator
 *
 * @return {string}
 *  The Mediator name
 */
Mediator.prototype.getMediatorName= function ()
{
    return this.mediatorName;
};

/**
 * Set the Mediators view component. This could
 * be a HTMLElement, a bespoke UiComponent wrapper
 * class, a MooTools Element, a jQuery result or a
 * css selector, depending on which DOM abstraction
 * library you are using.
 *
 *
 * @param {Object} the view component
 * @return {void}
 */
Mediator.prototype.setViewComponent= function (viewComponent)
{
    this.viewComponent= viewComponent;
};

/**
 * Get the Mediators view component.
 *
 * Additionally, an optional explicit getter can be
 * be defined in the subclass that defines the
 * view components, providing a more semantic interface
 * to the Mediator.
 *
 * This is different from the AS3 implementation in
 * the sense that no casting is required from the
 * object supplied as the view component.
 *
 *     MyMediator.prototype.getComboBox= function ()
 *     {
 *         return this.viewComponent;  
 *     }
 *
 * @return {Object}
 *  The view component
 */
Mediator.prototype.getViewComponent= function ()
{
    return this.viewComponent;
};

/**
 * List the Notification names this Mediator is interested
 * in being notified of.
 *
 * @return {Array}
 *  The list of Notification names.
 */
Mediator.prototype.listNotificationInterests= function ()
{
    return [];
};

/**
 * Handle Notifications.
 *
 * Typically this will be handled in a switch statement
 * with one 'case' entry per Notification the Mediator
 * is interested in
 *
 * @param {puremvc.Notification} notification
 * @return {void}
 */
Mediator.prototype.handleNotification= function (notification)
{
    return;
};

/**
 * Called by the View when the Mediator is registered
 * @return {void}
 */
Mediator.prototype.onRegister= function ()
{
    return;
};

/**
 * Called by the View when the Mediator is removed
 */
Mediator.prototype.onRemove= function ()
{
    return;
};

/**
 * @ignore
 * The Mediators name. Should only be accessed by Mediator subclasses.
 *
 * @protected
 * @type string
 */
Mediator.prototype.mediatorName= null;

/**
 * @ignore
 * The Mediators viewComponent. Should only be accessed by Mediator subclasses.
 *
 * @protected
 * @type Object
 */
Mediator.prototype.viewComponent=null;
/**
 * @author PureMVC JS Native Port by David Foley, Frédéric Saunier, & Alain Duchesneau
 * @author Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 *
 * @class puremvc.Proxy
 * @extends puremvc.Notifier
 *
 * A base Proxy implementation.
 *
 * In PureMVC, Proxy classes are used to manage parts of the application's data
 * model.
 *
 * A Proxy might simply manage a reference to a local data object, in which case
 * interacting with it might involve setting and getting of its data in
 * synchronous fashion.
 *
 * Proxy classes are also used to encapsulate the application's interaction with
 * remote services to save or retrieve data, in which case, we adopt an
 * asyncronous idiom; setting data (or calling a method) on the Proxy and
 * listening for a
 * {@link puremvc.Notification Notification}
 * to be sent  when the Proxy has retrieved the data from the service.
 *
 *
 * @param {string} [proxyName]
 *  The Proxy's name. If none is provided, the Proxy will use its constructors
 *  NAME property.
 * @param {Object} [data]
 *  The Proxy's data object
 * @constructor
 */
function Proxy(proxyName, data)
{
    this.proxyName= proxyName || this.constructor.NAME;
    if(data != null)
    {
        this.setData(data);
    }
};


Proxy.NAME= "Proxy";

Proxy.prototype= new Notifier;
Proxy.prototype.constructor= Proxy;

/**
 * Get the Proxy's name.
 *
 * @return {string}
 */
Proxy.prototype.getProxyName= function()
{
    return this.proxyName;
};

/**
 * Set the Proxy's data object
 *
 * @param {Object} data
 * @return {void}
 */
Proxy.prototype.setData= function(data)
{
    this.data= data;
};

/**
 * Get the Proxy's data object
 *
 * @return {Object}
 */
Proxy.prototype.getData= function()
{
    return this.data;
};

/**
 * Called by the {@link puremvc.Model Model} when
 * the Proxy is registered.
 *
 * @return {void}
 */
Proxy.prototype.onRegister= function()
{
    return;
};

/**
 * Called by the {@link puremvc.Model Model} when
 * the Proxy is removed.
 *
 * @return {void}
 */
Proxy.prototype.onRemove= function()
{
    return;
};

/**
 * @ignore
 * The Proxys name.
 *
 * @protected
 * @type String
 */
Proxy.prototype.proxyName= null;

/**
 * @ignore
 * The Proxy's data object.
 *
 * @protected
 * @type Object
 */
Proxy.prototype.data= null;
/**
 * @author PureMVC JS Native Port by David Foley, Frédéric Saunier, & Alain Duchesneau
 * @author Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 *
 * @class puremvc.Facade
 * Facade exposes the functionality of the Controller, Model and View
 * actors to client facing code.
 *
 * This Facade implementation is a Multiton, so you should not call the
 * constructor directly, but instead call the static Factory method,
 * passing the unique key for this instance to #getInstance
 *
 * @constructor
 * @param {string} key
 * 	The multiton key to use to retrieve the Facade instance.
 * @throws {Error}
 *  If an attempt is made to instantiate Facade directly
 */
function Facade(key)
{
    if(Facade.instanceMap[key] != null)
    {
        throw new Error(Facade.MULTITON_MSG);
    }

    this.initializeNotifier(key);
    Facade.instanceMap[key] = this;
    this.initializeFacade();
};

/**
 * Initialize the Multiton Facade instance.
 *
 * Called automatically by the constructor. Override in your subclass to any
 * subclass specific initializations. Be sure to call the 'super'
 * initializeFacade method, though
 *
 *     MyFacade.prototype.initializeFacade= function ()
 *     {
 *         Facade.call(this);
 *     };
 * @protected
 * @return {void}
 */
Facade.prototype.initializeFacade = function()
{
    this.initializeModel();
    this.initializeController();
    this.initializeView();
};

/**
 * Facade Multiton Factory method.
 * Note that this method will return null if supplied a
 * null or undefined multiton key.
 *
 * @param {string} key
 * 	The multiton key use to retrieve a particular Facade instance
 * @return {puremvc.Facade}
 */
Facade.getInstance = function(key)
{
    if (null == key)
        return null;

    if(Facade.instanceMap[key] == null)
    {
        Facade.instanceMap[key] = new Facade(key);
    }

    return Facade.instanceMap[key];
};

/**
 * Initialize the {@link puremvc.Controller Controller}.
 *
 * Called by the #initializeFacade method.
 *
 * Override this method in your subclass of Facade
 * if one or both of the following are true:
 * - You wish to initialize a different Controller
 * - You have
 * {@link puremvc.SimpleCommand SimpleCommand}s
 * or {@link puremvc.MacroCommand MacroCommand}s
 * to register with the Controllerat startup.
 *
 * If you don't want to initialize a different Controller,
 * call the 'super' initializeControlle method at the beginning of your
 * method, then register commands.
 *
 *     MyFacade.prototype.initializeController= function ()
 *     {
 *         Facade.prototype.initializeController.call(this);
 *         this.registerCommand(AppConstants.A_NOTE_NAME, ABespokeCommand)
 *     }
 *
 * @protected
 * @return {void}
 */
Facade.prototype.initializeController = function()
{
    if(this.controller != null)
        return;

    this.controller = Controller.getInstance(this.multitonKey);
};

/**
 * @protected
 * Initialize the {@link puremvc.Model Model};
 *
 * Called by the #initializeFacade method.
 * Override this method in your subclass of Facade if one of the following are
 * true:
 *
 * - You wish to initialize a different Model.
 *
 * - You have {@link puremvc.Proxy Proxy}s to
 *   register with the Model that do not retrieve a reference to the Facade at
 *   construction time.
 *
 * If you don't want to initialize a different Model
 * call 'super' #initializeModel at the beginning of your method, then register
 * Proxys.
 *
 * Note: This method is *rarely* overridden; in practice you are more
 * likely to use a command to create and registerProxys with the Model>,
 * since Proxys with mutable data will likely
 * need to send Notifications and thus will likely want to fetch a reference to
 * the Facade during their construction.
 *
 * @return {void}
 */
Facade.prototype.initializeModel = function()
{
    if(this.model != null)
        return;

    this.model = Model.getInstance(this.multitonKey);
};

/**
 * @protected
 *
 * Initialize the {@link puremvc.View View}.
 *
 * Called by the #initializeFacade method.
 *
 * Override this method in your subclass of Facade if one or both of the
 * following are true:
 *
 * - You wish to initialize a different View.
 * - You have Observers to register with the View
 *
 * If you don't want to initialize a different View
 * call 'super' #initializeView at the beginning of your
 * method, then register Mediator instances.
 *
 *     MyFacade.prototype.initializeView= function ()
 *     {
 *         Facade.prototype.initializeView.call(this);
 *         this.registerMediator(new MyMediator());
 *     };
 *
 * Note: This method is *rarely* overridden; in practice you are more
 * likely to use a command to create and register Mediators
 * with the View, since Mediator instances will need to send
 * Notifications and thus will likely want to fetch a reference
 * to the Facade during their construction.
 * @return {void}
 */
Facade.prototype.initializeView = function()
{
    if(this.view != null)
        return;

    this.view = View.getInstance(this.multitonKey);
};

/**
 * Register a command with the Controller by Notification name
 * @param {string} notificationName
 *  The name of the Notification to associate the command with
 * @param {Function} commandClassRef
 *  A reference ot the commands constructor.
 * @return {void}
 */
Facade.prototype.registerCommand = function(notificationName, commandClassRef)
{
    this.controller.registerCommand(notificationName, commandClassRef);
};

/**
 * Remove a previously registered command to Notification mapping from the
 * {@link puremvc.Controller#removeCommand Controller}
 * @param {string} notificationName
 *  The name of the the Notification to remove from the command mapping for.
 * @return {void}
 */
Facade.prototype.removeCommand = function(notificationName)
{
    this.controller.removeCommand(notificationName);
};

/**
 * Check if a command is registered for a given notification.
 *
 * @param {string} notificationName
 *  A Notification name
 * @return {boolean}
 *  Whether a comman is currently registered for the given notificationName
 */
Facade.prototype.hasCommand = function(notificationName)
{
    return this.controller.hasCommand(notificationName);
};

/**
 * Register a Proxy with the {@link puremvc.Model#registerProxy Model}
 * by name.
 *
 * @param {puremvc.Proxy} proxy
 *  The Proxy instance to be registered with the Model.
 * @return {void}
 */
Facade.prototype.registerProxy = function(proxy)
{
    this.model.registerProxy(proxy);
};

/**
 * Retrieve a Proxy from the Model
 *
 * @param {string} proxyName
 * @return {puremvc.Proxy}
 */
Facade.prototype.retrieveProxy = function(proxyName)
{
    return this.model.retrieveProxy(proxyName);
};

/**
 * Remove a Proxy from the Model by name
 * @param {string} proxyName
 *  The name of the Proxy
 * @return {puremvc.Proxy}
 *  The Proxy that was removed from the Model
 */
Facade.prototype.removeProxy = function(proxyName)
{
    var proxy = null;
    if(this.model != null)
    {
        proxy = this.model.removeProxy(proxyName);
    }

    return proxy;
};

/**
 * Check it a Proxy is registered.
 * @param {string} proxyName
 *  A Proxy name
 * @return {boolean}
 *  Whether a Proxy is currently registered with the given proxyName
 */
Facade.prototype.hasProxy = function(proxyName)
{
    return this.model.hasProxy(proxyName);
};

/**
 * Register a Mediator with with the View.
 *
 * @param {puremvc.Mediator} mediator
 *  A reference to the Mediator to register
 * @return {void}
 */
Facade.prototype.registerMediator = function(mediator)
{
    if(this.view != null)
    {
        this.view.registerMediator(mediator);
    }
};

/**
 * Retrieve a Mediator from the View by name
 *
 * @param {string} mediatorName
 *  The Mediators name
 * @return {puremvc.Mediator}
 *  The retrieved Mediator
 */
Facade.prototype.retrieveMediator = function(mediatorName)
{
    return this.view.retrieveMediator(mediatorName);
};

/**
 * Remove a Mediator from the View.
 *
 * @param {string} mediatorName
 *  The name of the Mediator to remove.
 * @return {puremvc.Mediator}
 *  The removed Mediator
 */
Facade.prototype.removeMediator = function(mediatorName)
{
    var mediator = null;
    if(this.view != null)
    {
        mediator = this.view.removeMediator(mediatorName);
    }

    return mediator;
};

/**
 * Check if a Mediator is registered or not.
 *
 * @param {string} mediatorName
 *  A Mediator name
 * @return {boolean}
 *  Whether a Mediator is registered with the given mediatorName
 */
Facade.prototype.hasMediator = function(mediatorName)
{
    return this.view.hasMediator(mediatorName);
};

/**
 * Create and send a
 * {@link puremvc.Notification Notification}
 *
 * Keeps us from having to construct new Notification instances in our
 * implementation
 *
 * @param {string} notificationName
 *  The name of the Notification to send
 * @param {Object} [body]
 *  The body of the notification
 * @param {string} [type]
 *  The type of the notification
 * @return {void}
 */
Facade.prototype.sendNotification = function(notificationName, body, type)
{
    this.notifyObservers(new Notification(notificationName, body, type));
};

/**
 * Notify {@link puremvc.Observer Observer}s
 *
 * This method is left public mostly for backward compatibility, and to allow
 * you to send custom notification classes using the facade.
 *
 * Usually you should just call sendNotification and pass the parameters, never
 * having to construct the notification yourself.
 *
 * @param {puremvc.Notification} notification
 *  The Notification to send
 * @return {void}
 */
Facade.prototype.notifyObservers = function(notification)
{
    if(this.view != null)
    {
        this.view.notifyObservers(notification);
    }
};

/**
 * Initialize the Facades Notifier capabilities by setting the Multiton key for
 * this facade instance.
 *
 * Not called directly, but instead from the constructor when #getInstance is
 * invoked. It is necessary to be public in order to implement Notifier
 *
 * @param {string} key
 * @return {void}
 */
Facade.prototype.initializeNotifier = function(key)
{
    this.multitonKey = key;
};

/**
 * Check if a *Core* is registered or not
 *
 * @static
 * @param {string} key
 *  The multiton key for the *Core* in question
 * @return {boolean}
 *  Whether a *Core* is registered with the given key
 */
Facade.hasCore = function(key)
{
    return Facade.instanceMap[key] != null;
};

/**
 * Remove a *Core*
 *
 * Remove the Model, View, Controller and Facade for a given key.
 *
 * @static
 * @param {string} key
 * @return {void}
 */
Facade.removeCore = function(key)
{
    if(Facade.instanceMap[key] == null)
        return;

    Model.removeModel(key);
    View.removeView(key);
    Controller.removeController(key);
    delete Facade.instanceMap[key];
};

/**
 * @ignore
 * The Facades corresponding Controller
 *
 * @protected
 * @type puremvc.Controller
 */
Facade.prototype.controller = null;

/**
 * @ignore
 * The Facades corresponding Model instance
 *
 * @protected
 * @type puremvc.Model
 */
Facade.prototype.model = null;

/**
 * @ignore
 * The Facades correspnding View instance.
 *
 * @protected
 * @type puremvc.View
 */
Facade.prototype.view = null;

/**
 * @ignore
 * The Facades multiton key.
 *
 * @protected
 * @type string
 */
Facade.prototype.multitonKey = null;

/**
 * @ignore
 * The Multiton Facade instance map.
 * @static
 * @protected
 * @type Array
 */
Facade.instanceMap = [];

/**
 * @ignore
 * Message Constants
 * @protected
 * @type {string}
 * @const
 * @static
 */
Facade.MULTITON_MSG = "Facade instance for this Multiton key already constructed!";
/**
 * @author PureMVC JS Native Port by David Foley, Frédéric Saunier, & Alain Duchesneau
 * @author Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 *
 * @class puremvc.View
 *
 * A Multiton View implementation.
 *
 * In PureMVC, the View class assumes these responsibilities
 *
 * - Maintain a cache of {@link puremvc.Mediator Mediator}
 *   instances.
 *
 * - Provide methods for registering, retrieving, and removing
 *   {@link puremvc.Mediator Mediator}.
 *
 * - Notifiying {@link puremvc.Mediator Mediator} when they are registered or
 *   removed.
 *
 * - Managing the observer lists for each {@link puremvc.Notification Notification}
 *   in the application.
 *
 * - Providing a method for attaching {@link puremvc.Observer Observer} to an
 *   {@link puremvc.Notification Notification}'s observer list.
 *
 * - Providing a method for broadcasting a {@link puremvc.Notification Notification}.
 *
 * - Notifying the {@link puremvc.Observer Observer}s of a given
 *   {@link puremvc.Notification Notification} when it broadcast.
 *
 * This View implementation is a Multiton, so you should not call the
 * constructor directly, but instead call the static Multiton
 * Factory #getInstance method.
 *
 * @param {string} key
 * @constructor
 * @throws {Error}
 *  if instance for this Multiton key has already been constructed
 */
function View(key)
{
    if(View.instanceMap[key] != null)
    {
        throw new Error(View.MULTITON_MSG);
    };

    this.multitonKey = key;
    View.instanceMap[this.multitonKey] = this;
    this.mediatorMap = [];
    this.observerMap = [];
    this.initializeView();
};

/**
 * @protected
 * Initialize the Singleton View instance
 *
 * Called automatically by the constructor, this is your opportunity to
 * initialize the Singleton instance in your subclass without overriding the
 * constructor
 *
 * @return {void}
 */
View.prototype.initializeView = function()
{
    return;
};

/**
 * View Singleton Factory method.
 * Note that this method will return null if supplied a null
 * or undefined multiton key.
 *
 * @return {puremvc.View}
 *  The Singleton instance of View
 */
View.getInstance = function(key)
{
    if (null == key)
        return null;

    if(View.instanceMap[key] == null)
    {
        View.instanceMap[key] = new View(key);
    };

    return View.instanceMap[key];
};

/**
 * Register an Observer to be notified of Notifications with a given name
 *
 * @param {string} notificationName
 *  The name of the Notifications to notify this Observer of
 * @param {puremvc.Observer} observer
 *  The Observer to register.
 * @return {void}
 */
View.prototype.registerObserver = function(notificationName, observer)
{
    if(this.observerMap[notificationName] != null)
    {
        this.observerMap[notificationName].push(observer);
    }
    else
    {
        this.observerMap[notificationName] = [observer];
    }
};

/**
 * Notify the Observersfor a particular Notification.
 *
 * All previously attached Observers for this Notification's
 * list are notified and are passed a reference to the INotification in
 * the order in which they were registered.
 *
 * @param {puremvc.Notification} notification
 *  The Notification to notify Observers of
 * @return {void}
 */
View.prototype.notifyObservers = function(notification)
{
    // SIC
    if(this.observerMap[notification.getName()] != null)
    {
        var observers_ref = this.observerMap[notification.getName()], observers = [], observer

        for(var i = 0; i < observers_ref.length; i++)
        {
            observer = observers_ref[i];
            observers.push(observer);
        }

        for(var i = 0; i < observers.length; i++)
        {
            observer = observers[i];
            observer.notifyObserver(notification);
        }
    }
};

/**
 * Remove the Observer for a given notifyContext from an observer list for
 * a given Notification name
 *
 * @param {string} notificationName
 *  Which observer list to remove from
 * @param {Object} notifyContext
 *  Remove the Observer with this object as its notifyContext
 * @return {void}
 */
View.prototype.removeObserver = function(notificationName, notifyContext)
{
    // SIC
    var observers = this.observerMap[notificationName];
    for(var i = 0; i < observers.length; i++)
    {
        if(observers[i].compareNotifyContext(notifyContext) == true)
        {
            observers.splice(i, 1);
            break;
        }
    }

    if(observers.length == 0)
    {
        delete this.observerMap[notificationName];
    }
};

/**
 * Register a Mediator instance with the View.
 *
 * Registers the Mediator so that it can be retrieved by name,
 * and further interrogates the Mediator for its
 * {@link puremvc.Mediator#listNotificationInterests interests}.
 *
 * If the Mediator returns any Notification
 * names to be notified about, an Observer is created encapsulating
 * the Mediator instance's
 * {@link puremvc.Mediator#handleNotification handleNotification}
 * method and registering it as an Observer for all Notifications the
 * Mediator is interested in.
 *
 * @param {puremvc.Mediator}
 *  a reference to the Mediator instance
 */
View.prototype.registerMediator = function(mediator)
{
    if(this.mediatorMap[mediator.getMediatorName()] != null)
    {
        return;
    }

    mediator.initializeNotifier(this.multitonKey);
    // register the mediator for retrieval by name
    this.mediatorMap[mediator.getMediatorName()] = mediator;

    // get notification interests if any
    var interests = mediator.listNotificationInterests();

    // register mediator as an observer for each notification
    if(interests.length > 0)
    {
        // create observer referencing this mediators handleNotification method
        var observer = new Observer(mediator.handleNotification, mediator);
        for(var i = 0; i < interests.length; i++)
        {
            this.registerObserver(interests[i], observer);
        }
    }

    mediator.onRegister();
}

/**
 * Retrieve a Mediator from the View
 *
 * @param {string} mediatorName
 *  The name of the Mediator instance to retrieve
 * @return {puremvc.Mediator}
 *  The Mediator instance previously registered with the given mediatorName
 */
View.prototype.retrieveMediator = function(mediatorName)
{
    return this.mediatorMap[mediatorName];
};

/**
 * Remove a Mediator from the View.
 *
 * @param {string} mediatorName
 *  Name of the Mediator instance to be removed
 * @return {puremvc.Mediator}
 *  The Mediator that was removed from the View
 */
View.prototype.removeMediator = function(mediatorName)
{
    var mediator = this.mediatorMap[mediatorName];
    if(mediator)
    {
        // for every notification the mediator is interested in...
        var interests = mediator.listNotificationInterests();
        for(var i = 0; i < interests.length; i++)
        {
            // remove the observer linking the mediator to the notification
            // interest
            this.removeObserver(interests[i], mediator);
        }

        // remove the mediator from the map
        delete this.mediatorMap[mediatorName];

        // alert the mediator that it has been removed
        mediator.onRemove();
    }

    return mediator;
};

/**
 * Check if a Mediator is registered or not.
 *
 * @param {string} mediatorName
 * @return {boolean}
 *  Whether a Mediator is registered with the given mediatorname
 */
View.prototype.hasMediator = function(mediatorName)
{
    return this.mediatorMap[mediatorName] != null;
};

/**
 * Remove a View instance
 *
 * @return {void}
 */
View.removeView = function(key)
{
    delete View.instanceMap[key];
};

/**
 * @ignore
 * The Views internal mapping of mediator names to mediator instances
 *
 * @type Array
 * @protected
 */
View.prototype.mediatorMap = null;

/**
 * @ignore
 * The Views internal mapping of Notification names to Observer lists
 *
 * @type Array
 * @protected
 */
View.prototype.observerMap = null;

/**
 * @ignore
 * The internal map used to store multiton View instances
 *
 * @type Array
 * @protected
 */
View.instanceMap = [];

/**
 * @ignore
 * The Views internal multiton key.
 *
 * @type string
 * @protected
 */
View.prototype.multitonKey = null;

/**
 * @ignore
 * The error message used if an attempt is made to instantiate View directly
 *
 * @type string
 * @protected
 * @const
 * @static
 */
View.MULTITON_MSG = "View instance for this Multiton key already constructed!";
/**
 * @author PureMVC JS Native Port by David Foley, Frédéric Saunier, & Alain Duchesneau
 * @author Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 *
 * @class puremvc.Model
 *
 * A Multiton Model implementation.
 *
 * In PureMVC, the Model class provides
 * access to model objects (Proxies) by named lookup.
 *
 * The Model assumes these responsibilities:
 *
 * - Maintain a cache of {@link puremvc.Proxy Proxy}
 *   instances.
 * - Provide methods for registering, retrieving, and removing
 *   {@link puremvc.Proxy Proxy} instances.
 *
 * Your application must register
 * {@link puremvc.Proxy Proxy} instances with the Model.
 * Typically, you use a
 * {@link puremvc.SimpleCommand SimpleCommand}
 * or
 * {@link puremvc.MacroCommand MacroCommand}
 * to create and register Proxy instances once the Facade has initialized the
 * *Core* actors.
 *
 * This Model implementation is a Multiton, so you should not call the
 * constructor directly, but instead call the
 * {@link #getInstance static Multiton Factory method}
 * @constructor
 * @param {string} key
 *  The Models multiton key
 * @throws {Error}
 *  An error is thrown if this multitons key is already in use by another instance
 */
function Model(key)
{
    if(Model.instanceMap[key])
    {
        throw new Error(Model.MULTITON_MSG);
    }

    this.multitonKey= key;
    Model.instanceMap[key]= this;
    this.proxyMap= [];
    this.initializeModel();
};

/**
 * Initialize the Model instance.
 *
 * Called automatically by the constructor, this
 * is your opportunity to initialize the Singleton
 * instance in your subclass without overriding the
 * constructor.
 *
 * @return void
 */
Model.prototype.initializeModel= function(){};


/**
 * Model Multiton Factory method.
 * Note that this method will return null if supplied a null
 * or undefined multiton key.
 *
 * @param {string} key
 *  The multiton key for the Model to retrieve
 * @return {puremvc.Model}
 *  the instance for this Multiton key
 */
Model.getInstance= function(key)
{
    if (null == key)
        return null;

    if(Model.instanceMap[key] == null)
    {
        Model.instanceMap[key]= new Model(key);
    }

    return Model.instanceMap[key];
};

/**
 * Register a Proxy with the Model
 * @param {puremvc.Proxy}
 */
Model.prototype.registerProxy= function(proxy)
{
    proxy.initializeNotifier(this.multitonKey);
    this.proxyMap[proxy.getProxyName()]= proxy;
    proxy.onRegister();
};

/**
 * Retrieve a Proxy from the Model
 *
 * @param {string} proxyName
 * @return {puremvc.Proxy}
 *  The Proxy instance previously registered with the provided proxyName
 */
Model.prototype.retrieveProxy= function(proxyName)
{
    return this.proxyMap[proxyName];
};

/**
 * Check if a Proxy is registered
 * @param {string} proxyName
 * @return {boolean}
 *  whether a Proxy is currently registered with the given proxyName.
 */
Model.prototype.hasProxy= function(proxyName)
{
    return this.proxyMap[proxyName] != null;
};

/**
 * Remove a Proxy from the Model.
 *
 * @param {string} proxyName
 *  The name of the Proxy instance to remove
 * @return {puremvc.Proxy}
 *  The Proxy that was removed from the Model
 */
Model.prototype.removeProxy= function(proxyName)
{
    var proxy= this.proxyMap[proxyName];
    if(proxy)
    {
        this.proxyMap[proxyName]= null;
        proxy.onRemove();
    }

    return proxy;
};

/**
 * @static
 * Remove a Model instance.
 *
 * @param {string} key
 * @return {void}
 */
Model.removeModel= function(key)
{
    delete Model.instanceMap[key];
};

/**
 * @ignore
 * The map used by the Model to store Proxy instances.
 *
 * @protected
 * @type Array
 */
Model.prototype.proxyMap= null;

/**
 * @ignore
 * The map used by the Model to store multiton instances
 *
 * @protected
 * @static
 * @type Array
 */
Model.instanceMap= [];

/**
 * @ignore
 * The Models multiton key.
 *
 * @protected
 * @type string
 */
Model.prototype.multitonKey;

/**
 * @ignore
 * Message Constants
 *
 * @static
 * @type {string}
 */
Model.MULTITON_MSG= "Model instance for this Multiton key already constructed!";
/**
 * @author PureMVC JS Native Port by David Foley, Frédéric Saunier, & Alain Duchesneau
 * @author Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 *
 * @class puremvc.Controller
 *
 * In PureMVC, the Controller class follows the 'Command and Controller'
 * strategy, and assumes these responsibilities:
 *
 * - Remembering which
 * {@link puremvc.SimpleCommand SimpleCommand}s
 * or
 * {@link puremvc.MacroCommand MacroCommand}s
 * are intended to handle which
 * {@link puremvc.Notification Notification}s
 * - Registering itself as an
 * {@link puremvc.Observer Observer} with
 * the {@link puremvc.View View} for each
 * {@link puremvc.Notification Notification}
 * that it has an
 * {@link puremvc.SimpleCommand SimpleCommand}
 * or {@link puremvc.MacroCommand MacroCommand}
 * mapping for.
 * - Creating a new instance of the proper
 * {@link puremvc.SimpleCommand SimpleCommand}s
 * or
 * {@link puremvc.MacroCommand MacroCommand}s
 * to handle a given
 * {@link puremvc.Notification Notification}
 * when notified by the
 * {@link puremvc.View View}.
 * - Calling the command's execute method, passing in the
 * {@link puremvc.Notification Notification}.
 *
 * Your application must register
 * {@link puremvc.SimpleCommand SimpleCommand}s
 * or {@link puremvc.MacroCommand MacroCommand}s
 * with the Controller.
 *
 * The simplest way is to subclass
 * {@link puremvc.Facade Facade},
 * and use its
 * {@link puremvc.Facade#initializeController initializeController}
 * method to add your registrations.
 *
 * @constructor
 * This Controller implementation is a Multiton, so you should not call the
 * constructor directly, but instead call the static #getInstance factory method,
 * passing the unique key for this instance to it.
 * @param {string} key
 * @throws {Error}
 *  If instance for this Multiton key has already been constructed
 */
function Controller(key)
{
    if(Controller.instanceMap[key] != null)
    {
        throw new Error(Controller.MULTITON_MSG);
    }

    this.multitonKey= key;
    Controller.instanceMap[this.multitonKey]= this;
    this.commandMap= new Array();
    this.initializeController();
}

/**
 * @protected
 *
 * Initialize the multiton Controller instance.
 *
 * Called automatically by the constructor.
 *
 * Note that if you are using a subclass of View
 * in your application, you should *also* subclass Controller
 * and override the initializeController method in the
 * following way.
 *
 *     MyController.prototype.initializeController= function ()
 *     {
 *         this.view= MyView.getInstance(this.multitonKey);
 *     };
 *
 * @return {void}
 */
Controller.prototype.initializeController= function()
{
    this.view= View.getInstance(this.multitonKey);
};

/**
 * The Controllers multiton factory method.
 * Note that this method will return null if supplied a null
 * or undefined multiton key.
 *
 * @param {string} key
 *  A Controller's multiton key
 * @return {puremvc.Controller}
 *  the Multiton instance of Controller
 */
Controller.getInstance= function(key)
{
    if (null == key)
        return null;

    if(null == this.instanceMap[key])
    {
        this.instanceMap[key]= new this(key);
    }

    return this.instanceMap[key];
};

/**
 * If a SimpleCommand or MacroCommand has previously been registered to handle
 * the given Notification then it is executed.
 *
 * @param {puremvc.Notification} note
 * @return {void}
 */
Controller.prototype.executeCommand= function(note)
{
    var commandClassRef= this.commandMap[note.getName()];
    if(commandClassRef == null)
        return;

    var commandInstance= new commandClassRef();
    commandInstance.initializeNotifier(this.multitonKey);
    commandInstance.execute(note);
};

/**
 * Register a particular SimpleCommand or MacroCommand class as the handler for
 * a particular Notification.
 *
 * If an command already been registered to handle Notifications with this name,
 * it is no longer used, the new command is used instead.
 *
 * The Observer for the new command is only created if this the irst time a
 * command has been regisered for this Notification name.
 *
 * @param {string} notificationName
 *  the name of the Notification
 * @param {Function} commandClassRef
 *  a command constructor
 * @return {void}
 */
Controller.prototype.registerCommand= function(notificationName, commandClassRef)
{
    if(this.commandMap[notificationName] == null)
    {
        this.view.registerObserver(notificationName, new Observer(this.executeCommand, this));
    }

    this.commandMap[notificationName]= commandClassRef;
};

/**
 * Check if a command is registered for a given Notification
 *
 * @param {string} notificationName
 * @return {boolean}
 *  whether a Command is currently registered for the given notificationName.
 */
Controller.prototype.hasCommand= function(notificationName)
{
    return this.commandMap[notificationName] != null;
};

/**
 * Remove a previously registered command to
 * {@link puremvc.Notification Notification}
 * mapping.
 *
 * @param {string} notificationName
 *  the name of the Notification to remove the command mapping for
 * @return {void}
 */
Controller.prototype.removeCommand= function(notificationName)
{
    if(this.hasCommand(notificationName))
    {
        this.view.removeObserver(notificationName, this);
        this.commandMap[notificationName]= null;
    }
};

/**
 * @static
 * Remove a Controller instance.
 *
 * @param {string} key
 *  multitonKey of Controller instance to remove
 * @return {void}
 */
Controller.removeController= function(key)
{
    delete this.instanceMap[key];
};

/**
 * Local reference to the Controller's View
 *
 * @protected
 * @type {puremvc.View}
 */
Controller.prototype.view= null;

/**
 * Note name to command constructor mappings
 *
 * @protected
 * @type {Object}
 */
Controller.prototype.commandMap= null;

/**
 * The Controller's multiton key
 *
 * @protected
 * @type {string}
 */
Controller.prototype.multitonKey= null;

/**
 * Multiton key to Controller instance mappings
 *
 * @static
 * @protected
 * @type {Object}
 */
Controller.instanceMap= [];

/**
 * @ignore
 *
 * Message constants
 * @static
 * @protected
 * @type {string}
 */
Controller.MULTITON_MSG= "controller key for this Multiton key already constructed"
/*
 * @author PureMVC JS Native Port by David Foley, Frédéric Saunier, & Alain Duchesneau 
 * @author Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 * 
 * @hide
 * A an internal helper class used to assist classlet implementation. This
 * class is not accessible by client code.
 */
var OopHelp=
{
    /*
     * @private
     * A reference to the global scope. We use this rather than window
     * in order to support both browser based and non browser baed 
     * JavaScript interpreters.
     * @type {Object}
     */
    global: (function(){return this})()

    /*
     * @private
     * Extend one Function's prototype by another, emulating classic
     * inheritance.
     * 
     * @param {Function} child
     *  The Function to extend (subclass)
     * 
     * @param {Function} parent
     *  The Function to extend from (superclass)
     * 
     * @return {Function}
     * 
     *  A reference to the extended Function (subclass)
     */
    ,   extend: function (child, parent)
{
    if ('function' !== typeof child)
        throw new TypeError('#extend- child should be Function');

    if ('function' !== typeof parent)
        throw new TypeError('#extend- parent should be Function');

    if (parent === child)
        return;

    var Transitive= new Function;
    Transitive.prototype= parent.prototype;
    child.prototype= new Transitive;
    return child.prototype.constructor= child;
}

    /*
     * @private
     * Decoarate one object with the properties of another. 
     * 
     * @param {Object} object
     *  The object to decorate.
     * 
     * @param {Object} traits
     *  The object providing the properites that the first object
     *  will be decorated with. Note that only properties defined on 
     *  this object will be copied- i.e. inherited properties will
     *  be ignored.
     * 
     * @return {Object}
     *  THe decorated object (first argument)
     */
    ,   decorate: function (object, traits)
{
    for (var accessor in traits)
    {
        object[accessor]= traits[accessor];
    }

    return object;
}
};


/**
 * @member puremvc
 *
 * Declare a namespace and optionally make an Object the referent
 * of that namespace.
 *
 *     console.assert(null == window.tld, 'No tld namespace');
 *     // declare the tld namespace
 *     puremvc.declare('tld');
 *     console.assert('object' === typeof tld, 'The tld namespace was declared');
 *
 *     // the method returns a reference to last namespace node in a created hierarchy
 *     var reference= puremvc.declare('tld.domain.app');
 *     console.assert(reference === tld.domain.app)
 *
 *     // of course you can also declare your own objects as well
 *     var AppConstants=
 *         {
 * 	           APP_NAME: 'tld.domain.app.App'
 *         };
 *
 *     puremvc.declare('tld.domain.app.AppConstants', AppConstants);
 *     console.assert(AppConstants === tld.domain.app.AppConstants
 * 	   , 'AppConstants was exported to the namespace');
 *
 * Note that you can also #declare within a closure. That way you
 * can selectively export Objects to your own namespaces without
 * leaking variables into the global scope.
 *
 *     (function(){
 *         // this var is not accessible outside of this
 *         // closures call scope
 *         var hiddenValue= 'defaultValue';
 * 
 *         // export an object that references the hidden
 *         // variable and which can mutate it
 *         puremvc.declare
 *         (
 *              'tld.domain.app.backdoor'
 * 
 *         ,    {
 *                  setValue: function (value)
 *                  {
 *                      // assigns to the hidden var
 *                      hiddenValue= value;
 *                  }
 * 
 *         ,        getValue: function ()
 *                  {
 *                      // reads from the hidden var
 *                      return hiddenValue;
 *                  }
 *              }
 *         );
 *     })();
 *     // indirectly retrieve the hidden variables value
 *     console.assert('defaultValue' === tld.domain.app.backdoor.getValue());
 *     // indirectly set the hidden variables value
 *     tld.domain.app.backdoor.setValue('newValue');
 *     // the hidden var was mutated
 *     console.assert('newValue' === tld.domain.app.backdoor.getValue());
 *
 * On occasion, primarily during testing, you may want to use declare,
 * but not have the global object be the namespace root. In these cases you
 * can supply the optional third scope argument.
 *
 *     var localScope= {}
 *     ,   object= {}
 *
 *     puremvc.declare('mock.object', object, localScope);
 *
 *     console.assert(null == window.mock, 'mock namespace is not in global scope');
 *     console.assert(object === localScope.mock.object, 'mock.object is available in localScope');
 *
 * @param {string} string
 *  A qualified object name, e.g. 'com.example.Class'
 *
 * @param {Object} [object]
 *  An object to make the referent of the namespace.
 *
 * @param {Object} [scope]
 *  The namespace's root node. If not supplied, the global
 *  scope will be namespaces root node.
 *
 * @return {Object}
 *
 *  A reference to the last node of the Object hierarchy created.
 */
function declare (qualifiedName, object, scope)
{
    var nodes= qualifiedName.split('.')
        ,   node= scope || OopHelp.global
        ,   lastNode
        ,   newNode
        ,   nodeName;

    for (var i= 0, n= nodes.length; i < n; i++)
    {
        lastNode= node;
        nodeName= nodes[i];

        node= (null == node[nodeName] ? node[nodeName] = {} : node[nodeName]);
    }

    if (null == object)
        return node;

    return lastNode[nodeName]= object;
};




/**
 * @member puremvc
 *
 * Define a new classlet. Current editions of JavaScript do not have classes,
 * but they can be emulated, and this method does this for you, saving you
 * from having to work with Function prototype directly. The method does
 * not extend any Native objects and is entirely opt in. Its particularly
 * usefull if you want to make your PureMvc applications more portable, by
 * decoupling them from a specific OOP abstraction library.
 *
 *
 *     puremvc.define
 *     (
 *         // the first object supplied is a class descriptor. None of these
 *         // properties are added to your class, the exception being the
 *         // constructor property, which if supplied, will be your classes
 *         // constructor.
 *         {
 *             // your classes namespace- if supplied, it will be 
 *             // created for you
 *             name: 'com.example.UserMediator'
 * 
 *             // your classes parent class. If supplied, inheritance 
 *             // will be taken care of for you
 *         ,   parent: puremvc.Mediator
 * 
 *             // your classes constructor. If not supplied, one will be 
 *             // created for you
 *         ,   constructor: function UserMediator (component)
 *             {
 *                  puremvc.Mediator.call(this, this.constructor.NAME, component);  
 *             }
 *         }
 *
 *         // the second object supplied defines your class traits, that is
 *         // the properties that will be defined on your classes prototype
 *         // and thereby on all instances of this class
 *     ,   {
 *             businessMethod: function ()
 *             {
 *                 // impl 
 *             }
 *         }
 *
 *         // the third object supplied defines your classes 'static' traits
 *         // that is, the methods and properties which will be defined on
 *         // your classes constructor
 *     ,   {
 *             NAME: 'userMediator'
 *         }
 *     );
 *
 * @param {Object} [classinfo]
 *  An object describing the class. This object can have any or all of
 *  the following properties:
 *
 *  - name: String
 *      The classlets name. This can be any arbitrary qualified object
 *      name. 'com.example.Classlet' or simply 'MyClasslet' for example
 *      The method will automatically create an object hierarchy refering
 *      to your class for you. Note that you will need to capture the
 *      methods return value to retrieve a reference to your class if the
 *      class name property is not defined.
 *  - parent: Function
 *      The classlets 'superclass'. Your class will be extended from this
 *      if supplied.
 *
 *  - constructor: Function
 *      The classlets constructor. Note this is *not* a post construct
 *      initialize method, but your classes constructor Function.
 *      If this attribute is not defined, a constructor will be created for
 *      you automatically. If you have supplied a parent class
 *      value and not defined the classes constructor, the automatically
 *      created constructor will invoke the super class constructor
 *      automatically. If you have supplied your own constructor and you
 *      wish to invoke it's super constructor, you must do this manually, as
 *      there is no reference to the classes parent added to the constructor
 *      prototype.
 *
 *  - scope: Object.
 *      For use in advanced scenarios. If the name attribute has been supplied,
 *      this value will be the root of the object hierarchy created for you.
 *      Use it do define your own class hierarchies in private scopes,
 *      accross iFrames, in your unit tests, or avoid collision with third
 *      party library namespaces.
 *
 * @param {Object} [traits]
 *  An Object, the properties of which will be added to the
 *  class constructors prototype.
 *
 * @param {Object} [staitcTraits]
 *  An Object, the properties of which will be added directly
 *  to this class constructor
 *
 * @return {Function}
 *  A reference to the classlets constructor
 */
function define (classInfo, traits, staticTraits)
{
    if (!classInfo)
    {
        classInfo= {}
    }

    var className= classInfo.name
        ,   classParent= classInfo.parent
        ,   doExtend= 'function' === typeof classParent
        ,   classConstructor
        ,   classScope= classInfo.scope || null
        ,   prototype

    if ('parent' in classInfo && !doExtend)
    {
        throw new TypeError('Class parent must be Function');
    }

    if (classInfo.hasOwnProperty('constructor'))
    {
        classConstructor= classInfo.constructor
        if ('function' !== typeof classConstructor)
        {
            throw new TypeError('Class constructor must be Function')
        }
    }
    else // there is no constructor, create one
    {
        if (doExtend) // ensure to call the super constructor
        {
            classConstructor= function ()
            {
                classParent.apply(this, arguments);
            }
        }
        else // just create a Function
        {
            classConstructor= new Function;
        }
    }

    if (doExtend)
    {
        OopHelp.extend(classConstructor, classParent);
    }

    if (traits)
    {
        prototype= classConstructor.prototype
        OopHelp.decorate(prototype, traits);
        // reassign constructor 
        prototype.constructor= classConstructor;
    }

    if (staticTraits)
    {
        OopHelp.decorate(classConstructor, staticTraits)
    }

    if (className)
    {
        if ('string' !== typeof className)
        {
            throw new TypeError('Class name must be primitive string');
        }

        declare (className, classConstructor, classScope);
    }

    return classConstructor;
};



/* implementation end */

// define the puremvc global namespace and export the actors
var puremvc =
{
        View: View
    ,	Model: Model
    ,	Controller: Controller
    ,	SimpleCommand: SimpleCommand
    ,	MacroCommand: MacroCommand
    ,	Facade: Facade
    ,	Mediator: Mediator
    ,	Observer: Observer
    ,	Notification: Notification
    ,	Notifier: Notifier
    ,	Proxy: Proxy
    ,	define: define
    ,	declare: declare
};



module.exports = puremvc;
},{}],"D:\\reps\\fighter\\src\\app.js":[function(require,module,exports){
var AppFacade = require('./appFacade.js');
var g_resouces = require('./resource.js').g_resouces;

(function() {
    cc.game.onStart = function(){
        cc.view.adjustViewPort(true);
        cc.view.setDesignResolutionSize(640, 960, cc.ResolutionPolicy.SHOW_ALL);
        cc.view.resizeWithBrowserSize(true);

        ccs.csLoader.setRecordProtocolBuffersPath(true);
        cc.LoaderScene.preload(g_resouces, function() {
            var key = 'fighter-mvc';
            AppFacade.getInstance(key).startup();
        }, this);
    };
    cc.game.run();
})();
},{"./appFacade.js":"D:\\reps\\fighter\\src\\appFacade.js","./resource.js":"D:\\reps\\fighter\\src\\resource.js"}],"D:\\reps\\fighter\\src\\appConstants.js":[function(require,module,exports){
/**
 * Created by Arthur on 2014/12/20.
 */
var constants = module.exports = {
    APP_NAME: "fighter",

    NOTIFICATION: {
        STARTUP: 'startup',
        SCENE_CHANGED: 'scene_changed',
        SCENE_HOME: 'scene_home'
    },

    SCENE_ACTION: 'scene_action',
    SCENE: {
        HOME: 'HomeMediator',
        TRAIN: 'TrainMediator'
    },

    TASK_STATUS : {
        STOP: 1,
        START: 2
    }
};
},{}],"D:\\reps\\fighter\\src\\appFacade.js":[function(require,module,exports){
/**
 * Created by Arthur on 2014/12/21.
 */
var puremvc = require('puremvc').puremvc;
var StartupCommand = require('./controller/command/StartupCommand.js');
var constants = require('./appConstants.js');

var AppFacade = module.exports = puremvc.define(
    // CLASS INFO
    {
        name: 'AppFacade',
        parent: puremvc.Facade,

        constructor: function (multitonKey) {
            puremvc.Facade.call(this, multitonKey);
        }
    },
    // INSTANCE MEMBERS
    {
        initializeController: function () {
            puremvc.Facade.prototype.initializeController.call(this);
            this.registerCommand(constants.NOTIFICATION.STARTUP, StartupCommand);
        },
        initializeModel: function () {
            puremvc.Facade.prototype.initializeModel.call(this);
        },
        initializeView: function () {
            puremvc.Facade.prototype.initializeView.call(this);
        },

        startup: function () {
            this.sendNotification(constants.NOTIFICATION.STARTUP);
        }
    },
    // STATIC MEMBERS
    {
        getInstance: function(multitonKey) {
            var instanceMap = puremvc.Facade.instanceMap;
            var instance = instanceMap[multitonKey];
            if(instance) {
                return instance;
            }
            return instanceMap[multitonKey] = new AppFacade(multitonKey);
        },
        NAME: 'AppFacade'
    }
);
},{"./appConstants.js":"D:\\reps\\fighter\\src\\appConstants.js","./controller/command/StartupCommand.js":"D:\\reps\\fighter\\src\\controller\\command\\StartupCommand.js","puremvc":"D:\\reps\\fighter\\node_modules\\puremvc\\index.js"}],"D:\\reps\\fighter\\src\\controller\\command\\StartupCommand.js":[function(require,module,exports){
/**
 * Created by Arthur on 2014/12/14.
 */

var puremvc = require('puremvc').puremvc;
var PrepControllerCommand = require('./prepControllerCommand.js');
var PrepModelCommand = require('./prepModelCommand.js');
var PrepViewCommand = require('./prepViewCommand.js');
var HomeCommand = require('./homeCommand.js');
var constants = require('../../appConstants.js');

module.exports = puremvc.define({
        name: 'fighter.controller.command.StartupCommand',
        parent: puremvc.MacroCommand
    },

    // INSTANCE MEMBERS
    {
        /**
         * Add the sub-commands for this MacroCommand
         * @override
         */
        initializeMacroCommand: function () {
            cc.log('start command init');
            this.addSubCommand( PrepControllerCommand );
            this.addSubCommand( PrepModelCommand );
            this.addSubCommand( PrepViewCommand );
            this.addSubCommand( HomeCommand );
        }
    }
);

},{"../../appConstants.js":"D:\\reps\\fighter\\src\\appConstants.js","./homeCommand.js":"D:\\reps\\fighter\\src\\controller\\command\\homeCommand.js","./prepControllerCommand.js":"D:\\reps\\fighter\\src\\controller\\command\\prepControllerCommand.js","./prepModelCommand.js":"D:\\reps\\fighter\\src\\controller\\command\\prepModelCommand.js","./prepViewCommand.js":"D:\\reps\\fighter\\src\\controller\\command\\prepViewCommand.js","puremvc":"D:\\reps\\fighter\\node_modules\\puremvc\\index.js"}],"D:\\reps\\fighter\\src\\controller\\command\\homeCommand.js":[function(require,module,exports){
/**
 * Created by Arthur on 2014/12/21.
 */

var puremvc = require('puremvc').puremvc;
var constants = require('../../appConstants.js');

module.exports = puremvc.define({
        name: 'fighter.controller.command.HomeCommand',
        parent: puremvc.SimpleCommand
    },

    // INSTANCE MEMBERS
    {
        /**
         * Register Commands with the Controller
         * @override
         */
        execute: function (note) {
            // This registers multiple notes to a single command which performs different logic based on the note name.
            // In a more complex app, we'd usually be registering a different command to each notification name.
            cc.log('HomeCommand execute');
            this.facade.sendNotification(constants.SCENE_ACTION, {
                name: constants.SCENE.HOME
            });
        }
    }
);



},{"../../appConstants.js":"D:\\reps\\fighter\\src\\appConstants.js","puremvc":"D:\\reps\\fighter\\node_modules\\puremvc\\index.js"}],"D:\\reps\\fighter\\src\\controller\\command\\prepControllerCommand.js":[function(require,module,exports){
/**
 * Created by Arthur on 2014/12/14.
 */
var puremvc = require('puremvc').puremvc;
var constants = require('../../appConstants.js');

module.exports = puremvc.define({
        name: 'fighter.controller.command.PrepControllerCommand',
        parent: puremvc.SimpleCommand
    },

    // INSTANCE MEMBERS
    {
        /**
         * Register Commands with the Controller
         * @override
         */
        execute: function (note) {
            // This registers multiple notes to a single command which performs different logic based on the note name.
            // In a more complex app, we'd usually be registering a different command to each notification name.
            cc.log('PrepControllerCommand execute');


        }
    }
);
},{"../../appConstants.js":"D:\\reps\\fighter\\src\\appConstants.js","puremvc":"D:\\reps\\fighter\\node_modules\\puremvc\\index.js"}],"D:\\reps\\fighter\\src\\controller\\command\\prepModelCommand.js":[function(require,module,exports){
/**
 * Created by Arthur on 2014/12/14.
 */
var puremvc = require('puremvc').puremvc;
var PlayerProxy = require('../../model/proxy/playerProxy.js');

module.exports = puremvc.define({
        name: 'fighter.controller.command.PrepModelCommand',
        parent: puremvc.SimpleCommand
    },

    // INSTANCE MEMBERS
    {
        /**
         * Register Proxies with the Model
         * @override
         */
        execute: function (note) {
            cc.log('PrepModelCommand execute');
            this.facade.registerProxy(new PlayerProxy());
        }
    }
);

},{"../../model/proxy/playerProxy.js":"D:\\reps\\fighter\\src\\model\\proxy\\playerProxy.js","puremvc":"D:\\reps\\fighter\\node_modules\\puremvc\\index.js"}],"D:\\reps\\fighter\\src\\controller\\command\\prepViewCommand.js":[function(require,module,exports){
/**
 * Created by Arthur on 2014/12/14.
 */
var puremvc = require('puremvc').puremvc;
var DirectorMediator = require('../../view/mediator/directorMediator.js');
var HomeMediator = require('../../view/mediator/homeMediator.js');
var SceneMediator = require('../../view/mediator/sceneMediator.js');
var TrainMediator = require('../../view/mediator/trainMediator.js');

module.exports = puremvc.define ({
        name: 'fighter.controller.command.PrepViewCommand',
        parent: puremvc.SimpleCommand
    },

    // INSTANCE MEMBERS
    {
        /**
         * Register Mediators with the View
         * @override
         */
        execute: function (note) {
            cc.log('PrepViewCommand execute');

            this.facade.registerMediator(new DirectorMediator());
            this.facade.registerMediator(new SceneMediator());
            this.facade.registerMediator(new HomeMediator());
            this.facade.registerMediator(new TrainMediator());
        }
    }
);

},{"../../view/mediator/directorMediator.js":"D:\\reps\\fighter\\src\\view\\mediator\\directorMediator.js","../../view/mediator/homeMediator.js":"D:\\reps\\fighter\\src\\view\\mediator\\homeMediator.js","../../view/mediator/sceneMediator.js":"D:\\reps\\fighter\\src\\view\\mediator\\sceneMediator.js","../../view/mediator/trainMediator.js":"D:\\reps\\fighter\\src\\view\\mediator\\trainMediator.js","puremvc":"D:\\reps\\fighter\\node_modules\\puremvc\\index.js"}],"D:\\reps\\fighter\\src\\model\\entity\\entity.js":[function(require,module,exports){
/**
 * Created with JetBrains WebStorm.
 * User: lcc3536
 * Date: 13-7-9
 * Time: 下午5:24
 * To change this template use File | Settings | File Templates.
 */


/*
 * entity
 * */

var Event = require('../../util/event.js');

var Entity = module.exports = Event.extend({
	set: function (name, value) {
		if (typeof value != "undefined") {
			if (this["_" + name] !== value) {
				this["_" + name] = value;
			}

			this.emit(name + "Change");
		}
	},

	sets: function (attrs) {
		var key;

		for (key in attrs) {
			this.set(key, attrs[key]);
		}
	},

	add: function (name, value) {
		if (typeof value != "undefined") {
			if (value) {
				this.set(name, this["_" + name] + value);
			}
		}
	},

	adds: function (attrs) {
		var key;

		for (key in attrs) {
			this.add(key, attrs[key]);
		}
	},

	get: function (name) {
		return this["_" + name];
	},

	has: function (name) {
		return (typeof (this["_" + name]) != "undefined");
	},

	schedule: function (fn, interval, repeat, delay) {
		interval = interval || 0;
		repeat = (repeat == null) ? cc.REPEAT_FOREVER : repeat;
		delay = delay || 0;

		cc.Director.getInstance().getScheduler().scheduleCallbackForTarget(this, fn, interval, repeat, delay, false);
	},

	scheduleOnce: function (fn, delay) {
		this.schedule(fn, 0.0, 0, delay);
	},

	unschedule: function (fn) {
		// explicit nil handling
		cc.Director.getInstance().getScheduler().unscheduleCallbackForTarget(this, fn);
	},

	unscheduleAllCallbacks: function () {
		cc.Director.getInstance().getScheduler().unscheduleAllCallbacksForTarget(this);
	}
});

},{"../../util/event.js":"D:\\reps\\fighter\\src\\util\\event.js"}],"D:\\reps\\fighter\\src\\model\\entity\\player.js":[function(require,module,exports){
var Entity = require('./entity.js');

var Player = module.exports = Entity.extend({
	_id: 0,
	_name: "",
	_photo: "",
	_gold: 0,
	
	_hp: 0,
	_atk: 0,
	_defense: 0,
	_undefense: 0,
	_crit: 0,
	_uncrit: 0,
	_dodge: 0,
	_hit: 0,	

    ctor: function(attrs) {
        this.sets(attrs);
    },

});
},{"./entity.js":"D:\\reps\\fighter\\src\\model\\entity\\entity.js"}],"D:\\reps\\fighter\\src\\model\\proxy\\playerProxy.js":[function(require,module,exports){
/**
 * Created by Arthur on 2014/12/26.
 */
var puremvc = require('puremvc');
var Player = require('../entity/player.js');

var PlayerProxy = puremvc.define({
        name: 'figther.model.proxy.PlayerProxy',
        parent: puremvc.Proxy,

        constructor: function() {
            puremvc.Proxy.prototype.call(this, this.constructor.NAME);

            this.setData(new Player({
                id: 1,
                name: "我家没人",
                photo: "",
                gold: 12937,

                hp: 302004,
                atk: 40930,
                defense: 29342,
                undefense: 12341,
                crit: 30,
                uncrit: 10,
                dodge: 20,
                hit: 10
            }));
        }
    },

    {

        getPlayer: function() {
            return this.data;
        },

        updatePlayer: function(name, value) {
            if (this.data != null) {
            this.data.set(name, value);}
        }
    },

    {
        NAME: 'PlayerProxy'
    }
);
},{"../entity/player.js":"D:\\reps\\fighter\\src\\model\\entity\\player.js","puremvc":"D:\\reps\\fighter\\node_modules\\puremvc\\index.js"}],"D:\\reps\\fighter\\src\\resource.js":[function(require,module,exports){
var res = {
    add_jpg: "res/images/add.jpg",
    btn1_jpg: "res/images/btn1.jpg",

    btn3_png: "res/images/btn3.jpg",
    btn5_png: "res/images/btn5.jpg",
    btn7_jpg: "res/images/btn7.jpg",

    img1_png: "res/images/img1.jpg",
    img5_jpg: "res/images/img5.jpg",
    img6_jpg: "res/images/img6.jpg",
    txt_bg1_jpg: "res/images/txt_bg1.jpg",


    MainNode: "res/MainScene.csb",
    TaskNode: "res/TaskNode.csb",
    TrainNode: "res/TrainNode.csb"

};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}

module.exports.res = res;
module.exports.g_resouces = g_resources;
},{}],"D:\\reps\\fighter\\src\\util\\event.js":[function(require,module,exports){
/**
 * Created with JetBrains WebStorm.
 * User: lcc3536
 * Date: 13-10-18
 * Time: 下午2:56
 * To change this template use File | Settings | File Templates.
 */


/*
 * event
 * */

var Event = module.exports = cc.Class.extend({
    _callback: {},

    on: function (event, fn) {
        this._callbacks = this._callbacks || {};
        (this._callbacks[event] = this._callbacks[event] || [])
            .push(fn);
        return this;
    },

    once: function (event, fn) {
        var self = this;
        this._callbacks = this._callbacks || {};

        function on() {
            self.off(event, on);
            fn.apply(this, arguments);
        }

        fn._off = on;
        this.on(event, on);
        return this;
    },
    
    addListener: function(event, fn) {
    	this.on(event, fn);
    },

    removeListener: function (event, fn) {
        this._callbacks = this._callbacks || {};

        // all
        if (0 == arguments.length) {
            this._callbacks = {};
            return this;
        }

        // specific event
        var callbacks = this._callbacks[event];
        if (!callbacks) return this;

        // remove all handlers
        if (1 == arguments.length) {
            delete this._callbacks[event];
            return this;
        }

        // remove specific handler
        var i = this._indexOf(callbacks, fn._off || fn);
        if (~i) callbacks.splice(i, 1);
        return this;
    },
    
    removeListeners: function() {
    	this._callback = {};
    },

    emit: function (event) {
        this._callbacks = this._callbacks || {};
        var args = [].slice.call(arguments, 1)
        var callbacks = this._callbacks[event];

        if (callbacks) {
            callbacks = callbacks.slice(0);
            for (var i = 0, len = callbacks.length; i < len; ++i) {
                callbacks[i].apply(this, args);
            }
        }

        return this;
    },

    listeners: function (event) {
        this._callbacks = this._callbacks || {};
        return this._callbacks[event] || [];
    },

    hasListeners: function (event) {
        return !!this.listeners(event).length;
    },

    _indexOf: function (arr, obj) {
        if (arr.indexOf) return arr.indexOf(obj);
        for (var i = 0; i < arr.length; ++i) {
            if (arr[i] === obj) return i;
        }
        return -1;
    }
});

},{}],"D:\\reps\\fighter\\src\\view\\component\\homeLayer.js":[function(require,module,exports){
/**
 * Created by Arthur on 2014/12/20.
 */
var res = require('../../resource.js').res;

module.exports = cc.Layer.extend({
    _rootNode: null,

    ctor: function() {
        this._super();
        this._rootNode = ccs.csLoader.createNode(res.MainNode);
        this.addChild(this._rootNode);
        return true;
    },

    init: function(player) {
        this.update(player);

        var rootNode = this._rootNode;
        var btn_train = rootNode.getChildByName('main_panel').getChildByName('btn_train');
        btn_train.addClickEventListener(this.buttonTrainListener.bind(this));
    },

    update: function(player) {
        var node = this._rootNode;
        node.getChildByName('main_panel').getChildByName('txt_hp').setString(player.hp);
        node.getChildByName('main_panel').getChildByName('txt_hp').setString(player.atk);
        node.getChildByName('main_panel').getChildByName('txt_hp').setString(player.hp);
        node.getChildByName('main_panel').getChildByName('txt_hp').setString(player.hp);
        node.getChildByName('main_panel').getChildByName('txt_hp').setString(player.hp);
        node.getChildByName('main_panel').getChildByName('txt_hp').setString(player.hp);
        node.getChildByName('main_panel').getChildByName('txt_hp').setString(player.hp);
        node.getChildByName('main_panel').getChildByName('txt_hp').setString(player.hp);
        node.getChildByName('main_panel').getChildByName('txt_hp').setString(player.hp);
        node.getChildByName('main_panel').getChildByName('txt_hp').setString(player.hp);
    },

    buttonTrainListener: function() {
        if (this.onTrain) {
            this.onTrain();
        }
    }
});
},{"../../resource.js":"D:\\reps\\fighter\\src\\resource.js"}],"D:\\reps\\fighter\\src\\view\\component\\trainLayer.js":[function(require,module,exports){
/**
 * Created by Arthur on 2014/12/21.
 */
var res = require('../../resource.js').res;

var tasks = ["生命", "攻击", "防御", "破防", "暴击", "韧性", "闪避", "命中"];
var DEFAULT_COUNT = 100;
module.exports = cc.Layer.extend({
    ctor: function() {
        this._super();
        var trainNode = ccs.csLoader.createNode(res.TrainNode);
        this.addChild(trainNode);

        var size = cc.winSize;
        var baseY = size.height*84/100;
        for (var i = 0; i < tasks.length; i++) {
            var y = baseY - 100*(i+1);
            var taskNode = ccs.csLoader.createNode(res.TaskNode);
            // 修改锚点无效，默认锚点为(0,0)
            taskNode.attr({
                x: 0,
                y: y
            });
            var task_name = taskNode.getChildByName('task_name');
            task_name.setString(tasks[i]);
            task_name.attr({
                anchorX: 0,
                anchorY: 0.5
            });
            var count_value = taskNode.getChildByName('count_value');
            count_value.setString(DEFAULT_COUNT + '次');
            count_value.attr({
                anchorX: 0,
                anchorY: 0.5
            });

            var btn_start_task = taskNode.getChildByName('btn_start_task');
            btn_start_task.addClickEventListener(this.startTaskEvent.bind(this, btn_start_task));
            btn_start_task.setTitleText('开始任务');
            btn_start_task.setTitleFontSize(18);

            trainNode.addChild(taskNode);
        }

        return true;
    },

    startTaskEvent: function(sender) {
        sender.setTitleText('已开始');
    }
});
},{"../../resource.js":"D:\\reps\\fighter\\src\\resource.js"}],"D:\\reps\\fighter\\src\\view\\mediator\\directorMediator.js":[function(require,module,exports){
/**
 * Created by Arthur on 2014/12/21.
 */

var puremvc = require('puremvc').puremvc;
var SceneMediator = require('./sceneMediator.js');
var constants = require('../../appConstants.js');

module.exports = puremvc.define(
    // CLASS INFO
    {
        name: 'view.mediator.DirectorMediator',
        parent: puremvc.Mediator,
        constructor: function() {
            puremvc.Mediator.call(this, this.constructor.NAME);
        }
    },
    // INSTANCE MEMBERS
    {
        /** @override */
        listNotificationInterests: function () {
            return [
                constants.NOTIFICATION.SCENE_CHANGED
            ];
        },

        /** @override */
        handleNotification: function (notification) {
            cc.log('handler notification on director mediator')
            switch (notification.getName()) {
                case constants.NOTIFICATION.SCENE_CHANGED:
                    //cc.log('SCENE_CHANGED');

                    var sceneMediator = this.facade.retrieveMediator(SceneMediator.NAME );

                    if(sceneMediator && sceneMediator.getViewComponent()) {
                        cc.director.runScene(new cc.TransitionFade(1.2, sceneMediator.getViewComponent()));
                    }

                    break;
            }
        },

        /** @override */
        onRegister: function () {

        },

        /** @override */
        onRemove: function () {

        }
    },
    // STATIC MEMBERS
    {
        NAME: 'DirectorMediator'
    }
);

},{"../../appConstants.js":"D:\\reps\\fighter\\src\\appConstants.js","./sceneMediator.js":"D:\\reps\\fighter\\src\\view\\mediator\\sceneMediator.js","puremvc":"D:\\reps\\fighter\\node_modules\\puremvc\\index.js"}],"D:\\reps\\fighter\\src\\view\\mediator\\homeMediator.js":[function(require,module,exports){
/**
 * Created by Arthur on 2014/12/20.
 */
var puremvc = require('puremvc').puremvc;
var constants = require('../../appConstants.js');
var PlayerProxy = require('../../model/proxy/playerProxy.js');

module.exports = puremvc.define(
    {
        name: 'fighter.view.mediator.HomeMediator',
        parent: puremvc.Mediator
    },

    // instance members
    {
        /** @override */
        listNotificationInterests: function() {
            return [];
        },

        /** @override */
        handleNotification: function(note) {

        },

        /** @override */
        onRegister: function() {

        },

        /** @override */
        onRemove: function() {

        },

        init: function() {
            var self = this;
            var playerProxy = this.facade.retrieveProxy(PlayerProxy.NAME);
            var playerData = playerProxy.getPlayer();
            
            var HomeLayer = require('./../component/homeLayer.js');
            self.viewComponent = new HomeLayer();
            self.viewComponent.onTrain = function(){
                self.sendNotification(constants.SCENE_ACTION, {name: constants.SCENE.TRAIN});
            };
            self.viewComponent.init();
        },

        getResource: function() {

        }

    },

    // static members
    {
        NAME: 'HomeMediator'
    }
)
},{"../../appConstants.js":"D:\\reps\\fighter\\src\\appConstants.js","../../model/proxy/playerProxy.js":"D:\\reps\\fighter\\src\\model\\proxy\\playerProxy.js","./../component/homeLayer.js":"D:\\reps\\fighter\\src\\view\\component\\homeLayer.js","puremvc":"D:\\reps\\fighter\\node_modules\\puremvc\\index.js"}],"D:\\reps\\fighter\\src\\view\\mediator\\sceneMediator.js":[function(require,module,exports){
/**
 * Created by Arthur on 2014/12/21.
 */

var puremvc = require('puremvc').puremvc;
var constants = require('../../appConstants.js');

module.exports = puremvc.define
(
    // CLASS INFO
    {
        name: 'fighter.view.mediator.SceneMediator',
        parent: puremvc.Mediator
    },
    // INSTANCE MEMBERS
    {
        _initialized: false,

        loaderImage: "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAlAAD/4QMpaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjAtYzA2MCA2MS4xMzQ3NzcsIDIwMTAvMDIvMTItMTc6MzI6MDAgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjM4MDBEMDY2QTU1MjExRTFBQTAzQjEzMUNFNzMxRkQwIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjM4MDBEMDY1QTU1MjExRTFBQTAzQjEzMUNFNzMxRkQwIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzUgV2luZG93cyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkU2RTk0OEM4OERCNDExRTE5NEUyRkE3M0M3QkE1NTlEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkU2RTk0OEM5OERCNDExRTE5NEUyRkE3M0M3QkE1NTlEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQADQkJCQoJDQoKDRMMCwwTFhENDREWGhUVFhUVGhkUFhUVFhQZGR0fIB8dGScnKionJzk4ODg5QEBAQEBAQEBAQAEODAwOEA4RDw8RFA4RDhQVERISERUfFRUXFRUfKB0ZGRkZHSgjJiAgICYjLCwoKCwsNzc1NzdAQEBAQEBAQEBA/8AAEQgAyACgAwEiAAIRAQMRAf/EALAAAAEFAQEAAAAAAAAAAAAAAAQAAgMFBgcBAQEAAwEBAAAAAAAAAAAAAAAAAQMEAgUQAAIBAgIEBwoLBgQGAwAAAAECAwAEEQUhMRIGQVFxsTITFGGBwdEiQlKSMzWRoeFicqKyI1NzFYJjJDQWB9KjVCbxwkNkJWXik3QRAAIBAgMFBQcDBQEAAAAAAAABAhEDIRIEMUFRcTJhwVIUBZGhsSJyEzOB0ULhYpIjUxX/2gAMAwEAAhEDEQA/AMJSpUqAVKlXuFAeUq9wpUB5XuFe4V6ooDzZHDox0CnGMinzwl7Z8NajaHeoO3vmTBZBtp9YUIqTEV5ROxHKnWRnaU8VRMhFBUjpV7hSoSeUq9pUB5Sr2lhQHlKvcK8oBV7hSFSRrtaKAZs07YNPM1pG2xJIAw1jSeandry/8X4m8VCKkWwaWwam7Xl/4v1W8VLtmX/i/VbxUoKkWwakSM407tmX/i/VbxUmzGwjQsjdY41IARie/U0IbZO0kNtCXnOCkEBeFu4KI3Bs7DNb27ya+jDx3kJeEnpJJEcQVbWDsk17u5urd591ucZkWhym2Vnd9RkCDEpFxDRpbw0bunu5mlp2De2FMLYXOD2wB2xbOeraUcYGJ72mlSUiqzzdzMd3Z3mixltA2yzcK/NlHM1DQyRXce1HocdNOEfJXZ88y9ZojOqhiBszIRiHQ8Y4cK5TvHuzLljHNMqxNoDjLFraHHnjPxcNCGVbxEUzYNTx5jZSxhpW6qTzlwJ+DCvO2Zf+L9VvFSgqyHYNLYNTdssPxfibxUu15f8Ai/VPiqCakOwa82DU/a8v/F+JvFTDdWPBL8R8VKCvYRYV5UzoMAy6QdIIqI0B4KJtxiRQwou16QoGUkntH5Tz0RbZbmF2hktraSVBo2lUkY8tDye0flPPXTslVUyiyVRsjqUOA4yMT8dW2ram2m6UVTNq9S7EIyUVJydMTn/6DnP+im9Wl+g5z/opvVrpteEhQWY4AaSTwAVf5WPiZh/9S5/zj7zltzlmYWkfWXNvJDGTgGcYDHirR7i7mSbwXParsFMrgb7w6jKw/wCmnc9I14kF3vpvCljbMyWMOJL4aEiB8qU/ObUK7HYWVrl1pFZWiCOCBQqKOLjPGTrNZZqKbUXVHq2nNwTuJRk1VpbgXN8s7Rk5ym0UQQzhIG2NAjhxHWbI+gCBVjBBFbwxwQqEiiUJGg1BVGAFe7dV28WYLYZFmF2Th1UD7JGjymGyn1iK5OyzIBGB1HgrLZhamzumQAGJwSqnSCh1q3GOCodxt4cxurdcpzuN4cyhiWaF5Bg09udUmnWw1H/jV9nFuJ7Quo+8h8peThFA+047vduyMtk7fYqTl07YFdfUufMPzT5p71UdtlmYXaGS2t3mQHAsgxANdadYJopLe4QS2867EsZ4QfCNYrCFbjdDPmgkYyWFxgVf04ifJf6ScNdRUW1XBb6FU5TjF5EpSSrGu/s5lN+g5z/opvVpfoOc/wCim9WtdHnatvObJXDW7xLGhB8nrPaY9/HCr+tEdPCVaSeDoYLnqF63lzW4/PFSW3ecxbI84VSzWUwUaSdg0DXXK5nvAipnd6qgKvWnQO7pri9ZUEmm3Vl2j1kr8pRlFRyquBNZjGxQ/S56Y1S2fu9OVueon11Szahoou06QoQUXadIVCD2FJJ7R+U89dMydv8Axdn+TH9muZye0flPPXQstlK5Tbka1gUjlC1q0vVLkeb6r+O3Tx9xcY1nt8c0NrZCyiOE1108NYjGv1joo7Js1jzKyScYLIvkzL6LDwHXVJksH9Sb49dKNq0tj1jA6uriOCL+02FWX7iVtZX1/AzaHTyeoauKn2MX9W79zebiZCuR5MjSrhfXuEtwTrUeZH+yNfdrRNcxI6IzhXlJEak6WIGJ2Rw4ChWnChndtlVBLMdQA0k1gbXNMzzDfDLs6mjaPKppJbWwJ1bOwwxw43OnHh71YT3DpfWUJmFlb5jHHDdeXBHIsrRea5TSqvxqG04cNN62vetoCS4tre5mgnkGE9q+3DKOkuI2WX6LDQRRHWDh1UCtwj7QRg2wdl8Djgw1qe7XvW0BQ3kfZ7mSLgU+T9E6RVbnuVrnWVSWqj+Lt8ZbRuHEdKPkYVcZ2MJY5fSGyeVar45+rkWQHAqccalPE5km1htWK5nK4Wnt5FuUBUwOMG4nGkA/BXUrW4S6torlOjMgcd/xVn7rLo7zKs0uEjCNeSvdwoBhgsZxX1l2j36k3Lu+uyprdj5Vs5A+i/lD48a0aaVJOPi7jB6lbzWozpjB48pf1NDXNN4vfl7+Z4BXS65pvF78vfzPAK71XTHmZ/S/yT+jvJ7L3fHytz1E+upbL+Qj5W56jfXWRnsIYKLtekKEFGWvSFQgyjk9o/Keet3YthlMP/5x9msJJ7R+U89biyb/AMXEv7gD6tadL1T+kwepRrC39ZkLDMbiwMvUHRPG0bjlGg8ore/23sxBldxfMPLupNhT8yL/AORNZbdzJ484scytxgLqJY5LZj6Q2sV5G1Vud1mjjyG0ij0NEGSZToKyhjtqw4waztuiXA3qKTbSxltfGhbZlE95ZtZqxVbgiOZhrER9ph3Svk9+pJILZ4Y4DGBFCUMKjRsGPobPFhUfW0NJmljE2xJcIrcI2vFUEln1lRXd6lrazXT9GCNpD+yNqoI7mOVduNw6nzlOIoPOUa6yye1XXcbMR5GdQ3xY0BSbj31/FcTQZirJ+q431q7anbHCTZ72Bw7lbPrKBMcBWNNgbMBBh+bsjBdni0VJ1lARZs6yWiupxCuMDy6KpS2IwOo6DTr3Mre3e5tZZVUM4ZBjqOOJoWO4jkXajcOOMHGgDISvWIrdAkKR80+TzVl908bPPL3LzxOuHdifxVfiTAg92qI/w+/8gGgSyN/mR7XPVlp0lF/3L3mbVKtu5Hjbk/8AHE2Fc03i9+Xv5ngFdKNc13i9+Xv5ngFaNV0x5nn+l/kn9HeEWXu+PlbnqJ9dS2Xu9OVueon11kZ7CGCjLXpCgxRlr0hUIPYUcntH5Tz1s8vb+Bt1/dqPirGSe0flPPWusG/g4Py15q06XqlyMWvVYQ+ruI9xJOqzO9hOto/sP8tbGOFIrmWeM7IuMDMnAXXQJOUjQeOsJk0nY96ip0CYunrjaHx1t+srPJUbXBm2LrFPikwTOb+T+VhbZxGMrDXp83x1QSy2tucJpUjPETp+Cn5/ftaRvKvtp3Kx48HG3erHMzOxZiWZtLMdJNQSbbL71Vk6yynViOkqnEEfOWtPbXi3EQkGg6mXiNckjeSJxJGxR10qw0GtxuxmvbImD4CZMFlA4fRfv0BqesqqzTMZNMEDbIHtHH2QeCiZJSqMQdOGiue53mz3czQwsRbIcNHnkec3c4qAMuriz68gTIToxwOOnlp0MjxMJYW741Gs3RVldtbygE/dMcHX/moDaxTiWNZB53B3arb8/wC+4SOF4sf/AKxU9kcBsfOGHfoUHtG/RbzY5Die5HHhXdvavqiZ9Q8Jdlq4/gbKua7xe/L38zwCuhpf2Uk/Zo50kmwJKIdogDjw1VzzeL35e/meAVp1LTgqY4nn+mRauzqmqwrjzCLL3fHytz1E+upLL+Qj5W56jfXWRnroYKLtekKEFF2vSFQg9hSSe0flPPWosm/hIfoLzVl5PaPynnrRWb/w0X0F5q06XqlyM2sVYx5gmbFre/t71NY2T+0h8VbSO5SWNJUOKSAMp7jDGspmMPaLRlXS6eWve1/FRO7WYdbZm1Y/eW/R7qHxHRXGojlm3ulid6aVbaW+OALvgCLq2Hm9WxHKWqjhj6xsK1e8dm15l4niG1LZkswGsxtrPeOmsvayBJA1VItlWjptLuTdPMo7LtjRDq9naK4+WF9IrUW7BaHOljGqVHB7w2hzVoZt87d8vaNYSLl02CcRsDEbJbj71Uu7UBkvJ7/D7q2QoDxySaAO8MTXdxRVMpRp5XZOWdF/ms7R5XdyKfKWJsO/5PhrG5XlNxmEywW6bTnTxAAcJNbGSMXkM1pjgbiNo1PziPJ+Os7u7m/6ReM00ZOgxSpqYYHT3wRXMKN4ll9zUG4bQfNshu8sZVuEA2hirA4qe/VOwwrVbzbww5mI44UKRRYkbWG0S3JWctbd7u5WFfOOLHiUdJqmaipfLsIsObhWe001lMkMVvJNjhghIALMcBxCs7fxXQmkupx1bXDswGPlaTidVaEyKNXkoo4eBV+Sq7L7Vs9zcBgeyQ4GQ/MB1crmoim2orezqcowTuSeEY48jQ7oZX2PLzdyLhNd6RjrEY6I7+uspvH78vfzPAK6UAAAFGAGgAcArmu8Xvy9/M8ArTfio24RW5nnaG67uou3H/KPuqT2X8hHytz1G+upLL3enK3PUb66ys9RDBRdr0hQgou06QqEGUkntH5Tz1e238vF9BeaqKT2j8p56vbb+Xi+gvNWjTdUuRn1XTHmTh8KrJTJlt8t1CPIY44cGnpJVjTJYkmjaN9Ib4u7V923njTethRauZJV3PaW1rfLIiXEDYg6R4VYc9CXW7thfOZbKdbGZtLW8uPVY/u3GrkNUkM9zlcxUjbhfWOA90cRq4gv4LhdqN+VToNYWmnRm9NNVWNTyHc6VWBv8wt4YeHqm6xyPmroq1Z7WGFLSxTq7WLSuPSdjrkfumq5yHXDUeA92oO2SKpVumNAaoJLMXH3myp0rpJ4uKhc3tbDM5BMri1zAj79j7KTiY8TcdBpcsith0286o+sPCagEX9Pzg4zXUCp6QYse8oouCG3tk6m1BYv05W6T+IdyolxbHDAAa2OgDlNCz3ryN2WxBd5PJMg1t81eId2ukqnLlTBbfcuY+9uJLiRcvtPvHdsHK+cfRHcHDWsyawjyy0WBcDI3lTP6TeIcFV+S5OmXx9bJg1048o8Cj0V8Jq2DVu09nL80up7OxHi+oal3P8AXB/IsZS8T/YOV65zvCcc7vfzPAK3ivWCz445zeH954BXOr6I8yfSfyz+jvCLP3fHytz1G+upLP3fHytz1E+usbPaQ0UXadIUIKLtekKhB7Ckk9o/Keer22/l4/oLzVRSe0flPPV7b/y8X0F5q0abqlyM+q6Y8yQsBTDMor1o8aiaE1pbluMqS3sbLLHIhSRQyngqukhaJ9uBjo+H5aOa3ao2t34qouRlLajTalGP8v0IY8ylXQ+PKPFU/bYXOLPge6CKia0LaxTOxHu1Q7cuBd9yPEJ7TbjXKO8CajbMIF6CNIeNvJHjqIWJ7tSpYkalqVblwIdyG+RGXur0hXYJFxal+Dhq5y3slkv3Y2pD0pTr+QUClpJRUdo9XW4OLrTHtM16cZLLWkeC7y4jvlNEpcRtw1Ux27Ci448NZrTFy3nn3IQWxlgGrDZ3pza7/M8ArZo+ArF5171uvp+CqdV0R5l/psUrs2vB3hdl7vTlbnqJ9dS2Xu+PlbnqJ9dY2eshooq16QoQUXa9IVCD2FLJ7RuU89WNtmUSQqkgYMgw0accKrpPaPynnrZWG4Vi+VWmY5tnMWXG+XrIYnA0rhj0mdcTgdNdwnKDqjmduM1SRR/qlr8/4KX6pa8T/BVzDuLZXudRZblmbxXcPUNPc3KqCIwrbOzgrHEnHjoyD+3eSXkht7DeKG4umDGOJVUklfouThXfmbnZ7Cvy1vt9pmv1W1+d8FL9VteJvgq5yrcOGfLmzHN80iyyETPbptAEFo2ZG8pmUa1OFNn3Ky6W/sbDKM5hv5bx2WTZA+7RF2y52WOPJTzE+z2Dy1vt9pT/AKpacTerS/U7Tib1a04/t7kDXPY03jhN0W6sQ7K7W3q2dnrMccaDy/8At80kuZfqWYxWNtlcvUPPhiGYhWDeUy7IwYU8xPs9g8tb7faUn6pacTerTxm9oOBvVq3v9z927aynuId44LiWKNnjhAXF2UYhRg516qpsryjLr21665zFLSTaK9U2GOA87SwqY37knRU+BzOzags0s1Oyr+BKM6sxwP6tSDPLMen6vy0rvdm3Sxlu7K/S7WDDrFUDUTxgnTU826eXW7KlxmqQuwDBXUKcD+1Xee/wXuKX5XDGWLapSVcOyhEM/seJ/V+WnjeGx4pPV+Wkm6kKZlFay3Jlt7iFpYZY8ASVK6DjtDDA0f8A0Tl340/1f8Ndx8xJVWXB0KbktFFpNzdVXAC/qOwA0CQni2flrO3Vwbm5lnI2TKxbDirX/wBE5d+NcfV/wVR7xZPa5U9utvI8nWhmbbw0YEAYYAVxfhfy5rlKR4Fulu6X7mW1mzT8S4Yis/5CPlbnqJ9dSWfu9OVueon11mZvQ2i7XpChKKtekKhBlNJ7R+U89bDfGTb3a3ZX0Lcj6kdY+T2j8p560288m1kWQr6MJ+ylSAr+2cnV5renjs3H1loX+3j9XvbbtxLN9lqW4UnV5jdnjtXHxihtyZNjeSBu5J9k1BJe7xy7W5CJ/wCzuD/mTVTf2+fq97LJuLrPsNRueS7W6aJ/38x+vLVXuY+xvHaNxbf2GoCezf8A36j/APsSf8w1sLnqczTefJluYoLm5uo5F61sBshItP1cNFYe1f8A3ir/APfE/wCZUe9bB94r5jwuPsrQFhmG4l/Z2M17HdW90tuu3IkTHaCjWdIw0VVZdks9/C06yJFEp2dp+E1bbqybGTZ8vpQD7L1XRv8A7blT96Oda7tpNuuNE37Cq9KSisjyuUoxrStKllHbLlWTXsMs8chuSuwEPDqwoLe5y+YRE/gLzmqRekvKKtd4327yM/ulHxmrHJStySWVRyrjxKI2XC/CTlnlPPKTpTdFbP0L1bgrf5Lp0G3dPhQHwV0S1lzBsns3sESR8Crh9WAJGjSOKuU3E+zdZQ3oJh8IArdZXFDmOTpHa3i2+YrI2KtKy4ricBsBuHHgFXSo440+Wa2qqxjvM9uMoy+WvzWpLCWWWE28HxL6e43ojgkeSCBY1Ri5BGIUDT51cl3vm276BBqSEH4WbxV0tlkyXJcxTMb+OW6uY9mGHrCzDQwwAbTp2uKuTZ9N1uYsfRRR8WPhrm419mSSjRyiqxVK7y23B/ftuTm2oSdJyzNVw3BFn7vTlbnqF9dS2fu9OVueon11lZuQ2iLdsGFD05H2dNQGV0ntG5Tz1dWm9N1b2kVq8EVwsI2UaQaQOKhmitZGLOmk68DhSFvY+gfWNSAg7z3Qvo7yKCKIohiaNR5LKxx8qpxvjcqS0VpbxvwOAcRQPZ7D0G9Y0uz2HoH1jUCpLY7zXlpbm3eKO5QuzjrBqZji3x17PvNcyT288VvDBJbMWUovS2hslW7mFQ9nsPQPrGl2ew9A+saCod/WNxtbYsrfb17WBxx5ddD2281xC88klvDcSXEnWuzrqOGGC9zRUPZ7D0G9Y0uzWHoH1jQVCLreq6ntZbaO3it1mGy7RjTs1X2mYy20ZiCq8ZOODcdEdmsPQb1jS7PYegfWNdJuLqnQiSUlRqpFLmryxtH1Ma7Qw2gNNPOdSt0oI27p007s9h6B9Y0uz2HoH1jXX3Z+I4+1b8IJdX89xLHKQFMXQUahpxoiPN5P+onfU+A0/s9h6DesaXZ7D0D6xpG7OLbUtu0StW5JJx2bBsmbtiSiEk+cxoCWWSaVpZOk2vDVo0VYdnsPQb1jSNvZcCH1jSd2c+p1XAmFqEOmOPEfaH+BQd1ueo211IzrgFUYKNAAqI1WztCpUqVCRUqVKgFSpUqAVKlSoBUqVKgFSpUqAVKlSoBUqVKgFSpUqAVKlSoD/9k=",

        loaderText: "正在载入... ",

        loaderFont: "Arial",

        /** @override */
        listNotificationInterests: function () {
            return [
                constants.SCENE_ACTION
            ];
        },

        /** @override */
        handleNotification: function (notification) {
            switch (notification.getName()) {
                case constants.SCENE_ACTION:
                    cc.log(notification.getBody().name);
                    var viewMediator = this.facade.retrieveMediator(notification.getBody().name);
                    if (viewMediator) {
                        this.setView(viewMediator);
                    }
                    if (!this._initialized) {
                        this._initialized = true;
                    }

                    break;

            }
        },

        /** @override */
        onRegister: function () {

        },

        /** @override */
        onRemove: function () {

        },

        setView: function (viewMediator) {
            var self = this;

            self.viewComponent = new cc.Scene();

            var res = viewMediator.getResource();

            var handleSceneChanged = function () {

                viewMediator.init();
                var child = viewMediator.getViewComponent();
                if (child) {
                    self.viewComponent.addChild(child);
                }

                self.sendNotification(constants.NOTIFICATION.SCENE_CHANGED);
            }

            if (res) {
                cc.LoaderScene.preload(res, handleSceneChanged, this);
            }
            else {
                handleSceneChanged();
            }
        }
    },
    // STATIC MEMBERS
    {
        NAME: 'SceneMediator',
        SCENE_CHANGE_VIEW: 'SceneChangeView'
    }
);

},{"../../appConstants.js":"D:\\reps\\fighter\\src\\appConstants.js","puremvc":"D:\\reps\\fighter\\node_modules\\puremvc\\index.js"}],"D:\\reps\\fighter\\src\\view\\mediator\\trainMediator.js":[function(require,module,exports){
/**
 * Created by Arthur on 2014/12/20.
 */
var puremvc = require('puremvc').puremvc;
var constants = require('../../appConstants.js');

module.exports = puremvc.define(
    {
        name: 'fighter.view.mediator.TrainMediator',
        parent: puremvc.Mediator
    },

    // instance members
    {
        /** @override */
        listNotificationInterests: function() {
            return [];
        },

        /** @override */
        handleNotification: function(note) {

        },

        /** @override */
        onRegister: function() {

        },

        /** @override */
        onRemove: function() {

        },

        init: function() {
            var self = this;
            var TrainLayer = require('./../component/trainLayer.js');
            self.viewComponent = new TrainLayer();

            self.viewComponent.init();
        },

        getResource: function() {

        }

    },

    // static members
    {
        NAME: 'TrainMediator'
    }
)
},{"../../appConstants.js":"D:\\reps\\fighter\\src\\appConstants.js","./../component/trainLayer.js":"D:\\reps\\fighter\\src\\view\\component\\trainLayer.js","puremvc":"D:\\reps\\fighter\\node_modules\\puremvc\\index.js"}]},{},["D:\\reps\\fighter\\src\\app.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcQXJ0aHVyXFxBcHBEYXRhXFxSb2FtaW5nXFxucG1cXG5vZGVfbW9kdWxlc1xcd2F0Y2hpZnlcXG5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwibm9kZV9tb2R1bGVzXFxwdXJlbXZjXFxpbmRleC5qcyIsIm5vZGVfbW9kdWxlc1xccHVyZW12Y1xcbGliXFxwdXJlbXZjLTEuMC4xLm1vZHVsZS5qcyIsInNyY1xcYXBwLmpzIiwic3JjXFxhcHBDb25zdGFudHMuanMiLCJzcmNcXGFwcEZhY2FkZS5qcyIsInNyY1xcY29udHJvbGxlclxcY29tbWFuZFxcU3RhcnR1cENvbW1hbmQuanMiLCJzcmNcXGNvbnRyb2xsZXJcXGNvbW1hbmRcXGhvbWVDb21tYW5kLmpzIiwic3JjXFxjb250cm9sbGVyXFxjb21tYW5kXFxwcmVwQ29udHJvbGxlckNvbW1hbmQuanMiLCJzcmNcXGNvbnRyb2xsZXJcXGNvbW1hbmRcXHByZXBNb2RlbENvbW1hbmQuanMiLCJzcmNcXGNvbnRyb2xsZXJcXGNvbW1hbmRcXHByZXBWaWV3Q29tbWFuZC5qcyIsInNyY1xcbW9kZWxcXGVudGl0eVxcZW50aXR5LmpzIiwic3JjXFxtb2RlbFxcZW50aXR5XFxwbGF5ZXIuanMiLCJzcmNcXG1vZGVsXFxwcm94eVxccGxheWVyUHJveHkuanMiLCJzcmNcXHJlc291cmNlLmpzIiwic3JjXFx1dGlsXFxldmVudC5qcyIsInNyY1xcdmlld1xcY29tcG9uZW50XFxob21lTGF5ZXIuanMiLCJzcmNcXHZpZXdcXGNvbXBvbmVudFxcdHJhaW5MYXllci5qcyIsInNyY1xcdmlld1xcbWVkaWF0b3JcXGRpcmVjdG9yTWVkaWF0b3IuanMiLCJzcmNcXHZpZXdcXG1lZGlhdG9yXFxob21lTWVkaWF0b3IuanMiLCJzcmNcXHZpZXdcXG1lZGlhdG9yXFxzY2VuZU1lZGlhdG9yLmpzIiwic3JjXFx2aWV3XFxtZWRpYXRvclxcdHJhaW5NZWRpYXRvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdDVFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZXhwb3J0cy5wdXJlbXZjID0gcmVxdWlyZSgnLi9saWIvcHVyZW12Yy0xLjAuMS5tb2R1bGUuanMnKTtcclxuIiwiLyoqXHJcbiAqIEBmaWxlT3ZlcnZpZXdcclxuICogUHVyZU1WQyBKUyBOYXRpdmUgUG9ydCBieSBEYXZpZCBGb2xleSwgRnLDqWTDqXJpYyBTYXVuaWVyLCAmIEFsYWluIER1Y2hlc25lYXVcclxuICogQ29weXJpZ2h0KGMpIDIwMDYtMjAxMiBGdXR1cmVzY2FsZSwgSW5jLiwgU29tZSByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqIFJldXNlIGdvdmVybmVkIGJ5IENyZWF0aXZlIENvbW1vbnMgQXR0cmlidXRpb24gMy4wXHJcbiAqIGh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL2xpY2Vuc2VzL2J5LzMuMC91cy9cclxuICogQGF1dGhvciBkYXZpZC5mb2xleUBwdXJlbXZjLm9yZ1xyXG4gKi9cclxuXHJcblxyXG4vKiBpbXBsZW1lbnRhdGlvbiBiZWdpbiAqL1xyXG5cclxuXHJcbi8qKlxyXG4gKiBAYXV0aG9yIFB1cmVNVkMgSlMgTmF0aXZlIFBvcnQgYnkgRGF2aWQgRm9sZXksIEZyw6lkw6lyaWMgU2F1bmllciwgJiBBbGFpbiBEdWNoZXNuZWF1XHJcbiAqIEBhdXRob3IgQ29weXJpZ2h0KGMpIDIwMDYtMjAxMiBGdXR1cmVzY2FsZSwgSW5jLiwgU29tZSByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIEBjbGFzcyBwdXJlbXZjLk9ic2VydmVyXHJcbiAqXHJcbiAqIEEgYmFzZSBPYnNlcnZlciBpbXBsZW1lbnRhdGlvbi5cclxuICpcclxuICogQW4gT2JzZXJ2ZXIgaXMgYW4gb2JqZWN0IHRoYXQgZW5jYXBzdWxhdGVzIGluZm9ybWF0aW9uXHJcbiAqIGFib3V0IGFuIGludGVyZXN0ZWQgb2JqZWN0IHdpdGggYSBtZXRob2QgdGhhdCBzaG91bGRcclxuICogYmUgY2FsbGVkIHdoZW4gYSBwYXJ0aWN1bGFyIE5vdGlmaWNhdGlvbiBpcyBicm9hZGNhc3QuXHJcbiAqXHJcbiAqIEluIFB1cmVNVkMsIHRoZSBPYnNlcnZlciBjbGFzcyBhc3N1bWVzIHRoZXNlIHJlc3BvbnNpYmlsaXRpZXM6XHJcbiAqXHJcbiAqIC0gRW5jYXBzdWxhdGUgdGhlIG5vdGlmaWNhdGlvbiAoY2FsbGJhY2spIG1ldGhvZCBvZiB0aGUgaW50ZXJlc3RlZCBvYmplY3QuXHJcbiAqIC0gRW5jYXBzdWxhdGUgdGhlIG5vdGlmaWNhdGlvbiBjb250ZXh0ICh0aGlzKSBvZiB0aGUgaW50ZXJlc3RlZCBvYmplY3QuXHJcbiAqIC0gUHJvdmlkZSBtZXRob2RzIGZvciBzZXR0aW5nIHRoZSBub3RpZmljYXRpb24gbWV0aG9kIGFuZCBjb250ZXh0LlxyXG4gKiAtIFByb3ZpZGUgYSBtZXRob2QgZm9yIG5vdGlmeWluZyB0aGUgaW50ZXJlc3RlZCBvYmplY3QuXHJcbiAqXHJcbiAqXHJcbiAqIFRoZSBub3RpZmljYXRpb24gbWV0aG9kIG9uIHRoZSBpbnRlcmVzdGVkIG9iamVjdCBzaG91bGQgdGFrZVxyXG4gKiBvbmUgcGFyYW1ldGVyIG9mIHR5cGUgTm90aWZpY2F0aW9uLlxyXG4gKlxyXG4gKlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBub3RpZnlNZXRob2RcclxuICogIHRoZSBub3RpZmljYXRpb24gbWV0aG9kIG9mIHRoZSBpbnRlcmVzdGVkIG9iamVjdFxyXG4gKiBAcGFyYW0ge09iamVjdH0gbm90aWZ5Q29udGV4dFxyXG4gKiAgdGhlIG5vdGlmaWNhdGlvbiBjb250ZXh0IG9mIHRoZSBpbnRlcmVzdGVkIG9iamVjdFxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIE9ic2VydmVyIChub3RpZnlNZXRob2QsIG5vdGlmeUNvbnRleHQpXHJcbntcclxuICAgIHRoaXMuc2V0Tm90aWZ5TWV0aG9kKG5vdGlmeU1ldGhvZCk7XHJcbiAgICB0aGlzLnNldE5vdGlmeUNvbnRleHQobm90aWZ5Q29udGV4dCk7XHJcbn07XHJcblxyXG4vKipcclxuICogU2V0IHRoZSBPYnNlcnZlcnMgbm90aWZpY2F0aW9uIG1ldGhvZC5cclxuICpcclxuICogVGhlIG5vdGlmaWNhdGlvbiBtZXRob2Qgc2hvdWxkIHRha2Ugb25lIHBhcmFtZXRlciBvZiB0eXBlIE5vdGlmaWNhdGlvblxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBub3RpZnlNZXRob2RcclxuICogIHRoZSBub3RpZmljYXRpb24gKGNhbGxiYWNrKSBtZXRob2Qgb2YgdGhlIGludGVyZXN0ZWQgb2JqZWN0LlxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuT2JzZXJ2ZXIucHJvdG90eXBlLnNldE5vdGlmeU1ldGhvZD0gZnVuY3Rpb24gKG5vdGlmeU1ldGhvZClcclxue1xyXG4gICAgdGhpcy5ub3RpZnk9IG5vdGlmeU1ldGhvZDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIE9ic2VydmVycyBub3RpZmljYXRpb24gY29udGV4dC5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IG5vdGlmeUNvbnRleHRcclxuICogIHRoZSBub3RpZmljYXRpb24gY29udGV4dCAodGhpcykgb2YgdGhlIGludGVyZXN0ZWQgb2JqZWN0LlxyXG4gKlxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuT2JzZXJ2ZXIucHJvdG90eXBlLnNldE5vdGlmeUNvbnRleHQ9IGZ1bmN0aW9uIChub3RpZnlDb250ZXh0KVxyXG57XHJcbiAgICB0aGlzLmNvbnRleHQ9IG5vdGlmeUNvbnRleHQ7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBGdW5jdGlvbiB0aGF0IHRoaXMgT2JzZXJ2ZXIgd2lsbCBpbnZva2Ugd2hlbiBpdCBpcyBub3RpZmllZC5cclxuICpcclxuICogQHByaXZhdGVcclxuICogQHJldHVybiB7RnVuY3Rpb259XHJcbiAqL1xyXG5PYnNlcnZlci5wcm90b3R5cGUuZ2V0Tm90aWZ5TWV0aG9kPSBmdW5jdGlvbiAoKVxyXG57XHJcbiAgICByZXR1cm4gdGhpcy5ub3RpZnk7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBPYmplY3QgdGhhdCB3aWxsIHNlcnZlIGFzIHRoZSBPYnNlcnZlcnMgY2FsbGJhY2sgZXhlY3V0aW9uIGNvbnRleHRcclxuICpcclxuICogQHByaXZhdGVcclxuICogQHJldHVybiB7T2JqZWN0fVxyXG4gKi9cclxuT2JzZXJ2ZXIucHJvdG90eXBlLmdldE5vdGlmeUNvbnRleHQ9IGZ1bmN0aW9uICgpXHJcbntcclxuICAgIHJldHVybiB0aGlzLmNvbnRleHQ7XHJcbn07XHJcblxyXG4vKipcclxuICogTm90aWZ5IHRoZSBpbnRlcmVzdGVkIG9iamVjdC5cclxuICpcclxuICogQHBhcmFtIHtwdXJlbXZjLk5vdGlmaWNhdGlvbn0gbm90aWZpY2F0aW9uXHJcbiAqICBUaGUgTm90aWZpY2F0aW9uIHRvIHBhc3MgdG8gdGhlIGludGVyZXN0ZWQgb2JqZWN0cyBub3RpZmljYXRpb24gbWV0aG9kXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5PYnNlcnZlci5wcm90b3R5cGUubm90aWZ5T2JzZXJ2ZXI9IGZ1bmN0aW9uIChub3RpZmljYXRpb24pXHJcbntcclxuICAgIHRoaXMuZ2V0Tm90aWZ5TWV0aG9kKCkuY2FsbCh0aGlzLmdldE5vdGlmeUNvbnRleHQoKSwgbm90aWZpY2F0aW9uKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDb21wYXJlIGFuIG9iamVjdCB0byB0aGlzIE9ic2VydmVycyBub3RpZmljYXRpb24gY29udGV4dC5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdFxyXG4gKlxyXG4gKiBAcmV0dXJuIHtib29sZWFufVxyXG4gKi9cclxuT2JzZXJ2ZXIucHJvdG90eXBlLmNvbXBhcmVOb3RpZnlDb250ZXh0PSBmdW5jdGlvbiAob2JqZWN0KVxyXG57XHJcbiAgICByZXR1cm4gb2JqZWN0ID09PSB0aGlzLmNvbnRleHQ7XHJcbn07XHJcblxyXG4vKipcclxuICogVGhlIE9ic2VydmVycyBjYWxsYmFjayBGdW5jdGlvblxyXG4gKlxyXG4gKiBAcHJpdmF0ZVxyXG4gKiBAdHlwZSB7RnVuY3Rpb259XHJcbiAqL1xyXG5PYnNlcnZlci5wcm90b3R5cGUubm90aWZ5PSBudWxsO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBPYnNlcnZlcnMgY2FsbGJhY2sgT2JqZWN0XHJcbiAqIEBwcml2YXRlXHJcbiAqIEB0eXBlIHtPYmplY3R9XHJcbiAqL1xyXG5PYnNlcnZlci5wcm90b3R5cGUuY29udGV4dD0gbnVsbDtcclxuLyoqXHJcbiAqIEBhdXRob3IgUHVyZU1WQyBKUyBOYXRpdmUgUG9ydCBieSBEYXZpZCBGb2xleSwgRnLDqWTDqXJpYyBTYXVuaWVyLCAmIEFsYWluIER1Y2hlc25lYXVcclxuICogQGF1dGhvciBDb3B5cmlnaHQoYykgMjAwNi0yMDEyIEZ1dHVyZXNjYWxlLCBJbmMuLCBTb21lIHJpZ2h0cyByZXNlcnZlZC5cclxuICpcclxuICogQGNsYXNzIHB1cmVtdmMuTm90aWZpY2F0aW9uXHJcbiAqXHJcbiAqIEEgYmFzZSBOb3RpZmljYXRpb24gaW1wbGVtZW50YXRpb24uXHJcbiAqXHJcbiAqIFB1cmVNVkMgZG9lcyBub3QgcmVseSB1cG9uIHVuZGVybHlpbmcgZXZlbnQgbW9kZWxzIHN1Y2ggYXMgdGhlIG9uZSBwcm92aWRlZFxyXG4gKiB3aXRoIHRoZSBET00gb3Igb3RoZXIgYnJvd3NlciBjZW50cmljIFczQyBldmVudCBtb2RlbHMuXHJcbiAqXHJcbiAqIFRoZSBPYnNlcnZlciBQYXR0ZXJuIGFzIGltcGxlbWVudGVkIHdpdGhpbiBQdXJlTVZDIGV4aXN0cyB0byBzdXBwb3J0XHJcbiAqIGV2ZW50LWRyaXZlbiBjb21tdW5pY2F0aW9uIGJldHdlZW4gdGhlIGFwcGxpY2F0aW9uIGFuZCB0aGUgYWN0b3JzIG9mIHRoZSBNVkNcclxuICogdHJpYWQuXHJcbiAqXHJcbiAqIE5vdGlmaWNhdGlvbnMgYXJlIG5vdCBtZWFudCB0byBiZSBhIHJlcGxhY2VtZW50IGZvciBldmVudHMgaW4gdGhlIGJyb3dzZXIuXHJcbiAqIEdlbmVyYWxseSwgTWVkaWF0b3IgaW1wbGVtZW50b3JzIHBsYWNlIGV2ZW50IGxpc3RlbmVycyBvbiB0aGVpciB2aWV3XHJcbiAqIGNvbXBvbmVudHMsIHdoaWNoIHRoZXkgdGhlbiBoYW5kbGUgaW4gdGhlIHVzdWFsIHdheS4gVGhpcyBtYXkgbGVhZCB0byB0aGVcclxuICogYnJvYWRjYXN0IG9mIE5vdGlmaWNhdGlvbnMgdG8gdHJpZ2dlciBjb21tYW5kcyBvciB0byBjb21tdW5pY2F0ZSB3aXRoIG90aGVyXHJcbiAqIE1lZGlhdG9ycy4ge0BsaW5rIHB1cmVtdmMuUHJveHkgUHJveHl9LFxyXG4gKiB7QGxpbmsgcHVyZW12Yy5TaW1wbGVDb21tYW5kIFNpbXBsZUNvbW1hbmR9XHJcbiAqIGFuZCB7QGxpbmsgcHVyZW12Yy5NYWNyb0NvbW1hbmQgTWFjcm9Db21tYW5kfVxyXG4gKiBpbnN0YW5jZXMgY29tbXVuaWNhdGUgd2l0aCBlYWNoIG90aGVyIGFuZFxyXG4gKiB7QGxpbmsgcHVyZW12Yy5NZWRpYXRvciBNZWRpYXRvcn1zXHJcbiAqIGJ5IGJyb2FkY2FzdGluZyBOb3RpZmljYXRpb25zLlxyXG4gKlxyXG4gKiBBIGtleSBkaWZmZXJlbmNlIGJldHdlZW4gYnJvd3NlciBldmVudHMgYW5kIFB1cmVNVkMgTm90aWZpY2F0aW9ucyBpcyB0aGF0XHJcbiAqIGV2ZW50cyBmb2xsb3cgdGhlICdDaGFpbiBvZiBSZXNwb25zaWJpbGl0eScgcGF0dGVybiwgJ2J1YmJsaW5nJyB1cCB0aGVcclxuICogZGlzcGxheSBoaWVyYXJjaHkgdW50aWwgc29tZSBwYXJlbnQgY29tcG9uZW50IGhhbmRsZXMgdGhlIGV2ZW50LCB3aGlsZVxyXG4gKiBQdXJlTVZDIE5vdGlmaWNhdGlvbiBmb2xsb3cgYSAnUHVibGlzaC9TdWJzY3JpYmUnIHBhdHRlcm4uIFB1cmVNVkMgY2xhc3Nlc1xyXG4gKiBuZWVkIG5vdCBiZSByZWxhdGVkIHRvIGVhY2ggb3RoZXIgaW4gYSBwYXJlbnQvY2hpbGQgcmVsYXRpb25zaGlwIGluIG9yZGVyIHRvXHJcbiAqIGNvbW11bmljYXRlIHdpdGggb25lIGFub3RoZXIgdXNpbmcgTm90aWZpY2F0aW9ucy5cclxuICpcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAqICBUaGUgTm90aWZpY2F0aW9uIG5hbWVcclxuICogQHBhcmFtIHtPYmplY3R9IFtib2R5XVxyXG4gKiAgVGhlIE5vdGlmaWNhdGlvbiBib2R5XHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBbdHlwZV1cclxuICogIFRoZSBOb3RpZmljYXRpb24gdHlwZVxyXG4gKi9cclxuZnVuY3Rpb24gTm90aWZpY2F0aW9uKG5hbWUsIGJvZHksIHR5cGUpXHJcbntcclxuICAgIHRoaXMubmFtZT0gbmFtZTtcclxuICAgIHRoaXMuYm9keT0gYm9keTtcclxuICAgIHRoaXMudHlwZT0gdHlwZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIG5hbWUgb2YgdGhlIE5vdGlmaWNhdGlvbiBpbnN0YW5jZVxyXG4gKlxyXG4gKiBAcmV0dXJuIHtzdHJpbmd9XHJcbiAqICBUaGUgbmFtZSBvZiB0aGUgTm90aWZpY2F0aW9uIGluc3RhbmNlXHJcbiAqL1xyXG5Ob3RpZmljYXRpb24ucHJvdG90eXBlLmdldE5hbWU9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgcmV0dXJuIHRoaXMubmFtZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhpcyBOb3RpZmljYXRpb25zIGJvZHkuXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBib2R5XHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5Ob3RpZmljYXRpb24ucHJvdG90eXBlLnNldEJvZHk9IGZ1bmN0aW9uKGJvZHkpXHJcbntcclxuICAgIHRoaXMuYm9keT0gYm9keTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIE5vdGlmaWNhdGlvbiBib2R5LlxyXG4gKlxyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqL1xyXG5Ob3RpZmljYXRpb24ucHJvdG90eXBlLmdldEJvZHk9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgcmV0dXJuIHRoaXMuYm9keVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNldCB0aGUgdHlwZSBvZiB0aGUgTm90aWZpY2F0aW9uIGluc3RhbmNlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gdHlwZVxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuTm90aWZpY2F0aW9uLnByb3RvdHlwZS5zZXRUeXBlPSBmdW5jdGlvbih0eXBlKVxyXG57XHJcbiAgICB0aGlzLnR5cGU9IHR5cGU7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0IHRoZSB0eXBlIG9mIHRoZSBOb3RpZmljYXRpb24gaW5zdGFuY2UuXHJcbiAqXHJcbiAqIEByZXR1cm4ge09iamVjdH1cclxuICovXHJcbk5vdGlmaWNhdGlvbi5wcm90b3R5cGUuZ2V0VHlwZT0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICByZXR1cm4gdGhpcy50eXBlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldCBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgTm90aWZpY2F0aW9uIGluc3RhbmNlXHJcbiAqXHJcbiAqIEByZXR1cm4ge3N0cmluZ31cclxuICovXHJcbk5vdGlmaWNhdGlvbi5wcm90b3R5cGUudG9TdHJpbmc9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgdmFyIG1zZz0gXCJOb3RpZmljYXRpb24gTmFtZTogXCIgKyB0aGlzLmdldE5hbWUoKTtcclxuICAgIG1zZys9IFwiXFxuQm9keTpcIiArICgodGhpcy5ib2R5ID09IG51bGwgKSA/IFwibnVsbFwiIDogdGhpcy5ib2R5LnRvU3RyaW5nKCkpO1xyXG4gICAgbXNnKz0gXCJcXG5UeXBlOlwiICsgKCh0aGlzLnR5cGUgPT0gbnVsbCApID8gXCJudWxsXCIgOiB0aGlzLnR5cGUpO1xyXG4gICAgcmV0dXJuIG1zZztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgTm90aWZpY2F0aW9ucyBuYW1lLlxyXG4gKlxyXG4gKiBAdHlwZSB7c3RyaW5nfVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuTm90aWZpY2F0aW9uLnByb3RvdHlwZS5uYW1lPSBudWxsO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBOb3RpZmljYXRpb25zIHR5cGUuXHJcbiAqXHJcbiAqIEB0eXBlIHtzdHJpbmd9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5Ob3RpZmljYXRpb24ucHJvdG90eXBlLnR5cGU9IG51bGw7XHJcblxyXG4vKipcclxuICogVGhlIE5vdGlmaWNhdGlvbnMgYm9keS5cclxuICpcclxuICogQHR5cGUge09iamVjdH1cclxuICogQHByaXZhdGVcclxuICovXHJcbk5vdGlmaWNhdGlvbi5wcm90b3R5cGUuYm9keT0gbnVsbDtcclxuLyoqXHJcbiAqIEBhdXRob3IgUHVyZU1WQyBKUyBOYXRpdmUgUG9ydCBieSBEYXZpZCBGb2xleSwgRnLDqWTDqXJpYyBTYXVuaWVyLCAmIEFsYWluIER1Y2hlc25lYXVcclxuICogQGF1dGhvciBDb3B5cmlnaHQoYykgMjAwNi0yMDEyIEZ1dHVyZXNjYWxlLCBJbmMuLCBTb21lIHJpZ2h0cyByZXNlcnZlZC5cclxuICpcclxuICogQGNsYXNzIHB1cmVtdmMuTm90aWZpZXJcclxuICpcclxuICogQSBCYXNlIE5vdGlmaWVyIGltcGxlbWVudGF0aW9uLlxyXG4gKlxyXG4gKiB7QGxpbmsgcHVyZW12Yy5NYWNyb0NvbW1hbmQgTWFjcm9Db21tYW5kfSxcclxuICoge0BsaW5rIHB1cmVtdmMuU2ltcGxlQ29tbWFuZCBTaW1wbGVDb21tYW5kfSxcclxuICoge0BsaW5rIHB1cmVtdmMuTWVkaWF0b3IgTWVkaWF0b3J9IGFuZFxyXG4gKiB7QGxpbmsgcHVyZW12Yy5Qcm94eSBQcm94eX1cclxuICogYWxsIGhhdmUgYSBuZWVkIHRvIHNlbmQgTm90aWZpY2F0aW9uc1xyXG4gKlxyXG4gKiBUaGUgTm90aWZpZXIgaW50ZXJmYWNlIHByb3ZpZGVzIGEgY29tbW9uIG1ldGhvZCBjYWxsZWQgI3NlbmROb3RpZmljYXRpb24gdGhhdFxyXG4gKiByZWxpZXZlcyBpbXBsZW1lbnRhdGlvbiBjb2RlIG9mIHRoZSBuZWNlc3NpdHkgdG8gYWN0dWFsbHkgY29uc3RydWN0XHJcbiAqIE5vdGlmaWNhdGlvbnMuXHJcbiAqXHJcbiAqIFRoZSBOb3RpZmllciBjbGFzcywgd2hpY2ggYWxsIG9mIHRoZSBhYm92ZSBtZW50aW9uZWQgY2xhc3Nlc1xyXG4gKiBleHRlbmQsIHByb3ZpZGVzIGFuIGluaXRpYWxpemVkIHJlZmVyZW5jZSB0byB0aGVcclxuICoge0BsaW5rIHB1cmVtdmMuRmFjYWRlIEZhY2FkZX1cclxuICogTXVsdGl0b24sIHdoaWNoIGlzIHJlcXVpcmVkIGZvciB0aGUgY29udmllbmllbmNlIG1ldGhvZFxyXG4gKiBmb3Igc2VuZGluZyBOb3RpZmljYXRpb25zIGJ1dCBhbHNvIGVhc2VzIGltcGxlbWVudGF0aW9uIGFzIHRoZXNlXHJcbiAqIGNsYXNzZXMgaGF2ZSBmcmVxdWVudFxyXG4gKiB7QGxpbmsgcHVyZW12Yy5GYWNhZGUgRmFjYWRlfSBpbnRlcmFjdGlvbnNcclxuICogYW5kIHVzdWFsbHkgcmVxdWlyZSBhY2Nlc3MgdG8gdGhlIGZhY2FkZSBhbnl3YXkuXHJcbiAqXHJcbiAqIE5PVEU6IEluIHRoZSBNdWx0aUNvcmUgdmVyc2lvbiBvZiB0aGUgZnJhbWV3b3JrLCB0aGVyZSBpcyBvbmUgY2F2ZWF0IHRvXHJcbiAqIG5vdGlmaWVycywgdGhleSBjYW5ub3Qgc2VuZCBub3RpZmljYXRpb25zIG9yIHJlYWNoIHRoZSBmYWNhZGUgdW50aWwgdGhleVxyXG4gKiBoYXZlIGEgdmFsaWQgbXVsdGl0b25LZXkuXHJcbiAqXHJcbiAqIFRoZSBtdWx0aXRvbktleSBpcyBzZXQ6XHJcbiAqICAgLSBvbiBhIENvbW1hbmQgd2hlbiBpdCBpcyBleGVjdXRlZCBieSB0aGUgQ29udHJvbGxlclxyXG4gKiAgIC0gb24gYSBNZWRpYXRvciBpcyByZWdpc3RlcmVkIHdpdGggdGhlIFZpZXdcclxuICogICAtIG9uIGEgUHJveHkgaXMgcmVnaXN0ZXJlZCB3aXRoIHRoZSBNb2RlbC5cclxuICpcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBOb3RpZmllcigpXHJcbntcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYW5kIHNlbmQgYSBOb3RpZmljYXRpb24uXHJcbiAqXHJcbiAqIEtlZXBzIHVzIGZyb20gaGF2aW5nIHRvIGNvbnN0cnVjdCBuZXcgTm90aWZpY2F0aW9uIGluc3RhbmNlcyBpbiBvdXJcclxuICogaW1wbGVtZW50YXRpb24gY29kZS5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG5vdGlmaWNhdGlvbk5hbWVcclxuICogIEEgbm90aWZpY2F0aW9uIG5hbWVcclxuICogQHBhcmFtIHtPYmplY3R9IFtib2R5XVxyXG4gKiAgVGhlIGJvZHkgb2YgdGhlIG5vdGlmaWNhdGlvblxyXG4gKiBAcGFyYW0ge3N0cmluZ30gW3R5cGVdXHJcbiAqICBUaGUgbm90aWZpY2F0aW9uIHR5cGVcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbk5vdGlmaWVyLnByb3RvdHlwZS5zZW5kTm90aWZpY2F0aW9uID0gZnVuY3Rpb24obm90aWZpY2F0aW9uTmFtZSwgYm9keSwgdHlwZSlcclxue1xyXG4gICAgdmFyIGZhY2FkZSA9IHRoaXMuZ2V0RmFjYWRlKCk7XHJcbiAgICBpZihmYWNhZGUpXHJcbiAgICB7XHJcbiAgICAgICAgZmFjYWRlLnNlbmROb3RpZmljYXRpb24obm90aWZpY2F0aW9uTmFtZSwgYm9keSwgdHlwZSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQSByZWZlcmVuY2UgdG8gdGhpcyBOb3RpZmllcidzIEZhY2FkZS4gVGhpcyByZWZlcmVuY2Ugd2lsbCBub3QgYmUgYXZhaWxhYmxlXHJcbiAqIHVudGlsICNpbml0aWFsaXplTm90aWZpZXIgaGFzIGJlZW4gY2FsbGVkLlxyXG4gKlxyXG4gKiBAdHlwZSB7cHVyZW12Yy5GYWNhZGV9XHJcbiAqL1xyXG5Ob3RpZmllci5wcm90b3R5cGUuZmFjYWRlO1xyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemUgdGhpcyBOb3RpZmllciBpbnN0YW5jZS5cclxuICpcclxuICogVGhpcyBpcyBob3cgYSBOb3RpZmllciBnZXRzIGl0cyBtdWx0aXRvbktleS5cclxuICogQ2FsbHMgdG8gI3NlbmROb3RpZmljYXRpb24gb3IgdG8gYWNjZXNzIHRoZVxyXG4gKiBmYWNhZGUgd2lsbCBmYWlsIHVudGlsIGFmdGVyIHRoaXMgbWV0aG9kXHJcbiAqIGhhcyBiZWVuIGNhbGxlZC5cclxuICpcclxuICogTWVkaWF0b3JzLCBDb21tYW5kcyBvciBQcm94aWVzIG1heSBvdmVycmlkZVxyXG4gKiB0aGlzIG1ldGhvZCBpbiBvcmRlciB0byBzZW5kIG5vdGlmaWNhdGlvbnNcclxuICogb3IgYWNjZXNzIHRoZSBNdWx0aXRvbiBGYWNhZGUgaW5zdGFuY2UgYXNcclxuICogc29vbiBhcyBwb3NzaWJsZS4gVGhleSBDQU5OT1QgYWNjZXNzIHRoZSBmYWNhZGVcclxuICogaW4gdGhlaXIgY29uc3RydWN0b3JzLCBzaW5jZSB0aGlzIG1ldGhvZCB3aWxsIG5vdFxyXG4gKiB5ZXQgaGF2ZSBiZWVuIGNhbGxlZC5cclxuICpcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IGtleVxyXG4gKiAgVGhlIE5vdGlmaWVycyBtdWx0aXRvbiBrZXk7XHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5Ob3RpZmllci5wcm90b3R5cGUuaW5pdGlhbGl6ZU5vdGlmaWVyID0gZnVuY3Rpb24oa2V5KVxyXG57XHJcbiAgICB0aGlzLm11bHRpdG9uS2V5ID0gU3RyaW5nKGtleSk7XHJcbiAgICB0aGlzLmZhY2FkZT0gdGhpcy5nZXRGYWNhZGUoKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXRyaWV2ZSB0aGUgTXVsdGl0b24gRmFjYWRlIGluc3RhbmNlXHJcbiAqXHJcbiAqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQHJldHVybiB7cHVyZW12Yy5GYWNhZGV9XHJcbiAqL1xyXG5Ob3RpZmllci5wcm90b3R5cGUuZ2V0RmFjYWRlID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICBpZih0aGlzLm11bHRpdG9uS2V5ID09IG51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKE5vdGlmaWVyLk1VTFRJVE9OX01TRyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBGYWNhZGUuZ2V0SW5zdGFuY2UodGhpcy5tdWx0aXRvbktleSk7XHJcbn07XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKiBUaGUgTm90aWZpZXJzIGludGVybmFsIG11bHRpdG9uIGtleS5cclxuICpcclxuICogQHByb3RlY3RlZFxyXG4gKiBAdHlwZSBzdHJpbmdcclxuICovXHJcbk5vdGlmaWVyLnByb3RvdHlwZS5tdWx0aXRvbktleSA9IG51bGw7XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKiBUaGUgZXJyb3IgbWVzc2FnZSB1c2VkIGlmIHRoZSBOb3RpZmllciBpcyBub3QgaW5pdGlhbGl6ZWQgY29ycmVjdGx5IGFuZFxyXG4gKiBhdHRlbXB0cyB0byByZXRyaWV2ZSBpdHMgb3duIG11bHRpdG9uIGtleVxyXG4gKlxyXG4gKiBAc3RhdGljXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQGNvbnN0XHJcbiAqIEB0eXBlIHN0cmluZ1xyXG4gKi9cclxuTm90aWZpZXIuTVVMVElUT05fTVNHID0gXCJtdWx0aXRvbktleSBmb3IgdGhpcyBOb3RpZmllciBub3QgeWV0IGluaXRpYWxpemVkIVwiO1xyXG4vKipcclxuICogQGF1dGhvciBQdXJlTVZDIEpTIE5hdGl2ZSBQb3J0IGJ5IERhdmlkIEZvbGV5LCBGcsOpZMOpcmljIFNhdW5pZXIsICYgQWxhaW4gRHVjaGVzbmVhdVxyXG4gKiBAYXV0aG9yIENvcHlyaWdodChjKSAyMDA2LTIwMTIgRnV0dXJlc2NhbGUsIEluYy4sIFNvbWUgcmlnaHRzIHJlc2VydmVkLlxyXG4gKlxyXG4gKiBAY2xhc3MgcHVyZW12Yy5TaW1wbGVDb21tYW5kXHJcbiAqIEBleHRlbmRzIHB1cmVtdmMuTm90aWZpZXJcclxuICpcclxuICogU2ltcGxlQ29tbWFuZHMgZW5jYXBzdWxhdGUgdGhlIGJ1c2luZXNzIGxvZ2ljIG9mIHlvdXIgYXBwbGljYXRpb24uIFlvdXJcclxuICogc3ViY2xhc3Mgc2hvdWxkIG92ZXJyaWRlIHRoZSAjZXhlY3V0ZSBtZXRob2Qgd2hlcmUgeW91ciBidXNpbmVzcyBsb2dpYyB3aWxsXHJcbiAqIGhhbmRsZSB0aGVcclxuICoge0BsaW5rIHB1cmVtdmMuTm90aWZpY2F0aW9uIE5vdGlmaWNhdGlvbn1cclxuICpcclxuICogVGFrZSBhIGxvb2sgYXRcclxuICoge0BsaW5rIHB1cmVtdmMuRmFjYWRlI3JlZ2lzdGVyQ29tbWFuZCBGYWNhZGUncyByZWdpc3RlckNvbW1hbmR9XHJcbiAqIG9yIHtAbGluayBwdXJlbXZjLkNvbnRyb2xsZXIjcmVnaXN0ZXJDb21tYW5kIENvbnRyb2xsZXJzIHJlZ2lzdGVyQ29tbWFuZH1cclxuICogbWV0aG9kcyB0byBzZWUgaG93IHRvIGFkZCBjb21tYW5kcyB0byB5b3VyIGFwcGxpY2F0aW9uLlxyXG4gKlxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIFNpbXBsZUNvbW1hbmQgKCkgeyB9O1xyXG5cclxuU2ltcGxlQ29tbWFuZC5wcm90b3R5cGU9IG5ldyBOb3RpZmllcjtcclxuU2ltcGxlQ29tbWFuZC5wcm90b3R5cGUuY29uc3RydWN0b3I9IFNpbXBsZUNvbW1hbmQ7XHJcblxyXG4vKipcclxuICogRnVsZmlsbCB0aGUgdXNlLWNhc2UgaW5pdGlhdGVkIGJ5IHRoZSBnaXZlbiBOb3RpZmljYXRpb25cclxuICpcclxuICogSW4gdGhlIENvbW1hbmQgUGF0dGVybiwgYW4gYXBwbGljYXRpb24gdXNlLWNhc2UgdHlwaWNhbGx5IGJlZ2lucyB3aXRoIHNvbWVcclxuICogdXNlciBhY3Rpb24sIHdoaWNoIHJlc3VsdHMgaW4gYSBOb3RpZmljYXRpb24gaXMgaGFuZGxlZCBieSB0aGUgYnVzaW5lc3MgbG9naWNcclxuICogaW4gdGhlICNleGVjdXRlIG1ldGhvZCBvZiBhIGNvbW1hbmQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7cHVyZW12Yy5Ob3RpZmljYXRpb259IG5vdGlmaWNhdGlvblxyXG4gKiAgVGhlIG5vdGlmaWNhdGlvbiB0byBoYW5kbGUuXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5TaW1wbGVDb21tYW5kLnByb3RvdHlwZS5leGVjdXRlPSBmdW5jdGlvbiAobm90aWZpY2F0aW9uKSB7IH07XHJcbi8qKlxyXG4gKiBAYXV0aG9yIFB1cmVNVkMgSlMgTmF0aXZlIFBvcnQgYnkgRGF2aWQgRm9sZXksIEZyw6lkw6lyaWMgU2F1bmllciwgJiBBbGFpbiBEdWNoZXNuZWF1XHJcbiAqIEBhdXRob3IgQ29weXJpZ2h0KGMpIDIwMDYtMjAxMiBGdXR1cmVzY2FsZSwgSW5jLiwgU29tZSByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIEBjbGFzcyBwdXJlbXZjLk1hY3JvQ29tbWFuZFxyXG4gKiBAZXh0ZW5kcyBwdXJlbXZjLk5vdGlmaWVyXHJcbiAqXHJcbiAqIEEgYmFzZSBjb21tYW5kIGltcGxlbWVudGF0aW9uIHRoYXQgZXhlY3V0ZXMgb3RoZXIgY29tbWFuZHMsIHN1Y2ggYXNcclxuICoge0BsaW5rIHB1cmVtdmMuU2ltcGxlQ29tbWFuZCBTaW1wbGVDb21tYW5kfVxyXG4gKiBvciB7QGxpbmsgcHVyZW12Yy5NYWNyb0NvbW1hbmQgTWFjcm9Db21tYW5kfVxyXG4gKiBzdWJjbGFzc2VzLlxyXG4gKlxyXG4gKiBBIE1hY3JvQ29tbWFuZCBtYWludGFpbnMgYW4gbGlzdCBvZlxyXG4gKiBjb21tYW5kIGNvbnN0cnVjdG9yIHJlZmVyZW5jZXMgY2FsbGVkICpTdWJDb21tYW5kcyouXHJcbiAqXHJcbiAqIFdoZW4gI2V4ZWN1dGUgaXMgY2FsbGVkLCB0aGUgTWFjcm9Db21tYW5kXHJcbiAqIGluc3RhbnRpYXRlcyBhbmQgY2FsbHMgI2V4ZWN1dGUgb24gZWFjaCBvZiBpdHMgKlN1YkNvbW1hbmRzKiBpbiB0dXJuLlxyXG4gKiBFYWNoICpTdWJDb21tYW5kKiB3aWxsIGJlIHBhc3NlZCBhIHJlZmVyZW5jZSB0byB0aGUgb3JpZ2luYWxcclxuICoge0BsaW5rIHB1cmVtdmMuTm90aWZpY2F0aW9uIE5vdGlmaWNhdGlvbn1cclxuICogdGhhdCB3YXMgcGFzc2VkIHRvIHRoZSBNYWNyb0NvbW1hbmRzICNleGVjdXRlIG1ldGhvZFxyXG4gKlxyXG4gKiBVbmxpa2Uge0BsaW5rIHB1cmVtdmMuU2ltcGxlQ29tbWFuZCBTaW1wbGVDb21tYW5kfSxcclxuICogeW91ciBzdWJjbGFzcyBzaG91bGQgbm90IG92ZXJyaWRlICNleGVjdXRlIGJ1dCBpbnN0ZWFkLCBzaG91bGRcclxuICogb3ZlcnJpZGUgdGhlICNpbml0aWFsaXplTWFjcm9Db21tYW5kIG1ldGhvZCwgY2FsbGluZyAjYWRkU3ViQ29tbWFuZCBvbmNlIGZvclxyXG4gKiBlYWNoICpTdWJDb21tYW5kKiB0byBiZSBleGVjdXRlZC5cclxuICpcclxuICogSWYgeW91ciBzdWJjbGFzcyBkb2VzIGRlZmluZSBhIGNvbnN0cnVjdG9yLCBiZSBzdXJlIHRvIGNhbGwgXCJzdXBlclwiIGxpa2Ugc29cclxuICpcclxuICogICAgIGZ1bmN0aW9uIE15TWFjcm9Db21tYW5kICgpXHJcbiAqICAgICB7XHJcbiAqICAgICAgICAgTWFjcm9Db21tYW5kLmNhbGwodGhpcyk7XHJcbiAqICAgICB9O1xyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIE1hY3JvQ29tbWFuZCgpXHJcbntcclxuICAgIHRoaXMuc3ViQ29tbWFuZHM9IFtdO1xyXG4gICAgdGhpcy5pbml0aWFsaXplTWFjcm9Db21tYW5kKCk7XHJcbn07XHJcblxyXG4vKiBzdWJjbGFzcyBOb3RpZmllciAqL1xyXG5NYWNyb0NvbW1hbmQucHJvdG90eXBlPSBuZXcgTm90aWZpZXI7XHJcbk1hY3JvQ29tbWFuZC5wcm90b3R5cGUuY29uc3RydWN0b3I9IE1hY3JvQ29tbWFuZDtcclxuXHJcbi8qKlxyXG4gKiBAcHJpdmF0ZVxyXG4gKiBAdHlwZSB7QXJyYXkuPHB1cmVtdmMuU2ltcGxlQ29tbWFuZHxwdXJlbXZjLk1hY3JvQ29tbWFuZD59XHJcbiAqL1xyXG5NYWNyb0NvbW1hbmQucHJvdG90eXBlLnN1YkNvbW1hbmRzPSBudWxsO1xyXG5cclxuLyoqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogSW5pdGlhbGl6ZSB0aGUgTWFjcm9Db21tYW5kLlxyXG4gKlxyXG4gKiBJbiB5b3VyIHN1YmNsYXNzLCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0b1xyXG4gKiBpbml0aWFsaXplIHRoZSBNYWNyb0NvbW1hbmQncyAqU3ViQ29tbWFuZCpcclxuICogbGlzdCB3aXRoIGNvbW1hbmQgY2xhc3MgcmVmZXJlbmNlcyBsaWtlXHJcbiAqIHRoaXM6XHJcbiAqXHJcbiAqICAgICAvLyBJbml0aWFsaXplIE15TWFjcm9Db21tYW5kXHJcbiAqICAgICBNeU1hY3JvQ29tbWFuZC5wcm90b3R5cGUuaW5pdGlhbGl6ZU1hY3JvQ29tbWFuZD0gZnVuY3Rpb24gKClcclxuICogICAgIHtcclxuICogICAgICAgICB0aGlzLmFkZFN1YkNvbW1hbmQoIGNvbS5tZS5teWFwcC5jb250cm9sbGVyLkZpcnN0Q29tbWFuZCApO1xyXG4gKiAgICAgICAgIHRoaXMuYWRkU3ViQ29tbWFuZCggY29tLm1lLm15YXBwLmNvbnRyb2xsZXIuU2Vjb25kQ29tbWFuZCApO1xyXG4gKiAgICAgICAgIHRoaXMuYWRkU3ViQ29tbWFuZCggY29tLm1lLm15YXBwLmNvbnRyb2xsZXIuVGhpcmRDb21tYW5kICk7XHJcbiAqICAgICB9O1xyXG4gKlxyXG4gKiBOb3RlIHRoYXQgKlN1YkNvbW1hbmQqcyBtYXkgYmUgYW55IGNvbW1hbmQgaW1wbGVtZW50b3IsXHJcbiAqIE1hY3JvQ29tbWFuZHMgb3IgU2ltcGxlQ29tbWFuZHMgYXJlIGJvdGggYWNjZXB0YWJsZS5cclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbk1hY3JvQ29tbWFuZC5wcm90b3R5cGUuaW5pdGlhbGl6ZU1hY3JvQ29tbWFuZD0gZnVuY3Rpb24oKSB7fVxyXG5cclxuLyoqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQWRkIGEgKlN1YkNvbW1hbmQqXHJcbiAqXHJcbiAqIFRoZSAqU3ViQ29tbWFuZCpzIHdpbGwgYmUgY2FsbGVkIGluIEZpcnN0IEluIC8gRmlyc3QgT3V0IChGSUZPKSBvcmRlclxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb21tYW5kQ2xhc3NSZWZcclxuICogIEEgcmVmZXJlbmNlIHRvIGEgc3ViY2xhc3NlZCBTaW1wbGVDb21tYW5kIG9yIE1hY3JvQ29tbWFuZCBjb25zdHJ1Y3RvclxyXG4gKi9cclxuTWFjcm9Db21tYW5kLnByb3RvdHlwZS5hZGRTdWJDb21tYW5kPSBmdW5jdGlvbihjb21tYW5kQ2xhc3NSZWYpXHJcbntcclxuICAgIHRoaXMuc3ViQ29tbWFuZHMucHVzaChjb21tYW5kQ2xhc3NSZWYpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEV4ZWN1dGUgdGhpcyBNYWNyb0NvbW1hbmRzICpTdWJDb21tYW5kcypcclxuICpcclxuICogVGhlICpTdWJDb21tYW5kKnMgd2lsbCBiZSBjYWxsZWQgaW4gRmlyc3QgSW4gLyBGaXJzdCBPdXQgKEZJRk8pIG9yZGVyXHJcbiAqIEBwYXJhbSB7cHVyZW12Yy5Ob3RpZmljYXRpb259IG5vdGVcclxuICogIFRoZSBOb3RpZmljYXRpb24gb2JqZWN0IHRvIGJlIHBhc3NlZCB0byBlYWNoICpTdWJDb21tYW5kKlxyXG4gKi9cclxuTWFjcm9Db21tYW5kLnByb3RvdHlwZS5leGVjdXRlPSBmdW5jdGlvbihub3RlKVxyXG57XHJcbiAgICAvLyBTSUMtIFRPRE8gb3B0aW1pemVcclxuICAgIHdoaWxlKHRoaXMuc3ViQ29tbWFuZHMubGVuZ3RoID4gMClcclxuICAgIHtcclxuICAgICAgICB2YXIgcmVmPSB0aGlzLnN1YkNvbW1hbmRzLnNoaWZ0KCk7XHJcbiAgICAgICAgdmFyIGNtZD0gbmV3IHJlZjtcclxuICAgICAgICBjbWQuaW5pdGlhbGl6ZU5vdGlmaWVyKHRoaXMubXVsdGl0b25LZXkpO1xyXG4gICAgICAgIGNtZC5leGVjdXRlKG5vdGUpO1xyXG4gICAgfVxyXG59O1xyXG4vKipcclxuICogQGF1dGhvciBQdXJlTVZDIEpTIE5hdGl2ZSBQb3J0IGJ5IERhdmlkIEZvbGV5LCBGcsOpZMOpcmljIFNhdW5pZXIsICYgQWxhaW4gRHVjaGVzbmVhdVxyXG4gKiBAYXV0aG9yIENvcHlyaWdodChjKSAyMDA2LTIwMTIgRnV0dXJlc2NhbGUsIEluYy4sIFNvbWUgcmlnaHRzIHJlc2VydmVkLlxyXG4gKlxyXG4gKiBAY2xhc3MgcHVyZW12Yy5NZWRpYXRvclxyXG4gKiBAZXh0ZW5kcyBwdXJlbXZjLk5vdGlmaWVyXHJcbiAqXHJcbiAqIEEgYmFzZSBNZWRpYXRvciBpbXBsZW1lbnRhdGlvbi5cclxuICpcclxuICogSW4gUHVyZU1WQywgTWVkaWF0b3IgY2xhc3NlcyBhcmUgdXNlZCB0byBtZWRpYXRlIGNvbW11bmljYXRpb24gYmV0d2VlbiBhIHZpZXdcclxuICogY29tcG9uZW50IGFuZCB0aGUgcmVzdCBvZiB0aGUgYXBwbGljYXRpb24uXHJcbiAqXHJcbiAqIEEgTWVkaWF0b3Igc2hvdWxkIGxpc3RlbiB0byBpdHMgdmlldyBjb21wb25lbnRzIGZvciBldmVudHMsIGFuZCBoYW5kbGUgdGhlbVxyXG4gKiBieSBzZW5kaW5nIG5vdGlmaWNhdGlvbnMgKHRvIGJlIGhhbmRsZWQgYnkgb3RoZXIgTWVkaWF0b3JzLFxyXG4gKiB7QGxpbmsgcHVyZW12Yy5TaW1wbGVDb21tYW5kIFNpbXBsZUNvbW1hbmRzfVxyXG4gKiBvclxyXG4gKiB7QGxpbmsgcHVyZW12Yy5NYWNyb0NvbW1hbmQgTWFjcm9Db21tYW5kc30pXHJcbiAqIG9yIHBhc3NpbmcgZGF0YSBmcm9tIHRoZSB2aWV3IGNvbXBvbmVudCBkaXJlY3RseSB0byBhXHJcbiAqIHtAbGluayBwdXJlbXZjLlByb3h5IFByb3h5fSwgc3VjaCBhcyBzdWJtaXR0aW5nXHJcbiAqIHRoZSBjb250ZW50cyBvZiBhIGZvcm0gdG8gYSBzZXJ2aWNlLlxyXG4gKlxyXG4gKiBNZWRpYXRvcnMgc2hvdWxkIG5vdCBwZXJmb3JtIGJ1c2luZXNzIGxvZ2ljLCBtYWludGFpbiBzdGF0ZSBvciBvdGhlclxyXG4gKiBpbmZvcm1hdGlvbiBmb3IgaXRzIHZpZXcgY29tcG9uZW50LCBvciBicmVhayB0aGUgZW5jYXBzdWxhdGlvbiBvZiB0aGUgdmlld1xyXG4gKiBjb21wb25lbnQgYnkgbWFuaXB1bGF0aW5nIHRoZSB2aWV3IGNvbXBvbmVudCdzIGNoaWxkcmVuLiBJdCBzaG91bGQgb25seSBjYWxsXHJcbiAqIG1ldGhvZHMgb3Igc2V0IHByb3BlcnRpZXMgb24gdGhlIHZpZXcgY29tcG9uZW50LlxyXG4gKlxyXG4gKiBUaGUgdmlldyBjb21wb25lbnQgc2hvdWxkIGVuY2Fwc3VsYXRlIGl0cyBvd24gYmVoYXZpb3IgYW5kIGltcGxlbWVudGF0aW9uIGJ5XHJcbiAqIGV4cG9zaW5nIG1ldGhvZHMgYW5kIHByb3BlcnRpZXMgdGhhdCB0aGUgTWVkaWF0b3IgY2FuIGNhbGwgd2l0aG91dCBoYXZpbmcgdG9cclxuICoga25vdyBhYm91dCB0aGUgdmlldyBjb21wb25lbnQncyBjaGlsZHJlbi5cclxuICpcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbbWVkaWF0b3JOYW1lXVxyXG4gKiAgVGhlIE1lZGlhdG9ycyBuYW1lLiBUaGUgTWVkaWF0b3JzIHN0YXRpYyAjTkFNRSB2YWx1ZSBpcyB1c2VkIGJ5IGRlZmF1bHRcclxuICogQHBhcmFtIHtPYmplY3R9IFt2aWV3Q29tcG9uZW50XVxyXG4gKiAgVGhlIE1lZGlhdG9ycyB7QGxpbmsgI3NldFZpZXdDb21wb25lbnQgdmlld0NvbXBvbmVudH0uXHJcbiAqL1xyXG5mdW5jdGlvbiBNZWRpYXRvciAobWVkaWF0b3JOYW1lLCB2aWV3Q29tcG9uZW50KVxyXG57XHJcbiAgICB0aGlzLm1lZGlhdG9yTmFtZT0gbWVkaWF0b3JOYW1lIHx8IHRoaXMuY29uc3RydWN0b3IuTkFNRTtcclxuICAgIHRoaXMudmlld0NvbXBvbmVudD12aWV3Q29tcG9uZW50O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBzdGF0aWNcclxuICogVGhlIG5hbWUgb2YgdGhlIE1lZGlhdG9yLlxyXG4gKlxyXG4gKiBUeXBpY2FsbHksIGEgTWVkaWF0b3Igd2lsbCBiZSB3cml0dGVuIHRvIHNlcnZlIG9uZSBzcGVjaWZpYyBjb250cm9sIG9yIGdyb3VwXHJcbiAqIG9mIGNvbnRyb2xzIGFuZCBzbywgd2lsbCBub3QgaGF2ZSBhIG5lZWQgdG8gYmUgZHluYW1pY2FsbHkgbmFtZWQuXHJcbiAqXHJcbiAqIEB0eXBlIHtzdHJpbmd9XHJcbiAqL1xyXG5NZWRpYXRvci5OQU1FPSBcIk1lZGlhdG9yXCI7XHJcblxyXG4vKiBzdWJjbGFzcyAqL1xyXG5NZWRpYXRvci5wcm90b3R5cGU9IG5ldyBOb3RpZmllcjtcclxuTWVkaWF0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yPSBNZWRpYXRvcjtcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIG5hbWUgb2YgdGhlIE1lZGlhdG9yXHJcbiAqXHJcbiAqIEByZXR1cm4ge3N0cmluZ31cclxuICogIFRoZSBNZWRpYXRvciBuYW1lXHJcbiAqL1xyXG5NZWRpYXRvci5wcm90b3R5cGUuZ2V0TWVkaWF0b3JOYW1lPSBmdW5jdGlvbiAoKVxyXG57XHJcbiAgICByZXR1cm4gdGhpcy5tZWRpYXRvck5hbWU7XHJcbn07XHJcblxyXG4vKipcclxuICogU2V0IHRoZSBNZWRpYXRvcnMgdmlldyBjb21wb25lbnQuIFRoaXMgY291bGRcclxuICogYmUgYSBIVE1MRWxlbWVudCwgYSBiZXNwb2tlIFVpQ29tcG9uZW50IHdyYXBwZXJcclxuICogY2xhc3MsIGEgTW9vVG9vbHMgRWxlbWVudCwgYSBqUXVlcnkgcmVzdWx0IG9yIGFcclxuICogY3NzIHNlbGVjdG9yLCBkZXBlbmRpbmcgb24gd2hpY2ggRE9NIGFic3RyYWN0aW9uXHJcbiAqIGxpYnJhcnkgeW91IGFyZSB1c2luZy5cclxuICpcclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IHRoZSB2aWV3IGNvbXBvbmVudFxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuTWVkaWF0b3IucHJvdG90eXBlLnNldFZpZXdDb21wb25lbnQ9IGZ1bmN0aW9uICh2aWV3Q29tcG9uZW50KVxyXG57XHJcbiAgICB0aGlzLnZpZXdDb21wb25lbnQ9IHZpZXdDb21wb25lbnQ7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBNZWRpYXRvcnMgdmlldyBjb21wb25lbnQuXHJcbiAqXHJcbiAqIEFkZGl0aW9uYWxseSwgYW4gb3B0aW9uYWwgZXhwbGljaXQgZ2V0dGVyIGNhbiBiZVxyXG4gKiBiZSBkZWZpbmVkIGluIHRoZSBzdWJjbGFzcyB0aGF0IGRlZmluZXMgdGhlXHJcbiAqIHZpZXcgY29tcG9uZW50cywgcHJvdmlkaW5nIGEgbW9yZSBzZW1hbnRpYyBpbnRlcmZhY2VcclxuICogdG8gdGhlIE1lZGlhdG9yLlxyXG4gKlxyXG4gKiBUaGlzIGlzIGRpZmZlcmVudCBmcm9tIHRoZSBBUzMgaW1wbGVtZW50YXRpb24gaW5cclxuICogdGhlIHNlbnNlIHRoYXQgbm8gY2FzdGluZyBpcyByZXF1aXJlZCBmcm9tIHRoZVxyXG4gKiBvYmplY3Qgc3VwcGxpZWQgYXMgdGhlIHZpZXcgY29tcG9uZW50LlxyXG4gKlxyXG4gKiAgICAgTXlNZWRpYXRvci5wcm90b3R5cGUuZ2V0Q29tYm9Cb3g9IGZ1bmN0aW9uICgpXHJcbiAqICAgICB7XHJcbiAqICAgICAgICAgcmV0dXJuIHRoaXMudmlld0NvbXBvbmVudDsgIFxyXG4gKiAgICAgfVxyXG4gKlxyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqICBUaGUgdmlldyBjb21wb25lbnRcclxuICovXHJcbk1lZGlhdG9yLnByb3RvdHlwZS5nZXRWaWV3Q29tcG9uZW50PSBmdW5jdGlvbiAoKVxyXG57XHJcbiAgICByZXR1cm4gdGhpcy52aWV3Q29tcG9uZW50O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIExpc3QgdGhlIE5vdGlmaWNhdGlvbiBuYW1lcyB0aGlzIE1lZGlhdG9yIGlzIGludGVyZXN0ZWRcclxuICogaW4gYmVpbmcgbm90aWZpZWQgb2YuXHJcbiAqXHJcbiAqIEByZXR1cm4ge0FycmF5fVxyXG4gKiAgVGhlIGxpc3Qgb2YgTm90aWZpY2F0aW9uIG5hbWVzLlxyXG4gKi9cclxuTWVkaWF0b3IucHJvdG90eXBlLmxpc3ROb3RpZmljYXRpb25JbnRlcmVzdHM9IGZ1bmN0aW9uICgpXHJcbntcclxuICAgIHJldHVybiBbXTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBIYW5kbGUgTm90aWZpY2F0aW9ucy5cclxuICpcclxuICogVHlwaWNhbGx5IHRoaXMgd2lsbCBiZSBoYW5kbGVkIGluIGEgc3dpdGNoIHN0YXRlbWVudFxyXG4gKiB3aXRoIG9uZSAnY2FzZScgZW50cnkgcGVyIE5vdGlmaWNhdGlvbiB0aGUgTWVkaWF0b3JcclxuICogaXMgaW50ZXJlc3RlZCBpblxyXG4gKlxyXG4gKiBAcGFyYW0ge3B1cmVtdmMuTm90aWZpY2F0aW9ufSBub3RpZmljYXRpb25cclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbk1lZGlhdG9yLnByb3RvdHlwZS5oYW5kbGVOb3RpZmljYXRpb249IGZ1bmN0aW9uIChub3RpZmljYXRpb24pXHJcbntcclxuICAgIHJldHVybjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDYWxsZWQgYnkgdGhlIFZpZXcgd2hlbiB0aGUgTWVkaWF0b3IgaXMgcmVnaXN0ZXJlZFxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuTWVkaWF0b3IucHJvdG90eXBlLm9uUmVnaXN0ZXI9IGZ1bmN0aW9uICgpXHJcbntcclxuICAgIHJldHVybjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDYWxsZWQgYnkgdGhlIFZpZXcgd2hlbiB0aGUgTWVkaWF0b3IgaXMgcmVtb3ZlZFxyXG4gKi9cclxuTWVkaWF0b3IucHJvdG90eXBlLm9uUmVtb3ZlPSBmdW5jdGlvbiAoKVxyXG57XHJcbiAgICByZXR1cm47XHJcbn07XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKiBUaGUgTWVkaWF0b3JzIG5hbWUuIFNob3VsZCBvbmx5IGJlIGFjY2Vzc2VkIGJ5IE1lZGlhdG9yIHN1YmNsYXNzZXMuXHJcbiAqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQHR5cGUgc3RyaW5nXHJcbiAqL1xyXG5NZWRpYXRvci5wcm90b3R5cGUubWVkaWF0b3JOYW1lPSBudWxsO1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICogVGhlIE1lZGlhdG9ycyB2aWV3Q29tcG9uZW50LiBTaG91bGQgb25seSBiZSBhY2Nlc3NlZCBieSBNZWRpYXRvciBzdWJjbGFzc2VzLlxyXG4gKlxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEB0eXBlIE9iamVjdFxyXG4gKi9cclxuTWVkaWF0b3IucHJvdG90eXBlLnZpZXdDb21wb25lbnQ9bnVsbDtcclxuLyoqXHJcbiAqIEBhdXRob3IgUHVyZU1WQyBKUyBOYXRpdmUgUG9ydCBieSBEYXZpZCBGb2xleSwgRnLDqWTDqXJpYyBTYXVuaWVyLCAmIEFsYWluIER1Y2hlc25lYXVcclxuICogQGF1dGhvciBDb3B5cmlnaHQoYykgMjAwNi0yMDEyIEZ1dHVyZXNjYWxlLCBJbmMuLCBTb21lIHJpZ2h0cyByZXNlcnZlZC5cclxuICpcclxuICogQGNsYXNzIHB1cmVtdmMuUHJveHlcclxuICogQGV4dGVuZHMgcHVyZW12Yy5Ob3RpZmllclxyXG4gKlxyXG4gKiBBIGJhc2UgUHJveHkgaW1wbGVtZW50YXRpb24uXHJcbiAqXHJcbiAqIEluIFB1cmVNVkMsIFByb3h5IGNsYXNzZXMgYXJlIHVzZWQgdG8gbWFuYWdlIHBhcnRzIG9mIHRoZSBhcHBsaWNhdGlvbidzIGRhdGFcclxuICogbW9kZWwuXHJcbiAqXHJcbiAqIEEgUHJveHkgbWlnaHQgc2ltcGx5IG1hbmFnZSBhIHJlZmVyZW5jZSB0byBhIGxvY2FsIGRhdGEgb2JqZWN0LCBpbiB3aGljaCBjYXNlXHJcbiAqIGludGVyYWN0aW5nIHdpdGggaXQgbWlnaHQgaW52b2x2ZSBzZXR0aW5nIGFuZCBnZXR0aW5nIG9mIGl0cyBkYXRhIGluXHJcbiAqIHN5bmNocm9ub3VzIGZhc2hpb24uXHJcbiAqXHJcbiAqIFByb3h5IGNsYXNzZXMgYXJlIGFsc28gdXNlZCB0byBlbmNhcHN1bGF0ZSB0aGUgYXBwbGljYXRpb24ncyBpbnRlcmFjdGlvbiB3aXRoXHJcbiAqIHJlbW90ZSBzZXJ2aWNlcyB0byBzYXZlIG9yIHJldHJpZXZlIGRhdGEsIGluIHdoaWNoIGNhc2UsIHdlIGFkb3B0IGFuXHJcbiAqIGFzeW5jcm9ub3VzIGlkaW9tOyBzZXR0aW5nIGRhdGEgKG9yIGNhbGxpbmcgYSBtZXRob2QpIG9uIHRoZSBQcm94eSBhbmRcclxuICogbGlzdGVuaW5nIGZvciBhXHJcbiAqIHtAbGluayBwdXJlbXZjLk5vdGlmaWNhdGlvbiBOb3RpZmljYXRpb259XHJcbiAqIHRvIGJlIHNlbnQgIHdoZW4gdGhlIFByb3h5IGhhcyByZXRyaWV2ZWQgdGhlIGRhdGEgZnJvbSB0aGUgc2VydmljZS5cclxuICpcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IFtwcm94eU5hbWVdXHJcbiAqICBUaGUgUHJveHkncyBuYW1lLiBJZiBub25lIGlzIHByb3ZpZGVkLCB0aGUgUHJveHkgd2lsbCB1c2UgaXRzIGNvbnN0cnVjdG9yc1xyXG4gKiAgTkFNRSBwcm9wZXJ0eS5cclxuICogQHBhcmFtIHtPYmplY3R9IFtkYXRhXVxyXG4gKiAgVGhlIFByb3h5J3MgZGF0YSBvYmplY3RcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBQcm94eShwcm94eU5hbWUsIGRhdGEpXHJcbntcclxuICAgIHRoaXMucHJveHlOYW1lPSBwcm94eU5hbWUgfHwgdGhpcy5jb25zdHJ1Y3Rvci5OQU1FO1xyXG4gICAgaWYoZGF0YSAhPSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YShkYXRhKTtcclxuICAgIH1cclxufTtcclxuXHJcblxyXG5Qcm94eS5OQU1FPSBcIlByb3h5XCI7XHJcblxyXG5Qcm94eS5wcm90b3R5cGU9IG5ldyBOb3RpZmllcjtcclxuUHJveHkucHJvdG90eXBlLmNvbnN0cnVjdG9yPSBQcm94eTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIFByb3h5J3MgbmFtZS5cclxuICpcclxuICogQHJldHVybiB7c3RyaW5nfVxyXG4gKi9cclxuUHJveHkucHJvdG90eXBlLmdldFByb3h5TmFtZT0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICByZXR1cm4gdGhpcy5wcm94eU5hbWU7XHJcbn07XHJcblxyXG4vKipcclxuICogU2V0IHRoZSBQcm94eSdzIGRhdGEgb2JqZWN0XHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5Qcm94eS5wcm90b3R5cGUuc2V0RGF0YT0gZnVuY3Rpb24oZGF0YSlcclxue1xyXG4gICAgdGhpcy5kYXRhPSBkYXRhO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgUHJveHkncyBkYXRhIG9iamVjdFxyXG4gKlxyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqL1xyXG5Qcm94eS5wcm90b3R5cGUuZ2V0RGF0YT0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENhbGxlZCBieSB0aGUge0BsaW5rIHB1cmVtdmMuTW9kZWwgTW9kZWx9IHdoZW5cclxuICogdGhlIFByb3h5IGlzIHJlZ2lzdGVyZWQuXHJcbiAqXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5Qcm94eS5wcm90b3R5cGUub25SZWdpc3Rlcj0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICByZXR1cm47XHJcbn07XHJcblxyXG4vKipcclxuICogQ2FsbGVkIGJ5IHRoZSB7QGxpbmsgcHVyZW12Yy5Nb2RlbCBNb2RlbH0gd2hlblxyXG4gKiB0aGUgUHJveHkgaXMgcmVtb3ZlZC5cclxuICpcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcblByb3h5LnByb3RvdHlwZS5vblJlbW92ZT0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICByZXR1cm47XHJcbn07XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKiBUaGUgUHJveHlzIG5hbWUuXHJcbiAqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQHR5cGUgU3RyaW5nXHJcbiAqL1xyXG5Qcm94eS5wcm90b3R5cGUucHJveHlOYW1lPSBudWxsO1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICogVGhlIFByb3h5J3MgZGF0YSBvYmplY3QuXHJcbiAqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQHR5cGUgT2JqZWN0XHJcbiAqL1xyXG5Qcm94eS5wcm90b3R5cGUuZGF0YT0gbnVsbDtcclxuLyoqXHJcbiAqIEBhdXRob3IgUHVyZU1WQyBKUyBOYXRpdmUgUG9ydCBieSBEYXZpZCBGb2xleSwgRnLDqWTDqXJpYyBTYXVuaWVyLCAmIEFsYWluIER1Y2hlc25lYXVcclxuICogQGF1dGhvciBDb3B5cmlnaHQoYykgMjAwNi0yMDEyIEZ1dHVyZXNjYWxlLCBJbmMuLCBTb21lIHJpZ2h0cyByZXNlcnZlZC5cclxuICpcclxuICogQGNsYXNzIHB1cmVtdmMuRmFjYWRlXHJcbiAqIEZhY2FkZSBleHBvc2VzIHRoZSBmdW5jdGlvbmFsaXR5IG9mIHRoZSBDb250cm9sbGVyLCBNb2RlbCBhbmQgVmlld1xyXG4gKiBhY3RvcnMgdG8gY2xpZW50IGZhY2luZyBjb2RlLlxyXG4gKlxyXG4gKiBUaGlzIEZhY2FkZSBpbXBsZW1lbnRhdGlvbiBpcyBhIE11bHRpdG9uLCBzbyB5b3Ugc2hvdWxkIG5vdCBjYWxsIHRoZVxyXG4gKiBjb25zdHJ1Y3RvciBkaXJlY3RseSwgYnV0IGluc3RlYWQgY2FsbCB0aGUgc3RhdGljIEZhY3RvcnkgbWV0aG9kLFxyXG4gKiBwYXNzaW5nIHRoZSB1bmlxdWUga2V5IGZvciB0aGlzIGluc3RhbmNlIHRvICNnZXRJbnN0YW5jZVxyXG4gKlxyXG4gKiBAY29uc3RydWN0b3JcclxuICogQHBhcmFtIHtzdHJpbmd9IGtleVxyXG4gKiBcdFRoZSBtdWx0aXRvbiBrZXkgdG8gdXNlIHRvIHJldHJpZXZlIHRoZSBGYWNhZGUgaW5zdGFuY2UuXHJcbiAqIEB0aHJvd3Mge0Vycm9yfVxyXG4gKiAgSWYgYW4gYXR0ZW1wdCBpcyBtYWRlIHRvIGluc3RhbnRpYXRlIEZhY2FkZSBkaXJlY3RseVxyXG4gKi9cclxuZnVuY3Rpb24gRmFjYWRlKGtleSlcclxue1xyXG4gICAgaWYoRmFjYWRlLmluc3RhbmNlTWFwW2tleV0gIT0gbnVsbClcclxuICAgIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRmFjYWRlLk1VTFRJVE9OX01TRyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5pbml0aWFsaXplTm90aWZpZXIoa2V5KTtcclxuICAgIEZhY2FkZS5pbnN0YW5jZU1hcFtrZXldID0gdGhpcztcclxuICAgIHRoaXMuaW5pdGlhbGl6ZUZhY2FkZSgpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemUgdGhlIE11bHRpdG9uIEZhY2FkZSBpbnN0YW5jZS5cclxuICpcclxuICogQ2FsbGVkIGF1dG9tYXRpY2FsbHkgYnkgdGhlIGNvbnN0cnVjdG9yLiBPdmVycmlkZSBpbiB5b3VyIHN1YmNsYXNzIHRvIGFueVxyXG4gKiBzdWJjbGFzcyBzcGVjaWZpYyBpbml0aWFsaXphdGlvbnMuIEJlIHN1cmUgdG8gY2FsbCB0aGUgJ3N1cGVyJ1xyXG4gKiBpbml0aWFsaXplRmFjYWRlIG1ldGhvZCwgdGhvdWdoXHJcbiAqXHJcbiAqICAgICBNeUZhY2FkZS5wcm90b3R5cGUuaW5pdGlhbGl6ZUZhY2FkZT0gZnVuY3Rpb24gKClcclxuICogICAgIHtcclxuICogICAgICAgICBGYWNhZGUuY2FsbCh0aGlzKTtcclxuICogICAgIH07XHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbkZhY2FkZS5wcm90b3R5cGUuaW5pdGlhbGl6ZUZhY2FkZSA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgdGhpcy5pbml0aWFsaXplTW9kZWwoKTtcclxuICAgIHRoaXMuaW5pdGlhbGl6ZUNvbnRyb2xsZXIoKTtcclxuICAgIHRoaXMuaW5pdGlhbGl6ZVZpZXcoKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBGYWNhZGUgTXVsdGl0b24gRmFjdG9yeSBtZXRob2QuXHJcbiAqIE5vdGUgdGhhdCB0aGlzIG1ldGhvZCB3aWxsIHJldHVybiBudWxsIGlmIHN1cHBsaWVkIGFcclxuICogbnVsbCBvciB1bmRlZmluZWQgbXVsdGl0b24ga2V5LlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5XHJcbiAqIFx0VGhlIG11bHRpdG9uIGtleSB1c2UgdG8gcmV0cmlldmUgYSBwYXJ0aWN1bGFyIEZhY2FkZSBpbnN0YW5jZVxyXG4gKiBAcmV0dXJuIHtwdXJlbXZjLkZhY2FkZX1cclxuICovXHJcbkZhY2FkZS5nZXRJbnN0YW5jZSA9IGZ1bmN0aW9uKGtleSlcclxue1xyXG4gICAgaWYgKG51bGwgPT0ga2V5KVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG5cclxuICAgIGlmKEZhY2FkZS5pbnN0YW5jZU1hcFtrZXldID09IG51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgRmFjYWRlLmluc3RhbmNlTWFwW2tleV0gPSBuZXcgRmFjYWRlKGtleSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIEZhY2FkZS5pbnN0YW5jZU1hcFtrZXldO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemUgdGhlIHtAbGluayBwdXJlbXZjLkNvbnRyb2xsZXIgQ29udHJvbGxlcn0uXHJcbiAqXHJcbiAqIENhbGxlZCBieSB0aGUgI2luaXRpYWxpemVGYWNhZGUgbWV0aG9kLlxyXG4gKlxyXG4gKiBPdmVycmlkZSB0aGlzIG1ldGhvZCBpbiB5b3VyIHN1YmNsYXNzIG9mIEZhY2FkZVxyXG4gKiBpZiBvbmUgb3IgYm90aCBvZiB0aGUgZm9sbG93aW5nIGFyZSB0cnVlOlxyXG4gKiAtIFlvdSB3aXNoIHRvIGluaXRpYWxpemUgYSBkaWZmZXJlbnQgQ29udHJvbGxlclxyXG4gKiAtIFlvdSBoYXZlXHJcbiAqIHtAbGluayBwdXJlbXZjLlNpbXBsZUNvbW1hbmQgU2ltcGxlQ29tbWFuZH1zXHJcbiAqIG9yIHtAbGluayBwdXJlbXZjLk1hY3JvQ29tbWFuZCBNYWNyb0NvbW1hbmR9c1xyXG4gKiB0byByZWdpc3RlciB3aXRoIHRoZSBDb250cm9sbGVyYXQgc3RhcnR1cC5cclxuICpcclxuICogSWYgeW91IGRvbid0IHdhbnQgdG8gaW5pdGlhbGl6ZSBhIGRpZmZlcmVudCBDb250cm9sbGVyLFxyXG4gKiBjYWxsIHRoZSAnc3VwZXInIGluaXRpYWxpemVDb250cm9sbGUgbWV0aG9kIGF0IHRoZSBiZWdpbm5pbmcgb2YgeW91clxyXG4gKiBtZXRob2QsIHRoZW4gcmVnaXN0ZXIgY29tbWFuZHMuXHJcbiAqXHJcbiAqICAgICBNeUZhY2FkZS5wcm90b3R5cGUuaW5pdGlhbGl6ZUNvbnRyb2xsZXI9IGZ1bmN0aW9uICgpXHJcbiAqICAgICB7XHJcbiAqICAgICAgICAgRmFjYWRlLnByb3RvdHlwZS5pbml0aWFsaXplQ29udHJvbGxlci5jYWxsKHRoaXMpO1xyXG4gKiAgICAgICAgIHRoaXMucmVnaXN0ZXJDb21tYW5kKEFwcENvbnN0YW50cy5BX05PVEVfTkFNRSwgQUJlc3Bva2VDb21tYW5kKVxyXG4gKiAgICAgfVxyXG4gKlxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5GYWNhZGUucHJvdG90eXBlLmluaXRpYWxpemVDb250cm9sbGVyID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICBpZih0aGlzLmNvbnRyb2xsZXIgIT0gbnVsbClcclxuICAgICAgICByZXR1cm47XHJcblxyXG4gICAgdGhpcy5jb250cm9sbGVyID0gQ29udHJvbGxlci5nZXRJbnN0YW5jZSh0aGlzLm11bHRpdG9uS2V5KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEluaXRpYWxpemUgdGhlIHtAbGluayBwdXJlbXZjLk1vZGVsIE1vZGVsfTtcclxuICpcclxuICogQ2FsbGVkIGJ5IHRoZSAjaW5pdGlhbGl6ZUZhY2FkZSBtZXRob2QuXHJcbiAqIE92ZXJyaWRlIHRoaXMgbWV0aG9kIGluIHlvdXIgc3ViY2xhc3Mgb2YgRmFjYWRlIGlmIG9uZSBvZiB0aGUgZm9sbG93aW5nIGFyZVxyXG4gKiB0cnVlOlxyXG4gKlxyXG4gKiAtIFlvdSB3aXNoIHRvIGluaXRpYWxpemUgYSBkaWZmZXJlbnQgTW9kZWwuXHJcbiAqXHJcbiAqIC0gWW91IGhhdmUge0BsaW5rIHB1cmVtdmMuUHJveHkgUHJveHl9cyB0b1xyXG4gKiAgIHJlZ2lzdGVyIHdpdGggdGhlIE1vZGVsIHRoYXQgZG8gbm90IHJldHJpZXZlIGEgcmVmZXJlbmNlIHRvIHRoZSBGYWNhZGUgYXRcclxuICogICBjb25zdHJ1Y3Rpb24gdGltZS5cclxuICpcclxuICogSWYgeW91IGRvbid0IHdhbnQgdG8gaW5pdGlhbGl6ZSBhIGRpZmZlcmVudCBNb2RlbFxyXG4gKiBjYWxsICdzdXBlcicgI2luaXRpYWxpemVNb2RlbCBhdCB0aGUgYmVnaW5uaW5nIG9mIHlvdXIgbWV0aG9kLCB0aGVuIHJlZ2lzdGVyXHJcbiAqIFByb3h5cy5cclxuICpcclxuICogTm90ZTogVGhpcyBtZXRob2QgaXMgKnJhcmVseSogb3ZlcnJpZGRlbjsgaW4gcHJhY3RpY2UgeW91IGFyZSBtb3JlXHJcbiAqIGxpa2VseSB0byB1c2UgYSBjb21tYW5kIHRvIGNyZWF0ZSBhbmQgcmVnaXN0ZXJQcm94eXMgd2l0aCB0aGUgTW9kZWw+LFxyXG4gKiBzaW5jZSBQcm94eXMgd2l0aCBtdXRhYmxlIGRhdGEgd2lsbCBsaWtlbHlcclxuICogbmVlZCB0byBzZW5kIE5vdGlmaWNhdGlvbnMgYW5kIHRodXMgd2lsbCBsaWtlbHkgd2FudCB0byBmZXRjaCBhIHJlZmVyZW5jZSB0b1xyXG4gKiB0aGUgRmFjYWRlIGR1cmluZyB0aGVpciBjb25zdHJ1Y3Rpb24uXHJcbiAqXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5GYWNhZGUucHJvdG90eXBlLmluaXRpYWxpemVNb2RlbCA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgaWYodGhpcy5tb2RlbCAhPSBudWxsKVxyXG4gICAgICAgIHJldHVybjtcclxuXHJcbiAgICB0aGlzLm1vZGVsID0gTW9kZWwuZ2V0SW5zdGFuY2UodGhpcy5tdWx0aXRvbktleSk7XHJcbn07XHJcblxyXG4vKipcclxuICogQHByb3RlY3RlZFxyXG4gKlxyXG4gKiBJbml0aWFsaXplIHRoZSB7QGxpbmsgcHVyZW12Yy5WaWV3IFZpZXd9LlxyXG4gKlxyXG4gKiBDYWxsZWQgYnkgdGhlICNpbml0aWFsaXplRmFjYWRlIG1ldGhvZC5cclxuICpcclxuICogT3ZlcnJpZGUgdGhpcyBtZXRob2QgaW4geW91ciBzdWJjbGFzcyBvZiBGYWNhZGUgaWYgb25lIG9yIGJvdGggb2YgdGhlXHJcbiAqIGZvbGxvd2luZyBhcmUgdHJ1ZTpcclxuICpcclxuICogLSBZb3Ugd2lzaCB0byBpbml0aWFsaXplIGEgZGlmZmVyZW50IFZpZXcuXHJcbiAqIC0gWW91IGhhdmUgT2JzZXJ2ZXJzIHRvIHJlZ2lzdGVyIHdpdGggdGhlIFZpZXdcclxuICpcclxuICogSWYgeW91IGRvbid0IHdhbnQgdG8gaW5pdGlhbGl6ZSBhIGRpZmZlcmVudCBWaWV3XHJcbiAqIGNhbGwgJ3N1cGVyJyAjaW5pdGlhbGl6ZVZpZXcgYXQgdGhlIGJlZ2lubmluZyBvZiB5b3VyXHJcbiAqIG1ldGhvZCwgdGhlbiByZWdpc3RlciBNZWRpYXRvciBpbnN0YW5jZXMuXHJcbiAqXHJcbiAqICAgICBNeUZhY2FkZS5wcm90b3R5cGUuaW5pdGlhbGl6ZVZpZXc9IGZ1bmN0aW9uICgpXHJcbiAqICAgICB7XHJcbiAqICAgICAgICAgRmFjYWRlLnByb3RvdHlwZS5pbml0aWFsaXplVmlldy5jYWxsKHRoaXMpO1xyXG4gKiAgICAgICAgIHRoaXMucmVnaXN0ZXJNZWRpYXRvcihuZXcgTXlNZWRpYXRvcigpKTtcclxuICogICAgIH07XHJcbiAqXHJcbiAqIE5vdGU6IFRoaXMgbWV0aG9kIGlzICpyYXJlbHkqIG92ZXJyaWRkZW47IGluIHByYWN0aWNlIHlvdSBhcmUgbW9yZVxyXG4gKiBsaWtlbHkgdG8gdXNlIGEgY29tbWFuZCB0byBjcmVhdGUgYW5kIHJlZ2lzdGVyIE1lZGlhdG9yc1xyXG4gKiB3aXRoIHRoZSBWaWV3LCBzaW5jZSBNZWRpYXRvciBpbnN0YW5jZXMgd2lsbCBuZWVkIHRvIHNlbmRcclxuICogTm90aWZpY2F0aW9ucyBhbmQgdGh1cyB3aWxsIGxpa2VseSB3YW50IHRvIGZldGNoIGEgcmVmZXJlbmNlXHJcbiAqIHRvIHRoZSBGYWNhZGUgZHVyaW5nIHRoZWlyIGNvbnN0cnVjdGlvbi5cclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbkZhY2FkZS5wcm90b3R5cGUuaW5pdGlhbGl6ZVZpZXcgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIGlmKHRoaXMudmlldyAhPSBudWxsKVxyXG4gICAgICAgIHJldHVybjtcclxuXHJcbiAgICB0aGlzLnZpZXcgPSBWaWV3LmdldEluc3RhbmNlKHRoaXMubXVsdGl0b25LZXkpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlZ2lzdGVyIGEgY29tbWFuZCB3aXRoIHRoZSBDb250cm9sbGVyIGJ5IE5vdGlmaWNhdGlvbiBuYW1lXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBub3RpZmljYXRpb25OYW1lXHJcbiAqICBUaGUgbmFtZSBvZiB0aGUgTm90aWZpY2F0aW9uIHRvIGFzc29jaWF0ZSB0aGUgY29tbWFuZCB3aXRoXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbW1hbmRDbGFzc1JlZlxyXG4gKiAgQSByZWZlcmVuY2Ugb3QgdGhlIGNvbW1hbmRzIGNvbnN0cnVjdG9yLlxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuRmFjYWRlLnByb3RvdHlwZS5yZWdpc3RlckNvbW1hbmQgPSBmdW5jdGlvbihub3RpZmljYXRpb25OYW1lLCBjb21tYW5kQ2xhc3NSZWYpXHJcbntcclxuICAgIHRoaXMuY29udHJvbGxlci5yZWdpc3RlckNvbW1hbmQobm90aWZpY2F0aW9uTmFtZSwgY29tbWFuZENsYXNzUmVmKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmUgYSBwcmV2aW91c2x5IHJlZ2lzdGVyZWQgY29tbWFuZCB0byBOb3RpZmljYXRpb24gbWFwcGluZyBmcm9tIHRoZVxyXG4gKiB7QGxpbmsgcHVyZW12Yy5Db250cm9sbGVyI3JlbW92ZUNvbW1hbmQgQ29udHJvbGxlcn1cclxuICogQHBhcmFtIHtzdHJpbmd9IG5vdGlmaWNhdGlvbk5hbWVcclxuICogIFRoZSBuYW1lIG9mIHRoZSB0aGUgTm90aWZpY2F0aW9uIHRvIHJlbW92ZSBmcm9tIHRoZSBjb21tYW5kIG1hcHBpbmcgZm9yLlxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuRmFjYWRlLnByb3RvdHlwZS5yZW1vdmVDb21tYW5kID0gZnVuY3Rpb24obm90aWZpY2F0aW9uTmFtZSlcclxue1xyXG4gICAgdGhpcy5jb250cm9sbGVyLnJlbW92ZUNvbW1hbmQobm90aWZpY2F0aW9uTmFtZSk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ2hlY2sgaWYgYSBjb21tYW5kIGlzIHJlZ2lzdGVyZWQgZm9yIGEgZ2l2ZW4gbm90aWZpY2F0aW9uLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbm90aWZpY2F0aW9uTmFtZVxyXG4gKiAgQSBOb3RpZmljYXRpb24gbmFtZVxyXG4gKiBAcmV0dXJuIHtib29sZWFufVxyXG4gKiAgV2hldGhlciBhIGNvbW1hbiBpcyBjdXJyZW50bHkgcmVnaXN0ZXJlZCBmb3IgdGhlIGdpdmVuIG5vdGlmaWNhdGlvbk5hbWVcclxuICovXHJcbkZhY2FkZS5wcm90b3R5cGUuaGFzQ29tbWFuZCA9IGZ1bmN0aW9uKG5vdGlmaWNhdGlvbk5hbWUpXHJcbntcclxuICAgIHJldHVybiB0aGlzLmNvbnRyb2xsZXIuaGFzQ29tbWFuZChub3RpZmljYXRpb25OYW1lKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZWdpc3RlciBhIFByb3h5IHdpdGggdGhlIHtAbGluayBwdXJlbXZjLk1vZGVsI3JlZ2lzdGVyUHJveHkgTW9kZWx9XHJcbiAqIGJ5IG5hbWUuXHJcbiAqXHJcbiAqIEBwYXJhbSB7cHVyZW12Yy5Qcm94eX0gcHJveHlcclxuICogIFRoZSBQcm94eSBpbnN0YW5jZSB0byBiZSByZWdpc3RlcmVkIHdpdGggdGhlIE1vZGVsLlxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuRmFjYWRlLnByb3RvdHlwZS5yZWdpc3RlclByb3h5ID0gZnVuY3Rpb24ocHJveHkpXHJcbntcclxuICAgIHRoaXMubW9kZWwucmVnaXN0ZXJQcm94eShwcm94eSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0cmlldmUgYSBQcm94eSBmcm9tIHRoZSBNb2RlbFxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJveHlOYW1lXHJcbiAqIEByZXR1cm4ge3B1cmVtdmMuUHJveHl9XHJcbiAqL1xyXG5GYWNhZGUucHJvdG90eXBlLnJldHJpZXZlUHJveHkgPSBmdW5jdGlvbihwcm94eU5hbWUpXHJcbntcclxuICAgIHJldHVybiB0aGlzLm1vZGVsLnJldHJpZXZlUHJveHkocHJveHlOYW1lKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmUgYSBQcm94eSBmcm9tIHRoZSBNb2RlbCBieSBuYW1lXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm94eU5hbWVcclxuICogIFRoZSBuYW1lIG9mIHRoZSBQcm94eVxyXG4gKiBAcmV0dXJuIHtwdXJlbXZjLlByb3h5fVxyXG4gKiAgVGhlIFByb3h5IHRoYXQgd2FzIHJlbW92ZWQgZnJvbSB0aGUgTW9kZWxcclxuICovXHJcbkZhY2FkZS5wcm90b3R5cGUucmVtb3ZlUHJveHkgPSBmdW5jdGlvbihwcm94eU5hbWUpXHJcbntcclxuICAgIHZhciBwcm94eSA9IG51bGw7XHJcbiAgICBpZih0aGlzLm1vZGVsICE9IG51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgcHJveHkgPSB0aGlzLm1vZGVsLnJlbW92ZVByb3h5KHByb3h5TmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHByb3h5O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENoZWNrIGl0IGEgUHJveHkgaXMgcmVnaXN0ZXJlZC5cclxuICogQHBhcmFtIHtzdHJpbmd9IHByb3h5TmFtZVxyXG4gKiAgQSBQcm94eSBuYW1lXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAqICBXaGV0aGVyIGEgUHJveHkgaXMgY3VycmVudGx5IHJlZ2lzdGVyZWQgd2l0aCB0aGUgZ2l2ZW4gcHJveHlOYW1lXHJcbiAqL1xyXG5GYWNhZGUucHJvdG90eXBlLmhhc1Byb3h5ID0gZnVuY3Rpb24ocHJveHlOYW1lKVxyXG57XHJcbiAgICByZXR1cm4gdGhpcy5tb2RlbC5oYXNQcm94eShwcm94eU5hbWUpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlZ2lzdGVyIGEgTWVkaWF0b3Igd2l0aCB3aXRoIHRoZSBWaWV3LlxyXG4gKlxyXG4gKiBAcGFyYW0ge3B1cmVtdmMuTWVkaWF0b3J9IG1lZGlhdG9yXHJcbiAqICBBIHJlZmVyZW5jZSB0byB0aGUgTWVkaWF0b3IgdG8gcmVnaXN0ZXJcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbkZhY2FkZS5wcm90b3R5cGUucmVnaXN0ZXJNZWRpYXRvciA9IGZ1bmN0aW9uKG1lZGlhdG9yKVxyXG57XHJcbiAgICBpZih0aGlzLnZpZXcgIT0gbnVsbClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnZpZXcucmVnaXN0ZXJNZWRpYXRvcihtZWRpYXRvcik7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0cmlldmUgYSBNZWRpYXRvciBmcm9tIHRoZSBWaWV3IGJ5IG5hbWVcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG1lZGlhdG9yTmFtZVxyXG4gKiAgVGhlIE1lZGlhdG9ycyBuYW1lXHJcbiAqIEByZXR1cm4ge3B1cmVtdmMuTWVkaWF0b3J9XHJcbiAqICBUaGUgcmV0cmlldmVkIE1lZGlhdG9yXHJcbiAqL1xyXG5GYWNhZGUucHJvdG90eXBlLnJldHJpZXZlTWVkaWF0b3IgPSBmdW5jdGlvbihtZWRpYXRvck5hbWUpXHJcbntcclxuICAgIHJldHVybiB0aGlzLnZpZXcucmV0cmlldmVNZWRpYXRvcihtZWRpYXRvck5hbWUpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSBhIE1lZGlhdG9yIGZyb20gdGhlIFZpZXcuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZWRpYXRvck5hbWVcclxuICogIFRoZSBuYW1lIG9mIHRoZSBNZWRpYXRvciB0byByZW1vdmUuXHJcbiAqIEByZXR1cm4ge3B1cmVtdmMuTWVkaWF0b3J9XHJcbiAqICBUaGUgcmVtb3ZlZCBNZWRpYXRvclxyXG4gKi9cclxuRmFjYWRlLnByb3RvdHlwZS5yZW1vdmVNZWRpYXRvciA9IGZ1bmN0aW9uKG1lZGlhdG9yTmFtZSlcclxue1xyXG4gICAgdmFyIG1lZGlhdG9yID0gbnVsbDtcclxuICAgIGlmKHRoaXMudmlldyAhPSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIG1lZGlhdG9yID0gdGhpcy52aWV3LnJlbW92ZU1lZGlhdG9yKG1lZGlhdG9yTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG1lZGlhdG9yO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIGEgTWVkaWF0b3IgaXMgcmVnaXN0ZXJlZCBvciBub3QuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZWRpYXRvck5hbWVcclxuICogIEEgTWVkaWF0b3IgbmFtZVxyXG4gKiBAcmV0dXJuIHtib29sZWFufVxyXG4gKiAgV2hldGhlciBhIE1lZGlhdG9yIGlzIHJlZ2lzdGVyZWQgd2l0aCB0aGUgZ2l2ZW4gbWVkaWF0b3JOYW1lXHJcbiAqL1xyXG5GYWNhZGUucHJvdG90eXBlLmhhc01lZGlhdG9yID0gZnVuY3Rpb24obWVkaWF0b3JOYW1lKVxyXG57XHJcbiAgICByZXR1cm4gdGhpcy52aWV3Lmhhc01lZGlhdG9yKG1lZGlhdG9yTmFtZSk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGFuZCBzZW5kIGFcclxuICoge0BsaW5rIHB1cmVtdmMuTm90aWZpY2F0aW9uIE5vdGlmaWNhdGlvbn1cclxuICpcclxuICogS2VlcHMgdXMgZnJvbSBoYXZpbmcgdG8gY29uc3RydWN0IG5ldyBOb3RpZmljYXRpb24gaW5zdGFuY2VzIGluIG91clxyXG4gKiBpbXBsZW1lbnRhdGlvblxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbm90aWZpY2F0aW9uTmFtZVxyXG4gKiAgVGhlIG5hbWUgb2YgdGhlIE5vdGlmaWNhdGlvbiB0byBzZW5kXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBbYm9keV1cclxuICogIFRoZSBib2R5IG9mIHRoZSBub3RpZmljYXRpb25cclxuICogQHBhcmFtIHtzdHJpbmd9IFt0eXBlXVxyXG4gKiAgVGhlIHR5cGUgb2YgdGhlIG5vdGlmaWNhdGlvblxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuRmFjYWRlLnByb3RvdHlwZS5zZW5kTm90aWZpY2F0aW9uID0gZnVuY3Rpb24obm90aWZpY2F0aW9uTmFtZSwgYm9keSwgdHlwZSlcclxue1xyXG4gICAgdGhpcy5ub3RpZnlPYnNlcnZlcnMobmV3IE5vdGlmaWNhdGlvbihub3RpZmljYXRpb25OYW1lLCBib2R5LCB0eXBlKSk7XHJcbn07XHJcblxyXG4vKipcclxuICogTm90aWZ5IHtAbGluayBwdXJlbXZjLk9ic2VydmVyIE9ic2VydmVyfXNcclxuICpcclxuICogVGhpcyBtZXRob2QgaXMgbGVmdCBwdWJsaWMgbW9zdGx5IGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5LCBhbmQgdG8gYWxsb3dcclxuICogeW91IHRvIHNlbmQgY3VzdG9tIG5vdGlmaWNhdGlvbiBjbGFzc2VzIHVzaW5nIHRoZSBmYWNhZGUuXHJcbiAqXHJcbiAqIFVzdWFsbHkgeW91IHNob3VsZCBqdXN0IGNhbGwgc2VuZE5vdGlmaWNhdGlvbiBhbmQgcGFzcyB0aGUgcGFyYW1ldGVycywgbmV2ZXJcclxuICogaGF2aW5nIHRvIGNvbnN0cnVjdCB0aGUgbm90aWZpY2F0aW9uIHlvdXJzZWxmLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3B1cmVtdmMuTm90aWZpY2F0aW9ufSBub3RpZmljYXRpb25cclxuICogIFRoZSBOb3RpZmljYXRpb24gdG8gc2VuZFxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuRmFjYWRlLnByb3RvdHlwZS5ub3RpZnlPYnNlcnZlcnMgPSBmdW5jdGlvbihub3RpZmljYXRpb24pXHJcbntcclxuICAgIGlmKHRoaXMudmlldyAhPSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudmlldy5ub3RpZnlPYnNlcnZlcnMobm90aWZpY2F0aW9uKTtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBJbml0aWFsaXplIHRoZSBGYWNhZGVzIE5vdGlmaWVyIGNhcGFiaWxpdGllcyBieSBzZXR0aW5nIHRoZSBNdWx0aXRvbiBrZXkgZm9yXHJcbiAqIHRoaXMgZmFjYWRlIGluc3RhbmNlLlxyXG4gKlxyXG4gKiBOb3QgY2FsbGVkIGRpcmVjdGx5LCBidXQgaW5zdGVhZCBmcm9tIHRoZSBjb25zdHJ1Y3RvciB3aGVuICNnZXRJbnN0YW5jZSBpc1xyXG4gKiBpbnZva2VkLiBJdCBpcyBuZWNlc3NhcnkgdG8gYmUgcHVibGljIGluIG9yZGVyIHRvIGltcGxlbWVudCBOb3RpZmllclxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5XHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5GYWNhZGUucHJvdG90eXBlLmluaXRpYWxpemVOb3RpZmllciA9IGZ1bmN0aW9uKGtleSlcclxue1xyXG4gICAgdGhpcy5tdWx0aXRvbktleSA9IGtleTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDaGVjayBpZiBhICpDb3JlKiBpcyByZWdpc3RlcmVkIG9yIG5vdFxyXG4gKlxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcclxuICogIFRoZSBtdWx0aXRvbiBrZXkgZm9yIHRoZSAqQ29yZSogaW4gcXVlc3Rpb25cclxuICogQHJldHVybiB7Ym9vbGVhbn1cclxuICogIFdoZXRoZXIgYSAqQ29yZSogaXMgcmVnaXN0ZXJlZCB3aXRoIHRoZSBnaXZlbiBrZXlcclxuICovXHJcbkZhY2FkZS5oYXNDb3JlID0gZnVuY3Rpb24oa2V5KVxyXG57XHJcbiAgICByZXR1cm4gRmFjYWRlLmluc3RhbmNlTWFwW2tleV0gIT0gbnVsbDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmUgYSAqQ29yZSpcclxuICpcclxuICogUmVtb3ZlIHRoZSBNb2RlbCwgVmlldywgQ29udHJvbGxlciBhbmQgRmFjYWRlIGZvciBhIGdpdmVuIGtleS5cclxuICpcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5XHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5GYWNhZGUucmVtb3ZlQ29yZSA9IGZ1bmN0aW9uKGtleSlcclxue1xyXG4gICAgaWYoRmFjYWRlLmluc3RhbmNlTWFwW2tleV0gPT0gbnVsbClcclxuICAgICAgICByZXR1cm47XHJcblxyXG4gICAgTW9kZWwucmVtb3ZlTW9kZWwoa2V5KTtcclxuICAgIFZpZXcucmVtb3ZlVmlldyhrZXkpO1xyXG4gICAgQ29udHJvbGxlci5yZW1vdmVDb250cm9sbGVyKGtleSk7XHJcbiAgICBkZWxldGUgRmFjYWRlLmluc3RhbmNlTWFwW2tleV07XHJcbn07XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKiBUaGUgRmFjYWRlcyBjb3JyZXNwb25kaW5nIENvbnRyb2xsZXJcclxuICpcclxuICogQHByb3RlY3RlZFxyXG4gKiBAdHlwZSBwdXJlbXZjLkNvbnRyb2xsZXJcclxuICovXHJcbkZhY2FkZS5wcm90b3R5cGUuY29udHJvbGxlciA9IG51bGw7XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKiBUaGUgRmFjYWRlcyBjb3JyZXNwb25kaW5nIE1vZGVsIGluc3RhbmNlXHJcbiAqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQHR5cGUgcHVyZW12Yy5Nb2RlbFxyXG4gKi9cclxuRmFjYWRlLnByb3RvdHlwZS5tb2RlbCA9IG51bGw7XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKiBUaGUgRmFjYWRlcyBjb3JyZXNwbmRpbmcgVmlldyBpbnN0YW5jZS5cclxuICpcclxuICogQHByb3RlY3RlZFxyXG4gKiBAdHlwZSBwdXJlbXZjLlZpZXdcclxuICovXHJcbkZhY2FkZS5wcm90b3R5cGUudmlldyA9IG51bGw7XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKiBUaGUgRmFjYWRlcyBtdWx0aXRvbiBrZXkuXHJcbiAqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQHR5cGUgc3RyaW5nXHJcbiAqL1xyXG5GYWNhZGUucHJvdG90eXBlLm11bHRpdG9uS2V5ID0gbnVsbDtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqIFRoZSBNdWx0aXRvbiBGYWNhZGUgaW5zdGFuY2UgbWFwLlxyXG4gKiBAc3RhdGljXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQHR5cGUgQXJyYXlcclxuICovXHJcbkZhY2FkZS5pbnN0YW5jZU1hcCA9IFtdO1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICogTWVzc2FnZSBDb25zdGFudHNcclxuICogQHByb3RlY3RlZFxyXG4gKiBAdHlwZSB7c3RyaW5nfVxyXG4gKiBAY29uc3RcclxuICogQHN0YXRpY1xyXG4gKi9cclxuRmFjYWRlLk1VTFRJVE9OX01TRyA9IFwiRmFjYWRlIGluc3RhbmNlIGZvciB0aGlzIE11bHRpdG9uIGtleSBhbHJlYWR5IGNvbnN0cnVjdGVkIVwiO1xyXG4vKipcclxuICogQGF1dGhvciBQdXJlTVZDIEpTIE5hdGl2ZSBQb3J0IGJ5IERhdmlkIEZvbGV5LCBGcsOpZMOpcmljIFNhdW5pZXIsICYgQWxhaW4gRHVjaGVzbmVhdVxyXG4gKiBAYXV0aG9yIENvcHlyaWdodChjKSAyMDA2LTIwMTIgRnV0dXJlc2NhbGUsIEluYy4sIFNvbWUgcmlnaHRzIHJlc2VydmVkLlxyXG4gKlxyXG4gKiBAY2xhc3MgcHVyZW12Yy5WaWV3XHJcbiAqXHJcbiAqIEEgTXVsdGl0b24gVmlldyBpbXBsZW1lbnRhdGlvbi5cclxuICpcclxuICogSW4gUHVyZU1WQywgdGhlIFZpZXcgY2xhc3MgYXNzdW1lcyB0aGVzZSByZXNwb25zaWJpbGl0aWVzXHJcbiAqXHJcbiAqIC0gTWFpbnRhaW4gYSBjYWNoZSBvZiB7QGxpbmsgcHVyZW12Yy5NZWRpYXRvciBNZWRpYXRvcn1cclxuICogICBpbnN0YW5jZXMuXHJcbiAqXHJcbiAqIC0gUHJvdmlkZSBtZXRob2RzIGZvciByZWdpc3RlcmluZywgcmV0cmlldmluZywgYW5kIHJlbW92aW5nXHJcbiAqICAge0BsaW5rIHB1cmVtdmMuTWVkaWF0b3IgTWVkaWF0b3J9LlxyXG4gKlxyXG4gKiAtIE5vdGlmaXlpbmcge0BsaW5rIHB1cmVtdmMuTWVkaWF0b3IgTWVkaWF0b3J9IHdoZW4gdGhleSBhcmUgcmVnaXN0ZXJlZCBvclxyXG4gKiAgIHJlbW92ZWQuXHJcbiAqXHJcbiAqIC0gTWFuYWdpbmcgdGhlIG9ic2VydmVyIGxpc3RzIGZvciBlYWNoIHtAbGluayBwdXJlbXZjLk5vdGlmaWNhdGlvbiBOb3RpZmljYXRpb259XHJcbiAqICAgaW4gdGhlIGFwcGxpY2F0aW9uLlxyXG4gKlxyXG4gKiAtIFByb3ZpZGluZyBhIG1ldGhvZCBmb3IgYXR0YWNoaW5nIHtAbGluayBwdXJlbXZjLk9ic2VydmVyIE9ic2VydmVyfSB0byBhblxyXG4gKiAgIHtAbGluayBwdXJlbXZjLk5vdGlmaWNhdGlvbiBOb3RpZmljYXRpb259J3Mgb2JzZXJ2ZXIgbGlzdC5cclxuICpcclxuICogLSBQcm92aWRpbmcgYSBtZXRob2QgZm9yIGJyb2FkY2FzdGluZyBhIHtAbGluayBwdXJlbXZjLk5vdGlmaWNhdGlvbiBOb3RpZmljYXRpb259LlxyXG4gKlxyXG4gKiAtIE5vdGlmeWluZyB0aGUge0BsaW5rIHB1cmVtdmMuT2JzZXJ2ZXIgT2JzZXJ2ZXJ9cyBvZiBhIGdpdmVuXHJcbiAqICAge0BsaW5rIHB1cmVtdmMuTm90aWZpY2F0aW9uIE5vdGlmaWNhdGlvbn0gd2hlbiBpdCBicm9hZGNhc3QuXHJcbiAqXHJcbiAqIFRoaXMgVmlldyBpbXBsZW1lbnRhdGlvbiBpcyBhIE11bHRpdG9uLCBzbyB5b3Ugc2hvdWxkIG5vdCBjYWxsIHRoZVxyXG4gKiBjb25zdHJ1Y3RvciBkaXJlY3RseSwgYnV0IGluc3RlYWQgY2FsbCB0aGUgc3RhdGljIE11bHRpdG9uXHJcbiAqIEZhY3RvcnkgI2dldEluc3RhbmNlIG1ldGhvZC5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IGtleVxyXG4gKiBAY29uc3RydWN0b3JcclxuICogQHRocm93cyB7RXJyb3J9XHJcbiAqICBpZiBpbnN0YW5jZSBmb3IgdGhpcyBNdWx0aXRvbiBrZXkgaGFzIGFscmVhZHkgYmVlbiBjb25zdHJ1Y3RlZFxyXG4gKi9cclxuZnVuY3Rpb24gVmlldyhrZXkpXHJcbntcclxuICAgIGlmKFZpZXcuaW5zdGFuY2VNYXBba2V5XSAhPSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihWaWV3Lk1VTFRJVE9OX01TRyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMubXVsdGl0b25LZXkgPSBrZXk7XHJcbiAgICBWaWV3Lmluc3RhbmNlTWFwW3RoaXMubXVsdGl0b25LZXldID0gdGhpcztcclxuICAgIHRoaXMubWVkaWF0b3JNYXAgPSBbXTtcclxuICAgIHRoaXMub2JzZXJ2ZXJNYXAgPSBbXTtcclxuICAgIHRoaXMuaW5pdGlhbGl6ZVZpZXcoKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEluaXRpYWxpemUgdGhlIFNpbmdsZXRvbiBWaWV3IGluc3RhbmNlXHJcbiAqXHJcbiAqIENhbGxlZCBhdXRvbWF0aWNhbGx5IGJ5IHRoZSBjb25zdHJ1Y3RvciwgdGhpcyBpcyB5b3VyIG9wcG9ydHVuaXR5IHRvXHJcbiAqIGluaXRpYWxpemUgdGhlIFNpbmdsZXRvbiBpbnN0YW5jZSBpbiB5b3VyIHN1YmNsYXNzIHdpdGhvdXQgb3ZlcnJpZGluZyB0aGVcclxuICogY29uc3RydWN0b3JcclxuICpcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcblZpZXcucHJvdG90eXBlLmluaXRpYWxpemVWaWV3ID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICByZXR1cm47XHJcbn07XHJcblxyXG4vKipcclxuICogVmlldyBTaW5nbGV0b24gRmFjdG9yeSBtZXRob2QuXHJcbiAqIE5vdGUgdGhhdCB0aGlzIG1ldGhvZCB3aWxsIHJldHVybiBudWxsIGlmIHN1cHBsaWVkIGEgbnVsbFxyXG4gKiBvciB1bmRlZmluZWQgbXVsdGl0b24ga2V5LlxyXG4gKlxyXG4gKiBAcmV0dXJuIHtwdXJlbXZjLlZpZXd9XHJcbiAqICBUaGUgU2luZ2xldG9uIGluc3RhbmNlIG9mIFZpZXdcclxuICovXHJcblZpZXcuZ2V0SW5zdGFuY2UgPSBmdW5jdGlvbihrZXkpXHJcbntcclxuICAgIGlmIChudWxsID09IGtleSlcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuXHJcbiAgICBpZihWaWV3Lmluc3RhbmNlTWFwW2tleV0gPT0gbnVsbClcclxuICAgIHtcclxuICAgICAgICBWaWV3Lmluc3RhbmNlTWFwW2tleV0gPSBuZXcgVmlldyhrZXkpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gVmlldy5pbnN0YW5jZU1hcFtrZXldO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlZ2lzdGVyIGFuIE9ic2VydmVyIHRvIGJlIG5vdGlmaWVkIG9mIE5vdGlmaWNhdGlvbnMgd2l0aCBhIGdpdmVuIG5hbWVcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG5vdGlmaWNhdGlvbk5hbWVcclxuICogIFRoZSBuYW1lIG9mIHRoZSBOb3RpZmljYXRpb25zIHRvIG5vdGlmeSB0aGlzIE9ic2VydmVyIG9mXHJcbiAqIEBwYXJhbSB7cHVyZW12Yy5PYnNlcnZlcn0gb2JzZXJ2ZXJcclxuICogIFRoZSBPYnNlcnZlciB0byByZWdpc3Rlci5cclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcblZpZXcucHJvdG90eXBlLnJlZ2lzdGVyT2JzZXJ2ZXIgPSBmdW5jdGlvbihub3RpZmljYXRpb25OYW1lLCBvYnNlcnZlcilcclxue1xyXG4gICAgaWYodGhpcy5vYnNlcnZlck1hcFtub3RpZmljYXRpb25OYW1lXSAhPSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMub2JzZXJ2ZXJNYXBbbm90aWZpY2F0aW9uTmFtZV0ucHVzaChvYnNlcnZlcik7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5vYnNlcnZlck1hcFtub3RpZmljYXRpb25OYW1lXSA9IFtvYnNlcnZlcl07XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogTm90aWZ5IHRoZSBPYnNlcnZlcnNmb3IgYSBwYXJ0aWN1bGFyIE5vdGlmaWNhdGlvbi5cclxuICpcclxuICogQWxsIHByZXZpb3VzbHkgYXR0YWNoZWQgT2JzZXJ2ZXJzIGZvciB0aGlzIE5vdGlmaWNhdGlvbidzXHJcbiAqIGxpc3QgYXJlIG5vdGlmaWVkIGFuZCBhcmUgcGFzc2VkIGEgcmVmZXJlbmNlIHRvIHRoZSBJTm90aWZpY2F0aW9uIGluXHJcbiAqIHRoZSBvcmRlciBpbiB3aGljaCB0aGV5IHdlcmUgcmVnaXN0ZXJlZC5cclxuICpcclxuICogQHBhcmFtIHtwdXJlbXZjLk5vdGlmaWNhdGlvbn0gbm90aWZpY2F0aW9uXHJcbiAqICBUaGUgTm90aWZpY2F0aW9uIHRvIG5vdGlmeSBPYnNlcnZlcnMgb2ZcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcblZpZXcucHJvdG90eXBlLm5vdGlmeU9ic2VydmVycyA9IGZ1bmN0aW9uKG5vdGlmaWNhdGlvbilcclxue1xyXG4gICAgLy8gU0lDXHJcbiAgICBpZih0aGlzLm9ic2VydmVyTWFwW25vdGlmaWNhdGlvbi5nZXROYW1lKCldICE9IG51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIG9ic2VydmVyc19yZWYgPSB0aGlzLm9ic2VydmVyTWFwW25vdGlmaWNhdGlvbi5nZXROYW1lKCldLCBvYnNlcnZlcnMgPSBbXSwgb2JzZXJ2ZXJcclxuXHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IG9ic2VydmVyc19yZWYubGVuZ3RoOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBvYnNlcnZlciA9IG9ic2VydmVyc19yZWZbaV07XHJcbiAgICAgICAgICAgIG9ic2VydmVycy5wdXNoKG9ic2VydmVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBvYnNlcnZlcnMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBvYnNlcnZlciA9IG9ic2VydmVyc1tpXTtcclxuICAgICAgICAgICAgb2JzZXJ2ZXIubm90aWZ5T2JzZXJ2ZXIobm90aWZpY2F0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlIHRoZSBPYnNlcnZlciBmb3IgYSBnaXZlbiBub3RpZnlDb250ZXh0IGZyb20gYW4gb2JzZXJ2ZXIgbGlzdCBmb3JcclxuICogYSBnaXZlbiBOb3RpZmljYXRpb24gbmFtZVxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbm90aWZpY2F0aW9uTmFtZVxyXG4gKiAgV2hpY2ggb2JzZXJ2ZXIgbGlzdCB0byByZW1vdmUgZnJvbVxyXG4gKiBAcGFyYW0ge09iamVjdH0gbm90aWZ5Q29udGV4dFxyXG4gKiAgUmVtb3ZlIHRoZSBPYnNlcnZlciB3aXRoIHRoaXMgb2JqZWN0IGFzIGl0cyBub3RpZnlDb250ZXh0XHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5WaWV3LnByb3RvdHlwZS5yZW1vdmVPYnNlcnZlciA9IGZ1bmN0aW9uKG5vdGlmaWNhdGlvbk5hbWUsIG5vdGlmeUNvbnRleHQpXHJcbntcclxuICAgIC8vIFNJQ1xyXG4gICAgdmFyIG9ic2VydmVycyA9IHRoaXMub2JzZXJ2ZXJNYXBbbm90aWZpY2F0aW9uTmFtZV07XHJcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgb2JzZXJ2ZXJzLmxlbmd0aDsgaSsrKVxyXG4gICAge1xyXG4gICAgICAgIGlmKG9ic2VydmVyc1tpXS5jb21wYXJlTm90aWZ5Q29udGV4dChub3RpZnlDb250ZXh0KSA9PSB0cnVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgb2JzZXJ2ZXJzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmKG9ic2VydmVycy5sZW5ndGggPT0gMClcclxuICAgIHtcclxuICAgICAgICBkZWxldGUgdGhpcy5vYnNlcnZlck1hcFtub3RpZmljYXRpb25OYW1lXTtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZWdpc3RlciBhIE1lZGlhdG9yIGluc3RhbmNlIHdpdGggdGhlIFZpZXcuXHJcbiAqXHJcbiAqIFJlZ2lzdGVycyB0aGUgTWVkaWF0b3Igc28gdGhhdCBpdCBjYW4gYmUgcmV0cmlldmVkIGJ5IG5hbWUsXHJcbiAqIGFuZCBmdXJ0aGVyIGludGVycm9nYXRlcyB0aGUgTWVkaWF0b3IgZm9yIGl0c1xyXG4gKiB7QGxpbmsgcHVyZW12Yy5NZWRpYXRvciNsaXN0Tm90aWZpY2F0aW9uSW50ZXJlc3RzIGludGVyZXN0c30uXHJcbiAqXHJcbiAqIElmIHRoZSBNZWRpYXRvciByZXR1cm5zIGFueSBOb3RpZmljYXRpb25cclxuICogbmFtZXMgdG8gYmUgbm90aWZpZWQgYWJvdXQsIGFuIE9ic2VydmVyIGlzIGNyZWF0ZWQgZW5jYXBzdWxhdGluZ1xyXG4gKiB0aGUgTWVkaWF0b3IgaW5zdGFuY2Unc1xyXG4gKiB7QGxpbmsgcHVyZW12Yy5NZWRpYXRvciNoYW5kbGVOb3RpZmljYXRpb24gaGFuZGxlTm90aWZpY2F0aW9ufVxyXG4gKiBtZXRob2QgYW5kIHJlZ2lzdGVyaW5nIGl0IGFzIGFuIE9ic2VydmVyIGZvciBhbGwgTm90aWZpY2F0aW9ucyB0aGVcclxuICogTWVkaWF0b3IgaXMgaW50ZXJlc3RlZCBpbi5cclxuICpcclxuICogQHBhcmFtIHtwdXJlbXZjLk1lZGlhdG9yfVxyXG4gKiAgYSByZWZlcmVuY2UgdG8gdGhlIE1lZGlhdG9yIGluc3RhbmNlXHJcbiAqL1xyXG5WaWV3LnByb3RvdHlwZS5yZWdpc3Rlck1lZGlhdG9yID0gZnVuY3Rpb24obWVkaWF0b3IpXHJcbntcclxuICAgIGlmKHRoaXMubWVkaWF0b3JNYXBbbWVkaWF0b3IuZ2V0TWVkaWF0b3JOYW1lKCldICE9IG51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIG1lZGlhdG9yLmluaXRpYWxpemVOb3RpZmllcih0aGlzLm11bHRpdG9uS2V5KTtcclxuICAgIC8vIHJlZ2lzdGVyIHRoZSBtZWRpYXRvciBmb3IgcmV0cmlldmFsIGJ5IG5hbWVcclxuICAgIHRoaXMubWVkaWF0b3JNYXBbbWVkaWF0b3IuZ2V0TWVkaWF0b3JOYW1lKCldID0gbWVkaWF0b3I7XHJcblxyXG4gICAgLy8gZ2V0IG5vdGlmaWNhdGlvbiBpbnRlcmVzdHMgaWYgYW55XHJcbiAgICB2YXIgaW50ZXJlc3RzID0gbWVkaWF0b3IubGlzdE5vdGlmaWNhdGlvbkludGVyZXN0cygpO1xyXG5cclxuICAgIC8vIHJlZ2lzdGVyIG1lZGlhdG9yIGFzIGFuIG9ic2VydmVyIGZvciBlYWNoIG5vdGlmaWNhdGlvblxyXG4gICAgaWYoaW50ZXJlc3RzLmxlbmd0aCA+IDApXHJcbiAgICB7XHJcbiAgICAgICAgLy8gY3JlYXRlIG9ic2VydmVyIHJlZmVyZW5jaW5nIHRoaXMgbWVkaWF0b3JzIGhhbmRsZU5vdGlmaWNhdGlvbiBtZXRob2RcclxuICAgICAgICB2YXIgb2JzZXJ2ZXIgPSBuZXcgT2JzZXJ2ZXIobWVkaWF0b3IuaGFuZGxlTm90aWZpY2F0aW9uLCBtZWRpYXRvcik7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGludGVyZXN0cy5sZW5ndGg7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJPYnNlcnZlcihpbnRlcmVzdHNbaV0sIG9ic2VydmVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbWVkaWF0b3Iub25SZWdpc3RlcigpO1xyXG59XHJcblxyXG4vKipcclxuICogUmV0cmlldmUgYSBNZWRpYXRvciBmcm9tIHRoZSBWaWV3XHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZWRpYXRvck5hbWVcclxuICogIFRoZSBuYW1lIG9mIHRoZSBNZWRpYXRvciBpbnN0YW5jZSB0byByZXRyaWV2ZVxyXG4gKiBAcmV0dXJuIHtwdXJlbXZjLk1lZGlhdG9yfVxyXG4gKiAgVGhlIE1lZGlhdG9yIGluc3RhbmNlIHByZXZpb3VzbHkgcmVnaXN0ZXJlZCB3aXRoIHRoZSBnaXZlbiBtZWRpYXRvck5hbWVcclxuICovXHJcblZpZXcucHJvdG90eXBlLnJldHJpZXZlTWVkaWF0b3IgPSBmdW5jdGlvbihtZWRpYXRvck5hbWUpXHJcbntcclxuICAgIHJldHVybiB0aGlzLm1lZGlhdG9yTWFwW21lZGlhdG9yTmFtZV07XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlIGEgTWVkaWF0b3IgZnJvbSB0aGUgVmlldy5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG1lZGlhdG9yTmFtZVxyXG4gKiAgTmFtZSBvZiB0aGUgTWVkaWF0b3IgaW5zdGFuY2UgdG8gYmUgcmVtb3ZlZFxyXG4gKiBAcmV0dXJuIHtwdXJlbXZjLk1lZGlhdG9yfVxyXG4gKiAgVGhlIE1lZGlhdG9yIHRoYXQgd2FzIHJlbW92ZWQgZnJvbSB0aGUgVmlld1xyXG4gKi9cclxuVmlldy5wcm90b3R5cGUucmVtb3ZlTWVkaWF0b3IgPSBmdW5jdGlvbihtZWRpYXRvck5hbWUpXHJcbntcclxuICAgIHZhciBtZWRpYXRvciA9IHRoaXMubWVkaWF0b3JNYXBbbWVkaWF0b3JOYW1lXTtcclxuICAgIGlmKG1lZGlhdG9yKVxyXG4gICAge1xyXG4gICAgICAgIC8vIGZvciBldmVyeSBub3RpZmljYXRpb24gdGhlIG1lZGlhdG9yIGlzIGludGVyZXN0ZWQgaW4uLi5cclxuICAgICAgICB2YXIgaW50ZXJlc3RzID0gbWVkaWF0b3IubGlzdE5vdGlmaWNhdGlvbkludGVyZXN0cygpO1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBpbnRlcmVzdHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyByZW1vdmUgdGhlIG9ic2VydmVyIGxpbmtpbmcgdGhlIG1lZGlhdG9yIHRvIHRoZSBub3RpZmljYXRpb25cclxuICAgICAgICAgICAgLy8gaW50ZXJlc3RcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVPYnNlcnZlcihpbnRlcmVzdHNbaV0sIG1lZGlhdG9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHJlbW92ZSB0aGUgbWVkaWF0b3IgZnJvbSB0aGUgbWFwXHJcbiAgICAgICAgZGVsZXRlIHRoaXMubWVkaWF0b3JNYXBbbWVkaWF0b3JOYW1lXTtcclxuXHJcbiAgICAgICAgLy8gYWxlcnQgdGhlIG1lZGlhdG9yIHRoYXQgaXQgaGFzIGJlZW4gcmVtb3ZlZFxyXG4gICAgICAgIG1lZGlhdG9yLm9uUmVtb3ZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG1lZGlhdG9yO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIGEgTWVkaWF0b3IgaXMgcmVnaXN0ZXJlZCBvciBub3QuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZWRpYXRvck5hbWVcclxuICogQHJldHVybiB7Ym9vbGVhbn1cclxuICogIFdoZXRoZXIgYSBNZWRpYXRvciBpcyByZWdpc3RlcmVkIHdpdGggdGhlIGdpdmVuIG1lZGlhdG9ybmFtZVxyXG4gKi9cclxuVmlldy5wcm90b3R5cGUuaGFzTWVkaWF0b3IgPSBmdW5jdGlvbihtZWRpYXRvck5hbWUpXHJcbntcclxuICAgIHJldHVybiB0aGlzLm1lZGlhdG9yTWFwW21lZGlhdG9yTmFtZV0gIT0gbnVsbDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmUgYSBWaWV3IGluc3RhbmNlXHJcbiAqXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5WaWV3LnJlbW92ZVZpZXcgPSBmdW5jdGlvbihrZXkpXHJcbntcclxuICAgIGRlbGV0ZSBWaWV3Lmluc3RhbmNlTWFwW2tleV07XHJcbn07XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKiBUaGUgVmlld3MgaW50ZXJuYWwgbWFwcGluZyBvZiBtZWRpYXRvciBuYW1lcyB0byBtZWRpYXRvciBpbnN0YW5jZXNcclxuICpcclxuICogQHR5cGUgQXJyYXlcclxuICogQHByb3RlY3RlZFxyXG4gKi9cclxuVmlldy5wcm90b3R5cGUubWVkaWF0b3JNYXAgPSBudWxsO1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICogVGhlIFZpZXdzIGludGVybmFsIG1hcHBpbmcgb2YgTm90aWZpY2F0aW9uIG5hbWVzIHRvIE9ic2VydmVyIGxpc3RzXHJcbiAqXHJcbiAqIEB0eXBlIEFycmF5XHJcbiAqIEBwcm90ZWN0ZWRcclxuICovXHJcblZpZXcucHJvdG90eXBlLm9ic2VydmVyTWFwID0gbnVsbDtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqIFRoZSBpbnRlcm5hbCBtYXAgdXNlZCB0byBzdG9yZSBtdWx0aXRvbiBWaWV3IGluc3RhbmNlc1xyXG4gKlxyXG4gKiBAdHlwZSBBcnJheVxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqL1xyXG5WaWV3Lmluc3RhbmNlTWFwID0gW107XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKiBUaGUgVmlld3MgaW50ZXJuYWwgbXVsdGl0b24ga2V5LlxyXG4gKlxyXG4gKiBAdHlwZSBzdHJpbmdcclxuICogQHByb3RlY3RlZFxyXG4gKi9cclxuVmlldy5wcm90b3R5cGUubXVsdGl0b25LZXkgPSBudWxsO1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICogVGhlIGVycm9yIG1lc3NhZ2UgdXNlZCBpZiBhbiBhdHRlbXB0IGlzIG1hZGUgdG8gaW5zdGFudGlhdGUgVmlldyBkaXJlY3RseVxyXG4gKlxyXG4gKiBAdHlwZSBzdHJpbmdcclxuICogQHByb3RlY3RlZFxyXG4gKiBAY29uc3RcclxuICogQHN0YXRpY1xyXG4gKi9cclxuVmlldy5NVUxUSVRPTl9NU0cgPSBcIlZpZXcgaW5zdGFuY2UgZm9yIHRoaXMgTXVsdGl0b24ga2V5IGFscmVhZHkgY29uc3RydWN0ZWQhXCI7XHJcbi8qKlxyXG4gKiBAYXV0aG9yIFB1cmVNVkMgSlMgTmF0aXZlIFBvcnQgYnkgRGF2aWQgRm9sZXksIEZyw6lkw6lyaWMgU2F1bmllciwgJiBBbGFpbiBEdWNoZXNuZWF1XHJcbiAqIEBhdXRob3IgQ29weXJpZ2h0KGMpIDIwMDYtMjAxMiBGdXR1cmVzY2FsZSwgSW5jLiwgU29tZSByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIEBjbGFzcyBwdXJlbXZjLk1vZGVsXHJcbiAqXHJcbiAqIEEgTXVsdGl0b24gTW9kZWwgaW1wbGVtZW50YXRpb24uXHJcbiAqXHJcbiAqIEluIFB1cmVNVkMsIHRoZSBNb2RlbCBjbGFzcyBwcm92aWRlc1xyXG4gKiBhY2Nlc3MgdG8gbW9kZWwgb2JqZWN0cyAoUHJveGllcykgYnkgbmFtZWQgbG9va3VwLlxyXG4gKlxyXG4gKiBUaGUgTW9kZWwgYXNzdW1lcyB0aGVzZSByZXNwb25zaWJpbGl0aWVzOlxyXG4gKlxyXG4gKiAtIE1haW50YWluIGEgY2FjaGUgb2Yge0BsaW5rIHB1cmVtdmMuUHJveHkgUHJveHl9XHJcbiAqICAgaW5zdGFuY2VzLlxyXG4gKiAtIFByb3ZpZGUgbWV0aG9kcyBmb3IgcmVnaXN0ZXJpbmcsIHJldHJpZXZpbmcsIGFuZCByZW1vdmluZ1xyXG4gKiAgIHtAbGluayBwdXJlbXZjLlByb3h5IFByb3h5fSBpbnN0YW5jZXMuXHJcbiAqXHJcbiAqIFlvdXIgYXBwbGljYXRpb24gbXVzdCByZWdpc3RlclxyXG4gKiB7QGxpbmsgcHVyZW12Yy5Qcm94eSBQcm94eX0gaW5zdGFuY2VzIHdpdGggdGhlIE1vZGVsLlxyXG4gKiBUeXBpY2FsbHksIHlvdSB1c2UgYVxyXG4gKiB7QGxpbmsgcHVyZW12Yy5TaW1wbGVDb21tYW5kIFNpbXBsZUNvbW1hbmR9XHJcbiAqIG9yXHJcbiAqIHtAbGluayBwdXJlbXZjLk1hY3JvQ29tbWFuZCBNYWNyb0NvbW1hbmR9XHJcbiAqIHRvIGNyZWF0ZSBhbmQgcmVnaXN0ZXIgUHJveHkgaW5zdGFuY2VzIG9uY2UgdGhlIEZhY2FkZSBoYXMgaW5pdGlhbGl6ZWQgdGhlXHJcbiAqICpDb3JlKiBhY3RvcnMuXHJcbiAqXHJcbiAqIFRoaXMgTW9kZWwgaW1wbGVtZW50YXRpb24gaXMgYSBNdWx0aXRvbiwgc28geW91IHNob3VsZCBub3QgY2FsbCB0aGVcclxuICogY29uc3RydWN0b3IgZGlyZWN0bHksIGJ1dCBpbnN0ZWFkIGNhbGwgdGhlXHJcbiAqIHtAbGluayAjZ2V0SW5zdGFuY2Ugc3RhdGljIE11bHRpdG9uIEZhY3RvcnkgbWV0aG9kfVxyXG4gKiBAY29uc3RydWN0b3JcclxuICogQHBhcmFtIHtzdHJpbmd9IGtleVxyXG4gKiAgVGhlIE1vZGVscyBtdWx0aXRvbiBrZXlcclxuICogQHRocm93cyB7RXJyb3J9XHJcbiAqICBBbiBlcnJvciBpcyB0aHJvd24gaWYgdGhpcyBtdWx0aXRvbnMga2V5IGlzIGFscmVhZHkgaW4gdXNlIGJ5IGFub3RoZXIgaW5zdGFuY2VcclxuICovXHJcbmZ1bmN0aW9uIE1vZGVsKGtleSlcclxue1xyXG4gICAgaWYoTW9kZWwuaW5zdGFuY2VNYXBba2V5XSlcclxuICAgIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoTW9kZWwuTVVMVElUT05fTVNHKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm11bHRpdG9uS2V5PSBrZXk7XHJcbiAgICBNb2RlbC5pbnN0YW5jZU1hcFtrZXldPSB0aGlzO1xyXG4gICAgdGhpcy5wcm94eU1hcD0gW107XHJcbiAgICB0aGlzLmluaXRpYWxpemVNb2RlbCgpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemUgdGhlIE1vZGVsIGluc3RhbmNlLlxyXG4gKlxyXG4gKiBDYWxsZWQgYXV0b21hdGljYWxseSBieSB0aGUgY29uc3RydWN0b3IsIHRoaXNcclxuICogaXMgeW91ciBvcHBvcnR1bml0eSB0byBpbml0aWFsaXplIHRoZSBTaW5nbGV0b25cclxuICogaW5zdGFuY2UgaW4geW91ciBzdWJjbGFzcyB3aXRob3V0IG92ZXJyaWRpbmcgdGhlXHJcbiAqIGNvbnN0cnVjdG9yLlxyXG4gKlxyXG4gKiBAcmV0dXJuIHZvaWRcclxuICovXHJcbk1vZGVsLnByb3RvdHlwZS5pbml0aWFsaXplTW9kZWw9IGZ1bmN0aW9uKCl7fTtcclxuXHJcblxyXG4vKipcclxuICogTW9kZWwgTXVsdGl0b24gRmFjdG9yeSBtZXRob2QuXHJcbiAqIE5vdGUgdGhhdCB0aGlzIG1ldGhvZCB3aWxsIHJldHVybiBudWxsIGlmIHN1cHBsaWVkIGEgbnVsbFxyXG4gKiBvciB1bmRlZmluZWQgbXVsdGl0b24ga2V5LlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5XHJcbiAqICBUaGUgbXVsdGl0b24ga2V5IGZvciB0aGUgTW9kZWwgdG8gcmV0cmlldmVcclxuICogQHJldHVybiB7cHVyZW12Yy5Nb2RlbH1cclxuICogIHRoZSBpbnN0YW5jZSBmb3IgdGhpcyBNdWx0aXRvbiBrZXlcclxuICovXHJcbk1vZGVsLmdldEluc3RhbmNlPSBmdW5jdGlvbihrZXkpXHJcbntcclxuICAgIGlmIChudWxsID09IGtleSlcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuXHJcbiAgICBpZihNb2RlbC5pbnN0YW5jZU1hcFtrZXldID09IG51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgTW9kZWwuaW5zdGFuY2VNYXBba2V5XT0gbmV3IE1vZGVsKGtleSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIE1vZGVsLmluc3RhbmNlTWFwW2tleV07XHJcbn07XHJcblxyXG4vKipcclxuICogUmVnaXN0ZXIgYSBQcm94eSB3aXRoIHRoZSBNb2RlbFxyXG4gKiBAcGFyYW0ge3B1cmVtdmMuUHJveHl9XHJcbiAqL1xyXG5Nb2RlbC5wcm90b3R5cGUucmVnaXN0ZXJQcm94eT0gZnVuY3Rpb24ocHJveHkpXHJcbntcclxuICAgIHByb3h5LmluaXRpYWxpemVOb3RpZmllcih0aGlzLm11bHRpdG9uS2V5KTtcclxuICAgIHRoaXMucHJveHlNYXBbcHJveHkuZ2V0UHJveHlOYW1lKCldPSBwcm94eTtcclxuICAgIHByb3h5Lm9uUmVnaXN0ZXIoKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXRyaWV2ZSBhIFByb3h5IGZyb20gdGhlIE1vZGVsXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm94eU5hbWVcclxuICogQHJldHVybiB7cHVyZW12Yy5Qcm94eX1cclxuICogIFRoZSBQcm94eSBpbnN0YW5jZSBwcmV2aW91c2x5IHJlZ2lzdGVyZWQgd2l0aCB0aGUgcHJvdmlkZWQgcHJveHlOYW1lXHJcbiAqL1xyXG5Nb2RlbC5wcm90b3R5cGUucmV0cmlldmVQcm94eT0gZnVuY3Rpb24ocHJveHlOYW1lKVxyXG57XHJcbiAgICByZXR1cm4gdGhpcy5wcm94eU1hcFtwcm94eU5hbWVdO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIGEgUHJveHkgaXMgcmVnaXN0ZXJlZFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJveHlOYW1lXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAqICB3aGV0aGVyIGEgUHJveHkgaXMgY3VycmVudGx5IHJlZ2lzdGVyZWQgd2l0aCB0aGUgZ2l2ZW4gcHJveHlOYW1lLlxyXG4gKi9cclxuTW9kZWwucHJvdG90eXBlLmhhc1Byb3h5PSBmdW5jdGlvbihwcm94eU5hbWUpXHJcbntcclxuICAgIHJldHVybiB0aGlzLnByb3h5TWFwW3Byb3h5TmFtZV0gIT0gbnVsbDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmUgYSBQcm94eSBmcm9tIHRoZSBNb2RlbC5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHByb3h5TmFtZVxyXG4gKiAgVGhlIG5hbWUgb2YgdGhlIFByb3h5IGluc3RhbmNlIHRvIHJlbW92ZVxyXG4gKiBAcmV0dXJuIHtwdXJlbXZjLlByb3h5fVxyXG4gKiAgVGhlIFByb3h5IHRoYXQgd2FzIHJlbW92ZWQgZnJvbSB0aGUgTW9kZWxcclxuICovXHJcbk1vZGVsLnByb3RvdHlwZS5yZW1vdmVQcm94eT0gZnVuY3Rpb24ocHJveHlOYW1lKVxyXG57XHJcbiAgICB2YXIgcHJveHk9IHRoaXMucHJveHlNYXBbcHJveHlOYW1lXTtcclxuICAgIGlmKHByb3h5KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMucHJveHlNYXBbcHJveHlOYW1lXT0gbnVsbDtcclxuICAgICAgICBwcm94eS5vblJlbW92ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBwcm94eTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAc3RhdGljXHJcbiAqIFJlbW92ZSBhIE1vZGVsIGluc3RhbmNlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5XHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5Nb2RlbC5yZW1vdmVNb2RlbD0gZnVuY3Rpb24oa2V5KVxyXG57XHJcbiAgICBkZWxldGUgTW9kZWwuaW5zdGFuY2VNYXBba2V5XTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqIFRoZSBtYXAgdXNlZCBieSB0aGUgTW9kZWwgdG8gc3RvcmUgUHJveHkgaW5zdGFuY2VzLlxyXG4gKlxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEB0eXBlIEFycmF5XHJcbiAqL1xyXG5Nb2RlbC5wcm90b3R5cGUucHJveHlNYXA9IG51bGw7XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKiBUaGUgbWFwIHVzZWQgYnkgdGhlIE1vZGVsIHRvIHN0b3JlIG11bHRpdG9uIGluc3RhbmNlc1xyXG4gKlxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEBzdGF0aWNcclxuICogQHR5cGUgQXJyYXlcclxuICovXHJcbk1vZGVsLmluc3RhbmNlTWFwPSBbXTtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqIFRoZSBNb2RlbHMgbXVsdGl0b24ga2V5LlxyXG4gKlxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEB0eXBlIHN0cmluZ1xyXG4gKi9cclxuTW9kZWwucHJvdG90eXBlLm11bHRpdG9uS2V5O1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICogTWVzc2FnZSBDb25zdGFudHNcclxuICpcclxuICogQHN0YXRpY1xyXG4gKiBAdHlwZSB7c3RyaW5nfVxyXG4gKi9cclxuTW9kZWwuTVVMVElUT05fTVNHPSBcIk1vZGVsIGluc3RhbmNlIGZvciB0aGlzIE11bHRpdG9uIGtleSBhbHJlYWR5IGNvbnN0cnVjdGVkIVwiO1xyXG4vKipcclxuICogQGF1dGhvciBQdXJlTVZDIEpTIE5hdGl2ZSBQb3J0IGJ5IERhdmlkIEZvbGV5LCBGcsOpZMOpcmljIFNhdW5pZXIsICYgQWxhaW4gRHVjaGVzbmVhdVxyXG4gKiBAYXV0aG9yIENvcHlyaWdodChjKSAyMDA2LTIwMTIgRnV0dXJlc2NhbGUsIEluYy4sIFNvbWUgcmlnaHRzIHJlc2VydmVkLlxyXG4gKlxyXG4gKiBAY2xhc3MgcHVyZW12Yy5Db250cm9sbGVyXHJcbiAqXHJcbiAqIEluIFB1cmVNVkMsIHRoZSBDb250cm9sbGVyIGNsYXNzIGZvbGxvd3MgdGhlICdDb21tYW5kIGFuZCBDb250cm9sbGVyJ1xyXG4gKiBzdHJhdGVneSwgYW5kIGFzc3VtZXMgdGhlc2UgcmVzcG9uc2liaWxpdGllczpcclxuICpcclxuICogLSBSZW1lbWJlcmluZyB3aGljaFxyXG4gKiB7QGxpbmsgcHVyZW12Yy5TaW1wbGVDb21tYW5kIFNpbXBsZUNvbW1hbmR9c1xyXG4gKiBvclxyXG4gKiB7QGxpbmsgcHVyZW12Yy5NYWNyb0NvbW1hbmQgTWFjcm9Db21tYW5kfXNcclxuICogYXJlIGludGVuZGVkIHRvIGhhbmRsZSB3aGljaFxyXG4gKiB7QGxpbmsgcHVyZW12Yy5Ob3RpZmljYXRpb24gTm90aWZpY2F0aW9ufXNcclxuICogLSBSZWdpc3RlcmluZyBpdHNlbGYgYXMgYW5cclxuICoge0BsaW5rIHB1cmVtdmMuT2JzZXJ2ZXIgT2JzZXJ2ZXJ9IHdpdGhcclxuICogdGhlIHtAbGluayBwdXJlbXZjLlZpZXcgVmlld30gZm9yIGVhY2hcclxuICoge0BsaW5rIHB1cmVtdmMuTm90aWZpY2F0aW9uIE5vdGlmaWNhdGlvbn1cclxuICogdGhhdCBpdCBoYXMgYW5cclxuICoge0BsaW5rIHB1cmVtdmMuU2ltcGxlQ29tbWFuZCBTaW1wbGVDb21tYW5kfVxyXG4gKiBvciB7QGxpbmsgcHVyZW12Yy5NYWNyb0NvbW1hbmQgTWFjcm9Db21tYW5kfVxyXG4gKiBtYXBwaW5nIGZvci5cclxuICogLSBDcmVhdGluZyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgcHJvcGVyXHJcbiAqIHtAbGluayBwdXJlbXZjLlNpbXBsZUNvbW1hbmQgU2ltcGxlQ29tbWFuZH1zXHJcbiAqIG9yXHJcbiAqIHtAbGluayBwdXJlbXZjLk1hY3JvQ29tbWFuZCBNYWNyb0NvbW1hbmR9c1xyXG4gKiB0byBoYW5kbGUgYSBnaXZlblxyXG4gKiB7QGxpbmsgcHVyZW12Yy5Ob3RpZmljYXRpb24gTm90aWZpY2F0aW9ufVxyXG4gKiB3aGVuIG5vdGlmaWVkIGJ5IHRoZVxyXG4gKiB7QGxpbmsgcHVyZW12Yy5WaWV3IFZpZXd9LlxyXG4gKiAtIENhbGxpbmcgdGhlIGNvbW1hbmQncyBleGVjdXRlIG1ldGhvZCwgcGFzc2luZyBpbiB0aGVcclxuICoge0BsaW5rIHB1cmVtdmMuTm90aWZpY2F0aW9uIE5vdGlmaWNhdGlvbn0uXHJcbiAqXHJcbiAqIFlvdXIgYXBwbGljYXRpb24gbXVzdCByZWdpc3RlclxyXG4gKiB7QGxpbmsgcHVyZW12Yy5TaW1wbGVDb21tYW5kIFNpbXBsZUNvbW1hbmR9c1xyXG4gKiBvciB7QGxpbmsgcHVyZW12Yy5NYWNyb0NvbW1hbmQgTWFjcm9Db21tYW5kfXNcclxuICogd2l0aCB0aGUgQ29udHJvbGxlci5cclxuICpcclxuICogVGhlIHNpbXBsZXN0IHdheSBpcyB0byBzdWJjbGFzc1xyXG4gKiB7QGxpbmsgcHVyZW12Yy5GYWNhZGUgRmFjYWRlfSxcclxuICogYW5kIHVzZSBpdHNcclxuICoge0BsaW5rIHB1cmVtdmMuRmFjYWRlI2luaXRpYWxpemVDb250cm9sbGVyIGluaXRpYWxpemVDb250cm9sbGVyfVxyXG4gKiBtZXRob2QgdG8gYWRkIHlvdXIgcmVnaXN0cmF0aW9ucy5cclxuICpcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqIFRoaXMgQ29udHJvbGxlciBpbXBsZW1lbnRhdGlvbiBpcyBhIE11bHRpdG9uLCBzbyB5b3Ugc2hvdWxkIG5vdCBjYWxsIHRoZVxyXG4gKiBjb25zdHJ1Y3RvciBkaXJlY3RseSwgYnV0IGluc3RlYWQgY2FsbCB0aGUgc3RhdGljICNnZXRJbnN0YW5jZSBmYWN0b3J5IG1ldGhvZCxcclxuICogcGFzc2luZyB0aGUgdW5pcXVlIGtleSBmb3IgdGhpcyBpbnN0YW5jZSB0byBpdC5cclxuICogQHBhcmFtIHtzdHJpbmd9IGtleVxyXG4gKiBAdGhyb3dzIHtFcnJvcn1cclxuICogIElmIGluc3RhbmNlIGZvciB0aGlzIE11bHRpdG9uIGtleSBoYXMgYWxyZWFkeSBiZWVuIGNvbnN0cnVjdGVkXHJcbiAqL1xyXG5mdW5jdGlvbiBDb250cm9sbGVyKGtleSlcclxue1xyXG4gICAgaWYoQ29udHJvbGxlci5pbnN0YW5jZU1hcFtrZXldICE9IG51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKENvbnRyb2xsZXIuTVVMVElUT05fTVNHKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm11bHRpdG9uS2V5PSBrZXk7XHJcbiAgICBDb250cm9sbGVyLmluc3RhbmNlTWFwW3RoaXMubXVsdGl0b25LZXldPSB0aGlzO1xyXG4gICAgdGhpcy5jb21tYW5kTWFwPSBuZXcgQXJyYXkoKTtcclxuICAgIHRoaXMuaW5pdGlhbGl6ZUNvbnRyb2xsZXIoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICpcclxuICogSW5pdGlhbGl6ZSB0aGUgbXVsdGl0b24gQ29udHJvbGxlciBpbnN0YW5jZS5cclxuICpcclxuICogQ2FsbGVkIGF1dG9tYXRpY2FsbHkgYnkgdGhlIGNvbnN0cnVjdG9yLlxyXG4gKlxyXG4gKiBOb3RlIHRoYXQgaWYgeW91IGFyZSB1c2luZyBhIHN1YmNsYXNzIG9mIFZpZXdcclxuICogaW4geW91ciBhcHBsaWNhdGlvbiwgeW91IHNob3VsZCAqYWxzbyogc3ViY2xhc3MgQ29udHJvbGxlclxyXG4gKiBhbmQgb3ZlcnJpZGUgdGhlIGluaXRpYWxpemVDb250cm9sbGVyIG1ldGhvZCBpbiB0aGVcclxuICogZm9sbG93aW5nIHdheS5cclxuICpcclxuICogICAgIE15Q29udHJvbGxlci5wcm90b3R5cGUuaW5pdGlhbGl6ZUNvbnRyb2xsZXI9IGZ1bmN0aW9uICgpXHJcbiAqICAgICB7XHJcbiAqICAgICAgICAgdGhpcy52aWV3PSBNeVZpZXcuZ2V0SW5zdGFuY2UodGhpcy5tdWx0aXRvbktleSk7XHJcbiAqICAgICB9O1xyXG4gKlxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuQ29udHJvbGxlci5wcm90b3R5cGUuaW5pdGlhbGl6ZUNvbnRyb2xsZXI9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgdGhpcy52aWV3PSBWaWV3LmdldEluc3RhbmNlKHRoaXMubXVsdGl0b25LZXkpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRoZSBDb250cm9sbGVycyBtdWx0aXRvbiBmYWN0b3J5IG1ldGhvZC5cclxuICogTm90ZSB0aGF0IHRoaXMgbWV0aG9kIHdpbGwgcmV0dXJuIG51bGwgaWYgc3VwcGxpZWQgYSBudWxsXHJcbiAqIG9yIHVuZGVmaW5lZCBtdWx0aXRvbiBrZXkuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcclxuICogIEEgQ29udHJvbGxlcidzIG11bHRpdG9uIGtleVxyXG4gKiBAcmV0dXJuIHtwdXJlbXZjLkNvbnRyb2xsZXJ9XHJcbiAqICB0aGUgTXVsdGl0b24gaW5zdGFuY2Ugb2YgQ29udHJvbGxlclxyXG4gKi9cclxuQ29udHJvbGxlci5nZXRJbnN0YW5jZT0gZnVuY3Rpb24oa2V5KVxyXG57XHJcbiAgICBpZiAobnVsbCA9PSBrZXkpXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgaWYobnVsbCA9PSB0aGlzLmluc3RhbmNlTWFwW2tleV0pXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZU1hcFtrZXldPSBuZXcgdGhpcyhrZXkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLmluc3RhbmNlTWFwW2tleV07XHJcbn07XHJcblxyXG4vKipcclxuICogSWYgYSBTaW1wbGVDb21tYW5kIG9yIE1hY3JvQ29tbWFuZCBoYXMgcHJldmlvdXNseSBiZWVuIHJlZ2lzdGVyZWQgdG8gaGFuZGxlXHJcbiAqIHRoZSBnaXZlbiBOb3RpZmljYXRpb24gdGhlbiBpdCBpcyBleGVjdXRlZC5cclxuICpcclxuICogQHBhcmFtIHtwdXJlbXZjLk5vdGlmaWNhdGlvbn0gbm90ZVxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuQ29udHJvbGxlci5wcm90b3R5cGUuZXhlY3V0ZUNvbW1hbmQ9IGZ1bmN0aW9uKG5vdGUpXHJcbntcclxuICAgIHZhciBjb21tYW5kQ2xhc3NSZWY9IHRoaXMuY29tbWFuZE1hcFtub3RlLmdldE5hbWUoKV07XHJcbiAgICBpZihjb21tYW5kQ2xhc3NSZWYgPT0gbnVsbClcclxuICAgICAgICByZXR1cm47XHJcblxyXG4gICAgdmFyIGNvbW1hbmRJbnN0YW5jZT0gbmV3IGNvbW1hbmRDbGFzc1JlZigpO1xyXG4gICAgY29tbWFuZEluc3RhbmNlLmluaXRpYWxpemVOb3RpZmllcih0aGlzLm11bHRpdG9uS2V5KTtcclxuICAgIGNvbW1hbmRJbnN0YW5jZS5leGVjdXRlKG5vdGUpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlZ2lzdGVyIGEgcGFydGljdWxhciBTaW1wbGVDb21tYW5kIG9yIE1hY3JvQ29tbWFuZCBjbGFzcyBhcyB0aGUgaGFuZGxlciBmb3JcclxuICogYSBwYXJ0aWN1bGFyIE5vdGlmaWNhdGlvbi5cclxuICpcclxuICogSWYgYW4gY29tbWFuZCBhbHJlYWR5IGJlZW4gcmVnaXN0ZXJlZCB0byBoYW5kbGUgTm90aWZpY2F0aW9ucyB3aXRoIHRoaXMgbmFtZSxcclxuICogaXQgaXMgbm8gbG9uZ2VyIHVzZWQsIHRoZSBuZXcgY29tbWFuZCBpcyB1c2VkIGluc3RlYWQuXHJcbiAqXHJcbiAqIFRoZSBPYnNlcnZlciBmb3IgdGhlIG5ldyBjb21tYW5kIGlzIG9ubHkgY3JlYXRlZCBpZiB0aGlzIHRoZSBpcnN0IHRpbWUgYVxyXG4gKiBjb21tYW5kIGhhcyBiZWVuIHJlZ2lzZXJlZCBmb3IgdGhpcyBOb3RpZmljYXRpb24gbmFtZS5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG5vdGlmaWNhdGlvbk5hbWVcclxuICogIHRoZSBuYW1lIG9mIHRoZSBOb3RpZmljYXRpb25cclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY29tbWFuZENsYXNzUmVmXHJcbiAqICBhIGNvbW1hbmQgY29uc3RydWN0b3JcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbkNvbnRyb2xsZXIucHJvdG90eXBlLnJlZ2lzdGVyQ29tbWFuZD0gZnVuY3Rpb24obm90aWZpY2F0aW9uTmFtZSwgY29tbWFuZENsYXNzUmVmKVxyXG57XHJcbiAgICBpZih0aGlzLmNvbW1hbmRNYXBbbm90aWZpY2F0aW9uTmFtZV0gPT0gbnVsbClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnZpZXcucmVnaXN0ZXJPYnNlcnZlcihub3RpZmljYXRpb25OYW1lLCBuZXcgT2JzZXJ2ZXIodGhpcy5leGVjdXRlQ29tbWFuZCwgdGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY29tbWFuZE1hcFtub3RpZmljYXRpb25OYW1lXT0gY29tbWFuZENsYXNzUmVmO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIGEgY29tbWFuZCBpcyByZWdpc3RlcmVkIGZvciBhIGdpdmVuIE5vdGlmaWNhdGlvblxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbm90aWZpY2F0aW9uTmFtZVxyXG4gKiBAcmV0dXJuIHtib29sZWFufVxyXG4gKiAgd2hldGhlciBhIENvbW1hbmQgaXMgY3VycmVudGx5IHJlZ2lzdGVyZWQgZm9yIHRoZSBnaXZlbiBub3RpZmljYXRpb25OYW1lLlxyXG4gKi9cclxuQ29udHJvbGxlci5wcm90b3R5cGUuaGFzQ29tbWFuZD0gZnVuY3Rpb24obm90aWZpY2F0aW9uTmFtZSlcclxue1xyXG4gICAgcmV0dXJuIHRoaXMuY29tbWFuZE1hcFtub3RpZmljYXRpb25OYW1lXSAhPSBudWxsO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSBhIHByZXZpb3VzbHkgcmVnaXN0ZXJlZCBjb21tYW5kIHRvXHJcbiAqIHtAbGluayBwdXJlbXZjLk5vdGlmaWNhdGlvbiBOb3RpZmljYXRpb259XHJcbiAqIG1hcHBpbmcuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBub3RpZmljYXRpb25OYW1lXHJcbiAqICB0aGUgbmFtZSBvZiB0aGUgTm90aWZpY2F0aW9uIHRvIHJlbW92ZSB0aGUgY29tbWFuZCBtYXBwaW5nIGZvclxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuQ29udHJvbGxlci5wcm90b3R5cGUucmVtb3ZlQ29tbWFuZD0gZnVuY3Rpb24obm90aWZpY2F0aW9uTmFtZSlcclxue1xyXG4gICAgaWYodGhpcy5oYXNDb21tYW5kKG5vdGlmaWNhdGlvbk5hbWUpKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudmlldy5yZW1vdmVPYnNlcnZlcihub3RpZmljYXRpb25OYW1lLCB0aGlzKTtcclxuICAgICAgICB0aGlzLmNvbW1hbmRNYXBbbm90aWZpY2F0aW9uTmFtZV09IG51bGw7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogQHN0YXRpY1xyXG4gKiBSZW1vdmUgYSBDb250cm9sbGVyIGluc3RhbmNlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5XHJcbiAqICBtdWx0aXRvbktleSBvZiBDb250cm9sbGVyIGluc3RhbmNlIHRvIHJlbW92ZVxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuQ29udHJvbGxlci5yZW1vdmVDb250cm9sbGVyPSBmdW5jdGlvbihrZXkpXHJcbntcclxuICAgIGRlbGV0ZSB0aGlzLmluc3RhbmNlTWFwW2tleV07XHJcbn07XHJcblxyXG4vKipcclxuICogTG9jYWwgcmVmZXJlbmNlIHRvIHRoZSBDb250cm9sbGVyJ3MgVmlld1xyXG4gKlxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEB0eXBlIHtwdXJlbXZjLlZpZXd9XHJcbiAqL1xyXG5Db250cm9sbGVyLnByb3RvdHlwZS52aWV3PSBudWxsO1xyXG5cclxuLyoqXHJcbiAqIE5vdGUgbmFtZSB0byBjb21tYW5kIGNvbnN0cnVjdG9yIG1hcHBpbmdzXHJcbiAqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQHR5cGUge09iamVjdH1cclxuICovXHJcbkNvbnRyb2xsZXIucHJvdG90eXBlLmNvbW1hbmRNYXA9IG51bGw7XHJcblxyXG4vKipcclxuICogVGhlIENvbnRyb2xsZXIncyBtdWx0aXRvbiBrZXlcclxuICpcclxuICogQHByb3RlY3RlZFxyXG4gKiBAdHlwZSB7c3RyaW5nfVxyXG4gKi9cclxuQ29udHJvbGxlci5wcm90b3R5cGUubXVsdGl0b25LZXk9IG51bGw7XHJcblxyXG4vKipcclxuICogTXVsdGl0b24ga2V5IHRvIENvbnRyb2xsZXIgaW5zdGFuY2UgbWFwcGluZ3NcclxuICpcclxuICogQHN0YXRpY1xyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEB0eXBlIHtPYmplY3R9XHJcbiAqL1xyXG5Db250cm9sbGVyLmluc3RhbmNlTWFwPSBbXTtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqXHJcbiAqIE1lc3NhZ2UgY29uc3RhbnRzXHJcbiAqIEBzdGF0aWNcclxuICogQHByb3RlY3RlZFxyXG4gKiBAdHlwZSB7c3RyaW5nfVxyXG4gKi9cclxuQ29udHJvbGxlci5NVUxUSVRPTl9NU0c9IFwiY29udHJvbGxlciBrZXkgZm9yIHRoaXMgTXVsdGl0b24ga2V5IGFscmVhZHkgY29uc3RydWN0ZWRcIlxyXG4vKlxyXG4gKiBAYXV0aG9yIFB1cmVNVkMgSlMgTmF0aXZlIFBvcnQgYnkgRGF2aWQgRm9sZXksIEZyw6lkw6lyaWMgU2F1bmllciwgJiBBbGFpbiBEdWNoZXNuZWF1IFxyXG4gKiBAYXV0aG9yIENvcHlyaWdodChjKSAyMDA2LTIwMTIgRnV0dXJlc2NhbGUsIEluYy4sIFNvbWUgcmlnaHRzIHJlc2VydmVkLlxyXG4gKiBcclxuICogQGhpZGVcclxuICogQSBhbiBpbnRlcm5hbCBoZWxwZXIgY2xhc3MgdXNlZCB0byBhc3Npc3QgY2xhc3NsZXQgaW1wbGVtZW50YXRpb24uIFRoaXNcclxuICogY2xhc3MgaXMgbm90IGFjY2Vzc2libGUgYnkgY2xpZW50IGNvZGUuXHJcbiAqL1xyXG52YXIgT29wSGVscD1cclxue1xyXG4gICAgLypcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBBIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIHNjb3BlLiBXZSB1c2UgdGhpcyByYXRoZXIgdGhhbiB3aW5kb3dcclxuICAgICAqIGluIG9yZGVyIHRvIHN1cHBvcnQgYm90aCBicm93c2VyIGJhc2VkIGFuZCBub24gYnJvd3NlciBiYWVkIFxyXG4gICAgICogSmF2YVNjcmlwdCBpbnRlcnByZXRlcnMuXHJcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICovXHJcbiAgICBnbG9iYWw6IChmdW5jdGlvbigpe3JldHVybiB0aGlzfSkoKVxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogRXh0ZW5kIG9uZSBGdW5jdGlvbidzIHByb3RvdHlwZSBieSBhbm90aGVyLCBlbXVsYXRpbmcgY2xhc3NpY1xyXG4gICAgICogaW5oZXJpdGFuY2UuXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNoaWxkXHJcbiAgICAgKiAgVGhlIEZ1bmN0aW9uIHRvIGV4dGVuZCAoc3ViY2xhc3MpXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHBhcmVudFxyXG4gICAgICogIFRoZSBGdW5jdGlvbiB0byBleHRlbmQgZnJvbSAoc3VwZXJjbGFzcylcclxuICAgICAqIFxyXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259XHJcbiAgICAgKiBcclxuICAgICAqICBBIHJlZmVyZW5jZSB0byB0aGUgZXh0ZW5kZWQgRnVuY3Rpb24gKHN1YmNsYXNzKVxyXG4gICAgICovXHJcbiAgICAsICAgZXh0ZW5kOiBmdW5jdGlvbiAoY2hpbGQsIHBhcmVudClcclxue1xyXG4gICAgaWYgKCdmdW5jdGlvbicgIT09IHR5cGVvZiBjaGlsZClcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCcjZXh0ZW5kLSBjaGlsZCBzaG91bGQgYmUgRnVuY3Rpb24nKTtcclxuXHJcbiAgICBpZiAoJ2Z1bmN0aW9uJyAhPT0gdHlwZW9mIHBhcmVudClcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCcjZXh0ZW5kLSBwYXJlbnQgc2hvdWxkIGJlIEZ1bmN0aW9uJyk7XHJcblxyXG4gICAgaWYgKHBhcmVudCA9PT0gY2hpbGQpXHJcbiAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgIHZhciBUcmFuc2l0aXZlPSBuZXcgRnVuY3Rpb247XHJcbiAgICBUcmFuc2l0aXZlLnByb3RvdHlwZT0gcGFyZW50LnByb3RvdHlwZTtcclxuICAgIGNoaWxkLnByb3RvdHlwZT0gbmV3IFRyYW5zaXRpdmU7XHJcbiAgICByZXR1cm4gY2hpbGQucHJvdG90eXBlLmNvbnN0cnVjdG9yPSBjaGlsZDtcclxufVxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogRGVjb2FyYXRlIG9uZSBvYmplY3Qgd2l0aCB0aGUgcHJvcGVydGllcyBvZiBhbm90aGVyLiBcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdFxyXG4gICAgICogIFRoZSBvYmplY3QgdG8gZGVjb3JhdGUuXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSB0cmFpdHNcclxuICAgICAqICBUaGUgb2JqZWN0IHByb3ZpZGluZyB0aGUgcHJvcGVyaXRlcyB0aGF0IHRoZSBmaXJzdCBvYmplY3RcclxuICAgICAqICB3aWxsIGJlIGRlY29yYXRlZCB3aXRoLiBOb3RlIHRoYXQgb25seSBwcm9wZXJ0aWVzIGRlZmluZWQgb24gXHJcbiAgICAgKiAgdGhpcyBvYmplY3Qgd2lsbCBiZSBjb3BpZWQtIGkuZS4gaW5oZXJpdGVkIHByb3BlcnRpZXMgd2lsbFxyXG4gICAgICogIGJlIGlnbm9yZWQuXHJcbiAgICAgKiBcclxuICAgICAqIEByZXR1cm4ge09iamVjdH1cclxuICAgICAqICBUSGUgZGVjb3JhdGVkIG9iamVjdCAoZmlyc3QgYXJndW1lbnQpXHJcbiAgICAgKi9cclxuICAgICwgICBkZWNvcmF0ZTogZnVuY3Rpb24gKG9iamVjdCwgdHJhaXRzKVxyXG57XHJcbiAgICBmb3IgKHZhciBhY2Nlc3NvciBpbiB0cmFpdHMpXHJcbiAgICB7XHJcbiAgICAgICAgb2JqZWN0W2FjY2Vzc29yXT0gdHJhaXRzW2FjY2Vzc29yXTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb2JqZWN0O1xyXG59XHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIEBtZW1iZXIgcHVyZW12Y1xyXG4gKlxyXG4gKiBEZWNsYXJlIGEgbmFtZXNwYWNlIGFuZCBvcHRpb25hbGx5IG1ha2UgYW4gT2JqZWN0IHRoZSByZWZlcmVudFxyXG4gKiBvZiB0aGF0IG5hbWVzcGFjZS5cclxuICpcclxuICogICAgIGNvbnNvbGUuYXNzZXJ0KG51bGwgPT0gd2luZG93LnRsZCwgJ05vIHRsZCBuYW1lc3BhY2UnKTtcclxuICogICAgIC8vIGRlY2xhcmUgdGhlIHRsZCBuYW1lc3BhY2VcclxuICogICAgIHB1cmVtdmMuZGVjbGFyZSgndGxkJyk7XHJcbiAqICAgICBjb25zb2xlLmFzc2VydCgnb2JqZWN0JyA9PT0gdHlwZW9mIHRsZCwgJ1RoZSB0bGQgbmFtZXNwYWNlIHdhcyBkZWNsYXJlZCcpO1xyXG4gKlxyXG4gKiAgICAgLy8gdGhlIG1ldGhvZCByZXR1cm5zIGEgcmVmZXJlbmNlIHRvIGxhc3QgbmFtZXNwYWNlIG5vZGUgaW4gYSBjcmVhdGVkIGhpZXJhcmNoeVxyXG4gKiAgICAgdmFyIHJlZmVyZW5jZT0gcHVyZW12Yy5kZWNsYXJlKCd0bGQuZG9tYWluLmFwcCcpO1xyXG4gKiAgICAgY29uc29sZS5hc3NlcnQocmVmZXJlbmNlID09PSB0bGQuZG9tYWluLmFwcClcclxuICpcclxuICogICAgIC8vIG9mIGNvdXJzZSB5b3UgY2FuIGFsc28gZGVjbGFyZSB5b3VyIG93biBvYmplY3RzIGFzIHdlbGxcclxuICogICAgIHZhciBBcHBDb25zdGFudHM9XHJcbiAqICAgICAgICAge1xyXG4gKiBcdCAgICAgICAgICAgQVBQX05BTUU6ICd0bGQuZG9tYWluLmFwcC5BcHAnXHJcbiAqICAgICAgICAgfTtcclxuICpcclxuICogICAgIHB1cmVtdmMuZGVjbGFyZSgndGxkLmRvbWFpbi5hcHAuQXBwQ29uc3RhbnRzJywgQXBwQ29uc3RhbnRzKTtcclxuICogICAgIGNvbnNvbGUuYXNzZXJ0KEFwcENvbnN0YW50cyA9PT0gdGxkLmRvbWFpbi5hcHAuQXBwQ29uc3RhbnRzXHJcbiAqIFx0ICAgLCAnQXBwQ29uc3RhbnRzIHdhcyBleHBvcnRlZCB0byB0aGUgbmFtZXNwYWNlJyk7XHJcbiAqXHJcbiAqIE5vdGUgdGhhdCB5b3UgY2FuIGFsc28gI2RlY2xhcmUgd2l0aGluIGEgY2xvc3VyZS4gVGhhdCB3YXkgeW91XHJcbiAqIGNhbiBzZWxlY3RpdmVseSBleHBvcnQgT2JqZWN0cyB0byB5b3VyIG93biBuYW1lc3BhY2VzIHdpdGhvdXRcclxuICogbGVha2luZyB2YXJpYWJsZXMgaW50byB0aGUgZ2xvYmFsIHNjb3BlLlxyXG4gKlxyXG4gKiAgICAgKGZ1bmN0aW9uKCl7XHJcbiAqICAgICAgICAgLy8gdGhpcyB2YXIgaXMgbm90IGFjY2Vzc2libGUgb3V0c2lkZSBvZiB0aGlzXHJcbiAqICAgICAgICAgLy8gY2xvc3VyZXMgY2FsbCBzY29wZVxyXG4gKiAgICAgICAgIHZhciBoaWRkZW5WYWx1ZT0gJ2RlZmF1bHRWYWx1ZSc7XHJcbiAqIFxyXG4gKiAgICAgICAgIC8vIGV4cG9ydCBhbiBvYmplY3QgdGhhdCByZWZlcmVuY2VzIHRoZSBoaWRkZW5cclxuICogICAgICAgICAvLyB2YXJpYWJsZSBhbmQgd2hpY2ggY2FuIG11dGF0ZSBpdFxyXG4gKiAgICAgICAgIHB1cmVtdmMuZGVjbGFyZVxyXG4gKiAgICAgICAgIChcclxuICogICAgICAgICAgICAgICd0bGQuZG9tYWluLmFwcC5iYWNrZG9vcidcclxuICogXHJcbiAqICAgICAgICAgLCAgICB7XHJcbiAqICAgICAgICAgICAgICAgICAgc2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSlcclxuICogICAgICAgICAgICAgICAgICB7XHJcbiAqICAgICAgICAgICAgICAgICAgICAgIC8vIGFzc2lnbnMgdG8gdGhlIGhpZGRlbiB2YXJcclxuICogICAgICAgICAgICAgICAgICAgICAgaGlkZGVuVmFsdWU9IHZhbHVlO1xyXG4gKiAgICAgICAgICAgICAgICAgIH1cclxuICogXHJcbiAqICAgICAgICAgLCAgICAgICAgZ2V0VmFsdWU6IGZ1bmN0aW9uICgpXHJcbiAqICAgICAgICAgICAgICAgICAge1xyXG4gKiAgICAgICAgICAgICAgICAgICAgICAvLyByZWFkcyBmcm9tIHRoZSBoaWRkZW4gdmFyXHJcbiAqICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBoaWRkZW5WYWx1ZTtcclxuICogICAgICAgICAgICAgICAgICB9XHJcbiAqICAgICAgICAgICAgICB9XHJcbiAqICAgICAgICAgKTtcclxuICogICAgIH0pKCk7XHJcbiAqICAgICAvLyBpbmRpcmVjdGx5IHJldHJpZXZlIHRoZSBoaWRkZW4gdmFyaWFibGVzIHZhbHVlXHJcbiAqICAgICBjb25zb2xlLmFzc2VydCgnZGVmYXVsdFZhbHVlJyA9PT0gdGxkLmRvbWFpbi5hcHAuYmFja2Rvb3IuZ2V0VmFsdWUoKSk7XHJcbiAqICAgICAvLyBpbmRpcmVjdGx5IHNldCB0aGUgaGlkZGVuIHZhcmlhYmxlcyB2YWx1ZVxyXG4gKiAgICAgdGxkLmRvbWFpbi5hcHAuYmFja2Rvb3Iuc2V0VmFsdWUoJ25ld1ZhbHVlJyk7XHJcbiAqICAgICAvLyB0aGUgaGlkZGVuIHZhciB3YXMgbXV0YXRlZFxyXG4gKiAgICAgY29uc29sZS5hc3NlcnQoJ25ld1ZhbHVlJyA9PT0gdGxkLmRvbWFpbi5hcHAuYmFja2Rvb3IuZ2V0VmFsdWUoKSk7XHJcbiAqXHJcbiAqIE9uIG9jY2FzaW9uLCBwcmltYXJpbHkgZHVyaW5nIHRlc3RpbmcsIHlvdSBtYXkgd2FudCB0byB1c2UgZGVjbGFyZSxcclxuICogYnV0IG5vdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGJlIHRoZSBuYW1lc3BhY2Ugcm9vdC4gSW4gdGhlc2UgY2FzZXMgeW91XHJcbiAqIGNhbiBzdXBwbHkgdGhlIG9wdGlvbmFsIHRoaXJkIHNjb3BlIGFyZ3VtZW50LlxyXG4gKlxyXG4gKiAgICAgdmFyIGxvY2FsU2NvcGU9IHt9XHJcbiAqICAgICAsICAgb2JqZWN0PSB7fVxyXG4gKlxyXG4gKiAgICAgcHVyZW12Yy5kZWNsYXJlKCdtb2NrLm9iamVjdCcsIG9iamVjdCwgbG9jYWxTY29wZSk7XHJcbiAqXHJcbiAqICAgICBjb25zb2xlLmFzc2VydChudWxsID09IHdpbmRvdy5tb2NrLCAnbW9jayBuYW1lc3BhY2UgaXMgbm90IGluIGdsb2JhbCBzY29wZScpO1xyXG4gKiAgICAgY29uc29sZS5hc3NlcnQob2JqZWN0ID09PSBsb2NhbFNjb3BlLm1vY2sub2JqZWN0LCAnbW9jay5vYmplY3QgaXMgYXZhaWxhYmxlIGluIGxvY2FsU2NvcGUnKTtcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZ1xyXG4gKiAgQSBxdWFsaWZpZWQgb2JqZWN0IG5hbWUsIGUuZy4gJ2NvbS5leGFtcGxlLkNsYXNzJ1xyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF1cclxuICogIEFuIG9iamVjdCB0byBtYWtlIHRoZSByZWZlcmVudCBvZiB0aGUgbmFtZXNwYWNlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gW3Njb3BlXVxyXG4gKiAgVGhlIG5hbWVzcGFjZSdzIHJvb3Qgbm9kZS4gSWYgbm90IHN1cHBsaWVkLCB0aGUgZ2xvYmFsXHJcbiAqICBzY29wZSB3aWxsIGJlIG5hbWVzcGFjZXMgcm9vdCBub2RlLlxyXG4gKlxyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqXHJcbiAqICBBIHJlZmVyZW5jZSB0byB0aGUgbGFzdCBub2RlIG9mIHRoZSBPYmplY3QgaGllcmFyY2h5IGNyZWF0ZWQuXHJcbiAqL1xyXG5mdW5jdGlvbiBkZWNsYXJlIChxdWFsaWZpZWROYW1lLCBvYmplY3QsIHNjb3BlKVxyXG57XHJcbiAgICB2YXIgbm9kZXM9IHF1YWxpZmllZE5hbWUuc3BsaXQoJy4nKVxyXG4gICAgICAgICwgICBub2RlPSBzY29wZSB8fCBPb3BIZWxwLmdsb2JhbFxyXG4gICAgICAgICwgICBsYXN0Tm9kZVxyXG4gICAgICAgICwgICBuZXdOb2RlXHJcbiAgICAgICAgLCAgIG5vZGVOYW1lO1xyXG5cclxuICAgIGZvciAodmFyIGk9IDAsIG49IG5vZGVzLmxlbmd0aDsgaSA8IG47IGkrKylcclxuICAgIHtcclxuICAgICAgICBsYXN0Tm9kZT0gbm9kZTtcclxuICAgICAgICBub2RlTmFtZT0gbm9kZXNbaV07XHJcblxyXG4gICAgICAgIG5vZGU9IChudWxsID09IG5vZGVbbm9kZU5hbWVdID8gbm9kZVtub2RlTmFtZV0gPSB7fSA6IG5vZGVbbm9kZU5hbWVdKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobnVsbCA9PSBvYmplY3QpXHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcblxyXG4gICAgcmV0dXJuIGxhc3ROb2RlW25vZGVOYW1lXT0gb2JqZWN0O1xyXG59O1xyXG5cclxuXHJcblxyXG5cclxuLyoqXHJcbiAqIEBtZW1iZXIgcHVyZW12Y1xyXG4gKlxyXG4gKiBEZWZpbmUgYSBuZXcgY2xhc3NsZXQuIEN1cnJlbnQgZWRpdGlvbnMgb2YgSmF2YVNjcmlwdCBkbyBub3QgaGF2ZSBjbGFzc2VzLFxyXG4gKiBidXQgdGhleSBjYW4gYmUgZW11bGF0ZWQsIGFuZCB0aGlzIG1ldGhvZCBkb2VzIHRoaXMgZm9yIHlvdSwgc2F2aW5nIHlvdVxyXG4gKiBmcm9tIGhhdmluZyB0byB3b3JrIHdpdGggRnVuY3Rpb24gcHJvdG90eXBlIGRpcmVjdGx5LiBUaGUgbWV0aG9kIGRvZXNcclxuICogbm90IGV4dGVuZCBhbnkgTmF0aXZlIG9iamVjdHMgYW5kIGlzIGVudGlyZWx5IG9wdCBpbi4gSXRzIHBhcnRpY3VsYXJseVxyXG4gKiB1c2VmdWxsIGlmIHlvdSB3YW50IHRvIG1ha2UgeW91ciBQdXJlTXZjIGFwcGxpY2F0aW9ucyBtb3JlIHBvcnRhYmxlLCBieVxyXG4gKiBkZWNvdXBsaW5nIHRoZW0gZnJvbSBhIHNwZWNpZmljIE9PUCBhYnN0cmFjdGlvbiBsaWJyYXJ5LlxyXG4gKlxyXG4gKlxyXG4gKiAgICAgcHVyZW12Yy5kZWZpbmVcclxuICogICAgIChcclxuICogICAgICAgICAvLyB0aGUgZmlyc3Qgb2JqZWN0IHN1cHBsaWVkIGlzIGEgY2xhc3MgZGVzY3JpcHRvci4gTm9uZSBvZiB0aGVzZVxyXG4gKiAgICAgICAgIC8vIHByb3BlcnRpZXMgYXJlIGFkZGVkIHRvIHlvdXIgY2xhc3MsIHRoZSBleGNlcHRpb24gYmVpbmcgdGhlXHJcbiAqICAgICAgICAgLy8gY29uc3RydWN0b3IgcHJvcGVydHksIHdoaWNoIGlmIHN1cHBsaWVkLCB3aWxsIGJlIHlvdXIgY2xhc3Nlc1xyXG4gKiAgICAgICAgIC8vIGNvbnN0cnVjdG9yLlxyXG4gKiAgICAgICAgIHtcclxuICogICAgICAgICAgICAgLy8geW91ciBjbGFzc2VzIG5hbWVzcGFjZS0gaWYgc3VwcGxpZWQsIGl0IHdpbGwgYmUgXHJcbiAqICAgICAgICAgICAgIC8vIGNyZWF0ZWQgZm9yIHlvdVxyXG4gKiAgICAgICAgICAgICBuYW1lOiAnY29tLmV4YW1wbGUuVXNlck1lZGlhdG9yJ1xyXG4gKiBcclxuICogICAgICAgICAgICAgLy8geW91ciBjbGFzc2VzIHBhcmVudCBjbGFzcy4gSWYgc3VwcGxpZWQsIGluaGVyaXRhbmNlIFxyXG4gKiAgICAgICAgICAgICAvLyB3aWxsIGJlIHRha2VuIGNhcmUgb2YgZm9yIHlvdVxyXG4gKiAgICAgICAgICwgICBwYXJlbnQ6IHB1cmVtdmMuTWVkaWF0b3JcclxuICogXHJcbiAqICAgICAgICAgICAgIC8vIHlvdXIgY2xhc3NlcyBjb25zdHJ1Y3Rvci4gSWYgbm90IHN1cHBsaWVkLCBvbmUgd2lsbCBiZSBcclxuICogICAgICAgICAgICAgLy8gY3JlYXRlZCBmb3IgeW91XHJcbiAqICAgICAgICAgLCAgIGNvbnN0cnVjdG9yOiBmdW5jdGlvbiBVc2VyTWVkaWF0b3IgKGNvbXBvbmVudClcclxuICogICAgICAgICAgICAge1xyXG4gKiAgICAgICAgICAgICAgICAgIHB1cmVtdmMuTWVkaWF0b3IuY2FsbCh0aGlzLCB0aGlzLmNvbnN0cnVjdG9yLk5BTUUsIGNvbXBvbmVudCk7ICBcclxuICogICAgICAgICAgICAgfVxyXG4gKiAgICAgICAgIH1cclxuICpcclxuICogICAgICAgICAvLyB0aGUgc2Vjb25kIG9iamVjdCBzdXBwbGllZCBkZWZpbmVzIHlvdXIgY2xhc3MgdHJhaXRzLCB0aGF0IGlzXHJcbiAqICAgICAgICAgLy8gdGhlIHByb3BlcnRpZXMgdGhhdCB3aWxsIGJlIGRlZmluZWQgb24geW91ciBjbGFzc2VzIHByb3RvdHlwZVxyXG4gKiAgICAgICAgIC8vIGFuZCB0aGVyZWJ5IG9uIGFsbCBpbnN0YW5jZXMgb2YgdGhpcyBjbGFzc1xyXG4gKiAgICAgLCAgIHtcclxuICogICAgICAgICAgICAgYnVzaW5lc3NNZXRob2Q6IGZ1bmN0aW9uICgpXHJcbiAqICAgICAgICAgICAgIHtcclxuICogICAgICAgICAgICAgICAgIC8vIGltcGwgXHJcbiAqICAgICAgICAgICAgIH1cclxuICogICAgICAgICB9XHJcbiAqXHJcbiAqICAgICAgICAgLy8gdGhlIHRoaXJkIG9iamVjdCBzdXBwbGllZCBkZWZpbmVzIHlvdXIgY2xhc3NlcyAnc3RhdGljJyB0cmFpdHNcclxuICogICAgICAgICAvLyB0aGF0IGlzLCB0aGUgbWV0aG9kcyBhbmQgcHJvcGVydGllcyB3aGljaCB3aWxsIGJlIGRlZmluZWQgb25cclxuICogICAgICAgICAvLyB5b3VyIGNsYXNzZXMgY29uc3RydWN0b3JcclxuICogICAgICwgICB7XHJcbiAqICAgICAgICAgICAgIE5BTUU6ICd1c2VyTWVkaWF0b3InXHJcbiAqICAgICAgICAgfVxyXG4gKiAgICAgKTtcclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IFtjbGFzc2luZm9dXHJcbiAqICBBbiBvYmplY3QgZGVzY3JpYmluZyB0aGUgY2xhc3MuIFRoaXMgb2JqZWN0IGNhbiBoYXZlIGFueSBvciBhbGwgb2ZcclxuICogIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcclxuICpcclxuICogIC0gbmFtZTogU3RyaW5nXHJcbiAqICAgICAgVGhlIGNsYXNzbGV0cyBuYW1lLiBUaGlzIGNhbiBiZSBhbnkgYXJiaXRyYXJ5IHF1YWxpZmllZCBvYmplY3RcclxuICogICAgICBuYW1lLiAnY29tLmV4YW1wbGUuQ2xhc3NsZXQnIG9yIHNpbXBseSAnTXlDbGFzc2xldCcgZm9yIGV4YW1wbGVcclxuICogICAgICBUaGUgbWV0aG9kIHdpbGwgYXV0b21hdGljYWxseSBjcmVhdGUgYW4gb2JqZWN0IGhpZXJhcmNoeSByZWZlcmluZ1xyXG4gKiAgICAgIHRvIHlvdXIgY2xhc3MgZm9yIHlvdS4gTm90ZSB0aGF0IHlvdSB3aWxsIG5lZWQgdG8gY2FwdHVyZSB0aGVcclxuICogICAgICBtZXRob2RzIHJldHVybiB2YWx1ZSB0byByZXRyaWV2ZSBhIHJlZmVyZW5jZSB0byB5b3VyIGNsYXNzIGlmIHRoZVxyXG4gKiAgICAgIGNsYXNzIG5hbWUgcHJvcGVydHkgaXMgbm90IGRlZmluZWQuXHJcbiAqICAtIHBhcmVudDogRnVuY3Rpb25cclxuICogICAgICBUaGUgY2xhc3NsZXRzICdzdXBlcmNsYXNzJy4gWW91ciBjbGFzcyB3aWxsIGJlIGV4dGVuZGVkIGZyb20gdGhpc1xyXG4gKiAgICAgIGlmIHN1cHBsaWVkLlxyXG4gKlxyXG4gKiAgLSBjb25zdHJ1Y3RvcjogRnVuY3Rpb25cclxuICogICAgICBUaGUgY2xhc3NsZXRzIGNvbnN0cnVjdG9yLiBOb3RlIHRoaXMgaXMgKm5vdCogYSBwb3N0IGNvbnN0cnVjdFxyXG4gKiAgICAgIGluaXRpYWxpemUgbWV0aG9kLCBidXQgeW91ciBjbGFzc2VzIGNvbnN0cnVjdG9yIEZ1bmN0aW9uLlxyXG4gKiAgICAgIElmIHRoaXMgYXR0cmlidXRlIGlzIG5vdCBkZWZpbmVkLCBhIGNvbnN0cnVjdG9yIHdpbGwgYmUgY3JlYXRlZCBmb3JcclxuICogICAgICB5b3UgYXV0b21hdGljYWxseS4gSWYgeW91IGhhdmUgc3VwcGxpZWQgYSBwYXJlbnQgY2xhc3NcclxuICogICAgICB2YWx1ZSBhbmQgbm90IGRlZmluZWQgdGhlIGNsYXNzZXMgY29uc3RydWN0b3IsIHRoZSBhdXRvbWF0aWNhbGx5XHJcbiAqICAgICAgY3JlYXRlZCBjb25zdHJ1Y3RvciB3aWxsIGludm9rZSB0aGUgc3VwZXIgY2xhc3MgY29uc3RydWN0b3JcclxuICogICAgICBhdXRvbWF0aWNhbGx5LiBJZiB5b3UgaGF2ZSBzdXBwbGllZCB5b3VyIG93biBjb25zdHJ1Y3RvciBhbmQgeW91XHJcbiAqICAgICAgd2lzaCB0byBpbnZva2UgaXQncyBzdXBlciBjb25zdHJ1Y3RvciwgeW91IG11c3QgZG8gdGhpcyBtYW51YWxseSwgYXNcclxuICogICAgICB0aGVyZSBpcyBubyByZWZlcmVuY2UgdG8gdGhlIGNsYXNzZXMgcGFyZW50IGFkZGVkIHRvIHRoZSBjb25zdHJ1Y3RvclxyXG4gKiAgICAgIHByb3RvdHlwZS5cclxuICpcclxuICogIC0gc2NvcGU6IE9iamVjdC5cclxuICogICAgICBGb3IgdXNlIGluIGFkdmFuY2VkIHNjZW5hcmlvcy4gSWYgdGhlIG5hbWUgYXR0cmlidXRlIGhhcyBiZWVuIHN1cHBsaWVkLFxyXG4gKiAgICAgIHRoaXMgdmFsdWUgd2lsbCBiZSB0aGUgcm9vdCBvZiB0aGUgb2JqZWN0IGhpZXJhcmNoeSBjcmVhdGVkIGZvciB5b3UuXHJcbiAqICAgICAgVXNlIGl0IGRvIGRlZmluZSB5b3VyIG93biBjbGFzcyBoaWVyYXJjaGllcyBpbiBwcml2YXRlIHNjb3BlcyxcclxuICogICAgICBhY2Nyb3NzIGlGcmFtZXMsIGluIHlvdXIgdW5pdCB0ZXN0cywgb3IgYXZvaWQgY29sbGlzaW9uIHdpdGggdGhpcmRcclxuICogICAgICBwYXJ0eSBsaWJyYXJ5IG5hbWVzcGFjZXMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBbdHJhaXRzXVxyXG4gKiAgQW4gT2JqZWN0LCB0aGUgcHJvcGVydGllcyBvZiB3aGljaCB3aWxsIGJlIGFkZGVkIHRvIHRoZVxyXG4gKiAgY2xhc3MgY29uc3RydWN0b3JzIHByb3RvdHlwZS5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IFtzdGFpdGNUcmFpdHNdXHJcbiAqICBBbiBPYmplY3QsIHRoZSBwcm9wZXJ0aWVzIG9mIHdoaWNoIHdpbGwgYmUgYWRkZWQgZGlyZWN0bHlcclxuICogIHRvIHRoaXMgY2xhc3MgY29uc3RydWN0b3JcclxuICpcclxuICogQHJldHVybiB7RnVuY3Rpb259XHJcbiAqICBBIHJlZmVyZW5jZSB0byB0aGUgY2xhc3NsZXRzIGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBkZWZpbmUgKGNsYXNzSW5mbywgdHJhaXRzLCBzdGF0aWNUcmFpdHMpXHJcbntcclxuICAgIGlmICghY2xhc3NJbmZvKVxyXG4gICAge1xyXG4gICAgICAgIGNsYXNzSW5mbz0ge31cclxuICAgIH1cclxuXHJcbiAgICB2YXIgY2xhc3NOYW1lPSBjbGFzc0luZm8ubmFtZVxyXG4gICAgICAgICwgICBjbGFzc1BhcmVudD0gY2xhc3NJbmZvLnBhcmVudFxyXG4gICAgICAgICwgICBkb0V4dGVuZD0gJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGNsYXNzUGFyZW50XHJcbiAgICAgICAgLCAgIGNsYXNzQ29uc3RydWN0b3JcclxuICAgICAgICAsICAgY2xhc3NTY29wZT0gY2xhc3NJbmZvLnNjb3BlIHx8IG51bGxcclxuICAgICAgICAsICAgcHJvdG90eXBlXHJcblxyXG4gICAgaWYgKCdwYXJlbnQnIGluIGNsYXNzSW5mbyAmJiAhZG9FeHRlbmQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2xhc3MgcGFyZW50IG11c3QgYmUgRnVuY3Rpb24nKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2xhc3NJbmZvLmhhc093blByb3BlcnR5KCdjb25zdHJ1Y3RvcicpKVxyXG4gICAge1xyXG4gICAgICAgIGNsYXNzQ29uc3RydWN0b3I9IGNsYXNzSW5mby5jb25zdHJ1Y3RvclxyXG4gICAgICAgIGlmICgnZnVuY3Rpb24nICE9PSB0eXBlb2YgY2xhc3NDb25zdHJ1Y3RvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0NsYXNzIGNvbnN0cnVjdG9yIG11c3QgYmUgRnVuY3Rpb24nKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgLy8gdGhlcmUgaXMgbm8gY29uc3RydWN0b3IsIGNyZWF0ZSBvbmVcclxuICAgIHtcclxuICAgICAgICBpZiAoZG9FeHRlbmQpIC8vIGVuc3VyZSB0byBjYWxsIHRoZSBzdXBlciBjb25zdHJ1Y3RvclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2xhc3NDb25zdHJ1Y3Rvcj0gZnVuY3Rpb24gKClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2xhc3NQYXJlbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIC8vIGp1c3QgY3JlYXRlIGEgRnVuY3Rpb25cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNsYXNzQ29uc3RydWN0b3I9IG5ldyBGdW5jdGlvbjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGRvRXh0ZW5kKVxyXG4gICAge1xyXG4gICAgICAgIE9vcEhlbHAuZXh0ZW5kKGNsYXNzQ29uc3RydWN0b3IsIGNsYXNzUGFyZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHJhaXRzKVxyXG4gICAge1xyXG4gICAgICAgIHByb3RvdHlwZT0gY2xhc3NDb25zdHJ1Y3Rvci5wcm90b3R5cGVcclxuICAgICAgICBPb3BIZWxwLmRlY29yYXRlKHByb3RvdHlwZSwgdHJhaXRzKTtcclxuICAgICAgICAvLyByZWFzc2lnbiBjb25zdHJ1Y3RvciBcclxuICAgICAgICBwcm90b3R5cGUuY29uc3RydWN0b3I9IGNsYXNzQ29uc3RydWN0b3I7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHN0YXRpY1RyYWl0cylcclxuICAgIHtcclxuICAgICAgICBPb3BIZWxwLmRlY29yYXRlKGNsYXNzQ29uc3RydWN0b3IsIHN0YXRpY1RyYWl0cylcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2xhc3NOYW1lKVxyXG4gICAge1xyXG4gICAgICAgIGlmICgnc3RyaW5nJyAhPT0gdHlwZW9mIGNsYXNzTmFtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0NsYXNzIG5hbWUgbXVzdCBiZSBwcmltaXRpdmUgc3RyaW5nJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkZWNsYXJlIChjbGFzc05hbWUsIGNsYXNzQ29uc3RydWN0b3IsIGNsYXNzU2NvcGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjbGFzc0NvbnN0cnVjdG9yO1xyXG59O1xyXG5cclxuXHJcblxyXG4vKiBpbXBsZW1lbnRhdGlvbiBlbmQgKi9cclxuXHJcbi8vIGRlZmluZSB0aGUgcHVyZW12YyBnbG9iYWwgbmFtZXNwYWNlIGFuZCBleHBvcnQgdGhlIGFjdG9yc1xyXG52YXIgcHVyZW12YyA9XHJcbntcclxuICAgICAgICBWaWV3OiBWaWV3XHJcbiAgICAsXHRNb2RlbDogTW9kZWxcclxuICAgICxcdENvbnRyb2xsZXI6IENvbnRyb2xsZXJcclxuICAgICxcdFNpbXBsZUNvbW1hbmQ6IFNpbXBsZUNvbW1hbmRcclxuICAgICxcdE1hY3JvQ29tbWFuZDogTWFjcm9Db21tYW5kXHJcbiAgICAsXHRGYWNhZGU6IEZhY2FkZVxyXG4gICAgLFx0TWVkaWF0b3I6IE1lZGlhdG9yXHJcbiAgICAsXHRPYnNlcnZlcjogT2JzZXJ2ZXJcclxuICAgICxcdE5vdGlmaWNhdGlvbjogTm90aWZpY2F0aW9uXHJcbiAgICAsXHROb3RpZmllcjogTm90aWZpZXJcclxuICAgICxcdFByb3h5OiBQcm94eVxyXG4gICAgLFx0ZGVmaW5lOiBkZWZpbmVcclxuICAgICxcdGRlY2xhcmU6IGRlY2xhcmVcclxufTtcclxuXHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBwdXJlbXZjOyIsInZhciBBcHBGYWNhZGUgPSByZXF1aXJlKCcuL2FwcEZhY2FkZS5qcycpO1xyXG52YXIgZ19yZXNvdWNlcyA9IHJlcXVpcmUoJy4vcmVzb3VyY2UuanMnKS5nX3Jlc291Y2VzO1xyXG5cclxuKGZ1bmN0aW9uKCkge1xyXG4gICAgY2MuZ2FtZS5vblN0YXJ0ID0gZnVuY3Rpb24oKXtcclxuICAgICAgICBjYy52aWV3LmFkanVzdFZpZXdQb3J0KHRydWUpO1xyXG4gICAgICAgIGNjLnZpZXcuc2V0RGVzaWduUmVzb2x1dGlvblNpemUoNjQwLCA5NjAsIGNjLlJlc29sdXRpb25Qb2xpY3kuU0hPV19BTEwpO1xyXG4gICAgICAgIGNjLnZpZXcucmVzaXplV2l0aEJyb3dzZXJTaXplKHRydWUpO1xyXG5cclxuICAgICAgICBjY3MuY3NMb2FkZXIuc2V0UmVjb3JkUHJvdG9jb2xCdWZmZXJzUGF0aCh0cnVlKTtcclxuICAgICAgICBjYy5Mb2FkZXJTY2VuZS5wcmVsb2FkKGdfcmVzb3VjZXMsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIga2V5ID0gJ2ZpZ2h0ZXItbXZjJztcclxuICAgICAgICAgICAgQXBwRmFjYWRlLmdldEluc3RhbmNlKGtleSkuc3RhcnR1cCgpO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG4gICAgfTtcclxuICAgIGNjLmdhbWUucnVuKCk7XHJcbn0pKCk7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgQXJ0aHVyIG9uIDIwMTQvMTIvMjAuXHJcbiAqL1xyXG52YXIgY29uc3RhbnRzID0gbW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBBUFBfTkFNRTogXCJmaWdodGVyXCIsXHJcblxyXG4gICAgTk9USUZJQ0FUSU9OOiB7XHJcbiAgICAgICAgU1RBUlRVUDogJ3N0YXJ0dXAnLFxyXG4gICAgICAgIFNDRU5FX0NIQU5HRUQ6ICdzY2VuZV9jaGFuZ2VkJyxcclxuICAgICAgICBTQ0VORV9IT01FOiAnc2NlbmVfaG9tZSdcclxuICAgIH0sXHJcblxyXG4gICAgU0NFTkVfQUNUSU9OOiAnc2NlbmVfYWN0aW9uJyxcclxuICAgIFNDRU5FOiB7XHJcbiAgICAgICAgSE9NRTogJ0hvbWVNZWRpYXRvcicsXHJcbiAgICAgICAgVFJBSU46ICdUcmFpbk1lZGlhdG9yJ1xyXG4gICAgfSxcclxuXHJcbiAgICBUQVNLX1NUQVRVUyA6IHtcclxuICAgICAgICBTVE9QOiAxLFxyXG4gICAgICAgIFNUQVJUOiAyXHJcbiAgICB9XHJcbn07IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgQXJ0aHVyIG9uIDIwMTQvMTIvMjEuXHJcbiAqL1xyXG52YXIgcHVyZW12YyA9IHJlcXVpcmUoJ3B1cmVtdmMnKS5wdXJlbXZjO1xyXG52YXIgU3RhcnR1cENvbW1hbmQgPSByZXF1aXJlKCcuL2NvbnRyb2xsZXIvY29tbWFuZC9TdGFydHVwQ29tbWFuZC5qcycpO1xyXG52YXIgY29uc3RhbnRzID0gcmVxdWlyZSgnLi9hcHBDb25zdGFudHMuanMnKTtcclxuXHJcbnZhciBBcHBGYWNhZGUgPSBtb2R1bGUuZXhwb3J0cyA9IHB1cmVtdmMuZGVmaW5lKFxyXG4gICAgLy8gQ0xBU1MgSU5GT1xyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdBcHBGYWNhZGUnLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5GYWNhZGUsXHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yOiBmdW5jdGlvbiAobXVsdGl0b25LZXkpIHtcclxuICAgICAgICAgICAgcHVyZW12Yy5GYWNhZGUuY2FsbCh0aGlzLCBtdWx0aXRvbktleSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBpbml0aWFsaXplQ29udHJvbGxlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBwdXJlbXZjLkZhY2FkZS5wcm90b3R5cGUuaW5pdGlhbGl6ZUNvbnRyb2xsZXIuY2FsbCh0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckNvbW1hbmQoY29uc3RhbnRzLk5PVElGSUNBVElPTi5TVEFSVFVQLCBTdGFydHVwQ29tbWFuZCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBpbml0aWFsaXplTW9kZWw6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcHVyZW12Yy5GYWNhZGUucHJvdG90eXBlLmluaXRpYWxpemVNb2RlbC5jYWxsKHRoaXMpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW5pdGlhbGl6ZVZpZXc6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcHVyZW12Yy5GYWNhZGUucHJvdG90eXBlLmluaXRpYWxpemVWaWV3LmNhbGwodGhpcyk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc3RhcnR1cDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbmROb3RpZmljYXRpb24oY29uc3RhbnRzLk5PVElGSUNBVElPTi5TVEFSVFVQKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy8gU1RBVElDIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBnZXRJbnN0YW5jZTogZnVuY3Rpb24obXVsdGl0b25LZXkpIHtcclxuICAgICAgICAgICAgdmFyIGluc3RhbmNlTWFwID0gcHVyZW12Yy5GYWNhZGUuaW5zdGFuY2VNYXA7XHJcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZSA9IGluc3RhbmNlTWFwW211bHRpdG9uS2V5XTtcclxuICAgICAgICAgICAgaWYoaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpbnN0YW5jZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gaW5zdGFuY2VNYXBbbXVsdGl0b25LZXldID0gbmV3IEFwcEZhY2FkZShtdWx0aXRvbktleSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBOQU1FOiAnQXBwRmFjYWRlJ1xyXG4gICAgfVxyXG4pOyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFydGh1ciBvbiAyMDE0LzEyLzE0LlxyXG4gKi9cclxuXHJcbnZhciBwdXJlbXZjID0gcmVxdWlyZSgncHVyZW12YycpLnB1cmVtdmM7XHJcbnZhciBQcmVwQ29udHJvbGxlckNvbW1hbmQgPSByZXF1aXJlKCcuL3ByZXBDb250cm9sbGVyQ29tbWFuZC5qcycpO1xyXG52YXIgUHJlcE1vZGVsQ29tbWFuZCA9IHJlcXVpcmUoJy4vcHJlcE1vZGVsQ29tbWFuZC5qcycpO1xyXG52YXIgUHJlcFZpZXdDb21tYW5kID0gcmVxdWlyZSgnLi9wcmVwVmlld0NvbW1hbmQuanMnKTtcclxudmFyIEhvbWVDb21tYW5kID0gcmVxdWlyZSgnLi9ob21lQ29tbWFuZC5qcycpO1xyXG52YXIgY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vLi4vYXBwQ29uc3RhbnRzLmpzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHB1cmVtdmMuZGVmaW5lKHtcclxuICAgICAgICBuYW1lOiAnZmlnaHRlci5jb250cm9sbGVyLmNvbW1hbmQuU3RhcnR1cENvbW1hbmQnLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5NYWNyb0NvbW1hbmRcclxuICAgIH0sXHJcblxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFkZCB0aGUgc3ViLWNvbW1hbmRzIGZvciB0aGlzIE1hY3JvQ29tbWFuZFxyXG4gICAgICAgICAqIEBvdmVycmlkZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGluaXRpYWxpemVNYWNyb0NvbW1hbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY2MubG9nKCdzdGFydCBjb21tYW5kIGluaXQnKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRTdWJDb21tYW5kKCBQcmVwQ29udHJvbGxlckNvbW1hbmQgKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRTdWJDb21tYW5kKCBQcmVwTW9kZWxDb21tYW5kICk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkU3ViQ29tbWFuZCggUHJlcFZpZXdDb21tYW5kICk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkU3ViQ29tbWFuZCggSG9tZUNvbW1hbmQgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFydGh1ciBvbiAyMDE0LzEyLzIxLlxyXG4gKi9cclxuXHJcbnZhciBwdXJlbXZjID0gcmVxdWlyZSgncHVyZW12YycpLnB1cmVtdmM7XHJcbnZhciBjb25zdGFudHMgPSByZXF1aXJlKCcuLi8uLi9hcHBDb25zdGFudHMuanMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcHVyZW12Yy5kZWZpbmUoe1xyXG4gICAgICAgIG5hbWU6ICdmaWdodGVyLmNvbnRyb2xsZXIuY29tbWFuZC5Ib21lQ29tbWFuZCcsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLlNpbXBsZUNvbW1hbmRcclxuICAgIH0sXHJcblxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlZ2lzdGVyIENvbW1hbmRzIHdpdGggdGhlIENvbnRyb2xsZXJcclxuICAgICAgICAgKiBAb3ZlcnJpZGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBleGVjdXRlOiBmdW5jdGlvbiAobm90ZSkge1xyXG4gICAgICAgICAgICAvLyBUaGlzIHJlZ2lzdGVycyBtdWx0aXBsZSBub3RlcyB0byBhIHNpbmdsZSBjb21tYW5kIHdoaWNoIHBlcmZvcm1zIGRpZmZlcmVudCBsb2dpYyBiYXNlZCBvbiB0aGUgbm90ZSBuYW1lLlxyXG4gICAgICAgICAgICAvLyBJbiBhIG1vcmUgY29tcGxleCBhcHAsIHdlJ2QgdXN1YWxseSBiZSByZWdpc3RlcmluZyBhIGRpZmZlcmVudCBjb21tYW5kIHRvIGVhY2ggbm90aWZpY2F0aW9uIG5hbWUuXHJcbiAgICAgICAgICAgIGNjLmxvZygnSG9tZUNvbW1hbmQgZXhlY3V0ZScpO1xyXG4gICAgICAgICAgICB0aGlzLmZhY2FkZS5zZW5kTm90aWZpY2F0aW9uKGNvbnN0YW50cy5TQ0VORV9BQ1RJT04sIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IGNvbnN0YW50cy5TQ0VORS5IT01FXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuKTtcclxuXHJcblxyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBBcnRodXIgb24gMjAxNC8xMi8xNC5cclxuICovXHJcbnZhciBwdXJlbXZjID0gcmVxdWlyZSgncHVyZW12YycpLnB1cmVtdmM7XHJcbnZhciBjb25zdGFudHMgPSByZXF1aXJlKCcuLi8uLi9hcHBDb25zdGFudHMuanMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcHVyZW12Yy5kZWZpbmUoe1xyXG4gICAgICAgIG5hbWU6ICdmaWdodGVyLmNvbnRyb2xsZXIuY29tbWFuZC5QcmVwQ29udHJvbGxlckNvbW1hbmQnLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5TaW1wbGVDb21tYW5kXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZWdpc3RlciBDb21tYW5kcyB3aXRoIHRoZSBDb250cm9sbGVyXHJcbiAgICAgICAgICogQG92ZXJyaWRlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZXhlY3V0ZTogZnVuY3Rpb24gKG5vdGUpIHtcclxuICAgICAgICAgICAgLy8gVGhpcyByZWdpc3RlcnMgbXVsdGlwbGUgbm90ZXMgdG8gYSBzaW5nbGUgY29tbWFuZCB3aGljaCBwZXJmb3JtcyBkaWZmZXJlbnQgbG9naWMgYmFzZWQgb24gdGhlIG5vdGUgbmFtZS5cclxuICAgICAgICAgICAgLy8gSW4gYSBtb3JlIGNvbXBsZXggYXBwLCB3ZSdkIHVzdWFsbHkgYmUgcmVnaXN0ZXJpbmcgYSBkaWZmZXJlbnQgY29tbWFuZCB0byBlYWNoIG5vdGlmaWNhdGlvbiBuYW1lLlxyXG4gICAgICAgICAgICBjYy5sb2coJ1ByZXBDb250cm9sbGVyQ29tbWFuZCBleGVjdXRlJyk7XHJcblxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbik7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgQXJ0aHVyIG9uIDIwMTQvMTIvMTQuXHJcbiAqL1xyXG52YXIgcHVyZW12YyA9IHJlcXVpcmUoJ3B1cmVtdmMnKS5wdXJlbXZjO1xyXG52YXIgUGxheWVyUHJveHkgPSByZXF1aXJlKCcuLi8uLi9tb2RlbC9wcm94eS9wbGF5ZXJQcm94eS5qcycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBwdXJlbXZjLmRlZmluZSh7XHJcbiAgICAgICAgbmFtZTogJ2ZpZ2h0ZXIuY29udHJvbGxlci5jb21tYW5kLlByZXBNb2RlbENvbW1hbmQnLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5TaW1wbGVDb21tYW5kXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZWdpc3RlciBQcm94aWVzIHdpdGggdGhlIE1vZGVsXHJcbiAgICAgICAgICogQG92ZXJyaWRlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZXhlY3V0ZTogZnVuY3Rpb24gKG5vdGUpIHtcclxuICAgICAgICAgICAgY2MubG9nKCdQcmVwTW9kZWxDb21tYW5kIGV4ZWN1dGUnKTtcclxuICAgICAgICAgICAgdGhpcy5mYWNhZGUucmVnaXN0ZXJQcm94eShuZXcgUGxheWVyUHJveHkoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBBcnRodXIgb24gMjAxNC8xMi8xNC5cclxuICovXHJcbnZhciBwdXJlbXZjID0gcmVxdWlyZSgncHVyZW12YycpLnB1cmVtdmM7XHJcbnZhciBEaXJlY3Rvck1lZGlhdG9yID0gcmVxdWlyZSgnLi4vLi4vdmlldy9tZWRpYXRvci9kaXJlY3Rvck1lZGlhdG9yLmpzJyk7XHJcbnZhciBIb21lTWVkaWF0b3IgPSByZXF1aXJlKCcuLi8uLi92aWV3L21lZGlhdG9yL2hvbWVNZWRpYXRvci5qcycpO1xyXG52YXIgU2NlbmVNZWRpYXRvciA9IHJlcXVpcmUoJy4uLy4uL3ZpZXcvbWVkaWF0b3Ivc2NlbmVNZWRpYXRvci5qcycpO1xyXG52YXIgVHJhaW5NZWRpYXRvciA9IHJlcXVpcmUoJy4uLy4uL3ZpZXcvbWVkaWF0b3IvdHJhaW5NZWRpYXRvci5qcycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBwdXJlbXZjLmRlZmluZSAoe1xyXG4gICAgICAgIG5hbWU6ICdmaWdodGVyLmNvbnRyb2xsZXIuY29tbWFuZC5QcmVwVmlld0NvbW1hbmQnLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5TaW1wbGVDb21tYW5kXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZWdpc3RlciBNZWRpYXRvcnMgd2l0aCB0aGUgVmlld1xyXG4gICAgICAgICAqIEBvdmVycmlkZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGV4ZWN1dGU6IGZ1bmN0aW9uIChub3RlKSB7XHJcbiAgICAgICAgICAgIGNjLmxvZygnUHJlcFZpZXdDb21tYW5kIGV4ZWN1dGUnKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZmFjYWRlLnJlZ2lzdGVyTWVkaWF0b3IobmV3IERpcmVjdG9yTWVkaWF0b3IoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuZmFjYWRlLnJlZ2lzdGVyTWVkaWF0b3IobmV3IFNjZW5lTWVkaWF0b3IoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuZmFjYWRlLnJlZ2lzdGVyTWVkaWF0b3IobmV3IEhvbWVNZWRpYXRvcigpKTtcclxuICAgICAgICAgICAgdGhpcy5mYWNhZGUucmVnaXN0ZXJNZWRpYXRvcihuZXcgVHJhaW5NZWRpYXRvcigpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIHdpdGggSmV0QnJhaW5zIFdlYlN0b3JtLlxyXG4gKiBVc2VyOiBsY2MzNTM2XHJcbiAqIERhdGU6IDEzLTctOVxyXG4gKiBUaW1lOiDkuIvljYg1OjI0XHJcbiAqIFRvIGNoYW5nZSB0aGlzIHRlbXBsYXRlIHVzZSBGaWxlIHwgU2V0dGluZ3MgfCBGaWxlIFRlbXBsYXRlcy5cclxuICovXHJcblxyXG5cclxuLypcclxuICogZW50aXR5XHJcbiAqICovXHJcblxyXG52YXIgRXZlbnQgPSByZXF1aXJlKCcuLi8uLi91dGlsL2V2ZW50LmpzJyk7XHJcblxyXG52YXIgRW50aXR5ID0gbW9kdWxlLmV4cG9ydHMgPSBFdmVudC5leHRlbmQoe1xyXG5cdHNldDogZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XHJcblx0XHRpZiAodHlwZW9mIHZhbHVlICE9IFwidW5kZWZpbmVkXCIpIHtcclxuXHRcdFx0aWYgKHRoaXNbXCJfXCIgKyBuYW1lXSAhPT0gdmFsdWUpIHtcclxuXHRcdFx0XHR0aGlzW1wiX1wiICsgbmFtZV0gPSB2YWx1ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5lbWl0KG5hbWUgKyBcIkNoYW5nZVwiKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRzZXRzOiBmdW5jdGlvbiAoYXR0cnMpIHtcclxuXHRcdHZhciBrZXk7XHJcblxyXG5cdFx0Zm9yIChrZXkgaW4gYXR0cnMpIHtcclxuXHRcdFx0dGhpcy5zZXQoa2V5LCBhdHRyc1trZXldKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRhZGQ6IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xyXG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSAhPSBcInVuZGVmaW5lZFwiKSB7XHJcblx0XHRcdGlmICh2YWx1ZSkge1xyXG5cdFx0XHRcdHRoaXMuc2V0KG5hbWUsIHRoaXNbXCJfXCIgKyBuYW1lXSArIHZhbHVlKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGFkZHM6IGZ1bmN0aW9uIChhdHRycykge1xyXG5cdFx0dmFyIGtleTtcclxuXHJcblx0XHRmb3IgKGtleSBpbiBhdHRycykge1xyXG5cdFx0XHR0aGlzLmFkZChrZXksIGF0dHJzW2tleV0pO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGdldDogZnVuY3Rpb24gKG5hbWUpIHtcclxuXHRcdHJldHVybiB0aGlzW1wiX1wiICsgbmFtZV07XHJcblx0fSxcclxuXHJcblx0aGFzOiBmdW5jdGlvbiAobmFtZSkge1xyXG5cdFx0cmV0dXJuICh0eXBlb2YgKHRoaXNbXCJfXCIgKyBuYW1lXSkgIT0gXCJ1bmRlZmluZWRcIik7XHJcblx0fSxcclxuXHJcblx0c2NoZWR1bGU6IGZ1bmN0aW9uIChmbiwgaW50ZXJ2YWwsIHJlcGVhdCwgZGVsYXkpIHtcclxuXHRcdGludGVydmFsID0gaW50ZXJ2YWwgfHwgMDtcclxuXHRcdHJlcGVhdCA9IChyZXBlYXQgPT0gbnVsbCkgPyBjYy5SRVBFQVRfRk9SRVZFUiA6IHJlcGVhdDtcclxuXHRcdGRlbGF5ID0gZGVsYXkgfHwgMDtcclxuXHJcblx0XHRjYy5EaXJlY3Rvci5nZXRJbnN0YW5jZSgpLmdldFNjaGVkdWxlcigpLnNjaGVkdWxlQ2FsbGJhY2tGb3JUYXJnZXQodGhpcywgZm4sIGludGVydmFsLCByZXBlYXQsIGRlbGF5LCBmYWxzZSk7XHJcblx0fSxcclxuXHJcblx0c2NoZWR1bGVPbmNlOiBmdW5jdGlvbiAoZm4sIGRlbGF5KSB7XHJcblx0XHR0aGlzLnNjaGVkdWxlKGZuLCAwLjAsIDAsIGRlbGF5KTtcclxuXHR9LFxyXG5cclxuXHR1bnNjaGVkdWxlOiBmdW5jdGlvbiAoZm4pIHtcclxuXHRcdC8vIGV4cGxpY2l0IG5pbCBoYW5kbGluZ1xyXG5cdFx0Y2MuRGlyZWN0b3IuZ2V0SW5zdGFuY2UoKS5nZXRTY2hlZHVsZXIoKS51bnNjaGVkdWxlQ2FsbGJhY2tGb3JUYXJnZXQodGhpcywgZm4pO1xyXG5cdH0sXHJcblxyXG5cdHVuc2NoZWR1bGVBbGxDYWxsYmFja3M6IGZ1bmN0aW9uICgpIHtcclxuXHRcdGNjLkRpcmVjdG9yLmdldEluc3RhbmNlKCkuZ2V0U2NoZWR1bGVyKCkudW5zY2hlZHVsZUFsbENhbGxiYWNrc0ZvclRhcmdldCh0aGlzKTtcclxuXHR9XHJcbn0pO1xyXG4iLCJ2YXIgRW50aXR5ID0gcmVxdWlyZSgnLi9lbnRpdHkuanMnKTtcclxuXHJcbnZhciBQbGF5ZXIgPSBtb2R1bGUuZXhwb3J0cyA9IEVudGl0eS5leHRlbmQoe1xyXG5cdF9pZDogMCxcclxuXHRfbmFtZTogXCJcIixcclxuXHRfcGhvdG86IFwiXCIsXHJcblx0X2dvbGQ6IDAsXHJcblx0XHJcblx0X2hwOiAwLFxyXG5cdF9hdGs6IDAsXHJcblx0X2RlZmVuc2U6IDAsXHJcblx0X3VuZGVmZW5zZTogMCxcclxuXHRfY3JpdDogMCxcclxuXHRfdW5jcml0OiAwLFxyXG5cdF9kb2RnZTogMCxcclxuXHRfaGl0OiAwLFx0XHJcblxyXG4gICAgY3RvcjogZnVuY3Rpb24oYXR0cnMpIHtcclxuICAgICAgICB0aGlzLnNldHMoYXR0cnMpO1xyXG4gICAgfSxcclxuXHJcbn0pOyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFydGh1ciBvbiAyMDE0LzEyLzI2LlxyXG4gKi9cclxudmFyIHB1cmVtdmMgPSByZXF1aXJlKCdwdXJlbXZjJyk7XHJcbnZhciBQbGF5ZXIgPSByZXF1aXJlKCcuLi9lbnRpdHkvcGxheWVyLmpzJyk7XHJcblxyXG52YXIgUGxheWVyUHJveHkgPSBwdXJlbXZjLmRlZmluZSh7XHJcbiAgICAgICAgbmFtZTogJ2ZpZ3RoZXIubW9kZWwucHJveHkuUGxheWVyUHJveHknLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5Qcm94eSxcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3I6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBwdXJlbXZjLlByb3h5LnByb3RvdHlwZS5jYWxsKHRoaXMsIHRoaXMuY29uc3RydWN0b3IuTkFNRSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEobmV3IFBsYXllcih7XHJcbiAgICAgICAgICAgICAgICBpZDogMSxcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwi5oiR5a625rKh5Lq6XCIsXHJcbiAgICAgICAgICAgICAgICBwaG90bzogXCJcIixcclxuICAgICAgICAgICAgICAgIGdvbGQ6IDEyOTM3LFxyXG5cclxuICAgICAgICAgICAgICAgIGhwOiAzMDIwMDQsXHJcbiAgICAgICAgICAgICAgICBhdGs6IDQwOTMwLFxyXG4gICAgICAgICAgICAgICAgZGVmZW5zZTogMjkzNDIsXHJcbiAgICAgICAgICAgICAgICB1bmRlZmVuc2U6IDEyMzQxLFxyXG4gICAgICAgICAgICAgICAgY3JpdDogMzAsXHJcbiAgICAgICAgICAgICAgICB1bmNyaXQ6IDEwLFxyXG4gICAgICAgICAgICAgICAgZG9kZ2U6IDIwLFxyXG4gICAgICAgICAgICAgICAgaGl0OiAxMFxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICB7XHJcblxyXG4gICAgICAgIGdldFBsYXllcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGE7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdXBkYXRlUGxheWVyOiBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRhLnNldChuYW1lLCB2YWx1ZSk7fVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAge1xyXG4gICAgICAgIE5BTUU6ICdQbGF5ZXJQcm94eSdcclxuICAgIH1cclxuKTsiLCJ2YXIgcmVzID0ge1xyXG4gICAgYWRkX2pwZzogXCJyZXMvaW1hZ2VzL2FkZC5qcGdcIixcclxuICAgIGJ0bjFfanBnOiBcInJlcy9pbWFnZXMvYnRuMS5qcGdcIixcclxuXHJcbiAgICBidG4zX3BuZzogXCJyZXMvaW1hZ2VzL2J0bjMuanBnXCIsXHJcbiAgICBidG41X3BuZzogXCJyZXMvaW1hZ2VzL2J0bjUuanBnXCIsXHJcbiAgICBidG43X2pwZzogXCJyZXMvaW1hZ2VzL2J0bjcuanBnXCIsXHJcblxyXG4gICAgaW1nMV9wbmc6IFwicmVzL2ltYWdlcy9pbWcxLmpwZ1wiLFxyXG4gICAgaW1nNV9qcGc6IFwicmVzL2ltYWdlcy9pbWc1LmpwZ1wiLFxyXG4gICAgaW1nNl9qcGc6IFwicmVzL2ltYWdlcy9pbWc2LmpwZ1wiLFxyXG4gICAgdHh0X2JnMV9qcGc6IFwicmVzL2ltYWdlcy90eHRfYmcxLmpwZ1wiLFxyXG5cclxuXHJcbiAgICBNYWluTm9kZTogXCJyZXMvTWFpblNjZW5lLmNzYlwiLFxyXG4gICAgVGFza05vZGU6IFwicmVzL1Rhc2tOb2RlLmNzYlwiLFxyXG4gICAgVHJhaW5Ob2RlOiBcInJlcy9UcmFpbk5vZGUuY3NiXCJcclxuXHJcbn07XHJcblxyXG52YXIgZ19yZXNvdXJjZXMgPSBbXTtcclxuZm9yICh2YXIgaSBpbiByZXMpIHtcclxuICAgIGdfcmVzb3VyY2VzLnB1c2gocmVzW2ldKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMucmVzID0gcmVzO1xyXG5tb2R1bGUuZXhwb3J0cy5nX3Jlc291Y2VzID0gZ19yZXNvdXJjZXM7IiwiLyoqXHJcbiAqIENyZWF0ZWQgd2l0aCBKZXRCcmFpbnMgV2ViU3Rvcm0uXHJcbiAqIFVzZXI6IGxjYzM1MzZcclxuICogRGF0ZTogMTMtMTAtMThcclxuICogVGltZTog5LiL5Y2IMjo1NlxyXG4gKiBUbyBjaGFuZ2UgdGhpcyB0ZW1wbGF0ZSB1c2UgRmlsZSB8IFNldHRpbmdzIHwgRmlsZSBUZW1wbGF0ZXMuXHJcbiAqL1xyXG5cclxuXHJcbi8qXHJcbiAqIGV2ZW50XHJcbiAqICovXHJcblxyXG52YXIgRXZlbnQgPSBtb2R1bGUuZXhwb3J0cyA9IGNjLkNsYXNzLmV4dGVuZCh7XHJcbiAgICBfY2FsbGJhY2s6IHt9LFxyXG5cclxuICAgIG9uOiBmdW5jdGlvbiAoZXZlbnQsIGZuKSB7XHJcbiAgICAgICAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xyXG4gICAgICAgICh0aGlzLl9jYWxsYmFja3NbZXZlbnRdID0gdGhpcy5fY2FsbGJhY2tzW2V2ZW50XSB8fCBbXSlcclxuICAgICAgICAgICAgLnB1c2goZm4pO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbmNlOiBmdW5jdGlvbiAoZXZlbnQsIGZuKSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gb24oKSB7XHJcbiAgICAgICAgICAgIHNlbGYub2ZmKGV2ZW50LCBvbik7XHJcbiAgICAgICAgICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmbi5fb2ZmID0gb247XHJcbiAgICAgICAgdGhpcy5vbihldmVudCwgb24pO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuICAgIFxyXG4gICAgYWRkTGlzdGVuZXI6IGZ1bmN0aW9uKGV2ZW50LCBmbikge1xyXG4gICAgXHR0aGlzLm9uKGV2ZW50LCBmbik7XHJcbiAgICB9LFxyXG5cclxuICAgIHJlbW92ZUxpc3RlbmVyOiBmdW5jdGlvbiAoZXZlbnQsIGZuKSB7XHJcbiAgICAgICAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xyXG5cclxuICAgICAgICAvLyBhbGxcclxuICAgICAgICBpZiAoMCA9PSBhcmd1bWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NhbGxiYWNrcyA9IHt9O1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHNwZWNpZmljIGV2ZW50XHJcbiAgICAgICAgdmFyIGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrc1tldmVudF07XHJcbiAgICAgICAgaWYgKCFjYWxsYmFja3MpIHJldHVybiB0aGlzO1xyXG5cclxuICAgICAgICAvLyByZW1vdmUgYWxsIGhhbmRsZXJzXHJcbiAgICAgICAgaWYgKDEgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fY2FsbGJhY2tzW2V2ZW50XTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyByZW1vdmUgc3BlY2lmaWMgaGFuZGxlclxyXG4gICAgICAgIHZhciBpID0gdGhpcy5faW5kZXhPZihjYWxsYmFja3MsIGZuLl9vZmYgfHwgZm4pO1xyXG4gICAgICAgIGlmICh+aSkgY2FsbGJhY2tzLnNwbGljZShpLCAxKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcbiAgICBcclxuICAgIHJlbW92ZUxpc3RlbmVyczogZnVuY3Rpb24oKSB7XHJcbiAgICBcdHRoaXMuX2NhbGxiYWNrID0ge307XHJcbiAgICB9LFxyXG5cclxuICAgIGVtaXQ6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcclxuICAgICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxyXG4gICAgICAgIHZhciBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3NbZXZlbnRdO1xyXG5cclxuICAgICAgICBpZiAoY2FsbGJhY2tzKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrcyA9IGNhbGxiYWNrcy5zbGljZSgwKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNhbGxiYWNrcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgbGlzdGVuZXJzOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhbGxiYWNrc1tldmVudF0gfHwgW107XHJcbiAgICB9LFxyXG5cclxuICAgIGhhc0xpc3RlbmVyczogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgcmV0dXJuICEhdGhpcy5saXN0ZW5lcnMoZXZlbnQpLmxlbmd0aDtcclxuICAgIH0sXHJcblxyXG4gICAgX2luZGV4T2Y6IGZ1bmN0aW9uIChhcnIsIG9iaikge1xyXG4gICAgICAgIGlmIChhcnIuaW5kZXhPZikgcmV0dXJuIGFyci5pbmRleE9mKG9iaik7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgaWYgKGFycltpXSA9PT0gb2JqKSByZXR1cm4gaTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfVxyXG59KTtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgQXJ0aHVyIG9uIDIwMTQvMTIvMjAuXHJcbiAqL1xyXG52YXIgcmVzID0gcmVxdWlyZSgnLi4vLi4vcmVzb3VyY2UuanMnKS5yZXM7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGNjLkxheWVyLmV4dGVuZCh7XHJcbiAgICBfcm9vdE5vZGU6IG51bGwsXHJcblxyXG4gICAgY3RvcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5fc3VwZXIoKTtcclxuICAgICAgICB0aGlzLl9yb290Tm9kZSA9IGNjcy5jc0xvYWRlci5jcmVhdGVOb2RlKHJlcy5NYWluTm9kZSk7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLl9yb290Tm9kZSk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKHBsYXllcikge1xyXG4gICAgICAgIHRoaXMudXBkYXRlKHBsYXllcik7XHJcblxyXG4gICAgICAgIHZhciByb290Tm9kZSA9IHRoaXMuX3Jvb3ROb2RlO1xyXG4gICAgICAgIHZhciBidG5fdHJhaW4gPSByb290Tm9kZS5nZXRDaGlsZEJ5TmFtZSgnbWFpbl9wYW5lbCcpLmdldENoaWxkQnlOYW1lKCdidG5fdHJhaW4nKTtcclxuICAgICAgICBidG5fdHJhaW4uYWRkQ2xpY2tFdmVudExpc3RlbmVyKHRoaXMuYnV0dG9uVHJhaW5MaXN0ZW5lci5iaW5kKHRoaXMpKTtcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlOiBmdW5jdGlvbihwbGF5ZXIpIHtcclxuICAgICAgICB2YXIgbm9kZSA9IHRoaXMuX3Jvb3ROb2RlO1xyXG4gICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ21haW5fcGFuZWwnKS5nZXRDaGlsZEJ5TmFtZSgndHh0X2hwJykuc2V0U3RyaW5nKHBsYXllci5ocCk7XHJcbiAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZSgnbWFpbl9wYW5lbCcpLmdldENoaWxkQnlOYW1lKCd0eHRfaHAnKS5zZXRTdHJpbmcocGxheWVyLmF0ayk7XHJcbiAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZSgnbWFpbl9wYW5lbCcpLmdldENoaWxkQnlOYW1lKCd0eHRfaHAnKS5zZXRTdHJpbmcocGxheWVyLmhwKTtcclxuICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCdtYWluX3BhbmVsJykuZ2V0Q2hpbGRCeU5hbWUoJ3R4dF9ocCcpLnNldFN0cmluZyhwbGF5ZXIuaHApO1xyXG4gICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ21haW5fcGFuZWwnKS5nZXRDaGlsZEJ5TmFtZSgndHh0X2hwJykuc2V0U3RyaW5nKHBsYXllci5ocCk7XHJcbiAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZSgnbWFpbl9wYW5lbCcpLmdldENoaWxkQnlOYW1lKCd0eHRfaHAnKS5zZXRTdHJpbmcocGxheWVyLmhwKTtcclxuICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCdtYWluX3BhbmVsJykuZ2V0Q2hpbGRCeU5hbWUoJ3R4dF9ocCcpLnNldFN0cmluZyhwbGF5ZXIuaHApO1xyXG4gICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ21haW5fcGFuZWwnKS5nZXRDaGlsZEJ5TmFtZSgndHh0X2hwJykuc2V0U3RyaW5nKHBsYXllci5ocCk7XHJcbiAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZSgnbWFpbl9wYW5lbCcpLmdldENoaWxkQnlOYW1lKCd0eHRfaHAnKS5zZXRTdHJpbmcocGxheWVyLmhwKTtcclxuICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCdtYWluX3BhbmVsJykuZ2V0Q2hpbGRCeU5hbWUoJ3R4dF9ocCcpLnNldFN0cmluZyhwbGF5ZXIuaHApO1xyXG4gICAgfSxcclxuXHJcbiAgICBidXR0b25UcmFpbkxpc3RlbmVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAodGhpcy5vblRyYWluKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25UcmFpbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgQXJ0aHVyIG9uIDIwMTQvMTIvMjEuXHJcbiAqL1xyXG52YXIgcmVzID0gcmVxdWlyZSgnLi4vLi4vcmVzb3VyY2UuanMnKS5yZXM7XHJcblxyXG52YXIgdGFza3MgPSBbXCLnlJ/lkb1cIiwgXCLmlLvlh7tcIiwgXCLpmLLlvqFcIiwgXCLnoLTpmLJcIiwgXCLmmrTlh7tcIiwgXCLpn6fmgKdcIiwgXCLpl6rpgb9cIiwgXCLlkb3kuK1cIl07XHJcbnZhciBERUZBVUxUX0NPVU5UID0gMTAwO1xyXG5tb2R1bGUuZXhwb3J0cyA9IGNjLkxheWVyLmV4dGVuZCh7XHJcbiAgICBjdG9yOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLl9zdXBlcigpO1xyXG4gICAgICAgIHZhciB0cmFpbk5vZGUgPSBjY3MuY3NMb2FkZXIuY3JlYXRlTm9kZShyZXMuVHJhaW5Ob2RlKTtcclxuICAgICAgICB0aGlzLmFkZENoaWxkKHRyYWluTm9kZSk7XHJcblxyXG4gICAgICAgIHZhciBzaXplID0gY2Mud2luU2l6ZTtcclxuICAgICAgICB2YXIgYmFzZVkgPSBzaXplLmhlaWdodCo4NC8xMDA7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YXNrcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgeSA9IGJhc2VZIC0gMTAwKihpKzEpO1xyXG4gICAgICAgICAgICB2YXIgdGFza05vZGUgPSBjY3MuY3NMb2FkZXIuY3JlYXRlTm9kZShyZXMuVGFza05vZGUpO1xyXG4gICAgICAgICAgICAvLyDkv67mlLnplJrngrnml6DmlYjvvIzpu5jorqTplJrngrnkuLooMCwwKVxyXG4gICAgICAgICAgICB0YXNrTm9kZS5hdHRyKHtcclxuICAgICAgICAgICAgICAgIHg6IDAsXHJcbiAgICAgICAgICAgICAgICB5OiB5XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB2YXIgdGFza19uYW1lID0gdGFza05vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3Rhc2tfbmFtZScpO1xyXG4gICAgICAgICAgICB0YXNrX25hbWUuc2V0U3RyaW5nKHRhc2tzW2ldKTtcclxuICAgICAgICAgICAgdGFza19uYW1lLmF0dHIoe1xyXG4gICAgICAgICAgICAgICAgYW5jaG9yWDogMCxcclxuICAgICAgICAgICAgICAgIGFuY2hvclk6IDAuNVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdmFyIGNvdW50X3ZhbHVlID0gdGFza05vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2NvdW50X3ZhbHVlJyk7XHJcbiAgICAgICAgICAgIGNvdW50X3ZhbHVlLnNldFN0cmluZyhERUZBVUxUX0NPVU5UICsgJ+asoScpO1xyXG4gICAgICAgICAgICBjb3VudF92YWx1ZS5hdHRyKHtcclxuICAgICAgICAgICAgICAgIGFuY2hvclg6IDAsXHJcbiAgICAgICAgICAgICAgICBhbmNob3JZOiAwLjVcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgYnRuX3N0YXJ0X3Rhc2sgPSB0YXNrTm9kZS5nZXRDaGlsZEJ5TmFtZSgnYnRuX3N0YXJ0X3Rhc2snKTtcclxuICAgICAgICAgICAgYnRuX3N0YXJ0X3Rhc2suYWRkQ2xpY2tFdmVudExpc3RlbmVyKHRoaXMuc3RhcnRUYXNrRXZlbnQuYmluZCh0aGlzLCBidG5fc3RhcnRfdGFzaykpO1xyXG4gICAgICAgICAgICBidG5fc3RhcnRfdGFzay5zZXRUaXRsZVRleHQoJ+W8gOWni+S7u+WKoScpO1xyXG4gICAgICAgICAgICBidG5fc3RhcnRfdGFzay5zZXRUaXRsZUZvbnRTaXplKDE4KTtcclxuXHJcbiAgICAgICAgICAgIHRyYWluTm9kZS5hZGRDaGlsZCh0YXNrTm9kZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnRUYXNrRXZlbnQ6IGZ1bmN0aW9uKHNlbmRlcikge1xyXG4gICAgICAgIHNlbmRlci5zZXRUaXRsZVRleHQoJ+W3suW8gOWniycpO1xyXG4gICAgfVxyXG59KTsiLCIvKipcclxuICogQ3JlYXRlZCBieSBBcnRodXIgb24gMjAxNC8xMi8yMS5cclxuICovXHJcblxyXG52YXIgcHVyZW12YyA9IHJlcXVpcmUoJ3B1cmVtdmMnKS5wdXJlbXZjO1xyXG52YXIgU2NlbmVNZWRpYXRvciA9IHJlcXVpcmUoJy4vc2NlbmVNZWRpYXRvci5qcycpO1xyXG52YXIgY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vLi4vYXBwQ29uc3RhbnRzLmpzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHB1cmVtdmMuZGVmaW5lKFxyXG4gICAgLy8gQ0xBU1MgSU5GT1xyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICd2aWV3Lm1lZGlhdG9yLkRpcmVjdG9yTWVkaWF0b3InLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5NZWRpYXRvcixcclxuICAgICAgICBjb25zdHJ1Y3RvcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHB1cmVtdmMuTWVkaWF0b3IuY2FsbCh0aGlzLCB0aGlzLmNvbnN0cnVjdG9yLk5BTUUpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgLyoqIEBvdmVycmlkZSAqL1xyXG4gICAgICAgIGxpc3ROb3RpZmljYXRpb25JbnRlcmVzdHM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgIGNvbnN0YW50cy5OT1RJRklDQVRJT04uU0NFTkVfQ0hBTkdFRFxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKiBAb3ZlcnJpZGUgKi9cclxuICAgICAgICBoYW5kbGVOb3RpZmljYXRpb246IGZ1bmN0aW9uIChub3RpZmljYXRpb24pIHtcclxuICAgICAgICAgICAgY2MubG9nKCdoYW5kbGVyIG5vdGlmaWNhdGlvbiBvbiBkaXJlY3RvciBtZWRpYXRvcicpXHJcbiAgICAgICAgICAgIHN3aXRjaCAobm90aWZpY2F0aW9uLmdldE5hbWUoKSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBjb25zdGFudHMuTk9USUZJQ0FUSU9OLlNDRU5FX0NIQU5HRUQ6XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jYy5sb2coJ1NDRU5FX0NIQU5HRUQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjZW5lTWVkaWF0b3IgPSB0aGlzLmZhY2FkZS5yZXRyaWV2ZU1lZGlhdG9yKFNjZW5lTWVkaWF0b3IuTkFNRSApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihzY2VuZU1lZGlhdG9yICYmIHNjZW5lTWVkaWF0b3IuZ2V0Vmlld0NvbXBvbmVudCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLnJ1blNjZW5lKG5ldyBjYy5UcmFuc2l0aW9uRmFkZSgxLjIsIHNjZW5lTWVkaWF0b3IuZ2V0Vmlld0NvbXBvbmVudCgpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKiBAb3ZlcnJpZGUgKi9cclxuICAgICAgICBvblJlZ2lzdGVyOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKiBAb3ZlcnJpZGUgKi9cclxuICAgICAgICBvblJlbW92ZTogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy8gU1RBVElDIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBOQU1FOiAnRGlyZWN0b3JNZWRpYXRvcidcclxuICAgIH1cclxuKTtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgQXJ0aHVyIG9uIDIwMTQvMTIvMjAuXHJcbiAqL1xyXG52YXIgcHVyZW12YyA9IHJlcXVpcmUoJ3B1cmVtdmMnKS5wdXJlbXZjO1xyXG52YXIgY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vLi4vYXBwQ29uc3RhbnRzLmpzJyk7XHJcbnZhciBQbGF5ZXJQcm94eSA9IHJlcXVpcmUoJy4uLy4uL21vZGVsL3Byb3h5L3BsYXllclByb3h5LmpzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdmaWdodGVyLnZpZXcubWVkaWF0b3IuSG9tZU1lZGlhdG9yJyxcclxuICAgICAgICBwYXJlbnQ6IHB1cmVtdmMuTWVkaWF0b3JcclxuICAgIH0sXHJcblxyXG4gICAgLy8gaW5zdGFuY2UgbWVtYmVyc1xyXG4gICAge1xyXG4gICAgICAgIC8qKiBAb3ZlcnJpZGUgKi9cclxuICAgICAgICBsaXN0Tm90aWZpY2F0aW9uSW50ZXJlc3RzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKiBAb3ZlcnJpZGUgKi9cclxuICAgICAgICBoYW5kbGVOb3RpZmljYXRpb246IGZ1bmN0aW9uKG5vdGUpIHtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqIEBvdmVycmlkZSAqL1xyXG4gICAgICAgIG9uUmVnaXN0ZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKiogQG92ZXJyaWRlICovXHJcbiAgICAgICAgb25SZW1vdmU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgcGxheWVyUHJveHkgPSB0aGlzLmZhY2FkZS5yZXRyaWV2ZVByb3h5KFBsYXllclByb3h5Lk5BTUUpO1xyXG4gICAgICAgICAgICB2YXIgcGxheWVyRGF0YSA9IHBsYXllclByb3h5LmdldFBsYXllcigpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIEhvbWVMYXllciA9IHJlcXVpcmUoJy4vLi4vY29tcG9uZW50L2hvbWVMYXllci5qcycpO1xyXG4gICAgICAgICAgICBzZWxmLnZpZXdDb21wb25lbnQgPSBuZXcgSG9tZUxheWVyKCk7XHJcbiAgICAgICAgICAgIHNlbGYudmlld0NvbXBvbmVudC5vblRyYWluID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2VuZE5vdGlmaWNhdGlvbihjb25zdGFudHMuU0NFTkVfQUNUSU9OLCB7bmFtZTogY29uc3RhbnRzLlNDRU5FLlRSQUlOfSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHNlbGYudmlld0NvbXBvbmVudC5pbml0KCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ2V0UmVzb3VyY2U6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBzdGF0aWMgbWVtYmVyc1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6ICdIb21lTWVkaWF0b3InXHJcbiAgICB9XHJcbikiLCIvKipcclxuICogQ3JlYXRlZCBieSBBcnRodXIgb24gMjAxNC8xMi8yMS5cclxuICovXHJcblxyXG52YXIgcHVyZW12YyA9IHJlcXVpcmUoJ3B1cmVtdmMnKS5wdXJlbXZjO1xyXG52YXIgY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vLi4vYXBwQ29uc3RhbnRzLmpzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHB1cmVtdmMuZGVmaW5lXHJcbihcclxuICAgIC8vIENMQVNTIElORk9cclxuICAgIHtcclxuICAgICAgICBuYW1lOiAnZmlnaHRlci52aWV3Lm1lZGlhdG9yLlNjZW5lTWVkaWF0b3InLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5NZWRpYXRvclxyXG4gICAgfSxcclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBfaW5pdGlhbGl6ZWQ6IGZhbHNlLFxyXG5cclxuICAgICAgICBsb2FkZXJJbWFnZTogXCJkYXRhOmltYWdlL2pwZWc7YmFzZTY0LC85ai80UUFZUlhocFpnQUFTVWtxQUFnQUFBQUFBQUFBQUFBQUFQL3NBQkZFZFdOcmVRQUJBQVFBQUFBbEFBRC80UU1wYUhSMGNEb3ZMMjV6TG1Ga2IySmxMbU52YlM5NFlYQXZNUzR3THdBOFAzaHdZV05yWlhRZ1ltVm5hVzQ5SXUrN3Z5SWdhV1E5SWxjMVRUQk5jRU5sYUdsSWVuSmxVM3BPVkdONmEyTTVaQ0kvUGlBOGVEcDRiWEJ0WlhSaElIaHRiRzV6T25nOUltRmtiMkpsT201ek9tMWxkR0V2SWlCNE9uaHRjSFJyUFNKQlpHOWlaU0JZVFZBZ1EyOXlaU0ExTGpBdFl6QTJNQ0EyTVM0eE16UTNOemNzSURJd01UQXZNREl2TVRJdE1UYzZNekk2TURBZ0lDQWdJQ0FnSUNJK0lEeHlaR1k2VWtSR0lIaHRiRzV6T25Ka1pqMGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNVGs1T1M4d01pOHlNaTF5WkdZdGMzbHVkR0Y0TFc1ekl5SStJRHh5WkdZNlJHVnpZM0pwY0hScGIyNGdjbVJtT21GaWIzVjBQU0lpSUhodGJHNXpPbmh0Y0UxTlBTSm9kSFJ3T2k4dmJuTXVZV1J2WW1VdVkyOXRMM2hoY0M4eExqQXZiVzB2SWlCNGJXeHVjenB6ZEZKbFpqMGlhSFIwY0RvdkwyNXpMbUZrYjJKbExtTnZiUzk0WVhBdk1TNHdMM05VZVhCbEwxSmxjMjkxY21ObFVtVm1JeUlnZUcxc2JuTTZlRzF3UFNKb2RIUndPaTh2Ym5NdVlXUnZZbVV1WTI5dEwzaGhjQzh4TGpBdklpQjRiWEJOVFRwRWIyTjFiV1Z1ZEVsRVBTSjRiWEF1Wkdsa09qTTRNREJFTURZMlFUVTFNakV4UlRGQlFUQXpRakV6TVVORk56TXhSa1F3SWlCNGJYQk5UVHBKYm5OMFlXNWpaVWxFUFNKNGJYQXVhV2xrT2pNNE1EQkVNRFkxUVRVMU1qRXhSVEZCUVRBelFqRXpNVU5GTnpNeFJrUXdJaUI0YlhBNlEzSmxZWFJ2Y2xSdmIydzlJa0ZrYjJKbElGQm9iM1J2YzJodmNDQkRVelVnVjJsdVpHOTNjeUkrSUR4NGJYQk5UVHBFWlhKcGRtVmtSbkp2YlNCemRGSmxaanBwYm5OMFlXNWpaVWxFUFNKNGJYQXVhV2xrT2tVMlJUazBPRU00T0VSQ05ERXhSVEU1TkVVeVJrRTNNME0zUWtFMU5UbEVJaUJ6ZEZKbFpqcGtiMk4xYldWdWRFbEVQU0o0YlhBdVpHbGtPa1UyUlRrME9FTTVPRVJDTkRFeFJURTVORVV5UmtFM00wTTNRa0UxTlRsRUlpOCtJRHd2Y21SbU9rUmxjMk55YVhCMGFXOXVQaUE4TDNKa1pqcFNSRVkrSUR3dmVEcDRiWEJ0WlhSaFBpQThQM2h3WVdOclpYUWdaVzVrUFNKeUlqOCsvKzRBRGtGa2IySmxBR1RBQUFBQUFmL2JBSVFBRFFrSkNRb0pEUW9LRFJNTUN3d1RGaEVORFJFV0doVVZGaFVWR2hrVUZoVVZGaFFaR1IwZklCOGRHU2NuS2lvbkp6azRPRGc1UUVCQVFFQkFRRUJBUUFFT0RBd09FQTRSRHc4UkZBNFJEaFFWRVJJU0VSVWZGUlVYRlJVZktCMFpHUmtaSFNnakppQWdJQ1lqTEN3b0tDd3NOemMxTnpkQVFFQkFRRUJBUUVCQS84QUFFUWdBeUFDZ0F3RWlBQUlSQVFNUkFmL0VBTEFBQUFFRkFRRUFBQUFBQUFBQUFBQUFBQVFBQWdNRkJnY0JBUUVBQXdFQkFBQUFBQUFBQUFBQUFBQUFBUU1FQWdVUUFBSUJBZ0lFQndvTEJnUUdBd0FBQUFFQ0F3QUVFUVVoTVJJR1FWRnhzVElURkdHQndkRWlRbEtTTXpXUm9lRmljcUt5STFOekZZSmpKRFFXQjlLalZDYnh3a05rSldYaWszUVJBQUlCQWdNRkJRY0RCUUVBQUFBQUFBQUJBaEVESVJJRU1VRlJjVEpod1ZJVUJaR2hzU0p5RXpPQjBVTGhZcElqVXhYLzJnQU1Bd0VBQWhFREVRQS9BTUpTcFVxQVZLbFh1RkFlVXE5d3BVQjVYdUZlNFY2b29EelpIRG94MENuR01pbnp3bDdaOE5hamFIZW9PM3ZtVEJaQnRwOVlVSXFURVY1Uk94SEtuV1JuYVU4VlJNaEZCVWpwVjdoU29TZVVxOXBVQjVTcjJsaFFIbEt2Y0s4b0JWN2hTRlNScnRhS0FaczA3WU5QTTFwRzJ4SklBdzFqU2VhbmRyeS84WDRtOFZDS2tXd2FXd2FtN1hsLzR2MVc4Vkx0bVgvaS9WYnhVb0trV3dha1NNNDA3dG1YL2kvVmJ4VW16R3dqUXNqZFk0MUlBUmllL1UwSWJaTzBrTnRDWG5PQ2tFQmVGdTRLSTNCczdETmIyN3lhK2pEeDNrSmVFbnBKSkVjUVZiV0RzazE3dTV1cmQ1OTF1Y1prV2h5bTJWbmQ5UmtDREVwRnhEUnBidzBidW51NW1scDJEZTJGTUxZWE9EMndCMnhiT2VyYVVjWUdKNzJtbFNVaXF6emR6TWQzWjNtaXhsdEEyeXpjSy9ObEhNMURReVJYY2UxSG9jZE5PRWZKWFo4OHk5Wm9qT3FoaUJzeklSaUhROFk0Y0s1VHZIdXpMbGpITk1xeE5vRGpMRnJhSEhualB4Y05DR1ZieEVVellOVHg1alpTeGhwVzZxVHpsd0orREN2TzJaZitMOVZ2RlNncXlIWU5MWU5UZHNzUHhmaWJ4VXUxNWY4QWkvVlBpcUNha093YTgyRFUvYTh2L0YrSnZGVERkV1BCTDhSOFZLQ3ZZUllWNVV6b01BeTZRZElJcUkwQjRLSnR4aVJRd291MTZRb0dVa250SDVUejBSYlpibUYyaGt0cmFTVkJvMmxVa1k4dER5ZTBmbFBQWFRzbFZVeWl5VlJzanFVT0E0eU1UOGRXMnJhbTJtNlVWVE5xOVM3RUl5VVZKeWRNVG4vNkRuUCtpbTlXbCtnNXovb3B2VnJwdGVFaFFXWTRBYVNUd0FWZjVXUGlaaC85UzUvemo3emx0emxtWVdrZldYTnZKREdUZ0djWURIaXJSN2k3bVNid1hQYXJzRk1yZ2I3dzZqS3cvd0NtbmM5STE0a0YzdnB2Q2xqYk15V01PSkw0YUVpQjhxVS9PYlVLN0hZV1ZybDFwRlpXaUNPQ0JRcUtPTGpQR1RyTlpacUtiVVhWSHEybk53VHVKUmsxVnBiZ1hOOHM3Ums1eW0wVVFRemhJRzJOQWpoeEhXYkkrZ0NCVmpCQkZid3h3UXFFaWlVSkdnMUJWR0FGZTdkVjI4V1lMWVpGbUYyVGgxVUQ3SkdqeW1HeW4xaUs1T3l6SUJHQjFIZ3JMWmhhbXp1bVFBR0p3U3FuU0NoMXEzR09Db2R4dDRjeHVyZGNwenVONGN5aGlXYUY1QmcwOXVkVW1uV3cxSC9qVjluRnVKN1F1bys4aDhwZVRoRkErMDQ3dmR1eU10azdmWXFUbDA3WUZkZlV1Zk1QelQ1cDcxVWR0bG1ZWGFHUzJ0M21RSEFzZ3hBTmRhZFlKb3BMZTRRUzI4NjdFc1o0UWZDTllyQ0ZiamREUG1na1l5V0Z4Z1ZmMDRpZkpmNlNjTmRSVVcxWEJiNkZVNVRqRjVFcFNTckd1L3M1bE4rZzV6L29wdlZwZm9PYy93Q2ltOVd0ZEhuYXR2T2JKWERXN3hMR2hCOG5yUGFZOS9IQ3IrdEVkUENWYVNlRG9ZTG5xRjYzbHpXNC9QRlNXM2VjeGJJODRWU3pXVXdVYVNkZzBEWFhLNW52QWlwbmQ2cWdLdlduUU83cHJpOVpVRW1tM1ZsMmoxa3I4cFJsRlJ5cXVCTlpqR3hRL1M1NlkxUzJmdTlPVnVlb24xMVN6YWhvb3UwNlFvUVVYYWRJVkNEMkZKSjdSK1U4OWRNeWR2OEF4ZG4rVEg5bXVaeWUwZmxQUFhRc3RsSzVUYmthMWdVamxDMXEwdlZMa2ViNnIrTzNUeDl4Y1kxbnQ4YzBOclpDeWlPRTExMDhOWWpHdjFqb283SnMxanpLeVNjWUxJdmt6TDZMRHdIWFZKa3NIOVNiNDlkS05xMHRqMWpBNnVyaU9DTCswMkZXWDdpVnRaWDEvQXphSFR5ZW9hdUtuMk1YOVc3OXplYmlaQ3VSNU1qU3JoZlh1RXR3VHJVZVpIK3lOZmRyUk5jeEk2SXpoWGxKRWFrNldJR0oyUnc0Q2hXbkNobmR0bFZCTE1kUUEwazFnYlhOTXp6RGZETHM2bWphUEtwcEpiV3dKMWJPd3d4dzQzT25IaDcxWVQzRHBmV1VKbUZsYjVqSEhEZGVYQkhJc3JSZWE1VFNxdnhxRzA0Y05ONjJ2ZXRvQ1M0dHJlNW1nbmtHRTlxKzNES09rdUkyV1g2TERRUlJIV0RoMVVDdHdqN1FSZzJ3ZGw4RGpndzFxZTdYdlcwQlEza2ZaN21TTGdVK1Q5RTZSVmJudVZybldWU1dxaitMdDhaYlJ1SEVkS1BrWVZjWjJNSlk1ZlNHeWVWYXI0NStya1dRSEFxY2NhbFBFNWttMWh0V0s1bks0V250NUZ1VUJVd09NRzRuR2tBL0JYVXJXNFM2dG9ybE9qTWdjZC94Vm43ckxvN3pLczB1RWpDTmVTdmR3b0JoZ3NaeFgxbDJqMzZrM0x1K3V5cHJkajVWczVBK2kvbEQ0OGEwYWFWSk9QaTdqQjZsYnpXb3pwakI0OHBmMU5EWE5ONHZmbDcrWjRCWFM2NXB2Rjc4dmZ6UEFLNzFYVEhtWi9TL3lUK2p2SjdMM2ZIeXR6MUUrdXBiTCtRajVXNTZqZlhXUm5zSVlLTHRla0tFRkdXdlNGUWd5ams5by9LZWV0M1l0aGxNUC81eDltc0pKN1IrVTg5Yml5Yi9BTVhFdjdnRDZ0YWRMMVQra3dlcFJyQzM5WmtMRE1iaXdNdlVIUlBHMGJqbEdnOG9yZS8yM3N4QmxkeGZNUEx1cE5oVDh5TC9BT1JOWmJkeko0ODRzY3l0eGdMcUpZNUxaajZRMnNWNUcxVnVkMW1qanlHMGlqME5FR1NaVG9LeWhqdHF3NHdhenR1aVhBM3FLVGJTeGx0ZkdoYlpsRTk1WnRacXhWYmdpT1pockVSOXBoM1N2azkrcEpJTFo0WTRER0JGQ1VNS2pSc0dQb2JQRmhVZlcwTkptbGpFMnhKY0lyY0kydkZVRWxuMWxSWGQ2bHJhelhUOUdDTnBEK3lOcW9JN21PVmR1Tnc2bnpsT0lvUE9VYTZ5eWUxWFhjYk1SNUdkUTN4WTBCU2JqMzEvRmNUUVppckorcTQzMXE3YW5iSENUWjcyQnc3bGJQcktCTWNCV05OZ2JNQkJoK2JzakJkbmkwVkoxbEFSWnM2eVdpdXB4Q3VNRHk2S3BTMkl3T282RFRyM01yZTNlNXRaWlZVTTRaQmpxT09Kb1dPNGprWGFqY09PTUhHZ0RJU3ZXSXJkQWtLUjgwK1R6Vmw5MDhiUFBMM0x6eE91SGRpZnhWZmlUQWc5MnFJL3crLzhnR2dTeU4vbVI3WFBWbHAwbEYvM0wzbWJWS3R1NUhqYmsvOEFIRTJGYzAzaTkrWHY1bmdGZEtOYzEzaTkrWHY1bmdGYU5WMHg1bm4rbC9rbjlIZUVXWHUrUGxibnFKOWRTMlh1OU9WdWVvbjExa1o3Q0dDakxYcENneFJscjBoVUlQWVVjbnRINVR6MXM4dmIrQnQxL2RxUGlyR1NlMGZsUFBXdXNHL2c0UHkxNXEwNlhxbHlNV3ZWWVErcnVJOXhKT3F6TzloT3RvL3NQOHRiR09GSXJtV2VNN0l1TURNbkFYWFFKT1VqUWVPc0prMG5ZOTZpcDBDWXVucmphSHgxdCtzclBKVWJYQm0yTHJGUGlrd1RPYitUK1ZoYlp4R01yRFhwODN4MVFTeTJ0dWNKcFVqUEVUcCtDbjUvZnRhUnZLdnRwM0t4NDhIRzNlckhNek94WmlXWnRMTWRKTlFTYmJMNzFWazZ5eW5WaU9rcW5FRWZPV3RQYlhpM0VRa0dnNm1YaU5ja2plU0p4Skd4UjEwcXcwR3R4dXhtdmJJbUQ0Q1pNRmxBNGZSZnYwQnFlc3FxelRNWk5NRURiSUh0SEgyUWVDaVpKU3FNUWRPR2l1ZTUzbXozY3pRd3NSYkljTkhua2VjM2M0cUFNdXJpejY4Z1RJVG94d09PbmxwME1qeE1KWVc3NDFHczNSVmxkdGJ5Z0UvZE1jSFgvbW9EYXhUaVdOWkI1M0IzYXJiOC93Qys0U09GNHNmL0FLeFU5a2NCc2ZPR0hmb1VIdEcvUmJ6WTVEaWU1SEhoWGR2YXZxaVo5UThKZGxxNC9nYkt1YTd4ZS9MMzh6d0N1aHBmMlVrL1pvNTBrbXdKS0lkb2dEancxVnp6ZUwzNWUvbWVBVnAxTFRncVk0bm4rbVJhdXpxbXF3cmp6Q0xMM2ZIeXR6MUUrdXBMTCtRajVXNTZqZlhXUm5yb1lLTHRla0tFRkYydlNGUWc5aFNTZTBmbFBQV29zbS9oSWZvTHpWbDVQYVB5bm5yUldiL3cwWDBGNXEwNlhxbHlNMnNWWXg1Z21iRnJlL3Q3MU5ZMlQrMGg4VmJTTzVTV05KVU9LU0FNcDdqREdzcG1NUGFMUmxYUzZlV3ZlMS9GUk83V1lkYlptMVkvZVcvUjdxSHhIUlhHb2psbTN1bGlkNmFWYmFXK09BTHZnQ0xxMkhtOVd4SEtXcWpoajZ4c0sxZThkbTE1bDRuaUcxTFprc3dHc3h0clBlT21zdmF5QkpBMVZJdGxXanB0THVUZFBNbzdMdGpSRHE5bmFLNCtXRjlJclVXN0JhSE9sakdxVkhCN3cyaHpWb1p0ODdkOHZhTllTTGwwMkNjUnNERWJKYmo3MVV1N1VCa3ZKNy9EN3EyUW9EeHlTYUFPOE1UWGR4UlZNcFJwNVhaT1dkRi9tczdSNVhkeUtmS1dKc08vNVBockc1WGxOeG1FeXdXNmJUblR4QUFjSk5iR1NNWGtNMXBqZ2JpTm8xUHppUEorT3M3dTdtLzZSZU0wMFpPZ3hTcHFZWUhUM3dSWE1LTjRsbDl6VUc0YlFmTnNodThzWlZ1RUEyaGlyQTRxZS9WT3d3clZiemJ3dzVtSTQ0VUtSUllrYldHMFMzSldjdGJkN3U1V0ZmT09MSGlVZEpxbWFpcGZMc0lzT2JoV2UwMDFsTWtNVnZKTmpoZ2hJQUxNY0J4Q3M3ZnhYUW1rdXB4MWJYRHN3R1BsYVRpZFZhRXlLTlhrb280ZUJWK1NxN0w3VnM5emNCZ2V5UTRHUS9NQjFjcm1vaW0yb3JlenFjb3dUdVNlRVk0OGpRN29aWDJQTHpkeUxoTmQ2UmpyRVk2STcrdXNwdkg3OHZmelBBSzZVQUFBRkdBR2dBY0FybXU4WHZ5OS9NOEFyVGZpbzI0Ulc1bm5hRzY3dW91M0gvS1B1cVQyWDhoSHl0ejFHK3VwTEwzZW5LM1BVYjY2eXM5UkRCUmRyMGhRZ291MDZRcUVHVWtudEg1VHoxZTIzOHZGOUJlYXFLVDJqOHA1NnZiYitYaStndk5XalRkVXVSbjFYVEhtVGg4S3JKVEpsdDh0MUNQSVk0NGNHbnBKVmpUSllrbWphTjlJYjR1N1Y5MjNualRldGhSYXVaSlYzUGFXMXJmTElpWEVEWWc2UjRWWWM5Q1hXN3RoZk9aYktkYkdadExXOHVQVlkvdTNHcmtOVWtNOXpsY3hVamJoZldPQTkwY1JxNGd2NExoZHFOK1ZUb05ZV21uUm05Tk5WV05UeUhjNlZXQnY4d3Q0WWVIcW02eHlQbXJvcTFaN1dHRkxTeFRxN1dMU3VQU2RqcmtmdW1xNXlIWERVZUE5Mm9PMlNLcFZ1bU5BYW9KTE1YSDNteXAwcnBKNHVLaGMzdGJETTVCTXJpMXpBajc5ajdLVGlZOFRjZEJwY3NpdGgwMjg2bytzUENhZ0VYOVB6ZzR6WFVDcDZRWXNlOG9vdUNHM3RrNm0xQll2MDVXNlQrSWR5b2x4YkhEQUFhMk9nRGxOQ3ozcnlOMld4QmQ1UEpNZzF0ODFlSWQydWtxbkxsVEJiZmN1WSs5dUpMaVJjdnRQdkhkc0hLK2NmUkhjSERXc3lhd2p5eTBXQmNESTNsVFA2VGVJY0ZWK1M1T21YeDliSmcxMDQ4bzhDajBWOEpxMkRWdTA5bkw4MHVwN094SGkrb2FsM1A4QVhCL0lzWlM4VC9ZT1Y2NXp2Q2NjN3ZmelBBSzNpdldDejQ0NXplSDk1NEJYT3I2STh5ZlNmeXoranZDTFAzZkh5dHoxRyt1cExQM2ZIeXR6MUUrdXNiUGFRMFVYYWRJVUlLTHRla0toQjdDa2s5by9LZWVyMjIvbDQvb0x6VlJTZTBmbFBQVjdiL3k4WDBGNXEwYWJxbHlNK3E2WTh5UXNCVERNb3IxbzhhaWFFMXBibHVNcVMzc2JMTEhJaFNSUXluZ3F1a2hhSjl1QmpvK0g1YU9hM2FvMnQzNHFvdVJsTGFqVGFsR1A4djBJWTh5bFhRK1BLUEZVL2JZWE9MUGdlNkNLaWEwTGF4VE94SHUxUTdjdUJkOXlQRUo3VGJqWEtPOENhamJNSUY2Q05JZU52SkhqcUlXSjd0U3BZa2FscVZibHdJZHlHK1JHWHVyMGhYWUpGeGFsK0RocTV5M3Nsa3YzWTJwRDBwVHIrUVVDbHBKUlVkbzlYVzRPTHJUSHRNMTZjWkxMV2tlQzd5NGp2bE5FcGNSdHcxVXgyN0NpNDQ4TlpyVEZ5M25uM0lRV3hsZ0dyRFozcHphNy9NOEFyWm8rQXJGNTE3MXV2cCtDcWRWMFI1bC9wc1VyczJ2QjNoZGw3dlRsYm5xSjlkUzJYdStQbGJucUo5ZFkyZXNob29xMTZRb1FVWGE5SVZDRDJGTEo3UnVVODlXTnRtVVNRcWtnWU1ndzBhY2NLcnBQYVB5bm5yWldHNFZpK1ZXbVk1dG5NV1hHK1hySVluQTByaGowbWRjVGdkTmR3bktEcWptZHVNMVNSUi9xbHI4LzRLWDZwYThUL0JWekR1TFpYdWRSWmJsbWJ4WGNQVU5QYzNLcUNJd3JiT3pnckhFbkhqb3lEKzNlU1hraHQ3RGVLRzR1bURHT0pWVWtsZm91VGhYZm1iblo3Q3Z5MXZ0OXBtdjFXMStkOEZMOVZ0ZUp2Z3E1eXJjT0dmTG16SE44MGl5eUVUUGJwdEFFRm8yWkc4cG1VYTFPRk5uM0t5Nlcvc2JES001aHY1YngyV1RaQSs3UkYyeTUyV09QSlR6RSt6MkR5MXZ0OXBUL0FLcGFjVGVyUy9VN1RpYjFhMDQvdDdrRFhQWTAzamhOMFc2c1E3SzdXM3EyZG5yTWNjYUR5LzhBdDgwa3VaZnFXWXhXTnRsY3ZVUFBoaUdZaFdEZVV5N0l3WVU4eFBzOWc4dGI3ZmFVbjZwYWNUZXJUeG05b09CdlZxM3Y5ejkyN2F5bnVJZDQ0TGlXS05uamhBWEYyVVloUmc1MTZxcHNyeWpMcjIxNjY1ekZMU1RhSzlVMkdPQTg3U3dxWTM3a25SVStCek96YWdzMHMxT3lyK0JLTTZzeHdQNnRTRFBMTWVuNnZ5MHJ2ZG0zU3hsdTdLL1M3V0REckZVRFVUeGduVFU4MjZlWFc3S2x4bXFRdXdEQlhVS2NEKzFYZWUvd1h1S1g1WERHV0xhcFNWY095aEVNL3NlSi9WK1duamVHeDRwUFYrV2ttNmtLWmxGYXkzSmx0N2lGcFlaWThBU1ZLNkRqdEREQTBmOEEwVGwzNDAvMWY4TmR4OHhKVldYQjBLYmt0RkZwTnpkVlhBQy9xT3dBMENRbmkyZmxyTzNWd2JtNWxuSTJUS3hiRGlyWC93QkU1ZCtOY2ZWL3dWUjd4WlBhNVU5dXR2SThuV2htYmJ3MFlFQVlZQVZ4ZmhmeTVybEtSNEZ1bHU2WDdtVzFtelQ4UzRZaXMvNUNQbGJucUo5ZFNXZnU5T1Z1ZW9uMTFtWnZRMmk3WHBDaEtLdGVrS2hCbE5KN1IrVTg5YkRmR1RiM2EzWlgwTGNqNmtkWStUMmo4cDU2MDI4OG0xa1dRcjZNSit5bFNBcisyY25WNXJlbmpzM0gxbG9YKzNqOVh2YmJ0eExOOWxxVzRVblY1amRuanRYSHhpaHR5Wk5qZVNCdTVKOWsxQkplN3h5N1c1Q0ovd0N6dUQvbVRWVGYyK2ZxOTdMSnVMclBzTlJ1ZVM3VzZhSi8zOHgrdkxWWHVZK3h2SGFOeGJmMkdvQ2V6ZjhBMzZqL0FQc1NmOHcxc0xucWN6VGVmSmx1WW9MbTV1bzVGNjFzQnNoSXRQMWNORlllMWY4QTNpci9BUGZFL3dDWlVlOWJCOTRyNWp3dVBzclFGaG1HNGwvWjJNMTdIZFc5MHR1dTNJa1RIYUNqV2RJdzBWVlpka3M5L0MwNnlKRkVwMmRwK0UxYmJxeWJHVFo4dnBRRDdMMVhSdjhBN2JsVDk2T2RhN3RwTnV1TkUzN0NxOUtTaXNqeXVVb3hyU3RLbGxIYkxsV1RYc01zOGNodVN1d0VQRHF3b0xlNXkrWVJFL2dMem1xUmVrdktLdGQ0MzI3eU0vdWxIeG1ySEpTdHlTV1ZSeXJqeEtJMlhDL0NUbG5sUFBLVHBUZEZiUDBMMWJncmY1THAwRzNkUGhRSHdWMFMxbHpCc25zM3NFU1I4Q3JoOVdBSkdqU09LdVUzRSt6ZFpRM29KaDhJQXJkWlhGRG1PVHBIYTNpMitZckkyS3RLeTRyaWNCc0J1SEhnRlhTbzQ0MCtXYTJxcXhqdk05dU1veStXdnpXcExDV1dXRTI4SHhMNmU0M29qZ2tlU0NCWTFSaTVCR0lVRFQ1MWNsM3ZtMjc2QkJxU0VINFdieFYwdGxreVhKY3hUTWIrT1c2dVk5bUdIckN6RFF3d0FiVHAydUt1VFo5TjF1WXNmUlJSOFdQaHJtNDE5bVNTalJ5aXF4Vks3eTIzQi9mdHVUbTJvU2RKeXpOVnczQkZuN3ZUbGJucUY5ZFMyZnU5T1Z1ZW9uMTFsWnVRMmlMZHNHRkQwNUgyZE5RR1YwbnRHNVR6MWRXbTlOMWIya1ZxOEVWd3NJMlVhUWFRT0tobWl0WkdMT21rNjhEaFNGdlkrZ2ZXTlNBZzd6M1F2bzd5S0NLSW9oaWFOUjVMS3h4OHFweHZqY3FTMFZwYnh2d09BY1JRUFo3RDBHOVkwdXoySG9IMWpVQ3BMWTd6WGxwYm0zZUtPNVF1empyQnFaamkzeDE3UHZOY3lUMjg4VnZEQkpiTVdVb3ZTMmhzbFc3bUZROW5zUFFQckdsMmV3OUErc2FDb2QvV054dGJZc3JmYjE3V0J4eDVkZEQyMjgxeEM4OGtsdkRjU1hFbld1enJxT0dHQzl6UlVQWjdEMEc5WTB1eldIb0gxalFWQ0xyZXE2bnRaYmFPM2l0MW1HeTdSalRzMVgybVl5MjBaaUNxOFpPT0RjZEVkbXNQUWIxalM3UFllZ2ZXTmRKdUxxblFpU1VsUnFwRkxtcnl4dEgxTWE3UXcyZ05OUE9kU3Qwb0kyN3AwMDdzOWg2QjlZMHV6MkhvSDFqWFgzWitJNCsxYjhJSmRYODl4TEhLUUZNWFFVYWhweG9pUE41UCtvbmZVK0EwL3M5aDZEZXNhWFo3RDBENnhwRzdPTGJVdHUwU3RXNUpKeDJiQnNtYnRpU2lFaytjeG9DV1dTYVZwWk9rMnZEVm8wVllkbnNQUWIxalNOdlpjQ0gxalNkMmMrcDFYQW1GcUVPbU9QRWZhSCtCUWQxdWVvMjExSXpyZ0ZVWUtOQUFxSTFXenRDcFVxVkNSVXFWS2dGU3BVcUFWS2xTb0JVcVZLZ0ZTcFVxQVZLbFNvQlVxVktnRlNwVXFBVktsU29ELzlrPVwiLFxyXG5cclxuICAgICAgICBsb2FkZXJUZXh0OiBcIuato+WcqOi9veWFpS4uLiBcIixcclxuXHJcbiAgICAgICAgbG9hZGVyRm9udDogXCJBcmlhbFwiLFxyXG5cclxuICAgICAgICAvKiogQG92ZXJyaWRlICovXHJcbiAgICAgICAgbGlzdE5vdGlmaWNhdGlvbkludGVyZXN0czogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICAgICAgY29uc3RhbnRzLlNDRU5FX0FDVElPTlxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKiBAb3ZlcnJpZGUgKi9cclxuICAgICAgICBoYW5kbGVOb3RpZmljYXRpb246IGZ1bmN0aW9uIChub3RpZmljYXRpb24pIHtcclxuICAgICAgICAgICAgc3dpdGNoIChub3RpZmljYXRpb24uZ2V0TmFtZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIGNvbnN0YW50cy5TQ0VORV9BQ1RJT046XHJcbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKG5vdGlmaWNhdGlvbi5nZXRCb2R5KCkubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZpZXdNZWRpYXRvciA9IHRoaXMuZmFjYWRlLnJldHJpZXZlTWVkaWF0b3Iobm90aWZpY2F0aW9uLmdldEJvZHkoKS5uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmlld01lZGlhdG9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0Vmlldyh2aWV3TWVkaWF0b3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2luaXRpYWxpemVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2luaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKiBAb3ZlcnJpZGUgKi9cclxuICAgICAgICBvblJlZ2lzdGVyOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKiBAb3ZlcnJpZGUgKi9cclxuICAgICAgICBvblJlbW92ZTogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzZXRWaWV3OiBmdW5jdGlvbiAodmlld01lZGlhdG9yKSB7XHJcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHNlbGYudmlld0NvbXBvbmVudCA9IG5ldyBjYy5TY2VuZSgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHJlcyA9IHZpZXdNZWRpYXRvci5nZXRSZXNvdXJjZSgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGhhbmRsZVNjZW5lQ2hhbmdlZCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2aWV3TWVkaWF0b3IuaW5pdCgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoaWxkID0gdmlld01lZGlhdG9yLmdldFZpZXdDb21wb25lbnQoKTtcclxuICAgICAgICAgICAgICAgIGlmIChjaGlsZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYudmlld0NvbXBvbmVudC5hZGRDaGlsZChjaGlsZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZi5zZW5kTm90aWZpY2F0aW9uKGNvbnN0YW50cy5OT1RJRklDQVRJT04uU0NFTkVfQ0hBTkdFRCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChyZXMpIHtcclxuICAgICAgICAgICAgICAgIGNjLkxvYWRlclNjZW5lLnByZWxvYWQocmVzLCBoYW5kbGVTY2VuZUNoYW5nZWQsIHRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlU2NlbmVDaGFuZ2VkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy8gU1RBVElDIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBOQU1FOiAnU2NlbmVNZWRpYXRvcicsXHJcbiAgICAgICAgU0NFTkVfQ0hBTkdFX1ZJRVc6ICdTY2VuZUNoYW5nZVZpZXcnXHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFydGh1ciBvbiAyMDE0LzEyLzIwLlxyXG4gKi9cclxudmFyIHB1cmVtdmMgPSByZXF1aXJlKCdwdXJlbXZjJykucHVyZW12YztcclxudmFyIGNvbnN0YW50cyA9IHJlcXVpcmUoJy4uLy4uL2FwcENvbnN0YW50cy5qcycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBwdXJlbXZjLmRlZmluZShcclxuICAgIHtcclxuICAgICAgICBuYW1lOiAnZmlnaHRlci52aWV3Lm1lZGlhdG9yLlRyYWluTWVkaWF0b3InLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5NZWRpYXRvclxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBpbnN0YW5jZSBtZW1iZXJzXHJcbiAgICB7XHJcbiAgICAgICAgLyoqIEBvdmVycmlkZSAqL1xyXG4gICAgICAgIGxpc3ROb3RpZmljYXRpb25JbnRlcmVzdHM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqIEBvdmVycmlkZSAqL1xyXG4gICAgICAgIGhhbmRsZU5vdGlmaWNhdGlvbjogZnVuY3Rpb24obm90ZSkge1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKiogQG92ZXJyaWRlICovXHJcbiAgICAgICAgb25SZWdpc3RlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKiBAb3ZlcnJpZGUgKi9cclxuICAgICAgICBvblJlbW92ZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBUcmFpbkxheWVyID0gcmVxdWlyZSgnLi8uLi9jb21wb25lbnQvdHJhaW5MYXllci5qcycpO1xyXG4gICAgICAgICAgICBzZWxmLnZpZXdDb21wb25lbnQgPSBuZXcgVHJhaW5MYXllcigpO1xyXG5cclxuICAgICAgICAgICAgc2VsZi52aWV3Q29tcG9uZW50LmluaXQoKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBnZXRSZXNvdXJjZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHN0YXRpYyBtZW1iZXJzXHJcbiAgICB7XHJcbiAgICAgICAgTkFNRTogJ1RyYWluTWVkaWF0b3InXHJcbiAgICB9XHJcbikiXX0=
