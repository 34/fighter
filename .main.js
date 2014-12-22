(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"F:\\cocos\\fighter\\node_modules\\puremvc\\index.js":[function(require,module,exports){
exports.puremvc = require('./lib/puremvc-1.0.1.module.js');

},{"./lib/puremvc-1.0.1.module.js":"F:\\cocos\\fighter\\node_modules\\puremvc\\lib\\puremvc-1.0.1.module.js"}],"F:\\cocos\\fighter\\node_modules\\puremvc\\lib\\puremvc-1.0.1.module.js":[function(require,module,exports){
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
},{}],"F:\\cocos\\fighter\\src\\app.js":[function(require,module,exports){
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
},{"./appFacade.js":"F:\\cocos\\fighter\\src\\appFacade.js","./resource.js":"F:\\cocos\\fighter\\src\\resource.js"}],"F:\\cocos\\fighter\\src\\appConstants.js":[function(require,module,exports){
/**
 * Created by Arthur on 2014/12/20.
 */
module.exports = {
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
    }
};
},{}],"F:\\cocos\\fighter\\src\\appFacade.js":[function(require,module,exports){
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
},{"./appConstants.js":"F:\\cocos\\fighter\\src\\appConstants.js","./controller/command/StartupCommand.js":"F:\\cocos\\fighter\\src\\controller\\command\\StartupCommand.js","puremvc":"F:\\cocos\\fighter\\node_modules\\puremvc\\index.js"}],"F:\\cocos\\fighter\\src\\controller\\command\\StartupCommand.js":[function(require,module,exports){
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

},{"../../appConstants.js":"F:\\cocos\\fighter\\src\\appConstants.js","./homeCommand.js":"F:\\cocos\\fighter\\src\\controller\\command\\homeCommand.js","./prepControllerCommand.js":"F:\\cocos\\fighter\\src\\controller\\command\\prepControllerCommand.js","./prepModelCommand.js":"F:\\cocos\\fighter\\src\\controller\\command\\prepModelCommand.js","./prepViewCommand.js":"F:\\cocos\\fighter\\src\\controller\\command\\prepViewCommand.js","puremvc":"F:\\cocos\\fighter\\node_modules\\puremvc\\index.js"}],"F:\\cocos\\fighter\\src\\controller\\command\\homeCommand.js":[function(require,module,exports){
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



},{"../../appConstants.js":"F:\\cocos\\fighter\\src\\appConstants.js","puremvc":"F:\\cocos\\fighter\\node_modules\\puremvc\\index.js"}],"F:\\cocos\\fighter\\src\\controller\\command\\prepControllerCommand.js":[function(require,module,exports){
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
},{"../../appConstants.js":"F:\\cocos\\fighter\\src\\appConstants.js","puremvc":"F:\\cocos\\fighter\\node_modules\\puremvc\\index.js"}],"F:\\cocos\\fighter\\src\\controller\\command\\prepModelCommand.js":[function(require,module,exports){
/**
 * Created by Arthur on 2014/12/14.
 */
var puremvc = require('puremvc').puremvc;

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
        }
    }
);

},{"puremvc":"F:\\cocos\\fighter\\node_modules\\puremvc\\index.js"}],"F:\\cocos\\fighter\\src\\controller\\command\\prepViewCommand.js":[function(require,module,exports){
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

},{"../../view/mediator/directorMediator.js":"F:\\cocos\\fighter\\src\\view\\mediator\\directorMediator.js","../../view/mediator/homeMediator.js":"F:\\cocos\\fighter\\src\\view\\mediator\\homeMediator.js","../../view/mediator/sceneMediator.js":"F:\\cocos\\fighter\\src\\view\\mediator\\sceneMediator.js","../../view/mediator/trainMediator.js":"F:\\cocos\\fighter\\src\\view\\mediator\\trainMediator.js","puremvc":"F:\\cocos\\fighter\\node_modules\\puremvc\\index.js"}],"F:\\cocos\\fighter\\src\\resource.js":[function(require,module,exports){
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
},{}],"F:\\cocos\\fighter\\src\\view\\component\\homeLayer.js":[function(require,module,exports){
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

    init: function() {
        var rootNode = this._rootNode;
        var btn_train = rootNode.getChildByName('main_panel').getChildByName('btn_train');
        btn_train.addClickEventListener(this.buttonTrainListener.bind(this));
    },

    buttonTrainListener: function() {
        if (this.onTrain) {
            this.onTrain();
        }
    }
});
},{"../../resource.js":"F:\\cocos\\fighter\\src\\resource.js"}],"F:\\cocos\\fighter\\src\\view\\component\\trainLayer.js":[function(require,module,exports){
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

            btn_start_task = taskNode.getChildByName('btn_start_task');
            btn_start_task.addClickEventListener(function() {

            });
            btn_start_task.setTitleText('开始任务');
            btn_start_task.setTitleFontSize(18);

            trainNode.addChild(taskNode);
        }

        return true;
    }
});
},{"../../resource.js":"F:\\cocos\\fighter\\src\\resource.js"}],"F:\\cocos\\fighter\\src\\view\\mediator\\directorMediator.js":[function(require,module,exports){
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

},{"../../appConstants.js":"F:\\cocos\\fighter\\src\\appConstants.js","./sceneMediator.js":"F:\\cocos\\fighter\\src\\view\\mediator\\sceneMediator.js","puremvc":"F:\\cocos\\fighter\\node_modules\\puremvc\\index.js"}],"F:\\cocos\\fighter\\src\\view\\mediator\\homeMediator.js":[function(require,module,exports){
/**
 * Created by Arthur on 2014/12/20.
 */
var puremvc = require('puremvc').puremvc;
var constants = require('../../appConstants.js');

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
},{"../../appConstants.js":"F:\\cocos\\fighter\\src\\appConstants.js","./../component/homeLayer.js":"F:\\cocos\\fighter\\src\\view\\component\\homeLayer.js","puremvc":"F:\\cocos\\fighter\\node_modules\\puremvc\\index.js"}],"F:\\cocos\\fighter\\src\\view\\mediator\\sceneMediator.js":[function(require,module,exports){
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

},{"../../appConstants.js":"F:\\cocos\\fighter\\src\\appConstants.js","puremvc":"F:\\cocos\\fighter\\node_modules\\puremvc\\index.js"}],"F:\\cocos\\fighter\\src\\view\\mediator\\trainMediator.js":[function(require,module,exports){
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
},{"../../appConstants.js":"F:\\cocos\\fighter\\src\\appConstants.js","./../component/trainLayer.js":"F:\\cocos\\fighter\\src\\view\\component\\trainLayer.js","puremvc":"F:\\cocos\\fighter\\node_modules\\puremvc\\index.js"}]},{},["F:\\cocos\\fighter\\src\\app.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcQXJ0aHVyXFxBcHBEYXRhXFxSb2FtaW5nXFxucG1cXG5vZGVfbW9kdWxlc1xcd2F0Y2hpZnlcXG5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwibm9kZV9tb2R1bGVzXFxwdXJlbXZjXFxpbmRleC5qcyIsIm5vZGVfbW9kdWxlc1xccHVyZW12Y1xcbGliXFxwdXJlbXZjLTEuMC4xLm1vZHVsZS5qcyIsInNyY1xcYXBwLmpzIiwic3JjXFxhcHBDb25zdGFudHMuanMiLCJzcmNcXGFwcEZhY2FkZS5qcyIsInNyY1xcY29udHJvbGxlclxcY29tbWFuZFxcU3RhcnR1cENvbW1hbmQuanMiLCJzcmNcXGNvbnRyb2xsZXJcXGNvbW1hbmRcXGhvbWVDb21tYW5kLmpzIiwic3JjXFxjb250cm9sbGVyXFxjb21tYW5kXFxwcmVwQ29udHJvbGxlckNvbW1hbmQuanMiLCJzcmNcXGNvbnRyb2xsZXJcXGNvbW1hbmRcXHByZXBNb2RlbENvbW1hbmQuanMiLCJzcmNcXGNvbnRyb2xsZXJcXGNvbW1hbmRcXHByZXBWaWV3Q29tbWFuZC5qcyIsInNyY1xccmVzb3VyY2UuanMiLCJzcmNcXHZpZXdcXGNvbXBvbmVudFxcaG9tZUxheWVyLmpzIiwic3JjXFx2aWV3XFxjb21wb25lbnRcXHRyYWluTGF5ZXIuanMiLCJzcmNcXHZpZXdcXG1lZGlhdG9yXFxkaXJlY3Rvck1lZGlhdG9yLmpzIiwic3JjXFx2aWV3XFxtZWRpYXRvclxcaG9tZU1lZGlhdG9yLmpzIiwic3JjXFx2aWV3XFxtZWRpYXRvclxcc2NlbmVNZWRpYXRvci5qcyIsInNyY1xcdmlld1xcbWVkaWF0b3JcXHRyYWluTWVkaWF0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3Q1RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJleHBvcnRzLnB1cmVtdmMgPSByZXF1aXJlKCcuL2xpYi9wdXJlbXZjLTEuMC4xLm1vZHVsZS5qcycpO1xyXG4iLCIvKipcclxuICogQGZpbGVPdmVydmlld1xyXG4gKiBQdXJlTVZDIEpTIE5hdGl2ZSBQb3J0IGJ5IERhdmlkIEZvbGV5LCBGcsOpZMOpcmljIFNhdW5pZXIsICYgQWxhaW4gRHVjaGVzbmVhdVxyXG4gKiBDb3B5cmlnaHQoYykgMjAwNi0yMDEyIEZ1dHVyZXNjYWxlLCBJbmMuLCBTb21lIHJpZ2h0cyByZXNlcnZlZC5cclxuICogUmV1c2UgZ292ZXJuZWQgYnkgQ3JlYXRpdmUgQ29tbW9ucyBBdHRyaWJ1dGlvbiAzLjBcclxuICogaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbGljZW5zZXMvYnkvMy4wL3VzL1xyXG4gKiBAYXV0aG9yIGRhdmlkLmZvbGV5QHB1cmVtdmMub3JnXHJcbiAqL1xyXG5cclxuXHJcbi8qIGltcGxlbWVudGF0aW9uIGJlZ2luICovXHJcblxyXG5cclxuLyoqXHJcbiAqIEBhdXRob3IgUHVyZU1WQyBKUyBOYXRpdmUgUG9ydCBieSBEYXZpZCBGb2xleSwgRnLDqWTDqXJpYyBTYXVuaWVyLCAmIEFsYWluIER1Y2hlc25lYXVcclxuICogQGF1dGhvciBDb3B5cmlnaHQoYykgMjAwNi0yMDEyIEZ1dHVyZXNjYWxlLCBJbmMuLCBTb21lIHJpZ2h0cyByZXNlcnZlZC5cclxuICpcclxuICogQGNsYXNzIHB1cmVtdmMuT2JzZXJ2ZXJcclxuICpcclxuICogQSBiYXNlIE9ic2VydmVyIGltcGxlbWVudGF0aW9uLlxyXG4gKlxyXG4gKiBBbiBPYnNlcnZlciBpcyBhbiBvYmplY3QgdGhhdCBlbmNhcHN1bGF0ZXMgaW5mb3JtYXRpb25cclxuICogYWJvdXQgYW4gaW50ZXJlc3RlZCBvYmplY3Qgd2l0aCBhIG1ldGhvZCB0aGF0IHNob3VsZFxyXG4gKiBiZSBjYWxsZWQgd2hlbiBhIHBhcnRpY3VsYXIgTm90aWZpY2F0aW9uIGlzIGJyb2FkY2FzdC5cclxuICpcclxuICogSW4gUHVyZU1WQywgdGhlIE9ic2VydmVyIGNsYXNzIGFzc3VtZXMgdGhlc2UgcmVzcG9uc2liaWxpdGllczpcclxuICpcclxuICogLSBFbmNhcHN1bGF0ZSB0aGUgbm90aWZpY2F0aW9uIChjYWxsYmFjaykgbWV0aG9kIG9mIHRoZSBpbnRlcmVzdGVkIG9iamVjdC5cclxuICogLSBFbmNhcHN1bGF0ZSB0aGUgbm90aWZpY2F0aW9uIGNvbnRleHQgKHRoaXMpIG9mIHRoZSBpbnRlcmVzdGVkIG9iamVjdC5cclxuICogLSBQcm92aWRlIG1ldGhvZHMgZm9yIHNldHRpbmcgdGhlIG5vdGlmaWNhdGlvbiBtZXRob2QgYW5kIGNvbnRleHQuXHJcbiAqIC0gUHJvdmlkZSBhIG1ldGhvZCBmb3Igbm90aWZ5aW5nIHRoZSBpbnRlcmVzdGVkIG9iamVjdC5cclxuICpcclxuICpcclxuICogVGhlIG5vdGlmaWNhdGlvbiBtZXRob2Qgb24gdGhlIGludGVyZXN0ZWQgb2JqZWN0IHNob3VsZCB0YWtlXHJcbiAqIG9uZSBwYXJhbWV0ZXIgb2YgdHlwZSBOb3RpZmljYXRpb24uXHJcbiAqXHJcbiAqXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG5vdGlmeU1ldGhvZFxyXG4gKiAgdGhlIG5vdGlmaWNhdGlvbiBtZXRob2Qgb2YgdGhlIGludGVyZXN0ZWQgb2JqZWN0XHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBub3RpZnlDb250ZXh0XHJcbiAqICB0aGUgbm90aWZpY2F0aW9uIGNvbnRleHQgb2YgdGhlIGludGVyZXN0ZWQgb2JqZWN0XHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gT2JzZXJ2ZXIgKG5vdGlmeU1ldGhvZCwgbm90aWZ5Q29udGV4dClcclxue1xyXG4gICAgdGhpcy5zZXROb3RpZnlNZXRob2Qobm90aWZ5TWV0aG9kKTtcclxuICAgIHRoaXMuc2V0Tm90aWZ5Q29udGV4dChub3RpZnlDb250ZXh0KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIE9ic2VydmVycyBub3RpZmljYXRpb24gbWV0aG9kLlxyXG4gKlxyXG4gKiBUaGUgbm90aWZpY2F0aW9uIG1ldGhvZCBzaG91bGQgdGFrZSBvbmUgcGFyYW1ldGVyIG9mIHR5cGUgTm90aWZpY2F0aW9uXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG5vdGlmeU1ldGhvZFxyXG4gKiAgdGhlIG5vdGlmaWNhdGlvbiAoY2FsbGJhY2spIG1ldGhvZCBvZiB0aGUgaW50ZXJlc3RlZCBvYmplY3QuXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5PYnNlcnZlci5wcm90b3R5cGUuc2V0Tm90aWZ5TWV0aG9kPSBmdW5jdGlvbiAobm90aWZ5TWV0aG9kKVxyXG57XHJcbiAgICB0aGlzLm5vdGlmeT0gbm90aWZ5TWV0aG9kO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNldCB0aGUgT2JzZXJ2ZXJzIG5vdGlmaWNhdGlvbiBjb250ZXh0LlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gbm90aWZ5Q29udGV4dFxyXG4gKiAgdGhlIG5vdGlmaWNhdGlvbiBjb250ZXh0ICh0aGlzKSBvZiB0aGUgaW50ZXJlc3RlZCBvYmplY3QuXHJcbiAqXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5PYnNlcnZlci5wcm90b3R5cGUuc2V0Tm90aWZ5Q29udGV4dD0gZnVuY3Rpb24gKG5vdGlmeUNvbnRleHQpXHJcbntcclxuICAgIHRoaXMuY29udGV4dD0gbm90aWZ5Q29udGV4dDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIEZ1bmN0aW9uIHRoYXQgdGhpcyBPYnNlcnZlciB3aWxsIGludm9rZSB3aGVuIGl0IGlzIG5vdGlmaWVkLlxyXG4gKlxyXG4gKiBAcHJpdmF0ZVxyXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cclxuICovXHJcbk9ic2VydmVyLnByb3RvdHlwZS5nZXROb3RpZnlNZXRob2Q9IGZ1bmN0aW9uICgpXHJcbntcclxuICAgIHJldHVybiB0aGlzLm5vdGlmeTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIE9iamVjdCB0aGF0IHdpbGwgc2VydmUgYXMgdGhlIE9ic2VydmVycyBjYWxsYmFjayBleGVjdXRpb24gY29udGV4dFxyXG4gKlxyXG4gKiBAcHJpdmF0ZVxyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqL1xyXG5PYnNlcnZlci5wcm90b3R5cGUuZ2V0Tm90aWZ5Q29udGV4dD0gZnVuY3Rpb24gKClcclxue1xyXG4gICAgcmV0dXJuIHRoaXMuY29udGV4dDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBOb3RpZnkgdGhlIGludGVyZXN0ZWQgb2JqZWN0LlxyXG4gKlxyXG4gKiBAcGFyYW0ge3B1cmVtdmMuTm90aWZpY2F0aW9ufSBub3RpZmljYXRpb25cclxuICogIFRoZSBOb3RpZmljYXRpb24gdG8gcGFzcyB0byB0aGUgaW50ZXJlc3RlZCBvYmplY3RzIG5vdGlmaWNhdGlvbiBtZXRob2RcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbk9ic2VydmVyLnByb3RvdHlwZS5ub3RpZnlPYnNlcnZlcj0gZnVuY3Rpb24gKG5vdGlmaWNhdGlvbilcclxue1xyXG4gICAgdGhpcy5nZXROb3RpZnlNZXRob2QoKS5jYWxsKHRoaXMuZ2V0Tm90aWZ5Q29udGV4dCgpLCBub3RpZmljYXRpb24pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENvbXBhcmUgYW4gb2JqZWN0IHRvIHRoaXMgT2JzZXJ2ZXJzIG5vdGlmaWNhdGlvbiBjb250ZXh0LlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0XHJcbiAqXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAqL1xyXG5PYnNlcnZlci5wcm90b3R5cGUuY29tcGFyZU5vdGlmeUNvbnRleHQ9IGZ1bmN0aW9uIChvYmplY3QpXHJcbntcclxuICAgIHJldHVybiBvYmplY3QgPT09IHRoaXMuY29udGV4dDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgT2JzZXJ2ZXJzIGNhbGxiYWNrIEZ1bmN0aW9uXHJcbiAqXHJcbiAqIEBwcml2YXRlXHJcbiAqIEB0eXBlIHtGdW5jdGlvbn1cclxuICovXHJcbk9ic2VydmVyLnByb3RvdHlwZS5ub3RpZnk9IG51bGw7XHJcblxyXG4vKipcclxuICogVGhlIE9ic2VydmVycyBjYWxsYmFjayBPYmplY3RcclxuICogQHByaXZhdGVcclxuICogQHR5cGUge09iamVjdH1cclxuICovXHJcbk9ic2VydmVyLnByb3RvdHlwZS5jb250ZXh0PSBudWxsO1xyXG4vKipcclxuICogQGF1dGhvciBQdXJlTVZDIEpTIE5hdGl2ZSBQb3J0IGJ5IERhdmlkIEZvbGV5LCBGcsOpZMOpcmljIFNhdW5pZXIsICYgQWxhaW4gRHVjaGVzbmVhdVxyXG4gKiBAYXV0aG9yIENvcHlyaWdodChjKSAyMDA2LTIwMTIgRnV0dXJlc2NhbGUsIEluYy4sIFNvbWUgcmlnaHRzIHJlc2VydmVkLlxyXG4gKlxyXG4gKiBAY2xhc3MgcHVyZW12Yy5Ob3RpZmljYXRpb25cclxuICpcclxuICogQSBiYXNlIE5vdGlmaWNhdGlvbiBpbXBsZW1lbnRhdGlvbi5cclxuICpcclxuICogUHVyZU1WQyBkb2VzIG5vdCByZWx5IHVwb24gdW5kZXJseWluZyBldmVudCBtb2RlbHMgc3VjaCBhcyB0aGUgb25lIHByb3ZpZGVkXHJcbiAqIHdpdGggdGhlIERPTSBvciBvdGhlciBicm93c2VyIGNlbnRyaWMgVzNDIGV2ZW50IG1vZGVscy5cclxuICpcclxuICogVGhlIE9ic2VydmVyIFBhdHRlcm4gYXMgaW1wbGVtZW50ZWQgd2l0aGluIFB1cmVNVkMgZXhpc3RzIHRvIHN1cHBvcnRcclxuICogZXZlbnQtZHJpdmVuIGNvbW11bmljYXRpb24gYmV0d2VlbiB0aGUgYXBwbGljYXRpb24gYW5kIHRoZSBhY3RvcnMgb2YgdGhlIE1WQ1xyXG4gKiB0cmlhZC5cclxuICpcclxuICogTm90aWZpY2F0aW9ucyBhcmUgbm90IG1lYW50IHRvIGJlIGEgcmVwbGFjZW1lbnQgZm9yIGV2ZW50cyBpbiB0aGUgYnJvd3Nlci5cclxuICogR2VuZXJhbGx5LCBNZWRpYXRvciBpbXBsZW1lbnRvcnMgcGxhY2UgZXZlbnQgbGlzdGVuZXJzIG9uIHRoZWlyIHZpZXdcclxuICogY29tcG9uZW50cywgd2hpY2ggdGhleSB0aGVuIGhhbmRsZSBpbiB0aGUgdXN1YWwgd2F5LiBUaGlzIG1heSBsZWFkIHRvIHRoZVxyXG4gKiBicm9hZGNhc3Qgb2YgTm90aWZpY2F0aW9ucyB0byB0cmlnZ2VyIGNvbW1hbmRzIG9yIHRvIGNvbW11bmljYXRlIHdpdGggb3RoZXJcclxuICogTWVkaWF0b3JzLiB7QGxpbmsgcHVyZW12Yy5Qcm94eSBQcm94eX0sXHJcbiAqIHtAbGluayBwdXJlbXZjLlNpbXBsZUNvbW1hbmQgU2ltcGxlQ29tbWFuZH1cclxuICogYW5kIHtAbGluayBwdXJlbXZjLk1hY3JvQ29tbWFuZCBNYWNyb0NvbW1hbmR9XHJcbiAqIGluc3RhbmNlcyBjb21tdW5pY2F0ZSB3aXRoIGVhY2ggb3RoZXIgYW5kXHJcbiAqIHtAbGluayBwdXJlbXZjLk1lZGlhdG9yIE1lZGlhdG9yfXNcclxuICogYnkgYnJvYWRjYXN0aW5nIE5vdGlmaWNhdGlvbnMuXHJcbiAqXHJcbiAqIEEga2V5IGRpZmZlcmVuY2UgYmV0d2VlbiBicm93c2VyIGV2ZW50cyBhbmQgUHVyZU1WQyBOb3RpZmljYXRpb25zIGlzIHRoYXRcclxuICogZXZlbnRzIGZvbGxvdyB0aGUgJ0NoYWluIG9mIFJlc3BvbnNpYmlsaXR5JyBwYXR0ZXJuLCAnYnViYmxpbmcnIHVwIHRoZVxyXG4gKiBkaXNwbGF5IGhpZXJhcmNoeSB1bnRpbCBzb21lIHBhcmVudCBjb21wb25lbnQgaGFuZGxlcyB0aGUgZXZlbnQsIHdoaWxlXHJcbiAqIFB1cmVNVkMgTm90aWZpY2F0aW9uIGZvbGxvdyBhICdQdWJsaXNoL1N1YnNjcmliZScgcGF0dGVybi4gUHVyZU1WQyBjbGFzc2VzXHJcbiAqIG5lZWQgbm90IGJlIHJlbGF0ZWQgdG8gZWFjaCBvdGhlciBpbiBhIHBhcmVudC9jaGlsZCByZWxhdGlvbnNoaXAgaW4gb3JkZXIgdG9cclxuICogY29tbXVuaWNhdGUgd2l0aCBvbmUgYW5vdGhlciB1c2luZyBOb3RpZmljYXRpb25zLlxyXG4gKlxyXG4gKiBAY29uc3RydWN0b3JcclxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICogIFRoZSBOb3RpZmljYXRpb24gbmFtZVxyXG4gKiBAcGFyYW0ge09iamVjdH0gW2JvZHldXHJcbiAqICBUaGUgTm90aWZpY2F0aW9uIGJvZHlcclxuICogQHBhcmFtIHtPYmplY3R9IFt0eXBlXVxyXG4gKiAgVGhlIE5vdGlmaWNhdGlvbiB0eXBlXHJcbiAqL1xyXG5mdW5jdGlvbiBOb3RpZmljYXRpb24obmFtZSwgYm9keSwgdHlwZSlcclxue1xyXG4gICAgdGhpcy5uYW1lPSBuYW1lO1xyXG4gICAgdGhpcy5ib2R5PSBib2R5O1xyXG4gICAgdGhpcy50eXBlPSB0eXBlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgbmFtZSBvZiB0aGUgTm90aWZpY2F0aW9uIGluc3RhbmNlXHJcbiAqXHJcbiAqIEByZXR1cm4ge3N0cmluZ31cclxuICogIFRoZSBuYW1lIG9mIHRoZSBOb3RpZmljYXRpb24gaW5zdGFuY2VcclxuICovXHJcbk5vdGlmaWNhdGlvbi5wcm90b3R5cGUuZ2V0TmFtZT0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICByZXR1cm4gdGhpcy5uYW1lO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNldCB0aGlzIE5vdGlmaWNhdGlvbnMgYm9keS5cclxuICogQHBhcmFtIHtPYmplY3R9IGJvZHlcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbk5vdGlmaWNhdGlvbi5wcm90b3R5cGUuc2V0Qm9keT0gZnVuY3Rpb24oYm9keSlcclxue1xyXG4gICAgdGhpcy5ib2R5PSBib2R5O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgTm90aWZpY2F0aW9uIGJvZHkuXHJcbiAqXHJcbiAqIEByZXR1cm4ge09iamVjdH1cclxuICovXHJcbk5vdGlmaWNhdGlvbi5wcm90b3R5cGUuZ2V0Qm9keT0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICByZXR1cm4gdGhpcy5ib2R5XHJcbn07XHJcblxyXG4vKipcclxuICogU2V0IHRoZSB0eXBlIG9mIHRoZSBOb3RpZmljYXRpb24gaW5zdGFuY2UuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSB0eXBlXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5Ob3RpZmljYXRpb24ucHJvdG90eXBlLnNldFR5cGU9IGZ1bmN0aW9uKHR5cGUpXHJcbntcclxuICAgIHRoaXMudHlwZT0gdHlwZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIHR5cGUgb2YgdGhlIE5vdGlmaWNhdGlvbiBpbnN0YW5jZS5cclxuICpcclxuICogQHJldHVybiB7T2JqZWN0fVxyXG4gKi9cclxuTm90aWZpY2F0aW9uLnByb3RvdHlwZS5nZXRUeXBlPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHJldHVybiB0aGlzLnR5cGU7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0IGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBOb3RpZmljYXRpb24gaW5zdGFuY2VcclxuICpcclxuICogQHJldHVybiB7c3RyaW5nfVxyXG4gKi9cclxuTm90aWZpY2F0aW9uLnByb3RvdHlwZS50b1N0cmluZz0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICB2YXIgbXNnPSBcIk5vdGlmaWNhdGlvbiBOYW1lOiBcIiArIHRoaXMuZ2V0TmFtZSgpO1xyXG4gICAgbXNnKz0gXCJcXG5Cb2R5OlwiICsgKCh0aGlzLmJvZHkgPT0gbnVsbCApID8gXCJudWxsXCIgOiB0aGlzLmJvZHkudG9TdHJpbmcoKSk7XHJcbiAgICBtc2crPSBcIlxcblR5cGU6XCIgKyAoKHRoaXMudHlwZSA9PSBudWxsICkgPyBcIm51bGxcIiA6IHRoaXMudHlwZSk7XHJcbiAgICByZXR1cm4gbXNnO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRoZSBOb3RpZmljYXRpb25zIG5hbWUuXHJcbiAqXHJcbiAqIEB0eXBlIHtzdHJpbmd9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5Ob3RpZmljYXRpb24ucHJvdG90eXBlLm5hbWU9IG51bGw7XHJcblxyXG4vKipcclxuICogVGhlIE5vdGlmaWNhdGlvbnMgdHlwZS5cclxuICpcclxuICogQHR5cGUge3N0cmluZ31cclxuICogQHByaXZhdGVcclxuICovXHJcbk5vdGlmaWNhdGlvbi5wcm90b3R5cGUudHlwZT0gbnVsbDtcclxuXHJcbi8qKlxyXG4gKiBUaGUgTm90aWZpY2F0aW9ucyBib2R5LlxyXG4gKlxyXG4gKiBAdHlwZSB7T2JqZWN0fVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuTm90aWZpY2F0aW9uLnByb3RvdHlwZS5ib2R5PSBudWxsO1xyXG4vKipcclxuICogQGF1dGhvciBQdXJlTVZDIEpTIE5hdGl2ZSBQb3J0IGJ5IERhdmlkIEZvbGV5LCBGcsOpZMOpcmljIFNhdW5pZXIsICYgQWxhaW4gRHVjaGVzbmVhdVxyXG4gKiBAYXV0aG9yIENvcHlyaWdodChjKSAyMDA2LTIwMTIgRnV0dXJlc2NhbGUsIEluYy4sIFNvbWUgcmlnaHRzIHJlc2VydmVkLlxyXG4gKlxyXG4gKiBAY2xhc3MgcHVyZW12Yy5Ob3RpZmllclxyXG4gKlxyXG4gKiBBIEJhc2UgTm90aWZpZXIgaW1wbGVtZW50YXRpb24uXHJcbiAqXHJcbiAqIHtAbGluayBwdXJlbXZjLk1hY3JvQ29tbWFuZCBNYWNyb0NvbW1hbmR9LFxyXG4gKiB7QGxpbmsgcHVyZW12Yy5TaW1wbGVDb21tYW5kIFNpbXBsZUNvbW1hbmR9LFxyXG4gKiB7QGxpbmsgcHVyZW12Yy5NZWRpYXRvciBNZWRpYXRvcn0gYW5kXHJcbiAqIHtAbGluayBwdXJlbXZjLlByb3h5IFByb3h5fVxyXG4gKiBhbGwgaGF2ZSBhIG5lZWQgdG8gc2VuZCBOb3RpZmljYXRpb25zXHJcbiAqXHJcbiAqIFRoZSBOb3RpZmllciBpbnRlcmZhY2UgcHJvdmlkZXMgYSBjb21tb24gbWV0aG9kIGNhbGxlZCAjc2VuZE5vdGlmaWNhdGlvbiB0aGF0XHJcbiAqIHJlbGlldmVzIGltcGxlbWVudGF0aW9uIGNvZGUgb2YgdGhlIG5lY2Vzc2l0eSB0byBhY3R1YWxseSBjb25zdHJ1Y3RcclxuICogTm90aWZpY2F0aW9ucy5cclxuICpcclxuICogVGhlIE5vdGlmaWVyIGNsYXNzLCB3aGljaCBhbGwgb2YgdGhlIGFib3ZlIG1lbnRpb25lZCBjbGFzc2VzXHJcbiAqIGV4dGVuZCwgcHJvdmlkZXMgYW4gaW5pdGlhbGl6ZWQgcmVmZXJlbmNlIHRvIHRoZVxyXG4gKiB7QGxpbmsgcHVyZW12Yy5GYWNhZGUgRmFjYWRlfVxyXG4gKiBNdWx0aXRvbiwgd2hpY2ggaXMgcmVxdWlyZWQgZm9yIHRoZSBjb252aWVuaWVuY2UgbWV0aG9kXHJcbiAqIGZvciBzZW5kaW5nIE5vdGlmaWNhdGlvbnMgYnV0IGFsc28gZWFzZXMgaW1wbGVtZW50YXRpb24gYXMgdGhlc2VcclxuICogY2xhc3NlcyBoYXZlIGZyZXF1ZW50XHJcbiAqIHtAbGluayBwdXJlbXZjLkZhY2FkZSBGYWNhZGV9IGludGVyYWN0aW9uc1xyXG4gKiBhbmQgdXN1YWxseSByZXF1aXJlIGFjY2VzcyB0byB0aGUgZmFjYWRlIGFueXdheS5cclxuICpcclxuICogTk9URTogSW4gdGhlIE11bHRpQ29yZSB2ZXJzaW9uIG9mIHRoZSBmcmFtZXdvcmssIHRoZXJlIGlzIG9uZSBjYXZlYXQgdG9cclxuICogbm90aWZpZXJzLCB0aGV5IGNhbm5vdCBzZW5kIG5vdGlmaWNhdGlvbnMgb3IgcmVhY2ggdGhlIGZhY2FkZSB1bnRpbCB0aGV5XHJcbiAqIGhhdmUgYSB2YWxpZCBtdWx0aXRvbktleS5cclxuICpcclxuICogVGhlIG11bHRpdG9uS2V5IGlzIHNldDpcclxuICogICAtIG9uIGEgQ29tbWFuZCB3aGVuIGl0IGlzIGV4ZWN1dGVkIGJ5IHRoZSBDb250cm9sbGVyXHJcbiAqICAgLSBvbiBhIE1lZGlhdG9yIGlzIHJlZ2lzdGVyZWQgd2l0aCB0aGUgVmlld1xyXG4gKiAgIC0gb24gYSBQcm94eSBpcyByZWdpc3RlcmVkIHdpdGggdGhlIE1vZGVsLlxyXG4gKlxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIE5vdGlmaWVyKClcclxue1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhbmQgc2VuZCBhIE5vdGlmaWNhdGlvbi5cclxuICpcclxuICogS2VlcHMgdXMgZnJvbSBoYXZpbmcgdG8gY29uc3RydWN0IG5ldyBOb3RpZmljYXRpb24gaW5zdGFuY2VzIGluIG91clxyXG4gKiBpbXBsZW1lbnRhdGlvbiBjb2RlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbm90aWZpY2F0aW9uTmFtZVxyXG4gKiAgQSBub3RpZmljYXRpb24gbmFtZVxyXG4gKiBAcGFyYW0ge09iamVjdH0gW2JvZHldXHJcbiAqICBUaGUgYm9keSBvZiB0aGUgbm90aWZpY2F0aW9uXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbdHlwZV1cclxuICogIFRoZSBub3RpZmljYXRpb24gdHlwZVxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuTm90aWZpZXIucHJvdG90eXBlLnNlbmROb3RpZmljYXRpb24gPSBmdW5jdGlvbihub3RpZmljYXRpb25OYW1lLCBib2R5LCB0eXBlKVxyXG57XHJcbiAgICB2YXIgZmFjYWRlID0gdGhpcy5nZXRGYWNhZGUoKTtcclxuICAgIGlmKGZhY2FkZSlcclxuICAgIHtcclxuICAgICAgICBmYWNhZGUuc2VuZE5vdGlmaWNhdGlvbihub3RpZmljYXRpb25OYW1lLCBib2R5LCB0eXBlKTtcclxuICAgIH1cclxufTtcclxuXHJcblxyXG4vKipcclxuICogQHByb3RlY3RlZFxyXG4gKiBBIHJlZmVyZW5jZSB0byB0aGlzIE5vdGlmaWVyJ3MgRmFjYWRlLiBUaGlzIHJlZmVyZW5jZSB3aWxsIG5vdCBiZSBhdmFpbGFibGVcclxuICogdW50aWwgI2luaXRpYWxpemVOb3RpZmllciBoYXMgYmVlbiBjYWxsZWQuXHJcbiAqXHJcbiAqIEB0eXBlIHtwdXJlbXZjLkZhY2FkZX1cclxuICovXHJcbk5vdGlmaWVyLnByb3RvdHlwZS5mYWNhZGU7XHJcblxyXG4vKipcclxuICogSW5pdGlhbGl6ZSB0aGlzIE5vdGlmaWVyIGluc3RhbmNlLlxyXG4gKlxyXG4gKiBUaGlzIGlzIGhvdyBhIE5vdGlmaWVyIGdldHMgaXRzIG11bHRpdG9uS2V5LlxyXG4gKiBDYWxscyB0byAjc2VuZE5vdGlmaWNhdGlvbiBvciB0byBhY2Nlc3MgdGhlXHJcbiAqIGZhY2FkZSB3aWxsIGZhaWwgdW50aWwgYWZ0ZXIgdGhpcyBtZXRob2RcclxuICogaGFzIGJlZW4gY2FsbGVkLlxyXG4gKlxyXG4gKiBNZWRpYXRvcnMsIENvbW1hbmRzIG9yIFByb3hpZXMgbWF5IG92ZXJyaWRlXHJcbiAqIHRoaXMgbWV0aG9kIGluIG9yZGVyIHRvIHNlbmQgbm90aWZpY2F0aW9uc1xyXG4gKiBvciBhY2Nlc3MgdGhlIE11bHRpdG9uIEZhY2FkZSBpbnN0YW5jZSBhc1xyXG4gKiBzb29uIGFzIHBvc3NpYmxlLiBUaGV5IENBTk5PVCBhY2Nlc3MgdGhlIGZhY2FkZVxyXG4gKiBpbiB0aGVpciBjb25zdHJ1Y3RvcnMsIHNpbmNlIHRoaXMgbWV0aG9kIHdpbGwgbm90XHJcbiAqIHlldCBoYXZlIGJlZW4gY2FsbGVkLlxyXG4gKlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5XHJcbiAqICBUaGUgTm90aWZpZXJzIG11bHRpdG9uIGtleTtcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbk5vdGlmaWVyLnByb3RvdHlwZS5pbml0aWFsaXplTm90aWZpZXIgPSBmdW5jdGlvbihrZXkpXHJcbntcclxuICAgIHRoaXMubXVsdGl0b25LZXkgPSBTdHJpbmcoa2V5KTtcclxuICAgIHRoaXMuZmFjYWRlPSB0aGlzLmdldEZhY2FkZSgpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHJpZXZlIHRoZSBNdWx0aXRvbiBGYWNhZGUgaW5zdGFuY2VcclxuICpcclxuICpcclxuICogQHByb3RlY3RlZFxyXG4gKiBAcmV0dXJuIHtwdXJlbXZjLkZhY2FkZX1cclxuICovXHJcbk5vdGlmaWVyLnByb3RvdHlwZS5nZXRGYWNhZGUgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIGlmKHRoaXMubXVsdGl0b25LZXkgPT0gbnVsbClcclxuICAgIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoTm90aWZpZXIuTVVMVElUT05fTVNHKTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIEZhY2FkZS5nZXRJbnN0YW5jZSh0aGlzLm11bHRpdG9uS2V5KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqIFRoZSBOb3RpZmllcnMgaW50ZXJuYWwgbXVsdGl0b24ga2V5LlxyXG4gKlxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEB0eXBlIHN0cmluZ1xyXG4gKi9cclxuTm90aWZpZXIucHJvdG90eXBlLm11bHRpdG9uS2V5ID0gbnVsbDtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqIFRoZSBlcnJvciBtZXNzYWdlIHVzZWQgaWYgdGhlIE5vdGlmaWVyIGlzIG5vdCBpbml0aWFsaXplZCBjb3JyZWN0bHkgYW5kXHJcbiAqIGF0dGVtcHRzIHRvIHJldHJpZXZlIGl0cyBvd24gbXVsdGl0b24ga2V5XHJcbiAqXHJcbiAqIEBzdGF0aWNcclxuICogQHByb3RlY3RlZFxyXG4gKiBAY29uc3RcclxuICogQHR5cGUgc3RyaW5nXHJcbiAqL1xyXG5Ob3RpZmllci5NVUxUSVRPTl9NU0cgPSBcIm11bHRpdG9uS2V5IGZvciB0aGlzIE5vdGlmaWVyIG5vdCB5ZXQgaW5pdGlhbGl6ZWQhXCI7XHJcbi8qKlxyXG4gKiBAYXV0aG9yIFB1cmVNVkMgSlMgTmF0aXZlIFBvcnQgYnkgRGF2aWQgRm9sZXksIEZyw6lkw6lyaWMgU2F1bmllciwgJiBBbGFpbiBEdWNoZXNuZWF1XHJcbiAqIEBhdXRob3IgQ29weXJpZ2h0KGMpIDIwMDYtMjAxMiBGdXR1cmVzY2FsZSwgSW5jLiwgU29tZSByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIEBjbGFzcyBwdXJlbXZjLlNpbXBsZUNvbW1hbmRcclxuICogQGV4dGVuZHMgcHVyZW12Yy5Ob3RpZmllclxyXG4gKlxyXG4gKiBTaW1wbGVDb21tYW5kcyBlbmNhcHN1bGF0ZSB0aGUgYnVzaW5lc3MgbG9naWMgb2YgeW91ciBhcHBsaWNhdGlvbi4gWW91clxyXG4gKiBzdWJjbGFzcyBzaG91bGQgb3ZlcnJpZGUgdGhlICNleGVjdXRlIG1ldGhvZCB3aGVyZSB5b3VyIGJ1c2luZXNzIGxvZ2ljIHdpbGxcclxuICogaGFuZGxlIHRoZVxyXG4gKiB7QGxpbmsgcHVyZW12Yy5Ob3RpZmljYXRpb24gTm90aWZpY2F0aW9ufVxyXG4gKlxyXG4gKiBUYWtlIGEgbG9vayBhdFxyXG4gKiB7QGxpbmsgcHVyZW12Yy5GYWNhZGUjcmVnaXN0ZXJDb21tYW5kIEZhY2FkZSdzIHJlZ2lzdGVyQ29tbWFuZH1cclxuICogb3Ige0BsaW5rIHB1cmVtdmMuQ29udHJvbGxlciNyZWdpc3RlckNvbW1hbmQgQ29udHJvbGxlcnMgcmVnaXN0ZXJDb21tYW5kfVxyXG4gKiBtZXRob2RzIHRvIHNlZSBob3cgdG8gYWRkIGNvbW1hbmRzIHRvIHlvdXIgYXBwbGljYXRpb24uXHJcbiAqXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gU2ltcGxlQ29tbWFuZCAoKSB7IH07XHJcblxyXG5TaW1wbGVDb21tYW5kLnByb3RvdHlwZT0gbmV3IE5vdGlmaWVyO1xyXG5TaW1wbGVDb21tYW5kLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj0gU2ltcGxlQ29tbWFuZDtcclxuXHJcbi8qKlxyXG4gKiBGdWxmaWxsIHRoZSB1c2UtY2FzZSBpbml0aWF0ZWQgYnkgdGhlIGdpdmVuIE5vdGlmaWNhdGlvblxyXG4gKlxyXG4gKiBJbiB0aGUgQ29tbWFuZCBQYXR0ZXJuLCBhbiBhcHBsaWNhdGlvbiB1c2UtY2FzZSB0eXBpY2FsbHkgYmVnaW5zIHdpdGggc29tZVxyXG4gKiB1c2VyIGFjdGlvbiwgd2hpY2ggcmVzdWx0cyBpbiBhIE5vdGlmaWNhdGlvbiBpcyBoYW5kbGVkIGJ5IHRoZSBidXNpbmVzcyBsb2dpY1xyXG4gKiBpbiB0aGUgI2V4ZWN1dGUgbWV0aG9kIG9mIGEgY29tbWFuZC5cclxuICpcclxuICogQHBhcmFtIHtwdXJlbXZjLk5vdGlmaWNhdGlvbn0gbm90aWZpY2F0aW9uXHJcbiAqICBUaGUgbm90aWZpY2F0aW9uIHRvIGhhbmRsZS5cclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcblNpbXBsZUNvbW1hbmQucHJvdG90eXBlLmV4ZWN1dGU9IGZ1bmN0aW9uIChub3RpZmljYXRpb24pIHsgfTtcclxuLyoqXHJcbiAqIEBhdXRob3IgUHVyZU1WQyBKUyBOYXRpdmUgUG9ydCBieSBEYXZpZCBGb2xleSwgRnLDqWTDqXJpYyBTYXVuaWVyLCAmIEFsYWluIER1Y2hlc25lYXVcclxuICogQGF1dGhvciBDb3B5cmlnaHQoYykgMjAwNi0yMDEyIEZ1dHVyZXNjYWxlLCBJbmMuLCBTb21lIHJpZ2h0cyByZXNlcnZlZC5cclxuICpcclxuICogQGNsYXNzIHB1cmVtdmMuTWFjcm9Db21tYW5kXHJcbiAqIEBleHRlbmRzIHB1cmVtdmMuTm90aWZpZXJcclxuICpcclxuICogQSBiYXNlIGNvbW1hbmQgaW1wbGVtZW50YXRpb24gdGhhdCBleGVjdXRlcyBvdGhlciBjb21tYW5kcywgc3VjaCBhc1xyXG4gKiB7QGxpbmsgcHVyZW12Yy5TaW1wbGVDb21tYW5kIFNpbXBsZUNvbW1hbmR9XHJcbiAqIG9yIHtAbGluayBwdXJlbXZjLk1hY3JvQ29tbWFuZCBNYWNyb0NvbW1hbmR9XHJcbiAqIHN1YmNsYXNzZXMuXHJcbiAqXHJcbiAqIEEgTWFjcm9Db21tYW5kIG1haW50YWlucyBhbiBsaXN0IG9mXHJcbiAqIGNvbW1hbmQgY29uc3RydWN0b3IgcmVmZXJlbmNlcyBjYWxsZWQgKlN1YkNvbW1hbmRzKi5cclxuICpcclxuICogV2hlbiAjZXhlY3V0ZSBpcyBjYWxsZWQsIHRoZSBNYWNyb0NvbW1hbmRcclxuICogaW5zdGFudGlhdGVzIGFuZCBjYWxscyAjZXhlY3V0ZSBvbiBlYWNoIG9mIGl0cyAqU3ViQ29tbWFuZHMqIGluIHR1cm4uXHJcbiAqIEVhY2ggKlN1YkNvbW1hbmQqIHdpbGwgYmUgcGFzc2VkIGEgcmVmZXJlbmNlIHRvIHRoZSBvcmlnaW5hbFxyXG4gKiB7QGxpbmsgcHVyZW12Yy5Ob3RpZmljYXRpb24gTm90aWZpY2F0aW9ufVxyXG4gKiB0aGF0IHdhcyBwYXNzZWQgdG8gdGhlIE1hY3JvQ29tbWFuZHMgI2V4ZWN1dGUgbWV0aG9kXHJcbiAqXHJcbiAqIFVubGlrZSB7QGxpbmsgcHVyZW12Yy5TaW1wbGVDb21tYW5kIFNpbXBsZUNvbW1hbmR9LFxyXG4gKiB5b3VyIHN1YmNsYXNzIHNob3VsZCBub3Qgb3ZlcnJpZGUgI2V4ZWN1dGUgYnV0IGluc3RlYWQsIHNob3VsZFxyXG4gKiBvdmVycmlkZSB0aGUgI2luaXRpYWxpemVNYWNyb0NvbW1hbmQgbWV0aG9kLCBjYWxsaW5nICNhZGRTdWJDb21tYW5kIG9uY2UgZm9yXHJcbiAqIGVhY2ggKlN1YkNvbW1hbmQqIHRvIGJlIGV4ZWN1dGVkLlxyXG4gKlxyXG4gKiBJZiB5b3VyIHN1YmNsYXNzIGRvZXMgZGVmaW5lIGEgY29uc3RydWN0b3IsIGJlIHN1cmUgdG8gY2FsbCBcInN1cGVyXCIgbGlrZSBzb1xyXG4gKlxyXG4gKiAgICAgZnVuY3Rpb24gTXlNYWNyb0NvbW1hbmQgKClcclxuICogICAgIHtcclxuICogICAgICAgICBNYWNyb0NvbW1hbmQuY2FsbCh0aGlzKTtcclxuICogICAgIH07XHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gTWFjcm9Db21tYW5kKClcclxue1xyXG4gICAgdGhpcy5zdWJDb21tYW5kcz0gW107XHJcbiAgICB0aGlzLmluaXRpYWxpemVNYWNyb0NvbW1hbmQoKTtcclxufTtcclxuXHJcbi8qIHN1YmNsYXNzIE5vdGlmaWVyICovXHJcbk1hY3JvQ29tbWFuZC5wcm90b3R5cGU9IG5ldyBOb3RpZmllcjtcclxuTWFjcm9Db21tYW5kLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj0gTWFjcm9Db21tYW5kO1xyXG5cclxuLyoqXHJcbiAqIEBwcml2YXRlXHJcbiAqIEB0eXBlIHtBcnJheS48cHVyZW12Yy5TaW1wbGVDb21tYW5kfHB1cmVtdmMuTWFjcm9Db21tYW5kPn1cclxuICovXHJcbk1hY3JvQ29tbWFuZC5wcm90b3R5cGUuc3ViQ29tbWFuZHM9IG51bGw7XHJcblxyXG4vKipcclxuICogQHByb3RlY3RlZFxyXG4gKiBJbml0aWFsaXplIHRoZSBNYWNyb0NvbW1hbmQuXHJcbiAqXHJcbiAqIEluIHlvdXIgc3ViY2xhc3MsIG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvXHJcbiAqIGluaXRpYWxpemUgdGhlIE1hY3JvQ29tbWFuZCdzICpTdWJDb21tYW5kKlxyXG4gKiBsaXN0IHdpdGggY29tbWFuZCBjbGFzcyByZWZlcmVuY2VzIGxpa2VcclxuICogdGhpczpcclxuICpcclxuICogICAgIC8vIEluaXRpYWxpemUgTXlNYWNyb0NvbW1hbmRcclxuICogICAgIE15TWFjcm9Db21tYW5kLnByb3RvdHlwZS5pbml0aWFsaXplTWFjcm9Db21tYW5kPSBmdW5jdGlvbiAoKVxyXG4gKiAgICAge1xyXG4gKiAgICAgICAgIHRoaXMuYWRkU3ViQ29tbWFuZCggY29tLm1lLm15YXBwLmNvbnRyb2xsZXIuRmlyc3RDb21tYW5kICk7XHJcbiAqICAgICAgICAgdGhpcy5hZGRTdWJDb21tYW5kKCBjb20ubWUubXlhcHAuY29udHJvbGxlci5TZWNvbmRDb21tYW5kICk7XHJcbiAqICAgICAgICAgdGhpcy5hZGRTdWJDb21tYW5kKCBjb20ubWUubXlhcHAuY29udHJvbGxlci5UaGlyZENvbW1hbmQgKTtcclxuICogICAgIH07XHJcbiAqXHJcbiAqIE5vdGUgdGhhdCAqU3ViQ29tbWFuZCpzIG1heSBiZSBhbnkgY29tbWFuZCBpbXBsZW1lbnRvcixcclxuICogTWFjcm9Db21tYW5kcyBvciBTaW1wbGVDb21tYW5kcyBhcmUgYm90aCBhY2NlcHRhYmxlLlxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuTWFjcm9Db21tYW5kLnByb3RvdHlwZS5pbml0aWFsaXplTWFjcm9Db21tYW5kPSBmdW5jdGlvbigpIHt9XHJcblxyXG4vKipcclxuICogQHByb3RlY3RlZFxyXG4gKiBBZGQgYSAqU3ViQ29tbWFuZCpcclxuICpcclxuICogVGhlICpTdWJDb21tYW5kKnMgd2lsbCBiZSBjYWxsZWQgaW4gRmlyc3QgSW4gLyBGaXJzdCBPdXQgKEZJRk8pIG9yZGVyXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbW1hbmRDbGFzc1JlZlxyXG4gKiAgQSByZWZlcmVuY2UgdG8gYSBzdWJjbGFzc2VkIFNpbXBsZUNvbW1hbmQgb3IgTWFjcm9Db21tYW5kIGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5NYWNyb0NvbW1hbmQucHJvdG90eXBlLmFkZFN1YkNvbW1hbmQ9IGZ1bmN0aW9uKGNvbW1hbmRDbGFzc1JlZilcclxue1xyXG4gICAgdGhpcy5zdWJDb21tYW5kcy5wdXNoKGNvbW1hbmRDbGFzc1JlZik7XHJcbn07XHJcblxyXG4vKipcclxuICogRXhlY3V0ZSB0aGlzIE1hY3JvQ29tbWFuZHMgKlN1YkNvbW1hbmRzKlxyXG4gKlxyXG4gKiBUaGUgKlN1YkNvbW1hbmQqcyB3aWxsIGJlIGNhbGxlZCBpbiBGaXJzdCBJbiAvIEZpcnN0IE91dCAoRklGTykgb3JkZXJcclxuICogQHBhcmFtIHtwdXJlbXZjLk5vdGlmaWNhdGlvbn0gbm90ZVxyXG4gKiAgVGhlIE5vdGlmaWNhdGlvbiBvYmplY3QgdG8gYmUgcGFzc2VkIHRvIGVhY2ggKlN1YkNvbW1hbmQqXHJcbiAqL1xyXG5NYWNyb0NvbW1hbmQucHJvdG90eXBlLmV4ZWN1dGU9IGZ1bmN0aW9uKG5vdGUpXHJcbntcclxuICAgIC8vIFNJQy0gVE9ETyBvcHRpbWl6ZVxyXG4gICAgd2hpbGUodGhpcy5zdWJDb21tYW5kcy5sZW5ndGggPiAwKVxyXG4gICAge1xyXG4gICAgICAgIHZhciByZWY9IHRoaXMuc3ViQ29tbWFuZHMuc2hpZnQoKTtcclxuICAgICAgICB2YXIgY21kPSBuZXcgcmVmO1xyXG4gICAgICAgIGNtZC5pbml0aWFsaXplTm90aWZpZXIodGhpcy5tdWx0aXRvbktleSk7XHJcbiAgICAgICAgY21kLmV4ZWN1dGUobm90ZSk7XHJcbiAgICB9XHJcbn07XHJcbi8qKlxyXG4gKiBAYXV0aG9yIFB1cmVNVkMgSlMgTmF0aXZlIFBvcnQgYnkgRGF2aWQgRm9sZXksIEZyw6lkw6lyaWMgU2F1bmllciwgJiBBbGFpbiBEdWNoZXNuZWF1XHJcbiAqIEBhdXRob3IgQ29weXJpZ2h0KGMpIDIwMDYtMjAxMiBGdXR1cmVzY2FsZSwgSW5jLiwgU29tZSByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIEBjbGFzcyBwdXJlbXZjLk1lZGlhdG9yXHJcbiAqIEBleHRlbmRzIHB1cmVtdmMuTm90aWZpZXJcclxuICpcclxuICogQSBiYXNlIE1lZGlhdG9yIGltcGxlbWVudGF0aW9uLlxyXG4gKlxyXG4gKiBJbiBQdXJlTVZDLCBNZWRpYXRvciBjbGFzc2VzIGFyZSB1c2VkIHRvIG1lZGlhdGUgY29tbXVuaWNhdGlvbiBiZXR3ZWVuIGEgdmlld1xyXG4gKiBjb21wb25lbnQgYW5kIHRoZSByZXN0IG9mIHRoZSBhcHBsaWNhdGlvbi5cclxuICpcclxuICogQSBNZWRpYXRvciBzaG91bGQgbGlzdGVuIHRvIGl0cyB2aWV3IGNvbXBvbmVudHMgZm9yIGV2ZW50cywgYW5kIGhhbmRsZSB0aGVtXHJcbiAqIGJ5IHNlbmRpbmcgbm90aWZpY2F0aW9ucyAodG8gYmUgaGFuZGxlZCBieSBvdGhlciBNZWRpYXRvcnMsXHJcbiAqIHtAbGluayBwdXJlbXZjLlNpbXBsZUNvbW1hbmQgU2ltcGxlQ29tbWFuZHN9XHJcbiAqIG9yXHJcbiAqIHtAbGluayBwdXJlbXZjLk1hY3JvQ29tbWFuZCBNYWNyb0NvbW1hbmRzfSlcclxuICogb3IgcGFzc2luZyBkYXRhIGZyb20gdGhlIHZpZXcgY29tcG9uZW50IGRpcmVjdGx5IHRvIGFcclxuICoge0BsaW5rIHB1cmVtdmMuUHJveHkgUHJveHl9LCBzdWNoIGFzIHN1Ym1pdHRpbmdcclxuICogdGhlIGNvbnRlbnRzIG9mIGEgZm9ybSB0byBhIHNlcnZpY2UuXHJcbiAqXHJcbiAqIE1lZGlhdG9ycyBzaG91bGQgbm90IHBlcmZvcm0gYnVzaW5lc3MgbG9naWMsIG1haW50YWluIHN0YXRlIG9yIG90aGVyXHJcbiAqIGluZm9ybWF0aW9uIGZvciBpdHMgdmlldyBjb21wb25lbnQsIG9yIGJyZWFrIHRoZSBlbmNhcHN1bGF0aW9uIG9mIHRoZSB2aWV3XHJcbiAqIGNvbXBvbmVudCBieSBtYW5pcHVsYXRpbmcgdGhlIHZpZXcgY29tcG9uZW50J3MgY2hpbGRyZW4uIEl0IHNob3VsZCBvbmx5IGNhbGxcclxuICogbWV0aG9kcyBvciBzZXQgcHJvcGVydGllcyBvbiB0aGUgdmlldyBjb21wb25lbnQuXHJcbiAqXHJcbiAqIFRoZSB2aWV3IGNvbXBvbmVudCBzaG91bGQgZW5jYXBzdWxhdGUgaXRzIG93biBiZWhhdmlvciBhbmQgaW1wbGVtZW50YXRpb24gYnlcclxuICogZXhwb3NpbmcgbWV0aG9kcyBhbmQgcHJvcGVydGllcyB0aGF0IHRoZSBNZWRpYXRvciBjYW4gY2FsbCB3aXRob3V0IGhhdmluZyB0b1xyXG4gKiBrbm93IGFib3V0IHRoZSB2aWV3IGNvbXBvbmVudCdzIGNoaWxkcmVuLlxyXG4gKlxyXG4gKiBAY29uc3RydWN0b3JcclxuICogQHBhcmFtIHtzdHJpbmd9IFttZWRpYXRvck5hbWVdXHJcbiAqICBUaGUgTWVkaWF0b3JzIG5hbWUuIFRoZSBNZWRpYXRvcnMgc3RhdGljICNOQU1FIHZhbHVlIGlzIHVzZWQgYnkgZGVmYXVsdFxyXG4gKiBAcGFyYW0ge09iamVjdH0gW3ZpZXdDb21wb25lbnRdXHJcbiAqICBUaGUgTWVkaWF0b3JzIHtAbGluayAjc2V0Vmlld0NvbXBvbmVudCB2aWV3Q29tcG9uZW50fS5cclxuICovXHJcbmZ1bmN0aW9uIE1lZGlhdG9yIChtZWRpYXRvck5hbWUsIHZpZXdDb21wb25lbnQpXHJcbntcclxuICAgIHRoaXMubWVkaWF0b3JOYW1lPSBtZWRpYXRvck5hbWUgfHwgdGhpcy5jb25zdHJ1Y3Rvci5OQU1FO1xyXG4gICAgdGhpcy52aWV3Q29tcG9uZW50PXZpZXdDb21wb25lbnQ7XHJcbn07XHJcblxyXG4vKipcclxuICogQHN0YXRpY1xyXG4gKiBUaGUgbmFtZSBvZiB0aGUgTWVkaWF0b3IuXHJcbiAqXHJcbiAqIFR5cGljYWxseSwgYSBNZWRpYXRvciB3aWxsIGJlIHdyaXR0ZW4gdG8gc2VydmUgb25lIHNwZWNpZmljIGNvbnRyb2wgb3IgZ3JvdXBcclxuICogb2YgY29udHJvbHMgYW5kIHNvLCB3aWxsIG5vdCBoYXZlIGEgbmVlZCB0byBiZSBkeW5hbWljYWxseSBuYW1lZC5cclxuICpcclxuICogQHR5cGUge3N0cmluZ31cclxuICovXHJcbk1lZGlhdG9yLk5BTUU9IFwiTWVkaWF0b3JcIjtcclxuXHJcbi8qIHN1YmNsYXNzICovXHJcbk1lZGlhdG9yLnByb3RvdHlwZT0gbmV3IE5vdGlmaWVyO1xyXG5NZWRpYXRvci5wcm90b3R5cGUuY29uc3RydWN0b3I9IE1lZGlhdG9yO1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgbmFtZSBvZiB0aGUgTWVkaWF0b3JcclxuICpcclxuICogQHJldHVybiB7c3RyaW5nfVxyXG4gKiAgVGhlIE1lZGlhdG9yIG5hbWVcclxuICovXHJcbk1lZGlhdG9yLnByb3RvdHlwZS5nZXRNZWRpYXRvck5hbWU9IGZ1bmN0aW9uICgpXHJcbntcclxuICAgIHJldHVybiB0aGlzLm1lZGlhdG9yTmFtZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIE1lZGlhdG9ycyB2aWV3IGNvbXBvbmVudC4gVGhpcyBjb3VsZFxyXG4gKiBiZSBhIEhUTUxFbGVtZW50LCBhIGJlc3Bva2UgVWlDb21wb25lbnQgd3JhcHBlclxyXG4gKiBjbGFzcywgYSBNb29Ub29scyBFbGVtZW50LCBhIGpRdWVyeSByZXN1bHQgb3IgYVxyXG4gKiBjc3Mgc2VsZWN0b3IsIGRlcGVuZGluZyBvbiB3aGljaCBET00gYWJzdHJhY3Rpb25cclxuICogbGlicmFyeSB5b3UgYXJlIHVzaW5nLlxyXG4gKlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gdGhlIHZpZXcgY29tcG9uZW50XHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5NZWRpYXRvci5wcm90b3R5cGUuc2V0Vmlld0NvbXBvbmVudD0gZnVuY3Rpb24gKHZpZXdDb21wb25lbnQpXHJcbntcclxuICAgIHRoaXMudmlld0NvbXBvbmVudD0gdmlld0NvbXBvbmVudDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIE1lZGlhdG9ycyB2aWV3IGNvbXBvbmVudC5cclxuICpcclxuICogQWRkaXRpb25hbGx5LCBhbiBvcHRpb25hbCBleHBsaWNpdCBnZXR0ZXIgY2FuIGJlXHJcbiAqIGJlIGRlZmluZWQgaW4gdGhlIHN1YmNsYXNzIHRoYXQgZGVmaW5lcyB0aGVcclxuICogdmlldyBjb21wb25lbnRzLCBwcm92aWRpbmcgYSBtb3JlIHNlbWFudGljIGludGVyZmFjZVxyXG4gKiB0byB0aGUgTWVkaWF0b3IuXHJcbiAqXHJcbiAqIFRoaXMgaXMgZGlmZmVyZW50IGZyb20gdGhlIEFTMyBpbXBsZW1lbnRhdGlvbiBpblxyXG4gKiB0aGUgc2Vuc2UgdGhhdCBubyBjYXN0aW5nIGlzIHJlcXVpcmVkIGZyb20gdGhlXHJcbiAqIG9iamVjdCBzdXBwbGllZCBhcyB0aGUgdmlldyBjb21wb25lbnQuXHJcbiAqXHJcbiAqICAgICBNeU1lZGlhdG9yLnByb3RvdHlwZS5nZXRDb21ib0JveD0gZnVuY3Rpb24gKClcclxuICogICAgIHtcclxuICogICAgICAgICByZXR1cm4gdGhpcy52aWV3Q29tcG9uZW50OyAgXHJcbiAqICAgICB9XHJcbiAqXHJcbiAqIEByZXR1cm4ge09iamVjdH1cclxuICogIFRoZSB2aWV3IGNvbXBvbmVudFxyXG4gKi9cclxuTWVkaWF0b3IucHJvdG90eXBlLmdldFZpZXdDb21wb25lbnQ9IGZ1bmN0aW9uICgpXHJcbntcclxuICAgIHJldHVybiB0aGlzLnZpZXdDb21wb25lbnQ7XHJcbn07XHJcblxyXG4vKipcclxuICogTGlzdCB0aGUgTm90aWZpY2F0aW9uIG5hbWVzIHRoaXMgTWVkaWF0b3IgaXMgaW50ZXJlc3RlZFxyXG4gKiBpbiBiZWluZyBub3RpZmllZCBvZi5cclxuICpcclxuICogQHJldHVybiB7QXJyYXl9XHJcbiAqICBUaGUgbGlzdCBvZiBOb3RpZmljYXRpb24gbmFtZXMuXHJcbiAqL1xyXG5NZWRpYXRvci5wcm90b3R5cGUubGlzdE5vdGlmaWNhdGlvbkludGVyZXN0cz0gZnVuY3Rpb24gKClcclxue1xyXG4gICAgcmV0dXJuIFtdO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEhhbmRsZSBOb3RpZmljYXRpb25zLlxyXG4gKlxyXG4gKiBUeXBpY2FsbHkgdGhpcyB3aWxsIGJlIGhhbmRsZWQgaW4gYSBzd2l0Y2ggc3RhdGVtZW50XHJcbiAqIHdpdGggb25lICdjYXNlJyBlbnRyeSBwZXIgTm90aWZpY2F0aW9uIHRoZSBNZWRpYXRvclxyXG4gKiBpcyBpbnRlcmVzdGVkIGluXHJcbiAqXHJcbiAqIEBwYXJhbSB7cHVyZW12Yy5Ob3RpZmljYXRpb259IG5vdGlmaWNhdGlvblxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuTWVkaWF0b3IucHJvdG90eXBlLmhhbmRsZU5vdGlmaWNhdGlvbj0gZnVuY3Rpb24gKG5vdGlmaWNhdGlvbilcclxue1xyXG4gICAgcmV0dXJuO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENhbGxlZCBieSB0aGUgVmlldyB3aGVuIHRoZSBNZWRpYXRvciBpcyByZWdpc3RlcmVkXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5NZWRpYXRvci5wcm90b3R5cGUub25SZWdpc3Rlcj0gZnVuY3Rpb24gKClcclxue1xyXG4gICAgcmV0dXJuO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENhbGxlZCBieSB0aGUgVmlldyB3aGVuIHRoZSBNZWRpYXRvciBpcyByZW1vdmVkXHJcbiAqL1xyXG5NZWRpYXRvci5wcm90b3R5cGUub25SZW1vdmU9IGZ1bmN0aW9uICgpXHJcbntcclxuICAgIHJldHVybjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqIFRoZSBNZWRpYXRvcnMgbmFtZS4gU2hvdWxkIG9ubHkgYmUgYWNjZXNzZWQgYnkgTWVkaWF0b3Igc3ViY2xhc3Nlcy5cclxuICpcclxuICogQHByb3RlY3RlZFxyXG4gKiBAdHlwZSBzdHJpbmdcclxuICovXHJcbk1lZGlhdG9yLnByb3RvdHlwZS5tZWRpYXRvck5hbWU9IG51bGw7XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKiBUaGUgTWVkaWF0b3JzIHZpZXdDb21wb25lbnQuIFNob3VsZCBvbmx5IGJlIGFjY2Vzc2VkIGJ5IE1lZGlhdG9yIHN1YmNsYXNzZXMuXHJcbiAqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQHR5cGUgT2JqZWN0XHJcbiAqL1xyXG5NZWRpYXRvci5wcm90b3R5cGUudmlld0NvbXBvbmVudD1udWxsO1xyXG4vKipcclxuICogQGF1dGhvciBQdXJlTVZDIEpTIE5hdGl2ZSBQb3J0IGJ5IERhdmlkIEZvbGV5LCBGcsOpZMOpcmljIFNhdW5pZXIsICYgQWxhaW4gRHVjaGVzbmVhdVxyXG4gKiBAYXV0aG9yIENvcHlyaWdodChjKSAyMDA2LTIwMTIgRnV0dXJlc2NhbGUsIEluYy4sIFNvbWUgcmlnaHRzIHJlc2VydmVkLlxyXG4gKlxyXG4gKiBAY2xhc3MgcHVyZW12Yy5Qcm94eVxyXG4gKiBAZXh0ZW5kcyBwdXJlbXZjLk5vdGlmaWVyXHJcbiAqXHJcbiAqIEEgYmFzZSBQcm94eSBpbXBsZW1lbnRhdGlvbi5cclxuICpcclxuICogSW4gUHVyZU1WQywgUHJveHkgY2xhc3NlcyBhcmUgdXNlZCB0byBtYW5hZ2UgcGFydHMgb2YgdGhlIGFwcGxpY2F0aW9uJ3MgZGF0YVxyXG4gKiBtb2RlbC5cclxuICpcclxuICogQSBQcm94eSBtaWdodCBzaW1wbHkgbWFuYWdlIGEgcmVmZXJlbmNlIHRvIGEgbG9jYWwgZGF0YSBvYmplY3QsIGluIHdoaWNoIGNhc2VcclxuICogaW50ZXJhY3Rpbmcgd2l0aCBpdCBtaWdodCBpbnZvbHZlIHNldHRpbmcgYW5kIGdldHRpbmcgb2YgaXRzIGRhdGEgaW5cclxuICogc3luY2hyb25vdXMgZmFzaGlvbi5cclxuICpcclxuICogUHJveHkgY2xhc3NlcyBhcmUgYWxzbyB1c2VkIHRvIGVuY2Fwc3VsYXRlIHRoZSBhcHBsaWNhdGlvbidzIGludGVyYWN0aW9uIHdpdGhcclxuICogcmVtb3RlIHNlcnZpY2VzIHRvIHNhdmUgb3IgcmV0cmlldmUgZGF0YSwgaW4gd2hpY2ggY2FzZSwgd2UgYWRvcHQgYW5cclxuICogYXN5bmNyb25vdXMgaWRpb207IHNldHRpbmcgZGF0YSAob3IgY2FsbGluZyBhIG1ldGhvZCkgb24gdGhlIFByb3h5IGFuZFxyXG4gKiBsaXN0ZW5pbmcgZm9yIGFcclxuICoge0BsaW5rIHB1cmVtdmMuTm90aWZpY2F0aW9uIE5vdGlmaWNhdGlvbn1cclxuICogdG8gYmUgc2VudCAgd2hlbiB0aGUgUHJveHkgaGFzIHJldHJpZXZlZCB0aGUgZGF0YSBmcm9tIHRoZSBzZXJ2aWNlLlxyXG4gKlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gW3Byb3h5TmFtZV1cclxuICogIFRoZSBQcm94eSdzIG5hbWUuIElmIG5vbmUgaXMgcHJvdmlkZWQsIHRoZSBQcm94eSB3aWxsIHVzZSBpdHMgY29uc3RydWN0b3JzXHJcbiAqICBOQU1FIHByb3BlcnR5LlxyXG4gKiBAcGFyYW0ge09iamVjdH0gW2RhdGFdXHJcbiAqICBUaGUgUHJveHkncyBkYXRhIG9iamVjdFxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIFByb3h5KHByb3h5TmFtZSwgZGF0YSlcclxue1xyXG4gICAgdGhpcy5wcm94eU5hbWU9IHByb3h5TmFtZSB8fCB0aGlzLmNvbnN0cnVjdG9yLk5BTUU7XHJcbiAgICBpZihkYXRhICE9IG51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKGRhdGEpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcblByb3h5Lk5BTUU9IFwiUHJveHlcIjtcclxuXHJcblByb3h5LnByb3RvdHlwZT0gbmV3IE5vdGlmaWVyO1xyXG5Qcm94eS5wcm90b3R5cGUuY29uc3RydWN0b3I9IFByb3h5O1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgUHJveHkncyBuYW1lLlxyXG4gKlxyXG4gKiBAcmV0dXJuIHtzdHJpbmd9XHJcbiAqL1xyXG5Qcm94eS5wcm90b3R5cGUuZ2V0UHJveHlOYW1lPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHJldHVybiB0aGlzLnByb3h5TmFtZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIFByb3h5J3MgZGF0YSBvYmplY3RcclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IGRhdGFcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcblByb3h5LnByb3RvdHlwZS5zZXREYXRhPSBmdW5jdGlvbihkYXRhKVxyXG57XHJcbiAgICB0aGlzLmRhdGE9IGRhdGE7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBQcm94eSdzIGRhdGEgb2JqZWN0XHJcbiAqXHJcbiAqIEByZXR1cm4ge09iamVjdH1cclxuICovXHJcblByb3h5LnByb3RvdHlwZS5nZXREYXRhPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHJldHVybiB0aGlzLmRhdGE7XHJcbn07XHJcblxyXG4vKipcclxuICogQ2FsbGVkIGJ5IHRoZSB7QGxpbmsgcHVyZW12Yy5Nb2RlbCBNb2RlbH0gd2hlblxyXG4gKiB0aGUgUHJveHkgaXMgcmVnaXN0ZXJlZC5cclxuICpcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcblByb3h5LnByb3RvdHlwZS5vblJlZ2lzdGVyPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHJldHVybjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDYWxsZWQgYnkgdGhlIHtAbGluayBwdXJlbXZjLk1vZGVsIE1vZGVsfSB3aGVuXHJcbiAqIHRoZSBQcm94eSBpcyByZW1vdmVkLlxyXG4gKlxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuUHJveHkucHJvdG90eXBlLm9uUmVtb3ZlPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHJldHVybjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqIFRoZSBQcm94eXMgbmFtZS5cclxuICpcclxuICogQHByb3RlY3RlZFxyXG4gKiBAdHlwZSBTdHJpbmdcclxuICovXHJcblByb3h5LnByb3RvdHlwZS5wcm94eU5hbWU9IG51bGw7XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKiBUaGUgUHJveHkncyBkYXRhIG9iamVjdC5cclxuICpcclxuICogQHByb3RlY3RlZFxyXG4gKiBAdHlwZSBPYmplY3RcclxuICovXHJcblByb3h5LnByb3RvdHlwZS5kYXRhPSBudWxsO1xyXG4vKipcclxuICogQGF1dGhvciBQdXJlTVZDIEpTIE5hdGl2ZSBQb3J0IGJ5IERhdmlkIEZvbGV5LCBGcsOpZMOpcmljIFNhdW5pZXIsICYgQWxhaW4gRHVjaGVzbmVhdVxyXG4gKiBAYXV0aG9yIENvcHlyaWdodChjKSAyMDA2LTIwMTIgRnV0dXJlc2NhbGUsIEluYy4sIFNvbWUgcmlnaHRzIHJlc2VydmVkLlxyXG4gKlxyXG4gKiBAY2xhc3MgcHVyZW12Yy5GYWNhZGVcclxuICogRmFjYWRlIGV4cG9zZXMgdGhlIGZ1bmN0aW9uYWxpdHkgb2YgdGhlIENvbnRyb2xsZXIsIE1vZGVsIGFuZCBWaWV3XHJcbiAqIGFjdG9ycyB0byBjbGllbnQgZmFjaW5nIGNvZGUuXHJcbiAqXHJcbiAqIFRoaXMgRmFjYWRlIGltcGxlbWVudGF0aW9uIGlzIGEgTXVsdGl0b24sIHNvIHlvdSBzaG91bGQgbm90IGNhbGwgdGhlXHJcbiAqIGNvbnN0cnVjdG9yIGRpcmVjdGx5LCBidXQgaW5zdGVhZCBjYWxsIHRoZSBzdGF0aWMgRmFjdG9yeSBtZXRob2QsXHJcbiAqIHBhc3NpbmcgdGhlIHVuaXF1ZSBrZXkgZm9yIHRoaXMgaW5zdGFuY2UgdG8gI2dldEluc3RhbmNlXHJcbiAqXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5XHJcbiAqIFx0VGhlIG11bHRpdG9uIGtleSB0byB1c2UgdG8gcmV0cmlldmUgdGhlIEZhY2FkZSBpbnN0YW5jZS5cclxuICogQHRocm93cyB7RXJyb3J9XHJcbiAqICBJZiBhbiBhdHRlbXB0IGlzIG1hZGUgdG8gaW5zdGFudGlhdGUgRmFjYWRlIGRpcmVjdGx5XHJcbiAqL1xyXG5mdW5jdGlvbiBGYWNhZGUoa2V5KVxyXG57XHJcbiAgICBpZihGYWNhZGUuaW5zdGFuY2VNYXBba2V5XSAhPSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihGYWNhZGUuTVVMVElUT05fTVNHKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmluaXRpYWxpemVOb3RpZmllcihrZXkpO1xyXG4gICAgRmFjYWRlLmluc3RhbmNlTWFwW2tleV0gPSB0aGlzO1xyXG4gICAgdGhpcy5pbml0aWFsaXplRmFjYWRlKCk7XHJcbn07XHJcblxyXG4vKipcclxuICogSW5pdGlhbGl6ZSB0aGUgTXVsdGl0b24gRmFjYWRlIGluc3RhbmNlLlxyXG4gKlxyXG4gKiBDYWxsZWQgYXV0b21hdGljYWxseSBieSB0aGUgY29uc3RydWN0b3IuIE92ZXJyaWRlIGluIHlvdXIgc3ViY2xhc3MgdG8gYW55XHJcbiAqIHN1YmNsYXNzIHNwZWNpZmljIGluaXRpYWxpemF0aW9ucy4gQmUgc3VyZSB0byBjYWxsIHRoZSAnc3VwZXInXHJcbiAqIGluaXRpYWxpemVGYWNhZGUgbWV0aG9kLCB0aG91Z2hcclxuICpcclxuICogICAgIE15RmFjYWRlLnByb3RvdHlwZS5pbml0aWFsaXplRmFjYWRlPSBmdW5jdGlvbiAoKVxyXG4gKiAgICAge1xyXG4gKiAgICAgICAgIEZhY2FkZS5jYWxsKHRoaXMpO1xyXG4gKiAgICAgfTtcclxuICogQHByb3RlY3RlZFxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuRmFjYWRlLnByb3RvdHlwZS5pbml0aWFsaXplRmFjYWRlID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICB0aGlzLmluaXRpYWxpemVNb2RlbCgpO1xyXG4gICAgdGhpcy5pbml0aWFsaXplQ29udHJvbGxlcigpO1xyXG4gICAgdGhpcy5pbml0aWFsaXplVmlldygpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEZhY2FkZSBNdWx0aXRvbiBGYWN0b3J5IG1ldGhvZC5cclxuICogTm90ZSB0aGF0IHRoaXMgbWV0aG9kIHdpbGwgcmV0dXJuIG51bGwgaWYgc3VwcGxpZWQgYVxyXG4gKiBudWxsIG9yIHVuZGVmaW5lZCBtdWx0aXRvbiBrZXkuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcclxuICogXHRUaGUgbXVsdGl0b24ga2V5IHVzZSB0byByZXRyaWV2ZSBhIHBhcnRpY3VsYXIgRmFjYWRlIGluc3RhbmNlXHJcbiAqIEByZXR1cm4ge3B1cmVtdmMuRmFjYWRlfVxyXG4gKi9cclxuRmFjYWRlLmdldEluc3RhbmNlID0gZnVuY3Rpb24oa2V5KVxyXG57XHJcbiAgICBpZiAobnVsbCA9PSBrZXkpXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgaWYoRmFjYWRlLmluc3RhbmNlTWFwW2tleV0gPT0gbnVsbClcclxuICAgIHtcclxuICAgICAgICBGYWNhZGUuaW5zdGFuY2VNYXBba2V5XSA9IG5ldyBGYWNhZGUoa2V5KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gRmFjYWRlLmluc3RhbmNlTWFwW2tleV07XHJcbn07XHJcblxyXG4vKipcclxuICogSW5pdGlhbGl6ZSB0aGUge0BsaW5rIHB1cmVtdmMuQ29udHJvbGxlciBDb250cm9sbGVyfS5cclxuICpcclxuICogQ2FsbGVkIGJ5IHRoZSAjaW5pdGlhbGl6ZUZhY2FkZSBtZXRob2QuXHJcbiAqXHJcbiAqIE92ZXJyaWRlIHRoaXMgbWV0aG9kIGluIHlvdXIgc3ViY2xhc3Mgb2YgRmFjYWRlXHJcbiAqIGlmIG9uZSBvciBib3RoIG9mIHRoZSBmb2xsb3dpbmcgYXJlIHRydWU6XHJcbiAqIC0gWW91IHdpc2ggdG8gaW5pdGlhbGl6ZSBhIGRpZmZlcmVudCBDb250cm9sbGVyXHJcbiAqIC0gWW91IGhhdmVcclxuICoge0BsaW5rIHB1cmVtdmMuU2ltcGxlQ29tbWFuZCBTaW1wbGVDb21tYW5kfXNcclxuICogb3Ige0BsaW5rIHB1cmVtdmMuTWFjcm9Db21tYW5kIE1hY3JvQ29tbWFuZH1zXHJcbiAqIHRvIHJlZ2lzdGVyIHdpdGggdGhlIENvbnRyb2xsZXJhdCBzdGFydHVwLlxyXG4gKlxyXG4gKiBJZiB5b3UgZG9uJ3Qgd2FudCB0byBpbml0aWFsaXplIGEgZGlmZmVyZW50IENvbnRyb2xsZXIsXHJcbiAqIGNhbGwgdGhlICdzdXBlcicgaW5pdGlhbGl6ZUNvbnRyb2xsZSBtZXRob2QgYXQgdGhlIGJlZ2lubmluZyBvZiB5b3VyXHJcbiAqIG1ldGhvZCwgdGhlbiByZWdpc3RlciBjb21tYW5kcy5cclxuICpcclxuICogICAgIE15RmFjYWRlLnByb3RvdHlwZS5pbml0aWFsaXplQ29udHJvbGxlcj0gZnVuY3Rpb24gKClcclxuICogICAgIHtcclxuICogICAgICAgICBGYWNhZGUucHJvdG90eXBlLmluaXRpYWxpemVDb250cm9sbGVyLmNhbGwodGhpcyk7XHJcbiAqICAgICAgICAgdGhpcy5yZWdpc3RlckNvbW1hbmQoQXBwQ29uc3RhbnRzLkFfTk9URV9OQU1FLCBBQmVzcG9rZUNvbW1hbmQpXHJcbiAqICAgICB9XHJcbiAqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbkZhY2FkZS5wcm90b3R5cGUuaW5pdGlhbGl6ZUNvbnRyb2xsZXIgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIGlmKHRoaXMuY29udHJvbGxlciAhPSBudWxsKVxyXG4gICAgICAgIHJldHVybjtcclxuXHJcbiAgICB0aGlzLmNvbnRyb2xsZXIgPSBDb250cm9sbGVyLmdldEluc3RhbmNlKHRoaXMubXVsdGl0b25LZXkpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogSW5pdGlhbGl6ZSB0aGUge0BsaW5rIHB1cmVtdmMuTW9kZWwgTW9kZWx9O1xyXG4gKlxyXG4gKiBDYWxsZWQgYnkgdGhlICNpbml0aWFsaXplRmFjYWRlIG1ldGhvZC5cclxuICogT3ZlcnJpZGUgdGhpcyBtZXRob2QgaW4geW91ciBzdWJjbGFzcyBvZiBGYWNhZGUgaWYgb25lIG9mIHRoZSBmb2xsb3dpbmcgYXJlXHJcbiAqIHRydWU6XHJcbiAqXHJcbiAqIC0gWW91IHdpc2ggdG8gaW5pdGlhbGl6ZSBhIGRpZmZlcmVudCBNb2RlbC5cclxuICpcclxuICogLSBZb3UgaGF2ZSB7QGxpbmsgcHVyZW12Yy5Qcm94eSBQcm94eX1zIHRvXHJcbiAqICAgcmVnaXN0ZXIgd2l0aCB0aGUgTW9kZWwgdGhhdCBkbyBub3QgcmV0cmlldmUgYSByZWZlcmVuY2UgdG8gdGhlIEZhY2FkZSBhdFxyXG4gKiAgIGNvbnN0cnVjdGlvbiB0aW1lLlxyXG4gKlxyXG4gKiBJZiB5b3UgZG9uJ3Qgd2FudCB0byBpbml0aWFsaXplIGEgZGlmZmVyZW50IE1vZGVsXHJcbiAqIGNhbGwgJ3N1cGVyJyAjaW5pdGlhbGl6ZU1vZGVsIGF0IHRoZSBiZWdpbm5pbmcgb2YgeW91ciBtZXRob2QsIHRoZW4gcmVnaXN0ZXJcclxuICogUHJveHlzLlxyXG4gKlxyXG4gKiBOb3RlOiBUaGlzIG1ldGhvZCBpcyAqcmFyZWx5KiBvdmVycmlkZGVuOyBpbiBwcmFjdGljZSB5b3UgYXJlIG1vcmVcclxuICogbGlrZWx5IHRvIHVzZSBhIGNvbW1hbmQgdG8gY3JlYXRlIGFuZCByZWdpc3RlclByb3h5cyB3aXRoIHRoZSBNb2RlbD4sXHJcbiAqIHNpbmNlIFByb3h5cyB3aXRoIG11dGFibGUgZGF0YSB3aWxsIGxpa2VseVxyXG4gKiBuZWVkIHRvIHNlbmQgTm90aWZpY2F0aW9ucyBhbmQgdGh1cyB3aWxsIGxpa2VseSB3YW50IHRvIGZldGNoIGEgcmVmZXJlbmNlIHRvXHJcbiAqIHRoZSBGYWNhZGUgZHVyaW5nIHRoZWlyIGNvbnN0cnVjdGlvbi5cclxuICpcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbkZhY2FkZS5wcm90b3R5cGUuaW5pdGlhbGl6ZU1vZGVsID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICBpZih0aGlzLm1vZGVsICE9IG51bGwpXHJcbiAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgIHRoaXMubW9kZWwgPSBNb2RlbC5nZXRJbnN0YW5jZSh0aGlzLm11bHRpdG9uS2V5KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqXHJcbiAqIEluaXRpYWxpemUgdGhlIHtAbGluayBwdXJlbXZjLlZpZXcgVmlld30uXHJcbiAqXHJcbiAqIENhbGxlZCBieSB0aGUgI2luaXRpYWxpemVGYWNhZGUgbWV0aG9kLlxyXG4gKlxyXG4gKiBPdmVycmlkZSB0aGlzIG1ldGhvZCBpbiB5b3VyIHN1YmNsYXNzIG9mIEZhY2FkZSBpZiBvbmUgb3IgYm90aCBvZiB0aGVcclxuICogZm9sbG93aW5nIGFyZSB0cnVlOlxyXG4gKlxyXG4gKiAtIFlvdSB3aXNoIHRvIGluaXRpYWxpemUgYSBkaWZmZXJlbnQgVmlldy5cclxuICogLSBZb3UgaGF2ZSBPYnNlcnZlcnMgdG8gcmVnaXN0ZXIgd2l0aCB0aGUgVmlld1xyXG4gKlxyXG4gKiBJZiB5b3UgZG9uJ3Qgd2FudCB0byBpbml0aWFsaXplIGEgZGlmZmVyZW50IFZpZXdcclxuICogY2FsbCAnc3VwZXInICNpbml0aWFsaXplVmlldyBhdCB0aGUgYmVnaW5uaW5nIG9mIHlvdXJcclxuICogbWV0aG9kLCB0aGVuIHJlZ2lzdGVyIE1lZGlhdG9yIGluc3RhbmNlcy5cclxuICpcclxuICogICAgIE15RmFjYWRlLnByb3RvdHlwZS5pbml0aWFsaXplVmlldz0gZnVuY3Rpb24gKClcclxuICogICAgIHtcclxuICogICAgICAgICBGYWNhZGUucHJvdG90eXBlLmluaXRpYWxpemVWaWV3LmNhbGwodGhpcyk7XHJcbiAqICAgICAgICAgdGhpcy5yZWdpc3Rlck1lZGlhdG9yKG5ldyBNeU1lZGlhdG9yKCkpO1xyXG4gKiAgICAgfTtcclxuICpcclxuICogTm90ZTogVGhpcyBtZXRob2QgaXMgKnJhcmVseSogb3ZlcnJpZGRlbjsgaW4gcHJhY3RpY2UgeW91IGFyZSBtb3JlXHJcbiAqIGxpa2VseSB0byB1c2UgYSBjb21tYW5kIHRvIGNyZWF0ZSBhbmQgcmVnaXN0ZXIgTWVkaWF0b3JzXHJcbiAqIHdpdGggdGhlIFZpZXcsIHNpbmNlIE1lZGlhdG9yIGluc3RhbmNlcyB3aWxsIG5lZWQgdG8gc2VuZFxyXG4gKiBOb3RpZmljYXRpb25zIGFuZCB0aHVzIHdpbGwgbGlrZWx5IHdhbnQgdG8gZmV0Y2ggYSByZWZlcmVuY2VcclxuICogdG8gdGhlIEZhY2FkZSBkdXJpbmcgdGhlaXIgY29uc3RydWN0aW9uLlxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuRmFjYWRlLnByb3RvdHlwZS5pbml0aWFsaXplVmlldyA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgaWYodGhpcy52aWV3ICE9IG51bGwpXHJcbiAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgIHRoaXMudmlldyA9IFZpZXcuZ2V0SW5zdGFuY2UodGhpcy5tdWx0aXRvbktleSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVnaXN0ZXIgYSBjb21tYW5kIHdpdGggdGhlIENvbnRyb2xsZXIgYnkgTm90aWZpY2F0aW9uIG5hbWVcclxuICogQHBhcmFtIHtzdHJpbmd9IG5vdGlmaWNhdGlvbk5hbWVcclxuICogIFRoZSBuYW1lIG9mIHRoZSBOb3RpZmljYXRpb24gdG8gYXNzb2NpYXRlIHRoZSBjb21tYW5kIHdpdGhcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY29tbWFuZENsYXNzUmVmXHJcbiAqICBBIHJlZmVyZW5jZSBvdCB0aGUgY29tbWFuZHMgY29uc3RydWN0b3IuXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5GYWNhZGUucHJvdG90eXBlLnJlZ2lzdGVyQ29tbWFuZCA9IGZ1bmN0aW9uKG5vdGlmaWNhdGlvbk5hbWUsIGNvbW1hbmRDbGFzc1JlZilcclxue1xyXG4gICAgdGhpcy5jb250cm9sbGVyLnJlZ2lzdGVyQ29tbWFuZChub3RpZmljYXRpb25OYW1lLCBjb21tYW5kQ2xhc3NSZWYpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSBhIHByZXZpb3VzbHkgcmVnaXN0ZXJlZCBjb21tYW5kIHRvIE5vdGlmaWNhdGlvbiBtYXBwaW5nIGZyb20gdGhlXHJcbiAqIHtAbGluayBwdXJlbXZjLkNvbnRyb2xsZXIjcmVtb3ZlQ29tbWFuZCBDb250cm9sbGVyfVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbm90aWZpY2F0aW9uTmFtZVxyXG4gKiAgVGhlIG5hbWUgb2YgdGhlIHRoZSBOb3RpZmljYXRpb24gdG8gcmVtb3ZlIGZyb20gdGhlIGNvbW1hbmQgbWFwcGluZyBmb3IuXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5GYWNhZGUucHJvdG90eXBlLnJlbW92ZUNvbW1hbmQgPSBmdW5jdGlvbihub3RpZmljYXRpb25OYW1lKVxyXG57XHJcbiAgICB0aGlzLmNvbnRyb2xsZXIucmVtb3ZlQ29tbWFuZChub3RpZmljYXRpb25OYW1lKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDaGVjayBpZiBhIGNvbW1hbmQgaXMgcmVnaXN0ZXJlZCBmb3IgYSBnaXZlbiBub3RpZmljYXRpb24uXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBub3RpZmljYXRpb25OYW1lXHJcbiAqICBBIE5vdGlmaWNhdGlvbiBuYW1lXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAqICBXaGV0aGVyIGEgY29tbWFuIGlzIGN1cnJlbnRseSByZWdpc3RlcmVkIGZvciB0aGUgZ2l2ZW4gbm90aWZpY2F0aW9uTmFtZVxyXG4gKi9cclxuRmFjYWRlLnByb3RvdHlwZS5oYXNDb21tYW5kID0gZnVuY3Rpb24obm90aWZpY2F0aW9uTmFtZSlcclxue1xyXG4gICAgcmV0dXJuIHRoaXMuY29udHJvbGxlci5oYXNDb21tYW5kKG5vdGlmaWNhdGlvbk5hbWUpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlZ2lzdGVyIGEgUHJveHkgd2l0aCB0aGUge0BsaW5rIHB1cmVtdmMuTW9kZWwjcmVnaXN0ZXJQcm94eSBNb2RlbH1cclxuICogYnkgbmFtZS5cclxuICpcclxuICogQHBhcmFtIHtwdXJlbXZjLlByb3h5fSBwcm94eVxyXG4gKiAgVGhlIFByb3h5IGluc3RhbmNlIHRvIGJlIHJlZ2lzdGVyZWQgd2l0aCB0aGUgTW9kZWwuXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5GYWNhZGUucHJvdG90eXBlLnJlZ2lzdGVyUHJveHkgPSBmdW5jdGlvbihwcm94eSlcclxue1xyXG4gICAgdGhpcy5tb2RlbC5yZWdpc3RlclByb3h5KHByb3h5KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXRyaWV2ZSBhIFByb3h5IGZyb20gdGhlIE1vZGVsXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm94eU5hbWVcclxuICogQHJldHVybiB7cHVyZW12Yy5Qcm94eX1cclxuICovXHJcbkZhY2FkZS5wcm90b3R5cGUucmV0cmlldmVQcm94eSA9IGZ1bmN0aW9uKHByb3h5TmFtZSlcclxue1xyXG4gICAgcmV0dXJuIHRoaXMubW9kZWwucmV0cmlldmVQcm94eShwcm94eU5hbWUpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSBhIFByb3h5IGZyb20gdGhlIE1vZGVsIGJ5IG5hbWVcclxuICogQHBhcmFtIHtzdHJpbmd9IHByb3h5TmFtZVxyXG4gKiAgVGhlIG5hbWUgb2YgdGhlIFByb3h5XHJcbiAqIEByZXR1cm4ge3B1cmVtdmMuUHJveHl9XHJcbiAqICBUaGUgUHJveHkgdGhhdCB3YXMgcmVtb3ZlZCBmcm9tIHRoZSBNb2RlbFxyXG4gKi9cclxuRmFjYWRlLnByb3RvdHlwZS5yZW1vdmVQcm94eSA9IGZ1bmN0aW9uKHByb3h5TmFtZSlcclxue1xyXG4gICAgdmFyIHByb3h5ID0gbnVsbDtcclxuICAgIGlmKHRoaXMubW9kZWwgIT0gbnVsbClcclxuICAgIHtcclxuICAgICAgICBwcm94eSA9IHRoaXMubW9kZWwucmVtb3ZlUHJveHkocHJveHlOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcHJveHk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ2hlY2sgaXQgYSBQcm94eSBpcyByZWdpc3RlcmVkLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJveHlOYW1lXHJcbiAqICBBIFByb3h5IG5hbWVcclxuICogQHJldHVybiB7Ym9vbGVhbn1cclxuICogIFdoZXRoZXIgYSBQcm94eSBpcyBjdXJyZW50bHkgcmVnaXN0ZXJlZCB3aXRoIHRoZSBnaXZlbiBwcm94eU5hbWVcclxuICovXHJcbkZhY2FkZS5wcm90b3R5cGUuaGFzUHJveHkgPSBmdW5jdGlvbihwcm94eU5hbWUpXHJcbntcclxuICAgIHJldHVybiB0aGlzLm1vZGVsLmhhc1Byb3h5KHByb3h5TmFtZSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVnaXN0ZXIgYSBNZWRpYXRvciB3aXRoIHdpdGggdGhlIFZpZXcuXHJcbiAqXHJcbiAqIEBwYXJhbSB7cHVyZW12Yy5NZWRpYXRvcn0gbWVkaWF0b3JcclxuICogIEEgcmVmZXJlbmNlIHRvIHRoZSBNZWRpYXRvciB0byByZWdpc3RlclxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuRmFjYWRlLnByb3RvdHlwZS5yZWdpc3Rlck1lZGlhdG9yID0gZnVuY3Rpb24obWVkaWF0b3IpXHJcbntcclxuICAgIGlmKHRoaXMudmlldyAhPSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudmlldy5yZWdpc3Rlck1lZGlhdG9yKG1lZGlhdG9yKTtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXRyaWV2ZSBhIE1lZGlhdG9yIGZyb20gdGhlIFZpZXcgYnkgbmFtZVxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVkaWF0b3JOYW1lXHJcbiAqICBUaGUgTWVkaWF0b3JzIG5hbWVcclxuICogQHJldHVybiB7cHVyZW12Yy5NZWRpYXRvcn1cclxuICogIFRoZSByZXRyaWV2ZWQgTWVkaWF0b3JcclxuICovXHJcbkZhY2FkZS5wcm90b3R5cGUucmV0cmlldmVNZWRpYXRvciA9IGZ1bmN0aW9uKG1lZGlhdG9yTmFtZSlcclxue1xyXG4gICAgcmV0dXJuIHRoaXMudmlldy5yZXRyaWV2ZU1lZGlhdG9yKG1lZGlhdG9yTmFtZSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlIGEgTWVkaWF0b3IgZnJvbSB0aGUgVmlldy5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG1lZGlhdG9yTmFtZVxyXG4gKiAgVGhlIG5hbWUgb2YgdGhlIE1lZGlhdG9yIHRvIHJlbW92ZS5cclxuICogQHJldHVybiB7cHVyZW12Yy5NZWRpYXRvcn1cclxuICogIFRoZSByZW1vdmVkIE1lZGlhdG9yXHJcbiAqL1xyXG5GYWNhZGUucHJvdG90eXBlLnJlbW92ZU1lZGlhdG9yID0gZnVuY3Rpb24obWVkaWF0b3JOYW1lKVxyXG57XHJcbiAgICB2YXIgbWVkaWF0b3IgPSBudWxsO1xyXG4gICAgaWYodGhpcy52aWV3ICE9IG51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgbWVkaWF0b3IgPSB0aGlzLnZpZXcucmVtb3ZlTWVkaWF0b3IobWVkaWF0b3JOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbWVkaWF0b3I7XHJcbn07XHJcblxyXG4vKipcclxuICogQ2hlY2sgaWYgYSBNZWRpYXRvciBpcyByZWdpc3RlcmVkIG9yIG5vdC5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG1lZGlhdG9yTmFtZVxyXG4gKiAgQSBNZWRpYXRvciBuYW1lXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAqICBXaGV0aGVyIGEgTWVkaWF0b3IgaXMgcmVnaXN0ZXJlZCB3aXRoIHRoZSBnaXZlbiBtZWRpYXRvck5hbWVcclxuICovXHJcbkZhY2FkZS5wcm90b3R5cGUuaGFzTWVkaWF0b3IgPSBmdW5jdGlvbihtZWRpYXRvck5hbWUpXHJcbntcclxuICAgIHJldHVybiB0aGlzLnZpZXcuaGFzTWVkaWF0b3IobWVkaWF0b3JOYW1lKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYW5kIHNlbmQgYVxyXG4gKiB7QGxpbmsgcHVyZW12Yy5Ob3RpZmljYXRpb24gTm90aWZpY2F0aW9ufVxyXG4gKlxyXG4gKiBLZWVwcyB1cyBmcm9tIGhhdmluZyB0byBjb25zdHJ1Y3QgbmV3IE5vdGlmaWNhdGlvbiBpbnN0YW5jZXMgaW4gb3VyXHJcbiAqIGltcGxlbWVudGF0aW9uXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBub3RpZmljYXRpb25OYW1lXHJcbiAqICBUaGUgbmFtZSBvZiB0aGUgTm90aWZpY2F0aW9uIHRvIHNlbmRcclxuICogQHBhcmFtIHtPYmplY3R9IFtib2R5XVxyXG4gKiAgVGhlIGJvZHkgb2YgdGhlIG5vdGlmaWNhdGlvblxyXG4gKiBAcGFyYW0ge3N0cmluZ30gW3R5cGVdXHJcbiAqICBUaGUgdHlwZSBvZiB0aGUgbm90aWZpY2F0aW9uXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5GYWNhZGUucHJvdG90eXBlLnNlbmROb3RpZmljYXRpb24gPSBmdW5jdGlvbihub3RpZmljYXRpb25OYW1lLCBib2R5LCB0eXBlKVxyXG57XHJcbiAgICB0aGlzLm5vdGlmeU9ic2VydmVycyhuZXcgTm90aWZpY2F0aW9uKG5vdGlmaWNhdGlvbk5hbWUsIGJvZHksIHR5cGUpKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBOb3RpZnkge0BsaW5rIHB1cmVtdmMuT2JzZXJ2ZXIgT2JzZXJ2ZXJ9c1xyXG4gKlxyXG4gKiBUaGlzIG1ldGhvZCBpcyBsZWZ0IHB1YmxpYyBtb3N0bHkgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHksIGFuZCB0byBhbGxvd1xyXG4gKiB5b3UgdG8gc2VuZCBjdXN0b20gbm90aWZpY2F0aW9uIGNsYXNzZXMgdXNpbmcgdGhlIGZhY2FkZS5cclxuICpcclxuICogVXN1YWxseSB5b3Ugc2hvdWxkIGp1c3QgY2FsbCBzZW5kTm90aWZpY2F0aW9uIGFuZCBwYXNzIHRoZSBwYXJhbWV0ZXJzLCBuZXZlclxyXG4gKiBoYXZpbmcgdG8gY29uc3RydWN0IHRoZSBub3RpZmljYXRpb24geW91cnNlbGYuXHJcbiAqXHJcbiAqIEBwYXJhbSB7cHVyZW12Yy5Ob3RpZmljYXRpb259IG5vdGlmaWNhdGlvblxyXG4gKiAgVGhlIE5vdGlmaWNhdGlvbiB0byBzZW5kXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5GYWNhZGUucHJvdG90eXBlLm5vdGlmeU9ic2VydmVycyA9IGZ1bmN0aW9uKG5vdGlmaWNhdGlvbilcclxue1xyXG4gICAgaWYodGhpcy52aWV3ICE9IG51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy52aWV3Lm5vdGlmeU9ic2VydmVycyhub3RpZmljYXRpb24pO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemUgdGhlIEZhY2FkZXMgTm90aWZpZXIgY2FwYWJpbGl0aWVzIGJ5IHNldHRpbmcgdGhlIE11bHRpdG9uIGtleSBmb3JcclxuICogdGhpcyBmYWNhZGUgaW5zdGFuY2UuXHJcbiAqXHJcbiAqIE5vdCBjYWxsZWQgZGlyZWN0bHksIGJ1dCBpbnN0ZWFkIGZyb20gdGhlIGNvbnN0cnVjdG9yIHdoZW4gI2dldEluc3RhbmNlIGlzXHJcbiAqIGludm9rZWQuIEl0IGlzIG5lY2Vzc2FyeSB0byBiZSBwdWJsaWMgaW4gb3JkZXIgdG8gaW1wbGVtZW50IE5vdGlmaWVyXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbkZhY2FkZS5wcm90b3R5cGUuaW5pdGlhbGl6ZU5vdGlmaWVyID0gZnVuY3Rpb24oa2V5KVxyXG57XHJcbiAgICB0aGlzLm11bHRpdG9uS2V5ID0ga2V5O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIGEgKkNvcmUqIGlzIHJlZ2lzdGVyZWQgb3Igbm90XHJcbiAqXHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtzdHJpbmd9IGtleVxyXG4gKiAgVGhlIG11bHRpdG9uIGtleSBmb3IgdGhlICpDb3JlKiBpbiBxdWVzdGlvblxyXG4gKiBAcmV0dXJuIHtib29sZWFufVxyXG4gKiAgV2hldGhlciBhICpDb3JlKiBpcyByZWdpc3RlcmVkIHdpdGggdGhlIGdpdmVuIGtleVxyXG4gKi9cclxuRmFjYWRlLmhhc0NvcmUgPSBmdW5jdGlvbihrZXkpXHJcbntcclxuICAgIHJldHVybiBGYWNhZGUuaW5zdGFuY2VNYXBba2V5XSAhPSBudWxsO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSBhICpDb3JlKlxyXG4gKlxyXG4gKiBSZW1vdmUgdGhlIE1vZGVsLCBWaWV3LCBDb250cm9sbGVyIGFuZCBGYWNhZGUgZm9yIGEgZ2l2ZW4ga2V5LlxyXG4gKlxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbkZhY2FkZS5yZW1vdmVDb3JlID0gZnVuY3Rpb24oa2V5KVxyXG57XHJcbiAgICBpZihGYWNhZGUuaW5zdGFuY2VNYXBba2V5XSA9PSBudWxsKVxyXG4gICAgICAgIHJldHVybjtcclxuXHJcbiAgICBNb2RlbC5yZW1vdmVNb2RlbChrZXkpO1xyXG4gICAgVmlldy5yZW1vdmVWaWV3KGtleSk7XHJcbiAgICBDb250cm9sbGVyLnJlbW92ZUNvbnRyb2xsZXIoa2V5KTtcclxuICAgIGRlbGV0ZSBGYWNhZGUuaW5zdGFuY2VNYXBba2V5XTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqIFRoZSBGYWNhZGVzIGNvcnJlc3BvbmRpbmcgQ29udHJvbGxlclxyXG4gKlxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEB0eXBlIHB1cmVtdmMuQ29udHJvbGxlclxyXG4gKi9cclxuRmFjYWRlLnByb3RvdHlwZS5jb250cm9sbGVyID0gbnVsbDtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqIFRoZSBGYWNhZGVzIGNvcnJlc3BvbmRpbmcgTW9kZWwgaW5zdGFuY2VcclxuICpcclxuICogQHByb3RlY3RlZFxyXG4gKiBAdHlwZSBwdXJlbXZjLk1vZGVsXHJcbiAqL1xyXG5GYWNhZGUucHJvdG90eXBlLm1vZGVsID0gbnVsbDtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqIFRoZSBGYWNhZGVzIGNvcnJlc3BuZGluZyBWaWV3IGluc3RhbmNlLlxyXG4gKlxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEB0eXBlIHB1cmVtdmMuVmlld1xyXG4gKi9cclxuRmFjYWRlLnByb3RvdHlwZS52aWV3ID0gbnVsbDtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqIFRoZSBGYWNhZGVzIG11bHRpdG9uIGtleS5cclxuICpcclxuICogQHByb3RlY3RlZFxyXG4gKiBAdHlwZSBzdHJpbmdcclxuICovXHJcbkZhY2FkZS5wcm90b3R5cGUubXVsdGl0b25LZXkgPSBudWxsO1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICogVGhlIE11bHRpdG9uIEZhY2FkZSBpbnN0YW5jZSBtYXAuXHJcbiAqIEBzdGF0aWNcclxuICogQHByb3RlY3RlZFxyXG4gKiBAdHlwZSBBcnJheVxyXG4gKi9cclxuRmFjYWRlLmluc3RhbmNlTWFwID0gW107XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKiBNZXNzYWdlIENvbnN0YW50c1xyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEB0eXBlIHtzdHJpbmd9XHJcbiAqIEBjb25zdFxyXG4gKiBAc3RhdGljXHJcbiAqL1xyXG5GYWNhZGUuTVVMVElUT05fTVNHID0gXCJGYWNhZGUgaW5zdGFuY2UgZm9yIHRoaXMgTXVsdGl0b24ga2V5IGFscmVhZHkgY29uc3RydWN0ZWQhXCI7XHJcbi8qKlxyXG4gKiBAYXV0aG9yIFB1cmVNVkMgSlMgTmF0aXZlIFBvcnQgYnkgRGF2aWQgRm9sZXksIEZyw6lkw6lyaWMgU2F1bmllciwgJiBBbGFpbiBEdWNoZXNuZWF1XHJcbiAqIEBhdXRob3IgQ29weXJpZ2h0KGMpIDIwMDYtMjAxMiBGdXR1cmVzY2FsZSwgSW5jLiwgU29tZSByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIEBjbGFzcyBwdXJlbXZjLlZpZXdcclxuICpcclxuICogQSBNdWx0aXRvbiBWaWV3IGltcGxlbWVudGF0aW9uLlxyXG4gKlxyXG4gKiBJbiBQdXJlTVZDLCB0aGUgVmlldyBjbGFzcyBhc3N1bWVzIHRoZXNlIHJlc3BvbnNpYmlsaXRpZXNcclxuICpcclxuICogLSBNYWludGFpbiBhIGNhY2hlIG9mIHtAbGluayBwdXJlbXZjLk1lZGlhdG9yIE1lZGlhdG9yfVxyXG4gKiAgIGluc3RhbmNlcy5cclxuICpcclxuICogLSBQcm92aWRlIG1ldGhvZHMgZm9yIHJlZ2lzdGVyaW5nLCByZXRyaWV2aW5nLCBhbmQgcmVtb3ZpbmdcclxuICogICB7QGxpbmsgcHVyZW12Yy5NZWRpYXRvciBNZWRpYXRvcn0uXHJcbiAqXHJcbiAqIC0gTm90aWZpeWluZyB7QGxpbmsgcHVyZW12Yy5NZWRpYXRvciBNZWRpYXRvcn0gd2hlbiB0aGV5IGFyZSByZWdpc3RlcmVkIG9yXHJcbiAqICAgcmVtb3ZlZC5cclxuICpcclxuICogLSBNYW5hZ2luZyB0aGUgb2JzZXJ2ZXIgbGlzdHMgZm9yIGVhY2gge0BsaW5rIHB1cmVtdmMuTm90aWZpY2F0aW9uIE5vdGlmaWNhdGlvbn1cclxuICogICBpbiB0aGUgYXBwbGljYXRpb24uXHJcbiAqXHJcbiAqIC0gUHJvdmlkaW5nIGEgbWV0aG9kIGZvciBhdHRhY2hpbmcge0BsaW5rIHB1cmVtdmMuT2JzZXJ2ZXIgT2JzZXJ2ZXJ9IHRvIGFuXHJcbiAqICAge0BsaW5rIHB1cmVtdmMuTm90aWZpY2F0aW9uIE5vdGlmaWNhdGlvbn0ncyBvYnNlcnZlciBsaXN0LlxyXG4gKlxyXG4gKiAtIFByb3ZpZGluZyBhIG1ldGhvZCBmb3IgYnJvYWRjYXN0aW5nIGEge0BsaW5rIHB1cmVtdmMuTm90aWZpY2F0aW9uIE5vdGlmaWNhdGlvbn0uXHJcbiAqXHJcbiAqIC0gTm90aWZ5aW5nIHRoZSB7QGxpbmsgcHVyZW12Yy5PYnNlcnZlciBPYnNlcnZlcn1zIG9mIGEgZ2l2ZW5cclxuICogICB7QGxpbmsgcHVyZW12Yy5Ob3RpZmljYXRpb24gTm90aWZpY2F0aW9ufSB3aGVuIGl0IGJyb2FkY2FzdC5cclxuICpcclxuICogVGhpcyBWaWV3IGltcGxlbWVudGF0aW9uIGlzIGEgTXVsdGl0b24sIHNvIHlvdSBzaG91bGQgbm90IGNhbGwgdGhlXHJcbiAqIGNvbnN0cnVjdG9yIGRpcmVjdGx5LCBidXQgaW5zdGVhZCBjYWxsIHRoZSBzdGF0aWMgTXVsdGl0b25cclxuICogRmFjdG9yeSAjZ2V0SW5zdGFuY2UgbWV0aG9kLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5XHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKiBAdGhyb3dzIHtFcnJvcn1cclxuICogIGlmIGluc3RhbmNlIGZvciB0aGlzIE11bHRpdG9uIGtleSBoYXMgYWxyZWFkeSBiZWVuIGNvbnN0cnVjdGVkXHJcbiAqL1xyXG5mdW5jdGlvbiBWaWV3KGtleSlcclxue1xyXG4gICAgaWYoVmlldy5pbnN0YW5jZU1hcFtrZXldICE9IG51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFZpZXcuTVVMVElUT05fTVNHKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5tdWx0aXRvbktleSA9IGtleTtcclxuICAgIFZpZXcuaW5zdGFuY2VNYXBbdGhpcy5tdWx0aXRvbktleV0gPSB0aGlzO1xyXG4gICAgdGhpcy5tZWRpYXRvck1hcCA9IFtdO1xyXG4gICAgdGhpcy5vYnNlcnZlck1hcCA9IFtdO1xyXG4gICAgdGhpcy5pbml0aWFsaXplVmlldygpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogSW5pdGlhbGl6ZSB0aGUgU2luZ2xldG9uIFZpZXcgaW5zdGFuY2VcclxuICpcclxuICogQ2FsbGVkIGF1dG9tYXRpY2FsbHkgYnkgdGhlIGNvbnN0cnVjdG9yLCB0aGlzIGlzIHlvdXIgb3Bwb3J0dW5pdHkgdG9cclxuICogaW5pdGlhbGl6ZSB0aGUgU2luZ2xldG9uIGluc3RhbmNlIGluIHlvdXIgc3ViY2xhc3Mgd2l0aG91dCBvdmVycmlkaW5nIHRoZVxyXG4gKiBjb25zdHJ1Y3RvclxyXG4gKlxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuVmlldy5wcm90b3R5cGUuaW5pdGlhbGl6ZVZpZXcgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHJldHVybjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBWaWV3IFNpbmdsZXRvbiBGYWN0b3J5IG1ldGhvZC5cclxuICogTm90ZSB0aGF0IHRoaXMgbWV0aG9kIHdpbGwgcmV0dXJuIG51bGwgaWYgc3VwcGxpZWQgYSBudWxsXHJcbiAqIG9yIHVuZGVmaW5lZCBtdWx0aXRvbiBrZXkuXHJcbiAqXHJcbiAqIEByZXR1cm4ge3B1cmVtdmMuVmlld31cclxuICogIFRoZSBTaW5nbGV0b24gaW5zdGFuY2Ugb2YgVmlld1xyXG4gKi9cclxuVmlldy5nZXRJbnN0YW5jZSA9IGZ1bmN0aW9uKGtleSlcclxue1xyXG4gICAgaWYgKG51bGwgPT0ga2V5KVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG5cclxuICAgIGlmKFZpZXcuaW5zdGFuY2VNYXBba2V5XSA9PSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIFZpZXcuaW5zdGFuY2VNYXBba2V5XSA9IG5ldyBWaWV3KGtleSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBWaWV3Lmluc3RhbmNlTWFwW2tleV07XHJcbn07XHJcblxyXG4vKipcclxuICogUmVnaXN0ZXIgYW4gT2JzZXJ2ZXIgdG8gYmUgbm90aWZpZWQgb2YgTm90aWZpY2F0aW9ucyB3aXRoIGEgZ2l2ZW4gbmFtZVxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbm90aWZpY2F0aW9uTmFtZVxyXG4gKiAgVGhlIG5hbWUgb2YgdGhlIE5vdGlmaWNhdGlvbnMgdG8gbm90aWZ5IHRoaXMgT2JzZXJ2ZXIgb2ZcclxuICogQHBhcmFtIHtwdXJlbXZjLk9ic2VydmVyfSBvYnNlcnZlclxyXG4gKiAgVGhlIE9ic2VydmVyIHRvIHJlZ2lzdGVyLlxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuVmlldy5wcm90b3R5cGUucmVnaXN0ZXJPYnNlcnZlciA9IGZ1bmN0aW9uKG5vdGlmaWNhdGlvbk5hbWUsIG9ic2VydmVyKVxyXG57XHJcbiAgICBpZih0aGlzLm9ic2VydmVyTWFwW25vdGlmaWNhdGlvbk5hbWVdICE9IG51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5vYnNlcnZlck1hcFtub3RpZmljYXRpb25OYW1lXS5wdXNoKG9ic2VydmVyKTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICB0aGlzLm9ic2VydmVyTWFwW25vdGlmaWNhdGlvbk5hbWVdID0gW29ic2VydmVyXTtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBOb3RpZnkgdGhlIE9ic2VydmVyc2ZvciBhIHBhcnRpY3VsYXIgTm90aWZpY2F0aW9uLlxyXG4gKlxyXG4gKiBBbGwgcHJldmlvdXNseSBhdHRhY2hlZCBPYnNlcnZlcnMgZm9yIHRoaXMgTm90aWZpY2F0aW9uJ3NcclxuICogbGlzdCBhcmUgbm90aWZpZWQgYW5kIGFyZSBwYXNzZWQgYSByZWZlcmVuY2UgdG8gdGhlIElOb3RpZmljYXRpb24gaW5cclxuICogdGhlIG9yZGVyIGluIHdoaWNoIHRoZXkgd2VyZSByZWdpc3RlcmVkLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3B1cmVtdmMuTm90aWZpY2F0aW9ufSBub3RpZmljYXRpb25cclxuICogIFRoZSBOb3RpZmljYXRpb24gdG8gbm90aWZ5IE9ic2VydmVycyBvZlxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuVmlldy5wcm90b3R5cGUubm90aWZ5T2JzZXJ2ZXJzID0gZnVuY3Rpb24obm90aWZpY2F0aW9uKVxyXG57XHJcbiAgICAvLyBTSUNcclxuICAgIGlmKHRoaXMub2JzZXJ2ZXJNYXBbbm90aWZpY2F0aW9uLmdldE5hbWUoKV0gIT0gbnVsbClcclxuICAgIHtcclxuICAgICAgICB2YXIgb2JzZXJ2ZXJzX3JlZiA9IHRoaXMub2JzZXJ2ZXJNYXBbbm90aWZpY2F0aW9uLmdldE5hbWUoKV0sIG9ic2VydmVycyA9IFtdLCBvYnNlcnZlclxyXG5cclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgb2JzZXJ2ZXJzX3JlZi5sZW5ndGg7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG9ic2VydmVyID0gb2JzZXJ2ZXJzX3JlZltpXTtcclxuICAgICAgICAgICAgb2JzZXJ2ZXJzLnB1c2gob2JzZXJ2ZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IG9ic2VydmVycy5sZW5ndGg7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG9ic2VydmVyID0gb2JzZXJ2ZXJzW2ldO1xyXG4gICAgICAgICAgICBvYnNlcnZlci5ub3RpZnlPYnNlcnZlcihub3RpZmljYXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmUgdGhlIE9ic2VydmVyIGZvciBhIGdpdmVuIG5vdGlmeUNvbnRleHQgZnJvbSBhbiBvYnNlcnZlciBsaXN0IGZvclxyXG4gKiBhIGdpdmVuIE5vdGlmaWNhdGlvbiBuYW1lXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBub3RpZmljYXRpb25OYW1lXHJcbiAqICBXaGljaCBvYnNlcnZlciBsaXN0IHRvIHJlbW92ZSBmcm9tXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBub3RpZnlDb250ZXh0XHJcbiAqICBSZW1vdmUgdGhlIE9ic2VydmVyIHdpdGggdGhpcyBvYmplY3QgYXMgaXRzIG5vdGlmeUNvbnRleHRcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcblZpZXcucHJvdG90eXBlLnJlbW92ZU9ic2VydmVyID0gZnVuY3Rpb24obm90aWZpY2F0aW9uTmFtZSwgbm90aWZ5Q29udGV4dClcclxue1xyXG4gICAgLy8gU0lDXHJcbiAgICB2YXIgb2JzZXJ2ZXJzID0gdGhpcy5vYnNlcnZlck1hcFtub3RpZmljYXRpb25OYW1lXTtcclxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBvYnNlcnZlcnMubGVuZ3RoOyBpKyspXHJcbiAgICB7XHJcbiAgICAgICAgaWYob2JzZXJ2ZXJzW2ldLmNvbXBhcmVOb3RpZnlDb250ZXh0KG5vdGlmeUNvbnRleHQpID09IHRydWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBvYnNlcnZlcnMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYob2JzZXJ2ZXJzLmxlbmd0aCA9PSAwKVxyXG4gICAge1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLm9ic2VydmVyTWFwW25vdGlmaWNhdGlvbk5hbWVdO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlZ2lzdGVyIGEgTWVkaWF0b3IgaW5zdGFuY2Ugd2l0aCB0aGUgVmlldy5cclxuICpcclxuICogUmVnaXN0ZXJzIHRoZSBNZWRpYXRvciBzbyB0aGF0IGl0IGNhbiBiZSByZXRyaWV2ZWQgYnkgbmFtZSxcclxuICogYW5kIGZ1cnRoZXIgaW50ZXJyb2dhdGVzIHRoZSBNZWRpYXRvciBmb3IgaXRzXHJcbiAqIHtAbGluayBwdXJlbXZjLk1lZGlhdG9yI2xpc3ROb3RpZmljYXRpb25JbnRlcmVzdHMgaW50ZXJlc3RzfS5cclxuICpcclxuICogSWYgdGhlIE1lZGlhdG9yIHJldHVybnMgYW55IE5vdGlmaWNhdGlvblxyXG4gKiBuYW1lcyB0byBiZSBub3RpZmllZCBhYm91dCwgYW4gT2JzZXJ2ZXIgaXMgY3JlYXRlZCBlbmNhcHN1bGF0aW5nXHJcbiAqIHRoZSBNZWRpYXRvciBpbnN0YW5jZSdzXHJcbiAqIHtAbGluayBwdXJlbXZjLk1lZGlhdG9yI2hhbmRsZU5vdGlmaWNhdGlvbiBoYW5kbGVOb3RpZmljYXRpb259XHJcbiAqIG1ldGhvZCBhbmQgcmVnaXN0ZXJpbmcgaXQgYXMgYW4gT2JzZXJ2ZXIgZm9yIGFsbCBOb3RpZmljYXRpb25zIHRoZVxyXG4gKiBNZWRpYXRvciBpcyBpbnRlcmVzdGVkIGluLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3B1cmVtdmMuTWVkaWF0b3J9XHJcbiAqICBhIHJlZmVyZW5jZSB0byB0aGUgTWVkaWF0b3IgaW5zdGFuY2VcclxuICovXHJcblZpZXcucHJvdG90eXBlLnJlZ2lzdGVyTWVkaWF0b3IgPSBmdW5jdGlvbihtZWRpYXRvcilcclxue1xyXG4gICAgaWYodGhpcy5tZWRpYXRvck1hcFttZWRpYXRvci5nZXRNZWRpYXRvck5hbWUoKV0gIT0gbnVsbClcclxuICAgIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbWVkaWF0b3IuaW5pdGlhbGl6ZU5vdGlmaWVyKHRoaXMubXVsdGl0b25LZXkpO1xyXG4gICAgLy8gcmVnaXN0ZXIgdGhlIG1lZGlhdG9yIGZvciByZXRyaWV2YWwgYnkgbmFtZVxyXG4gICAgdGhpcy5tZWRpYXRvck1hcFttZWRpYXRvci5nZXRNZWRpYXRvck5hbWUoKV0gPSBtZWRpYXRvcjtcclxuXHJcbiAgICAvLyBnZXQgbm90aWZpY2F0aW9uIGludGVyZXN0cyBpZiBhbnlcclxuICAgIHZhciBpbnRlcmVzdHMgPSBtZWRpYXRvci5saXN0Tm90aWZpY2F0aW9uSW50ZXJlc3RzKCk7XHJcblxyXG4gICAgLy8gcmVnaXN0ZXIgbWVkaWF0b3IgYXMgYW4gb2JzZXJ2ZXIgZm9yIGVhY2ggbm90aWZpY2F0aW9uXHJcbiAgICBpZihpbnRlcmVzdHMubGVuZ3RoID4gMClcclxuICAgIHtcclxuICAgICAgICAvLyBjcmVhdGUgb2JzZXJ2ZXIgcmVmZXJlbmNpbmcgdGhpcyBtZWRpYXRvcnMgaGFuZGxlTm90aWZpY2F0aW9uIG1ldGhvZFxyXG4gICAgICAgIHZhciBvYnNlcnZlciA9IG5ldyBPYnNlcnZlcihtZWRpYXRvci5oYW5kbGVOb3RpZmljYXRpb24sIG1lZGlhdG9yKTtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgaW50ZXJlc3RzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3Rlck9ic2VydmVyKGludGVyZXN0c1tpXSwgb2JzZXJ2ZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtZWRpYXRvci5vblJlZ2lzdGVyKCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXRyaWV2ZSBhIE1lZGlhdG9yIGZyb20gdGhlIFZpZXdcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG1lZGlhdG9yTmFtZVxyXG4gKiAgVGhlIG5hbWUgb2YgdGhlIE1lZGlhdG9yIGluc3RhbmNlIHRvIHJldHJpZXZlXHJcbiAqIEByZXR1cm4ge3B1cmVtdmMuTWVkaWF0b3J9XHJcbiAqICBUaGUgTWVkaWF0b3IgaW5zdGFuY2UgcHJldmlvdXNseSByZWdpc3RlcmVkIHdpdGggdGhlIGdpdmVuIG1lZGlhdG9yTmFtZVxyXG4gKi9cclxuVmlldy5wcm90b3R5cGUucmV0cmlldmVNZWRpYXRvciA9IGZ1bmN0aW9uKG1lZGlhdG9yTmFtZSlcclxue1xyXG4gICAgcmV0dXJuIHRoaXMubWVkaWF0b3JNYXBbbWVkaWF0b3JOYW1lXTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmUgYSBNZWRpYXRvciBmcm9tIHRoZSBWaWV3LlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVkaWF0b3JOYW1lXHJcbiAqICBOYW1lIG9mIHRoZSBNZWRpYXRvciBpbnN0YW5jZSB0byBiZSByZW1vdmVkXHJcbiAqIEByZXR1cm4ge3B1cmVtdmMuTWVkaWF0b3J9XHJcbiAqICBUaGUgTWVkaWF0b3IgdGhhdCB3YXMgcmVtb3ZlZCBmcm9tIHRoZSBWaWV3XHJcbiAqL1xyXG5WaWV3LnByb3RvdHlwZS5yZW1vdmVNZWRpYXRvciA9IGZ1bmN0aW9uKG1lZGlhdG9yTmFtZSlcclxue1xyXG4gICAgdmFyIG1lZGlhdG9yID0gdGhpcy5tZWRpYXRvck1hcFttZWRpYXRvck5hbWVdO1xyXG4gICAgaWYobWVkaWF0b3IpXHJcbiAgICB7XHJcbiAgICAgICAgLy8gZm9yIGV2ZXJ5IG5vdGlmaWNhdGlvbiB0aGUgbWVkaWF0b3IgaXMgaW50ZXJlc3RlZCBpbi4uLlxyXG4gICAgICAgIHZhciBpbnRlcmVzdHMgPSBtZWRpYXRvci5saXN0Tm90aWZpY2F0aW9uSW50ZXJlc3RzKCk7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGludGVyZXN0cy5sZW5ndGg7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIHJlbW92ZSB0aGUgb2JzZXJ2ZXIgbGlua2luZyB0aGUgbWVkaWF0b3IgdG8gdGhlIG5vdGlmaWNhdGlvblxyXG4gICAgICAgICAgICAvLyBpbnRlcmVzdFxyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZU9ic2VydmVyKGludGVyZXN0c1tpXSwgbWVkaWF0b3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gcmVtb3ZlIHRoZSBtZWRpYXRvciBmcm9tIHRoZSBtYXBcclxuICAgICAgICBkZWxldGUgdGhpcy5tZWRpYXRvck1hcFttZWRpYXRvck5hbWVdO1xyXG5cclxuICAgICAgICAvLyBhbGVydCB0aGUgbWVkaWF0b3IgdGhhdCBpdCBoYXMgYmVlbiByZW1vdmVkXHJcbiAgICAgICAgbWVkaWF0b3Iub25SZW1vdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbWVkaWF0b3I7XHJcbn07XHJcblxyXG4vKipcclxuICogQ2hlY2sgaWYgYSBNZWRpYXRvciBpcyByZWdpc3RlcmVkIG9yIG5vdC5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG1lZGlhdG9yTmFtZVxyXG4gKiBAcmV0dXJuIHtib29sZWFufVxyXG4gKiAgV2hldGhlciBhIE1lZGlhdG9yIGlzIHJlZ2lzdGVyZWQgd2l0aCB0aGUgZ2l2ZW4gbWVkaWF0b3JuYW1lXHJcbiAqL1xyXG5WaWV3LnByb3RvdHlwZS5oYXNNZWRpYXRvciA9IGZ1bmN0aW9uKG1lZGlhdG9yTmFtZSlcclxue1xyXG4gICAgcmV0dXJuIHRoaXMubWVkaWF0b3JNYXBbbWVkaWF0b3JOYW1lXSAhPSBudWxsO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSBhIFZpZXcgaW5zdGFuY2VcclxuICpcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcblZpZXcucmVtb3ZlVmlldyA9IGZ1bmN0aW9uKGtleSlcclxue1xyXG4gICAgZGVsZXRlIFZpZXcuaW5zdGFuY2VNYXBba2V5XTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqIFRoZSBWaWV3cyBpbnRlcm5hbCBtYXBwaW5nIG9mIG1lZGlhdG9yIG5hbWVzIHRvIG1lZGlhdG9yIGluc3RhbmNlc1xyXG4gKlxyXG4gKiBAdHlwZSBBcnJheVxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqL1xyXG5WaWV3LnByb3RvdHlwZS5tZWRpYXRvck1hcCA9IG51bGw7XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKiBUaGUgVmlld3MgaW50ZXJuYWwgbWFwcGluZyBvZiBOb3RpZmljYXRpb24gbmFtZXMgdG8gT2JzZXJ2ZXIgbGlzdHNcclxuICpcclxuICogQHR5cGUgQXJyYXlcclxuICogQHByb3RlY3RlZFxyXG4gKi9cclxuVmlldy5wcm90b3R5cGUub2JzZXJ2ZXJNYXAgPSBudWxsO1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICogVGhlIGludGVybmFsIG1hcCB1c2VkIHRvIHN0b3JlIG11bHRpdG9uIFZpZXcgaW5zdGFuY2VzXHJcbiAqXHJcbiAqIEB0eXBlIEFycmF5XHJcbiAqIEBwcm90ZWN0ZWRcclxuICovXHJcblZpZXcuaW5zdGFuY2VNYXAgPSBbXTtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqIFRoZSBWaWV3cyBpbnRlcm5hbCBtdWx0aXRvbiBrZXkuXHJcbiAqXHJcbiAqIEB0eXBlIHN0cmluZ1xyXG4gKiBAcHJvdGVjdGVkXHJcbiAqL1xyXG5WaWV3LnByb3RvdHlwZS5tdWx0aXRvbktleSA9IG51bGw7XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKiBUaGUgZXJyb3IgbWVzc2FnZSB1c2VkIGlmIGFuIGF0dGVtcHQgaXMgbWFkZSB0byBpbnN0YW50aWF0ZSBWaWV3IGRpcmVjdGx5XHJcbiAqXHJcbiAqIEB0eXBlIHN0cmluZ1xyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEBjb25zdFxyXG4gKiBAc3RhdGljXHJcbiAqL1xyXG5WaWV3Lk1VTFRJVE9OX01TRyA9IFwiVmlldyBpbnN0YW5jZSBmb3IgdGhpcyBNdWx0aXRvbiBrZXkgYWxyZWFkeSBjb25zdHJ1Y3RlZCFcIjtcclxuLyoqXHJcbiAqIEBhdXRob3IgUHVyZU1WQyBKUyBOYXRpdmUgUG9ydCBieSBEYXZpZCBGb2xleSwgRnLDqWTDqXJpYyBTYXVuaWVyLCAmIEFsYWluIER1Y2hlc25lYXVcclxuICogQGF1dGhvciBDb3B5cmlnaHQoYykgMjAwNi0yMDEyIEZ1dHVyZXNjYWxlLCBJbmMuLCBTb21lIHJpZ2h0cyByZXNlcnZlZC5cclxuICpcclxuICogQGNsYXNzIHB1cmVtdmMuTW9kZWxcclxuICpcclxuICogQSBNdWx0aXRvbiBNb2RlbCBpbXBsZW1lbnRhdGlvbi5cclxuICpcclxuICogSW4gUHVyZU1WQywgdGhlIE1vZGVsIGNsYXNzIHByb3ZpZGVzXHJcbiAqIGFjY2VzcyB0byBtb2RlbCBvYmplY3RzIChQcm94aWVzKSBieSBuYW1lZCBsb29rdXAuXHJcbiAqXHJcbiAqIFRoZSBNb2RlbCBhc3N1bWVzIHRoZXNlIHJlc3BvbnNpYmlsaXRpZXM6XHJcbiAqXHJcbiAqIC0gTWFpbnRhaW4gYSBjYWNoZSBvZiB7QGxpbmsgcHVyZW12Yy5Qcm94eSBQcm94eX1cclxuICogICBpbnN0YW5jZXMuXHJcbiAqIC0gUHJvdmlkZSBtZXRob2RzIGZvciByZWdpc3RlcmluZywgcmV0cmlldmluZywgYW5kIHJlbW92aW5nXHJcbiAqICAge0BsaW5rIHB1cmVtdmMuUHJveHkgUHJveHl9IGluc3RhbmNlcy5cclxuICpcclxuICogWW91ciBhcHBsaWNhdGlvbiBtdXN0IHJlZ2lzdGVyXHJcbiAqIHtAbGluayBwdXJlbXZjLlByb3h5IFByb3h5fSBpbnN0YW5jZXMgd2l0aCB0aGUgTW9kZWwuXHJcbiAqIFR5cGljYWxseSwgeW91IHVzZSBhXHJcbiAqIHtAbGluayBwdXJlbXZjLlNpbXBsZUNvbW1hbmQgU2ltcGxlQ29tbWFuZH1cclxuICogb3JcclxuICoge0BsaW5rIHB1cmVtdmMuTWFjcm9Db21tYW5kIE1hY3JvQ29tbWFuZH1cclxuICogdG8gY3JlYXRlIGFuZCByZWdpc3RlciBQcm94eSBpbnN0YW5jZXMgb25jZSB0aGUgRmFjYWRlIGhhcyBpbml0aWFsaXplZCB0aGVcclxuICogKkNvcmUqIGFjdG9ycy5cclxuICpcclxuICogVGhpcyBNb2RlbCBpbXBsZW1lbnRhdGlvbiBpcyBhIE11bHRpdG9uLCBzbyB5b3Ugc2hvdWxkIG5vdCBjYWxsIHRoZVxyXG4gKiBjb25zdHJ1Y3RvciBkaXJlY3RseSwgYnV0IGluc3RlYWQgY2FsbCB0aGVcclxuICoge0BsaW5rICNnZXRJbnN0YW5jZSBzdGF0aWMgTXVsdGl0b24gRmFjdG9yeSBtZXRob2R9XHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5XHJcbiAqICBUaGUgTW9kZWxzIG11bHRpdG9uIGtleVxyXG4gKiBAdGhyb3dzIHtFcnJvcn1cclxuICogIEFuIGVycm9yIGlzIHRocm93biBpZiB0aGlzIG11bHRpdG9ucyBrZXkgaXMgYWxyZWFkeSBpbiB1c2UgYnkgYW5vdGhlciBpbnN0YW5jZVxyXG4gKi9cclxuZnVuY3Rpb24gTW9kZWwoa2V5KVxyXG57XHJcbiAgICBpZihNb2RlbC5pbnN0YW5jZU1hcFtrZXldKVxyXG4gICAge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihNb2RlbC5NVUxUSVRPTl9NU0cpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubXVsdGl0b25LZXk9IGtleTtcclxuICAgIE1vZGVsLmluc3RhbmNlTWFwW2tleV09IHRoaXM7XHJcbiAgICB0aGlzLnByb3h5TWFwPSBbXTtcclxuICAgIHRoaXMuaW5pdGlhbGl6ZU1vZGVsKCk7XHJcbn07XHJcblxyXG4vKipcclxuICogSW5pdGlhbGl6ZSB0aGUgTW9kZWwgaW5zdGFuY2UuXHJcbiAqXHJcbiAqIENhbGxlZCBhdXRvbWF0aWNhbGx5IGJ5IHRoZSBjb25zdHJ1Y3RvciwgdGhpc1xyXG4gKiBpcyB5b3VyIG9wcG9ydHVuaXR5IHRvIGluaXRpYWxpemUgdGhlIFNpbmdsZXRvblxyXG4gKiBpbnN0YW5jZSBpbiB5b3VyIHN1YmNsYXNzIHdpdGhvdXQgb3ZlcnJpZGluZyB0aGVcclxuICogY29uc3RydWN0b3IuXHJcbiAqXHJcbiAqIEByZXR1cm4gdm9pZFxyXG4gKi9cclxuTW9kZWwucHJvdG90eXBlLmluaXRpYWxpemVNb2RlbD0gZnVuY3Rpb24oKXt9O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBNb2RlbCBNdWx0aXRvbiBGYWN0b3J5IG1ldGhvZC5cclxuICogTm90ZSB0aGF0IHRoaXMgbWV0aG9kIHdpbGwgcmV0dXJuIG51bGwgaWYgc3VwcGxpZWQgYSBudWxsXHJcbiAqIG9yIHVuZGVmaW5lZCBtdWx0aXRvbiBrZXkuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcclxuICogIFRoZSBtdWx0aXRvbiBrZXkgZm9yIHRoZSBNb2RlbCB0byByZXRyaWV2ZVxyXG4gKiBAcmV0dXJuIHtwdXJlbXZjLk1vZGVsfVxyXG4gKiAgdGhlIGluc3RhbmNlIGZvciB0aGlzIE11bHRpdG9uIGtleVxyXG4gKi9cclxuTW9kZWwuZ2V0SW5zdGFuY2U9IGZ1bmN0aW9uKGtleSlcclxue1xyXG4gICAgaWYgKG51bGwgPT0ga2V5KVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG5cclxuICAgIGlmKE1vZGVsLmluc3RhbmNlTWFwW2tleV0gPT0gbnVsbClcclxuICAgIHtcclxuICAgICAgICBNb2RlbC5pbnN0YW5jZU1hcFtrZXldPSBuZXcgTW9kZWwoa2V5KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gTW9kZWwuaW5zdGFuY2VNYXBba2V5XTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZWdpc3RlciBhIFByb3h5IHdpdGggdGhlIE1vZGVsXHJcbiAqIEBwYXJhbSB7cHVyZW12Yy5Qcm94eX1cclxuICovXHJcbk1vZGVsLnByb3RvdHlwZS5yZWdpc3RlclByb3h5PSBmdW5jdGlvbihwcm94eSlcclxue1xyXG4gICAgcHJveHkuaW5pdGlhbGl6ZU5vdGlmaWVyKHRoaXMubXVsdGl0b25LZXkpO1xyXG4gICAgdGhpcy5wcm94eU1hcFtwcm94eS5nZXRQcm94eU5hbWUoKV09IHByb3h5O1xyXG4gICAgcHJveHkub25SZWdpc3RlcigpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHJpZXZlIGEgUHJveHkgZnJvbSB0aGUgTW9kZWxcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHByb3h5TmFtZVxyXG4gKiBAcmV0dXJuIHtwdXJlbXZjLlByb3h5fVxyXG4gKiAgVGhlIFByb3h5IGluc3RhbmNlIHByZXZpb3VzbHkgcmVnaXN0ZXJlZCB3aXRoIHRoZSBwcm92aWRlZCBwcm94eU5hbWVcclxuICovXHJcbk1vZGVsLnByb3RvdHlwZS5yZXRyaWV2ZVByb3h5PSBmdW5jdGlvbihwcm94eU5hbWUpXHJcbntcclxuICAgIHJldHVybiB0aGlzLnByb3h5TWFwW3Byb3h5TmFtZV07XHJcbn07XHJcblxyXG4vKipcclxuICogQ2hlY2sgaWYgYSBQcm94eSBpcyByZWdpc3RlcmVkXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm94eU5hbWVcclxuICogQHJldHVybiB7Ym9vbGVhbn1cclxuICogIHdoZXRoZXIgYSBQcm94eSBpcyBjdXJyZW50bHkgcmVnaXN0ZXJlZCB3aXRoIHRoZSBnaXZlbiBwcm94eU5hbWUuXHJcbiAqL1xyXG5Nb2RlbC5wcm90b3R5cGUuaGFzUHJveHk9IGZ1bmN0aW9uKHByb3h5TmFtZSlcclxue1xyXG4gICAgcmV0dXJuIHRoaXMucHJveHlNYXBbcHJveHlOYW1lXSAhPSBudWxsO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSBhIFByb3h5IGZyb20gdGhlIE1vZGVsLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJveHlOYW1lXHJcbiAqICBUaGUgbmFtZSBvZiB0aGUgUHJveHkgaW5zdGFuY2UgdG8gcmVtb3ZlXHJcbiAqIEByZXR1cm4ge3B1cmVtdmMuUHJveHl9XHJcbiAqICBUaGUgUHJveHkgdGhhdCB3YXMgcmVtb3ZlZCBmcm9tIHRoZSBNb2RlbFxyXG4gKi9cclxuTW9kZWwucHJvdG90eXBlLnJlbW92ZVByb3h5PSBmdW5jdGlvbihwcm94eU5hbWUpXHJcbntcclxuICAgIHZhciBwcm94eT0gdGhpcy5wcm94eU1hcFtwcm94eU5hbWVdO1xyXG4gICAgaWYocHJveHkpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5wcm94eU1hcFtwcm94eU5hbWVdPSBudWxsO1xyXG4gICAgICAgIHByb3h5Lm9uUmVtb3ZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHByb3h5O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBzdGF0aWNcclxuICogUmVtb3ZlIGEgTW9kZWwgaW5zdGFuY2UuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbk1vZGVsLnJlbW92ZU1vZGVsPSBmdW5jdGlvbihrZXkpXHJcbntcclxuICAgIGRlbGV0ZSBNb2RlbC5pbnN0YW5jZU1hcFtrZXldO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICogVGhlIG1hcCB1c2VkIGJ5IHRoZSBNb2RlbCB0byBzdG9yZSBQcm94eSBpbnN0YW5jZXMuXHJcbiAqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQHR5cGUgQXJyYXlcclxuICovXHJcbk1vZGVsLnByb3RvdHlwZS5wcm94eU1hcD0gbnVsbDtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqIFRoZSBtYXAgdXNlZCBieSB0aGUgTW9kZWwgdG8gc3RvcmUgbXVsdGl0b24gaW5zdGFuY2VzXHJcbiAqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQHN0YXRpY1xyXG4gKiBAdHlwZSBBcnJheVxyXG4gKi9cclxuTW9kZWwuaW5zdGFuY2VNYXA9IFtdO1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICogVGhlIE1vZGVscyBtdWx0aXRvbiBrZXkuXHJcbiAqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQHR5cGUgc3RyaW5nXHJcbiAqL1xyXG5Nb2RlbC5wcm90b3R5cGUubXVsdGl0b25LZXk7XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKiBNZXNzYWdlIENvbnN0YW50c1xyXG4gKlxyXG4gKiBAc3RhdGljXHJcbiAqIEB0eXBlIHtzdHJpbmd9XHJcbiAqL1xyXG5Nb2RlbC5NVUxUSVRPTl9NU0c9IFwiTW9kZWwgaW5zdGFuY2UgZm9yIHRoaXMgTXVsdGl0b24ga2V5IGFscmVhZHkgY29uc3RydWN0ZWQhXCI7XHJcbi8qKlxyXG4gKiBAYXV0aG9yIFB1cmVNVkMgSlMgTmF0aXZlIFBvcnQgYnkgRGF2aWQgRm9sZXksIEZyw6lkw6lyaWMgU2F1bmllciwgJiBBbGFpbiBEdWNoZXNuZWF1XHJcbiAqIEBhdXRob3IgQ29weXJpZ2h0KGMpIDIwMDYtMjAxMiBGdXR1cmVzY2FsZSwgSW5jLiwgU29tZSByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIEBjbGFzcyBwdXJlbXZjLkNvbnRyb2xsZXJcclxuICpcclxuICogSW4gUHVyZU1WQywgdGhlIENvbnRyb2xsZXIgY2xhc3MgZm9sbG93cyB0aGUgJ0NvbW1hbmQgYW5kIENvbnRyb2xsZXInXHJcbiAqIHN0cmF0ZWd5LCBhbmQgYXNzdW1lcyB0aGVzZSByZXNwb25zaWJpbGl0aWVzOlxyXG4gKlxyXG4gKiAtIFJlbWVtYmVyaW5nIHdoaWNoXHJcbiAqIHtAbGluayBwdXJlbXZjLlNpbXBsZUNvbW1hbmQgU2ltcGxlQ29tbWFuZH1zXHJcbiAqIG9yXHJcbiAqIHtAbGluayBwdXJlbXZjLk1hY3JvQ29tbWFuZCBNYWNyb0NvbW1hbmR9c1xyXG4gKiBhcmUgaW50ZW5kZWQgdG8gaGFuZGxlIHdoaWNoXHJcbiAqIHtAbGluayBwdXJlbXZjLk5vdGlmaWNhdGlvbiBOb3RpZmljYXRpb259c1xyXG4gKiAtIFJlZ2lzdGVyaW5nIGl0c2VsZiBhcyBhblxyXG4gKiB7QGxpbmsgcHVyZW12Yy5PYnNlcnZlciBPYnNlcnZlcn0gd2l0aFxyXG4gKiB0aGUge0BsaW5rIHB1cmVtdmMuVmlldyBWaWV3fSBmb3IgZWFjaFxyXG4gKiB7QGxpbmsgcHVyZW12Yy5Ob3RpZmljYXRpb24gTm90aWZpY2F0aW9ufVxyXG4gKiB0aGF0IGl0IGhhcyBhblxyXG4gKiB7QGxpbmsgcHVyZW12Yy5TaW1wbGVDb21tYW5kIFNpbXBsZUNvbW1hbmR9XHJcbiAqIG9yIHtAbGluayBwdXJlbXZjLk1hY3JvQ29tbWFuZCBNYWNyb0NvbW1hbmR9XHJcbiAqIG1hcHBpbmcgZm9yLlxyXG4gKiAtIENyZWF0aW5nIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBwcm9wZXJcclxuICoge0BsaW5rIHB1cmVtdmMuU2ltcGxlQ29tbWFuZCBTaW1wbGVDb21tYW5kfXNcclxuICogb3JcclxuICoge0BsaW5rIHB1cmVtdmMuTWFjcm9Db21tYW5kIE1hY3JvQ29tbWFuZH1zXHJcbiAqIHRvIGhhbmRsZSBhIGdpdmVuXHJcbiAqIHtAbGluayBwdXJlbXZjLk5vdGlmaWNhdGlvbiBOb3RpZmljYXRpb259XHJcbiAqIHdoZW4gbm90aWZpZWQgYnkgdGhlXHJcbiAqIHtAbGluayBwdXJlbXZjLlZpZXcgVmlld30uXHJcbiAqIC0gQ2FsbGluZyB0aGUgY29tbWFuZCdzIGV4ZWN1dGUgbWV0aG9kLCBwYXNzaW5nIGluIHRoZVxyXG4gKiB7QGxpbmsgcHVyZW12Yy5Ob3RpZmljYXRpb24gTm90aWZpY2F0aW9ufS5cclxuICpcclxuICogWW91ciBhcHBsaWNhdGlvbiBtdXN0IHJlZ2lzdGVyXHJcbiAqIHtAbGluayBwdXJlbXZjLlNpbXBsZUNvbW1hbmQgU2ltcGxlQ29tbWFuZH1zXHJcbiAqIG9yIHtAbGluayBwdXJlbXZjLk1hY3JvQ29tbWFuZCBNYWNyb0NvbW1hbmR9c1xyXG4gKiB3aXRoIHRoZSBDb250cm9sbGVyLlxyXG4gKlxyXG4gKiBUaGUgc2ltcGxlc3Qgd2F5IGlzIHRvIHN1YmNsYXNzXHJcbiAqIHtAbGluayBwdXJlbXZjLkZhY2FkZSBGYWNhZGV9LFxyXG4gKiBhbmQgdXNlIGl0c1xyXG4gKiB7QGxpbmsgcHVyZW12Yy5GYWNhZGUjaW5pdGlhbGl6ZUNvbnRyb2xsZXIgaW5pdGlhbGl6ZUNvbnRyb2xsZXJ9XHJcbiAqIG1ldGhvZCB0byBhZGQgeW91ciByZWdpc3RyYXRpb25zLlxyXG4gKlxyXG4gKiBAY29uc3RydWN0b3JcclxuICogVGhpcyBDb250cm9sbGVyIGltcGxlbWVudGF0aW9uIGlzIGEgTXVsdGl0b24sIHNvIHlvdSBzaG91bGQgbm90IGNhbGwgdGhlXHJcbiAqIGNvbnN0cnVjdG9yIGRpcmVjdGx5LCBidXQgaW5zdGVhZCBjYWxsIHRoZSBzdGF0aWMgI2dldEluc3RhbmNlIGZhY3RvcnkgbWV0aG9kLFxyXG4gKiBwYXNzaW5nIHRoZSB1bmlxdWUga2V5IGZvciB0aGlzIGluc3RhbmNlIHRvIGl0LlxyXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5XHJcbiAqIEB0aHJvd3Mge0Vycm9yfVxyXG4gKiAgSWYgaW5zdGFuY2UgZm9yIHRoaXMgTXVsdGl0b24ga2V5IGhhcyBhbHJlYWR5IGJlZW4gY29uc3RydWN0ZWRcclxuICovXHJcbmZ1bmN0aW9uIENvbnRyb2xsZXIoa2V5KVxyXG57XHJcbiAgICBpZihDb250cm9sbGVyLmluc3RhbmNlTWFwW2tleV0gIT0gbnVsbClcclxuICAgIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoQ29udHJvbGxlci5NVUxUSVRPTl9NU0cpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubXVsdGl0b25LZXk9IGtleTtcclxuICAgIENvbnRyb2xsZXIuaW5zdGFuY2VNYXBbdGhpcy5tdWx0aXRvbktleV09IHRoaXM7XHJcbiAgICB0aGlzLmNvbW1hbmRNYXA9IG5ldyBBcnJheSgpO1xyXG4gICAgdGhpcy5pbml0aWFsaXplQ29udHJvbGxlcigpO1xyXG59XHJcblxyXG4vKipcclxuICogQHByb3RlY3RlZFxyXG4gKlxyXG4gKiBJbml0aWFsaXplIHRoZSBtdWx0aXRvbiBDb250cm9sbGVyIGluc3RhbmNlLlxyXG4gKlxyXG4gKiBDYWxsZWQgYXV0b21hdGljYWxseSBieSB0aGUgY29uc3RydWN0b3IuXHJcbiAqXHJcbiAqIE5vdGUgdGhhdCBpZiB5b3UgYXJlIHVzaW5nIGEgc3ViY2xhc3Mgb2YgVmlld1xyXG4gKiBpbiB5b3VyIGFwcGxpY2F0aW9uLCB5b3Ugc2hvdWxkICphbHNvKiBzdWJjbGFzcyBDb250cm9sbGVyXHJcbiAqIGFuZCBvdmVycmlkZSB0aGUgaW5pdGlhbGl6ZUNvbnRyb2xsZXIgbWV0aG9kIGluIHRoZVxyXG4gKiBmb2xsb3dpbmcgd2F5LlxyXG4gKlxyXG4gKiAgICAgTXlDb250cm9sbGVyLnByb3RvdHlwZS5pbml0aWFsaXplQ29udHJvbGxlcj0gZnVuY3Rpb24gKClcclxuICogICAgIHtcclxuICogICAgICAgICB0aGlzLnZpZXc9IE15Vmlldy5nZXRJbnN0YW5jZSh0aGlzLm11bHRpdG9uS2V5KTtcclxuICogICAgIH07XHJcbiAqXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5Db250cm9sbGVyLnByb3RvdHlwZS5pbml0aWFsaXplQ29udHJvbGxlcj0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICB0aGlzLnZpZXc9IFZpZXcuZ2V0SW5zdGFuY2UodGhpcy5tdWx0aXRvbktleSk7XHJcbn07XHJcblxyXG4vKipcclxuICogVGhlIENvbnRyb2xsZXJzIG11bHRpdG9uIGZhY3RvcnkgbWV0aG9kLlxyXG4gKiBOb3RlIHRoYXQgdGhpcyBtZXRob2Qgd2lsbCByZXR1cm4gbnVsbCBpZiBzdXBwbGllZCBhIG51bGxcclxuICogb3IgdW5kZWZpbmVkIG11bHRpdG9uIGtleS5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IGtleVxyXG4gKiAgQSBDb250cm9sbGVyJ3MgbXVsdGl0b24ga2V5XHJcbiAqIEByZXR1cm4ge3B1cmVtdmMuQ29udHJvbGxlcn1cclxuICogIHRoZSBNdWx0aXRvbiBpbnN0YW5jZSBvZiBDb250cm9sbGVyXHJcbiAqL1xyXG5Db250cm9sbGVyLmdldEluc3RhbmNlPSBmdW5jdGlvbihrZXkpXHJcbntcclxuICAgIGlmIChudWxsID09IGtleSlcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuXHJcbiAgICBpZihudWxsID09IHRoaXMuaW5zdGFuY2VNYXBba2V5XSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLmluc3RhbmNlTWFwW2tleV09IG5ldyB0aGlzKGtleSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VNYXBba2V5XTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBJZiBhIFNpbXBsZUNvbW1hbmQgb3IgTWFjcm9Db21tYW5kIGhhcyBwcmV2aW91c2x5IGJlZW4gcmVnaXN0ZXJlZCB0byBoYW5kbGVcclxuICogdGhlIGdpdmVuIE5vdGlmaWNhdGlvbiB0aGVuIGl0IGlzIGV4ZWN1dGVkLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3B1cmVtdmMuTm90aWZpY2F0aW9ufSBub3RlXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5Db250cm9sbGVyLnByb3RvdHlwZS5leGVjdXRlQ29tbWFuZD0gZnVuY3Rpb24obm90ZSlcclxue1xyXG4gICAgdmFyIGNvbW1hbmRDbGFzc1JlZj0gdGhpcy5jb21tYW5kTWFwW25vdGUuZ2V0TmFtZSgpXTtcclxuICAgIGlmKGNvbW1hbmRDbGFzc1JlZiA9PSBudWxsKVxyXG4gICAgICAgIHJldHVybjtcclxuXHJcbiAgICB2YXIgY29tbWFuZEluc3RhbmNlPSBuZXcgY29tbWFuZENsYXNzUmVmKCk7XHJcbiAgICBjb21tYW5kSW5zdGFuY2UuaW5pdGlhbGl6ZU5vdGlmaWVyKHRoaXMubXVsdGl0b25LZXkpO1xyXG4gICAgY29tbWFuZEluc3RhbmNlLmV4ZWN1dGUobm90ZSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVnaXN0ZXIgYSBwYXJ0aWN1bGFyIFNpbXBsZUNvbW1hbmQgb3IgTWFjcm9Db21tYW5kIGNsYXNzIGFzIHRoZSBoYW5kbGVyIGZvclxyXG4gKiBhIHBhcnRpY3VsYXIgTm90aWZpY2F0aW9uLlxyXG4gKlxyXG4gKiBJZiBhbiBjb21tYW5kIGFscmVhZHkgYmVlbiByZWdpc3RlcmVkIHRvIGhhbmRsZSBOb3RpZmljYXRpb25zIHdpdGggdGhpcyBuYW1lLFxyXG4gKiBpdCBpcyBubyBsb25nZXIgdXNlZCwgdGhlIG5ldyBjb21tYW5kIGlzIHVzZWQgaW5zdGVhZC5cclxuICpcclxuICogVGhlIE9ic2VydmVyIGZvciB0aGUgbmV3IGNvbW1hbmQgaXMgb25seSBjcmVhdGVkIGlmIHRoaXMgdGhlIGlyc3QgdGltZSBhXHJcbiAqIGNvbW1hbmQgaGFzIGJlZW4gcmVnaXNlcmVkIGZvciB0aGlzIE5vdGlmaWNhdGlvbiBuYW1lLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbm90aWZpY2F0aW9uTmFtZVxyXG4gKiAgdGhlIG5hbWUgb2YgdGhlIE5vdGlmaWNhdGlvblxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb21tYW5kQ2xhc3NSZWZcclxuICogIGEgY29tbWFuZCBjb25zdHJ1Y3RvclxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuQ29udHJvbGxlci5wcm90b3R5cGUucmVnaXN0ZXJDb21tYW5kPSBmdW5jdGlvbihub3RpZmljYXRpb25OYW1lLCBjb21tYW5kQ2xhc3NSZWYpXHJcbntcclxuICAgIGlmKHRoaXMuY29tbWFuZE1hcFtub3RpZmljYXRpb25OYW1lXSA9PSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudmlldy5yZWdpc3Rlck9ic2VydmVyKG5vdGlmaWNhdGlvbk5hbWUsIG5ldyBPYnNlcnZlcih0aGlzLmV4ZWN1dGVDb21tYW5kLCB0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jb21tYW5kTWFwW25vdGlmaWNhdGlvbk5hbWVdPSBjb21tYW5kQ2xhc3NSZWY7XHJcbn07XHJcblxyXG4vKipcclxuICogQ2hlY2sgaWYgYSBjb21tYW5kIGlzIHJlZ2lzdGVyZWQgZm9yIGEgZ2l2ZW4gTm90aWZpY2F0aW9uXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBub3RpZmljYXRpb25OYW1lXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAqICB3aGV0aGVyIGEgQ29tbWFuZCBpcyBjdXJyZW50bHkgcmVnaXN0ZXJlZCBmb3IgdGhlIGdpdmVuIG5vdGlmaWNhdGlvbk5hbWUuXHJcbiAqL1xyXG5Db250cm9sbGVyLnByb3RvdHlwZS5oYXNDb21tYW5kPSBmdW5jdGlvbihub3RpZmljYXRpb25OYW1lKVxyXG57XHJcbiAgICByZXR1cm4gdGhpcy5jb21tYW5kTWFwW25vdGlmaWNhdGlvbk5hbWVdICE9IG51bGw7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlIGEgcHJldmlvdXNseSByZWdpc3RlcmVkIGNvbW1hbmQgdG9cclxuICoge0BsaW5rIHB1cmVtdmMuTm90aWZpY2F0aW9uIE5vdGlmaWNhdGlvbn1cclxuICogbWFwcGluZy5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG5vdGlmaWNhdGlvbk5hbWVcclxuICogIHRoZSBuYW1lIG9mIHRoZSBOb3RpZmljYXRpb24gdG8gcmVtb3ZlIHRoZSBjb21tYW5kIG1hcHBpbmcgZm9yXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5Db250cm9sbGVyLnByb3RvdHlwZS5yZW1vdmVDb21tYW5kPSBmdW5jdGlvbihub3RpZmljYXRpb25OYW1lKVxyXG57XHJcbiAgICBpZih0aGlzLmhhc0NvbW1hbmQobm90aWZpY2F0aW9uTmFtZSkpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy52aWV3LnJlbW92ZU9ic2VydmVyKG5vdGlmaWNhdGlvbk5hbWUsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuY29tbWFuZE1hcFtub3RpZmljYXRpb25OYW1lXT0gbnVsbDtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBAc3RhdGljXHJcbiAqIFJlbW92ZSBhIENvbnRyb2xsZXIgaW5zdGFuY2UuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcclxuICogIG11bHRpdG9uS2V5IG9mIENvbnRyb2xsZXIgaW5zdGFuY2UgdG8gcmVtb3ZlXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5Db250cm9sbGVyLnJlbW92ZUNvbnRyb2xsZXI9IGZ1bmN0aW9uKGtleSlcclxue1xyXG4gICAgZGVsZXRlIHRoaXMuaW5zdGFuY2VNYXBba2V5XTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBMb2NhbCByZWZlcmVuY2UgdG8gdGhlIENvbnRyb2xsZXIncyBWaWV3XHJcbiAqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQHR5cGUge3B1cmVtdmMuVmlld31cclxuICovXHJcbkNvbnRyb2xsZXIucHJvdG90eXBlLnZpZXc9IG51bGw7XHJcblxyXG4vKipcclxuICogTm90ZSBuYW1lIHRvIGNvbW1hbmQgY29uc3RydWN0b3IgbWFwcGluZ3NcclxuICpcclxuICogQHByb3RlY3RlZFxyXG4gKiBAdHlwZSB7T2JqZWN0fVxyXG4gKi9cclxuQ29udHJvbGxlci5wcm90b3R5cGUuY29tbWFuZE1hcD0gbnVsbDtcclxuXHJcbi8qKlxyXG4gKiBUaGUgQ29udHJvbGxlcidzIG11bHRpdG9uIGtleVxyXG4gKlxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEB0eXBlIHtzdHJpbmd9XHJcbiAqL1xyXG5Db250cm9sbGVyLnByb3RvdHlwZS5tdWx0aXRvbktleT0gbnVsbDtcclxuXHJcbi8qKlxyXG4gKiBNdWx0aXRvbiBrZXkgdG8gQ29udHJvbGxlciBpbnN0YW5jZSBtYXBwaW5nc1xyXG4gKlxyXG4gKiBAc3RhdGljXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQHR5cGUge09iamVjdH1cclxuICovXHJcbkNvbnRyb2xsZXIuaW5zdGFuY2VNYXA9IFtdO1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICpcclxuICogTWVzc2FnZSBjb25zdGFudHNcclxuICogQHN0YXRpY1xyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEB0eXBlIHtzdHJpbmd9XHJcbiAqL1xyXG5Db250cm9sbGVyLk1VTFRJVE9OX01TRz0gXCJjb250cm9sbGVyIGtleSBmb3IgdGhpcyBNdWx0aXRvbiBrZXkgYWxyZWFkeSBjb25zdHJ1Y3RlZFwiXHJcbi8qXHJcbiAqIEBhdXRob3IgUHVyZU1WQyBKUyBOYXRpdmUgUG9ydCBieSBEYXZpZCBGb2xleSwgRnLDqWTDqXJpYyBTYXVuaWVyLCAmIEFsYWluIER1Y2hlc25lYXUgXHJcbiAqIEBhdXRob3IgQ29weXJpZ2h0KGMpIDIwMDYtMjAxMiBGdXR1cmVzY2FsZSwgSW5jLiwgU29tZSByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqIFxyXG4gKiBAaGlkZVxyXG4gKiBBIGFuIGludGVybmFsIGhlbHBlciBjbGFzcyB1c2VkIHRvIGFzc2lzdCBjbGFzc2xldCBpbXBsZW1lbnRhdGlvbi4gVGhpc1xyXG4gKiBjbGFzcyBpcyBub3QgYWNjZXNzaWJsZSBieSBjbGllbnQgY29kZS5cclxuICovXHJcbnZhciBPb3BIZWxwPVxyXG57XHJcbiAgICAvKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgc2NvcGUuIFdlIHVzZSB0aGlzIHJhdGhlciB0aGFuIHdpbmRvd1xyXG4gICAgICogaW4gb3JkZXIgdG8gc3VwcG9ydCBib3RoIGJyb3dzZXIgYmFzZWQgYW5kIG5vbiBicm93c2VyIGJhZWQgXHJcbiAgICAgKiBKYXZhU2NyaXB0IGludGVycHJldGVycy5cclxuICAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAgKi9cclxuICAgIGdsb2JhbDogKGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXN9KSgpXHJcblxyXG4gICAgLypcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBFeHRlbmQgb25lIEZ1bmN0aW9uJ3MgcHJvdG90eXBlIGJ5IGFub3RoZXIsIGVtdWxhdGluZyBjbGFzc2ljXHJcbiAgICAgKiBpbmhlcml0YW5jZS5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2hpbGRcclxuICAgICAqICBUaGUgRnVuY3Rpb24gdG8gZXh0ZW5kIChzdWJjbGFzcylcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gcGFyZW50XHJcbiAgICAgKiAgVGhlIEZ1bmN0aW9uIHRvIGV4dGVuZCBmcm9tIChzdXBlcmNsYXNzKVxyXG4gICAgICogXHJcbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn1cclxuICAgICAqIFxyXG4gICAgICogIEEgcmVmZXJlbmNlIHRvIHRoZSBleHRlbmRlZCBGdW5jdGlvbiAoc3ViY2xhc3MpXHJcbiAgICAgKi9cclxuICAgICwgICBleHRlbmQ6IGZ1bmN0aW9uIChjaGlsZCwgcGFyZW50KVxyXG57XHJcbiAgICBpZiAoJ2Z1bmN0aW9uJyAhPT0gdHlwZW9mIGNoaWxkKVxyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJyNleHRlbmQtIGNoaWxkIHNob3VsZCBiZSBGdW5jdGlvbicpO1xyXG5cclxuICAgIGlmICgnZnVuY3Rpb24nICE9PSB0eXBlb2YgcGFyZW50KVxyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJyNleHRlbmQtIHBhcmVudCBzaG91bGQgYmUgRnVuY3Rpb24nKTtcclxuXHJcbiAgICBpZiAocGFyZW50ID09PSBjaGlsZClcclxuICAgICAgICByZXR1cm47XHJcblxyXG4gICAgdmFyIFRyYW5zaXRpdmU9IG5ldyBGdW5jdGlvbjtcclxuICAgIFRyYW5zaXRpdmUucHJvdG90eXBlPSBwYXJlbnQucHJvdG90eXBlO1xyXG4gICAgY2hpbGQucHJvdG90eXBlPSBuZXcgVHJhbnNpdGl2ZTtcclxuICAgIHJldHVybiBjaGlsZC5wcm90b3R5cGUuY29uc3RydWN0b3I9IGNoaWxkO1xyXG59XHJcblxyXG4gICAgLypcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBEZWNvYXJhdGUgb25lIG9iamVjdCB3aXRoIHRoZSBwcm9wZXJ0aWVzIG9mIGFub3RoZXIuIFxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0XHJcbiAgICAgKiAgVGhlIG9iamVjdCB0byBkZWNvcmF0ZS5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHRyYWl0c1xyXG4gICAgICogIFRoZSBvYmplY3QgcHJvdmlkaW5nIHRoZSBwcm9wZXJpdGVzIHRoYXQgdGhlIGZpcnN0IG9iamVjdFxyXG4gICAgICogIHdpbGwgYmUgZGVjb3JhdGVkIHdpdGguIE5vdGUgdGhhdCBvbmx5IHByb3BlcnRpZXMgZGVmaW5lZCBvbiBcclxuICAgICAqICB0aGlzIG9iamVjdCB3aWxsIGJlIGNvcGllZC0gaS5lLiBpbmhlcml0ZWQgcHJvcGVydGllcyB3aWxsXHJcbiAgICAgKiAgYmUgaWdub3JlZC5cclxuICAgICAqIFxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxyXG4gICAgICogIFRIZSBkZWNvcmF0ZWQgb2JqZWN0IChmaXJzdCBhcmd1bWVudClcclxuICAgICAqL1xyXG4gICAgLCAgIGRlY29yYXRlOiBmdW5jdGlvbiAob2JqZWN0LCB0cmFpdHMpXHJcbntcclxuICAgIGZvciAodmFyIGFjY2Vzc29yIGluIHRyYWl0cylcclxuICAgIHtcclxuICAgICAgICBvYmplY3RbYWNjZXNzb3JdPSB0cmFpdHNbYWNjZXNzb3JdO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBvYmplY3Q7XHJcbn1cclxufTtcclxuXHJcblxyXG4vKipcclxuICogQG1lbWJlciBwdXJlbXZjXHJcbiAqXHJcbiAqIERlY2xhcmUgYSBuYW1lc3BhY2UgYW5kIG9wdGlvbmFsbHkgbWFrZSBhbiBPYmplY3QgdGhlIHJlZmVyZW50XHJcbiAqIG9mIHRoYXQgbmFtZXNwYWNlLlxyXG4gKlxyXG4gKiAgICAgY29uc29sZS5hc3NlcnQobnVsbCA9PSB3aW5kb3cudGxkLCAnTm8gdGxkIG5hbWVzcGFjZScpO1xyXG4gKiAgICAgLy8gZGVjbGFyZSB0aGUgdGxkIG5hbWVzcGFjZVxyXG4gKiAgICAgcHVyZW12Yy5kZWNsYXJlKCd0bGQnKTtcclxuICogICAgIGNvbnNvbGUuYXNzZXJ0KCdvYmplY3QnID09PSB0eXBlb2YgdGxkLCAnVGhlIHRsZCBuYW1lc3BhY2Ugd2FzIGRlY2xhcmVkJyk7XHJcbiAqXHJcbiAqICAgICAvLyB0aGUgbWV0aG9kIHJldHVybnMgYSByZWZlcmVuY2UgdG8gbGFzdCBuYW1lc3BhY2Ugbm9kZSBpbiBhIGNyZWF0ZWQgaGllcmFyY2h5XHJcbiAqICAgICB2YXIgcmVmZXJlbmNlPSBwdXJlbXZjLmRlY2xhcmUoJ3RsZC5kb21haW4uYXBwJyk7XHJcbiAqICAgICBjb25zb2xlLmFzc2VydChyZWZlcmVuY2UgPT09IHRsZC5kb21haW4uYXBwKVxyXG4gKlxyXG4gKiAgICAgLy8gb2YgY291cnNlIHlvdSBjYW4gYWxzbyBkZWNsYXJlIHlvdXIgb3duIG9iamVjdHMgYXMgd2VsbFxyXG4gKiAgICAgdmFyIEFwcENvbnN0YW50cz1cclxuICogICAgICAgICB7XHJcbiAqIFx0ICAgICAgICAgICBBUFBfTkFNRTogJ3RsZC5kb21haW4uYXBwLkFwcCdcclxuICogICAgICAgICB9O1xyXG4gKlxyXG4gKiAgICAgcHVyZW12Yy5kZWNsYXJlKCd0bGQuZG9tYWluLmFwcC5BcHBDb25zdGFudHMnLCBBcHBDb25zdGFudHMpO1xyXG4gKiAgICAgY29uc29sZS5hc3NlcnQoQXBwQ29uc3RhbnRzID09PSB0bGQuZG9tYWluLmFwcC5BcHBDb25zdGFudHNcclxuICogXHQgICAsICdBcHBDb25zdGFudHMgd2FzIGV4cG9ydGVkIHRvIHRoZSBuYW1lc3BhY2UnKTtcclxuICpcclxuICogTm90ZSB0aGF0IHlvdSBjYW4gYWxzbyAjZGVjbGFyZSB3aXRoaW4gYSBjbG9zdXJlLiBUaGF0IHdheSB5b3VcclxuICogY2FuIHNlbGVjdGl2ZWx5IGV4cG9ydCBPYmplY3RzIHRvIHlvdXIgb3duIG5hbWVzcGFjZXMgd2l0aG91dFxyXG4gKiBsZWFraW5nIHZhcmlhYmxlcyBpbnRvIHRoZSBnbG9iYWwgc2NvcGUuXHJcbiAqXHJcbiAqICAgICAoZnVuY3Rpb24oKXtcclxuICogICAgICAgICAvLyB0aGlzIHZhciBpcyBub3QgYWNjZXNzaWJsZSBvdXRzaWRlIG9mIHRoaXNcclxuICogICAgICAgICAvLyBjbG9zdXJlcyBjYWxsIHNjb3BlXHJcbiAqICAgICAgICAgdmFyIGhpZGRlblZhbHVlPSAnZGVmYXVsdFZhbHVlJztcclxuICogXHJcbiAqICAgICAgICAgLy8gZXhwb3J0IGFuIG9iamVjdCB0aGF0IHJlZmVyZW5jZXMgdGhlIGhpZGRlblxyXG4gKiAgICAgICAgIC8vIHZhcmlhYmxlIGFuZCB3aGljaCBjYW4gbXV0YXRlIGl0XHJcbiAqICAgICAgICAgcHVyZW12Yy5kZWNsYXJlXHJcbiAqICAgICAgICAgKFxyXG4gKiAgICAgICAgICAgICAgJ3RsZC5kb21haW4uYXBwLmJhY2tkb29yJ1xyXG4gKiBcclxuICogICAgICAgICAsICAgIHtcclxuICogICAgICAgICAgICAgICAgICBzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKVxyXG4gKiAgICAgICAgICAgICAgICAgIHtcclxuICogICAgICAgICAgICAgICAgICAgICAgLy8gYXNzaWducyB0byB0aGUgaGlkZGVuIHZhclxyXG4gKiAgICAgICAgICAgICAgICAgICAgICBoaWRkZW5WYWx1ZT0gdmFsdWU7XHJcbiAqICAgICAgICAgICAgICAgICAgfVxyXG4gKiBcclxuICogICAgICAgICAsICAgICAgICBnZXRWYWx1ZTogZnVuY3Rpb24gKClcclxuICogICAgICAgICAgICAgICAgICB7XHJcbiAqICAgICAgICAgICAgICAgICAgICAgIC8vIHJlYWRzIGZyb20gdGhlIGhpZGRlbiB2YXJcclxuICogICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGhpZGRlblZhbHVlO1xyXG4gKiAgICAgICAgICAgICAgICAgIH1cclxuICogICAgICAgICAgICAgIH1cclxuICogICAgICAgICApO1xyXG4gKiAgICAgfSkoKTtcclxuICogICAgIC8vIGluZGlyZWN0bHkgcmV0cmlldmUgdGhlIGhpZGRlbiB2YXJpYWJsZXMgdmFsdWVcclxuICogICAgIGNvbnNvbGUuYXNzZXJ0KCdkZWZhdWx0VmFsdWUnID09PSB0bGQuZG9tYWluLmFwcC5iYWNrZG9vci5nZXRWYWx1ZSgpKTtcclxuICogICAgIC8vIGluZGlyZWN0bHkgc2V0IHRoZSBoaWRkZW4gdmFyaWFibGVzIHZhbHVlXHJcbiAqICAgICB0bGQuZG9tYWluLmFwcC5iYWNrZG9vci5zZXRWYWx1ZSgnbmV3VmFsdWUnKTtcclxuICogICAgIC8vIHRoZSBoaWRkZW4gdmFyIHdhcyBtdXRhdGVkXHJcbiAqICAgICBjb25zb2xlLmFzc2VydCgnbmV3VmFsdWUnID09PSB0bGQuZG9tYWluLmFwcC5iYWNrZG9vci5nZXRWYWx1ZSgpKTtcclxuICpcclxuICogT24gb2NjYXNpb24sIHByaW1hcmlseSBkdXJpbmcgdGVzdGluZywgeW91IG1heSB3YW50IHRvIHVzZSBkZWNsYXJlLFxyXG4gKiBidXQgbm90IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgYmUgdGhlIG5hbWVzcGFjZSByb290LiBJbiB0aGVzZSBjYXNlcyB5b3VcclxuICogY2FuIHN1cHBseSB0aGUgb3B0aW9uYWwgdGhpcmQgc2NvcGUgYXJndW1lbnQuXHJcbiAqXHJcbiAqICAgICB2YXIgbG9jYWxTY29wZT0ge31cclxuICogICAgICwgICBvYmplY3Q9IHt9XHJcbiAqXHJcbiAqICAgICBwdXJlbXZjLmRlY2xhcmUoJ21vY2sub2JqZWN0Jywgb2JqZWN0LCBsb2NhbFNjb3BlKTtcclxuICpcclxuICogICAgIGNvbnNvbGUuYXNzZXJ0KG51bGwgPT0gd2luZG93Lm1vY2ssICdtb2NrIG5hbWVzcGFjZSBpcyBub3QgaW4gZ2xvYmFsIHNjb3BlJyk7XHJcbiAqICAgICBjb25zb2xlLmFzc2VydChvYmplY3QgPT09IGxvY2FsU2NvcGUubW9jay5vYmplY3QsICdtb2NrLm9iamVjdCBpcyBhdmFpbGFibGUgaW4gbG9jYWxTY29wZScpO1xyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nXHJcbiAqICBBIHF1YWxpZmllZCBvYmplY3QgbmFtZSwgZS5nLiAnY29tLmV4YW1wbGUuQ2xhc3MnXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XVxyXG4gKiAgQW4gb2JqZWN0IHRvIG1ha2UgdGhlIHJlZmVyZW50IG9mIHRoZSBuYW1lc3BhY2UuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBbc2NvcGVdXHJcbiAqICBUaGUgbmFtZXNwYWNlJ3Mgcm9vdCBub2RlLiBJZiBub3Qgc3VwcGxpZWQsIHRoZSBnbG9iYWxcclxuICogIHNjb3BlIHdpbGwgYmUgbmFtZXNwYWNlcyByb290IG5vZGUuXHJcbiAqXHJcbiAqIEByZXR1cm4ge09iamVjdH1cclxuICpcclxuICogIEEgcmVmZXJlbmNlIHRvIHRoZSBsYXN0IG5vZGUgb2YgdGhlIE9iamVjdCBoaWVyYXJjaHkgY3JlYXRlZC5cclxuICovXHJcbmZ1bmN0aW9uIGRlY2xhcmUgKHF1YWxpZmllZE5hbWUsIG9iamVjdCwgc2NvcGUpXHJcbntcclxuICAgIHZhciBub2Rlcz0gcXVhbGlmaWVkTmFtZS5zcGxpdCgnLicpXHJcbiAgICAgICAgLCAgIG5vZGU9IHNjb3BlIHx8IE9vcEhlbHAuZ2xvYmFsXHJcbiAgICAgICAgLCAgIGxhc3ROb2RlXHJcbiAgICAgICAgLCAgIG5ld05vZGVcclxuICAgICAgICAsICAgbm9kZU5hbWU7XHJcblxyXG4gICAgZm9yICh2YXIgaT0gMCwgbj0gbm9kZXMubGVuZ3RoOyBpIDwgbjsgaSsrKVxyXG4gICAge1xyXG4gICAgICAgIGxhc3ROb2RlPSBub2RlO1xyXG4gICAgICAgIG5vZGVOYW1lPSBub2Rlc1tpXTtcclxuXHJcbiAgICAgICAgbm9kZT0gKG51bGwgPT0gbm9kZVtub2RlTmFtZV0gPyBub2RlW25vZGVOYW1lXSA9IHt9IDogbm9kZVtub2RlTmFtZV0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChudWxsID09IG9iamVjdClcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuXHJcbiAgICByZXR1cm4gbGFzdE5vZGVbbm9kZU5hbWVdPSBvYmplY3Q7XHJcbn07XHJcblxyXG5cclxuXHJcblxyXG4vKipcclxuICogQG1lbWJlciBwdXJlbXZjXHJcbiAqXHJcbiAqIERlZmluZSBhIG5ldyBjbGFzc2xldC4gQ3VycmVudCBlZGl0aW9ucyBvZiBKYXZhU2NyaXB0IGRvIG5vdCBoYXZlIGNsYXNzZXMsXHJcbiAqIGJ1dCB0aGV5IGNhbiBiZSBlbXVsYXRlZCwgYW5kIHRoaXMgbWV0aG9kIGRvZXMgdGhpcyBmb3IgeW91LCBzYXZpbmcgeW91XHJcbiAqIGZyb20gaGF2aW5nIHRvIHdvcmsgd2l0aCBGdW5jdGlvbiBwcm90b3R5cGUgZGlyZWN0bHkuIFRoZSBtZXRob2QgZG9lc1xyXG4gKiBub3QgZXh0ZW5kIGFueSBOYXRpdmUgb2JqZWN0cyBhbmQgaXMgZW50aXJlbHkgb3B0IGluLiBJdHMgcGFydGljdWxhcmx5XHJcbiAqIHVzZWZ1bGwgaWYgeW91IHdhbnQgdG8gbWFrZSB5b3VyIFB1cmVNdmMgYXBwbGljYXRpb25zIG1vcmUgcG9ydGFibGUsIGJ5XHJcbiAqIGRlY291cGxpbmcgdGhlbSBmcm9tIGEgc3BlY2lmaWMgT09QIGFic3RyYWN0aW9uIGxpYnJhcnkuXHJcbiAqXHJcbiAqXHJcbiAqICAgICBwdXJlbXZjLmRlZmluZVxyXG4gKiAgICAgKFxyXG4gKiAgICAgICAgIC8vIHRoZSBmaXJzdCBvYmplY3Qgc3VwcGxpZWQgaXMgYSBjbGFzcyBkZXNjcmlwdG9yLiBOb25lIG9mIHRoZXNlXHJcbiAqICAgICAgICAgLy8gcHJvcGVydGllcyBhcmUgYWRkZWQgdG8geW91ciBjbGFzcywgdGhlIGV4Y2VwdGlvbiBiZWluZyB0aGVcclxuICogICAgICAgICAvLyBjb25zdHJ1Y3RvciBwcm9wZXJ0eSwgd2hpY2ggaWYgc3VwcGxpZWQsIHdpbGwgYmUgeW91ciBjbGFzc2VzXHJcbiAqICAgICAgICAgLy8gY29uc3RydWN0b3IuXHJcbiAqICAgICAgICAge1xyXG4gKiAgICAgICAgICAgICAvLyB5b3VyIGNsYXNzZXMgbmFtZXNwYWNlLSBpZiBzdXBwbGllZCwgaXQgd2lsbCBiZSBcclxuICogICAgICAgICAgICAgLy8gY3JlYXRlZCBmb3IgeW91XHJcbiAqICAgICAgICAgICAgIG5hbWU6ICdjb20uZXhhbXBsZS5Vc2VyTWVkaWF0b3InXHJcbiAqIFxyXG4gKiAgICAgICAgICAgICAvLyB5b3VyIGNsYXNzZXMgcGFyZW50IGNsYXNzLiBJZiBzdXBwbGllZCwgaW5oZXJpdGFuY2UgXHJcbiAqICAgICAgICAgICAgIC8vIHdpbGwgYmUgdGFrZW4gY2FyZSBvZiBmb3IgeW91XHJcbiAqICAgICAgICAgLCAgIHBhcmVudDogcHVyZW12Yy5NZWRpYXRvclxyXG4gKiBcclxuICogICAgICAgICAgICAgLy8geW91ciBjbGFzc2VzIGNvbnN0cnVjdG9yLiBJZiBub3Qgc3VwcGxpZWQsIG9uZSB3aWxsIGJlIFxyXG4gKiAgICAgICAgICAgICAvLyBjcmVhdGVkIGZvciB5b3VcclxuICogICAgICAgICAsICAgY29uc3RydWN0b3I6IGZ1bmN0aW9uIFVzZXJNZWRpYXRvciAoY29tcG9uZW50KVxyXG4gKiAgICAgICAgICAgICB7XHJcbiAqICAgICAgICAgICAgICAgICAgcHVyZW12Yy5NZWRpYXRvci5jYWxsKHRoaXMsIHRoaXMuY29uc3RydWN0b3IuTkFNRSwgY29tcG9uZW50KTsgIFxyXG4gKiAgICAgICAgICAgICB9XHJcbiAqICAgICAgICAgfVxyXG4gKlxyXG4gKiAgICAgICAgIC8vIHRoZSBzZWNvbmQgb2JqZWN0IHN1cHBsaWVkIGRlZmluZXMgeW91ciBjbGFzcyB0cmFpdHMsIHRoYXQgaXNcclxuICogICAgICAgICAvLyB0aGUgcHJvcGVydGllcyB0aGF0IHdpbGwgYmUgZGVmaW5lZCBvbiB5b3VyIGNsYXNzZXMgcHJvdG90eXBlXHJcbiAqICAgICAgICAgLy8gYW5kIHRoZXJlYnkgb24gYWxsIGluc3RhbmNlcyBvZiB0aGlzIGNsYXNzXHJcbiAqICAgICAsICAge1xyXG4gKiAgICAgICAgICAgICBidXNpbmVzc01ldGhvZDogZnVuY3Rpb24gKClcclxuICogICAgICAgICAgICAge1xyXG4gKiAgICAgICAgICAgICAgICAgLy8gaW1wbCBcclxuICogICAgICAgICAgICAgfVxyXG4gKiAgICAgICAgIH1cclxuICpcclxuICogICAgICAgICAvLyB0aGUgdGhpcmQgb2JqZWN0IHN1cHBsaWVkIGRlZmluZXMgeW91ciBjbGFzc2VzICdzdGF0aWMnIHRyYWl0c1xyXG4gKiAgICAgICAgIC8vIHRoYXQgaXMsIHRoZSBtZXRob2RzIGFuZCBwcm9wZXJ0aWVzIHdoaWNoIHdpbGwgYmUgZGVmaW5lZCBvblxyXG4gKiAgICAgICAgIC8vIHlvdXIgY2xhc3NlcyBjb25zdHJ1Y3RvclxyXG4gKiAgICAgLCAgIHtcclxuICogICAgICAgICAgICAgTkFNRTogJ3VzZXJNZWRpYXRvcidcclxuICogICAgICAgICB9XHJcbiAqICAgICApO1xyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gW2NsYXNzaW5mb11cclxuICogIEFuIG9iamVjdCBkZXNjcmliaW5nIHRoZSBjbGFzcy4gVGhpcyBvYmplY3QgY2FuIGhhdmUgYW55IG9yIGFsbCBvZlxyXG4gKiAgdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxyXG4gKlxyXG4gKiAgLSBuYW1lOiBTdHJpbmdcclxuICogICAgICBUaGUgY2xhc3NsZXRzIG5hbWUuIFRoaXMgY2FuIGJlIGFueSBhcmJpdHJhcnkgcXVhbGlmaWVkIG9iamVjdFxyXG4gKiAgICAgIG5hbWUuICdjb20uZXhhbXBsZS5DbGFzc2xldCcgb3Igc2ltcGx5ICdNeUNsYXNzbGV0JyBmb3IgZXhhbXBsZVxyXG4gKiAgICAgIFRoZSBtZXRob2Qgd2lsbCBhdXRvbWF0aWNhbGx5IGNyZWF0ZSBhbiBvYmplY3QgaGllcmFyY2h5IHJlZmVyaW5nXHJcbiAqICAgICAgdG8geW91ciBjbGFzcyBmb3IgeW91LiBOb3RlIHRoYXQgeW91IHdpbGwgbmVlZCB0byBjYXB0dXJlIHRoZVxyXG4gKiAgICAgIG1ldGhvZHMgcmV0dXJuIHZhbHVlIHRvIHJldHJpZXZlIGEgcmVmZXJlbmNlIHRvIHlvdXIgY2xhc3MgaWYgdGhlXHJcbiAqICAgICAgY2xhc3MgbmFtZSBwcm9wZXJ0eSBpcyBub3QgZGVmaW5lZC5cclxuICogIC0gcGFyZW50OiBGdW5jdGlvblxyXG4gKiAgICAgIFRoZSBjbGFzc2xldHMgJ3N1cGVyY2xhc3MnLiBZb3VyIGNsYXNzIHdpbGwgYmUgZXh0ZW5kZWQgZnJvbSB0aGlzXHJcbiAqICAgICAgaWYgc3VwcGxpZWQuXHJcbiAqXHJcbiAqICAtIGNvbnN0cnVjdG9yOiBGdW5jdGlvblxyXG4gKiAgICAgIFRoZSBjbGFzc2xldHMgY29uc3RydWN0b3IuIE5vdGUgdGhpcyBpcyAqbm90KiBhIHBvc3QgY29uc3RydWN0XHJcbiAqICAgICAgaW5pdGlhbGl6ZSBtZXRob2QsIGJ1dCB5b3VyIGNsYXNzZXMgY29uc3RydWN0b3IgRnVuY3Rpb24uXHJcbiAqICAgICAgSWYgdGhpcyBhdHRyaWJ1dGUgaXMgbm90IGRlZmluZWQsIGEgY29uc3RydWN0b3Igd2lsbCBiZSBjcmVhdGVkIGZvclxyXG4gKiAgICAgIHlvdSBhdXRvbWF0aWNhbGx5LiBJZiB5b3UgaGF2ZSBzdXBwbGllZCBhIHBhcmVudCBjbGFzc1xyXG4gKiAgICAgIHZhbHVlIGFuZCBub3QgZGVmaW5lZCB0aGUgY2xhc3NlcyBjb25zdHJ1Y3RvciwgdGhlIGF1dG9tYXRpY2FsbHlcclxuICogICAgICBjcmVhdGVkIGNvbnN0cnVjdG9yIHdpbGwgaW52b2tlIHRoZSBzdXBlciBjbGFzcyBjb25zdHJ1Y3RvclxyXG4gKiAgICAgIGF1dG9tYXRpY2FsbHkuIElmIHlvdSBoYXZlIHN1cHBsaWVkIHlvdXIgb3duIGNvbnN0cnVjdG9yIGFuZCB5b3VcclxuICogICAgICB3aXNoIHRvIGludm9rZSBpdCdzIHN1cGVyIGNvbnN0cnVjdG9yLCB5b3UgbXVzdCBkbyB0aGlzIG1hbnVhbGx5LCBhc1xyXG4gKiAgICAgIHRoZXJlIGlzIG5vIHJlZmVyZW5jZSB0byB0aGUgY2xhc3NlcyBwYXJlbnQgYWRkZWQgdG8gdGhlIGNvbnN0cnVjdG9yXHJcbiAqICAgICAgcHJvdG90eXBlLlxyXG4gKlxyXG4gKiAgLSBzY29wZTogT2JqZWN0LlxyXG4gKiAgICAgIEZvciB1c2UgaW4gYWR2YW5jZWQgc2NlbmFyaW9zLiBJZiB0aGUgbmFtZSBhdHRyaWJ1dGUgaGFzIGJlZW4gc3VwcGxpZWQsXHJcbiAqICAgICAgdGhpcyB2YWx1ZSB3aWxsIGJlIHRoZSByb290IG9mIHRoZSBvYmplY3QgaGllcmFyY2h5IGNyZWF0ZWQgZm9yIHlvdS5cclxuICogICAgICBVc2UgaXQgZG8gZGVmaW5lIHlvdXIgb3duIGNsYXNzIGhpZXJhcmNoaWVzIGluIHByaXZhdGUgc2NvcGVzLFxyXG4gKiAgICAgIGFjY3Jvc3MgaUZyYW1lcywgaW4geW91ciB1bml0IHRlc3RzLCBvciBhdm9pZCBjb2xsaXNpb24gd2l0aCB0aGlyZFxyXG4gKiAgICAgIHBhcnR5IGxpYnJhcnkgbmFtZXNwYWNlcy5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IFt0cmFpdHNdXHJcbiAqICBBbiBPYmplY3QsIHRoZSBwcm9wZXJ0aWVzIG9mIHdoaWNoIHdpbGwgYmUgYWRkZWQgdG8gdGhlXHJcbiAqICBjbGFzcyBjb25zdHJ1Y3RvcnMgcHJvdG90eXBlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gW3N0YWl0Y1RyYWl0c11cclxuICogIEFuIE9iamVjdCwgdGhlIHByb3BlcnRpZXMgb2Ygd2hpY2ggd2lsbCBiZSBhZGRlZCBkaXJlY3RseVxyXG4gKiAgdG8gdGhpcyBjbGFzcyBjb25zdHJ1Y3RvclxyXG4gKlxyXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cclxuICogIEEgcmVmZXJlbmNlIHRvIHRoZSBjbGFzc2xldHMgY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIGRlZmluZSAoY2xhc3NJbmZvLCB0cmFpdHMsIHN0YXRpY1RyYWl0cylcclxue1xyXG4gICAgaWYgKCFjbGFzc0luZm8pXHJcbiAgICB7XHJcbiAgICAgICAgY2xhc3NJbmZvPSB7fVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBjbGFzc05hbWU9IGNsYXNzSW5mby5uYW1lXHJcbiAgICAgICAgLCAgIGNsYXNzUGFyZW50PSBjbGFzc0luZm8ucGFyZW50XHJcbiAgICAgICAgLCAgIGRvRXh0ZW5kPSAnZnVuY3Rpb24nID09PSB0eXBlb2YgY2xhc3NQYXJlbnRcclxuICAgICAgICAsICAgY2xhc3NDb25zdHJ1Y3RvclxyXG4gICAgICAgICwgICBjbGFzc1Njb3BlPSBjbGFzc0luZm8uc2NvcGUgfHwgbnVsbFxyXG4gICAgICAgICwgICBwcm90b3R5cGVcclxuXHJcbiAgICBpZiAoJ3BhcmVudCcgaW4gY2xhc3NJbmZvICYmICFkb0V4dGVuZClcclxuICAgIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDbGFzcyBwYXJlbnQgbXVzdCBiZSBGdW5jdGlvbicpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjbGFzc0luZm8uaGFzT3duUHJvcGVydHkoJ2NvbnN0cnVjdG9yJykpXHJcbiAgICB7XHJcbiAgICAgICAgY2xhc3NDb25zdHJ1Y3Rvcj0gY2xhc3NJbmZvLmNvbnN0cnVjdG9yXHJcbiAgICAgICAgaWYgKCdmdW5jdGlvbicgIT09IHR5cGVvZiBjbGFzc0NvbnN0cnVjdG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2xhc3MgY29uc3RydWN0b3IgbXVzdCBiZSBGdW5jdGlvbicpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSAvLyB0aGVyZSBpcyBubyBjb25zdHJ1Y3RvciwgY3JlYXRlIG9uZVxyXG4gICAge1xyXG4gICAgICAgIGlmIChkb0V4dGVuZCkgLy8gZW5zdXJlIHRvIGNhbGwgdGhlIHN1cGVyIGNvbnN0cnVjdG9yXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjbGFzc0NvbnN0cnVjdG9yPSBmdW5jdGlvbiAoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjbGFzc1BhcmVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgLy8ganVzdCBjcmVhdGUgYSBGdW5jdGlvblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2xhc3NDb25zdHJ1Y3Rvcj0gbmV3IEZ1bmN0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoZG9FeHRlbmQpXHJcbiAgICB7XHJcbiAgICAgICAgT29wSGVscC5leHRlbmQoY2xhc3NDb25zdHJ1Y3RvciwgY2xhc3NQYXJlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0cmFpdHMpXHJcbiAgICB7XHJcbiAgICAgICAgcHJvdG90eXBlPSBjbGFzc0NvbnN0cnVjdG9yLnByb3RvdHlwZVxyXG4gICAgICAgIE9vcEhlbHAuZGVjb3JhdGUocHJvdG90eXBlLCB0cmFpdHMpO1xyXG4gICAgICAgIC8vIHJlYXNzaWduIGNvbnN0cnVjdG9yIFxyXG4gICAgICAgIHByb3RvdHlwZS5jb25zdHJ1Y3Rvcj0gY2xhc3NDb25zdHJ1Y3RvcjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoc3RhdGljVHJhaXRzKVxyXG4gICAge1xyXG4gICAgICAgIE9vcEhlbHAuZGVjb3JhdGUoY2xhc3NDb25zdHJ1Y3Rvciwgc3RhdGljVHJhaXRzKVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChjbGFzc05hbWUpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKCdzdHJpbmcnICE9PSB0eXBlb2YgY2xhc3NOYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2xhc3MgbmFtZSBtdXN0IGJlIHByaW1pdGl2ZSBzdHJpbmcnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRlY2xhcmUgKGNsYXNzTmFtZSwgY2xhc3NDb25zdHJ1Y3RvciwgY2xhc3NTY29wZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNsYXNzQ29uc3RydWN0b3I7XHJcbn07XHJcblxyXG5cclxuXHJcbi8qIGltcGxlbWVudGF0aW9uIGVuZCAqL1xyXG5cclxuLy8gZGVmaW5lIHRoZSBwdXJlbXZjIGdsb2JhbCBuYW1lc3BhY2UgYW5kIGV4cG9ydCB0aGUgYWN0b3JzXHJcbnZhciBwdXJlbXZjID1cclxue1xyXG4gICAgICAgIFZpZXc6IFZpZXdcclxuICAgICxcdE1vZGVsOiBNb2RlbFxyXG4gICAgLFx0Q29udHJvbGxlcjogQ29udHJvbGxlclxyXG4gICAgLFx0U2ltcGxlQ29tbWFuZDogU2ltcGxlQ29tbWFuZFxyXG4gICAgLFx0TWFjcm9Db21tYW5kOiBNYWNyb0NvbW1hbmRcclxuICAgICxcdEZhY2FkZTogRmFjYWRlXHJcbiAgICAsXHRNZWRpYXRvcjogTWVkaWF0b3JcclxuICAgICxcdE9ic2VydmVyOiBPYnNlcnZlclxyXG4gICAgLFx0Tm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb25cclxuICAgICxcdE5vdGlmaWVyOiBOb3RpZmllclxyXG4gICAgLFx0UHJveHk6IFByb3h5XHJcbiAgICAsXHRkZWZpbmU6IGRlZmluZVxyXG4gICAgLFx0ZGVjbGFyZTogZGVjbGFyZVxyXG59O1xyXG5cclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHB1cmVtdmM7IiwidmFyIEFwcEZhY2FkZSA9IHJlcXVpcmUoJy4vYXBwRmFjYWRlLmpzJyk7XG52YXIgZ19yZXNvdWNlcyA9IHJlcXVpcmUoJy4vcmVzb3VyY2UuanMnKS5nX3Jlc291Y2VzO1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgY2MuZ2FtZS5vblN0YXJ0ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgY2Mudmlldy5hZGp1c3RWaWV3UG9ydCh0cnVlKTtcbiAgICAgICAgY2Mudmlldy5zZXREZXNpZ25SZXNvbHV0aW9uU2l6ZSg2NDAsIDk2MCwgY2MuUmVzb2x1dGlvblBvbGljeS5TSE9XX0FMTCk7XG4gICAgICAgIGNjLnZpZXcucmVzaXplV2l0aEJyb3dzZXJTaXplKHRydWUpO1xuXG4gICAgICAgIGNjcy5jc0xvYWRlci5zZXRSZWNvcmRQcm90b2NvbEJ1ZmZlcnNQYXRoKHRydWUpO1xuICAgICAgICBjYy5Mb2FkZXJTY2VuZS5wcmVsb2FkKGdfcmVzb3VjZXMsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGtleSA9ICdmaWdodGVyLW12Yyc7XG4gICAgICAgICAgICBBcHBGYWNhZGUuZ2V0SW5zdGFuY2Uoa2V5KS5zdGFydHVwKCk7XG4gICAgICAgIH0sIHRoaXMpO1xuICAgIH07XG4gICAgY2MuZ2FtZS5ydW4oKTtcbn0pKCk7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgQXJ0aHVyIG9uIDIwMTQvMTIvMjAuXHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIEFQUF9OQU1FOiBcImZpZ2h0ZXJcIixcclxuXHJcbiAgICBOT1RJRklDQVRJT046IHtcclxuICAgICAgICBTVEFSVFVQOiAnc3RhcnR1cCcsXHJcbiAgICAgICAgU0NFTkVfQ0hBTkdFRDogJ3NjZW5lX2NoYW5nZWQnLFxyXG4gICAgICAgIFNDRU5FX0hPTUU6ICdzY2VuZV9ob21lJ1xyXG4gICAgfSxcclxuXHJcbiAgICBTQ0VORV9BQ1RJT046ICdzY2VuZV9hY3Rpb24nLFxyXG4gICAgU0NFTkU6IHtcclxuICAgICAgICBIT01FOiAnSG9tZU1lZGlhdG9yJyxcclxuICAgICAgICBUUkFJTjogJ1RyYWluTWVkaWF0b3InXHJcbiAgICB9XHJcbn07IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgQXJ0aHVyIG9uIDIwMTQvMTIvMjEuXHJcbiAqL1xyXG52YXIgcHVyZW12YyA9IHJlcXVpcmUoJ3B1cmVtdmMnKS5wdXJlbXZjO1xyXG52YXIgU3RhcnR1cENvbW1hbmQgPSByZXF1aXJlKCcuL2NvbnRyb2xsZXIvY29tbWFuZC9TdGFydHVwQ29tbWFuZC5qcycpO1xyXG52YXIgY29uc3RhbnRzID0gcmVxdWlyZSgnLi9hcHBDb25zdGFudHMuanMnKTtcclxuXHJcbnZhciBBcHBGYWNhZGUgPSBtb2R1bGUuZXhwb3J0cyA9IHB1cmVtdmMuZGVmaW5lKFxyXG4gICAgLy8gQ0xBU1MgSU5GT1xyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdBcHBGYWNhZGUnLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5GYWNhZGUsXHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yOiBmdW5jdGlvbiAobXVsdGl0b25LZXkpIHtcclxuICAgICAgICAgICAgcHVyZW12Yy5GYWNhZGUuY2FsbCh0aGlzLCBtdWx0aXRvbktleSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBpbml0aWFsaXplQ29udHJvbGxlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBwdXJlbXZjLkZhY2FkZS5wcm90b3R5cGUuaW5pdGlhbGl6ZUNvbnRyb2xsZXIuY2FsbCh0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckNvbW1hbmQoY29uc3RhbnRzLk5PVElGSUNBVElPTi5TVEFSVFVQLCBTdGFydHVwQ29tbWFuZCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBpbml0aWFsaXplTW9kZWw6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcHVyZW12Yy5GYWNhZGUucHJvdG90eXBlLmluaXRpYWxpemVNb2RlbC5jYWxsKHRoaXMpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW5pdGlhbGl6ZVZpZXc6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcHVyZW12Yy5GYWNhZGUucHJvdG90eXBlLmluaXRpYWxpemVWaWV3LmNhbGwodGhpcyk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc3RhcnR1cDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbmROb3RpZmljYXRpb24oY29uc3RhbnRzLk5PVElGSUNBVElPTi5TVEFSVFVQKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy8gU1RBVElDIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBnZXRJbnN0YW5jZTogZnVuY3Rpb24obXVsdGl0b25LZXkpIHtcclxuICAgICAgICAgICAgdmFyIGluc3RhbmNlTWFwID0gcHVyZW12Yy5GYWNhZGUuaW5zdGFuY2VNYXA7XHJcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZSA9IGluc3RhbmNlTWFwW211bHRpdG9uS2V5XTtcclxuICAgICAgICAgICAgaWYoaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpbnN0YW5jZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gaW5zdGFuY2VNYXBbbXVsdGl0b25LZXldID0gbmV3IEFwcEZhY2FkZShtdWx0aXRvbktleSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBOQU1FOiAnQXBwRmFjYWRlJ1xyXG4gICAgfVxyXG4pOyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFydGh1ciBvbiAyMDE0LzEyLzE0LlxyXG4gKi9cclxuXHJcbnZhciBwdXJlbXZjID0gcmVxdWlyZSgncHVyZW12YycpLnB1cmVtdmM7XHJcbnZhciBQcmVwQ29udHJvbGxlckNvbW1hbmQgPSByZXF1aXJlKCcuL3ByZXBDb250cm9sbGVyQ29tbWFuZC5qcycpO1xyXG52YXIgUHJlcE1vZGVsQ29tbWFuZCA9IHJlcXVpcmUoJy4vcHJlcE1vZGVsQ29tbWFuZC5qcycpO1xyXG52YXIgUHJlcFZpZXdDb21tYW5kID0gcmVxdWlyZSgnLi9wcmVwVmlld0NvbW1hbmQuanMnKTtcclxudmFyIEhvbWVDb21tYW5kID0gcmVxdWlyZSgnLi9ob21lQ29tbWFuZC5qcycpO1xyXG52YXIgY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vLi4vYXBwQ29uc3RhbnRzLmpzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHB1cmVtdmMuZGVmaW5lKHtcclxuICAgICAgICBuYW1lOiAnZmlnaHRlci5jb250cm9sbGVyLmNvbW1hbmQuU3RhcnR1cENvbW1hbmQnLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5NYWNyb0NvbW1hbmRcclxuICAgIH0sXHJcblxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFkZCB0aGUgc3ViLWNvbW1hbmRzIGZvciB0aGlzIE1hY3JvQ29tbWFuZFxyXG4gICAgICAgICAqIEBvdmVycmlkZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGluaXRpYWxpemVNYWNyb0NvbW1hbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY2MubG9nKCdzdGFydCBjb21tYW5kIGluaXQnKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRTdWJDb21tYW5kKCBQcmVwQ29udHJvbGxlckNvbW1hbmQgKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRTdWJDb21tYW5kKCBQcmVwTW9kZWxDb21tYW5kICk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkU3ViQ29tbWFuZCggUHJlcFZpZXdDb21tYW5kICk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkU3ViQ29tbWFuZCggSG9tZUNvbW1hbmQgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFydGh1ciBvbiAyMDE0LzEyLzIxLlxyXG4gKi9cclxuXHJcbnZhciBwdXJlbXZjID0gcmVxdWlyZSgncHVyZW12YycpLnB1cmVtdmM7XHJcbnZhciBjb25zdGFudHMgPSByZXF1aXJlKCcuLi8uLi9hcHBDb25zdGFudHMuanMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcHVyZW12Yy5kZWZpbmUoe1xyXG4gICAgICAgIG5hbWU6ICdmaWdodGVyLmNvbnRyb2xsZXIuY29tbWFuZC5Ib21lQ29tbWFuZCcsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLlNpbXBsZUNvbW1hbmRcclxuICAgIH0sXHJcblxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlZ2lzdGVyIENvbW1hbmRzIHdpdGggdGhlIENvbnRyb2xsZXJcclxuICAgICAgICAgKiBAb3ZlcnJpZGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBleGVjdXRlOiBmdW5jdGlvbiAobm90ZSkge1xyXG4gICAgICAgICAgICAvLyBUaGlzIHJlZ2lzdGVycyBtdWx0aXBsZSBub3RlcyB0byBhIHNpbmdsZSBjb21tYW5kIHdoaWNoIHBlcmZvcm1zIGRpZmZlcmVudCBsb2dpYyBiYXNlZCBvbiB0aGUgbm90ZSBuYW1lLlxyXG4gICAgICAgICAgICAvLyBJbiBhIG1vcmUgY29tcGxleCBhcHAsIHdlJ2QgdXN1YWxseSBiZSByZWdpc3RlcmluZyBhIGRpZmZlcmVudCBjb21tYW5kIHRvIGVhY2ggbm90aWZpY2F0aW9uIG5hbWUuXHJcbiAgICAgICAgICAgIGNjLmxvZygnSG9tZUNvbW1hbmQgZXhlY3V0ZScpO1xyXG4gICAgICAgICAgICB0aGlzLmZhY2FkZS5zZW5kTm90aWZpY2F0aW9uKGNvbnN0YW50cy5TQ0VORV9BQ1RJT04sIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IGNvbnN0YW50cy5TQ0VORS5IT01FXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuKTtcclxuXHJcblxyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBBcnRodXIgb24gMjAxNC8xMi8xNC5cclxuICovXHJcbnZhciBwdXJlbXZjID0gcmVxdWlyZSgncHVyZW12YycpLnB1cmVtdmM7XHJcbnZhciBjb25zdGFudHMgPSByZXF1aXJlKCcuLi8uLi9hcHBDb25zdGFudHMuanMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcHVyZW12Yy5kZWZpbmUoe1xyXG4gICAgICAgIG5hbWU6ICdmaWdodGVyLmNvbnRyb2xsZXIuY29tbWFuZC5QcmVwQ29udHJvbGxlckNvbW1hbmQnLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5TaW1wbGVDb21tYW5kXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZWdpc3RlciBDb21tYW5kcyB3aXRoIHRoZSBDb250cm9sbGVyXHJcbiAgICAgICAgICogQG92ZXJyaWRlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZXhlY3V0ZTogZnVuY3Rpb24gKG5vdGUpIHtcclxuICAgICAgICAgICAgLy8gVGhpcyByZWdpc3RlcnMgbXVsdGlwbGUgbm90ZXMgdG8gYSBzaW5nbGUgY29tbWFuZCB3aGljaCBwZXJmb3JtcyBkaWZmZXJlbnQgbG9naWMgYmFzZWQgb24gdGhlIG5vdGUgbmFtZS5cclxuICAgICAgICAgICAgLy8gSW4gYSBtb3JlIGNvbXBsZXggYXBwLCB3ZSdkIHVzdWFsbHkgYmUgcmVnaXN0ZXJpbmcgYSBkaWZmZXJlbnQgY29tbWFuZCB0byBlYWNoIG5vdGlmaWNhdGlvbiBuYW1lLlxyXG4gICAgICAgICAgICBjYy5sb2coJ1ByZXBDb250cm9sbGVyQ29tbWFuZCBleGVjdXRlJyk7XHJcblxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbik7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgQXJ0aHVyIG9uIDIwMTQvMTIvMTQuXHJcbiAqL1xyXG52YXIgcHVyZW12YyA9IHJlcXVpcmUoJ3B1cmVtdmMnKS5wdXJlbXZjO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBwdXJlbXZjLmRlZmluZSh7XHJcbiAgICAgICAgbmFtZTogJ2ZpZ2h0ZXIuY29udHJvbGxlci5jb21tYW5kLlByZXBNb2RlbENvbW1hbmQnLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5TaW1wbGVDb21tYW5kXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZWdpc3RlciBQcm94aWVzIHdpdGggdGhlIE1vZGVsXHJcbiAgICAgICAgICogQG92ZXJyaWRlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZXhlY3V0ZTogZnVuY3Rpb24gKG5vdGUpIHtcclxuICAgICAgICAgICAgY2MubG9nKCdQcmVwTW9kZWxDb21tYW5kIGV4ZWN1dGUnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFydGh1ciBvbiAyMDE0LzEyLzE0LlxyXG4gKi9cclxudmFyIHB1cmVtdmMgPSByZXF1aXJlKCdwdXJlbXZjJykucHVyZW12YztcclxudmFyIERpcmVjdG9yTWVkaWF0b3IgPSByZXF1aXJlKCcuLi8uLi92aWV3L21lZGlhdG9yL2RpcmVjdG9yTWVkaWF0b3IuanMnKTtcclxudmFyIEhvbWVNZWRpYXRvciA9IHJlcXVpcmUoJy4uLy4uL3ZpZXcvbWVkaWF0b3IvaG9tZU1lZGlhdG9yLmpzJyk7XHJcbnZhciBTY2VuZU1lZGlhdG9yID0gcmVxdWlyZSgnLi4vLi4vdmlldy9tZWRpYXRvci9zY2VuZU1lZGlhdG9yLmpzJyk7XHJcbnZhciBUcmFpbk1lZGlhdG9yID0gcmVxdWlyZSgnLi4vLi4vdmlldy9tZWRpYXRvci90cmFpbk1lZGlhdG9yLmpzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHB1cmVtdmMuZGVmaW5lICh7XHJcbiAgICAgICAgbmFtZTogJ2ZpZ2h0ZXIuY29udHJvbGxlci5jb21tYW5kLlByZXBWaWV3Q29tbWFuZCcsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLlNpbXBsZUNvbW1hbmRcclxuICAgIH0sXHJcblxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlZ2lzdGVyIE1lZGlhdG9ycyB3aXRoIHRoZSBWaWV3XHJcbiAgICAgICAgICogQG92ZXJyaWRlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZXhlY3V0ZTogZnVuY3Rpb24gKG5vdGUpIHtcclxuICAgICAgICAgICAgY2MubG9nKCdQcmVwVmlld0NvbW1hbmQgZXhlY3V0ZScpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5mYWNhZGUucmVnaXN0ZXJNZWRpYXRvcihuZXcgRGlyZWN0b3JNZWRpYXRvcigpKTtcclxuICAgICAgICAgICAgdGhpcy5mYWNhZGUucmVnaXN0ZXJNZWRpYXRvcihuZXcgU2NlbmVNZWRpYXRvcigpKTtcclxuICAgICAgICAgICAgdGhpcy5mYWNhZGUucmVnaXN0ZXJNZWRpYXRvcihuZXcgSG9tZU1lZGlhdG9yKCkpO1xyXG4gICAgICAgICAgICB0aGlzLmZhY2FkZS5yZWdpc3Rlck1lZGlhdG9yKG5ldyBUcmFpbk1lZGlhdG9yKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuKTtcclxuIiwidmFyIHJlcyA9IHtcbiAgICBhZGRfanBnOiBcInJlcy9pbWFnZXMvYWRkLmpwZ1wiLFxuICAgIGJ0bjFfanBnOiBcInJlcy9pbWFnZXMvYnRuMS5qcGdcIixcblxuICAgIGJ0bjNfcG5nOiBcInJlcy9pbWFnZXMvYnRuMy5qcGdcIixcbiAgICBidG41X3BuZzogXCJyZXMvaW1hZ2VzL2J0bjUuanBnXCIsXG4gICAgYnRuN19qcGc6IFwicmVzL2ltYWdlcy9idG43LmpwZ1wiLFxuXG4gICAgaW1nMV9wbmc6IFwicmVzL2ltYWdlcy9pbWcxLmpwZ1wiLFxuICAgIGltZzVfanBnOiBcInJlcy9pbWFnZXMvaW1nNS5qcGdcIixcbiAgICBpbWc2X2pwZzogXCJyZXMvaW1hZ2VzL2ltZzYuanBnXCIsXG4gICAgdHh0X2JnMV9qcGc6IFwicmVzL2ltYWdlcy90eHRfYmcxLmpwZ1wiLFxuXG5cbiAgICBNYWluTm9kZTogXCJyZXMvTWFpblNjZW5lLmNzYlwiLFxuICAgIFRhc2tOb2RlOiBcInJlcy9UYXNrTm9kZS5jc2JcIixcbiAgICBUcmFpbk5vZGU6IFwicmVzL1RyYWluTm9kZS5jc2JcIlxuXG59O1xuXG52YXIgZ19yZXNvdXJjZXMgPSBbXTtcbmZvciAodmFyIGkgaW4gcmVzKSB7XG4gICAgZ19yZXNvdXJjZXMucHVzaChyZXNbaV0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cy5yZXMgPSByZXM7XG5tb2R1bGUuZXhwb3J0cy5nX3Jlc291Y2VzID0gZ19yZXNvdXJjZXM7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgQXJ0aHVyIG9uIDIwMTQvMTIvMjAuXHJcbiAqL1xyXG52YXIgcmVzID0gcmVxdWlyZSgnLi4vLi4vcmVzb3VyY2UuanMnKS5yZXM7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGNjLkxheWVyLmV4dGVuZCh7XHJcbiAgICBfcm9vdE5vZGU6IG51bGwsXHJcblxyXG4gICAgY3RvcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5fc3VwZXIoKTtcclxuICAgICAgICB0aGlzLl9yb290Tm9kZSA9IGNjcy5jc0xvYWRlci5jcmVhdGVOb2RlKHJlcy5NYWluTm9kZSk7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLl9yb290Tm9kZSk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciByb290Tm9kZSA9IHRoaXMuX3Jvb3ROb2RlO1xyXG4gICAgICAgIHZhciBidG5fdHJhaW4gPSByb290Tm9kZS5nZXRDaGlsZEJ5TmFtZSgnbWFpbl9wYW5lbCcpLmdldENoaWxkQnlOYW1lKCdidG5fdHJhaW4nKTtcclxuICAgICAgICBidG5fdHJhaW4uYWRkQ2xpY2tFdmVudExpc3RlbmVyKHRoaXMuYnV0dG9uVHJhaW5MaXN0ZW5lci5iaW5kKHRoaXMpKTtcclxuICAgIH0sXHJcblxyXG4gICAgYnV0dG9uVHJhaW5MaXN0ZW5lcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMub25UcmFpbikge1xyXG4gICAgICAgICAgICB0aGlzLm9uVHJhaW4oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pOyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFydGh1ciBvbiAyMDE0LzEyLzIxLlxyXG4gKi9cclxudmFyIHJlcyA9IHJlcXVpcmUoJy4uLy4uL3Jlc291cmNlLmpzJykucmVzO1xyXG5cclxudmFyIHRhc2tzID0gW1wi55Sf5ZG9XCIsIFwi5pS75Ye7XCIsIFwi6Ziy5b6hXCIsIFwi56C06ZiyXCIsIFwi5pq05Ye7XCIsIFwi6Z+n5oCnXCIsIFwi6Zeq6YG/XCIsIFwi5ZG95LitXCJdO1xyXG52YXIgREVGQVVMVF9DT1VOVCA9IDEwMDtcclxubW9kdWxlLmV4cG9ydHMgPSBjYy5MYXllci5leHRlbmQoe1xyXG4gICAgY3RvcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5fc3VwZXIoKTtcclxuICAgICAgICB2YXIgdHJhaW5Ob2RlID0gY2NzLmNzTG9hZGVyLmNyZWF0ZU5vZGUocmVzLlRyYWluTm9kZSk7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0cmFpbk5vZGUpO1xyXG5cclxuICAgICAgICB2YXIgc2l6ZSA9IGNjLndpblNpemU7XHJcbiAgICAgICAgdmFyIGJhc2VZID0gc2l6ZS5oZWlnaHQqODQvMTAwO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFza3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIHkgPSBiYXNlWSAtIDEwMCooaSsxKTtcclxuICAgICAgICAgICAgdmFyIHRhc2tOb2RlID0gY2NzLmNzTG9hZGVyLmNyZWF0ZU5vZGUocmVzLlRhc2tOb2RlKTtcclxuICAgICAgICAgICAgLy8g5L+u5pS56ZSa54K55peg5pWI77yM6buY6K6k6ZSa54K55Li6KDAsMClcclxuICAgICAgICAgICAgdGFza05vZGUuYXR0cih7XHJcbiAgICAgICAgICAgICAgICB4OiAwLFxyXG4gICAgICAgICAgICAgICAgeTogeVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdmFyIHRhc2tfbmFtZSA9IHRhc2tOb2RlLmdldENoaWxkQnlOYW1lKCd0YXNrX25hbWUnKTtcclxuICAgICAgICAgICAgdGFza19uYW1lLnNldFN0cmluZyh0YXNrc1tpXSk7XHJcbiAgICAgICAgICAgIHRhc2tfbmFtZS5hdHRyKHtcclxuICAgICAgICAgICAgICAgIGFuY2hvclg6IDAsXHJcbiAgICAgICAgICAgICAgICBhbmNob3JZOiAwLjVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHZhciBjb3VudF92YWx1ZSA9IHRhc2tOb2RlLmdldENoaWxkQnlOYW1lKCdjb3VudF92YWx1ZScpO1xyXG4gICAgICAgICAgICBjb3VudF92YWx1ZS5zZXRTdHJpbmcoREVGQVVMVF9DT1VOVCArICfmrKEnKTtcclxuICAgICAgICAgICAgY291bnRfdmFsdWUuYXR0cih7XHJcbiAgICAgICAgICAgICAgICBhbmNob3JYOiAwLFxyXG4gICAgICAgICAgICAgICAgYW5jaG9yWTogMC41XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgYnRuX3N0YXJ0X3Rhc2sgPSB0YXNrTm9kZS5nZXRDaGlsZEJ5TmFtZSgnYnRuX3N0YXJ0X3Rhc2snKTtcclxuICAgICAgICAgICAgYnRuX3N0YXJ0X3Rhc2suYWRkQ2xpY2tFdmVudExpc3RlbmVyKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGJ0bl9zdGFydF90YXNrLnNldFRpdGxlVGV4dCgn5byA5aeL5Lu75YqhJyk7XHJcbiAgICAgICAgICAgIGJ0bl9zdGFydF90YXNrLnNldFRpdGxlRm9udFNpemUoMTgpO1xyXG5cclxuICAgICAgICAgICAgdHJhaW5Ob2RlLmFkZENoaWxkKHRhc2tOb2RlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG59KTsiLCIvKipcclxuICogQ3JlYXRlZCBieSBBcnRodXIgb24gMjAxNC8xMi8yMS5cclxuICovXHJcblxyXG52YXIgcHVyZW12YyA9IHJlcXVpcmUoJ3B1cmVtdmMnKS5wdXJlbXZjO1xyXG52YXIgU2NlbmVNZWRpYXRvciA9IHJlcXVpcmUoJy4vc2NlbmVNZWRpYXRvci5qcycpO1xyXG52YXIgY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vLi4vYXBwQ29uc3RhbnRzLmpzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHB1cmVtdmMuZGVmaW5lKFxyXG4gICAgLy8gQ0xBU1MgSU5GT1xyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICd2aWV3Lm1lZGlhdG9yLkRpcmVjdG9yTWVkaWF0b3InLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5NZWRpYXRvcixcclxuICAgICAgICBjb25zdHJ1Y3RvcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHB1cmVtdmMuTWVkaWF0b3IuY2FsbCh0aGlzLCB0aGlzLmNvbnN0cnVjdG9yLk5BTUUpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgLyoqIEBvdmVycmlkZSAqL1xyXG4gICAgICAgIGxpc3ROb3RpZmljYXRpb25JbnRlcmVzdHM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgIGNvbnN0YW50cy5OT1RJRklDQVRJT04uU0NFTkVfQ0hBTkdFRFxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKiBAb3ZlcnJpZGUgKi9cclxuICAgICAgICBoYW5kbGVOb3RpZmljYXRpb246IGZ1bmN0aW9uIChub3RpZmljYXRpb24pIHtcclxuICAgICAgICAgICAgY2MubG9nKCdoYW5kbGVyIG5vdGlmaWNhdGlvbiBvbiBkaXJlY3RvciBtZWRpYXRvcicpXHJcbiAgICAgICAgICAgIHN3aXRjaCAobm90aWZpY2F0aW9uLmdldE5hbWUoKSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBjb25zdGFudHMuTk9USUZJQ0FUSU9OLlNDRU5FX0NIQU5HRUQ6XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jYy5sb2coJ1NDRU5FX0NIQU5HRUQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjZW5lTWVkaWF0b3IgPSB0aGlzLmZhY2FkZS5yZXRyaWV2ZU1lZGlhdG9yKFNjZW5lTWVkaWF0b3IuTkFNRSApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihzY2VuZU1lZGlhdG9yICYmIHNjZW5lTWVkaWF0b3IuZ2V0Vmlld0NvbXBvbmVudCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLnJ1blNjZW5lKG5ldyBjYy5UcmFuc2l0aW9uRmFkZSgxLjIsIHNjZW5lTWVkaWF0b3IuZ2V0Vmlld0NvbXBvbmVudCgpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKiBAb3ZlcnJpZGUgKi9cclxuICAgICAgICBvblJlZ2lzdGVyOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKiBAb3ZlcnJpZGUgKi9cclxuICAgICAgICBvblJlbW92ZTogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy8gU1RBVElDIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBOQU1FOiAnRGlyZWN0b3JNZWRpYXRvcidcclxuICAgIH1cclxuKTtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgQXJ0aHVyIG9uIDIwMTQvMTIvMjAuXHJcbiAqL1xyXG52YXIgcHVyZW12YyA9IHJlcXVpcmUoJ3B1cmVtdmMnKS5wdXJlbXZjO1xyXG52YXIgY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vLi4vYXBwQ29uc3RhbnRzLmpzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdmaWdodGVyLnZpZXcubWVkaWF0b3IuSG9tZU1lZGlhdG9yJyxcclxuICAgICAgICBwYXJlbnQ6IHB1cmVtdmMuTWVkaWF0b3JcclxuICAgIH0sXHJcblxyXG4gICAgLy8gaW5zdGFuY2UgbWVtYmVyc1xyXG4gICAge1xyXG4gICAgICAgIC8qKiBAb3ZlcnJpZGUgKi9cclxuICAgICAgICBsaXN0Tm90aWZpY2F0aW9uSW50ZXJlc3RzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKiBAb3ZlcnJpZGUgKi9cclxuICAgICAgICBoYW5kbGVOb3RpZmljYXRpb246IGZ1bmN0aW9uKG5vdGUpIHtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqIEBvdmVycmlkZSAqL1xyXG4gICAgICAgIG9uUmVnaXN0ZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKiogQG92ZXJyaWRlICovXHJcbiAgICAgICAgb25SZW1vdmU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgSG9tZUxheWVyID0gcmVxdWlyZSgnLi8uLi9jb21wb25lbnQvaG9tZUxheWVyLmpzJyk7XHJcbiAgICAgICAgICAgIHNlbGYudmlld0NvbXBvbmVudCA9IG5ldyBIb21lTGF5ZXIoKTtcclxuICAgICAgICAgICAgc2VsZi52aWV3Q29tcG9uZW50Lm9uVHJhaW4gPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zZW5kTm90aWZpY2F0aW9uKGNvbnN0YW50cy5TQ0VORV9BQ1RJT04sIHtuYW1lOiBjb25zdGFudHMuU0NFTkUuVFJBSU59KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgc2VsZi52aWV3Q29tcG9uZW50LmluaXQoKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBnZXRSZXNvdXJjZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy8gc3RhdGljIG1lbWJlcnNcclxuICAgIHtcclxuICAgICAgICBOQU1FOiAnSG9tZU1lZGlhdG9yJ1xyXG4gICAgfVxyXG4pIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgQXJ0aHVyIG9uIDIwMTQvMTIvMjEuXHJcbiAqL1xyXG5cclxudmFyIHB1cmVtdmMgPSByZXF1aXJlKCdwdXJlbXZjJykucHVyZW12YztcclxudmFyIGNvbnN0YW50cyA9IHJlcXVpcmUoJy4uLy4uL2FwcENvbnN0YW50cy5qcycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBwdXJlbXZjLmRlZmluZVxyXG4oXHJcbiAgICAvLyBDTEFTUyBJTkZPXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ2ZpZ2h0ZXIudmlldy5tZWRpYXRvci5TY2VuZU1lZGlhdG9yJyxcclxuICAgICAgICBwYXJlbnQ6IHB1cmVtdmMuTWVkaWF0b3JcclxuICAgIH0sXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgX2luaXRpYWxpemVkOiBmYWxzZSxcclxuXHJcbiAgICAgICAgbG9hZGVySW1hZ2U6IFwiZGF0YTppbWFnZS9qcGVnO2Jhc2U2NCwvOWovNFFBWVJYaHBaZ0FBU1VrcUFBZ0FBQUFBQUFBQUFBQUFBUC9zQUJGRWRXTnJlUUFCQUFRQUFBQWxBQUQvNFFNcGFIUjBjRG92TDI1ekxtRmtiMkpsTG1OdmJTOTRZWEF2TVM0d0x3QThQM2h3WVdOclpYUWdZbVZuYVc0OUl1Kzd2eUlnYVdROUlsYzFUVEJOY0VObGFHbEllbkpsVTNwT1ZHTjZhMk01WkNJL1BpQThlRHA0YlhCdFpYUmhJSGh0Ykc1ek9uZzlJbUZrYjJKbE9tNXpPbTFsZEdFdklpQjRPbmh0Y0hSclBTSkJaRzlpWlNCWVRWQWdRMjl5WlNBMUxqQXRZekEyTUNBMk1TNHhNelEzTnpjc0lESXdNVEF2TURJdk1USXRNVGM2TXpJNk1EQWdJQ0FnSUNBZ0lDSStJRHh5WkdZNlVrUkdJSGh0Ykc1ek9uSmtaajBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TVRrNU9TOHdNaTh5TWkxeVpHWXRjM2x1ZEdGNExXNXpJeUkrSUR4eVpHWTZSR1Z6WTNKcGNIUnBiMjRnY21SbU9tRmliM1YwUFNJaUlIaHRiRzV6T25odGNFMU5QU0pvZEhSd09pOHZibk11WVdSdlltVXVZMjl0TDNoaGNDOHhMakF2YlcwdklpQjRiV3h1Y3pwemRGSmxaajBpYUhSMGNEb3ZMMjV6TG1Ga2IySmxMbU52YlM5NFlYQXZNUzR3TDNOVWVYQmxMMUpsYzI5MWNtTmxVbVZtSXlJZ2VHMXNibk02ZUcxd1BTSm9kSFJ3T2k4dmJuTXVZV1J2WW1VdVkyOXRMM2hoY0M4eExqQXZJaUI0YlhCTlRUcEViMk4xYldWdWRFbEVQU0o0YlhBdVpHbGtPak00TURCRU1EWTJRVFUxTWpFeFJURkJRVEF6UWpFek1VTkZOek14UmtRd0lpQjRiWEJOVFRwSmJuTjBZVzVqWlVsRVBTSjRiWEF1YVdsa09qTTRNREJFTURZMVFUVTFNakV4UlRGQlFUQXpRakV6TVVORk56TXhSa1F3SWlCNGJYQTZRM0psWVhSdmNsUnZiMnc5SWtGa2IySmxJRkJvYjNSdmMyaHZjQ0JEVXpVZ1YybHVaRzkzY3lJK0lEeDRiWEJOVFRwRVpYSnBkbVZrUm5KdmJTQnpkRkpsWmpwcGJuTjBZVzVqWlVsRVBTSjRiWEF1YVdsa09rVTJSVGswT0VNNE9FUkNOREV4UlRFNU5FVXlSa0UzTTBNM1FrRTFOVGxFSWlCemRGSmxaanBrYjJOMWJXVnVkRWxFUFNKNGJYQXVaR2xrT2tVMlJUazBPRU01T0VSQ05ERXhSVEU1TkVVeVJrRTNNME0zUWtFMU5UbEVJaTgrSUR3dmNtUm1Pa1JsYzJOeWFYQjBhVzl1UGlBOEwzSmtaanBTUkVZK0lEd3ZlRHA0YlhCdFpYUmhQaUE4UDNod1lXTnJaWFFnWlc1a1BTSnlJajgrLys0QURrRmtiMkpsQUdUQUFBQUFBZi9iQUlRQURRa0pDUW9KRFFvS0RSTU1Dd3dURmhFTkRSRVdHaFVWRmhVVkdoa1VGaFVWRmhRWkdSMGZJQjhkR1Njbktpb25Kems0T0RnNVFFQkFRRUJBUUVCQVFBRU9EQXdPRUE0UkR3OFJGQTRSRGhRVkVSSVNFUlVmRlJVWEZSVWZLQjBaR1JrWkhTZ2pKaUFnSUNZakxDd29LQ3dzTnpjMU56ZEFRRUJBUUVCQVFFQkEvOEFBRVFnQXlBQ2dBd0VpQUFJUkFRTVJBZi9FQUxBQUFBRUZBUUVBQUFBQUFBQUFBQUFBQUFRQUFnTUZCZ2NCQVFFQUF3RUJBQUFBQUFBQUFBQUFBQUFBQVFNRUFnVVFBQUlCQWdJRUJ3b0xCZ1FHQXdBQUFBRUNBd0FFRVFVaE1SSUdRVkZ4c1RJVEZHR0J3ZEVpUWxLU016V1JvZUZpY3FLeUkxTnpGWUpqSkRRV0I5S2pWQ2J4d2tOa0pXWGlrM1FSQUFJQkFnTUZCUWNEQlFFQUFBQUFBQUFCQWhFRElSSUVNVUZSY1RKaHdWSVVCWkdoc1NKeUV6T0IwVUxoWXBJalV4WC8yZ0FNQXdFQUFoRURFUUEvQU1KU3BVcUFWS2xYdUZBZVVxOXdwVUI1WHVGZTRWNm9vRHpaSERveDBDbkdNaW56d2w3WjhOYWphSGVvTzN2bVRCWkJ0cDlZVUlxVEVWNVJPeEhLbldSbmFVOFZSTWhGQlVqcFY3aFNvU2VVcTlwVUI1U3IybGhRSGxLdmNLOG9CVjdoU0ZTUnJ0YUtBWnMwN1lOUE0xcEcyeEpJQXcxalNlYW5kcnkvOFg0bThWQ0trV3dhV3dhbTdYbC80djFXOFZMdG1YL2kvVmJ4VW9La1d3YWtTTTQwN3RtWC9pL1ZieFVtekd3alFzamRZNDFJQVJpZS9VMEliWk8wa050Q1huT0NrRUJlRnU0S0kzQnM3RE5iMjd5YStqRHgza0plRW5wSkpFY1FWYldEc2sxN3U1dXJkNTkxdWNaa1doeW0yVm5kOVJrQ0RFcEZ4RFJwYncwYnVudTVtbHAyRGUyRk1MWVhPRDJ3QjJ4Yk9lcmFVY1lHSjcybWxTVWlxenpkek1kM1ozbWl4bHRBMnl6Y0svTmxITTFEUXlSWGNlMUhvY2ROT0VmSlhaODh5OVpvak9xaGlCc3pJUmlIUThZNGNLNVR2SHV6TGxqSE5NcXhOb0RqTEZyYUhIbmpQeGNOQ0dWYnhFVXpZTlR4NWpaU3hocFc2cVR6bHdKK0RDdk8yWmYrTDlWdkZTZ3F5SFlOTFlOVGRzc1B4ZmlieFV1MTVmOEFpL1ZQaXFDYWtPd2E4MkRVL2E4di9GK0p2RlREZFdQQkw4UjhWS0N2WVJZVjVVem9NQXk2UWRJSXFJMEI0S0p0eGlSUXdvdTE2UW9HVWtudEg1VHowUmJaYm1GMmhrdHJhU1ZCbzJsVWtZOHREeWUwZmxQUFhUc2xWVXlpeVZSc2pxVU9BNHlNVDhkVzJyYW0ybTZVVlROcTlTN0VJeVVWSnlkTVRuLzZEblAraW05V2wrZzV6L29wdlZycHRlRWhRV1k0QWFTVHdBVmY1V1BpWmgvOVM1L3pqN3psdHpsbVlXa2ZXWE52SkRHVGdHY1lESGlyUjdpN21TYndYUGFyc0ZNcmdiN3c2akt3L3dDbW5jOUkxNGtGM3ZwdkNsamJNeVdNT0pMNGFFaUI4cVUvT2JVSzdIWVdWcmwxcEZaV2lDT0NCUXFLT0xqUEdUck5aWnFLYlVYVkhxMm5Od1R1SlJrMVZwYmdYTjhzN1JrNXltMFVRUXpoSUcyTkFqaHhIV2JJK2dDQlZqQkJGYnd4d1FxRWlpVUpHZzFCVkdBRmU3ZFYyOFdZTFlaRm1GMlRoMVVEN0pHanltR3luMWlLNU95eklCR0IxSGdyTFpoYW16dW1RQUdKd1NxblNDaDFxM0dPQ29keHQ0Y3h1cmRjcHp1TjRjeWhpV2FGNUJnMDl1ZFVtbld3MUgvalY5bkZ1SjdRdW8rOGg4cGVUaEZBKzA0N3ZkdXlNdGs3ZllxVGwwN1lGZGZVdWZNUHpUNXA3MVVkdGxtWVhhR1MydDNtUUhBc2d4QU5kYWRZSm9wTGU0UVMyODY3RXNaNFFmQ05ZckNGYmpkRFBtZ2tZeVdGeGdWZjA0aWZKZjZTY05kUlVXMVhCYjZGVTVUakY1RXBTU3JHdS9zNWxOK2c1ei9vcHZWcGZvT2Mvd0NpbTlXdGRIbmF0dk9iSlhEVzd4TEdoQjhuclBhWTkvSENyK3RFZFBDVmFTZURvWUxucUY2M2x6VzQvUEZTVzNlY3hiSTg0VlN6V1V3VWFTZGcwRFhYSzVudkFpcG5kNnFnS3ZXblFPN3ByaTlaVUVtbTNWbDJqMWtyOHBSbEZSeXF1Qk5aakd4US9TNTZZMVMyZnU5T1Z1ZW9uMTFTemFob291MDZRb1FVWGFkSVZDRDJGSko3UitVODlkTXlkdjhBeGRuK1RIOW11WnllMGZsUFBYUXN0bEs1VGJrYTFnVWpsQzFxMHZWTGtlYjZyK08zVHg5eGNZMW50OGMwTnJaQ3lpT0UxMTA4TllqR3Yxam9vN0pzMWp6S3lTY1lMSXZrekw2TER3SFhWSmtzSDlTYjQ5ZEtOcTB0ajFqQTZ1cmlPQ0wrMDJGV1g3aVZ0WlgxL0F6YUhUeWVvYXVLbjJNWDlXNzl6ZWJpWkN1UjVNalNyaGZYdUV0d1RyVWVaSCt5TmZkclJOY3hJNkl6aFhsSkVhazZXSUdKMlJ3NENoV25DaG5kdGxWQkxNZFFBMGsxZ2JYTk16ekRmRExzNm1qYVBLcHBKYld3SjFiT3d3eHc0M09uSGg3MVlUM0RwZldVSm1GbGI1akhIRGRlWEJISXNyUmVhNVRTcXZ4cUcwNGNOTjYydmV0b0NTNHRyZTVtZ25rR0U5cSszREtPa3VJMldYNkxEUVJSSFdEaDFVQ3R3ajdRUmcyd2RsOERqZ3cxcWU3WHZXMEJRM2tmWjdtU0xnVStUOUU2UlZibnVWcm5XVlNXcWorTHQ4WmJSdUhFZEtQa1lWY1oyTUpZNWZTR3llVmFyNDUrcmtXUUhBcWNjYWxQRTVrbTFodFdLNW5LNFdudDVGdVVCVXdPTUc0bkdrQS9CWFVyVzRTNnRvcmxPak1nY2QveFZuN3JMbzd6S3MwdUVqQ05lU3Zkd29CaGdzWnhYMWwyajM2azNMdSt1eXByZGo1VnM1QStpL2xENDhhMGFhVkpPUGk3akI2bGJ6V296cGpCNDhwZjFORFhOTjR2Zmw3K1o0QlhTNjVwdkY3OHZmelBBSzcxWFRIbVovUy95VCtqdko3TDNmSHl0ejFFK3VwYkwrUWo1VzU2amZYV1Juc0lZS0x0ZWtLRUZHV3ZTRlFneWprOW8vS2VldDNZdGhsTVAvNXg5bXNKSjdSK1U4OWJpeWIvQU1YRXY3Z0Q2dGFkTDFUK2t3ZXBSckMzOVprTERNYml3TXZVSFJQRzBiamxHZzhvcmUvMjNzeEJsZHhmTVBMdXBOaFQ4eUwvQU9STlpiZHpKNDg0c2N5dHhnTHFKWTVMWmo2UTJzVjVHMVZ1ZDFtamp5RzBpajBORUdTWlRvS3loanRxdzR3YXp0dWlYQTNxS1RiU3hsdGZHaGJabEU5NVp0WnF4VmJnaU9aaHJFUjlwaDNTdms5K3BKSUxaNFk0REdCRkNVTUtqUnNHUG9iUEZoVWZXME5KbWxqRTJ4SmNJcmNJMnZGVUVsbjFsUlhkNmxyYXpYVDlHQ05wRCt5TnFvSTdtT1ZkdU53Nm56bE9Jb1BPVWE2eXllMVhYY2JNUjVHZFEzeFkwQlNiajMxL0ZjVFFaaXJKK3E0MzFxN2FuYkhDVFo3MkJ3N2xiUHJLQk1jQldOTmdiTUJCaCtic2pCZG5pMFZKMWxBUlpzNnlXaXVweEN1TUR5NktwUzJJd09vNkRUcjNNcmUzZTV0WlpWVU00WkJqcU9PSm9XTzRqa1hhamNPT01IR2dESVN2V0lyZEFrS1I4MCtUelZsOTA4YlBQTDNMenhPdUhkaWZ4VmZpVEFnOTJxSS93Ky84Z0dnU3lOL21SN1hQVmxwMGxGLzNMM21iVkt0dTVIamJrLzhBSEUyRmMwM2k5K1h2NW5nRmRLTmMxM2k5K1h2NW5nRmFOVjB4NW5uK2wva245SGVFV1h1K1BsYm5xSjlkUzJYdTlPVnVlb24xMWtaN0NHQ2pMWHBDZ3hSbHIwaFVJUFlVY250SDVUejFzOHZiK0J0MS9kcVBpckdTZTBmbFBQV3VzRy9nNFB5MTVxMDZYcWx5TVd2VllRK3J1STl4Sk9xek85aE90by9zUDh0YkdPRklybVdlTTdJdU1ETW5BWFhRSk9ValFlT3NKazBuWTk2aXAwQ1l1bnJqYUh4MXQrc3JQSlViWEJtMkxyRlBpa3dUT2IrVCtWaGJaeEdNckRYcDgzeDFRU3kydHVjSnBValBFVHArQ241L2Z0YVJ2S3Z0cDNLeDQ4SEczZXJITXpPeFppV1p0TE1kSk5RU2JiTDcxVms2eXluVmlPa3FuRUVmT1d0UGJYaTNFUWtHZzZtWGlOY2tqZVNKeEpHeFIxMHF3MEd0eHV4bXZiSW1ENENaTUZsQTRmUmZ2MEJxZXNxcXpUTVpOTUVEYklIdEhIMlFlQ2laSlNxTVFkT0dpdWU1M216M2N6UXdzUmJJY05IbmtlYzNjNHFBTXVyaXo2OGdUSVRveHdPT25scDBNanhNSllXNzQxR3MzUlZsZHRieWdFL2RNY0hYL21vRGF4VGlXTlpCNTNCM2FyYjgvd0MrNFNPRjRzZi9BS3hVOWtjQnNmT0dIZm9VSHRHL1Jielk1RGllNUhIaFhkdmF2cWlaOVE4SmRscTQvZ2JLdWE3eGUvTDM4endDdWhwZjJVay9abzUwa213SktJZG9nRGp3MVZ6emVMMzVlL21lQVZwMUxUZ3FZNG5uK21SYXV6cW1xd3JqekNMTDNmSHl0ejFFK3VwTEwrUWo1VzU2amZYV1Jucm9ZS0x0ZWtLRUZGMnZTRlFnOWhTU2UwZmxQUFdvc20vaElmb0x6Vmw1UGFQeW5uclJXYi93MFgwRjVxMDZYcWx5TTJzVll4NWdtYkZyZS90NzFOWTJUKzBoOFZiU081U1dOSlVPS1NBTXA3akRHc3BtTVBhTFJsWFM2ZVd2ZTEvRlJPN1dZZGJabTFZL2VXL1I3cUh4SFJYR29qbG0zdWxpZDZhVmJhVytPQUx2Z0NMcTJIbTlXeEhLV3FqaGo2eHNLMWU4ZG0xNWw0bmlHMUxaa3N3R3N4dHJQZU9tc3ZheUJKQTFWSXRsV2pwdEx1VGRQTW83THRqUkRxOW5hSzQrV0Y5SXJVVzdCYUhPbGpHcVZIQjd3Mmh6Vm9adDg3ZDh2YU5ZU0xsMDJDY1JzREViSmJqNzFVdTdVQmt2SjcvRDdxMlFvRHh5U2FBTzhNVFhkeFJWTXBScDVYWk9XZEYvbXM3UjVYZHlLZktXSnNPLzVQaHJHNVhsTnhtRXl3VzZiVG5UeEFBY0pOYkdTTVhrTTFwamdiaU5vMVB6aVBKK09zN3U3bS82UmVNMDBaT2d4U3BxWVlIVDN3UlhNS040bGw5elVHNGJRZk5zaHU4c1pWdUVBMmhpckE0cWUvVk93d3JWYnpid3c1bUk0NFVLUlJZa2JXRzBTM0pXY3RiZDd1NVdGZk9PTEhpVWRKcW1haXBmTHNJc09iaFdlMDAxbE1rTVZ2Sk5qaGdoSUFMTWNCeENzN2Z4WFFta3VweDFiWERzd0dQbGFUaWRWYUV5S05Ya29vNGVCVitTcTdMN1ZzOXpjQmdleVE0R1EvTUIxY3Jtb2ltMm9yZXpxY293VHVTZUVZNDhqUTdvWlgyUEx6ZHlMaE5kNlJqckVZNkk3K3VzcHZINzh2ZnpQQUs2VUFBQUZHQUdnQWNBcm11OFh2eTkvTThBclRmaW8yNFJXNW5uYUc2N3VvdTNIL0tQdXFUMlg4aEh5dHoxRyt1cExMM2VuSzNQVWI2NnlzOVJEQlJkcjBoUWdvdTA2UXFFR1VrbnRINVR6MWUyMzh2RjlCZWFxS1QyajhwNTZ2YmIrWGkrZ3ZOV2pUZFV1Um4xWFRIbVRoOEtySlRKbHQ4dDFDUElZNDRjR25wSlZqVEpZa21qYU45SWI0dTdWOTIzbmpUZXRoUmF1WkpWM1BhVzFyZkxJaVhFRFlnNlI0VlljOUNYVzd0aGZPWmJLZGJHWnRMVzh1UFZZL3UzR3JrTlVrTTl6bGN4VWpiaGZXT0E5MGNScTRndjRMaGRxTitWVG9OWVdtblJtOU5OVldOVHlIYzZWV0J2OHd0NFllSHFtNnh5UG1yb3ExWjdXR0ZMU3hUcTdXTFN1UFNkanJrZnVtcTV5SFhEVWVBOTJvTzJTS3BWdW1OQWFvSkxNWEgzbXlwMHJwSjR1S2hjM3RiRE01Qk1yaTF6QWo3OWo3S1RpWThUY2RCcGNzaXRoMDI4Nm8rc1BDYWdFWDlQemc0elhVQ3A2UVlzZThvb3VDRzN0azZtMUJZdjA1VzZUK0lkeW9seGJIREFBYTJPZ0RsTkN6M3J5TjJXeEJkNVBKTWcxdDgxZUlkMnVrcW5MbFRCYmZjdVkrOXVKTGlSY3Z0UHZIZHNISytjZlJIY0hEV3N5YXdqeXkwV0JjREkzbFRQNlRlSWNGVitTNU9tWHg5YkpnMTA0OG84Q2owVjhKcTJEVnUwOW5MODB1cDdPeEhpK29hbDNQOEFYQi9Jc1pTOFQvWU9WNjV6dkNjYzd2ZnpQQUszaXZXQ3o0NDV6ZUg5NTRCWE9yNkk4eWZTZnl6K2p2Q0xQM2ZIeXR6MUcrdXBMUDNmSHl0ejFFK3VzYlBhUTBVWGFkSVVJS0x0ZWtLaEI3Q2trOW8vS2VlcjIyL2w0L29MelZSU2UwZmxQUFY3Yi95OFgwRjVxMGFicWx5TStxNlk4eVFzQlRETW9yMW84YWlhRTFwYmx1TXFTM3NiTExISWhTUlF5bmdxdWtoYUo5dUJqbytINWFPYTNhbzJ0MzRxb3VSbExhalRhbEdQOHYwSVk4eWxYUStQS1BGVS9iWVhPTFBnZTZDS2lhMExheFRPeEh1MVE3Y3VCZDl5UEVKN1RialhLTzhDYWpiTUlGNkNOSWVOdkpIanFJV0o3dFNwWWthbHFWYmx3SWR5RytSR1h1cjBoWFlKRnhhbCtEaHE1eTNzbGt2M1kycEQwcFRyK1FVQ2xwSlJVZG85WFc0T0xyVEh0TTE2Y1pMTFdrZUM3eTRqdmxORXBjUnR3MVV4MjdDaTQ0OE5aclRGeTNubjNJUVd4bGdHckRaM3B6YTcvTThBclpvK0FyRjUxNzF1dnArQ3FkVjBSNWwvcHNVcnMydkIzaGRsN3ZUbGJucUo5ZFMyWHUrUGxibnFKOWRZMmVzaG9vcTE2UW9RVVhhOUlWQ0QyRkxKN1J1VTg5V050bVVTUXFrZ1lNZ3cwYWNjS3JwUGFQeW5uclpXRzRWaStWV21ZNXRuTVdYRytYcklZbkEwcmhqMG1kY1RnZE5kd25LRHFqbWR1TTFTUlIvcWxyOC80S1g2cGE4VC9CVnpEdUxaWHVkUlpibG1ieFhjUFVOUGMzS3FDSXdyYk96Z3JIRW5Iam95RCszZVNYa2h0N0RlS0c0dW1ER09KVlVrbGZvdVRoWGZtYm5aN0N2eTF2dDlwbXYxVzErZDhGTDlWdGVKdmdxNXlyY09HZkxtekhOODBpeXlFVFBicHRBRUZvMlpHOHBtVWExT0ZObjNLeTZXL3NiREtNNWh2NWJ4MldUWkErN1JGMnk1MldPUEpUekUrejJEeTF2dDlwVC9BS3BhY1RlclMvVTdUaWIxYTA0L3Q3a0RYUFkwM2poTjBXNnNRN0s3VzNxMmRuck1jY2FEeS84QXQ4MGt1WmZxV1l4V050bGN2VVBQaGlHWWhXRGVVeTdJd1lVOHhQczlnOHRiN2ZhVW42cGFjVGVyVHhtOW9PQnZWcTN2OXo5MjdheW51SWQ0NExpV0tObmpoQVhGMlVZaFJnNTE2cXBzcnlqTHIyMTY2NXpGTFNUYUs5VTJHT0E4N1N3cVkzN2tuUlUrQnpPemFnczBzMU95citCS002c3h3UDZ0U0RQTE1lbjZ2eTBydmRtM1N4bHU3Sy9TN1dERHJGVURVVHhnblRVODI2ZVhXN0tseG1xUXV3REJYVUtjRCsxWGVlL3dYdUtYNVhER1dMYXBTVmNPeWhFTS9zZUovVitXbmplR3g0cFBWK1drbTZrS1psRmF5M0psdDdpRnBZWlk4QVNWSzZEanREREEwZjhBMFRsMzQwLzFmOE5keDh4SlZXWEIwS2JrdEZGcE56ZFZYQUMvcU93QTBDUW5pMmZsck8zVndibTVsbkkyVEt4YkRpclgvd0JFNWQrTmNmVi93VlI3eFpQYTVVOXV0dkk4bldobWJidzBZRUFZWUFWeGZoZnk1cmxLUjRGdWx1Nlg3bVcxbXpUOFM0WWlzLzVDUGxibnFKOWRTV2Z1OU9WdWVvbjExbVp2UTJpN1hwQ2hLS3Rla0toQmxOSjdSK1U4OWJEZkdUYjNhM1pYMExjajZrZFkrVDJqOHA1NjAyODhtMWtXUXI2TUoreWxTQXIrMmNuVjVyZW5qczNIMWxvWCszajlYdmJidHhMTjlscVc0VW5WNWpkbmp0WEh4aWh0eVpOamVTQnU1SjlrMUJKZTd4eTdXNUNKL3dDenVEL21UVlRmMitmcTk3TEp1THJQc05SdWVTN1c2YUovMzh4K3ZMVlh1WSt4dkhhTnhiZjJHb0NlemY4QTM2ai9BUHNTZjh3MXNMbnFjelRlZkpsdVlvTG01dW81RjYxc0JzaEl0UDFjTkZZZTFmOEEzaXIvQVBmRS93Q1pVZTliQjk0cjVqd3VQc3JRRmhtRzRsL1oyTTE3SGRXOTB0dXUzSWtUSGFDaldkSXcwVlZaZGtzOS9DMDZ5SkZFcDJkcCtFMWJicXliR1RaOHZwUUQ3TDFYUnY4QTdibFQ5Nk9kYTd0cE51dU5FMzdDcTlLU2lzanl1VW94clN0S2xsSGJMbFdUWHNNczhjaHVTdXdFUERxd29MZTV5K1lSRS9nTHptcVJla3ZLS3RkNDMyN3lNL3VsSHhtckhKU3R5U1dWUnlyanhLSTJYQy9DVGxubFBQS1RwVGRGYlAwTDFiZ3JmNUxwMEczZFBoUUh3VjBTMWx6QnNuczNzRVNSOENyaDlXQUpHalNPS3VVM0UremRaUTNvSmg4SUFyZFpYRkRtT1RwSGEzaTIrWXJJMkt0S3k0cmljQnNCdUhIZ0ZYU280NDArV2EycXF4anZNOXVNb3krV3Z6V3BMQ1dXV0UyOEh4TDZlNDNvamdrZVNDQlkxUmk1QkdJVURUNTFjbDN2bTI3NkJCcVNFSDRXYnhWMHRsa3lYSmN4VE1iK09XNnVZOW1HSHJDekRRd3dBYlRwMnVLdVRaOU4xdVlzZlJSUjhXUGhybTQxOW1TU2pSeWlxeFZLN3kyM0IvZnR1VG0yb1NkSnl6TlZ3M0JGbjd2VGxibnFGOWRTMmZ1OU9WdWVvbjExbFp1UTJpTGRzR0ZEMDVIMmROUUdWMG50RzVUejFkV205TjFiMmtWcThFVndzSTJVYVFhUU9LaG1pdFpHTE9tazY4RGhTRnZZK2dmV05TQWc3ejNRdm83eUtDS0lvaGlhTlI1TEt4eDhxcHh2amNxUzBWcGJ4dndPQWNSUVBaN0QwRzlZMHV6MkhvSDFqVUNwTFk3elhscGJtM2VLTzVRdXpqckJxWmppM3gxN1B2TmN5VDI4OFZ2REJKYk1XVW92UzJoc2xXN21GUTluc1BRUHJHbDJldzlBK3NhQ29kL1dOeHRiWXNyZmIxN1dCeHg1ZGREMjI4MXhDODhrbHZEY1NYRW5XdXpycU9HR0M5elJVUFo3RDBHOVkwdXpXSG9IMWpRVkNMcmVxNm50WmJhTzNpdDFtR3k3UmpUczFYMm1ZeTIwWmlDcThaT09EY2RFZG1zUFFiMWpTN1BZZWdmV05kSnVMcW5RaVNVbFJxcEZMbXJ5eHRIMU1hN1F3MmdOTlBPZFN0MG9JMjdwMDA3czloNkI5WTB1ejJIb0gxalhYM1orSTQrMWI4SUpkWDg5eExIS1FGTVhRVWFocHhvaVBONVArb25mVStBMC9zOWg2RGVzYVhaN0QwRDZ4cEc3T0xiVXR1MFN0VzVKSngyYkJzbWJ0aVNpRWsrY3hvQ1dXU2FWcFpPazJ2RFZvMFZZZG5zUFFiMWpTTnZaY0NIMWpTZDJjK3AxWEFtRnFFT21PUEVmYUgrQlFkMXVlbzIxMUl6cmdGVVlLTkFBcUkxV3p0Q3BVcVZDUlVxVktnRlNwVXFBVktsU29CVXFWS2dGU3BVcUFWS2xTb0JVcVZLZ0ZTcFVxQVZLbFNvRC85az1cIixcclxuXHJcbiAgICAgICAgbG9hZGVyVGV4dDogXCLmraPlnKjovb3lhaUuLi4gXCIsXHJcblxyXG4gICAgICAgIGxvYWRlckZvbnQ6IFwiQXJpYWxcIixcclxuXHJcbiAgICAgICAgLyoqIEBvdmVycmlkZSAqL1xyXG4gICAgICAgIGxpc3ROb3RpZmljYXRpb25JbnRlcmVzdHM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgIGNvbnN0YW50cy5TQ0VORV9BQ1RJT05cclxuICAgICAgICAgICAgXTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKiogQG92ZXJyaWRlICovXHJcbiAgICAgICAgaGFuZGxlTm90aWZpY2F0aW9uOiBmdW5jdGlvbiAobm90aWZpY2F0aW9uKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAobm90aWZpY2F0aW9uLmdldE5hbWUoKSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBjb25zdGFudHMuU0NFTkVfQUNUSU9OOlxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZyhub3RpZmljYXRpb24uZ2V0Qm9keSgpLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2aWV3TWVkaWF0b3IgPSB0aGlzLmZhY2FkZS5yZXRyaWV2ZU1lZGlhdG9yKG5vdGlmaWNhdGlvbi5nZXRCb2R5KCkubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZpZXdNZWRpYXRvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFZpZXcodmlld01lZGlhdG9yKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9pbml0aWFsaXplZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKiogQG92ZXJyaWRlICovXHJcbiAgICAgICAgb25SZWdpc3RlcjogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKiogQG92ZXJyaWRlICovXHJcbiAgICAgICAgb25SZW1vdmU6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2V0VmlldzogZnVuY3Rpb24gKHZpZXdNZWRpYXRvcikge1xyXG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBzZWxmLnZpZXdDb21wb25lbnQgPSBuZXcgY2MuU2NlbmUoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciByZXMgPSB2aWV3TWVkaWF0b3IuZ2V0UmVzb3VyY2UoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBoYW5kbGVTY2VuZUNoYW5nZWQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmlld01lZGlhdG9yLmluaXQoKTtcclxuICAgICAgICAgICAgICAgIHZhciBjaGlsZCA9IHZpZXdNZWRpYXRvci5nZXRWaWV3Q29tcG9uZW50KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnZpZXdDb21wb25lbnQuYWRkQ2hpbGQoY2hpbGQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHNlbGYuc2VuZE5vdGlmaWNhdGlvbihjb25zdGFudHMuTk9USUZJQ0FUSU9OLlNDRU5FX0NIQU5HRUQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5Mb2FkZXJTY2VuZS5wcmVsb2FkKHJlcywgaGFuZGxlU2NlbmVDaGFuZ2VkLCB0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZVNjZW5lQ2hhbmdlZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vIFNUQVRJQyBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgTkFNRTogJ1NjZW5lTWVkaWF0b3InLFxyXG4gICAgICAgIFNDRU5FX0NIQU5HRV9WSUVXOiAnU2NlbmVDaGFuZ2VWaWV3J1xyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBBcnRodXIgb24gMjAxNC8xMi8yMC5cclxuICovXHJcbnZhciBwdXJlbXZjID0gcmVxdWlyZSgncHVyZW12YycpLnB1cmVtdmM7XHJcbnZhciBjb25zdGFudHMgPSByZXF1aXJlKCcuLi8uLi9hcHBDb25zdGFudHMuanMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ2ZpZ2h0ZXIudmlldy5tZWRpYXRvci5UcmFpbk1lZGlhdG9yJyxcclxuICAgICAgICBwYXJlbnQ6IHB1cmVtdmMuTWVkaWF0b3JcclxuICAgIH0sXHJcblxyXG4gICAgLy8gaW5zdGFuY2UgbWVtYmVyc1xyXG4gICAge1xyXG4gICAgICAgIC8qKiBAb3ZlcnJpZGUgKi9cclxuICAgICAgICBsaXN0Tm90aWZpY2F0aW9uSW50ZXJlc3RzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKiBAb3ZlcnJpZGUgKi9cclxuICAgICAgICBoYW5kbGVOb3RpZmljYXRpb246IGZ1bmN0aW9uKG5vdGUpIHtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqIEBvdmVycmlkZSAqL1xyXG4gICAgICAgIG9uUmVnaXN0ZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKiogQG92ZXJyaWRlICovXHJcbiAgICAgICAgb25SZW1vdmU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgVHJhaW5MYXllciA9IHJlcXVpcmUoJy4vLi4vY29tcG9uZW50L3RyYWluTGF5ZXIuanMnKTtcclxuICAgICAgICAgICAgc2VsZi52aWV3Q29tcG9uZW50ID0gbmV3IFRyYWluTGF5ZXIoKTtcclxuXHJcbiAgICAgICAgICAgIHNlbGYudmlld0NvbXBvbmVudC5pbml0KCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ2V0UmVzb3VyY2U6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBzdGF0aWMgbWVtYmVyc1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6ICdUcmFpbk1lZGlhdG9yJ1xyXG4gICAgfVxyXG4pIl19
