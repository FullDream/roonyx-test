methods of interaction

1. via Input and Output() decorators.
2. From child to parent: via ViewChild decorator.
3. Unrelated using services and tokens.

In the first option, among the advantages, I can note the ease of use, it is well suited for small components (form elements, buttons, etc.).
Among the disadvantages, it is problematic to monitor the application in very complex projects and with very large nesting, Prop-drilling will appear.

In the second option, we can hang the ref on the child and get all its public methods and properties through the ViewChild decorator, it is very convenient to mix our logic with the child component. But this option is more suitable for directives.

The third option with services is a very good solution for creating stupid components, where all the business logic lies in the services, and the components simply call methods and get data from one source, thanks to the modular structure we can substitute our services. It is also possible to manage data using tokens that we provide in a di container, for example, we can put a BehaviorSubject in it, subscribe to it and change its value in any component of our di container.
The disadvantage is the difficulty of understanding for beginners.
