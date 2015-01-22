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
        cc.view.setDesignResolutionSize(640, 1136, cc.ResolutionPolicy.SHOW_ALL);
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
        return this._timeString(time);
    },

    totalTime: function() {
        return this.get('totalCount')*this.get('timePerCount');
    },

    totalTimeStr: function() {
        return this._timeString(this.totalTime());
    },

    progressPercent: function() {
        return parseInt((this.totalTime() - this.timeLeft())/this.totalTime()*100);
    },

    totalObtain: function() {
        return this.get('obtainPerCount') * this.get('totalCount');
    },

    _timeString: function(ms) {
        var _str = '';
        var s = ms/1000;

        var timeMap = {
            day: 60 * 60 * 24,
            hour: 60 * 60,
            minute: 60
        };

        var d = parseInt(s / timeMap.day);
        if ( d > 0) {
            _str += ':' + d;
            s = s%timeMap.day;
        }

        var hour = parseInt(s / timeMap.hour);
        if (hour > 0) {
            _str += ':' + hour;
            s = s%timeMap.hour;
        }

        var minute = parseInt(s / timeMap.minute);
        if (minute > 0) {
            _str += ':' + minute;
            s = s%timeMap.minute;
        }

        _str += ':' + parseInt(s);
        return _str.slice(1);
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
    black_png: "res/images/brack.png",
    gray_png: "res/images/gray.png",
    blue_png: "res/images/blue.png",
    blue_a_png: "res/images/blue_a.png",
    blue_d_png: "res/images/blue_d.png",
    love_lv_bg_png: "res/images/love_lv_bg.png",


    MainNode: "res/MainScene.csb",
    TaskNode: "res/TaskNode.csb",
    TrainNode: "res/TrainNode.csb",
    LoveLayer: "res/LoveLayer.csb",
    LoveItem: "res/LoveItem.csb",
    LoveConfirmNode: "res/LoveConfirmNode.csb",
    ConfirmNode: "res/ConfirmNode.csb",
    FightNode: "res/FightNode.csb",
    HomeNode: "res/HomeNode.csb",
    titleNode: "res/titleNode.csb"
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
var res = require('../../../resource.js').res;

var LoveItemController = module.exports =  ccs.ComController.extend({
    ctor: function() {
        this._super();
        this._name = "LoveItemController";
        this._lv = 1;
        this._position = null;
    },

    init: function(options, player) {
        if (!options || _.isEmpty(options)) {
            options = LoveItemController.DEFAULT_OPTIONS;
        }

        this._options = options;
        this._loveLv = player.get('loveLv');
        this._loveFreeCount = player.get('dailyCount').freeLove;
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

        this._lv_bg = this.getOwner().getChildByName('lv_bg');
        var txt_lv = this._txt_lv = this.getOwner().getChildByName('txt_lv');
        txt_lv.attr({anchorX: 0.5, anchorY: 0.5});
        txt_lv.setString(this._options.lv + '级');

        var btn_love = this._btn_love = this.getOwner().getChildByName('btn_love');
        btn_love.setTitleText('献吻');
        btn_love.addClickEventListener(this.loveListener.bind(this));

        var desc_bg = this.getOwner().getChildByName('desc_bg');
        desc_bg.attr({anchorX: 0.5, anchorY: 0.5});

        if (this._loveLv == this._options.lv) {
            this._lv_bg.setTexture(res.love_lv_bg_png);
        } else {
            btn_love.enabled = false;
            btn_love.bright = false;
        }
    },

    loveListener: function() {
        this.getOwner().parent.parent.onLoveListener();
    }
});

LoveItemController.create = function(player, options) {
    var con = new LoveItemController();
    con.init(player, options);
    return con;
}

LoveItemController.DEFAULT_OPTIONS = {
    lv: 1,
    value: 1,
    count: 10,
    countNeed: 99,
    position: cc.p(0, 0)
};
},{"../../../resource.js":"F:\\cocos\\fighter\\src\\resource.js","underscore":"F:\\cocos\\fighter\\node_modules\\underscore\\underscore.js"}],"F:\\cocos\\fighter\\src\\view\\component\\controller\\trainItem.js":[function(require,module,exports){
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
        this._count.setString(this.DEFAULT_COUNT+'次');
        this._count.attr({anchorX: 0, anchorY: 0.5});

        this._task_name = this.getOwner().getChildByName('task_name');
        this._task_name.attr({anchorX: 0, anchorY: 0.5});
        this._task_name.setString(this._task.get('name') + ': 每次+' + this._task.get('obtainPerCount'));

        this._progress_bar = this.getOwner().getChildByName('progress_bar');
        this._progress_bar.attr({anchorX: 0, anchorY: 0.5});

        var txt_task_desc = this._txt_task_desc = this.getOwner().getChildByName('txt_task_desc');
        var txt_time = this._txt_time = this.getOwner().getChildByName('txt_time');
        txt_task_desc.attr({anchorX: 0, anchorY: 0.5});
        txt_time.attr({anchorX: 1, anchorY: 0.5});
        this.updateProgress();

        this.setTaskDesc();
        this.scheduleUpdate();
    },

    scheduleUpdate: function() {
        if (this._task.isStarted()) {
            cc.director
                .getScheduler()
                .scheduleCallbackForTarget(this, this.updateProgress, 1, cc.REPEAT_FOREVER);
        }
    },

    updateProgress: function() {
        var percent = this._task.progressPercent();
        this._progress_bar.scaleX = 586/100/40*percent;
        this._updateTime();

        if (this._task.timeLeft() <= 0) {
            cc.director
                .getScheduler()
                .unscheduleCallbackForTarget(this, this.updateProgress);
        }
    },

    startListener: function() {
        this._task.start(this.getCount());
        this.setTaskDesc();
        this.scheduleUpdate();
        //this.getOwner().parent.parent.onStartTask(this._task);
    },

    setTaskButtonTitle: function() {
        if (!this._task.isFinished()) {
            this._btn_start.setTitleText('进行中...');
            this._btn_start.enabled = false;
            this._btn_start.bright = false;
            this._btn_add_count.enabled = false;
            this._btn_add_count.bright = false;
        } else {
            this._btn_start.setTitleText('开始任务');
            this._btn_start.enabled = true;
            this._btn_start.bright = true;
            this._btn_add_count.enabled = true;
            this._btn_add_count.bright = true;
            this._progress_bar.scaleX = 0;
        }
    },

    _updateTime: function () {
        this._txt_time.string = this._task.timeLeftStr();
    },

    setTaskDesc: function() {
        if (this._task.isStarted() && !this._task.isFinished()) {
            this._txt_task_desc.setString(cc.formatStr(
                '任务进行中，奖励 +%s',
                this._task.totalObtain()
            ));
            this._updateTime();
        } else {
            this._txt_task_desc.setString('执行任务可以增加相应的属性');
            this._txt_time.string = '';
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
        this.DEFAULT_COUNT += 1;
        this._count.setString(this.DEFAULT_COUNT+'次');
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

        var rootNode = this._rootNode = new cc.LayerColor(cc.color(51, 51, 51, 255));
        this.addChild(rootNode);

        this.addTitle();
        this.loadCities();
        this.initConsole();

        return true;
    },

    initConsole: function() {
        var console_bg = new ccui.ImageView();
        console_bg.loadTexture(res.gray_png);
        console_bg.setScale9Enabled(true);
        console_bg.attr({
            width: 580,
            height: 700 + (cc.winSize.height - 1136),
            x: cc.winSize.width/2,
            y: cc.winSize.height - 210,
            anchorX: 0.5,
            anchorY: 1
        });
        this.addChild(console_bg);
    },

    addTitle: function() {
        var titleNode = this._titleNode = ccs.csLoader.createNode(res.titleNode);
        titleNode.attr({
            x: 0,
            y: cc.winSize.height - 80
        });
        var txt_title = titleNode.getChildByName('txt_title');
        txt_title.string = '雄霸天下';
        var btn_back = titleNode.getChildByName('btn_back');
        btn_back.addClickEventListener(this.onBackListener.bind(this));
        this._rootNode.addChild(titleNode, 2);

        var province_bg = new ccui.ImageView();
        province_bg.loadTexture(res.blue_png);
        province_bg.setScale9Enabled(true);
        province_bg.attr({
            width: 180,
            height: 120,
            x: cc.winSize.width/2,
            y: 40,
            anchorX: 0.5,
            anchorY: 0
        });
        this._rootNode.addChild(province_bg);

        var txt_province = this._txt_province = new cc.LabelTTF('无名氏', null, 54);
        txt_province.attr({
            x: province_bg.width/2,
            y: province_bg.height/2,
            anchorX: 0.5,
            anchorY: 0.5
        });
        province_bg.addChild(txt_province);
    },

    loadCities: function(data) {
        var scrollView = new ccui.ScrollView();
        scrollView.setDirection(ccui.ScrollView.DIR_HORIZONTAL);
        scrollView.setTouchEnabled(true);
        scrollView.setContentSize(cc.size(580, 80));
        scrollView.setInertiaScrollEnabled(true);
        scrollView.x = 30;
        scrollView.y = cc.winSize.height - 190;
        var scrollViewRect = scrollView.getContentSize();

        var imgView = new ccui.ImageView();
        imgView.loadTexture(res.gray_png);
        imgView.setScale9Enabled(true);
        imgView.attr({width: 580, height: 80, anchorX: 0, anchorY: 0});
        imgView.x = scrollView.x;
        imgView.y = scrollView.y;
        this.addChild(imgView);

        var city, i, cities = data || stateData.citys;;
        for(i = 0; i < cities.length; i++) {
            city = cities[i];

            var btn = new ccui.Button();
            btn.loadTextures(res.blue_png, res.blue_a_png, res.blue_d_png);
            btn.x = (i+1)*20 + (i*80);
            btn.y = scrollViewRect.height / 2;
            btn.anchorX = 0;
            btn.anchorY = 0.5;
            btn.titleText = city.name;
            btn.titleColor = cc.color(255, 255, 255, 255);
            btn.titleFontSize = 24;
            btn.setScale9Enabled(true);
            btn.width = 80;
            btn.height = 40;

            btn.addClickEventListener(function () {
                cc.log('--btn click--');
            });

            scrollView.addChild(btn);
            var scrollWidth = 100 * (i+1) + 20;
            if (scrollWidth < scrollView.width) {
                scrollWidth = scrollView.width;
            }
            scrollView.setInnerContainerSize(cc.size(scrollWidth, 80));
        }

        this.addChild(scrollView);

        this._txt_province.string = stateData.province;
    },

    init: function(items) {
        return;

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
//            menu.addChild(this._createItem(city.name, i, height/2));
            var btn = new ccui.Button(res.btn1_jpg, res.btn3_png, res.btn3_png);
            btn.x = this._sv_city_list.x;
            btn.y = this._sv_city_list.y;
            btn.attr({x: 0, y: 0});
            this.addChild(btn, 4);
        }
//        this._sv_city_list.addChild(menu);

        var abtn = new ccui.Button(res.black_png, res.black_png, res.gray_png);
        abtn.titleText = '你好';
        abtn.x = this._sv_city_list.x;
        abtn.y = this._sv_city_list.y;
        abtn.titleColor = cc.color(0, 0, 0);
        this._sv_city_list.addChild(abtn);
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
        this._rootNode = ccs.csLoader.createNode(res.HomeNode);
        this.addChild(this._rootNode);
        return true;
    },

    init: function(player) {
        this._player = player;
        this.update(player);

        var rootNode = this._rootNode;
        var btn_train = rootNode.getChildByName('btn_train');
        btn_train.titleText = '演武场';
        btn_train.addClickEventListener(this.buttonTrainListener.bind(this));

        var btn_love = rootNode.getChildByName('btn_love');
        btn_love.titleText = '虞姬之爱';
        btn_love.addClickEventListener(this.buttonLoveListener.bind(this));

        var btn_fight = rootNode.getChildByName('btn_fight');
        btn_fight.titleText = '雄霸天下';
        btn_fight.addClickEventListener(this.buttonFightListener.bind(this));

        var btn_recharge = rootNode.getChildByName('btn_recharge');
        btn_recharge.titleText = '充值';
    },

    update: function(player) {
        var node = this._rootNode;
        node.getChildByName('txt_gold').setString(player.get('gold'));

        node.getChildByName('txt_hp').setString(player.get('hp'));
        node.getChildByName('txt_atk').setString(player.get('atk'));
        node.getChildByName('txt_defence').setString(player.get('defence'));
        node.getChildByName('txt_undefence').setString(player.get('undefence'));
        node.getChildByName('txt_crit').setString(player.get('crit'));
        node.getChildByName('txt_uncrit').setString(player.get('uncrit'));
        node.getChildByName('txt_dodge').setString(player.get('dodge'));
        node.getChildByName('txt_hit').setString(player.get('hit'));
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
        this._txt_desc.setString(cc.formatStr(this._txt_desc_str, count, gold, this._freeCount))
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

        var rootNode = this._rootNode = new cc.LayerColor(cc.color(51, 51, 51, 255));
        this.addChild(rootNode);

        var titleNode = ccs.csLoader.createNode(res.titleNode);
        titleNode.attr({
            x: 0,
            y: cc.winSize.height - 80
        });
        var txt_title = titleNode.getChildByName('txt_title');
        txt_title.string = '虞姬之爱';
        var btn_back = titleNode.getChildByName('btn_back');
        btn_back.addClickEventListener(this.onBackListener.bind(this));
        rootNode.addChild(titleNode);

        return true;
    },

    init: function(player, items) {
        var desc_bg = new cc.Sprite(res.gray_png);
        desc_bg.attr({
            width: 580,
            height: 56,
            anchorX: 0,
            anchorY: 0,
            x: 30,
            y: cc.winSize.height - 186
        });
        desc_bg.setScale(580/40, 56/40);
        this.addChild(desc_bg);

        var text_desc = this._txt_desc = new ccui.Text('', null, 28);
        text_desc.color = cc.color(51, 51, 51, 255);
        text_desc.attr({
            anchorY: 0.5,
            anchorX: 0,
            x: 50,
            y: cc.winSize.height - 158
        });
        this.addChild(text_desc);

        var p = cc.p(desc_bg.x, desc_bg.y);
        p.y = p.y - 133;
        var option, i;
        for(i = 0; i < items.length; i++) {
            option = items[i];
            option.position = cc.p(0, p.y - 100*i);

            var loveItem = ccs.csLoader.createNode(res.LoveItem);
            loveItem.addComponent(LoveItemController.create(option, player));
            this._rootNode.addChild(loveItem);
        }
        this.updateLv(player.get('loveLv'));
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
        var trainNode = this._trainNode = new cc.LayerColor(cc.color(51, 51, 51, 255));
        this.addChild(trainNode);

        var titleNode = ccs.csLoader.createNode(res.titleNode);
        titleNode.attr({
            x: 0,
            y: cc.winSize.height - 80
        });
        var txt_title = titleNode.getChildByName('txt_title');
        txt_title.string = '演武场';
        var btn_back = titleNode.getChildByName('btn_back');
        btn_back.addClickEventListener(this.onBackListener.bind(this));
        trainNode.addChild(titleNode);

        this.schedule(this.updateTaskProgress, 1, cc.REPEAT_FOREVER);
        return true;
    },

    updateTaskProgress: function() {

    },

    init: function(taskList) {
        var size = cc.winSize;
        var baseY = size.height*90/100;
        var i = 0;
        for (var id in taskList) {
            var task = taskList[id];
            var y = baseY - 120*(i+1);
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

            var playerProxy = this.facade.retrieveProxy(PlayerProxy.NAME);
            var player = playerProxy.getPlayer();

            self.viewComponent.init(player, this.getLoveItems());

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImM6XFxVc2Vyc1xcQXJ0aHVyXFxBcHBEYXRhXFxSb2FtaW5nXFxucG1cXG5vZGVfbW9kdWxlc1xcd2F0Y2hpZnlcXG5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwibm9kZV9tb2R1bGVzXFxwdXJlbXZjXFxpbmRleC5qcyIsIm5vZGVfbW9kdWxlc1xccHVyZW12Y1xcbGliXFxwdXJlbXZjLTEuMC4xLm1vZHVsZS5qcyIsIm5vZGVfbW9kdWxlc1xcdW5kZXJzY29yZVxcdW5kZXJzY29yZS5qcyIsInNyY1xcYXBwLmpzIiwic3JjXFxhcHBDb25zdGFudHMuanMiLCJzcmNcXGFwcEZhY2FkZS5qcyIsInNyY1xcY29udHJvbGxlclxcY29tbWFuZFxcU3RhcnR1cENvbW1hbmQuanMiLCJzcmNcXGNvbnRyb2xsZXJcXGNvbW1hbmRcXGhvbWVDb21tYW5kLmpzIiwic3JjXFxjb250cm9sbGVyXFxjb21tYW5kXFxwbGF5ZXJDb21tYW5kLmpzIiwic3JjXFxjb250cm9sbGVyXFxjb21tYW5kXFxwcmVwQ29udHJvbGxlckNvbW1hbmQuanMiLCJzcmNcXGNvbnRyb2xsZXJcXGNvbW1hbmRcXHByZXBNb2RlbENvbW1hbmQuanMiLCJzcmNcXGNvbnRyb2xsZXJcXGNvbW1hbmRcXHByZXBWaWV3Q29tbWFuZC5qcyIsInNyY1xcY29udHJvbGxlclxcY29tbWFuZFxcdGFza0NvbW1hbmQuanMiLCJzcmNcXGNvbnRyb2xsZXJcXGNvbW1hbmRcXHRhc2tNb25pdG9yQ29tbWFuZC5qcyIsInNyY1xcbW9kZWxcXGVudGl0eVxcZW50aXR5LmpzIiwic3JjXFxtb2RlbFxcZW50aXR5XFxwbGF5ZXIuanMiLCJzcmNcXG1vZGVsXFxlbnRpdHlcXHRhc2suanMiLCJzcmNcXG1vZGVsXFxwcm94eVxccGxheWVyUHJveHkuanMiLCJzcmNcXG1vZGVsXFxwcm94eVxcdGFza1Byb3h5LmpzIiwic3JjXFxyZXNvdXJjZS5qcyIsInNyY1xcdXRpbFxcZXZlbnQuanMiLCJzcmNcXHZpZXdcXGNvbXBvbmVudFxcY29uZmlybURpYWxvZy5qcyIsInNyY1xcdmlld1xcY29tcG9uZW50XFxjb250cm9sbGVyXFxsb3ZlSXRlbS5qcyIsInNyY1xcdmlld1xcY29tcG9uZW50XFxjb250cm9sbGVyXFx0cmFpbkl0ZW0uanMiLCJzcmNcXHZpZXdcXGNvbXBvbmVudFxcZmlnaHRMYXllci5qcyIsInNyY1xcdmlld1xcY29tcG9uZW50XFxob21lTGF5ZXIuanMiLCJzcmNcXHZpZXdcXGNvbXBvbmVudFxcbG92ZUNvbmZpcm1MYXllci5qcyIsInNyY1xcdmlld1xcY29tcG9uZW50XFxsb3ZlTGF5ZXIuanMiLCJzcmNcXHZpZXdcXGNvbXBvbmVudFxcdHJhaW5MYXllci5qcyIsInNyY1xcdmlld1xcbWVkaWF0b3JcXGRpcmVjdG9yTWVkaWF0b3IuanMiLCJzcmNcXHZpZXdcXG1lZGlhdG9yXFxmaWdodE1lZGlhdG9yLmpzIiwic3JjXFx2aWV3XFxtZWRpYXRvclxcaG9tZU1lZGlhdG9yLmpzIiwic3JjXFx2aWV3XFxtZWRpYXRvclxcbG92ZU1lZGlhdG9yLmpzIiwic3JjXFx2aWV3XFxtZWRpYXRvclxcc2NlbmVNZWRpYXRvci5qcyIsInNyY1xcdmlld1xcbWVkaWF0b3JcXHRyYWluTWVkaWF0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3Q1RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3Y0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0lBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1VEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZXhwb3J0cy5wdXJlbXZjID0gcmVxdWlyZSgnLi9saWIvcHVyZW12Yy0xLjAuMS5tb2R1bGUuanMnKTtcclxuIiwiLyoqXHJcbiAqIEBmaWxlT3ZlcnZpZXdcclxuICogUHVyZU1WQyBKUyBOYXRpdmUgUG9ydCBieSBEYXZpZCBGb2xleSwgRnLDqWTDqXJpYyBTYXVuaWVyLCAmIEFsYWluIER1Y2hlc25lYXVcclxuICogQ29weXJpZ2h0KGMpIDIwMDYtMjAxMiBGdXR1cmVzY2FsZSwgSW5jLiwgU29tZSByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqIFJldXNlIGdvdmVybmVkIGJ5IENyZWF0aXZlIENvbW1vbnMgQXR0cmlidXRpb24gMy4wXHJcbiAqIGh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL2xpY2Vuc2VzL2J5LzMuMC91cy9cclxuICogQGF1dGhvciBkYXZpZC5mb2xleUBwdXJlbXZjLm9yZ1xyXG4gKi9cclxuXHJcblxyXG4vKiBpbXBsZW1lbnRhdGlvbiBiZWdpbiAqL1xyXG5cclxuXHJcbi8qKlxyXG4gKiBAYXV0aG9yIFB1cmVNVkMgSlMgTmF0aXZlIFBvcnQgYnkgRGF2aWQgRm9sZXksIEZyw6lkw6lyaWMgU2F1bmllciwgJiBBbGFpbiBEdWNoZXNuZWF1XHJcbiAqIEBhdXRob3IgQ29weXJpZ2h0KGMpIDIwMDYtMjAxMiBGdXR1cmVzY2FsZSwgSW5jLiwgU29tZSByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIEBjbGFzcyBwdXJlbXZjLk9ic2VydmVyXHJcbiAqXHJcbiAqIEEgYmFzZSBPYnNlcnZlciBpbXBsZW1lbnRhdGlvbi5cclxuICpcclxuICogQW4gT2JzZXJ2ZXIgaXMgYW4gb2JqZWN0IHRoYXQgZW5jYXBzdWxhdGVzIGluZm9ybWF0aW9uXHJcbiAqIGFib3V0IGFuIGludGVyZXN0ZWQgb2JqZWN0IHdpdGggYSBtZXRob2QgdGhhdCBzaG91bGRcclxuICogYmUgY2FsbGVkIHdoZW4gYSBwYXJ0aWN1bGFyIE5vdGlmaWNhdGlvbiBpcyBicm9hZGNhc3QuXHJcbiAqXHJcbiAqIEluIFB1cmVNVkMsIHRoZSBPYnNlcnZlciBjbGFzcyBhc3N1bWVzIHRoZXNlIHJlc3BvbnNpYmlsaXRpZXM6XHJcbiAqXHJcbiAqIC0gRW5jYXBzdWxhdGUgdGhlIG5vdGlmaWNhdGlvbiAoY2FsbGJhY2spIG1ldGhvZCBvZiB0aGUgaW50ZXJlc3RlZCBvYmplY3QuXHJcbiAqIC0gRW5jYXBzdWxhdGUgdGhlIG5vdGlmaWNhdGlvbiBjb250ZXh0ICh0aGlzKSBvZiB0aGUgaW50ZXJlc3RlZCBvYmplY3QuXHJcbiAqIC0gUHJvdmlkZSBtZXRob2RzIGZvciBzZXR0aW5nIHRoZSBub3RpZmljYXRpb24gbWV0aG9kIGFuZCBjb250ZXh0LlxyXG4gKiAtIFByb3ZpZGUgYSBtZXRob2QgZm9yIG5vdGlmeWluZyB0aGUgaW50ZXJlc3RlZCBvYmplY3QuXHJcbiAqXHJcbiAqXHJcbiAqIFRoZSBub3RpZmljYXRpb24gbWV0aG9kIG9uIHRoZSBpbnRlcmVzdGVkIG9iamVjdCBzaG91bGQgdGFrZVxyXG4gKiBvbmUgcGFyYW1ldGVyIG9mIHR5cGUgTm90aWZpY2F0aW9uLlxyXG4gKlxyXG4gKlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBub3RpZnlNZXRob2RcclxuICogIHRoZSBub3RpZmljYXRpb24gbWV0aG9kIG9mIHRoZSBpbnRlcmVzdGVkIG9iamVjdFxyXG4gKiBAcGFyYW0ge09iamVjdH0gbm90aWZ5Q29udGV4dFxyXG4gKiAgdGhlIG5vdGlmaWNhdGlvbiBjb250ZXh0IG9mIHRoZSBpbnRlcmVzdGVkIG9iamVjdFxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIE9ic2VydmVyIChub3RpZnlNZXRob2QsIG5vdGlmeUNvbnRleHQpXHJcbntcclxuICAgIHRoaXMuc2V0Tm90aWZ5TWV0aG9kKG5vdGlmeU1ldGhvZCk7XHJcbiAgICB0aGlzLnNldE5vdGlmeUNvbnRleHQobm90aWZ5Q29udGV4dCk7XHJcbn07XHJcblxyXG4vKipcclxuICogU2V0IHRoZSBPYnNlcnZlcnMgbm90aWZpY2F0aW9uIG1ldGhvZC5cclxuICpcclxuICogVGhlIG5vdGlmaWNhdGlvbiBtZXRob2Qgc2hvdWxkIHRha2Ugb25lIHBhcmFtZXRlciBvZiB0eXBlIE5vdGlmaWNhdGlvblxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBub3RpZnlNZXRob2RcclxuICogIHRoZSBub3RpZmljYXRpb24gKGNhbGxiYWNrKSBtZXRob2Qgb2YgdGhlIGludGVyZXN0ZWQgb2JqZWN0LlxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuT2JzZXJ2ZXIucHJvdG90eXBlLnNldE5vdGlmeU1ldGhvZD0gZnVuY3Rpb24gKG5vdGlmeU1ldGhvZClcclxue1xyXG4gICAgdGhpcy5ub3RpZnk9IG5vdGlmeU1ldGhvZDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhlIE9ic2VydmVycyBub3RpZmljYXRpb24gY29udGV4dC5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IG5vdGlmeUNvbnRleHRcclxuICogIHRoZSBub3RpZmljYXRpb24gY29udGV4dCAodGhpcykgb2YgdGhlIGludGVyZXN0ZWQgb2JqZWN0LlxyXG4gKlxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuT2JzZXJ2ZXIucHJvdG90eXBlLnNldE5vdGlmeUNvbnRleHQ9IGZ1bmN0aW9uIChub3RpZnlDb250ZXh0KVxyXG57XHJcbiAgICB0aGlzLmNvbnRleHQ9IG5vdGlmeUNvbnRleHQ7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBGdW5jdGlvbiB0aGF0IHRoaXMgT2JzZXJ2ZXIgd2lsbCBpbnZva2Ugd2hlbiBpdCBpcyBub3RpZmllZC5cclxuICpcclxuICogQHByaXZhdGVcclxuICogQHJldHVybiB7RnVuY3Rpb259XHJcbiAqL1xyXG5PYnNlcnZlci5wcm90b3R5cGUuZ2V0Tm90aWZ5TWV0aG9kPSBmdW5jdGlvbiAoKVxyXG57XHJcbiAgICByZXR1cm4gdGhpcy5ub3RpZnk7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBPYmplY3QgdGhhdCB3aWxsIHNlcnZlIGFzIHRoZSBPYnNlcnZlcnMgY2FsbGJhY2sgZXhlY3V0aW9uIGNvbnRleHRcclxuICpcclxuICogQHByaXZhdGVcclxuICogQHJldHVybiB7T2JqZWN0fVxyXG4gKi9cclxuT2JzZXJ2ZXIucHJvdG90eXBlLmdldE5vdGlmeUNvbnRleHQ9IGZ1bmN0aW9uICgpXHJcbntcclxuICAgIHJldHVybiB0aGlzLmNvbnRleHQ7XHJcbn07XHJcblxyXG4vKipcclxuICogTm90aWZ5IHRoZSBpbnRlcmVzdGVkIG9iamVjdC5cclxuICpcclxuICogQHBhcmFtIHtwdXJlbXZjLk5vdGlmaWNhdGlvbn0gbm90aWZpY2F0aW9uXHJcbiAqICBUaGUgTm90aWZpY2F0aW9uIHRvIHBhc3MgdG8gdGhlIGludGVyZXN0ZWQgb2JqZWN0cyBub3RpZmljYXRpb24gbWV0aG9kXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5PYnNlcnZlci5wcm90b3R5cGUubm90aWZ5T2JzZXJ2ZXI9IGZ1bmN0aW9uIChub3RpZmljYXRpb24pXHJcbntcclxuICAgIHRoaXMuZ2V0Tm90aWZ5TWV0aG9kKCkuY2FsbCh0aGlzLmdldE5vdGlmeUNvbnRleHQoKSwgbm90aWZpY2F0aW9uKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDb21wYXJlIGFuIG9iamVjdCB0byB0aGlzIE9ic2VydmVycyBub3RpZmljYXRpb24gY29udGV4dC5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdFxyXG4gKlxyXG4gKiBAcmV0dXJuIHtib29sZWFufVxyXG4gKi9cclxuT2JzZXJ2ZXIucHJvdG90eXBlLmNvbXBhcmVOb3RpZnlDb250ZXh0PSBmdW5jdGlvbiAob2JqZWN0KVxyXG57XHJcbiAgICByZXR1cm4gb2JqZWN0ID09PSB0aGlzLmNvbnRleHQ7XHJcbn07XHJcblxyXG4vKipcclxuICogVGhlIE9ic2VydmVycyBjYWxsYmFjayBGdW5jdGlvblxyXG4gKlxyXG4gKiBAcHJpdmF0ZVxyXG4gKiBAdHlwZSB7RnVuY3Rpb259XHJcbiAqL1xyXG5PYnNlcnZlci5wcm90b3R5cGUubm90aWZ5PSBudWxsO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBPYnNlcnZlcnMgY2FsbGJhY2sgT2JqZWN0XHJcbiAqIEBwcml2YXRlXHJcbiAqIEB0eXBlIHtPYmplY3R9XHJcbiAqL1xyXG5PYnNlcnZlci5wcm90b3R5cGUuY29udGV4dD0gbnVsbDtcclxuLyoqXHJcbiAqIEBhdXRob3IgUHVyZU1WQyBKUyBOYXRpdmUgUG9ydCBieSBEYXZpZCBGb2xleSwgRnLDqWTDqXJpYyBTYXVuaWVyLCAmIEFsYWluIER1Y2hlc25lYXVcclxuICogQGF1dGhvciBDb3B5cmlnaHQoYykgMjAwNi0yMDEyIEZ1dHVyZXNjYWxlLCBJbmMuLCBTb21lIHJpZ2h0cyByZXNlcnZlZC5cclxuICpcclxuICogQGNsYXNzIHB1cmVtdmMuTm90aWZpY2F0aW9uXHJcbiAqXHJcbiAqIEEgYmFzZSBOb3RpZmljYXRpb24gaW1wbGVtZW50YXRpb24uXHJcbiAqXHJcbiAqIFB1cmVNVkMgZG9lcyBub3QgcmVseSB1cG9uIHVuZGVybHlpbmcgZXZlbnQgbW9kZWxzIHN1Y2ggYXMgdGhlIG9uZSBwcm92aWRlZFxyXG4gKiB3aXRoIHRoZSBET00gb3Igb3RoZXIgYnJvd3NlciBjZW50cmljIFczQyBldmVudCBtb2RlbHMuXHJcbiAqXHJcbiAqIFRoZSBPYnNlcnZlciBQYXR0ZXJuIGFzIGltcGxlbWVudGVkIHdpdGhpbiBQdXJlTVZDIGV4aXN0cyB0byBzdXBwb3J0XHJcbiAqIGV2ZW50LWRyaXZlbiBjb21tdW5pY2F0aW9uIGJldHdlZW4gdGhlIGFwcGxpY2F0aW9uIGFuZCB0aGUgYWN0b3JzIG9mIHRoZSBNVkNcclxuICogdHJpYWQuXHJcbiAqXHJcbiAqIE5vdGlmaWNhdGlvbnMgYXJlIG5vdCBtZWFudCB0byBiZSBhIHJlcGxhY2VtZW50IGZvciBldmVudHMgaW4gdGhlIGJyb3dzZXIuXHJcbiAqIEdlbmVyYWxseSwgTWVkaWF0b3IgaW1wbGVtZW50b3JzIHBsYWNlIGV2ZW50IGxpc3RlbmVycyBvbiB0aGVpciB2aWV3XHJcbiAqIGNvbXBvbmVudHMsIHdoaWNoIHRoZXkgdGhlbiBoYW5kbGUgaW4gdGhlIHVzdWFsIHdheS4gVGhpcyBtYXkgbGVhZCB0byB0aGVcclxuICogYnJvYWRjYXN0IG9mIE5vdGlmaWNhdGlvbnMgdG8gdHJpZ2dlciBjb21tYW5kcyBvciB0byBjb21tdW5pY2F0ZSB3aXRoIG90aGVyXHJcbiAqIE1lZGlhdG9ycy4ge0BsaW5rIHB1cmVtdmMuUHJveHkgUHJveHl9LFxyXG4gKiB7QGxpbmsgcHVyZW12Yy5TaW1wbGVDb21tYW5kIFNpbXBsZUNvbW1hbmR9XHJcbiAqIGFuZCB7QGxpbmsgcHVyZW12Yy5NYWNyb0NvbW1hbmQgTWFjcm9Db21tYW5kfVxyXG4gKiBpbnN0YW5jZXMgY29tbXVuaWNhdGUgd2l0aCBlYWNoIG90aGVyIGFuZFxyXG4gKiB7QGxpbmsgcHVyZW12Yy5NZWRpYXRvciBNZWRpYXRvcn1zXHJcbiAqIGJ5IGJyb2FkY2FzdGluZyBOb3RpZmljYXRpb25zLlxyXG4gKlxyXG4gKiBBIGtleSBkaWZmZXJlbmNlIGJldHdlZW4gYnJvd3NlciBldmVudHMgYW5kIFB1cmVNVkMgTm90aWZpY2F0aW9ucyBpcyB0aGF0XHJcbiAqIGV2ZW50cyBmb2xsb3cgdGhlICdDaGFpbiBvZiBSZXNwb25zaWJpbGl0eScgcGF0dGVybiwgJ2J1YmJsaW5nJyB1cCB0aGVcclxuICogZGlzcGxheSBoaWVyYXJjaHkgdW50aWwgc29tZSBwYXJlbnQgY29tcG9uZW50IGhhbmRsZXMgdGhlIGV2ZW50LCB3aGlsZVxyXG4gKiBQdXJlTVZDIE5vdGlmaWNhdGlvbiBmb2xsb3cgYSAnUHVibGlzaC9TdWJzY3JpYmUnIHBhdHRlcm4uIFB1cmVNVkMgY2xhc3Nlc1xyXG4gKiBuZWVkIG5vdCBiZSByZWxhdGVkIHRvIGVhY2ggb3RoZXIgaW4gYSBwYXJlbnQvY2hpbGQgcmVsYXRpb25zaGlwIGluIG9yZGVyIHRvXHJcbiAqIGNvbW11bmljYXRlIHdpdGggb25lIGFub3RoZXIgdXNpbmcgTm90aWZpY2F0aW9ucy5cclxuICpcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXHJcbiAqICBUaGUgTm90aWZpY2F0aW9uIG5hbWVcclxuICogQHBhcmFtIHtPYmplY3R9IFtib2R5XVxyXG4gKiAgVGhlIE5vdGlmaWNhdGlvbiBib2R5XHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBbdHlwZV1cclxuICogIFRoZSBOb3RpZmljYXRpb24gdHlwZVxyXG4gKi9cclxuZnVuY3Rpb24gTm90aWZpY2F0aW9uKG5hbWUsIGJvZHksIHR5cGUpXHJcbntcclxuICAgIHRoaXMubmFtZT0gbmFtZTtcclxuICAgIHRoaXMuYm9keT0gYm9keTtcclxuICAgIHRoaXMudHlwZT0gdHlwZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIG5hbWUgb2YgdGhlIE5vdGlmaWNhdGlvbiBpbnN0YW5jZVxyXG4gKlxyXG4gKiBAcmV0dXJuIHtzdHJpbmd9XHJcbiAqICBUaGUgbmFtZSBvZiB0aGUgTm90aWZpY2F0aW9uIGluc3RhbmNlXHJcbiAqL1xyXG5Ob3RpZmljYXRpb24ucHJvdG90eXBlLmdldE5hbWU9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgcmV0dXJuIHRoaXMubmFtZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhpcyBOb3RpZmljYXRpb25zIGJvZHkuXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBib2R5XHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5Ob3RpZmljYXRpb24ucHJvdG90eXBlLnNldEJvZHk9IGZ1bmN0aW9uKGJvZHkpXHJcbntcclxuICAgIHRoaXMuYm9keT0gYm9keTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIE5vdGlmaWNhdGlvbiBib2R5LlxyXG4gKlxyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqL1xyXG5Ob3RpZmljYXRpb24ucHJvdG90eXBlLmdldEJvZHk9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgcmV0dXJuIHRoaXMuYm9keVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNldCB0aGUgdHlwZSBvZiB0aGUgTm90aWZpY2F0aW9uIGluc3RhbmNlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gdHlwZVxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuTm90aWZpY2F0aW9uLnByb3RvdHlwZS5zZXRUeXBlPSBmdW5jdGlvbih0eXBlKVxyXG57XHJcbiAgICB0aGlzLnR5cGU9IHR5cGU7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0IHRoZSB0eXBlIG9mIHRoZSBOb3RpZmljYXRpb24gaW5zdGFuY2UuXHJcbiAqXHJcbiAqIEByZXR1cm4ge09iamVjdH1cclxuICovXHJcbk5vdGlmaWNhdGlvbi5wcm90b3R5cGUuZ2V0VHlwZT0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICByZXR1cm4gdGhpcy50eXBlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldCBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgTm90aWZpY2F0aW9uIGluc3RhbmNlXHJcbiAqXHJcbiAqIEByZXR1cm4ge3N0cmluZ31cclxuICovXHJcbk5vdGlmaWNhdGlvbi5wcm90b3R5cGUudG9TdHJpbmc9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgdmFyIG1zZz0gXCJOb3RpZmljYXRpb24gTmFtZTogXCIgKyB0aGlzLmdldE5hbWUoKTtcclxuICAgIG1zZys9IFwiXFxuQm9keTpcIiArICgodGhpcy5ib2R5ID09IG51bGwgKSA/IFwibnVsbFwiIDogdGhpcy5ib2R5LnRvU3RyaW5nKCkpO1xyXG4gICAgbXNnKz0gXCJcXG5UeXBlOlwiICsgKCh0aGlzLnR5cGUgPT0gbnVsbCApID8gXCJudWxsXCIgOiB0aGlzLnR5cGUpO1xyXG4gICAgcmV0dXJuIG1zZztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgTm90aWZpY2F0aW9ucyBuYW1lLlxyXG4gKlxyXG4gKiBAdHlwZSB7c3RyaW5nfVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuTm90aWZpY2F0aW9uLnByb3RvdHlwZS5uYW1lPSBudWxsO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBOb3RpZmljYXRpb25zIHR5cGUuXHJcbiAqXHJcbiAqIEB0eXBlIHtzdHJpbmd9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5Ob3RpZmljYXRpb24ucHJvdG90eXBlLnR5cGU9IG51bGw7XHJcblxyXG4vKipcclxuICogVGhlIE5vdGlmaWNhdGlvbnMgYm9keS5cclxuICpcclxuICogQHR5cGUge09iamVjdH1cclxuICogQHByaXZhdGVcclxuICovXHJcbk5vdGlmaWNhdGlvbi5wcm90b3R5cGUuYm9keT0gbnVsbDtcclxuLyoqXHJcbiAqIEBhdXRob3IgUHVyZU1WQyBKUyBOYXRpdmUgUG9ydCBieSBEYXZpZCBGb2xleSwgRnLDqWTDqXJpYyBTYXVuaWVyLCAmIEFsYWluIER1Y2hlc25lYXVcclxuICogQGF1dGhvciBDb3B5cmlnaHQoYykgMjAwNi0yMDEyIEZ1dHVyZXNjYWxlLCBJbmMuLCBTb21lIHJpZ2h0cyByZXNlcnZlZC5cclxuICpcclxuICogQGNsYXNzIHB1cmVtdmMuTm90aWZpZXJcclxuICpcclxuICogQSBCYXNlIE5vdGlmaWVyIGltcGxlbWVudGF0aW9uLlxyXG4gKlxyXG4gKiB7QGxpbmsgcHVyZW12Yy5NYWNyb0NvbW1hbmQgTWFjcm9Db21tYW5kfSxcclxuICoge0BsaW5rIHB1cmVtdmMuU2ltcGxlQ29tbWFuZCBTaW1wbGVDb21tYW5kfSxcclxuICoge0BsaW5rIHB1cmVtdmMuTWVkaWF0b3IgTWVkaWF0b3J9IGFuZFxyXG4gKiB7QGxpbmsgcHVyZW12Yy5Qcm94eSBQcm94eX1cclxuICogYWxsIGhhdmUgYSBuZWVkIHRvIHNlbmQgTm90aWZpY2F0aW9uc1xyXG4gKlxyXG4gKiBUaGUgTm90aWZpZXIgaW50ZXJmYWNlIHByb3ZpZGVzIGEgY29tbW9uIG1ldGhvZCBjYWxsZWQgI3NlbmROb3RpZmljYXRpb24gdGhhdFxyXG4gKiByZWxpZXZlcyBpbXBsZW1lbnRhdGlvbiBjb2RlIG9mIHRoZSBuZWNlc3NpdHkgdG8gYWN0dWFsbHkgY29uc3RydWN0XHJcbiAqIE5vdGlmaWNhdGlvbnMuXHJcbiAqXHJcbiAqIFRoZSBOb3RpZmllciBjbGFzcywgd2hpY2ggYWxsIG9mIHRoZSBhYm92ZSBtZW50aW9uZWQgY2xhc3Nlc1xyXG4gKiBleHRlbmQsIHByb3ZpZGVzIGFuIGluaXRpYWxpemVkIHJlZmVyZW5jZSB0byB0aGVcclxuICoge0BsaW5rIHB1cmVtdmMuRmFjYWRlIEZhY2FkZX1cclxuICogTXVsdGl0b24sIHdoaWNoIGlzIHJlcXVpcmVkIGZvciB0aGUgY29udmllbmllbmNlIG1ldGhvZFxyXG4gKiBmb3Igc2VuZGluZyBOb3RpZmljYXRpb25zIGJ1dCBhbHNvIGVhc2VzIGltcGxlbWVudGF0aW9uIGFzIHRoZXNlXHJcbiAqIGNsYXNzZXMgaGF2ZSBmcmVxdWVudFxyXG4gKiB7QGxpbmsgcHVyZW12Yy5GYWNhZGUgRmFjYWRlfSBpbnRlcmFjdGlvbnNcclxuICogYW5kIHVzdWFsbHkgcmVxdWlyZSBhY2Nlc3MgdG8gdGhlIGZhY2FkZSBhbnl3YXkuXHJcbiAqXHJcbiAqIE5PVEU6IEluIHRoZSBNdWx0aUNvcmUgdmVyc2lvbiBvZiB0aGUgZnJhbWV3b3JrLCB0aGVyZSBpcyBvbmUgY2F2ZWF0IHRvXHJcbiAqIG5vdGlmaWVycywgdGhleSBjYW5ub3Qgc2VuZCBub3RpZmljYXRpb25zIG9yIHJlYWNoIHRoZSBmYWNhZGUgdW50aWwgdGhleVxyXG4gKiBoYXZlIGEgdmFsaWQgbXVsdGl0b25LZXkuXHJcbiAqXHJcbiAqIFRoZSBtdWx0aXRvbktleSBpcyBzZXQ6XHJcbiAqICAgLSBvbiBhIENvbW1hbmQgd2hlbiBpdCBpcyBleGVjdXRlZCBieSB0aGUgQ29udHJvbGxlclxyXG4gKiAgIC0gb24gYSBNZWRpYXRvciBpcyByZWdpc3RlcmVkIHdpdGggdGhlIFZpZXdcclxuICogICAtIG9uIGEgUHJveHkgaXMgcmVnaXN0ZXJlZCB3aXRoIHRoZSBNb2RlbC5cclxuICpcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBOb3RpZmllcigpXHJcbntcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYW5kIHNlbmQgYSBOb3RpZmljYXRpb24uXHJcbiAqXHJcbiAqIEtlZXBzIHVzIGZyb20gaGF2aW5nIHRvIGNvbnN0cnVjdCBuZXcgTm90aWZpY2F0aW9uIGluc3RhbmNlcyBpbiBvdXJcclxuICogaW1wbGVtZW50YXRpb24gY29kZS5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG5vdGlmaWNhdGlvbk5hbWVcclxuICogIEEgbm90aWZpY2F0aW9uIG5hbWVcclxuICogQHBhcmFtIHtPYmplY3R9IFtib2R5XVxyXG4gKiAgVGhlIGJvZHkgb2YgdGhlIG5vdGlmaWNhdGlvblxyXG4gKiBAcGFyYW0ge3N0cmluZ30gW3R5cGVdXHJcbiAqICBUaGUgbm90aWZpY2F0aW9uIHR5cGVcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbk5vdGlmaWVyLnByb3RvdHlwZS5zZW5kTm90aWZpY2F0aW9uID0gZnVuY3Rpb24obm90aWZpY2F0aW9uTmFtZSwgYm9keSwgdHlwZSlcclxue1xyXG4gICAgdmFyIGZhY2FkZSA9IHRoaXMuZ2V0RmFjYWRlKCk7XHJcbiAgICBpZihmYWNhZGUpXHJcbiAgICB7XHJcbiAgICAgICAgZmFjYWRlLnNlbmROb3RpZmljYXRpb24obm90aWZpY2F0aW9uTmFtZSwgYm9keSwgdHlwZSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQSByZWZlcmVuY2UgdG8gdGhpcyBOb3RpZmllcidzIEZhY2FkZS4gVGhpcyByZWZlcmVuY2Ugd2lsbCBub3QgYmUgYXZhaWxhYmxlXHJcbiAqIHVudGlsICNpbml0aWFsaXplTm90aWZpZXIgaGFzIGJlZW4gY2FsbGVkLlxyXG4gKlxyXG4gKiBAdHlwZSB7cHVyZW12Yy5GYWNhZGV9XHJcbiAqL1xyXG5Ob3RpZmllci5wcm90b3R5cGUuZmFjYWRlO1xyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemUgdGhpcyBOb3RpZmllciBpbnN0YW5jZS5cclxuICpcclxuICogVGhpcyBpcyBob3cgYSBOb3RpZmllciBnZXRzIGl0cyBtdWx0aXRvbktleS5cclxuICogQ2FsbHMgdG8gI3NlbmROb3RpZmljYXRpb24gb3IgdG8gYWNjZXNzIHRoZVxyXG4gKiBmYWNhZGUgd2lsbCBmYWlsIHVudGlsIGFmdGVyIHRoaXMgbWV0aG9kXHJcbiAqIGhhcyBiZWVuIGNhbGxlZC5cclxuICpcclxuICogTWVkaWF0b3JzLCBDb21tYW5kcyBvciBQcm94aWVzIG1heSBvdmVycmlkZVxyXG4gKiB0aGlzIG1ldGhvZCBpbiBvcmRlciB0byBzZW5kIG5vdGlmaWNhdGlvbnNcclxuICogb3IgYWNjZXNzIHRoZSBNdWx0aXRvbiBGYWNhZGUgaW5zdGFuY2UgYXNcclxuICogc29vbiBhcyBwb3NzaWJsZS4gVGhleSBDQU5OT1QgYWNjZXNzIHRoZSBmYWNhZGVcclxuICogaW4gdGhlaXIgY29uc3RydWN0b3JzLCBzaW5jZSB0aGlzIG1ldGhvZCB3aWxsIG5vdFxyXG4gKiB5ZXQgaGF2ZSBiZWVuIGNhbGxlZC5cclxuICpcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IGtleVxyXG4gKiAgVGhlIE5vdGlmaWVycyBtdWx0aXRvbiBrZXk7XHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5Ob3RpZmllci5wcm90b3R5cGUuaW5pdGlhbGl6ZU5vdGlmaWVyID0gZnVuY3Rpb24oa2V5KVxyXG57XHJcbiAgICB0aGlzLm11bHRpdG9uS2V5ID0gU3RyaW5nKGtleSk7XHJcbiAgICB0aGlzLmZhY2FkZT0gdGhpcy5nZXRGYWNhZGUoKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXRyaWV2ZSB0aGUgTXVsdGl0b24gRmFjYWRlIGluc3RhbmNlXHJcbiAqXHJcbiAqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQHJldHVybiB7cHVyZW12Yy5GYWNhZGV9XHJcbiAqL1xyXG5Ob3RpZmllci5wcm90b3R5cGUuZ2V0RmFjYWRlID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICBpZih0aGlzLm11bHRpdG9uS2V5ID09IG51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKE5vdGlmaWVyLk1VTFRJVE9OX01TRyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBGYWNhZGUuZ2V0SW5zdGFuY2UodGhpcy5tdWx0aXRvbktleSk7XHJcbn07XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKiBUaGUgTm90aWZpZXJzIGludGVybmFsIG11bHRpdG9uIGtleS5cclxuICpcclxuICogQHByb3RlY3RlZFxyXG4gKiBAdHlwZSBzdHJpbmdcclxuICovXHJcbk5vdGlmaWVyLnByb3RvdHlwZS5tdWx0aXRvbktleSA9IG51bGw7XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKiBUaGUgZXJyb3IgbWVzc2FnZSB1c2VkIGlmIHRoZSBOb3RpZmllciBpcyBub3QgaW5pdGlhbGl6ZWQgY29ycmVjdGx5IGFuZFxyXG4gKiBhdHRlbXB0cyB0byByZXRyaWV2ZSBpdHMgb3duIG11bHRpdG9uIGtleVxyXG4gKlxyXG4gKiBAc3RhdGljXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQGNvbnN0XHJcbiAqIEB0eXBlIHN0cmluZ1xyXG4gKi9cclxuTm90aWZpZXIuTVVMVElUT05fTVNHID0gXCJtdWx0aXRvbktleSBmb3IgdGhpcyBOb3RpZmllciBub3QgeWV0IGluaXRpYWxpemVkIVwiO1xyXG4vKipcclxuICogQGF1dGhvciBQdXJlTVZDIEpTIE5hdGl2ZSBQb3J0IGJ5IERhdmlkIEZvbGV5LCBGcsOpZMOpcmljIFNhdW5pZXIsICYgQWxhaW4gRHVjaGVzbmVhdVxyXG4gKiBAYXV0aG9yIENvcHlyaWdodChjKSAyMDA2LTIwMTIgRnV0dXJlc2NhbGUsIEluYy4sIFNvbWUgcmlnaHRzIHJlc2VydmVkLlxyXG4gKlxyXG4gKiBAY2xhc3MgcHVyZW12Yy5TaW1wbGVDb21tYW5kXHJcbiAqIEBleHRlbmRzIHB1cmVtdmMuTm90aWZpZXJcclxuICpcclxuICogU2ltcGxlQ29tbWFuZHMgZW5jYXBzdWxhdGUgdGhlIGJ1c2luZXNzIGxvZ2ljIG9mIHlvdXIgYXBwbGljYXRpb24uIFlvdXJcclxuICogc3ViY2xhc3Mgc2hvdWxkIG92ZXJyaWRlIHRoZSAjZXhlY3V0ZSBtZXRob2Qgd2hlcmUgeW91ciBidXNpbmVzcyBsb2dpYyB3aWxsXHJcbiAqIGhhbmRsZSB0aGVcclxuICoge0BsaW5rIHB1cmVtdmMuTm90aWZpY2F0aW9uIE5vdGlmaWNhdGlvbn1cclxuICpcclxuICogVGFrZSBhIGxvb2sgYXRcclxuICoge0BsaW5rIHB1cmVtdmMuRmFjYWRlI3JlZ2lzdGVyQ29tbWFuZCBGYWNhZGUncyByZWdpc3RlckNvbW1hbmR9XHJcbiAqIG9yIHtAbGluayBwdXJlbXZjLkNvbnRyb2xsZXIjcmVnaXN0ZXJDb21tYW5kIENvbnRyb2xsZXJzIHJlZ2lzdGVyQ29tbWFuZH1cclxuICogbWV0aG9kcyB0byBzZWUgaG93IHRvIGFkZCBjb21tYW5kcyB0byB5b3VyIGFwcGxpY2F0aW9uLlxyXG4gKlxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIFNpbXBsZUNvbW1hbmQgKCkgeyB9O1xyXG5cclxuU2ltcGxlQ29tbWFuZC5wcm90b3R5cGU9IG5ldyBOb3RpZmllcjtcclxuU2ltcGxlQ29tbWFuZC5wcm90b3R5cGUuY29uc3RydWN0b3I9IFNpbXBsZUNvbW1hbmQ7XHJcblxyXG4vKipcclxuICogRnVsZmlsbCB0aGUgdXNlLWNhc2UgaW5pdGlhdGVkIGJ5IHRoZSBnaXZlbiBOb3RpZmljYXRpb25cclxuICpcclxuICogSW4gdGhlIENvbW1hbmQgUGF0dGVybiwgYW4gYXBwbGljYXRpb24gdXNlLWNhc2UgdHlwaWNhbGx5IGJlZ2lucyB3aXRoIHNvbWVcclxuICogdXNlciBhY3Rpb24sIHdoaWNoIHJlc3VsdHMgaW4gYSBOb3RpZmljYXRpb24gaXMgaGFuZGxlZCBieSB0aGUgYnVzaW5lc3MgbG9naWNcclxuICogaW4gdGhlICNleGVjdXRlIG1ldGhvZCBvZiBhIGNvbW1hbmQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7cHVyZW12Yy5Ob3RpZmljYXRpb259IG5vdGlmaWNhdGlvblxyXG4gKiAgVGhlIG5vdGlmaWNhdGlvbiB0byBoYW5kbGUuXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5TaW1wbGVDb21tYW5kLnByb3RvdHlwZS5leGVjdXRlPSBmdW5jdGlvbiAobm90aWZpY2F0aW9uKSB7IH07XHJcbi8qKlxyXG4gKiBAYXV0aG9yIFB1cmVNVkMgSlMgTmF0aXZlIFBvcnQgYnkgRGF2aWQgRm9sZXksIEZyw6lkw6lyaWMgU2F1bmllciwgJiBBbGFpbiBEdWNoZXNuZWF1XHJcbiAqIEBhdXRob3IgQ29weXJpZ2h0KGMpIDIwMDYtMjAxMiBGdXR1cmVzY2FsZSwgSW5jLiwgU29tZSByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIEBjbGFzcyBwdXJlbXZjLk1hY3JvQ29tbWFuZFxyXG4gKiBAZXh0ZW5kcyBwdXJlbXZjLk5vdGlmaWVyXHJcbiAqXHJcbiAqIEEgYmFzZSBjb21tYW5kIGltcGxlbWVudGF0aW9uIHRoYXQgZXhlY3V0ZXMgb3RoZXIgY29tbWFuZHMsIHN1Y2ggYXNcclxuICoge0BsaW5rIHB1cmVtdmMuU2ltcGxlQ29tbWFuZCBTaW1wbGVDb21tYW5kfVxyXG4gKiBvciB7QGxpbmsgcHVyZW12Yy5NYWNyb0NvbW1hbmQgTWFjcm9Db21tYW5kfVxyXG4gKiBzdWJjbGFzc2VzLlxyXG4gKlxyXG4gKiBBIE1hY3JvQ29tbWFuZCBtYWludGFpbnMgYW4gbGlzdCBvZlxyXG4gKiBjb21tYW5kIGNvbnN0cnVjdG9yIHJlZmVyZW5jZXMgY2FsbGVkICpTdWJDb21tYW5kcyouXHJcbiAqXHJcbiAqIFdoZW4gI2V4ZWN1dGUgaXMgY2FsbGVkLCB0aGUgTWFjcm9Db21tYW5kXHJcbiAqIGluc3RhbnRpYXRlcyBhbmQgY2FsbHMgI2V4ZWN1dGUgb24gZWFjaCBvZiBpdHMgKlN1YkNvbW1hbmRzKiBpbiB0dXJuLlxyXG4gKiBFYWNoICpTdWJDb21tYW5kKiB3aWxsIGJlIHBhc3NlZCBhIHJlZmVyZW5jZSB0byB0aGUgb3JpZ2luYWxcclxuICoge0BsaW5rIHB1cmVtdmMuTm90aWZpY2F0aW9uIE5vdGlmaWNhdGlvbn1cclxuICogdGhhdCB3YXMgcGFzc2VkIHRvIHRoZSBNYWNyb0NvbW1hbmRzICNleGVjdXRlIG1ldGhvZFxyXG4gKlxyXG4gKiBVbmxpa2Uge0BsaW5rIHB1cmVtdmMuU2ltcGxlQ29tbWFuZCBTaW1wbGVDb21tYW5kfSxcclxuICogeW91ciBzdWJjbGFzcyBzaG91bGQgbm90IG92ZXJyaWRlICNleGVjdXRlIGJ1dCBpbnN0ZWFkLCBzaG91bGRcclxuICogb3ZlcnJpZGUgdGhlICNpbml0aWFsaXplTWFjcm9Db21tYW5kIG1ldGhvZCwgY2FsbGluZyAjYWRkU3ViQ29tbWFuZCBvbmNlIGZvclxyXG4gKiBlYWNoICpTdWJDb21tYW5kKiB0byBiZSBleGVjdXRlZC5cclxuICpcclxuICogSWYgeW91ciBzdWJjbGFzcyBkb2VzIGRlZmluZSBhIGNvbnN0cnVjdG9yLCBiZSBzdXJlIHRvIGNhbGwgXCJzdXBlclwiIGxpa2Ugc29cclxuICpcclxuICogICAgIGZ1bmN0aW9uIE15TWFjcm9Db21tYW5kICgpXHJcbiAqICAgICB7XHJcbiAqICAgICAgICAgTWFjcm9Db21tYW5kLmNhbGwodGhpcyk7XHJcbiAqICAgICB9O1xyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIE1hY3JvQ29tbWFuZCgpXHJcbntcclxuICAgIHRoaXMuc3ViQ29tbWFuZHM9IFtdO1xyXG4gICAgdGhpcy5pbml0aWFsaXplTWFjcm9Db21tYW5kKCk7XHJcbn07XHJcblxyXG4vKiBzdWJjbGFzcyBOb3RpZmllciAqL1xyXG5NYWNyb0NvbW1hbmQucHJvdG90eXBlPSBuZXcgTm90aWZpZXI7XHJcbk1hY3JvQ29tbWFuZC5wcm90b3R5cGUuY29uc3RydWN0b3I9IE1hY3JvQ29tbWFuZDtcclxuXHJcbi8qKlxyXG4gKiBAcHJpdmF0ZVxyXG4gKiBAdHlwZSB7QXJyYXkuPHB1cmVtdmMuU2ltcGxlQ29tbWFuZHxwdXJlbXZjLk1hY3JvQ29tbWFuZD59XHJcbiAqL1xyXG5NYWNyb0NvbW1hbmQucHJvdG90eXBlLnN1YkNvbW1hbmRzPSBudWxsO1xyXG5cclxuLyoqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogSW5pdGlhbGl6ZSB0aGUgTWFjcm9Db21tYW5kLlxyXG4gKlxyXG4gKiBJbiB5b3VyIHN1YmNsYXNzLCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0b1xyXG4gKiBpbml0aWFsaXplIHRoZSBNYWNyb0NvbW1hbmQncyAqU3ViQ29tbWFuZCpcclxuICogbGlzdCB3aXRoIGNvbW1hbmQgY2xhc3MgcmVmZXJlbmNlcyBsaWtlXHJcbiAqIHRoaXM6XHJcbiAqXHJcbiAqICAgICAvLyBJbml0aWFsaXplIE15TWFjcm9Db21tYW5kXHJcbiAqICAgICBNeU1hY3JvQ29tbWFuZC5wcm90b3R5cGUuaW5pdGlhbGl6ZU1hY3JvQ29tbWFuZD0gZnVuY3Rpb24gKClcclxuICogICAgIHtcclxuICogICAgICAgICB0aGlzLmFkZFN1YkNvbW1hbmQoIGNvbS5tZS5teWFwcC5jb250cm9sbGVyLkZpcnN0Q29tbWFuZCApO1xyXG4gKiAgICAgICAgIHRoaXMuYWRkU3ViQ29tbWFuZCggY29tLm1lLm15YXBwLmNvbnRyb2xsZXIuU2Vjb25kQ29tbWFuZCApO1xyXG4gKiAgICAgICAgIHRoaXMuYWRkU3ViQ29tbWFuZCggY29tLm1lLm15YXBwLmNvbnRyb2xsZXIuVGhpcmRDb21tYW5kICk7XHJcbiAqICAgICB9O1xyXG4gKlxyXG4gKiBOb3RlIHRoYXQgKlN1YkNvbW1hbmQqcyBtYXkgYmUgYW55IGNvbW1hbmQgaW1wbGVtZW50b3IsXHJcbiAqIE1hY3JvQ29tbWFuZHMgb3IgU2ltcGxlQ29tbWFuZHMgYXJlIGJvdGggYWNjZXB0YWJsZS5cclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbk1hY3JvQ29tbWFuZC5wcm90b3R5cGUuaW5pdGlhbGl6ZU1hY3JvQ29tbWFuZD0gZnVuY3Rpb24oKSB7fVxyXG5cclxuLyoqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQWRkIGEgKlN1YkNvbW1hbmQqXHJcbiAqXHJcbiAqIFRoZSAqU3ViQ29tbWFuZCpzIHdpbGwgYmUgY2FsbGVkIGluIEZpcnN0IEluIC8gRmlyc3QgT3V0IChGSUZPKSBvcmRlclxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb21tYW5kQ2xhc3NSZWZcclxuICogIEEgcmVmZXJlbmNlIHRvIGEgc3ViY2xhc3NlZCBTaW1wbGVDb21tYW5kIG9yIE1hY3JvQ29tbWFuZCBjb25zdHJ1Y3RvclxyXG4gKi9cclxuTWFjcm9Db21tYW5kLnByb3RvdHlwZS5hZGRTdWJDb21tYW5kPSBmdW5jdGlvbihjb21tYW5kQ2xhc3NSZWYpXHJcbntcclxuICAgIHRoaXMuc3ViQ29tbWFuZHMucHVzaChjb21tYW5kQ2xhc3NSZWYpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEV4ZWN1dGUgdGhpcyBNYWNyb0NvbW1hbmRzICpTdWJDb21tYW5kcypcclxuICpcclxuICogVGhlICpTdWJDb21tYW5kKnMgd2lsbCBiZSBjYWxsZWQgaW4gRmlyc3QgSW4gLyBGaXJzdCBPdXQgKEZJRk8pIG9yZGVyXHJcbiAqIEBwYXJhbSB7cHVyZW12Yy5Ob3RpZmljYXRpb259IG5vdGVcclxuICogIFRoZSBOb3RpZmljYXRpb24gb2JqZWN0IHRvIGJlIHBhc3NlZCB0byBlYWNoICpTdWJDb21tYW5kKlxyXG4gKi9cclxuTWFjcm9Db21tYW5kLnByb3RvdHlwZS5leGVjdXRlPSBmdW5jdGlvbihub3RlKVxyXG57XHJcbiAgICAvLyBTSUMtIFRPRE8gb3B0aW1pemVcclxuICAgIHdoaWxlKHRoaXMuc3ViQ29tbWFuZHMubGVuZ3RoID4gMClcclxuICAgIHtcclxuICAgICAgICB2YXIgcmVmPSB0aGlzLnN1YkNvbW1hbmRzLnNoaWZ0KCk7XHJcbiAgICAgICAgdmFyIGNtZD0gbmV3IHJlZjtcclxuICAgICAgICBjbWQuaW5pdGlhbGl6ZU5vdGlmaWVyKHRoaXMubXVsdGl0b25LZXkpO1xyXG4gICAgICAgIGNtZC5leGVjdXRlKG5vdGUpO1xyXG4gICAgfVxyXG59O1xyXG4vKipcclxuICogQGF1dGhvciBQdXJlTVZDIEpTIE5hdGl2ZSBQb3J0IGJ5IERhdmlkIEZvbGV5LCBGcsOpZMOpcmljIFNhdW5pZXIsICYgQWxhaW4gRHVjaGVzbmVhdVxyXG4gKiBAYXV0aG9yIENvcHlyaWdodChjKSAyMDA2LTIwMTIgRnV0dXJlc2NhbGUsIEluYy4sIFNvbWUgcmlnaHRzIHJlc2VydmVkLlxyXG4gKlxyXG4gKiBAY2xhc3MgcHVyZW12Yy5NZWRpYXRvclxyXG4gKiBAZXh0ZW5kcyBwdXJlbXZjLk5vdGlmaWVyXHJcbiAqXHJcbiAqIEEgYmFzZSBNZWRpYXRvciBpbXBsZW1lbnRhdGlvbi5cclxuICpcclxuICogSW4gUHVyZU1WQywgTWVkaWF0b3IgY2xhc3NlcyBhcmUgdXNlZCB0byBtZWRpYXRlIGNvbW11bmljYXRpb24gYmV0d2VlbiBhIHZpZXdcclxuICogY29tcG9uZW50IGFuZCB0aGUgcmVzdCBvZiB0aGUgYXBwbGljYXRpb24uXHJcbiAqXHJcbiAqIEEgTWVkaWF0b3Igc2hvdWxkIGxpc3RlbiB0byBpdHMgdmlldyBjb21wb25lbnRzIGZvciBldmVudHMsIGFuZCBoYW5kbGUgdGhlbVxyXG4gKiBieSBzZW5kaW5nIG5vdGlmaWNhdGlvbnMgKHRvIGJlIGhhbmRsZWQgYnkgb3RoZXIgTWVkaWF0b3JzLFxyXG4gKiB7QGxpbmsgcHVyZW12Yy5TaW1wbGVDb21tYW5kIFNpbXBsZUNvbW1hbmRzfVxyXG4gKiBvclxyXG4gKiB7QGxpbmsgcHVyZW12Yy5NYWNyb0NvbW1hbmQgTWFjcm9Db21tYW5kc30pXHJcbiAqIG9yIHBhc3NpbmcgZGF0YSBmcm9tIHRoZSB2aWV3IGNvbXBvbmVudCBkaXJlY3RseSB0byBhXHJcbiAqIHtAbGluayBwdXJlbXZjLlByb3h5IFByb3h5fSwgc3VjaCBhcyBzdWJtaXR0aW5nXHJcbiAqIHRoZSBjb250ZW50cyBvZiBhIGZvcm0gdG8gYSBzZXJ2aWNlLlxyXG4gKlxyXG4gKiBNZWRpYXRvcnMgc2hvdWxkIG5vdCBwZXJmb3JtIGJ1c2luZXNzIGxvZ2ljLCBtYWludGFpbiBzdGF0ZSBvciBvdGhlclxyXG4gKiBpbmZvcm1hdGlvbiBmb3IgaXRzIHZpZXcgY29tcG9uZW50LCBvciBicmVhayB0aGUgZW5jYXBzdWxhdGlvbiBvZiB0aGUgdmlld1xyXG4gKiBjb21wb25lbnQgYnkgbWFuaXB1bGF0aW5nIHRoZSB2aWV3IGNvbXBvbmVudCdzIGNoaWxkcmVuLiBJdCBzaG91bGQgb25seSBjYWxsXHJcbiAqIG1ldGhvZHMgb3Igc2V0IHByb3BlcnRpZXMgb24gdGhlIHZpZXcgY29tcG9uZW50LlxyXG4gKlxyXG4gKiBUaGUgdmlldyBjb21wb25lbnQgc2hvdWxkIGVuY2Fwc3VsYXRlIGl0cyBvd24gYmVoYXZpb3IgYW5kIGltcGxlbWVudGF0aW9uIGJ5XHJcbiAqIGV4cG9zaW5nIG1ldGhvZHMgYW5kIHByb3BlcnRpZXMgdGhhdCB0aGUgTWVkaWF0b3IgY2FuIGNhbGwgd2l0aG91dCBoYXZpbmcgdG9cclxuICoga25vdyBhYm91dCB0aGUgdmlldyBjb21wb25lbnQncyBjaGlsZHJlbi5cclxuICpcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBbbWVkaWF0b3JOYW1lXVxyXG4gKiAgVGhlIE1lZGlhdG9ycyBuYW1lLiBUaGUgTWVkaWF0b3JzIHN0YXRpYyAjTkFNRSB2YWx1ZSBpcyB1c2VkIGJ5IGRlZmF1bHRcclxuICogQHBhcmFtIHtPYmplY3R9IFt2aWV3Q29tcG9uZW50XVxyXG4gKiAgVGhlIE1lZGlhdG9ycyB7QGxpbmsgI3NldFZpZXdDb21wb25lbnQgdmlld0NvbXBvbmVudH0uXHJcbiAqL1xyXG5mdW5jdGlvbiBNZWRpYXRvciAobWVkaWF0b3JOYW1lLCB2aWV3Q29tcG9uZW50KVxyXG57XHJcbiAgICB0aGlzLm1lZGlhdG9yTmFtZT0gbWVkaWF0b3JOYW1lIHx8IHRoaXMuY29uc3RydWN0b3IuTkFNRTtcclxuICAgIHRoaXMudmlld0NvbXBvbmVudD12aWV3Q29tcG9uZW50O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBzdGF0aWNcclxuICogVGhlIG5hbWUgb2YgdGhlIE1lZGlhdG9yLlxyXG4gKlxyXG4gKiBUeXBpY2FsbHksIGEgTWVkaWF0b3Igd2lsbCBiZSB3cml0dGVuIHRvIHNlcnZlIG9uZSBzcGVjaWZpYyBjb250cm9sIG9yIGdyb3VwXHJcbiAqIG9mIGNvbnRyb2xzIGFuZCBzbywgd2lsbCBub3QgaGF2ZSBhIG5lZWQgdG8gYmUgZHluYW1pY2FsbHkgbmFtZWQuXHJcbiAqXHJcbiAqIEB0eXBlIHtzdHJpbmd9XHJcbiAqL1xyXG5NZWRpYXRvci5OQU1FPSBcIk1lZGlhdG9yXCI7XHJcblxyXG4vKiBzdWJjbGFzcyAqL1xyXG5NZWRpYXRvci5wcm90b3R5cGU9IG5ldyBOb3RpZmllcjtcclxuTWVkaWF0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yPSBNZWRpYXRvcjtcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIG5hbWUgb2YgdGhlIE1lZGlhdG9yXHJcbiAqXHJcbiAqIEByZXR1cm4ge3N0cmluZ31cclxuICogIFRoZSBNZWRpYXRvciBuYW1lXHJcbiAqL1xyXG5NZWRpYXRvci5wcm90b3R5cGUuZ2V0TWVkaWF0b3JOYW1lPSBmdW5jdGlvbiAoKVxyXG57XHJcbiAgICByZXR1cm4gdGhpcy5tZWRpYXRvck5hbWU7XHJcbn07XHJcblxyXG4vKipcclxuICogU2V0IHRoZSBNZWRpYXRvcnMgdmlldyBjb21wb25lbnQuIFRoaXMgY291bGRcclxuICogYmUgYSBIVE1MRWxlbWVudCwgYSBiZXNwb2tlIFVpQ29tcG9uZW50IHdyYXBwZXJcclxuICogY2xhc3MsIGEgTW9vVG9vbHMgRWxlbWVudCwgYSBqUXVlcnkgcmVzdWx0IG9yIGFcclxuICogY3NzIHNlbGVjdG9yLCBkZXBlbmRpbmcgb24gd2hpY2ggRE9NIGFic3RyYWN0aW9uXHJcbiAqIGxpYnJhcnkgeW91IGFyZSB1c2luZy5cclxuICpcclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IHRoZSB2aWV3IGNvbXBvbmVudFxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuTWVkaWF0b3IucHJvdG90eXBlLnNldFZpZXdDb21wb25lbnQ9IGZ1bmN0aW9uICh2aWV3Q29tcG9uZW50KVxyXG57XHJcbiAgICB0aGlzLnZpZXdDb21wb25lbnQ9IHZpZXdDb21wb25lbnQ7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBNZWRpYXRvcnMgdmlldyBjb21wb25lbnQuXHJcbiAqXHJcbiAqIEFkZGl0aW9uYWxseSwgYW4gb3B0aW9uYWwgZXhwbGljaXQgZ2V0dGVyIGNhbiBiZVxyXG4gKiBiZSBkZWZpbmVkIGluIHRoZSBzdWJjbGFzcyB0aGF0IGRlZmluZXMgdGhlXHJcbiAqIHZpZXcgY29tcG9uZW50cywgcHJvdmlkaW5nIGEgbW9yZSBzZW1hbnRpYyBpbnRlcmZhY2VcclxuICogdG8gdGhlIE1lZGlhdG9yLlxyXG4gKlxyXG4gKiBUaGlzIGlzIGRpZmZlcmVudCBmcm9tIHRoZSBBUzMgaW1wbGVtZW50YXRpb24gaW5cclxuICogdGhlIHNlbnNlIHRoYXQgbm8gY2FzdGluZyBpcyByZXF1aXJlZCBmcm9tIHRoZVxyXG4gKiBvYmplY3Qgc3VwcGxpZWQgYXMgdGhlIHZpZXcgY29tcG9uZW50LlxyXG4gKlxyXG4gKiAgICAgTXlNZWRpYXRvci5wcm90b3R5cGUuZ2V0Q29tYm9Cb3g9IGZ1bmN0aW9uICgpXHJcbiAqICAgICB7XHJcbiAqICAgICAgICAgcmV0dXJuIHRoaXMudmlld0NvbXBvbmVudDsgIFxyXG4gKiAgICAgfVxyXG4gKlxyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqICBUaGUgdmlldyBjb21wb25lbnRcclxuICovXHJcbk1lZGlhdG9yLnByb3RvdHlwZS5nZXRWaWV3Q29tcG9uZW50PSBmdW5jdGlvbiAoKVxyXG57XHJcbiAgICByZXR1cm4gdGhpcy52aWV3Q29tcG9uZW50O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIExpc3QgdGhlIE5vdGlmaWNhdGlvbiBuYW1lcyB0aGlzIE1lZGlhdG9yIGlzIGludGVyZXN0ZWRcclxuICogaW4gYmVpbmcgbm90aWZpZWQgb2YuXHJcbiAqXHJcbiAqIEByZXR1cm4ge0FycmF5fVxyXG4gKiAgVGhlIGxpc3Qgb2YgTm90aWZpY2F0aW9uIG5hbWVzLlxyXG4gKi9cclxuTWVkaWF0b3IucHJvdG90eXBlLmxpc3ROb3RpZmljYXRpb25JbnRlcmVzdHM9IGZ1bmN0aW9uICgpXHJcbntcclxuICAgIHJldHVybiBbXTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBIYW5kbGUgTm90aWZpY2F0aW9ucy5cclxuICpcclxuICogVHlwaWNhbGx5IHRoaXMgd2lsbCBiZSBoYW5kbGVkIGluIGEgc3dpdGNoIHN0YXRlbWVudFxyXG4gKiB3aXRoIG9uZSAnY2FzZScgZW50cnkgcGVyIE5vdGlmaWNhdGlvbiB0aGUgTWVkaWF0b3JcclxuICogaXMgaW50ZXJlc3RlZCBpblxyXG4gKlxyXG4gKiBAcGFyYW0ge3B1cmVtdmMuTm90aWZpY2F0aW9ufSBub3RpZmljYXRpb25cclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbk1lZGlhdG9yLnByb3RvdHlwZS5oYW5kbGVOb3RpZmljYXRpb249IGZ1bmN0aW9uIChub3RpZmljYXRpb24pXHJcbntcclxuICAgIHJldHVybjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDYWxsZWQgYnkgdGhlIFZpZXcgd2hlbiB0aGUgTWVkaWF0b3IgaXMgcmVnaXN0ZXJlZFxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuTWVkaWF0b3IucHJvdG90eXBlLm9uUmVnaXN0ZXI9IGZ1bmN0aW9uICgpXHJcbntcclxuICAgIHJldHVybjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDYWxsZWQgYnkgdGhlIFZpZXcgd2hlbiB0aGUgTWVkaWF0b3IgaXMgcmVtb3ZlZFxyXG4gKi9cclxuTWVkaWF0b3IucHJvdG90eXBlLm9uUmVtb3ZlPSBmdW5jdGlvbiAoKVxyXG57XHJcbiAgICByZXR1cm47XHJcbn07XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKiBUaGUgTWVkaWF0b3JzIG5hbWUuIFNob3VsZCBvbmx5IGJlIGFjY2Vzc2VkIGJ5IE1lZGlhdG9yIHN1YmNsYXNzZXMuXHJcbiAqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQHR5cGUgc3RyaW5nXHJcbiAqL1xyXG5NZWRpYXRvci5wcm90b3R5cGUubWVkaWF0b3JOYW1lPSBudWxsO1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICogVGhlIE1lZGlhdG9ycyB2aWV3Q29tcG9uZW50LiBTaG91bGQgb25seSBiZSBhY2Nlc3NlZCBieSBNZWRpYXRvciBzdWJjbGFzc2VzLlxyXG4gKlxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEB0eXBlIE9iamVjdFxyXG4gKi9cclxuTWVkaWF0b3IucHJvdG90eXBlLnZpZXdDb21wb25lbnQ9bnVsbDtcclxuLyoqXHJcbiAqIEBhdXRob3IgUHVyZU1WQyBKUyBOYXRpdmUgUG9ydCBieSBEYXZpZCBGb2xleSwgRnLDqWTDqXJpYyBTYXVuaWVyLCAmIEFsYWluIER1Y2hlc25lYXVcclxuICogQGF1dGhvciBDb3B5cmlnaHQoYykgMjAwNi0yMDEyIEZ1dHVyZXNjYWxlLCBJbmMuLCBTb21lIHJpZ2h0cyByZXNlcnZlZC5cclxuICpcclxuICogQGNsYXNzIHB1cmVtdmMuUHJveHlcclxuICogQGV4dGVuZHMgcHVyZW12Yy5Ob3RpZmllclxyXG4gKlxyXG4gKiBBIGJhc2UgUHJveHkgaW1wbGVtZW50YXRpb24uXHJcbiAqXHJcbiAqIEluIFB1cmVNVkMsIFByb3h5IGNsYXNzZXMgYXJlIHVzZWQgdG8gbWFuYWdlIHBhcnRzIG9mIHRoZSBhcHBsaWNhdGlvbidzIGRhdGFcclxuICogbW9kZWwuXHJcbiAqXHJcbiAqIEEgUHJveHkgbWlnaHQgc2ltcGx5IG1hbmFnZSBhIHJlZmVyZW5jZSB0byBhIGxvY2FsIGRhdGEgb2JqZWN0LCBpbiB3aGljaCBjYXNlXHJcbiAqIGludGVyYWN0aW5nIHdpdGggaXQgbWlnaHQgaW52b2x2ZSBzZXR0aW5nIGFuZCBnZXR0aW5nIG9mIGl0cyBkYXRhIGluXHJcbiAqIHN5bmNocm9ub3VzIGZhc2hpb24uXHJcbiAqXHJcbiAqIFByb3h5IGNsYXNzZXMgYXJlIGFsc28gdXNlZCB0byBlbmNhcHN1bGF0ZSB0aGUgYXBwbGljYXRpb24ncyBpbnRlcmFjdGlvbiB3aXRoXHJcbiAqIHJlbW90ZSBzZXJ2aWNlcyB0byBzYXZlIG9yIHJldHJpZXZlIGRhdGEsIGluIHdoaWNoIGNhc2UsIHdlIGFkb3B0IGFuXHJcbiAqIGFzeW5jcm9ub3VzIGlkaW9tOyBzZXR0aW5nIGRhdGEgKG9yIGNhbGxpbmcgYSBtZXRob2QpIG9uIHRoZSBQcm94eSBhbmRcclxuICogbGlzdGVuaW5nIGZvciBhXHJcbiAqIHtAbGluayBwdXJlbXZjLk5vdGlmaWNhdGlvbiBOb3RpZmljYXRpb259XHJcbiAqIHRvIGJlIHNlbnQgIHdoZW4gdGhlIFByb3h5IGhhcyByZXRyaWV2ZWQgdGhlIGRhdGEgZnJvbSB0aGUgc2VydmljZS5cclxuICpcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IFtwcm94eU5hbWVdXHJcbiAqICBUaGUgUHJveHkncyBuYW1lLiBJZiBub25lIGlzIHByb3ZpZGVkLCB0aGUgUHJveHkgd2lsbCB1c2UgaXRzIGNvbnN0cnVjdG9yc1xyXG4gKiAgTkFNRSBwcm9wZXJ0eS5cclxuICogQHBhcmFtIHtPYmplY3R9IFtkYXRhXVxyXG4gKiAgVGhlIFByb3h5J3MgZGF0YSBvYmplY3RcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBQcm94eShwcm94eU5hbWUsIGRhdGEpXHJcbntcclxuICAgIHRoaXMucHJveHlOYW1lPSBwcm94eU5hbWUgfHwgdGhpcy5jb25zdHJ1Y3Rvci5OQU1FO1xyXG4gICAgaWYoZGF0YSAhPSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YShkYXRhKTtcclxuICAgIH1cclxufTtcclxuXHJcblxyXG5Qcm94eS5OQU1FPSBcIlByb3h5XCI7XHJcblxyXG5Qcm94eS5wcm90b3R5cGU9IG5ldyBOb3RpZmllcjtcclxuUHJveHkucHJvdG90eXBlLmNvbnN0cnVjdG9yPSBQcm94eTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIFByb3h5J3MgbmFtZS5cclxuICpcclxuICogQHJldHVybiB7c3RyaW5nfVxyXG4gKi9cclxuUHJveHkucHJvdG90eXBlLmdldFByb3h5TmFtZT0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICByZXR1cm4gdGhpcy5wcm94eU5hbWU7XHJcbn07XHJcblxyXG4vKipcclxuICogU2V0IHRoZSBQcm94eSdzIGRhdGEgb2JqZWN0XHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5Qcm94eS5wcm90b3R5cGUuc2V0RGF0YT0gZnVuY3Rpb24oZGF0YSlcclxue1xyXG4gICAgdGhpcy5kYXRhPSBkYXRhO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgUHJveHkncyBkYXRhIG9iamVjdFxyXG4gKlxyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqL1xyXG5Qcm94eS5wcm90b3R5cGUuZ2V0RGF0YT0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENhbGxlZCBieSB0aGUge0BsaW5rIHB1cmVtdmMuTW9kZWwgTW9kZWx9IHdoZW5cclxuICogdGhlIFByb3h5IGlzIHJlZ2lzdGVyZWQuXHJcbiAqXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5Qcm94eS5wcm90b3R5cGUub25SZWdpc3Rlcj0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICByZXR1cm47XHJcbn07XHJcblxyXG4vKipcclxuICogQ2FsbGVkIGJ5IHRoZSB7QGxpbmsgcHVyZW12Yy5Nb2RlbCBNb2RlbH0gd2hlblxyXG4gKiB0aGUgUHJveHkgaXMgcmVtb3ZlZC5cclxuICpcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcblByb3h5LnByb3RvdHlwZS5vblJlbW92ZT0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICByZXR1cm47XHJcbn07XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKiBUaGUgUHJveHlzIG5hbWUuXHJcbiAqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQHR5cGUgU3RyaW5nXHJcbiAqL1xyXG5Qcm94eS5wcm90b3R5cGUucHJveHlOYW1lPSBudWxsO1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICogVGhlIFByb3h5J3MgZGF0YSBvYmplY3QuXHJcbiAqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQHR5cGUgT2JqZWN0XHJcbiAqL1xyXG5Qcm94eS5wcm90b3R5cGUuZGF0YT0gbnVsbDtcclxuLyoqXHJcbiAqIEBhdXRob3IgUHVyZU1WQyBKUyBOYXRpdmUgUG9ydCBieSBEYXZpZCBGb2xleSwgRnLDqWTDqXJpYyBTYXVuaWVyLCAmIEFsYWluIER1Y2hlc25lYXVcclxuICogQGF1dGhvciBDb3B5cmlnaHQoYykgMjAwNi0yMDEyIEZ1dHVyZXNjYWxlLCBJbmMuLCBTb21lIHJpZ2h0cyByZXNlcnZlZC5cclxuICpcclxuICogQGNsYXNzIHB1cmVtdmMuRmFjYWRlXHJcbiAqIEZhY2FkZSBleHBvc2VzIHRoZSBmdW5jdGlvbmFsaXR5IG9mIHRoZSBDb250cm9sbGVyLCBNb2RlbCBhbmQgVmlld1xyXG4gKiBhY3RvcnMgdG8gY2xpZW50IGZhY2luZyBjb2RlLlxyXG4gKlxyXG4gKiBUaGlzIEZhY2FkZSBpbXBsZW1lbnRhdGlvbiBpcyBhIE11bHRpdG9uLCBzbyB5b3Ugc2hvdWxkIG5vdCBjYWxsIHRoZVxyXG4gKiBjb25zdHJ1Y3RvciBkaXJlY3RseSwgYnV0IGluc3RlYWQgY2FsbCB0aGUgc3RhdGljIEZhY3RvcnkgbWV0aG9kLFxyXG4gKiBwYXNzaW5nIHRoZSB1bmlxdWUga2V5IGZvciB0aGlzIGluc3RhbmNlIHRvICNnZXRJbnN0YW5jZVxyXG4gKlxyXG4gKiBAY29uc3RydWN0b3JcclxuICogQHBhcmFtIHtzdHJpbmd9IGtleVxyXG4gKiBcdFRoZSBtdWx0aXRvbiBrZXkgdG8gdXNlIHRvIHJldHJpZXZlIHRoZSBGYWNhZGUgaW5zdGFuY2UuXHJcbiAqIEB0aHJvd3Mge0Vycm9yfVxyXG4gKiAgSWYgYW4gYXR0ZW1wdCBpcyBtYWRlIHRvIGluc3RhbnRpYXRlIEZhY2FkZSBkaXJlY3RseVxyXG4gKi9cclxuZnVuY3Rpb24gRmFjYWRlKGtleSlcclxue1xyXG4gICAgaWYoRmFjYWRlLmluc3RhbmNlTWFwW2tleV0gIT0gbnVsbClcclxuICAgIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRmFjYWRlLk1VTFRJVE9OX01TRyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5pbml0aWFsaXplTm90aWZpZXIoa2V5KTtcclxuICAgIEZhY2FkZS5pbnN0YW5jZU1hcFtrZXldID0gdGhpcztcclxuICAgIHRoaXMuaW5pdGlhbGl6ZUZhY2FkZSgpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemUgdGhlIE11bHRpdG9uIEZhY2FkZSBpbnN0YW5jZS5cclxuICpcclxuICogQ2FsbGVkIGF1dG9tYXRpY2FsbHkgYnkgdGhlIGNvbnN0cnVjdG9yLiBPdmVycmlkZSBpbiB5b3VyIHN1YmNsYXNzIHRvIGFueVxyXG4gKiBzdWJjbGFzcyBzcGVjaWZpYyBpbml0aWFsaXphdGlvbnMuIEJlIHN1cmUgdG8gY2FsbCB0aGUgJ3N1cGVyJ1xyXG4gKiBpbml0aWFsaXplRmFjYWRlIG1ldGhvZCwgdGhvdWdoXHJcbiAqXHJcbiAqICAgICBNeUZhY2FkZS5wcm90b3R5cGUuaW5pdGlhbGl6ZUZhY2FkZT0gZnVuY3Rpb24gKClcclxuICogICAgIHtcclxuICogICAgICAgICBGYWNhZGUuY2FsbCh0aGlzKTtcclxuICogICAgIH07XHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbkZhY2FkZS5wcm90b3R5cGUuaW5pdGlhbGl6ZUZhY2FkZSA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgdGhpcy5pbml0aWFsaXplTW9kZWwoKTtcclxuICAgIHRoaXMuaW5pdGlhbGl6ZUNvbnRyb2xsZXIoKTtcclxuICAgIHRoaXMuaW5pdGlhbGl6ZVZpZXcoKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBGYWNhZGUgTXVsdGl0b24gRmFjdG9yeSBtZXRob2QuXHJcbiAqIE5vdGUgdGhhdCB0aGlzIG1ldGhvZCB3aWxsIHJldHVybiBudWxsIGlmIHN1cHBsaWVkIGFcclxuICogbnVsbCBvciB1bmRlZmluZWQgbXVsdGl0b24ga2V5LlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5XHJcbiAqIFx0VGhlIG11bHRpdG9uIGtleSB1c2UgdG8gcmV0cmlldmUgYSBwYXJ0aWN1bGFyIEZhY2FkZSBpbnN0YW5jZVxyXG4gKiBAcmV0dXJuIHtwdXJlbXZjLkZhY2FkZX1cclxuICovXHJcbkZhY2FkZS5nZXRJbnN0YW5jZSA9IGZ1bmN0aW9uKGtleSlcclxue1xyXG4gICAgaWYgKG51bGwgPT0ga2V5KVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG5cclxuICAgIGlmKEZhY2FkZS5pbnN0YW5jZU1hcFtrZXldID09IG51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgRmFjYWRlLmluc3RhbmNlTWFwW2tleV0gPSBuZXcgRmFjYWRlKGtleSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIEZhY2FkZS5pbnN0YW5jZU1hcFtrZXldO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemUgdGhlIHtAbGluayBwdXJlbXZjLkNvbnRyb2xsZXIgQ29udHJvbGxlcn0uXHJcbiAqXHJcbiAqIENhbGxlZCBieSB0aGUgI2luaXRpYWxpemVGYWNhZGUgbWV0aG9kLlxyXG4gKlxyXG4gKiBPdmVycmlkZSB0aGlzIG1ldGhvZCBpbiB5b3VyIHN1YmNsYXNzIG9mIEZhY2FkZVxyXG4gKiBpZiBvbmUgb3IgYm90aCBvZiB0aGUgZm9sbG93aW5nIGFyZSB0cnVlOlxyXG4gKiAtIFlvdSB3aXNoIHRvIGluaXRpYWxpemUgYSBkaWZmZXJlbnQgQ29udHJvbGxlclxyXG4gKiAtIFlvdSBoYXZlXHJcbiAqIHtAbGluayBwdXJlbXZjLlNpbXBsZUNvbW1hbmQgU2ltcGxlQ29tbWFuZH1zXHJcbiAqIG9yIHtAbGluayBwdXJlbXZjLk1hY3JvQ29tbWFuZCBNYWNyb0NvbW1hbmR9c1xyXG4gKiB0byByZWdpc3RlciB3aXRoIHRoZSBDb250cm9sbGVyYXQgc3RhcnR1cC5cclxuICpcclxuICogSWYgeW91IGRvbid0IHdhbnQgdG8gaW5pdGlhbGl6ZSBhIGRpZmZlcmVudCBDb250cm9sbGVyLFxyXG4gKiBjYWxsIHRoZSAnc3VwZXInIGluaXRpYWxpemVDb250cm9sbGUgbWV0aG9kIGF0IHRoZSBiZWdpbm5pbmcgb2YgeW91clxyXG4gKiBtZXRob2QsIHRoZW4gcmVnaXN0ZXIgY29tbWFuZHMuXHJcbiAqXHJcbiAqICAgICBNeUZhY2FkZS5wcm90b3R5cGUuaW5pdGlhbGl6ZUNvbnRyb2xsZXI9IGZ1bmN0aW9uICgpXHJcbiAqICAgICB7XHJcbiAqICAgICAgICAgRmFjYWRlLnByb3RvdHlwZS5pbml0aWFsaXplQ29udHJvbGxlci5jYWxsKHRoaXMpO1xyXG4gKiAgICAgICAgIHRoaXMucmVnaXN0ZXJDb21tYW5kKEFwcENvbnN0YW50cy5BX05PVEVfTkFNRSwgQUJlc3Bva2VDb21tYW5kKVxyXG4gKiAgICAgfVxyXG4gKlxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5GYWNhZGUucHJvdG90eXBlLmluaXRpYWxpemVDb250cm9sbGVyID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICBpZih0aGlzLmNvbnRyb2xsZXIgIT0gbnVsbClcclxuICAgICAgICByZXR1cm47XHJcblxyXG4gICAgdGhpcy5jb250cm9sbGVyID0gQ29udHJvbGxlci5nZXRJbnN0YW5jZSh0aGlzLm11bHRpdG9uS2V5KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEluaXRpYWxpemUgdGhlIHtAbGluayBwdXJlbXZjLk1vZGVsIE1vZGVsfTtcclxuICpcclxuICogQ2FsbGVkIGJ5IHRoZSAjaW5pdGlhbGl6ZUZhY2FkZSBtZXRob2QuXHJcbiAqIE92ZXJyaWRlIHRoaXMgbWV0aG9kIGluIHlvdXIgc3ViY2xhc3Mgb2YgRmFjYWRlIGlmIG9uZSBvZiB0aGUgZm9sbG93aW5nIGFyZVxyXG4gKiB0cnVlOlxyXG4gKlxyXG4gKiAtIFlvdSB3aXNoIHRvIGluaXRpYWxpemUgYSBkaWZmZXJlbnQgTW9kZWwuXHJcbiAqXHJcbiAqIC0gWW91IGhhdmUge0BsaW5rIHB1cmVtdmMuUHJveHkgUHJveHl9cyB0b1xyXG4gKiAgIHJlZ2lzdGVyIHdpdGggdGhlIE1vZGVsIHRoYXQgZG8gbm90IHJldHJpZXZlIGEgcmVmZXJlbmNlIHRvIHRoZSBGYWNhZGUgYXRcclxuICogICBjb25zdHJ1Y3Rpb24gdGltZS5cclxuICpcclxuICogSWYgeW91IGRvbid0IHdhbnQgdG8gaW5pdGlhbGl6ZSBhIGRpZmZlcmVudCBNb2RlbFxyXG4gKiBjYWxsICdzdXBlcicgI2luaXRpYWxpemVNb2RlbCBhdCB0aGUgYmVnaW5uaW5nIG9mIHlvdXIgbWV0aG9kLCB0aGVuIHJlZ2lzdGVyXHJcbiAqIFByb3h5cy5cclxuICpcclxuICogTm90ZTogVGhpcyBtZXRob2QgaXMgKnJhcmVseSogb3ZlcnJpZGRlbjsgaW4gcHJhY3RpY2UgeW91IGFyZSBtb3JlXHJcbiAqIGxpa2VseSB0byB1c2UgYSBjb21tYW5kIHRvIGNyZWF0ZSBhbmQgcmVnaXN0ZXJQcm94eXMgd2l0aCB0aGUgTW9kZWw+LFxyXG4gKiBzaW5jZSBQcm94eXMgd2l0aCBtdXRhYmxlIGRhdGEgd2lsbCBsaWtlbHlcclxuICogbmVlZCB0byBzZW5kIE5vdGlmaWNhdGlvbnMgYW5kIHRodXMgd2lsbCBsaWtlbHkgd2FudCB0byBmZXRjaCBhIHJlZmVyZW5jZSB0b1xyXG4gKiB0aGUgRmFjYWRlIGR1cmluZyB0aGVpciBjb25zdHJ1Y3Rpb24uXHJcbiAqXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5GYWNhZGUucHJvdG90eXBlLmluaXRpYWxpemVNb2RlbCA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgaWYodGhpcy5tb2RlbCAhPSBudWxsKVxyXG4gICAgICAgIHJldHVybjtcclxuXHJcbiAgICB0aGlzLm1vZGVsID0gTW9kZWwuZ2V0SW5zdGFuY2UodGhpcy5tdWx0aXRvbktleSk7XHJcbn07XHJcblxyXG4vKipcclxuICogQHByb3RlY3RlZFxyXG4gKlxyXG4gKiBJbml0aWFsaXplIHRoZSB7QGxpbmsgcHVyZW12Yy5WaWV3IFZpZXd9LlxyXG4gKlxyXG4gKiBDYWxsZWQgYnkgdGhlICNpbml0aWFsaXplRmFjYWRlIG1ldGhvZC5cclxuICpcclxuICogT3ZlcnJpZGUgdGhpcyBtZXRob2QgaW4geW91ciBzdWJjbGFzcyBvZiBGYWNhZGUgaWYgb25lIG9yIGJvdGggb2YgdGhlXHJcbiAqIGZvbGxvd2luZyBhcmUgdHJ1ZTpcclxuICpcclxuICogLSBZb3Ugd2lzaCB0byBpbml0aWFsaXplIGEgZGlmZmVyZW50IFZpZXcuXHJcbiAqIC0gWW91IGhhdmUgT2JzZXJ2ZXJzIHRvIHJlZ2lzdGVyIHdpdGggdGhlIFZpZXdcclxuICpcclxuICogSWYgeW91IGRvbid0IHdhbnQgdG8gaW5pdGlhbGl6ZSBhIGRpZmZlcmVudCBWaWV3XHJcbiAqIGNhbGwgJ3N1cGVyJyAjaW5pdGlhbGl6ZVZpZXcgYXQgdGhlIGJlZ2lubmluZyBvZiB5b3VyXHJcbiAqIG1ldGhvZCwgdGhlbiByZWdpc3RlciBNZWRpYXRvciBpbnN0YW5jZXMuXHJcbiAqXHJcbiAqICAgICBNeUZhY2FkZS5wcm90b3R5cGUuaW5pdGlhbGl6ZVZpZXc9IGZ1bmN0aW9uICgpXHJcbiAqICAgICB7XHJcbiAqICAgICAgICAgRmFjYWRlLnByb3RvdHlwZS5pbml0aWFsaXplVmlldy5jYWxsKHRoaXMpO1xyXG4gKiAgICAgICAgIHRoaXMucmVnaXN0ZXJNZWRpYXRvcihuZXcgTXlNZWRpYXRvcigpKTtcclxuICogICAgIH07XHJcbiAqXHJcbiAqIE5vdGU6IFRoaXMgbWV0aG9kIGlzICpyYXJlbHkqIG92ZXJyaWRkZW47IGluIHByYWN0aWNlIHlvdSBhcmUgbW9yZVxyXG4gKiBsaWtlbHkgdG8gdXNlIGEgY29tbWFuZCB0byBjcmVhdGUgYW5kIHJlZ2lzdGVyIE1lZGlhdG9yc1xyXG4gKiB3aXRoIHRoZSBWaWV3LCBzaW5jZSBNZWRpYXRvciBpbnN0YW5jZXMgd2lsbCBuZWVkIHRvIHNlbmRcclxuICogTm90aWZpY2F0aW9ucyBhbmQgdGh1cyB3aWxsIGxpa2VseSB3YW50IHRvIGZldGNoIGEgcmVmZXJlbmNlXHJcbiAqIHRvIHRoZSBGYWNhZGUgZHVyaW5nIHRoZWlyIGNvbnN0cnVjdGlvbi5cclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbkZhY2FkZS5wcm90b3R5cGUuaW5pdGlhbGl6ZVZpZXcgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIGlmKHRoaXMudmlldyAhPSBudWxsKVxyXG4gICAgICAgIHJldHVybjtcclxuXHJcbiAgICB0aGlzLnZpZXcgPSBWaWV3LmdldEluc3RhbmNlKHRoaXMubXVsdGl0b25LZXkpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlZ2lzdGVyIGEgY29tbWFuZCB3aXRoIHRoZSBDb250cm9sbGVyIGJ5IE5vdGlmaWNhdGlvbiBuYW1lXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBub3RpZmljYXRpb25OYW1lXHJcbiAqICBUaGUgbmFtZSBvZiB0aGUgTm90aWZpY2F0aW9uIHRvIGFzc29jaWF0ZSB0aGUgY29tbWFuZCB3aXRoXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbW1hbmRDbGFzc1JlZlxyXG4gKiAgQSByZWZlcmVuY2Ugb3QgdGhlIGNvbW1hbmRzIGNvbnN0cnVjdG9yLlxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuRmFjYWRlLnByb3RvdHlwZS5yZWdpc3RlckNvbW1hbmQgPSBmdW5jdGlvbihub3RpZmljYXRpb25OYW1lLCBjb21tYW5kQ2xhc3NSZWYpXHJcbntcclxuICAgIHRoaXMuY29udHJvbGxlci5yZWdpc3RlckNvbW1hbmQobm90aWZpY2F0aW9uTmFtZSwgY29tbWFuZENsYXNzUmVmKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmUgYSBwcmV2aW91c2x5IHJlZ2lzdGVyZWQgY29tbWFuZCB0byBOb3RpZmljYXRpb24gbWFwcGluZyBmcm9tIHRoZVxyXG4gKiB7QGxpbmsgcHVyZW12Yy5Db250cm9sbGVyI3JlbW92ZUNvbW1hbmQgQ29udHJvbGxlcn1cclxuICogQHBhcmFtIHtzdHJpbmd9IG5vdGlmaWNhdGlvbk5hbWVcclxuICogIFRoZSBuYW1lIG9mIHRoZSB0aGUgTm90aWZpY2F0aW9uIHRvIHJlbW92ZSBmcm9tIHRoZSBjb21tYW5kIG1hcHBpbmcgZm9yLlxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuRmFjYWRlLnByb3RvdHlwZS5yZW1vdmVDb21tYW5kID0gZnVuY3Rpb24obm90aWZpY2F0aW9uTmFtZSlcclxue1xyXG4gICAgdGhpcy5jb250cm9sbGVyLnJlbW92ZUNvbW1hbmQobm90aWZpY2F0aW9uTmFtZSk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ2hlY2sgaWYgYSBjb21tYW5kIGlzIHJlZ2lzdGVyZWQgZm9yIGEgZ2l2ZW4gbm90aWZpY2F0aW9uLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbm90aWZpY2F0aW9uTmFtZVxyXG4gKiAgQSBOb3RpZmljYXRpb24gbmFtZVxyXG4gKiBAcmV0dXJuIHtib29sZWFufVxyXG4gKiAgV2hldGhlciBhIGNvbW1hbiBpcyBjdXJyZW50bHkgcmVnaXN0ZXJlZCBmb3IgdGhlIGdpdmVuIG5vdGlmaWNhdGlvbk5hbWVcclxuICovXHJcbkZhY2FkZS5wcm90b3R5cGUuaGFzQ29tbWFuZCA9IGZ1bmN0aW9uKG5vdGlmaWNhdGlvbk5hbWUpXHJcbntcclxuICAgIHJldHVybiB0aGlzLmNvbnRyb2xsZXIuaGFzQ29tbWFuZChub3RpZmljYXRpb25OYW1lKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZWdpc3RlciBhIFByb3h5IHdpdGggdGhlIHtAbGluayBwdXJlbXZjLk1vZGVsI3JlZ2lzdGVyUHJveHkgTW9kZWx9XHJcbiAqIGJ5IG5hbWUuXHJcbiAqXHJcbiAqIEBwYXJhbSB7cHVyZW12Yy5Qcm94eX0gcHJveHlcclxuICogIFRoZSBQcm94eSBpbnN0YW5jZSB0byBiZSByZWdpc3RlcmVkIHdpdGggdGhlIE1vZGVsLlxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuRmFjYWRlLnByb3RvdHlwZS5yZWdpc3RlclByb3h5ID0gZnVuY3Rpb24ocHJveHkpXHJcbntcclxuICAgIHRoaXMubW9kZWwucmVnaXN0ZXJQcm94eShwcm94eSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0cmlldmUgYSBQcm94eSBmcm9tIHRoZSBNb2RlbFxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJveHlOYW1lXHJcbiAqIEByZXR1cm4ge3B1cmVtdmMuUHJveHl9XHJcbiAqL1xyXG5GYWNhZGUucHJvdG90eXBlLnJldHJpZXZlUHJveHkgPSBmdW5jdGlvbihwcm94eU5hbWUpXHJcbntcclxuICAgIHJldHVybiB0aGlzLm1vZGVsLnJldHJpZXZlUHJveHkocHJveHlOYW1lKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmUgYSBQcm94eSBmcm9tIHRoZSBNb2RlbCBieSBuYW1lXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm94eU5hbWVcclxuICogIFRoZSBuYW1lIG9mIHRoZSBQcm94eVxyXG4gKiBAcmV0dXJuIHtwdXJlbXZjLlByb3h5fVxyXG4gKiAgVGhlIFByb3h5IHRoYXQgd2FzIHJlbW92ZWQgZnJvbSB0aGUgTW9kZWxcclxuICovXHJcbkZhY2FkZS5wcm90b3R5cGUucmVtb3ZlUHJveHkgPSBmdW5jdGlvbihwcm94eU5hbWUpXHJcbntcclxuICAgIHZhciBwcm94eSA9IG51bGw7XHJcbiAgICBpZih0aGlzLm1vZGVsICE9IG51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgcHJveHkgPSB0aGlzLm1vZGVsLnJlbW92ZVByb3h5KHByb3h5TmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHByb3h5O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENoZWNrIGl0IGEgUHJveHkgaXMgcmVnaXN0ZXJlZC5cclxuICogQHBhcmFtIHtzdHJpbmd9IHByb3h5TmFtZVxyXG4gKiAgQSBQcm94eSBuYW1lXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAqICBXaGV0aGVyIGEgUHJveHkgaXMgY3VycmVudGx5IHJlZ2lzdGVyZWQgd2l0aCB0aGUgZ2l2ZW4gcHJveHlOYW1lXHJcbiAqL1xyXG5GYWNhZGUucHJvdG90eXBlLmhhc1Byb3h5ID0gZnVuY3Rpb24ocHJveHlOYW1lKVxyXG57XHJcbiAgICByZXR1cm4gdGhpcy5tb2RlbC5oYXNQcm94eShwcm94eU5hbWUpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlZ2lzdGVyIGEgTWVkaWF0b3Igd2l0aCB3aXRoIHRoZSBWaWV3LlxyXG4gKlxyXG4gKiBAcGFyYW0ge3B1cmVtdmMuTWVkaWF0b3J9IG1lZGlhdG9yXHJcbiAqICBBIHJlZmVyZW5jZSB0byB0aGUgTWVkaWF0b3IgdG8gcmVnaXN0ZXJcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbkZhY2FkZS5wcm90b3R5cGUucmVnaXN0ZXJNZWRpYXRvciA9IGZ1bmN0aW9uKG1lZGlhdG9yKVxyXG57XHJcbiAgICBpZih0aGlzLnZpZXcgIT0gbnVsbClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnZpZXcucmVnaXN0ZXJNZWRpYXRvcihtZWRpYXRvcik7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0cmlldmUgYSBNZWRpYXRvciBmcm9tIHRoZSBWaWV3IGJ5IG5hbWVcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG1lZGlhdG9yTmFtZVxyXG4gKiAgVGhlIE1lZGlhdG9ycyBuYW1lXHJcbiAqIEByZXR1cm4ge3B1cmVtdmMuTWVkaWF0b3J9XHJcbiAqICBUaGUgcmV0cmlldmVkIE1lZGlhdG9yXHJcbiAqL1xyXG5GYWNhZGUucHJvdG90eXBlLnJldHJpZXZlTWVkaWF0b3IgPSBmdW5jdGlvbihtZWRpYXRvck5hbWUpXHJcbntcclxuICAgIHJldHVybiB0aGlzLnZpZXcucmV0cmlldmVNZWRpYXRvcihtZWRpYXRvck5hbWUpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSBhIE1lZGlhdG9yIGZyb20gdGhlIFZpZXcuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZWRpYXRvck5hbWVcclxuICogIFRoZSBuYW1lIG9mIHRoZSBNZWRpYXRvciB0byByZW1vdmUuXHJcbiAqIEByZXR1cm4ge3B1cmVtdmMuTWVkaWF0b3J9XHJcbiAqICBUaGUgcmVtb3ZlZCBNZWRpYXRvclxyXG4gKi9cclxuRmFjYWRlLnByb3RvdHlwZS5yZW1vdmVNZWRpYXRvciA9IGZ1bmN0aW9uKG1lZGlhdG9yTmFtZSlcclxue1xyXG4gICAgdmFyIG1lZGlhdG9yID0gbnVsbDtcclxuICAgIGlmKHRoaXMudmlldyAhPSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIG1lZGlhdG9yID0gdGhpcy52aWV3LnJlbW92ZU1lZGlhdG9yKG1lZGlhdG9yTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG1lZGlhdG9yO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIGEgTWVkaWF0b3IgaXMgcmVnaXN0ZXJlZCBvciBub3QuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZWRpYXRvck5hbWVcclxuICogIEEgTWVkaWF0b3IgbmFtZVxyXG4gKiBAcmV0dXJuIHtib29sZWFufVxyXG4gKiAgV2hldGhlciBhIE1lZGlhdG9yIGlzIHJlZ2lzdGVyZWQgd2l0aCB0aGUgZ2l2ZW4gbWVkaWF0b3JOYW1lXHJcbiAqL1xyXG5GYWNhZGUucHJvdG90eXBlLmhhc01lZGlhdG9yID0gZnVuY3Rpb24obWVkaWF0b3JOYW1lKVxyXG57XHJcbiAgICByZXR1cm4gdGhpcy52aWV3Lmhhc01lZGlhdG9yKG1lZGlhdG9yTmFtZSk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGFuZCBzZW5kIGFcclxuICoge0BsaW5rIHB1cmVtdmMuTm90aWZpY2F0aW9uIE5vdGlmaWNhdGlvbn1cclxuICpcclxuICogS2VlcHMgdXMgZnJvbSBoYXZpbmcgdG8gY29uc3RydWN0IG5ldyBOb3RpZmljYXRpb24gaW5zdGFuY2VzIGluIG91clxyXG4gKiBpbXBsZW1lbnRhdGlvblxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbm90aWZpY2F0aW9uTmFtZVxyXG4gKiAgVGhlIG5hbWUgb2YgdGhlIE5vdGlmaWNhdGlvbiB0byBzZW5kXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBbYm9keV1cclxuICogIFRoZSBib2R5IG9mIHRoZSBub3RpZmljYXRpb25cclxuICogQHBhcmFtIHtzdHJpbmd9IFt0eXBlXVxyXG4gKiAgVGhlIHR5cGUgb2YgdGhlIG5vdGlmaWNhdGlvblxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuRmFjYWRlLnByb3RvdHlwZS5zZW5kTm90aWZpY2F0aW9uID0gZnVuY3Rpb24obm90aWZpY2F0aW9uTmFtZSwgYm9keSwgdHlwZSlcclxue1xyXG4gICAgdGhpcy5ub3RpZnlPYnNlcnZlcnMobmV3IE5vdGlmaWNhdGlvbihub3RpZmljYXRpb25OYW1lLCBib2R5LCB0eXBlKSk7XHJcbn07XHJcblxyXG4vKipcclxuICogTm90aWZ5IHtAbGluayBwdXJlbXZjLk9ic2VydmVyIE9ic2VydmVyfXNcclxuICpcclxuICogVGhpcyBtZXRob2QgaXMgbGVmdCBwdWJsaWMgbW9zdGx5IGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5LCBhbmQgdG8gYWxsb3dcclxuICogeW91IHRvIHNlbmQgY3VzdG9tIG5vdGlmaWNhdGlvbiBjbGFzc2VzIHVzaW5nIHRoZSBmYWNhZGUuXHJcbiAqXHJcbiAqIFVzdWFsbHkgeW91IHNob3VsZCBqdXN0IGNhbGwgc2VuZE5vdGlmaWNhdGlvbiBhbmQgcGFzcyB0aGUgcGFyYW1ldGVycywgbmV2ZXJcclxuICogaGF2aW5nIHRvIGNvbnN0cnVjdCB0aGUgbm90aWZpY2F0aW9uIHlvdXJzZWxmLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3B1cmVtdmMuTm90aWZpY2F0aW9ufSBub3RpZmljYXRpb25cclxuICogIFRoZSBOb3RpZmljYXRpb24gdG8gc2VuZFxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuRmFjYWRlLnByb3RvdHlwZS5ub3RpZnlPYnNlcnZlcnMgPSBmdW5jdGlvbihub3RpZmljYXRpb24pXHJcbntcclxuICAgIGlmKHRoaXMudmlldyAhPSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudmlldy5ub3RpZnlPYnNlcnZlcnMobm90aWZpY2F0aW9uKTtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBJbml0aWFsaXplIHRoZSBGYWNhZGVzIE5vdGlmaWVyIGNhcGFiaWxpdGllcyBieSBzZXR0aW5nIHRoZSBNdWx0aXRvbiBrZXkgZm9yXHJcbiAqIHRoaXMgZmFjYWRlIGluc3RhbmNlLlxyXG4gKlxyXG4gKiBOb3QgY2FsbGVkIGRpcmVjdGx5LCBidXQgaW5zdGVhZCBmcm9tIHRoZSBjb25zdHJ1Y3RvciB3aGVuICNnZXRJbnN0YW5jZSBpc1xyXG4gKiBpbnZva2VkLiBJdCBpcyBuZWNlc3NhcnkgdG8gYmUgcHVibGljIGluIG9yZGVyIHRvIGltcGxlbWVudCBOb3RpZmllclxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5XHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5GYWNhZGUucHJvdG90eXBlLmluaXRpYWxpemVOb3RpZmllciA9IGZ1bmN0aW9uKGtleSlcclxue1xyXG4gICAgdGhpcy5tdWx0aXRvbktleSA9IGtleTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDaGVjayBpZiBhICpDb3JlKiBpcyByZWdpc3RlcmVkIG9yIG5vdFxyXG4gKlxyXG4gKiBAc3RhdGljXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcclxuICogIFRoZSBtdWx0aXRvbiBrZXkgZm9yIHRoZSAqQ29yZSogaW4gcXVlc3Rpb25cclxuICogQHJldHVybiB7Ym9vbGVhbn1cclxuICogIFdoZXRoZXIgYSAqQ29yZSogaXMgcmVnaXN0ZXJlZCB3aXRoIHRoZSBnaXZlbiBrZXlcclxuICovXHJcbkZhY2FkZS5oYXNDb3JlID0gZnVuY3Rpb24oa2V5KVxyXG57XHJcbiAgICByZXR1cm4gRmFjYWRlLmluc3RhbmNlTWFwW2tleV0gIT0gbnVsbDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmUgYSAqQ29yZSpcclxuICpcclxuICogUmVtb3ZlIHRoZSBNb2RlbCwgVmlldywgQ29udHJvbGxlciBhbmQgRmFjYWRlIGZvciBhIGdpdmVuIGtleS5cclxuICpcclxuICogQHN0YXRpY1xyXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5XHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5GYWNhZGUucmVtb3ZlQ29yZSA9IGZ1bmN0aW9uKGtleSlcclxue1xyXG4gICAgaWYoRmFjYWRlLmluc3RhbmNlTWFwW2tleV0gPT0gbnVsbClcclxuICAgICAgICByZXR1cm47XHJcblxyXG4gICAgTW9kZWwucmVtb3ZlTW9kZWwoa2V5KTtcclxuICAgIFZpZXcucmVtb3ZlVmlldyhrZXkpO1xyXG4gICAgQ29udHJvbGxlci5yZW1vdmVDb250cm9sbGVyKGtleSk7XHJcbiAgICBkZWxldGUgRmFjYWRlLmluc3RhbmNlTWFwW2tleV07XHJcbn07XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKiBUaGUgRmFjYWRlcyBjb3JyZXNwb25kaW5nIENvbnRyb2xsZXJcclxuICpcclxuICogQHByb3RlY3RlZFxyXG4gKiBAdHlwZSBwdXJlbXZjLkNvbnRyb2xsZXJcclxuICovXHJcbkZhY2FkZS5wcm90b3R5cGUuY29udHJvbGxlciA9IG51bGw7XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKiBUaGUgRmFjYWRlcyBjb3JyZXNwb25kaW5nIE1vZGVsIGluc3RhbmNlXHJcbiAqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQHR5cGUgcHVyZW12Yy5Nb2RlbFxyXG4gKi9cclxuRmFjYWRlLnByb3RvdHlwZS5tb2RlbCA9IG51bGw7XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKiBUaGUgRmFjYWRlcyBjb3JyZXNwbmRpbmcgVmlldyBpbnN0YW5jZS5cclxuICpcclxuICogQHByb3RlY3RlZFxyXG4gKiBAdHlwZSBwdXJlbXZjLlZpZXdcclxuICovXHJcbkZhY2FkZS5wcm90b3R5cGUudmlldyA9IG51bGw7XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKiBUaGUgRmFjYWRlcyBtdWx0aXRvbiBrZXkuXHJcbiAqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQHR5cGUgc3RyaW5nXHJcbiAqL1xyXG5GYWNhZGUucHJvdG90eXBlLm11bHRpdG9uS2V5ID0gbnVsbDtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqIFRoZSBNdWx0aXRvbiBGYWNhZGUgaW5zdGFuY2UgbWFwLlxyXG4gKiBAc3RhdGljXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQHR5cGUgQXJyYXlcclxuICovXHJcbkZhY2FkZS5pbnN0YW5jZU1hcCA9IFtdO1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICogTWVzc2FnZSBDb25zdGFudHNcclxuICogQHByb3RlY3RlZFxyXG4gKiBAdHlwZSB7c3RyaW5nfVxyXG4gKiBAY29uc3RcclxuICogQHN0YXRpY1xyXG4gKi9cclxuRmFjYWRlLk1VTFRJVE9OX01TRyA9IFwiRmFjYWRlIGluc3RhbmNlIGZvciB0aGlzIE11bHRpdG9uIGtleSBhbHJlYWR5IGNvbnN0cnVjdGVkIVwiO1xyXG4vKipcclxuICogQGF1dGhvciBQdXJlTVZDIEpTIE5hdGl2ZSBQb3J0IGJ5IERhdmlkIEZvbGV5LCBGcsOpZMOpcmljIFNhdW5pZXIsICYgQWxhaW4gRHVjaGVzbmVhdVxyXG4gKiBAYXV0aG9yIENvcHlyaWdodChjKSAyMDA2LTIwMTIgRnV0dXJlc2NhbGUsIEluYy4sIFNvbWUgcmlnaHRzIHJlc2VydmVkLlxyXG4gKlxyXG4gKiBAY2xhc3MgcHVyZW12Yy5WaWV3XHJcbiAqXHJcbiAqIEEgTXVsdGl0b24gVmlldyBpbXBsZW1lbnRhdGlvbi5cclxuICpcclxuICogSW4gUHVyZU1WQywgdGhlIFZpZXcgY2xhc3MgYXNzdW1lcyB0aGVzZSByZXNwb25zaWJpbGl0aWVzXHJcbiAqXHJcbiAqIC0gTWFpbnRhaW4gYSBjYWNoZSBvZiB7QGxpbmsgcHVyZW12Yy5NZWRpYXRvciBNZWRpYXRvcn1cclxuICogICBpbnN0YW5jZXMuXHJcbiAqXHJcbiAqIC0gUHJvdmlkZSBtZXRob2RzIGZvciByZWdpc3RlcmluZywgcmV0cmlldmluZywgYW5kIHJlbW92aW5nXHJcbiAqICAge0BsaW5rIHB1cmVtdmMuTWVkaWF0b3IgTWVkaWF0b3J9LlxyXG4gKlxyXG4gKiAtIE5vdGlmaXlpbmcge0BsaW5rIHB1cmVtdmMuTWVkaWF0b3IgTWVkaWF0b3J9IHdoZW4gdGhleSBhcmUgcmVnaXN0ZXJlZCBvclxyXG4gKiAgIHJlbW92ZWQuXHJcbiAqXHJcbiAqIC0gTWFuYWdpbmcgdGhlIG9ic2VydmVyIGxpc3RzIGZvciBlYWNoIHtAbGluayBwdXJlbXZjLk5vdGlmaWNhdGlvbiBOb3RpZmljYXRpb259XHJcbiAqICAgaW4gdGhlIGFwcGxpY2F0aW9uLlxyXG4gKlxyXG4gKiAtIFByb3ZpZGluZyBhIG1ldGhvZCBmb3IgYXR0YWNoaW5nIHtAbGluayBwdXJlbXZjLk9ic2VydmVyIE9ic2VydmVyfSB0byBhblxyXG4gKiAgIHtAbGluayBwdXJlbXZjLk5vdGlmaWNhdGlvbiBOb3RpZmljYXRpb259J3Mgb2JzZXJ2ZXIgbGlzdC5cclxuICpcclxuICogLSBQcm92aWRpbmcgYSBtZXRob2QgZm9yIGJyb2FkY2FzdGluZyBhIHtAbGluayBwdXJlbXZjLk5vdGlmaWNhdGlvbiBOb3RpZmljYXRpb259LlxyXG4gKlxyXG4gKiAtIE5vdGlmeWluZyB0aGUge0BsaW5rIHB1cmVtdmMuT2JzZXJ2ZXIgT2JzZXJ2ZXJ9cyBvZiBhIGdpdmVuXHJcbiAqICAge0BsaW5rIHB1cmVtdmMuTm90aWZpY2F0aW9uIE5vdGlmaWNhdGlvbn0gd2hlbiBpdCBicm9hZGNhc3QuXHJcbiAqXHJcbiAqIFRoaXMgVmlldyBpbXBsZW1lbnRhdGlvbiBpcyBhIE11bHRpdG9uLCBzbyB5b3Ugc2hvdWxkIG5vdCBjYWxsIHRoZVxyXG4gKiBjb25zdHJ1Y3RvciBkaXJlY3RseSwgYnV0IGluc3RlYWQgY2FsbCB0aGUgc3RhdGljIE11bHRpdG9uXHJcbiAqIEZhY3RvcnkgI2dldEluc3RhbmNlIG1ldGhvZC5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IGtleVxyXG4gKiBAY29uc3RydWN0b3JcclxuICogQHRocm93cyB7RXJyb3J9XHJcbiAqICBpZiBpbnN0YW5jZSBmb3IgdGhpcyBNdWx0aXRvbiBrZXkgaGFzIGFscmVhZHkgYmVlbiBjb25zdHJ1Y3RlZFxyXG4gKi9cclxuZnVuY3Rpb24gVmlldyhrZXkpXHJcbntcclxuICAgIGlmKFZpZXcuaW5zdGFuY2VNYXBba2V5XSAhPSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihWaWV3Lk1VTFRJVE9OX01TRyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMubXVsdGl0b25LZXkgPSBrZXk7XHJcbiAgICBWaWV3Lmluc3RhbmNlTWFwW3RoaXMubXVsdGl0b25LZXldID0gdGhpcztcclxuICAgIHRoaXMubWVkaWF0b3JNYXAgPSBbXTtcclxuICAgIHRoaXMub2JzZXJ2ZXJNYXAgPSBbXTtcclxuICAgIHRoaXMuaW5pdGlhbGl6ZVZpZXcoKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEluaXRpYWxpemUgdGhlIFNpbmdsZXRvbiBWaWV3IGluc3RhbmNlXHJcbiAqXHJcbiAqIENhbGxlZCBhdXRvbWF0aWNhbGx5IGJ5IHRoZSBjb25zdHJ1Y3RvciwgdGhpcyBpcyB5b3VyIG9wcG9ydHVuaXR5IHRvXHJcbiAqIGluaXRpYWxpemUgdGhlIFNpbmdsZXRvbiBpbnN0YW5jZSBpbiB5b3VyIHN1YmNsYXNzIHdpdGhvdXQgb3ZlcnJpZGluZyB0aGVcclxuICogY29uc3RydWN0b3JcclxuICpcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcblZpZXcucHJvdG90eXBlLmluaXRpYWxpemVWaWV3ID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICByZXR1cm47XHJcbn07XHJcblxyXG4vKipcclxuICogVmlldyBTaW5nbGV0b24gRmFjdG9yeSBtZXRob2QuXHJcbiAqIE5vdGUgdGhhdCB0aGlzIG1ldGhvZCB3aWxsIHJldHVybiBudWxsIGlmIHN1cHBsaWVkIGEgbnVsbFxyXG4gKiBvciB1bmRlZmluZWQgbXVsdGl0b24ga2V5LlxyXG4gKlxyXG4gKiBAcmV0dXJuIHtwdXJlbXZjLlZpZXd9XHJcbiAqICBUaGUgU2luZ2xldG9uIGluc3RhbmNlIG9mIFZpZXdcclxuICovXHJcblZpZXcuZ2V0SW5zdGFuY2UgPSBmdW5jdGlvbihrZXkpXHJcbntcclxuICAgIGlmIChudWxsID09IGtleSlcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuXHJcbiAgICBpZihWaWV3Lmluc3RhbmNlTWFwW2tleV0gPT0gbnVsbClcclxuICAgIHtcclxuICAgICAgICBWaWV3Lmluc3RhbmNlTWFwW2tleV0gPSBuZXcgVmlldyhrZXkpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gVmlldy5pbnN0YW5jZU1hcFtrZXldO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlZ2lzdGVyIGFuIE9ic2VydmVyIHRvIGJlIG5vdGlmaWVkIG9mIE5vdGlmaWNhdGlvbnMgd2l0aCBhIGdpdmVuIG5hbWVcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG5vdGlmaWNhdGlvbk5hbWVcclxuICogIFRoZSBuYW1lIG9mIHRoZSBOb3RpZmljYXRpb25zIHRvIG5vdGlmeSB0aGlzIE9ic2VydmVyIG9mXHJcbiAqIEBwYXJhbSB7cHVyZW12Yy5PYnNlcnZlcn0gb2JzZXJ2ZXJcclxuICogIFRoZSBPYnNlcnZlciB0byByZWdpc3Rlci5cclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcblZpZXcucHJvdG90eXBlLnJlZ2lzdGVyT2JzZXJ2ZXIgPSBmdW5jdGlvbihub3RpZmljYXRpb25OYW1lLCBvYnNlcnZlcilcclxue1xyXG4gICAgaWYodGhpcy5vYnNlcnZlck1hcFtub3RpZmljYXRpb25OYW1lXSAhPSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMub2JzZXJ2ZXJNYXBbbm90aWZpY2F0aW9uTmFtZV0ucHVzaChvYnNlcnZlcik7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5vYnNlcnZlck1hcFtub3RpZmljYXRpb25OYW1lXSA9IFtvYnNlcnZlcl07XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogTm90aWZ5IHRoZSBPYnNlcnZlcnNmb3IgYSBwYXJ0aWN1bGFyIE5vdGlmaWNhdGlvbi5cclxuICpcclxuICogQWxsIHByZXZpb3VzbHkgYXR0YWNoZWQgT2JzZXJ2ZXJzIGZvciB0aGlzIE5vdGlmaWNhdGlvbidzXHJcbiAqIGxpc3QgYXJlIG5vdGlmaWVkIGFuZCBhcmUgcGFzc2VkIGEgcmVmZXJlbmNlIHRvIHRoZSBJTm90aWZpY2F0aW9uIGluXHJcbiAqIHRoZSBvcmRlciBpbiB3aGljaCB0aGV5IHdlcmUgcmVnaXN0ZXJlZC5cclxuICpcclxuICogQHBhcmFtIHtwdXJlbXZjLk5vdGlmaWNhdGlvbn0gbm90aWZpY2F0aW9uXHJcbiAqICBUaGUgTm90aWZpY2F0aW9uIHRvIG5vdGlmeSBPYnNlcnZlcnMgb2ZcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcblZpZXcucHJvdG90eXBlLm5vdGlmeU9ic2VydmVycyA9IGZ1bmN0aW9uKG5vdGlmaWNhdGlvbilcclxue1xyXG4gICAgLy8gU0lDXHJcbiAgICBpZih0aGlzLm9ic2VydmVyTWFwW25vdGlmaWNhdGlvbi5nZXROYW1lKCldICE9IG51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIG9ic2VydmVyc19yZWYgPSB0aGlzLm9ic2VydmVyTWFwW25vdGlmaWNhdGlvbi5nZXROYW1lKCldLCBvYnNlcnZlcnMgPSBbXSwgb2JzZXJ2ZXJcclxuXHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IG9ic2VydmVyc19yZWYubGVuZ3RoOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBvYnNlcnZlciA9IG9ic2VydmVyc19yZWZbaV07XHJcbiAgICAgICAgICAgIG9ic2VydmVycy5wdXNoKG9ic2VydmVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBvYnNlcnZlcnMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBvYnNlcnZlciA9IG9ic2VydmVyc1tpXTtcclxuICAgICAgICAgICAgb2JzZXJ2ZXIubm90aWZ5T2JzZXJ2ZXIobm90aWZpY2F0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlIHRoZSBPYnNlcnZlciBmb3IgYSBnaXZlbiBub3RpZnlDb250ZXh0IGZyb20gYW4gb2JzZXJ2ZXIgbGlzdCBmb3JcclxuICogYSBnaXZlbiBOb3RpZmljYXRpb24gbmFtZVxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbm90aWZpY2F0aW9uTmFtZVxyXG4gKiAgV2hpY2ggb2JzZXJ2ZXIgbGlzdCB0byByZW1vdmUgZnJvbVxyXG4gKiBAcGFyYW0ge09iamVjdH0gbm90aWZ5Q29udGV4dFxyXG4gKiAgUmVtb3ZlIHRoZSBPYnNlcnZlciB3aXRoIHRoaXMgb2JqZWN0IGFzIGl0cyBub3RpZnlDb250ZXh0XHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5WaWV3LnByb3RvdHlwZS5yZW1vdmVPYnNlcnZlciA9IGZ1bmN0aW9uKG5vdGlmaWNhdGlvbk5hbWUsIG5vdGlmeUNvbnRleHQpXHJcbntcclxuICAgIC8vIFNJQ1xyXG4gICAgdmFyIG9ic2VydmVycyA9IHRoaXMub2JzZXJ2ZXJNYXBbbm90aWZpY2F0aW9uTmFtZV07XHJcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgb2JzZXJ2ZXJzLmxlbmd0aDsgaSsrKVxyXG4gICAge1xyXG4gICAgICAgIGlmKG9ic2VydmVyc1tpXS5jb21wYXJlTm90aWZ5Q29udGV4dChub3RpZnlDb250ZXh0KSA9PSB0cnVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgb2JzZXJ2ZXJzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmKG9ic2VydmVycy5sZW5ndGggPT0gMClcclxuICAgIHtcclxuICAgICAgICBkZWxldGUgdGhpcy5vYnNlcnZlck1hcFtub3RpZmljYXRpb25OYW1lXTtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZWdpc3RlciBhIE1lZGlhdG9yIGluc3RhbmNlIHdpdGggdGhlIFZpZXcuXHJcbiAqXHJcbiAqIFJlZ2lzdGVycyB0aGUgTWVkaWF0b3Igc28gdGhhdCBpdCBjYW4gYmUgcmV0cmlldmVkIGJ5IG5hbWUsXHJcbiAqIGFuZCBmdXJ0aGVyIGludGVycm9nYXRlcyB0aGUgTWVkaWF0b3IgZm9yIGl0c1xyXG4gKiB7QGxpbmsgcHVyZW12Yy5NZWRpYXRvciNsaXN0Tm90aWZpY2F0aW9uSW50ZXJlc3RzIGludGVyZXN0c30uXHJcbiAqXHJcbiAqIElmIHRoZSBNZWRpYXRvciByZXR1cm5zIGFueSBOb3RpZmljYXRpb25cclxuICogbmFtZXMgdG8gYmUgbm90aWZpZWQgYWJvdXQsIGFuIE9ic2VydmVyIGlzIGNyZWF0ZWQgZW5jYXBzdWxhdGluZ1xyXG4gKiB0aGUgTWVkaWF0b3IgaW5zdGFuY2Unc1xyXG4gKiB7QGxpbmsgcHVyZW12Yy5NZWRpYXRvciNoYW5kbGVOb3RpZmljYXRpb24gaGFuZGxlTm90aWZpY2F0aW9ufVxyXG4gKiBtZXRob2QgYW5kIHJlZ2lzdGVyaW5nIGl0IGFzIGFuIE9ic2VydmVyIGZvciBhbGwgTm90aWZpY2F0aW9ucyB0aGVcclxuICogTWVkaWF0b3IgaXMgaW50ZXJlc3RlZCBpbi5cclxuICpcclxuICogQHBhcmFtIHtwdXJlbXZjLk1lZGlhdG9yfVxyXG4gKiAgYSByZWZlcmVuY2UgdG8gdGhlIE1lZGlhdG9yIGluc3RhbmNlXHJcbiAqL1xyXG5WaWV3LnByb3RvdHlwZS5yZWdpc3Rlck1lZGlhdG9yID0gZnVuY3Rpb24obWVkaWF0b3IpXHJcbntcclxuICAgIGlmKHRoaXMubWVkaWF0b3JNYXBbbWVkaWF0b3IuZ2V0TWVkaWF0b3JOYW1lKCldICE9IG51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIG1lZGlhdG9yLmluaXRpYWxpemVOb3RpZmllcih0aGlzLm11bHRpdG9uS2V5KTtcclxuICAgIC8vIHJlZ2lzdGVyIHRoZSBtZWRpYXRvciBmb3IgcmV0cmlldmFsIGJ5IG5hbWVcclxuICAgIHRoaXMubWVkaWF0b3JNYXBbbWVkaWF0b3IuZ2V0TWVkaWF0b3JOYW1lKCldID0gbWVkaWF0b3I7XHJcblxyXG4gICAgLy8gZ2V0IG5vdGlmaWNhdGlvbiBpbnRlcmVzdHMgaWYgYW55XHJcbiAgICB2YXIgaW50ZXJlc3RzID0gbWVkaWF0b3IubGlzdE5vdGlmaWNhdGlvbkludGVyZXN0cygpO1xyXG5cclxuICAgIC8vIHJlZ2lzdGVyIG1lZGlhdG9yIGFzIGFuIG9ic2VydmVyIGZvciBlYWNoIG5vdGlmaWNhdGlvblxyXG4gICAgaWYoaW50ZXJlc3RzLmxlbmd0aCA+IDApXHJcbiAgICB7XHJcbiAgICAgICAgLy8gY3JlYXRlIG9ic2VydmVyIHJlZmVyZW5jaW5nIHRoaXMgbWVkaWF0b3JzIGhhbmRsZU5vdGlmaWNhdGlvbiBtZXRob2RcclxuICAgICAgICB2YXIgb2JzZXJ2ZXIgPSBuZXcgT2JzZXJ2ZXIobWVkaWF0b3IuaGFuZGxlTm90aWZpY2F0aW9uLCBtZWRpYXRvcik7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGludGVyZXN0cy5sZW5ndGg7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJPYnNlcnZlcihpbnRlcmVzdHNbaV0sIG9ic2VydmVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbWVkaWF0b3Iub25SZWdpc3RlcigpO1xyXG59XHJcblxyXG4vKipcclxuICogUmV0cmlldmUgYSBNZWRpYXRvciBmcm9tIHRoZSBWaWV3XHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZWRpYXRvck5hbWVcclxuICogIFRoZSBuYW1lIG9mIHRoZSBNZWRpYXRvciBpbnN0YW5jZSB0byByZXRyaWV2ZVxyXG4gKiBAcmV0dXJuIHtwdXJlbXZjLk1lZGlhdG9yfVxyXG4gKiAgVGhlIE1lZGlhdG9yIGluc3RhbmNlIHByZXZpb3VzbHkgcmVnaXN0ZXJlZCB3aXRoIHRoZSBnaXZlbiBtZWRpYXRvck5hbWVcclxuICovXHJcblZpZXcucHJvdG90eXBlLnJldHJpZXZlTWVkaWF0b3IgPSBmdW5jdGlvbihtZWRpYXRvck5hbWUpXHJcbntcclxuICAgIHJldHVybiB0aGlzLm1lZGlhdG9yTWFwW21lZGlhdG9yTmFtZV07XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlIGEgTWVkaWF0b3IgZnJvbSB0aGUgVmlldy5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG1lZGlhdG9yTmFtZVxyXG4gKiAgTmFtZSBvZiB0aGUgTWVkaWF0b3IgaW5zdGFuY2UgdG8gYmUgcmVtb3ZlZFxyXG4gKiBAcmV0dXJuIHtwdXJlbXZjLk1lZGlhdG9yfVxyXG4gKiAgVGhlIE1lZGlhdG9yIHRoYXQgd2FzIHJlbW92ZWQgZnJvbSB0aGUgVmlld1xyXG4gKi9cclxuVmlldy5wcm90b3R5cGUucmVtb3ZlTWVkaWF0b3IgPSBmdW5jdGlvbihtZWRpYXRvck5hbWUpXHJcbntcclxuICAgIHZhciBtZWRpYXRvciA9IHRoaXMubWVkaWF0b3JNYXBbbWVkaWF0b3JOYW1lXTtcclxuICAgIGlmKG1lZGlhdG9yKVxyXG4gICAge1xyXG4gICAgICAgIC8vIGZvciBldmVyeSBub3RpZmljYXRpb24gdGhlIG1lZGlhdG9yIGlzIGludGVyZXN0ZWQgaW4uLi5cclxuICAgICAgICB2YXIgaW50ZXJlc3RzID0gbWVkaWF0b3IubGlzdE5vdGlmaWNhdGlvbkludGVyZXN0cygpO1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBpbnRlcmVzdHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyByZW1vdmUgdGhlIG9ic2VydmVyIGxpbmtpbmcgdGhlIG1lZGlhdG9yIHRvIHRoZSBub3RpZmljYXRpb25cclxuICAgICAgICAgICAgLy8gaW50ZXJlc3RcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVPYnNlcnZlcihpbnRlcmVzdHNbaV0sIG1lZGlhdG9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHJlbW92ZSB0aGUgbWVkaWF0b3IgZnJvbSB0aGUgbWFwXHJcbiAgICAgICAgZGVsZXRlIHRoaXMubWVkaWF0b3JNYXBbbWVkaWF0b3JOYW1lXTtcclxuXHJcbiAgICAgICAgLy8gYWxlcnQgdGhlIG1lZGlhdG9yIHRoYXQgaXQgaGFzIGJlZW4gcmVtb3ZlZFxyXG4gICAgICAgIG1lZGlhdG9yLm9uUmVtb3ZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG1lZGlhdG9yO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIGEgTWVkaWF0b3IgaXMgcmVnaXN0ZXJlZCBvciBub3QuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZWRpYXRvck5hbWVcclxuICogQHJldHVybiB7Ym9vbGVhbn1cclxuICogIFdoZXRoZXIgYSBNZWRpYXRvciBpcyByZWdpc3RlcmVkIHdpdGggdGhlIGdpdmVuIG1lZGlhdG9ybmFtZVxyXG4gKi9cclxuVmlldy5wcm90b3R5cGUuaGFzTWVkaWF0b3IgPSBmdW5jdGlvbihtZWRpYXRvck5hbWUpXHJcbntcclxuICAgIHJldHVybiB0aGlzLm1lZGlhdG9yTWFwW21lZGlhdG9yTmFtZV0gIT0gbnVsbDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmUgYSBWaWV3IGluc3RhbmNlXHJcbiAqXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5WaWV3LnJlbW92ZVZpZXcgPSBmdW5jdGlvbihrZXkpXHJcbntcclxuICAgIGRlbGV0ZSBWaWV3Lmluc3RhbmNlTWFwW2tleV07XHJcbn07XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKiBUaGUgVmlld3MgaW50ZXJuYWwgbWFwcGluZyBvZiBtZWRpYXRvciBuYW1lcyB0byBtZWRpYXRvciBpbnN0YW5jZXNcclxuICpcclxuICogQHR5cGUgQXJyYXlcclxuICogQHByb3RlY3RlZFxyXG4gKi9cclxuVmlldy5wcm90b3R5cGUubWVkaWF0b3JNYXAgPSBudWxsO1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICogVGhlIFZpZXdzIGludGVybmFsIG1hcHBpbmcgb2YgTm90aWZpY2F0aW9uIG5hbWVzIHRvIE9ic2VydmVyIGxpc3RzXHJcbiAqXHJcbiAqIEB0eXBlIEFycmF5XHJcbiAqIEBwcm90ZWN0ZWRcclxuICovXHJcblZpZXcucHJvdG90eXBlLm9ic2VydmVyTWFwID0gbnVsbDtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqIFRoZSBpbnRlcm5hbCBtYXAgdXNlZCB0byBzdG9yZSBtdWx0aXRvbiBWaWV3IGluc3RhbmNlc1xyXG4gKlxyXG4gKiBAdHlwZSBBcnJheVxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqL1xyXG5WaWV3Lmluc3RhbmNlTWFwID0gW107XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKiBUaGUgVmlld3MgaW50ZXJuYWwgbXVsdGl0b24ga2V5LlxyXG4gKlxyXG4gKiBAdHlwZSBzdHJpbmdcclxuICogQHByb3RlY3RlZFxyXG4gKi9cclxuVmlldy5wcm90b3R5cGUubXVsdGl0b25LZXkgPSBudWxsO1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICogVGhlIGVycm9yIG1lc3NhZ2UgdXNlZCBpZiBhbiBhdHRlbXB0IGlzIG1hZGUgdG8gaW5zdGFudGlhdGUgVmlldyBkaXJlY3RseVxyXG4gKlxyXG4gKiBAdHlwZSBzdHJpbmdcclxuICogQHByb3RlY3RlZFxyXG4gKiBAY29uc3RcclxuICogQHN0YXRpY1xyXG4gKi9cclxuVmlldy5NVUxUSVRPTl9NU0cgPSBcIlZpZXcgaW5zdGFuY2UgZm9yIHRoaXMgTXVsdGl0b24ga2V5IGFscmVhZHkgY29uc3RydWN0ZWQhXCI7XHJcbi8qKlxyXG4gKiBAYXV0aG9yIFB1cmVNVkMgSlMgTmF0aXZlIFBvcnQgYnkgRGF2aWQgRm9sZXksIEZyw6lkw6lyaWMgU2F1bmllciwgJiBBbGFpbiBEdWNoZXNuZWF1XHJcbiAqIEBhdXRob3IgQ29weXJpZ2h0KGMpIDIwMDYtMjAxMiBGdXR1cmVzY2FsZSwgSW5jLiwgU29tZSByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIEBjbGFzcyBwdXJlbXZjLk1vZGVsXHJcbiAqXHJcbiAqIEEgTXVsdGl0b24gTW9kZWwgaW1wbGVtZW50YXRpb24uXHJcbiAqXHJcbiAqIEluIFB1cmVNVkMsIHRoZSBNb2RlbCBjbGFzcyBwcm92aWRlc1xyXG4gKiBhY2Nlc3MgdG8gbW9kZWwgb2JqZWN0cyAoUHJveGllcykgYnkgbmFtZWQgbG9va3VwLlxyXG4gKlxyXG4gKiBUaGUgTW9kZWwgYXNzdW1lcyB0aGVzZSByZXNwb25zaWJpbGl0aWVzOlxyXG4gKlxyXG4gKiAtIE1haW50YWluIGEgY2FjaGUgb2Yge0BsaW5rIHB1cmVtdmMuUHJveHkgUHJveHl9XHJcbiAqICAgaW5zdGFuY2VzLlxyXG4gKiAtIFByb3ZpZGUgbWV0aG9kcyBmb3IgcmVnaXN0ZXJpbmcsIHJldHJpZXZpbmcsIGFuZCByZW1vdmluZ1xyXG4gKiAgIHtAbGluayBwdXJlbXZjLlByb3h5IFByb3h5fSBpbnN0YW5jZXMuXHJcbiAqXHJcbiAqIFlvdXIgYXBwbGljYXRpb24gbXVzdCByZWdpc3RlclxyXG4gKiB7QGxpbmsgcHVyZW12Yy5Qcm94eSBQcm94eX0gaW5zdGFuY2VzIHdpdGggdGhlIE1vZGVsLlxyXG4gKiBUeXBpY2FsbHksIHlvdSB1c2UgYVxyXG4gKiB7QGxpbmsgcHVyZW12Yy5TaW1wbGVDb21tYW5kIFNpbXBsZUNvbW1hbmR9XHJcbiAqIG9yXHJcbiAqIHtAbGluayBwdXJlbXZjLk1hY3JvQ29tbWFuZCBNYWNyb0NvbW1hbmR9XHJcbiAqIHRvIGNyZWF0ZSBhbmQgcmVnaXN0ZXIgUHJveHkgaW5zdGFuY2VzIG9uY2UgdGhlIEZhY2FkZSBoYXMgaW5pdGlhbGl6ZWQgdGhlXHJcbiAqICpDb3JlKiBhY3RvcnMuXHJcbiAqXHJcbiAqIFRoaXMgTW9kZWwgaW1wbGVtZW50YXRpb24gaXMgYSBNdWx0aXRvbiwgc28geW91IHNob3VsZCBub3QgY2FsbCB0aGVcclxuICogY29uc3RydWN0b3IgZGlyZWN0bHksIGJ1dCBpbnN0ZWFkIGNhbGwgdGhlXHJcbiAqIHtAbGluayAjZ2V0SW5zdGFuY2Ugc3RhdGljIE11bHRpdG9uIEZhY3RvcnkgbWV0aG9kfVxyXG4gKiBAY29uc3RydWN0b3JcclxuICogQHBhcmFtIHtzdHJpbmd9IGtleVxyXG4gKiAgVGhlIE1vZGVscyBtdWx0aXRvbiBrZXlcclxuICogQHRocm93cyB7RXJyb3J9XHJcbiAqICBBbiBlcnJvciBpcyB0aHJvd24gaWYgdGhpcyBtdWx0aXRvbnMga2V5IGlzIGFscmVhZHkgaW4gdXNlIGJ5IGFub3RoZXIgaW5zdGFuY2VcclxuICovXHJcbmZ1bmN0aW9uIE1vZGVsKGtleSlcclxue1xyXG4gICAgaWYoTW9kZWwuaW5zdGFuY2VNYXBba2V5XSlcclxuICAgIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoTW9kZWwuTVVMVElUT05fTVNHKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm11bHRpdG9uS2V5PSBrZXk7XHJcbiAgICBNb2RlbC5pbnN0YW5jZU1hcFtrZXldPSB0aGlzO1xyXG4gICAgdGhpcy5wcm94eU1hcD0gW107XHJcbiAgICB0aGlzLmluaXRpYWxpemVNb2RlbCgpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemUgdGhlIE1vZGVsIGluc3RhbmNlLlxyXG4gKlxyXG4gKiBDYWxsZWQgYXV0b21hdGljYWxseSBieSB0aGUgY29uc3RydWN0b3IsIHRoaXNcclxuICogaXMgeW91ciBvcHBvcnR1bml0eSB0byBpbml0aWFsaXplIHRoZSBTaW5nbGV0b25cclxuICogaW5zdGFuY2UgaW4geW91ciBzdWJjbGFzcyB3aXRob3V0IG92ZXJyaWRpbmcgdGhlXHJcbiAqIGNvbnN0cnVjdG9yLlxyXG4gKlxyXG4gKiBAcmV0dXJuIHZvaWRcclxuICovXHJcbk1vZGVsLnByb3RvdHlwZS5pbml0aWFsaXplTW9kZWw9IGZ1bmN0aW9uKCl7fTtcclxuXHJcblxyXG4vKipcclxuICogTW9kZWwgTXVsdGl0b24gRmFjdG9yeSBtZXRob2QuXHJcbiAqIE5vdGUgdGhhdCB0aGlzIG1ldGhvZCB3aWxsIHJldHVybiBudWxsIGlmIHN1cHBsaWVkIGEgbnVsbFxyXG4gKiBvciB1bmRlZmluZWQgbXVsdGl0b24ga2V5LlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5XHJcbiAqICBUaGUgbXVsdGl0b24ga2V5IGZvciB0aGUgTW9kZWwgdG8gcmV0cmlldmVcclxuICogQHJldHVybiB7cHVyZW12Yy5Nb2RlbH1cclxuICogIHRoZSBpbnN0YW5jZSBmb3IgdGhpcyBNdWx0aXRvbiBrZXlcclxuICovXHJcbk1vZGVsLmdldEluc3RhbmNlPSBmdW5jdGlvbihrZXkpXHJcbntcclxuICAgIGlmIChudWxsID09IGtleSlcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuXHJcbiAgICBpZihNb2RlbC5pbnN0YW5jZU1hcFtrZXldID09IG51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgTW9kZWwuaW5zdGFuY2VNYXBba2V5XT0gbmV3IE1vZGVsKGtleSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIE1vZGVsLmluc3RhbmNlTWFwW2tleV07XHJcbn07XHJcblxyXG4vKipcclxuICogUmVnaXN0ZXIgYSBQcm94eSB3aXRoIHRoZSBNb2RlbFxyXG4gKiBAcGFyYW0ge3B1cmVtdmMuUHJveHl9XHJcbiAqL1xyXG5Nb2RlbC5wcm90b3R5cGUucmVnaXN0ZXJQcm94eT0gZnVuY3Rpb24ocHJveHkpXHJcbntcclxuICAgIHByb3h5LmluaXRpYWxpemVOb3RpZmllcih0aGlzLm11bHRpdG9uS2V5KTtcclxuICAgIHRoaXMucHJveHlNYXBbcHJveHkuZ2V0UHJveHlOYW1lKCldPSBwcm94eTtcclxuICAgIHByb3h5Lm9uUmVnaXN0ZXIoKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXRyaWV2ZSBhIFByb3h5IGZyb20gdGhlIE1vZGVsXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm94eU5hbWVcclxuICogQHJldHVybiB7cHVyZW12Yy5Qcm94eX1cclxuICogIFRoZSBQcm94eSBpbnN0YW5jZSBwcmV2aW91c2x5IHJlZ2lzdGVyZWQgd2l0aCB0aGUgcHJvdmlkZWQgcHJveHlOYW1lXHJcbiAqL1xyXG5Nb2RlbC5wcm90b3R5cGUucmV0cmlldmVQcm94eT0gZnVuY3Rpb24ocHJveHlOYW1lKVxyXG57XHJcbiAgICByZXR1cm4gdGhpcy5wcm94eU1hcFtwcm94eU5hbWVdO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIGEgUHJveHkgaXMgcmVnaXN0ZXJlZFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJveHlOYW1lXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAqICB3aGV0aGVyIGEgUHJveHkgaXMgY3VycmVudGx5IHJlZ2lzdGVyZWQgd2l0aCB0aGUgZ2l2ZW4gcHJveHlOYW1lLlxyXG4gKi9cclxuTW9kZWwucHJvdG90eXBlLmhhc1Byb3h5PSBmdW5jdGlvbihwcm94eU5hbWUpXHJcbntcclxuICAgIHJldHVybiB0aGlzLnByb3h5TWFwW3Byb3h5TmFtZV0gIT0gbnVsbDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmUgYSBQcm94eSBmcm9tIHRoZSBNb2RlbC5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHByb3h5TmFtZVxyXG4gKiAgVGhlIG5hbWUgb2YgdGhlIFByb3h5IGluc3RhbmNlIHRvIHJlbW92ZVxyXG4gKiBAcmV0dXJuIHtwdXJlbXZjLlByb3h5fVxyXG4gKiAgVGhlIFByb3h5IHRoYXQgd2FzIHJlbW92ZWQgZnJvbSB0aGUgTW9kZWxcclxuICovXHJcbk1vZGVsLnByb3RvdHlwZS5yZW1vdmVQcm94eT0gZnVuY3Rpb24ocHJveHlOYW1lKVxyXG57XHJcbiAgICB2YXIgcHJveHk9IHRoaXMucHJveHlNYXBbcHJveHlOYW1lXTtcclxuICAgIGlmKHByb3h5KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMucHJveHlNYXBbcHJveHlOYW1lXT0gbnVsbDtcclxuICAgICAgICBwcm94eS5vblJlbW92ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBwcm94eTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAc3RhdGljXHJcbiAqIFJlbW92ZSBhIE1vZGVsIGluc3RhbmNlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5XHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5Nb2RlbC5yZW1vdmVNb2RlbD0gZnVuY3Rpb24oa2V5KVxyXG57XHJcbiAgICBkZWxldGUgTW9kZWwuaW5zdGFuY2VNYXBba2V5XTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqIFRoZSBtYXAgdXNlZCBieSB0aGUgTW9kZWwgdG8gc3RvcmUgUHJveHkgaW5zdGFuY2VzLlxyXG4gKlxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEB0eXBlIEFycmF5XHJcbiAqL1xyXG5Nb2RlbC5wcm90b3R5cGUucHJveHlNYXA9IG51bGw7XHJcblxyXG4vKipcclxuICogQGlnbm9yZVxyXG4gKiBUaGUgbWFwIHVzZWQgYnkgdGhlIE1vZGVsIHRvIHN0b3JlIG11bHRpdG9uIGluc3RhbmNlc1xyXG4gKlxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEBzdGF0aWNcclxuICogQHR5cGUgQXJyYXlcclxuICovXHJcbk1vZGVsLmluc3RhbmNlTWFwPSBbXTtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqIFRoZSBNb2RlbHMgbXVsdGl0b24ga2V5LlxyXG4gKlxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEB0eXBlIHN0cmluZ1xyXG4gKi9cclxuTW9kZWwucHJvdG90eXBlLm11bHRpdG9uS2V5O1xyXG5cclxuLyoqXHJcbiAqIEBpZ25vcmVcclxuICogTWVzc2FnZSBDb25zdGFudHNcclxuICpcclxuICogQHN0YXRpY1xyXG4gKiBAdHlwZSB7c3RyaW5nfVxyXG4gKi9cclxuTW9kZWwuTVVMVElUT05fTVNHPSBcIk1vZGVsIGluc3RhbmNlIGZvciB0aGlzIE11bHRpdG9uIGtleSBhbHJlYWR5IGNvbnN0cnVjdGVkIVwiO1xyXG4vKipcclxuICogQGF1dGhvciBQdXJlTVZDIEpTIE5hdGl2ZSBQb3J0IGJ5IERhdmlkIEZvbGV5LCBGcsOpZMOpcmljIFNhdW5pZXIsICYgQWxhaW4gRHVjaGVzbmVhdVxyXG4gKiBAYXV0aG9yIENvcHlyaWdodChjKSAyMDA2LTIwMTIgRnV0dXJlc2NhbGUsIEluYy4sIFNvbWUgcmlnaHRzIHJlc2VydmVkLlxyXG4gKlxyXG4gKiBAY2xhc3MgcHVyZW12Yy5Db250cm9sbGVyXHJcbiAqXHJcbiAqIEluIFB1cmVNVkMsIHRoZSBDb250cm9sbGVyIGNsYXNzIGZvbGxvd3MgdGhlICdDb21tYW5kIGFuZCBDb250cm9sbGVyJ1xyXG4gKiBzdHJhdGVneSwgYW5kIGFzc3VtZXMgdGhlc2UgcmVzcG9uc2liaWxpdGllczpcclxuICpcclxuICogLSBSZW1lbWJlcmluZyB3aGljaFxyXG4gKiB7QGxpbmsgcHVyZW12Yy5TaW1wbGVDb21tYW5kIFNpbXBsZUNvbW1hbmR9c1xyXG4gKiBvclxyXG4gKiB7QGxpbmsgcHVyZW12Yy5NYWNyb0NvbW1hbmQgTWFjcm9Db21tYW5kfXNcclxuICogYXJlIGludGVuZGVkIHRvIGhhbmRsZSB3aGljaFxyXG4gKiB7QGxpbmsgcHVyZW12Yy5Ob3RpZmljYXRpb24gTm90aWZpY2F0aW9ufXNcclxuICogLSBSZWdpc3RlcmluZyBpdHNlbGYgYXMgYW5cclxuICoge0BsaW5rIHB1cmVtdmMuT2JzZXJ2ZXIgT2JzZXJ2ZXJ9IHdpdGhcclxuICogdGhlIHtAbGluayBwdXJlbXZjLlZpZXcgVmlld30gZm9yIGVhY2hcclxuICoge0BsaW5rIHB1cmVtdmMuTm90aWZpY2F0aW9uIE5vdGlmaWNhdGlvbn1cclxuICogdGhhdCBpdCBoYXMgYW5cclxuICoge0BsaW5rIHB1cmVtdmMuU2ltcGxlQ29tbWFuZCBTaW1wbGVDb21tYW5kfVxyXG4gKiBvciB7QGxpbmsgcHVyZW12Yy5NYWNyb0NvbW1hbmQgTWFjcm9Db21tYW5kfVxyXG4gKiBtYXBwaW5nIGZvci5cclxuICogLSBDcmVhdGluZyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgcHJvcGVyXHJcbiAqIHtAbGluayBwdXJlbXZjLlNpbXBsZUNvbW1hbmQgU2ltcGxlQ29tbWFuZH1zXHJcbiAqIG9yXHJcbiAqIHtAbGluayBwdXJlbXZjLk1hY3JvQ29tbWFuZCBNYWNyb0NvbW1hbmR9c1xyXG4gKiB0byBoYW5kbGUgYSBnaXZlblxyXG4gKiB7QGxpbmsgcHVyZW12Yy5Ob3RpZmljYXRpb24gTm90aWZpY2F0aW9ufVxyXG4gKiB3aGVuIG5vdGlmaWVkIGJ5IHRoZVxyXG4gKiB7QGxpbmsgcHVyZW12Yy5WaWV3IFZpZXd9LlxyXG4gKiAtIENhbGxpbmcgdGhlIGNvbW1hbmQncyBleGVjdXRlIG1ldGhvZCwgcGFzc2luZyBpbiB0aGVcclxuICoge0BsaW5rIHB1cmVtdmMuTm90aWZpY2F0aW9uIE5vdGlmaWNhdGlvbn0uXHJcbiAqXHJcbiAqIFlvdXIgYXBwbGljYXRpb24gbXVzdCByZWdpc3RlclxyXG4gKiB7QGxpbmsgcHVyZW12Yy5TaW1wbGVDb21tYW5kIFNpbXBsZUNvbW1hbmR9c1xyXG4gKiBvciB7QGxpbmsgcHVyZW12Yy5NYWNyb0NvbW1hbmQgTWFjcm9Db21tYW5kfXNcclxuICogd2l0aCB0aGUgQ29udHJvbGxlci5cclxuICpcclxuICogVGhlIHNpbXBsZXN0IHdheSBpcyB0byBzdWJjbGFzc1xyXG4gKiB7QGxpbmsgcHVyZW12Yy5GYWNhZGUgRmFjYWRlfSxcclxuICogYW5kIHVzZSBpdHNcclxuICoge0BsaW5rIHB1cmVtdmMuRmFjYWRlI2luaXRpYWxpemVDb250cm9sbGVyIGluaXRpYWxpemVDb250cm9sbGVyfVxyXG4gKiBtZXRob2QgdG8gYWRkIHlvdXIgcmVnaXN0cmF0aW9ucy5cclxuICpcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqIFRoaXMgQ29udHJvbGxlciBpbXBsZW1lbnRhdGlvbiBpcyBhIE11bHRpdG9uLCBzbyB5b3Ugc2hvdWxkIG5vdCBjYWxsIHRoZVxyXG4gKiBjb25zdHJ1Y3RvciBkaXJlY3RseSwgYnV0IGluc3RlYWQgY2FsbCB0aGUgc3RhdGljICNnZXRJbnN0YW5jZSBmYWN0b3J5IG1ldGhvZCxcclxuICogcGFzc2luZyB0aGUgdW5pcXVlIGtleSBmb3IgdGhpcyBpbnN0YW5jZSB0byBpdC5cclxuICogQHBhcmFtIHtzdHJpbmd9IGtleVxyXG4gKiBAdGhyb3dzIHtFcnJvcn1cclxuICogIElmIGluc3RhbmNlIGZvciB0aGlzIE11bHRpdG9uIGtleSBoYXMgYWxyZWFkeSBiZWVuIGNvbnN0cnVjdGVkXHJcbiAqL1xyXG5mdW5jdGlvbiBDb250cm9sbGVyKGtleSlcclxue1xyXG4gICAgaWYoQ29udHJvbGxlci5pbnN0YW5jZU1hcFtrZXldICE9IG51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKENvbnRyb2xsZXIuTVVMVElUT05fTVNHKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm11bHRpdG9uS2V5PSBrZXk7XHJcbiAgICBDb250cm9sbGVyLmluc3RhbmNlTWFwW3RoaXMubXVsdGl0b25LZXldPSB0aGlzO1xyXG4gICAgdGhpcy5jb21tYW5kTWFwPSBuZXcgQXJyYXkoKTtcclxuICAgIHRoaXMuaW5pdGlhbGl6ZUNvbnRyb2xsZXIoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICpcclxuICogSW5pdGlhbGl6ZSB0aGUgbXVsdGl0b24gQ29udHJvbGxlciBpbnN0YW5jZS5cclxuICpcclxuICogQ2FsbGVkIGF1dG9tYXRpY2FsbHkgYnkgdGhlIGNvbnN0cnVjdG9yLlxyXG4gKlxyXG4gKiBOb3RlIHRoYXQgaWYgeW91IGFyZSB1c2luZyBhIHN1YmNsYXNzIG9mIFZpZXdcclxuICogaW4geW91ciBhcHBsaWNhdGlvbiwgeW91IHNob3VsZCAqYWxzbyogc3ViY2xhc3MgQ29udHJvbGxlclxyXG4gKiBhbmQgb3ZlcnJpZGUgdGhlIGluaXRpYWxpemVDb250cm9sbGVyIG1ldGhvZCBpbiB0aGVcclxuICogZm9sbG93aW5nIHdheS5cclxuICpcclxuICogICAgIE15Q29udHJvbGxlci5wcm90b3R5cGUuaW5pdGlhbGl6ZUNvbnRyb2xsZXI9IGZ1bmN0aW9uICgpXHJcbiAqICAgICB7XHJcbiAqICAgICAgICAgdGhpcy52aWV3PSBNeVZpZXcuZ2V0SW5zdGFuY2UodGhpcy5tdWx0aXRvbktleSk7XHJcbiAqICAgICB9O1xyXG4gKlxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuQ29udHJvbGxlci5wcm90b3R5cGUuaW5pdGlhbGl6ZUNvbnRyb2xsZXI9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgdGhpcy52aWV3PSBWaWV3LmdldEluc3RhbmNlKHRoaXMubXVsdGl0b25LZXkpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRoZSBDb250cm9sbGVycyBtdWx0aXRvbiBmYWN0b3J5IG1ldGhvZC5cclxuICogTm90ZSB0aGF0IHRoaXMgbWV0aG9kIHdpbGwgcmV0dXJuIG51bGwgaWYgc3VwcGxpZWQgYSBudWxsXHJcbiAqIG9yIHVuZGVmaW5lZCBtdWx0aXRvbiBrZXkuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcclxuICogIEEgQ29udHJvbGxlcidzIG11bHRpdG9uIGtleVxyXG4gKiBAcmV0dXJuIHtwdXJlbXZjLkNvbnRyb2xsZXJ9XHJcbiAqICB0aGUgTXVsdGl0b24gaW5zdGFuY2Ugb2YgQ29udHJvbGxlclxyXG4gKi9cclxuQ29udHJvbGxlci5nZXRJbnN0YW5jZT0gZnVuY3Rpb24oa2V5KVxyXG57XHJcbiAgICBpZiAobnVsbCA9PSBrZXkpXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgaWYobnVsbCA9PSB0aGlzLmluc3RhbmNlTWFwW2tleV0pXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZU1hcFtrZXldPSBuZXcgdGhpcyhrZXkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLmluc3RhbmNlTWFwW2tleV07XHJcbn07XHJcblxyXG4vKipcclxuICogSWYgYSBTaW1wbGVDb21tYW5kIG9yIE1hY3JvQ29tbWFuZCBoYXMgcHJldmlvdXNseSBiZWVuIHJlZ2lzdGVyZWQgdG8gaGFuZGxlXHJcbiAqIHRoZSBnaXZlbiBOb3RpZmljYXRpb24gdGhlbiBpdCBpcyBleGVjdXRlZC5cclxuICpcclxuICogQHBhcmFtIHtwdXJlbXZjLk5vdGlmaWNhdGlvbn0gbm90ZVxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuQ29udHJvbGxlci5wcm90b3R5cGUuZXhlY3V0ZUNvbW1hbmQ9IGZ1bmN0aW9uKG5vdGUpXHJcbntcclxuICAgIHZhciBjb21tYW5kQ2xhc3NSZWY9IHRoaXMuY29tbWFuZE1hcFtub3RlLmdldE5hbWUoKV07XHJcbiAgICBpZihjb21tYW5kQ2xhc3NSZWYgPT0gbnVsbClcclxuICAgICAgICByZXR1cm47XHJcblxyXG4gICAgdmFyIGNvbW1hbmRJbnN0YW5jZT0gbmV3IGNvbW1hbmRDbGFzc1JlZigpO1xyXG4gICAgY29tbWFuZEluc3RhbmNlLmluaXRpYWxpemVOb3RpZmllcih0aGlzLm11bHRpdG9uS2V5KTtcclxuICAgIGNvbW1hbmRJbnN0YW5jZS5leGVjdXRlKG5vdGUpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlZ2lzdGVyIGEgcGFydGljdWxhciBTaW1wbGVDb21tYW5kIG9yIE1hY3JvQ29tbWFuZCBjbGFzcyBhcyB0aGUgaGFuZGxlciBmb3JcclxuICogYSBwYXJ0aWN1bGFyIE5vdGlmaWNhdGlvbi5cclxuICpcclxuICogSWYgYW4gY29tbWFuZCBhbHJlYWR5IGJlZW4gcmVnaXN0ZXJlZCB0byBoYW5kbGUgTm90aWZpY2F0aW9ucyB3aXRoIHRoaXMgbmFtZSxcclxuICogaXQgaXMgbm8gbG9uZ2VyIHVzZWQsIHRoZSBuZXcgY29tbWFuZCBpcyB1c2VkIGluc3RlYWQuXHJcbiAqXHJcbiAqIFRoZSBPYnNlcnZlciBmb3IgdGhlIG5ldyBjb21tYW5kIGlzIG9ubHkgY3JlYXRlZCBpZiB0aGlzIHRoZSBpcnN0IHRpbWUgYVxyXG4gKiBjb21tYW5kIGhhcyBiZWVuIHJlZ2lzZXJlZCBmb3IgdGhpcyBOb3RpZmljYXRpb24gbmFtZS5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG5vdGlmaWNhdGlvbk5hbWVcclxuICogIHRoZSBuYW1lIG9mIHRoZSBOb3RpZmljYXRpb25cclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY29tbWFuZENsYXNzUmVmXHJcbiAqICBhIGNvbW1hbmQgY29uc3RydWN0b3JcclxuICogQHJldHVybiB7dm9pZH1cclxuICovXHJcbkNvbnRyb2xsZXIucHJvdG90eXBlLnJlZ2lzdGVyQ29tbWFuZD0gZnVuY3Rpb24obm90aWZpY2F0aW9uTmFtZSwgY29tbWFuZENsYXNzUmVmKVxyXG57XHJcbiAgICBpZih0aGlzLmNvbW1hbmRNYXBbbm90aWZpY2F0aW9uTmFtZV0gPT0gbnVsbClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnZpZXcucmVnaXN0ZXJPYnNlcnZlcihub3RpZmljYXRpb25OYW1lLCBuZXcgT2JzZXJ2ZXIodGhpcy5leGVjdXRlQ29tbWFuZCwgdGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY29tbWFuZE1hcFtub3RpZmljYXRpb25OYW1lXT0gY29tbWFuZENsYXNzUmVmO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIGEgY29tbWFuZCBpcyByZWdpc3RlcmVkIGZvciBhIGdpdmVuIE5vdGlmaWNhdGlvblxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbm90aWZpY2F0aW9uTmFtZVxyXG4gKiBAcmV0dXJuIHtib29sZWFufVxyXG4gKiAgd2hldGhlciBhIENvbW1hbmQgaXMgY3VycmVudGx5IHJlZ2lzdGVyZWQgZm9yIHRoZSBnaXZlbiBub3RpZmljYXRpb25OYW1lLlxyXG4gKi9cclxuQ29udHJvbGxlci5wcm90b3R5cGUuaGFzQ29tbWFuZD0gZnVuY3Rpb24obm90aWZpY2F0aW9uTmFtZSlcclxue1xyXG4gICAgcmV0dXJuIHRoaXMuY29tbWFuZE1hcFtub3RpZmljYXRpb25OYW1lXSAhPSBudWxsO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSBhIHByZXZpb3VzbHkgcmVnaXN0ZXJlZCBjb21tYW5kIHRvXHJcbiAqIHtAbGluayBwdXJlbXZjLk5vdGlmaWNhdGlvbiBOb3RpZmljYXRpb259XHJcbiAqIG1hcHBpbmcuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBub3RpZmljYXRpb25OYW1lXHJcbiAqICB0aGUgbmFtZSBvZiB0aGUgTm90aWZpY2F0aW9uIHRvIHJlbW92ZSB0aGUgY29tbWFuZCBtYXBwaW5nIGZvclxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuQ29udHJvbGxlci5wcm90b3R5cGUucmVtb3ZlQ29tbWFuZD0gZnVuY3Rpb24obm90aWZpY2F0aW9uTmFtZSlcclxue1xyXG4gICAgaWYodGhpcy5oYXNDb21tYW5kKG5vdGlmaWNhdGlvbk5hbWUpKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudmlldy5yZW1vdmVPYnNlcnZlcihub3RpZmljYXRpb25OYW1lLCB0aGlzKTtcclxuICAgICAgICB0aGlzLmNvbW1hbmRNYXBbbm90aWZpY2F0aW9uTmFtZV09IG51bGw7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogQHN0YXRpY1xyXG4gKiBSZW1vdmUgYSBDb250cm9sbGVyIGluc3RhbmNlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5XHJcbiAqICBtdWx0aXRvbktleSBvZiBDb250cm9sbGVyIGluc3RhbmNlIHRvIHJlbW92ZVxyXG4gKiBAcmV0dXJuIHt2b2lkfVxyXG4gKi9cclxuQ29udHJvbGxlci5yZW1vdmVDb250cm9sbGVyPSBmdW5jdGlvbihrZXkpXHJcbntcclxuICAgIGRlbGV0ZSB0aGlzLmluc3RhbmNlTWFwW2tleV07XHJcbn07XHJcblxyXG4vKipcclxuICogTG9jYWwgcmVmZXJlbmNlIHRvIHRoZSBDb250cm9sbGVyJ3MgVmlld1xyXG4gKlxyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEB0eXBlIHtwdXJlbXZjLlZpZXd9XHJcbiAqL1xyXG5Db250cm9sbGVyLnByb3RvdHlwZS52aWV3PSBudWxsO1xyXG5cclxuLyoqXHJcbiAqIE5vdGUgbmFtZSB0byBjb21tYW5kIGNvbnN0cnVjdG9yIG1hcHBpbmdzXHJcbiAqXHJcbiAqIEBwcm90ZWN0ZWRcclxuICogQHR5cGUge09iamVjdH1cclxuICovXHJcbkNvbnRyb2xsZXIucHJvdG90eXBlLmNvbW1hbmRNYXA9IG51bGw7XHJcblxyXG4vKipcclxuICogVGhlIENvbnRyb2xsZXIncyBtdWx0aXRvbiBrZXlcclxuICpcclxuICogQHByb3RlY3RlZFxyXG4gKiBAdHlwZSB7c3RyaW5nfVxyXG4gKi9cclxuQ29udHJvbGxlci5wcm90b3R5cGUubXVsdGl0b25LZXk9IG51bGw7XHJcblxyXG4vKipcclxuICogTXVsdGl0b24ga2V5IHRvIENvbnRyb2xsZXIgaW5zdGFuY2UgbWFwcGluZ3NcclxuICpcclxuICogQHN0YXRpY1xyXG4gKiBAcHJvdGVjdGVkXHJcbiAqIEB0eXBlIHtPYmplY3R9XHJcbiAqL1xyXG5Db250cm9sbGVyLmluc3RhbmNlTWFwPSBbXTtcclxuXHJcbi8qKlxyXG4gKiBAaWdub3JlXHJcbiAqXHJcbiAqIE1lc3NhZ2UgY29uc3RhbnRzXHJcbiAqIEBzdGF0aWNcclxuICogQHByb3RlY3RlZFxyXG4gKiBAdHlwZSB7c3RyaW5nfVxyXG4gKi9cclxuQ29udHJvbGxlci5NVUxUSVRPTl9NU0c9IFwiY29udHJvbGxlciBrZXkgZm9yIHRoaXMgTXVsdGl0b24ga2V5IGFscmVhZHkgY29uc3RydWN0ZWRcIlxyXG4vKlxyXG4gKiBAYXV0aG9yIFB1cmVNVkMgSlMgTmF0aXZlIFBvcnQgYnkgRGF2aWQgRm9sZXksIEZyw6lkw6lyaWMgU2F1bmllciwgJiBBbGFpbiBEdWNoZXNuZWF1IFxyXG4gKiBAYXV0aG9yIENvcHlyaWdodChjKSAyMDA2LTIwMTIgRnV0dXJlc2NhbGUsIEluYy4sIFNvbWUgcmlnaHRzIHJlc2VydmVkLlxyXG4gKiBcclxuICogQGhpZGVcclxuICogQSBhbiBpbnRlcm5hbCBoZWxwZXIgY2xhc3MgdXNlZCB0byBhc3Npc3QgY2xhc3NsZXQgaW1wbGVtZW50YXRpb24uIFRoaXNcclxuICogY2xhc3MgaXMgbm90IGFjY2Vzc2libGUgYnkgY2xpZW50IGNvZGUuXHJcbiAqL1xyXG52YXIgT29wSGVscD1cclxue1xyXG4gICAgLypcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKiBBIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIHNjb3BlLiBXZSB1c2UgdGhpcyByYXRoZXIgdGhhbiB3aW5kb3dcclxuICAgICAqIGluIG9yZGVyIHRvIHN1cHBvcnQgYm90aCBicm93c2VyIGJhc2VkIGFuZCBub24gYnJvd3NlciBiYWVkIFxyXG4gICAgICogSmF2YVNjcmlwdCBpbnRlcnByZXRlcnMuXHJcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICAgICovXHJcbiAgICBnbG9iYWw6IChmdW5jdGlvbigpe3JldHVybiB0aGlzfSkoKVxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogRXh0ZW5kIG9uZSBGdW5jdGlvbidzIHByb3RvdHlwZSBieSBhbm90aGVyLCBlbXVsYXRpbmcgY2xhc3NpY1xyXG4gICAgICogaW5oZXJpdGFuY2UuXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNoaWxkXHJcbiAgICAgKiAgVGhlIEZ1bmN0aW9uIHRvIGV4dGVuZCAoc3ViY2xhc3MpXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHBhcmVudFxyXG4gICAgICogIFRoZSBGdW5jdGlvbiB0byBleHRlbmQgZnJvbSAoc3VwZXJjbGFzcylcclxuICAgICAqIFxyXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259XHJcbiAgICAgKiBcclxuICAgICAqICBBIHJlZmVyZW5jZSB0byB0aGUgZXh0ZW5kZWQgRnVuY3Rpb24gKHN1YmNsYXNzKVxyXG4gICAgICovXHJcbiAgICAsICAgZXh0ZW5kOiBmdW5jdGlvbiAoY2hpbGQsIHBhcmVudClcclxue1xyXG4gICAgaWYgKCdmdW5jdGlvbicgIT09IHR5cGVvZiBjaGlsZClcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCcjZXh0ZW5kLSBjaGlsZCBzaG91bGQgYmUgRnVuY3Rpb24nKTtcclxuXHJcbiAgICBpZiAoJ2Z1bmN0aW9uJyAhPT0gdHlwZW9mIHBhcmVudClcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCcjZXh0ZW5kLSBwYXJlbnQgc2hvdWxkIGJlIEZ1bmN0aW9uJyk7XHJcblxyXG4gICAgaWYgKHBhcmVudCA9PT0gY2hpbGQpXHJcbiAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgIHZhciBUcmFuc2l0aXZlPSBuZXcgRnVuY3Rpb247XHJcbiAgICBUcmFuc2l0aXZlLnByb3RvdHlwZT0gcGFyZW50LnByb3RvdHlwZTtcclxuICAgIGNoaWxkLnByb3RvdHlwZT0gbmV3IFRyYW5zaXRpdmU7XHJcbiAgICByZXR1cm4gY2hpbGQucHJvdG90eXBlLmNvbnN0cnVjdG9yPSBjaGlsZDtcclxufVxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICogRGVjb2FyYXRlIG9uZSBvYmplY3Qgd2l0aCB0aGUgcHJvcGVydGllcyBvZiBhbm90aGVyLiBcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdFxyXG4gICAgICogIFRoZSBvYmplY3QgdG8gZGVjb3JhdGUuXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSB0cmFpdHNcclxuICAgICAqICBUaGUgb2JqZWN0IHByb3ZpZGluZyB0aGUgcHJvcGVyaXRlcyB0aGF0IHRoZSBmaXJzdCBvYmplY3RcclxuICAgICAqICB3aWxsIGJlIGRlY29yYXRlZCB3aXRoLiBOb3RlIHRoYXQgb25seSBwcm9wZXJ0aWVzIGRlZmluZWQgb24gXHJcbiAgICAgKiAgdGhpcyBvYmplY3Qgd2lsbCBiZSBjb3BpZWQtIGkuZS4gaW5oZXJpdGVkIHByb3BlcnRpZXMgd2lsbFxyXG4gICAgICogIGJlIGlnbm9yZWQuXHJcbiAgICAgKiBcclxuICAgICAqIEByZXR1cm4ge09iamVjdH1cclxuICAgICAqICBUSGUgZGVjb3JhdGVkIG9iamVjdCAoZmlyc3QgYXJndW1lbnQpXHJcbiAgICAgKi9cclxuICAgICwgICBkZWNvcmF0ZTogZnVuY3Rpb24gKG9iamVjdCwgdHJhaXRzKVxyXG57XHJcbiAgICBmb3IgKHZhciBhY2Nlc3NvciBpbiB0cmFpdHMpXHJcbiAgICB7XHJcbiAgICAgICAgb2JqZWN0W2FjY2Vzc29yXT0gdHJhaXRzW2FjY2Vzc29yXTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb2JqZWN0O1xyXG59XHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIEBtZW1iZXIgcHVyZW12Y1xyXG4gKlxyXG4gKiBEZWNsYXJlIGEgbmFtZXNwYWNlIGFuZCBvcHRpb25hbGx5IG1ha2UgYW4gT2JqZWN0IHRoZSByZWZlcmVudFxyXG4gKiBvZiB0aGF0IG5hbWVzcGFjZS5cclxuICpcclxuICogICAgIGNvbnNvbGUuYXNzZXJ0KG51bGwgPT0gd2luZG93LnRsZCwgJ05vIHRsZCBuYW1lc3BhY2UnKTtcclxuICogICAgIC8vIGRlY2xhcmUgdGhlIHRsZCBuYW1lc3BhY2VcclxuICogICAgIHB1cmVtdmMuZGVjbGFyZSgndGxkJyk7XHJcbiAqICAgICBjb25zb2xlLmFzc2VydCgnb2JqZWN0JyA9PT0gdHlwZW9mIHRsZCwgJ1RoZSB0bGQgbmFtZXNwYWNlIHdhcyBkZWNsYXJlZCcpO1xyXG4gKlxyXG4gKiAgICAgLy8gdGhlIG1ldGhvZCByZXR1cm5zIGEgcmVmZXJlbmNlIHRvIGxhc3QgbmFtZXNwYWNlIG5vZGUgaW4gYSBjcmVhdGVkIGhpZXJhcmNoeVxyXG4gKiAgICAgdmFyIHJlZmVyZW5jZT0gcHVyZW12Yy5kZWNsYXJlKCd0bGQuZG9tYWluLmFwcCcpO1xyXG4gKiAgICAgY29uc29sZS5hc3NlcnQocmVmZXJlbmNlID09PSB0bGQuZG9tYWluLmFwcClcclxuICpcclxuICogICAgIC8vIG9mIGNvdXJzZSB5b3UgY2FuIGFsc28gZGVjbGFyZSB5b3VyIG93biBvYmplY3RzIGFzIHdlbGxcclxuICogICAgIHZhciBBcHBDb25zdGFudHM9XHJcbiAqICAgICAgICAge1xyXG4gKiBcdCAgICAgICAgICAgQVBQX05BTUU6ICd0bGQuZG9tYWluLmFwcC5BcHAnXHJcbiAqICAgICAgICAgfTtcclxuICpcclxuICogICAgIHB1cmVtdmMuZGVjbGFyZSgndGxkLmRvbWFpbi5hcHAuQXBwQ29uc3RhbnRzJywgQXBwQ29uc3RhbnRzKTtcclxuICogICAgIGNvbnNvbGUuYXNzZXJ0KEFwcENvbnN0YW50cyA9PT0gdGxkLmRvbWFpbi5hcHAuQXBwQ29uc3RhbnRzXHJcbiAqIFx0ICAgLCAnQXBwQ29uc3RhbnRzIHdhcyBleHBvcnRlZCB0byB0aGUgbmFtZXNwYWNlJyk7XHJcbiAqXHJcbiAqIE5vdGUgdGhhdCB5b3UgY2FuIGFsc28gI2RlY2xhcmUgd2l0aGluIGEgY2xvc3VyZS4gVGhhdCB3YXkgeW91XHJcbiAqIGNhbiBzZWxlY3RpdmVseSBleHBvcnQgT2JqZWN0cyB0byB5b3VyIG93biBuYW1lc3BhY2VzIHdpdGhvdXRcclxuICogbGVha2luZyB2YXJpYWJsZXMgaW50byB0aGUgZ2xvYmFsIHNjb3BlLlxyXG4gKlxyXG4gKiAgICAgKGZ1bmN0aW9uKCl7XHJcbiAqICAgICAgICAgLy8gdGhpcyB2YXIgaXMgbm90IGFjY2Vzc2libGUgb3V0c2lkZSBvZiB0aGlzXHJcbiAqICAgICAgICAgLy8gY2xvc3VyZXMgY2FsbCBzY29wZVxyXG4gKiAgICAgICAgIHZhciBoaWRkZW5WYWx1ZT0gJ2RlZmF1bHRWYWx1ZSc7XHJcbiAqIFxyXG4gKiAgICAgICAgIC8vIGV4cG9ydCBhbiBvYmplY3QgdGhhdCByZWZlcmVuY2VzIHRoZSBoaWRkZW5cclxuICogICAgICAgICAvLyB2YXJpYWJsZSBhbmQgd2hpY2ggY2FuIG11dGF0ZSBpdFxyXG4gKiAgICAgICAgIHB1cmVtdmMuZGVjbGFyZVxyXG4gKiAgICAgICAgIChcclxuICogICAgICAgICAgICAgICd0bGQuZG9tYWluLmFwcC5iYWNrZG9vcidcclxuICogXHJcbiAqICAgICAgICAgLCAgICB7XHJcbiAqICAgICAgICAgICAgICAgICAgc2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSlcclxuICogICAgICAgICAgICAgICAgICB7XHJcbiAqICAgICAgICAgICAgICAgICAgICAgIC8vIGFzc2lnbnMgdG8gdGhlIGhpZGRlbiB2YXJcclxuICogICAgICAgICAgICAgICAgICAgICAgaGlkZGVuVmFsdWU9IHZhbHVlO1xyXG4gKiAgICAgICAgICAgICAgICAgIH1cclxuICogXHJcbiAqICAgICAgICAgLCAgICAgICAgZ2V0VmFsdWU6IGZ1bmN0aW9uICgpXHJcbiAqICAgICAgICAgICAgICAgICAge1xyXG4gKiAgICAgICAgICAgICAgICAgICAgICAvLyByZWFkcyBmcm9tIHRoZSBoaWRkZW4gdmFyXHJcbiAqICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBoaWRkZW5WYWx1ZTtcclxuICogICAgICAgICAgICAgICAgICB9XHJcbiAqICAgICAgICAgICAgICB9XHJcbiAqICAgICAgICAgKTtcclxuICogICAgIH0pKCk7XHJcbiAqICAgICAvLyBpbmRpcmVjdGx5IHJldHJpZXZlIHRoZSBoaWRkZW4gdmFyaWFibGVzIHZhbHVlXHJcbiAqICAgICBjb25zb2xlLmFzc2VydCgnZGVmYXVsdFZhbHVlJyA9PT0gdGxkLmRvbWFpbi5hcHAuYmFja2Rvb3IuZ2V0VmFsdWUoKSk7XHJcbiAqICAgICAvLyBpbmRpcmVjdGx5IHNldCB0aGUgaGlkZGVuIHZhcmlhYmxlcyB2YWx1ZVxyXG4gKiAgICAgdGxkLmRvbWFpbi5hcHAuYmFja2Rvb3Iuc2V0VmFsdWUoJ25ld1ZhbHVlJyk7XHJcbiAqICAgICAvLyB0aGUgaGlkZGVuIHZhciB3YXMgbXV0YXRlZFxyXG4gKiAgICAgY29uc29sZS5hc3NlcnQoJ25ld1ZhbHVlJyA9PT0gdGxkLmRvbWFpbi5hcHAuYmFja2Rvb3IuZ2V0VmFsdWUoKSk7XHJcbiAqXHJcbiAqIE9uIG9jY2FzaW9uLCBwcmltYXJpbHkgZHVyaW5nIHRlc3RpbmcsIHlvdSBtYXkgd2FudCB0byB1c2UgZGVjbGFyZSxcclxuICogYnV0IG5vdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGJlIHRoZSBuYW1lc3BhY2Ugcm9vdC4gSW4gdGhlc2UgY2FzZXMgeW91XHJcbiAqIGNhbiBzdXBwbHkgdGhlIG9wdGlvbmFsIHRoaXJkIHNjb3BlIGFyZ3VtZW50LlxyXG4gKlxyXG4gKiAgICAgdmFyIGxvY2FsU2NvcGU9IHt9XHJcbiAqICAgICAsICAgb2JqZWN0PSB7fVxyXG4gKlxyXG4gKiAgICAgcHVyZW12Yy5kZWNsYXJlKCdtb2NrLm9iamVjdCcsIG9iamVjdCwgbG9jYWxTY29wZSk7XHJcbiAqXHJcbiAqICAgICBjb25zb2xlLmFzc2VydChudWxsID09IHdpbmRvdy5tb2NrLCAnbW9jayBuYW1lc3BhY2UgaXMgbm90IGluIGdsb2JhbCBzY29wZScpO1xyXG4gKiAgICAgY29uc29sZS5hc3NlcnQob2JqZWN0ID09PSBsb2NhbFNjb3BlLm1vY2sub2JqZWN0LCAnbW9jay5vYmplY3QgaXMgYXZhaWxhYmxlIGluIGxvY2FsU2NvcGUnKTtcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZ1xyXG4gKiAgQSBxdWFsaWZpZWQgb2JqZWN0IG5hbWUsIGUuZy4gJ2NvbS5leGFtcGxlLkNsYXNzJ1xyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF1cclxuICogIEFuIG9iamVjdCB0byBtYWtlIHRoZSByZWZlcmVudCBvZiB0aGUgbmFtZXNwYWNlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gW3Njb3BlXVxyXG4gKiAgVGhlIG5hbWVzcGFjZSdzIHJvb3Qgbm9kZS4gSWYgbm90IHN1cHBsaWVkLCB0aGUgZ2xvYmFsXHJcbiAqICBzY29wZSB3aWxsIGJlIG5hbWVzcGFjZXMgcm9vdCBub2RlLlxyXG4gKlxyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqXHJcbiAqICBBIHJlZmVyZW5jZSB0byB0aGUgbGFzdCBub2RlIG9mIHRoZSBPYmplY3QgaGllcmFyY2h5IGNyZWF0ZWQuXHJcbiAqL1xyXG5mdW5jdGlvbiBkZWNsYXJlIChxdWFsaWZpZWROYW1lLCBvYmplY3QsIHNjb3BlKVxyXG57XHJcbiAgICB2YXIgbm9kZXM9IHF1YWxpZmllZE5hbWUuc3BsaXQoJy4nKVxyXG4gICAgICAgICwgICBub2RlPSBzY29wZSB8fCBPb3BIZWxwLmdsb2JhbFxyXG4gICAgICAgICwgICBsYXN0Tm9kZVxyXG4gICAgICAgICwgICBuZXdOb2RlXHJcbiAgICAgICAgLCAgIG5vZGVOYW1lO1xyXG5cclxuICAgIGZvciAodmFyIGk9IDAsIG49IG5vZGVzLmxlbmd0aDsgaSA8IG47IGkrKylcclxuICAgIHtcclxuICAgICAgICBsYXN0Tm9kZT0gbm9kZTtcclxuICAgICAgICBub2RlTmFtZT0gbm9kZXNbaV07XHJcblxyXG4gICAgICAgIG5vZGU9IChudWxsID09IG5vZGVbbm9kZU5hbWVdID8gbm9kZVtub2RlTmFtZV0gPSB7fSA6IG5vZGVbbm9kZU5hbWVdKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobnVsbCA9PSBvYmplY3QpXHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcblxyXG4gICAgcmV0dXJuIGxhc3ROb2RlW25vZGVOYW1lXT0gb2JqZWN0O1xyXG59O1xyXG5cclxuXHJcblxyXG5cclxuLyoqXHJcbiAqIEBtZW1iZXIgcHVyZW12Y1xyXG4gKlxyXG4gKiBEZWZpbmUgYSBuZXcgY2xhc3NsZXQuIEN1cnJlbnQgZWRpdGlvbnMgb2YgSmF2YVNjcmlwdCBkbyBub3QgaGF2ZSBjbGFzc2VzLFxyXG4gKiBidXQgdGhleSBjYW4gYmUgZW11bGF0ZWQsIGFuZCB0aGlzIG1ldGhvZCBkb2VzIHRoaXMgZm9yIHlvdSwgc2F2aW5nIHlvdVxyXG4gKiBmcm9tIGhhdmluZyB0byB3b3JrIHdpdGggRnVuY3Rpb24gcHJvdG90eXBlIGRpcmVjdGx5LiBUaGUgbWV0aG9kIGRvZXNcclxuICogbm90IGV4dGVuZCBhbnkgTmF0aXZlIG9iamVjdHMgYW5kIGlzIGVudGlyZWx5IG9wdCBpbi4gSXRzIHBhcnRpY3VsYXJseVxyXG4gKiB1c2VmdWxsIGlmIHlvdSB3YW50IHRvIG1ha2UgeW91ciBQdXJlTXZjIGFwcGxpY2F0aW9ucyBtb3JlIHBvcnRhYmxlLCBieVxyXG4gKiBkZWNvdXBsaW5nIHRoZW0gZnJvbSBhIHNwZWNpZmljIE9PUCBhYnN0cmFjdGlvbiBsaWJyYXJ5LlxyXG4gKlxyXG4gKlxyXG4gKiAgICAgcHVyZW12Yy5kZWZpbmVcclxuICogICAgIChcclxuICogICAgICAgICAvLyB0aGUgZmlyc3Qgb2JqZWN0IHN1cHBsaWVkIGlzIGEgY2xhc3MgZGVzY3JpcHRvci4gTm9uZSBvZiB0aGVzZVxyXG4gKiAgICAgICAgIC8vIHByb3BlcnRpZXMgYXJlIGFkZGVkIHRvIHlvdXIgY2xhc3MsIHRoZSBleGNlcHRpb24gYmVpbmcgdGhlXHJcbiAqICAgICAgICAgLy8gY29uc3RydWN0b3IgcHJvcGVydHksIHdoaWNoIGlmIHN1cHBsaWVkLCB3aWxsIGJlIHlvdXIgY2xhc3Nlc1xyXG4gKiAgICAgICAgIC8vIGNvbnN0cnVjdG9yLlxyXG4gKiAgICAgICAgIHtcclxuICogICAgICAgICAgICAgLy8geW91ciBjbGFzc2VzIG5hbWVzcGFjZS0gaWYgc3VwcGxpZWQsIGl0IHdpbGwgYmUgXHJcbiAqICAgICAgICAgICAgIC8vIGNyZWF0ZWQgZm9yIHlvdVxyXG4gKiAgICAgICAgICAgICBuYW1lOiAnY29tLmV4YW1wbGUuVXNlck1lZGlhdG9yJ1xyXG4gKiBcclxuICogICAgICAgICAgICAgLy8geW91ciBjbGFzc2VzIHBhcmVudCBjbGFzcy4gSWYgc3VwcGxpZWQsIGluaGVyaXRhbmNlIFxyXG4gKiAgICAgICAgICAgICAvLyB3aWxsIGJlIHRha2VuIGNhcmUgb2YgZm9yIHlvdVxyXG4gKiAgICAgICAgICwgICBwYXJlbnQ6IHB1cmVtdmMuTWVkaWF0b3JcclxuICogXHJcbiAqICAgICAgICAgICAgIC8vIHlvdXIgY2xhc3NlcyBjb25zdHJ1Y3Rvci4gSWYgbm90IHN1cHBsaWVkLCBvbmUgd2lsbCBiZSBcclxuICogICAgICAgICAgICAgLy8gY3JlYXRlZCBmb3IgeW91XHJcbiAqICAgICAgICAgLCAgIGNvbnN0cnVjdG9yOiBmdW5jdGlvbiBVc2VyTWVkaWF0b3IgKGNvbXBvbmVudClcclxuICogICAgICAgICAgICAge1xyXG4gKiAgICAgICAgICAgICAgICAgIHB1cmVtdmMuTWVkaWF0b3IuY2FsbCh0aGlzLCB0aGlzLmNvbnN0cnVjdG9yLk5BTUUsIGNvbXBvbmVudCk7ICBcclxuICogICAgICAgICAgICAgfVxyXG4gKiAgICAgICAgIH1cclxuICpcclxuICogICAgICAgICAvLyB0aGUgc2Vjb25kIG9iamVjdCBzdXBwbGllZCBkZWZpbmVzIHlvdXIgY2xhc3MgdHJhaXRzLCB0aGF0IGlzXHJcbiAqICAgICAgICAgLy8gdGhlIHByb3BlcnRpZXMgdGhhdCB3aWxsIGJlIGRlZmluZWQgb24geW91ciBjbGFzc2VzIHByb3RvdHlwZVxyXG4gKiAgICAgICAgIC8vIGFuZCB0aGVyZWJ5IG9uIGFsbCBpbnN0YW5jZXMgb2YgdGhpcyBjbGFzc1xyXG4gKiAgICAgLCAgIHtcclxuICogICAgICAgICAgICAgYnVzaW5lc3NNZXRob2Q6IGZ1bmN0aW9uICgpXHJcbiAqICAgICAgICAgICAgIHtcclxuICogICAgICAgICAgICAgICAgIC8vIGltcGwgXHJcbiAqICAgICAgICAgICAgIH1cclxuICogICAgICAgICB9XHJcbiAqXHJcbiAqICAgICAgICAgLy8gdGhlIHRoaXJkIG9iamVjdCBzdXBwbGllZCBkZWZpbmVzIHlvdXIgY2xhc3NlcyAnc3RhdGljJyB0cmFpdHNcclxuICogICAgICAgICAvLyB0aGF0IGlzLCB0aGUgbWV0aG9kcyBhbmQgcHJvcGVydGllcyB3aGljaCB3aWxsIGJlIGRlZmluZWQgb25cclxuICogICAgICAgICAvLyB5b3VyIGNsYXNzZXMgY29uc3RydWN0b3JcclxuICogICAgICwgICB7XHJcbiAqICAgICAgICAgICAgIE5BTUU6ICd1c2VyTWVkaWF0b3InXHJcbiAqICAgICAgICAgfVxyXG4gKiAgICAgKTtcclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IFtjbGFzc2luZm9dXHJcbiAqICBBbiBvYmplY3QgZGVzY3JpYmluZyB0aGUgY2xhc3MuIFRoaXMgb2JqZWN0IGNhbiBoYXZlIGFueSBvciBhbGwgb2ZcclxuICogIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcclxuICpcclxuICogIC0gbmFtZTogU3RyaW5nXHJcbiAqICAgICAgVGhlIGNsYXNzbGV0cyBuYW1lLiBUaGlzIGNhbiBiZSBhbnkgYXJiaXRyYXJ5IHF1YWxpZmllZCBvYmplY3RcclxuICogICAgICBuYW1lLiAnY29tLmV4YW1wbGUuQ2xhc3NsZXQnIG9yIHNpbXBseSAnTXlDbGFzc2xldCcgZm9yIGV4YW1wbGVcclxuICogICAgICBUaGUgbWV0aG9kIHdpbGwgYXV0b21hdGljYWxseSBjcmVhdGUgYW4gb2JqZWN0IGhpZXJhcmNoeSByZWZlcmluZ1xyXG4gKiAgICAgIHRvIHlvdXIgY2xhc3MgZm9yIHlvdS4gTm90ZSB0aGF0IHlvdSB3aWxsIG5lZWQgdG8gY2FwdHVyZSB0aGVcclxuICogICAgICBtZXRob2RzIHJldHVybiB2YWx1ZSB0byByZXRyaWV2ZSBhIHJlZmVyZW5jZSB0byB5b3VyIGNsYXNzIGlmIHRoZVxyXG4gKiAgICAgIGNsYXNzIG5hbWUgcHJvcGVydHkgaXMgbm90IGRlZmluZWQuXHJcbiAqICAtIHBhcmVudDogRnVuY3Rpb25cclxuICogICAgICBUaGUgY2xhc3NsZXRzICdzdXBlcmNsYXNzJy4gWW91ciBjbGFzcyB3aWxsIGJlIGV4dGVuZGVkIGZyb20gdGhpc1xyXG4gKiAgICAgIGlmIHN1cHBsaWVkLlxyXG4gKlxyXG4gKiAgLSBjb25zdHJ1Y3RvcjogRnVuY3Rpb25cclxuICogICAgICBUaGUgY2xhc3NsZXRzIGNvbnN0cnVjdG9yLiBOb3RlIHRoaXMgaXMgKm5vdCogYSBwb3N0IGNvbnN0cnVjdFxyXG4gKiAgICAgIGluaXRpYWxpemUgbWV0aG9kLCBidXQgeW91ciBjbGFzc2VzIGNvbnN0cnVjdG9yIEZ1bmN0aW9uLlxyXG4gKiAgICAgIElmIHRoaXMgYXR0cmlidXRlIGlzIG5vdCBkZWZpbmVkLCBhIGNvbnN0cnVjdG9yIHdpbGwgYmUgY3JlYXRlZCBmb3JcclxuICogICAgICB5b3UgYXV0b21hdGljYWxseS4gSWYgeW91IGhhdmUgc3VwcGxpZWQgYSBwYXJlbnQgY2xhc3NcclxuICogICAgICB2YWx1ZSBhbmQgbm90IGRlZmluZWQgdGhlIGNsYXNzZXMgY29uc3RydWN0b3IsIHRoZSBhdXRvbWF0aWNhbGx5XHJcbiAqICAgICAgY3JlYXRlZCBjb25zdHJ1Y3RvciB3aWxsIGludm9rZSB0aGUgc3VwZXIgY2xhc3MgY29uc3RydWN0b3JcclxuICogICAgICBhdXRvbWF0aWNhbGx5LiBJZiB5b3UgaGF2ZSBzdXBwbGllZCB5b3VyIG93biBjb25zdHJ1Y3RvciBhbmQgeW91XHJcbiAqICAgICAgd2lzaCB0byBpbnZva2UgaXQncyBzdXBlciBjb25zdHJ1Y3RvciwgeW91IG11c3QgZG8gdGhpcyBtYW51YWxseSwgYXNcclxuICogICAgICB0aGVyZSBpcyBubyByZWZlcmVuY2UgdG8gdGhlIGNsYXNzZXMgcGFyZW50IGFkZGVkIHRvIHRoZSBjb25zdHJ1Y3RvclxyXG4gKiAgICAgIHByb3RvdHlwZS5cclxuICpcclxuICogIC0gc2NvcGU6IE9iamVjdC5cclxuICogICAgICBGb3IgdXNlIGluIGFkdmFuY2VkIHNjZW5hcmlvcy4gSWYgdGhlIG5hbWUgYXR0cmlidXRlIGhhcyBiZWVuIHN1cHBsaWVkLFxyXG4gKiAgICAgIHRoaXMgdmFsdWUgd2lsbCBiZSB0aGUgcm9vdCBvZiB0aGUgb2JqZWN0IGhpZXJhcmNoeSBjcmVhdGVkIGZvciB5b3UuXHJcbiAqICAgICAgVXNlIGl0IGRvIGRlZmluZSB5b3VyIG93biBjbGFzcyBoaWVyYXJjaGllcyBpbiBwcml2YXRlIHNjb3BlcyxcclxuICogICAgICBhY2Nyb3NzIGlGcmFtZXMsIGluIHlvdXIgdW5pdCB0ZXN0cywgb3IgYXZvaWQgY29sbGlzaW9uIHdpdGggdGhpcmRcclxuICogICAgICBwYXJ0eSBsaWJyYXJ5IG5hbWVzcGFjZXMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBbdHJhaXRzXVxyXG4gKiAgQW4gT2JqZWN0LCB0aGUgcHJvcGVydGllcyBvZiB3aGljaCB3aWxsIGJlIGFkZGVkIHRvIHRoZVxyXG4gKiAgY2xhc3MgY29uc3RydWN0b3JzIHByb3RvdHlwZS5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IFtzdGFpdGNUcmFpdHNdXHJcbiAqICBBbiBPYmplY3QsIHRoZSBwcm9wZXJ0aWVzIG9mIHdoaWNoIHdpbGwgYmUgYWRkZWQgZGlyZWN0bHlcclxuICogIHRvIHRoaXMgY2xhc3MgY29uc3RydWN0b3JcclxuICpcclxuICogQHJldHVybiB7RnVuY3Rpb259XHJcbiAqICBBIHJlZmVyZW5jZSB0byB0aGUgY2xhc3NsZXRzIGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBkZWZpbmUgKGNsYXNzSW5mbywgdHJhaXRzLCBzdGF0aWNUcmFpdHMpXHJcbntcclxuICAgIGlmICghY2xhc3NJbmZvKVxyXG4gICAge1xyXG4gICAgICAgIGNsYXNzSW5mbz0ge31cclxuICAgIH1cclxuXHJcbiAgICB2YXIgY2xhc3NOYW1lPSBjbGFzc0luZm8ubmFtZVxyXG4gICAgICAgICwgICBjbGFzc1BhcmVudD0gY2xhc3NJbmZvLnBhcmVudFxyXG4gICAgICAgICwgICBkb0V4dGVuZD0gJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGNsYXNzUGFyZW50XHJcbiAgICAgICAgLCAgIGNsYXNzQ29uc3RydWN0b3JcclxuICAgICAgICAsICAgY2xhc3NTY29wZT0gY2xhc3NJbmZvLnNjb3BlIHx8IG51bGxcclxuICAgICAgICAsICAgcHJvdG90eXBlXHJcblxyXG4gICAgaWYgKCdwYXJlbnQnIGluIGNsYXNzSW5mbyAmJiAhZG9FeHRlbmQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2xhc3MgcGFyZW50IG11c3QgYmUgRnVuY3Rpb24nKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2xhc3NJbmZvLmhhc093blByb3BlcnR5KCdjb25zdHJ1Y3RvcicpKVxyXG4gICAge1xyXG4gICAgICAgIGNsYXNzQ29uc3RydWN0b3I9IGNsYXNzSW5mby5jb25zdHJ1Y3RvclxyXG4gICAgICAgIGlmICgnZnVuY3Rpb24nICE9PSB0eXBlb2YgY2xhc3NDb25zdHJ1Y3RvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0NsYXNzIGNvbnN0cnVjdG9yIG11c3QgYmUgRnVuY3Rpb24nKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgLy8gdGhlcmUgaXMgbm8gY29uc3RydWN0b3IsIGNyZWF0ZSBvbmVcclxuICAgIHtcclxuICAgICAgICBpZiAoZG9FeHRlbmQpIC8vIGVuc3VyZSB0byBjYWxsIHRoZSBzdXBlciBjb25zdHJ1Y3RvclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2xhc3NDb25zdHJ1Y3Rvcj0gZnVuY3Rpb24gKClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2xhc3NQYXJlbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIC8vIGp1c3QgY3JlYXRlIGEgRnVuY3Rpb25cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNsYXNzQ29uc3RydWN0b3I9IG5ldyBGdW5jdGlvbjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGRvRXh0ZW5kKVxyXG4gICAge1xyXG4gICAgICAgIE9vcEhlbHAuZXh0ZW5kKGNsYXNzQ29uc3RydWN0b3IsIGNsYXNzUGFyZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHJhaXRzKVxyXG4gICAge1xyXG4gICAgICAgIHByb3RvdHlwZT0gY2xhc3NDb25zdHJ1Y3Rvci5wcm90b3R5cGVcclxuICAgICAgICBPb3BIZWxwLmRlY29yYXRlKHByb3RvdHlwZSwgdHJhaXRzKTtcclxuICAgICAgICAvLyByZWFzc2lnbiBjb25zdHJ1Y3RvciBcclxuICAgICAgICBwcm90b3R5cGUuY29uc3RydWN0b3I9IGNsYXNzQ29uc3RydWN0b3I7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHN0YXRpY1RyYWl0cylcclxuICAgIHtcclxuICAgICAgICBPb3BIZWxwLmRlY29yYXRlKGNsYXNzQ29uc3RydWN0b3IsIHN0YXRpY1RyYWl0cylcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2xhc3NOYW1lKVxyXG4gICAge1xyXG4gICAgICAgIGlmICgnc3RyaW5nJyAhPT0gdHlwZW9mIGNsYXNzTmFtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0NsYXNzIG5hbWUgbXVzdCBiZSBwcmltaXRpdmUgc3RyaW5nJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkZWNsYXJlIChjbGFzc05hbWUsIGNsYXNzQ29uc3RydWN0b3IsIGNsYXNzU2NvcGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjbGFzc0NvbnN0cnVjdG9yO1xyXG59O1xyXG5cclxuXHJcblxyXG4vKiBpbXBsZW1lbnRhdGlvbiBlbmQgKi9cclxuXHJcbi8vIGRlZmluZSB0aGUgcHVyZW12YyBnbG9iYWwgbmFtZXNwYWNlIGFuZCBleHBvcnQgdGhlIGFjdG9yc1xyXG52YXIgcHVyZW12YyA9XHJcbntcclxuICAgICAgICBWaWV3OiBWaWV3XHJcbiAgICAsXHRNb2RlbDogTW9kZWxcclxuICAgICxcdENvbnRyb2xsZXI6IENvbnRyb2xsZXJcclxuICAgICxcdFNpbXBsZUNvbW1hbmQ6IFNpbXBsZUNvbW1hbmRcclxuICAgICxcdE1hY3JvQ29tbWFuZDogTWFjcm9Db21tYW5kXHJcbiAgICAsXHRGYWNhZGU6IEZhY2FkZVxyXG4gICAgLFx0TWVkaWF0b3I6IE1lZGlhdG9yXHJcbiAgICAsXHRPYnNlcnZlcjogT2JzZXJ2ZXJcclxuICAgICxcdE5vdGlmaWNhdGlvbjogTm90aWZpY2F0aW9uXHJcbiAgICAsXHROb3RpZmllcjogTm90aWZpZXJcclxuICAgICxcdFByb3h5OiBQcm94eVxyXG4gICAgLFx0ZGVmaW5lOiBkZWZpbmVcclxuICAgICxcdGRlY2xhcmU6IGRlY2xhcmVcclxufTtcclxuXHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBwdXJlbXZjOyIsIi8vICAgICBVbmRlcnNjb3JlLmpzIDEuNy4wXG4vLyAgICAgaHR0cDovL3VuZGVyc2NvcmVqcy5vcmdcbi8vICAgICAoYykgMjAwOS0yMDE0IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4vLyAgICAgVW5kZXJzY29yZSBtYXkgYmUgZnJlZWx5IGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cblxuKGZ1bmN0aW9uKCkge1xuXG4gIC8vIEJhc2VsaW5lIHNldHVwXG4gIC8vIC0tLS0tLS0tLS0tLS0tXG5cbiAgLy8gRXN0YWJsaXNoIHRoZSByb290IG9iamVjdCwgYHdpbmRvd2AgaW4gdGhlIGJyb3dzZXIsIG9yIGBleHBvcnRzYCBvbiB0aGUgc2VydmVyLlxuICB2YXIgcm9vdCA9IHRoaXM7XG5cbiAgLy8gU2F2ZSB0aGUgcHJldmlvdXMgdmFsdWUgb2YgdGhlIGBfYCB2YXJpYWJsZS5cbiAgdmFyIHByZXZpb3VzVW5kZXJzY29yZSA9IHJvb3QuXztcblxuICAvLyBTYXZlIGJ5dGVzIGluIHRoZSBtaW5pZmllZCAoYnV0IG5vdCBnemlwcGVkKSB2ZXJzaW9uOlxuICB2YXIgQXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZSwgT2JqUHJvdG8gPSBPYmplY3QucHJvdG90eXBlLCBGdW5jUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGU7XG5cbiAgLy8gQ3JlYXRlIHF1aWNrIHJlZmVyZW5jZSB2YXJpYWJsZXMgZm9yIHNwZWVkIGFjY2VzcyB0byBjb3JlIHByb3RvdHlwZXMuXG4gIHZhclxuICAgIHB1c2ggICAgICAgICAgICAgPSBBcnJheVByb3RvLnB1c2gsXG4gICAgc2xpY2UgICAgICAgICAgICA9IEFycmF5UHJvdG8uc2xpY2UsXG4gICAgY29uY2F0ICAgICAgICAgICA9IEFycmF5UHJvdG8uY29uY2F0LFxuICAgIHRvU3RyaW5nICAgICAgICAgPSBPYmpQcm90by50b1N0cmluZyxcbiAgICBoYXNPd25Qcm9wZXJ0eSAgID0gT2JqUHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbiAgLy8gQWxsICoqRUNNQVNjcmlwdCA1KiogbmF0aXZlIGZ1bmN0aW9uIGltcGxlbWVudGF0aW9ucyB0aGF0IHdlIGhvcGUgdG8gdXNlXG4gIC8vIGFyZSBkZWNsYXJlZCBoZXJlLlxuICB2YXJcbiAgICBuYXRpdmVJc0FycmF5ICAgICAgPSBBcnJheS5pc0FycmF5LFxuICAgIG5hdGl2ZUtleXMgICAgICAgICA9IE9iamVjdC5rZXlzLFxuICAgIG5hdGl2ZUJpbmQgICAgICAgICA9IEZ1bmNQcm90by5iaW5kO1xuXG4gIC8vIENyZWF0ZSBhIHNhZmUgcmVmZXJlbmNlIHRvIHRoZSBVbmRlcnNjb3JlIG9iamVjdCBmb3IgdXNlIGJlbG93LlxuICB2YXIgXyA9IGZ1bmN0aW9uKG9iaikge1xuICAgIGlmIChvYmogaW5zdGFuY2VvZiBfKSByZXR1cm4gb2JqO1xuICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBfKSkgcmV0dXJuIG5ldyBfKG9iaik7XG4gICAgdGhpcy5fd3JhcHBlZCA9IG9iajtcbiAgfTtcblxuICAvLyBFeHBvcnQgdGhlIFVuZGVyc2NvcmUgb2JqZWN0IGZvciAqKk5vZGUuanMqKiwgd2l0aFxuICAvLyBiYWNrd2FyZHMtY29tcGF0aWJpbGl0eSBmb3IgdGhlIG9sZCBgcmVxdWlyZSgpYCBBUEkuIElmIHdlJ3JlIGluXG4gIC8vIHRoZSBicm93c2VyLCBhZGQgYF9gIGFzIGEgZ2xvYmFsIG9iamVjdC5cbiAgaWYgKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJykge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgICAgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gXztcbiAgICB9XG4gICAgZXhwb3J0cy5fID0gXztcbiAgfSBlbHNlIHtcbiAgICByb290Ll8gPSBfO1xuICB9XG5cbiAgLy8gQ3VycmVudCB2ZXJzaW9uLlxuICBfLlZFUlNJT04gPSAnMS43LjAnO1xuXG4gIC8vIEludGVybmFsIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhbiBlZmZpY2llbnQgKGZvciBjdXJyZW50IGVuZ2luZXMpIHZlcnNpb25cbiAgLy8gb2YgdGhlIHBhc3NlZC1pbiBjYWxsYmFjaywgdG8gYmUgcmVwZWF0ZWRseSBhcHBsaWVkIGluIG90aGVyIFVuZGVyc2NvcmVcbiAgLy8gZnVuY3Rpb25zLlxuICB2YXIgY3JlYXRlQ2FsbGJhY2sgPSBmdW5jdGlvbihmdW5jLCBjb250ZXh0LCBhcmdDb3VudCkge1xuICAgIGlmIChjb250ZXh0ID09PSB2b2lkIDApIHJldHVybiBmdW5jO1xuICAgIHN3aXRjaCAoYXJnQ291bnQgPT0gbnVsbCA/IDMgOiBhcmdDb3VudCkge1xuICAgICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmMuY2FsbChjb250ZXh0LCB2YWx1ZSk7XG4gICAgICB9O1xuICAgICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24odmFsdWUsIG90aGVyKSB7XG4gICAgICAgIHJldHVybiBmdW5jLmNhbGwoY29udGV4dCwgdmFsdWUsIG90aGVyKTtcbiAgICAgIH07XG4gICAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIGZ1bmMuY2FsbChjb250ZXh0LCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pO1xuICAgICAgfTtcbiAgICAgIGNhc2UgNDogcmV0dXJuIGZ1bmN0aW9uKGFjY3VtdWxhdG9yLCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIGZ1bmMuY2FsbChjb250ZXh0LCBhY2N1bXVsYXRvciwgdmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKTtcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfTtcblxuICAvLyBBIG1vc3RseS1pbnRlcm5hbCBmdW5jdGlvbiB0byBnZW5lcmF0ZSBjYWxsYmFja3MgdGhhdCBjYW4gYmUgYXBwbGllZFxuICAvLyB0byBlYWNoIGVsZW1lbnQgaW4gYSBjb2xsZWN0aW9uLCByZXR1cm5pbmcgdGhlIGRlc2lyZWQgcmVzdWx0IOKAlCBlaXRoZXJcbiAgLy8gaWRlbnRpdHksIGFuIGFyYml0cmFyeSBjYWxsYmFjaywgYSBwcm9wZXJ0eSBtYXRjaGVyLCBvciBhIHByb3BlcnR5IGFjY2Vzc29yLlxuICBfLml0ZXJhdGVlID0gZnVuY3Rpb24odmFsdWUsIGNvbnRleHQsIGFyZ0NvdW50KSB7XG4gICAgaWYgKHZhbHVlID09IG51bGwpIHJldHVybiBfLmlkZW50aXR5O1xuICAgIGlmIChfLmlzRnVuY3Rpb24odmFsdWUpKSByZXR1cm4gY3JlYXRlQ2FsbGJhY2sodmFsdWUsIGNvbnRleHQsIGFyZ0NvdW50KTtcbiAgICBpZiAoXy5pc09iamVjdCh2YWx1ZSkpIHJldHVybiBfLm1hdGNoZXModmFsdWUpO1xuICAgIHJldHVybiBfLnByb3BlcnR5KHZhbHVlKTtcbiAgfTtcblxuICAvLyBDb2xsZWN0aW9uIEZ1bmN0aW9uc1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIFRoZSBjb3JuZXJzdG9uZSwgYW4gYGVhY2hgIGltcGxlbWVudGF0aW9uLCBha2EgYGZvckVhY2hgLlxuICAvLyBIYW5kbGVzIHJhdyBvYmplY3RzIGluIGFkZGl0aW9uIHRvIGFycmF5LWxpa2VzLiBUcmVhdHMgYWxsXG4gIC8vIHNwYXJzZSBhcnJheS1saWtlcyBhcyBpZiB0aGV5IHdlcmUgZGVuc2UuXG4gIF8uZWFjaCA9IF8uZm9yRWFjaCA9IGZ1bmN0aW9uKG9iaiwgaXRlcmF0ZWUsIGNvbnRleHQpIHtcbiAgICBpZiAob2JqID09IG51bGwpIHJldHVybiBvYmo7XG4gICAgaXRlcmF0ZWUgPSBjcmVhdGVDYWxsYmFjayhpdGVyYXRlZSwgY29udGV4dCk7XG4gICAgdmFyIGksIGxlbmd0aCA9IG9iai5sZW5ndGg7XG4gICAgaWYgKGxlbmd0aCA9PT0gK2xlbmd0aCkge1xuICAgICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGl0ZXJhdGVlKG9ialtpXSwgaSwgb2JqKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGtleXMgPSBfLmtleXMob2JqKTtcbiAgICAgIGZvciAoaSA9IDAsIGxlbmd0aCA9IGtleXMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaXRlcmF0ZWUob2JqW2tleXNbaV1dLCBrZXlzW2ldLCBvYmopO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqO1xuICB9O1xuXG4gIC8vIFJldHVybiB0aGUgcmVzdWx0cyBvZiBhcHBseWluZyB0aGUgaXRlcmF0ZWUgdG8gZWFjaCBlbGVtZW50LlxuICBfLm1hcCA9IF8uY29sbGVjdCA9IGZ1bmN0aW9uKG9iaiwgaXRlcmF0ZWUsIGNvbnRleHQpIHtcbiAgICBpZiAob2JqID09IG51bGwpIHJldHVybiBbXTtcbiAgICBpdGVyYXRlZSA9IF8uaXRlcmF0ZWUoaXRlcmF0ZWUsIGNvbnRleHQpO1xuICAgIHZhciBrZXlzID0gb2JqLmxlbmd0aCAhPT0gK29iai5sZW5ndGggJiYgXy5rZXlzKG9iaiksXG4gICAgICAgIGxlbmd0aCA9IChrZXlzIHx8IG9iaikubGVuZ3RoLFxuICAgICAgICByZXN1bHRzID0gQXJyYXkobGVuZ3RoKSxcbiAgICAgICAgY3VycmVudEtleTtcbiAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICBjdXJyZW50S2V5ID0ga2V5cyA/IGtleXNbaW5kZXhdIDogaW5kZXg7XG4gICAgICByZXN1bHRzW2luZGV4XSA9IGl0ZXJhdGVlKG9ialtjdXJyZW50S2V5XSwgY3VycmVudEtleSwgb2JqKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH07XG5cbiAgdmFyIHJlZHVjZUVycm9yID0gJ1JlZHVjZSBvZiBlbXB0eSBhcnJheSB3aXRoIG5vIGluaXRpYWwgdmFsdWUnO1xuXG4gIC8vICoqUmVkdWNlKiogYnVpbGRzIHVwIGEgc2luZ2xlIHJlc3VsdCBmcm9tIGEgbGlzdCBvZiB2YWx1ZXMsIGFrYSBgaW5qZWN0YCxcbiAgLy8gb3IgYGZvbGRsYC5cbiAgXy5yZWR1Y2UgPSBfLmZvbGRsID0gXy5pbmplY3QgPSBmdW5jdGlvbihvYmosIGl0ZXJhdGVlLCBtZW1vLCBjb250ZXh0KSB7XG4gICAgaWYgKG9iaiA9PSBudWxsKSBvYmogPSBbXTtcbiAgICBpdGVyYXRlZSA9IGNyZWF0ZUNhbGxiYWNrKGl0ZXJhdGVlLCBjb250ZXh0LCA0KTtcbiAgICB2YXIga2V5cyA9IG9iai5sZW5ndGggIT09ICtvYmoubGVuZ3RoICYmIF8ua2V5cyhvYmopLFxuICAgICAgICBsZW5ndGggPSAoa2V5cyB8fCBvYmopLmxlbmd0aCxcbiAgICAgICAgaW5kZXggPSAwLCBjdXJyZW50S2V5O1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMykge1xuICAgICAgaWYgKCFsZW5ndGgpIHRocm93IG5ldyBUeXBlRXJyb3IocmVkdWNlRXJyb3IpO1xuICAgICAgbWVtbyA9IG9ialtrZXlzID8ga2V5c1tpbmRleCsrXSA6IGluZGV4KytdO1xuICAgIH1cbiAgICBmb3IgKDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIGN1cnJlbnRLZXkgPSBrZXlzID8ga2V5c1tpbmRleF0gOiBpbmRleDtcbiAgICAgIG1lbW8gPSBpdGVyYXRlZShtZW1vLCBvYmpbY3VycmVudEtleV0sIGN1cnJlbnRLZXksIG9iaik7XG4gICAgfVxuICAgIHJldHVybiBtZW1vO1xuICB9O1xuXG4gIC8vIFRoZSByaWdodC1hc3NvY2lhdGl2ZSB2ZXJzaW9uIG9mIHJlZHVjZSwgYWxzbyBrbm93biBhcyBgZm9sZHJgLlxuICBfLnJlZHVjZVJpZ2h0ID0gXy5mb2xkciA9IGZ1bmN0aW9uKG9iaiwgaXRlcmF0ZWUsIG1lbW8sIGNvbnRleHQpIHtcbiAgICBpZiAob2JqID09IG51bGwpIG9iaiA9IFtdO1xuICAgIGl0ZXJhdGVlID0gY3JlYXRlQ2FsbGJhY2soaXRlcmF0ZWUsIGNvbnRleHQsIDQpO1xuICAgIHZhciBrZXlzID0gb2JqLmxlbmd0aCAhPT0gKyBvYmoubGVuZ3RoICYmIF8ua2V5cyhvYmopLFxuICAgICAgICBpbmRleCA9IChrZXlzIHx8IG9iaikubGVuZ3RoLFxuICAgICAgICBjdXJyZW50S2V5O1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMykge1xuICAgICAgaWYgKCFpbmRleCkgdGhyb3cgbmV3IFR5cGVFcnJvcihyZWR1Y2VFcnJvcik7XG4gICAgICBtZW1vID0gb2JqW2tleXMgPyBrZXlzWy0taW5kZXhdIDogLS1pbmRleF07XG4gICAgfVxuICAgIHdoaWxlIChpbmRleC0tKSB7XG4gICAgICBjdXJyZW50S2V5ID0ga2V5cyA/IGtleXNbaW5kZXhdIDogaW5kZXg7XG4gICAgICBtZW1vID0gaXRlcmF0ZWUobWVtbywgb2JqW2N1cnJlbnRLZXldLCBjdXJyZW50S2V5LCBvYmopO1xuICAgIH1cbiAgICByZXR1cm4gbWVtbztcbiAgfTtcblxuICAvLyBSZXR1cm4gdGhlIGZpcnN0IHZhbHVlIHdoaWNoIHBhc3NlcyBhIHRydXRoIHRlc3QuIEFsaWFzZWQgYXMgYGRldGVjdGAuXG4gIF8uZmluZCA9IF8uZGV0ZWN0ID0gZnVuY3Rpb24ob2JqLCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgcmVzdWx0O1xuICAgIHByZWRpY2F0ZSA9IF8uaXRlcmF0ZWUocHJlZGljYXRlLCBjb250ZXh0KTtcbiAgICBfLnNvbWUob2JqLCBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGxpc3QpIHtcbiAgICAgIGlmIChwcmVkaWNhdGUodmFsdWUsIGluZGV4LCBsaXN0KSkge1xuICAgICAgICByZXN1bHQgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvLyBSZXR1cm4gYWxsIHRoZSBlbGVtZW50cyB0aGF0IHBhc3MgYSB0cnV0aCB0ZXN0LlxuICAvLyBBbGlhc2VkIGFzIGBzZWxlY3RgLlxuICBfLmZpbHRlciA9IF8uc2VsZWN0ID0gZnVuY3Rpb24ob2JqLCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgIGlmIChvYmogPT0gbnVsbCkgcmV0dXJuIHJlc3VsdHM7XG4gICAgcHJlZGljYXRlID0gXy5pdGVyYXRlZShwcmVkaWNhdGUsIGNvbnRleHQpO1xuICAgIF8uZWFjaChvYmosIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgbGlzdCkge1xuICAgICAgaWYgKHByZWRpY2F0ZSh2YWx1ZSwgaW5kZXgsIGxpc3QpKSByZXN1bHRzLnB1c2godmFsdWUpO1xuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHRzO1xuICB9O1xuXG4gIC8vIFJldHVybiBhbGwgdGhlIGVsZW1lbnRzIGZvciB3aGljaCBhIHRydXRoIHRlc3QgZmFpbHMuXG4gIF8ucmVqZWN0ID0gZnVuY3Rpb24ob2JqLCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gXy5maWx0ZXIob2JqLCBfLm5lZ2F0ZShfLml0ZXJhdGVlKHByZWRpY2F0ZSkpLCBjb250ZXh0KTtcbiAgfTtcblxuICAvLyBEZXRlcm1pbmUgd2hldGhlciBhbGwgb2YgdGhlIGVsZW1lbnRzIG1hdGNoIGEgdHJ1dGggdGVzdC5cbiAgLy8gQWxpYXNlZCBhcyBgYWxsYC5cbiAgXy5ldmVyeSA9IF8uYWxsID0gZnVuY3Rpb24ob2JqLCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICBpZiAob2JqID09IG51bGwpIHJldHVybiB0cnVlO1xuICAgIHByZWRpY2F0ZSA9IF8uaXRlcmF0ZWUocHJlZGljYXRlLCBjb250ZXh0KTtcbiAgICB2YXIga2V5cyA9IG9iai5sZW5ndGggIT09ICtvYmoubGVuZ3RoICYmIF8ua2V5cyhvYmopLFxuICAgICAgICBsZW5ndGggPSAoa2V5cyB8fCBvYmopLmxlbmd0aCxcbiAgICAgICAgaW5kZXgsIGN1cnJlbnRLZXk7XG4gICAgZm9yIChpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICBjdXJyZW50S2V5ID0ga2V5cyA/IGtleXNbaW5kZXhdIDogaW5kZXg7XG4gICAgICBpZiAoIXByZWRpY2F0ZShvYmpbY3VycmVudEtleV0sIGN1cnJlbnRLZXksIG9iaikpIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgLy8gRGV0ZXJtaW5lIGlmIGF0IGxlYXN0IG9uZSBlbGVtZW50IGluIHRoZSBvYmplY3QgbWF0Y2hlcyBhIHRydXRoIHRlc3QuXG4gIC8vIEFsaWFzZWQgYXMgYGFueWAuXG4gIF8uc29tZSA9IF8uYW55ID0gZnVuY3Rpb24ob2JqLCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICBpZiAob2JqID09IG51bGwpIHJldHVybiBmYWxzZTtcbiAgICBwcmVkaWNhdGUgPSBfLml0ZXJhdGVlKHByZWRpY2F0ZSwgY29udGV4dCk7XG4gICAgdmFyIGtleXMgPSBvYmoubGVuZ3RoICE9PSArb2JqLmxlbmd0aCAmJiBfLmtleXMob2JqKSxcbiAgICAgICAgbGVuZ3RoID0gKGtleXMgfHwgb2JqKS5sZW5ndGgsXG4gICAgICAgIGluZGV4LCBjdXJyZW50S2V5O1xuICAgIGZvciAoaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgY3VycmVudEtleSA9IGtleXMgPyBrZXlzW2luZGV4XSA6IGluZGV4O1xuICAgICAgaWYgKHByZWRpY2F0ZShvYmpbY3VycmVudEtleV0sIGN1cnJlbnRLZXksIG9iaikpIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgLy8gRGV0ZXJtaW5lIGlmIHRoZSBhcnJheSBvciBvYmplY3QgY29udGFpbnMgYSBnaXZlbiB2YWx1ZSAodXNpbmcgYD09PWApLlxuICAvLyBBbGlhc2VkIGFzIGBpbmNsdWRlYC5cbiAgXy5jb250YWlucyA9IF8uaW5jbHVkZSA9IGZ1bmN0aW9uKG9iaiwgdGFyZ2V0KSB7XG4gICAgaWYgKG9iaiA9PSBudWxsKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKG9iai5sZW5ndGggIT09ICtvYmoubGVuZ3RoKSBvYmogPSBfLnZhbHVlcyhvYmopO1xuICAgIHJldHVybiBfLmluZGV4T2Yob2JqLCB0YXJnZXQpID49IDA7XG4gIH07XG5cbiAgLy8gSW52b2tlIGEgbWV0aG9kICh3aXRoIGFyZ3VtZW50cykgb24gZXZlcnkgaXRlbSBpbiBhIGNvbGxlY3Rpb24uXG4gIF8uaW52b2tlID0gZnVuY3Rpb24ob2JqLCBtZXRob2QpIHtcbiAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcbiAgICB2YXIgaXNGdW5jID0gXy5pc0Z1bmN0aW9uKG1ldGhvZCk7XG4gICAgcmV0dXJuIF8ubWFwKG9iaiwgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHJldHVybiAoaXNGdW5jID8gbWV0aG9kIDogdmFsdWVbbWV0aG9kXSkuYXBwbHkodmFsdWUsIGFyZ3MpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8vIENvbnZlbmllbmNlIHZlcnNpb24gb2YgYSBjb21tb24gdXNlIGNhc2Ugb2YgYG1hcGA6IGZldGNoaW5nIGEgcHJvcGVydHkuXG4gIF8ucGx1Y2sgPSBmdW5jdGlvbihvYmosIGtleSkge1xuICAgIHJldHVybiBfLm1hcChvYmosIF8ucHJvcGVydHkoa2V5KSk7XG4gIH07XG5cbiAgLy8gQ29udmVuaWVuY2UgdmVyc2lvbiBvZiBhIGNvbW1vbiB1c2UgY2FzZSBvZiBgZmlsdGVyYDogc2VsZWN0aW5nIG9ubHkgb2JqZWN0c1xuICAvLyBjb250YWluaW5nIHNwZWNpZmljIGBrZXk6dmFsdWVgIHBhaXJzLlxuICBfLndoZXJlID0gZnVuY3Rpb24ob2JqLCBhdHRycykge1xuICAgIHJldHVybiBfLmZpbHRlcihvYmosIF8ubWF0Y2hlcyhhdHRycykpO1xuICB9O1xuXG4gIC8vIENvbnZlbmllbmNlIHZlcnNpb24gb2YgYSBjb21tb24gdXNlIGNhc2Ugb2YgYGZpbmRgOiBnZXR0aW5nIHRoZSBmaXJzdCBvYmplY3RcbiAgLy8gY29udGFpbmluZyBzcGVjaWZpYyBga2V5OnZhbHVlYCBwYWlycy5cbiAgXy5maW5kV2hlcmUgPSBmdW5jdGlvbihvYmosIGF0dHJzKSB7XG4gICAgcmV0dXJuIF8uZmluZChvYmosIF8ubWF0Y2hlcyhhdHRycykpO1xuICB9O1xuXG4gIC8vIFJldHVybiB0aGUgbWF4aW11bSBlbGVtZW50IChvciBlbGVtZW50LWJhc2VkIGNvbXB1dGF0aW9uKS5cbiAgXy5tYXggPSBmdW5jdGlvbihvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgdmFyIHJlc3VsdCA9IC1JbmZpbml0eSwgbGFzdENvbXB1dGVkID0gLUluZmluaXR5LFxuICAgICAgICB2YWx1ZSwgY29tcHV0ZWQ7XG4gICAgaWYgKGl0ZXJhdGVlID09IG51bGwgJiYgb2JqICE9IG51bGwpIHtcbiAgICAgIG9iaiA9IG9iai5sZW5ndGggPT09ICtvYmoubGVuZ3RoID8gb2JqIDogXy52YWx1ZXMob2JqKTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBvYmoubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFsdWUgPSBvYmpbaV07XG4gICAgICAgIGlmICh2YWx1ZSA+IHJlc3VsdCkge1xuICAgICAgICAgIHJlc3VsdCA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGl0ZXJhdGVlID0gXy5pdGVyYXRlZShpdGVyYXRlZSwgY29udGV4dCk7XG4gICAgICBfLmVhY2gob2JqLCBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGxpc3QpIHtcbiAgICAgICAgY29tcHV0ZWQgPSBpdGVyYXRlZSh2YWx1ZSwgaW5kZXgsIGxpc3QpO1xuICAgICAgICBpZiAoY29tcHV0ZWQgPiBsYXN0Q29tcHV0ZWQgfHwgY29tcHV0ZWQgPT09IC1JbmZpbml0eSAmJiByZXN1bHQgPT09IC1JbmZpbml0eSkge1xuICAgICAgICAgIHJlc3VsdCA9IHZhbHVlO1xuICAgICAgICAgIGxhc3RDb21wdXRlZCA9IGNvbXB1dGVkO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvLyBSZXR1cm4gdGhlIG1pbmltdW0gZWxlbWVudCAob3IgZWxlbWVudC1iYXNlZCBjb21wdXRhdGlvbikuXG4gIF8ubWluID0gZnVuY3Rpb24ob2JqLCBpdGVyYXRlZSwgY29udGV4dCkge1xuICAgIHZhciByZXN1bHQgPSBJbmZpbml0eSwgbGFzdENvbXB1dGVkID0gSW5maW5pdHksXG4gICAgICAgIHZhbHVlLCBjb21wdXRlZDtcbiAgICBpZiAoaXRlcmF0ZWUgPT0gbnVsbCAmJiBvYmogIT0gbnVsbCkge1xuICAgICAgb2JqID0gb2JqLmxlbmd0aCA9PT0gK29iai5sZW5ndGggPyBvYmogOiBfLnZhbHVlcyhvYmopO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IG9iai5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICB2YWx1ZSA9IG9ialtpXTtcbiAgICAgICAgaWYgKHZhbHVlIDwgcmVzdWx0KSB7XG4gICAgICAgICAgcmVzdWx0ID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaXRlcmF0ZWUgPSBfLml0ZXJhdGVlKGl0ZXJhdGVlLCBjb250ZXh0KTtcbiAgICAgIF8uZWFjaChvYmosIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgbGlzdCkge1xuICAgICAgICBjb21wdXRlZCA9IGl0ZXJhdGVlKHZhbHVlLCBpbmRleCwgbGlzdCk7XG4gICAgICAgIGlmIChjb21wdXRlZCA8IGxhc3RDb21wdXRlZCB8fCBjb21wdXRlZCA9PT0gSW5maW5pdHkgJiYgcmVzdWx0ID09PSBJbmZpbml0eSkge1xuICAgICAgICAgIHJlc3VsdCA9IHZhbHVlO1xuICAgICAgICAgIGxhc3RDb21wdXRlZCA9IGNvbXB1dGVkO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvLyBTaHVmZmxlIGEgY29sbGVjdGlvbiwgdXNpbmcgdGhlIG1vZGVybiB2ZXJzaW9uIG9mIHRoZVxuICAvLyBbRmlzaGVyLVlhdGVzIHNodWZmbGVdKGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvRmlzaGVy4oCTWWF0ZXNfc2h1ZmZsZSkuXG4gIF8uc2h1ZmZsZSA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHZhciBzZXQgPSBvYmogJiYgb2JqLmxlbmd0aCA9PT0gK29iai5sZW5ndGggPyBvYmogOiBfLnZhbHVlcyhvYmopO1xuICAgIHZhciBsZW5ndGggPSBzZXQubGVuZ3RoO1xuICAgIHZhciBzaHVmZmxlZCA9IEFycmF5KGxlbmd0aCk7XG4gICAgZm9yICh2YXIgaW5kZXggPSAwLCByYW5kOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgcmFuZCA9IF8ucmFuZG9tKDAsIGluZGV4KTtcbiAgICAgIGlmIChyYW5kICE9PSBpbmRleCkgc2h1ZmZsZWRbaW5kZXhdID0gc2h1ZmZsZWRbcmFuZF07XG4gICAgICBzaHVmZmxlZFtyYW5kXSA9IHNldFtpbmRleF07XG4gICAgfVxuICAgIHJldHVybiBzaHVmZmxlZDtcbiAgfTtcblxuICAvLyBTYW1wbGUgKipuKiogcmFuZG9tIHZhbHVlcyBmcm9tIGEgY29sbGVjdGlvbi5cbiAgLy8gSWYgKipuKiogaXMgbm90IHNwZWNpZmllZCwgcmV0dXJucyBhIHNpbmdsZSByYW5kb20gZWxlbWVudC5cbiAgLy8gVGhlIGludGVybmFsIGBndWFyZGAgYXJndW1lbnQgYWxsb3dzIGl0IHRvIHdvcmsgd2l0aCBgbWFwYC5cbiAgXy5zYW1wbGUgPSBmdW5jdGlvbihvYmosIG4sIGd1YXJkKSB7XG4gICAgaWYgKG4gPT0gbnVsbCB8fCBndWFyZCkge1xuICAgICAgaWYgKG9iai5sZW5ndGggIT09ICtvYmoubGVuZ3RoKSBvYmogPSBfLnZhbHVlcyhvYmopO1xuICAgICAgcmV0dXJuIG9ialtfLnJhbmRvbShvYmoubGVuZ3RoIC0gMSldO1xuICAgIH1cbiAgICByZXR1cm4gXy5zaHVmZmxlKG9iaikuc2xpY2UoMCwgTWF0aC5tYXgoMCwgbikpO1xuICB9O1xuXG4gIC8vIFNvcnQgdGhlIG9iamVjdCdzIHZhbHVlcyBieSBhIGNyaXRlcmlvbiBwcm9kdWNlZCBieSBhbiBpdGVyYXRlZS5cbiAgXy5zb3J0QnkgPSBmdW5jdGlvbihvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgaXRlcmF0ZWUgPSBfLml0ZXJhdGVlKGl0ZXJhdGVlLCBjb250ZXh0KTtcbiAgICByZXR1cm4gXy5wbHVjayhfLm1hcChvYmosIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgbGlzdCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgIGNyaXRlcmlhOiBpdGVyYXRlZSh2YWx1ZSwgaW5kZXgsIGxpc3QpXG4gICAgICB9O1xuICAgIH0pLnNvcnQoZnVuY3Rpb24obGVmdCwgcmlnaHQpIHtcbiAgICAgIHZhciBhID0gbGVmdC5jcml0ZXJpYTtcbiAgICAgIHZhciBiID0gcmlnaHQuY3JpdGVyaWE7XG4gICAgICBpZiAoYSAhPT0gYikge1xuICAgICAgICBpZiAoYSA+IGIgfHwgYSA9PT0gdm9pZCAwKSByZXR1cm4gMTtcbiAgICAgICAgaWYgKGEgPCBiIHx8IGIgPT09IHZvaWQgMCkgcmV0dXJuIC0xO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGxlZnQuaW5kZXggLSByaWdodC5pbmRleDtcbiAgICB9KSwgJ3ZhbHVlJyk7XG4gIH07XG5cbiAgLy8gQW4gaW50ZXJuYWwgZnVuY3Rpb24gdXNlZCBmb3IgYWdncmVnYXRlIFwiZ3JvdXAgYnlcIiBvcGVyYXRpb25zLlxuICB2YXIgZ3JvdXAgPSBmdW5jdGlvbihiZWhhdmlvcikge1xuICAgIHJldHVybiBmdW5jdGlvbihvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgICBpdGVyYXRlZSA9IF8uaXRlcmF0ZWUoaXRlcmF0ZWUsIGNvbnRleHQpO1xuICAgICAgXy5lYWNoKG9iaiwgZnVuY3Rpb24odmFsdWUsIGluZGV4KSB7XG4gICAgICAgIHZhciBrZXkgPSBpdGVyYXRlZSh2YWx1ZSwgaW5kZXgsIG9iaik7XG4gICAgICAgIGJlaGF2aW9yKHJlc3VsdCwgdmFsdWUsIGtleSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgfTtcblxuICAvLyBHcm91cHMgdGhlIG9iamVjdCdzIHZhbHVlcyBieSBhIGNyaXRlcmlvbi4gUGFzcyBlaXRoZXIgYSBzdHJpbmcgYXR0cmlidXRlXG4gIC8vIHRvIGdyb3VwIGJ5LCBvciBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgY3JpdGVyaW9uLlxuICBfLmdyb3VwQnkgPSBncm91cChmdW5jdGlvbihyZXN1bHQsIHZhbHVlLCBrZXkpIHtcbiAgICBpZiAoXy5oYXMocmVzdWx0LCBrZXkpKSByZXN1bHRba2V5XS5wdXNoKHZhbHVlKTsgZWxzZSByZXN1bHRba2V5XSA9IFt2YWx1ZV07XG4gIH0pO1xuXG4gIC8vIEluZGV4ZXMgdGhlIG9iamVjdCdzIHZhbHVlcyBieSBhIGNyaXRlcmlvbiwgc2ltaWxhciB0byBgZ3JvdXBCeWAsIGJ1dCBmb3JcbiAgLy8gd2hlbiB5b3Uga25vdyB0aGF0IHlvdXIgaW5kZXggdmFsdWVzIHdpbGwgYmUgdW5pcXVlLlxuICBfLmluZGV4QnkgPSBncm91cChmdW5jdGlvbihyZXN1bHQsIHZhbHVlLCBrZXkpIHtcbiAgICByZXN1bHRba2V5XSA9IHZhbHVlO1xuICB9KTtcblxuICAvLyBDb3VudHMgaW5zdGFuY2VzIG9mIGFuIG9iamVjdCB0aGF0IGdyb3VwIGJ5IGEgY2VydGFpbiBjcml0ZXJpb24uIFBhc3NcbiAgLy8gZWl0aGVyIGEgc3RyaW5nIGF0dHJpYnV0ZSB0byBjb3VudCBieSwgb3IgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlXG4gIC8vIGNyaXRlcmlvbi5cbiAgXy5jb3VudEJ5ID0gZ3JvdXAoZnVuY3Rpb24ocmVzdWx0LCB2YWx1ZSwga2V5KSB7XG4gICAgaWYgKF8uaGFzKHJlc3VsdCwga2V5KSkgcmVzdWx0W2tleV0rKzsgZWxzZSByZXN1bHRba2V5XSA9IDE7XG4gIH0pO1xuXG4gIC8vIFVzZSBhIGNvbXBhcmF0b3IgZnVuY3Rpb24gdG8gZmlndXJlIG91dCB0aGUgc21hbGxlc3QgaW5kZXggYXQgd2hpY2hcbiAgLy8gYW4gb2JqZWN0IHNob3VsZCBiZSBpbnNlcnRlZCBzbyBhcyB0byBtYWludGFpbiBvcmRlci4gVXNlcyBiaW5hcnkgc2VhcmNoLlxuICBfLnNvcnRlZEluZGV4ID0gZnVuY3Rpb24oYXJyYXksIG9iaiwgaXRlcmF0ZWUsIGNvbnRleHQpIHtcbiAgICBpdGVyYXRlZSA9IF8uaXRlcmF0ZWUoaXRlcmF0ZWUsIGNvbnRleHQsIDEpO1xuICAgIHZhciB2YWx1ZSA9IGl0ZXJhdGVlKG9iaik7XG4gICAgdmFyIGxvdyA9IDAsIGhpZ2ggPSBhcnJheS5sZW5ndGg7XG4gICAgd2hpbGUgKGxvdyA8IGhpZ2gpIHtcbiAgICAgIHZhciBtaWQgPSBsb3cgKyBoaWdoID4+PiAxO1xuICAgICAgaWYgKGl0ZXJhdGVlKGFycmF5W21pZF0pIDwgdmFsdWUpIGxvdyA9IG1pZCArIDE7IGVsc2UgaGlnaCA9IG1pZDtcbiAgICB9XG4gICAgcmV0dXJuIGxvdztcbiAgfTtcblxuICAvLyBTYWZlbHkgY3JlYXRlIGEgcmVhbCwgbGl2ZSBhcnJheSBmcm9tIGFueXRoaW5nIGl0ZXJhYmxlLlxuICBfLnRvQXJyYXkgPSBmdW5jdGlvbihvYmopIHtcbiAgICBpZiAoIW9iaikgcmV0dXJuIFtdO1xuICAgIGlmIChfLmlzQXJyYXkob2JqKSkgcmV0dXJuIHNsaWNlLmNhbGwob2JqKTtcbiAgICBpZiAob2JqLmxlbmd0aCA9PT0gK29iai5sZW5ndGgpIHJldHVybiBfLm1hcChvYmosIF8uaWRlbnRpdHkpO1xuICAgIHJldHVybiBfLnZhbHVlcyhvYmopO1xuICB9O1xuXG4gIC8vIFJldHVybiB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIGFuIG9iamVjdC5cbiAgXy5zaXplID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKG9iaiA9PSBudWxsKSByZXR1cm4gMDtcbiAgICByZXR1cm4gb2JqLmxlbmd0aCA9PT0gK29iai5sZW5ndGggPyBvYmoubGVuZ3RoIDogXy5rZXlzKG9iaikubGVuZ3RoO1xuICB9O1xuXG4gIC8vIFNwbGl0IGEgY29sbGVjdGlvbiBpbnRvIHR3byBhcnJheXM6IG9uZSB3aG9zZSBlbGVtZW50cyBhbGwgc2F0aXNmeSB0aGUgZ2l2ZW5cbiAgLy8gcHJlZGljYXRlLCBhbmQgb25lIHdob3NlIGVsZW1lbnRzIGFsbCBkbyBub3Qgc2F0aXNmeSB0aGUgcHJlZGljYXRlLlxuICBfLnBhcnRpdGlvbiA9IGZ1bmN0aW9uKG9iaiwgcHJlZGljYXRlLCBjb250ZXh0KSB7XG4gICAgcHJlZGljYXRlID0gXy5pdGVyYXRlZShwcmVkaWNhdGUsIGNvbnRleHQpO1xuICAgIHZhciBwYXNzID0gW10sIGZhaWwgPSBbXTtcbiAgICBfLmVhY2gob2JqLCBmdW5jdGlvbih2YWx1ZSwga2V5LCBvYmopIHtcbiAgICAgIChwcmVkaWNhdGUodmFsdWUsIGtleSwgb2JqKSA/IHBhc3MgOiBmYWlsKS5wdXNoKHZhbHVlKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW3Bhc3MsIGZhaWxdO1xuICB9O1xuXG4gIC8vIEFycmF5IEZ1bmN0aW9uc1xuICAvLyAtLS0tLS0tLS0tLS0tLS1cblxuICAvLyBHZXQgdGhlIGZpcnN0IGVsZW1lbnQgb2YgYW4gYXJyYXkuIFBhc3NpbmcgKipuKiogd2lsbCByZXR1cm4gdGhlIGZpcnN0IE5cbiAgLy8gdmFsdWVzIGluIHRoZSBhcnJheS4gQWxpYXNlZCBhcyBgaGVhZGAgYW5kIGB0YWtlYC4gVGhlICoqZ3VhcmQqKiBjaGVja1xuICAvLyBhbGxvd3MgaXQgdG8gd29yayB3aXRoIGBfLm1hcGAuXG4gIF8uZmlyc3QgPSBfLmhlYWQgPSBfLnRha2UgPSBmdW5jdGlvbihhcnJheSwgbiwgZ3VhcmQpIHtcbiAgICBpZiAoYXJyYXkgPT0gbnVsbCkgcmV0dXJuIHZvaWQgMDtcbiAgICBpZiAobiA9PSBudWxsIHx8IGd1YXJkKSByZXR1cm4gYXJyYXlbMF07XG4gICAgaWYgKG4gPCAwKSByZXR1cm4gW107XG4gICAgcmV0dXJuIHNsaWNlLmNhbGwoYXJyYXksIDAsIG4pO1xuICB9O1xuXG4gIC8vIFJldHVybnMgZXZlcnl0aGluZyBidXQgdGhlIGxhc3QgZW50cnkgb2YgdGhlIGFycmF5LiBFc3BlY2lhbGx5IHVzZWZ1bCBvblxuICAvLyB0aGUgYXJndW1lbnRzIG9iamVjdC4gUGFzc2luZyAqKm4qKiB3aWxsIHJldHVybiBhbGwgdGhlIHZhbHVlcyBpblxuICAvLyB0aGUgYXJyYXksIGV4Y2x1ZGluZyB0aGUgbGFzdCBOLiBUaGUgKipndWFyZCoqIGNoZWNrIGFsbG93cyBpdCB0byB3b3JrIHdpdGhcbiAgLy8gYF8ubWFwYC5cbiAgXy5pbml0aWFsID0gZnVuY3Rpb24oYXJyYXksIG4sIGd1YXJkKSB7XG4gICAgcmV0dXJuIHNsaWNlLmNhbGwoYXJyYXksIDAsIE1hdGgubWF4KDAsIGFycmF5Lmxlbmd0aCAtIChuID09IG51bGwgfHwgZ3VhcmQgPyAxIDogbikpKTtcbiAgfTtcblxuICAvLyBHZXQgdGhlIGxhc3QgZWxlbWVudCBvZiBhbiBhcnJheS4gUGFzc2luZyAqKm4qKiB3aWxsIHJldHVybiB0aGUgbGFzdCBOXG4gIC8vIHZhbHVlcyBpbiB0aGUgYXJyYXkuIFRoZSAqKmd1YXJkKiogY2hlY2sgYWxsb3dzIGl0IHRvIHdvcmsgd2l0aCBgXy5tYXBgLlxuICBfLmxhc3QgPSBmdW5jdGlvbihhcnJheSwgbiwgZ3VhcmQpIHtcbiAgICBpZiAoYXJyYXkgPT0gbnVsbCkgcmV0dXJuIHZvaWQgMDtcbiAgICBpZiAobiA9PSBudWxsIHx8IGd1YXJkKSByZXR1cm4gYXJyYXlbYXJyYXkubGVuZ3RoIC0gMV07XG4gICAgcmV0dXJuIHNsaWNlLmNhbGwoYXJyYXksIE1hdGgubWF4KGFycmF5Lmxlbmd0aCAtIG4sIDApKTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGV2ZXJ5dGhpbmcgYnV0IHRoZSBmaXJzdCBlbnRyeSBvZiB0aGUgYXJyYXkuIEFsaWFzZWQgYXMgYHRhaWxgIGFuZCBgZHJvcGAuXG4gIC8vIEVzcGVjaWFsbHkgdXNlZnVsIG9uIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBQYXNzaW5nIGFuICoqbioqIHdpbGwgcmV0dXJuXG4gIC8vIHRoZSByZXN0IE4gdmFsdWVzIGluIHRoZSBhcnJheS4gVGhlICoqZ3VhcmQqKlxuICAvLyBjaGVjayBhbGxvd3MgaXQgdG8gd29yayB3aXRoIGBfLm1hcGAuXG4gIF8ucmVzdCA9IF8udGFpbCA9IF8uZHJvcCA9IGZ1bmN0aW9uKGFycmF5LCBuLCBndWFyZCkge1xuICAgIHJldHVybiBzbGljZS5jYWxsKGFycmF5LCBuID09IG51bGwgfHwgZ3VhcmQgPyAxIDogbik7XG4gIH07XG5cbiAgLy8gVHJpbSBvdXQgYWxsIGZhbHN5IHZhbHVlcyBmcm9tIGFuIGFycmF5LlxuICBfLmNvbXBhY3QgPSBmdW5jdGlvbihhcnJheSkge1xuICAgIHJldHVybiBfLmZpbHRlcihhcnJheSwgXy5pZGVudGl0eSk7XG4gIH07XG5cbiAgLy8gSW50ZXJuYWwgaW1wbGVtZW50YXRpb24gb2YgYSByZWN1cnNpdmUgYGZsYXR0ZW5gIGZ1bmN0aW9uLlxuICB2YXIgZmxhdHRlbiA9IGZ1bmN0aW9uKGlucHV0LCBzaGFsbG93LCBzdHJpY3QsIG91dHB1dCkge1xuICAgIGlmIChzaGFsbG93ICYmIF8uZXZlcnkoaW5wdXQsIF8uaXNBcnJheSkpIHtcbiAgICAgIHJldHVybiBjb25jYXQuYXBwbHkob3V0cHV0LCBpbnB1dCk7XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBpbnB1dC5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHZhbHVlID0gaW5wdXRbaV07XG4gICAgICBpZiAoIV8uaXNBcnJheSh2YWx1ZSkgJiYgIV8uaXNBcmd1bWVudHModmFsdWUpKSB7XG4gICAgICAgIGlmICghc3RyaWN0KSBvdXRwdXQucHVzaCh2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKHNoYWxsb3cpIHtcbiAgICAgICAgcHVzaC5hcHBseShvdXRwdXQsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZsYXR0ZW4odmFsdWUsIHNoYWxsb3csIHN0cmljdCwgb3V0cHV0KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfTtcblxuICAvLyBGbGF0dGVuIG91dCBhbiBhcnJheSwgZWl0aGVyIHJlY3Vyc2l2ZWx5IChieSBkZWZhdWx0KSwgb3IganVzdCBvbmUgbGV2ZWwuXG4gIF8uZmxhdHRlbiA9IGZ1bmN0aW9uKGFycmF5LCBzaGFsbG93KSB7XG4gICAgcmV0dXJuIGZsYXR0ZW4oYXJyYXksIHNoYWxsb3csIGZhbHNlLCBbXSk7XG4gIH07XG5cbiAgLy8gUmV0dXJuIGEgdmVyc2lvbiBvZiB0aGUgYXJyYXkgdGhhdCBkb2VzIG5vdCBjb250YWluIHRoZSBzcGVjaWZpZWQgdmFsdWUocykuXG4gIF8ud2l0aG91dCA9IGZ1bmN0aW9uKGFycmF5KSB7XG4gICAgcmV0dXJuIF8uZGlmZmVyZW5jZShhcnJheSwgc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcbiAgfTtcblxuICAvLyBQcm9kdWNlIGEgZHVwbGljYXRlLWZyZWUgdmVyc2lvbiBvZiB0aGUgYXJyYXkuIElmIHRoZSBhcnJheSBoYXMgYWxyZWFkeVxuICAvLyBiZWVuIHNvcnRlZCwgeW91IGhhdmUgdGhlIG9wdGlvbiBvZiB1c2luZyBhIGZhc3RlciBhbGdvcml0aG0uXG4gIC8vIEFsaWFzZWQgYXMgYHVuaXF1ZWAuXG4gIF8udW5pcSA9IF8udW5pcXVlID0gZnVuY3Rpb24oYXJyYXksIGlzU29ydGVkLCBpdGVyYXRlZSwgY29udGV4dCkge1xuICAgIGlmIChhcnJheSA9PSBudWxsKSByZXR1cm4gW107XG4gICAgaWYgKCFfLmlzQm9vbGVhbihpc1NvcnRlZCkpIHtcbiAgICAgIGNvbnRleHQgPSBpdGVyYXRlZTtcbiAgICAgIGl0ZXJhdGVlID0gaXNTb3J0ZWQ7XG4gICAgICBpc1NvcnRlZCA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAoaXRlcmF0ZWUgIT0gbnVsbCkgaXRlcmF0ZWUgPSBfLml0ZXJhdGVlKGl0ZXJhdGVlLCBjb250ZXh0KTtcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgdmFyIHNlZW4gPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gYXJyYXkubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciB2YWx1ZSA9IGFycmF5W2ldO1xuICAgICAgaWYgKGlzU29ydGVkKSB7XG4gICAgICAgIGlmICghaSB8fCBzZWVuICE9PSB2YWx1ZSkgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgICAgICBzZWVuID0gdmFsdWU7XG4gICAgICB9IGVsc2UgaWYgKGl0ZXJhdGVlKSB7XG4gICAgICAgIHZhciBjb21wdXRlZCA9IGl0ZXJhdGVlKHZhbHVlLCBpLCBhcnJheSk7XG4gICAgICAgIGlmIChfLmluZGV4T2Yoc2VlbiwgY29tcHV0ZWQpIDwgMCkge1xuICAgICAgICAgIHNlZW4ucHVzaChjb21wdXRlZCk7XG4gICAgICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKF8uaW5kZXhPZihyZXN1bHQsIHZhbHVlKSA8IDApIHtcbiAgICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8vIFByb2R1Y2UgYW4gYXJyYXkgdGhhdCBjb250YWlucyB0aGUgdW5pb246IGVhY2ggZGlzdGluY3QgZWxlbWVudCBmcm9tIGFsbCBvZlxuICAvLyB0aGUgcGFzc2VkLWluIGFycmF5cy5cbiAgXy51bmlvbiA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBfLnVuaXEoZmxhdHRlbihhcmd1bWVudHMsIHRydWUsIHRydWUsIFtdKSk7XG4gIH07XG5cbiAgLy8gUHJvZHVjZSBhbiBhcnJheSB0aGF0IGNvbnRhaW5zIGV2ZXJ5IGl0ZW0gc2hhcmVkIGJldHdlZW4gYWxsIHRoZVxuICAvLyBwYXNzZWQtaW4gYXJyYXlzLlxuICBfLmludGVyc2VjdGlvbiA9IGZ1bmN0aW9uKGFycmF5KSB7XG4gICAgaWYgKGFycmF5ID09IG51bGwpIHJldHVybiBbXTtcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgdmFyIGFyZ3NMZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBhcnJheS5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGl0ZW0gPSBhcnJheVtpXTtcbiAgICAgIGlmIChfLmNvbnRhaW5zKHJlc3VsdCwgaXRlbSkpIGNvbnRpbnVlO1xuICAgICAgZm9yICh2YXIgaiA9IDE7IGogPCBhcmdzTGVuZ3RoOyBqKyspIHtcbiAgICAgICAgaWYgKCFfLmNvbnRhaW5zKGFyZ3VtZW50c1tqXSwgaXRlbSkpIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKGogPT09IGFyZ3NMZW5ndGgpIHJlc3VsdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8vIFRha2UgdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiBvbmUgYXJyYXkgYW5kIGEgbnVtYmVyIG9mIG90aGVyIGFycmF5cy5cbiAgLy8gT25seSB0aGUgZWxlbWVudHMgcHJlc2VudCBpbiBqdXN0IHRoZSBmaXJzdCBhcnJheSB3aWxsIHJlbWFpbi5cbiAgXy5kaWZmZXJlbmNlID0gZnVuY3Rpb24oYXJyYXkpIHtcbiAgICB2YXIgcmVzdCA9IGZsYXR0ZW4oc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpLCB0cnVlLCB0cnVlLCBbXSk7XG4gICAgcmV0dXJuIF8uZmlsdGVyKGFycmF5LCBmdW5jdGlvbih2YWx1ZSl7XG4gICAgICByZXR1cm4gIV8uY29udGFpbnMocmVzdCwgdmFsdWUpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8vIFppcCB0b2dldGhlciBtdWx0aXBsZSBsaXN0cyBpbnRvIGEgc2luZ2xlIGFycmF5IC0tIGVsZW1lbnRzIHRoYXQgc2hhcmVcbiAgLy8gYW4gaW5kZXggZ28gdG9nZXRoZXIuXG4gIF8uemlwID0gZnVuY3Rpb24oYXJyYXkpIHtcbiAgICBpZiAoYXJyYXkgPT0gbnVsbCkgcmV0dXJuIFtdO1xuICAgIHZhciBsZW5ndGggPSBfLm1heChhcmd1bWVudHMsICdsZW5ndGgnKS5sZW5ndGg7XG4gICAgdmFyIHJlc3VsdHMgPSBBcnJheShsZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHJlc3VsdHNbaV0gPSBfLnBsdWNrKGFyZ3VtZW50cywgaSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRzO1xuICB9O1xuXG4gIC8vIENvbnZlcnRzIGxpc3RzIGludG8gb2JqZWN0cy4gUGFzcyBlaXRoZXIgYSBzaW5nbGUgYXJyYXkgb2YgYFtrZXksIHZhbHVlXWBcbiAgLy8gcGFpcnMsIG9yIHR3byBwYXJhbGxlbCBhcnJheXMgb2YgdGhlIHNhbWUgbGVuZ3RoIC0tIG9uZSBvZiBrZXlzLCBhbmQgb25lIG9mXG4gIC8vIHRoZSBjb3JyZXNwb25kaW5nIHZhbHVlcy5cbiAgXy5vYmplY3QgPSBmdW5jdGlvbihsaXN0LCB2YWx1ZXMpIHtcbiAgICBpZiAobGlzdCA9PSBudWxsKSByZXR1cm4ge307XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBsaXN0Lmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodmFsdWVzKSB7XG4gICAgICAgIHJlc3VsdFtsaXN0W2ldXSA9IHZhbHVlc1tpXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdFtsaXN0W2ldWzBdXSA9IGxpc3RbaV1bMV07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgLy8gUmV0dXJuIHRoZSBwb3NpdGlvbiBvZiB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiBhbiBpdGVtIGluIGFuIGFycmF5LFxuICAvLyBvciAtMSBpZiB0aGUgaXRlbSBpcyBub3QgaW5jbHVkZWQgaW4gdGhlIGFycmF5LlxuICAvLyBJZiB0aGUgYXJyYXkgaXMgbGFyZ2UgYW5kIGFscmVhZHkgaW4gc29ydCBvcmRlciwgcGFzcyBgdHJ1ZWBcbiAgLy8gZm9yICoqaXNTb3J0ZWQqKiB0byB1c2UgYmluYXJ5IHNlYXJjaC5cbiAgXy5pbmRleE9mID0gZnVuY3Rpb24oYXJyYXksIGl0ZW0sIGlzU29ydGVkKSB7XG4gICAgaWYgKGFycmF5ID09IG51bGwpIHJldHVybiAtMTtcbiAgICB2YXIgaSA9IDAsIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgICBpZiAoaXNTb3J0ZWQpIHtcbiAgICAgIGlmICh0eXBlb2YgaXNTb3J0ZWQgPT0gJ251bWJlcicpIHtcbiAgICAgICAgaSA9IGlzU29ydGVkIDwgMCA/IE1hdGgubWF4KDAsIGxlbmd0aCArIGlzU29ydGVkKSA6IGlzU29ydGVkO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaSA9IF8uc29ydGVkSW5kZXgoYXJyYXksIGl0ZW0pO1xuICAgICAgICByZXR1cm4gYXJyYXlbaV0gPT09IGl0ZW0gPyBpIDogLTE7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAoOyBpIDwgbGVuZ3RoOyBpKyspIGlmIChhcnJheVtpXSA9PT0gaXRlbSkgcmV0dXJuIGk7XG4gICAgcmV0dXJuIC0xO1xuICB9O1xuXG4gIF8ubGFzdEluZGV4T2YgPSBmdW5jdGlvbihhcnJheSwgaXRlbSwgZnJvbSkge1xuICAgIGlmIChhcnJheSA9PSBudWxsKSByZXR1cm4gLTE7XG4gICAgdmFyIGlkeCA9IGFycmF5Lmxlbmd0aDtcbiAgICBpZiAodHlwZW9mIGZyb20gPT0gJ251bWJlcicpIHtcbiAgICAgIGlkeCA9IGZyb20gPCAwID8gaWR4ICsgZnJvbSArIDEgOiBNYXRoLm1pbihpZHgsIGZyb20gKyAxKTtcbiAgICB9XG4gICAgd2hpbGUgKC0taWR4ID49IDApIGlmIChhcnJheVtpZHhdID09PSBpdGVtKSByZXR1cm4gaWR4O1xuICAgIHJldHVybiAtMTtcbiAgfTtcblxuICAvLyBHZW5lcmF0ZSBhbiBpbnRlZ2VyIEFycmF5IGNvbnRhaW5pbmcgYW4gYXJpdGhtZXRpYyBwcm9ncmVzc2lvbi4gQSBwb3J0IG9mXG4gIC8vIHRoZSBuYXRpdmUgUHl0aG9uIGByYW5nZSgpYCBmdW5jdGlvbi4gU2VlXG4gIC8vIFt0aGUgUHl0aG9uIGRvY3VtZW50YXRpb25dKGh0dHA6Ly9kb2NzLnB5dGhvbi5vcmcvbGlicmFyeS9mdW5jdGlvbnMuaHRtbCNyYW5nZSkuXG4gIF8ucmFuZ2UgPSBmdW5jdGlvbihzdGFydCwgc3RvcCwgc3RlcCkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDw9IDEpIHtcbiAgICAgIHN0b3AgPSBzdGFydCB8fCAwO1xuICAgICAgc3RhcnQgPSAwO1xuICAgIH1cbiAgICBzdGVwID0gc3RlcCB8fCAxO1xuXG4gICAgdmFyIGxlbmd0aCA9IE1hdGgubWF4KE1hdGguY2VpbCgoc3RvcCAtIHN0YXJ0KSAvIHN0ZXApLCAwKTtcbiAgICB2YXIgcmFuZ2UgPSBBcnJheShsZW5ndGgpO1xuXG4gICAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgbGVuZ3RoOyBpZHgrKywgc3RhcnQgKz0gc3RlcCkge1xuICAgICAgcmFuZ2VbaWR4XSA9IHN0YXJ0O1xuICAgIH1cblxuICAgIHJldHVybiByYW5nZTtcbiAgfTtcblxuICAvLyBGdW5jdGlvbiAoYWhlbSkgRnVuY3Rpb25zXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIFJldXNhYmxlIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIGZvciBwcm90b3R5cGUgc2V0dGluZy5cbiAgdmFyIEN0b3IgPSBmdW5jdGlvbigpe307XG5cbiAgLy8gQ3JlYXRlIGEgZnVuY3Rpb24gYm91bmQgdG8gYSBnaXZlbiBvYmplY3QgKGFzc2lnbmluZyBgdGhpc2AsIGFuZCBhcmd1bWVudHMsXG4gIC8vIG9wdGlvbmFsbHkpLiBEZWxlZ2F0ZXMgdG8gKipFQ01BU2NyaXB0IDUqKidzIG5hdGl2ZSBgRnVuY3Rpb24uYmluZGAgaWZcbiAgLy8gYXZhaWxhYmxlLlxuICBfLmJpbmQgPSBmdW5jdGlvbihmdW5jLCBjb250ZXh0KSB7XG4gICAgdmFyIGFyZ3MsIGJvdW5kO1xuICAgIGlmIChuYXRpdmVCaW5kICYmIGZ1bmMuYmluZCA9PT0gbmF0aXZlQmluZCkgcmV0dXJuIG5hdGl2ZUJpbmQuYXBwbHkoZnVuYywgc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcbiAgICBpZiAoIV8uaXNGdW5jdGlvbihmdW5jKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignQmluZCBtdXN0IGJlIGNhbGxlZCBvbiBhIGZ1bmN0aW9uJyk7XG4gICAgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcbiAgICBib3VuZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIGJvdW5kKSkgcmV0dXJuIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncy5jb25jYXQoc2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XG4gICAgICBDdG9yLnByb3RvdHlwZSA9IGZ1bmMucHJvdG90eXBlO1xuICAgICAgdmFyIHNlbGYgPSBuZXcgQ3RvcjtcbiAgICAgIEN0b3IucHJvdG90eXBlID0gbnVsbDtcbiAgICAgIHZhciByZXN1bHQgPSBmdW5jLmFwcGx5KHNlbGYsIGFyZ3MuY29uY2F0KHNsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xuICAgICAgaWYgKF8uaXNPYmplY3QocmVzdWx0KSkgcmV0dXJuIHJlc3VsdDtcbiAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG4gICAgcmV0dXJuIGJvdW5kO1xuICB9O1xuXG4gIC8vIFBhcnRpYWxseSBhcHBseSBhIGZ1bmN0aW9uIGJ5IGNyZWF0aW5nIGEgdmVyc2lvbiB0aGF0IGhhcyBoYWQgc29tZSBvZiBpdHNcbiAgLy8gYXJndW1lbnRzIHByZS1maWxsZWQsIHdpdGhvdXQgY2hhbmdpbmcgaXRzIGR5bmFtaWMgYHRoaXNgIGNvbnRleHQuIF8gYWN0c1xuICAvLyBhcyBhIHBsYWNlaG9sZGVyLCBhbGxvd2luZyBhbnkgY29tYmluYXRpb24gb2YgYXJndW1lbnRzIHRvIGJlIHByZS1maWxsZWQuXG4gIF8ucGFydGlhbCA9IGZ1bmN0aW9uKGZ1bmMpIHtcbiAgICB2YXIgYm91bmRBcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBwb3NpdGlvbiA9IDA7XG4gICAgICB2YXIgYXJncyA9IGJvdW5kQXJncy5zbGljZSgpO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGFyZ3MubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGFyZ3NbaV0gPT09IF8pIGFyZ3NbaV0gPSBhcmd1bWVudHNbcG9zaXRpb24rK107XG4gICAgICB9XG4gICAgICB3aGlsZSAocG9zaXRpb24gPCBhcmd1bWVudHMubGVuZ3RoKSBhcmdzLnB1c2goYXJndW1lbnRzW3Bvc2l0aW9uKytdKTtcbiAgICAgIHJldHVybiBmdW5jLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH07XG4gIH07XG5cbiAgLy8gQmluZCBhIG51bWJlciBvZiBhbiBvYmplY3QncyBtZXRob2RzIHRvIHRoYXQgb2JqZWN0LiBSZW1haW5pbmcgYXJndW1lbnRzXG4gIC8vIGFyZSB0aGUgbWV0aG9kIG5hbWVzIHRvIGJlIGJvdW5kLiBVc2VmdWwgZm9yIGVuc3VyaW5nIHRoYXQgYWxsIGNhbGxiYWNrc1xuICAvLyBkZWZpbmVkIG9uIGFuIG9iamVjdCBiZWxvbmcgdG8gaXQuXG4gIF8uYmluZEFsbCA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHZhciBpLCBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoLCBrZXk7XG4gICAgaWYgKGxlbmd0aCA8PSAxKSB0aHJvdyBuZXcgRXJyb3IoJ2JpbmRBbGwgbXVzdCBiZSBwYXNzZWQgZnVuY3Rpb24gbmFtZXMnKTtcbiAgICBmb3IgKGkgPSAxOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGtleSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgIG9ialtrZXldID0gXy5iaW5kKG9ialtrZXldLCBvYmopO1xuICAgIH1cbiAgICByZXR1cm4gb2JqO1xuICB9O1xuXG4gIC8vIE1lbW9pemUgYW4gZXhwZW5zaXZlIGZ1bmN0aW9uIGJ5IHN0b3JpbmcgaXRzIHJlc3VsdHMuXG4gIF8ubWVtb2l6ZSA9IGZ1bmN0aW9uKGZ1bmMsIGhhc2hlcikge1xuICAgIHZhciBtZW1vaXplID0gZnVuY3Rpb24oa2V5KSB7XG4gICAgICB2YXIgY2FjaGUgPSBtZW1vaXplLmNhY2hlO1xuICAgICAgdmFyIGFkZHJlc3MgPSBoYXNoZXIgPyBoYXNoZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSA6IGtleTtcbiAgICAgIGlmICghXy5oYXMoY2FjaGUsIGFkZHJlc3MpKSBjYWNoZVthZGRyZXNzXSA9IGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIHJldHVybiBjYWNoZVthZGRyZXNzXTtcbiAgICB9O1xuICAgIG1lbW9pemUuY2FjaGUgPSB7fTtcbiAgICByZXR1cm4gbWVtb2l6ZTtcbiAgfTtcblxuICAvLyBEZWxheXMgYSBmdW5jdGlvbiBmb3IgdGhlIGdpdmVuIG51bWJlciBvZiBtaWxsaXNlY29uZHMsIGFuZCB0aGVuIGNhbGxzXG4gIC8vIGl0IHdpdGggdGhlIGFyZ3VtZW50cyBzdXBwbGllZC5cbiAgXy5kZWxheSA9IGZ1bmN0aW9uKGZ1bmMsIHdhaXQpIHtcbiAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcbiAgICByZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgcmV0dXJuIGZ1bmMuYXBwbHkobnVsbCwgYXJncyk7XG4gICAgfSwgd2FpdCk7XG4gIH07XG5cbiAgLy8gRGVmZXJzIGEgZnVuY3Rpb24sIHNjaGVkdWxpbmcgaXQgdG8gcnVuIGFmdGVyIHRoZSBjdXJyZW50IGNhbGwgc3RhY2sgaGFzXG4gIC8vIGNsZWFyZWQuXG4gIF8uZGVmZXIgPSBmdW5jdGlvbihmdW5jKSB7XG4gICAgcmV0dXJuIF8uZGVsYXkuYXBwbHkoXywgW2Z1bmMsIDFdLmNvbmNhdChzbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpKTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQsIHdoZW4gaW52b2tlZCwgd2lsbCBvbmx5IGJlIHRyaWdnZXJlZCBhdCBtb3N0IG9uY2VcbiAgLy8gZHVyaW5nIGEgZ2l2ZW4gd2luZG93IG9mIHRpbWUuIE5vcm1hbGx5LCB0aGUgdGhyb3R0bGVkIGZ1bmN0aW9uIHdpbGwgcnVuXG4gIC8vIGFzIG11Y2ggYXMgaXQgY2FuLCB3aXRob3V0IGV2ZXIgZ29pbmcgbW9yZSB0aGFuIG9uY2UgcGVyIGB3YWl0YCBkdXJhdGlvbjtcbiAgLy8gYnV0IGlmIHlvdSdkIGxpa2UgdG8gZGlzYWJsZSB0aGUgZXhlY3V0aW9uIG9uIHRoZSBsZWFkaW5nIGVkZ2UsIHBhc3NcbiAgLy8gYHtsZWFkaW5nOiBmYWxzZX1gLiBUbyBkaXNhYmxlIGV4ZWN1dGlvbiBvbiB0aGUgdHJhaWxpbmcgZWRnZSwgZGl0dG8uXG4gIF8udGhyb3R0bGUgPSBmdW5jdGlvbihmdW5jLCB3YWl0LCBvcHRpb25zKSB7XG4gICAgdmFyIGNvbnRleHQsIGFyZ3MsIHJlc3VsdDtcbiAgICB2YXIgdGltZW91dCA9IG51bGw7XG4gICAgdmFyIHByZXZpb3VzID0gMDtcbiAgICBpZiAoIW9wdGlvbnMpIG9wdGlvbnMgPSB7fTtcbiAgICB2YXIgbGF0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIHByZXZpb3VzID0gb3B0aW9ucy5sZWFkaW5nID09PSBmYWxzZSA/IDAgOiBfLm5vdygpO1xuICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgaWYgKCF0aW1lb3V0KSBjb250ZXh0ID0gYXJncyA9IG51bGw7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgbm93ID0gXy5ub3coKTtcbiAgICAgIGlmICghcHJldmlvdXMgJiYgb3B0aW9ucy5sZWFkaW5nID09PSBmYWxzZSkgcHJldmlvdXMgPSBub3c7XG4gICAgICB2YXIgcmVtYWluaW5nID0gd2FpdCAtIChub3cgLSBwcmV2aW91cyk7XG4gICAgICBjb250ZXh0ID0gdGhpcztcbiAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICBpZiAocmVtYWluaW5nIDw9IDAgfHwgcmVtYWluaW5nID4gd2FpdCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICBwcmV2aW91cyA9IG5vdztcbiAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgaWYgKCF0aW1lb3V0KSBjb250ZXh0ID0gYXJncyA9IG51bGw7XG4gICAgICB9IGVsc2UgaWYgKCF0aW1lb3V0ICYmIG9wdGlvbnMudHJhaWxpbmcgIT09IGZhbHNlKSB7XG4gICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCByZW1haW5pbmcpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICB9O1xuXG4gIC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCwgYXMgbG9uZyBhcyBpdCBjb250aW51ZXMgdG8gYmUgaW52b2tlZCwgd2lsbCBub3RcbiAgLy8gYmUgdHJpZ2dlcmVkLiBUaGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgaXQgc3RvcHMgYmVpbmcgY2FsbGVkIGZvclxuICAvLyBOIG1pbGxpc2Vjb25kcy4gSWYgYGltbWVkaWF0ZWAgaXMgcGFzc2VkLCB0cmlnZ2VyIHRoZSBmdW5jdGlvbiBvbiB0aGVcbiAgLy8gbGVhZGluZyBlZGdlLCBpbnN0ZWFkIG9mIHRoZSB0cmFpbGluZy5cbiAgXy5kZWJvdW5jZSA9IGZ1bmN0aW9uKGZ1bmMsIHdhaXQsIGltbWVkaWF0ZSkge1xuICAgIHZhciB0aW1lb3V0LCBhcmdzLCBjb250ZXh0LCB0aW1lc3RhbXAsIHJlc3VsdDtcblxuICAgIHZhciBsYXRlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGxhc3QgPSBfLm5vdygpIC0gdGltZXN0YW1wO1xuXG4gICAgICBpZiAobGFzdCA8IHdhaXQgJiYgbGFzdCA+IDApIHtcbiAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQgLSBsYXN0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICBpZiAoIWltbWVkaWF0ZSkge1xuICAgICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgICAgaWYgKCF0aW1lb3V0KSBjb250ZXh0ID0gYXJncyA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgY29udGV4dCA9IHRoaXM7XG4gICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgdGltZXN0YW1wID0gXy5ub3coKTtcbiAgICAgIHZhciBjYWxsTm93ID0gaW1tZWRpYXRlICYmICF0aW1lb3V0O1xuICAgICAgaWYgKCF0aW1lb3V0KSB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCk7XG4gICAgICBpZiAoY2FsbE5vdykge1xuICAgICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICBjb250ZXh0ID0gYXJncyA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIHRoZSBmaXJzdCBmdW5jdGlvbiBwYXNzZWQgYXMgYW4gYXJndW1lbnQgdG8gdGhlIHNlY29uZCxcbiAgLy8gYWxsb3dpbmcgeW91IHRvIGFkanVzdCBhcmd1bWVudHMsIHJ1biBjb2RlIGJlZm9yZSBhbmQgYWZ0ZXIsIGFuZFxuICAvLyBjb25kaXRpb25hbGx5IGV4ZWN1dGUgdGhlIG9yaWdpbmFsIGZ1bmN0aW9uLlxuICBfLndyYXAgPSBmdW5jdGlvbihmdW5jLCB3cmFwcGVyKSB7XG4gICAgcmV0dXJuIF8ucGFydGlhbCh3cmFwcGVyLCBmdW5jKTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGEgbmVnYXRlZCB2ZXJzaW9uIG9mIHRoZSBwYXNzZWQtaW4gcHJlZGljYXRlLlxuICBfLm5lZ2F0ZSA9IGZ1bmN0aW9uKHByZWRpY2F0ZSkge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiAhcHJlZGljYXRlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBpcyB0aGUgY29tcG9zaXRpb24gb2YgYSBsaXN0IG9mIGZ1bmN0aW9ucywgZWFjaFxuICAvLyBjb25zdW1pbmcgdGhlIHJldHVybiB2YWx1ZSBvZiB0aGUgZnVuY3Rpb24gdGhhdCBmb2xsb3dzLlxuICBfLmNvbXBvc2UgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICB2YXIgc3RhcnQgPSBhcmdzLmxlbmd0aCAtIDE7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGkgPSBzdGFydDtcbiAgICAgIHZhciByZXN1bHQgPSBhcmdzW3N0YXJ0XS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgd2hpbGUgKGktLSkgcmVzdWx0ID0gYXJnc1tpXS5jYWxsKHRoaXMsIHJlc3VsdCk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gIH07XG5cbiAgLy8gUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgd2lsbCBvbmx5IGJlIGV4ZWN1dGVkIGFmdGVyIGJlaW5nIGNhbGxlZCBOIHRpbWVzLlxuICBfLmFmdGVyID0gZnVuY3Rpb24odGltZXMsIGZ1bmMpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoLS10aW1lcyA8IDEpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cbiAgICB9O1xuICB9O1xuXG4gIC8vIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IHdpbGwgb25seSBiZSBleGVjdXRlZCBiZWZvcmUgYmVpbmcgY2FsbGVkIE4gdGltZXMuXG4gIF8uYmVmb3JlID0gZnVuY3Rpb24odGltZXMsIGZ1bmMpIHtcbiAgICB2YXIgbWVtbztcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoLS10aW1lcyA+IDApIHtcbiAgICAgICAgbWVtbyA9IGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZ1bmMgPSBudWxsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG1lbW87XG4gICAgfTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCB3aWxsIGJlIGV4ZWN1dGVkIGF0IG1vc3Qgb25lIHRpbWUsIG5vIG1hdHRlciBob3dcbiAgLy8gb2Z0ZW4geW91IGNhbGwgaXQuIFVzZWZ1bCBmb3IgbGF6eSBpbml0aWFsaXphdGlvbi5cbiAgXy5vbmNlID0gXy5wYXJ0aWFsKF8uYmVmb3JlLCAyKTtcblxuICAvLyBPYmplY3QgRnVuY3Rpb25zXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS1cblxuICAvLyBSZXRyaWV2ZSB0aGUgbmFtZXMgb2YgYW4gb2JqZWN0J3MgcHJvcGVydGllcy5cbiAgLy8gRGVsZWdhdGVzIHRvICoqRUNNQVNjcmlwdCA1KioncyBuYXRpdmUgYE9iamVjdC5rZXlzYFxuICBfLmtleXMgPSBmdW5jdGlvbihvYmopIHtcbiAgICBpZiAoIV8uaXNPYmplY3Qob2JqKSkgcmV0dXJuIFtdO1xuICAgIGlmIChuYXRpdmVLZXlzKSByZXR1cm4gbmF0aXZlS2V5cyhvYmopO1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iaikgaWYgKF8uaGFzKG9iaiwga2V5KSkga2V5cy5wdXNoKGtleSk7XG4gICAgcmV0dXJuIGtleXM7XG4gIH07XG5cbiAgLy8gUmV0cmlldmUgdGhlIHZhbHVlcyBvZiBhbiBvYmplY3QncyBwcm9wZXJ0aWVzLlxuICBfLnZhbHVlcyA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHZhciBrZXlzID0gXy5rZXlzKG9iaik7XG4gICAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgIHZhciB2YWx1ZXMgPSBBcnJheShsZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhbHVlc1tpXSA9IG9ialtrZXlzW2ldXTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlcztcbiAgfTtcblxuICAvLyBDb252ZXJ0IGFuIG9iamVjdCBpbnRvIGEgbGlzdCBvZiBgW2tleSwgdmFsdWVdYCBwYWlycy5cbiAgXy5wYWlycyA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHZhciBrZXlzID0gXy5rZXlzKG9iaik7XG4gICAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgIHZhciBwYWlycyA9IEFycmF5KGxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgcGFpcnNbaV0gPSBba2V5c1tpXSwgb2JqW2tleXNbaV1dXTtcbiAgICB9XG4gICAgcmV0dXJuIHBhaXJzO1xuICB9O1xuXG4gIC8vIEludmVydCB0aGUga2V5cyBhbmQgdmFsdWVzIG9mIGFuIG9iamVjdC4gVGhlIHZhbHVlcyBtdXN0IGJlIHNlcmlhbGl6YWJsZS5cbiAgXy5pbnZlcnQgPSBmdW5jdGlvbihvYmopIHtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgdmFyIGtleXMgPSBfLmtleXMob2JqKTtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0ga2V5cy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgcmVzdWx0W29ialtrZXlzW2ldXV0gPSBrZXlzW2ldO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8vIFJldHVybiBhIHNvcnRlZCBsaXN0IG9mIHRoZSBmdW5jdGlvbiBuYW1lcyBhdmFpbGFibGUgb24gdGhlIG9iamVjdC5cbiAgLy8gQWxpYXNlZCBhcyBgbWV0aG9kc2BcbiAgXy5mdW5jdGlvbnMgPSBfLm1ldGhvZHMgPSBmdW5jdGlvbihvYmopIHtcbiAgICB2YXIgbmFtZXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAoXy5pc0Z1bmN0aW9uKG9ialtrZXldKSkgbmFtZXMucHVzaChrZXkpO1xuICAgIH1cbiAgICByZXR1cm4gbmFtZXMuc29ydCgpO1xuICB9O1xuXG4gIC8vIEV4dGVuZCBhIGdpdmVuIG9iamVjdCB3aXRoIGFsbCB0aGUgcHJvcGVydGllcyBpbiBwYXNzZWQtaW4gb2JqZWN0KHMpLlxuICBfLmV4dGVuZCA9IGZ1bmN0aW9uKG9iaikge1xuICAgIGlmICghXy5pc09iamVjdChvYmopKSByZXR1cm4gb2JqO1xuICAgIHZhciBzb3VyY2UsIHByb3A7XG4gICAgZm9yICh2YXIgaSA9IDEsIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgc291cmNlID0gYXJndW1lbnRzW2ldO1xuICAgICAgZm9yIChwcm9wIGluIHNvdXJjZSkge1xuICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIHByb3ApKSB7XG4gICAgICAgICAgICBvYmpbcHJvcF0gPSBzb3VyY2VbcHJvcF07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbiAgfTtcblxuICAvLyBSZXR1cm4gYSBjb3B5IG9mIHRoZSBvYmplY3Qgb25seSBjb250YWluaW5nIHRoZSB3aGl0ZWxpc3RlZCBwcm9wZXJ0aWVzLlxuICBfLnBpY2sgPSBmdW5jdGlvbihvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgdmFyIHJlc3VsdCA9IHt9LCBrZXk7XG4gICAgaWYgKG9iaiA9PSBudWxsKSByZXR1cm4gcmVzdWx0O1xuICAgIGlmIChfLmlzRnVuY3Rpb24oaXRlcmF0ZWUpKSB7XG4gICAgICBpdGVyYXRlZSA9IGNyZWF0ZUNhbGxiYWNrKGl0ZXJhdGVlLCBjb250ZXh0KTtcbiAgICAgIGZvciAoa2V5IGluIG9iaikge1xuICAgICAgICB2YXIgdmFsdWUgPSBvYmpba2V5XTtcbiAgICAgICAgaWYgKGl0ZXJhdGVlKHZhbHVlLCBrZXksIG9iaikpIHJlc3VsdFtrZXldID0gdmFsdWU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBrZXlzID0gY29uY2F0LmFwcGx5KFtdLCBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpO1xuICAgICAgb2JqID0gbmV3IE9iamVjdChvYmopO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGtleXMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgaWYgKGtleSBpbiBvYmopIHJlc3VsdFtrZXldID0gb2JqW2tleV07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgIC8vIFJldHVybiBhIGNvcHkgb2YgdGhlIG9iamVjdCB3aXRob3V0IHRoZSBibGFja2xpc3RlZCBwcm9wZXJ0aWVzLlxuICBfLm9taXQgPSBmdW5jdGlvbihvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgaWYgKF8uaXNGdW5jdGlvbihpdGVyYXRlZSkpIHtcbiAgICAgIGl0ZXJhdGVlID0gXy5uZWdhdGUoaXRlcmF0ZWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIga2V5cyA9IF8ubWFwKGNvbmNhdC5hcHBseShbXSwgc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKSwgU3RyaW5nKTtcbiAgICAgIGl0ZXJhdGVlID0gZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICAgICAgICByZXR1cm4gIV8uY29udGFpbnMoa2V5cywga2V5KTtcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBfLnBpY2sob2JqLCBpdGVyYXRlZSwgY29udGV4dCk7XG4gIH07XG5cbiAgLy8gRmlsbCBpbiBhIGdpdmVuIG9iamVjdCB3aXRoIGRlZmF1bHQgcHJvcGVydGllcy5cbiAgXy5kZWZhdWx0cyA9IGZ1bmN0aW9uKG9iaikge1xuICAgIGlmICghXy5pc09iamVjdChvYmopKSByZXR1cm4gb2JqO1xuICAgIGZvciAodmFyIGkgPSAxLCBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG4gICAgICBmb3IgKHZhciBwcm9wIGluIHNvdXJjZSkge1xuICAgICAgICBpZiAob2JqW3Byb3BdID09PSB2b2lkIDApIG9ialtwcm9wXSA9IHNvdXJjZVtwcm9wXTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbiAgfTtcblxuICAvLyBDcmVhdGUgYSAoc2hhbGxvdy1jbG9uZWQpIGR1cGxpY2F0ZSBvZiBhbiBvYmplY3QuXG4gIF8uY2xvbmUgPSBmdW5jdGlvbihvYmopIHtcbiAgICBpZiAoIV8uaXNPYmplY3Qob2JqKSkgcmV0dXJuIG9iajtcbiAgICByZXR1cm4gXy5pc0FycmF5KG9iaikgPyBvYmouc2xpY2UoKSA6IF8uZXh0ZW5kKHt9LCBvYmopO1xuICB9O1xuXG4gIC8vIEludm9rZXMgaW50ZXJjZXB0b3Igd2l0aCB0aGUgb2JqLCBhbmQgdGhlbiByZXR1cm5zIG9iai5cbiAgLy8gVGhlIHByaW1hcnkgcHVycG9zZSBvZiB0aGlzIG1ldGhvZCBpcyB0byBcInRhcCBpbnRvXCIgYSBtZXRob2QgY2hhaW4sIGluXG4gIC8vIG9yZGVyIHRvIHBlcmZvcm0gb3BlcmF0aW9ucyBvbiBpbnRlcm1lZGlhdGUgcmVzdWx0cyB3aXRoaW4gdGhlIGNoYWluLlxuICBfLnRhcCA9IGZ1bmN0aW9uKG9iaiwgaW50ZXJjZXB0b3IpIHtcbiAgICBpbnRlcmNlcHRvcihvYmopO1xuICAgIHJldHVybiBvYmo7XG4gIH07XG5cbiAgLy8gSW50ZXJuYWwgcmVjdXJzaXZlIGNvbXBhcmlzb24gZnVuY3Rpb24gZm9yIGBpc0VxdWFsYC5cbiAgdmFyIGVxID0gZnVuY3Rpb24oYSwgYiwgYVN0YWNrLCBiU3RhY2spIHtcbiAgICAvLyBJZGVudGljYWwgb2JqZWN0cyBhcmUgZXF1YWwuIGAwID09PSAtMGAsIGJ1dCB0aGV5IGFyZW4ndCBpZGVudGljYWwuXG4gICAgLy8gU2VlIHRoZSBbSGFybW9ueSBgZWdhbGAgcHJvcG9zYWxdKGh0dHA6Ly93aWtpLmVjbWFzY3JpcHQub3JnL2Rva3UucGhwP2lkPWhhcm1vbnk6ZWdhbCkuXG4gICAgaWYgKGEgPT09IGIpIHJldHVybiBhICE9PSAwIHx8IDEgLyBhID09PSAxIC8gYjtcbiAgICAvLyBBIHN0cmljdCBjb21wYXJpc29uIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIGBudWxsID09IHVuZGVmaW5lZGAuXG4gICAgaWYgKGEgPT0gbnVsbCB8fCBiID09IG51bGwpIHJldHVybiBhID09PSBiO1xuICAgIC8vIFVud3JhcCBhbnkgd3JhcHBlZCBvYmplY3RzLlxuICAgIGlmIChhIGluc3RhbmNlb2YgXykgYSA9IGEuX3dyYXBwZWQ7XG4gICAgaWYgKGIgaW5zdGFuY2VvZiBfKSBiID0gYi5fd3JhcHBlZDtcbiAgICAvLyBDb21wYXJlIGBbW0NsYXNzXV1gIG5hbWVzLlxuICAgIHZhciBjbGFzc05hbWUgPSB0b1N0cmluZy5jYWxsKGEpO1xuICAgIGlmIChjbGFzc05hbWUgIT09IHRvU3RyaW5nLmNhbGwoYikpIHJldHVybiBmYWxzZTtcbiAgICBzd2l0Y2ggKGNsYXNzTmFtZSkge1xuICAgICAgLy8gU3RyaW5ncywgbnVtYmVycywgcmVndWxhciBleHByZXNzaW9ucywgZGF0ZXMsIGFuZCBib29sZWFucyBhcmUgY29tcGFyZWQgYnkgdmFsdWUuXG4gICAgICBjYXNlICdbb2JqZWN0IFJlZ0V4cF0nOlxuICAgICAgLy8gUmVnRXhwcyBhcmUgY29lcmNlZCB0byBzdHJpbmdzIGZvciBjb21wYXJpc29uIChOb3RlOiAnJyArIC9hL2kgPT09ICcvYS9pJylcbiAgICAgIGNhc2UgJ1tvYmplY3QgU3RyaW5nXSc6XG4gICAgICAgIC8vIFByaW1pdGl2ZXMgYW5kIHRoZWlyIGNvcnJlc3BvbmRpbmcgb2JqZWN0IHdyYXBwZXJzIGFyZSBlcXVpdmFsZW50OyB0aHVzLCBgXCI1XCJgIGlzXG4gICAgICAgIC8vIGVxdWl2YWxlbnQgdG8gYG5ldyBTdHJpbmcoXCI1XCIpYC5cbiAgICAgICAgcmV0dXJuICcnICsgYSA9PT0gJycgKyBiO1xuICAgICAgY2FzZSAnW29iamVjdCBOdW1iZXJdJzpcbiAgICAgICAgLy8gYE5hTmBzIGFyZSBlcXVpdmFsZW50LCBidXQgbm9uLXJlZmxleGl2ZS5cbiAgICAgICAgLy8gT2JqZWN0KE5hTikgaXMgZXF1aXZhbGVudCB0byBOYU5cbiAgICAgICAgaWYgKCthICE9PSArYSkgcmV0dXJuICtiICE9PSArYjtcbiAgICAgICAgLy8gQW4gYGVnYWxgIGNvbXBhcmlzb24gaXMgcGVyZm9ybWVkIGZvciBvdGhlciBudW1lcmljIHZhbHVlcy5cbiAgICAgICAgcmV0dXJuICthID09PSAwID8gMSAvICthID09PSAxIC8gYiA6ICthID09PSArYjtcbiAgICAgIGNhc2UgJ1tvYmplY3QgRGF0ZV0nOlxuICAgICAgY2FzZSAnW29iamVjdCBCb29sZWFuXSc6XG4gICAgICAgIC8vIENvZXJjZSBkYXRlcyBhbmQgYm9vbGVhbnMgdG8gbnVtZXJpYyBwcmltaXRpdmUgdmFsdWVzLiBEYXRlcyBhcmUgY29tcGFyZWQgYnkgdGhlaXJcbiAgICAgICAgLy8gbWlsbGlzZWNvbmQgcmVwcmVzZW50YXRpb25zLiBOb3RlIHRoYXQgaW52YWxpZCBkYXRlcyB3aXRoIG1pbGxpc2Vjb25kIHJlcHJlc2VudGF0aW9uc1xuICAgICAgICAvLyBvZiBgTmFOYCBhcmUgbm90IGVxdWl2YWxlbnQuXG4gICAgICAgIHJldHVybiArYSA9PT0gK2I7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgYSAhPSAnb2JqZWN0JyB8fCB0eXBlb2YgYiAhPSAnb2JqZWN0JykgcmV0dXJuIGZhbHNlO1xuICAgIC8vIEFzc3VtZSBlcXVhbGl0eSBmb3IgY3ljbGljIHN0cnVjdHVyZXMuIFRoZSBhbGdvcml0aG0gZm9yIGRldGVjdGluZyBjeWNsaWNcbiAgICAvLyBzdHJ1Y3R1cmVzIGlzIGFkYXB0ZWQgZnJvbSBFUyA1LjEgc2VjdGlvbiAxNS4xMi4zLCBhYnN0cmFjdCBvcGVyYXRpb24gYEpPYC5cbiAgICB2YXIgbGVuZ3RoID0gYVN0YWNrLmxlbmd0aDtcbiAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgIC8vIExpbmVhciBzZWFyY2guIFBlcmZvcm1hbmNlIGlzIGludmVyc2VseSBwcm9wb3J0aW9uYWwgdG8gdGhlIG51bWJlciBvZlxuICAgICAgLy8gdW5pcXVlIG5lc3RlZCBzdHJ1Y3R1cmVzLlxuICAgICAgaWYgKGFTdGFja1tsZW5ndGhdID09PSBhKSByZXR1cm4gYlN0YWNrW2xlbmd0aF0gPT09IGI7XG4gICAgfVxuICAgIC8vIE9iamVjdHMgd2l0aCBkaWZmZXJlbnQgY29uc3RydWN0b3JzIGFyZSBub3QgZXF1aXZhbGVudCwgYnV0IGBPYmplY3Rgc1xuICAgIC8vIGZyb20gZGlmZmVyZW50IGZyYW1lcyBhcmUuXG4gICAgdmFyIGFDdG9yID0gYS5jb25zdHJ1Y3RvciwgYkN0b3IgPSBiLmNvbnN0cnVjdG9yO1xuICAgIGlmIChcbiAgICAgIGFDdG9yICE9PSBiQ3RvciAmJlxuICAgICAgLy8gSGFuZGxlIE9iamVjdC5jcmVhdGUoeCkgY2FzZXNcbiAgICAgICdjb25zdHJ1Y3RvcicgaW4gYSAmJiAnY29uc3RydWN0b3InIGluIGIgJiZcbiAgICAgICEoXy5pc0Z1bmN0aW9uKGFDdG9yKSAmJiBhQ3RvciBpbnN0YW5jZW9mIGFDdG9yICYmXG4gICAgICAgIF8uaXNGdW5jdGlvbihiQ3RvcikgJiYgYkN0b3IgaW5zdGFuY2VvZiBiQ3RvcilcbiAgICApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gQWRkIHRoZSBmaXJzdCBvYmplY3QgdG8gdGhlIHN0YWNrIG9mIHRyYXZlcnNlZCBvYmplY3RzLlxuICAgIGFTdGFjay5wdXNoKGEpO1xuICAgIGJTdGFjay5wdXNoKGIpO1xuICAgIHZhciBzaXplLCByZXN1bHQ7XG4gICAgLy8gUmVjdXJzaXZlbHkgY29tcGFyZSBvYmplY3RzIGFuZCBhcnJheXMuXG4gICAgaWYgKGNsYXNzTmFtZSA9PT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgICAgLy8gQ29tcGFyZSBhcnJheSBsZW5ndGhzIHRvIGRldGVybWluZSBpZiBhIGRlZXAgY29tcGFyaXNvbiBpcyBuZWNlc3NhcnkuXG4gICAgICBzaXplID0gYS5sZW5ndGg7XG4gICAgICByZXN1bHQgPSBzaXplID09PSBiLmxlbmd0aDtcbiAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgLy8gRGVlcCBjb21wYXJlIHRoZSBjb250ZW50cywgaWdub3Jpbmcgbm9uLW51bWVyaWMgcHJvcGVydGllcy5cbiAgICAgICAgd2hpbGUgKHNpemUtLSkge1xuICAgICAgICAgIGlmICghKHJlc3VsdCA9IGVxKGFbc2l6ZV0sIGJbc2l6ZV0sIGFTdGFjaywgYlN0YWNrKSkpIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIERlZXAgY29tcGFyZSBvYmplY3RzLlxuICAgICAgdmFyIGtleXMgPSBfLmtleXMoYSksIGtleTtcbiAgICAgIHNpemUgPSBrZXlzLmxlbmd0aDtcbiAgICAgIC8vIEVuc3VyZSB0aGF0IGJvdGggb2JqZWN0cyBjb250YWluIHRoZSBzYW1lIG51bWJlciBvZiBwcm9wZXJ0aWVzIGJlZm9yZSBjb21wYXJpbmcgZGVlcCBlcXVhbGl0eS5cbiAgICAgIHJlc3VsdCA9IF8ua2V5cyhiKS5sZW5ndGggPT09IHNpemU7XG4gICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgIHdoaWxlIChzaXplLS0pIHtcbiAgICAgICAgICAvLyBEZWVwIGNvbXBhcmUgZWFjaCBtZW1iZXJcbiAgICAgICAgICBrZXkgPSBrZXlzW3NpemVdO1xuICAgICAgICAgIGlmICghKHJlc3VsdCA9IF8uaGFzKGIsIGtleSkgJiYgZXEoYVtrZXldLCBiW2tleV0sIGFTdGFjaywgYlN0YWNrKSkpIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8vIFJlbW92ZSB0aGUgZmlyc3Qgb2JqZWN0IGZyb20gdGhlIHN0YWNrIG9mIHRyYXZlcnNlZCBvYmplY3RzLlxuICAgIGFTdGFjay5wb3AoKTtcbiAgICBiU3RhY2sucG9wKCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvLyBQZXJmb3JtIGEgZGVlcCBjb21wYXJpc29uIHRvIGNoZWNrIGlmIHR3byBvYmplY3RzIGFyZSBlcXVhbC5cbiAgXy5pc0VxdWFsID0gZnVuY3Rpb24oYSwgYikge1xuICAgIHJldHVybiBlcShhLCBiLCBbXSwgW10pO1xuICB9O1xuXG4gIC8vIElzIGEgZ2l2ZW4gYXJyYXksIHN0cmluZywgb3Igb2JqZWN0IGVtcHR5P1xuICAvLyBBbiBcImVtcHR5XCIgb2JqZWN0IGhhcyBubyBlbnVtZXJhYmxlIG93bi1wcm9wZXJ0aWVzLlxuICBfLmlzRW1wdHkgPSBmdW5jdGlvbihvYmopIHtcbiAgICBpZiAob2JqID09IG51bGwpIHJldHVybiB0cnVlO1xuICAgIGlmIChfLmlzQXJyYXkob2JqKSB8fCBfLmlzU3RyaW5nKG9iaikgfHwgXy5pc0FyZ3VtZW50cyhvYmopKSByZXR1cm4gb2JqLmxlbmd0aCA9PT0gMDtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSBpZiAoXy5oYXMob2JqLCBrZXkpKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgLy8gSXMgYSBnaXZlbiB2YWx1ZSBhIERPTSBlbGVtZW50P1xuICBfLmlzRWxlbWVudCA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHJldHVybiAhIShvYmogJiYgb2JqLm5vZGVUeXBlID09PSAxKTtcbiAgfTtcblxuICAvLyBJcyBhIGdpdmVuIHZhbHVlIGFuIGFycmF5P1xuICAvLyBEZWxlZ2F0ZXMgdG8gRUNNQTUncyBuYXRpdmUgQXJyYXkuaXNBcnJheVxuICBfLmlzQXJyYXkgPSBuYXRpdmVJc0FycmF5IHx8IGZ1bmN0aW9uKG9iaikge1xuICAgIHJldHVybiB0b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gIH07XG5cbiAgLy8gSXMgYSBnaXZlbiB2YXJpYWJsZSBhbiBvYmplY3Q/XG4gIF8uaXNPYmplY3QgPSBmdW5jdGlvbihvYmopIHtcbiAgICB2YXIgdHlwZSA9IHR5cGVvZiBvYmo7XG4gICAgcmV0dXJuIHR5cGUgPT09ICdmdW5jdGlvbicgfHwgdHlwZSA9PT0gJ29iamVjdCcgJiYgISFvYmo7XG4gIH07XG5cbiAgLy8gQWRkIHNvbWUgaXNUeXBlIG1ldGhvZHM6IGlzQXJndW1lbnRzLCBpc0Z1bmN0aW9uLCBpc1N0cmluZywgaXNOdW1iZXIsIGlzRGF0ZSwgaXNSZWdFeHAuXG4gIF8uZWFjaChbJ0FyZ3VtZW50cycsICdGdW5jdGlvbicsICdTdHJpbmcnLCAnTnVtYmVyJywgJ0RhdGUnLCAnUmVnRXhwJ10sIGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBfWydpcycgKyBuYW1lXSA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgJyArIG5hbWUgKyAnXSc7XG4gICAgfTtcbiAgfSk7XG5cbiAgLy8gRGVmaW5lIGEgZmFsbGJhY2sgdmVyc2lvbiBvZiB0aGUgbWV0aG9kIGluIGJyb3dzZXJzIChhaGVtLCBJRSksIHdoZXJlXG4gIC8vIHRoZXJlIGlzbid0IGFueSBpbnNwZWN0YWJsZSBcIkFyZ3VtZW50c1wiIHR5cGUuXG4gIGlmICghXy5pc0FyZ3VtZW50cyhhcmd1bWVudHMpKSB7XG4gICAgXy5pc0FyZ3VtZW50cyA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIF8uaGFzKG9iaiwgJ2NhbGxlZScpO1xuICAgIH07XG4gIH1cblxuICAvLyBPcHRpbWl6ZSBgaXNGdW5jdGlvbmAgaWYgYXBwcm9wcmlhdGUuIFdvcmsgYXJvdW5kIGFuIElFIDExIGJ1Zy5cbiAgaWYgKHR5cGVvZiAvLi8gIT09ICdmdW5jdGlvbicpIHtcbiAgICBfLmlzRnVuY3Rpb24gPSBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiB0eXBlb2Ygb2JqID09ICdmdW5jdGlvbicgfHwgZmFsc2U7XG4gICAgfTtcbiAgfVxuXG4gIC8vIElzIGEgZ2l2ZW4gb2JqZWN0IGEgZmluaXRlIG51bWJlcj9cbiAgXy5pc0Zpbml0ZSA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHJldHVybiBpc0Zpbml0ZShvYmopICYmICFpc05hTihwYXJzZUZsb2F0KG9iaikpO1xuICB9O1xuXG4gIC8vIElzIHRoZSBnaXZlbiB2YWx1ZSBgTmFOYD8gKE5hTiBpcyB0aGUgb25seSBudW1iZXIgd2hpY2ggZG9lcyBub3QgZXF1YWwgaXRzZWxmKS5cbiAgXy5pc05hTiA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHJldHVybiBfLmlzTnVtYmVyKG9iaikgJiYgb2JqICE9PSArb2JqO1xuICB9O1xuXG4gIC8vIElzIGEgZ2l2ZW4gdmFsdWUgYSBib29sZWFuP1xuICBfLmlzQm9vbGVhbiA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHJldHVybiBvYmogPT09IHRydWUgfHwgb2JqID09PSBmYWxzZSB8fCB0b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEJvb2xlYW5dJztcbiAgfTtcblxuICAvLyBJcyBhIGdpdmVuIHZhbHVlIGVxdWFsIHRvIG51bGw/XG4gIF8uaXNOdWxsID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuIG9iaiA9PT0gbnVsbDtcbiAgfTtcblxuICAvLyBJcyBhIGdpdmVuIHZhcmlhYmxlIHVuZGVmaW5lZD9cbiAgXy5pc1VuZGVmaW5lZCA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHJldHVybiBvYmogPT09IHZvaWQgMDtcbiAgfTtcblxuICAvLyBTaG9ydGN1dCBmdW5jdGlvbiBmb3IgY2hlY2tpbmcgaWYgYW4gb2JqZWN0IGhhcyBhIGdpdmVuIHByb3BlcnR5IGRpcmVjdGx5XG4gIC8vIG9uIGl0c2VsZiAoaW4gb3RoZXIgd29yZHMsIG5vdCBvbiBhIHByb3RvdHlwZSkuXG4gIF8uaGFzID0gZnVuY3Rpb24ob2JqLCBrZXkpIHtcbiAgICByZXR1cm4gb2JqICE9IG51bGwgJiYgaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSk7XG4gIH07XG5cbiAgLy8gVXRpbGl0eSBGdW5jdGlvbnNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS1cblxuICAvLyBSdW4gVW5kZXJzY29yZS5qcyBpbiAqbm9Db25mbGljdCogbW9kZSwgcmV0dXJuaW5nIHRoZSBgX2AgdmFyaWFibGUgdG8gaXRzXG4gIC8vIHByZXZpb3VzIG93bmVyLiBSZXR1cm5zIGEgcmVmZXJlbmNlIHRvIHRoZSBVbmRlcnNjb3JlIG9iamVjdC5cbiAgXy5ub0NvbmZsaWN0ID0gZnVuY3Rpb24oKSB7XG4gICAgcm9vdC5fID0gcHJldmlvdXNVbmRlcnNjb3JlO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8vIEtlZXAgdGhlIGlkZW50aXR5IGZ1bmN0aW9uIGFyb3VuZCBmb3IgZGVmYXVsdCBpdGVyYXRlZXMuXG4gIF8uaWRlbnRpdHkgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcblxuICBfLmNvbnN0YW50ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgfTtcblxuICBfLm5vb3AgPSBmdW5jdGlvbigpe307XG5cbiAgXy5wcm9wZXJ0eSA9IGZ1bmN0aW9uKGtleSkge1xuICAgIHJldHVybiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmpba2V5XTtcbiAgICB9O1xuICB9O1xuXG4gIC8vIFJldHVybnMgYSBwcmVkaWNhdGUgZm9yIGNoZWNraW5nIHdoZXRoZXIgYW4gb2JqZWN0IGhhcyBhIGdpdmVuIHNldCBvZiBga2V5OnZhbHVlYCBwYWlycy5cbiAgXy5tYXRjaGVzID0gZnVuY3Rpb24oYXR0cnMpIHtcbiAgICB2YXIgcGFpcnMgPSBfLnBhaXJzKGF0dHJzKSwgbGVuZ3RoID0gcGFpcnMubGVuZ3RoO1xuICAgIHJldHVybiBmdW5jdGlvbihvYmopIHtcbiAgICAgIGlmIChvYmogPT0gbnVsbCkgcmV0dXJuICFsZW5ndGg7XG4gICAgICBvYmogPSBuZXcgT2JqZWN0KG9iaik7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBwYWlyID0gcGFpcnNbaV0sIGtleSA9IHBhaXJbMF07XG4gICAgICAgIGlmIChwYWlyWzFdICE9PSBvYmpba2V5XSB8fCAhKGtleSBpbiBvYmopKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICB9O1xuXG4gIC8vIFJ1biBhIGZ1bmN0aW9uICoqbioqIHRpbWVzLlxuICBfLnRpbWVzID0gZnVuY3Rpb24obiwgaXRlcmF0ZWUsIGNvbnRleHQpIHtcbiAgICB2YXIgYWNjdW0gPSBBcnJheShNYXRoLm1heCgwLCBuKSk7XG4gICAgaXRlcmF0ZWUgPSBjcmVhdGVDYWxsYmFjayhpdGVyYXRlZSwgY29udGV4dCwgMSk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyBpKyspIGFjY3VtW2ldID0gaXRlcmF0ZWUoaSk7XG4gICAgcmV0dXJuIGFjY3VtO1xuICB9O1xuXG4gIC8vIFJldHVybiBhIHJhbmRvbSBpbnRlZ2VyIGJldHdlZW4gbWluIGFuZCBtYXggKGluY2x1c2l2ZSkuXG4gIF8ucmFuZG9tID0gZnVuY3Rpb24obWluLCBtYXgpIHtcbiAgICBpZiAobWF4ID09IG51bGwpIHtcbiAgICAgIG1heCA9IG1pbjtcbiAgICAgIG1pbiA9IDA7XG4gICAgfVxuICAgIHJldHVybiBtaW4gKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpO1xuICB9O1xuXG4gIC8vIEEgKHBvc3NpYmx5IGZhc3Rlcikgd2F5IHRvIGdldCB0aGUgY3VycmVudCB0aW1lc3RhbXAgYXMgYW4gaW50ZWdlci5cbiAgXy5ub3cgPSBEYXRlLm5vdyB8fCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gIH07XG5cbiAgIC8vIExpc3Qgb2YgSFRNTCBlbnRpdGllcyBmb3IgZXNjYXBpbmcuXG4gIHZhciBlc2NhcGVNYXAgPSB7XG4gICAgJyYnOiAnJmFtcDsnLFxuICAgICc8JzogJyZsdDsnLFxuICAgICc+JzogJyZndDsnLFxuICAgICdcIic6ICcmcXVvdDsnLFxuICAgIFwiJ1wiOiAnJiN4Mjc7JyxcbiAgICAnYCc6ICcmI3g2MDsnXG4gIH07XG4gIHZhciB1bmVzY2FwZU1hcCA9IF8uaW52ZXJ0KGVzY2FwZU1hcCk7XG5cbiAgLy8gRnVuY3Rpb25zIGZvciBlc2NhcGluZyBhbmQgdW5lc2NhcGluZyBzdHJpbmdzIHRvL2Zyb20gSFRNTCBpbnRlcnBvbGF0aW9uLlxuICB2YXIgY3JlYXRlRXNjYXBlciA9IGZ1bmN0aW9uKG1hcCkge1xuICAgIHZhciBlc2NhcGVyID0gZnVuY3Rpb24obWF0Y2gpIHtcbiAgICAgIHJldHVybiBtYXBbbWF0Y2hdO1xuICAgIH07XG4gICAgLy8gUmVnZXhlcyBmb3IgaWRlbnRpZnlpbmcgYSBrZXkgdGhhdCBuZWVkcyB0byBiZSBlc2NhcGVkXG4gICAgdmFyIHNvdXJjZSA9ICcoPzonICsgXy5rZXlzKG1hcCkuam9pbignfCcpICsgJyknO1xuICAgIHZhciB0ZXN0UmVnZXhwID0gUmVnRXhwKHNvdXJjZSk7XG4gICAgdmFyIHJlcGxhY2VSZWdleHAgPSBSZWdFeHAoc291cmNlLCAnZycpO1xuICAgIHJldHVybiBmdW5jdGlvbihzdHJpbmcpIHtcbiAgICAgIHN0cmluZyA9IHN0cmluZyA9PSBudWxsID8gJycgOiAnJyArIHN0cmluZztcbiAgICAgIHJldHVybiB0ZXN0UmVnZXhwLnRlc3Qoc3RyaW5nKSA/IHN0cmluZy5yZXBsYWNlKHJlcGxhY2VSZWdleHAsIGVzY2FwZXIpIDogc3RyaW5nO1xuICAgIH07XG4gIH07XG4gIF8uZXNjYXBlID0gY3JlYXRlRXNjYXBlcihlc2NhcGVNYXApO1xuICBfLnVuZXNjYXBlID0gY3JlYXRlRXNjYXBlcih1bmVzY2FwZU1hcCk7XG5cbiAgLy8gSWYgdGhlIHZhbHVlIG9mIHRoZSBuYW1lZCBgcHJvcGVydHlgIGlzIGEgZnVuY3Rpb24gdGhlbiBpbnZva2UgaXQgd2l0aCB0aGVcbiAgLy8gYG9iamVjdGAgYXMgY29udGV4dDsgb3RoZXJ3aXNlLCByZXR1cm4gaXQuXG4gIF8ucmVzdWx0ID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkge1xuICAgIGlmIChvYmplY3QgPT0gbnVsbCkgcmV0dXJuIHZvaWQgMDtcbiAgICB2YXIgdmFsdWUgPSBvYmplY3RbcHJvcGVydHldO1xuICAgIHJldHVybiBfLmlzRnVuY3Rpb24odmFsdWUpID8gb2JqZWN0W3Byb3BlcnR5XSgpIDogdmFsdWU7XG4gIH07XG5cbiAgLy8gR2VuZXJhdGUgYSB1bmlxdWUgaW50ZWdlciBpZCAodW5pcXVlIHdpdGhpbiB0aGUgZW50aXJlIGNsaWVudCBzZXNzaW9uKS5cbiAgLy8gVXNlZnVsIGZvciB0ZW1wb3JhcnkgRE9NIGlkcy5cbiAgdmFyIGlkQ291bnRlciA9IDA7XG4gIF8udW5pcXVlSWQgPSBmdW5jdGlvbihwcmVmaXgpIHtcbiAgICB2YXIgaWQgPSArK2lkQ291bnRlciArICcnO1xuICAgIHJldHVybiBwcmVmaXggPyBwcmVmaXggKyBpZCA6IGlkO1xuICB9O1xuXG4gIC8vIEJ5IGRlZmF1bHQsIFVuZGVyc2NvcmUgdXNlcyBFUkItc3R5bGUgdGVtcGxhdGUgZGVsaW1pdGVycywgY2hhbmdlIHRoZVxuICAvLyBmb2xsb3dpbmcgdGVtcGxhdGUgc2V0dGluZ3MgdG8gdXNlIGFsdGVybmF0aXZlIGRlbGltaXRlcnMuXG4gIF8udGVtcGxhdGVTZXR0aW5ncyA9IHtcbiAgICBldmFsdWF0ZSAgICA6IC88JShbXFxzXFxTXSs/KSU+L2csXG4gICAgaW50ZXJwb2xhdGUgOiAvPCU9KFtcXHNcXFNdKz8pJT4vZyxcbiAgICBlc2NhcGUgICAgICA6IC88JS0oW1xcc1xcU10rPyklPi9nXG4gIH07XG5cbiAgLy8gV2hlbiBjdXN0b21pemluZyBgdGVtcGxhdGVTZXR0aW5nc2AsIGlmIHlvdSBkb24ndCB3YW50IHRvIGRlZmluZSBhblxuICAvLyBpbnRlcnBvbGF0aW9uLCBldmFsdWF0aW9uIG9yIGVzY2FwaW5nIHJlZ2V4LCB3ZSBuZWVkIG9uZSB0aGF0IGlzXG4gIC8vIGd1YXJhbnRlZWQgbm90IHRvIG1hdGNoLlxuICB2YXIgbm9NYXRjaCA9IC8oLileLztcblxuICAvLyBDZXJ0YWluIGNoYXJhY3RlcnMgbmVlZCB0byBiZSBlc2NhcGVkIHNvIHRoYXQgdGhleSBjYW4gYmUgcHV0IGludG8gYVxuICAvLyBzdHJpbmcgbGl0ZXJhbC5cbiAgdmFyIGVzY2FwZXMgPSB7XG4gICAgXCInXCI6ICAgICAgXCInXCIsXG4gICAgJ1xcXFwnOiAgICAgJ1xcXFwnLFxuICAgICdcXHInOiAgICAgJ3InLFxuICAgICdcXG4nOiAgICAgJ24nLFxuICAgICdcXHUyMDI4JzogJ3UyMDI4JyxcbiAgICAnXFx1MjAyOSc6ICd1MjAyOSdcbiAgfTtcblxuICB2YXIgZXNjYXBlciA9IC9cXFxcfCd8XFxyfFxcbnxcXHUyMDI4fFxcdTIwMjkvZztcblxuICB2YXIgZXNjYXBlQ2hhciA9IGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgcmV0dXJuICdcXFxcJyArIGVzY2FwZXNbbWF0Y2hdO1xuICB9O1xuXG4gIC8vIEphdmFTY3JpcHQgbWljcm8tdGVtcGxhdGluZywgc2ltaWxhciB0byBKb2huIFJlc2lnJ3MgaW1wbGVtZW50YXRpb24uXG4gIC8vIFVuZGVyc2NvcmUgdGVtcGxhdGluZyBoYW5kbGVzIGFyYml0cmFyeSBkZWxpbWl0ZXJzLCBwcmVzZXJ2ZXMgd2hpdGVzcGFjZSxcbiAgLy8gYW5kIGNvcnJlY3RseSBlc2NhcGVzIHF1b3RlcyB3aXRoaW4gaW50ZXJwb2xhdGVkIGNvZGUuXG4gIC8vIE5COiBgb2xkU2V0dGluZ3NgIG9ubHkgZXhpc3RzIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eS5cbiAgXy50ZW1wbGF0ZSA9IGZ1bmN0aW9uKHRleHQsIHNldHRpbmdzLCBvbGRTZXR0aW5ncykge1xuICAgIGlmICghc2V0dGluZ3MgJiYgb2xkU2V0dGluZ3MpIHNldHRpbmdzID0gb2xkU2V0dGluZ3M7XG4gICAgc2V0dGluZ3MgPSBfLmRlZmF1bHRzKHt9LCBzZXR0aW5ncywgXy50ZW1wbGF0ZVNldHRpbmdzKTtcblxuICAgIC8vIENvbWJpbmUgZGVsaW1pdGVycyBpbnRvIG9uZSByZWd1bGFyIGV4cHJlc3Npb24gdmlhIGFsdGVybmF0aW9uLlxuICAgIHZhciBtYXRjaGVyID0gUmVnRXhwKFtcbiAgICAgIChzZXR0aW5ncy5lc2NhcGUgfHwgbm9NYXRjaCkuc291cmNlLFxuICAgICAgKHNldHRpbmdzLmludGVycG9sYXRlIHx8IG5vTWF0Y2gpLnNvdXJjZSxcbiAgICAgIChzZXR0aW5ncy5ldmFsdWF0ZSB8fCBub01hdGNoKS5zb3VyY2VcbiAgICBdLmpvaW4oJ3wnKSArICd8JCcsICdnJyk7XG5cbiAgICAvLyBDb21waWxlIHRoZSB0ZW1wbGF0ZSBzb3VyY2UsIGVzY2FwaW5nIHN0cmluZyBsaXRlcmFscyBhcHByb3ByaWF0ZWx5LlxuICAgIHZhciBpbmRleCA9IDA7XG4gICAgdmFyIHNvdXJjZSA9IFwiX19wKz0nXCI7XG4gICAgdGV4dC5yZXBsYWNlKG1hdGNoZXIsIGZ1bmN0aW9uKG1hdGNoLCBlc2NhcGUsIGludGVycG9sYXRlLCBldmFsdWF0ZSwgb2Zmc2V0KSB7XG4gICAgICBzb3VyY2UgKz0gdGV4dC5zbGljZShpbmRleCwgb2Zmc2V0KS5yZXBsYWNlKGVzY2FwZXIsIGVzY2FwZUNoYXIpO1xuICAgICAgaW5kZXggPSBvZmZzZXQgKyBtYXRjaC5sZW5ndGg7XG5cbiAgICAgIGlmIChlc2NhcGUpIHtcbiAgICAgICAgc291cmNlICs9IFwiJytcXG4oKF9fdD0oXCIgKyBlc2NhcGUgKyBcIikpPT1udWxsPycnOl8uZXNjYXBlKF9fdCkpK1xcbidcIjtcbiAgICAgIH0gZWxzZSBpZiAoaW50ZXJwb2xhdGUpIHtcbiAgICAgICAgc291cmNlICs9IFwiJytcXG4oKF9fdD0oXCIgKyBpbnRlcnBvbGF0ZSArIFwiKSk9PW51bGw/Jyc6X190KStcXG4nXCI7XG4gICAgICB9IGVsc2UgaWYgKGV2YWx1YXRlKSB7XG4gICAgICAgIHNvdXJjZSArPSBcIic7XFxuXCIgKyBldmFsdWF0ZSArIFwiXFxuX19wKz0nXCI7XG4gICAgICB9XG5cbiAgICAgIC8vIEFkb2JlIFZNcyBuZWVkIHRoZSBtYXRjaCByZXR1cm5lZCB0byBwcm9kdWNlIHRoZSBjb3JyZWN0IG9mZmVzdC5cbiAgICAgIHJldHVybiBtYXRjaDtcbiAgICB9KTtcbiAgICBzb3VyY2UgKz0gXCInO1xcblwiO1xuXG4gICAgLy8gSWYgYSB2YXJpYWJsZSBpcyBub3Qgc3BlY2lmaWVkLCBwbGFjZSBkYXRhIHZhbHVlcyBpbiBsb2NhbCBzY29wZS5cbiAgICBpZiAoIXNldHRpbmdzLnZhcmlhYmxlKSBzb3VyY2UgPSAnd2l0aChvYmp8fHt9KXtcXG4nICsgc291cmNlICsgJ31cXG4nO1xuXG4gICAgc291cmNlID0gXCJ2YXIgX190LF9fcD0nJyxfX2o9QXJyYXkucHJvdG90eXBlLmpvaW4sXCIgK1xuICAgICAgXCJwcmludD1mdW5jdGlvbigpe19fcCs9X19qLmNhbGwoYXJndW1lbnRzLCcnKTt9O1xcblwiICtcbiAgICAgIHNvdXJjZSArICdyZXR1cm4gX19wO1xcbic7XG5cbiAgICB0cnkge1xuICAgICAgdmFyIHJlbmRlciA9IG5ldyBGdW5jdGlvbihzZXR0aW5ncy52YXJpYWJsZSB8fCAnb2JqJywgJ18nLCBzb3VyY2UpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGUuc291cmNlID0gc291cmNlO1xuICAgICAgdGhyb3cgZTtcbiAgICB9XG5cbiAgICB2YXIgdGVtcGxhdGUgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgICByZXR1cm4gcmVuZGVyLmNhbGwodGhpcywgZGF0YSwgXyk7XG4gICAgfTtcblxuICAgIC8vIFByb3ZpZGUgdGhlIGNvbXBpbGVkIHNvdXJjZSBhcyBhIGNvbnZlbmllbmNlIGZvciBwcmVjb21waWxhdGlvbi5cbiAgICB2YXIgYXJndW1lbnQgPSBzZXR0aW5ncy52YXJpYWJsZSB8fCAnb2JqJztcbiAgICB0ZW1wbGF0ZS5zb3VyY2UgPSAnZnVuY3Rpb24oJyArIGFyZ3VtZW50ICsgJyl7XFxuJyArIHNvdXJjZSArICd9JztcblxuICAgIHJldHVybiB0ZW1wbGF0ZTtcbiAgfTtcblxuICAvLyBBZGQgYSBcImNoYWluXCIgZnVuY3Rpb24uIFN0YXJ0IGNoYWluaW5nIGEgd3JhcHBlZCBVbmRlcnNjb3JlIG9iamVjdC5cbiAgXy5jaGFpbiA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHZhciBpbnN0YW5jZSA9IF8ob2JqKTtcbiAgICBpbnN0YW5jZS5fY2hhaW4gPSB0cnVlO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfTtcblxuICAvLyBPT1BcbiAgLy8gLS0tLS0tLS0tLS0tLS0tXG4gIC8vIElmIFVuZGVyc2NvcmUgaXMgY2FsbGVkIGFzIGEgZnVuY3Rpb24sIGl0IHJldHVybnMgYSB3cmFwcGVkIG9iamVjdCB0aGF0XG4gIC8vIGNhbiBiZSB1c2VkIE9PLXN0eWxlLiBUaGlzIHdyYXBwZXIgaG9sZHMgYWx0ZXJlZCB2ZXJzaW9ucyBvZiBhbGwgdGhlXG4gIC8vIHVuZGVyc2NvcmUgZnVuY3Rpb25zLiBXcmFwcGVkIG9iamVjdHMgbWF5IGJlIGNoYWluZWQuXG5cbiAgLy8gSGVscGVyIGZ1bmN0aW9uIHRvIGNvbnRpbnVlIGNoYWluaW5nIGludGVybWVkaWF0ZSByZXN1bHRzLlxuICB2YXIgcmVzdWx0ID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NoYWluID8gXyhvYmopLmNoYWluKCkgOiBvYmo7XG4gIH07XG5cbiAgLy8gQWRkIHlvdXIgb3duIGN1c3RvbSBmdW5jdGlvbnMgdG8gdGhlIFVuZGVyc2NvcmUgb2JqZWN0LlxuICBfLm1peGluID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgXy5lYWNoKF8uZnVuY3Rpb25zKG9iaiksIGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHZhciBmdW5jID0gX1tuYW1lXSA9IG9ialtuYW1lXTtcbiAgICAgIF8ucHJvdG90eXBlW25hbWVdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhcmdzID0gW3RoaXMuX3dyYXBwZWRdO1xuICAgICAgICBwdXNoLmFwcGx5KGFyZ3MsIGFyZ3VtZW50cyk7XG4gICAgICAgIHJldHVybiByZXN1bHQuY2FsbCh0aGlzLCBmdW5jLmFwcGx5KF8sIGFyZ3MpKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gQWRkIGFsbCBvZiB0aGUgVW5kZXJzY29yZSBmdW5jdGlvbnMgdG8gdGhlIHdyYXBwZXIgb2JqZWN0LlxuICBfLm1peGluKF8pO1xuXG4gIC8vIEFkZCBhbGwgbXV0YXRvciBBcnJheSBmdW5jdGlvbnMgdG8gdGhlIHdyYXBwZXIuXG4gIF8uZWFjaChbJ3BvcCcsICdwdXNoJywgJ3JldmVyc2UnLCAnc2hpZnQnLCAnc29ydCcsICdzcGxpY2UnLCAndW5zaGlmdCddLCBmdW5jdGlvbihuYW1lKSB7XG4gICAgdmFyIG1ldGhvZCA9IEFycmF5UHJvdG9bbmFtZV07XG4gICAgXy5wcm90b3R5cGVbbmFtZV0gPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBvYmogPSB0aGlzLl93cmFwcGVkO1xuICAgICAgbWV0aG9kLmFwcGx5KG9iaiwgYXJndW1lbnRzKTtcbiAgICAgIGlmICgobmFtZSA9PT0gJ3NoaWZ0JyB8fCBuYW1lID09PSAnc3BsaWNlJykgJiYgb2JqLmxlbmd0aCA9PT0gMCkgZGVsZXRlIG9ialswXTtcbiAgICAgIHJldHVybiByZXN1bHQuY2FsbCh0aGlzLCBvYmopO1xuICAgIH07XG4gIH0pO1xuXG4gIC8vIEFkZCBhbGwgYWNjZXNzb3IgQXJyYXkgZnVuY3Rpb25zIHRvIHRoZSB3cmFwcGVyLlxuICBfLmVhY2goWydjb25jYXQnLCAnam9pbicsICdzbGljZSddLCBmdW5jdGlvbihuYW1lKSB7XG4gICAgdmFyIG1ldGhvZCA9IEFycmF5UHJvdG9bbmFtZV07XG4gICAgXy5wcm90b3R5cGVbbmFtZV0gPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiByZXN1bHQuY2FsbCh0aGlzLCBtZXRob2QuYXBwbHkodGhpcy5fd3JhcHBlZCwgYXJndW1lbnRzKSk7XG4gICAgfTtcbiAgfSk7XG5cbiAgLy8gRXh0cmFjdHMgdGhlIHJlc3VsdCBmcm9tIGEgd3JhcHBlZCBhbmQgY2hhaW5lZCBvYmplY3QuXG4gIF8ucHJvdG90eXBlLnZhbHVlID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3dyYXBwZWQ7XG4gIH07XG5cbiAgLy8gQU1EIHJlZ2lzdHJhdGlvbiBoYXBwZW5zIGF0IHRoZSBlbmQgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBBTUQgbG9hZGVyc1xuICAvLyB0aGF0IG1heSBub3QgZW5mb3JjZSBuZXh0LXR1cm4gc2VtYW50aWNzIG9uIG1vZHVsZXMuIEV2ZW4gdGhvdWdoIGdlbmVyYWxcbiAgLy8gcHJhY3RpY2UgZm9yIEFNRCByZWdpc3RyYXRpb24gaXMgdG8gYmUgYW5vbnltb3VzLCB1bmRlcnNjb3JlIHJlZ2lzdGVyc1xuICAvLyBhcyBhIG5hbWVkIG1vZHVsZSBiZWNhdXNlLCBsaWtlIGpRdWVyeSwgaXQgaXMgYSBiYXNlIGxpYnJhcnkgdGhhdCBpc1xuICAvLyBwb3B1bGFyIGVub3VnaCB0byBiZSBidW5kbGVkIGluIGEgdGhpcmQgcGFydHkgbGliLCBidXQgbm90IGJlIHBhcnQgb2ZcbiAgLy8gYW4gQU1EIGxvYWQgcmVxdWVzdC4gVGhvc2UgY2FzZXMgY291bGQgZ2VuZXJhdGUgYW4gZXJyb3Igd2hlbiBhblxuICAvLyBhbm9ueW1vdXMgZGVmaW5lKCkgaXMgY2FsbGVkIG91dHNpZGUgb2YgYSBsb2FkZXIgcmVxdWVzdC5cbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZSgndW5kZXJzY29yZScsIFtdLCBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBfO1xuICAgIH0pO1xuICB9XG59LmNhbGwodGhpcykpO1xuIiwidmFyIEFwcEZhY2FkZSA9IHJlcXVpcmUoJy4vYXBwRmFjYWRlLmpzJyk7XG52YXIgZ19yZXNvdWNlcyA9IHJlcXVpcmUoJy4vcmVzb3VyY2UuanMnKS5nX3Jlc291Y2VzO1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgY2MuZ2FtZS5vblN0YXJ0ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgY2Mudmlldy5hZGp1c3RWaWV3UG9ydCh0cnVlKTtcbiAgICAgICAgY2Mudmlldy5zZXREZXNpZ25SZXNvbHV0aW9uU2l6ZSg2NDAsIDExMzYsIGNjLlJlc29sdXRpb25Qb2xpY3kuU0hPV19BTEwpO1xuICAgICAgICBjYy52aWV3LnJlc2l6ZVdpdGhCcm93c2VyU2l6ZSh0cnVlKTtcblxuICAgICAgICBjY3MuY3NMb2FkZXIuc2V0UmVjb3JkUHJvdG9jb2xCdWZmZXJzUGF0aCh0cnVlKTtcbiAgICAgICAgY2MuTG9hZGVyU2NlbmUucHJlbG9hZChnX3Jlc291Y2VzLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSAnZmlnaHRlci1tdmMnO1xuICAgICAgICAgICAgQXBwRmFjYWRlLmdldEluc3RhbmNlKGtleSkuc3RhcnR1cCgpO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICB9O1xuICAgIGNjLmdhbWUucnVuKCk7XG59KSgpOyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFydGh1ciBvbiAyMDE0LzEyLzIwLlxyXG4gKi9cclxudmFyIGNvbnN0YW50cyA9IG1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgQVBQX05BTUU6IFwiZmlnaHRlclwiLFxyXG5cclxuICAgIENVU1RPTV9OT1RJQ0lDQVRJT046ICdjdXN0b21fbm90aWZpY2F0aW9uJyxcclxuICAgIENPTkZJUk1fRElBTE9HOiAnY29uZmlybV9kaWFsb2cnLFxyXG5cclxuICAgIE5PVElGSUNBVElPTjoge1xyXG4gICAgICAgIFNUQVJUVVA6ICdzdGFydHVwJyxcclxuICAgICAgICBTQ0VORV9DSEFOR0VEOiAnc2NlbmVfY2hhbmdlZCcsXHJcbiAgICAgICAgU0NFTkVfSE9NRTogJ3NjZW5lX2hvbWUnXHJcbiAgICB9LFxyXG5cclxuICAgIFNDRU5FX0FDVElPTjogJ3NjZW5lX2FjdGlvbicsXHJcbiAgICBTQ0VORV9BQ1RJT05fQUREX0NISUxEOiAnc2NlbmVfYWN0aW9uX2FkZF9jaGlsZCcsXHJcbiAgICBTQ0VORToge1xyXG4gICAgICAgIEhPTUU6ICdIb21lTWVkaWF0b3InLFxyXG4gICAgICAgIFRSQUlOOiAnVHJhaW5NZWRpYXRvcicsXHJcbiAgICAgICAgTE9WRTogXCJMb3ZlTWVkaWF0b3JcIixcclxuICAgICAgICBGSUdIVDogXCJGaWdodE1lZGlhdG9yXCJcclxuICAgIH0sXHJcblxyXG4gICAgVEFTS19TVEFUVVMgOiB7XHJcbiAgICAgICAgU1RPUDogMSxcclxuICAgICAgICBTVEFSVDogMixcclxuICAgICAgICBGSU5JU0g6IDNcclxuICAgIH0sXHJcblxyXG4gICAgUExBWUVSX0FDVElPTjogJ3BsYXllcl9hY3Rpb24nLFxyXG5cclxuICAgIFRBU0tfQUNUSU9OOiAndGFza19hY3Rpb24nLFxyXG4gICAgVEFTS19BQ1RJT05fTU9OSVRPUjogJ3Rhc2tfYWN0aW9uX21vbml0b3InLFxyXG4gICAgVEFTS19BQ1RJT05fU1RBUlQ6ICd0YXNrX2FjdGlvbl9zdGFydCcsXHJcbiAgICBUQVNLX0FDVElPTl9TVE9QOiAndGFza19hY3Rpb25fc3RvcCcsXHJcbiAgICBUQVNLX0FDVElPTl9GSU5JU0hFRDogJ3Rhc2tfYWN0aW9uX2ZpbmlzaGVkJyxcclxuXHJcbiAgICBMT1ZFX0FDVElPTjogJ2xvdmVfYWN0aW9uJ1xyXG59OyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFydGh1ciBvbiAyMDE0LzEyLzIxLlxyXG4gKi9cclxudmFyIHB1cmVtdmMgPSByZXF1aXJlKCdwdXJlbXZjJykucHVyZW12YztcclxudmFyIFN0YXJ0dXBDb21tYW5kID0gcmVxdWlyZSgnLi9jb250cm9sbGVyL2NvbW1hbmQvU3RhcnR1cENvbW1hbmQuanMnKTtcclxudmFyIGNvbnN0YW50cyA9IHJlcXVpcmUoJy4vYXBwQ29uc3RhbnRzLmpzJyk7XHJcblxyXG52YXIgQXBwRmFjYWRlID0gbW9kdWxlLmV4cG9ydHMgPSBwdXJlbXZjLmRlZmluZShcclxuICAgIC8vIENMQVNTIElORk9cclxuICAgIHtcclxuICAgICAgICBuYW1lOiAnQXBwRmFjYWRlJyxcclxuICAgICAgICBwYXJlbnQ6IHB1cmVtdmMuRmFjYWRlLFxyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcjogZnVuY3Rpb24gKG11bHRpdG9uS2V5KSB7XHJcbiAgICAgICAgICAgIHB1cmVtdmMuRmFjYWRlLmNhbGwodGhpcywgbXVsdGl0b25LZXkpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgaW5pdGlhbGl6ZUNvbnRyb2xsZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcHVyZW12Yy5GYWNhZGUucHJvdG90eXBlLmluaXRpYWxpemVDb250cm9sbGVyLmNhbGwodGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJDb21tYW5kKGNvbnN0YW50cy5OT1RJRklDQVRJT04uU1RBUlRVUCwgU3RhcnR1cENvbW1hbmQpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW5pdGlhbGl6ZU1vZGVsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHB1cmVtdmMuRmFjYWRlLnByb3RvdHlwZS5pbml0aWFsaXplTW9kZWwuY2FsbCh0aGlzKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGluaXRpYWxpemVWaWV3OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHB1cmVtdmMuRmFjYWRlLnByb3RvdHlwZS5pbml0aWFsaXplVmlldy5jYWxsKHRoaXMpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHN0YXJ0dXA6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5zZW5kTm90aWZpY2F0aW9uKGNvbnN0YW50cy5OT1RJRklDQVRJT04uU1RBUlRVUCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIGNjLmV2ZW50TWFuYWdlci5hZGRDdXN0b21MaXN0ZW5lcihjb25zdGFudHMuQ1VTVE9NX05PVElDSUNBVElPTiwgZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgICAgICAgICAgdmFyIHVzZXJEYXRhID0gZXZlbnQuZ2V0VXNlckRhdGEoKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2VuZE5vdGlmaWNhdGlvbihcclxuICAgICAgICAgICAgICAgICAgICB1c2VyRGF0YS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJEYXRhLmRhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgdXNlckRhdGEudHlwZVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vIFNUQVRJQyBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgZ2V0SW5zdGFuY2U6IGZ1bmN0aW9uKG11bHRpdG9uS2V5KSB7XHJcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZU1hcCA9IHB1cmVtdmMuRmFjYWRlLmluc3RhbmNlTWFwO1xyXG4gICAgICAgICAgICB2YXIgaW5zdGFuY2UgPSBpbnN0YW5jZU1hcFttdWx0aXRvbktleV07XHJcbiAgICAgICAgICAgIGlmKGluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5zdGFuY2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGluc3RhbmNlTWFwW211bHRpdG9uS2V5XSA9IG5ldyBBcHBGYWNhZGUobXVsdGl0b25LZXkpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgTkFNRTogJ0FwcEZhY2FkZSdcclxuICAgIH1cclxuKTsiLCIvKipcclxuICogQ3JlYXRlZCBieSBBcnRodXIgb24gMjAxNC8xMi8xNC5cclxuICovXHJcblxyXG52YXIgcHVyZW12YyA9IHJlcXVpcmUoJ3B1cmVtdmMnKS5wdXJlbXZjO1xyXG52YXIgUHJlcENvbnRyb2xsZXJDb21tYW5kID0gcmVxdWlyZSgnLi9wcmVwQ29udHJvbGxlckNvbW1hbmQuanMnKTtcclxudmFyIFByZXBNb2RlbENvbW1hbmQgPSByZXF1aXJlKCcuL3ByZXBNb2RlbENvbW1hbmQuanMnKTtcclxudmFyIFByZXBWaWV3Q29tbWFuZCA9IHJlcXVpcmUoJy4vcHJlcFZpZXdDb21tYW5kLmpzJyk7XHJcbnZhciBIb21lQ29tbWFuZCA9IHJlcXVpcmUoJy4vaG9tZUNvbW1hbmQuanMnKTtcclxudmFyIGNvbnN0YW50cyA9IHJlcXVpcmUoJy4uLy4uL2FwcENvbnN0YW50cy5qcycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBwdXJlbXZjLmRlZmluZSh7XHJcbiAgICAgICAgbmFtZTogJ2ZpZ2h0ZXIuY29udHJvbGxlci5jb21tYW5kLlN0YXJ0dXBDb21tYW5kJyxcclxuICAgICAgICBwYXJlbnQ6IHB1cmVtdmMuTWFjcm9Db21tYW5kXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBZGQgdGhlIHN1Yi1jb21tYW5kcyBmb3IgdGhpcyBNYWNyb0NvbW1hbmRcclxuICAgICAgICAgKiBAb3ZlcnJpZGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBpbml0aWFsaXplTWFjcm9Db21tYW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNjLmxvZygnc3RhcnQgY29tbWFuZCBpbml0Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkU3ViQ29tbWFuZCggUHJlcENvbnRyb2xsZXJDb21tYW5kICk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkU3ViQ29tbWFuZCggUHJlcE1vZGVsQ29tbWFuZCApO1xyXG4gICAgICAgICAgICB0aGlzLmFkZFN1YkNvbW1hbmQoIFByZXBWaWV3Q29tbWFuZCApO1xyXG4gICAgICAgICAgICB0aGlzLmFkZFN1YkNvbW1hbmQoIEhvbWVDb21tYW5kICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBBcnRodXIgb24gMjAxNC8xMi8yMS5cclxuICovXHJcblxyXG52YXIgcHVyZW12YyA9IHJlcXVpcmUoJ3B1cmVtdmMnKS5wdXJlbXZjO1xyXG52YXIgY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vLi4vYXBwQ29uc3RhbnRzLmpzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHB1cmVtdmMuZGVmaW5lKHtcclxuICAgICAgICBuYW1lOiAnZmlnaHRlci5jb250cm9sbGVyLmNvbW1hbmQuSG9tZUNvbW1hbmQnLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5TaW1wbGVDb21tYW5kXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZWdpc3RlciBDb21tYW5kcyB3aXRoIHRoZSBDb250cm9sbGVyXHJcbiAgICAgICAgICogQG92ZXJyaWRlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZXhlY3V0ZTogZnVuY3Rpb24gKG5vdGUpIHtcclxuICAgICAgICAgICAgLy8gVGhpcyByZWdpc3RlcnMgbXVsdGlwbGUgbm90ZXMgdG8gYSBzaW5nbGUgY29tbWFuZCB3aGljaCBwZXJmb3JtcyBkaWZmZXJlbnQgbG9naWMgYmFzZWQgb24gdGhlIG5vdGUgbmFtZS5cclxuICAgICAgICAgICAgLy8gSW4gYSBtb3JlIGNvbXBsZXggYXBwLCB3ZSdkIHVzdWFsbHkgYmUgcmVnaXN0ZXJpbmcgYSBkaWZmZXJlbnQgY29tbWFuZCB0byBlYWNoIG5vdGlmaWNhdGlvbiBuYW1lLlxyXG4gICAgICAgICAgICBjYy5sb2coJ0hvbWVDb21tYW5kIGV4ZWN1dGUnKTtcclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLmZhY2FkZS5zZW5kTm90aWZpY2F0aW9uKGNvbnN0YW50cy5TQ0VORV9BQ1RJT04sIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IGNvbnN0YW50cy5TQ0VORS5IT01FXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5mYWNhZGUuc2VuZE5vdGlmaWNhdGlvbihjb25zdGFudHMuVEFTS19BQ1RJT05fTU9OSVRPUik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4pO1xyXG5cclxuXHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFydGh1ciBvbiAyMDE1LzEvMS5cclxuICovXHJcbnZhciBwdXJlbXZjID0gcmVxdWlyZSgncHVyZW12YycpLnB1cmVtdmM7XHJcbnZhciBjb25zdGFudHMgPSByZXF1aXJlKCcuLi8uLi9hcHBDb25zdGFudHMuanMnKTtcclxudmFyIFBsYXllclByb3h5TmFtZSA9IHJlcXVpcmUoJy4uLy4uL21vZGVsL3Byb3h5L3BsYXllclByb3h5LmpzJykuTkFNRTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcHVyZW12Yy5kZWZpbmUoe1xyXG4gICAgICAgIG5hbWU6ICdmaWdodGVyLmNvbnRyb2xsZXIuY29tbWFuZC5QbGF5ZXJDb21tYW5kJyxcclxuICAgICAgICBwYXJlbnQ6IHB1cmVtdmMuU2ltcGxlQ29tbWFuZFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVnaXN0ZXIgQ29tbWFuZHMgd2l0aCB0aGUgQ29udHJvbGxlclxyXG4gICAgICAgICAqIEBvdmVycmlkZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGV4ZWN1dGU6IGZ1bmN0aW9uIChub3RlKSB7XHJcbiAgICAgICAgICAgIC8vIFRoaXMgcmVnaXN0ZXJzIG11bHRpcGxlIG5vdGVzIHRvIGEgc2luZ2xlIGNvbW1hbmQgd2hpY2ggcGVyZm9ybXMgZGlmZmVyZW50IGxvZ2ljIGJhc2VkIG9uIHRoZSBub3RlIG5hbWUuXHJcbiAgICAgICAgICAgIC8vIEluIGEgbW9yZSBjb21wbGV4IGFwcCwgd2UnZCB1c3VhbGx5IGJlIHJlZ2lzdGVyaW5nIGEgZGlmZmVyZW50IGNvbW1hbmQgdG8gZWFjaCBub3RpZmljYXRpb24gbmFtZS5cclxuICAgICAgICAgICAgY2MubG9nKCdIb21lQ29tbWFuZCBleGVjdXRlJyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgcGxheWVyUHJveHkgPSB0aGlzLmZhY2FkZS5yZXRyaWV2ZVByb3h5KFBsYXllclByb3h5TmFtZSk7XHJcblxyXG4gICAgICAgICAgICBzd2l0Y2gobm90ZS5nZXROYW1lKCkpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgY29uc3RhbnRzLlBMQVlFUl9BQ1RJT046XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyUHJveHkudXBkYXRlUGxheWVyKG5vdGUuZ2V0Qm9keSgpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vdGUuZ2V0VHlwZSgpID09IGNvbnN0YW50cy5UQVNLX0FDVElPTl9GSU5JU0hFRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXJQcm94eS51cGRhdGVQbGF5ZXJCeVRhc2sobm90ZS5nZXRCb2R5KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgY29uc3RhbnRzLkxPVkVfQUNUSU9OOlxyXG4gICAgICAgICAgICAgICAgICAgIHBsYXllclByb3h5LnVwZGF0ZVBsYXllckJ5TG92ZShub3RlLmdldEJvZHkoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbik7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgQXJ0aHVyIG9uIDIwMTQvMTIvMTQuXHJcbiAqL1xyXG52YXIgcHVyZW12YyA9IHJlcXVpcmUoJ3B1cmVtdmMnKS5wdXJlbXZjO1xyXG52YXIgY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vLi4vYXBwQ29uc3RhbnRzLmpzJyk7XHJcbnZhciBQbGF5ZXJDb21tYW5kID0gcmVxdWlyZSgnLi9wbGF5ZXJDb21tYW5kLmpzJyk7XHJcbnZhciBUYXNrQ29tbWFuZCA9IHJlcXVpcmUoJy4vdGFza0NvbW1hbmQuanMnKTtcclxudmFyIFRhc2tNb25pdG9yQ29tbWFuZCA9IHJlcXVpcmUoJy4vdGFza01vbml0b3JDb21tYW5kLmpzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHB1cmVtdmMuZGVmaW5lKHtcclxuICAgICAgICBuYW1lOiAnZmlnaHRlci5jb250cm9sbGVyLmNvbW1hbmQuUHJlcENvbnRyb2xsZXJDb21tYW5kJyxcclxuICAgICAgICBwYXJlbnQ6IHB1cmVtdmMuU2ltcGxlQ29tbWFuZFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVnaXN0ZXIgQ29tbWFuZHMgd2l0aCB0aGUgQ29udHJvbGxlclxyXG4gICAgICAgICAqIEBvdmVycmlkZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGV4ZWN1dGU6IGZ1bmN0aW9uIChub3RlKSB7XHJcbiAgICAgICAgICAgIC8vIFRoaXMgcmVnaXN0ZXJzIG11bHRpcGxlIG5vdGVzIHRvIGEgc2luZ2xlIGNvbW1hbmQgd2hpY2ggcGVyZm9ybXMgZGlmZmVyZW50IGxvZ2ljIGJhc2VkIG9uIHRoZSBub3RlIG5hbWUuXHJcbiAgICAgICAgICAgIC8vIEluIGEgbW9yZSBjb21wbGV4IGFwcCwgd2UnZCB1c3VhbGx5IGJlIHJlZ2lzdGVyaW5nIGEgZGlmZmVyZW50IGNvbW1hbmQgdG8gZWFjaCBub3RpZmljYXRpb24gbmFtZS5cclxuICAgICAgICAgICAgY2MubG9nKCdQcmVwQ29udHJvbGxlckNvbW1hbmQgZXhlY3V0ZScpO1xyXG4gICAgICAgICAgICB0aGlzLmZhY2FkZS5yZWdpc3RlckNvbW1hbmQoY29uc3RhbnRzLlBMQVlFUl9BQ1RJT04sIFBsYXllckNvbW1hbmQpO1xyXG4gICAgICAgICAgICB0aGlzLmZhY2FkZS5yZWdpc3RlckNvbW1hbmQoY29uc3RhbnRzLkxPVkVfQUNUSU9OLCBQbGF5ZXJDb21tYW5kKTtcclxuICAgICAgICAgICAgdGhpcy5mYWNhZGUucmVnaXN0ZXJDb21tYW5kKGNvbnN0YW50cy5UQVNLX0FDVElPTiwgVGFza0NvbW1hbmQpO1xyXG4gICAgICAgICAgICB0aGlzLmZhY2FkZS5yZWdpc3RlckNvbW1hbmQoY29uc3RhbnRzLlRBU0tfQUNUSU9OX01PTklUT1IsIFRhc2tNb25pdG9yQ29tbWFuZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4pOyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFydGh1ciBvbiAyMDE0LzEyLzE0LlxyXG4gKi9cclxudmFyIHB1cmVtdmMgPSByZXF1aXJlKCdwdXJlbXZjJykucHVyZW12YztcclxudmFyIFBsYXllclByb3h5ID0gcmVxdWlyZSgnLi4vLi4vbW9kZWwvcHJveHkvcGxheWVyUHJveHkuanMnKTtcclxudmFyIFRhc2tQcm94eSA9IHJlcXVpcmUoJy4uLy4uL21vZGVsL3Byb3h5L3Rhc2tQcm94eS5qcycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBwdXJlbXZjLmRlZmluZSh7XHJcbiAgICAgICAgbmFtZTogJ2ZpZ2h0ZXIuY29udHJvbGxlci5jb21tYW5kLlByZXBNb2RlbENvbW1hbmQnLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5TaW1wbGVDb21tYW5kXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZWdpc3RlciBQcm94aWVzIHdpdGggdGhlIE1vZGVsXHJcbiAgICAgICAgICogQG92ZXJyaWRlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZXhlY3V0ZTogZnVuY3Rpb24gKG5vdGUpIHtcclxuICAgICAgICAgICAgY2MubG9nKCdQcmVwTW9kZWxDb21tYW5kIGV4ZWN1dGUnKTtcclxuICAgICAgICAgICAgdGhpcy5mYWNhZGUucmVnaXN0ZXJQcm94eShuZXcgUGxheWVyUHJveHkoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuZmFjYWRlLnJlZ2lzdGVyUHJveHkobmV3IFRhc2tQcm94eSgpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbik7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFydGh1ciBvbiAyMDE0LzEyLzE0LlxyXG4gKi9cclxudmFyIHB1cmVtdmMgPSByZXF1aXJlKCdwdXJlbXZjJykucHVyZW12YztcclxudmFyIERpcmVjdG9yTWVkaWF0b3IgPSByZXF1aXJlKCcuLi8uLi92aWV3L21lZGlhdG9yL2RpcmVjdG9yTWVkaWF0b3IuanMnKTtcclxudmFyIEhvbWVNZWRpYXRvciA9IHJlcXVpcmUoJy4uLy4uL3ZpZXcvbWVkaWF0b3IvaG9tZU1lZGlhdG9yLmpzJyk7XHJcbnZhciBTY2VuZU1lZGlhdG9yID0gcmVxdWlyZSgnLi4vLi4vdmlldy9tZWRpYXRvci9zY2VuZU1lZGlhdG9yLmpzJyk7XHJcbnZhciBUcmFpbk1lZGlhdG9yID0gcmVxdWlyZSgnLi4vLi4vdmlldy9tZWRpYXRvci90cmFpbk1lZGlhdG9yLmpzJyk7XHJcbnZhciBMb3ZlTWVkaWF0b3IgPSByZXF1aXJlKCcuLi8uLi92aWV3L21lZGlhdG9yL2xvdmVNZWRpYXRvci5qcycpO1xyXG52YXIgRmlnaHRNZWRpYXRvciA9IHJlcXVpcmUoJy4uLy4uL3ZpZXcvbWVkaWF0b3IvZmlnaHRNZWRpYXRvci5qcycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBwdXJlbXZjLmRlZmluZSAoe1xyXG4gICAgICAgIG5hbWU6ICdmaWdodGVyLmNvbnRyb2xsZXIuY29tbWFuZC5QcmVwVmlld0NvbW1hbmQnLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5TaW1wbGVDb21tYW5kXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZWdpc3RlciBNZWRpYXRvcnMgd2l0aCB0aGUgVmlld1xyXG4gICAgICAgICAqIEBvdmVycmlkZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGV4ZWN1dGU6IGZ1bmN0aW9uIChub3RlKSB7XHJcbiAgICAgICAgICAgIGNjLmxvZygnUHJlcFZpZXdDb21tYW5kIGV4ZWN1dGUnKTtcclxuICAgICAgICAgICAgdGhpcy5mYWNhZGUucmVnaXN0ZXJNZWRpYXRvcihuZXcgRGlyZWN0b3JNZWRpYXRvcigpKTtcclxuICAgICAgICAgICAgdGhpcy5mYWNhZGUucmVnaXN0ZXJNZWRpYXRvcihuZXcgU2NlbmVNZWRpYXRvcigpKTtcclxuICAgICAgICAgICAgdGhpcy5mYWNhZGUucmVnaXN0ZXJNZWRpYXRvcihuZXcgSG9tZU1lZGlhdG9yKCkpO1xyXG4gICAgICAgICAgICB0aGlzLmZhY2FkZS5yZWdpc3Rlck1lZGlhdG9yKG5ldyBUcmFpbk1lZGlhdG9yKCkpO1xyXG4gICAgICAgICAgICB0aGlzLmZhY2FkZS5yZWdpc3Rlck1lZGlhdG9yKG5ldyBMb3ZlTWVkaWF0b3IoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuZmFjYWRlLnJlZ2lzdGVyTWVkaWF0b3IobmV3IEZpZ2h0TWVkaWF0b3IoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBBcnRodXIgb24gMjAxNS8xLzEuXHJcbiAqL1xyXG52YXIgcHVyZW12YyA9IHJlcXVpcmUoJ3B1cmVtdmMnKS5wdXJlbXZjO1xyXG52YXIgY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vLi4vYXBwQ29uc3RhbnRzLmpzJyk7XHJcbnZhciBUYXNrUHJveHlOYW1lID0gcmVxdWlyZSgnLi4vLi4vbW9kZWwvcHJveHkvdGFza1Byb3h5LmpzJykuTkFNRTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcHVyZW12Yy5kZWZpbmUoe1xyXG4gICAgICAgIG5hbWU6ICdmaWdodGVyLmNvbnRyb2xsZXIuY29tbWFuZC5UYXNrQ29tbWFuZCcsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLlNpbXBsZUNvbW1hbmRcclxuICAgIH0sXHJcblxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlZ2lzdGVyIENvbW1hbmRzIHdpdGggdGhlIENvbnRyb2xsZXJcclxuICAgICAgICAgKiBAb3ZlcnJpZGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBleGVjdXRlOiBmdW5jdGlvbiAobm90ZSkge1xyXG4gICAgICAgICAgICAvLyBUaGlzIHJlZ2lzdGVycyBtdWx0aXBsZSBub3RlcyB0byBhIHNpbmdsZSBjb21tYW5kIHdoaWNoIHBlcmZvcm1zIGRpZmZlcmVudCBsb2dpYyBiYXNlZCBvbiB0aGUgbm90ZSBuYW1lLlxyXG4gICAgICAgICAgICAvLyBJbiBhIG1vcmUgY29tcGxleCBhcHAsIHdlJ2QgdXN1YWxseSBiZSByZWdpc3RlcmluZyBhIGRpZmZlcmVudCBjb21tYW5kIHRvIGVhY2ggbm90aWZpY2F0aW9uIG5hbWUuXHJcbiAgICAgICAgICAgIGNjLmxvZygnVGFza0NvbW1hbmQgZXhlY3V0ZScsIG5vdGUudG9TdHJpbmcoKSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGFza1Byb3h5ID0gdGhpcy5mYWNhZGUucmV0cmlldmVQcm94eShUYXNrUHJveHlOYW1lKTtcclxuXHJcbiAgICAgICAgICAgIHN3aXRjaChub3RlLmdldFR5cGUoKSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBjb25zdGFudHMuVEFTS19BQ1RJT05fU1RBUlQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGFza1Byb3h5LnN0YXJ0VGFzayhub3RlLmdldEJvZHkoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIGNvbnN0YW50cy5UQVNLX0FDVElPTl9GSU5JU0hFRDpcclxuICAgICAgICAgICAgICAgICAgICB0YXNrUHJveHkuZmluaXNoVGFzayhub3RlLmdldEJvZHkoKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4pOyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFydGh1ciBvbiAyMDE1LzEvMS5cclxuICovXHJcbnZhciBwdXJlbXZjID0gcmVxdWlyZSgncHVyZW12YycpLnB1cmVtdmM7XHJcbnZhciBjb25zdGFudHMgPSByZXF1aXJlKCcuLi8uLi9hcHBDb25zdGFudHMuanMnKTtcclxudmFyIFRhc2tQcm94eU5hbWUgPSByZXF1aXJlKCcuLi8uLi9tb2RlbC9wcm94eS90YXNrUHJveHkuanMnKS5OQU1FO1xyXG52YXIgXyA9IHJlcXVpcmUoJ3VuZGVyc2NvcmUnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcHVyZW12Yy5kZWZpbmUoe1xyXG4gICAgICAgIG5hbWU6ICdmaWdodGVyLmNvbnRyb2xsZXIuY29tbWFuZC5UYXNrTW9uaXRvckNvbW1hbmQnLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5TaW1wbGVDb21tYW5kXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIElOU1RBTkNFIE1FTUJFUlNcclxuICAgIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZWdpc3RlciBDb21tYW5kcyB3aXRoIHRoZSBDb250cm9sbGVyXHJcbiAgICAgICAgICogQG92ZXJyaWRlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZXhlY3V0ZTogZnVuY3Rpb24gKG5vdGUpIHtcclxuICAgICAgICAgICAgLy8gVGhpcyByZWdpc3RlcnMgbXVsdGlwbGUgbm90ZXMgdG8gYSBzaW5nbGUgY29tbWFuZCB3aGljaCBwZXJmb3JtcyBkaWZmZXJlbnQgbG9naWMgYmFzZWQgb24gdGhlIG5vdGUgbmFtZS5cclxuICAgICAgICAgICAgLy8gSW4gYSBtb3JlIGNvbXBsZXggYXBwLCB3ZSdkIHVzdWFsbHkgYmUgcmVnaXN0ZXJpbmcgYSBkaWZmZXJlbnQgY29tbWFuZCB0byBlYWNoIG5vdGlmaWNhdGlvbiBuYW1lLlxyXG4gICAgICAgICAgICBjYy5sb2coJ1Rhc2tNb25pdG9yQ29tbWFuZCBleGVjdXRlJywgbm90ZS50b1N0cmluZygpKTtcclxuXHJcbiAgICAgICAgICAgIGNjLkRpcmVjdG9yLnNoYXJlZERpcmVjdG9yLmdldFNjaGVkdWxlcigpXHJcbiAgICAgICAgICAgICAgICAuc2NoZWR1bGVDYWxsYmFja0ZvclRhcmdldCh0aGlzLCB0aGlzLmNoZWNrVGFza1N0YXR1cywgMSwgY2MuUkVQRUFUX0ZPUkVWRVIsIDAsIGZhbHNlKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjaGVja1Rhc2tTdGF0dXM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjYy5sb2coJ3Rhc2sgbW9uaXRvcicpO1xyXG4gICAgICAgICAgICB2YXIgdGFza1Byb3h5ID0gdGhpcy5mYWNhZGUucmV0cmlldmVQcm94eShUYXNrUHJveHlOYW1lKTtcclxuICAgICAgICAgICAgdmFyIHRhc2tMaXN0ID0gdGFza1Byb3h5LmdldERhdGEoKTtcclxuICAgICAgICAgICAgdmFyIGZpbHRlcmVkID0gXy52YWx1ZXModGFza0xpc3QpLmZpbHRlcihmdW5jdGlvbih0YXNrKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFzay5nZXQoJ3N0YXR1cycpID09IGNvbnN0YW50cy5UQVNLX1NUQVRVUy5TVEFSVDtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgZmlsdGVyZWQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciB0ID0gZmlsdGVyZWRbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAodC5pc0ZpbmlzaGVkKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZhY2FkZS5zZW5kTm90aWZpY2F0aW9uKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdGFudHMuVEFTS19BQ1RJT04sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0YW50cy5UQVNLX0FDVElPTl9GSU5JU0hFRFxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mYWNhZGUuc2VuZE5vdGlmaWNhdGlvbihcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3RhbnRzLlBMQVlFUl9BQ1RJT04sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0YW50cy5UQVNLX0FDVElPTl9GSU5JU0hFRFxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbik7IiwiLyoqXHJcbiAqIENyZWF0ZWQgd2l0aCBKZXRCcmFpbnMgV2ViU3Rvcm0uXHJcbiAqIFVzZXI6IGxjYzM1MzZcclxuICogRGF0ZTogMTMtNy05XHJcbiAqIFRpbWU6IOS4i+WNiDU6MjRcclxuICogVG8gY2hhbmdlIHRoaXMgdGVtcGxhdGUgdXNlIEZpbGUgfCBTZXR0aW5ncyB8IEZpbGUgVGVtcGxhdGVzLlxyXG4gKi9cclxuXHJcblxyXG4vKlxyXG4gKiBlbnRpdHlcclxuICogKi9cclxuXHJcbnZhciBFdmVudCA9IHJlcXVpcmUoJy4uLy4uL3V0aWwvZXZlbnQuanMnKTtcclxuXHJcbnZhciBFbnRpdHkgPSBtb2R1bGUuZXhwb3J0cyA9IEV2ZW50LmV4dGVuZCh7XHJcbiAgICBjdG9yOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLl9kYXRhID0ge307XHJcbiAgICAgICAgdGhpcy5pbml0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc2F2ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2tleSkge1xyXG4gICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5fa2V5LCBKU09OLnN0cmluZ2lmeSh0aGlzLl9kYXRhKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBmZXRjaDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2tleSkge1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLl9rZXkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRyeXtcclxuICAgICAgICAgICAgICAgIHZhciBhdHRycyA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldHMoYXR0cnMpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH0gY2F0Y2goZSkge1xyXG4gICAgICAgICAgICAgICAgY2MuZXJyb3IoJ2NhbiBub3QgcGFyc2UgZW50aXR5IGRhdGE6ICcsIGRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgY3JlYXRlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIGdldERhdGE6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xyXG4gICAgfSxcclxuXHJcblx0c2V0OiBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcclxuXHRcdGlmICh0eXBlb2YgdmFsdWUgIT0gXCJ1bmRlZmluZWRcIikge1xyXG5cdFx0XHRpZiAodGhpcy5fZGF0YVtuYW1lXSAhPT0gdmFsdWUpIHtcclxuXHRcdFx0XHR0aGlzLl9kYXRhW25hbWVdID0gdmFsdWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuZW1pdChuYW1lICsgXCIuY2hhbmdlXCIsIHZhbHVlKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRzZXRzOiBmdW5jdGlvbiAoYXR0cnMpIHtcclxuXHRcdHZhciBrZXk7XHJcblxyXG5cdFx0Zm9yIChrZXkgaW4gYXR0cnMpIHtcclxuXHRcdFx0dGhpcy5zZXQoa2V5LCBhdHRyc1trZXldKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRnZXQ6IGZ1bmN0aW9uIChuYW1lKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5fZGF0YVtuYW1lXTtcclxuXHR9LFxyXG5cclxuICAgIGFkZDogZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcclxuICAgICAgICB2YXIgdmFsID0gdGhpcy5nZXQobmFtZSk7XHJcbiAgICAgICAgdGhpcy5zZXQobmFtZSwgdmFsdWUgKyB2YWwpO1xyXG4gICAgfSxcclxuXHJcblx0aGFzOiBmdW5jdGlvbiAobmFtZSkge1xyXG5cdFx0cmV0dXJuICh0eXBlb2YgKHRoaXMuX2RhdGFbbmFtZV0pICE9IFwidW5kZWZpbmVkXCIpO1xyXG5cdH0sXHJcblxyXG5cdHNjaGVkdWxlOiBmdW5jdGlvbiAoZm4sIGludGVydmFsLCByZXBlYXQsIGRlbGF5KSB7XHJcblx0XHRpbnRlcnZhbCA9IGludGVydmFsIHx8IDA7XHJcblx0XHRyZXBlYXQgPSAocmVwZWF0ID09IG51bGwpID8gY2MuUkVQRUFUX0ZPUkVWRVIgOiByZXBlYXQ7XHJcblx0XHRkZWxheSA9IGRlbGF5IHx8IDA7XHJcblxyXG5cdFx0Y2MuRGlyZWN0b3Iuc2hhcmVkRGlyZWN0b3IuZ2V0U2NoZWR1bGVyKCkuc2NoZWR1bGVDYWxsYmFja0ZvclRhcmdldCh0aGlzLCBmbiwgaW50ZXJ2YWwsIHJlcGVhdCwgZGVsYXksIGZhbHNlKTtcclxuXHR9LFxyXG5cclxuXHRzY2hlZHVsZU9uY2U6IGZ1bmN0aW9uIChmbiwgZGVsYXkpIHtcclxuXHRcdHRoaXMuc2NoZWR1bGUoZm4sIDAuMCwgMCwgZGVsYXkpO1xyXG5cdH0sXHJcblxyXG5cdHVuc2NoZWR1bGU6IGZ1bmN0aW9uIChmbikge1xyXG5cdFx0Ly8gZXhwbGljaXQgbmlsIGhhbmRsaW5nXHJcblx0XHRjYy5EaXJlY3Rvci5zaGFyZWREaXJlY3Rvci5nZXRTY2hlZHVsZXIoKS51bnNjaGVkdWxlQ2FsbGJhY2tGb3JUYXJnZXQodGhpcywgZm4pO1xyXG5cdH0sXHJcblxyXG5cdHVuc2NoZWR1bGVBbGxDYWxsYmFja3M6IGZ1bmN0aW9uICgpIHtcclxuXHRcdGNjLkRpcmVjdG9yLnNoYXJlZERpcmVjdG9yLmdldFNjaGVkdWxlcigpLnVuc2NoZWR1bGVBbGxDYWxsYmFja3NGb3JUYXJnZXQodGhpcyk7XHJcblx0fVxyXG59KTtcclxuIiwidmFyIEVudGl0eSA9IHJlcXVpcmUoJy4vZW50aXR5LmpzJyk7XHJcblxyXG52YXIgUGxheWVyID0gbW9kdWxlLmV4cG9ydHMgPSBFbnRpdHkuZXh0ZW5kKHtcclxuICAgIGN0b3I6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuX2tleSA9ICdQbGF5ZXJFbnRpdHknO1xyXG4gICAgICAgIHRoaXMuX25hbWUgPSAnUGxheWVyRW50aXR5JztcclxuICAgICAgICB0aGlzLl9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cclxuICAgICAgICB0aGlzLm9uKCdsb3ZlQ291bnQuY2hhbmdlJywgZnVuY3Rpb24oY291bnQpIHtcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBpc0luaXRlZCA9IHRoaXMuZmV0Y2goKTtcclxuICAgICAgICBpZiAoIWlzSW5pdGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjcmVhdGU6IGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgICB0aGlzLnNldHMoUGxheWVyLkRFRkFVTFRfREFUQSk7XHJcbiAgICAgICAgdGhpcy5zZXQoJ25hbWUnLCBuYW1lKTtcclxuICAgICAgICB0aGlzLnNhdmUoKTtcclxuICAgIH0sXHJcblxyXG4gICAgcmVkdWNlRGFpeUNvdW50OiBmdW5jdGlvbihuYW1lLCBjb3VudCkge1xyXG4gICAgICAgIHZhciBkYyA9IHRoaXMuZ2V0KCdkYWlseUNvdW50Jyk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBkY1tuYW1lXSAhPSAndW5kZWZpbmVkJyAmJiBkY1tuYW1lXSA+IDApIHtcclxuICAgICAgICAgICAgZGNbbmFtZV0gPSBNYXRoLm1heCgwLCBkY1tuYW1lXSAtIGNvdW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuUGxheWVyLkxvdmVDb3VudE1hcCA9IHtcclxuICAgIDE6IDk5LFxyXG4gICAgMjogNDk5LFxyXG4gICAgMzogMTk5OSxcclxuICAgIDQ6IDQ5OTksXHJcbiAgICA1OiA5OTk5XHJcbn07XHJcblxyXG5QbGF5ZXIuREVGQVVMVF9EQVRBID0ge1xyXG4gICAgZ29sZDogMTAwLFxyXG4gICAgaHA6IDEwMSxcclxuICAgIGF0azogMTAyLFxyXG4gICAgZGVmZW5jZTogMTAzLFxyXG4gICAgdW5kZWZlbmNlOiAxMDQsXHJcbiAgICBjcml0OiA1LFxyXG4gICAgdW5jcml0OiA1LFxyXG4gICAgZG9kZ2U6IDUsXHJcbiAgICBoaXQ6IDUsXHJcblxyXG4gICAgbG92ZUx2OiAxLFxyXG4gICAgbG92ZUNvdW50OiAwLFxyXG5cclxuICAgIGRhaWx5Q291bnQ6IHtcclxuICAgICAgICBmcmVlTG92ZTogOTBcclxuICAgIH1cclxufTsiLCJ2YXIgRW50aXR5ID0gcmVxdWlyZSgnLi9lbnRpdHkuanMnKTtcclxudmFyIGNvbnN0YW50cyA9IHJlcXVpcmUoJy4uLy4uL2FwcENvbnN0YW50cy5qcycpO1xyXG52YXIgXyA9IHJlcXVpcmUoJ3VuZGVyc2NvcmUnKTtcclxuXHJcbnZhciBUYXNrID0gbW9kdWxlLmV4cG9ydHMgPSBFbnRpdHkuZXh0ZW5kKHtcclxuICAgIGN0b3I6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5fbmFtZSA9IFwiVGFza0VudGl0eVwiO1xyXG4gICAgICAgIHRoaXMuX2tleSA9IFwidGFza1wiO1xyXG5cclxuICAgICAgICB0aGlzLl9zdXBlcihkYXRhKTtcclxuICAgIH0sXHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgIHRoaXMuX2tleSA9IHRoaXMuX2tleSArICcuJyArIGRhdGEuaWQ7XHJcbiAgICAgICAgaWYgKCF0aGlzLmZldGNoKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGUoZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjcmVhdGU6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICB0aGlzLnNldHMoZGF0YSk7XHJcbiAgICAgICAgdGhpcy5zYXZlKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0OiBmdW5jdGlvbiAoY291bnQpIHtcclxuICAgICAgICB0aGlzLnNldHMoe1xyXG4gICAgICAgICAgICBzdGF0dXM6IGNvbnN0YW50cy5UQVNLX1NUQVRVUy5TVEFSVCxcclxuICAgICAgICAgICAgc3RhcnRUaW1lOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcclxuICAgICAgICAgICAgdG90YWxDb3VudDogY291bnQgfHwgdGhpcy5fdG90YWxDb3VudFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2F2ZSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBmaW5pc2g6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuc2V0cyh7XHJcbiAgICAgICAgICAgIHN0YXR1czogY29uc3RhbnRzLlRBU0tfU1RBVFVTLkZJTklTSFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2F2ZSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBpc1N0YXJ0ZWQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldCgnc3RhdHVzJykgPT0gY29uc3RhbnRzLlRBU0tfU1RBVFVTLlNUQVJUO1xyXG4gICAgfSxcclxuXHJcbiAgICBpc0ZpbmlzaGVkOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50aW1lTGVmdCgpIDw9IDA7XHJcbiAgICB9LFxyXG5cclxuICAgIHRpbWVMZWZ0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gKHRoaXMuZ2V0KCdzdGFydFRpbWUnKSArIHRoaXMuZ2V0KCd0b3RhbENvdW50JykgKiB0aGlzLmdldCgndGltZVBlckNvdW50JykpXHJcbiAgICAgICAgICAgIC0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHRpbWVMZWZ0U3RyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgdGltZSA9IHRoaXMudGltZUxlZnQoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdGltZVN0cmluZyh0aW1lKTtcclxuICAgIH0sXHJcblxyXG4gICAgdG90YWxUaW1lOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXQoJ3RvdGFsQ291bnQnKSp0aGlzLmdldCgndGltZVBlckNvdW50Jyk7XHJcbiAgICB9LFxyXG5cclxuICAgIHRvdGFsVGltZVN0cjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RpbWVTdHJpbmcodGhpcy50b3RhbFRpbWUoKSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHByb2dyZXNzUGVyY2VudDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KCh0aGlzLnRvdGFsVGltZSgpIC0gdGhpcy50aW1lTGVmdCgpKS90aGlzLnRvdGFsVGltZSgpKjEwMCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHRvdGFsT2J0YWluOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXQoJ29idGFpblBlckNvdW50JykgKiB0aGlzLmdldCgndG90YWxDb3VudCcpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfdGltZVN0cmluZzogZnVuY3Rpb24obXMpIHtcclxuICAgICAgICB2YXIgX3N0ciA9ICcnO1xyXG4gICAgICAgIHZhciBzID0gbXMvMTAwMDtcclxuXHJcbiAgICAgICAgdmFyIHRpbWVNYXAgPSB7XHJcbiAgICAgICAgICAgIGRheTogNjAgKiA2MCAqIDI0LFxyXG4gICAgICAgICAgICBob3VyOiA2MCAqIDYwLFxyXG4gICAgICAgICAgICBtaW51dGU6IDYwXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdmFyIGQgPSBwYXJzZUludChzIC8gdGltZU1hcC5kYXkpO1xyXG4gICAgICAgIGlmICggZCA+IDApIHtcclxuICAgICAgICAgICAgX3N0ciArPSAnOicgKyBkO1xyXG4gICAgICAgICAgICBzID0gcyV0aW1lTWFwLmRheTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBob3VyID0gcGFyc2VJbnQocyAvIHRpbWVNYXAuaG91cik7XHJcbiAgICAgICAgaWYgKGhvdXIgPiAwKSB7XHJcbiAgICAgICAgICAgIF9zdHIgKz0gJzonICsgaG91cjtcclxuICAgICAgICAgICAgcyA9IHMldGltZU1hcC5ob3VyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIG1pbnV0ZSA9IHBhcnNlSW50KHMgLyB0aW1lTWFwLm1pbnV0ZSk7XHJcbiAgICAgICAgaWYgKG1pbnV0ZSA+IDApIHtcclxuICAgICAgICAgICAgX3N0ciArPSAnOicgKyBtaW51dGU7XHJcbiAgICAgICAgICAgIHMgPSBzJXRpbWVNYXAubWludXRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgX3N0ciArPSAnOicgKyBwYXJzZUludChzKTtcclxuICAgICAgICByZXR1cm4gX3N0ci5zbGljZSgxKTtcclxuICAgIH1cclxufSk7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFydGh1ciBvbiAyMDE0LzEyLzI2LlxyXG4gKi9cclxudmFyIHB1cmVtdmMgPSByZXF1aXJlKCdwdXJlbXZjJykucHVyZW12YztcclxudmFyIFBsYXllciA9IHJlcXVpcmUoJy4uL2VudGl0eS9wbGF5ZXIuanMnKTtcclxudmFyIGNvbnN0YW50cyA9IHJlcXVpcmUoJy4uLy4uL2FwcENvbnN0YW50cy5qcycpO1xyXG5cclxudmFyIFBsYXllclByb3h5ID0gbW9kdWxlLmV4cG9ydHMgPSBwdXJlbXZjLmRlZmluZSh7XHJcbiAgICAgICAgbmFtZTogJ2ZpZ3RoZXIubW9kZWwucHJveHkuUGxheWVyUHJveHknLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5Qcm94eSxcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3I6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBwdXJlbXZjLlByb3h5LmNhbGwodGhpcywgdGhpcy5jb25zdHJ1Y3Rvci5OQU1FKTtcclxuICAgICAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBuZXcgUGxheWVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YShwbGF5ZXIpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGdldFBsYXllcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGEgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHVwZGF0ZVBsYXllcjogZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc2V0KG5hbWUsIHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHVwZGF0ZVBsYXllckJ5VGFzazogZnVuY3Rpb24odGFzaykge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEuYWRkKHRhc2suZ2V0KCdhdHRyJyksIHRhc2sudG90YWxPYnRhaW4oKSk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zYXZlKCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdXBkYXRlUGxheWVyQnlMb3ZlOiBmdW5jdGlvbihsb3ZlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS5hZGQoJ2xvdmVDb3VudCcsIGxvdmUuY291bnQpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEucmVkdWNlRGFpeUNvdW50KCdmcmVlTG92ZScsIGxvdmUuY291bnQpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEuYWRkKCdnb2xkJywgLWxvdmUuZ29sZCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zYXZlKCk7XHJcbiAgICAgICAgICAgIHZhciBsb3ZlQ291bnQgPSB0aGlzLmRhdGEuZ2V0KCdsb3ZlQ291bnQnKTtcclxuICAgICAgICAgICAgdmFyIGxvdmVMdiA9IHRoaXMuZGF0YS5nZXQoJ2xvdmVMdicpO1xyXG4gICAgICAgICAgICB2YXIgbmVlZENvdW50ID0gUGxheWVyLkxvdmVDb3VudE1hcFtsb3ZlTHZdO1xyXG4gICAgICAgICAgICBpZiAobmVlZENvdW50ICE9IG51bGwgJiYgbmVlZENvdW50ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvdmVDb3VudCA+PSBuZWVkQ291bnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEuYWRkKCdsb3ZlTHYnLCAxKTtcclxuLy8gICAgICAgICAgICAgICAgICAgIHRoaXMuZmFjYWRlLnNlbmROb3RpZmljYXRpb24oXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgY29uc3RhbnRzLlBMQVlFUl9BQ1RJT05cclxuLy8gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzZXROYW1lOiBmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zZXQoJ25hbWUnLCBuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHtcclxuICAgICAgICBOQU1FOiAnUGxheWVyUHJveHknXHJcbiAgICB9XHJcbik7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgQXJ0aHVyIG9uIDIwMTUvMS8yLlxyXG4gKi9cclxudmFyIHB1cmVtdmMgPSByZXF1aXJlKCdwdXJlbXZjJykucHVyZW12YztcclxudmFyIFRhc2sgPSByZXF1aXJlKCcuLi9lbnRpdHkvdGFzay5qcycpO1xyXG52YXIgY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vLi4vYXBwQ29uc3RhbnRzLmpzJyk7XHJcblxyXG52YXIgVGFza1Byb3h5O1xyXG5UYXNrUHJveHkgPSBtb2R1bGUuZXhwb3J0cyA9IHB1cmVtdmMuZGVmaW5lKHtcclxuICAgICAgICBuYW1lOiAnZmlndGhlci5tb2RlbC5wcm94eS5UYXNrUHJveHknLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5Qcm94eSxcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3I6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcHVyZW12Yy5Qcm94eS5jYWxsKHRoaXMsIHRoaXMuY29uc3RydWN0b3IuTkFNRSk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSB7fTtcclxuICAgICAgICAgICAgVGFza1Byb3h5LlRhc2tzLmZvckVhY2goZnVuY3Rpb24odCkge1xyXG4gICAgICAgICAgICAgICAgZGF0YVt0LmlkXSA9IG5ldyBUYXNrKHQpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YShkYXRhKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzdGFydFRhc2s6IGZ1bmN0aW9uKHRhc2spIHtcclxuICAgICAgICAgICAgdGhpcy5nZXREYXRhKClbdGFzay5nZXQoJ2lkJyldLnN0YXJ0KHRhc2suZ2V0KCdjb3VudCcpKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBmaW5pc2hUYXNrOiBmdW5jdGlvbih0YXNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0RGF0YSgpW3Rhc2suZ2V0KCdpZCcpXS5maW5pc2goKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBnZXRUYXNrOiBmdW5jdGlvbihpZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXREYXRlKClbaWRdO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNldFRhc2s6IGZ1bmN0aW9uKHRhc2spIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGF0YSgpW3Rhc2suaWRdID0gdGFzaztcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB1cGRhdGVUYXNrOiBmdW5jdGlvbih0YXNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGFzayh0YXNrKS5zYXZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICB7XHJcbiAgICAgICAgTkFNRTogJ1Rhc2tQcm94eSdcclxuICAgIH1cclxuKTtcclxuXHJcblRhc2tQcm94eS5UYXNrcyA9IFtcclxuICAgIHtcclxuICAgICAgICBpZDogMSxcclxuICAgICAgICBuYW1lOiAn55Sf5ZG9JyxcclxuICAgICAgICBhdHRyOiAnaHAnLFxyXG4gICAgICAgIHN0YXJ0VGltZTogMCxcclxuICAgICAgICBzdGF0dXM6IGNvbnN0YW50cy5UQVNLX1NUQVRVUy5TVE9QLFxyXG4gICAgICAgIHRvdGFsQ291bnQ6IDEwMCxcclxuICAgICAgICB0aW1lUGVyQ291bnQ6IDEwMCwvL+avq+enklxyXG4gICAgICAgIGNvbnN1bWVQZXJDb3VudDogMSxcclxuICAgICAgICBvYnRhaW5QZXJDb3VudDogMjBcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgaWQ6IDIsXHJcbiAgICAgICAgbmFtZTogJ+aUu+WHuycsXHJcbiAgICAgICAgYXR0cjogJ2F0aycsXHJcbiAgICAgICAgc3RhcnRUaW1lOiAwLFxyXG4gICAgICAgIHN0YXR1czogY29uc3RhbnRzLlRBU0tfU1RBVFVTLlNUT1AsXHJcbiAgICAgICAgdG90YWxDb3VudDogMTAwLFxyXG4gICAgICAgIHRpbWVQZXJDb3VudDogMTAwMCxcclxuICAgICAgICBjb25zdW1lUGVyQ291bnQ6IDEsXHJcbiAgICAgICAgb2J0YWluUGVyQ291bnQ6IDIwXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGlkOiAzLFxyXG4gICAgICAgIG5hbWU6ICfpmLLlvqEnLFxyXG4gICAgICAgIGF0dHI6J2RlZmVuY2UnLFxyXG4gICAgICAgIHN0YXJ0VGltZTogMCxcclxuICAgICAgICBzdGF0dXM6IGNvbnN0YW50cy5UQVNLX1NUQVRVUy5TVE9QLFxyXG4gICAgICAgIHRvdGFsQ291bnQ6IDEwMCxcclxuICAgICAgICB0aW1lUGVyQ291bnQ6IDEwMDAwLFxyXG4gICAgICAgIGNvbnN1bWVQZXJDb3VudDogMSxcclxuICAgICAgICBvYnRhaW5QZXJDb3VudDogMjBcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgaWQ6IDQsXHJcbiAgICAgICAgbmFtZTogJ+egtOmYsicsXHJcbiAgICAgICAgc3RhcnRUaW1lOiAwLFxyXG4gICAgICAgIGF0dHI6ICd1bmRlZmVuY2UnLFxyXG4gICAgICAgIHN0YXR1czogY29uc3RhbnRzLlRBU0tfU1RBVFVTLlNUT1AsXHJcbiAgICAgICAgdG90YWxDb3VudDogMTAwLFxyXG4gICAgICAgIHRpbWVQZXJDb3VudDogMTAwMDAwLFxyXG4gICAgICAgIGNvbnN1bWVQZXJDb3VudDogMSxcclxuICAgICAgICBvYnRhaW5QZXJDb3VudDogMjBcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgaWQ6IDUsXHJcbiAgICAgICAgbmFtZTogJ+aatOWHuycsXHJcbiAgICAgICAgYXR0cjogJ2NyaXQnLFxyXG4gICAgICAgIHN0YXJ0VGltZTogMCxcclxuICAgICAgICBzdGF0dXM6IGNvbnN0YW50cy5UQVNLX1NUQVRVUy5TVE9QLFxyXG4gICAgICAgIHRvdGFsQ291bnQ6IDEwMCxcclxuICAgICAgICB0aW1lUGVyQ291bnQ6IDEwMDAwMCxcclxuICAgICAgICBjb25zdW1lUGVyQ291bnQ6IDEsXHJcbiAgICAgICAgb2J0YWluUGVyQ291bnQ6IDIwXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGlkOiA2LFxyXG4gICAgICAgIG5hbWU6ICfpn6fmgKcnLFxyXG4gICAgICAgIGF0dHI6ICd1bmNyaXQnLFxyXG4gICAgICAgIHN0YXJ0VGltZTogMCxcclxuICAgICAgICBzdGF0dXM6IGNvbnN0YW50cy5UQVNLX1NUQVRVUy5TVE9QLFxyXG4gICAgICAgIHRvdGFsQ291bnQ6IDEwMCxcclxuICAgICAgICB0aW1lUGVyQ291bnQ6IDEwMDAwMCxcclxuICAgICAgICBjb25zdW1lUGVyQ291bnQ6IDEsXHJcbiAgICAgICAgb2J0YWluUGVyQ291bnQ6IDIwXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGlkOiA3LFxyXG4gICAgICAgIG5hbWU6ICfpl6rpgb8nLFxyXG4gICAgICAgIGF0dHI6ICdkb2RnZScsXHJcbiAgICAgICAgc3RhcnRUaW1lOiAwLFxyXG4gICAgICAgIHN0YXR1czogY29uc3RhbnRzLlRBU0tfU1RBVFVTLlNUT1AsXHJcbiAgICAgICAgdG90YWxDb3VudDogMTAwLFxyXG4gICAgICAgIHRpbWVQZXJDb3VudDogMTAwMDAwLFxyXG4gICAgICAgIGNvbnN1bWVQZXJDb3VudDogMSxcclxuICAgICAgICBvYnRhaW5QZXJDb3VudDogMjBcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgaWQ6IDgsXHJcbiAgICAgICAgbmFtZTogJ+WRveS4rScsXHJcbiAgICAgICAgYXR0cjogJ2hpdCcsXHJcbiAgICAgICAgc3RhcnRUaW1lOiAwLFxyXG4gICAgICAgIHN0YXR1czogY29uc3RhbnRzLlRBU0tfU1RBVFVTLlNUT1AsXHJcbiAgICAgICAgdG90YWxDb3VudDogMTAwLFxyXG4gICAgICAgIHRpbWVQZXJDb3VudDogMTAwMDAwLFxyXG4gICAgICAgIGNvbnN1bWVQZXJDb3VudDogMSxcclxuICAgICAgICBvYnRhaW5QZXJDb3VudDogMjBcclxuICAgIH1cclxuXTsiLCJ2YXIgcmVzID0ge1xuICAgIGFkZF9qcGc6IFwicmVzL2ltYWdlcy9hZGQuanBnXCIsXG4gICAgYnRuMV9qcGc6IFwicmVzL2ltYWdlcy9idG4xLmpwZ1wiLFxuXG4gICAgYnRuM19wbmc6IFwicmVzL2ltYWdlcy9idG4zLmpwZ1wiLFxuICAgIGJ0bjVfcG5nOiBcInJlcy9pbWFnZXMvYnRuNS5qcGdcIixcbiAgICBidG43X2pwZzogXCJyZXMvaW1hZ2VzL2J0bjcuanBnXCIsXG5cbiAgICBpbWcxX3BuZzogXCJyZXMvaW1hZ2VzL2ltZzEuanBnXCIsXG4gICAgaW1nNV9qcGc6IFwicmVzL2ltYWdlcy9pbWc1LmpwZ1wiLFxuICAgIGltZzZfanBnOiBcInJlcy9pbWFnZXMvaW1nNi5qcGdcIixcbiAgICB0eHRfYmcxX2pwZzogXCJyZXMvaW1hZ2VzL3R4dF9iZzEuanBnXCIsXG4gICAgYmxhY2tfcG5nOiBcInJlcy9pbWFnZXMvYnJhY2sucG5nXCIsXG4gICAgZ3JheV9wbmc6IFwicmVzL2ltYWdlcy9ncmF5LnBuZ1wiLFxuICAgIGJsdWVfcG5nOiBcInJlcy9pbWFnZXMvYmx1ZS5wbmdcIixcbiAgICBibHVlX2FfcG5nOiBcInJlcy9pbWFnZXMvYmx1ZV9hLnBuZ1wiLFxuICAgIGJsdWVfZF9wbmc6IFwicmVzL2ltYWdlcy9ibHVlX2QucG5nXCIsXG4gICAgbG92ZV9sdl9iZ19wbmc6IFwicmVzL2ltYWdlcy9sb3ZlX2x2X2JnLnBuZ1wiLFxuXG5cbiAgICBNYWluTm9kZTogXCJyZXMvTWFpblNjZW5lLmNzYlwiLFxuICAgIFRhc2tOb2RlOiBcInJlcy9UYXNrTm9kZS5jc2JcIixcbiAgICBUcmFpbk5vZGU6IFwicmVzL1RyYWluTm9kZS5jc2JcIixcbiAgICBMb3ZlTGF5ZXI6IFwicmVzL0xvdmVMYXllci5jc2JcIixcbiAgICBMb3ZlSXRlbTogXCJyZXMvTG92ZUl0ZW0uY3NiXCIsXG4gICAgTG92ZUNvbmZpcm1Ob2RlOiBcInJlcy9Mb3ZlQ29uZmlybU5vZGUuY3NiXCIsXG4gICAgQ29uZmlybU5vZGU6IFwicmVzL0NvbmZpcm1Ob2RlLmNzYlwiLFxuICAgIEZpZ2h0Tm9kZTogXCJyZXMvRmlnaHROb2RlLmNzYlwiLFxuICAgIEhvbWVOb2RlOiBcInJlcy9Ib21lTm9kZS5jc2JcIixcbiAgICB0aXRsZU5vZGU6IFwicmVzL3RpdGxlTm9kZS5jc2JcIlxufTtcblxudmFyIGdfcmVzb3VyY2VzID0gW107XG5mb3IgKHZhciBpIGluIHJlcykge1xuICAgIGdfcmVzb3VyY2VzLnB1c2gocmVzW2ldKTtcbn1cblxubW9kdWxlLmV4cG9ydHMucmVzID0gcmVzO1xubW9kdWxlLmV4cG9ydHMuZ19yZXNvdWNlcyA9IGdfcmVzb3VyY2VzOyIsIi8qKlxyXG4gKiBDcmVhdGVkIHdpdGggSmV0QnJhaW5zIFdlYlN0b3JtLlxyXG4gKiBVc2VyOiBsY2MzNTM2XHJcbiAqIERhdGU6IDEzLTEwLTE4XHJcbiAqIFRpbWU6IOS4i+WNiDI6NTZcclxuICogVG8gY2hhbmdlIHRoaXMgdGVtcGxhdGUgdXNlIEZpbGUgfCBTZXR0aW5ncyB8IEZpbGUgVGVtcGxhdGVzLlxyXG4gKi9cclxuXHJcblxyXG4vKlxyXG4gKiBldmVudFxyXG4gKiAqL1xyXG5cclxudmFyIEV2ZW50ID0gbW9kdWxlLmV4cG9ydHMgPSBjYy5DbGFzcy5leHRlbmQoe1xyXG4gICAgX2NhbGxiYWNrOiB7fSxcclxuXHJcbiAgICBvbjogZnVuY3Rpb24gKGV2ZW50LCBmbikge1xyXG4gICAgICAgIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcclxuICAgICAgICAodGhpcy5fY2FsbGJhY2tzW2V2ZW50XSA9IHRoaXMuX2NhbGxiYWNrc1tldmVudF0gfHwgW10pXHJcbiAgICAgICAgICAgIC5wdXNoKGZuKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcblxyXG4gICAgb25jZTogZnVuY3Rpb24gKGV2ZW50LCBmbikge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG9uKCkge1xyXG4gICAgICAgICAgICBzZWxmLm9mZihldmVudCwgb24pO1xyXG4gICAgICAgICAgICBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm4uX29mZiA9IG9uO1xyXG4gICAgICAgIHRoaXMub24oZXZlbnQsIG9uKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcbiAgICBcclxuICAgIGFkZExpc3RlbmVyOiBmdW5jdGlvbihldmVudCwgZm4pIHtcclxuICAgIFx0dGhpcy5vbihldmVudCwgZm4pO1xyXG4gICAgfSxcclxuXHJcbiAgICByZW1vdmVMaXN0ZW5lcjogZnVuY3Rpb24gKGV2ZW50LCBmbikge1xyXG4gICAgICAgIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcclxuXHJcbiAgICAgICAgLy8gYWxsXHJcbiAgICAgICAgaWYgKDAgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jYWxsYmFja3MgPSB7fTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBzcGVjaWZpYyBldmVudFxyXG4gICAgICAgIHZhciBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3NbZXZlbnRdO1xyXG4gICAgICAgIGlmICghY2FsbGJhY2tzKSByZXR1cm4gdGhpcztcclxuXHJcbiAgICAgICAgLy8gcmVtb3ZlIGFsbCBoYW5kbGVyc1xyXG4gICAgICAgIGlmICgxID09IGFyZ3VtZW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2NhbGxiYWNrc1tldmVudF07XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gcmVtb3ZlIHNwZWNpZmljIGhhbmRsZXJcclxuICAgICAgICB2YXIgaSA9IHRoaXMuX2luZGV4T2YoY2FsbGJhY2tzLCBmbi5fb2ZmIHx8IGZuKTtcclxuICAgICAgICBpZiAofmkpIGNhbGxiYWNrcy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICByZW1vdmVMaXN0ZW5lcnM6IGZ1bmN0aW9uKCkge1xyXG4gICAgXHR0aGlzLl9jYWxsYmFjayA9IHt9O1xyXG4gICAgfSxcclxuXHJcbiAgICBlbWl0OiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XHJcbiAgICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSlcclxuICAgICAgICB2YXIgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzW2V2ZW50XTtcclxuXHJcbiAgICAgICAgaWYgKGNhbGxiYWNrcykge1xyXG4gICAgICAgICAgICBjYWxsYmFja3MgPSBjYWxsYmFja3Muc2xpY2UoMCk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBjYWxsYmFja3MubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrc1tpXS5hcHBseSh0aGlzLCBhcmdzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG5cclxuICAgIGxpc3RlbmVyczogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jYWxsYmFja3NbZXZlbnRdIHx8IFtdO1xyXG4gICAgfSxcclxuXHJcbiAgICBoYXNMaXN0ZW5lcnM6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHJldHVybiAhIXRoaXMubGlzdGVuZXJzKGV2ZW50KS5sZW5ndGg7XHJcbiAgICB9LFxyXG5cclxuICAgIF9pbmRleE9mOiBmdW5jdGlvbiAoYXJyLCBvYmopIHtcclxuICAgICAgICBpZiAoYXJyLmluZGV4T2YpIHJldHVybiBhcnIuaW5kZXhPZihvYmopO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIGlmIChhcnJbaV0gPT09IG9iaikgcmV0dXJuIGk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxufSk7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFydGh1ciBvbiAyMDE1LzEvOC5cclxuICovXHJcbnZhciByZXMgPSByZXF1aXJlKCcuLi8uLi9yZXNvdXJjZS5qcycpLnJlcztcclxudmFyIGNvbnN0YW50cyA9IHJlcXVpcmUoJy4uLy4uL2FwcENvbnN0YW50cy5qcycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjYy5MYXllci5leHRlbmQoe1xyXG4gICAgX3RpdGxlOiBudWxsLFxyXG4gICAgX2Rlc2M6IG51bGwsXHJcbiAgICBfb25Db25maXJtOiBudWxsLFxyXG5cclxuICAgIGN0b3I6IGZ1bmN0aW9uICh0aXRsZSwgZGVzYywgY2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLl9zdXBlcigpO1xyXG5cclxuICAgICAgICB2YXIgbm9kZSA9IHRoaXMuX3Jvb3ROb2RlID0gY2NzLmNzTG9hZGVyLmNyZWF0ZU5vZGUocmVzLkNvbmZpcm1Ob2RlKTtcclxuICAgICAgICB0aGlzLmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgIHZhciBzaXplID0gY2Mud2luU2l6ZTtcclxuICAgICAgICBub2RlLmF0dHIoe1xyXG4gICAgICAgICAgICB4OiBzaXplLndpZHRoLzIsXHJcbiAgICAgICAgICAgIHk6IHNpemUuaGVpZ2h0LzIsXHJcbiAgICAgICAgICAgIGFuY2hvclg6IDAuNSxcclxuICAgICAgICAgICAgYW5jaG9yWTogMC41LFxyXG4gICAgICAgICAgICB3aWR0aDogNDUwLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IDI1MFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLl90aXRsZSA9IG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3BhbmVsX2JnJykuZ2V0Q2hpbGRCeU5hbWUoJ3R4dF90aXRsZScpO1xyXG4gICAgICAgIHRoaXMuX2Rlc2MgPSBub2RlLmdldENoaWxkQnlOYW1lKCdwYW5lbF9iZycpLmdldENoaWxkQnlOYW1lKCd0eHRfZGVzYycpO1xyXG4gICAgICAgIHRoaXMuX2J0bl9jYW5jZWwgPSBub2RlLmdldENoaWxkQnlOYW1lKCdwYW5lbF9iZycpLmdldENoaWxkQnlOYW1lKCdidG5fY2FuY2VsJyk7XHJcbiAgICAgICAgdGhpcy5fYnRuX29rID0gbm9kZS5nZXRDaGlsZEJ5TmFtZSgncGFuZWxfYmcnKS5nZXRDaGlsZEJ5TmFtZSgnYnRuX29rJyk7XHJcblxyXG4gICAgICAgIHRoaXMuX2J0bl9jYW5jZWwuYWRkQ2xpY2tFdmVudExpc3RlbmVyKHRoaXMuY2xvc2UuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5fYnRuX29rLmFkZENsaWNrRXZlbnRMaXN0ZW5lcih0aGlzLm9uT2tMaXN0ZW5lci5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgaWYgKHRpdGxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RpdGxlLnN0cmluZyA9IHRpdGxlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGVzYykge1xyXG4gICAgICAgICAgICB0aGlzLl9kZXNjLnN0cmluZyA9IGRlc2M7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgdGhpcy5fb25Db25maXJtID0gY2FsbGJhY2s7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXRUaXRsZTogZnVuY3Rpb24odGl0bGUpIHtcclxuICAgICAgICB0aGlzLl90aXRsZS5zdHJpbmcgPSB0aXRsZTtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0RGVzYzogZnVuY3Rpb24oZGVzYykge1xyXG4gICAgICAgIHRoaXMuX2Rlc2Muc3RyaW5nID0gZGVzYztcclxuICAgIH0sXHJcblxyXG4gICAgc2V0T2tDYWxsYmFjazogZnVuY3Rpb24oZm4pIHtcclxuICAgICAgICB0aGlzLl9vbkNvbmZpcm0gPSBmbjtcclxuICAgIH0sXHJcblxyXG4gICAgY2xvc2U6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbk9rTGlzdGVuZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9vbkNvbmZpcm0pIHtcclxuICAgICAgICAgICAgdGhpcy5fb25Db25maXJtLmNhbGwodGhpcyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgQXJ0aHVyIG9uIDIwMTQvMTIvMjkuXHJcbiAqL1xyXG52YXIgXyA9IHJlcXVpcmUoJ3VuZGVyc2NvcmUnKTtcclxudmFyIHJlcyA9IHJlcXVpcmUoJy4uLy4uLy4uL3Jlc291cmNlLmpzJykucmVzO1xyXG5cclxudmFyIExvdmVJdGVtQ29udHJvbGxlciA9IG1vZHVsZS5leHBvcnRzID0gIGNjcy5Db21Db250cm9sbGVyLmV4dGVuZCh7XHJcbiAgICBjdG9yOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLl9zdXBlcigpO1xyXG4gICAgICAgIHRoaXMuX25hbWUgPSBcIkxvdmVJdGVtQ29udHJvbGxlclwiO1xyXG4gICAgICAgIHRoaXMuX2x2ID0gMTtcclxuICAgICAgICB0aGlzLl9wb3NpdGlvbiA9IG51bGw7XHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKG9wdGlvbnMsIHBsYXllcikge1xyXG4gICAgICAgIGlmICghb3B0aW9ucyB8fCBfLmlzRW1wdHkob3B0aW9ucykpIHtcclxuICAgICAgICAgICAgb3B0aW9ucyA9IExvdmVJdGVtQ29udHJvbGxlci5ERUZBVUxUX09QVElPTlM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcclxuICAgICAgICB0aGlzLl9sb3ZlTHYgPSBwbGF5ZXIuZ2V0KCdsb3ZlTHYnKTtcclxuICAgICAgICB0aGlzLl9sb3ZlRnJlZUNvdW50ID0gcGxheWVyLmdldCgnZGFpbHlDb3VudCcpLmZyZWVMb3ZlO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkVudGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLmdldE93bmVyKCkuc2V0UG9zaXRpb24odGhpcy5fb3B0aW9ucy5wb3NpdGlvbik7XHJcblxyXG4gICAgICAgIHZhciB0eHRfdmFsdWUgPSB0aGlzLl90eHRfdmFsdWUgPSB0aGlzLmdldE93bmVyKCkuZ2V0Q2hpbGRCeU5hbWUoJ3R4dF92YWx1ZScpO1xyXG4gICAgICAgIHR4dF92YWx1ZS5hdHRyKHthbmNob3JYOiAwLCBhbmNob3JZOiAwLjV9KTtcclxuICAgICAgICB0eHRfdmFsdWUuc2V0U3RyaW5nKCcrJyArIHRoaXMuX29wdGlvbnMudmFsdWUpO1xyXG5cclxuICAgICAgICB2YXIgdHh0X2NvdW50ID0gdGhpcy5fdHh0X2NvdW50ID0gdGhpcy5nZXRPd25lcigpLmdldENoaWxkQnlOYW1lKCd0eHRfY291bnQnKTtcclxuICAgICAgICB0eHRfY291bnQuYXR0cih7YW5jaG9yWDogMCwgYW5jaG9yWTogMC41fSk7XHJcbiAgICAgICAgdHh0X2NvdW50LnNldFN0cmluZyh0aGlzLl9vcHRpb25zLmNvdW50ICsgJy8nICsgdGhpcy5fb3B0aW9ucy5jb3VudE5lZWQgKyAn5qyhJyk7XHJcblxyXG4gICAgICAgIHRoaXMuX2x2X2JnID0gdGhpcy5nZXRPd25lcigpLmdldENoaWxkQnlOYW1lKCdsdl9iZycpO1xyXG4gICAgICAgIHZhciB0eHRfbHYgPSB0aGlzLl90eHRfbHYgPSB0aGlzLmdldE93bmVyKCkuZ2V0Q2hpbGRCeU5hbWUoJ3R4dF9sdicpO1xyXG4gICAgICAgIHR4dF9sdi5hdHRyKHthbmNob3JYOiAwLjUsIGFuY2hvclk6IDAuNX0pO1xyXG4gICAgICAgIHR4dF9sdi5zZXRTdHJpbmcodGhpcy5fb3B0aW9ucy5sdiArICfnuqcnKTtcclxuXHJcbiAgICAgICAgdmFyIGJ0bl9sb3ZlID0gdGhpcy5fYnRuX2xvdmUgPSB0aGlzLmdldE93bmVyKCkuZ2V0Q2hpbGRCeU5hbWUoJ2J0bl9sb3ZlJyk7XHJcbiAgICAgICAgYnRuX2xvdmUuc2V0VGl0bGVUZXh0KCfnjK7lkLsnKTtcclxuICAgICAgICBidG5fbG92ZS5hZGRDbGlja0V2ZW50TGlzdGVuZXIodGhpcy5sb3ZlTGlzdGVuZXIuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgICAgIHZhciBkZXNjX2JnID0gdGhpcy5nZXRPd25lcigpLmdldENoaWxkQnlOYW1lKCdkZXNjX2JnJyk7XHJcbiAgICAgICAgZGVzY19iZy5hdHRyKHthbmNob3JYOiAwLjUsIGFuY2hvclk6IDAuNX0pO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fbG92ZUx2ID09IHRoaXMuX29wdGlvbnMubHYpIHtcclxuICAgICAgICAgICAgdGhpcy5fbHZfYmcuc2V0VGV4dHVyZShyZXMubG92ZV9sdl9iZ19wbmcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGJ0bl9sb3ZlLmVuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgYnRuX2xvdmUuYnJpZ2h0ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBsb3ZlTGlzdGVuZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuZ2V0T3duZXIoKS5wYXJlbnQucGFyZW50Lm9uTG92ZUxpc3RlbmVyKCk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuTG92ZUl0ZW1Db250cm9sbGVyLmNyZWF0ZSA9IGZ1bmN0aW9uKHBsYXllciwgb3B0aW9ucykge1xyXG4gICAgdmFyIGNvbiA9IG5ldyBMb3ZlSXRlbUNvbnRyb2xsZXIoKTtcclxuICAgIGNvbi5pbml0KHBsYXllciwgb3B0aW9ucyk7XHJcbiAgICByZXR1cm4gY29uO1xyXG59XHJcblxyXG5Mb3ZlSXRlbUNvbnRyb2xsZXIuREVGQVVMVF9PUFRJT05TID0ge1xyXG4gICAgbHY6IDEsXHJcbiAgICB2YWx1ZTogMSxcclxuICAgIGNvdW50OiAxMCxcclxuICAgIGNvdW50TmVlZDogOTksXHJcbiAgICBwb3NpdGlvbjogY2MucCgwLCAwKVxyXG59OyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFydGh1ciBvbiAyMDE0LzEyLzI5LlxyXG4gKi9cclxuXHJcbnZhciBUcmFpbkl0ZW1Db250cm9sbGVyID0gbW9kdWxlLmV4cG9ydHMgPSAgY2NzLkNvbUNvbnRyb2xsZXIuZXh0ZW5kKHtcclxuICAgIGN0b3I6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuX3N1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5fbmFtZSA9ICdUcmFpbkl0ZW1Db250cm9sbGVyJztcclxuICAgICAgICB0aGlzLkRFRkFVTFRfQ09VTlQgPSAxMDA7XHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKHRhc2ssIHBvcykge1xyXG4gICAgICAgIHRoaXMuX3Rhc2sgPSB0YXNrO1xyXG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uID0gcG9zO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkVudGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAodGhpcy5fcG9zaXRpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5nZXRPd25lcigpLnNldFBvc2l0aW9uKHRoaXMuX3Bvc2l0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBidG5fc3RhcnQgPSB0aGlzLl9idG5fc3RhcnQgPSB0aGlzLmdldE93bmVyKCkuZ2V0Q2hpbGRCeU5hbWUoJ2J0bl9zdGFydF90YXNrJyk7XHJcbiAgICAgICAgYnRuX3N0YXJ0LnNldFRpdGxlRm9udFNpemUoMjApO1xyXG4gICAgICAgIGJ0bl9zdGFydC5hZGRDbGlja0V2ZW50TGlzdGVuZXIodGhpcy5zdGFydExpc3RlbmVyLmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICB2YXIgYnRuX2FkZF9jb3VudCA9IHRoaXMuX2J0bl9hZGRfY291bnQgPSB0aGlzLmdldE93bmVyKCkuZ2V0Q2hpbGRCeU5hbWUoJ2J0bl9jb3VudF9hZGQnKTtcclxuICAgICAgICBidG5fYWRkX2NvdW50LmFkZENsaWNrRXZlbnRMaXN0ZW5lcih0aGlzLmFkZENvdW5kTGlzdGVuZXIuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgICAgIHRoaXMuX2NvdW50ID0gdGhpcy5nZXRPd25lcigpLmdldENoaWxkQnlOYW1lKCdjb3VudF92YWx1ZScpO1xyXG4gICAgICAgIHRoaXMuX2NvdW50LnNldFN0cmluZyh0aGlzLkRFRkFVTFRfQ09VTlQrJ+asoScpO1xyXG4gICAgICAgIHRoaXMuX2NvdW50LmF0dHIoe2FuY2hvclg6IDAsIGFuY2hvclk6IDAuNX0pO1xyXG5cclxuICAgICAgICB0aGlzLl90YXNrX25hbWUgPSB0aGlzLmdldE93bmVyKCkuZ2V0Q2hpbGRCeU5hbWUoJ3Rhc2tfbmFtZScpO1xyXG4gICAgICAgIHRoaXMuX3Rhc2tfbmFtZS5hdHRyKHthbmNob3JYOiAwLCBhbmNob3JZOiAwLjV9KTtcclxuICAgICAgICB0aGlzLl90YXNrX25hbWUuc2V0U3RyaW5nKHRoaXMuX3Rhc2suZ2V0KCduYW1lJykgKyAnOiDmr4/mrKErJyArIHRoaXMuX3Rhc2suZ2V0KCdvYnRhaW5QZXJDb3VudCcpKTtcclxuXHJcbiAgICAgICAgdGhpcy5fcHJvZ3Jlc3NfYmFyID0gdGhpcy5nZXRPd25lcigpLmdldENoaWxkQnlOYW1lKCdwcm9ncmVzc19iYXInKTtcclxuICAgICAgICB0aGlzLl9wcm9ncmVzc19iYXIuYXR0cih7YW5jaG9yWDogMCwgYW5jaG9yWTogMC41fSk7XHJcblxyXG4gICAgICAgIHZhciB0eHRfdGFza19kZXNjID0gdGhpcy5fdHh0X3Rhc2tfZGVzYyA9IHRoaXMuZ2V0T3duZXIoKS5nZXRDaGlsZEJ5TmFtZSgndHh0X3Rhc2tfZGVzYycpO1xyXG4gICAgICAgIHZhciB0eHRfdGltZSA9IHRoaXMuX3R4dF90aW1lID0gdGhpcy5nZXRPd25lcigpLmdldENoaWxkQnlOYW1lKCd0eHRfdGltZScpO1xyXG4gICAgICAgIHR4dF90YXNrX2Rlc2MuYXR0cih7YW5jaG9yWDogMCwgYW5jaG9yWTogMC41fSk7XHJcbiAgICAgICAgdHh0X3RpbWUuYXR0cih7YW5jaG9yWDogMSwgYW5jaG9yWTogMC41fSk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVQcm9ncmVzcygpO1xyXG5cclxuICAgICAgICB0aGlzLnNldFRhc2tEZXNjKCk7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZVVwZGF0ZSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzY2hlZHVsZVVwZGF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3Rhc2suaXNTdGFydGVkKCkpIHtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3JcclxuICAgICAgICAgICAgICAgIC5nZXRTY2hlZHVsZXIoKVxyXG4gICAgICAgICAgICAgICAgLnNjaGVkdWxlQ2FsbGJhY2tGb3JUYXJnZXQodGhpcywgdGhpcy51cGRhdGVQcm9ncmVzcywgMSwgY2MuUkVQRUFUX0ZPUkVWRVIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlUHJvZ3Jlc3M6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBwZXJjZW50ID0gdGhpcy5fdGFzay5wcm9ncmVzc1BlcmNlbnQoKTtcclxuICAgICAgICB0aGlzLl9wcm9ncmVzc19iYXIuc2NhbGVYID0gNTg2LzEwMC80MCpwZXJjZW50O1xyXG4gICAgICAgIHRoaXMuX3VwZGF0ZVRpbWUoKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3Rhc2sudGltZUxlZnQoKSA8PSAwKSB7XHJcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yXHJcbiAgICAgICAgICAgICAgICAuZ2V0U2NoZWR1bGVyKClcclxuICAgICAgICAgICAgICAgIC51bnNjaGVkdWxlQ2FsbGJhY2tGb3JUYXJnZXQodGhpcywgdGhpcy51cGRhdGVQcm9ncmVzcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydExpc3RlbmVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLl90YXNrLnN0YXJ0KHRoaXMuZ2V0Q291bnQoKSk7XHJcbiAgICAgICAgdGhpcy5zZXRUYXNrRGVzYygpO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVVcGRhdGUoKTtcclxuICAgICAgICAvL3RoaXMuZ2V0T3duZXIoKS5wYXJlbnQucGFyZW50Lm9uU3RhcnRUYXNrKHRoaXMuX3Rhc2spO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXRUYXNrQnV0dG9uVGl0bGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fdGFzay5pc0ZpbmlzaGVkKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fYnRuX3N0YXJ0LnNldFRpdGxlVGV4dCgn6L+b6KGM5LitLi4uJyk7XHJcbiAgICAgICAgICAgIHRoaXMuX2J0bl9zdGFydC5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX2J0bl9zdGFydC5icmlnaHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fYnRuX2FkZF9jb3VudC5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX2J0bl9hZGRfY291bnQuYnJpZ2h0ID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fYnRuX3N0YXJ0LnNldFRpdGxlVGV4dCgn5byA5aeL5Lu75YqhJyk7XHJcbiAgICAgICAgICAgIHRoaXMuX2J0bl9zdGFydC5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fYnRuX3N0YXJ0LmJyaWdodCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX2J0bl9hZGRfY291bnQuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX2J0bl9hZGRfY291bnQuYnJpZ2h0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fcHJvZ3Jlc3NfYmFyLnNjYWxlWCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBfdXBkYXRlVGltZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuX3R4dF90aW1lLnN0cmluZyA9IHRoaXMuX3Rhc2sudGltZUxlZnRTdHIoKTtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0VGFza0Rlc2M6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl90YXNrLmlzU3RhcnRlZCgpICYmICF0aGlzLl90YXNrLmlzRmluaXNoZWQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLl90eHRfdGFza19kZXNjLnNldFN0cmluZyhjYy5mb3JtYXRTdHIoXHJcbiAgICAgICAgICAgICAgICAn5Lu75Yqh6L+b6KGM5Lit77yM5aWW5YqxICslcycsXHJcbiAgICAgICAgICAgICAgICB0aGlzLl90YXNrLnRvdGFsT2J0YWluKClcclxuICAgICAgICAgICAgKSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVRpbWUoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl90eHRfdGFza19kZXNjLnNldFN0cmluZygn5omn6KGM5Lu75Yqh5Y+v5Lul5aKe5Yqg55u45bqU55qE5bGe5oCnJyk7XHJcbiAgICAgICAgICAgIHRoaXMuX3R4dF90aW1lLnN0cmluZyA9ICcnO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldFRhc2tCdXR0b25UaXRsZSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICB0YXNrRmluaXNoZWQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuc2V0VGFza0Rlc2MoKTtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0Q291bnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBwYXJzZUludCh0aGlzLl9jb3VudC5nZXRTdHJpbmcoKSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGFkZENvdW5kTGlzdGVuZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuREVGQVVMVF9DT1VOVCArPSAxO1xyXG4gICAgICAgIHRoaXMuX2NvdW50LnNldFN0cmluZyh0aGlzLkRFRkFVTFRfQ09VTlQrJ+asoScpO1xyXG4gICAgfSxcclxuXHJcbiAgICByZWR1Y2VDb3VudExpc3RlbmVyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB9XHJcbn0pO1xyXG5cclxuVHJhaW5JdGVtQ29udHJvbGxlci5jcmVhdGUgPSBmdW5jdGlvbihuYW1lLCBwb3MpIHtcclxuICAgIHZhciBjb24gPSBuZXcgVHJhaW5JdGVtQ29udHJvbGxlcigpO1xyXG4gICAgY29uLmluaXQobmFtZSwgcG9zKTtcclxuICAgIHJldHVybiBjb247XHJcbn1cclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgQXJ0aHVyIG9uIDIwMTUvMS8xMC5cclxuICovXHJcbnZhciByZXMgPSByZXF1aXJlKCcuLi8uLi9yZXNvdXJjZS5qcycpLnJlcztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY2MuTGF5ZXIuZXh0ZW5kKHtcclxuICAgIGN0b3I6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuX3N1cGVyKCk7XHJcblxyXG4gICAgICAgIHZhciByb290Tm9kZSA9IHRoaXMuX3Jvb3ROb2RlID0gbmV3IGNjLkxheWVyQ29sb3IoY2MuY29sb3IoNTEsIDUxLCA1MSwgMjU1KSk7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZChyb290Tm9kZSk7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkVGl0bGUoKTtcclxuICAgICAgICB0aGlzLmxvYWRDaXRpZXMoKTtcclxuICAgICAgICB0aGlzLmluaXRDb25zb2xlKCk7XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbml0Q29uc29sZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGNvbnNvbGVfYmcgPSBuZXcgY2N1aS5JbWFnZVZpZXcoKTtcclxuICAgICAgICBjb25zb2xlX2JnLmxvYWRUZXh0dXJlKHJlcy5ncmF5X3BuZyk7XHJcbiAgICAgICAgY29uc29sZV9iZy5zZXRTY2FsZTlFbmFibGVkKHRydWUpO1xyXG4gICAgICAgIGNvbnNvbGVfYmcuYXR0cih7XHJcbiAgICAgICAgICAgIHdpZHRoOiA1ODAsXHJcbiAgICAgICAgICAgIGhlaWdodDogNzAwICsgKGNjLndpblNpemUuaGVpZ2h0IC0gMTEzNiksXHJcbiAgICAgICAgICAgIHg6IGNjLndpblNpemUud2lkdGgvMixcclxuICAgICAgICAgICAgeTogY2Mud2luU2l6ZS5oZWlnaHQgLSAyMTAsXHJcbiAgICAgICAgICAgIGFuY2hvclg6IDAuNSxcclxuICAgICAgICAgICAgYW5jaG9yWTogMVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQoY29uc29sZV9iZyk7XHJcbiAgICB9LFxyXG5cclxuICAgIGFkZFRpdGxlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgdGl0bGVOb2RlID0gdGhpcy5fdGl0bGVOb2RlID0gY2NzLmNzTG9hZGVyLmNyZWF0ZU5vZGUocmVzLnRpdGxlTm9kZSk7XHJcbiAgICAgICAgdGl0bGVOb2RlLmF0dHIoe1xyXG4gICAgICAgICAgICB4OiAwLFxyXG4gICAgICAgICAgICB5OiBjYy53aW5TaXplLmhlaWdodCAtIDgwXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdmFyIHR4dF90aXRsZSA9IHRpdGxlTm9kZS5nZXRDaGlsZEJ5TmFtZSgndHh0X3RpdGxlJyk7XHJcbiAgICAgICAgdHh0X3RpdGxlLnN0cmluZyA9ICfpm4TpnLjlpKnkuIsnO1xyXG4gICAgICAgIHZhciBidG5fYmFjayA9IHRpdGxlTm9kZS5nZXRDaGlsZEJ5TmFtZSgnYnRuX2JhY2snKTtcclxuICAgICAgICBidG5fYmFjay5hZGRDbGlja0V2ZW50TGlzdGVuZXIodGhpcy5vbkJhY2tMaXN0ZW5lci5iaW5kKHRoaXMpKTtcclxuICAgICAgICB0aGlzLl9yb290Tm9kZS5hZGRDaGlsZCh0aXRsZU5vZGUsIDIpO1xyXG5cclxuICAgICAgICB2YXIgcHJvdmluY2VfYmcgPSBuZXcgY2N1aS5JbWFnZVZpZXcoKTtcclxuICAgICAgICBwcm92aW5jZV9iZy5sb2FkVGV4dHVyZShyZXMuYmx1ZV9wbmcpO1xyXG4gICAgICAgIHByb3ZpbmNlX2JnLnNldFNjYWxlOUVuYWJsZWQodHJ1ZSk7XHJcbiAgICAgICAgcHJvdmluY2VfYmcuYXR0cih7XHJcbiAgICAgICAgICAgIHdpZHRoOiAxODAsXHJcbiAgICAgICAgICAgIGhlaWdodDogMTIwLFxyXG4gICAgICAgICAgICB4OiBjYy53aW5TaXplLndpZHRoLzIsXHJcbiAgICAgICAgICAgIHk6IDQwLFxyXG4gICAgICAgICAgICBhbmNob3JYOiAwLjUsXHJcbiAgICAgICAgICAgIGFuY2hvclk6IDBcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9yb290Tm9kZS5hZGRDaGlsZChwcm92aW5jZV9iZyk7XHJcblxyXG4gICAgICAgIHZhciB0eHRfcHJvdmluY2UgPSB0aGlzLl90eHRfcHJvdmluY2UgPSBuZXcgY2MuTGFiZWxUVEYoJ+aXoOWQjeawjycsIG51bGwsIDU0KTtcclxuICAgICAgICB0eHRfcHJvdmluY2UuYXR0cih7XHJcbiAgICAgICAgICAgIHg6IHByb3ZpbmNlX2JnLndpZHRoLzIsXHJcbiAgICAgICAgICAgIHk6IHByb3ZpbmNlX2JnLmhlaWdodC8yLFxyXG4gICAgICAgICAgICBhbmNob3JYOiAwLjUsXHJcbiAgICAgICAgICAgIGFuY2hvclk6IDAuNVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHByb3ZpbmNlX2JnLmFkZENoaWxkKHR4dF9wcm92aW5jZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGxvYWRDaXRpZXM6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICB2YXIgc2Nyb2xsVmlldyA9IG5ldyBjY3VpLlNjcm9sbFZpZXcoKTtcclxuICAgICAgICBzY3JvbGxWaWV3LnNldERpcmVjdGlvbihjY3VpLlNjcm9sbFZpZXcuRElSX0hPUklaT05UQUwpO1xyXG4gICAgICAgIHNjcm9sbFZpZXcuc2V0VG91Y2hFbmFibGVkKHRydWUpO1xyXG4gICAgICAgIHNjcm9sbFZpZXcuc2V0Q29udGVudFNpemUoY2Muc2l6ZSg1ODAsIDgwKSk7XHJcbiAgICAgICAgc2Nyb2xsVmlldy5zZXRJbmVydGlhU2Nyb2xsRW5hYmxlZCh0cnVlKTtcclxuICAgICAgICBzY3JvbGxWaWV3LnggPSAzMDtcclxuICAgICAgICBzY3JvbGxWaWV3LnkgPSBjYy53aW5TaXplLmhlaWdodCAtIDE5MDtcclxuICAgICAgICB2YXIgc2Nyb2xsVmlld1JlY3QgPSBzY3JvbGxWaWV3LmdldENvbnRlbnRTaXplKCk7XHJcblxyXG4gICAgICAgIHZhciBpbWdWaWV3ID0gbmV3IGNjdWkuSW1hZ2VWaWV3KCk7XHJcbiAgICAgICAgaW1nVmlldy5sb2FkVGV4dHVyZShyZXMuZ3JheV9wbmcpO1xyXG4gICAgICAgIGltZ1ZpZXcuc2V0U2NhbGU5RW5hYmxlZCh0cnVlKTtcclxuICAgICAgICBpbWdWaWV3LmF0dHIoe3dpZHRoOiA1ODAsIGhlaWdodDogODAsIGFuY2hvclg6IDAsIGFuY2hvclk6IDB9KTtcclxuICAgICAgICBpbWdWaWV3LnggPSBzY3JvbGxWaWV3Lng7XHJcbiAgICAgICAgaW1nVmlldy55ID0gc2Nyb2xsVmlldy55O1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQoaW1nVmlldyk7XHJcblxyXG4gICAgICAgIHZhciBjaXR5LCBpLCBjaXRpZXMgPSBkYXRhIHx8IHN0YXRlRGF0YS5jaXR5czs7XHJcbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgY2l0aWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNpdHkgPSBjaXRpZXNbaV07XHJcblxyXG4gICAgICAgICAgICB2YXIgYnRuID0gbmV3IGNjdWkuQnV0dG9uKCk7XHJcbiAgICAgICAgICAgIGJ0bi5sb2FkVGV4dHVyZXMocmVzLmJsdWVfcG5nLCByZXMuYmx1ZV9hX3BuZywgcmVzLmJsdWVfZF9wbmcpO1xyXG4gICAgICAgICAgICBidG4ueCA9IChpKzEpKjIwICsgKGkqODApO1xyXG4gICAgICAgICAgICBidG4ueSA9IHNjcm9sbFZpZXdSZWN0LmhlaWdodCAvIDI7XHJcbiAgICAgICAgICAgIGJ0bi5hbmNob3JYID0gMDtcclxuICAgICAgICAgICAgYnRuLmFuY2hvclkgPSAwLjU7XHJcbiAgICAgICAgICAgIGJ0bi50aXRsZVRleHQgPSBjaXR5Lm5hbWU7XHJcbiAgICAgICAgICAgIGJ0bi50aXRsZUNvbG9yID0gY2MuY29sb3IoMjU1LCAyNTUsIDI1NSwgMjU1KTtcclxuICAgICAgICAgICAgYnRuLnRpdGxlRm9udFNpemUgPSAyNDtcclxuICAgICAgICAgICAgYnRuLnNldFNjYWxlOUVuYWJsZWQodHJ1ZSk7XHJcbiAgICAgICAgICAgIGJ0bi53aWR0aCA9IDgwO1xyXG4gICAgICAgICAgICBidG4uaGVpZ2h0ID0gNDA7XHJcblxyXG4gICAgICAgICAgICBidG4uYWRkQ2xpY2tFdmVudExpc3RlbmVyKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGNjLmxvZygnLS1idG4gY2xpY2stLScpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHNjcm9sbFZpZXcuYWRkQ2hpbGQoYnRuKTtcclxuICAgICAgICAgICAgdmFyIHNjcm9sbFdpZHRoID0gMTAwICogKGkrMSkgKyAyMDtcclxuICAgICAgICAgICAgaWYgKHNjcm9sbFdpZHRoIDwgc2Nyb2xsVmlldy53aWR0aCkge1xyXG4gICAgICAgICAgICAgICAgc2Nyb2xsV2lkdGggPSBzY3JvbGxWaWV3LndpZHRoO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNjcm9sbFZpZXcuc2V0SW5uZXJDb250YWluZXJTaXplKGNjLnNpemUoc2Nyb2xsV2lkdGgsIDgwKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmFkZENoaWxkKHNjcm9sbFZpZXcpO1xyXG5cclxuICAgICAgICB0aGlzLl90eHRfcHJvdmluY2Uuc3RyaW5nID0gc3RhdGVEYXRhLnByb3ZpbmNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbihpdGVtcykge1xyXG4gICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgdmFyIGRhdGEgPSBzdGF0ZURhdGE7XHJcbiAgICAgICAgdGhpcy5fdXBkYXRlUHJvdmluY2UoZGF0YS5wcm92aW5jZSk7XHJcblxyXG4gICAgICAgIHZhciBjaXR5cyA9IGRhdGEuY2l0eXM7XHJcbiAgICAgICAgdmFyIGNpdHksIGksXHJcbiAgICAgICAgICAgIG1lbnUgPSBuZXcgY2MuTWVudSgpO1xyXG4gICAgICAgIG1lbnUueCA9IDA7XHJcbiAgICAgICAgbWVudS55ID0gMDtcclxuICAgICAgICB2YXIgaGVpZ2h0ID0gdGhpcy5fc3ZfY2l0eV9saXN0LmhlaWdodDtcclxuXHJcbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgY2l0eXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY2l0eSA9IGNpdHlzW2ldO1xyXG4vLyAgICAgICAgICAgIG1lbnUuYWRkQ2hpbGQodGhpcy5fY3JlYXRlSXRlbShjaXR5Lm5hbWUsIGksIGhlaWdodC8yKSk7XHJcbiAgICAgICAgICAgIHZhciBidG4gPSBuZXcgY2N1aS5CdXR0b24ocmVzLmJ0bjFfanBnLCByZXMuYnRuM19wbmcsIHJlcy5idG4zX3BuZyk7XHJcbiAgICAgICAgICAgIGJ0bi54ID0gdGhpcy5fc3ZfY2l0eV9saXN0Lng7XHJcbiAgICAgICAgICAgIGJ0bi55ID0gdGhpcy5fc3ZfY2l0eV9saXN0Lnk7XHJcbiAgICAgICAgICAgIGJ0bi5hdHRyKHt4OiAwLCB5OiAwfSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQoYnRuLCA0KTtcclxuICAgICAgICB9XHJcbi8vICAgICAgICB0aGlzLl9zdl9jaXR5X2xpc3QuYWRkQ2hpbGQobWVudSk7XHJcblxyXG4gICAgICAgIHZhciBhYnRuID0gbmV3IGNjdWkuQnV0dG9uKHJlcy5ibGFja19wbmcsIHJlcy5ibGFja19wbmcsIHJlcy5ncmF5X3BuZyk7XHJcbiAgICAgICAgYWJ0bi50aXRsZVRleHQgPSAn5L2g5aW9JztcclxuICAgICAgICBhYnRuLnggPSB0aGlzLl9zdl9jaXR5X2xpc3QueDtcclxuICAgICAgICBhYnRuLnkgPSB0aGlzLl9zdl9jaXR5X2xpc3QueTtcclxuICAgICAgICBhYnRuLnRpdGxlQ29sb3IgPSBjYy5jb2xvcigwLCAwLCAwKTtcclxuICAgICAgICB0aGlzLl9zdl9jaXR5X2xpc3QuYWRkQ2hpbGQoYWJ0bik7XHJcbiAgICB9LFxyXG5cclxuICAgIF9jcmVhdGVJdGVtOiBmdW5jdGlvbihuYW1lLCBpLCB5KSB7XHJcbiAgICAgICAgdmFyIG1lbnVJdGVtID0gbmV3IGNjLk1lbnVJdGVtSW1hZ2UoXHJcbiAgICAgICAgICAgIHJlcy5idG4xX2pwZyxcclxuICAgICAgICAgICAgcmVzLmJ0bjNfcG5nLFxyXG4gICAgICAgICAgICByZXMuYnRuM19wbmcsXHJcbiAgICAgICAgICAgIHRoaXMuX29uQ2xpY2tDaXR5TGlzdGVuZXIuYmluZCh0aGlzLCBuYW1lKSxcclxuICAgICAgICAgICAgdGhpc1xyXG4gICAgICAgICk7XHJcbiAgICAgICAgbWVudUl0ZW0uYXR0cih7eDogMjAgKyBpICogKG1lbnVJdGVtLndpZHRoKzIwKSwgeTogeSwgYW5jaG9yWDogMCwgYW5jaG9yWTogMC41fSk7XHJcbiAgICAgICAgaWYgKGkgPT0gMClcclxuICAgICAgICAgICAgbWVudUl0ZW0uc2V0RW5hYmxlZChmYWxzZSk7XHJcblxyXG4gICAgICAgIHZhciBsYWJlbCA9IG5ldyBjYy5MYWJlbFRURihuYW1lKTtcclxuICAgICAgICBsYWJlbC5mb250U2l6ZSA9IDI4O1xyXG4gICAgICAgIGxhYmVsLmZvbnRDb2xvciA9IGNjLmNvbG9yKDI3LCAxNTAsIDIpO1xyXG4gICAgICAgIGxhYmVsLmF0dHIoe3g6IG1lbnVJdGVtLndpZHRoLzIsIHk6IG1lbnVJdGVtLmhlaWdodC8yLCBhbmNob3JYOiAwLjUsIGFuY2hvclk6IDAuNX0pO1xyXG4gICAgICAgIG1lbnVJdGVtLmFkZENoaWxkKGxhYmVsKTtcclxuICAgICAgICB0aGlzLl9zdl9jaXR5X2xpc3QuaW5uZXJXaWR0aCA9IChtZW51SXRlbS53aWR0aCArIDIwKSAqIChpKzEpO1xyXG4gICAgICAgIGNjLmxvZyggdGhpcy5fc3ZfY2l0eV9saXN0LmlubmVyV2lkdGgpO1xyXG4gICAgICAgIHJldHVybiBtZW51SXRlbTtcclxuICAgIH0sXHJcblxyXG4gICAgX29uQ2xpY2tDaXR5TGlzdGVuZXI6IGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgICBjYy5sb2coJ2NsaWNrIGNpdHk6ICcsIG5hbWUpO1xyXG4gICAgfSxcclxuXHJcbiAgICBfdXBkYXRlUHJvdmluY2U6IGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgICB0aGlzLl90eHRfcHJvdmluY2Uuc3RyaW5nID0gbmFtZTtcclxuICAgIH0sXHJcblxyXG4gICAgb25CYWNrTGlzdGVuZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICh0aGlzLm9uQmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLm9uQmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG52YXIgc3RhdGVEYXRhID0ge1xyXG4gICAgaWQ6IDEsXHJcbiAgICBwcm92aW5jZTogJ+WPuOW3nicsXHJcbiAgICBjaXR5czogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWQ6IDEsXHJcbiAgICAgICAgICAgIG5hbWU6ICfmsrPkuJwnLFxyXG4gICAgICAgICAgICBocDogNSxcclxuICAgICAgICAgICAgYXRrOiA1MCxcclxuICAgICAgICAgICAgZGVmZW5jZTogMTAsXHJcbiAgICAgICAgICAgIHVuZGVmZW5jZTogMTAsXHJcbiAgICAgICAgICAgIGNyaXQ6IDEwLFxyXG4gICAgICAgICAgICB1bmNyaXQ6IDEwLFxyXG4gICAgICAgICAgICBkb2RnZTogMTAsXHJcbiAgICAgICAgICAgIGhpdDogMTBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWQ6IDEsXHJcbiAgICAgICAgICAgIG5hbWU6ICflubPpmLMnLFxyXG4gICAgICAgICAgICBocDogNSxcclxuICAgICAgICAgICAgYXRrOiA1MCxcclxuICAgICAgICAgICAgZGVmZW5jZTogMTAsXHJcbiAgICAgICAgICAgIHVuZGVmZW5jZTogMTAsXHJcbiAgICAgICAgICAgIGNyaXQ6IDEwLFxyXG4gICAgICAgICAgICB1bmNyaXQ6IDEwLFxyXG4gICAgICAgICAgICBkb2RnZTogMTAsXHJcbiAgICAgICAgICAgIGhpdDogMTBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWQ6IDEsXHJcbiAgICAgICAgICAgIG5hbWU6ICfmsrPlhoUnLFxyXG4gICAgICAgICAgICBocDogNSxcclxuICAgICAgICAgICAgYXRrOiA1MCxcclxuICAgICAgICAgICAgZGVmZW5jZTogMTAsXHJcbiAgICAgICAgICAgIHVuZGVmZW5jZTogMTAsXHJcbiAgICAgICAgICAgIGNyaXQ6IDEwLFxyXG4gICAgICAgICAgICB1bmNyaXQ6IDEwLFxyXG4gICAgICAgICAgICBkb2RnZTogMTAsXHJcbiAgICAgICAgICAgIGhpdDogMTBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWQ6IDEsXHJcbiAgICAgICAgICAgIG5hbWU6ICflvJjlhpwnLFxyXG4gICAgICAgICAgICBocDogNSxcclxuICAgICAgICAgICAgYXRrOiA1MCxcclxuICAgICAgICAgICAgZGVmZW5jZTogMTAsXHJcbiAgICAgICAgICAgIHVuZGVmZW5jZTogMTAsXHJcbiAgICAgICAgICAgIGNyaXQ6IDEwLFxyXG4gICAgICAgICAgICB1bmNyaXQ6IDEwLFxyXG4gICAgICAgICAgICBkb2RnZTogMTAsXHJcbiAgICAgICAgICAgIGhpdDogMTBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWQ6IDEsXHJcbiAgICAgICAgICAgIG5hbWU6ICfmsrPljZcnLFxyXG4gICAgICAgICAgICBocDogNSxcclxuICAgICAgICAgICAgYXRrOiA1MCxcclxuICAgICAgICAgICAgZGVmZW5jZTogMTAsXHJcbiAgICAgICAgICAgIHVuZGVmZW5jZTogMTAsXHJcbiAgICAgICAgICAgIGNyaXQ6IDEwLFxyXG4gICAgICAgICAgICB1bmNyaXQ6IDEwLFxyXG4gICAgICAgICAgICBkb2RnZTogMTAsXHJcbiAgICAgICAgICAgIGhpdDogMTBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWQ6IDEsXHJcbiAgICAgICAgICAgIG5hbWU6ICflsLnnrYknLFxyXG4gICAgICAgICAgICBocDogNSxcclxuICAgICAgICAgICAgYXRrOiA1MCxcclxuICAgICAgICAgICAgZGVmZW5jZTogMTAsXHJcbiAgICAgICAgICAgIHVuZGVmZW5jZTogMTAsXHJcbiAgICAgICAgICAgIGNyaXQ6IDEwLFxyXG4gICAgICAgICAgICB1bmNyaXQ6IDEwLFxyXG4gICAgICAgICAgICBkb2RnZTogMTAsXHJcbiAgICAgICAgICAgIGhpdDogMTBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWQ6IDEsXHJcbiAgICAgICAgICAgIG5hbWU6ICflm5vpg6EnLFxyXG4gICAgICAgICAgICBocDogNSxcclxuICAgICAgICAgICAgYXRrOiA1MCxcclxuICAgICAgICAgICAgZGVmZW5jZTogMTAsXHJcbiAgICAgICAgICAgIHVuZGVmZW5jZTogMTAsXHJcbiAgICAgICAgICAgIGNyaXQ6IDEwLFxyXG4gICAgICAgICAgICB1bmNyaXQ6IDEwLFxyXG4gICAgICAgICAgICBkb2RnZTogMTAsXHJcbiAgICAgICAgICAgIGhpdDogMTBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWQ6IDEsXHJcbiAgICAgICAgICAgIG5hbWU6ICfkuIDlsLknLFxyXG4gICAgICAgICAgICBocDogNSxcclxuICAgICAgICAgICAgYXRrOiA1MCxcclxuICAgICAgICAgICAgZGVmZW5jZTogMTAsXHJcbiAgICAgICAgICAgIHVuZGVmZW5jZTogMTAsXHJcbiAgICAgICAgICAgIGNyaXQ6IDEwLFxyXG4gICAgICAgICAgICB1bmNyaXQ6IDEwLFxyXG4gICAgICAgICAgICBkb2RnZTogMTAsXHJcbiAgICAgICAgICAgIGhpdDogMTBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWQ6IDEsXHJcbiAgICAgICAgICAgIG5hbWU6ICflm5vlsLknLFxyXG4gICAgICAgICAgICBocDogNSxcclxuICAgICAgICAgICAgYXRrOiA1MCxcclxuICAgICAgICAgICAgZGVmZW5jZTogMTAsXHJcbiAgICAgICAgICAgIHVuZGVmZW5jZTogMTAsXHJcbiAgICAgICAgICAgIGNyaXQ6IDEwLFxyXG4gICAgICAgICAgICB1bmNyaXQ6IDEwLFxyXG4gICAgICAgICAgICBkb2RnZTogMTAsXHJcbiAgICAgICAgICAgIGhpdDogMTBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWQ6IDEsXHJcbiAgICAgICAgICAgIG5hbWU6ICfkuIrpn7MnLFxyXG4gICAgICAgICAgICBocDogNSxcclxuICAgICAgICAgICAgYXRrOiA1MCxcclxuICAgICAgICAgICAgZGVmZW5jZTogMTAsXHJcbiAgICAgICAgICAgIHVuZGVmZW5jZTogMTAsXHJcbiAgICAgICAgICAgIGNyaXQ6IDEwLFxyXG4gICAgICAgICAgICB1bmNyaXQ6IDEwLFxyXG4gICAgICAgICAgICBkb2RnZTogMTAsXHJcbiAgICAgICAgICAgIGhpdDogMTBcclxuICAgICAgICB9XHJcbiAgICBdXHJcblxyXG59IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgQXJ0aHVyIG9uIDIwMTQvMTIvMjAuXHJcbiAqL1xyXG52YXIgcmVzID0gcmVxdWlyZSgnLi4vLi4vcmVzb3VyY2UuanMnKS5yZXM7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGNjLkxheWVyLmV4dGVuZCh7XHJcbiAgICBfcm9vdE5vZGU6IG51bGwsXHJcblxyXG4gICAgY3RvcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5fc3VwZXIoKTtcclxuICAgICAgICB0aGlzLl9yb290Tm9kZSA9IGNjcy5jc0xvYWRlci5jcmVhdGVOb2RlKHJlcy5Ib21lTm9kZSk7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLl9yb290Tm9kZSk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKHBsYXllcikge1xyXG4gICAgICAgIHRoaXMuX3BsYXllciA9IHBsYXllcjtcclxuICAgICAgICB0aGlzLnVwZGF0ZShwbGF5ZXIpO1xyXG5cclxuICAgICAgICB2YXIgcm9vdE5vZGUgPSB0aGlzLl9yb290Tm9kZTtcclxuICAgICAgICB2YXIgYnRuX3RyYWluID0gcm9vdE5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2J0bl90cmFpbicpO1xyXG4gICAgICAgIGJ0bl90cmFpbi50aXRsZVRleHQgPSAn5ryU5q2m5Zy6JztcclxuICAgICAgICBidG5fdHJhaW4uYWRkQ2xpY2tFdmVudExpc3RlbmVyKHRoaXMuYnV0dG9uVHJhaW5MaXN0ZW5lci5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgdmFyIGJ0bl9sb3ZlID0gcm9vdE5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2J0bl9sb3ZlJyk7XHJcbiAgICAgICAgYnRuX2xvdmUudGl0bGVUZXh0ID0gJ+iZnuWnrOS5i+eIsSc7XHJcbiAgICAgICAgYnRuX2xvdmUuYWRkQ2xpY2tFdmVudExpc3RlbmVyKHRoaXMuYnV0dG9uTG92ZUxpc3RlbmVyLmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICB2YXIgYnRuX2ZpZ2h0ID0gcm9vdE5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2J0bl9maWdodCcpO1xyXG4gICAgICAgIGJ0bl9maWdodC50aXRsZVRleHQgPSAn6ZuE6Zy45aSp5LiLJztcclxuICAgICAgICBidG5fZmlnaHQuYWRkQ2xpY2tFdmVudExpc3RlbmVyKHRoaXMuYnV0dG9uRmlnaHRMaXN0ZW5lci5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgdmFyIGJ0bl9yZWNoYXJnZSA9IHJvb3ROb2RlLmdldENoaWxkQnlOYW1lKCdidG5fcmVjaGFyZ2UnKTtcclxuICAgICAgICBidG5fcmVjaGFyZ2UudGl0bGVUZXh0ID0gJ+WFheWAvCc7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZTogZnVuY3Rpb24ocGxheWVyKSB7XHJcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLl9yb290Tm9kZTtcclxuICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCd0eHRfZ29sZCcpLnNldFN0cmluZyhwbGF5ZXIuZ2V0KCdnb2xkJykpO1xyXG5cclxuICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCd0eHRfaHAnKS5zZXRTdHJpbmcocGxheWVyLmdldCgnaHAnKSk7XHJcbiAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZSgndHh0X2F0aycpLnNldFN0cmluZyhwbGF5ZXIuZ2V0KCdhdGsnKSk7XHJcbiAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZSgndHh0X2RlZmVuY2UnKS5zZXRTdHJpbmcocGxheWVyLmdldCgnZGVmZW5jZScpKTtcclxuICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCd0eHRfdW5kZWZlbmNlJykuc2V0U3RyaW5nKHBsYXllci5nZXQoJ3VuZGVmZW5jZScpKTtcclxuICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCd0eHRfY3JpdCcpLnNldFN0cmluZyhwbGF5ZXIuZ2V0KCdjcml0JykpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3R4dF91bmNyaXQnKS5zZXRTdHJpbmcocGxheWVyLmdldCgndW5jcml0JykpO1xyXG4gICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3R4dF9kb2RnZScpLnNldFN0cmluZyhwbGF5ZXIuZ2V0KCdkb2RnZScpKTtcclxuICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCd0eHRfaGl0Jykuc2V0U3RyaW5nKHBsYXllci5nZXQoJ2hpdCcpKTtcclxuICAgIH0sXHJcblxyXG4gICAgYnV0dG9uVHJhaW5MaXN0ZW5lcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMub25UcmFpbikge1xyXG4gICAgICAgICAgICB0aGlzLm9uVHJhaW4oKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGJ1dHRvbkxvdmVMaXN0ZW5lcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMub25Mb3ZlKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25Mb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBidXR0b25GaWdodExpc3RlbmVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAodGhpcy5vbkZpZ2h0KSB7XHJcbiAgICAgICAgICAgIHRoaXMub25GaWdodCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgb25UYXNrRmluaXNoZWQ6IGZ1bmN0aW9uKHBsYXllcikge1xyXG4gICAgICAgIHRoaXMuX3BsYXllciA9IHBsYXllcjtcclxuICAgICAgICB0aGlzLnVwZGF0ZShwbGF5ZXIpO1xyXG4gICAgfVxyXG59KTsiLCIvKipcclxuICogQ3JlYXRlZCBieSBBcnRodXIgb24gMjAxNS8xLzYuXHJcbiAqL1xyXG52YXIgcmVzID0gcmVxdWlyZSgnLi4vLi4vcmVzb3VyY2UuanMnKS5yZXM7XHJcbnZhciBjb25zdGFudHMgPSByZXF1aXJlKCcuLi8uLi9hcHBDb25zdGFudHMuanMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY2MuTGF5ZXIuZXh0ZW5kKHtcclxuICAgIF9jb3VudDogMTAwLFxyXG5cclxuICAgIGN0b3I6IGZ1bmN0aW9uKGdvbGQsIGZyZWVDb3VudCkge1xyXG4gICAgICAgIHRoaXMuX3N1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5fZ29sZCA9IGdvbGQ7XHJcbiAgICAgICAgdGhpcy5fZnJlZUNvdW50ID0gZnJlZUNvdW50O1xyXG5cclxuICAgICAgICB2YXIgcm9vdE5vZGUgPSB0aGlzLl9yb290Tm9kZSA9IGNjcy5jc0xvYWRlci5jcmVhdGVOb2RlKHJlcy5Mb3ZlQ29uZmlybU5vZGUpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQocm9vdE5vZGUpO1xyXG5cclxuICAgICAgICB2YXIgd3NpemUgPSBjYy53aW5TaXplO1xyXG4gICAgICAgIHJvb3ROb2RlLmF0dHIoe1xyXG4gICAgICAgICAgICB4OiB3c2l6ZS53aWR0aC8yLFxyXG4gICAgICAgICAgICB5OiB3c2l6ZS5oZWlnaHQvMixcclxuICAgICAgICAgICAgYW5jaG9yWDogMC41LFxyXG4gICAgICAgICAgICBhbmNob3JZOiAwLjUsXHJcbiAgICAgICAgICAgIHdpZHRoOiA0NTAsXHJcbiAgICAgICAgICAgIGhlaWdodDogMzUwXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdmFyIHBhbmVsID0gcm9vdE5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3BhbmVsJyk7XHJcbiAgICAgICAgdmFyIGJ0bl9hZGQgPSBwYW5lbC5nZXRDaGlsZEJ5TmFtZSgnYnRuX2FkZCcpO1xyXG4gICAgICAgIGJ0bl9hZGQuYWRkQ2xpY2tFdmVudExpc3RlbmVyKHRoaXMub25BZGRMaXN0ZW5lci5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgdmFyIGJ0bl9vayA9IHBhbmVsLmdldENoaWxkQnlOYW1lKCdidG5fb2snKTtcclxuICAgICAgICBidG5fb2suYWRkQ2xpY2tFdmVudExpc3RlbmVyKHRoaXMub25Pa0xpc3RlbmVyLmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICB2YXIgYnRuX2NhbmNlbCA9IHBhbmVsLmdldENoaWxkQnlOYW1lKCdidG5fY2FuY2VsJyk7XHJcbiAgICAgICAgYnRuX2NhbmNlbC5hZGRDbGlja0V2ZW50TGlzdGVuZXIodGhpcy5vbkNhbmNlbExpc3RlbmVyLmJpbmQodGhpcykpO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5fdHh0X2Rlc2MgPSBwYW5lbC5nZXRDaGlsZEJ5TmFtZSgndHh0X2Rlc2MnKTtcclxuICAgICAgICB0aGlzLl90eHRfZGVzY19zdHIgPSB0aGlzLl90eHRfZGVzYy5nZXRTdHJpbmcoKTtcclxuICAgICAgICB0aGlzLl90eHRfY291bnQgPSBwYW5lbC5nZXRDaGlsZEJ5TmFtZSgndHh0X2NvdW50Jyk7XHJcbiAgICAgICAgdGhpcy5fdHh0X2NvdW50X3N0ciA9IHRoaXMuX3R4dF9jb3VudC5nZXRTdHJpbmcoKTtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0KGdvbGQpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbihnb2xkKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVDb3VudCh0aGlzLl9jb3VudCwgdGhpcy5fY291bnQgLSB0aGlzLl9mcmVlQ291bnQpO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGVDb3VudDogZnVuY3Rpb24oY291bnQsIGdvbGQpIHtcclxuICAgICAgICB0aGlzLl90eHRfY291bnQuc2V0U3RyaW5nKGNjLmZvcm1hdFN0cih0aGlzLl90eHRfY291bnRfc3RyLCBjb3VudCkpO1xyXG4gICAgICAgIHRoaXMuX3R4dF9kZXNjLnNldFN0cmluZyhjYy5mb3JtYXRTdHIodGhpcy5fdHh0X2Rlc2Nfc3RyLCBjb3VudCwgZ29sZCwgdGhpcy5fZnJlZUNvdW50KSlcclxuICAgIH0sXHJcblxyXG4gICAgb25BZGRMaXN0ZW5lcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5fY291bnQgKz0gMTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUNvdW50KHRoaXMuX2NvdW50LCB0aGlzLl9jb3VudCAtIHRoaXMuX2ZyZWVDb3VudCk7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uT2tMaXN0ZW5lcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2dvbGQgPiAodGhpcy5fY291bnQgLSB0aGlzLl9mcmVlQ291bnQpKSB7XHJcbiAgICAgICAgICAgIGNjLmV2ZW50TWFuYWdlci5kaXNwYXRjaEN1c3RvbUV2ZW50KFxyXG4gICAgICAgICAgICAgICAgY29uc3RhbnRzLkNVU1RPTV9OT1RJQ0lDQVRJT04sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogY29uc3RhbnRzLkxPVkVfQUNUSU9OLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnQ6IHRoaXMuX2NvdW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnb2xkOiB0aGlzLl9jb3VudCAtIHRoaXMuX2ZyZWVDb3VudFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2MubG9nKCfpkrvnn7PkuI3otrPvvIzor7fliLDlhYXlgLznlYzpnaLlhYXlgLwnKTtcclxuICAgICAgICAgICAgY2MuZXZlbnRNYW5hZ2VyLmRpc3BhdGNoQ3VzdG9tRXZlbnQoXHJcbiAgICAgICAgICAgICAgICBjb25zdGFudHMuQ1VTVE9NX05PVElDSUNBVElPTixcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBjb25zdGFudHMuQ09ORklSTV9ESUFMT0csXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjOiAn5L2g55qE6ZK755+z5LiN6Laz5Lul5omn6KGM5q2k5qyh54yu5ZC7XFxu56Gu5a6a5Y675YWF5YC85ZCX77yfJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MuZXZlbnRNYW5hZ2VyLmRpc3BhdGNoQ3VzdG9tRXZlbnQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3RhbnRzLkNVU1RPTV9OT1RJQ0lDQVRJT04sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBjb25zdGFudHMuU0NFTkVfQUNUSU9OLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBjb25zdGFudHMuU0NFTkUuSE9NRVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uQ2FuY2VsTGlzdGVuZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlRnJvbVBhcmVudCgpO1xyXG4gICAgfVxyXG59KTsiLCIvKipcclxuICogQ3JlYXRlZCBieSBBcnRodXIgb24gMjAxNC8xMi8yOS5cclxuICovXHJcbnZhciByZXMgPSByZXF1aXJlKCcuLi8uLi9yZXNvdXJjZS5qcycpLnJlcztcclxudmFyIExvdmVJdGVtQ29udHJvbGxlciA9IHJlcXVpcmUoJy4vY29udHJvbGxlci9sb3ZlSXRlbScpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjYy5MYXllci5leHRlbmQoe1xyXG4gICAgY3RvcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5fc3VwZXIoKTtcclxuXHJcbiAgICAgICAgdmFyIHJvb3ROb2RlID0gdGhpcy5fcm9vdE5vZGUgPSBuZXcgY2MuTGF5ZXJDb2xvcihjYy5jb2xvcig1MSwgNTEsIDUxLCAyNTUpKTtcclxuICAgICAgICB0aGlzLmFkZENoaWxkKHJvb3ROb2RlKTtcclxuXHJcbiAgICAgICAgdmFyIHRpdGxlTm9kZSA9IGNjcy5jc0xvYWRlci5jcmVhdGVOb2RlKHJlcy50aXRsZU5vZGUpO1xyXG4gICAgICAgIHRpdGxlTm9kZS5hdHRyKHtcclxuICAgICAgICAgICAgeDogMCxcclxuICAgICAgICAgICAgeTogY2Mud2luU2l6ZS5oZWlnaHQgLSA4MFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHZhciB0eHRfdGl0bGUgPSB0aXRsZU5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3R4dF90aXRsZScpO1xyXG4gICAgICAgIHR4dF90aXRsZS5zdHJpbmcgPSAn6Jme5aes5LmL54ixJztcclxuICAgICAgICB2YXIgYnRuX2JhY2sgPSB0aXRsZU5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2J0bl9iYWNrJyk7XHJcbiAgICAgICAgYnRuX2JhY2suYWRkQ2xpY2tFdmVudExpc3RlbmVyKHRoaXMub25CYWNrTGlzdGVuZXIuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgcm9vdE5vZGUuYWRkQ2hpbGQodGl0bGVOb2RlKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uKHBsYXllciwgaXRlbXMpIHtcclxuICAgICAgICB2YXIgZGVzY19iZyA9IG5ldyBjYy5TcHJpdGUocmVzLmdyYXlfcG5nKTtcclxuICAgICAgICBkZXNjX2JnLmF0dHIoe1xyXG4gICAgICAgICAgICB3aWR0aDogNTgwLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IDU2LFxyXG4gICAgICAgICAgICBhbmNob3JYOiAwLFxyXG4gICAgICAgICAgICBhbmNob3JZOiAwLFxyXG4gICAgICAgICAgICB4OiAzMCxcclxuICAgICAgICAgICAgeTogY2Mud2luU2l6ZS5oZWlnaHQgLSAxODZcclxuICAgICAgICB9KTtcclxuICAgICAgICBkZXNjX2JnLnNldFNjYWxlKDU4MC80MCwgNTYvNDApO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQoZGVzY19iZyk7XHJcblxyXG4gICAgICAgIHZhciB0ZXh0X2Rlc2MgPSB0aGlzLl90eHRfZGVzYyA9IG5ldyBjY3VpLlRleHQoJycsIG51bGwsIDI4KTtcclxuICAgICAgICB0ZXh0X2Rlc2MuY29sb3IgPSBjYy5jb2xvcig1MSwgNTEsIDUxLCAyNTUpO1xyXG4gICAgICAgIHRleHRfZGVzYy5hdHRyKHtcclxuICAgICAgICAgICAgYW5jaG9yWTogMC41LFxyXG4gICAgICAgICAgICBhbmNob3JYOiAwLFxyXG4gICAgICAgICAgICB4OiA1MCxcclxuICAgICAgICAgICAgeTogY2Mud2luU2l6ZS5oZWlnaHQgLSAxNThcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmFkZENoaWxkKHRleHRfZGVzYyk7XHJcblxyXG4gICAgICAgIHZhciBwID0gY2MucChkZXNjX2JnLngsIGRlc2NfYmcueSk7XHJcbiAgICAgICAgcC55ID0gcC55IC0gMTMzO1xyXG4gICAgICAgIHZhciBvcHRpb24sIGk7XHJcbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgb3B0aW9uID0gaXRlbXNbaV07XHJcbiAgICAgICAgICAgIG9wdGlvbi5wb3NpdGlvbiA9IGNjLnAoMCwgcC55IC0gMTAwKmkpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGxvdmVJdGVtID0gY2NzLmNzTG9hZGVyLmNyZWF0ZU5vZGUocmVzLkxvdmVJdGVtKTtcclxuICAgICAgICAgICAgbG92ZUl0ZW0uYWRkQ29tcG9uZW50KExvdmVJdGVtQ29udHJvbGxlci5jcmVhdGUob3B0aW9uLCBwbGF5ZXIpKTtcclxuICAgICAgICAgICAgdGhpcy5fcm9vdE5vZGUuYWRkQ2hpbGQobG92ZUl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnVwZGF0ZUx2KHBsYXllci5nZXQoJ2xvdmVMdicpKTtcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlTHY6IGZ1bmN0aW9uKGx2KSB7XHJcbiAgICAgICAgdGhpcy5fdHh0X2Rlc2Muc2V0U3RyaW5nKCflvZPliY3omZ7lp6zkuYvniLEnICsgbHYgKyAn57qnLCDmr4/lpKnliY05MOasoeeMruWQu+WFjei0uScpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkJhY2tMaXN0ZW5lcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKGNjLmlzRnVuY3Rpb24odGhpcy5vbkJhY2spKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25CYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvdmVMaXN0ZW5lcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKGNjLmlzRnVuY3Rpb24odGhpcy5zaG93TG92ZUNvbmZpcm0pKXtcclxuICAgICAgICAgICAgdGhpcy5zaG93TG92ZUNvbmZpcm0oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxufSk7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgQXJ0aHVyIG9uIDIwMTQvMTIvMjEuXHJcbiAqL1xyXG52YXIgcmVzID0gcmVxdWlyZSgnLi4vLi4vcmVzb3VyY2UuanMnKS5yZXM7XHJcbnZhciBUcmFpbkl0ZW1Db250cm9sbGVyID0gcmVxdWlyZSgnLi9jb250cm9sbGVyL3RyYWluSXRlbScpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjYy5MYXllci5leHRlbmQoe1xyXG4gICAgY3RvcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5fc3VwZXIoKTtcclxuICAgICAgICB2YXIgdHJhaW5Ob2RlID0gdGhpcy5fdHJhaW5Ob2RlID0gbmV3IGNjLkxheWVyQ29sb3IoY2MuY29sb3IoNTEsIDUxLCA1MSwgMjU1KSk7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0cmFpbk5vZGUpO1xyXG5cclxuICAgICAgICB2YXIgdGl0bGVOb2RlID0gY2NzLmNzTG9hZGVyLmNyZWF0ZU5vZGUocmVzLnRpdGxlTm9kZSk7XHJcbiAgICAgICAgdGl0bGVOb2RlLmF0dHIoe1xyXG4gICAgICAgICAgICB4OiAwLFxyXG4gICAgICAgICAgICB5OiBjYy53aW5TaXplLmhlaWdodCAtIDgwXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdmFyIHR4dF90aXRsZSA9IHRpdGxlTm9kZS5nZXRDaGlsZEJ5TmFtZSgndHh0X3RpdGxlJyk7XHJcbiAgICAgICAgdHh0X3RpdGxlLnN0cmluZyA9ICfmvJTmrablnLonO1xyXG4gICAgICAgIHZhciBidG5fYmFjayA9IHRpdGxlTm9kZS5nZXRDaGlsZEJ5TmFtZSgnYnRuX2JhY2snKTtcclxuICAgICAgICBidG5fYmFjay5hZGRDbGlja0V2ZW50TGlzdGVuZXIodGhpcy5vbkJhY2tMaXN0ZW5lci5iaW5kKHRoaXMpKTtcclxuICAgICAgICB0cmFpbk5vZGUuYWRkQ2hpbGQodGl0bGVOb2RlKTtcclxuXHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLnVwZGF0ZVRhc2tQcm9ncmVzcywgMSwgY2MuUkVQRUFUX0ZPUkVWRVIpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGVUYXNrUHJvZ3Jlc3M6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgaW5pdDogZnVuY3Rpb24odGFza0xpc3QpIHtcclxuICAgICAgICB2YXIgc2l6ZSA9IGNjLndpblNpemU7XHJcbiAgICAgICAgdmFyIGJhc2VZID0gc2l6ZS5oZWlnaHQqOTAvMTAwO1xyXG4gICAgICAgIHZhciBpID0gMDtcclxuICAgICAgICBmb3IgKHZhciBpZCBpbiB0YXNrTGlzdCkge1xyXG4gICAgICAgICAgICB2YXIgdGFzayA9IHRhc2tMaXN0W2lkXTtcclxuICAgICAgICAgICAgdmFyIHkgPSBiYXNlWSAtIDEyMCooaSsxKTtcclxuICAgICAgICAgICAgdmFyIHRhc2tOb2RlID0gY2NzLmNzTG9hZGVyLmNyZWF0ZU5vZGUocmVzLlRhc2tOb2RlKTtcclxuICAgICAgICAgICAgdGFza05vZGUuYWRkQ29tcG9uZW50KFRyYWluSXRlbUNvbnRyb2xsZXIuY3JlYXRlKHRhc2ssIGNjLnAoMCwgeSkpKTtcclxuICAgICAgICAgICAgdGhpcy5fdHJhaW5Ob2RlLmFkZENoaWxkKHRhc2tOb2RlLCAxMCwgdGFzay5nZXQoJ2lkJykpO1xyXG4gICAgICAgICAgICBpID0gaSArIDE7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkJhY2tMaXN0ZW5lcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMub25CYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25CYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvblN0YXJ0VGFzazogZnVuY3Rpb24odGFzaykge1xyXG4gICAgICAgIGlmICh0aGlzLm9uVGFzaykge1xyXG4gICAgICAgICAgICB0aGlzLm9uVGFzayh0YXNrKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uVGFza0ZpbmlzaGVkOiBmdW5jdGlvbih0YXNrKSB7XHJcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLl90cmFpbk5vZGUuZ2V0Q2hpbGRCeVRhZyh0YXNrLmdldCgnaWQnKSk7XHJcbiAgICAgICAgdmFyIGN0cmwgPSBub2RlLmdldENvbXBvbmVudCgnVHJhaW5JdGVtQ29udHJvbGxlcicpO1xyXG4gICAgICAgIGlmIChjdHJsKSB7XHJcbiAgICAgICAgICAgIGN0cmwudGFza0ZpbmlzaGVkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTsiLCIvKipcclxuICogQ3JlYXRlZCBieSBBcnRodXIgb24gMjAxNC8xMi8yMS5cclxuICovXHJcblxyXG52YXIgcHVyZW12YyA9IHJlcXVpcmUoJ3B1cmVtdmMnKS5wdXJlbXZjO1xyXG52YXIgU2NlbmVNZWRpYXRvciA9IHJlcXVpcmUoJy4vc2NlbmVNZWRpYXRvci5qcycpO1xyXG52YXIgY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vLi4vYXBwQ29uc3RhbnRzLmpzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHB1cmVtdmMuZGVmaW5lKFxyXG4gICAgLy8gQ0xBU1MgSU5GT1xyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICd2aWV3Lm1lZGlhdG9yLkRpcmVjdG9yTWVkaWF0b3InLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5NZWRpYXRvcixcclxuICAgICAgICBjb25zdHJ1Y3RvcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHB1cmVtdmMuTWVkaWF0b3IuY2FsbCh0aGlzLCB0aGlzLmNvbnN0cnVjdG9yLk5BTUUpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvLyBJTlNUQU5DRSBNRU1CRVJTXHJcbiAgICB7XHJcbiAgICAgICAgLyoqIEBvdmVycmlkZSAqL1xyXG4gICAgICAgIGxpc3ROb3RpZmljYXRpb25JbnRlcmVzdHM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgIGNvbnN0YW50cy5OT1RJRklDQVRJT04uU0NFTkVfQ0hBTkdFRFxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKiBAb3ZlcnJpZGUgKi9cclxuICAgICAgICBoYW5kbGVOb3RpZmljYXRpb246IGZ1bmN0aW9uIChub3RpZmljYXRpb24pIHtcclxuICAgICAgICAgICAgY2MubG9nKCdoYW5kbGVyIG5vdGlmaWNhdGlvbiBvbiBkaXJlY3RvciBtZWRpYXRvcicpXHJcbiAgICAgICAgICAgIHN3aXRjaCAobm90aWZpY2F0aW9uLmdldE5hbWUoKSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBjb25zdGFudHMuTk9USUZJQ0FUSU9OLlNDRU5FX0NIQU5HRUQ6XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jYy5sb2coJ1NDRU5FX0NIQU5HRUQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjZW5lTWVkaWF0b3IgPSB0aGlzLmZhY2FkZS5yZXRyaWV2ZU1lZGlhdG9yKFNjZW5lTWVkaWF0b3IuTkFNRSApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihzY2VuZU1lZGlhdG9yICYmIHNjZW5lTWVkaWF0b3IuZ2V0Vmlld0NvbXBvbmVudCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLnJ1blNjZW5lKHNjZW5lTWVkaWF0b3IuZ2V0Vmlld0NvbXBvbmVudCgpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqIEBvdmVycmlkZSAqL1xyXG4gICAgICAgIG9uUmVnaXN0ZXI6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqIEBvdmVycmlkZSAqL1xyXG4gICAgICAgIG9uUmVtb3ZlOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6ICdEaXJlY3Rvck1lZGlhdG9yJ1xyXG4gICAgfVxyXG4pO1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBBcnRodXIgb24gMjAxNS8xLzEwLlxyXG4gKi9cclxudmFyIHB1cmVtdmMgPSByZXF1aXJlKCdwdXJlbXZjJykucHVyZW12YztcclxudmFyIGNvbnN0YW50cyA9IHJlcXVpcmUoJy4uLy4uL2FwcENvbnN0YW50cy5qcycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBwdXJlbXZjLmRlZmluZShcclxuICAgIHtcclxuICAgICAgICBuYW1lOiAnZmlnaHRlci52aWV3Lm1lZGlhdG9yLkZpZ2h0TWVkaWF0b3InLFxyXG4gICAgICAgIHBhcmVudDogcHVyZW12Yy5NZWRpYXRvclxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBpbnN0YW5jZSBtZW1iZXJzXHJcbiAgICB7XHJcbiAgICAgICAgLyoqIEBvdmVycmlkZSAqL1xyXG4gICAgICAgIGxpc3ROb3RpZmljYXRpb25JbnRlcmVzdHM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqIEBvdmVycmlkZSAqL1xyXG4gICAgICAgIGhhbmRsZU5vdGlmaWNhdGlvbjogZnVuY3Rpb24obm90ZSkge1xyXG4gICAgICAgICAgICBzd2l0Y2gobm90ZS5nZXROYW1lKCkpIHtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKiogQG92ZXJyaWRlICovXHJcbiAgICAgICAgb25SZWdpc3RlcjogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKiBAb3ZlcnJpZGUgKi9cclxuICAgICAgICBvblJlbW92ZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB2YXIgRmlnaHRMYXllciA9IHJlcXVpcmUoJy4vLi4vY29tcG9uZW50L2ZpZ2h0TGF5ZXIuanMnKTtcclxuICAgICAgICAgICAgc2VsZi52aWV3Q29tcG9uZW50ID0gbmV3IEZpZ2h0TGF5ZXIoKTtcclxuICAgICAgICAgICAgc2VsZi52aWV3Q29tcG9uZW50LmluaXQoKTtcclxuXHJcbiAgICAgICAgICAgIHNlbGYudmlld0NvbXBvbmVudC5vbkJhY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2VuZE5vdGlmaWNhdGlvbihjb25zdGFudHMuU0NFTkVfQUNUSU9OLCB7bmFtZTogY29uc3RhbnRzLlNDRU5FLkhPTUV9KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBnZXRSZXNvdXJjZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHN0YXRpYyBtZW1iZXJzXHJcbiAgICB7XHJcbiAgICAgICAgTkFNRTogJ0ZpZ2h0TWVkaWF0b3InXHJcbiAgICB9XHJcbik7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgQXJ0aHVyIG9uIDIwMTQvMTIvMjAuXHJcbiAqL1xyXG52YXIgcHVyZW12YyA9IHJlcXVpcmUoJ3B1cmVtdmMnKS5wdXJlbXZjO1xyXG52YXIgY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vLi4vYXBwQ29uc3RhbnRzLmpzJyk7XHJcbnZhciBQbGF5ZXJQcm94eSA9IHJlcXVpcmUoJy4uLy4uL21vZGVsL3Byb3h5L3BsYXllclByb3h5LmpzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdmaWdodGVyLnZpZXcubWVkaWF0b3IuSG9tZU1lZGlhdG9yJyxcclxuICAgICAgICBwYXJlbnQ6IHB1cmVtdmMuTWVkaWF0b3JcclxuICAgIH0sXHJcblxyXG4gICAgLy8gaW5zdGFuY2UgbWVtYmVyc1xyXG4gICAge1xyXG4gICAgICAgIC8qKiBAb3ZlcnJpZGUgKi9cclxuICAgICAgICBsaXN0Tm90aWZpY2F0aW9uSW50ZXJlc3RzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtjb25zdGFudHMuUExBWUVSX0FDVElPTl07XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqIEBvdmVycmlkZSAqL1xyXG4gICAgICAgIGhhbmRsZU5vdGlmaWNhdGlvbjogZnVuY3Rpb24obm90ZSkge1xyXG4gICAgICAgICAgICBzd2l0Y2gobm90ZS5nZXROYW1lKCkpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgY29uc3RhbnRzLlBMQVlFUl9BQ1RJT046XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3Q29tcG9uZW50LnVwZGF0ZSh0aGlzLmdldFBsYXllcigpKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKiBAb3ZlcnJpZGUgKi9cclxuICAgICAgICBvblJlZ2lzdGVyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqIEBvdmVycmlkZSAqL1xyXG4gICAgICAgIG9uUmVtb3ZlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgSG9tZUxheWVyID0gcmVxdWlyZSgnLi8uLi9jb21wb25lbnQvaG9tZUxheWVyLmpzJyk7XHJcbiAgICAgICAgICAgIHNlbGYudmlld0NvbXBvbmVudCA9IG5ldyBIb21lTGF5ZXIoKTtcclxuICAgICAgICAgICAgc2VsZi52aWV3Q29tcG9uZW50LmluaXQodGhpcy5nZXRQbGF5ZXIoKSk7XHJcblxyXG4gICAgICAgICAgICBzZWxmLnZpZXdDb21wb25lbnQub25UcmFpbiA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNlbmROb3RpZmljYXRpb24oY29uc3RhbnRzLlNDRU5FX0FDVElPTiwge25hbWU6IGNvbnN0YW50cy5TQ0VORS5UUkFJTn0pO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgc2VsZi52aWV3Q29tcG9uZW50Lm9uTG92ZSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNlbmROb3RpZmljYXRpb24oY29uc3RhbnRzLlNDRU5FX0FDVElPTiwge25hbWU6IGNvbnN0YW50cy5TQ0VORS5MT1ZFfSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBzZWxmLnZpZXdDb21wb25lbnQub25GaWdodCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNlbmROb3RpZmljYXRpb24oY29uc3RhbnRzLlNDRU5FX0FDVElPTiwge25hbWU6IGNvbnN0YW50cy5TQ0VORS5GSUdIVH0pO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGdldFBsYXllcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXJQcm94eSA9IHRoaXMuZmFjYWRlLnJldHJpZXZlUHJveHkoUGxheWVyUHJveHkuTkFNRSk7XHJcbiAgICAgICAgICAgIHJldHVybiBwbGF5ZXJQcm94eS5nZXRQbGF5ZXIoKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBnZXRSZXNvdXJjZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLy8gc3RhdGljIG1lbWJlcnNcclxuICAgIHtcclxuICAgICAgICBOQU1FOiAnSG9tZU1lZGlhdG9yJ1xyXG4gICAgfVxyXG4pIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgQXJ0aHVyIG9uIDIwMTQvMTIvMjkuXHJcbiAqL1xyXG52YXIgcHVyZW12YyA9IHJlcXVpcmUoJ3B1cmVtdmMnKS5wdXJlbXZjO1xyXG52YXIgY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vLi4vYXBwQ29uc3RhbnRzLmpzJyk7XHJcbnZhciBQbGF5ZXJQcm94eSA9IHJlcXVpcmUoJy4uLy4uL21vZGVsL3Byb3h5L3BsYXllclByb3h5LmpzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHB1cmVtdmMuZGVmaW5lKFxyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdmaWdodGVyLnZpZXcubWVkaWF0b3IuTG92ZU1lZGlhdG9yJyxcclxuICAgICAgICBwYXJlbnQ6IHB1cmVtdmMuTWVkaWF0b3JcclxuICAgIH0sXHJcblxyXG4gICAgLy8gaW5zdGFuY2UgbWVtYmVyc1xyXG4gICAge1xyXG4gICAgICAgIC8qKiBAb3ZlcnJpZGUgKi9cclxuICAgICAgICBsaXN0Tm90aWZpY2F0aW9uSW50ZXJlc3RzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtjb25zdGFudHMuTE9WRV9BQ1RJT05dO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKiBAb3ZlcnJpZGUgKi9cclxuICAgICAgICBoYW5kbGVOb3RpZmljYXRpb246IGZ1bmN0aW9uKG5vdGUpIHtcclxuICAgICAgICAgICAgc3dpdGNoIChub3RlLmdldE5hbWUoKSl7XHJcbiAgICAgICAgICAgICAgICBjYXNlIGNvbnN0YW50cy5MT1ZFX0FDVElPTjpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvdmVTdWNjZXNzKG5vdGUuZ2V0Qm9keSgpKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKiBAb3ZlcnJpZGUgKi9cclxuICAgICAgICBvblJlZ2lzdGVyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqIEBvdmVycmlkZSAqL1xyXG4gICAgICAgIG9uUmVtb3ZlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIExvdmVMYXllciA9IHJlcXVpcmUoJy4vLi4vY29tcG9uZW50L2xvdmVMYXllci5qcycpO1xyXG4gICAgICAgICAgICBzZWxmLnZpZXdDb21wb25lbnQgPSBuZXcgTG92ZUxheWVyKCk7XHJcblxyXG4gICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICBUT0RPOiBnZXQgbG92ZSBpbmZvXHJcbiAgICAgICAgICAgICAqL1xyXG5cclxuICAgICAgICAgICAgdmFyIHBsYXllclByb3h5ID0gdGhpcy5mYWNhZGUucmV0cmlldmVQcm94eShQbGF5ZXJQcm94eS5OQU1FKTtcclxuICAgICAgICAgICAgdmFyIHBsYXllciA9IHBsYXllclByb3h5LmdldFBsYXllcigpO1xyXG5cclxuICAgICAgICAgICAgc2VsZi52aWV3Q29tcG9uZW50LmluaXQocGxheWVyLCB0aGlzLmdldExvdmVJdGVtcygpKTtcclxuXHJcbiAgICAgICAgICAgIHNlbGYudmlld0NvbXBvbmVudC5vbkJhY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2VuZE5vdGlmaWNhdGlvbihjb25zdGFudHMuU0NFTkVfQUNUSU9OLCB7bmFtZTogY29uc3RhbnRzLlNDRU5FLkhPTUV9KTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHNlbGYudmlld0NvbXBvbmVudC5zaG93TG92ZUNvbmZpcm0gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciBwbGF5ZXJQcm94eSA9IHNlbGYuZmFjYWRlLnJldHJpZXZlUHJveHkoUGxheWVyUHJveHkuTkFNRSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGxheWVyID0gcGxheWVyUHJveHkuZ2V0UGxheWVyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIExvdmVDb25maXJtTGF5ZXIgPSByZXF1aXJlKCcuLy4uL2NvbXBvbmVudC9sb3ZlQ29uZmlybUxheWVyLmpzJyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGF5ZXIgPSBuZXcgTG92ZUNvbmZpcm1MYXllcihwbGF5ZXIuZ2V0KCdnb2xkJyksIHBsYXllci5nZXQoJ2RhaWx5Q291bnQnKS5mcmVlTG92ZSk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNlbmROb3RpZmljYXRpb24oY29uc3RhbnRzLlNDRU5FX0FDVElPTl9BRERfQ0hJTEQsIGxheWVyKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHNlbGYudmlld0NvbXBvbmVudC5leGVjdXRlTG92ZSA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBsb3ZlU3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICBjYy5sb2coJ2Rhc2RmYXNkZnNhZmQtLS0tLS0tLScsIGRhdGEpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGdldFJlc291cmNlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ2V0TG92ZUl0ZW1zOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsdjogMSxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMSxcclxuICAgICAgICAgICAgICAgICAgICBjb3VudDogMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgY291bnROZWVkOiA5OVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsdjogMixcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMSxcclxuICAgICAgICAgICAgICAgICAgICBjb3VudDogMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgY291bnROZWVkOiA5OVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsdjogMyxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMSxcclxuICAgICAgICAgICAgICAgICAgICBjb3VudDogMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgY291bnROZWVkOiA5OVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsdjogNCxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMSxcclxuICAgICAgICAgICAgICAgICAgICBjb3VudDogMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgY291bnROZWVkOiA5OVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsdjogNSxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMSxcclxuICAgICAgICAgICAgICAgICAgICBjb3VudDogMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgY291bnROZWVkOiA5OVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsdjogNixcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMSxcclxuICAgICAgICAgICAgICAgICAgICBjb3VudDogMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgY291bnROZWVkOiA5OVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsdjogNyxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMSxcclxuICAgICAgICAgICAgICAgICAgICBjb3VudDogMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgY291bnROZWVkOiA5OVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsdjogOCxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMSxcclxuICAgICAgICAgICAgICAgICAgICBjb3VudDogMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgY291bnROZWVkOiA5OVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsdjogOSxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogMSxcclxuICAgICAgICAgICAgICAgICAgICBjb3VudDogMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgY291bnROZWVkOiA5OVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy8gc3RhdGljIG1lbWJlcnNcclxuICAgIHtcclxuICAgICAgICBOQU1FOiAnTG92ZU1lZGlhdG9yJ1xyXG4gICAgfVxyXG4pOyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEFydGh1ciBvbiAyMDE0LzEyLzIxLlxyXG4gKi9cclxuXHJcbnZhciBwdXJlbXZjID0gcmVxdWlyZSgncHVyZW12YycpLnB1cmVtdmM7XHJcbnZhciBjb25zdGFudHMgPSByZXF1aXJlKCcuLi8uLi9hcHBDb25zdGFudHMuanMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcHVyZW12Yy5kZWZpbmVcclxuKFxyXG4gICAgLy8gQ0xBU1MgSU5GT1xyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdmaWdodGVyLnZpZXcubWVkaWF0b3IuU2NlbmVNZWRpYXRvcicsXHJcbiAgICAgICAgcGFyZW50OiBwdXJlbXZjLk1lZGlhdG9yXHJcbiAgICB9LFxyXG4gICAgLy8gSU5TVEFOQ0UgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIF9pbml0aWFsaXplZDogZmFsc2UsXHJcblxyXG4gICAgICAgIGxvYWRlckltYWdlOiBcImRhdGE6aW1hZ2UvanBlZztiYXNlNjQsLzlqLzRRQVlSWGhwWmdBQVNVa3FBQWdBQUFBQUFBQUFBQUFBQVAvc0FCRkVkV05yZVFBQkFBUUFBQUFsQUFELzRRTXBhSFIwY0RvdkwyNXpMbUZrYjJKbExtTnZiUzk0WVhBdk1TNHdMd0E4UDNod1lXTnJaWFFnWW1WbmFXNDlJdSs3dnlJZ2FXUTlJbGMxVFRCTmNFTmxhR2xJZW5KbFUzcE9WR042YTJNNVpDSS9QaUE4ZURwNGJYQnRaWFJoSUhodGJHNXpPbmc5SW1Ga2IySmxPbTV6T20xbGRHRXZJaUI0T25odGNIUnJQU0pCWkc5aVpTQllUVkFnUTI5eVpTQTFMakF0WXpBMk1DQTJNUzR4TXpRM056Y3NJREl3TVRBdk1ESXZNVEl0TVRjNk16STZNREFnSUNBZ0lDQWdJQ0krSUR4eVpHWTZVa1JHSUhodGJHNXpPbkprWmowaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1UazVPUzh3TWk4eU1pMXlaR1l0YzNsdWRHRjRMVzV6SXlJK0lEeHlaR1k2UkdWelkzSnBjSFJwYjI0Z2NtUm1PbUZpYjNWMFBTSWlJSGh0Ykc1ek9uaHRjRTFOUFNKb2RIUndPaTh2Ym5NdVlXUnZZbVV1WTI5dEwzaGhjQzh4TGpBdmJXMHZJaUI0Yld4dWN6cHpkRkpsWmowaWFIUjBjRG92TDI1ekxtRmtiMkpsTG1OdmJTOTRZWEF2TVM0d0wzTlVlWEJsTDFKbGMyOTFjbU5sVW1WbUl5SWdlRzFzYm5NNmVHMXdQU0pvZEhSd09pOHZibk11WVdSdlltVXVZMjl0TDNoaGNDOHhMakF2SWlCNGJYQk5UVHBFYjJOMWJXVnVkRWxFUFNKNGJYQXVaR2xrT2pNNE1EQkVNRFkyUVRVMU1qRXhSVEZCUVRBelFqRXpNVU5GTnpNeFJrUXdJaUI0YlhCTlRUcEpibk4wWVc1alpVbEVQU0o0YlhBdWFXbGtPak00TURCRU1EWTFRVFUxTWpFeFJURkJRVEF6UWpFek1VTkZOek14UmtRd0lpQjRiWEE2UTNKbFlYUnZjbFJ2YjJ3OUlrRmtiMkpsSUZCb2IzUnZjMmh2Y0NCRFV6VWdWMmx1Wkc5M2N5SStJRHg0YlhCTlRUcEVaWEpwZG1Wa1JuSnZiU0J6ZEZKbFpqcHBibk4wWVc1alpVbEVQU0o0YlhBdWFXbGtPa1UyUlRrME9FTTRPRVJDTkRFeFJURTVORVV5UmtFM00wTTNRa0UxTlRsRUlpQnpkRkpsWmpwa2IyTjFiV1Z1ZEVsRVBTSjRiWEF1Wkdsa09rVTJSVGswT0VNNU9FUkNOREV4UlRFNU5FVXlSa0UzTTBNM1FrRTFOVGxFSWk4K0lEd3ZjbVJtT2tSbGMyTnlhWEIwYVc5dVBpQThMM0prWmpwU1JFWStJRHd2ZURwNGJYQnRaWFJoUGlBOFAzaHdZV05yWlhRZ1pXNWtQU0p5SWo4Ky8rNEFEa0ZrYjJKbEFHVEFBQUFBQWYvYkFJUUFEUWtKQ1FvSkRRb0tEUk1NQ3d3VEZoRU5EUkVXR2hVVkZoVVZHaGtVRmhVVkZoUVpHUjBmSUI4ZEdTY25LaW9uSnprNE9EZzVRRUJBUUVCQVFFQkFRQUVPREF3T0VBNFJEdzhSRkE0UkRoUVZFUklTRVJVZkZSVVhGUlVmS0IwWkdSa1pIU2dqSmlBZ0lDWWpMQ3dvS0N3c056YzFOemRBUUVCQVFFQkFRRUJBLzhBQUVRZ0F5QUNnQXdFaUFBSVJBUU1SQWYvRUFMQUFBQUVGQVFFQUFBQUFBQUFBQUFBQUFBUUFBZ01GQmdjQkFRRUFBd0VCQUFBQUFBQUFBQUFBQUFBQUFRTUVBZ1VRQUFJQkFnSUVCd29MQmdRR0F3QUFBQUVDQXdBRUVRVWhNUklHUVZGeHNUSVRGR0dCd2RFaVFsS1NNeldSb2VGaWNxS3lJMU56RllKakpEUVdCOUtqVkNieHdrTmtKV1hpazNRUkFBSUJBZ01GQlFjREJRRUFBQUFBQUFBQkFoRURJUklFTVVGUmNUSmh3VklVQlpHaHNTSnlFek9CMFVMaFlwSWpVeFgvMmdBTUF3RUFBaEVERVFBL0FNSlNwVXFBVktsWHVGQWVVcTl3cFVCNVh1RmU0VjZvb0R6WkhEb3gwQ25HTWluendsN1o4TmFqYUhlb08zdm1UQlpCdHA5WVVJcVRFVjVST3hIS25XUm5hVThWUk1oRkJVanBWN2hTb1NlVXE5cFVCNVNyMmxoUUhsS3ZjSzhvQlY3aFNGU1JydGFLQVpzMDdZTlBNMXBHMnhKSUF3MWpTZWFuZHJ5LzhYNG04VkNLa1d3YVd3YW03WGwvNHYxVzhWTHRtWC9pL1ZieFVvS2tXd2FrU000MDd0bVgvaS9WYnhVbXpHd2pRc2pkWTQxSUFSaWUvVTBJYlpPMGtOdENYbk9Da0VCZUZ1NEtJM0JzN0ROYjI3eWErakR4M2tKZUVucEpKRWNRVmJXRHNrMTd1NXVyZDU5MXVjWmtXaHltMlZuZDlSa0NERXBGeERScGJ3MGJ1bnU1bWxwMkRlMkZNTFlYT0Qyd0IyeGJPZXJhVWNZR0o3Mm1sU1VpcXp6ZHpNZDNaM21peGx0QTJ5emNLL05sSE0xRFF5UlhjZTFIb2NkTk9FZkpYWjg4eTlab2pPcWhpQnN6SVJpSFE4WTRjSzVUdkh1ekxsakhOTXF4Tm9EakxGcmFISG5qUHhjTkNHVmJ4RVV6WU5UeDVqWlN4aHBXNnFUemx3SitEQ3ZPMlpmK0w5VnZGU2dxeUhZTkxZTlRkc3NQeGZpYnhVdTE1ZjhBaS9WUGlxQ2FrT3dhODJEVS9hOHYvRitKdkZURGRXUEJMOFI4VktDdllSWVY1VXpvTUF5NlFkSUlxSTBCNEtKdHhpUlF3b3UxNlFvR1VrbnRINVR6MFJiWmJtRjJoa3RyYVNWQm8ybFVrWTh0RHllMGZsUFBYVHNsVlV5aXlWUnNqcVVPQTR5TVQ4ZFcycmFtMm02VVZUTnE5UzdFSXlVVkp5ZE1Ubi82RG5QK2ltOVdsK2c1ei9vcHZWcnB0ZUVoUVdZNEFhU1R3QVZmNVdQaVpoLzlTNS96ajd6bHR6bG1ZV2tmV1hOdkpER1RnR2NZREhpclI3aTdtU2J3WFBhcnNGTXJnYjd3NmpLdy93Q21uYzlJMTRrRjN2cHZDbGpiTXlXTU9KTDRhRWlCOHFVL09iVUs3SFlXVnJsMXBGWldpQ09DQlFxS09MalBHVHJOWlpxS2JVWFZIcTJuTndUdUpSazFWcGJnWE44czdSazV5bTBVUVF6aElHMk5Bamh4SFdiSStnQ0JWakJCRmJ3eHdRcUVpaVVKR2cxQlZHQUZlN2RWMjhXWUxZWkZtRjJUaDFVRDdKR2p5bUd5bjFpSzVPeXpJQkdCMUhnckxaaGFtenVtUUFHSndTcW5TQ2gxcTNHT0NvZHh0NGN4dXJkY3B6dU40Y3loaVdhRjVCZzA5dWRVbW5XdzFIL2pWOW5GdUo3UXVvKzhoOHBlVGhGQSswNDd2ZHV5TXRrN2ZZcVRsMDdZRmRmVXVmTVB6VDVwNzFVZHRsbVlYYUdTMnQzbVFIQXNneEFOZGFkWUpvcExlNFFTMjg2N0VzWjRRZkNOWXJDRmJqZERQbWdrWXlXRnhnVmYwNGlmSmY2U2NOZFJVVzFYQmI2RlU1VGpGNUVwU1NyR3UvczVsTitnNXovb3B2VnBmb09jL3dDaW05V3RkSG5hdHZPYkpYRFc3eExHaEI4bnJQYVk5L0hDcit0RWRQQ1ZhU2VEb1lMbnFGNjNselc0L1BGU1czZWN4Ykk4NFZTeldVd1VhU2RnMERYWEs1bnZBaXBuZDZxZ0t2V25RTzdwcmk5WlVFbW0zVmwyajFrcjhwUmxGUnlxdUJOWmpHeFEvUzU2WTFTMmZ1OU9WdWVvbjExU3phaG9vdTA2UW9RVVhhZElWQ0QyRkpKN1IrVTg5ZE15ZHY4QXhkbitUSDltdVp5ZTBmbFBQWFFzdGxLNVRia2ExZ1VqbEMxcTB2VkxrZWI2citPM1R4OXhjWTFudDhjME5yWkN5aU9FMTEwOE5Zakd2MWpvbzdKczFqekt5U2NZTEl2a3pMNkxEd0hYVkprc0g5U2I0OWRLTnEwdGoxakE2dXJpT0NMKzAyRldYN2lWdFpYMS9BemFIVHllb2F1S24yTVg5Vzc5emViaVpDdVI1TWpTcmhmWHVFdHdUclVlWkgreU5mZHJSTmN4STZJemhYbEpFYWs2V0lHSjJSdzRDaFduQ2huZHRsVkJMTWRRQTBrMWdiWE5NenpEZkRMczZtamFQS3BwSmJXd0oxYk93d3h3NDNPbkhoNzFZVDNEcGZXVUptRmxiNWpISERkZVhCSElzclJlYTVUU3F2eHFHMDRjTk42MnZldG9DUzR0cmU1bWdua0dFOXErM0RLT2t1STJXWDZMRFFSUkhXRGgxVUN0d2o3UVJnMndkbDhEamd3MXFlN1h2VzBCUTNrZlo3bVNMZ1UrVDlFNlJWYm51VnJuV1ZTV3FqK0x0OFpiUnVIRWRLUGtZVmNaMk1KWTVmU0d5ZVZhcjQ1K3JrV1FIQXFjY2FsUEU1a20xaHRXSzVuSzRXbnQ1RnVVQlV3T01HNG5Ha0EvQlhVclc0UzZ0b3JsT2pNZ2NkL3hWbjdyTG83ektzMHVFakNOZVN2ZHdvQmhnc1p4WDFsMmozNmszTHUrdXlwcmRqNVZzNUEraS9sRDQ4YTBhYVZKT1BpN2pCNmxieldvenBqQjQ4cGYxTkRYTk40dmZsNytaNEJYUzY1cHZGNzh2ZnpQQUs3MVhUSG1aL1MveVQranZKN0wzZkh5dHoxRSt1cGJMK1FqNVc1NmpmWFdSbnNJWUtMdGVrS0VGR1d2U0ZRZ3lqazlvL0tlZXQzWXRobE1QLzV4OW1zSko3UitVODliaXliL0FNWEV2N2dENnRhZEwxVCtrd2VwUnJDMzlaa0xETWJpd012VUhSUEcwYmpsR2c4b3JlLzIzc3hCbGR4Zk1QTHVwTmhUOHlML0FPUk5aYmR6SjQ4NHNjeXR4Z0xxSlk1TFpqNlEyc1Y1RzFWdWQxbWpqeUcwaWowTkVHU1pUb0t5aGp0cXc0d2F6dHVpWEEzcUtUYlN4bHRmR2hiWmxFOTVadFpxeFZiZ2lPWmhyRVI5cGgzU3ZrOStwSklMWjRZNERHQkZDVU1LalJzR1BvYlBGaFVmVzBOSm1sakUyeEpjSXJjSTJ2RlVFbG4xbFJYZDZscmF6WFQ5R0NOcEQreU5xb0k3bU9WZHVOdzZuemxPSW9QT1VhNnl5ZTFYWGNiTVI1R2RRM3hZMEJTYmozMS9GY1RRWmlySitxNDMxcTdhbmJIQ1RaNzJCdzdsYlByS0JNY0JXTk5nYk1CQmgrYnNqQmRuaTBWSjFsQVJaczZ5V2l1cHhDdU1EeTZLcFMySXdPbzZEVHIzTXJlM2U1dFpaVlVNNFpCanFPT0pvV080amtYYWpjT09NSEdnRElTdldJcmRBa0tSODArVHpWbDkwOGJQUEwzTHp4T3VIZGlmeFZmaVRBZzkycUkvdysvOGdHZ1N5Ti9tUjdYUFZscDBsRi8zTDNtYlZLdHU1SGpiay84QUhFMkZjMDNpOStYdjVuZ0ZkS05jMTNpOStYdjVuZ0ZhTlYweDVubitsL2tuOUhlRVdYdStQbGJucUo5ZFMyWHU5T1Z1ZW9uMTFrWjdDR0NqTFhwQ2d4UmxyMGhVSVBZVWNudEg1VHoxczh2YitCdDEvZHFQaXJHU2UwZmxQUFd1c0cvZzRQeTE1cTA2WHFseU1XdlZZUStydUk5eEpPcXpPOWhPdG8vc1A4dGJHT0ZJcm1XZU03SXVNRE1uQVhYUUpPVWpRZU9zSmswblk5NmlwMENZdW5yamFIeDF0K3NyUEpVYlhCbTJMckZQaWt3VE9iK1QrVmhiWnhHTXJEWHA4M3gxUVN5MnR1Y0pwVWpQRVRwK0NuNS9mdGFSdkt2dHAzS3g0OEhHM2VySE16T3haaVdadExNZEpOUVNiYkw3MVZrNnl5blZpT2txbkVFZk9XdFBiWGkzRVFrR2c2bVhpTmNramVTSnhKR3hSMTBxdzBHdHh1eG12YkltRDRDWk1GbEE0ZlJmdjBCcWVzcXF6VE1aTk1FRGJJSHRISDJRZUNpWkpTcU1RZE9HaXVlNTNtejNjelF3c1JiSWNOSG5rZWMzYzRxQU11cml6NjhnVElUb3h3T09ubHAwTWp4TUpZVzc0MUdzM1JWbGR0YnlnRS9kTWNIWC9tb0RheFRpV05aQjUzQjNhcmI4L3dDKzRTT0Y0c2YvQUt4VTlrY0JzZk9HSGZvVUh0Ry9SYnpZNURpZTVISGhYZHZhdnFpWjlROEpkbHE0L2diS3VhN3hlL0wzOHp3Q3VocGYyVWsvWm81MGttd0pLSWRvZ0RqdzFWenplTDM1ZS9tZUFWcDFMVGdxWTRubittUmF1enFtcXdyanpDTEwzZkh5dHoxRSt1cExMK1FqNVc1NmpmWFdSbnJvWUtMdGVrS0VGRjJ2U0ZRZzloU1NlMGZsUFBXb3NtL2hJZm9MelZsNVBhUHlubnJSV2IvdzBYMEY1cTA2WHFseU0yc1ZZeDVnbWJGcmUvdDcxTlkyVCswaDhWYlNPNVNXTkpVT0tTQU1wN2pER3NwbU1QYUxSbFhTNmVXdmUxL0ZSTzdXWWRiWm0xWS9lVy9SN3FIeEhSWEdvamxtM3VsaWQ2YVZiYVcrT0FMdmdDTHEySG05V3hIS1dxamhqNnhzSzFlOGRtMTVsNG5pRzFMWmtzd0dzeHRyUGVPbXN2YXlCSkExVkl0bFdqcHRMdVRkUE1vN0x0alJEcTluYUs0K1dGOUlyVVc3QmFIT2xqR3FWSEI3dzJoelZvWnQ4N2Q4dmFOWVNMbDAyQ2NSc0RFYkpiajcxVXU3VUJrdko3L0Q3cTJRb0R4eVNhQU84TVRYZHhSVk1wUnA1WFpPV2RGL21zN1I1WGR5S2ZLV0pzTy81UGhyRzVYbE54bUV5d1c2YlRuVHhBQWNKTmJHU01Ya00xcGpnYmlObzFQemlQSitPczd1N20vNlJlTTAwWk9neFNwcVlZSFQzd1JYTUtONGxsOXpVRzRiUWZOc2h1OHNaVnVFQTJoaXJBNHFlL1ZPd3dyVmJ6Ynd3NW1JNDRVS1JSWWtiV0cwUzNKV2N0YmQ3dTVXRmZPT0xIaVVkSnFtYWlwZkxzSXNPYmhXZTAwMWxNa01WdkpOamhnaElBTE1jQnhDczdmeFhRbWt1cHgxYlhEc3dHUGxhVGlkVmFFeUtOWGtvbzRlQlYrU3E3TDdWczl6Y0JnZXlRNEdRL01CMWNybW9pbTJvcmV6cWNvd1R1U2VFWTQ4alE3b1pYMlBMemR5TGhOZDZSanJFWTZJNyt1c3B2SDc4dmZ6UEFLNlVBQUFGR0FHZ0FjQXJtdThYdnk5L004QXJUZmlvMjRSVzVubmFHNjd1b3UzSC9LUHVxVDJYOGhIeXR6MUcrdXBMTDNlbkszUFViNjZ5czlSREJSZHIwaFFnb3UwNlFxRUdVa250SDVUejFlMjM4dkY5QmVhcUtUMmo4cDU2dmJiK1hpK2d2TldqVGRVdVJuMVhUSG1UaDhLckpUSmx0OHQxQ1BJWTQ0Y0ducEpWalRKWWttamFOOUliNHU3VjkyM25qVGV0aFJhdVpKVjNQYVcxcmZMSWlYRURZZzZSNFZZYzlDWFc3dGhmT1piS2RiR1p0TFc4dVBWWS91M0dya05Va005emxjeFVqYmhmV09BOTBjUnE0Z3Y0TGhkcU4rVlRvTllXbW5SbTlOTlZXTlR5SGM2VldCdjh3dDRZZUhxbTZ4eVBtcm9xMVo3V0dGTFN4VHE3V0xTdVBTZGpya2Z1bXE1eUhYRFVlQTkyb08yU0twVnVtTkFhb0pMTVhIM215cDBycEo0dUtoYzN0YkRNNUJNcmkxekFqNzlqN0tUaVk4VGNkQnBjc2l0aDAyODZvK3NQQ2FnRVg5UHpnNHpYVUNwNlFZc2U4b291Q0czdGs2bTFCWXYwNVc2VCtJZHlvbHhiSERBQWEyT2dEbE5DejNyeU4yV3hCZDVQSk1nMXQ4MWVJZDJ1a3FuTGxUQmJmY3VZKzl1SkxpUmN2dFB2SGRzSEsrY2ZSSGNIRFdzeWF3anl5MFdCY0RJM2xUUDZUZUljRlYrUzVPbVh4OWJKZzEwNDhvOENqMFY4SnEyRFZ1MDluTDgwdXA3T3hIaStvYWwzUDhBWEIvSXNaUzhUL1lPVjY1enZDY2M3dmZ6UEFLM2l2V0N6NDQ1emVIOTU0QlhPcjZJOHlmU2Z5eitqdkNMUDNmSHl0ejFHK3VwTFAzZkh5dHoxRSt1c2JQYVEwVVhhZElVSUtMdGVrS2hCN0NrazlvL0tlZXIyMi9sNC9vTHpWUlNlMGZsUFBWN2IveThYMEY1cTBhYnFseU0rcTZZOHlRc0JURE1vcjFvOGFpYUUxcGJsdU1xUzNzYkxMSEloU1JReW5ncXVraGFKOXVCam8rSDVhT2EzYW8ydDM0cW91UmxMYWpUYWxHUDh2MElZOHlsWFErUEtQRlUvYllYT0xQZ2U2Q0tpYTBMYXhUT3hIdTFRN2N1QmQ5eVBFSjdUYmpYS084Q2FqYk1JRjZDTkllTnZKSGpxSVdKN3RTcFlrYWxxVmJsd0lkeUcrUkdYdXIwaFhZSkZ4YWwrRGhxNXkzc2xrdjNZMnBEMHBUcitRVUNscEpSVWRvOVhXNE9MclRIdE0xNmNaTExXa2VDN3k0anZsTkVwY1J0dzFVeDI3Q2k0NDhOWnJURnkzbm4zSVFXeGxnR3JEWjNwemE3L004QXJabytBckY1MTcxdXZwK0NxZFYwUjVsL3BzVXJzMnZCM2hkbDd2VGxibnFKOWRTMlh1K1BsYm5xSjlkWTJlc2hvb3ExNlFvUVVYYTlJVkNEMkZMSjdSdVU4OVdOdG1VU1Fxa2dZTWd3MGFjY0tycFBhUHlubnJaV0c0VmkrVldtWTV0bk1XWEcrWHJJWW5BMHJoajBtZGNUZ2ROZHduS0Rxam1kdU0xU1JSL3FscjgvNEtYNnBhOFQvQlZ6RHVMWlh1ZFJaYmxtYnhYY1BVTlBjM0txQ0l3cmJPemdySEVuSGpveUQrM2VTWGtodDdEZUtHNHVtREdPSlZVa2xmb3VUaFhmbWJuWjdDdnkxdnQ5cG12MVcxK2Q4Rkw5VnRlSnZncTV5cmNPR2ZMbXpITjgwaXl5RVRQYnB0QUVGbzJaRzhwbVVhMU9GTm4zS3k2Vy9zYkRLTTVodjVieDJXVFpBKzdSRjJ5NTJXT1BKVHpFK3oyRHkxdnQ5cFQvQUtwYWNUZXJTL1U3VGliMWEwNC90N2tEWFBZMDNqaE4wVzZzUTdLN1czcTJkbnJNY2NhRHkvOEF0ODBrdVpmcVdZeFdOdGxjdlVQUGhpR1loV0RlVXk3SXdZVTh4UHM5Zzh0YjdmYVVuNnBhY1RlclR4bTlvT0J2VnEzdjl6OTI3YXludUlkNDRMaVdLTm5qaEFYRjJVWWhSZzUxNnFwc3J5akxyMjE2NjV6RkxTVGFLOVUyR09BODdTd3FZMzdrblJVK0J6T3phZ3MwczFPeXIrQktNNnN4d1A2dFNEUExNZW42dnkwcnZkbTNTeGx1N0svUzdXRERyRlVEVVR4Z25UVTgyNmVYVzdLbHhtcVF1d0RCWFVLY0QrMVhlZS93WHVLWDVYREdXTGFwU1ZjT3loRU0vc2VKL1YrV25qZUd4NHBQVitXa202a0tabEZheTNKbHQ3aUZwWVpZOEFTVks2RGp0RERBMGY4QTBUbDM0MC8xZjhOZHg4eEpWV1hCMEtia3RGRnBOemRWWEFDL3FPd0EwQ1FuaTJmbHJPM1Z3Ym01bG5JMlRLeGJEaXJYL3dCRTVkK05jZlYvd1ZSN3haUGE1VTl1dHZJOG5XaG1iYncwWUVBWVlBVnhmaGZ5NXJsS1I0RnVsdTZYN21XMW16VDhTNFlpcy81Q1BsYm5xSjlkU1dmdTlPVnVlb24xMW1adlEyaTdYcENoS0t0ZWtLaEJsTko3UitVODliRGZHVGIzYTNaWDBMY2o2a2RZK1QyajhwNTYwMjg4bTFrV1FyNk1KK3lsU0FyKzJjblY1cmVuanMzSDFsb1grM2o5WHZiYnR4TE45bHFXNFVuVjVqZG5qdFhIeGlodHlaTmplU0J1NUo5azFCSmU3eHk3VzVDSi93Q3p1RC9tVFZUZjIrZnE5N0xKdUxyUHNOUnVlUzdXNmFKLzM4eCt2TFZYdVkreHZIYU54YmYyR29DZXpmOEEzNmovQVBzU2Y4dzFzTG5xY3pUZWZKbHVZb0xtNXVvNUY2MXNCc2hJdFAxY05GWWUxZjhBM2lyL0FQZkUvd0NaVWU5YkI5NHI1and1UHNyUUZobUc0bC9aMk0xN0hkVzkwdHV1M0lrVEhhQ2pXZEl3MFZWWmRrczkvQzA2eUpGRXAyZHArRTFiYnF5YkdUWjh2cFFEN0wxWFJ2OEE3YmxUOTZPZGE3dHBOdXVORTM3Q3E5S1Npc2p5dVVveHJTdEtsbEhiTGxXVFhzTXM4Y2h1U3V3RVBEcXdvTGU1eStZUkUvZ0x6bXFSZWt2S0t0ZDQzMjd5TS91bEh4bXJISlN0eVNXVlJ5cmp4S0kyWEMvQ1RsbmxQUEtUcFRkRmJQMEwxYmdyZjVMcDBHM2RQaFFId1YwUzFsekJzbnMzc0VTUjhDcmg5V0FKR2pTT0t1VTNFK3pkWlEzb0poOElBcmRaWEZEbU9UcEhhM2kyK1lySTJLdEt5NHJpY0JzQnVISGdGWFNvNDQwK1dhMnFxeGp2TTl1TW95K1d2eldwTENXV1dFMjhIeEw2ZTQzb2pna2VTQ0JZMVJpNUJHSVVEVDUxY2wzdm0yNzZCQnFTRUg0V2J4VjB0bGt5WEpjeFRNYitPVzZ1WTltR0hyQ3pEUXd3QWJUcDJ1S3VUWjlOMXVZc2ZSUlI4V1Bocm00MTltU1NqUnlpcXhWSzd5MjNCL2Z0dVRtMm9TZEp5ek5WdzNCRm43dlRsYm5xRjlkUzJmdTlPVnVlb24xMWxadVEyaUxkc0dGRDA1SDJkTlFHVjBudEc1VHoxZFdtOU4xYjJrVnE4RVZ3c0kyVWFRYVFPS2htaXRaR0xPbWs2OERoU0Z2WStnZldOU0FnN3ozUXZvN3lLQ0tJb2hpYU5SNUxLeHg4cXB4dmpjcVMwVnBieHZ3T0FjUlFQWjdEMEc5WTB1ejJIb0gxalVDcExZN3pYbHBibTNlS081UXV6anJCcVpqaTN4MTdQdk5jeVQyODhWdkRCSmJNV1VvdlMyaHNsVzdtRlE5bnNQUVByR2wyZXc5QStzYUNvZC9XTnh0YllzcmZiMTdXQnh4NWRkRDIyODF4Qzg4a2x2RGNTWEVuV3V6cnFPR0dDOXpSVVBaN0QwRzlZMHV6V0hvSDFqUVZDTHJlcTZudFpiYU8zaXQxbUd5N1JqVHMxWDJtWXkyMFppQ3E4Wk9PRGNkRWRtc1BRYjFqUzdQWWVnZldOZEp1THFuUWlTVWxScXBGTG1yeXh0SDFNYTdRdzJnTk5QT2RTdDBvSTI3cDAwN3M5aDZCOVkwdXoySG9IMWpYWDNaK0k0KzFiOElKZFg4OXhMSEtRRk1YUVVhaHB4b2lQTjVQK29uZlUrQTAvczloNkRlc2FYWjdEMEQ2eHBHN09MYlV0dTBTdFc1Skp4MmJCc21idGlTaUVrK2N4b0NXV1NhVnBaT2sydkRWbzBWWWRuc1BRYjFqU052WmNDSDFqU2QyYytwMVhBbUZxRU9tT1BFZmFIK0JRZDF1ZW8yMTFJenJnRlVZS05BQXFJMVd6dENwVXFWQ1JVcVZLZ0ZTcFVxQVZLbFNvQlVxVktnRlNwVXFBVktsU29CVXFWS2dGU3BVcUFWS2xTb0QvOWs9XCIsXHJcblxyXG4gICAgICAgIGxvYWRlclRleHQ6IFwi5q2j5Zyo6L295YWlLi4uIFwiLFxyXG5cclxuICAgICAgICBsb2FkZXJGb250OiBcIkFyaWFsXCIsXHJcblxyXG4gICAgICAgIC8qKiBAb3ZlcnJpZGUgKi9cclxuICAgICAgICBsaXN0Tm90aWZpY2F0aW9uSW50ZXJlc3RzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICBjb25zdGFudHMuU0NFTkVfQUNUSU9OLFxyXG4gICAgICAgICAgICAgICAgY29uc3RhbnRzLlNDRU5FX0FDVElPTl9BRERfQ0hJTEQsXHJcbiAgICAgICAgICAgICAgICBjb25zdGFudHMuQ09ORklSTV9ESUFMT0dcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKiogQG92ZXJyaWRlICovXHJcbiAgICAgICAgaGFuZGxlTm90aWZpY2F0aW9uOiBmdW5jdGlvbiAobm90aWZpY2F0aW9uKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAobm90aWZpY2F0aW9uLmdldE5hbWUoKSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBjb25zdGFudHMuU0NFTkVfQUNUSU9OOlxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZyhub3RpZmljYXRpb24uZ2V0Qm9keSgpLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2aWV3TWVkaWF0b3IgPSB0aGlzLmZhY2FkZS5yZXRyaWV2ZU1lZGlhdG9yKG5vdGlmaWNhdGlvbi5nZXRCb2R5KCkubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZpZXdNZWRpYXRvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFZpZXcodmlld01lZGlhdG9yKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9pbml0aWFsaXplZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgY29uc3RhbnRzLlNDRU5FX0FDVElPTl9BRERfQ0hJTEQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRDaGlsZChub3RpZmljYXRpb24uZ2V0Qm9keSgpKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgY29uc3RhbnRzLkNPTkZJUk1fRElBTE9HOlxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBDb25maXJtRGlhbG9nID0gcmVxdWlyZSgnLi4vY29tcG9uZW50L2NvbmZpcm1EaWFsb2cuanMnKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYm9keSA9IG5vdGlmaWNhdGlvbi5nZXRCb2R5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRDaGlsZChuZXcgQ29uZmlybURpYWxvZyhib2R5LnRpdGxlLCBib2R5LmRlc2MsIGJvZHkuY2FsbGJhY2spKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKiBAb3ZlcnJpZGUgKi9cclxuICAgICAgICBvblJlZ2lzdGVyOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKiBAb3ZlcnJpZGUgKi9cclxuICAgICAgICBvblJlbW92ZTogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzZXRWaWV3OiBmdW5jdGlvbiAodmlld01lZGlhdG9yKSB7XHJcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHNlbGYudmlld0NvbXBvbmVudCA9IG5ldyBjYy5TY2VuZSgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHJlcyA9IHZpZXdNZWRpYXRvci5nZXRSZXNvdXJjZSgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGhhbmRsZVNjZW5lQ2hhbmdlZCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2aWV3TWVkaWF0b3IuaW5pdCgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGNoaWxkID0gdmlld01lZGlhdG9yLmdldFZpZXdDb21wb25lbnQoKTtcclxuICAgICAgICAgICAgICAgIGlmIChjaGlsZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYudmlld0NvbXBvbmVudC5hZGRDaGlsZChjaGlsZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZi5zZW5kTm90aWZpY2F0aW9uKGNvbnN0YW50cy5OT1RJRklDQVRJT04uU0NFTkVfQ0hBTkdFRCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBpZiAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5Mb2FkZXJTY2VuZS5wcmVsb2FkKHJlcywgaGFuZGxlU2NlbmVDaGFuZ2VkLCB0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZVNjZW5lQ2hhbmdlZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYWRkQ2hpbGQ6IGZ1bmN0aW9uKG5vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy52aWV3Q29tcG9uZW50LmFkZENoaWxkKG5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvLyBTVEFUSUMgTUVNQkVSU1xyXG4gICAge1xyXG4gICAgICAgIE5BTUU6ICdTY2VuZU1lZGlhdG9yJyxcclxuICAgICAgICBTQ0VORV9DSEFOR0VfVklFVzogJ1NjZW5lQ2hhbmdlVmlldydcclxuICAgIH1cclxuKTtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgQXJ0aHVyIG9uIDIwMTQvMTIvMjAuXHJcbiAqL1xyXG52YXIgcHVyZW12YyA9IHJlcXVpcmUoJ3B1cmVtdmMnKS5wdXJlbXZjO1xyXG52YXIgY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vLi4vYXBwQ29uc3RhbnRzLmpzJyk7XHJcbnZhciBUYXNrUHJveHkgPSByZXF1aXJlKCcuLi8uLi9tb2RlbC9wcm94eS90YXNrUHJveHkuanMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcHVyZW12Yy5kZWZpbmUoXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ2ZpZ2h0ZXIudmlldy5tZWRpYXRvci5UcmFpbk1lZGlhdG9yJyxcclxuICAgICAgICBwYXJlbnQ6IHB1cmVtdmMuTWVkaWF0b3JcclxuICAgIH0sXHJcblxyXG4gICAgLy8gaW5zdGFuY2UgbWVtYmVyc1xyXG4gICAge1xyXG4gICAgICAgIC8qKiBAb3ZlcnJpZGUgKi9cclxuICAgICAgICBsaXN0Tm90aWZpY2F0aW9uSW50ZXJlc3RzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtjb25zdGFudHMuVEFTS19BQ1RJT05dO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKiBAb3ZlcnJpZGUgKi9cclxuICAgICAgICBoYW5kbGVOb3RpZmljYXRpb246IGZ1bmN0aW9uKG5vdGUpIHtcclxuICAgICAgICAgICAgc3dpdGNoKG5vdGUuZ2V0TmFtZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIGNvbnN0YW50cy5UQVNLX0FDVElPTjpcclxuICAgICAgICAgICAgICAgICAgICBpZiAobm90ZS5nZXRUeXBlKCkgPT0gY29uc3RhbnRzLlRBU0tfQUNUSU9OX0ZJTklTSEVEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMudmlld0NvbXBvbmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3Q29tcG9uZW50Lm9uVGFza0ZpbmlzaGVkKG5vdGUuZ2V0Qm9keSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKiBAb3ZlcnJpZGUgKi9cclxuICAgICAgICBvblJlZ2lzdGVyOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqIEBvdmVycmlkZSAqL1xyXG4gICAgICAgIG9uUmVtb3ZlOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHZhciB0YXNrUHJveHkgPSB0aGlzLmZhY2FkZS5yZXRyaWV2ZVByb3h5KFRhc2tQcm94eS5OQU1FKTtcclxuICAgICAgICAgICAgdmFyIHRhc2tMaXN0ID0gdGFza1Byb3h5LmdldERhdGEoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBUcmFpbkxheWVyID0gcmVxdWlyZSgnLi8uLi9jb21wb25lbnQvdHJhaW5MYXllci5qcycpO1xyXG4gICAgICAgICAgICBzZWxmLnZpZXdDb21wb25lbnQgPSBuZXcgVHJhaW5MYXllcigpO1xyXG4gICAgICAgICAgICBzZWxmLnZpZXdDb21wb25lbnQuaW5pdCh0YXNrTGlzdCk7XHJcblxyXG4gICAgICAgICAgICBzZWxmLnZpZXdDb21wb25lbnQub25CYWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNlbmROb3RpZmljYXRpb24oY29uc3RhbnRzLlNDRU5FX0FDVElPTiwge25hbWU6IGNvbnN0YW50cy5TQ0VORS5IT01FfSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBzZWxmLnZpZXdDb21wb25lbnQub25UYXNrID0gZnVuY3Rpb24odGFzaykge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zZW5kTm90aWZpY2F0aW9uKGNvbnN0YW50cy5UQVNLX0FDVElPTiwgdGFzaywgY29uc3RhbnRzLlRBU0tfQUNUSU9OX1NUQVJUKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBnZXRSZXNvdXJjZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHN0YXRpYyBtZW1iZXJzXHJcbiAgICB7XHJcbiAgICAgICAgTkFNRTogJ1RyYWluTWVkaWF0b3InXHJcbiAgICB9XHJcbik7Il19
