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
        }
    }
);

},{"../../view/mediator/directorMediator.js":"F:\\cocos\\fighter\\src\\view\\mediator\\directorMediator.js","../../view/mediator/homeMediator.js":"F:\\cocos\\fighter\\src\\view\\mediator\\homeMediator.js","../../view/mediator/loveMediator.js":"F:\\cocos\\fighter\\src\\view\\mediator\\loveMediator.js","../../view/mediator/sceneMediator.js":"F:\\cocos\\fighter\\src\\view\\mediator\\sceneMediator.js","../../view/mediator/trainMediator.js":"F:\\cocos\\fighter\\src\\view\\mediator\\trainMediator.js","puremvc":"F:\\cocos\\fighter\\node_modules\\puremvc\\index.js"}],"F:\\cocos\\fighter\\src\\controller\\command\\taskCommand.js":[function(require,module,exports){
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
    ConfirmNode: "res/ConfirmNode.csb"
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

},{"../../appConstants.js":"F:\\cocos\\fighter\\src\\appConstants.js","./sceneMediator.js":"F:\\cocos\\fighter\\src\\view\\mediator\\sceneMediator.js","puremvc":"F:\\cocos\\fighter\\node_modules\\puremvc\\index.js"}],"F:\\cocos\\fighter\\src\\view\\mediator\\homeMediator.js":[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImM6XFxVc2Vyc1xcQXJ0aHVyXFxBcHBEYXRhXFxSb2FtaW5nXFxucG1cXG5vZGVfbW9kdWxlc1xcd2F0Y2hpZnlcXG5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwibm9kZV9tb2R1bGVzXFxwdXJlbXZjXFxpbmRleC5qcyIsIm5vZGVfbW9kdWxlc1xccHVyZW12Y1xcbGliXFxwdXJlbXZjLTEuMC4xLm1vZHVsZS5qcyIsIm5vZGVfbW9kdWxlc1xcdW5kZXJzY29yZVxcdW5kZXJzY29yZS5qcyIsInNyY1xcYXBwLmpzIiwic3JjXFxhcHBDb25zdGFudHMuanMiLCJzcmNcXGFwcEZhY2FkZS5qcyIsInNyY1xcY29udHJvbGxlclxcY29tbWFuZFxcU3RhcnR1cENvbW1hbmQuanMiLCJzcmNcXGNvbnRyb2xsZXJcXGNvbW1hbmRcXGhvbWVDb21tYW5kLmpzIiwic3JjXFxjb250cm9sbGVyXFxjb21tYW5kXFxwbGF5ZXJDb21tYW5kLmpzIiwic3JjXFxjb250cm9sbGVyXFxjb21tYW5kXFxwcmVwQ29udHJvbGxlckNvbW1hbmQuanMiLCJzcmNcXGNvbnRyb2xsZXJcXGNvbW1hbmRcXHByZXBNb2RlbENvbW1hbmQuanMiLCJzcmNcXGNvbnRyb2xsZXJcXGNvbW1hbmRcXHByZXBWaWV3Q29tbWFuZC5qcyIsInNyY1xcY29udHJvbGxlclxcY29tbWFuZFxcdGFza0NvbW1hbmQuanMiLCJzcmNcXGNvbnRyb2xsZXJcXGNvbW1hbmRcXHRhc2tNb25pdG9yQ29tbWFuZC5qcyIsInNyY1xcbW9kZWxcXGVudGl0eVxcZW50aXR5LmpzIiwic3JjXFxtb2RlbFxcZW50aXR5XFxwbGF5ZXIuanMiLCJzcmNcXG1vZGVsXFxlbnRpdHlcXHRhc2suanMiLCJzcmNcXG1vZGVsXFxwcm94eVxccGxheWVyUHJveHkuanMiLCJzcmNcXG1vZGVsXFxwcm94eVxcdGFza1Byb3h5LmpzIiwic3JjXFxyZXNvdXJjZS5qcyIsInNyY1xcdXRpbFxcZXZlbnQuanMiLCJzcmNcXHZpZXdcXGNvbXBvbmVudFxcY29uZmlybURpYWxvZy5qcyIsInNyY1xcdmlld1xcY29tcG9uZW50XFxjb250cm9sbGVyXFxsb3ZlSXRlbS5qcyIsInNyY1xcdmlld1xcY29tcG9uZW50XFxjb250cm9sbGVyXFx0cmFpbkl0ZW0uanMiLCJzcmNcXHZpZXdcXGNvbXBvbmVudFxcaG9tZUxheWVyLmpzIiwic3JjXFx2aWV3XFxjb21wb25lbnRcXGxvdmVDb25maXJtTGF5ZXIuanMiLCJzcmNcXHZpZXdcXGNvbXBvbmVudFxcbG92ZUxheWVyLmpzIiwic3JjXFx2aWV3XFxjb21wb25lbnRcXHRyYWluTGF5ZXIuanMiLCJzcmNcXHZpZXdcXG1lZGlhdG9yXFxkaXJlY3Rvck1lZGlhdG9yLmpzIiwic3JjXFx2aWV3XFxtZWRpYXRvclxcaG9tZU1lZGlhdG9yLmpzIiwic3JjXFx2aWV3XFxtZWRpYXRvclxcbG92ZU1lZGlhdG9yLmpzIiwic3JjXFx2aWV3XFxtZWRpYXRvclxcc2NlbmVNZWRpYXRvci5qcyIsInNyY1xcdmlld1xcbWVkaWF0b3JcXHRyYWluTWVkaWF0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3Q1RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3Y0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9JQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJleHBvcnRzLnB1cmVtdmMgPSByZXF1aXJlKCcuL2xpYi9wdXJlbXZjLTEuMC4xLm1vZHVsZS5qcycpO1xyXG4iLCIvKipcclxuICogQGZpbGVPdmVydmlld1xyXG4gKiBQdXJlTVZDIEpTIE5hdGl2ZSBQb3J0IGJ5IERhdmlkIEZvbGV5LCBGcsOpZMOpcmljIFNhdW5pZXIsICYgQWxhaW4gRHVjaGVzbmVhdVxyXG4gKiBDb3B5cmlnaHQoYykgMjAwNi0yMDEyIEZ1dHVyZXNjYWxlLCBJbmMuLCBTb21lIHJpZ2h0cyByZXNlcnZlZC5cclxuICogUmV1c2UgZ292ZXJuZWQgYnkgQ3JlYXRpdmUgQ29tbW9ucyBBdHRyaWJ1dGlvbiAzLjBcclxuICogaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbGljZW5zZXMvYnkvMy4wL3VzL1xyXG4gKiBAYXV0aG9yIGRhdmlkLmZvbGV5QHB1cmVtdmMub3JnXHJcbiAqL1xyXG5cclxuXHJcbi8qIGltcGxlbWVudGF0aW9uIGJlZ2luICovXHJcblxyXG5cclxuLyoqXHJcbiAqIEBhdXRob3IgUHVyZU1WQyBKUyBOYXRpdmUgUG9ydCBieSBEYXZpZCBGb2xleSwgRnLDqWTDqXJpYyBTYXVuaWVyLCAmIEFsYWluIER1Y2hlc25lYXVcclxuICogQGF1dGhvciBDb3B5cmlnaHQoYykgMjAwNi0yMDEyIEZ1dHVyZXNjYWxlLCBJbmMuLCBTb21lIHJpZ2h0cyByZXNlcnZlZC5cclxuICpcclxuICogQGNsYXNzIHB1cmVtdmMuT2JzZXJ2ZXJcclxuICpcclxuICogQSBiYXNlIE9ic2VydmVyIGltcGxlbWVudGF0aW9uLlxyXG4gKlxyXG4gKiBBbiBPYnNlcnZlciBpcyBhbiBvYmplY3QgdGhhdCBlbmNhcHN1bGF0ZXMgaW5mb3JtYXRpb25cclxuICogYWJvdXQgYW4gaW50ZXJlc3RlZCBvYmplY3Qgd2l0aCBhIG1ldGhvZCB0aGF0IHNob3VsZFxyXG4gKiBiZSBjYWxsZWQgd2hlbiBhIHBhcnRpY3VsYXIgTm90aWZpY2F0aW9uIGlzIGJyb2FkY2FzdC5cclxuICpcclxuICogSW4gUHVyZU1WQywgdGhlIE9ic2VydmVyIGNsYXNzIGFzc3VtZXMgdGhlc2UgcmVzcG9uc2liaWxpdGllczpcclxuICpcclxuICogLSBFbmNhcHN1bGF0ZSB0aGUgbm90aWZpY2F0aW9uIChjYWxsYmFjaykgbWV0aG9kIG9mIHRoZSBpbnRlcmVzdGVkIG9iamVjdC5cclxuICogLSBFbmNhcHN1bGF0ZSB0aGUgbm90aWZpY2F0aW9uIGNvbnRleHQgKHRoaXMpIG9mIHRoZSBpbnRlcmVzdGVkIG9iamVjdC5cclxuICogLSBQcm92aWRlIG1ldGhvZHMgZm9yIHNldHRpbmcgdGhlIG5vdGlmaWNhdGlvbiBtZXRob2QgYW5kIGNvbnRleHQuXHJcbiAqIC0gUHJvdmlkZSBhIG1ldGhvZCBmb3Igbm90aWZ5aW5nIHRoZSBpbnRlcmVzdGVkIG9iamVjdC5cclxuICpcclxuICpcclxuICogVGhlIG5vdGlmaWNhdGlvbiBtZXRob2Qgb24gdGhlIGludGVyZXN0ZWQgb2JqZWN0IHNob3VsZCB0YWtlXHJcbiAqIG9uZSBwYXJhbWV0ZXIgb2YgdHlwZSBOb3RpZmljYXRpb24uXHJcbiAqXHJcbiAqXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG5vdGlmeU1ldGhvZFxyXG4gKiAgdGhlIG5vdGlmaWNhdGlvbiBtZXRob2Qgb2YgdGhlIGludGVyZXN0ZWQgb2JqZWN0XHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBub3RpZnlDb250ZXh0XHJcbiAqICB0aGUgbm90aWZpY2F0aW9uIGNvbnRleHQgb2YgdGhlIGludGVyZXN0ZWQgb2JqZWN0XHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gT2JzZXJ2ZXIgKG5vdGlmeU1ldGhvZCwgbm90aWZ5Q29udGV4dClcclxue1xyXG4gICAgdGhpcy5zZXROb3RpZnlNZXRob2Qobm90aWZ5TWV0aG9kKTtcclxuICAgIHRoaXMuc2V0Tm90aWZ5Q29udGV4dChub3RpZnlDb250ZXh0KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIE9ic2VydmVycyBub3RpZmljYXRpb24gbWV0aG9kLlxyXG4gKlxyXG4gKiBUaGUgbm90aWZpY2F0aW9uIG1ldGhvZCBzaG91bGQgdGFrZSBvbmUgcGFyYW1ldGVyIG9mIHR5cGUgTm90aWZpY2F0aW9uXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG5vdGlmeU1ldGhvZFxyXG4gKiAgdGhlIG5vdGlmaWNhdGlvbiAoY2FsbGJhY2spIG1ldGhvZCBvZiB0aGUgaW50ZXJlc3RlZCBvYmplY3QuXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5PYnNlcnZlci5wcm90b3R5cGUuc2V0Tm90aWZ5TWV0aG9kPSBmdW5jdGlvbiAobm90aWZ5TWV0aG9kKVxyXG57XHJcbiAgICB0aGlzLm5vdGlmeT0gbm90aWZ5TWV0aG9kO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNldCB0aGUgT2JzZXJ2ZXJzIG5vdGlmaWNhdGlvbiBjb250ZXh0LlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gbm90aWZ5Q29udGV4dFxyXG4gKiAgdGhlIG5vdGlmaWNhdGlvbiBjb250ZXh0ICh0aGlzKSBvZiB0aGUgaW50ZXJlc3RlZCBvYmplY3QuXHJcbiAqXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5PYnNlcnZlci5wcm90b3R5cGUuc2V0Tm90aWZ5Q29udGV4dD0gZnVuY3Rpb24gKG5vdGlmeUNvbnRleHQpXHJcbntcclxuICAgIHRoaXMuY29udGV4dD0gbm90aWZ5Q29udGV4dDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIEZ1bmN0aW9uIHRoYXQgdGhpcyBPYnNlcnZlciB3aWxsIGludm9rZSB3aGVuIGl0IGlzIG5vdGlmaWVkLlxyXG4gKlxyXG4gKiBAcHJpdmF0ZVxyXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cclxuICovXHJcbk9ic2VydmVyLnByb3RvdHlwZS5nZXROb3RpZnlNZXRob2Q9IGZ1bmN0aW9uICgpXHJcbntcclxuICAgIHJldHVybiB0aGlzLm5vdGlmeTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIE9iamVjdCB0aGF0IHdpbGwgc2VydmUgYXMgdGhlIE9ic2VydmVycyBjYWxsYmFjayBleGVjdXRpb24gY29udGV4dFxyXG4gKlxyXG4gKiBAcHJpdmF0ZVxyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqL1xyXG5PYnNlcnZlci5wcm90b3R5cGUuZ2V0Tm90aWZ5Q29udGV4dD0gZnVuY3Rpb24gKClcclxue1xyXG4gICAgcmV0dXJuIHRoaXMuY29udGV4dDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBOb3RpZnkgdGhlIGludGVyZXN0ZWQgb2JqZWN0LlxyXG4gKlxyXG4gKiBAcGFyYW0ge3B1cmVtdmMuTm90aWZpY2F0aW9ufSBub3RpZmljYXRpb25cclxuICogIFRoZSBOb3RpZmljYXRpb24gdG8gcGFzcyB0byB0aGUgaW50ZXJlc3RlZCBvYmplY3RzIG5vdGlmaWNhdGlvbiBtZXRob2RcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbk9ic2VydmVyLnByb3RvdHlwZS5ub3RpZnlPYnNlcnZlcj0gZnVuY3Rpb24gKG5vdGlmaWNhdGlvbilcclxue1xyXG4gICAgdGhpcy5nZXROb3RpZnlNZXRob2QoKS5jYWxsKHRoaXMuZ2V0Tm90aWZ5Q29udGV4dCgpLCBub3RpZmljYXRpb24pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENvbXBhcmUgYW4gb2JqZWN0IHRvIHRoaXMgT2JzZXJ2ZXJzIG5vdGlmaWNhdGlvbiBjb250ZXh0LlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0XHJcbiAqXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAqL1xyXG5PYnNlcnZlci5wcm90b3R5cGUuY29tcGFyZU5vdGlmeUNvbnRleHQ9IGZ1bmN0aW9uIChvYmplY3QpXHJcbntcclxuICAgIHJldHVybiBvYmplY3QgPT09IHRoaXMuY29udGV4dDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgT2JzZXJ2ZXJzIGNhbGxiYWNrIEZ1bmN0aW9uXHJcbiAqXHJcbiAqIEBwcml2YXRlXHJcbiAqIEB0eXBlIHtGdW5jdGlvbn1cclxuICovXHJcbk9ic2VydmVyLnByb3RvdHlwZS5ub3RpZnk9IG51bGw7XHJcblxyXG4vKipcclxuICogVGhlIE9ic2VydmVycyBjYWxsYmFjayBPYmplY3RcclxuICogQHByaXZhdGVcclxuICogQHR5cGUge09iamVjdH1cclxuICovXHJcbk9ic2VydmVyLnByb3RvdHlwZS5jb250ZXh0PSBudWxsO1xyXG4vKipcclxuICogQGF1dGhvciBQdXJlTVZDIEpTIE5hdGl2ZSBQb3J0IGJ5IERhdmlkIEZvbGV5LCBGcsOpZMOpcmljIFNhdW5pZXIsICYgQWxhaW4gRHVjaGVzbmVhdVxyXG4gKiBAYXV0aG9yIENvcHlyaWdodChjKSAyMDA2LTIwMTIgRnV0dXJlc2NhbGUsIEluYy4sIFNvbWUgcmlnaHRzIHJlc2VydmVkLlxyXG4gKlxyXG4gKiBAY2xhc3MgcHVyZW12Yy5Ob3RpZmljYXRpb25cclxuICpcclxuICogQSBiYXNlIE5vdGlmaWNhdGlvbiBpbXBsZW1lbnRhdGlvbi5cclxuICpcclxuICogUHVyZU1WQyBkb2VzIG5vdCByZWx5IHVwb24gdW5kZXJseWluZyBldmVudCBtb2RlbHMgc3VjaCBhcyB0aGUgb25lIHByb3ZpZGVkXHJcbiAqIHdpdGggdGhlIERPTSBvciBvdGhlciBicm93c2VyIGNlbnRyaWMgVzNDIGV2ZW50IG1vZGVscy5cclxuICpcclxuICogVGhlIE9ic2VydmVyIFBhdHRlcm4gYXMgaW1wbGVtZW50ZWQgd2l0aGluIFB1cmVNVkMgZXhpc3RzIHRvIHN1cHBvcnRcclxuICogZXZlbnQtZHJpdmVuIGNvbW11bmljYXRpb24gYmV0d2VlbiB0aGUgYXBwbGljYXRpb24gYW5kIHRoZSBhY3RvcnMgb2YgdGhlIE1WQ1xyXG4gKiB0cmlhZC5cclxuICpcclxuICogTm90aWZpY2F0aW9ucyBhcmUgbm90IG1lYW50IHRvIGJlIGEgcmVwbGFjZW1lbnQgZm9yIGV2ZW50cyBpbiB0aGUgYnJvd3Nlci5cclxuICogR2VuZXJhbGx5LCBNZWRpYXRvciBpbXBsZW1lbnRvcnMgcGxhY2UgZXZlbnQgbGlzdGVuZXJzIG9uIHRoZWlyIHZpZXdcclxuICogY29tcG9uZW50cywgd2hpY2ggdGhleSB0aGVuIGhhbmRsZSBpbiB0aGUgdXN1YWwgd2F5LiBUaGlzIG1heSBsZWFkIHRvIHRoZVxyXG4gKiBicm9hZGNhc3Qgb2YgTm90aWZpY2F0aW9ucyB0byB0cmlnZ2VyIGNvbW1hbmRzIG9yIHRvIGNvbW11bmljYXRlIHdpdGggb3RoZXJcclxuICogTWVkaWF0b3JzLiB7QGxpbmsgcHVyZW12Yy5Qcm94eSBQcm94eX0sXHJcbiAqIHtAbGluayBwdXJlbXZjLlNpbXBsZUNvbW1hbmQgU2ltcGxlQ29tbWFuZH1cclxuICogYW5kIHtAbGluayBwdXJlbXZjLk1hY3JvQ29tbWFuZCBNYWNyb0NvbW1hbmR9XHJcbiAqIGluc3RhbmNlcyBjb21tdW5pY2F0ZSB3aXRoIGVhY2ggb3RoZXIgYW5kXHJcbiAqIHtAbGluayBwdXJlbXZjLk1lZGlhdG9yIE1lZGlhdG9yfXNcclxuICogYnkgYnJvYWRjYXN0aW5nIE5vdGlmaWNhdGlvbnMuXHJcbiAqXHJcbiAqIEEga2V5IGRpZmZlcmVuY2UgYmV0d2VlbiBicm93c2VyIGV2ZW50cyBhbmQgUHVyZU1WQyBOb3RpZmljYXRpb25zIGlzIHRoYXRcclxuICogZXZlbnRzIGZvbGxvdyB0aGUgJ0NoYWluIG9mIFJlc3BvbnNpYmlsaXR5JyBwYXR0ZXJuLCAnYnViYmxpbmcnIHVwIHRoZVxyXG4gKiBkaXNwbGF5IGhpZXJhcmNoeSB1bnRpbCBzb21lIHBhcmVudCBjb21wb25lbnQgaGFuZGxlcyB0aGUgZXZlbnQsIHdoaWxlXHJcbiAqIFB1cmVNVkMgTm90aWZpY2F0aW9uIGZvbGxvdyBhICdQdWJsaXNoL1N1YnNjcmliZScgcGF0dGVybi4gUHVyZU1WQyBjbGFzc2VzXHJcbiAqIG5lZWQgbm90IGJlIHJlbGF0ZWQgdG8gZWFjaCBvdGhlciBpbiBhIHBhcmVudC9jaGlsZCByZWxhdGlvbnNoaXAgaW4gb3JkZXIgdG9cclxuICogY29tbXVuaWNhdGUgd2l0aCBvbmUgYW5vdGhlciB1c2luZyBOb3RpZmljYXRpb25zLlxyXG4gKlxyXG4gKiBAY29uc3RydWN0b3JcclxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICogIFRoZSBOb3RpZmljYXRpb24gbmFtZVxyXG4gKiBAcGFyYW0ge09iamVjdH0gW2JvZHldXHJcbiAqICBUaGUgTm90aWZpY2F0aW9uIGJvZHlcclxuICogQHBhcmFtIHtPYmplY3R9IFt0eXBlXVxyXG4gKiAgVGhlIE5vdGlmaWNhdGlvbiB0eXBlXHJcbiAqL1xyXG5mdW5jdGlvbiBOb3RpZmljYXRpb24obmFtZSwgYm9keSwgdHlwZSlcclxue1xyXG4gICAgdGhpcy5uYW1lPSBuYW1lO1xyXG4gICAgdGhpcy5ib2R5PSBib2R5O1xyXG4gICAgdGhpcy50eXBlPSB0eXBlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgbmFtZSBvZiB0aGUgTm90aWZpY2F0aW9uIGluc3RhbmNlXHJcbiAqXHJcbiAqIEByZXR1cm4ge3N0cmluZ31cclxuICogIFRoZSBuYW1lIG9mIHRoZSBOb3RpZmljYXRpb24gaW5zdGFuY2VcclxuICovXHJcbk5vdGlmaWNhdGlvbi5wcm90b3R5cGUuZ2V0TmFtZT0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICByZXR1cm4gdGhpcy5uYW1lO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNldCB0aGlzIE5vdGlmaWNhdGlvbnMgYm9keS5cclxuICogQHBhcmFtIHtPYmplY3R9IGJvZHlcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbk5vdGlmaWNhdGlvbi5wcm90b3R5cGUuc2V0Qm9keT0gZnVuY3Rpb24oYm9keSlcclxue1xyXG4gICAgdGhpcy5ib2R5PSBib2R5O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgTm90aWZpY2F0aW9uIGJvZHkuXHJcbiAqXHJcbiAqIEByZXR1cm4ge09iamVjdH1cclxuICovXHJcbk5vdGlmaWNhdGlvbi5wcm90b3R5cGUuZ2V0Qm9keT0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICByZXR1cm4gdGhpcy5ib2R5XHJcbn07XHJcblxyXG4vKipcclxuICogU2V0IHRoZSB0eXBlIG9mIHRoZSBOb3RpZmljYXRpb24gaW5zdGFuY2UuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSB0eXBlXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5Ob3RpZmljYXRpb24ucHJvdG90eXBlLnNldFR5cGU9IGZ1bmN0aW9uKHR5cGUpXHJcbntcclxuICAgIHRoaXMudHlwZT0gdHlwZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIHR5cGUgb2YgdGhlIE5vdGlmaWNhdGlvbiBpbnN0YW5jZS5cclxuICpcclxuICogQHJldHVybiB7T2JqZWN0fVxyXG4gKi9cclxuTm90aWZpY2F0aW9uLnByb3RvdHlwZS5nZXRUeXBlPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHJldHVybiB0aGlzLnR5cGU7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0IGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBOb3RpZmljYXRpb24gaW5zdGFuY2VcclxuICpcclxuICogQHJldHVybiB7c3RyaW5nfVxyXG4gKi9cclxuTm90aWZpY2F0aW9uLnByb3RvdHlwZS50b1N0cmluZz0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICB2YXIgbXNnPSBcIk5vdGlmaWNhdGlvbiBOYW1lOiBcIiArIHRoaXMuZ2V0TmFtZSgpO1xyXG4gICAgbXNnKz0gXCJcXG5Cb2R5OlwiICsgKCh0aGlzLmJvZHkgPT0gbnVsbCApID8gXCJudWxsXCIgOiB0aGlzLmJvZHkudG9TdHJpbmcoKSk7XHJcbiAgICBtc2crPSBcIlxcblR5cGU6XCIgKyAoKHRoaXMudHlwZSA9PSBudWxsICkgPyBcIm51bGxcIiA6IHRoaXMudHlwZSk7XHJcbiAgICByZXR1cm4gbXNnO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRoZSBOb3RpZmljYXRpb25zIG5hbWUuXHJcbiAqXHJcbiAqIEB0eXBlIHtzdHJpbmd9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5Ob3RpZmljYXRpb24ucHJvdG90eXBlLm5hbWU9IG51bGw7XHJcblxyXG4vKipcclxuICogVGhlIE5vdGlmaWNhdGlvbnMgdHlwZS5cclxuICpcclxuICogQHR5cGUge3N0cmluZ31cclxuICogQHByaXZhdGVcclxuICovXHJcbk5vdGlmaWNhdGlvbi5wcm90b3R5cGUudHlwZT0gbnVsbDtcclxuXHJcbi8qKlxyXG4gKiBUaGUgTm90aWZpY2F0aW9ucyBib2R5LlxyXG4gKlxyXG4gKiBAdHlwZSB7T2JqZWN0fVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuTm90aWZpY2F0aW9uLnByb3RvdHlwZS5ib2R5PSBudWxsO1xyXG4vKipcclxuICogQGF1dGhvciBQdXJlTVZDIEpTIE5hdGl2ZSBQb3J0IGJ5IERhdmlkIEZvbGV5LCBGcsOpZMOpcmljIFNhdW5pZXIsICYgQWxhaW4gRHVjaGVzbmVhdVxyXG4gKiBAYXV0aG9yIENvcHlyaWdodChjKSAyMDA2LTIwMTIgRnV0dXJlc2NhbGUsIEluYy4sIFNvbWUgcmlnaHRzIHJlc2VydmVkLlxyXG4gKlxyXG4gKiBAY2xhc3MgcHVyZW12Yy5Ob3RpZmllclxyXG4gKlxyXG4gKiBBIEJhc2UgTm90aWZpZXIgaW1wbGVtZW50YXRpb24uXHJcbiAqXHJcbiAqIHtAbGluayBwdXJlbXZjLk1hY3JvQ29tbWFuZCBNYWNyb0NvbW1hbmR9LFxyXG4gKiB7QGxpbmsgcHVyZW12Yy5TaW1wbGVDb21tYW5kIFNpbXBsZUNvbW1hbmR9LFxyXG4gKiB7QGxpbmsgcHVyZW12Yy5NZWRpYXRvciBNZWRpYXRvcn0gYW5kXHJcbiAqIHtAbGluayBwdXJlbXZjLlByb3h5IFByb3h5fVxyXG4gKiBhbGwgaGF2ZSBhIG5lZWQgdG8gc2VuZCBOb3RpZmljYXRpb25zXHJcbiAqXHJcbiAqIFRoZSBOb3RpZmllciBpbnRlcmZhY2UgcHJvdmlkZXMgYSBjb21tb24gbWV0aG9kIGNhbGxlZCAjc2VuZE5vdGlmaWNhdGlvbiB0aGF0XHJcbiAqIHJlbGlldmVzIGltcGxlbWVudGF0aW9uIGNvZGUgb2YgdGhlIG5lY2Vzc2l0eSB0byBhY3R1YWxseSBjb25zdHJ1Y3RcclxuICogTm90aWZpY2F0aW9ucy5cclxuICpcclxuICogVGhlIE5vdGlmaWVyIGNsYXNzLCB3aGljaCBhbGwgb2YgdGhlIGFib3ZlIG1lbnRpb25lZCBjbGFzc2VzXHJcbiAqIGV4dGVuZCwgcHJvdmlkZXMgYW4gaW5pdGlhbGl6ZWQgcmVmZXJlbmNlIHRvIHRoZVxyXG4gKiB7QGxpbmsgcHVyZW12Yy5GYWNhZGUgRmFjYWRlfVxyXG4gKiBNdWx0aXRvbiwgd2hpY2ggaXMgcmVxdWlyZWQgZm9yIHRoZSBjb252aWVuaWVuY2UgbWV0aG9kXHJcbiAqIGZvciBzZW5kaW5nIE5vdGlmaWNhdGlvbnMgYnV0IGFsc28gZWFzZXMgaW1wbGVtZW50YXRpb24gYXMgdGhlc2VcclxuICogY2xhc3NlcyBoYXZlIGZyZXF1ZW50XHJcbiAqIHtAbGluayBwdXJlbXZjLkZhY2FkZSBGYWNhZGV9IGludGVyYWN0aW9uc1xyXG4gKiBhbmQgdXN1YWxseSByZXF1aXJlIGFjY2VzcyB0byB0aGUgZmFjYWRlIGFueXdheS5cclxuICpcclxuICogTk9URTogSW4gdGhlIE11bHRpQ29yZSB2ZXJzaW9uIG9mIHRoZSBmcmFtZXdvcmssIHRoZXJlIGlzIG9uZSBjYXZlYXQgdG9cclxuICogbm90aWZpZXJzLCB0aGV5IGNhbm5vdCBzZW5kIG5vdGlmaWNhdGlvbnMgb3IgcmVhY2ggdGhlIGZhY2FkZSB1bnRpbCB0aGV5XHJcbiAqIGhhdmUgYSB2YWxpZCBtdWx0aXRvbktleS5cclxuICpcclxuICogVGhlIG11bHRpdG9uS2V5IGlzIHNldDpcclxuICogICAtIG9uIGEgQ29tbWFuZCB3aGVuIGl0IGlzIGV4ZWN1dGVkIGJ5IHRoZSBDb250cm9sbGVyXHJcbiAqICAgLSBvbiBhIE1lZGlhdG9yIGlzIHJlZ2lzdGVyZWQgd2l0aCB0aGUgVmlld1xyXG4gKiAgIC0gb24gYSBQcm94eSBpcyByZWdpc3RlcmVkIHdpdGggdGhlIE1vZGVsLlxyXG4gKlxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIE5vdGlmaWVyKClcclxue1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhbmQgc2VuZCBhIE5vdGlmaWNhdGlvbi5cclxuICpcclxuICogS2VlcHMgdXMgZnJvbSBoYXZpbmcgdG8gY29uc3RydWN0IG5ldyBOb3RpZmljYXRpb24gaW5zdGFuY2VzIGluIG91clxyXG4gKiBpbXBsZW1lbnRhdGlvbiBjb2RlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbm90aWZpY2F0aW9uTmFtZVxyXG4gKiAgQSBub3RpZmljYXRpb24gbmFtZVxyXG4gKiBAcGFyYW0ge09iamVjdH0gW2JvZHldXHJcbiAqICBUaGUgYm9keSBvZiB0aGUgbm90aWZpY2F0aW9uXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbdHlwZV1cclxuICogIFRoZSBub3RpZmljYXRpb24gdHlwZVxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuTm90aWZpZXIucHJvdG90eXBlLnNlbmROb3RpZmljYXRpb24gPSBmdW5jdGlvbihub3RpZmljYXRpb25OYW1lLCBib2R5LCB0eXBlKVxyXG57XHJcbiAgICB2YXIgZmFjYWRlID0gdGhpcy5nZXRGYWNhZGUoKTtcclxuICAgIGlmKGZhY2FkZSlcclxuICAgIHtcclxuICAgICAgICBmYWNhZGUuc2VuZE5vdGlmaWNhdGlvbihub3RpZmljYXRpb25OYW1lLCBib2R5LCB0eXBlKTtcclxuICAgIH1cclxufTtcclxuXHJcblxyXG4vKipcclxuICogQHByb3RlY3RlZFxyXG4gKiBBIHJlZmVyZW5jZSB0byB0aGlzIE5vdGlmaWVyJ3MgRmFjYWRlLiBUaGlzIHJlZmVyZW5jZSB3aWxsIG5vdCBiZSBhdmFpbGFibGVcclxuICogdW50aWwgI2luaXRpYWxpemVOb3RpZmllciBoYXMgYmVlbiBjYWxsZWQuXHJcbiAqXHJcbiAqIEB0eXBlIHtwdXJlbXZjLkZhY2FkZX1cclxuICovXHJcbk5vdGlmaWVyLnByb3RvdHlwZS5mYWNhZGU7XHJcblxyXG4vKipcclxuICogSW5pdGlhbGl6ZSB0aGlzIE5vdGlmaWVyIGluc3RhbmNlLlxyXG4gKlxyXG4gKiBUaGlzIGlzIGhvdyBhIE5vdGlmaWVyIGdldHMgaXRzIG11bHRpdG9uS2V5LlxyXG4gKiBDYWxscyB0byAjc2VuZE5vdGlmaWNhdGlvbiBvciB0byBhY2Nlc3MgdGhlXHJcbiAqIGZhY2FkZSB3aWxsIGZhaWwgdW50aWwgYWZ0ZXIgdGhpcyBtZXRob2RcclxuICogaGFzIGJlZW4gY2FsbGVkLlxyXG4gKlxyXG4gKiBNZWRpYXRvcnMsIENvbW1hbmRzIG9yIFByb3hpZXMgbWF5IG92ZXJyaWRlXHJcbiAqIHRoaXMgbWV0aG9kIGluIG9yZGVyIHRvIHNlbmQgbm90aWZpY2F0aW9uc1xyXG4gKiBvciBhY2Nlc3MgdGhlIE11bHRpdG9uIEZhY2FkZSBpbnN0YW5jZSBhc1xyXG4gKiBzb29uIGFzIHBvc3NpYmxlLiBUaGV5IENBTk5PVCBhY2Nlc3MgdGhlIGZhY2FkZVxyXG4gKiBpbiB0aGVpciBjb25zdHJ1Y3RvcnMsIHNpbmNlIHRoaXMgbWV0aG9kIHdpbGwgbm90XHJcbiAqIHlldCBoYXZlIGJlZW4gY2FsbGVkLlxyXG4gKlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5XHJcbiAqICBUaGUgTm90aWZpZXJzIG11bHRpdG9uIGtleTtcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbk5vdGlmaWVyLnByb3RvdHlwZS5pbml0aWFsaXplTm90aWZpZXIgPSBmdW5jdGlvbihrZXkpXHJcbntcclxuICAgIHRoaXMubXVsdGl0b25LZXkgPSBTdHJpbmcoa2V5KTtcclxuICAgIHRoaXMuZmFjYWRlPSB0aGlzLmdldEZhY2FkZSgpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHJpZXZlIHRoZSBNdWx0aXRvbiBGYWNhZGUgaW5zdGFuY2VcclxuICpcclxuICpcclxuICogQHByb3RlY3RlZFxyXG4gKiBAcmV0dXJuIHtwdXJlbXZjLkZhY2FkZX1cclxuICovXHJcbk5vdGlmaWVyLnByb3RvdHlwZS5nZXRGYWNhZGUgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIGlmKHRoaXMubXVsdGl0b25LZXkgPT0gbnVsbClcclxuICAgIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoTm90aWZpZXIuTVVMVElUT05fTVNHKTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIEZhY2FkZS5nZXRJbnN0YW5jZSh0aGlzLm11bHRpdG9uS2V5KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqIFRoZSBOb3RpZmllcnMgaW50ZXJuYWwgbXVsdGl0b24ga2V5LlxyXG4gKlxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEB0eXBlIHN0cmluZ1xyXG4gKi9cclxuTm90aWZpZXIucHJvdG90eXBlLm11bHRpdG9uS2V5ID0gbnVsbDtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqIFRoZSBlcnJvciBtZXNzYWdlIHVzZWQgaWYgdGhlIE5vdGlmaWVyIGlzIG5vdCBpbml0aWFsaXplZCBjb3JyZWN0bHkgYW5kXHJcbiAqIGF0dGVtcHRzIHRvIHJldHJpZXZlIGl0cyBvd24gbXVsdGl0b24ga2V5XHJcbiAqXHJcbiAqIEBzdGF0aWNcclxuICogQHByb3RlY3RlZFxyXG4gKiBAY29uc3RcclxuICogQHR5cGUgc3RyaW5nXHJcbiAqL1xyXG5Ob3RpZmllci5NVUxUSVRPTl9NU0cgPSBcIm11bHRpdG9uS2V5IGZvciB0aGlzIE5vdGlmaWVyIG5vdCB5ZXQgaW5pdGlhbGl6ZWQhXCI7XHJcbi8qKlxyXG4gKiBAYXV0aG9yIFB1cmVNVkMgSlMgTmF0aXZlIFBvcnQgYnkgRGF2aWQgRm9sZXksIEZyw6lkw6lyaWMgU2F1bmllciwgJiBBbGFpbiBEdWNoZXNuZWF1XHJcbiAqIEBhdXRob3IgQ29weXJpZ2h0KGMpIDIwMDYtMjAxMiBGdXR1cmVzY2FsZSwgSW5jLiwgU29tZSByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIEBjbGFzcyBwdXJlbXZjLlNpbXBsZUNvbW1hbmRcclxuICogQGV4dGVuZHMgcHVyZW12Yy5Ob3RpZmllclxyXG4gKlxyXG4gKiBTaW1wbGVDb21tYW5kcyBlbmNhcHN1bGF0ZSB0aGUgYnVzaW5lc3MgbG9naWMgb2YgeW91ciBhcHBsaWNhdGlvbi4gWW91clxyXG4gKiBzdWJjbGFzcyBzaG91bGQgb3ZlcnJpZGUgdGhlICNleGVjdXRlIG1ldGhvZCB3aGVyZSB5b3VyIGJ1c2luZXNzIGxvZ2ljIHdpbGxcclxuICogaGFuZGxlIHRoZVxyXG4gKiB7QGxpbmsgcHVyZW12Yy5Ob3RpZmljYXRpb24gTm90aWZpY2F0aW9ufVxyXG4gKlxyXG4gKiBUYWtlIGEgbG9vayBhdFxyXG4gKiB7QGxpbmsgcHVyZW12Yy5GYWNhZGUjcmVnaXN0ZXJDb21tYW5kIEZhY2FkZSdzIHJlZ2lzdGVyQ29tbWFuZH1cclxuICogb3Ige0BsaW5rIHB1cmVtdmMuQ29udHJvbGxlciNyZWdpc3RlckNvbW1hbmQgQ29udHJvbGxlcnMgcmVnaXN0ZXJDb21tYW5kfVxyXG4gKiBtZXRob2RzIHRvIHNlZSBob3cgdG8gYWRkIGNvbW1hbmRzIHRvIHlvdXIgYXBwbGljYXRpb24uXHJcbiAqXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gU2ltcGxlQ29tbWFuZCAoKSB7IH07XHJcblxyXG5TaW1wbGVDb21tYW5kLnByb3RvdHlwZT0gbmV3IE5vdGlmaWVyO1xyXG5TaW1wbGVDb21tYW5kLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj0gU2ltcGxlQ29tbWFuZDtcclxuXHJcbi8qKlxyXG4gKiBGdWxmaWxsIHRoZSB1c2UtY2FzZSBpbml0aWF0ZWQgYnkgdGhlIGdpdmVuIE5vdGlmaWNhdGlvblxyXG4gKlxyXG4gKiBJbiB0aGUgQ29tbWFuZCBQYXR0ZXJuLCBhbiBhcHBsaWNhdGlvbiB1c2UtY2FzZSB0eXBpY2FsbHkgYmVnaW5zIHdpdGggc29tZVxyXG4gKiB1c2VyIGFjdGlvbiwgd2hpY2ggcmVzdWx0cyBpbiBhIE5vdGlmaWNhdGlvbiBpcyBoYW5kbGVkIGJ5IHRoZSBidXNpbmVzcyBsb2dpY1xyXG4gKiBpbiB0aGUgI2V4ZWN1dGUgbWV0aG9kIG9mIGEgY29tbWFuZC5cclxuICpcclxuICogQHBhcmFtIHtwdXJlbXZjLk5vdGlmaWNhdGlvbn0gbm90aWZpY2F0aW9uXHJcbiAqICBUaGUgbm90aWZpY2F0aW9uIHRvIGhhbmRsZS5cclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcblNpbXBsZUNvbW1hbmQucHJvdG90eXBlLmV4ZWN1dGU9IGZ1bmN0aW9uIChub3RpZmljYXRpb24pIHsgfTtcclxuLyoqXHJcbiAqIEBhdXRob3IgUHVyZU1WQyBKUyBOYXRpdmUgUG9ydCBieSBEYXZpZCBGb2xleSwgRnLDqWTDqXJpYyBTYXVuaWVyLCAmIEFsYWluIER1Y2hlc25lYXVcclxuICogQGF1dGhvciBDb3B5cmlnaHQoYykgMjAwNi0yMDEyIEZ1dHVyZXNjYWxlLCBJbmMuLCBTb21lIHJpZ2h0cyByZXNlcnZlZC5cclxuICpcclxuICogQGNsYXNzIHB1cmVtdmMuTWFjcm9Db21tYW5kXHJcbiAqIEBleHRlbmRzIHB1cmVtdmMuTm90aWZpZXJcclxuICpcclxuICogQSBiYXNlIGNvbW1hbmQgaW1wbGVtZW50YXRpb24gdGhhdCBleGVjdXRlcyBvdGhlciBjb21tYW5kcywgc3VjaCBhc1xyXG4gKiB7QGxpbmsgcHVyZW12Yy5TaW1wbGVDb21tYW5kIFNpbXBsZUNvbW1hbmR9XHJcbiAqIG9yIHtAbGluayBwdXJlbXZjLk1hY3JvQ29tbWFuZCBNYWNyb0NvbW1hbmR9XHJcbiAqIHN1YmNsYXNzZXMuXHJcbiAqXHJcbiAqIEEgTWFjcm9Db21tYW5kIG1haW50YWlucyBhbiBsaXN0IG9mXHJcbiAqIGNvbW1hbmQgY29uc3RydWN0b3IgcmVmZXJlbmNlcyBjYWxsZWQgKlN1YkNvbW1hbmRzKi5cclxuICpcclxuICogV2hlbiAjZXhlY3V0ZSBpcyBjYWxsZWQsIHRoZSBNYWNyb0NvbW1hbmRcclxuICogaW5zdGFudGlhdGVzIGFuZCBjYWxscyAjZXhlY3V0ZSBvbiBlYWNoIG9mIGl0cyAqU3ViQ29tbWFuZHMqIGluIHR1cm4uXHJcbiAqIEVhY2ggKlN1YkNvbW1hbmQqIHdpbGwgYmUgcGFzc2VkIGEgcmVmZXJlbmNlIHRvIHRoZSBvcmlnaW5hbFxyXG4gKiB7QGxpbmsgcHVyZW12Yy5Ob3RpZmljYXRpb24gTm90aWZpY2F0aW9ufVxyXG4gKiB0aGF0IHdhcyBwYXNzZWQgdG8gdGhlIE1hY3JvQ29tbWFuZHMgI2V4ZWN1dGUgbWV0aG9kXHJcbiAqXHJcbiAqIFVubGlrZSB7QGxpbmsgcHVyZW12Yy5TaW1wbGVDb21tYW5kIFNpbXBsZUNvbW1hbmR9LFxyXG4gKiB5b3VyIHN1YmNsYXNzIHNob3VsZCBub3Qgb3ZlcnJpZGUgI2V4ZWN1dGUgYnV0IGluc3RlYWQsIHNob3VsZFxyXG4gKiBvdmVycmlkZSB0aGUgI2luaXRpYWxpemVNYWNyb0NvbW1hbmQgbWV0aG9kLCBjYWxsaW5nICNhZGRTdWJDb21tYW5kIG9uY2UgZm9yXHJcbiAqIGVhY2ggKlN1YkNvbW1hbmQqIHRvIGJlIGV4ZWN1dGVkLlxyXG4gKlxyXG4gKiBJZiB5b3VyIHN1YmNsYXNzIGRvZXMgZGVmaW5lIGEgY29uc3RydWN0b3IsIGJlIHN1cmUgdG8gY2FsbCBcInN1cGVyXCIgbGlrZSBzb1xyXG4gKlxyXG4gKiAgICAgZnVuY3Rpb24gTXlNYWNyb0NvbW1hbmQgKClcclxuICogICAgIHtcclxuICogICAgICAgICBNYWNyb0NvbW1hbmQuY2FsbCh0aGlzKTtcclxuICogICAgIH07XHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gTWFjcm9Db21tYW5kKClcclxue1xyXG4gICAgdGhpcy5zdWJDb21tYW5kcz0gW107XHJcbiAgICB0aGlzLmluaXRpYWxpemVNYWNyb0NvbW1hbmQoKTtcclxufTtcclxuXHJcbi8qIHN1YmNsYXNzIE5vdGlmaWVyICovXHJcbk1hY3JvQ29tbWFuZC5wcm90b3R5cGU9IG5ldyBOb3RpZmllcjtcclxuTWFjcm9Db21tYW5kLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj0gTWFjcm9Db21tYW5kO1xyXG5cclxuLyoqXHJcbiAqIEBwcml2YXRlXHJcbiAqIEB0eXBlIHtBcnJheS48cHVyZW12Yy5TaW1wbGVDb21tYW5kfHB1cmVtdmMuTWFjcm9Db21tYW5kPn1cclxuICovXHJcbk1hY3JvQ29tbWFuZC5wcm90b3R5cGUuc3ViQ29tbWFuZHM9IG51bGw7XHJcblxyXG4vKipcclxuICogQHByb3RlY3RlZFxyXG4gKiBJbml0aWFsaXplIHRoZSBNYWNyb0NvbW1hbmQuXHJcbiAqXHJcbiAqIEluIHlvdXIgc3ViY2xhc3MsIG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvXHJcbiAqIGluaXRpYWxpemUgdGhlIE1hY3JvQ29tbWFuZCdzICpTdWJDb21tYW5kKlxyXG4gKiBsaXN0IHdpdGggY29tbWFuZCBjbGFzcyByZWZlcmVuY2VzIGxpa2VcclxuICogdGhpczpcclxuICpcclxuICogICAgIC8vIEluaXRpYWxpemUgTXlNYWNyb0NvbW1hbmRcclxuICogICAgIE15TWFjcm9Db21tYW5kLnByb3RvdHlwZS5pbml0aWFsaXplTWFjcm9Db21tYW5kPSBmdW5jdGlvbiAoKVxyXG4gKiAgICAge1xyXG4gKiAgICAgICAgIHRoaXMuYWRkU3ViQ29tbWFuZCggY29tLm1lLm15YXBwLmNvbnRyb2xsZXIuRmlyc3RDb21tYW5kICk7XHJcbiAqICAgICAgICAgdGhpcy5hZGRTdWJDb21tYW5kKCBjb20ubWUubXlhcHAuY29udHJvbGxlci5TZWNvbmRDb21tYW5kICk7XHJcbiAqICAgICAgICAgdGhpcy5hZGRTdWJDb21tYW5kKCBjb20ubWUubXlhcHAuY29udHJvbGxlci5UaGlyZENvbW1hbmQgKTtcclxuICogICAgIH07XHJcbiAqXHJcbiAqIE5vdGUgdGhhdCAqU3ViQ29tbWFuZCpzIG1heSBiZSBhbnkgY29tbWFuZCBpbXBsZW1lbnRvcixcclxuICogTWFjcm9Db21tYW5kcyBvciBTaW1wbGVDb21tYW5kcyBhcmUgYm90aCBhY2NlcHRhYmxlLlxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuTWFjcm9Db21tYW5kLnByb3RvdHlwZS5pbml0aWFsaXplTWFjcm9Db21tYW5kPSBmdW5jdGlvbigpIHt9XHJcblxyXG4vKipcclxuICogQHByb3RlY3RlZFxyXG4gKiBBZGQgYSAqU3ViQ29tbWFuZCpcclxuICpcclxuICogVGhlICpTdWJDb21tYW5kKnMgd2lsbCBiZSBjYWxsZWQgaW4gRmlyc3QgSW4gLyBGaXJzdCBPdXQgKEZJRk8pIG9yZGVyXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbW1hbmRDbGFzc1JlZlxyXG4gKiAgQSByZWZlcmVuY2UgdG8gYSBzdWJjbGFzc2VkIFNpbXBsZUNvbW1hbmQgb3IgTWFjcm9Db21tYW5kIGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5NYWNyb0NvbW1hbmQucHJvdG90eXBlLmFkZFN1YkNvbW1hbmQ9IGZ1bmN0aW9uKGNvbW1hbmRDbGFzc1JlZilcclxue1xyXG4gICAgdGhpcy5zdWJDb21tYW5kcy5wdXNoKGNvbW1hbmRDbGFzc1JlZik7XHJcbn07XHJcblxyXG4vKipcclxuICogRXhlY3V0ZSB0aGlzIE1hY3JvQ29tbWFuZHMgKlN1YkNvbW1hbmRzKlxyXG4gKlxyXG4gKiBUaGUgKlN1YkNvbW1hbmQqcyB3aWxsIGJlIGNhbGxlZCBpbiBGaXJzdCBJbiAvIEZpcnN0IE91dCAoRklGTykgb3JkZXJcclxuICogQHBhcmFtIHtwdXJlbXZjLk5vdGlmaWNhdGlvbn0gbm90ZVxyXG4gKiAgVGhlIE5vdGlmaWNhdGlvbiBvYmplY3QgdG8gYmUgcGFzc2VkIHRvIGVhY2ggKlN1YkNvbW1hbmQqXHJcbiAqL1xyXG5NYWNyb0NvbW1hbmQucHJvdG90eXBlLmV4ZWN1dGU9IGZ1bmN0aW9uKG5vdGUpXHJcbntcclxuICAgIC8vIFNJQy0gVE9ETyBvcHRpbWl6ZVxyXG4gICAgd2hpbGUodGhpcy5zdWJDb21tYW5kcy5sZW5ndGggPiAwKVxyXG4gICAge1xyXG4gICAgICAgIHZhciByZWY9IHRoaXMuc3ViQ29tbWFuZHMuc2hpZnQoKTtcclxuICAgICAgICB2YXIgY21kPSBuZXcgcmVmO1xyXG4gICAgICAgIGNtZC5pbml0aWFsaXplTm90aWZpZXIodGhpcy5tdWx0aXRvbktleSk7XHJcbiAgICAgICAgY21kLmV4ZWN1dGUobm90ZSk7XHJcbiAgICB9XHJcbn07XHJcbi8qKlxyXG4gKiBAYXV0aG9yIFB1cmVNVkMgSlMgTmF0aXZlIFBvcnQgYnkgRGF2aWQgRm9sZXksIEZyw6lkw6lyaWMgU2F1bmllciwgJiBBbGFpbiBEdWNoZXNuZWF1XHJcbiAqIEBhdXRob3IgQ29weXJpZ2h0KGMpIDIwMDYtMjAxMiBGdXR1cmVzY2FsZSwgSW5jLiwgU29tZSByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIEBjbGFzcyBwdXJlbXZjLk1lZGlhdG9yXHJcbiAqIEBleHRlbmRzIHB1cmVtdmMuTm90aWZpZXJcclxuICpcclxuICogQSBiYXNlIE1lZGlhdG9yIGltcGxlbWVudGF0aW9uLlxyXG4gKlxyXG4gKiBJbiBQdXJlTVZDLCBNZWRpYXRvciBjbGFzc2VzIGFyZSB1c2VkIHRvIG1lZGlhdGUgY29tbXVuaWNhdGlvbiBiZXR3ZWVuIGEgdmlld1xyXG4gKiBjb21wb25lbnQgYW5kIHRoZSByZXN0IG9mIHRoZSBhcHBsaWNhdGlvbi5cclxuICpcclxuICogQSBNZWRpYXRvciBzaG91bGQgbGlzdGVuIHRvIGl0cyB2aWV3IGNvbXBvbmVudHMgZm9yIGV2ZW50cywgYW5kIGhhbmRsZSB0aGVtXHJcbiAqIGJ5IHNlbmRpbmcgbm90aWZpY2F0aW9ucyAodG8gYmUgaGFuZGxlZCBieSBvdGhlciBNZWRpYXRvcnMsXHJcbiAqIHtAbGluayBwdXJlbXZjLlNpbXBsZUNvbW1hbmQgU2ltcGxlQ29tbWFuZHN9XHJcbiAqIG9yXHJcbiAqIHtAbGluayBwdXJlbXZjLk1hY3JvQ29tbWFuZCBNYWNyb0NvbW1hbmRzfSlcclxuICogb3IgcGFzc2luZyBkYXRhIGZyb20gdGhlIHZpZXcgY29tcG9uZW50IGRpcmVjdGx5IHRvIGFcclxuICoge0BsaW5rIHB1cmVtdmMuUHJveHkgUHJveHl9LCBzdWNoIGFzIHN1Ym1pdHRpbmdcclxuICogdGhlIGNvbnRlbnRzIG9mIGEgZm9ybSB0byBhIHNlcnZpY2UuXHJcbiAqXHJcbiAqIE1lZGlhdG9ycyBzaG91bGQgbm90IHBlcmZvcm0gYnVzaW5lc3MgbG9naWMsIG1haW50YWluIHN0YXRlIG9yIG90aGVyXHJcbiAqIGluZm9ybWF0aW9uIGZvciBpdHMgdmlldyBjb21wb25lbnQsIG9yIGJyZWFrIHRoZSBlbmNhcHN1bGF0aW9uIG9mIHRoZSB2aWV3XHJcbiAqIGNvbXBvbmVudCBieSBtYW5pcHVsYXRpbmcgdGhlIHZpZXcgY29tcG9uZW50J3MgY2hpbGRyZW4uIEl0IHNob3VsZCBvbmx5IGNhbGxcclxuICogbWV0aG9kcyBvciBzZXQgcHJvcGVydGllcyBvbiB0aGUgdmlldyBjb21wb25lbnQuXHJcbiAqXHJcbiAqIFRoZSB2aWV3IGNvbXBvbmVudCBzaG91bGQgZW5jYXBzdWxhdGUgaXRzIG93biBiZWhhdmlvciBhbmQgaW1wbGVtZW50YXRpb24gYnlcclxuICogZXhwb3NpbmcgbWV0aG9kcyBhbmQgcHJvcGVydGllcyB0aGF0IHRoZSBNZWRpYXRvciBjYW4gY2FsbCB3aXRob3V0IGhhdmluZyB0b1xyXG4gKiBrbm93IGFib3V0IHRoZSB2aWV3IGNvbXBvbmVudCdzIGNoaWxkcmVuLlxyXG4gKlxyXG4gKiBAY29uc3RydWN0b3JcclxuICogQHBhcmFtIHtzdHJpbmd9IFttZWRpYXRvck5hbWVdXHJcbiAqICBUaGUgTWVkaWF0b3JzIG5hbWUuIFRoZSBNZWRpYXRvcnMgc3RhdGljICNOQU1FIHZhbHVlIGlzIHVzZWQgYnkgZGVmYXVsdFxyXG4gKiBAcGFyYW0ge09iamVjdH0gW3ZpZXdDb21wb25lbnRdXHJcbiAqICBUaGUgTWVkaWF0b3JzIHtAbGluayAjc2V0Vmlld0NvbXBvbmVudCB2aWV3Q29tcG9uZW50fS5cclxuICovXHJcbmZ1bmN0aW9uIE1lZGlhdG9yIChtZWRpYXRvck5hbWUsIHZpZXdDb21wb25lbnQpXHJcbntcclxuICAgIHRoaXMubWVkaWF0b3JOYW1lPSBtZWRpYXRvck5hbWUgfHwgdGhpcy5jb25zdHJ1Y3Rvci5OQU1FO1xyXG4gICAgdGhpcy52aWV3Q29tcG9uZW50PXZpZXdDb21wb25lbnQ7XHJcbn07XHJcblxyXG4vKipcclxuICogQHN0YXRpY1xyXG4gKiBUaGUgbmFtZSBvZiB0aGUgTWVkaWF0b3IuXHJcbiAqXHJcbiAqIFR5cGljYWxseSwgYSBNZWRpYXRvciB3aWxsIGJlIHdyaXR0ZW4gdG8gc2VydmUgb25lIHNwZWNpZmljIGNvbnRyb2wgb3IgZ3JvdXBcclxuICogb2YgY29udHJvbHMgYW5kIHNvLCB3aWxsIG5vdCBoYXZlIGEgbmVlZCB0byBiZSBkeW5hbWljYWxseSBuYW1lZC5cclxuICpcclxuICogQHR5cGUge3N0cmluZ31cclxuICovXHJcbk1lZGlhdG9yLk5BTUU9IFwiTWVkaWF0b3JcIjtcclxuXHJcbi8qIHN1YmNsYXNzICovXHJcbk1lZGlhdG9yLnByb3RvdHlwZT0gbmV3IE5vdGlmaWVyO1xyXG5NZWRpYXRvci5wcm90b3R5cGUuY29uc3RydWN0b3I9IE1lZGlhdG9yO1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgbmFtZSBvZiB0aGUgTWVkaWF0b3JcclxuICpcclxuICogQHJldHVybiB7c3RyaW5nfVxyXG4gKiAgVGhlIE1lZGlhdG9yIG5hbWVcclxuICovXHJcbk1lZGlhdG9yLnByb3RvdHlwZS5nZXRNZWRpYXRvck5hbWU9IGZ1bmN0aW9uICgpXHJcbntcclxuICAgIHJldHVybiB0aGlzLm1lZGlhdG9yTmFtZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIE1lZGlhdG9ycyB2aWV3IGNvbXBvbmVudC4gVGhpcyBjb3VsZFxyXG4gKiBiZSBhIEhUTUxFbGVtZW50LCBhIGJlc3Bva2UgVWlDb21wb25lbnQgd3JhcHBlclxyXG4gKiBjbGFzcywgYSBNb29Ub29scyBFbGVtZW50LCBhIGpRdWVyeSByZXN1bHQgb3IgYVxyXG4gKiBjc3Mgc2VsZWN0b3IsIGRlcGVuZGluZyBvbiB3aGljaCBET00gYWJzdHJhY3Rpb25cclxuICogbGlicmFyeSB5b3UgYXJlIHVzaW5nLlxyXG4gKlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gdGhlIHZpZXcgY29tcG9uZW50XHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5NZWRpYXRvci5wcm90b3R5cGUuc2V0Vmlld0NvbXBvbmVudD0gZnVuY3Rpb24gKHZpZXdDb21wb25lbnQpXHJcbntcclxuICAgIHRoaXMudmlld0NvbXBvbmVudD0gdmlld0NvbXBvbmVudDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIE1lZGlhdG9ycyB2aWV3IGNvbXBvbmVudC5cclxuICpcclxuICogQWRkaXRpb25hbGx5LCBhbiBvcHRpb25hbCBleHBsaWNpdCBnZXR0ZXIgY2FuIGJlXHJcbiAqIGJlIGRlZmluZWQgaW4gdGhlIHN1YmNsYXNzIHRoYXQgZGVmaW5lcyB0aGVcclxuICogdmlldyBjb21wb25lbnRzLCBwcm92aWRpbmcgYSBtb3JlIHNlbWFudGljIGludGVyZmFjZVxyXG4gKiB0byB0aGUgTWVkaWF0b3IuXHJcbiAqXHJcbiAqIFRoaXMgaXMgZGlmZmVyZW50IGZyb20gdGhlIEFTMyBpbXBsZW1lbnRhdGlvbiBpblxyXG4gKiB0aGUgc2Vuc2UgdGhhdCBubyBjYXN0aW5nIGlzIHJlcXVpcmVkIGZyb20gdGhlXHJcbiAqIG9iamVjdCBzdXBwbGllZCBhcyB0aGUgdmlldyBjb21wb25lbnQuXHJcbiAqXHJcbiAqICAgICBNeU1lZGlhdG9yLnByb3RvdHlwZS5nZXRDb21ib0JveD0gZnVuY3Rpb24gKClcclxuICogICAgIHtcclxuICogICAgICAgICByZXR1cm4gdGhpcy52aWV3Q29tcG9uZW50OyAgXHJcbiAqICAgICB9XHJcbiAqXHJcbiAqIEByZXR1cm4ge09iamVjdH1cclxuICogIFRoZSB2aWV3IGNvbXBvbmVudFxyXG4gKi9cclxuTWVkaWF0b3IucHJvdG90eXBlLmdldFZpZXdDb21wb25lbnQ9IGZ1bmN0aW9uICgpXHJcbntcclxuICAgIHJldHVybiB0aGlzLnZpZXdDb21wb25lbnQ7XHJcbn07XHJcblxyXG4vKipcclxuICogTGlzdCB0aGUgTm90aWZpY2F0aW9uIG5hbWVzIHRoaXMgTWVkaWF0b3IgaXMgaW50ZXJlc3RlZFxyXG4gKiBpbiBiZWluZyBub3RpZmllZCBvZi5cclxuICpcclxuICogQHJldHVybiB7QXJyYXl9XHJcbiAqICBUaGUgbGlzdCBvZiBOb3RpZmljYXRpb24gbmFtZXMuXHJcbiAqL1xyXG5NZWRpYXRvci5wcm90b3R5cGUubGlzdE5vdGlmaWNhdGlvbkludGVyZXN0cz0gZnVuY3Rpb24gKClcclxue1xyXG4gICAgcmV0dXJuIFtdO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEhhbmRsZSBOb3RpZmljYXRpb25zLlxyXG4gKlxyXG4gKiBUeXBpY2FsbHkgdGhpcyB3aWxsIGJlIGhhbmRsZWQgaW4gYSBzd2l0Y2ggc3RhdGVtZW50XHJcbiAqIHdpdGggb25lICdjYXNlJyBlbnRyeSBwZXIgTm90aWZpY2F0aW9uIHRoZSBNZWRpYXRvclxyXG4gKiBpcyBpbnRlcmVzdGVkIGluXHJcbiAqXHJcbiAqIEBwYXJhbSB7cHVyZW12Yy5Ob3RpZmljYXRpb259IG5vdGlmaWNhdGlvblxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuTWVkaWF0b3IucHJvdG90eXBlLmhhbmRsZU5vdGlmaWNhdGlvbj0gZnVuY3Rpb24gKG5vdGlmaWNhdGlvbilcclxue1xyXG4gICAgcmV0dXJuO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENhbGxlZCBieSB0aGUgVmlldyB3aGVuIHRoZSBNZWRpYXRvciBpcyByZWdpc3RlcmVkXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5NZWRpYXRvci5wcm90b3R5cGUub25SZWdpc3Rlcj0gZnVuY3Rpb24gKClcclxue1xyXG4gICAgcmV0dXJuO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENhbGxlZCBieSB0aGUgVmlldyB3aGVuIHRoZSBNZWRpYXRvciBpcyByZW1vdmVkXHJcbiAqL1xyXG5NZWRpYXRvci5wcm90b3R5cGUub25SZW1vdmU9IGZ1bmN0aW9uICgpXHJcbntcclxuICAgIHJldHVybjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqIFRoZSBNZWRpYXRvcnMgbmFtZS4gU2hvdWxkIG9ubHkgYmUgYWNjZXNzZWQgYnkgTWVkaWF0b3Igc3ViY2xhc3Nlcy5cclxuICpcclxuICogQHByb3RlY3RlZFxyXG4gKiBAdHlwZSBzdHJpbmdcclxuICovXHJcbk1lZGlhdG9yLnByb3RvdHlwZS5tZWRpYXRvck5hbWU9IG51bGw7XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKiBUaGUgTWVkaWF0b3JzIHZpZXdDb21wb25lbnQuIFNob3VsZCBvbmx5IGJlIGFjY2Vzc2VkIGJ5IE1lZGlhdG9yIHN1YmNsYXNzZXMuXHJcbiAqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQHR5cGUgT2JqZWN0XHJcbiAqL1xyXG5NZWRpYXRvci5wcm90b3R5cGUudmlld0NvbXBvbmVudD1udWxsO1xyXG4vKipcclxuICogQGF1dGhvciBQdXJlTVZDIEpTIE5hdGl2ZSBQb3J0IGJ5IERhdmlkIEZvbGV5LCBGcsOpZMOpcmljIFNhdW5pZXIsICYgQWxhaW4gRHVjaGVzbmVhdVxyXG4gKiBAYXV0aG9yIENvcHlyaWdodChjKSAyMDA2LTIwMTIgRnV0dXJlc2NhbGUsIEluYy4sIFNvbWUgcmlnaHRzIHJlc2VydmVkLlxyXG4gKlxyXG4gKiBAY2xhc3MgcHVyZW12Yy5Qcm94eVxyXG4gKiBAZXh0ZW5kcyBwdXJlbXZjLk5vdGlmaWVyXHJcbiAqXHJcbiAqIEEgYmFzZSBQcm94eSBpbXBsZW1lbnRhdGlvbi5cclxuICpcclxuICogSW4gUHVyZU1WQywgUHJveHkgY2xhc3NlcyBhcmUgdXNlZCB0byBtYW5hZ2UgcGFydHMgb2YgdGhlIGFwcGxpY2F0aW9uJ3MgZGF0YVxyXG4gKiBtb2RlbC5cclxuICpcclxuICogQSBQcm94eSBtaWdodCBzaW1wbHkgbWFuYWdlIGEgcmVmZXJlbmNlIHRvIGEgbG9jYWwgZGF0YSBvYmplY3QsIGluIHdoaWNoIGNhc2VcclxuICogaW50ZXJhY3Rpbmcgd2l0aCBpdCBtaWdodCBpbnZvbHZlIHNldHRpbmcgYW5kIGdldHRpbmcgb2YgaXRzIGRhdGEgaW5cclxuICogc3luY2hyb25vdXMgZmFzaGlvbi5cclxuICpcclxuICogUHJveHkgY2xhc3NlcyBhcmUgYWxzbyB1c2VkIHRvIGVuY2Fwc3VsYXRlIHRoZSBhcHBsaWNhdGlvbidzIGludGVyYWN0aW9uIHdpdGhcclxuICogcmVtb3RlIHNlcnZpY2VzIHRvIHNhdmUgb3IgcmV0cmlldmUgZGF0YSwgaW4gd2hpY2ggY2FzZSwgd2UgYWRvcHQgYW5cclxuICogYXN5bmNyb25vdXMgaWRpb207IHNldHRpbmcgZGF0YSAob3IgY2FsbGluZyBhIG1ldGhvZCkgb24gdGhlIFByb3h5IGFuZFxyXG4gKiBsaXN0ZW5pbmcgZm9yIGFcclxuICoge0BsaW5rIHB1cmVtdmMuTm90aWZpY2F0aW9uIE5vdGlmaWNhdGlvbn1cclxuICogdG8gYmUgc2VudCAgd2hlbiB0aGUgUHJveHkgaGFzIHJldHJpZXZlZCB0aGUgZGF0YSBmcm9tIHRoZSBzZXJ2aWNlLlxyXG4gKlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gW3Byb3h5TmFtZV1cclxuICogIFRoZSBQcm94eSdzIG5hbWUuIElmIG5vbmUgaXMgcHJvdmlkZWQsIHRoZSBQcm94eSB3aWxsIHVzZSBpdHMgY29uc3RydWN0b3JzXHJcbiAqICBOQU1FIHByb3BlcnR5LlxyXG4gKiBAcGFyYW0ge09iamVjdH0gW2RhdGFdXHJcbiAqICBUaGUgUHJveHkncyBkYXRhIG9iamVjdFxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIFByb3h5KHByb3h5TmFtZSwgZGF0YSlcclxue1xyXG4gICAgdGhpcy5wcm94eU5hbWU9IHByb3h5TmFtZSB8fCB0aGlzLmNvbnN0cnVjdG9yLk5BTUU7XHJcbiAgICBpZihkYXRhICE9IG51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKGRhdGEpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcblByb3h5Lk5BTUU9IFwiUHJveHlcIjtcclxuXHJcblByb3h5LnByb3RvdHlwZT0gbmV3IE5vdGlmaWVyO1xyXG5Qcm94eS5wcm90b3R5cGUuY29uc3RydWN0b3I9IFByb3h5O1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgUHJveHkncyBuYW1lLlxyXG4gKlxyXG4gKiBAcmV0dXJuIHtzdHJpbmd9XHJcbiAqL1xyXG5Qcm94eS5wcm90b3R5cGUuZ2V0UHJveHlOYW1lPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHJldHVybiB0aGlzLnByb3h5TmFtZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIFByb3h5J3MgZGF0YSBvYmplY3RcclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IGRhdGFcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcblByb3h5LnByb3RvdHlwZS5zZXREYXRhPSBmdW5jdGlvbihkYXRhKVxyXG57XHJcbiAgICB0aGlzLmRhdGE9IGRhdGE7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBQcm94eSdzIGRhdGEgb2JqZWN0XHJcbiAqXHJcbiAqIEByZXR1cm4ge09iamVjdH1cclxuICovXHJcblByb3h5LnByb3RvdHlwZS5nZXREYXRhPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHJldHVybiB0aGlzLmRhdGE7XHJcbn07XHJcblxyXG4vKipcclxuICogQ2FsbGVkIGJ5IHRoZSB7QGxpbmsgcHVyZW12Yy5Nb2RlbCBNb2RlbH0gd2hlblxyXG4gKiB0aGUgUHJveHkgaXMgcmVnaXN0ZXJlZC5cclxuICpcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcblByb3h5LnByb3RvdHlwZS5vblJlZ2lzdGVyPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHJldHVybjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDYWxsZWQgYnkgdGhlIHtAbGluayBwdXJlbXZjLk1vZGVsIE1vZGVsfSB3aGVuXHJcbiAqIHRoZSBQcm94eSBpcyByZW1vdmVkLlxyXG4gKlxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuUHJveHkucHJvdG90eXBlLm9uUmVtb3ZlPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHJldHVybjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqIFRoZSBQcm94eXMgbmFtZS5cclxuICpcclxuICogQHByb3RlY3RlZFxyXG4gKiBAdHlwZSBTdHJpbmdcclxuICovXHJcblByb3h5LnByb3RvdHlwZS5wcm94eU5hbWU9IG51bGw7XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKiBUaGUgUHJveHkncyBkYXRhIG9iamVjdC5cclxuICpcclxuICogQHByb3RlY3RlZFxyXG4gKiBAdHlwZSBPYmplY3RcclxuICovXHJcblByb3h5LnByb3RvdHlwZS5kYXRhPSBudWxsO1xyXG4vKipcclxuICogQGF1dGhvciBQdXJlTVZDIEpTIE5hdGl2ZSBQb3J0IGJ5IERhdmlkIEZvbGV5LCBGcsOpZMOpcmljIFNhdW5pZXIsICYgQWxhaW4gRHVjaGVzbmVhdVxyXG4gKiBAYXV0aG9yIENvcHlyaWdodChjKSAyMDA2LTIwMTIgRnV0dXJlc2NhbGUsIEluYy4sIFNvbWUgcmlnaHRzIHJlc2VydmVkLlxyXG4gKlxyXG4gKiBAY2xhc3MgcHVyZW12Yy5GYWNhZGVcclxuICogRmFjYWRlIGV4cG9zZXMgdGhlIGZ1bmN0aW9uYWxpdHkgb2YgdGhlIENvbnRyb2xsZXIsIE1vZGVsIGFuZCBWaWV3XHJcbiAqIGFjdG9ycyB0byBjbGllbnQgZmFjaW5nIGNvZGUuXHJcbiAqXHJcbiAqIFRoaXMgRmFjYWRlIGltcGxlbWVudGF0aW9uIGlzIGEgTXVsdGl0b24sIHNvIHlvdSBzaG91bGQgbm90IGNhbGwgdGhlXHJcbiAqIGNvbnN0cnVjdG9yIGRpcmVjdGx5LCBidXQgaW5zdGVhZCBjYWxsIHRoZSBzdGF0aWMgRmFjdG9yeSBtZXRob2QsXHJcbiAqIHBhc3NpbmcgdGhlIHVuaXF1ZSBrZXkgZm9yIHRoaXMgaW5zdGFuY2UgdG8gI2dldEluc3RhbmNlXHJcbiAqXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5XHJcbiAqIFx0VGhlIG11bHRpdG9uIGtleSB0byB1c2UgdG8gcmV0cmlldmUgdGhlIEZhY2FkZSBpbnN0YW5jZS5cclxuICogQHRocm93cyB7RXJyb3J9XHJcbiAqICBJZiBhbiBhdHRlbXB0IGlzIG1hZGUgdG8gaW5zdGFudGlhdGUgRmFjYWRlIGRpcmVjdGx5XHJcbiAqL1xyXG5mdW5jdGlvbiBGYWNhZGUoa2V5KVxyXG57XHJcbiAgICBpZihGYWNhZGUuaW5zdGFuY2VNYXBba2V5XSAhPSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihGYWNhZGUuTVVMVElUT05fTVNHKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmluaXRpYWxpemVOb3RpZmllcihrZXkpO1xyXG4gICAgRmFjYWRlLmluc3RhbmNlTWFwW2tleV0gPSB0aGlzO1xyXG4gICAgdGhpcy5pbml0aWFsaXplRmFjYWRlKCk7XHJcbn07XHJcblxyXG4vKipcclxuICogSW5pdGlhbGl6ZSB0aGUgTXVsdGl0b24gRmFjYWRlIGluc3RhbmNlLlxyXG4gKlxyXG4gKiBDYWxsZWQgYXV0b21hdGljYWxseSBieSB0aGUgY29uc3RydWN0b3IuIE92ZXJyaWRlIGluIHlvdXIgc3ViY2xhc3MgdG8gYW55XHJcbiAqIHN1YmNsYXNzIHNwZWNpZmljIGluaXRpYWxpemF0aW9ucy4gQmUgc3VyZSB0byBjYWxsIHRoZSAnc3VwZXInXHJcbiAqIGluaXRpYWxpemVGYWNhZGUgbWV0aG9kLCB0aG91Z2hcclxuICpcclxuICogICAgIE15RmFjYWRlLnByb3RvdHlwZS5pbml0aWFsaXplRmFjYWRlPSBmdW5jdGlvbiAoKVxyXG4gKiAgICAge1xyXG4gKiAgICAgICAgIEZhY2FkZS5jYWxsKHRoaXMpO1xyXG4gKiAgICAgfTtcclxuICogQHByb3RlY3RlZFxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuRmFjYWRlLnByb3RvdHlwZS5pbml0aWFsaXplRmFjYWRlID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICB0aGlzLmluaXRpYWxpemVNb2RlbCgpO1xyXG4gICAgdGhpcy5pbml0aWFsaXplQ29udHJvbGxlcigpO1xyXG4gICAgdGhpcy5pbml0aWFsaXplVmlldygpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEZhY2FkZSBNdWx0aXRvbiBGYWN0b3J5IG1ldGhvZC5cclxuICogTm90ZSB0aGF0IHRoaXMgbWV0aG9kIHdpbGwgcmV0dXJuIG51bGwgaWYgc3VwcGxpZWQgYVxyXG4gKiBudWxsIG9yIHVuZGVmaW5lZCBtdWx0aXRvbiBrZXkuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcclxuICogXHRUaGUgbXVsdGl0b24ga2V5IHVzZSB0byByZXRyaWV2ZSBhIHBhcnRpY3VsYXIgRmFjYWRlIGluc3RhbmNlXHJcbiAqIEByZXR1cm4ge3B1cmVtdmMuRmFjYWRlfVxyXG4gKi9cclxuRmFjYWRlLmdldEluc3RhbmNlID0gZnVuY3Rpb24oa2V5KVxyXG57XHJcbiAgICBpZiAobnVsbCA9PSBrZXkpXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgaWYoRmFjYWRlLmluc3RhbmNlTWFwW2tleV0gPT0gbnVsbClcclxuICAgIHtcclxuICAgICAgICBGYWNhZGUuaW5zdGFuY2VNYXBba2V5XSA9IG5ldyBGYWNhZGUoa2V5KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gRmFjYWRlLmluc3RhbmNlTWFwW2tleV07XHJcbn07XHJcblxyXG4vKipcclxuICogSW5pdGlhbGl6ZSB0aGUge0BsaW5rIHB1cmVtdmMuQ29udHJvbGxlciBDb250cm9sbGVyfS5cclxuICpcclxuICogQ2FsbGVkIGJ5IHRoZSAjaW5pdGlhbGl6ZUZhY2FkZSBtZXRob2QuXHJcbiAqXHJcbiAqIE92ZXJyaWRlIHRoaXMgbWV0aG9kIGluIHlvdXIgc3ViY2xhc3Mgb2YgRmFjYWRlXHJcbiAqIGlmIG9uZSBvciBib3RoIG9mIHRoZSBmb2xsb3dpbmcgYXJlIHRydWU6XHJcbiAqIC0gWW91IHdpc2ggdG8gaW5pdGlhbGl6ZSBhIGRpZmZlcmVudCBDb250cm9sbGVyXHJcbiAqIC0gWW91IGhhdmVcclxuICoge0BsaW5rIHB1cmVtdmMuU2ltcGxlQ29tbWFuZCBTaW1wbGVDb21tYW5kfXNcclxuICogb3Ige0BsaW5rIHB1cmVtdmMuTWFjcm9Db21tYW5kIE1hY3JvQ29tbWFuZH1zXHJcbiAqIHRvIHJlZ2lzdGVyIHdpdGggdGhlIENvbnRyb2xsZXJhdCBzdGFydHVwLlxyXG4gKlxyXG4gKiBJZiB5b3UgZG9uJ3Qgd2FudCB0byBpbml0aWFsaXplIGEgZGlmZmVyZW50IENvbnRyb2xsZXIsXHJcbiAqIGNhbGwgdGhlICdzdXBlcicgaW5pdGlhbGl6ZUNvbnRyb2xsZSBtZXRob2QgYXQgdGhlIGJlZ2lubmluZyBvZiB5b3VyXHJcbiAqIG1ldGhvZCwgdGhlbiByZWdpc3RlciBjb21tYW5kcy5cclxuICpcclxuICogICAgIE15RmFjYWRlLnByb3RvdHlwZS5pbml0aWFsaXplQ29udHJvbGxlcj0gZnVuY3Rpb24gKClcclxuICogICAgIHtcclxuICogICAgICAgICBGYWNhZGUucHJvdG90eXBlLmluaXRpYWxpemVDb250cm9sbGVyLmNhbGwodGhpcyk7XHJcbiAqICAgICAgICAgdGhpcy5yZWdpc3RlckNvbW1hbmQoQXBwQ29uc3RhbnRzLkFfTk9URV9OQU1FLCBBQmVzcG9rZUNvbW1hbmQpXHJcbiAqICAgICB9XHJcbiAqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbkZhY2FkZS5wcm90b3R5cGUuaW5pdGlhbGl6ZUNvbnRyb2xsZXIgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIGlmKHRoaXMuY29udHJvbGxlciAhPSBudWxsKVxyXG4gICAgICAgIHJldHVybjtcclxuXHJcbiAgICB0aGlzLmNvbnRyb2xsZXIgPSBDb250cm9sbGVyLmdldEluc3RhbmNlKHRoaXMubXVsdGl0b25LZXkpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogSW5pdGlhbGl6ZSB0aGUge0BsaW5rIHB1cmVtdmMuTW9kZWwgTW9kZWx9O1xyXG4gKlxyXG4gKiBDYWxsZWQgYnkgdGhlICNpbml0aWFsaXplRmFjYWRlIG1ldGhvZC5cclxuICogT3ZlcnJpZGUgdGhpcyBtZXRob2QgaW4geW91ciBzdWJjbGFzcyBvZiBGYWNhZGUgaWYgb25lIG9mIHRoZSBmb2xsb3dpbmcgYXJlXHJcbiAqIHRydWU6XHJcbiAqXHJcbiAqIC0gWW91IHdpc2ggdG8gaW5pdGlhbGl6ZSBhIGRpZmZlcmVudCBNb2RlbC5cclxuICpcclxuICogLSBZb3UgaGF2ZSB7QGxpbmsgcHVyZW12Yy5Qcm94eSBQcm94eX1zIHRvXHJcbiAqICAgcmVnaXN0ZXIgd2l0aCB0aGUgTW9kZWwgdGhhdCBkbyBub3QgcmV0cmlldmUgYSByZWZlcmVuY2UgdG8gdGhlIEZhY2FkZSBhdFxyXG4gKiAgIGNvbnN0cnVjdGlvbiB0aW1lLlxyXG4gKlxyXG4gKiBJZiB5b3UgZG9uJ3Qgd2FudCB0byBpbml0aWFsaXplIGEgZGlmZmVyZW50IE1vZGVsXHJcbiAqIGNhbGwgJ3N1cGVyJyAjaW5pdGlhbGl6ZU1vZGVsIGF0IHRoZSBiZWdpbm5pbmcgb2YgeW91ciBtZXRob2QsIHRoZW4gcmVnaXN0ZXJcclxuICogUHJveHlzLlxyXG4gKlxyXG4gKiBOb3RlOiBUaGlzIG1ldGhvZCBpcyAqcmFyZWx5KiBvdmVycmlkZGVuOyBpbiBwcmFjdGljZSB5b3UgYXJlIG1vcmVcclxuICogbGlrZWx5IHRvIHVzZSBhIGNvbW1hbmQgdG8gY3JlYXRlIGFuZCByZWdpc3RlclByb3h5cyB3aXRoIHRoZSBNb2RlbD4sXHJcbiAqIHNpbmNlIFByb3h5cyB3aXRoIG11dGFibGUgZGF0YSB3aWxsIGxpa2VseVxyXG4gKiBuZWVkIHRvIHNlbmQgTm90aWZpY2F0aW9ucyBhbmQgdGh1cyB3aWxsIGxpa2VseSB3YW50IHRvIGZldGNoIGEgcmVmZXJlbmNlIHRvXHJcbiAqIHRoZSBGYWNhZGUgZHVyaW5nIHRoZWlyIGNvbnN0cnVjdGlvbi5cclxuICpcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbkZhY2FkZS5wcm90b3R5cGUuaW5pdGlhbGl6ZU1vZGVsID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICBpZih0aGlzLm1vZGVsICE9IG51bGwpXHJcbiAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgIHRoaXMubW9kZWwgPSBNb2RlbC5nZXRJbnN0YW5jZSh0aGlzLm11bHRpdG9uS2V5KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqXHJcbiAqIEluaXRpYWxpemUgdGhlIHtAbGluayBwdXJlbXZjLlZpZXcgVmlld30uXHJcbiAqXHJcbiAqIENhbGxlZCBieSB0aGUgI2luaXRpYWxpemVGYWNhZGUgbWV0aG9kLlxyXG4gKlxyXG4gKiBPdmVycmlkZSB0aGlzIG1ldGhvZCBpbiB5b3VyIHN1YmNsYXNzIG9mIEZhY2FkZSBpZiBvbmUgb3IgYm90aCBvZiB0aGVcclxuICogZm9sbG93aW5nIGFyZSB0cnVlOlxyXG4gKlxyXG4gKiAtIFlvdSB3aXNoIHRvIGluaXRpYWxpemUgYSBkaWZmZXJlbnQgVmlldy5cclxuICogLSBZb3UgaGF2ZSBPYnNlcnZlcnMgdG8gcmVnaXN0ZXIgd2l0aCB0aGUgVmlld1xyXG4gKlxyXG4gKiBJZiB5b3UgZG9uJ3Qgd2FudCB0byBpbml0aWFsaXplIGEgZGlmZmVyZW50IFZpZXdcclxuICogY2FsbCAnc3VwZXInICNpbml0aWFsaXplVmlldyBhdCB0aGUgYmVnaW5uaW5nIG9mIHlvdXJcclxuICogbWV0aG9kLCB0aGVuIHJlZ2lzdGVyIE1lZGlhdG9yIGluc3RhbmNlcy5cclxuICpcclxuICogICAgIE15RmFjYWRlLnByb3RvdHlwZS5pbml0aWFsaXplVmlldz0gZnVuY3Rpb24gKClcclxuICogICAgIHtcclxuICogICAgICAgICBGYWNhZGUucHJvdG90eXBlLmluaXRpYWxpemVWaWV3LmNhbGwodGhpcyk7XHJcbiAqICAgICAgICAgdGhpcy5yZWdpc3Rlck1lZGlhdG9yKG5ldyBNeU1lZGlhdG9yKCkpO1xyXG4gKiAgICAgfTtcclxuICpcclxuICogTm90ZTogVGhpcyBtZXRob2QgaXMgKnJhcmVseSogb3ZlcnJpZGRlbjsgaW4gcHJhY3RpY2UgeW91IGFyZSBtb3JlXHJcbiAqIGxpa2VseSB0byB1c2UgYSBjb21tYW5kIHRvIGNyZWF0ZSBhbmQgcmVnaXN0ZXIgTWVkaWF0b3JzXHJcbiAqIHdpdGggdGhlIFZpZXcsIHNpbmNlIE1lZGlhdG9yIGluc3RhbmNlcyB3aWxsIG5lZWQgdG8gc2VuZFxyXG4gKiBOb3RpZmljYXRpb25zIGFuZCB0aHVzIHdpbGwgbGlrZWx5IHdhbnQgdG8gZmV0Y2ggYSByZWZlcmVuY2VcclxuICogdG8gdGhlIEZhY2FkZSBkdXJpbmcgdGhlaXIgY29uc3RydWN0aW9uLlxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuRmFjYWRlLnByb3RvdHlwZS5pbml0aWFsaXplVmlldyA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgaWYodGhpcy52aWV3ICE9IG51bGwpXHJcbiAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgIHRoaXMudmlldyA9IFZpZXcuZ2V0SW5zdGFuY2UodGhpcy5tdWx0aXRvbktleSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVnaXN0ZXIgYSBjb21tYW5kIHdpdGggdGhlIENvbnRyb2xsZXIgYnkgTm90aWZpY2F0aW9uIG5hbWVcclxuICogQHBhcmFtIHtzdHJpbmd9IG5vdGlmaWNhdGlvbk5hbWVcclxuICogIFRoZSBuYW1lIG9mIHRoZSBOb3RpZmljYXRpb24gdG8gYXNzb2NpYXRlIHRoZSBjb21tYW5kIHdpdGhcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY29tbWFuZENsYXNzUmVmXHJcbiAqICBBIHJlZmVyZW5jZSBvdCB0aGUgY29tbWFuZHMgY29uc3RydWN0b3IuXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5GYWNhZGUucHJvdG90eXBlLnJlZ2lzdGVyQ29tbWFuZCA9IGZ1bmN0aW9uKG5vdGlmaWNhdGlvbk5hbWUsIGNvbW1hbmRDbGFzc1JlZilcclxue1xyXG4gICAgdGhpcy5jb250cm9sbGVyLnJlZ2lzdGVyQ29tbWFuZChub3RpZmljYXRpb25OYW1lLCBjb21tYW5kQ2xhc3NSZWYpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSBhIHByZXZpb3VzbHkgcmVnaXN0ZXJlZCBjb21tYW5kIHRvIE5vdGlmaWNhdGlvbiBtYXBwaW5nIGZyb20gdGhlXHJcbiAqIHtAbGluayBwdXJlbXZjLkNvbnRyb2xsZXIjcmVtb3ZlQ29tbWFuZCBDb250cm9sbGVyfVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbm90aWZpY2F0aW9uTmFtZVxyXG4gKiAgVGhlIG5hbWUgb2YgdGhlIHRoZSBOb3RpZmljYXRpb24gdG8gcmVtb3ZlIGZyb20gdGhlIGNvbW1hbmQgbWFwcGluZyBmb3IuXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5GYWNhZGUucHJvdG90eXBlLnJlbW92ZUNvbW1hbmQgPSBmdW5jdGlvbihub3RpZmljYXRpb25OYW1lKVxyXG57XHJcbiAgICB0aGlzLmNvbnRyb2xsZXIucmVtb3ZlQ29tbWFuZChub3RpZmljYXRpb25OYW1lKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDaGVjayBpZiBhIGNvbW1hbmQgaXMgcmVnaXN0ZXJlZCBmb3IgYSBnaXZlbiBub3RpZmljYXRpb24uXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBub3RpZmljYXRpb25OYW1lXHJcbiAqICBBIE5vdGlmaWNhdGlvbiBuYW1lXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAqICBXaGV0aGVyIGEgY29tbWFuIGlzIGN1cnJlbnRseSByZWdpc3RlcmVkIGZvciB0aGUgZ2l2ZW4gbm90aWZpY2F0aW9uTmFtZVxyXG4gKi9cclxuRmFjYWRlLnByb3RvdHlwZS5oYXNDb21tYW5kID0gZnVuY3Rpb24obm90aWZpY2F0aW9uTmFtZSlcclxue1xyXG4gICAgcmV0dXJuIHRoaXMuY29udHJvbGxlci5oYXNDb21tYW5kKG5vdGlmaWNhdGlvbk5hbWUpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlZ2lzdGVyIGEgUHJveHkgd2l0aCB0aGUge0BsaW5rIHB1cmVtdmMuTW9kZWwjcmVnaXN0ZXJQcm94eSBNb2RlbH1cclxuICogYnkgbmFtZS5cclxuICpcclxuICogQHBhcmFtIHtwdXJlbXZjLlByb3h5fSBwcm94eVxyXG4gKiAgVGhlIFByb3h5IGluc3RhbmNlIHRvIGJlIHJlZ2lzdGVyZWQgd2l0aCB0aGUgTW9kZWwuXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5GYWNhZGUucHJvdG90eXBlLnJlZ2lzdGVyUHJveHkgPSBmdW5jdGlvbihwcm94eSlcclxue1xyXG4gICAgdGhpcy5tb2RlbC5yZWdpc3RlclByb3h5KHByb3h5KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXRyaWV2ZSBhIFByb3h5IGZyb20gdGhlIE1vZGVsXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm94eU5hbWVcclxuICogQHJldHVybiB7cHVyZW12Yy5Qcm94eX1cclxuICovXHJcbkZhY2FkZS5wcm90b3R5cGUucmV0cmlldmVQcm94eSA9IGZ1bmN0aW9uKHByb3h5TmFtZSlcclxue1xyXG4gICAgcmV0dXJuIHRoaXMubW9kZWwucmV0cmlldmVQcm94eShwcm94eU5hbWUpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSBhIFByb3h5IGZyb20gdGhlIE1vZGVsIGJ5IG5hbWVcclxuICogQHBhcmFtIHtzdHJpbmd9IHByb3h5TmFtZVxyXG4gKiAgVGhlIG5hbWUgb2YgdGhlIFByb3h5XHJcbiAqIEByZXR1cm4ge3B1cmVtdmMuUHJveHl9XHJcbiAqICBUaGUgUHJveHkgdGhhdCB3YXMgcmVtb3ZlZCBmcm9tIHRoZSBNb2RlbFxyXG4gKi9cclxuRmFjYWRlLnByb3RvdHlwZS5yZW1vdmVQcm94eSA9IGZ1bmN0aW9uKHByb3h5TmFtZSlcclxue1xyXG4gICAgdmFyIHByb3h5ID0gbnVsbDtcclxuICAgIGlmKHRoaXMubW9kZWwgIT0gbnVsbClcclxuICAgIHtcclxuICAgICAgICBwcm94eSA9IHRoaXMubW9kZWwucmVtb3ZlUHJveHkocHJveHlOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcHJveHk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ2hlY2sgaXQgYSBQcm94eSBpcyByZWdpc3RlcmVkLlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJveHlOYW1lXHJcbiAqICBBIFByb3h5IG5hbWVcclxuICogQHJldHVybiB7Ym9vbGVhbn1cclxuICogIFdoZXRoZXIgYSBQcm94eSBpcyBjdXJyZW50bHkgcmVnaXN0ZXJlZCB3aXRoIHRoZSBnaXZlbiBwcm94eU5hbWVcclxuICovXHJcbkZhY2FkZS5wcm90b3R5cGUuaGFzUHJveHkgPSBmdW5jdGlvbihwcm94eU5hbWUpXHJcbntcclxuICAgIHJldHVybiB0aGlzLm1vZGVsLmhhc1Byb3h5KHByb3h5TmFtZSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVnaXN0ZXIgYSBNZWRpYXRvciB3aXRoIHdpdGggdGhlIFZpZXcuXHJcbiAqXHJcbiAqIEBwYXJhbSB7cHVyZW12Yy5NZWRpYXRvcn0gbWVkaWF0b3JcclxuICogIEEgcmVmZXJlbmNlIHRvIHRoZSBNZWRpYXRvciB0byByZWdpc3RlclxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuRmFjYWRlLnByb3RvdHlwZS5yZWdpc3Rlck1lZGlhdG9yID0gZnVuY3Rpb24obWVkaWF0b3IpXHJcbntcclxuICAgIGlmKHRoaXMudmlldyAhPSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudmlldy5yZWdpc3Rlck1lZGlhdG9yKG1lZGlhdG9yKTtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXRyaWV2ZSBhIE1lZGlhdG9yIGZyb20gdGhlIFZpZXcgYnkgbmFtZVxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVkaWF0b3JOYW1lXHJcbiAqICBUaGUgTWVkaWF0b3JzIG5hbWVcclxuICogQHJldHVybiB7cHVyZW12Yy5NZWRpYXRvcn1cclxuICogIFRoZSByZXRyaWV2ZWQgTWVkaWF0b3JcclxuICovXHJcbkZhY2FkZS5wcm90b3R5cGUucmV0cmlldmVNZWRpYXRvciA9IGZ1bmN0aW9uKG1lZGlhdG9yTmFtZSlcclxue1xyXG4gICAgcmV0dXJuIHRoaXMudmlldy5yZXRyaWV2ZU1lZGlhdG9yKG1lZGlhdG9yTmFtZSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlIGEgTWVkaWF0b3IgZnJvbSB0aGUgVmlldy5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG1lZGlhdG9yTmFtZVxyXG4gKiAgVGhlIG5hbWUgb2YgdGhlIE1lZGlhdG9yIHRvIHJlbW92ZS5cclxuICogQHJldHVybiB7cHVyZW12Yy5NZWRpYXRvcn1cclxuICogIFRoZSByZW1vdmVkIE1lZGlhdG9yXHJcbiAqL1xyXG5GYWNhZGUucHJvdG90eXBlLnJlbW92ZU1lZGlhdG9yID0gZnVuY3Rpb24obWVkaWF0b3JOYW1lKVxyXG57XHJcbiAgICB2YXIgbWVkaWF0b3IgPSBudWxsO1xyXG4gICAgaWYodGhpcy52aWV3ICE9IG51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgbWVkaWF0b3IgPSB0aGlzLnZpZXcucmVtb3ZlTWVkaWF0b3IobWVkaWF0b3JOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbWVkaWF0b3I7XHJcbn07XHJcblxyXG4vKipcclxuICogQ2hlY2sgaWYgYSBNZWRpYXRvciBpcyByZWdpc3RlcmVkIG9yIG5vdC5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG1lZGlhdG9yTmFtZVxyXG4gKiAgQSBNZWRpYXRvciBuYW1lXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAqICBXaGV0aGVyIGEgTWVkaWF0b3IgaXMgcmVnaXN0ZXJlZCB3aXRoIHRoZSBnaXZlbiBtZWRpYXRvck5hbWVcclxuICovXHJcbkZhY2FkZS5wcm90b3R5cGUuaGFzTWVkaWF0b3IgPSBmdW5jdGlvbihtZWRpYXRvck5hbWUpXHJcbntcclxuICAgIHJldHVybiB0aGlzLnZpZXcuaGFzTWVkaWF0b3IobWVkaWF0b3JOYW1lKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYW5kIHNlbmQgYVxyXG4gKiB7QGxpbmsgcHVyZW12Yy5Ob3RpZmljYXRpb24gTm90aWZpY2F0aW9ufVxyXG4gKlxyXG4gKiBLZWVwcyB1cyBmcm9tIGhhdmluZyB0byBjb25zdHJ1Y3QgbmV3IE5vdGlmaWNhdGlvbiBpbnN0YW5jZXMgaW4gb3VyXHJcbiAqIGltcGxlbWVudGF0aW9uXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBub3RpZmljYXRpb25OYW1lXHJcbiAqICBUaGUgbmFtZSBvZiB0aGUgTm90aWZpY2F0aW9uIHRvIHNlbmRcclxuICogQHBhcmFtIHtPYmplY3R9IFtib2R5XVxyXG4gKiAgVGhlIGJvZHkgb2YgdGhlIG5vdGlmaWNhdGlvblxyXG4gKiBAcGFyYW0ge3N0cmluZ30gW3R5cGVdXHJcbiAqICBUaGUgdHlwZSBvZiB0aGUgbm90aWZpY2F0aW9uXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5GYWNhZGUucHJvdG90eXBlLnNlbmROb3RpZmljYXRpb24gPSBmdW5jdGlvbihub3RpZmljYXRpb25OYW1lLCBib2R5LCB0eXBlKVxyXG57XHJcbiAgICB0aGlzLm5vdGlmeU9ic2VydmVycyhuZXcgTm90aWZpY2F0aW9uKG5vdGlmaWNhdGlvbk5hbWUsIGJvZHksIHR5cGUpKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBOb3RpZnkge0BsaW5rIHB1cmVtdmMuT2JzZXJ2ZXIgT2JzZXJ2ZXJ9c1xyXG4gKlxyXG4gKiBUaGlzIG1ldGhvZCBpcyBsZWZ0IHB1YmxpYyBtb3N0bHkgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHksIGFuZCB0byBhbGxvd1xyXG4gKiB5b3UgdG8gc2VuZCBjdXN0b20gbm90aWZpY2F0aW9uIGNsYXNzZXMgdXNpbmcgdGhlIGZhY2FkZS5cclxuICpcclxuICogVXN1YWxseSB5b3Ugc2hvdWxkIGp1c3QgY2FsbCBzZW5kTm90aWZpY2F0aW9uIGFuZCBwYXNzIHRoZSBwYXJhbWV0ZXJzLCBuZXZlclxyXG4gKiBoYXZpbmcgdG8gY29uc3RydWN0IHRoZSBub3RpZmljYXRpb24geW91cnNlbGYuXHJcbiAqXHJcbiAqIEBwYXJhbSB7cHVyZW12Yy5Ob3RpZmljYXRpb259IG5vdGlmaWNhdGlvblxyXG4gKiAgVGhlIE5vdGlmaWNhdGlvbiB0byBzZW5kXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5GYWNhZGUucHJvdG90eXBlLm5vdGlmeU9ic2VydmVycyA9IGZ1bmN0aW9uKG5vdGlmaWNhdGlvbilcclxue1xyXG4gICAgaWYodGhpcy52aWV3ICE9IG51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy52aWV3Lm5vdGlmeU9ic2VydmVycyhub3RpZmljYXRpb24pO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemUgdGhlIEZhY2FkZXMgTm90aWZpZXIgY2FwYWJpbGl0aWVzIGJ5IHNldHRpbmcgdGhlIE11bHRpdG9uIGtleSBmb3JcclxuICogdGhpcyBmYWNhZGUgaW5zdGFuY2UuXHJcbiAqXHJcbiAqIE5vdCBjYWxsZWQgZGlyZWN0bHksIGJ1dCBpbnN0ZWFkIGZyb20gdGhlIGNvbnN0cnVjdG9yIHdoZW4gI2dldEluc3RhbmNlIGlzXHJcbiAqIGludm9rZWQuIEl0IGlzIG5lY2Vzc2FyeSB0byBiZSBwdWJsaWMgaW4gb3JkZXIgdG8gaW1wbGVtZW50IE5vdGlmaWVyXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbkZhY2FkZS5wcm90b3R5cGUuaW5pdGlhbGl6ZU5vdGlmaWVyID0gZnVuY3Rpb24oa2V5KVxyXG57XHJcbiAgICB0aGlzLm11bHRpdG9uS2V5ID0ga2V5O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIGEgKkNvcmUqIGlzIHJlZ2lzdGVyZWQgb3Igbm90XHJcbiAqXHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtzdHJpbmd9IGtleVxyXG4gKiAgVGhlIG11bHRpdG9uIGtleSBmb3IgdGhlICpDb3JlKiBpbiBxdWVzdGlvblxyXG4gKiBAcmV0dXJuIHtib29sZWFufVxyXG4gKiAgV2hldGhlciBhICpDb3JlKiBpcyByZWdpc3RlcmVkIHdpdGggdGhlIGdpdmVuIGtleVxyXG4gKi9cclxuRmFjYWRlLmhhc0NvcmUgPSBmdW5jdGlvbihrZXkpXHJcbntcclxuICAgIHJldHVybiBGYWNhZGUuaW5zdGFuY2VNYXBba2V5XSAhPSBudWxsO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSBhICpDb3JlKlxyXG4gKlxyXG4gKiBSZW1vdmUgdGhlIE1vZGVsLCBWaWV3LCBDb250cm9sbGVyIGFuZCBGYWNhZGUgZm9yIGEgZ2l2ZW4ga2V5LlxyXG4gKlxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbkZhY2FkZS5yZW1vdmVDb3JlID0gZnVuY3Rpb24oa2V5KVxyXG57XHJcbiAgICBpZihGYWNhZGUuaW5zdGFuY2VNYXBba2V5XSA9PSBudWxsKVxyXG4gICAgICAgIHJldHVybjtcclxuXHJcbiAgICBNb2RlbC5yZW1vdmVNb2RlbChrZXkpO1xyXG4gICAgVmlldy5yZW1vdmVWaWV3KGtleSk7XHJcbiAgICBDb250cm9sbGVyLnJlbW92ZUNvbnRyb2xsZXIoa2V5KTtcclxuICAgIGRlbGV0ZSBGYWNhZGUuaW5zdGFuY2VNYXBba2V5XTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqIFRoZSBGYWNhZGVzIGNvcnJlc3BvbmRpbmcgQ29udHJvbGxlclxyXG4gKlxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEB0eXBlIHB1cmVtdmMuQ29udHJvbGxlclxyXG4gKi9cclxuRmFjYWRlLnByb3RvdHlwZS5jb250cm9sbGVyID0gbnVsbDtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqIFRoZSBGYWNhZGVzIGNvcnJlc3BvbmRpbmcgTW9kZWwgaW5zdGFuY2VcclxuICpcclxuICogQHByb3RlY3RlZFxyXG4gKiBAdHlwZSBwdXJlbXZjLk1vZGVsXHJcbiAqL1xyXG5GYWNhZGUucHJvdG90eXBlLm1vZGVsID0gbnVsbDtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqIFRoZSBGYWNhZGVzIGNvcnJlc3BuZGluZyBWaWV3IGluc3RhbmNlLlxyXG4gKlxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEB0eXBlIHB1cmVtdmMuVmlld1xyXG4gKi9cclxuRmFjYWRlLnByb3RvdHlwZS52aWV3ID0gbnVsbDtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqIFRoZSBGYWNhZGVzIG11bHRpdG9uIGtleS5cclxuICpcclxuICogQHByb3RlY3RlZFxyXG4gKiBAdHlwZSBzdHJpbmdcclxuICovXHJcbkZhY2FkZS5wcm90b3R5cGUubXVsdGl0b25LZXkgPSBudWxsO1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICogVGhlIE11bHRpdG9uIEZhY2FkZSBpbnN0YW5jZSBtYXAuXHJcbiAqIEBzdGF0aWNcclxuICogQHByb3RlY3RlZFxyXG4gKiBAdHlwZSBBcnJheVxyXG4gKi9cclxuRmFjYWRlLmluc3RhbmNlTWFwID0gW107XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKiBNZXNzYWdlIENvbnN0YW50c1xyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEB0eXBlIHtzdHJpbmd9XHJcbiAqIEBjb25zdFxyXG4gKiBAc3RhdGljXHJcbiAqL1xyXG5GYWNhZGUuTVVMVElUT05fTVNHID0gXCJGYWNhZGUgaW5zdGFuY2UgZm9yIHRoaXMgTXVsdGl0b24ga2V5IGFscmVhZHkgY29uc3RydWN0ZWQhXCI7XHJcbi8qKlxyXG4gKiBAYXV0aG9yIFB1cmVNVkMgSlMgTmF0aXZlIFBvcnQgYnkgRGF2aWQgRm9sZXksIEZyw6lkw6lyaWMgU2F1bmllciwgJiBBbGFpbiBEdWNoZXNuZWF1XHJcbiAqIEBhdXRob3IgQ29weXJpZ2h0KGMpIDIwMDYtMjAxMiBGdXR1cmVzY2FsZSwgSW5jLiwgU29tZSByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIEBjbGFzcyBwdXJlbXZjLlZpZXdcclxuICpcclxuICogQSBNdWx0aXRvbiBWaWV3IGltcGxlbWVudGF0aW9uLlxyXG4gKlxyXG4gKiBJbiBQdXJlTVZDLCB0aGUgVmlldyBjbGFzcyBhc3N1bWVzIHRoZXNlIHJlc3BvbnNpYmlsaXRpZXNcclxuICpcclxuICogLSBNYWludGFpbiBhIGNhY2hlIG9mIHtAbGluayBwdXJlbXZjLk1lZGlhdG9yIE1lZGlhdG9yfVxyXG4gKiAgIGluc3RhbmNlcy5cclxuICpcclxuICogLSBQcm92aWRlIG1ldGhvZHMgZm9yIHJlZ2lzdGVyaW5nLCByZXRyaWV2aW5nLCBhbmQgcmVtb3ZpbmdcclxuICogICB7QGxpbmsgcHVyZW12Yy5NZWRpYXRvciBNZWRpYXRvcn0uXHJcbiAqXHJcbiAqIC0gTm90aWZpeWluZyB7QGxpbmsgcHVyZW12Yy5NZWRpYXRvciBNZWRpYXRvcn0gd2hlbiB0aGV5IGFyZSByZWdpc3RlcmVkIG9yXHJcbiAqICAgcmVtb3ZlZC5cclxuICpcclxuICogLSBNYW5hZ2luZyB0aGUgb2JzZXJ2ZXIgbGlzdHMgZm9yIGVhY2gge0BsaW5rIHB1cmVtdmMuTm90aWZpY2F0aW9uIE5vdGlmaWNhdGlvbn1cclxuICogICBpbiB0aGUgYXBwbGljYXRpb24uXHJcbiAqXHJcbiAqIC0gUHJvdmlkaW5nIGEgbWV0aG9kIGZvciBhdHRhY2hpbmcge0BsaW5rIHB1cmVtdmMuT2JzZXJ2ZXIgT2JzZXJ2ZXJ9IHRvIGFuXHJcbiAqICAge0BsaW5rIHB1cmVtdmMuTm90aWZpY2F0aW9uIE5vdGlmaWNhdGlvbn0ncyBvYnNlcnZlciBsaXN0LlxyXG4gKlxyXG4gKiAtIFByb3ZpZGluZyBhIG1ldGhvZCBmb3IgYnJvYWRjYXN0aW5nIGEge0BsaW5rIHB1cmVtdmMuTm90aWZpY2F0aW9uIE5vdGlmaWNhdGlvbn0uXHJcbiAqXHJcbiAqIC0gTm90aWZ5aW5nIHRoZSB7QGxpbmsgcHVyZW12Yy5PYnNlcnZlciBPYnNlcnZlcn1zIG9mIGEgZ2l2ZW5cclxuICogICB7QGxpbmsgcHVyZW12Yy5Ob3RpZmljYXRpb24gTm90aWZpY2F0aW9ufSB3aGVuIGl0IGJyb2FkY2FzdC5cclxuICpcclxuICogVGhpcyBWaWV3IGltcGxlbWVudGF0aW9uIGlzIGEgTXVsdGl0b24sIHNvIHlvdSBzaG91bGQgbm90IGNhbGwgdGhlXHJcbiAqIGNvbnN0cnVjdG9yIGRpcmVjdGx5LCBidXQgaW5zdGVhZCBjYWxsIHRoZSBzdGF0aWMgTXVsdGl0b25cclxuICogRmFjdG9yeSAjZ2V0SW5zdGFuY2UgbWV0aG9kLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5XHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKiBAdGhyb3dzIHtFcnJvcn1cclxuICogIGlmIGluc3RhbmNlIGZvciB0aGlzIE11bHRpdG9uIGtleSBoYXMgYWxyZWFkeSBiZWVuIGNvbnN0cnVjdGVkXHJcbiAqL1xyXG5mdW5jdGlvbiBWaWV3KGtleSlcclxue1xyXG4gICAgaWYoVmlldy5pbnN0YW5jZU1hcFtrZXldICE9IG51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFZpZXcuTVVMVElUT05fTVNHKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5tdWx0aXRvbktleSA9IGtleTtcclxuICAgIFZpZXcuaW5zdGFuY2VNYXBbdGhpcy5tdWx0aXRvbktleV0gPSB0aGlzO1xyXG4gICAgdGhpcy5tZWRpYXRvck1hcCA9IFtdO1xyXG4gICAgdGhpcy5vYnNlcnZlck1hcCA9IFtdO1xyXG4gICAgdGhpcy5pbml0aWFsaXplVmlldygpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogSW5pdGlhbGl6ZSB0aGUgU2luZ2xldG9uIFZpZXcgaW5zdGFuY2VcclxuICpcclxuICogQ2FsbGVkIGF1dG9tYXRpY2FsbHkgYnkgdGhlIGNvbnN0cnVjdG9yLCB0aGlzIGlzIHlvdXIgb3Bwb3J0dW5pdHkgdG9cclxuICogaW5pdGlhbGl6ZSB0aGUgU2luZ2xldG9uIGluc3RhbmNlIGluIHlvdXIgc3ViY2xhc3Mgd2l0aG91dCBvdmVycmlkaW5nIHRoZVxyXG4gKiBjb25zdHJ1Y3RvclxyXG4gKlxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuVmlldy5wcm90b3R5cGUuaW5pdGlhbGl6ZVZpZXcgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHJldHVybjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBWaWV3IFNpbmdsZXRvbiBGYWN0b3J5IG1ldGhvZC5cclxuICogTm90ZSB0aGF0IHRoaXMgbWV0aG9kIHdpbGwgcmV0dXJuIG51bGwgaWYgc3VwcGxpZWQgYSBudWxsXHJcbiAqIG9yIHVuZGVmaW5lZCBtdWx0aXRvbiBrZXkuXHJcbiAqXHJcbiAqIEByZXR1cm4ge3B1cmVtdmMuVmlld31cclxuICogIFRoZSBTaW5nbGV0b24gaW5zdGFuY2Ugb2YgVmlld1xyXG4gKi9cclxuVmlldy5nZXRJbnN0YW5jZSA9IGZ1bmN0aW9uKGtleSlcclxue1xyXG4gICAgaWYgKG51bGwgPT0ga2V5KVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG5cclxuICAgIGlmKFZpZXcuaW5zdGFuY2VNYXBba2V5XSA9PSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIFZpZXcuaW5zdGFuY2VNYXBba2V5XSA9IG5ldyBWaWV3KGtleSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBWaWV3Lmluc3RhbmNlTWFwW2tleV07XHJcbn07XHJcblxyXG4vKipcclxuICogUmVnaXN0ZXIgYW4gT2JzZXJ2ZXIgdG8gYmUgbm90aWZpZWQgb2YgTm90aWZpY2F0aW9ucyB3aXRoIGEgZ2l2ZW4gbmFtZVxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbm90aWZpY2F0aW9uTmFtZVxyXG4gKiAgVGhlIG5hbWUgb2YgdGhlIE5vdGlmaWNhdGlvbnMgdG8gbm90aWZ5IHRoaXMgT2JzZXJ2ZXIgb2ZcclxuICogQHBhcmFtIHtwdXJlbXZjLk9ic2VydmVyfSBvYnNlcnZlclxyXG4gKiAgVGhlIE9ic2VydmVyIHRvIHJlZ2lzdGVyLlxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuVmlldy5wcm90b3R5cGUucmVnaXN0ZXJPYnNlcnZlciA9IGZ1bmN0aW9uKG5vdGlmaWNhdGlvbk5hbWUsIG9ic2VydmVyKVxyXG57XHJcbiAgICBpZih0aGlzLm9ic2VydmVyTWFwW25vdGlmaWNhdGlvbk5hbWVdICE9IG51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5vYnNlcnZlck1hcFtub3RpZmljYXRpb25OYW1lXS5wdXNoKG9ic2VydmVyKTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICB0aGlzLm9ic2VydmVyTWFwW25vdGlmaWNhdGlvbk5hbWVdID0gW29ic2VydmVyXTtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBOb3RpZnkgdGhlIE9ic2VydmVyc2ZvciBhIHBhcnRpY3VsYXIgTm90aWZpY2F0aW9uLlxyXG4gKlxyXG4gKiBBbGwgcHJldmlvdXNseSBhdHRhY2hlZCBPYnNlcnZlcnMgZm9yIHRoaXMgTm90aWZpY2F0aW9uJ3NcclxuICogbGlzdCBhcmUgbm90aWZpZWQgYW5kIGFyZSBwYXNzZWQgYSByZWZlcmVuY2UgdG8gdGhlIElOb3RpZmljYXRpb24gaW5cclxuICogdGhlIG9yZGVyIGluIHdoaWNoIHRoZXkgd2VyZSByZWdpc3RlcmVkLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3B1cmVtdmMuTm90aWZpY2F0aW9ufSBub3RpZmljYXRpb25cclxuICogIFRoZSBOb3RpZmljYXRpb24gdG8gbm90aWZ5IE9ic2VydmVycyBvZlxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuVmlldy5wcm90b3R5cGUubm90aWZ5T2JzZXJ2ZXJzID0gZnVuY3Rpb24obm90aWZpY2F0aW9uKVxyXG57XHJcbiAgICAvLyBTSUNcclxuICAgIGlmKHRoaXMub2JzZXJ2ZXJNYXBbbm90aWZpY2F0aW9uLmdldE5hbWUoKV0gIT0gbnVsbClcclxuICAgIHtcclxuICAgICAgICB2YXIgb2JzZXJ2ZXJzX3JlZiA9IHRoaXMub2JzZXJ2ZXJNYXBbbm90aWZpY2F0aW9uLmdldE5hbWUoKV0sIG9ic2VydmVycyA9IFtdLCBvYnNlcnZlclxyXG5cclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgb2JzZXJ2ZXJzX3JlZi5sZW5ndGg7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG9ic2VydmVyID0gb2JzZXJ2ZXJzX3JlZltpXTtcclxuICAgICAgICAgICAgb2JzZXJ2ZXJzLnB1c2gob2JzZXJ2ZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IG9ic2VydmVycy5sZW5ndGg7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG9ic2VydmVyID0gb2JzZXJ2ZXJzW2ldO1xyXG4gICAgICAgICAgICBvYnNlcnZlci5ub3RpZnlPYnNlcnZlcihub3RpZmljYXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmUgdGhlIE9ic2VydmVyIGZvciBhIGdpdmVuIG5vdGlmeUNvbnRleHQgZnJvbSBhbiBvYnNlcnZlciBsaXN0IGZvclxyXG4gKiBhIGdpdmVuIE5vdGlmaWNhdGlvbiBuYW1lXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBub3RpZmljYXRpb25OYW1lXHJcbiAqICBXaGljaCBvYnNlcnZlciBsaXN0IHRvIHJlbW92ZSBmcm9tXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBub3RpZnlDb250ZXh0XHJcbiAqICBSZW1vdmUgdGhlIE9ic2VydmVyIHdpdGggdGhpcyBvYmplY3QgYXMgaXRzIG5vdGlmeUNvbnRleHRcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcblZpZXcucHJvdG90eXBlLnJlbW92ZU9ic2VydmVyID0gZnVuY3Rpb24obm90aWZpY2F0aW9uTmFtZSwgbm90aWZ5Q29udGV4dClcclxue1xyXG4gICAgLy8gU0lDXHJcbiAgICB2YXIgb2JzZXJ2ZXJzID0gdGhpcy5vYnNlcnZlck1hcFtub3RpZmljYXRpb25OYW1lXTtcclxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBvYnNlcnZlcnMubGVuZ3RoOyBpKyspXHJcbiAgICB7XHJcbiAgICAgICAgaWYob2JzZXJ2ZXJzW2ldLmNvbXBhcmVOb3RpZnlDb250ZXh0KG5vdGlmeUNvbnRleHQpID09IHRydWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBvYnNlcnZlcnMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYob2JzZXJ2ZXJzLmxlbmd0aCA9PSAwKVxyXG4gICAge1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLm9ic2VydmVyTWFwW25vdGlmaWNhdGlvbk5hbWVdO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlZ2lzdGVyIGEgTWVkaWF0b3IgaW5zdGFuY2Ugd2l0aCB0aGUgVmlldy5cclxuICpcclxuICogUmVnaXN0ZXJzIHRoZSBNZWRpYXRvciBzbyB0aGF0IGl0IGNhbiBiZSByZXRyaWV2ZWQgYnkgbmFtZSxcclxuICogYW5kIGZ1cnRoZXIgaW50ZXJyb2dhdGVzIHRoZSBNZWRpYXRvciBmb3IgaXRzXHJcbiAqIHtAbGluayBwdXJlbXZjLk1lZGlhdG9yI2xpc3ROb3RpZmljYXRpb25JbnRlcmVzdHMgaW50ZXJlc3RzfS5cclxuICpcclxuICogSWYgdGhlIE1lZGlhdG9yIHJldHVybnMgYW55IE5vdGlmaWNhdGlvblxyXG4gKiBuYW1lcyB0byBiZSBub3RpZmllZCBhYm91dCwgYW4gT2JzZXJ2ZXIgaXMgY3JlYXRlZCBlbmNhcHN1bGF0aW5nXHJcbiAqIHRoZSBNZWRpYXRvciBpbnN0YW5jZSdzXHJcbiAqIHtAbGluayBwdXJlbXZjLk1lZGlhdG9yI2hhbmRsZU5vdGlmaWNhdGlvbiBoYW5kbGVOb3RpZmljYXRpb259XHJcbiAqIG1ldGhvZCBhbmQgcmVnaXN0ZXJpbmcgaXQgYXMgYW4gT2JzZXJ2ZXIgZm9yIGFsbCBOb3RpZmljYXRpb25zIHRoZVxyXG4gKiBNZWRpYXRvciBpcyBpbnRlcmVzdGVkIGluLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3B1cmVtdmMuTWVkaWF0b3J9XHJcbiAqICBhIHJlZmVyZW5jZSB0byB0aGUgTWVkaWF0b3IgaW5zdGFuY2VcclxuICovXHJcblZpZXcucHJvdG90eXBlLnJlZ2lzdGVyTWVkaWF0b3IgPSBmdW5jdGlvbihtZWRpYXRvcilcclxue1xyXG4gICAgaWYodGhpcy5tZWRpYXRvck1hcFttZWRpYXRvci5nZXRNZWRpYXRvck5hbWUoKV0gIT0gbnVsbClcclxuICAgIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbWVkaWF0b3IuaW5pdGlhbGl6ZU5vdGlmaWVyKHRoaXMubXVsdGl0b25LZXkpO1xyXG4gICAgLy8gcmVnaXN0ZXIgdGhlIG1lZGlhdG9yIGZvciByZXRyaWV2YWwgYnkgbmFtZVxyXG4gICAgdGhpcy5tZWRpYXRvck1hcFttZWRpYXRvci5nZXRNZWRpYXRvck5hbWUoKV0gPSBtZWRpYXRvcjtcclxuXHJcbiAgICAvLyBnZXQgbm90aWZpY2F0aW9uIGludGVyZXN0cyBpZiBhbnlcclxuICAgIHZhciBpbnRlcmVzdHMgPSBtZWRpYXRvci5saXN0Tm90aWZpY2F0aW9uSW50ZXJlc3RzKCk7XHJcblxyXG4gICAgLy8gcmVnaXN0ZXIgbWVkaWF0b3IgYXMgYW4gb2JzZXJ2ZXIgZm9yIGVhY2ggbm90aWZpY2F0aW9uXHJcbiAgICBpZihpbnRlcmVzdHMubGVuZ3RoID4gMClcclxuICAgIHtcclxuICAgICAgICAvLyBjcmVhdGUgb2JzZXJ2ZXIgcmVmZXJlbmNpbmcgdGhpcyBtZWRpYXRvcnMgaGFuZGxlTm90aWZpY2F0aW9uIG1ldGhvZFxyXG4gICAgICAgIHZhciBvYnNlcnZlciA9IG5ldyBPYnNlcnZlcihtZWRpYXRvci5oYW5kbGVOb3RpZmljYXRpb24sIG1lZGlhdG9yKTtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgaW50ZXJlc3RzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3Rlck9ic2VydmVyKGludGVyZXN0c1tpXSwgb2JzZXJ2ZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtZWRpYXRvci5vblJlZ2lzdGVyKCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXRyaWV2ZSBhIE1lZGlhdG9yIGZyb20gdGhlIFZpZXdcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG1lZGlhdG9yTmFtZVxyXG4gKiAgVGhlIG5hbWUgb2YgdGhlIE1lZGlhdG9yIGluc3RhbmNlIHRvIHJldHJpZXZlXHJcbiAqIEByZXR1cm4ge3B1cmVtdmMuTWVkaWF0b3J9XHJcbiAqICBUaGUgTWVkaWF0b3IgaW5zdGFuY2UgcHJldmlvdXNseSByZWdpc3RlcmVkIHdpdGggdGhlIGdpdmVuIG1lZGlhdG9yTmFtZVxyXG4gKi9cclxuVmlldy5wcm90b3R5cGUucmV0cmlldmVNZWRpYXRvciA9IGZ1bmN0aW9uKG1lZGlhdG9yTmFtZSlcclxue1xyXG4gICAgcmV0dXJuIHRoaXMubWVkaWF0b3JNYXBbbWVkaWF0b3JOYW1lXTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmUgYSBNZWRpYXRvciBmcm9tIHRoZSBWaWV3LlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVkaWF0b3JOYW1lXHJcbiAqICBOYW1lIG9mIHRoZSBNZWRpYXRvciBpbnN0YW5jZSB0byBiZSByZW1vdmVkXHJcbiAqIEByZXR1cm4ge3B1cmVtdmMuTWVkaWF0b3J9XHJcbiAqICBUaGUgTWVkaWF0b3IgdGhhdCB3YXMgcmVtb3ZlZCBmcm9tIHRoZSBWaWV3XHJcbiAqL1xyXG5WaWV3LnByb3RvdHlwZS5yZW1vdmVNZWRpYXRvciA9IGZ1bmN0aW9uKG1lZGlhdG9yTmFtZSlcclxue1xyXG4gICAgdmFyIG1lZGlhdG9yID0gdGhpcy5tZWRpYXRvck1hcFttZWRpYXRvck5hbWVdO1xyXG4gICAgaWYobWVkaWF0b3IpXHJcbiAgICB7XHJcbiAgICAgICAgLy8gZm9yIGV2ZXJ5IG5vdGlmaWNhdGlvbiB0aGUgbWVkaWF0b3IgaXMgaW50ZXJlc3RlZCBpbi4uLlxyXG4gICAgICAgIHZhciBpbnRlcmVzdHMgPSBtZWRpYXRvci5saXN0Tm90aWZpY2F0aW9uSW50ZXJlc3RzKCk7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGludGVyZXN0cy5sZW5ndGg7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIHJlbW92ZSB0aGUgb2JzZXJ2ZXIgbGlua2luZyB0aGUgbWVkaWF0b3IgdG8gdGhlIG5vdGlmaWNhdGlvblxyXG4gICAgICAgICAgICAvLyBpbnRlcmVzdFxyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZU9ic2VydmVyKGludGVyZXN0c1tpXSwgbWVkaWF0b3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gcmVtb3ZlIHRoZSBtZWRpYXRvciBmcm9tIHRoZSBtYXBcclxuICAgICAgICBkZWxldGUgdGhpcy5tZWRpYXRvck1hcFttZWRpYXRvck5hbWVdO1xyXG5cclxuICAgICAgICAvLyBhbGVydCB0aGUgbWVkaWF0b3IgdGhhdCBpdCBoYXMgYmVlbiByZW1vdmVkXHJcbiAgICAgICAgbWVkaWF0b3Iub25SZW1vdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbWVkaWF0b3I7XHJcbn07XHJcblxyXG4vKipcclxuICogQ2hlY2sgaWYgYSBNZWRpYXRvciBpcyByZWdpc3RlcmVkIG9yIG5vdC5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG1lZGlhdG9yTmFtZVxyXG4gKiBAcmV0dXJuIHtib29sZWFufVxyXG4gKiAgV2hldGhlciBhIE1lZGlhdG9yIGlzIHJlZ2lzdGVyZWQgd2l0aCB0aGUgZ2l2ZW4gbWVkaWF0b3JuYW1lXHJcbiAqL1xyXG5WaWV3LnByb3RvdHlwZS5oYXNNZWRpYXRvciA9IGZ1bmN0aW9uKG1lZGlhdG9yTmFtZSlcclxue1xyXG4gICAgcmV0dXJuIHRoaXMubWVkaWF0b3JNYXBbbWVkaWF0b3JOYW1lXSAhPSBudWxsO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSBhIFZpZXcgaW5zdGFuY2VcclxuICpcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcblZpZXcucmVtb3ZlVmlldyA9IGZ1bmN0aW9uKGtleSlcclxue1xyXG4gICAgZGVsZXRlIFZpZXcuaW5zdGFuY2VNYXBba2V5XTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqIFRoZSBWaWV3cyBpbnRlcm5hbCBtYXBwaW5nIG9mIG1lZGlhdG9yIG5hbWVzIHRvIG1lZGlhdG9yIGluc3RhbmNlc1xyXG4gKlxyXG4gKiBAdHlwZSBBcnJheVxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqL1xyXG5WaWV3LnByb3RvdHlwZS5tZWRpYXRvck1hcCA9IG51bGw7XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKiBUaGUgVmlld3MgaW50ZXJuYWwgbWFwcGluZyBvZiBOb3RpZmljYXRpb24gbmFtZXMgdG8gT2JzZXJ2ZXIgbGlzdHNcclxuICpcclxuICogQHR5cGUgQXJyYXlcclxuICogQHByb3RlY3RlZFxyXG4gKi9cclxuVmlldy5wcm90b3R5cGUub2JzZXJ2ZXJNYXAgPSBudWxsO1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICogVGhlIGludGVybmFsIG1hcCB1c2VkIHRvIHN0b3JlIG11bHRpdG9uIFZpZXcgaW5zdGFuY2VzXHJcbiAqXHJcbiAqIEB0eXBlIEFycmF5XHJcbiAqIEBwcm90ZWN0ZWRcclxuICovXHJcblZpZXcuaW5zdGFuY2VNYXAgPSBbXTtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqIFRoZSBWaWV3cyBpbnRlcm5hbCBtdWx0aXRvbiBrZXkuXHJcbiAqXHJcbiAqIEB0eXBlIHN0cmluZ1xyXG4gKiBAcHJvdGVjdGVkXHJcbiAqL1xyXG5WaWV3LnByb3RvdHlwZS5tdWx0aXRvbktleSA9IG51bGw7XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKiBUaGUgZXJyb3IgbWVzc2FnZSB1c2VkIGlmIGFuIGF0dGVtcHQgaXMgbWFkZSB0byBpbnN0YW50aWF0ZSBWaWV3IGRpcmVjdGx5XHJcbiAqXHJcbiAqIEB0eXBlIHN0cmluZ1xyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEBjb25zdFxyXG4gKiBAc3RhdGljXHJcbiAqL1xyXG5WaWV3Lk1VTFRJVE9OX01TRyA9IFwiVmlldyBpbnN0YW5jZSBmb3IgdGhpcyBNdWx0aXRvbiBrZXkgYWxyZWFkeSBjb25zdHJ1Y3RlZCFcIjtcclxuLyoqXHJcbiAqIEBhdXRob3IgUHVyZU1WQyBKUyBOYXRpdmUgUG9ydCBieSBEYXZpZCBGb2xleSwgRnLDqWTDqXJpYyBTYXVuaWVyLCAmIEFsYWluIER1Y2hlc25lYXVcclxuICogQGF1dGhvciBDb3B5cmlnaHQoYykgMjAwNi0yMDEyIEZ1dHVyZXNjYWxlLCBJbmMuLCBTb21lIHJpZ2h0cyByZXNlcnZlZC5cclxuICpcclxuICogQGNsYXNzIHB1cmVtdmMuTW9kZWxcclxuICpcclxuICogQSBNdWx0aXRvbiBNb2RlbCBpbXBsZW1lbnRhdGlvbi5cclxuICpcclxuICogSW4gUHVyZU1WQywgdGhlIE1vZGVsIGNsYXNzIHByb3ZpZGVzXHJcbiAqIGFjY2VzcyB0byBtb2RlbCBvYmplY3RzIChQcm94aWVzKSBieSBuYW1lZCBsb29rdXAuXHJcbiAqXHJcbiAqIFRoZSBNb2RlbCBhc3N1bWVzIHRoZXNlIHJlc3BvbnNpYmlsaXRpZXM6XHJcbiAqXHJcbiAqIC0gTWFpbnRhaW4gYSBjYWNoZSBvZiB7QGxpbmsgcHVyZW12Yy5Qcm94eSBQcm94eX1cclxuICogICBpbnN0YW5jZXMuXHJcbiAqIC0gUHJvdmlkZSBtZXRob2RzIGZvciByZWdpc3RlcmluZywgcmV0cmlldmluZywgYW5kIHJlbW92aW5nXHJcbiAqICAge0BsaW5rIHB1cmVtdmMuUHJveHkgUHJveHl9IGluc3RhbmNlcy5cclxuICpcclxuICogWW91ciBhcHBsaWNhdGlvbiBtdXN0IHJlZ2lzdGVyXHJcbiAqIHtAbGluayBwdXJlbXZjLlByb3h5IFByb3h5fSBpbnN0YW5jZXMgd2l0aCB0aGUgTW9kZWwuXHJcbiAqIFR5cGljYWxseSwgeW91IHVzZSBhXHJcbiAqIHtAbGluayBwdXJlbXZjLlNpbXBsZUNvbW1hbmQgU2ltcGxlQ29tbWFuZH1cclxuICogb3JcclxuICoge0BsaW5rIHB1cmVtdmMuTWFjcm9Db21tYW5kIE1hY3JvQ29tbWFuZH1cclxuICogdG8gY3JlYXRlIGFuZCByZWdpc3RlciBQcm94eSBpbnN0YW5jZXMgb25jZSB0aGUgRmFjYWRlIGhhcyBpbml0aWFsaXplZCB0aGVcclxuICogKkNvcmUqIGFjdG9ycy5cclxuICpcclxuICogVGhpcyBNb2RlbCBpbXBsZW1lbnRhdGlvbiBpcyBhIE11bHRpdG9uLCBzbyB5b3Ugc2hvdWxkIG5vdCBjYWxsIHRoZVxyXG4gKiBjb25zdHJ1Y3RvciBkaXJlY3RseSwgYnV0IGluc3RlYWQgY2FsbCB0aGVcclxuICoge0BsaW5rICNnZXRJbnN0YW5jZSBzdGF0aWMgTXVsdGl0b24gRmFjdG9yeSBtZXRob2R9XHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5XHJcbiAqICBUaGUgTW9kZWxzIG11bHRpdG9uIGtleVxyXG4gKiBAdGhyb3dzIHtFcnJvcn1cclxuICogIEFuIGVycm9yIGlzIHRocm93biBpZiB0aGlzIG11bHRpdG9ucyBrZXkgaXMgYWxyZWFkeSBpbiB1c2UgYnkgYW5vdGhlciBpbnN0YW5jZVxyXG4gKi9cclxuZnVuY3Rpb24gTW9kZWwoa2V5KVxyXG57XHJcbiAgICBpZihNb2RlbC5pbnN0YW5jZU1hcFtrZXldKVxyXG4gICAge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihNb2RlbC5NVUxUSVRPTl9NU0cpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubXVsdGl0b25LZXk9IGtleTtcclxuICAgIE1vZGVsLmluc3RhbmNlTWFwW2tleV09IHRoaXM7XHJcbiAgICB0aGlzLnByb3h5TWFwPSBbXTtcclxuICAgIHRoaXMuaW5pdGlhbGl6ZU1vZGVsKCk7XHJcbn07XHJcblxyXG4vKipcclxuICogSW5pdGlhbGl6ZSB0aGUgTW9kZWwgaW5zdGFuY2UuXHJcbiAqXHJcbiAqIENhbGxlZCBhdXRvbWF0aWNhbGx5IGJ5IHRoZSBjb25zdHJ1Y3RvciwgdGhpc1xyXG4gKiBpcyB5b3VyIG9wcG9ydHVuaXR5IHRvIGluaXRpYWxpemUgdGhlIFNpbmdsZXRvblxyXG4gKiBpbnN0YW5jZSBpbiB5b3VyIHN1YmNsYXNzIHdpdGhvdXQgb3ZlcnJpZGluZyB0aGVcclxuICogY29uc3RydWN0b3IuXHJcbiAqXHJcbiAqIEByZXR1cm4gdm9pZFxyXG4gKi9cclxuTW9kZWwucHJvdG90eXBlLmluaXRpYWxpemVNb2RlbD0gZnVuY3Rpb24oKXt9O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBNb2RlbCBNdWx0aXRvbiBGYWN0b3J5IG1ldGhvZC5cclxuICogTm90ZSB0aGF0IHRoaXMgbWV0aG9kIHdpbGwgcmV0dXJuIG51bGwgaWYgc3VwcGxpZWQgYSBudWxsXHJcbiAqIG9yIHVuZGVmaW5lZCBtdWx0aXRvbiBrZXkuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcclxuICogIFRoZSBtdWx0aXRvbiBrZXkgZm9yIHRoZSBNb2RlbCB0byByZXRyaWV2ZVxyXG4gKiBAcmV0dXJuIHtwdXJlbXZjLk1vZGVsfVxyXG4gKiAgdGhlIGluc3RhbmNlIGZvciB0aGlzIE11bHRpdG9uIGtleVxyXG4gKi9cclxuTW9kZWwuZ2V0SW5zdGFuY2U9IGZ1bmN0aW9uKGtleSlcclxue1xyXG4gICAgaWYgKG51bGwgPT0ga2V5KVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG5cclxuICAgIGlmKE1vZGVsLmluc3RhbmNlTWFwW2tleV0gPT0gbnVsbClcclxuICAgIHtcclxuICAgICAgICBNb2RlbC5pbnN0YW5jZU1hcFtrZXldPSBuZXcgTW9kZWwoa2V5KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gTW9kZWwuaW5zdGFuY2VNYXBba2V5XTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZWdpc3RlciBhIFByb3h5IHdpdGggdGhlIE1vZGVsXHJcbiAqIEBwYXJhbSB7cHVyZW12Yy5Qcm94eX1cclxuICovXHJcbk1vZGVsLnByb3RvdHlwZS5yZWdpc3RlclByb3h5PSBmdW5jdGlvbihwcm94eSlcclxue1xyXG4gICAgcHJveHkuaW5pdGlhbGl6ZU5vdGlmaWVyKHRoaXMubXVsdGl0b25LZXkpO1xyXG4gICAgdGhpcy5wcm94eU1hcFtwcm94eS5nZXRQcm94eU5hbWUoKV09IHByb3h5O1xyXG4gICAgcHJveHkub25SZWdpc3RlcigpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHJpZXZlIGEgUHJveHkgZnJvbSB0aGUgTW9kZWxcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHByb3h5TmFtZVxyXG4gKiBAcmV0dXJuIHtwdXJlbXZjLlByb3h5fVxyXG4gKiAgVGhlIFByb3h5IGluc3RhbmNlIHByZXZpb3VzbHkgcmVnaXN0ZXJlZCB3aXRoIHRoZSBwcm92aWRlZCBwcm94eU5hbWVcclxuICovXHJcbk1vZGVsLnByb3RvdHlwZS5yZXRyaWV2ZVByb3h5PSBmdW5jdGlvbihwcm94eU5hbWUpXHJcbntcclxuICAgIHJldHVybiB0aGlzLnByb3h5TWFwW3Byb3h5TmFtZV07XHJcbn07XHJcblxyXG4vKipcclxuICogQ2hlY2sgaWYgYSBQcm94eSBpcyByZWdpc3RlcmVkXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm94eU5hbWVcclxuICogQHJldHVybiB7Ym9vbGVhbn1cclxuICogIHdoZXRoZXIgYSBQcm94eSBpcyBjdXJyZW50bHkgcmVnaXN0ZXJlZCB3aXRoIHRoZSBnaXZlbiBwcm94eU5hbWUuXHJcbiAqL1xyXG5Nb2RlbC5wcm90b3R5cGUuaGFzUHJveHk9IGZ1bmN0aW9uKHByb3h5TmFtZSlcclxue1xyXG4gICAgcmV0dXJuIHRoaXMucHJveHlNYXBbcHJveHlOYW1lXSAhPSBudWxsO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSBhIFByb3h5IGZyb20gdGhlIE1vZGVsLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJveHlOYW1lXHJcbiAqICBUaGUgbmFtZSBvZiB0aGUgUHJveHkgaW5zdGFuY2UgdG8gcmVtb3ZlXHJcbiAqIEByZXR1cm4ge3B1cmVtdmMuUHJveHl9XHJcbiAqICBUaGUgUHJveHkgdGhhdCB3YXMgcmVtb3ZlZCBmcm9tIHRoZSBNb2RlbFxyXG4gKi9cclxuTW9kZWwucHJvdG90eXBlLnJlbW92ZVByb3h5PSBmdW5jdGlvbihwcm94eU5hbWUpXHJcbntcclxuICAgIHZhciBwcm94eT0gdGhpcy5wcm94eU1hcFtwcm94eU5hbWVdO1xyXG4gICAgaWYocHJveHkpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5wcm94eU1hcFtwcm94eU5hbWVdPSBudWxsO1xyXG4gICAgICAgIHByb3h5Lm9uUmVtb3ZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHByb3h5O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBzdGF0aWNcclxuICogUmVtb3ZlIGEgTW9kZWwgaW5zdGFuY2UuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbk1vZGVsLnJlbW92ZU1vZGVsPSBmdW5jdGlvbihrZXkpXHJcbntcclxuICAgIGRlbGV0ZSBNb2RlbC5pbnN0YW5jZU1hcFtrZXldO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICogVGhlIG1hcCB1c2VkIGJ5IHRoZSBNb2RlbCB0byBzdG9yZSBQcm94eSBpbnN0YW5jZXMuXHJcbiAqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQHR5cGUgQXJyYXlcclxuICovXHJcbk1vZGVsLnByb3RvdHlwZS5wcm94eU1hcD0gbnVsbDtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqIFRoZSBtYXAgdXNlZCBieSB0aGUgTW9kZWwgdG8gc3RvcmUgbXVsdGl0b24gaW5zdGFuY2VzXHJcbiAqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQHN0YXRpY1xyXG4gKiBAdHlwZSBBcnJheVxyXG4gKi9cclxuTW9kZWwuaW5zdGFuY2VNYXA9IFtdO1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICogVGhlIE1vZGVscyBtdWx0aXRvbiBrZXkuXHJcbiAqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQHR5cGUgc3RyaW5nXHJcbiAqL1xyXG5Nb2RlbC5wcm90b3R5cGUubXVsdGl0b25LZXk7XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKiBNZXNzYWdlIENvbnN0YW50c1xyXG4gKlxyXG4gKiBAc3RhdGljXHJcbiAqIEB0eXBlIHtzdHJpbmd9XHJcbiAqL1xyXG5Nb2RlbC5NVUxUSVRPTl9NU0c9IFwiTW9kZWwgaW5zdGFuY2UgZm9yIHRoaXMgTXVsdGl0b24ga2V5IGFscmVhZHkgY29uc3RydWN0ZWQhXCI7XHJcbi8qKlxyXG4gKiBAYXV0aG9yIFB1cmVNVkMgSlMgTmF0aXZlIFBvcnQgYnkgRGF2aWQgRm9sZXksIEZyw6lkw6lyaWMgU2F1bmllciwgJiBBbGFpbiBEdWNoZXNuZWF1XHJcbiAqIEBhdXRob3IgQ29weXJpZ2h0KGMpIDIwMDYtMjAxMiBGdXR1cmVzY2FsZSwgSW5jLiwgU29tZSByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIEBjbGFzcyBwdXJlbXZjLkNvbnRyb2xsZXJcclxuICpcclxuICogSW4gUHVyZU1WQywgdGhlIENvbnRyb2xsZXIgY2xhc3MgZm9sbG93cyB0aGUgJ0NvbW1hbmQgYW5kIENvbnRyb2xsZXInXHJcbiAqIHN0cmF0ZWd5LCBhbmQgYXNzdW1lcyB0aGVzZSByZXNwb25zaWJpbGl0aWVzOlxyXG4gKlxyXG4gKiAtIFJlbWVtYmVyaW5nIHdoaWNoXHJcbiAqIHtAbGluayBwdXJlbXZjLlNpbXBsZUNvbW1hbmQgU2ltcGxlQ29tbWFuZH1zXHJcbiAqIG9yXHJcbiAqIHtAbGluayBwdXJlbXZjLk1hY3JvQ29tbWFuZCBNYWNyb0NvbW1hbmR9c1xyXG4gKiBhcmUgaW50ZW5kZWQgdG8gaGFuZGxlIHdoaWNoXHJcbiAqIHtAbGluayBwdXJlbXZjLk5vdGlmaWNhdGlvbiBOb3RpZmljYXRpb259c1xyXG4gKiAtIFJlZ2lzdGVyaW5nIGl0c2VsZiBhcyBhblxyXG4gKiB7QGxpbmsgcHVyZW12Yy5PYnNlcnZlciBPYnNlcnZlcn0gd2l0aFxyXG4gKiB0aGUge0BsaW5rIHB1cmVtdmMuVmlldyBWaWV3fSBmb3IgZWFjaFxyXG4gKiB7QGxpbmsgcHVyZW12Yy5Ob3RpZmljYXRpb24gTm90aWZpY2F0aW9ufVxyXG4gKiB0aGF0IGl0IGhhcyBhblxyXG4gKiB7QGxpbmsgcHVyZW12Yy5TaW1wbGVDb21tYW5kIFNpbXBsZUNvbW1hbmR9XHJcbiAqIG9yIHtAbGluayBwdXJlbXZjLk1hY3JvQ29tbWFuZCBNYWNyb0NvbW1hbmR9XHJcbiAqIG1hcHBpbmcgZm9yLlxyXG4gKiAtIENyZWF0aW5nIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBwcm9wZXJcclxuICoge0BsaW5rIHB1cmVtdmMuU2ltcGxlQ29tbWFuZCBTaW1wbGVDb21tYW5kfXNcclxuICogb3JcclxuICoge0BsaW5rIHB1cmVtdmMuTWFjcm9Db21tYW5kIE1hY3JvQ29tbWFuZH1zXHJcbiAqIHRvIGhhbmRsZSBhIGdpdmVuXHJcbiAqIHtAbGluayBwdXJlbXZjLk5vdGlmaWNhdGlvbiBOb3RpZmljYXRpb259XHJcbiAqIHdoZW4gbm90aWZpZWQgYnkgdGhlXHJcbiAqIHtAbGluayBwdXJlbXZjLlZpZXcgVmlld30uXHJcbiAqIC0gQ2FsbGluZyB0aGUgY29tbWFuZCdzIGV4ZWN1dGUgbWV0aG9kLCBwYXNzaW5nIGluIHRoZVxyXG4gKiB7QGxpbmsgcHVyZW12Yy5Ob3RpZmljYXRpb24gTm90aWZpY2F0aW9ufS5cclxuICpcclxuICogWW91ciBhcHBsaWNhdGlvbiBtdXN0IHJlZ2lzdGVyXHJcbiAqIHtAbGluayBwdXJlbXZjLlNpbXBsZUNvbW1hbmQgU2ltcGxlQ29tbWFuZH1zXHJcbiAqIG9yIHtAbGluayBwdXJlbXZjLk1hY3JvQ29tbWFuZCBNYWNyb0NvbW1hbmR9c1xyXG4gKiB3aXRoIHRoZSBDb250cm9sbGVyLlxyXG4gKlxyXG4gKiBUaGUgc2ltcGxlc3Qgd2F5IGlzIHRvIHN1YmNsYXNzXHJcbiAqIHtAbGluayBwdXJlbXZjLkZhY2FkZSBGYWNhZGV9LFxyXG4gKiBhbmQgdXNlIGl0c1xyXG4gKiB7QGxpbmsgcHVyZW12Yy5GYWNhZGUjaW5pdGlhbGl6ZUNvbnRyb2xsZXIgaW5pdGlhbGl6ZUNvbnRyb2xsZXJ9XHJcbiAqIG1ldGhvZCB0byBhZGQgeW91ciByZWdpc3RyYXRpb25zLlxyXG4gKlxyXG4gKiBAY29uc3RydWN0b3JcclxuICogVGhpcyBDb250cm9sbGVyIGltcGxlbWVudGF0aW9uIGlzIGEgTXVsdGl0b24sIHNvIHlvdSBzaG91bGQgbm90IGNhbGwgdGhlXHJcbiAqIGNvbnN0cnVjdG9yIGRpcmVjdGx5LCBidXQgaW5zdGVhZCBjYWxsIHRoZSBzdGF0aWMgI2dldEluc3RhbmNlIGZhY3RvcnkgbWV0aG9kLFxyXG4gKiBwYXNzaW5nIHRoZSB1bmlxdWUga2V5IGZvciB0aGlzIGluc3RhbmNlIHRvIGl0LlxyXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5XHJcbiAqIEB0aHJvd3Mge0Vycm9yfVxyXG4gKiAgSWYgaW5zdGFuY2UgZm9yIHRoaXMgTXVsdGl0b24ga2V5IGhhcyBhbHJlYWR5IGJlZW4gY29uc3RydWN0ZWRcclxuICovXHJcbmZ1bmN0aW9uIENvbnRyb2xsZXIoa2V5KVxyXG57XHJcbiAgICBpZihDb250cm9sbGVyLmluc3RhbmNlTWFwW2tleV0gIT0gbnVsbClcclxuICAgIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoQ29udHJvbGxlci5NVUxUSVRPTl9NU0cpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubXVsdGl0b25LZXk9IGtleTtcclxuICAgIENvbnRyb2xsZXIuaW5zdGFuY2VNYXBbdGhpcy5tdWx0aXRvbktleV09IHRoaXM7XHJcbiAgICB0aGlzLmNvbW1hbmRNYXA9IG5ldyBBcnJheSgpO1xyXG4gICAgdGhpcy5pbml0aWFsaXplQ29udHJvbGxlcigpO1xyXG59XHJcblxyXG4vKipcclxuICogQHByb3RlY3RlZFxyXG4gKlxyXG4gKiBJbml0aWFsaXplIHRoZSBtdWx0aXRvbiBDb250cm9sbGVyIGluc3RhbmNlLlxyXG4gKlxyXG4gKiBDYWxsZWQgYXV0b21hdGljYWxseSBieSB0aGUgY29uc3RydWN0b3IuXHJcbiAqXHJcbiAqIE5vdGUgdGhhdCBpZiB5b3UgYXJlIHVzaW5nIGEgc3ViY2xhc3Mgb2YgVmlld1xyXG4gKiBpbiB5b3VyIGFwcGxpY2F0aW9uLCB5b3Ugc2hvdWxkICphbHNvKiBzdWJjbGFzcyBDb250cm9sbGVyXHJcbiAqIGFuZCBvdmVycmlkZSB0aGUgaW5pdGlhbGl6ZUNvbnRyb2xsZXIgbWV0aG9kIGluIHRoZVxyXG4gKiBmb2xsb3dpbmcgd2F5LlxyXG4gKlxyXG4gKiAgICAgTXlDb250cm9sbGVyLnByb3RvdHlwZS5pbml0aWFsaXplQ29udHJvbGxlcj0gZnVuY3Rpb24gKClcclxuICogICAgIHtcclxuICogICAgICAgICB0aGlzLnZpZXc9IE15Vmlldy5nZXRJbnN0YW5jZSh0aGlzLm11bHRpdG9uS2V5KTtcclxuICogICAgIH07XHJcbiAqXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5Db250cm9sbGVyLnByb3RvdHlwZS5pbml0aWFsaXplQ29udHJvbGxlcj0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICB0aGlzLnZpZXc9IFZpZXcuZ2V0SW5zdGFuY2UodGhpcy5tdWx0aXRvbktleSk7XHJcbn07XHJcblxyXG4vKipcclxuICogVGhlIENvbnRyb2xsZXJzIG11bHRpdG9uIGZhY3RvcnkgbWV0aG9kLlxyXG4gKiBOb3RlIHRoYXQgdGhpcyBtZXRob2Qgd2lsbCByZXR1cm4gbnVsbCBpZiBzdXBwbGllZCBhIG51bGxcclxuICogb3IgdW5kZWZpbmVkIG11bHRpdG9uIGtleS5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IGtleVxyXG4gKiAgQSBDb250cm9sbGVyJ3MgbXVsdGl0b24ga2V5XHJcbiAqIEByZXR1cm4ge3B1cmVtdmMuQ29udHJvbGxlcn1cclxuICogIHRoZSBNdWx0aXRvbiBpbnN0YW5jZSBvZiBDb250cm9sbGVyXHJcbiAqL1xyXG5Db250cm9sbGVyLmdldEluc3RhbmNlPSBmdW5jdGlvbihrZXkpXHJcbntcclxuICAgIGlmIChudWxsID09IGtleSlcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuXHJcbiAgICBpZihudWxsID09IHRoaXMuaW5zdGFuY2VNYXBba2V5XSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLmluc3RhbmNlTWFwW2tleV09IG5ldyB0aGlzKGtleSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VNYXBba2V5XTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBJZiBhIFNpbXBsZUNvbW1hbmQgb3IgTWFjcm9Db21tYW5kIGhhcyBwcmV2aW91c2x5IGJlZW4gcmVnaXN0ZXJlZCB0byBoYW5kbGVcclxuICogdGhlIGdpdmVuIE5vdGlmaWNhdGlvbiB0aGVuIGl0IGlzIGV4ZWN1dGVkLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3B1cmVtdmMuTm90aWZpY2F0aW9ufSBub3RlXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5Db250cm9sbGVyLnByb3RvdHlwZS5leGVjdXRlQ29tbWFuZD0gZnVuY3Rpb24obm90ZSlcclxue1xyXG4gICAgdmFyIGNvbW1hbmRDbGFzc1JlZj0gdGhpcy5jb21tYW5kTWFwW25vdGUuZ2V0TmFtZSgpXTtcclxuICAgIGlmKGNvbW1hbmRDbGFzc1JlZiA9PSBudWxsKVxyXG4gICAgICAgIHJldHVybjtcclxuXHJcbiAgICB2YXIgY29tbWFuZEluc3RhbmNlPSBuZXcgY29tbWFuZENsYXNzUmVmKCk7XHJcbiAgICBjb21tYW5kSW5zdGFuY2UuaW5pdGlhbGl6ZU5vdGlmaWVyKHRoaXMubXVsdGl0b25LZXkpO1xyXG4gICAgY29tbWFuZEluc3RhbmNlLmV4ZWN1dGUobm90ZSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVnaXN0ZXIgYSBwYXJ0aWN1bGFyIFNpbXBsZUNvbW1hbmQgb3IgTWFjcm9Db21tYW5kIGNsYXNzIGFzIHRoZSBoYW5kbGVyIGZvclxyXG4gKiBhIHBhcnRpY3VsYXIgTm90aWZpY2F0aW9uLlxyXG4gKlxyXG4gKiBJZiBhbiBjb21tYW5kIGFscmVhZHkgYmVlbiByZWdpc3RlcmVkIHRvIGhhbmRsZSBOb3RpZmljYXRpb25zIHdpdGggdGhpcyBuYW1lLFxyXG4gKiBpdCBpcyBubyBsb25nZXIgdXNlZCwgdGhlIG5ldyBjb21tYW5kIGlzIHVzZWQgaW5zdGVhZC5cclxuICpcclxuICogVGhlIE9ic2VydmVyIGZvciB0aGUgbmV3IGNvbW1hbmQgaXMgb25seSBjcmVhdGVkIGlmIHRoaXMgdGhlIGlyc3QgdGltZSBhXHJcbiAqIGNvbW1hbmQgaGFzIGJlZW4gcmVnaXNlcmVkIGZvciB0aGlzIE5vdGlmaWNhdGlvbiBuYW1lLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbm90aWZpY2F0aW9uTmFtZVxyXG4gKiAgdGhlIG5hbWUgb2YgdGhlIE5vdGlmaWNhdGlvblxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb21tYW5kQ2xhc3NSZWZcclxuICogIGEgY29tbWFuZCBjb25zdHJ1Y3RvclxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuQ29udHJvbGxlci5wcm90b3R5cGUucmVnaXN0ZXJDb21tYW5kPSBmdW5jdGlvbihub3RpZmljYXRpb25OYW1lLCBjb21tYW5kQ2xhc3NSZWYpXHJcbntcclxuICAgIGlmKHRoaXMuY29tbWFuZE1hcFtub3RpZmljYXRpb25OYW1lXSA9PSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudmlldy5yZWdpc3Rlck9ic2VydmVyKG5vdGlmaWNhdGlvbk5hbWUsIG5ldyBPYnNlcnZlcih0aGlzLmV4ZWN1dGVDb21tYW5kLCB0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jb21tYW5kTWFwW25vdGlmaWNhdGlvbk5hbWVdPSBjb21tYW5kQ2xhc3NSZWY7XHJcbn07XHJcblxyXG4vKipcclxuICogQ2hlY2sgaWYgYSBjb21tYW5kIGlzIHJlZ2lzdGVyZWQgZm9yIGEgZ2l2ZW4gTm90aWZpY2F0aW9uXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBub3RpZmljYXRpb25OYW1lXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAqICB3aGV0aGVyIGEgQ29tbWFuZCBpcyBjdXJyZW50bHkgcmVnaXN0ZXJlZCBmb3IgdGhlIGdpdmVuIG5vdGlmaWNhdGlvbk5hbWUuXHJcbiAqL1xyXG5Db250cm9sbGVyLnByb3RvdHlwZS5oYXNDb21tYW5kPSBmdW5jdGlvbihub3RpZmljYXRpb25OYW1lKVxyXG57XHJcbiAgICByZXR1cm4gdGhpcy5jb21tYW5kTWFwW25vdGlmaWNhdGlvbk5hbWVdICE9IG51bGw7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlIGEgcHJldmlvdXNseSByZWdpc3RlcmVkIGNvbW1hbmQgdG9cclxuICoge0BsaW5rIHB1cmVtdmMuTm90aWZpY2F0aW9uIE5vdGlmaWNhdGlvbn1cclxuICogbWFwcGluZy5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG5vdGlmaWNhdGlvbk5hbWVcclxuICogIHRoZSBuYW1lIG9mIHRoZSBOb3RpZmljYXRpb24gdG8gcmVtb3ZlIHRoZSBjb21tYW5kIG1hcHBpbmcgZm9yXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5Db250cm9sbGVyLnByb3RvdHlwZS5yZW1vdmVDb21tYW5kPSBmdW5jdGlvbihub3RpZmljYXRpb25OYW1lKVxyXG57XHJcbiAgICBpZih0aGlzLmhhc0NvbW1hbmQobm90aWZpY2F0aW9uTmFtZSkpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy52aWV3LnJlbW92ZU9ic2VydmVyKG5vdGlmaWNhdGlvbk5hbWUsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuY29tbWFuZE1hcFtub3RpZmljYXRpb25OYW1lXT0gbnVsbDtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBAc3RhdGljXHJcbiAqIFJlbW92ZSBhIENvbnRyb2xsZXIgaW5zdGFuY2UuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcclxuICogIG11bHRpdG9uS2V5IG9mIENvbnRyb2xsZXIgaW5zdGFuY2UgdG8gcmVtb3ZlXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5Db250cm9sbGVyLnJlbW92ZUNvbnRyb2xsZXI9IGZ1bmN0aW9uKGtleSlcclxue1xyXG4gICAgZGVsZXRlIHRoaXMuaW5zdGFuY2VNYXBba2V5XTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBMb2NhbCByZWZlcmVuY2UgdG8gdGhlIENvbnRyb2xsZXIncyBWaWV3XHJcbiAqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQHR5cGUge3B1cmVtdmMuVmlld31cclxuICovXHJcbkNvbnRyb2xsZXIucHJvdG90eXBlLnZpZXc9IG51bGw7XHJcblxyXG4vKipcclxuICogTm90ZSBuYW1lIHRvIGNvbW1hbmQgY29uc3RydWN0b3IgbWFwcGluZ3NcclxuICpcclxuICogQHByb3RlY3RlZFxyXG4gKiBAdHlwZSB7T2JqZWN0fVxyXG4gKi9cclxuQ29udHJvbGxlci5wcm90b3R5cGUuY29tbWFuZE1hcD0gbnVsbDtcclxuXHJcbi8qKlxyXG4gKiBUaGUgQ29udHJvbGxlcidzIG11bHRpdG9uIGtleVxyXG4gKlxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEB0eXBlIHtzdHJpbmd9XHJcbiAqL1xyXG5Db250cm9sbGVyLnByb3RvdHlwZS5tdWx0aXRvbktleT0gbnVsbDtcclxuXHJcbi8qKlxyXG4gKiBNdWx0aXRvbiBrZXkgdG8gQ29udHJvbGxlciBpbnN0YW5jZSBtYXBwaW5nc1xyXG4gKlxyXG4gKiBAc3RhdGljXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQHR5cGUge09iamVjdH1cclxuICovXHJcbkNvbnRyb2xsZXIuaW5zdGFuY2VNYXA9IFtdO1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICpcclxuICogTWVzc2FnZSBjb25zdGFudHNcclxuICogQHN0YXRpY1xyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEB0eXBlIHtzdHJpbmd9XHJcbiAqL1xyXG5Db250cm9sbGVyLk1VTFRJVE9OX01TRz0gXCJjb250cm9sbGVyIGtleSBmb3IgdGhpcyBNdWx0aXRvbiBrZXkgYWxyZWFkeSBjb25zdHJ1Y3RlZFwiXHJcbi8qXHJcbiAqIEBhdXRob3IgUHVyZU1WQyBKUyBOYXRpdmUgUG9ydCBieSBEYXZpZCBGb2xleSwgRnLDqWTDqXJpYyBTYXVuaWVyLCAmIEFsYWluIER1Y2hlc25lYXUgXHJcbiAqIEBhdXRob3IgQ29weXJpZ2h0KGMpIDIwMDYtMjAxMiBGdXR1cmVzY2FsZSwgSW5jLiwgU29tZSByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqIFxyXG4gKiBAaGlkZVxyXG4gKiBBIGFuIGludGVybmFsIGhlbHBlciBjbGFzcyB1c2VkIHRvIGFzc2lzdCBjbGFzc2xldCBpbXBsZW1lbnRhdGlvbi4gVGhpc1xyXG4gKiBjbGFzcyBpcyBub3QgYWNjZXNzaWJsZSBieSBjbGllbnQgY29kZS5cclxuICovXHJcbnZhciBPb3BIZWxwPVxyXG57XHJcbiAgICAvKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgc2NvcGUuIFdlIHVzZSB0aGlzIHJhdGhlciB0aGFuIHdpbmRvd1xyXG4gICAgICogaW4gb3JkZXIgdG8gc3VwcG9ydCBib3RoIGJyb3dzZXIgYmFzZWQgYW5kIG5vbiBicm93c2VyIGJhZWQgXHJcbiAgICAgKiBKYXZhU2NyaXB0IGludGVycHJldGVycy5cclxuICAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAgKi9cclxuICAgIGdsb2JhbDogKGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXN9KSgpXHJcblxyXG4gICAgLypcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBFeHRlbmQgb25lIEZ1bmN0aW9uJ3MgcHJvdG90eXBlIGJ5IGFub3RoZXIsIGVtdWxhdGluZyBjbGFzc2ljXHJcbiAgICAgKiBpbmhlcml0YW5jZS5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2hpbGRcclxuICAgICAqICBUaGUgRnVuY3Rpb24gdG8gZXh0ZW5kIChzdWJjbGFzcylcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gcGFyZW50XHJcbiAgICAgKiAgVGhlIEZ1bmN0aW9uIHRvIGV4dGVuZCBmcm9tIChzdXBlcmNsYXNzKVxyXG4gICAgICogXHJcbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn1cclxuICAgICAqIFxyXG4gICAgICogIEEgcmVmZXJlbmNlIHRvIHRoZSBleHRlbmRlZCBGdW5jdGlvbiAoc3ViY2xhc3MpXHJcbiAgICAgKi9cclxuICAgICwgICBleHRlbmQ6IGZ1bmN0aW9uIChjaGlsZCwgcGFyZW50KVxyXG57XHJcbiAgICBpZiAoJ2Z1bmN0aW9uJyAhPT0gdHlwZW9mIGNoaWxkKVxyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJyNleHRlbmQtIGNoaWxkIHNob3VsZCBiZSBGdW5jdGlvbicpO1xyXG5cclxuICAgIGlmICgnZnVuY3Rpb24nICE9PSB0eXBlb2YgcGFyZW50KVxyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJyNleHRlbmQtIHBhcmVudCBzaG91bGQgYmUgRnVuY3Rpb24nKTtcclxuXHJcbiAgICBpZiAocGFyZW50ID09PSBjaGlsZClcclxuICAgICAgICByZXR1cm47XHJcblxyXG4gICAgdmFyIFRyYW5zaXRpdmU9IG5ldyBGdW5jdGlvbjtcclxuICAgIFRyYW5zaXRpdmUucHJvdG90eXBlPSBwYXJlbnQucHJvdG90eXBlO1xyXG4gICAgY2hpbGQucHJvdG90eXBlPSBuZXcgVHJhbnNpdGl2ZTtcclxuICAgIHJldHVybiBjaGlsZC5wcm90b3R5cGUuY29uc3RydWN0b3I9IGNoaWxkO1xyXG59XHJcblxyXG4gICAgLypcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBEZWNvYXJhdGUgb25lIG9iamVjdCB3aXRoIHRoZSBwcm9wZXJ0aWVzIG9mIGFub3RoZXIuIFxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0XHJcbiAgICAgKiAgVGhlIG9iamVjdCB0byBkZWNvcmF0ZS5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHRyYWl0c1xyXG4gICAgICogIFRoZSBvYmplY3QgcHJvdmlkaW5nIHRoZSBwcm9wZXJpdGVzIHRoYXQgdGhlIGZpcnN0IG9iamVjdFxyXG4gICAgICogIHdpbGwgYmUgZGVjb3JhdGVkIHdpdGguIE5vdGUgdGhhdCBvbmx5IHByb3BlcnRpZXMgZGVmaW5lZCBvbiBcclxuICAgICAqICB0aGlzIG9iamVjdCB3aWxsIGJlIGNvcGllZC0gaS5lLiBpbmhlcml0ZWQgcHJvcGVydGllcyB3aWxsXHJcbiAgICAgKiAgYmUgaWdub3JlZC5cclxuICAgICAqIFxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxyXG4gICAgICogIFRIZSBkZWNvcmF0ZWQgb2JqZWN0IChmaXJzdCBhcmd1bWVudClcclxuICAgICAqL1xyXG4gICAgLCAgIGRlY29yYXRlOiBmdW5jdGlvbiAob2JqZWN0LCB0cmFpdHMpXHJcbntcclxuICAgIGZvciAodmFyIGFjY2Vzc29yIGluIHRyYWl0cylcclxuICAgIHtcclxuICAgICAgICBvYmplY3RbYWNjZXNzb3JdPSB0cmFpdHNbYWNjZXNzb3JdO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBvYmplY3Q7XHJcbn1cclxufTtcclxuXHJcblxyXG4vKipcclxuICogQG1lbWJlciBwdXJlbXZjXHJcbiAqXHJcbiAqIERlY2xhcmUgYSBuYW1lc3BhY2UgYW5kIG9wdGlvbmFsbHkgbWFrZSBhbiBPYmplY3QgdGhlIHJlZmVyZW50XHJcbiAqIG9mIHRoYXQgbmFtZXNwYWNlLlxyXG4gKlxyXG4gKiAgICAgY29uc29sZS5hc3NlcnQobnVsbCA9PSB3aW5kb3cudGxkLCAnTm8gdGxkIG5hbWVzcGFjZScpO1xyXG4gKiAgICAgLy8gZGVjbGFyZSB0aGUgdGxkIG5hbWVzcGFjZVxyXG4gKiAgICAgcHVyZW12Yy5kZWNsYXJlKCd0bGQnKTtcclxuICogICAgIGNvbnNvbGUuYXNzZXJ0KCdvYmplY3QnID09PSB0eXBlb2YgdGxkLCAnVGhlIHRsZCBuYW1lc3BhY2Ugd2FzIGRlY2xhcmVkJyk7XHJcbiAqXHJcbiAqICAgICAvLyB0aGUgbWV0aG9kIHJldHVybnMgYSByZWZlcmVuY2UgdG8gbGFzdCBuYW1lc3BhY2Ugbm9kZSBpbiBhIGNyZWF0ZWQgaGllcmFyY2h5XHJcbiAqICAgICB2YXIgcmVmZXJlbmNlPSBwdXJlbXZjLmRlY2xhcmUoJ3RsZC5kb21haW4uYXBwJyk7XHJcbiAqICAgICBjb25zb2xlLmFzc2VydChyZWZlcmVuY2UgPT09IHRsZC5kb21haW4uYXBwKVxyXG4gKlxyXG4gKiAgICAgLy8gb2YgY291cnNlIHlvdSBjYW4gYWxzbyBkZWNsYXJlIHlvdXIgb3duIG9iamVjdHMgYXMgd2VsbFxyXG4gKiAgICAgdmFyIEFwcENvbnN0YW50cz1cclxuICogICAgICAgICB7XHJcbiAqIFx0ICAgICAgICAgICBBUFBfTkFNRTogJ3RsZC5kb21haW4uYXBwLkFwcCdcclxuICogICAgICAgICB9O1xyXG4gKlxyXG4gKiAgICAgcHVyZW12Yy5kZWNsYXJlKCd0bGQuZG9tYWluLmFwcC5BcHBDb25zdGFudHMnLCBBcHBDb25zdGFudHMpO1xyXG4gKiAgICAgY29uc29sZS5hc3NlcnQoQXBwQ29uc3RhbnRzID09PSB0bGQuZG9tYWluLmFwcC5BcHBDb25zdGFudHNcclxuICogXHQgICAsICdBcHBDb25zdGFudHMgd2FzIGV4cG9ydGVkIHRvIHRoZSBuYW1lc3BhY2UnKTtcclxuICpcclxuICogTm90ZSB0aGF0IHlvdSBjYW4gYWxzbyAjZGVjbGFyZSB3aXRoaW4gYSBjbG9zdXJlLiBUaGF0IHdheSB5b3VcclxuICogY2FuIHNlbGVjdGl2ZWx5IGV4cG9ydCBPYmplY3RzIHRvIHlvdXIgb3duIG5hbWVzcGFjZXMgd2l0aG91dFxyXG4gKiBsZWFraW5nIHZhcmlhYmxlcyBpbnRvIHRoZSBnbG9iYWwgc2NvcGUuXHJcbiAqXHJcbiAqICAgICAoZnVuY3Rpb24oKXtcclxuICogICAgICAgICAvLyB0aGlzIHZhciBpcyBub3QgYWNjZXNzaWJsZSBvdXRzaWRlIG9mIHRoaXNcclxuICogICAgICAgICAvLyBjbG9zdXJlcyBjYWxsIHNjb3BlXHJcbiAqICAgICAgICAgdmFyIGhpZGRlblZhbHVlPSAnZGVmYXVsdFZhbHVlJztcclxuICogXHJcbiAqICAgICAgICAgLy8gZXhwb3J0IGFuIG9iamVjdCB0aGF0IHJlZmVyZW5jZXMgdGhlIGhpZGRlblxyXG4gKiAgICAgICAgIC8vIHZhcmlhYmxlIGFuZCB3aGljaCBjYW4gbXV0YXRlIGl0XHJcbiAqICAgICAgICAgcHVyZW12Yy5kZWNsYXJlXHJcbiAqICAgICAgICAgKFxyXG4gKiAgICAgICAgICAgICAgJ3RsZC5kb21haW4uYXBwLmJhY2tkb29yJ1xyXG4gKiBcclxuICogICAgICAgICAsICAgIHtcclxuICogICAgICAgICAgICAgICAgICBzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKVxyXG4gKiAgICAgICAgICAgICAgICAgIHtcclxuICogICAgICAgICAgICAgICAgICAgICAgLy8gYXNzaWducyB0byB0aGUgaGlkZGVuIHZhclxyXG4gKiAgICAgICAgICAgICAgICAgICAgICBoaWRkZW5WYWx1ZT0gdmFsdWU7XHJcbiAqICAgICAgICAgICAgICAgICAgfVxyXG4gKiBcclxuICogICAgICAgICAsICAgICAgICBnZXRWYWx1ZTogZnVuY3Rpb24gKClcclxuICogICAgICAgICAgICAgICAgICB7XHJcbiAqICAgICAgICAgICAgICAgICAgICAgIC8vIHJlYWRzIGZyb20gdGhlIGhpZGRlbiB2YXJcclxuICogICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGhpZGRlblZhbHVlO1xyXG4gKiAgICAgICAgICAgICAgICAgIH1cclxuICogICAgICAgICAgICAgIH1cclxuICogICAgICAgICApO1xyXG4gKiAgICAgfSkoKTtcclxuICogICAgIC8vIGluZGlyZWN0bHkgcmV0cmlldmUgdGhlIGhpZGRlbiB2YXJpYWJsZXMgdmFsdWVcclxuICogICAgIGNvbnNvbGUuYXNzZXJ0KCdkZWZhdWx0VmFsdWUnID09PSB0bGQuZG9tYWluLmFwcC5iYWNrZG9vci5nZXRWYWx1ZSgpKTtcclxuICogICAgIC8vIGluZGlyZWN0bHkgc2V0IHRoZSBoaWRkZW4gdmFyaWFibGVzIHZhbHVlXHJcbiAqICAgICB0bGQuZG9tYWluLmFwcC5iYWNrZG9vci5zZXRWYWx1ZSgnbmV3VmFsdWUnKTtcclxuICogICAgIC8vIHRoZSBoaWRkZW4gdmFyIHdhcyBtdXRhdGVkXHJcbiAqICAgICBjb25zb2xlLmFzc2VydCgnbmV3VmFsdWUnID09PSB0bGQuZG9tYWluLmFwcC5iYWNrZG9vci5nZXRWYWx1ZSgpKTtcclxuICpcclxuICogT24gb2NjYXNpb24sIHByaW1hcmlseSBkdXJpbmcgdGVzdGluZywgeW91IG1heSB3YW50IHRvIHVzZSBkZWNsYXJlLFxyXG4gKiBidXQgbm90IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgYmUgdGhlIG5hbWVzcGFjZSByb290LiBJbiB0aGVzZSBjYXNlcyB5b3VcclxuICogY2FuIHN1cHBseSB0aGUgb3B0aW9uYWwgdGhpcmQgc2NvcGUgYXJndW1lbnQuXHJcbiAqXHJcbiAqICAgICB2YXIgbG9jYWxTY29wZT0ge31cclxuICogICAgICwgICBvYmplY3Q9IHt9XHJcbiAqXHJcbiAqICAgICBwdXJlbXZjLmRlY2xhcmUoJ21vY2sub2JqZWN0Jywgb2JqZWN0LCBsb2NhbFNjb3BlKTtcclxuICpcclxuICogICAgIGNvbnNvbGUuYXNzZXJ0KG51bGwgPT0gd2luZG93Lm1vY2ssICdtb2NrIG5hbWVzcGFjZSBpcyBub3QgaW4gZ2xvYmFsIHNjb3BlJyk7XHJcbiAqICAgICBjb25zb2xlLmFzc2VydChvYmplY3QgPT09IGxvY2FsU2NvcGUubW9jay5vYmplY3QsICdtb2NrLm9iamVjdCBpcyBhdmFpbGFibGUgaW4gbG9jYWxTY29wZScpO1xyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nXHJcbiAqICBBIHF1YWxpZmllZCBvYmplY3QgbmFtZSwgZS5nLiAnY29tLmV4YW1wbGUuQ2xhc3MnXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XVxyXG4gKiAgQW4gb2JqZWN0IHRvIG1ha2UgdGhlIHJlZmVyZW50IG9mIHRoZSBuYW1lc3BhY2UuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBbc2NvcGVdXHJcbiAqICBUaGUgbmFtZXNwYWNlJ3Mgcm9vdCBub2RlLiBJZiBub3Qgc3VwcGxpZWQsIHRoZSBnbG9iYWxcclxuICogIHNjb3BlIHdpbGwgYmUgbmFtZXNwYWNlcyByb290IG5vZGUuXHJcbiAqXHJcbiAqIEByZXR1cm4ge09iamVjdH1cclxuICpcclxuICogIEEgcmVmZXJlbmNlIHRvIHRoZSBsYXN0IG5vZGUgb2YgdGhlIE9iamVjdCBoaWVyYXJjaHkgY3JlYXRlZC5cclxuICovXHJcbmZ1bmN0aW9uIGRlY2xhcmUgKHF1YWxpZmllZE5hbWUsIG9iamVjdCwgc2NvcGUpXHJcbntcclxuICAgIHZhciBub2Rlcz0gcXVhbGlmaWVkTmFtZS5zcGxpdCgnLicpXHJcbiAgICAgICAgLCAgIG5vZGU9IHNjb3BlIHx8IE9vcEhlbHAuZ2xvYmFsXHJcbiAgICAgICAgLCAgIGxhc3ROb2RlXHJcbiAgICAgICAgLCAgIG5ld05vZGVcclxuICAgICAgICAsICAgbm9kZU5hbWU7XHJcblxyXG4gICAgZm9yICh2YXIgaT0gMCwgbj0gbm9kZXMubGVuZ3RoOyBpIDwgbjsgaSsrKVxyXG4gICAge1xyXG4gICAgICAgIGxhc3ROb2RlPSBub2RlO1xyXG4gICAgICAgIG5vZGVOYW1lPSBub2Rlc1tpXTtcclxuXHJcbiAgICAgICAgbm9kZT0gKG51bGwgPT0gbm9kZVtub2RlTmFtZV0gPyBub2RlW25vZGVOYW1lXSA9IHt9IDogbm9kZVtub2RlTmFtZV0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChudWxsID09IG9iamVjdClcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuXHJcbiAgICByZXR1cm4gbGFzdE5vZGVbbm9kZU5hbWVdPSBvYmplY3Q7XHJcbn07XHJcblxyXG5cclxuXHJcblxyXG4vKipcclxuICogQG1lbWJlciBwdXJlbXZjXHJcbiAqXHJcbiAqIERlZmluZSBhIG5ldyBjbGFzc2xldC4gQ3VycmVudCBlZGl0aW9ucyBvZiBKYXZhU2NyaXB0IGRvIG5vdCBoYXZlIGNsYXNzZXMsXHJcbiAqIGJ1dCB0aGV5IGNhbiBiZSBlbXVsYXRlZCwgYW5kIHRoaXMgbWV0aG9kIGRvZXMgdGhpcyBmb3IgeW91LCBzYXZpbmcgeW91XHJcbiAqIGZyb20gaGF2aW5nIHRvIHdvcmsgd2l0aCBGdW5jdGlvbiBwcm90b3R5cGUgZGlyZWN0bHkuIFRoZSBtZXRob2QgZG9lc1xyXG4gKiBub3QgZXh0ZW5kIGFueSBOYXRpdmUgb2JqZWN0cyBhbmQgaXMgZW50aXJlbHkgb3B0IGluLiBJdHMgcGFydGljdWxhcmx5XHJcbiAqIHVzZWZ1bGwgaWYgeW91IHdhbnQgdG8gbWFrZSB5b3VyIFB1cmVNdmMgYXBwbGljYXRpb25zIG1vcmUgcG9ydGFibGUsIGJ5XHJcbiAqIGRlY291cGxpbmcgdGhlbSBmcm9tIGEgc3BlY2lmaWMgT09QIGFic3RyYWN0aW9uIGxpYnJhcnkuXHJcbiAqXHJcbiAqXHJcbiAqICAgICBwdXJlbXZjLmRlZmluZVxyXG4gKiAgICAgKFxyXG4gKiAgICAgICAgIC8vIHRoZSBmaXJzdCBvYmplY3Qgc3VwcGxpZWQgaXMgYSBjbGFzcyBkZXNjcmlwdG9yLiBOb25lIG9mIHRoZXNlXHJcbiAqICAgICAgICAgLy8gcHJvcGVydGllcyBhcmUgYWRkZWQgdG8geW91ciBjbGFzcywgdGhlIGV4Y2VwdGlvbiBiZWluZyB0aGVcclxuICogICAgICAgICAvLyBjb25zdHJ1Y3RvciBwcm9wZXJ0eSwgd2hpY2ggaWYgc3VwcGxpZWQsIHdpbGwgYmUgeW91ciBjbGFzc2VzXHJcbiAqICAgICAgICAgLy8gY29uc3RydWN0b3IuXHJcbiAqICAgICAgICAge1xyXG4gKiAgICAgICAgICAgICAvLyB5b3VyIGNsYXNzZXMgbmFtZXNwYWNlLSBpZiBzdXBwbGllZCwgaXQgd2lsbCBiZSBcclxuICogICAgICAgICAgICAgLy8gY3JlYXRlZCBmb3IgeW91XHJcbiAqICAgICAgICAgICAgIG5hbWU6ICdjb20uZXhhbXBsZS5Vc2VyTWVkaWF0b3InXHJcbiAqIFxyXG4gKiAgICAgICAgICAgICAvLyB5b3VyIGNsYXNzZXMgcGFyZW50IGNsYXNzLiBJZiBzdXBwbGllZCwgaW5oZXJpdGFuY2UgXHJcbiAqICAgICAgICAgICAgIC8vIHdpbGwgYmUgdGFrZW4gY2FyZSBvZiBmb3IgeW91XHJcbiAqICAgICAgICAgLCAgIHBhcmVudDogcHVyZW12Yy5NZWRpYXRvclxyXG4gKiBcclxuICogICAgICAgICAgICAgLy8geW91ciBjbGFzc2VzIGNvbnN0cnVjdG9yLiBJZiBub3Qgc3VwcGxpZWQsIG9uZSB3aWxsIGJlIFxyXG4gKiAgICAgICAgICAgICAvLyBjcmVhdGVkIGZvciB5b3VcclxuICogICAgICAgICAsICAgY29uc3RydWN0b3I6IGZ1bmN0aW9uIFVzZXJNZWRpYXRvciAoY29tcG9uZW50KVxyXG4gKiAgICAgICAgICAgICB7XHJcbiAqICAgICAgICAgICAgICAgICAgcHVyZW12Yy5NZWRpYXRvci5jYWxsKHRoaXMsIHRoaXMuY29uc3RydWN0b3IuTkFNRSwgY29tcG9uZW50KTsgIFxyXG4gKiAgICAgICAgICAgICB9XHJcbiAqICAgICAgICAgfVxyXG4gKlxyXG4gKiAgICAgICAgIC8vIHRoZSBzZWNvbmQgb2JqZWN0IHN1cHBsaWVkIGRlZmluZXMgeW91ciBjbGFzcyB0cmFpdHMsIHRoYXQgaXNcclxuICogICAgICAgICAvLyB0aGUgcHJvcGVydGllcyB0aGF0IHdpbGwgYmUgZGVmaW5lZCBvbiB5b3VyIGNsYXNzZXMgcHJvdG90eXBlXHJcbiAqICAgICAgICAgLy8gYW5kIHRoZXJlYnkgb24gYWxsIGluc3RhbmNlcyBvZiB0aGlzIGNsYXNzXHJcbiAqICAgICAsICAge1xyXG4gKiAgICAgICAgICAgICBidXNpbmVzc01ldGhvZDogZnVuY3Rpb24gKClcclxuICogICAgICAgICAgICAge1xyXG4gKiAgICAgICAgICAgICAgICAgLy8gaW1wbCBcclxuICogICAgICAgICAgICAgfVxyXG4gKiAgICAgICAgIH1cclxuICpcclxuICogICAgICAgICAvLyB0aGUgdGhpcmQgb2JqZWN0IHN1cHBsaWVkIGRlZmluZXMgeW91ciBjbGFzc2VzICdzdGF0aWMnIHRyYWl0c1xyXG4gKiAgICAgICAgIC8vIHRoYXQgaXMsIHRoZSBtZXRob2RzIGFuZCBwcm9wZXJ0aWVzIHdoaWNoIHdpbGwgYmUgZGVmaW5lZCBvblxyXG4gKiAgICAgICAgIC8vIHlvdXIgY2xhc3NlcyBjb25zdHJ1Y3RvclxyXG4gKiAgICAgLCAgIHtcclxuICogICAgICAgICAgICAgTkFNRTogJ3VzZXJNZWRpYXRvcidcclxuICogICAgICAgICB9XHJcbiAqICAgICApO1xyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gW2NsYXNzaW5mb11cclxuICogIEFuIG9iamVjdCBkZXNjcmliaW5nIHRoZSBjbGFzcy4gVGhpcyBvYmplY3QgY2FuIGhhdmUgYW55IG9yIGFsbCBvZlxyXG4gKiAgdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxyXG4gKlxyXG4gKiAgLSBuYW1lOiBTdHJpbmdcclxuICogICAgICBUaGUgY2xhc3NsZXRzIG5hbWUuIFRoaXMgY2FuIGJlIGFueSBhcmJpdHJhcnkgcXVhbGlmaWVkIG9iamVjdFxyXG4gKiAgICAgIG5hbWUuICdjb20uZXhhbXBsZS5DbGFzc2xldCcgb3Igc2ltcGx5ICdNeUNsYXNzbGV0JyBmb3IgZXhhbXBsZVxyXG4gKiAgICAgIFRoZSBtZXRob2Qgd2lsbCBhdXRvbWF0aWNhbGx5IGNyZWF0ZSBhbiBvYmplY3QgaGllcmFyY2h5IHJlZmVyaW5nXHJcbiAqICAgICAgdG8geW91ciBjbGFzcyBmb3IgeW91LiBOb3RlIHRoYXQgeW91IHdpbGwgbmVlZCB0byBjYXB0dXJlIHRoZVxyXG4gKiAgICAgIG1ldGhvZHMgcmV0dXJuIHZhbHVlIHRvIHJldHJpZXZlIGEgcmVmZXJlbmNlIHRvIHlvdXIgY2xhc3MgaWYgdGhlXHJcbiAqICAgICAgY2xhc3MgbmFtZSBwcm9wZXJ0eSBpcyBub3QgZGVmaW5lZC5cclxuICogIC0gcGFyZW50OiBGdW5jdGlvblxyXG4gKiAgICAgIFRoZSBjbGFzc2xldHMgJ3N1cGVyY2xhc3MnLiBZb3VyIGNsYXNzIHdpbGwgYmUgZXh0ZW5kZWQgZnJvbSB0aGlzXHJcbiAqICAgICAgaWYgc3VwcGxpZWQuXHJcbiAqXHJcbiAqICAtIGNvbnN0cnVjdG9yOiBGdW5jdGlvblxyXG4gKiAgICAgIFRoZSBjbGFzc2xldHMgY29uc3RydWN0b3IuIE5vdGUgdGhpcyBpcyAqbm90KiBhIHBvc3QgY29uc3RydWN0XHJcbiAqICAgICAgaW5pdGlhbGl6ZSBtZXRob2QsIGJ1dCB5b3VyIGNsYXNzZXMgY29uc3RydWN0b3IgRnVuY3Rpb24uXHJcbiAqICAgICAgSWYgdGhpcyBhdHRyaWJ1dGUgaXMgbm90IGRlZmluZWQsIGEgY29uc3RydWN0b3Igd2lsbCBiZSBjcmVhdGVkIGZvclxyXG4gKiAgICAgIHlvdSBhdXRvbWF0aWNhbGx5LiBJZiB5b3UgaGF2ZSBzdXBwbGllZCBhIHBhcmVudCBjbGFzc1xyXG4gKiAgICAgIHZhbHVlIGFuZCBub3QgZGVmaW5lZCB0aGUgY2xhc3NlcyBjb25zdHJ1Y3RvciwgdGhlIGF1dG9tYXRpY2FsbHlcclxuICogICAgICBjcmVhdGVkIGNvbnN0cnVjdG9yIHdpbGwgaW52b2tlIHRoZSBzdXBlciBjbGFzcyBjb25zdHJ1Y3RvclxyXG4gKiAgICAgIGF1dG9tYXRpY2FsbHkuIElmIHlvdSBoYXZlIHN1cHBsaWVkIHlvdXIgb3duIGNvbnN0cnVjdG9yIGFuZCB5b3VcclxuICogICAgICB3aXNoIHRvIGludm9rZSBpdCdzIHN1cGVyIGNvbnN0cnVjdG9yLCB5b3UgbXVzdCBkbyB0aGlzIG1hbnVhbGx5LCBhc1xyXG4gKiAgICAgIHRoZXJlIGlzIG5vIHJlZmVyZW5jZSB0byB0aGUgY2xhc3NlcyBwYXJlbnQgYWRkZWQgdG8gdGhlIGNvbnN0cnVjdG9yXHJcbiAqICAgICAgcHJvdG90eXBlLlxyXG4gKlxyXG4gKiAgLSBzY29wZTogT2JqZWN0LlxyXG4gKiAgICAgIEZvciB1c2UgaW4gYWR2YW5jZWQgc2NlbmFyaW9zLiBJZiB0aGUgbmFtZSBhdHRyaWJ1dGUgaGFzIGJlZW4gc3VwcGxpZWQsXHJcbiAqICAgICAgdGhpcyB2YWx1ZSB3aWxsIGJlIHRoZSByb290IG9mIHRoZSBvYmplY3QgaGllcmFyY2h5IGNyZWF0ZWQgZm9yIHlvdS5cclxuICogICAgICBVc2UgaXQgZG8gZGVmaW5lIHlvdXIgb3duIGNsYXNzIGhpZXJhcmNoaWVzIGluIHByaXZhdGUgc2NvcGVzLFxyXG4gKiAgICAgIGFjY3Jvc3MgaUZyYW1lcywgaW4geW91ciB1bml0IHRlc3RzLCBvciBhdm9pZCBjb2xsaXNpb24gd2l0aCB0aGlyZFxyXG4gKiAgICAgIHBhcnR5IGxpYnJhcnkgbmFtZXNwYWNlcy5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IFt0cmFpdHNdXHJcbiAqICBBbiBPYmplY3QsIHRoZSBwcm9wZXJ0aWVzIG9mIHdoaWNoIHdpbGwgYmUgYWRkZWQgdG8gdGhlXHJcbiAqICBjbGFzcyBjb25zdHJ1Y3RvcnMgcHJvdG90eXBlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gW3N0YWl0Y1RyYWl0c11cclxuICogIEFuIE9iamVjdCwgdGhlIHByb3BlcnRpZXMgb2Ygd2hpY2ggd2lsbCBiZSBhZGRlZCBkaXJlY3RseVxyXG4gKiAgdG8gdGhpcyBjbGFzcyBjb25zdHJ1Y3RvclxyXG4gKlxyXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cclxuICogIEEgcmVmZXJlbmNlIHRvIHRoZSBjbGFzc2xldHMgY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIGRlZmluZSAoY2xhc3NJbmZvLCB0cmFpdHMsIHN0YXRpY1RyYWl0cylcclxue1xyXG4gICAgaWYgKCFjbGFzc0luZm8pXHJcbiAgICB7XHJcbiAgICAgICAgY2xhc3NJbmZvPSB7fVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBjbGFzc05hbWU9IGNsYXNzSW5mby5uYW1lXHJcbiAgICAgICAgLCAgIGNsYXNzUGFyZW50PSBjbGFzc0luZm8ucGFyZW50XHJcbiAgICAgICAgLCAgIGRvRXh0ZW5kPSAnZnVuY3Rpb24nID09PSB0eXBlb2YgY2xhc3NQYXJlbnRcclxuICAgICAgICAsICAgY2xhc3NDb25zdHJ1Y3RvclxyXG4gICAgICAgICwgICBjbGFzc1Njb3BlPSBjbGFzc0luZm8uc2NvcGUgfHwgbnVsbFxyXG4gICAgICAgICwgICBwcm90b3R5cGVcclxuXHJcbiAgICBpZiAoJ3BhcmVudCcgaW4gY2xhc3NJbmZvICYmICFkb0V4dGVuZClcclxuICAgIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDbGFzcyBwYXJlbnQgbXVzdCBiZSBGdW5jdGlvbicpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjbGFzc0luZm8uaGFzT3duUHJvcGVydHkoJ2NvbnN0cnVjdG9yJykpXHJcbiAgICB7XHJcbiAgICAgICAgY2xhc3NDb25zdHJ1Y3Rvcj0gY2xhc3NJbmZvLmNvbnN0cnVjdG9yXHJcbiAgICAgICAgaWYgKCdmdW5jdGlvbicgIT09IHR5cGVvZiBjbGFzc0NvbnN0cnVjdG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2xhc3MgY29uc3RydWN0b3IgbXVzdCBiZSBGdW5jdGlvbicpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSAvLyB0aGVyZSBpcyBubyBjb25zdHJ1Y3RvciwgY3JlYXRlIG9uZVxyXG4gICAge1xyXG4gICAgICAgIGlmIChkb0V4dGVuZCkgLy8gZW5zdXJlIHRvIGNhbGwgdGhlIHN1cGVyIGNvbnN0cnVjdG9yXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjbGFzc0NvbnN0cnVjdG9yPSBmdW5jdGlvbiAoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjbGFzc1BhcmVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgLy8ganVzdCBjcmVhdGUgYSBGdW5jdGlvblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2xhc3NDb25zdHJ1Y3Rvcj0gbmV3IEZ1bmN0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoZG9FeHRlbmQpXHJcbiAgICB7XHJcbiAgICAgICAgT29wSGVscC5leHRlbmQoY2xhc3NDb25zdHJ1Y3RvciwgY2xhc3NQYXJlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0cmFpdHMpXHJcbiAgICB7XHJcbiAgICAgICAgcHJvdG90eXBlPSBjbGFzc0NvbnN0cnVjdG9yLnByb3RvdHlwZVxyXG4gICAgICAgIE9vcEhlbHAuZGVjb3JhdGUocHJvdG90eXBlLCB0cmFpdHMpO1xyXG4gICAgICAgIC8vIHJlYXNzaWduIGNvbnN0cnVjdG9yIFxyXG4gICAgICAgIHByb3RvdHlwZS5jb25zdHJ1Y3Rvcj0gY2xhc3NDb25zdHJ1Y3RvcjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoc3RhdGljVHJhaXRzKVxyXG4gICAge1xyXG4gICAgICAgIE9vcEhlbHAuZGVjb3JhdGUoY2xhc3NDb25zdHJ1Y3Rvciwgc3RhdGljVHJhaXRzKVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChjbGFzc05hbWUpXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKCdzdHJpbmcnICE9PSB0eXBlb2YgY2xhc3NOYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2xhc3MgbmFtZSBtdXN0IGJlIHByaW1pdGl2ZSBzdHJpbmcnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRlY2xhcmUgKGNsYXNzTmFtZSwgY2xhc3NDb25zdHJ1Y3RvciwgY2xhc3NTY29wZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNsYXNzQ29uc3RydWN0b3I7XHJcbn07XHJcblxyXG5cclxuXHJcbi8qIGltcGxlbWVudGF0aW9uIGVuZCAqL1xyXG5cclxuLy8gZGVmaW5lIHRoZSBwdXJlbXZjIGdsb2JhbCBuYW1lc3BhY2UgYW5kIGV4cG9ydCB0aGUgYWN0b3JzXHJcbnZhciBwdXJlbXZjID1cclxue1xyXG4gICAgICAgIFZpZXc6IFZpZXdcclxuICAgICxcdE1vZGVsOiBNb2RlbFxyXG4gICAgLFx0Q29udHJvbGxlcjogQ29udHJvbGxlclxyXG4gICAgLFx0U2ltcGxlQ29tbWFuZDogU2ltcGxlQ29tbWFuZFxyXG4gICAgLFx0TWFjcm9Db21tYW5kOiBNYWNyb0NvbW1hbmRcclxuICAgICxcdEZhY2FkZTogRmFjYWRlXHJcbiAgICAsXHRNZWRpYXRvcjogTWVkaWF0b3JcclxuICAgICxcdE9ic2VydmVyOiBPYnNlcnZlclxyXG4gICAgLFx0Tm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb25cclxuICAgICxcdE5vdGlmaWVyOiBOb3RpZmllclxyXG4gICAgLFx0UHJveHk6IFByb3h5XHJcbiAgICAsXHRkZWZpbmU6IGRlZmluZVxyXG4gICAgLFx0ZGVjbGFyZTogZGVjbGFyZVxyXG59O1xyXG5cclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHB1cmVtdmM7IiwiLy8gICAgIFVuZGVyc2NvcmUuanMgMS43LjBcbi8vICAgICBodHRwOi8vdW5kZXJzY29yZWpzLm9yZ1xuLy8gICAgIChjKSAyMDA5LTIwMTQgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbi8vICAgICBVbmRlcnNjb3JlIG1heSBiZSBmcmVlbHkgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuXG4oZnVuY3Rpb24oKSB7XG5cbiAgLy8gQmFzZWxpbmUgc2V0dXBcbiAgLy8gLS0tLS0tLS0tLS0tLS1cblxuICAvLyBFc3RhYmxpc2ggdGhlIHJvb3Qgb2JqZWN0LCBgd2luZG93YCBpbiB0aGUgYnJvd3Nlciwgb3IgYGV4cG9ydHNgIG9uIHRoZSBzZXJ2ZXIuXG4gIHZhciByb290ID0gdGhpcztcblxuICAvLyBTYXZlIHRoZSBwcmV2aW91cyB2YWx1ZSBvZiB0aGUgYF9gIHZhcmlhYmxlLlxuICB2YXIgcHJldmlvdXNVbmRlcnNjb3JlID0gcm9vdC5fO1xuXG4gIC8vIFNhdmUgYnl0ZXMgaW4gdGhlIG1pbmlmaWVkIChidXQgbm90IGd6aXBwZWQpIHZlcnNpb246XG4gIHZhciBBcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlLCBPYmpQcm90byA9IE9iamVjdC5wcm90b3R5cGUsIEZ1bmNQcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcblxuICAvLyBDcmVhdGUgcXVpY2sgcmVmZXJlbmNlIHZhcmlhYmxlcyBmb3Igc3BlZWQgYWNjZXNzIHRvIGNvcmUgcHJvdG90eXBlcy5cbiAgdmFyXG4gICAgcHVzaCAgICAgICAgICAgICA9IEFycmF5UHJvdG8ucHVzaCxcbiAgICBzbGljZSAgICAgICAgICAgID0gQXJyYXlQcm90by5zbGljZSxcbiAgICBjb25jYXQgICAgICAgICAgID0gQXJyYXlQcm90by5jb25jYXQsXG4gICAgdG9TdHJpbmcgICAgICAgICA9IE9ialByb3RvLnRvU3RyaW5nLFxuICAgIGhhc093blByb3BlcnR5ICAgPSBPYmpQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuICAvLyBBbGwgKipFQ01BU2NyaXB0IDUqKiBuYXRpdmUgZnVuY3Rpb24gaW1wbGVtZW50YXRpb25zIHRoYXQgd2UgaG9wZSB0byB1c2VcbiAgLy8gYXJlIGRlY2xhcmVkIGhlcmUuXG4gIHZhclxuICAgIG5hdGl2ZUlzQXJyYXkgICAgICA9IEFycmF5LmlzQXJyYXksXG4gICAgbmF0aXZlS2V5cyAgICAgICAgID0gT2JqZWN0LmtleXMsXG4gICAgbmF0aXZlQmluZCAgICAgICAgID0gRnVuY1Byb3RvLmJpbmQ7XG5cbiAgLy8gQ3JlYXRlIGEgc2FmZSByZWZlcmVuY2UgdG8gdGhlIFVuZGVyc2NvcmUgb2JqZWN0IGZvciB1c2UgYmVsb3cuXG4gIHZhciBfID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKG9iaiBpbnN0YW5jZW9mIF8pIHJldHVybiBvYmo7XG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIF8pKSByZXR1cm4gbmV3IF8ob2JqKTtcbiAgICB0aGlzLl93cmFwcGVkID0gb2JqO1xuICB9O1xuXG4gIC8vIEV4cG9ydCB0aGUgVW5kZXJzY29yZSBvYmplY3QgZm9yICoqTm9kZS5qcyoqLCB3aXRoXG4gIC8vIGJhY2t3YXJkcy1jb21wYXRpYmlsaXR5IGZvciB0aGUgb2xkIGByZXF1aXJlKClgIEFQSS4gSWYgd2UncmUgaW5cbiAgLy8gdGhlIGJyb3dzZXIsIGFkZCBgX2AgYXMgYSBnbG9iYWwgb2JqZWN0LlxuICBpZiAodHlwZW9mIGV4cG9ydHMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgICBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBfO1xuICAgIH1cbiAgICBleHBvcnRzLl8gPSBfO1xuICB9IGVsc2Uge1xuICAgIHJvb3QuXyA9IF87XG4gIH1cblxuICAvLyBDdXJyZW50IHZlcnNpb24uXG4gIF8uVkVSU0lPTiA9ICcxLjcuMCc7XG5cbiAgLy8gSW50ZXJuYWwgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGFuIGVmZmljaWVudCAoZm9yIGN1cnJlbnQgZW5naW5lcykgdmVyc2lvblxuICAvLyBvZiB0aGUgcGFzc2VkLWluIGNhbGxiYWNrLCB0byBiZSByZXBlYXRlZGx5IGFwcGxpZWQgaW4gb3RoZXIgVW5kZXJzY29yZVxuICAvLyBmdW5jdGlvbnMuXG4gIHZhciBjcmVhdGVDYWxsYmFjayA9IGZ1bmN0aW9uKGZ1bmMsIGNvbnRleHQsIGFyZ0NvdW50KSB7XG4gICAgaWYgKGNvbnRleHQgPT09IHZvaWQgMCkgcmV0dXJuIGZ1bmM7XG4gICAgc3dpdGNoIChhcmdDb3VudCA9PSBudWxsID8gMyA6IGFyZ0NvdW50KSB7XG4gICAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICByZXR1cm4gZnVuYy5jYWxsKGNvbnRleHQsIHZhbHVlKTtcbiAgICAgIH07XG4gICAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbih2YWx1ZSwgb3RoZXIpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmMuY2FsbChjb250ZXh0LCB2YWx1ZSwgb3RoZXIpO1xuICAgICAgfTtcbiAgICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbikge1xuICAgICAgICByZXR1cm4gZnVuYy5jYWxsKGNvbnRleHQsIHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbik7XG4gICAgICB9O1xuICAgICAgY2FzZSA0OiByZXR1cm4gZnVuY3Rpb24oYWNjdW11bGF0b3IsIHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbikge1xuICAgICAgICByZXR1cm4gZnVuYy5jYWxsKGNvbnRleHQsIGFjY3VtdWxhdG9yLCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pO1xuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9O1xuXG4gIC8vIEEgbW9zdGx5LWludGVybmFsIGZ1bmN0aW9uIHRvIGdlbmVyYXRlIGNhbGxiYWNrcyB0aGF0IGNhbiBiZSBhcHBsaWVkXG4gIC8vIHRvIGVhY2ggZWxlbWVudCBpbiBhIGNvbGxlY3Rpb24sIHJldHVybmluZyB0aGUgZGVzaXJlZCByZXN1bHQg4oCUIGVpdGhlclxuICAvLyBpZGVudGl0eSwgYW4gYXJiaXRyYXJ5IGNhbGxiYWNrLCBhIHByb3BlcnR5IG1hdGNoZXIsIG9yIGEgcHJvcGVydHkgYWNjZXNzb3IuXG4gIF8uaXRlcmF0ZWUgPSBmdW5jdGlvbih2YWx1ZSwgY29udGV4dCwgYXJnQ291bnQpIHtcbiAgICBpZiAodmFsdWUgPT0gbnVsbCkgcmV0dXJuIF8uaWRlbnRpdHk7XG4gICAgaWYgKF8uaXNGdW5jdGlvbih2YWx1ZSkpIHJldHVybiBjcmVhdGVDYWxsYmFjayh2YWx1ZSwgY29udGV4dCwgYXJnQ291bnQpO1xuICAgIGlmIChfLmlzT2JqZWN0KHZhbHVlKSkgcmV0dXJuIF8ubWF0Y2hlcyh2YWx1ZSk7XG4gICAgcmV0dXJuIF8ucHJvcGVydHkodmFsdWUpO1xuICB9O1xuXG4gIC8vIENvbGxlY3Rpb24gRnVuY3Rpb25zXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgLy8gVGhlIGNvcm5lcnN0b25lLCBhbiBgZWFjaGAgaW1wbGVtZW50YXRpb24sIGFrYSBgZm9yRWFjaGAuXG4gIC8vIEhhbmRsZXMgcmF3IG9iamVjdHMgaW4gYWRkaXRpb24gdG8gYXJyYXktbGlrZXMuIFRyZWF0cyBhbGxcbiAgLy8gc3BhcnNlIGFycmF5LWxpa2VzIGFzIGlmIHRoZXkgd2VyZSBkZW5zZS5cbiAgXy5lYWNoID0gXy5mb3JFYWNoID0gZnVuY3Rpb24ob2JqLCBpdGVyYXRlZSwgY29udGV4dCkge1xuICAgIGlmIChvYmogPT0gbnVsbCkgcmV0dXJuIG9iajtcbiAgICBpdGVyYXRlZSA9IGNyZWF0ZUNhbGxiYWNrKGl0ZXJhdGVlLCBjb250ZXh0KTtcbiAgICB2YXIgaSwgbGVuZ3RoID0gb2JqLmxlbmd0aDtcbiAgICBpZiAobGVuZ3RoID09PSArbGVuZ3RoKSB7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaXRlcmF0ZWUob2JqW2ldLCBpLCBvYmopO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIga2V5cyA9IF8ua2V5cyhvYmopO1xuICAgICAgZm9yIChpID0gMCwgbGVuZ3RoID0ga2V5cy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBpdGVyYXRlZShvYmpba2V5c1tpXV0sIGtleXNbaV0sIG9iaik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG4gIH07XG5cbiAgLy8gUmV0dXJuIHRoZSByZXN1bHRzIG9mIGFwcGx5aW5nIHRoZSBpdGVyYXRlZSB0byBlYWNoIGVsZW1lbnQuXG4gIF8ubWFwID0gXy5jb2xsZWN0ID0gZnVuY3Rpb24ob2JqLCBpdGVyYXRlZSwgY29udGV4dCkge1xuICAgIGlmIChvYmogPT0gbnVsbCkgcmV0dXJuIFtdO1xuICAgIGl0ZXJhdGVlID0gXy5pdGVyYXRlZShpdGVyYXRlZSwgY29udGV4dCk7XG4gICAgdmFyIGtleXMgPSBvYmoubGVuZ3RoICE9PSArb2JqLmxlbmd0aCAmJiBfLmtleXMob2JqKSxcbiAgICAgICAgbGVuZ3RoID0gKGtleXMgfHwgb2JqKS5sZW5ndGgsXG4gICAgICAgIHJlc3VsdHMgPSBBcnJheShsZW5ndGgpLFxuICAgICAgICBjdXJyZW50S2V5O1xuICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIGN1cnJlbnRLZXkgPSBrZXlzID8ga2V5c1tpbmRleF0gOiBpbmRleDtcbiAgICAgIHJlc3VsdHNbaW5kZXhdID0gaXRlcmF0ZWUob2JqW2N1cnJlbnRLZXldLCBjdXJyZW50S2V5LCBvYmopO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfTtcblxuICB2YXIgcmVkdWNlRXJyb3IgPSAnUmVkdWNlIG9mIGVtcHR5IGFycmF5IHdpdGggbm8gaW5pdGlhbCB2YWx1ZSc7XG5cbiAgLy8gKipSZWR1Y2UqKiBidWlsZHMgdXAgYSBzaW5nbGUgcmVzdWx0IGZyb20gYSBsaXN0IG9mIHZhbHVlcywgYWthIGBpbmplY3RgLFxuICAvLyBvciBgZm9sZGxgLlxuICBfLnJlZHVjZSA9IF8uZm9sZGwgPSBfLmluamVjdCA9IGZ1bmN0aW9uKG9iaiwgaXRlcmF0ZWUsIG1lbW8sIGNvbnRleHQpIHtcbiAgICBpZiAob2JqID09IG51bGwpIG9iaiA9IFtdO1xuICAgIGl0ZXJhdGVlID0gY3JlYXRlQ2FsbGJhY2soaXRlcmF0ZWUsIGNvbnRleHQsIDQpO1xuICAgIHZhciBrZXlzID0gb2JqLmxlbmd0aCAhPT0gK29iai5sZW5ndGggJiYgXy5rZXlzKG9iaiksXG4gICAgICAgIGxlbmd0aCA9IChrZXlzIHx8IG9iaikubGVuZ3RoLFxuICAgICAgICBpbmRleCA9IDAsIGN1cnJlbnRLZXk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAzKSB7XG4gICAgICBpZiAoIWxlbmd0aCkgdGhyb3cgbmV3IFR5cGVFcnJvcihyZWR1Y2VFcnJvcik7XG4gICAgICBtZW1vID0gb2JqW2tleXMgPyBrZXlzW2luZGV4KytdIDogaW5kZXgrK107XG4gICAgfVxuICAgIGZvciAoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgY3VycmVudEtleSA9IGtleXMgPyBrZXlzW2luZGV4XSA6IGluZGV4O1xuICAgICAgbWVtbyA9IGl0ZXJhdGVlKG1lbW8sIG9ialtjdXJyZW50S2V5XSwgY3VycmVudEtleSwgb2JqKTtcbiAgICB9XG4gICAgcmV0dXJuIG1lbW87XG4gIH07XG5cbiAgLy8gVGhlIHJpZ2h0LWFzc29jaWF0aXZlIHZlcnNpb24gb2YgcmVkdWNlLCBhbHNvIGtub3duIGFzIGBmb2xkcmAuXG4gIF8ucmVkdWNlUmlnaHQgPSBfLmZvbGRyID0gZnVuY3Rpb24ob2JqLCBpdGVyYXRlZSwgbWVtbywgY29udGV4dCkge1xuICAgIGlmIChvYmogPT0gbnVsbCkgb2JqID0gW107XG4gICAgaXRlcmF0ZWUgPSBjcmVhdGVDYWxsYmFjayhpdGVyYXRlZSwgY29udGV4dCwgNCk7XG4gICAgdmFyIGtleXMgPSBvYmoubGVuZ3RoICE9PSArIG9iai5sZW5ndGggJiYgXy5rZXlzKG9iaiksXG4gICAgICAgIGluZGV4ID0gKGtleXMgfHwgb2JqKS5sZW5ndGgsXG4gICAgICAgIGN1cnJlbnRLZXk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAzKSB7XG4gICAgICBpZiAoIWluZGV4KSB0aHJvdyBuZXcgVHlwZUVycm9yKHJlZHVjZUVycm9yKTtcbiAgICAgIG1lbW8gPSBvYmpba2V5cyA/IGtleXNbLS1pbmRleF0gOiAtLWluZGV4XTtcbiAgICB9XG4gICAgd2hpbGUgKGluZGV4LS0pIHtcbiAgICAgIGN1cnJlbnRLZXkgPSBrZXlzID8ga2V5c1tpbmRleF0gOiBpbmRleDtcbiAgICAgIG1lbW8gPSBpdGVyYXRlZShtZW1vLCBvYmpbY3VycmVudEtleV0sIGN1cnJlbnRLZXksIG9iaik7XG4gICAgfVxuICAgIHJldHVybiBtZW1vO1xuICB9O1xuXG4gIC8vIFJldHVybiB0aGUgZmlyc3QgdmFsdWUgd2hpY2ggcGFzc2VzIGEgdHJ1dGggdGVzdC4gQWxpYXNlZCBhcyBgZGV0ZWN0YC5cbiAgXy5maW5kID0gXy5kZXRlY3QgPSBmdW5jdGlvbihvYmosIHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgIHZhciByZXN1bHQ7XG4gICAgcHJlZGljYXRlID0gXy5pdGVyYXRlZShwcmVkaWNhdGUsIGNvbnRleHQpO1xuICAgIF8uc29tZShvYmosIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgbGlzdCkge1xuICAgICAgaWYgKHByZWRpY2F0ZSh2YWx1ZSwgaW5kZXgsIGxpc3QpKSB7XG4gICAgICAgIHJlc3VsdCA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8vIFJldHVybiBhbGwgdGhlIGVsZW1lbnRzIHRoYXQgcGFzcyBhIHRydXRoIHRlc3QuXG4gIC8vIEFsaWFzZWQgYXMgYHNlbGVjdGAuXG4gIF8uZmlsdGVyID0gXy5zZWxlY3QgPSBmdW5jdGlvbihvYmosIHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgIHZhciByZXN1bHRzID0gW107XG4gICAgaWYgKG9iaiA9PSBudWxsKSByZXR1cm4gcmVzdWx0cztcbiAgICBwcmVkaWNhdGUgPSBfLml0ZXJhdGVlKHByZWRpY2F0ZSwgY29udGV4dCk7XG4gICAgXy5lYWNoKG9iaiwgZnVuY3Rpb24odmFsdWUsIGluZGV4LCBsaXN0KSB7XG4gICAgICBpZiAocHJlZGljYXRlKHZhbHVlLCBpbmRleCwgbGlzdCkpIHJlc3VsdHMucHVzaCh2YWx1ZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH07XG5cbiAgLy8gUmV0dXJuIGFsbCB0aGUgZWxlbWVudHMgZm9yIHdoaWNoIGEgdHJ1dGggdGVzdCBmYWlscy5cbiAgXy5yZWplY3QgPSBmdW5jdGlvbihvYmosIHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgIHJldHVybiBfLmZpbHRlcihvYmosIF8ubmVnYXRlKF8uaXRlcmF0ZWUocHJlZGljYXRlKSksIGNvbnRleHQpO1xuICB9O1xuXG4gIC8vIERldGVybWluZSB3aGV0aGVyIGFsbCBvZiB0aGUgZWxlbWVudHMgbWF0Y2ggYSB0cnV0aCB0ZXN0LlxuICAvLyBBbGlhc2VkIGFzIGBhbGxgLlxuICBfLmV2ZXJ5ID0gXy5hbGwgPSBmdW5jdGlvbihvYmosIHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgIGlmIChvYmogPT0gbnVsbCkgcmV0dXJuIHRydWU7XG4gICAgcHJlZGljYXRlID0gXy5pdGVyYXRlZShwcmVkaWNhdGUsIGNvbnRleHQpO1xuICAgIHZhciBrZXlzID0gb2JqLmxlbmd0aCAhPT0gK29iai5sZW5ndGggJiYgXy5rZXlzKG9iaiksXG4gICAgICAgIGxlbmd0aCA9IChrZXlzIHx8IG9iaikubGVuZ3RoLFxuICAgICAgICBpbmRleCwgY3VycmVudEtleTtcbiAgICBmb3IgKGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIGN1cnJlbnRLZXkgPSBrZXlzID8ga2V5c1tpbmRleF0gOiBpbmRleDtcbiAgICAgIGlmICghcHJlZGljYXRlKG9ialtjdXJyZW50S2V5XSwgY3VycmVudEtleSwgb2JqKSkgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICAvLyBEZXRlcm1pbmUgaWYgYXQgbGVhc3Qgb25lIGVsZW1lbnQgaW4gdGhlIG9iamVjdCBtYXRjaGVzIGEgdHJ1dGggdGVzdC5cbiAgLy8gQWxpYXNlZCBhcyBgYW55YC5cbiAgXy5zb21lID0gXy5hbnkgPSBmdW5jdGlvbihvYmosIHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgIGlmIChvYmogPT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuICAgIHByZWRpY2F0ZSA9IF8uaXRlcmF0ZWUocHJlZGljYXRlLCBjb250ZXh0KTtcbiAgICB2YXIga2V5cyA9IG9iai5sZW5ndGggIT09ICtvYmoubGVuZ3RoICYmIF8ua2V5cyhvYmopLFxuICAgICAgICBsZW5ndGggPSAoa2V5cyB8fCBvYmopLmxlbmd0aCxcbiAgICAgICAgaW5kZXgsIGN1cnJlbnRLZXk7XG4gICAgZm9yIChpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICBjdXJyZW50S2V5ID0ga2V5cyA/IGtleXNbaW5kZXhdIDogaW5kZXg7XG4gICAgICBpZiAocHJlZGljYXRlKG9ialtjdXJyZW50S2V5XSwgY3VycmVudEtleSwgb2JqKSkgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICAvLyBEZXRlcm1pbmUgaWYgdGhlIGFycmF5IG9yIG9iamVjdCBjb250YWlucyBhIGdpdmVuIHZhbHVlICh1c2luZyBgPT09YCkuXG4gIC8vIEFsaWFzZWQgYXMgYGluY2x1ZGVgLlxuICBfLmNvbnRhaW5zID0gXy5pbmNsdWRlID0gZnVuY3Rpb24ob2JqLCB0YXJnZXQpIHtcbiAgICBpZiAob2JqID09IG51bGwpIHJldHVybiBmYWxzZTtcbiAgICBpZiAob2JqLmxlbmd0aCAhPT0gK29iai5sZW5ndGgpIG9iaiA9IF8udmFsdWVzKG9iaik7XG4gICAgcmV0dXJuIF8uaW5kZXhPZihvYmosIHRhcmdldCkgPj0gMDtcbiAgfTtcblxuICAvLyBJbnZva2UgYSBtZXRob2QgKHdpdGggYXJndW1lbnRzKSBvbiBldmVyeSBpdGVtIGluIGEgY29sbGVjdGlvbi5cbiAgXy5pbnZva2UgPSBmdW5jdGlvbihvYmosIG1ldGhvZCkge1xuICAgIHZhciBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpO1xuICAgIHZhciBpc0Z1bmMgPSBfLmlzRnVuY3Rpb24obWV0aG9kKTtcbiAgICByZXR1cm4gXy5tYXAob2JqLCBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIChpc0Z1bmMgPyBtZXRob2QgOiB2YWx1ZVttZXRob2RdKS5hcHBseSh2YWx1ZSwgYXJncyk7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gQ29udmVuaWVuY2UgdmVyc2lvbiBvZiBhIGNvbW1vbiB1c2UgY2FzZSBvZiBgbWFwYDogZmV0Y2hpbmcgYSBwcm9wZXJ0eS5cbiAgXy5wbHVjayA9IGZ1bmN0aW9uKG9iaiwga2V5KSB7XG4gICAgcmV0dXJuIF8ubWFwKG9iaiwgXy5wcm9wZXJ0eShrZXkpKTtcbiAgfTtcblxuICAvLyBDb252ZW5pZW5jZSB2ZXJzaW9uIG9mIGEgY29tbW9uIHVzZSBjYXNlIG9mIGBmaWx0ZXJgOiBzZWxlY3Rpbmcgb25seSBvYmplY3RzXG4gIC8vIGNvbnRhaW5pbmcgc3BlY2lmaWMgYGtleTp2YWx1ZWAgcGFpcnMuXG4gIF8ud2hlcmUgPSBmdW5jdGlvbihvYmosIGF0dHJzKSB7XG4gICAgcmV0dXJuIF8uZmlsdGVyKG9iaiwgXy5tYXRjaGVzKGF0dHJzKSk7XG4gIH07XG5cbiAgLy8gQ29udmVuaWVuY2UgdmVyc2lvbiBvZiBhIGNvbW1vbiB1c2UgY2FzZSBvZiBgZmluZGA6IGdldHRpbmcgdGhlIGZpcnN0IG9iamVjdFxuICAvLyBjb250YWluaW5nIHNwZWNpZmljIGBrZXk6dmFsdWVgIHBhaXJzLlxuICBfLmZpbmRXaGVyZSA9IGZ1bmN0aW9uKG9iaiwgYXR0cnMpIHtcbiAgICByZXR1cm4gXy5maW5kKG9iaiwgXy5tYXRjaGVzKGF0dHJzKSk7XG4gIH07XG5cbiAgLy8gUmV0dXJuIHRoZSBtYXhpbXVtIGVsZW1lbnQgKG9yIGVsZW1lbnQtYmFzZWQgY29tcHV0YXRpb24pLlxuICBfLm1heCA9IGZ1bmN0aW9uKG9iaiwgaXRlcmF0ZWUsIGNvbnRleHQpIHtcbiAgICB2YXIgcmVzdWx0ID0gLUluZmluaXR5LCBsYXN0Q29tcHV0ZWQgPSAtSW5maW5pdHksXG4gICAgICAgIHZhbHVlLCBjb21wdXRlZDtcbiAgICBpZiAoaXRlcmF0ZWUgPT0gbnVsbCAmJiBvYmogIT0gbnVsbCkge1xuICAgICAgb2JqID0gb2JqLmxlbmd0aCA9PT0gK29iai5sZW5ndGggPyBvYmogOiBfLnZhbHVlcyhvYmopO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IG9iai5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICB2YWx1ZSA9IG9ialtpXTtcbiAgICAgICAgaWYgKHZhbHVlID4gcmVzdWx0KSB7XG4gICAgICAgICAgcmVzdWx0ID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaXRlcmF0ZWUgPSBfLml0ZXJhdGVlKGl0ZXJhdGVlLCBjb250ZXh0KTtcbiAgICAgIF8uZWFjaChvYmosIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgbGlzdCkge1xuICAgICAgICBjb21wdXRlZCA9IGl0ZXJhdGVlKHZhbHVlLCBpbmRleCwgbGlzdCk7XG4gICAgICAgIGlmIChjb21wdXRlZCA+IGxhc3RDb21wdXRlZCB8fCBjb21wdXRlZCA9PT0gLUluZmluaXR5ICYmIHJlc3VsdCA9PT0gLUluZmluaXR5KSB7XG4gICAgICAgICAgcmVzdWx0ID0gdmFsdWU7XG4gICAgICAgICAgbGFzdENvbXB1dGVkID0gY29tcHV0ZWQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8vIFJldHVybiB0aGUgbWluaW11bSBlbGVtZW50IChvciBlbGVtZW50LWJhc2VkIGNvbXB1dGF0aW9uKS5cbiAgXy5taW4gPSBmdW5jdGlvbihvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgdmFyIHJlc3VsdCA9IEluZmluaXR5LCBsYXN0Q29tcHV0ZWQgPSBJbmZpbml0eSxcbiAgICAgICAgdmFsdWUsIGNvbXB1dGVkO1xuICAgIGlmIChpdGVyYXRlZSA9PSBudWxsICYmIG9iaiAhPSBudWxsKSB7XG4gICAgICBvYmogPSBvYmoubGVuZ3RoID09PSArb2JqLmxlbmd0aCA/IG9iaiA6IF8udmFsdWVzKG9iaik7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gb2JqLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhbHVlID0gb2JqW2ldO1xuICAgICAgICBpZiAodmFsdWUgPCByZXN1bHQpIHtcbiAgICAgICAgICByZXN1bHQgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpdGVyYXRlZSA9IF8uaXRlcmF0ZWUoaXRlcmF0ZWUsIGNvbnRleHQpO1xuICAgICAgXy5lYWNoKG9iaiwgZnVuY3Rpb24odmFsdWUsIGluZGV4LCBsaXN0KSB7XG4gICAgICAgIGNvbXB1dGVkID0gaXRlcmF0ZWUodmFsdWUsIGluZGV4LCBsaXN0KTtcbiAgICAgICAgaWYgKGNvbXB1dGVkIDwgbGFzdENvbXB1dGVkIHx8IGNvbXB1dGVkID09PSBJbmZpbml0eSAmJiByZXN1bHQgPT09IEluZmluaXR5KSB7XG4gICAgICAgICAgcmVzdWx0ID0gdmFsdWU7XG4gICAgICAgICAgbGFzdENvbXB1dGVkID0gY29tcHV0ZWQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8vIFNodWZmbGUgYSBjb2xsZWN0aW9uLCB1c2luZyB0aGUgbW9kZXJuIHZlcnNpb24gb2YgdGhlXG4gIC8vIFtGaXNoZXItWWF0ZXMgc2h1ZmZsZV0oaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9GaXNoZXLigJNZYXRlc19zaHVmZmxlKS5cbiAgXy5zaHVmZmxlID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIHNldCA9IG9iaiAmJiBvYmoubGVuZ3RoID09PSArb2JqLmxlbmd0aCA/IG9iaiA6IF8udmFsdWVzKG9iaik7XG4gICAgdmFyIGxlbmd0aCA9IHNldC5sZW5ndGg7XG4gICAgdmFyIHNodWZmbGVkID0gQXJyYXkobGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpbmRleCA9IDAsIHJhbmQ7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICByYW5kID0gXy5yYW5kb20oMCwgaW5kZXgpO1xuICAgICAgaWYgKHJhbmQgIT09IGluZGV4KSBzaHVmZmxlZFtpbmRleF0gPSBzaHVmZmxlZFtyYW5kXTtcbiAgICAgIHNodWZmbGVkW3JhbmRdID0gc2V0W2luZGV4XTtcbiAgICB9XG4gICAgcmV0dXJuIHNodWZmbGVkO1xuICB9O1xuXG4gIC8vIFNhbXBsZSAqKm4qKiByYW5kb20gdmFsdWVzIGZyb20gYSBjb2xsZWN0aW9uLlxuICAvLyBJZiAqKm4qKiBpcyBub3Qgc3BlY2lmaWVkLCByZXR1cm5zIGEgc2luZ2xlIHJhbmRvbSBlbGVtZW50LlxuICAvLyBUaGUgaW50ZXJuYWwgYGd1YXJkYCBhcmd1bWVudCBhbGxvd3MgaXQgdG8gd29yayB3aXRoIGBtYXBgLlxuICBfLnNhbXBsZSA9IGZ1bmN0aW9uKG9iaiwgbiwgZ3VhcmQpIHtcbiAgICBpZiAobiA9PSBudWxsIHx8IGd1YXJkKSB7XG4gICAgICBpZiAob2JqLmxlbmd0aCAhPT0gK29iai5sZW5ndGgpIG9iaiA9IF8udmFsdWVzKG9iaik7XG4gICAgICByZXR1cm4gb2JqW18ucmFuZG9tKG9iai5sZW5ndGggLSAxKV07XG4gICAgfVxuICAgIHJldHVybiBfLnNodWZmbGUob2JqKS5zbGljZSgwLCBNYXRoLm1heCgwLCBuKSk7XG4gIH07XG5cbiAgLy8gU29ydCB0aGUgb2JqZWN0J3MgdmFsdWVzIGJ5IGEgY3JpdGVyaW9uIHByb2R1Y2VkIGJ5IGFuIGl0ZXJhdGVlLlxuICBfLnNvcnRCeSA9IGZ1bmN0aW9uKG9iaiwgaXRlcmF0ZWUsIGNvbnRleHQpIHtcbiAgICBpdGVyYXRlZSA9IF8uaXRlcmF0ZWUoaXRlcmF0ZWUsIGNvbnRleHQpO1xuICAgIHJldHVybiBfLnBsdWNrKF8ubWFwKG9iaiwgZnVuY3Rpb24odmFsdWUsIGluZGV4LCBsaXN0KSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgY3JpdGVyaWE6IGl0ZXJhdGVlKHZhbHVlLCBpbmRleCwgbGlzdClcbiAgICAgIH07XG4gICAgfSkuc29ydChmdW5jdGlvbihsZWZ0LCByaWdodCkge1xuICAgICAgdmFyIGEgPSBsZWZ0LmNyaXRlcmlhO1xuICAgICAgdmFyIGIgPSByaWdodC5jcml0ZXJpYTtcbiAgICAgIGlmIChhICE9PSBiKSB7XG4gICAgICAgIGlmIChhID4gYiB8fCBhID09PSB2b2lkIDApIHJldHVybiAxO1xuICAgICAgICBpZiAoYSA8IGIgfHwgYiA9PT0gdm9pZCAwKSByZXR1cm4gLTE7XG4gICAgICB9XG4gICAgICByZXR1cm4gbGVmdC5pbmRleCAtIHJpZ2h0LmluZGV4O1xuICAgIH0pLCAndmFsdWUnKTtcbiAgfTtcblxuICAvLyBBbiBpbnRlcm5hbCBmdW5jdGlvbiB1c2VkIGZvciBhZ2dyZWdhdGUgXCJncm91cCBieVwiIG9wZXJhdGlvbnMuXG4gIHZhciBncm91cCA9IGZ1bmN0aW9uKGJlaGF2aW9yKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKG9iaiwgaXRlcmF0ZWUsIGNvbnRleHQpIHtcbiAgICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICAgIGl0ZXJhdGVlID0gXy5pdGVyYXRlZShpdGVyYXRlZSwgY29udGV4dCk7XG4gICAgICBfLmVhY2gob2JqLCBmdW5jdGlvbih2YWx1ZSwgaW5kZXgpIHtcbiAgICAgICAgdmFyIGtleSA9IGl0ZXJhdGVlKHZhbHVlLCBpbmRleCwgb2JqKTtcbiAgICAgICAgYmVoYXZpb3IocmVzdWx0LCB2YWx1ZSwga2V5KTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICB9O1xuXG4gIC8vIEdyb3VwcyB0aGUgb2JqZWN0J3MgdmFsdWVzIGJ5IGEgY3JpdGVyaW9uLiBQYXNzIGVpdGhlciBhIHN0cmluZyBhdHRyaWJ1dGVcbiAgLy8gdG8gZ3JvdXAgYnksIG9yIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBjcml0ZXJpb24uXG4gIF8uZ3JvdXBCeSA9IGdyb3VwKGZ1bmN0aW9uKHJlc3VsdCwgdmFsdWUsIGtleSkge1xuICAgIGlmIChfLmhhcyhyZXN1bHQsIGtleSkpIHJlc3VsdFtrZXldLnB1c2godmFsdWUpOyBlbHNlIHJlc3VsdFtrZXldID0gW3ZhbHVlXTtcbiAgfSk7XG5cbiAgLy8gSW5kZXhlcyB0aGUgb2JqZWN0J3MgdmFsdWVzIGJ5IGEgY3JpdGVyaW9uLCBzaW1pbGFyIHRvIGBncm91cEJ5YCwgYnV0IGZvclxuICAvLyB3aGVuIHlvdSBrbm93IHRoYXQgeW91ciBpbmRleCB2YWx1ZXMgd2lsbCBiZSB1bmlxdWUuXG4gIF8uaW5kZXhCeSA9IGdyb3VwKGZ1bmN0aW9uKHJlc3VsdCwgdmFsdWUsIGtleSkge1xuICAgIHJlc3VsdFtrZXldID0gdmFsdWU7XG4gIH0pO1xuXG4gIC8vIENvdW50cyBpbnN0YW5jZXMgb2YgYW4gb2JqZWN0IHRoYXQgZ3JvdXAgYnkgYSBjZXJ0YWluIGNyaXRlcmlvbi4gUGFzc1xuICAvLyBlaXRoZXIgYSBzdHJpbmcgYXR0cmlidXRlIHRvIGNvdW50IGJ5LCBvciBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGVcbiAgLy8gY3JpdGVyaW9uLlxuICBfLmNvdW50QnkgPSBncm91cChmdW5jdGlvbihyZXN1bHQsIHZhbHVlLCBrZXkpIHtcbiAgICBpZiAoXy5oYXMocmVzdWx0LCBrZXkpKSByZXN1bHRba2V5XSsrOyBlbHNlIHJlc3VsdFtrZXldID0gMTtcbiAgfSk7XG5cbiAgLy8gVXNlIGEgY29tcGFyYXRvciBmdW5jdGlvbiB0byBmaWd1cmUgb3V0IHRoZSBzbWFsbGVzdCBpbmRleCBhdCB3aGljaFxuICAvLyBhbiBvYmplY3Qgc2hvdWxkIGJlIGluc2VydGVkIHNvIGFzIHRvIG1haW50YWluIG9yZGVyLiBVc2VzIGJpbmFyeSBzZWFyY2guXG4gIF8uc29ydGVkSW5kZXggPSBmdW5jdGlvbihhcnJheSwgb2JqLCBpdGVyYXRlZSwgY29udGV4dCkge1xuICAgIGl0ZXJhdGVlID0gXy5pdGVyYXRlZShpdGVyYXRlZSwgY29udGV4dCwgMSk7XG4gICAgdmFyIHZhbHVlID0gaXRlcmF0ZWUob2JqKTtcbiAgICB2YXIgbG93ID0gMCwgaGlnaCA9IGFycmF5Lmxlbmd0aDtcbiAgICB3aGlsZSAobG93IDwgaGlnaCkge1xuICAgICAgdmFyIG1pZCA9IGxvdyArIGhpZ2ggPj4+IDE7XG4gICAgICBpZiAoaXRlcmF0ZWUoYXJyYXlbbWlkXSkgPCB2YWx1ZSkgbG93ID0gbWlkICsgMTsgZWxzZSBoaWdoID0gbWlkO1xuICAgIH1cbiAgICByZXR1cm4gbG93O1xuICB9O1xuXG4gIC8vIFNhZmVseSBjcmVhdGUgYSByZWFsLCBsaXZlIGFycmF5IGZyb20gYW55dGhpbmcgaXRlcmFibGUuXG4gIF8udG9BcnJheSA9IGZ1bmN0aW9uKG9iaikge1xuICAgIGlmICghb2JqKSByZXR1cm4gW107XG4gICAgaWYgKF8uaXNBcnJheShvYmopKSByZXR1cm4gc2xpY2UuY2FsbChvYmopO1xuICAgIGlmIChvYmoubGVuZ3RoID09PSArb2JqLmxlbmd0aCkgcmV0dXJuIF8ubWFwKG9iaiwgXy5pZGVudGl0eSk7XG4gICAgcmV0dXJuIF8udmFsdWVzKG9iaik7XG4gIH07XG5cbiAgLy8gUmV0dXJuIHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gYW4gb2JqZWN0LlxuICBfLnNpemUgPSBmdW5jdGlvbihvYmopIHtcbiAgICBpZiAob2JqID09IG51bGwpIHJldHVybiAwO1xuICAgIHJldHVybiBvYmoubGVuZ3RoID09PSArb2JqLmxlbmd0aCA/IG9iai5sZW5ndGggOiBfLmtleXMob2JqKS5sZW5ndGg7XG4gIH07XG5cbiAgLy8gU3BsaXQgYSBjb2xsZWN0aW9uIGludG8gdHdvIGFycmF5czogb25lIHdob3NlIGVsZW1lbnRzIGFsbCBzYXRpc2Z5IHRoZSBnaXZlblxuICAvLyBwcmVkaWNhdGUsIGFuZCBvbmUgd2hvc2UgZWxlbWVudHMgYWxsIGRvIG5vdCBzYXRpc2Z5IHRoZSBwcmVkaWNhdGUuXG4gIF8ucGFydGl0aW9uID0gZnVuY3Rpb24ob2JqLCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICBwcmVkaWNhdGUgPSBfLml0ZXJhdGVlKHByZWRpY2F0ZSwgY29udGV4dCk7XG4gICAgdmFyIHBhc3MgPSBbXSwgZmFpbCA9IFtdO1xuICAgIF8uZWFjaChvYmosIGZ1bmN0aW9uKHZhbHVlLCBrZXksIG9iaikge1xuICAgICAgKHByZWRpY2F0ZSh2YWx1ZSwga2V5LCBvYmopID8gcGFzcyA6IGZhaWwpLnB1c2godmFsdWUpO1xuICAgIH0pO1xuICAgIHJldHVybiBbcGFzcywgZmFpbF07XG4gIH07XG5cbiAgLy8gQXJyYXkgRnVuY3Rpb25zXG4gIC8vIC0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIEdldCB0aGUgZmlyc3QgZWxlbWVudCBvZiBhbiBhcnJheS4gUGFzc2luZyAqKm4qKiB3aWxsIHJldHVybiB0aGUgZmlyc3QgTlxuICAvLyB2YWx1ZXMgaW4gdGhlIGFycmF5LiBBbGlhc2VkIGFzIGBoZWFkYCBhbmQgYHRha2VgLiBUaGUgKipndWFyZCoqIGNoZWNrXG4gIC8vIGFsbG93cyBpdCB0byB3b3JrIHdpdGggYF8ubWFwYC5cbiAgXy5maXJzdCA9IF8uaGVhZCA9IF8udGFrZSA9IGZ1bmN0aW9uKGFycmF5LCBuLCBndWFyZCkge1xuICAgIGlmIChhcnJheSA9PSBudWxsKSByZXR1cm4gdm9pZCAwO1xuICAgIGlmIChuID09IG51bGwgfHwgZ3VhcmQpIHJldHVybiBhcnJheVswXTtcbiAgICBpZiAobiA8IDApIHJldHVybiBbXTtcbiAgICByZXR1cm4gc2xpY2UuY2FsbChhcnJheSwgMCwgbik7XG4gIH07XG5cbiAgLy8gUmV0dXJucyBldmVyeXRoaW5nIGJ1dCB0aGUgbGFzdCBlbnRyeSBvZiB0aGUgYXJyYXkuIEVzcGVjaWFsbHkgdXNlZnVsIG9uXG4gIC8vIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBQYXNzaW5nICoqbioqIHdpbGwgcmV0dXJuIGFsbCB0aGUgdmFsdWVzIGluXG4gIC8vIHRoZSBhcnJheSwgZXhjbHVkaW5nIHRoZSBsYXN0IE4uIFRoZSAqKmd1YXJkKiogY2hlY2sgYWxsb3dzIGl0IHRvIHdvcmsgd2l0aFxuICAvLyBgXy5tYXBgLlxuICBfLmluaXRpYWwgPSBmdW5jdGlvbihhcnJheSwgbiwgZ3VhcmQpIHtcbiAgICByZXR1cm4gc2xpY2UuY2FsbChhcnJheSwgMCwgTWF0aC5tYXgoMCwgYXJyYXkubGVuZ3RoIC0gKG4gPT0gbnVsbCB8fCBndWFyZCA/IDEgOiBuKSkpO1xuICB9O1xuXG4gIC8vIEdldCB0aGUgbGFzdCBlbGVtZW50IG9mIGFuIGFycmF5LiBQYXNzaW5nICoqbioqIHdpbGwgcmV0dXJuIHRoZSBsYXN0IE5cbiAgLy8gdmFsdWVzIGluIHRoZSBhcnJheS4gVGhlICoqZ3VhcmQqKiBjaGVjayBhbGxvd3MgaXQgdG8gd29yayB3aXRoIGBfLm1hcGAuXG4gIF8ubGFzdCA9IGZ1bmN0aW9uKGFycmF5LCBuLCBndWFyZCkge1xuICAgIGlmIChhcnJheSA9PSBudWxsKSByZXR1cm4gdm9pZCAwO1xuICAgIGlmIChuID09IG51bGwgfHwgZ3VhcmQpIHJldHVybiBhcnJheVthcnJheS5sZW5ndGggLSAxXTtcbiAgICByZXR1cm4gc2xpY2UuY2FsbChhcnJheSwgTWF0aC5tYXgoYXJyYXkubGVuZ3RoIC0gbiwgMCkpO1xuICB9O1xuXG4gIC8vIFJldHVybnMgZXZlcnl0aGluZyBidXQgdGhlIGZpcnN0IGVudHJ5IG9mIHRoZSBhcnJheS4gQWxpYXNlZCBhcyBgdGFpbGAgYW5kIGBkcm9wYC5cbiAgLy8gRXNwZWNpYWxseSB1c2VmdWwgb24gdGhlIGFyZ3VtZW50cyBvYmplY3QuIFBhc3NpbmcgYW4gKipuKiogd2lsbCByZXR1cm5cbiAgLy8gdGhlIHJlc3QgTiB2YWx1ZXMgaW4gdGhlIGFycmF5LiBUaGUgKipndWFyZCoqXG4gIC8vIGNoZWNrIGFsbG93cyBpdCB0byB3b3JrIHdpdGggYF8ubWFwYC5cbiAgXy5yZXN0ID0gXy50YWlsID0gXy5kcm9wID0gZnVuY3Rpb24oYXJyYXksIG4sIGd1YXJkKSB7XG4gICAgcmV0dXJuIHNsaWNlLmNhbGwoYXJyYXksIG4gPT0gbnVsbCB8fCBndWFyZCA/IDEgOiBuKTtcbiAgfTtcblxuICAvLyBUcmltIG91dCBhbGwgZmFsc3kgdmFsdWVzIGZyb20gYW4gYXJyYXkuXG4gIF8uY29tcGFjdCA9IGZ1bmN0aW9uKGFycmF5KSB7XG4gICAgcmV0dXJuIF8uZmlsdGVyKGFycmF5LCBfLmlkZW50aXR5KTtcbiAgfTtcblxuICAvLyBJbnRlcm5hbCBpbXBsZW1lbnRhdGlvbiBvZiBhIHJlY3Vyc2l2ZSBgZmxhdHRlbmAgZnVuY3Rpb24uXG4gIHZhciBmbGF0dGVuID0gZnVuY3Rpb24oaW5wdXQsIHNoYWxsb3csIHN0cmljdCwgb3V0cHV0KSB7XG4gICAgaWYgKHNoYWxsb3cgJiYgXy5ldmVyeShpbnB1dCwgXy5pc0FycmF5KSkge1xuICAgICAgcmV0dXJuIGNvbmNhdC5hcHBseShvdXRwdXQsIGlucHV0KTtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGlucHV0Lmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgdmFsdWUgPSBpbnB1dFtpXTtcbiAgICAgIGlmICghXy5pc0FycmF5KHZhbHVlKSAmJiAhXy5pc0FyZ3VtZW50cyh2YWx1ZSkpIHtcbiAgICAgICAgaWYgKCFzdHJpY3QpIG91dHB1dC5wdXNoKHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoc2hhbGxvdykge1xuICAgICAgICBwdXNoLmFwcGx5KG91dHB1dCwgdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZmxhdHRlbih2YWx1ZSwgc2hhbGxvdywgc3RyaWN0LCBvdXRwdXQpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb3V0cHV0O1xuICB9O1xuXG4gIC8vIEZsYXR0ZW4gb3V0IGFuIGFycmF5LCBlaXRoZXIgcmVjdXJzaXZlbHkgKGJ5IGRlZmF1bHQpLCBvciBqdXN0IG9uZSBsZXZlbC5cbiAgXy5mbGF0dGVuID0gZnVuY3Rpb24oYXJyYXksIHNoYWxsb3cpIHtcbiAgICByZXR1cm4gZmxhdHRlbihhcnJheSwgc2hhbGxvdywgZmFsc2UsIFtdKTtcbiAgfTtcblxuICAvLyBSZXR1cm4gYSB2ZXJzaW9uIG9mIHRoZSBhcnJheSB0aGF0IGRvZXMgbm90IGNvbnRhaW4gdGhlIHNwZWNpZmllZCB2YWx1ZShzKS5cbiAgXy53aXRob3V0ID0gZnVuY3Rpb24oYXJyYXkpIHtcbiAgICByZXR1cm4gXy5kaWZmZXJlbmNlKGFycmF5LCBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpO1xuICB9O1xuXG4gIC8vIFByb2R1Y2UgYSBkdXBsaWNhdGUtZnJlZSB2ZXJzaW9uIG9mIHRoZSBhcnJheS4gSWYgdGhlIGFycmF5IGhhcyBhbHJlYWR5XG4gIC8vIGJlZW4gc29ydGVkLCB5b3UgaGF2ZSB0aGUgb3B0aW9uIG9mIHVzaW5nIGEgZmFzdGVyIGFsZ29yaXRobS5cbiAgLy8gQWxpYXNlZCBhcyBgdW5pcXVlYC5cbiAgXy51bmlxID0gXy51bmlxdWUgPSBmdW5jdGlvbihhcnJheSwgaXNTb3J0ZWQsIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgaWYgKGFycmF5ID09IG51bGwpIHJldHVybiBbXTtcbiAgICBpZiAoIV8uaXNCb29sZWFuKGlzU29ydGVkKSkge1xuICAgICAgY29udGV4dCA9IGl0ZXJhdGVlO1xuICAgICAgaXRlcmF0ZWUgPSBpc1NvcnRlZDtcbiAgICAgIGlzU29ydGVkID0gZmFsc2U7XG4gICAgfVxuICAgIGlmIChpdGVyYXRlZSAhPSBudWxsKSBpdGVyYXRlZSA9IF8uaXRlcmF0ZWUoaXRlcmF0ZWUsIGNvbnRleHQpO1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICB2YXIgc2VlbiA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBhcnJheS5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHZhbHVlID0gYXJyYXlbaV07XG4gICAgICBpZiAoaXNTb3J0ZWQpIHtcbiAgICAgICAgaWYgKCFpIHx8IHNlZW4gIT09IHZhbHVlKSByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgICAgIHNlZW4gPSB2YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoaXRlcmF0ZWUpIHtcbiAgICAgICAgdmFyIGNvbXB1dGVkID0gaXRlcmF0ZWUodmFsdWUsIGksIGFycmF5KTtcbiAgICAgICAgaWYgKF8uaW5kZXhPZihzZWVuLCBjb21wdXRlZCkgPCAwKSB7XG4gICAgICAgICAgc2Vlbi5wdXNoKGNvbXB1dGVkKTtcbiAgICAgICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoXy5pbmRleE9mKHJlc3VsdCwgdmFsdWUpIDwgMCkge1xuICAgICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgLy8gUHJvZHVjZSBhbiBhcnJheSB0aGF0IGNvbnRhaW5zIHRoZSB1bmlvbjogZWFjaCBkaXN0aW5jdCBlbGVtZW50IGZyb20gYWxsIG9mXG4gIC8vIHRoZSBwYXNzZWQtaW4gYXJyYXlzLlxuICBfLnVuaW9uID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIF8udW5pcShmbGF0dGVuKGFyZ3VtZW50cywgdHJ1ZSwgdHJ1ZSwgW10pKTtcbiAgfTtcblxuICAvLyBQcm9kdWNlIGFuIGFycmF5IHRoYXQgY29udGFpbnMgZXZlcnkgaXRlbSBzaGFyZWQgYmV0d2VlbiBhbGwgdGhlXG4gIC8vIHBhc3NlZC1pbiBhcnJheXMuXG4gIF8uaW50ZXJzZWN0aW9uID0gZnVuY3Rpb24oYXJyYXkpIHtcbiAgICBpZiAoYXJyYXkgPT0gbnVsbCkgcmV0dXJuIFtdO1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICB2YXIgYXJnc0xlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaXRlbSA9IGFycmF5W2ldO1xuICAgICAgaWYgKF8uY29udGFpbnMocmVzdWx0LCBpdGVtKSkgY29udGludWU7XG4gICAgICBmb3IgKHZhciBqID0gMTsgaiA8IGFyZ3NMZW5ndGg7IGorKykge1xuICAgICAgICBpZiAoIV8uY29udGFpbnMoYXJndW1lbnRzW2pdLCBpdGVtKSkgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAoaiA9PT0gYXJnc0xlbmd0aCkgcmVzdWx0LnB1c2goaXRlbSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgLy8gVGFrZSB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIG9uZSBhcnJheSBhbmQgYSBudW1iZXIgb2Ygb3RoZXIgYXJyYXlzLlxuICAvLyBPbmx5IHRoZSBlbGVtZW50cyBwcmVzZW50IGluIGp1c3QgdGhlIGZpcnN0IGFycmF5IHdpbGwgcmVtYWluLlxuICBfLmRpZmZlcmVuY2UgPSBmdW5jdGlvbihhcnJheSkge1xuICAgIHZhciByZXN0ID0gZmxhdHRlbihzbGljZS5jYWxsKGFyZ3VtZW50cywgMSksIHRydWUsIHRydWUsIFtdKTtcbiAgICByZXR1cm4gXy5maWx0ZXIoYXJyYXksIGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgIHJldHVybiAhXy5jb250YWlucyhyZXN0LCB2YWx1ZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gWmlwIHRvZ2V0aGVyIG11bHRpcGxlIGxpc3RzIGludG8gYSBzaW5nbGUgYXJyYXkgLS0gZWxlbWVudHMgdGhhdCBzaGFyZVxuICAvLyBhbiBpbmRleCBnbyB0b2dldGhlci5cbiAgXy56aXAgPSBmdW5jdGlvbihhcnJheSkge1xuICAgIGlmIChhcnJheSA9PSBudWxsKSByZXR1cm4gW107XG4gICAgdmFyIGxlbmd0aCA9IF8ubWF4KGFyZ3VtZW50cywgJ2xlbmd0aCcpLmxlbmd0aDtcbiAgICB2YXIgcmVzdWx0cyA9IEFycmF5KGxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgcmVzdWx0c1tpXSA9IF8ucGx1Y2soYXJndW1lbnRzLCBpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH07XG5cbiAgLy8gQ29udmVydHMgbGlzdHMgaW50byBvYmplY3RzLiBQYXNzIGVpdGhlciBhIHNpbmdsZSBhcnJheSBvZiBgW2tleSwgdmFsdWVdYFxuICAvLyBwYWlycywgb3IgdHdvIHBhcmFsbGVsIGFycmF5cyBvZiB0aGUgc2FtZSBsZW5ndGggLS0gb25lIG9mIGtleXMsIGFuZCBvbmUgb2ZcbiAgLy8gdGhlIGNvcnJlc3BvbmRpbmcgdmFsdWVzLlxuICBfLm9iamVjdCA9IGZ1bmN0aW9uKGxpc3QsIHZhbHVlcykge1xuICAgIGlmIChsaXN0ID09IG51bGwpIHJldHVybiB7fTtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGxpc3QubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh2YWx1ZXMpIHtcbiAgICAgICAgcmVzdWx0W2xpc3RbaV1dID0gdmFsdWVzW2ldO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0W2xpc3RbaV1bMF1dID0gbGlzdFtpXVsxXTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvLyBSZXR1cm4gdGhlIHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIGFuIGl0ZW0gaW4gYW4gYXJyYXksXG4gIC8vIG9yIC0xIGlmIHRoZSBpdGVtIGlzIG5vdCBpbmNsdWRlZCBpbiB0aGUgYXJyYXkuXG4gIC8vIElmIHRoZSBhcnJheSBpcyBsYXJnZSBhbmQgYWxyZWFkeSBpbiBzb3J0IG9yZGVyLCBwYXNzIGB0cnVlYFxuICAvLyBmb3IgKippc1NvcnRlZCoqIHRvIHVzZSBiaW5hcnkgc2VhcmNoLlxuICBfLmluZGV4T2YgPSBmdW5jdGlvbihhcnJheSwgaXRlbSwgaXNTb3J0ZWQpIHtcbiAgICBpZiAoYXJyYXkgPT0gbnVsbCkgcmV0dXJuIC0xO1xuICAgIHZhciBpID0gMCwgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICAgIGlmIChpc1NvcnRlZCkge1xuICAgICAgaWYgKHR5cGVvZiBpc1NvcnRlZCA9PSAnbnVtYmVyJykge1xuICAgICAgICBpID0gaXNTb3J0ZWQgPCAwID8gTWF0aC5tYXgoMCwgbGVuZ3RoICsgaXNTb3J0ZWQpIDogaXNTb3J0ZWQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpID0gXy5zb3J0ZWRJbmRleChhcnJheSwgaXRlbSk7XG4gICAgICAgIHJldHVybiBhcnJheVtpXSA9PT0gaXRlbSA/IGkgOiAtMTtcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICg7IGkgPCBsZW5ndGg7IGkrKykgaWYgKGFycmF5W2ldID09PSBpdGVtKSByZXR1cm4gaTtcbiAgICByZXR1cm4gLTE7XG4gIH07XG5cbiAgXy5sYXN0SW5kZXhPZiA9IGZ1bmN0aW9uKGFycmF5LCBpdGVtLCBmcm9tKSB7XG4gICAgaWYgKGFycmF5ID09IG51bGwpIHJldHVybiAtMTtcbiAgICB2YXIgaWR4ID0gYXJyYXkubGVuZ3RoO1xuICAgIGlmICh0eXBlb2YgZnJvbSA9PSAnbnVtYmVyJykge1xuICAgICAgaWR4ID0gZnJvbSA8IDAgPyBpZHggKyBmcm9tICsgMSA6IE1hdGgubWluKGlkeCwgZnJvbSArIDEpO1xuICAgIH1cbiAgICB3aGlsZSAoLS1pZHggPj0gMCkgaWYgKGFycmF5W2lkeF0gPT09IGl0ZW0pIHJldHVybiBpZHg7XG4gICAgcmV0dXJuIC0xO1xuICB9O1xuXG4gIC8vIEdlbmVyYXRlIGFuIGludGVnZXIgQXJyYXkgY29udGFpbmluZyBhbiBhcml0aG1ldGljIHByb2dyZXNzaW9uLiBBIHBvcnQgb2ZcbiAgLy8gdGhlIG5hdGl2ZSBQeXRob24gYHJhbmdlKClgIGZ1bmN0aW9uLiBTZWVcbiAgLy8gW3RoZSBQeXRob24gZG9jdW1lbnRhdGlvbl0oaHR0cDovL2RvY3MucHl0aG9uLm9yZy9saWJyYXJ5L2Z1bmN0aW9ucy5odG1sI3JhbmdlKS5cbiAgXy5yYW5nZSA9IGZ1bmN0aW9uKHN0YXJ0LCBzdG9wLCBzdGVwKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPD0gMSkge1xuICAgICAgc3RvcCA9IHN0YXJ0IHx8IDA7XG4gICAgICBzdGFydCA9IDA7XG4gICAgfVxuICAgIHN0ZXAgPSBzdGVwIHx8IDE7XG5cbiAgICB2YXIgbGVuZ3RoID0gTWF0aC5tYXgoTWF0aC5jZWlsKChzdG9wIC0gc3RhcnQpIC8gc3RlcCksIDApO1xuICAgIHZhciByYW5nZSA9IEFycmF5KGxlbmd0aCk7XG5cbiAgICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCBsZW5ndGg7IGlkeCsrLCBzdGFydCArPSBzdGVwKSB7XG4gICAgICByYW5nZVtpZHhdID0gc3RhcnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJhbmdlO1xuICB9O1xuXG4gIC8vIEZ1bmN0aW9uIChhaGVtKSBGdW5jdGlvbnNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgLy8gUmV1c2FibGUgY29uc3RydWN0b3IgZnVuY3Rpb24gZm9yIHByb3RvdHlwZSBzZXR0aW5nLlxuICB2YXIgQ3RvciA9IGZ1bmN0aW9uKCl7fTtcblxuICAvLyBDcmVhdGUgYSBmdW5jdGlvbiBib3VuZCB0byBhIGdpdmVuIG9iamVjdCAoYXNzaWduaW5nIGB0aGlzYCwgYW5kIGFyZ3VtZW50cyxcbiAgLy8gb3B0aW9uYWxseSkuIERlbGVnYXRlcyB0byAqKkVDTUFTY3JpcHQgNSoqJ3MgbmF0aXZlIGBGdW5jdGlvbi5iaW5kYCBpZlxuICAvLyBhdmFpbGFibGUuXG4gIF8uYmluZCA9IGZ1bmN0aW9uKGZ1bmMsIGNvbnRleHQpIHtcbiAgICB2YXIgYXJncywgYm91bmQ7XG4gICAgaWYgKG5hdGl2ZUJpbmQgJiYgZnVuYy5iaW5kID09PSBuYXRpdmVCaW5kKSByZXR1cm4gbmF0aXZlQmluZC5hcHBseShmdW5jLCBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpO1xuICAgIGlmICghXy5pc0Z1bmN0aW9uKGZ1bmMpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdCaW5kIG11c3QgYmUgY2FsbGVkIG9uIGEgZnVuY3Rpb24nKTtcbiAgICBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpO1xuICAgIGJvdW5kID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgYm91bmQpKSByZXR1cm4gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzLmNvbmNhdChzbGljZS5jYWxsKGFyZ3VtZW50cykpKTtcbiAgICAgIEN0b3IucHJvdG90eXBlID0gZnVuYy5wcm90b3R5cGU7XG4gICAgICB2YXIgc2VsZiA9IG5ldyBDdG9yO1xuICAgICAgQ3Rvci5wcm90b3R5cGUgPSBudWxsO1xuICAgICAgdmFyIHJlc3VsdCA9IGZ1bmMuYXBwbHkoc2VsZiwgYXJncy5jb25jYXQoc2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XG4gICAgICBpZiAoXy5pc09iamVjdChyZXN1bHQpKSByZXR1cm4gcmVzdWx0O1xuICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcbiAgICByZXR1cm4gYm91bmQ7XG4gIH07XG5cbiAgLy8gUGFydGlhbGx5IGFwcGx5IGEgZnVuY3Rpb24gYnkgY3JlYXRpbmcgYSB2ZXJzaW9uIHRoYXQgaGFzIGhhZCBzb21lIG9mIGl0c1xuICAvLyBhcmd1bWVudHMgcHJlLWZpbGxlZCwgd2l0aG91dCBjaGFuZ2luZyBpdHMgZHluYW1pYyBgdGhpc2AgY29udGV4dC4gXyBhY3RzXG4gIC8vIGFzIGEgcGxhY2Vob2xkZXIsIGFsbG93aW5nIGFueSBjb21iaW5hdGlvbiBvZiBhcmd1bWVudHMgdG8gYmUgcHJlLWZpbGxlZC5cbiAgXy5wYXJ0aWFsID0gZnVuY3Rpb24oZnVuYykge1xuICAgIHZhciBib3VuZEFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHBvc2l0aW9uID0gMDtcbiAgICAgIHZhciBhcmdzID0gYm91bmRBcmdzLnNsaWNlKCk7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gYXJncy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoYXJnc1tpXSA9PT0gXykgYXJnc1tpXSA9IGFyZ3VtZW50c1twb3NpdGlvbisrXTtcbiAgICAgIH1cbiAgICAgIHdoaWxlIChwb3NpdGlvbiA8IGFyZ3VtZW50cy5sZW5ndGgpIGFyZ3MucHVzaChhcmd1bWVudHNbcG9zaXRpb24rK10pO1xuICAgICAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfTtcbiAgfTtcblxuICAvLyBCaW5kIGEgbnVtYmVyIG9mIGFuIG9iamVjdCdzIG1ldGhvZHMgdG8gdGhhdCBvYmplY3QuIFJlbWFpbmluZyBhcmd1bWVudHNcbiAgLy8gYXJlIHRoZSBtZXRob2QgbmFtZXMgdG8gYmUgYm91bmQuIFVzZWZ1bCBmb3IgZW5zdXJpbmcgdGhhdCBhbGwgY2FsbGJhY2tzXG4gIC8vIGRlZmluZWQgb24gYW4gb2JqZWN0IGJlbG9uZyB0byBpdC5cbiAgXy5iaW5kQWxsID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIGksIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGgsIGtleTtcbiAgICBpZiAobGVuZ3RoIDw9IDEpIHRocm93IG5ldyBFcnJvcignYmluZEFsbCBtdXN0IGJlIHBhc3NlZCBmdW5jdGlvbiBuYW1lcycpO1xuICAgIGZvciAoaSA9IDE7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAga2V5ID0gYXJndW1lbnRzW2ldO1xuICAgICAgb2JqW2tleV0gPSBfLmJpbmQob2JqW2tleV0sIG9iaik7XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG4gIH07XG5cbiAgLy8gTWVtb2l6ZSBhbiBleHBlbnNpdmUgZnVuY3Rpb24gYnkgc3RvcmluZyBpdHMgcmVzdWx0cy5cbiAgXy5tZW1vaXplID0gZnVuY3Rpb24oZnVuYywgaGFzaGVyKSB7XG4gICAgdmFyIG1lbW9pemUgPSBmdW5jdGlvbihrZXkpIHtcbiAgICAgIHZhciBjYWNoZSA9IG1lbW9pemUuY2FjaGU7XG4gICAgICB2YXIgYWRkcmVzcyA9IGhhc2hlciA/IGhhc2hlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIDoga2V5O1xuICAgICAgaWYgKCFfLmhhcyhjYWNoZSwgYWRkcmVzcykpIGNhY2hlW2FkZHJlc3NdID0gZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgcmV0dXJuIGNhY2hlW2FkZHJlc3NdO1xuICAgIH07XG4gICAgbWVtb2l6ZS5jYWNoZSA9IHt9O1xuICAgIHJldHVybiBtZW1vaXplO1xuICB9O1xuXG4gIC8vIERlbGF5cyBhIGZ1bmN0aW9uIGZvciB0aGUgZ2l2ZW4gbnVtYmVyIG9mIG1pbGxpc2Vjb25kcywgYW5kIHRoZW4gY2FsbHNcbiAgLy8gaXQgd2l0aCB0aGUgYXJndW1lbnRzIHN1cHBsaWVkLlxuICBfLmRlbGF5ID0gZnVuY3Rpb24oZnVuYywgd2FpdCkge1xuICAgIHZhciBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpO1xuICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICByZXR1cm4gZnVuYy5hcHBseShudWxsLCBhcmdzKTtcbiAgICB9LCB3YWl0KTtcbiAgfTtcblxuICAvLyBEZWZlcnMgYSBmdW5jdGlvbiwgc2NoZWR1bGluZyBpdCB0byBydW4gYWZ0ZXIgdGhlIGN1cnJlbnQgY2FsbCBzdGFjayBoYXNcbiAgLy8gY2xlYXJlZC5cbiAgXy5kZWZlciA9IGZ1bmN0aW9uKGZ1bmMpIHtcbiAgICByZXR1cm4gXy5kZWxheS5hcHBseShfLCBbZnVuYywgMV0uY29uY2F0KHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSkpO1xuICB9O1xuXG4gIC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCwgd2hlbiBpbnZva2VkLCB3aWxsIG9ubHkgYmUgdHJpZ2dlcmVkIGF0IG1vc3Qgb25jZVxuICAvLyBkdXJpbmcgYSBnaXZlbiB3aW5kb3cgb2YgdGltZS4gTm9ybWFsbHksIHRoZSB0aHJvdHRsZWQgZnVuY3Rpb24gd2lsbCBydW5cbiAgLy8gYXMgbXVjaCBhcyBpdCBjYW4sIHdpdGhvdXQgZXZlciBnb2luZyBtb3JlIHRoYW4gb25jZSBwZXIgYHdhaXRgIGR1cmF0aW9uO1xuICAvLyBidXQgaWYgeW91J2QgbGlrZSB0byBkaXNhYmxlIHRoZSBleGVjdXRpb24gb24gdGhlIGxlYWRpbmcgZWRnZSwgcGFzc1xuICAvLyBge2xlYWRpbmc6IGZhbHNlfWAuIFRvIGRpc2FibGUgZXhlY3V0aW9uIG9uIHRoZSB0cmFpbGluZyBlZGdlLCBkaXR0by5cbiAgXy50aHJvdHRsZSA9IGZ1bmN0aW9uKGZ1bmMsIHdhaXQsIG9wdGlvbnMpIHtcbiAgICB2YXIgY29udGV4dCwgYXJncywgcmVzdWx0O1xuICAgIHZhciB0aW1lb3V0ID0gbnVsbDtcbiAgICB2YXIgcHJldmlvdXMgPSAwO1xuICAgIGlmICghb3B0aW9ucykgb3B0aW9ucyA9IHt9O1xuICAgIHZhciBsYXRlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgcHJldmlvdXMgPSBvcHRpb25zLmxlYWRpbmcgPT09IGZhbHNlID8gMCA6IF8ubm93KCk7XG4gICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICBpZiAoIXRpbWVvdXQpIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBub3cgPSBfLm5vdygpO1xuICAgICAgaWYgKCFwcmV2aW91cyAmJiBvcHRpb25zLmxlYWRpbmcgPT09IGZhbHNlKSBwcmV2aW91cyA9IG5vdztcbiAgICAgIHZhciByZW1haW5pbmcgPSB3YWl0IC0gKG5vdyAtIHByZXZpb3VzKTtcbiAgICAgIGNvbnRleHQgPSB0aGlzO1xuICAgICAgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgIGlmIChyZW1haW5pbmcgPD0gMCB8fCByZW1haW5pbmcgPiB3YWl0KSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgIHByZXZpb3VzID0gbm93O1xuICAgICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICBpZiAoIXRpbWVvdXQpIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcbiAgICAgIH0gZWxzZSBpZiAoIXRpbWVvdXQgJiYgb3B0aW9ucy50cmFpbGluZyAhPT0gZmFsc2UpIHtcbiAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHJlbWFpbmluZyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gIH07XG5cbiAgLy8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0LCBhcyBsb25nIGFzIGl0IGNvbnRpbnVlcyB0byBiZSBpbnZva2VkLCB3aWxsIG5vdFxuICAvLyBiZSB0cmlnZ2VyZWQuIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBhZnRlciBpdCBzdG9wcyBiZWluZyBjYWxsZWQgZm9yXG4gIC8vIE4gbWlsbGlzZWNvbmRzLiBJZiBgaW1tZWRpYXRlYCBpcyBwYXNzZWQsIHRyaWdnZXIgdGhlIGZ1bmN0aW9uIG9uIHRoZVxuICAvLyBsZWFkaW5nIGVkZ2UsIGluc3RlYWQgb2YgdGhlIHRyYWlsaW5nLlxuICBfLmRlYm91bmNlID0gZnVuY3Rpb24oZnVuYywgd2FpdCwgaW1tZWRpYXRlKSB7XG4gICAgdmFyIHRpbWVvdXQsIGFyZ3MsIGNvbnRleHQsIHRpbWVzdGFtcCwgcmVzdWx0O1xuXG4gICAgdmFyIGxhdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgbGFzdCA9IF8ubm93KCkgLSB0aW1lc3RhbXA7XG5cbiAgICAgIGlmIChsYXN0IDwgd2FpdCAmJiBsYXN0ID4gMCkge1xuICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCAtIGxhc3QpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgIGlmICghaW1tZWRpYXRlKSB7XG4gICAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgICBpZiAoIXRpbWVvdXQpIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICBjb250ZXh0ID0gdGhpcztcbiAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICB0aW1lc3RhbXAgPSBfLm5vdygpO1xuICAgICAgdmFyIGNhbGxOb3cgPSBpbW1lZGlhdGUgJiYgIXRpbWVvdXQ7XG4gICAgICBpZiAoIXRpbWVvdXQpIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcbiAgICAgIGlmIChjYWxsTm93KSB7XG4gICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICB9O1xuXG4gIC8vIFJldHVybnMgdGhlIGZpcnN0IGZ1bmN0aW9uIHBhc3NlZCBhcyBhbiBhcmd1bWVudCB0byB0aGUgc2Vjb25kLFxuICAvLyBhbGxvd2luZyB5b3UgdG8gYWRqdXN0IGFyZ3VtZW50cywgcnVuIGNvZGUgYmVmb3JlIGFuZCBhZnRlciwgYW5kXG4gIC8vIGNvbmRpdGlvbmFsbHkgZXhlY3V0ZSB0aGUgb3JpZ2luYWwgZnVuY3Rpb24uXG4gIF8ud3JhcCA9IGZ1bmN0aW9uKGZ1bmMsIHdyYXBwZXIpIHtcbiAgICByZXR1cm4gXy5wYXJ0aWFsKHdyYXBwZXIsIGZ1bmMpO1xuICB9O1xuXG4gIC8vIFJldHVybnMgYSBuZWdhdGVkIHZlcnNpb24gb2YgdGhlIHBhc3NlZC1pbiBwcmVkaWNhdGUuXG4gIF8ubmVnYXRlID0gZnVuY3Rpb24ocHJlZGljYXRlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuICFwcmVkaWNhdGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9O1xuXG4gIC8vIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGlzIHRoZSBjb21wb3NpdGlvbiBvZiBhIGxpc3Qgb2YgZnVuY3Rpb25zLCBlYWNoXG4gIC8vIGNvbnN1bWluZyB0aGUgcmV0dXJuIHZhbHVlIG9mIHRoZSBmdW5jdGlvbiB0aGF0IGZvbGxvd3MuXG4gIF8uY29tcG9zZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgIHZhciBzdGFydCA9IGFyZ3MubGVuZ3RoIC0gMTtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaSA9IHN0YXJ0O1xuICAgICAgdmFyIHJlc3VsdCA9IGFyZ3Nbc3RhcnRdLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB3aGlsZSAoaS0tKSByZXN1bHQgPSBhcmdzW2ldLmNhbGwodGhpcywgcmVzdWx0KTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCB3aWxsIG9ubHkgYmUgZXhlY3V0ZWQgYWZ0ZXIgYmVpbmcgY2FsbGVkIE4gdGltZXMuXG4gIF8uYWZ0ZXIgPSBmdW5jdGlvbih0aW1lcywgZnVuYykge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICgtLXRpbWVzIDwgMSkge1xuICAgICAgICByZXR1cm4gZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuICAgIH07XG4gIH07XG5cbiAgLy8gUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgd2lsbCBvbmx5IGJlIGV4ZWN1dGVkIGJlZm9yZSBiZWluZyBjYWxsZWQgTiB0aW1lcy5cbiAgXy5iZWZvcmUgPSBmdW5jdGlvbih0aW1lcywgZnVuYykge1xuICAgIHZhciBtZW1vO1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICgtLXRpbWVzID4gMCkge1xuICAgICAgICBtZW1vID0gZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZnVuYyA9IG51bGw7XG4gICAgICB9XG4gICAgICByZXR1cm4gbWVtbztcbiAgICB9O1xuICB9O1xuXG4gIC8vIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgZXhlY3V0ZWQgYXQgbW9zdCBvbmUgdGltZSwgbm8gbWF0dGVyIGhvd1xuICAvLyBvZnRlbiB5b3UgY2FsbCBpdC4gVXNlZnVsIGZvciBsYXp5IGluaXRpYWxpemF0aW9uLlxuICBfLm9uY2UgPSBfLnBhcnRpYWwoXy5iZWZvcmUsIDIpO1xuXG4gIC8vIE9iamVjdCBGdW5jdGlvbnNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIFJldHJpZXZlIHRoZSBuYW1lcyBvZiBhbiBvYmplY3QncyBwcm9wZXJ0aWVzLlxuICAvLyBEZWxlZ2F0ZXMgdG8gKipFQ01BU2NyaXB0IDUqKidzIG5hdGl2ZSBgT2JqZWN0LmtleXNgXG4gIF8ua2V5cyA9IGZ1bmN0aW9uKG9iaikge1xuICAgIGlmICghXy5pc09iamVjdChvYmopKSByZXR1cm4gW107XG4gICAgaWYgKG5hdGl2ZUtleXMpIHJldHVybiBuYXRpdmVLZXlzKG9iaik7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSBpZiAoXy5oYXMob2JqLCBrZXkpKSBrZXlzLnB1c2goa2V5KTtcbiAgICByZXR1cm4ga2V5cztcbiAgfTtcblxuICAvLyBSZXRyaWV2ZSB0aGUgdmFsdWVzIG9mIGFuIG9iamVjdCdzIHByb3BlcnRpZXMuXG4gIF8udmFsdWVzID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIGtleXMgPSBfLmtleXMob2JqKTtcbiAgICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gICAgdmFyIHZhbHVlcyA9IEFycmF5KGxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgdmFsdWVzW2ldID0gb2JqW2tleXNbaV1dO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWVzO1xuICB9O1xuXG4gIC8vIENvbnZlcnQgYW4gb2JqZWN0IGludG8gYSBsaXN0IG9mIGBba2V5LCB2YWx1ZV1gIHBhaXJzLlxuICBfLnBhaXJzID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIGtleXMgPSBfLmtleXMob2JqKTtcbiAgICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gICAgdmFyIHBhaXJzID0gQXJyYXkobGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBwYWlyc1tpXSA9IFtrZXlzW2ldLCBvYmpba2V5c1tpXV1dO1xuICAgIH1cbiAgICByZXR1cm4gcGFpcnM7XG4gIH07XG5cbiAgLy8gSW52ZXJ0IHRoZSBrZXlzIGFuZCB2YWx1ZXMgb2YgYW4gb2JqZWN0LiBUaGUgdmFsdWVzIG11c3QgYmUgc2VyaWFsaXphYmxlLlxuICBfLmludmVydCA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICB2YXIga2V5cyA9IF8ua2V5cyhvYmopO1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBrZXlzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICByZXN1bHRbb2JqW2tleXNbaV1dXSA9IGtleXNbaV07XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgLy8gUmV0dXJuIGEgc29ydGVkIGxpc3Qgb2YgdGhlIGZ1bmN0aW9uIG5hbWVzIGF2YWlsYWJsZSBvbiB0aGUgb2JqZWN0LlxuICAvLyBBbGlhc2VkIGFzIGBtZXRob2RzYFxuICBfLmZ1bmN0aW9ucyA9IF8ubWV0aG9kcyA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHZhciBuYW1lcyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgIGlmIChfLmlzRnVuY3Rpb24ob2JqW2tleV0pKSBuYW1lcy5wdXNoKGtleSk7XG4gICAgfVxuICAgIHJldHVybiBuYW1lcy5zb3J0KCk7XG4gIH07XG5cbiAgLy8gRXh0ZW5kIGEgZ2l2ZW4gb2JqZWN0IHdpdGggYWxsIHRoZSBwcm9wZXJ0aWVzIGluIHBhc3NlZC1pbiBvYmplY3QocykuXG4gIF8uZXh0ZW5kID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKCFfLmlzT2JqZWN0KG9iaikpIHJldHVybiBvYmo7XG4gICAgdmFyIHNvdXJjZSwgcHJvcDtcbiAgICBmb3IgKHZhciBpID0gMSwgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG4gICAgICBmb3IgKHByb3AgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwgcHJvcCkpIHtcbiAgICAgICAgICAgIG9ialtwcm9wXSA9IHNvdXJjZVtwcm9wXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqO1xuICB9O1xuXG4gIC8vIFJldHVybiBhIGNvcHkgb2YgdGhlIG9iamVjdCBvbmx5IGNvbnRhaW5pbmcgdGhlIHdoaXRlbGlzdGVkIHByb3BlcnRpZXMuXG4gIF8ucGljayA9IGZ1bmN0aW9uKG9iaiwgaXRlcmF0ZWUsIGNvbnRleHQpIHtcbiAgICB2YXIgcmVzdWx0ID0ge30sIGtleTtcbiAgICBpZiAob2JqID09IG51bGwpIHJldHVybiByZXN1bHQ7XG4gICAgaWYgKF8uaXNGdW5jdGlvbihpdGVyYXRlZSkpIHtcbiAgICAgIGl0ZXJhdGVlID0gY3JlYXRlQ2FsbGJhY2soaXRlcmF0ZWUsIGNvbnRleHQpO1xuICAgICAgZm9yIChrZXkgaW4gb2JqKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IG9ialtrZXldO1xuICAgICAgICBpZiAoaXRlcmF0ZWUodmFsdWUsIGtleSwgb2JqKSkgcmVzdWx0W2tleV0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGtleXMgPSBjb25jYXQuYXBwbHkoW10sIHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG4gICAgICBvYmogPSBuZXcgT2JqZWN0KG9iaik7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0ga2V5cy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgICBpZiAoa2V5IGluIG9iaikgcmVzdWx0W2tleV0gPSBvYmpba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAgLy8gUmV0dXJuIGEgY29weSBvZiB0aGUgb2JqZWN0IHdpdGhvdXQgdGhlIGJsYWNrbGlzdGVkIHByb3BlcnRpZXMuXG4gIF8ub21pdCA9IGZ1bmN0aW9uKG9iaiwgaXRlcmF0ZWUsIGNvbnRleHQpIHtcbiAgICBpZiAoXy5pc0Z1bmN0aW9uKGl0ZXJhdGVlKSkge1xuICAgICAgaXRlcmF0ZWUgPSBfLm5lZ2F0ZShpdGVyYXRlZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBrZXlzID0gXy5tYXAoY29uY2F0LmFwcGx5KFtdLCBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpLCBTdHJpbmcpO1xuICAgICAgaXRlcmF0ZWUgPSBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgICAgIHJldHVybiAhXy5jb250YWlucyhrZXlzLCBrZXkpO1xuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIF8ucGljayhvYmosIGl0ZXJhdGVlLCBjb250ZXh0KTtcbiAgfTtcblxuICAvLyBGaWxsIGluIGEgZ2l2ZW4gb2JqZWN0IHdpdGggZGVmYXVsdCBwcm9wZXJ0aWVzLlxuICBfLmRlZmF1bHRzID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKCFfLmlzT2JqZWN0KG9iaikpIHJldHVybiBvYmo7XG4gICAgZm9yICh2YXIgaSA9IDEsIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgIGZvciAodmFyIHByb3AgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChvYmpbcHJvcF0gPT09IHZvaWQgMCkgb2JqW3Byb3BdID0gc291cmNlW3Byb3BdO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqO1xuICB9O1xuXG4gIC8vIENyZWF0ZSBhIChzaGFsbG93LWNsb25lZCkgZHVwbGljYXRlIG9mIGFuIG9iamVjdC5cbiAgXy5jbG9uZSA9IGZ1bmN0aW9uKG9iaikge1xuICAgIGlmICghXy5pc09iamVjdChvYmopKSByZXR1cm4gb2JqO1xuICAgIHJldHVybiBfLmlzQXJyYXkob2JqKSA/IG9iai5zbGljZSgpIDogXy5leHRlbmQoe30sIG9iaik7XG4gIH07XG5cbiAgLy8gSW52b2tlcyBpbnRlcmNlcHRvciB3aXRoIHRoZSBvYmosIGFuZCB0aGVuIHJldHVybnMgb2JqLlxuICAvLyBUaGUgcHJpbWFyeSBwdXJwb3NlIG9mIHRoaXMgbWV0aG9kIGlzIHRvIFwidGFwIGludG9cIiBhIG1ldGhvZCBjaGFpbiwgaW5cbiAgLy8gb3JkZXIgdG8gcGVyZm9ybSBvcGVyYXRpb25zIG9uIGludGVybWVkaWF0ZSByZXN1bHRzIHdpdGhpbiB0aGUgY2hhaW4uXG4gIF8udGFwID0gZnVuY3Rpb24ob2JqLCBpbnRlcmNlcHRvcikge1xuICAgIGludGVyY2VwdG9yKG9iaik7XG4gICAgcmV0dXJuIG9iajtcbiAgfTtcblxuICAvLyBJbnRlcm5hbCByZWN1cnNpdmUgY29tcGFyaXNvbiBmdW5jdGlvbiBmb3IgYGlzRXF1YWxgLlxuICB2YXIgZXEgPSBmdW5jdGlvbihhLCBiLCBhU3RhY2ssIGJTdGFjaykge1xuICAgIC8vIElkZW50aWNhbCBvYmplY3RzIGFyZSBlcXVhbC4gYDAgPT09IC0wYCwgYnV0IHRoZXkgYXJlbid0IGlkZW50aWNhbC5cbiAgICAvLyBTZWUgdGhlIFtIYXJtb255IGBlZ2FsYCBwcm9wb3NhbF0oaHR0cDovL3dpa2kuZWNtYXNjcmlwdC5vcmcvZG9rdS5waHA/aWQ9aGFybW9ueTplZ2FsKS5cbiAgICBpZiAoYSA9PT0gYikgcmV0dXJuIGEgIT09IDAgfHwgMSAvIGEgPT09IDEgLyBiO1xuICAgIC8vIEEgc3RyaWN0IGNvbXBhcmlzb24gaXMgbmVjZXNzYXJ5IGJlY2F1c2UgYG51bGwgPT0gdW5kZWZpbmVkYC5cbiAgICBpZiAoYSA9PSBudWxsIHx8IGIgPT0gbnVsbCkgcmV0dXJuIGEgPT09IGI7XG4gICAgLy8gVW53cmFwIGFueSB3cmFwcGVkIG9iamVjdHMuXG4gICAgaWYgKGEgaW5zdGFuY2VvZiBfKSBhID0gYS5fd3JhcHBlZDtcbiAgICBpZiAoYiBpbnN0YW5jZW9mIF8pIGIgPSBiLl93cmFwcGVkO1xuICAgIC8vIENvbXBhcmUgYFtbQ2xhc3NdXWAgbmFtZXMuXG4gICAgdmFyIGNsYXNzTmFtZSA9IHRvU3RyaW5nLmNhbGwoYSk7XG4gICAgaWYgKGNsYXNzTmFtZSAhPT0gdG9TdHJpbmcuY2FsbChiKSkgcmV0dXJuIGZhbHNlO1xuICAgIHN3aXRjaCAoY2xhc3NOYW1lKSB7XG4gICAgICAvLyBTdHJpbmdzLCBudW1iZXJzLCByZWd1bGFyIGV4cHJlc3Npb25zLCBkYXRlcywgYW5kIGJvb2xlYW5zIGFyZSBjb21wYXJlZCBieSB2YWx1ZS5cbiAgICAgIGNhc2UgJ1tvYmplY3QgUmVnRXhwXSc6XG4gICAgICAvLyBSZWdFeHBzIGFyZSBjb2VyY2VkIHRvIHN0cmluZ3MgZm9yIGNvbXBhcmlzb24gKE5vdGU6ICcnICsgL2EvaSA9PT0gJy9hL2knKVxuICAgICAgY2FzZSAnW29iamVjdCBTdHJpbmddJzpcbiAgICAgICAgLy8gUHJpbWl0aXZlcyBhbmQgdGhlaXIgY29ycmVzcG9uZGluZyBvYmplY3Qgd3JhcHBlcnMgYXJlIGVxdWl2YWxlbnQ7IHRodXMsIGBcIjVcImAgaXNcbiAgICAgICAgLy8gZXF1aXZhbGVudCB0byBgbmV3IFN0cmluZyhcIjVcIilgLlxuICAgICAgICByZXR1cm4gJycgKyBhID09PSAnJyArIGI7XG4gICAgICBjYXNlICdbb2JqZWN0IE51bWJlcl0nOlxuICAgICAgICAvLyBgTmFOYHMgYXJlIGVxdWl2YWxlbnQsIGJ1dCBub24tcmVmbGV4aXZlLlxuICAgICAgICAvLyBPYmplY3QoTmFOKSBpcyBlcXVpdmFsZW50IHRvIE5hTlxuICAgICAgICBpZiAoK2EgIT09ICthKSByZXR1cm4gK2IgIT09ICtiO1xuICAgICAgICAvLyBBbiBgZWdhbGAgY29tcGFyaXNvbiBpcyBwZXJmb3JtZWQgZm9yIG90aGVyIG51bWVyaWMgdmFsdWVzLlxuICAgICAgICByZXR1cm4gK2EgPT09IDAgPyAxIC8gK2EgPT09IDEgLyBiIDogK2EgPT09ICtiO1xuICAgICAgY2FzZSAnW29iamVjdCBEYXRlXSc6XG4gICAgICBjYXNlICdbb2JqZWN0IEJvb2xlYW5dJzpcbiAgICAgICAgLy8gQ29lcmNlIGRhdGVzIGFuZCBib29sZWFucyB0byBudW1lcmljIHByaW1pdGl2ZSB2YWx1ZXMuIERhdGVzIGFyZSBjb21wYXJlZCBieSB0aGVpclxuICAgICAgICAvLyBtaWxsaXNlY29uZCByZXByZXNlbnRhdGlvbnMuIE5vdGUgdGhhdCBpbnZhbGlkIGRhdGVzIHdpdGggbWlsbGlzZWNvbmQgcmVwcmVzZW50YXRpb25zXG4gICAgICAgIC8vIG9mIGBOYU5gIGFyZSBub3QgZXF1aXZhbGVudC5cbiAgICAgICAgcmV0dXJuICthID09PSArYjtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBhICE9ICdvYmplY3QnIHx8IHR5cGVvZiBiICE9ICdvYmplY3QnKSByZXR1cm4gZmFsc2U7XG4gICAgLy8gQXNzdW1lIGVxdWFsaXR5IGZvciBjeWNsaWMgc3RydWN0dXJlcy4gVGhlIGFsZ29yaXRobSBmb3IgZGV0ZWN0aW5nIGN5Y2xpY1xuICAgIC8vIHN0cnVjdHVyZXMgaXMgYWRhcHRlZCBmcm9tIEVTIDUuMSBzZWN0aW9uIDE1LjEyLjMsIGFic3RyYWN0IG9wZXJhdGlvbiBgSk9gLlxuICAgIHZhciBsZW5ndGggPSBhU3RhY2subGVuZ3RoO1xuICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgLy8gTGluZWFyIHNlYXJjaC4gUGVyZm9ybWFuY2UgaXMgaW52ZXJzZWx5IHByb3BvcnRpb25hbCB0byB0aGUgbnVtYmVyIG9mXG4gICAgICAvLyB1bmlxdWUgbmVzdGVkIHN0cnVjdHVyZXMuXG4gICAgICBpZiAoYVN0YWNrW2xlbmd0aF0gPT09IGEpIHJldHVybiBiU3RhY2tbbGVuZ3RoXSA9PT0gYjtcbiAgICB9XG4gICAgLy8gT2JqZWN0cyB3aXRoIGRpZmZlcmVudCBjb25zdHJ1Y3RvcnMgYXJlIG5vdCBlcXVpdmFsZW50LCBidXQgYE9iamVjdGBzXG4gICAgLy8gZnJvbSBkaWZmZXJlbnQgZnJhbWVzIGFyZS5cbiAgICB2YXIgYUN0b3IgPSBhLmNvbnN0cnVjdG9yLCBiQ3RvciA9IGIuY29uc3RydWN0b3I7XG4gICAgaWYgKFxuICAgICAgYUN0b3IgIT09IGJDdG9yICYmXG4gICAgICAvLyBIYW5kbGUgT2JqZWN0LmNyZWF0ZSh4KSBjYXNlc1xuICAgICAgJ2NvbnN0cnVjdG9yJyBpbiBhICYmICdjb25zdHJ1Y3RvcicgaW4gYiAmJlxuICAgICAgIShfLmlzRnVuY3Rpb24oYUN0b3IpICYmIGFDdG9yIGluc3RhbmNlb2YgYUN0b3IgJiZcbiAgICAgICAgXy5pc0Z1bmN0aW9uKGJDdG9yKSAmJiBiQ3RvciBpbnN0YW5jZW9mIGJDdG9yKVxuICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBBZGQgdGhlIGZpcnN0IG9iamVjdCB0byB0aGUgc3RhY2sgb2YgdHJhdmVyc2VkIG9iamVjdHMuXG4gICAgYVN0YWNrLnB1c2goYSk7XG4gICAgYlN0YWNrLnB1c2goYik7XG4gICAgdmFyIHNpemUsIHJlc3VsdDtcbiAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIG9iamVjdHMgYW5kIGFycmF5cy5cbiAgICBpZiAoY2xhc3NOYW1lID09PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgICAvLyBDb21wYXJlIGFycmF5IGxlbmd0aHMgdG8gZGV0ZXJtaW5lIGlmIGEgZGVlcCBjb21wYXJpc29uIGlzIG5lY2Vzc2FyeS5cbiAgICAgIHNpemUgPSBhLmxlbmd0aDtcbiAgICAgIHJlc3VsdCA9IHNpemUgPT09IGIubGVuZ3RoO1xuICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAvLyBEZWVwIGNvbXBhcmUgdGhlIGNvbnRlbnRzLCBpZ25vcmluZyBub24tbnVtZXJpYyBwcm9wZXJ0aWVzLlxuICAgICAgICB3aGlsZSAoc2l6ZS0tKSB7XG4gICAgICAgICAgaWYgKCEocmVzdWx0ID0gZXEoYVtzaXplXSwgYltzaXplXSwgYVN0YWNrLCBiU3RhY2spKSkgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gRGVlcCBjb21wYXJlIG9iamVjdHMuXG4gICAgICB2YXIga2V5cyA9IF8ua2V5cyhhKSwga2V5O1xuICAgICAgc2l6ZSA9IGtleXMubGVuZ3RoO1xuICAgICAgLy8gRW5zdXJlIHRoYXQgYm90aCBvYmplY3RzIGNvbnRhaW4gdGhlIHNhbWUgbnVtYmVyIG9mIHByb3BlcnRpZXMgYmVmb3JlIGNvbXBhcmluZyBkZWVwIGVxdWFsaXR5LlxuICAgICAgcmVzdWx0ID0gXy5rZXlzKGIpLmxlbmd0aCA9PT0gc2l6ZTtcbiAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgd2hpbGUgKHNpemUtLSkge1xuICAgICAgICAgIC8vIERlZXAgY29tcGFyZSBlYWNoIG1lbWJlclxuICAgICAgICAgIGtleSA9IGtleXNbc2l6ZV07XG4gICAgICAgICAgaWYgKCEocmVzdWx0ID0gXy5oYXMoYiwga2V5KSAmJiBlcShhW2tleV0sIGJba2V5XSwgYVN0YWNrLCBiU3RhY2spKSkgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gUmVtb3ZlIHRoZSBmaXJzdCBvYmplY3QgZnJvbSB0aGUgc3RhY2sgb2YgdHJhdmVyc2VkIG9iamVjdHMuXG4gICAgYVN0YWNrLnBvcCgpO1xuICAgIGJTdGFjay5wb3AoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8vIFBlcmZvcm0gYSBkZWVwIGNvbXBhcmlzb24gdG8gY2hlY2sgaWYgdHdvIG9iamVjdHMgYXJlIGVxdWFsLlxuICBfLmlzRXF1YWwgPSBmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIGVxKGEsIGIsIFtdLCBbXSk7XG4gIH07XG5cbiAgLy8gSXMgYSBnaXZlbiBhcnJheSwgc3RyaW5nLCBvciBvYmplY3QgZW1wdHk/XG4gIC8vIEFuIFwiZW1wdHlcIiBvYmplY3QgaGFzIG5vIGVudW1lcmFibGUgb3duLXByb3BlcnRpZXMuXG4gIF8uaXNFbXB0eSA9IGZ1bmN0aW9uKG9iaikge1xuICAgIGlmIChvYmogPT0gbnVsbCkgcmV0dXJuIHRydWU7XG4gICAgaWYgKF8uaXNBcnJheShvYmopIHx8IF8uaXNTdHJpbmcob2JqKSB8fCBfLmlzQXJndW1lbnRzKG9iaikpIHJldHVybiBvYmoubGVuZ3RoID09PSAwO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIGlmIChfLmhhcyhvYmosIGtleSkpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICAvLyBJcyBhIGdpdmVuIHZhbHVlIGEgRE9NIGVsZW1lbnQ/XG4gIF8uaXNFbGVtZW50ID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuICEhKG9iaiAmJiBvYmoubm9kZVR5cGUgPT09IDEpO1xuICB9O1xuXG4gIC8vIElzIGEgZ2l2ZW4gdmFsdWUgYW4gYXJyYXk/XG4gIC8vIERlbGVnYXRlcyB0byBFQ01BNSdzIG5hdGl2ZSBBcnJheS5pc0FycmF5XG4gIF8uaXNBcnJheSA9IG5hdGl2ZUlzQXJyYXkgfHwgZnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuIHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgfTtcblxuICAvLyBJcyBhIGdpdmVuIHZhcmlhYmxlIGFuIG9iamVjdD9cbiAgXy5pc09iamVjdCA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHZhciB0eXBlID0gdHlwZW9mIG9iajtcbiAgICByZXR1cm4gdHlwZSA9PT0gJ2Z1bmN0aW9uJyB8fCB0eXBlID09PSAnb2JqZWN0JyAmJiAhIW9iajtcbiAgfTtcblxuICAvLyBBZGQgc29tZSBpc1R5cGUgbWV0aG9kczogaXNBcmd1bWVudHMsIGlzRnVuY3Rpb24sIGlzU3RyaW5nLCBpc051bWJlciwgaXNEYXRlLCBpc1JlZ0V4cC5cbiAgXy5lYWNoKFsnQXJndW1lbnRzJywgJ0Z1bmN0aW9uJywgJ1N0cmluZycsICdOdW1iZXInLCAnRGF0ZScsICdSZWdFeHAnXSwgZnVuY3Rpb24obmFtZSkge1xuICAgIF9bJ2lzJyArIG5hbWVdID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gdG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCAnICsgbmFtZSArICddJztcbiAgICB9O1xuICB9KTtcblxuICAvLyBEZWZpbmUgYSBmYWxsYmFjayB2ZXJzaW9uIG9mIHRoZSBtZXRob2QgaW4gYnJvd3NlcnMgKGFoZW0sIElFKSwgd2hlcmVcbiAgLy8gdGhlcmUgaXNuJ3QgYW55IGluc3BlY3RhYmxlIFwiQXJndW1lbnRzXCIgdHlwZS5cbiAgaWYgKCFfLmlzQXJndW1lbnRzKGFyZ3VtZW50cykpIHtcbiAgICBfLmlzQXJndW1lbnRzID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gXy5oYXMob2JqLCAnY2FsbGVlJyk7XG4gICAgfTtcbiAgfVxuXG4gIC8vIE9wdGltaXplIGBpc0Z1bmN0aW9uYCBpZiBhcHByb3ByaWF0ZS4gV29yayBhcm91bmQgYW4gSUUgMTEgYnVnLlxuICBpZiAodHlwZW9mIC8uLyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIF8uaXNGdW5jdGlvbiA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIHR5cGVvZiBvYmogPT0gJ2Z1bmN0aW9uJyB8fCBmYWxzZTtcbiAgICB9O1xuICB9XG5cbiAgLy8gSXMgYSBnaXZlbiBvYmplY3QgYSBmaW5pdGUgbnVtYmVyP1xuICBfLmlzRmluaXRlID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuIGlzRmluaXRlKG9iaikgJiYgIWlzTmFOKHBhcnNlRmxvYXQob2JqKSk7XG4gIH07XG5cbiAgLy8gSXMgdGhlIGdpdmVuIHZhbHVlIGBOYU5gPyAoTmFOIGlzIHRoZSBvbmx5IG51bWJlciB3aGljaCBkb2VzIG5vdCBlcXVhbCBpdHNlbGYpLlxuICBfLmlzTmFOID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuIF8uaXNOdW1iZXIob2JqKSAmJiBvYmogIT09ICtvYmo7XG4gIH07XG5cbiAgLy8gSXMgYSBnaXZlbiB2YWx1ZSBhIGJvb2xlYW4/XG4gIF8uaXNCb29sZWFuID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuIG9iaiA9PT0gdHJ1ZSB8fCBvYmogPT09IGZhbHNlIHx8IHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgQm9vbGVhbl0nO1xuICB9O1xuXG4gIC8vIElzIGEgZ2l2ZW4gdmFsdWUgZXF1YWwgdG8gbnVsbD9cbiAgXy5pc051bGwgPSBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gb2JqID09PSBudWxsO1xuICB9O1xuXG4gIC8vIElzIGEgZ2l2ZW4gdmFyaWFibGUgdW5kZWZpbmVkP1xuICBfLmlzVW5kZWZpbmVkID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuIG9iaiA9PT0gdm9pZCAwO1xuICB9O1xuXG4gIC8vIFNob3J0Y3V0IGZ1bmN0aW9uIGZvciBjaGVja2luZyBpZiBhbiBvYmplY3QgaGFzIGEgZ2l2ZW4gcHJvcGVydHkgZGlyZWN0bHlcbiAgLy8gb24gaXRzZWxmIChpbiBvdGhlciB3b3Jkcywgbm90IG9uIGEgcHJvdG90eXBlKS5cbiAgXy5oYXMgPSBmdW5jdGlvbihvYmosIGtleSkge1xuICAgIHJldHVybiBvYmogIT0gbnVsbCAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KTtcbiAgfTtcblxuICAvLyBVdGlsaXR5IEZ1bmN0aW9uc1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIFJ1biBVbmRlcnNjb3JlLmpzIGluICpub0NvbmZsaWN0KiBtb2RlLCByZXR1cm5pbmcgdGhlIGBfYCB2YXJpYWJsZSB0byBpdHNcbiAgLy8gcHJldmlvdXMgb3duZXIuIFJldHVybnMgYSByZWZlcmVuY2UgdG8gdGhlIFVuZGVyc2NvcmUgb2JqZWN0LlxuICBfLm5vQ29uZmxpY3QgPSBmdW5jdGlvbigpIHtcbiAgICByb290Ll8gPSBwcmV2aW91c1VuZGVyc2NvcmU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLy8gS2VlcCB0aGUgaWRlbnRpdHkgZnVuY3Rpb24gYXJvdW5kIGZvciBkZWZhdWx0IGl0ZXJhdGVlcy5cbiAgXy5pZGVudGl0eSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9O1xuXG4gIF8uY29uc3RhbnQgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9O1xuICB9O1xuXG4gIF8ubm9vcCA9IGZ1bmN0aW9uKCl7fTtcblxuICBfLnByb3BlcnR5ID0gZnVuY3Rpb24oa2V5KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9ialtrZXldO1xuICAgIH07XG4gIH07XG5cbiAgLy8gUmV0dXJucyBhIHByZWRpY2F0ZSBmb3IgY2hlY2tpbmcgd2hldGhlciBhbiBvYmplY3QgaGFzIGEgZ2l2ZW4gc2V0IG9mIGBrZXk6dmFsdWVgIHBhaXJzLlxuICBfLm1hdGNoZXMgPSBmdW5jdGlvbihhdHRycykge1xuICAgIHZhciBwYWlycyA9IF8ucGFpcnMoYXR0cnMpLCBsZW5ndGggPSBwYWlycy5sZW5ndGg7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKG9iaikge1xuICAgICAgaWYgKG9iaiA9PSBudWxsKSByZXR1cm4gIWxlbmd0aDtcbiAgICAgIG9iaiA9IG5ldyBPYmplY3Qob2JqKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHBhaXIgPSBwYWlyc1tpXSwga2V5ID0gcGFpclswXTtcbiAgICAgICAgaWYgKHBhaXJbMV0gIT09IG9ialtrZXldIHx8ICEoa2V5IGluIG9iaikpIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gIH07XG5cbiAgLy8gUnVuIGEgZnVuY3Rpb24gKipuKiogdGltZXMuXG4gIF8udGltZXMgPSBmdW5jdGlvbihuLCBpdGVyYXRlZSwgY29udGV4dCkge1xuICAgIHZhciBhY2N1bSA9IEFycmF5KE1hdGgubWF4KDAsIG4pKTtcbiAgICBpdGVyYXRlZSA9IGNyZWF0ZUNhbGxiYWNrKGl0ZXJhdGVlLCBjb250ZXh0LCAxKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG47IGkrKykgYWNjdW1baV0gPSBpdGVyYXRlZShpKTtcbiAgICByZXR1cm4gYWNjdW07XG4gIH07XG5cbiAgLy8gUmV0dXJuIGEgcmFuZG9tIGludGVnZXIgYmV0d2VlbiBtaW4gYW5kIG1heCAoaW5jbHVzaXZlKS5cbiAgXy5yYW5kb20gPSBmdW5jdGlvbihtaW4sIG1heCkge1xuICAgIGlmIChtYXggPT0gbnVsbCkge1xuICAgICAgbWF4ID0gbWluO1xuICAgICAgbWluID0gMDtcbiAgICB9XG4gICAgcmV0dXJuIG1pbiArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSk7XG4gIH07XG5cbiAgLy8gQSAocG9zc2libHkgZmFzdGVyKSB3YXkgdG8gZ2V0IHRoZSBjdXJyZW50IHRpbWVzdGFtcCBhcyBhbiBpbnRlZ2VyLlxuICBfLm5vdyA9IERhdGUubm93IHx8IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgfTtcblxuICAgLy8gTGlzdCBvZiBIVE1MIGVudGl0aWVzIGZvciBlc2NhcGluZy5cbiAgdmFyIGVzY2FwZU1hcCA9IHtcbiAgICAnJic6ICcmYW1wOycsXG4gICAgJzwnOiAnJmx0OycsXG4gICAgJz4nOiAnJmd0OycsXG4gICAgJ1wiJzogJyZxdW90OycsXG4gICAgXCInXCI6ICcmI3gyNzsnLFxuICAgICdgJzogJyYjeDYwOydcbiAgfTtcbiAgdmFyIHVuZXNjYXBlTWFwID0gXy5pbnZlcnQoZXNjYXBlTWFwKTtcblxuICAvLyBGdW5jdGlvbnMgZm9yIGVzY2FwaW5nIGFuZCB1bmVzY2FwaW5nIHN0cmluZ3MgdG8vZnJvbSBIVE1MIGludGVycG9sYXRpb24uXG4gIHZhciBjcmVhdGVFc2NhcGVyID0gZnVuY3Rpb24obWFwKSB7XG4gICAgdmFyIGVzY2FwZXIgPSBmdW5jdGlvbihtYXRjaCkge1xuICAgICAgcmV0dXJuIG1hcFttYXRjaF07XG4gICAgfTtcbiAgICAvLyBSZWdleGVzIGZvciBpZGVudGlmeWluZyBhIGtleSB0aGF0IG5lZWRzIHRvIGJlIGVzY2FwZWRcbiAgICB2YXIgc291cmNlID0gJyg/OicgKyBfLmtleXMobWFwKS5qb2luKCd8JykgKyAnKSc7XG4gICAgdmFyIHRlc3RSZWdleHAgPSBSZWdFeHAoc291cmNlKTtcbiAgICB2YXIgcmVwbGFjZVJlZ2V4cCA9IFJlZ0V4cChzb3VyY2UsICdnJyk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHN0cmluZykge1xuICAgICAgc3RyaW5nID0gc3RyaW5nID09IG51bGwgPyAnJyA6ICcnICsgc3RyaW5nO1xuICAgICAgcmV0dXJuIHRlc3RSZWdleHAudGVzdChzdHJpbmcpID8gc3RyaW5nLnJlcGxhY2UocmVwbGFjZVJlZ2V4cCwgZXNjYXBlcikgOiBzdHJpbmc7XG4gICAgfTtcbiAgfTtcbiAgXy5lc2NhcGUgPSBjcmVhdGVFc2NhcGVyKGVzY2FwZU1hcCk7XG4gIF8udW5lc2NhcGUgPSBjcmVhdGVFc2NhcGVyKHVuZXNjYXBlTWFwKTtcblxuICAvLyBJZiB0aGUgdmFsdWUgb2YgdGhlIG5hbWVkIGBwcm9wZXJ0eWAgaXMgYSBmdW5jdGlvbiB0aGVuIGludm9rZSBpdCB3aXRoIHRoZVxuICAvLyBgb2JqZWN0YCBhcyBjb250ZXh0OyBvdGhlcndpc2UsIHJldHVybiBpdC5cbiAgXy5yZXN1bHQgPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7XG4gICAgaWYgKG9iamVjdCA9PSBudWxsKSByZXR1cm4gdm9pZCAwO1xuICAgIHZhciB2YWx1ZSA9IG9iamVjdFtwcm9wZXJ0eV07XG4gICAgcmV0dXJuIF8uaXNGdW5jdGlvbih2YWx1ZSkgPyBvYmplY3RbcHJvcGVydHldKCkgOiB2YWx1ZTtcbiAgfTtcblxuICAvLyBHZW5lcmF0ZSBhIHVuaXF1ZSBpbnRlZ2VyIGlkICh1bmlxdWUgd2l0aGluIHRoZSBlbnRpcmUgY2xpZW50IHNlc3Npb24pLlxuICAvLyBVc2VmdWwgZm9yIHRlbXBvcmFyeSBET00gaWRzLlxuICB2YXIgaWRDb3VudGVyID0gMDtcbiAgXy51bmlxdWVJZCA9IGZ1bmN0aW9uKHByZWZpeCkge1xuICAgIHZhciBpZCA9ICsraWRDb3VudGVyICsgJyc7XG4gICAgcmV0dXJuIHByZWZpeCA/IHByZWZpeCArIGlkIDogaWQ7XG4gIH07XG5cbiAgLy8gQnkgZGVmYXVsdCwgVW5kZXJzY29yZSB1c2VzIEVSQi1zdHlsZSB0ZW1wbGF0ZSBkZWxpbWl0ZXJzLCBjaGFuZ2UgdGhlXG4gIC8vIGZvbGxvd2luZyB0ZW1wbGF0ZSBzZXR0aW5ncyB0byB1c2UgYWx0ZXJuYXRpdmUgZGVsaW1pdGVycy5cbiAgXy50ZW1wbGF0ZVNldHRpbmdzID0ge1xuICAgIGV2YWx1YXRlICAgIDogLzwlKFtcXHNcXFNdKz8pJT4vZyxcbiAgICBpbnRlcnBvbGF0ZSA6IC88JT0oW1xcc1xcU10rPyklPi9nLFxuICAgIGVzY2FwZSAgICAgIDogLzwlLShbXFxzXFxTXSs/KSU+L2dcbiAgfTtcblxuICAvLyBXaGVuIGN1c3RvbWl6aW5nIGB0ZW1wbGF0ZVNldHRpbmdzYCwgaWYgeW91IGRvbid0IHdhbnQgdG8gZGVmaW5lIGFuXG4gIC8vIGludGVycG9sYXRpb24sIGV2YWx1YXRpb24gb3IgZXNjYXBpbmcgcmVnZXgsIHdlIG5lZWQgb25lIHRoYXQgaXNcbiAgLy8gZ3VhcmFudGVlZCBub3QgdG8gbWF0Y2guXG4gIHZhciBub01hdGNoID0gLyguKV4vO1xuXG4gIC8vIENlcnRhaW4gY2hhcmFjdGVycyBuZWVkIHRvIGJlIGVzY2FwZWQgc28gdGhhdCB0aGV5IGNhbiBiZSBwdXQgaW50byBhXG4gIC8vIHN0cmluZyBsaXRlcmFsLlxuICB2YXIgZXNjYXBlcyA9IHtcbiAgICBcIidcIjogICAgICBcIidcIixcbiAgICAnXFxcXCc6ICAgICAnXFxcXCcsXG4gICAgJ1xccic6ICAgICAncicsXG4gICAgJ1xcbic6ICAgICAnbicsXG4gICAgJ1xcdTIwMjgnOiAndTIwMjgnLFxuICAgICdcXHUyMDI5JzogJ3UyMDI5J1xuICB9O1xuXG4gIHZhciBlc2NhcGVyID0gL1xcXFx8J3xcXHJ8XFxufFxcdTIwMjh8XFx1MjAyOS9nO1xuXG4gIHZhciBlc2NhcGVDaGFyID0gZnVuY3Rpb24obWF0Y2gpIHtcbiAgICByZXR1cm4gJ1xcXFwnICsgZXNjYXBlc1ttYXRjaF07XG4gIH07XG5cbiAgLy8gSmF2YVNjcmlwdCBtaWNyby10ZW1wbGF0aW5nLCBzaW1pbGFyIHRvIEpvaG4gUmVzaWcncyBpbXBsZW1lbnRhdGlvbi5cbiAgLy8gVW5kZXJzY29yZSB0ZW1wbGF0aW5nIGhhbmRsZXMgYXJiaXRyYXJ5IGRlbGltaXRlcnMsIHByZXNlcnZlcyB3aGl0ZXNwYWNlLFxuICAvLyBhbmQgY29ycmVjdGx5IGVzY2FwZXMgcXVvdGVzIHdpdGhpbiBpbnRlcnBvbGF0ZWQgY29kZS5cbiAgLy8gTkI6IGBvbGRTZXR0aW5nc2Agb25seSBleGlzdHMgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5LlxuICBfLnRlbXBsYXRlID0gZnVuY3Rpb24odGV4dCwgc2V0dGluZ3MsIG9sZFNldHRpbmdzKSB7XG4gICAgaWYgKCFzZXR0aW5ncyAmJiBvbGRTZXR0aW5ncykgc2V0dGluZ3MgPSBvbGRTZXR0aW5ncztcbiAgICBzZXR0aW5ncyA9IF8uZGVmYXVsdHMoe30sIHNldHRpbmdzLCBfLnRlbXBsYXRlU2V0dGluZ3MpO1xuXG4gICAgLy8gQ29tYmluZSBkZWxpbWl0ZXJzIGludG8gb25lIHJlZ3VsYXIgZXhwcmVzc2lvbiB2aWEgYWx0ZXJuYXRpb24uXG4gICAgdmFyIG1hdGNoZXIgPSBSZWdFeHAoW1xuICAgICAgKHNldHRpbmdzLmVzY2FwZSB8fCBub01hdGNoKS5zb3VyY2UsXG4gICAgICAoc2V0dGluZ3MuaW50ZXJwb2xhdGUgfHwgbm9NYXRjaCkuc291cmNlLFxuICAgICAgKHNldHRpbmdzLmV2YWx1YXRlIHx8IG5vTWF0Y2gpLnNvdXJjZVxuICAgIF0uam9pbignfCcpICsgJ3wkJywgJ2cnKTtcblxuICAgIC8vIENvbXBpbGUgdGhlIHRlbXBsYXRlIHNvdXJjZSwgZXNjYXBpbmcgc3RyaW5nIGxpdGVyYWxzIGFwcHJvcHJpYXRlbHkuXG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICB2YXIgc291cmNlID0gXCJfX3ArPSdcIjtcbiAgICB0ZXh0LnJlcGxhY2UobWF0Y2hlciwgZnVuY3Rpb24obWF0Y2gsIGVzY2FwZSwgaW50ZXJwb2xhdGUsIGV2YWx1YXRlLCBvZmZzZXQpIHtcbiAgICAgIHNvdXJjZSArPSB0ZXh0LnNsaWNlKGluZGV4LCBvZmZzZXQpLnJlcGxhY2UoZXNjYXBlciwgZXNjYXBlQ2hhcik7XG4gICAgICBpbmRleCA9IG9mZnNldCArIG1hdGNoLmxlbmd0aDtcblxuICAgICAgaWYgKGVzY2FwZSkge1xuICAgICAgICBzb3VyY2UgKz0gXCInK1xcbigoX190PShcIiArIGVzY2FwZSArIFwiKSk9PW51bGw/Jyc6Xy5lc2NhcGUoX190KSkrXFxuJ1wiO1xuICAgICAgfSBlbHNlIGlmIChpbnRlcnBvbGF0ZSkge1xuICAgICAgICBzb3VyY2UgKz0gXCInK1xcbigoX190PShcIiArIGludGVycG9sYXRlICsgXCIpKT09bnVsbD8nJzpfX3QpK1xcbidcIjtcbiAgICAgIH0gZWxzZSBpZiAoZXZhbHVhdGUpIHtcbiAgICAgICAgc291cmNlICs9IFwiJztcXG5cIiArIGV2YWx1YXRlICsgXCJcXG5fX3ArPSdcIjtcbiAgICAgIH1cblxuICAgICAgLy8gQWRvYmUgVk1zIG5lZWQgdGhlIG1hdGNoIHJldHVybmVkIHRvIHByb2R1Y2UgdGhlIGNvcnJlY3Qgb2ZmZXN0LlxuICAgICAgcmV0dXJuIG1hdGNoO1xuICAgIH0pO1xuICAgIHNvdXJjZSArPSBcIic7XFxuXCI7XG5cbiAgICAvLyBJZiBhIHZhcmlhYmxlIGlzIG5vdCBzcGVjaWZpZWQsIHBsYWNlIGRhdGEgdmFsdWVzIGluIGxvY2FsIHNjb3BlLlxuICAgIGlmICghc2V0dGluZ3MudmFyaWFibGUpIHNvdXJjZSA9ICd3aXRoKG9ianx8e30pe1xcbicgKyBzb3VyY2UgKyAnfVxcbic7XG5cbiAgICBzb3VyY2UgPSBcInZhciBfX3QsX19wPScnLF9faj1BcnJheS5wcm90b3R5cGUuam9pbixcIiArXG4gICAgICBcInByaW50PWZ1bmN0aW9uKCl7X19wKz1fX2ouY2FsbChhcmd1bWVudHMsJycpO307XFxuXCIgK1xuICAgICAgc291cmNlICsgJ3JldHVybiBfX3A7XFxuJztcblxuICAgIHRyeSB7XG4gICAgICB2YXIgcmVuZGVyID0gbmV3IEZ1bmN0aW9uKHNldHRpbmdzLnZhcmlhYmxlIHx8ICdvYmonLCAnXycsIHNvdXJjZSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgZS5zb3VyY2UgPSBzb3VyY2U7XG4gICAgICB0aHJvdyBlO1xuICAgIH1cblxuICAgIHZhciB0ZW1wbGF0ZSA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIHJldHVybiByZW5kZXIuY2FsbCh0aGlzLCBkYXRhLCBfKTtcbiAgICB9O1xuXG4gICAgLy8gUHJvdmlkZSB0aGUgY29tcGlsZWQgc291cmNlIGFzIGEgY29udmVuaWVuY2UgZm9yIHByZWNvbXBpbGF0aW9uLlxuICAgIHZhciBhcmd1bWVudCA9IHNldHRpbmdzLnZhcmlhYmxlIHx8ICdvYmonO1xuICAgIHRlbXBsYXRlLnNvdXJjZSA9ICdmdW5jdGlvbignICsgYXJndW1lbnQgKyAnKXtcXG4nICsgc291cmNlICsgJ30nO1xuXG4gICAgcmV0dXJuIHRlbXBsYXRlO1xuICB9O1xuXG4gIC8vIEFkZCBhIFwiY2hhaW5cIiBmdW5jdGlvbi4gU3RhcnQgY2hhaW5pbmcgYSB3cmFwcGVkIFVuZGVyc2NvcmUgb2JqZWN0LlxuICBfLmNoYWluID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIGluc3RhbmNlID0gXyhvYmopO1xuICAgIGluc3RhbmNlLl9jaGFpbiA9IHRydWU7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9O1xuXG4gIC8vIE9PUFxuICAvLyAtLS0tLS0tLS0tLS0tLS1cbiAgLy8gSWYgVW5kZXJzY29yZSBpcyBjYWxsZWQgYXMgYSBmdW5jdGlvbiwgaXQgcmV0dXJucyBhIHdyYXBwZWQgb2JqZWN0IHRoYXRcbiAgLy8gY2FuIGJlIHVzZWQgT08tc3R5bGUuIFRoaXMgd3JhcHBlciBob2xkcyBhbHRlcmVkIHZlcnNpb25zIG9mIGFsbCB0aGVcbiAgLy8gdW5kZXJzY29yZSBmdW5jdGlvbnMuIFdyYXBwZWQgb2JqZWN0cyBtYXkgYmUgY2hhaW5lZC5cblxuICAvLyBIZWxwZXIgZnVuY3Rpb24gdG8gY29udGludWUgY2hhaW5pbmcgaW50ZXJtZWRpYXRlIHJlc3VsdHMuXG4gIHZhciByZXN1bHQgPSBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gdGhpcy5fY2hhaW4gPyBfKG9iaikuY2hhaW4oKSA6IG9iajtcbiAgfTtcblxuICAvLyBBZGQgeW91ciBvd24gY3VzdG9tIGZ1bmN0aW9ucyB0byB0aGUgVW5kZXJzY29yZSBvYmplY3QuXG4gIF8ubWl4aW4gPSBmdW5jdGlvbihvYmopIHtcbiAgICBfLmVhY2goXy5mdW5jdGlvbnMob2JqKSwgZnVuY3Rpb24obmFtZSkge1xuICAgICAgdmFyIGZ1bmMgPSBfW25hbWVdID0gb2JqW25hbWVdO1xuICAgICAgXy5wcm90b3R5cGVbbmFtZV0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbdGhpcy5fd3JhcHBlZF07XG4gICAgICAgIHB1c2guYXBwbHkoYXJncywgYXJndW1lbnRzKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdC5jYWxsKHRoaXMsIGZ1bmMuYXBwbHkoXywgYXJncykpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfTtcblxuICAvLyBBZGQgYWxsIG9mIHRoZSBVbmRlcnNjb3JlIGZ1bmN0aW9ucyB0byB0aGUgd3JhcHBlciBvYmplY3QuXG4gIF8ubWl4aW4oXyk7XG5cbiAgLy8gQWRkIGFsbCBtdXRhdG9yIEFycmF5IGZ1bmN0aW9ucyB0byB0aGUgd3JhcHBlci5cbiAgXy5lYWNoKFsncG9wJywgJ3B1c2gnLCAncmV2ZXJzZScsICdzaGlmdCcsICdzb3J0JywgJ3NwbGljZScsICd1bnNoaWZ0J10sIGZ1bmN0aW9uKG5hbWUpIHtcbiAgICB2YXIgbWV0aG9kID0gQXJyYXlQcm90b1tuYW1lXTtcbiAgICBfLnByb3RvdHlwZVtuYW1lXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIG9iaiA9IHRoaXMuX3dyYXBwZWQ7XG4gICAgICBtZXRob2QuYXBwbHkob2JqLCBhcmd1bWVudHMpO1xuICAgICAgaWYgKChuYW1lID09PSAnc2hpZnQnIHx8IG5hbWUgPT09ICdzcGxpY2UnKSAmJiBvYmoubGVuZ3RoID09PSAwKSBkZWxldGUgb2JqWzBdO1xuICAgICAgcmV0dXJuIHJlc3VsdC5jYWxsKHRoaXMsIG9iaik7XG4gICAgfTtcbiAgfSk7XG5cbiAgLy8gQWRkIGFsbCBhY2Nlc3NvciBBcnJheSBmdW5jdGlvbnMgdG8gdGhlIHdyYXBwZXIuXG4gIF8uZWFjaChbJ2NvbmNhdCcsICdqb2luJywgJ3NsaWNlJ10sIGZ1bmN0aW9uKG5hbWUpIHtcbiAgICB2YXIgbWV0aG9kID0gQXJyYXlQcm90b1tuYW1lXTtcbiAgICBfLnByb3RvdHlwZVtuYW1lXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHJlc3VsdC5jYWxsKHRoaXMsIG1ldGhvZC5hcHBseSh0aGlzLl93cmFwcGVkLCBhcmd1bWVudHMpKTtcbiAgICB9O1xuICB9KTtcblxuICAvLyBFeHRyYWN0cyB0aGUgcmVzdWx0IGZyb20gYSB3cmFwcGVkIGFuZCBjaGFpbmVkIG9iamVjdC5cbiAgXy5wcm90b3R5cGUudmFsdWUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fd3JhcHBlZDtcbiAgfTtcblxuICAvLyBBTUQgcmVnaXN0cmF0aW9uIGhhcHBlbnMgYXQgdGhlIGVuZCBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEFNRCBsb2FkZXJzXG4gIC8vIHRoYXQgbWF5IG5vdCBlbmZvcmNlIG5leHQtdHVybiBzZW1hbnRpY3Mgb24gbW9kdWxlcy4gRXZlbiB0aG91Z2ggZ2VuZXJhbFxuICAvLyBwcmFjdGljZSBmb3IgQU1EIHJlZ2lzdHJhdGlvbiBpcyB0byBiZSBhbm9ueW1vdXMsIHVuZGVyc2NvcmUgcmVnaXN0ZXJzXG4gIC8vIGFzIGEgbmFtZWQgbW9kdWxlIGJlY2F1c2UsIGxpa2UgalF1ZXJ5LCBpdCBpcyBhIGJhc2UgbGlicmFyeSB0aGF0IGlzXG4gIC8vIHBvcHVsYXIgZW5vdWdoIHRvIGJlIGJ1bmRsZWQgaW4gYSB0aGlyZCBwYXJ0eSBsaWIsIGJ1dCBub3QgYmUgcGFydCBvZlxuICAvLyBhbiBBTUQgbG9hZCByZXF1ZXN0LiBUaG9zZSBjYXNlcyBjb3VsZCBnZW5lcmF0ZSBhbiBlcnJvciB3aGVuIGFuXG4gIC8vIGFub255bW91cyBkZWZpbmUoKSBpcyBjYWxsZWQgb3V0c2lkZSBvZiBhIGxvYWRlciByZXF1ZXN0LlxuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKCd1bmRlcnNjb3JlJywgW10sIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIF87XG4gICAgfSk7XG4gIH1cbn0uY2FsbCh0aGlzKSk7XG4iLCJ2YXIgQXBwRmFjYWRlID0gcmVxdWlyZSgnLi9hcHBGYWNhZGUuanMnKTtcbnZhciBnX3Jlc291Y2VzID0gcmVxdWlyZSgnLi9yZXNvdXJjZS5qcycpLmdfcmVzb3VjZXM7XG5cbihmdW5jdGlvbigpIHtcbiAgICBjYy5nYW1lLm9uU3RhcnQgPSBmdW5jdGlvbigpe1xuICAgICAgICBjYy52aWV3LmFkanVzdFZpZXdQb3J0KHRydWUpO1xuICAgICAgICBjYy52aWV3LnNldERlc2lnblJlc29sdXRpb25TaXplKDY0MCwgOTYwLCBjYy5SZXNvbHV0aW9uUG9saWN5LlNIT1dfQUxMKTtcbiAgICAgICAgY2Mudmlldy5yZXNpemVXaXRoQnJvd3NlclNpemUodHJ1ZSk7XG5cbiAgICAgICAgY2NzLmNzTG9hZGVyLnNldFJlY29yZFByb3RvY29sQnVmZmVyc1BhdGgodHJ1ZSk7XG4gICAgICAgIGNjLkxvYWRlclNjZW5lLnByZWxvYWQoZ19yZXNvdWNlcywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIga2V5ID0gJ2ZpZ2h0ZXItbXZjJztcbiAgICAgICAgICAgIEFwcEZhY2FkZS5nZXRJbnN0YW5jZShrZXkpLnN0YXJ0dXAoKTtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgfTtcbiAgICBjYy5nYW1lLnJ1bigpO1xufSkoKTsiLCIvKipcclxuICogQ3JlYXRlZCBieSBBcnRodXIgb24gMjAxNC8xMi8yMC5cclxuICovXHJcbnZhciBjb25zdGFudHMgPSBtb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIEFQUF9OQU1FOiBcImZpZ2h0ZXJcIixcclxuXHJcbiAgICBDVVNUT01fTk9USUNJQ0FUSU9OOiAnY3VzdG9tX25vdGlmaWNhdGlvbicsXHJcbiAgICBDT05GSVJNX0RJQUxPRzogJ2NvbmZpcm1fZGlhbG9nJyxcclxuXHJcbiAgICBOT1RJRklDQVRJT046IHtcclxuICAgICAgICBTVEFSVFVQOiAnc3RhcnR1cCcsXHJcbiAgICAgICAgU0NFTkVfQ0hBTkdFRDogJ3NjZW5lX2NoYW5nZWQnLFxyXG4gICAgICAgIFNDRU5FX0hPTUU6ICdzY2VuZV9ob21lJ1xyXG4gICAgfSxcclxuXHJcbiAgICBTQ0VORV9BQ1RJT046ICdzY2VuZV9hY3Rpb24nLFxyXG4gICAgU0NFTkVfQUNUSU9OX0FERF9DSElMRDogJ3NjZW5lX2FjdGlvbl9hZGRfY2hpbGQnLFxyXG4gICAgU0NFTkU6IHtcclxuICAgICAgICBIT01FOiAnSG9tZU1lZGlhdG9yJyxcclxuICAgICAgICBUUkFJTjogJ1RyYWluTWVkaWF0b3InLFxyXG4gICAgICAgIExPVkU6IFwiTG92ZU1lZGlhdG9yXCIsXHJcbiAgICAgICAgRklHSFQ6IFwiRmlnaHRNZWRpYXRvclwiXHJcbiAgICB9LFxyXG5cclxuICAgIFRBU0tfU1RBVFVTIDoge1xyXG4gICAgICAgIFNUT1A6IDEsXHJcbiAgICAgICAgU1RBUlQ6IDIsXHJcbiAgICAgICAgRklOSVNIOiAzXHJcbiAgICB9LFxyXG5cclxuICAgIFBMQVlFUl9BQ1RJT046ICdwbGF5ZXJfYWN0aW9uJyxcclxuXHJcbiAgICBUQVNLX0FDVElPTjogJ3Rhc2tfYWN0aW9uJyxcclxuICAgIFRBU0tfQUNUSU9OX01PTklUT1I6ICd0YXNrX2FjdGlvbl9tb25pdG9yJyxcclxuICAgIFRBU0tfQUNUSU9OX1NUQVJUOiAndGFza19hY3Rpb25fc3RhcnQnLFxyXG4gICAgVEFTS19BQ1RJT05fU1RPUDogJ3Rhc2tfYWN0aW9uX3N0b3AnLFxyXG4gICAgVEFTS19BQ1RJT05fRklOSVNIRUQ6ICd0YXNrX2FjdGlvbl9maW5pc2hlZCcsXHJcblxyXG4gICAgTE9WRV9BQ1RJT046ICdsb3ZlX2FjdGlvbidcclxufTsiLCIvKipcclxuICogQ3JlYXRlZCBieSBBcnRodXIgb24gMjAxNC8xMi8yMS5cclxuICovXHJcbnZhciBwdXJlbXZjID0gcmVxdWlyZSgncHVyZW12YycpLnB1cmVtdmM7XHJcbnZhciBTdGFydHVwQ29tbWFuZCA9IHJlcXVpcmUoJy4vY29udHJvbGxlci9jb21tYW5kL1N0YXJ0dXBDb21tYW5kLmpzJyk7XHJcbnZhciBjb25zdGFudHMgPSByZXF1aXJlKCcuL2FwcENvbnN0YW50cy5qcycpO1xyXG5cclxudmFyIEFwcEZhY2FkZSA9IG1vZHVsZS5leHBvcnRzID0gcHVyZW12Yy5kZWZpbmUoXHJcbiAgICAvLyBDTEFTUyBJTkZPXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ0FwcEZhY2FkZScsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLkZhY2FkZSxcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3I6IGZ1bmN0aW9uIChtdWx0aXRvbktleSkge1xyXG4gICAgICAgICAgICBwdXJlbXZjLkZhY2FkZS5jYWxsKHRoaXMsIG11bHRpdG9uS2V5KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIGluaXRpYWxpemVDb250cm9sbGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHB1cmVtdmMuRmFjYWRlLnByb3RvdHlwZS5pbml0aWFsaXplQ29udHJvbGxlci5jYWxsKHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyQ29tbWFuZChjb25zdGFudHMuTk9USUZJQ0FUSU9OLlNUQVJUVVAsIFN0YXJ0dXBDb21tYW5kKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGluaXRpYWxpemVNb2RlbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBwdXJlbXZjLkZhY2FkZS5wcm90b3R5cGUuaW5pdGlhbGl6ZU1vZGVsLmNhbGwodGhpcyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBpbml0aWFsaXplVmlldzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBwdXJlbXZjLkZhY2FkZS5wcm90b3R5cGUuaW5pdGlhbGl6ZVZpZXcuY2FsbCh0aGlzKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzdGFydHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VuZE5vdGlmaWNhdGlvbihjb25zdGFudHMuTk9USUZJQ0FUSU9OLlNUQVJUVVApO1xyXG5cclxuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICBjYy5ldmVudE1hbmFnZXIuYWRkQ3VzdG9tTGlzdGVuZXIoY29uc3RhbnRzLkNVU1RPTV9OT1RJQ0lDQVRJT04sIGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICAgICAgICAgIHZhciB1c2VyRGF0YSA9IGV2ZW50LmdldFVzZXJEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNlbmROb3RpZmljYXRpb24oXHJcbiAgICAgICAgICAgICAgICAgICAgdXNlckRhdGEubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICB1c2VyRGF0YS5kYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJEYXRhLnR5cGVcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIGdldEluc3RhbmNlOiBmdW5jdGlvbihtdWx0aXRvbktleSkge1xyXG4gICAgICAgICAgICB2YXIgaW5zdGFuY2VNYXAgPSBwdXJlbXZjLkZhY2FkZS5pbnN0YW5jZU1hcDtcclxuICAgICAgICAgICAgdmFyIGluc3RhbmNlID0gaW5zdGFuY2VNYXBbbXVsdGl0b25LZXldO1xyXG4gICAgICAgICAgICBpZihpbnN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGluc3RhbmNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBpbnN0YW5jZU1hcFttdWx0aXRvbktleV0gPSBuZXcgQXBwRmFjYWRlKG11bHRpdG9uS2V5KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIE5BTUU6ICdBcHBGYWNhZGUnXHJcbiAgICB9XHJcbik7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgQXJ0aHVyIG9uIDIwMTQvMTIvMTQuXHJcbiAqL1xyXG5cclxudmFyIHB1cmVtdmMgPSByZXF1aXJlKCdwdXJlbXZjJykucHVyZW12YztcclxudmFyIFByZXBDb250cm9sbGVyQ29tbWFuZCA9IHJlcXVpcmUoJy4vcHJlcENvbnRyb2xsZXJDb21tYW5kLmpzJyk7XHJcbnZhciBQcmVwTW9kZWxDb21tYW5kID0gcmVxdWlyZSgnLi9wcmVwTW9kZWxDb21tYW5kLmpzJyk7XHJcbnZhciBQcmVwVmlld0NvbW1hbmQgPSByZXF1aXJlKCcuL3ByZXBWaWV3Q29tbWFuZC5qcycpO1xyXG52YXIgSG9tZUNvbW1hbmQgPSByZXF1aXJlKCcuL2hvbWVDb21tYW5kLmpzJyk7XHJcbnZhciBjb25zdGFudHMgPSByZXF1aXJlKCcuLi8uLi9hcHBDb25zdGFudHMuanMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcHVyZW12Yy5kZWZpbmUoe1xyXG4gICAgICAgIG5hbWU6ICdmaWdodGVyLmNvbnRyb2xsZXIuY29tbWFuZC5TdGFydHVwQ29tbWFuZCcsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLk1hY3JvQ29tbWFuZFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWRkIHRoZSBzdWItY29tbWFuZHMgZm9yIHRoaXMgTWFjcm9Db21tYW5kXHJcbiAgICAgICAgICogQG92ZXJyaWRlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaW5pdGlhbGl6ZU1hY3JvQ29tbWFuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjYy5sb2coJ3N0YXJ0IGNvbW1hbmQgaW5pdCcpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZFN1YkNvbW1hbmQoIFByZXBDb250cm9sbGVyQ29tbWFuZCApO1xyXG4gICAgICAgICAgICB0aGlzLmFkZFN1YkNvbW1hbmQoIFByZXBNb2RlbENvbW1hbmQgKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRTdWJDb21tYW5kKCBQcmVwVmlld0NvbW1hbmQgKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRTdWJDb21tYW5kKCBIb21lQ29tbWFuZCApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuKTtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgQXJ0aHVyIG9uIDIwMTQvMTIvMjEuXHJcbiAqL1xyXG5cclxudmFyIHB1cmVtdmMgPSByZXF1aXJlKCdwdXJlbXZjJykucHVyZW12YztcclxudmFyIGNvbnN0YW50cyA9IHJlcXVpcmUoJy4uLy4uL2FwcENvbnN0YW50cy5qcycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBwdXJlbXZjLmRlZmluZSh7XHJcbiAgICAgICAgbmFtZTogJ2ZpZ2h0ZXIuY29udHJvbGxlci5jb21tYW5kLkhvbWVDb21tYW5kJyxcclxuICAgICAgICBwYXJlbnQ6IHB1cmVtdmMuU2ltcGxlQ29tbWFuZFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVnaXN0ZXIgQ29tbWFuZHMgd2l0aCB0aGUgQ29udHJvbGxlclxyXG4gICAgICAgICAqIEBvdmVycmlkZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGV4ZWN1dGU6IGZ1bmN0aW9uIChub3RlKSB7XHJcbiAgICAgICAgICAgIC8vIFRoaXMgcmVnaXN0ZXJzIG11bHRpcGxlIG5vdGVzIHRvIGEgc2luZ2xlIGNvbW1hbmQgd2hpY2ggcGVyZm9ybXMgZGlmZmVyZW50IGxvZ2ljIGJhc2VkIG9uIHRoZSBub3RlIG5hbWUuXHJcbiAgICAgICAgICAgIC8vIEluIGEgbW9yZSBjb21wbGV4IGFwcCwgd2UnZCB1c3VhbGx5IGJlIHJlZ2lzdGVyaW5nIGEgZGlmZmVyZW50IGNvbW1hbmQgdG8gZWFjaCBub3RpZmljYXRpb24gbmFtZS5cclxuICAgICAgICAgICAgY2MubG9nKCdIb21lQ29tbWFuZCBleGVjdXRlJyk7XHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5mYWNhZGUuc2VuZE5vdGlmaWNhdGlvbihjb25zdGFudHMuU0NFTkVfQUNUSU9OLCB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBjb25zdGFudHMuU0NFTkUuSE9NRVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZmFjYWRlLnNlbmROb3RpZmljYXRpb24oY29uc3RhbnRzLlRBU0tfQUNUSU9OX01PTklUT1IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuKTtcclxuXHJcblxyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBBcnRodXIgb24gMjAxNS8xLzEuXHJcbiAqL1xyXG52YXIgcHVyZW12YyA9IHJlcXVpcmUoJ3B1cmVtdmMnKS5wdXJlbXZjO1xyXG52YXIgY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vLi4vYXBwQ29uc3RhbnRzLmpzJyk7XHJcbnZhciBQbGF5ZXJQcm94eU5hbWUgPSByZXF1aXJlKCcuLi8uLi9tb2RlbC9wcm94eS9wbGF5ZXJQcm94eS5qcycpLk5BTUU7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHB1cmVtdmMuZGVmaW5lKHtcclxuICAgICAgICBuYW1lOiAnZmlnaHRlci5jb250cm9sbGVyLmNvbW1hbmQuUGxheWVyQ29tbWFuZCcsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLlNpbXBsZUNvbW1hbmRcclxuICAgIH0sXHJcblxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlZ2lzdGVyIENvbW1hbmRzIHdpdGggdGhlIENvbnRyb2xsZXJcclxuICAgICAgICAgKiBAb3ZlcnJpZGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBleGVjdXRlOiBmdW5jdGlvbiAobm90ZSkge1xyXG4gICAgICAgICAgICAvLyBUaGlzIHJlZ2lzdGVycyBtdWx0aXBsZSBub3RlcyB0byBhIHNpbmdsZSBjb21tYW5kIHdoaWNoIHBlcmZvcm1zIGRpZmZlcmVudCBsb2dpYyBiYXNlZCBvbiB0aGUgbm90ZSBuYW1lLlxyXG4gICAgICAgICAgICAvLyBJbiBhIG1vcmUgY29tcGxleCBhcHAsIHdlJ2QgdXN1YWxseSBiZSByZWdpc3RlcmluZyBhIGRpZmZlcmVudCBjb21tYW5kIHRvIGVhY2ggbm90aWZpY2F0aW9uIG5hbWUuXHJcbiAgICAgICAgICAgIGNjLmxvZygnSG9tZUNvbW1hbmQgZXhlY3V0ZScpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHBsYXllclByb3h5ID0gdGhpcy5mYWNhZGUucmV0cmlldmVQcm94eShQbGF5ZXJQcm94eU5hbWUpO1xyXG5cclxuICAgICAgICAgICAgc3dpdGNoKG5vdGUuZ2V0TmFtZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIGNvbnN0YW50cy5QTEFZRVJfQUNUSU9OOlxyXG4gICAgICAgICAgICAgICAgICAgIHBsYXllclByb3h5LnVwZGF0ZVBsYXllcihub3RlLmdldEJvZHkoKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChub3RlLmdldFR5cGUoKSA9PSBjb25zdGFudHMuVEFTS19BQ1RJT05fRklOSVNIRUQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyUHJveHkudXBkYXRlUGxheWVyQnlUYXNrKG5vdGUuZ2V0Qm9keSgpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIGNvbnN0YW50cy5MT1ZFX0FDVElPTjpcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXJQcm94eS51cGRhdGVQbGF5ZXJCeUxvdmUobm90ZS5nZXRCb2R5KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4pOyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFydGh1ciBvbiAyMDE0LzEyLzE0LlxyXG4gKi9cclxudmFyIHB1cmVtdmMgPSByZXF1aXJlKCdwdXJlbXZjJykucHVyZW12YztcclxudmFyIGNvbnN0YW50cyA9IHJlcXVpcmUoJy4uLy4uL2FwcENvbnN0YW50cy5qcycpO1xyXG52YXIgUGxheWVyQ29tbWFuZCA9IHJlcXVpcmUoJy4vcGxheWVyQ29tbWFuZC5qcycpO1xyXG52YXIgVGFza0NvbW1hbmQgPSByZXF1aXJlKCcuL3Rhc2tDb21tYW5kLmpzJyk7XHJcbnZhciBUYXNrTW9uaXRvckNvbW1hbmQgPSByZXF1aXJlKCcuL3Rhc2tNb25pdG9yQ29tbWFuZC5qcycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBwdXJlbXZjLmRlZmluZSh7XHJcbiAgICAgICAgbmFtZTogJ2ZpZ2h0ZXIuY29udHJvbGxlci5jb21tYW5kLlByZXBDb250cm9sbGVyQ29tbWFuZCcsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLlNpbXBsZUNvbW1hbmRcclxuICAgIH0sXHJcblxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlZ2lzdGVyIENvbW1hbmRzIHdpdGggdGhlIENvbnRyb2xsZXJcclxuICAgICAgICAgKiBAb3ZlcnJpZGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBleGVjdXRlOiBmdW5jdGlvbiAobm90ZSkge1xyXG4gICAgICAgICAgICAvLyBUaGlzIHJlZ2lzdGVycyBtdWx0aXBsZSBub3RlcyB0byBhIHNpbmdsZSBjb21tYW5kIHdoaWNoIHBlcmZvcm1zIGRpZmZlcmVudCBsb2dpYyBiYXNlZCBvbiB0aGUgbm90ZSBuYW1lLlxyXG4gICAgICAgICAgICAvLyBJbiBhIG1vcmUgY29tcGxleCBhcHAsIHdlJ2QgdXN1YWxseSBiZSByZWdpc3RlcmluZyBhIGRpZmZlcmVudCBjb21tYW5kIHRvIGVhY2ggbm90aWZpY2F0aW9uIG5hbWUuXHJcbiAgICAgICAgICAgIGNjLmxvZygnUHJlcENvbnRyb2xsZXJDb21tYW5kIGV4ZWN1dGUnKTtcclxuICAgICAgICAgICAgdGhpcy5mYWNhZGUucmVnaXN0ZXJDb21tYW5kKGNvbnN0YW50cy5QTEFZRVJfQUNUSU9OLCBQbGF5ZXJDb21tYW5kKTtcclxuICAgICAgICAgICAgdGhpcy5mYWNhZGUucmVnaXN0ZXJDb21tYW5kKGNvbnN0YW50cy5MT1ZFX0FDVElPTiwgUGxheWVyQ29tbWFuZCk7XHJcbiAgICAgICAgICAgIHRoaXMuZmFjYWRlLnJlZ2lzdGVyQ29tbWFuZChjb25zdGFudHMuVEFTS19BQ1RJT04sIFRhc2tDb21tYW5kKTtcclxuICAgICAgICAgICAgdGhpcy5mYWNhZGUucmVnaXN0ZXJDb21tYW5kKGNvbnN0YW50cy5UQVNLX0FDVElPTl9NT05JVE9SLCBUYXNrTW9uaXRvckNvbW1hbmQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuKTsiLCIvKipcclxuICogQ3JlYXRlZCBieSBBcnRodXIgb24gMjAxNC8xMi8xNC5cclxuICovXHJcbnZhciBwdXJlbXZjID0gcmVxdWlyZSgncHVyZW12YycpLnB1cmVtdmM7XHJcbnZhciBQbGF5ZXJQcm94eSA9IHJlcXVpcmUoJy4uLy4uL21vZGVsL3Byb3h5L3BsYXllclByb3h5LmpzJyk7XHJcbnZhciBUYXNrUHJveHkgPSByZXF1aXJlKCcuLi8uLi9tb2RlbC9wcm94eS90YXNrUHJveHkuanMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcHVyZW12Yy5kZWZpbmUoe1xyXG4gICAgICAgIG5hbWU6ICdmaWdodGVyLmNvbnRyb2xsZXIuY29tbWFuZC5QcmVwTW9kZWxDb21tYW5kJyxcclxuICAgICAgICBwYXJlbnQ6IHB1cmVtdmMuU2ltcGxlQ29tbWFuZFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVnaXN0ZXIgUHJveGllcyB3aXRoIHRoZSBNb2RlbFxyXG4gICAgICAgICAqIEBvdmVycmlkZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGV4ZWN1dGU6IGZ1bmN0aW9uIChub3RlKSB7XHJcbiAgICAgICAgICAgIGNjLmxvZygnUHJlcE1vZGVsQ29tbWFuZCBleGVjdXRlJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZmFjYWRlLnJlZ2lzdGVyUHJveHkobmV3IFBsYXllclByb3h5KCkpO1xyXG4gICAgICAgICAgICB0aGlzLmZhY2FkZS5yZWdpc3RlclByb3h5KG5ldyBUYXNrUHJveHkoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBBcnRodXIgb24gMjAxNC8xMi8xNC5cclxuICovXHJcbnZhciBwdXJlbXZjID0gcmVxdWlyZSgncHVyZW12YycpLnB1cmVtdmM7XHJcbnZhciBEaXJlY3Rvck1lZGlhdG9yID0gcmVxdWlyZSgnLi4vLi4vdmlldy9tZWRpYXRvci9kaXJlY3Rvck1lZGlhdG9yLmpzJyk7XHJcbnZhciBIb21lTWVkaWF0b3IgPSByZXF1aXJlKCcuLi8uLi92aWV3L21lZGlhdG9yL2hvbWVNZWRpYXRvci5qcycpO1xyXG52YXIgU2NlbmVNZWRpYXRvciA9IHJlcXVpcmUoJy4uLy4uL3ZpZXcvbWVkaWF0b3Ivc2NlbmVNZWRpYXRvci5qcycpO1xyXG52YXIgVHJhaW5NZWRpYXRvciA9IHJlcXVpcmUoJy4uLy4uL3ZpZXcvbWVkaWF0b3IvdHJhaW5NZWRpYXRvci5qcycpO1xyXG52YXIgTG92ZU1lZGlhdG9yID0gcmVxdWlyZSgnLi4vLi4vdmlldy9tZWRpYXRvci9sb3ZlTWVkaWF0b3IuanMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcHVyZW12Yy5kZWZpbmUgKHtcclxuICAgICAgICBuYW1lOiAnZmlnaHRlci5jb250cm9sbGVyLmNvbW1hbmQuUHJlcFZpZXdDb21tYW5kJyxcclxuICAgICAgICBwYXJlbnQ6IHB1cmVtdmMuU2ltcGxlQ29tbWFuZFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVnaXN0ZXIgTWVkaWF0b3JzIHdpdGggdGhlIFZpZXdcclxuICAgICAgICAgKiBAb3ZlcnJpZGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBleGVjdXRlOiBmdW5jdGlvbiAobm90ZSkge1xyXG4gICAgICAgICAgICBjYy5sb2coJ1ByZXBWaWV3Q29tbWFuZCBleGVjdXRlJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZmFjYWRlLnJlZ2lzdGVyTWVkaWF0b3IobmV3IERpcmVjdG9yTWVkaWF0b3IoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuZmFjYWRlLnJlZ2lzdGVyTWVkaWF0b3IobmV3IFNjZW5lTWVkaWF0b3IoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuZmFjYWRlLnJlZ2lzdGVyTWVkaWF0b3IobmV3IEhvbWVNZWRpYXRvcigpKTtcclxuICAgICAgICAgICAgdGhpcy5mYWNhZGUucmVnaXN0ZXJNZWRpYXRvcihuZXcgVHJhaW5NZWRpYXRvcigpKTtcclxuICAgICAgICAgICAgdGhpcy5mYWNhZGUucmVnaXN0ZXJNZWRpYXRvcihuZXcgTG92ZU1lZGlhdG9yKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuKTtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgQXJ0aHVyIG9uIDIwMTUvMS8xLlxyXG4gKi9cclxudmFyIHB1cmVtdmMgPSByZXF1aXJlKCdwdXJlbXZjJykucHVyZW12YztcclxudmFyIGNvbnN0YW50cyA9IHJlcXVpcmUoJy4uLy4uL2FwcENvbnN0YW50cy5qcycpO1xyXG52YXIgVGFza1Byb3h5TmFtZSA9IHJlcXVpcmUoJy4uLy4uL21vZGVsL3Byb3h5L3Rhc2tQcm94eS5qcycpLk5BTUU7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHB1cmVtdmMuZGVmaW5lKHtcclxuICAgICAgICBuYW1lOiAnZmlnaHRlci5jb250cm9sbGVyLmNvbW1hbmQuVGFza0NvbW1hbmQnLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5TaW1wbGVDb21tYW5kXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZWdpc3RlciBDb21tYW5kcyB3aXRoIHRoZSBDb250cm9sbGVyXHJcbiAgICAgICAgICogQG92ZXJyaWRlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZXhlY3V0ZTogZnVuY3Rpb24gKG5vdGUpIHtcclxuICAgICAgICAgICAgLy8gVGhpcyByZWdpc3RlcnMgbXVsdGlwbGUgbm90ZXMgdG8gYSBzaW5nbGUgY29tbWFuZCB3aGljaCBwZXJmb3JtcyBkaWZmZXJlbnQgbG9naWMgYmFzZWQgb24gdGhlIG5vdGUgbmFtZS5cclxuICAgICAgICAgICAgLy8gSW4gYSBtb3JlIGNvbXBsZXggYXBwLCB3ZSdkIHVzdWFsbHkgYmUgcmVnaXN0ZXJpbmcgYSBkaWZmZXJlbnQgY29tbWFuZCB0byBlYWNoIG5vdGlmaWNhdGlvbiBuYW1lLlxyXG4gICAgICAgICAgICBjYy5sb2coJ1Rhc2tDb21tYW5kIGV4ZWN1dGUnLCBub3RlLnRvU3RyaW5nKCkpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRhc2tQcm94eSA9IHRoaXMuZmFjYWRlLnJldHJpZXZlUHJveHkoVGFza1Byb3h5TmFtZSk7XHJcblxyXG4gICAgICAgICAgICBzd2l0Y2gobm90ZS5nZXRUeXBlKCkpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgY29uc3RhbnRzLlRBU0tfQUNUSU9OX1NUQVJUOlxyXG4gICAgICAgICAgICAgICAgICAgIHRhc2tQcm94eS5zdGFydFRhc2sobm90ZS5nZXRCb2R5KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBjb25zdGFudHMuVEFTS19BQ1RJT05fRklOSVNIRUQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGFza1Byb3h5LmZpbmlzaFRhc2sobm90ZS5nZXRCb2R5KCkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuKTsiLCIvKipcclxuICogQ3JlYXRlZCBieSBBcnRodXIgb24gMjAxNS8xLzEuXHJcbiAqL1xyXG52YXIgcHVyZW12YyA9IHJlcXVpcmUoJ3B1cmVtdmMnKS5wdXJlbXZjO1xyXG52YXIgY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vLi4vYXBwQ29uc3RhbnRzLmpzJyk7XHJcbnZhciBUYXNrUHJveHlOYW1lID0gcmVxdWlyZSgnLi4vLi4vbW9kZWwvcHJveHkvdGFza1Byb3h5LmpzJykuTkFNRTtcclxudmFyIF8gPSByZXF1aXJlKCd1bmRlcnNjb3JlJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHB1cmVtdmMuZGVmaW5lKHtcclxuICAgICAgICBuYW1lOiAnZmlnaHRlci5jb250cm9sbGVyLmNvbW1hbmQuVGFza01vbml0b3JDb21tYW5kJyxcclxuICAgICAgICBwYXJlbnQ6IHB1cmVtdmMuU2ltcGxlQ29tbWFuZFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVnaXN0ZXIgQ29tbWFuZHMgd2l0aCB0aGUgQ29udHJvbGxlclxyXG4gICAgICAgICAqIEBvdmVycmlkZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGV4ZWN1dGU6IGZ1bmN0aW9uIChub3RlKSB7XHJcbiAgICAgICAgICAgIC8vIFRoaXMgcmVnaXN0ZXJzIG11bHRpcGxlIG5vdGVzIHRvIGEgc2luZ2xlIGNvbW1hbmQgd2hpY2ggcGVyZm9ybXMgZGlmZmVyZW50IGxvZ2ljIGJhc2VkIG9uIHRoZSBub3RlIG5hbWUuXHJcbiAgICAgICAgICAgIC8vIEluIGEgbW9yZSBjb21wbGV4IGFwcCwgd2UnZCB1c3VhbGx5IGJlIHJlZ2lzdGVyaW5nIGEgZGlmZmVyZW50IGNvbW1hbmQgdG8gZWFjaCBub3RpZmljYXRpb24gbmFtZS5cclxuICAgICAgICAgICAgY2MubG9nKCdUYXNrTW9uaXRvckNvbW1hbmQgZXhlY3V0ZScsIG5vdGUudG9TdHJpbmcoKSk7XHJcblxyXG4gICAgICAgICAgICBjYy5EaXJlY3Rvci5zaGFyZWREaXJlY3Rvci5nZXRTY2hlZHVsZXIoKVxyXG4gICAgICAgICAgICAgICAgLnNjaGVkdWxlQ2FsbGJhY2tGb3JUYXJnZXQodGhpcywgdGhpcy5jaGVja1Rhc2tTdGF0dXMsIDEsIGNjLlJFUEVBVF9GT1JFVkVSLCAwLCBmYWxzZSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY2hlY2tUYXNrU3RhdHVzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY2MubG9nKCd0YXNrIG1vbml0b3InKTtcclxuICAgICAgICAgICAgdmFyIHRhc2tQcm94eSA9IHRoaXMuZmFjYWRlLnJldHJpZXZlUHJveHkoVGFza1Byb3h5TmFtZSk7XHJcbiAgICAgICAgICAgIHZhciB0YXNrTGlzdCA9IHRhc2tQcm94eS5nZXREYXRhKCk7XHJcbiAgICAgICAgICAgIHZhciBmaWx0ZXJlZCA9IF8udmFsdWVzKHRhc2tMaXN0KS5maWx0ZXIoZnVuY3Rpb24odGFzaykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhc2suZ2V0KCdzdGF0dXMnKSA9PSBjb25zdGFudHMuVEFTS19TVEFUVVMuU1RBUlQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGZpbHRlcmVkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdCA9IGZpbHRlcmVkW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKHQuaXNGaW5pc2hlZCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mYWNhZGUuc2VuZE5vdGlmaWNhdGlvbihcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3RhbnRzLlRBU0tfQUNUSU9OLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdGFudHMuVEFTS19BQ1RJT05fRklOSVNIRURcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmFjYWRlLnNlbmROb3RpZmljYXRpb24oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0YW50cy5QTEFZRVJfQUNUSU9OLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdGFudHMuVEFTS19BQ1RJT05fRklOSVNIRURcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4pOyIsIi8qKlxyXG4gKiBDcmVhdGVkIHdpdGggSmV0QnJhaW5zIFdlYlN0b3JtLlxyXG4gKiBVc2VyOiBsY2MzNTM2XHJcbiAqIERhdGU6IDEzLTctOVxyXG4gKiBUaW1lOiDkuIvljYg1OjI0XHJcbiAqIFRvIGNoYW5nZSB0aGlzIHRlbXBsYXRlIHVzZSBGaWxlIHwgU2V0dGluZ3MgfCBGaWxlIFRlbXBsYXRlcy5cclxuICovXHJcblxyXG5cclxuLypcclxuICogZW50aXR5XHJcbiAqICovXHJcblxyXG52YXIgRXZlbnQgPSByZXF1aXJlKCcuLi8uLi91dGlsL2V2ZW50LmpzJyk7XHJcblxyXG52YXIgRW50aXR5ID0gbW9kdWxlLmV4cG9ydHMgPSBFdmVudC5leHRlbmQoe1xyXG4gICAgY3RvcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IHt9O1xyXG4gICAgICAgIHRoaXMuaW5pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHNhdmU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9rZXkpIHtcclxuICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMuX2tleSwgSlNPTi5zdHJpbmdpZnkodGhpcy5fZGF0YSkpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZmV0Y2g6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9rZXkpIHtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5fa2V5KTtcclxuXHJcbiAgICAgICAgICAgIGlmICghZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgICAgICB2YXIgYXR0cnMgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRzKGF0dHJzKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9IGNhdGNoKGUpIHtcclxuICAgICAgICAgICAgICAgIGNjLmVycm9yKCdjYW4gbm90IHBhcnNlIGVudGl0eSBkYXRhOiAnLCBkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIGNyZWF0ZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBnZXREYXRhOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcclxuICAgIH0sXHJcblxyXG5cdHNldDogZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XHJcblx0XHRpZiAodHlwZW9mIHZhbHVlICE9IFwidW5kZWZpbmVkXCIpIHtcclxuXHRcdFx0aWYgKHRoaXMuX2RhdGFbbmFtZV0gIT09IHZhbHVlKSB7XHJcblx0XHRcdFx0dGhpcy5fZGF0YVtuYW1lXSA9IHZhbHVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLmVtaXQobmFtZSArIFwiLmNoYW5nZVwiLCB2YWx1ZSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0c2V0czogZnVuY3Rpb24gKGF0dHJzKSB7XHJcblx0XHR2YXIga2V5O1xyXG5cclxuXHRcdGZvciAoa2V5IGluIGF0dHJzKSB7XHJcblx0XHRcdHRoaXMuc2V0KGtleSwgYXR0cnNba2V5XSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0Z2V0OiBmdW5jdGlvbiAobmFtZSkge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2RhdGFbbmFtZV07XHJcblx0fSxcclxuXHJcbiAgICBhZGQ6IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgdmFyIHZhbCA9IHRoaXMuZ2V0KG5hbWUpO1xyXG4gICAgICAgIHRoaXMuc2V0KG5hbWUsIHZhbHVlICsgdmFsKTtcclxuICAgIH0sXHJcblxyXG5cdGhhczogZnVuY3Rpb24gKG5hbWUpIHtcclxuXHRcdHJldHVybiAodHlwZW9mICh0aGlzLl9kYXRhW25hbWVdKSAhPSBcInVuZGVmaW5lZFwiKTtcclxuXHR9LFxyXG5cclxuXHRzY2hlZHVsZTogZnVuY3Rpb24gKGZuLCBpbnRlcnZhbCwgcmVwZWF0LCBkZWxheSkge1xyXG5cdFx0aW50ZXJ2YWwgPSBpbnRlcnZhbCB8fCAwO1xyXG5cdFx0cmVwZWF0ID0gKHJlcGVhdCA9PSBudWxsKSA/IGNjLlJFUEVBVF9GT1JFVkVSIDogcmVwZWF0O1xyXG5cdFx0ZGVsYXkgPSBkZWxheSB8fCAwO1xyXG5cclxuXHRcdGNjLkRpcmVjdG9yLnNoYXJlZERpcmVjdG9yLmdldFNjaGVkdWxlcigpLnNjaGVkdWxlQ2FsbGJhY2tGb3JUYXJnZXQodGhpcywgZm4sIGludGVydmFsLCByZXBlYXQsIGRlbGF5LCBmYWxzZSk7XHJcblx0fSxcclxuXHJcblx0c2NoZWR1bGVPbmNlOiBmdW5jdGlvbiAoZm4sIGRlbGF5KSB7XHJcblx0XHR0aGlzLnNjaGVkdWxlKGZuLCAwLjAsIDAsIGRlbGF5KTtcclxuXHR9LFxyXG5cclxuXHR1bnNjaGVkdWxlOiBmdW5jdGlvbiAoZm4pIHtcclxuXHRcdC8vIGV4cGxpY2l0IG5pbCBoYW5kbGluZ1xyXG5cdFx0Y2MuRGlyZWN0b3Iuc2hhcmVkRGlyZWN0b3IuZ2V0U2NoZWR1bGVyKCkudW5zY2hlZHVsZUNhbGxiYWNrRm9yVGFyZ2V0KHRoaXMsIGZuKTtcclxuXHR9LFxyXG5cclxuXHR1bnNjaGVkdWxlQWxsQ2FsbGJhY2tzOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRjYy5EaXJlY3Rvci5zaGFyZWREaXJlY3Rvci5nZXRTY2hlZHVsZXIoKS51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzRm9yVGFyZ2V0KHRoaXMpO1xyXG5cdH1cclxufSk7XHJcbiIsInZhciBFbnRpdHkgPSByZXF1aXJlKCcuL2VudGl0eS5qcycpO1xyXG5cclxudmFyIFBsYXllciA9IG1vZHVsZS5leHBvcnRzID0gRW50aXR5LmV4dGVuZCh7XHJcbiAgICBjdG9yOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLl9rZXkgPSAnUGxheWVyRW50aXR5JztcclxuICAgICAgICB0aGlzLl9uYW1lID0gJ1BsYXllckVudGl0eSc7XHJcbiAgICAgICAgdGhpcy5fc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHJcbiAgICAgICAgdGhpcy5vbignbG92ZUNvdW50LmNoYW5nZScsIGZ1bmN0aW9uKGNvdW50KSB7XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgaXNJbml0ZWQgPSB0aGlzLmZldGNoKCk7XHJcbiAgICAgICAgaWYgKCFpc0luaXRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY3JlYXRlOiBmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5zZXRzKFBsYXllci5ERUZBVUxUX0RBVEEpO1xyXG4gICAgICAgIHRoaXMuc2V0KCduYW1lJywgbmFtZSk7XHJcbiAgICAgICAgdGhpcy5zYXZlKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHJlZHVjZURhaXlDb3VudDogZnVuY3Rpb24obmFtZSwgY291bnQpIHtcclxuICAgICAgICB2YXIgZGMgPSB0aGlzLmdldCgnZGFpbHlDb3VudCcpO1xyXG4gICAgICAgIGlmICh0eXBlb2YgZGNbbmFtZV0gIT0gJ3VuZGVmaW5lZCcgJiYgZGNbbmFtZV0gPiAwKSB7XHJcbiAgICAgICAgICAgIGRjW25hbWVdID0gTWF0aC5tYXgoMCwgZGNbbmFtZV0gLSBjb3VudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuXHJcblBsYXllci5Mb3ZlQ291bnRNYXAgPSB7XHJcbiAgICAxOiA5OSxcclxuICAgIDI6IDQ5OSxcclxuICAgIDM6IDE5OTksXHJcbiAgICA0OiA0OTk5LFxyXG4gICAgNTogOTk5OVxyXG59O1xyXG5cclxuUGxheWVyLkRFRkFVTFRfREFUQSA9IHtcclxuICAgIGdvbGQ6IDEwMCxcclxuICAgIGhwOiAxMDEsXHJcbiAgICBhdGs6IDEwMixcclxuICAgIGRlZmVuY2U6IDEwMyxcclxuICAgIHVuZGVmZW5jZTogMTA0LFxyXG4gICAgY3JpdDogNSxcclxuICAgIHVuY3JpdDogNSxcclxuICAgIGRvZGdlOiA1LFxyXG4gICAgaGl0OiA1LFxyXG5cclxuICAgIGxvdmVMdjogMSxcclxuICAgIGxvdmVDb3VudDogMCxcclxuXHJcbiAgICBkYWlseUNvdW50OiB7XHJcbiAgICAgICAgZnJlZUxvdmU6IDkwXHJcbiAgICB9XHJcbn07IiwidmFyIEVudGl0eSA9IHJlcXVpcmUoJy4vZW50aXR5LmpzJyk7XHJcbnZhciBjb25zdGFudHMgPSByZXF1aXJlKCcuLi8uLi9hcHBDb25zdGFudHMuanMnKTtcclxudmFyIF8gPSByZXF1aXJlKCd1bmRlcnNjb3JlJyk7XHJcblxyXG52YXIgVGFzayA9IG1vZHVsZS5leHBvcnRzID0gRW50aXR5LmV4dGVuZCh7XHJcbiAgICBjdG9yOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHRoaXMuX25hbWUgPSBcIlRhc2tFbnRpdHlcIjtcclxuICAgICAgICB0aGlzLl9rZXkgPSBcInRhc2tcIjtcclxuXHJcbiAgICAgICAgdGhpcy5fc3VwZXIoZGF0YSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICB0aGlzLl9rZXkgPSB0aGlzLl9rZXkgKyAnLicgKyBkYXRhLmlkO1xyXG4gICAgICAgIGlmICghdGhpcy5mZXRjaCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlKGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY3JlYXRlOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5zZXRzKGRhdGEpO1xyXG4gICAgICAgIHRoaXMuc2F2ZSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydDogZnVuY3Rpb24gKGNvdW50KSB7XHJcbiAgICAgICAgdGhpcy5zZXRzKHtcclxuICAgICAgICAgICAgc3RhdHVzOiBjb25zdGFudHMuVEFTS19TVEFUVVMuU1RBUlQsXHJcbiAgICAgICAgICAgIHN0YXJ0VGltZTogbmV3IERhdGUoKS5nZXRUaW1lKCksXHJcbiAgICAgICAgICAgIHRvdGFsQ291bnQ6IGNvdW50IHx8IHRoaXMuX3RvdGFsQ291bnRcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNhdmUoKTtcclxuICAgIH0sXHJcblxyXG4gICAgZmluaXNoOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLnNldHMoe1xyXG4gICAgICAgICAgICBzdGF0dXM6IGNvbnN0YW50cy5UQVNLX1NUQVRVUy5GSU5JU0hcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNhdmUoKTtcclxuICAgIH0sXHJcblxyXG4gICAgaXNTdGFydGVkOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXQoJ3N0YXR1cycpID09IGNvbnN0YW50cy5UQVNLX1NUQVRVUy5TVEFSVDtcclxuICAgIH0sXHJcblxyXG4gICAgaXNGaW5pc2hlZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGltZUxlZnQoKSA8PSAwO1xyXG4gICAgfSxcclxuXHJcbiAgICB0aW1lTGVmdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLmdldCgnc3RhcnRUaW1lJykgKyB0aGlzLmdldCgndG90YWxDb3VudCcpICogdGhpcy5nZXQoJ3RpbWVQZXJDb3VudCcpKVxyXG4gICAgICAgICAgICAtIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICB0aW1lTGVmdFN0cjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHRpbWUgPSB0aGlzLnRpbWVMZWZ0KCk7XHJcbiAgICAgICAgcmV0dXJuICh0aW1lLzEwMDAvNjApLnRvRml4ZWQoMikgKyAn5YiG6ZKf5ZCOJztcclxuICAgIH0sXHJcblxyXG4gICAgdG90YWxPYnRhaW46IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldCgnb2J0YWluUGVyQ291bnQnKSAqIHRoaXMuZ2V0KCd0b3RhbENvdW50Jyk7XHJcbiAgICB9XHJcbn0pO1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBBcnRodXIgb24gMjAxNC8xMi8yNi5cclxuICovXHJcbnZhciBwdXJlbXZjID0gcmVxdWlyZSgncHVyZW12YycpLnB1cmVtdmM7XHJcbnZhciBQbGF5ZXIgPSByZXF1aXJlKCcuLi9lbnRpdHkvcGxheWVyLmpzJyk7XHJcbnZhciBjb25zdGFudHMgPSByZXF1aXJlKCcuLi8uLi9hcHBDb25zdGFudHMuanMnKTtcclxuXHJcbnZhciBQbGF5ZXJQcm94eSA9IG1vZHVsZS5leHBvcnRzID0gcHVyZW12Yy5kZWZpbmUoe1xyXG4gICAgICAgIG5hbWU6ICdmaWd0aGVyLm1vZGVsLnByb3h5LlBsYXllclByb3h5JyxcclxuICAgICAgICBwYXJlbnQ6IHB1cmVtdmMuUHJveHksXHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcHVyZW12Yy5Qcm94eS5jYWxsKHRoaXMsIHRoaXMuY29uc3RydWN0b3IuTkFNRSk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgcGxheWVyID0gbmV3IFBsYXllcigpO1xyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEocGxheWVyKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBnZXRQbGF5ZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB1cGRhdGVQbGF5ZXI6IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGEgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLnNldChuYW1lLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB1cGRhdGVQbGF5ZXJCeVRhc2s6IGZ1bmN0aW9uKHRhc2spIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRhLmFkZCh0YXNrLmdldCgnYXR0cicpLCB0YXNrLnRvdGFsT2J0YWluKCkpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEuc2F2ZSgpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHVwZGF0ZVBsYXllckJ5TG92ZTogZnVuY3Rpb24obG92ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEuYWRkKCdsb3ZlQ291bnQnLCBsb3ZlLmNvdW50KTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhLnJlZHVjZURhaXlDb3VudCgnZnJlZUxvdmUnLCBsb3ZlLmNvdW50KTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhLmFkZCgnZ29sZCcsIC1sb3ZlLmdvbGQpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEuc2F2ZSgpO1xyXG4gICAgICAgICAgICB2YXIgbG92ZUNvdW50ID0gdGhpcy5kYXRhLmdldCgnbG92ZUNvdW50Jyk7XHJcbiAgICAgICAgICAgIHZhciBsb3ZlTHYgPSB0aGlzLmRhdGEuZ2V0KCdsb3ZlTHYnKTtcclxuICAgICAgICAgICAgdmFyIG5lZWRDb3VudCA9IFBsYXllci5Mb3ZlQ291bnRNYXBbbG92ZUx2XTtcclxuICAgICAgICAgICAgaWYgKG5lZWRDb3VudCAhPSBudWxsICYmIG5lZWRDb3VudCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGlmIChsb3ZlQ291bnQgPj0gbmVlZENvdW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLmFkZCgnbG92ZUx2JywgMSk7XHJcbi8vICAgICAgICAgICAgICAgICAgICB0aGlzLmZhY2FkZS5zZW5kTm90aWZpY2F0aW9uKFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0YW50cy5QTEFZRVJfQUNUSU9OXHJcbi8vICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2V0TmFtZTogZnVuY3Rpb24obmFtZSkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEuc2V0KCduYW1lJywgbmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICB7XHJcbiAgICAgICAgTkFNRTogJ1BsYXllclByb3h5J1xyXG4gICAgfVxyXG4pOyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFydGh1ciBvbiAyMDE1LzEvMi5cclxuICovXHJcbnZhciBwdXJlbXZjID0gcmVxdWlyZSgncHVyZW12YycpLnB1cmVtdmM7XHJcbnZhciBUYXNrID0gcmVxdWlyZSgnLi4vZW50aXR5L3Rhc2suanMnKTtcclxudmFyIGNvbnN0YW50cyA9IHJlcXVpcmUoJy4uLy4uL2FwcENvbnN0YW50cy5qcycpO1xyXG5cclxudmFyIFRhc2tQcm94eTtcclxuVGFza1Byb3h5ID0gbW9kdWxlLmV4cG9ydHMgPSBwdXJlbXZjLmRlZmluZSh7XHJcbiAgICAgICAgbmFtZTogJ2ZpZ3RoZXIubW9kZWwucHJveHkuVGFza1Byb3h5JyxcclxuICAgICAgICBwYXJlbnQ6IHB1cmVtdmMuUHJveHksXHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHB1cmVtdmMuUHJveHkuY2FsbCh0aGlzLCB0aGlzLmNvbnN0cnVjdG9yLk5BTUUpO1xyXG4gICAgICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0ge307XHJcbiAgICAgICAgICAgIFRhc2tQcm94eS5UYXNrcy5mb3JFYWNoKGZ1bmN0aW9uKHQpIHtcclxuICAgICAgICAgICAgICAgIGRhdGFbdC5pZF0gPSBuZXcgVGFzayh0KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoZGF0YSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc3RhcnRUYXNrOiBmdW5jdGlvbih0YXNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0RGF0YSgpW3Rhc2suZ2V0KCdpZCcpXS5zdGFydCh0YXNrLmdldCgnY291bnQnKSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZmluaXNoVGFzazogZnVuY3Rpb24odGFzaykge1xyXG4gICAgICAgICAgICB0aGlzLmdldERhdGEoKVt0YXNrLmdldCgnaWQnKV0uZmluaXNoKCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ2V0VGFzazogZnVuY3Rpb24oaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGF0ZSgpW2lkXTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzZXRUYXNrOiBmdW5jdGlvbih0YXNrKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldERhdGEoKVt0YXNrLmlkXSA9IHRhc2s7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdXBkYXRlVGFzazogZnVuY3Rpb24odGFzaykge1xyXG4gICAgICAgICAgICB0aGlzLnNldFRhc2sodGFzaykuc2F2ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAge1xyXG4gICAgICAgIE5BTUU6ICdUYXNrUHJveHknXHJcbiAgICB9XHJcbik7XHJcblxyXG5UYXNrUHJveHkuVGFza3MgPSBbXHJcbiAgICB7XHJcbiAgICAgICAgaWQ6IDEsXHJcbiAgICAgICAgbmFtZTogJ+eUn+WRvScsXHJcbiAgICAgICAgYXR0cjogJ2hwJyxcclxuICAgICAgICBzdGFydFRpbWU6IDAsXHJcbiAgICAgICAgc3RhdHVzOiBjb25zdGFudHMuVEFTS19TVEFUVVMuU1RPUCxcclxuICAgICAgICB0b3RhbENvdW50OiAxMDAsXHJcbiAgICAgICAgdGltZVBlckNvdW50OiAxMDAsLy/mr6vnp5JcclxuICAgICAgICBjb25zdW1lUGVyQ291bnQ6IDEsXHJcbiAgICAgICAgb2J0YWluUGVyQ291bnQ6IDIwXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGlkOiAyLFxyXG4gICAgICAgIG5hbWU6ICfmlLvlh7snLFxyXG4gICAgICAgIGF0dHI6ICdhdGsnLFxyXG4gICAgICAgIHN0YXJ0VGltZTogMCxcclxuICAgICAgICBzdGF0dXM6IGNvbnN0YW50cy5UQVNLX1NUQVRVUy5TVE9QLFxyXG4gICAgICAgIHRvdGFsQ291bnQ6IDEwMCxcclxuICAgICAgICB0aW1lUGVyQ291bnQ6IDEwMDAsXHJcbiAgICAgICAgY29uc3VtZVBlckNvdW50OiAxLFxyXG4gICAgICAgIG9idGFpblBlckNvdW50OiAyMFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBpZDogMyxcclxuICAgICAgICBuYW1lOiAn6Ziy5b6hJyxcclxuICAgICAgICBhdHRyOidkZWZlbmNlJyxcclxuICAgICAgICBzdGFydFRpbWU6IDAsXHJcbiAgICAgICAgc3RhdHVzOiBjb25zdGFudHMuVEFTS19TVEFUVVMuU1RPUCxcclxuICAgICAgICB0b3RhbENvdW50OiAxMDAsXHJcbiAgICAgICAgdGltZVBlckNvdW50OiAxMDAwMCxcclxuICAgICAgICBjb25zdW1lUGVyQ291bnQ6IDEsXHJcbiAgICAgICAgb2J0YWluUGVyQ291bnQ6IDIwXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGlkOiA0LFxyXG4gICAgICAgIG5hbWU6ICfnoLTpmLInLFxyXG4gICAgICAgIHN0YXJ0VGltZTogMCxcclxuICAgICAgICBhdHRyOiAndW5kZWZlbmNlJyxcclxuICAgICAgICBzdGF0dXM6IGNvbnN0YW50cy5UQVNLX1NUQVRVUy5TVE9QLFxyXG4gICAgICAgIHRvdGFsQ291bnQ6IDEwMCxcclxuICAgICAgICB0aW1lUGVyQ291bnQ6IDEwMDAwMCxcclxuICAgICAgICBjb25zdW1lUGVyQ291bnQ6IDEsXHJcbiAgICAgICAgb2J0YWluUGVyQ291bnQ6IDIwXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGlkOiA1LFxyXG4gICAgICAgIG5hbWU6ICfmmrTlh7snLFxyXG4gICAgICAgIGF0dHI6ICdjcml0JyxcclxuICAgICAgICBzdGFydFRpbWU6IDAsXHJcbiAgICAgICAgc3RhdHVzOiBjb25zdGFudHMuVEFTS19TVEFUVVMuU1RPUCxcclxuICAgICAgICB0b3RhbENvdW50OiAxMDAsXHJcbiAgICAgICAgdGltZVBlckNvdW50OiAxMDAwMDAsXHJcbiAgICAgICAgY29uc3VtZVBlckNvdW50OiAxLFxyXG4gICAgICAgIG9idGFpblBlckNvdW50OiAyMFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBpZDogNixcclxuICAgICAgICBuYW1lOiAn6Z+n5oCnJyxcclxuICAgICAgICBhdHRyOiAndW5jcml0JyxcclxuICAgICAgICBzdGFydFRpbWU6IDAsXHJcbiAgICAgICAgc3RhdHVzOiBjb25zdGFudHMuVEFTS19TVEFUVVMuU1RPUCxcclxuICAgICAgICB0b3RhbENvdW50OiAxMDAsXHJcbiAgICAgICAgdGltZVBlckNvdW50OiAxMDAwMDAsXHJcbiAgICAgICAgY29uc3VtZVBlckNvdW50OiAxLFxyXG4gICAgICAgIG9idGFpblBlckNvdW50OiAyMFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBpZDogNyxcclxuICAgICAgICBuYW1lOiAn6Zeq6YG/JyxcclxuICAgICAgICBhdHRyOiAnZG9kZ2UnLFxyXG4gICAgICAgIHN0YXJ0VGltZTogMCxcclxuICAgICAgICBzdGF0dXM6IGNvbnN0YW50cy5UQVNLX1NUQVRVUy5TVE9QLFxyXG4gICAgICAgIHRvdGFsQ291bnQ6IDEwMCxcclxuICAgICAgICB0aW1lUGVyQ291bnQ6IDEwMDAwMCxcclxuICAgICAgICBjb25zdW1lUGVyQ291bnQ6IDEsXHJcbiAgICAgICAgb2J0YWluUGVyQ291bnQ6IDIwXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGlkOiA4LFxyXG4gICAgICAgIG5hbWU6ICflkb3kuK0nLFxyXG4gICAgICAgIGF0dHI6ICdoaXQnLFxyXG4gICAgICAgIHN0YXJ0VGltZTogMCxcclxuICAgICAgICBzdGF0dXM6IGNvbnN0YW50cy5UQVNLX1NUQVRVUy5TVE9QLFxyXG4gICAgICAgIHRvdGFsQ291bnQ6IDEwMCxcclxuICAgICAgICB0aW1lUGVyQ291bnQ6IDEwMDAwMCxcclxuICAgICAgICBjb25zdW1lUGVyQ291bnQ6IDEsXHJcbiAgICAgICAgb2J0YWluUGVyQ291bnQ6IDIwXHJcbiAgICB9XHJcbl07IiwidmFyIHJlcyA9IHtcbiAgICBhZGRfanBnOiBcInJlcy9pbWFnZXMvYWRkLmpwZ1wiLFxuICAgIGJ0bjFfanBnOiBcInJlcy9pbWFnZXMvYnRuMS5qcGdcIixcblxuICAgIGJ0bjNfcG5nOiBcInJlcy9pbWFnZXMvYnRuMy5qcGdcIixcbiAgICBidG41X3BuZzogXCJyZXMvaW1hZ2VzL2J0bjUuanBnXCIsXG4gICAgYnRuN19qcGc6IFwicmVzL2ltYWdlcy9idG43LmpwZ1wiLFxuXG4gICAgaW1nMV9wbmc6IFwicmVzL2ltYWdlcy9pbWcxLmpwZ1wiLFxuICAgIGltZzVfanBnOiBcInJlcy9pbWFnZXMvaW1nNS5qcGdcIixcbiAgICBpbWc2X2pwZzogXCJyZXMvaW1hZ2VzL2ltZzYuanBnXCIsXG4gICAgdHh0X2JnMV9qcGc6IFwicmVzL2ltYWdlcy90eHRfYmcxLmpwZ1wiLFxuXG5cbiAgICBNYWluTm9kZTogXCJyZXMvTWFpblNjZW5lLmNzYlwiLFxuICAgIFRhc2tOb2RlOiBcInJlcy9UYXNrTm9kZS5jc2JcIixcbiAgICBUcmFpbk5vZGU6IFwicmVzL1RyYWluTm9kZS5jc2JcIixcbiAgICBMb3ZlTGF5ZXI6IFwicmVzL0xvdmVMYXllci5jc2JcIixcbiAgICBMb3ZlSXRlbTogXCJyZXMvTG92ZUl0ZW0uY3NiXCIsXG4gICAgTG92ZUNvbmZpcm1Ob2RlOiBcInJlcy9Mb3ZlQ29uZmlybU5vZGUuY3NiXCIsXG4gICAgQ29uZmlybU5vZGU6IFwicmVzL0NvbmZpcm1Ob2RlLmNzYlwiXG59O1xuXG52YXIgZ19yZXNvdXJjZXMgPSBbXTtcbmZvciAodmFyIGkgaW4gcmVzKSB7XG4gICAgZ19yZXNvdXJjZXMucHVzaChyZXNbaV0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cy5yZXMgPSByZXM7XG5tb2R1bGUuZXhwb3J0cy5nX3Jlc291Y2VzID0gZ19yZXNvdXJjZXM7IiwiLyoqXHJcbiAqIENyZWF0ZWQgd2l0aCBKZXRCcmFpbnMgV2ViU3Rvcm0uXHJcbiAqIFVzZXI6IGxjYzM1MzZcclxuICogRGF0ZTogMTMtMTAtMThcclxuICogVGltZTog5LiL5Y2IMjo1NlxyXG4gKiBUbyBjaGFuZ2UgdGhpcyB0ZW1wbGF0ZSB1c2UgRmlsZSB8IFNldHRpbmdzIHwgRmlsZSBUZW1wbGF0ZXMuXHJcbiAqL1xyXG5cclxuXHJcbi8qXHJcbiAqIGV2ZW50XHJcbiAqICovXHJcblxyXG52YXIgRXZlbnQgPSBtb2R1bGUuZXhwb3J0cyA9IGNjLkNsYXNzLmV4dGVuZCh7XHJcbiAgICBfY2FsbGJhY2s6IHt9LFxyXG5cclxuICAgIG9uOiBmdW5jdGlvbiAoZXZlbnQsIGZuKSB7XHJcbiAgICAgICAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xyXG4gICAgICAgICh0aGlzLl9jYWxsYmFja3NbZXZlbnRdID0gdGhpcy5fY2FsbGJhY2tzW2V2ZW50XSB8fCBbXSlcclxuICAgICAgICAgICAgLnB1c2goZm4pO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbmNlOiBmdW5jdGlvbiAoZXZlbnQsIGZuKSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gb24oKSB7XHJcbiAgICAgICAgICAgIHNlbGYub2ZmKGV2ZW50LCBvbik7XHJcbiAgICAgICAgICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmbi5fb2ZmID0gb247XHJcbiAgICAgICAgdGhpcy5vbihldmVudCwgb24pO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuICAgIFxyXG4gICAgYWRkTGlzdGVuZXI6IGZ1bmN0aW9uKGV2ZW50LCBmbikge1xyXG4gICAgXHR0aGlzLm9uKGV2ZW50LCBmbik7XHJcbiAgICB9LFxyXG5cclxuICAgIHJlbW92ZUxpc3RlbmVyOiBmdW5jdGlvbiAoZXZlbnQsIGZuKSB7XHJcbiAgICAgICAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xyXG5cclxuICAgICAgICAvLyBhbGxcclxuICAgICAgICBpZiAoMCA9PSBhcmd1bWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NhbGxiYWNrcyA9IHt9O1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHNwZWNpZmljIGV2ZW50XHJcbiAgICAgICAgdmFyIGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrc1tldmVudF07XHJcbiAgICAgICAgaWYgKCFjYWxsYmFja3MpIHJldHVybiB0aGlzO1xyXG5cclxuICAgICAgICAvLyByZW1vdmUgYWxsIGhhbmRsZXJzXHJcbiAgICAgICAgaWYgKDEgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fY2FsbGJhY2tzW2V2ZW50XTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyByZW1vdmUgc3BlY2lmaWMgaGFuZGxlclxyXG4gICAgICAgIHZhciBpID0gdGhpcy5faW5kZXhPZihjYWxsYmFja3MsIGZuLl9vZmYgfHwgZm4pO1xyXG4gICAgICAgIGlmICh+aSkgY2FsbGJhY2tzLnNwbGljZShpLCAxKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcbiAgICBcclxuICAgIHJlbW92ZUxpc3RlbmVyczogZnVuY3Rpb24oKSB7XHJcbiAgICBcdHRoaXMuX2NhbGxiYWNrID0ge307XHJcbiAgICB9LFxyXG5cclxuICAgIGVtaXQ6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcclxuICAgICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxyXG4gICAgICAgIHZhciBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3NbZXZlbnRdO1xyXG5cclxuICAgICAgICBpZiAoY2FsbGJhY2tzKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrcyA9IGNhbGxiYWNrcy5zbGljZSgwKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNhbGxiYWNrcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgbGlzdGVuZXJzOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhbGxiYWNrc1tldmVudF0gfHwgW107XHJcbiAgICB9LFxyXG5cclxuICAgIGhhc0xpc3RlbmVyczogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgcmV0dXJuICEhdGhpcy5saXN0ZW5lcnMoZXZlbnQpLmxlbmd0aDtcclxuICAgIH0sXHJcblxyXG4gICAgX2luZGV4T2Y6IGZ1bmN0aW9uIChhcnIsIG9iaikge1xyXG4gICAgICAgIGlmIChhcnIuaW5kZXhPZikgcmV0dXJuIGFyci5pbmRleE9mKG9iaik7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgaWYgKGFycltpXSA9PT0gb2JqKSByZXR1cm4gaTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfVxyXG59KTtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgQXJ0aHVyIG9uIDIwMTUvMS84LlxyXG4gKi9cclxudmFyIHJlcyA9IHJlcXVpcmUoJy4uLy4uL3Jlc291cmNlLmpzJykucmVzO1xyXG52YXIgY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vLi4vYXBwQ29uc3RhbnRzLmpzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGNjLkxheWVyLmV4dGVuZCh7XHJcbiAgICBfdGl0bGU6IG51bGwsXHJcbiAgICBfZGVzYzogbnVsbCxcclxuICAgIF9vbkNvbmZpcm06IG51bGwsXHJcblxyXG4gICAgY3RvcjogZnVuY3Rpb24gKHRpdGxlLCBkZXNjLCBjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMuX3N1cGVyKCk7XHJcblxyXG4gICAgICAgIHZhciBub2RlID0gdGhpcy5fcm9vdE5vZGUgPSBjY3MuY3NMb2FkZXIuY3JlYXRlTm9kZShyZXMuQ29uZmlybU5vZGUpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgdmFyIHNpemUgPSBjYy53aW5TaXplO1xyXG4gICAgICAgIG5vZGUuYXR0cih7XHJcbiAgICAgICAgICAgIHg6IHNpemUud2lkdGgvMixcclxuICAgICAgICAgICAgeTogc2l6ZS5oZWlnaHQvMixcclxuICAgICAgICAgICAgYW5jaG9yWDogMC41LFxyXG4gICAgICAgICAgICBhbmNob3JZOiAwLjUsXHJcbiAgICAgICAgICAgIHdpZHRoOiA0NTAsXHJcbiAgICAgICAgICAgIGhlaWdodDogMjUwXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3RpdGxlID0gbm9kZS5nZXRDaGlsZEJ5TmFtZSgncGFuZWxfYmcnKS5nZXRDaGlsZEJ5TmFtZSgndHh0X3RpdGxlJyk7XHJcbiAgICAgICAgdGhpcy5fZGVzYyA9IG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3BhbmVsX2JnJykuZ2V0Q2hpbGRCeU5hbWUoJ3R4dF9kZXNjJyk7XHJcbiAgICAgICAgdGhpcy5fYnRuX2NhbmNlbCA9IG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3BhbmVsX2JnJykuZ2V0Q2hpbGRCeU5hbWUoJ2J0bl9jYW5jZWwnKTtcclxuICAgICAgICB0aGlzLl9idG5fb2sgPSBub2RlLmdldENoaWxkQnlOYW1lKCdwYW5lbF9iZycpLmdldENoaWxkQnlOYW1lKCdidG5fb2snKTtcclxuXHJcbiAgICAgICAgdGhpcy5fYnRuX2NhbmNlbC5hZGRDbGlja0V2ZW50TGlzdGVuZXIodGhpcy5jbG9zZS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB0aGlzLl9idG5fb2suYWRkQ2xpY2tFdmVudExpc3RlbmVyKHRoaXMub25Pa0xpc3RlbmVyLmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICBpZiAodGl0bGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fdGl0bGUuc3RyaW5nID0gdGl0bGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkZXNjKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Rlc2Muc3RyaW5nID0gZGVzYztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLl9vbkNvbmZpcm0gPSBjYWxsYmFjaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldFRpdGxlOiBmdW5jdGlvbih0aXRsZSkge1xyXG4gICAgICAgIHRoaXMuX3RpdGxlLnN0cmluZyA9IHRpdGxlO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXREZXNjOiBmdW5jdGlvbihkZXNjKSB7XHJcbiAgICAgICAgdGhpcy5fZGVzYy5zdHJpbmcgPSBkZXNjO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXRPa0NhbGxiYWNrOiBmdW5jdGlvbihmbikge1xyXG4gICAgICAgIHRoaXMuX29uQ29uZmlybSA9IGZuO1xyXG4gICAgfSxcclxuXHJcbiAgICBjbG9zZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uT2tMaXN0ZW5lcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX29uQ29uZmlybSkge1xyXG4gICAgICAgICAgICB0aGlzLl9vbkNvbmZpcm0uY2FsbCh0aGlzKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTsiLCIvKipcclxuICogQ3JlYXRlZCBieSBBcnRodXIgb24gMjAxNC8xMi8yOS5cclxuICovXHJcbnZhciBfID0gcmVxdWlyZSgndW5kZXJzY29yZScpO1xyXG5cclxudmFyIExvdmVJdGVtQ29udHJvbGxlciA9IG1vZHVsZS5leHBvcnRzID0gIGNjcy5Db21Db250cm9sbGVyLmV4dGVuZCh7XHJcbiAgICBjdG9yOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLl9zdXBlcigpO1xyXG4gICAgICAgIHRoaXMuX25hbWUgPSBcIkxvdmVJdGVtQ29udHJvbGxlclwiO1xyXG4gICAgICAgIHRoaXMuX2x2ID0gMTtcclxuICAgICAgICB0aGlzLl9wb3NpdGlvbiA9IG51bGw7XHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuICAgICAgICBpZiAoIW9wdGlvbnMgfHwgXy5pc0VtcHR5KG9wdGlvbnMpKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMgPSBMb3ZlSXRlbUNvbnRyb2xsZXIuREVGQVVMVF9PUFRJT05TO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IG9wdGlvbnM7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uRW50ZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuZ2V0T3duZXIoKS5zZXRQb3NpdGlvbih0aGlzLl9vcHRpb25zLnBvc2l0aW9uKTtcclxuXHJcbiAgICAgICAgdmFyIHR4dF92YWx1ZSA9IHRoaXMuX3R4dF92YWx1ZSA9IHRoaXMuZ2V0T3duZXIoKS5nZXRDaGlsZEJ5TmFtZSgndHh0X3ZhbHVlJyk7XHJcbiAgICAgICAgdHh0X3ZhbHVlLmF0dHIoe2FuY2hvclg6IDAsIGFuY2hvclk6IDAuNX0pO1xyXG4gICAgICAgIHR4dF92YWx1ZS5zZXRTdHJpbmcoJysnICsgdGhpcy5fb3B0aW9ucy52YWx1ZSk7XHJcblxyXG4gICAgICAgIHZhciB0eHRfY291bnQgPSB0aGlzLl90eHRfY291bnQgPSB0aGlzLmdldE93bmVyKCkuZ2V0Q2hpbGRCeU5hbWUoJ3R4dF9jb3VudCcpO1xyXG4gICAgICAgIHR4dF9jb3VudC5hdHRyKHthbmNob3JYOiAwLCBhbmNob3JZOiAwLjV9KTtcclxuICAgICAgICB0eHRfY291bnQuc2V0U3RyaW5nKHRoaXMuX29wdGlvbnMuY291bnQgKyAnLycgKyB0aGlzLl9vcHRpb25zLmNvdW50TmVlZCArICfmrKEnKTtcclxuXHJcbiAgICAgICAgdmFyIHR4dF9sdiA9IHRoaXMuX3R4dF9sdiA9IHRoaXMuZ2V0T3duZXIoKS5nZXRDaGlsZEJ5TmFtZSgndHh0X2x2Jyk7XHJcbiAgICAgICAgdHh0X2x2LmF0dHIoe2FuY2hvclg6IDAuNSwgYW5jaG9yWTogMC41fSk7XHJcbiAgICAgICAgdHh0X2x2LnNldFN0cmluZyh0aGlzLl9vcHRpb25zLmx2ICsgJ+e6pycpO1xyXG5cclxuICAgICAgICB2YXIgYnRuX2xvdmUgPSB0aGlzLl9idG5fbG92ZSA9IHRoaXMuZ2V0T3duZXIoKS5nZXRDaGlsZEJ5TmFtZSgnYnRuX2xvdmUnKTtcclxuICAgICAgICBidG5fbG92ZS5zZXRUaXRsZVRleHQoJ+eMruWQuycpO1xyXG4gICAgICAgIGJ0bl9sb3ZlLmFkZENsaWNrRXZlbnRMaXN0ZW5lcih0aGlzLmxvdmVMaXN0ZW5lci5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgdmFyIGRlc2NfYmcgPSB0aGlzLmdldE93bmVyKCkuZ2V0Q2hpbGRCeU5hbWUoJ2Rlc2NfYmcnKTtcclxuICAgICAgICBkZXNjX2JnLmF0dHIoe2FuY2hvclg6IDAuNSwgYW5jaG9yWTogMH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBsb3ZlTGlzdGVuZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuZ2V0T3duZXIoKS5wYXJlbnQucGFyZW50Lm9uTG92ZUxpc3RlbmVyKCk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuTG92ZUl0ZW1Db250cm9sbGVyLmNyZWF0ZSA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuICAgIHZhciBjb24gPSBuZXcgTG92ZUl0ZW1Db250cm9sbGVyKCk7XHJcbiAgICBjb24uaW5pdChvcHRpb25zKTtcclxuICAgIHJldHVybiBjb247XHJcbn1cclxuXHJcbkxvdmVJdGVtQ29udHJvbGxlci5ERUZBVUxUX09QVElPTlMgPSB7XHJcbiAgICBsdjogMSxcclxuICAgIHZhbHVlOiAxLFxyXG4gICAgY291bnQ6IDEwLFxyXG4gICAgY291bnROZWVkOiA5OSxcclxuICAgIHBvc2l0aW9uOiBjYy5wKDAsIDApXHJcbn07IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgQXJ0aHVyIG9uIDIwMTQvMTIvMjkuXHJcbiAqL1xyXG5cclxudmFyIFRyYWluSXRlbUNvbnRyb2xsZXIgPSBtb2R1bGUuZXhwb3J0cyA9ICBjY3MuQ29tQ29udHJvbGxlci5leHRlbmQoe1xyXG4gICAgY3RvcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5fc3VwZXIoKTtcclxuICAgICAgICB0aGlzLl9uYW1lID0gJ1RyYWluSXRlbUNvbnRyb2xsZXInO1xyXG4gICAgICAgIHRoaXMuREVGQVVMVF9DT1VOVCA9IDEwMDtcclxuICAgIH0sXHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24odGFzaywgcG9zKSB7XHJcbiAgICAgICAgdGhpcy5fdGFzayA9IHRhc2s7XHJcbiAgICAgICAgdGhpcy5fcG9zaXRpb24gPSBwb3M7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uRW50ZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9wb3NpdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLmdldE93bmVyKCkuc2V0UG9zaXRpb24odGhpcy5fcG9zaXRpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGJ0bl9zdGFydCA9IHRoaXMuX2J0bl9zdGFydCA9IHRoaXMuZ2V0T3duZXIoKS5nZXRDaGlsZEJ5TmFtZSgnYnRuX3N0YXJ0X3Rhc2snKTtcclxuICAgICAgICBidG5fc3RhcnQuc2V0VGl0bGVGb250U2l6ZSgyMCk7XHJcbiAgICAgICAgYnRuX3N0YXJ0LmFkZENsaWNrRXZlbnRMaXN0ZW5lcih0aGlzLnN0YXJ0TGlzdGVuZXIuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgICAgIHZhciBidG5fYWRkX2NvdW50ID0gdGhpcy5fYnRuX2FkZF9jb3VudCA9IHRoaXMuZ2V0T3duZXIoKS5nZXRDaGlsZEJ5TmFtZSgnYnRuX2NvdW50X2FkZCcpO1xyXG4gICAgICAgIGJ0bl9hZGRfY291bnQuYWRkQ2xpY2tFdmVudExpc3RlbmVyKHRoaXMuYWRkQ291bmRMaXN0ZW5lci5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgdGhpcy5fY291bnQgPSB0aGlzLmdldE93bmVyKCkuZ2V0Q2hpbGRCeU5hbWUoJ2NvdW50X3ZhbHVlJyk7XHJcbiAgICAgICAgdGhpcy5fY291bnQuc2V0U3RyaW5nKHRoaXMuREVGQVVMVF9DT1VOVCk7XHJcbiAgICAgICAgdGhpcy5fY291bnQuYXR0cih7YW5jaG9yWDogMCwgYW5jaG9yWTogMC41fSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3Rhc2tfbmFtZSA9IHRoaXMuZ2V0T3duZXIoKS5nZXRDaGlsZEJ5TmFtZSgndGFza19uYW1lJyk7XHJcbiAgICAgICAgdGhpcy5fdGFza19uYW1lLmF0dHIoe2FuY2hvclg6IDAsIGFuY2hvclk6IDAuNX0pO1xyXG4gICAgICAgIHRoaXMuX3Rhc2tfbmFtZS5zZXRTdHJpbmcodGhpcy5fdGFzay5nZXQoJ25hbWUnKSArICc6IOavj+asoSsnICsgdGhpcy5fdGFzay5nZXQoJ29idGFpblBlckNvdW50JykpO1xyXG5cclxuICAgICAgICB2YXIgdHh0X3Rhc2tfZGVzYyA9IHRoaXMuX3R4dF90YXNrX2Rlc2MgPSB0aGlzLmdldE93bmVyKCkuZ2V0Q2hpbGRCeU5hbWUoJ3R4dF90YXNrX2Rlc2MnKTtcclxuICAgICAgICB0eHRfdGFza19kZXNjLmF0dHIoe2FuY2hvclg6IDAsIGFuY2hvclk6IDAuNX0pO1xyXG4gICAgICAgIHRoaXMuc2V0VGFza0Rlc2MoKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnRMaXN0ZW5lcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5fYnRuX3N0YXJ0LnNldFRpdGxlVGV4dCgn6L+b6KGM5LitLi4uJyk7XHJcbiAgICAgICAgdGhpcy5fdGFzay5zdGFydCh0aGlzLmdldENvdW50KCkpO1xyXG4gICAgICAgIHRoaXMuc2V0VGFza0Rlc2MoKTtcclxuICAgICAgICAvL3RoaXMuZ2V0T3duZXIoKS5wYXJlbnQucGFyZW50Lm9uU3RhcnRUYXNrKHRoaXMuX3Rhc2spO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXRUYXNrQnV0dG9uVGl0bGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl90YXNrLmlzU3RhcnRlZCgpICYmICF0aGlzLl90YXNrLmlzRmluaXNoZWQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9idG5fc3RhcnQuc2V0VGl0bGVUZXh0KCfov5vooYzkuK0uLi4nKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9idG5fc3RhcnQuc2V0VGl0bGVUZXh0KCflvIDlp4vku7vliqEnKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHNldFRhc2tEZXNjOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAodGhpcy5fdGFzay5pc1N0YXJ0ZWQoKSAmJiAhdGhpcy5fdGFzay5pc0ZpbmlzaGVkKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fdHh0X3Rhc2tfZGVzYy5zZXRTdHJpbmcoY2MuZm9ybWF0U3RyKFxyXG4gICAgICAgICAgICAgICAgJ+S7u+WKoei/m+ihjOS4re+8jOWwhuWcqCVz5LmL5ZCO5a6M5oiQ77yB6aKE6K6h5aWW5YqxOislcycsXHJcbiAgICAgICAgICAgICAgICB0aGlzLl90YXNrLnRpbWVMZWZ0U3RyKCksXHJcbiAgICAgICAgICAgICAgICB0aGlzLl90YXNrLnRvdGFsT2J0YWluKClcclxuICAgICAgICAgICAgKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fdHh0X3Rhc2tfZGVzYy5zZXRTdHJpbmcoJ+aJp+ihjOS7u+WKoeWPr+S7peWinuWKoOebuOW6lOeahOWxnuaApycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldFRhc2tCdXR0b25UaXRsZSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICB0YXNrRmluaXNoZWQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuc2V0VGFza0Rlc2MoKTtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0Q291bnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBwYXJzZUludCh0aGlzLl9jb3VudC5nZXRTdHJpbmcoKSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGFkZENvdW5kTGlzdGVuZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuX2NvdW50LnNldFN0cmluZyhwYXJzZUludCh0aGlzLl9jb3VudC5nZXRTdHJpbmcoKSkgKyAxKTtcclxuICAgIH0sXHJcblxyXG4gICAgcmVkdWNlQ291bnRMaXN0ZW5lcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgfVxyXG59KTtcclxuXHJcblRyYWluSXRlbUNvbnRyb2xsZXIuY3JlYXRlID0gZnVuY3Rpb24obmFtZSwgcG9zKSB7XHJcbiAgICB2YXIgY29uID0gbmV3IFRyYWluSXRlbUNvbnRyb2xsZXIoKTtcclxuICAgIGNvbi5pbml0KG5hbWUsIHBvcyk7XHJcbiAgICByZXR1cm4gY29uO1xyXG59XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFydGh1ciBvbiAyMDE0LzEyLzIwLlxyXG4gKi9cclxudmFyIHJlcyA9IHJlcXVpcmUoJy4uLy4uL3Jlc291cmNlLmpzJykucmVzO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjYy5MYXllci5leHRlbmQoe1xyXG4gICAgX3Jvb3ROb2RlOiBudWxsLFxyXG5cclxuICAgIGN0b3I6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuX3N1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5fcm9vdE5vZGUgPSBjY3MuY3NMb2FkZXIuY3JlYXRlTm9kZShyZXMuTWFpbk5vZGUpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5fcm9vdE5vZGUpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbihwbGF5ZXIpIHtcclxuICAgICAgICB0aGlzLl9wbGF5ZXIgPSBwbGF5ZXI7XHJcbiAgICAgICAgdGhpcy51cGRhdGUocGxheWVyKTtcclxuXHJcbiAgICAgICAgdmFyIHJvb3ROb2RlID0gdGhpcy5fcm9vdE5vZGU7XHJcbiAgICAgICAgdmFyIGJ0bl90cmFpbiA9IHJvb3ROb2RlLmdldENoaWxkQnlOYW1lKCdtYWluX3BhbmVsJykuZ2V0Q2hpbGRCeU5hbWUoJ2J0bl90cmFpbicpO1xyXG4gICAgICAgIGJ0bl90cmFpbi5hZGRDbGlja0V2ZW50TGlzdGVuZXIodGhpcy5idXR0b25UcmFpbkxpc3RlbmVyLmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICB2YXIgYnRuX2xvdmUgPSByb290Tm9kZS5nZXRDaGlsZEJ5TmFtZSgnbWFpbl9wYW5lbCcpLmdldENoaWxkQnlOYW1lKCdidG5fbG92ZScpO1xyXG4gICAgICAgIGJ0bl9sb3ZlLmFkZENsaWNrRXZlbnRMaXN0ZW5lcih0aGlzLmJ1dHRvbkxvdmVMaXN0ZW5lci5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgdmFyIGJ0bl9maWdodCA9IHJvb3ROb2RlLmdldENoaWxkQnlOYW1lKCdtYWluX3BhbmVsJykuZ2V0Q2hpbGRCeU5hbWUoJ2J0bl9maWdodCcpO1xyXG4gICAgICAgIGJ0bl9maWdodC5hZGRDbGlja0V2ZW50TGlzdGVuZXIodGhpcy5idXR0b25GaWdodExpc3RlbmVyLmJpbmQodGhpcykpO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uKHBsYXllcikge1xyXG4gICAgICAgIHZhciBub2RlID0gdGhpcy5fcm9vdE5vZGU7XHJcbiAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZSgndHh0X2dvbGQnKS5zZXRTdHJpbmcocGxheWVyLmdldCgnZ29sZCcpKTtcclxuXHJcbiAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZSgnbWFpbl9wYW5lbCcpLmdldENoaWxkQnlOYW1lKCd0eHRfaHAnKS5zZXRTdHJpbmcocGxheWVyLmdldCgnaHAnKSk7XHJcbiAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZSgnbWFpbl9wYW5lbCcpLmdldENoaWxkQnlOYW1lKCd0eHRfYXRrJykuc2V0U3RyaW5nKHBsYXllci5nZXQoJ2F0aycpKTtcclxuICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCdtYWluX3BhbmVsJykuZ2V0Q2hpbGRCeU5hbWUoJ3R4dF9kZWZlbmNlJykuc2V0U3RyaW5nKHBsYXllci5nZXQoJ2RlZmVuY2UnKSk7XHJcbiAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZSgnbWFpbl9wYW5lbCcpLmdldENoaWxkQnlOYW1lKCd0eHRfdW5kZWZlbmNlJykuc2V0U3RyaW5nKHBsYXllci5nZXQoJ3VuZGVmZW5jZScpKTtcclxuICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCdtYWluX3BhbmVsJykuZ2V0Q2hpbGRCeU5hbWUoJ3R4dF9jcml0Jykuc2V0U3RyaW5nKHBsYXllci5nZXQoJ2NyaXQnKSk7XHJcbiAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZSgnbWFpbl9wYW5lbCcpLmdldENoaWxkQnlOYW1lKCd0eHRfdW5jcml0Jykuc2V0U3RyaW5nKHBsYXllci5nZXQoJ3VuY3JpdCcpKTtcclxuICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCdtYWluX3BhbmVsJykuZ2V0Q2hpbGRCeU5hbWUoJ3R4dF9kb2dldCcpLnNldFN0cmluZyhwbGF5ZXIuZ2V0KCdkb2RnZScpKTtcclxuICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCdtYWluX3BhbmVsJykuZ2V0Q2hpbGRCeU5hbWUoJ3R4dF9oaXQnKS5zZXRTdHJpbmcocGxheWVyLmdldCgnaGl0JykpO1xyXG4gICAgfSxcclxuXHJcbiAgICBidXR0b25UcmFpbkxpc3RlbmVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAodGhpcy5vblRyYWluKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25UcmFpbigpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgYnV0dG9uTG92ZUxpc3RlbmVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAodGhpcy5vbkxvdmUpIHtcclxuICAgICAgICAgICAgdGhpcy5vbkxvdmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGJ1dHRvbkZpZ2h0TGlzdGVuZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICh0aGlzLm9uRmlnaHQpIHtcclxuICAgICAgICAgICAgdGhpcy5vbkZpZ2h0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvblRhc2tGaW5pc2hlZDogZnVuY3Rpb24ocGxheWVyKSB7XHJcbiAgICAgICAgdGhpcy5fcGxheWVyID0gcGxheWVyO1xyXG4gICAgICAgIHRoaXMudXBkYXRlKHBsYXllcik7XHJcbiAgICB9XHJcbn0pOyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFydGh1ciBvbiAyMDE1LzEvNi5cclxuICovXHJcbnZhciByZXMgPSByZXF1aXJlKCcuLi8uLi9yZXNvdXJjZS5qcycpLnJlcztcclxudmFyIGNvbnN0YW50cyA9IHJlcXVpcmUoJy4uLy4uL2FwcENvbnN0YW50cy5qcycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjYy5MYXllci5leHRlbmQoe1xyXG4gICAgX2NvdW50OiAxMDAsXHJcblxyXG4gICAgY3RvcjogZnVuY3Rpb24oZ29sZCwgZnJlZUNvdW50KSB7XHJcbiAgICAgICAgdGhpcy5fc3VwZXIoKTtcclxuICAgICAgICB0aGlzLl9nb2xkID0gZ29sZDtcclxuICAgICAgICB0aGlzLl9mcmVlQ291bnQgPSBmcmVlQ291bnQ7XHJcblxyXG4gICAgICAgIHZhciByb290Tm9kZSA9IHRoaXMuX3Jvb3ROb2RlID0gY2NzLmNzTG9hZGVyLmNyZWF0ZU5vZGUocmVzLkxvdmVDb25maXJtTm9kZSk7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZChyb290Tm9kZSk7XHJcblxyXG4gICAgICAgIHZhciB3c2l6ZSA9IGNjLndpblNpemU7XHJcbiAgICAgICAgcm9vdE5vZGUuYXR0cih7XHJcbiAgICAgICAgICAgIHg6IHdzaXplLndpZHRoLzIsXHJcbiAgICAgICAgICAgIHk6IHdzaXplLmhlaWdodC8yLFxyXG4gICAgICAgICAgICBhbmNob3JYOiAwLjUsXHJcbiAgICAgICAgICAgIGFuY2hvclk6IDAuNSxcclxuICAgICAgICAgICAgd2lkdGg6IDQ1MCxcclxuICAgICAgICAgICAgaGVpZ2h0OiAzNTBcclxuICAgICAgICB9KTtcclxuICAgICAgICB2YXIgcGFuZWwgPSByb290Tm9kZS5nZXRDaGlsZEJ5TmFtZSgncGFuZWwnKTtcclxuICAgICAgICB2YXIgYnRuX2FkZCA9IHBhbmVsLmdldENoaWxkQnlOYW1lKCdidG5fYWRkJyk7XHJcbiAgICAgICAgYnRuX2FkZC5hZGRDbGlja0V2ZW50TGlzdGVuZXIodGhpcy5vbkFkZExpc3RlbmVyLmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICB2YXIgYnRuX29rID0gcGFuZWwuZ2V0Q2hpbGRCeU5hbWUoJ2J0bl9vaycpO1xyXG4gICAgICAgIGJ0bl9vay5hZGRDbGlja0V2ZW50TGlzdGVuZXIodGhpcy5vbk9rTGlzdGVuZXIuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgICAgIHZhciBidG5fY2FuY2VsID0gcGFuZWwuZ2V0Q2hpbGRCeU5hbWUoJ2J0bl9jYW5jZWwnKTtcclxuICAgICAgICBidG5fY2FuY2VsLmFkZENsaWNrRXZlbnRMaXN0ZW5lcih0aGlzLm9uQ2FuY2VsTGlzdGVuZXIuYmluZCh0aGlzKSk7XHJcblxyXG5cclxuICAgICAgICB0aGlzLl90eHRfZGVzYyA9IHBhbmVsLmdldENoaWxkQnlOYW1lKCd0eHRfZGVzYycpO1xyXG4gICAgICAgIHRoaXMuX3R4dF9kZXNjX3N0ciA9IHRoaXMuX3R4dF9kZXNjLmdldFN0cmluZygpO1xyXG4gICAgICAgIHRoaXMuX3R4dF9jb3VudCA9IHBhbmVsLmdldENoaWxkQnlOYW1lKCd0eHRfY291bnQnKTtcclxuICAgICAgICB0aGlzLl90eHRfY291bnRfc3RyID0gdGhpcy5fdHh0X2NvdW50LmdldFN0cmluZygpO1xyXG5cclxuICAgICAgICB0aGlzLmluaXQoZ29sZCk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKGdvbGQpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUNvdW50KHRoaXMuX2NvdW50LCB0aGlzLl9jb3VudCAtIHRoaXMuX2ZyZWVDb3VudCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZUNvdW50OiBmdW5jdGlvbihjb3VudCwgZ29sZCkge1xyXG4gICAgICAgIHRoaXMuX3R4dF9jb3VudC5zZXRTdHJpbmcoY2MuZm9ybWF0U3RyKHRoaXMuX3R4dF9jb3VudF9zdHIsIGNvdW50KSk7XHJcbiAgICAgICAgdGhpcy5fdHh0X2Rlc2Muc2V0U3RyaW5nKGNjLmZvcm1hdFN0cih0aGlzLl90eHRfZGVzY19zdHIsIGNvdW50LCBnb2xkKSlcclxuICAgIH0sXHJcblxyXG4gICAgb25BZGRMaXN0ZW5lcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5fY291bnQgKz0gMTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUNvdW50KHRoaXMuX2NvdW50LCB0aGlzLl9jb3VudCAtIHRoaXMuX2ZyZWVDb3VudCk7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uT2tMaXN0ZW5lcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2dvbGQgPiAodGhpcy5fY291bnQgLSB0aGlzLl9mcmVlQ291bnQpKSB7XHJcbiAgICAgICAgICAgIGNjLmV2ZW50TWFuYWdlci5kaXNwYXRjaEN1c3RvbUV2ZW50KFxyXG4gICAgICAgICAgICAgICAgY29uc3RhbnRzLkNVU1RPTV9OT1RJQ0lDQVRJT04sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogY29uc3RhbnRzLkxPVkVfQUNUSU9OLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnQ6IHRoaXMuX2NvdW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnb2xkOiB0aGlzLl9jb3VudCAtIHRoaXMuX2ZyZWVDb3VudFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2MubG9nKCfpkrvnn7PkuI3otrPvvIzor7fliLDlhYXlgLznlYzpnaLlhYXlgLwnKTtcclxuICAgICAgICAgICAgY2MuZXZlbnRNYW5hZ2VyLmRpc3BhdGNoQ3VzdG9tRXZlbnQoXHJcbiAgICAgICAgICAgICAgICBjb25zdGFudHMuQ1VTVE9NX05PVElDSUNBVElPTixcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBjb25zdGFudHMuQ09ORklSTV9ESUFMT0csXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjOiAn5L2g55qE6ZK755+z5LiN6Laz5Lul5omn6KGM5q2k5qyh54yu5ZC7XFxu56Gu5a6a5Y675YWF5YC85ZCX77yfJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MuZXZlbnRNYW5hZ2VyLmRpc3BhdGNoQ3VzdG9tRXZlbnQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3RhbnRzLkNVU1RPTV9OT1RJQ0lDQVRJT04sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBjb25zdGFudHMuU0NFTkVfQUNUSU9OLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBjb25zdGFudHMuU0NFTkUuSE9NRVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uQ2FuY2VsTGlzdGVuZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgfVxyXG59KTsiLCIvKipcclxuICogQ3JlYXRlZCBieSBBcnRodXIgb24gMjAxNC8xMi8yOS5cclxuICovXHJcbnZhciByZXMgPSByZXF1aXJlKCcuLi8uLi9yZXNvdXJjZS5qcycpLnJlcztcclxudmFyIExvdmVJdGVtQ29udHJvbGxlciA9IHJlcXVpcmUoJy4vY29udHJvbGxlci9sb3ZlSXRlbScpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjYy5MYXllci5leHRlbmQoe1xyXG4gICAgY3RvcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5fc3VwZXIoKTtcclxuICAgICAgICB2YXIgcm9vdE5vZGUgPSB0aGlzLl9yb290Tm9kZSA9IGNjcy5jc0xvYWRlci5jcmVhdGVOb2RlKHJlcy5Mb3ZlTGF5ZXIpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQocm9vdE5vZGUpO1xyXG5cclxuICAgICAgICB2YXIgYnRuX2JhY2sgPSByb290Tm9kZS5nZXRDaGlsZEJ5TmFtZSgnYnRuX2JhY2snKTtcclxuICAgICAgICBidG5fYmFjay5hZGRDbGlja0V2ZW50TGlzdGVuZXIodGhpcy5vbkJhY2tMaXN0ZW5lci5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKGl0ZW1zKSB7XHJcbiAgICAgICAgdmFyIHAgPSB0aGlzLl9yb290Tm9kZS5nZXRDaGlsZEJ5TmFtZSgnZGVzY19iZycpLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgcC55ID0gcC55IC0gMTMzO1xyXG4gICAgICAgIHZhciBvcHRpb24sIGk7XHJcbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgb3B0aW9uID0gaXRlbXNbaV07XHJcbiAgICAgICAgICAgIG9wdGlvbi5wb3NpdGlvbiA9IGNjLnAoMCwgcC55IC0gODUqaSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgbG92ZUl0ZW0gPSBjY3MuY3NMb2FkZXIuY3JlYXRlTm9kZShyZXMuTG92ZUl0ZW0pO1xyXG4gICAgICAgICAgICBsb3ZlSXRlbS5hZGRDb21wb25lbnQoTG92ZUl0ZW1Db250cm9sbGVyLmNyZWF0ZShvcHRpb24pKTtcclxuICAgICAgICAgICAgdGhpcy5fcm9vdE5vZGUuYWRkQ2hpbGQobG92ZUl0ZW0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fdHh0X2Rlc2MgPSB0aGlzLl9yb290Tm9kZS5nZXRDaGlsZEJ5TmFtZSgndHh0X2Rlc2MnKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUx2KDEpO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGVMdjogZnVuY3Rpb24obHYpIHtcclxuICAgICAgICB0aGlzLl90eHRfZGVzYy5zZXRTdHJpbmcoJ+W9k+WJjeiZnuWnrOS5i+eIsScgKyBsdiArICfnuqcsIOavj+WkqeWJjTkw5qyh54yu5ZC75YWN6LS5Jyk7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uQmFja0xpc3RlbmVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoY2MuaXNGdW5jdGlvbih0aGlzLm9uQmFjaykpIHtcclxuICAgICAgICAgICAgdGhpcy5vbkJhY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG92ZUxpc3RlbmVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoY2MuaXNGdW5jdGlvbih0aGlzLnNob3dMb3ZlQ29uZmlybSkpe1xyXG4gICAgICAgICAgICB0aGlzLnNob3dMb3ZlQ29uZmlybSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG59KTsiLCIvKipcclxuICogQ3JlYXRlZCBieSBBcnRodXIgb24gMjAxNC8xMi8yMS5cclxuICovXHJcbnZhciByZXMgPSByZXF1aXJlKCcuLi8uLi9yZXNvdXJjZS5qcycpLnJlcztcclxudmFyIFRyYWluSXRlbUNvbnRyb2xsZXIgPSByZXF1aXJlKCcuL2NvbnRyb2xsZXIvdHJhaW5JdGVtJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGNjLkxheWVyLmV4dGVuZCh7XHJcbiAgICBjdG9yOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLl9zdXBlcigpO1xyXG4gICAgICAgIHZhciB0cmFpbk5vZGUgPSB0aGlzLl90cmFpbk5vZGUgPSBjY3MuY3NMb2FkZXIuY3JlYXRlTm9kZShyZXMuVHJhaW5Ob2RlKTtcclxuICAgICAgICB0aGlzLmFkZENoaWxkKHRyYWluTm9kZSk7XHJcblxyXG4gICAgICAgIHZhciBidG5fYmFjayA9IHRyYWluTm9kZS5nZXRDaGlsZEJ5TmFtZSgnUGFuZWxfMScpLmdldENoaWxkQnlOYW1lKCdidG5fYmFjaycpO1xyXG4gICAgICAgIGJ0bl9iYWNrLmFkZENsaWNrRXZlbnRMaXN0ZW5lcih0aGlzLm9uQmFja0xpc3RlbmVyLmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24odGFza0xpc3QpIHtcclxuICAgICAgICB2YXIgc2l6ZSA9IGNjLndpblNpemU7XHJcbiAgICAgICAgdmFyIGJhc2VZID0gc2l6ZS5oZWlnaHQqODQvMTAwO1xyXG4gICAgICAgIHZhciBpID0gMDtcclxuICAgICAgICBmb3IgKHZhciBpZCBpbiB0YXNrTGlzdCkge1xyXG4gICAgICAgICAgICB2YXIgdGFzayA9IHRhc2tMaXN0W2lkXTtcclxuICAgICAgICAgICAgdmFyIHkgPSBiYXNlWSAtIDEwMCooaSsxKTtcclxuICAgICAgICAgICAgdmFyIHRhc2tOb2RlID0gY2NzLmNzTG9hZGVyLmNyZWF0ZU5vZGUocmVzLlRhc2tOb2RlKTtcclxuICAgICAgICAgICAgdGFza05vZGUuYWRkQ29tcG9uZW50KFRyYWluSXRlbUNvbnRyb2xsZXIuY3JlYXRlKHRhc2ssIGNjLnAoMCwgeSkpKTtcclxuICAgICAgICAgICAgdGhpcy5fdHJhaW5Ob2RlLmFkZENoaWxkKHRhc2tOb2RlLCAxMCwgdGFzay5nZXQoJ2lkJykpO1xyXG4gICAgICAgICAgICBpID0gaSArIDE7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkJhY2tMaXN0ZW5lcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMub25CYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25CYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvblN0YXJ0VGFzazogZnVuY3Rpb24odGFzaykge1xyXG4gICAgICAgIGlmICh0aGlzLm9uVGFzaykge1xyXG4gICAgICAgICAgICB0aGlzLm9uVGFzayh0YXNrKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uVGFza0ZpbmlzaGVkOiBmdW5jdGlvbih0YXNrKSB7XHJcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLl90cmFpbk5vZGUuZ2V0Q2hpbGRCeVRhZyh0YXNrLmdldCgnaWQnKSk7XHJcbiAgICAgICAgdmFyIGN0cmwgPSBub2RlLmdldENvbXBvbmVudCgnVHJhaW5JdGVtQ29udHJvbGxlcicpO1xyXG4gICAgICAgIGlmIChjdHJsKSB7XHJcbiAgICAgICAgICAgIGN0cmwudGFza0ZpbmlzaGVkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTsiLCIvKipcclxuICogQ3JlYXRlZCBieSBBcnRodXIgb24gMjAxNC8xMi8yMS5cclxuICovXHJcblxyXG52YXIgcHVyZW12YyA9IHJlcXVpcmUoJ3B1cmVtdmMnKS5wdXJlbXZjO1xyXG52YXIgU2NlbmVNZWRpYXRvciA9IHJlcXVpcmUoJy4vc2NlbmVNZWRpYXRvci5qcycpO1xyXG52YXIgY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vLi4vYXBwQ29uc3RhbnRzLmpzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHB1cmVtdmMuZGVmaW5lKFxyXG4gICAgLy8gQ0xBU1MgSU5GT1xyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICd2aWV3Lm1lZGlhdG9yLkRpcmVjdG9yTWVkaWF0b3InLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5NZWRpYXRvcixcclxuICAgICAgICBjb25zdHJ1Y3RvcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHB1cmVtdmMuTWVkaWF0b3IuY2FsbCh0aGlzLCB0aGlzLmNvbnN0cnVjdG9yLk5BTUUpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgLyoqIEBvdmVycmlkZSAqL1xyXG4gICAgICAgIGxpc3ROb3RpZmljYXRpb25JbnRlcmVzdHM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgIGNvbnN0YW50cy5OT1RJRklDQVRJT04uU0NFTkVfQ0hBTkdFRFxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKiBAb3ZlcnJpZGUgKi9cclxuICAgICAgICBoYW5kbGVOb3RpZmljYXRpb246IGZ1bmN0aW9uIChub3RpZmljYXRpb24pIHtcclxuICAgICAgICAgICAgY2MubG9nKCdoYW5kbGVyIG5vdGlmaWNhdGlvbiBvbiBkaXJlY3RvciBtZWRpYXRvcicpXHJcbiAgICAgICAgICAgIHN3aXRjaCAobm90aWZpY2F0aW9uLmdldE5hbWUoKSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBjb25zdGFudHMuTk9USUZJQ0FUSU9OLlNDRU5FX0NIQU5HRUQ6XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jYy5sb2coJ1NDRU5FX0NIQU5HRUQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjZW5lTWVkaWF0b3IgPSB0aGlzLmZhY2FkZS5yZXRyaWV2ZU1lZGlhdG9yKFNjZW5lTWVkaWF0b3IuTkFNRSApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihzY2VuZU1lZGlhdG9yICYmIHNjZW5lTWVkaWF0b3IuZ2V0Vmlld0NvbXBvbmVudCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLnJ1blNjZW5lKHNjZW5lTWVkaWF0b3IuZ2V0Vmlld0NvbXBvbmVudCgpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqIEBvdmVycmlkZSAqL1xyXG4gICAgICAgIG9uUmVnaXN0ZXI6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqIEBvdmVycmlkZSAqL1xyXG4gICAgICAgIG9uUmVtb3ZlOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6ICdEaXJlY3Rvck1lZGlhdG9yJ1xyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBBcnRodXIgb24gMjAxNC8xMi8yMC5cclxuICovXHJcbnZhciBwdXJlbXZjID0gcmVxdWlyZSgncHVyZW12YycpLnB1cmVtdmM7XHJcbnZhciBjb25zdGFudHMgPSByZXF1aXJlKCcuLi8uLi9hcHBDb25zdGFudHMuanMnKTtcclxudmFyIFBsYXllclByb3h5ID0gcmVxdWlyZSgnLi4vLi4vbW9kZWwvcHJveHkvcGxheWVyUHJveHkuanMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ2ZpZ2h0ZXIudmlldy5tZWRpYXRvci5Ib21lTWVkaWF0b3InLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5NZWRpYXRvclxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBpbnN0YW5jZSBtZW1iZXJzXHJcbiAgICB7XHJcbiAgICAgICAgLyoqIEBvdmVycmlkZSAqL1xyXG4gICAgICAgIGxpc3ROb3RpZmljYXRpb25JbnRlcmVzdHM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gW2NvbnN0YW50cy5QTEFZRVJfQUNUSU9OXTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKiogQG92ZXJyaWRlICovXHJcbiAgICAgICAgaGFuZGxlTm90aWZpY2F0aW9uOiBmdW5jdGlvbihub3RlKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaChub3RlLmdldE5hbWUoKSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBjb25zdGFudHMuUExBWUVSX0FDVElPTjpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdDb21wb25lbnQudXBkYXRlKHRoaXMuZ2V0UGxheWVyKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqIEBvdmVycmlkZSAqL1xyXG4gICAgICAgIG9uUmVnaXN0ZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKiogQG92ZXJyaWRlICovXHJcbiAgICAgICAgb25SZW1vdmU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciBIb21lTGF5ZXIgPSByZXF1aXJlKCcuLy4uL2NvbXBvbmVudC9ob21lTGF5ZXIuanMnKTtcclxuICAgICAgICAgICAgc2VsZi52aWV3Q29tcG9uZW50ID0gbmV3IEhvbWVMYXllcigpO1xyXG4gICAgICAgICAgICBzZWxmLnZpZXdDb21wb25lbnQuaW5pdCh0aGlzLmdldFBsYXllcigpKTtcclxuXHJcbiAgICAgICAgICAgIHNlbGYudmlld0NvbXBvbmVudC5vblRyYWluID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2VuZE5vdGlmaWNhdGlvbihjb25zdGFudHMuU0NFTkVfQUNUSU9OLCB7bmFtZTogY29uc3RhbnRzLlNDRU5FLlRSQUlOfSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBzZWxmLnZpZXdDb21wb25lbnQub25Mb3ZlID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2VuZE5vdGlmaWNhdGlvbihjb25zdGFudHMuU0NFTkVfQUNUSU9OLCB7bmFtZTogY29uc3RhbnRzLlNDRU5FLkxPVkV9KTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHNlbGYudmlld0NvbXBvbmVudC5vbkZpZ2h0ID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2VuZE5vdGlmaWNhdGlvbihjb25zdGFudHMuU0NFTkVfQUNUSU9OLCB7bmFtZTogY29uc3RhbnRzLlNDRU5FLkZJR0hUfSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ2V0UGxheWVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHBsYXllclByb3h5ID0gdGhpcy5mYWNhZGUucmV0cmlldmVQcm94eShQbGF5ZXJQcm94eS5OQU1FKTtcclxuICAgICAgICAgICAgcmV0dXJuIHBsYXllclByb3h5LmdldFBsYXllcigpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGdldFJlc291cmNlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBzdGF0aWMgbWVtYmVyc1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6ICdIb21lTWVkaWF0b3InXHJcbiAgICB9XHJcbikiLCIvKipcclxuICogQ3JlYXRlZCBieSBBcnRodXIgb24gMjAxNC8xMi8yOS5cclxuICovXHJcbnZhciBwdXJlbXZjID0gcmVxdWlyZSgncHVyZW12YycpLnB1cmVtdmM7XHJcbnZhciBjb25zdGFudHMgPSByZXF1aXJlKCcuLi8uLi9hcHBDb25zdGFudHMuanMnKTtcclxudmFyIFBsYXllclByb3h5ID0gcmVxdWlyZSgnLi4vLi4vbW9kZWwvcHJveHkvcGxheWVyUHJveHkuanMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ2ZpZ2h0ZXIudmlldy5tZWRpYXRvci5Mb3ZlTWVkaWF0b3InLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5NZWRpYXRvclxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBpbnN0YW5jZSBtZW1iZXJzXHJcbiAgICB7XHJcbiAgICAgICAgLyoqIEBvdmVycmlkZSAqL1xyXG4gICAgICAgIGxpc3ROb3RpZmljYXRpb25JbnRlcmVzdHM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gW2NvbnN0YW50cy5MT1ZFX0FDVElPTl07XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqIEBvdmVycmlkZSAqL1xyXG4gICAgICAgIGhhbmRsZU5vdGlmaWNhdGlvbjogZnVuY3Rpb24obm90ZSkge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG5vdGUuZ2V0TmFtZSgpKXtcclxuICAgICAgICAgICAgICAgIGNhc2UgY29uc3RhbnRzLkxPVkVfQUNUSU9OOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG92ZVN1Y2Nlc3Mobm90ZS5nZXRCb2R5KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqIEBvdmVycmlkZSAqL1xyXG4gICAgICAgIG9uUmVnaXN0ZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKiogQG92ZXJyaWRlICovXHJcbiAgICAgICAgb25SZW1vdmU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgTG92ZUxheWVyID0gcmVxdWlyZSgnLi8uLi9jb21wb25lbnQvbG92ZUxheWVyLmpzJyk7XHJcbiAgICAgICAgICAgIHNlbGYudmlld0NvbXBvbmVudCA9IG5ldyBMb3ZlTGF5ZXIoKTtcclxuXHJcbiAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgIFRPRE86IGdldCBsb3ZlIGluZm9cclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHNlbGYudmlld0NvbXBvbmVudC5pbml0KHRoaXMuZ2V0TG92ZUl0ZW1zKCkpO1xyXG5cclxuICAgICAgICAgICAgc2VsZi52aWV3Q29tcG9uZW50Lm9uQmFjayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zZW5kTm90aWZpY2F0aW9uKGNvbnN0YW50cy5TQ0VORV9BQ1RJT04sIHtuYW1lOiBjb25zdGFudHMuU0NFTkUuSE9NRX0pO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgc2VsZi52aWV3Q29tcG9uZW50LnNob3dMb3ZlQ29uZmlybSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBsYXllclByb3h5ID0gc2VsZi5mYWNhZGUucmV0cmlldmVQcm94eShQbGF5ZXJQcm94eS5OQU1FKTtcclxuICAgICAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBwbGF5ZXJQcm94eS5nZXRQbGF5ZXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgTG92ZUNvbmZpcm1MYXllciA9IHJlcXVpcmUoJy4vLi4vY29tcG9uZW50L2xvdmVDb25maXJtTGF5ZXIuanMnKTtcclxuICAgICAgICAgICAgICAgIHZhciBsYXllciA9IG5ldyBMb3ZlQ29uZmlybUxheWVyKHBsYXllci5nZXQoJ2dvbGQnKSwgcGxheWVyLmdldCgnZGFpbHlDb3VudCcpLmZyZWVMb3ZlKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2VuZE5vdGlmaWNhdGlvbihjb25zdGFudHMuU0NFTkVfQUNUSU9OX0FERF9DSElMRCwgbGF5ZXIpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgc2VsZi52aWV3Q29tcG9uZW50LmV4ZWN1dGVMb3ZlID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGxvdmVTdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIGNjLmxvZygnZGFzZGZhc2Rmc2FmZC0tLS0tLS0tJywgZGF0YSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ2V0UmVzb3VyY2U6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBnZXRMb3ZlSXRlbXM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGx2OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50OiAxMCxcclxuICAgICAgICAgICAgICAgICAgICBjb3VudE5lZWQ6IDk5XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGx2OiAyLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50OiAxMCxcclxuICAgICAgICAgICAgICAgICAgICBjb3VudE5lZWQ6IDk5XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGx2OiAzLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50OiAxMCxcclxuICAgICAgICAgICAgICAgICAgICBjb3VudE5lZWQ6IDk5XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGx2OiA0LFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50OiAxMCxcclxuICAgICAgICAgICAgICAgICAgICBjb3VudE5lZWQ6IDk5XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGx2OiA1LFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50OiAxMCxcclxuICAgICAgICAgICAgICAgICAgICBjb3VudE5lZWQ6IDk5XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGx2OiA2LFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50OiAxMCxcclxuICAgICAgICAgICAgICAgICAgICBjb3VudE5lZWQ6IDk5XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGx2OiA3LFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50OiAxMCxcclxuICAgICAgICAgICAgICAgICAgICBjb3VudE5lZWQ6IDk5XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGx2OiA4LFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50OiAxMCxcclxuICAgICAgICAgICAgICAgICAgICBjb3VudE5lZWQ6IDk5XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGx2OiA5LFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50OiAxMCxcclxuICAgICAgICAgICAgICAgICAgICBjb3VudE5lZWQ6IDk5XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBzdGF0aWMgbWVtYmVyc1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6ICdMb3ZlTWVkaWF0b3InXHJcbiAgICB9XHJcbik7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgQXJ0aHVyIG9uIDIwMTQvMTIvMjEuXHJcbiAqL1xyXG5cclxudmFyIHB1cmVtdmMgPSByZXF1aXJlKCdwdXJlbXZjJykucHVyZW12YztcclxudmFyIGNvbnN0YW50cyA9IHJlcXVpcmUoJy4uLy4uL2FwcENvbnN0YW50cy5qcycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBwdXJlbXZjLmRlZmluZVxyXG4oXHJcbiAgICAvLyBDTEFTUyBJTkZPXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ2ZpZ2h0ZXIudmlldy5tZWRpYXRvci5TY2VuZU1lZGlhdG9yJyxcclxuICAgICAgICBwYXJlbnQ6IHB1cmVtdmMuTWVkaWF0b3JcclxuICAgIH0sXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgX2luaXRpYWxpemVkOiBmYWxzZSxcclxuXHJcbiAgICAgICAgbG9hZGVySW1hZ2U6IFwiZGF0YTppbWFnZS9qcGVnO2Jhc2U2NCwvOWovNFFBWVJYaHBaZ0FBU1VrcUFBZ0FBQUFBQUFBQUFBQUFBUC9zQUJGRWRXTnJlUUFCQUFRQUFBQWxBQUQvNFFNcGFIUjBjRG92TDI1ekxtRmtiMkpsTG1OdmJTOTRZWEF2TVM0d0x3QThQM2h3WVdOclpYUWdZbVZuYVc0OUl1Kzd2eUlnYVdROUlsYzFUVEJOY0VObGFHbEllbkpsVTNwT1ZHTjZhMk01WkNJL1BpQThlRHA0YlhCdFpYUmhJSGh0Ykc1ek9uZzlJbUZrYjJKbE9tNXpPbTFsZEdFdklpQjRPbmh0Y0hSclBTSkJaRzlpWlNCWVRWQWdRMjl5WlNBMUxqQXRZekEyTUNBMk1TNHhNelEzTnpjc0lESXdNVEF2TURJdk1USXRNVGM2TXpJNk1EQWdJQ0FnSUNBZ0lDSStJRHh5WkdZNlVrUkdJSGh0Ykc1ek9uSmtaajBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TVRrNU9TOHdNaTh5TWkxeVpHWXRjM2x1ZEdGNExXNXpJeUkrSUR4eVpHWTZSR1Z6WTNKcGNIUnBiMjRnY21SbU9tRmliM1YwUFNJaUlIaHRiRzV6T25odGNFMU5QU0pvZEhSd09pOHZibk11WVdSdlltVXVZMjl0TDNoaGNDOHhMakF2YlcwdklpQjRiV3h1Y3pwemRGSmxaajBpYUhSMGNEb3ZMMjV6TG1Ga2IySmxMbU52YlM5NFlYQXZNUzR3TDNOVWVYQmxMMUpsYzI5MWNtTmxVbVZtSXlJZ2VHMXNibk02ZUcxd1BTSm9kSFJ3T2k4dmJuTXVZV1J2WW1VdVkyOXRMM2hoY0M4eExqQXZJaUI0YlhCTlRUcEViMk4xYldWdWRFbEVQU0o0YlhBdVpHbGtPak00TURCRU1EWTJRVFUxTWpFeFJURkJRVEF6UWpFek1VTkZOek14UmtRd0lpQjRiWEJOVFRwSmJuTjBZVzVqWlVsRVBTSjRiWEF1YVdsa09qTTRNREJFTURZMVFUVTFNakV4UlRGQlFUQXpRakV6TVVORk56TXhSa1F3SWlCNGJYQTZRM0psWVhSdmNsUnZiMnc5SWtGa2IySmxJRkJvYjNSdmMyaHZjQ0JEVXpVZ1YybHVaRzkzY3lJK0lEeDRiWEJOVFRwRVpYSnBkbVZrUm5KdmJTQnpkRkpsWmpwcGJuTjBZVzVqWlVsRVBTSjRiWEF1YVdsa09rVTJSVGswT0VNNE9FUkNOREV4UlRFNU5FVXlSa0UzTTBNM1FrRTFOVGxFSWlCemRGSmxaanBrYjJOMWJXVnVkRWxFUFNKNGJYQXVaR2xrT2tVMlJUazBPRU01T0VSQ05ERXhSVEU1TkVVeVJrRTNNME0zUWtFMU5UbEVJaTgrSUR3dmNtUm1Pa1JsYzJOeWFYQjBhVzl1UGlBOEwzSmtaanBTUkVZK0lEd3ZlRHA0YlhCdFpYUmhQaUE4UDNod1lXTnJaWFFnWlc1a1BTSnlJajgrLys0QURrRmtiMkpsQUdUQUFBQUFBZi9iQUlRQURRa0pDUW9KRFFvS0RSTU1Dd3dURmhFTkRSRVdHaFVWRmhVVkdoa1VGaFVWRmhRWkdSMGZJQjhkR1Njbktpb25Kems0T0RnNVFFQkFRRUJBUUVCQVFBRU9EQXdPRUE0UkR3OFJGQTRSRGhRVkVSSVNFUlVmRlJVWEZSVWZLQjBaR1JrWkhTZ2pKaUFnSUNZakxDd29LQ3dzTnpjMU56ZEFRRUJBUUVCQVFFQkEvOEFBRVFnQXlBQ2dBd0VpQUFJUkFRTVJBZi9FQUxBQUFBRUZBUUVBQUFBQUFBQUFBQUFBQUFRQUFnTUZCZ2NCQVFFQUF3RUJBQUFBQUFBQUFBQUFBQUFBQVFNRUFnVVFBQUlCQWdJRUJ3b0xCZ1FHQXdBQUFBRUNBd0FFRVFVaE1SSUdRVkZ4c1RJVEZHR0J3ZEVpUWxLU016V1JvZUZpY3FLeUkxTnpGWUpqSkRRV0I5S2pWQ2J4d2tOa0pXWGlrM1FSQUFJQkFnTUZCUWNEQlFFQUFBQUFBQUFCQWhFRElSSUVNVUZSY1RKaHdWSVVCWkdoc1NKeUV6T0IwVUxoWXBJalV4WC8yZ0FNQXdFQUFoRURFUUEvQU1KU3BVcUFWS2xYdUZBZVVxOXdwVUI1WHVGZTRWNm9vRHpaSERveDBDbkdNaW56d2w3WjhOYWphSGVvTzN2bVRCWkJ0cDlZVUlxVEVWNVJPeEhLbldSbmFVOFZSTWhGQlVqcFY3aFNvU2VVcTlwVUI1U3IybGhRSGxLdmNLOG9CVjdoU0ZTUnJ0YUtBWnMwN1lOUE0xcEcyeEpJQXcxalNlYW5kcnkvOFg0bThWQ0trV3dhV3dhbTdYbC80djFXOFZMdG1YL2kvVmJ4VW9La1d3YWtTTTQwN3RtWC9pL1ZieFVtekd3alFzamRZNDFJQVJpZS9VMEliWk8wa050Q1huT0NrRUJlRnU0S0kzQnM3RE5iMjd5YStqRHgza0plRW5wSkpFY1FWYldEc2sxN3U1dXJkNTkxdWNaa1doeW0yVm5kOVJrQ0RFcEZ4RFJwYncwYnVudTVtbHAyRGUyRk1MWVhPRDJ3QjJ4Yk9lcmFVY1lHSjcybWxTVWlxenpkek1kM1ozbWl4bHRBMnl6Y0svTmxITTFEUXlSWGNlMUhvY2ROT0VmSlhaODh5OVpvak9xaGlCc3pJUmlIUThZNGNLNVR2SHV6TGxqSE5NcXhOb0RqTEZyYUhIbmpQeGNOQ0dWYnhFVXpZTlR4NWpaU3hocFc2cVR6bHdKK0RDdk8yWmYrTDlWdkZTZ3F5SFlOTFlOVGRzc1B4ZmlieFV1MTVmOEFpL1ZQaXFDYWtPd2E4MkRVL2E4di9GK0p2RlREZFdQQkw4UjhWS0N2WVJZVjVVem9NQXk2UWRJSXFJMEI0S0p0eGlSUXdvdTE2UW9HVWtudEg1VHowUmJaYm1GMmhrdHJhU1ZCbzJsVWtZOHREeWUwZmxQUFhUc2xWVXlpeVZSc2pxVU9BNHlNVDhkVzJyYW0ybTZVVlROcTlTN0VJeVVWSnlkTVRuLzZEblAraW05V2wrZzV6L29wdlZycHRlRWhRV1k0QWFTVHdBVmY1V1BpWmgvOVM1L3pqN3psdHpsbVlXa2ZXWE52SkRHVGdHY1lESGlyUjdpN21TYndYUGFyc0ZNcmdiN3c2akt3L3dDbW5jOUkxNGtGM3ZwdkNsamJNeVdNT0pMNGFFaUI4cVUvT2JVSzdIWVdWcmwxcEZaV2lDT0NCUXFLT0xqUEdUck5aWnFLYlVYVkhxMm5Od1R1SlJrMVZwYmdYTjhzN1JrNXltMFVRUXpoSUcyTkFqaHhIV2JJK2dDQlZqQkJGYnd4d1FxRWlpVUpHZzFCVkdBRmU3ZFYyOFdZTFlaRm1GMlRoMVVEN0pHanltR3luMWlLNU95eklCR0IxSGdyTFpoYW16dW1RQUdKd1NxblNDaDFxM0dPQ29keHQ0Y3h1cmRjcHp1TjRjeWhpV2FGNUJnMDl1ZFVtbld3MUgvalY5bkZ1SjdRdW8rOGg4cGVUaEZBKzA0N3ZkdXlNdGs3ZllxVGwwN1lGZGZVdWZNUHpUNXA3MVVkdGxtWVhhR1MydDNtUUhBc2d4QU5kYWRZSm9wTGU0UVMyODY3RXNaNFFmQ05ZckNGYmpkRFBtZ2tZeVdGeGdWZjA0aWZKZjZTY05kUlVXMVhCYjZGVTVUakY1RXBTU3JHdS9zNWxOK2c1ei9vcHZWcGZvT2Mvd0NpbTlXdGRIbmF0dk9iSlhEVzd4TEdoQjhuclBhWTkvSENyK3RFZFBDVmFTZURvWUxucUY2M2x6VzQvUEZTVzNlY3hiSTg0VlN6V1V3VWFTZGcwRFhYSzVudkFpcG5kNnFnS3ZXblFPN3ByaTlaVUVtbTNWbDJqMWtyOHBSbEZSeXF1Qk5aakd4US9TNTZZMVMyZnU5T1Z1ZW9uMTFTemFob291MDZRb1FVWGFkSVZDRDJGSko3UitVODlkTXlkdjhBeGRuK1RIOW11WnllMGZsUFBYUXN0bEs1VGJrYTFnVWpsQzFxMHZWTGtlYjZyK08zVHg5eGNZMW50OGMwTnJaQ3lpT0UxMTA4TllqR3Yxam9vN0pzMWp6S3lTY1lMSXZrekw2TER3SFhWSmtzSDlTYjQ5ZEtOcTB0ajFqQTZ1cmlPQ0wrMDJGV1g3aVZ0WlgxL0F6YUhUeWVvYXVLbjJNWDlXNzl6ZWJpWkN1UjVNalNyaGZYdUV0d1RyVWVaSCt5TmZkclJOY3hJNkl6aFhsSkVhazZXSUdKMlJ3NENoV25DaG5kdGxWQkxNZFFBMGsxZ2JYTk16ekRmRExzNm1qYVBLcHBKYld3SjFiT3d3eHc0M09uSGg3MVlUM0RwZldVSm1GbGI1akhIRGRlWEJISXNyUmVhNVRTcXZ4cUcwNGNOTjYydmV0b0NTNHRyZTVtZ25rR0U5cSszREtPa3VJMldYNkxEUVJSSFdEaDFVQ3R3ajdRUmcyd2RsOERqZ3cxcWU3WHZXMEJRM2tmWjdtU0xnVStUOUU2UlZibnVWcm5XVlNXcWorTHQ4WmJSdUhFZEtQa1lWY1oyTUpZNWZTR3llVmFyNDUrcmtXUUhBcWNjYWxQRTVrbTFodFdLNW5LNFdudDVGdVVCVXdPTUc0bkdrQS9CWFVyVzRTNnRvcmxPak1nY2QveFZuN3JMbzd6S3MwdUVqQ05lU3Zkd29CaGdzWnhYMWwyajM2azNMdSt1eXByZGo1VnM1QStpL2xENDhhMGFhVkpPUGk3akI2bGJ6V296cGpCNDhwZjFORFhOTjR2Zmw3K1o0QlhTNjVwdkY3OHZmelBBSzcxWFRIbVovUy95VCtqdko3TDNmSHl0ejFFK3VwYkwrUWo1VzU2amZYV1Juc0lZS0x0ZWtLRUZHV3ZTRlFneWprOW8vS2VldDNZdGhsTVAvNXg5bXNKSjdSK1U4OWJpeWIvQU1YRXY3Z0Q2dGFkTDFUK2t3ZXBSckMzOVprTERNYml3TXZVSFJQRzBiamxHZzhvcmUvMjNzeEJsZHhmTVBMdXBOaFQ4eUwvQU9STlpiZHpKNDg0c2N5dHhnTHFKWTVMWmo2UTJzVjVHMVZ1ZDFtamp5RzBpajBORUdTWlRvS3loanRxdzR3YXp0dWlYQTNxS1RiU3hsdGZHaGJabEU5NVp0WnF4VmJnaU9aaHJFUjlwaDNTdms5K3BKSUxaNFk0REdCRkNVTUtqUnNHUG9iUEZoVWZXME5KbWxqRTJ4SmNJcmNJMnZGVUVsbjFsUlhkNmxyYXpYVDlHQ05wRCt5TnFvSTdtT1ZkdU53Nm56bE9Jb1BPVWE2eXllMVhYY2JNUjVHZFEzeFkwQlNiajMxL0ZjVFFaaXJKK3E0MzFxN2FuYkhDVFo3MkJ3N2xiUHJLQk1jQldOTmdiTUJCaCtic2pCZG5pMFZKMWxBUlpzNnlXaXVweEN1TUR5NktwUzJJd09vNkRUcjNNcmUzZTV0WlpWVU00WkJqcU9PSm9XTzRqa1hhamNPT01IR2dESVN2V0lyZEFrS1I4MCtUelZsOTA4YlBQTDNMenhPdUhkaWZ4VmZpVEFnOTJxSS93Ky84Z0dnU3lOL21SN1hQVmxwMGxGLzNMM21iVkt0dTVIamJrLzhBSEUyRmMwM2k5K1h2NW5nRmRLTmMxM2k5K1h2NW5nRmFOVjB4NW5uK2wva245SGVFV1h1K1BsYm5xSjlkUzJYdTlPVnVlb24xMWtaN0NHQ2pMWHBDZ3hSbHIwaFVJUFlVY250SDVUejFzOHZiK0J0MS9kcVBpckdTZTBmbFBQV3VzRy9nNFB5MTVxMDZYcWx5TVd2VllRK3J1STl4Sk9xek85aE90by9zUDh0YkdPRklybVdlTTdJdU1ETW5BWFhRSk9ValFlT3NKazBuWTk2aXAwQ1l1bnJqYUh4MXQrc3JQSlViWEJtMkxyRlBpa3dUT2IrVCtWaGJaeEdNckRYcDgzeDFRU3kydHVjSnBValBFVHArQ241L2Z0YVJ2S3Z0cDNLeDQ4SEczZXJITXpPeFppV1p0TE1kSk5RU2JiTDcxVms2eXluVmlPa3FuRUVmT1d0UGJYaTNFUWtHZzZtWGlOY2tqZVNKeEpHeFIxMHF3MEd0eHV4bXZiSW1ENENaTUZsQTRmUmZ2MEJxZXNxcXpUTVpOTUVEYklIdEhIMlFlQ2laSlNxTVFkT0dpdWU1M216M2N6UXdzUmJJY05IbmtlYzNjNHFBTXVyaXo2OGdUSVRveHdPT25scDBNanhNSllXNzQxR3MzUlZsZHRieWdFL2RNY0hYL21vRGF4VGlXTlpCNTNCM2FyYjgvd0MrNFNPRjRzZi9BS3hVOWtjQnNmT0dIZm9VSHRHL1Jielk1RGllNUhIaFhkdmF2cWlaOVE4SmRscTQvZ2JLdWE3eGUvTDM4endDdWhwZjJVay9abzUwa213SktJZG9nRGp3MVZ6emVMMzVlL21lQVZwMUxUZ3FZNG5uK21SYXV6cW1xd3JqekNMTDNmSHl0ejFFK3VwTEwrUWo1VzU2amZYV1Jucm9ZS0x0ZWtLRUZGMnZTRlFnOWhTU2UwZmxQUFdvc20vaElmb0x6Vmw1UGFQeW5uclJXYi93MFgwRjVxMDZYcWx5TTJzVll4NWdtYkZyZS90NzFOWTJUKzBoOFZiU081U1dOSlVPS1NBTXA3akRHc3BtTVBhTFJsWFM2ZVd2ZTEvRlJPN1dZZGJabTFZL2VXL1I3cUh4SFJYR29qbG0zdWxpZDZhVmJhVytPQUx2Z0NMcTJIbTlXeEhLV3FqaGo2eHNLMWU4ZG0xNWw0bmlHMUxaa3N3R3N4dHJQZU9tc3ZheUJKQTFWSXRsV2pwdEx1VGRQTW83THRqUkRxOW5hSzQrV0Y5SXJVVzdCYUhPbGpHcVZIQjd3Mmh6Vm9adDg3ZDh2YU5ZU0xsMDJDY1JzREViSmJqNzFVdTdVQmt2SjcvRDdxMlFvRHh5U2FBTzhNVFhkeFJWTXBScDVYWk9XZEYvbXM3UjVYZHlLZktXSnNPLzVQaHJHNVhsTnhtRXl3VzZiVG5UeEFBY0pOYkdTTVhrTTFwamdiaU5vMVB6aVBKK09zN3U3bS82UmVNMDBaT2d4U3BxWVlIVDN3UlhNS040bGw5elVHNGJRZk5zaHU4c1pWdUVBMmhpckE0cWUvVk93d3JWYnpid3c1bUk0NFVLUlJZa2JXRzBTM0pXY3RiZDd1NVdGZk9PTEhpVWRKcW1haXBmTHNJc09iaFdlMDAxbE1rTVZ2Sk5qaGdoSUFMTWNCeENzN2Z4WFFta3VweDFiWERzd0dQbGFUaWRWYUV5S05Ya29vNGVCVitTcTdMN1ZzOXpjQmdleVE0R1EvTUIxY3Jtb2ltMm9yZXpxY293VHVTZUVZNDhqUTdvWlgyUEx6ZHlMaE5kNlJqckVZNkk3K3VzcHZINzh2ZnpQQUs2VUFBQUZHQUdnQWNBcm11OFh2eTkvTThBclRmaW8yNFJXNW5uYUc2N3VvdTNIL0tQdXFUMlg4aEh5dHoxRyt1cExMM2VuSzNQVWI2NnlzOVJEQlJkcjBoUWdvdTA2UXFFR1VrbnRINVR6MWUyMzh2RjlCZWFxS1QyajhwNTZ2YmIrWGkrZ3ZOV2pUZFV1Um4xWFRIbVRoOEtySlRKbHQ4dDFDUElZNDRjR25wSlZqVEpZa21qYU45SWI0dTdWOTIzbmpUZXRoUmF1WkpWM1BhVzFyZkxJaVhFRFlnNlI0VlljOUNYVzd0aGZPWmJLZGJHWnRMVzh1UFZZL3UzR3JrTlVrTTl6bGN4VWpiaGZXT0E5MGNScTRndjRMaGRxTitWVG9OWVdtblJtOU5OVldOVHlIYzZWV0J2OHd0NFllSHFtNnh5UG1yb3ExWjdXR0ZMU3hUcTdXTFN1UFNkanJrZnVtcTV5SFhEVWVBOTJvTzJTS3BWdW1OQWFvSkxNWEgzbXlwMHJwSjR1S2hjM3RiRE01Qk1yaTF6QWo3OWo3S1RpWThUY2RCcGNzaXRoMDI4Nm8rc1BDYWdFWDlQemc0elhVQ3A2UVlzZThvb3VDRzN0azZtMUJZdjA1VzZUK0lkeW9seGJIREFBYTJPZ0RsTkN6M3J5TjJXeEJkNVBKTWcxdDgxZUlkMnVrcW5MbFRCYmZjdVkrOXVKTGlSY3Z0UHZIZHNISytjZlJIY0hEV3N5YXdqeXkwV0JjREkzbFRQNlRlSWNGVitTNU9tWHg5YkpnMTA0OG84Q2owVjhKcTJEVnUwOW5MODB1cDdPeEhpK29hbDNQOEFYQi9Jc1pTOFQvWU9WNjV6dkNjYzd2ZnpQQUszaXZXQ3o0NDV6ZUg5NTRCWE9yNkk4eWZTZnl6K2p2Q0xQM2ZIeXR6MUcrdXBMUDNmSHl0ejFFK3VzYlBhUTBVWGFkSVVJS0x0ZWtLaEI3Q2trOW8vS2VlcjIyL2w0L29MelZSU2UwZmxQUFY3Yi95OFgwRjVxMGFicWx5TStxNlk4eVFzQlRETW9yMW84YWlhRTFwYmx1TXFTM3NiTExISWhTUlF5bmdxdWtoYUo5dUJqbytINWFPYTNhbzJ0MzRxb3VSbExhalRhbEdQOHYwSVk4eWxYUStQS1BGVS9iWVhPTFBnZTZDS2lhMExheFRPeEh1MVE3Y3VCZDl5UEVKN1RialhLTzhDYWpiTUlGNkNOSWVOdkpIanFJV0o3dFNwWWthbHFWYmx3SWR5RytSR1h1cjBoWFlKRnhhbCtEaHE1eTNzbGt2M1kycEQwcFRyK1FVQ2xwSlJVZG85WFc0T0xyVEh0TTE2Y1pMTFdrZUM3eTRqdmxORXBjUnR3MVV4MjdDaTQ0OE5aclRGeTNubjNJUVd4bGdHckRaM3B6YTcvTThBclpvK0FyRjUxNzF1dnArQ3FkVjBSNWwvcHNVcnMydkIzaGRsN3ZUbGJucUo5ZFMyWHUrUGxibnFKOWRZMmVzaG9vcTE2UW9RVVhhOUlWQ0QyRkxKN1J1VTg5V050bVVTUXFrZ1lNZ3cwYWNjS3JwUGFQeW5uclpXRzRWaStWV21ZNXRuTVdYRytYcklZbkEwcmhqMG1kY1RnZE5kd25LRHFqbWR1TTFTUlIvcWxyOC80S1g2cGE4VC9CVnpEdUxaWHVkUlpibG1ieFhjUFVOUGMzS3FDSXdyYk96Z3JIRW5Iam95RCszZVNYa2h0N0RlS0c0dW1ER09KVlVrbGZvdVRoWGZtYm5aN0N2eTF2dDlwbXYxVzErZDhGTDlWdGVKdmdxNXlyY09HZkxtekhOODBpeXlFVFBicHRBRUZvMlpHOHBtVWExT0ZObjNLeTZXL3NiREtNNWh2NWJ4MldUWkErN1JGMnk1MldPUEpUekUrejJEeTF2dDlwVC9BS3BhY1RlclMvVTdUaWIxYTA0L3Q3a0RYUFkwM2poTjBXNnNRN0s3VzNxMmRuck1jY2FEeS84QXQ4MGt1WmZxV1l4V050bGN2VVBQaGlHWWhXRGVVeTdJd1lVOHhQczlnOHRiN2ZhVW42cGFjVGVyVHhtOW9PQnZWcTN2OXo5MjdheW51SWQ0NExpV0tObmpoQVhGMlVZaFJnNTE2cXBzcnlqTHIyMTY2NXpGTFNUYUs5VTJHT0E4N1N3cVkzN2tuUlUrQnpPemFnczBzMU95citCS002c3h3UDZ0U0RQTE1lbjZ2eTBydmRtM1N4bHU3Sy9TN1dERHJGVURVVHhnblRVODI2ZVhXN0tseG1xUXV3REJYVUtjRCsxWGVlL3dYdUtYNVhER1dMYXBTVmNPeWhFTS9zZUovVitXbmplR3g0cFBWK1drbTZrS1psRmF5M0psdDdpRnBZWlk4QVNWSzZEanREREEwZjhBMFRsMzQwLzFmOE5keDh4SlZXWEIwS2JrdEZGcE56ZFZYQUMvcU93QTBDUW5pMmZsck8zVndibTVsbkkyVEt4YkRpclgvd0JFNWQrTmNmVi93VlI3eFpQYTVVOXV0dkk4bldobWJidzBZRUFZWUFWeGZoZnk1cmxLUjRGdWx1Nlg3bVcxbXpUOFM0WWlzLzVDUGxibnFKOWRTV2Z1OU9WdWVvbjExbVp2UTJpN1hwQ2hLS3Rla0toQmxOSjdSK1U4OWJEZkdUYjNhM1pYMExjajZrZFkrVDJqOHA1NjAyODhtMWtXUXI2TUoreWxTQXIrMmNuVjVyZW5qczNIMWxvWCszajlYdmJidHhMTjlscVc0VW5WNWpkbmp0WEh4aWh0eVpOamVTQnU1SjlrMUJKZTd4eTdXNUNKL3dDenVEL21UVlRmMitmcTk3TEp1THJQc05SdWVTN1c2YUovMzh4K3ZMVlh1WSt4dkhhTnhiZjJHb0NlemY4QTM2ai9BUHNTZjh3MXNMbnFjelRlZkpsdVlvTG01dW81RjYxc0JzaEl0UDFjTkZZZTFmOEEzaXIvQVBmRS93Q1pVZTliQjk0cjVqd3VQc3JRRmhtRzRsL1oyTTE3SGRXOTB0dXUzSWtUSGFDaldkSXcwVlZaZGtzOS9DMDZ5SkZFcDJkcCtFMWJicXliR1RaOHZwUUQ3TDFYUnY4QTdibFQ5Nk9kYTd0cE51dU5FMzdDcTlLU2lzanl1VW94clN0S2xsSGJMbFdUWHNNczhjaHVTdXdFUERxd29MZTV5K1lSRS9nTHptcVJla3ZLS3RkNDMyN3lNL3VsSHhtckhKU3R5U1dWUnlyanhLSTJYQy9DVGxubFBQS1RwVGRGYlAwTDFiZ3JmNUxwMEczZFBoUUh3VjBTMWx6QnNuczNzRVNSOENyaDlXQUpHalNPS3VVM0UremRaUTNvSmg4SUFyZFpYRkRtT1RwSGEzaTIrWXJJMkt0S3k0cmljQnNCdUhIZ0ZYU280NDArV2EycXF4anZNOXVNb3krV3Z6V3BMQ1dXV0UyOEh4TDZlNDNvamdrZVNDQlkxUmk1QkdJVURUNTFjbDN2bTI3NkJCcVNFSDRXYnhWMHRsa3lYSmN4VE1iK09XNnVZOW1HSHJDekRRd3dBYlRwMnVLdVRaOU4xdVlzZlJSUjhXUGhybTQxOW1TU2pSeWlxeFZLN3kyM0IvZnR1VG0yb1NkSnl6TlZ3M0JGbjd2VGxibnFGOWRTMmZ1OU9WdWVvbjExbFp1UTJpTGRzR0ZEMDVIMmROUUdWMG50RzVUejFkV205TjFiMmtWcThFVndzSTJVYVFhUU9LaG1pdFpHTE9tazY4RGhTRnZZK2dmV05TQWc3ejNRdm83eUtDS0lvaGlhTlI1TEt4eDhxcHh2amNxUzBWcGJ4dndPQWNSUVBaN0QwRzlZMHV6MkhvSDFqVUNwTFk3elhscGJtM2VLTzVRdXpqckJxWmppM3gxN1B2TmN5VDI4OFZ2REJKYk1XVW92UzJoc2xXN21GUTluc1BRUHJHbDJldzlBK3NhQ29kL1dOeHRiWXNyZmIxN1dCeHg1ZGREMjI4MXhDODhrbHZEY1NYRW5XdXpycU9HR0M5elJVUFo3RDBHOVkwdXpXSG9IMWpRVkNMcmVxNm50WmJhTzNpdDFtR3k3UmpUczFYMm1ZeTIwWmlDcThaT09EY2RFZG1zUFFiMWpTN1BZZWdmV05kSnVMcW5RaVNVbFJxcEZMbXJ5eHRIMU1hN1F3MmdOTlBPZFN0MG9JMjdwMDA3czloNkI5WTB1ejJIb0gxalhYM1orSTQrMWI4SUpkWDg5eExIS1FGTVhRVWFocHhvaVBONVArb25mVStBMC9zOWg2RGVzYVhaN0QwRDZ4cEc3T0xiVXR1MFN0VzVKSngyYkJzbWJ0aVNpRWsrY3hvQ1dXU2FWcFpPazJ2RFZvMFZZZG5zUFFiMWpTTnZaY0NIMWpTZDJjK3AxWEFtRnFFT21PUEVmYUgrQlFkMXVlbzIxMUl6cmdGVVlLTkFBcUkxV3p0Q3BVcVZDUlVxVktnRlNwVXFBVktsU29CVXFWS2dGU3BVcUFWS2xTb0JVcVZLZ0ZTcFVxQVZLbFNvRC85az1cIixcclxuXHJcbiAgICAgICAgbG9hZGVyVGV4dDogXCLmraPlnKjovb3lhaUuLi4gXCIsXHJcblxyXG4gICAgICAgIGxvYWRlckZvbnQ6IFwiQXJpYWxcIixcclxuXHJcbiAgICAgICAgLyoqIEBvdmVycmlkZSAqL1xyXG4gICAgICAgIGxpc3ROb3RpZmljYXRpb25JbnRlcmVzdHM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgIGNvbnN0YW50cy5TQ0VORV9BQ1RJT04sXHJcbiAgICAgICAgICAgICAgICBjb25zdGFudHMuU0NFTkVfQUNUSU9OX0FERF9DSElMRCxcclxuICAgICAgICAgICAgICAgIGNvbnN0YW50cy5DT05GSVJNX0RJQUxPR1xyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKiBAb3ZlcnJpZGUgKi9cclxuICAgICAgICBoYW5kbGVOb3RpZmljYXRpb246IGZ1bmN0aW9uIChub3RpZmljYXRpb24pIHtcclxuICAgICAgICAgICAgc3dpdGNoIChub3RpZmljYXRpb24uZ2V0TmFtZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIGNvbnN0YW50cy5TQ0VORV9BQ1RJT046XHJcbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKG5vdGlmaWNhdGlvbi5nZXRCb2R5KCkubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZpZXdNZWRpYXRvciA9IHRoaXMuZmFjYWRlLnJldHJpZXZlTWVkaWF0b3Iobm90aWZpY2F0aW9uLmdldEJvZHkoKS5uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmlld01lZGlhdG9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0Vmlldyh2aWV3TWVkaWF0b3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2luaXRpYWxpemVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2luaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBjb25zdGFudHMuU0NFTkVfQUNUSU9OX0FERF9DSElMRDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZENoaWxkKG5vdGlmaWNhdGlvbi5nZXRCb2R5KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBjb25zdGFudHMuQ09ORklSTV9ESUFMT0c6XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIENvbmZpcm1EaWFsb2cgPSByZXF1aXJlKCcuLi9jb21wb25lbnQvY29uZmlybURpYWxvZy5qcycpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBib2R5ID0gbm90aWZpY2F0aW9uLmdldEJvZHkoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZENoaWxkKG5ldyBDb25maXJtRGlhbG9nKGJvZHkudGl0bGUsIGJvZHkuZGVzYywgYm9keS5jYWxsYmFjaykpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqIEBvdmVycmlkZSAqL1xyXG4gICAgICAgIG9uUmVnaXN0ZXI6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqIEBvdmVycmlkZSAqL1xyXG4gICAgICAgIG9uUmVtb3ZlOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNldFZpZXc6IGZ1bmN0aW9uICh2aWV3TWVkaWF0b3IpIHtcclxuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgc2VsZi52aWV3Q29tcG9uZW50ID0gbmV3IGNjLlNjZW5lKCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgcmVzID0gdmlld01lZGlhdG9yLmdldFJlc291cmNlKCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgaGFuZGxlU2NlbmVDaGFuZ2VkID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHZpZXdNZWRpYXRvci5pbml0KCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGQgPSB2aWV3TWVkaWF0b3IuZ2V0Vmlld0NvbXBvbmVudCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi52aWV3Q29tcG9uZW50LmFkZENoaWxkKGNoaWxkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmLnNlbmROb3RpZmljYXRpb24oY29uc3RhbnRzLk5PVElGSUNBVElPTi5TQ0VORV9DSEFOR0VEKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXMpIHtcclxuICAgICAgICAgICAgICAgIGNjLkxvYWRlclNjZW5lLnByZWxvYWQocmVzLCBoYW5kbGVTY2VuZUNoYW5nZWQsIHRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlU2NlbmVDaGFuZ2VkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBhZGRDaGlsZDogZnVuY3Rpb24obm9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLnZpZXdDb21wb25lbnQuYWRkQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vIFNUQVRJQyBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgTkFNRTogJ1NjZW5lTWVkaWF0b3InLFxyXG4gICAgICAgIFNDRU5FX0NIQU5HRV9WSUVXOiAnU2NlbmVDaGFuZ2VWaWV3J1xyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBBcnRodXIgb24gMjAxNC8xMi8yMC5cclxuICovXHJcbnZhciBwdXJlbXZjID0gcmVxdWlyZSgncHVyZW12YycpLnB1cmVtdmM7XHJcbnZhciBjb25zdGFudHMgPSByZXF1aXJlKCcuLi8uLi9hcHBDb25zdGFudHMuanMnKTtcclxudmFyIFRhc2tQcm94eSA9IHJlcXVpcmUoJy4uLy4uL21vZGVsL3Byb3h5L3Rhc2tQcm94eS5qcycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBwdXJlbXZjLmRlZmluZShcclxuICAgIHtcclxuICAgICAgICBuYW1lOiAnZmlnaHRlci52aWV3Lm1lZGlhdG9yLlRyYWluTWVkaWF0b3InLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5NZWRpYXRvclxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBpbnN0YW5jZSBtZW1iZXJzXHJcbiAgICB7XHJcbiAgICAgICAgLyoqIEBvdmVycmlkZSAqL1xyXG4gICAgICAgIGxpc3ROb3RpZmljYXRpb25JbnRlcmVzdHM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gW2NvbnN0YW50cy5UQVNLX0FDVElPTl07XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqIEBvdmVycmlkZSAqL1xyXG4gICAgICAgIGhhbmRsZU5vdGlmaWNhdGlvbjogZnVuY3Rpb24obm90ZSkge1xyXG4gICAgICAgICAgICBzd2l0Y2gobm90ZS5nZXROYW1lKCkpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgY29uc3RhbnRzLlRBU0tfQUNUSU9OOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChub3RlLmdldFR5cGUoKSA9PSBjb25zdGFudHMuVEFTS19BQ1RJT05fRklOSVNIRUQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy52aWV3Q29tcG9uZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdDb21wb25lbnQub25UYXNrRmluaXNoZWQobm90ZS5nZXRCb2R5KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqIEBvdmVycmlkZSAqL1xyXG4gICAgICAgIG9uUmVnaXN0ZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKiogQG92ZXJyaWRlICovXHJcbiAgICAgICAgb25SZW1vdmU6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRhc2tQcm94eSA9IHRoaXMuZmFjYWRlLnJldHJpZXZlUHJveHkoVGFza1Byb3h5Lk5BTUUpO1xyXG4gICAgICAgICAgICB2YXIgdGFza0xpc3QgPSB0YXNrUHJveHkuZ2V0RGF0YSgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIFRyYWluTGF5ZXIgPSByZXF1aXJlKCcuLy4uL2NvbXBvbmVudC90cmFpbkxheWVyLmpzJyk7XHJcbiAgICAgICAgICAgIHNlbGYudmlld0NvbXBvbmVudCA9IG5ldyBUcmFpbkxheWVyKCk7XHJcbiAgICAgICAgICAgIHNlbGYudmlld0NvbXBvbmVudC5pbml0KHRhc2tMaXN0KTtcclxuXHJcbiAgICAgICAgICAgIHNlbGYudmlld0NvbXBvbmVudC5vbkJhY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2VuZE5vdGlmaWNhdGlvbihjb25zdGFudHMuU0NFTkVfQUNUSU9OLCB7bmFtZTogY29uc3RhbnRzLlNDRU5FLkhPTUV9KTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHNlbGYudmlld0NvbXBvbmVudC5vblRhc2sgPSBmdW5jdGlvbih0YXNrKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNlbmROb3RpZmljYXRpb24oY29uc3RhbnRzLlRBU0tfQUNUSU9OLCB0YXNrLCBjb25zdGFudHMuVEFTS19BQ1RJT05fU1RBUlQpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGdldFJlc291cmNlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy8gc3RhdGljIG1lbWJlcnNcclxuICAgIHtcclxuICAgICAgICBOQU1FOiAnVHJhaW5NZWRpYXRvcidcclxuICAgIH1cclxuKTsiXX0=
