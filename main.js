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
    }
});
},{"./entity.js":"D:\\reps\\fighter\\src\\model\\entity\\entity.js"}],"D:\\reps\\fighter\\src\\model\\proxy\\playerProxy.js":[function(require,module,exports){
/**
 * Created by Arthur on 2014/12/26.
 */
var puremvc = require('puremvc').puremvc;
var Player = require('../entity/player.js');

var PlayerProxy = module.exports = puremvc.define({
        name: 'figther.model.proxy.PlayerProxy',
        parent: puremvc.Proxy,

        constructor: function() {
            puremvc.Proxy.call(this, this.constructor.NAME);

            this.setData(new Player({
                id: 1,
                name: "我家没人",
                photo: "",
                gold: 12937,

                hp: 302004,
                atk: 40930,
                defence: 29342,
                undefence: 12341,
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
                this.data.set(name, value);
            }
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

},{}],"D:\\reps\\fighter\\src\\view\\component\\controller\\trainItem.js":[function(require,module,exports){
/**
 * Created by Arthur on 2014/12/29.
 */

var TrainItemController = module.exports =  ccs.ComController.extend({
    ctor: function() {
        this._super();
        this._name = 'TrainItemController';
        this.DEFAULT_COUNT = 100;
    },

    init: function(name, pos) {
        this._taskName = name;
        this._position = pos;
    },

    onEnter: function() {
        if (this._position) {
            this.getOwner().setPosition(this._position);
        }

        var btn_start = this._btn_start = this.getOwner().getChildByName('btn_start_task');
        btn_start.setTitleText('开始任务');
        btn_start.setTitleFontSize(20);
        btn_start.addClickEventListener(this.startListener.bind(this));

        var btn_add_count = this._btn_add_count = this.getOwner().getChildByName('btn_count_add');
        btn_add_count.addClickEventListener(this.addCoundListener.bind(this));

        this._count = this.getOwner().getChildByName('count_value');
        this._count.setString(this.DEFAULT_COUNT);
        this._count.attr({anchorX: 0, anchorY: 0.5});

        this._task_name = this.getOwner().getChildByName('task_name');
        this._task_name.attr({anchorX: 0, anchorY: 0.5});
        this._task_name.setString(this._taskName);

        var txt_task_desc = this._txt_task_desc = this.getOwner().getChildByName('txt_task_desc');
        txt_task_desc.attr({anchorX: 0, anchorY: 0.5});
    },

    startListener: function() {
        this._btn_start.setTitleText('进行中...');
        this.setTaskDesc('任务进行中，将在12个小时之后完成！')
    },

    setTaskDesc: function(val) {
        this._txt_task_desc.setString(val);
    },

    addCoundListener: function() {
        this._count.setString(parseInt(this._count.getString()) + 1);
    },

    reduceCountListener: function() {

    }
});

TrainItemController.create = function(name, pos) {
    var con = new TrainItemController();
    con.init(name, pos);
    return con;
}

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
        node.getChildByName('txt_gold').setString(player.get('gold'));

        node.getChildByName('main_panel').getChildByName('txt_hp').setString(player.get('hp'));
        node.getChildByName('main_panel').getChildByName('txt_atk').setString(player.get('atk'));
        node.getChildByName('main_panel').getChildByName('txt_defence').setString(player.get('defence'));
        node.getChildByName('main_panel').getChildByName('txt_undefence').setString(player.get('undefence'));
        node.getChildByName('main_panel').getChildByName('txt_crit').setString(player.get('crit'));
        node.getChildByName('main_panel').getChildByName('txt_uncrit').setString(player.get('uncrit'));
        node.getChildByName('main_panel').getChildByName('txt_doget').setString(player.get('doget'));
        node.getChildByName('main_panel').getChildByName('txt_hit').setString(player.get('hit'));
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
var TrainItemController = require('./controller/trainItem');

var tasks = ["生命", "攻击", "防御", "破防", "暴击", "韧性", "闪避", "命中"];
var DEFAULT_COUNT = 100;
module.exports = cc.Layer.extend({
    ctor: function() {
        this._super();
        var trainNode = ccs.csLoader.createNode(res.TrainNode);
        this.addChild(trainNode);

        var btn_back = trainNode.getChildByName('Panel_1').getChildByName('btn_back');
        btn_back.addClickEventListener(this.onBackListener.bind(this));

        var size = cc.winSize;
        var baseY = size.height*84/100;
        for (var i = 0; i < tasks.length; i++) {
            var y = baseY - 100*(i+1);
            var taskNode = ccs.csLoader.createNode(res.TaskNode);
            taskNode.addComponent(TrainItemController.create(tasks[i], cc.p(0, y)));
            trainNode.addChild(taskNode);
        }

        return true;
    },

    onBackListener: function() {
        if (this.onBack) {
            this.onBack();
        }
    }
});
},{"../../resource.js":"D:\\reps\\fighter\\src\\resource.js","./controller/trainItem":"D:\\reps\\fighter\\src\\view\\component\\controller\\trainItem.js"}],"D:\\reps\\fighter\\src\\view\\mediator\\directorMediator.js":[function(require,module,exports){
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
            self.viewComponent.init(playerData);
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

            self.viewComponent.onBack = function() {
                self.sendNotification(constants.SCENE_ACTION, {name: constants.SCENE.HOME});
            };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcQXJ0aHVyXFxBcHBEYXRhXFxSb2FtaW5nXFxucG1cXG5vZGVfbW9kdWxlc1xcd2F0Y2hpZnlcXG5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwibm9kZV9tb2R1bGVzXFxwdXJlbXZjXFxpbmRleC5qcyIsIm5vZGVfbW9kdWxlc1xccHVyZW12Y1xcbGliXFxwdXJlbXZjLTEuMC4xLm1vZHVsZS5qcyIsInNyY1xcYXBwLmpzIiwic3JjXFxhcHBDb25zdGFudHMuanMiLCJzcmNcXGFwcEZhY2FkZS5qcyIsInNyY1xcY29udHJvbGxlclxcY29tbWFuZFxcU3RhcnR1cENvbW1hbmQuanMiLCJzcmNcXGNvbnRyb2xsZXJcXGNvbW1hbmRcXGhvbWVDb21tYW5kLmpzIiwic3JjXFxjb250cm9sbGVyXFxjb21tYW5kXFxwcmVwQ29udHJvbGxlckNvbW1hbmQuanMiLCJzcmNcXGNvbnRyb2xsZXJcXGNvbW1hbmRcXHByZXBNb2RlbENvbW1hbmQuanMiLCJzcmNcXGNvbnRyb2xsZXJcXGNvbW1hbmRcXHByZXBWaWV3Q29tbWFuZC5qcyIsInNyY1xcbW9kZWxcXGVudGl0eVxcZW50aXR5LmpzIiwic3JjXFxtb2RlbFxcZW50aXR5XFxwbGF5ZXIuanMiLCJzcmNcXG1vZGVsXFxwcm94eVxccGxheWVyUHJveHkuanMiLCJzcmNcXHJlc291cmNlLmpzIiwic3JjXFx1dGlsXFxldmVudC5qcyIsInNyY1xcdmlld1xcY29tcG9uZW50XFxjb250cm9sbGVyXFx0cmFpbkl0ZW0uanMiLCJzcmNcXHZpZXdcXGNvbXBvbmVudFxcaG9tZUxheWVyLmpzIiwic3JjXFx2aWV3XFxjb21wb25lbnRcXHRyYWluTGF5ZXIuanMiLCJzcmNcXHZpZXdcXG1lZGlhdG9yXFxkaXJlY3Rvck1lZGlhdG9yLmpzIiwic3JjXFx2aWV3XFxtZWRpYXRvclxcaG9tZU1lZGlhdG9yLmpzIiwic3JjXFx2aWV3XFxtZWRpYXRvclxcc2NlbmVNZWRpYXRvci5qcyIsInNyY1xcdmlld1xcbWVkaWF0b3JcXHRyYWluTWVkaWF0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3Q1RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJleHBvcnRzLnB1cmVtdmMgPSByZXF1aXJlKCcuL2xpYi9wdXJlbXZjLTEuMC4xLm1vZHVsZS5qcycpO1xyXG4iLCIvKipcclxuICogQGZpbGVPdmVydmlld1xyXG4gKiBQdXJlTVZDIEpTIE5hdGl2ZSBQb3J0IGJ5IERhdmlkIEZvbGV5LCBGcsOpZMOpcmljIFNhdW5pZXIsICYgQWxhaW4gRHVjaGVzbmVhdVxyXG4gKiBDb3B5cmlnaHQoYykgMjAwNi0yMDEyIEZ1dHVyZXNjYWxlLCBJbmMuLCBTb21lIHJpZ2h0cyByZXNlcnZlZC5cclxuICogUmV1c2UgZ292ZXJuZWQgYnkgQ3JlYXRpdmUgQ29tbW9ucyBBdHRyaWJ1dGlvbiAzLjBcclxuICogaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbGljZW5zZXMvYnkvMy4wL3VzL1xyXG4gKiBAYXV0aG9yIGRhdmlkLmZvbGV5QHB1cmVtdmMub3JnXHJcbiAqL1xyXG5cclxuXHJcbi8qIGltcGxlbWVudGF0aW9uIGJlZ2luICovXHJcblxyXG5cclxuLyoqXHJcbiAqIEBhdXRob3IgUHVyZU1WQyBKUyBOYXRpdmUgUG9ydCBieSBEYXZpZCBGb2xleSwgRnLDqWTDqXJpYyBTYXVuaWVyLCAmIEFsYWluIER1Y2hlc25lYXVcclxuICogQGF1dGhvciBDb3B5cmlnaHQoYykgMjAwNi0yMDEyIEZ1dHVyZXNjYWxlLCBJbmMuLCBTb21lIHJpZ2h0cyByZXNlcnZlZC5cclxuICpcclxuICogQGNsYXNzIHB1cmVtdmMuT2JzZXJ2ZXJcclxuICpcclxuICogQSBiYXNlIE9ic2VydmVyIGltcGxlbWVudGF0aW9uLlxyXG4gKlxyXG4gKiBBbiBPYnNlcnZlciBpcyBhbiBvYmplY3QgdGhhdCBlbmNhcHN1bGF0ZXMgaW5mb3JtYXRpb25cclxuICogYWJvdXQgYW4gaW50ZXJlc3RlZCBvYmplY3Qgd2l0aCBhIG1ldGhvZCB0aGF0IHNob3VsZFxyXG4gKiBiZSBjYWxsZWQgd2hlbiBhIHBhcnRpY3VsYXIgTm90aWZpY2F0aW9uIGlzIGJyb2FkY2FzdC5cclxuICpcclxuICogSW4gUHVyZU1WQywgdGhlIE9ic2VydmVyIGNsYXNzIGFzc3VtZXMgdGhlc2UgcmVzcG9uc2liaWxpdGllczpcclxuICpcclxuICogLSBFbmNhcHN1bGF0ZSB0aGUgbm90aWZpY2F0aW9uIChjYWxsYmFjaykgbWV0aG9kIG9mIHRoZSBpbnRlcmVzdGVkIG9iamVjdC5cclxuICogLSBFbmNhcHN1bGF0ZSB0aGUgbm90aWZpY2F0aW9uIGNvbnRleHQgKHRoaXMpIG9mIHRoZSBpbnRlcmVzdGVkIG9iamVjdC5cclxuICogLSBQcm92aWRlIG1ldGhvZHMgZm9yIHNldHRpbmcgdGhlIG5vdGlmaWNhdGlvbiBtZXRob2QgYW5kIGNvbnRleHQuXHJcbiAqIC0gUHJvdmlkZSBhIG1ldGhvZCBmb3Igbm90aWZ5aW5nIHRoZSBpbnRlcmVzdGVkIG9iamVjdC5cclxuICpcclxuICpcclxuICogVGhlIG5vdGlmaWNhdGlvbiBtZXRob2Qgb24gdGhlIGludGVyZXN0ZWQgb2JqZWN0IHNob3VsZCB0YWtlXHJcbiAqIG9uZSBwYXJhbWV0ZXIgb2YgdHlwZSBOb3RpZmljYXRpb24uXHJcbiAqXHJcbiAqXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG5vdGlmeU1ldGhvZFxyXG4gKiAgdGhlIG5vdGlmaWNhdGlvbiBtZXRob2Qgb2YgdGhlIGludGVyZXN0ZWQgb2JqZWN0XHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBub3RpZnlDb250ZXh0XHJcbiAqICB0aGUgbm90aWZpY2F0aW9uIGNvbnRleHQgb2YgdGhlIGludGVyZXN0ZWQgb2JqZWN0XHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gT2JzZXJ2ZXIgKG5vdGlmeU1ldGhvZCwgbm90aWZ5Q29udGV4dClcclxue1xyXG4gICAgdGhpcy5zZXROb3RpZnlNZXRob2Qobm90aWZ5TWV0aG9kKTtcclxuICAgIHRoaXMuc2V0Tm90aWZ5Q29udGV4dChub3RpZnlDb250ZXh0KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIE9ic2VydmVycyBub3RpZmljYXRpb24gbWV0aG9kLlxyXG4gKlxyXG4gKiBUaGUgbm90aWZpY2F0aW9uIG1ldGhvZCBzaG91bGQgdGFrZSBvbmUgcGFyYW1ldGVyIG9mIHR5cGUgTm90aWZpY2F0aW9uXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG5vdGlmeU1ldGhvZFxyXG4gKiAgdGhlIG5vdGlmaWNhdGlvbiAoY2FsbGJhY2spIG1ldGhvZCBvZiB0aGUgaW50ZXJlc3RlZCBvYmplY3QuXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5PYnNlcnZlci5wcm90b3R5cGUuc2V0Tm90aWZ5TWV0aG9kPSBmdW5jdGlvbiAobm90aWZ5TWV0aG9kKVxyXG57XHJcbiAgICB0aGlzLm5vdGlmeT0gbm90aWZ5TWV0aG9kO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNldCB0aGUgT2JzZXJ2ZXJzIG5vdGlmaWNhdGlvbiBjb250ZXh0LlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gbm90aWZ5Q29udGV4dFxyXG4gKiAgdGhlIG5vdGlmaWNhdGlvbiBjb250ZXh0ICh0aGlzKSBvZiB0aGUgaW50ZXJlc3RlZCBvYmplY3QuXHJcbiAqXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5PYnNlcnZlci5wcm90b3R5cGUuc2V0Tm90aWZ5Q29udGV4dD0gZnVuY3Rpb24gKG5vdGlmeUNvbnRleHQpXHJcbntcclxuICAgIHRoaXMuY29udGV4dD0gbm90aWZ5Q29udGV4dDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIEZ1bmN0aW9uIHRoYXQgdGhpcyBPYnNlcnZlciB3aWxsIGludm9rZSB3aGVuIGl0IGlzIG5vdGlmaWVkLlxyXG4gKlxyXG4gKiBAcHJpdmF0ZVxyXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cclxuICovXHJcbk9ic2VydmVyLnByb3RvdHlwZS5nZXROb3RpZnlNZXRob2Q9IGZ1bmN0aW9uICgpXHJcbntcclxuICAgIHJldHVybiB0aGlzLm5vdGlmeTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIE9iamVjdCB0aGF0IHdpbGwgc2VydmUgYXMgdGhlIE9ic2VydmVycyBjYWxsYmFjayBleGVjdXRpb24gY29udGV4dFxyXG4gKlxyXG4gKiBAcHJpdmF0ZVxyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqL1xyXG5PYnNlcnZlci5wcm90b3R5cGUuZ2V0Tm90aWZ5Q29udGV4dD0gZnVuY3Rpb24gKClcclxue1xyXG4gICAgcmV0dXJuIHRoaXMuY29udGV4dDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBOb3RpZnkgdGhlIGludGVyZXN0ZWQgb2JqZWN0LlxyXG4gKlxyXG4gKiBAcGFyYW0ge3B1cmVtdmMuTm90aWZpY2F0aW9ufSBub3RpZmljYXRpb25cclxuICogIFRoZSBOb3RpZmljYXRpb24gdG8gcGFzcyB0byB0aGUgaW50ZXJlc3RlZCBvYmplY3RzIG5vdGlmaWNhdGlvbiBtZXRob2RcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbk9ic2VydmVyLnByb3RvdHlwZS5ub3RpZnlPYnNlcnZlcj0gZnVuY3Rpb24gKG5vdGlmaWNhdGlvbilcclxue1xyXG4gICAgdGhpcy5nZXROb3RpZnlNZXRob2QoKS5jYWxsKHRoaXMuZ2V0Tm90aWZ5Q29udGV4dCgpLCBub3RpZmljYXRpb24pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENvbXBhcmUgYW4gb2JqZWN0IHRvIHRoaXMgT2JzZXJ2ZXJzIG5vdGlmaWNhdGlvbiBjb250ZXh0LlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0XHJcbiAqXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAqL1xyXG5PYnNlcnZlci5wcm90b3R5cGUuY29tcGFyZU5vdGlmeUNvbnRleHQ9IGZ1bmN0aW9uIChvYmplY3QpXHJcbntcclxuICAgIHJldHVybiBvYmplY3QgPT09IHRoaXMuY29udGV4dDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgT2JzZXJ2ZXJzIGNhbGxiYWNrIEZ1bmN0aW9uXHJcbiAqXHJcbiAqIEBwcml2YXRlXHJcbiAqIEB0eXBlIHtGdW5jdGlvbn1cclxuICovXHJcbk9ic2VydmVyLnByb3RvdHlwZS5ub3RpZnk9IG51bGw7XHJcblxyXG4vKipcclxuICogVGhlIE9ic2VydmVycyBjYWxsYmFjayBPYmplY3RcclxuICogQHByaXZhdGVcclxuICogQHR5cGUge09iamVjdH1cclxuICovXHJcbk9ic2VydmVyLnByb3RvdHlwZS5jb250ZXh0PSBudWxsO1xyXG4vKipcclxuICogQGF1dGhvciBQdXJlTVZDIEpTIE5hdGl2ZSBQb3J0IGJ5IERhdmlkIEZvbGV5LCBGcsOpZMOpcmljIFNhdW5pZXIsICYgQWxhaW4gRHVjaGVzbmVhdVxyXG4gKiBAYXV0aG9yIENvcHlyaWdodChjKSAyMDA2LTIwMTIgRnV0dXJlc2NhbGUsIEluYy4sIFNvbWUgcmlnaHRzIHJlc2VydmVkLlxyXG4gKlxyXG4gKiBAY2xhc3MgcHVyZW12Yy5Ob3RpZmljYXRpb25cclxuICpcclxuICogQSBiYXNlIE5vdGlmaWNhdGlvbiBpbXBsZW1lbnRhdGlvbi5cclxuICpcclxuICogUHVyZU1WQyBkb2VzIG5vdCByZWx5IHVwb24gdW5kZXJseWluZyBldmVudCBtb2RlbHMgc3VjaCBhcyB0aGUgb25lIHByb3ZpZGVkXHJcbiAqIHdpdGggdGhlIERPTSBvciBvdGhlciBicm93c2VyIGNlbnRyaWMgVzNDIGV2ZW50IG1vZGVscy5cclxuICpcclxuICogVGhlIE9ic2VydmVyIFBhdHRlcm4gYXMgaW1wbGVtZW50ZWQgd2l0aGluIFB1cmVNVkMgZXhpc3RzIHRvIHN1cHBvcnRcclxuICogZXZlbnQtZHJpdmVuIGNvbW11bmljYXRpb24gYmV0d2VlbiB0aGUgYXBwbGljYXRpb24gYW5kIHRoZSBhY3RvcnMgb2YgdGhlIE1WQ1xyXG4gKiB0cmlhZC5cclxuICpcclxuICogTm90aWZpY2F0aW9ucyBhcmUgbm90IG1lYW50IHRvIGJlIGEgcmVwbGFjZW1lbnQgZm9yIGV2ZW50cyBpbiB0aGUgYnJvd3Nlci5cclxuICogR2VuZXJhbGx5LCBNZWRpYXRvciBpbXBsZW1lbnRvcnMgcGxhY2UgZXZlbnQgbGlzdGVuZXJzIG9uIHRoZWlyIHZpZXdcclxuICogY29tcG9uZW50cywgd2hpY2ggdGhleSB0aGVuIGhhbmRsZSBpbiB0aGUgdXN1YWwgd2F5LiBUaGlzIG1heSBsZWFkIHRvIHRoZVxyXG4gKiBicm9hZGNhc3Qgb2YgTm90aWZpY2F0aW9ucyB0byB0cmlnZ2VyIGNvbW1hbmRzIG9yIHRvIGNvbW11bmljYXRlIHdpdGggb3RoZXJcclxuICogTWVkaWF0b3JzLiB7QGxpbmsgcHVyZW12Yy5Qcm94eSBQcm94eX0sXHJcbiAqIHtAbGluayBwdXJlbXZjLlNpbXBsZUNvbW1hbmQgU2ltcGxlQ29tbWFuZH1cclxuICogYW5kIHtAbGluayBwdXJlbXZjLk1hY3JvQ29tbWFuZCBNYWNyb0NvbW1hbmR9XHJcbiAqIGluc3RhbmNlcyBjb21tdW5pY2F0ZSB3aXRoIGVhY2ggb3RoZXIgYW5kXHJcbiAqIHtAbGluayBwdXJlbXZjLk1lZGlhdG9yIE1lZGlhdG9yfXNcclxuICogYnkgYnJvYWRjYXN0aW5nIE5vdGlmaWNhdGlvbnMuXHJcbiAqXHJcbiAqIEEga2V5IGRpZmZlcmVuY2UgYmV0d2VlbiBicm93c2VyIGV2ZW50cyBhbmQgUHVyZU1WQyBOb3RpZmljYXRpb25zIGlzIHRoYXRcclxuICogZXZlbnRzIGZvbGxvdyB0aGUgJ0NoYWluIG9mIFJlc3BvbnNpYmlsaXR5JyBwYXR0ZXJuLCAnYnViYmxpbmcnIHVwIHRoZVxyXG4gKiBkaXNwbGF5IGhpZXJhcmNoeSB1bnRpbCBzb21lIHBhcmVudCBjb21wb25lbnQgaGFuZGxlcyB0aGUgZXZlbnQsIHdoaWxlXHJcbiAqIFB1cmVNVkMgTm90aWZpY2F0aW9uIGZvbGxvdyBhICdQdWJsaXNoL1N1YnNjcmliZScgcGF0dGVybi4gUHVyZU1WQyBjbGFzc2VzXHJcbiAqIG5lZWQgbm90IGJlIHJlbGF0ZWQgdG8gZWFjaCBvdGhlciBpbiBhIHBhcmVudC9jaGlsZCByZWxhdGlvbnNoaXAgaW4gb3JkZXIgdG9cclxuICogY29tbXVuaWNhdGUgd2l0aCBvbmUgYW5vdGhlciB1c2luZyBOb3RpZmljYXRpb25zLlxyXG4gKlxyXG4gKiBAY29uc3RydWN0b3JcclxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICogIFRoZSBOb3RpZmljYXRpb24gbmFtZVxyXG4gKiBAcGFyYW0ge09iamVjdH0gW2JvZHldXHJcbiAqICBUaGUgTm90aWZpY2F0aW9uIGJvZHlcclxuICogQHBhcmFtIHtPYmplY3R9IFt0eXBlXVxyXG4gKiAgVGhlIE5vdGlmaWNhdGlvbiB0eXBlXHJcbiAqL1xyXG5mdW5jdGlvbiBOb3RpZmljYXRpb24obmFtZSwgYm9keSwgdHlwZSlcclxue1xyXG4gICAgdGhpcy5uYW1lPSBuYW1lO1xyXG4gICAgdGhpcy5ib2R5PSBib2R5O1xyXG4gICAgdGhpcy50eXBlPSB0eXBlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgbmFtZSBvZiB0aGUgTm90aWZpY2F0aW9uIGluc3RhbmNlXHJcbiAqXHJcbiAqIEByZXR1cm4ge3N0cmluZ31cclxuICogIFRoZSBuYW1lIG9mIHRoZSBOb3RpZmljYXRpb24gaW5zdGFuY2VcclxuICovXHJcbk5vdGlmaWNhdGlvbi5wcm90b3R5cGUuZ2V0TmFtZT0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICByZXR1cm4gdGhpcy5uYW1lO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNldCB0aGlzIE5vdGlmaWNhdGlvbnMgYm9keS5cclxuICogQHBhcmFtIHtPYmplY3R9IGJvZHlcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbk5vdGlmaWNhdGlvbi5wcm90b3R5cGUuc2V0Qm9keT0gZnVuY3Rpb24oYm9keSlcclxue1xyXG4gICAgdGhpcy5ib2R5PSBib2R5O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgTm90aWZpY2F0aW9uIGJvZHkuXHJcbiAqXHJcbiAqIEByZXR1cm4ge09iamVjdH1cclxuICovXHJcbk5vdGlmaWNhdGlvbi5wcm90b3R5cGUuZ2V0Qm9keT0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICByZXR1cm4gdGhpcy5ib2R5XHJcbn07XHJcblxyXG4vKipcclxuICogU2V0IHRoZSB0eXBlIG9mIHRoZSBOb3RpZmljYXRpb24gaW5zdGFuY2UuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSB0eXBlXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5Ob3RpZmljYXRpb24ucHJvdG90eXBlLnNldFR5cGU9IGZ1bmN0aW9uKHR5cGUpXHJcbntcclxuICAgIHRoaXMudHlwZT0gdHlwZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIHR5cGUgb2YgdGhlIE5vdGlmaWNhdGlvbiBpbnN0YW5jZS5cclxuICpcclxuICogQHJldHVybiB7T2JqZWN0fVxyXG4gKi9cclxuTm90aWZpY2F0aW9uLnByb3RvdHlwZS5nZXRUeXBlPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHJldHVybiB0aGlzLnR5cGU7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0IGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBOb3RpZmljYXRpb24gaW5zdGFuY2VcclxuICpcclxuICogQHJldHVybiB7c3RyaW5nfVxyXG4gKi9cclxuTm90aWZpY2F0aW9uLnByb3RvdHlwZS50b1N0cmluZz0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICB2YXIgbXNnPSBcIk5vdGlmaWNhdGlvbiBOYW1lOiBcIiArIHRoaXMuZ2V0TmFtZSgpO1xyXG4gICAgbXNnKz0gXCJcXG5Cb2R5OlwiICsgKCh0aGlzLmJvZHkgPT0gbnVsbCApID8gXCJudWxsXCIgOiB0aGlzLmJvZHkudG9TdHJpbmcoKSk7XHJcbiAgICBtc2crPSBcIlxcblR5cGU6XCIgKyAoKHRoaXMudHlwZSA9PSBudWxsICkgPyBcIm51bGxcIiA6IHRoaXMudHlwZSk7XHJcbiAgICByZXR1cm4gbXNnO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRoZSBOb3RpZmljYXRpb25zIG5hbWUuXHJcbiAqXHJcbiAqIEB0eXBlIHtzdHJpbmd9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5Ob3RpZmljYXRpb24ucHJvdG90eXBlLm5hbWU9IG51bGw7XHJcblxyXG4vKipcclxuICogVGhlIE5vdGlmaWNhdGlvbnMgdHlwZS5cclxuICpcclxuICogQHR5cGUge3N0cmluZ31cclxuICogQHByaXZhdGVcclxuICovXHJcbk5vdGlmaWNhdGlvbi5wcm90b3R5cGUudHlwZT0gbnVsbDtcclxuXHJcbi8qKlxyXG4gKiBUaGUgTm90aWZpY2F0aW9ucyBib2R5LlxyXG4gKlxyXG4gKiBAdHlwZSB7T2JqZWN0fVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuTm90aWZpY2F0aW9uLnByb3RvdHlwZS5ib2R5PSBudWxsO1xyXG4vKipcclxuICogQGF1dGhvciBQdXJlTVZDIEpTIE5hdGl2ZSBQb3J0IGJ5IERhdmlkIEZvbGV5LCBGcsOpZMOpcmljIFNhdW5pZXIsICYgQWxhaW4gRHVjaGVzbmVhdVxyXG4gKiBAYXV0aG9yIENvcHlyaWdodChjKSAyMDA2LTIwMTIgRnV0dXJlc2NhbGUsIEluYy4sIFNvbWUgcmlnaHRzIHJlc2VydmVkLlxyXG4gKlxyXG4gKiBAY2xhc3MgcHVyZW12Yy5Ob3RpZmllclxyXG4gKlxyXG4gKiBBIEJhc2UgTm90aWZpZXIgaW1wbGVtZW50YXRpb24uXHJcbiAqXHJcbiAqIHtAbGluayBwdXJlbXZjLk1hY3JvQ29tbWFuZCBNYWNyb0NvbW1hbmR9LFxyXG4gKiB7QGxpbmsgcHVyZW12Yy5TaW1wbGVDb21tYW5kIFNpbXBsZUNvbW1hbmR9LFxyXG4gKiB7QGxpbmsgcHVyZW12Yy5NZWRpYXRvciBNZWRpYXRvcn0gYW5kXHJcbiAqIHtAbGluayBwdXJlbXZjLlByb3h5IFByb3h5fVxyXG4gKiBhbGwgaGF2ZSBhIG5lZWQgdG8gc2VuZCBOb3RpZmljYXRpb25zXHJcbiAqXHJcbiAqIFRoZSBOb3RpZmllciBpbnRlcmZhY2UgcHJvdmlkZXMgYSBjb21tb24gbWV0aG9kIGNhbGxlZCAjc2VuZE5vdGlmaWNhdGlvbiB0aGF0XHJcbiAqIHJlbGlldmVzIGltcGxlbWVudGF0aW9uIGNvZGUgb2YgdGhlIG5lY2Vzc2l0eSB0byBhY3R1YWxseSBjb25zdHJ1Y3RcclxuICogTm90aWZpY2F0aW9ucy5cclxuICpcclxuICogVGhlIE5vdGlmaWVyIGNsYXNzLCB3aGljaCBhbGwgb2YgdGhlIGFib3ZlIG1lbnRpb25lZCBjbGFzc2VzXHJcbiAqIGV4dGVuZCwgcHJvdmlkZXMgYW4gaW5pdGlhbGl6ZWQgcmVmZXJlbmNlIHRvIHRoZVxyXG4gKiB7QGxpbmsgcHVyZW12Yy5GYWNhZGUgRmFjYWRlfVxyXG4gKiBNdWx0aXRvbiwgd2hpY2ggaXMgcmVxdWlyZWQgZm9yIHRoZSBjb252aWVuaWVuY2UgbWV0aG9kXHJcbiAqIGZvciBzZW5kaW5nIE5vdGlmaWNhdGlvbnMgYnV0IGFsc28gZWFzZXMgaW1wbGVtZW50YXRpb24gYXMgdGhlc2VcclxuICogY2xhc3NlcyBoYXZlIGZyZXF1ZW50XHJcbiAqIHtAbGluayBwdXJlbXZjLkZhY2FkZSBGYWNhZGV9IGludGVyYWN0aW9uc1xyXG4gKiBhbmQgdXN1YWxseSByZXF1aXJlIGFjY2VzcyB0byB0aGUgZmFjYWRlIGFueXdheS5cclxuICpcclxuICogTk9URTogSW4gdGhlIE11bHRpQ29yZSB2ZXJzaW9uIG9mIHRoZSBmcmFtZXdvcmssIHRoZXJlIGlzIG9uZSBjYXZlYXQgdG9cclxuICogbm90aWZpZXJzLCB0aGV5IGNhbm5vdCBzZW5kIG5vdGlmaWNhdGlvbnMgb3IgcmVhY2ggdGhlIGZhY2FkZSB1bnRpbCB0aGV5XHJcbiAqIGhhdmUgYSB2YWxpZCBtdWx0aXRvbktleS5cclxuICpcclxuICogVGhlIG11bHRpdG9uS2V5IGlzIHNldDpcclxuICogICAtIG9uIGEgQ29tbWFuZCB3aGVuIGl0IGlzIGV4ZWN1dGVkIGJ5IHRoZSBDb250cm9sbGVyXHJcbiAqICAgLSBvbiBhIE1lZGlhdG9yIGlzIHJlZ2lzdGVyZWQgd2l0aCB0aGUgVmlld1xyXG4gKiAgIC0gb24gYSBQcm94eSBpcyByZWdpc3RlcmVkIHdpdGggdGhlIE1vZGVsLlxyXG4gKlxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIE5vdGlmaWVyKClcclxue1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhbmQgc2VuZCBhIE5vdGlmaWNhdGlvbi5cclxuICpcclxuICogS2VlcHMgdXMgZnJvbSBoYXZpbmcgdG8gY29uc3RydWN0IG5ldyBOb3RpZmljYXRpb24gaW5zdGFuY2VzIGluIG91clxyXG4gKiBpbXBsZW1lbnRhdGlvbiBjb2RlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbm90aWZpY2F0aW9uTmFtZVxyXG4gKiAgQSBub3RpZmljYXRpb24gbmFtZVxyXG4gKiBAcGFyYW0ge09iamVjdH0gW2JvZHldXHJcbiAqICBUaGUgYm9keSBvZiB0aGUgbm90aWZpY2F0aW9uXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbdHlwZV1cclxuICogIFRoZSBub3RpZmljYXRpb24gdHlwZVxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuTm90aWZpZXIucHJvdG90eXBlLnNlbmROb3RpZmljYXRpb24gPSBmdW5jdGlvbihub3RpZmljYXRpb25OYW1lLCBib2R5LCB0eXBlKVxyXG57XHJcbiAgICB2YXIgZmFjYWRlID0gdGhpcy5nZXRGYWNhZGUoKTtcclxuICAgIGlmKGZhY2FkZSlcclxuICAgIHtcclxuICAgICAgICBmYWNhZGUuc2VuZE5vdGlmaWNhdGlvbihub3RpZmljYXRpb25OYW1lLCBib2R5LCB0eXBlKTtcclxuICAgIH1cclxufTtcclxuXHJcblxyXG4vKipcclxuICogQHByb3RlY3RlZFxyXG4gKiBBIHJlZmVyZW5jZSB0byB0aGlzIE5vdGlmaWVyJ3MgRmFjYWRlLiBUaGlzIHJlZmVyZW5jZSB3aWxsIG5vdCBiZSBhdmFpbGFibGVcclxuICogdW50aWwgI2luaXRpYWxpemVOb3RpZmllciBoYXMgYmVlbiBjYWxsZWQuXHJcbiAqXHJcbiAqIEB0eXBlIHtwdXJlbXZjLkZhY2FkZX1cclxuICovXHJcbk5vdGlmaWVyLnByb3RvdHlwZS5mYWNhZGU7XHJcblxyXG4vKipcclxuICogSW5pdGlhbGl6ZSB0aGlzIE5vdGlmaWVyIGluc3RhbmNlLlxyXG4gKlxyXG4gKiBUaGlzIGlzIGhvdyBhIE5vdGlmaWVyIGdldHMgaXRzIG11bHRpdG9uS2V5LlxyXG4gKiBDYWxscyB0byAjc2VuZE5vdGlmaWNhdGlvbiBvciB0byBhY2Nlc3MgdGhlXHJcbiAqIGZhY2FkZSB3aWxsIGZhaWwgdW50aWwgYWZ0ZXIgdGhpcyBtZXRob2RcclxuICogaGFzIGJlZW4gY2FsbGVkLlxyXG4gKlxyXG4gKiBNZWRpYXRvcnMsIENvbW1hbmRzIG9yIFByb3hpZXMgbWF5IG92ZXJyaWRlXHJcbiAqIHRoaXMgbWV0aG9kIGluIG9yZGVyIHRvIHNlbmQgbm90aWZpY2F0aW9uc1xyXG4gKiBvciBhY2Nlc3MgdGhlIE11bHRpdG9uIEZhY2FkZSBpbnN0YW5jZSBhc1xyXG4gKiBzb29uIGFzIHBvc3NpYmxlLiBUaGV5IENBTk5PVCBhY2Nlc3MgdGhlIGZhY2FkZVxyXG4gKiBpbiB0aGVpciBjb25zdHJ1Y3RvcnMsIHNpbmNlIHRoaXMgbWV0aG9kIHdpbGwgbm90XHJcbiAqIHlldCBoYXZlIGJlZW4gY2FsbGVkLlxyXG4gKlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5XHJcbiAqICBUaGUgTm90aWZpZXJzIG11bHRpdG9uIGtleTtcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbk5vdGlmaWVyLnByb3RvdHlwZS5pbml0aWFsaXplTm90aWZpZXIgPSBmdW5jdGlvbihrZXkpXHJcbntcclxuICAgIHRoaXMubXVsdGl0b25LZXkgPSBTdHJpbmcoa2V5KTtcclxuICAgIHRoaXMuZmFjYWRlPSB0aGlzLmdldEZhY2FkZSgpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHJpZXZlIHRoZSBNdWx0aXRvbiBGYWNhZGUgaW5zdGFuY2VcclxuICpcclxuICpcclxuICogQHByb3RlY3RlZFxyXG4gKiBAcmV0dXJuIHtwdXJlbXZjLkZhY2FkZX1cclxuICovXHJcbk5vdGlmaWVyLnByb3RvdHlwZS5nZXRGYWNhZGUgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIGlmKHRoaXMubXVsdGl0b25LZXkgPT0gbnVsbClcclxuICAgIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoTm90aWZpZXIuTVVMVElUT05fTVNHKTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIEZhY2FkZS5nZXRJbnN0YW5jZSh0aGlzLm11bHRpdG9uS2V5KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqIFRoZSBOb3RpZmllcnMgaW50ZXJuYWwgbXVsdGl0b24ga2V5LlxyXG4gKlxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEB0eXBlIHN0cmluZ1xyXG4gKi9cclxuTm90aWZpZXIucHJvdG90eXBlLm11bHRpdG9uS2V5ID0gbnVsbDtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqIFRoZSBlcnJvciBtZXNzYWdlIHVzZWQgaWYgdGhlIE5vdGlmaWVyIGlzIG5vdCBpbml0aWFsaXplZCBjb3JyZWN0bHkgYW5kXHJcbiAqIGF0dGVtcHRzIHRvIHJldHJpZXZlIGl0cyBvd24gbXVsdGl0b24ga2V5XHJcbiAqXHJcbiAqIEBzdGF0aWNcclxuICogQHByb3RlY3RlZFxyXG4gKiBAY29uc3RcclxuICogQHR5cGUgc3RyaW5nXHJcbiAqL1xyXG5Ob3RpZmllci5NVUxUSVRPTl9NU0cgPSBcIm11bHRpdG9uS2V5IGZvciB0aGlzIE5vdGlmaWVyIG5vdCB5ZXQgaW5pdGlhbGl6ZWQhXCI7XHJcbi8qKlxyXG4gKiBAYXV0aG9yIFB1cmVNVkMgSlMgTmF0aXZlIFBvcnQgYnkgRGF2aWQgRm9sZXksIEZyw6lkw6lyaWMgU2F1bmllciwgJiBBbGFpbiBEdWNoZXNuZWF1XHJcbiAqIEBhdXRob3IgQ29weXJpZ2h0KGMpIDIwMDYtMjAxMiBGdXR1cmVzY2FsZSwgSW5jLiwgU29tZSByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIEBjbGFzcyBwdXJlbXZjLlNpbXBsZUNvbW1hbmRcclxuICogQGV4dGVuZHMgcHVyZW12Yy5Ob3RpZmllclxyXG4gKlxyXG4gKiBTaW1wbGVDb21tYW5kcyBlbmNhcHN1bGF0ZSB0aGUgYnVzaW5lc3MgbG9naWMgb2YgeW91ciBhcHBsaWNhdGlvbi4gWW91clxyXG4gKiBzdWJjbGFzcyBzaG91bGQgb3ZlcnJpZGUgdGhlICNleGVjdXRlIG1ldGhvZCB3aGVyZSB5b3VyIGJ1c2luZXNzIGxvZ2ljIHdpbGxcclxuICogaGFuZGxlIHRoZVxyXG4gKiB7QGxpbmsgcHVyZW12Yy5Ob3RpZmljYXRpb24gTm90aWZpY2F0aW9ufVxyXG4gKlxyXG4gKiBUYWtlIGEgbG9vayBhdFxyXG4gKiB7QGxpbmsgcHVyZW12Yy5GYWNhZGUjcmVnaXN0ZXJDb21tYW5kIEZhY2FkZSdzIHJlZ2lzdGVyQ29tbWFuZH1cclxuICogb3Ige0BsaW5rIHB1cmVtdmMuQ29udHJvbGxlciNyZWdpc3RlckNvbW1hbmQgQ29udHJvbGxlcnMgcmVnaXN0ZXJDb21tYW5kfVxyXG4gKiBtZXRob2RzIHRvIHNlZSBob3cgdG8gYWRkIGNvbW1hbmRzIHRvIHlvdXIgYXBwbGljYXRpb24uXHJcbiAqXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gU2ltcGxlQ29tbWFuZCAoKSB7IH07XHJcblxyXG5TaW1wbGVDb21tYW5kLnByb3RvdHlwZT0gbmV3IE5vdGlmaWVyO1xyXG5TaW1wbGVDb21tYW5kLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj0gU2ltcGxlQ29tbWFuZDtcclxuXHJcbi8qKlxyXG4gKiBGdWxmaWxsIHRoZSB1c2UtY2FzZSBpbml0aWF0ZWQgYnkgdGhlIGdpdmVuIE5vdGlmaWNhdGlvblxyXG4gKlxyXG4gKiBJbiB0aGUgQ29tbWFuZCBQYXR0ZXJuLCBhbiBhcHBsaWNhdGlvbiB1c2UtY2FzZSB0eXBpY2FsbHkgYmVnaW5zIHdpdGggc29tZVxyXG4gKiB1c2VyIGFjdGlvbiwgd2hpY2ggcmVzdWx0cyBpbiBhIE5vdGlmaWNhdGlvbiBpcyBoYW5kbGVkIGJ5IHRoZSBidXNpbmVzcyBsb2dpY1xyXG4gKiBpbiB0aGUgI2V4ZWN1dGUgbWV0aG9kIG9mIGEgY29tbWFuZC5cclxuICpcclxuICogQHBhcmFtIHtwdXJlbXZjLk5vdGlmaWNhdGlvbn0gbm90aWZpY2F0aW9uXHJcbiAqICBUaGUgbm90aWZpY2F0aW9uIHRvIGhhbmRsZS5cclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcblNpbXBsZUNvbW1hbmQucHJvdG90eXBlLmV4ZWN1dGU9IGZ1bmN0aW9uIChub3RpZmljYXRpb24pIHsgfTtcclxuLyoqXHJcbiAqIEBhdXRob3IgUHVyZU1WQyBKUyBOYXRpdmUgUG9ydCBieSBEYXZpZCBGb2xleSwgRnLDqWTDqXJpYyBTYXVuaWVyLCAmIEFsYWluIER1Y2hlc25lYXVcclxuICogQGF1dGhvciBDb3B5cmlnaHQoYykgMjAwNi0yMDEyIEZ1dHVyZXNjYWxlLCBJbmMuLCBTb21lIHJpZ2h0cyByZXNlcnZlZC5cclxuICpcclxuICogQGNsYXNzIHB1cmVtdmMuTWFjcm9Db21tYW5kXHJcbiAqIEBleHRlbmRzIHB1cmVtdmMuTm90aWZpZXJcclxuICpcclxuICogQSBiYXNlIGNvbW1hbmQgaW1wbGVtZW50YXRpb24gdGhhdCBleGVjdXRlcyBvdGhlciBjb21tYW5kcywgc3VjaCBhc1xyXG4gKiB7QGxpbmsgcHVyZW12Yy5TaW1wbGVDb21tYW5kIFNpbXBsZUNvbW1hbmR9XHJcbiAqIG9yIHtAbGluayBwdXJlbXZjLk1hY3JvQ29tbWFuZCBNYWNyb0NvbW1hbmR9XHJcbiAqIHN1YmNsYXNzZXMuXHJcbiAqXHJcbiAqIEEgTWFjcm9Db21tYW5kIG1haW50YWlucyBhbiBsaXN0IG9mXHJcbiAqIGNvbW1hbmQgY29uc3RydWN0b3IgcmVmZXJlbmNlcyBjYWxsZWQgKlN1YkNvbW1hbmRzKi5cclxuICpcclxuICogV2hlbiAjZXhlY3V0ZSBpcyBjYWxsZWQsIHRoZSBNYWNyb0NvbW1hbmRcclxuICogaW5zdGFudGlhdGVzIGFuZCBjYWxscyAjZXhlY3V0ZSBvbiBlYWNoIG9mIGl0cyAqU3ViQ29tbWFuZHMqIGluIHR1cm4uXHJcbiAqIEVhY2ggKlN1YkNvbW1hbmQqIHdpbGwgYmUgcGFzc2VkIGEgcmVmZXJlbmNlIHRvIHRoZSBvcmlnaW5hbFxyXG4gKiB7QGxpbmsgcHVyZW12Yy5Ob3RpZmljYXRpb24gTm90aWZpY2F0aW9ufVxyXG4gKiB0aGF0IHdhcyBwYXNzZWQgdG8gdGhlIE1hY3JvQ29tbWFuZHMgI2V4ZWN1dGUgbWV0aG9kXHJcbiAqXHJcbiAqIFVubGlrZSB7QGxpbmsgcHVyZW12Yy5TaW1wbGVDb21tYW5kIFNpbXBsZUNvbW1hbmR9LFxyXG4gKiB5b3VyIHN1YmNsYXNzIHNob3VsZCBub3Qgb3ZlcnJpZGUgI2V4ZWN1dGUgYnV0IGluc3RlYWQsIHNob3VsZFxyXG4gKiBvdmVycmlkZSB0aGUgI2luaXRpYWxpemVNYWNyb0NvbW1hbmQgbWV0aG9kLCBjYWxsaW5nICNhZGRTdWJDb21tYW5kIG9uY2UgZm9yXHJcbiAqIGVhY2ggKlN1YkNvbW1hbmQqIHRvIGJlIGV4ZWN1dGVkLlxyXG4gKlxyXG4gKiBJZiB5b3VyIHN1YmNsYXNzIGRvZXMgZGVmaW5lIGEgY29uc3RydWN0b3IsIGJlIHN1cmUgdG8gY2FsbCBcInN1cGVyXCIgbGlrZSBzb1xyXG4gKlxyXG4gKiAgICAgZnVuY3Rpb24gTXlNYWNyb0NvbW1hbmQgKClcclxuICogICAgIHtcclxuICogICAgICAgICBNYWNyb0NvbW1hbmQuY2FsbCh0aGlzKTtcclxuICogICAgIH07XHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gTWFjcm9Db21tYW5kKClcclxue1xyXG4gICAgdGhpcy5zdWJDb21tYW5kcz0gW107XHJcbiAgICB0aGlzLmluaXRpYWxpemVNYWNyb0NvbW1hbmQoKTtcclxufTtcclxuXHJcbi8qIHN1YmNsYXNzIE5vdGlmaWVyICovXHJcbk1hY3JvQ29tbWFuZC5wcm90b3R5cGU9IG5ldyBOb3RpZmllcjtcclxuTWFjcm9Db21tYW5kLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj0gTWFjcm9Db21tYW5kO1xyXG5cclxuLyoqXHJcbiAqIEBwcml2YXRlXHJcbiAqIEB0eXBlIHtBcnJheS48cHVyZW12Yy5TaW1wbGVDb21tYW5kfHB1cmVtdmMuTWFjcm9Db21tYW5kPn1cclxuICovXHJcbk1hY3JvQ29tbWFuZC5wcm90b3R5cGUuc3ViQ29tbWFuZHM9IG51bGw7XHJcblxyXG4vKipcclxuICogQHByb3RlY3RlZFxyXG4gKiBJbml0aWFsaXplIHRoZSBNYWNyb0NvbW1hbmQuXHJcbiAqXHJcbiAqIEluIHlvdXIgc3ViY2xhc3MsIG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvXHJcbiAqIGluaXRpYWxpemUgdGhlIE1hY3JvQ29tbWFuZCdzICpTdWJDb21tYW5kKlxyXG4gKiBsaXN0IHdpdGggY29tbWFuZCBjbGFzcyByZWZlcmVuY2VzIGxpa2VcclxuICogdGhpczpcclxuICpcclxuICogICAgIC8vIEluaXRpYWxpemUgTXlNYWNyb0NvbW1hbmRcclxuICogICAgIE15TWFjcm9Db21tYW5kLnByb3RvdHlwZS5pbml0aWFsaXplTWFjcm9Db21tYW5kPSBmdW5jdGlvbiAoKVxyXG4gKiAgICAge1xyXG4gKiAgICAgICAgIHRoaXMuYWRkU3ViQ29tbWFuZCggY29tLm1lLm15YXBwLmNvbnRyb2xsZXIuRmlyc3RDb21tYW5kICk7XHJcbiAqICAgICAgICAgdGhpcy5hZGRTdWJDb21tYW5kKCBjb20ubWUubXlhcHAuY29udHJvbGxlci5TZWNvbmRDb21tYW5kICk7XHJcbiAqICAgICAgICAgdGhpcy5hZGRTdWJDb21tYW5kKCBjb20ubWUubXlhcHAuY29udHJvbGxlci5UaGlyZENvbW1hbmQgKTtcclxuICogICAgIH07XHJcbiAqXHJcbiAqIE5vdGUgdGhhdCAqU3ViQ29tbWFuZCpzIG1heSBiZSBhbnkgY29tbWFuZCBpbXBsZW1lbnRvcixcclxuICogTWFjcm9Db21tYW5kcyBvciBTaW1wbGVDb21tYW5kcyBhcmUgYm90aCBhY2NlcHRhYmxlLlxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuTWFjcm9Db21tYW5kLnByb3RvdHlwZS5pbml0aWFsaXplTWFjcm9Db21tYW5kPSBmdW5jdGlvbigpIHt9XHJcblxyXG4vKipcclxuICogQHByb3RlY3RlZFxyXG4gKiBBZGQgYSAqU3ViQ29tbWFuZCpcclxuICpcclxuICogVGhlICpTdWJDb21tYW5kKnMgd2lsbCBiZSBjYWxsZWQgaW4gRmlyc3QgSW4gLyBGaXJzdCBPdXQgKEZJRk8pIG9yZGVyXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbW1hbmRDbGFzc1JlZlxyXG4gKiAgQSByZWZlcmVuY2UgdG8gYSBzdWJjbGFzc2VkIFNpbXBsZUNvbW1hbmQgb3IgTWFjcm9Db21tYW5kIGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5NYWNyb0NvbW1hbmQucHJvdG90eXBlLmFkZFN1YkNvbW1hbmQ9IGZ1bmN0aW9uKGNvbW1hbmRDbGFzc1JlZilcclxue1xyXG4gICAgdGhpcy5zdWJDb21tYW5kcy5wdXNoKGNvbW1hbmRDbGFzc1JlZik7XHJcbn07XHJcblxyXG4vKipcclxuICogRXhlY3V0ZSB0aGlzIE1hY3JvQ29tbWFuZHMgKlN1YkNvbW1hbmRzKlxyXG4gKlxyXG4gKiBUaGUgKlN1YkNvbW1hbmQqcyB3aWxsIGJlIGNhbGxlZCBpbiBGaXJzdCBJbiAvIEZpcnN0IE91dCAoRklGTykgb3JkZXJcclxuICogQHBhcmFtIHtwdXJlbXZjLk5vdGlmaWNhdGlvbn0gbm90ZVxyXG4gKiAgVGhlIE5vdGlmaWNhdGlvbiBvYmplY3QgdG8gYmUgcGFzc2VkIHRvIGVhY2ggKlN1YkNvbW1hbmQqXHJcbiAqL1xyXG5NYWNyb0NvbW1hbmQucHJvdG90eXBlLmV4ZWN1dGU9IGZ1bmN0aW9uKG5vdGUpXHJcbntcclxuICAgIC8vIFNJQy0gVE9ETyBvcHRpbWl6ZVxyXG4gICAgd2hpbGUodGhpcy5zdWJDb21tYW5kcy5sZW5ndGggPiAwKVxyXG4gICAge1xyXG4gICAgICAgIHZhciByZWY9IHRoaXMuc3ViQ29tbWFuZHMuc2hpZnQoKTtcclxuICAgICAgICB2YXIgY21kPSBuZXcgcmVmO1xyXG4gICAgICAgIGNtZC5pbml0aWFsaXplTm90aWZpZXIodGhpcy5tdWx0aXRvbktleSk7XHJcbiAgICAgICAgY21kLmV4ZWN1dGUobm90ZSk7XHJcbiAgICB9XHJcbn07XHJcbi8qKlxyXG4gKiBAYXV0aG9yIFB1cmVNVkMgSlMgTmF0aXZlIFBvcnQgYnkgRGF2aWQgRm9sZXksIEZyw6lkw6lyaWMgU2F1bmllciwgJiBBbGFpbiBEdWNoZXNuZWF1XHJcbiAqIEBhdXRob3IgQ29weXJpZ2h0KGMpIDIwMDYtMjAxMiBGdXR1cmVzY2FsZSwgSW5jLiwgU29tZSByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIEBjbGFzcyBwdXJlbXZjLk1lZGlhdG9yXHJcbiAqIEBleHRlbmRzIHB1cmVtdmMuTm90aWZpZXJcclxuICpcclxuICogQSBiYXNlIE1lZGlhdG9yIGltcGxlbWVudGF0aW9uLlxyXG4gKlxyXG4gKiBJbiBQdXJlTVZDLCBNZWRpYXRvciBjbGFzc2VzIGFyZSB1c2VkIHRvIG1lZGlhdGUgY29tbXVuaWNhdGlvbiBiZXR3ZWVuIGEgdmlld1xyXG4gKiBjb21wb25lbnQgYW5kIHRoZSByZXN0IG9mIHRoZSBhcHBsaWNhdGlvbi5cclxuICpcclxuICogQSBNZWRpYXRvciBzaG91bGQgbGlzdGVuIHRvIGl0cyB2aWV3IGNvbXBvbmVudHMgZm9yIGV2ZW50cywgYW5kIGhhbmRsZSB0aGVtXHJcbiAqIGJ5IHNlbmRpbmcgbm90aWZpY2F0aW9ucyAodG8gYmUgaGFuZGxlZCBieSBvdGhlciBNZWRpYXRvcnMsXHJcbiAqIHtAbGluayBwdXJlbXZjLlNpbXBsZUNvbW1hbmQgU2ltcGxlQ29tbWFuZHN9XHJcbiAqIG9yXHJcbiAqIHtAbGluayBwdXJlbXZjLk1hY3JvQ29tbWFuZCBNYWNyb0NvbW1hbmRzfSlcclxuICogb3IgcGFzc2luZyBkYXRhIGZyb20gdGhlIHZpZXcgY29tcG9uZW50IGRpcmVjdGx5IHRvIGFcclxuICoge0BsaW5rIHB1cmVtdmMuUHJveHkgUHJveHl9LCBzdWNoIGFzIHN1Ym1pdHRpbmdcclxuICogdGhlIGNvbnRlbnRzIG9mIGEgZm9ybSB0byBhIHNlcnZpY2UuXHJcbiAqXHJcbiAqIE1lZGlhdG9ycyBzaG91bGQgbm90IHBlcmZvcm0gYnVzaW5lc3MgbG9naWMsIG1haW50YWluIHN0YXRlIG9yIG90aGVyXHJcbiAqIGluZm9ybWF0aW9uIGZvciBpdHMgdmlldyBjb21wb25lbnQsIG9yIGJyZWFrIHRoZSBlbmNhcHN1bGF0aW9uIG9mIHRoZSB2aWV3XHJcbiAqIGNvbXBvbmVudCBieSBtYW5pcHVsYXRpbmcgdGhlIHZpZXcgY29tcG9uZW50J3MgY2hpbGRyZW4uIEl0IHNob3VsZCBvbmx5IGNhbGxcclxuICogbWV0aG9kcyBvciBzZXQgcHJvcGVydGllcyBvbiB0aGUgdmlldyBjb21wb25lbnQuXHJcbiAqXHJcbiAqIFRoZSB2aWV3IGNvbXBvbmVudCBzaG91bGQgZW5jYXBzdWxhdGUgaXRzIG93biBiZWhhdmlvciBhbmQgaW1wbGVtZW50YXRpb24gYnlcclxuICogZXhwb3NpbmcgbWV0aG9kcyBhbmQgcHJvcGVydGllcyB0aGF0IHRoZSBNZWRpYXRvciBjYW4gY2FsbCB3aXRob3V0IGhhdmluZyB0b1xyXG4gKiBrbm93IGFib3V0IHRoZSB2aWV3IGNvbXBvbmVudCdzIGNoaWxkcmVuLlxyXG4gKlxyXG4gKiBAY29uc3RydWN0b3JcclxuICogQHBhcmFtIHtzdHJpbmd9IFttZWRpYXRvck5hbWVdXHJcbiAqICBUaGUgTWVkaWF0b3JzIG5hbWUuIFRoZSBNZWRpYXRvcnMgc3RhdGljICNOQU1FIHZhbHVlIGlzIHVzZWQgYnkgZGVmYXVsdFxyXG4gKiBAcGFyYW0ge09iamVjdH0gW3ZpZXdDb21wb25lbnRdXHJcbiAqICBUaGUgTWVkaWF0b3JzIHtAbGluayAjc2V0Vmlld0NvbXBvbmVudCB2aWV3Q29tcG9uZW50fS5cclxuICovXHJcbmZ1bmN0aW9uIE1lZGlhdG9yIChtZWRpYXRvck5hbWUsIHZpZXdDb21wb25lbnQpXHJcbntcclxuICAgIHRoaXMubWVkaWF0b3JOYW1lPSBtZWRpYXRvck5hbWUgfHwgdGhpcy5jb25zdHJ1Y3Rvci5OQU1FO1xyXG4gICAgdGhpcy52aWV3Q29tcG9uZW50PXZpZXdDb21wb25lbnQ7XHJcbn07XHJcblxyXG4vKipcclxuICogQHN0YXRpY1xyXG4gKiBUaGUgbmFtZSBvZiB0aGUgTWVkaWF0b3IuXHJcbiAqXHJcbiAqIFR5cGljYWxseSwgYSBNZWRpYXRvciB3aWxsIGJlIHdyaXR0ZW4gdG8gc2VydmUgb25lIHNwZWNpZmljIGNvbnRyb2wgb3IgZ3JvdXBcclxuICogb2YgY29udHJvbHMgYW5kIHNvLCB3aWxsIG5vdCBoYXZlIGEgbmVlZCB0byBiZSBkeW5hbWljYWxseSBuYW1lZC5cclxuICpcclxuICogQHR5cGUge3N0cmluZ31cclxuICovXHJcbk1lZGlhdG9yLk5BTUU9IFwiTWVkaWF0b3JcIjtcclxuXHJcbi8qIHN1YmNsYXNzICovXHJcbk1lZGlhdG9yLnByb3RvdHlwZT0gbmV3IE5vdGlmaWVyO1xyXG5NZWRpYXRvci5wcm90b3R5cGUuY29uc3RydWN0b3I9IE1lZGlhdG9yO1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgbmFtZSBvZiB0aGUgTWVkaWF0b3JcclxuICpcclxuICogQHJldHVybiB7c3RyaW5nfVxyXG4gKiAgVGhlIE1lZGlhdG9yIG5hbWVcclxuICovXHJcbk1lZGlhdG9yLnByb3RvdHlwZS5nZXRNZWRpYXRvck5hbWU9IGZ1bmN0aW9uICgpXHJcbntcclxuICAgIHJldHVybiB0aGlzLm1lZGlhdG9yTmFtZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIE1lZGlhdG9ycyB2aWV3IGNvbXBvbmVudC4gVGhpcyBjb3VsZFxyXG4gKiBiZSBhIEhUTUxFbGVtZW50LCBhIGJlc3Bva2UgVWlDb21wb25lbnQgd3JhcHBlclxyXG4gKiBjbGFzcywgYSBNb29Ub29scyBFbGVtZW50LCBhIGpRdWVyeSByZXN1bHQgb3IgYVxyXG4gKiBjc3Mgc2VsZWN0b3IsIGRlcGVuZGluZyBvbiB3aGljaCBET00gYWJzdHJhY3Rpb25cclxuICogbGlicmFyeSB5b3UgYXJlIHVzaW5nLlxyXG4gKlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gdGhlIHZpZXcgY29tcG9uZW50XHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5NZWRpYXRvci5wcm90b3R5cGUuc2V0Vmlld0NvbXBvbmVudD0gZnVuY3Rpb24gKHZpZXdDb21wb25lbnQpXHJcbntcclxuICAgIHRoaXMudmlld0NvbXBvbmVudD0gdmlld0NvbXBvbmVudDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIE1lZGlhdG9ycyB2aWV3IGNvbXBvbmVudC5cclxuICpcclxuICogQWRkaXRpb25hbGx5LCBhbiBvcHRpb25hbCBleHBsaWNpdCBnZXR0ZXIgY2FuIGJlXHJcbiAqIGJlIGRlZmluZWQgaW4gdGhlIHN1YmNsYXNzIHRoYXQgZGVmaW5lcyB0aGVcclxuICogdmlldyBjb21wb25lbnRzLCBwcm92aWRpbmcgYSBtb3JlIHNlbWFudGljIGludGVyZmFjZVxyXG4gKiB0byB0aGUgTWVkaWF0b3IuXHJcbiAqXHJcbiAqIFRoaXMgaXMgZGlmZmVyZW50IGZyb20gdGhlIEFTMyBpbXBsZW1lbnRhdGlvbiBpblxyXG4gKiB0aGUgc2Vuc2UgdGhhdCBubyBjYXN0aW5nIGlzIHJlcXVpcmVkIGZyb20gdGhlXHJcbiAqIG9iamVjdCBzdXBwbGllZCBhcyB0aGUgdmlldyBjb21wb25lbnQuXHJcbiAqXHJcbiAqICAgICBNeU1lZGlhdG9yLnByb3RvdHlwZS5nZXRDb21ib0JveD0gZnVuY3Rpb24gKClcclxuICogICAgIHtcclxuICogICAgICAgICByZXR1cm4gdGhpcy52aWV3Q29tcG9uZW50OyAgXHJcbiAqICAgICB9XHJcbiAqXHJcbiAqIEByZXR1cm4ge09iamVjdH1cclxuICogIFRoZSB2aWV3IGNvbXBvbmVudFxyXG4gKi9cclxuTWVkaWF0b3IucHJvdG90eXBlLmdldFZpZXdDb21wb25lbnQ9IGZ1bmN0aW9uICgpXHJcbntcclxuICAgIHJldHVybiB0aGlzLnZpZXdDb21wb25lbnQ7XHJcbn07XHJcblxyXG4vKipcclxuICogTGlzdCB0aGUgTm90aWZpY2F0aW9uIG5hbWVzIHRoaXMgTWVkaWF0b3IgaXMgaW50ZXJlc3RlZFxyXG4gKiBpbiBiZWluZyBub3RpZmllZCBvZi5cclxuICpcclxuICogQHJldHVybiB7QXJyYXl9XHJcbiAqICBUaGUgbGlzdCBvZiBOb3RpZmljYXRpb24gbmFtZXMuXHJcbiAqL1xyXG5NZWRpYXRvci5wcm90b3R5cGUubGlzdE5vdGlmaWNhdGlvbkludGVyZXN0cz0gZnVuY3Rpb24gKClcclxue1xyXG4gICAgcmV0dXJuIFtdO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEhhbmRsZSBOb3RpZmljYXRpb25zLlxyXG4gKlxyXG4gKiBUeXBpY2FsbHkgdGhpcyB3aWxsIGJlIGhhbmRsZWQgaW4gYSBzd2l0Y2ggc3RhdGVtZW50XHJcbiAqIHdpdGggb25lICdjYXNlJyBlbnRyeSBwZXIgTm90aWZpY2F0aW9uIHRoZSBNZWRpYXRvclxyXG4gKiBpcyBpbnRlcmVzdGVkIGluXHJcbiAqXHJcbiAqIEBwYXJhbSB7cHVyZW12Yy5Ob3RpZmljYXRpb259IG5vdGlmaWNhdGlvblxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuTWVkaWF0b3IucHJvdG90eXBlLmhhbmRsZU5vdGlmaWNhdGlvbj0gZnVuY3Rpb24gKG5vdGlmaWNhdGlvbilcclxue1xyXG4gICAgcmV0dXJuO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENhbGxlZCBieSB0aGUgVmlldyB3aGVuIHRoZSBNZWRpYXRvciBpcyByZWdpc3RlcmVkXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5NZWRpYXRvci5wcm90b3R5cGUub25SZWdpc3Rlcj0gZnVuY3Rpb24gKClcclxue1xyXG4gICAgcmV0dXJuO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENhbGxlZCBieSB0aGUgVmlldyB3aGVuIHRoZSBNZWRpYXRvciBpcyByZW1vdmVkXHJcbiAqL1xyXG5NZWRpYXRvci5wcm90b3R5cGUub25SZW1vdmU9IGZ1bmN0aW9uICgpXHJcbntcclxuICAgIHJldHVybjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqIFRoZSBNZWRpYXRvcnMgbmFtZS4gU2hvdWxkIG9ubHkgYmUgYWNjZXNzZWQgYnkgTWVkaWF0b3Igc3ViY2xhc3Nlcy5cclxuICpcclxuICogQHByb3RlY3RlZFxyXG4gKiBAdHlwZSBzdHJpbmdcclxuICovXHJcbk1lZGlhdG9yLnByb3RvdHlwZS5tZWRpYXRvck5hbWU9IG51bGw7XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKiBUaGUgTWVkaWF0b3JzIHZpZXdDb21wb25lbnQuIFNob3VsZCBvbmx5IGJlIGFjY2Vzc2VkIGJ5IE1lZGlhdG9yIHN1YmNsYXNzZXMuXHJcbiAqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQHR5cGUgT2JqZWN0XHJcbiAqL1xyXG5NZWRpYXRvci5wcm90b3R5cGUudmlld0NvbXBvbmVudD1udWxsO1xyXG4vKipcclxuICogQGF1dGhvciBQdXJlTVZDIEpTIE5hdGl2ZSBQb3J0IGJ5IERhdmlkIEZvbGV5LCBGcsOpZMOpcmljIFNhdW5pZXIsICYgQWxhaW4gRHVjaGVzbmVhdVxyXG4gKiBAYXV0aG9yIENvcHlyaWdodChjKSAyMDA2LTIwMTIgRnV0dXJlc2NhbGUsIEluYy4sIFNvbWUgcmlnaHRzIHJlc2VydmVkLlxyXG4gKlxyXG4gKiBAY2xhc3MgcHVyZW12Yy5Qcm94eVxyXG4gKiBAZXh0ZW5kcyBwdXJlbXZjLk5vdGlmaWVyXHJcbiAqXHJcbiAqIEEgYmFzZSBQcm94eSBpbXBsZW1lbnRhdGlvbi5cclxuICpcclxuICogSW4gUHVyZU1WQywgUHJveHkgY2xhc3NlcyBhcmUgdXNlZCB0byBtYW5hZ2UgcGFydHMgb2YgdGhlIGFwcGxpY2F0aW9uJ3MgZGF0YVxyXG4gKiBtb2RlbC5cclxuICpcclxuICogQSBQcm94eSBtaWdodCBzaW1wbHkgbWFuYWdlIGEgcmVmZXJlbmNlIHRvIGEgbG9jYWwgZGF0YSBvYmplY3QsIGluIHdoaWNoIGNhc2VcclxuICogaW50ZXJhY3Rpbmcgd2l0aCBpdCBtaWdodCBpbnZvbHZlIHNldHRpbmcgYW5kIGdldHRpbmcgb2YgaXRzIGRhdGEgaW5cclxuICogc3luY2hyb25vdXMgZmFzaGlvbi5cclxuICpcclxuICogUHJveHkgY2xhc3NlcyBhcmUgYWxzbyB1c2VkIHRvIGVuY2Fwc3VsYXRlIHRoZSBhcHBsaWNhdGlvbidzIGludGVyYWN0aW9uIHdpdGhcclxuICogcmVtb3RlIHNlcnZpY2VzIHRvIHNhdmUgb3IgcmV0cmlldmUgZGF0YSwgaW4gd2hpY2ggY2FzZSwgd2UgYWRvcHQgYW5cclxuICogYXN5bmNyb25vdXMgaWRpb207IHNldHRpbmcgZGF0YSAob3IgY2FsbGluZyBhIG1ldGhvZCkgb24gdGhlIFByb3h5IGFuZFxyXG4gKiBsaXN0ZW5pbmcgZm9yIGFcclxuICoge0BsaW5rIHB1cmVtdmMuTm90aWZpY2F0aW9uIE5vdGlmaWNhdGlvbn1cclxuICogdG8gYmUgc2VudCAgd2hlbiB0aGUgUHJveHkgaGFzIHJldHJpZXZlZCB0aGUgZGF0YSBmcm9tIHRoZSBzZXJ2aWNlLlxyXG4gKlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gW3Byb3h5TmFtZV1cclxuICogIFRoZSBQcm94eSdzIG5hbWUuIElmIG5vbmUgaXMgcHJvdmlkZWQsIHRoZSBQcm94eSB3aWxsIHVzZSBpdHMgY29uc3RydWN0b3JzXHJcbiAqICBOQU1FIHByb3BlcnR5LlxyXG4gKiBAcGFyYW0ge09iamVjdH0gW2RhdGFdXHJcbiAqICBUaGUgUHJveHkncyBkYXRhIG9iamVjdFxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIFByb3h5KHByb3h5TmFtZSwgZGF0YSlcclxue1xyXG4gICAgdGhpcy5wcm94eU5hbWU9IHByb3h5TmFtZSB8fCB0aGlzLmNvbnN0cnVjdG9yLk5BTUU7XHJcbiAgICBpZihkYXRhICE9IG51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKGRhdGEpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcblByb3h5Lk5BTUU9IFwiUHJveHlcIjtcclxuXHJcblByb3h5LnByb3RvdHlwZT0gbmV3IE5vdGlmaWVyO1xyXG5Qcm94eS5wcm90b3R5cGUuY29uc3RydWN0b3I9IFByb3h5O1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgUHJveHkncyBuYW1lLlxyXG4gKlxyXG4gKiBAcmV0dXJuIHtzdHJpbmd9XHJcbiAqL1xyXG5Qcm94eS5wcm90b3R5cGUuZ2V0UHJveHlOYW1lPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHJldHVybiB0aGlzLnByb3h5TmFtZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIFByb3h5J3MgZGF0YSBvYmplY3RcclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IGRhdGFcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcblByb3h5LnByb3RvdHlwZS5zZXREYXRhPSBmdW5jdGlvbihkYXRhKVxyXG57XHJcbiAgICB0aGlzLmRhdGE9IGRhdGE7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBQcm94eSdzIGRhdGEgb2JqZWN0XHJcbiAqXHJcbiAqIEByZXR1cm4ge09iamVjdH1cclxuICovXHJcblByb3h5LnByb3RvdHlwZS5nZXREYXRhPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHJldHVybiB0aGlzLmRhdGE7XHJcbn07XHJcblxyXG4vKipcclxuICogQ2FsbGVkIGJ5IHRoZSB7QGxpbmsgcHVyZW12Yy5Nb2RlbCBNb2RlbH0gd2hlblxyXG4gKiB0aGUgUHJveHkgaXMgcmVnaXN0ZXJlZC5cclxuICpcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcblByb3h5LnByb3RvdHlwZS5vblJlZ2lzdGVyPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHJldHVybjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDYWxsZWQgYnkgdGhlIHtAbGluayBwdXJlbXZjLk1vZGVsIE1vZGVsfSB3aGVuXHJcbiAqIHRoZSBQcm94eSBpcyByZW1vdmVkLlxyXG4gKlxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuUHJveHkucHJvdG90eXBlLm9uUmVtb3ZlPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHJldHVybjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqIFRoZSBQcm94eXMgbmFtZS5cclxuICpcclxuICogQHByb3RlY3RlZFxyXG4gKiBAdHlwZSBTdHJpbmdcclxuICovXHJcblByb3h5LnByb3RvdHlwZS5wcm94eU5hbWU9IG51bGw7XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKiBUaGUgUHJveHkncyBkYXRhIG9iamVjdC5cclxuICpcclxuICogQHByb3RlY3RlZFxyXG4gKiBAdHlwZSBPYmplY3RcclxuICovXHJcblByb3h5LnByb3RvdHlwZS5kYXRhPSBudWxsO1xyXG4vKipcclxuICogQGF1dGhvciBQdXJlTVZDIEpTIE5hdGl2ZSBQb3J0IGJ5IERhdmlkIEZvbGV5LCBGcsOpZMOpcmljIFNhdW5pZXIsICYgQWxhaW4gRHVjaGVzbmVhdVxyXG4gKiBAYXV0aG9yIENvcHlyaWdodChjKSAyMDA2LTIwMTIgRnV0dXJlc2NhbGUsIEluYy4sIFNvbWUgcmlnaHRzIHJlc2VydmVkLlxyXG4gKlxyXG4gKiBAY2xhc3MgcHVyZW12Yy5GYWNhZGVcclxuICogRmFjYWRlIGV4cG9zZXMgdGhlIGZ1bmN0aW9uYWxpdHkgb2YgdGhlIENvbnRyb2xsZXIsIE1vZGVsIGFuZCBWaWV3XHJcbiAqIGFjdG9ycyB0byBjbGllbnQgZmFjaW5nIGNvZGUuXHJcbiAqXHJcbiAqIFRoaXMgRmFjYWRlIGltcGxlbWVudGF0aW9uIGlzIGEgTXVsdGl0b24sIHNvIHlvdSBzaG91bGQgbm90IGNhbGwgdGhlXHJcbiAqIGNvbnN0cnVjdG9yIGRpcmVjdGx5LCBidXQgaW5zdGVhZCBjYWxsIHRoZSBzdGF0aWMgRmFjdG9yeSBtZXRob2QsXHJcbiAqIHBhc3NpbmcgdGhlIHVuaXF1ZSBrZXkgZm9yIHRoaXMgaW5zdGFuY2UgdG8gI2dldEluc3RhbmNlXHJcbiAqXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5XHJcbiAqIFx0VGhlIG11bHRpdG9uIGtleSB0byB1c2UgdG8gcmV0cmlldmUgdGhlIEZhY2FkZSBpbnN0YW5jZS5cclxuICogQHRocm93cyB7RXJyb3J9XHJcbiAqICBJZiBhbiBhdHRlbXB0IGlzIG1hZGUgdG8gaW5zdGFudGlhdGUgRmFjYWRlIGRpcmVjdGx5XHJcbiAqL1xyXG5mdW5jdGlvbiBGYWNhZGUoa2V5KVxyXG57XHJcbiAgICBpZihGYWNhZGUuaW5zdGFuY2VNYXBba2V5XSAhPSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihGYWNhZGUuTVVMVElUT05fTVNHKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmluaXRpYWxpemVOb3RpZmllcihrZXkpO1xyXG4gICAgRmFjYWRlLmluc3RhbmNlTWFwW2tleV0gPSB0aGlzO1xyXG4gICAgdGhpcy5pbml0aWFsaXplRmFjYWRlKCk7XHJcbn07XHJcblxyXG4vKipcclxuICogSW5pdGlhbGl6ZSB0aGUgTXVsdGl0b24gRmFjYWRlIGluc3RhbmNlLlxyXG4gKlxyXG4gKiBDYWxsZWQgYXV0b21hdGljYWxseSBieSB0aGUgY29uc3RydWN0b3IuIE92ZXJyaWRlIGluIHlvdXIgc3ViY2xhc3MgdG8gYW55XHJcbiAqIHN1YmNsYXNzIHNwZWNpZmljIGluaXRpYWxpemF0aW9ucy4gQmUgc3VyZSB0byBjYWxsIHRoZSAnc3VwZXInXHJcbiAqIGluaXRpYWxpemVGYWNhZGUgbWV0aG9kLCB0aG91Z2hcclxuICpcclxuICogICAgIE15RmFjYWRlLnByb3RvdHlwZS5pbml0aWFsaXplRmFjYWRlPSBmdW5jdGlvbiAoKVxyXG4gKiAgICAge1xyXG4gKiAgICAgICAgIEZhY2FkZS5jYWxsKHRoaXMpO1xyXG4gKiAgICAgfTtcclxuICogQHByb3RlY3RlZFxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuRmFjYWRlLnByb3RvdHlwZS5pbml0aWFsaXplRmFjYWRlID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICB0aGlzLmluaXRpYWxpemVNb2RlbCgpO1xyXG4gICAgdGhpcy5pbml0aWFsaXplQ29udHJvbGxlcigpO1xyXG4gICAgdGhpcy5pbml0aWFsaXplVmlldygpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEZhY2FkZSBNdWx0aXRvbiBGYWN0b3J5IG1ldGhvZC5cclxuICogTm90ZSB0aGF0IHRoaXMgbWV0aG9kIHdpbGwgcmV0dXJuIG51bGwgaWYgc3VwcGxpZWQgYVxyXG4gKiBudWxsIG9yIHVuZGVmaW5lZCBtdWx0aXRvbiBrZXkuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcclxuICogXHRUaGUgbXVsdGl0b24ga2V5IHVzZSB0byByZXRyaWV2ZSBhIHBhcnRpY3VsYXIgRmFjYWRlIGluc3RhbmNlXHJcbiAqIEByZXR1cm4ge3B1cmVtdmMuRmFjYWRlfVxyXG4gKi9cclxuRmFjYWRlLmdldEluc3RhbmNlID0gZnVuY3Rpb24oa2V5KVxyXG57XHJcbiAgICBpZiAobnVsbCA9PSBrZXkpXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgaWYoRmFjYWRlLmluc3RhbmNlTWFwW2tleV0gPT0gbnVsbClcclxuICAgIHtcclxuICAgICAgICBGYWNhZGUuaW5zdGFuY2VNYXBba2V5XSA9IG5ldyBGYWNhZGUoa2V5KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gRmFjYWRlLmluc3RhbmNlTWFwW2tleV07XHJcbn07XHJcblxyXG4vKipcclxuICogSW5pdGlhbGl6ZSB0aGUge0BsaW5rIHB1cmVtdmMuQ29udHJvbGxlciBDb250cm9sbGVyfS5cclxuICpcclxuICogQ2FsbGVkIGJ5IHRoZSAjaW5pdGlhbGl6ZUZhY2FkZSBtZXRob2QuXHJcbiAqXHJcbiAqIE92ZXJyaWRlIHRoaXMgbWV0aG9kIGluIHlvdXIgc3ViY2xhc3Mgb2YgRmFjYWRlXHJcbiAqIGlmIG9uZSBvciBib3RoIG9mIHRoZSBmb2xsb3dpbmcgYXJlIHRydWU6XHJcbiAqIC0gWW91IHdpc2ggdG8gaW5pdGlhbGl6ZSBhIGRpZmZlcmVudCBDb250cm9sbGVyXHJcbiAqIC0gWW91IGhhdmVcclxuICoge0BsaW5rIHB1cmVtdmMuU2ltcGxlQ29tbWFuZCBTaW1wbGVDb21tYW5kfXNcclxuICogb3Ige0BsaW5rIHB1cmVtdmMuTWFjcm9Db21tYW5kIE1hY3JvQ29tbWFuZH1zXHJcbiAqIHRvIHJlZ2lzdGVyIHdpdGggdGhlIENvbnRyb2xsZXJhdCBzdGFydHVwLlxyXG4gKlxyXG4gKiBJZiB5b3UgZG9uJ3Qgd2FudCB0byBpbml0aWFsaXplIGEgZGlmZmVyZW50IENvbnRyb2xsZXIsXHJcbiAqIGNhbGwgdGhlICdzdXBlcicgaW5pdGlhbGl6ZUNvbnRyb2xsZSBtZXRob2QgYXQgdGhlIGJlZ2lubmluZyBvZiB5b3VyXHJcbiAqIG1ldGhvZCwgdGhlbiByZWdpc3RlciBjb21tYW5kcy5cclxuICpcclxuICogICAgIE15RmFjYWRlLnByb3RvdHlwZS5pbml0aWFsaXplQ29udHJvbGxlcj0gZnVuY3Rpb24gKClcclxuICogICAgIHtcclxuICogICAgICAgICBGYWNhZGUucHJvdG90eXBlLmluaXRpYWxpemVDb250cm9sbGVyLmNhbGwodGhpcyk7XHJcbiAqICAgICAgICAgdGhpcy5yZWdpc3RlckNvbW1hbmQoQXBwQ29uc3RhbnRzLkFfTk9URV9OQU1FLCBBQmVzcG9rZUNvbW1hbmQpXHJcbiAqICAgICB9XHJcbiAqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbkZhY2FkZS5wcm90b3R5cGUuaW5pdGlhbGl6ZUNvbnRyb2xsZXIgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIGlmKHRoaXMuY29udHJvbGxlciAhPSBudWxsKVxyXG4gICAgICAgIHJldHVybjtcclxuXHJcbiAgICB0aGlzLmNvbnRyb2xsZXIgPSBDb250cm9sbGVyLmdldEluc3RhbmNlKHRoaXMubXVsdGl0b25LZXkpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogSW5pdGlhbGl6ZSB0aGUge0BsaW5rIHB1cmVtdmMuTW9kZWwgTW9kZWx9O1xyXG4gKlxyXG4gKiBDYWxsZWQgYnkgdGhlICNpbml0aWFsaXplRmFjYWRlIG1ldGhvZC5cclxuICogT3ZlcnJpZGUgdGhpcyBtZXRob2QgaW4geW91ciBzdWJjbGFzcyBvZiBGYWNhZGUgaWYgb25lIG9mIHRoZSBmb2xsb3dpbmcgYXJlXHJcbiAqIHRydWU6XHJcbiAqXHJcbiAqIC0gWW91IHdpc2ggdG8gaW5pdGlhbGl6ZSBhIGRpZmZlcmVudCBNb2RlbC5cclxuICpcclxuICogLSBZb3UgaGF2ZSB7QGxpbmsgcHVyZW12Yy5Qcm94eSBQcm94eX1zIHRvXHJcbiAqICAgcmVnaXN0ZXIgd2l0aCB0aGUgTW9kZWwgdGhhdCBkbyBub3QgcmV0cmlldmUgYSByZWZlcmVuY2UgdG8gdGhlIEZhY2FkZSBhdFxyXG4gKiAgIGNvbnN0cnVjdGlvbiB0aW1lLlxyXG4gKlxyXG4gKiBJZiB5b3UgZG9uJ3Qgd2FudCB0byBpbml0aWFsaXplIGEgZGlmZmVyZW50IE1vZGVsXHJcbiAqIGNhbGwgJ3N1cGVyJyAjaW5pdGlhbGl6ZU1vZGVsIGF0IHRoZSBiZWdpbm5pbmcgb2YgeW91ciBtZXRob2QsIHRoZW4gcmVnaXN0ZXJcclxuICogUHJveHlzLlxyXG4gKlxyXG4gKiBOb3RlOiBUaGlzIG1ldGhvZCBpcyAqcmFyZWx5KiBvdmVycmlkZGVuOyBpbiBwcmFjdGljZSB5b3UgYXJlIG1vcmVcclxuICogbGlrZWx5IHRvIHVzZSBhIGNvbW1hbmQgdG8gY3JlYXRlIGFuZCByZWdpc3RlclByb3h5cyB3aXRoIHRoZSBNb2RlbD4sXHJcbiAqIHNpbmNlIFByb3h5cyB3aXRoIG11dGFibGUgZGF0YSB3aWxsIGxpa2VseVxyXG4gKiBuZWVkIHRvIHNlbmQgTm90aWZpY2F0aW9ucyBhbmQgdGh1cyB3aWxsIGxpa2VseSB3YW50IHRvIGZldGNoIGEgcmVmZXJlbmNlIHRvXHJcbiAqIHRoZSBGYWNhZGUgZHVyaW5nIHRoZWlyIGNvbnN0cnVjdGlvbi5cclxuICpcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbkZhY2FkZS5wcm90b3R5cGUuaW5pdGlhbGl6ZU1vZGVsID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICBpZih0aGlzLm1vZGVsICE9IG51bGwpXHJcbiAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgIHRoaXMubW9kZWwgPSBNb2RlbC5nZXRJbnN0YW5jZSh0aGlzLm11bHRpdG9uS2V5KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqXHJcbiAqIEluaXRpYWxpemUgdGhlIHtAbGluayBwdXJlbXZjLlZpZXcgVmlld30uXHJcbiAqXHJcbiAqIENhbGxlZCBieSB0aGUgI2luaXRpYWxpemVGYWNhZGUgbWV0aG9kLlxyXG4gKlxyXG4gKiBPdmVycmlkZSB0aGlzIG1ldGhvZCBpbiB5b3VyIHN1YmNsYXNzIG9mIEZhY2FkZSBpZiBvbmUgb3IgYm90aCBvZiB0aGVcclxuICogZm9sbG93aW5nIGFyZSB0cnVlOlxyXG4gKlxyXG4gKiAtIFlvdSB3aXNoIHRvIGluaXRpYWxpemUgYSBkaWZmZXJlbnQgVmlldy5cclxuICogLSBZb3UgaGF2ZSBPYnNlcnZlcnMgdG8gcmVnaXN0ZXIgd2l0aCB0aGUgVmlld1xyXG4gKlxyXG4gKiBJZiB5b3UgZG9uJ3Qgd2FudCB0byBpbml0aWFsaXplIGEgZGlmZmVyZW50IFZpZXdcclxuICogY2FsbCAnc3VwZXInICNpbml0aWFsaXplVmlldyBhdCB0aGUgYmVnaW5uaW5nIG9mIHlvdXJcclxuICogbWV0aG9kLCB0aGVuIHJlZ2lzdGVyIE1lZGlhdG9yIGluc3RhbmNlcy5cclxuICpcclxuICogICAgIE15RmFjYWRlLnByb3RvdHlwZS5pbml0aWFsaXplVmlldz0gZnVuY3Rpb24gKClcclxuICogICAgIHtcclxuICogICAgICAgICBGYWNhZGUucHJvdG90eXBlLmluaXRpYWxpemVWaWV3LmNhbGwodGhpcyk7XHJcbiAqICAgICAgICAgdGhpcy5yZWdpc3Rlck1lZGlhdG9yKG5ldyBNeU1lZGlhdG9yKCkpO1xyXG4gKiAgICAgfTtcclxuICpcclxuICogTm90ZTogVGhpcyBtZXRob2QgaXMgKnJhcmVseSogb3ZlcnJpZGRlbjsgaW4gcHJhY3RpY2UgeW91IGFyZSBtb3JlXHJcbiAqIGxpa2VseSB0byB1c2UgYSBjb21tYW5kIHRvIGNyZWF0ZSBhbmQgcmVnaXN0ZXIgTWVkaWF0b3JzXHJcbiAqIHdpdGggdGhlIFZpZXcsIHNpbmNlIE1lZGlhdG9yIGluc3RhbmNlcyB3aWxsIG5lZWQgdG8gc2VuZFxyXG4gKiBOb3RpZmljYXRpb25zIGFuZCB0aHVzIHdpbGwgbGlrZWx5IHdhbnQgdG8gZmV0Y2ggYSByZWZlcmVuY2VcclxuICogdG8gdGhlIEZhY2FkZSBkdXJpbmcgdGhlaXIgY29uc3RydWN0aW9uLlxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuRmFjYWRlLnByb3RvdHlwZS5pbml0aWFsaXplVmlldyA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgaWYodGhpcy52aWV3ICE9IG51bGwpXHJcbiAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgIHRoaXMudmlldyA9IFZpZXcuZ2V0SW5zdGFuY2UodGhpcy5tdWx0aXRvbktleSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVnaXN0ZXIgYSBjb21tYW5kIHdpdGggdGhlIENvbnRyb2xsZXIgYnkgTm90aWZpY2F0aW9uIG5hbWVcclxuICogQHBhcmFtIHtzdHJpbmd9IG5vdGlmaWNhdGlvbk5hbWVcclxuICogIFRoZSBuYW1lIG9mIHRoZSBOb3RpZmljYXRpb24gdG8gYXNzb2NpYXRlIHRoZSBjb21tYW5kIHdpdGhcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY29tbWFuZENsYXNzUmVmXHJcbiAqICBBIHJlZmVyZW5jZSBvdCB0aGUgY29tbWFuZHMgY29uc3RydWN0b3IuXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5GYWNhZGUucHJvdG90eXBlLnJlZ2lzdGVyQ29tbWFuZCA9IGZ1bmN0aW9uKG5vdGlmaWNhdGlvbk5hbWUsIGNvbW1hbmRDbGFzc1JlZilcclxue1xyXG4gICAgdGhpcy5jb250cm9sbGVyLnJlZ2lzdGVyQ29tbWFuZChub3RpZmljYXRpb25OYW1lLCBjb21tYW5kQ2xhc3NSZWYpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSBhIHByZXZpb3VzbHkgcmVnaXN0ZXJlZCBjb21tYW5kIHRvIE5vdGlmaWNhdGlvbiBtYXBwaW5nIGZyb20gdGhlXHJcbiAqIHtAbGluayBwdXJlbXZjLkNvbnRyb2xsZXIjcmVtb3ZlQ29tbWFuZCBDb250cm9sbGVyfVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbm90aWZpY2F0aW9uTmFtZVxyXG4gKiAgVGhlIG5hbWUgb2YgdGhlIHRoZSBOb3RpZmljYXRpb24gdG8gcmVtb3ZlIGZyb20gdGhlIGNvbW1hbmQgbWFwcGluZyBmb3IuXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5GYWNhZGUucHJvdG90eXBlLnJlbW92ZUNvbW1hbmQgPSBmdW5jdGlvbihub3RpZmljYXRpb25OYW1lKVxyXG57XHJcbiAgICB0aGlzLmNvbnRyb2xsZXIucmVtb3ZlQ29tbWFuZChub3RpZmljYXRpb25OYW1lKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDaGVjayBpZiBhIGNvbW1hbmQgaXMgcmVnaXN0ZXJlZCBmb3IgYSBnaXZlbiBub3RpZmljYXRpb24uXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBub3RpZmljYXRpb25OYW1lXHJcbiAqICBBIE5vdGlmaWNhdGlvbiBuYW1lXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAqICBXaGV0aGVyIGEgY29tbWFuIGlzIGN1cnJlbnRseSByZWdpc3RlcmVkIGZvciB0aGUgZ2l2ZW4gbm90aWZpY2F0aW9uTmFtZVxyXG4gKi9cclxuRmFjYWRlLnByb3RvdHlwZS5oYXNDb21tYW5kID0gZnVuY3Rpb24obm90aWZpY2F0aW9uTmFtZSlcclxue1xyXG4gICAgcmV0dXJuIHRoaXMuY29udHJvbGxlci5oYXNDb21tYW5kKG5vdGlmaWNhdGlvbk5hbWUpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlZ2lzdGVyIGEgUHJveHkgd2l0aCB0aGUge0BsaW5rIHB1cmVtdmMuTW9kZWwjcmVnaXN0ZXJQcm94eSBNb2RlbH1cclxuICogYnkgbmFtZS5cclxuICpcclxuICogQHBhcmFtIHtwdXJlbXZjLlByb3h5fSBwcm94eVxyXG4gKiAgVGhlIFByb3h5IGluc3RhbmNlIHRvIGJlIHJlZ2lzdGVyZWQgd2l0aCB0aGUgTW9kZWwuXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5GYWNhZGUucHJvdG90eXBlLnJlZ2lzdGVyUHJveHkgPSBmdW5jdGlvbihwcm94eSlcclxue1xyXG4gICAgdGhpcy5tb2RlbC5yZWdpc3RlclByb3h5KHByb3h5KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXRyaWV2ZSBhIFByb3h5IGZyb20gdGhlIE1vZGVsXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm94eU5hbWVcclxuICogQHJldHVybiB7cHVyZW12Yy5Qcm94eX1cclxuICovXHJcbkZhY2FkZS5wcm90b3R5cGUucmV0cmlldmVQcm94eSA9IGZ1bmN0aW9uKHByb3h5TmFtZSlcclxue1xyXG4gICAgcmV0dXJuIHRoaXMubW9kZWwucmV0cmlldmVQcm94eShwcm94eU5hbWUpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSBhIFByb3h5IGZyb20gdGhlIE1vZGVsIGJ5IG5hbWVcclxuICogQHBhcmFtIHtzdHJpbmd9IHByb3h5TmFtZVxyXG4gKiAgVGhlIG5hbWUgb2YgdGhlIFByb3h5XHJcbiAqIEByZXR1cm4ge3B1cmVtdmMuUHJveHl9XHJcbiAqICBUaGUgUHJveHkgdGhhdCB3YXMgcmVtb3ZlZCBmcm9tIHRoZSBNb2RlbFxyXG4gKi9cclxuRmFjYWRlLnByb3RvdHlwZS5yZW1vdmVQcm94eSA9IGZ1bmN0aW9uKHByb3h5TmFtZSlcclxue1xyXG4gICAgdmFyIHByb3h5ID0gbnVsbDtcclxuICAgIGlmKHRoaXMubW9kZWwgIT0gbnVsbClcclxuICAgIHtcclxuICAgICAgICBwcm94eSA9IHRoaXMubW9kZWwucmVtb3ZlUHJveHkocHJveHlOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcHJveHk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ2hlY2sgaXQgYSBQcm94eSBpcyByZWdpc3RlcmVkLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJveHlOYW1lXHJcbiAqICBBIFByb3h5IG5hbWVcclxuICogQHJldHVybiB7Ym9vbGVhbn1cclxuICogIFdoZXRoZXIgYSBQcm94eSBpcyBjdXJyZW50bHkgcmVnaXN0ZXJlZCB3aXRoIHRoZSBnaXZlbiBwcm94eU5hbWVcclxuICovXHJcbkZhY2FkZS5wcm90b3R5cGUuaGFzUHJveHkgPSBmdW5jdGlvbihwcm94eU5hbWUpXHJcbntcclxuICAgIHJldHVybiB0aGlzLm1vZGVsLmhhc1Byb3h5KHByb3h5TmFtZSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVnaXN0ZXIgYSBNZWRpYXRvciB3aXRoIHdpdGggdGhlIFZpZXcuXHJcbiAqXHJcbiAqIEBwYXJhbSB7cHVyZW12Yy5NZWRpYXRvcn0gbWVkaWF0b3JcclxuICogIEEgcmVmZXJlbmNlIHRvIHRoZSBNZWRpYXRvciB0byByZWdpc3RlclxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuRmFjYWRlLnByb3RvdHlwZS5yZWdpc3Rlck1lZGlhdG9yID0gZnVuY3Rpb24obWVkaWF0b3IpXHJcbntcclxuICAgIGlmKHRoaXMudmlldyAhPSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudmlldy5yZWdpc3Rlck1lZGlhdG9yKG1lZGlhdG9yKTtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXRyaWV2ZSBhIE1lZGlhdG9yIGZyb20gdGhlIFZpZXcgYnkgbmFtZVxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVkaWF0b3JOYW1lXHJcbiAqICBUaGUgTWVkaWF0b3JzIG5hbWVcclxuICogQHJldHVybiB7cHVyZW12Yy5NZWRpYXRvcn1cclxuICogIFRoZSByZXRyaWV2ZWQgTWVkaWF0b3JcclxuICovXHJcbkZhY2FkZS5wcm90b3R5cGUucmV0cmlldmVNZWRpYXRvciA9IGZ1bmN0aW9uKG1lZGlhdG9yTmFtZSlcclxue1xyXG4gICAgcmV0dXJuIHRoaXMudmlldy5yZXRyaWV2ZU1lZGlhdG9yKG1lZGlhdG9yTmFtZSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlIGEgTWVkaWF0b3IgZnJvbSB0aGUgVmlldy5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG1lZGlhdG9yTmFtZVxyXG4gKiAgVGhlIG5hbWUgb2YgdGhlIE1lZGlhdG9yIHRvIHJlbW92ZS5cclxuICogQHJldHVybiB7cHVyZW12Yy5NZWRpYXRvcn1cclxuICogIFRoZSByZW1vdmVkIE1lZGlhdG9yXHJcbiAqL1xyXG5GYWNhZGUucHJvdG90eXBlLnJlbW92ZU1lZGlhdG9yID0gZnVuY3Rpb24obWVkaWF0b3JOYW1lKVxyXG57XHJcbiAgICB2YXIgbWVkaWF0b3IgPSBudWxsO1xyXG4gICAgaWYodGhpcy52aWV3ICE9IG51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgbWVkaWF0b3IgPSB0aGlzLnZpZXcucmVtb3ZlTWVkaWF0b3IobWVkaWF0b3JOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbWVkaWF0b3I7XHJcbn07XHJcblxyXG4vKipcclxuICogQ2hlY2sgaWYgYSBNZWRpYXRvciBpcyByZWdpc3RlcmVkIG9yIG5vdC5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG1lZGlhdG9yTmFtZVxyXG4gKiAgQSBNZWRpYXRvciBuYW1lXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAqICBXaGV0aGVyIGEgTWVkaWF0b3IgaXMgcmVnaXN0ZXJlZCB3aXRoIHRoZSBnaXZlbiBtZWRpYXRvck5hbWVcclxuICovXHJcbkZhY2FkZS5wcm90b3R5cGUuaGFzTWVkaWF0b3IgPSBmdW5jdGlvbihtZWRpYXRvck5hbWUpXHJcbntcclxuICAgIHJldHVybiB0aGlzLnZpZXcuaGFzTWVkaWF0b3IobWVkaWF0b3JOYW1lKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYW5kIHNlbmQgYVxyXG4gKiB7QGxpbmsgcHVyZW12Yy5Ob3RpZmljYXRpb24gTm90aWZpY2F0aW9ufVxyXG4gKlxyXG4gKiBLZWVwcyB1cyBmcm9tIGhhdmluZyB0byBjb25zdHJ1Y3QgbmV3IE5vdGlmaWNhdGlvbiBpbnN0YW5jZXMgaW4gb3VyXHJcbiAqIGltcGxlbWVudGF0aW9uXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBub3RpZmljYXRpb25OYW1lXHJcbiAqICBUaGUgbmFtZSBvZiB0aGUgTm90aWZpY2F0aW9uIHRvIHNlbmRcclxuICogQHBhcmFtIHtPYmplY3R9IFtib2R5XVxyXG4gKiAgVGhlIGJvZHkgb2YgdGhlIG5vdGlmaWNhdGlvblxyXG4gKiBAcGFyYW0ge3N0cmluZ30gW3R5cGVdXHJcbiAqICBUaGUgdHlwZSBvZiB0aGUgbm90aWZpY2F0aW9uXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5GYWNhZGUucHJvdG90eXBlLnNlbmROb3RpZmljYXRpb24gPSBmdW5jdGlvbihub3RpZmljYXRpb25OYW1lLCBib2R5LCB0eXBlKVxyXG57XHJcbiAgICB0aGlzLm5vdGlmeU9ic2VydmVycyhuZXcgTm90aWZpY2F0aW9uKG5vdGlmaWNhdGlvbk5hbWUsIGJvZHksIHR5cGUpKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBOb3RpZnkge0BsaW5rIHB1cmVtdmMuT2JzZXJ2ZXIgT2JzZXJ2ZXJ9c1xyXG4gKlxyXG4gKiBUaGlzIG1ldGhvZCBpcyBsZWZ0IHB1YmxpYyBtb3N0bHkgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHksIGFuZCB0byBhbGxvd1xyXG4gKiB5b3UgdG8gc2VuZCBjdXN0b20gbm90aWZpY2F0aW9uIGNsYXNzZXMgdXNpbmcgdGhlIGZhY2FkZS5cclxuICpcclxuICogVXN1YWxseSB5b3Ugc2hvdWxkIGp1c3QgY2FsbCBzZW5kTm90aWZpY2F0aW9uIGFuZCBwYXNzIHRoZSBwYXJhbWV0ZXJzLCBuZXZlclxyXG4gKiBoYXZpbmcgdG8gY29uc3RydWN0IHRoZSBub3RpZmljYXRpb24geW91cnNlbGYuXHJcbiAqXHJcbiAqIEBwYXJhbSB7cHVyZW12Yy5Ob3RpZmljYXRpb259IG5vdGlmaWNhdGlvblxyXG4gKiAgVGhlIE5vdGlmaWNhdGlvbiB0byBzZW5kXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5GYWNhZGUucHJvdG90eXBlLm5vdGlmeU9ic2VydmVycyA9IGZ1bmN0aW9uKG5vdGlmaWNhdGlvbilcclxue1xyXG4gICAgaWYodGhpcy52aWV3ICE9IG51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy52aWV3Lm5vdGlmeU9ic2VydmVycyhub3RpZmljYXRpb24pO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemUgdGhlIEZhY2FkZXMgTm90aWZpZXIgY2FwYWJpbGl0aWVzIGJ5IHNldHRpbmcgdGhlIE11bHRpdG9uIGtleSBmb3JcclxuICogdGhpcyBmYWNhZGUgaW5zdGFuY2UuXHJcbiAqXHJcbiAqIE5vdCBjYWxsZWQgZGlyZWN0bHksIGJ1dCBpbnN0ZWFkIGZyb20gdGhlIGNvbnN0cnVjdG9yIHdoZW4gI2dldEluc3RhbmNlIGlzXHJcbiAqIGludm9rZWQuIEl0IGlzIG5lY2Vzc2FyeSB0byBiZSBwdWJsaWMgaW4gb3JkZXIgdG8gaW1wbGVtZW50IE5vdGlmaWVyXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbkZhY2FkZS5wcm90b3R5cGUuaW5pdGlhbGl6ZU5vdGlmaWVyID0gZnVuY3Rpb24oa2V5KVxyXG57XHJcbiAgICB0aGlzLm11bHRpdG9uS2V5ID0ga2V5O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIGEgKkNvcmUqIGlzIHJlZ2lzdGVyZWQgb3Igbm90XHJcbiAqXHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtzdHJpbmd9IGtleVxyXG4gKiAgVGhlIG11bHRpdG9uIGtleSBmb3IgdGhlICpDb3JlKiBpbiBxdWVzdGlvblxyXG4gKiBAcmV0dXJuIHtib29sZWFufVxyXG4gKiAgV2hldGhlciBhICpDb3JlKiBpcyByZWdpc3RlcmVkIHdpdGggdGhlIGdpdmVuIGtleVxyXG4gKi9cclxuRmFjYWRlLmhhc0NvcmUgPSBmdW5jdGlvbihrZXkpXHJcbntcclxuICAgIHJldHVybiBGYWNhZGUuaW5zdGFuY2VNYXBba2V5XSAhPSBudWxsO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSBhICpDb3JlKlxyXG4gKlxyXG4gKiBSZW1vdmUgdGhlIE1vZGVsLCBWaWV3LCBDb250cm9sbGVyIGFuZCBGYWNhZGUgZm9yIGEgZ2l2ZW4ga2V5LlxyXG4gKlxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbkZhY2FkZS5yZW1vdmVDb3JlID0gZnVuY3Rpb24oa2V5KVxyXG57XHJcbiAgICBpZihGYWNhZGUuaW5zdGFuY2VNYXBba2V5XSA9PSBudWxsKVxyXG4gICAgICAgIHJldHVybjtcclxuXHJcbiAgICBNb2RlbC5yZW1vdmVNb2RlbChrZXkpO1xyXG4gICAgVmlldy5yZW1vdmVWaWV3KGtleSk7XHJcbiAgICBDb250cm9sbGVyLnJlbW92ZUNvbnRyb2xsZXIoa2V5KTtcclxuICAgIGRlbGV0ZSBGYWNhZGUuaW5zdGFuY2VNYXBba2V5XTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqIFRoZSBGYWNhZGVzIGNvcnJlc3BvbmRpbmcgQ29udHJvbGxlclxyXG4gKlxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEB0eXBlIHB1cmVtdmMuQ29udHJvbGxlclxyXG4gKi9cclxuRmFjYWRlLnByb3RvdHlwZS5jb250cm9sbGVyID0gbnVsbDtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqIFRoZSBGYWNhZGVzIGNvcnJlc3BvbmRpbmcgTW9kZWwgaW5zdGFuY2VcclxuICpcclxuICogQHByb3RlY3RlZFxyXG4gKiBAdHlwZSBwdXJlbXZjLk1vZGVsXHJcbiAqL1xyXG5GYWNhZGUucHJvdG90eXBlLm1vZGVsID0gbnVsbDtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqIFRoZSBGYWNhZGVzIGNvcnJlc3BuZGluZyBWaWV3IGluc3RhbmNlLlxyXG4gKlxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEB0eXBlIHB1cmVtdmMuVmlld1xyXG4gKi9cclxuRmFjYWRlLnByb3RvdHlwZS52aWV3ID0gbnVsbDtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqIFRoZSBGYWNhZGVzIG11bHRpdG9uIGtleS5cclxuICpcclxuICogQHByb3RlY3RlZFxyXG4gKiBAdHlwZSBzdHJpbmdcclxuICovXHJcbkZhY2FkZS5wcm90b3R5cGUubXVsdGl0b25LZXkgPSBudWxsO1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICogVGhlIE11bHRpdG9uIEZhY2FkZSBpbnN0YW5jZSBtYXAuXHJcbiAqIEBzdGF0aWNcclxuICogQHByb3RlY3RlZFxyXG4gKiBAdHlwZSBBcnJheVxyXG4gKi9cclxuRmFjYWRlLmluc3RhbmNlTWFwID0gW107XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKiBNZXNzYWdlIENvbnN0YW50c1xyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEB0eXBlIHtzdHJpbmd9XHJcbiAqIEBjb25zdFxyXG4gKiBAc3RhdGljXHJcbiAqL1xyXG5GYWNhZGUuTVVMVElUT05fTVNHID0gXCJGYWNhZGUgaW5zdGFuY2UgZm9yIHRoaXMgTXVsdGl0b24ga2V5IGFscmVhZHkgY29uc3RydWN0ZWQhXCI7XHJcbi8qKlxyXG4gKiBAYXV0aG9yIFB1cmVNVkMgSlMgTmF0aXZlIFBvcnQgYnkgRGF2aWQgRm9sZXksIEZyw6lkw6lyaWMgU2F1bmllciwgJiBBbGFpbiBEdWNoZXNuZWF1XHJcbiAqIEBhdXRob3IgQ29weXJpZ2h0KGMpIDIwMDYtMjAxMiBGdXR1cmVzY2FsZSwgSW5jLiwgU29tZSByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIEBjbGFzcyBwdXJlbXZjLlZpZXdcclxuICpcclxuICogQSBNdWx0aXRvbiBWaWV3IGltcGxlbWVudGF0aW9uLlxyXG4gKlxyXG4gKiBJbiBQdXJlTVZDLCB0aGUgVmlldyBjbGFzcyBhc3N1bWVzIHRoZXNlIHJlc3BvbnNpYmlsaXRpZXNcclxuICpcclxuICogLSBNYWludGFpbiBhIGNhY2hlIG9mIHtAbGluayBwdXJlbXZjLk1lZGlhdG9yIE1lZGlhdG9yfVxyXG4gKiAgIGluc3RhbmNlcy5cclxuICpcclxuICogLSBQcm92aWRlIG1ldGhvZHMgZm9yIHJlZ2lzdGVyaW5nLCByZXRyaWV2aW5nLCBhbmQgcmVtb3ZpbmdcclxuICogICB7QGxpbmsgcHVyZW12Yy5NZWRpYXRvciBNZWRpYXRvcn0uXHJcbiAqXHJcbiAqIC0gTm90aWZpeWluZyB7QGxpbmsgcHVyZW12Yy5NZWRpYXRvciBNZWRpYXRvcn0gd2hlbiB0aGV5IGFyZSByZWdpc3RlcmVkIG9yXHJcbiAqICAgcmVtb3ZlZC5cclxuICpcclxuICogLSBNYW5hZ2luZyB0aGUgb2JzZXJ2ZXIgbGlzdHMgZm9yIGVhY2gge0BsaW5rIHB1cmVtdmMuTm90aWZpY2F0aW9uIE5vdGlmaWNhdGlvbn1cclxuICogICBpbiB0aGUgYXBwbGljYXRpb24uXHJcbiAqXHJcbiAqIC0gUHJvdmlkaW5nIGEgbWV0aG9kIGZvciBhdHRhY2hpbmcge0BsaW5rIHB1cmVtdmMuT2JzZXJ2ZXIgT2JzZXJ2ZXJ9IHRvIGFuXHJcbiAqICAge0BsaW5rIHB1cmVtdmMuTm90aWZpY2F0aW9uIE5vdGlmaWNhdGlvbn0ncyBvYnNlcnZlciBsaXN0LlxyXG4gKlxyXG4gKiAtIFByb3ZpZGluZyBhIG1ldGhvZCBmb3IgYnJvYWRjYXN0aW5nIGEge0BsaW5rIHB1cmVtdmMuTm90aWZpY2F0aW9uIE5vdGlmaWNhdGlvbn0uXHJcbiAqXHJcbiAqIC0gTm90aWZ5aW5nIHRoZSB7QGxpbmsgcHVyZW12Yy5PYnNlcnZlciBPYnNlcnZlcn1zIG9mIGEgZ2l2ZW5cclxuICogICB7QGxpbmsgcHVyZW12Yy5Ob3RpZmljYXRpb24gTm90aWZpY2F0aW9ufSB3aGVuIGl0IGJyb2FkY2FzdC5cclxuICpcclxuICogVGhpcyBWaWV3IGltcGxlbWVudGF0aW9uIGlzIGEgTXVsdGl0b24sIHNvIHlvdSBzaG91bGQgbm90IGNhbGwgdGhlXHJcbiAqIGNvbnN0cnVjdG9yIGRpcmVjdGx5LCBidXQgaW5zdGVhZCBjYWxsIHRoZSBzdGF0aWMgTXVsdGl0b25cclxuICogRmFjdG9yeSAjZ2V0SW5zdGFuY2UgbWV0aG9kLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5XHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKiBAdGhyb3dzIHtFcnJvcn1cclxuICogIGlmIGluc3RhbmNlIGZvciB0aGlzIE11bHRpdG9uIGtleSBoYXMgYWxyZWFkeSBiZWVuIGNvbnN0cnVjdGVkXHJcbiAqL1xyXG5mdW5jdGlvbiBWaWV3KGtleSlcclxue1xyXG4gICAgaWYoVmlldy5pbnN0YW5jZU1hcFtrZXldICE9IG51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFZpZXcuTVVMVElUT05fTVNHKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5tdWx0aXRvbktleSA9IGtleTtcclxuICAgIFZpZXcuaW5zdGFuY2VNYXBbdGhpcy5tdWx0aXRvbktleV0gPSB0aGlzO1xyXG4gICAgdGhpcy5tZWRpYXRvck1hcCA9IFtdO1xyXG4gICAgdGhpcy5vYnNlcnZlck1hcCA9IFtdO1xyXG4gICAgdGhpcy5pbml0aWFsaXplVmlldygpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogSW5pdGlhbGl6ZSB0aGUgU2luZ2xldG9uIFZpZXcgaW5zdGFuY2VcclxuICpcclxuICogQ2FsbGVkIGF1dG9tYXRpY2FsbHkgYnkgdGhlIGNvbnN0cnVjdG9yLCB0aGlzIGlzIHlvdXIgb3Bwb3J0dW5pdHkgdG9cclxuICogaW5pdGlhbGl6ZSB0aGUgU2luZ2xldG9uIGluc3RhbmNlIGluIHlvdXIgc3ViY2xhc3Mgd2l0aG91dCBvdmVycmlkaW5nIHRoZVxyXG4gKiBjb25zdHJ1Y3RvclxyXG4gKlxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuVmlldy5wcm90b3R5cGUuaW5pdGlhbGl6ZVZpZXcgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHJldHVybjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBWaWV3IFNpbmdsZXRvbiBGYWN0b3J5IG1ldGhvZC5cclxuICogTm90ZSB0aGF0IHRoaXMgbWV0aG9kIHdpbGwgcmV0dXJuIG51bGwgaWYgc3VwcGxpZWQgYSBudWxsXHJcbiAqIG9yIHVuZGVmaW5lZCBtdWx0aXRvbiBrZXkuXHJcbiAqXHJcbiAqIEByZXR1cm4ge3B1cmVtdmMuVmlld31cclxuICogIFRoZSBTaW5nbGV0b24gaW5zdGFuY2Ugb2YgVmlld1xyXG4gKi9cclxuVmlldy5nZXRJbnN0YW5jZSA9IGZ1bmN0aW9uKGtleSlcclxue1xyXG4gICAgaWYgKG51bGwgPT0ga2V5KVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG5cclxuICAgIGlmKFZpZXcuaW5zdGFuY2VNYXBba2V5XSA9PSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIFZpZXcuaW5zdGFuY2VNYXBba2V5XSA9IG5ldyBWaWV3KGtleSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBWaWV3Lmluc3RhbmNlTWFwW2tleV07XHJcbn07XHJcblxyXG4vKipcclxuICogUmVnaXN0ZXIgYW4gT2JzZXJ2ZXIgdG8gYmUgbm90aWZpZWQgb2YgTm90aWZpY2F0aW9ucyB3aXRoIGEgZ2l2ZW4gbmFtZVxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbm90aWZpY2F0aW9uTmFtZVxyXG4gKiAgVGhlIG5hbWUgb2YgdGhlIE5vdGlmaWNhdGlvbnMgdG8gbm90aWZ5IHRoaXMgT2JzZXJ2ZXIgb2ZcclxuICogQHBhcmFtIHtwdXJlbXZjLk9ic2VydmVyfSBvYnNlcnZlclxyXG4gKiAgVGhlIE9ic2VydmVyIHRvIHJlZ2lzdGVyLlxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuVmlldy5wcm90b3R5cGUucmVnaXN0ZXJPYnNlcnZlciA9IGZ1bmN0aW9uKG5vdGlmaWNhdGlvbk5hbWUsIG9ic2VydmVyKVxyXG57XHJcbiAgICBpZih0aGlzLm9ic2VydmVyTWFwW25vdGlmaWNhdGlvbk5hbWVdICE9IG51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5vYnNlcnZlck1hcFtub3RpZmljYXRpb25OYW1lXS5wdXNoKG9ic2VydmVyKTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICB0aGlzLm9ic2VydmVyTWFwW25vdGlmaWNhdGlvbk5hbWVdID0gW29ic2VydmVyXTtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBOb3RpZnkgdGhlIE9ic2VydmVyc2ZvciBhIHBhcnRpY3VsYXIgTm90aWZpY2F0aW9uLlxyXG4gKlxyXG4gKiBBbGwgcHJldmlvdXNseSBhdHRhY2hlZCBPYnNlcnZlcnMgZm9yIHRoaXMgTm90aWZpY2F0aW9uJ3NcclxuICogbGlzdCBhcmUgbm90aWZpZWQgYW5kIGFyZSBwYXNzZWQgYSByZWZlcmVuY2UgdG8gdGhlIElOb3RpZmljYXRpb24gaW5cclxuICogdGhlIG9yZGVyIGluIHdoaWNoIHRoZXkgd2VyZSByZWdpc3RlcmVkLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3B1cmVtdmMuTm90aWZpY2F0aW9ufSBub3RpZmljYXRpb25cclxuICogIFRoZSBOb3RpZmljYXRpb24gdG8gbm90aWZ5IE9ic2VydmVycyBvZlxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuVmlldy5wcm90b3R5cGUubm90aWZ5T2JzZXJ2ZXJzID0gZnVuY3Rpb24obm90aWZpY2F0aW9uKVxyXG57XHJcbiAgICAvLyBTSUNcclxuICAgIGlmKHRoaXMub2JzZXJ2ZXJNYXBbbm90aWZpY2F0aW9uLmdldE5hbWUoKV0gIT0gbnVsbClcclxuICAgIHtcclxuICAgICAgICB2YXIgb2JzZXJ2ZXJzX3JlZiA9IHRoaXMub2JzZXJ2ZXJNYXBbbm90aWZpY2F0aW9uLmdldE5hbWUoKV0sIG9ic2VydmVycyA9IFtdLCBvYnNlcnZlclxyXG5cclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgb2JzZXJ2ZXJzX3JlZi5sZW5ndGg7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG9ic2VydmVyID0gb2JzZXJ2ZXJzX3JlZltpXTtcclxuICAgICAgICAgICAgb2JzZXJ2ZXJzLnB1c2gob2JzZXJ2ZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IG9ic2VydmVycy5sZW5ndGg7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG9ic2VydmVyID0gb2JzZXJ2ZXJzW2ldO1xyXG4gICAgICAgICAgICBvYnNlcnZlci5ub3RpZnlPYnNlcnZlcihub3RpZmljYXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmUgdGhlIE9ic2VydmVyIGZvciBhIGdpdmVuIG5vdGlmeUNvbnRleHQgZnJvbSBhbiBvYnNlcnZlciBsaXN0IGZvclxyXG4gKiBhIGdpdmVuIE5vdGlmaWNhdGlvbiBuYW1lXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBub3RpZmljYXRpb25OYW1lXHJcbiAqICBXaGljaCBvYnNlcnZlciBsaXN0IHRvIHJlbW92ZSBmcm9tXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBub3RpZnlDb250ZXh0XHJcbiAqICBSZW1vdmUgdGhlIE9ic2VydmVyIHdpdGggdGhpcyBvYmplY3QgYXMgaXRzIG5vdGlmeUNvbnRleHRcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcblZpZXcucHJvdG90eXBlLnJlbW92ZU9ic2VydmVyID0gZnVuY3Rpb24obm90aWZpY2F0aW9uTmFtZSwgbm90aWZ5Q29udGV4dClcclxue1xyXG4gICAgLy8gU0lDXHJcbiAgICB2YXIgb2JzZXJ2ZXJzID0gdGhpcy5vYnNlcnZlck1hcFtub3RpZmljYXRpb25OYW1lXTtcclxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBvYnNlcnZlcnMubGVuZ3RoOyBpKyspXHJcbiAgICB7XHJcbiAgICAgICAgaWYob2JzZXJ2ZXJzW2ldLmNvbXBhcmVOb3RpZnlDb250ZXh0KG5vdGlmeUNvbnRleHQpID09IHRydWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBvYnNlcnZlcnMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYob2JzZXJ2ZXJzLmxlbmd0aCA9PSAwKVxyXG4gICAge1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLm9ic2VydmVyTWFwW25vdGlmaWNhdGlvbk5hbWVdO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlZ2lzdGVyIGEgTWVkaWF0b3IgaW5zdGFuY2Ugd2l0aCB0aGUgVmlldy5cclxuICpcclxuICogUmVnaXN0ZXJzIHRoZSBNZWRpYXRvciBzbyB0aGF0IGl0IGNhbiBiZSByZXRyaWV2ZWQgYnkgbmFtZSxcclxuICogYW5kIGZ1cnRoZXIgaW50ZXJyb2dhdGVzIHRoZSBNZWRpYXRvciBmb3IgaXRzXHJcbiAqIHtAbGluayBwdXJlbXZjLk1lZGlhdG9yI2xpc3ROb3RpZmljYXRpb25JbnRlcmVzdHMgaW50ZXJlc3RzfS5cclxuICpcclxuICogSWYgdGhlIE1lZGlhdG9yIHJldHVybnMgYW55IE5vdGlmaWNhdGlvblxyXG4gKiBuYW1lcyB0byBiZSBub3RpZmllZCBhYm91dCwgYW4gT2JzZXJ2ZXIgaXMgY3JlYXRlZCBlbmNhcHN1bGF0aW5nXHJcbiAqIHRoZSBNZWRpYXRvciBpbnN0YW5jZSdzXHJcbiAqIHtAbGluayBwdXJlbXZjLk1lZGlhdG9yI2hhbmRsZU5vdGlmaWNhdGlvbiBoYW5kbGVOb3RpZmljYXRpb259XHJcbiAqIG1ldGhvZCBhbmQgcmVnaXN0ZXJpbmcgaXQgYXMgYW4gT2JzZXJ2ZXIgZm9yIGFsbCBOb3RpZmljYXRpb25zIHRoZVxyXG4gKiBNZWRpYXRvciBpcyBpbnRlcmVzdGVkIGluLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3B1cmVtdmMuTWVkaWF0b3J9XHJcbiAqICBhIHJlZmVyZW5jZSB0byB0aGUgTWVkaWF0b3IgaW5zdGFuY2VcclxuICovXHJcblZpZXcucHJvdG90eXBlLnJlZ2lzdGVyTWVkaWF0b3IgPSBmdW5jdGlvbihtZWRpYXRvcilcclxue1xyXG4gICAgaWYodGhpcy5tZWRpYXRvck1hcFttZWRpYXRvci5nZXRNZWRpYXRvck5hbWUoKV0gIT0gbnVsbClcclxuICAgIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbWVkaWF0b3IuaW5pdGlhbGl6ZU5vdGlmaWVyKHRoaXMubXVsdGl0b25LZXkpO1xyXG4gICAgLy8gcmVnaXN0ZXIgdGhlIG1lZGlhdG9yIGZvciByZXRyaWV2YWwgYnkgbmFtZVxyXG4gICAgdGhpcy5tZWRpYXRvck1hcFttZWRpYXRvci5nZXRNZWRpYXRvck5hbWUoKV0gPSBtZWRpYXRvcjtcclxuXHJcbiAgICAvLyBnZXQgbm90aWZpY2F0aW9uIGludGVyZXN0cyBpZiBhbnlcclxuICAgIHZhciBpbnRlcmVzdHMgPSBtZWRpYXRvci5saXN0Tm90aWZpY2F0aW9uSW50ZXJlc3RzKCk7XHJcblxyXG4gICAgLy8gcmVnaXN0ZXIgbWVkaWF0b3IgYXMgYW4gb2JzZXJ2ZXIgZm9yIGVhY2ggbm90aWZpY2F0aW9uXHJcbiAgICBpZihpbnRlcmVzdHMubGVuZ3RoID4gMClcclxuICAgIHtcclxuICAgICAgICAvLyBjcmVhdGUgb2JzZXJ2ZXIgcmVmZXJlbmNpbmcgdGhpcyBtZWRpYXRvcnMgaGFuZGxlTm90aWZpY2F0aW9uIG1ldGhvZFxyXG4gICAgICAgIHZhciBvYnNlcnZlciA9IG5ldyBPYnNlcnZlcihtZWRpYXRvci5oYW5kbGVOb3RpZmljYXRpb24sIG1lZGlhdG9yKTtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgaW50ZXJlc3RzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3Rlck9ic2VydmVyKGludGVyZXN0c1tpXSwgb2JzZXJ2ZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtZWRpYXRvci5vblJlZ2lzdGVyKCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXRyaWV2ZSBhIE1lZGlhdG9yIGZyb20gdGhlIFZpZXdcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG1lZGlhdG9yTmFtZVxyXG4gKiAgVGhlIG5hbWUgb2YgdGhlIE1lZGlhdG9yIGluc3RhbmNlIHRvIHJldHJpZXZlXHJcbiAqIEByZXR1cm4ge3B1cmVtdmMuTWVkaWF0b3J9XHJcbiAqICBUaGUgTWVkaWF0b3IgaW5zdGFuY2UgcHJldmlvdXNseSByZWdpc3RlcmVkIHdpdGggdGhlIGdpdmVuIG1lZGlhdG9yTmFtZVxyXG4gKi9cclxuVmlldy5wcm90b3R5cGUucmV0cmlldmVNZWRpYXRvciA9IGZ1bmN0aW9uKG1lZGlhdG9yTmFtZSlcclxue1xyXG4gICAgcmV0dXJuIHRoaXMubWVkaWF0b3JNYXBbbWVkaWF0b3JOYW1lXTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmUgYSBNZWRpYXRvciBmcm9tIHRoZSBWaWV3LlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVkaWF0b3JOYW1lXHJcbiAqICBOYW1lIG9mIHRoZSBNZWRpYXRvciBpbnN0YW5jZSB0byBiZSByZW1vdmVkXHJcbiAqIEByZXR1cm4ge3B1cmVtdmMuTWVkaWF0b3J9XHJcbiAqICBUaGUgTWVkaWF0b3IgdGhhdCB3YXMgcmVtb3ZlZCBmcm9tIHRoZSBWaWV3XHJcbiAqL1xyXG5WaWV3LnByb3RvdHlwZS5yZW1vdmVNZWRpYXRvciA9IGZ1bmN0aW9uKG1lZGlhdG9yTmFtZSlcclxue1xyXG4gICAgdmFyIG1lZGlhdG9yID0gdGhpcy5tZWRpYXRvck1hcFttZWRpYXRvck5hbWVdO1xyXG4gICAgaWYobWVkaWF0b3IpXHJcbiAgICB7XHJcbiAgICAgICAgLy8gZm9yIGV2ZXJ5IG5vdGlmaWNhdGlvbiB0aGUgbWVkaWF0b3IgaXMgaW50ZXJlc3RlZCBpbi4uLlxyXG4gICAgICAgIHZhciBpbnRlcmVzdHMgPSBtZWRpYXRvci5saXN0Tm90aWZpY2F0aW9uSW50ZXJlc3RzKCk7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGludGVyZXN0cy5sZW5ndGg7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIHJlbW92ZSB0aGUgb2JzZXJ2ZXIgbGlua2luZyB0aGUgbWVkaWF0b3IgdG8gdGhlIG5vdGlmaWNhdGlvblxyXG4gICAgICAgICAgICAvLyBpbnRlcmVzdFxyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZU9ic2VydmVyKGludGVyZXN0c1tpXSwgbWVkaWF0b3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gcmVtb3ZlIHRoZSBtZWRpYXRvciBmcm9tIHRoZSBtYXBcclxuICAgICAgICBkZWxldGUgdGhpcy5tZWRpYXRvck1hcFttZWRpYXRvck5hbWVdO1xyXG5cclxuICAgICAgICAvLyBhbGVydCB0aGUgbWVkaWF0b3IgdGhhdCBpdCBoYXMgYmVlbiByZW1vdmVkXHJcbiAgICAgICAgbWVkaWF0b3Iub25SZW1vdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbWVkaWF0b3I7XHJcbn07XHJcblxyXG4vKipcclxuICogQ2hlY2sgaWYgYSBNZWRpYXRvciBpcyByZWdpc3RlcmVkIG9yIG5vdC5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG1lZGlhdG9yTmFtZVxyXG4gKiBAcmV0dXJuIHtib29sZWFufVxyXG4gKiAgV2hldGhlciBhIE1lZGlhdG9yIGlzIHJlZ2lzdGVyZWQgd2l0aCB0aGUgZ2l2ZW4gbWVkaWF0b3JuYW1lXHJcbiAqL1xyXG5WaWV3LnByb3RvdHlwZS5oYXNNZWRpYXRvciA9IGZ1bmN0aW9uKG1lZGlhdG9yTmFtZSlcclxue1xyXG4gICAgcmV0dXJuIHRoaXMubWVkaWF0b3JNYXBbbWVkaWF0b3JOYW1lXSAhPSBudWxsO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSBhIFZpZXcgaW5zdGFuY2VcclxuICpcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcblZpZXcucmVtb3ZlVmlldyA9IGZ1bmN0aW9uKGtleSlcclxue1xyXG4gICAgZGVsZXRlIFZpZXcuaW5zdGFuY2VNYXBba2V5XTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqIFRoZSBWaWV3cyBpbnRlcm5hbCBtYXBwaW5nIG9mIG1lZGlhdG9yIG5hbWVzIHRvIG1lZGlhdG9yIGluc3RhbmNlc1xyXG4gKlxyXG4gKiBAdHlwZSBBcnJheVxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqL1xyXG5WaWV3LnByb3RvdHlwZS5tZWRpYXRvck1hcCA9IG51bGw7XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKiBUaGUgVmlld3MgaW50ZXJuYWwgbWFwcGluZyBvZiBOb3RpZmljYXRpb24gbmFtZXMgdG8gT2JzZXJ2ZXIgbGlzdHNcclxuICpcclxuICogQHR5cGUgQXJyYXlcclxuICogQHByb3RlY3RlZFxyXG4gKi9cclxuVmlldy5wcm90b3R5cGUub2JzZXJ2ZXJNYXAgPSBudWxsO1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICogVGhlIGludGVybmFsIG1hcCB1c2VkIHRvIHN0b3JlIG11bHRpdG9uIFZpZXcgaW5zdGFuY2VzXHJcbiAqXHJcbiAqIEB0eXBlIEFycmF5XHJcbiAqIEBwcm90ZWN0ZWRcclxuICovXHJcblZpZXcuaW5zdGFuY2VNYXAgPSBbXTtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqIFRoZSBWaWV3cyBpbnRlcm5hbCBtdWx0aXRvbiBrZXkuXHJcbiAqXHJcbiAqIEB0eXBlIHN0cmluZ1xyXG4gKiBAcHJvdGVjdGVkXHJcbiAqL1xyXG5WaWV3LnByb3RvdHlwZS5tdWx0aXRvbktleSA9IG51bGw7XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKiBUaGUgZXJyb3IgbWVzc2FnZSB1c2VkIGlmIGFuIGF0dGVtcHQgaXMgbWFkZSB0byBpbnN0YW50aWF0ZSBWaWV3IGRpcmVjdGx5XHJcbiAqXHJcbiAqIEB0eXBlIHN0cmluZ1xyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEBjb25zdFxyXG4gKiBAc3RhdGljXHJcbiAqL1xyXG5WaWV3Lk1VTFRJVE9OX01TRyA9IFwiVmlldyBpbnN0YW5jZSBmb3IgdGhpcyBNdWx0aXRvbiBrZXkgYWxyZWFkeSBjb25zdHJ1Y3RlZCFcIjtcclxuLyoqXHJcbiAqIEBhdXRob3IgUHVyZU1WQyBKUyBOYXRpdmUgUG9ydCBieSBEYXZpZCBGb2xleSwgRnLDqWTDqXJpYyBTYXVuaWVyLCAmIEFsYWluIER1Y2hlc25lYXVcclxuICogQGF1dGhvciBDb3B5cmlnaHQoYykgMjAwNi0yMDEyIEZ1dHVyZXNjYWxlLCBJbmMuLCBTb21lIHJpZ2h0cyByZXNlcnZlZC5cclxuICpcclxuICogQGNsYXNzIHB1cmVtdmMuTW9kZWxcclxuICpcclxuICogQSBNdWx0aXRvbiBNb2RlbCBpbXBsZW1lbnRhdGlvbi5cclxuICpcclxuICogSW4gUHVyZU1WQywgdGhlIE1vZGVsIGNsYXNzIHByb3ZpZGVzXHJcbiAqIGFjY2VzcyB0byBtb2RlbCBvYmplY3RzIChQcm94aWVzKSBieSBuYW1lZCBsb29rdXAuXHJcbiAqXHJcbiAqIFRoZSBNb2RlbCBhc3N1bWVzIHRoZXNlIHJlc3BvbnNpYmlsaXRpZXM6XHJcbiAqXHJcbiAqIC0gTWFpbnRhaW4gYSBjYWNoZSBvZiB7QGxpbmsgcHVyZW12Yy5Qcm94eSBQcm94eX1cclxuICogICBpbnN0YW5jZXMuXHJcbiAqIC0gUHJvdmlkZSBtZXRob2RzIGZvciByZWdpc3RlcmluZywgcmV0cmlldmluZywgYW5kIHJlbW92aW5nXHJcbiAqICAge0BsaW5rIHB1cmVtdmMuUHJveHkgUHJveHl9IGluc3RhbmNlcy5cclxuICpcclxuICogWW91ciBhcHBsaWNhdGlvbiBtdXN0IHJlZ2lzdGVyXHJcbiAqIHtAbGluayBwdXJlbXZjLlByb3h5IFByb3h5fSBpbnN0YW5jZXMgd2l0aCB0aGUgTW9kZWwuXHJcbiAqIFR5cGljYWxseSwgeW91IHVzZSBhXHJcbiAqIHtAbGluayBwdXJlbXZjLlNpbXBsZUNvbW1hbmQgU2ltcGxlQ29tbWFuZH1cclxuICogb3JcclxuICoge0BsaW5rIHB1cmVtdmMuTWFjcm9Db21tYW5kIE1hY3JvQ29tbWFuZH1cclxuICogdG8gY3JlYXRlIGFuZCByZWdpc3RlciBQcm94eSBpbnN0YW5jZXMgb25jZSB0aGUgRmFjYWRlIGhhcyBpbml0aWFsaXplZCB0aGVcclxuICogKkNvcmUqIGFjdG9ycy5cclxuICpcclxuICogVGhpcyBNb2RlbCBpbXBsZW1lbnRhdGlvbiBpcyBhIE11bHRpdG9uLCBzbyB5b3Ugc2hvdWxkIG5vdCBjYWxsIHRoZVxyXG4gKiBjb25zdHJ1Y3RvciBkaXJlY3RseSwgYnV0IGluc3RlYWQgY2FsbCB0aGVcclxuICoge0BsaW5rICNnZXRJbnN0YW5jZSBzdGF0aWMgTXVsdGl0b24gRmFjdG9yeSBtZXRob2R9XHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5XHJcbiAqICBUaGUgTW9kZWxzIG11bHRpdG9uIGtleVxyXG4gKiBAdGhyb3dzIHtFcnJvcn1cclxuICogIEFuIGVycm9yIGlzIHRocm93biBpZiB0aGlzIG11bHRpdG9ucyBrZXkgaXMgYWxyZWFkeSBpbiB1c2UgYnkgYW5vdGhlciBpbnN0YW5jZVxyXG4gKi9cclxuZnVuY3Rpb24gTW9kZWwoa2V5KVxyXG57XHJcbiAgICBpZihNb2RlbC5pbnN0YW5jZU1hcFtrZXldKVxyXG4gICAge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihNb2RlbC5NVUxUSVRPTl9NU0cpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubXVsdGl0b25LZXk9IGtleTtcclxuICAgIE1vZGVsLmluc3RhbmNlTWFwW2tleV09IHRoaXM7XHJcbiAgICB0aGlzLnByb3h5TWFwPSBbXTtcclxuICAgIHRoaXMuaW5pdGlhbGl6ZU1vZGVsKCk7XHJcbn07XHJcblxyXG4vKipcclxuICogSW5pdGlhbGl6ZSB0aGUgTW9kZWwgaW5zdGFuY2UuXHJcbiAqXHJcbiAqIENhbGxlZCBhdXRvbWF0aWNhbGx5IGJ5IHRoZSBjb25zdHJ1Y3RvciwgdGhpc1xyXG4gKiBpcyB5b3VyIG9wcG9ydHVuaXR5IHRvIGluaXRpYWxpemUgdGhlIFNpbmdsZXRvblxyXG4gKiBpbnN0YW5jZSBpbiB5b3VyIHN1YmNsYXNzIHdpdGhvdXQgb3ZlcnJpZGluZyB0aGVcclxuICogY29uc3RydWN0b3IuXHJcbiAqXHJcbiAqIEByZXR1cm4gdm9pZFxyXG4gKi9cclxuTW9kZWwucHJvdG90eXBlLmluaXRpYWxpemVNb2RlbD0gZnVuY3Rpb24oKXt9O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBNb2RlbCBNdWx0aXRvbiBGYWN0b3J5IG1ldGhvZC5cclxuICogTm90ZSB0aGF0IHRoaXMgbWV0aG9kIHdpbGwgcmV0dXJuIG51bGwgaWYgc3VwcGxpZWQgYSBudWxsXHJcbiAqIG9yIHVuZGVmaW5lZCBtdWx0aXRvbiBrZXkuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcclxuICogIFRoZSBtdWx0aXRvbiBrZXkgZm9yIHRoZSBNb2RlbCB0byByZXRyaWV2ZVxyXG4gKiBAcmV0dXJuIHtwdXJlbXZjLk1vZGVsfVxyXG4gKiAgdGhlIGluc3RhbmNlIGZvciB0aGlzIE11bHRpdG9uIGtleVxyXG4gKi9cclxuTW9kZWwuZ2V0SW5zdGFuY2U9IGZ1bmN0aW9uKGtleSlcclxue1xyXG4gICAgaWYgKG51bGwgPT0ga2V5KVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG5cclxuICAgIGlmKE1vZGVsLmluc3RhbmNlTWFwW2tleV0gPT0gbnVsbClcclxuICAgIHtcclxuICAgICAgICBNb2RlbC5pbnN0YW5jZU1hcFtrZXldPSBuZXcgTW9kZWwoa2V5KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gTW9kZWwuaW5zdGFuY2VNYXBba2V5XTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZWdpc3RlciBhIFByb3h5IHdpdGggdGhlIE1vZGVsXHJcbiAqIEBwYXJhbSB7cHVyZW12Yy5Qcm94eX1cclxuICovXHJcbk1vZGVsLnByb3RvdHlwZS5yZWdpc3RlclByb3h5PSBmdW5jdGlvbihwcm94eSlcclxue1xyXG4gICAgcHJveHkuaW5pdGlhbGl6ZU5vdGlmaWVyKHRoaXMubXVsdGl0b25LZXkpO1xyXG4gICAgdGhpcy5wcm94eU1hcFtwcm94eS5nZXRQcm94eU5hbWUoKV09IHByb3h5O1xyXG4gICAgcHJveHkub25SZWdpc3RlcigpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHJpZXZlIGEgUHJveHkgZnJvbSB0aGUgTW9kZWxcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHByb3h5TmFtZVxyXG4gKiBAcmV0dXJuIHtwdXJlbXZjLlByb3h5fVxyXG4gKiAgVGhlIFByb3h5IGluc3RhbmNlIHByZXZpb3VzbHkgcmVnaXN0ZXJlZCB3aXRoIHRoZSBwcm92aWRlZCBwcm94eU5hbWVcclxuICovXHJcbk1vZGVsLnByb3RvdHlwZS5yZXRyaWV2ZVByb3h5PSBmdW5jdGlvbihwcm94eU5hbWUpXHJcbntcclxuICAgIHJldHVybiB0aGlzLnByb3h5TWFwW3Byb3h5TmFtZV07XHJcbn07XHJcblxyXG4vKipcclxuICogQ2hlY2sgaWYgYSBQcm94eSBpcyByZWdpc3RlcmVkXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm94eU5hbWVcclxuICogQHJldHVybiB7Ym9vbGVhbn1cclxuICogIHdoZXRoZXIgYSBQcm94eSBpcyBjdXJyZW50bHkgcmVnaXN0ZXJlZCB3aXRoIHRoZSBnaXZlbiBwcm94eU5hbWUuXHJcbiAqL1xyXG5Nb2RlbC5wcm90b3R5cGUuaGFzUHJveHk9IGZ1bmN0aW9uKHByb3h5TmFtZSlcclxue1xyXG4gICAgcmV0dXJuIHRoaXMucHJveHlNYXBbcHJveHlOYW1lXSAhPSBudWxsO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSBhIFByb3h5IGZyb20gdGhlIE1vZGVsLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJveHlOYW1lXHJcbiAqICBUaGUgbmFtZSBvZiB0aGUgUHJveHkgaW5zdGFuY2UgdG8gcmVtb3ZlXHJcbiAqIEByZXR1cm4ge3B1cmVtdmMuUHJveHl9XHJcbiAqICBUaGUgUHJveHkgdGhhdCB3YXMgcmVtb3ZlZCBmcm9tIHRoZSBNb2RlbFxyXG4gKi9cclxuTW9kZWwucHJvdG90eXBlLnJlbW92ZVByb3h5PSBmdW5jdGlvbihwcm94eU5hbWUpXHJcbntcclxuICAgIHZhciBwcm94eT0gdGhpcy5wcm94eU1hcFtwcm94eU5hbWVdO1xyXG4gICAgaWYocHJveHkpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5wcm94eU1hcFtwcm94eU5hbWVdPSBudWxsO1xyXG4gICAgICAgIHByb3h5Lm9uUmVtb3ZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHByb3h5O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBzdGF0aWNcclxuICogUmVtb3ZlIGEgTW9kZWwgaW5zdGFuY2UuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbk1vZGVsLnJlbW92ZU1vZGVsPSBmdW5jdGlvbihrZXkpXHJcbntcclxuICAgIGRlbGV0ZSBNb2RlbC5pbnN0YW5jZU1hcFtrZXldO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICogVGhlIG1hcCB1c2VkIGJ5IHRoZSBNb2RlbCB0byBzdG9yZSBQcm94eSBpbnN0YW5jZXMuXHJcbiAqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQHR5cGUgQXJyYXlcclxuICovXHJcbk1vZGVsLnByb3RvdHlwZS5wcm94eU1hcD0gbnVsbDtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqIFRoZSBtYXAgdXNlZCBieSB0aGUgTW9kZWwgdG8gc3RvcmUgbXVsdGl0b24gaW5zdGFuY2VzXHJcbiAqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQHN0YXRpY1xyXG4gKiBAdHlwZSBBcnJheVxyXG4gKi9cclxuTW9kZWwuaW5zdGFuY2VNYXA9IFtdO1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICogVGhlIE1vZGVscyBtdWx0aXRvbiBrZXkuXHJcbiAqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQHR5cGUgc3RyaW5nXHJcbiAqL1xyXG5Nb2RlbC5wcm90b3R5cGUubXVsdGl0b25LZXk7XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKiBNZXNzYWdlIENvbnN0YW50c1xyXG4gKlxyXG4gKiBAc3RhdGljXHJcbiAqIEB0eXBlIHtzdHJpbmd9XHJcbiAqL1xyXG5Nb2RlbC5NVUxUSVRPTl9NU0c9IFwiTW9kZWwgaW5zdGFuY2UgZm9yIHRoaXMgTXVsdGl0b24ga2V5IGFscmVhZHkgY29uc3RydWN0ZWQhXCI7XHJcbi8qKlxyXG4gKiBAYXV0aG9yIFB1cmVNVkMgSlMgTmF0aXZlIFBvcnQgYnkgRGF2aWQgRm9sZXksIEZyw6lkw6lyaWMgU2F1bmllciwgJiBBbGFpbiBEdWNoZXNuZWF1XHJcbiAqIEBhdXRob3IgQ29weXJpZ2h0KGMpIDIwMDYtMjAxMiBGdXR1cmVzY2FsZSwgSW5jLiwgU29tZSByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIEBjbGFzcyBwdXJlbXZjLkNvbnRyb2xsZXJcclxuICpcclxuICogSW4gUHVyZU1WQywgdGhlIENvbnRyb2xsZXIgY2xhc3MgZm9sbG93cyB0aGUgJ0NvbW1hbmQgYW5kIENvbnRyb2xsZXInXHJcbiAqIHN0cmF0ZWd5LCBhbmQgYXNzdW1lcyB0aGVzZSByZXNwb25zaWJpbGl0aWVzOlxyXG4gKlxyXG4gKiAtIFJlbWVtYmVyaW5nIHdoaWNoXHJcbiAqIHtAbGluayBwdXJlbXZjLlNpbXBsZUNvbW1hbmQgU2ltcGxlQ29tbWFuZH1zXHJcbiAqIG9yXHJcbiAqIHtAbGluayBwdXJlbXZjLk1hY3JvQ29tbWFuZCBNYWNyb0NvbW1hbmR9c1xyXG4gKiBhcmUgaW50ZW5kZWQgdG8gaGFuZGxlIHdoaWNoXHJcbiAqIHtAbGluayBwdXJlbXZjLk5vdGlmaWNhdGlvbiBOb3RpZmljYXRpb259c1xyXG4gKiAtIFJlZ2lzdGVyaW5nIGl0c2VsZiBhcyBhblxyXG4gKiB7QGxpbmsgcHVyZW12Yy5PYnNlcnZlciBPYnNlcnZlcn0gd2l0aFxyXG4gKiB0aGUge0BsaW5rIHB1cmVtdmMuVmlldyBWaWV3fSBmb3IgZWFjaFxyXG4gKiB7QGxpbmsgcHVyZW12Yy5Ob3RpZmljYXRpb24gTm90aWZpY2F0aW9ufVxyXG4gKiB0aGF0IGl0IGhhcyBhblxyXG4gKiB7QGxpbmsgcHVyZW12Yy5TaW1wbGVDb21tYW5kIFNpbXBsZUNvbW1hbmR9XHJcbiAqIG9yIHtAbGluayBwdXJlbXZjLk1hY3JvQ29tbWFuZCBNYWNyb0NvbW1hbmR9XHJcbiAqIG1hcHBpbmcgZm9yLlxyXG4gKiAtIENyZWF0aW5nIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBwcm9wZXJcclxuICoge0BsaW5rIHB1cmVtdmMuU2ltcGxlQ29tbWFuZCBTaW1wbGVDb21tYW5kfXNcclxuICogb3JcclxuICoge0BsaW5rIHB1cmVtdmMuTWFjcm9Db21tYW5kIE1hY3JvQ29tbWFuZH1zXHJcbiAqIHRvIGhhbmRsZSBhIGdpdmVuXHJcbiAqIHtAbGluayBwdXJlbXZjLk5vdGlmaWNhdGlvbiBOb3RpZmljYXRpb259XHJcbiAqIHdoZW4gbm90aWZpZWQgYnkgdGhlXHJcbiAqIHtAbGluayBwdXJlbXZjLlZpZXcgVmlld30uXHJcbiAqIC0gQ2FsbGluZyB0aGUgY29tbWFuZCdzIGV4ZWN1dGUgbWV0aG9kLCBwYXNzaW5nIGluIHRoZVxyXG4gKiB7QGxpbmsgcHVyZW12Yy5Ob3RpZmljYXRpb24gTm90aWZpY2F0aW9ufS5cclxuICpcclxuICogWW91ciBhcHBsaWNhdGlvbiBtdXN0IHJlZ2lzdGVyXHJcbiAqIHtAbGluayBwdXJlbXZjLlNpbXBsZUNvbW1hbmQgU2ltcGxlQ29tbWFuZH1zXHJcbiAqIG9yIHtAbGluayBwdXJlbXZjLk1hY3JvQ29tbWFuZCBNYWNyb0NvbW1hbmR9c1xyXG4gKiB3aXRoIHRoZSBDb250cm9sbGVyLlxyXG4gKlxyXG4gKiBUaGUgc2ltcGxlc3Qgd2F5IGlzIHRvIHN1YmNsYXNzXHJcbiAqIHtAbGluayBwdXJlbXZjLkZhY2FkZSBGYWNhZGV9LFxyXG4gKiBhbmQgdXNlIGl0c1xyXG4gKiB7QGxpbmsgcHVyZW12Yy5GYWNhZGUjaW5pdGlhbGl6ZUNvbnRyb2xsZXIgaW5pdGlhbGl6ZUNvbnRyb2xsZXJ9XHJcbiAqIG1ldGhvZCB0byBhZGQgeW91ciByZWdpc3RyYXRpb25zLlxyXG4gKlxyXG4gKiBAY29uc3RydWN0b3JcclxuICogVGhpcyBDb250cm9sbGVyIGltcGxlbWVudGF0aW9uIGlzIGEgTXVsdGl0b24sIHNvIHlvdSBzaG91bGQgbm90IGNhbGwgdGhlXHJcbiAqIGNvbnN0cnVjdG9yIGRpcmVjdGx5LCBidXQgaW5zdGVhZCBjYWxsIHRoZSBzdGF0aWMgI2dldEluc3RhbmNlIGZhY3RvcnkgbWV0aG9kLFxyXG4gKiBwYXNzaW5nIHRoZSB1bmlxdWUga2V5IGZvciB0aGlzIGluc3RhbmNlIHRvIGl0LlxyXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5XHJcbiAqIEB0aHJvd3Mge0Vycm9yfVxyXG4gKiAgSWYgaW5zdGFuY2UgZm9yIHRoaXMgTXVsdGl0b24ga2V5IGhhcyBhbHJlYWR5IGJlZW4gY29uc3RydWN0ZWRcclxuICovXHJcbmZ1bmN0aW9uIENvbnRyb2xsZXIoa2V5KVxyXG57XHJcbiAgICBpZihDb250cm9sbGVyLmluc3RhbmNlTWFwW2tleV0gIT0gbnVsbClcclxuICAgIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoQ29udHJvbGxlci5NVUxUSVRPTl9NU0cpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubXVsdGl0b25LZXk9IGtleTtcclxuICAgIENvbnRyb2xsZXIuaW5zdGFuY2VNYXBbdGhpcy5tdWx0aXRvbktleV09IHRoaXM7XHJcbiAgICB0aGlzLmNvbW1hbmRNYXA9IG5ldyBBcnJheSgpO1xyXG4gICAgdGhpcy5pbml0aWFsaXplQ29udHJvbGxlcigpO1xyXG59XHJcblxyXG4vKipcclxuICogQHByb3RlY3RlZFxyXG4gKlxyXG4gKiBJbml0aWFsaXplIHRoZSBtdWx0aXRvbiBDb250cm9sbGVyIGluc3RhbmNlLlxyXG4gKlxyXG4gKiBDYWxsZWQgYXV0b21hdGljYWxseSBieSB0aGUgY29uc3RydWN0b3IuXHJcbiAqXHJcbiAqIE5vdGUgdGhhdCBpZiB5b3UgYXJlIHVzaW5nIGEgc3ViY2xhc3Mgb2YgVmlld1xyXG4gKiBpbiB5b3VyIGFwcGxpY2F0aW9uLCB5b3Ugc2hvdWxkICphbHNvKiBzdWJjbGFzcyBDb250cm9sbGVyXHJcbiAqIGFuZCBvdmVycmlkZSB0aGUgaW5pdGlhbGl6ZUNvbnRyb2xsZXIgbWV0aG9kIGluIHRoZVxyXG4gKiBmb2xsb3dpbmcgd2F5LlxyXG4gKlxyXG4gKiAgICAgTXlDb250cm9sbGVyLnByb3RvdHlwZS5pbml0aWFsaXplQ29udHJvbGxlcj0gZnVuY3Rpb24gKClcclxuICogICAgIHtcclxuICogICAgICAgICB0aGlzLnZpZXc9IE15Vmlldy5nZXRJbnN0YW5jZSh0aGlzLm11bHRpdG9uS2V5KTtcclxuICogICAgIH07XHJcbiAqXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5Db250cm9sbGVyLnByb3RvdHlwZS5pbml0aWFsaXplQ29udHJvbGxlcj0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICB0aGlzLnZpZXc9IFZpZXcuZ2V0SW5zdGFuY2UodGhpcy5tdWx0aXRvbktleSk7XHJcbn07XHJcblxyXG4vKipcclxuICogVGhlIENvbnRyb2xsZXJzIG11bHRpdG9uIGZhY3RvcnkgbWV0aG9kLlxyXG4gKiBOb3RlIHRoYXQgdGhpcyBtZXRob2Qgd2lsbCByZXR1cm4gbnVsbCBpZiBzdXBwbGllZCBhIG51bGxcclxuICogb3IgdW5kZWZpbmVkIG11bHRpdG9uIGtleS5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IGtleVxyXG4gKiAgQSBDb250cm9sbGVyJ3MgbXVsdGl0b24ga2V5XHJcbiAqIEByZXR1cm4ge3B1cmVtdmMuQ29udHJvbGxlcn1cclxuICogIHRoZSBNdWx0aXRvbiBpbnN0YW5jZSBvZiBDb250cm9sbGVyXHJcbiAqL1xyXG5Db250cm9sbGVyLmdldEluc3RhbmNlPSBmdW5jdGlvbihrZXkpXHJcbntcclxuICAgIGlmIChudWxsID09IGtleSlcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuXHJcbiAgICBpZihudWxsID09IHRoaXMuaW5zdGFuY2VNYXBba2V5XSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLmluc3RhbmNlTWFwW2tleV09IG5ldyB0aGlzKGtleSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VNYXBba2V5XTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBJZiBhIFNpbXBsZUNvbW1hbmQgb3IgTWFjcm9Db21tYW5kIGhhcyBwcmV2aW91c2x5IGJlZW4gcmVnaXN0ZXJlZCB0byBoYW5kbGVcclxuICogdGhlIGdpdmVuIE5vdGlmaWNhdGlvbiB0aGVuIGl0IGlzIGV4ZWN1dGVkLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3B1cmVtdmMuTm90aWZpY2F0aW9ufSBub3RlXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5Db250cm9sbGVyLnByb3RvdHlwZS5leGVjdXRlQ29tbWFuZD0gZnVuY3Rpb24obm90ZSlcclxue1xyXG4gICAgdmFyIGNvbW1hbmRDbGFzc1JlZj0gdGhpcy5jb21tYW5kTWFwW25vdGUuZ2V0TmFtZSgpXTtcclxuICAgIGlmKGNvbW1hbmRDbGFzc1JlZiA9PSBudWxsKVxyXG4gICAgICAgIHJldHVybjtcclxuXHJcbiAgICB2YXIgY29tbWFuZEluc3RhbmNlPSBuZXcgY29tbWFuZENsYXNzUmVmKCk7XHJcbiAgICBjb21tYW5kSW5zdGFuY2UuaW5pdGlhbGl6ZU5vdGlmaWVyKHRoaXMubXVsdGl0b25LZXkpO1xyXG4gICAgY29tbWFuZEluc3RhbmNlLmV4ZWN1dGUobm90ZSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVnaXN0ZXIgYSBwYXJ0aWN1bGFyIFNpbXBsZUNvbW1hbmQgb3IgTWFjcm9Db21tYW5kIGNsYXNzIGFzIHRoZSBoYW5kbGVyIGZvclxyXG4gKiBhIHBhcnRpY3VsYXIgTm90aWZpY2F0aW9uLlxyXG4gKlxyXG4gKiBJZiBhbiBjb21tYW5kIGFscmVhZHkgYmVlbiByZWdpc3RlcmVkIHRvIGhhbmRsZSBOb3RpZmljYXRpb25zIHdpdGggdGhpcyBuYW1lLFxyXG4gKiBpdCBpcyBubyBsb25nZXIgdXNlZCwgdGhlIG5ldyBjb21tYW5kIGlzIHVzZWQgaW5zdGVhZC5cclxuICpcclxuICogVGhlIE9ic2VydmVyIGZvciB0aGUgbmV3IGNvbW1hbmQgaXMgb25seSBjcmVhdGVkIGlmIHRoaXMgdGhlIGlyc3QgdGltZSBhXHJcbiAqIGNvbW1hbmQgaGFzIGJlZW4gcmVnaXNlcmVkIGZvciB0aGlzIE5vdGlmaWNhdGlvbiBuYW1lLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbm90aWZpY2F0aW9uTmFtZVxyXG4gKiAgdGhlIG5hbWUgb2YgdGhlIE5vdGlmaWNhdGlvblxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb21tYW5kQ2xhc3NSZWZcclxuICogIGEgY29tbWFuZCBjb25zdHJ1Y3RvclxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuQ29udHJvbGxlci5wcm90b3R5cGUucmVnaXN0ZXJDb21tYW5kPSBmdW5jdGlvbihub3RpZmljYXRpb25OYW1lLCBjb21tYW5kQ2xhc3NSZWYpXHJcbntcclxuICAgIGlmKHRoaXMuY29tbWFuZE1hcFtub3RpZmljYXRpb25OYW1lXSA9PSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudmlldy5yZWdpc3Rlck9ic2VydmVyKG5vdGlmaWNhdGlvbk5hbWUsIG5ldyBPYnNlcnZlcih0aGlzLmV4ZWN1dGVDb21tYW5kLCB0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jb21tYW5kTWFwW25vdGlmaWNhdGlvbk5hbWVdPSBjb21tYW5kQ2xhc3NSZWY7XHJcbn07XHJcblxyXG4vKipcclxuICogQ2hlY2sgaWYgYSBjb21tYW5kIGlzIHJlZ2lzdGVyZWQgZm9yIGEgZ2l2ZW4gTm90aWZpY2F0aW9uXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBub3RpZmljYXRpb25OYW1lXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAqICB3aGV0aGVyIGEgQ29tbWFuZCBpcyBjdXJyZW50bHkgcmVnaXN0ZXJlZCBmb3IgdGhlIGdpdmVuIG5vdGlmaWNhdGlvbk5hbWUuXHJcbiAqL1xyXG5Db250cm9sbGVyLnByb3RvdHlwZS5oYXNDb21tYW5kPSBmdW5jdGlvbihub3RpZmljYXRpb25OYW1lKVxyXG57XHJcbiAgICByZXR1cm4gdGhpcy5jb21tYW5kTWFwW25vdGlmaWNhdGlvbk5hbWVdICE9IG51bGw7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlIGEgcHJldmlvdXNseSByZWdpc3RlcmVkIGNvbW1hbmQgdG9cclxuICoge0BsaW5rIHB1cmVtdmMuTm90aWZpY2F0aW9uIE5vdGlmaWNhdGlvbn1cclxuICogbWFwcGluZy5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG5vdGlmaWNhdGlvbk5hbWVcclxuICogIHRoZSBuYW1lIG9mIHRoZSBOb3RpZmljYXRpb24gdG8gcmVtb3ZlIHRoZSBjb21tYW5kIG1hcHBpbmcgZm9yXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5Db250cm9sbGVyLnByb3RvdHlwZS5yZW1vdmVDb21tYW5kPSBmdW5jdGlvbihub3RpZmljYXRpb25OYW1lKVxyXG57XHJcbiAgICBpZih0aGlzLmhhc0NvbW1hbmQobm90aWZpY2F0aW9uTmFtZSkpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy52aWV3LnJlbW92ZU9ic2VydmVyKG5vdGlmaWNhdGlvbk5hbWUsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuY29tbWFuZE1hcFtub3RpZmljYXRpb25OYW1lXT0gbnVsbDtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBAc3RhdGljXHJcbiAqIFJlbW92ZSBhIENvbnRyb2xsZXIgaW5zdGFuY2UuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcclxuICogIG11bHRpdG9uS2V5IG9mIENvbnRyb2xsZXIgaW5zdGFuY2UgdG8gcmVtb3ZlXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5Db250cm9sbGVyLnJlbW92ZUNvbnRyb2xsZXI9IGZ1bmN0aW9uKGtleSlcclxue1xyXG4gICAgZGVsZXRlIHRoaXMuaW5zdGFuY2VNYXBba2V5XTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBMb2NhbCByZWZlcmVuY2UgdG8gdGhlIENvbnRyb2xsZXIncyBWaWV3XHJcbiAqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQHR5cGUge3B1cmVtdmMuVmlld31cclxuICovXHJcbkNvbnRyb2xsZXIucHJvdG90eXBlLnZpZXc9IG51bGw7XHJcblxyXG4vKipcclxuICogTm90ZSBuYW1lIHRvIGNvbW1hbmQgY29uc3RydWN0b3IgbWFwcGluZ3NcclxuICpcclxuICogQHByb3RlY3RlZFxyXG4gKiBAdHlwZSB7T2JqZWN0fVxyXG4gKi9cclxuQ29udHJvbGxlci5wcm90b3R5cGUuY29tbWFuZE1hcD0gbnVsbDtcclxuXHJcbi8qKlxyXG4gKiBUaGUgQ29udHJvbGxlcidzIG11bHRpdG9uIGtleVxyXG4gKlxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEB0eXBlIHtzdHJpbmd9XHJcbiAqL1xyXG5Db250cm9sbGVyLnByb3RvdHlwZS5tdWx0aXRvbktleT0gbnVsbDtcclxuXHJcbi8qKlxyXG4gKiBNdWx0aXRvbiBrZXkgdG8gQ29udHJvbGxlciBpbnN0YW5jZSBtYXBwaW5nc1xyXG4gKlxyXG4gKiBAc3RhdGljXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQHR5cGUge09iamVjdH1cclxuICovXHJcbkNvbnRyb2xsZXIuaW5zdGFuY2VNYXA9IFtdO1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICpcclxuICogTWVzc2FnZSBjb25zdGFudHNcclxuICogQHN0YXRpY1xyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEB0eXBlIHtzdHJpbmd9XHJcbiAqL1xyXG5Db250cm9sbGVyLk1VTFRJVE9OX01TRz0gXCJjb250cm9sbGVyIGtleSBmb3IgdGhpcyBNdWx0aXRvbiBrZXkgYWxyZWFkeSBjb25zdHJ1Y3RlZFwiXHJcbi8qXHJcbiAqIEBhdXRob3IgUHVyZU1WQyBKUyBOYXRpdmUgUG9ydCBieSBEYXZpZCBGb2xleSwgRnLDqWTDqXJpYyBTYXVuaWVyLCAmIEFsYWluIER1Y2hlc25lYXUgXHJcbiAqIEBhdXRob3IgQ29weXJpZ2h0KGMpIDIwMDYtMjAxMiBGdXR1cmVzY2FsZSwgSW5jLiwgU29tZSByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqIFxyXG4gKiBAaGlkZVxyXG4gKiBBIGFuIGludGVybmFsIGhlbHBlciBjbGFzcyB1c2VkIHRvIGFzc2lzdCBjbGFzc2xldCBpbXBsZW1lbnRhdGlvbi4gVGhpc1xyXG4gKiBjbGFzcyBpcyBub3QgYWNjZXNzaWJsZSBieSBjbGllbnQgY29kZS5cclxuICovXHJcbnZhciBPb3BIZWxwPVxyXG57XHJcbiAgICAvKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgc2NvcGUuIFdlIHVzZSB0aGlzIHJhdGhlciB0aGFuIHdpbmRvd1xyXG4gICAgICogaW4gb3JkZXIgdG8gc3VwcG9ydCBib3RoIGJyb3dzZXIgYmFzZWQgYW5kIG5vbiBicm93c2VyIGJhZWQgXHJcbiAgICAgKiBKYXZhU2NyaXB0IGludGVycHJldGVycy5cclxuICAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAgKi9cclxuICAgIGdsb2JhbDogKGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXN9KSgpXHJcblxyXG4gICAgLypcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBFeHRlbmQgb25lIEZ1bmN0aW9uJ3MgcHJvdG90eXBlIGJ5IGFub3RoZXIsIGVtdWxhdGluZyBjbGFzc2ljXHJcbiAgICAgKiBpbmhlcml0YW5jZS5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2hpbGRcclxuICAgICAqICBUaGUgRnVuY3Rpb24gdG8gZXh0ZW5kIChzdWJjbGFzcylcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gcGFyZW50XHJcbiAgICAgKiAgVGhlIEZ1bmN0aW9uIHRvIGV4dGVuZCBmcm9tIChzdXBlcmNsYXNzKVxyXG4gICAgICogXHJcbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn1cclxuICAgICAqIFxyXG4gICAgICogIEEgcmVmZXJlbmNlIHRvIHRoZSBleHRlbmRlZCBGdW5jdGlvbiAoc3ViY2xhc3MpXHJcbiAgICAgKi9cclxuICAgICwgICBleHRlbmQ6IGZ1bmN0aW9uIChjaGlsZCwgcGFyZW50KVxyXG57XHJcbiAgICBpZiAoJ2Z1bmN0aW9uJyAhPT0gdHlwZW9mIGNoaWxkKVxyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJyNleHRlbmQtIGNoaWxkIHNob3VsZCBiZSBGdW5jdGlvbicpO1xyXG5cclxuICAgIGlmICgnZnVuY3Rpb24nICE9PSB0eXBlb2YgcGFyZW50KVxyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJyNleHRlbmQtIHBhcmVudCBzaG91bGQgYmUgRnVuY3Rpb24nKTtcclxuXHJcbiAgICBpZiAocGFyZW50ID09PSBjaGlsZClcclxuICAgICAgICByZXR1cm47XHJcblxyXG4gICAgdmFyIFRyYW5zaXRpdmU9IG5ldyBGdW5jdGlvbjtcclxuICAgIFRyYW5zaXRpdmUucHJvdG90eXBlPSBwYXJlbnQucHJvdG90eXBlO1xyXG4gICAgY2hpbGQucHJvdG90eXBlPSBuZXcgVHJhbnNpdGl2ZTtcclxuICAgIHJldHVybiBjaGlsZC5wcm90b3R5cGUuY29uc3RydWN0b3I9IGNoaWxkO1xyXG59XHJcblxyXG4gICAgLypcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBEZWNvYXJhdGUgb25lIG9iamVjdCB3aXRoIHRoZSBwcm9wZXJ0aWVzIG9mIGFub3RoZXIuIFxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0XHJcbiAgICAgKiAgVGhlIG9iamVjdCB0byBkZWNvcmF0ZS5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHRyYWl0c1xyXG4gICAgICogIFRoZSBvYmplY3QgcHJvdmlkaW5nIHRoZSBwcm9wZXJpdGVzIHRoYXQgdGhlIGZpcnN0IG9iamVjdFxyXG4gICAgICogIHdpbGwgYmUgZGVjb3JhdGVkIHdpdGguIE5vdGUgdGhhdCBvbmx5IHByb3BlcnRpZXMgZGVmaW5lZCBvbiBcclxuICAgICAqICB0aGlzIG9iamVjdCB3aWxsIGJlIGNvcGllZC0gaS5lLiBpbmhlcml0ZWQgcHJvcGVydGllcyB3aWxsXHJcbiAgICAgKiAgYmUgaWdub3JlZC5cclxuICAgICAqIFxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxyXG4gICAgICogIFRIZSBkZWNvcmF0ZWQgb2JqZWN0IChmaXJzdCBhcmd1bWVudClcclxuICAgICAqL1xyXG4gICAgLCAgIGRlY29yYXRlOiBmdW5jdGlvbiAob2JqZWN0LCB0cmFpdHMpXHJcbntcclxuICAgIGZvciAodmFyIGFjY2Vzc29yIGluIHRyYWl0cylcclxuICAgIHtcclxuICAgICAgICBvYmplY3RbYWNjZXNzb3JdPSB0cmFpdHNbYWNjZXNzb3JdO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBvYmplY3Q7XHJcbn1cclxufTtcclxuXHJcblxyXG4vKipcclxuICogQG1lbWJlciBwdXJlbXZjXHJcbiAqXHJcbiAqIERlY2xhcmUgYSBuYW1lc3BhY2UgYW5kIG9wdGlvbmFsbHkgbWFrZSBhbiBPYmplY3QgdGhlIHJlZmVyZW50XHJcbiAqIG9mIHRoYXQgbmFtZXNwYWNlLlxyXG4gKlxyXG4gKiAgICAgY29uc29sZS5hc3NlcnQobnVsbCA9PSB3aW5kb3cudGxkLCAnTm8gdGxkIG5hbWVzcGFjZScpO1xyXG4gKiAgICAgLy8gZGVjbGFyZSB0aGUgdGxkIG5hbWVzcGFjZVxyXG4gKiAgICAgcHVyZW12Yy5kZWNsYXJlKCd0bGQnKTtcclxuICogICAgIGNvbnNvbGUuYXNzZXJ0KCdvYmplY3QnID09PSB0eXBlb2YgdGxkLCAnVGhlIHRsZCBuYW1lc3BhY2Ugd2FzIGRlY2xhcmVkJyk7XHJcbiAqXHJcbiAqICAgICAvLyB0aGUgbWV0aG9kIHJldHVybnMgYSByZWZlcmVuY2UgdG8gbGFzdCBuYW1lc3BhY2Ugbm9kZSBpbiBhIGNyZWF0ZWQgaGllcmFyY2h5XHJcbiAqICAgICB2YXIgcmVmZXJlbmNlPSBwdXJlbXZjLmRlY2xhcmUoJ3RsZC5kb21haW4uYXBwJyk7XHJcbiAqICAgICBjb25zb2xlLmFzc2VydChyZWZlcmVuY2UgPT09IHRsZC5kb21haW4uYXBwKVxyXG4gKlxyXG4gKiAgICAgLy8gb2YgY291cnNlIHlvdSBjYW4gYWxzbyBkZWNsYXJlIHlvdXIgb3duIG9iamVjdHMgYXMgd2VsbFxyXG4gKiAgICAgdmFyIEFwcENvbnN0YW50cz1cclxuICogICAgICAgICB7XHJcbiAqIFx0ICAgICAgICAgICBBUFBfTkFNRTogJ3RsZC5kb21haW4uYXBwLkFwcCdcclxuICogICAgICAgICB9O1xyXG4gKlxyXG4gKiAgICAgcHVyZW12Yy5kZWNsYXJlKCd0bGQuZG9tYWluLmFwcC5BcHBDb25zdGFudHMnLCBBcHBDb25zdGFudHMpO1xyXG4gKiAgICAgY29uc29sZS5hc3NlcnQoQXBwQ29uc3RhbnRzID09PSB0bGQuZG9tYWluLmFwcC5BcHBDb25zdGFudHNcclxuICogXHQgICAsICdBcHBDb25zdGFudHMgd2FzIGV4cG9ydGVkIHRvIHRoZSBuYW1lc3BhY2UnKTtcclxuICpcclxuICogTm90ZSB0aGF0IHlvdSBjYW4gYWxzbyAjZGVjbGFyZSB3aXRoaW4gYSBjbG9zdXJlLiBUaGF0IHdheSB5b3VcclxuICogY2FuIHNlbGVjdGl2ZWx5IGV4cG9ydCBPYmplY3RzIHRvIHlvdXIgb3duIG5hbWVzcGFjZXMgd2l0aG91dFxyXG4gKiBsZWFraW5nIHZhcmlhYmxlcyBpbnRvIHRoZSBnbG9iYWwgc2NvcGUuXHJcbiAqXHJcbiAqICAgICAoZnVuY3Rpb24oKXtcclxuICogICAgICAgICAvLyB0aGlzIHZhciBpcyBub3QgYWNjZXNzaWJsZSBvdXRzaWRlIG9mIHRoaXNcclxuICogICAgICAgICAvLyBjbG9zdXJlcyBjYWxsIHNjb3BlXHJcbiAqICAgICAgICAgdmFyIGhpZGRlblZhbHVlPSAnZGVmYXVsdFZhbHVlJztcclxuICogXHJcbiAqICAgICAgICAgLy8gZXhwb3J0IGFuIG9iamVjdCB0aGF0IHJlZmVyZW5jZXMgdGhlIGhpZGRlblxyXG4gKiAgICAgICAgIC8vIHZhcmlhYmxlIGFuZCB3aGljaCBjYW4gbXV0YXRlIGl0XHJcbiAqICAgICAgICAgcHVyZW12Yy5kZWNsYXJlXHJcbiAqICAgICAgICAgKFxyXG4gKiAgICAgICAgICAgICAgJ3RsZC5kb21haW4uYXBwLmJhY2tkb29yJ1xyXG4gKiBcclxuICogICAgICAgICAsICAgIHtcclxuICogICAgICAgICAgICAgICAgICBzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKVxyXG4gKiAgICAgICAgICAgICAgICAgIHtcclxuICogICAgICAgICAgICAgICAgICAgICAgLy8gYXNzaWducyB0byB0aGUgaGlkZGVuIHZhclxyXG4gKiAgICAgICAgICAgICAgICAgICAgICBoaWRkZW5WYWx1ZT0gdmFsdWU7XHJcbiAqICAgICAgICAgICAgICAgICAgfVxyXG4gKiBcclxuICogICAgICAgICAsICAgICAgICBnZXRWYWx1ZTogZnVuY3Rpb24gKClcclxuICogICAgICAgICAgICAgICAgICB7XHJcbiAqICAgICAgICAgICAgICAgICAgICAgIC8vIHJlYWRzIGZyb20gdGhlIGhpZGRlbiB2YXJcclxuICogICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGhpZGRlblZhbHVlO1xyXG4gKiAgICAgICAgICAgICAgICAgIH1cclxuICogICAgICAgICAgICAgIH1cclxuICogICAgICAgICApO1xyXG4gKiAgICAgfSkoKTtcclxuICogICAgIC8vIGluZGlyZWN0bHkgcmV0cmlldmUgdGhlIGhpZGRlbiB2YXJpYWJsZXMgdmFsdWVcclxuICogICAgIGNvbnNvbGUuYXNzZXJ0KCdkZWZhdWx0VmFsdWUnID09PSB0bGQuZG9tYWluLmFwcC5iYWNrZG9vci5nZXRWYWx1ZSgpKTtcclxuICogICAgIC8vIGluZGlyZWN0bHkgc2V0IHRoZSBoaWRkZW4gdmFyaWFibGVzIHZhbHVlXHJcbiAqICAgICB0bGQuZG9tYWluLmFwcC5iYWNrZG9vci5zZXRWYWx1ZSgnbmV3VmFsdWUnKTtcclxuICogICAgIC8vIHRoZSBoaWRkZW4gdmFyIHdhcyBtdXRhdGVkXHJcbiAqICAgICBjb25zb2xlLmFzc2VydCgnbmV3VmFsdWUnID09PSB0bGQuZG9tYWluLmFwcC5iYWNrZG9vci5nZXRWYWx1ZSgpKTtcclxuICpcclxuICogT24gb2NjYXNpb24sIHByaW1hcmlseSBkdXJpbmcgdGVzdGluZywgeW91IG1heSB3YW50IHRvIHVzZSBkZWNsYXJlLFxyXG4gKiBidXQgbm90IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgYmUgdGhlIG5hbWVzcGFjZSByb290LiBJbiB0aGVzZSBjYXNlcyB5b3VcclxuICogY2FuIHN1cHBseSB0aGUgb3B0aW9uYWwgdGhpcmQgc2NvcGUgYXJndW1lbnQuXHJcbiAqXHJcbiAqICAgICB2YXIgbG9jYWxTY29wZT0ge31cclxuICogICAgICwgICBvYmplY3Q9IHt9XHJcbiAqXHJcbiAqICAgICBwdXJlbXZjLmRlY2xhcmUoJ21vY2sub2JqZWN0Jywgb2JqZWN0LCBsb2NhbFNjb3BlKTtcclxuICpcclxuICogICAgIGNvbnNvbGUuYXNzZXJ0KG51bGwgPT0gd2luZG93Lm1vY2ssICdtb2NrIG5hbWVzcGFjZSBpcyBub3QgaW4gZ2xvYmFsIHNjb3BlJyk7XHJcbiAqICAgICBjb25zb2xlLmFzc2VydChvYmplY3QgPT09IGxvY2FsU2NvcGUubW9jay5vYmplY3QsICdtb2NrLm9iamVjdCBpcyBhdmFpbGFibGUgaW4gbG9jYWxTY29wZScpO1xyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nXHJcbiAqICBBIHF1YWxpZmllZCBvYmplY3QgbmFtZSwgZS5nLiAnY29tLmV4YW1wbGUuQ2xhc3MnXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XVxyXG4gKiAgQW4gb2JqZWN0IHRvIG1ha2UgdGhlIHJlZmVyZW50IG9mIHRoZSBuYW1lc3BhY2UuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBbc2NvcGVdXHJcbiAqICBUaGUgbmFtZXNwYWNlJ3Mgcm9vdCBub2RlLiBJZiBub3Qgc3VwcGxpZWQsIHRoZSBnbG9iYWxcclxuICogIHNjb3BlIHdpbGwgYmUgbmFtZXNwYWNlcyByb290IG5vZGUuXHJcbiAqXHJcbiAqIEByZXR1cm4ge09iamVjdH1cclxuICpcclxuICogIEEgcmVmZXJlbmNlIHRvIHRoZSBsYXN0IG5vZGUgb2YgdGhlIE9iamVjdCBoaWVyYXJjaHkgY3JlYXRlZC5cclxuICovXHJcbmZ1bmN0aW9uIGRlY2xhcmUgKHF1YWxpZmllZE5hbWUsIG9iamVjdCwgc2NvcGUpXHJcbntcclxuICAgIHZhciBub2Rlcz0gcXVhbGlmaWVkTmFtZS5zcGxpdCgnLicpXHJcbiAgICAgICAgLCAgIG5vZGU9IHNjb3BlIHx8IE9vcEhlbHAuZ2xvYmFsXHJcbiAgICAgICAgLCAgIGxhc3ROb2RlXHJcbiAgICAgICAgLCAgIG5ld05vZGVcclxuICAgICAgICAsICAgbm9kZU5hbWU7XHJcblxyXG4gICAgZm9yICh2YXIgaT0gMCwgbj0gbm9kZXMubGVuZ3RoOyBpIDwgbjsgaSsrKVxyXG4gICAge1xyXG4gICAgICAgIGxhc3ROb2RlPSBub2RlO1xyXG4gICAgICAgIG5vZGVOYW1lPSBub2Rlc1tpXTtcclxuXHJcbiAgICAgICAgbm9kZT0gKG51bGwgPT0gbm9kZVtub2RlTmFtZV0gPyBub2RlW25vZGVOYW1lXSA9IHt9IDogbm9kZVtub2RlTmFtZV0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChudWxsID09IG9iamVjdClcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuXHJcbiAgICByZXR1cm4gbGFzdE5vZGVbbm9kZU5hbWVdPSBvYmplY3Q7XHJcbn07XHJcblxyXG5cclxuXHJcblxyXG4vKipcclxuICogQG1lbWJlciBwdXJlbXZjXHJcbiAqXHJcbiAqIERlZmluZSBhIG5ldyBjbGFzc2xldC4gQ3VycmVudCBlZGl0aW9ucyBvZiBKYXZhU2NyaXB0IGRvIG5vdCBoYXZlIGNsYXNzZXMsXHJcbiAqIGJ1dCB0aGV5IGNhbiBiZSBlbXVsYXRlZCwgYW5kIHRoaXMgbWV0aG9kIGRvZXMgdGhpcyBmb3IgeW91LCBzYXZpbmcgeW91XHJcbiAqIGZyb20gaGF2aW5nIHRvIHdvcmsgd2l0aCBGdW5jdGlvbiBwcm90b3R5cGUgZGlyZWN0bHkuIFRoZSBtZXRob2QgZG9lc1xyXG4gKiBub3QgZXh0ZW5kIGFueSBOYXRpdmUgb2JqZWN0cyBhbmQgaXMgZW50aXJlbHkgb3B0IGluLiBJdHMgcGFydGljdWxhcmx5XHJcbiAqIHVzZWZ1bGwgaWYgeW91IHdhbnQgdG8gbWFrZSB5b3VyIFB1cmVNdmMgYXBwbGljYXRpb25zIG1vcmUgcG9ydGFibGUsIGJ5XHJcbiAqIGRlY291cGxpbmcgdGhlbSBmcm9tIGEgc3BlY2lmaWMgT09QIGFic3RyYWN0aW9uIGxpYnJhcnkuXHJcbiAqXHJcbiAqXHJcbiAqICAgICBwdXJlbXZjLmRlZmluZVxyXG4gKiAgICAgKFxyXG4gKiAgICAgICAgIC8vIHRoZSBmaXJzdCBvYmplY3Qgc3VwcGxpZWQgaXMgYSBjbGFzcyBkZXNjcmlwdG9yLiBOb25lIG9mIHRoZXNlXHJcbiAqICAgICAgICAgLy8gcHJvcGVydGllcyBhcmUgYWRkZWQgdG8geW91ciBjbGFzcywgdGhlIGV4Y2VwdGlvbiBiZWluZyB0aGVcclxuICogICAgICAgICAvLyBjb25zdHJ1Y3RvciBwcm9wZXJ0eSwgd2hpY2ggaWYgc3VwcGxpZWQsIHdpbGwgYmUgeW91ciBjbGFzc2VzXHJcbiAqICAgICAgICAgLy8gY29uc3RydWN0b3IuXHJcbiAqICAgICAgICAge1xyXG4gKiAgICAgICAgICAgICAvLyB5b3VyIGNsYXNzZXMgbmFtZXNwYWNlLSBpZiBzdXBwbGllZCwgaXQgd2lsbCBiZSBcclxuICogICAgICAgICAgICAgLy8gY3JlYXRlZCBmb3IgeW91XHJcbiAqICAgICAgICAgICAgIG5hbWU6ICdjb20uZXhhbXBsZS5Vc2VyTWVkaWF0b3InXHJcbiAqIFxyXG4gKiAgICAgICAgICAgICAvLyB5b3VyIGNsYXNzZXMgcGFyZW50IGNsYXNzLiBJZiBzdXBwbGllZCwgaW5oZXJpdGFuY2UgXHJcbiAqICAgICAgICAgICAgIC8vIHdpbGwgYmUgdGFrZW4gY2FyZSBvZiBmb3IgeW91XHJcbiAqICAgICAgICAgLCAgIHBhcmVudDogcHVyZW12Yy5NZWRpYXRvclxyXG4gKiBcclxuICogICAgICAgICAgICAgLy8geW91ciBjbGFzc2VzIGNvbnN0cnVjdG9yLiBJZiBub3Qgc3VwcGxpZWQsIG9uZSB3aWxsIGJlIFxyXG4gKiAgICAgICAgICAgICAvLyBjcmVhdGVkIGZvciB5b3VcclxuICogICAgICAgICAsICAgY29uc3RydWN0b3I6IGZ1bmN0aW9uIFVzZXJNZWRpYXRvciAoY29tcG9uZW50KVxyXG4gKiAgICAgICAgICAgICB7XHJcbiAqICAgICAgICAgICAgICAgICAgcHVyZW12Yy5NZWRpYXRvci5jYWxsKHRoaXMsIHRoaXMuY29uc3RydWN0b3IuTkFNRSwgY29tcG9uZW50KTsgIFxyXG4gKiAgICAgICAgICAgICB9XHJcbiAqICAgICAgICAgfVxyXG4gKlxyXG4gKiAgICAgICAgIC8vIHRoZSBzZWNvbmQgb2JqZWN0IHN1cHBsaWVkIGRlZmluZXMgeW91ciBjbGFzcyB0cmFpdHMsIHRoYXQgaXNcclxuICogICAgICAgICAvLyB0aGUgcHJvcGVydGllcyB0aGF0IHdpbGwgYmUgZGVmaW5lZCBvbiB5b3VyIGNsYXNzZXMgcHJvdG90eXBlXHJcbiAqICAgICAgICAgLy8gYW5kIHRoZXJlYnkgb24gYWxsIGluc3RhbmNlcyBvZiB0aGlzIGNsYXNzXHJcbiAqICAgICAsICAge1xyXG4gKiAgICAgICAgICAgICBidXNpbmVzc01ldGhvZDogZnVuY3Rpb24gKClcclxuICogICAgICAgICAgICAge1xyXG4gKiAgICAgICAgICAgICAgICAgLy8gaW1wbCBcclxuICogICAgICAgICAgICAgfVxyXG4gKiAgICAgICAgIH1cclxuICpcclxuICogICAgICAgICAvLyB0aGUgdGhpcmQgb2JqZWN0IHN1cHBsaWVkIGRlZmluZXMgeW91ciBjbGFzc2VzICdzdGF0aWMnIHRyYWl0c1xyXG4gKiAgICAgICAgIC8vIHRoYXQgaXMsIHRoZSBtZXRob2RzIGFuZCBwcm9wZXJ0aWVzIHdoaWNoIHdpbGwgYmUgZGVmaW5lZCBvblxyXG4gKiAgICAgICAgIC8vIHlvdXIgY2xhc3NlcyBjb25zdHJ1Y3RvclxyXG4gKiAgICAgLCAgIHtcclxuICogICAgICAgICAgICAgTkFNRTogJ3VzZXJNZWRpYXRvcidcclxuICogICAgICAgICB9XHJcbiAqICAgICApO1xyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gW2NsYXNzaW5mb11cclxuICogIEFuIG9iamVjdCBkZXNjcmliaW5nIHRoZSBjbGFzcy4gVGhpcyBvYmplY3QgY2FuIGhhdmUgYW55IG9yIGFsbCBvZlxyXG4gKiAgdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxyXG4gKlxyXG4gKiAgLSBuYW1lOiBTdHJpbmdcclxuICogICAgICBUaGUgY2xhc3NsZXRzIG5hbWUuIFRoaXMgY2FuIGJlIGFueSBhcmJpdHJhcnkgcXVhbGlmaWVkIG9iamVjdFxyXG4gKiAgICAgIG5hbWUuICdjb20uZXhhbXBsZS5DbGFzc2xldCcgb3Igc2ltcGx5ICdNeUNsYXNzbGV0JyBmb3IgZXhhbXBsZVxyXG4gKiAgICAgIFRoZSBtZXRob2Qgd2lsbCBhdXRvbWF0aWNhbGx5IGNyZWF0ZSBhbiBvYmplY3QgaGllcmFyY2h5IHJlZmVyaW5nXHJcbiAqICAgICAgdG8geW91ciBjbGFzcyBmb3IgeW91LiBOb3RlIHRoYXQgeW91IHdpbGwgbmVlZCB0byBjYXB0dXJlIHRoZVxyXG4gKiAgICAgIG1ldGhvZHMgcmV0dXJuIHZhbHVlIHRvIHJldHJpZXZlIGEgcmVmZXJlbmNlIHRvIHlvdXIgY2xhc3MgaWYgdGhlXHJcbiAqICAgICAgY2xhc3MgbmFtZSBwcm9wZXJ0eSBpcyBub3QgZGVmaW5lZC5cclxuICogIC0gcGFyZW50OiBGdW5jdGlvblxyXG4gKiAgICAgIFRoZSBjbGFzc2xldHMgJ3N1cGVyY2xhc3MnLiBZb3VyIGNsYXNzIHdpbGwgYmUgZXh0ZW5kZWQgZnJvbSB0aGlzXHJcbiAqICAgICAgaWYgc3VwcGxpZWQuXHJcbiAqXHJcbiAqICAtIGNvbnN0cnVjdG9yOiBGdW5jdGlvblxyXG4gKiAgICAgIFRoZSBjbGFzc2xldHMgY29uc3RydWN0b3IuIE5vdGUgdGhpcyBpcyAqbm90KiBhIHBvc3QgY29uc3RydWN0XHJcbiAqICAgICAgaW5pdGlhbGl6ZSBtZXRob2QsIGJ1dCB5b3VyIGNsYXNzZXMgY29uc3RydWN0b3IgRnVuY3Rpb24uXHJcbiAqICAgICAgSWYgdGhpcyBhdHRyaWJ1dGUgaXMgbm90IGRlZmluZWQsIGEgY29uc3RydWN0b3Igd2lsbCBiZSBjcmVhdGVkIGZvclxyXG4gKiAgICAgIHlvdSBhdXRvbWF0aWNhbGx5LiBJZiB5b3UgaGF2ZSBzdXBwbGllZCBhIHBhcmVudCBjbGFzc1xyXG4gKiAgICAgIHZhbHVlIGFuZCBub3QgZGVmaW5lZCB0aGUgY2xhc3NlcyBjb25zdHJ1Y3RvciwgdGhlIGF1dG9tYXRpY2FsbHlcclxuICogICAgICBjcmVhdGVkIGNvbnN0cnVjdG9yIHdpbGwgaW52b2tlIHRoZSBzdXBlciBjbGFzcyBjb25zdHJ1Y3RvclxyXG4gKiAgICAgIGF1dG9tYXRpY2FsbHkuIElmIHlvdSBoYXZlIHN1cHBsaWVkIHlvdXIgb3duIGNvbnN0cnVjdG9yIGFuZCB5b3VcclxuICogICAgICB3aXNoIHRvIGludm9rZSBpdCdzIHN1cGVyIGNvbnN0cnVjdG9yLCB5b3UgbXVzdCBkbyB0aGlzIG1hbnVhbGx5LCBhc1xyXG4gKiAgICAgIHRoZXJlIGlzIG5vIHJlZmVyZW5jZSB0byB0aGUgY2xhc3NlcyBwYXJlbnQgYWRkZWQgdG8gdGhlIGNvbnN0cnVjdG9yXHJcbiAqICAgICAgcHJvdG90eXBlLlxyXG4gKlxyXG4gKiAgLSBzY29wZTogT2JqZWN0LlxyXG4gKiAgICAgIEZvciB1c2UgaW4gYWR2YW5jZWQgc2NlbmFyaW9zLiBJZiB0aGUgbmFtZSBhdHRyaWJ1dGUgaGFzIGJlZW4gc3VwcGxpZWQsXHJcbiAqICAgICAgdGhpcyB2YWx1ZSB3aWxsIGJlIHRoZSByb290IG9mIHRoZSBvYmplY3QgaGllcmFyY2h5IGNyZWF0ZWQgZm9yIHlvdS5cclxuICogICAgICBVc2UgaXQgZG8gZGVmaW5lIHlvdXIgb3duIGNsYXNzIGhpZXJhcmNoaWVzIGluIHByaXZhdGUgc2NvcGVzLFxyXG4gKiAgICAgIGFjY3Jvc3MgaUZyYW1lcywgaW4geW91ciB1bml0IHRlc3RzLCBvciBhdm9pZCBjb2xsaXNpb24gd2l0aCB0aGlyZFxyXG4gKiAgICAgIHBhcnR5IGxpYnJhcnkgbmFtZXNwYWNlcy5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IFt0cmFpdHNdXHJcbiAqICBBbiBPYmplY3QsIHRoZSBwcm9wZXJ0aWVzIG9mIHdoaWNoIHdpbGwgYmUgYWRkZWQgdG8gdGhlXHJcbiAqICBjbGFzcyBjb25zdHJ1Y3RvcnMgcHJvdG90eXBlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gW3N0YWl0Y1RyYWl0c11cclxuICogIEFuIE9iamVjdCwgdGhlIHByb3BlcnRpZXMgb2Ygd2hpY2ggd2lsbCBiZSBhZGRlZCBkaXJlY3RseVxyXG4gKiAgdG8gdGhpcyBjbGFzcyBjb25zdHJ1Y3RvclxyXG4gKlxyXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cclxuICogIEEgcmVmZXJlbmNlIHRvIHRoZSBjbGFzc2xldHMgY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIGRlZmluZSAoY2xhc3NJbmZvLCB0cmFpdHMsIHN0YXRpY1RyYWl0cylcclxue1xyXG4gICAgaWYgKCFjbGFzc0luZm8pXHJcbiAgICB7XHJcbiAgICAgICAgY2xhc3NJbmZvPSB7fVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBjbGFzc05hbWU9IGNsYXNzSW5mby5uYW1lXHJcbiAgICAgICAgLCAgIGNsYXNzUGFyZW50PSBjbGFzc0luZm8ucGFyZW50XHJcbiAgICAgICAgLCAgIGRvRXh0ZW5kPSAnZnVuY3Rpb24nID09PSB0eXBlb2YgY2xhc3NQYXJlbnRcclxuICAgICAgICAsICAgY2xhc3NDb25zdHJ1Y3RvclxyXG4gICAgICAgICwgICBjbGFzc1Njb3BlPSBjbGFzc0luZm8uc2NvcGUgfHwgbnVsbFxyXG4gICAgICAgICwgICBwcm90b3R5cGVcclxuXHJcbiAgICBpZiAoJ3BhcmVudCcgaW4gY2xhc3NJbmZvICYmICFkb0V4dGVuZClcclxuICAgIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDbGFzcyBwYXJlbnQgbXVzdCBiZSBGdW5jdGlvbicpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjbGFzc0luZm8uaGFzT3duUHJvcGVydHkoJ2NvbnN0cnVjdG9yJykpXHJcbiAgICB7XHJcbiAgICAgICAgY2xhc3NDb25zdHJ1Y3Rvcj0gY2xhc3NJbmZvLmNvbnN0cnVjdG9yXHJcbiAgICAgICAgaWYgKCdmdW5jdGlvbicgIT09IHR5cGVvZiBjbGFzc0NvbnN0cnVjdG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2xhc3MgY29uc3RydWN0b3IgbXVzdCBiZSBGdW5jdGlvbicpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSAvLyB0aGVyZSBpcyBubyBjb25zdHJ1Y3RvciwgY3JlYXRlIG9uZVxyXG4gICAge1xyXG4gICAgICAgIGlmIChkb0V4dGVuZCkgLy8gZW5zdXJlIHRvIGNhbGwgdGhlIHN1cGVyIGNvbnN0cnVjdG9yXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjbGFzc0NvbnN0cnVjdG9yPSBmdW5jdGlvbiAoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjbGFzc1BhcmVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgLy8ganVzdCBjcmVhdGUgYSBGdW5jdGlvblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2xhc3NDb25zdHJ1Y3Rvcj0gbmV3IEZ1bmN0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoZG9FeHRlbmQpXHJcbiAgICB7XHJcbiAgICAgICAgT29wSGVscC5leHRlbmQoY2xhc3NDb25zdHJ1Y3RvciwgY2xhc3NQYXJlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0cmFpdHMpXHJcbiAgICB7XHJcbiAgICAgICAgcHJvdG90eXBlPSBjbGFzc0NvbnN0cnVjdG9yLnByb3RvdHlwZVxyXG4gICAgICAgIE9vcEhlbHAuZGVjb3JhdGUocHJvdG90eXBlLCB0cmFpdHMpO1xyXG4gICAgICAgIC8vIHJlYXNzaWduIGNvbnN0cnVjdG9yIFxyXG4gICAgICAgIHByb3RvdHlwZS5jb25zdHJ1Y3Rvcj0gY2xhc3NDb25zdHJ1Y3RvcjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoc3RhdGljVHJhaXRzKVxyXG4gICAge1xyXG4gICAgICAgIE9vcEhlbHAuZGVjb3JhdGUoY2xhc3NDb25zdHJ1Y3Rvciwgc3RhdGljVHJhaXRzKVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChjbGFzc05hbWUpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKCdzdHJpbmcnICE9PSB0eXBlb2YgY2xhc3NOYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2xhc3MgbmFtZSBtdXN0IGJlIHByaW1pdGl2ZSBzdHJpbmcnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRlY2xhcmUgKGNsYXNzTmFtZSwgY2xhc3NDb25zdHJ1Y3RvciwgY2xhc3NTY29wZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNsYXNzQ29uc3RydWN0b3I7XHJcbn07XHJcblxyXG5cclxuXHJcbi8qIGltcGxlbWVudGF0aW9uIGVuZCAqL1xyXG5cclxuLy8gZGVmaW5lIHRoZSBwdXJlbXZjIGdsb2JhbCBuYW1lc3BhY2UgYW5kIGV4cG9ydCB0aGUgYWN0b3JzXHJcbnZhciBwdXJlbXZjID1cclxue1xyXG4gICAgICAgIFZpZXc6IFZpZXdcclxuICAgICxcdE1vZGVsOiBNb2RlbFxyXG4gICAgLFx0Q29udHJvbGxlcjogQ29udHJvbGxlclxyXG4gICAgLFx0U2ltcGxlQ29tbWFuZDogU2ltcGxlQ29tbWFuZFxyXG4gICAgLFx0TWFjcm9Db21tYW5kOiBNYWNyb0NvbW1hbmRcclxuICAgICxcdEZhY2FkZTogRmFjYWRlXHJcbiAgICAsXHRNZWRpYXRvcjogTWVkaWF0b3JcclxuICAgICxcdE9ic2VydmVyOiBPYnNlcnZlclxyXG4gICAgLFx0Tm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb25cclxuICAgICxcdE5vdGlmaWVyOiBOb3RpZmllclxyXG4gICAgLFx0UHJveHk6IFByb3h5XHJcbiAgICAsXHRkZWZpbmU6IGRlZmluZVxyXG4gICAgLFx0ZGVjbGFyZTogZGVjbGFyZVxyXG59O1xyXG5cclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHB1cmVtdmM7IiwidmFyIEFwcEZhY2FkZSA9IHJlcXVpcmUoJy4vYXBwRmFjYWRlLmpzJyk7XHJcbnZhciBnX3Jlc291Y2VzID0gcmVxdWlyZSgnLi9yZXNvdXJjZS5qcycpLmdfcmVzb3VjZXM7XHJcblxyXG4oZnVuY3Rpb24oKSB7XHJcbiAgICBjYy5nYW1lLm9uU3RhcnQgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIGNjLnZpZXcuYWRqdXN0Vmlld1BvcnQodHJ1ZSk7XHJcbiAgICAgICAgY2Mudmlldy5zZXREZXNpZ25SZXNvbHV0aW9uU2l6ZSg2NDAsIDk2MCwgY2MuUmVzb2x1dGlvblBvbGljeS5TSE9XX0FMTCk7XHJcbiAgICAgICAgY2Mudmlldy5yZXNpemVXaXRoQnJvd3NlclNpemUodHJ1ZSk7XHJcblxyXG4gICAgICAgIGNjcy5jc0xvYWRlci5zZXRSZWNvcmRQcm90b2NvbEJ1ZmZlcnNQYXRoKHRydWUpO1xyXG4gICAgICAgIGNjLkxvYWRlclNjZW5lLnByZWxvYWQoZ19yZXNvdWNlcywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBrZXkgPSAnZmlnaHRlci1tdmMnO1xyXG4gICAgICAgICAgICBBcHBGYWNhZGUuZ2V0SW5zdGFuY2Uoa2V5KS5zdGFydHVwKCk7XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcbiAgICB9O1xyXG4gICAgY2MuZ2FtZS5ydW4oKTtcclxufSkoKTsiLCIvKipcclxuICogQ3JlYXRlZCBieSBBcnRodXIgb24gMjAxNC8xMi8yMC5cclxuICovXHJcbnZhciBjb25zdGFudHMgPSBtb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIEFQUF9OQU1FOiBcImZpZ2h0ZXJcIixcclxuXHJcbiAgICBOT1RJRklDQVRJT046IHtcclxuICAgICAgICBTVEFSVFVQOiAnc3RhcnR1cCcsXHJcbiAgICAgICAgU0NFTkVfQ0hBTkdFRDogJ3NjZW5lX2NoYW5nZWQnLFxyXG4gICAgICAgIFNDRU5FX0hPTUU6ICdzY2VuZV9ob21lJ1xyXG4gICAgfSxcclxuXHJcbiAgICBTQ0VORV9BQ1RJT046ICdzY2VuZV9hY3Rpb24nLFxyXG4gICAgU0NFTkU6IHtcclxuICAgICAgICBIT01FOiAnSG9tZU1lZGlhdG9yJyxcclxuICAgICAgICBUUkFJTjogJ1RyYWluTWVkaWF0b3InXHJcbiAgICB9LFxyXG5cclxuICAgIFRBU0tfU1RBVFVTIDoge1xyXG4gICAgICAgIFNUT1A6IDEsXHJcbiAgICAgICAgU1RBUlQ6IDJcclxuICAgIH1cclxufTsiLCIvKipcclxuICogQ3JlYXRlZCBieSBBcnRodXIgb24gMjAxNC8xMi8yMS5cclxuICovXHJcbnZhciBwdXJlbXZjID0gcmVxdWlyZSgncHVyZW12YycpLnB1cmVtdmM7XHJcbnZhciBTdGFydHVwQ29tbWFuZCA9IHJlcXVpcmUoJy4vY29udHJvbGxlci9jb21tYW5kL1N0YXJ0dXBDb21tYW5kLmpzJyk7XHJcbnZhciBjb25zdGFudHMgPSByZXF1aXJlKCcuL2FwcENvbnN0YW50cy5qcycpO1xyXG5cclxudmFyIEFwcEZhY2FkZSA9IG1vZHVsZS5leHBvcnRzID0gcHVyZW12Yy5kZWZpbmUoXHJcbiAgICAvLyBDTEFTUyBJTkZPXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ0FwcEZhY2FkZScsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLkZhY2FkZSxcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3I6IGZ1bmN0aW9uIChtdWx0aXRvbktleSkge1xyXG4gICAgICAgICAgICBwdXJlbXZjLkZhY2FkZS5jYWxsKHRoaXMsIG11bHRpdG9uS2V5KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIGluaXRpYWxpemVDb250cm9sbGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHB1cmVtdmMuRmFjYWRlLnByb3RvdHlwZS5pbml0aWFsaXplQ29udHJvbGxlci5jYWxsKHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyQ29tbWFuZChjb25zdGFudHMuTk9USUZJQ0FUSU9OLlNUQVJUVVAsIFN0YXJ0dXBDb21tYW5kKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGluaXRpYWxpemVNb2RlbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBwdXJlbXZjLkZhY2FkZS5wcm90b3R5cGUuaW5pdGlhbGl6ZU1vZGVsLmNhbGwodGhpcyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBpbml0aWFsaXplVmlldzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBwdXJlbXZjLkZhY2FkZS5wcm90b3R5cGUuaW5pdGlhbGl6ZVZpZXcuY2FsbCh0aGlzKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzdGFydHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VuZE5vdGlmaWNhdGlvbihjb25zdGFudHMuTk9USUZJQ0FUSU9OLlNUQVJUVVApO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIGdldEluc3RhbmNlOiBmdW5jdGlvbihtdWx0aXRvbktleSkge1xyXG4gICAgICAgICAgICB2YXIgaW5zdGFuY2VNYXAgPSBwdXJlbXZjLkZhY2FkZS5pbnN0YW5jZU1hcDtcclxuICAgICAgICAgICAgdmFyIGluc3RhbmNlID0gaW5zdGFuY2VNYXBbbXVsdGl0b25LZXldO1xyXG4gICAgICAgICAgICBpZihpbnN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGluc3RhbmNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBpbnN0YW5jZU1hcFttdWx0aXRvbktleV0gPSBuZXcgQXBwRmFjYWRlKG11bHRpdG9uS2V5KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIE5BTUU6ICdBcHBGYWNhZGUnXHJcbiAgICB9XHJcbik7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgQXJ0aHVyIG9uIDIwMTQvMTIvMTQuXHJcbiAqL1xyXG5cclxudmFyIHB1cmVtdmMgPSByZXF1aXJlKCdwdXJlbXZjJykucHVyZW12YztcclxudmFyIFByZXBDb250cm9sbGVyQ29tbWFuZCA9IHJlcXVpcmUoJy4vcHJlcENvbnRyb2xsZXJDb21tYW5kLmpzJyk7XHJcbnZhciBQcmVwTW9kZWxDb21tYW5kID0gcmVxdWlyZSgnLi9wcmVwTW9kZWxDb21tYW5kLmpzJyk7XHJcbnZhciBQcmVwVmlld0NvbW1hbmQgPSByZXF1aXJlKCcuL3ByZXBWaWV3Q29tbWFuZC5qcycpO1xyXG52YXIgSG9tZUNvbW1hbmQgPSByZXF1aXJlKCcuL2hvbWVDb21tYW5kLmpzJyk7XHJcbnZhciBjb25zdGFudHMgPSByZXF1aXJlKCcuLi8uLi9hcHBDb25zdGFudHMuanMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcHVyZW12Yy5kZWZpbmUoe1xyXG4gICAgICAgIG5hbWU6ICdmaWdodGVyLmNvbnRyb2xsZXIuY29tbWFuZC5TdGFydHVwQ29tbWFuZCcsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLk1hY3JvQ29tbWFuZFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWRkIHRoZSBzdWItY29tbWFuZHMgZm9yIHRoaXMgTWFjcm9Db21tYW5kXHJcbiAgICAgICAgICogQG92ZXJyaWRlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaW5pdGlhbGl6ZU1hY3JvQ29tbWFuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjYy5sb2coJ3N0YXJ0IGNvbW1hbmQgaW5pdCcpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZFN1YkNvbW1hbmQoIFByZXBDb250cm9sbGVyQ29tbWFuZCApO1xyXG4gICAgICAgICAgICB0aGlzLmFkZFN1YkNvbW1hbmQoIFByZXBNb2RlbENvbW1hbmQgKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRTdWJDb21tYW5kKCBQcmVwVmlld0NvbW1hbmQgKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRTdWJDb21tYW5kKCBIb21lQ29tbWFuZCApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuKTtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgQXJ0aHVyIG9uIDIwMTQvMTIvMjEuXHJcbiAqL1xyXG5cclxudmFyIHB1cmVtdmMgPSByZXF1aXJlKCdwdXJlbXZjJykucHVyZW12YztcclxudmFyIGNvbnN0YW50cyA9IHJlcXVpcmUoJy4uLy4uL2FwcENvbnN0YW50cy5qcycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBwdXJlbXZjLmRlZmluZSh7XHJcbiAgICAgICAgbmFtZTogJ2ZpZ2h0ZXIuY29udHJvbGxlci5jb21tYW5kLkhvbWVDb21tYW5kJyxcclxuICAgICAgICBwYXJlbnQ6IHB1cmVtdmMuU2ltcGxlQ29tbWFuZFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVnaXN0ZXIgQ29tbWFuZHMgd2l0aCB0aGUgQ29udHJvbGxlclxyXG4gICAgICAgICAqIEBvdmVycmlkZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGV4ZWN1dGU6IGZ1bmN0aW9uIChub3RlKSB7XHJcbiAgICAgICAgICAgIC8vIFRoaXMgcmVnaXN0ZXJzIG11bHRpcGxlIG5vdGVzIHRvIGEgc2luZ2xlIGNvbW1hbmQgd2hpY2ggcGVyZm9ybXMgZGlmZmVyZW50IGxvZ2ljIGJhc2VkIG9uIHRoZSBub3RlIG5hbWUuXHJcbiAgICAgICAgICAgIC8vIEluIGEgbW9yZSBjb21wbGV4IGFwcCwgd2UnZCB1c3VhbGx5IGJlIHJlZ2lzdGVyaW5nIGEgZGlmZmVyZW50IGNvbW1hbmQgdG8gZWFjaCBub3RpZmljYXRpb24gbmFtZS5cclxuICAgICAgICAgICAgY2MubG9nKCdIb21lQ29tbWFuZCBleGVjdXRlJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZmFjYWRlLnNlbmROb3RpZmljYXRpb24oY29uc3RhbnRzLlNDRU5FX0FDVElPTiwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogY29uc3RhbnRzLlNDRU5FLkhPTUVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4pO1xyXG5cclxuXHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFydGh1ciBvbiAyMDE0LzEyLzE0LlxyXG4gKi9cclxudmFyIHB1cmVtdmMgPSByZXF1aXJlKCdwdXJlbXZjJykucHVyZW12YztcclxudmFyIGNvbnN0YW50cyA9IHJlcXVpcmUoJy4uLy4uL2FwcENvbnN0YW50cy5qcycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBwdXJlbXZjLmRlZmluZSh7XHJcbiAgICAgICAgbmFtZTogJ2ZpZ2h0ZXIuY29udHJvbGxlci5jb21tYW5kLlByZXBDb250cm9sbGVyQ29tbWFuZCcsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLlNpbXBsZUNvbW1hbmRcclxuICAgIH0sXHJcblxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlZ2lzdGVyIENvbW1hbmRzIHdpdGggdGhlIENvbnRyb2xsZXJcclxuICAgICAgICAgKiBAb3ZlcnJpZGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBleGVjdXRlOiBmdW5jdGlvbiAobm90ZSkge1xyXG4gICAgICAgICAgICAvLyBUaGlzIHJlZ2lzdGVycyBtdWx0aXBsZSBub3RlcyB0byBhIHNpbmdsZSBjb21tYW5kIHdoaWNoIHBlcmZvcm1zIGRpZmZlcmVudCBsb2dpYyBiYXNlZCBvbiB0aGUgbm90ZSBuYW1lLlxyXG4gICAgICAgICAgICAvLyBJbiBhIG1vcmUgY29tcGxleCBhcHAsIHdlJ2QgdXN1YWxseSBiZSByZWdpc3RlcmluZyBhIGRpZmZlcmVudCBjb21tYW5kIHRvIGVhY2ggbm90aWZpY2F0aW9uIG5hbWUuXHJcbiAgICAgICAgICAgIGNjLmxvZygnUHJlcENvbnRyb2xsZXJDb21tYW5kIGV4ZWN1dGUnKTtcclxuXHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuKTsiLCIvKipcclxuICogQ3JlYXRlZCBieSBBcnRodXIgb24gMjAxNC8xMi8xNC5cclxuICovXHJcbnZhciBwdXJlbXZjID0gcmVxdWlyZSgncHVyZW12YycpLnB1cmVtdmM7XHJcbnZhciBQbGF5ZXJQcm94eSA9IHJlcXVpcmUoJy4uLy4uL21vZGVsL3Byb3h5L3BsYXllclByb3h5LmpzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHB1cmVtdmMuZGVmaW5lKHtcclxuICAgICAgICBuYW1lOiAnZmlnaHRlci5jb250cm9sbGVyLmNvbW1hbmQuUHJlcE1vZGVsQ29tbWFuZCcsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLlNpbXBsZUNvbW1hbmRcclxuICAgIH0sXHJcblxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlZ2lzdGVyIFByb3hpZXMgd2l0aCB0aGUgTW9kZWxcclxuICAgICAgICAgKiBAb3ZlcnJpZGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBleGVjdXRlOiBmdW5jdGlvbiAobm90ZSkge1xyXG4gICAgICAgICAgICBjYy5sb2coJ1ByZXBNb2RlbENvbW1hbmQgZXhlY3V0ZScpO1xyXG4gICAgICAgICAgICB0aGlzLmZhY2FkZS5yZWdpc3RlclByb3h5KG5ldyBQbGF5ZXJQcm94eSgpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFydGh1ciBvbiAyMDE0LzEyLzE0LlxyXG4gKi9cclxudmFyIHB1cmVtdmMgPSByZXF1aXJlKCdwdXJlbXZjJykucHVyZW12YztcclxudmFyIERpcmVjdG9yTWVkaWF0b3IgPSByZXF1aXJlKCcuLi8uLi92aWV3L21lZGlhdG9yL2RpcmVjdG9yTWVkaWF0b3IuanMnKTtcclxudmFyIEhvbWVNZWRpYXRvciA9IHJlcXVpcmUoJy4uLy4uL3ZpZXcvbWVkaWF0b3IvaG9tZU1lZGlhdG9yLmpzJyk7XHJcbnZhciBTY2VuZU1lZGlhdG9yID0gcmVxdWlyZSgnLi4vLi4vdmlldy9tZWRpYXRvci9zY2VuZU1lZGlhdG9yLmpzJyk7XHJcbnZhciBUcmFpbk1lZGlhdG9yID0gcmVxdWlyZSgnLi4vLi4vdmlldy9tZWRpYXRvci90cmFpbk1lZGlhdG9yLmpzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHB1cmVtdmMuZGVmaW5lICh7XHJcbiAgICAgICAgbmFtZTogJ2ZpZ2h0ZXIuY29udHJvbGxlci5jb21tYW5kLlByZXBWaWV3Q29tbWFuZCcsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLlNpbXBsZUNvbW1hbmRcclxuICAgIH0sXHJcblxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlZ2lzdGVyIE1lZGlhdG9ycyB3aXRoIHRoZSBWaWV3XHJcbiAgICAgICAgICogQG92ZXJyaWRlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZXhlY3V0ZTogZnVuY3Rpb24gKG5vdGUpIHtcclxuICAgICAgICAgICAgY2MubG9nKCdQcmVwVmlld0NvbW1hbmQgZXhlY3V0ZScpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5mYWNhZGUucmVnaXN0ZXJNZWRpYXRvcihuZXcgRGlyZWN0b3JNZWRpYXRvcigpKTtcclxuICAgICAgICAgICAgdGhpcy5mYWNhZGUucmVnaXN0ZXJNZWRpYXRvcihuZXcgU2NlbmVNZWRpYXRvcigpKTtcclxuICAgICAgICAgICAgdGhpcy5mYWNhZGUucmVnaXN0ZXJNZWRpYXRvcihuZXcgSG9tZU1lZGlhdG9yKCkpO1xyXG4gICAgICAgICAgICB0aGlzLmZhY2FkZS5yZWdpc3Rlck1lZGlhdG9yKG5ldyBUcmFpbk1lZGlhdG9yKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuKTtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgd2l0aCBKZXRCcmFpbnMgV2ViU3Rvcm0uXHJcbiAqIFVzZXI6IGxjYzM1MzZcclxuICogRGF0ZTogMTMtNy05XHJcbiAqIFRpbWU6IOS4i+WNiDU6MjRcclxuICogVG8gY2hhbmdlIHRoaXMgdGVtcGxhdGUgdXNlIEZpbGUgfCBTZXR0aW5ncyB8IEZpbGUgVGVtcGxhdGVzLlxyXG4gKi9cclxuXHJcblxyXG4vKlxyXG4gKiBlbnRpdHlcclxuICogKi9cclxuXHJcbnZhciBFdmVudCA9IHJlcXVpcmUoJy4uLy4uL3V0aWwvZXZlbnQuanMnKTtcclxuXHJcbnZhciBFbnRpdHkgPSBtb2R1bGUuZXhwb3J0cyA9IEV2ZW50LmV4dGVuZCh7XHJcblx0c2V0OiBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcclxuXHRcdGlmICh0eXBlb2YgdmFsdWUgIT0gXCJ1bmRlZmluZWRcIikge1xyXG5cdFx0XHRpZiAodGhpc1tcIl9cIiArIG5hbWVdICE9PSB2YWx1ZSkge1xyXG5cdFx0XHRcdHRoaXNbXCJfXCIgKyBuYW1lXSA9IHZhbHVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLmVtaXQobmFtZSArIFwiQ2hhbmdlXCIpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdHNldHM6IGZ1bmN0aW9uIChhdHRycykge1xyXG5cdFx0dmFyIGtleTtcclxuXHJcblx0XHRmb3IgKGtleSBpbiBhdHRycykge1xyXG5cdFx0XHR0aGlzLnNldChrZXksIGF0dHJzW2tleV0pO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGFkZDogZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XHJcblx0XHRpZiAodHlwZW9mIHZhbHVlICE9IFwidW5kZWZpbmVkXCIpIHtcclxuXHRcdFx0aWYgKHZhbHVlKSB7XHJcblx0XHRcdFx0dGhpcy5zZXQobmFtZSwgdGhpc1tcIl9cIiArIG5hbWVdICsgdmFsdWUpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0YWRkczogZnVuY3Rpb24gKGF0dHJzKSB7XHJcblx0XHR2YXIga2V5O1xyXG5cclxuXHRcdGZvciAoa2V5IGluIGF0dHJzKSB7XHJcblx0XHRcdHRoaXMuYWRkKGtleSwgYXR0cnNba2V5XSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0Z2V0OiBmdW5jdGlvbiAobmFtZSkge1xyXG5cdFx0cmV0dXJuIHRoaXNbXCJfXCIgKyBuYW1lXTtcclxuXHR9LFxyXG5cclxuXHRoYXM6IGZ1bmN0aW9uIChuYW1lKSB7XHJcblx0XHRyZXR1cm4gKHR5cGVvZiAodGhpc1tcIl9cIiArIG5hbWVdKSAhPSBcInVuZGVmaW5lZFwiKTtcclxuXHR9LFxyXG5cclxuXHRzY2hlZHVsZTogZnVuY3Rpb24gKGZuLCBpbnRlcnZhbCwgcmVwZWF0LCBkZWxheSkge1xyXG5cdFx0aW50ZXJ2YWwgPSBpbnRlcnZhbCB8fCAwO1xyXG5cdFx0cmVwZWF0ID0gKHJlcGVhdCA9PSBudWxsKSA/IGNjLlJFUEVBVF9GT1JFVkVSIDogcmVwZWF0O1xyXG5cdFx0ZGVsYXkgPSBkZWxheSB8fCAwO1xyXG5cclxuXHRcdGNjLkRpcmVjdG9yLmdldEluc3RhbmNlKCkuZ2V0U2NoZWR1bGVyKCkuc2NoZWR1bGVDYWxsYmFja0ZvclRhcmdldCh0aGlzLCBmbiwgaW50ZXJ2YWwsIHJlcGVhdCwgZGVsYXksIGZhbHNlKTtcclxuXHR9LFxyXG5cclxuXHRzY2hlZHVsZU9uY2U6IGZ1bmN0aW9uIChmbiwgZGVsYXkpIHtcclxuXHRcdHRoaXMuc2NoZWR1bGUoZm4sIDAuMCwgMCwgZGVsYXkpO1xyXG5cdH0sXHJcblxyXG5cdHVuc2NoZWR1bGU6IGZ1bmN0aW9uIChmbikge1xyXG5cdFx0Ly8gZXhwbGljaXQgbmlsIGhhbmRsaW5nXHJcblx0XHRjYy5EaXJlY3Rvci5nZXRJbnN0YW5jZSgpLmdldFNjaGVkdWxlcigpLnVuc2NoZWR1bGVDYWxsYmFja0ZvclRhcmdldCh0aGlzLCBmbik7XHJcblx0fSxcclxuXHJcblx0dW5zY2hlZHVsZUFsbENhbGxiYWNrczogZnVuY3Rpb24gKCkge1xyXG5cdFx0Y2MuRGlyZWN0b3IuZ2V0SW5zdGFuY2UoKS5nZXRTY2hlZHVsZXIoKS51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzRm9yVGFyZ2V0KHRoaXMpO1xyXG5cdH1cclxufSk7XHJcbiIsInZhciBFbnRpdHkgPSByZXF1aXJlKCcuL2VudGl0eS5qcycpO1xyXG5cclxudmFyIFBsYXllciA9IG1vZHVsZS5leHBvcnRzID0gRW50aXR5LmV4dGVuZCh7XHJcblx0X2lkOiAwLFxyXG5cdF9uYW1lOiBcIlwiLFxyXG5cdF9waG90bzogXCJcIixcclxuXHRfZ29sZDogMCxcclxuXHRcclxuXHRfaHA6IDAsXHJcblx0X2F0azogMCxcclxuXHRfZGVmZW5zZTogMCxcclxuXHRfdW5kZWZlbnNlOiAwLFxyXG5cdF9jcml0OiAwLFxyXG5cdF91bmNyaXQ6IDAsXHJcblx0X2RvZGdlOiAwLFxyXG5cdF9oaXQ6IDAsXHRcclxuXHJcbiAgICBjdG9yOiBmdW5jdGlvbihhdHRycykge1xyXG4gICAgICAgIHRoaXMuc2V0cyhhdHRycyk7XHJcbiAgICB9XHJcbn0pOyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFydGh1ciBvbiAyMDE0LzEyLzI2LlxyXG4gKi9cclxudmFyIHB1cmVtdmMgPSByZXF1aXJlKCdwdXJlbXZjJykucHVyZW12YztcclxudmFyIFBsYXllciA9IHJlcXVpcmUoJy4uL2VudGl0eS9wbGF5ZXIuanMnKTtcclxuXHJcbnZhciBQbGF5ZXJQcm94eSA9IG1vZHVsZS5leHBvcnRzID0gcHVyZW12Yy5kZWZpbmUoe1xyXG4gICAgICAgIG5hbWU6ICdmaWd0aGVyLm1vZGVsLnByb3h5LlBsYXllclByb3h5JyxcclxuICAgICAgICBwYXJlbnQ6IHB1cmVtdmMuUHJveHksXHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcHVyZW12Yy5Qcm94eS5jYWxsKHRoaXMsIHRoaXMuY29uc3RydWN0b3IuTkFNRSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEobmV3IFBsYXllcih7XHJcbiAgICAgICAgICAgICAgICBpZDogMSxcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwi5oiR5a625rKh5Lq6XCIsXHJcbiAgICAgICAgICAgICAgICBwaG90bzogXCJcIixcclxuICAgICAgICAgICAgICAgIGdvbGQ6IDEyOTM3LFxyXG5cclxuICAgICAgICAgICAgICAgIGhwOiAzMDIwMDQsXHJcbiAgICAgICAgICAgICAgICBhdGs6IDQwOTMwLFxyXG4gICAgICAgICAgICAgICAgZGVmZW5jZTogMjkzNDIsXHJcbiAgICAgICAgICAgICAgICB1bmRlZmVuY2U6IDEyMzQxLFxyXG4gICAgICAgICAgICAgICAgY3JpdDogMzAsXHJcbiAgICAgICAgICAgICAgICB1bmNyaXQ6IDEwLFxyXG4gICAgICAgICAgICAgICAgZG9kZ2U6IDIwLFxyXG4gICAgICAgICAgICAgICAgaGl0OiAxMFxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICB7XHJcblxyXG4gICAgICAgIGdldFBsYXllcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGE7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdXBkYXRlUGxheWVyOiBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5zZXQobmFtZSwgdmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICB7XHJcbiAgICAgICAgTkFNRTogJ1BsYXllclByb3h5J1xyXG4gICAgfVxyXG4pOyIsInZhciByZXMgPSB7XHJcbiAgICBhZGRfanBnOiBcInJlcy9pbWFnZXMvYWRkLmpwZ1wiLFxyXG4gICAgYnRuMV9qcGc6IFwicmVzL2ltYWdlcy9idG4xLmpwZ1wiLFxyXG5cclxuICAgIGJ0bjNfcG5nOiBcInJlcy9pbWFnZXMvYnRuMy5qcGdcIixcclxuICAgIGJ0bjVfcG5nOiBcInJlcy9pbWFnZXMvYnRuNS5qcGdcIixcclxuICAgIGJ0bjdfanBnOiBcInJlcy9pbWFnZXMvYnRuNy5qcGdcIixcclxuXHJcbiAgICBpbWcxX3BuZzogXCJyZXMvaW1hZ2VzL2ltZzEuanBnXCIsXHJcbiAgICBpbWc1X2pwZzogXCJyZXMvaW1hZ2VzL2ltZzUuanBnXCIsXHJcbiAgICBpbWc2X2pwZzogXCJyZXMvaW1hZ2VzL2ltZzYuanBnXCIsXHJcbiAgICB0eHRfYmcxX2pwZzogXCJyZXMvaW1hZ2VzL3R4dF9iZzEuanBnXCIsXHJcblxyXG5cclxuICAgIE1haW5Ob2RlOiBcInJlcy9NYWluU2NlbmUuY3NiXCIsXHJcbiAgICBUYXNrTm9kZTogXCJyZXMvVGFza05vZGUuY3NiXCIsXHJcbiAgICBUcmFpbk5vZGU6IFwicmVzL1RyYWluTm9kZS5jc2JcIlxyXG5cclxufTtcclxuXHJcbnZhciBnX3Jlc291cmNlcyA9IFtdO1xyXG5mb3IgKHZhciBpIGluIHJlcykge1xyXG4gICAgZ19yZXNvdXJjZXMucHVzaChyZXNbaV0pO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5yZXMgPSByZXM7XHJcbm1vZHVsZS5leHBvcnRzLmdfcmVzb3VjZXMgPSBnX3Jlc291cmNlczsiLCIvKipcclxuICogQ3JlYXRlZCB3aXRoIEpldEJyYWlucyBXZWJTdG9ybS5cclxuICogVXNlcjogbGNjMzUzNlxyXG4gKiBEYXRlOiAxMy0xMC0xOFxyXG4gKiBUaW1lOiDkuIvljYgyOjU2XHJcbiAqIFRvIGNoYW5nZSB0aGlzIHRlbXBsYXRlIHVzZSBGaWxlIHwgU2V0dGluZ3MgfCBGaWxlIFRlbXBsYXRlcy5cclxuICovXHJcblxyXG5cclxuLypcclxuICogZXZlbnRcclxuICogKi9cclxuXHJcbnZhciBFdmVudCA9IG1vZHVsZS5leHBvcnRzID0gY2MuQ2xhc3MuZXh0ZW5kKHtcclxuICAgIF9jYWxsYmFjazoge30sXHJcblxyXG4gICAgb246IGZ1bmN0aW9uIChldmVudCwgZm4pIHtcclxuICAgICAgICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XHJcbiAgICAgICAgKHRoaXMuX2NhbGxiYWNrc1tldmVudF0gPSB0aGlzLl9jYWxsYmFja3NbZXZlbnRdIHx8IFtdKVxyXG4gICAgICAgICAgICAucHVzaChmbik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uY2U6IGZ1bmN0aW9uIChldmVudCwgZm4pIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBvbigpIHtcclxuICAgICAgICAgICAgc2VsZi5vZmYoZXZlbnQsIG9uKTtcclxuICAgICAgICAgICAgZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZuLl9vZmYgPSBvbjtcclxuICAgICAgICB0aGlzLm9uKGV2ZW50LCBvbik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBhZGRMaXN0ZW5lcjogZnVuY3Rpb24oZXZlbnQsIGZuKSB7XHJcbiAgICBcdHRoaXMub24oZXZlbnQsIGZuKTtcclxuICAgIH0sXHJcblxyXG4gICAgcmVtb3ZlTGlzdGVuZXI6IGZ1bmN0aW9uIChldmVudCwgZm4pIHtcclxuICAgICAgICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XHJcblxyXG4gICAgICAgIC8vIGFsbFxyXG4gICAgICAgIGlmICgwID09IGFyZ3VtZW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5fY2FsbGJhY2tzID0ge307XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gc3BlY2lmaWMgZXZlbnRcclxuICAgICAgICB2YXIgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzW2V2ZW50XTtcclxuICAgICAgICBpZiAoIWNhbGxiYWNrcykgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgICAgIC8vIHJlbW92ZSBhbGwgaGFuZGxlcnNcclxuICAgICAgICBpZiAoMSA9PSBhcmd1bWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9jYWxsYmFja3NbZXZlbnRdO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHJlbW92ZSBzcGVjaWZpYyBoYW5kbGVyXHJcbiAgICAgICAgdmFyIGkgPSB0aGlzLl9pbmRleE9mKGNhbGxiYWNrcywgZm4uX29mZiB8fCBmbik7XHJcbiAgICAgICAgaWYgKH5pKSBjYWxsYmFja3Muc3BsaWNlKGksIDEpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuICAgIFxyXG4gICAgcmVtb3ZlTGlzdGVuZXJzOiBmdW5jdGlvbigpIHtcclxuICAgIFx0dGhpcy5fY2FsbGJhY2sgPSB7fTtcclxuICAgIH0sXHJcblxyXG4gICAgZW1pdDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xyXG4gICAgICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXHJcbiAgICAgICAgdmFyIGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrc1tldmVudF07XHJcblxyXG4gICAgICAgIGlmIChjYWxsYmFja3MpIHtcclxuICAgICAgICAgICAgY2FsbGJhY2tzID0gY2FsbGJhY2tzLnNsaWNlKDApO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gY2FsbGJhY2tzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFja3NbaV0uYXBwbHkodGhpcywgYXJncyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBsaXN0ZW5lcnM6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY2FsbGJhY2tzW2V2ZW50XSB8fCBbXTtcclxuICAgIH0sXHJcblxyXG4gICAgaGFzTGlzdGVuZXJzOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICByZXR1cm4gISF0aGlzLmxpc3RlbmVycyhldmVudCkubGVuZ3RoO1xyXG4gICAgfSxcclxuXHJcbiAgICBfaW5kZXhPZjogZnVuY3Rpb24gKGFyciwgb2JqKSB7XHJcbiAgICAgICAgaWYgKGFyci5pbmRleE9mKSByZXR1cm4gYXJyLmluZGV4T2Yob2JqKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICBpZiAoYXJyW2ldID09PSBvYmopIHJldHVybiBpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICB9XHJcbn0pO1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBBcnRodXIgb24gMjAxNC8xMi8yOS5cclxuICovXHJcblxyXG52YXIgVHJhaW5JdGVtQ29udHJvbGxlciA9IG1vZHVsZS5leHBvcnRzID0gIGNjcy5Db21Db250cm9sbGVyLmV4dGVuZCh7XHJcbiAgICBjdG9yOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLl9zdXBlcigpO1xyXG4gICAgICAgIHRoaXMuX25hbWUgPSAnVHJhaW5JdGVtQ29udHJvbGxlcic7XHJcbiAgICAgICAgdGhpcy5ERUZBVUxUX0NPVU5UID0gMTAwO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbihuYW1lLCBwb3MpIHtcclxuICAgICAgICB0aGlzLl90YXNrTmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5fcG9zaXRpb24gPSBwb3M7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uRW50ZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9wb3NpdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLmdldE93bmVyKCkuc2V0UG9zaXRpb24odGhpcy5fcG9zaXRpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGJ0bl9zdGFydCA9IHRoaXMuX2J0bl9zdGFydCA9IHRoaXMuZ2V0T3duZXIoKS5nZXRDaGlsZEJ5TmFtZSgnYnRuX3N0YXJ0X3Rhc2snKTtcclxuICAgICAgICBidG5fc3RhcnQuc2V0VGl0bGVUZXh0KCflvIDlp4vku7vliqEnKTtcclxuICAgICAgICBidG5fc3RhcnQuc2V0VGl0bGVGb250U2l6ZSgyMCk7XHJcbiAgICAgICAgYnRuX3N0YXJ0LmFkZENsaWNrRXZlbnRMaXN0ZW5lcih0aGlzLnN0YXJ0TGlzdGVuZXIuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgICAgIHZhciBidG5fYWRkX2NvdW50ID0gdGhpcy5fYnRuX2FkZF9jb3VudCA9IHRoaXMuZ2V0T3duZXIoKS5nZXRDaGlsZEJ5TmFtZSgnYnRuX2NvdW50X2FkZCcpO1xyXG4gICAgICAgIGJ0bl9hZGRfY291bnQuYWRkQ2xpY2tFdmVudExpc3RlbmVyKHRoaXMuYWRkQ291bmRMaXN0ZW5lci5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgdGhpcy5fY291bnQgPSB0aGlzLmdldE93bmVyKCkuZ2V0Q2hpbGRCeU5hbWUoJ2NvdW50X3ZhbHVlJyk7XHJcbiAgICAgICAgdGhpcy5fY291bnQuc2V0U3RyaW5nKHRoaXMuREVGQVVMVF9DT1VOVCk7XHJcbiAgICAgICAgdGhpcy5fY291bnQuYXR0cih7YW5jaG9yWDogMCwgYW5jaG9yWTogMC41fSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3Rhc2tfbmFtZSA9IHRoaXMuZ2V0T3duZXIoKS5nZXRDaGlsZEJ5TmFtZSgndGFza19uYW1lJyk7XHJcbiAgICAgICAgdGhpcy5fdGFza19uYW1lLmF0dHIoe2FuY2hvclg6IDAsIGFuY2hvclk6IDAuNX0pO1xyXG4gICAgICAgIHRoaXMuX3Rhc2tfbmFtZS5zZXRTdHJpbmcodGhpcy5fdGFza05hbWUpO1xyXG5cclxuICAgICAgICB2YXIgdHh0X3Rhc2tfZGVzYyA9IHRoaXMuX3R4dF90YXNrX2Rlc2MgPSB0aGlzLmdldE93bmVyKCkuZ2V0Q2hpbGRCeU5hbWUoJ3R4dF90YXNrX2Rlc2MnKTtcclxuICAgICAgICB0eHRfdGFza19kZXNjLmF0dHIoe2FuY2hvclg6IDAsIGFuY2hvclk6IDAuNX0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydExpc3RlbmVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLl9idG5fc3RhcnQuc2V0VGl0bGVUZXh0KCfov5vooYzkuK0uLi4nKTtcclxuICAgICAgICB0aGlzLnNldFRhc2tEZXNjKCfku7vliqHov5vooYzkuK3vvIzlsIblnKgxMuS4quWwj+aXtuS5i+WQjuWujOaIkO+8gScpXHJcbiAgICB9LFxyXG5cclxuICAgIHNldFRhc2tEZXNjOiBmdW5jdGlvbih2YWwpIHtcclxuICAgICAgICB0aGlzLl90eHRfdGFza19kZXNjLnNldFN0cmluZyh2YWwpO1xyXG4gICAgfSxcclxuXHJcbiAgICBhZGRDb3VuZExpc3RlbmVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLl9jb3VudC5zZXRTdHJpbmcocGFyc2VJbnQodGhpcy5fY291bnQuZ2V0U3RyaW5nKCkpICsgMSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHJlZHVjZUNvdW50TGlzdGVuZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIH1cclxufSk7XHJcblxyXG5UcmFpbkl0ZW1Db250cm9sbGVyLmNyZWF0ZSA9IGZ1bmN0aW9uKG5hbWUsIHBvcykge1xyXG4gICAgdmFyIGNvbiA9IG5ldyBUcmFpbkl0ZW1Db250cm9sbGVyKCk7XHJcbiAgICBjb24uaW5pdChuYW1lLCBwb3MpO1xyXG4gICAgcmV0dXJuIGNvbjtcclxufVxyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBBcnRodXIgb24gMjAxNC8xMi8yMC5cclxuICovXHJcbnZhciByZXMgPSByZXF1aXJlKCcuLi8uLi9yZXNvdXJjZS5qcycpLnJlcztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY2MuTGF5ZXIuZXh0ZW5kKHtcclxuICAgIF9yb290Tm9kZTogbnVsbCxcclxuXHJcbiAgICBjdG9yOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLl9zdXBlcigpO1xyXG4gICAgICAgIHRoaXMuX3Jvb3ROb2RlID0gY2NzLmNzTG9hZGVyLmNyZWF0ZU5vZGUocmVzLk1haW5Ob2RlKTtcclxuICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMuX3Jvb3ROb2RlKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24ocGxheWVyKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGUocGxheWVyKTtcclxuXHJcbiAgICAgICAgdmFyIHJvb3ROb2RlID0gdGhpcy5fcm9vdE5vZGU7XHJcbiAgICAgICAgdmFyIGJ0bl90cmFpbiA9IHJvb3ROb2RlLmdldENoaWxkQnlOYW1lKCdtYWluX3BhbmVsJykuZ2V0Q2hpbGRCeU5hbWUoJ2J0bl90cmFpbicpO1xyXG4gICAgICAgIGJ0bl90cmFpbi5hZGRDbGlja0V2ZW50TGlzdGVuZXIodGhpcy5idXR0b25UcmFpbkxpc3RlbmVyLmJpbmQodGhpcykpO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uKHBsYXllcikge1xyXG4gICAgICAgIHZhciBub2RlID0gdGhpcy5fcm9vdE5vZGU7XHJcbiAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZSgndHh0X2dvbGQnKS5zZXRTdHJpbmcocGxheWVyLmdldCgnZ29sZCcpKTtcclxuXHJcbiAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZSgnbWFpbl9wYW5lbCcpLmdldENoaWxkQnlOYW1lKCd0eHRfaHAnKS5zZXRTdHJpbmcocGxheWVyLmdldCgnaHAnKSk7XHJcbiAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZSgnbWFpbl9wYW5lbCcpLmdldENoaWxkQnlOYW1lKCd0eHRfYXRrJykuc2V0U3RyaW5nKHBsYXllci5nZXQoJ2F0aycpKTtcclxuICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCdtYWluX3BhbmVsJykuZ2V0Q2hpbGRCeU5hbWUoJ3R4dF9kZWZlbmNlJykuc2V0U3RyaW5nKHBsYXllci5nZXQoJ2RlZmVuY2UnKSk7XHJcbiAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZSgnbWFpbl9wYW5lbCcpLmdldENoaWxkQnlOYW1lKCd0eHRfdW5kZWZlbmNlJykuc2V0U3RyaW5nKHBsYXllci5nZXQoJ3VuZGVmZW5jZScpKTtcclxuICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCdtYWluX3BhbmVsJykuZ2V0Q2hpbGRCeU5hbWUoJ3R4dF9jcml0Jykuc2V0U3RyaW5nKHBsYXllci5nZXQoJ2NyaXQnKSk7XHJcbiAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZSgnbWFpbl9wYW5lbCcpLmdldENoaWxkQnlOYW1lKCd0eHRfdW5jcml0Jykuc2V0U3RyaW5nKHBsYXllci5nZXQoJ3VuY3JpdCcpKTtcclxuICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCdtYWluX3BhbmVsJykuZ2V0Q2hpbGRCeU5hbWUoJ3R4dF9kb2dldCcpLnNldFN0cmluZyhwbGF5ZXIuZ2V0KCdkb2dldCcpKTtcclxuICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCdtYWluX3BhbmVsJykuZ2V0Q2hpbGRCeU5hbWUoJ3R4dF9oaXQnKS5zZXRTdHJpbmcocGxheWVyLmdldCgnaGl0JykpO1xyXG4gICAgfSxcclxuXHJcbiAgICBidXR0b25UcmFpbkxpc3RlbmVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAodGhpcy5vblRyYWluKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25UcmFpbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgQXJ0aHVyIG9uIDIwMTQvMTIvMjEuXHJcbiAqL1xyXG52YXIgcmVzID0gcmVxdWlyZSgnLi4vLi4vcmVzb3VyY2UuanMnKS5yZXM7XHJcbnZhciBUcmFpbkl0ZW1Db250cm9sbGVyID0gcmVxdWlyZSgnLi9jb250cm9sbGVyL3RyYWluSXRlbScpO1xyXG5cclxudmFyIHRhc2tzID0gW1wi55Sf5ZG9XCIsIFwi5pS75Ye7XCIsIFwi6Ziy5b6hXCIsIFwi56C06ZiyXCIsIFwi5pq05Ye7XCIsIFwi6Z+n5oCnXCIsIFwi6Zeq6YG/XCIsIFwi5ZG95LitXCJdO1xyXG52YXIgREVGQVVMVF9DT1VOVCA9IDEwMDtcclxubW9kdWxlLmV4cG9ydHMgPSBjYy5MYXllci5leHRlbmQoe1xyXG4gICAgY3RvcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5fc3VwZXIoKTtcclxuICAgICAgICB2YXIgdHJhaW5Ob2RlID0gY2NzLmNzTG9hZGVyLmNyZWF0ZU5vZGUocmVzLlRyYWluTm9kZSk7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0cmFpbk5vZGUpO1xyXG5cclxuICAgICAgICB2YXIgYnRuX2JhY2sgPSB0cmFpbk5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ1BhbmVsXzEnKS5nZXRDaGlsZEJ5TmFtZSgnYnRuX2JhY2snKTtcclxuICAgICAgICBidG5fYmFjay5hZGRDbGlja0V2ZW50TGlzdGVuZXIodGhpcy5vbkJhY2tMaXN0ZW5lci5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgdmFyIHNpemUgPSBjYy53aW5TaXplO1xyXG4gICAgICAgIHZhciBiYXNlWSA9IHNpemUuaGVpZ2h0Kjg0LzEwMDtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhc2tzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciB5ID0gYmFzZVkgLSAxMDAqKGkrMSk7XHJcbiAgICAgICAgICAgIHZhciB0YXNrTm9kZSA9IGNjcy5jc0xvYWRlci5jcmVhdGVOb2RlKHJlcy5UYXNrTm9kZSk7XHJcbiAgICAgICAgICAgIHRhc2tOb2RlLmFkZENvbXBvbmVudChUcmFpbkl0ZW1Db250cm9sbGVyLmNyZWF0ZSh0YXNrc1tpXSwgY2MucCgwLCB5KSkpO1xyXG4gICAgICAgICAgICB0cmFpbk5vZGUuYWRkQ2hpbGQodGFza05vZGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uQmFja0xpc3RlbmVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAodGhpcy5vbkJhY2spIHtcclxuICAgICAgICAgICAgdGhpcy5vbkJhY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pOyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFydGh1ciBvbiAyMDE0LzEyLzIxLlxyXG4gKi9cclxuXHJcbnZhciBwdXJlbXZjID0gcmVxdWlyZSgncHVyZW12YycpLnB1cmVtdmM7XHJcbnZhciBTY2VuZU1lZGlhdG9yID0gcmVxdWlyZSgnLi9zY2VuZU1lZGlhdG9yLmpzJyk7XHJcbnZhciBjb25zdGFudHMgPSByZXF1aXJlKCcuLi8uLi9hcHBDb25zdGFudHMuanMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcHVyZW12Yy5kZWZpbmUoXHJcbiAgICAvLyBDTEFTUyBJTkZPXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3ZpZXcubWVkaWF0b3IuRGlyZWN0b3JNZWRpYXRvcicsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLk1lZGlhdG9yLFxyXG4gICAgICAgIGNvbnN0cnVjdG9yOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcHVyZW12Yy5NZWRpYXRvci5jYWxsKHRoaXMsIHRoaXMuY29uc3RydWN0b3IuTkFNRSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICAvKiogQG92ZXJyaWRlICovXHJcbiAgICAgICAgbGlzdE5vdGlmaWNhdGlvbkludGVyZXN0czogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICAgICAgY29uc3RhbnRzLk5PVElGSUNBVElPTi5TQ0VORV9DSEFOR0VEXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqIEBvdmVycmlkZSAqL1xyXG4gICAgICAgIGhhbmRsZU5vdGlmaWNhdGlvbjogZnVuY3Rpb24gKG5vdGlmaWNhdGlvbikge1xyXG4gICAgICAgICAgICBjYy5sb2coJ2hhbmRsZXIgbm90aWZpY2F0aW9uIG9uIGRpcmVjdG9yIG1lZGlhdG9yJylcclxuICAgICAgICAgICAgc3dpdGNoIChub3RpZmljYXRpb24uZ2V0TmFtZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIGNvbnN0YW50cy5OT1RJRklDQVRJT04uU0NFTkVfQ0hBTkdFRDpcclxuICAgICAgICAgICAgICAgICAgICAvL2NjLmxvZygnU0NFTkVfQ0hBTkdFRCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2NlbmVNZWRpYXRvciA9IHRoaXMuZmFjYWRlLnJldHJpZXZlTWVkaWF0b3IoU2NlbmVNZWRpYXRvci5OQU1FICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNjZW5lTWVkaWF0b3IgJiYgc2NlbmVNZWRpYXRvci5nZXRWaWV3Q29tcG9uZW50KCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IucnVuU2NlbmUobmV3IGNjLlRyYW5zaXRpb25GYWRlKDEuMiwgc2NlbmVNZWRpYXRvci5nZXRWaWV3Q29tcG9uZW50KCkpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqIEBvdmVycmlkZSAqL1xyXG4gICAgICAgIG9uUmVnaXN0ZXI6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqIEBvdmVycmlkZSAqL1xyXG4gICAgICAgIG9uUmVtb3ZlOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6ICdEaXJlY3Rvck1lZGlhdG9yJ1xyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBBcnRodXIgb24gMjAxNC8xMi8yMC5cclxuICovXHJcbnZhciBwdXJlbXZjID0gcmVxdWlyZSgncHVyZW12YycpLnB1cmVtdmM7XHJcbnZhciBjb25zdGFudHMgPSByZXF1aXJlKCcuLi8uLi9hcHBDb25zdGFudHMuanMnKTtcclxudmFyIFBsYXllclByb3h5ID0gcmVxdWlyZSgnLi4vLi4vbW9kZWwvcHJveHkvcGxheWVyUHJveHkuanMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ2ZpZ2h0ZXIudmlldy5tZWRpYXRvci5Ib21lTWVkaWF0b3InLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5NZWRpYXRvclxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBpbnN0YW5jZSBtZW1iZXJzXHJcbiAgICB7XHJcbiAgICAgICAgLyoqIEBvdmVycmlkZSAqL1xyXG4gICAgICAgIGxpc3ROb3RpZmljYXRpb25JbnRlcmVzdHM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqIEBvdmVycmlkZSAqL1xyXG4gICAgICAgIGhhbmRsZU5vdGlmaWNhdGlvbjogZnVuY3Rpb24obm90ZSkge1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKiogQG92ZXJyaWRlICovXHJcbiAgICAgICAgb25SZWdpc3RlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKiBAb3ZlcnJpZGUgKi9cclxuICAgICAgICBvblJlbW92ZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXJQcm94eSA9IHRoaXMuZmFjYWRlLnJldHJpZXZlUHJveHkoUGxheWVyUHJveHkuTkFNRSk7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXJEYXRhID0gcGxheWVyUHJveHkuZ2V0UGxheWVyKCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgSG9tZUxheWVyID0gcmVxdWlyZSgnLi8uLi9jb21wb25lbnQvaG9tZUxheWVyLmpzJyk7XHJcbiAgICAgICAgICAgIHNlbGYudmlld0NvbXBvbmVudCA9IG5ldyBIb21lTGF5ZXIoKTtcclxuICAgICAgICAgICAgc2VsZi52aWV3Q29tcG9uZW50Lm9uVHJhaW4gPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zZW5kTm90aWZpY2F0aW9uKGNvbnN0YW50cy5TQ0VORV9BQ1RJT04sIHtuYW1lOiBjb25zdGFudHMuU0NFTkUuVFJBSU59KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgc2VsZi52aWV3Q29tcG9uZW50LmluaXQocGxheWVyRGF0YSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ2V0UmVzb3VyY2U6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBzdGF0aWMgbWVtYmVyc1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6ICdIb21lTWVkaWF0b3InXHJcbiAgICB9XHJcbikiLCIvKipcclxuICogQ3JlYXRlZCBieSBBcnRodXIgb24gMjAxNC8xMi8yMS5cclxuICovXHJcblxyXG52YXIgcHVyZW12YyA9IHJlcXVpcmUoJ3B1cmVtdmMnKS5wdXJlbXZjO1xyXG52YXIgY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vLi4vYXBwQ29uc3RhbnRzLmpzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHB1cmVtdmMuZGVmaW5lXHJcbihcclxuICAgIC8vIENMQVNTIElORk9cclxuICAgIHtcclxuICAgICAgICBuYW1lOiAnZmlnaHRlci52aWV3Lm1lZGlhdG9yLlNjZW5lTWVkaWF0b3InLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5NZWRpYXRvclxyXG4gICAgfSxcclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBfaW5pdGlhbGl6ZWQ6IGZhbHNlLFxyXG5cclxuICAgICAgICBsb2FkZXJJbWFnZTogXCJkYXRhOmltYWdlL2pwZWc7YmFzZTY0LC85ai80UUFZUlhocFpnQUFTVWtxQUFnQUFBQUFBQUFBQUFBQUFQL3NBQkZFZFdOcmVRQUJBQVFBQUFBbEFBRC80UU1wYUhSMGNEb3ZMMjV6TG1Ga2IySmxMbU52YlM5NFlYQXZNUzR3THdBOFAzaHdZV05yWlhRZ1ltVm5hVzQ5SXUrN3Z5SWdhV1E5SWxjMVRUQk5jRU5sYUdsSWVuSmxVM3BPVkdONmEyTTVaQ0kvUGlBOGVEcDRiWEJ0WlhSaElIaHRiRzV6T25nOUltRmtiMkpsT201ek9tMWxkR0V2SWlCNE9uaHRjSFJyUFNKQlpHOWlaU0JZVFZBZ1EyOXlaU0ExTGpBdFl6QTJNQ0EyTVM0eE16UTNOemNzSURJd01UQXZNREl2TVRJdE1UYzZNekk2TURBZ0lDQWdJQ0FnSUNJK0lEeHlaR1k2VWtSR0lIaHRiRzV6T25Ka1pqMGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNVGs1T1M4d01pOHlNaTF5WkdZdGMzbHVkR0Y0TFc1ekl5SStJRHh5WkdZNlJHVnpZM0pwY0hScGIyNGdjbVJtT21GaWIzVjBQU0lpSUhodGJHNXpPbmh0Y0UxTlBTSm9kSFJ3T2k4dmJuTXVZV1J2WW1VdVkyOXRMM2hoY0M4eExqQXZiVzB2SWlCNGJXeHVjenB6ZEZKbFpqMGlhSFIwY0RvdkwyNXpMbUZrYjJKbExtTnZiUzk0WVhBdk1TNHdMM05VZVhCbEwxSmxjMjkxY21ObFVtVm1JeUlnZUcxc2JuTTZlRzF3UFNKb2RIUndPaTh2Ym5NdVlXUnZZbVV1WTI5dEwzaGhjQzh4TGpBdklpQjRiWEJOVFRwRWIyTjFiV1Z1ZEVsRVBTSjRiWEF1Wkdsa09qTTRNREJFTURZMlFUVTFNakV4UlRGQlFUQXpRakV6TVVORk56TXhSa1F3SWlCNGJYQk5UVHBKYm5OMFlXNWpaVWxFUFNKNGJYQXVhV2xrT2pNNE1EQkVNRFkxUVRVMU1qRXhSVEZCUVRBelFqRXpNVU5GTnpNeFJrUXdJaUI0YlhBNlEzSmxZWFJ2Y2xSdmIydzlJa0ZrYjJKbElGQm9iM1J2YzJodmNDQkRVelVnVjJsdVpHOTNjeUkrSUR4NGJYQk5UVHBFWlhKcGRtVmtSbkp2YlNCemRGSmxaanBwYm5OMFlXNWpaVWxFUFNKNGJYQXVhV2xrT2tVMlJUazBPRU00T0VSQ05ERXhSVEU1TkVVeVJrRTNNME0zUWtFMU5UbEVJaUJ6ZEZKbFpqcGtiMk4xYldWdWRFbEVQU0o0YlhBdVpHbGtPa1UyUlRrME9FTTVPRVJDTkRFeFJURTVORVV5UmtFM00wTTNRa0UxTlRsRUlpOCtJRHd2Y21SbU9rUmxjMk55YVhCMGFXOXVQaUE4TDNKa1pqcFNSRVkrSUR3dmVEcDRiWEJ0WlhSaFBpQThQM2h3WVdOclpYUWdaVzVrUFNKeUlqOCsvKzRBRGtGa2IySmxBR1RBQUFBQUFmL2JBSVFBRFFrSkNRb0pEUW9LRFJNTUN3d1RGaEVORFJFV0doVVZGaFVWR2hrVUZoVVZGaFFaR1IwZklCOGRHU2NuS2lvbkp6azRPRGc1UUVCQVFFQkFRRUJBUUFFT0RBd09FQTRSRHc4UkZBNFJEaFFWRVJJU0VSVWZGUlVYRlJVZktCMFpHUmtaSFNnakppQWdJQ1lqTEN3b0tDd3NOemMxTnpkQVFFQkFRRUJBUUVCQS84QUFFUWdBeUFDZ0F3RWlBQUlSQVFNUkFmL0VBTEFBQUFFRkFRRUFBQUFBQUFBQUFBQUFBQVFBQWdNRkJnY0JBUUVBQXdFQkFBQUFBQUFBQUFBQUFBQUFBUU1FQWdVUUFBSUJBZ0lFQndvTEJnUUdBd0FBQUFFQ0F3QUVFUVVoTVJJR1FWRnhzVElURkdHQndkRWlRbEtTTXpXUm9lRmljcUt5STFOekZZSmpKRFFXQjlLalZDYnh3a05rSldYaWszUVJBQUlCQWdNRkJRY0RCUUVBQUFBQUFBQUJBaEVESVJJRU1VRlJjVEpod1ZJVUJaR2hzU0p5RXpPQjBVTGhZcElqVXhYLzJnQU1Bd0VBQWhFREVRQS9BTUpTcFVxQVZLbFh1RkFlVXE5d3BVQjVYdUZlNFY2b29EelpIRG94MENuR01pbnp3bDdaOE5hamFIZW9PM3ZtVEJaQnRwOVlVSXFURVY1Uk94SEtuV1JuYVU4VlJNaEZCVWpwVjdoU29TZVVxOXBVQjVTcjJsaFFIbEt2Y0s4b0JWN2hTRlNScnRhS0FaczA3WU5QTTFwRzJ4SklBdzFqU2VhbmRyeS84WDRtOFZDS2tXd2FXd2FtN1hsLzR2MVc4Vkx0bVgvaS9WYnhVb0trV3dha1NNNDA3dG1YL2kvVmJ4VW16R3dqUXNqZFk0MUlBUmllL1UwSWJaTzBrTnRDWG5PQ2tFQmVGdTRLSTNCczdETmIyN3lhK2pEeDNrSmVFbnBKSkVjUVZiV0RzazE3dTV1cmQ1OTF1Y1prV2h5bTJWbmQ5UmtDREVwRnhEUnBidzBidW51NW1scDJEZTJGTUxZWE9EMndCMnhiT2VyYVVjWUdKNzJtbFNVaXF6emR6TWQzWjNtaXhsdEEyeXpjSy9ObEhNMURReVJYY2UxSG9jZE5PRWZKWFo4OHk5Wm9qT3FoaUJzeklSaUhROFk0Y0s1VHZIdXpMbGpITk1xeE5vRGpMRnJhSEhualB4Y05DR1ZieEVVellOVHg1alpTeGhwVzZxVHpsd0orREN2TzJaZitMOVZ2RlNncXlIWU5MWU5UZHNzUHhmaWJ4VXUxNWY4QWkvVlBpcUNha093YTgyRFUvYTh2L0YrSnZGVERkV1BCTDhSOFZLQ3ZZUllWNVV6b01BeTZRZElJcUkwQjRLSnR4aVJRd291MTZRb0dVa250SDVUejBSYlpibUYyaGt0cmFTVkJvMmxVa1k4dER5ZTBmbFBQWFRzbFZVeWl5VlJzanFVT0E0eU1UOGRXMnJhbTJtNlVWVE5xOVM3RUl5VVZKeWRNVG4vNkRuUCtpbTlXbCtnNXovb3B2VnJwdGVFaFFXWTRBYVNUd0FWZjVXUGlaaC85UzUvemo3emx0emxtWVdrZldYTnZKREdUZ0djWURIaXJSN2k3bVNid1hQYXJzRk1yZ2I3dzZqS3cvd0NtbmM5STE0a0YzdnB2Q2xqYk15V01PSkw0YUVpQjhxVS9PYlVLN0hZV1ZybDFwRlpXaUNPQ0JRcUtPTGpQR1RyTlpacUtiVVhWSHEybk53VHVKUmsxVnBiZ1hOOHM3Ums1eW0wVVFRemhJRzJOQWpoeEhXYkkrZ0NCVmpCQkZid3h3UXFFaWlVSkdnMUJWR0FGZTdkVjI4V1lMWVpGbUYyVGgxVUQ3SkdqeW1HeW4xaUs1T3l6SUJHQjFIZ3JMWmhhbXp1bVFBR0p3U3FuU0NoMXEzR09Db2R4dDRjeHVyZGNwenVONGN5aGlXYUY1QmcwOXVkVW1uV3cxSC9qVjluRnVKN1F1bys4aDhwZVRoRkErMDQ3dmR1eU10azdmWXFUbDA3WUZkZlV1Zk1QelQ1cDcxVWR0bG1ZWGFHUzJ0M21RSEFzZ3hBTmRhZFlKb3BMZTRRUzI4NjdFc1o0UWZDTllyQ0ZiamREUG1na1l5V0Z4Z1ZmMDRpZkpmNlNjTmRSVVcxWEJiNkZVNVRqRjVFcFNTckd1L3M1bE4rZzV6L29wdlZwZm9PYy93Q2ltOVd0ZEhuYXR2T2JKWERXN3hMR2hCOG5yUGFZOS9IQ3IrdEVkUENWYVNlRG9ZTG5xRjYzbHpXNC9QRlNXM2VjeGJJODRWU3pXVXdVYVNkZzBEWFhLNW52QWlwbmQ2cWdLdlduUU83cHJpOVpVRW1tM1ZsMmoxa3I4cFJsRlJ5cXVCTlpqR3hRL1M1NlkxUzJmdTlPVnVlb24xMVN6YWhvb3UwNlFvUVVYYWRJVkNEMkZKSjdSK1U4OWRNeWR2OEF4ZG4rVEg5bXVaeWUwZmxQUFhRc3RsSzVUYmthMWdVamxDMXEwdlZMa2ViNnIrTzNUeDl4Y1kxbnQ4YzBOclpDeWlPRTExMDhOWWpHdjFqb283SnMxanpLeVNjWUxJdmt6TDZMRHdIWFZKa3NIOVNiNDlkS05xMHRqMWpBNnVyaU9DTCswMkZXWDdpVnRaWDEvQXphSFR5ZW9hdUtuMk1YOVc3OXplYmlaQ3VSNU1qU3JoZlh1RXR3VHJVZVpIK3lOZmRyUk5jeEk2SXpoWGxKRWFrNldJR0oyUnc0Q2hXbkNobmR0bFZCTE1kUUEwazFnYlhOTXp6RGZETHM2bWphUEtwcEpiV3dKMWJPd3d4dzQzT25IaDcxWVQzRHBmV1VKbUZsYjVqSEhEZGVYQkhJc3JSZWE1VFNxdnhxRzA0Y05ONjJ2ZXRvQ1M0dHJlNW1nbmtHRTlxKzNES09rdUkyV1g2TERRUlJIV0RoMVVDdHdqN1FSZzJ3ZGw4RGpndzFxZTdYdlcwQlEza2ZaN21TTGdVK1Q5RTZSVmJudVZybldWU1dxaitMdDhaYlJ1SEVkS1BrWVZjWjJNSlk1ZlNHeWVWYXI0NStya1dRSEFxY2NhbFBFNWttMWh0V0s1bks0V250NUZ1VUJVd09NRzRuR2tBL0JYVXJXNFM2dG9ybE9qTWdjZC94Vm43ckxvN3pLczB1RWpDTmVTdmR3b0JoZ3NaeFgxbDJqMzZrM0x1K3V5cHJkajVWczVBK2kvbEQ0OGEwYWFWSk9QaTdqQjZsYnpXb3pwakI0OHBmMU5EWE5ONHZmbDcrWjRCWFM2NXB2Rjc4dmZ6UEFLNzFYVEhtWi9TL3lUK2p2SjdMM2ZIeXR6MUUrdXBiTCtRajVXNTZqZlhXUm5zSVlLTHRla0tFRkdXdlNGUWd5ams5by9LZWV0M1l0aGxNUC81eDltc0pKN1IrVTg5Yml5Yi9BTVhFdjdnRDZ0YWRMMVQra3dlcFJyQzM5WmtMRE1iaXdNdlVIUlBHMGJqbEdnOG9yZS8yM3N4QmxkeGZNUEx1cE5oVDh5TC9BT1JOWmJkeko0ODRzY3l0eGdMcUpZNUxaajZRMnNWNUcxVnVkMW1qanlHMGlqME5FR1NaVG9LeWhqdHF3NHdhenR1aVhBM3FLVGJTeGx0ZkdoYlpsRTk1WnRacXhWYmdpT1pockVSOXBoM1N2azkrcEpJTFo0WTRER0JGQ1VNS2pSc0dQb2JQRmhVZlcwTkptbGpFMnhKY0lyY0kydkZVRWxuMWxSWGQ2bHJhelhUOUdDTnBEK3lOcW9JN21PVmR1Tnc2bnpsT0lvUE9VYTZ5eWUxWFhjYk1SNUdkUTN4WTBCU2JqMzEvRmNUUVppckorcTQzMXE3YW5iSENUWjcyQnc3bGJQcktCTWNCV05OZ2JNQkJoK2JzakJkbmkwVkoxbEFSWnM2eVdpdXB4Q3VNRHk2S3BTMkl3T282RFRyM01yZTNlNXRaWlZVTTRaQmpxT09Kb1dPNGprWGFqY09PTUhHZ0RJU3ZXSXJkQWtLUjgwK1R6Vmw5MDhiUFBMM0x6eE91SGRpZnhWZmlUQWc5MnFJL3crLzhnR2dTeU4vbVI3WFBWbHAwbEYvM0wzbWJWS3R1NUhqYmsvOEFIRTJGYzAzaTkrWHY1bmdGZEtOYzEzaTkrWHY1bmdGYU5WMHg1bm4rbC9rbjlIZUVXWHUrUGxibnFKOWRTMlh1OU9WdWVvbjExa1o3Q0dDakxYcENneFJscjBoVUlQWVVjbnRINVR6MXM4dmIrQnQxL2RxUGlyR1NlMGZsUFBXdXNHL2c0UHkxNXEwNlhxbHlNV3ZWWVErcnVJOXhKT3F6TzloT3RvL3NQOHRiR09GSXJtV2VNN0l1TURNbkFYWFFKT1VqUWVPc0prMG5ZOTZpcDBDWXVucmphSHgxdCtzclBKVWJYQm0yTHJGUGlrd1RPYitUK1ZoYlp4R01yRFhwODN4MVFTeTJ0dWNKcFVqUEVUcCtDbjUvZnRhUnZLdnRwM0t4NDhIRzNlckhNek94WmlXWnRMTWRKTlFTYmJMNzFWazZ5eW5WaU9rcW5FRWZPV3RQYlhpM0VRa0dnNm1YaU5ja2plU0p4Skd4UjEwcXcwR3R4dXhtdmJJbUQ0Q1pNRmxBNGZSZnYwQnFlc3FxelRNWk5NRURiSUh0SEgyUWVDaVpKU3FNUWRPR2l1ZTUzbXozY3pRd3NSYkljTkhua2VjM2M0cUFNdXJpejY4Z1RJVG94d09PbmxwME1qeE1KWVc3NDFHczNSVmxkdGJ5Z0UvZE1jSFgvbW9EYXhUaVdOWkI1M0IzYXJiOC93Qys0U09GNHNmL0FLeFU5a2NCc2ZPR0hmb1VIdEcvUmJ6WTVEaWU1SEhoWGR2YXZxaVo5UThKZGxxNC9nYkt1YTd4ZS9MMzh6d0N1aHBmMlVrL1pvNTBrbXdKS0lkb2dEancxVnp6ZUwzNWUvbWVBVnAxTFRncVk0bm4rbVJhdXpxbXF3cmp6Q0xMM2ZIeXR6MUUrdXBMTCtRajVXNTZqZlhXUm5yb1lLTHRla0tFRkYydlNGUWc5aFNTZTBmbFBQV29zbS9oSWZvTHpWbDVQYVB5bm5yUldiL3cwWDBGNXEwNlhxbHlNMnNWWXg1Z21iRnJlL3Q3MU5ZMlQrMGg4VmJTTzVTV05KVU9LU0FNcDdqREdzcG1NUGFMUmxYUzZlV3ZlMS9GUk83V1lkYlptMVkvZVcvUjdxSHhIUlhHb2psbTN1bGlkNmFWYmFXK09BTHZnQ0xxMkhtOVd4SEtXcWpoajZ4c0sxZThkbTE1bDRuaUcxTFprc3dHc3h0clBlT21zdmF5QkpBMVZJdGxXanB0THVUZFBNbzdMdGpSRHE5bmFLNCtXRjlJclVXN0JhSE9sakdxVkhCN3cyaHpWb1p0ODdkOHZhTllTTGwwMkNjUnNERWJKYmo3MVV1N1VCa3ZKNy9EN3EyUW9EeHlTYUFPOE1UWGR4UlZNcFJwNVhaT1dkRi9tczdSNVhkeUtmS1dKc08vNVBockc1WGxOeG1FeXdXNmJUblR4QUFjSk5iR1NNWGtNMXBqZ2JpTm8xUHppUEorT3M3dTdtLzZSZU0wMFpPZ3hTcHFZWUhUM3dSWE1LTjRsbDl6VUc0YlFmTnNodThzWlZ1RUEyaGlyQTRxZS9WT3d3clZiemJ3dzVtSTQ0VUtSUllrYldHMFMzSldjdGJkN3U1V0ZmT09MSGlVZEpxbWFpcGZMc0lzT2JoV2UwMDFsTWtNVnZKTmpoZ2hJQUxNY0J4Q3M3ZnhYUW1rdXB4MWJYRHN3R1BsYVRpZFZhRXlLTlhrb280ZUJWK1NxN0w3VnM5emNCZ2V5UTRHUS9NQjFjcm1vaW0yb3JlenFjb3dUdVNlRVk0OGpRN29aWDJQTHpkeUxoTmQ2UmpyRVk2STcrdXNwdkg3OHZmelBBSzZVQUFBRkdBR2dBY0FybXU4WHZ5OS9NOEFyVGZpbzI0Ulc1bm5hRzY3dW91M0gvS1B1cVQyWDhoSHl0ejFHK3VwTEwzZW5LM1BVYjY2eXM5UkRCUmRyMGhRZ291MDZRcUVHVWtudEg1VHoxZTIzOHZGOUJlYXFLVDJqOHA1NnZiYitYaStndk5XalRkVXVSbjFYVEhtVGg4S3JKVEpsdDh0MUNQSVk0NGNHbnBKVmpUSllrbWphTjlJYjR1N1Y5MjNualRldGhSYXVaSlYzUGFXMXJmTElpWEVEWWc2UjRWWWM5Q1hXN3RoZk9aYktkYkdadExXOHVQVlkvdTNHcmtOVWtNOXpsY3hVamJoZldPQTkwY1JxNGd2NExoZHFOK1ZUb05ZV21uUm05Tk5WV05UeUhjNlZXQnY4d3Q0WWVIcW02eHlQbXJvcTFaN1dHRkxTeFRxN1dMU3VQU2RqcmtmdW1xNXlIWERVZUE5Mm9PMlNLcFZ1bU5BYW9KTE1YSDNteXAwcnBKNHVLaGMzdGJETTVCTXJpMXpBajc5ajdLVGlZOFRjZEJwY3NpdGgwMjg2bytzUENhZ0VYOVB6ZzR6WFVDcDZRWXNlOG9vdUNHM3RrNm0xQll2MDVXNlQrSWR5b2x4YkhEQUFhMk9nRGxOQ3ozcnlOMld4QmQ1UEpNZzF0ODFlSWQydWtxbkxsVEJiZmN1WSs5dUpMaVJjdnRQdkhkc0hLK2NmUkhjSERXc3lhd2p5eTBXQmNESTNsVFA2VGVJY0ZWK1M1T21YeDliSmcxMDQ4bzhDajBWOEpxMkRWdTA5bkw4MHVwN094SGkrb2FsM1A4QVhCL0lzWlM4VC9ZT1Y2NXp2Q2NjN3ZmelBBSzNpdldDejQ0NXplSDk1NEJYT3I2STh5ZlNmeXoranZDTFAzZkh5dHoxRyt1cExQM2ZIeXR6MUUrdXNiUGFRMFVYYWRJVUlLTHRla0toQjdDa2s5by9LZWVyMjIvbDQvb0x6VlJTZTBmbFBQVjdiL3k4WDBGNXEwYWJxbHlNK3E2WTh5UXNCVERNb3IxbzhhaWFFMXBibHVNcVMzc2JMTEhJaFNSUXluZ3F1a2hhSjl1QmpvK0g1YU9hM2FvMnQzNHFvdVJsTGFqVGFsR1A4djBJWTh5bFhRK1BLUEZVL2JZWE9MUGdlNkNLaWEwTGF4VE94SHUxUTdjdUJkOXlQRUo3VGJqWEtPOENhamJNSUY2Q05JZU52SkhqcUlXSjd0U3BZa2FscVZibHdJZHlHK1JHWHVyMGhYWUpGeGFsK0RocTV5M3Nsa3YzWTJwRDBwVHIrUVVDbHBKUlVkbzlYVzRPTHJUSHRNMTZjWkxMV2tlQzd5NGp2bE5FcGNSdHcxVXgyN0NpNDQ4TlpyVEZ5M25uM0lRV3hsZ0dyRFozcHphNy9NOEFyWm8rQXJGNTE3MXV2cCtDcWRWMFI1bC9wc1VyczJ2QjNoZGw3dlRsYm5xSjlkUzJYdStQbGJucUo5ZFkyZXNob29xMTZRb1FVWGE5SVZDRDJGTEo3UnVVODlXTnRtVVNRcWtnWU1ndzBhY2NLcnBQYVB5bm5yWldHNFZpK1ZXbVk1dG5NV1hHK1hySVluQTByaGowbWRjVGdkTmR3bktEcWptZHVNMVNSUi9xbHI4LzRLWDZwYThUL0JWekR1TFpYdWRSWmJsbWJ4WGNQVU5QYzNLcUNJd3JiT3pnckhFbkhqb3lEKzNlU1hraHQ3RGVLRzR1bURHT0pWVWtsZm91VGhYZm1iblo3Q3Z5MXZ0OXBtdjFXMStkOEZMOVZ0ZUp2Z3E1eXJjT0dmTG16SE44MGl5eUVUUGJwdEFFRm8yWkc4cG1VYTFPRk5uM0t5Nlcvc2JES001aHY1YngyV1RaQSs3UkYyeTUyV09QSlR6RSt6MkR5MXZ0OXBUL0FLcGFjVGVyUy9VN1RpYjFhMDQvdDdrRFhQWTAzamhOMFc2c1E3SzdXM3EyZG5yTWNjYUR5LzhBdDgwa3VaZnFXWXhXTnRsY3ZVUFBoaUdZaFdEZVV5N0l3WVU4eFBzOWc4dGI3ZmFVbjZwYWNUZXJUeG05b09CdlZxM3Y5ejkyN2F5bnVJZDQ0TGlXS05uamhBWEYyVVloUmc1MTZxcHNyeWpMcjIxNjY1ekZMU1RhSzlVMkdPQTg3U3dxWTM3a25SVStCek96YWdzMHMxT3lyK0JLTTZzeHdQNnRTRFBMTWVuNnZ5MHJ2ZG0zU3hsdTdLL1M3V0REckZVRFVUeGduVFU4MjZlWFc3S2x4bXFRdXdEQlhVS2NEKzFYZWUvd1h1S1g1WERHV0xhcFNWY095aEVNL3NlSi9WK1duamVHeDRwUFYrV2ttNmtLWmxGYXkzSmx0N2lGcFlaWThBU1ZLNkRqdEREQTBmOEEwVGwzNDAvMWY4TmR4OHhKVldYQjBLYmt0RkZwTnpkVlhBQy9xT3dBMENRbmkyZmxyTzNWd2JtNWxuSTJUS3hiRGlyWC93QkU1ZCtOY2ZWL3dWUjd4WlBhNVU5dXR2SThuV2htYmJ3MFlFQVlZQVZ4ZmhmeTVybEtSNEZ1bHU2WDdtVzFtelQ4UzRZaXMvNUNQbGJucUo5ZFNXZnU5T1Z1ZW9uMTFtWnZRMmk3WHBDaEtLdGVrS2hCbE5KN1IrVTg5YkRmR1RiM2EzWlgwTGNqNmtkWStUMmo4cDU2MDI4OG0xa1dRcjZNSit5bFNBcisyY25WNXJlbmpzM0gxbG9YKzNqOVh2YmJ0eExOOWxxVzRVblY1amRuanRYSHhpaHR5Wk5qZVNCdTVKOWsxQkplN3h5N1c1Q0ovd0N6dUQvbVRWVGYyK2ZxOTdMSnVMclBzTlJ1ZVM3VzZhSi8zOHgrdkxWWHVZK3h2SGFOeGJmMkdvQ2V6ZjhBMzZqL0FQc1NmOHcxc0xucWN6VGVmSmx1WW9MbTV1bzVGNjFzQnNoSXRQMWNORlllMWY4QTNpci9BUGZFL3dDWlVlOWJCOTRyNWp3dVBzclFGaG1HNGwvWjJNMTdIZFc5MHR1dTNJa1RIYUNqV2RJdzBWVlpka3M5L0MwNnlKRkVwMmRwK0UxYmJxeWJHVFo4dnBRRDdMMVhSdjhBN2JsVDk2T2RhN3RwTnV1TkUzN0NxOUtTaXNqeXVVb3hyU3RLbGxIYkxsV1RYc01zOGNodVN1d0VQRHF3b0xlNXkrWVJFL2dMem1xUmVrdktLdGQ0MzI3eU0vdWxIeG1ySEpTdHlTV1ZSeXJqeEtJMlhDL0NUbG5sUFBLVHBUZEZiUDBMMWJncmY1THAwRzNkUGhRSHdWMFMxbHpCc25zM3NFU1I4Q3JoOVdBSkdqU09LdVUzRSt6ZFpRM29KaDhJQXJkWlhGRG1PVHBIYTNpMitZckkyS3RLeTRyaWNCc0J1SEhnRlhTbzQ0MCtXYTJxcXhqdk05dU1veStXdnpXcExDV1dXRTI4SHhMNmU0M29qZ2tlU0NCWTFSaTVCR0lVRFQ1MWNsM3ZtMjc2QkJxU0VINFdieFYwdGxreVhKY3hUTWIrT1c2dVk5bUdIckN6RFF3d0FiVHAydUt1VFo5TjF1WXNmUlJSOFdQaHJtNDE5bVNTalJ5aXF4Vks3eTIzQi9mdHVUbTJvU2RKeXpOVnczQkZuN3ZUbGJucUY5ZFMyZnU5T1Z1ZW9uMTFsWnVRMmlMZHNHRkQwNUgyZE5RR1YwbnRHNVR6MWRXbTlOMWIya1ZxOEVWd3NJMlVhUWFRT0tobWl0WkdMT21rNjhEaFNGdlkrZ2ZXTlNBZzd6M1F2bzd5S0NLSW9oaWFOUjVMS3h4OHFweHZqY3FTMFZwYnh2d09BY1JRUFo3RDBHOVkwdXoySG9IMWpVQ3BMWTd6WGxwYm0zZUtPNVF1empyQnFaamkzeDE3UHZOY3lUMjg4VnZEQkpiTVdVb3ZTMmhzbFc3bUZROW5zUFFQckdsMmV3OUErc2FDb2QvV054dGJZc3JmYjE3V0J4eDVkZEQyMjgxeEM4OGtsdkRjU1hFbld1enJxT0dHQzl6UlVQWjdEMEc5WTB1eldIb0gxalFWQ0xyZXE2bnRaYmFPM2l0MW1HeTdSalRzMVgybVl5MjBaaUNxOFpPT0RjZEVkbXNQUWIxalM3UFllZ2ZXTmRKdUxxblFpU1VsUnFwRkxtcnl4dEgxTWE3UXcyZ05OUE9kU3Qwb0kyN3AwMDdzOWg2QjlZMHV6MkhvSDFqWFgzWitJNCsxYjhJSmRYODl4TEhLUUZNWFFVYWhweG9pUE41UCtvbmZVK0EwL3M5aDZEZXNhWFo3RDBENnhwRzdPTGJVdHUwU3RXNUpKeDJiQnNtYnRpU2lFaytjeG9DV1dTYVZwWk9rMnZEVm8wVllkbnNQUWIxalNOdlpjQ0gxalNkMmMrcDFYQW1GcUVPbU9QRWZhSCtCUWQxdWVvMjExSXpyZ0ZVWUtOQUFxSTFXenRDcFVxVkNSVXFWS2dGU3BVcUFWS2xTb0JVcVZLZ0ZTcFVxQVZLbFNvQlVxVktnRlNwVXFBVktsU29ELzlrPVwiLFxyXG5cclxuICAgICAgICBsb2FkZXJUZXh0OiBcIuato+WcqOi9veWFpS4uLiBcIixcclxuXHJcbiAgICAgICAgbG9hZGVyRm9udDogXCJBcmlhbFwiLFxyXG5cclxuICAgICAgICAvKiogQG92ZXJyaWRlICovXHJcbiAgICAgICAgbGlzdE5vdGlmaWNhdGlvbkludGVyZXN0czogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICAgICAgY29uc3RhbnRzLlNDRU5FX0FDVElPTlxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKiBAb3ZlcnJpZGUgKi9cclxuICAgICAgICBoYW5kbGVOb3RpZmljYXRpb246IGZ1bmN0aW9uIChub3RpZmljYXRpb24pIHtcclxuICAgICAgICAgICAgc3dpdGNoIChub3RpZmljYXRpb24uZ2V0TmFtZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIGNvbnN0YW50cy5TQ0VORV9BQ1RJT046XHJcbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKG5vdGlmaWNhdGlvbi5nZXRCb2R5KCkubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZpZXdNZWRpYXRvciA9IHRoaXMuZmFjYWRlLnJldHJpZXZlTWVkaWF0b3Iobm90aWZpY2F0aW9uLmdldEJvZHkoKS5uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmlld01lZGlhdG9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0Vmlldyh2aWV3TWVkaWF0b3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2luaXRpYWxpemVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2luaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKiBAb3ZlcnJpZGUgKi9cclxuICAgICAgICBvblJlZ2lzdGVyOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKiBAb3ZlcnJpZGUgKi9cclxuICAgICAgICBvblJlbW92ZTogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzZXRWaWV3OiBmdW5jdGlvbiAodmlld01lZGlhdG9yKSB7XHJcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHNlbGYudmlld0NvbXBvbmVudCA9IG5ldyBjYy5TY2VuZSgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHJlcyA9IHZpZXdNZWRpYXRvci5nZXRSZXNvdXJjZSgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGhhbmRsZVNjZW5lQ2hhbmdlZCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2aWV3TWVkaWF0b3IuaW5pdCgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoaWxkID0gdmlld01lZGlhdG9yLmdldFZpZXdDb21wb25lbnQoKTtcclxuICAgICAgICAgICAgICAgIGlmIChjaGlsZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYudmlld0NvbXBvbmVudC5hZGRDaGlsZChjaGlsZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZi5zZW5kTm90aWZpY2F0aW9uKGNvbnN0YW50cy5OT1RJRklDQVRJT04uU0NFTkVfQ0hBTkdFRCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChyZXMpIHtcclxuICAgICAgICAgICAgICAgIGNjLkxvYWRlclNjZW5lLnByZWxvYWQocmVzLCBoYW5kbGVTY2VuZUNoYW5nZWQsIHRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlU2NlbmVDaGFuZ2VkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy8gU1RBVElDIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBOQU1FOiAnU2NlbmVNZWRpYXRvcicsXHJcbiAgICAgICAgU0NFTkVfQ0hBTkdFX1ZJRVc6ICdTY2VuZUNoYW5nZVZpZXcnXHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFydGh1ciBvbiAyMDE0LzEyLzIwLlxyXG4gKi9cclxudmFyIHB1cmVtdmMgPSByZXF1aXJlKCdwdXJlbXZjJykucHVyZW12YztcclxudmFyIGNvbnN0YW50cyA9IHJlcXVpcmUoJy4uLy4uL2FwcENvbnN0YW50cy5qcycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBwdXJlbXZjLmRlZmluZShcclxuICAgIHtcclxuICAgICAgICBuYW1lOiAnZmlnaHRlci52aWV3Lm1lZGlhdG9yLlRyYWluTWVkaWF0b3InLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5NZWRpYXRvclxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBpbnN0YW5jZSBtZW1iZXJzXHJcbiAgICB7XHJcbiAgICAgICAgLyoqIEBvdmVycmlkZSAqL1xyXG4gICAgICAgIGxpc3ROb3RpZmljYXRpb25JbnRlcmVzdHM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqIEBvdmVycmlkZSAqL1xyXG4gICAgICAgIGhhbmRsZU5vdGlmaWNhdGlvbjogZnVuY3Rpb24obm90ZSkge1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKiogQG92ZXJyaWRlICovXHJcbiAgICAgICAgb25SZWdpc3RlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKiBAb3ZlcnJpZGUgKi9cclxuICAgICAgICBvblJlbW92ZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBUcmFpbkxheWVyID0gcmVxdWlyZSgnLi8uLi9jb21wb25lbnQvdHJhaW5MYXllci5qcycpO1xyXG4gICAgICAgICAgICBzZWxmLnZpZXdDb21wb25lbnQgPSBuZXcgVHJhaW5MYXllcigpO1xyXG4gICAgICAgICAgICBzZWxmLnZpZXdDb21wb25lbnQuaW5pdCgpO1xyXG5cclxuICAgICAgICAgICAgc2VsZi52aWV3Q29tcG9uZW50Lm9uQmFjayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zZW5kTm90aWZpY2F0aW9uKGNvbnN0YW50cy5TQ0VORV9BQ1RJT04sIHtuYW1lOiBjb25zdGFudHMuU0NFTkUuSE9NRX0pO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGdldFJlc291cmNlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy8gc3RhdGljIG1lbWJlcnNcclxuICAgIHtcclxuICAgICAgICBOQU1FOiAnVHJhaW5NZWRpYXRvcidcclxuICAgIH1cclxuKSJdfQ==
