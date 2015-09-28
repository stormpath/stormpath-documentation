*******************************
6. Authorization With Stormpath
*******************************

a. What is Authorization?
-------------------------

Authorization is simply the way in which we determine the permissions someone has to do something. In contrast to authentication, which is how we determine *who a person is*, **authorization** is how we determine **what can or can't do**. Perhaps the most accessible example of this process is at the airport, where a security person first checks your passport to make sure that you are who you say you are, and a separate person later checks that you have a valid plane ticket, which authorizes you to board the plane.

In the Stormpath context, once a user has entered in a valid login and password (authentication), they must then be assigned permissions (authorization) which dictate what access rights they have to your system resources. Permissions, at their most basic, are statements of functionality that define a resource and what actions are possible for that resource. Going back to our airport scenario, the permission could be to perform the "board" action onto a specific flight number.

.. _rbac:

b. How to use Groups to model Authorization
-------------------------------------------

The Group resource is central to controlling authorization with Stormpath. Among other things, you can use Groups to set implicit permissions, permission hierarchies, and create user roles that span every tenant that is using your application.

i. Explicit and Implicit Authorization
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. todo:

	Add more examples to these sections.

Stormpath comes out-of-the-box with support for both explicit and implicit authorization. **Explicit** authorization is the individually-specified permission of a user to do something, whereas **implicit** authorization can be thought of as permissions inherited by virtue of belonging to a certain Group. Both of these types of authorization are available in Stormpath, via either explicit Account Permissions or implicit Group Permissions.

Explicit user permissions are set on the Account level. This type of authorization is best suited for fine-grained permissions that are unique to a user.

As we have already said, you can think of Groups as labels applied to Accounts via the GroupMembership resource. Much in the same way that a label can be used to define an officer's rank (and thereby what he is authorized to do), Groups are how Roles are defined in Stormpath for the purposes of Role-Based Access Control. If a user Group can be thought of as a collection of Users, then a role Group can be thought of as a collection of permissions. An Account can be associated with multiple Groups and will inherit permissions from all of them.

More information about creating custom permissions on both the Account and Group level can be found in the Custom Permissions section found :ref:`below <custom-perms>`.

ii. Application-Wide Groups
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. todo:: 

	This has to be completely rewritten because at the time that this was written the Organization resource didn't exist. Also explanatory text needs to be added about the Organization resource.

In a SaaS application, it is easy to imagine a scenario where you might want to have user Accounts segregated based upon the organization that
they belong to, while at the same time defining permissions based on broader, application-wide role Groups. In the Stormpath data model, it
is recommended to model every organization that uses your Application using the **Organization** resource. [A sentence or two about Organizations here] Along with these Organizations, it is also possible to define application-wide Groups that allow for roles that span the entire application, regardless of which Organization a user's Account is associated with.

For example, your Application resource has a single Directory assigned to it, and multiple Groups assigned to that, one for each Tenant using the application. So there is an "OrganizationA" Group, and another "OrganizationB" Group. If you want your Application to have "Regular User" and "Admin" Roles with their own permissions defined for all of your Application's users, this is simply a matter of creating two role Groups with their own customData permissions defined. Then any Account, regardless of the Tenant Group that they are assigned to, can also be assigned to the Application-wide "Regular User" or "Admin" role Group.

More information about the APIs that allow you to create, retrieve and search an Application's groups can be found in the [?], while more information about Multi-Tenancy can be found [?]

.. _custom-perms:

c. How to model fine-grained permissions
----------------------------------------

.. todo::
	
	Fix linking in the following section. Also, is there stuff that would be good to bring in from that blogpost?

As mentioned earlier, Stormpath resources like Accounts and Groups are created along with a linked ``customData`` resource. This resource is very useful for implementing both explicit Account permissions and implicit role Group permissions. Essentially, any user-level permissions are defined in a ``customData`` resource linked to a user Account, while any role-level permissions are defined in a ``customData`` resource linked to a role Group. This allows for Stormpath to model user-unique permissions as well as permissions inherited by virtue of a user having one (or more) roles.

Permissions in Stormpath can be modelled as an array inside the ``customData`` resource. They can be as simple as a key-value pair, or more complex objects. To expand on the scenario from the `Application-Wide Groups <#appgroups>`__ section above, a user Account for the user "Riker" could have their user-unique permissions defined in a ``customData`` resource linked to from their Account. At the same time, their Account would be linked to the application-wide "Admin" Group which would have its own linked ``customData`` resource that would contain definitions of the permissions of all the users with the Admin role in your application.

For more information about working with Custom Data please see the
`Product
Guide <http://docs.stormpath.com/rest/product-guide/#custom-data>`__,
and for more information specifically about managing permissions with
Custom Data please see `this blog
post <https://stormpath.com/blog/fine-grained-permissions-with-customData/>`__.
#Authorization With Stormpath

d. How to check to see if an Account has Groups or customData for authorization
---------------------------------------------------------------------------------