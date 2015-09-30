*******************************
6. Authorization With Stormpath
*******************************

.. _authz:

a. What is Authorization?
-------------------------

Authorization is simply the way in which we determine the permissions someone has to do something. In contrast to authentication, which is how we determine who a person is, **authorization** is how we determine **what a person can do**. Perhaps the most accessible example of this process is at the airport, where a security person first checks your passport to make sure that you are who you say you are, and a separate person later checks that you are allowed to actually board the plane.

Once a user has entered in a valid login and password (authentication), there are the permission checks (authorization) that can be performed which dictate what access rights they have to your system resources. Going back to our airport scenario, once you have proven who you are with your passport, the airline also checks that you are permitted to board the plane by checking that you have a valid boarding pass. 

One distinction, though, is whether the permission is attached to the user, or to the resource that they are accessing. Put differently, part of modeling authorization is determining whether you will define a permission around your users, or around the resources that they are accessing. To go back to our airport scenario, we can imagine the airline has two options. 

i. Simple Authorization
^^^^^^^^^^^^^^^^^^^^^^^

First, the airline can have at the gate a master list of all passengers who are allowed to board the plane. This is equivalent to hard-coding permission checks into your application, and then tying them in some way to a user. This means that your authorization logic can be based on checks of a user's particular identity (e.g. ``if (user("jsmith") {...``) or their membership in a particular Group (e.g. ``if (user.group("passengers") {...``).  This simple authorization is perfectly sufficient for many applications, but has some downsides. One downside is that it can result in authorization rules that are much difficult to change dynamically. Another downside is that any change in authorization rules can end-up requiring a lot of refactoring of code, test cases, etc. A more dynamic and powerful way of handling authorization is through the use of permissions.

ii. Permissions-based Authorization
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Permissions, at their most basic, are statements of functionality that define a resource and what actions are possible for that resource. Going back to our airport scenario, an alternative to the boarding master list is that the airline sets a requirement: every passenger who wants to board the plan must bring a boarding pass. This pass comes with permission to perform the "board" action onto a specific flight number. So now, instead of basing authorization around a particular user identifier, we could require a certain permission to perform an action on a resource (e.g. ``if (user.isPermitted("flight:board:ac232"))``). This approach has many advantages, including more flexibility with regards to your security model, and separating your application logic from your data model.

.. todo::

	A concrete example of this advantage NEEDS to be included here.  

b. Modeling Authorization in Stormpath
---------------------------------------

From the perspective of a REST API, Stormpath only serves as the repository for authorization data. Authorization enforcement must happen on the client-side, and one of the many `Stormpath SDKs and integrations <https://docs.stormpath.com/home/>`_ can help you with this. 

i. How to Use Groups to Model Authorization Roles
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Group resource is central to controlling authorization with Stormpath. Among other things, you can use Groups to set permissions and permission hierarchies, as well as create user roles that span every tenant that is using your application.

As we have already said, you can think of Groups as labels applied to Accounts via the GroupMembership resource. Much in the same way that a label can be used to define an officer's rank (and thereby what he is authorized to do), Groups allow you to define "roles" in Stormpath for the purposes of role-based access control. If a user Group can be thought of as a collection of Users, then a role Group can be thought of as a collection of permissions. If we associate an Account with a certain role Group, then that Account will inherit all of the permissions defined for that Group. 

.. note::

	An Account can be associated with multiple Groups and will inherit permissions from all of them.

More information about creating custom permissions on both the Account and Group level can be found in the Custom Permissions section found :ref:`below <custom-perms>`.

ii. Application-Wide Groups
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. todo:: 

	This has to be completely rewritten because at the time that this was written the Organization resource didn't exist. Also explanatory text needs to be added about the Organization resource.

In a SaaS application, it is easy to imagine a scenario where you might want to have user Accounts segregated based upon the organization that they belong to, while at the same time defining permissions based on broader, application-wide roles. In the Stormpath data model, it is recommended to model every organization that uses your Application using the **Organization** resource. The Organization resource is a container for Directory resources that makes it easier to model user bases with multiple tenants. For more information about this, please see the [multi-tenancy section later in this guide].

Along with these Organizations, it is also possible to define application-wide Groups that allow for roles that span the entire application, regardless of which Organization a user's Account is associated with.

So let's assume that your "InterGalactic Banking" application must support multiple tenants for each of the bank's subsidiaries ("Bank of Aargau", "InterGalactic Bank of Kuat", etc), each modeled as an Organization resource. Each of those subsidiaries, in turn, could contain a Directory resource for each of its branches. However, you can still define roles that span the entire "InterGalactic Banking" application, regardless of which tenant (Organization) and branch (Directory) the Account is associated with.

If you want your Application to have "Teller" and "Bank Administrator" roles with their own permissions defined for all of your Application's users, this is simply a matter of creating two role Groups with their own customData permissions defined. Then any Account, regardless of the Organization (or Directory) that they are assigned to, can also be assigned to the Application-wide "Teller" or "Bank Administrator" role Group.

More information about the APIs that allow you to create, retrieve and search an Application's groups can be found in the [?], while more information about Multi-Tenancy can be found [?]

.. _custom-perms:

iii. How to Model Fine-Grained Permissions
------------------------------------------

.. todo::
	
	Fix linking in the following section. Also, is there stuff that would be good to bring in from that blogpost?

As mentioned earlier, Stormpath resources like Accounts and Groups are created along with a linked ``customData`` resource. This resource is very useful for implementing both explicit Account permissions and implicit role Group permissions. Essentially, any user-level permissions are defined in a ``customData`` resource linked to a user Account, while any role-level permissions are defined in a ``customData`` resource linked to a role Group. This allows for Stormpath to model user-unique permissions as well as permissions inherited by virtue of a user having one (or more) roles.

Permissions in Stormpath can be modeled as an array inside the ``customData`` resource. They can be as simple as a key-value pair, or more complex objects. To expand on the scenario from the `Application-Wide Groups <#appgroups>`__ section above, a user Account for the user "Riker" could have their user-unique permissions defined in a ``customData`` resource linked to from their Account. At the same time, their Account would be linked to the application-wide "Admin" Group which would have its own linked ``customData`` resource that would contain definitions of the permissions of all the users with the Admin role in your application.

For more information about working with Custom Data please see the `Product Guide <http://docs.stormpath.com/rest/product-guide/#custom-data>`__,
and for more information specifically about managing permissions with Custom Data please see `this blog post <https://stormpath.com/blog/fine-grained-permissions-with-customData/>`__. #Authorization With Stormpath

d. How to check if an Account has Groups or customData for authorization
-------------------------------------------------------------------------