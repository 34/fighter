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
},{}],"F:\\cocos\\fighter\\node_modules\\underscore\\underscore.js":[function(require,module,exports){
//     Underscore.js 1.7.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.7.0';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var createCallback = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  _.iteratee = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return createCallback(value, context, argCount);
    if (_.isObject(value)) return _.matches(value);
    return _.property(value);
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    if (obj == null) return obj;
    iteratee = createCallback(iteratee, context);
    var i, length = obj.length;
    if (length === +length) {
      for (i = 0; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    if (obj == null) return [];
    iteratee = _.iteratee(iteratee, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length),
        currentKey;
    for (var index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = function(obj, iteratee, memo, context) {
    if (obj == null) obj = [];
    iteratee = createCallback(iteratee, context, 4);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index = 0, currentKey;
    if (arguments.length < 3) {
      if (!length) throw new TypeError(reduceError);
      memo = obj[keys ? keys[index++] : index++];
    }
    for (; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      memo = iteratee(memo, obj[currentKey], currentKey, obj);
    }
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = function(obj, iteratee, memo, context) {
    if (obj == null) obj = [];
    iteratee = createCallback(iteratee, context, 4);
    var keys = obj.length !== + obj.length && _.keys(obj),
        index = (keys || obj).length,
        currentKey;
    if (arguments.length < 3) {
      if (!index) throw new TypeError(reduceError);
      memo = obj[keys ? keys[--index] : --index];
    }
    while (index--) {
      currentKey = keys ? keys[index] : index;
      memo = iteratee(memo, obj[currentKey], currentKey, obj);
    }
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var result;
    predicate = _.iteratee(predicate, context);
    _.some(obj, function(value, index, list) {
      if (predicate(value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    if (obj == null) return results;
    predicate = _.iteratee(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(_.iteratee(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    if (obj == null) return true;
    predicate = _.iteratee(predicate, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index, currentKey;
    for (index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    if (obj == null) return false;
    predicate = _.iteratee(predicate, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index, currentKey;
    for (index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (obj.length !== +obj.length) obj = _.values(obj);
    return _.indexOf(obj, target) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matches(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matches(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = obj.length === +obj.length ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = _.iteratee(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = obj.length === +obj.length ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = _.iteratee(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = obj && obj.length === +obj.length ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (obj.length !== +obj.length) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = _.iteratee(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = _.iteratee(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = _.iteratee(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = low + high >>> 1;
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return obj.length === +obj.length ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = _.iteratee(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    if (n < 0) return [];
    return slice.call(array, 0, n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return slice.call(array, Math.max(array.length - n, 0));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, output) {
    if (shallow && _.every(input, _.isArray)) {
      return concat.apply(output, input);
    }
    for (var i = 0, length = input.length; i < length; i++) {
      var value = input[i];
      if (!_.isArray(value) && !_.isArguments(value)) {
        if (!strict) output.push(value);
      } else if (shallow) {
        push.apply(output, value);
      } else {
        flatten(value, shallow, strict, output);
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (array == null) return [];
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = _.iteratee(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = array.length; i < length; i++) {
      var value = array[i];
      if (isSorted) {
        if (!i || seen !== value) result.push(value);
        seen = value;
      } else if (iteratee) {
        var computed = iteratee(value, i, array);
        if (_.indexOf(seen, computed) < 0) {
          seen.push(computed);
          result.push(value);
        }
      } else if (_.indexOf(result, value) < 0) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true, []));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    if (array == null) return [];
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = array.length; i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(slice.call(arguments, 1), true, true, []);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function(array) {
    if (array == null) return [];
    var length = _.max(arguments, 'length').length;
    var results = Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(arguments, i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, length = list.length; i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, length = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = isSorted < 0 ? Math.max(0, length + isSorted) : isSorted;
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    for (; i < length; i++) if (array[i] === item) return i;
    return -1;
  };

  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var idx = array.length;
    if (typeof from == 'number') {
      idx = from < 0 ? idx + from + 1 : Math.min(idx, from + 1);
    }
    while (--idx >= 0) if (array[idx] === item) return idx;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var Ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    args = slice.call(arguments, 2);
    bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      Ctor.prototype = func.prototype;
      var self = new Ctor;
      Ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (_.isObject(result)) return result;
      return self;
    };
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    return function() {
      var position = 0;
      var args = boundArgs.slice();
      for (var i = 0, length = args.length; i < length; i++) {
        if (args[i] === _) args[i] = arguments[position++];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return func.apply(this, args);
    };
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error('bindAll must be passed function names');
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = hasher ? hasher.apply(this, arguments) : key;
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last > 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed before being called N times.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      } else {
        func = null;
      }
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    if (!_.isObject(obj)) return obj;
    var source, prop;
    for (var i = 1, length = arguments.length; i < length; i++) {
      source = arguments[i];
      for (prop in source) {
        if (hasOwnProperty.call(source, prop)) {
            obj[prop] = source[prop];
        }
      }
    }
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj, iteratee, context) {
    var result = {}, key;
    if (obj == null) return result;
    if (_.isFunction(iteratee)) {
      iteratee = createCallback(iteratee, context);
      for (key in obj) {
        var value = obj[key];
        if (iteratee(value, key, obj)) result[key] = value;
      }
    } else {
      var keys = concat.apply([], slice.call(arguments, 1));
      obj = new Object(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        key = keys[i];
        if (key in obj) result[key] = obj[key];
      }
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(concat.apply([], slice.call(arguments, 1)), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    if (!_.isObject(obj)) return obj;
    for (var i = 1, length = arguments.length; i < length; i++) {
      var source = arguments[i];
      for (var prop in source) {
        if (obj[prop] === void 0) obj[prop] = source[prop];
      }
    }
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (
      aCtor !== bCtor &&
      // Handle Object.create(x) cases
      'constructor' in a && 'constructor' in b &&
      !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
        _.isFunction(bCtor) && bCtor instanceof bCtor)
    ) {
      return false;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size, result;
    // Recursively compare objects and arrays.
    if (className === '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size === b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      size = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      result = _.keys(b).length === size;
      if (result) {
        while (size--) {
          // Deep compare each member
          key = keys[size];
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj) || _.isArguments(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around an IE 11 bug.
  if (typeof /./ !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = function(key) {
    return function(obj) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of `key:value` pairs.
  _.matches = function(attrs) {
    var pairs = _.pairs(attrs), length = pairs.length;
    return function(obj) {
      if (obj == null) return !length;
      obj = new Object(obj);
      for (var i = 0; i < length; i++) {
        var pair = pairs[i], key = pair[0];
        if (pair[1] !== obj[key] || !(key in obj)) return false;
      }
      return true;
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = createCallback(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

   // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return _.isFunction(value) ? object[property]() : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}.call(this));

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
var constants = module.exports = {
    APP_NAME: "fighter",

    CUSTOM_NOTICICATION: 'custom_notification',
    CONFIRM_DIALOG: 'confirm_dialog',

    NOTIFICATION: {
        STARTUP: 'startup',
        SCENE_CHANGED: 'scene_changed',
        SCENE_HOME: 'scene_home'
    },

    SCENE_ACTION: 'scene_action',
    SCENE_ACTION_ADD_CHILD: 'scene_action_add_child',
    SCENE: {
        HOME: 'HomeMediator',
        TRAIN: 'TrainMediator',
        LOVE: "LoveMediator",
        FIGHT: "FightMediator"
    },

    TASK_STATUS : {
        STOP: 1,
        START: 2,
        FINISH: 3
    },

    PLAYER_ACTION: 'player_action',

    TASK_ACTION: 'task_action',
    TASK_ACTION_MONITOR: 'task_action_monitor',
    TASK_ACTION_START: 'task_action_start',
    TASK_ACTION_STOP: 'task_action_stop',
    TASK_ACTION_FINISHED: 'task_action_finished',

    LOVE_ACTION: 'love_action'
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

            var self = this;
            cc.eventManager.addCustomListener(constants.CUSTOM_NOTICICATION, function(event){
                var userData = event.getUserData();
                self.sendNotification(
                    userData.name,
                    userData.data,
                    userData.type
                );
            });
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

            this.facade.sendNotification(constants.TASK_ACTION_MONITOR);
        }
    }
);



},{"../../appConstants.js":"F:\\cocos\\fighter\\src\\appConstants.js","puremvc":"F:\\cocos\\fighter\\node_modules\\puremvc\\index.js"}],"F:\\cocos\\fighter\\src\\controller\\command\\playerCommand.js":[function(require,module,exports){
/**
 * Created by Arthur on 2015/1/1.
 */
var puremvc = require('puremvc').puremvc;
var constants = require('../../appConstants.js');
var PlayerProxyName = require('../../model/proxy/playerProxy.js').NAME;

module.exports = puremvc.define({
        name: 'fighter.controller.command.PlayerCommand',
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

            var playerProxy = this.facade.retrieveProxy(PlayerProxyName);

            switch(note.getName()) {
                case constants.PLAYER_ACTION:
                    playerProxy.updatePlayer(note.getBody());

                    if (note.getType() == constants.TASK_ACTION_FINISHED) {
                        playerProxy.updatePlayerByTask(note.getBody());
                    }
                    break;
                case constants.LOVE_ACTION:
                    playerProxy.updatePlayerByLove(note.getBody());
                    break;
            }
        }
    }
);
},{"../../appConstants.js":"F:\\cocos\\fighter\\src\\appConstants.js","../../model/proxy/playerProxy.js":"F:\\cocos\\fighter\\src\\model\\proxy\\playerProxy.js","puremvc":"F:\\cocos\\fighter\\node_modules\\puremvc\\index.js"}],"F:\\cocos\\fighter\\src\\controller\\command\\prepControllerCommand.js":[function(require,module,exports){
/**
 * Created by Arthur on 2014/12/14.
 */
var puremvc = require('puremvc').puremvc;
var constants = require('../../appConstants.js');
var PlayerCommand = require('./playerCommand.js');
var TaskCommand = require('./taskCommand.js');
var TaskMonitorCommand = require('./taskMonitorCommand.js');

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
            this.facade.registerCommand(constants.PLAYER_ACTION, PlayerCommand);
            this.facade.registerCommand(constants.LOVE_ACTION, PlayerCommand);
            this.facade.registerCommand(constants.TASK_ACTION, TaskCommand);
            this.facade.registerCommand(constants.TASK_ACTION_MONITOR, TaskMonitorCommand);
        }
    }
);
},{"../../appConstants.js":"F:\\cocos\\fighter\\src\\appConstants.js","./playerCommand.js":"F:\\cocos\\fighter\\src\\controller\\command\\playerCommand.js","./taskCommand.js":"F:\\cocos\\fighter\\src\\controller\\command\\taskCommand.js","./taskMonitorCommand.js":"F:\\cocos\\fighter\\src\\controller\\command\\taskMonitorCommand.js","puremvc":"F:\\cocos\\fighter\\node_modules\\puremvc\\index.js"}],"F:\\cocos\\fighter\\src\\controller\\command\\prepModelCommand.js":[function(require,module,exports){
/**
 * Created by Arthur on 2014/12/14.
 */
var puremvc = require('puremvc').puremvc;
var PlayerProxy = require('../../model/proxy/playerProxy.js');
var TaskProxy = require('../../model/proxy/taskProxy.js');

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
            this.facade.registerProxy(new TaskProxy());
        }
    }
);

},{"../../model/proxy/playerProxy.js":"F:\\cocos\\fighter\\src\\model\\proxy\\playerProxy.js","../../model/proxy/taskProxy.js":"F:\\cocos\\fighter\\src\\model\\proxy\\taskProxy.js","puremvc":"F:\\cocos\\fighter\\node_modules\\puremvc\\index.js"}],"F:\\cocos\\fighter\\src\\controller\\command\\prepViewCommand.js":[function(require,module,exports){
/**
 * Created by Arthur on 2014/12/14.
 */
var puremvc = require('puremvc').puremvc;
var DirectorMediator = require('../../view/mediator/directorMediator.js');
var HomeMediator = require('../../view/mediator/homeMediator.js');
var SceneMediator = require('../../view/mediator/sceneMediator.js');
var TrainMediator = require('../../view/mediator/trainMediator.js');
var LoveMediator = require('../../view/mediator/loveMediator.js');
var FightMediator = require('../../view/mediator/fightMediator.js');

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
            this.facade.registerMediator(new LoveMediator());
            this.facade.registerMediator(new FightMediator());
        }
    }
);

},{"../../view/mediator/directorMediator.js":"F:\\cocos\\fighter\\src\\view\\mediator\\directorMediator.js","../../view/mediator/fightMediator.js":"F:\\cocos\\fighter\\src\\view\\mediator\\fightMediator.js","../../view/mediator/homeMediator.js":"F:\\cocos\\fighter\\src\\view\\mediator\\homeMediator.js","../../view/mediator/loveMediator.js":"F:\\cocos\\fighter\\src\\view\\mediator\\loveMediator.js","../../view/mediator/sceneMediator.js":"F:\\cocos\\fighter\\src\\view\\mediator\\sceneMediator.js","../../view/mediator/trainMediator.js":"F:\\cocos\\fighter\\src\\view\\mediator\\trainMediator.js","puremvc":"F:\\cocos\\fighter\\node_modules\\puremvc\\index.js"}],"F:\\cocos\\fighter\\src\\controller\\command\\taskCommand.js":[function(require,module,exports){
/**
 * Created by Arthur on 2015/1/1.
 */
var puremvc = require('puremvc').puremvc;
var constants = require('../../appConstants.js');
var TaskProxyName = require('../../model/proxy/taskProxy.js').NAME;

module.exports = puremvc.define({
        name: 'fighter.controller.command.TaskCommand',
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
            cc.log('TaskCommand execute', note.toString());

            var taskProxy = this.facade.retrieveProxy(TaskProxyName);

            switch(note.getType()) {
                case constants.TASK_ACTION_START:
                    taskProxy.startTask(note.getBody());
                    break;
                case constants.TASK_ACTION_FINISHED:
                    taskProxy.finishTask(note.getBody());

                    break;
            }
        }
    }
);
},{"../../appConstants.js":"F:\\cocos\\fighter\\src\\appConstants.js","../../model/proxy/taskProxy.js":"F:\\cocos\\fighter\\src\\model\\proxy\\taskProxy.js","puremvc":"F:\\cocos\\fighter\\node_modules\\puremvc\\index.js"}],"F:\\cocos\\fighter\\src\\controller\\command\\taskMonitorCommand.js":[function(require,module,exports){
/**
 * Created by Arthur on 2015/1/1.
 */
var puremvc = require('puremvc').puremvc;
var constants = require('../../appConstants.js');
var TaskProxyName = require('../../model/proxy/taskProxy.js').NAME;
var _ = require('underscore');

module.exports = puremvc.define({
        name: 'fighter.controller.command.TaskMonitorCommand',
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
            cc.log('TaskMonitorCommand execute', note.toString());

            cc.Director.sharedDirector.getScheduler()
                .scheduleCallbackForTarget(this, this.checkTaskStatus, 1, cc.REPEAT_FOREVER, 0, false);
        },

        checkTaskStatus: function() {
            cc.log('task monitor');
            var taskProxy = this.facade.retrieveProxy(TaskProxyName);
            var taskList = taskProxy.getData();
            var filtered = _.values(taskList).filter(function(task) {
                return task.get('status') == constants.TASK_STATUS.START;
            });

            for(var i = 0; i < filtered.length; i++) {
                var t = filtered[i];
                if (t.isFinished()) {
                    this.facade.sendNotification(
                        constants.TASK_ACTION,
                        t,
                        constants.TASK_ACTION_FINISHED
                    );
                    this.facade.sendNotification(
                        constants.PLAYER_ACTION,
                        t,
                        constants.TASK_ACTION_FINISHED
                    );
                }
            }
        }
    }
);
},{"../../appConstants.js":"F:\\cocos\\fighter\\src\\appConstants.js","../../model/proxy/taskProxy.js":"F:\\cocos\\fighter\\src\\model\\proxy\\taskProxy.js","puremvc":"F:\\cocos\\fighter\\node_modules\\puremvc\\index.js","underscore":"F:\\cocos\\fighter\\node_modules\\underscore\\underscore.js"}],"F:\\cocos\\fighter\\src\\model\\entity\\entity.js":[function(require,module,exports){
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
    ctor: function() {
        this._data = {};
        this.init.apply(this, arguments);
    },

    init: function() {

    },

    save: function() {
        if (this._key) {
            cc.sys.localStorage.setItem(this._key, JSON.stringify(this._data));
        }
    },

    fetch: function() {
        if (this._key) {
            var data = cc.sys.localStorage.getItem(this._key);

            if (!data) {
                return false;
            }

            try{
                var attrs = JSON.parse(data);
                this.sets(attrs);
                return true;
            } catch(e) {
                cc.error('can not parse entity data: ', data);
            }
        }
        return false;
    },

    create: function() {

    },

    getData: function() {
        return this._data;
    },

	set: function (name, value) {
		if (typeof value != "undefined") {
			if (this._data[name] !== value) {
				this._data[name] = value;
			}

			this.emit(name + ".change", value);
		}
	},

	sets: function (attrs) {
		var key;

		for (key in attrs) {
			this.set(key, attrs[key]);
		}
	},

	get: function (name) {
		return this._data[name];
	},

    add: function(name, value) {
        var val = this.get(name);
        this.set(name, value + val);
    },

	has: function (name) {
		return (typeof (this._data[name]) != "undefined");
	},

	schedule: function (fn, interval, repeat, delay) {
		interval = interval || 0;
		repeat = (repeat == null) ? cc.REPEAT_FOREVER : repeat;
		delay = delay || 0;

		cc.Director.sharedDirector.getScheduler().scheduleCallbackForTarget(this, fn, interval, repeat, delay, false);
	},

	scheduleOnce: function (fn, delay) {
		this.schedule(fn, 0.0, 0, delay);
	},

	unschedule: function (fn) {
		// explicit nil handling
		cc.Director.sharedDirector.getScheduler().unscheduleCallbackForTarget(this, fn);
	},

	unscheduleAllCallbacks: function () {
		cc.Director.sharedDirector.getScheduler().unscheduleAllCallbacksForTarget(this);
	}
});

},{"../../util/event.js":"F:\\cocos\\fighter\\src\\util\\event.js"}],"F:\\cocos\\fighter\\src\\model\\entity\\player.js":[function(require,module,exports){
var Entity = require('./entity.js');

var Player = module.exports = Entity.extend({
    ctor: function() {
        this._key = 'PlayerEntity';
        this._name = 'PlayerEntity';
        this._super.apply(this, arguments);

        this.on('loveCount.change', function(count) {

        });
    },

    init: function() {
        var isInited = this.fetch();
        if (!isInited) {
            this.create();
        }
    },

    create: function(name) {
        this.sets(Player.DEFAULT_DATA);
        this.set('name', name);
        this.save();
    },

    reduceDaiyCount: function(name, count) {
        var dc = this.get('dailyCount');
        if (typeof dc[name] != 'undefined' && dc[name] > 0) {
            dc[name] = Math.max(0, dc[name] - count);
        }
    }
});

Player.LoveCountMap = {
    1: 99,
    2: 499,
    3: 1999,
    4: 4999,
    5: 9999
};

Player.DEFAULT_DATA = {
    gold: 100,
    hp: 101,
    atk: 102,
    defence: 103,
    undefence: 104,
    crit: 5,
    uncrit: 5,
    dodge: 5,
    hit: 5,

    loveLv: 1,
    loveCount: 0,

    dailyCount: {
        freeLove: 90
    }
};
},{"./entity.js":"F:\\cocos\\fighter\\src\\model\\entity\\entity.js"}],"F:\\cocos\\fighter\\src\\model\\entity\\task.js":[function(require,module,exports){
var Entity = require('./entity.js');
var constants = require('../../appConstants.js');
var _ = require('underscore');

var Task = module.exports = Entity.extend({
    ctor: function (data) {
        this._name = "TaskEntity";
        this._key = "task";

        this._super(data);
    },

    init: function(data) {
        this._key = this._key + '.' + data.id;
        if (!this.fetch()) {
            this.create(data);
        }
    },

    create: function(data) {
        this.sets(data);
        this.save();
    },

    start: function (count) {
        this.sets({
            status: constants.TASK_STATUS.START,
            startTime: new Date().getTime(),
            totalCount: count || this._totalCount
        });
        this.save();
    },

    finish: function() {
        this.sets({
            status: constants.TASK_STATUS.FINISH
        });
        this.save();
    },

    isStarted: function() {
        return this.get('status') == constants.TASK_STATUS.START;
    },

    isFinished: function() {
        return this.timeLeft() <= 0;
    },

    timeLeft: function() {
        return (this.get('startTime') + this.get('totalCount') * this.get('timePerCount'))
            - new Date().getTime();
    },

    timeLeftStr: function() {
        var time = this.timeLeft();
        return (time/1000/60).toFixed(2) + '分钟后';
    },

    totalObtain: function() {
        return this.get('obtainPerCount') * this.get('totalCount');
    }
});

},{"../../appConstants.js":"F:\\cocos\\fighter\\src\\appConstants.js","./entity.js":"F:\\cocos\\fighter\\src\\model\\entity\\entity.js","underscore":"F:\\cocos\\fighter\\node_modules\\underscore\\underscore.js"}],"F:\\cocos\\fighter\\src\\model\\proxy\\playerProxy.js":[function(require,module,exports){
/**
 * Created by Arthur on 2014/12/26.
 */
var puremvc = require('puremvc').puremvc;
var Player = require('../entity/player.js');
var constants = require('../../appConstants.js');

var PlayerProxy = module.exports = puremvc.define({
        name: 'figther.model.proxy.PlayerProxy',
        parent: puremvc.Proxy,

        constructor: function() {
            puremvc.Proxy.call(this, this.constructor.NAME);
            this.init();
        }
    },

    {
        init: function() {
            var player = new Player();
            this.setData(player);
        },

        getPlayer: function() {
            if (this.data != null) {
                return this.data;
            }
        },

        updatePlayer: function(name, value) {
            if (this.data != null) {
                this.data.set(name, value);
            }
        },

        updatePlayerByTask: function(task) {
            this.data.add(task.get('attr'), task.totalObtain());
            this.data.save();
        },

        updatePlayerByLove: function(love) {
            this.data.add('loveCount', love.count);
            this.data.reduceDaiyCount('freeLove', love.count);
            this.data.add('gold', -love.gold);
            this.data.save();
            var loveCount = this.data.get('loveCount');
            var loveLv = this.data.get('loveLv');
            var needCount = Player.LoveCountMap[loveLv];
            if (needCount != null && needCount > 0) {
                if (loveCount >= needCount) {
                    this.data.add('loveLv', 1);
//                    this.facade.sendNotification(
//                        constants.PLAYER_ACTION
//                    );
                }
            }
        },

        setName: function(name) {
            this.data.set('name', name);
        }
    },

    {
        NAME: 'PlayerProxy'
    }
);
},{"../../appConstants.js":"F:\\cocos\\fighter\\src\\appConstants.js","../entity/player.js":"F:\\cocos\\fighter\\src\\model\\entity\\player.js","puremvc":"F:\\cocos\\fighter\\node_modules\\puremvc\\index.js"}],"F:\\cocos\\fighter\\src\\model\\proxy\\taskProxy.js":[function(require,module,exports){
/**
 * Created by Arthur on 2015/1/2.
 */
var puremvc = require('puremvc').puremvc;
var Task = require('../entity/task.js');
var constants = require('../../appConstants.js');

var TaskProxy;
TaskProxy = module.exports = puremvc.define({
        name: 'figther.model.proxy.TaskProxy',
        parent: puremvc.Proxy,

        constructor: function () {
            puremvc.Proxy.call(this, this.constructor.NAME);
            this.init();
        }
    },

    {
        init: function () {
            var data = {};
            TaskProxy.Tasks.forEach(function(t) {
                data[t.id] = new Task(t);
            });

            this.setData(data);
        },

        startTask: function(task) {
            this.getData()[task.get('id')].start(task.get('count'));
        },

        finishTask: function(task) {
            this.getData()[task.get('id')].finish();
        },

        getTask: function(id) {
            return this.getDate()[id];
        },

        setTask: function(task) {
            return this.getData()[task.id] = task;
        },

        updateTask: function(task) {
            this.setTask(task).save();
        }
    },

    {
        NAME: 'TaskProxy'
    }
);

TaskProxy.Tasks = [
    {
        id: 1,
        name: '生命',
        attr: 'hp',
        startTime: 0,
        status: constants.TASK_STATUS.STOP,
        totalCount: 100,
        timePerCount: 100,//毫秒
        consumePerCount: 1,
        obtainPerCount: 20
    },
    {
        id: 2,
        name: '攻击',
        attr: 'atk',
        startTime: 0,
        status: constants.TASK_STATUS.STOP,
        totalCount: 100,
        timePerCount: 1000,
        consumePerCount: 1,
        obtainPerCount: 20
    },
    {
        id: 3,
        name: '防御',
        attr:'defence',
        startTime: 0,
        status: constants.TASK_STATUS.STOP,
        totalCount: 100,
        timePerCount: 10000,
        consumePerCount: 1,
        obtainPerCount: 20
    },
    {
        id: 4,
        name: '破防',
        startTime: 0,
        attr: 'undefence',
        status: constants.TASK_STATUS.STOP,
        totalCount: 100,
        timePerCount: 100000,
        consumePerCount: 1,
        obtainPerCount: 20
    },
    {
        id: 5,
        name: '暴击',
        attr: 'crit',
        startTime: 0,
        status: constants.TASK_STATUS.STOP,
        totalCount: 100,
        timePerCount: 100000,
        consumePerCount: 1,
        obtainPerCount: 20
    },
    {
        id: 6,
        name: '韧性',
        attr: 'uncrit',
        startTime: 0,
        status: constants.TASK_STATUS.STOP,
        totalCount: 100,
        timePerCount: 100000,
        consumePerCount: 1,
        obtainPerCount: 20
    },
    {
        id: 7,
        name: '闪避',
        attr: 'dodge',
        startTime: 0,
        status: constants.TASK_STATUS.STOP,
        totalCount: 100,
        timePerCount: 100000,
        consumePerCount: 1,
        obtainPerCount: 20
    },
    {
        id: 8,
        name: '命中',
        attr: 'hit',
        startTime: 0,
        status: constants.TASK_STATUS.STOP,
        totalCount: 100,
        timePerCount: 100000,
        consumePerCount: 1,
        obtainPerCount: 20
    }
];
},{"../../appConstants.js":"F:\\cocos\\fighter\\src\\appConstants.js","../entity/task.js":"F:\\cocos\\fighter\\src\\model\\entity\\task.js","puremvc":"F:\\cocos\\fighter\\node_modules\\puremvc\\index.js"}],"F:\\cocos\\fighter\\src\\resource.js":[function(require,module,exports){
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
    TrainNode: "res/TrainNode.csb",
    LoveLayer: "res/LoveLayer.csb",
    LoveItem: "res/LoveItem.csb",
    LoveConfirmNode: "res/LoveConfirmNode.csb",
    ConfirmNode: "res/ConfirmNode.csb",
    FightNode: "res/FightNode.csb"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}

module.exports.res = res;
module.exports.g_resouces = g_resources;
},{}],"F:\\cocos\\fighter\\src\\util\\event.js":[function(require,module,exports){
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

},{}],"F:\\cocos\\fighter\\src\\view\\component\\confirmDialog.js":[function(require,module,exports){
/**
 * Created by Arthur on 2015/1/8.
 */
var res = require('../../resource.js').res;
var constants = require('../../appConstants.js');

module.exports = cc.Layer.extend({
    _title: null,
    _desc: null,
    _onConfirm: null,

    ctor: function (title, desc, callback) {
        this._super();

        var node = this._rootNode = ccs.csLoader.createNode(res.ConfirmNode);
        this.addChild(node);
        var size = cc.winSize;
        node.attr({
            x: size.width/2,
            y: size.height/2,
            anchorX: 0.5,
            anchorY: 0.5,
            width: 450,
            height: 250
        });

        this._title = node.getChildByName('panel_bg').getChildByName('txt_title');
        this._desc = node.getChildByName('panel_bg').getChildByName('txt_desc');
        this._btn_cancel = node.getChildByName('panel_bg').getChildByName('btn_cancel');
        this._btn_ok = node.getChildByName('panel_bg').getChildByName('btn_ok');

        this._btn_cancel.addClickEventListener(this.close.bind(this));
        this._btn_ok.addClickEventListener(this.onOkListener.bind(this));

        if (title) {
            this._title.string = title;
        }
        if (desc) {
            this._desc.string = desc;
        }

        if (callback) {
            this._onConfirm = callback;
        }
        return true;
    },

    setTitle: function(title) {
        this._title.string = title;
    },

    setDesc: function(desc) {
        this._desc.string = desc;
    },

    setOkCallback: function(fn) {
        this._onConfirm = fn;
    },

    close: function() {
        this.removeFromParent();
    },

    onOkListener: function() {
        if (this._onConfirm) {
            this._onConfirm.call(this);
        } else {
            this.close();
        }
    }
});
},{"../../appConstants.js":"F:\\cocos\\fighter\\src\\appConstants.js","../../resource.js":"F:\\cocos\\fighter\\src\\resource.js"}],"F:\\cocos\\fighter\\src\\view\\component\\controller\\loveItem.js":[function(require,module,exports){
/**
 * Created by Arthur on 2014/12/29.
 */
var _ = require('underscore');

var LoveItemController = module.exports =  ccs.ComController.extend({
    ctor: function() {
        this._super();
        this._name = "LoveItemController";
        this._lv = 1;
        this._position = null;
    },

    init: function(options) {
        if (!options || _.isEmpty(options)) {
            options = LoveItemController.DEFAULT_OPTIONS;
        }

        this._options = options;
        return true;
    },

    onEnter: function() {
        this.getOwner().setPosition(this._options.position);

        var txt_value = this._txt_value = this.getOwner().getChildByName('txt_value');
        txt_value.attr({anchorX: 0, anchorY: 0.5});
        txt_value.setString('+' + this._options.value);

        var txt_count = this._txt_count = this.getOwner().getChildByName('txt_count');
        txt_count.attr({anchorX: 0, anchorY: 0.5});
        txt_count.setString(this._options.count + '/' + this._options.countNeed + '次');

        var txt_lv = this._txt_lv = this.getOwner().getChildByName('txt_lv');
        txt_lv.attr({anchorX: 0.5, anchorY: 0.5});
        txt_lv.setString(this._options.lv + '级');

        var btn_love = this._btn_love = this.getOwner().getChildByName('btn_love');
        btn_love.setTitleText('献吻');
        btn_love.addClickEventListener(this.loveListener.bind(this));

        var desc_bg = this.getOwner().getChildByName('desc_bg');
        desc_bg.attr({anchorX: 0.5, anchorY: 0});
    },

    loveListener: function() {
        this.getOwner().parent.parent.onLoveListener();
    }
});

LoveItemController.create = function(options) {
    var con = new LoveItemController();
    con.init(options);
    return con;
}

LoveItemController.DEFAULT_OPTIONS = {
    lv: 1,
    value: 1,
    count: 10,
    countNeed: 99,
    position: cc.p(0, 0)
};
},{"underscore":"F:\\cocos\\fighter\\node_modules\\underscore\\underscore.js"}],"F:\\cocos\\fighter\\src\\view\\component\\controller\\trainItem.js":[function(require,module,exports){
/**
 * Created by Arthur on 2014/12/29.
 */

var TrainItemController = module.exports =  ccs.ComController.extend({
    ctor: function() {
        this._super();
        this._name = 'TrainItemController';
        this.DEFAULT_COUNT = 100;
    },

    init: function(task, pos) {
        this._task = task;
        this._position = pos;
    },

    onEnter: function() {
        if (this._position) {
            this.getOwner().setPosition(this._position);
        }

        var btn_start = this._btn_start = this.getOwner().getChildByName('btn_start_task');
        btn_start.setTitleFontSize(20);
        btn_start.addClickEventListener(this.startListener.bind(this));

        var btn_add_count = this._btn_add_count = this.getOwner().getChildByName('btn_count_add');
        btn_add_count.addClickEventListener(this.addCoundListener.bind(this));

        this._count = this.getOwner().getChildByName('count_value');
        this._count.setString(this.DEFAULT_COUNT);
        this._count.attr({anchorX: 0, anchorY: 0.5});

        this._task_name = this.getOwner().getChildByName('task_name');
        this._task_name.attr({anchorX: 0, anchorY: 0.5});
        this._task_name.setString(this._task.get('name') + ': 每次+' + this._task.get('obtainPerCount'));

        var txt_task_desc = this._txt_task_desc = this.getOwner().getChildByName('txt_task_desc');
        txt_task_desc.attr({anchorX: 0, anchorY: 0.5});
        this.setTaskDesc();
    },

    startListener: function() {
        this._btn_start.setTitleText('进行中...');
        this._task.start(this.getCount());
        this.setTaskDesc();
        //this.getOwner().parent.parent.onStartTask(this._task);
    },

    setTaskButtonTitle: function() {
        if (this._task.isStarted() && !this._task.isFinished()) {
            this._btn_start.setTitleText('进行中...');
        } else {
            this._btn_start.setTitleText('开始任务');
        }
    },

    setTaskDesc: function() {
        if (this._task.isStarted() && !this._task.isFinished()) {
            this._txt_task_desc.setString(cc.formatStr(
                '任务进行中，将在%s之后完成！预计奖励:+%s',
                this._task.timeLeftStr(),
                this._task.totalObtain()
            ));
        } else {
            this._txt_task_desc.setString('执行任务可以增加相应的属性');
        }
        this.setTaskButtonTitle();
    },

    taskFinished: function() {
        this.setTaskDesc();
    },

    getCount: function() {
        return parseInt(this._count.getString());
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

},{}],"F:\\cocos\\fighter\\src\\view\\component\\fightLayer.js":[function(require,module,exports){
/**
 * Created by Arthur on 2015/1/10.
 */
var res = require('../../resource.js').res;

module.exports = cc.Layer.extend({
    ctor: function() {
        this._super();
        var rootNode = this._rootNode = ccs.csLoader.createNode(res.FightNode);
        this.addChild(rootNode);

        var panel = rootNode.getChildByName('panel');

        var btn_back = panel.getChildByName('btn_back');
        btn_back.addClickEventListener(this.onBackListener.bind(this));

        this._sv_city_list = panel.getChildByName('sv_city_list');
        this._sv_city_list.attr({anchorX: 0, anchorY: 0.5});

        this._panel_console = panel.getChildByName('panel_console');
        this._txt_province = panel.getChildByName('txt_province');

        return true;
    },

    init: function(items) {
        var data = stateData;
        this._updateProvince(data.province);

        var citys = data.citys;
        var city, i,
            menu = new cc.Menu();
        menu.x = 0;
        menu.y = 0;
        var height = this._sv_city_list.height;

        for(i = 0; i < citys.length; i++) {
            city = citys[i];
            menu.addChild(this._createItem(city.name, i, height/2));
        }
        this._sv_city_list.addChild(menu);
    },

    _createItem: function(name, i, y) {
        var menuItem = new cc.MenuItemImage(
            res.btn1_jpg,
            res.btn3_png,
            res.btn3_png,
            this._onClickCityListener.bind(this, name),
            this
        );
        menuItem.attr({x: 20 + i * (menuItem.width+20), y: y, anchorX: 0, anchorY: 0.5});
        if (i == 0)
            menuItem.setEnabled(false);

        var label = new cc.LabelTTF(name);
        label.fontSize = 28;
        label.fontColor = cc.color(27, 150, 2);
        label.attr({x: menuItem.width/2, y: menuItem.height/2, anchorX: 0.5, anchorY: 0.5});
        menuItem.addChild(label);
        this._sv_city_list.innerWidth = (menuItem.width + 20) * (i+1);
        cc.log( this._sv_city_list.innerWidth);
        return menuItem;
    },

    _onClickCityListener: function(name) {
        cc.log('click city: ', name);
    },

    _updateProvince: function(name) {
        this._txt_province.string = name;
    },

    onBackListener: function() {
        if (this.onBack) {
            this.onBack();
        }
    }
});

var stateData = {
    id: 1,
    province: '司州',
    citys: [
        {
            id: 1,
            name: '河东',
            hp: 5,
            atk: 50,
            defence: 10,
            undefence: 10,
            crit: 10,
            uncrit: 10,
            dodge: 10,
            hit: 10
        },
        {
            id: 1,
            name: '平阳',
            hp: 5,
            atk: 50,
            defence: 10,
            undefence: 10,
            crit: 10,
            uncrit: 10,
            dodge: 10,
            hit: 10
        },
        {
            id: 1,
            name: '河内',
            hp: 5,
            atk: 50,
            defence: 10,
            undefence: 10,
            crit: 10,
            uncrit: 10,
            dodge: 10,
            hit: 10
        },
        {
            id: 1,
            name: '弘农',
            hp: 5,
            atk: 50,
            defence: 10,
            undefence: 10,
            crit: 10,
            uncrit: 10,
            dodge: 10,
            hit: 10
        },
        {
            id: 1,
            name: '河南',
            hp: 5,
            atk: 50,
            defence: 10,
            undefence: 10,
            crit: 10,
            uncrit: 10,
            dodge: 10,
            hit: 10
        },
        {
            id: 1,
            name: '尹等',
            hp: 5,
            atk: 50,
            defence: 10,
            undefence: 10,
            crit: 10,
            uncrit: 10,
            dodge: 10,
            hit: 10
        },
        {
            id: 1,
            name: '四郡',
            hp: 5,
            atk: 50,
            defence: 10,
            undefence: 10,
            crit: 10,
            uncrit: 10,
            dodge: 10,
            hit: 10
        },
        {
            id: 1,
            name: '一尹',
            hp: 5,
            atk: 50,
            defence: 10,
            undefence: 10,
            crit: 10,
            uncrit: 10,
            dodge: 10,
            hit: 10
        },
        {
            id: 1,
            name: '四尹',
            hp: 5,
            atk: 50,
            defence: 10,
            undefence: 10,
            crit: 10,
            uncrit: 10,
            dodge: 10,
            hit: 10
        },
        {
            id: 1,
            name: '上音',
            hp: 5,
            atk: 50,
            defence: 10,
            undefence: 10,
            crit: 10,
            uncrit: 10,
            dodge: 10,
            hit: 10
        }
    ]

}
},{"../../resource.js":"F:\\cocos\\fighter\\src\\resource.js"}],"F:\\cocos\\fighter\\src\\view\\component\\homeLayer.js":[function(require,module,exports){
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
        this._player = player;
        this.update(player);

        var rootNode = this._rootNode;
        var btn_train = rootNode.getChildByName('main_panel').getChildByName('btn_train');
        btn_train.addClickEventListener(this.buttonTrainListener.bind(this));

        var btn_love = rootNode.getChildByName('main_panel').getChildByName('btn_love');
        btn_love.addClickEventListener(this.buttonLoveListener.bind(this));

        var btn_fight = rootNode.getChildByName('main_panel').getChildByName('btn_fight');
        btn_fight.addClickEventListener(this.buttonFightListener.bind(this));
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
        node.getChildByName('main_panel').getChildByName('txt_doget').setString(player.get('dodge'));
        node.getChildByName('main_panel').getChildByName('txt_hit').setString(player.get('hit'));
    },

    buttonTrainListener: function() {
        if (this.onTrain) {
            this.onTrain();
        }
    },

    buttonLoveListener: function() {
        if (this.onLove) {
            this.onLove();
        }
    },

    buttonFightListener: function() {
        if (this.onFight) {
            this.onFight();
        }
    },

    onTaskFinished: function(player) {
        this._player = player;
        this.update(player);
    }
});
},{"../../resource.js":"F:\\cocos\\fighter\\src\\resource.js"}],"F:\\cocos\\fighter\\src\\view\\component\\loveConfirmLayer.js":[function(require,module,exports){
/**
 * Created by Arthur on 2015/1/6.
 */
var res = require('../../resource.js').res;
var constants = require('../../appConstants.js');

module.exports = cc.Layer.extend({
    _count: 100,

    ctor: function(gold, freeCount) {
        this._super();
        this._gold = gold;
        this._freeCount = freeCount;

        var rootNode = this._rootNode = ccs.csLoader.createNode(res.LoveConfirmNode);
        this.addChild(rootNode);

        var wsize = cc.winSize;
        rootNode.attr({
            x: wsize.width/2,
            y: wsize.height/2,
            anchorX: 0.5,
            anchorY: 0.5,
            width: 450,
            height: 350
        });
        var panel = rootNode.getChildByName('panel');
        var btn_add = panel.getChildByName('btn_add');
        btn_add.addClickEventListener(this.onAddListener.bind(this));

        var btn_ok = panel.getChildByName('btn_ok');
        btn_ok.addClickEventListener(this.onOkListener.bind(this));

        var btn_cancel = panel.getChildByName('btn_cancel');
        btn_cancel.addClickEventListener(this.onCancelListener.bind(this));


        this._txt_desc = panel.getChildByName('txt_desc');
        this._txt_desc_str = this._txt_desc.getString();
        this._txt_count = panel.getChildByName('txt_count');
        this._txt_count_str = this._txt_count.getString();

        this.init(gold);
        return true;
    },

    init: function(gold) {
        this.updateCount(this._count, this._count - this._freeCount);
    },

    updateCount: function(count, gold) {
        this._txt_count.setString(cc.formatStr(this._txt_count_str, count));
        this._txt_desc.setString(cc.formatStr(this._txt_desc_str, count, gold))
    },

    onAddListener: function() {
        this._count += 1;
        this.updateCount(this._count, this._count - this._freeCount);
    },

    onOkListener: function() {
        if (this._gold > (this._count - this._freeCount)) {
            cc.eventManager.dispatchCustomEvent(
                constants.CUSTOM_NOTICICATION,
                {
                    name: constants.LOVE_ACTION,
                    data: {
                        count: this._count,
                        gold: this._count - this._freeCount
                    }
                }
            );
            this.removeFromParent();
        } else {
            cc.log('钻石不足，请到充值界面充值');
            cc.eventManager.dispatchCustomEvent(
                constants.CUSTOM_NOTICICATION,
                {
                    name: constants.CONFIRM_DIALOG,
                    data: {
                        desc: '你的钻石不足以执行此次献吻\n确定去充值吗？',
                        callback: function() {
                            cc.eventManager.dispatchCustomEvent(
                                constants.CUSTOM_NOTICICATION,
                                {
                                    name: constants.SCENE_ACTION,
                                    data: {
                                        name: constants.SCENE.HOME
                                    }
                                }
                            );
                        }
                    }
                }
            );
        }
    },

    onCancelListener: function() {
        this.removeFromParent();
    }
});
},{"../../appConstants.js":"F:\\cocos\\fighter\\src\\appConstants.js","../../resource.js":"F:\\cocos\\fighter\\src\\resource.js"}],"F:\\cocos\\fighter\\src\\view\\component\\loveLayer.js":[function(require,module,exports){
/**
 * Created by Arthur on 2014/12/29.
 */
var res = require('../../resource.js').res;
var LoveItemController = require('./controller/loveItem');

module.exports = cc.Layer.extend({
    ctor: function() {
        this._super();
        var rootNode = this._rootNode = ccs.csLoader.createNode(res.LoveLayer);
        this.addChild(rootNode);

        var btn_back = rootNode.getChildByName('btn_back');
        btn_back.addClickEventListener(this.onBackListener.bind(this));

        return true;
    },

    init: function(items) {
        var p = this._rootNode.getChildByName('desc_bg').getPosition();
        p.y = p.y - 133;
        var option, i;
        for(i = 0; i < items.length; i++) {
            option = items[i];
            option.position = cc.p(0, p.y - 85*i);

            var loveItem = ccs.csLoader.createNode(res.LoveItem);
            loveItem.addComponent(LoveItemController.create(option));
            this._rootNode.addChild(loveItem);
        }

        this._txt_desc = this._rootNode.getChildByName('txt_desc');
        this.updateLv(1);
    },

    updateLv: function(lv) {
        this._txt_desc.setString('当前虞姬之爱' + lv + '级, 每天前90次献吻免费');
    },

    onBackListener: function() {
        if (cc.isFunction(this.onBack)) {
            this.onBack();
        }
    },

    onLoveListener: function() {
        if (cc.isFunction(this.showLoveConfirm)){
            this.showLoveConfirm();
        }
    }


});
},{"../../resource.js":"F:\\cocos\\fighter\\src\\resource.js","./controller/loveItem":"F:\\cocos\\fighter\\src\\view\\component\\controller\\loveItem.js"}],"F:\\cocos\\fighter\\src\\view\\component\\trainLayer.js":[function(require,module,exports){
/**
 * Created by Arthur on 2014/12/21.
 */
var res = require('../../resource.js').res;
var TrainItemController = require('./controller/trainItem');

module.exports = cc.Layer.extend({
    ctor: function() {
        this._super();
        var trainNode = this._trainNode = ccs.csLoader.createNode(res.TrainNode);
        this.addChild(trainNode);

        var btn_back = trainNode.getChildByName('Panel_1').getChildByName('btn_back');
        btn_back.addClickEventListener(this.onBackListener.bind(this));

        return true;
    },

    init: function(taskList) {
        var size = cc.winSize;
        var baseY = size.height*84/100;
        var i = 0;
        for (var id in taskList) {
            var task = taskList[id];
            var y = baseY - 100*(i+1);
            var taskNode = ccs.csLoader.createNode(res.TaskNode);
            taskNode.addComponent(TrainItemController.create(task, cc.p(0, y)));
            this._trainNode.addChild(taskNode, 10, task.get('id'));
            i = i + 1;
        }
    },

    onBackListener: function() {
        if (this.onBack) {
            this.onBack();
        }
    },

    onStartTask: function(task) {
        if (this.onTask) {
            this.onTask(task);
        }
    },

    onTaskFinished: function(task) {
        var node = this._trainNode.getChildByTag(task.get('id'));
        var ctrl = node.getComponent('TrainItemController');
        if (ctrl) {
            ctrl.taskFinished();
        }
    }
});
},{"../../resource.js":"F:\\cocos\\fighter\\src\\resource.js","./controller/trainItem":"F:\\cocos\\fighter\\src\\view\\component\\controller\\trainItem.js"}],"F:\\cocos\\fighter\\src\\view\\mediator\\directorMediator.js":[function(require,module,exports){
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
                        cc.director.runScene(sceneMediator.getViewComponent());
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

},{"../../appConstants.js":"F:\\cocos\\fighter\\src\\appConstants.js","./sceneMediator.js":"F:\\cocos\\fighter\\src\\view\\mediator\\sceneMediator.js","puremvc":"F:\\cocos\\fighter\\node_modules\\puremvc\\index.js"}],"F:\\cocos\\fighter\\src\\view\\mediator\\fightMediator.js":[function(require,module,exports){
/**
 * Created by Arthur on 2015/1/10.
 */
var puremvc = require('puremvc').puremvc;
var constants = require('../../appConstants.js');

module.exports = puremvc.define(
    {
        name: 'fighter.view.mediator.FightMediator',
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
            switch(note.getName()) {

            }
        },

        /** @override */
        onRegister: function() {

        },

        /** @override */
        onRemove: function() {

        },

        init: function() {
            var self = this;

            var FightLayer = require('./../component/fightLayer.js');
            self.viewComponent = new FightLayer();
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
        NAME: 'FightMediator'
    }
);
},{"../../appConstants.js":"F:\\cocos\\fighter\\src\\appConstants.js","./../component/fightLayer.js":"F:\\cocos\\fighter\\src\\view\\component\\fightLayer.js","puremvc":"F:\\cocos\\fighter\\node_modules\\puremvc\\index.js"}],"F:\\cocos\\fighter\\src\\view\\mediator\\homeMediator.js":[function(require,module,exports){
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
            return [constants.PLAYER_ACTION];
        },

        /** @override */
        handleNotification: function(note) {
            switch(note.getName()) {
                case constants.PLAYER_ACTION:
                    this.viewComponent.update(this.getPlayer());
                    break;
            }
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
            self.viewComponent.init(this.getPlayer());

            self.viewComponent.onTrain = function(){
                self.sendNotification(constants.SCENE_ACTION, {name: constants.SCENE.TRAIN});
            };

            self.viewComponent.onLove = function(){
                self.sendNotification(constants.SCENE_ACTION, {name: constants.SCENE.LOVE});
            };

            self.viewComponent.onFight = function(){
                self.sendNotification(constants.SCENE_ACTION, {name: constants.SCENE.FIGHT});
            };
        },

        getPlayer: function() {
            var playerProxy = this.facade.retrieveProxy(PlayerProxy.NAME);
            return playerProxy.getPlayer();
        },

        getResource: function() {

        }
    },

    // static members
    {
        NAME: 'HomeMediator'
    }
)
},{"../../appConstants.js":"F:\\cocos\\fighter\\src\\appConstants.js","../../model/proxy/playerProxy.js":"F:\\cocos\\fighter\\src\\model\\proxy\\playerProxy.js","./../component/homeLayer.js":"F:\\cocos\\fighter\\src\\view\\component\\homeLayer.js","puremvc":"F:\\cocos\\fighter\\node_modules\\puremvc\\index.js"}],"F:\\cocos\\fighter\\src\\view\\mediator\\loveMediator.js":[function(require,module,exports){
/**
 * Created by Arthur on 2014/12/29.
 */
var puremvc = require('puremvc').puremvc;
var constants = require('../../appConstants.js');
var PlayerProxy = require('../../model/proxy/playerProxy.js');

module.exports = puremvc.define(
    {
        name: 'fighter.view.mediator.LoveMediator',
        parent: puremvc.Mediator
    },

    // instance members
    {
        /** @override */
        listNotificationInterests: function() {
            return [constants.LOVE_ACTION];
        },

        /** @override */
        handleNotification: function(note) {
            switch (note.getName()){
                case constants.LOVE_ACTION:
                    this.loveSuccess(note.getBody());
                    break;
            }
        },

        /** @override */
        onRegister: function() {

        },

        /** @override */
        onRemove: function() {

        },

        init: function() {
            var self = this;
            var LoveLayer = require('./../component/loveLayer.js');
            self.viewComponent = new LoveLayer();

            /*
            TODO: get love info
             */
            self.viewComponent.init(this.getLoveItems());

            self.viewComponent.onBack = function() {
                self.sendNotification(constants.SCENE_ACTION, {name: constants.SCENE.HOME});
            };

            self.viewComponent.showLoveConfirm = function() {
                var playerProxy = self.facade.retrieveProxy(PlayerProxy.NAME);
                var player = playerProxy.getPlayer();

                var LoveConfirmLayer = require('./../component/loveConfirmLayer.js');
                var layer = new LoveConfirmLayer(player.get('gold'), player.get('dailyCount').freeLove);
                self.sendNotification(constants.SCENE_ACTION_ADD_CHILD, layer);
            };

            self.viewComponent.executeLove = function() {

            };
        },

        loveSuccess: function(data) {
            cc.log('dasdfasdfsafd--------', data);
        },

        getResource: function() {

        },

        getLoveItems: function() {
            return [
                {
                    lv: 1,
                    value: 1,
                    count: 10,
                    countNeed: 99
                },
                {
                    lv: 2,
                    value: 1,
                    count: 10,
                    countNeed: 99
                },
                {
                    lv: 3,
                    value: 1,
                    count: 10,
                    countNeed: 99
                },
                {
                    lv: 4,
                    value: 1,
                    count: 10,
                    countNeed: 99
                },
                {
                    lv: 5,
                    value: 1,
                    count: 10,
                    countNeed: 99
                },
                {
                    lv: 6,
                    value: 1,
                    count: 10,
                    countNeed: 99
                },
                {
                    lv: 7,
                    value: 1,
                    count: 10,
                    countNeed: 99
                },
                {
                    lv: 8,
                    value: 1,
                    count: 10,
                    countNeed: 99
                },
                {
                    lv: 9,
                    value: 1,
                    count: 10,
                    countNeed: 99
                }
            ]
        }

    },

    // static members
    {
        NAME: 'LoveMediator'
    }
);
},{"../../appConstants.js":"F:\\cocos\\fighter\\src\\appConstants.js","../../model/proxy/playerProxy.js":"F:\\cocos\\fighter\\src\\model\\proxy\\playerProxy.js","./../component/loveConfirmLayer.js":"F:\\cocos\\fighter\\src\\view\\component\\loveConfirmLayer.js","./../component/loveLayer.js":"F:\\cocos\\fighter\\src\\view\\component\\loveLayer.js","puremvc":"F:\\cocos\\fighter\\node_modules\\puremvc\\index.js"}],"F:\\cocos\\fighter\\src\\view\\mediator\\sceneMediator.js":[function(require,module,exports){
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
                constants.SCENE_ACTION,
                constants.SCENE_ACTION_ADD_CHILD,
                constants.CONFIRM_DIALOG
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
                case constants.SCENE_ACTION_ADD_CHILD:
                    this.addChild(notification.getBody());
                    break;
                case constants.CONFIRM_DIALOG:
                    var ConfirmDialog = require('../component/confirmDialog.js');
                    var body = notification.getBody();
                    this.addChild(new ConfirmDialog(body.title, body.desc, body.callback));
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
            };

            if (res) {
                cc.LoaderScene.preload(res, handleSceneChanged, this);
            }
            else {
                handleSceneChanged();
            }
        },

        addChild: function(node) {
            this.viewComponent.addChild(node);
        }
    },
    // STATIC MEMBERS
    {
        NAME: 'SceneMediator',
        SCENE_CHANGE_VIEW: 'SceneChangeView'
    }
);

},{"../../appConstants.js":"F:\\cocos\\fighter\\src\\appConstants.js","../component/confirmDialog.js":"F:\\cocos\\fighter\\src\\view\\component\\confirmDialog.js","puremvc":"F:\\cocos\\fighter\\node_modules\\puremvc\\index.js"}],"F:\\cocos\\fighter\\src\\view\\mediator\\trainMediator.js":[function(require,module,exports){
/**
 * Created by Arthur on 2014/12/20.
 */
var puremvc = require('puremvc').puremvc;
var constants = require('../../appConstants.js');
var TaskProxy = require('../../model/proxy/taskProxy.js');

module.exports = puremvc.define(
    {
        name: 'fighter.view.mediator.TrainMediator',
        parent: puremvc.Mediator
    },

    // instance members
    {
        /** @override */
        listNotificationInterests: function() {
            return [constants.TASK_ACTION];
        },

        /** @override */
        handleNotification: function(note) {
            switch(note.getName()) {
                case constants.TASK_ACTION:
                    if (note.getType() == constants.TASK_ACTION_FINISHED) {
                        if(this.viewComponent) {
                            this.viewComponent.onTaskFinished(note.getBody());
                        }
                    }
                    break;
            }
        },

        /** @override */
        onRegister: function() {

        },

        /** @override */
        onRemove: function() {

        },

        init: function() {
            var self = this;

            var taskProxy = this.facade.retrieveProxy(TaskProxy.NAME);
            var taskList = taskProxy.getData();

            var TrainLayer = require('./../component/trainLayer.js');
            self.viewComponent = new TrainLayer();
            self.viewComponent.init(taskList);

            self.viewComponent.onBack = function() {
                self.sendNotification(constants.SCENE_ACTION, {name: constants.SCENE.HOME});
            };

            self.viewComponent.onTask = function(task) {
                self.sendNotification(constants.TASK_ACTION, task, constants.TASK_ACTION_START);
            };
        },

        getResource: function() {

        }

    },

    // static members
    {
        NAME: 'TrainMediator'
    }
);
},{"../../appConstants.js":"F:\\cocos\\fighter\\src\\appConstants.js","../../model/proxy/taskProxy.js":"F:\\cocos\\fighter\\src\\model\\proxy\\taskProxy.js","./../component/trainLayer.js":"F:\\cocos\\fighter\\src\\view\\component\\trainLayer.js","puremvc":"F:\\cocos\\fighter\\node_modules\\puremvc\\index.js"}]},{},["F:\\cocos\\fighter\\src\\app.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImM6XFxVc2Vyc1xcQXJ0aHVyXFxBcHBEYXRhXFxSb2FtaW5nXFxucG1cXG5vZGVfbW9kdWxlc1xcd2F0Y2hpZnlcXG5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwibm9kZV9tb2R1bGVzXFxwdXJlbXZjXFxpbmRleC5qcyIsIm5vZGVfbW9kdWxlc1xccHVyZW12Y1xcbGliXFxwdXJlbXZjLTEuMC4xLm1vZHVsZS5qcyIsIm5vZGVfbW9kdWxlc1xcdW5kZXJzY29yZVxcdW5kZXJzY29yZS5qcyIsInNyY1xcYXBwLmpzIiwic3JjXFxhcHBDb25zdGFudHMuanMiLCJzcmNcXGFwcEZhY2FkZS5qcyIsInNyY1xcY29udHJvbGxlclxcY29tbWFuZFxcU3RhcnR1cENvbW1hbmQuanMiLCJzcmNcXGNvbnRyb2xsZXJcXGNvbW1hbmRcXGhvbWVDb21tYW5kLmpzIiwic3JjXFxjb250cm9sbGVyXFxjb21tYW5kXFxwbGF5ZXJDb21tYW5kLmpzIiwic3JjXFxjb250cm9sbGVyXFxjb21tYW5kXFxwcmVwQ29udHJvbGxlckNvbW1hbmQuanMiLCJzcmNcXGNvbnRyb2xsZXJcXGNvbW1hbmRcXHByZXBNb2RlbENvbW1hbmQuanMiLCJzcmNcXGNvbnRyb2xsZXJcXGNvbW1hbmRcXHByZXBWaWV3Q29tbWFuZC5qcyIsInNyY1xcY29udHJvbGxlclxcY29tbWFuZFxcdGFza0NvbW1hbmQuanMiLCJzcmNcXGNvbnRyb2xsZXJcXGNvbW1hbmRcXHRhc2tNb25pdG9yQ29tbWFuZC5qcyIsInNyY1xcbW9kZWxcXGVudGl0eVxcZW50aXR5LmpzIiwic3JjXFxtb2RlbFxcZW50aXR5XFxwbGF5ZXIuanMiLCJzcmNcXG1vZGVsXFxlbnRpdHlcXHRhc2suanMiLCJzcmNcXG1vZGVsXFxwcm94eVxccGxheWVyUHJveHkuanMiLCJzcmNcXG1vZGVsXFxwcm94eVxcdGFza1Byb3h5LmpzIiwic3JjXFxyZXNvdXJjZS5qcyIsInNyY1xcdXRpbFxcZXZlbnQuanMiLCJzcmNcXHZpZXdcXGNvbXBvbmVudFxcY29uZmlybURpYWxvZy5qcyIsInNyY1xcdmlld1xcY29tcG9uZW50XFxjb250cm9sbGVyXFxsb3ZlSXRlbS5qcyIsInNyY1xcdmlld1xcY29tcG9uZW50XFxjb250cm9sbGVyXFx0cmFpbkl0ZW0uanMiLCJzcmNcXHZpZXdcXGNvbXBvbmVudFxcZmlnaHRMYXllci5qcyIsInNyY1xcdmlld1xcY29tcG9uZW50XFxob21lTGF5ZXIuanMiLCJzcmNcXHZpZXdcXGNvbXBvbmVudFxcbG92ZUNvbmZpcm1MYXllci5qcyIsInNyY1xcdmlld1xcY29tcG9uZW50XFxsb3ZlTGF5ZXIuanMiLCJzcmNcXHZpZXdcXGNvbXBvbmVudFxcdHJhaW5MYXllci5qcyIsInNyY1xcdmlld1xcbWVkaWF0b3JcXGRpcmVjdG9yTWVkaWF0b3IuanMiLCJzcmNcXHZpZXdcXG1lZGlhdG9yXFxmaWdodE1lZGlhdG9yLmpzIiwic3JjXFx2aWV3XFxtZWRpYXRvclxcaG9tZU1lZGlhdG9yLmpzIiwic3JjXFx2aWV3XFxtZWRpYXRvclxcbG92ZU1lZGlhdG9yLmpzIiwic3JjXFx2aWV3XFxtZWRpYXRvclxcc2NlbmVNZWRpYXRvci5qcyIsInNyY1xcdmlld1xcbWVkaWF0b3JcXHRyYWluTWVkaWF0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3Q1RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3Y0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImV4cG9ydHMucHVyZW12YyA9IHJlcXVpcmUoJy4vbGliL3B1cmVtdmMtMS4wLjEubW9kdWxlLmpzJyk7XHJcbiIsIi8qKlxyXG4gKiBAZmlsZU92ZXJ2aWV3XHJcbiAqIFB1cmVNVkMgSlMgTmF0aXZlIFBvcnQgYnkgRGF2aWQgRm9sZXksIEZyw6lkw6lyaWMgU2F1bmllciwgJiBBbGFpbiBEdWNoZXNuZWF1XHJcbiAqIENvcHlyaWdodChjKSAyMDA2LTIwMTIgRnV0dXJlc2NhbGUsIEluYy4sIFNvbWUgcmlnaHRzIHJlc2VydmVkLlxyXG4gKiBSZXVzZSBnb3Zlcm5lZCBieSBDcmVhdGl2ZSBDb21tb25zIEF0dHJpYnV0aW9uIDMuMFxyXG4gKiBodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9saWNlbnNlcy9ieS8zLjAvdXMvXHJcbiAqIEBhdXRob3IgZGF2aWQuZm9sZXlAcHVyZW12Yy5vcmdcclxuICovXHJcblxyXG5cclxuLyogaW1wbGVtZW50YXRpb24gYmVnaW4gKi9cclxuXHJcblxyXG4vKipcclxuICogQGF1dGhvciBQdXJlTVZDIEpTIE5hdGl2ZSBQb3J0IGJ5IERhdmlkIEZvbGV5LCBGcsOpZMOpcmljIFNhdW5pZXIsICYgQWxhaW4gRHVjaGVzbmVhdVxyXG4gKiBAYXV0aG9yIENvcHlyaWdodChjKSAyMDA2LTIwMTIgRnV0dXJlc2NhbGUsIEluYy4sIFNvbWUgcmlnaHRzIHJlc2VydmVkLlxyXG4gKlxyXG4gKiBAY2xhc3MgcHVyZW12Yy5PYnNlcnZlclxyXG4gKlxyXG4gKiBBIGJhc2UgT2JzZXJ2ZXIgaW1wbGVtZW50YXRpb24uXHJcbiAqXHJcbiAqIEFuIE9ic2VydmVyIGlzIGFuIG9iamVjdCB0aGF0IGVuY2Fwc3VsYXRlcyBpbmZvcm1hdGlvblxyXG4gKiBhYm91dCBhbiBpbnRlcmVzdGVkIG9iamVjdCB3aXRoIGEgbWV0aG9kIHRoYXQgc2hvdWxkXHJcbiAqIGJlIGNhbGxlZCB3aGVuIGEgcGFydGljdWxhciBOb3RpZmljYXRpb24gaXMgYnJvYWRjYXN0LlxyXG4gKlxyXG4gKiBJbiBQdXJlTVZDLCB0aGUgT2JzZXJ2ZXIgY2xhc3MgYXNzdW1lcyB0aGVzZSByZXNwb25zaWJpbGl0aWVzOlxyXG4gKlxyXG4gKiAtIEVuY2Fwc3VsYXRlIHRoZSBub3RpZmljYXRpb24gKGNhbGxiYWNrKSBtZXRob2Qgb2YgdGhlIGludGVyZXN0ZWQgb2JqZWN0LlxyXG4gKiAtIEVuY2Fwc3VsYXRlIHRoZSBub3RpZmljYXRpb24gY29udGV4dCAodGhpcykgb2YgdGhlIGludGVyZXN0ZWQgb2JqZWN0LlxyXG4gKiAtIFByb3ZpZGUgbWV0aG9kcyBmb3Igc2V0dGluZyB0aGUgbm90aWZpY2F0aW9uIG1ldGhvZCBhbmQgY29udGV4dC5cclxuICogLSBQcm92aWRlIGEgbWV0aG9kIGZvciBub3RpZnlpbmcgdGhlIGludGVyZXN0ZWQgb2JqZWN0LlxyXG4gKlxyXG4gKlxyXG4gKiBUaGUgbm90aWZpY2F0aW9uIG1ldGhvZCBvbiB0aGUgaW50ZXJlc3RlZCBvYmplY3Qgc2hvdWxkIHRha2VcclxuICogb25lIHBhcmFtZXRlciBvZiB0eXBlIE5vdGlmaWNhdGlvbi5cclxuICpcclxuICpcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gbm90aWZ5TWV0aG9kXHJcbiAqICB0aGUgbm90aWZpY2F0aW9uIG1ldGhvZCBvZiB0aGUgaW50ZXJlc3RlZCBvYmplY3RcclxuICogQHBhcmFtIHtPYmplY3R9IG5vdGlmeUNvbnRleHRcclxuICogIHRoZSBub3RpZmljYXRpb24gY29udGV4dCBvZiB0aGUgaW50ZXJlc3RlZCBvYmplY3RcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBPYnNlcnZlciAobm90aWZ5TWV0aG9kLCBub3RpZnlDb250ZXh0KVxyXG57XHJcbiAgICB0aGlzLnNldE5vdGlmeU1ldGhvZChub3RpZnlNZXRob2QpO1xyXG4gICAgdGhpcy5zZXROb3RpZnlDb250ZXh0KG5vdGlmeUNvbnRleHQpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNldCB0aGUgT2JzZXJ2ZXJzIG5vdGlmaWNhdGlvbiBtZXRob2QuXHJcbiAqXHJcbiAqIFRoZSBub3RpZmljYXRpb24gbWV0aG9kIHNob3VsZCB0YWtlIG9uZSBwYXJhbWV0ZXIgb2YgdHlwZSBOb3RpZmljYXRpb25cclxuICogQHBhcmFtIHtGdW5jdGlvbn0gbm90aWZ5TWV0aG9kXHJcbiAqICB0aGUgbm90aWZpY2F0aW9uIChjYWxsYmFjaykgbWV0aG9kIG9mIHRoZSBpbnRlcmVzdGVkIG9iamVjdC5cclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbk9ic2VydmVyLnByb3RvdHlwZS5zZXROb3RpZnlNZXRob2Q9IGZ1bmN0aW9uIChub3RpZnlNZXRob2QpXHJcbntcclxuICAgIHRoaXMubm90aWZ5PSBub3RpZnlNZXRob2Q7XHJcbn07XHJcblxyXG4vKipcclxuICogU2V0IHRoZSBPYnNlcnZlcnMgbm90aWZpY2F0aW9uIGNvbnRleHQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBub3RpZnlDb250ZXh0XHJcbiAqICB0aGUgbm90aWZpY2F0aW9uIGNvbnRleHQgKHRoaXMpIG9mIHRoZSBpbnRlcmVzdGVkIG9iamVjdC5cclxuICpcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbk9ic2VydmVyLnByb3RvdHlwZS5zZXROb3RpZnlDb250ZXh0PSBmdW5jdGlvbiAobm90aWZ5Q29udGV4dClcclxue1xyXG4gICAgdGhpcy5jb250ZXh0PSBub3RpZnlDb250ZXh0O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgRnVuY3Rpb24gdGhhdCB0aGlzIE9ic2VydmVyIHdpbGwgaW52b2tlIHdoZW4gaXQgaXMgbm90aWZpZWQuXHJcbiAqXHJcbiAqIEBwcml2YXRlXHJcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxyXG4gKi9cclxuT2JzZXJ2ZXIucHJvdG90eXBlLmdldE5vdGlmeU1ldGhvZD0gZnVuY3Rpb24gKClcclxue1xyXG4gICAgcmV0dXJuIHRoaXMubm90aWZ5O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgT2JqZWN0IHRoYXQgd2lsbCBzZXJ2ZSBhcyB0aGUgT2JzZXJ2ZXJzIGNhbGxiYWNrIGV4ZWN1dGlvbiBjb250ZXh0XHJcbiAqXHJcbiAqIEBwcml2YXRlXHJcbiAqIEByZXR1cm4ge09iamVjdH1cclxuICovXHJcbk9ic2VydmVyLnByb3RvdHlwZS5nZXROb3RpZnlDb250ZXh0PSBmdW5jdGlvbiAoKVxyXG57XHJcbiAgICByZXR1cm4gdGhpcy5jb250ZXh0O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIE5vdGlmeSB0aGUgaW50ZXJlc3RlZCBvYmplY3QuXHJcbiAqXHJcbiAqIEBwYXJhbSB7cHVyZW12Yy5Ob3RpZmljYXRpb259IG5vdGlmaWNhdGlvblxyXG4gKiAgVGhlIE5vdGlmaWNhdGlvbiB0byBwYXNzIHRvIHRoZSBpbnRlcmVzdGVkIG9iamVjdHMgbm90aWZpY2F0aW9uIG1ldGhvZFxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuT2JzZXJ2ZXIucHJvdG90eXBlLm5vdGlmeU9ic2VydmVyPSBmdW5jdGlvbiAobm90aWZpY2F0aW9uKVxyXG57XHJcbiAgICB0aGlzLmdldE5vdGlmeU1ldGhvZCgpLmNhbGwodGhpcy5nZXROb3RpZnlDb250ZXh0KCksIG5vdGlmaWNhdGlvbik7XHJcbn07XHJcblxyXG4vKipcclxuICogQ29tcGFyZSBhbiBvYmplY3QgdG8gdGhpcyBPYnNlcnZlcnMgbm90aWZpY2F0aW9uIGNvbnRleHQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3RcclxuICpcclxuICogQHJldHVybiB7Ym9vbGVhbn1cclxuICovXHJcbk9ic2VydmVyLnByb3RvdHlwZS5jb21wYXJlTm90aWZ5Q29udGV4dD0gZnVuY3Rpb24gKG9iamVjdClcclxue1xyXG4gICAgcmV0dXJuIG9iamVjdCA9PT0gdGhpcy5jb250ZXh0O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRoZSBPYnNlcnZlcnMgY2FsbGJhY2sgRnVuY3Rpb25cclxuICpcclxuICogQHByaXZhdGVcclxuICogQHR5cGUge0Z1bmN0aW9ufVxyXG4gKi9cclxuT2JzZXJ2ZXIucHJvdG90eXBlLm5vdGlmeT0gbnVsbDtcclxuXHJcbi8qKlxyXG4gKiBUaGUgT2JzZXJ2ZXJzIGNhbGxiYWNrIE9iamVjdFxyXG4gKiBAcHJpdmF0ZVxyXG4gKiBAdHlwZSB7T2JqZWN0fVxyXG4gKi9cclxuT2JzZXJ2ZXIucHJvdG90eXBlLmNvbnRleHQ9IG51bGw7XHJcbi8qKlxyXG4gKiBAYXV0aG9yIFB1cmVNVkMgSlMgTmF0aXZlIFBvcnQgYnkgRGF2aWQgRm9sZXksIEZyw6lkw6lyaWMgU2F1bmllciwgJiBBbGFpbiBEdWNoZXNuZWF1XHJcbiAqIEBhdXRob3IgQ29weXJpZ2h0KGMpIDIwMDYtMjAxMiBGdXR1cmVzY2FsZSwgSW5jLiwgU29tZSByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIEBjbGFzcyBwdXJlbXZjLk5vdGlmaWNhdGlvblxyXG4gKlxyXG4gKiBBIGJhc2UgTm90aWZpY2F0aW9uIGltcGxlbWVudGF0aW9uLlxyXG4gKlxyXG4gKiBQdXJlTVZDIGRvZXMgbm90IHJlbHkgdXBvbiB1bmRlcmx5aW5nIGV2ZW50IG1vZGVscyBzdWNoIGFzIHRoZSBvbmUgcHJvdmlkZWRcclxuICogd2l0aCB0aGUgRE9NIG9yIG90aGVyIGJyb3dzZXIgY2VudHJpYyBXM0MgZXZlbnQgbW9kZWxzLlxyXG4gKlxyXG4gKiBUaGUgT2JzZXJ2ZXIgUGF0dGVybiBhcyBpbXBsZW1lbnRlZCB3aXRoaW4gUHVyZU1WQyBleGlzdHMgdG8gc3VwcG9ydFxyXG4gKiBldmVudC1kcml2ZW4gY29tbXVuaWNhdGlvbiBiZXR3ZWVuIHRoZSBhcHBsaWNhdGlvbiBhbmQgdGhlIGFjdG9ycyBvZiB0aGUgTVZDXHJcbiAqIHRyaWFkLlxyXG4gKlxyXG4gKiBOb3RpZmljYXRpb25zIGFyZSBub3QgbWVhbnQgdG8gYmUgYSByZXBsYWNlbWVudCBmb3IgZXZlbnRzIGluIHRoZSBicm93c2VyLlxyXG4gKiBHZW5lcmFsbHksIE1lZGlhdG9yIGltcGxlbWVudG9ycyBwbGFjZSBldmVudCBsaXN0ZW5lcnMgb24gdGhlaXIgdmlld1xyXG4gKiBjb21wb25lbnRzLCB3aGljaCB0aGV5IHRoZW4gaGFuZGxlIGluIHRoZSB1c3VhbCB3YXkuIFRoaXMgbWF5IGxlYWQgdG8gdGhlXHJcbiAqIGJyb2FkY2FzdCBvZiBOb3RpZmljYXRpb25zIHRvIHRyaWdnZXIgY29tbWFuZHMgb3IgdG8gY29tbXVuaWNhdGUgd2l0aCBvdGhlclxyXG4gKiBNZWRpYXRvcnMuIHtAbGluayBwdXJlbXZjLlByb3h5IFByb3h5fSxcclxuICoge0BsaW5rIHB1cmVtdmMuU2ltcGxlQ29tbWFuZCBTaW1wbGVDb21tYW5kfVxyXG4gKiBhbmQge0BsaW5rIHB1cmVtdmMuTWFjcm9Db21tYW5kIE1hY3JvQ29tbWFuZH1cclxuICogaW5zdGFuY2VzIGNvbW11bmljYXRlIHdpdGggZWFjaCBvdGhlciBhbmRcclxuICoge0BsaW5rIHB1cmVtdmMuTWVkaWF0b3IgTWVkaWF0b3J9c1xyXG4gKiBieSBicm9hZGNhc3RpbmcgTm90aWZpY2F0aW9ucy5cclxuICpcclxuICogQSBrZXkgZGlmZmVyZW5jZSBiZXR3ZWVuIGJyb3dzZXIgZXZlbnRzIGFuZCBQdXJlTVZDIE5vdGlmaWNhdGlvbnMgaXMgdGhhdFxyXG4gKiBldmVudHMgZm9sbG93IHRoZSAnQ2hhaW4gb2YgUmVzcG9uc2liaWxpdHknIHBhdHRlcm4sICdidWJibGluZycgdXAgdGhlXHJcbiAqIGRpc3BsYXkgaGllcmFyY2h5IHVudGlsIHNvbWUgcGFyZW50IGNvbXBvbmVudCBoYW5kbGVzIHRoZSBldmVudCwgd2hpbGVcclxuICogUHVyZU1WQyBOb3RpZmljYXRpb24gZm9sbG93IGEgJ1B1Ymxpc2gvU3Vic2NyaWJlJyBwYXR0ZXJuLiBQdXJlTVZDIGNsYXNzZXNcclxuICogbmVlZCBub3QgYmUgcmVsYXRlZCB0byBlYWNoIG90aGVyIGluIGEgcGFyZW50L2NoaWxkIHJlbGF0aW9uc2hpcCBpbiBvcmRlciB0b1xyXG4gKiBjb21tdW5pY2F0ZSB3aXRoIG9uZSBhbm90aGVyIHVzaW5nIE5vdGlmaWNhdGlvbnMuXHJcbiAqXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gKiAgVGhlIE5vdGlmaWNhdGlvbiBuYW1lXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBbYm9keV1cclxuICogIFRoZSBOb3RpZmljYXRpb24gYm9keVxyXG4gKiBAcGFyYW0ge09iamVjdH0gW3R5cGVdXHJcbiAqICBUaGUgTm90aWZpY2F0aW9uIHR5cGVcclxuICovXHJcbmZ1bmN0aW9uIE5vdGlmaWNhdGlvbihuYW1lLCBib2R5LCB0eXBlKVxyXG57XHJcbiAgICB0aGlzLm5hbWU9IG5hbWU7XHJcbiAgICB0aGlzLmJvZHk9IGJvZHk7XHJcbiAgICB0aGlzLnR5cGU9IHR5cGU7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBuYW1lIG9mIHRoZSBOb3RpZmljYXRpb24gaW5zdGFuY2VcclxuICpcclxuICogQHJldHVybiB7c3RyaW5nfVxyXG4gKiAgVGhlIG5hbWUgb2YgdGhlIE5vdGlmaWNhdGlvbiBpbnN0YW5jZVxyXG4gKi9cclxuTm90aWZpY2F0aW9uLnByb3RvdHlwZS5nZXROYW1lPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHJldHVybiB0aGlzLm5hbWU7XHJcbn07XHJcblxyXG4vKipcclxuICogU2V0IHRoaXMgTm90aWZpY2F0aW9ucyBib2R5LlxyXG4gKiBAcGFyYW0ge09iamVjdH0gYm9keVxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuTm90aWZpY2F0aW9uLnByb3RvdHlwZS5zZXRCb2R5PSBmdW5jdGlvbihib2R5KVxyXG57XHJcbiAgICB0aGlzLmJvZHk9IGJvZHk7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBOb3RpZmljYXRpb24gYm9keS5cclxuICpcclxuICogQHJldHVybiB7T2JqZWN0fVxyXG4gKi9cclxuTm90aWZpY2F0aW9uLnByb3RvdHlwZS5nZXRCb2R5PSBmdW5jdGlvbigpXHJcbntcclxuICAgIHJldHVybiB0aGlzLmJvZHlcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIHR5cGUgb2YgdGhlIE5vdGlmaWNhdGlvbiBpbnN0YW5jZS5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IHR5cGVcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbk5vdGlmaWNhdGlvbi5wcm90b3R5cGUuc2V0VHlwZT0gZnVuY3Rpb24odHlwZSlcclxue1xyXG4gICAgdGhpcy50eXBlPSB0eXBlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgdHlwZSBvZiB0aGUgTm90aWZpY2F0aW9uIGluc3RhbmNlLlxyXG4gKlxyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqL1xyXG5Ob3RpZmljYXRpb24ucHJvdG90eXBlLmdldFR5cGU9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgcmV0dXJuIHRoaXMudHlwZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIE5vdGlmaWNhdGlvbiBpbnN0YW5jZVxyXG4gKlxyXG4gKiBAcmV0dXJuIHtzdHJpbmd9XHJcbiAqL1xyXG5Ob3RpZmljYXRpb24ucHJvdG90eXBlLnRvU3RyaW5nPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHZhciBtc2c9IFwiTm90aWZpY2F0aW9uIE5hbWU6IFwiICsgdGhpcy5nZXROYW1lKCk7XHJcbiAgICBtc2crPSBcIlxcbkJvZHk6XCIgKyAoKHRoaXMuYm9keSA9PSBudWxsICkgPyBcIm51bGxcIiA6IHRoaXMuYm9keS50b1N0cmluZygpKTtcclxuICAgIG1zZys9IFwiXFxuVHlwZTpcIiArICgodGhpcy50eXBlID09IG51bGwgKSA/IFwibnVsbFwiIDogdGhpcy50eXBlKTtcclxuICAgIHJldHVybiBtc2c7XHJcbn07XHJcblxyXG4vKipcclxuICogVGhlIE5vdGlmaWNhdGlvbnMgbmFtZS5cclxuICpcclxuICogQHR5cGUge3N0cmluZ31cclxuICogQHByaXZhdGVcclxuICovXHJcbk5vdGlmaWNhdGlvbi5wcm90b3R5cGUubmFtZT0gbnVsbDtcclxuXHJcbi8qKlxyXG4gKiBUaGUgTm90aWZpY2F0aW9ucyB0eXBlLlxyXG4gKlxyXG4gKiBAdHlwZSB7c3RyaW5nfVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuTm90aWZpY2F0aW9uLnByb3RvdHlwZS50eXBlPSBudWxsO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBOb3RpZmljYXRpb25zIGJvZHkuXHJcbiAqXHJcbiAqIEB0eXBlIHtPYmplY3R9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5Ob3RpZmljYXRpb24ucHJvdG90eXBlLmJvZHk9IG51bGw7XHJcbi8qKlxyXG4gKiBAYXV0aG9yIFB1cmVNVkMgSlMgTmF0aXZlIFBvcnQgYnkgRGF2aWQgRm9sZXksIEZyw6lkw6lyaWMgU2F1bmllciwgJiBBbGFpbiBEdWNoZXNuZWF1XHJcbiAqIEBhdXRob3IgQ29weXJpZ2h0KGMpIDIwMDYtMjAxMiBGdXR1cmVzY2FsZSwgSW5jLiwgU29tZSByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIEBjbGFzcyBwdXJlbXZjLk5vdGlmaWVyXHJcbiAqXHJcbiAqIEEgQmFzZSBOb3RpZmllciBpbXBsZW1lbnRhdGlvbi5cclxuICpcclxuICoge0BsaW5rIHB1cmVtdmMuTWFjcm9Db21tYW5kIE1hY3JvQ29tbWFuZH0sXHJcbiAqIHtAbGluayBwdXJlbXZjLlNpbXBsZUNvbW1hbmQgU2ltcGxlQ29tbWFuZH0sXHJcbiAqIHtAbGluayBwdXJlbXZjLk1lZGlhdG9yIE1lZGlhdG9yfSBhbmRcclxuICoge0BsaW5rIHB1cmVtdmMuUHJveHkgUHJveHl9XHJcbiAqIGFsbCBoYXZlIGEgbmVlZCB0byBzZW5kIE5vdGlmaWNhdGlvbnNcclxuICpcclxuICogVGhlIE5vdGlmaWVyIGludGVyZmFjZSBwcm92aWRlcyBhIGNvbW1vbiBtZXRob2QgY2FsbGVkICNzZW5kTm90aWZpY2F0aW9uIHRoYXRcclxuICogcmVsaWV2ZXMgaW1wbGVtZW50YXRpb24gY29kZSBvZiB0aGUgbmVjZXNzaXR5IHRvIGFjdHVhbGx5IGNvbnN0cnVjdFxyXG4gKiBOb3RpZmljYXRpb25zLlxyXG4gKlxyXG4gKiBUaGUgTm90aWZpZXIgY2xhc3MsIHdoaWNoIGFsbCBvZiB0aGUgYWJvdmUgbWVudGlvbmVkIGNsYXNzZXNcclxuICogZXh0ZW5kLCBwcm92aWRlcyBhbiBpbml0aWFsaXplZCByZWZlcmVuY2UgdG8gdGhlXHJcbiAqIHtAbGluayBwdXJlbXZjLkZhY2FkZSBGYWNhZGV9XHJcbiAqIE11bHRpdG9uLCB3aGljaCBpcyByZXF1aXJlZCBmb3IgdGhlIGNvbnZpZW5pZW5jZSBtZXRob2RcclxuICogZm9yIHNlbmRpbmcgTm90aWZpY2F0aW9ucyBidXQgYWxzbyBlYXNlcyBpbXBsZW1lbnRhdGlvbiBhcyB0aGVzZVxyXG4gKiBjbGFzc2VzIGhhdmUgZnJlcXVlbnRcclxuICoge0BsaW5rIHB1cmVtdmMuRmFjYWRlIEZhY2FkZX0gaW50ZXJhY3Rpb25zXHJcbiAqIGFuZCB1c3VhbGx5IHJlcXVpcmUgYWNjZXNzIHRvIHRoZSBmYWNhZGUgYW55d2F5LlxyXG4gKlxyXG4gKiBOT1RFOiBJbiB0aGUgTXVsdGlDb3JlIHZlcnNpb24gb2YgdGhlIGZyYW1ld29yaywgdGhlcmUgaXMgb25lIGNhdmVhdCB0b1xyXG4gKiBub3RpZmllcnMsIHRoZXkgY2Fubm90IHNlbmQgbm90aWZpY2F0aW9ucyBvciByZWFjaCB0aGUgZmFjYWRlIHVudGlsIHRoZXlcclxuICogaGF2ZSBhIHZhbGlkIG11bHRpdG9uS2V5LlxyXG4gKlxyXG4gKiBUaGUgbXVsdGl0b25LZXkgaXMgc2V0OlxyXG4gKiAgIC0gb24gYSBDb21tYW5kIHdoZW4gaXQgaXMgZXhlY3V0ZWQgYnkgdGhlIENvbnRyb2xsZXJcclxuICogICAtIG9uIGEgTWVkaWF0b3IgaXMgcmVnaXN0ZXJlZCB3aXRoIHRoZSBWaWV3XHJcbiAqICAgLSBvbiBhIFByb3h5IGlzIHJlZ2lzdGVyZWQgd2l0aCB0aGUgTW9kZWwuXHJcbiAqXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gTm90aWZpZXIoKVxyXG57XHJcbn07XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGFuZCBzZW5kIGEgTm90aWZpY2F0aW9uLlxyXG4gKlxyXG4gKiBLZWVwcyB1cyBmcm9tIGhhdmluZyB0byBjb25zdHJ1Y3QgbmV3IE5vdGlmaWNhdGlvbiBpbnN0YW5jZXMgaW4gb3VyXHJcbiAqIGltcGxlbWVudGF0aW9uIGNvZGUuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBub3RpZmljYXRpb25OYW1lXHJcbiAqICBBIG5vdGlmaWNhdGlvbiBuYW1lXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBbYm9keV1cclxuICogIFRoZSBib2R5IG9mIHRoZSBub3RpZmljYXRpb25cclxuICogQHBhcmFtIHtzdHJpbmd9IFt0eXBlXVxyXG4gKiAgVGhlIG5vdGlmaWNhdGlvbiB0eXBlXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5Ob3RpZmllci5wcm90b3R5cGUuc2VuZE5vdGlmaWNhdGlvbiA9IGZ1bmN0aW9uKG5vdGlmaWNhdGlvbk5hbWUsIGJvZHksIHR5cGUpXHJcbntcclxuICAgIHZhciBmYWNhZGUgPSB0aGlzLmdldEZhY2FkZSgpO1xyXG4gICAgaWYoZmFjYWRlKVxyXG4gICAge1xyXG4gICAgICAgIGZhY2FkZS5zZW5kTm90aWZpY2F0aW9uKG5vdGlmaWNhdGlvbk5hbWUsIGJvZHksIHR5cGUpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEEgcmVmZXJlbmNlIHRvIHRoaXMgTm90aWZpZXIncyBGYWNhZGUuIFRoaXMgcmVmZXJlbmNlIHdpbGwgbm90IGJlIGF2YWlsYWJsZVxyXG4gKiB1bnRpbCAjaW5pdGlhbGl6ZU5vdGlmaWVyIGhhcyBiZWVuIGNhbGxlZC5cclxuICpcclxuICogQHR5cGUge3B1cmVtdmMuRmFjYWRlfVxyXG4gKi9cclxuTm90aWZpZXIucHJvdG90eXBlLmZhY2FkZTtcclxuXHJcbi8qKlxyXG4gKiBJbml0aWFsaXplIHRoaXMgTm90aWZpZXIgaW5zdGFuY2UuXHJcbiAqXHJcbiAqIFRoaXMgaXMgaG93IGEgTm90aWZpZXIgZ2V0cyBpdHMgbXVsdGl0b25LZXkuXHJcbiAqIENhbGxzIHRvICNzZW5kTm90aWZpY2F0aW9uIG9yIHRvIGFjY2VzcyB0aGVcclxuICogZmFjYWRlIHdpbGwgZmFpbCB1bnRpbCBhZnRlciB0aGlzIG1ldGhvZFxyXG4gKiBoYXMgYmVlbiBjYWxsZWQuXHJcbiAqXHJcbiAqIE1lZGlhdG9ycywgQ29tbWFuZHMgb3IgUHJveGllcyBtYXkgb3ZlcnJpZGVcclxuICogdGhpcyBtZXRob2QgaW4gb3JkZXIgdG8gc2VuZCBub3RpZmljYXRpb25zXHJcbiAqIG9yIGFjY2VzcyB0aGUgTXVsdGl0b24gRmFjYWRlIGluc3RhbmNlIGFzXHJcbiAqIHNvb24gYXMgcG9zc2libGUuIFRoZXkgQ0FOTk9UIGFjY2VzcyB0aGUgZmFjYWRlXHJcbiAqIGluIHRoZWlyIGNvbnN0cnVjdG9ycywgc2luY2UgdGhpcyBtZXRob2Qgd2lsbCBub3RcclxuICogeWV0IGhhdmUgYmVlbiBjYWxsZWQuXHJcbiAqXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcclxuICogIFRoZSBOb3RpZmllcnMgbXVsdGl0b24ga2V5O1xyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuTm90aWZpZXIucHJvdG90eXBlLmluaXRpYWxpemVOb3RpZmllciA9IGZ1bmN0aW9uKGtleSlcclxue1xyXG4gICAgdGhpcy5tdWx0aXRvbktleSA9IFN0cmluZyhrZXkpO1xyXG4gICAgdGhpcy5mYWNhZGU9IHRoaXMuZ2V0RmFjYWRlKCk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0cmlldmUgdGhlIE11bHRpdG9uIEZhY2FkZSBpbnN0YW5jZVxyXG4gKlxyXG4gKlxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEByZXR1cm4ge3B1cmVtdmMuRmFjYWRlfVxyXG4gKi9cclxuTm90aWZpZXIucHJvdG90eXBlLmdldEZhY2FkZSA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgaWYodGhpcy5tdWx0aXRvbktleSA9PSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihOb3RpZmllci5NVUxUSVRPTl9NU0cpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gRmFjYWRlLmdldEluc3RhbmNlKHRoaXMubXVsdGl0b25LZXkpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICogVGhlIE5vdGlmaWVycyBpbnRlcm5hbCBtdWx0aXRvbiBrZXkuXHJcbiAqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQHR5cGUgc3RyaW5nXHJcbiAqL1xyXG5Ob3RpZmllci5wcm90b3R5cGUubXVsdGl0b25LZXkgPSBudWxsO1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICogVGhlIGVycm9yIG1lc3NhZ2UgdXNlZCBpZiB0aGUgTm90aWZpZXIgaXMgbm90IGluaXRpYWxpemVkIGNvcnJlY3RseSBhbmRcclxuICogYXR0ZW1wdHMgdG8gcmV0cmlldmUgaXRzIG93biBtdWx0aXRvbiBrZXlcclxuICpcclxuICogQHN0YXRpY1xyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEBjb25zdFxyXG4gKiBAdHlwZSBzdHJpbmdcclxuICovXHJcbk5vdGlmaWVyLk1VTFRJVE9OX01TRyA9IFwibXVsdGl0b25LZXkgZm9yIHRoaXMgTm90aWZpZXIgbm90IHlldCBpbml0aWFsaXplZCFcIjtcclxuLyoqXHJcbiAqIEBhdXRob3IgUHVyZU1WQyBKUyBOYXRpdmUgUG9ydCBieSBEYXZpZCBGb2xleSwgRnLDqWTDqXJpYyBTYXVuaWVyLCAmIEFsYWluIER1Y2hlc25lYXVcclxuICogQGF1dGhvciBDb3B5cmlnaHQoYykgMjAwNi0yMDEyIEZ1dHVyZXNjYWxlLCBJbmMuLCBTb21lIHJpZ2h0cyByZXNlcnZlZC5cclxuICpcclxuICogQGNsYXNzIHB1cmVtdmMuU2ltcGxlQ29tbWFuZFxyXG4gKiBAZXh0ZW5kcyBwdXJlbXZjLk5vdGlmaWVyXHJcbiAqXHJcbiAqIFNpbXBsZUNvbW1hbmRzIGVuY2Fwc3VsYXRlIHRoZSBidXNpbmVzcyBsb2dpYyBvZiB5b3VyIGFwcGxpY2F0aW9uLiBZb3VyXHJcbiAqIHN1YmNsYXNzIHNob3VsZCBvdmVycmlkZSB0aGUgI2V4ZWN1dGUgbWV0aG9kIHdoZXJlIHlvdXIgYnVzaW5lc3MgbG9naWMgd2lsbFxyXG4gKiBoYW5kbGUgdGhlXHJcbiAqIHtAbGluayBwdXJlbXZjLk5vdGlmaWNhdGlvbiBOb3RpZmljYXRpb259XHJcbiAqXHJcbiAqIFRha2UgYSBsb29rIGF0XHJcbiAqIHtAbGluayBwdXJlbXZjLkZhY2FkZSNyZWdpc3RlckNvbW1hbmQgRmFjYWRlJ3MgcmVnaXN0ZXJDb21tYW5kfVxyXG4gKiBvciB7QGxpbmsgcHVyZW12Yy5Db250cm9sbGVyI3JlZ2lzdGVyQ29tbWFuZCBDb250cm9sbGVycyByZWdpc3RlckNvbW1hbmR9XHJcbiAqIG1ldGhvZHMgdG8gc2VlIGhvdyB0byBhZGQgY29tbWFuZHMgdG8geW91ciBhcHBsaWNhdGlvbi5cclxuICpcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBTaW1wbGVDb21tYW5kICgpIHsgfTtcclxuXHJcblNpbXBsZUNvbW1hbmQucHJvdG90eXBlPSBuZXcgTm90aWZpZXI7XHJcblNpbXBsZUNvbW1hbmQucHJvdG90eXBlLmNvbnN0cnVjdG9yPSBTaW1wbGVDb21tYW5kO1xyXG5cclxuLyoqXHJcbiAqIEZ1bGZpbGwgdGhlIHVzZS1jYXNlIGluaXRpYXRlZCBieSB0aGUgZ2l2ZW4gTm90aWZpY2F0aW9uXHJcbiAqXHJcbiAqIEluIHRoZSBDb21tYW5kIFBhdHRlcm4sIGFuIGFwcGxpY2F0aW9uIHVzZS1jYXNlIHR5cGljYWxseSBiZWdpbnMgd2l0aCBzb21lXHJcbiAqIHVzZXIgYWN0aW9uLCB3aGljaCByZXN1bHRzIGluIGEgTm90aWZpY2F0aW9uIGlzIGhhbmRsZWQgYnkgdGhlIGJ1c2luZXNzIGxvZ2ljXHJcbiAqIGluIHRoZSAjZXhlY3V0ZSBtZXRob2Qgb2YgYSBjb21tYW5kLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3B1cmVtdmMuTm90aWZpY2F0aW9ufSBub3RpZmljYXRpb25cclxuICogIFRoZSBub3RpZmljYXRpb24gdG8gaGFuZGxlLlxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuU2ltcGxlQ29tbWFuZC5wcm90b3R5cGUuZXhlY3V0ZT0gZnVuY3Rpb24gKG5vdGlmaWNhdGlvbikgeyB9O1xyXG4vKipcclxuICogQGF1dGhvciBQdXJlTVZDIEpTIE5hdGl2ZSBQb3J0IGJ5IERhdmlkIEZvbGV5LCBGcsOpZMOpcmljIFNhdW5pZXIsICYgQWxhaW4gRHVjaGVzbmVhdVxyXG4gKiBAYXV0aG9yIENvcHlyaWdodChjKSAyMDA2LTIwMTIgRnV0dXJlc2NhbGUsIEluYy4sIFNvbWUgcmlnaHRzIHJlc2VydmVkLlxyXG4gKlxyXG4gKiBAY2xhc3MgcHVyZW12Yy5NYWNyb0NvbW1hbmRcclxuICogQGV4dGVuZHMgcHVyZW12Yy5Ob3RpZmllclxyXG4gKlxyXG4gKiBBIGJhc2UgY29tbWFuZCBpbXBsZW1lbnRhdGlvbiB0aGF0IGV4ZWN1dGVzIG90aGVyIGNvbW1hbmRzLCBzdWNoIGFzXHJcbiAqIHtAbGluayBwdXJlbXZjLlNpbXBsZUNvbW1hbmQgU2ltcGxlQ29tbWFuZH1cclxuICogb3Ige0BsaW5rIHB1cmVtdmMuTWFjcm9Db21tYW5kIE1hY3JvQ29tbWFuZH1cclxuICogc3ViY2xhc3Nlcy5cclxuICpcclxuICogQSBNYWNyb0NvbW1hbmQgbWFpbnRhaW5zIGFuIGxpc3Qgb2ZcclxuICogY29tbWFuZCBjb25zdHJ1Y3RvciByZWZlcmVuY2VzIGNhbGxlZCAqU3ViQ29tbWFuZHMqLlxyXG4gKlxyXG4gKiBXaGVuICNleGVjdXRlIGlzIGNhbGxlZCwgdGhlIE1hY3JvQ29tbWFuZFxyXG4gKiBpbnN0YW50aWF0ZXMgYW5kIGNhbGxzICNleGVjdXRlIG9uIGVhY2ggb2YgaXRzICpTdWJDb21tYW5kcyogaW4gdHVybi5cclxuICogRWFjaCAqU3ViQ29tbWFuZCogd2lsbCBiZSBwYXNzZWQgYSByZWZlcmVuY2UgdG8gdGhlIG9yaWdpbmFsXHJcbiAqIHtAbGluayBwdXJlbXZjLk5vdGlmaWNhdGlvbiBOb3RpZmljYXRpb259XHJcbiAqIHRoYXQgd2FzIHBhc3NlZCB0byB0aGUgTWFjcm9Db21tYW5kcyAjZXhlY3V0ZSBtZXRob2RcclxuICpcclxuICogVW5saWtlIHtAbGluayBwdXJlbXZjLlNpbXBsZUNvbW1hbmQgU2ltcGxlQ29tbWFuZH0sXHJcbiAqIHlvdXIgc3ViY2xhc3Mgc2hvdWxkIG5vdCBvdmVycmlkZSAjZXhlY3V0ZSBidXQgaW5zdGVhZCwgc2hvdWxkXHJcbiAqIG92ZXJyaWRlIHRoZSAjaW5pdGlhbGl6ZU1hY3JvQ29tbWFuZCBtZXRob2QsIGNhbGxpbmcgI2FkZFN1YkNvbW1hbmQgb25jZSBmb3JcclxuICogZWFjaCAqU3ViQ29tbWFuZCogdG8gYmUgZXhlY3V0ZWQuXHJcbiAqXHJcbiAqIElmIHlvdXIgc3ViY2xhc3MgZG9lcyBkZWZpbmUgYSBjb25zdHJ1Y3RvciwgYmUgc3VyZSB0byBjYWxsIFwic3VwZXJcIiBsaWtlIHNvXHJcbiAqXHJcbiAqICAgICBmdW5jdGlvbiBNeU1hY3JvQ29tbWFuZCAoKVxyXG4gKiAgICAge1xyXG4gKiAgICAgICAgIE1hY3JvQ29tbWFuZC5jYWxsKHRoaXMpO1xyXG4gKiAgICAgfTtcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBNYWNyb0NvbW1hbmQoKVxyXG57XHJcbiAgICB0aGlzLnN1YkNvbW1hbmRzPSBbXTtcclxuICAgIHRoaXMuaW5pdGlhbGl6ZU1hY3JvQ29tbWFuZCgpO1xyXG59O1xyXG5cclxuLyogc3ViY2xhc3MgTm90aWZpZXIgKi9cclxuTWFjcm9Db21tYW5kLnByb3RvdHlwZT0gbmV3IE5vdGlmaWVyO1xyXG5NYWNyb0NvbW1hbmQucHJvdG90eXBlLmNvbnN0cnVjdG9yPSBNYWNyb0NvbW1hbmQ7XHJcblxyXG4vKipcclxuICogQHByaXZhdGVcclxuICogQHR5cGUge0FycmF5LjxwdXJlbXZjLlNpbXBsZUNvbW1hbmR8cHVyZW12Yy5NYWNyb0NvbW1hbmQ+fVxyXG4gKi9cclxuTWFjcm9Db21tYW5kLnByb3RvdHlwZS5zdWJDb21tYW5kcz0gbnVsbDtcclxuXHJcbi8qKlxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEluaXRpYWxpemUgdGhlIE1hY3JvQ29tbWFuZC5cclxuICpcclxuICogSW4geW91ciBzdWJjbGFzcywgb3ZlcnJpZGUgdGhpcyBtZXRob2QgdG9cclxuICogaW5pdGlhbGl6ZSB0aGUgTWFjcm9Db21tYW5kJ3MgKlN1YkNvbW1hbmQqXHJcbiAqIGxpc3Qgd2l0aCBjb21tYW5kIGNsYXNzIHJlZmVyZW5jZXMgbGlrZVxyXG4gKiB0aGlzOlxyXG4gKlxyXG4gKiAgICAgLy8gSW5pdGlhbGl6ZSBNeU1hY3JvQ29tbWFuZFxyXG4gKiAgICAgTXlNYWNyb0NvbW1hbmQucHJvdG90eXBlLmluaXRpYWxpemVNYWNyb0NvbW1hbmQ9IGZ1bmN0aW9uICgpXHJcbiAqICAgICB7XHJcbiAqICAgICAgICAgdGhpcy5hZGRTdWJDb21tYW5kKCBjb20ubWUubXlhcHAuY29udHJvbGxlci5GaXJzdENvbW1hbmQgKTtcclxuICogICAgICAgICB0aGlzLmFkZFN1YkNvbW1hbmQoIGNvbS5tZS5teWFwcC5jb250cm9sbGVyLlNlY29uZENvbW1hbmQgKTtcclxuICogICAgICAgICB0aGlzLmFkZFN1YkNvbW1hbmQoIGNvbS5tZS5teWFwcC5jb250cm9sbGVyLlRoaXJkQ29tbWFuZCApO1xyXG4gKiAgICAgfTtcclxuICpcclxuICogTm90ZSB0aGF0ICpTdWJDb21tYW5kKnMgbWF5IGJlIGFueSBjb21tYW5kIGltcGxlbWVudG9yLFxyXG4gKiBNYWNyb0NvbW1hbmRzIG9yIFNpbXBsZUNvbW1hbmRzIGFyZSBib3RoIGFjY2VwdGFibGUuXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5NYWNyb0NvbW1hbmQucHJvdG90eXBlLmluaXRpYWxpemVNYWNyb0NvbW1hbmQ9IGZ1bmN0aW9uKCkge31cclxuXHJcbi8qKlxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEFkZCBhICpTdWJDb21tYW5kKlxyXG4gKlxyXG4gKiBUaGUgKlN1YkNvbW1hbmQqcyB3aWxsIGJlIGNhbGxlZCBpbiBGaXJzdCBJbiAvIEZpcnN0IE91dCAoRklGTykgb3JkZXJcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY29tbWFuZENsYXNzUmVmXHJcbiAqICBBIHJlZmVyZW5jZSB0byBhIHN1YmNsYXNzZWQgU2ltcGxlQ29tbWFuZCBvciBNYWNyb0NvbW1hbmQgY29uc3RydWN0b3JcclxuICovXHJcbk1hY3JvQ29tbWFuZC5wcm90b3R5cGUuYWRkU3ViQ29tbWFuZD0gZnVuY3Rpb24oY29tbWFuZENsYXNzUmVmKVxyXG57XHJcbiAgICB0aGlzLnN1YkNvbW1hbmRzLnB1c2goY29tbWFuZENsYXNzUmVmKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBFeGVjdXRlIHRoaXMgTWFjcm9Db21tYW5kcyAqU3ViQ29tbWFuZHMqXHJcbiAqXHJcbiAqIFRoZSAqU3ViQ29tbWFuZCpzIHdpbGwgYmUgY2FsbGVkIGluIEZpcnN0IEluIC8gRmlyc3QgT3V0IChGSUZPKSBvcmRlclxyXG4gKiBAcGFyYW0ge3B1cmVtdmMuTm90aWZpY2F0aW9ufSBub3RlXHJcbiAqICBUaGUgTm90aWZpY2F0aW9uIG9iamVjdCB0byBiZSBwYXNzZWQgdG8gZWFjaCAqU3ViQ29tbWFuZCpcclxuICovXHJcbk1hY3JvQ29tbWFuZC5wcm90b3R5cGUuZXhlY3V0ZT0gZnVuY3Rpb24obm90ZSlcclxue1xyXG4gICAgLy8gU0lDLSBUT0RPIG9wdGltaXplXHJcbiAgICB3aGlsZSh0aGlzLnN1YkNvbW1hbmRzLmxlbmd0aCA+IDApXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHJlZj0gdGhpcy5zdWJDb21tYW5kcy5zaGlmdCgpO1xyXG4gICAgICAgIHZhciBjbWQ9IG5ldyByZWY7XHJcbiAgICAgICAgY21kLmluaXRpYWxpemVOb3RpZmllcih0aGlzLm11bHRpdG9uS2V5KTtcclxuICAgICAgICBjbWQuZXhlY3V0ZShub3RlKTtcclxuICAgIH1cclxufTtcclxuLyoqXHJcbiAqIEBhdXRob3IgUHVyZU1WQyBKUyBOYXRpdmUgUG9ydCBieSBEYXZpZCBGb2xleSwgRnLDqWTDqXJpYyBTYXVuaWVyLCAmIEFsYWluIER1Y2hlc25lYXVcclxuICogQGF1dGhvciBDb3B5cmlnaHQoYykgMjAwNi0yMDEyIEZ1dHVyZXNjYWxlLCBJbmMuLCBTb21lIHJpZ2h0cyByZXNlcnZlZC5cclxuICpcclxuICogQGNsYXNzIHB1cmVtdmMuTWVkaWF0b3JcclxuICogQGV4dGVuZHMgcHVyZW12Yy5Ob3RpZmllclxyXG4gKlxyXG4gKiBBIGJhc2UgTWVkaWF0b3IgaW1wbGVtZW50YXRpb24uXHJcbiAqXHJcbiAqIEluIFB1cmVNVkMsIE1lZGlhdG9yIGNsYXNzZXMgYXJlIHVzZWQgdG8gbWVkaWF0ZSBjb21tdW5pY2F0aW9uIGJldHdlZW4gYSB2aWV3XHJcbiAqIGNvbXBvbmVudCBhbmQgdGhlIHJlc3Qgb2YgdGhlIGFwcGxpY2F0aW9uLlxyXG4gKlxyXG4gKiBBIE1lZGlhdG9yIHNob3VsZCBsaXN0ZW4gdG8gaXRzIHZpZXcgY29tcG9uZW50cyBmb3IgZXZlbnRzLCBhbmQgaGFuZGxlIHRoZW1cclxuICogYnkgc2VuZGluZyBub3RpZmljYXRpb25zICh0byBiZSBoYW5kbGVkIGJ5IG90aGVyIE1lZGlhdG9ycyxcclxuICoge0BsaW5rIHB1cmVtdmMuU2ltcGxlQ29tbWFuZCBTaW1wbGVDb21tYW5kc31cclxuICogb3JcclxuICoge0BsaW5rIHB1cmVtdmMuTWFjcm9Db21tYW5kIE1hY3JvQ29tbWFuZHN9KVxyXG4gKiBvciBwYXNzaW5nIGRhdGEgZnJvbSB0aGUgdmlldyBjb21wb25lbnQgZGlyZWN0bHkgdG8gYVxyXG4gKiB7QGxpbmsgcHVyZW12Yy5Qcm94eSBQcm94eX0sIHN1Y2ggYXMgc3VibWl0dGluZ1xyXG4gKiB0aGUgY29udGVudHMgb2YgYSBmb3JtIHRvIGEgc2VydmljZS5cclxuICpcclxuICogTWVkaWF0b3JzIHNob3VsZCBub3QgcGVyZm9ybSBidXNpbmVzcyBsb2dpYywgbWFpbnRhaW4gc3RhdGUgb3Igb3RoZXJcclxuICogaW5mb3JtYXRpb24gZm9yIGl0cyB2aWV3IGNvbXBvbmVudCwgb3IgYnJlYWsgdGhlIGVuY2Fwc3VsYXRpb24gb2YgdGhlIHZpZXdcclxuICogY29tcG9uZW50IGJ5IG1hbmlwdWxhdGluZyB0aGUgdmlldyBjb21wb25lbnQncyBjaGlsZHJlbi4gSXQgc2hvdWxkIG9ubHkgY2FsbFxyXG4gKiBtZXRob2RzIG9yIHNldCBwcm9wZXJ0aWVzIG9uIHRoZSB2aWV3IGNvbXBvbmVudC5cclxuICpcclxuICogVGhlIHZpZXcgY29tcG9uZW50IHNob3VsZCBlbmNhcHN1bGF0ZSBpdHMgb3duIGJlaGF2aW9yIGFuZCBpbXBsZW1lbnRhdGlvbiBieVxyXG4gKiBleHBvc2luZyBtZXRob2RzIGFuZCBwcm9wZXJ0aWVzIHRoYXQgdGhlIE1lZGlhdG9yIGNhbiBjYWxsIHdpdGhvdXQgaGF2aW5nIHRvXHJcbiAqIGtub3cgYWJvdXQgdGhlIHZpZXcgY29tcG9uZW50J3MgY2hpbGRyZW4uXHJcbiAqXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKiBAcGFyYW0ge3N0cmluZ30gW21lZGlhdG9yTmFtZV1cclxuICogIFRoZSBNZWRpYXRvcnMgbmFtZS4gVGhlIE1lZGlhdG9ycyBzdGF0aWMgI05BTUUgdmFsdWUgaXMgdXNlZCBieSBkZWZhdWx0XHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBbdmlld0NvbXBvbmVudF1cclxuICogIFRoZSBNZWRpYXRvcnMge0BsaW5rICNzZXRWaWV3Q29tcG9uZW50IHZpZXdDb21wb25lbnR9LlxyXG4gKi9cclxuZnVuY3Rpb24gTWVkaWF0b3IgKG1lZGlhdG9yTmFtZSwgdmlld0NvbXBvbmVudClcclxue1xyXG4gICAgdGhpcy5tZWRpYXRvck5hbWU9IG1lZGlhdG9yTmFtZSB8fCB0aGlzLmNvbnN0cnVjdG9yLk5BTUU7XHJcbiAgICB0aGlzLnZpZXdDb21wb25lbnQ9dmlld0NvbXBvbmVudDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAc3RhdGljXHJcbiAqIFRoZSBuYW1lIG9mIHRoZSBNZWRpYXRvci5cclxuICpcclxuICogVHlwaWNhbGx5LCBhIE1lZGlhdG9yIHdpbGwgYmUgd3JpdHRlbiB0byBzZXJ2ZSBvbmUgc3BlY2lmaWMgY29udHJvbCBvciBncm91cFxyXG4gKiBvZiBjb250cm9scyBhbmQgc28sIHdpbGwgbm90IGhhdmUgYSBuZWVkIHRvIGJlIGR5bmFtaWNhbGx5IG5hbWVkLlxyXG4gKlxyXG4gKiBAdHlwZSB7c3RyaW5nfVxyXG4gKi9cclxuTWVkaWF0b3IuTkFNRT0gXCJNZWRpYXRvclwiO1xyXG5cclxuLyogc3ViY2xhc3MgKi9cclxuTWVkaWF0b3IucHJvdG90eXBlPSBuZXcgTm90aWZpZXI7XHJcbk1lZGlhdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj0gTWVkaWF0b3I7XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBuYW1lIG9mIHRoZSBNZWRpYXRvclxyXG4gKlxyXG4gKiBAcmV0dXJuIHtzdHJpbmd9XHJcbiAqICBUaGUgTWVkaWF0b3IgbmFtZVxyXG4gKi9cclxuTWVkaWF0b3IucHJvdG90eXBlLmdldE1lZGlhdG9yTmFtZT0gZnVuY3Rpb24gKClcclxue1xyXG4gICAgcmV0dXJuIHRoaXMubWVkaWF0b3JOYW1lO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNldCB0aGUgTWVkaWF0b3JzIHZpZXcgY29tcG9uZW50LiBUaGlzIGNvdWxkXHJcbiAqIGJlIGEgSFRNTEVsZW1lbnQsIGEgYmVzcG9rZSBVaUNvbXBvbmVudCB3cmFwcGVyXHJcbiAqIGNsYXNzLCBhIE1vb1Rvb2xzIEVsZW1lbnQsIGEgalF1ZXJ5IHJlc3VsdCBvciBhXHJcbiAqIGNzcyBzZWxlY3RvciwgZGVwZW5kaW5nIG9uIHdoaWNoIERPTSBhYnN0cmFjdGlvblxyXG4gKiBsaWJyYXJ5IHlvdSBhcmUgdXNpbmcuXHJcbiAqXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGUgdmlldyBjb21wb25lbnRcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbk1lZGlhdG9yLnByb3RvdHlwZS5zZXRWaWV3Q29tcG9uZW50PSBmdW5jdGlvbiAodmlld0NvbXBvbmVudClcclxue1xyXG4gICAgdGhpcy52aWV3Q29tcG9uZW50PSB2aWV3Q29tcG9uZW50O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgTWVkaWF0b3JzIHZpZXcgY29tcG9uZW50LlxyXG4gKlxyXG4gKiBBZGRpdGlvbmFsbHksIGFuIG9wdGlvbmFsIGV4cGxpY2l0IGdldHRlciBjYW4gYmVcclxuICogYmUgZGVmaW5lZCBpbiB0aGUgc3ViY2xhc3MgdGhhdCBkZWZpbmVzIHRoZVxyXG4gKiB2aWV3IGNvbXBvbmVudHMsIHByb3ZpZGluZyBhIG1vcmUgc2VtYW50aWMgaW50ZXJmYWNlXHJcbiAqIHRvIHRoZSBNZWRpYXRvci5cclxuICpcclxuICogVGhpcyBpcyBkaWZmZXJlbnQgZnJvbSB0aGUgQVMzIGltcGxlbWVudGF0aW9uIGluXHJcbiAqIHRoZSBzZW5zZSB0aGF0IG5vIGNhc3RpbmcgaXMgcmVxdWlyZWQgZnJvbSB0aGVcclxuICogb2JqZWN0IHN1cHBsaWVkIGFzIHRoZSB2aWV3IGNvbXBvbmVudC5cclxuICpcclxuICogICAgIE15TWVkaWF0b3IucHJvdG90eXBlLmdldENvbWJvQm94PSBmdW5jdGlvbiAoKVxyXG4gKiAgICAge1xyXG4gKiAgICAgICAgIHJldHVybiB0aGlzLnZpZXdDb21wb25lbnQ7ICBcclxuICogICAgIH1cclxuICpcclxuICogQHJldHVybiB7T2JqZWN0fVxyXG4gKiAgVGhlIHZpZXcgY29tcG9uZW50XHJcbiAqL1xyXG5NZWRpYXRvci5wcm90b3R5cGUuZ2V0Vmlld0NvbXBvbmVudD0gZnVuY3Rpb24gKClcclxue1xyXG4gICAgcmV0dXJuIHRoaXMudmlld0NvbXBvbmVudDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBMaXN0IHRoZSBOb3RpZmljYXRpb24gbmFtZXMgdGhpcyBNZWRpYXRvciBpcyBpbnRlcmVzdGVkXHJcbiAqIGluIGJlaW5nIG5vdGlmaWVkIG9mLlxyXG4gKlxyXG4gKiBAcmV0dXJuIHtBcnJheX1cclxuICogIFRoZSBsaXN0IG9mIE5vdGlmaWNhdGlvbiBuYW1lcy5cclxuICovXHJcbk1lZGlhdG9yLnByb3RvdHlwZS5saXN0Tm90aWZpY2F0aW9uSW50ZXJlc3RzPSBmdW5jdGlvbiAoKVxyXG57XHJcbiAgICByZXR1cm4gW107XHJcbn07XHJcblxyXG4vKipcclxuICogSGFuZGxlIE5vdGlmaWNhdGlvbnMuXHJcbiAqXHJcbiAqIFR5cGljYWxseSB0aGlzIHdpbGwgYmUgaGFuZGxlZCBpbiBhIHN3aXRjaCBzdGF0ZW1lbnRcclxuICogd2l0aCBvbmUgJ2Nhc2UnIGVudHJ5IHBlciBOb3RpZmljYXRpb24gdGhlIE1lZGlhdG9yXHJcbiAqIGlzIGludGVyZXN0ZWQgaW5cclxuICpcclxuICogQHBhcmFtIHtwdXJlbXZjLk5vdGlmaWNhdGlvbn0gbm90aWZpY2F0aW9uXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5NZWRpYXRvci5wcm90b3R5cGUuaGFuZGxlTm90aWZpY2F0aW9uPSBmdW5jdGlvbiAobm90aWZpY2F0aW9uKVxyXG57XHJcbiAgICByZXR1cm47XHJcbn07XHJcblxyXG4vKipcclxuICogQ2FsbGVkIGJ5IHRoZSBWaWV3IHdoZW4gdGhlIE1lZGlhdG9yIGlzIHJlZ2lzdGVyZWRcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbk1lZGlhdG9yLnByb3RvdHlwZS5vblJlZ2lzdGVyPSBmdW5jdGlvbiAoKVxyXG57XHJcbiAgICByZXR1cm47XHJcbn07XHJcblxyXG4vKipcclxuICogQ2FsbGVkIGJ5IHRoZSBWaWV3IHdoZW4gdGhlIE1lZGlhdG9yIGlzIHJlbW92ZWRcclxuICovXHJcbk1lZGlhdG9yLnByb3RvdHlwZS5vblJlbW92ZT0gZnVuY3Rpb24gKClcclxue1xyXG4gICAgcmV0dXJuO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICogVGhlIE1lZGlhdG9ycyBuYW1lLiBTaG91bGQgb25seSBiZSBhY2Nlc3NlZCBieSBNZWRpYXRvciBzdWJjbGFzc2VzLlxyXG4gKlxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEB0eXBlIHN0cmluZ1xyXG4gKi9cclxuTWVkaWF0b3IucHJvdG90eXBlLm1lZGlhdG9yTmFtZT0gbnVsbDtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqIFRoZSBNZWRpYXRvcnMgdmlld0NvbXBvbmVudC4gU2hvdWxkIG9ubHkgYmUgYWNjZXNzZWQgYnkgTWVkaWF0b3Igc3ViY2xhc3Nlcy5cclxuICpcclxuICogQHByb3RlY3RlZFxyXG4gKiBAdHlwZSBPYmplY3RcclxuICovXHJcbk1lZGlhdG9yLnByb3RvdHlwZS52aWV3Q29tcG9uZW50PW51bGw7XHJcbi8qKlxyXG4gKiBAYXV0aG9yIFB1cmVNVkMgSlMgTmF0aXZlIFBvcnQgYnkgRGF2aWQgRm9sZXksIEZyw6lkw6lyaWMgU2F1bmllciwgJiBBbGFpbiBEdWNoZXNuZWF1XHJcbiAqIEBhdXRob3IgQ29weXJpZ2h0KGMpIDIwMDYtMjAxMiBGdXR1cmVzY2FsZSwgSW5jLiwgU29tZSByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIEBjbGFzcyBwdXJlbXZjLlByb3h5XHJcbiAqIEBleHRlbmRzIHB1cmVtdmMuTm90aWZpZXJcclxuICpcclxuICogQSBiYXNlIFByb3h5IGltcGxlbWVudGF0aW9uLlxyXG4gKlxyXG4gKiBJbiBQdXJlTVZDLCBQcm94eSBjbGFzc2VzIGFyZSB1c2VkIHRvIG1hbmFnZSBwYXJ0cyBvZiB0aGUgYXBwbGljYXRpb24ncyBkYXRhXHJcbiAqIG1vZGVsLlxyXG4gKlxyXG4gKiBBIFByb3h5IG1pZ2h0IHNpbXBseSBtYW5hZ2UgYSByZWZlcmVuY2UgdG8gYSBsb2NhbCBkYXRhIG9iamVjdCwgaW4gd2hpY2ggY2FzZVxyXG4gKiBpbnRlcmFjdGluZyB3aXRoIGl0IG1pZ2h0IGludm9sdmUgc2V0dGluZyBhbmQgZ2V0dGluZyBvZiBpdHMgZGF0YSBpblxyXG4gKiBzeW5jaHJvbm91cyBmYXNoaW9uLlxyXG4gKlxyXG4gKiBQcm94eSBjbGFzc2VzIGFyZSBhbHNvIHVzZWQgdG8gZW5jYXBzdWxhdGUgdGhlIGFwcGxpY2F0aW9uJ3MgaW50ZXJhY3Rpb24gd2l0aFxyXG4gKiByZW1vdGUgc2VydmljZXMgdG8gc2F2ZSBvciByZXRyaWV2ZSBkYXRhLCBpbiB3aGljaCBjYXNlLCB3ZSBhZG9wdCBhblxyXG4gKiBhc3luY3Jvbm91cyBpZGlvbTsgc2V0dGluZyBkYXRhIChvciBjYWxsaW5nIGEgbWV0aG9kKSBvbiB0aGUgUHJveHkgYW5kXHJcbiAqIGxpc3RlbmluZyBmb3IgYVxyXG4gKiB7QGxpbmsgcHVyZW12Yy5Ob3RpZmljYXRpb24gTm90aWZpY2F0aW9ufVxyXG4gKiB0byBiZSBzZW50ICB3aGVuIHRoZSBQcm94eSBoYXMgcmV0cmlldmVkIHRoZSBkYXRhIGZyb20gdGhlIHNlcnZpY2UuXHJcbiAqXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbcHJveHlOYW1lXVxyXG4gKiAgVGhlIFByb3h5J3MgbmFtZS4gSWYgbm9uZSBpcyBwcm92aWRlZCwgdGhlIFByb3h5IHdpbGwgdXNlIGl0cyBjb25zdHJ1Y3RvcnNcclxuICogIE5BTUUgcHJvcGVydHkuXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBbZGF0YV1cclxuICogIFRoZSBQcm94eSdzIGRhdGEgb2JqZWN0XHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gUHJveHkocHJveHlOYW1lLCBkYXRhKVxyXG57XHJcbiAgICB0aGlzLnByb3h5TmFtZT0gcHJveHlOYW1lIHx8IHRoaXMuY29uc3RydWN0b3IuTkFNRTtcclxuICAgIGlmKGRhdGEgIT0gbnVsbClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnNldERhdGEoZGF0YSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuUHJveHkuTkFNRT0gXCJQcm94eVwiO1xyXG5cclxuUHJveHkucHJvdG90eXBlPSBuZXcgTm90aWZpZXI7XHJcblByb3h5LnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj0gUHJveHk7XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBQcm94eSdzIG5hbWUuXHJcbiAqXHJcbiAqIEByZXR1cm4ge3N0cmluZ31cclxuICovXHJcblByb3h5LnByb3RvdHlwZS5nZXRQcm94eU5hbWU9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgcmV0dXJuIHRoaXMucHJveHlOYW1lO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNldCB0aGUgUHJveHkncyBkYXRhIG9iamVjdFxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gZGF0YVxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuUHJveHkucHJvdG90eXBlLnNldERhdGE9IGZ1bmN0aW9uKGRhdGEpXHJcbntcclxuICAgIHRoaXMuZGF0YT0gZGF0YTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIFByb3h5J3MgZGF0YSBvYmplY3RcclxuICpcclxuICogQHJldHVybiB7T2JqZWN0fVxyXG4gKi9cclxuUHJveHkucHJvdG90eXBlLmdldERhdGE9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgcmV0dXJuIHRoaXMuZGF0YTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDYWxsZWQgYnkgdGhlIHtAbGluayBwdXJlbXZjLk1vZGVsIE1vZGVsfSB3aGVuXHJcbiAqIHRoZSBQcm94eSBpcyByZWdpc3RlcmVkLlxyXG4gKlxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuUHJveHkucHJvdG90eXBlLm9uUmVnaXN0ZXI9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgcmV0dXJuO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENhbGxlZCBieSB0aGUge0BsaW5rIHB1cmVtdmMuTW9kZWwgTW9kZWx9IHdoZW5cclxuICogdGhlIFByb3h5IGlzIHJlbW92ZWQuXHJcbiAqXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5Qcm94eS5wcm90b3R5cGUub25SZW1vdmU9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgcmV0dXJuO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICogVGhlIFByb3h5cyBuYW1lLlxyXG4gKlxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEB0eXBlIFN0cmluZ1xyXG4gKi9cclxuUHJveHkucHJvdG90eXBlLnByb3h5TmFtZT0gbnVsbDtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqIFRoZSBQcm94eSdzIGRhdGEgb2JqZWN0LlxyXG4gKlxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEB0eXBlIE9iamVjdFxyXG4gKi9cclxuUHJveHkucHJvdG90eXBlLmRhdGE9IG51bGw7XHJcbi8qKlxyXG4gKiBAYXV0aG9yIFB1cmVNVkMgSlMgTmF0aXZlIFBvcnQgYnkgRGF2aWQgRm9sZXksIEZyw6lkw6lyaWMgU2F1bmllciwgJiBBbGFpbiBEdWNoZXNuZWF1XHJcbiAqIEBhdXRob3IgQ29weXJpZ2h0KGMpIDIwMDYtMjAxMiBGdXR1cmVzY2FsZSwgSW5jLiwgU29tZSByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIEBjbGFzcyBwdXJlbXZjLkZhY2FkZVxyXG4gKiBGYWNhZGUgZXhwb3NlcyB0aGUgZnVuY3Rpb25hbGl0eSBvZiB0aGUgQ29udHJvbGxlciwgTW9kZWwgYW5kIFZpZXdcclxuICogYWN0b3JzIHRvIGNsaWVudCBmYWNpbmcgY29kZS5cclxuICpcclxuICogVGhpcyBGYWNhZGUgaW1wbGVtZW50YXRpb24gaXMgYSBNdWx0aXRvbiwgc28geW91IHNob3VsZCBub3QgY2FsbCB0aGVcclxuICogY29uc3RydWN0b3IgZGlyZWN0bHksIGJ1dCBpbnN0ZWFkIGNhbGwgdGhlIHN0YXRpYyBGYWN0b3J5IG1ldGhvZCxcclxuICogcGFzc2luZyB0aGUgdW5pcXVlIGtleSBmb3IgdGhpcyBpbnN0YW5jZSB0byAjZ2V0SW5zdGFuY2VcclxuICpcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcclxuICogXHRUaGUgbXVsdGl0b24ga2V5IHRvIHVzZSB0byByZXRyaWV2ZSB0aGUgRmFjYWRlIGluc3RhbmNlLlxyXG4gKiBAdGhyb3dzIHtFcnJvcn1cclxuICogIElmIGFuIGF0dGVtcHQgaXMgbWFkZSB0byBpbnN0YW50aWF0ZSBGYWNhZGUgZGlyZWN0bHlcclxuICovXHJcbmZ1bmN0aW9uIEZhY2FkZShrZXkpXHJcbntcclxuICAgIGlmKEZhY2FkZS5pbnN0YW5jZU1hcFtrZXldICE9IG51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKEZhY2FkZS5NVUxUSVRPTl9NU0cpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuaW5pdGlhbGl6ZU5vdGlmaWVyKGtleSk7XHJcbiAgICBGYWNhZGUuaW5zdGFuY2VNYXBba2V5XSA9IHRoaXM7XHJcbiAgICB0aGlzLmluaXRpYWxpemVGYWNhZGUoKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBJbml0aWFsaXplIHRoZSBNdWx0aXRvbiBGYWNhZGUgaW5zdGFuY2UuXHJcbiAqXHJcbiAqIENhbGxlZCBhdXRvbWF0aWNhbGx5IGJ5IHRoZSBjb25zdHJ1Y3Rvci4gT3ZlcnJpZGUgaW4geW91ciBzdWJjbGFzcyB0byBhbnlcclxuICogc3ViY2xhc3Mgc3BlY2lmaWMgaW5pdGlhbGl6YXRpb25zLiBCZSBzdXJlIHRvIGNhbGwgdGhlICdzdXBlcidcclxuICogaW5pdGlhbGl6ZUZhY2FkZSBtZXRob2QsIHRob3VnaFxyXG4gKlxyXG4gKiAgICAgTXlGYWNhZGUucHJvdG90eXBlLmluaXRpYWxpemVGYWNhZGU9IGZ1bmN0aW9uICgpXHJcbiAqICAgICB7XHJcbiAqICAgICAgICAgRmFjYWRlLmNhbGwodGhpcyk7XHJcbiAqICAgICB9O1xyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5GYWNhZGUucHJvdG90eXBlLmluaXRpYWxpemVGYWNhZGUgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHRoaXMuaW5pdGlhbGl6ZU1vZGVsKCk7XHJcbiAgICB0aGlzLmluaXRpYWxpemVDb250cm9sbGVyKCk7XHJcbiAgICB0aGlzLmluaXRpYWxpemVWaWV3KCk7XHJcbn07XHJcblxyXG4vKipcclxuICogRmFjYWRlIE11bHRpdG9uIEZhY3RvcnkgbWV0aG9kLlxyXG4gKiBOb3RlIHRoYXQgdGhpcyBtZXRob2Qgd2lsbCByZXR1cm4gbnVsbCBpZiBzdXBwbGllZCBhXHJcbiAqIG51bGwgb3IgdW5kZWZpbmVkIG11bHRpdG9uIGtleS5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IGtleVxyXG4gKiBcdFRoZSBtdWx0aXRvbiBrZXkgdXNlIHRvIHJldHJpZXZlIGEgcGFydGljdWxhciBGYWNhZGUgaW5zdGFuY2VcclxuICogQHJldHVybiB7cHVyZW12Yy5GYWNhZGV9XHJcbiAqL1xyXG5GYWNhZGUuZ2V0SW5zdGFuY2UgPSBmdW5jdGlvbihrZXkpXHJcbntcclxuICAgIGlmIChudWxsID09IGtleSlcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuXHJcbiAgICBpZihGYWNhZGUuaW5zdGFuY2VNYXBba2V5XSA9PSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIEZhY2FkZS5pbnN0YW5jZU1hcFtrZXldID0gbmV3IEZhY2FkZShrZXkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBGYWNhZGUuaW5zdGFuY2VNYXBba2V5XTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBJbml0aWFsaXplIHRoZSB7QGxpbmsgcHVyZW12Yy5Db250cm9sbGVyIENvbnRyb2xsZXJ9LlxyXG4gKlxyXG4gKiBDYWxsZWQgYnkgdGhlICNpbml0aWFsaXplRmFjYWRlIG1ldGhvZC5cclxuICpcclxuICogT3ZlcnJpZGUgdGhpcyBtZXRob2QgaW4geW91ciBzdWJjbGFzcyBvZiBGYWNhZGVcclxuICogaWYgb25lIG9yIGJvdGggb2YgdGhlIGZvbGxvd2luZyBhcmUgdHJ1ZTpcclxuICogLSBZb3Ugd2lzaCB0byBpbml0aWFsaXplIGEgZGlmZmVyZW50IENvbnRyb2xsZXJcclxuICogLSBZb3UgaGF2ZVxyXG4gKiB7QGxpbmsgcHVyZW12Yy5TaW1wbGVDb21tYW5kIFNpbXBsZUNvbW1hbmR9c1xyXG4gKiBvciB7QGxpbmsgcHVyZW12Yy5NYWNyb0NvbW1hbmQgTWFjcm9Db21tYW5kfXNcclxuICogdG8gcmVnaXN0ZXIgd2l0aCB0aGUgQ29udHJvbGxlcmF0IHN0YXJ0dXAuXHJcbiAqXHJcbiAqIElmIHlvdSBkb24ndCB3YW50IHRvIGluaXRpYWxpemUgYSBkaWZmZXJlbnQgQ29udHJvbGxlcixcclxuICogY2FsbCB0aGUgJ3N1cGVyJyBpbml0aWFsaXplQ29udHJvbGxlIG1ldGhvZCBhdCB0aGUgYmVnaW5uaW5nIG9mIHlvdXJcclxuICogbWV0aG9kLCB0aGVuIHJlZ2lzdGVyIGNvbW1hbmRzLlxyXG4gKlxyXG4gKiAgICAgTXlGYWNhZGUucHJvdG90eXBlLmluaXRpYWxpemVDb250cm9sbGVyPSBmdW5jdGlvbiAoKVxyXG4gKiAgICAge1xyXG4gKiAgICAgICAgIEZhY2FkZS5wcm90b3R5cGUuaW5pdGlhbGl6ZUNvbnRyb2xsZXIuY2FsbCh0aGlzKTtcclxuICogICAgICAgICB0aGlzLnJlZ2lzdGVyQ29tbWFuZChBcHBDb25zdGFudHMuQV9OT1RFX05BTUUsIEFCZXNwb2tlQ29tbWFuZClcclxuICogICAgIH1cclxuICpcclxuICogQHByb3RlY3RlZFxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuRmFjYWRlLnByb3RvdHlwZS5pbml0aWFsaXplQ29udHJvbGxlciA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgaWYodGhpcy5jb250cm9sbGVyICE9IG51bGwpXHJcbiAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgIHRoaXMuY29udHJvbGxlciA9IENvbnRyb2xsZXIuZ2V0SW5zdGFuY2UodGhpcy5tdWx0aXRvbktleSk7XHJcbn07XHJcblxyXG4vKipcclxuICogQHByb3RlY3RlZFxyXG4gKiBJbml0aWFsaXplIHRoZSB7QGxpbmsgcHVyZW12Yy5Nb2RlbCBNb2RlbH07XHJcbiAqXHJcbiAqIENhbGxlZCBieSB0aGUgI2luaXRpYWxpemVGYWNhZGUgbWV0aG9kLlxyXG4gKiBPdmVycmlkZSB0aGlzIG1ldGhvZCBpbiB5b3VyIHN1YmNsYXNzIG9mIEZhY2FkZSBpZiBvbmUgb2YgdGhlIGZvbGxvd2luZyBhcmVcclxuICogdHJ1ZTpcclxuICpcclxuICogLSBZb3Ugd2lzaCB0byBpbml0aWFsaXplIGEgZGlmZmVyZW50IE1vZGVsLlxyXG4gKlxyXG4gKiAtIFlvdSBoYXZlIHtAbGluayBwdXJlbXZjLlByb3h5IFByb3h5fXMgdG9cclxuICogICByZWdpc3RlciB3aXRoIHRoZSBNb2RlbCB0aGF0IGRvIG5vdCByZXRyaWV2ZSBhIHJlZmVyZW5jZSB0byB0aGUgRmFjYWRlIGF0XHJcbiAqICAgY29uc3RydWN0aW9uIHRpbWUuXHJcbiAqXHJcbiAqIElmIHlvdSBkb24ndCB3YW50IHRvIGluaXRpYWxpemUgYSBkaWZmZXJlbnQgTW9kZWxcclxuICogY2FsbCAnc3VwZXInICNpbml0aWFsaXplTW9kZWwgYXQgdGhlIGJlZ2lubmluZyBvZiB5b3VyIG1ldGhvZCwgdGhlbiByZWdpc3RlclxyXG4gKiBQcm94eXMuXHJcbiAqXHJcbiAqIE5vdGU6IFRoaXMgbWV0aG9kIGlzICpyYXJlbHkqIG92ZXJyaWRkZW47IGluIHByYWN0aWNlIHlvdSBhcmUgbW9yZVxyXG4gKiBsaWtlbHkgdG8gdXNlIGEgY29tbWFuZCB0byBjcmVhdGUgYW5kIHJlZ2lzdGVyUHJveHlzIHdpdGggdGhlIE1vZGVsPixcclxuICogc2luY2UgUHJveHlzIHdpdGggbXV0YWJsZSBkYXRhIHdpbGwgbGlrZWx5XHJcbiAqIG5lZWQgdG8gc2VuZCBOb3RpZmljYXRpb25zIGFuZCB0aHVzIHdpbGwgbGlrZWx5IHdhbnQgdG8gZmV0Y2ggYSByZWZlcmVuY2UgdG9cclxuICogdGhlIEZhY2FkZSBkdXJpbmcgdGhlaXIgY29uc3RydWN0aW9uLlxyXG4gKlxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuRmFjYWRlLnByb3RvdHlwZS5pbml0aWFsaXplTW9kZWwgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIGlmKHRoaXMubW9kZWwgIT0gbnVsbClcclxuICAgICAgICByZXR1cm47XHJcblxyXG4gICAgdGhpcy5tb2RlbCA9IE1vZGVsLmdldEluc3RhbmNlKHRoaXMubXVsdGl0b25LZXkpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICpcclxuICogSW5pdGlhbGl6ZSB0aGUge0BsaW5rIHB1cmVtdmMuVmlldyBWaWV3fS5cclxuICpcclxuICogQ2FsbGVkIGJ5IHRoZSAjaW5pdGlhbGl6ZUZhY2FkZSBtZXRob2QuXHJcbiAqXHJcbiAqIE92ZXJyaWRlIHRoaXMgbWV0aG9kIGluIHlvdXIgc3ViY2xhc3Mgb2YgRmFjYWRlIGlmIG9uZSBvciBib3RoIG9mIHRoZVxyXG4gKiBmb2xsb3dpbmcgYXJlIHRydWU6XHJcbiAqXHJcbiAqIC0gWW91IHdpc2ggdG8gaW5pdGlhbGl6ZSBhIGRpZmZlcmVudCBWaWV3LlxyXG4gKiAtIFlvdSBoYXZlIE9ic2VydmVycyB0byByZWdpc3RlciB3aXRoIHRoZSBWaWV3XHJcbiAqXHJcbiAqIElmIHlvdSBkb24ndCB3YW50IHRvIGluaXRpYWxpemUgYSBkaWZmZXJlbnQgVmlld1xyXG4gKiBjYWxsICdzdXBlcicgI2luaXRpYWxpemVWaWV3IGF0IHRoZSBiZWdpbm5pbmcgb2YgeW91clxyXG4gKiBtZXRob2QsIHRoZW4gcmVnaXN0ZXIgTWVkaWF0b3IgaW5zdGFuY2VzLlxyXG4gKlxyXG4gKiAgICAgTXlGYWNhZGUucHJvdG90eXBlLmluaXRpYWxpemVWaWV3PSBmdW5jdGlvbiAoKVxyXG4gKiAgICAge1xyXG4gKiAgICAgICAgIEZhY2FkZS5wcm90b3R5cGUuaW5pdGlhbGl6ZVZpZXcuY2FsbCh0aGlzKTtcclxuICogICAgICAgICB0aGlzLnJlZ2lzdGVyTWVkaWF0b3IobmV3IE15TWVkaWF0b3IoKSk7XHJcbiAqICAgICB9O1xyXG4gKlxyXG4gKiBOb3RlOiBUaGlzIG1ldGhvZCBpcyAqcmFyZWx5KiBvdmVycmlkZGVuOyBpbiBwcmFjdGljZSB5b3UgYXJlIG1vcmVcclxuICogbGlrZWx5IHRvIHVzZSBhIGNvbW1hbmQgdG8gY3JlYXRlIGFuZCByZWdpc3RlciBNZWRpYXRvcnNcclxuICogd2l0aCB0aGUgVmlldywgc2luY2UgTWVkaWF0b3IgaW5zdGFuY2VzIHdpbGwgbmVlZCB0byBzZW5kXHJcbiAqIE5vdGlmaWNhdGlvbnMgYW5kIHRodXMgd2lsbCBsaWtlbHkgd2FudCB0byBmZXRjaCBhIHJlZmVyZW5jZVxyXG4gKiB0byB0aGUgRmFjYWRlIGR1cmluZyB0aGVpciBjb25zdHJ1Y3Rpb24uXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5GYWNhZGUucHJvdG90eXBlLmluaXRpYWxpemVWaWV3ID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICBpZih0aGlzLnZpZXcgIT0gbnVsbClcclxuICAgICAgICByZXR1cm47XHJcblxyXG4gICAgdGhpcy52aWV3ID0gVmlldy5nZXRJbnN0YW5jZSh0aGlzLm11bHRpdG9uS2V5KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZWdpc3RlciBhIGNvbW1hbmQgd2l0aCB0aGUgQ29udHJvbGxlciBieSBOb3RpZmljYXRpb24gbmFtZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbm90aWZpY2F0aW9uTmFtZVxyXG4gKiAgVGhlIG5hbWUgb2YgdGhlIE5vdGlmaWNhdGlvbiB0byBhc3NvY2lhdGUgdGhlIGNvbW1hbmQgd2l0aFxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb21tYW5kQ2xhc3NSZWZcclxuICogIEEgcmVmZXJlbmNlIG90IHRoZSBjb21tYW5kcyBjb25zdHJ1Y3Rvci5cclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbkZhY2FkZS5wcm90b3R5cGUucmVnaXN0ZXJDb21tYW5kID0gZnVuY3Rpb24obm90aWZpY2F0aW9uTmFtZSwgY29tbWFuZENsYXNzUmVmKVxyXG57XHJcbiAgICB0aGlzLmNvbnRyb2xsZXIucmVnaXN0ZXJDb21tYW5kKG5vdGlmaWNhdGlvbk5hbWUsIGNvbW1hbmRDbGFzc1JlZik7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlIGEgcHJldmlvdXNseSByZWdpc3RlcmVkIGNvbW1hbmQgdG8gTm90aWZpY2F0aW9uIG1hcHBpbmcgZnJvbSB0aGVcclxuICoge0BsaW5rIHB1cmVtdmMuQ29udHJvbGxlciNyZW1vdmVDb21tYW5kIENvbnRyb2xsZXJ9XHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBub3RpZmljYXRpb25OYW1lXHJcbiAqICBUaGUgbmFtZSBvZiB0aGUgdGhlIE5vdGlmaWNhdGlvbiB0byByZW1vdmUgZnJvbSB0aGUgY29tbWFuZCBtYXBwaW5nIGZvci5cclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbkZhY2FkZS5wcm90b3R5cGUucmVtb3ZlQ29tbWFuZCA9IGZ1bmN0aW9uKG5vdGlmaWNhdGlvbk5hbWUpXHJcbntcclxuICAgIHRoaXMuY29udHJvbGxlci5yZW1vdmVDb21tYW5kKG5vdGlmaWNhdGlvbk5hbWUpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIGEgY29tbWFuZCBpcyByZWdpc3RlcmVkIGZvciBhIGdpdmVuIG5vdGlmaWNhdGlvbi5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG5vdGlmaWNhdGlvbk5hbWVcclxuICogIEEgTm90aWZpY2F0aW9uIG5hbWVcclxuICogQHJldHVybiB7Ym9vbGVhbn1cclxuICogIFdoZXRoZXIgYSBjb21tYW4gaXMgY3VycmVudGx5IHJlZ2lzdGVyZWQgZm9yIHRoZSBnaXZlbiBub3RpZmljYXRpb25OYW1lXHJcbiAqL1xyXG5GYWNhZGUucHJvdG90eXBlLmhhc0NvbW1hbmQgPSBmdW5jdGlvbihub3RpZmljYXRpb25OYW1lKVxyXG57XHJcbiAgICByZXR1cm4gdGhpcy5jb250cm9sbGVyLmhhc0NvbW1hbmQobm90aWZpY2F0aW9uTmFtZSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVnaXN0ZXIgYSBQcm94eSB3aXRoIHRoZSB7QGxpbmsgcHVyZW12Yy5Nb2RlbCNyZWdpc3RlclByb3h5IE1vZGVsfVxyXG4gKiBieSBuYW1lLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3B1cmVtdmMuUHJveHl9IHByb3h5XHJcbiAqICBUaGUgUHJveHkgaW5zdGFuY2UgdG8gYmUgcmVnaXN0ZXJlZCB3aXRoIHRoZSBNb2RlbC5cclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbkZhY2FkZS5wcm90b3R5cGUucmVnaXN0ZXJQcm94eSA9IGZ1bmN0aW9uKHByb3h5KVxyXG57XHJcbiAgICB0aGlzLm1vZGVsLnJlZ2lzdGVyUHJveHkocHJveHkpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHJpZXZlIGEgUHJveHkgZnJvbSB0aGUgTW9kZWxcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHByb3h5TmFtZVxyXG4gKiBAcmV0dXJuIHtwdXJlbXZjLlByb3h5fVxyXG4gKi9cclxuRmFjYWRlLnByb3RvdHlwZS5yZXRyaWV2ZVByb3h5ID0gZnVuY3Rpb24ocHJveHlOYW1lKVxyXG57XHJcbiAgICByZXR1cm4gdGhpcy5tb2RlbC5yZXRyaWV2ZVByb3h5KHByb3h5TmFtZSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlIGEgUHJveHkgZnJvbSB0aGUgTW9kZWwgYnkgbmFtZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJveHlOYW1lXHJcbiAqICBUaGUgbmFtZSBvZiB0aGUgUHJveHlcclxuICogQHJldHVybiB7cHVyZW12Yy5Qcm94eX1cclxuICogIFRoZSBQcm94eSB0aGF0IHdhcyByZW1vdmVkIGZyb20gdGhlIE1vZGVsXHJcbiAqL1xyXG5GYWNhZGUucHJvdG90eXBlLnJlbW92ZVByb3h5ID0gZnVuY3Rpb24ocHJveHlOYW1lKVxyXG57XHJcbiAgICB2YXIgcHJveHkgPSBudWxsO1xyXG4gICAgaWYodGhpcy5tb2RlbCAhPSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIHByb3h5ID0gdGhpcy5tb2RlbC5yZW1vdmVQcm94eShwcm94eU5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBwcm94eTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDaGVjayBpdCBhIFByb3h5IGlzIHJlZ2lzdGVyZWQuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm94eU5hbWVcclxuICogIEEgUHJveHkgbmFtZVxyXG4gKiBAcmV0dXJuIHtib29sZWFufVxyXG4gKiAgV2hldGhlciBhIFByb3h5IGlzIGN1cnJlbnRseSByZWdpc3RlcmVkIHdpdGggdGhlIGdpdmVuIHByb3h5TmFtZVxyXG4gKi9cclxuRmFjYWRlLnByb3RvdHlwZS5oYXNQcm94eSA9IGZ1bmN0aW9uKHByb3h5TmFtZSlcclxue1xyXG4gICAgcmV0dXJuIHRoaXMubW9kZWwuaGFzUHJveHkocHJveHlOYW1lKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZWdpc3RlciBhIE1lZGlhdG9yIHdpdGggd2l0aCB0aGUgVmlldy5cclxuICpcclxuICogQHBhcmFtIHtwdXJlbXZjLk1lZGlhdG9yfSBtZWRpYXRvclxyXG4gKiAgQSByZWZlcmVuY2UgdG8gdGhlIE1lZGlhdG9yIHRvIHJlZ2lzdGVyXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5GYWNhZGUucHJvdG90eXBlLnJlZ2lzdGVyTWVkaWF0b3IgPSBmdW5jdGlvbihtZWRpYXRvcilcclxue1xyXG4gICAgaWYodGhpcy52aWV3ICE9IG51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy52aWV3LnJlZ2lzdGVyTWVkaWF0b3IobWVkaWF0b3IpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHJpZXZlIGEgTWVkaWF0b3IgZnJvbSB0aGUgVmlldyBieSBuYW1lXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZWRpYXRvck5hbWVcclxuICogIFRoZSBNZWRpYXRvcnMgbmFtZVxyXG4gKiBAcmV0dXJuIHtwdXJlbXZjLk1lZGlhdG9yfVxyXG4gKiAgVGhlIHJldHJpZXZlZCBNZWRpYXRvclxyXG4gKi9cclxuRmFjYWRlLnByb3RvdHlwZS5yZXRyaWV2ZU1lZGlhdG9yID0gZnVuY3Rpb24obWVkaWF0b3JOYW1lKVxyXG57XHJcbiAgICByZXR1cm4gdGhpcy52aWV3LnJldHJpZXZlTWVkaWF0b3IobWVkaWF0b3JOYW1lKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmUgYSBNZWRpYXRvciBmcm9tIHRoZSBWaWV3LlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVkaWF0b3JOYW1lXHJcbiAqICBUaGUgbmFtZSBvZiB0aGUgTWVkaWF0b3IgdG8gcmVtb3ZlLlxyXG4gKiBAcmV0dXJuIHtwdXJlbXZjLk1lZGlhdG9yfVxyXG4gKiAgVGhlIHJlbW92ZWQgTWVkaWF0b3JcclxuICovXHJcbkZhY2FkZS5wcm90b3R5cGUucmVtb3ZlTWVkaWF0b3IgPSBmdW5jdGlvbihtZWRpYXRvck5hbWUpXHJcbntcclxuICAgIHZhciBtZWRpYXRvciA9IG51bGw7XHJcbiAgICBpZih0aGlzLnZpZXcgIT0gbnVsbClcclxuICAgIHtcclxuICAgICAgICBtZWRpYXRvciA9IHRoaXMudmlldy5yZW1vdmVNZWRpYXRvcihtZWRpYXRvck5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBtZWRpYXRvcjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDaGVjayBpZiBhIE1lZGlhdG9yIGlzIHJlZ2lzdGVyZWQgb3Igbm90LlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVkaWF0b3JOYW1lXHJcbiAqICBBIE1lZGlhdG9yIG5hbWVcclxuICogQHJldHVybiB7Ym9vbGVhbn1cclxuICogIFdoZXRoZXIgYSBNZWRpYXRvciBpcyByZWdpc3RlcmVkIHdpdGggdGhlIGdpdmVuIG1lZGlhdG9yTmFtZVxyXG4gKi9cclxuRmFjYWRlLnByb3RvdHlwZS5oYXNNZWRpYXRvciA9IGZ1bmN0aW9uKG1lZGlhdG9yTmFtZSlcclxue1xyXG4gICAgcmV0dXJuIHRoaXMudmlldy5oYXNNZWRpYXRvcihtZWRpYXRvck5hbWUpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhbmQgc2VuZCBhXHJcbiAqIHtAbGluayBwdXJlbXZjLk5vdGlmaWNhdGlvbiBOb3RpZmljYXRpb259XHJcbiAqXHJcbiAqIEtlZXBzIHVzIGZyb20gaGF2aW5nIHRvIGNvbnN0cnVjdCBuZXcgTm90aWZpY2F0aW9uIGluc3RhbmNlcyBpbiBvdXJcclxuICogaW1wbGVtZW50YXRpb25cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG5vdGlmaWNhdGlvbk5hbWVcclxuICogIFRoZSBuYW1lIG9mIHRoZSBOb3RpZmljYXRpb24gdG8gc2VuZFxyXG4gKiBAcGFyYW0ge09iamVjdH0gW2JvZHldXHJcbiAqICBUaGUgYm9keSBvZiB0aGUgbm90aWZpY2F0aW9uXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbdHlwZV1cclxuICogIFRoZSB0eXBlIG9mIHRoZSBub3RpZmljYXRpb25cclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbkZhY2FkZS5wcm90b3R5cGUuc2VuZE5vdGlmaWNhdGlvbiA9IGZ1bmN0aW9uKG5vdGlmaWNhdGlvbk5hbWUsIGJvZHksIHR5cGUpXHJcbntcclxuICAgIHRoaXMubm90aWZ5T2JzZXJ2ZXJzKG5ldyBOb3RpZmljYXRpb24obm90aWZpY2F0aW9uTmFtZSwgYm9keSwgdHlwZSkpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIE5vdGlmeSB7QGxpbmsgcHVyZW12Yy5PYnNlcnZlciBPYnNlcnZlcn1zXHJcbiAqXHJcbiAqIFRoaXMgbWV0aG9kIGlzIGxlZnQgcHVibGljIG1vc3RseSBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eSwgYW5kIHRvIGFsbG93XHJcbiAqIHlvdSB0byBzZW5kIGN1c3RvbSBub3RpZmljYXRpb24gY2xhc3NlcyB1c2luZyB0aGUgZmFjYWRlLlxyXG4gKlxyXG4gKiBVc3VhbGx5IHlvdSBzaG91bGQganVzdCBjYWxsIHNlbmROb3RpZmljYXRpb24gYW5kIHBhc3MgdGhlIHBhcmFtZXRlcnMsIG5ldmVyXHJcbiAqIGhhdmluZyB0byBjb25zdHJ1Y3QgdGhlIG5vdGlmaWNhdGlvbiB5b3Vyc2VsZi5cclxuICpcclxuICogQHBhcmFtIHtwdXJlbXZjLk5vdGlmaWNhdGlvbn0gbm90aWZpY2F0aW9uXHJcbiAqICBUaGUgTm90aWZpY2F0aW9uIHRvIHNlbmRcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbkZhY2FkZS5wcm90b3R5cGUubm90aWZ5T2JzZXJ2ZXJzID0gZnVuY3Rpb24obm90aWZpY2F0aW9uKVxyXG57XHJcbiAgICBpZih0aGlzLnZpZXcgIT0gbnVsbClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnZpZXcubm90aWZ5T2JzZXJ2ZXJzKG5vdGlmaWNhdGlvbik7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogSW5pdGlhbGl6ZSB0aGUgRmFjYWRlcyBOb3RpZmllciBjYXBhYmlsaXRpZXMgYnkgc2V0dGluZyB0aGUgTXVsdGl0b24ga2V5IGZvclxyXG4gKiB0aGlzIGZhY2FkZSBpbnN0YW5jZS5cclxuICpcclxuICogTm90IGNhbGxlZCBkaXJlY3RseSwgYnV0IGluc3RlYWQgZnJvbSB0aGUgY29uc3RydWN0b3Igd2hlbiAjZ2V0SW5zdGFuY2UgaXNcclxuICogaW52b2tlZC4gSXQgaXMgbmVjZXNzYXJ5IHRvIGJlIHB1YmxpYyBpbiBvcmRlciB0byBpbXBsZW1lbnQgTm90aWZpZXJcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IGtleVxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuRmFjYWRlLnByb3RvdHlwZS5pbml0aWFsaXplTm90aWZpZXIgPSBmdW5jdGlvbihrZXkpXHJcbntcclxuICAgIHRoaXMubXVsdGl0b25LZXkgPSBrZXk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ2hlY2sgaWYgYSAqQ29yZSogaXMgcmVnaXN0ZXJlZCBvciBub3RcclxuICpcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5XHJcbiAqICBUaGUgbXVsdGl0b24ga2V5IGZvciB0aGUgKkNvcmUqIGluIHF1ZXN0aW9uXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAqICBXaGV0aGVyIGEgKkNvcmUqIGlzIHJlZ2lzdGVyZWQgd2l0aCB0aGUgZ2l2ZW4ga2V5XHJcbiAqL1xyXG5GYWNhZGUuaGFzQ29yZSA9IGZ1bmN0aW9uKGtleSlcclxue1xyXG4gICAgcmV0dXJuIEZhY2FkZS5pbnN0YW5jZU1hcFtrZXldICE9IG51bGw7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlIGEgKkNvcmUqXHJcbiAqXHJcbiAqIFJlbW92ZSB0aGUgTW9kZWwsIFZpZXcsIENvbnRyb2xsZXIgYW5kIEZhY2FkZSBmb3IgYSBnaXZlbiBrZXkuXHJcbiAqXHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtzdHJpbmd9IGtleVxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuRmFjYWRlLnJlbW92ZUNvcmUgPSBmdW5jdGlvbihrZXkpXHJcbntcclxuICAgIGlmKEZhY2FkZS5pbnN0YW5jZU1hcFtrZXldID09IG51bGwpXHJcbiAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgIE1vZGVsLnJlbW92ZU1vZGVsKGtleSk7XHJcbiAgICBWaWV3LnJlbW92ZVZpZXcoa2V5KTtcclxuICAgIENvbnRyb2xsZXIucmVtb3ZlQ29udHJvbGxlcihrZXkpO1xyXG4gICAgZGVsZXRlIEZhY2FkZS5pbnN0YW5jZU1hcFtrZXldO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICogVGhlIEZhY2FkZXMgY29ycmVzcG9uZGluZyBDb250cm9sbGVyXHJcbiAqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQHR5cGUgcHVyZW12Yy5Db250cm9sbGVyXHJcbiAqL1xyXG5GYWNhZGUucHJvdG90eXBlLmNvbnRyb2xsZXIgPSBudWxsO1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICogVGhlIEZhY2FkZXMgY29ycmVzcG9uZGluZyBNb2RlbCBpbnN0YW5jZVxyXG4gKlxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEB0eXBlIHB1cmVtdmMuTW9kZWxcclxuICovXHJcbkZhY2FkZS5wcm90b3R5cGUubW9kZWwgPSBudWxsO1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICogVGhlIEZhY2FkZXMgY29ycmVzcG5kaW5nIFZpZXcgaW5zdGFuY2UuXHJcbiAqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQHR5cGUgcHVyZW12Yy5WaWV3XHJcbiAqL1xyXG5GYWNhZGUucHJvdG90eXBlLnZpZXcgPSBudWxsO1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICogVGhlIEZhY2FkZXMgbXVsdGl0b24ga2V5LlxyXG4gKlxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEB0eXBlIHN0cmluZ1xyXG4gKi9cclxuRmFjYWRlLnByb3RvdHlwZS5tdWx0aXRvbktleSA9IG51bGw7XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKiBUaGUgTXVsdGl0b24gRmFjYWRlIGluc3RhbmNlIG1hcC5cclxuICogQHN0YXRpY1xyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEB0eXBlIEFycmF5XHJcbiAqL1xyXG5GYWNhZGUuaW5zdGFuY2VNYXAgPSBbXTtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqIE1lc3NhZ2UgQ29uc3RhbnRzXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQHR5cGUge3N0cmluZ31cclxuICogQGNvbnN0XHJcbiAqIEBzdGF0aWNcclxuICovXHJcbkZhY2FkZS5NVUxUSVRPTl9NU0cgPSBcIkZhY2FkZSBpbnN0YW5jZSBmb3IgdGhpcyBNdWx0aXRvbiBrZXkgYWxyZWFkeSBjb25zdHJ1Y3RlZCFcIjtcclxuLyoqXHJcbiAqIEBhdXRob3IgUHVyZU1WQyBKUyBOYXRpdmUgUG9ydCBieSBEYXZpZCBGb2xleSwgRnLDqWTDqXJpYyBTYXVuaWVyLCAmIEFsYWluIER1Y2hlc25lYXVcclxuICogQGF1dGhvciBDb3B5cmlnaHQoYykgMjAwNi0yMDEyIEZ1dHVyZXNjYWxlLCBJbmMuLCBTb21lIHJpZ2h0cyByZXNlcnZlZC5cclxuICpcclxuICogQGNsYXNzIHB1cmVtdmMuVmlld1xyXG4gKlxyXG4gKiBBIE11bHRpdG9uIFZpZXcgaW1wbGVtZW50YXRpb24uXHJcbiAqXHJcbiAqIEluIFB1cmVNVkMsIHRoZSBWaWV3IGNsYXNzIGFzc3VtZXMgdGhlc2UgcmVzcG9uc2liaWxpdGllc1xyXG4gKlxyXG4gKiAtIE1haW50YWluIGEgY2FjaGUgb2Yge0BsaW5rIHB1cmVtdmMuTWVkaWF0b3IgTWVkaWF0b3J9XHJcbiAqICAgaW5zdGFuY2VzLlxyXG4gKlxyXG4gKiAtIFByb3ZpZGUgbWV0aG9kcyBmb3IgcmVnaXN0ZXJpbmcsIHJldHJpZXZpbmcsIGFuZCByZW1vdmluZ1xyXG4gKiAgIHtAbGluayBwdXJlbXZjLk1lZGlhdG9yIE1lZGlhdG9yfS5cclxuICpcclxuICogLSBOb3RpZml5aW5nIHtAbGluayBwdXJlbXZjLk1lZGlhdG9yIE1lZGlhdG9yfSB3aGVuIHRoZXkgYXJlIHJlZ2lzdGVyZWQgb3JcclxuICogICByZW1vdmVkLlxyXG4gKlxyXG4gKiAtIE1hbmFnaW5nIHRoZSBvYnNlcnZlciBsaXN0cyBmb3IgZWFjaCB7QGxpbmsgcHVyZW12Yy5Ob3RpZmljYXRpb24gTm90aWZpY2F0aW9ufVxyXG4gKiAgIGluIHRoZSBhcHBsaWNhdGlvbi5cclxuICpcclxuICogLSBQcm92aWRpbmcgYSBtZXRob2QgZm9yIGF0dGFjaGluZyB7QGxpbmsgcHVyZW12Yy5PYnNlcnZlciBPYnNlcnZlcn0gdG8gYW5cclxuICogICB7QGxpbmsgcHVyZW12Yy5Ob3RpZmljYXRpb24gTm90aWZpY2F0aW9ufSdzIG9ic2VydmVyIGxpc3QuXHJcbiAqXHJcbiAqIC0gUHJvdmlkaW5nIGEgbWV0aG9kIGZvciBicm9hZGNhc3RpbmcgYSB7QGxpbmsgcHVyZW12Yy5Ob3RpZmljYXRpb24gTm90aWZpY2F0aW9ufS5cclxuICpcclxuICogLSBOb3RpZnlpbmcgdGhlIHtAbGluayBwdXJlbXZjLk9ic2VydmVyIE9ic2VydmVyfXMgb2YgYSBnaXZlblxyXG4gKiAgIHtAbGluayBwdXJlbXZjLk5vdGlmaWNhdGlvbiBOb3RpZmljYXRpb259IHdoZW4gaXQgYnJvYWRjYXN0LlxyXG4gKlxyXG4gKiBUaGlzIFZpZXcgaW1wbGVtZW50YXRpb24gaXMgYSBNdWx0aXRvbiwgc28geW91IHNob3VsZCBub3QgY2FsbCB0aGVcclxuICogY29uc3RydWN0b3IgZGlyZWN0bHksIGJ1dCBpbnN0ZWFkIGNhbGwgdGhlIHN0YXRpYyBNdWx0aXRvblxyXG4gKiBGYWN0b3J5ICNnZXRJbnN0YW5jZSBtZXRob2QuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqIEB0aHJvd3Mge0Vycm9yfVxyXG4gKiAgaWYgaW5zdGFuY2UgZm9yIHRoaXMgTXVsdGl0b24ga2V5IGhhcyBhbHJlYWR5IGJlZW4gY29uc3RydWN0ZWRcclxuICovXHJcbmZ1bmN0aW9uIFZpZXcoa2V5KVxyXG57XHJcbiAgICBpZihWaWV3Lmluc3RhbmNlTWFwW2tleV0gIT0gbnVsbClcclxuICAgIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoVmlldy5NVUxUSVRPTl9NU0cpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLm11bHRpdG9uS2V5ID0ga2V5O1xyXG4gICAgVmlldy5pbnN0YW5jZU1hcFt0aGlzLm11bHRpdG9uS2V5XSA9IHRoaXM7XHJcbiAgICB0aGlzLm1lZGlhdG9yTWFwID0gW107XHJcbiAgICB0aGlzLm9ic2VydmVyTWFwID0gW107XHJcbiAgICB0aGlzLmluaXRpYWxpemVWaWV3KCk7XHJcbn07XHJcblxyXG4vKipcclxuICogQHByb3RlY3RlZFxyXG4gKiBJbml0aWFsaXplIHRoZSBTaW5nbGV0b24gVmlldyBpbnN0YW5jZVxyXG4gKlxyXG4gKiBDYWxsZWQgYXV0b21hdGljYWxseSBieSB0aGUgY29uc3RydWN0b3IsIHRoaXMgaXMgeW91ciBvcHBvcnR1bml0eSB0b1xyXG4gKiBpbml0aWFsaXplIHRoZSBTaW5nbGV0b24gaW5zdGFuY2UgaW4geW91ciBzdWJjbGFzcyB3aXRob3V0IG92ZXJyaWRpbmcgdGhlXHJcbiAqIGNvbnN0cnVjdG9yXHJcbiAqXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5WaWV3LnByb3RvdHlwZS5pbml0aWFsaXplVmlldyA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgcmV0dXJuO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFZpZXcgU2luZ2xldG9uIEZhY3RvcnkgbWV0aG9kLlxyXG4gKiBOb3RlIHRoYXQgdGhpcyBtZXRob2Qgd2lsbCByZXR1cm4gbnVsbCBpZiBzdXBwbGllZCBhIG51bGxcclxuICogb3IgdW5kZWZpbmVkIG11bHRpdG9uIGtleS5cclxuICpcclxuICogQHJldHVybiB7cHVyZW12Yy5WaWV3fVxyXG4gKiAgVGhlIFNpbmdsZXRvbiBpbnN0YW5jZSBvZiBWaWV3XHJcbiAqL1xyXG5WaWV3LmdldEluc3RhbmNlID0gZnVuY3Rpb24oa2V5KVxyXG57XHJcbiAgICBpZiAobnVsbCA9PSBrZXkpXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgaWYoVmlldy5pbnN0YW5jZU1hcFtrZXldID09IG51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgVmlldy5pbnN0YW5jZU1hcFtrZXldID0gbmV3IFZpZXcoa2V5KTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIFZpZXcuaW5zdGFuY2VNYXBba2V5XTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZWdpc3RlciBhbiBPYnNlcnZlciB0byBiZSBub3RpZmllZCBvZiBOb3RpZmljYXRpb25zIHdpdGggYSBnaXZlbiBuYW1lXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBub3RpZmljYXRpb25OYW1lXHJcbiAqICBUaGUgbmFtZSBvZiB0aGUgTm90aWZpY2F0aW9ucyB0byBub3RpZnkgdGhpcyBPYnNlcnZlciBvZlxyXG4gKiBAcGFyYW0ge3B1cmVtdmMuT2JzZXJ2ZXJ9IG9ic2VydmVyXHJcbiAqICBUaGUgT2JzZXJ2ZXIgdG8gcmVnaXN0ZXIuXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5WaWV3LnByb3RvdHlwZS5yZWdpc3Rlck9ic2VydmVyID0gZnVuY3Rpb24obm90aWZpY2F0aW9uTmFtZSwgb2JzZXJ2ZXIpXHJcbntcclxuICAgIGlmKHRoaXMub2JzZXJ2ZXJNYXBbbm90aWZpY2F0aW9uTmFtZV0gIT0gbnVsbClcclxuICAgIHtcclxuICAgICAgICB0aGlzLm9ic2VydmVyTWFwW25vdGlmaWNhdGlvbk5hbWVdLnB1c2gob2JzZXJ2ZXIpO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMub2JzZXJ2ZXJNYXBbbm90aWZpY2F0aW9uTmFtZV0gPSBbb2JzZXJ2ZXJdO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIE5vdGlmeSB0aGUgT2JzZXJ2ZXJzZm9yIGEgcGFydGljdWxhciBOb3RpZmljYXRpb24uXHJcbiAqXHJcbiAqIEFsbCBwcmV2aW91c2x5IGF0dGFjaGVkIE9ic2VydmVycyBmb3IgdGhpcyBOb3RpZmljYXRpb24nc1xyXG4gKiBsaXN0IGFyZSBub3RpZmllZCBhbmQgYXJlIHBhc3NlZCBhIHJlZmVyZW5jZSB0byB0aGUgSU5vdGlmaWNhdGlvbiBpblxyXG4gKiB0aGUgb3JkZXIgaW4gd2hpY2ggdGhleSB3ZXJlIHJlZ2lzdGVyZWQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7cHVyZW12Yy5Ob3RpZmljYXRpb259IG5vdGlmaWNhdGlvblxyXG4gKiAgVGhlIE5vdGlmaWNhdGlvbiB0byBub3RpZnkgT2JzZXJ2ZXJzIG9mXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5WaWV3LnByb3RvdHlwZS5ub3RpZnlPYnNlcnZlcnMgPSBmdW5jdGlvbihub3RpZmljYXRpb24pXHJcbntcclxuICAgIC8vIFNJQ1xyXG4gICAgaWYodGhpcy5vYnNlcnZlck1hcFtub3RpZmljYXRpb24uZ2V0TmFtZSgpXSAhPSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBvYnNlcnZlcnNfcmVmID0gdGhpcy5vYnNlcnZlck1hcFtub3RpZmljYXRpb24uZ2V0TmFtZSgpXSwgb2JzZXJ2ZXJzID0gW10sIG9ic2VydmVyXHJcblxyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBvYnNlcnZlcnNfcmVmLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgb2JzZXJ2ZXIgPSBvYnNlcnZlcnNfcmVmW2ldO1xyXG4gICAgICAgICAgICBvYnNlcnZlcnMucHVzaChvYnNlcnZlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgb2JzZXJ2ZXJzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgb2JzZXJ2ZXIgPSBvYnNlcnZlcnNbaV07XHJcbiAgICAgICAgICAgIG9ic2VydmVyLm5vdGlmeU9ic2VydmVyKG5vdGlmaWNhdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSB0aGUgT2JzZXJ2ZXIgZm9yIGEgZ2l2ZW4gbm90aWZ5Q29udGV4dCBmcm9tIGFuIG9ic2VydmVyIGxpc3QgZm9yXHJcbiAqIGEgZ2l2ZW4gTm90aWZpY2F0aW9uIG5hbWVcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG5vdGlmaWNhdGlvbk5hbWVcclxuICogIFdoaWNoIG9ic2VydmVyIGxpc3QgdG8gcmVtb3ZlIGZyb21cclxuICogQHBhcmFtIHtPYmplY3R9IG5vdGlmeUNvbnRleHRcclxuICogIFJlbW92ZSB0aGUgT2JzZXJ2ZXIgd2l0aCB0aGlzIG9iamVjdCBhcyBpdHMgbm90aWZ5Q29udGV4dFxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuVmlldy5wcm90b3R5cGUucmVtb3ZlT2JzZXJ2ZXIgPSBmdW5jdGlvbihub3RpZmljYXRpb25OYW1lLCBub3RpZnlDb250ZXh0KVxyXG57XHJcbiAgICAvLyBTSUNcclxuICAgIHZhciBvYnNlcnZlcnMgPSB0aGlzLm9ic2VydmVyTWFwW25vdGlmaWNhdGlvbk5hbWVdO1xyXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IG9ic2VydmVycy5sZW5ndGg7IGkrKylcclxuICAgIHtcclxuICAgICAgICBpZihvYnNlcnZlcnNbaV0uY29tcGFyZU5vdGlmeUNvbnRleHQobm90aWZ5Q29udGV4dCkgPT0gdHJ1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG9ic2VydmVycy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZihvYnNlcnZlcnMubGVuZ3RoID09IDApXHJcbiAgICB7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMub2JzZXJ2ZXJNYXBbbm90aWZpY2F0aW9uTmFtZV07XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogUmVnaXN0ZXIgYSBNZWRpYXRvciBpbnN0YW5jZSB3aXRoIHRoZSBWaWV3LlxyXG4gKlxyXG4gKiBSZWdpc3RlcnMgdGhlIE1lZGlhdG9yIHNvIHRoYXQgaXQgY2FuIGJlIHJldHJpZXZlZCBieSBuYW1lLFxyXG4gKiBhbmQgZnVydGhlciBpbnRlcnJvZ2F0ZXMgdGhlIE1lZGlhdG9yIGZvciBpdHNcclxuICoge0BsaW5rIHB1cmVtdmMuTWVkaWF0b3IjbGlzdE5vdGlmaWNhdGlvbkludGVyZXN0cyBpbnRlcmVzdHN9LlxyXG4gKlxyXG4gKiBJZiB0aGUgTWVkaWF0b3IgcmV0dXJucyBhbnkgTm90aWZpY2F0aW9uXHJcbiAqIG5hbWVzIHRvIGJlIG5vdGlmaWVkIGFib3V0LCBhbiBPYnNlcnZlciBpcyBjcmVhdGVkIGVuY2Fwc3VsYXRpbmdcclxuICogdGhlIE1lZGlhdG9yIGluc3RhbmNlJ3NcclxuICoge0BsaW5rIHB1cmVtdmMuTWVkaWF0b3IjaGFuZGxlTm90aWZpY2F0aW9uIGhhbmRsZU5vdGlmaWNhdGlvbn1cclxuICogbWV0aG9kIGFuZCByZWdpc3RlcmluZyBpdCBhcyBhbiBPYnNlcnZlciBmb3IgYWxsIE5vdGlmaWNhdGlvbnMgdGhlXHJcbiAqIE1lZGlhdG9yIGlzIGludGVyZXN0ZWQgaW4uXHJcbiAqXHJcbiAqIEBwYXJhbSB7cHVyZW12Yy5NZWRpYXRvcn1cclxuICogIGEgcmVmZXJlbmNlIHRvIHRoZSBNZWRpYXRvciBpbnN0YW5jZVxyXG4gKi9cclxuVmlldy5wcm90b3R5cGUucmVnaXN0ZXJNZWRpYXRvciA9IGZ1bmN0aW9uKG1lZGlhdG9yKVxyXG57XHJcbiAgICBpZih0aGlzLm1lZGlhdG9yTWFwW21lZGlhdG9yLmdldE1lZGlhdG9yTmFtZSgpXSAhPSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBtZWRpYXRvci5pbml0aWFsaXplTm90aWZpZXIodGhpcy5tdWx0aXRvbktleSk7XHJcbiAgICAvLyByZWdpc3RlciB0aGUgbWVkaWF0b3IgZm9yIHJldHJpZXZhbCBieSBuYW1lXHJcbiAgICB0aGlzLm1lZGlhdG9yTWFwW21lZGlhdG9yLmdldE1lZGlhdG9yTmFtZSgpXSA9IG1lZGlhdG9yO1xyXG5cclxuICAgIC8vIGdldCBub3RpZmljYXRpb24gaW50ZXJlc3RzIGlmIGFueVxyXG4gICAgdmFyIGludGVyZXN0cyA9IG1lZGlhdG9yLmxpc3ROb3RpZmljYXRpb25JbnRlcmVzdHMoKTtcclxuXHJcbiAgICAvLyByZWdpc3RlciBtZWRpYXRvciBhcyBhbiBvYnNlcnZlciBmb3IgZWFjaCBub3RpZmljYXRpb25cclxuICAgIGlmKGludGVyZXN0cy5sZW5ndGggPiAwKVxyXG4gICAge1xyXG4gICAgICAgIC8vIGNyZWF0ZSBvYnNlcnZlciByZWZlcmVuY2luZyB0aGlzIG1lZGlhdG9ycyBoYW5kbGVOb3RpZmljYXRpb24gbWV0aG9kXHJcbiAgICAgICAgdmFyIG9ic2VydmVyID0gbmV3IE9ic2VydmVyKG1lZGlhdG9yLmhhbmRsZU5vdGlmaWNhdGlvbiwgbWVkaWF0b3IpO1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBpbnRlcmVzdHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyT2JzZXJ2ZXIoaW50ZXJlc3RzW2ldLCBvYnNlcnZlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1lZGlhdG9yLm9uUmVnaXN0ZXIoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHJpZXZlIGEgTWVkaWF0b3IgZnJvbSB0aGUgVmlld1xyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVkaWF0b3JOYW1lXHJcbiAqICBUaGUgbmFtZSBvZiB0aGUgTWVkaWF0b3IgaW5zdGFuY2UgdG8gcmV0cmlldmVcclxuICogQHJldHVybiB7cHVyZW12Yy5NZWRpYXRvcn1cclxuICogIFRoZSBNZWRpYXRvciBpbnN0YW5jZSBwcmV2aW91c2x5IHJlZ2lzdGVyZWQgd2l0aCB0aGUgZ2l2ZW4gbWVkaWF0b3JOYW1lXHJcbiAqL1xyXG5WaWV3LnByb3RvdHlwZS5yZXRyaWV2ZU1lZGlhdG9yID0gZnVuY3Rpb24obWVkaWF0b3JOYW1lKVxyXG57XHJcbiAgICByZXR1cm4gdGhpcy5tZWRpYXRvck1hcFttZWRpYXRvck5hbWVdO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSBhIE1lZGlhdG9yIGZyb20gdGhlIFZpZXcuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZWRpYXRvck5hbWVcclxuICogIE5hbWUgb2YgdGhlIE1lZGlhdG9yIGluc3RhbmNlIHRvIGJlIHJlbW92ZWRcclxuICogQHJldHVybiB7cHVyZW12Yy5NZWRpYXRvcn1cclxuICogIFRoZSBNZWRpYXRvciB0aGF0IHdhcyByZW1vdmVkIGZyb20gdGhlIFZpZXdcclxuICovXHJcblZpZXcucHJvdG90eXBlLnJlbW92ZU1lZGlhdG9yID0gZnVuY3Rpb24obWVkaWF0b3JOYW1lKVxyXG57XHJcbiAgICB2YXIgbWVkaWF0b3IgPSB0aGlzLm1lZGlhdG9yTWFwW21lZGlhdG9yTmFtZV07XHJcbiAgICBpZihtZWRpYXRvcilcclxuICAgIHtcclxuICAgICAgICAvLyBmb3IgZXZlcnkgbm90aWZpY2F0aW9uIHRoZSBtZWRpYXRvciBpcyBpbnRlcmVzdGVkIGluLi4uXHJcbiAgICAgICAgdmFyIGludGVyZXN0cyA9IG1lZGlhdG9yLmxpc3ROb3RpZmljYXRpb25JbnRlcmVzdHMoKTtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgaW50ZXJlc3RzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gcmVtb3ZlIHRoZSBvYnNlcnZlciBsaW5raW5nIHRoZSBtZWRpYXRvciB0byB0aGUgbm90aWZpY2F0aW9uXHJcbiAgICAgICAgICAgIC8vIGludGVyZXN0XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlT2JzZXJ2ZXIoaW50ZXJlc3RzW2ldLCBtZWRpYXRvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyByZW1vdmUgdGhlIG1lZGlhdG9yIGZyb20gdGhlIG1hcFxyXG4gICAgICAgIGRlbGV0ZSB0aGlzLm1lZGlhdG9yTWFwW21lZGlhdG9yTmFtZV07XHJcblxyXG4gICAgICAgIC8vIGFsZXJ0IHRoZSBtZWRpYXRvciB0aGF0IGl0IGhhcyBiZWVuIHJlbW92ZWRcclxuICAgICAgICBtZWRpYXRvci5vblJlbW92ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBtZWRpYXRvcjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDaGVjayBpZiBhIE1lZGlhdG9yIGlzIHJlZ2lzdGVyZWQgb3Igbm90LlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVkaWF0b3JOYW1lXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAqICBXaGV0aGVyIGEgTWVkaWF0b3IgaXMgcmVnaXN0ZXJlZCB3aXRoIHRoZSBnaXZlbiBtZWRpYXRvcm5hbWVcclxuICovXHJcblZpZXcucHJvdG90eXBlLmhhc01lZGlhdG9yID0gZnVuY3Rpb24obWVkaWF0b3JOYW1lKVxyXG57XHJcbiAgICByZXR1cm4gdGhpcy5tZWRpYXRvck1hcFttZWRpYXRvck5hbWVdICE9IG51bGw7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlIGEgVmlldyBpbnN0YW5jZVxyXG4gKlxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuVmlldy5yZW1vdmVWaWV3ID0gZnVuY3Rpb24oa2V5KVxyXG57XHJcbiAgICBkZWxldGUgVmlldy5pbnN0YW5jZU1hcFtrZXldO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICogVGhlIFZpZXdzIGludGVybmFsIG1hcHBpbmcgb2YgbWVkaWF0b3IgbmFtZXMgdG8gbWVkaWF0b3IgaW5zdGFuY2VzXHJcbiAqXHJcbiAqIEB0eXBlIEFycmF5XHJcbiAqIEBwcm90ZWN0ZWRcclxuICovXHJcblZpZXcucHJvdG90eXBlLm1lZGlhdG9yTWFwID0gbnVsbDtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqIFRoZSBWaWV3cyBpbnRlcm5hbCBtYXBwaW5nIG9mIE5vdGlmaWNhdGlvbiBuYW1lcyB0byBPYnNlcnZlciBsaXN0c1xyXG4gKlxyXG4gKiBAdHlwZSBBcnJheVxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqL1xyXG5WaWV3LnByb3RvdHlwZS5vYnNlcnZlck1hcCA9IG51bGw7XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKiBUaGUgaW50ZXJuYWwgbWFwIHVzZWQgdG8gc3RvcmUgbXVsdGl0b24gVmlldyBpbnN0YW5jZXNcclxuICpcclxuICogQHR5cGUgQXJyYXlcclxuICogQHByb3RlY3RlZFxyXG4gKi9cclxuVmlldy5pbnN0YW5jZU1hcCA9IFtdO1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICogVGhlIFZpZXdzIGludGVybmFsIG11bHRpdG9uIGtleS5cclxuICpcclxuICogQHR5cGUgc3RyaW5nXHJcbiAqIEBwcm90ZWN0ZWRcclxuICovXHJcblZpZXcucHJvdG90eXBlLm11bHRpdG9uS2V5ID0gbnVsbDtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqIFRoZSBlcnJvciBtZXNzYWdlIHVzZWQgaWYgYW4gYXR0ZW1wdCBpcyBtYWRlIHRvIGluc3RhbnRpYXRlIFZpZXcgZGlyZWN0bHlcclxuICpcclxuICogQHR5cGUgc3RyaW5nXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQGNvbnN0XHJcbiAqIEBzdGF0aWNcclxuICovXHJcblZpZXcuTVVMVElUT05fTVNHID0gXCJWaWV3IGluc3RhbmNlIGZvciB0aGlzIE11bHRpdG9uIGtleSBhbHJlYWR5IGNvbnN0cnVjdGVkIVwiO1xyXG4vKipcclxuICogQGF1dGhvciBQdXJlTVZDIEpTIE5hdGl2ZSBQb3J0IGJ5IERhdmlkIEZvbGV5LCBGcsOpZMOpcmljIFNhdW5pZXIsICYgQWxhaW4gRHVjaGVzbmVhdVxyXG4gKiBAYXV0aG9yIENvcHlyaWdodChjKSAyMDA2LTIwMTIgRnV0dXJlc2NhbGUsIEluYy4sIFNvbWUgcmlnaHRzIHJlc2VydmVkLlxyXG4gKlxyXG4gKiBAY2xhc3MgcHVyZW12Yy5Nb2RlbFxyXG4gKlxyXG4gKiBBIE11bHRpdG9uIE1vZGVsIGltcGxlbWVudGF0aW9uLlxyXG4gKlxyXG4gKiBJbiBQdXJlTVZDLCB0aGUgTW9kZWwgY2xhc3MgcHJvdmlkZXNcclxuICogYWNjZXNzIHRvIG1vZGVsIG9iamVjdHMgKFByb3hpZXMpIGJ5IG5hbWVkIGxvb2t1cC5cclxuICpcclxuICogVGhlIE1vZGVsIGFzc3VtZXMgdGhlc2UgcmVzcG9uc2liaWxpdGllczpcclxuICpcclxuICogLSBNYWludGFpbiBhIGNhY2hlIG9mIHtAbGluayBwdXJlbXZjLlByb3h5IFByb3h5fVxyXG4gKiAgIGluc3RhbmNlcy5cclxuICogLSBQcm92aWRlIG1ldGhvZHMgZm9yIHJlZ2lzdGVyaW5nLCByZXRyaWV2aW5nLCBhbmQgcmVtb3ZpbmdcclxuICogICB7QGxpbmsgcHVyZW12Yy5Qcm94eSBQcm94eX0gaW5zdGFuY2VzLlxyXG4gKlxyXG4gKiBZb3VyIGFwcGxpY2F0aW9uIG11c3QgcmVnaXN0ZXJcclxuICoge0BsaW5rIHB1cmVtdmMuUHJveHkgUHJveHl9IGluc3RhbmNlcyB3aXRoIHRoZSBNb2RlbC5cclxuICogVHlwaWNhbGx5LCB5b3UgdXNlIGFcclxuICoge0BsaW5rIHB1cmVtdmMuU2ltcGxlQ29tbWFuZCBTaW1wbGVDb21tYW5kfVxyXG4gKiBvclxyXG4gKiB7QGxpbmsgcHVyZW12Yy5NYWNyb0NvbW1hbmQgTWFjcm9Db21tYW5kfVxyXG4gKiB0byBjcmVhdGUgYW5kIHJlZ2lzdGVyIFByb3h5IGluc3RhbmNlcyBvbmNlIHRoZSBGYWNhZGUgaGFzIGluaXRpYWxpemVkIHRoZVxyXG4gKiAqQ29yZSogYWN0b3JzLlxyXG4gKlxyXG4gKiBUaGlzIE1vZGVsIGltcGxlbWVudGF0aW9uIGlzIGEgTXVsdGl0b24sIHNvIHlvdSBzaG91bGQgbm90IGNhbGwgdGhlXHJcbiAqIGNvbnN0cnVjdG9yIGRpcmVjdGx5LCBidXQgaW5zdGVhZCBjYWxsIHRoZVxyXG4gKiB7QGxpbmsgI2dldEluc3RhbmNlIHN0YXRpYyBNdWx0aXRvbiBGYWN0b3J5IG1ldGhvZH1cclxuICogQGNvbnN0cnVjdG9yXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcclxuICogIFRoZSBNb2RlbHMgbXVsdGl0b24ga2V5XHJcbiAqIEB0aHJvd3Mge0Vycm9yfVxyXG4gKiAgQW4gZXJyb3IgaXMgdGhyb3duIGlmIHRoaXMgbXVsdGl0b25zIGtleSBpcyBhbHJlYWR5IGluIHVzZSBieSBhbm90aGVyIGluc3RhbmNlXHJcbiAqL1xyXG5mdW5jdGlvbiBNb2RlbChrZXkpXHJcbntcclxuICAgIGlmKE1vZGVsLmluc3RhbmNlTWFwW2tleV0pXHJcbiAgICB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKE1vZGVsLk1VTFRJVE9OX01TRyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5tdWx0aXRvbktleT0ga2V5O1xyXG4gICAgTW9kZWwuaW5zdGFuY2VNYXBba2V5XT0gdGhpcztcclxuICAgIHRoaXMucHJveHlNYXA9IFtdO1xyXG4gICAgdGhpcy5pbml0aWFsaXplTW9kZWwoKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBJbml0aWFsaXplIHRoZSBNb2RlbCBpbnN0YW5jZS5cclxuICpcclxuICogQ2FsbGVkIGF1dG9tYXRpY2FsbHkgYnkgdGhlIGNvbnN0cnVjdG9yLCB0aGlzXHJcbiAqIGlzIHlvdXIgb3Bwb3J0dW5pdHkgdG8gaW5pdGlhbGl6ZSB0aGUgU2luZ2xldG9uXHJcbiAqIGluc3RhbmNlIGluIHlvdXIgc3ViY2xhc3Mgd2l0aG91dCBvdmVycmlkaW5nIHRoZVxyXG4gKiBjb25zdHJ1Y3Rvci5cclxuICpcclxuICogQHJldHVybiB2b2lkXHJcbiAqL1xyXG5Nb2RlbC5wcm90b3R5cGUuaW5pdGlhbGl6ZU1vZGVsPSBmdW5jdGlvbigpe307XHJcblxyXG5cclxuLyoqXHJcbiAqIE1vZGVsIE11bHRpdG9uIEZhY3RvcnkgbWV0aG9kLlxyXG4gKiBOb3RlIHRoYXQgdGhpcyBtZXRob2Qgd2lsbCByZXR1cm4gbnVsbCBpZiBzdXBwbGllZCBhIG51bGxcclxuICogb3IgdW5kZWZpbmVkIG11bHRpdG9uIGtleS5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IGtleVxyXG4gKiAgVGhlIG11bHRpdG9uIGtleSBmb3IgdGhlIE1vZGVsIHRvIHJldHJpZXZlXHJcbiAqIEByZXR1cm4ge3B1cmVtdmMuTW9kZWx9XHJcbiAqICB0aGUgaW5zdGFuY2UgZm9yIHRoaXMgTXVsdGl0b24ga2V5XHJcbiAqL1xyXG5Nb2RlbC5nZXRJbnN0YW5jZT0gZnVuY3Rpb24oa2V5KVxyXG57XHJcbiAgICBpZiAobnVsbCA9PSBrZXkpXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgaWYoTW9kZWwuaW5zdGFuY2VNYXBba2V5XSA9PSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIE1vZGVsLmluc3RhbmNlTWFwW2tleV09IG5ldyBNb2RlbChrZXkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBNb2RlbC5pbnN0YW5jZU1hcFtrZXldO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlZ2lzdGVyIGEgUHJveHkgd2l0aCB0aGUgTW9kZWxcclxuICogQHBhcmFtIHtwdXJlbXZjLlByb3h5fVxyXG4gKi9cclxuTW9kZWwucHJvdG90eXBlLnJlZ2lzdGVyUHJveHk9IGZ1bmN0aW9uKHByb3h5KVxyXG57XHJcbiAgICBwcm94eS5pbml0aWFsaXplTm90aWZpZXIodGhpcy5tdWx0aXRvbktleSk7XHJcbiAgICB0aGlzLnByb3h5TWFwW3Byb3h5LmdldFByb3h5TmFtZSgpXT0gcHJveHk7XHJcbiAgICBwcm94eS5vblJlZ2lzdGVyKCk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0cmlldmUgYSBQcm94eSBmcm9tIHRoZSBNb2RlbFxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJveHlOYW1lXHJcbiAqIEByZXR1cm4ge3B1cmVtdmMuUHJveHl9XHJcbiAqICBUaGUgUHJveHkgaW5zdGFuY2UgcHJldmlvdXNseSByZWdpc3RlcmVkIHdpdGggdGhlIHByb3ZpZGVkIHByb3h5TmFtZVxyXG4gKi9cclxuTW9kZWwucHJvdG90eXBlLnJldHJpZXZlUHJveHk9IGZ1bmN0aW9uKHByb3h5TmFtZSlcclxue1xyXG4gICAgcmV0dXJuIHRoaXMucHJveHlNYXBbcHJveHlOYW1lXTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDaGVjayBpZiBhIFByb3h5IGlzIHJlZ2lzdGVyZWRcclxuICogQHBhcmFtIHtzdHJpbmd9IHByb3h5TmFtZVxyXG4gKiBAcmV0dXJuIHtib29sZWFufVxyXG4gKiAgd2hldGhlciBhIFByb3h5IGlzIGN1cnJlbnRseSByZWdpc3RlcmVkIHdpdGggdGhlIGdpdmVuIHByb3h5TmFtZS5cclxuICovXHJcbk1vZGVsLnByb3RvdHlwZS5oYXNQcm94eT0gZnVuY3Rpb24ocHJveHlOYW1lKVxyXG57XHJcbiAgICByZXR1cm4gdGhpcy5wcm94eU1hcFtwcm94eU5hbWVdICE9IG51bGw7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlIGEgUHJveHkgZnJvbSB0aGUgTW9kZWwuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm94eU5hbWVcclxuICogIFRoZSBuYW1lIG9mIHRoZSBQcm94eSBpbnN0YW5jZSB0byByZW1vdmVcclxuICogQHJldHVybiB7cHVyZW12Yy5Qcm94eX1cclxuICogIFRoZSBQcm94eSB0aGF0IHdhcyByZW1vdmVkIGZyb20gdGhlIE1vZGVsXHJcbiAqL1xyXG5Nb2RlbC5wcm90b3R5cGUucmVtb3ZlUHJveHk9IGZ1bmN0aW9uKHByb3h5TmFtZSlcclxue1xyXG4gICAgdmFyIHByb3h5PSB0aGlzLnByb3h5TWFwW3Byb3h5TmFtZV07XHJcbiAgICBpZihwcm94eSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLnByb3h5TWFwW3Byb3h5TmFtZV09IG51bGw7XHJcbiAgICAgICAgcHJveHkub25SZW1vdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcHJveHk7XHJcbn07XHJcblxyXG4vKipcclxuICogQHN0YXRpY1xyXG4gKiBSZW1vdmUgYSBNb2RlbCBpbnN0YW5jZS5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IGtleVxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuTW9kZWwucmVtb3ZlTW9kZWw9IGZ1bmN0aW9uKGtleSlcclxue1xyXG4gICAgZGVsZXRlIE1vZGVsLmluc3RhbmNlTWFwW2tleV07XHJcbn07XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKiBUaGUgbWFwIHVzZWQgYnkgdGhlIE1vZGVsIHRvIHN0b3JlIFByb3h5IGluc3RhbmNlcy5cclxuICpcclxuICogQHByb3RlY3RlZFxyXG4gKiBAdHlwZSBBcnJheVxyXG4gKi9cclxuTW9kZWwucHJvdG90eXBlLnByb3h5TWFwPSBudWxsO1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICogVGhlIG1hcCB1c2VkIGJ5IHRoZSBNb2RlbCB0byBzdG9yZSBtdWx0aXRvbiBpbnN0YW5jZXNcclxuICpcclxuICogQHByb3RlY3RlZFxyXG4gKiBAc3RhdGljXHJcbiAqIEB0eXBlIEFycmF5XHJcbiAqL1xyXG5Nb2RlbC5pbnN0YW5jZU1hcD0gW107XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKiBUaGUgTW9kZWxzIG11bHRpdG9uIGtleS5cclxuICpcclxuICogQHByb3RlY3RlZFxyXG4gKiBAdHlwZSBzdHJpbmdcclxuICovXHJcbk1vZGVsLnByb3RvdHlwZS5tdWx0aXRvbktleTtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqIE1lc3NhZ2UgQ29uc3RhbnRzXHJcbiAqXHJcbiAqIEBzdGF0aWNcclxuICogQHR5cGUge3N0cmluZ31cclxuICovXHJcbk1vZGVsLk1VTFRJVE9OX01TRz0gXCJNb2RlbCBpbnN0YW5jZSBmb3IgdGhpcyBNdWx0aXRvbiBrZXkgYWxyZWFkeSBjb25zdHJ1Y3RlZCFcIjtcclxuLyoqXHJcbiAqIEBhdXRob3IgUHVyZU1WQyBKUyBOYXRpdmUgUG9ydCBieSBEYXZpZCBGb2xleSwgRnLDqWTDqXJpYyBTYXVuaWVyLCAmIEFsYWluIER1Y2hlc25lYXVcclxuICogQGF1dGhvciBDb3B5cmlnaHQoYykgMjAwNi0yMDEyIEZ1dHVyZXNjYWxlLCBJbmMuLCBTb21lIHJpZ2h0cyByZXNlcnZlZC5cclxuICpcclxuICogQGNsYXNzIHB1cmVtdmMuQ29udHJvbGxlclxyXG4gKlxyXG4gKiBJbiBQdXJlTVZDLCB0aGUgQ29udHJvbGxlciBjbGFzcyBmb2xsb3dzIHRoZSAnQ29tbWFuZCBhbmQgQ29udHJvbGxlcidcclxuICogc3RyYXRlZ3ksIGFuZCBhc3N1bWVzIHRoZXNlIHJlc3BvbnNpYmlsaXRpZXM6XHJcbiAqXHJcbiAqIC0gUmVtZW1iZXJpbmcgd2hpY2hcclxuICoge0BsaW5rIHB1cmVtdmMuU2ltcGxlQ29tbWFuZCBTaW1wbGVDb21tYW5kfXNcclxuICogb3JcclxuICoge0BsaW5rIHB1cmVtdmMuTWFjcm9Db21tYW5kIE1hY3JvQ29tbWFuZH1zXHJcbiAqIGFyZSBpbnRlbmRlZCB0byBoYW5kbGUgd2hpY2hcclxuICoge0BsaW5rIHB1cmVtdmMuTm90aWZpY2F0aW9uIE5vdGlmaWNhdGlvbn1zXHJcbiAqIC0gUmVnaXN0ZXJpbmcgaXRzZWxmIGFzIGFuXHJcbiAqIHtAbGluayBwdXJlbXZjLk9ic2VydmVyIE9ic2VydmVyfSB3aXRoXHJcbiAqIHRoZSB7QGxpbmsgcHVyZW12Yy5WaWV3IFZpZXd9IGZvciBlYWNoXHJcbiAqIHtAbGluayBwdXJlbXZjLk5vdGlmaWNhdGlvbiBOb3RpZmljYXRpb259XHJcbiAqIHRoYXQgaXQgaGFzIGFuXHJcbiAqIHtAbGluayBwdXJlbXZjLlNpbXBsZUNvbW1hbmQgU2ltcGxlQ29tbWFuZH1cclxuICogb3Ige0BsaW5rIHB1cmVtdmMuTWFjcm9Db21tYW5kIE1hY3JvQ29tbWFuZH1cclxuICogbWFwcGluZyBmb3IuXHJcbiAqIC0gQ3JlYXRpbmcgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIHByb3BlclxyXG4gKiB7QGxpbmsgcHVyZW12Yy5TaW1wbGVDb21tYW5kIFNpbXBsZUNvbW1hbmR9c1xyXG4gKiBvclxyXG4gKiB7QGxpbmsgcHVyZW12Yy5NYWNyb0NvbW1hbmQgTWFjcm9Db21tYW5kfXNcclxuICogdG8gaGFuZGxlIGEgZ2l2ZW5cclxuICoge0BsaW5rIHB1cmVtdmMuTm90aWZpY2F0aW9uIE5vdGlmaWNhdGlvbn1cclxuICogd2hlbiBub3RpZmllZCBieSB0aGVcclxuICoge0BsaW5rIHB1cmVtdmMuVmlldyBWaWV3fS5cclxuICogLSBDYWxsaW5nIHRoZSBjb21tYW5kJ3MgZXhlY3V0ZSBtZXRob2QsIHBhc3NpbmcgaW4gdGhlXHJcbiAqIHtAbGluayBwdXJlbXZjLk5vdGlmaWNhdGlvbiBOb3RpZmljYXRpb259LlxyXG4gKlxyXG4gKiBZb3VyIGFwcGxpY2F0aW9uIG11c3QgcmVnaXN0ZXJcclxuICoge0BsaW5rIHB1cmVtdmMuU2ltcGxlQ29tbWFuZCBTaW1wbGVDb21tYW5kfXNcclxuICogb3Ige0BsaW5rIHB1cmVtdmMuTWFjcm9Db21tYW5kIE1hY3JvQ29tbWFuZH1zXHJcbiAqIHdpdGggdGhlIENvbnRyb2xsZXIuXHJcbiAqXHJcbiAqIFRoZSBzaW1wbGVzdCB3YXkgaXMgdG8gc3ViY2xhc3NcclxuICoge0BsaW5rIHB1cmVtdmMuRmFjYWRlIEZhY2FkZX0sXHJcbiAqIGFuZCB1c2UgaXRzXHJcbiAqIHtAbGluayBwdXJlbXZjLkZhY2FkZSNpbml0aWFsaXplQ29udHJvbGxlciBpbml0aWFsaXplQ29udHJvbGxlcn1cclxuICogbWV0aG9kIHRvIGFkZCB5b3VyIHJlZ2lzdHJhdGlvbnMuXHJcbiAqXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKiBUaGlzIENvbnRyb2xsZXIgaW1wbGVtZW50YXRpb24gaXMgYSBNdWx0aXRvbiwgc28geW91IHNob3VsZCBub3QgY2FsbCB0aGVcclxuICogY29uc3RydWN0b3IgZGlyZWN0bHksIGJ1dCBpbnN0ZWFkIGNhbGwgdGhlIHN0YXRpYyAjZ2V0SW5zdGFuY2UgZmFjdG9yeSBtZXRob2QsXHJcbiAqIHBhc3NpbmcgdGhlIHVuaXF1ZSBrZXkgZm9yIHRoaXMgaW5zdGFuY2UgdG8gaXQuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcclxuICogQHRocm93cyB7RXJyb3J9XHJcbiAqICBJZiBpbnN0YW5jZSBmb3IgdGhpcyBNdWx0aXRvbiBrZXkgaGFzIGFscmVhZHkgYmVlbiBjb25zdHJ1Y3RlZFxyXG4gKi9cclxuZnVuY3Rpb24gQ29udHJvbGxlcihrZXkpXHJcbntcclxuICAgIGlmKENvbnRyb2xsZXIuaW5zdGFuY2VNYXBba2V5XSAhPSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihDb250cm9sbGVyLk1VTFRJVE9OX01TRyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5tdWx0aXRvbktleT0ga2V5O1xyXG4gICAgQ29udHJvbGxlci5pbnN0YW5jZU1hcFt0aGlzLm11bHRpdG9uS2V5XT0gdGhpcztcclxuICAgIHRoaXMuY29tbWFuZE1hcD0gbmV3IEFycmF5KCk7XHJcbiAgICB0aGlzLmluaXRpYWxpemVDb250cm9sbGVyKCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqXHJcbiAqIEluaXRpYWxpemUgdGhlIG11bHRpdG9uIENvbnRyb2xsZXIgaW5zdGFuY2UuXHJcbiAqXHJcbiAqIENhbGxlZCBhdXRvbWF0aWNhbGx5IGJ5IHRoZSBjb25zdHJ1Y3Rvci5cclxuICpcclxuICogTm90ZSB0aGF0IGlmIHlvdSBhcmUgdXNpbmcgYSBzdWJjbGFzcyBvZiBWaWV3XHJcbiAqIGluIHlvdXIgYXBwbGljYXRpb24sIHlvdSBzaG91bGQgKmFsc28qIHN1YmNsYXNzIENvbnRyb2xsZXJcclxuICogYW5kIG92ZXJyaWRlIHRoZSBpbml0aWFsaXplQ29udHJvbGxlciBtZXRob2QgaW4gdGhlXHJcbiAqIGZvbGxvd2luZyB3YXkuXHJcbiAqXHJcbiAqICAgICBNeUNvbnRyb2xsZXIucHJvdG90eXBlLmluaXRpYWxpemVDb250cm9sbGVyPSBmdW5jdGlvbiAoKVxyXG4gKiAgICAge1xyXG4gKiAgICAgICAgIHRoaXMudmlldz0gTXlWaWV3LmdldEluc3RhbmNlKHRoaXMubXVsdGl0b25LZXkpO1xyXG4gKiAgICAgfTtcclxuICpcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbkNvbnRyb2xsZXIucHJvdG90eXBlLmluaXRpYWxpemVDb250cm9sbGVyPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHRoaXMudmlldz0gVmlldy5nZXRJbnN0YW5jZSh0aGlzLm11bHRpdG9uS2V5KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgQ29udHJvbGxlcnMgbXVsdGl0b24gZmFjdG9yeSBtZXRob2QuXHJcbiAqIE5vdGUgdGhhdCB0aGlzIG1ldGhvZCB3aWxsIHJldHVybiBudWxsIGlmIHN1cHBsaWVkIGEgbnVsbFxyXG4gKiBvciB1bmRlZmluZWQgbXVsdGl0b24ga2V5LlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5XHJcbiAqICBBIENvbnRyb2xsZXIncyBtdWx0aXRvbiBrZXlcclxuICogQHJldHVybiB7cHVyZW12Yy5Db250cm9sbGVyfVxyXG4gKiAgdGhlIE11bHRpdG9uIGluc3RhbmNlIG9mIENvbnRyb2xsZXJcclxuICovXHJcbkNvbnRyb2xsZXIuZ2V0SW5zdGFuY2U9IGZ1bmN0aW9uKGtleSlcclxue1xyXG4gICAgaWYgKG51bGwgPT0ga2V5KVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG5cclxuICAgIGlmKG51bGwgPT0gdGhpcy5pbnN0YW5jZU1hcFtrZXldKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuaW5zdGFuY2VNYXBba2V5XT0gbmV3IHRoaXMoa2V5KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZU1hcFtrZXldO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIElmIGEgU2ltcGxlQ29tbWFuZCBvciBNYWNyb0NvbW1hbmQgaGFzIHByZXZpb3VzbHkgYmVlbiByZWdpc3RlcmVkIHRvIGhhbmRsZVxyXG4gKiB0aGUgZ2l2ZW4gTm90aWZpY2F0aW9uIHRoZW4gaXQgaXMgZXhlY3V0ZWQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7cHVyZW12Yy5Ob3RpZmljYXRpb259IG5vdGVcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbkNvbnRyb2xsZXIucHJvdG90eXBlLmV4ZWN1dGVDb21tYW5kPSBmdW5jdGlvbihub3RlKVxyXG57XHJcbiAgICB2YXIgY29tbWFuZENsYXNzUmVmPSB0aGlzLmNvbW1hbmRNYXBbbm90ZS5nZXROYW1lKCldO1xyXG4gICAgaWYoY29tbWFuZENsYXNzUmVmID09IG51bGwpXHJcbiAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgIHZhciBjb21tYW5kSW5zdGFuY2U9IG5ldyBjb21tYW5kQ2xhc3NSZWYoKTtcclxuICAgIGNvbW1hbmRJbnN0YW5jZS5pbml0aWFsaXplTm90aWZpZXIodGhpcy5tdWx0aXRvbktleSk7XHJcbiAgICBjb21tYW5kSW5zdGFuY2UuZXhlY3V0ZShub3RlKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZWdpc3RlciBhIHBhcnRpY3VsYXIgU2ltcGxlQ29tbWFuZCBvciBNYWNyb0NvbW1hbmQgY2xhc3MgYXMgdGhlIGhhbmRsZXIgZm9yXHJcbiAqIGEgcGFydGljdWxhciBOb3RpZmljYXRpb24uXHJcbiAqXHJcbiAqIElmIGFuIGNvbW1hbmQgYWxyZWFkeSBiZWVuIHJlZ2lzdGVyZWQgdG8gaGFuZGxlIE5vdGlmaWNhdGlvbnMgd2l0aCB0aGlzIG5hbWUsXHJcbiAqIGl0IGlzIG5vIGxvbmdlciB1c2VkLCB0aGUgbmV3IGNvbW1hbmQgaXMgdXNlZCBpbnN0ZWFkLlxyXG4gKlxyXG4gKiBUaGUgT2JzZXJ2ZXIgZm9yIHRoZSBuZXcgY29tbWFuZCBpcyBvbmx5IGNyZWF0ZWQgaWYgdGhpcyB0aGUgaXJzdCB0aW1lIGFcclxuICogY29tbWFuZCBoYXMgYmVlbiByZWdpc2VyZWQgZm9yIHRoaXMgTm90aWZpY2F0aW9uIG5hbWUuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBub3RpZmljYXRpb25OYW1lXHJcbiAqICB0aGUgbmFtZSBvZiB0aGUgTm90aWZpY2F0aW9uXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbW1hbmRDbGFzc1JlZlxyXG4gKiAgYSBjb21tYW5kIGNvbnN0cnVjdG9yXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5Db250cm9sbGVyLnByb3RvdHlwZS5yZWdpc3RlckNvbW1hbmQ9IGZ1bmN0aW9uKG5vdGlmaWNhdGlvbk5hbWUsIGNvbW1hbmRDbGFzc1JlZilcclxue1xyXG4gICAgaWYodGhpcy5jb21tYW5kTWFwW25vdGlmaWNhdGlvbk5hbWVdID09IG51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy52aWV3LnJlZ2lzdGVyT2JzZXJ2ZXIobm90aWZpY2F0aW9uTmFtZSwgbmV3IE9ic2VydmVyKHRoaXMuZXhlY3V0ZUNvbW1hbmQsIHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNvbW1hbmRNYXBbbm90aWZpY2F0aW9uTmFtZV09IGNvbW1hbmRDbGFzc1JlZjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDaGVjayBpZiBhIGNvbW1hbmQgaXMgcmVnaXN0ZXJlZCBmb3IgYSBnaXZlbiBOb3RpZmljYXRpb25cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG5vdGlmaWNhdGlvbk5hbWVcclxuICogQHJldHVybiB7Ym9vbGVhbn1cclxuICogIHdoZXRoZXIgYSBDb21tYW5kIGlzIGN1cnJlbnRseSByZWdpc3RlcmVkIGZvciB0aGUgZ2l2ZW4gbm90aWZpY2F0aW9uTmFtZS5cclxuICovXHJcbkNvbnRyb2xsZXIucHJvdG90eXBlLmhhc0NvbW1hbmQ9IGZ1bmN0aW9uKG5vdGlmaWNhdGlvbk5hbWUpXHJcbntcclxuICAgIHJldHVybiB0aGlzLmNvbW1hbmRNYXBbbm90aWZpY2F0aW9uTmFtZV0gIT0gbnVsbDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmUgYSBwcmV2aW91c2x5IHJlZ2lzdGVyZWQgY29tbWFuZCB0b1xyXG4gKiB7QGxpbmsgcHVyZW12Yy5Ob3RpZmljYXRpb24gTm90aWZpY2F0aW9ufVxyXG4gKiBtYXBwaW5nLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbm90aWZpY2F0aW9uTmFtZVxyXG4gKiAgdGhlIG5hbWUgb2YgdGhlIE5vdGlmaWNhdGlvbiB0byByZW1vdmUgdGhlIGNvbW1hbmQgbWFwcGluZyBmb3JcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbkNvbnRyb2xsZXIucHJvdG90eXBlLnJlbW92ZUNvbW1hbmQ9IGZ1bmN0aW9uKG5vdGlmaWNhdGlvbk5hbWUpXHJcbntcclxuICAgIGlmKHRoaXMuaGFzQ29tbWFuZChub3RpZmljYXRpb25OYW1lKSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLnZpZXcucmVtb3ZlT2JzZXJ2ZXIobm90aWZpY2F0aW9uTmFtZSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5jb21tYW5kTWFwW25vdGlmaWNhdGlvbk5hbWVdPSBudWxsO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBzdGF0aWNcclxuICogUmVtb3ZlIGEgQ29udHJvbGxlciBpbnN0YW5jZS5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IGtleVxyXG4gKiAgbXVsdGl0b25LZXkgb2YgQ29udHJvbGxlciBpbnN0YW5jZSB0byByZW1vdmVcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbkNvbnRyb2xsZXIucmVtb3ZlQ29udHJvbGxlcj0gZnVuY3Rpb24oa2V5KVxyXG57XHJcbiAgICBkZWxldGUgdGhpcy5pbnN0YW5jZU1hcFtrZXldO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIExvY2FsIHJlZmVyZW5jZSB0byB0aGUgQ29udHJvbGxlcidzIFZpZXdcclxuICpcclxuICogQHByb3RlY3RlZFxyXG4gKiBAdHlwZSB7cHVyZW12Yy5WaWV3fVxyXG4gKi9cclxuQ29udHJvbGxlci5wcm90b3R5cGUudmlldz0gbnVsbDtcclxuXHJcbi8qKlxyXG4gKiBOb3RlIG5hbWUgdG8gY29tbWFuZCBjb25zdHJ1Y3RvciBtYXBwaW5nc1xyXG4gKlxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEB0eXBlIHtPYmplY3R9XHJcbiAqL1xyXG5Db250cm9sbGVyLnByb3RvdHlwZS5jb21tYW5kTWFwPSBudWxsO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBDb250cm9sbGVyJ3MgbXVsdGl0b24ga2V5XHJcbiAqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQHR5cGUge3N0cmluZ31cclxuICovXHJcbkNvbnRyb2xsZXIucHJvdG90eXBlLm11bHRpdG9uS2V5PSBudWxsO1xyXG5cclxuLyoqXHJcbiAqIE11bHRpdG9uIGtleSB0byBDb250cm9sbGVyIGluc3RhbmNlIG1hcHBpbmdzXHJcbiAqXHJcbiAqIEBzdGF0aWNcclxuICogQHByb3RlY3RlZFxyXG4gKiBAdHlwZSB7T2JqZWN0fVxyXG4gKi9cclxuQ29udHJvbGxlci5pbnN0YW5jZU1hcD0gW107XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKlxyXG4gKiBNZXNzYWdlIGNvbnN0YW50c1xyXG4gKiBAc3RhdGljXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQHR5cGUge3N0cmluZ31cclxuICovXHJcbkNvbnRyb2xsZXIuTVVMVElUT05fTVNHPSBcImNvbnRyb2xsZXIga2V5IGZvciB0aGlzIE11bHRpdG9uIGtleSBhbHJlYWR5IGNvbnN0cnVjdGVkXCJcclxuLypcclxuICogQGF1dGhvciBQdXJlTVZDIEpTIE5hdGl2ZSBQb3J0IGJ5IERhdmlkIEZvbGV5LCBGcsOpZMOpcmljIFNhdW5pZXIsICYgQWxhaW4gRHVjaGVzbmVhdSBcclxuICogQGF1dGhvciBDb3B5cmlnaHQoYykgMjAwNi0yMDEyIEZ1dHVyZXNjYWxlLCBJbmMuLCBTb21lIHJpZ2h0cyByZXNlcnZlZC5cclxuICogXHJcbiAqIEBoaWRlXHJcbiAqIEEgYW4gaW50ZXJuYWwgaGVscGVyIGNsYXNzIHVzZWQgdG8gYXNzaXN0IGNsYXNzbGV0IGltcGxlbWVudGF0aW9uLiBUaGlzXHJcbiAqIGNsYXNzIGlzIG5vdCBhY2Nlc3NpYmxlIGJ5IGNsaWVudCBjb2RlLlxyXG4gKi9cclxudmFyIE9vcEhlbHA9XHJcbntcclxuICAgIC8qXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBzY29wZS4gV2UgdXNlIHRoaXMgcmF0aGVyIHRoYW4gd2luZG93XHJcbiAgICAgKiBpbiBvcmRlciB0byBzdXBwb3J0IGJvdGggYnJvd3NlciBiYXNlZCBhbmQgbm9uIGJyb3dzZXIgYmFlZCBcclxuICAgICAqIEphdmFTY3JpcHQgaW50ZXJwcmV0ZXJzLlxyXG4gICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAqL1xyXG4gICAgZ2xvYmFsOiAoZnVuY3Rpb24oKXtyZXR1cm4gdGhpc30pKClcclxuXHJcbiAgICAvKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEV4dGVuZCBvbmUgRnVuY3Rpb24ncyBwcm90b3R5cGUgYnkgYW5vdGhlciwgZW11bGF0aW5nIGNsYXNzaWNcclxuICAgICAqIGluaGVyaXRhbmNlLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjaGlsZFxyXG4gICAgICogIFRoZSBGdW5jdGlvbiB0byBleHRlbmQgKHN1YmNsYXNzKVxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBwYXJlbnRcclxuICAgICAqICBUaGUgRnVuY3Rpb24gdG8gZXh0ZW5kIGZyb20gKHN1cGVyY2xhc3MpXHJcbiAgICAgKiBcclxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufVxyXG4gICAgICogXHJcbiAgICAgKiAgQSByZWZlcmVuY2UgdG8gdGhlIGV4dGVuZGVkIEZ1bmN0aW9uIChzdWJjbGFzcylcclxuICAgICAqL1xyXG4gICAgLCAgIGV4dGVuZDogZnVuY3Rpb24gKGNoaWxkLCBwYXJlbnQpXHJcbntcclxuICAgIGlmICgnZnVuY3Rpb24nICE9PSB0eXBlb2YgY2hpbGQpXHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignI2V4dGVuZC0gY2hpbGQgc2hvdWxkIGJlIEZ1bmN0aW9uJyk7XHJcblxyXG4gICAgaWYgKCdmdW5jdGlvbicgIT09IHR5cGVvZiBwYXJlbnQpXHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignI2V4dGVuZC0gcGFyZW50IHNob3VsZCBiZSBGdW5jdGlvbicpO1xyXG5cclxuICAgIGlmIChwYXJlbnQgPT09IGNoaWxkKVxyXG4gICAgICAgIHJldHVybjtcclxuXHJcbiAgICB2YXIgVHJhbnNpdGl2ZT0gbmV3IEZ1bmN0aW9uO1xyXG4gICAgVHJhbnNpdGl2ZS5wcm90b3R5cGU9IHBhcmVudC5wcm90b3R5cGU7XHJcbiAgICBjaGlsZC5wcm90b3R5cGU9IG5ldyBUcmFuc2l0aXZlO1xyXG4gICAgcmV0dXJuIGNoaWxkLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj0gY2hpbGQ7XHJcbn1cclxuXHJcbiAgICAvKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIERlY29hcmF0ZSBvbmUgb2JqZWN0IHdpdGggdGhlIHByb3BlcnRpZXMgb2YgYW5vdGhlci4gXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3RcclxuICAgICAqICBUaGUgb2JqZWN0IHRvIGRlY29yYXRlLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gdHJhaXRzXHJcbiAgICAgKiAgVGhlIG9iamVjdCBwcm92aWRpbmcgdGhlIHByb3Blcml0ZXMgdGhhdCB0aGUgZmlyc3Qgb2JqZWN0XHJcbiAgICAgKiAgd2lsbCBiZSBkZWNvcmF0ZWQgd2l0aC4gTm90ZSB0aGF0IG9ubHkgcHJvcGVydGllcyBkZWZpbmVkIG9uIFxyXG4gICAgICogIHRoaXMgb2JqZWN0IHdpbGwgYmUgY29waWVkLSBpLmUuIGluaGVyaXRlZCBwcm9wZXJ0aWVzIHdpbGxcclxuICAgICAqICBiZSBpZ25vcmVkLlxyXG4gICAgICogXHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAgICAgKiAgVEhlIGRlY29yYXRlZCBvYmplY3QgKGZpcnN0IGFyZ3VtZW50KVxyXG4gICAgICovXHJcbiAgICAsICAgZGVjb3JhdGU6IGZ1bmN0aW9uIChvYmplY3QsIHRyYWl0cylcclxue1xyXG4gICAgZm9yICh2YXIgYWNjZXNzb3IgaW4gdHJhaXRzKVxyXG4gICAge1xyXG4gICAgICAgIG9iamVjdFthY2Nlc3Nvcl09IHRyYWl0c1thY2Nlc3Nvcl07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG9iamVjdDtcclxufVxyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBAbWVtYmVyIHB1cmVtdmNcclxuICpcclxuICogRGVjbGFyZSBhIG5hbWVzcGFjZSBhbmQgb3B0aW9uYWxseSBtYWtlIGFuIE9iamVjdCB0aGUgcmVmZXJlbnRcclxuICogb2YgdGhhdCBuYW1lc3BhY2UuXHJcbiAqXHJcbiAqICAgICBjb25zb2xlLmFzc2VydChudWxsID09IHdpbmRvdy50bGQsICdObyB0bGQgbmFtZXNwYWNlJyk7XHJcbiAqICAgICAvLyBkZWNsYXJlIHRoZSB0bGQgbmFtZXNwYWNlXHJcbiAqICAgICBwdXJlbXZjLmRlY2xhcmUoJ3RsZCcpO1xyXG4gKiAgICAgY29uc29sZS5hc3NlcnQoJ29iamVjdCcgPT09IHR5cGVvZiB0bGQsICdUaGUgdGxkIG5hbWVzcGFjZSB3YXMgZGVjbGFyZWQnKTtcclxuICpcclxuICogICAgIC8vIHRoZSBtZXRob2QgcmV0dXJucyBhIHJlZmVyZW5jZSB0byBsYXN0IG5hbWVzcGFjZSBub2RlIGluIGEgY3JlYXRlZCBoaWVyYXJjaHlcclxuICogICAgIHZhciByZWZlcmVuY2U9IHB1cmVtdmMuZGVjbGFyZSgndGxkLmRvbWFpbi5hcHAnKTtcclxuICogICAgIGNvbnNvbGUuYXNzZXJ0KHJlZmVyZW5jZSA9PT0gdGxkLmRvbWFpbi5hcHApXHJcbiAqXHJcbiAqICAgICAvLyBvZiBjb3Vyc2UgeW91IGNhbiBhbHNvIGRlY2xhcmUgeW91ciBvd24gb2JqZWN0cyBhcyB3ZWxsXHJcbiAqICAgICB2YXIgQXBwQ29uc3RhbnRzPVxyXG4gKiAgICAgICAgIHtcclxuICogXHQgICAgICAgICAgIEFQUF9OQU1FOiAndGxkLmRvbWFpbi5hcHAuQXBwJ1xyXG4gKiAgICAgICAgIH07XHJcbiAqXHJcbiAqICAgICBwdXJlbXZjLmRlY2xhcmUoJ3RsZC5kb21haW4uYXBwLkFwcENvbnN0YW50cycsIEFwcENvbnN0YW50cyk7XHJcbiAqICAgICBjb25zb2xlLmFzc2VydChBcHBDb25zdGFudHMgPT09IHRsZC5kb21haW4uYXBwLkFwcENvbnN0YW50c1xyXG4gKiBcdCAgICwgJ0FwcENvbnN0YW50cyB3YXMgZXhwb3J0ZWQgdG8gdGhlIG5hbWVzcGFjZScpO1xyXG4gKlxyXG4gKiBOb3RlIHRoYXQgeW91IGNhbiBhbHNvICNkZWNsYXJlIHdpdGhpbiBhIGNsb3N1cmUuIFRoYXQgd2F5IHlvdVxyXG4gKiBjYW4gc2VsZWN0aXZlbHkgZXhwb3J0IE9iamVjdHMgdG8geW91ciBvd24gbmFtZXNwYWNlcyB3aXRob3V0XHJcbiAqIGxlYWtpbmcgdmFyaWFibGVzIGludG8gdGhlIGdsb2JhbCBzY29wZS5cclxuICpcclxuICogICAgIChmdW5jdGlvbigpe1xyXG4gKiAgICAgICAgIC8vIHRoaXMgdmFyIGlzIG5vdCBhY2Nlc3NpYmxlIG91dHNpZGUgb2YgdGhpc1xyXG4gKiAgICAgICAgIC8vIGNsb3N1cmVzIGNhbGwgc2NvcGVcclxuICogICAgICAgICB2YXIgaGlkZGVuVmFsdWU9ICdkZWZhdWx0VmFsdWUnO1xyXG4gKiBcclxuICogICAgICAgICAvLyBleHBvcnQgYW4gb2JqZWN0IHRoYXQgcmVmZXJlbmNlcyB0aGUgaGlkZGVuXHJcbiAqICAgICAgICAgLy8gdmFyaWFibGUgYW5kIHdoaWNoIGNhbiBtdXRhdGUgaXRcclxuICogICAgICAgICBwdXJlbXZjLmRlY2xhcmVcclxuICogICAgICAgICAoXHJcbiAqICAgICAgICAgICAgICAndGxkLmRvbWFpbi5hcHAuYmFja2Rvb3InXHJcbiAqIFxyXG4gKiAgICAgICAgICwgICAge1xyXG4gKiAgICAgICAgICAgICAgICAgIHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpXHJcbiAqICAgICAgICAgICAgICAgICAge1xyXG4gKiAgICAgICAgICAgICAgICAgICAgICAvLyBhc3NpZ25zIHRvIHRoZSBoaWRkZW4gdmFyXHJcbiAqICAgICAgICAgICAgICAgICAgICAgIGhpZGRlblZhbHVlPSB2YWx1ZTtcclxuICogICAgICAgICAgICAgICAgICB9XHJcbiAqIFxyXG4gKiAgICAgICAgICwgICAgICAgIGdldFZhbHVlOiBmdW5jdGlvbiAoKVxyXG4gKiAgICAgICAgICAgICAgICAgIHtcclxuICogICAgICAgICAgICAgICAgICAgICAgLy8gcmVhZHMgZnJvbSB0aGUgaGlkZGVuIHZhclxyXG4gKiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaGlkZGVuVmFsdWU7XHJcbiAqICAgICAgICAgICAgICAgICAgfVxyXG4gKiAgICAgICAgICAgICAgfVxyXG4gKiAgICAgICAgICk7XHJcbiAqICAgICB9KSgpO1xyXG4gKiAgICAgLy8gaW5kaXJlY3RseSByZXRyaWV2ZSB0aGUgaGlkZGVuIHZhcmlhYmxlcyB2YWx1ZVxyXG4gKiAgICAgY29uc29sZS5hc3NlcnQoJ2RlZmF1bHRWYWx1ZScgPT09IHRsZC5kb21haW4uYXBwLmJhY2tkb29yLmdldFZhbHVlKCkpO1xyXG4gKiAgICAgLy8gaW5kaXJlY3RseSBzZXQgdGhlIGhpZGRlbiB2YXJpYWJsZXMgdmFsdWVcclxuICogICAgIHRsZC5kb21haW4uYXBwLmJhY2tkb29yLnNldFZhbHVlKCduZXdWYWx1ZScpO1xyXG4gKiAgICAgLy8gdGhlIGhpZGRlbiB2YXIgd2FzIG11dGF0ZWRcclxuICogICAgIGNvbnNvbGUuYXNzZXJ0KCduZXdWYWx1ZScgPT09IHRsZC5kb21haW4uYXBwLmJhY2tkb29yLmdldFZhbHVlKCkpO1xyXG4gKlxyXG4gKiBPbiBvY2Nhc2lvbiwgcHJpbWFyaWx5IGR1cmluZyB0ZXN0aW5nLCB5b3UgbWF5IHdhbnQgdG8gdXNlIGRlY2xhcmUsXHJcbiAqIGJ1dCBub3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBiZSB0aGUgbmFtZXNwYWNlIHJvb3QuIEluIHRoZXNlIGNhc2VzIHlvdVxyXG4gKiBjYW4gc3VwcGx5IHRoZSBvcHRpb25hbCB0aGlyZCBzY29wZSBhcmd1bWVudC5cclxuICpcclxuICogICAgIHZhciBsb2NhbFNjb3BlPSB7fVxyXG4gKiAgICAgLCAgIG9iamVjdD0ge31cclxuICpcclxuICogICAgIHB1cmVtdmMuZGVjbGFyZSgnbW9jay5vYmplY3QnLCBvYmplY3QsIGxvY2FsU2NvcGUpO1xyXG4gKlxyXG4gKiAgICAgY29uc29sZS5hc3NlcnQobnVsbCA9PSB3aW5kb3cubW9jaywgJ21vY2sgbmFtZXNwYWNlIGlzIG5vdCBpbiBnbG9iYWwgc2NvcGUnKTtcclxuICogICAgIGNvbnNvbGUuYXNzZXJ0KG9iamVjdCA9PT0gbG9jYWxTY29wZS5tb2NrLm9iamVjdCwgJ21vY2sub2JqZWN0IGlzIGF2YWlsYWJsZSBpbiBsb2NhbFNjb3BlJyk7XHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmdcclxuICogIEEgcXVhbGlmaWVkIG9iamVjdCBuYW1lLCBlLmcuICdjb20uZXhhbXBsZS5DbGFzcydcclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdXHJcbiAqICBBbiBvYmplY3QgdG8gbWFrZSB0aGUgcmVmZXJlbnQgb2YgdGhlIG5hbWVzcGFjZS5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IFtzY29wZV1cclxuICogIFRoZSBuYW1lc3BhY2UncyByb290IG5vZGUuIElmIG5vdCBzdXBwbGllZCwgdGhlIGdsb2JhbFxyXG4gKiAgc2NvcGUgd2lsbCBiZSBuYW1lc3BhY2VzIHJvb3Qgbm9kZS5cclxuICpcclxuICogQHJldHVybiB7T2JqZWN0fVxyXG4gKlxyXG4gKiAgQSByZWZlcmVuY2UgdG8gdGhlIGxhc3Qgbm9kZSBvZiB0aGUgT2JqZWN0IGhpZXJhcmNoeSBjcmVhdGVkLlxyXG4gKi9cclxuZnVuY3Rpb24gZGVjbGFyZSAocXVhbGlmaWVkTmFtZSwgb2JqZWN0LCBzY29wZSlcclxue1xyXG4gICAgdmFyIG5vZGVzPSBxdWFsaWZpZWROYW1lLnNwbGl0KCcuJylcclxuICAgICAgICAsICAgbm9kZT0gc2NvcGUgfHwgT29wSGVscC5nbG9iYWxcclxuICAgICAgICAsICAgbGFzdE5vZGVcclxuICAgICAgICAsICAgbmV3Tm9kZVxyXG4gICAgICAgICwgICBub2RlTmFtZTtcclxuXHJcbiAgICBmb3IgKHZhciBpPSAwLCBuPSBub2Rlcy5sZW5ndGg7IGkgPCBuOyBpKyspXHJcbiAgICB7XHJcbiAgICAgICAgbGFzdE5vZGU9IG5vZGU7XHJcbiAgICAgICAgbm9kZU5hbWU9IG5vZGVzW2ldO1xyXG5cclxuICAgICAgICBub2RlPSAobnVsbCA9PSBub2RlW25vZGVOYW1lXSA/IG5vZGVbbm9kZU5hbWVdID0ge30gOiBub2RlW25vZGVOYW1lXSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG51bGwgPT0gb2JqZWN0KVxyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG5cclxuICAgIHJldHVybiBsYXN0Tm9kZVtub2RlTmFtZV09IG9iamVjdDtcclxufTtcclxuXHJcblxyXG5cclxuXHJcbi8qKlxyXG4gKiBAbWVtYmVyIHB1cmVtdmNcclxuICpcclxuICogRGVmaW5lIGEgbmV3IGNsYXNzbGV0LiBDdXJyZW50IGVkaXRpb25zIG9mIEphdmFTY3JpcHQgZG8gbm90IGhhdmUgY2xhc3NlcyxcclxuICogYnV0IHRoZXkgY2FuIGJlIGVtdWxhdGVkLCBhbmQgdGhpcyBtZXRob2QgZG9lcyB0aGlzIGZvciB5b3UsIHNhdmluZyB5b3VcclxuICogZnJvbSBoYXZpbmcgdG8gd29yayB3aXRoIEZ1bmN0aW9uIHByb3RvdHlwZSBkaXJlY3RseS4gVGhlIG1ldGhvZCBkb2VzXHJcbiAqIG5vdCBleHRlbmQgYW55IE5hdGl2ZSBvYmplY3RzIGFuZCBpcyBlbnRpcmVseSBvcHQgaW4uIEl0cyBwYXJ0aWN1bGFybHlcclxuICogdXNlZnVsbCBpZiB5b3Ugd2FudCB0byBtYWtlIHlvdXIgUHVyZU12YyBhcHBsaWNhdGlvbnMgbW9yZSBwb3J0YWJsZSwgYnlcclxuICogZGVjb3VwbGluZyB0aGVtIGZyb20gYSBzcGVjaWZpYyBPT1AgYWJzdHJhY3Rpb24gbGlicmFyeS5cclxuICpcclxuICpcclxuICogICAgIHB1cmVtdmMuZGVmaW5lXHJcbiAqICAgICAoXHJcbiAqICAgICAgICAgLy8gdGhlIGZpcnN0IG9iamVjdCBzdXBwbGllZCBpcyBhIGNsYXNzIGRlc2NyaXB0b3IuIE5vbmUgb2YgdGhlc2VcclxuICogICAgICAgICAvLyBwcm9wZXJ0aWVzIGFyZSBhZGRlZCB0byB5b3VyIGNsYXNzLCB0aGUgZXhjZXB0aW9uIGJlaW5nIHRoZVxyXG4gKiAgICAgICAgIC8vIGNvbnN0cnVjdG9yIHByb3BlcnR5LCB3aGljaCBpZiBzdXBwbGllZCwgd2lsbCBiZSB5b3VyIGNsYXNzZXNcclxuICogICAgICAgICAvLyBjb25zdHJ1Y3Rvci5cclxuICogICAgICAgICB7XHJcbiAqICAgICAgICAgICAgIC8vIHlvdXIgY2xhc3NlcyBuYW1lc3BhY2UtIGlmIHN1cHBsaWVkLCBpdCB3aWxsIGJlIFxyXG4gKiAgICAgICAgICAgICAvLyBjcmVhdGVkIGZvciB5b3VcclxuICogICAgICAgICAgICAgbmFtZTogJ2NvbS5leGFtcGxlLlVzZXJNZWRpYXRvcidcclxuICogXHJcbiAqICAgICAgICAgICAgIC8vIHlvdXIgY2xhc3NlcyBwYXJlbnQgY2xhc3MuIElmIHN1cHBsaWVkLCBpbmhlcml0YW5jZSBcclxuICogICAgICAgICAgICAgLy8gd2lsbCBiZSB0YWtlbiBjYXJlIG9mIGZvciB5b3VcclxuICogICAgICAgICAsICAgcGFyZW50OiBwdXJlbXZjLk1lZGlhdG9yXHJcbiAqIFxyXG4gKiAgICAgICAgICAgICAvLyB5b3VyIGNsYXNzZXMgY29uc3RydWN0b3IuIElmIG5vdCBzdXBwbGllZCwgb25lIHdpbGwgYmUgXHJcbiAqICAgICAgICAgICAgIC8vIGNyZWF0ZWQgZm9yIHlvdVxyXG4gKiAgICAgICAgICwgICBjb25zdHJ1Y3RvcjogZnVuY3Rpb24gVXNlck1lZGlhdG9yIChjb21wb25lbnQpXHJcbiAqICAgICAgICAgICAgIHtcclxuICogICAgICAgICAgICAgICAgICBwdXJlbXZjLk1lZGlhdG9yLmNhbGwodGhpcywgdGhpcy5jb25zdHJ1Y3Rvci5OQU1FLCBjb21wb25lbnQpOyAgXHJcbiAqICAgICAgICAgICAgIH1cclxuICogICAgICAgICB9XHJcbiAqXHJcbiAqICAgICAgICAgLy8gdGhlIHNlY29uZCBvYmplY3Qgc3VwcGxpZWQgZGVmaW5lcyB5b3VyIGNsYXNzIHRyYWl0cywgdGhhdCBpc1xyXG4gKiAgICAgICAgIC8vIHRoZSBwcm9wZXJ0aWVzIHRoYXQgd2lsbCBiZSBkZWZpbmVkIG9uIHlvdXIgY2xhc3NlcyBwcm90b3R5cGVcclxuICogICAgICAgICAvLyBhbmQgdGhlcmVieSBvbiBhbGwgaW5zdGFuY2VzIG9mIHRoaXMgY2xhc3NcclxuICogICAgICwgICB7XHJcbiAqICAgICAgICAgICAgIGJ1c2luZXNzTWV0aG9kOiBmdW5jdGlvbiAoKVxyXG4gKiAgICAgICAgICAgICB7XHJcbiAqICAgICAgICAgICAgICAgICAvLyBpbXBsIFxyXG4gKiAgICAgICAgICAgICB9XHJcbiAqICAgICAgICAgfVxyXG4gKlxyXG4gKiAgICAgICAgIC8vIHRoZSB0aGlyZCBvYmplY3Qgc3VwcGxpZWQgZGVmaW5lcyB5b3VyIGNsYXNzZXMgJ3N0YXRpYycgdHJhaXRzXHJcbiAqICAgICAgICAgLy8gdGhhdCBpcywgdGhlIG1ldGhvZHMgYW5kIHByb3BlcnRpZXMgd2hpY2ggd2lsbCBiZSBkZWZpbmVkIG9uXHJcbiAqICAgICAgICAgLy8geW91ciBjbGFzc2VzIGNvbnN0cnVjdG9yXHJcbiAqICAgICAsICAge1xyXG4gKiAgICAgICAgICAgICBOQU1FOiAndXNlck1lZGlhdG9yJ1xyXG4gKiAgICAgICAgIH1cclxuICogICAgICk7XHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBbY2xhc3NpbmZvXVxyXG4gKiAgQW4gb2JqZWN0IGRlc2NyaWJpbmcgdGhlIGNsYXNzLiBUaGlzIG9iamVjdCBjYW4gaGF2ZSBhbnkgb3IgYWxsIG9mXHJcbiAqICB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXM6XHJcbiAqXHJcbiAqICAtIG5hbWU6IFN0cmluZ1xyXG4gKiAgICAgIFRoZSBjbGFzc2xldHMgbmFtZS4gVGhpcyBjYW4gYmUgYW55IGFyYml0cmFyeSBxdWFsaWZpZWQgb2JqZWN0XHJcbiAqICAgICAgbmFtZS4gJ2NvbS5leGFtcGxlLkNsYXNzbGV0JyBvciBzaW1wbHkgJ015Q2xhc3NsZXQnIGZvciBleGFtcGxlXHJcbiAqICAgICAgVGhlIG1ldGhvZCB3aWxsIGF1dG9tYXRpY2FsbHkgY3JlYXRlIGFuIG9iamVjdCBoaWVyYXJjaHkgcmVmZXJpbmdcclxuICogICAgICB0byB5b3VyIGNsYXNzIGZvciB5b3UuIE5vdGUgdGhhdCB5b3Ugd2lsbCBuZWVkIHRvIGNhcHR1cmUgdGhlXHJcbiAqICAgICAgbWV0aG9kcyByZXR1cm4gdmFsdWUgdG8gcmV0cmlldmUgYSByZWZlcmVuY2UgdG8geW91ciBjbGFzcyBpZiB0aGVcclxuICogICAgICBjbGFzcyBuYW1lIHByb3BlcnR5IGlzIG5vdCBkZWZpbmVkLlxyXG4gKiAgLSBwYXJlbnQ6IEZ1bmN0aW9uXHJcbiAqICAgICAgVGhlIGNsYXNzbGV0cyAnc3VwZXJjbGFzcycuIFlvdXIgY2xhc3Mgd2lsbCBiZSBleHRlbmRlZCBmcm9tIHRoaXNcclxuICogICAgICBpZiBzdXBwbGllZC5cclxuICpcclxuICogIC0gY29uc3RydWN0b3I6IEZ1bmN0aW9uXHJcbiAqICAgICAgVGhlIGNsYXNzbGV0cyBjb25zdHJ1Y3Rvci4gTm90ZSB0aGlzIGlzICpub3QqIGEgcG9zdCBjb25zdHJ1Y3RcclxuICogICAgICBpbml0aWFsaXplIG1ldGhvZCwgYnV0IHlvdXIgY2xhc3NlcyBjb25zdHJ1Y3RvciBGdW5jdGlvbi5cclxuICogICAgICBJZiB0aGlzIGF0dHJpYnV0ZSBpcyBub3QgZGVmaW5lZCwgYSBjb25zdHJ1Y3RvciB3aWxsIGJlIGNyZWF0ZWQgZm9yXHJcbiAqICAgICAgeW91IGF1dG9tYXRpY2FsbHkuIElmIHlvdSBoYXZlIHN1cHBsaWVkIGEgcGFyZW50IGNsYXNzXHJcbiAqICAgICAgdmFsdWUgYW5kIG5vdCBkZWZpbmVkIHRoZSBjbGFzc2VzIGNvbnN0cnVjdG9yLCB0aGUgYXV0b21hdGljYWxseVxyXG4gKiAgICAgIGNyZWF0ZWQgY29uc3RydWN0b3Igd2lsbCBpbnZva2UgdGhlIHN1cGVyIGNsYXNzIGNvbnN0cnVjdG9yXHJcbiAqICAgICAgYXV0b21hdGljYWxseS4gSWYgeW91IGhhdmUgc3VwcGxpZWQgeW91ciBvd24gY29uc3RydWN0b3IgYW5kIHlvdVxyXG4gKiAgICAgIHdpc2ggdG8gaW52b2tlIGl0J3Mgc3VwZXIgY29uc3RydWN0b3IsIHlvdSBtdXN0IGRvIHRoaXMgbWFudWFsbHksIGFzXHJcbiAqICAgICAgdGhlcmUgaXMgbm8gcmVmZXJlbmNlIHRvIHRoZSBjbGFzc2VzIHBhcmVudCBhZGRlZCB0byB0aGUgY29uc3RydWN0b3JcclxuICogICAgICBwcm90b3R5cGUuXHJcbiAqXHJcbiAqICAtIHNjb3BlOiBPYmplY3QuXHJcbiAqICAgICAgRm9yIHVzZSBpbiBhZHZhbmNlZCBzY2VuYXJpb3MuIElmIHRoZSBuYW1lIGF0dHJpYnV0ZSBoYXMgYmVlbiBzdXBwbGllZCxcclxuICogICAgICB0aGlzIHZhbHVlIHdpbGwgYmUgdGhlIHJvb3Qgb2YgdGhlIG9iamVjdCBoaWVyYXJjaHkgY3JlYXRlZCBmb3IgeW91LlxyXG4gKiAgICAgIFVzZSBpdCBkbyBkZWZpbmUgeW91ciBvd24gY2xhc3MgaGllcmFyY2hpZXMgaW4gcHJpdmF0ZSBzY29wZXMsXHJcbiAqICAgICAgYWNjcm9zcyBpRnJhbWVzLCBpbiB5b3VyIHVuaXQgdGVzdHMsIG9yIGF2b2lkIGNvbGxpc2lvbiB3aXRoIHRoaXJkXHJcbiAqICAgICAgcGFydHkgbGlicmFyeSBuYW1lc3BhY2VzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gW3RyYWl0c11cclxuICogIEFuIE9iamVjdCwgdGhlIHByb3BlcnRpZXMgb2Ygd2hpY2ggd2lsbCBiZSBhZGRlZCB0byB0aGVcclxuICogIGNsYXNzIGNvbnN0cnVjdG9ycyBwcm90b3R5cGUuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBbc3RhaXRjVHJhaXRzXVxyXG4gKiAgQW4gT2JqZWN0LCB0aGUgcHJvcGVydGllcyBvZiB3aGljaCB3aWxsIGJlIGFkZGVkIGRpcmVjdGx5XHJcbiAqICB0byB0aGlzIGNsYXNzIGNvbnN0cnVjdG9yXHJcbiAqXHJcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxyXG4gKiAgQSByZWZlcmVuY2UgdG8gdGhlIGNsYXNzbGV0cyBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gZGVmaW5lIChjbGFzc0luZm8sIHRyYWl0cywgc3RhdGljVHJhaXRzKVxyXG57XHJcbiAgICBpZiAoIWNsYXNzSW5mbylcclxuICAgIHtcclxuICAgICAgICBjbGFzc0luZm89IHt9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGNsYXNzTmFtZT0gY2xhc3NJbmZvLm5hbWVcclxuICAgICAgICAsICAgY2xhc3NQYXJlbnQ9IGNsYXNzSW5mby5wYXJlbnRcclxuICAgICAgICAsICAgZG9FeHRlbmQ9ICdmdW5jdGlvbicgPT09IHR5cGVvZiBjbGFzc1BhcmVudFxyXG4gICAgICAgICwgICBjbGFzc0NvbnN0cnVjdG9yXHJcbiAgICAgICAgLCAgIGNsYXNzU2NvcGU9IGNsYXNzSW5mby5zY29wZSB8fCBudWxsXHJcbiAgICAgICAgLCAgIHByb3RvdHlwZVxyXG5cclxuICAgIGlmICgncGFyZW50JyBpbiBjbGFzc0luZm8gJiYgIWRvRXh0ZW5kKVxyXG4gICAge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0NsYXNzIHBhcmVudCBtdXN0IGJlIEZ1bmN0aW9uJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNsYXNzSW5mby5oYXNPd25Qcm9wZXJ0eSgnY29uc3RydWN0b3InKSlcclxuICAgIHtcclxuICAgICAgICBjbGFzc0NvbnN0cnVjdG9yPSBjbGFzc0luZm8uY29uc3RydWN0b3JcclxuICAgICAgICBpZiAoJ2Z1bmN0aW9uJyAhPT0gdHlwZW9mIGNsYXNzQ29uc3RydWN0b3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDbGFzcyBjb25zdHJ1Y3RvciBtdXN0IGJlIEZ1bmN0aW9uJylcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIC8vIHRoZXJlIGlzIG5vIGNvbnN0cnVjdG9yLCBjcmVhdGUgb25lXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKGRvRXh0ZW5kKSAvLyBlbnN1cmUgdG8gY2FsbCB0aGUgc3VwZXIgY29uc3RydWN0b3JcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNsYXNzQ29uc3RydWN0b3I9IGZ1bmN0aW9uICgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNsYXNzUGFyZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSAvLyBqdXN0IGNyZWF0ZSBhIEZ1bmN0aW9uXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjbGFzc0NvbnN0cnVjdG9yPSBuZXcgRnVuY3Rpb247XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChkb0V4dGVuZClcclxuICAgIHtcclxuICAgICAgICBPb3BIZWxwLmV4dGVuZChjbGFzc0NvbnN0cnVjdG9yLCBjbGFzc1BhcmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRyYWl0cylcclxuICAgIHtcclxuICAgICAgICBwcm90b3R5cGU9IGNsYXNzQ29uc3RydWN0b3IucHJvdG90eXBlXHJcbiAgICAgICAgT29wSGVscC5kZWNvcmF0ZShwcm90b3R5cGUsIHRyYWl0cyk7XHJcbiAgICAgICAgLy8gcmVhc3NpZ24gY29uc3RydWN0b3IgXHJcbiAgICAgICAgcHJvdG90eXBlLmNvbnN0cnVjdG9yPSBjbGFzc0NvbnN0cnVjdG9yO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChzdGF0aWNUcmFpdHMpXHJcbiAgICB7XHJcbiAgICAgICAgT29wSGVscC5kZWNvcmF0ZShjbGFzc0NvbnN0cnVjdG9yLCBzdGF0aWNUcmFpdHMpXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNsYXNzTmFtZSlcclxuICAgIHtcclxuICAgICAgICBpZiAoJ3N0cmluZycgIT09IHR5cGVvZiBjbGFzc05hbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDbGFzcyBuYW1lIG11c3QgYmUgcHJpbWl0aXZlIHN0cmluZycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGVjbGFyZSAoY2xhc3NOYW1lLCBjbGFzc0NvbnN0cnVjdG9yLCBjbGFzc1Njb3BlKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY2xhc3NDb25zdHJ1Y3RvcjtcclxufTtcclxuXHJcblxyXG5cclxuLyogaW1wbGVtZW50YXRpb24gZW5kICovXHJcblxyXG4vLyBkZWZpbmUgdGhlIHB1cmVtdmMgZ2xvYmFsIG5hbWVzcGFjZSBhbmQgZXhwb3J0IHRoZSBhY3RvcnNcclxudmFyIHB1cmVtdmMgPVxyXG57XHJcbiAgICAgICAgVmlldzogVmlld1xyXG4gICAgLFx0TW9kZWw6IE1vZGVsXHJcbiAgICAsXHRDb250cm9sbGVyOiBDb250cm9sbGVyXHJcbiAgICAsXHRTaW1wbGVDb21tYW5kOiBTaW1wbGVDb21tYW5kXHJcbiAgICAsXHRNYWNyb0NvbW1hbmQ6IE1hY3JvQ29tbWFuZFxyXG4gICAgLFx0RmFjYWRlOiBGYWNhZGVcclxuICAgICxcdE1lZGlhdG9yOiBNZWRpYXRvclxyXG4gICAgLFx0T2JzZXJ2ZXI6IE9ic2VydmVyXHJcbiAgICAsXHROb3RpZmljYXRpb246IE5vdGlmaWNhdGlvblxyXG4gICAgLFx0Tm90aWZpZXI6IE5vdGlmaWVyXHJcbiAgICAsXHRQcm94eTogUHJveHlcclxuICAgICxcdGRlZmluZTogZGVmaW5lXHJcbiAgICAsXHRkZWNsYXJlOiBkZWNsYXJlXHJcbn07XHJcblxyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcHVyZW12YzsiLCIvLyAgICAgVW5kZXJzY29yZS5qcyAxLjcuMFxuLy8gICAgIGh0dHA6Ly91bmRlcnNjb3JlanMub3JnXG4vLyAgICAgKGMpIDIwMDktMjAxNCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuLy8gICAgIFVuZGVyc2NvcmUgbWF5IGJlIGZyZWVseSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG5cbihmdW5jdGlvbigpIHtcblxuICAvLyBCYXNlbGluZSBzZXR1cFxuICAvLyAtLS0tLS0tLS0tLS0tLVxuXG4gIC8vIEVzdGFibGlzaCB0aGUgcm9vdCBvYmplY3QsIGB3aW5kb3dgIGluIHRoZSBicm93c2VyLCBvciBgZXhwb3J0c2Agb24gdGhlIHNlcnZlci5cbiAgdmFyIHJvb3QgPSB0aGlzO1xuXG4gIC8vIFNhdmUgdGhlIHByZXZpb3VzIHZhbHVlIG9mIHRoZSBgX2AgdmFyaWFibGUuXG4gIHZhciBwcmV2aW91c1VuZGVyc2NvcmUgPSByb290Ll87XG5cbiAgLy8gU2F2ZSBieXRlcyBpbiB0aGUgbWluaWZpZWQgKGJ1dCBub3QgZ3ppcHBlZCkgdmVyc2lvbjpcbiAgdmFyIEFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGUsIE9ialByb3RvID0gT2JqZWN0LnByb3RvdHlwZSwgRnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuXG4gIC8vIENyZWF0ZSBxdWljayByZWZlcmVuY2UgdmFyaWFibGVzIGZvciBzcGVlZCBhY2Nlc3MgdG8gY29yZSBwcm90b3R5cGVzLlxuICB2YXJcbiAgICBwdXNoICAgICAgICAgICAgID0gQXJyYXlQcm90by5wdXNoLFxuICAgIHNsaWNlICAgICAgICAgICAgPSBBcnJheVByb3RvLnNsaWNlLFxuICAgIGNvbmNhdCAgICAgICAgICAgPSBBcnJheVByb3RvLmNvbmNhdCxcbiAgICB0b1N0cmluZyAgICAgICAgID0gT2JqUHJvdG8udG9TdHJpbmcsXG4gICAgaGFzT3duUHJvcGVydHkgICA9IE9ialByb3RvLmhhc093blByb3BlcnR5O1xuXG4gIC8vIEFsbCAqKkVDTUFTY3JpcHQgNSoqIG5hdGl2ZSBmdW5jdGlvbiBpbXBsZW1lbnRhdGlvbnMgdGhhdCB3ZSBob3BlIHRvIHVzZVxuICAvLyBhcmUgZGVjbGFyZWQgaGVyZS5cbiAgdmFyXG4gICAgbmF0aXZlSXNBcnJheSAgICAgID0gQXJyYXkuaXNBcnJheSxcbiAgICBuYXRpdmVLZXlzICAgICAgICAgPSBPYmplY3Qua2V5cyxcbiAgICBuYXRpdmVCaW5kICAgICAgICAgPSBGdW5jUHJvdG8uYmluZDtcblxuICAvLyBDcmVhdGUgYSBzYWZlIHJlZmVyZW5jZSB0byB0aGUgVW5kZXJzY29yZSBvYmplY3QgZm9yIHVzZSBiZWxvdy5cbiAgdmFyIF8gPSBmdW5jdGlvbihvYmopIHtcbiAgICBpZiAob2JqIGluc3RhbmNlb2YgXykgcmV0dXJuIG9iajtcbiAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgXykpIHJldHVybiBuZXcgXyhvYmopO1xuICAgIHRoaXMuX3dyYXBwZWQgPSBvYmo7XG4gIH07XG5cbiAgLy8gRXhwb3J0IHRoZSBVbmRlcnNjb3JlIG9iamVjdCBmb3IgKipOb2RlLmpzKiosIHdpdGhcbiAgLy8gYmFja3dhcmRzLWNvbXBhdGliaWxpdHkgZm9yIHRoZSBvbGQgYHJlcXVpcmUoKWAgQVBJLiBJZiB3ZSdyZSBpblxuICAvLyB0aGUgYnJvd3NlciwgYWRkIGBfYCBhcyBhIGdsb2JhbCBvYmplY3QuXG4gIGlmICh0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICAgIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IF87XG4gICAgfVxuICAgIGV4cG9ydHMuXyA9IF87XG4gIH0gZWxzZSB7XG4gICAgcm9vdC5fID0gXztcbiAgfVxuXG4gIC8vIEN1cnJlbnQgdmVyc2lvbi5cbiAgXy5WRVJTSU9OID0gJzEuNy4wJztcblxuICAvLyBJbnRlcm5hbCBmdW5jdGlvbiB0aGF0IHJldHVybnMgYW4gZWZmaWNpZW50IChmb3IgY3VycmVudCBlbmdpbmVzKSB2ZXJzaW9uXG4gIC8vIG9mIHRoZSBwYXNzZWQtaW4gY2FsbGJhY2ssIHRvIGJlIHJlcGVhdGVkbHkgYXBwbGllZCBpbiBvdGhlciBVbmRlcnNjb3JlXG4gIC8vIGZ1bmN0aW9ucy5cbiAgdmFyIGNyZWF0ZUNhbGxiYWNrID0gZnVuY3Rpb24oZnVuYywgY29udGV4dCwgYXJnQ291bnQpIHtcbiAgICBpZiAoY29udGV4dCA9PT0gdm9pZCAwKSByZXR1cm4gZnVuYztcbiAgICBzd2l0Y2ggKGFyZ0NvdW50ID09IG51bGwgPyAzIDogYXJnQ291bnQpIHtcbiAgICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBmdW5jLmNhbGwoY29udGV4dCwgdmFsdWUpO1xuICAgICAgfTtcbiAgICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uKHZhbHVlLCBvdGhlcikge1xuICAgICAgICByZXR1cm4gZnVuYy5jYWxsKGNvbnRleHQsIHZhbHVlLCBvdGhlcik7XG4gICAgICB9O1xuICAgICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24odmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKSB7XG4gICAgICAgIHJldHVybiBmdW5jLmNhbGwoY29udGV4dCwgdmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKTtcbiAgICAgIH07XG4gICAgICBjYXNlIDQ6IHJldHVybiBmdW5jdGlvbihhY2N1bXVsYXRvciwgdmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKSB7XG4gICAgICAgIHJldHVybiBmdW5jLmNhbGwoY29udGV4dCwgYWNjdW11bGF0b3IsIHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbik7XG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZnVuYy5hcHBseShjb250ZXh0LCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH07XG5cbiAgLy8gQSBtb3N0bHktaW50ZXJuYWwgZnVuY3Rpb24gdG8gZ2VuZXJhdGUgY2FsbGJhY2tzIHRoYXQgY2FuIGJlIGFwcGxpZWRcbiAgLy8gdG8gZWFjaCBlbGVtZW50IGluIGEgY29sbGVjdGlvbiwgcmV0dXJuaW5nIHRoZSBkZXNpcmVkIHJlc3VsdCDigJQgZWl0aGVyXG4gIC8vIGlkZW50aXR5LCBhbiBhcmJpdHJhcnkgY2FsbGJhY2ssIGEgcHJvcGVydHkgbWF0Y2hlciwgb3IgYSBwcm9wZXJ0eSBhY2Nlc3Nvci5cbiAgXy5pdGVyYXRlZSA9IGZ1bmN0aW9uKHZhbHVlLCBjb250ZXh0LCBhcmdDb3VudCkge1xuICAgIGlmICh2YWx1ZSA9PSBudWxsKSByZXR1cm4gXy5pZGVudGl0eTtcbiAgICBpZiAoXy5pc0Z1bmN0aW9uKHZhbHVlKSkgcmV0dXJuIGNyZWF0ZUNhbGxiYWNrKHZhbHVlLCBjb250ZXh0LCBhcmdDb3VudCk7XG4gICAgaWYgKF8uaXNPYmplY3QodmFsdWUpKSByZXR1cm4gXy5tYXRjaGVzKHZhbHVlKTtcbiAgICByZXR1cm4gXy5wcm9wZXJ0eSh2YWx1ZSk7XG4gIH07XG5cbiAgLy8gQ29sbGVjdGlvbiBGdW5jdGlvbnNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAvLyBUaGUgY29ybmVyc3RvbmUsIGFuIGBlYWNoYCBpbXBsZW1lbnRhdGlvbiwgYWthIGBmb3JFYWNoYC5cbiAgLy8gSGFuZGxlcyByYXcgb2JqZWN0cyBpbiBhZGRpdGlvbiB0byBhcnJheS1saWtlcy4gVHJlYXRzIGFsbFxuICAvLyBzcGFyc2UgYXJyYXktbGlrZXMgYXMgaWYgdGhleSB3ZXJlIGRlbnNlLlxuICBfLmVhY2ggPSBfLmZvckVhY2ggPSBmdW5jdGlvbihvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgaWYgKG9iaiA9PSBudWxsKSByZXR1cm4gb2JqO1xuICAgIGl0ZXJhdGVlID0gY3JlYXRlQ2FsbGJhY2soaXRlcmF0ZWUsIGNvbnRleHQpO1xuICAgIHZhciBpLCBsZW5ndGggPSBvYmoubGVuZ3RoO1xuICAgIGlmIChsZW5ndGggPT09ICtsZW5ndGgpIHtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBpdGVyYXRlZShvYmpbaV0sIGksIG9iaik7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBrZXlzID0gXy5rZXlzKG9iaik7XG4gICAgICBmb3IgKGkgPSAwLCBsZW5ndGggPSBrZXlzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGl0ZXJhdGVlKG9ialtrZXlzW2ldXSwga2V5c1tpXSwgb2JqKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbiAgfTtcblxuICAvLyBSZXR1cm4gdGhlIHJlc3VsdHMgb2YgYXBwbHlpbmcgdGhlIGl0ZXJhdGVlIHRvIGVhY2ggZWxlbWVudC5cbiAgXy5tYXAgPSBfLmNvbGxlY3QgPSBmdW5jdGlvbihvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgaWYgKG9iaiA9PSBudWxsKSByZXR1cm4gW107XG4gICAgaXRlcmF0ZWUgPSBfLml0ZXJhdGVlKGl0ZXJhdGVlLCBjb250ZXh0KTtcbiAgICB2YXIga2V5cyA9IG9iai5sZW5ndGggIT09ICtvYmoubGVuZ3RoICYmIF8ua2V5cyhvYmopLFxuICAgICAgICBsZW5ndGggPSAoa2V5cyB8fCBvYmopLmxlbmd0aCxcbiAgICAgICAgcmVzdWx0cyA9IEFycmF5KGxlbmd0aCksXG4gICAgICAgIGN1cnJlbnRLZXk7XG4gICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgY3VycmVudEtleSA9IGtleXMgPyBrZXlzW2luZGV4XSA6IGluZGV4O1xuICAgICAgcmVzdWx0c1tpbmRleF0gPSBpdGVyYXRlZShvYmpbY3VycmVudEtleV0sIGN1cnJlbnRLZXksIG9iaik7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRzO1xuICB9O1xuXG4gIHZhciByZWR1Y2VFcnJvciA9ICdSZWR1Y2Ugb2YgZW1wdHkgYXJyYXkgd2l0aCBubyBpbml0aWFsIHZhbHVlJztcblxuICAvLyAqKlJlZHVjZSoqIGJ1aWxkcyB1cCBhIHNpbmdsZSByZXN1bHQgZnJvbSBhIGxpc3Qgb2YgdmFsdWVzLCBha2EgYGluamVjdGAsXG4gIC8vIG9yIGBmb2xkbGAuXG4gIF8ucmVkdWNlID0gXy5mb2xkbCA9IF8uaW5qZWN0ID0gZnVuY3Rpb24ob2JqLCBpdGVyYXRlZSwgbWVtbywgY29udGV4dCkge1xuICAgIGlmIChvYmogPT0gbnVsbCkgb2JqID0gW107XG4gICAgaXRlcmF0ZWUgPSBjcmVhdGVDYWxsYmFjayhpdGVyYXRlZSwgY29udGV4dCwgNCk7XG4gICAgdmFyIGtleXMgPSBvYmoubGVuZ3RoICE9PSArb2JqLmxlbmd0aCAmJiBfLmtleXMob2JqKSxcbiAgICAgICAgbGVuZ3RoID0gKGtleXMgfHwgb2JqKS5sZW5ndGgsXG4gICAgICAgIGluZGV4ID0gMCwgY3VycmVudEtleTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDMpIHtcbiAgICAgIGlmICghbGVuZ3RoKSB0aHJvdyBuZXcgVHlwZUVycm9yKHJlZHVjZUVycm9yKTtcbiAgICAgIG1lbW8gPSBvYmpba2V5cyA/IGtleXNbaW5kZXgrK10gOiBpbmRleCsrXTtcbiAgICB9XG4gICAgZm9yICg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICBjdXJyZW50S2V5ID0ga2V5cyA/IGtleXNbaW5kZXhdIDogaW5kZXg7XG4gICAgICBtZW1vID0gaXRlcmF0ZWUobWVtbywgb2JqW2N1cnJlbnRLZXldLCBjdXJyZW50S2V5LCBvYmopO1xuICAgIH1cbiAgICByZXR1cm4gbWVtbztcbiAgfTtcblxuICAvLyBUaGUgcmlnaHQtYXNzb2NpYXRpdmUgdmVyc2lvbiBvZiByZWR1Y2UsIGFsc28ga25vd24gYXMgYGZvbGRyYC5cbiAgXy5yZWR1Y2VSaWdodCA9IF8uZm9sZHIgPSBmdW5jdGlvbihvYmosIGl0ZXJhdGVlLCBtZW1vLCBjb250ZXh0KSB7XG4gICAgaWYgKG9iaiA9PSBudWxsKSBvYmogPSBbXTtcbiAgICBpdGVyYXRlZSA9IGNyZWF0ZUNhbGxiYWNrKGl0ZXJhdGVlLCBjb250ZXh0LCA0KTtcbiAgICB2YXIga2V5cyA9IG9iai5sZW5ndGggIT09ICsgb2JqLmxlbmd0aCAmJiBfLmtleXMob2JqKSxcbiAgICAgICAgaW5kZXggPSAoa2V5cyB8fCBvYmopLmxlbmd0aCxcbiAgICAgICAgY3VycmVudEtleTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDMpIHtcbiAgICAgIGlmICghaW5kZXgpIHRocm93IG5ldyBUeXBlRXJyb3IocmVkdWNlRXJyb3IpO1xuICAgICAgbWVtbyA9IG9ialtrZXlzID8ga2V5c1stLWluZGV4XSA6IC0taW5kZXhdO1xuICAgIH1cbiAgICB3aGlsZSAoaW5kZXgtLSkge1xuICAgICAgY3VycmVudEtleSA9IGtleXMgPyBrZXlzW2luZGV4XSA6IGluZGV4O1xuICAgICAgbWVtbyA9IGl0ZXJhdGVlKG1lbW8sIG9ialtjdXJyZW50S2V5XSwgY3VycmVudEtleSwgb2JqKTtcbiAgICB9XG4gICAgcmV0dXJuIG1lbW87XG4gIH07XG5cbiAgLy8gUmV0dXJuIHRoZSBmaXJzdCB2YWx1ZSB3aGljaCBwYXNzZXMgYSB0cnV0aCB0ZXN0LiBBbGlhc2VkIGFzIGBkZXRlY3RgLlxuICBfLmZpbmQgPSBfLmRldGVjdCA9IGZ1bmN0aW9uKG9iaiwgcHJlZGljYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIHJlc3VsdDtcbiAgICBwcmVkaWNhdGUgPSBfLml0ZXJhdGVlKHByZWRpY2F0ZSwgY29udGV4dCk7XG4gICAgXy5zb21lKG9iaiwgZnVuY3Rpb24odmFsdWUsIGluZGV4LCBsaXN0KSB7XG4gICAgICBpZiAocHJlZGljYXRlKHZhbHVlLCBpbmRleCwgbGlzdCkpIHtcbiAgICAgICAgcmVzdWx0ID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgLy8gUmV0dXJuIGFsbCB0aGUgZWxlbWVudHMgdGhhdCBwYXNzIGEgdHJ1dGggdGVzdC5cbiAgLy8gQWxpYXNlZCBhcyBgc2VsZWN0YC5cbiAgXy5maWx0ZXIgPSBfLnNlbGVjdCA9IGZ1bmN0aW9uKG9iaiwgcHJlZGljYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgICBpZiAob2JqID09IG51bGwpIHJldHVybiByZXN1bHRzO1xuICAgIHByZWRpY2F0ZSA9IF8uaXRlcmF0ZWUocHJlZGljYXRlLCBjb250ZXh0KTtcbiAgICBfLmVhY2gob2JqLCBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGxpc3QpIHtcbiAgICAgIGlmIChwcmVkaWNhdGUodmFsdWUsIGluZGV4LCBsaXN0KSkgcmVzdWx0cy5wdXNoKHZhbHVlKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfTtcblxuICAvLyBSZXR1cm4gYWxsIHRoZSBlbGVtZW50cyBmb3Igd2hpY2ggYSB0cnV0aCB0ZXN0IGZhaWxzLlxuICBfLnJlamVjdCA9IGZ1bmN0aW9uKG9iaiwgcHJlZGljYXRlLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIF8uZmlsdGVyKG9iaiwgXy5uZWdhdGUoXy5pdGVyYXRlZShwcmVkaWNhdGUpKSwgY29udGV4dCk7XG4gIH07XG5cbiAgLy8gRGV0ZXJtaW5lIHdoZXRoZXIgYWxsIG9mIHRoZSBlbGVtZW50cyBtYXRjaCBhIHRydXRoIHRlc3QuXG4gIC8vIEFsaWFzZWQgYXMgYGFsbGAuXG4gIF8uZXZlcnkgPSBfLmFsbCA9IGZ1bmN0aW9uKG9iaiwgcHJlZGljYXRlLCBjb250ZXh0KSB7XG4gICAgaWYgKG9iaiA9PSBudWxsKSByZXR1cm4gdHJ1ZTtcbiAgICBwcmVkaWNhdGUgPSBfLml0ZXJhdGVlKHByZWRpY2F0ZSwgY29udGV4dCk7XG4gICAgdmFyIGtleXMgPSBvYmoubGVuZ3RoICE9PSArb2JqLmxlbmd0aCAmJiBfLmtleXMob2JqKSxcbiAgICAgICAgbGVuZ3RoID0gKGtleXMgfHwgb2JqKS5sZW5ndGgsXG4gICAgICAgIGluZGV4LCBjdXJyZW50S2V5O1xuICAgIGZvciAoaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgY3VycmVudEtleSA9IGtleXMgPyBrZXlzW2luZGV4XSA6IGluZGV4O1xuICAgICAgaWYgKCFwcmVkaWNhdGUob2JqW2N1cnJlbnRLZXldLCBjdXJyZW50S2V5LCBvYmopKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIC8vIERldGVybWluZSBpZiBhdCBsZWFzdCBvbmUgZWxlbWVudCBpbiB0aGUgb2JqZWN0IG1hdGNoZXMgYSB0cnV0aCB0ZXN0LlxuICAvLyBBbGlhc2VkIGFzIGBhbnlgLlxuICBfLnNvbWUgPSBfLmFueSA9IGZ1bmN0aW9uKG9iaiwgcHJlZGljYXRlLCBjb250ZXh0KSB7XG4gICAgaWYgKG9iaiA9PSBudWxsKSByZXR1cm4gZmFsc2U7XG4gICAgcHJlZGljYXRlID0gXy5pdGVyYXRlZShwcmVkaWNhdGUsIGNvbnRleHQpO1xuICAgIHZhciBrZXlzID0gb2JqLmxlbmd0aCAhPT0gK29iai5sZW5ndGggJiYgXy5rZXlzKG9iaiksXG4gICAgICAgIGxlbmd0aCA9IChrZXlzIHx8IG9iaikubGVuZ3RoLFxuICAgICAgICBpbmRleCwgY3VycmVudEtleTtcbiAgICBmb3IgKGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIGN1cnJlbnRLZXkgPSBrZXlzID8ga2V5c1tpbmRleF0gOiBpbmRleDtcbiAgICAgIGlmIChwcmVkaWNhdGUob2JqW2N1cnJlbnRLZXldLCBjdXJyZW50S2V5LCBvYmopKSByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIC8vIERldGVybWluZSBpZiB0aGUgYXJyYXkgb3Igb2JqZWN0IGNvbnRhaW5zIGEgZ2l2ZW4gdmFsdWUgKHVzaW5nIGA9PT1gKS5cbiAgLy8gQWxpYXNlZCBhcyBgaW5jbHVkZWAuXG4gIF8uY29udGFpbnMgPSBfLmluY2x1ZGUgPSBmdW5jdGlvbihvYmosIHRhcmdldCkge1xuICAgIGlmIChvYmogPT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChvYmoubGVuZ3RoICE9PSArb2JqLmxlbmd0aCkgb2JqID0gXy52YWx1ZXMob2JqKTtcbiAgICByZXR1cm4gXy5pbmRleE9mKG9iaiwgdGFyZ2V0KSA+PSAwO1xuICB9O1xuXG4gIC8vIEludm9rZSBhIG1ldGhvZCAod2l0aCBhcmd1bWVudHMpIG9uIGV2ZXJ5IGl0ZW0gaW4gYSBjb2xsZWN0aW9uLlxuICBfLmludm9rZSA9IGZ1bmN0aW9uKG9iaiwgbWV0aG9kKSB7XG4gICAgdmFyIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XG4gICAgdmFyIGlzRnVuYyA9IF8uaXNGdW5jdGlvbihtZXRob2QpO1xuICAgIHJldHVybiBfLm1hcChvYmosIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gKGlzRnVuYyA/IG1ldGhvZCA6IHZhbHVlW21ldGhvZF0pLmFwcGx5KHZhbHVlLCBhcmdzKTtcbiAgICB9KTtcbiAgfTtcblxuICAvLyBDb252ZW5pZW5jZSB2ZXJzaW9uIG9mIGEgY29tbW9uIHVzZSBjYXNlIG9mIGBtYXBgOiBmZXRjaGluZyBhIHByb3BlcnR5LlxuICBfLnBsdWNrID0gZnVuY3Rpb24ob2JqLCBrZXkpIHtcbiAgICByZXR1cm4gXy5tYXAob2JqLCBfLnByb3BlcnR5KGtleSkpO1xuICB9O1xuXG4gIC8vIENvbnZlbmllbmNlIHZlcnNpb24gb2YgYSBjb21tb24gdXNlIGNhc2Ugb2YgYGZpbHRlcmA6IHNlbGVjdGluZyBvbmx5IG9iamVjdHNcbiAgLy8gY29udGFpbmluZyBzcGVjaWZpYyBga2V5OnZhbHVlYCBwYWlycy5cbiAgXy53aGVyZSA9IGZ1bmN0aW9uKG9iaiwgYXR0cnMpIHtcbiAgICByZXR1cm4gXy5maWx0ZXIob2JqLCBfLm1hdGNoZXMoYXR0cnMpKTtcbiAgfTtcblxuICAvLyBDb252ZW5pZW5jZSB2ZXJzaW9uIG9mIGEgY29tbW9uIHVzZSBjYXNlIG9mIGBmaW5kYDogZ2V0dGluZyB0aGUgZmlyc3Qgb2JqZWN0XG4gIC8vIGNvbnRhaW5pbmcgc3BlY2lmaWMgYGtleTp2YWx1ZWAgcGFpcnMuXG4gIF8uZmluZFdoZXJlID0gZnVuY3Rpb24ob2JqLCBhdHRycykge1xuICAgIHJldHVybiBfLmZpbmQob2JqLCBfLm1hdGNoZXMoYXR0cnMpKTtcbiAgfTtcblxuICAvLyBSZXR1cm4gdGhlIG1heGltdW0gZWxlbWVudCAob3IgZWxlbWVudC1iYXNlZCBjb21wdXRhdGlvbikuXG4gIF8ubWF4ID0gZnVuY3Rpb24ob2JqLCBpdGVyYXRlZSwgY29udGV4dCkge1xuICAgIHZhciByZXN1bHQgPSAtSW5maW5pdHksIGxhc3RDb21wdXRlZCA9IC1JbmZpbml0eSxcbiAgICAgICAgdmFsdWUsIGNvbXB1dGVkO1xuICAgIGlmIChpdGVyYXRlZSA9PSBudWxsICYmIG9iaiAhPSBudWxsKSB7XG4gICAgICBvYmogPSBvYmoubGVuZ3RoID09PSArb2JqLmxlbmd0aCA/IG9iaiA6IF8udmFsdWVzKG9iaik7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gb2JqLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhbHVlID0gb2JqW2ldO1xuICAgICAgICBpZiAodmFsdWUgPiByZXN1bHQpIHtcbiAgICAgICAgICByZXN1bHQgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpdGVyYXRlZSA9IF8uaXRlcmF0ZWUoaXRlcmF0ZWUsIGNvbnRleHQpO1xuICAgICAgXy5lYWNoKG9iaiwgZnVuY3Rpb24odmFsdWUsIGluZGV4LCBsaXN0KSB7XG4gICAgICAgIGNvbXB1dGVkID0gaXRlcmF0ZWUodmFsdWUsIGluZGV4LCBsaXN0KTtcbiAgICAgICAgaWYgKGNvbXB1dGVkID4gbGFzdENvbXB1dGVkIHx8IGNvbXB1dGVkID09PSAtSW5maW5pdHkgJiYgcmVzdWx0ID09PSAtSW5maW5pdHkpIHtcbiAgICAgICAgICByZXN1bHQgPSB2YWx1ZTtcbiAgICAgICAgICBsYXN0Q29tcHV0ZWQgPSBjb21wdXRlZDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgLy8gUmV0dXJuIHRoZSBtaW5pbXVtIGVsZW1lbnQgKG9yIGVsZW1lbnQtYmFzZWQgY29tcHV0YXRpb24pLlxuICBfLm1pbiA9IGZ1bmN0aW9uKG9iaiwgaXRlcmF0ZWUsIGNvbnRleHQpIHtcbiAgICB2YXIgcmVzdWx0ID0gSW5maW5pdHksIGxhc3RDb21wdXRlZCA9IEluZmluaXR5LFxuICAgICAgICB2YWx1ZSwgY29tcHV0ZWQ7XG4gICAgaWYgKGl0ZXJhdGVlID09IG51bGwgJiYgb2JqICE9IG51bGwpIHtcbiAgICAgIG9iaiA9IG9iai5sZW5ndGggPT09ICtvYmoubGVuZ3RoID8gb2JqIDogXy52YWx1ZXMob2JqKTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBvYmoubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFsdWUgPSBvYmpbaV07XG4gICAgICAgIGlmICh2YWx1ZSA8IHJlc3VsdCkge1xuICAgICAgICAgIHJlc3VsdCA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGl0ZXJhdGVlID0gXy5pdGVyYXRlZShpdGVyYXRlZSwgY29udGV4dCk7XG4gICAgICBfLmVhY2gob2JqLCBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGxpc3QpIHtcbiAgICAgICAgY29tcHV0ZWQgPSBpdGVyYXRlZSh2YWx1ZSwgaW5kZXgsIGxpc3QpO1xuICAgICAgICBpZiAoY29tcHV0ZWQgPCBsYXN0Q29tcHV0ZWQgfHwgY29tcHV0ZWQgPT09IEluZmluaXR5ICYmIHJlc3VsdCA9PT0gSW5maW5pdHkpIHtcbiAgICAgICAgICByZXN1bHQgPSB2YWx1ZTtcbiAgICAgICAgICBsYXN0Q29tcHV0ZWQgPSBjb21wdXRlZDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgLy8gU2h1ZmZsZSBhIGNvbGxlY3Rpb24sIHVzaW5nIHRoZSBtb2Rlcm4gdmVyc2lvbiBvZiB0aGVcbiAgLy8gW0Zpc2hlci1ZYXRlcyBzaHVmZmxlXShodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0Zpc2hlcuKAk1lhdGVzX3NodWZmbGUpLlxuICBfLnNodWZmbGUgPSBmdW5jdGlvbihvYmopIHtcbiAgICB2YXIgc2V0ID0gb2JqICYmIG9iai5sZW5ndGggPT09ICtvYmoubGVuZ3RoID8gb2JqIDogXy52YWx1ZXMob2JqKTtcbiAgICB2YXIgbGVuZ3RoID0gc2V0Lmxlbmd0aDtcbiAgICB2YXIgc2h1ZmZsZWQgPSBBcnJheShsZW5ndGgpO1xuICAgIGZvciAodmFyIGluZGV4ID0gMCwgcmFuZDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIHJhbmQgPSBfLnJhbmRvbSgwLCBpbmRleCk7XG4gICAgICBpZiAocmFuZCAhPT0gaW5kZXgpIHNodWZmbGVkW2luZGV4XSA9IHNodWZmbGVkW3JhbmRdO1xuICAgICAgc2h1ZmZsZWRbcmFuZF0gPSBzZXRbaW5kZXhdO1xuICAgIH1cbiAgICByZXR1cm4gc2h1ZmZsZWQ7XG4gIH07XG5cbiAgLy8gU2FtcGxlICoqbioqIHJhbmRvbSB2YWx1ZXMgZnJvbSBhIGNvbGxlY3Rpb24uXG4gIC8vIElmICoqbioqIGlzIG5vdCBzcGVjaWZpZWQsIHJldHVybnMgYSBzaW5nbGUgcmFuZG9tIGVsZW1lbnQuXG4gIC8vIFRoZSBpbnRlcm5hbCBgZ3VhcmRgIGFyZ3VtZW50IGFsbG93cyBpdCB0byB3b3JrIHdpdGggYG1hcGAuXG4gIF8uc2FtcGxlID0gZnVuY3Rpb24ob2JqLCBuLCBndWFyZCkge1xuICAgIGlmIChuID09IG51bGwgfHwgZ3VhcmQpIHtcbiAgICAgIGlmIChvYmoubGVuZ3RoICE9PSArb2JqLmxlbmd0aCkgb2JqID0gXy52YWx1ZXMob2JqKTtcbiAgICAgIHJldHVybiBvYmpbXy5yYW5kb20ob2JqLmxlbmd0aCAtIDEpXTtcbiAgICB9XG4gICAgcmV0dXJuIF8uc2h1ZmZsZShvYmopLnNsaWNlKDAsIE1hdGgubWF4KDAsIG4pKTtcbiAgfTtcblxuICAvLyBTb3J0IHRoZSBvYmplY3QncyB2YWx1ZXMgYnkgYSBjcml0ZXJpb24gcHJvZHVjZWQgYnkgYW4gaXRlcmF0ZWUuXG4gIF8uc29ydEJ5ID0gZnVuY3Rpb24ob2JqLCBpdGVyYXRlZSwgY29udGV4dCkge1xuICAgIGl0ZXJhdGVlID0gXy5pdGVyYXRlZShpdGVyYXRlZSwgY29udGV4dCk7XG4gICAgcmV0dXJuIF8ucGx1Y2soXy5tYXAob2JqLCBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGxpc3QpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICBjcml0ZXJpYTogaXRlcmF0ZWUodmFsdWUsIGluZGV4LCBsaXN0KVxuICAgICAgfTtcbiAgICB9KS5zb3J0KGZ1bmN0aW9uKGxlZnQsIHJpZ2h0KSB7XG4gICAgICB2YXIgYSA9IGxlZnQuY3JpdGVyaWE7XG4gICAgICB2YXIgYiA9IHJpZ2h0LmNyaXRlcmlhO1xuICAgICAgaWYgKGEgIT09IGIpIHtcbiAgICAgICAgaWYgKGEgPiBiIHx8IGEgPT09IHZvaWQgMCkgcmV0dXJuIDE7XG4gICAgICAgIGlmIChhIDwgYiB8fCBiID09PSB2b2lkIDApIHJldHVybiAtMTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBsZWZ0LmluZGV4IC0gcmlnaHQuaW5kZXg7XG4gICAgfSksICd2YWx1ZScpO1xuICB9O1xuXG4gIC8vIEFuIGludGVybmFsIGZ1bmN0aW9uIHVzZWQgZm9yIGFnZ3JlZ2F0ZSBcImdyb3VwIGJ5XCIgb3BlcmF0aW9ucy5cbiAgdmFyIGdyb3VwID0gZnVuY3Rpb24oYmVoYXZpb3IpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24ob2JqLCBpdGVyYXRlZSwgY29udGV4dCkge1xuICAgICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgICAgaXRlcmF0ZWUgPSBfLml0ZXJhdGVlKGl0ZXJhdGVlLCBjb250ZXh0KTtcbiAgICAgIF8uZWFjaChvYmosIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCkge1xuICAgICAgICB2YXIga2V5ID0gaXRlcmF0ZWUodmFsdWUsIGluZGV4LCBvYmopO1xuICAgICAgICBiZWhhdmlvcihyZXN1bHQsIHZhbHVlLCBrZXkpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gIH07XG5cbiAgLy8gR3JvdXBzIHRoZSBvYmplY3QncyB2YWx1ZXMgYnkgYSBjcml0ZXJpb24uIFBhc3MgZWl0aGVyIGEgc3RyaW5nIGF0dHJpYnV0ZVxuICAvLyB0byBncm91cCBieSwgb3IgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIGNyaXRlcmlvbi5cbiAgXy5ncm91cEJ5ID0gZ3JvdXAoZnVuY3Rpb24ocmVzdWx0LCB2YWx1ZSwga2V5KSB7XG4gICAgaWYgKF8uaGFzKHJlc3VsdCwga2V5KSkgcmVzdWx0W2tleV0ucHVzaCh2YWx1ZSk7IGVsc2UgcmVzdWx0W2tleV0gPSBbdmFsdWVdO1xuICB9KTtcblxuICAvLyBJbmRleGVzIHRoZSBvYmplY3QncyB2YWx1ZXMgYnkgYSBjcml0ZXJpb24sIHNpbWlsYXIgdG8gYGdyb3VwQnlgLCBidXQgZm9yXG4gIC8vIHdoZW4geW91IGtub3cgdGhhdCB5b3VyIGluZGV4IHZhbHVlcyB3aWxsIGJlIHVuaXF1ZS5cbiAgXy5pbmRleEJ5ID0gZ3JvdXAoZnVuY3Rpb24ocmVzdWx0LCB2YWx1ZSwga2V5KSB7XG4gICAgcmVzdWx0W2tleV0gPSB2YWx1ZTtcbiAgfSk7XG5cbiAgLy8gQ291bnRzIGluc3RhbmNlcyBvZiBhbiBvYmplY3QgdGhhdCBncm91cCBieSBhIGNlcnRhaW4gY3JpdGVyaW9uLiBQYXNzXG4gIC8vIGVpdGhlciBhIHN0cmluZyBhdHRyaWJ1dGUgdG8gY291bnQgYnksIG9yIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZVxuICAvLyBjcml0ZXJpb24uXG4gIF8uY291bnRCeSA9IGdyb3VwKGZ1bmN0aW9uKHJlc3VsdCwgdmFsdWUsIGtleSkge1xuICAgIGlmIChfLmhhcyhyZXN1bHQsIGtleSkpIHJlc3VsdFtrZXldKys7IGVsc2UgcmVzdWx0W2tleV0gPSAxO1xuICB9KTtcblxuICAvLyBVc2UgYSBjb21wYXJhdG9yIGZ1bmN0aW9uIHRvIGZpZ3VyZSBvdXQgdGhlIHNtYWxsZXN0IGluZGV4IGF0IHdoaWNoXG4gIC8vIGFuIG9iamVjdCBzaG91bGQgYmUgaW5zZXJ0ZWQgc28gYXMgdG8gbWFpbnRhaW4gb3JkZXIuIFVzZXMgYmluYXJ5IHNlYXJjaC5cbiAgXy5zb3J0ZWRJbmRleCA9IGZ1bmN0aW9uKGFycmF5LCBvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgaXRlcmF0ZWUgPSBfLml0ZXJhdGVlKGl0ZXJhdGVlLCBjb250ZXh0LCAxKTtcbiAgICB2YXIgdmFsdWUgPSBpdGVyYXRlZShvYmopO1xuICAgIHZhciBsb3cgPSAwLCBoaWdoID0gYXJyYXkubGVuZ3RoO1xuICAgIHdoaWxlIChsb3cgPCBoaWdoKSB7XG4gICAgICB2YXIgbWlkID0gbG93ICsgaGlnaCA+Pj4gMTtcbiAgICAgIGlmIChpdGVyYXRlZShhcnJheVttaWRdKSA8IHZhbHVlKSBsb3cgPSBtaWQgKyAxOyBlbHNlIGhpZ2ggPSBtaWQ7XG4gICAgfVxuICAgIHJldHVybiBsb3c7XG4gIH07XG5cbiAgLy8gU2FmZWx5IGNyZWF0ZSBhIHJlYWwsIGxpdmUgYXJyYXkgZnJvbSBhbnl0aGluZyBpdGVyYWJsZS5cbiAgXy50b0FycmF5ID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKCFvYmopIHJldHVybiBbXTtcbiAgICBpZiAoXy5pc0FycmF5KG9iaikpIHJldHVybiBzbGljZS5jYWxsKG9iaik7XG4gICAgaWYgKG9iai5sZW5ndGggPT09ICtvYmoubGVuZ3RoKSByZXR1cm4gXy5tYXAob2JqLCBfLmlkZW50aXR5KTtcbiAgICByZXR1cm4gXy52YWx1ZXMob2JqKTtcbiAgfTtcblxuICAvLyBSZXR1cm4gdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiBhbiBvYmplY3QuXG4gIF8uc2l6ZSA9IGZ1bmN0aW9uKG9iaikge1xuICAgIGlmIChvYmogPT0gbnVsbCkgcmV0dXJuIDA7XG4gICAgcmV0dXJuIG9iai5sZW5ndGggPT09ICtvYmoubGVuZ3RoID8gb2JqLmxlbmd0aCA6IF8ua2V5cyhvYmopLmxlbmd0aDtcbiAgfTtcblxuICAvLyBTcGxpdCBhIGNvbGxlY3Rpb24gaW50byB0d28gYXJyYXlzOiBvbmUgd2hvc2UgZWxlbWVudHMgYWxsIHNhdGlzZnkgdGhlIGdpdmVuXG4gIC8vIHByZWRpY2F0ZSwgYW5kIG9uZSB3aG9zZSBlbGVtZW50cyBhbGwgZG8gbm90IHNhdGlzZnkgdGhlIHByZWRpY2F0ZS5cbiAgXy5wYXJ0aXRpb24gPSBmdW5jdGlvbihvYmosIHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgIHByZWRpY2F0ZSA9IF8uaXRlcmF0ZWUocHJlZGljYXRlLCBjb250ZXh0KTtcbiAgICB2YXIgcGFzcyA9IFtdLCBmYWlsID0gW107XG4gICAgXy5lYWNoKG9iaiwgZnVuY3Rpb24odmFsdWUsIGtleSwgb2JqKSB7XG4gICAgICAocHJlZGljYXRlKHZhbHVlLCBrZXksIG9iaikgPyBwYXNzIDogZmFpbCkucHVzaCh2YWx1ZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtwYXNzLCBmYWlsXTtcbiAgfTtcblxuICAvLyBBcnJheSBGdW5jdGlvbnNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tXG5cbiAgLy8gR2V0IHRoZSBmaXJzdCBlbGVtZW50IG9mIGFuIGFycmF5LiBQYXNzaW5nICoqbioqIHdpbGwgcmV0dXJuIHRoZSBmaXJzdCBOXG4gIC8vIHZhbHVlcyBpbiB0aGUgYXJyYXkuIEFsaWFzZWQgYXMgYGhlYWRgIGFuZCBgdGFrZWAuIFRoZSAqKmd1YXJkKiogY2hlY2tcbiAgLy8gYWxsb3dzIGl0IHRvIHdvcmsgd2l0aCBgXy5tYXBgLlxuICBfLmZpcnN0ID0gXy5oZWFkID0gXy50YWtlID0gZnVuY3Rpb24oYXJyYXksIG4sIGd1YXJkKSB7XG4gICAgaWYgKGFycmF5ID09IG51bGwpIHJldHVybiB2b2lkIDA7XG4gICAgaWYgKG4gPT0gbnVsbCB8fCBndWFyZCkgcmV0dXJuIGFycmF5WzBdO1xuICAgIGlmIChuIDwgMCkgcmV0dXJuIFtdO1xuICAgIHJldHVybiBzbGljZS5jYWxsKGFycmF5LCAwLCBuKTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGV2ZXJ5dGhpbmcgYnV0IHRoZSBsYXN0IGVudHJ5IG9mIHRoZSBhcnJheS4gRXNwZWNpYWxseSB1c2VmdWwgb25cbiAgLy8gdGhlIGFyZ3VtZW50cyBvYmplY3QuIFBhc3NpbmcgKipuKiogd2lsbCByZXR1cm4gYWxsIHRoZSB2YWx1ZXMgaW5cbiAgLy8gdGhlIGFycmF5LCBleGNsdWRpbmcgdGhlIGxhc3QgTi4gVGhlICoqZ3VhcmQqKiBjaGVjayBhbGxvd3MgaXQgdG8gd29yayB3aXRoXG4gIC8vIGBfLm1hcGAuXG4gIF8uaW5pdGlhbCA9IGZ1bmN0aW9uKGFycmF5LCBuLCBndWFyZCkge1xuICAgIHJldHVybiBzbGljZS5jYWxsKGFycmF5LCAwLCBNYXRoLm1heCgwLCBhcnJheS5sZW5ndGggLSAobiA9PSBudWxsIHx8IGd1YXJkID8gMSA6IG4pKSk7XG4gIH07XG5cbiAgLy8gR2V0IHRoZSBsYXN0IGVsZW1lbnQgb2YgYW4gYXJyYXkuIFBhc3NpbmcgKipuKiogd2lsbCByZXR1cm4gdGhlIGxhc3QgTlxuICAvLyB2YWx1ZXMgaW4gdGhlIGFycmF5LiBUaGUgKipndWFyZCoqIGNoZWNrIGFsbG93cyBpdCB0byB3b3JrIHdpdGggYF8ubWFwYC5cbiAgXy5sYXN0ID0gZnVuY3Rpb24oYXJyYXksIG4sIGd1YXJkKSB7XG4gICAgaWYgKGFycmF5ID09IG51bGwpIHJldHVybiB2b2lkIDA7XG4gICAgaWYgKG4gPT0gbnVsbCB8fCBndWFyZCkgcmV0dXJuIGFycmF5W2FycmF5Lmxlbmd0aCAtIDFdO1xuICAgIHJldHVybiBzbGljZS5jYWxsKGFycmF5LCBNYXRoLm1heChhcnJheS5sZW5ndGggLSBuLCAwKSk7XG4gIH07XG5cbiAgLy8gUmV0dXJucyBldmVyeXRoaW5nIGJ1dCB0aGUgZmlyc3QgZW50cnkgb2YgdGhlIGFycmF5LiBBbGlhc2VkIGFzIGB0YWlsYCBhbmQgYGRyb3BgLlxuICAvLyBFc3BlY2lhbGx5IHVzZWZ1bCBvbiB0aGUgYXJndW1lbnRzIG9iamVjdC4gUGFzc2luZyBhbiAqKm4qKiB3aWxsIHJldHVyblxuICAvLyB0aGUgcmVzdCBOIHZhbHVlcyBpbiB0aGUgYXJyYXkuIFRoZSAqKmd1YXJkKipcbiAgLy8gY2hlY2sgYWxsb3dzIGl0IHRvIHdvcmsgd2l0aCBgXy5tYXBgLlxuICBfLnJlc3QgPSBfLnRhaWwgPSBfLmRyb3AgPSBmdW5jdGlvbihhcnJheSwgbiwgZ3VhcmQpIHtcbiAgICByZXR1cm4gc2xpY2UuY2FsbChhcnJheSwgbiA9PSBudWxsIHx8IGd1YXJkID8gMSA6IG4pO1xuICB9O1xuXG4gIC8vIFRyaW0gb3V0IGFsbCBmYWxzeSB2YWx1ZXMgZnJvbSBhbiBhcnJheS5cbiAgXy5jb21wYWN0ID0gZnVuY3Rpb24oYXJyYXkpIHtcbiAgICByZXR1cm4gXy5maWx0ZXIoYXJyYXksIF8uaWRlbnRpdHkpO1xuICB9O1xuXG4gIC8vIEludGVybmFsIGltcGxlbWVudGF0aW9uIG9mIGEgcmVjdXJzaXZlIGBmbGF0dGVuYCBmdW5jdGlvbi5cbiAgdmFyIGZsYXR0ZW4gPSBmdW5jdGlvbihpbnB1dCwgc2hhbGxvdywgc3RyaWN0LCBvdXRwdXQpIHtcbiAgICBpZiAoc2hhbGxvdyAmJiBfLmV2ZXJ5KGlucHV0LCBfLmlzQXJyYXkpKSB7XG4gICAgICByZXR1cm4gY29uY2F0LmFwcGx5KG91dHB1dCwgaW5wdXQpO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gaW5wdXQubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciB2YWx1ZSA9IGlucHV0W2ldO1xuICAgICAgaWYgKCFfLmlzQXJyYXkodmFsdWUpICYmICFfLmlzQXJndW1lbnRzKHZhbHVlKSkge1xuICAgICAgICBpZiAoIXN0cmljdCkgb3V0cHV0LnB1c2godmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChzaGFsbG93KSB7XG4gICAgICAgIHB1c2guYXBwbHkob3V0cHV0LCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmbGF0dGVuKHZhbHVlLCBzaGFsbG93LCBzdHJpY3QsIG91dHB1dCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG4gIH07XG5cbiAgLy8gRmxhdHRlbiBvdXQgYW4gYXJyYXksIGVpdGhlciByZWN1cnNpdmVseSAoYnkgZGVmYXVsdCksIG9yIGp1c3Qgb25lIGxldmVsLlxuICBfLmZsYXR0ZW4gPSBmdW5jdGlvbihhcnJheSwgc2hhbGxvdykge1xuICAgIHJldHVybiBmbGF0dGVuKGFycmF5LCBzaGFsbG93LCBmYWxzZSwgW10pO1xuICB9O1xuXG4gIC8vIFJldHVybiBhIHZlcnNpb24gb2YgdGhlIGFycmF5IHRoYXQgZG9lcyBub3QgY29udGFpbiB0aGUgc3BlY2lmaWVkIHZhbHVlKHMpLlxuICBfLndpdGhvdXQgPSBmdW5jdGlvbihhcnJheSkge1xuICAgIHJldHVybiBfLmRpZmZlcmVuY2UoYXJyYXksIHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG4gIH07XG5cbiAgLy8gUHJvZHVjZSBhIGR1cGxpY2F0ZS1mcmVlIHZlcnNpb24gb2YgdGhlIGFycmF5LiBJZiB0aGUgYXJyYXkgaGFzIGFscmVhZHlcbiAgLy8gYmVlbiBzb3J0ZWQsIHlvdSBoYXZlIHRoZSBvcHRpb24gb2YgdXNpbmcgYSBmYXN0ZXIgYWxnb3JpdGhtLlxuICAvLyBBbGlhc2VkIGFzIGB1bmlxdWVgLlxuICBfLnVuaXEgPSBfLnVuaXF1ZSA9IGZ1bmN0aW9uKGFycmF5LCBpc1NvcnRlZCwgaXRlcmF0ZWUsIGNvbnRleHQpIHtcbiAgICBpZiAoYXJyYXkgPT0gbnVsbCkgcmV0dXJuIFtdO1xuICAgIGlmICghXy5pc0Jvb2xlYW4oaXNTb3J0ZWQpKSB7XG4gICAgICBjb250ZXh0ID0gaXRlcmF0ZWU7XG4gICAgICBpdGVyYXRlZSA9IGlzU29ydGVkO1xuICAgICAgaXNTb3J0ZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGl0ZXJhdGVlICE9IG51bGwpIGl0ZXJhdGVlID0gXy5pdGVyYXRlZShpdGVyYXRlZSwgY29udGV4dCk7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIHZhciBzZWVuID0gW107XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgdmFsdWUgPSBhcnJheVtpXTtcbiAgICAgIGlmIChpc1NvcnRlZCkge1xuICAgICAgICBpZiAoIWkgfHwgc2VlbiAhPT0gdmFsdWUpIHJlc3VsdC5wdXNoKHZhbHVlKTtcbiAgICAgICAgc2VlbiA9IHZhbHVlO1xuICAgICAgfSBlbHNlIGlmIChpdGVyYXRlZSkge1xuICAgICAgICB2YXIgY29tcHV0ZWQgPSBpdGVyYXRlZSh2YWx1ZSwgaSwgYXJyYXkpO1xuICAgICAgICBpZiAoXy5pbmRleE9mKHNlZW4sIGNvbXB1dGVkKSA8IDApIHtcbiAgICAgICAgICBzZWVuLnB1c2goY29tcHV0ZWQpO1xuICAgICAgICAgIHJlc3VsdC5wdXNoKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChfLmluZGV4T2YocmVzdWx0LCB2YWx1ZSkgPCAwKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvLyBQcm9kdWNlIGFuIGFycmF5IHRoYXQgY29udGFpbnMgdGhlIHVuaW9uOiBlYWNoIGRpc3RpbmN0IGVsZW1lbnQgZnJvbSBhbGwgb2ZcbiAgLy8gdGhlIHBhc3NlZC1pbiBhcnJheXMuXG4gIF8udW5pb24gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXy51bmlxKGZsYXR0ZW4oYXJndW1lbnRzLCB0cnVlLCB0cnVlLCBbXSkpO1xuICB9O1xuXG4gIC8vIFByb2R1Y2UgYW4gYXJyYXkgdGhhdCBjb250YWlucyBldmVyeSBpdGVtIHNoYXJlZCBiZXR3ZWVuIGFsbCB0aGVcbiAgLy8gcGFzc2VkLWluIGFycmF5cy5cbiAgXy5pbnRlcnNlY3Rpb24gPSBmdW5jdGlvbihhcnJheSkge1xuICAgIGlmIChhcnJheSA9PSBudWxsKSByZXR1cm4gW107XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIHZhciBhcmdzTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gYXJyYXkubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpdGVtID0gYXJyYXlbaV07XG4gICAgICBpZiAoXy5jb250YWlucyhyZXN1bHQsIGl0ZW0pKSBjb250aW51ZTtcbiAgICAgIGZvciAodmFyIGogPSAxOyBqIDwgYXJnc0xlbmd0aDsgaisrKSB7XG4gICAgICAgIGlmICghXy5jb250YWlucyhhcmd1bWVudHNbal0sIGl0ZW0pKSBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmIChqID09PSBhcmdzTGVuZ3RoKSByZXN1bHQucHVzaChpdGVtKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvLyBUYWtlIHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gb25lIGFycmF5IGFuZCBhIG51bWJlciBvZiBvdGhlciBhcnJheXMuXG4gIC8vIE9ubHkgdGhlIGVsZW1lbnRzIHByZXNlbnQgaW4ganVzdCB0aGUgZmlyc3QgYXJyYXkgd2lsbCByZW1haW4uXG4gIF8uZGlmZmVyZW5jZSA9IGZ1bmN0aW9uKGFycmF5KSB7XG4gICAgdmFyIHJlc3QgPSBmbGF0dGVuKHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSwgdHJ1ZSwgdHJ1ZSwgW10pO1xuICAgIHJldHVybiBfLmZpbHRlcihhcnJheSwgZnVuY3Rpb24odmFsdWUpe1xuICAgICAgcmV0dXJuICFfLmNvbnRhaW5zKHJlc3QsIHZhbHVlKTtcbiAgICB9KTtcbiAgfTtcblxuICAvLyBaaXAgdG9nZXRoZXIgbXVsdGlwbGUgbGlzdHMgaW50byBhIHNpbmdsZSBhcnJheSAtLSBlbGVtZW50cyB0aGF0IHNoYXJlXG4gIC8vIGFuIGluZGV4IGdvIHRvZ2V0aGVyLlxuICBfLnppcCA9IGZ1bmN0aW9uKGFycmF5KSB7XG4gICAgaWYgKGFycmF5ID09IG51bGwpIHJldHVybiBbXTtcbiAgICB2YXIgbGVuZ3RoID0gXy5tYXgoYXJndW1lbnRzLCAnbGVuZ3RoJykubGVuZ3RoO1xuICAgIHZhciByZXN1bHRzID0gQXJyYXkobGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICByZXN1bHRzW2ldID0gXy5wbHVjayhhcmd1bWVudHMsIGkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfTtcblxuICAvLyBDb252ZXJ0cyBsaXN0cyBpbnRvIG9iamVjdHMuIFBhc3MgZWl0aGVyIGEgc2luZ2xlIGFycmF5IG9mIGBba2V5LCB2YWx1ZV1gXG4gIC8vIHBhaXJzLCBvciB0d28gcGFyYWxsZWwgYXJyYXlzIG9mIHRoZSBzYW1lIGxlbmd0aCAtLSBvbmUgb2Yga2V5cywgYW5kIG9uZSBvZlxuICAvLyB0aGUgY29ycmVzcG9uZGluZyB2YWx1ZXMuXG4gIF8ub2JqZWN0ID0gZnVuY3Rpb24obGlzdCwgdmFsdWVzKSB7XG4gICAgaWYgKGxpc3QgPT0gbnVsbCkgcmV0dXJuIHt9O1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gbGlzdC5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHZhbHVlcykge1xuICAgICAgICByZXN1bHRbbGlzdFtpXV0gPSB2YWx1ZXNbaV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHRbbGlzdFtpXVswXV0gPSBsaXN0W2ldWzFdO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8vIFJldHVybiB0aGUgcG9zaXRpb24gb2YgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgYW4gaXRlbSBpbiBhbiBhcnJheSxcbiAgLy8gb3IgLTEgaWYgdGhlIGl0ZW0gaXMgbm90IGluY2x1ZGVkIGluIHRoZSBhcnJheS5cbiAgLy8gSWYgdGhlIGFycmF5IGlzIGxhcmdlIGFuZCBhbHJlYWR5IGluIHNvcnQgb3JkZXIsIHBhc3MgYHRydWVgXG4gIC8vIGZvciAqKmlzU29ydGVkKiogdG8gdXNlIGJpbmFyeSBzZWFyY2guXG4gIF8uaW5kZXhPZiA9IGZ1bmN0aW9uKGFycmF5LCBpdGVtLCBpc1NvcnRlZCkge1xuICAgIGlmIChhcnJheSA9PSBudWxsKSByZXR1cm4gLTE7XG4gICAgdmFyIGkgPSAwLCBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG4gICAgaWYgKGlzU29ydGVkKSB7XG4gICAgICBpZiAodHlwZW9mIGlzU29ydGVkID09ICdudW1iZXInKSB7XG4gICAgICAgIGkgPSBpc1NvcnRlZCA8IDAgPyBNYXRoLm1heCgwLCBsZW5ndGggKyBpc1NvcnRlZCkgOiBpc1NvcnRlZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGkgPSBfLnNvcnRlZEluZGV4KGFycmF5LCBpdGVtKTtcbiAgICAgICAgcmV0dXJuIGFycmF5W2ldID09PSBpdGVtID8gaSA6IC0xO1xuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKDsgaSA8IGxlbmd0aDsgaSsrKSBpZiAoYXJyYXlbaV0gPT09IGl0ZW0pIHJldHVybiBpO1xuICAgIHJldHVybiAtMTtcbiAgfTtcblxuICBfLmxhc3RJbmRleE9mID0gZnVuY3Rpb24oYXJyYXksIGl0ZW0sIGZyb20pIHtcbiAgICBpZiAoYXJyYXkgPT0gbnVsbCkgcmV0dXJuIC0xO1xuICAgIHZhciBpZHggPSBhcnJheS5sZW5ndGg7XG4gICAgaWYgKHR5cGVvZiBmcm9tID09ICdudW1iZXInKSB7XG4gICAgICBpZHggPSBmcm9tIDwgMCA/IGlkeCArIGZyb20gKyAxIDogTWF0aC5taW4oaWR4LCBmcm9tICsgMSk7XG4gICAgfVxuICAgIHdoaWxlICgtLWlkeCA+PSAwKSBpZiAoYXJyYXlbaWR4XSA9PT0gaXRlbSkgcmV0dXJuIGlkeDtcbiAgICByZXR1cm4gLTE7XG4gIH07XG5cbiAgLy8gR2VuZXJhdGUgYW4gaW50ZWdlciBBcnJheSBjb250YWluaW5nIGFuIGFyaXRobWV0aWMgcHJvZ3Jlc3Npb24uIEEgcG9ydCBvZlxuICAvLyB0aGUgbmF0aXZlIFB5dGhvbiBgcmFuZ2UoKWAgZnVuY3Rpb24uIFNlZVxuICAvLyBbdGhlIFB5dGhvbiBkb2N1bWVudGF0aW9uXShodHRwOi8vZG9jcy5weXRob24ub3JnL2xpYnJhcnkvZnVuY3Rpb25zLmh0bWwjcmFuZ2UpLlxuICBfLnJhbmdlID0gZnVuY3Rpb24oc3RhcnQsIHN0b3AsIHN0ZXApIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8PSAxKSB7XG4gICAgICBzdG9wID0gc3RhcnQgfHwgMDtcbiAgICAgIHN0YXJ0ID0gMDtcbiAgICB9XG4gICAgc3RlcCA9IHN0ZXAgfHwgMTtcblxuICAgIHZhciBsZW5ndGggPSBNYXRoLm1heChNYXRoLmNlaWwoKHN0b3AgLSBzdGFydCkgLyBzdGVwKSwgMCk7XG4gICAgdmFyIHJhbmdlID0gQXJyYXkobGVuZ3RoKTtcblxuICAgIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IGxlbmd0aDsgaWR4KyssIHN0YXJ0ICs9IHN0ZXApIHtcbiAgICAgIHJhbmdlW2lkeF0gPSBzdGFydDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmFuZ2U7XG4gIH07XG5cbiAgLy8gRnVuY3Rpb24gKGFoZW0pIEZ1bmN0aW9uc1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS1cblxuICAvLyBSZXVzYWJsZSBjb25zdHJ1Y3RvciBmdW5jdGlvbiBmb3IgcHJvdG90eXBlIHNldHRpbmcuXG4gIHZhciBDdG9yID0gZnVuY3Rpb24oKXt9O1xuXG4gIC8vIENyZWF0ZSBhIGZ1bmN0aW9uIGJvdW5kIHRvIGEgZ2l2ZW4gb2JqZWN0IChhc3NpZ25pbmcgYHRoaXNgLCBhbmQgYXJndW1lbnRzLFxuICAvLyBvcHRpb25hbGx5KS4gRGVsZWdhdGVzIHRvICoqRUNNQVNjcmlwdCA1KioncyBuYXRpdmUgYEZ1bmN0aW9uLmJpbmRgIGlmXG4gIC8vIGF2YWlsYWJsZS5cbiAgXy5iaW5kID0gZnVuY3Rpb24oZnVuYywgY29udGV4dCkge1xuICAgIHZhciBhcmdzLCBib3VuZDtcbiAgICBpZiAobmF0aXZlQmluZCAmJiBmdW5jLmJpbmQgPT09IG5hdGl2ZUJpbmQpIHJldHVybiBuYXRpdmVCaW5kLmFwcGx5KGZ1bmMsIHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG4gICAgaWYgKCFfLmlzRnVuY3Rpb24oZnVuYykpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0JpbmQgbXVzdCBiZSBjYWxsZWQgb24gYSBmdW5jdGlvbicpO1xuICAgIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XG4gICAgYm91bmQgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBib3VuZCkpIHJldHVybiBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MuY29uY2F0KHNsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xuICAgICAgQ3Rvci5wcm90b3R5cGUgPSBmdW5jLnByb3RvdHlwZTtcbiAgICAgIHZhciBzZWxmID0gbmV3IEN0b3I7XG4gICAgICBDdG9yLnByb3RvdHlwZSA9IG51bGw7XG4gICAgICB2YXIgcmVzdWx0ID0gZnVuYy5hcHBseShzZWxmLCBhcmdzLmNvbmNhdChzbGljZS5jYWxsKGFyZ3VtZW50cykpKTtcbiAgICAgIGlmIChfLmlzT2JqZWN0KHJlc3VsdCkpIHJldHVybiByZXN1bHQ7XG4gICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuICAgIHJldHVybiBib3VuZDtcbiAgfTtcblxuICAvLyBQYXJ0aWFsbHkgYXBwbHkgYSBmdW5jdGlvbiBieSBjcmVhdGluZyBhIHZlcnNpb24gdGhhdCBoYXMgaGFkIHNvbWUgb2YgaXRzXG4gIC8vIGFyZ3VtZW50cyBwcmUtZmlsbGVkLCB3aXRob3V0IGNoYW5naW5nIGl0cyBkeW5hbWljIGB0aGlzYCBjb250ZXh0LiBfIGFjdHNcbiAgLy8gYXMgYSBwbGFjZWhvbGRlciwgYWxsb3dpbmcgYW55IGNvbWJpbmF0aW9uIG9mIGFyZ3VtZW50cyB0byBiZSBwcmUtZmlsbGVkLlxuICBfLnBhcnRpYWwgPSBmdW5jdGlvbihmdW5jKSB7XG4gICAgdmFyIGJvdW5kQXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcG9zaXRpb24gPSAwO1xuICAgICAgdmFyIGFyZ3MgPSBib3VuZEFyZ3Muc2xpY2UoKTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBhcmdzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChhcmdzW2ldID09PSBfKSBhcmdzW2ldID0gYXJndW1lbnRzW3Bvc2l0aW9uKytdO1xuICAgICAgfVxuICAgICAgd2hpbGUgKHBvc2l0aW9uIDwgYXJndW1lbnRzLmxlbmd0aCkgYXJncy5wdXNoKGFyZ3VtZW50c1twb3NpdGlvbisrXSk7XG4gICAgICByZXR1cm4gZnVuYy5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9O1xuICB9O1xuXG4gIC8vIEJpbmQgYSBudW1iZXIgb2YgYW4gb2JqZWN0J3MgbWV0aG9kcyB0byB0aGF0IG9iamVjdC4gUmVtYWluaW5nIGFyZ3VtZW50c1xuICAvLyBhcmUgdGhlIG1ldGhvZCBuYW1lcyB0byBiZSBib3VuZC4gVXNlZnVsIGZvciBlbnN1cmluZyB0aGF0IGFsbCBjYWxsYmFja3NcbiAgLy8gZGVmaW5lZCBvbiBhbiBvYmplY3QgYmVsb25nIHRvIGl0LlxuICBfLmJpbmRBbGwgPSBmdW5jdGlvbihvYmopIHtcbiAgICB2YXIgaSwgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCwga2V5O1xuICAgIGlmIChsZW5ndGggPD0gMSkgdGhyb3cgbmV3IEVycm9yKCdiaW5kQWxsIG11c3QgYmUgcGFzc2VkIGZ1bmN0aW9uIG5hbWVzJyk7XG4gICAgZm9yIChpID0gMTsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBrZXkgPSBhcmd1bWVudHNbaV07XG4gICAgICBvYmpba2V5XSA9IF8uYmluZChvYmpba2V5XSwgb2JqKTtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbiAgfTtcblxuICAvLyBNZW1vaXplIGFuIGV4cGVuc2l2ZSBmdW5jdGlvbiBieSBzdG9yaW5nIGl0cyByZXN1bHRzLlxuICBfLm1lbW9pemUgPSBmdW5jdGlvbihmdW5jLCBoYXNoZXIpIHtcbiAgICB2YXIgbWVtb2l6ZSA9IGZ1bmN0aW9uKGtleSkge1xuICAgICAgdmFyIGNhY2hlID0gbWVtb2l6ZS5jYWNoZTtcbiAgICAgIHZhciBhZGRyZXNzID0gaGFzaGVyID8gaGFzaGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgOiBrZXk7XG4gICAgICBpZiAoIV8uaGFzKGNhY2hlLCBhZGRyZXNzKSkgY2FjaGVbYWRkcmVzc10gPSBmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICByZXR1cm4gY2FjaGVbYWRkcmVzc107XG4gICAgfTtcbiAgICBtZW1vaXplLmNhY2hlID0ge307XG4gICAgcmV0dXJuIG1lbW9pemU7XG4gIH07XG5cbiAgLy8gRGVsYXlzIGEgZnVuY3Rpb24gZm9yIHRoZSBnaXZlbiBudW1iZXIgb2YgbWlsbGlzZWNvbmRzLCBhbmQgdGhlbiBjYWxsc1xuICAvLyBpdCB3aXRoIHRoZSBhcmd1bWVudHMgc3VwcGxpZWQuXG4gIF8uZGVsYXkgPSBmdW5jdGlvbihmdW5jLCB3YWl0KSB7XG4gICAgdmFyIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XG4gICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgIHJldHVybiBmdW5jLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgIH0sIHdhaXQpO1xuICB9O1xuXG4gIC8vIERlZmVycyBhIGZ1bmN0aW9uLCBzY2hlZHVsaW5nIGl0IHRvIHJ1biBhZnRlciB0aGUgY3VycmVudCBjYWxsIHN0YWNrIGhhc1xuICAvLyBjbGVhcmVkLlxuICBfLmRlZmVyID0gZnVuY3Rpb24oZnVuYykge1xuICAgIHJldHVybiBfLmRlbGF5LmFwcGx5KF8sIFtmdW5jLCAxXS5jb25jYXQoc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKSk7XG4gIH07XG5cbiAgLy8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0LCB3aGVuIGludm9rZWQsIHdpbGwgb25seSBiZSB0cmlnZ2VyZWQgYXQgbW9zdCBvbmNlXG4gIC8vIGR1cmluZyBhIGdpdmVuIHdpbmRvdyBvZiB0aW1lLiBOb3JtYWxseSwgdGhlIHRocm90dGxlZCBmdW5jdGlvbiB3aWxsIHJ1blxuICAvLyBhcyBtdWNoIGFzIGl0IGNhbiwgd2l0aG91dCBldmVyIGdvaW5nIG1vcmUgdGhhbiBvbmNlIHBlciBgd2FpdGAgZHVyYXRpb247XG4gIC8vIGJ1dCBpZiB5b3UnZCBsaWtlIHRvIGRpc2FibGUgdGhlIGV4ZWN1dGlvbiBvbiB0aGUgbGVhZGluZyBlZGdlLCBwYXNzXG4gIC8vIGB7bGVhZGluZzogZmFsc2V9YC4gVG8gZGlzYWJsZSBleGVjdXRpb24gb24gdGhlIHRyYWlsaW5nIGVkZ2UsIGRpdHRvLlxuICBfLnRocm90dGxlID0gZnVuY3Rpb24oZnVuYywgd2FpdCwgb3B0aW9ucykge1xuICAgIHZhciBjb250ZXh0LCBhcmdzLCByZXN1bHQ7XG4gICAgdmFyIHRpbWVvdXQgPSBudWxsO1xuICAgIHZhciBwcmV2aW91cyA9IDA7XG4gICAgaWYgKCFvcHRpb25zKSBvcHRpb25zID0ge307XG4gICAgdmFyIGxhdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICBwcmV2aW91cyA9IG9wdGlvbnMubGVhZGluZyA9PT0gZmFsc2UgPyAwIDogXy5ub3coKTtcbiAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgIGlmICghdGltZW91dCkgY29udGV4dCA9IGFyZ3MgPSBudWxsO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIG5vdyA9IF8ubm93KCk7XG4gICAgICBpZiAoIXByZXZpb3VzICYmIG9wdGlvbnMubGVhZGluZyA9PT0gZmFsc2UpIHByZXZpb3VzID0gbm93O1xuICAgICAgdmFyIHJlbWFpbmluZyA9IHdhaXQgLSAobm93IC0gcHJldmlvdXMpO1xuICAgICAgY29udGV4dCA9IHRoaXM7XG4gICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgaWYgKHJlbWFpbmluZyA8PSAwIHx8IHJlbWFpbmluZyA+IHdhaXQpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgcHJldmlvdXMgPSBub3c7XG4gICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgIGlmICghdGltZW91dCkgY29udGV4dCA9IGFyZ3MgPSBudWxsO1xuICAgICAgfSBlbHNlIGlmICghdGltZW91dCAmJiBvcHRpb25zLnRyYWlsaW5nICE9PSBmYWxzZSkge1xuICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgcmVtYWluaW5nKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQsIGFzIGxvbmcgYXMgaXQgY29udGludWVzIHRvIGJlIGludm9rZWQsIHdpbGwgbm90XG4gIC8vIGJlIHRyaWdnZXJlZC4gVGhlIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIGFmdGVyIGl0IHN0b3BzIGJlaW5nIGNhbGxlZCBmb3JcbiAgLy8gTiBtaWxsaXNlY29uZHMuIElmIGBpbW1lZGlhdGVgIGlzIHBhc3NlZCwgdHJpZ2dlciB0aGUgZnVuY3Rpb24gb24gdGhlXG4gIC8vIGxlYWRpbmcgZWRnZSwgaW5zdGVhZCBvZiB0aGUgdHJhaWxpbmcuXG4gIF8uZGVib3VuY2UgPSBmdW5jdGlvbihmdW5jLCB3YWl0LCBpbW1lZGlhdGUpIHtcbiAgICB2YXIgdGltZW91dCwgYXJncywgY29udGV4dCwgdGltZXN0YW1wLCByZXN1bHQ7XG5cbiAgICB2YXIgbGF0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBsYXN0ID0gXy5ub3coKSAtIHRpbWVzdGFtcDtcblxuICAgICAgaWYgKGxhc3QgPCB3YWl0ICYmIGxhc3QgPiAwKSB7XG4gICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0IC0gbGFzdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgaWYgKCFpbW1lZGlhdGUpIHtcbiAgICAgICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgIGlmICghdGltZW91dCkgY29udGV4dCA9IGFyZ3MgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIGNvbnRleHQgPSB0aGlzO1xuICAgICAgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgIHRpbWVzdGFtcCA9IF8ubm93KCk7XG4gICAgICB2YXIgY2FsbE5vdyA9IGltbWVkaWF0ZSAmJiAhdGltZW91dDtcbiAgICAgIGlmICghdGltZW91dCkgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xuICAgICAgaWYgKGNhbGxOb3cpIHtcbiAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgY29udGV4dCA9IGFyZ3MgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gIH07XG5cbiAgLy8gUmV0dXJucyB0aGUgZmlyc3QgZnVuY3Rpb24gcGFzc2VkIGFzIGFuIGFyZ3VtZW50IHRvIHRoZSBzZWNvbmQsXG4gIC8vIGFsbG93aW5nIHlvdSB0byBhZGp1c3QgYXJndW1lbnRzLCBydW4gY29kZSBiZWZvcmUgYW5kIGFmdGVyLCBhbmRcbiAgLy8gY29uZGl0aW9uYWxseSBleGVjdXRlIHRoZSBvcmlnaW5hbCBmdW5jdGlvbi5cbiAgXy53cmFwID0gZnVuY3Rpb24oZnVuYywgd3JhcHBlcikge1xuICAgIHJldHVybiBfLnBhcnRpYWwod3JhcHBlciwgZnVuYyk7XG4gIH07XG5cbiAgLy8gUmV0dXJucyBhIG5lZ2F0ZWQgdmVyc2lvbiBvZiB0aGUgcGFzc2VkLWluIHByZWRpY2F0ZS5cbiAgXy5uZWdhdGUgPSBmdW5jdGlvbihwcmVkaWNhdGUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gIXByZWRpY2F0ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH07XG5cbiAgLy8gUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgaXMgdGhlIGNvbXBvc2l0aW9uIG9mIGEgbGlzdCBvZiBmdW5jdGlvbnMsIGVhY2hcbiAgLy8gY29uc3VtaW5nIHRoZSByZXR1cm4gdmFsdWUgb2YgdGhlIGZ1bmN0aW9uIHRoYXQgZm9sbG93cy5cbiAgXy5jb21wb3NlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgdmFyIHN0YXJ0ID0gYXJncy5sZW5ndGggLSAxO1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpID0gc3RhcnQ7XG4gICAgICB2YXIgcmVzdWx0ID0gYXJnc1tzdGFydF0uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIHdoaWxlIChpLS0pIHJlc3VsdCA9IGFyZ3NbaV0uY2FsbCh0aGlzLCByZXN1bHQpO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICB9O1xuXG4gIC8vIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IHdpbGwgb25seSBiZSBleGVjdXRlZCBhZnRlciBiZWluZyBjYWxsZWQgTiB0aW1lcy5cbiAgXy5hZnRlciA9IGZ1bmN0aW9uKHRpbWVzLCBmdW5jKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKC0tdGltZXMgPCAxKSB7XG4gICAgICAgIHJldHVybiBmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG4gICAgfTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCB3aWxsIG9ubHkgYmUgZXhlY3V0ZWQgYmVmb3JlIGJlaW5nIGNhbGxlZCBOIHRpbWVzLlxuICBfLmJlZm9yZSA9IGZ1bmN0aW9uKHRpbWVzLCBmdW5jKSB7XG4gICAgdmFyIG1lbW87XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKC0tdGltZXMgPiAwKSB7XG4gICAgICAgIG1lbW8gPSBmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmdW5jID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBtZW1vO1xuICAgIH07XG4gIH07XG5cbiAgLy8gUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSBleGVjdXRlZCBhdCBtb3N0IG9uZSB0aW1lLCBubyBtYXR0ZXIgaG93XG4gIC8vIG9mdGVuIHlvdSBjYWxsIGl0LiBVc2VmdWwgZm9yIGxhenkgaW5pdGlhbGl6YXRpb24uXG4gIF8ub25jZSA9IF8ucGFydGlhbChfLmJlZm9yZSwgMik7XG5cbiAgLy8gT2JqZWN0IEZ1bmN0aW9uc1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tXG5cbiAgLy8gUmV0cmlldmUgdGhlIG5hbWVzIG9mIGFuIG9iamVjdCdzIHByb3BlcnRpZXMuXG4gIC8vIERlbGVnYXRlcyB0byAqKkVDTUFTY3JpcHQgNSoqJ3MgbmF0aXZlIGBPYmplY3Qua2V5c2BcbiAgXy5rZXlzID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKCFfLmlzT2JqZWN0KG9iaikpIHJldHVybiBbXTtcbiAgICBpZiAobmF0aXZlS2V5cykgcmV0dXJuIG5hdGl2ZUtleXMob2JqKTtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIGlmIChfLmhhcyhvYmosIGtleSkpIGtleXMucHVzaChrZXkpO1xuICAgIHJldHVybiBrZXlzO1xuICB9O1xuXG4gIC8vIFJldHJpZXZlIHRoZSB2YWx1ZXMgb2YgYW4gb2JqZWN0J3MgcHJvcGVydGllcy5cbiAgXy52YWx1ZXMgPSBmdW5jdGlvbihvYmopIHtcbiAgICB2YXIga2V5cyA9IF8ua2V5cyhvYmopO1xuICAgIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgdmFsdWVzID0gQXJyYXkobGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICB2YWx1ZXNbaV0gPSBvYmpba2V5c1tpXV07XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZXM7XG4gIH07XG5cbiAgLy8gQ29udmVydCBhbiBvYmplY3QgaW50byBhIGxpc3Qgb2YgYFtrZXksIHZhbHVlXWAgcGFpcnMuXG4gIF8ucGFpcnMgPSBmdW5jdGlvbihvYmopIHtcbiAgICB2YXIga2V5cyA9IF8ua2V5cyhvYmopO1xuICAgIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgcGFpcnMgPSBBcnJheShsZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHBhaXJzW2ldID0gW2tleXNbaV0sIG9ialtrZXlzW2ldXV07XG4gICAgfVxuICAgIHJldHVybiBwYWlycztcbiAgfTtcblxuICAvLyBJbnZlcnQgdGhlIGtleXMgYW5kIHZhbHVlcyBvZiBhbiBvYmplY3QuIFRoZSB2YWx1ZXMgbXVzdCBiZSBzZXJpYWxpemFibGUuXG4gIF8uaW52ZXJ0ID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIHZhciBrZXlzID0gXy5rZXlzKG9iaik7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGtleXMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHJlc3VsdFtvYmpba2V5c1tpXV1dID0ga2V5c1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvLyBSZXR1cm4gYSBzb3J0ZWQgbGlzdCBvZiB0aGUgZnVuY3Rpb24gbmFtZXMgYXZhaWxhYmxlIG9uIHRoZSBvYmplY3QuXG4gIC8vIEFsaWFzZWQgYXMgYG1ldGhvZHNgXG4gIF8uZnVuY3Rpb25zID0gXy5tZXRob2RzID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIG5hbWVzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgaWYgKF8uaXNGdW5jdGlvbihvYmpba2V5XSkpIG5hbWVzLnB1c2goa2V5KTtcbiAgICB9XG4gICAgcmV0dXJuIG5hbWVzLnNvcnQoKTtcbiAgfTtcblxuICAvLyBFeHRlbmQgYSBnaXZlbiBvYmplY3Qgd2l0aCBhbGwgdGhlIHByb3BlcnRpZXMgaW4gcGFzc2VkLWluIG9iamVjdChzKS5cbiAgXy5leHRlbmQgPSBmdW5jdGlvbihvYmopIHtcbiAgICBpZiAoIV8uaXNPYmplY3Qob2JqKSkgcmV0dXJuIG9iajtcbiAgICB2YXIgc291cmNlLCBwcm9wO1xuICAgIGZvciAodmFyIGkgPSAxLCBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgIGZvciAocHJvcCBpbiBzb3VyY2UpIHtcbiAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBwcm9wKSkge1xuICAgICAgICAgICAgb2JqW3Byb3BdID0gc291cmNlW3Byb3BdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG4gIH07XG5cbiAgLy8gUmV0dXJuIGEgY29weSBvZiB0aGUgb2JqZWN0IG9ubHkgY29udGFpbmluZyB0aGUgd2hpdGVsaXN0ZWQgcHJvcGVydGllcy5cbiAgXy5waWNrID0gZnVuY3Rpb24ob2JqLCBpdGVyYXRlZSwgY29udGV4dCkge1xuICAgIHZhciByZXN1bHQgPSB7fSwga2V5O1xuICAgIGlmIChvYmogPT0gbnVsbCkgcmV0dXJuIHJlc3VsdDtcbiAgICBpZiAoXy5pc0Z1bmN0aW9uKGl0ZXJhdGVlKSkge1xuICAgICAgaXRlcmF0ZWUgPSBjcmVhdGVDYWxsYmFjayhpdGVyYXRlZSwgY29udGV4dCk7XG4gICAgICBmb3IgKGtleSBpbiBvYmopIHtcbiAgICAgICAgdmFyIHZhbHVlID0gb2JqW2tleV07XG4gICAgICAgIGlmIChpdGVyYXRlZSh2YWx1ZSwga2V5LCBvYmopKSByZXN1bHRba2V5XSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIga2V5cyA9IGNvbmNhdC5hcHBseShbXSwgc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcbiAgICAgIG9iaiA9IG5ldyBPYmplY3Qob2JqKTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBrZXlzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICAgIGlmIChrZXkgaW4gb2JqKSByZXN1bHRba2V5XSA9IG9ialtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gICAvLyBSZXR1cm4gYSBjb3B5IG9mIHRoZSBvYmplY3Qgd2l0aG91dCB0aGUgYmxhY2tsaXN0ZWQgcHJvcGVydGllcy5cbiAgXy5vbWl0ID0gZnVuY3Rpb24ob2JqLCBpdGVyYXRlZSwgY29udGV4dCkge1xuICAgIGlmIChfLmlzRnVuY3Rpb24oaXRlcmF0ZWUpKSB7XG4gICAgICBpdGVyYXRlZSA9IF8ubmVnYXRlKGl0ZXJhdGVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGtleXMgPSBfLm1hcChjb25jYXQuYXBwbHkoW10sIHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSksIFN0cmluZyk7XG4gICAgICBpdGVyYXRlZSA9IGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgcmV0dXJuICFfLmNvbnRhaW5zKGtleXMsIGtleSk7XG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gXy5waWNrKG9iaiwgaXRlcmF0ZWUsIGNvbnRleHQpO1xuICB9O1xuXG4gIC8vIEZpbGwgaW4gYSBnaXZlbiBvYmplY3Qgd2l0aCBkZWZhdWx0IHByb3BlcnRpZXMuXG4gIF8uZGVmYXVsdHMgPSBmdW5jdGlvbihvYmopIHtcbiAgICBpZiAoIV8uaXNPYmplY3Qob2JqKSkgcmV0dXJuIG9iajtcbiAgICBmb3IgKHZhciBpID0gMSwgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuICAgICAgZm9yICh2YXIgcHJvcCBpbiBzb3VyY2UpIHtcbiAgICAgICAgaWYgKG9ialtwcm9wXSA9PT0gdm9pZCAwKSBvYmpbcHJvcF0gPSBzb3VyY2VbcHJvcF07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG4gIH07XG5cbiAgLy8gQ3JlYXRlIGEgKHNoYWxsb3ctY2xvbmVkKSBkdXBsaWNhdGUgb2YgYW4gb2JqZWN0LlxuICBfLmNsb25lID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKCFfLmlzT2JqZWN0KG9iaikpIHJldHVybiBvYmo7XG4gICAgcmV0dXJuIF8uaXNBcnJheShvYmopID8gb2JqLnNsaWNlKCkgOiBfLmV4dGVuZCh7fSwgb2JqKTtcbiAgfTtcblxuICAvLyBJbnZva2VzIGludGVyY2VwdG9yIHdpdGggdGhlIG9iaiwgYW5kIHRoZW4gcmV0dXJucyBvYmouXG4gIC8vIFRoZSBwcmltYXJ5IHB1cnBvc2Ugb2YgdGhpcyBtZXRob2QgaXMgdG8gXCJ0YXAgaW50b1wiIGEgbWV0aG9kIGNoYWluLCBpblxuICAvLyBvcmRlciB0byBwZXJmb3JtIG9wZXJhdGlvbnMgb24gaW50ZXJtZWRpYXRlIHJlc3VsdHMgd2l0aGluIHRoZSBjaGFpbi5cbiAgXy50YXAgPSBmdW5jdGlvbihvYmosIGludGVyY2VwdG9yKSB7XG4gICAgaW50ZXJjZXB0b3Iob2JqKTtcbiAgICByZXR1cm4gb2JqO1xuICB9O1xuXG4gIC8vIEludGVybmFsIHJlY3Vyc2l2ZSBjb21wYXJpc29uIGZ1bmN0aW9uIGZvciBgaXNFcXVhbGAuXG4gIHZhciBlcSA9IGZ1bmN0aW9uKGEsIGIsIGFTdGFjaywgYlN0YWNrKSB7XG4gICAgLy8gSWRlbnRpY2FsIG9iamVjdHMgYXJlIGVxdWFsLiBgMCA9PT0gLTBgLCBidXQgdGhleSBhcmVuJ3QgaWRlbnRpY2FsLlxuICAgIC8vIFNlZSB0aGUgW0hhcm1vbnkgYGVnYWxgIHByb3Bvc2FsXShodHRwOi8vd2lraS5lY21hc2NyaXB0Lm9yZy9kb2t1LnBocD9pZD1oYXJtb255OmVnYWwpLlxuICAgIGlmIChhID09PSBiKSByZXR1cm4gYSAhPT0gMCB8fCAxIC8gYSA9PT0gMSAvIGI7XG4gICAgLy8gQSBzdHJpY3QgY29tcGFyaXNvbiBpcyBuZWNlc3NhcnkgYmVjYXVzZSBgbnVsbCA9PSB1bmRlZmluZWRgLlxuICAgIGlmIChhID09IG51bGwgfHwgYiA9PSBudWxsKSByZXR1cm4gYSA9PT0gYjtcbiAgICAvLyBVbndyYXAgYW55IHdyYXBwZWQgb2JqZWN0cy5cbiAgICBpZiAoYSBpbnN0YW5jZW9mIF8pIGEgPSBhLl93cmFwcGVkO1xuICAgIGlmIChiIGluc3RhbmNlb2YgXykgYiA9IGIuX3dyYXBwZWQ7XG4gICAgLy8gQ29tcGFyZSBgW1tDbGFzc11dYCBuYW1lcy5cbiAgICB2YXIgY2xhc3NOYW1lID0gdG9TdHJpbmcuY2FsbChhKTtcbiAgICBpZiAoY2xhc3NOYW1lICE9PSB0b1N0cmluZy5jYWxsKGIpKSByZXR1cm4gZmFsc2U7XG4gICAgc3dpdGNoIChjbGFzc05hbWUpIHtcbiAgICAgIC8vIFN0cmluZ3MsIG51bWJlcnMsIHJlZ3VsYXIgZXhwcmVzc2lvbnMsIGRhdGVzLCBhbmQgYm9vbGVhbnMgYXJlIGNvbXBhcmVkIGJ5IHZhbHVlLlxuICAgICAgY2FzZSAnW29iamVjdCBSZWdFeHBdJzpcbiAgICAgIC8vIFJlZ0V4cHMgYXJlIGNvZXJjZWQgdG8gc3RyaW5ncyBmb3IgY29tcGFyaXNvbiAoTm90ZTogJycgKyAvYS9pID09PSAnL2EvaScpXG4gICAgICBjYXNlICdbb2JqZWN0IFN0cmluZ10nOlxuICAgICAgICAvLyBQcmltaXRpdmVzIGFuZCB0aGVpciBjb3JyZXNwb25kaW5nIG9iamVjdCB3cmFwcGVycyBhcmUgZXF1aXZhbGVudDsgdGh1cywgYFwiNVwiYCBpc1xuICAgICAgICAvLyBlcXVpdmFsZW50IHRvIGBuZXcgU3RyaW5nKFwiNVwiKWAuXG4gICAgICAgIHJldHVybiAnJyArIGEgPT09ICcnICsgYjtcbiAgICAgIGNhc2UgJ1tvYmplY3QgTnVtYmVyXSc6XG4gICAgICAgIC8vIGBOYU5gcyBhcmUgZXF1aXZhbGVudCwgYnV0IG5vbi1yZWZsZXhpdmUuXG4gICAgICAgIC8vIE9iamVjdChOYU4pIGlzIGVxdWl2YWxlbnQgdG8gTmFOXG4gICAgICAgIGlmICgrYSAhPT0gK2EpIHJldHVybiArYiAhPT0gK2I7XG4gICAgICAgIC8vIEFuIGBlZ2FsYCBjb21wYXJpc29uIGlzIHBlcmZvcm1lZCBmb3Igb3RoZXIgbnVtZXJpYyB2YWx1ZXMuXG4gICAgICAgIHJldHVybiArYSA9PT0gMCA/IDEgLyArYSA9PT0gMSAvIGIgOiArYSA9PT0gK2I7XG4gICAgICBjYXNlICdbb2JqZWN0IERhdGVdJzpcbiAgICAgIGNhc2UgJ1tvYmplY3QgQm9vbGVhbl0nOlxuICAgICAgICAvLyBDb2VyY2UgZGF0ZXMgYW5kIGJvb2xlYW5zIHRvIG51bWVyaWMgcHJpbWl0aXZlIHZhbHVlcy4gRGF0ZXMgYXJlIGNvbXBhcmVkIGJ5IHRoZWlyXG4gICAgICAgIC8vIG1pbGxpc2Vjb25kIHJlcHJlc2VudGF0aW9ucy4gTm90ZSB0aGF0IGludmFsaWQgZGF0ZXMgd2l0aCBtaWxsaXNlY29uZCByZXByZXNlbnRhdGlvbnNcbiAgICAgICAgLy8gb2YgYE5hTmAgYXJlIG5vdCBlcXVpdmFsZW50LlxuICAgICAgICByZXR1cm4gK2EgPT09ICtiO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGEgIT0gJ29iamVjdCcgfHwgdHlwZW9mIGIgIT0gJ29iamVjdCcpIHJldHVybiBmYWxzZTtcbiAgICAvLyBBc3N1bWUgZXF1YWxpdHkgZm9yIGN5Y2xpYyBzdHJ1Y3R1cmVzLiBUaGUgYWxnb3JpdGhtIGZvciBkZXRlY3RpbmcgY3ljbGljXG4gICAgLy8gc3RydWN0dXJlcyBpcyBhZGFwdGVkIGZyb20gRVMgNS4xIHNlY3Rpb24gMTUuMTIuMywgYWJzdHJhY3Qgb3BlcmF0aW9uIGBKT2AuXG4gICAgdmFyIGxlbmd0aCA9IGFTdGFjay5sZW5ndGg7XG4gICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICAvLyBMaW5lYXIgc2VhcmNoLiBQZXJmb3JtYW5jZSBpcyBpbnZlcnNlbHkgcHJvcG9ydGlvbmFsIHRvIHRoZSBudW1iZXIgb2ZcbiAgICAgIC8vIHVuaXF1ZSBuZXN0ZWQgc3RydWN0dXJlcy5cbiAgICAgIGlmIChhU3RhY2tbbGVuZ3RoXSA9PT0gYSkgcmV0dXJuIGJTdGFja1tsZW5ndGhdID09PSBiO1xuICAgIH1cbiAgICAvLyBPYmplY3RzIHdpdGggZGlmZmVyZW50IGNvbnN0cnVjdG9ycyBhcmUgbm90IGVxdWl2YWxlbnQsIGJ1dCBgT2JqZWN0YHNcbiAgICAvLyBmcm9tIGRpZmZlcmVudCBmcmFtZXMgYXJlLlxuICAgIHZhciBhQ3RvciA9IGEuY29uc3RydWN0b3IsIGJDdG9yID0gYi5jb25zdHJ1Y3RvcjtcbiAgICBpZiAoXG4gICAgICBhQ3RvciAhPT0gYkN0b3IgJiZcbiAgICAgIC8vIEhhbmRsZSBPYmplY3QuY3JlYXRlKHgpIGNhc2VzXG4gICAgICAnY29uc3RydWN0b3InIGluIGEgJiYgJ2NvbnN0cnVjdG9yJyBpbiBiICYmXG4gICAgICAhKF8uaXNGdW5jdGlvbihhQ3RvcikgJiYgYUN0b3IgaW5zdGFuY2VvZiBhQ3RvciAmJlxuICAgICAgICBfLmlzRnVuY3Rpb24oYkN0b3IpICYmIGJDdG9yIGluc3RhbmNlb2YgYkN0b3IpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIEFkZCB0aGUgZmlyc3Qgb2JqZWN0IHRvIHRoZSBzdGFjayBvZiB0cmF2ZXJzZWQgb2JqZWN0cy5cbiAgICBhU3RhY2sucHVzaChhKTtcbiAgICBiU3RhY2sucHVzaChiKTtcbiAgICB2YXIgc2l6ZSwgcmVzdWx0O1xuICAgIC8vIFJlY3Vyc2l2ZWx5IGNvbXBhcmUgb2JqZWN0cyBhbmQgYXJyYXlzLlxuICAgIGlmIChjbGFzc05hbWUgPT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICAgIC8vIENvbXBhcmUgYXJyYXkgbGVuZ3RocyB0byBkZXRlcm1pbmUgaWYgYSBkZWVwIGNvbXBhcmlzb24gaXMgbmVjZXNzYXJ5LlxuICAgICAgc2l6ZSA9IGEubGVuZ3RoO1xuICAgICAgcmVzdWx0ID0gc2l6ZSA9PT0gYi5sZW5ndGg7XG4gICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgIC8vIERlZXAgY29tcGFyZSB0aGUgY29udGVudHMsIGlnbm9yaW5nIG5vbi1udW1lcmljIHByb3BlcnRpZXMuXG4gICAgICAgIHdoaWxlIChzaXplLS0pIHtcbiAgICAgICAgICBpZiAoIShyZXN1bHQgPSBlcShhW3NpemVdLCBiW3NpemVdLCBhU3RhY2ssIGJTdGFjaykpKSBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBEZWVwIGNvbXBhcmUgb2JqZWN0cy5cbiAgICAgIHZhciBrZXlzID0gXy5rZXlzKGEpLCBrZXk7XG4gICAgICBzaXplID0ga2V5cy5sZW5ndGg7XG4gICAgICAvLyBFbnN1cmUgdGhhdCBib3RoIG9iamVjdHMgY29udGFpbiB0aGUgc2FtZSBudW1iZXIgb2YgcHJvcGVydGllcyBiZWZvcmUgY29tcGFyaW5nIGRlZXAgZXF1YWxpdHkuXG4gICAgICByZXN1bHQgPSBfLmtleXMoYikubGVuZ3RoID09PSBzaXplO1xuICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICB3aGlsZSAoc2l6ZS0tKSB7XG4gICAgICAgICAgLy8gRGVlcCBjb21wYXJlIGVhY2ggbWVtYmVyXG4gICAgICAgICAga2V5ID0ga2V5c1tzaXplXTtcbiAgICAgICAgICBpZiAoIShyZXN1bHQgPSBfLmhhcyhiLCBrZXkpICYmIGVxKGFba2V5XSwgYltrZXldLCBhU3RhY2ssIGJTdGFjaykpKSBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBSZW1vdmUgdGhlIGZpcnN0IG9iamVjdCBmcm9tIHRoZSBzdGFjayBvZiB0cmF2ZXJzZWQgb2JqZWN0cy5cbiAgICBhU3RhY2sucG9wKCk7XG4gICAgYlN0YWNrLnBvcCgpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgLy8gUGVyZm9ybSBhIGRlZXAgY29tcGFyaXNvbiB0byBjaGVjayBpZiB0d28gb2JqZWN0cyBhcmUgZXF1YWwuXG4gIF8uaXNFcXVhbCA9IGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gZXEoYSwgYiwgW10sIFtdKTtcbiAgfTtcblxuICAvLyBJcyBhIGdpdmVuIGFycmF5LCBzdHJpbmcsIG9yIG9iamVjdCBlbXB0eT9cbiAgLy8gQW4gXCJlbXB0eVwiIG9iamVjdCBoYXMgbm8gZW51bWVyYWJsZSBvd24tcHJvcGVydGllcy5cbiAgXy5pc0VtcHR5ID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKG9iaiA9PSBudWxsKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAoXy5pc0FycmF5KG9iaikgfHwgXy5pc1N0cmluZyhvYmopIHx8IF8uaXNBcmd1bWVudHMob2JqKSkgcmV0dXJuIG9iai5sZW5ndGggPT09IDA7XG4gICAgZm9yICh2YXIga2V5IGluIG9iaikgaWYgKF8uaGFzKG9iaiwga2V5KSkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIC8vIElzIGEgZ2l2ZW4gdmFsdWUgYSBET00gZWxlbWVudD9cbiAgXy5pc0VsZW1lbnQgPSBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gISEob2JqICYmIG9iai5ub2RlVHlwZSA9PT0gMSk7XG4gIH07XG5cbiAgLy8gSXMgYSBnaXZlbiB2YWx1ZSBhbiBhcnJheT9cbiAgLy8gRGVsZWdhdGVzIHRvIEVDTUE1J3MgbmF0aXZlIEFycmF5LmlzQXJyYXlcbiAgXy5pc0FycmF5ID0gbmF0aXZlSXNBcnJheSB8fCBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gdG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBBcnJheV0nO1xuICB9O1xuXG4gIC8vIElzIGEgZ2l2ZW4gdmFyaWFibGUgYW4gb2JqZWN0P1xuICBfLmlzT2JqZWN0ID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIHR5cGUgPSB0eXBlb2Ygb2JqO1xuICAgIHJldHVybiB0eXBlID09PSAnZnVuY3Rpb24nIHx8IHR5cGUgPT09ICdvYmplY3QnICYmICEhb2JqO1xuICB9O1xuXG4gIC8vIEFkZCBzb21lIGlzVHlwZSBtZXRob2RzOiBpc0FyZ3VtZW50cywgaXNGdW5jdGlvbiwgaXNTdHJpbmcsIGlzTnVtYmVyLCBpc0RhdGUsIGlzUmVnRXhwLlxuICBfLmVhY2goWydBcmd1bWVudHMnLCAnRnVuY3Rpb24nLCAnU3RyaW5nJywgJ051bWJlcicsICdEYXRlJywgJ1JlZ0V4cCddLCBmdW5jdGlvbihuYW1lKSB7XG4gICAgX1snaXMnICsgbmFtZV0gPSBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiB0b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0ICcgKyBuYW1lICsgJ10nO1xuICAgIH07XG4gIH0pO1xuXG4gIC8vIERlZmluZSBhIGZhbGxiYWNrIHZlcnNpb24gb2YgdGhlIG1ldGhvZCBpbiBicm93c2VycyAoYWhlbSwgSUUpLCB3aGVyZVxuICAvLyB0aGVyZSBpc24ndCBhbnkgaW5zcGVjdGFibGUgXCJBcmd1bWVudHNcIiB0eXBlLlxuICBpZiAoIV8uaXNBcmd1bWVudHMoYXJndW1lbnRzKSkge1xuICAgIF8uaXNBcmd1bWVudHMgPSBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBfLmhhcyhvYmosICdjYWxsZWUnKTtcbiAgICB9O1xuICB9XG5cbiAgLy8gT3B0aW1pemUgYGlzRnVuY3Rpb25gIGlmIGFwcHJvcHJpYXRlLiBXb3JrIGFyb3VuZCBhbiBJRSAxMSBidWcuXG4gIGlmICh0eXBlb2YgLy4vICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgXy5pc0Z1bmN0aW9uID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIG9iaiA9PSAnZnVuY3Rpb24nIHx8IGZhbHNlO1xuICAgIH07XG4gIH1cblxuICAvLyBJcyBhIGdpdmVuIG9iamVjdCBhIGZpbml0ZSBudW1iZXI/XG4gIF8uaXNGaW5pdGUgPSBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gaXNGaW5pdGUob2JqKSAmJiAhaXNOYU4ocGFyc2VGbG9hdChvYmopKTtcbiAgfTtcblxuICAvLyBJcyB0aGUgZ2l2ZW4gdmFsdWUgYE5hTmA/IChOYU4gaXMgdGhlIG9ubHkgbnVtYmVyIHdoaWNoIGRvZXMgbm90IGVxdWFsIGl0c2VsZikuXG4gIF8uaXNOYU4gPSBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gXy5pc051bWJlcihvYmopICYmIG9iaiAhPT0gK29iajtcbiAgfTtcblxuICAvLyBJcyBhIGdpdmVuIHZhbHVlIGEgYm9vbGVhbj9cbiAgXy5pc0Jvb2xlYW4gPSBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gb2JqID09PSB0cnVlIHx8IG9iaiA9PT0gZmFsc2UgfHwgdG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBCb29sZWFuXSc7XG4gIH07XG5cbiAgLy8gSXMgYSBnaXZlbiB2YWx1ZSBlcXVhbCB0byBudWxsP1xuICBfLmlzTnVsbCA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHJldHVybiBvYmogPT09IG51bGw7XG4gIH07XG5cbiAgLy8gSXMgYSBnaXZlbiB2YXJpYWJsZSB1bmRlZmluZWQ/XG4gIF8uaXNVbmRlZmluZWQgPSBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gb2JqID09PSB2b2lkIDA7XG4gIH07XG5cbiAgLy8gU2hvcnRjdXQgZnVuY3Rpb24gZm9yIGNoZWNraW5nIGlmIGFuIG9iamVjdCBoYXMgYSBnaXZlbiBwcm9wZXJ0eSBkaXJlY3RseVxuICAvLyBvbiBpdHNlbGYgKGluIG90aGVyIHdvcmRzLCBub3Qgb24gYSBwcm90b3R5cGUpLlxuICBfLmhhcyA9IGZ1bmN0aW9uKG9iaiwga2V5KSB7XG4gICAgcmV0dXJuIG9iaiAhPSBudWxsICYmIGhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpO1xuICB9O1xuXG4gIC8vIFV0aWxpdHkgRnVuY3Rpb25zXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgLy8gUnVuIFVuZGVyc2NvcmUuanMgaW4gKm5vQ29uZmxpY3QqIG1vZGUsIHJldHVybmluZyB0aGUgYF9gIHZhcmlhYmxlIHRvIGl0c1xuICAvLyBwcmV2aW91cyBvd25lci4gUmV0dXJucyBhIHJlZmVyZW5jZSB0byB0aGUgVW5kZXJzY29yZSBvYmplY3QuXG4gIF8ubm9Db25mbGljdCA9IGZ1bmN0aW9uKCkge1xuICAgIHJvb3QuXyA9IHByZXZpb3VzVW5kZXJzY29yZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvLyBLZWVwIHRoZSBpZGVudGl0eSBmdW5jdGlvbiBhcm91bmQgZm9yIGRlZmF1bHQgaXRlcmF0ZWVzLlxuICBfLmlkZW50aXR5ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH07XG5cbiAgXy5jb25zdGFudCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG4gIH07XG5cbiAgXy5ub29wID0gZnVuY3Rpb24oKXt9O1xuXG4gIF8ucHJvcGVydHkgPSBmdW5jdGlvbihrZXkpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqW2tleV07XG4gICAgfTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGEgcHJlZGljYXRlIGZvciBjaGVja2luZyB3aGV0aGVyIGFuIG9iamVjdCBoYXMgYSBnaXZlbiBzZXQgb2YgYGtleTp2YWx1ZWAgcGFpcnMuXG4gIF8ubWF0Y2hlcyA9IGZ1bmN0aW9uKGF0dHJzKSB7XG4gICAgdmFyIHBhaXJzID0gXy5wYWlycyhhdHRycyksIGxlbmd0aCA9IHBhaXJzLmxlbmd0aDtcbiAgICByZXR1cm4gZnVuY3Rpb24ob2JqKSB7XG4gICAgICBpZiAob2JqID09IG51bGwpIHJldHVybiAhbGVuZ3RoO1xuICAgICAgb2JqID0gbmV3IE9iamVjdChvYmopO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgcGFpciA9IHBhaXJzW2ldLCBrZXkgPSBwYWlyWzBdO1xuICAgICAgICBpZiAocGFpclsxXSAhPT0gb2JqW2tleV0gfHwgIShrZXkgaW4gb2JqKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgfTtcblxuICAvLyBSdW4gYSBmdW5jdGlvbiAqKm4qKiB0aW1lcy5cbiAgXy50aW1lcyA9IGZ1bmN0aW9uKG4sIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgdmFyIGFjY3VtID0gQXJyYXkoTWF0aC5tYXgoMCwgbikpO1xuICAgIGl0ZXJhdGVlID0gY3JlYXRlQ2FsbGJhY2soaXRlcmF0ZWUsIGNvbnRleHQsIDEpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgaSsrKSBhY2N1bVtpXSA9IGl0ZXJhdGVlKGkpO1xuICAgIHJldHVybiBhY2N1bTtcbiAgfTtcblxuICAvLyBSZXR1cm4gYSByYW5kb20gaW50ZWdlciBiZXR3ZWVuIG1pbiBhbmQgbWF4IChpbmNsdXNpdmUpLlxuICBfLnJhbmRvbSA9IGZ1bmN0aW9uKG1pbiwgbWF4KSB7XG4gICAgaWYgKG1heCA9PSBudWxsKSB7XG4gICAgICBtYXggPSBtaW47XG4gICAgICBtaW4gPSAwO1xuICAgIH1cbiAgICByZXR1cm4gbWluICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKTtcbiAgfTtcblxuICAvLyBBIChwb3NzaWJseSBmYXN0ZXIpIHdheSB0byBnZXQgdGhlIGN1cnJlbnQgdGltZXN0YW1wIGFzIGFuIGludGVnZXIuXG4gIF8ubm93ID0gRGF0ZS5ub3cgfHwgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICB9O1xuXG4gICAvLyBMaXN0IG9mIEhUTUwgZW50aXRpZXMgZm9yIGVzY2FwaW5nLlxuICB2YXIgZXNjYXBlTWFwID0ge1xuICAgICcmJzogJyZhbXA7JyxcbiAgICAnPCc6ICcmbHQ7JyxcbiAgICAnPic6ICcmZ3Q7JyxcbiAgICAnXCInOiAnJnF1b3Q7JyxcbiAgICBcIidcIjogJyYjeDI3OycsXG4gICAgJ2AnOiAnJiN4NjA7J1xuICB9O1xuICB2YXIgdW5lc2NhcGVNYXAgPSBfLmludmVydChlc2NhcGVNYXApO1xuXG4gIC8vIEZ1bmN0aW9ucyBmb3IgZXNjYXBpbmcgYW5kIHVuZXNjYXBpbmcgc3RyaW5ncyB0by9mcm9tIEhUTUwgaW50ZXJwb2xhdGlvbi5cbiAgdmFyIGNyZWF0ZUVzY2FwZXIgPSBmdW5jdGlvbihtYXApIHtcbiAgICB2YXIgZXNjYXBlciA9IGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgICByZXR1cm4gbWFwW21hdGNoXTtcbiAgICB9O1xuICAgIC8vIFJlZ2V4ZXMgZm9yIGlkZW50aWZ5aW5nIGEga2V5IHRoYXQgbmVlZHMgdG8gYmUgZXNjYXBlZFxuICAgIHZhciBzb3VyY2UgPSAnKD86JyArIF8ua2V5cyhtYXApLmpvaW4oJ3wnKSArICcpJztcbiAgICB2YXIgdGVzdFJlZ2V4cCA9IFJlZ0V4cChzb3VyY2UpO1xuICAgIHZhciByZXBsYWNlUmVnZXhwID0gUmVnRXhwKHNvdXJjZSwgJ2cnKTtcbiAgICByZXR1cm4gZnVuY3Rpb24oc3RyaW5nKSB7XG4gICAgICBzdHJpbmcgPSBzdHJpbmcgPT0gbnVsbCA/ICcnIDogJycgKyBzdHJpbmc7XG4gICAgICByZXR1cm4gdGVzdFJlZ2V4cC50ZXN0KHN0cmluZykgPyBzdHJpbmcucmVwbGFjZShyZXBsYWNlUmVnZXhwLCBlc2NhcGVyKSA6IHN0cmluZztcbiAgICB9O1xuICB9O1xuICBfLmVzY2FwZSA9IGNyZWF0ZUVzY2FwZXIoZXNjYXBlTWFwKTtcbiAgXy51bmVzY2FwZSA9IGNyZWF0ZUVzY2FwZXIodW5lc2NhcGVNYXApO1xuXG4gIC8vIElmIHRoZSB2YWx1ZSBvZiB0aGUgbmFtZWQgYHByb3BlcnR5YCBpcyBhIGZ1bmN0aW9uIHRoZW4gaW52b2tlIGl0IHdpdGggdGhlXG4gIC8vIGBvYmplY3RgIGFzIGNvbnRleHQ7IG90aGVyd2lzZSwgcmV0dXJuIGl0LlxuICBfLnJlc3VsdCA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHtcbiAgICBpZiAob2JqZWN0ID09IG51bGwpIHJldHVybiB2b2lkIDA7XG4gICAgdmFyIHZhbHVlID0gb2JqZWN0W3Byb3BlcnR5XTtcbiAgICByZXR1cm4gXy5pc0Z1bmN0aW9uKHZhbHVlKSA/IG9iamVjdFtwcm9wZXJ0eV0oKSA6IHZhbHVlO1xuICB9O1xuXG4gIC8vIEdlbmVyYXRlIGEgdW5pcXVlIGludGVnZXIgaWQgKHVuaXF1ZSB3aXRoaW4gdGhlIGVudGlyZSBjbGllbnQgc2Vzc2lvbikuXG4gIC8vIFVzZWZ1bCBmb3IgdGVtcG9yYXJ5IERPTSBpZHMuXG4gIHZhciBpZENvdW50ZXIgPSAwO1xuICBfLnVuaXF1ZUlkID0gZnVuY3Rpb24ocHJlZml4KSB7XG4gICAgdmFyIGlkID0gKytpZENvdW50ZXIgKyAnJztcbiAgICByZXR1cm4gcHJlZml4ID8gcHJlZml4ICsgaWQgOiBpZDtcbiAgfTtcblxuICAvLyBCeSBkZWZhdWx0LCBVbmRlcnNjb3JlIHVzZXMgRVJCLXN0eWxlIHRlbXBsYXRlIGRlbGltaXRlcnMsIGNoYW5nZSB0aGVcbiAgLy8gZm9sbG93aW5nIHRlbXBsYXRlIHNldHRpbmdzIHRvIHVzZSBhbHRlcm5hdGl2ZSBkZWxpbWl0ZXJzLlxuICBfLnRlbXBsYXRlU2V0dGluZ3MgPSB7XG4gICAgZXZhbHVhdGUgICAgOiAvPCUoW1xcc1xcU10rPyklPi9nLFxuICAgIGludGVycG9sYXRlIDogLzwlPShbXFxzXFxTXSs/KSU+L2csXG4gICAgZXNjYXBlICAgICAgOiAvPCUtKFtcXHNcXFNdKz8pJT4vZ1xuICB9O1xuXG4gIC8vIFdoZW4gY3VzdG9taXppbmcgYHRlbXBsYXRlU2V0dGluZ3NgLCBpZiB5b3UgZG9uJ3Qgd2FudCB0byBkZWZpbmUgYW5cbiAgLy8gaW50ZXJwb2xhdGlvbiwgZXZhbHVhdGlvbiBvciBlc2NhcGluZyByZWdleCwgd2UgbmVlZCBvbmUgdGhhdCBpc1xuICAvLyBndWFyYW50ZWVkIG5vdCB0byBtYXRjaC5cbiAgdmFyIG5vTWF0Y2ggPSAvKC4pXi87XG5cbiAgLy8gQ2VydGFpbiBjaGFyYWN0ZXJzIG5lZWQgdG8gYmUgZXNjYXBlZCBzbyB0aGF0IHRoZXkgY2FuIGJlIHB1dCBpbnRvIGFcbiAgLy8gc3RyaW5nIGxpdGVyYWwuXG4gIHZhciBlc2NhcGVzID0ge1xuICAgIFwiJ1wiOiAgICAgIFwiJ1wiLFxuICAgICdcXFxcJzogICAgICdcXFxcJyxcbiAgICAnXFxyJzogICAgICdyJyxcbiAgICAnXFxuJzogICAgICduJyxcbiAgICAnXFx1MjAyOCc6ICd1MjAyOCcsXG4gICAgJ1xcdTIwMjknOiAndTIwMjknXG4gIH07XG5cbiAgdmFyIGVzY2FwZXIgPSAvXFxcXHwnfFxccnxcXG58XFx1MjAyOHxcXHUyMDI5L2c7XG5cbiAgdmFyIGVzY2FwZUNoYXIgPSBmdW5jdGlvbihtYXRjaCkge1xuICAgIHJldHVybiAnXFxcXCcgKyBlc2NhcGVzW21hdGNoXTtcbiAgfTtcblxuICAvLyBKYXZhU2NyaXB0IG1pY3JvLXRlbXBsYXRpbmcsIHNpbWlsYXIgdG8gSm9obiBSZXNpZydzIGltcGxlbWVudGF0aW9uLlxuICAvLyBVbmRlcnNjb3JlIHRlbXBsYXRpbmcgaGFuZGxlcyBhcmJpdHJhcnkgZGVsaW1pdGVycywgcHJlc2VydmVzIHdoaXRlc3BhY2UsXG4gIC8vIGFuZCBjb3JyZWN0bHkgZXNjYXBlcyBxdW90ZXMgd2l0aGluIGludGVycG9sYXRlZCBjb2RlLlxuICAvLyBOQjogYG9sZFNldHRpbmdzYCBvbmx5IGV4aXN0cyBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkuXG4gIF8udGVtcGxhdGUgPSBmdW5jdGlvbih0ZXh0LCBzZXR0aW5ncywgb2xkU2V0dGluZ3MpIHtcbiAgICBpZiAoIXNldHRpbmdzICYmIG9sZFNldHRpbmdzKSBzZXR0aW5ncyA9IG9sZFNldHRpbmdzO1xuICAgIHNldHRpbmdzID0gXy5kZWZhdWx0cyh7fSwgc2V0dGluZ3MsIF8udGVtcGxhdGVTZXR0aW5ncyk7XG5cbiAgICAvLyBDb21iaW5lIGRlbGltaXRlcnMgaW50byBvbmUgcmVndWxhciBleHByZXNzaW9uIHZpYSBhbHRlcm5hdGlvbi5cbiAgICB2YXIgbWF0Y2hlciA9IFJlZ0V4cChbXG4gICAgICAoc2V0dGluZ3MuZXNjYXBlIHx8IG5vTWF0Y2gpLnNvdXJjZSxcbiAgICAgIChzZXR0aW5ncy5pbnRlcnBvbGF0ZSB8fCBub01hdGNoKS5zb3VyY2UsXG4gICAgICAoc2V0dGluZ3MuZXZhbHVhdGUgfHwgbm9NYXRjaCkuc291cmNlXG4gICAgXS5qb2luKCd8JykgKyAnfCQnLCAnZycpO1xuXG4gICAgLy8gQ29tcGlsZSB0aGUgdGVtcGxhdGUgc291cmNlLCBlc2NhcGluZyBzdHJpbmcgbGl0ZXJhbHMgYXBwcm9wcmlhdGVseS5cbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHZhciBzb3VyY2UgPSBcIl9fcCs9J1wiO1xuICAgIHRleHQucmVwbGFjZShtYXRjaGVyLCBmdW5jdGlvbihtYXRjaCwgZXNjYXBlLCBpbnRlcnBvbGF0ZSwgZXZhbHVhdGUsIG9mZnNldCkge1xuICAgICAgc291cmNlICs9IHRleHQuc2xpY2UoaW5kZXgsIG9mZnNldCkucmVwbGFjZShlc2NhcGVyLCBlc2NhcGVDaGFyKTtcbiAgICAgIGluZGV4ID0gb2Zmc2V0ICsgbWF0Y2gubGVuZ3RoO1xuXG4gICAgICBpZiAoZXNjYXBlKSB7XG4gICAgICAgIHNvdXJjZSArPSBcIicrXFxuKChfX3Q9KFwiICsgZXNjYXBlICsgXCIpKT09bnVsbD8nJzpfLmVzY2FwZShfX3QpKStcXG4nXCI7XG4gICAgICB9IGVsc2UgaWYgKGludGVycG9sYXRlKSB7XG4gICAgICAgIHNvdXJjZSArPSBcIicrXFxuKChfX3Q9KFwiICsgaW50ZXJwb2xhdGUgKyBcIikpPT1udWxsPycnOl9fdCkrXFxuJ1wiO1xuICAgICAgfSBlbHNlIGlmIChldmFsdWF0ZSkge1xuICAgICAgICBzb3VyY2UgKz0gXCInO1xcblwiICsgZXZhbHVhdGUgKyBcIlxcbl9fcCs9J1wiO1xuICAgICAgfVxuXG4gICAgICAvLyBBZG9iZSBWTXMgbmVlZCB0aGUgbWF0Y2ggcmV0dXJuZWQgdG8gcHJvZHVjZSB0aGUgY29ycmVjdCBvZmZlc3QuXG4gICAgICByZXR1cm4gbWF0Y2g7XG4gICAgfSk7XG4gICAgc291cmNlICs9IFwiJztcXG5cIjtcblxuICAgIC8vIElmIGEgdmFyaWFibGUgaXMgbm90IHNwZWNpZmllZCwgcGxhY2UgZGF0YSB2YWx1ZXMgaW4gbG9jYWwgc2NvcGUuXG4gICAgaWYgKCFzZXR0aW5ncy52YXJpYWJsZSkgc291cmNlID0gJ3dpdGgob2JqfHx7fSl7XFxuJyArIHNvdXJjZSArICd9XFxuJztcblxuICAgIHNvdXJjZSA9IFwidmFyIF9fdCxfX3A9JycsX19qPUFycmF5LnByb3RvdHlwZS5qb2luLFwiICtcbiAgICAgIFwicHJpbnQ9ZnVuY3Rpb24oKXtfX3ArPV9fai5jYWxsKGFyZ3VtZW50cywnJyk7fTtcXG5cIiArXG4gICAgICBzb3VyY2UgKyAncmV0dXJuIF9fcDtcXG4nO1xuXG4gICAgdHJ5IHtcbiAgICAgIHZhciByZW5kZXIgPSBuZXcgRnVuY3Rpb24oc2V0dGluZ3MudmFyaWFibGUgfHwgJ29iaicsICdfJywgc291cmNlKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBlLnNvdXJjZSA9IHNvdXJjZTtcbiAgICAgIHRocm93IGU7XG4gICAgfVxuXG4gICAgdmFyIHRlbXBsYXRlID0gZnVuY3Rpb24oZGF0YSkge1xuICAgICAgcmV0dXJuIHJlbmRlci5jYWxsKHRoaXMsIGRhdGEsIF8pO1xuICAgIH07XG5cbiAgICAvLyBQcm92aWRlIHRoZSBjb21waWxlZCBzb3VyY2UgYXMgYSBjb252ZW5pZW5jZSBmb3IgcHJlY29tcGlsYXRpb24uXG4gICAgdmFyIGFyZ3VtZW50ID0gc2V0dGluZ3MudmFyaWFibGUgfHwgJ29iaic7XG4gICAgdGVtcGxhdGUuc291cmNlID0gJ2Z1bmN0aW9uKCcgKyBhcmd1bWVudCArICcpe1xcbicgKyBzb3VyY2UgKyAnfSc7XG5cbiAgICByZXR1cm4gdGVtcGxhdGU7XG4gIH07XG5cbiAgLy8gQWRkIGEgXCJjaGFpblwiIGZ1bmN0aW9uLiBTdGFydCBjaGFpbmluZyBhIHdyYXBwZWQgVW5kZXJzY29yZSBvYmplY3QuXG4gIF8uY2hhaW4gPSBmdW5jdGlvbihvYmopIHtcbiAgICB2YXIgaW5zdGFuY2UgPSBfKG9iaik7XG4gICAgaW5zdGFuY2UuX2NoYWluID0gdHJ1ZTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH07XG5cbiAgLy8gT09QXG4gIC8vIC0tLS0tLS0tLS0tLS0tLVxuICAvLyBJZiBVbmRlcnNjb3JlIGlzIGNhbGxlZCBhcyBhIGZ1bmN0aW9uLCBpdCByZXR1cm5zIGEgd3JhcHBlZCBvYmplY3QgdGhhdFxuICAvLyBjYW4gYmUgdXNlZCBPTy1zdHlsZS4gVGhpcyB3cmFwcGVyIGhvbGRzIGFsdGVyZWQgdmVyc2lvbnMgb2YgYWxsIHRoZVxuICAvLyB1bmRlcnNjb3JlIGZ1bmN0aW9ucy4gV3JhcHBlZCBvYmplY3RzIG1heSBiZSBjaGFpbmVkLlxuXG4gIC8vIEhlbHBlciBmdW5jdGlvbiB0byBjb250aW51ZSBjaGFpbmluZyBpbnRlcm1lZGlhdGUgcmVzdWx0cy5cbiAgdmFyIHJlc3VsdCA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHJldHVybiB0aGlzLl9jaGFpbiA/IF8ob2JqKS5jaGFpbigpIDogb2JqO1xuICB9O1xuXG4gIC8vIEFkZCB5b3VyIG93biBjdXN0b20gZnVuY3Rpb25zIHRvIHRoZSBVbmRlcnNjb3JlIG9iamVjdC5cbiAgXy5taXhpbiA9IGZ1bmN0aW9uKG9iaikge1xuICAgIF8uZWFjaChfLmZ1bmN0aW9ucyhvYmopLCBmdW5jdGlvbihuYW1lKSB7XG4gICAgICB2YXIgZnVuYyA9IF9bbmFtZV0gPSBvYmpbbmFtZV07XG4gICAgICBfLnByb3RvdHlwZVtuYW1lXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYXJncyA9IFt0aGlzLl93cmFwcGVkXTtcbiAgICAgICAgcHVzaC5hcHBseShhcmdzLCBhcmd1bWVudHMpO1xuICAgICAgICByZXR1cm4gcmVzdWx0LmNhbGwodGhpcywgZnVuYy5hcHBseShfLCBhcmdzKSk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9O1xuXG4gIC8vIEFkZCBhbGwgb2YgdGhlIFVuZGVyc2NvcmUgZnVuY3Rpb25zIHRvIHRoZSB3cmFwcGVyIG9iamVjdC5cbiAgXy5taXhpbihfKTtcblxuICAvLyBBZGQgYWxsIG11dGF0b3IgQXJyYXkgZnVuY3Rpb25zIHRvIHRoZSB3cmFwcGVyLlxuICBfLmVhY2goWydwb3AnLCAncHVzaCcsICdyZXZlcnNlJywgJ3NoaWZ0JywgJ3NvcnQnLCAnc3BsaWNlJywgJ3Vuc2hpZnQnXSwgZnVuY3Rpb24obmFtZSkge1xuICAgIHZhciBtZXRob2QgPSBBcnJheVByb3RvW25hbWVdO1xuICAgIF8ucHJvdG90eXBlW25hbWVdID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgb2JqID0gdGhpcy5fd3JhcHBlZDtcbiAgICAgIG1ldGhvZC5hcHBseShvYmosIGFyZ3VtZW50cyk7XG4gICAgICBpZiAoKG5hbWUgPT09ICdzaGlmdCcgfHwgbmFtZSA9PT0gJ3NwbGljZScpICYmIG9iai5sZW5ndGggPT09IDApIGRlbGV0ZSBvYmpbMF07XG4gICAgICByZXR1cm4gcmVzdWx0LmNhbGwodGhpcywgb2JqKTtcbiAgICB9O1xuICB9KTtcblxuICAvLyBBZGQgYWxsIGFjY2Vzc29yIEFycmF5IGZ1bmN0aW9ucyB0byB0aGUgd3JhcHBlci5cbiAgXy5lYWNoKFsnY29uY2F0JywgJ2pvaW4nLCAnc2xpY2UnXSwgZnVuY3Rpb24obmFtZSkge1xuICAgIHZhciBtZXRob2QgPSBBcnJheVByb3RvW25hbWVdO1xuICAgIF8ucHJvdG90eXBlW25hbWVdID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gcmVzdWx0LmNhbGwodGhpcywgbWV0aG9kLmFwcGx5KHRoaXMuX3dyYXBwZWQsIGFyZ3VtZW50cykpO1xuICAgIH07XG4gIH0pO1xuXG4gIC8vIEV4dHJhY3RzIHRoZSByZXN1bHQgZnJvbSBhIHdyYXBwZWQgYW5kIGNoYWluZWQgb2JqZWN0LlxuICBfLnByb3RvdHlwZS52YWx1ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl93cmFwcGVkO1xuICB9O1xuXG4gIC8vIEFNRCByZWdpc3RyYXRpb24gaGFwcGVucyBhdCB0aGUgZW5kIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQU1EIGxvYWRlcnNcbiAgLy8gdGhhdCBtYXkgbm90IGVuZm9yY2UgbmV4dC10dXJuIHNlbWFudGljcyBvbiBtb2R1bGVzLiBFdmVuIHRob3VnaCBnZW5lcmFsXG4gIC8vIHByYWN0aWNlIGZvciBBTUQgcmVnaXN0cmF0aW9uIGlzIHRvIGJlIGFub255bW91cywgdW5kZXJzY29yZSByZWdpc3RlcnNcbiAgLy8gYXMgYSBuYW1lZCBtb2R1bGUgYmVjYXVzZSwgbGlrZSBqUXVlcnksIGl0IGlzIGEgYmFzZSBsaWJyYXJ5IHRoYXQgaXNcbiAgLy8gcG9wdWxhciBlbm91Z2ggdG8gYmUgYnVuZGxlZCBpbiBhIHRoaXJkIHBhcnR5IGxpYiwgYnV0IG5vdCBiZSBwYXJ0IG9mXG4gIC8vIGFuIEFNRCBsb2FkIHJlcXVlc3QuIFRob3NlIGNhc2VzIGNvdWxkIGdlbmVyYXRlIGFuIGVycm9yIHdoZW4gYW5cbiAgLy8gYW5vbnltb3VzIGRlZmluZSgpIGlzIGNhbGxlZCBvdXRzaWRlIG9mIGEgbG9hZGVyIHJlcXVlc3QuXG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoJ3VuZGVyc2NvcmUnLCBbXSwgZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gXztcbiAgICB9KTtcbiAgfVxufS5jYWxsKHRoaXMpKTtcbiIsInZhciBBcHBGYWNhZGUgPSByZXF1aXJlKCcuL2FwcEZhY2FkZS5qcycpO1xudmFyIGdfcmVzb3VjZXMgPSByZXF1aXJlKCcuL3Jlc291cmNlLmpzJykuZ19yZXNvdWNlcztcblxuKGZ1bmN0aW9uKCkge1xuICAgIGNjLmdhbWUub25TdGFydCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIGNjLnZpZXcuYWRqdXN0Vmlld1BvcnQodHJ1ZSk7XG4gICAgICAgIGNjLnZpZXcuc2V0RGVzaWduUmVzb2x1dGlvblNpemUoNjQwLCA5NjAsIGNjLlJlc29sdXRpb25Qb2xpY3kuU0hPV19BTEwpO1xuICAgICAgICBjYy52aWV3LnJlc2l6ZVdpdGhCcm93c2VyU2l6ZSh0cnVlKTtcblxuICAgICAgICBjY3MuY3NMb2FkZXIuc2V0UmVjb3JkUHJvdG9jb2xCdWZmZXJzUGF0aCh0cnVlKTtcbiAgICAgICAgY2MuTG9hZGVyU2NlbmUucHJlbG9hZChnX3Jlc291Y2VzLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSAnZmlnaHRlci1tdmMnO1xuICAgICAgICAgICAgQXBwRmFjYWRlLmdldEluc3RhbmNlKGtleSkuc3RhcnR1cCgpO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICB9O1xuICAgIGNjLmdhbWUucnVuKCk7XG59KSgpOyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFydGh1ciBvbiAyMDE0LzEyLzIwLlxyXG4gKi9cclxudmFyIGNvbnN0YW50cyA9IG1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgQVBQX05BTUU6IFwiZmlnaHRlclwiLFxyXG5cclxuICAgIENVU1RPTV9OT1RJQ0lDQVRJT046ICdjdXN0b21fbm90aWZpY2F0aW9uJyxcclxuICAgIENPTkZJUk1fRElBTE9HOiAnY29uZmlybV9kaWFsb2cnLFxyXG5cclxuICAgIE5PVElGSUNBVElPTjoge1xyXG4gICAgICAgIFNUQVJUVVA6ICdzdGFydHVwJyxcclxuICAgICAgICBTQ0VORV9DSEFOR0VEOiAnc2NlbmVfY2hhbmdlZCcsXHJcbiAgICAgICAgU0NFTkVfSE9NRTogJ3NjZW5lX2hvbWUnXHJcbiAgICB9LFxyXG5cclxuICAgIFNDRU5FX0FDVElPTjogJ3NjZW5lX2FjdGlvbicsXHJcbiAgICBTQ0VORV9BQ1RJT05fQUREX0NISUxEOiAnc2NlbmVfYWN0aW9uX2FkZF9jaGlsZCcsXHJcbiAgICBTQ0VORToge1xyXG4gICAgICAgIEhPTUU6ICdIb21lTWVkaWF0b3InLFxyXG4gICAgICAgIFRSQUlOOiAnVHJhaW5NZWRpYXRvcicsXHJcbiAgICAgICAgTE9WRTogXCJMb3ZlTWVkaWF0b3JcIixcclxuICAgICAgICBGSUdIVDogXCJGaWdodE1lZGlhdG9yXCJcclxuICAgIH0sXHJcblxyXG4gICAgVEFTS19TVEFUVVMgOiB7XHJcbiAgICAgICAgU1RPUDogMSxcclxuICAgICAgICBTVEFSVDogMixcclxuICAgICAgICBGSU5JU0g6IDNcclxuICAgIH0sXHJcblxyXG4gICAgUExBWUVSX0FDVElPTjogJ3BsYXllcl9hY3Rpb24nLFxyXG5cclxuICAgIFRBU0tfQUNUSU9OOiAndGFza19hY3Rpb24nLFxyXG4gICAgVEFTS19BQ1RJT05fTU9OSVRPUjogJ3Rhc2tfYWN0aW9uX21vbml0b3InLFxyXG4gICAgVEFTS19BQ1RJT05fU1RBUlQ6ICd0YXNrX2FjdGlvbl9zdGFydCcsXHJcbiAgICBUQVNLX0FDVElPTl9TVE9QOiAndGFza19hY3Rpb25fc3RvcCcsXHJcbiAgICBUQVNLX0FDVElPTl9GSU5JU0hFRDogJ3Rhc2tfYWN0aW9uX2ZpbmlzaGVkJyxcclxuXHJcbiAgICBMT1ZFX0FDVElPTjogJ2xvdmVfYWN0aW9uJ1xyXG59OyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFydGh1ciBvbiAyMDE0LzEyLzIxLlxyXG4gKi9cclxudmFyIHB1cmVtdmMgPSByZXF1aXJlKCdwdXJlbXZjJykucHVyZW12YztcclxudmFyIFN0YXJ0dXBDb21tYW5kID0gcmVxdWlyZSgnLi9jb250cm9sbGVyL2NvbW1hbmQvU3RhcnR1cENvbW1hbmQuanMnKTtcclxudmFyIGNvbnN0YW50cyA9IHJlcXVpcmUoJy4vYXBwQ29uc3RhbnRzLmpzJyk7XHJcblxyXG52YXIgQXBwRmFjYWRlID0gbW9kdWxlLmV4cG9ydHMgPSBwdXJlbXZjLmRlZmluZShcclxuICAgIC8vIENMQVNTIElORk9cclxuICAgIHtcclxuICAgICAgICBuYW1lOiAnQXBwRmFjYWRlJyxcclxuICAgICAgICBwYXJlbnQ6IHB1cmVtdmMuRmFjYWRlLFxyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcjogZnVuY3Rpb24gKG11bHRpdG9uS2V5KSB7XHJcbiAgICAgICAgICAgIHB1cmVtdmMuRmFjYWRlLmNhbGwodGhpcywgbXVsdGl0b25LZXkpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgaW5pdGlhbGl6ZUNvbnRyb2xsZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcHVyZW12Yy5GYWNhZGUucHJvdG90eXBlLmluaXRpYWxpemVDb250cm9sbGVyLmNhbGwodGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJDb21tYW5kKGNvbnN0YW50cy5OT1RJRklDQVRJT04uU1RBUlRVUCwgU3RhcnR1cENvbW1hbmQpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW5pdGlhbGl6ZU1vZGVsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHB1cmVtdmMuRmFjYWRlLnByb3RvdHlwZS5pbml0aWFsaXplTW9kZWwuY2FsbCh0aGlzKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGluaXRpYWxpemVWaWV3OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHB1cmVtdmMuRmFjYWRlLnByb3RvdHlwZS5pbml0aWFsaXplVmlldy5jYWxsKHRoaXMpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHN0YXJ0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5zZW5kTm90aWZpY2F0aW9uKGNvbnN0YW50cy5OT1RJRklDQVRJT04uU1RBUlRVUCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIGNjLmV2ZW50TWFuYWdlci5hZGRDdXN0b21MaXN0ZW5lcihjb25zdGFudHMuQ1VTVE9NX05PVElDSUNBVElPTiwgZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgICAgICAgICAgdmFyIHVzZXJEYXRhID0gZXZlbnQuZ2V0VXNlckRhdGEoKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2VuZE5vdGlmaWNhdGlvbihcclxuICAgICAgICAgICAgICAgICAgICB1c2VyRGF0YS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJEYXRhLmRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgdXNlckRhdGEudHlwZVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vIFNUQVRJQyBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgZ2V0SW5zdGFuY2U6IGZ1bmN0aW9uKG11bHRpdG9uS2V5KSB7XHJcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZU1hcCA9IHB1cmVtdmMuRmFjYWRlLmluc3RhbmNlTWFwO1xyXG4gICAgICAgICAgICB2YXIgaW5zdGFuY2UgPSBpbnN0YW5jZU1hcFttdWx0aXRvbktleV07XHJcbiAgICAgICAgICAgIGlmKGluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5zdGFuY2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGluc3RhbmNlTWFwW211bHRpdG9uS2V5XSA9IG5ldyBBcHBGYWNhZGUobXVsdGl0b25LZXkpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgTkFNRTogJ0FwcEZhY2FkZSdcclxuICAgIH1cclxuKTsiLCIvKipcclxuICogQ3JlYXRlZCBieSBBcnRodXIgb24gMjAxNC8xMi8xNC5cclxuICovXHJcblxyXG52YXIgcHVyZW12YyA9IHJlcXVpcmUoJ3B1cmVtdmMnKS5wdXJlbXZjO1xyXG52YXIgUHJlcENvbnRyb2xsZXJDb21tYW5kID0gcmVxdWlyZSgnLi9wcmVwQ29udHJvbGxlckNvbW1hbmQuanMnKTtcclxudmFyIFByZXBNb2RlbENvbW1hbmQgPSByZXF1aXJlKCcuL3ByZXBNb2RlbENvbW1hbmQuanMnKTtcclxudmFyIFByZXBWaWV3Q29tbWFuZCA9IHJlcXVpcmUoJy4vcHJlcFZpZXdDb21tYW5kLmpzJyk7XHJcbnZhciBIb21lQ29tbWFuZCA9IHJlcXVpcmUoJy4vaG9tZUNvbW1hbmQuanMnKTtcclxudmFyIGNvbnN0YW50cyA9IHJlcXVpcmUoJy4uLy4uL2FwcENvbnN0YW50cy5qcycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBwdXJlbXZjLmRlZmluZSh7XHJcbiAgICAgICAgbmFtZTogJ2ZpZ2h0ZXIuY29udHJvbGxlci5jb21tYW5kLlN0YXJ0dXBDb21tYW5kJyxcclxuICAgICAgICBwYXJlbnQ6IHB1cmVtdmMuTWFjcm9Db21tYW5kXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBZGQgdGhlIHN1Yi1jb21tYW5kcyBmb3IgdGhpcyBNYWNyb0NvbW1hbmRcclxuICAgICAgICAgKiBAb3ZlcnJpZGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBpbml0aWFsaXplTWFjcm9Db21tYW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNjLmxvZygnc3RhcnQgY29tbWFuZCBpbml0Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkU3ViQ29tbWFuZCggUHJlcENvbnRyb2xsZXJDb21tYW5kICk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkU3ViQ29tbWFuZCggUHJlcE1vZGVsQ29tbWFuZCApO1xyXG4gICAgICAgICAgICB0aGlzLmFkZFN1YkNvbW1hbmQoIFByZXBWaWV3Q29tbWFuZCApO1xyXG4gICAgICAgICAgICB0aGlzLmFkZFN1YkNvbW1hbmQoIEhvbWVDb21tYW5kICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBBcnRodXIgb24gMjAxNC8xMi8yMS5cclxuICovXHJcblxyXG52YXIgcHVyZW12YyA9IHJlcXVpcmUoJ3B1cmVtdmMnKS5wdXJlbXZjO1xyXG52YXIgY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vLi4vYXBwQ29uc3RhbnRzLmpzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHB1cmVtdmMuZGVmaW5lKHtcclxuICAgICAgICBuYW1lOiAnZmlnaHRlci5jb250cm9sbGVyLmNvbW1hbmQuSG9tZUNvbW1hbmQnLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5TaW1wbGVDb21tYW5kXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZWdpc3RlciBDb21tYW5kcyB3aXRoIHRoZSBDb250cm9sbGVyXHJcbiAgICAgICAgICogQG92ZXJyaWRlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZXhlY3V0ZTogZnVuY3Rpb24gKG5vdGUpIHtcclxuICAgICAgICAgICAgLy8gVGhpcyByZWdpc3RlcnMgbXVsdGlwbGUgbm90ZXMgdG8gYSBzaW5nbGUgY29tbWFuZCB3aGljaCBwZXJmb3JtcyBkaWZmZXJlbnQgbG9naWMgYmFzZWQgb24gdGhlIG5vdGUgbmFtZS5cclxuICAgICAgICAgICAgLy8gSW4gYSBtb3JlIGNvbXBsZXggYXBwLCB3ZSdkIHVzdWFsbHkgYmUgcmVnaXN0ZXJpbmcgYSBkaWZmZXJlbnQgY29tbWFuZCB0byBlYWNoIG5vdGlmaWNhdGlvbiBuYW1lLlxyXG4gICAgICAgICAgICBjYy5sb2coJ0hvbWVDb21tYW5kIGV4ZWN1dGUnKTtcclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLmZhY2FkZS5zZW5kTm90aWZpY2F0aW9uKGNvbnN0YW50cy5TQ0VORV9BQ1RJT04sIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IGNvbnN0YW50cy5TQ0VORS5IT01FXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5mYWNhZGUuc2VuZE5vdGlmaWNhdGlvbihjb25zdGFudHMuVEFTS19BQ1RJT05fTU9OSVRPUik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4pO1xyXG5cclxuXHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFydGh1ciBvbiAyMDE1LzEvMS5cclxuICovXHJcbnZhciBwdXJlbXZjID0gcmVxdWlyZSgncHVyZW12YycpLnB1cmVtdmM7XHJcbnZhciBjb25zdGFudHMgPSByZXF1aXJlKCcuLi8uLi9hcHBDb25zdGFudHMuanMnKTtcclxudmFyIFBsYXllclByb3h5TmFtZSA9IHJlcXVpcmUoJy4uLy4uL21vZGVsL3Byb3h5L3BsYXllclByb3h5LmpzJykuTkFNRTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcHVyZW12Yy5kZWZpbmUoe1xyXG4gICAgICAgIG5hbWU6ICdmaWdodGVyLmNvbnRyb2xsZXIuY29tbWFuZC5QbGF5ZXJDb21tYW5kJyxcclxuICAgICAgICBwYXJlbnQ6IHB1cmVtdmMuU2ltcGxlQ29tbWFuZFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVnaXN0ZXIgQ29tbWFuZHMgd2l0aCB0aGUgQ29udHJvbGxlclxyXG4gICAgICAgICAqIEBvdmVycmlkZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGV4ZWN1dGU6IGZ1bmN0aW9uIChub3RlKSB7XHJcbiAgICAgICAgICAgIC8vIFRoaXMgcmVnaXN0ZXJzIG11bHRpcGxlIG5vdGVzIHRvIGEgc2luZ2xlIGNvbW1hbmQgd2hpY2ggcGVyZm9ybXMgZGlmZmVyZW50IGxvZ2ljIGJhc2VkIG9uIHRoZSBub3RlIG5hbWUuXHJcbiAgICAgICAgICAgIC8vIEluIGEgbW9yZSBjb21wbGV4IGFwcCwgd2UnZCB1c3VhbGx5IGJlIHJlZ2lzdGVyaW5nIGEgZGlmZmVyZW50IGNvbW1hbmQgdG8gZWFjaCBub3RpZmljYXRpb24gbmFtZS5cclxuICAgICAgICAgICAgY2MubG9nKCdIb21lQ29tbWFuZCBleGVjdXRlJyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgcGxheWVyUHJveHkgPSB0aGlzLmZhY2FkZS5yZXRyaWV2ZVByb3h5KFBsYXllclByb3h5TmFtZSk7XHJcblxyXG4gICAgICAgICAgICBzd2l0Y2gobm90ZS5nZXROYW1lKCkpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgY29uc3RhbnRzLlBMQVlFUl9BQ1RJT046XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyUHJveHkudXBkYXRlUGxheWVyKG5vdGUuZ2V0Qm9keSgpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vdGUuZ2V0VHlwZSgpID09IGNvbnN0YW50cy5UQVNLX0FDVElPTl9GSU5JU0hFRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXJQcm94eS51cGRhdGVQbGF5ZXJCeVRhc2sobm90ZS5nZXRCb2R5KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgY29uc3RhbnRzLkxPVkVfQUNUSU9OOlxyXG4gICAgICAgICAgICAgICAgICAgIHBsYXllclByb3h5LnVwZGF0ZVBsYXllckJ5TG92ZShub3RlLmdldEJvZHkoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbik7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgQXJ0aHVyIG9uIDIwMTQvMTIvMTQuXHJcbiAqL1xyXG52YXIgcHVyZW12YyA9IHJlcXVpcmUoJ3B1cmVtdmMnKS5wdXJlbXZjO1xyXG52YXIgY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vLi4vYXBwQ29uc3RhbnRzLmpzJyk7XHJcbnZhciBQbGF5ZXJDb21tYW5kID0gcmVxdWlyZSgnLi9wbGF5ZXJDb21tYW5kLmpzJyk7XHJcbnZhciBUYXNrQ29tbWFuZCA9IHJlcXVpcmUoJy4vdGFza0NvbW1hbmQuanMnKTtcclxudmFyIFRhc2tNb25pdG9yQ29tbWFuZCA9IHJlcXVpcmUoJy4vdGFza01vbml0b3JDb21tYW5kLmpzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHB1cmVtdmMuZGVmaW5lKHtcclxuICAgICAgICBuYW1lOiAnZmlnaHRlci5jb250cm9sbGVyLmNvbW1hbmQuUHJlcENvbnRyb2xsZXJDb21tYW5kJyxcclxuICAgICAgICBwYXJlbnQ6IHB1cmVtdmMuU2ltcGxlQ29tbWFuZFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVnaXN0ZXIgQ29tbWFuZHMgd2l0aCB0aGUgQ29udHJvbGxlclxyXG4gICAgICAgICAqIEBvdmVycmlkZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGV4ZWN1dGU6IGZ1bmN0aW9uIChub3RlKSB7XHJcbiAgICAgICAgICAgIC8vIFRoaXMgcmVnaXN0ZXJzIG11bHRpcGxlIG5vdGVzIHRvIGEgc2luZ2xlIGNvbW1hbmQgd2hpY2ggcGVyZm9ybXMgZGlmZmVyZW50IGxvZ2ljIGJhc2VkIG9uIHRoZSBub3RlIG5hbWUuXHJcbiAgICAgICAgICAgIC8vIEluIGEgbW9yZSBjb21wbGV4IGFwcCwgd2UnZCB1c3VhbGx5IGJlIHJlZ2lzdGVyaW5nIGEgZGlmZmVyZW50IGNvbW1hbmQgdG8gZWFjaCBub3RpZmljYXRpb24gbmFtZS5cclxuICAgICAgICAgICAgY2MubG9nKCdQcmVwQ29udHJvbGxlckNvbW1hbmQgZXhlY3V0ZScpO1xyXG4gICAgICAgICAgICB0aGlzLmZhY2FkZS5yZWdpc3RlckNvbW1hbmQoY29uc3RhbnRzLlBMQVlFUl9BQ1RJT04sIFBsYXllckNvbW1hbmQpO1xyXG4gICAgICAgICAgICB0aGlzLmZhY2FkZS5yZWdpc3RlckNvbW1hbmQoY29uc3RhbnRzLkxPVkVfQUNUSU9OLCBQbGF5ZXJDb21tYW5kKTtcclxuICAgICAgICAgICAgdGhpcy5mYWNhZGUucmVnaXN0ZXJDb21tYW5kKGNvbnN0YW50cy5UQVNLX0FDVElPTiwgVGFza0NvbW1hbmQpO1xyXG4gICAgICAgICAgICB0aGlzLmZhY2FkZS5yZWdpc3RlckNvbW1hbmQoY29uc3RhbnRzLlRBU0tfQUNUSU9OX01PTklUT1IsIFRhc2tNb25pdG9yQ29tbWFuZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4pOyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFydGh1ciBvbiAyMDE0LzEyLzE0LlxyXG4gKi9cclxudmFyIHB1cmVtdmMgPSByZXF1aXJlKCdwdXJlbXZjJykucHVyZW12YztcclxudmFyIFBsYXllclByb3h5ID0gcmVxdWlyZSgnLi4vLi4vbW9kZWwvcHJveHkvcGxheWVyUHJveHkuanMnKTtcclxudmFyIFRhc2tQcm94eSA9IHJlcXVpcmUoJy4uLy4uL21vZGVsL3Byb3h5L3Rhc2tQcm94eS5qcycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBwdXJlbXZjLmRlZmluZSh7XHJcbiAgICAgICAgbmFtZTogJ2ZpZ2h0ZXIuY29udHJvbGxlci5jb21tYW5kLlByZXBNb2RlbENvbW1hbmQnLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5TaW1wbGVDb21tYW5kXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZWdpc3RlciBQcm94aWVzIHdpdGggdGhlIE1vZGVsXHJcbiAgICAgICAgICogQG92ZXJyaWRlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZXhlY3V0ZTogZnVuY3Rpb24gKG5vdGUpIHtcclxuICAgICAgICAgICAgY2MubG9nKCdQcmVwTW9kZWxDb21tYW5kIGV4ZWN1dGUnKTtcclxuICAgICAgICAgICAgdGhpcy5mYWNhZGUucmVnaXN0ZXJQcm94eShuZXcgUGxheWVyUHJveHkoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuZmFjYWRlLnJlZ2lzdGVyUHJveHkobmV3IFRhc2tQcm94eSgpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFydGh1ciBvbiAyMDE0LzEyLzE0LlxyXG4gKi9cclxudmFyIHB1cmVtdmMgPSByZXF1aXJlKCdwdXJlbXZjJykucHVyZW12YztcclxudmFyIERpcmVjdG9yTWVkaWF0b3IgPSByZXF1aXJlKCcuLi8uLi92aWV3L21lZGlhdG9yL2RpcmVjdG9yTWVkaWF0b3IuanMnKTtcclxudmFyIEhvbWVNZWRpYXRvciA9IHJlcXVpcmUoJy4uLy4uL3ZpZXcvbWVkaWF0b3IvaG9tZU1lZGlhdG9yLmpzJyk7XHJcbnZhciBTY2VuZU1lZGlhdG9yID0gcmVxdWlyZSgnLi4vLi4vdmlldy9tZWRpYXRvci9zY2VuZU1lZGlhdG9yLmpzJyk7XHJcbnZhciBUcmFpbk1lZGlhdG9yID0gcmVxdWlyZSgnLi4vLi4vdmlldy9tZWRpYXRvci90cmFpbk1lZGlhdG9yLmpzJyk7XHJcbnZhciBMb3ZlTWVkaWF0b3IgPSByZXF1aXJlKCcuLi8uLi92aWV3L21lZGlhdG9yL2xvdmVNZWRpYXRvci5qcycpO1xyXG52YXIgRmlnaHRNZWRpYXRvciA9IHJlcXVpcmUoJy4uLy4uL3ZpZXcvbWVkaWF0b3IvZmlnaHRNZWRpYXRvci5qcycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBwdXJlbXZjLmRlZmluZSAoe1xyXG4gICAgICAgIG5hbWU6ICdmaWdodGVyLmNvbnRyb2xsZXIuY29tbWFuZC5QcmVwVmlld0NvbW1hbmQnLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5TaW1wbGVDb21tYW5kXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZWdpc3RlciBNZWRpYXRvcnMgd2l0aCB0aGUgVmlld1xyXG4gICAgICAgICAqIEBvdmVycmlkZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGV4ZWN1dGU6IGZ1bmN0aW9uIChub3RlKSB7XHJcbiAgICAgICAgICAgIGNjLmxvZygnUHJlcFZpZXdDb21tYW5kIGV4ZWN1dGUnKTtcclxuICAgICAgICAgICAgdGhpcy5mYWNhZGUucmVnaXN0ZXJNZWRpYXRvcihuZXcgRGlyZWN0b3JNZWRpYXRvcigpKTtcclxuICAgICAgICAgICAgdGhpcy5mYWNhZGUucmVnaXN0ZXJNZWRpYXRvcihuZXcgU2NlbmVNZWRpYXRvcigpKTtcclxuICAgICAgICAgICAgdGhpcy5mYWNhZGUucmVnaXN0ZXJNZWRpYXRvcihuZXcgSG9tZU1lZGlhdG9yKCkpO1xyXG4gICAgICAgICAgICB0aGlzLmZhY2FkZS5yZWdpc3Rlck1lZGlhdG9yKG5ldyBUcmFpbk1lZGlhdG9yKCkpO1xyXG4gICAgICAgICAgICB0aGlzLmZhY2FkZS5yZWdpc3Rlck1lZGlhdG9yKG5ldyBMb3ZlTWVkaWF0b3IoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuZmFjYWRlLnJlZ2lzdGVyTWVkaWF0b3IobmV3IEZpZ2h0TWVkaWF0b3IoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBBcnRodXIgb24gMjAxNS8xLzEuXHJcbiAqL1xyXG52YXIgcHVyZW12YyA9IHJlcXVpcmUoJ3B1cmVtdmMnKS5wdXJlbXZjO1xyXG52YXIgY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vLi4vYXBwQ29uc3RhbnRzLmpzJyk7XHJcbnZhciBUYXNrUHJveHlOYW1lID0gcmVxdWlyZSgnLi4vLi4vbW9kZWwvcHJveHkvdGFza1Byb3h5LmpzJykuTkFNRTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcHVyZW12Yy5kZWZpbmUoe1xyXG4gICAgICAgIG5hbWU6ICdmaWdodGVyLmNvbnRyb2xsZXIuY29tbWFuZC5UYXNrQ29tbWFuZCcsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLlNpbXBsZUNvbW1hbmRcclxuICAgIH0sXHJcblxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlZ2lzdGVyIENvbW1hbmRzIHdpdGggdGhlIENvbnRyb2xsZXJcclxuICAgICAgICAgKiBAb3ZlcnJpZGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBleGVjdXRlOiBmdW5jdGlvbiAobm90ZSkge1xyXG4gICAgICAgICAgICAvLyBUaGlzIHJlZ2lzdGVycyBtdWx0aXBsZSBub3RlcyB0byBhIHNpbmdsZSBjb21tYW5kIHdoaWNoIHBlcmZvcm1zIGRpZmZlcmVudCBsb2dpYyBiYXNlZCBvbiB0aGUgbm90ZSBuYW1lLlxyXG4gICAgICAgICAgICAvLyBJbiBhIG1vcmUgY29tcGxleCBhcHAsIHdlJ2QgdXN1YWxseSBiZSByZWdpc3RlcmluZyBhIGRpZmZlcmVudCBjb21tYW5kIHRvIGVhY2ggbm90aWZpY2F0aW9uIG5hbWUuXHJcbiAgICAgICAgICAgIGNjLmxvZygnVGFza0NvbW1hbmQgZXhlY3V0ZScsIG5vdGUudG9TdHJpbmcoKSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGFza1Byb3h5ID0gdGhpcy5mYWNhZGUucmV0cmlldmVQcm94eShUYXNrUHJveHlOYW1lKTtcclxuXHJcbiAgICAgICAgICAgIHN3aXRjaChub3RlLmdldFR5cGUoKSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBjb25zdGFudHMuVEFTS19BQ1RJT05fU1RBUlQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGFza1Byb3h5LnN0YXJ0VGFzayhub3RlLmdldEJvZHkoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIGNvbnN0YW50cy5UQVNLX0FDVElPTl9GSU5JU0hFRDpcclxuICAgICAgICAgICAgICAgICAgICB0YXNrUHJveHkuZmluaXNoVGFzayhub3RlLmdldEJvZHkoKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4pOyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFydGh1ciBvbiAyMDE1LzEvMS5cclxuICovXHJcbnZhciBwdXJlbXZjID0gcmVxdWlyZSgncHVyZW12YycpLnB1cmVtdmM7XHJcbnZhciBjb25zdGFudHMgPSByZXF1aXJlKCcuLi8uLi9hcHBDb25zdGFudHMuanMnKTtcclxudmFyIFRhc2tQcm94eU5hbWUgPSByZXF1aXJlKCcuLi8uLi9tb2RlbC9wcm94eS90YXNrUHJveHkuanMnKS5OQU1FO1xyXG52YXIgXyA9IHJlcXVpcmUoJ3VuZGVyc2NvcmUnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcHVyZW12Yy5kZWZpbmUoe1xyXG4gICAgICAgIG5hbWU6ICdmaWdodGVyLmNvbnRyb2xsZXIuY29tbWFuZC5UYXNrTW9uaXRvckNvbW1hbmQnLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5TaW1wbGVDb21tYW5kXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZWdpc3RlciBDb21tYW5kcyB3aXRoIHRoZSBDb250cm9sbGVyXHJcbiAgICAgICAgICogQG92ZXJyaWRlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZXhlY3V0ZTogZnVuY3Rpb24gKG5vdGUpIHtcclxuICAgICAgICAgICAgLy8gVGhpcyByZWdpc3RlcnMgbXVsdGlwbGUgbm90ZXMgdG8gYSBzaW5nbGUgY29tbWFuZCB3aGljaCBwZXJmb3JtcyBkaWZmZXJlbnQgbG9naWMgYmFzZWQgb24gdGhlIG5vdGUgbmFtZS5cclxuICAgICAgICAgICAgLy8gSW4gYSBtb3JlIGNvbXBsZXggYXBwLCB3ZSdkIHVzdWFsbHkgYmUgcmVnaXN0ZXJpbmcgYSBkaWZmZXJlbnQgY29tbWFuZCB0byBlYWNoIG5vdGlmaWNhdGlvbiBuYW1lLlxyXG4gICAgICAgICAgICBjYy5sb2coJ1Rhc2tNb25pdG9yQ29tbWFuZCBleGVjdXRlJywgbm90ZS50b1N0cmluZygpKTtcclxuXHJcbiAgICAgICAgICAgIGNjLkRpcmVjdG9yLnNoYXJlZERpcmVjdG9yLmdldFNjaGVkdWxlcigpXHJcbiAgICAgICAgICAgICAgICAuc2NoZWR1bGVDYWxsYmFja0ZvclRhcmdldCh0aGlzLCB0aGlzLmNoZWNrVGFza1N0YXR1cywgMSwgY2MuUkVQRUFUX0ZPUkVWRVIsIDAsIGZhbHNlKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjaGVja1Rhc2tTdGF0dXM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjYy5sb2coJ3Rhc2sgbW9uaXRvcicpO1xyXG4gICAgICAgICAgICB2YXIgdGFza1Byb3h5ID0gdGhpcy5mYWNhZGUucmV0cmlldmVQcm94eShUYXNrUHJveHlOYW1lKTtcclxuICAgICAgICAgICAgdmFyIHRhc2tMaXN0ID0gdGFza1Byb3h5LmdldERhdGEoKTtcclxuICAgICAgICAgICAgdmFyIGZpbHRlcmVkID0gXy52YWx1ZXModGFza0xpc3QpLmZpbHRlcihmdW5jdGlvbih0YXNrKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFzay5nZXQoJ3N0YXR1cycpID09IGNvbnN0YW50cy5UQVNLX1NUQVRVUy5TVEFSVDtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgZmlsdGVyZWQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciB0ID0gZmlsdGVyZWRbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAodC5pc0ZpbmlzaGVkKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZhY2FkZS5zZW5kTm90aWZpY2F0aW9uKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdGFudHMuVEFTS19BQ1RJT04sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0YW50cy5UQVNLX0FDVElPTl9GSU5JU0hFRFxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mYWNhZGUuc2VuZE5vdGlmaWNhdGlvbihcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3RhbnRzLlBMQVlFUl9BQ1RJT04sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0YW50cy5UQVNLX0FDVElPTl9GSU5JU0hFRFxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbik7IiwiLyoqXHJcbiAqIENyZWF0ZWQgd2l0aCBKZXRCcmFpbnMgV2ViU3Rvcm0uXHJcbiAqIFVzZXI6IGxjYzM1MzZcclxuICogRGF0ZTogMTMtNy05XHJcbiAqIFRpbWU6IOS4i+WNiDU6MjRcclxuICogVG8gY2hhbmdlIHRoaXMgdGVtcGxhdGUgdXNlIEZpbGUgfCBTZXR0aW5ncyB8IEZpbGUgVGVtcGxhdGVzLlxyXG4gKi9cclxuXHJcblxyXG4vKlxyXG4gKiBlbnRpdHlcclxuICogKi9cclxuXHJcbnZhciBFdmVudCA9IHJlcXVpcmUoJy4uLy4uL3V0aWwvZXZlbnQuanMnKTtcclxuXHJcbnZhciBFbnRpdHkgPSBtb2R1bGUuZXhwb3J0cyA9IEV2ZW50LmV4dGVuZCh7XHJcbiAgICBjdG9yOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLl9kYXRhID0ge307XHJcbiAgICAgICAgdGhpcy5pbml0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc2F2ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2tleSkge1xyXG4gICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5fa2V5LCBKU09OLnN0cmluZ2lmeSh0aGlzLl9kYXRhKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBmZXRjaDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2tleSkge1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLl9rZXkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRyeXtcclxuICAgICAgICAgICAgICAgIHZhciBhdHRycyA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldHMoYXR0cnMpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH0gY2F0Y2goZSkge1xyXG4gICAgICAgICAgICAgICAgY2MuZXJyb3IoJ2NhbiBub3QgcGFyc2UgZW50aXR5IGRhdGE6ICcsIGRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgY3JlYXRlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGdldERhdGE6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xyXG4gICAgfSxcclxuXHJcblx0c2V0OiBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcclxuXHRcdGlmICh0eXBlb2YgdmFsdWUgIT0gXCJ1bmRlZmluZWRcIikge1xyXG5cdFx0XHRpZiAodGhpcy5fZGF0YVtuYW1lXSAhPT0gdmFsdWUpIHtcclxuXHRcdFx0XHR0aGlzLl9kYXRhW25hbWVdID0gdmFsdWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuZW1pdChuYW1lICsgXCIuY2hhbmdlXCIsIHZhbHVlKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRzZXRzOiBmdW5jdGlvbiAoYXR0cnMpIHtcclxuXHRcdHZhciBrZXk7XHJcblxyXG5cdFx0Zm9yIChrZXkgaW4gYXR0cnMpIHtcclxuXHRcdFx0dGhpcy5zZXQoa2V5LCBhdHRyc1trZXldKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRnZXQ6IGZ1bmN0aW9uIChuYW1lKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5fZGF0YVtuYW1lXTtcclxuXHR9LFxyXG5cclxuICAgIGFkZDogZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcclxuICAgICAgICB2YXIgdmFsID0gdGhpcy5nZXQobmFtZSk7XHJcbiAgICAgICAgdGhpcy5zZXQobmFtZSwgdmFsdWUgKyB2YWwpO1xyXG4gICAgfSxcclxuXHJcblx0aGFzOiBmdW5jdGlvbiAobmFtZSkge1xyXG5cdFx0cmV0dXJuICh0eXBlb2YgKHRoaXMuX2RhdGFbbmFtZV0pICE9IFwidW5kZWZpbmVkXCIpO1xyXG5cdH0sXHJcblxyXG5cdHNjaGVkdWxlOiBmdW5jdGlvbiAoZm4sIGludGVydmFsLCByZXBlYXQsIGRlbGF5KSB7XHJcblx0XHRpbnRlcnZhbCA9IGludGVydmFsIHx8IDA7XHJcblx0XHRyZXBlYXQgPSAocmVwZWF0ID09IG51bGwpID8gY2MuUkVQRUFUX0ZPUkVWRVIgOiByZXBlYXQ7XHJcblx0XHRkZWxheSA9IGRlbGF5IHx8IDA7XHJcblxyXG5cdFx0Y2MuRGlyZWN0b3Iuc2hhcmVkRGlyZWN0b3IuZ2V0U2NoZWR1bGVyKCkuc2NoZWR1bGVDYWxsYmFja0ZvclRhcmdldCh0aGlzLCBmbiwgaW50ZXJ2YWwsIHJlcGVhdCwgZGVsYXksIGZhbHNlKTtcclxuXHR9LFxyXG5cclxuXHRzY2hlZHVsZU9uY2U6IGZ1bmN0aW9uIChmbiwgZGVsYXkpIHtcclxuXHRcdHRoaXMuc2NoZWR1bGUoZm4sIDAuMCwgMCwgZGVsYXkpO1xyXG5cdH0sXHJcblxyXG5cdHVuc2NoZWR1bGU6IGZ1bmN0aW9uIChmbikge1xyXG5cdFx0Ly8gZXhwbGljaXQgbmlsIGhhbmRsaW5nXHJcblx0XHRjYy5EaXJlY3Rvci5zaGFyZWREaXJlY3Rvci5nZXRTY2hlZHVsZXIoKS51bnNjaGVkdWxlQ2FsbGJhY2tGb3JUYXJnZXQodGhpcywgZm4pO1xyXG5cdH0sXHJcblxyXG5cdHVuc2NoZWR1bGVBbGxDYWxsYmFja3M6IGZ1bmN0aW9uICgpIHtcclxuXHRcdGNjLkRpcmVjdG9yLnNoYXJlZERpcmVjdG9yLmdldFNjaGVkdWxlcigpLnVuc2NoZWR1bGVBbGxDYWxsYmFja3NGb3JUYXJnZXQodGhpcyk7XHJcblx0fVxyXG59KTtcclxuIiwidmFyIEVudGl0eSA9IHJlcXVpcmUoJy4vZW50aXR5LmpzJyk7XHJcblxyXG52YXIgUGxheWVyID0gbW9kdWxlLmV4cG9ydHMgPSBFbnRpdHkuZXh0ZW5kKHtcclxuICAgIGN0b3I6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuX2tleSA9ICdQbGF5ZXJFbnRpdHknO1xyXG4gICAgICAgIHRoaXMuX25hbWUgPSAnUGxheWVyRW50aXR5JztcclxuICAgICAgICB0aGlzLl9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cclxuICAgICAgICB0aGlzLm9uKCdsb3ZlQ291bnQuY2hhbmdlJywgZnVuY3Rpb24oY291bnQpIHtcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBpc0luaXRlZCA9IHRoaXMuZmV0Y2goKTtcclxuICAgICAgICBpZiAoIWlzSW5pdGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjcmVhdGU6IGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgICB0aGlzLnNldHMoUGxheWVyLkRFRkFVTFRfREFUQSk7XHJcbiAgICAgICAgdGhpcy5zZXQoJ25hbWUnLCBuYW1lKTtcclxuICAgICAgICB0aGlzLnNhdmUoKTtcclxuICAgIH0sXHJcblxyXG4gICAgcmVkdWNlRGFpeUNvdW50OiBmdW5jdGlvbihuYW1lLCBjb3VudCkge1xyXG4gICAgICAgIHZhciBkYyA9IHRoaXMuZ2V0KCdkYWlseUNvdW50Jyk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBkY1tuYW1lXSAhPSAndW5kZWZpbmVkJyAmJiBkY1tuYW1lXSA+IDApIHtcclxuICAgICAgICAgICAgZGNbbmFtZV0gPSBNYXRoLm1heCgwLCBkY1tuYW1lXSAtIGNvdW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuUGxheWVyLkxvdmVDb3VudE1hcCA9IHtcclxuICAgIDE6IDk5LFxyXG4gICAgMjogNDk5LFxyXG4gICAgMzogMTk5OSxcclxuICAgIDQ6IDQ5OTksXHJcbiAgICA1OiA5OTk5XHJcbn07XHJcblxyXG5QbGF5ZXIuREVGQVVMVF9EQVRBID0ge1xyXG4gICAgZ29sZDogMTAwLFxyXG4gICAgaHA6IDEwMSxcclxuICAgIGF0azogMTAyLFxyXG4gICAgZGVmZW5jZTogMTAzLFxyXG4gICAgdW5kZWZlbmNlOiAxMDQsXHJcbiAgICBjcml0OiA1LFxyXG4gICAgdW5jcml0OiA1LFxyXG4gICAgZG9kZ2U6IDUsXHJcbiAgICBoaXQ6IDUsXHJcblxyXG4gICAgbG92ZUx2OiAxLFxyXG4gICAgbG92ZUNvdW50OiAwLFxyXG5cclxuICAgIGRhaWx5Q291bnQ6IHtcclxuICAgICAgICBmcmVlTG92ZTogOTBcclxuICAgIH1cclxufTsiLCJ2YXIgRW50aXR5ID0gcmVxdWlyZSgnLi9lbnRpdHkuanMnKTtcclxudmFyIGNvbnN0YW50cyA9IHJlcXVpcmUoJy4uLy4uL2FwcENvbnN0YW50cy5qcycpO1xyXG52YXIgXyA9IHJlcXVpcmUoJ3VuZGVyc2NvcmUnKTtcclxuXHJcbnZhciBUYXNrID0gbW9kdWxlLmV4cG9ydHMgPSBFbnRpdHkuZXh0ZW5kKHtcclxuICAgIGN0b3I6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5fbmFtZSA9IFwiVGFza0VudGl0eVwiO1xyXG4gICAgICAgIHRoaXMuX2tleSA9IFwidGFza1wiO1xyXG5cclxuICAgICAgICB0aGlzLl9zdXBlcihkYXRhKTtcclxuICAgIH0sXHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgIHRoaXMuX2tleSA9IHRoaXMuX2tleSArICcuJyArIGRhdGEuaWQ7XHJcbiAgICAgICAgaWYgKCF0aGlzLmZldGNoKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGUoZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjcmVhdGU6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICB0aGlzLnNldHMoZGF0YSk7XHJcbiAgICAgICAgdGhpcy5zYXZlKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0OiBmdW5jdGlvbiAoY291bnQpIHtcclxuICAgICAgICB0aGlzLnNldHMoe1xyXG4gICAgICAgICAgICBzdGF0dXM6IGNvbnN0YW50cy5UQVNLX1NUQVRVUy5TVEFSVCxcclxuICAgICAgICAgICAgc3RhcnRUaW1lOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcclxuICAgICAgICAgICAgdG90YWxDb3VudDogY291bnQgfHwgdGhpcy5fdG90YWxDb3VudFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2F2ZSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBmaW5pc2g6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuc2V0cyh7XHJcbiAgICAgICAgICAgIHN0YXR1czogY29uc3RhbnRzLlRBU0tfU1RBVFVTLkZJTklTSFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2F2ZSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBpc1N0YXJ0ZWQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldCgnc3RhdHVzJykgPT0gY29uc3RhbnRzLlRBU0tfU1RBVFVTLlNUQVJUO1xyXG4gICAgfSxcclxuXHJcbiAgICBpc0ZpbmlzaGVkOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50aW1lTGVmdCgpIDw9IDA7XHJcbiAgICB9LFxyXG5cclxuICAgIHRpbWVMZWZ0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gKHRoaXMuZ2V0KCdzdGFydFRpbWUnKSArIHRoaXMuZ2V0KCd0b3RhbENvdW50JykgKiB0aGlzLmdldCgndGltZVBlckNvdW50JykpXHJcbiAgICAgICAgICAgIC0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHRpbWVMZWZ0U3RyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgdGltZSA9IHRoaXMudGltZUxlZnQoKTtcclxuICAgICAgICByZXR1cm4gKHRpbWUvMTAwMC82MCkudG9GaXhlZCgyKSArICfliIbpkp/lkI4nO1xyXG4gICAgfSxcclxuXHJcbiAgICB0b3RhbE9idGFpbjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KCdvYnRhaW5QZXJDb3VudCcpICogdGhpcy5nZXQoJ3RvdGFsQ291bnQnKTtcclxuICAgIH1cclxufSk7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFydGh1ciBvbiAyMDE0LzEyLzI2LlxyXG4gKi9cclxudmFyIHB1cmVtdmMgPSByZXF1aXJlKCdwdXJlbXZjJykucHVyZW12YztcclxudmFyIFBsYXllciA9IHJlcXVpcmUoJy4uL2VudGl0eS9wbGF5ZXIuanMnKTtcclxudmFyIGNvbnN0YW50cyA9IHJlcXVpcmUoJy4uLy4uL2FwcENvbnN0YW50cy5qcycpO1xyXG5cclxudmFyIFBsYXllclByb3h5ID0gbW9kdWxlLmV4cG9ydHMgPSBwdXJlbXZjLmRlZmluZSh7XHJcbiAgICAgICAgbmFtZTogJ2ZpZ3RoZXIubW9kZWwucHJveHkuUGxheWVyUHJveHknLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5Qcm94eSxcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3I6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBwdXJlbXZjLlByb3h5LmNhbGwodGhpcywgdGhpcy5jb25zdHJ1Y3Rvci5OQU1FKTtcclxuICAgICAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBuZXcgUGxheWVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YShwbGF5ZXIpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGdldFBsYXllcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGEgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHVwZGF0ZVBsYXllcjogZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc2V0KG5hbWUsIHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHVwZGF0ZVBsYXllckJ5VGFzazogZnVuY3Rpb24odGFzaykge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEuYWRkKHRhc2suZ2V0KCdhdHRyJyksIHRhc2sudG90YWxPYnRhaW4oKSk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zYXZlKCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdXBkYXRlUGxheWVyQnlMb3ZlOiBmdW5jdGlvbihsb3ZlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS5hZGQoJ2xvdmVDb3VudCcsIGxvdmUuY291bnQpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEucmVkdWNlRGFpeUNvdW50KCdmcmVlTG92ZScsIGxvdmUuY291bnQpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEuYWRkKCdnb2xkJywgLWxvdmUuZ29sZCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zYXZlKCk7XHJcbiAgICAgICAgICAgIHZhciBsb3ZlQ291bnQgPSB0aGlzLmRhdGEuZ2V0KCdsb3ZlQ291bnQnKTtcclxuICAgICAgICAgICAgdmFyIGxvdmVMdiA9IHRoaXMuZGF0YS5nZXQoJ2xvdmVMdicpO1xyXG4gICAgICAgICAgICB2YXIgbmVlZENvdW50ID0gUGxheWVyLkxvdmVDb3VudE1hcFtsb3ZlTHZdO1xyXG4gICAgICAgICAgICBpZiAobmVlZENvdW50ICE9IG51bGwgJiYgbmVlZENvdW50ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvdmVDb3VudCA+PSBuZWVkQ291bnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEuYWRkKCdsb3ZlTHYnLCAxKTtcclxuLy8gICAgICAgICAgICAgICAgICAgIHRoaXMuZmFjYWRlLnNlbmROb3RpZmljYXRpb24oXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgY29uc3RhbnRzLlBMQVlFUl9BQ1RJT05cclxuLy8gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzZXROYW1lOiBmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zZXQoJ25hbWUnLCBuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHtcclxuICAgICAgICBOQU1FOiAnUGxheWVyUHJveHknXHJcbiAgICB9XHJcbik7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgQXJ0aHVyIG9uIDIwMTUvMS8yLlxyXG4gKi9cclxudmFyIHB1cmVtdmMgPSByZXF1aXJlKCdwdXJlbXZjJykucHVyZW12YztcclxudmFyIFRhc2sgPSByZXF1aXJlKCcuLi9lbnRpdHkvdGFzay5qcycpO1xyXG52YXIgY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vLi4vYXBwQ29uc3RhbnRzLmpzJyk7XHJcblxyXG52YXIgVGFza1Byb3h5O1xyXG5UYXNrUHJveHkgPSBtb2R1bGUuZXhwb3J0cyA9IHB1cmVtdmMuZGVmaW5lKHtcclxuICAgICAgICBuYW1lOiAnZmlndGhlci5tb2RlbC5wcm94eS5UYXNrUHJveHknLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5Qcm94eSxcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcHVyZW12Yy5Qcm94eS5jYWxsKHRoaXMsIHRoaXMuY29uc3RydWN0b3IuTkFNRSk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSB7fTtcclxuICAgICAgICAgICAgVGFza1Byb3h5LlRhc2tzLmZvckVhY2goZnVuY3Rpb24odCkge1xyXG4gICAgICAgICAgICAgICAgZGF0YVt0LmlkXSA9IG5ldyBUYXNrKHQpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YShkYXRhKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzdGFydFRhc2s6IGZ1bmN0aW9uKHRhc2spIHtcclxuICAgICAgICAgICAgdGhpcy5nZXREYXRhKClbdGFzay5nZXQoJ2lkJyldLnN0YXJ0KHRhc2suZ2V0KCdjb3VudCcpKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBmaW5pc2hUYXNrOiBmdW5jdGlvbih0YXNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0RGF0YSgpW3Rhc2suZ2V0KCdpZCcpXS5maW5pc2goKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBnZXRUYXNrOiBmdW5jdGlvbihpZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXREYXRlKClbaWRdO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNldFRhc2s6IGZ1bmN0aW9uKHRhc2spIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGF0YSgpW3Rhc2suaWRdID0gdGFzaztcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB1cGRhdGVUYXNrOiBmdW5jdGlvbih0YXNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGFzayh0YXNrKS5zYXZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICB7XHJcbiAgICAgICAgTkFNRTogJ1Rhc2tQcm94eSdcclxuICAgIH1cclxuKTtcclxuXHJcblRhc2tQcm94eS5UYXNrcyA9IFtcclxuICAgIHtcclxuICAgICAgICBpZDogMSxcclxuICAgICAgICBuYW1lOiAn55Sf5ZG9JyxcclxuICAgICAgICBhdHRyOiAnaHAnLFxyXG4gICAgICAgIHN0YXJ0VGltZTogMCxcclxuICAgICAgICBzdGF0dXM6IGNvbnN0YW50cy5UQVNLX1NUQVRVUy5TVE9QLFxyXG4gICAgICAgIHRvdGFsQ291bnQ6IDEwMCxcclxuICAgICAgICB0aW1lUGVyQ291bnQ6IDEwMCwvL+avq+enklxyXG4gICAgICAgIGNvbnN1bWVQZXJDb3VudDogMSxcclxuICAgICAgICBvYnRhaW5QZXJDb3VudDogMjBcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgaWQ6IDIsXHJcbiAgICAgICAgbmFtZTogJ+aUu+WHuycsXHJcbiAgICAgICAgYXR0cjogJ2F0aycsXHJcbiAgICAgICAgc3RhcnRUaW1lOiAwLFxyXG4gICAgICAgIHN0YXR1czogY29uc3RhbnRzLlRBU0tfU1RBVFVTLlNUT1AsXHJcbiAgICAgICAgdG90YWxDb3VudDogMTAwLFxyXG4gICAgICAgIHRpbWVQZXJDb3VudDogMTAwMCxcclxuICAgICAgICBjb25zdW1lUGVyQ291bnQ6IDEsXHJcbiAgICAgICAgb2J0YWluUGVyQ291bnQ6IDIwXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGlkOiAzLFxyXG4gICAgICAgIG5hbWU6ICfpmLLlvqEnLFxyXG4gICAgICAgIGF0dHI6J2RlZmVuY2UnLFxyXG4gICAgICAgIHN0YXJ0VGltZTogMCxcclxuICAgICAgICBzdGF0dXM6IGNvbnN0YW50cy5UQVNLX1NUQVRVUy5TVE9QLFxyXG4gICAgICAgIHRvdGFsQ291bnQ6IDEwMCxcclxuICAgICAgICB0aW1lUGVyQ291bnQ6IDEwMDAwLFxyXG4gICAgICAgIGNvbnN1bWVQZXJDb3VudDogMSxcclxuICAgICAgICBvYnRhaW5QZXJDb3VudDogMjBcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgaWQ6IDQsXHJcbiAgICAgICAgbmFtZTogJ+egtOmYsicsXHJcbiAgICAgICAgc3RhcnRUaW1lOiAwLFxyXG4gICAgICAgIGF0dHI6ICd1bmRlZmVuY2UnLFxyXG4gICAgICAgIHN0YXR1czogY29uc3RhbnRzLlRBU0tfU1RBVFVTLlNUT1AsXHJcbiAgICAgICAgdG90YWxDb3VudDogMTAwLFxyXG4gICAgICAgIHRpbWVQZXJDb3VudDogMTAwMDAwLFxyXG4gICAgICAgIGNvbnN1bWVQZXJDb3VudDogMSxcclxuICAgICAgICBvYnRhaW5QZXJDb3VudDogMjBcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgaWQ6IDUsXHJcbiAgICAgICAgbmFtZTogJ+aatOWHuycsXHJcbiAgICAgICAgYXR0cjogJ2NyaXQnLFxyXG4gICAgICAgIHN0YXJ0VGltZTogMCxcclxuICAgICAgICBzdGF0dXM6IGNvbnN0YW50cy5UQVNLX1NUQVRVUy5TVE9QLFxyXG4gICAgICAgIHRvdGFsQ291bnQ6IDEwMCxcclxuICAgICAgICB0aW1lUGVyQ291bnQ6IDEwMDAwMCxcclxuICAgICAgICBjb25zdW1lUGVyQ291bnQ6IDEsXHJcbiAgICAgICAgb2J0YWluUGVyQ291bnQ6IDIwXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGlkOiA2LFxyXG4gICAgICAgIG5hbWU6ICfpn6fmgKcnLFxyXG4gICAgICAgIGF0dHI6ICd1bmNyaXQnLFxyXG4gICAgICAgIHN0YXJ0VGltZTogMCxcclxuICAgICAgICBzdGF0dXM6IGNvbnN0YW50cy5UQVNLX1NUQVRVUy5TVE9QLFxyXG4gICAgICAgIHRvdGFsQ291bnQ6IDEwMCxcclxuICAgICAgICB0aW1lUGVyQ291bnQ6IDEwMDAwMCxcclxuICAgICAgICBjb25zdW1lUGVyQ291bnQ6IDEsXHJcbiAgICAgICAgb2J0YWluUGVyQ291bnQ6IDIwXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGlkOiA3LFxyXG4gICAgICAgIG5hbWU6ICfpl6rpgb8nLFxyXG4gICAgICAgIGF0dHI6ICdkb2RnZScsXHJcbiAgICAgICAgc3RhcnRUaW1lOiAwLFxyXG4gICAgICAgIHN0YXR1czogY29uc3RhbnRzLlRBU0tfU1RBVFVTLlNUT1AsXHJcbiAgICAgICAgdG90YWxDb3VudDogMTAwLFxyXG4gICAgICAgIHRpbWVQZXJDb3VudDogMTAwMDAwLFxyXG4gICAgICAgIGNvbnN1bWVQZXJDb3VudDogMSxcclxuICAgICAgICBvYnRhaW5QZXJDb3VudDogMjBcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgaWQ6IDgsXHJcbiAgICAgICAgbmFtZTogJ+WRveS4rScsXHJcbiAgICAgICAgYXR0cjogJ2hpdCcsXHJcbiAgICAgICAgc3RhcnRUaW1lOiAwLFxyXG4gICAgICAgIHN0YXR1czogY29uc3RhbnRzLlRBU0tfU1RBVFVTLlNUT1AsXHJcbiAgICAgICAgdG90YWxDb3VudDogMTAwLFxyXG4gICAgICAgIHRpbWVQZXJDb3VudDogMTAwMDAwLFxyXG4gICAgICAgIGNvbnN1bWVQZXJDb3VudDogMSxcclxuICAgICAgICBvYnRhaW5QZXJDb3VudDogMjBcclxuICAgIH1cclxuXTsiLCJ2YXIgcmVzID0ge1xuICAgIGFkZF9qcGc6IFwicmVzL2ltYWdlcy9hZGQuanBnXCIsXG4gICAgYnRuMV9qcGc6IFwicmVzL2ltYWdlcy9idG4xLmpwZ1wiLFxuXG4gICAgYnRuM19wbmc6IFwicmVzL2ltYWdlcy9idG4zLmpwZ1wiLFxuICAgIGJ0bjVfcG5nOiBcInJlcy9pbWFnZXMvYnRuNS5qcGdcIixcbiAgICBidG43X2pwZzogXCJyZXMvaW1hZ2VzL2J0bjcuanBnXCIsXG5cbiAgICBpbWcxX3BuZzogXCJyZXMvaW1hZ2VzL2ltZzEuanBnXCIsXG4gICAgaW1nNV9qcGc6IFwicmVzL2ltYWdlcy9pbWc1LmpwZ1wiLFxuICAgIGltZzZfanBnOiBcInJlcy9pbWFnZXMvaW1nNi5qcGdcIixcbiAgICB0eHRfYmcxX2pwZzogXCJyZXMvaW1hZ2VzL3R4dF9iZzEuanBnXCIsXG5cblxuICAgIE1haW5Ob2RlOiBcInJlcy9NYWluU2NlbmUuY3NiXCIsXG4gICAgVGFza05vZGU6IFwicmVzL1Rhc2tOb2RlLmNzYlwiLFxuICAgIFRyYWluTm9kZTogXCJyZXMvVHJhaW5Ob2RlLmNzYlwiLFxuICAgIExvdmVMYXllcjogXCJyZXMvTG92ZUxheWVyLmNzYlwiLFxuICAgIExvdmVJdGVtOiBcInJlcy9Mb3ZlSXRlbS5jc2JcIixcbiAgICBMb3ZlQ29uZmlybU5vZGU6IFwicmVzL0xvdmVDb25maXJtTm9kZS5jc2JcIixcbiAgICBDb25maXJtTm9kZTogXCJyZXMvQ29uZmlybU5vZGUuY3NiXCIsXG4gICAgRmlnaHROb2RlOiBcInJlcy9GaWdodE5vZGUuY3NiXCJcbn07XG5cbnZhciBnX3Jlc291cmNlcyA9IFtdO1xuZm9yICh2YXIgaSBpbiByZXMpIHtcbiAgICBnX3Jlc291cmNlcy5wdXNoKHJlc1tpXSk7XG59XG5cbm1vZHVsZS5leHBvcnRzLnJlcyA9IHJlcztcbm1vZHVsZS5leHBvcnRzLmdfcmVzb3VjZXMgPSBnX3Jlc291cmNlczsiLCIvKipcclxuICogQ3JlYXRlZCB3aXRoIEpldEJyYWlucyBXZWJTdG9ybS5cclxuICogVXNlcjogbGNjMzUzNlxyXG4gKiBEYXRlOiAxMy0xMC0xOFxyXG4gKiBUaW1lOiDkuIvljYgyOjU2XHJcbiAqIFRvIGNoYW5nZSB0aGlzIHRlbXBsYXRlIHVzZSBGaWxlIHwgU2V0dGluZ3MgfCBGaWxlIFRlbXBsYXRlcy5cclxuICovXHJcblxyXG5cclxuLypcclxuICogZXZlbnRcclxuICogKi9cclxuXHJcbnZhciBFdmVudCA9IG1vZHVsZS5leHBvcnRzID0gY2MuQ2xhc3MuZXh0ZW5kKHtcclxuICAgIF9jYWxsYmFjazoge30sXHJcblxyXG4gICAgb246IGZ1bmN0aW9uIChldmVudCwgZm4pIHtcclxuICAgICAgICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XHJcbiAgICAgICAgKHRoaXMuX2NhbGxiYWNrc1tldmVudF0gPSB0aGlzLl9jYWxsYmFja3NbZXZlbnRdIHx8IFtdKVxyXG4gICAgICAgICAgICAucHVzaChmbik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uY2U6IGZ1bmN0aW9uIChldmVudCwgZm4pIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBvbigpIHtcclxuICAgICAgICAgICAgc2VsZi5vZmYoZXZlbnQsIG9uKTtcclxuICAgICAgICAgICAgZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZuLl9vZmYgPSBvbjtcclxuICAgICAgICB0aGlzLm9uKGV2ZW50LCBvbik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBhZGRMaXN0ZW5lcjogZnVuY3Rpb24oZXZlbnQsIGZuKSB7XHJcbiAgICBcdHRoaXMub24oZXZlbnQsIGZuKTtcclxuICAgIH0sXHJcblxyXG4gICAgcmVtb3ZlTGlzdGVuZXI6IGZ1bmN0aW9uIChldmVudCwgZm4pIHtcclxuICAgICAgICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XHJcblxyXG4gICAgICAgIC8vIGFsbFxyXG4gICAgICAgIGlmICgwID09IGFyZ3VtZW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5fY2FsbGJhY2tzID0ge307XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gc3BlY2lmaWMgZXZlbnRcclxuICAgICAgICB2YXIgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzW2V2ZW50XTtcclxuICAgICAgICBpZiAoIWNhbGxiYWNrcykgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgICAgIC8vIHJlbW92ZSBhbGwgaGFuZGxlcnNcclxuICAgICAgICBpZiAoMSA9PSBhcmd1bWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9jYWxsYmFja3NbZXZlbnRdO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHJlbW92ZSBzcGVjaWZpYyBoYW5kbGVyXHJcbiAgICAgICAgdmFyIGkgPSB0aGlzLl9pbmRleE9mKGNhbGxiYWNrcywgZm4uX29mZiB8fCBmbik7XHJcbiAgICAgICAgaWYgKH5pKSBjYWxsYmFja3Muc3BsaWNlKGksIDEpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuICAgIFxyXG4gICAgcmVtb3ZlTGlzdGVuZXJzOiBmdW5jdGlvbigpIHtcclxuICAgIFx0dGhpcy5fY2FsbGJhY2sgPSB7fTtcclxuICAgIH0sXHJcblxyXG4gICAgZW1pdDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xyXG4gICAgICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXHJcbiAgICAgICAgdmFyIGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrc1tldmVudF07XHJcblxyXG4gICAgICAgIGlmIChjYWxsYmFja3MpIHtcclxuICAgICAgICAgICAgY2FsbGJhY2tzID0gY2FsbGJhY2tzLnNsaWNlKDApO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gY2FsbGJhY2tzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFja3NbaV0uYXBwbHkodGhpcywgYXJncyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBsaXN0ZW5lcnM6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY2FsbGJhY2tzW2V2ZW50XSB8fCBbXTtcclxuICAgIH0sXHJcblxyXG4gICAgaGFzTGlzdGVuZXJzOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICByZXR1cm4gISF0aGlzLmxpc3RlbmVycyhldmVudCkubGVuZ3RoO1xyXG4gICAgfSxcclxuXHJcbiAgICBfaW5kZXhPZjogZnVuY3Rpb24gKGFyciwgb2JqKSB7XHJcbiAgICAgICAgaWYgKGFyci5pbmRleE9mKSByZXR1cm4gYXJyLmluZGV4T2Yob2JqKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICBpZiAoYXJyW2ldID09PSBvYmopIHJldHVybiBpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICB9XHJcbn0pO1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBBcnRodXIgb24gMjAxNS8xLzguXHJcbiAqL1xyXG52YXIgcmVzID0gcmVxdWlyZSgnLi4vLi4vcmVzb3VyY2UuanMnKS5yZXM7XHJcbnZhciBjb25zdGFudHMgPSByZXF1aXJlKCcuLi8uLi9hcHBDb25zdGFudHMuanMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY2MuTGF5ZXIuZXh0ZW5kKHtcclxuICAgIF90aXRsZTogbnVsbCxcclxuICAgIF9kZXNjOiBudWxsLFxyXG4gICAgX29uQ29uZmlybTogbnVsbCxcclxuXHJcbiAgICBjdG9yOiBmdW5jdGlvbiAodGl0bGUsIGRlc2MsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdGhpcy5fc3VwZXIoKTtcclxuXHJcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLl9yb290Tm9kZSA9IGNjcy5jc0xvYWRlci5jcmVhdGVOb2RlKHJlcy5Db25maXJtTm9kZSk7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICB2YXIgc2l6ZSA9IGNjLndpblNpemU7XHJcbiAgICAgICAgbm9kZS5hdHRyKHtcclxuICAgICAgICAgICAgeDogc2l6ZS53aWR0aC8yLFxyXG4gICAgICAgICAgICB5OiBzaXplLmhlaWdodC8yLFxyXG4gICAgICAgICAgICBhbmNob3JYOiAwLjUsXHJcbiAgICAgICAgICAgIGFuY2hvclk6IDAuNSxcclxuICAgICAgICAgICAgd2lkdGg6IDQ1MCxcclxuICAgICAgICAgICAgaGVpZ2h0OiAyNTBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5fdGl0bGUgPSBub2RlLmdldENoaWxkQnlOYW1lKCdwYW5lbF9iZycpLmdldENoaWxkQnlOYW1lKCd0eHRfdGl0bGUnKTtcclxuICAgICAgICB0aGlzLl9kZXNjID0gbm9kZS5nZXRDaGlsZEJ5TmFtZSgncGFuZWxfYmcnKS5nZXRDaGlsZEJ5TmFtZSgndHh0X2Rlc2MnKTtcclxuICAgICAgICB0aGlzLl9idG5fY2FuY2VsID0gbm9kZS5nZXRDaGlsZEJ5TmFtZSgncGFuZWxfYmcnKS5nZXRDaGlsZEJ5TmFtZSgnYnRuX2NhbmNlbCcpO1xyXG4gICAgICAgIHRoaXMuX2J0bl9vayA9IG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3BhbmVsX2JnJykuZ2V0Q2hpbGRCeU5hbWUoJ2J0bl9vaycpO1xyXG5cclxuICAgICAgICB0aGlzLl9idG5fY2FuY2VsLmFkZENsaWNrRXZlbnRMaXN0ZW5lcih0aGlzLmNsb3NlLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHRoaXMuX2J0bl9vay5hZGRDbGlja0V2ZW50TGlzdGVuZXIodGhpcy5vbk9rTGlzdGVuZXIuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgICAgIGlmICh0aXRsZSkge1xyXG4gICAgICAgICAgICB0aGlzLl90aXRsZS5zdHJpbmcgPSB0aXRsZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGRlc2MpIHtcclxuICAgICAgICAgICAgdGhpcy5fZGVzYy5zdHJpbmcgPSBkZXNjO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX29uQ29uZmlybSA9IGNhbGxiYWNrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0VGl0bGU6IGZ1bmN0aW9uKHRpdGxlKSB7XHJcbiAgICAgICAgdGhpcy5fdGl0bGUuc3RyaW5nID0gdGl0bGU7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldERlc2M6IGZ1bmN0aW9uKGRlc2MpIHtcclxuICAgICAgICB0aGlzLl9kZXNjLnN0cmluZyA9IGRlc2M7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldE9rQ2FsbGJhY2s6IGZ1bmN0aW9uKGZuKSB7XHJcbiAgICAgICAgdGhpcy5fb25Db25maXJtID0gZm47XHJcbiAgICB9LFxyXG5cclxuICAgIGNsb3NlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgIH0sXHJcblxyXG4gICAgb25Pa0xpc3RlbmVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAodGhpcy5fb25Db25maXJtKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX29uQ29uZmlybS5jYWxsKHRoaXMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pOyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFydGh1ciBvbiAyMDE0LzEyLzI5LlxyXG4gKi9cclxudmFyIF8gPSByZXF1aXJlKCd1bmRlcnNjb3JlJyk7XHJcblxyXG52YXIgTG92ZUl0ZW1Db250cm9sbGVyID0gbW9kdWxlLmV4cG9ydHMgPSAgY2NzLkNvbUNvbnRyb2xsZXIuZXh0ZW5kKHtcclxuICAgIGN0b3I6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuX3N1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5fbmFtZSA9IFwiTG92ZUl0ZW1Db250cm9sbGVyXCI7XHJcbiAgICAgICAgdGhpcy5fbHYgPSAxO1xyXG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uID0gbnVsbDtcclxuICAgIH0sXHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24ob3B0aW9ucykge1xyXG4gICAgICAgIGlmICghb3B0aW9ucyB8fCBfLmlzRW1wdHkob3B0aW9ucykpIHtcclxuICAgICAgICAgICAgb3B0aW9ucyA9IExvdmVJdGVtQ29udHJvbGxlci5ERUZBVUxUX09QVElPTlM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgb25FbnRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5nZXRPd25lcigpLnNldFBvc2l0aW9uKHRoaXMuX29wdGlvbnMucG9zaXRpb24pO1xyXG5cclxuICAgICAgICB2YXIgdHh0X3ZhbHVlID0gdGhpcy5fdHh0X3ZhbHVlID0gdGhpcy5nZXRPd25lcigpLmdldENoaWxkQnlOYW1lKCd0eHRfdmFsdWUnKTtcclxuICAgICAgICB0eHRfdmFsdWUuYXR0cih7YW5jaG9yWDogMCwgYW5jaG9yWTogMC41fSk7XHJcbiAgICAgICAgdHh0X3ZhbHVlLnNldFN0cmluZygnKycgKyB0aGlzLl9vcHRpb25zLnZhbHVlKTtcclxuXHJcbiAgICAgICAgdmFyIHR4dF9jb3VudCA9IHRoaXMuX3R4dF9jb3VudCA9IHRoaXMuZ2V0T3duZXIoKS5nZXRDaGlsZEJ5TmFtZSgndHh0X2NvdW50Jyk7XHJcbiAgICAgICAgdHh0X2NvdW50LmF0dHIoe2FuY2hvclg6IDAsIGFuY2hvclk6IDAuNX0pO1xyXG4gICAgICAgIHR4dF9jb3VudC5zZXRTdHJpbmcodGhpcy5fb3B0aW9ucy5jb3VudCArICcvJyArIHRoaXMuX29wdGlvbnMuY291bnROZWVkICsgJ+asoScpO1xyXG5cclxuICAgICAgICB2YXIgdHh0X2x2ID0gdGhpcy5fdHh0X2x2ID0gdGhpcy5nZXRPd25lcigpLmdldENoaWxkQnlOYW1lKCd0eHRfbHYnKTtcclxuICAgICAgICB0eHRfbHYuYXR0cih7YW5jaG9yWDogMC41LCBhbmNob3JZOiAwLjV9KTtcclxuICAgICAgICB0eHRfbHYuc2V0U3RyaW5nKHRoaXMuX29wdGlvbnMubHYgKyAn57qnJyk7XHJcblxyXG4gICAgICAgIHZhciBidG5fbG92ZSA9IHRoaXMuX2J0bl9sb3ZlID0gdGhpcy5nZXRPd25lcigpLmdldENoaWxkQnlOYW1lKCdidG5fbG92ZScpO1xyXG4gICAgICAgIGJ0bl9sb3ZlLnNldFRpdGxlVGV4dCgn54yu5ZC7Jyk7XHJcbiAgICAgICAgYnRuX2xvdmUuYWRkQ2xpY2tFdmVudExpc3RlbmVyKHRoaXMubG92ZUxpc3RlbmVyLmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICB2YXIgZGVzY19iZyA9IHRoaXMuZ2V0T3duZXIoKS5nZXRDaGlsZEJ5TmFtZSgnZGVzY19iZycpO1xyXG4gICAgICAgIGRlc2NfYmcuYXR0cih7YW5jaG9yWDogMC41LCBhbmNob3JZOiAwfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGxvdmVMaXN0ZW5lcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5nZXRPd25lcigpLnBhcmVudC5wYXJlbnQub25Mb3ZlTGlzdGVuZXIoKTtcclxuICAgIH1cclxufSk7XHJcblxyXG5Mb3ZlSXRlbUNvbnRyb2xsZXIuY3JlYXRlID0gZnVuY3Rpb24ob3B0aW9ucykge1xyXG4gICAgdmFyIGNvbiA9IG5ldyBMb3ZlSXRlbUNvbnRyb2xsZXIoKTtcclxuICAgIGNvbi5pbml0KG9wdGlvbnMpO1xyXG4gICAgcmV0dXJuIGNvbjtcclxufVxyXG5cclxuTG92ZUl0ZW1Db250cm9sbGVyLkRFRkFVTFRfT1BUSU9OUyA9IHtcclxuICAgIGx2OiAxLFxyXG4gICAgdmFsdWU6IDEsXHJcbiAgICBjb3VudDogMTAsXHJcbiAgICBjb3VudE5lZWQ6IDk5LFxyXG4gICAgcG9zaXRpb246IGNjLnAoMCwgMClcclxufTsiLCIvKipcclxuICogQ3JlYXRlZCBieSBBcnRodXIgb24gMjAxNC8xMi8yOS5cclxuICovXHJcblxyXG52YXIgVHJhaW5JdGVtQ29udHJvbGxlciA9IG1vZHVsZS5leHBvcnRzID0gIGNjcy5Db21Db250cm9sbGVyLmV4dGVuZCh7XHJcbiAgICBjdG9yOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLl9zdXBlcigpO1xyXG4gICAgICAgIHRoaXMuX25hbWUgPSAnVHJhaW5JdGVtQ29udHJvbGxlcic7XHJcbiAgICAgICAgdGhpcy5ERUZBVUxUX0NPVU5UID0gMTAwO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbih0YXNrLCBwb3MpIHtcclxuICAgICAgICB0aGlzLl90YXNrID0gdGFzaztcclxuICAgICAgICB0aGlzLl9wb3NpdGlvbiA9IHBvcztcclxuICAgIH0sXHJcblxyXG4gICAgb25FbnRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3Bvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0T3duZXIoKS5zZXRQb3NpdGlvbih0aGlzLl9wb3NpdGlvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgYnRuX3N0YXJ0ID0gdGhpcy5fYnRuX3N0YXJ0ID0gdGhpcy5nZXRPd25lcigpLmdldENoaWxkQnlOYW1lKCdidG5fc3RhcnRfdGFzaycpO1xyXG4gICAgICAgIGJ0bl9zdGFydC5zZXRUaXRsZUZvbnRTaXplKDIwKTtcclxuICAgICAgICBidG5fc3RhcnQuYWRkQ2xpY2tFdmVudExpc3RlbmVyKHRoaXMuc3RhcnRMaXN0ZW5lci5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgdmFyIGJ0bl9hZGRfY291bnQgPSB0aGlzLl9idG5fYWRkX2NvdW50ID0gdGhpcy5nZXRPd25lcigpLmdldENoaWxkQnlOYW1lKCdidG5fY291bnRfYWRkJyk7XHJcbiAgICAgICAgYnRuX2FkZF9jb3VudC5hZGRDbGlja0V2ZW50TGlzdGVuZXIodGhpcy5hZGRDb3VuZExpc3RlbmVyLmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICB0aGlzLl9jb3VudCA9IHRoaXMuZ2V0T3duZXIoKS5nZXRDaGlsZEJ5TmFtZSgnY291bnRfdmFsdWUnKTtcclxuICAgICAgICB0aGlzLl9jb3VudC5zZXRTdHJpbmcodGhpcy5ERUZBVUxUX0NPVU5UKTtcclxuICAgICAgICB0aGlzLl9jb3VudC5hdHRyKHthbmNob3JYOiAwLCBhbmNob3JZOiAwLjV9KTtcclxuXHJcbiAgICAgICAgdGhpcy5fdGFza19uYW1lID0gdGhpcy5nZXRPd25lcigpLmdldENoaWxkQnlOYW1lKCd0YXNrX25hbWUnKTtcclxuICAgICAgICB0aGlzLl90YXNrX25hbWUuYXR0cih7YW5jaG9yWDogMCwgYW5jaG9yWTogMC41fSk7XHJcbiAgICAgICAgdGhpcy5fdGFza19uYW1lLnNldFN0cmluZyh0aGlzLl90YXNrLmdldCgnbmFtZScpICsgJzog5q+P5qyhKycgKyB0aGlzLl90YXNrLmdldCgnb2J0YWluUGVyQ291bnQnKSk7XHJcblxyXG4gICAgICAgIHZhciB0eHRfdGFza19kZXNjID0gdGhpcy5fdHh0X3Rhc2tfZGVzYyA9IHRoaXMuZ2V0T3duZXIoKS5nZXRDaGlsZEJ5TmFtZSgndHh0X3Rhc2tfZGVzYycpO1xyXG4gICAgICAgIHR4dF90YXNrX2Rlc2MuYXR0cih7YW5jaG9yWDogMCwgYW5jaG9yWTogMC41fSk7XHJcbiAgICAgICAgdGhpcy5zZXRUYXNrRGVzYygpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydExpc3RlbmVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLl9idG5fc3RhcnQuc2V0VGl0bGVUZXh0KCfov5vooYzkuK0uLi4nKTtcclxuICAgICAgICB0aGlzLl90YXNrLnN0YXJ0KHRoaXMuZ2V0Q291bnQoKSk7XHJcbiAgICAgICAgdGhpcy5zZXRUYXNrRGVzYygpO1xyXG4gICAgICAgIC8vdGhpcy5nZXRPd25lcigpLnBhcmVudC5wYXJlbnQub25TdGFydFRhc2sodGhpcy5fdGFzayk7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldFRhc2tCdXR0b25UaXRsZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3Rhc2suaXNTdGFydGVkKCkgJiYgIXRoaXMuX3Rhc2suaXNGaW5pc2hlZCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2J0bl9zdGFydC5zZXRUaXRsZVRleHQoJ+i/m+ihjOS4rS4uLicpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2J0bl9zdGFydC5zZXRUaXRsZVRleHQoJ+W8gOWni+S7u+WKoScpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc2V0VGFza0Rlc2M6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl90YXNrLmlzU3RhcnRlZCgpICYmICF0aGlzLl90YXNrLmlzRmluaXNoZWQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLl90eHRfdGFza19kZXNjLnNldFN0cmluZyhjYy5mb3JtYXRTdHIoXHJcbiAgICAgICAgICAgICAgICAn5Lu75Yqh6L+b6KGM5Lit77yM5bCG5ZyoJXPkuYvlkI7lrozmiJDvvIHpooTorqHlpZblirE6KyVzJyxcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Rhc2sudGltZUxlZnRTdHIoKSxcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Rhc2sudG90YWxPYnRhaW4oKVxyXG4gICAgICAgICAgICApKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl90eHRfdGFza19kZXNjLnNldFN0cmluZygn5omn6KGM5Lu75Yqh5Y+v5Lul5aKe5Yqg55u45bqU55qE5bGe5oCnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0VGFza0J1dHRvblRpdGxlKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHRhc2tGaW5pc2hlZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5zZXRUYXNrRGVzYygpO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXRDb3VudDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KHRoaXMuX2NvdW50LmdldFN0cmluZygpKTtcclxuICAgIH0sXHJcblxyXG4gICAgYWRkQ291bmRMaXN0ZW5lcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5fY291bnQuc2V0U3RyaW5nKHBhcnNlSW50KHRoaXMuX2NvdW50LmdldFN0cmluZygpKSArIDEpO1xyXG4gICAgfSxcclxuXHJcbiAgICByZWR1Y2VDb3VudExpc3RlbmVyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB9XHJcbn0pO1xyXG5cclxuVHJhaW5JdGVtQ29udHJvbGxlci5jcmVhdGUgPSBmdW5jdGlvbihuYW1lLCBwb3MpIHtcclxuICAgIHZhciBjb24gPSBuZXcgVHJhaW5JdGVtQ29udHJvbGxlcigpO1xyXG4gICAgY29uLmluaXQobmFtZSwgcG9zKTtcclxuICAgIHJldHVybiBjb247XHJcbn1cclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgQXJ0aHVyIG9uIDIwMTUvMS8xMC5cclxuICovXHJcbnZhciByZXMgPSByZXF1aXJlKCcuLi8uLi9yZXNvdXJjZS5qcycpLnJlcztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY2MuTGF5ZXIuZXh0ZW5kKHtcclxuICAgIGN0b3I6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuX3N1cGVyKCk7XHJcbiAgICAgICAgdmFyIHJvb3ROb2RlID0gdGhpcy5fcm9vdE5vZGUgPSBjY3MuY3NMb2FkZXIuY3JlYXRlTm9kZShyZXMuRmlnaHROb2RlKTtcclxuICAgICAgICB0aGlzLmFkZENoaWxkKHJvb3ROb2RlKTtcclxuXHJcbiAgICAgICAgdmFyIHBhbmVsID0gcm9vdE5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3BhbmVsJyk7XHJcblxyXG4gICAgICAgIHZhciBidG5fYmFjayA9IHBhbmVsLmdldENoaWxkQnlOYW1lKCdidG5fYmFjaycpO1xyXG4gICAgICAgIGJ0bl9iYWNrLmFkZENsaWNrRXZlbnRMaXN0ZW5lcih0aGlzLm9uQmFja0xpc3RlbmVyLmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICB0aGlzLl9zdl9jaXR5X2xpc3QgPSBwYW5lbC5nZXRDaGlsZEJ5TmFtZSgnc3ZfY2l0eV9saXN0Jyk7XHJcbiAgICAgICAgdGhpcy5fc3ZfY2l0eV9saXN0LmF0dHIoe2FuY2hvclg6IDAsIGFuY2hvclk6IDAuNX0pO1xyXG5cclxuICAgICAgICB0aGlzLl9wYW5lbF9jb25zb2xlID0gcGFuZWwuZ2V0Q2hpbGRCeU5hbWUoJ3BhbmVsX2NvbnNvbGUnKTtcclxuICAgICAgICB0aGlzLl90eHRfcHJvdmluY2UgPSBwYW5lbC5nZXRDaGlsZEJ5TmFtZSgndHh0X3Byb3ZpbmNlJyk7XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbihpdGVtcykge1xyXG4gICAgICAgIHZhciBkYXRhID0gc3RhdGVEYXRhO1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZVByb3ZpbmNlKGRhdGEucHJvdmluY2UpO1xyXG5cclxuICAgICAgICB2YXIgY2l0eXMgPSBkYXRhLmNpdHlzO1xyXG4gICAgICAgIHZhciBjaXR5LCBpLFxyXG4gICAgICAgICAgICBtZW51ID0gbmV3IGNjLk1lbnUoKTtcclxuICAgICAgICBtZW51LnggPSAwO1xyXG4gICAgICAgIG1lbnUueSA9IDA7XHJcbiAgICAgICAgdmFyIGhlaWdodCA9IHRoaXMuX3N2X2NpdHlfbGlzdC5oZWlnaHQ7XHJcblxyXG4gICAgICAgIGZvcihpID0gMDsgaSA8IGNpdHlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNpdHkgPSBjaXR5c1tpXTtcclxuICAgICAgICAgICAgbWVudS5hZGRDaGlsZCh0aGlzLl9jcmVhdGVJdGVtKGNpdHkubmFtZSwgaSwgaGVpZ2h0LzIpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc3ZfY2l0eV9saXN0LmFkZENoaWxkKG1lbnUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfY3JlYXRlSXRlbTogZnVuY3Rpb24obmFtZSwgaSwgeSkge1xyXG4gICAgICAgIHZhciBtZW51SXRlbSA9IG5ldyBjYy5NZW51SXRlbUltYWdlKFxyXG4gICAgICAgICAgICByZXMuYnRuMV9qcGcsXHJcbiAgICAgICAgICAgIHJlcy5idG4zX3BuZyxcclxuICAgICAgICAgICAgcmVzLmJ0bjNfcG5nLFxyXG4gICAgICAgICAgICB0aGlzLl9vbkNsaWNrQ2l0eUxpc3RlbmVyLmJpbmQodGhpcywgbmFtZSksXHJcbiAgICAgICAgICAgIHRoaXNcclxuICAgICAgICApO1xyXG4gICAgICAgIG1lbnVJdGVtLmF0dHIoe3g6IDIwICsgaSAqIChtZW51SXRlbS53aWR0aCsyMCksIHk6IHksIGFuY2hvclg6IDAsIGFuY2hvclk6IDAuNX0pO1xyXG4gICAgICAgIGlmIChpID09IDApXHJcbiAgICAgICAgICAgIG1lbnVJdGVtLnNldEVuYWJsZWQoZmFsc2UpO1xyXG5cclxuICAgICAgICB2YXIgbGFiZWwgPSBuZXcgY2MuTGFiZWxUVEYobmFtZSk7XHJcbiAgICAgICAgbGFiZWwuZm9udFNpemUgPSAyODtcclxuICAgICAgICBsYWJlbC5mb250Q29sb3IgPSBjYy5jb2xvcigyNywgMTUwLCAyKTtcclxuICAgICAgICBsYWJlbC5hdHRyKHt4OiBtZW51SXRlbS53aWR0aC8yLCB5OiBtZW51SXRlbS5oZWlnaHQvMiwgYW5jaG9yWDogMC41LCBhbmNob3JZOiAwLjV9KTtcclxuICAgICAgICBtZW51SXRlbS5hZGRDaGlsZChsYWJlbCk7XHJcbiAgICAgICAgdGhpcy5fc3ZfY2l0eV9saXN0LmlubmVyV2lkdGggPSAobWVudUl0ZW0ud2lkdGggKyAyMCkgKiAoaSsxKTtcclxuICAgICAgICBjYy5sb2coIHRoaXMuX3N2X2NpdHlfbGlzdC5pbm5lcldpZHRoKTtcclxuICAgICAgICByZXR1cm4gbWVudUl0ZW07XHJcbiAgICB9LFxyXG5cclxuICAgIF9vbkNsaWNrQ2l0eUxpc3RlbmVyOiBmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgY2MubG9nKCdjbGljayBjaXR5OiAnLCBuYW1lKTtcclxuICAgIH0sXHJcblxyXG4gICAgX3VwZGF0ZVByb3ZpbmNlOiBmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5fdHh0X3Byb3ZpbmNlLnN0cmluZyA9IG5hbWU7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uQmFja0xpc3RlbmVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAodGhpcy5vbkJhY2spIHtcclxuICAgICAgICAgICAgdGhpcy5vbkJhY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxudmFyIHN0YXRlRGF0YSA9IHtcclxuICAgIGlkOiAxLFxyXG4gICAgcHJvdmluY2U6ICflj7jlt54nLFxyXG4gICAgY2l0eXM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkOiAxLFxyXG4gICAgICAgICAgICBuYW1lOiAn5rKz5LicJyxcclxuICAgICAgICAgICAgaHA6IDUsXHJcbiAgICAgICAgICAgIGF0azogNTAsXHJcbiAgICAgICAgICAgIGRlZmVuY2U6IDEwLFxyXG4gICAgICAgICAgICB1bmRlZmVuY2U6IDEwLFxyXG4gICAgICAgICAgICBjcml0OiAxMCxcclxuICAgICAgICAgICAgdW5jcml0OiAxMCxcclxuICAgICAgICAgICAgZG9kZ2U6IDEwLFxyXG4gICAgICAgICAgICBoaXQ6IDEwXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkOiAxLFxyXG4gICAgICAgICAgICBuYW1lOiAn5bmz6ZizJyxcclxuICAgICAgICAgICAgaHA6IDUsXHJcbiAgICAgICAgICAgIGF0azogNTAsXHJcbiAgICAgICAgICAgIGRlZmVuY2U6IDEwLFxyXG4gICAgICAgICAgICB1bmRlZmVuY2U6IDEwLFxyXG4gICAgICAgICAgICBjcml0OiAxMCxcclxuICAgICAgICAgICAgdW5jcml0OiAxMCxcclxuICAgICAgICAgICAgZG9kZ2U6IDEwLFxyXG4gICAgICAgICAgICBoaXQ6IDEwXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkOiAxLFxyXG4gICAgICAgICAgICBuYW1lOiAn5rKz5YaFJyxcclxuICAgICAgICAgICAgaHA6IDUsXHJcbiAgICAgICAgICAgIGF0azogNTAsXHJcbiAgICAgICAgICAgIGRlZmVuY2U6IDEwLFxyXG4gICAgICAgICAgICB1bmRlZmVuY2U6IDEwLFxyXG4gICAgICAgICAgICBjcml0OiAxMCxcclxuICAgICAgICAgICAgdW5jcml0OiAxMCxcclxuICAgICAgICAgICAgZG9kZ2U6IDEwLFxyXG4gICAgICAgICAgICBoaXQ6IDEwXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkOiAxLFxyXG4gICAgICAgICAgICBuYW1lOiAn5byY5YacJyxcclxuICAgICAgICAgICAgaHA6IDUsXHJcbiAgICAgICAgICAgIGF0azogNTAsXHJcbiAgICAgICAgICAgIGRlZmVuY2U6IDEwLFxyXG4gICAgICAgICAgICB1bmRlZmVuY2U6IDEwLFxyXG4gICAgICAgICAgICBjcml0OiAxMCxcclxuICAgICAgICAgICAgdW5jcml0OiAxMCxcclxuICAgICAgICAgICAgZG9kZ2U6IDEwLFxyXG4gICAgICAgICAgICBoaXQ6IDEwXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkOiAxLFxyXG4gICAgICAgICAgICBuYW1lOiAn5rKz5Y2XJyxcclxuICAgICAgICAgICAgaHA6IDUsXHJcbiAgICAgICAgICAgIGF0azogNTAsXHJcbiAgICAgICAgICAgIGRlZmVuY2U6IDEwLFxyXG4gICAgICAgICAgICB1bmRlZmVuY2U6IDEwLFxyXG4gICAgICAgICAgICBjcml0OiAxMCxcclxuICAgICAgICAgICAgdW5jcml0OiAxMCxcclxuICAgICAgICAgICAgZG9kZ2U6IDEwLFxyXG4gICAgICAgICAgICBoaXQ6IDEwXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkOiAxLFxyXG4gICAgICAgICAgICBuYW1lOiAn5bC5562JJyxcclxuICAgICAgICAgICAgaHA6IDUsXHJcbiAgICAgICAgICAgIGF0azogNTAsXHJcbiAgICAgICAgICAgIGRlZmVuY2U6IDEwLFxyXG4gICAgICAgICAgICB1bmRlZmVuY2U6IDEwLFxyXG4gICAgICAgICAgICBjcml0OiAxMCxcclxuICAgICAgICAgICAgdW5jcml0OiAxMCxcclxuICAgICAgICAgICAgZG9kZ2U6IDEwLFxyXG4gICAgICAgICAgICBoaXQ6IDEwXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkOiAxLFxyXG4gICAgICAgICAgICBuYW1lOiAn5Zub6YOhJyxcclxuICAgICAgICAgICAgaHA6IDUsXHJcbiAgICAgICAgICAgIGF0azogNTAsXHJcbiAgICAgICAgICAgIGRlZmVuY2U6IDEwLFxyXG4gICAgICAgICAgICB1bmRlZmVuY2U6IDEwLFxyXG4gICAgICAgICAgICBjcml0OiAxMCxcclxuICAgICAgICAgICAgdW5jcml0OiAxMCxcclxuICAgICAgICAgICAgZG9kZ2U6IDEwLFxyXG4gICAgICAgICAgICBoaXQ6IDEwXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkOiAxLFxyXG4gICAgICAgICAgICBuYW1lOiAn5LiA5bC5JyxcclxuICAgICAgICAgICAgaHA6IDUsXHJcbiAgICAgICAgICAgIGF0azogNTAsXHJcbiAgICAgICAgICAgIGRlZmVuY2U6IDEwLFxyXG4gICAgICAgICAgICB1bmRlZmVuY2U6IDEwLFxyXG4gICAgICAgICAgICBjcml0OiAxMCxcclxuICAgICAgICAgICAgdW5jcml0OiAxMCxcclxuICAgICAgICAgICAgZG9kZ2U6IDEwLFxyXG4gICAgICAgICAgICBoaXQ6IDEwXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkOiAxLFxyXG4gICAgICAgICAgICBuYW1lOiAn5Zub5bC5JyxcclxuICAgICAgICAgICAgaHA6IDUsXHJcbiAgICAgICAgICAgIGF0azogNTAsXHJcbiAgICAgICAgICAgIGRlZmVuY2U6IDEwLFxyXG4gICAgICAgICAgICB1bmRlZmVuY2U6IDEwLFxyXG4gICAgICAgICAgICBjcml0OiAxMCxcclxuICAgICAgICAgICAgdW5jcml0OiAxMCxcclxuICAgICAgICAgICAgZG9kZ2U6IDEwLFxyXG4gICAgICAgICAgICBoaXQ6IDEwXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlkOiAxLFxyXG4gICAgICAgICAgICBuYW1lOiAn5LiK6Z+zJyxcclxuICAgICAgICAgICAgaHA6IDUsXHJcbiAgICAgICAgICAgIGF0azogNTAsXHJcbiAgICAgICAgICAgIGRlZmVuY2U6IDEwLFxyXG4gICAgICAgICAgICB1bmRlZmVuY2U6IDEwLFxyXG4gICAgICAgICAgICBjcml0OiAxMCxcclxuICAgICAgICAgICAgdW5jcml0OiAxMCxcclxuICAgICAgICAgICAgZG9kZ2U6IDEwLFxyXG4gICAgICAgICAgICBoaXQ6IDEwXHJcbiAgICAgICAgfVxyXG4gICAgXVxyXG5cclxufSIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFydGh1ciBvbiAyMDE0LzEyLzIwLlxyXG4gKi9cclxudmFyIHJlcyA9IHJlcXVpcmUoJy4uLy4uL3Jlc291cmNlLmpzJykucmVzO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjYy5MYXllci5leHRlbmQoe1xyXG4gICAgX3Jvb3ROb2RlOiBudWxsLFxyXG5cclxuICAgIGN0b3I6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuX3N1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5fcm9vdE5vZGUgPSBjY3MuY3NMb2FkZXIuY3JlYXRlTm9kZShyZXMuTWFpbk5vZGUpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5fcm9vdE5vZGUpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbihwbGF5ZXIpIHtcclxuICAgICAgICB0aGlzLl9wbGF5ZXIgPSBwbGF5ZXI7XHJcbiAgICAgICAgdGhpcy51cGRhdGUocGxheWVyKTtcclxuXHJcbiAgICAgICAgdmFyIHJvb3ROb2RlID0gdGhpcy5fcm9vdE5vZGU7XHJcbiAgICAgICAgdmFyIGJ0bl90cmFpbiA9IHJvb3ROb2RlLmdldENoaWxkQnlOYW1lKCdtYWluX3BhbmVsJykuZ2V0Q2hpbGRCeU5hbWUoJ2J0bl90cmFpbicpO1xyXG4gICAgICAgIGJ0bl90cmFpbi5hZGRDbGlja0V2ZW50TGlzdGVuZXIodGhpcy5idXR0b25UcmFpbkxpc3RlbmVyLmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICB2YXIgYnRuX2xvdmUgPSByb290Tm9kZS5nZXRDaGlsZEJ5TmFtZSgnbWFpbl9wYW5lbCcpLmdldENoaWxkQnlOYW1lKCdidG5fbG92ZScpO1xyXG4gICAgICAgIGJ0bl9sb3ZlLmFkZENsaWNrRXZlbnRMaXN0ZW5lcih0aGlzLmJ1dHRvbkxvdmVMaXN0ZW5lci5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgdmFyIGJ0bl9maWdodCA9IHJvb3ROb2RlLmdldENoaWxkQnlOYW1lKCdtYWluX3BhbmVsJykuZ2V0Q2hpbGRCeU5hbWUoJ2J0bl9maWdodCcpO1xyXG4gICAgICAgIGJ0bl9maWdodC5hZGRDbGlja0V2ZW50TGlzdGVuZXIodGhpcy5idXR0b25GaWdodExpc3RlbmVyLmJpbmQodGhpcykpO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uKHBsYXllcikge1xyXG4gICAgICAgIHZhciBub2RlID0gdGhpcy5fcm9vdE5vZGU7XHJcbiAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZSgndHh0X2dvbGQnKS5zZXRTdHJpbmcocGxheWVyLmdldCgnZ29sZCcpKTtcclxuXHJcbiAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZSgnbWFpbl9wYW5lbCcpLmdldENoaWxkQnlOYW1lKCd0eHRfaHAnKS5zZXRTdHJpbmcocGxheWVyLmdldCgnaHAnKSk7XHJcbiAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZSgnbWFpbl9wYW5lbCcpLmdldENoaWxkQnlOYW1lKCd0eHRfYXRrJykuc2V0U3RyaW5nKHBsYXllci5nZXQoJ2F0aycpKTtcclxuICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCdtYWluX3BhbmVsJykuZ2V0Q2hpbGRCeU5hbWUoJ3R4dF9kZWZlbmNlJykuc2V0U3RyaW5nKHBsYXllci5nZXQoJ2RlZmVuY2UnKSk7XHJcbiAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZSgnbWFpbl9wYW5lbCcpLmdldENoaWxkQnlOYW1lKCd0eHRfdW5kZWZlbmNlJykuc2V0U3RyaW5nKHBsYXllci5nZXQoJ3VuZGVmZW5jZScpKTtcclxuICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCdtYWluX3BhbmVsJykuZ2V0Q2hpbGRCeU5hbWUoJ3R4dF9jcml0Jykuc2V0U3RyaW5nKHBsYXllci5nZXQoJ2NyaXQnKSk7XHJcbiAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZSgnbWFpbl9wYW5lbCcpLmdldENoaWxkQnlOYW1lKCd0eHRfdW5jcml0Jykuc2V0U3RyaW5nKHBsYXllci5nZXQoJ3VuY3JpdCcpKTtcclxuICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCdtYWluX3BhbmVsJykuZ2V0Q2hpbGRCeU5hbWUoJ3R4dF9kb2dldCcpLnNldFN0cmluZyhwbGF5ZXIuZ2V0KCdkb2RnZScpKTtcclxuICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCdtYWluX3BhbmVsJykuZ2V0Q2hpbGRCeU5hbWUoJ3R4dF9oaXQnKS5zZXRTdHJpbmcocGxheWVyLmdldCgnaGl0JykpO1xyXG4gICAgfSxcclxuXHJcbiAgICBidXR0b25UcmFpbkxpc3RlbmVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAodGhpcy5vblRyYWluKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25UcmFpbigpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgYnV0dG9uTG92ZUxpc3RlbmVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAodGhpcy5vbkxvdmUpIHtcclxuICAgICAgICAgICAgdGhpcy5vbkxvdmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGJ1dHRvbkZpZ2h0TGlzdGVuZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICh0aGlzLm9uRmlnaHQpIHtcclxuICAgICAgICAgICAgdGhpcy5vbkZpZ2h0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvblRhc2tGaW5pc2hlZDogZnVuY3Rpb24ocGxheWVyKSB7XHJcbiAgICAgICAgdGhpcy5fcGxheWVyID0gcGxheWVyO1xyXG4gICAgICAgIHRoaXMudXBkYXRlKHBsYXllcik7XHJcbiAgICB9XHJcbn0pOyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFydGh1ciBvbiAyMDE1LzEvNi5cclxuICovXHJcbnZhciByZXMgPSByZXF1aXJlKCcuLi8uLi9yZXNvdXJjZS5qcycpLnJlcztcclxudmFyIGNvbnN0YW50cyA9IHJlcXVpcmUoJy4uLy4uL2FwcENvbnN0YW50cy5qcycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjYy5MYXllci5leHRlbmQoe1xyXG4gICAgX2NvdW50OiAxMDAsXHJcblxyXG4gICAgY3RvcjogZnVuY3Rpb24oZ29sZCwgZnJlZUNvdW50KSB7XHJcbiAgICAgICAgdGhpcy5fc3VwZXIoKTtcclxuICAgICAgICB0aGlzLl9nb2xkID0gZ29sZDtcclxuICAgICAgICB0aGlzLl9mcmVlQ291bnQgPSBmcmVlQ291bnQ7XHJcblxyXG4gICAgICAgIHZhciByb290Tm9kZSA9IHRoaXMuX3Jvb3ROb2RlID0gY2NzLmNzTG9hZGVyLmNyZWF0ZU5vZGUocmVzLkxvdmVDb25maXJtTm9kZSk7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZChyb290Tm9kZSk7XHJcblxyXG4gICAgICAgIHZhciB3c2l6ZSA9IGNjLndpblNpemU7XHJcbiAgICAgICAgcm9vdE5vZGUuYXR0cih7XHJcbiAgICAgICAgICAgIHg6IHdzaXplLndpZHRoLzIsXHJcbiAgICAgICAgICAgIHk6IHdzaXplLmhlaWdodC8yLFxyXG4gICAgICAgICAgICBhbmNob3JYOiAwLjUsXHJcbiAgICAgICAgICAgIGFuY2hvclk6IDAuNSxcclxuICAgICAgICAgICAgd2lkdGg6IDQ1MCxcclxuICAgICAgICAgICAgaGVpZ2h0OiAzNTBcclxuICAgICAgICB9KTtcclxuICAgICAgICB2YXIgcGFuZWwgPSByb290Tm9kZS5nZXRDaGlsZEJ5TmFtZSgncGFuZWwnKTtcclxuICAgICAgICB2YXIgYnRuX2FkZCA9IHBhbmVsLmdldENoaWxkQnlOYW1lKCdidG5fYWRkJyk7XHJcbiAgICAgICAgYnRuX2FkZC5hZGRDbGlja0V2ZW50TGlzdGVuZXIodGhpcy5vbkFkZExpc3RlbmVyLmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICB2YXIgYnRuX29rID0gcGFuZWwuZ2V0Q2hpbGRCeU5hbWUoJ2J0bl9vaycpO1xyXG4gICAgICAgIGJ0bl9vay5hZGRDbGlja0V2ZW50TGlzdGVuZXIodGhpcy5vbk9rTGlzdGVuZXIuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgICAgIHZhciBidG5fY2FuY2VsID0gcGFuZWwuZ2V0Q2hpbGRCeU5hbWUoJ2J0bl9jYW5jZWwnKTtcclxuICAgICAgICBidG5fY2FuY2VsLmFkZENsaWNrRXZlbnRMaXN0ZW5lcih0aGlzLm9uQ2FuY2VsTGlzdGVuZXIuYmluZCh0aGlzKSk7XHJcblxyXG5cclxuICAgICAgICB0aGlzLl90eHRfZGVzYyA9IHBhbmVsLmdldENoaWxkQnlOYW1lKCd0eHRfZGVzYycpO1xyXG4gICAgICAgIHRoaXMuX3R4dF9kZXNjX3N0ciA9IHRoaXMuX3R4dF9kZXNjLmdldFN0cmluZygpO1xyXG4gICAgICAgIHRoaXMuX3R4dF9jb3VudCA9IHBhbmVsLmdldENoaWxkQnlOYW1lKCd0eHRfY291bnQnKTtcclxuICAgICAgICB0aGlzLl90eHRfY291bnRfc3RyID0gdGhpcy5fdHh0X2NvdW50LmdldFN0cmluZygpO1xyXG5cclxuICAgICAgICB0aGlzLmluaXQoZ29sZCk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKGdvbGQpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUNvdW50KHRoaXMuX2NvdW50LCB0aGlzLl9jb3VudCAtIHRoaXMuX2ZyZWVDb3VudCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZUNvdW50OiBmdW5jdGlvbihjb3VudCwgZ29sZCkge1xyXG4gICAgICAgIHRoaXMuX3R4dF9jb3VudC5zZXRTdHJpbmcoY2MuZm9ybWF0U3RyKHRoaXMuX3R4dF9jb3VudF9zdHIsIGNvdW50KSk7XHJcbiAgICAgICAgdGhpcy5fdHh0X2Rlc2Muc2V0U3RyaW5nKGNjLmZvcm1hdFN0cih0aGlzLl90eHRfZGVzY19zdHIsIGNvdW50LCBnb2xkKSlcclxuICAgIH0sXHJcblxyXG4gICAgb25BZGRMaXN0ZW5lcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5fY291bnQgKz0gMTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUNvdW50KHRoaXMuX2NvdW50LCB0aGlzLl9jb3VudCAtIHRoaXMuX2ZyZWVDb3VudCk7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uT2tMaXN0ZW5lcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2dvbGQgPiAodGhpcy5fY291bnQgLSB0aGlzLl9mcmVlQ291bnQpKSB7XHJcbiAgICAgICAgICAgIGNjLmV2ZW50TWFuYWdlci5kaXNwYXRjaEN1c3RvbUV2ZW50KFxyXG4gICAgICAgICAgICAgICAgY29uc3RhbnRzLkNVU1RPTV9OT1RJQ0lDQVRJT04sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogY29uc3RhbnRzLkxPVkVfQUNUSU9OLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnQ6IHRoaXMuX2NvdW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnb2xkOiB0aGlzLl9jb3VudCAtIHRoaXMuX2ZyZWVDb3VudFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2MubG9nKCfpkrvnn7PkuI3otrPvvIzor7fliLDlhYXlgLznlYzpnaLlhYXlgLwnKTtcclxuICAgICAgICAgICAgY2MuZXZlbnRNYW5hZ2VyLmRpc3BhdGNoQ3VzdG9tRXZlbnQoXHJcbiAgICAgICAgICAgICAgICBjb25zdGFudHMuQ1VTVE9NX05PVElDSUNBVElPTixcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBjb25zdGFudHMuQ09ORklSTV9ESUFMT0csXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjOiAn5L2g55qE6ZK755+z5LiN6Laz5Lul5omn6KGM5q2k5qyh54yu5ZC7XFxu56Gu5a6a5Y675YWF5YC85ZCX77yfJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MuZXZlbnRNYW5hZ2VyLmRpc3BhdGNoQ3VzdG9tRXZlbnQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3RhbnRzLkNVU1RPTV9OT1RJQ0lDQVRJT04sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBjb25zdGFudHMuU0NFTkVfQUNUSU9OLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBjb25zdGFudHMuU0NFTkUuSE9NRVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uQ2FuY2VsTGlzdGVuZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgfVxyXG59KTsiLCIvKipcclxuICogQ3JlYXRlZCBieSBBcnRodXIgb24gMjAxNC8xMi8yOS5cclxuICovXHJcbnZhciByZXMgPSByZXF1aXJlKCcuLi8uLi9yZXNvdXJjZS5qcycpLnJlcztcclxudmFyIExvdmVJdGVtQ29udHJvbGxlciA9IHJlcXVpcmUoJy4vY29udHJvbGxlci9sb3ZlSXRlbScpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjYy5MYXllci5leHRlbmQoe1xyXG4gICAgY3RvcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5fc3VwZXIoKTtcclxuICAgICAgICB2YXIgcm9vdE5vZGUgPSB0aGlzLl9yb290Tm9kZSA9IGNjcy5jc0xvYWRlci5jcmVhdGVOb2RlKHJlcy5Mb3ZlTGF5ZXIpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQocm9vdE5vZGUpO1xyXG5cclxuICAgICAgICB2YXIgYnRuX2JhY2sgPSByb290Tm9kZS5nZXRDaGlsZEJ5TmFtZSgnYnRuX2JhY2snKTtcclxuICAgICAgICBidG5fYmFjay5hZGRDbGlja0V2ZW50TGlzdGVuZXIodGhpcy5vbkJhY2tMaXN0ZW5lci5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKGl0ZW1zKSB7XHJcbiAgICAgICAgdmFyIHAgPSB0aGlzLl9yb290Tm9kZS5nZXRDaGlsZEJ5TmFtZSgnZGVzY19iZycpLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgcC55ID0gcC55IC0gMTMzO1xyXG4gICAgICAgIHZhciBvcHRpb24sIGk7XHJcbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgb3B0aW9uID0gaXRlbXNbaV07XHJcbiAgICAgICAgICAgIG9wdGlvbi5wb3NpdGlvbiA9IGNjLnAoMCwgcC55IC0gODUqaSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgbG92ZUl0ZW0gPSBjY3MuY3NMb2FkZXIuY3JlYXRlTm9kZShyZXMuTG92ZUl0ZW0pO1xyXG4gICAgICAgICAgICBsb3ZlSXRlbS5hZGRDb21wb25lbnQoTG92ZUl0ZW1Db250cm9sbGVyLmNyZWF0ZShvcHRpb24pKTtcclxuICAgICAgICAgICAgdGhpcy5fcm9vdE5vZGUuYWRkQ2hpbGQobG92ZUl0ZW0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fdHh0X2Rlc2MgPSB0aGlzLl9yb290Tm9kZS5nZXRDaGlsZEJ5TmFtZSgndHh0X2Rlc2MnKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUx2KDEpO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGVMdjogZnVuY3Rpb24obHYpIHtcclxuICAgICAgICB0aGlzLl90eHRfZGVzYy5zZXRTdHJpbmcoJ+W9k+WJjeiZnuWnrOS5i+eIsScgKyBsdiArICfnuqcsIOavj+WkqeWJjTkw5qyh54yu5ZC75YWN6LS5Jyk7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uQmFja0xpc3RlbmVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoY2MuaXNGdW5jdGlvbih0aGlzLm9uQmFjaykpIHtcclxuICAgICAgICAgICAgdGhpcy5vbkJhY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG92ZUxpc3RlbmVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoY2MuaXNGdW5jdGlvbih0aGlzLnNob3dMb3ZlQ29uZmlybSkpe1xyXG4gICAgICAgICAgICB0aGlzLnNob3dMb3ZlQ29uZmlybSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG59KTsiLCIvKipcclxuICogQ3JlYXRlZCBieSBBcnRodXIgb24gMjAxNC8xMi8yMS5cclxuICovXHJcbnZhciByZXMgPSByZXF1aXJlKCcuLi8uLi9yZXNvdXJjZS5qcycpLnJlcztcclxudmFyIFRyYWluSXRlbUNvbnRyb2xsZXIgPSByZXF1aXJlKCcuL2NvbnRyb2xsZXIvdHJhaW5JdGVtJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGNjLkxheWVyLmV4dGVuZCh7XHJcbiAgICBjdG9yOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLl9zdXBlcigpO1xyXG4gICAgICAgIHZhciB0cmFpbk5vZGUgPSB0aGlzLl90cmFpbk5vZGUgPSBjY3MuY3NMb2FkZXIuY3JlYXRlTm9kZShyZXMuVHJhaW5Ob2RlKTtcclxuICAgICAgICB0aGlzLmFkZENoaWxkKHRyYWluTm9kZSk7XHJcblxyXG4gICAgICAgIHZhciBidG5fYmFjayA9IHRyYWluTm9kZS5nZXRDaGlsZEJ5TmFtZSgnUGFuZWxfMScpLmdldENoaWxkQnlOYW1lKCdidG5fYmFjaycpO1xyXG4gICAgICAgIGJ0bl9iYWNrLmFkZENsaWNrRXZlbnRMaXN0ZW5lcih0aGlzLm9uQmFja0xpc3RlbmVyLmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24odGFza0xpc3QpIHtcclxuICAgICAgICB2YXIgc2l6ZSA9IGNjLndpblNpemU7XHJcbiAgICAgICAgdmFyIGJhc2VZID0gc2l6ZS5oZWlnaHQqODQvMTAwO1xyXG4gICAgICAgIHZhciBpID0gMDtcclxuICAgICAgICBmb3IgKHZhciBpZCBpbiB0YXNrTGlzdCkge1xyXG4gICAgICAgICAgICB2YXIgdGFzayA9IHRhc2tMaXN0W2lkXTtcclxuICAgICAgICAgICAgdmFyIHkgPSBiYXNlWSAtIDEwMCooaSsxKTtcclxuICAgICAgICAgICAgdmFyIHRhc2tOb2RlID0gY2NzLmNzTG9hZGVyLmNyZWF0ZU5vZGUocmVzLlRhc2tOb2RlKTtcclxuICAgICAgICAgICAgdGFza05vZGUuYWRkQ29tcG9uZW50KFRyYWluSXRlbUNvbnRyb2xsZXIuY3JlYXRlKHRhc2ssIGNjLnAoMCwgeSkpKTtcclxuICAgICAgICAgICAgdGhpcy5fdHJhaW5Ob2RlLmFkZENoaWxkKHRhc2tOb2RlLCAxMCwgdGFzay5nZXQoJ2lkJykpO1xyXG4gICAgICAgICAgICBpID0gaSArIDE7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkJhY2tMaXN0ZW5lcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMub25CYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25CYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvblN0YXJ0VGFzazogZnVuY3Rpb24odGFzaykge1xyXG4gICAgICAgIGlmICh0aGlzLm9uVGFzaykge1xyXG4gICAgICAgICAgICB0aGlzLm9uVGFzayh0YXNrKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uVGFza0ZpbmlzaGVkOiBmdW5jdGlvbih0YXNrKSB7XHJcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLl90cmFpbk5vZGUuZ2V0Q2hpbGRCeVRhZyh0YXNrLmdldCgnaWQnKSk7XHJcbiAgICAgICAgdmFyIGN0cmwgPSBub2RlLmdldENvbXBvbmVudCgnVHJhaW5JdGVtQ29udHJvbGxlcicpO1xyXG4gICAgICAgIGlmIChjdHJsKSB7XHJcbiAgICAgICAgICAgIGN0cmwudGFza0ZpbmlzaGVkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTsiLCIvKipcclxuICogQ3JlYXRlZCBieSBBcnRodXIgb24gMjAxNC8xMi8yMS5cclxuICovXHJcblxyXG52YXIgcHVyZW12YyA9IHJlcXVpcmUoJ3B1cmVtdmMnKS5wdXJlbXZjO1xyXG52YXIgU2NlbmVNZWRpYXRvciA9IHJlcXVpcmUoJy4vc2NlbmVNZWRpYXRvci5qcycpO1xyXG52YXIgY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vLi4vYXBwQ29uc3RhbnRzLmpzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHB1cmVtdmMuZGVmaW5lKFxyXG4gICAgLy8gQ0xBU1MgSU5GT1xyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICd2aWV3Lm1lZGlhdG9yLkRpcmVjdG9yTWVkaWF0b3InLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5NZWRpYXRvcixcclxuICAgICAgICBjb25zdHJ1Y3RvcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHB1cmVtdmMuTWVkaWF0b3IuY2FsbCh0aGlzLCB0aGlzLmNvbnN0cnVjdG9yLk5BTUUpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgLyoqIEBvdmVycmlkZSAqL1xyXG4gICAgICAgIGxpc3ROb3RpZmljYXRpb25JbnRlcmVzdHM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgIGNvbnN0YW50cy5OT1RJRklDQVRJT04uU0NFTkVfQ0hBTkdFRFxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKiBAb3ZlcnJpZGUgKi9cclxuICAgICAgICBoYW5kbGVOb3RpZmljYXRpb246IGZ1bmN0aW9uIChub3RpZmljYXRpb24pIHtcclxuICAgICAgICAgICAgY2MubG9nKCdoYW5kbGVyIG5vdGlmaWNhdGlvbiBvbiBkaXJlY3RvciBtZWRpYXRvcicpXHJcbiAgICAgICAgICAgIHN3aXRjaCAobm90aWZpY2F0aW9uLmdldE5hbWUoKSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBjb25zdGFudHMuTk9USUZJQ0FUSU9OLlNDRU5FX0NIQU5HRUQ6XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jYy5sb2coJ1NDRU5FX0NIQU5HRUQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjZW5lTWVkaWF0b3IgPSB0aGlzLmZhY2FkZS5yZXRyaWV2ZU1lZGlhdG9yKFNjZW5lTWVkaWF0b3IuTkFNRSApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihzY2VuZU1lZGlhdG9yICYmIHNjZW5lTWVkaWF0b3IuZ2V0Vmlld0NvbXBvbmVudCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLnJ1blNjZW5lKHNjZW5lTWVkaWF0b3IuZ2V0Vmlld0NvbXBvbmVudCgpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqIEBvdmVycmlkZSAqL1xyXG4gICAgICAgIG9uUmVnaXN0ZXI6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqIEBvdmVycmlkZSAqL1xyXG4gICAgICAgIG9uUmVtb3ZlOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6ICdEaXJlY3Rvck1lZGlhdG9yJ1xyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBBcnRodXIgb24gMjAxNS8xLzEwLlxyXG4gKi9cclxudmFyIHB1cmVtdmMgPSByZXF1aXJlKCdwdXJlbXZjJykucHVyZW12YztcclxudmFyIGNvbnN0YW50cyA9IHJlcXVpcmUoJy4uLy4uL2FwcENvbnN0YW50cy5qcycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBwdXJlbXZjLmRlZmluZShcclxuICAgIHtcclxuICAgICAgICBuYW1lOiAnZmlnaHRlci52aWV3Lm1lZGlhdG9yLkZpZ2h0TWVkaWF0b3InLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5NZWRpYXRvclxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBpbnN0YW5jZSBtZW1iZXJzXHJcbiAgICB7XHJcbiAgICAgICAgLyoqIEBvdmVycmlkZSAqL1xyXG4gICAgICAgIGxpc3ROb3RpZmljYXRpb25JbnRlcmVzdHM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqIEBvdmVycmlkZSAqL1xyXG4gICAgICAgIGhhbmRsZU5vdGlmaWNhdGlvbjogZnVuY3Rpb24obm90ZSkge1xyXG4gICAgICAgICAgICBzd2l0Y2gobm90ZS5nZXROYW1lKCkpIHtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKiogQG92ZXJyaWRlICovXHJcbiAgICAgICAgb25SZWdpc3RlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKiBAb3ZlcnJpZGUgKi9cclxuICAgICAgICBvblJlbW92ZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB2YXIgRmlnaHRMYXllciA9IHJlcXVpcmUoJy4vLi4vY29tcG9uZW50L2ZpZ2h0TGF5ZXIuanMnKTtcclxuICAgICAgICAgICAgc2VsZi52aWV3Q29tcG9uZW50ID0gbmV3IEZpZ2h0TGF5ZXIoKTtcclxuICAgICAgICAgICAgc2VsZi52aWV3Q29tcG9uZW50LmluaXQoKTtcclxuXHJcbiAgICAgICAgICAgIHNlbGYudmlld0NvbXBvbmVudC5vbkJhY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2VuZE5vdGlmaWNhdGlvbihjb25zdGFudHMuU0NFTkVfQUNUSU9OLCB7bmFtZTogY29uc3RhbnRzLlNDRU5FLkhPTUV9KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBnZXRSZXNvdXJjZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHN0YXRpYyBtZW1iZXJzXHJcbiAgICB7XHJcbiAgICAgICAgTkFNRTogJ0ZpZ2h0TWVkaWF0b3InXHJcbiAgICB9XHJcbik7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgQXJ0aHVyIG9uIDIwMTQvMTIvMjAuXHJcbiAqL1xyXG52YXIgcHVyZW12YyA9IHJlcXVpcmUoJ3B1cmVtdmMnKS5wdXJlbXZjO1xyXG52YXIgY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vLi4vYXBwQ29uc3RhbnRzLmpzJyk7XHJcbnZhciBQbGF5ZXJQcm94eSA9IHJlcXVpcmUoJy4uLy4uL21vZGVsL3Byb3h5L3BsYXllclByb3h5LmpzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdmaWdodGVyLnZpZXcubWVkaWF0b3IuSG9tZU1lZGlhdG9yJyxcclxuICAgICAgICBwYXJlbnQ6IHB1cmVtdmMuTWVkaWF0b3JcclxuICAgIH0sXHJcblxyXG4gICAgLy8gaW5zdGFuY2UgbWVtYmVyc1xyXG4gICAge1xyXG4gICAgICAgIC8qKiBAb3ZlcnJpZGUgKi9cclxuICAgICAgICBsaXN0Tm90aWZpY2F0aW9uSW50ZXJlc3RzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtjb25zdGFudHMuUExBWUVSX0FDVElPTl07XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqIEBvdmVycmlkZSAqL1xyXG4gICAgICAgIGhhbmRsZU5vdGlmaWNhdGlvbjogZnVuY3Rpb24obm90ZSkge1xyXG4gICAgICAgICAgICBzd2l0Y2gobm90ZS5nZXROYW1lKCkpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgY29uc3RhbnRzLlBMQVlFUl9BQ1RJT046XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3Q29tcG9uZW50LnVwZGF0ZSh0aGlzLmdldFBsYXllcigpKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKiBAb3ZlcnJpZGUgKi9cclxuICAgICAgICBvblJlZ2lzdGVyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqIEBvdmVycmlkZSAqL1xyXG4gICAgICAgIG9uUmVtb3ZlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgSG9tZUxheWVyID0gcmVxdWlyZSgnLi8uLi9jb21wb25lbnQvaG9tZUxheWVyLmpzJyk7XHJcbiAgICAgICAgICAgIHNlbGYudmlld0NvbXBvbmVudCA9IG5ldyBIb21lTGF5ZXIoKTtcclxuICAgICAgICAgICAgc2VsZi52aWV3Q29tcG9uZW50LmluaXQodGhpcy5nZXRQbGF5ZXIoKSk7XHJcblxyXG4gICAgICAgICAgICBzZWxmLnZpZXdDb21wb25lbnQub25UcmFpbiA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNlbmROb3RpZmljYXRpb24oY29uc3RhbnRzLlNDRU5FX0FDVElPTiwge25hbWU6IGNvbnN0YW50cy5TQ0VORS5UUkFJTn0pO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgc2VsZi52aWV3Q29tcG9uZW50Lm9uTG92ZSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNlbmROb3RpZmljYXRpb24oY29uc3RhbnRzLlNDRU5FX0FDVElPTiwge25hbWU6IGNvbnN0YW50cy5TQ0VORS5MT1ZFfSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBzZWxmLnZpZXdDb21wb25lbnQub25GaWdodCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNlbmROb3RpZmljYXRpb24oY29uc3RhbnRzLlNDRU5FX0FDVElPTiwge25hbWU6IGNvbnN0YW50cy5TQ0VORS5GSUdIVH0pO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGdldFBsYXllcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXJQcm94eSA9IHRoaXMuZmFjYWRlLnJldHJpZXZlUHJveHkoUGxheWVyUHJveHkuTkFNRSk7XHJcbiAgICAgICAgICAgIHJldHVybiBwbGF5ZXJQcm94eS5nZXRQbGF5ZXIoKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBnZXRSZXNvdXJjZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gc3RhdGljIG1lbWJlcnNcclxuICAgIHtcclxuICAgICAgICBOQU1FOiAnSG9tZU1lZGlhdG9yJ1xyXG4gICAgfVxyXG4pIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgQXJ0aHVyIG9uIDIwMTQvMTIvMjkuXHJcbiAqL1xyXG52YXIgcHVyZW12YyA9IHJlcXVpcmUoJ3B1cmVtdmMnKS5wdXJlbXZjO1xyXG52YXIgY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vLi4vYXBwQ29uc3RhbnRzLmpzJyk7XHJcbnZhciBQbGF5ZXJQcm94eSA9IHJlcXVpcmUoJy4uLy4uL21vZGVsL3Byb3h5L3BsYXllclByb3h5LmpzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdmaWdodGVyLnZpZXcubWVkaWF0b3IuTG92ZU1lZGlhdG9yJyxcclxuICAgICAgICBwYXJlbnQ6IHB1cmVtdmMuTWVkaWF0b3JcclxuICAgIH0sXHJcblxyXG4gICAgLy8gaW5zdGFuY2UgbWVtYmVyc1xyXG4gICAge1xyXG4gICAgICAgIC8qKiBAb3ZlcnJpZGUgKi9cclxuICAgICAgICBsaXN0Tm90aWZpY2F0aW9uSW50ZXJlc3RzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtjb25zdGFudHMuTE9WRV9BQ1RJT05dO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKiBAb3ZlcnJpZGUgKi9cclxuICAgICAgICBoYW5kbGVOb3RpZmljYXRpb246IGZ1bmN0aW9uKG5vdGUpIHtcclxuICAgICAgICAgICAgc3dpdGNoIChub3RlLmdldE5hbWUoKSl7XHJcbiAgICAgICAgICAgICAgICBjYXNlIGNvbnN0YW50cy5MT1ZFX0FDVElPTjpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvdmVTdWNjZXNzKG5vdGUuZ2V0Qm9keSgpKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKiBAb3ZlcnJpZGUgKi9cclxuICAgICAgICBvblJlZ2lzdGVyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqIEBvdmVycmlkZSAqL1xyXG4gICAgICAgIG9uUmVtb3ZlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIExvdmVMYXllciA9IHJlcXVpcmUoJy4vLi4vY29tcG9uZW50L2xvdmVMYXllci5qcycpO1xyXG4gICAgICAgICAgICBzZWxmLnZpZXdDb21wb25lbnQgPSBuZXcgTG92ZUxheWVyKCk7XHJcblxyXG4gICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICBUT0RPOiBnZXQgbG92ZSBpbmZvXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBzZWxmLnZpZXdDb21wb25lbnQuaW5pdCh0aGlzLmdldExvdmVJdGVtcygpKTtcclxuXHJcbiAgICAgICAgICAgIHNlbGYudmlld0NvbXBvbmVudC5vbkJhY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2VuZE5vdGlmaWNhdGlvbihjb25zdGFudHMuU0NFTkVfQUNUSU9OLCB7bmFtZTogY29uc3RhbnRzLlNDRU5FLkhPTUV9KTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHNlbGYudmlld0NvbXBvbmVudC5zaG93TG92ZUNvbmZpcm0gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciBwbGF5ZXJQcm94eSA9IHNlbGYuZmFjYWRlLnJldHJpZXZlUHJveHkoUGxheWVyUHJveHkuTkFNRSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGxheWVyID0gcGxheWVyUHJveHkuZ2V0UGxheWVyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIExvdmVDb25maXJtTGF5ZXIgPSByZXF1aXJlKCcuLy4uL2NvbXBvbmVudC9sb3ZlQ29uZmlybUxheWVyLmpzJyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGF5ZXIgPSBuZXcgTG92ZUNvbmZpcm1MYXllcihwbGF5ZXIuZ2V0KCdnb2xkJyksIHBsYXllci5nZXQoJ2RhaWx5Q291bnQnKS5mcmVlTG92ZSk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNlbmROb3RpZmljYXRpb24oY29uc3RhbnRzLlNDRU5FX0FDVElPTl9BRERfQ0hJTEQsIGxheWVyKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHNlbGYudmlld0NvbXBvbmVudC5leGVjdXRlTG92ZSA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBsb3ZlU3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICBjYy5sb2coJ2Rhc2RmYXNkZnNhZmQtLS0tLS0tLScsIGRhdGEpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGdldFJlc291cmNlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ2V0TG92ZUl0ZW1zOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsdjogMSxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMSxcclxuICAgICAgICAgICAgICAgICAgICBjb3VudDogMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgY291bnROZWVkOiA5OVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsdjogMixcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMSxcclxuICAgICAgICAgICAgICAgICAgICBjb3VudDogMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgY291bnROZWVkOiA5OVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsdjogMyxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMSxcclxuICAgICAgICAgICAgICAgICAgICBjb3VudDogMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgY291bnROZWVkOiA5OVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsdjogNCxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMSxcclxuICAgICAgICAgICAgICAgICAgICBjb3VudDogMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgY291bnROZWVkOiA5OVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsdjogNSxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMSxcclxuICAgICAgICAgICAgICAgICAgICBjb3VudDogMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgY291bnROZWVkOiA5OVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsdjogNixcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMSxcclxuICAgICAgICAgICAgICAgICAgICBjb3VudDogMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgY291bnROZWVkOiA5OVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsdjogNyxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMSxcclxuICAgICAgICAgICAgICAgICAgICBjb3VudDogMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgY291bnROZWVkOiA5OVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsdjogOCxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMSxcclxuICAgICAgICAgICAgICAgICAgICBjb3VudDogMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgY291bnROZWVkOiA5OVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsdjogOSxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMSxcclxuICAgICAgICAgICAgICAgICAgICBjb3VudDogMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgY291bnROZWVkOiA5OVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy8gc3RhdGljIG1lbWJlcnNcclxuICAgIHtcclxuICAgICAgICBOQU1FOiAnTG92ZU1lZGlhdG9yJ1xyXG4gICAgfVxyXG4pOyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFydGh1ciBvbiAyMDE0LzEyLzIxLlxyXG4gKi9cclxuXHJcbnZhciBwdXJlbXZjID0gcmVxdWlyZSgncHVyZW12YycpLnB1cmVtdmM7XHJcbnZhciBjb25zdGFudHMgPSByZXF1aXJlKCcuLi8uLi9hcHBDb25zdGFudHMuanMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcHVyZW12Yy5kZWZpbmVcclxuKFxyXG4gICAgLy8gQ0xBU1MgSU5GT1xyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdmaWdodGVyLnZpZXcubWVkaWF0b3IuU2NlbmVNZWRpYXRvcicsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLk1lZGlhdG9yXHJcbiAgICB9LFxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIF9pbml0aWFsaXplZDogZmFsc2UsXHJcblxyXG4gICAgICAgIGxvYWRlckltYWdlOiBcImRhdGE6aW1hZ2UvanBlZztiYXNlNjQsLzlqLzRRQVlSWGhwWmdBQVNVa3FBQWdBQUFBQUFBQUFBQUFBQVAvc0FCRkVkV05yZVFBQkFBUUFBQUFsQUFELzRRTXBhSFIwY0RvdkwyNXpMbUZrYjJKbExtTnZiUzk0WVhBdk1TNHdMd0E4UDNod1lXTnJaWFFnWW1WbmFXNDlJdSs3dnlJZ2FXUTlJbGMxVFRCTmNFTmxhR2xJZW5KbFUzcE9WR042YTJNNVpDSS9QaUE4ZURwNGJYQnRaWFJoSUhodGJHNXpPbmc5SW1Ga2IySmxPbTV6T20xbGRHRXZJaUI0T25odGNIUnJQU0pCWkc5aVpTQllUVkFnUTI5eVpTQTFMakF0WXpBMk1DQTJNUzR4TXpRM056Y3NJREl3TVRBdk1ESXZNVEl0TVRjNk16STZNREFnSUNBZ0lDQWdJQ0krSUR4eVpHWTZVa1JHSUhodGJHNXpPbkprWmowaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1UazVPUzh3TWk4eU1pMXlaR1l0YzNsdWRHRjRMVzV6SXlJK0lEeHlaR1k2UkdWelkzSnBjSFJwYjI0Z2NtUm1PbUZpYjNWMFBTSWlJSGh0Ykc1ek9uaHRjRTFOUFNKb2RIUndPaTh2Ym5NdVlXUnZZbVV1WTI5dEwzaGhjQzh4TGpBdmJXMHZJaUI0Yld4dWN6cHpkRkpsWmowaWFIUjBjRG92TDI1ekxtRmtiMkpsTG1OdmJTOTRZWEF2TVM0d0wzTlVlWEJsTDFKbGMyOTFjbU5sVW1WbUl5SWdlRzFzYm5NNmVHMXdQU0pvZEhSd09pOHZibk11WVdSdlltVXVZMjl0TDNoaGNDOHhMakF2SWlCNGJYQk5UVHBFYjJOMWJXVnVkRWxFUFNKNGJYQXVaR2xrT2pNNE1EQkVNRFkyUVRVMU1qRXhSVEZCUVRBelFqRXpNVU5GTnpNeFJrUXdJaUI0YlhCTlRUcEpibk4wWVc1alpVbEVQU0o0YlhBdWFXbGtPak00TURCRU1EWTFRVFUxTWpFeFJURkJRVEF6UWpFek1VTkZOek14UmtRd0lpQjRiWEE2UTNKbFlYUnZjbFJ2YjJ3OUlrRmtiMkpsSUZCb2IzUnZjMmh2Y0NCRFV6VWdWMmx1Wkc5M2N5SStJRHg0YlhCTlRUcEVaWEpwZG1Wa1JuSnZiU0J6ZEZKbFpqcHBibk4wWVc1alpVbEVQU0o0YlhBdWFXbGtPa1UyUlRrME9FTTRPRVJDTkRFeFJURTVORVV5UmtFM00wTTNRa0UxTlRsRUlpQnpkRkpsWmpwa2IyTjFiV1Z1ZEVsRVBTSjRiWEF1Wkdsa09rVTJSVGswT0VNNU9FUkNOREV4UlRFNU5FVXlSa0UzTTBNM1FrRTFOVGxFSWk4K0lEd3ZjbVJtT2tSbGMyTnlhWEIwYVc5dVBpQThMM0prWmpwU1JFWStJRHd2ZURwNGJYQnRaWFJoUGlBOFAzaHdZV05yWlhRZ1pXNWtQU0p5SWo4Ky8rNEFEa0ZrYjJKbEFHVEFBQUFBQWYvYkFJUUFEUWtKQ1FvSkRRb0tEUk1NQ3d3VEZoRU5EUkVXR2hVVkZoVVZHaGtVRmhVVkZoUVpHUjBmSUI4ZEdTY25LaW9uSnprNE9EZzVRRUJBUUVCQVFFQkFRQUVPREF3T0VBNFJEdzhSRkE0UkRoUVZFUklTRVJVZkZSVVhGUlVmS0IwWkdSa1pIU2dqSmlBZ0lDWWpMQ3dvS0N3c056YzFOemRBUUVCQVFFQkFRRUJBLzhBQUVRZ0F5QUNnQXdFaUFBSVJBUU1SQWYvRUFMQUFBQUVGQVFFQUFBQUFBQUFBQUFBQUFBUUFBZ01GQmdjQkFRRUFBd0VCQUFBQUFBQUFBQUFBQUFBQUFRTUVBZ1VRQUFJQkFnSUVCd29MQmdRR0F3QUFBQUVDQXdBRUVRVWhNUklHUVZGeHNUSVRGR0dCd2RFaVFsS1NNeldSb2VGaWNxS3lJMU56RllKakpEUVdCOUtqVkNieHdrTmtKV1hpazNRUkFBSUJBZ01GQlFjREJRRUFBQUFBQUFBQkFoRURJUklFTVVGUmNUSmh3VklVQlpHaHNTSnlFek9CMFVMaFlwSWpVeFgvMmdBTUF3RUFBaEVERVFBL0FNSlNwVXFBVktsWHVGQWVVcTl3cFVCNVh1RmU0VjZvb0R6WkhEb3gwQ25HTWluendsN1o4TmFqYUhlb08zdm1UQlpCdHA5WVVJcVRFVjVST3hIS25XUm5hVThWUk1oRkJVanBWN2hTb1NlVXE5cFVCNVNyMmxoUUhsS3ZjSzhvQlY3aFNGU1JydGFLQVpzMDdZTlBNMXBHMnhKSUF3MWpTZWFuZHJ5LzhYNG04VkNLa1d3YVd3YW03WGwvNHYxVzhWTHRtWC9pL1ZieFVvS2tXd2FrU000MDd0bVgvaS9WYnhVbXpHd2pRc2pkWTQxSUFSaWUvVTBJYlpPMGtOdENYbk9Da0VCZUZ1NEtJM0JzN0ROYjI3eWErakR4M2tKZUVucEpKRWNRVmJXRHNrMTd1NXVyZDU5MXVjWmtXaHltMlZuZDlSa0NERXBGeERScGJ3MGJ1bnU1bWxwMkRlMkZNTFlYT0Qyd0IyeGJPZXJhVWNZR0o3Mm1sU1VpcXp6ZHpNZDNaM21peGx0QTJ5emNLL05sSE0xRFF5UlhjZTFIb2NkTk9FZkpYWjg4eTlab2pPcWhpQnN6SVJpSFE4WTRjSzVUdkh1ekxsakhOTXF4Tm9EakxGcmFISG5qUHhjTkNHVmJ4RVV6WU5UeDVqWlN4aHBXNnFUemx3SitEQ3ZPMlpmK0w5VnZGU2dxeUhZTkxZTlRkc3NQeGZpYnhVdTE1ZjhBaS9WUGlxQ2FrT3dhODJEVS9hOHYvRitKdkZURGRXUEJMOFI4VktDdllSWVY1VXpvTUF5NlFkSUlxSTBCNEtKdHhpUlF3b3UxNlFvR1VrbnRINVR6MFJiWmJtRjJoa3RyYVNWQm8ybFVrWTh0RHllMGZsUFBYVHNsVlV5aXlWUnNqcVVPQTR5TVQ4ZFcycmFtMm02VVZUTnE5UzdFSXlVVkp5ZE1Ubi82RG5QK2ltOVdsK2c1ei9vcHZWcnB0ZUVoUVdZNEFhU1R3QVZmNVdQaVpoLzlTNS96ajd6bHR6bG1ZV2tmV1hOdkpER1RnR2NZREhpclI3aTdtU2J3WFBhcnNGTXJnYjd3NmpLdy93Q21uYzlJMTRrRjN2cHZDbGpiTXlXTU9KTDRhRWlCOHFVL09iVUs3SFlXVnJsMXBGWldpQ09DQlFxS09MalBHVHJOWlpxS2JVWFZIcTJuTndUdUpSazFWcGJnWE44czdSazV5bTBVUVF6aElHMk5Bamh4SFdiSStnQ0JWakJCRmJ3eHdRcUVpaVVKR2cxQlZHQUZlN2RWMjhXWUxZWkZtRjJUaDFVRDdKR2p5bUd5bjFpSzVPeXpJQkdCMUhnckxaaGFtenVtUUFHSndTcW5TQ2gxcTNHT0NvZHh0NGN4dXJkY3B6dU40Y3loaVdhRjVCZzA5dWRVbW5XdzFIL2pWOW5GdUo3UXVvKzhoOHBlVGhGQSswNDd2ZHV5TXRrN2ZZcVRsMDdZRmRmVXVmTVB6VDVwNzFVZHRsbVlYYUdTMnQzbVFIQXNneEFOZGFkWUpvcExlNFFTMjg2N0VzWjRRZkNOWXJDRmJqZERQbWdrWXlXRnhnVmYwNGlmSmY2U2NOZFJVVzFYQmI2RlU1VGpGNUVwU1NyR3UvczVsTitnNXovb3B2VnBmb09jL3dDaW05V3RkSG5hdHZPYkpYRFc3eExHaEI4bnJQYVk5L0hDcit0RWRQQ1ZhU2VEb1lMbnFGNjNselc0L1BGU1czZWN4Ykk4NFZTeldVd1VhU2RnMERYWEs1bnZBaXBuZDZxZ0t2V25RTzdwcmk5WlVFbW0zVmwyajFrcjhwUmxGUnlxdUJOWmpHeFEvUzU2WTFTMmZ1OU9WdWVvbjExU3phaG9vdTA2UW9RVVhhZElWQ0QyRkpKN1IrVTg5ZE15ZHY4QXhkbitUSDltdVp5ZTBmbFBQWFFzdGxLNVRia2ExZ1VqbEMxcTB2VkxrZWI2citPM1R4OXhjWTFudDhjME5yWkN5aU9FMTEwOE5Zakd2MWpvbzdKczFqekt5U2NZTEl2a3pMNkxEd0hYVkprc0g5U2I0OWRLTnEwdGoxakE2dXJpT0NMKzAyRldYN2lWdFpYMS9BemFIVHllb2F1S24yTVg5Vzc5emViaVpDdVI1TWpTcmhmWHVFdHdUclVlWkgreU5mZHJSTmN4STZJemhYbEpFYWs2V0lHSjJSdzRDaFduQ2huZHRsVkJMTWRRQTBrMWdiWE5NenpEZkRMczZtamFQS3BwSmJXd0oxYk93d3h3NDNPbkhoNzFZVDNEcGZXVUptRmxiNWpISERkZVhCSElzclJlYTVUU3F2eHFHMDRjTk42MnZldG9DUzR0cmU1bWdua0dFOXErM0RLT2t1STJXWDZMRFFSUkhXRGgxVUN0d2o3UVJnMndkbDhEamd3MXFlN1h2VzBCUTNrZlo3bVNMZ1UrVDlFNlJWYm51VnJuV1ZTV3FqK0x0OFpiUnVIRWRLUGtZVmNaMk1KWTVmU0d5ZVZhcjQ1K3JrV1FIQXFjY2FsUEU1a20xaHRXSzVuSzRXbnQ1RnVVQlV3T01HNG5Ha0EvQlhVclc0UzZ0b3JsT2pNZ2NkL3hWbjdyTG83ektzMHVFakNOZVN2ZHdvQmhnc1p4WDFsMmozNmszTHUrdXlwcmRqNVZzNUEraS9sRDQ4YTBhYVZKT1BpN2pCNmxieldvenBqQjQ4cGYxTkRYTk40dmZsNytaNEJYUzY1cHZGNzh2ZnpQQUs3MVhUSG1aL1MveVQranZKN0wzZkh5dHoxRSt1cGJMK1FqNVc1NmpmWFdSbnNJWUtMdGVrS0VGR1d2U0ZRZ3lqazlvL0tlZXQzWXRobE1QLzV4OW1zSko3UitVODliaXliL0FNWEV2N2dENnRhZEwxVCtrd2VwUnJDMzlaa0xETWJpd012VUhSUEcwYmpsR2c4b3JlLzIzc3hCbGR4Zk1QTHVwTmhUOHlML0FPUk5aYmR6SjQ4NHNjeXR4Z0xxSlk1TFpqNlEyc1Y1RzFWdWQxbWpqeUcwaWowTkVHU1pUb0t5aGp0cXc0d2F6dHVpWEEzcUtUYlN4bHRmR2hiWmxFOTVadFpxeFZiZ2lPWmhyRVI5cGgzU3ZrOStwSklMWjRZNERHQkZDVU1LalJzR1BvYlBGaFVmVzBOSm1sakUyeEpjSXJjSTJ2RlVFbG4xbFJYZDZscmF6WFQ5R0NOcEQreU5xb0k3bU9WZHVOdzZuemxPSW9QT1VhNnl5ZTFYWGNiTVI1R2RRM3hZMEJTYmozMS9GY1RRWmlySitxNDMxcTdhbmJIQ1RaNzJCdzdsYlByS0JNY0JXTk5nYk1CQmgrYnNqQmRuaTBWSjFsQVJaczZ5V2l1cHhDdU1EeTZLcFMySXdPbzZEVHIzTXJlM2U1dFpaVlVNNFpCanFPT0pvV080amtYYWpjT09NSEdnRElTdldJcmRBa0tSODArVHpWbDkwOGJQUEwzTHp4T3VIZGlmeFZmaVRBZzkycUkvdysvOGdHZ1N5Ti9tUjdYUFZscDBsRi8zTDNtYlZLdHU1SGpiay84QUhFMkZjMDNpOStYdjVuZ0ZkS05jMTNpOStYdjVuZ0ZhTlYweDVubitsL2tuOUhlRVdYdStQbGJucUo5ZFMyWHU5T1Z1ZW9uMTFrWjdDR0NqTFhwQ2d4UmxyMGhVSVBZVWNudEg1VHoxczh2YitCdDEvZHFQaXJHU2UwZmxQUFd1c0cvZzRQeTE1cTA2WHFseU1XdlZZUStydUk5eEpPcXpPOWhPdG8vc1A4dGJHT0ZJcm1XZU03SXVNRE1uQVhYUUpPVWpRZU9zSmswblk5NmlwMENZdW5yamFIeDF0K3NyUEpVYlhCbTJMckZQaWt3VE9iK1QrVmhiWnhHTXJEWHA4M3gxUVN5MnR1Y0pwVWpQRVRwK0NuNS9mdGFSdkt2dHAzS3g0OEhHM2VySE16T3haaVdadExNZEpOUVNiYkw3MVZrNnl5blZpT2txbkVFZk9XdFBiWGkzRVFrR2c2bVhpTmNramVTSnhKR3hSMTBxdzBHdHh1eG12YkltRDRDWk1GbEE0ZlJmdjBCcWVzcXF6VE1aTk1FRGJJSHRISDJRZUNpWkpTcU1RZE9HaXVlNTNtejNjelF3c1JiSWNOSG5rZWMzYzRxQU11cml6NjhnVElUb3h3T09ubHAwTWp4TUpZVzc0MUdzM1JWbGR0YnlnRS9kTWNIWC9tb0RheFRpV05aQjUzQjNhcmI4L3dDKzRTT0Y0c2YvQUt4VTlrY0JzZk9HSGZvVUh0Ry9SYnpZNURpZTVISGhYZHZhdnFpWjlROEpkbHE0L2diS3VhN3hlL0wzOHp3Q3VocGYyVWsvWm81MGttd0pLSWRvZ0RqdzFWenplTDM1ZS9tZUFWcDFMVGdxWTRubittUmF1enFtcXdyanpDTEwzZkh5dHoxRSt1cExMK1FqNVc1NmpmWFdSbnJvWUtMdGVrS0VGRjJ2U0ZRZzloU1NlMGZsUFBXb3NtL2hJZm9MelZsNVBhUHlubnJSV2IvdzBYMEY1cTA2WHFseU0yc1ZZeDVnbWJGcmUvdDcxTlkyVCswaDhWYlNPNVNXTkpVT0tTQU1wN2pER3NwbU1QYUxSbFhTNmVXdmUxL0ZSTzdXWWRiWm0xWS9lVy9SN3FIeEhSWEdvamxtM3VsaWQ2YVZiYVcrT0FMdmdDTHEySG05V3hIS1dxamhqNnhzSzFlOGRtMTVsNG5pRzFMWmtzd0dzeHRyUGVPbXN2YXlCSkExVkl0bFdqcHRMdVRkUE1vN0x0alJEcTluYUs0K1dGOUlyVVc3QmFIT2xqR3FWSEI3dzJoelZvWnQ4N2Q4dmFOWVNMbDAyQ2NSc0RFYkpiajcxVXU3VUJrdko3L0Q3cTJRb0R4eVNhQU84TVRYZHhSVk1wUnA1WFpPV2RGL21zN1I1WGR5S2ZLV0pzTy81UGhyRzVYbE54bUV5d1c2YlRuVHhBQWNKTmJHU01Ya00xcGpnYmlObzFQemlQSitPczd1N20vNlJlTTAwWk9neFNwcVlZSFQzd1JYTUtONGxsOXpVRzRiUWZOc2h1OHNaVnVFQTJoaXJBNHFlL1ZPd3dyVmJ6Ynd3NW1JNDRVS1JSWWtiV0cwUzNKV2N0YmQ3dTVXRmZPT0xIaVVkSnFtYWlwZkxzSXNPYmhXZTAwMWxNa01WdkpOamhnaElBTE1jQnhDczdmeFhRbWt1cHgxYlhEc3dHUGxhVGlkVmFFeUtOWGtvbzRlQlYrU3E3TDdWczl6Y0JnZXlRNEdRL01CMWNybW9pbTJvcmV6cWNvd1R1U2VFWTQ4alE3b1pYMlBMemR5TGhOZDZSanJFWTZJNyt1c3B2SDc4dmZ6UEFLNlVBQUFGR0FHZ0FjQXJtdThYdnk5L004QXJUZmlvMjRSVzVubmFHNjd1b3UzSC9LUHVxVDJYOGhIeXR6MUcrdXBMTDNlbkszUFViNjZ5czlSREJSZHIwaFFnb3UwNlFxRUdVa250SDVUejFlMjM4dkY5QmVhcUtUMmo4cDU2dmJiK1hpK2d2TldqVGRVdVJuMVhUSG1UaDhLckpUSmx0OHQxQ1BJWTQ0Y0ducEpWalRKWWttamFOOUliNHU3VjkyM25qVGV0aFJhdVpKVjNQYVcxcmZMSWlYRURZZzZSNFZZYzlDWFc3dGhmT1piS2RiR1p0TFc4dVBWWS91M0dya05Va005emxjeFVqYmhmV09BOTBjUnE0Z3Y0TGhkcU4rVlRvTllXbW5SbTlOTlZXTlR5SGM2VldCdjh3dDRZZUhxbTZ4eVBtcm9xMVo3V0dGTFN4VHE3V0xTdVBTZGpya2Z1bXE1eUhYRFVlQTkyb08yU0twVnVtTkFhb0pMTVhIM215cDBycEo0dUtoYzN0YkRNNUJNcmkxekFqNzlqN0tUaVk4VGNkQnBjc2l0aDAyODZvK3NQQ2FnRVg5UHpnNHpYVUNwNlFZc2U4b291Q0czdGs2bTFCWXYwNVc2VCtJZHlvbHhiSERBQWEyT2dEbE5DejNyeU4yV3hCZDVQSk1nMXQ4MWVJZDJ1a3FuTGxUQmJmY3VZKzl1SkxpUmN2dFB2SGRzSEsrY2ZSSGNIRFdzeWF3anl5MFdCY0RJM2xUUDZUZUljRlYrUzVPbVh4OWJKZzEwNDhvOENqMFY4SnEyRFZ1MDluTDgwdXA3T3hIaStvYWwzUDhBWEIvSXNaUzhUL1lPVjY1enZDY2M3dmZ6UEFLM2l2V0N6NDQ1emVIOTU0QlhPcjZJOHlmU2Z5eitqdkNMUDNmSHl0ejFHK3VwTFAzZkh5dHoxRSt1c2JQYVEwVVhhZElVSUtMdGVrS2hCN0NrazlvL0tlZXIyMi9sNC9vTHpWUlNlMGZsUFBWN2IveThYMEY1cTBhYnFseU0rcTZZOHlRc0JURE1vcjFvOGFpYUUxcGJsdU1xUzNzYkxMSEloU1JReW5ncXVraGFKOXVCam8rSDVhT2EzYW8ydDM0cW91UmxMYWpUYWxHUDh2MElZOHlsWFErUEtQRlUvYllYT0xQZ2U2Q0tpYTBMYXhUT3hIdTFRN2N1QmQ5eVBFSjdUYmpYS084Q2FqYk1JRjZDTkllTnZKSGpxSVdKN3RTcFlrYWxxVmJsd0lkeUcrUkdYdXIwaFhZSkZ4YWwrRGhxNXkzc2xrdjNZMnBEMHBUcitRVUNscEpSVWRvOVhXNE9MclRIdE0xNmNaTExXa2VDN3k0anZsTkVwY1J0dzFVeDI3Q2k0NDhOWnJURnkzbm4zSVFXeGxnR3JEWjNwemE3L004QXJabytBckY1MTcxdXZwK0NxZFYwUjVsL3BzVXJzMnZCM2hkbDd2VGxibnFKOWRTMlh1K1BsYm5xSjlkWTJlc2hvb3ExNlFvUVVYYTlJVkNEMkZMSjdSdVU4OVdOdG1VU1Fxa2dZTWd3MGFjY0tycFBhUHlubnJaV0c0VmkrVldtWTV0bk1XWEcrWHJJWW5BMHJoajBtZGNUZ2ROZHduS0Rxam1kdU0xU1JSL3FscjgvNEtYNnBhOFQvQlZ6RHVMWlh1ZFJaYmxtYnhYY1BVTlBjM0txQ0l3cmJPemdySEVuSGpveUQrM2VTWGtodDdEZUtHNHVtREdPSlZVa2xmb3VUaFhmbWJuWjdDdnkxdnQ5cG12MVcxK2Q4Rkw5VnRlSnZncTV5cmNPR2ZMbXpITjgwaXl5RVRQYnB0QUVGbzJaRzhwbVVhMU9GTm4zS3k2Vy9zYkRLTTVodjVieDJXVFpBKzdSRjJ5NTJXT1BKVHpFK3oyRHkxdnQ5cFQvQUtwYWNUZXJTL1U3VGliMWEwNC90N2tEWFBZMDNqaE4wVzZzUTdLN1czcTJkbnJNY2NhRHkvOEF0ODBrdVpmcVdZeFdOdGxjdlVQUGhpR1loV0RlVXk3SXdZVTh4UHM5Zzh0YjdmYVVuNnBhY1RlclR4bTlvT0J2VnEzdjl6OTI3YXludUlkNDRMaVdLTm5qaEFYRjJVWWhSZzUxNnFwc3J5akxyMjE2NjV6RkxTVGFLOVUyR09BODdTd3FZMzdrblJVK0J6T3phZ3MwczFPeXIrQktNNnN4d1A2dFNEUExNZW42dnkwcnZkbTNTeGx1N0svUzdXRERyRlVEVVR4Z25UVTgyNmVYVzdLbHhtcVF1d0RCWFVLY0QrMVhlZS93WHVLWDVYREdXTGFwU1ZjT3loRU0vc2VKL1YrV25qZUd4NHBQVitXa202a0tabEZheTNKbHQ3aUZwWVpZOEFTVks2RGp0RERBMGY4QTBUbDM0MC8xZjhOZHg4eEpWV1hCMEtia3RGRnBOemRWWEFDL3FPd0EwQ1FuaTJmbHJPM1Z3Ym01bG5JMlRLeGJEaXJYL3dCRTVkK05jZlYvd1ZSN3haUGE1VTl1dHZJOG5XaG1iYncwWUVBWVlBVnhmaGZ5NXJsS1I0RnVsdTZYN21XMW16VDhTNFlpcy81Q1BsYm5xSjlkU1dmdTlPVnVlb24xMW1adlEyaTdYcENoS0t0ZWtLaEJsTko3UitVODliRGZHVGIzYTNaWDBMY2o2a2RZK1QyajhwNTYwMjg4bTFrV1FyNk1KK3lsU0FyKzJjblY1cmVuanMzSDFsb1grM2o5WHZiYnR4TE45bHFXNFVuVjVqZG5qdFhIeGlodHlaTmplU0J1NUo5azFCSmU3eHk3VzVDSi93Q3p1RC9tVFZUZjIrZnE5N0xKdUxyUHNOUnVlUzdXNmFKLzM4eCt2TFZYdVkreHZIYU54YmYyR29DZXpmOEEzNmovQVBzU2Y4dzFzTG5xY3pUZWZKbHVZb0xtNXVvNUY2MXNCc2hJdFAxY05GWWUxZjhBM2lyL0FQZkUvd0NaVWU5YkI5NHI1and1UHNyUUZobUc0bC9aMk0xN0hkVzkwdHV1M0lrVEhhQ2pXZEl3MFZWWmRrczkvQzA2eUpGRXAyZHArRTFiYnF5YkdUWjh2cFFEN0wxWFJ2OEE3YmxUOTZPZGE3dHBOdXVORTM3Q3E5S1Npc2p5dVVveHJTdEtsbEhiTGxXVFhzTXM4Y2h1U3V3RVBEcXdvTGU1eStZUkUvZ0x6bXFSZWt2S0t0ZDQzMjd5TS91bEh4bXJISlN0eVNXVlJ5cmp4S0kyWEMvQ1RsbmxQUEtUcFRkRmJQMEwxYmdyZjVMcDBHM2RQaFFId1YwUzFsekJzbnMzc0VTUjhDcmg5V0FKR2pTT0t1VTNFK3pkWlEzb0poOElBcmRaWEZEbU9UcEhhM2kyK1lySTJLdEt5NHJpY0JzQnVISGdGWFNvNDQwK1dhMnFxeGp2TTl1TW95K1d2eldwTENXV1dFMjhIeEw2ZTQzb2pna2VTQ0JZMVJpNUJHSVVEVDUxY2wzdm0yNzZCQnFTRUg0V2J4VjB0bGt5WEpjeFRNYitPVzZ1WTltR0hyQ3pEUXd3QWJUcDJ1S3VUWjlOMXVZc2ZSUlI4V1Bocm00MTltU1NqUnlpcXhWSzd5MjNCL2Z0dVRtMm9TZEp5ek5WdzNCRm43dlRsYm5xRjlkUzJmdTlPVnVlb24xMWxadVEyaUxkc0dGRDA1SDJkTlFHVjBudEc1VHoxZFdtOU4xYjJrVnE4RVZ3c0kyVWFRYVFPS2htaXRaR0xPbWs2OERoU0Z2WStnZldOU0FnN3ozUXZvN3lLQ0tJb2hpYU5SNUxLeHg4cXB4dmpjcVMwVnBieHZ3T0FjUlFQWjdEMEc5WTB1ejJIb0gxalVDcExZN3pYbHBibTNlS081UXV6anJCcVpqaTN4MTdQdk5jeVQyODhWdkRCSmJNV1VvdlMyaHNsVzdtRlE5bnNQUVByR2wyZXc5QStzYUNvZC9XTnh0YllzcmZiMTdXQnh4NWRkRDIyODF4Qzg4a2x2RGNTWEVuV3V6cnFPR0dDOXpSVVBaN0QwRzlZMHV6V0hvSDFqUVZDTHJlcTZudFpiYU8zaXQxbUd5N1JqVHMxWDJtWXkyMFppQ3E4Wk9PRGNkRWRtc1BRYjFqUzdQWWVnZldOZEp1THFuUWlTVWxScXBGTG1yeXh0SDFNYTdRdzJnTk5QT2RTdDBvSTI3cDAwN3M5aDZCOVkwdXoySG9IMWpYWDNaK0k0KzFiOElKZFg4OXhMSEtRRk1YUVVhaHB4b2lQTjVQK29uZlUrQTAvczloNkRlc2FYWjdEMEQ2eHBHN09MYlV0dTBTdFc1Skp4MmJCc21idGlTaUVrK2N4b0NXV1NhVnBaT2sydkRWbzBWWWRuc1BRYjFqU052WmNDSDFqU2QyYytwMVhBbUZxRU9tT1BFZmFIK0JRZDF1ZW8yMTFJenJnRlVZS05BQXFJMVd6dENwVXFWQ1JVcVZLZ0ZTcFVxQVZLbFNvQlVxVktnRlNwVXFBVktsU29CVXFWS2dGU3BVcUFWS2xTb0QvOWs9XCIsXHJcblxyXG4gICAgICAgIGxvYWRlclRleHQ6IFwi5q2j5Zyo6L295YWlLi4uIFwiLFxyXG5cclxuICAgICAgICBsb2FkZXJGb250OiBcIkFyaWFsXCIsXHJcblxyXG4gICAgICAgIC8qKiBAb3ZlcnJpZGUgKi9cclxuICAgICAgICBsaXN0Tm90aWZpY2F0aW9uSW50ZXJlc3RzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICBjb25zdGFudHMuU0NFTkVfQUNUSU9OLFxyXG4gICAgICAgICAgICAgICAgY29uc3RhbnRzLlNDRU5FX0FDVElPTl9BRERfQ0hJTEQsXHJcbiAgICAgICAgICAgICAgICBjb25zdGFudHMuQ09ORklSTV9ESUFMT0dcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKiogQG92ZXJyaWRlICovXHJcbiAgICAgICAgaGFuZGxlTm90aWZpY2F0aW9uOiBmdW5jdGlvbiAobm90aWZpY2F0aW9uKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAobm90aWZpY2F0aW9uLmdldE5hbWUoKSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBjb25zdGFudHMuU0NFTkVfQUNUSU9OOlxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZyhub3RpZmljYXRpb24uZ2V0Qm9keSgpLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2aWV3TWVkaWF0b3IgPSB0aGlzLmZhY2FkZS5yZXRyaWV2ZU1lZGlhdG9yKG5vdGlmaWNhdGlvbi5nZXRCb2R5KCkubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZpZXdNZWRpYXRvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFZpZXcodmlld01lZGlhdG9yKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9pbml0aWFsaXplZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgY29uc3RhbnRzLlNDRU5FX0FDVElPTl9BRERfQ0hJTEQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRDaGlsZChub3RpZmljYXRpb24uZ2V0Qm9keSgpKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgY29uc3RhbnRzLkNPTkZJUk1fRElBTE9HOlxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBDb25maXJtRGlhbG9nID0gcmVxdWlyZSgnLi4vY29tcG9uZW50L2NvbmZpcm1EaWFsb2cuanMnKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYm9keSA9IG5vdGlmaWNhdGlvbi5nZXRCb2R5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRDaGlsZChuZXcgQ29uZmlybURpYWxvZyhib2R5LnRpdGxlLCBib2R5LmRlc2MsIGJvZHkuY2FsbGJhY2spKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKiBAb3ZlcnJpZGUgKi9cclxuICAgICAgICBvblJlZ2lzdGVyOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKiBAb3ZlcnJpZGUgKi9cclxuICAgICAgICBvblJlbW92ZTogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzZXRWaWV3OiBmdW5jdGlvbiAodmlld01lZGlhdG9yKSB7XHJcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHNlbGYudmlld0NvbXBvbmVudCA9IG5ldyBjYy5TY2VuZSgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHJlcyA9IHZpZXdNZWRpYXRvci5nZXRSZXNvdXJjZSgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGhhbmRsZVNjZW5lQ2hhbmdlZCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2aWV3TWVkaWF0b3IuaW5pdCgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoaWxkID0gdmlld01lZGlhdG9yLmdldFZpZXdDb21wb25lbnQoKTtcclxuICAgICAgICAgICAgICAgIGlmIChjaGlsZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYudmlld0NvbXBvbmVudC5hZGRDaGlsZChjaGlsZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZi5zZW5kTm90aWZpY2F0aW9uKGNvbnN0YW50cy5OT1RJRklDQVRJT04uU0NFTkVfQ0hBTkdFRCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBpZiAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5Mb2FkZXJTY2VuZS5wcmVsb2FkKHJlcywgaGFuZGxlU2NlbmVDaGFuZ2VkLCB0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZVNjZW5lQ2hhbmdlZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYWRkQ2hpbGQ6IGZ1bmN0aW9uKG5vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy52aWV3Q29tcG9uZW50LmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6ICdTY2VuZU1lZGlhdG9yJyxcclxuICAgICAgICBTQ0VORV9DSEFOR0VfVklFVzogJ1NjZW5lQ2hhbmdlVmlldydcclxuICAgIH1cclxuKTtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgQXJ0aHVyIG9uIDIwMTQvMTIvMjAuXHJcbiAqL1xyXG52YXIgcHVyZW12YyA9IHJlcXVpcmUoJ3B1cmVtdmMnKS5wdXJlbXZjO1xyXG52YXIgY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vLi4vYXBwQ29uc3RhbnRzLmpzJyk7XHJcbnZhciBUYXNrUHJveHkgPSByZXF1aXJlKCcuLi8uLi9tb2RlbC9wcm94eS90YXNrUHJveHkuanMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ2ZpZ2h0ZXIudmlldy5tZWRpYXRvci5UcmFpbk1lZGlhdG9yJyxcclxuICAgICAgICBwYXJlbnQ6IHB1cmVtdmMuTWVkaWF0b3JcclxuICAgIH0sXHJcblxyXG4gICAgLy8gaW5zdGFuY2UgbWVtYmVyc1xyXG4gICAge1xyXG4gICAgICAgIC8qKiBAb3ZlcnJpZGUgKi9cclxuICAgICAgICBsaXN0Tm90aWZpY2F0aW9uSW50ZXJlc3RzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtjb25zdGFudHMuVEFTS19BQ1RJT05dO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKiBAb3ZlcnJpZGUgKi9cclxuICAgICAgICBoYW5kbGVOb3RpZmljYXRpb246IGZ1bmN0aW9uKG5vdGUpIHtcclxuICAgICAgICAgICAgc3dpdGNoKG5vdGUuZ2V0TmFtZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIGNvbnN0YW50cy5UQVNLX0FDVElPTjpcclxuICAgICAgICAgICAgICAgICAgICBpZiAobm90ZS5nZXRUeXBlKCkgPT0gY29uc3RhbnRzLlRBU0tfQUNUSU9OX0ZJTklTSEVEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMudmlld0NvbXBvbmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3Q29tcG9uZW50Lm9uVGFza0ZpbmlzaGVkKG5vdGUuZ2V0Qm9keSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKiBAb3ZlcnJpZGUgKi9cclxuICAgICAgICBvblJlZ2lzdGVyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqIEBvdmVycmlkZSAqL1xyXG4gICAgICAgIG9uUmVtb3ZlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHZhciB0YXNrUHJveHkgPSB0aGlzLmZhY2FkZS5yZXRyaWV2ZVByb3h5KFRhc2tQcm94eS5OQU1FKTtcclxuICAgICAgICAgICAgdmFyIHRhc2tMaXN0ID0gdGFza1Byb3h5LmdldERhdGEoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBUcmFpbkxheWVyID0gcmVxdWlyZSgnLi8uLi9jb21wb25lbnQvdHJhaW5MYXllci5qcycpO1xyXG4gICAgICAgICAgICBzZWxmLnZpZXdDb21wb25lbnQgPSBuZXcgVHJhaW5MYXllcigpO1xyXG4gICAgICAgICAgICBzZWxmLnZpZXdDb21wb25lbnQuaW5pdCh0YXNrTGlzdCk7XHJcblxyXG4gICAgICAgICAgICBzZWxmLnZpZXdDb21wb25lbnQub25CYWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNlbmROb3RpZmljYXRpb24oY29uc3RhbnRzLlNDRU5FX0FDVElPTiwge25hbWU6IGNvbnN0YW50cy5TQ0VORS5IT01FfSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBzZWxmLnZpZXdDb21wb25lbnQub25UYXNrID0gZnVuY3Rpb24odGFzaykge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zZW5kTm90aWZpY2F0aW9uKGNvbnN0YW50cy5UQVNLX0FDVElPTiwgdGFzaywgY29uc3RhbnRzLlRBU0tfQUNUSU9OX1NUQVJUKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBnZXRSZXNvdXJjZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHN0YXRpYyBtZW1iZXJzXHJcbiAgICB7XHJcbiAgICAgICAgTkFNRTogJ1RyYWluTWVkaWF0b3InXHJcbiAgICB9XHJcbik7Il19
