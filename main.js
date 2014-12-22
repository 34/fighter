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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcQXJ0aHVyXFxBcHBEYXRhXFxSb2FtaW5nXFxucG1cXG5vZGVfbW9kdWxlc1xcd2F0Y2hpZnlcXG5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwibm9kZV9tb2R1bGVzXFxwdXJlbXZjXFxpbmRleC5qcyIsIm5vZGVfbW9kdWxlc1xccHVyZW12Y1xcbGliXFxwdXJlbXZjLTEuMC4xLm1vZHVsZS5qcyIsInNyY1xcYXBwLmpzIiwic3JjXFxhcHBDb25zdGFudHMuanMiLCJzcmNcXGFwcEZhY2FkZS5qcyIsInNyY1xcY29udHJvbGxlclxcY29tbWFuZFxcU3RhcnR1cENvbW1hbmQuanMiLCJzcmNcXGNvbnRyb2xsZXJcXGNvbW1hbmRcXGhvbWVDb21tYW5kLmpzIiwic3JjXFxjb250cm9sbGVyXFxjb21tYW5kXFxwcmVwQ29udHJvbGxlckNvbW1hbmQuanMiLCJzcmNcXGNvbnRyb2xsZXJcXGNvbW1hbmRcXHByZXBNb2RlbENvbW1hbmQuanMiLCJzcmNcXGNvbnRyb2xsZXJcXGNvbW1hbmRcXHByZXBWaWV3Q29tbWFuZC5qcyIsInNyY1xccmVzb3VyY2UuanMiLCJzcmNcXHZpZXdcXGNvbXBvbmVudFxcaG9tZUxheWVyLmpzIiwic3JjXFx2aWV3XFxjb21wb25lbnRcXHRyYWluTGF5ZXIuanMiLCJzcmNcXHZpZXdcXG1lZGlhdG9yXFxkaXJlY3Rvck1lZGlhdG9yLmpzIiwic3JjXFx2aWV3XFxtZWRpYXRvclxcaG9tZU1lZGlhdG9yLmpzIiwic3JjXFx2aWV3XFxtZWRpYXRvclxcc2NlbmVNZWRpYXRvci5qcyIsInNyY1xcdmlld1xcbWVkaWF0b3JcXHRyYWluTWVkaWF0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3Q1RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImV4cG9ydHMucHVyZW12YyA9IHJlcXVpcmUoJy4vbGliL3B1cmVtdmMtMS4wLjEubW9kdWxlLmpzJyk7XHJcbiIsIi8qKlxyXG4gKiBAZmlsZU92ZXJ2aWV3XHJcbiAqIFB1cmVNVkMgSlMgTmF0aXZlIFBvcnQgYnkgRGF2aWQgRm9sZXksIEZyw6lkw6lyaWMgU2F1bmllciwgJiBBbGFpbiBEdWNoZXNuZWF1XHJcbiAqIENvcHlyaWdodChjKSAyMDA2LTIwMTIgRnV0dXJlc2NhbGUsIEluYy4sIFNvbWUgcmlnaHRzIHJlc2VydmVkLlxyXG4gKiBSZXVzZSBnb3Zlcm5lZCBieSBDcmVhdGl2ZSBDb21tb25zIEF0dHJpYnV0aW9uIDMuMFxyXG4gKiBodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9saWNlbnNlcy9ieS8zLjAvdXMvXHJcbiAqIEBhdXRob3IgZGF2aWQuZm9sZXlAcHVyZW12Yy5vcmdcclxuICovXHJcblxyXG5cclxuLyogaW1wbGVtZW50YXRpb24gYmVnaW4gKi9cclxuXHJcblxyXG4vKipcclxuICogQGF1dGhvciBQdXJlTVZDIEpTIE5hdGl2ZSBQb3J0IGJ5IERhdmlkIEZvbGV5LCBGcsOpZMOpcmljIFNhdW5pZXIsICYgQWxhaW4gRHVjaGVzbmVhdVxyXG4gKiBAYXV0aG9yIENvcHlyaWdodChjKSAyMDA2LTIwMTIgRnV0dXJlc2NhbGUsIEluYy4sIFNvbWUgcmlnaHRzIHJlc2VydmVkLlxyXG4gKlxyXG4gKiBAY2xhc3MgcHVyZW12Yy5PYnNlcnZlclxyXG4gKlxyXG4gKiBBIGJhc2UgT2JzZXJ2ZXIgaW1wbGVtZW50YXRpb24uXHJcbiAqXHJcbiAqIEFuIE9ic2VydmVyIGlzIGFuIG9iamVjdCB0aGF0IGVuY2Fwc3VsYXRlcyBpbmZvcm1hdGlvblxyXG4gKiBhYm91dCBhbiBpbnRlcmVzdGVkIG9iamVjdCB3aXRoIGEgbWV0aG9kIHRoYXQgc2hvdWxkXHJcbiAqIGJlIGNhbGxlZCB3aGVuIGEgcGFydGljdWxhciBOb3RpZmljYXRpb24gaXMgYnJvYWRjYXN0LlxyXG4gKlxyXG4gKiBJbiBQdXJlTVZDLCB0aGUgT2JzZXJ2ZXIgY2xhc3MgYXNzdW1lcyB0aGVzZSByZXNwb25zaWJpbGl0aWVzOlxyXG4gKlxyXG4gKiAtIEVuY2Fwc3VsYXRlIHRoZSBub3RpZmljYXRpb24gKGNhbGxiYWNrKSBtZXRob2Qgb2YgdGhlIGludGVyZXN0ZWQgb2JqZWN0LlxyXG4gKiAtIEVuY2Fwc3VsYXRlIHRoZSBub3RpZmljYXRpb24gY29udGV4dCAodGhpcykgb2YgdGhlIGludGVyZXN0ZWQgb2JqZWN0LlxyXG4gKiAtIFByb3ZpZGUgbWV0aG9kcyBmb3Igc2V0dGluZyB0aGUgbm90aWZpY2F0aW9uIG1ldGhvZCBhbmQgY29udGV4dC5cclxuICogLSBQcm92aWRlIGEgbWV0aG9kIGZvciBub3RpZnlpbmcgdGhlIGludGVyZXN0ZWQgb2JqZWN0LlxyXG4gKlxyXG4gKlxyXG4gKiBUaGUgbm90aWZpY2F0aW9uIG1ldGhvZCBvbiB0aGUgaW50ZXJlc3RlZCBvYmplY3Qgc2hvdWxkIHRha2VcclxuICogb25lIHBhcmFtZXRlciBvZiB0eXBlIE5vdGlmaWNhdGlvbi5cclxuICpcclxuICpcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gbm90aWZ5TWV0aG9kXHJcbiAqICB0aGUgbm90aWZpY2F0aW9uIG1ldGhvZCBvZiB0aGUgaW50ZXJlc3RlZCBvYmplY3RcclxuICogQHBhcmFtIHtPYmplY3R9IG5vdGlmeUNvbnRleHRcclxuICogIHRoZSBub3RpZmljYXRpb24gY29udGV4dCBvZiB0aGUgaW50ZXJlc3RlZCBvYmplY3RcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBPYnNlcnZlciAobm90aWZ5TWV0aG9kLCBub3RpZnlDb250ZXh0KVxyXG57XHJcbiAgICB0aGlzLnNldE5vdGlmeU1ldGhvZChub3RpZnlNZXRob2QpO1xyXG4gICAgdGhpcy5zZXROb3RpZnlDb250ZXh0KG5vdGlmeUNvbnRleHQpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNldCB0aGUgT2JzZXJ2ZXJzIG5vdGlmaWNhdGlvbiBtZXRob2QuXHJcbiAqXHJcbiAqIFRoZSBub3RpZmljYXRpb24gbWV0aG9kIHNob3VsZCB0YWtlIG9uZSBwYXJhbWV0ZXIgb2YgdHlwZSBOb3RpZmljYXRpb25cclxuICogQHBhcmFtIHtGdW5jdGlvbn0gbm90aWZ5TWV0aG9kXHJcbiAqICB0aGUgbm90aWZpY2F0aW9uIChjYWxsYmFjaykgbWV0aG9kIG9mIHRoZSBpbnRlcmVzdGVkIG9iamVjdC5cclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbk9ic2VydmVyLnByb3RvdHlwZS5zZXROb3RpZnlNZXRob2Q9IGZ1bmN0aW9uIChub3RpZnlNZXRob2QpXHJcbntcclxuICAgIHRoaXMubm90aWZ5PSBub3RpZnlNZXRob2Q7XHJcbn07XHJcblxyXG4vKipcclxuICogU2V0IHRoZSBPYnNlcnZlcnMgbm90aWZpY2F0aW9uIGNvbnRleHQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBub3RpZnlDb250ZXh0XHJcbiAqICB0aGUgbm90aWZpY2F0aW9uIGNvbnRleHQgKHRoaXMpIG9mIHRoZSBpbnRlcmVzdGVkIG9iamVjdC5cclxuICpcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbk9ic2VydmVyLnByb3RvdHlwZS5zZXROb3RpZnlDb250ZXh0PSBmdW5jdGlvbiAobm90aWZ5Q29udGV4dClcclxue1xyXG4gICAgdGhpcy5jb250ZXh0PSBub3RpZnlDb250ZXh0O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgRnVuY3Rpb24gdGhhdCB0aGlzIE9ic2VydmVyIHdpbGwgaW52b2tlIHdoZW4gaXQgaXMgbm90aWZpZWQuXHJcbiAqXHJcbiAqIEBwcml2YXRlXHJcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxyXG4gKi9cclxuT2JzZXJ2ZXIucHJvdG90eXBlLmdldE5vdGlmeU1ldGhvZD0gZnVuY3Rpb24gKClcclxue1xyXG4gICAgcmV0dXJuIHRoaXMubm90aWZ5O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgT2JqZWN0IHRoYXQgd2lsbCBzZXJ2ZSBhcyB0aGUgT2JzZXJ2ZXJzIGNhbGxiYWNrIGV4ZWN1dGlvbiBjb250ZXh0XHJcbiAqXHJcbiAqIEBwcml2YXRlXHJcbiAqIEByZXR1cm4ge09iamVjdH1cclxuICovXHJcbk9ic2VydmVyLnByb3RvdHlwZS5nZXROb3RpZnlDb250ZXh0PSBmdW5jdGlvbiAoKVxyXG57XHJcbiAgICByZXR1cm4gdGhpcy5jb250ZXh0O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIE5vdGlmeSB0aGUgaW50ZXJlc3RlZCBvYmplY3QuXHJcbiAqXHJcbiAqIEBwYXJhbSB7cHVyZW12Yy5Ob3RpZmljYXRpb259IG5vdGlmaWNhdGlvblxyXG4gKiAgVGhlIE5vdGlmaWNhdGlvbiB0byBwYXNzIHRvIHRoZSBpbnRlcmVzdGVkIG9iamVjdHMgbm90aWZpY2F0aW9uIG1ldGhvZFxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuT2JzZXJ2ZXIucHJvdG90eXBlLm5vdGlmeU9ic2VydmVyPSBmdW5jdGlvbiAobm90aWZpY2F0aW9uKVxyXG57XHJcbiAgICB0aGlzLmdldE5vdGlmeU1ldGhvZCgpLmNhbGwodGhpcy5nZXROb3RpZnlDb250ZXh0KCksIG5vdGlmaWNhdGlvbik7XHJcbn07XHJcblxyXG4vKipcclxuICogQ29tcGFyZSBhbiBvYmplY3QgdG8gdGhpcyBPYnNlcnZlcnMgbm90aWZpY2F0aW9uIGNvbnRleHQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3RcclxuICpcclxuICogQHJldHVybiB7Ym9vbGVhbn1cclxuICovXHJcbk9ic2VydmVyLnByb3RvdHlwZS5jb21wYXJlTm90aWZ5Q29udGV4dD0gZnVuY3Rpb24gKG9iamVjdClcclxue1xyXG4gICAgcmV0dXJuIG9iamVjdCA9PT0gdGhpcy5jb250ZXh0O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRoZSBPYnNlcnZlcnMgY2FsbGJhY2sgRnVuY3Rpb25cclxuICpcclxuICogQHByaXZhdGVcclxuICogQHR5cGUge0Z1bmN0aW9ufVxyXG4gKi9cclxuT2JzZXJ2ZXIucHJvdG90eXBlLm5vdGlmeT0gbnVsbDtcclxuXHJcbi8qKlxyXG4gKiBUaGUgT2JzZXJ2ZXJzIGNhbGxiYWNrIE9iamVjdFxyXG4gKiBAcHJpdmF0ZVxyXG4gKiBAdHlwZSB7T2JqZWN0fVxyXG4gKi9cclxuT2JzZXJ2ZXIucHJvdG90eXBlLmNvbnRleHQ9IG51bGw7XHJcbi8qKlxyXG4gKiBAYXV0aG9yIFB1cmVNVkMgSlMgTmF0aXZlIFBvcnQgYnkgRGF2aWQgRm9sZXksIEZyw6lkw6lyaWMgU2F1bmllciwgJiBBbGFpbiBEdWNoZXNuZWF1XHJcbiAqIEBhdXRob3IgQ29weXJpZ2h0KGMpIDIwMDYtMjAxMiBGdXR1cmVzY2FsZSwgSW5jLiwgU29tZSByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIEBjbGFzcyBwdXJlbXZjLk5vdGlmaWNhdGlvblxyXG4gKlxyXG4gKiBBIGJhc2UgTm90aWZpY2F0aW9uIGltcGxlbWVudGF0aW9uLlxyXG4gKlxyXG4gKiBQdXJlTVZDIGRvZXMgbm90IHJlbHkgdXBvbiB1bmRlcmx5aW5nIGV2ZW50IG1vZGVscyBzdWNoIGFzIHRoZSBvbmUgcHJvdmlkZWRcclxuICogd2l0aCB0aGUgRE9NIG9yIG90aGVyIGJyb3dzZXIgY2VudHJpYyBXM0MgZXZlbnQgbW9kZWxzLlxyXG4gKlxyXG4gKiBUaGUgT2JzZXJ2ZXIgUGF0dGVybiBhcyBpbXBsZW1lbnRlZCB3aXRoaW4gUHVyZU1WQyBleGlzdHMgdG8gc3VwcG9ydFxyXG4gKiBldmVudC1kcml2ZW4gY29tbXVuaWNhdGlvbiBiZXR3ZWVuIHRoZSBhcHBsaWNhdGlvbiBhbmQgdGhlIGFjdG9ycyBvZiB0aGUgTVZDXHJcbiAqIHRyaWFkLlxyXG4gKlxyXG4gKiBOb3RpZmljYXRpb25zIGFyZSBub3QgbWVhbnQgdG8gYmUgYSByZXBsYWNlbWVudCBmb3IgZXZlbnRzIGluIHRoZSBicm93c2VyLlxyXG4gKiBHZW5lcmFsbHksIE1lZGlhdG9yIGltcGxlbWVudG9ycyBwbGFjZSBldmVudCBsaXN0ZW5lcnMgb24gdGhlaXIgdmlld1xyXG4gKiBjb21wb25lbnRzLCB3aGljaCB0aGV5IHRoZW4gaGFuZGxlIGluIHRoZSB1c3VhbCB3YXkuIFRoaXMgbWF5IGxlYWQgdG8gdGhlXHJcbiAqIGJyb2FkY2FzdCBvZiBOb3RpZmljYXRpb25zIHRvIHRyaWdnZXIgY29tbWFuZHMgb3IgdG8gY29tbXVuaWNhdGUgd2l0aCBvdGhlclxyXG4gKiBNZWRpYXRvcnMuIHtAbGluayBwdXJlbXZjLlByb3h5IFByb3h5fSxcclxuICoge0BsaW5rIHB1cmVtdmMuU2ltcGxlQ29tbWFuZCBTaW1wbGVDb21tYW5kfVxyXG4gKiBhbmQge0BsaW5rIHB1cmVtdmMuTWFjcm9Db21tYW5kIE1hY3JvQ29tbWFuZH1cclxuICogaW5zdGFuY2VzIGNvbW11bmljYXRlIHdpdGggZWFjaCBvdGhlciBhbmRcclxuICoge0BsaW5rIHB1cmVtdmMuTWVkaWF0b3IgTWVkaWF0b3J9c1xyXG4gKiBieSBicm9hZGNhc3RpbmcgTm90aWZpY2F0aW9ucy5cclxuICpcclxuICogQSBrZXkgZGlmZmVyZW5jZSBiZXR3ZWVuIGJyb3dzZXIgZXZlbnRzIGFuZCBQdXJlTVZDIE5vdGlmaWNhdGlvbnMgaXMgdGhhdFxyXG4gKiBldmVudHMgZm9sbG93IHRoZSAnQ2hhaW4gb2YgUmVzcG9uc2liaWxpdHknIHBhdHRlcm4sICdidWJibGluZycgdXAgdGhlXHJcbiAqIGRpc3BsYXkgaGllcmFyY2h5IHVudGlsIHNvbWUgcGFyZW50IGNvbXBvbmVudCBoYW5kbGVzIHRoZSBldmVudCwgd2hpbGVcclxuICogUHVyZU1WQyBOb3RpZmljYXRpb24gZm9sbG93IGEgJ1B1Ymxpc2gvU3Vic2NyaWJlJyBwYXR0ZXJuLiBQdXJlTVZDIGNsYXNzZXNcclxuICogbmVlZCBub3QgYmUgcmVsYXRlZCB0byBlYWNoIG90aGVyIGluIGEgcGFyZW50L2NoaWxkIHJlbGF0aW9uc2hpcCBpbiBvcmRlciB0b1xyXG4gKiBjb21tdW5pY2F0ZSB3aXRoIG9uZSBhbm90aGVyIHVzaW5nIE5vdGlmaWNhdGlvbnMuXHJcbiAqXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gKiAgVGhlIE5vdGlmaWNhdGlvbiBuYW1lXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBbYm9keV1cclxuICogIFRoZSBOb3RpZmljYXRpb24gYm9keVxyXG4gKiBAcGFyYW0ge09iamVjdH0gW3R5cGVdXHJcbiAqICBUaGUgTm90aWZpY2F0aW9uIHR5cGVcclxuICovXHJcbmZ1bmN0aW9uIE5vdGlmaWNhdGlvbihuYW1lLCBib2R5LCB0eXBlKVxyXG57XHJcbiAgICB0aGlzLm5hbWU9IG5hbWU7XHJcbiAgICB0aGlzLmJvZHk9IGJvZHk7XHJcbiAgICB0aGlzLnR5cGU9IHR5cGU7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBuYW1lIG9mIHRoZSBOb3RpZmljYXRpb24gaW5zdGFuY2VcclxuICpcclxuICogQHJldHVybiB7c3RyaW5nfVxyXG4gKiAgVGhlIG5hbWUgb2YgdGhlIE5vdGlmaWNhdGlvbiBpbnN0YW5jZVxyXG4gKi9cclxuTm90aWZpY2F0aW9uLnByb3RvdHlwZS5nZXROYW1lPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHJldHVybiB0aGlzLm5hbWU7XHJcbn07XHJcblxyXG4vKipcclxuICogU2V0IHRoaXMgTm90aWZpY2F0aW9ucyBib2R5LlxyXG4gKiBAcGFyYW0ge09iamVjdH0gYm9keVxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuTm90aWZpY2F0aW9uLnByb3RvdHlwZS5zZXRCb2R5PSBmdW5jdGlvbihib2R5KVxyXG57XHJcbiAgICB0aGlzLmJvZHk9IGJvZHk7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBOb3RpZmljYXRpb24gYm9keS5cclxuICpcclxuICogQHJldHVybiB7T2JqZWN0fVxyXG4gKi9cclxuTm90aWZpY2F0aW9uLnByb3RvdHlwZS5nZXRCb2R5PSBmdW5jdGlvbigpXHJcbntcclxuICAgIHJldHVybiB0aGlzLmJvZHlcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIHR5cGUgb2YgdGhlIE5vdGlmaWNhdGlvbiBpbnN0YW5jZS5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IHR5cGVcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbk5vdGlmaWNhdGlvbi5wcm90b3R5cGUuc2V0VHlwZT0gZnVuY3Rpb24odHlwZSlcclxue1xyXG4gICAgdGhpcy50eXBlPSB0eXBlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgdHlwZSBvZiB0aGUgTm90aWZpY2F0aW9uIGluc3RhbmNlLlxyXG4gKlxyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqL1xyXG5Ob3RpZmljYXRpb24ucHJvdG90eXBlLmdldFR5cGU9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgcmV0dXJuIHRoaXMudHlwZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIE5vdGlmaWNhdGlvbiBpbnN0YW5jZVxyXG4gKlxyXG4gKiBAcmV0dXJuIHtzdHJpbmd9XHJcbiAqL1xyXG5Ob3RpZmljYXRpb24ucHJvdG90eXBlLnRvU3RyaW5nPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHZhciBtc2c9IFwiTm90aWZpY2F0aW9uIE5hbWU6IFwiICsgdGhpcy5nZXROYW1lKCk7XHJcbiAgICBtc2crPSBcIlxcbkJvZHk6XCIgKyAoKHRoaXMuYm9keSA9PSBudWxsICkgPyBcIm51bGxcIiA6IHRoaXMuYm9keS50b1N0cmluZygpKTtcclxuICAgIG1zZys9IFwiXFxuVHlwZTpcIiArICgodGhpcy50eXBlID09IG51bGwgKSA/IFwibnVsbFwiIDogdGhpcy50eXBlKTtcclxuICAgIHJldHVybiBtc2c7XHJcbn07XHJcblxyXG4vKipcclxuICogVGhlIE5vdGlmaWNhdGlvbnMgbmFtZS5cclxuICpcclxuICogQHR5cGUge3N0cmluZ31cclxuICogQHByaXZhdGVcclxuICovXHJcbk5vdGlmaWNhdGlvbi5wcm90b3R5cGUubmFtZT0gbnVsbDtcclxuXHJcbi8qKlxyXG4gKiBUaGUgTm90aWZpY2F0aW9ucyB0eXBlLlxyXG4gKlxyXG4gKiBAdHlwZSB7c3RyaW5nfVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuTm90aWZpY2F0aW9uLnByb3RvdHlwZS50eXBlPSBudWxsO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBOb3RpZmljYXRpb25zIGJvZHkuXHJcbiAqXHJcbiAqIEB0eXBlIHtPYmplY3R9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5Ob3RpZmljYXRpb24ucHJvdG90eXBlLmJvZHk9IG51bGw7XHJcbi8qKlxyXG4gKiBAYXV0aG9yIFB1cmVNVkMgSlMgTmF0aXZlIFBvcnQgYnkgRGF2aWQgRm9sZXksIEZyw6lkw6lyaWMgU2F1bmllciwgJiBBbGFpbiBEdWNoZXNuZWF1XHJcbiAqIEBhdXRob3IgQ29weXJpZ2h0KGMpIDIwMDYtMjAxMiBGdXR1cmVzY2FsZSwgSW5jLiwgU29tZSByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIEBjbGFzcyBwdXJlbXZjLk5vdGlmaWVyXHJcbiAqXHJcbiAqIEEgQmFzZSBOb3RpZmllciBpbXBsZW1lbnRhdGlvbi5cclxuICpcclxuICoge0BsaW5rIHB1cmVtdmMuTWFjcm9Db21tYW5kIE1hY3JvQ29tbWFuZH0sXHJcbiAqIHtAbGluayBwdXJlbXZjLlNpbXBsZUNvbW1hbmQgU2ltcGxlQ29tbWFuZH0sXHJcbiAqIHtAbGluayBwdXJlbXZjLk1lZGlhdG9yIE1lZGlhdG9yfSBhbmRcclxuICoge0BsaW5rIHB1cmVtdmMuUHJveHkgUHJveHl9XHJcbiAqIGFsbCBoYXZlIGEgbmVlZCB0byBzZW5kIE5vdGlmaWNhdGlvbnNcclxuICpcclxuICogVGhlIE5vdGlmaWVyIGludGVyZmFjZSBwcm92aWRlcyBhIGNvbW1vbiBtZXRob2QgY2FsbGVkICNzZW5kTm90aWZpY2F0aW9uIHRoYXRcclxuICogcmVsaWV2ZXMgaW1wbGVtZW50YXRpb24gY29kZSBvZiB0aGUgbmVjZXNzaXR5IHRvIGFjdHVhbGx5IGNvbnN0cnVjdFxyXG4gKiBOb3RpZmljYXRpb25zLlxyXG4gKlxyXG4gKiBUaGUgTm90aWZpZXIgY2xhc3MsIHdoaWNoIGFsbCBvZiB0aGUgYWJvdmUgbWVudGlvbmVkIGNsYXNzZXNcclxuICogZXh0ZW5kLCBwcm92aWRlcyBhbiBpbml0aWFsaXplZCByZWZlcmVuY2UgdG8gdGhlXHJcbiAqIHtAbGluayBwdXJlbXZjLkZhY2FkZSBGYWNhZGV9XHJcbiAqIE11bHRpdG9uLCB3aGljaCBpcyByZXF1aXJlZCBmb3IgdGhlIGNvbnZpZW5pZW5jZSBtZXRob2RcclxuICogZm9yIHNlbmRpbmcgTm90aWZpY2F0aW9ucyBidXQgYWxzbyBlYXNlcyBpbXBsZW1lbnRhdGlvbiBhcyB0aGVzZVxyXG4gKiBjbGFzc2VzIGhhdmUgZnJlcXVlbnRcclxuICoge0BsaW5rIHB1cmVtdmMuRmFjYWRlIEZhY2FkZX0gaW50ZXJhY3Rpb25zXHJcbiAqIGFuZCB1c3VhbGx5IHJlcXVpcmUgYWNjZXNzIHRvIHRoZSBmYWNhZGUgYW55d2F5LlxyXG4gKlxyXG4gKiBOT1RFOiBJbiB0aGUgTXVsdGlDb3JlIHZlcnNpb24gb2YgdGhlIGZyYW1ld29yaywgdGhlcmUgaXMgb25lIGNhdmVhdCB0b1xyXG4gKiBub3RpZmllcnMsIHRoZXkgY2Fubm90IHNlbmQgbm90aWZpY2F0aW9ucyBvciByZWFjaCB0aGUgZmFjYWRlIHVudGlsIHRoZXlcclxuICogaGF2ZSBhIHZhbGlkIG11bHRpdG9uS2V5LlxyXG4gKlxyXG4gKiBUaGUgbXVsdGl0b25LZXkgaXMgc2V0OlxyXG4gKiAgIC0gb24gYSBDb21tYW5kIHdoZW4gaXQgaXMgZXhlY3V0ZWQgYnkgdGhlIENvbnRyb2xsZXJcclxuICogICAtIG9uIGEgTWVkaWF0b3IgaXMgcmVnaXN0ZXJlZCB3aXRoIHRoZSBWaWV3XHJcbiAqICAgLSBvbiBhIFByb3h5IGlzIHJlZ2lzdGVyZWQgd2l0aCB0aGUgTW9kZWwuXHJcbiAqXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gTm90aWZpZXIoKVxyXG57XHJcbn07XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGFuZCBzZW5kIGEgTm90aWZpY2F0aW9uLlxyXG4gKlxyXG4gKiBLZWVwcyB1cyBmcm9tIGhhdmluZyB0byBjb25zdHJ1Y3QgbmV3IE5vdGlmaWNhdGlvbiBpbnN0YW5jZXMgaW4gb3VyXHJcbiAqIGltcGxlbWVudGF0aW9uIGNvZGUuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBub3RpZmljYXRpb25OYW1lXHJcbiAqICBBIG5vdGlmaWNhdGlvbiBuYW1lXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBbYm9keV1cclxuICogIFRoZSBib2R5IG9mIHRoZSBub3RpZmljYXRpb25cclxuICogQHBhcmFtIHtzdHJpbmd9IFt0eXBlXVxyXG4gKiAgVGhlIG5vdGlmaWNhdGlvbiB0eXBlXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5Ob3RpZmllci5wcm90b3R5cGUuc2VuZE5vdGlmaWNhdGlvbiA9IGZ1bmN0aW9uKG5vdGlmaWNhdGlvbk5hbWUsIGJvZHksIHR5cGUpXHJcbntcclxuICAgIHZhciBmYWNhZGUgPSB0aGlzLmdldEZhY2FkZSgpO1xyXG4gICAgaWYoZmFjYWRlKVxyXG4gICAge1xyXG4gICAgICAgIGZhY2FkZS5zZW5kTm90aWZpY2F0aW9uKG5vdGlmaWNhdGlvbk5hbWUsIGJvZHksIHR5cGUpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEEgcmVmZXJlbmNlIHRvIHRoaXMgTm90aWZpZXIncyBGYWNhZGUuIFRoaXMgcmVmZXJlbmNlIHdpbGwgbm90IGJlIGF2YWlsYWJsZVxyXG4gKiB1bnRpbCAjaW5pdGlhbGl6ZU5vdGlmaWVyIGhhcyBiZWVuIGNhbGxlZC5cclxuICpcclxuICogQHR5cGUge3B1cmVtdmMuRmFjYWRlfVxyXG4gKi9cclxuTm90aWZpZXIucHJvdG90eXBlLmZhY2FkZTtcclxuXHJcbi8qKlxyXG4gKiBJbml0aWFsaXplIHRoaXMgTm90aWZpZXIgaW5zdGFuY2UuXHJcbiAqXHJcbiAqIFRoaXMgaXMgaG93IGEgTm90aWZpZXIgZ2V0cyBpdHMgbXVsdGl0b25LZXkuXHJcbiAqIENhbGxzIHRvICNzZW5kTm90aWZpY2F0aW9uIG9yIHRvIGFjY2VzcyB0aGVcclxuICogZmFjYWRlIHdpbGwgZmFpbCB1bnRpbCBhZnRlciB0aGlzIG1ldGhvZFxyXG4gKiBoYXMgYmVlbiBjYWxsZWQuXHJcbiAqXHJcbiAqIE1lZGlhdG9ycywgQ29tbWFuZHMgb3IgUHJveGllcyBtYXkgb3ZlcnJpZGVcclxuICogdGhpcyBtZXRob2QgaW4gb3JkZXIgdG8gc2VuZCBub3RpZmljYXRpb25zXHJcbiAqIG9yIGFjY2VzcyB0aGUgTXVsdGl0b24gRmFjYWRlIGluc3RhbmNlIGFzXHJcbiAqIHNvb24gYXMgcG9zc2libGUuIFRoZXkgQ0FOTk9UIGFjY2VzcyB0aGUgZmFjYWRlXHJcbiAqIGluIHRoZWlyIGNvbnN0cnVjdG9ycywgc2luY2UgdGhpcyBtZXRob2Qgd2lsbCBub3RcclxuICogeWV0IGhhdmUgYmVlbiBjYWxsZWQuXHJcbiAqXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcclxuICogIFRoZSBOb3RpZmllcnMgbXVsdGl0b24ga2V5O1xyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuTm90aWZpZXIucHJvdG90eXBlLmluaXRpYWxpemVOb3RpZmllciA9IGZ1bmN0aW9uKGtleSlcclxue1xyXG4gICAgdGhpcy5tdWx0aXRvbktleSA9IFN0cmluZyhrZXkpO1xyXG4gICAgdGhpcy5mYWNhZGU9IHRoaXMuZ2V0RmFjYWRlKCk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0cmlldmUgdGhlIE11bHRpdG9uIEZhY2FkZSBpbnN0YW5jZVxyXG4gKlxyXG4gKlxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEByZXR1cm4ge3B1cmVtdmMuRmFjYWRlfVxyXG4gKi9cclxuTm90aWZpZXIucHJvdG90eXBlLmdldEZhY2FkZSA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgaWYodGhpcy5tdWx0aXRvbktleSA9PSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihOb3RpZmllci5NVUxUSVRPTl9NU0cpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gRmFjYWRlLmdldEluc3RhbmNlKHRoaXMubXVsdGl0b25LZXkpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICogVGhlIE5vdGlmaWVycyBpbnRlcm5hbCBtdWx0aXRvbiBrZXkuXHJcbiAqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQHR5cGUgc3RyaW5nXHJcbiAqL1xyXG5Ob3RpZmllci5wcm90b3R5cGUubXVsdGl0b25LZXkgPSBudWxsO1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICogVGhlIGVycm9yIG1lc3NhZ2UgdXNlZCBpZiB0aGUgTm90aWZpZXIgaXMgbm90IGluaXRpYWxpemVkIGNvcnJlY3RseSBhbmRcclxuICogYXR0ZW1wdHMgdG8gcmV0cmlldmUgaXRzIG93biBtdWx0aXRvbiBrZXlcclxuICpcclxuICogQHN0YXRpY1xyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEBjb25zdFxyXG4gKiBAdHlwZSBzdHJpbmdcclxuICovXHJcbk5vdGlmaWVyLk1VTFRJVE9OX01TRyA9IFwibXVsdGl0b25LZXkgZm9yIHRoaXMgTm90aWZpZXIgbm90IHlldCBpbml0aWFsaXplZCFcIjtcclxuLyoqXHJcbiAqIEBhdXRob3IgUHVyZU1WQyBKUyBOYXRpdmUgUG9ydCBieSBEYXZpZCBGb2xleSwgRnLDqWTDqXJpYyBTYXVuaWVyLCAmIEFsYWluIER1Y2hlc25lYXVcclxuICogQGF1dGhvciBDb3B5cmlnaHQoYykgMjAwNi0yMDEyIEZ1dHVyZXNjYWxlLCBJbmMuLCBTb21lIHJpZ2h0cyByZXNlcnZlZC5cclxuICpcclxuICogQGNsYXNzIHB1cmVtdmMuU2ltcGxlQ29tbWFuZFxyXG4gKiBAZXh0ZW5kcyBwdXJlbXZjLk5vdGlmaWVyXHJcbiAqXHJcbiAqIFNpbXBsZUNvbW1hbmRzIGVuY2Fwc3VsYXRlIHRoZSBidXNpbmVzcyBsb2dpYyBvZiB5b3VyIGFwcGxpY2F0aW9uLiBZb3VyXHJcbiAqIHN1YmNsYXNzIHNob3VsZCBvdmVycmlkZSB0aGUgI2V4ZWN1dGUgbWV0aG9kIHdoZXJlIHlvdXIgYnVzaW5lc3MgbG9naWMgd2lsbFxyXG4gKiBoYW5kbGUgdGhlXHJcbiAqIHtAbGluayBwdXJlbXZjLk5vdGlmaWNhdGlvbiBOb3RpZmljYXRpb259XHJcbiAqXHJcbiAqIFRha2UgYSBsb29rIGF0XHJcbiAqIHtAbGluayBwdXJlbXZjLkZhY2FkZSNyZWdpc3RlckNvbW1hbmQgRmFjYWRlJ3MgcmVnaXN0ZXJDb21tYW5kfVxyXG4gKiBvciB7QGxpbmsgcHVyZW12Yy5Db250cm9sbGVyI3JlZ2lzdGVyQ29tbWFuZCBDb250cm9sbGVycyByZWdpc3RlckNvbW1hbmR9XHJcbiAqIG1ldGhvZHMgdG8gc2VlIGhvdyB0byBhZGQgY29tbWFuZHMgdG8geW91ciBhcHBsaWNhdGlvbi5cclxuICpcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBTaW1wbGVDb21tYW5kICgpIHsgfTtcclxuXHJcblNpbXBsZUNvbW1hbmQucHJvdG90eXBlPSBuZXcgTm90aWZpZXI7XHJcblNpbXBsZUNvbW1hbmQucHJvdG90eXBlLmNvbnN0cnVjdG9yPSBTaW1wbGVDb21tYW5kO1xyXG5cclxuLyoqXHJcbiAqIEZ1bGZpbGwgdGhlIHVzZS1jYXNlIGluaXRpYXRlZCBieSB0aGUgZ2l2ZW4gTm90aWZpY2F0aW9uXHJcbiAqXHJcbiAqIEluIHRoZSBDb21tYW5kIFBhdHRlcm4sIGFuIGFwcGxpY2F0aW9uIHVzZS1jYXNlIHR5cGljYWxseSBiZWdpbnMgd2l0aCBzb21lXHJcbiAqIHVzZXIgYWN0aW9uLCB3aGljaCByZXN1bHRzIGluIGEgTm90aWZpY2F0aW9uIGlzIGhhbmRsZWQgYnkgdGhlIGJ1c2luZXNzIGxvZ2ljXHJcbiAqIGluIHRoZSAjZXhlY3V0ZSBtZXRob2Qgb2YgYSBjb21tYW5kLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3B1cmVtdmMuTm90aWZpY2F0aW9ufSBub3RpZmljYXRpb25cclxuICogIFRoZSBub3RpZmljYXRpb24gdG8gaGFuZGxlLlxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuU2ltcGxlQ29tbWFuZC5wcm90b3R5cGUuZXhlY3V0ZT0gZnVuY3Rpb24gKG5vdGlmaWNhdGlvbikgeyB9O1xyXG4vKipcclxuICogQGF1dGhvciBQdXJlTVZDIEpTIE5hdGl2ZSBQb3J0IGJ5IERhdmlkIEZvbGV5LCBGcsOpZMOpcmljIFNhdW5pZXIsICYgQWxhaW4gRHVjaGVzbmVhdVxyXG4gKiBAYXV0aG9yIENvcHlyaWdodChjKSAyMDA2LTIwMTIgRnV0dXJlc2NhbGUsIEluYy4sIFNvbWUgcmlnaHRzIHJlc2VydmVkLlxyXG4gKlxyXG4gKiBAY2xhc3MgcHVyZW12Yy5NYWNyb0NvbW1hbmRcclxuICogQGV4dGVuZHMgcHVyZW12Yy5Ob3RpZmllclxyXG4gKlxyXG4gKiBBIGJhc2UgY29tbWFuZCBpbXBsZW1lbnRhdGlvbiB0aGF0IGV4ZWN1dGVzIG90aGVyIGNvbW1hbmRzLCBzdWNoIGFzXHJcbiAqIHtAbGluayBwdXJlbXZjLlNpbXBsZUNvbW1hbmQgU2ltcGxlQ29tbWFuZH1cclxuICogb3Ige0BsaW5rIHB1cmVtdmMuTWFjcm9Db21tYW5kIE1hY3JvQ29tbWFuZH1cclxuICogc3ViY2xhc3Nlcy5cclxuICpcclxuICogQSBNYWNyb0NvbW1hbmQgbWFpbnRhaW5zIGFuIGxpc3Qgb2ZcclxuICogY29tbWFuZCBjb25zdHJ1Y3RvciByZWZlcmVuY2VzIGNhbGxlZCAqU3ViQ29tbWFuZHMqLlxyXG4gKlxyXG4gKiBXaGVuICNleGVjdXRlIGlzIGNhbGxlZCwgdGhlIE1hY3JvQ29tbWFuZFxyXG4gKiBpbnN0YW50aWF0ZXMgYW5kIGNhbGxzICNleGVjdXRlIG9uIGVhY2ggb2YgaXRzICpTdWJDb21tYW5kcyogaW4gdHVybi5cclxuICogRWFjaCAqU3ViQ29tbWFuZCogd2lsbCBiZSBwYXNzZWQgYSByZWZlcmVuY2UgdG8gdGhlIG9yaWdpbmFsXHJcbiAqIHtAbGluayBwdXJlbXZjLk5vdGlmaWNhdGlvbiBOb3RpZmljYXRpb259XHJcbiAqIHRoYXQgd2FzIHBhc3NlZCB0byB0aGUgTWFjcm9Db21tYW5kcyAjZXhlY3V0ZSBtZXRob2RcclxuICpcclxuICogVW5saWtlIHtAbGluayBwdXJlbXZjLlNpbXBsZUNvbW1hbmQgU2ltcGxlQ29tbWFuZH0sXHJcbiAqIHlvdXIgc3ViY2xhc3Mgc2hvdWxkIG5vdCBvdmVycmlkZSAjZXhlY3V0ZSBidXQgaW5zdGVhZCwgc2hvdWxkXHJcbiAqIG92ZXJyaWRlIHRoZSAjaW5pdGlhbGl6ZU1hY3JvQ29tbWFuZCBtZXRob2QsIGNhbGxpbmcgI2FkZFN1YkNvbW1hbmQgb25jZSBmb3JcclxuICogZWFjaCAqU3ViQ29tbWFuZCogdG8gYmUgZXhlY3V0ZWQuXHJcbiAqXHJcbiAqIElmIHlvdXIgc3ViY2xhc3MgZG9lcyBkZWZpbmUgYSBjb25zdHJ1Y3RvciwgYmUgc3VyZSB0byBjYWxsIFwic3VwZXJcIiBsaWtlIHNvXHJcbiAqXHJcbiAqICAgICBmdW5jdGlvbiBNeU1hY3JvQ29tbWFuZCAoKVxyXG4gKiAgICAge1xyXG4gKiAgICAgICAgIE1hY3JvQ29tbWFuZC5jYWxsKHRoaXMpO1xyXG4gKiAgICAgfTtcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBNYWNyb0NvbW1hbmQoKVxyXG57XHJcbiAgICB0aGlzLnN1YkNvbW1hbmRzPSBbXTtcclxuICAgIHRoaXMuaW5pdGlhbGl6ZU1hY3JvQ29tbWFuZCgpO1xyXG59O1xyXG5cclxuLyogc3ViY2xhc3MgTm90aWZpZXIgKi9cclxuTWFjcm9Db21tYW5kLnByb3RvdHlwZT0gbmV3IE5vdGlmaWVyO1xyXG5NYWNyb0NvbW1hbmQucHJvdG90eXBlLmNvbnN0cnVjdG9yPSBNYWNyb0NvbW1hbmQ7XHJcblxyXG4vKipcclxuICogQHByaXZhdGVcclxuICogQHR5cGUge0FycmF5LjxwdXJlbXZjLlNpbXBsZUNvbW1hbmR8cHVyZW12Yy5NYWNyb0NvbW1hbmQ+fVxyXG4gKi9cclxuTWFjcm9Db21tYW5kLnByb3RvdHlwZS5zdWJDb21tYW5kcz0gbnVsbDtcclxuXHJcbi8qKlxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEluaXRpYWxpemUgdGhlIE1hY3JvQ29tbWFuZC5cclxuICpcclxuICogSW4geW91ciBzdWJjbGFzcywgb3ZlcnJpZGUgdGhpcyBtZXRob2QgdG9cclxuICogaW5pdGlhbGl6ZSB0aGUgTWFjcm9Db21tYW5kJ3MgKlN1YkNvbW1hbmQqXHJcbiAqIGxpc3Qgd2l0aCBjb21tYW5kIGNsYXNzIHJlZmVyZW5jZXMgbGlrZVxyXG4gKiB0aGlzOlxyXG4gKlxyXG4gKiAgICAgLy8gSW5pdGlhbGl6ZSBNeU1hY3JvQ29tbWFuZFxyXG4gKiAgICAgTXlNYWNyb0NvbW1hbmQucHJvdG90eXBlLmluaXRpYWxpemVNYWNyb0NvbW1hbmQ9IGZ1bmN0aW9uICgpXHJcbiAqICAgICB7XHJcbiAqICAgICAgICAgdGhpcy5hZGRTdWJDb21tYW5kKCBjb20ubWUubXlhcHAuY29udHJvbGxlci5GaXJzdENvbW1hbmQgKTtcclxuICogICAgICAgICB0aGlzLmFkZFN1YkNvbW1hbmQoIGNvbS5tZS5teWFwcC5jb250cm9sbGVyLlNlY29uZENvbW1hbmQgKTtcclxuICogICAgICAgICB0aGlzLmFkZFN1YkNvbW1hbmQoIGNvbS5tZS5teWFwcC5jb250cm9sbGVyLlRoaXJkQ29tbWFuZCApO1xyXG4gKiAgICAgfTtcclxuICpcclxuICogTm90ZSB0aGF0ICpTdWJDb21tYW5kKnMgbWF5IGJlIGFueSBjb21tYW5kIGltcGxlbWVudG9yLFxyXG4gKiBNYWNyb0NvbW1hbmRzIG9yIFNpbXBsZUNvbW1hbmRzIGFyZSBib3RoIGFjY2VwdGFibGUuXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5NYWNyb0NvbW1hbmQucHJvdG90eXBlLmluaXRpYWxpemVNYWNyb0NvbW1hbmQ9IGZ1bmN0aW9uKCkge31cclxuXHJcbi8qKlxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEFkZCBhICpTdWJDb21tYW5kKlxyXG4gKlxyXG4gKiBUaGUgKlN1YkNvbW1hbmQqcyB3aWxsIGJlIGNhbGxlZCBpbiBGaXJzdCBJbiAvIEZpcnN0IE91dCAoRklGTykgb3JkZXJcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY29tbWFuZENsYXNzUmVmXHJcbiAqICBBIHJlZmVyZW5jZSB0byBhIHN1YmNsYXNzZWQgU2ltcGxlQ29tbWFuZCBvciBNYWNyb0NvbW1hbmQgY29uc3RydWN0b3JcclxuICovXHJcbk1hY3JvQ29tbWFuZC5wcm90b3R5cGUuYWRkU3ViQ29tbWFuZD0gZnVuY3Rpb24oY29tbWFuZENsYXNzUmVmKVxyXG57XHJcbiAgICB0aGlzLnN1YkNvbW1hbmRzLnB1c2goY29tbWFuZENsYXNzUmVmKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBFeGVjdXRlIHRoaXMgTWFjcm9Db21tYW5kcyAqU3ViQ29tbWFuZHMqXHJcbiAqXHJcbiAqIFRoZSAqU3ViQ29tbWFuZCpzIHdpbGwgYmUgY2FsbGVkIGluIEZpcnN0IEluIC8gRmlyc3QgT3V0IChGSUZPKSBvcmRlclxyXG4gKiBAcGFyYW0ge3B1cmVtdmMuTm90aWZpY2F0aW9ufSBub3RlXHJcbiAqICBUaGUgTm90aWZpY2F0aW9uIG9iamVjdCB0byBiZSBwYXNzZWQgdG8gZWFjaCAqU3ViQ29tbWFuZCpcclxuICovXHJcbk1hY3JvQ29tbWFuZC5wcm90b3R5cGUuZXhlY3V0ZT0gZnVuY3Rpb24obm90ZSlcclxue1xyXG4gICAgLy8gU0lDLSBUT0RPIG9wdGltaXplXHJcbiAgICB3aGlsZSh0aGlzLnN1YkNvbW1hbmRzLmxlbmd0aCA+IDApXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHJlZj0gdGhpcy5zdWJDb21tYW5kcy5zaGlmdCgpO1xyXG4gICAgICAgIHZhciBjbWQ9IG5ldyByZWY7XHJcbiAgICAgICAgY21kLmluaXRpYWxpemVOb3RpZmllcih0aGlzLm11bHRpdG9uS2V5KTtcclxuICAgICAgICBjbWQuZXhlY3V0ZShub3RlKTtcclxuICAgIH1cclxufTtcclxuLyoqXHJcbiAqIEBhdXRob3IgUHVyZU1WQyBKUyBOYXRpdmUgUG9ydCBieSBEYXZpZCBGb2xleSwgRnLDqWTDqXJpYyBTYXVuaWVyLCAmIEFsYWluIER1Y2hlc25lYXVcclxuICogQGF1dGhvciBDb3B5cmlnaHQoYykgMjAwNi0yMDEyIEZ1dHVyZXNjYWxlLCBJbmMuLCBTb21lIHJpZ2h0cyByZXNlcnZlZC5cclxuICpcclxuICogQGNsYXNzIHB1cmVtdmMuTWVkaWF0b3JcclxuICogQGV4dGVuZHMgcHVyZW12Yy5Ob3RpZmllclxyXG4gKlxyXG4gKiBBIGJhc2UgTWVkaWF0b3IgaW1wbGVtZW50YXRpb24uXHJcbiAqXHJcbiAqIEluIFB1cmVNVkMsIE1lZGlhdG9yIGNsYXNzZXMgYXJlIHVzZWQgdG8gbWVkaWF0ZSBjb21tdW5pY2F0aW9uIGJldHdlZW4gYSB2aWV3XHJcbiAqIGNvbXBvbmVudCBhbmQgdGhlIHJlc3Qgb2YgdGhlIGFwcGxpY2F0aW9uLlxyXG4gKlxyXG4gKiBBIE1lZGlhdG9yIHNob3VsZCBsaXN0ZW4gdG8gaXRzIHZpZXcgY29tcG9uZW50cyBmb3IgZXZlbnRzLCBhbmQgaGFuZGxlIHRoZW1cclxuICogYnkgc2VuZGluZyBub3RpZmljYXRpb25zICh0byBiZSBoYW5kbGVkIGJ5IG90aGVyIE1lZGlhdG9ycyxcclxuICoge0BsaW5rIHB1cmVtdmMuU2ltcGxlQ29tbWFuZCBTaW1wbGVDb21tYW5kc31cclxuICogb3JcclxuICoge0BsaW5rIHB1cmVtdmMuTWFjcm9Db21tYW5kIE1hY3JvQ29tbWFuZHN9KVxyXG4gKiBvciBwYXNzaW5nIGRhdGEgZnJvbSB0aGUgdmlldyBjb21wb25lbnQgZGlyZWN0bHkgdG8gYVxyXG4gKiB7QGxpbmsgcHVyZW12Yy5Qcm94eSBQcm94eX0sIHN1Y2ggYXMgc3VibWl0dGluZ1xyXG4gKiB0aGUgY29udGVudHMgb2YgYSBmb3JtIHRvIGEgc2VydmljZS5cclxuICpcclxuICogTWVkaWF0b3JzIHNob3VsZCBub3QgcGVyZm9ybSBidXNpbmVzcyBsb2dpYywgbWFpbnRhaW4gc3RhdGUgb3Igb3RoZXJcclxuICogaW5mb3JtYXRpb24gZm9yIGl0cyB2aWV3IGNvbXBvbmVudCwgb3IgYnJlYWsgdGhlIGVuY2Fwc3VsYXRpb24gb2YgdGhlIHZpZXdcclxuICogY29tcG9uZW50IGJ5IG1hbmlwdWxhdGluZyB0aGUgdmlldyBjb21wb25lbnQncyBjaGlsZHJlbi4gSXQgc2hvdWxkIG9ubHkgY2FsbFxyXG4gKiBtZXRob2RzIG9yIHNldCBwcm9wZXJ0aWVzIG9uIHRoZSB2aWV3IGNvbXBvbmVudC5cclxuICpcclxuICogVGhlIHZpZXcgY29tcG9uZW50IHNob3VsZCBlbmNhcHN1bGF0ZSBpdHMgb3duIGJlaGF2aW9yIGFuZCBpbXBsZW1lbnRhdGlvbiBieVxyXG4gKiBleHBvc2luZyBtZXRob2RzIGFuZCBwcm9wZXJ0aWVzIHRoYXQgdGhlIE1lZGlhdG9yIGNhbiBjYWxsIHdpdGhvdXQgaGF2aW5nIHRvXHJcbiAqIGtub3cgYWJvdXQgdGhlIHZpZXcgY29tcG9uZW50J3MgY2hpbGRyZW4uXHJcbiAqXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKiBAcGFyYW0ge3N0cmluZ30gW21lZGlhdG9yTmFtZV1cclxuICogIFRoZSBNZWRpYXRvcnMgbmFtZS4gVGhlIE1lZGlhdG9ycyBzdGF0aWMgI05BTUUgdmFsdWUgaXMgdXNlZCBieSBkZWZhdWx0XHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBbdmlld0NvbXBvbmVudF1cclxuICogIFRoZSBNZWRpYXRvcnMge0BsaW5rICNzZXRWaWV3Q29tcG9uZW50IHZpZXdDb21wb25lbnR9LlxyXG4gKi9cclxuZnVuY3Rpb24gTWVkaWF0b3IgKG1lZGlhdG9yTmFtZSwgdmlld0NvbXBvbmVudClcclxue1xyXG4gICAgdGhpcy5tZWRpYXRvck5hbWU9IG1lZGlhdG9yTmFtZSB8fCB0aGlzLmNvbnN0cnVjdG9yLk5BTUU7XHJcbiAgICB0aGlzLnZpZXdDb21wb25lbnQ9dmlld0NvbXBvbmVudDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAc3RhdGljXHJcbiAqIFRoZSBuYW1lIG9mIHRoZSBNZWRpYXRvci5cclxuICpcclxuICogVHlwaWNhbGx5LCBhIE1lZGlhdG9yIHdpbGwgYmUgd3JpdHRlbiB0byBzZXJ2ZSBvbmUgc3BlY2lmaWMgY29udHJvbCBvciBncm91cFxyXG4gKiBvZiBjb250cm9scyBhbmQgc28sIHdpbGwgbm90IGhhdmUgYSBuZWVkIHRvIGJlIGR5bmFtaWNhbGx5IG5hbWVkLlxyXG4gKlxyXG4gKiBAdHlwZSB7c3RyaW5nfVxyXG4gKi9cclxuTWVkaWF0b3IuTkFNRT0gXCJNZWRpYXRvclwiO1xyXG5cclxuLyogc3ViY2xhc3MgKi9cclxuTWVkaWF0b3IucHJvdG90eXBlPSBuZXcgTm90aWZpZXI7XHJcbk1lZGlhdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj0gTWVkaWF0b3I7XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBuYW1lIG9mIHRoZSBNZWRpYXRvclxyXG4gKlxyXG4gKiBAcmV0dXJuIHtzdHJpbmd9XHJcbiAqICBUaGUgTWVkaWF0b3IgbmFtZVxyXG4gKi9cclxuTWVkaWF0b3IucHJvdG90eXBlLmdldE1lZGlhdG9yTmFtZT0gZnVuY3Rpb24gKClcclxue1xyXG4gICAgcmV0dXJuIHRoaXMubWVkaWF0b3JOYW1lO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNldCB0aGUgTWVkaWF0b3JzIHZpZXcgY29tcG9uZW50LiBUaGlzIGNvdWxkXHJcbiAqIGJlIGEgSFRNTEVsZW1lbnQsIGEgYmVzcG9rZSBVaUNvbXBvbmVudCB3cmFwcGVyXHJcbiAqIGNsYXNzLCBhIE1vb1Rvb2xzIEVsZW1lbnQsIGEgalF1ZXJ5IHJlc3VsdCBvciBhXHJcbiAqIGNzcyBzZWxlY3RvciwgZGVwZW5kaW5nIG9uIHdoaWNoIERPTSBhYnN0cmFjdGlvblxyXG4gKiBsaWJyYXJ5IHlvdSBhcmUgdXNpbmcuXHJcbiAqXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGUgdmlldyBjb21wb25lbnRcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbk1lZGlhdG9yLnByb3RvdHlwZS5zZXRWaWV3Q29tcG9uZW50PSBmdW5jdGlvbiAodmlld0NvbXBvbmVudClcclxue1xyXG4gICAgdGhpcy52aWV3Q29tcG9uZW50PSB2aWV3Q29tcG9uZW50O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgTWVkaWF0b3JzIHZpZXcgY29tcG9uZW50LlxyXG4gKlxyXG4gKiBBZGRpdGlvbmFsbHksIGFuIG9wdGlvbmFsIGV4cGxpY2l0IGdldHRlciBjYW4gYmVcclxuICogYmUgZGVmaW5lZCBpbiB0aGUgc3ViY2xhc3MgdGhhdCBkZWZpbmVzIHRoZVxyXG4gKiB2aWV3IGNvbXBvbmVudHMsIHByb3ZpZGluZyBhIG1vcmUgc2VtYW50aWMgaW50ZXJmYWNlXHJcbiAqIHRvIHRoZSBNZWRpYXRvci5cclxuICpcclxuICogVGhpcyBpcyBkaWZmZXJlbnQgZnJvbSB0aGUgQVMzIGltcGxlbWVudGF0aW9uIGluXHJcbiAqIHRoZSBzZW5zZSB0aGF0IG5vIGNhc3RpbmcgaXMgcmVxdWlyZWQgZnJvbSB0aGVcclxuICogb2JqZWN0IHN1cHBsaWVkIGFzIHRoZSB2aWV3IGNvbXBvbmVudC5cclxuICpcclxuICogICAgIE15TWVkaWF0b3IucHJvdG90eXBlLmdldENvbWJvQm94PSBmdW5jdGlvbiAoKVxyXG4gKiAgICAge1xyXG4gKiAgICAgICAgIHJldHVybiB0aGlzLnZpZXdDb21wb25lbnQ7ICBcclxuICogICAgIH1cclxuICpcclxuICogQHJldHVybiB7T2JqZWN0fVxyXG4gKiAgVGhlIHZpZXcgY29tcG9uZW50XHJcbiAqL1xyXG5NZWRpYXRvci5wcm90b3R5cGUuZ2V0Vmlld0NvbXBvbmVudD0gZnVuY3Rpb24gKClcclxue1xyXG4gICAgcmV0dXJuIHRoaXMudmlld0NvbXBvbmVudDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBMaXN0IHRoZSBOb3RpZmljYXRpb24gbmFtZXMgdGhpcyBNZWRpYXRvciBpcyBpbnRlcmVzdGVkXHJcbiAqIGluIGJlaW5nIG5vdGlmaWVkIG9mLlxyXG4gKlxyXG4gKiBAcmV0dXJuIHtBcnJheX1cclxuICogIFRoZSBsaXN0IG9mIE5vdGlmaWNhdGlvbiBuYW1lcy5cclxuICovXHJcbk1lZGlhdG9yLnByb3RvdHlwZS5saXN0Tm90aWZpY2F0aW9uSW50ZXJlc3RzPSBmdW5jdGlvbiAoKVxyXG57XHJcbiAgICByZXR1cm4gW107XHJcbn07XHJcblxyXG4vKipcclxuICogSGFuZGxlIE5vdGlmaWNhdGlvbnMuXHJcbiAqXHJcbiAqIFR5cGljYWxseSB0aGlzIHdpbGwgYmUgaGFuZGxlZCBpbiBhIHN3aXRjaCBzdGF0ZW1lbnRcclxuICogd2l0aCBvbmUgJ2Nhc2UnIGVudHJ5IHBlciBOb3RpZmljYXRpb24gdGhlIE1lZGlhdG9yXHJcbiAqIGlzIGludGVyZXN0ZWQgaW5cclxuICpcclxuICogQHBhcmFtIHtwdXJlbXZjLk5vdGlmaWNhdGlvbn0gbm90aWZpY2F0aW9uXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5NZWRpYXRvci5wcm90b3R5cGUuaGFuZGxlTm90aWZpY2F0aW9uPSBmdW5jdGlvbiAobm90aWZpY2F0aW9uKVxyXG57XHJcbiAgICByZXR1cm47XHJcbn07XHJcblxyXG4vKipcclxuICogQ2FsbGVkIGJ5IHRoZSBWaWV3IHdoZW4gdGhlIE1lZGlhdG9yIGlzIHJlZ2lzdGVyZWRcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbk1lZGlhdG9yLnByb3RvdHlwZS5vblJlZ2lzdGVyPSBmdW5jdGlvbiAoKVxyXG57XHJcbiAgICByZXR1cm47XHJcbn07XHJcblxyXG4vKipcclxuICogQ2FsbGVkIGJ5IHRoZSBWaWV3IHdoZW4gdGhlIE1lZGlhdG9yIGlzIHJlbW92ZWRcclxuICovXHJcbk1lZGlhdG9yLnByb3RvdHlwZS5vblJlbW92ZT0gZnVuY3Rpb24gKClcclxue1xyXG4gICAgcmV0dXJuO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICogVGhlIE1lZGlhdG9ycyBuYW1lLiBTaG91bGQgb25seSBiZSBhY2Nlc3NlZCBieSBNZWRpYXRvciBzdWJjbGFzc2VzLlxyXG4gKlxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEB0eXBlIHN0cmluZ1xyXG4gKi9cclxuTWVkaWF0b3IucHJvdG90eXBlLm1lZGlhdG9yTmFtZT0gbnVsbDtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqIFRoZSBNZWRpYXRvcnMgdmlld0NvbXBvbmVudC4gU2hvdWxkIG9ubHkgYmUgYWNjZXNzZWQgYnkgTWVkaWF0b3Igc3ViY2xhc3Nlcy5cclxuICpcclxuICogQHByb3RlY3RlZFxyXG4gKiBAdHlwZSBPYmplY3RcclxuICovXHJcbk1lZGlhdG9yLnByb3RvdHlwZS52aWV3Q29tcG9uZW50PW51bGw7XHJcbi8qKlxyXG4gKiBAYXV0aG9yIFB1cmVNVkMgSlMgTmF0aXZlIFBvcnQgYnkgRGF2aWQgRm9sZXksIEZyw6lkw6lyaWMgU2F1bmllciwgJiBBbGFpbiBEdWNoZXNuZWF1XHJcbiAqIEBhdXRob3IgQ29weXJpZ2h0KGMpIDIwMDYtMjAxMiBGdXR1cmVzY2FsZSwgSW5jLiwgU29tZSByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIEBjbGFzcyBwdXJlbXZjLlByb3h5XHJcbiAqIEBleHRlbmRzIHB1cmVtdmMuTm90aWZpZXJcclxuICpcclxuICogQSBiYXNlIFByb3h5IGltcGxlbWVudGF0aW9uLlxyXG4gKlxyXG4gKiBJbiBQdXJlTVZDLCBQcm94eSBjbGFzc2VzIGFyZSB1c2VkIHRvIG1hbmFnZSBwYXJ0cyBvZiB0aGUgYXBwbGljYXRpb24ncyBkYXRhXHJcbiAqIG1vZGVsLlxyXG4gKlxyXG4gKiBBIFByb3h5IG1pZ2h0IHNpbXBseSBtYW5hZ2UgYSByZWZlcmVuY2UgdG8gYSBsb2NhbCBkYXRhIG9iamVjdCwgaW4gd2hpY2ggY2FzZVxyXG4gKiBpbnRlcmFjdGluZyB3aXRoIGl0IG1pZ2h0IGludm9sdmUgc2V0dGluZyBhbmQgZ2V0dGluZyBvZiBpdHMgZGF0YSBpblxyXG4gKiBzeW5jaHJvbm91cyBmYXNoaW9uLlxyXG4gKlxyXG4gKiBQcm94eSBjbGFzc2VzIGFyZSBhbHNvIHVzZWQgdG8gZW5jYXBzdWxhdGUgdGhlIGFwcGxpY2F0aW9uJ3MgaW50ZXJhY3Rpb24gd2l0aFxyXG4gKiByZW1vdGUgc2VydmljZXMgdG8gc2F2ZSBvciByZXRyaWV2ZSBkYXRhLCBpbiB3aGljaCBjYXNlLCB3ZSBhZG9wdCBhblxyXG4gKiBhc3luY3Jvbm91cyBpZGlvbTsgc2V0dGluZyBkYXRhIChvciBjYWxsaW5nIGEgbWV0aG9kKSBvbiB0aGUgUHJveHkgYW5kXHJcbiAqIGxpc3RlbmluZyBmb3IgYVxyXG4gKiB7QGxpbmsgcHVyZW12Yy5Ob3RpZmljYXRpb24gTm90aWZpY2F0aW9ufVxyXG4gKiB0byBiZSBzZW50ICB3aGVuIHRoZSBQcm94eSBoYXMgcmV0cmlldmVkIHRoZSBkYXRhIGZyb20gdGhlIHNlcnZpY2UuXHJcbiAqXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbcHJveHlOYW1lXVxyXG4gKiAgVGhlIFByb3h5J3MgbmFtZS4gSWYgbm9uZSBpcyBwcm92aWRlZCwgdGhlIFByb3h5IHdpbGwgdXNlIGl0cyBjb25zdHJ1Y3RvcnNcclxuICogIE5BTUUgcHJvcGVydHkuXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBbZGF0YV1cclxuICogIFRoZSBQcm94eSdzIGRhdGEgb2JqZWN0XHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gUHJveHkocHJveHlOYW1lLCBkYXRhKVxyXG57XHJcbiAgICB0aGlzLnByb3h5TmFtZT0gcHJveHlOYW1lIHx8IHRoaXMuY29uc3RydWN0b3IuTkFNRTtcclxuICAgIGlmKGRhdGEgIT0gbnVsbClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnNldERhdGEoZGF0YSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuUHJveHkuTkFNRT0gXCJQcm94eVwiO1xyXG5cclxuUHJveHkucHJvdG90eXBlPSBuZXcgTm90aWZpZXI7XHJcblByb3h5LnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj0gUHJveHk7XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBQcm94eSdzIG5hbWUuXHJcbiAqXHJcbiAqIEByZXR1cm4ge3N0cmluZ31cclxuICovXHJcblByb3h5LnByb3RvdHlwZS5nZXRQcm94eU5hbWU9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgcmV0dXJuIHRoaXMucHJveHlOYW1lO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNldCB0aGUgUHJveHkncyBkYXRhIG9iamVjdFxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gZGF0YVxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuUHJveHkucHJvdG90eXBlLnNldERhdGE9IGZ1bmN0aW9uKGRhdGEpXHJcbntcclxuICAgIHRoaXMuZGF0YT0gZGF0YTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIFByb3h5J3MgZGF0YSBvYmplY3RcclxuICpcclxuICogQHJldHVybiB7T2JqZWN0fVxyXG4gKi9cclxuUHJveHkucHJvdG90eXBlLmdldERhdGE9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgcmV0dXJuIHRoaXMuZGF0YTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDYWxsZWQgYnkgdGhlIHtAbGluayBwdXJlbXZjLk1vZGVsIE1vZGVsfSB3aGVuXHJcbiAqIHRoZSBQcm94eSBpcyByZWdpc3RlcmVkLlxyXG4gKlxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuUHJveHkucHJvdG90eXBlLm9uUmVnaXN0ZXI9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgcmV0dXJuO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENhbGxlZCBieSB0aGUge0BsaW5rIHB1cmVtdmMuTW9kZWwgTW9kZWx9IHdoZW5cclxuICogdGhlIFByb3h5IGlzIHJlbW92ZWQuXHJcbiAqXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5Qcm94eS5wcm90b3R5cGUub25SZW1vdmU9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgcmV0dXJuO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICogVGhlIFByb3h5cyBuYW1lLlxyXG4gKlxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEB0eXBlIFN0cmluZ1xyXG4gKi9cclxuUHJveHkucHJvdG90eXBlLnByb3h5TmFtZT0gbnVsbDtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqIFRoZSBQcm94eSdzIGRhdGEgb2JqZWN0LlxyXG4gKlxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEB0eXBlIE9iamVjdFxyXG4gKi9cclxuUHJveHkucHJvdG90eXBlLmRhdGE9IG51bGw7XHJcbi8qKlxyXG4gKiBAYXV0aG9yIFB1cmVNVkMgSlMgTmF0aXZlIFBvcnQgYnkgRGF2aWQgRm9sZXksIEZyw6lkw6lyaWMgU2F1bmllciwgJiBBbGFpbiBEdWNoZXNuZWF1XHJcbiAqIEBhdXRob3IgQ29weXJpZ2h0KGMpIDIwMDYtMjAxMiBGdXR1cmVzY2FsZSwgSW5jLiwgU29tZSByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIEBjbGFzcyBwdXJlbXZjLkZhY2FkZVxyXG4gKiBGYWNhZGUgZXhwb3NlcyB0aGUgZnVuY3Rpb25hbGl0eSBvZiB0aGUgQ29udHJvbGxlciwgTW9kZWwgYW5kIFZpZXdcclxuICogYWN0b3JzIHRvIGNsaWVudCBmYWNpbmcgY29kZS5cclxuICpcclxuICogVGhpcyBGYWNhZGUgaW1wbGVtZW50YXRpb24gaXMgYSBNdWx0aXRvbiwgc28geW91IHNob3VsZCBub3QgY2FsbCB0aGVcclxuICogY29uc3RydWN0b3IgZGlyZWN0bHksIGJ1dCBpbnN0ZWFkIGNhbGwgdGhlIHN0YXRpYyBGYWN0b3J5IG1ldGhvZCxcclxuICogcGFzc2luZyB0aGUgdW5pcXVlIGtleSBmb3IgdGhpcyBpbnN0YW5jZSB0byAjZ2V0SW5zdGFuY2VcclxuICpcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcclxuICogXHRUaGUgbXVsdGl0b24ga2V5IHRvIHVzZSB0byByZXRyaWV2ZSB0aGUgRmFjYWRlIGluc3RhbmNlLlxyXG4gKiBAdGhyb3dzIHtFcnJvcn1cclxuICogIElmIGFuIGF0dGVtcHQgaXMgbWFkZSB0byBpbnN0YW50aWF0ZSBGYWNhZGUgZGlyZWN0bHlcclxuICovXHJcbmZ1bmN0aW9uIEZhY2FkZShrZXkpXHJcbntcclxuICAgIGlmKEZhY2FkZS5pbnN0YW5jZU1hcFtrZXldICE9IG51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKEZhY2FkZS5NVUxUSVRPTl9NU0cpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuaW5pdGlhbGl6ZU5vdGlmaWVyKGtleSk7XHJcbiAgICBGYWNhZGUuaW5zdGFuY2VNYXBba2V5XSA9IHRoaXM7XHJcbiAgICB0aGlzLmluaXRpYWxpemVGYWNhZGUoKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBJbml0aWFsaXplIHRoZSBNdWx0aXRvbiBGYWNhZGUgaW5zdGFuY2UuXHJcbiAqXHJcbiAqIENhbGxlZCBhdXRvbWF0aWNhbGx5IGJ5IHRoZSBjb25zdHJ1Y3Rvci4gT3ZlcnJpZGUgaW4geW91ciBzdWJjbGFzcyB0byBhbnlcclxuICogc3ViY2xhc3Mgc3BlY2lmaWMgaW5pdGlhbGl6YXRpb25zLiBCZSBzdXJlIHRvIGNhbGwgdGhlICdzdXBlcidcclxuICogaW5pdGlhbGl6ZUZhY2FkZSBtZXRob2QsIHRob3VnaFxyXG4gKlxyXG4gKiAgICAgTXlGYWNhZGUucHJvdG90eXBlLmluaXRpYWxpemVGYWNhZGU9IGZ1bmN0aW9uICgpXHJcbiAqICAgICB7XHJcbiAqICAgICAgICAgRmFjYWRlLmNhbGwodGhpcyk7XHJcbiAqICAgICB9O1xyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5GYWNhZGUucHJvdG90eXBlLmluaXRpYWxpemVGYWNhZGUgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHRoaXMuaW5pdGlhbGl6ZU1vZGVsKCk7XHJcbiAgICB0aGlzLmluaXRpYWxpemVDb250cm9sbGVyKCk7XHJcbiAgICB0aGlzLmluaXRpYWxpemVWaWV3KCk7XHJcbn07XHJcblxyXG4vKipcclxuICogRmFjYWRlIE11bHRpdG9uIEZhY3RvcnkgbWV0aG9kLlxyXG4gKiBOb3RlIHRoYXQgdGhpcyBtZXRob2Qgd2lsbCByZXR1cm4gbnVsbCBpZiBzdXBwbGllZCBhXHJcbiAqIG51bGwgb3IgdW5kZWZpbmVkIG11bHRpdG9uIGtleS5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IGtleVxyXG4gKiBcdFRoZSBtdWx0aXRvbiBrZXkgdXNlIHRvIHJldHJpZXZlIGEgcGFydGljdWxhciBGYWNhZGUgaW5zdGFuY2VcclxuICogQHJldHVybiB7cHVyZW12Yy5GYWNhZGV9XHJcbiAqL1xyXG5GYWNhZGUuZ2V0SW5zdGFuY2UgPSBmdW5jdGlvbihrZXkpXHJcbntcclxuICAgIGlmIChudWxsID09IGtleSlcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuXHJcbiAgICBpZihGYWNhZGUuaW5zdGFuY2VNYXBba2V5XSA9PSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIEZhY2FkZS5pbnN0YW5jZU1hcFtrZXldID0gbmV3IEZhY2FkZShrZXkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBGYWNhZGUuaW5zdGFuY2VNYXBba2V5XTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBJbml0aWFsaXplIHRoZSB7QGxpbmsgcHVyZW12Yy5Db250cm9sbGVyIENvbnRyb2xsZXJ9LlxyXG4gKlxyXG4gKiBDYWxsZWQgYnkgdGhlICNpbml0aWFsaXplRmFjYWRlIG1ldGhvZC5cclxuICpcclxuICogT3ZlcnJpZGUgdGhpcyBtZXRob2QgaW4geW91ciBzdWJjbGFzcyBvZiBGYWNhZGVcclxuICogaWYgb25lIG9yIGJvdGggb2YgdGhlIGZvbGxvd2luZyBhcmUgdHJ1ZTpcclxuICogLSBZb3Ugd2lzaCB0byBpbml0aWFsaXplIGEgZGlmZmVyZW50IENvbnRyb2xsZXJcclxuICogLSBZb3UgaGF2ZVxyXG4gKiB7QGxpbmsgcHVyZW12Yy5TaW1wbGVDb21tYW5kIFNpbXBsZUNvbW1hbmR9c1xyXG4gKiBvciB7QGxpbmsgcHVyZW12Yy5NYWNyb0NvbW1hbmQgTWFjcm9Db21tYW5kfXNcclxuICogdG8gcmVnaXN0ZXIgd2l0aCB0aGUgQ29udHJvbGxlcmF0IHN0YXJ0dXAuXHJcbiAqXHJcbiAqIElmIHlvdSBkb24ndCB3YW50IHRvIGluaXRpYWxpemUgYSBkaWZmZXJlbnQgQ29udHJvbGxlcixcclxuICogY2FsbCB0aGUgJ3N1cGVyJyBpbml0aWFsaXplQ29udHJvbGxlIG1ldGhvZCBhdCB0aGUgYmVnaW5uaW5nIG9mIHlvdXJcclxuICogbWV0aG9kLCB0aGVuIHJlZ2lzdGVyIGNvbW1hbmRzLlxyXG4gKlxyXG4gKiAgICAgTXlGYWNhZGUucHJvdG90eXBlLmluaXRpYWxpemVDb250cm9sbGVyPSBmdW5jdGlvbiAoKVxyXG4gKiAgICAge1xyXG4gKiAgICAgICAgIEZhY2FkZS5wcm90b3R5cGUuaW5pdGlhbGl6ZUNvbnRyb2xsZXIuY2FsbCh0aGlzKTtcclxuICogICAgICAgICB0aGlzLnJlZ2lzdGVyQ29tbWFuZChBcHBDb25zdGFudHMuQV9OT1RFX05BTUUsIEFCZXNwb2tlQ29tbWFuZClcclxuICogICAgIH1cclxuICpcclxuICogQHByb3RlY3RlZFxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuRmFjYWRlLnByb3RvdHlwZS5pbml0aWFsaXplQ29udHJvbGxlciA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgaWYodGhpcy5jb250cm9sbGVyICE9IG51bGwpXHJcbiAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgIHRoaXMuY29udHJvbGxlciA9IENvbnRyb2xsZXIuZ2V0SW5zdGFuY2UodGhpcy5tdWx0aXRvbktleSk7XHJcbn07XHJcblxyXG4vKipcclxuICogQHByb3RlY3RlZFxyXG4gKiBJbml0aWFsaXplIHRoZSB7QGxpbmsgcHVyZW12Yy5Nb2RlbCBNb2RlbH07XHJcbiAqXHJcbiAqIENhbGxlZCBieSB0aGUgI2luaXRpYWxpemVGYWNhZGUgbWV0aG9kLlxyXG4gKiBPdmVycmlkZSB0aGlzIG1ldGhvZCBpbiB5b3VyIHN1YmNsYXNzIG9mIEZhY2FkZSBpZiBvbmUgb2YgdGhlIGZvbGxvd2luZyBhcmVcclxuICogdHJ1ZTpcclxuICpcclxuICogLSBZb3Ugd2lzaCB0byBpbml0aWFsaXplIGEgZGlmZmVyZW50IE1vZGVsLlxyXG4gKlxyXG4gKiAtIFlvdSBoYXZlIHtAbGluayBwdXJlbXZjLlByb3h5IFByb3h5fXMgdG9cclxuICogICByZWdpc3RlciB3aXRoIHRoZSBNb2RlbCB0aGF0IGRvIG5vdCByZXRyaWV2ZSBhIHJlZmVyZW5jZSB0byB0aGUgRmFjYWRlIGF0XHJcbiAqICAgY29uc3RydWN0aW9uIHRpbWUuXHJcbiAqXHJcbiAqIElmIHlvdSBkb24ndCB3YW50IHRvIGluaXRpYWxpemUgYSBkaWZmZXJlbnQgTW9kZWxcclxuICogY2FsbCAnc3VwZXInICNpbml0aWFsaXplTW9kZWwgYXQgdGhlIGJlZ2lubmluZyBvZiB5b3VyIG1ldGhvZCwgdGhlbiByZWdpc3RlclxyXG4gKiBQcm94eXMuXHJcbiAqXHJcbiAqIE5vdGU6IFRoaXMgbWV0aG9kIGlzICpyYXJlbHkqIG92ZXJyaWRkZW47IGluIHByYWN0aWNlIHlvdSBhcmUgbW9yZVxyXG4gKiBsaWtlbHkgdG8gdXNlIGEgY29tbWFuZCB0byBjcmVhdGUgYW5kIHJlZ2lzdGVyUHJveHlzIHdpdGggdGhlIE1vZGVsPixcclxuICogc2luY2UgUHJveHlzIHdpdGggbXV0YWJsZSBkYXRhIHdpbGwgbGlrZWx5XHJcbiAqIG5lZWQgdG8gc2VuZCBOb3RpZmljYXRpb25zIGFuZCB0aHVzIHdpbGwgbGlrZWx5IHdhbnQgdG8gZmV0Y2ggYSByZWZlcmVuY2UgdG9cclxuICogdGhlIEZhY2FkZSBkdXJpbmcgdGhlaXIgY29uc3RydWN0aW9uLlxyXG4gKlxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuRmFjYWRlLnByb3RvdHlwZS5pbml0aWFsaXplTW9kZWwgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIGlmKHRoaXMubW9kZWwgIT0gbnVsbClcclxuICAgICAgICByZXR1cm47XHJcblxyXG4gICAgdGhpcy5tb2RlbCA9IE1vZGVsLmdldEluc3RhbmNlKHRoaXMubXVsdGl0b25LZXkpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICpcclxuICogSW5pdGlhbGl6ZSB0aGUge0BsaW5rIHB1cmVtdmMuVmlldyBWaWV3fS5cclxuICpcclxuICogQ2FsbGVkIGJ5IHRoZSAjaW5pdGlhbGl6ZUZhY2FkZSBtZXRob2QuXHJcbiAqXHJcbiAqIE92ZXJyaWRlIHRoaXMgbWV0aG9kIGluIHlvdXIgc3ViY2xhc3Mgb2YgRmFjYWRlIGlmIG9uZSBvciBib3RoIG9mIHRoZVxyXG4gKiBmb2xsb3dpbmcgYXJlIHRydWU6XHJcbiAqXHJcbiAqIC0gWW91IHdpc2ggdG8gaW5pdGlhbGl6ZSBhIGRpZmZlcmVudCBWaWV3LlxyXG4gKiAtIFlvdSBoYXZlIE9ic2VydmVycyB0byByZWdpc3RlciB3aXRoIHRoZSBWaWV3XHJcbiAqXHJcbiAqIElmIHlvdSBkb24ndCB3YW50IHRvIGluaXRpYWxpemUgYSBkaWZmZXJlbnQgVmlld1xyXG4gKiBjYWxsICdzdXBlcicgI2luaXRpYWxpemVWaWV3IGF0IHRoZSBiZWdpbm5pbmcgb2YgeW91clxyXG4gKiBtZXRob2QsIHRoZW4gcmVnaXN0ZXIgTWVkaWF0b3IgaW5zdGFuY2VzLlxyXG4gKlxyXG4gKiAgICAgTXlGYWNhZGUucHJvdG90eXBlLmluaXRpYWxpemVWaWV3PSBmdW5jdGlvbiAoKVxyXG4gKiAgICAge1xyXG4gKiAgICAgICAgIEZhY2FkZS5wcm90b3R5cGUuaW5pdGlhbGl6ZVZpZXcuY2FsbCh0aGlzKTtcclxuICogICAgICAgICB0aGlzLnJlZ2lzdGVyTWVkaWF0b3IobmV3IE15TWVkaWF0b3IoKSk7XHJcbiAqICAgICB9O1xyXG4gKlxyXG4gKiBOb3RlOiBUaGlzIG1ldGhvZCBpcyAqcmFyZWx5KiBvdmVycmlkZGVuOyBpbiBwcmFjdGljZSB5b3UgYXJlIG1vcmVcclxuICogbGlrZWx5IHRvIHVzZSBhIGNvbW1hbmQgdG8gY3JlYXRlIGFuZCByZWdpc3RlciBNZWRpYXRvcnNcclxuICogd2l0aCB0aGUgVmlldywgc2luY2UgTWVkaWF0b3IgaW5zdGFuY2VzIHdpbGwgbmVlZCB0byBzZW5kXHJcbiAqIE5vdGlmaWNhdGlvbnMgYW5kIHRodXMgd2lsbCBsaWtlbHkgd2FudCB0byBmZXRjaCBhIHJlZmVyZW5jZVxyXG4gKiB0byB0aGUgRmFjYWRlIGR1cmluZyB0aGVpciBjb25zdHJ1Y3Rpb24uXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5GYWNhZGUucHJvdG90eXBlLmluaXRpYWxpemVWaWV3ID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICBpZih0aGlzLnZpZXcgIT0gbnVsbClcclxuICAgICAgICByZXR1cm47XHJcblxyXG4gICAgdGhpcy52aWV3ID0gVmlldy5nZXRJbnN0YW5jZSh0aGlzLm11bHRpdG9uS2V5KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZWdpc3RlciBhIGNvbW1hbmQgd2l0aCB0aGUgQ29udHJvbGxlciBieSBOb3RpZmljYXRpb24gbmFtZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbm90aWZpY2F0aW9uTmFtZVxyXG4gKiAgVGhlIG5hbWUgb2YgdGhlIE5vdGlmaWNhdGlvbiB0byBhc3NvY2lhdGUgdGhlIGNvbW1hbmQgd2l0aFxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb21tYW5kQ2xhc3NSZWZcclxuICogIEEgcmVmZXJlbmNlIG90IHRoZSBjb21tYW5kcyBjb25zdHJ1Y3Rvci5cclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbkZhY2FkZS5wcm90b3R5cGUucmVnaXN0ZXJDb21tYW5kID0gZnVuY3Rpb24obm90aWZpY2F0aW9uTmFtZSwgY29tbWFuZENsYXNzUmVmKVxyXG57XHJcbiAgICB0aGlzLmNvbnRyb2xsZXIucmVnaXN0ZXJDb21tYW5kKG5vdGlmaWNhdGlvbk5hbWUsIGNvbW1hbmRDbGFzc1JlZik7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlIGEgcHJldmlvdXNseSByZWdpc3RlcmVkIGNvbW1hbmQgdG8gTm90aWZpY2F0aW9uIG1hcHBpbmcgZnJvbSB0aGVcclxuICoge0BsaW5rIHB1cmVtdmMuQ29udHJvbGxlciNyZW1vdmVDb21tYW5kIENvbnRyb2xsZXJ9XHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBub3RpZmljYXRpb25OYW1lXHJcbiAqICBUaGUgbmFtZSBvZiB0aGUgdGhlIE5vdGlmaWNhdGlvbiB0byByZW1vdmUgZnJvbSB0aGUgY29tbWFuZCBtYXBwaW5nIGZvci5cclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbkZhY2FkZS5wcm90b3R5cGUucmVtb3ZlQ29tbWFuZCA9IGZ1bmN0aW9uKG5vdGlmaWNhdGlvbk5hbWUpXHJcbntcclxuICAgIHRoaXMuY29udHJvbGxlci5yZW1vdmVDb21tYW5kKG5vdGlmaWNhdGlvbk5hbWUpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIGEgY29tbWFuZCBpcyByZWdpc3RlcmVkIGZvciBhIGdpdmVuIG5vdGlmaWNhdGlvbi5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG5vdGlmaWNhdGlvbk5hbWVcclxuICogIEEgTm90aWZpY2F0aW9uIG5hbWVcclxuICogQHJldHVybiB7Ym9vbGVhbn1cclxuICogIFdoZXRoZXIgYSBjb21tYW4gaXMgY3VycmVudGx5IHJlZ2lzdGVyZWQgZm9yIHRoZSBnaXZlbiBub3RpZmljYXRpb25OYW1lXHJcbiAqL1xyXG5GYWNhZGUucHJvdG90eXBlLmhhc0NvbW1hbmQgPSBmdW5jdGlvbihub3RpZmljYXRpb25OYW1lKVxyXG57XHJcbiAgICByZXR1cm4gdGhpcy5jb250cm9sbGVyLmhhc0NvbW1hbmQobm90aWZpY2F0aW9uTmFtZSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVnaXN0ZXIgYSBQcm94eSB3aXRoIHRoZSB7QGxpbmsgcHVyZW12Yy5Nb2RlbCNyZWdpc3RlclByb3h5IE1vZGVsfVxyXG4gKiBieSBuYW1lLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3B1cmVtdmMuUHJveHl9IHByb3h5XHJcbiAqICBUaGUgUHJveHkgaW5zdGFuY2UgdG8gYmUgcmVnaXN0ZXJlZCB3aXRoIHRoZSBNb2RlbC5cclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbkZhY2FkZS5wcm90b3R5cGUucmVnaXN0ZXJQcm94eSA9IGZ1bmN0aW9uKHByb3h5KVxyXG57XHJcbiAgICB0aGlzLm1vZGVsLnJlZ2lzdGVyUHJveHkocHJveHkpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHJpZXZlIGEgUHJveHkgZnJvbSB0aGUgTW9kZWxcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHByb3h5TmFtZVxyXG4gKiBAcmV0dXJuIHtwdXJlbXZjLlByb3h5fVxyXG4gKi9cclxuRmFjYWRlLnByb3RvdHlwZS5yZXRyaWV2ZVByb3h5ID0gZnVuY3Rpb24ocHJveHlOYW1lKVxyXG57XHJcbiAgICByZXR1cm4gdGhpcy5tb2RlbC5yZXRyaWV2ZVByb3h5KHByb3h5TmFtZSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlIGEgUHJveHkgZnJvbSB0aGUgTW9kZWwgYnkgbmFtZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJveHlOYW1lXHJcbiAqICBUaGUgbmFtZSBvZiB0aGUgUHJveHlcclxuICogQHJldHVybiB7cHVyZW12Yy5Qcm94eX1cclxuICogIFRoZSBQcm94eSB0aGF0IHdhcyByZW1vdmVkIGZyb20gdGhlIE1vZGVsXHJcbiAqL1xyXG5GYWNhZGUucHJvdG90eXBlLnJlbW92ZVByb3h5ID0gZnVuY3Rpb24ocHJveHlOYW1lKVxyXG57XHJcbiAgICB2YXIgcHJveHkgPSBudWxsO1xyXG4gICAgaWYodGhpcy5tb2RlbCAhPSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIHByb3h5ID0gdGhpcy5tb2RlbC5yZW1vdmVQcm94eShwcm94eU5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBwcm94eTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDaGVjayBpdCBhIFByb3h5IGlzIHJlZ2lzdGVyZWQuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm94eU5hbWVcclxuICogIEEgUHJveHkgbmFtZVxyXG4gKiBAcmV0dXJuIHtib29sZWFufVxyXG4gKiAgV2hldGhlciBhIFByb3h5IGlzIGN1cnJlbnRseSByZWdpc3RlcmVkIHdpdGggdGhlIGdpdmVuIHByb3h5TmFtZVxyXG4gKi9cclxuRmFjYWRlLnByb3RvdHlwZS5oYXNQcm94eSA9IGZ1bmN0aW9uKHByb3h5TmFtZSlcclxue1xyXG4gICAgcmV0dXJuIHRoaXMubW9kZWwuaGFzUHJveHkocHJveHlOYW1lKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZWdpc3RlciBhIE1lZGlhdG9yIHdpdGggd2l0aCB0aGUgVmlldy5cclxuICpcclxuICogQHBhcmFtIHtwdXJlbXZjLk1lZGlhdG9yfSBtZWRpYXRvclxyXG4gKiAgQSByZWZlcmVuY2UgdG8gdGhlIE1lZGlhdG9yIHRvIHJlZ2lzdGVyXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5GYWNhZGUucHJvdG90eXBlLnJlZ2lzdGVyTWVkaWF0b3IgPSBmdW5jdGlvbihtZWRpYXRvcilcclxue1xyXG4gICAgaWYodGhpcy52aWV3ICE9IG51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy52aWV3LnJlZ2lzdGVyTWVkaWF0b3IobWVkaWF0b3IpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHJpZXZlIGEgTWVkaWF0b3IgZnJvbSB0aGUgVmlldyBieSBuYW1lXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZWRpYXRvck5hbWVcclxuICogIFRoZSBNZWRpYXRvcnMgbmFtZVxyXG4gKiBAcmV0dXJuIHtwdXJlbXZjLk1lZGlhdG9yfVxyXG4gKiAgVGhlIHJldHJpZXZlZCBNZWRpYXRvclxyXG4gKi9cclxuRmFjYWRlLnByb3RvdHlwZS5yZXRyaWV2ZU1lZGlhdG9yID0gZnVuY3Rpb24obWVkaWF0b3JOYW1lKVxyXG57XHJcbiAgICByZXR1cm4gdGhpcy52aWV3LnJldHJpZXZlTWVkaWF0b3IobWVkaWF0b3JOYW1lKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmUgYSBNZWRpYXRvciBmcm9tIHRoZSBWaWV3LlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVkaWF0b3JOYW1lXHJcbiAqICBUaGUgbmFtZSBvZiB0aGUgTWVkaWF0b3IgdG8gcmVtb3ZlLlxyXG4gKiBAcmV0dXJuIHtwdXJlbXZjLk1lZGlhdG9yfVxyXG4gKiAgVGhlIHJlbW92ZWQgTWVkaWF0b3JcclxuICovXHJcbkZhY2FkZS5wcm90b3R5cGUucmVtb3ZlTWVkaWF0b3IgPSBmdW5jdGlvbihtZWRpYXRvck5hbWUpXHJcbntcclxuICAgIHZhciBtZWRpYXRvciA9IG51bGw7XHJcbiAgICBpZih0aGlzLnZpZXcgIT0gbnVsbClcclxuICAgIHtcclxuICAgICAgICBtZWRpYXRvciA9IHRoaXMudmlldy5yZW1vdmVNZWRpYXRvcihtZWRpYXRvck5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBtZWRpYXRvcjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDaGVjayBpZiBhIE1lZGlhdG9yIGlzIHJlZ2lzdGVyZWQgb3Igbm90LlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVkaWF0b3JOYW1lXHJcbiAqICBBIE1lZGlhdG9yIG5hbWVcclxuICogQHJldHVybiB7Ym9vbGVhbn1cclxuICogIFdoZXRoZXIgYSBNZWRpYXRvciBpcyByZWdpc3RlcmVkIHdpdGggdGhlIGdpdmVuIG1lZGlhdG9yTmFtZVxyXG4gKi9cclxuRmFjYWRlLnByb3RvdHlwZS5oYXNNZWRpYXRvciA9IGZ1bmN0aW9uKG1lZGlhdG9yTmFtZSlcclxue1xyXG4gICAgcmV0dXJuIHRoaXMudmlldy5oYXNNZWRpYXRvcihtZWRpYXRvck5hbWUpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhbmQgc2VuZCBhXHJcbiAqIHtAbGluayBwdXJlbXZjLk5vdGlmaWNhdGlvbiBOb3RpZmljYXRpb259XHJcbiAqXHJcbiAqIEtlZXBzIHVzIGZyb20gaGF2aW5nIHRvIGNvbnN0cnVjdCBuZXcgTm90aWZpY2F0aW9uIGluc3RhbmNlcyBpbiBvdXJcclxuICogaW1wbGVtZW50YXRpb25cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG5vdGlmaWNhdGlvbk5hbWVcclxuICogIFRoZSBuYW1lIG9mIHRoZSBOb3RpZmljYXRpb24gdG8gc2VuZFxyXG4gKiBAcGFyYW0ge09iamVjdH0gW2JvZHldXHJcbiAqICBUaGUgYm9keSBvZiB0aGUgbm90aWZpY2F0aW9uXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbdHlwZV1cclxuICogIFRoZSB0eXBlIG9mIHRoZSBub3RpZmljYXRpb25cclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbkZhY2FkZS5wcm90b3R5cGUuc2VuZE5vdGlmaWNhdGlvbiA9IGZ1bmN0aW9uKG5vdGlmaWNhdGlvbk5hbWUsIGJvZHksIHR5cGUpXHJcbntcclxuICAgIHRoaXMubm90aWZ5T2JzZXJ2ZXJzKG5ldyBOb3RpZmljYXRpb24obm90aWZpY2F0aW9uTmFtZSwgYm9keSwgdHlwZSkpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIE5vdGlmeSB7QGxpbmsgcHVyZW12Yy5PYnNlcnZlciBPYnNlcnZlcn1zXHJcbiAqXHJcbiAqIFRoaXMgbWV0aG9kIGlzIGxlZnQgcHVibGljIG1vc3RseSBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eSwgYW5kIHRvIGFsbG93XHJcbiAqIHlvdSB0byBzZW5kIGN1c3RvbSBub3RpZmljYXRpb24gY2xhc3NlcyB1c2luZyB0aGUgZmFjYWRlLlxyXG4gKlxyXG4gKiBVc3VhbGx5IHlvdSBzaG91bGQganVzdCBjYWxsIHNlbmROb3RpZmljYXRpb24gYW5kIHBhc3MgdGhlIHBhcmFtZXRlcnMsIG5ldmVyXHJcbiAqIGhhdmluZyB0byBjb25zdHJ1Y3QgdGhlIG5vdGlmaWNhdGlvbiB5b3Vyc2VsZi5cclxuICpcclxuICogQHBhcmFtIHtwdXJlbXZjLk5vdGlmaWNhdGlvbn0gbm90aWZpY2F0aW9uXHJcbiAqICBUaGUgTm90aWZpY2F0aW9uIHRvIHNlbmRcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbkZhY2FkZS5wcm90b3R5cGUubm90aWZ5T2JzZXJ2ZXJzID0gZnVuY3Rpb24obm90aWZpY2F0aW9uKVxyXG57XHJcbiAgICBpZih0aGlzLnZpZXcgIT0gbnVsbClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnZpZXcubm90aWZ5T2JzZXJ2ZXJzKG5vdGlmaWNhdGlvbik7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogSW5pdGlhbGl6ZSB0aGUgRmFjYWRlcyBOb3RpZmllciBjYXBhYmlsaXRpZXMgYnkgc2V0dGluZyB0aGUgTXVsdGl0b24ga2V5IGZvclxyXG4gKiB0aGlzIGZhY2FkZSBpbnN0YW5jZS5cclxuICpcclxuICogTm90IGNhbGxlZCBkaXJlY3RseSwgYnV0IGluc3RlYWQgZnJvbSB0aGUgY29uc3RydWN0b3Igd2hlbiAjZ2V0SW5zdGFuY2UgaXNcclxuICogaW52b2tlZC4gSXQgaXMgbmVjZXNzYXJ5IHRvIGJlIHB1YmxpYyBpbiBvcmRlciB0byBpbXBsZW1lbnQgTm90aWZpZXJcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IGtleVxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuRmFjYWRlLnByb3RvdHlwZS5pbml0aWFsaXplTm90aWZpZXIgPSBmdW5jdGlvbihrZXkpXHJcbntcclxuICAgIHRoaXMubXVsdGl0b25LZXkgPSBrZXk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ2hlY2sgaWYgYSAqQ29yZSogaXMgcmVnaXN0ZXJlZCBvciBub3RcclxuICpcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5XHJcbiAqICBUaGUgbXVsdGl0b24ga2V5IGZvciB0aGUgKkNvcmUqIGluIHF1ZXN0aW9uXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAqICBXaGV0aGVyIGEgKkNvcmUqIGlzIHJlZ2lzdGVyZWQgd2l0aCB0aGUgZ2l2ZW4ga2V5XHJcbiAqL1xyXG5GYWNhZGUuaGFzQ29yZSA9IGZ1bmN0aW9uKGtleSlcclxue1xyXG4gICAgcmV0dXJuIEZhY2FkZS5pbnN0YW5jZU1hcFtrZXldICE9IG51bGw7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlIGEgKkNvcmUqXHJcbiAqXHJcbiAqIFJlbW92ZSB0aGUgTW9kZWwsIFZpZXcsIENvbnRyb2xsZXIgYW5kIEZhY2FkZSBmb3IgYSBnaXZlbiBrZXkuXHJcbiAqXHJcbiAqIEBzdGF0aWNcclxuICogQHBhcmFtIHtzdHJpbmd9IGtleVxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuRmFjYWRlLnJlbW92ZUNvcmUgPSBmdW5jdGlvbihrZXkpXHJcbntcclxuICAgIGlmKEZhY2FkZS5pbnN0YW5jZU1hcFtrZXldID09IG51bGwpXHJcbiAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgIE1vZGVsLnJlbW92ZU1vZGVsKGtleSk7XHJcbiAgICBWaWV3LnJlbW92ZVZpZXcoa2V5KTtcclxuICAgIENvbnRyb2xsZXIucmVtb3ZlQ29udHJvbGxlcihrZXkpO1xyXG4gICAgZGVsZXRlIEZhY2FkZS5pbnN0YW5jZU1hcFtrZXldO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICogVGhlIEZhY2FkZXMgY29ycmVzcG9uZGluZyBDb250cm9sbGVyXHJcbiAqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQHR5cGUgcHVyZW12Yy5Db250cm9sbGVyXHJcbiAqL1xyXG5GYWNhZGUucHJvdG90eXBlLmNvbnRyb2xsZXIgPSBudWxsO1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICogVGhlIEZhY2FkZXMgY29ycmVzcG9uZGluZyBNb2RlbCBpbnN0YW5jZVxyXG4gKlxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEB0eXBlIHB1cmVtdmMuTW9kZWxcclxuICovXHJcbkZhY2FkZS5wcm90b3R5cGUubW9kZWwgPSBudWxsO1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICogVGhlIEZhY2FkZXMgY29ycmVzcG5kaW5nIFZpZXcgaW5zdGFuY2UuXHJcbiAqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQHR5cGUgcHVyZW12Yy5WaWV3XHJcbiAqL1xyXG5GYWNhZGUucHJvdG90eXBlLnZpZXcgPSBudWxsO1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICogVGhlIEZhY2FkZXMgbXVsdGl0b24ga2V5LlxyXG4gKlxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEB0eXBlIHN0cmluZ1xyXG4gKi9cclxuRmFjYWRlLnByb3RvdHlwZS5tdWx0aXRvbktleSA9IG51bGw7XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKiBUaGUgTXVsdGl0b24gRmFjYWRlIGluc3RhbmNlIG1hcC5cclxuICogQHN0YXRpY1xyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEB0eXBlIEFycmF5XHJcbiAqL1xyXG5GYWNhZGUuaW5zdGFuY2VNYXAgPSBbXTtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqIE1lc3NhZ2UgQ29uc3RhbnRzXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQHR5cGUge3N0cmluZ31cclxuICogQGNvbnN0XHJcbiAqIEBzdGF0aWNcclxuICovXHJcbkZhY2FkZS5NVUxUSVRPTl9NU0cgPSBcIkZhY2FkZSBpbnN0YW5jZSBmb3IgdGhpcyBNdWx0aXRvbiBrZXkgYWxyZWFkeSBjb25zdHJ1Y3RlZCFcIjtcclxuLyoqXHJcbiAqIEBhdXRob3IgUHVyZU1WQyBKUyBOYXRpdmUgUG9ydCBieSBEYXZpZCBGb2xleSwgRnLDqWTDqXJpYyBTYXVuaWVyLCAmIEFsYWluIER1Y2hlc25lYXVcclxuICogQGF1dGhvciBDb3B5cmlnaHQoYykgMjAwNi0yMDEyIEZ1dHVyZXNjYWxlLCBJbmMuLCBTb21lIHJpZ2h0cyByZXNlcnZlZC5cclxuICpcclxuICogQGNsYXNzIHB1cmVtdmMuVmlld1xyXG4gKlxyXG4gKiBBIE11bHRpdG9uIFZpZXcgaW1wbGVtZW50YXRpb24uXHJcbiAqXHJcbiAqIEluIFB1cmVNVkMsIHRoZSBWaWV3IGNsYXNzIGFzc3VtZXMgdGhlc2UgcmVzcG9uc2liaWxpdGllc1xyXG4gKlxyXG4gKiAtIE1haW50YWluIGEgY2FjaGUgb2Yge0BsaW5rIHB1cmVtdmMuTWVkaWF0b3IgTWVkaWF0b3J9XHJcbiAqICAgaW5zdGFuY2VzLlxyXG4gKlxyXG4gKiAtIFByb3ZpZGUgbWV0aG9kcyBmb3IgcmVnaXN0ZXJpbmcsIHJldHJpZXZpbmcsIGFuZCByZW1vdmluZ1xyXG4gKiAgIHtAbGluayBwdXJlbXZjLk1lZGlhdG9yIE1lZGlhdG9yfS5cclxuICpcclxuICogLSBOb3RpZml5aW5nIHtAbGluayBwdXJlbXZjLk1lZGlhdG9yIE1lZGlhdG9yfSB3aGVuIHRoZXkgYXJlIHJlZ2lzdGVyZWQgb3JcclxuICogICByZW1vdmVkLlxyXG4gKlxyXG4gKiAtIE1hbmFnaW5nIHRoZSBvYnNlcnZlciBsaXN0cyBmb3IgZWFjaCB7QGxpbmsgcHVyZW12Yy5Ob3RpZmljYXRpb24gTm90aWZpY2F0aW9ufVxyXG4gKiAgIGluIHRoZSBhcHBsaWNhdGlvbi5cclxuICpcclxuICogLSBQcm92aWRpbmcgYSBtZXRob2QgZm9yIGF0dGFjaGluZyB7QGxpbmsgcHVyZW12Yy5PYnNlcnZlciBPYnNlcnZlcn0gdG8gYW5cclxuICogICB7QGxpbmsgcHVyZW12Yy5Ob3RpZmljYXRpb24gTm90aWZpY2F0aW9ufSdzIG9ic2VydmVyIGxpc3QuXHJcbiAqXHJcbiAqIC0gUHJvdmlkaW5nIGEgbWV0aG9kIGZvciBicm9hZGNhc3RpbmcgYSB7QGxpbmsgcHVyZW12Yy5Ob3RpZmljYXRpb24gTm90aWZpY2F0aW9ufS5cclxuICpcclxuICogLSBOb3RpZnlpbmcgdGhlIHtAbGluayBwdXJlbXZjLk9ic2VydmVyIE9ic2VydmVyfXMgb2YgYSBnaXZlblxyXG4gKiAgIHtAbGluayBwdXJlbXZjLk5vdGlmaWNhdGlvbiBOb3RpZmljYXRpb259IHdoZW4gaXQgYnJvYWRjYXN0LlxyXG4gKlxyXG4gKiBUaGlzIFZpZXcgaW1wbGVtZW50YXRpb24gaXMgYSBNdWx0aXRvbiwgc28geW91IHNob3VsZCBub3QgY2FsbCB0aGVcclxuICogY29uc3RydWN0b3IgZGlyZWN0bHksIGJ1dCBpbnN0ZWFkIGNhbGwgdGhlIHN0YXRpYyBNdWx0aXRvblxyXG4gKiBGYWN0b3J5ICNnZXRJbnN0YW5jZSBtZXRob2QuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqIEB0aHJvd3Mge0Vycm9yfVxyXG4gKiAgaWYgaW5zdGFuY2UgZm9yIHRoaXMgTXVsdGl0b24ga2V5IGhhcyBhbHJlYWR5IGJlZW4gY29uc3RydWN0ZWRcclxuICovXHJcbmZ1bmN0aW9uIFZpZXcoa2V5KVxyXG57XHJcbiAgICBpZihWaWV3Lmluc3RhbmNlTWFwW2tleV0gIT0gbnVsbClcclxuICAgIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoVmlldy5NVUxUSVRPTl9NU0cpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLm11bHRpdG9uS2V5ID0ga2V5O1xyXG4gICAgVmlldy5pbnN0YW5jZU1hcFt0aGlzLm11bHRpdG9uS2V5XSA9IHRoaXM7XHJcbiAgICB0aGlzLm1lZGlhdG9yTWFwID0gW107XHJcbiAgICB0aGlzLm9ic2VydmVyTWFwID0gW107XHJcbiAgICB0aGlzLmluaXRpYWxpemVWaWV3KCk7XHJcbn07XHJcblxyXG4vKipcclxuICogQHByb3RlY3RlZFxyXG4gKiBJbml0aWFsaXplIHRoZSBTaW5nbGV0b24gVmlldyBpbnN0YW5jZVxyXG4gKlxyXG4gKiBDYWxsZWQgYXV0b21hdGljYWxseSBieSB0aGUgY29uc3RydWN0b3IsIHRoaXMgaXMgeW91ciBvcHBvcnR1bml0eSB0b1xyXG4gKiBpbml0aWFsaXplIHRoZSBTaW5nbGV0b24gaW5zdGFuY2UgaW4geW91ciBzdWJjbGFzcyB3aXRob3V0IG92ZXJyaWRpbmcgdGhlXHJcbiAqIGNvbnN0cnVjdG9yXHJcbiAqXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5WaWV3LnByb3RvdHlwZS5pbml0aWFsaXplVmlldyA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgcmV0dXJuO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFZpZXcgU2luZ2xldG9uIEZhY3RvcnkgbWV0aG9kLlxyXG4gKiBOb3RlIHRoYXQgdGhpcyBtZXRob2Qgd2lsbCByZXR1cm4gbnVsbCBpZiBzdXBwbGllZCBhIG51bGxcclxuICogb3IgdW5kZWZpbmVkIG11bHRpdG9uIGtleS5cclxuICpcclxuICogQHJldHVybiB7cHVyZW12Yy5WaWV3fVxyXG4gKiAgVGhlIFNpbmdsZXRvbiBpbnN0YW5jZSBvZiBWaWV3XHJcbiAqL1xyXG5WaWV3LmdldEluc3RhbmNlID0gZnVuY3Rpb24oa2V5KVxyXG57XHJcbiAgICBpZiAobnVsbCA9PSBrZXkpXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgaWYoVmlldy5pbnN0YW5jZU1hcFtrZXldID09IG51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgVmlldy5pbnN0YW5jZU1hcFtrZXldID0gbmV3IFZpZXcoa2V5KTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIFZpZXcuaW5zdGFuY2VNYXBba2V5XTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZWdpc3RlciBhbiBPYnNlcnZlciB0byBiZSBub3RpZmllZCBvZiBOb3RpZmljYXRpb25zIHdpdGggYSBnaXZlbiBuYW1lXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBub3RpZmljYXRpb25OYW1lXHJcbiAqICBUaGUgbmFtZSBvZiB0aGUgTm90aWZpY2F0aW9ucyB0byBub3RpZnkgdGhpcyBPYnNlcnZlciBvZlxyXG4gKiBAcGFyYW0ge3B1cmVtdmMuT2JzZXJ2ZXJ9IG9ic2VydmVyXHJcbiAqICBUaGUgT2JzZXJ2ZXIgdG8gcmVnaXN0ZXIuXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5WaWV3LnByb3RvdHlwZS5yZWdpc3Rlck9ic2VydmVyID0gZnVuY3Rpb24obm90aWZpY2F0aW9uTmFtZSwgb2JzZXJ2ZXIpXHJcbntcclxuICAgIGlmKHRoaXMub2JzZXJ2ZXJNYXBbbm90aWZpY2F0aW9uTmFtZV0gIT0gbnVsbClcclxuICAgIHtcclxuICAgICAgICB0aGlzLm9ic2VydmVyTWFwW25vdGlmaWNhdGlvbk5hbWVdLnB1c2gob2JzZXJ2ZXIpO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMub2JzZXJ2ZXJNYXBbbm90aWZpY2F0aW9uTmFtZV0gPSBbb2JzZXJ2ZXJdO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIE5vdGlmeSB0aGUgT2JzZXJ2ZXJzZm9yIGEgcGFydGljdWxhciBOb3RpZmljYXRpb24uXHJcbiAqXHJcbiAqIEFsbCBwcmV2aW91c2x5IGF0dGFjaGVkIE9ic2VydmVycyBmb3IgdGhpcyBOb3RpZmljYXRpb24nc1xyXG4gKiBsaXN0IGFyZSBub3RpZmllZCBhbmQgYXJlIHBhc3NlZCBhIHJlZmVyZW5jZSB0byB0aGUgSU5vdGlmaWNhdGlvbiBpblxyXG4gKiB0aGUgb3JkZXIgaW4gd2hpY2ggdGhleSB3ZXJlIHJlZ2lzdGVyZWQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7cHVyZW12Yy5Ob3RpZmljYXRpb259IG5vdGlmaWNhdGlvblxyXG4gKiAgVGhlIE5vdGlmaWNhdGlvbiB0byBub3RpZnkgT2JzZXJ2ZXJzIG9mXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5WaWV3LnByb3RvdHlwZS5ub3RpZnlPYnNlcnZlcnMgPSBmdW5jdGlvbihub3RpZmljYXRpb24pXHJcbntcclxuICAgIC8vIFNJQ1xyXG4gICAgaWYodGhpcy5vYnNlcnZlck1hcFtub3RpZmljYXRpb24uZ2V0TmFtZSgpXSAhPSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBvYnNlcnZlcnNfcmVmID0gdGhpcy5vYnNlcnZlck1hcFtub3RpZmljYXRpb24uZ2V0TmFtZSgpXSwgb2JzZXJ2ZXJzID0gW10sIG9ic2VydmVyXHJcblxyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBvYnNlcnZlcnNfcmVmLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgb2JzZXJ2ZXIgPSBvYnNlcnZlcnNfcmVmW2ldO1xyXG4gICAgICAgICAgICBvYnNlcnZlcnMucHVzaChvYnNlcnZlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgb2JzZXJ2ZXJzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgb2JzZXJ2ZXIgPSBvYnNlcnZlcnNbaV07XHJcbiAgICAgICAgICAgIG9ic2VydmVyLm5vdGlmeU9ic2VydmVyKG5vdGlmaWNhdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSB0aGUgT2JzZXJ2ZXIgZm9yIGEgZ2l2ZW4gbm90aWZ5Q29udGV4dCBmcm9tIGFuIG9ic2VydmVyIGxpc3QgZm9yXHJcbiAqIGEgZ2l2ZW4gTm90aWZpY2F0aW9uIG5hbWVcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG5vdGlmaWNhdGlvbk5hbWVcclxuICogIFdoaWNoIG9ic2VydmVyIGxpc3QgdG8gcmVtb3ZlIGZyb21cclxuICogQHBhcmFtIHtPYmplY3R9IG5vdGlmeUNvbnRleHRcclxuICogIFJlbW92ZSB0aGUgT2JzZXJ2ZXIgd2l0aCB0aGlzIG9iamVjdCBhcyBpdHMgbm90aWZ5Q29udGV4dFxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuVmlldy5wcm90b3R5cGUucmVtb3ZlT2JzZXJ2ZXIgPSBmdW5jdGlvbihub3RpZmljYXRpb25OYW1lLCBub3RpZnlDb250ZXh0KVxyXG57XHJcbiAgICAvLyBTSUNcclxuICAgIHZhciBvYnNlcnZlcnMgPSB0aGlzLm9ic2VydmVyTWFwW25vdGlmaWNhdGlvbk5hbWVdO1xyXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IG9ic2VydmVycy5sZW5ndGg7IGkrKylcclxuICAgIHtcclxuICAgICAgICBpZihvYnNlcnZlcnNbaV0uY29tcGFyZU5vdGlmeUNvbnRleHQobm90aWZ5Q29udGV4dCkgPT0gdHJ1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG9ic2VydmVycy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZihvYnNlcnZlcnMubGVuZ3RoID09IDApXHJcbiAgICB7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMub2JzZXJ2ZXJNYXBbbm90aWZpY2F0aW9uTmFtZV07XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogUmVnaXN0ZXIgYSBNZWRpYXRvciBpbnN0YW5jZSB3aXRoIHRoZSBWaWV3LlxyXG4gKlxyXG4gKiBSZWdpc3RlcnMgdGhlIE1lZGlhdG9yIHNvIHRoYXQgaXQgY2FuIGJlIHJldHJpZXZlZCBieSBuYW1lLFxyXG4gKiBhbmQgZnVydGhlciBpbnRlcnJvZ2F0ZXMgdGhlIE1lZGlhdG9yIGZvciBpdHNcclxuICoge0BsaW5rIHB1cmVtdmMuTWVkaWF0b3IjbGlzdE5vdGlmaWNhdGlvbkludGVyZXN0cyBpbnRlcmVzdHN9LlxyXG4gKlxyXG4gKiBJZiB0aGUgTWVkaWF0b3IgcmV0dXJucyBhbnkgTm90aWZpY2F0aW9uXHJcbiAqIG5hbWVzIHRvIGJlIG5vdGlmaWVkIGFib3V0LCBhbiBPYnNlcnZlciBpcyBjcmVhdGVkIGVuY2Fwc3VsYXRpbmdcclxuICogdGhlIE1lZGlhdG9yIGluc3RhbmNlJ3NcclxuICoge0BsaW5rIHB1cmVtdmMuTWVkaWF0b3IjaGFuZGxlTm90aWZpY2F0aW9uIGhhbmRsZU5vdGlmaWNhdGlvbn1cclxuICogbWV0aG9kIGFuZCByZWdpc3RlcmluZyBpdCBhcyBhbiBPYnNlcnZlciBmb3IgYWxsIE5vdGlmaWNhdGlvbnMgdGhlXHJcbiAqIE1lZGlhdG9yIGlzIGludGVyZXN0ZWQgaW4uXHJcbiAqXHJcbiAqIEBwYXJhbSB7cHVyZW12Yy5NZWRpYXRvcn1cclxuICogIGEgcmVmZXJlbmNlIHRvIHRoZSBNZWRpYXRvciBpbnN0YW5jZVxyXG4gKi9cclxuVmlldy5wcm90b3R5cGUucmVnaXN0ZXJNZWRpYXRvciA9IGZ1bmN0aW9uKG1lZGlhdG9yKVxyXG57XHJcbiAgICBpZih0aGlzLm1lZGlhdG9yTWFwW21lZGlhdG9yLmdldE1lZGlhdG9yTmFtZSgpXSAhPSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBtZWRpYXRvci5pbml0aWFsaXplTm90aWZpZXIodGhpcy5tdWx0aXRvbktleSk7XHJcbiAgICAvLyByZWdpc3RlciB0aGUgbWVkaWF0b3IgZm9yIHJldHJpZXZhbCBieSBuYW1lXHJcbiAgICB0aGlzLm1lZGlhdG9yTWFwW21lZGlhdG9yLmdldE1lZGlhdG9yTmFtZSgpXSA9IG1lZGlhdG9yO1xyXG5cclxuICAgIC8vIGdldCBub3RpZmljYXRpb24gaW50ZXJlc3RzIGlmIGFueVxyXG4gICAgdmFyIGludGVyZXN0cyA9IG1lZGlhdG9yLmxpc3ROb3RpZmljYXRpb25JbnRlcmVzdHMoKTtcclxuXHJcbiAgICAvLyByZWdpc3RlciBtZWRpYXRvciBhcyBhbiBvYnNlcnZlciBmb3IgZWFjaCBub3RpZmljYXRpb25cclxuICAgIGlmKGludGVyZXN0cy5sZW5ndGggPiAwKVxyXG4gICAge1xyXG4gICAgICAgIC8vIGNyZWF0ZSBvYnNlcnZlciByZWZlcmVuY2luZyB0aGlzIG1lZGlhdG9ycyBoYW5kbGVOb3RpZmljYXRpb24gbWV0aG9kXHJcbiAgICAgICAgdmFyIG9ic2VydmVyID0gbmV3IE9ic2VydmVyKG1lZGlhdG9yLmhhbmRsZU5vdGlmaWNhdGlvbiwgbWVkaWF0b3IpO1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBpbnRlcmVzdHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyT2JzZXJ2ZXIoaW50ZXJlc3RzW2ldLCBvYnNlcnZlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1lZGlhdG9yLm9uUmVnaXN0ZXIoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHJpZXZlIGEgTWVkaWF0b3IgZnJvbSB0aGUgVmlld1xyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVkaWF0b3JOYW1lXHJcbiAqICBUaGUgbmFtZSBvZiB0aGUgTWVkaWF0b3IgaW5zdGFuY2UgdG8gcmV0cmlldmVcclxuICogQHJldHVybiB7cHVyZW12Yy5NZWRpYXRvcn1cclxuICogIFRoZSBNZWRpYXRvciBpbnN0YW5jZSBwcmV2aW91c2x5IHJlZ2lzdGVyZWQgd2l0aCB0aGUgZ2l2ZW4gbWVkaWF0b3JOYW1lXHJcbiAqL1xyXG5WaWV3LnByb3RvdHlwZS5yZXRyaWV2ZU1lZGlhdG9yID0gZnVuY3Rpb24obWVkaWF0b3JOYW1lKVxyXG57XHJcbiAgICByZXR1cm4gdGhpcy5tZWRpYXRvck1hcFttZWRpYXRvck5hbWVdO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSBhIE1lZGlhdG9yIGZyb20gdGhlIFZpZXcuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZWRpYXRvck5hbWVcclxuICogIE5hbWUgb2YgdGhlIE1lZGlhdG9yIGluc3RhbmNlIHRvIGJlIHJlbW92ZWRcclxuICogQHJldHVybiB7cHVyZW12Yy5NZWRpYXRvcn1cclxuICogIFRoZSBNZWRpYXRvciB0aGF0IHdhcyByZW1vdmVkIGZyb20gdGhlIFZpZXdcclxuICovXHJcblZpZXcucHJvdG90eXBlLnJlbW92ZU1lZGlhdG9yID0gZnVuY3Rpb24obWVkaWF0b3JOYW1lKVxyXG57XHJcbiAgICB2YXIgbWVkaWF0b3IgPSB0aGlzLm1lZGlhdG9yTWFwW21lZGlhdG9yTmFtZV07XHJcbiAgICBpZihtZWRpYXRvcilcclxuICAgIHtcclxuICAgICAgICAvLyBmb3IgZXZlcnkgbm90aWZpY2F0aW9uIHRoZSBtZWRpYXRvciBpcyBpbnRlcmVzdGVkIGluLi4uXHJcbiAgICAgICAgdmFyIGludGVyZXN0cyA9IG1lZGlhdG9yLmxpc3ROb3RpZmljYXRpb25JbnRlcmVzdHMoKTtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgaW50ZXJlc3RzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gcmVtb3ZlIHRoZSBvYnNlcnZlciBsaW5raW5nIHRoZSBtZWRpYXRvciB0byB0aGUgbm90aWZpY2F0aW9uXHJcbiAgICAgICAgICAgIC8vIGludGVyZXN0XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlT2JzZXJ2ZXIoaW50ZXJlc3RzW2ldLCBtZWRpYXRvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyByZW1vdmUgdGhlIG1lZGlhdG9yIGZyb20gdGhlIG1hcFxyXG4gICAgICAgIGRlbGV0ZSB0aGlzLm1lZGlhdG9yTWFwW21lZGlhdG9yTmFtZV07XHJcblxyXG4gICAgICAgIC8vIGFsZXJ0IHRoZSBtZWRpYXRvciB0aGF0IGl0IGhhcyBiZWVuIHJlbW92ZWRcclxuICAgICAgICBtZWRpYXRvci5vblJlbW92ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBtZWRpYXRvcjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDaGVjayBpZiBhIE1lZGlhdG9yIGlzIHJlZ2lzdGVyZWQgb3Igbm90LlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVkaWF0b3JOYW1lXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAqICBXaGV0aGVyIGEgTWVkaWF0b3IgaXMgcmVnaXN0ZXJlZCB3aXRoIHRoZSBnaXZlbiBtZWRpYXRvcm5hbWVcclxuICovXHJcblZpZXcucHJvdG90eXBlLmhhc01lZGlhdG9yID0gZnVuY3Rpb24obWVkaWF0b3JOYW1lKVxyXG57XHJcbiAgICByZXR1cm4gdGhpcy5tZWRpYXRvck1hcFttZWRpYXRvck5hbWVdICE9IG51bGw7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlIGEgVmlldyBpbnN0YW5jZVxyXG4gKlxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuVmlldy5yZW1vdmVWaWV3ID0gZnVuY3Rpb24oa2V5KVxyXG57XHJcbiAgICBkZWxldGUgVmlldy5pbnN0YW5jZU1hcFtrZXldO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICogVGhlIFZpZXdzIGludGVybmFsIG1hcHBpbmcgb2YgbWVkaWF0b3IgbmFtZXMgdG8gbWVkaWF0b3IgaW5zdGFuY2VzXHJcbiAqXHJcbiAqIEB0eXBlIEFycmF5XHJcbiAqIEBwcm90ZWN0ZWRcclxuICovXHJcblZpZXcucHJvdG90eXBlLm1lZGlhdG9yTWFwID0gbnVsbDtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqIFRoZSBWaWV3cyBpbnRlcm5hbCBtYXBwaW5nIG9mIE5vdGlmaWNhdGlvbiBuYW1lcyB0byBPYnNlcnZlciBsaXN0c1xyXG4gKlxyXG4gKiBAdHlwZSBBcnJheVxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqL1xyXG5WaWV3LnByb3RvdHlwZS5vYnNlcnZlck1hcCA9IG51bGw7XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKiBUaGUgaW50ZXJuYWwgbWFwIHVzZWQgdG8gc3RvcmUgbXVsdGl0b24gVmlldyBpbnN0YW5jZXNcclxuICpcclxuICogQHR5cGUgQXJyYXlcclxuICogQHByb3RlY3RlZFxyXG4gKi9cclxuVmlldy5pbnN0YW5jZU1hcCA9IFtdO1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICogVGhlIFZpZXdzIGludGVybmFsIG11bHRpdG9uIGtleS5cclxuICpcclxuICogQHR5cGUgc3RyaW5nXHJcbiAqIEBwcm90ZWN0ZWRcclxuICovXHJcblZpZXcucHJvdG90eXBlLm11bHRpdG9uS2V5ID0gbnVsbDtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqIFRoZSBlcnJvciBtZXNzYWdlIHVzZWQgaWYgYW4gYXR0ZW1wdCBpcyBtYWRlIHRvIGluc3RhbnRpYXRlIFZpZXcgZGlyZWN0bHlcclxuICpcclxuICogQHR5cGUgc3RyaW5nXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQGNvbnN0XHJcbiAqIEBzdGF0aWNcclxuICovXHJcblZpZXcuTVVMVElUT05fTVNHID0gXCJWaWV3IGluc3RhbmNlIGZvciB0aGlzIE11bHRpdG9uIGtleSBhbHJlYWR5IGNvbnN0cnVjdGVkIVwiO1xyXG4vKipcclxuICogQGF1dGhvciBQdXJlTVZDIEpTIE5hdGl2ZSBQb3J0IGJ5IERhdmlkIEZvbGV5LCBGcsOpZMOpcmljIFNhdW5pZXIsICYgQWxhaW4gRHVjaGVzbmVhdVxyXG4gKiBAYXV0aG9yIENvcHlyaWdodChjKSAyMDA2LTIwMTIgRnV0dXJlc2NhbGUsIEluYy4sIFNvbWUgcmlnaHRzIHJlc2VydmVkLlxyXG4gKlxyXG4gKiBAY2xhc3MgcHVyZW12Yy5Nb2RlbFxyXG4gKlxyXG4gKiBBIE11bHRpdG9uIE1vZGVsIGltcGxlbWVudGF0aW9uLlxyXG4gKlxyXG4gKiBJbiBQdXJlTVZDLCB0aGUgTW9kZWwgY2xhc3MgcHJvdmlkZXNcclxuICogYWNjZXNzIHRvIG1vZGVsIG9iamVjdHMgKFByb3hpZXMpIGJ5IG5hbWVkIGxvb2t1cC5cclxuICpcclxuICogVGhlIE1vZGVsIGFzc3VtZXMgdGhlc2UgcmVzcG9uc2liaWxpdGllczpcclxuICpcclxuICogLSBNYWludGFpbiBhIGNhY2hlIG9mIHtAbGluayBwdXJlbXZjLlByb3h5IFByb3h5fVxyXG4gKiAgIGluc3RhbmNlcy5cclxuICogLSBQcm92aWRlIG1ldGhvZHMgZm9yIHJlZ2lzdGVyaW5nLCByZXRyaWV2aW5nLCBhbmQgcmVtb3ZpbmdcclxuICogICB7QGxpbmsgcHVyZW12Yy5Qcm94eSBQcm94eX0gaW5zdGFuY2VzLlxyXG4gKlxyXG4gKiBZb3VyIGFwcGxpY2F0aW9uIG11c3QgcmVnaXN0ZXJcclxuICoge0BsaW5rIHB1cmVtdmMuUHJveHkgUHJveHl9IGluc3RhbmNlcyB3aXRoIHRoZSBNb2RlbC5cclxuICogVHlwaWNhbGx5LCB5b3UgdXNlIGFcclxuICoge0BsaW5rIHB1cmVtdmMuU2ltcGxlQ29tbWFuZCBTaW1wbGVDb21tYW5kfVxyXG4gKiBvclxyXG4gKiB7QGxpbmsgcHVyZW12Yy5NYWNyb0NvbW1hbmQgTWFjcm9Db21tYW5kfVxyXG4gKiB0byBjcmVhdGUgYW5kIHJlZ2lzdGVyIFByb3h5IGluc3RhbmNlcyBvbmNlIHRoZSBGYWNhZGUgaGFzIGluaXRpYWxpemVkIHRoZVxyXG4gKiAqQ29yZSogYWN0b3JzLlxyXG4gKlxyXG4gKiBUaGlzIE1vZGVsIGltcGxlbWVudGF0aW9uIGlzIGEgTXVsdGl0b24sIHNvIHlvdSBzaG91bGQgbm90IGNhbGwgdGhlXHJcbiAqIGNvbnN0cnVjdG9yIGRpcmVjdGx5LCBidXQgaW5zdGVhZCBjYWxsIHRoZVxyXG4gKiB7QGxpbmsgI2dldEluc3RhbmNlIHN0YXRpYyBNdWx0aXRvbiBGYWN0b3J5IG1ldGhvZH1cclxuICogQGNvbnN0cnVjdG9yXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcclxuICogIFRoZSBNb2RlbHMgbXVsdGl0b24ga2V5XHJcbiAqIEB0aHJvd3Mge0Vycm9yfVxyXG4gKiAgQW4gZXJyb3IgaXMgdGhyb3duIGlmIHRoaXMgbXVsdGl0b25zIGtleSBpcyBhbHJlYWR5IGluIHVzZSBieSBhbm90aGVyIGluc3RhbmNlXHJcbiAqL1xyXG5mdW5jdGlvbiBNb2RlbChrZXkpXHJcbntcclxuICAgIGlmKE1vZGVsLmluc3RhbmNlTWFwW2tleV0pXHJcbiAgICB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKE1vZGVsLk1VTFRJVE9OX01TRyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5tdWx0aXRvbktleT0ga2V5O1xyXG4gICAgTW9kZWwuaW5zdGFuY2VNYXBba2V5XT0gdGhpcztcclxuICAgIHRoaXMucHJveHlNYXA9IFtdO1xyXG4gICAgdGhpcy5pbml0aWFsaXplTW9kZWwoKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBJbml0aWFsaXplIHRoZSBNb2RlbCBpbnN0YW5jZS5cclxuICpcclxuICogQ2FsbGVkIGF1dG9tYXRpY2FsbHkgYnkgdGhlIGNvbnN0cnVjdG9yLCB0aGlzXHJcbiAqIGlzIHlvdXIgb3Bwb3J0dW5pdHkgdG8gaW5pdGlhbGl6ZSB0aGUgU2luZ2xldG9uXHJcbiAqIGluc3RhbmNlIGluIHlvdXIgc3ViY2xhc3Mgd2l0aG91dCBvdmVycmlkaW5nIHRoZVxyXG4gKiBjb25zdHJ1Y3Rvci5cclxuICpcclxuICogQHJldHVybiB2b2lkXHJcbiAqL1xyXG5Nb2RlbC5wcm90b3R5cGUuaW5pdGlhbGl6ZU1vZGVsPSBmdW5jdGlvbigpe307XHJcblxyXG5cclxuLyoqXHJcbiAqIE1vZGVsIE11bHRpdG9uIEZhY3RvcnkgbWV0aG9kLlxyXG4gKiBOb3RlIHRoYXQgdGhpcyBtZXRob2Qgd2lsbCByZXR1cm4gbnVsbCBpZiBzdXBwbGllZCBhIG51bGxcclxuICogb3IgdW5kZWZpbmVkIG11bHRpdG9uIGtleS5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IGtleVxyXG4gKiAgVGhlIG11bHRpdG9uIGtleSBmb3IgdGhlIE1vZGVsIHRvIHJldHJpZXZlXHJcbiAqIEByZXR1cm4ge3B1cmVtdmMuTW9kZWx9XHJcbiAqICB0aGUgaW5zdGFuY2UgZm9yIHRoaXMgTXVsdGl0b24ga2V5XHJcbiAqL1xyXG5Nb2RlbC5nZXRJbnN0YW5jZT0gZnVuY3Rpb24oa2V5KVxyXG57XHJcbiAgICBpZiAobnVsbCA9PSBrZXkpXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgaWYoTW9kZWwuaW5zdGFuY2VNYXBba2V5XSA9PSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIE1vZGVsLmluc3RhbmNlTWFwW2tleV09IG5ldyBNb2RlbChrZXkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBNb2RlbC5pbnN0YW5jZU1hcFtrZXldO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlZ2lzdGVyIGEgUHJveHkgd2l0aCB0aGUgTW9kZWxcclxuICogQHBhcmFtIHtwdXJlbXZjLlByb3h5fVxyXG4gKi9cclxuTW9kZWwucHJvdG90eXBlLnJlZ2lzdGVyUHJveHk9IGZ1bmN0aW9uKHByb3h5KVxyXG57XHJcbiAgICBwcm94eS5pbml0aWFsaXplTm90aWZpZXIodGhpcy5tdWx0aXRvbktleSk7XHJcbiAgICB0aGlzLnByb3h5TWFwW3Byb3h5LmdldFByb3h5TmFtZSgpXT0gcHJveHk7XHJcbiAgICBwcm94eS5vblJlZ2lzdGVyKCk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0cmlldmUgYSBQcm94eSBmcm9tIHRoZSBNb2RlbFxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJveHlOYW1lXHJcbiAqIEByZXR1cm4ge3B1cmVtdmMuUHJveHl9XHJcbiAqICBUaGUgUHJveHkgaW5zdGFuY2UgcHJldmlvdXNseSByZWdpc3RlcmVkIHdpdGggdGhlIHByb3ZpZGVkIHByb3h5TmFtZVxyXG4gKi9cclxuTW9kZWwucHJvdG90eXBlLnJldHJpZXZlUHJveHk9IGZ1bmN0aW9uKHByb3h5TmFtZSlcclxue1xyXG4gICAgcmV0dXJuIHRoaXMucHJveHlNYXBbcHJveHlOYW1lXTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDaGVjayBpZiBhIFByb3h5IGlzIHJlZ2lzdGVyZWRcclxuICogQHBhcmFtIHtzdHJpbmd9IHByb3h5TmFtZVxyXG4gKiBAcmV0dXJuIHtib29sZWFufVxyXG4gKiAgd2hldGhlciBhIFByb3h5IGlzIGN1cnJlbnRseSByZWdpc3RlcmVkIHdpdGggdGhlIGdpdmVuIHByb3h5TmFtZS5cclxuICovXHJcbk1vZGVsLnByb3RvdHlwZS5oYXNQcm94eT0gZnVuY3Rpb24ocHJveHlOYW1lKVxyXG57XHJcbiAgICByZXR1cm4gdGhpcy5wcm94eU1hcFtwcm94eU5hbWVdICE9IG51bGw7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlIGEgUHJveHkgZnJvbSB0aGUgTW9kZWwuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm94eU5hbWVcclxuICogIFRoZSBuYW1lIG9mIHRoZSBQcm94eSBpbnN0YW5jZSB0byByZW1vdmVcclxuICogQHJldHVybiB7cHVyZW12Yy5Qcm94eX1cclxuICogIFRoZSBQcm94eSB0aGF0IHdhcyByZW1vdmVkIGZyb20gdGhlIE1vZGVsXHJcbiAqL1xyXG5Nb2RlbC5wcm90b3R5cGUucmVtb3ZlUHJveHk9IGZ1bmN0aW9uKHByb3h5TmFtZSlcclxue1xyXG4gICAgdmFyIHByb3h5PSB0aGlzLnByb3h5TWFwW3Byb3h5TmFtZV07XHJcbiAgICBpZihwcm94eSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLnByb3h5TWFwW3Byb3h5TmFtZV09IG51bGw7XHJcbiAgICAgICAgcHJveHkub25SZW1vdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcHJveHk7XHJcbn07XHJcblxyXG4vKipcclxuICogQHN0YXRpY1xyXG4gKiBSZW1vdmUgYSBNb2RlbCBpbnN0YW5jZS5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IGtleVxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuTW9kZWwucmVtb3ZlTW9kZWw9IGZ1bmN0aW9uKGtleSlcclxue1xyXG4gICAgZGVsZXRlIE1vZGVsLmluc3RhbmNlTWFwW2tleV07XHJcbn07XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKiBUaGUgbWFwIHVzZWQgYnkgdGhlIE1vZGVsIHRvIHN0b3JlIFByb3h5IGluc3RhbmNlcy5cclxuICpcclxuICogQHByb3RlY3RlZFxyXG4gKiBAdHlwZSBBcnJheVxyXG4gKi9cclxuTW9kZWwucHJvdG90eXBlLnByb3h5TWFwPSBudWxsO1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICogVGhlIG1hcCB1c2VkIGJ5IHRoZSBNb2RlbCB0byBzdG9yZSBtdWx0aXRvbiBpbnN0YW5jZXNcclxuICpcclxuICogQHByb3RlY3RlZFxyXG4gKiBAc3RhdGljXHJcbiAqIEB0eXBlIEFycmF5XHJcbiAqL1xyXG5Nb2RlbC5pbnN0YW5jZU1hcD0gW107XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKiBUaGUgTW9kZWxzIG11bHRpdG9uIGtleS5cclxuICpcclxuICogQHByb3RlY3RlZFxyXG4gKiBAdHlwZSBzdHJpbmdcclxuICovXHJcbk1vZGVsLnByb3RvdHlwZS5tdWx0aXRvbktleTtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqIE1lc3NhZ2UgQ29uc3RhbnRzXHJcbiAqXHJcbiAqIEBzdGF0aWNcclxuICogQHR5cGUge3N0cmluZ31cclxuICovXHJcbk1vZGVsLk1VTFRJVE9OX01TRz0gXCJNb2RlbCBpbnN0YW5jZSBmb3IgdGhpcyBNdWx0aXRvbiBrZXkgYWxyZWFkeSBjb25zdHJ1Y3RlZCFcIjtcclxuLyoqXHJcbiAqIEBhdXRob3IgUHVyZU1WQyBKUyBOYXRpdmUgUG9ydCBieSBEYXZpZCBGb2xleSwgRnLDqWTDqXJpYyBTYXVuaWVyLCAmIEFsYWluIER1Y2hlc25lYXVcclxuICogQGF1dGhvciBDb3B5cmlnaHQoYykgMjAwNi0yMDEyIEZ1dHVyZXNjYWxlLCBJbmMuLCBTb21lIHJpZ2h0cyByZXNlcnZlZC5cclxuICpcclxuICogQGNsYXNzIHB1cmVtdmMuQ29udHJvbGxlclxyXG4gKlxyXG4gKiBJbiBQdXJlTVZDLCB0aGUgQ29udHJvbGxlciBjbGFzcyBmb2xsb3dzIHRoZSAnQ29tbWFuZCBhbmQgQ29udHJvbGxlcidcclxuICogc3RyYXRlZ3ksIGFuZCBhc3N1bWVzIHRoZXNlIHJlc3BvbnNpYmlsaXRpZXM6XHJcbiAqXHJcbiAqIC0gUmVtZW1iZXJpbmcgd2hpY2hcclxuICoge0BsaW5rIHB1cmVtdmMuU2ltcGxlQ29tbWFuZCBTaW1wbGVDb21tYW5kfXNcclxuICogb3JcclxuICoge0BsaW5rIHB1cmVtdmMuTWFjcm9Db21tYW5kIE1hY3JvQ29tbWFuZH1zXHJcbiAqIGFyZSBpbnRlbmRlZCB0byBoYW5kbGUgd2hpY2hcclxuICoge0BsaW5rIHB1cmVtdmMuTm90aWZpY2F0aW9uIE5vdGlmaWNhdGlvbn1zXHJcbiAqIC0gUmVnaXN0ZXJpbmcgaXRzZWxmIGFzIGFuXHJcbiAqIHtAbGluayBwdXJlbXZjLk9ic2VydmVyIE9ic2VydmVyfSB3aXRoXHJcbiAqIHRoZSB7QGxpbmsgcHVyZW12Yy5WaWV3IFZpZXd9IGZvciBlYWNoXHJcbiAqIHtAbGluayBwdXJlbXZjLk5vdGlmaWNhdGlvbiBOb3RpZmljYXRpb259XHJcbiAqIHRoYXQgaXQgaGFzIGFuXHJcbiAqIHtAbGluayBwdXJlbXZjLlNpbXBsZUNvbW1hbmQgU2ltcGxlQ29tbWFuZH1cclxuICogb3Ige0BsaW5rIHB1cmVtdmMuTWFjcm9Db21tYW5kIE1hY3JvQ29tbWFuZH1cclxuICogbWFwcGluZyBmb3IuXHJcbiAqIC0gQ3JlYXRpbmcgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIHByb3BlclxyXG4gKiB7QGxpbmsgcHVyZW12Yy5TaW1wbGVDb21tYW5kIFNpbXBsZUNvbW1hbmR9c1xyXG4gKiBvclxyXG4gKiB7QGxpbmsgcHVyZW12Yy5NYWNyb0NvbW1hbmQgTWFjcm9Db21tYW5kfXNcclxuICogdG8gaGFuZGxlIGEgZ2l2ZW5cclxuICoge0BsaW5rIHB1cmVtdmMuTm90aWZpY2F0aW9uIE5vdGlmaWNhdGlvbn1cclxuICogd2hlbiBub3RpZmllZCBieSB0aGVcclxuICoge0BsaW5rIHB1cmVtdmMuVmlldyBWaWV3fS5cclxuICogLSBDYWxsaW5nIHRoZSBjb21tYW5kJ3MgZXhlY3V0ZSBtZXRob2QsIHBhc3NpbmcgaW4gdGhlXHJcbiAqIHtAbGluayBwdXJlbXZjLk5vdGlmaWNhdGlvbiBOb3RpZmljYXRpb259LlxyXG4gKlxyXG4gKiBZb3VyIGFwcGxpY2F0aW9uIG11c3QgcmVnaXN0ZXJcclxuICoge0BsaW5rIHB1cmVtdmMuU2ltcGxlQ29tbWFuZCBTaW1wbGVDb21tYW5kfXNcclxuICogb3Ige0BsaW5rIHB1cmVtdmMuTWFjcm9Db21tYW5kIE1hY3JvQ29tbWFuZH1zXHJcbiAqIHdpdGggdGhlIENvbnRyb2xsZXIuXHJcbiAqXHJcbiAqIFRoZSBzaW1wbGVzdCB3YXkgaXMgdG8gc3ViY2xhc3NcclxuICoge0BsaW5rIHB1cmVtdmMuRmFjYWRlIEZhY2FkZX0sXHJcbiAqIGFuZCB1c2UgaXRzXHJcbiAqIHtAbGluayBwdXJlbXZjLkZhY2FkZSNpbml0aWFsaXplQ29udHJvbGxlciBpbml0aWFsaXplQ29udHJvbGxlcn1cclxuICogbWV0aG9kIHRvIGFkZCB5b3VyIHJlZ2lzdHJhdGlvbnMuXHJcbiAqXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKiBUaGlzIENvbnRyb2xsZXIgaW1wbGVtZW50YXRpb24gaXMgYSBNdWx0aXRvbiwgc28geW91IHNob3VsZCBub3QgY2FsbCB0aGVcclxuICogY29uc3RydWN0b3IgZGlyZWN0bHksIGJ1dCBpbnN0ZWFkIGNhbGwgdGhlIHN0YXRpYyAjZ2V0SW5zdGFuY2UgZmFjdG9yeSBtZXRob2QsXHJcbiAqIHBhc3NpbmcgdGhlIHVuaXF1ZSBrZXkgZm9yIHRoaXMgaW5zdGFuY2UgdG8gaXQuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcclxuICogQHRocm93cyB7RXJyb3J9XHJcbiAqICBJZiBpbnN0YW5jZSBmb3IgdGhpcyBNdWx0aXRvbiBrZXkgaGFzIGFscmVhZHkgYmVlbiBjb25zdHJ1Y3RlZFxyXG4gKi9cclxuZnVuY3Rpb24gQ29udHJvbGxlcihrZXkpXHJcbntcclxuICAgIGlmKENvbnRyb2xsZXIuaW5zdGFuY2VNYXBba2V5XSAhPSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihDb250cm9sbGVyLk1VTFRJVE9OX01TRyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5tdWx0aXRvbktleT0ga2V5O1xyXG4gICAgQ29udHJvbGxlci5pbnN0YW5jZU1hcFt0aGlzLm11bHRpdG9uS2V5XT0gdGhpcztcclxuICAgIHRoaXMuY29tbWFuZE1hcD0gbmV3IEFycmF5KCk7XHJcbiAgICB0aGlzLmluaXRpYWxpemVDb250cm9sbGVyKCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqXHJcbiAqIEluaXRpYWxpemUgdGhlIG11bHRpdG9uIENvbnRyb2xsZXIgaW5zdGFuY2UuXHJcbiAqXHJcbiAqIENhbGxlZCBhdXRvbWF0aWNhbGx5IGJ5IHRoZSBjb25zdHJ1Y3Rvci5cclxuICpcclxuICogTm90ZSB0aGF0IGlmIHlvdSBhcmUgdXNpbmcgYSBzdWJjbGFzcyBvZiBWaWV3XHJcbiAqIGluIHlvdXIgYXBwbGljYXRpb24sIHlvdSBzaG91bGQgKmFsc28qIHN1YmNsYXNzIENvbnRyb2xsZXJcclxuICogYW5kIG92ZXJyaWRlIHRoZSBpbml0aWFsaXplQ29udHJvbGxlciBtZXRob2QgaW4gdGhlXHJcbiAqIGZvbGxvd2luZyB3YXkuXHJcbiAqXHJcbiAqICAgICBNeUNvbnRyb2xsZXIucHJvdG90eXBlLmluaXRpYWxpemVDb250cm9sbGVyPSBmdW5jdGlvbiAoKVxyXG4gKiAgICAge1xyXG4gKiAgICAgICAgIHRoaXMudmlldz0gTXlWaWV3LmdldEluc3RhbmNlKHRoaXMubXVsdGl0b25LZXkpO1xyXG4gKiAgICAgfTtcclxuICpcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbkNvbnRyb2xsZXIucHJvdG90eXBlLmluaXRpYWxpemVDb250cm9sbGVyPSBmdW5jdGlvbigpXHJcbntcclxuICAgIHRoaXMudmlldz0gVmlldy5nZXRJbnN0YW5jZSh0aGlzLm11bHRpdG9uS2V5KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgQ29udHJvbGxlcnMgbXVsdGl0b24gZmFjdG9yeSBtZXRob2QuXHJcbiAqIE5vdGUgdGhhdCB0aGlzIG1ldGhvZCB3aWxsIHJldHVybiBudWxsIGlmIHN1cHBsaWVkIGEgbnVsbFxyXG4gKiBvciB1bmRlZmluZWQgbXVsdGl0b24ga2V5LlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5XHJcbiAqICBBIENvbnRyb2xsZXIncyBtdWx0aXRvbiBrZXlcclxuICogQHJldHVybiB7cHVyZW12Yy5Db250cm9sbGVyfVxyXG4gKiAgdGhlIE11bHRpdG9uIGluc3RhbmNlIG9mIENvbnRyb2xsZXJcclxuICovXHJcbkNvbnRyb2xsZXIuZ2V0SW5zdGFuY2U9IGZ1bmN0aW9uKGtleSlcclxue1xyXG4gICAgaWYgKG51bGwgPT0ga2V5KVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG5cclxuICAgIGlmKG51bGwgPT0gdGhpcy5pbnN0YW5jZU1hcFtrZXldKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuaW5zdGFuY2VNYXBba2V5XT0gbmV3IHRoaXMoa2V5KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZU1hcFtrZXldO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIElmIGEgU2ltcGxlQ29tbWFuZCBvciBNYWNyb0NvbW1hbmQgaGFzIHByZXZpb3VzbHkgYmVlbiByZWdpc3RlcmVkIHRvIGhhbmRsZVxyXG4gKiB0aGUgZ2l2ZW4gTm90aWZpY2F0aW9uIHRoZW4gaXQgaXMgZXhlY3V0ZWQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7cHVyZW12Yy5Ob3RpZmljYXRpb259IG5vdGVcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbkNvbnRyb2xsZXIucHJvdG90eXBlLmV4ZWN1dGVDb21tYW5kPSBmdW5jdGlvbihub3RlKVxyXG57XHJcbiAgICB2YXIgY29tbWFuZENsYXNzUmVmPSB0aGlzLmNvbW1hbmRNYXBbbm90ZS5nZXROYW1lKCldO1xyXG4gICAgaWYoY29tbWFuZENsYXNzUmVmID09IG51bGwpXHJcbiAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgIHZhciBjb21tYW5kSW5zdGFuY2U9IG5ldyBjb21tYW5kQ2xhc3NSZWYoKTtcclxuICAgIGNvbW1hbmRJbnN0YW5jZS5pbml0aWFsaXplTm90aWZpZXIodGhpcy5tdWx0aXRvbktleSk7XHJcbiAgICBjb21tYW5kSW5zdGFuY2UuZXhlY3V0ZShub3RlKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZWdpc3RlciBhIHBhcnRpY3VsYXIgU2ltcGxlQ29tbWFuZCBvciBNYWNyb0NvbW1hbmQgY2xhc3MgYXMgdGhlIGhhbmRsZXIgZm9yXHJcbiAqIGEgcGFydGljdWxhciBOb3RpZmljYXRpb24uXHJcbiAqXHJcbiAqIElmIGFuIGNvbW1hbmQgYWxyZWFkeSBiZWVuIHJlZ2lzdGVyZWQgdG8gaGFuZGxlIE5vdGlmaWNhdGlvbnMgd2l0aCB0aGlzIG5hbWUsXHJcbiAqIGl0IGlzIG5vIGxvbmdlciB1c2VkLCB0aGUgbmV3IGNvbW1hbmQgaXMgdXNlZCBpbnN0ZWFkLlxyXG4gKlxyXG4gKiBUaGUgT2JzZXJ2ZXIgZm9yIHRoZSBuZXcgY29tbWFuZCBpcyBvbmx5IGNyZWF0ZWQgaWYgdGhpcyB0aGUgaXJzdCB0aW1lIGFcclxuICogY29tbWFuZCBoYXMgYmVlbiByZWdpc2VyZWQgZm9yIHRoaXMgTm90aWZpY2F0aW9uIG5hbWUuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBub3RpZmljYXRpb25OYW1lXHJcbiAqICB0aGUgbmFtZSBvZiB0aGUgTm90aWZpY2F0aW9uXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbW1hbmRDbGFzc1JlZlxyXG4gKiAgYSBjb21tYW5kIGNvbnN0cnVjdG9yXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5Db250cm9sbGVyLnByb3RvdHlwZS5yZWdpc3RlckNvbW1hbmQ9IGZ1bmN0aW9uKG5vdGlmaWNhdGlvbk5hbWUsIGNvbW1hbmRDbGFzc1JlZilcclxue1xyXG4gICAgaWYodGhpcy5jb21tYW5kTWFwW25vdGlmaWNhdGlvbk5hbWVdID09IG51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy52aWV3LnJlZ2lzdGVyT2JzZXJ2ZXIobm90aWZpY2F0aW9uTmFtZSwgbmV3IE9ic2VydmVyKHRoaXMuZXhlY3V0ZUNvbW1hbmQsIHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNvbW1hbmRNYXBbbm90aWZpY2F0aW9uTmFtZV09IGNvbW1hbmRDbGFzc1JlZjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDaGVjayBpZiBhIGNvbW1hbmQgaXMgcmVnaXN0ZXJlZCBmb3IgYSBnaXZlbiBOb3RpZmljYXRpb25cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG5vdGlmaWNhdGlvbk5hbWVcclxuICogQHJldHVybiB7Ym9vbGVhbn1cclxuICogIHdoZXRoZXIgYSBDb21tYW5kIGlzIGN1cnJlbnRseSByZWdpc3RlcmVkIGZvciB0aGUgZ2l2ZW4gbm90aWZpY2F0aW9uTmFtZS5cclxuICovXHJcbkNvbnRyb2xsZXIucHJvdG90eXBlLmhhc0NvbW1hbmQ9IGZ1bmN0aW9uKG5vdGlmaWNhdGlvbk5hbWUpXHJcbntcclxuICAgIHJldHVybiB0aGlzLmNvbW1hbmRNYXBbbm90aWZpY2F0aW9uTmFtZV0gIT0gbnVsbDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmUgYSBwcmV2aW91c2x5IHJlZ2lzdGVyZWQgY29tbWFuZCB0b1xyXG4gKiB7QGxpbmsgcHVyZW12Yy5Ob3RpZmljYXRpb24gTm90aWZpY2F0aW9ufVxyXG4gKiBtYXBwaW5nLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbm90aWZpY2F0aW9uTmFtZVxyXG4gKiAgdGhlIG5hbWUgb2YgdGhlIE5vdGlmaWNhdGlvbiB0byByZW1vdmUgdGhlIGNvbW1hbmQgbWFwcGluZyBmb3JcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbkNvbnRyb2xsZXIucHJvdG90eXBlLnJlbW92ZUNvbW1hbmQ9IGZ1bmN0aW9uKG5vdGlmaWNhdGlvbk5hbWUpXHJcbntcclxuICAgIGlmKHRoaXMuaGFzQ29tbWFuZChub3RpZmljYXRpb25OYW1lKSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLnZpZXcucmVtb3ZlT2JzZXJ2ZXIobm90aWZpY2F0aW9uTmFtZSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5jb21tYW5kTWFwW25vdGlmaWNhdGlvbk5hbWVdPSBudWxsO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBzdGF0aWNcclxuICogUmVtb3ZlIGEgQ29udHJvbGxlciBpbnN0YW5jZS5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IGtleVxyXG4gKiAgbXVsdGl0b25LZXkgb2YgQ29udHJvbGxlciBpbnN0YW5jZSB0byByZW1vdmVcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbkNvbnRyb2xsZXIucmVtb3ZlQ29udHJvbGxlcj0gZnVuY3Rpb24oa2V5KVxyXG57XHJcbiAgICBkZWxldGUgdGhpcy5pbnN0YW5jZU1hcFtrZXldO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIExvY2FsIHJlZmVyZW5jZSB0byB0aGUgQ29udHJvbGxlcidzIFZpZXdcclxuICpcclxuICogQHByb3RlY3RlZFxyXG4gKiBAdHlwZSB7cHVyZW12Yy5WaWV3fVxyXG4gKi9cclxuQ29udHJvbGxlci5wcm90b3R5cGUudmlldz0gbnVsbDtcclxuXHJcbi8qKlxyXG4gKiBOb3RlIG5hbWUgdG8gY29tbWFuZCBjb25zdHJ1Y3RvciBtYXBwaW5nc1xyXG4gKlxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEB0eXBlIHtPYmplY3R9XHJcbiAqL1xyXG5Db250cm9sbGVyLnByb3RvdHlwZS5jb21tYW5kTWFwPSBudWxsO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBDb250cm9sbGVyJ3MgbXVsdGl0b24ga2V5XHJcbiAqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQHR5cGUge3N0cmluZ31cclxuICovXHJcbkNvbnRyb2xsZXIucHJvdG90eXBlLm11bHRpdG9uS2V5PSBudWxsO1xyXG5cclxuLyoqXHJcbiAqIE11bHRpdG9uIGtleSB0byBDb250cm9sbGVyIGluc3RhbmNlIG1hcHBpbmdzXHJcbiAqXHJcbiAqIEBzdGF0aWNcclxuICogQHByb3RlY3RlZFxyXG4gKiBAdHlwZSB7T2JqZWN0fVxyXG4gKi9cclxuQ29udHJvbGxlci5pbnN0YW5jZU1hcD0gW107XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKlxyXG4gKiBNZXNzYWdlIGNvbnN0YW50c1xyXG4gKiBAc3RhdGljXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQHR5cGUge3N0cmluZ31cclxuICovXHJcbkNvbnRyb2xsZXIuTVVMVElUT05fTVNHPSBcImNvbnRyb2xsZXIga2V5IGZvciB0aGlzIE11bHRpdG9uIGtleSBhbHJlYWR5IGNvbnN0cnVjdGVkXCJcclxuLypcclxuICogQGF1dGhvciBQdXJlTVZDIEpTIE5hdGl2ZSBQb3J0IGJ5IERhdmlkIEZvbGV5LCBGcsOpZMOpcmljIFNhdW5pZXIsICYgQWxhaW4gRHVjaGVzbmVhdSBcclxuICogQGF1dGhvciBDb3B5cmlnaHQoYykgMjAwNi0yMDEyIEZ1dHVyZXNjYWxlLCBJbmMuLCBTb21lIHJpZ2h0cyByZXNlcnZlZC5cclxuICogXHJcbiAqIEBoaWRlXHJcbiAqIEEgYW4gaW50ZXJuYWwgaGVscGVyIGNsYXNzIHVzZWQgdG8gYXNzaXN0IGNsYXNzbGV0IGltcGxlbWVudGF0aW9uLiBUaGlzXHJcbiAqIGNsYXNzIGlzIG5vdCBhY2Nlc3NpYmxlIGJ5IGNsaWVudCBjb2RlLlxyXG4gKi9cclxudmFyIE9vcEhlbHA9XHJcbntcclxuICAgIC8qXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogQSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBzY29wZS4gV2UgdXNlIHRoaXMgcmF0aGVyIHRoYW4gd2luZG93XHJcbiAgICAgKiBpbiBvcmRlciB0byBzdXBwb3J0IGJvdGggYnJvd3NlciBiYXNlZCBhbmQgbm9uIGJyb3dzZXIgYmFlZCBcclxuICAgICAqIEphdmFTY3JpcHQgaW50ZXJwcmV0ZXJzLlxyXG4gICAgICogQHR5cGUge09iamVjdH1cclxuICAgICAqL1xyXG4gICAgZ2xvYmFsOiAoZnVuY3Rpb24oKXtyZXR1cm4gdGhpc30pKClcclxuXHJcbiAgICAvKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEV4dGVuZCBvbmUgRnVuY3Rpb24ncyBwcm90b3R5cGUgYnkgYW5vdGhlciwgZW11bGF0aW5nIGNsYXNzaWNcclxuICAgICAqIGluaGVyaXRhbmNlLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjaGlsZFxyXG4gICAgICogIFRoZSBGdW5jdGlvbiB0byBleHRlbmQgKHN1YmNsYXNzKVxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBwYXJlbnRcclxuICAgICAqICBUaGUgRnVuY3Rpb24gdG8gZXh0ZW5kIGZyb20gKHN1cGVyY2xhc3MpXHJcbiAgICAgKiBcclxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufVxyXG4gICAgICogXHJcbiAgICAgKiAgQSByZWZlcmVuY2UgdG8gdGhlIGV4dGVuZGVkIEZ1bmN0aW9uIChzdWJjbGFzcylcclxuICAgICAqL1xyXG4gICAgLCAgIGV4dGVuZDogZnVuY3Rpb24gKGNoaWxkLCBwYXJlbnQpXHJcbntcclxuICAgIGlmICgnZnVuY3Rpb24nICE9PSB0eXBlb2YgY2hpbGQpXHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignI2V4dGVuZC0gY2hpbGQgc2hvdWxkIGJlIEZ1bmN0aW9uJyk7XHJcblxyXG4gICAgaWYgKCdmdW5jdGlvbicgIT09IHR5cGVvZiBwYXJlbnQpXHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignI2V4dGVuZC0gcGFyZW50IHNob3VsZCBiZSBGdW5jdGlvbicpO1xyXG5cclxuICAgIGlmIChwYXJlbnQgPT09IGNoaWxkKVxyXG4gICAgICAgIHJldHVybjtcclxuXHJcbiAgICB2YXIgVHJhbnNpdGl2ZT0gbmV3IEZ1bmN0aW9uO1xyXG4gICAgVHJhbnNpdGl2ZS5wcm90b3R5cGU9IHBhcmVudC5wcm90b3R5cGU7XHJcbiAgICBjaGlsZC5wcm90b3R5cGU9IG5ldyBUcmFuc2l0aXZlO1xyXG4gICAgcmV0dXJuIGNoaWxkLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj0gY2hpbGQ7XHJcbn1cclxuXHJcbiAgICAvKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIERlY29hcmF0ZSBvbmUgb2JqZWN0IHdpdGggdGhlIHByb3BlcnRpZXMgb2YgYW5vdGhlci4gXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3RcclxuICAgICAqICBUaGUgb2JqZWN0IHRvIGRlY29yYXRlLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gdHJhaXRzXHJcbiAgICAgKiAgVGhlIG9iamVjdCBwcm92aWRpbmcgdGhlIHByb3Blcml0ZXMgdGhhdCB0aGUgZmlyc3Qgb2JqZWN0XHJcbiAgICAgKiAgd2lsbCBiZSBkZWNvcmF0ZWQgd2l0aC4gTm90ZSB0aGF0IG9ubHkgcHJvcGVydGllcyBkZWZpbmVkIG9uIFxyXG4gICAgICogIHRoaXMgb2JqZWN0IHdpbGwgYmUgY29waWVkLSBpLmUuIGluaGVyaXRlZCBwcm9wZXJ0aWVzIHdpbGxcclxuICAgICAqICBiZSBpZ25vcmVkLlxyXG4gICAgICogXHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAgICAgKiAgVEhlIGRlY29yYXRlZCBvYmplY3QgKGZpcnN0IGFyZ3VtZW50KVxyXG4gICAgICovXHJcbiAgICAsICAgZGVjb3JhdGU6IGZ1bmN0aW9uIChvYmplY3QsIHRyYWl0cylcclxue1xyXG4gICAgZm9yICh2YXIgYWNjZXNzb3IgaW4gdHJhaXRzKVxyXG4gICAge1xyXG4gICAgICAgIG9iamVjdFthY2Nlc3Nvcl09IHRyYWl0c1thY2Nlc3Nvcl07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG9iamVjdDtcclxufVxyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBAbWVtYmVyIHB1cmVtdmNcclxuICpcclxuICogRGVjbGFyZSBhIG5hbWVzcGFjZSBhbmQgb3B0aW9uYWxseSBtYWtlIGFuIE9iamVjdCB0aGUgcmVmZXJlbnRcclxuICogb2YgdGhhdCBuYW1lc3BhY2UuXHJcbiAqXHJcbiAqICAgICBjb25zb2xlLmFzc2VydChudWxsID09IHdpbmRvdy50bGQsICdObyB0bGQgbmFtZXNwYWNlJyk7XHJcbiAqICAgICAvLyBkZWNsYXJlIHRoZSB0bGQgbmFtZXNwYWNlXHJcbiAqICAgICBwdXJlbXZjLmRlY2xhcmUoJ3RsZCcpO1xyXG4gKiAgICAgY29uc29sZS5hc3NlcnQoJ29iamVjdCcgPT09IHR5cGVvZiB0bGQsICdUaGUgdGxkIG5hbWVzcGFjZSB3YXMgZGVjbGFyZWQnKTtcclxuICpcclxuICogICAgIC8vIHRoZSBtZXRob2QgcmV0dXJucyBhIHJlZmVyZW5jZSB0byBsYXN0IG5hbWVzcGFjZSBub2RlIGluIGEgY3JlYXRlZCBoaWVyYXJjaHlcclxuICogICAgIHZhciByZWZlcmVuY2U9IHB1cmVtdmMuZGVjbGFyZSgndGxkLmRvbWFpbi5hcHAnKTtcclxuICogICAgIGNvbnNvbGUuYXNzZXJ0KHJlZmVyZW5jZSA9PT0gdGxkLmRvbWFpbi5hcHApXHJcbiAqXHJcbiAqICAgICAvLyBvZiBjb3Vyc2UgeW91IGNhbiBhbHNvIGRlY2xhcmUgeW91ciBvd24gb2JqZWN0cyBhcyB3ZWxsXHJcbiAqICAgICB2YXIgQXBwQ29uc3RhbnRzPVxyXG4gKiAgICAgICAgIHtcclxuICogXHQgICAgICAgICAgIEFQUF9OQU1FOiAndGxkLmRvbWFpbi5hcHAuQXBwJ1xyXG4gKiAgICAgICAgIH07XHJcbiAqXHJcbiAqICAgICBwdXJlbXZjLmRlY2xhcmUoJ3RsZC5kb21haW4uYXBwLkFwcENvbnN0YW50cycsIEFwcENvbnN0YW50cyk7XHJcbiAqICAgICBjb25zb2xlLmFzc2VydChBcHBDb25zdGFudHMgPT09IHRsZC5kb21haW4uYXBwLkFwcENvbnN0YW50c1xyXG4gKiBcdCAgICwgJ0FwcENvbnN0YW50cyB3YXMgZXhwb3J0ZWQgdG8gdGhlIG5hbWVzcGFjZScpO1xyXG4gKlxyXG4gKiBOb3RlIHRoYXQgeW91IGNhbiBhbHNvICNkZWNsYXJlIHdpdGhpbiBhIGNsb3N1cmUuIFRoYXQgd2F5IHlvdVxyXG4gKiBjYW4gc2VsZWN0aXZlbHkgZXhwb3J0IE9iamVjdHMgdG8geW91ciBvd24gbmFtZXNwYWNlcyB3aXRob3V0XHJcbiAqIGxlYWtpbmcgdmFyaWFibGVzIGludG8gdGhlIGdsb2JhbCBzY29wZS5cclxuICpcclxuICogICAgIChmdW5jdGlvbigpe1xyXG4gKiAgICAgICAgIC8vIHRoaXMgdmFyIGlzIG5vdCBhY2Nlc3NpYmxlIG91dHNpZGUgb2YgdGhpc1xyXG4gKiAgICAgICAgIC8vIGNsb3N1cmVzIGNhbGwgc2NvcGVcclxuICogICAgICAgICB2YXIgaGlkZGVuVmFsdWU9ICdkZWZhdWx0VmFsdWUnO1xyXG4gKiBcclxuICogICAgICAgICAvLyBleHBvcnQgYW4gb2JqZWN0IHRoYXQgcmVmZXJlbmNlcyB0aGUgaGlkZGVuXHJcbiAqICAgICAgICAgLy8gdmFyaWFibGUgYW5kIHdoaWNoIGNhbiBtdXRhdGUgaXRcclxuICogICAgICAgICBwdXJlbXZjLmRlY2xhcmVcclxuICogICAgICAgICAoXHJcbiAqICAgICAgICAgICAgICAndGxkLmRvbWFpbi5hcHAuYmFja2Rvb3InXHJcbiAqIFxyXG4gKiAgICAgICAgICwgICAge1xyXG4gKiAgICAgICAgICAgICAgICAgIHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpXHJcbiAqICAgICAgICAgICAgICAgICAge1xyXG4gKiAgICAgICAgICAgICAgICAgICAgICAvLyBhc3NpZ25zIHRvIHRoZSBoaWRkZW4gdmFyXHJcbiAqICAgICAgICAgICAgICAgICAgICAgIGhpZGRlblZhbHVlPSB2YWx1ZTtcclxuICogICAgICAgICAgICAgICAgICB9XHJcbiAqIFxyXG4gKiAgICAgICAgICwgICAgICAgIGdldFZhbHVlOiBmdW5jdGlvbiAoKVxyXG4gKiAgICAgICAgICAgICAgICAgIHtcclxuICogICAgICAgICAgICAgICAgICAgICAgLy8gcmVhZHMgZnJvbSB0aGUgaGlkZGVuIHZhclxyXG4gKiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaGlkZGVuVmFsdWU7XHJcbiAqICAgICAgICAgICAgICAgICAgfVxyXG4gKiAgICAgICAgICAgICAgfVxyXG4gKiAgICAgICAgICk7XHJcbiAqICAgICB9KSgpO1xyXG4gKiAgICAgLy8gaW5kaXJlY3RseSByZXRyaWV2ZSB0aGUgaGlkZGVuIHZhcmlhYmxlcyB2YWx1ZVxyXG4gKiAgICAgY29uc29sZS5hc3NlcnQoJ2RlZmF1bHRWYWx1ZScgPT09IHRsZC5kb21haW4uYXBwLmJhY2tkb29yLmdldFZhbHVlKCkpO1xyXG4gKiAgICAgLy8gaW5kaXJlY3RseSBzZXQgdGhlIGhpZGRlbiB2YXJpYWJsZXMgdmFsdWVcclxuICogICAgIHRsZC5kb21haW4uYXBwLmJhY2tkb29yLnNldFZhbHVlKCduZXdWYWx1ZScpO1xyXG4gKiAgICAgLy8gdGhlIGhpZGRlbiB2YXIgd2FzIG11dGF0ZWRcclxuICogICAgIGNvbnNvbGUuYXNzZXJ0KCduZXdWYWx1ZScgPT09IHRsZC5kb21haW4uYXBwLmJhY2tkb29yLmdldFZhbHVlKCkpO1xyXG4gKlxyXG4gKiBPbiBvY2Nhc2lvbiwgcHJpbWFyaWx5IGR1cmluZyB0ZXN0aW5nLCB5b3UgbWF5IHdhbnQgdG8gdXNlIGRlY2xhcmUsXHJcbiAqIGJ1dCBub3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBiZSB0aGUgbmFtZXNwYWNlIHJvb3QuIEluIHRoZXNlIGNhc2VzIHlvdVxyXG4gKiBjYW4gc3VwcGx5IHRoZSBvcHRpb25hbCB0aGlyZCBzY29wZSBhcmd1bWVudC5cclxuICpcclxuICogICAgIHZhciBsb2NhbFNjb3BlPSB7fVxyXG4gKiAgICAgLCAgIG9iamVjdD0ge31cclxuICpcclxuICogICAgIHB1cmVtdmMuZGVjbGFyZSgnbW9jay5vYmplY3QnLCBvYmplY3QsIGxvY2FsU2NvcGUpO1xyXG4gKlxyXG4gKiAgICAgY29uc29sZS5hc3NlcnQobnVsbCA9PSB3aW5kb3cubW9jaywgJ21vY2sgbmFtZXNwYWNlIGlzIG5vdCBpbiBnbG9iYWwgc2NvcGUnKTtcclxuICogICAgIGNvbnNvbGUuYXNzZXJ0KG9iamVjdCA9PT0gbG9jYWxTY29wZS5tb2NrLm9iamVjdCwgJ21vY2sub2JqZWN0IGlzIGF2YWlsYWJsZSBpbiBsb2NhbFNjb3BlJyk7XHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmdcclxuICogIEEgcXVhbGlmaWVkIG9iamVjdCBuYW1lLCBlLmcuICdjb20uZXhhbXBsZS5DbGFzcydcclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdXHJcbiAqICBBbiBvYmplY3QgdG8gbWFrZSB0aGUgcmVmZXJlbnQgb2YgdGhlIG5hbWVzcGFjZS5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IFtzY29wZV1cclxuICogIFRoZSBuYW1lc3BhY2UncyByb290IG5vZGUuIElmIG5vdCBzdXBwbGllZCwgdGhlIGdsb2JhbFxyXG4gKiAgc2NvcGUgd2lsbCBiZSBuYW1lc3BhY2VzIHJvb3Qgbm9kZS5cclxuICpcclxuICogQHJldHVybiB7T2JqZWN0fVxyXG4gKlxyXG4gKiAgQSByZWZlcmVuY2UgdG8gdGhlIGxhc3Qgbm9kZSBvZiB0aGUgT2JqZWN0IGhpZXJhcmNoeSBjcmVhdGVkLlxyXG4gKi9cclxuZnVuY3Rpb24gZGVjbGFyZSAocXVhbGlmaWVkTmFtZSwgb2JqZWN0LCBzY29wZSlcclxue1xyXG4gICAgdmFyIG5vZGVzPSBxdWFsaWZpZWROYW1lLnNwbGl0KCcuJylcclxuICAgICAgICAsICAgbm9kZT0gc2NvcGUgfHwgT29wSGVscC5nbG9iYWxcclxuICAgICAgICAsICAgbGFzdE5vZGVcclxuICAgICAgICAsICAgbmV3Tm9kZVxyXG4gICAgICAgICwgICBub2RlTmFtZTtcclxuXHJcbiAgICBmb3IgKHZhciBpPSAwLCBuPSBub2Rlcy5sZW5ndGg7IGkgPCBuOyBpKyspXHJcbiAgICB7XHJcbiAgICAgICAgbGFzdE5vZGU9IG5vZGU7XHJcbiAgICAgICAgbm9kZU5hbWU9IG5vZGVzW2ldO1xyXG5cclxuICAgICAgICBub2RlPSAobnVsbCA9PSBub2RlW25vZGVOYW1lXSA/IG5vZGVbbm9kZU5hbWVdID0ge30gOiBub2RlW25vZGVOYW1lXSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG51bGwgPT0gb2JqZWN0KVxyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG5cclxuICAgIHJldHVybiBsYXN0Tm9kZVtub2RlTmFtZV09IG9iamVjdDtcclxufTtcclxuXHJcblxyXG5cclxuXHJcbi8qKlxyXG4gKiBAbWVtYmVyIHB1cmVtdmNcclxuICpcclxuICogRGVmaW5lIGEgbmV3IGNsYXNzbGV0LiBDdXJyZW50IGVkaXRpb25zIG9mIEphdmFTY3JpcHQgZG8gbm90IGhhdmUgY2xhc3NlcyxcclxuICogYnV0IHRoZXkgY2FuIGJlIGVtdWxhdGVkLCBhbmQgdGhpcyBtZXRob2QgZG9lcyB0aGlzIGZvciB5b3UsIHNhdmluZyB5b3VcclxuICogZnJvbSBoYXZpbmcgdG8gd29yayB3aXRoIEZ1bmN0aW9uIHByb3RvdHlwZSBkaXJlY3RseS4gVGhlIG1ldGhvZCBkb2VzXHJcbiAqIG5vdCBleHRlbmQgYW55IE5hdGl2ZSBvYmplY3RzIGFuZCBpcyBlbnRpcmVseSBvcHQgaW4uIEl0cyBwYXJ0aWN1bGFybHlcclxuICogdXNlZnVsbCBpZiB5b3Ugd2FudCB0byBtYWtlIHlvdXIgUHVyZU12YyBhcHBsaWNhdGlvbnMgbW9yZSBwb3J0YWJsZSwgYnlcclxuICogZGVjb3VwbGluZyB0aGVtIGZyb20gYSBzcGVjaWZpYyBPT1AgYWJzdHJhY3Rpb24gbGlicmFyeS5cclxuICpcclxuICpcclxuICogICAgIHB1cmVtdmMuZGVmaW5lXHJcbiAqICAgICAoXHJcbiAqICAgICAgICAgLy8gdGhlIGZpcnN0IG9iamVjdCBzdXBwbGllZCBpcyBhIGNsYXNzIGRlc2NyaXB0b3IuIE5vbmUgb2YgdGhlc2VcclxuICogICAgICAgICAvLyBwcm9wZXJ0aWVzIGFyZSBhZGRlZCB0byB5b3VyIGNsYXNzLCB0aGUgZXhjZXB0aW9uIGJlaW5nIHRoZVxyXG4gKiAgICAgICAgIC8vIGNvbnN0cnVjdG9yIHByb3BlcnR5LCB3aGljaCBpZiBzdXBwbGllZCwgd2lsbCBiZSB5b3VyIGNsYXNzZXNcclxuICogICAgICAgICAvLyBjb25zdHJ1Y3Rvci5cclxuICogICAgICAgICB7XHJcbiAqICAgICAgICAgICAgIC8vIHlvdXIgY2xhc3NlcyBuYW1lc3BhY2UtIGlmIHN1cHBsaWVkLCBpdCB3aWxsIGJlIFxyXG4gKiAgICAgICAgICAgICAvLyBjcmVhdGVkIGZvciB5b3VcclxuICogICAgICAgICAgICAgbmFtZTogJ2NvbS5leGFtcGxlLlVzZXJNZWRpYXRvcidcclxuICogXHJcbiAqICAgICAgICAgICAgIC8vIHlvdXIgY2xhc3NlcyBwYXJlbnQgY2xhc3MuIElmIHN1cHBsaWVkLCBpbmhlcml0YW5jZSBcclxuICogICAgICAgICAgICAgLy8gd2lsbCBiZSB0YWtlbiBjYXJlIG9mIGZvciB5b3VcclxuICogICAgICAgICAsICAgcGFyZW50OiBwdXJlbXZjLk1lZGlhdG9yXHJcbiAqIFxyXG4gKiAgICAgICAgICAgICAvLyB5b3VyIGNsYXNzZXMgY29uc3RydWN0b3IuIElmIG5vdCBzdXBwbGllZCwgb25lIHdpbGwgYmUgXHJcbiAqICAgICAgICAgICAgIC8vIGNyZWF0ZWQgZm9yIHlvdVxyXG4gKiAgICAgICAgICwgICBjb25zdHJ1Y3RvcjogZnVuY3Rpb24gVXNlck1lZGlhdG9yIChjb21wb25lbnQpXHJcbiAqICAgICAgICAgICAgIHtcclxuICogICAgICAgICAgICAgICAgICBwdXJlbXZjLk1lZGlhdG9yLmNhbGwodGhpcywgdGhpcy5jb25zdHJ1Y3Rvci5OQU1FLCBjb21wb25lbnQpOyAgXHJcbiAqICAgICAgICAgICAgIH1cclxuICogICAgICAgICB9XHJcbiAqXHJcbiAqICAgICAgICAgLy8gdGhlIHNlY29uZCBvYmplY3Qgc3VwcGxpZWQgZGVmaW5lcyB5b3VyIGNsYXNzIHRyYWl0cywgdGhhdCBpc1xyXG4gKiAgICAgICAgIC8vIHRoZSBwcm9wZXJ0aWVzIHRoYXQgd2lsbCBiZSBkZWZpbmVkIG9uIHlvdXIgY2xhc3NlcyBwcm90b3R5cGVcclxuICogICAgICAgICAvLyBhbmQgdGhlcmVieSBvbiBhbGwgaW5zdGFuY2VzIG9mIHRoaXMgY2xhc3NcclxuICogICAgICwgICB7XHJcbiAqICAgICAgICAgICAgIGJ1c2luZXNzTWV0aG9kOiBmdW5jdGlvbiAoKVxyXG4gKiAgICAgICAgICAgICB7XHJcbiAqICAgICAgICAgICAgICAgICAvLyBpbXBsIFxyXG4gKiAgICAgICAgICAgICB9XHJcbiAqICAgICAgICAgfVxyXG4gKlxyXG4gKiAgICAgICAgIC8vIHRoZSB0aGlyZCBvYmplY3Qgc3VwcGxpZWQgZGVmaW5lcyB5b3VyIGNsYXNzZXMgJ3N0YXRpYycgdHJhaXRzXHJcbiAqICAgICAgICAgLy8gdGhhdCBpcywgdGhlIG1ldGhvZHMgYW5kIHByb3BlcnRpZXMgd2hpY2ggd2lsbCBiZSBkZWZpbmVkIG9uXHJcbiAqICAgICAgICAgLy8geW91ciBjbGFzc2VzIGNvbnN0cnVjdG9yXHJcbiAqICAgICAsICAge1xyXG4gKiAgICAgICAgICAgICBOQU1FOiAndXNlck1lZGlhdG9yJ1xyXG4gKiAgICAgICAgIH1cclxuICogICAgICk7XHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBbY2xhc3NpbmZvXVxyXG4gKiAgQW4gb2JqZWN0IGRlc2NyaWJpbmcgdGhlIGNsYXNzLiBUaGlzIG9iamVjdCBjYW4gaGF2ZSBhbnkgb3IgYWxsIG9mXHJcbiAqICB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXM6XHJcbiAqXHJcbiAqICAtIG5hbWU6IFN0cmluZ1xyXG4gKiAgICAgIFRoZSBjbGFzc2xldHMgbmFtZS4gVGhpcyBjYW4gYmUgYW55IGFyYml0cmFyeSBxdWFsaWZpZWQgb2JqZWN0XHJcbiAqICAgICAgbmFtZS4gJ2NvbS5leGFtcGxlLkNsYXNzbGV0JyBvciBzaW1wbHkgJ015Q2xhc3NsZXQnIGZvciBleGFtcGxlXHJcbiAqICAgICAgVGhlIG1ldGhvZCB3aWxsIGF1dG9tYXRpY2FsbHkgY3JlYXRlIGFuIG9iamVjdCBoaWVyYXJjaHkgcmVmZXJpbmdcclxuICogICAgICB0byB5b3VyIGNsYXNzIGZvciB5b3UuIE5vdGUgdGhhdCB5b3Ugd2lsbCBuZWVkIHRvIGNhcHR1cmUgdGhlXHJcbiAqICAgICAgbWV0aG9kcyByZXR1cm4gdmFsdWUgdG8gcmV0cmlldmUgYSByZWZlcmVuY2UgdG8geW91ciBjbGFzcyBpZiB0aGVcclxuICogICAgICBjbGFzcyBuYW1lIHByb3BlcnR5IGlzIG5vdCBkZWZpbmVkLlxyXG4gKiAgLSBwYXJlbnQ6IEZ1bmN0aW9uXHJcbiAqICAgICAgVGhlIGNsYXNzbGV0cyAnc3VwZXJjbGFzcycuIFlvdXIgY2xhc3Mgd2lsbCBiZSBleHRlbmRlZCBmcm9tIHRoaXNcclxuICogICAgICBpZiBzdXBwbGllZC5cclxuICpcclxuICogIC0gY29uc3RydWN0b3I6IEZ1bmN0aW9uXHJcbiAqICAgICAgVGhlIGNsYXNzbGV0cyBjb25zdHJ1Y3Rvci4gTm90ZSB0aGlzIGlzICpub3QqIGEgcG9zdCBjb25zdHJ1Y3RcclxuICogICAgICBpbml0aWFsaXplIG1ldGhvZCwgYnV0IHlvdXIgY2xhc3NlcyBjb25zdHJ1Y3RvciBGdW5jdGlvbi5cclxuICogICAgICBJZiB0aGlzIGF0dHJpYnV0ZSBpcyBub3QgZGVmaW5lZCwgYSBjb25zdHJ1Y3RvciB3aWxsIGJlIGNyZWF0ZWQgZm9yXHJcbiAqICAgICAgeW91IGF1dG9tYXRpY2FsbHkuIElmIHlvdSBoYXZlIHN1cHBsaWVkIGEgcGFyZW50IGNsYXNzXHJcbiAqICAgICAgdmFsdWUgYW5kIG5vdCBkZWZpbmVkIHRoZSBjbGFzc2VzIGNvbnN0cnVjdG9yLCB0aGUgYXV0b21hdGljYWxseVxyXG4gKiAgICAgIGNyZWF0ZWQgY29uc3RydWN0b3Igd2lsbCBpbnZva2UgdGhlIHN1cGVyIGNsYXNzIGNvbnN0cnVjdG9yXHJcbiAqICAgICAgYXV0b21hdGljYWxseS4gSWYgeW91IGhhdmUgc3VwcGxpZWQgeW91ciBvd24gY29uc3RydWN0b3IgYW5kIHlvdVxyXG4gKiAgICAgIHdpc2ggdG8gaW52b2tlIGl0J3Mgc3VwZXIgY29uc3RydWN0b3IsIHlvdSBtdXN0IGRvIHRoaXMgbWFudWFsbHksIGFzXHJcbiAqICAgICAgdGhlcmUgaXMgbm8gcmVmZXJlbmNlIHRvIHRoZSBjbGFzc2VzIHBhcmVudCBhZGRlZCB0byB0aGUgY29uc3RydWN0b3JcclxuICogICAgICBwcm90b3R5cGUuXHJcbiAqXHJcbiAqICAtIHNjb3BlOiBPYmplY3QuXHJcbiAqICAgICAgRm9yIHVzZSBpbiBhZHZhbmNlZCBzY2VuYXJpb3MuIElmIHRoZSBuYW1lIGF0dHJpYnV0ZSBoYXMgYmVlbiBzdXBwbGllZCxcclxuICogICAgICB0aGlzIHZhbHVlIHdpbGwgYmUgdGhlIHJvb3Qgb2YgdGhlIG9iamVjdCBoaWVyYXJjaHkgY3JlYXRlZCBmb3IgeW91LlxyXG4gKiAgICAgIFVzZSBpdCBkbyBkZWZpbmUgeW91ciBvd24gY2xhc3MgaGllcmFyY2hpZXMgaW4gcHJpdmF0ZSBzY29wZXMsXHJcbiAqICAgICAgYWNjcm9zcyBpRnJhbWVzLCBpbiB5b3VyIHVuaXQgdGVzdHMsIG9yIGF2b2lkIGNvbGxpc2lvbiB3aXRoIHRoaXJkXHJcbiAqICAgICAgcGFydHkgbGlicmFyeSBuYW1lc3BhY2VzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gW3RyYWl0c11cclxuICogIEFuIE9iamVjdCwgdGhlIHByb3BlcnRpZXMgb2Ygd2hpY2ggd2lsbCBiZSBhZGRlZCB0byB0aGVcclxuICogIGNsYXNzIGNvbnN0cnVjdG9ycyBwcm90b3R5cGUuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBbc3RhaXRjVHJhaXRzXVxyXG4gKiAgQW4gT2JqZWN0LCB0aGUgcHJvcGVydGllcyBvZiB3aGljaCB3aWxsIGJlIGFkZGVkIGRpcmVjdGx5XHJcbiAqICB0byB0aGlzIGNsYXNzIGNvbnN0cnVjdG9yXHJcbiAqXHJcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxyXG4gKiAgQSByZWZlcmVuY2UgdG8gdGhlIGNsYXNzbGV0cyBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gZGVmaW5lIChjbGFzc0luZm8sIHRyYWl0cywgc3RhdGljVHJhaXRzKVxyXG57XHJcbiAgICBpZiAoIWNsYXNzSW5mbylcclxuICAgIHtcclxuICAgICAgICBjbGFzc0luZm89IHt9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGNsYXNzTmFtZT0gY2xhc3NJbmZvLm5hbWVcclxuICAgICAgICAsICAgY2xhc3NQYXJlbnQ9IGNsYXNzSW5mby5wYXJlbnRcclxuICAgICAgICAsICAgZG9FeHRlbmQ9ICdmdW5jdGlvbicgPT09IHR5cGVvZiBjbGFzc1BhcmVudFxyXG4gICAgICAgICwgICBjbGFzc0NvbnN0cnVjdG9yXHJcbiAgICAgICAgLCAgIGNsYXNzU2NvcGU9IGNsYXNzSW5mby5zY29wZSB8fCBudWxsXHJcbiAgICAgICAgLCAgIHByb3RvdHlwZVxyXG5cclxuICAgIGlmICgncGFyZW50JyBpbiBjbGFzc0luZm8gJiYgIWRvRXh0ZW5kKVxyXG4gICAge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0NsYXNzIHBhcmVudCBtdXN0IGJlIEZ1bmN0aW9uJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNsYXNzSW5mby5oYXNPd25Qcm9wZXJ0eSgnY29uc3RydWN0b3InKSlcclxuICAgIHtcclxuICAgICAgICBjbGFzc0NvbnN0cnVjdG9yPSBjbGFzc0luZm8uY29uc3RydWN0b3JcclxuICAgICAgICBpZiAoJ2Z1bmN0aW9uJyAhPT0gdHlwZW9mIGNsYXNzQ29uc3RydWN0b3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDbGFzcyBjb25zdHJ1Y3RvciBtdXN0IGJlIEZ1bmN0aW9uJylcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIC8vIHRoZXJlIGlzIG5vIGNvbnN0cnVjdG9yLCBjcmVhdGUgb25lXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKGRvRXh0ZW5kKSAvLyBlbnN1cmUgdG8gY2FsbCB0aGUgc3VwZXIgY29uc3RydWN0b3JcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNsYXNzQ29uc3RydWN0b3I9IGZ1bmN0aW9uICgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNsYXNzUGFyZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSAvLyBqdXN0IGNyZWF0ZSBhIEZ1bmN0aW9uXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjbGFzc0NvbnN0cnVjdG9yPSBuZXcgRnVuY3Rpb247XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChkb0V4dGVuZClcclxuICAgIHtcclxuICAgICAgICBPb3BIZWxwLmV4dGVuZChjbGFzc0NvbnN0cnVjdG9yLCBjbGFzc1BhcmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRyYWl0cylcclxuICAgIHtcclxuICAgICAgICBwcm90b3R5cGU9IGNsYXNzQ29uc3RydWN0b3IucHJvdG90eXBlXHJcbiAgICAgICAgT29wSGVscC5kZWNvcmF0ZShwcm90b3R5cGUsIHRyYWl0cyk7XHJcbiAgICAgICAgLy8gcmVhc3NpZ24gY29uc3RydWN0b3IgXHJcbiAgICAgICAgcHJvdG90eXBlLmNvbnN0cnVjdG9yPSBjbGFzc0NvbnN0cnVjdG9yO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChzdGF0aWNUcmFpdHMpXHJcbiAgICB7XHJcbiAgICAgICAgT29wSGVscC5kZWNvcmF0ZShjbGFzc0NvbnN0cnVjdG9yLCBzdGF0aWNUcmFpdHMpXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNsYXNzTmFtZSlcclxuICAgIHtcclxuICAgICAgICBpZiAoJ3N0cmluZycgIT09IHR5cGVvZiBjbGFzc05hbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDbGFzcyBuYW1lIG11c3QgYmUgcHJpbWl0aXZlIHN0cmluZycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGVjbGFyZSAoY2xhc3NOYW1lLCBjbGFzc0NvbnN0cnVjdG9yLCBjbGFzc1Njb3BlKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY2xhc3NDb25zdHJ1Y3RvcjtcclxufTtcclxuXHJcblxyXG5cclxuLyogaW1wbGVtZW50YXRpb24gZW5kICovXHJcblxyXG4vLyBkZWZpbmUgdGhlIHB1cmVtdmMgZ2xvYmFsIG5hbWVzcGFjZSBhbmQgZXhwb3J0IHRoZSBhY3RvcnNcclxudmFyIHB1cmVtdmMgPVxyXG57XHJcbiAgICAgICAgVmlldzogVmlld1xyXG4gICAgLFx0TW9kZWw6IE1vZGVsXHJcbiAgICAsXHRDb250cm9sbGVyOiBDb250cm9sbGVyXHJcbiAgICAsXHRTaW1wbGVDb21tYW5kOiBTaW1wbGVDb21tYW5kXHJcbiAgICAsXHRNYWNyb0NvbW1hbmQ6IE1hY3JvQ29tbWFuZFxyXG4gICAgLFx0RmFjYWRlOiBGYWNhZGVcclxuICAgICxcdE1lZGlhdG9yOiBNZWRpYXRvclxyXG4gICAgLFx0T2JzZXJ2ZXI6IE9ic2VydmVyXHJcbiAgICAsXHROb3RpZmljYXRpb246IE5vdGlmaWNhdGlvblxyXG4gICAgLFx0Tm90aWZpZXI6IE5vdGlmaWVyXHJcbiAgICAsXHRQcm94eTogUHJveHlcclxuICAgICxcdGRlZmluZTogZGVmaW5lXHJcbiAgICAsXHRkZWNsYXJlOiBkZWNsYXJlXHJcbn07XHJcblxyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcHVyZW12YzsiLCJ2YXIgQXBwRmFjYWRlID0gcmVxdWlyZSgnLi9hcHBGYWNhZGUuanMnKTtcbnZhciBnX3Jlc291Y2VzID0gcmVxdWlyZSgnLi9yZXNvdXJjZS5qcycpLmdfcmVzb3VjZXM7XG5cbihmdW5jdGlvbigpIHtcbiAgICBjYy5nYW1lLm9uU3RhcnQgPSBmdW5jdGlvbigpe1xuICAgICAgICBjYy52aWV3LmFkanVzdFZpZXdQb3J0KHRydWUpO1xuICAgICAgICBjYy52aWV3LnNldERlc2lnblJlc29sdXRpb25TaXplKDY0MCwgOTYwLCBjYy5SZXNvbHV0aW9uUG9saWN5LlNIT1dfQUxMKTtcbiAgICAgICAgY2Mudmlldy5yZXNpemVXaXRoQnJvd3NlclNpemUodHJ1ZSk7XG5cbiAgICAgICAgY2NzLmNzTG9hZGVyLnNldFJlY29yZFByb3RvY29sQnVmZmVyc1BhdGgodHJ1ZSk7XG4gICAgICAgIGNjLkxvYWRlclNjZW5lLnByZWxvYWQoZ19yZXNvdWNlcywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIga2V5ID0gJ2ZpZ2h0ZXItbXZjJztcbiAgICAgICAgICAgIEFwcEZhY2FkZS5nZXRJbnN0YW5jZShrZXkpLnN0YXJ0dXAoKTtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgfTtcbiAgICBjYy5nYW1lLnJ1bigpO1xufSkoKTsiLCIvKipcclxuICogQ3JlYXRlZCBieSBBcnRodXIgb24gMjAxNC8xMi8yMC5cclxuICovXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgQVBQX05BTUU6IFwiZmlnaHRlclwiLFxyXG5cclxuICAgIE5PVElGSUNBVElPTjoge1xyXG4gICAgICAgIFNUQVJUVVA6ICdzdGFydHVwJyxcclxuICAgICAgICBTQ0VORV9DSEFOR0VEOiAnc2NlbmVfY2hhbmdlZCcsXHJcbiAgICAgICAgU0NFTkVfSE9NRTogJ3NjZW5lX2hvbWUnXHJcbiAgICB9LFxyXG5cclxuICAgIFNDRU5FX0FDVElPTjogJ3NjZW5lX2FjdGlvbicsXHJcbiAgICBTQ0VORToge1xyXG4gICAgICAgIEhPTUU6ICdIb21lTWVkaWF0b3InLFxyXG4gICAgICAgIFRSQUlOOiAnVHJhaW5NZWRpYXRvcidcclxuICAgIH1cclxufTsiLCIvKipcclxuICogQ3JlYXRlZCBieSBBcnRodXIgb24gMjAxNC8xMi8yMS5cclxuICovXHJcbnZhciBwdXJlbXZjID0gcmVxdWlyZSgncHVyZW12YycpLnB1cmVtdmM7XHJcbnZhciBTdGFydHVwQ29tbWFuZCA9IHJlcXVpcmUoJy4vY29udHJvbGxlci9jb21tYW5kL1N0YXJ0dXBDb21tYW5kLmpzJyk7XHJcbnZhciBjb25zdGFudHMgPSByZXF1aXJlKCcuL2FwcENvbnN0YW50cy5qcycpO1xyXG5cclxudmFyIEFwcEZhY2FkZSA9IG1vZHVsZS5leHBvcnRzID0gcHVyZW12Yy5kZWZpbmUoXHJcbiAgICAvLyBDTEFTUyBJTkZPXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ0FwcEZhY2FkZScsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLkZhY2FkZSxcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3I6IGZ1bmN0aW9uIChtdWx0aXRvbktleSkge1xyXG4gICAgICAgICAgICBwdXJlbXZjLkZhY2FkZS5jYWxsKHRoaXMsIG11bHRpdG9uS2V5KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIGluaXRpYWxpemVDb250cm9sbGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHB1cmVtdmMuRmFjYWRlLnByb3RvdHlwZS5pbml0aWFsaXplQ29udHJvbGxlci5jYWxsKHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyQ29tbWFuZChjb25zdGFudHMuTk9USUZJQ0FUSU9OLlNUQVJUVVAsIFN0YXJ0dXBDb21tYW5kKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGluaXRpYWxpemVNb2RlbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBwdXJlbXZjLkZhY2FkZS5wcm90b3R5cGUuaW5pdGlhbGl6ZU1vZGVsLmNhbGwodGhpcyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBpbml0aWFsaXplVmlldzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBwdXJlbXZjLkZhY2FkZS5wcm90b3R5cGUuaW5pdGlhbGl6ZVZpZXcuY2FsbCh0aGlzKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzdGFydHVwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VuZE5vdGlmaWNhdGlvbihjb25zdGFudHMuTk9USUZJQ0FUSU9OLlNUQVJUVVApO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIGdldEluc3RhbmNlOiBmdW5jdGlvbihtdWx0aXRvbktleSkge1xyXG4gICAgICAgICAgICB2YXIgaW5zdGFuY2VNYXAgPSBwdXJlbXZjLkZhY2FkZS5pbnN0YW5jZU1hcDtcclxuICAgICAgICAgICAgdmFyIGluc3RhbmNlID0gaW5zdGFuY2VNYXBbbXVsdGl0b25LZXldO1xyXG4gICAgICAgICAgICBpZihpbnN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGluc3RhbmNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBpbnN0YW5jZU1hcFttdWx0aXRvbktleV0gPSBuZXcgQXBwRmFjYWRlKG11bHRpdG9uS2V5KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIE5BTUU6ICdBcHBGYWNhZGUnXHJcbiAgICB9XHJcbik7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgQXJ0aHVyIG9uIDIwMTQvMTIvMTQuXHJcbiAqL1xyXG5cclxudmFyIHB1cmVtdmMgPSByZXF1aXJlKCdwdXJlbXZjJykucHVyZW12YztcclxudmFyIFByZXBDb250cm9sbGVyQ29tbWFuZCA9IHJlcXVpcmUoJy4vcHJlcENvbnRyb2xsZXJDb21tYW5kLmpzJyk7XHJcbnZhciBQcmVwTW9kZWxDb21tYW5kID0gcmVxdWlyZSgnLi9wcmVwTW9kZWxDb21tYW5kLmpzJyk7XHJcbnZhciBQcmVwVmlld0NvbW1hbmQgPSByZXF1aXJlKCcuL3ByZXBWaWV3Q29tbWFuZC5qcycpO1xyXG52YXIgSG9tZUNvbW1hbmQgPSByZXF1aXJlKCcuL2hvbWVDb21tYW5kLmpzJyk7XHJcbnZhciBjb25zdGFudHMgPSByZXF1aXJlKCcuLi8uLi9hcHBDb25zdGFudHMuanMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcHVyZW12Yy5kZWZpbmUoe1xyXG4gICAgICAgIG5hbWU6ICdmaWdodGVyLmNvbnRyb2xsZXIuY29tbWFuZC5TdGFydHVwQ29tbWFuZCcsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLk1hY3JvQ29tbWFuZFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWRkIHRoZSBzdWItY29tbWFuZHMgZm9yIHRoaXMgTWFjcm9Db21tYW5kXHJcbiAgICAgICAgICogQG92ZXJyaWRlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaW5pdGlhbGl6ZU1hY3JvQ29tbWFuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjYy5sb2coJ3N0YXJ0IGNvbW1hbmQgaW5pdCcpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZFN1YkNvbW1hbmQoIFByZXBDb250cm9sbGVyQ29tbWFuZCApO1xyXG4gICAgICAgICAgICB0aGlzLmFkZFN1YkNvbW1hbmQoIFByZXBNb2RlbENvbW1hbmQgKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRTdWJDb21tYW5kKCBQcmVwVmlld0NvbW1hbmQgKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRTdWJDb21tYW5kKCBIb21lQ29tbWFuZCApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuKTtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgQXJ0aHVyIG9uIDIwMTQvMTIvMjEuXHJcbiAqL1xyXG5cclxudmFyIHB1cmVtdmMgPSByZXF1aXJlKCdwdXJlbXZjJykucHVyZW12YztcclxudmFyIGNvbnN0YW50cyA9IHJlcXVpcmUoJy4uLy4uL2FwcENvbnN0YW50cy5qcycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBwdXJlbXZjLmRlZmluZSh7XHJcbiAgICAgICAgbmFtZTogJ2ZpZ2h0ZXIuY29udHJvbGxlci5jb21tYW5kLkhvbWVDb21tYW5kJyxcclxuICAgICAgICBwYXJlbnQ6IHB1cmVtdmMuU2ltcGxlQ29tbWFuZFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVnaXN0ZXIgQ29tbWFuZHMgd2l0aCB0aGUgQ29udHJvbGxlclxyXG4gICAgICAgICAqIEBvdmVycmlkZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGV4ZWN1dGU6IGZ1bmN0aW9uIChub3RlKSB7XHJcbiAgICAgICAgICAgIC8vIFRoaXMgcmVnaXN0ZXJzIG11bHRpcGxlIG5vdGVzIHRvIGEgc2luZ2xlIGNvbW1hbmQgd2hpY2ggcGVyZm9ybXMgZGlmZmVyZW50IGxvZ2ljIGJhc2VkIG9uIHRoZSBub3RlIG5hbWUuXHJcbiAgICAgICAgICAgIC8vIEluIGEgbW9yZSBjb21wbGV4IGFwcCwgd2UnZCB1c3VhbGx5IGJlIHJlZ2lzdGVyaW5nIGEgZGlmZmVyZW50IGNvbW1hbmQgdG8gZWFjaCBub3RpZmljYXRpb24gbmFtZS5cclxuICAgICAgICAgICAgY2MubG9nKCdIb21lQ29tbWFuZCBleGVjdXRlJyk7XHJcbiAgICAgICAgICAgIHRoaXMuZmFjYWRlLnNlbmROb3RpZmljYXRpb24oY29uc3RhbnRzLlNDRU5FX0FDVElPTiwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogY29uc3RhbnRzLlNDRU5FLkhPTUVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4pO1xyXG5cclxuXHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFydGh1ciBvbiAyMDE0LzEyLzE0LlxyXG4gKi9cclxudmFyIHB1cmVtdmMgPSByZXF1aXJlKCdwdXJlbXZjJykucHVyZW12YztcclxudmFyIGNvbnN0YW50cyA9IHJlcXVpcmUoJy4uLy4uL2FwcENvbnN0YW50cy5qcycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBwdXJlbXZjLmRlZmluZSh7XHJcbiAgICAgICAgbmFtZTogJ2ZpZ2h0ZXIuY29udHJvbGxlci5jb21tYW5kLlByZXBDb250cm9sbGVyQ29tbWFuZCcsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLlNpbXBsZUNvbW1hbmRcclxuICAgIH0sXHJcblxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlZ2lzdGVyIENvbW1hbmRzIHdpdGggdGhlIENvbnRyb2xsZXJcclxuICAgICAgICAgKiBAb3ZlcnJpZGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBleGVjdXRlOiBmdW5jdGlvbiAobm90ZSkge1xyXG4gICAgICAgICAgICAvLyBUaGlzIHJlZ2lzdGVycyBtdWx0aXBsZSBub3RlcyB0byBhIHNpbmdsZSBjb21tYW5kIHdoaWNoIHBlcmZvcm1zIGRpZmZlcmVudCBsb2dpYyBiYXNlZCBvbiB0aGUgbm90ZSBuYW1lLlxyXG4gICAgICAgICAgICAvLyBJbiBhIG1vcmUgY29tcGxleCBhcHAsIHdlJ2QgdXN1YWxseSBiZSByZWdpc3RlcmluZyBhIGRpZmZlcmVudCBjb21tYW5kIHRvIGVhY2ggbm90aWZpY2F0aW9uIG5hbWUuXHJcbiAgICAgICAgICAgIGNjLmxvZygnUHJlcENvbnRyb2xsZXJDb21tYW5kIGV4ZWN1dGUnKTtcclxuXHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuKTsiLCIvKipcclxuICogQ3JlYXRlZCBieSBBcnRodXIgb24gMjAxNC8xMi8xNC5cclxuICovXHJcbnZhciBwdXJlbXZjID0gcmVxdWlyZSgncHVyZW12YycpLnB1cmVtdmM7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHB1cmVtdmMuZGVmaW5lKHtcclxuICAgICAgICBuYW1lOiAnZmlnaHRlci5jb250cm9sbGVyLmNvbW1hbmQuUHJlcE1vZGVsQ29tbWFuZCcsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLlNpbXBsZUNvbW1hbmRcclxuICAgIH0sXHJcblxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlZ2lzdGVyIFByb3hpZXMgd2l0aCB0aGUgTW9kZWxcclxuICAgICAgICAgKiBAb3ZlcnJpZGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBleGVjdXRlOiBmdW5jdGlvbiAobm90ZSkge1xyXG4gICAgICAgICAgICBjYy5sb2coJ1ByZXBNb2RlbENvbW1hbmQgZXhlY3V0ZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuKTtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgQXJ0aHVyIG9uIDIwMTQvMTIvMTQuXHJcbiAqL1xyXG52YXIgcHVyZW12YyA9IHJlcXVpcmUoJ3B1cmVtdmMnKS5wdXJlbXZjO1xyXG52YXIgRGlyZWN0b3JNZWRpYXRvciA9IHJlcXVpcmUoJy4uLy4uL3ZpZXcvbWVkaWF0b3IvZGlyZWN0b3JNZWRpYXRvci5qcycpO1xyXG52YXIgSG9tZU1lZGlhdG9yID0gcmVxdWlyZSgnLi4vLi4vdmlldy9tZWRpYXRvci9ob21lTWVkaWF0b3IuanMnKTtcclxudmFyIFNjZW5lTWVkaWF0b3IgPSByZXF1aXJlKCcuLi8uLi92aWV3L21lZGlhdG9yL3NjZW5lTWVkaWF0b3IuanMnKTtcclxudmFyIFRyYWluTWVkaWF0b3IgPSByZXF1aXJlKCcuLi8uLi92aWV3L21lZGlhdG9yL3RyYWluTWVkaWF0b3IuanMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcHVyZW12Yy5kZWZpbmUgKHtcclxuICAgICAgICBuYW1lOiAnZmlnaHRlci5jb250cm9sbGVyLmNvbW1hbmQuUHJlcFZpZXdDb21tYW5kJyxcclxuICAgICAgICBwYXJlbnQ6IHB1cmVtdmMuU2ltcGxlQ29tbWFuZFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVnaXN0ZXIgTWVkaWF0b3JzIHdpdGggdGhlIFZpZXdcclxuICAgICAgICAgKiBAb3ZlcnJpZGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBleGVjdXRlOiBmdW5jdGlvbiAobm90ZSkge1xyXG4gICAgICAgICAgICBjYy5sb2coJ1ByZXBWaWV3Q29tbWFuZCBleGVjdXRlJyk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmZhY2FkZS5yZWdpc3Rlck1lZGlhdG9yKG5ldyBEaXJlY3Rvck1lZGlhdG9yKCkpO1xyXG4gICAgICAgICAgICB0aGlzLmZhY2FkZS5yZWdpc3Rlck1lZGlhdG9yKG5ldyBTY2VuZU1lZGlhdG9yKCkpO1xyXG4gICAgICAgICAgICB0aGlzLmZhY2FkZS5yZWdpc3Rlck1lZGlhdG9yKG5ldyBIb21lTWVkaWF0b3IoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuZmFjYWRlLnJlZ2lzdGVyTWVkaWF0b3IobmV3IFRyYWluTWVkaWF0b3IoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4pO1xyXG4iLCJ2YXIgcmVzID0ge1xuICAgIGFkZF9qcGc6IFwicmVzL2ltYWdlcy9hZGQuanBnXCIsXG4gICAgYnRuMV9qcGc6IFwicmVzL2ltYWdlcy9idG4xLmpwZ1wiLFxuXG4gICAgYnRuM19wbmc6IFwicmVzL2ltYWdlcy9idG4zLmpwZ1wiLFxuICAgIGJ0bjVfcG5nOiBcInJlcy9pbWFnZXMvYnRuNS5qcGdcIixcbiAgICBidG43X2pwZzogXCJyZXMvaW1hZ2VzL2J0bjcuanBnXCIsXG5cbiAgICBpbWcxX3BuZzogXCJyZXMvaW1hZ2VzL2ltZzEuanBnXCIsXG4gICAgaW1nNV9qcGc6IFwicmVzL2ltYWdlcy9pbWc1LmpwZ1wiLFxuICAgIGltZzZfanBnOiBcInJlcy9pbWFnZXMvaW1nNi5qcGdcIixcbiAgICB0eHRfYmcxX2pwZzogXCJyZXMvaW1hZ2VzL3R4dF9iZzEuanBnXCIsXG5cblxuICAgIE1haW5Ob2RlOiBcInJlcy9NYWluU2NlbmUuY3NiXCIsXG4gICAgVGFza05vZGU6IFwicmVzL1Rhc2tOb2RlLmNzYlwiLFxuICAgIFRyYWluTm9kZTogXCJyZXMvVHJhaW5Ob2RlLmNzYlwiXG5cbn07XG5cbnZhciBnX3Jlc291cmNlcyA9IFtdO1xuZm9yICh2YXIgaSBpbiByZXMpIHtcbiAgICBnX3Jlc291cmNlcy5wdXNoKHJlc1tpXSk7XG59XG5cbm1vZHVsZS5leHBvcnRzLnJlcyA9IHJlcztcbm1vZHVsZS5leHBvcnRzLmdfcmVzb3VjZXMgPSBnX3Jlc291cmNlczsiLCIvKipcclxuICogQ3JlYXRlZCBieSBBcnRodXIgb24gMjAxNC8xMi8yMC5cclxuICovXHJcbnZhciByZXMgPSByZXF1aXJlKCcuLi8uLi9yZXNvdXJjZS5qcycpLnJlcztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY2MuTGF5ZXIuZXh0ZW5kKHtcclxuICAgIF9yb290Tm9kZTogbnVsbCxcclxuXHJcbiAgICBjdG9yOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLl9zdXBlcigpO1xyXG4gICAgICAgIHRoaXMuX3Jvb3ROb2RlID0gY2NzLmNzTG9hZGVyLmNyZWF0ZU5vZGUocmVzLk1haW5Ob2RlKTtcclxuICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMuX3Jvb3ROb2RlKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHJvb3ROb2RlID0gdGhpcy5fcm9vdE5vZGU7XHJcbiAgICAgICAgdmFyIGJ0bl90cmFpbiA9IHJvb3ROb2RlLmdldENoaWxkQnlOYW1lKCdtYWluX3BhbmVsJykuZ2V0Q2hpbGRCeU5hbWUoJ2J0bl90cmFpbicpO1xyXG4gICAgICAgIGJ0bl90cmFpbi5hZGRDbGlja0V2ZW50TGlzdGVuZXIodGhpcy5idXR0b25UcmFpbkxpc3RlbmVyLmJpbmQodGhpcykpO1xyXG4gICAgfSxcclxuXHJcbiAgICBidXR0b25UcmFpbkxpc3RlbmVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAodGhpcy5vblRyYWluKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25UcmFpbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgQXJ0aHVyIG9uIDIwMTQvMTIvMjEuXHJcbiAqL1xyXG52YXIgcmVzID0gcmVxdWlyZSgnLi4vLi4vcmVzb3VyY2UuanMnKS5yZXM7XHJcblxyXG52YXIgdGFza3MgPSBbXCLnlJ/lkb1cIiwgXCLmlLvlh7tcIiwgXCLpmLLlvqFcIiwgXCLnoLTpmLJcIiwgXCLmmrTlh7tcIiwgXCLpn6fmgKdcIiwgXCLpl6rpgb9cIiwgXCLlkb3kuK1cIl07XHJcbnZhciBERUZBVUxUX0NPVU5UID0gMTAwO1xyXG5tb2R1bGUuZXhwb3J0cyA9IGNjLkxheWVyLmV4dGVuZCh7XHJcbiAgICBjdG9yOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLl9zdXBlcigpO1xyXG4gICAgICAgIHZhciB0cmFpbk5vZGUgPSBjY3MuY3NMb2FkZXIuY3JlYXRlTm9kZShyZXMuVHJhaW5Ob2RlKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmFkZENoaWxkKHRyYWluTm9kZSk7XHJcblxyXG4gICAgICAgIHZhciBzaXplID0gY2Mud2luU2l6ZTtcclxuICAgICAgICB2YXIgYmFzZVkgPSBzaXplLmhlaWdodCo4NC8xMDA7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YXNrcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgeSA9IGJhc2VZIC0gMTAwKihpKzEpO1xyXG4gICAgICAgICAgICB2YXIgdGFza05vZGUgPSBjY3MuY3NMb2FkZXIuY3JlYXRlTm9kZShyZXMuVGFza05vZGUpO1xyXG4gICAgICAgICAgICAvLyDkv67mlLnplJrngrnml6DmlYjvvIzpu5jorqTplJrngrnkuLooMCwwKVxyXG4gICAgICAgICAgICB0YXNrTm9kZS5hdHRyKHtcclxuICAgICAgICAgICAgICAgIHg6IDAsXHJcbiAgICAgICAgICAgICAgICB5OiB5XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB2YXIgdGFza19uYW1lID0gdGFza05vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3Rhc2tfbmFtZScpO1xyXG4gICAgICAgICAgICB0YXNrX25hbWUuc2V0U3RyaW5nKHRhc2tzW2ldKTtcclxuICAgICAgICAgICAgdGFza19uYW1lLmF0dHIoe1xyXG4gICAgICAgICAgICAgICAgYW5jaG9yWDogMCxcclxuICAgICAgICAgICAgICAgIGFuY2hvclk6IDAuNVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdmFyIGNvdW50X3ZhbHVlID0gdGFza05vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2NvdW50X3ZhbHVlJyk7XHJcbiAgICAgICAgICAgIGNvdW50X3ZhbHVlLnNldFN0cmluZyhERUZBVUxUX0NPVU5UICsgJ+asoScpO1xyXG4gICAgICAgICAgICBjb3VudF92YWx1ZS5hdHRyKHtcclxuICAgICAgICAgICAgICAgIGFuY2hvclg6IDAsXHJcbiAgICAgICAgICAgICAgICBhbmNob3JZOiAwLjVcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBidG5fc3RhcnRfdGFzayA9IHRhc2tOb2RlLmdldENoaWxkQnlOYW1lKCdidG5fc3RhcnRfdGFzaycpO1xyXG4gICAgICAgICAgICBidG5fc3RhcnRfdGFzay5hZGRDbGlja0V2ZW50TGlzdGVuZXIoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgYnRuX3N0YXJ0X3Rhc2suc2V0VGl0bGVUZXh0KCflvIDlp4vku7vliqEnKTtcclxuICAgICAgICAgICAgYnRuX3N0YXJ0X3Rhc2suc2V0VGl0bGVGb250U2l6ZSgxOCk7XHJcblxyXG4gICAgICAgICAgICB0cmFpbk5vZGUuYWRkQ2hpbGQodGFza05vZGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbn0pOyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFydGh1ciBvbiAyMDE0LzEyLzIxLlxyXG4gKi9cclxuXHJcbnZhciBwdXJlbXZjID0gcmVxdWlyZSgncHVyZW12YycpLnB1cmVtdmM7XHJcbnZhciBTY2VuZU1lZGlhdG9yID0gcmVxdWlyZSgnLi9zY2VuZU1lZGlhdG9yLmpzJyk7XHJcbnZhciBjb25zdGFudHMgPSByZXF1aXJlKCcuLi8uLi9hcHBDb25zdGFudHMuanMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcHVyZW12Yy5kZWZpbmUoXHJcbiAgICAvLyBDTEFTUyBJTkZPXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ3ZpZXcubWVkaWF0b3IuRGlyZWN0b3JNZWRpYXRvcicsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLk1lZGlhdG9yLFxyXG4gICAgICAgIGNvbnN0cnVjdG9yOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcHVyZW12Yy5NZWRpYXRvci5jYWxsKHRoaXMsIHRoaXMuY29uc3RydWN0b3IuTkFNRSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICAvKiogQG92ZXJyaWRlICovXHJcbiAgICAgICAgbGlzdE5vdGlmaWNhdGlvbkludGVyZXN0czogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICAgICAgY29uc3RhbnRzLk5PVElGSUNBVElPTi5TQ0VORV9DSEFOR0VEXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqIEBvdmVycmlkZSAqL1xyXG4gICAgICAgIGhhbmRsZU5vdGlmaWNhdGlvbjogZnVuY3Rpb24gKG5vdGlmaWNhdGlvbikge1xyXG4gICAgICAgICAgICBjYy5sb2coJ2hhbmRsZXIgbm90aWZpY2F0aW9uIG9uIGRpcmVjdG9yIG1lZGlhdG9yJylcclxuICAgICAgICAgICAgc3dpdGNoIChub3RpZmljYXRpb24uZ2V0TmFtZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIGNvbnN0YW50cy5OT1RJRklDQVRJT04uU0NFTkVfQ0hBTkdFRDpcclxuICAgICAgICAgICAgICAgICAgICAvL2NjLmxvZygnU0NFTkVfQ0hBTkdFRCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2NlbmVNZWRpYXRvciA9IHRoaXMuZmFjYWRlLnJldHJpZXZlTWVkaWF0b3IoU2NlbmVNZWRpYXRvci5OQU1FICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNjZW5lTWVkaWF0b3IgJiYgc2NlbmVNZWRpYXRvci5nZXRWaWV3Q29tcG9uZW50KCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IucnVuU2NlbmUobmV3IGNjLlRyYW5zaXRpb25GYWRlKDEuMiwgc2NlbmVNZWRpYXRvci5nZXRWaWV3Q29tcG9uZW50KCkpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqIEBvdmVycmlkZSAqL1xyXG4gICAgICAgIG9uUmVnaXN0ZXI6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqIEBvdmVycmlkZSAqL1xyXG4gICAgICAgIG9uUmVtb3ZlOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6ICdEaXJlY3Rvck1lZGlhdG9yJ1xyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBBcnRodXIgb24gMjAxNC8xMi8yMC5cclxuICovXHJcbnZhciBwdXJlbXZjID0gcmVxdWlyZSgncHVyZW12YycpLnB1cmVtdmM7XHJcbnZhciBjb25zdGFudHMgPSByZXF1aXJlKCcuLi8uLi9hcHBDb25zdGFudHMuanMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ2ZpZ2h0ZXIudmlldy5tZWRpYXRvci5Ib21lTWVkaWF0b3InLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5NZWRpYXRvclxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBpbnN0YW5jZSBtZW1iZXJzXHJcbiAgICB7XHJcbiAgICAgICAgLyoqIEBvdmVycmlkZSAqL1xyXG4gICAgICAgIGxpc3ROb3RpZmljYXRpb25JbnRlcmVzdHM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqIEBvdmVycmlkZSAqL1xyXG4gICAgICAgIGhhbmRsZU5vdGlmaWNhdGlvbjogZnVuY3Rpb24obm90ZSkge1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKiogQG92ZXJyaWRlICovXHJcbiAgICAgICAgb25SZWdpc3RlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKiBAb3ZlcnJpZGUgKi9cclxuICAgICAgICBvblJlbW92ZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBIb21lTGF5ZXIgPSByZXF1aXJlKCcuLy4uL2NvbXBvbmVudC9ob21lTGF5ZXIuanMnKTtcclxuICAgICAgICAgICAgc2VsZi52aWV3Q29tcG9uZW50ID0gbmV3IEhvbWVMYXllcigpO1xyXG4gICAgICAgICAgICBzZWxmLnZpZXdDb21wb25lbnQub25UcmFpbiA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNlbmROb3RpZmljYXRpb24oY29uc3RhbnRzLlNDRU5FX0FDVElPTiwge25hbWU6IGNvbnN0YW50cy5TQ0VORS5UUkFJTn0pO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBzZWxmLnZpZXdDb21wb25lbnQuaW5pdCgpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGdldFJlc291cmNlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBzdGF0aWMgbWVtYmVyc1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6ICdIb21lTWVkaWF0b3InXHJcbiAgICB9XHJcbikiLCIvKipcclxuICogQ3JlYXRlZCBieSBBcnRodXIgb24gMjAxNC8xMi8yMS5cclxuICovXHJcblxyXG52YXIgcHVyZW12YyA9IHJlcXVpcmUoJ3B1cmVtdmMnKS5wdXJlbXZjO1xyXG52YXIgY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vLi4vYXBwQ29uc3RhbnRzLmpzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHB1cmVtdmMuZGVmaW5lXHJcbihcclxuICAgIC8vIENMQVNTIElORk9cclxuICAgIHtcclxuICAgICAgICBuYW1lOiAnZmlnaHRlci52aWV3Lm1lZGlhdG9yLlNjZW5lTWVkaWF0b3InLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5NZWRpYXRvclxyXG4gICAgfSxcclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBfaW5pdGlhbGl6ZWQ6IGZhbHNlLFxyXG5cclxuICAgICAgICBsb2FkZXJJbWFnZTogXCJkYXRhOmltYWdlL2pwZWc7YmFzZTY0LC85ai80UUFZUlhocFpnQUFTVWtxQUFnQUFBQUFBQUFBQUFBQUFQL3NBQkZFZFdOcmVRQUJBQVFBQUFBbEFBRC80UU1wYUhSMGNEb3ZMMjV6TG1Ga2IySmxMbU52YlM5NFlYQXZNUzR3THdBOFAzaHdZV05yWlhRZ1ltVm5hVzQ5SXUrN3Z5SWdhV1E5SWxjMVRUQk5jRU5sYUdsSWVuSmxVM3BPVkdONmEyTTVaQ0kvUGlBOGVEcDRiWEJ0WlhSaElIaHRiRzV6T25nOUltRmtiMkpsT201ek9tMWxkR0V2SWlCNE9uaHRjSFJyUFNKQlpHOWlaU0JZVFZBZ1EyOXlaU0ExTGpBdFl6QTJNQ0EyTVM0eE16UTNOemNzSURJd01UQXZNREl2TVRJdE1UYzZNekk2TURBZ0lDQWdJQ0FnSUNJK0lEeHlaR1k2VWtSR0lIaHRiRzV6T25Ka1pqMGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNVGs1T1M4d01pOHlNaTF5WkdZdGMzbHVkR0Y0TFc1ekl5SStJRHh5WkdZNlJHVnpZM0pwY0hScGIyNGdjbVJtT21GaWIzVjBQU0lpSUhodGJHNXpPbmh0Y0UxTlBTSm9kSFJ3T2k4dmJuTXVZV1J2WW1VdVkyOXRMM2hoY0M4eExqQXZiVzB2SWlCNGJXeHVjenB6ZEZKbFpqMGlhSFIwY0RvdkwyNXpMbUZrYjJKbExtTnZiUzk0WVhBdk1TNHdMM05VZVhCbEwxSmxjMjkxY21ObFVtVm1JeUlnZUcxc2JuTTZlRzF3UFNKb2RIUndPaTh2Ym5NdVlXUnZZbVV1WTI5dEwzaGhjQzh4TGpBdklpQjRiWEJOVFRwRWIyTjFiV1Z1ZEVsRVBTSjRiWEF1Wkdsa09qTTRNREJFTURZMlFUVTFNakV4UlRGQlFUQXpRakV6TVVORk56TXhSa1F3SWlCNGJYQk5UVHBKYm5OMFlXNWpaVWxFUFNKNGJYQXVhV2xrT2pNNE1EQkVNRFkxUVRVMU1qRXhSVEZCUVRBelFqRXpNVU5GTnpNeFJrUXdJaUI0YlhBNlEzSmxZWFJ2Y2xSdmIydzlJa0ZrYjJKbElGQm9iM1J2YzJodmNDQkRVelVnVjJsdVpHOTNjeUkrSUR4NGJYQk5UVHBFWlhKcGRtVmtSbkp2YlNCemRGSmxaanBwYm5OMFlXNWpaVWxFUFNKNGJYQXVhV2xrT2tVMlJUazBPRU00T0VSQ05ERXhSVEU1TkVVeVJrRTNNME0zUWtFMU5UbEVJaUJ6ZEZKbFpqcGtiMk4xYldWdWRFbEVQU0o0YlhBdVpHbGtPa1UyUlRrME9FTTVPRVJDTkRFeFJURTVORVV5UmtFM00wTTNRa0UxTlRsRUlpOCtJRHd2Y21SbU9rUmxjMk55YVhCMGFXOXVQaUE4TDNKa1pqcFNSRVkrSUR3dmVEcDRiWEJ0WlhSaFBpQThQM2h3WVdOclpYUWdaVzVrUFNKeUlqOCsvKzRBRGtGa2IySmxBR1RBQUFBQUFmL2JBSVFBRFFrSkNRb0pEUW9LRFJNTUN3d1RGaEVORFJFV0doVVZGaFVWR2hrVUZoVVZGaFFaR1IwZklCOGRHU2NuS2lvbkp6azRPRGc1UUVCQVFFQkFRRUJBUUFFT0RBd09FQTRSRHc4UkZBNFJEaFFWRVJJU0VSVWZGUlVYRlJVZktCMFpHUmtaSFNnakppQWdJQ1lqTEN3b0tDd3NOemMxTnpkQVFFQkFRRUJBUUVCQS84QUFFUWdBeUFDZ0F3RWlBQUlSQVFNUkFmL0VBTEFBQUFFRkFRRUFBQUFBQUFBQUFBQUFBQVFBQWdNRkJnY0JBUUVBQXdFQkFBQUFBQUFBQUFBQUFBQUFBUU1FQWdVUUFBSUJBZ0lFQndvTEJnUUdBd0FBQUFFQ0F3QUVFUVVoTVJJR1FWRnhzVElURkdHQndkRWlRbEtTTXpXUm9lRmljcUt5STFOekZZSmpKRFFXQjlLalZDYnh3a05rSldYaWszUVJBQUlCQWdNRkJRY0RCUUVBQUFBQUFBQUJBaEVESVJJRU1VRlJjVEpod1ZJVUJaR2hzU0p5RXpPQjBVTGhZcElqVXhYLzJnQU1Bd0VBQWhFREVRQS9BTUpTcFVxQVZLbFh1RkFlVXE5d3BVQjVYdUZlNFY2b29EelpIRG94MENuR01pbnp3bDdaOE5hamFIZW9PM3ZtVEJaQnRwOVlVSXFURVY1Uk94SEtuV1JuYVU4VlJNaEZCVWpwVjdoU29TZVVxOXBVQjVTcjJsaFFIbEt2Y0s4b0JWN2hTRlNScnRhS0FaczA3WU5QTTFwRzJ4SklBdzFqU2VhbmRyeS84WDRtOFZDS2tXd2FXd2FtN1hsLzR2MVc4Vkx0bVgvaS9WYnhVb0trV3dha1NNNDA3dG1YL2kvVmJ4VW16R3dqUXNqZFk0MUlBUmllL1UwSWJaTzBrTnRDWG5PQ2tFQmVGdTRLSTNCczdETmIyN3lhK2pEeDNrSmVFbnBKSkVjUVZiV0RzazE3dTV1cmQ1OTF1Y1prV2h5bTJWbmQ5UmtDREVwRnhEUnBidzBidW51NW1scDJEZTJGTUxZWE9EMndCMnhiT2VyYVVjWUdKNzJtbFNVaXF6emR6TWQzWjNtaXhsdEEyeXpjSy9ObEhNMURReVJYY2UxSG9jZE5PRWZKWFo4OHk5Wm9qT3FoaUJzeklSaUhROFk0Y0s1VHZIdXpMbGpITk1xeE5vRGpMRnJhSEhualB4Y05DR1ZieEVVellOVHg1alpTeGhwVzZxVHpsd0orREN2TzJaZitMOVZ2RlNncXlIWU5MWU5UZHNzUHhmaWJ4VXUxNWY4QWkvVlBpcUNha093YTgyRFUvYTh2L0YrSnZGVERkV1BCTDhSOFZLQ3ZZUllWNVV6b01BeTZRZElJcUkwQjRLSnR4aVJRd291MTZRb0dVa250SDVUejBSYlpibUYyaGt0cmFTVkJvMmxVa1k4dER5ZTBmbFBQWFRzbFZVeWl5VlJzanFVT0E0eU1UOGRXMnJhbTJtNlVWVE5xOVM3RUl5VVZKeWRNVG4vNkRuUCtpbTlXbCtnNXovb3B2VnJwdGVFaFFXWTRBYVNUd0FWZjVXUGlaaC85UzUvemo3emx0emxtWVdrZldYTnZKREdUZ0djWURIaXJSN2k3bVNid1hQYXJzRk1yZ2I3dzZqS3cvd0NtbmM5STE0a0YzdnB2Q2xqYk15V01PSkw0YUVpQjhxVS9PYlVLN0hZV1ZybDFwRlpXaUNPQ0JRcUtPTGpQR1RyTlpacUtiVVhWSHEybk53VHVKUmsxVnBiZ1hOOHM3Ums1eW0wVVFRemhJRzJOQWpoeEhXYkkrZ0NCVmpCQkZid3h3UXFFaWlVSkdnMUJWR0FGZTdkVjI4V1lMWVpGbUYyVGgxVUQ3SkdqeW1HeW4xaUs1T3l6SUJHQjFIZ3JMWmhhbXp1bVFBR0p3U3FuU0NoMXEzR09Db2R4dDRjeHVyZGNwenVONGN5aGlXYUY1QmcwOXVkVW1uV3cxSC9qVjluRnVKN1F1bys4aDhwZVRoRkErMDQ3dmR1eU10azdmWXFUbDA3WUZkZlV1Zk1QelQ1cDcxVWR0bG1ZWGFHUzJ0M21RSEFzZ3hBTmRhZFlKb3BMZTRRUzI4NjdFc1o0UWZDTllyQ0ZiamREUG1na1l5V0Z4Z1ZmMDRpZkpmNlNjTmRSVVcxWEJiNkZVNVRqRjVFcFNTckd1L3M1bE4rZzV6L29wdlZwZm9PYy93Q2ltOVd0ZEhuYXR2T2JKWERXN3hMR2hCOG5yUGFZOS9IQ3IrdEVkUENWYVNlRG9ZTG5xRjYzbHpXNC9QRlNXM2VjeGJJODRWU3pXVXdVYVNkZzBEWFhLNW52QWlwbmQ2cWdLdlduUU83cHJpOVpVRW1tM1ZsMmoxa3I4cFJsRlJ5cXVCTlpqR3hRL1M1NlkxUzJmdTlPVnVlb24xMVN6YWhvb3UwNlFvUVVYYWRJVkNEMkZKSjdSK1U4OWRNeWR2OEF4ZG4rVEg5bXVaeWUwZmxQUFhRc3RsSzVUYmthMWdVamxDMXEwdlZMa2ViNnIrTzNUeDl4Y1kxbnQ4YzBOclpDeWlPRTExMDhOWWpHdjFqb283SnMxanpLeVNjWUxJdmt6TDZMRHdIWFZKa3NIOVNiNDlkS05xMHRqMWpBNnVyaU9DTCswMkZXWDdpVnRaWDEvQXphSFR5ZW9hdUtuMk1YOVc3OXplYmlaQ3VSNU1qU3JoZlh1RXR3VHJVZVpIK3lOZmRyUk5jeEk2SXpoWGxKRWFrNldJR0oyUnc0Q2hXbkNobmR0bFZCTE1kUUEwazFnYlhOTXp6RGZETHM2bWphUEtwcEpiV3dKMWJPd3d4dzQzT25IaDcxWVQzRHBmV1VKbUZsYjVqSEhEZGVYQkhJc3JSZWE1VFNxdnhxRzA0Y05ONjJ2ZXRvQ1M0dHJlNW1nbmtHRTlxKzNES09rdUkyV1g2TERRUlJIV0RoMVVDdHdqN1FSZzJ3ZGw4RGpndzFxZTdYdlcwQlEza2ZaN21TTGdVK1Q5RTZSVmJudVZybldWU1dxaitMdDhaYlJ1SEVkS1BrWVZjWjJNSlk1ZlNHeWVWYXI0NStya1dRSEFxY2NhbFBFNWttMWh0V0s1bks0V250NUZ1VUJVd09NRzRuR2tBL0JYVXJXNFM2dG9ybE9qTWdjZC94Vm43ckxvN3pLczB1RWpDTmVTdmR3b0JoZ3NaeFgxbDJqMzZrM0x1K3V5cHJkajVWczVBK2kvbEQ0OGEwYWFWSk9QaTdqQjZsYnpXb3pwakI0OHBmMU5EWE5ONHZmbDcrWjRCWFM2NXB2Rjc4dmZ6UEFLNzFYVEhtWi9TL3lUK2p2SjdMM2ZIeXR6MUUrdXBiTCtRajVXNTZqZlhXUm5zSVlLTHRla0tFRkdXdlNGUWd5ams5by9LZWV0M1l0aGxNUC81eDltc0pKN1IrVTg5Yml5Yi9BTVhFdjdnRDZ0YWRMMVQra3dlcFJyQzM5WmtMRE1iaXdNdlVIUlBHMGJqbEdnOG9yZS8yM3N4QmxkeGZNUEx1cE5oVDh5TC9BT1JOWmJkeko0ODRzY3l0eGdMcUpZNUxaajZRMnNWNUcxVnVkMW1qanlHMGlqME5FR1NaVG9LeWhqdHF3NHdhenR1aVhBM3FLVGJTeGx0ZkdoYlpsRTk1WnRacXhWYmdpT1pockVSOXBoM1N2azkrcEpJTFo0WTRER0JGQ1VNS2pSc0dQb2JQRmhVZlcwTkptbGpFMnhKY0lyY0kydkZVRWxuMWxSWGQ2bHJhelhUOUdDTnBEK3lOcW9JN21PVmR1Tnc2bnpsT0lvUE9VYTZ5eWUxWFhjYk1SNUdkUTN4WTBCU2JqMzEvRmNUUVppckorcTQzMXE3YW5iSENUWjcyQnc3bGJQcktCTWNCV05OZ2JNQkJoK2JzakJkbmkwVkoxbEFSWnM2eVdpdXB4Q3VNRHk2S3BTMkl3T282RFRyM01yZTNlNXRaWlZVTTRaQmpxT09Kb1dPNGprWGFqY09PTUhHZ0RJU3ZXSXJkQWtLUjgwK1R6Vmw5MDhiUFBMM0x6eE91SGRpZnhWZmlUQWc5MnFJL3crLzhnR2dTeU4vbVI3WFBWbHAwbEYvM0wzbWJWS3R1NUhqYmsvOEFIRTJGYzAzaTkrWHY1bmdGZEtOYzEzaTkrWHY1bmdGYU5WMHg1bm4rbC9rbjlIZUVXWHUrUGxibnFKOWRTMlh1OU9WdWVvbjExa1o3Q0dDakxYcENneFJscjBoVUlQWVVjbnRINVR6MXM4dmIrQnQxL2RxUGlyR1NlMGZsUFBXdXNHL2c0UHkxNXEwNlhxbHlNV3ZWWVErcnVJOXhKT3F6TzloT3RvL3NQOHRiR09GSXJtV2VNN0l1TURNbkFYWFFKT1VqUWVPc0prMG5ZOTZpcDBDWXVucmphSHgxdCtzclBKVWJYQm0yTHJGUGlrd1RPYitUK1ZoYlp4R01yRFhwODN4MVFTeTJ0dWNKcFVqUEVUcCtDbjUvZnRhUnZLdnRwM0t4NDhIRzNlckhNek94WmlXWnRMTWRKTlFTYmJMNzFWazZ5eW5WaU9rcW5FRWZPV3RQYlhpM0VRa0dnNm1YaU5ja2plU0p4Skd4UjEwcXcwR3R4dXhtdmJJbUQ0Q1pNRmxBNGZSZnYwQnFlc3FxelRNWk5NRURiSUh0SEgyUWVDaVpKU3FNUWRPR2l1ZTUzbXozY3pRd3NSYkljTkhua2VjM2M0cUFNdXJpejY4Z1RJVG94d09PbmxwME1qeE1KWVc3NDFHczNSVmxkdGJ5Z0UvZE1jSFgvbW9EYXhUaVdOWkI1M0IzYXJiOC93Qys0U09GNHNmL0FLeFU5a2NCc2ZPR0hmb1VIdEcvUmJ6WTVEaWU1SEhoWGR2YXZxaVo5UThKZGxxNC9nYkt1YTd4ZS9MMzh6d0N1aHBmMlVrL1pvNTBrbXdKS0lkb2dEancxVnp6ZUwzNWUvbWVBVnAxTFRncVk0bm4rbVJhdXpxbXF3cmp6Q0xMM2ZIeXR6MUUrdXBMTCtRajVXNTZqZlhXUm5yb1lLTHRla0tFRkYydlNGUWc5aFNTZTBmbFBQV29zbS9oSWZvTHpWbDVQYVB5bm5yUldiL3cwWDBGNXEwNlhxbHlNMnNWWXg1Z21iRnJlL3Q3MU5ZMlQrMGg4VmJTTzVTV05KVU9LU0FNcDdqREdzcG1NUGFMUmxYUzZlV3ZlMS9GUk83V1lkYlptMVkvZVcvUjdxSHhIUlhHb2psbTN1bGlkNmFWYmFXK09BTHZnQ0xxMkhtOVd4SEtXcWpoajZ4c0sxZThkbTE1bDRuaUcxTFprc3dHc3h0clBlT21zdmF5QkpBMVZJdGxXanB0THVUZFBNbzdMdGpSRHE5bmFLNCtXRjlJclVXN0JhSE9sakdxVkhCN3cyaHpWb1p0ODdkOHZhTllTTGwwMkNjUnNERWJKYmo3MVV1N1VCa3ZKNy9EN3EyUW9EeHlTYUFPOE1UWGR4UlZNcFJwNVhaT1dkRi9tczdSNVhkeUtmS1dKc08vNVBockc1WGxOeG1FeXdXNmJUblR4QUFjSk5iR1NNWGtNMXBqZ2JpTm8xUHppUEorT3M3dTdtLzZSZU0wMFpPZ3hTcHFZWUhUM3dSWE1LTjRsbDl6VUc0YlFmTnNodThzWlZ1RUEyaGlyQTRxZS9WT3d3clZiemJ3dzVtSTQ0VUtSUllrYldHMFMzSldjdGJkN3U1V0ZmT09MSGlVZEpxbWFpcGZMc0lzT2JoV2UwMDFsTWtNVnZKTmpoZ2hJQUxNY0J4Q3M3ZnhYUW1rdXB4MWJYRHN3R1BsYVRpZFZhRXlLTlhrb280ZUJWK1NxN0w3VnM5emNCZ2V5UTRHUS9NQjFjcm1vaW0yb3JlenFjb3dUdVNlRVk0OGpRN29aWDJQTHpkeUxoTmQ2UmpyRVk2STcrdXNwdkg3OHZmelBBSzZVQUFBRkdBR2dBY0FybXU4WHZ5OS9NOEFyVGZpbzI0Ulc1bm5hRzY3dW91M0gvS1B1cVQyWDhoSHl0ejFHK3VwTEwzZW5LM1BVYjY2eXM5UkRCUmRyMGhRZ291MDZRcUVHVWtudEg1VHoxZTIzOHZGOUJlYXFLVDJqOHA1NnZiYitYaStndk5XalRkVXVSbjFYVEhtVGg4S3JKVEpsdDh0MUNQSVk0NGNHbnBKVmpUSllrbWphTjlJYjR1N1Y5MjNualRldGhSYXVaSlYzUGFXMXJmTElpWEVEWWc2UjRWWWM5Q1hXN3RoZk9aYktkYkdadExXOHVQVlkvdTNHcmtOVWtNOXpsY3hVamJoZldPQTkwY1JxNGd2NExoZHFOK1ZUb05ZV21uUm05Tk5WV05UeUhjNlZXQnY4d3Q0WWVIcW02eHlQbXJvcTFaN1dHRkxTeFRxN1dMU3VQU2RqcmtmdW1xNXlIWERVZUE5Mm9PMlNLcFZ1bU5BYW9KTE1YSDNteXAwcnBKNHVLaGMzdGJETTVCTXJpMXpBajc5ajdLVGlZOFRjZEJwY3NpdGgwMjg2bytzUENhZ0VYOVB6ZzR6WFVDcDZRWXNlOG9vdUNHM3RrNm0xQll2MDVXNlQrSWR5b2x4YkhEQUFhMk9nRGxOQ3ozcnlOMld4QmQ1UEpNZzF0ODFlSWQydWtxbkxsVEJiZmN1WSs5dUpMaVJjdnRQdkhkc0hLK2NmUkhjSERXc3lhd2p5eTBXQmNESTNsVFA2VGVJY0ZWK1M1T21YeDliSmcxMDQ4bzhDajBWOEpxMkRWdTA5bkw4MHVwN094SGkrb2FsM1A4QVhCL0lzWlM4VC9ZT1Y2NXp2Q2NjN3ZmelBBSzNpdldDejQ0NXplSDk1NEJYT3I2STh5ZlNmeXoranZDTFAzZkh5dHoxRyt1cExQM2ZIeXR6MUUrdXNiUGFRMFVYYWRJVUlLTHRla0toQjdDa2s5by9LZWVyMjIvbDQvb0x6VlJTZTBmbFBQVjdiL3k4WDBGNXEwYWJxbHlNK3E2WTh5UXNCVERNb3IxbzhhaWFFMXBibHVNcVMzc2JMTEhJaFNSUXluZ3F1a2hhSjl1QmpvK0g1YU9hM2FvMnQzNHFvdVJsTGFqVGFsR1A4djBJWTh5bFhRK1BLUEZVL2JZWE9MUGdlNkNLaWEwTGF4VE94SHUxUTdjdUJkOXlQRUo3VGJqWEtPOENhamJNSUY2Q05JZU52SkhqcUlXSjd0U3BZa2FscVZibHdJZHlHK1JHWHVyMGhYWUpGeGFsK0RocTV5M3Nsa3YzWTJwRDBwVHIrUVVDbHBKUlVkbzlYVzRPTHJUSHRNMTZjWkxMV2tlQzd5NGp2bE5FcGNSdHcxVXgyN0NpNDQ4TlpyVEZ5M25uM0lRV3hsZ0dyRFozcHphNy9NOEFyWm8rQXJGNTE3MXV2cCtDcWRWMFI1bC9wc1VyczJ2QjNoZGw3dlRsYm5xSjlkUzJYdStQbGJucUo5ZFkyZXNob29xMTZRb1FVWGE5SVZDRDJGTEo3UnVVODlXTnRtVVNRcWtnWU1ndzBhY2NLcnBQYVB5bm5yWldHNFZpK1ZXbVk1dG5NV1hHK1hySVluQTByaGowbWRjVGdkTmR3bktEcWptZHVNMVNSUi9xbHI4LzRLWDZwYThUL0JWekR1TFpYdWRSWmJsbWJ4WGNQVU5QYzNLcUNJd3JiT3pnckhFbkhqb3lEKzNlU1hraHQ3RGVLRzR1bURHT0pWVWtsZm91VGhYZm1iblo3Q3Z5MXZ0OXBtdjFXMStkOEZMOVZ0ZUp2Z3E1eXJjT0dmTG16SE44MGl5eUVUUGJwdEFFRm8yWkc4cG1VYTFPRk5uM0t5Nlcvc2JES001aHY1YngyV1RaQSs3UkYyeTUyV09QSlR6RSt6MkR5MXZ0OXBUL0FLcGFjVGVyUy9VN1RpYjFhMDQvdDdrRFhQWTAzamhOMFc2c1E3SzdXM3EyZG5yTWNjYUR5LzhBdDgwa3VaZnFXWXhXTnRsY3ZVUFBoaUdZaFdEZVV5N0l3WVU4eFBzOWc4dGI3ZmFVbjZwYWNUZXJUeG05b09CdlZxM3Y5ejkyN2F5bnVJZDQ0TGlXS05uamhBWEYyVVloUmc1MTZxcHNyeWpMcjIxNjY1ekZMU1RhSzlVMkdPQTg3U3dxWTM3a25SVStCek96YWdzMHMxT3lyK0JLTTZzeHdQNnRTRFBMTWVuNnZ5MHJ2ZG0zU3hsdTdLL1M3V0REckZVRFVUeGduVFU4MjZlWFc3S2x4bXFRdXdEQlhVS2NEKzFYZWUvd1h1S1g1WERHV0xhcFNWY095aEVNL3NlSi9WK1duamVHeDRwUFYrV2ttNmtLWmxGYXkzSmx0N2lGcFlaWThBU1ZLNkRqdEREQTBmOEEwVGwzNDAvMWY4TmR4OHhKVldYQjBLYmt0RkZwTnpkVlhBQy9xT3dBMENRbmkyZmxyTzNWd2JtNWxuSTJUS3hiRGlyWC93QkU1ZCtOY2ZWL3dWUjd4WlBhNVU5dXR2SThuV2htYmJ3MFlFQVlZQVZ4ZmhmeTVybEtSNEZ1bHU2WDdtVzFtelQ4UzRZaXMvNUNQbGJucUo5ZFNXZnU5T1Z1ZW9uMTFtWnZRMmk3WHBDaEtLdGVrS2hCbE5KN1IrVTg5YkRmR1RiM2EzWlgwTGNqNmtkWStUMmo4cDU2MDI4OG0xa1dRcjZNSit5bFNBcisyY25WNXJlbmpzM0gxbG9YKzNqOVh2YmJ0eExOOWxxVzRVblY1amRuanRYSHhpaHR5Wk5qZVNCdTVKOWsxQkplN3h5N1c1Q0ovd0N6dUQvbVRWVGYyK2ZxOTdMSnVMclBzTlJ1ZVM3VzZhSi8zOHgrdkxWWHVZK3h2SGFOeGJmMkdvQ2V6ZjhBMzZqL0FQc1NmOHcxc0xucWN6VGVmSmx1WW9MbTV1bzVGNjFzQnNoSXRQMWNORlllMWY4QTNpci9BUGZFL3dDWlVlOWJCOTRyNWp3dVBzclFGaG1HNGwvWjJNMTdIZFc5MHR1dTNJa1RIYUNqV2RJdzBWVlpka3M5L0MwNnlKRkVwMmRwK0UxYmJxeWJHVFo4dnBRRDdMMVhSdjhBN2JsVDk2T2RhN3RwTnV1TkUzN0NxOUtTaXNqeXVVb3hyU3RLbGxIYkxsV1RYc01zOGNodVN1d0VQRHF3b0xlNXkrWVJFL2dMem1xUmVrdktLdGQ0MzI3eU0vdWxIeG1ySEpTdHlTV1ZSeXJqeEtJMlhDL0NUbG5sUFBLVHBUZEZiUDBMMWJncmY1THAwRzNkUGhRSHdWMFMxbHpCc25zM3NFU1I4Q3JoOVdBSkdqU09LdVUzRSt6ZFpRM29KaDhJQXJkWlhGRG1PVHBIYTNpMitZckkyS3RLeTRyaWNCc0J1SEhnRlhTbzQ0MCtXYTJxcXhqdk05dU1veStXdnpXcExDV1dXRTI4SHhMNmU0M29qZ2tlU0NCWTFSaTVCR0lVRFQ1MWNsM3ZtMjc2QkJxU0VINFdieFYwdGxreVhKY3hUTWIrT1c2dVk5bUdIckN6RFF3d0FiVHAydUt1VFo5TjF1WXNmUlJSOFdQaHJtNDE5bVNTalJ5aXF4Vks3eTIzQi9mdHVUbTJvU2RKeXpOVnczQkZuN3ZUbGJucUY5ZFMyZnU5T1Z1ZW9uMTFsWnVRMmlMZHNHRkQwNUgyZE5RR1YwbnRHNVR6MWRXbTlOMWIya1ZxOEVWd3NJMlVhUWFRT0tobWl0WkdMT21rNjhEaFNGdlkrZ2ZXTlNBZzd6M1F2bzd5S0NLSW9oaWFOUjVMS3h4OHFweHZqY3FTMFZwYnh2d09BY1JRUFo3RDBHOVkwdXoySG9IMWpVQ3BMWTd6WGxwYm0zZUtPNVF1empyQnFaamkzeDE3UHZOY3lUMjg4VnZEQkpiTVdVb3ZTMmhzbFc3bUZROW5zUFFQckdsMmV3OUErc2FDb2QvV054dGJZc3JmYjE3V0J4eDVkZEQyMjgxeEM4OGtsdkRjU1hFbld1enJxT0dHQzl6UlVQWjdEMEc5WTB1eldIb0gxalFWQ0xyZXE2bnRaYmFPM2l0MW1HeTdSalRzMVgybVl5MjBaaUNxOFpPT0RjZEVkbXNQUWIxalM3UFllZ2ZXTmRKdUxxblFpU1VsUnFwRkxtcnl4dEgxTWE3UXcyZ05OUE9kU3Qwb0kyN3AwMDdzOWg2QjlZMHV6MkhvSDFqWFgzWitJNCsxYjhJSmRYODl4TEhLUUZNWFFVYWhweG9pUE41UCtvbmZVK0EwL3M5aDZEZXNhWFo3RDBENnhwRzdPTGJVdHUwU3RXNUpKeDJiQnNtYnRpU2lFaytjeG9DV1dTYVZwWk9rMnZEVm8wVllkbnNQUWIxalNOdlpjQ0gxalNkMmMrcDFYQW1GcUVPbU9QRWZhSCtCUWQxdWVvMjExSXpyZ0ZVWUtOQUFxSTFXenRDcFVxVkNSVXFWS2dGU3BVcUFWS2xTb0JVcVZLZ0ZTcFVxQVZLbFNvQlVxVktnRlNwVXFBVktsU29ELzlrPVwiLFxyXG5cclxuICAgICAgICBsb2FkZXJUZXh0OiBcIuato+WcqOi9veWFpS4uLiBcIixcclxuXHJcbiAgICAgICAgbG9hZGVyRm9udDogXCJBcmlhbFwiLFxyXG5cclxuICAgICAgICAvKiogQG92ZXJyaWRlICovXHJcbiAgICAgICAgbGlzdE5vdGlmaWNhdGlvbkludGVyZXN0czogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICAgICAgY29uc3RhbnRzLlNDRU5FX0FDVElPTlxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKiBAb3ZlcnJpZGUgKi9cclxuICAgICAgICBoYW5kbGVOb3RpZmljYXRpb246IGZ1bmN0aW9uIChub3RpZmljYXRpb24pIHtcclxuICAgICAgICAgICAgc3dpdGNoIChub3RpZmljYXRpb24uZ2V0TmFtZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIGNvbnN0YW50cy5TQ0VORV9BQ1RJT046XHJcbiAgICAgICAgICAgICAgICAgICAgY2MubG9nKG5vdGlmaWNhdGlvbi5nZXRCb2R5KCkubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZpZXdNZWRpYXRvciA9IHRoaXMuZmFjYWRlLnJldHJpZXZlTWVkaWF0b3Iobm90aWZpY2F0aW9uLmdldEJvZHkoKS5uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmlld01lZGlhdG9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0Vmlldyh2aWV3TWVkaWF0b3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2luaXRpYWxpemVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2luaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKiBAb3ZlcnJpZGUgKi9cclxuICAgICAgICBvblJlZ2lzdGVyOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKiBAb3ZlcnJpZGUgKi9cclxuICAgICAgICBvblJlbW92ZTogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzZXRWaWV3OiBmdW5jdGlvbiAodmlld01lZGlhdG9yKSB7XHJcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHNlbGYudmlld0NvbXBvbmVudCA9IG5ldyBjYy5TY2VuZSgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHJlcyA9IHZpZXdNZWRpYXRvci5nZXRSZXNvdXJjZSgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGhhbmRsZVNjZW5lQ2hhbmdlZCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2aWV3TWVkaWF0b3IuaW5pdCgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoaWxkID0gdmlld01lZGlhdG9yLmdldFZpZXdDb21wb25lbnQoKTtcclxuICAgICAgICAgICAgICAgIGlmIChjaGlsZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYudmlld0NvbXBvbmVudC5hZGRDaGlsZChjaGlsZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZi5zZW5kTm90aWZpY2F0aW9uKGNvbnN0YW50cy5OT1RJRklDQVRJT04uU0NFTkVfQ0hBTkdFRCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChyZXMpIHtcclxuICAgICAgICAgICAgICAgIGNjLkxvYWRlclNjZW5lLnByZWxvYWQocmVzLCBoYW5kbGVTY2VuZUNoYW5nZWQsIHRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlU2NlbmVDaGFuZ2VkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy8gU1RBVElDIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICBOQU1FOiAnU2NlbmVNZWRpYXRvcicsXHJcbiAgICAgICAgU0NFTkVfQ0hBTkdFX1ZJRVc6ICdTY2VuZUNoYW5nZVZpZXcnXHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFydGh1ciBvbiAyMDE0LzEyLzIwLlxyXG4gKi9cclxudmFyIHB1cmVtdmMgPSByZXF1aXJlKCdwdXJlbXZjJykucHVyZW12YztcclxudmFyIGNvbnN0YW50cyA9IHJlcXVpcmUoJy4uLy4uL2FwcENvbnN0YW50cy5qcycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBwdXJlbXZjLmRlZmluZShcclxuICAgIHtcclxuICAgICAgICBuYW1lOiAnZmlnaHRlci52aWV3Lm1lZGlhdG9yLlRyYWluTWVkaWF0b3InLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5NZWRpYXRvclxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBpbnN0YW5jZSBtZW1iZXJzXHJcbiAgICB7XHJcbiAgICAgICAgLyoqIEBvdmVycmlkZSAqL1xyXG4gICAgICAgIGxpc3ROb3RpZmljYXRpb25JbnRlcmVzdHM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqIEBvdmVycmlkZSAqL1xyXG4gICAgICAgIGhhbmRsZU5vdGlmaWNhdGlvbjogZnVuY3Rpb24obm90ZSkge1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKiogQG92ZXJyaWRlICovXHJcbiAgICAgICAgb25SZWdpc3RlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKiBAb3ZlcnJpZGUgKi9cclxuICAgICAgICBvblJlbW92ZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBUcmFpbkxheWVyID0gcmVxdWlyZSgnLi8uLi9jb21wb25lbnQvdHJhaW5MYXllci5qcycpO1xyXG4gICAgICAgICAgICBzZWxmLnZpZXdDb21wb25lbnQgPSBuZXcgVHJhaW5MYXllcigpO1xyXG5cclxuICAgICAgICAgICAgc2VsZi52aWV3Q29tcG9uZW50LmluaXQoKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBnZXRSZXNvdXJjZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHN0YXRpYyBtZW1iZXJzXHJcbiAgICB7XHJcbiAgICAgICAgTkFNRTogJ1RyYWluTWVkaWF0b3InXHJcbiAgICB9XHJcbikiXX0=
