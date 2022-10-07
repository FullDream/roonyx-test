1. there is an error with a tag in the template, 'div' opens and 'button' closes.
2. Remove the underscore from the 'AuthService' in the constructor, we have already indicated that this is a private method.
3. Move all the contents of the constructor to the ngOnInit hook, 
 there should be no subscriptions in the constructor.
4. Get rid of the 'GetUserName()' method, if possible, make the 'user' property public and use the template 'user?.name ', but if this property should be private, then add get and set with the names user, and also address in the template (user?.name).
5. Provide for the possibility of unsubscribing from 'AuthService.user' when the component is destroyed, to prevent memory leaks. (hook 'ngOnDestroy', 'takeUntil')
